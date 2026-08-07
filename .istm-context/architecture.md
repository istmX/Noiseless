# Architecture

## Architecture Goals

The architecture should be:
- Maintainable: clear separation between frontend, backend, and background jobs
- Understandable: feature-based folders, thin pages, focused modules
- Scalable: stateless FastAPI workers, serverless Neon Postgres, Qdrant Cloud for vector storage
- Reliable: idempotent job runs, rate-limited Tavily usage, explicit dedup logic

Avoid unnecessary complexity. This is not a distributed microservices system. Two services (Next.js and FastAPI) are enough for this scope.

---

# System Overview

```
Browser (Next.js App)
     │
     │  HTTP / Server Actions
     ▼
Next.js 16 (App Router)          ──► Neon Postgres (direct via neon.ts for reads)
     │
     │  REST API calls
     ▼
FastAPI (Python)
     │
     ├─► Neon Postgres (asyncpg) ── users, watches, findings, digests tables
     ├─► Qdrant Cloud ──────────── per-watch vector collections for dedup + RAG
     ├─► APScheduler ───────────── triggers /internal/run-watch/{id} per watch frequency
     │
     └─► Agent Pipeline (per watch run)
              │
              ├─► Tavily API ──── web search (search_depth=advanced)
              ├─► sentence-transformers (local CPU) ── embed results
              ├─► Qdrant query ── find nearest neighbors, discard duplicates
              ├─► Groq API ── score significance + classify category
              ├─► Qdrant upsert ── store new embedding
              ├─► Neon INSERT ─── store finding record
              └─► Notification ── Brevo email + Slack webhook (if score >= threshold)
```

---

# Tech Stack

## Frontend
- Framework: Next.js 16 with App Router, Server Components, and Server Actions
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v4
- Components: shadcn/ui (built on Radix UI primitives)
- Auth: NextAuth.js (Auth.js v5) with Neon adapter
- Data fetching and State: React Server Components for initial data, TanStack Query for client polling/server state, Zustand for client-side global state.
- Icons: Lucide (via shadcn/ui)

## Backend and API
- Framework: Python FastAPI (async, with uvicorn)
- Database: Neon (serverless Postgres, asyncpg driver)
- ORM: SQLAlchemy 2.x (async) with Alembic for migrations
- Vector DB: Qdrant Cloud (qdrant-client Python SDK)
- Embeddings: sentence-transformers all-MiniLM-L6-v2 (local, CPU)
- LLM: Groq API (llama-3.3-70b-versatile, JSON mode)
- Agent Orchestration: LangChain (Python, langchain-groq + langchain-community). ChatGroq wraps the Groq API. LangChain chains handle the significance scoring step and the RAG digest generation step.
- Web search: Tavily Python SDK
- Background scheduler: APScheduler (AsyncIOScheduler)
- Notifications: Brevo (sib-api-v3-sdk) for email, HTTPX for Slack webhooks

## Infrastructure
- Frontend hosting: Vercel (or local dev server for development)
- Backend hosting: local dev (uvicorn) — deployable to Railway or Fly.io
- Postgres: Neon Cloud free tier
- Vector DB: Qdrant Cloud free tier (1GB)
- Groq: cloud API, requires GROQ_API_KEY environment variable

---

# Data Model (Neon Postgres)

## users
| column      | type          | notes                        |
|-------------|---------------|------------------------------|
| id          | uuid (PK)     | gen_random_uuid()            |
| email       | text UNIQUE   | not null                     |
| name        | text          | nullable                     |
| created_at  | timestamptz   | default now()                |

## watches
| column                 | type          | notes                                      |
|------------------------|---------------|--------------------------------------------|
| id                     | uuid (PK)     | gen_random_uuid()                          |
| user_id                | uuid (FK)     | references users(id) ON DELETE CASCADE     |
| topic                  | text          | human-readable label                       |
| search_queries         | text[]        | array of Tavily search query strings       |
| frequency              | text          | enum: hourly, daily, weekly                |
| significance_threshold | int           | 1-10 score below which no digest is sent   |
| active                 | bool          | default true                               |
| notification_email     | text          | nullable, Brevo recipient address          |
| notification_slack_webhook | text      | nullable, Slack incoming webhook URL       |
| last_run_at            | timestamptz   | nullable, used for idempotency lock        |
| run_in_progress        | bool          | default false, prevents double-processing  |
| created_at             | timestamptz   | default now()                              |

