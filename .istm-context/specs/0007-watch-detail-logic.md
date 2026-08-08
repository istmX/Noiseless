# Feature Specification: Watch Config Settings Update Logic

This specification defines the backend and frontend logic for saving updates to watch configurations from the detail settings panel.

## Summary and Requirements

- Implement an updateWatch Server Action in actions.ts to persist watch edits to the database (Neon Postgres) and sync them with the FastAPI backend.
- Add a "Save Changes" button to the collapsible settings panel. The button is enabled only when there are unsaved modifications.
- Show a loading spinner inside the button during the saving action and disable form fields to prevent duplicate submissions.
- Call Next.js revalidatePath("/watches/[id]") on success to refresh the page data with updated values.
- Display toast notifications for success and error feedback.

## UI and Architecture Integration

The Server Action connects to the database via Prisma:
- Target file for action: app/app/(dashboard)/watches/actions.ts
- Target file for view: app/app/(dashboard)/watches/[id]/components/WatchDetailView.tsx

## Build Plan

### Step 1: Create updateWatch Server Action
Add the updateWatch function to app/app/(dashboard)/watches/actions.ts.
The action must:
- Extract user session using NextAuth auth().
- Accept watchId and an update data payload containing optional active status, frequency, significance threshold, target queries, notification email, and Slack webhook URL.
- Validate inputs (email format, Slack URL format).
- Attempt patch request to FastAPI watches router.
- Fallback to Prisma database update if the FastAPI call fails.
- Revalidate the watch detail path.

### Step 2: Integrate Save Logic in WatchDetailView
Update app/app/(dashboard)/watches/[id]/components/WatchDetailView.tsx:
- Track differences between current form state and initial watch values to determine if edits exist.
- Add a "Save Changes" button at the bottom of the collapsible panel.
- Wire the button click handler to call the updateWatch Server Action using React transitions.
- Disable inputs and show loading feedback inside the button during submission.
- Display a success toast when saved, or an error toast if it fails.
