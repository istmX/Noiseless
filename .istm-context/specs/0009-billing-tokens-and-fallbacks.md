# Feature Specification: Billing, Tokens, and LLM Fallback Systems

This specification defines the logical flow and UI constraints for restricting free tier watch frequencies, adding a basic credit token system outline, and implementing automated LLM fallbacks (using Gemini 2.5 Flash and Mistral) along with failed notification queuing.

## Summary and Requirements

- **Frequency Lock**: Free accounts can only set watches to "daily" or "weekly" intervals. The "hourly" option in the UI is disabled and shows a lock icon.
- **Multi LLM Fallback**: If the Groq API fails or returns rate limits (429 or 503), the agent pipeline automatically routes significance scoring and digest compiles to Gemini 2.5 Flash or Mistral.
- **Notification Queue**: If Brevo email or Slack webhook dispatches fail, the notification state is logged as FAILED in Postgres to allow retries, instead of failing silently.
- **Token System Schema**: Define database model properties to track user plan tiers and token credit usages.

## UI and Architecture Integration

We edit the frontend UI forms:
- Target file: app/app/(dashboard)/watches/[id]/components/WatchDetailView.tsx
- Target file: app/app/(dashboard)/watches/components/WatchForm.tsx (for new watches)

We update backend pipeline and database models:
- Target file: backend/app/agent/pipeline.py
- Target file: backend/app/services/llm.py

## Build Plan

### Step 1: Lock Hourly Frequency on Free Tier
Update the watch settings collapsible panel in [WatchDetailView.tsx](file:///workspaces/Noiseless/app/app/(dashboard)/watches/[id]/components/WatchDetailView.tsx) and the creation form in [WatchForm.tsx](file:///workspaces/Noiseless/app/app/(dashboard)/watches/components/WatchForm.tsx):
- Evaluate the user's subscription tier.
- If the tier is free, disable the "hourly" frequency selection button.
- Render a lock icon next to the "hourly" text.

### Step 2: Implement LLM Fallback Chain
Modify [llm.py](file:///workspaces/Noiseless/backend/app/services/llm.py):
- Capture connection and rate limit errors during Groq API calls.
- If an error occurs, attempt the same prompt payload using Gemini 2.5 Flash (via GEMINI_API_KEY).
- If Gemini fails, fallback to Mistral (via MISTRAL_API_KEY).

### Step 3: Notification Failure Log
Update the notification service to return success or failure statuses.
In [pipeline.py](file:///workspaces/Noiseless/backend/app/agent/pipeline.py), save the delivery status (SENT or FAILED) to the digest database record.
Failed digests will be retried in the next background worker cycle.