## findings
| column            | type        | notes                                      |
|-------------------|-------------|--------------------------------------------|
| id                | uuid (PK)   | gen_random_uuid()                          |
| watch_id          | uuid (FK)   | references watches(id) ON DELETE CASCADE   |
| url               | text        | source URL from Tavily result              |
| title             | text        | article or page title                      |
| content_snippet   | text        | extracted content summary from Tavily      |
| qdrant_point_id   | text        | UUID of the vector in Qdrant collection    |
| significance_score| int         | 1-10 score from Groq                     |
| category          | text        | classification from Groq (e.g. earnings) |
| key_fact          | text        | concrete new fact extracted by Groq      |
| created_at        | timestamptz | default now()                              |

## digests
| column      | type        | notes                                      |
|-------------|-------------|--------------------------------------------|
| id          | uuid (PK)   | gen_random_uuid()                          |
| watch_id    | uuid (FK)   | references watches(id) ON DELETE CASCADE   |
| summary     | text        | LLM-generated digest text citing URLs     |
| finding_ids | uuid[]      | array of finding IDs included in digest    |
| sent_at     | timestamptz | when the notification was sent             |

---

# API Endpoints (FastAPI)

| Method  | Path                           | Description                                    |
|---------|--------------------------------|------------------------------------------------|
| POST    | /watches                       | Create a new watch for the authenticated user  |
| GET     | /watches                       | List all watches for the authenticated user    |
| PATCH   | /watches/{id}                  | Update or pause a watch                        |
| DELETE  | /watches/{id}                  | Delete a watch and its findings                |
| GET     | /watches/{id}/findings         | Paginated findings timeline for a watch        |
| GET     | /watches/{id}/digests          | Digest history for a watch                     |
| POST    | /internal/run-watch/{id}       | Internal: triggered by APScheduler to run pipeline |

All endpoints return `{ data, error, meta }` JSON envelopes.
Auth is validated by checking a session token passed from NextAuth via HTTP header.

---

# Folder Structure

See agents.md for the full annotated tree.

---

# Core Workflows

## Workflow 1: Watch Creation

1. User submits WatchForm in Next.js dashboard.
2. Server Action calls FastAPI POST /watches with the watch payload.
3. FastAPI validates, inserts into Neon, creates an empty Qdrant collection named watch_{watch_id}.
4. APScheduler registers a new job for this watch based on its frequency.
5. Watch appears in the dashboard with status "Active, waiting for first run."

## Workflow 2: Agent Pipeline (per watch run)

1. APScheduler triggers /internal/run-watch/{id}.
2. FastAPI sets run_in_progress = true and last_run_at = now() in Neon (idempotency lock).
3. For each search_query in the watch:
   a. Call Tavily with search_depth=advanced, topic=news.
   b. Embed each result's content snippet using all-MiniLM-L6-v2.
   c. Query Qdrant watch_{watch_id} for top-5 nearest neighbors.
   d. If max cosine similarity > 0.88: skip (duplicate).
   e. If novel: run the LangChain scoring chain (ChatGroq + PromptTemplate + JsonOutputParser). Chain returns { score, category, key_fact }.
   f. If score >= significance_threshold: upsert embedding to Qdrant, insert finding to Neon.
   g. Add finding to the "notify" batch.
4. If notify batch is not empty:
   a. RAG-retrieve top-10 related past findings from Qdrant.
   b. Run the LangChain RAG digest chain (retrieved findings as context + ChatGroq). Output is a grounded summary that cites specific finding.url values.
   c. Insert digest to Neon.
   d. Send email via Brevo and/or Slack webhook.
5. Set run_in_progress = false in Neon.

## Workflow 3: Dashboard Read

1. Next.js Server Component fetches watch list directly from Neon via neon.ts.
2. Watch detail page fetches findings and digests from Neon.
3. TanStack Query polls FastAPI for agent run status (run_in_progress flag) every 5 seconds.
4. AgentStatusBadge shows "Running..." with a pulse animation when run_in_progress is true.

---

# Performance Rules

Use:
- React Server Components for all initial data loads (zero client JS for static content)
- Async SQLAlchemy with connection pooling on the FastAPI side
- Qdrant batch upserts to avoid per-finding network round trips
- sentence-transformers model loaded once at FastAPI startup (not per request)

Avoid:
- Unnecessary re-renders on the frontend
- Blocking Tavily calls without timeouts
- Loading the embedding model per request (expensive: load once at startup)
- Synchronous SQLAlchemy in async FastAPI handlers

---

# Future Expansion and Scalability

- When Tavily free tier is exhausted, replace with Exa or Brave Search API (same interface contract).
- When Groq free tier is exhausted or rate-limited, swap the ChatGroq binding to ChatOpenAI (GPT-4o-mini). LangChain abstracts the provider so pipeline.py does not change.
- When APScheduler in-process becomes a bottleneck, extract to a Celery worker backed by Redis.
- Multi-user support is already handled by the user_id foreign key on watches. No schema change needed.
- Qdrant collections per watch already isolate data. Scaling to thousands of watches means thousands of collections, which Qdrant Cloud handles natively.
