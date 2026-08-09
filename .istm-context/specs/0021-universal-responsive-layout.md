# Spec 0021: Universal Responsive Layout Overhaul

## Summary & Requirements
This specification details the plan to make the entire Noiseless application fully responsive across all screen sizes and devices (mobile, tablet, laptop, desktop, and ultrawide), with testing targets at 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, and 1920px. 

### Core Acceptance Criteria
- **Zero Horizontal Page Scrolling:** Mobile viewports must not experience horizontal overflow or clipping. All layout containers must use fluid sizes (`w-full`, `max-w-7xl`, `min-w-0`).
- **Mobile-First Bottom Navigation Bar:** For mobile viewports, the desktop floating 64px sidebar (`SidebarRail`) collapses into a bottom navigation bar pinned to the viewport bottom.
- **Card-Based Table Reflowing:** Dense tabular views (e.g., watch lists, system health reports, or list tables) must reflow into stacked cards on mobile devices.
- **Text Wrapping & Overflow Safety:** All paragraphs, headers, metrics, and details must wrap gracefully using `break-words` or `normal` wrap, never causing horizontal layout push-out.
- **Form & Interactive Target Sizing:** All input fields, select dropdowns, threshold sliders, checkout forms, dialog boxes, and command menus (`⌘K`) must resize dynamically to fit mobile width without vertical or horizontal layout breaking. Touch targets should be accessible (min height 44px for main controls).
- **Responsive Workspace Panels:** The two-column research workstation view (comfortable reading on the left, evidence explorer on the right) must collapse into a stacked single-column flow on mobile and tablet viewports.

---

## Step 1: Global Setup (CSS & Layouts)
1. **Modify Root Layout & CSS:**
   - Update `app/app/globals.css` to add any helpers if necessary. We should rely entirely on Tailwind CSS v4's fluid utilities, container classes, and breakpoint hooks (`sm:`, `md:`, `lg:`, `xl:`).
   - Ensure the root layout wrapper sets up viewport settings properly (`viewport` metadata in Next.js).
   - Ensure the main content canvas container utilizes dynamic padding (`pb-20 md:pb-0 md:pl-20`) to prevent overlap with the mobile bottom navigation bar and the desktop sidebar rail.

---

## UI & Architecture

### Mobile Navigation Bottom Bar
- On mobile devices (`md:hidden`), a fixed bottom bar `BottomNav` will render.
- Pinned at `bottom-0 left-0 right-0 z-50`.
- Styled as a sleek capsule or edge-to-edge bar with warm slate tokens (`bg-surface/80 backdrop-blur-md border-t border-hairline`).
- Key links: Dashboard, Watches, Settings (Billing/Profile), and internal navigations.

### Workspace Split View Stack
- The watch workstation detail screen (`/watches/[id]`) uses a two-column desktop layout.
- For screens `< md` (or `< lg` depending on panel width), it must stack vertically into a single column.
- The evidence lists and sub-tabs should stack or wrap cleanly.

---

## Strict Typing & Constants
- If new navigation routes are mapped, update `NAV_ITEMS` in navigation constants.
- Avoid using type casting or `any` in component audits.

---

## Build Plan

### Phase 1: Shell & Navigation Refactor
1. **Update Shell Wrapper (`DashboardLayout.tsx`):**
   - Adjust page layout spacing: add `pb-16 md:pb-0` and `pl-0 md:pl-20` to prevent any text or container clipping by the sticky navigation panels.
   - Inject the new `BottomNav.tsx` component visible only on mobile screens (`block md:hidden`).
2. **Implement `BottomNav.tsx`:**
   - Create a clean navigation component with icons and text labels (e.g. Dashboard, Watches, Settings).
3. **Hide SidebarRail on Mobile:**
   - Verify `SidebarRail.tsx` has `hidden md:flex` to hide on small screens.

### Phase 2: Page-by-Page Audit & Responsive Adjustments
1. **Dashboard Triage Surface:**
   - Ensure the Signal Inbox grid / list stacks vertically on mobile.
   - Adjust `FindingInspector` overlay or card to fit within 100vw.
   - Make the metrics bar wrap or stack cleanly.
2. **Watches Operational Inventory:**
   - Refactor `WatchList.tsx`, `WatchCard.tsx`, and `WatchRow.tsx` so table rows reflow or switch to card-based grid elements under `md` viewports.
   - Check search filters and `⌘K` command bar input for horizontal sizing safety.
3. **Watch Workstation Sub-pages (`/watches/[id]/...`):**
   - Ensure `WorkspaceNav` is a scrollable row or stacks properly.
   - Rework columns to stack. For example, left summary pane and right evidence pane stack dynamically.
   - Let timelines and citations wrap and fit.
4. **Settings & Billing Pages (`/settings` & `/settings/billing` & `/checkout/[plan]`):**
   - Form field grids must be `grid-cols-1 md:grid-cols-2`.
   - Card masks, inputs, and payment buttons must have fluid width limits.
5. **Awwwards Landing Page (`/` / `app/page.tsx`):**
   - Adjust GSAP targets, ScrollTrigger, and sizing to prevent text clipping.
   - Change horizontal flexing grid columns to stack vertically on mobile.
   - Ensure interactive simulators or FAQ cards use relative units.

### Phase 3: Verification & Compilation
- Build test: `npx tsc --noEmit`
- Run dynamic page checks at 320px and 768px.
