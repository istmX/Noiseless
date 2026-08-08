# Spec 0003: User Profile Management

This specification outlines the design and implementation of real time user profile management. This includes database updates, user avatar generation via Dicebear, and sidebar/dashboard name updates.

## Summary

The profile management feature allows users to edit their name and email directly via a dialog triggered from the sidebar footer. The user avatar will be generated automatically using Dicebear based on a random seed, saved in the database, and rendered in the sidebar. All header greetings (like "Hello Analyst") will update dynamically in real time to match the user's saved name.

### Acceptance Criteria

- Clicking the sidebar footer profile card opens a dialog panel to edit profile settings.
- The dialog allows editing Full Name and Email Address.
- An avatar image URL is saved in the database under the User model.
- The avatar is fetched from the Dicebear avatar API using a random seed. The user cannot manually upload or edit it.
- Saving changes updates the user data in the database and refreshes the UI state in real time.
- The header greeting on the dashboard changes from "Hello Analyst" to "Hello [Name]" dynamically.
- The form performs validation for name presence and email formatting.

## UI and Architecture

### Database Schema Updates

Add an `avatarUrl` field to the `User` model in `prisma/schema.prisma`:
- `avatarUrl String?`

### Client State Integration

Use the Zustand session store (or NextAuth session provider) to propagate the updated user profile name and avatar across all dashboard pages in real time to prevent UI flickering.

### Components

- **Profile Edit Dialog**: A dialog component using shadcn/ui components (`Dialog`, `Input`, `Label`, `Button`).
- **Sidebar Footer**: Updates to show the Dicebear avatar image and the active user name.
- **Dashboard Header**: Displays the greeting with the active user name.

## Implementation Steps

### Step 1: Update the Schema and Migrate
Add the `avatarUrl` column to the `User` model in `schema.prisma`. Run migrations to update the database.

### Step 2: Create Profile Server Actions
Create server actions inside a profile actions file:
- `updateProfile(name: string, email: string)`: Updates the name, email, and generates a random Dicebear URL if `avatarUrl` is empty. Saves changes to the database.

### Step 3: Implement the Profile Edit Dialog
Build the dialog interface using the small radius token (`rounded-sm`) for inputs and medium radius (`rounded-md`) for dialog borders. Wire it to trigger from the sidebar footer.

### Step 4: Propagate Real Time Updates
Connect the sidebar profile card and dashboard header to the Zustand state store so that updates to the profile name reflect immediately across the entire workspace.
