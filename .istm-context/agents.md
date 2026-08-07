# Autonomous Research Analyst — AI Agent Working Instructions

This document defines how AI coding agents should understand, architect, and implement the Autonomous Research Analyst.

Everything written here is considered project context.

Never ignore these rules.

---

# Project Overview

The Autonomous Research Analyst is a full-stack agentic application that lets professionals create "Watches" on any topic: competitors, industries, stocks, people, or technology trends. A background agent periodically searches the web, deduplicates results against past findings using vector similarity, scores significance, and notifies users only when something genuinely new and important happens. The product turns continuous monitoring from a manual chore into an automated, signal-only intelligence stream.

---

# Core Product Principles

The product should always feel:
- Professional and trustworthy, like a Bloomberg terminal or a research workstation
- Data-dense but never cluttered
- Fast and reactive, with loading and pending states always visible
- Structured and predictable
- Premium, not generic SaaS

Never make the application feel like a chatbot wrapper. Everything should feel like a professional analyst's workstation.

---

# Primary User Flow

User opens dashboard
↓
Creates a Watch (topic, search queries, frequency, significance threshold)
↓
Background agent runs: searches Tavily, embeds results, deduplicates via Qdrant, scores significance via Groq
↓
When significance crosses threshold: RAG-retrieved digest is generated and sent via email or Slack
↓
User reviews findings timeline and digest history on the Watch detail page

---

# Tech Stack (locked)

## Frontend (at /workspaces/Noiseless/app/)
- Framework: Next.js 16 (App Router, Server Components, Server Actions)
- Language: TypeScript
- Styling: Tailwind CSS v4
- Components: shadcn/ui
- Auth: NextAuth.js (Auth.js)

## Backend (at /workspaces/Noiseless/services/api/)
- Framework: Python FastAPI
- Search: Tavily API (search_depth=advanced, topic=news for recency-sensitive watches)
- Vector DB: Qdrant Cloud (free 1GB cluster, collections namespaced per watch)
- Relational DB: Neon (serverless Postgres)
- Embeddings: sentence-transformers all-MiniLM-L6-v2 (local, CPU, no API cost)
- LLM: Groq API (llama-3.3-70b-versatile, cloud, fast inference, JSON mode) for significance scoring and digest generation
- Agent Orchestration: LangChain (Python) — ChatGroq for LLM calls, LangChain chains for the score and digest steps, LangChain document loaders where appropriate
- Background jobs: APScheduler (in-process)
- Email: Brevo free tier (300 emails per day, no card required) or Gmail SMTP for dev
- Slack: incoming webhooks (free)

---

# Development Principles

Always prefer:
- Maintainability over cleverness
- Readability over brevity
- Type safety in TypeScript and Python (Pydantic models on the FastAPI side)
- Predictable architecture: no surprises in where logic lives
- Idempotent job runs: the scheduler must never double-process a watch run

Never write code because it works. Write code another engineer can immediately understand.

---

# Frontend Layout and Text-Wrapping Safety

Before adding or changing frontend UI, verify rendered parent width at desktop and mobile sizes.

- Do not make a flex or grid text wrapper shrink-to-fit accidentally. Content rows that own a full-width child must use w-full min-w-0.
- Do not use overflow-wrap: anywhere for normal prose. It collapses parent widths.
- Paragraphs use the body font and a readable measure, around 45-75 characters per line.
- Do not hardcode colors, borders, or semantic-state colors in components. Use the semantic tokens defined in .istm-context/design.md.
- Use the product sans token for body copy, headings, buttons, forms, and navigation.
- Shared buttons must reuse the shadcn/ui button component vocabulary before introducing a one-off style.

---

# Planning Before Coding

Never immediately start implementing. Before writing code:

1. Understand the feature.
2. Understand dependencies.
3. Break the feature into small tasks.
4. Explain the implementation plan.
5. Ask questions if information is missing.
6. Only then begin implementation.

Never guess requirements. If anything is unclear, ask.

---

# Feature Development Process

