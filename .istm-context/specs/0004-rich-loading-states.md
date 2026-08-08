# Feature Specification: Rich Loading States and Skeletons

This specification defines how the application handles page transitions, form submissions, and data fetches using modern skeleton loaders and progressive loading states instead of basic spinner graphics.

## Summary and Requirements

- Create unified skeleton loader components for every major dashboard view.
- Support route level transition indicators using Next.js loading conventions.
- Implement progressive loading for data tables, card grids, user profiles, and form buttons.
- Follow the design system tokens for background animation pulses and border roundings.

## UI and Architecture Integration

Every skeleton element uses the Tailwind animate pulse keyframe registered in the design system.
We style components with the following tokens:
- Skeleton borders: border-hairline
- Skeleton backgrounds: bg-surface-inset or bg-primary-soft
- Border radius: rounded-md for cards, rounded-sm for badges and inputs

## Component Registry

### 1. Global Route Loader (loading.tsx)
Placed at the root of the dashboard group to handle layout transitions.
Renders a grid of skeleton cards matching the watches list view.

### 2. Watch Card Skeleton (WatchCardSkeleton.tsx)
Replicates the dimensions and flex structure of the actual WatchCard component.
Hides the text values and renders grey pulse blocks with rounded corners.

### 3. Watch Row Skeleton (WatchRowSkeleton.tsx)
Replicates the table layout row structure with pulsing blocks of matching widths.

### 4. Profile Section Skeleton
Pulsing circular avatar placeholder and name blocks in the sidebar footer during initial load.

## Build Plan

### Step 1: Global Skeleton Utilities
Create a reusable skeleton component `Skeleton.tsx` inside `shared/components/ui/` if missing.
Export a basic pulsing div that accepts custom dimensions.

### Step 2: Next.js Route Level Loading
Add `loading.tsx` under `app/(dashboard)/watches/` and `app/(dashboard)/watches/[id]/` to render skeletons on slow server component responses.

### Step 3: Button State Transitions
Add disabled properties and inline skeletons to submit buttons in Login, Register, and Profile forms.
Disable form inputs during submission to prevent duplicate actions.
