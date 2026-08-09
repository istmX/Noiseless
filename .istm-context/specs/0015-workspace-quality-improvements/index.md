# Feature Specification: Workspace Quality and Monitoring Improvements

This specification defines the custom animated 404 page, the system health stats page, and the watch execution cooldown with no change notifications.

## Summary and Requirements

- **Animated 404 Page**:
  - Implement a custom 404 page at `/app/app/not-found.tsx` utilizing the local image file `/workspaces/Noiseless/image copy 3.png`.
  - Add text, layout, and spring transitions.
- **System Health Page**:
  - Update `/agent` page route to show a live dashboard for the scheduler status, background workers, and API credit usage metrics.
- **Watch Cooldown and Notifications**:
  - Add a fifteen minute cooldown lock to the "Run Now" buttons on the frontend and enforce it on the backend.
  - If a watch execution completes but discovers no new findings, display "No changes detected" in the UI and log files instead of decrementing user tokens.
- Ensure all types are strictly defined. Forbid the use of the `any` type.

## UI and Architecture Integration

### Custom 404 Page
- File: `/app/app/not-found.tsx`
  - Style using the Forest Green accent theme.
  - Copy the target asset to `/app/public/image-copy-3.png` so it is served by the Next.js router.
  - Embed the image using a standard Next.js image component.

### System Health
- File: `/app/app/(dashboard)/agent/page.tsx`
  - Render stats cards for active watch jobs, API quotas, and vector collection health indices.

### Watch Cooldown
- File: `/backend/app/routers/internal.py`
  - Enforce a 900 second limit between manual triggers.
- File: `/app/app/(dashboard)/watches/[id]/components/WatchDetailView.tsx`
  - Disable manual trigger buttons during the 15 minute cooldown interval.

## Build Plan

### Step 1: Build Custom 404 Page
1. Copy the file `/workspaces/Noiseless/image copy 3.png` to `/workspaces/Noiseless/app/public/image-copy-3.png`.
2. Create `/workspaces/Noiseless/app/app/not-found.tsx` with structured layout styles and a back to dashboard button.

### Step 2: Implement System Health View
1. Update `/app/app/(dashboard)/agent/page.tsx` to fetch background statuses and show scheduler metrics.

### Step 3: Implement 15 Minute Cooldown and No Change Alerts
1. Enforce the fifteen minute check (900 seconds) in the backend `/run-watch/{id}` endpoint.
2. Disable the "Run Now" button on the client side during the cooldown window.
3. If search returns zero findings, skip the token deduction step and log "No changes detected".
