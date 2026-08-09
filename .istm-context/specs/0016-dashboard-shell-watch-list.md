# Spec 0016: Dashboard Shell and Watch List — Full Ground-Up Redesign

**Status**: Ready for `/istm-develop`
**Scope**: Dashboard layout shell, sidebar navigation, split-pane watch list + watch detail panel
**Design System**: Warm Slate Editorial (design.md, post-overhaul)
**Fonts**: DM Sans (UI) + DM Mono (data)

---

## 1. Summary and Requirements

This spec defines the new dashboard shell from zero. No component from the previous implementation carries over. Every file in the scope is rewritten.

### Acceptance Criteria

- [ ] Visiting `/watches` renders a two-column split-pane layout: a narrow watch list on the left and a detail panel on the right.
- [ ] The 64-px icon-rail sidebar sits to the left of the split-pane at all viewport widths above 768 px.
- [ ] Selecting a watch item in the list immediately shows its detail in the right pane without a page navigation.
- [ ] Each watch card in the list shows a pulsing dot when `run_in_progress` is true.
- [ ] Hovering a watch card reveals a Quick Actions row (Run Now, Pause/Resume) that slides in from the bottom of the card.
- [ ] A significance threshold micro-badge renders a horizontal progress bar scaled 1 to 10.
- [ ] Watch cards animate into the list on mount (staggered fade-up, 40 ms delay between each card).
- [ ] The detail panel shows: topic heading, status chip, findings timeline, and digest history as two sub-tabs.
- [ ] A "New Watch" floating action button opens a slide-in drawer on the right.
- [ ] The layout is fully responsive: below 768 px the split-pane collapses to a single-column view with a back arrow to return to the list.

---

## 2. Design Token Compliance

All values below come directly from `.istm-context/design.md`. No raw hex codes appear in any component.

### Color mapping for this spec

