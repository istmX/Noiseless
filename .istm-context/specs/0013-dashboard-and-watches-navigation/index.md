# Feature Specification: Dashboard and Watches Navigation Restructuring

This specification defines the separation of the main landing Dashboard from the Watches Workstation page, updates the calendar logic to use dynamic local dates, and adds sidebar navigation links.

## Summary and Requirements

- Convert the current landing dashboard into a dedicated Dashboard view at `/dashboard` (or root page `/`) featuring the dynamic calendar filter, metrics cards, and a date filtered watch list.
- Create a new Watches Workstation page at `/watches` that displays all watches in the database as a grid or list layout with search and status filters, but without any calendar date constraints.
- Update the calendar component in the Dashboard to dynamically calculate the current local month and year and default the selection to today's date.
- Update the sidebar to display navigation options for:
  - Dashboard (icon: LayoutDashboard)
  - Watches (icon: List)
  - Settings (icon: Settings)
- Ensure all types are strictly defined. Forbid the use of the `any` type.

## UI and Architecture Integration

### Route Refactoring
- Rename or relocate watches dashboard page to `/app/app/(dashboard)/page.tsx` (the main Dashboard view).
- Create a new watches list workstation page at `/app/app/(dashboard)/watches/page.tsx` that fetches and renders all watches.

### Sidebar Link Updates
- File: `/app/shared/components/Sidebar.tsx`
  - Update navigation items array to include the new Dashboard and Watches paths.

## Build Plan

### Step 1: Update Calendar Component
1. Modify the calendar generation logic in `WatchList.tsx` to get the current actual date: `new Date()`.
2. Generate calendar grids dynamically based on the current local month and year.
3. Default `selectedDate` to the current local day of the month.
4. Remove the hardcoded limit of eight and evaluate watch creation dates relative to the selected day.

### Step 2: Separate Dashboard and Watches Routes
1. Set the root route `/` or `/dashboard` to render the Dashboard workstation (complete with metrics, calendar, and date filtered watches).
2. Set the `/watches` route to render the Watches Workstation showing all database watches with filters, search, and table options, but bypassing calendar date filters.

### Step 3: Update Sidebar Navigation
1. Edit the navigation links in `/app/shared/components/Sidebar.tsx`.
2. Add a new item for Dashboard linking to the root path `/`.
3. Retain the Watches item linking to `/watches`.