Every feature follows this workflow:

Understand
↓
Plan
↓
Break into tasks
↓
Implement task by task
↓
Verify
↓
Refactor
↓
Update progress.md

Never implement multiple unrelated features together.

---

# Mandatory Legacy Code Purge

Whenever an AI agent modifies, refactors, or replaces a feature, prompt, or function, it MUST scan the full codebase and permanently remove all dead or legacy code, unused variables, outdated prompt templates, and old fallback logic across all files.

---

# Folder Structure

Use Feature-Based Architecture. Never place business logic inside pages.

## Frontend (Next.js at /workspaces/Noiseless/app/)

```
app/
  app/                      # Next.js App Router root
    (auth)/                 # Auth group: login, register
      components/           # LoginForm, RegisterForm
      hooks/
      types/
    (dashboard)/            # Protected dashboard group
      watches/              # Watch list and create pages
        components/         # WatchCard, WatchForm, WatchTimeline
        hooks/              # useWatches, useWatch
        actions.ts            # Server Actions for CRUD
        types/
        [id]/               # Watch detail page (findings + digests)
          findings/
            components/     # FindingCard, FindingTimeline
            hooks/          # useFindings
            types/
          digests/
            components/     # DigestCard, DigestHistory
            hooks/
            types/
      settings/             # User settings page
    agent/                  # Background agent routes
      components/           # AgentStatusBadge, RunProgress
      hooks/                # useAgentStatus
    api/                    # API Routes and Server Actions
      auth/                 # NextAuth handlers
  shared/
    components/
      ui/                   # shadcn/ui components live here
    hooks/
    lib/
      api-client.ts         # Typed fetch wrapper for FastAPI
      auth.ts               # NextAuth config
      neon.ts               # Neon Postgres client (for direct queries via Server Actions)
    types/
      index.ts              # Shared TypeScript types
```

## Backend (FastAPI at /workspaces/Noiseless/services/api/)

```
services/api/
  app/
    main.py                 # FastAPI app entry point
    config.py               # Settings via pydantic-settings
    database.py             # Neon Postgres connection (asyncpg or SQLAlchemy async)
    scheduler.py            # APScheduler setup and job registry
    routers/
      watches.py            # /watches CRUD routes
      findings.py           # /watches/{id}/findings route
      digests.py            # /watches/{id}/digests route
      internal.py           # /internal/run-watch/{id} route
    services/
      search.py             # Tavily API wrapper
      embeddings.py         # sentence-transformers all-MiniLM-L6-v2 wrapper
      vector_store.py       # Qdrant client wrapper (upsert, query)
      dedup.py              # Cosine similarity dedup logic
      llm.py                # Groq API client (via LangChain ChatGroq) for scoring and digest generation
      digest.py             # RAG pipeline: retrieve related findings + generate digest
      notifications.py      # Brevo email + Slack webhook dispatch
    agent/
      pipeline.py           # Core agent flow: search -> embed -> dedup -> score -> store -> notify
      rate_limiter.py       # Per-watch Tavily credit rate limiting
    models/
      user.py
      watch.py
      finding.py
      digest.py
    schemas/
      watch_schema.py
      finding_schema.py
      digest_schema.py
  requirements.txt
  .env.example
  alembic/                  # Database migrations
```

Every feature module owns its own router, service, model, and schema. No giant shared files.

---

# Component Rules

Keep components focused. One responsibility. If a component grows too much, split it. Avoid giant files. Prefer composition over complexity.

---

# File Length

No source file should exceed approximately 250 lines whenever reasonably possible. If a file grows too large, split it and extract logic.

---

# State Management

- Frontend: React Server Components handle most data fetching. Use React Query (TanStack Query) on the client for live polling of agent run status and real-time finding updates.
- Keep state local whenever possible. Lift state only when required. Use Zustand for any global client-side state.
- Global state (current user, notification preferences) lives in Zustand store (or shared context), not scattered across components.

---

# API Communication Rules

