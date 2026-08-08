# Spec 0003: Backend FastAPI Service Setup

**Status**: Accepted

## Summary

This specification defines the setup of the Python FastAPI backend service located at `services/api`. It configures the package management and environment running structure using `uv`. It establishes the API schema, database connections, and the background agent pipeline (Tavily search, Qdrant vector deduplication, Groq scoring via LangChain, and RAG digest generation).

---

## Acceptance Criteria

* Python environment is managed using `uv` (virtual environment initialization, package installations, and running the server).
* Dependencies are listed in `requirements.txt` (includes `fastapi`, `uvicorn`, `langchain`, `langchain-groq`, `langchain-community`, `qdrant-client`, `sentence-transformers`, `sqlalchemy`, `asyncpg`, `pydantic-settings`, `apscheduler`).
* Environment variables are parsed cleanly using `pydantic-settings` in `app/config.py` with validation.
* Database connections are established asynchronously using SQLAlchemy with Neon Postgres.
* A vector service manages collections per watch in Qdrant and handles local embeddings generation using `all-MiniLM-L6-v2`.
* Tavily search client processes queries with advanced search options.
* A significance scoring chain uses ChatGroq (llama-3.3-70b-versatile in JSON mode) to evaluate findings.
* A RAG digest generation pipeline retrieves related context from Qdrant and uses ChatGroq to produce cited summaries.
* CRUD routes for watches, findings, and digests are exposed with consistent JSON envelopes.
* Background scheduler processes watch tasks on schedule with proper locks to prevent duplicate runs.

---

## Architecture Constraints (from `.istm-context/architecture.md`)

* Framework: Python FastAPI with asynchronous endpoints.
* ORM: SQLAlchemy 2.x with asyncpg driver.
* Vector DB: Qdrant Cloud namespaced per watch (watch_(watch_id)).
* LLM: Groq via LangChain ChatGroq with JSON output parsing.
* Local Embeddings: Loaded once at startup in memory.
* Return Envelope: All responses must follow the `{ "data": ..., "error": ..., "meta": ... }` structure.

---

## Technical Details

### Environment Variables (.env)

The following environment variables are required:
* `DATABASE_URL`: Asynchronous Neon Postgres connection string (postgresql+asyncpg://...)
* `QDRANT_API_KEY`: API key for Qdrant Cloud
* `QDRANT_URL`: Endpoint for Qdrant Cloud cluster
* `TAVILY_API_KEY`: API key for Tavily search
* `GROQ_API_KEY`: API key for Groq Cloud
* `BREVO_API_KEY`: API key for email delivery
* `SLACK_WEBHOOK_URL`: Fallback webhook URL

---

## Build Plan (for `/istm-develop` to execute in order)

### Step 1: Initialize the Python Virtual Environment
Initialize the environment inside `services/api` using `uv`.
```bash
cd /workspaces/Noiseless/services/api
uv venv
```

### Step 2: Write `requirements.txt`
Create the dependency file listing all packages.
```text
fastapi>=0.110.0
uvicorn>=0.28.0
pydantic-settings>=2.2.1
sqlalchemy>=2.0.28
asyncpg>=0.29.0
qdrant-client>=1.8.0
sentence-transformers>=2.5.1
langchain>=0.1.12
langchain-groq>=0.0.1
langchain-community>=0.0.28
tavily-python>=0.3.1
apscheduler>=3.10.4
httpx>=0.27.0
python-dotenv>=1.0.1
```

Install them using `uv`:
```bash
uv pip install -r requirements.txt
```

### Step 3: Implement Configuration (`app/config.py`)
Setup Pydantic settings to load and validate all environmental configuration.
Ensure that the local embedding model is cached and initialized at import or startup time.

### Step 4: Setup Database Engine and Models (`app/database.py` and `app/models/`)
Configure SQLAlchemy async engine, session makers, and declare base models:
* `User`
* `Watch`
* `Finding`
* `Digest`

### Step 5: Implement Qdrant and Embeddings Services (`app/services/vector_store.py`)
Create helper functions to:
* Create watch collections.
* Generate embeddings local to CPU.
* Query vector similarity.
* Upsert vector points.

### Step 6: Implement Search Service (`app/services/search.py`)
Configure Tavily to search news and retrieve text content summaries.

### Step 7: Setup LangChain Services (`app/services/llm.py` and `app/services/digest.py`)
* Scoring: Build a ChatGroq chain with prompts returning scoring JSON.
* Digesting: Build RAG context lookup and prompt requiring citations of finding URLs.

### Step 8: Build Agent Pipeline Orchestration (`app/agent/pipeline.py`)
Assemble the search, embed, deduplicate, score, store, and notify steps into a single workflow function.

### Step 9: Configure APscheduler and API Routes
* Setup `app/scheduler.py` to trigger runs.
* Create FastAPI routers inside `app/routers/` for watches, findings, and digests.
* Expose `/internal/run-watch/{id}` for scheduler tasks.

---

## Types and Constants

* Pydantic schemas define input and output payloads (e.g. `WatchCreate`, `WatchResponse`).
* Cosine similarity threshold constant is locked at `0.88`.
* All API response models use typing (`List`, `Dict`, `Optional`) to ensure type safety.
