# Error Memory

AI agents MUST inspect this file before making code changes or diagnosing errors.

## 2026-08-07 CSRF Proxy Issue
- Symptom: `Invalid Server Actions request. x-forwarded-host header ... does not match origin`
- Root cause: Next.js CSRF protection rejecting proxied requests from Codespaces.
- Fix: Add `serverActions: { allowedOrigins: ["*.github.dev", "*.app.github.dev"] }` to `next.config.ts`.
- Verified: yes

## 2026-08-08 SQLAlchemy Session Closed in Background Tasks
- Symptom: `sqlalchemy.exc.InterfaceError: connection is closed` in background tasks.
- Root cause: Reusing the FastAPI request session context (`db`) inside background tasks. When the request returns, FastAPI closes the session context immediately, leaving the background task to run on a closed connection.
- Fix: Implement `_run_pipeline_in_background` task wrapper that creates a fresh database session via `AsyncSessionLocal()` instead of passing request session.
- Verified: yes

## 2026-08-08 FastAPI PydanticSerializationError for Watch Model
- Symptom: `pydantic_core._pydantic_core.PydanticSerializationError: Unable to serialize unknown type: <class 'app.models.watch.Watch'>` on CREATE, GET, or PATCH watches endpoints.
- Root cause: Returning a SQLAlchemy model object directly inside a dictionary envelope when the endpoint has `response_model=dict`. Pydantic does not know how to automatically serialize SQLAlchemy models to basic JSON types in this context.
- Fix: Use `WatchResponse.model_validate(watch).model_dump(mode="json")` to validate and serialize SQLAlchemy models to a JSON safe dict before returning them.
- Verified: yes
