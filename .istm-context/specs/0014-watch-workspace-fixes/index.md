# Feature Specification: Watch Workspace Fixes

This specification outlines fixes for watch execution states (Run Now), Toast feedback on rate limits, and default notification email fallbacks.

## Summary and Requirements

- Update watch creation and editing forms to automatically default the notification email to the user's registered account email if left blank.
- Enhance the "Run Now" button on the Watch Detail Page:
  - Display a spinning loader when the run is active.
  - Disable the button during active executions.
  - Catch API rate limits or idempotency blockages (such as runs triggered too soon) and display a user friendly toast alert: "This watch was executed recently. Please try again in an hour or wait for the automatic daily update."
- Ensure strict typing without the use of the `any` type.

## UI and Architecture Integration

### Default Email Fallback
- Retrieve the active session user email.
- Set the default value of the `notificationEmail` field in `WatchForm.tsx` to this email.

### Run Now Action and Toast Updates
- Modify the `runWatchNow` action response to distinguish between successful runs, active runs, and rate limited runs.
- Trigger standard Sonner toast notices on the client side based on action results.

## Build Plan

### Step 1: Default Notification Email Setup
1. Update `WatchForm.tsx` to read the active user email from the session or auth store.
2. If `notificationEmail` is empty during form submission, default its value to the session email before sending the request to the backend.

### Step 2: Update Run Now Feedback in Detail Page
1. Add a loading state hook tracking the manual execution status in `WatchDetailView.tsx`.
2. Disable the "Run Now" button when a run is active.
3. Catch error envelopes returned by `runWatchNow` (specifically checking for recent run logs or 429 status codes).
4. Render a warning toast: "This watch was executed recently. Please try again in an hour or wait for the automatic daily update."