- The Next.js frontend communicates with FastAPI via a typed api-client.ts wrapper.
- All FastAPI endpoints return consistent JSON envelopes: { data, error, meta }.
- Server Actions in Next.js use the Neon client directly for simple reads. Complex agentic operations call FastAPI.
- All API keys (Tavily, Qdrant, Neon, Brevo, GROQ_API_KEY) live in environment variables. Never commit them.

---

# Agent Pipeline Rules (CRITICAL)

1. Idempotent runs: before processing a watch, check a last_run_at lock in Neon. If a run is already in progress (started less than the watch frequency ago), skip.
2. Rate limiting: track Tavily credits consumed per watch per month. Enforce a hard cap based on frequency tier (hourly watches get fewer credits per run than daily ones).
3. Deduplication threshold: cosine similarity above 0.88 is a duplicate. This is configurable per watch via significance_threshold.
4. Digest citation rule: digest generation prompts must instruct the LLM to cite specific finding.url values. Never invent facts.
5. Qdrant namespacing: each watch gets its own Qdrant collection named watch_{watch_id}.
6. Significance scoring: Groq returns JSON { score: 1-10, category: string, key_fact: string }. If score is below the watch's significance_threshold, the finding is stored but no digest is triggered.

---

# Notification Rules

- Notifications are per-watch configurable. Each watch stores notification_email and notification_slack_webhook.
- Email uses Brevo API (or Gmail SMTP via Python smtplib in dev). Never use raw SMTP in production without TLS.
- Slack uses incoming webhook POST. Message includes the digest summary and a link to the watch detail page.
- Digest is only sent when at least one finding in the batch crosses the significance threshold.

---


# Tailwind v4 Class Names (CRITICAL)
- Do NOT use `[var(--color-something)]` syntax.
- All tokens are registered in `@theme inline` in `globals.css`. Tailwind v4 automatically handles dark/light shifts from `[data-theme]` selectors. You do not need to prefix them with `dark:` in your HTML.
- **Surfaces**: `bg-canvas`, `bg-surface`, `bg-surface-elevated`, `bg-surface-inset`
- **Text**: `text-ink`, `text-ink-body`, `text-ink-muted`, `text-ink-faint`
- **Borders**: `border-hairline`, `border-hairline-strong`
- **States**: `bg-primary hover:bg-primary-hover`, `text-danger border-danger-soft`
- **Typography**: `font-sans`, `font-data`, `text-display`, `text-body`
- Always use these clean, native class names.

# Constants and Styling Rules

Never hardcode values. Create constants for routes, labels, limits, validation, and animations.
Never hardcode colors, spacing, typography, border radius, or shadows. Always use values defined in .istm-context/design.md.
Design tokens are TBD and will be filled by the /istm-design skill before implementation begins.

---

# Empty State and Iconography Rules

- Never use emojis in the UI or empty states.
- Always use Lucide icons (already in shadcn/ui's dependency set).
- Empty states must include: a semantic Lucide icon, a short headline, a supporting sentence, and a primary CTA button.
- No image files. All UI is built using CSS, typography, and icon libraries.

---

# Progress and Error Memory Tracking

Two critical tracking files live in the project:

1. progress.md (at /workspaces/Noiseless/progress.md): tracks completed tasks, feature statuses, and pending deliverables.
2. error-memory.md (at /workspaces/Noiseless/error-memory.md): tracks architectural bugs, root causes, and verified fix patterns.

Before making code changes or diagnosing an error, AI agents MUST inspect error-memory.md to avoid repeating past bugs.
After fixing any meaningful bug, update both files immediately with the symptom, root cause, and verified resolution.

---

# When Stuck

Never invent requirements. Never guess. Stop. Ask questions. Wait for clarification. Then continue.

---

# Definition of Done

A task is complete only when:
- Feature works correctly end to end
- Code follows this architecture document
- No hardcoded values remain
- Components are focused and reusable
- Folder structure is respected
- Pages remain thin (routing layers only)
- Types are defined in the feature's types/ directory
- progress.md is updated
