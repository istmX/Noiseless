# Feature Specification: Final Integration, Environment Variables, and Purge

This specification defines the remaining integration work to connect the watches dashboard CRUD actions, wire environment variables without hardcoding, verify email notification triggers, and purge all deprecated code.

## Summary and Requirements

- Remove all hardcoded API hostnames from the frontend and backend. Ensure the frontend client resolves the FastAPI host dynamically using BACKEND_API_URL from environment variables.
- Connect the Delete Watch action from the dashboard watches list to the delete database operations via Server Actions.
- Ensure the watch toggle state on the detail configuration panel correctly invokes the update database and FastAPI scheduler trigger pipeline.
- Verify email notification triggers inside the backend services use variables from the env file.
- Perform a repository sweep to remove unused legacy files, placeholders, and dead code variables.

## UI and Architecture Integration

We configure the api-client.ts wrapper:
- Target file: app/shared/lib/api-client.ts
- Variables: process.env.BACKEND_API_URL

We update database CRUD:
- Target file: app/app/(dashboard)/watches/actions.ts

## Build Plan

### Step 1: Backend URL Environment Mapping
Edit app/shared/lib/api-client.ts. Remove any hardcoded localhost URLs.
Configure the base URL of fetchApi calls to resolve using process.env.BACKEND_API_URL.
Document this variable inside the app/.env.example file.

### Step 2: Dashboard Watch Delete Action
Implement a deleteWatch Server Action in app/app/(dashboard)/watches/actions.ts.
The action must:
- Extract current user session details.
- Validate that the user owns the watch.
- Call the FastAPI DELETE endpoint or fallback to Prisma watch delete.
- Revalidate the watches list path.
Wire the delete button in the watches list table and grid view cards to trigger this delete action with a confirmation alert.

### Step 3: Notification and Scheduler Verifications
Review email dispatch code in backend/app/services/notifications.py. Ensure SMTP server hosts, credentials, and Slack webhook endpoints are read from environment variables.
Review background scheduler triggers in backend/app/routers/watches.py. Ensure patch updates reschedule jobs correctly.

### Step 4: Dead Code Purge
Locate and delete unused layout skeleton placeholders, unused watches header components, and deprecated styling rules.
Verify the build compiles successfully with no unused exports.
