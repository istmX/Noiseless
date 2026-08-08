# Feature Specification: Profile and Billing Settings Page

This specification defines the layout, CRUD actions, and billing plans view for the profile and settings workstation page.

## Summary and Requirements

- Implement a settings page at app/app/(dashboard)/settings/page.tsx.
- Include a Profile section to edit username, email, and dynamic Dicebear avatar selections.
- Include a Billing section displaying plan tier details (Free by default), token limits, and an interactive pricing table to upgrade plans.
- Wire database CRUD actions to save updated user profile parameters using Prisma Server Actions.
- Ensure all styling aligns with the Outfit font and forest green brand colors.

## UI and Architecture Integration

We build the settings route:
- Target file: app/app/(dashboard)/settings/page.tsx
- Target components: app/app/(dashboard)/settings/components/ProfileForm.tsx
- Target components: app/app/(dashboard)/settings/components/BillingPlans.tsx
- Target actions: app/app/(dashboard)/settings/actions.ts

## Build Plan

### Step 1: User Profile CRUD Actions
Implement a settings actions file at app/app/(dashboard)/settings/actions.ts:
- Add a updateUserProfile Server Action that accepts name and email.
- Validate email formats and update the User record using Prisma.
- Regenerate the default Dicebear avatar URL based on the updated name string.
- Revalidate the settings page path.

### Step 2: Settings Layout and Components
Create app/app/(dashboard)/settings/page.tsx:
- Render a double section layout (Profile Settings on top/left, Billing Details on bottom/right).
- In ProfileForm, render inputs for name and email with validation states and dynamic avatar previews.
- Add a dynamic avatar generator button that updates the preview dynamically.

### Step 3: Billing Plans and Token Limits
Create app/app/(dashboard)/settings/components/BillingPlans.tsx:
- Display current subscription details (Free Tier, 0 tokens consumed of 500 monthly search query credits).
- Render a grid pricing card table showing features of Pro and Enterprise tiers (including hourly search triggers and custom LLM model selections).
- Add disabled placeholder buttons for checkout flows.
