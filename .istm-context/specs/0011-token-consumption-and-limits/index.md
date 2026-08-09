# Feature Specification: Token Consumption and Limit Enforcement

This specification defines the database updates, backend validation, token deduction rules, and user notification logic when watch runs are executed or blocked.

## Summary and Requirements

- Add a `tier` column (string, defaults to "FREE") to the User model in the database to support subscription verification.
- Deduct ten tokens from user tokensBalance and increment tokensUsed by ten on successful completion of the watch run (post run deduction).
- Verify the user has at least ten tokens before initiating a watch run.
- If a user has fewer than ten tokens, abort the run, mark the watch status as inactive or failed, and send a depletion notification via email and Slack.
- Enforce the frequency rule in the backend: reject hourly watch triggers if the user has a FREE tier.
- Ensure strict typing across all files. Forbid the use of the `any` type.

## UI and Architecture Integration

### Database Changes
- File: `app/prisma/schema.prisma`
- Model User: Add `tier String @default("FREE")`

### Backend Changes
- File: `backend/app/agent/pipeline.py`
  - Retrieve the User record corresponding to the Watch owner.
  - Implement a token balance check (must be at least ten).
  - Implement frequency checks: block hourly runs for FREE tier users.
  - On validation failure, mark the run as failed, and call the notification service to send a low balance alert.
  - On successful run completion, deduct ten tokens and add ten to tokensUsed, then commit to Neon Postgres.
- File: `backend/app/services/notifications.py`
  - Add a function to dispatch token depletion notifications via Brevo email and Slack webhooks.

### Types and Constants
- Frontend types: `app/shared/types/index.ts`
- Backend models: `backend/app/models/user.py`

## Build Plan

### Step 1: Database Migration
1. Update `app/prisma/schema.prisma` to add the `tier` field to the User model.
2. Push the schema updates using `npx prisma db push`.
3. Update the backend SQLAlchemy User model to include the `tier` attribute.

### Step 2: Implement Depletion Notifications
1. Update `backend/app/services/notifications.py` to add `send_token_depletion_alert(user, watch)`.
2. Format the email using Brevo template values.
3. Format the Slack webhook payload with a warning icon and a direct link to the dashboard billing settings page.

### Step 3: Implement Pipeline Enforcement
1. Update `backend/app/agent/pipeline.py` to fetch user details.
2. Validate user tokens balance before starting search queries.
3. Validate watch frequency constraints against user tier.
4. If validation fails, abort the execution, save the failure status, and dispatch depletion alerts.
5. If search queries and significance scoring complete successfully, deduct ten tokens from tokensBalance and increment tokensUsed by ten, then commit changes.