| Use case | Token |
|---|---|
| Page background | `bg-canvas` (#FAFAFA) |
| Sidebar background | `bg-sidebar` (#F4F4F5) |
| Active nav rail item | `bg-sidebar-active` (#E4E4E7) |
| Card surface | `bg-surface` (#FFFFFF) |
| Card inset area | `bg-surface-inset` (#F4F4F5) |
| Card border | `border-hairline` (#E4E4E7) |
| Strong border | `border-hairline-strong` (#D4D4D8) |
| Primary action buttons | `bg-primary text-on-primary` |
| Accent (active states, nav highlight) | `text-accent bg-accent-soft` (#7C3AED / #EDE9FE) |
| Monitoring status dot | `text-success bg-success-soft` (#059669) |
| Paused status | `text-ink-faint bg-surface-inset` |
| Running pulse | `var(--color-pulse)` via `.status-dot--running` |
| Danger actions | `text-danger bg-danger-soft` |

### Typography mapping

| Element | Class |
|---|---|
| Watch topic heading | `text-sm font-sans font-semibold text-ink` |
| Category / status chips | `text-[10px] font-mono uppercase tracking-widest` |
| Timestamps / scores | `text-[11px] font-mono text-ink-faint` |
| Body text | `text-xs font-sans text-ink-muted` |
| Section labels | `text-[10px] font-mono uppercase tracking-widest text-ink-muted` |

---

## 3. Layout Architecture

### Shell structure (desktop)

```
+----------+----------------------------------------------------------+
| 64px     | Split-Pane Container (flex-1)                            |
| Sidebar  |                                                          |
| Icon     +---------------------+------------------------------------+
| Rail     | Watch List Pane     | Watch Detail Pane                  |
|          | w-[320px] shrink-0  | flex-1                             |
|          |                     |                                    |
|          | [WatchListPane]     | [WatchDetailPane]                  |
+----------+---------------------+------------------------------------+
```

### Shell structure (mobile, below 768px)

```
+--------------------------------------+
| Mobile Header (48px fixed top)        |
| Logo + Hamburger                      |
+--------------------------------------+
| Single column: either WatchListPane   |
| or WatchDetailPane                    |
| (controlled by selectedWatchId state) |
+--------------------------------------+
```

---

## 4. File Structure

All new files live inside the watches feature. Pages stay thin. Business logic lives in services and hooks.

```
app/app/(dashboard)/
  watches/
    page.tsx                        <- Server Component: fetches initial watch list from Neon
    components/
      WatchesShell.tsx              <- Client orchestrator: manages selectedWatchId state
      WatchListPane.tsx             <- Left column: search, filters, cards
      WatchListItem.tsx             <- Single row/card with hover quick actions
      WatchStatusDot.tsx            <- Pulsing dot (running / active / paused)
      WatchThresholdBar.tsx         <- Significance threshold progress micro-badge
      WatchDetailPane.tsx           <- Right column: tabs (Findings / Digests)
      WatchDetailHeader.tsx         <- Topic, status, Run Now, Configure toggle
      WatchSettings.tsx             <- Collapsible config (moved from old detail)
      WatchQuickActions.tsx         <- Hover-revealed row: Run Now, Pause
      NewWatchFab.tsx               <- Floating action button
    hooks/
      useSelectedWatch.ts           <- Manages selectedWatchId, syncs to URL ?watch=id
      useWatchPolling.ts            <- TanStack Query polling for run_in_progress
    types/
      index.ts                      <- Watch, Finding, Digest types (strict, no `any`)
    constants/
      index.ts                      <- STATUS_FILTERS, FREQUENCY_LABELS, POLL_INTERVAL_MS
    actions.ts                      <- createWatch, updateWatch, deleteWatch, runWatchNow
```

---

## 5. Component Specifications

### 5.1 WatchesShell.tsx (Client Component)

Responsibility: owns `selectedWatchId` state, renders the two-pane layout.

State:
```ts
const [selectedWatchId, setSelectedWatchId] = useState<string | null>(null)
```

On mobile: renders either WatchListPane or WatchDetailPane, not both.
On desktop: renders both side by side.
URL sync: `?watch={id}` so the selection survives a reload.

Layout classes:
```
flex h-[calc(100vh-0px)] overflow-hidden bg-canvas
```

### 5.2 WatchListPane.tsx

Responsibility: header, search input, status filters, staggered card list, New Watch FAB.

Header (sticky, shrink-0):
```
px-4 py-3 border-b border-hairline bg-surface flex items-center justify-between
```
Left: `text-sm font-sans font-semibold text-ink` label "Watches"
Right: icon button (Plus) to open new watch drawer

Search (below header):
```
px-4 py-2 border-b border-hairline
```
Input with Search icon, `bg-surface-inset border-hairline rounded-md`
Uses `useDeferredValue` for performance.

Status filter pills (below search):
```
px-4 py-2 flex gap-1.5 border-b border-hairline overflow-x-auto scrollbar-hide
```
Pills: ALL / MONITORING / RUNNING / PAUSED
Active pill: `bg-accent-soft text-accent border-accent/20`
Inactive pill: `bg-surface-inset text-ink-muted border-hairline`

Card list (flex-1 overflow-y-auto):
Maps `filteredWatches` to `WatchListItem`.
Staggered animation: each card uses `motion/react` with `initial={{ opacity: 0, y: 10 }}` and `transition={{ delay: index * 0.04 }}`.

Empty state (when 0 watches):
Eye icon + "No watches yet" + "Create your first watch" CTA button.

### 5.3 WatchListItem.tsx

Responsibility: single watch row with hover quick actions.

Base layout (no hover):
```
group relative flex flex-col gap-2 px-4 py-3.5 border-b border-hairline
cursor-pointer transition-colors hover:bg-surface-inset overflow-hidden
```

Selected state: `bg-accent-soft border-l-2 border-l-accent` (left accent stripe)

Row 1 (topic + status dot):
```
flex items-center justify-between gap-2
```
WatchStatusDot on the right. Topic: `text-sm font-sans font-semibold text-ink truncate`.

Row 2 (meta chips):
```
flex items-center gap-2
```
Frequency chip: `text-[10px] font-mono text-ink-faint bg-surface-inset rounded-sm px-1.5 py-0.5 border border-hairline uppercase`
Last run: `text-[11px] font-mono text-ink-faint`

Row 3 (threshold bar):
```tsx
<WatchThresholdBar threshold={watch.significanceThreshold} />
```

Quick Actions row (hover reveal):
```
absolute bottom-0 left-0 right-0
translate-y-full group-hover:translate-y-0
transition-transform duration-150 ease-out
bg-surface-inset border-t border-hairline px-4 py-2
flex items-center gap-2
```
Contains WatchQuickActions buttons.
IMPORTANT: parent WatchListItem needs `overflow-hidden` so the reveal clips correctly.

### 5.4 WatchStatusDot.tsx

A small semantic status indicator.

```tsx
// running  -> pulsing emerald dot (uses .status-dot--running CSS class)
// active   -> solid emerald dot (no animation)
// paused   -> solid zinc dot (text-ink-faint)
```

Size: `w-2 h-2 rounded-full`

### 5.5 WatchThresholdBar.tsx

A significance threshold micro-badge. Renders inline below the meta chips.

```
flex items-center gap-2
```

Label: `text-[10px] font-mono text-ink-faint`
Bar track: `flex-1 h-1 bg-surface-inset rounded-full border border-hairline overflow-hidden`
Bar fill: `h-full bg-accent rounded-full` with `width: {threshold / 10 * 100}%`
Value label: `text-[10px] font-mono text-ink-faint` showing `{threshold}/10`

### 5.6 WatchDetailPane.tsx

Responsibility: shows the detail for `selectedWatchId`. When nothing is selected shows an idle empty state.

Idle state (no watch selected):
```
flex-1 flex items-center justify-center bg-canvas
```
Eye icon + `text-sm text-ink-muted` "Select a watch to view its findings"

When a watch is selected:
```
flex-1 flex flex-col overflow-hidden
```
Top: WatchDetailHeader (topic, status, Run Now, Configure toggle)
Middle: collapsible WatchSettings panel
Bottom: two tabs (Findings / Digests) using shadcn/ui Tabs component

Tab bar:
```
px-5 border-b border-hairline shrink-0
```
Active tab: accent underline `border-b-2 border-accent text-accent`
Inactive tab: `text-ink-muted hover:text-ink`

Tab content (flex-1 overflow-y-auto p-4):
"Findings" tab -> FindingTimeline
"Digests" tab -> DigestHistory

### 5.7 WatchQuickActions.tsx

Shown only inside the hover-reveal row of WatchListItem.

Run Now button (disabled when running or in cooldown):
`bg-primary text-on-primary h-7 px-3 text-xs rounded-md`

Pause/Resume toggle:
Paused -> Resume: `border border-hairline text-ink-muted hover:text-success hover:border-success/30`
Active -> Pause: `border border-hairline text-ink-muted hover:text-danger hover:border-danger/30`

### 5.8 NewWatchFab.tsx

Floating action button at the bottom of WatchListPane.

```
sticky bottom-0 left-0 right-0 p-3 bg-surface border-t border-hairline
```

Button: `w-full bg-primary text-on-primary rounded-md h-9 text-sm font-medium flex items-center justify-center gap-2`
Icon: Plus (16px)
Label: "New Watch"
On click: opens WatchForm in a slide-in drawer (portal).

---

## 6. Data Flow

### Server Component (page.tsx)

Fetches initial watch list from Neon via `neon.ts`.
Passes to WatchesShell as `initialWatches: Watch[]`.
No client JS required for the initial render.

### Client polling (useWatchPolling.ts)

TanStack Query, `refetchInterval: POLL_INTERVAL_MS` (5000 ms).
Fetches `GET /api/watches` and returns updated `run_in_progress` flags.
Merges with local state so the status dot updates live.
Only active when at least one watch has `run_in_progress = true`.

### URL sync (useSelectedWatch.ts)

Reads `?watch=id` from the URL on mount.
Writes to URL on selection change (`replaceState`, no hard navigation).
Allows the user to share or reload to a specific watch.

### Types (types/index.ts)

```ts
export interface Watch {
  id: string
  topic: string
  searchQueries: string[]
  frequency: "hourly" | "daily" | "weekly"
  significanceThreshold: number
  active: boolean
  notificationEmail: string | null
  notificationSlackWebhook: string | null
  lastRunAt: string | null
  runInProgress: boolean
  createdAt: string
}

export interface Finding {
  id: string
  watchId: string
  url: string
  title: string
  summary: string
  significanceScore: number
  category: string
  keyFact: string
  publishedAt: string
  createdAt: string
}

export interface Digest {
  id: string
  watchId: string
  summary: string
  citations: string[]
  deliveredEmail: boolean
  deliveredSlack: boolean
  createdAt: string
}

export type StatusFilter = "ALL" | "MONITORING" | "RUNNING" | "PAUSED"
export type ViewTab = "findings" | "digests"
```

### Constants (constants/index.ts)

```ts
export const POLL_INTERVAL_MS = 5000
export const COOLDOWN_SECONDS = 900
export const DEDUP_THRESHOLD = 0.88

export const STATUS_FILTERS: StatusFilter[] = ["ALL", "MONITORING", "RUNNING", "PAUSED"]

export const FREQUENCY_LABELS: Record<string, string> = {
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
}
```

---

## 7. Motion Specification

### Card entrance (staggered fade-up)

```ts
// Apply to each WatchListItem via motion/react
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.18, ease: "easeOut", delay: index * 0.04 }}
```

### Quick actions reveal

CSS transition only (no Framer Motion for this):
```css
transition: transform 150ms ease-out;
/* Revealed: translate-y-0 */
/* Hidden: translate-y-full (clipped by overflow-hidden on parent) */
```

### Detail pane transition (watch swap)

```ts
// Wrap detail pane content in AnimatePresence with key={selectedWatchId}
// Switching watches fades out old detail, fades in new
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.12 }}
```

### Running pulse

Already defined in `globals.css` as `.status-dot--running`. No changes needed.

---

## 8. Responsive Behaviour

| Breakpoint | Sidebar | Watch List | Detail Panel |
|---|---|---|---|
| < 768px | Hidden (drawer) | Full width: list OR detail | Hidden unless watch selected |
| >= 768px | 64px icon rail | `w-[300px] shrink-0` | `flex-1` |
| >= 1280px | 64px icon rail | `w-[340px] shrink-0` | `flex-1` |

On mobile: when a watch is selected the list hides and the detail fills the screen with an ArrowLeft back button in the header.

---

## 9. Build Plan (for /istm-develop)

Execute these steps in order. Do not jump ahead.

Step 1: Create `types/index.ts` and `constants/index.ts`. These must exist before any component.

Step 2: Create `hooks/useSelectedWatch.ts` (URL sync + state).

Step 3: Create `hooks/useWatchPolling.ts` (TanStack Query for live status).

Step 4: Create `WatchStatusDot.tsx`.

Step 5: Create `WatchThresholdBar.tsx`.

Step 6: Create `WatchQuickActions.tsx`.

Step 7: Create `WatchListItem.tsx` (composes StatusDot, ThresholdBar, QuickActions).

Step 8: Create `NewWatchFab.tsx`.

Step 9: Create `WatchListPane.tsx` (composes ListItem, search, filters, FAB).

Step 10: Adapt `WatchDetailHeader.tsx` from Phase 2 work for the split-pane context.

Step 11: Adapt `WatchSettings.tsx` from Phase 2 work for the split-pane context.

Step 12: Create `WatchDetailPane.tsx` (tabs, header, settings, findings, digests).

Step 13: Create `WatchesShell.tsx` (compose WatchListPane + WatchDetailPane, manage state).

Step 14: Rewrite `page.tsx` to be a thin Server Component passing `initialWatches` to `WatchesShell`.

Step 15: Delete all old watch list components now replaced: `AllWatchesList.tsx`, `WatchList.tsx`, `WatchListHeader.tsx`, `WatchMetrics.tsx`, `WatchFilters.tsx`, `WatchCard.tsx`, `WatchRow.tsx`. Run `npx tsc --noEmit` and confirm 0 errors.

---

## 10. Out of Scope for This Spec

The following will get their own spec files:

- Login and Register page redesign (spec 0017)
- Settings and billing page redesign (spec 0018)
- Watch detail page when accessed via `/watches/[id]` direct URL (spec 0019)
