# Feature Spec: Watch Workstation Toggle View and Date Filters

This specification defines the updates for the watch detail page (`/watches/[id]`). We are adding a toggle view to choose between a compact list of links and the full detailed timeline. We are also adding a date and time range filter that filters both the findings and the digests.

* * *

## Summary and Requirements

### 1. View Toggle
* The user can toggle between two views on the watch detail page:
  * **Links Index**: A highly compact list displaying only the source favicon, domain name, article title, date, and significance score. Clicking a row opens the link in a new tab.
  * **Detailed Timeline**: The existing cards layout that shows full titles, categories, and AI summaries.
* The toggle control should use an animated pill design to switch modes.

### 2. Date and Time Range Filters
* Add a filter control bar above the evidence and digest panels.
* Quick preset selections for filtering (including Today, Yesterday, This Week, and All Time).
* Dynamic date range filtering using a calendar selector to filter both findings and digests.
* An inline search input to search and filter by keywords in titles, domains, or summaries.

### 3. Acceptance Criteria
* The selection of the active view (Links Index or Detailed Timeline) is preserved on the client side.
* The date filter applies to both the Findings Timeline and the Digest History sections concurrently.
* No horizontal scrollbars or overflow on mobile screens.
* Strict compliance with the design tokens.

* * *

## Design and Tokens

We will use the Warm Slate Editorial design system.

* **Canvas Background**: `bg-canvas`
* **Surface Panels**: `bg-surface` or `bg-surface-elevated`
* **Text Hierarchy**: `text-ink` for headers, `text-ink-body` for body, `text-ink-muted` for descriptions, `text-ink-faint` for metadata
* **Accent Accent Soft**: `bg-accent` and `bg-accent-soft`
* **Border Lines**: `border-hairline`
* **Status Badges**: `bg-success-soft text-success`, `bg-warning-soft text-warning`, `bg-danger-soft text-danger`

* * *

## Folders and Typing Rules

* **Types Folder**: We must define all types in a dedicated `types/` folder inside the local feature directory. Do not use the `any` keyword.
* **Constants**: All static lists (such as filter presets) must go into a `constants/` folder.

* * *

## Build Plan

### Step 1: Global Setup (CSS and Layouts)
* Ensure `app/app/globals.css` defines the Warm Slate Editorial design system variables.
* The root layout wrapper (`layout.tsx`) must expose the theme provider and keep the canvas container layout responsive.

### Step 2: Types and Constants Definition
* Create or update the types in `/watches/[id]/findings/types/index.ts` to include the fields needed for date sorting.
* Create `/watches/[id]/components/constants.ts` to store the date range filter presets.

### Step 3: Implement the Filter Bar Component
* Create a `/watches/[id]/components/WatchFilterBar.tsx` component.
* This component houses the preset buttons (Today, Yesterday, Last Week, All Time), a date range picker, and the toggle buttons for "Links Index" versus "Detailed Timeline".

### Step 4: Build the Links Index Component
* Create `/watches/[id]/findings/components/FindingLinksList.tsx` for the compact view.
* It must display a clean, space saving grid row for each finding (title link, domain name, date, and score badge).

### Step 5: Update the Watch Detail View Container
* Edit `/watches/[id]/components/WatchDetailView.tsx` to host the new filter state and toggle state.
* Filter findings and digests on the client based on the active search query and date range.
* Render either `FindingLinksList` or `FindingTimeline` depending on the active view state.

### Step 6: Layout and Overflow Verification
* Test the layout at various viewport widths.
* Ensure all tables, grids, and filters wrap properly and prevent horizontal overflow.
