# Spec: Watches Dashboard (List & Create)

## Summary & Requirements
This spec defines the "Watches" dashboard which serves as the primary landing page for the application. It provides users with an at-a-glance overview of all their configured Watches and the current status of the agent pipelines. It also includes the flow to create and edit Watches.

**Acceptance Criteria:**
1. **Watch List Page:** 
   - Displays a grid of configured watches.
   - Shows empty state (`empty-watches`) if the user has no watches.
   - Cards display high-level stats: topic name, status (active/paused/running with CSS pulse animation), frequency, significance threshold, finding count, and last run timestamp.
2. **Watch Creation/Editing (Dialog):**
   - Opened via "Create Watch" button on the dashboard.
   - Form fields: Topic, Search Queries (dynamic list with add/remove capability), Frequency (Hourly, Daily, Weekly), Significance Threshold (1-10 slider or select), Notification Email, Slack Webhook, Active toggle.
   - Submitting the form stays on the Dashboard, shows a success toast, and adds the new Watch to the list in a "waiting for first run" state.
3. **Data Fetching:**
   - Fetching list of watches initially uses React Server Components.
   - Real-time status updates rely on TanStack Query polling (for `run_in_progress` state).
   
## UI & Architecture
- **Design Tokens:** Strict adherence to `.istm-context/design.md`. 
  - Canvas: `var(--color-canvas)`
  - Cards: `watch-card` structure with `var(--color-surface)` and `var(--color-hairline)` borders.
  - Buttons: Use `button-primary` and `button-secondary` styles.
- **Typography:** 
  - Page H1: `Playfair Display`
  - Badges/Chips/UI Chrome: `Space Grotesk`
  - Body/Metadata: `Inter`
  - Numbers/Timestamps: `JetBrains Mono`
- **Components:** Reuse `shadcn/ui` where applicable (Dialog, Button, Input, Switch, Select). All `shadcn/ui` components must be restyled to map to the `design.md` custom properties. Do not hardcode Tailwind hex colors (e.g., no `bg-gray-900`).
- **Icons:** exclusively `Lucide`.
- **Empty States:** Must strictly follow the `empty-watches` rules from `design.md` (no images/emojis, strictly CSS + Lucide).

## Strict Typing & Constants
- All TypeScript interfaces and types must be placed in `app/(dashboard)/watches/types/index.ts`. The use of `any` is strictly forbidden.
- Use Zod for form validation and infer types from the schema.
- All constants (validation limits, default values, query polling intervals) must be placed in `app/(dashboard)/watches/constants/index.ts`.

## Build Plan

### Step 1: Global Setup (CSS & Layouts)
Verify and ensure `globals.css` properly implements the design tokens from `.istm-context/design.md`. Ensure `layout.tsx` wraps the application correctly with the appropriate fonts (`Playfair Display`, `Space Grotesk`, `Inter`, `JetBrains Mono`) and theme provider.

### Step 2: Types and Constants
- Create `app/(dashboard)/watches/types/index.ts` to define the `Watch` interface matching the database schema and the `WatchFormValues` derived from Zod.
- Create `app/(dashboard)/watches/constants/index.ts` to store default form values and polling intervals.

### Step 3: Server Actions & API Fetching
- Create `app/(dashboard)/watches/actions.ts` to include Server Actions for `createWatch`, `updateWatch`, and `deleteWatch`. Ensure these validate with Zod and interact safely with Neon Postgres via Prisma.
- Implement server-side data fetching for the watch list inside the `page.tsx` Server Component.

### Step 4: Components Development
Build focused, reusable UI components mapped to the design tokens:
- `WatchCard` (`app/(dashboard)/watches/components/WatchCard.tsx`): Displays stats and the pulsing `AgentStatusBadge`.
- `WatchList` (`app/(dashboard)/watches/components/WatchList.tsx`): Renders the grid (responsive: 4 cols on desktop, 1 on mobile) or the empty state.
- `WatchForm` (`app/(dashboard)/watches/components/WatchForm.tsx`): Uses `react-hook-form` and `zod` for validation. The "Search queries" field must be a dynamic Field Array allowing users to add/remove queries.
- `CreateWatchDialog` (`app/(dashboard)/watches/components/CreateWatchDialog.tsx`): Wraps the form in a shadcn/ui Dialog.

### Step 5: Page Integration
- Assemble the `app/(dashboard)/watches/page.tsx`.
- Include TanStack Query for polling watch statuses (e.g., `useWatches` hook) and merging it with the initial server-provided data.
- Ensure the success toast is triggered upon successful creation and the modal closes smoothly.
