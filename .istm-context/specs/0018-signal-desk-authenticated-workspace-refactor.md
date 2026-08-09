# Spec 0018: Signal Desk Authenticated Workspace Refactor

**Status**: In Progress  
**Scope**: Every authenticated application route and shared authenticated component  
**Excluded**: Login, registration, forgot password, checkout, privacy, terms, and 404 routes  
**Architecture impact**: Frontend presentation and interaction refactor only. No FastAPI route, database schema, billing entitlement, auth, scheduler, or agent pipeline behavior changes.

---

## 1. Summary

Noiseless must become a focused research workstation rather than a collection of decorative SaaS panels. This specification replaces the current mixed visual language, including ambient mesh gradients, general purpose glass panels, large pill treatments, floating icon only navigation, and colorful metric cards, across the authenticated application.

The new product language is **Signal Desk**. It is calm, editorial, precise, and evidence led. A user must be able to answer two questions at a glance:

1. What changed that needs my attention?
2. What action should I take next?

The experience takes hierarchy and density cues from serious analyst software and keyboard driven product tools. Content, evidence, and real system state carry visual emphasis. Navigation, decoration, and secondary controls recede.

This is one cohesive authenticated workspace feature. It replaces shared foundations first, then the application shell, then Dashboard, Watches, Watch Detail, System Health, Settings, and Billing. Existing server data contracts and user journeys remain intact.

---

## 2. Product Requirements and Acceptance Criteria

### 2.1 Functional requirements

1. All authenticated routes render inside one consistent Signal Desk shell.
2. Existing navigation, watch CRUD, run now cooldown, filtering, command palette behavior, settings, profile updates, billing tier display, and system health data continue to work.
3. Dashboard is a triage surface for material changes, not a duplicate Watch list.
4. Watches is a dense operational inventory on desktop and remains usable as a card based experience on small screens.
5. Watch Detail is an evidence workstation with findings as the primary content and configuration as supporting content.
6. System Health presents operational state clearly, including scheduler, workers, failures, and resource usage.
7. Settings and Billing use ordinary, clear form and comparison layouts rather than marketing oriented card layouts.
8. The command menu remains global, keyboard accessible, and useful for navigation and watch creation.

### 2.2 Visual acceptance criteria

1. There is no ambient mesh background, translucent glass card utility, decorative gradient metric card, or floating icon only desktop rail in authenticated routes.
2. The app uses a warm paper canvas, opaque surfaces, subtle borders, restrained elevation, and one nonsemantic accent color.
3. Semantic colors only communicate watch state, significance, warnings, errors, and successful delivery.
4. No raw color values appear in React components. Components use semantic Tailwind tokens and shared primitives.
5. Every interactive control has visible hover, focus visible, disabled, and pending states.
6. Every text row inside a flex or grid layout uses correct width constraints so long titles and URLs truncate rather than force horizontal overflow.
7. Desktop primary navigation uses readable labels. Mobile navigation is compact and touch safe.
8. All motion is brief and functional. The interface honors `prefers-reduced-motion`.

### 2.3 Verification criteria

1. `npx tsc --noEmit` completes without errors.
2. Authenticated routes render at 320, 375, 768, 1024, and 1440 pixel widths without horizontal overflow.
3. Existing watch create, update, pause, delete, and manual run flows work unchanged.
4. Dashboard, Watches, Watch Detail, System Health, Settings, and Billing have loading, empty, error, and populated states where data can be absent or delayed.
5. Keyboard navigation works for the command menu, visible controls have focus rings, and semantic status is not conveyed by color alone.
6. A codebase scan confirms that replaced shell utilities and unused legacy components are removed when no longer referenced.

---

## 3. Design System and Global Setup

### 3.1 Mandatory first build step

The very first implementation step is to rewrite `app/app/globals.css` and update the authenticated root layout composition before changing any route component. In the same change, update `.istm-context/design.md` so the durable design blueprint accurately matches the implemented tokens. The current blueprint and global stylesheet conflict, so the new token source must become the only source of truth.

Update `app/app/layout.tsx` only where needed for the final font variables and global document behavior. Do not change public route visual composition in this specification.

Use the existing Next.js font guidance from the installed Next.js documentation before touching font configuration.

### 3.2 Signal Desk token direction

The implementation must define semantic CSS variables, expose them through Tailwind v4 `@theme inline`, and consume only those names in components.

| Concern | Direction | Required semantic token family |
|---|---|---|
| Canvas | Warm near white paper with no gradient | `canvas`, `canvas-subtle` |
| Surfaces | Opaque white and quiet inset gray | `surface`, `surface-raised`, `surface-inset` |
| Text | Ink black, strong body, muted metadata, faint supporting detail | `ink`, `ink-body`, `ink-muted`, `ink-faint` |
| Structure | Low contrast neutral borders and separators | `hairline`, `hairline-strong` |
| Action | One indigo or cobalt accent for selected and primary interactive states | `accent`, `accent-hover`, `accent-soft`, `on-accent` |
| System state | Separate semantic success, warning, danger, and info families | `success`, `warning`, `danger`, `info`, plus soft variants |
| Elevation | Restrained neutral shadows only for drawers, menus, and raised panels | `shadow-low`, `shadow-medium`, `shadow-high` |
| Shape | Tight component rounding, reserved full rounding for status chips only | `radius-sm`, `radius-md`, `radius-lg`, `radius-full` |

Typography uses one interface sans family and one data mono family. Existing fonts may be retained only if they support this hierarchy and are configured consistently. Body text must be readable at 16 pixels on mobile. Data labels, timestamps, score values, shortcuts, and system identifiers use the mono family.

### 3.3 Shared visual rules

1. Use 6 to 8 pixel rounding for inputs, buttons, rows, and standard panels. Use 12 pixels only for drawers and larger dialog surfaces. Full rounding is exclusive to compact chips, avatar images, and intentionally circular controls.
2. Standard panels are opaque `bg-surface` with a one pixel hairline. Do not apply blur or a gradient to normal content panels.
3. Use borders to establish layout structure, but keep them quiet. Avoid borders around every small piece of metadata.
4. Use the accent color once per local context. A selected row, active tab, and primary button must not all demand attention at the same time.
5. A status indicator includes readable text or an accessible label. Dots are supporting signals, never the only representation of state.
6. Use Lucide icons only. Do not introduce emoji or image illustration placeholders.
7. Default transitions use opacity, background, border, and a maximum 4 pixel translate distance over 120 to 180 milliseconds. Do not use continuous pulses except while a real agent run is active.

---

## 4. Shared Architecture and File Rules

### 4.1 Preserve existing boundaries

Keep Next.js Server Components for initial data reads. Keep Server Actions for current watch mutations and the typed FastAPI client for agent operations. This refactor must not move business logic into route pages or duplicate backend calculations in client components.

### 4.2 Types and constants

All new or changed TypeScript types belong in a dedicated `types/` folder local to the feature, or in `app/shared/types/` when shared by multiple features. All shared labels, navigation entries, view definitions, keyboard shortcut strings, filter options, formatting limits, and responsive constants belong in the matching `constants/` folder.

Do not use `any`. Use discriminated unions for watch state, significance level, activity state, and table view state. Use `readonly` arrays for static command, navigation, and view definitions.

### 4.3 Required shared primitives

Review existing shadcn/ui primitives before creating a new one. Create or consolidate these shared authenticated primitives only where a matching component does not already exist:

1. `PageHeader` for breadcrumb, title, description, and right aligned actions.
2. `StatusBadge` for plain language watch, delivery, and system state.
3. `DataTableToolbar` for search, filters, views, and bulk actions.
4. `MetricReadout` for compact supporting metrics, not decorative dashboards.
5. `EmptyState` for a Lucide icon, concise heading, supporting copy, and one action.
6. `ActivityRow` for timestamped system and run events.
7. `SectionCard` for a titled opaque surface with an optional action.

Place cross feature visual primitives in `app/shared/components/`. Keep Watch specific components in `app/app/(dashboard)/watches/components/`.

---

## 5. Application Shell

### 5.1 Desktop shell

Replace `SidebarRail` with a fixed or sticky labeled sidebar. It is approximately 232 to 248 pixels wide, uses the quiet canvas or a slightly inset surface, and is separated from page content by a single vertical hairline.

Sidebar composition:

1. Workspace identity and compact wordmark at the top.
2. Primary navigation with icon and label pairs: Dashboard, Watches, System Health, Settings.
3. Optional contextual shortcut hints only when space allows.
4. Account block and logout at the bottom.
5. Selected navigation is identified by a quiet surface fill and accent text or a narrow accent rule, never a large dark pill.

The content area begins after the sidebar and uses a consistent page measure. Main pages use a fluid maximum width suited to data work. Do not center a narrow card column on a large workstation display.

### 5.2 Mobile shell

Replace the mobile pill tab bar with a compact top bar containing the page title, command trigger, and new watch action when relevant. Render a bottom navigation or controlled sheet menu with clear labels for primary destinations. Every tap target must be at least 44 by 44 pixels.

### 5.3 Command menu

Retain the global command menu but restyle it as an opaque raised surface with a focused search field, grouped results, clear selected state, and keyboard help in its footer. It must:

1. Open through Command K or Control K.
2. Restore focus to the trigger after close.
3. Support escape close, arrow navigation, enter execution, and click execution.
4. Clearly distinguish navigation, watch actions, and system actions.
5. Include empty search feedback and not rely on color alone for selection.

---

## 6. Route Specifications

### 6.1 Dashboard, `/dashboard`

**Purpose**: Triage meaningful changes since the user last reviewed their intelligence stream.

Layout:

1. `PageHeader` with contextual greeting, review period, and the sole primary action, `New watch`.
2. Compact intelligence summary with total reviewed, requiring attention, active watches, and next scheduled run. These are supporting readouts, not oversized cards.
3. Primary section, `Priority signals`, which ranks recent findings by significance and recency.
4. Secondary section, `Watch coverage`, which shows an operational snapshot and links to the full Watches inventory.
5. Right rail at desktop widths for agent activity, delivery issues, or a useful empty state. It collapses beneath the primary stream on smaller screens.

`Priority signals` rows show significance label, watch topic, evidence title, source domain, one sentence explaining why it matters, and timestamp. Selecting a row opens the existing Finding Inspector without losing list context.

The dashboard must never duplicate the complete Watch inventory. When there are no recent findings, it explains that the agent is monitoring normally and gives a direct path to create or review watches.

### 6.2 Watches, `/watches`

**Purpose**: Manage the full operational inventory of watches.

Desktop uses a dense, accessible table as the default presentation. Existing cards may serve as responsive small screen alternatives only.

Columns:

1. Watch name and query summary.
2. State, including monitoring, running, and paused.
3. Most recent material finding, or a quiet no findings value.
4. Last run and next scheduled run.
5. Frequency and threshold.
6. Notification destination summary.
7. Row actions.

Toolbar requirements:

1. Search input with visible label or accessible label.
2. Status filter.
3. Frequency filter when current data supports it.
4. Sort selection.
5. View toggle only if a meaningful alternative view remains after implementation.
6. `New watch` action.

Implement row selection and a bulk action bar only when bulk operations are supported by existing server actions. Do not render inactive bulk controls as decoration.

On mobile, show clear card rows with the same ordering of important information. Never require horizontal scrolling to operate a single watch.

### 6.3 Watch Detail, `/watches/[id]`

**Purpose**: Investigate evidence and manage one watch without separating the user from the findings stream.

Desktop uses a two column workstation:

1. Main evidence column, roughly two thirds of available width.
2. Supporting details column, roughly one third of available width.

Top header contains back navigation, watch title, clear text status, compact query tags, and `Run now`. Existing cooldown behavior stays intact and exposes the next eligible time in a readable label and accessible tooltip.

Main column:

1. Findings timeline is first and selected by default.
2. Each finding reads as an evidence row, with score, category, source, summary, key fact, timestamp, and source link.
3. Significance level is represented by a label plus a semantic token. Do not use large colorful badges.
4. Selecting a finding opens the existing inspector as a right side overlay or pane and preserves scroll position.
5. Digest history is a secondary tab or document section. Each digest is a readable brief with summary, cited sources, delivery status, and sent time.

Supporting column:

1. Watch configuration summary with explicit edit entry point.
2. Recent run activity and errors.
3. Notification destinations and most recent delivery outcome.
4. Source and query coverage summary where existing data permits.

Configuration editing uses a dedicated drawer or dialog, not a large always visible collapsible panel above the findings. It keeps existing inputs, plan lock states, save pending state, delete confirmation, and validation behavior.

On mobile, show the evidence stream first. Move support sections below it, and open editing in a full height sheet.

### 6.4 System Health, `/agent`

**Purpose**: Let a user understand whether the intelligence system is operating correctly.

Use a quiet operations layout:

1. Small status summary identifying scheduler health, active workers, and current incidents.
2. Timestamped activity feed for runs, retries, errors, and completion events.
3. Resource and quota views rendered as restrained bars or concise tables.
4. Clear degraded, offline, and retrying states with recovery information.

Do not treat operational metrics as decorative hero cards. Use stronger visual emphasis only for an actionable incident.

### 6.5 Settings and Billing, `/settings`

**Purpose**: Give users a familiar and trustworthy place to update account preferences and understand their plan.

Layout:

1. Local settings navigation or page sections for Profile, Notifications, and Plan.
2. Profile form uses visible labels, support text, inline validation, and a save confirmation.
3. Notification settings clearly state the default recipient and connected Slack status.
4. Billing uses a comparison table or orderly plan list that highlights the current tier, limits, renewal information when available, and the direct upgrade action.

Do not use large gradient plan cards in the authenticated settings experience. Pricing communication must be transparent and functional.

---

## 7. State, Accessibility, and Responsive Requirements

### 7.1 State handling

Every data surface has a deliberate representation for loading, empty, error, and populated states. Preserve existing route level skeletons where they match the new layout. Skeleton geometry must resemble final structure, not generic floating rectangles.

All asynchronous actions expose a pending state in their initiating control and a success or error outcome. No duplicate submissions are allowed while a watch is saving, deleting, or triggering a manual run.

### 7.2 Accessibility

1. Use semantic headings in page order.
2. Visible focus styles use the shared ring token and meet contrast requirements.
3. Buttons and icon controls have accessible names.
4. Table actions remain reachable by keyboard.
5. Status text is available to screen readers.
6. Dialogs, drawers, inspectors, and command menus trap focus and restore it on close through the existing Radix primitives.
7. Respect `prefers-reduced-motion` by removing transforms and continuous state animation.

### 7.3 Responsive behavior

| Width | Required behavior |
|---|---|
| 1440 and above | Labeled sidebar, fluid data workspace, Dashboard right rail, Watch Detail two columns |
| 1024 to 1439 | Labeled sidebar may narrow, data tables retain useful columns, supporting panels remain available |
| 768 to 1023 | Sidebar transitions to compact navigation, content uses one main column where needed |
| 375 to 767 | Mobile top bar and labeled mobile navigation, cards replace nonessential table columns, drawers become sheets |
| 320 to 374 | No horizontal overflow, single column content, compact but readable actions and metadata |

---

## 8. Build Plan

### Step 1: Global CSS, fonts, and authenticated layout

1. Read the relevant installed Next.js documentation before changing root font setup.
2. Replace current mesh, glass, gradient card, and excessive radius utilities in `app/app/globals.css` with Signal Desk semantic tokens, Tailwind mappings, focus styles, and reduced motion rules.
3. Update `.istm-context/design.md` so it precisely documents the final implementation tokens, typography, component rules, and motion standard.
4. Refactor `app/app/layout.tsx` and `app/app/(dashboard)/layout.tsx` only as needed to configure final fonts and a stable authenticated layout boundary.
5. Remove global utilities that have no remaining supported use.

### Step 2: Shared types, constants, primitives, and shell

1. Add or refine shared strict types and constants in their dedicated folders.
2. Consolidate shared UI patterns around existing shadcn/ui primitives.
3. Replace `SidebarRail` and current mobile pill navigation with the labeled responsive application shell.
4. Restyle and harden HeaderBar and CommandMenu behavior.
5. Remove obsolete rail, dock, glass, and pill classes after all imports are migrated.

### Step 3: Dashboard triage surface

1. Inventory the fields already available to the dashboard server component.
2. Recompose the route around the intelligence summary, priority signal rows, watch coverage, and agent activity.
3. Reuse Finding Inspector and existing data retrieval rather than introducing a duplicate API path.
4. Implement populated, empty, error, and loading states.

### Step 4: Watches operational inventory

1. Create strict view types and column constants in the Watches feature folders.
2. Build the desktop table, toolbar, row actions, and mobile card alternative from shared primitives.
3. Preserve current search, filters, creation drawer, status visibility, and plan gated frequency behavior.
4. Add only real bulk actions supported by existing server actions.

### Step 5: Watch Detail evidence workstation

1. Refactor the detail header into a compact action and status region.
2. Rebuild FindingCard, FindingTimeline, DigestCard, DigestHistory, and Finding Inspector around the evidence hierarchy.
3. Move Watch Settings into a drawer or dialog while preserving existing form behavior and destructive action confirmation.
4. Add supporting column sections for configuration, runs, and notification delivery using existing data only.
5. Verify run cooldown and live running state remain correct.

### Step 6: Operations, Settings, and Billing alignment

1. Refactor System Health into the operational layout and reuse ActivityRow and MetricReadout.
2. Refactor ProfileForm and BillingPlans into grouped settings sections with clear labels and plan comparisons.
3. Keep existing profile, email validation, avatar preview, tier state, and billing behaviors intact.

### Step 7: Legacy purge and verification

1. Scan all authenticated components and CSS for raw colors, old glass utilities, decorative gradients, floating rail references, and stale imports.
2. Delete components and constants only after confirming they have no references.
3. Run TypeScript verification and the project test suite available for affected routes.
4. Manually test the authenticated workspace at every required viewport, with keyboard only navigation and reduced motion enabled.
5. Update `progress.md` after verification with completed scope and any consciously deferred items.

---

## 9. Explicit Non Goals

1. No change to FastAPI routes, database migrations, agent scoring, scheduler behavior, authentication mechanics, token accounting, or plan entitlements.
2. No public route redesign, including login, registration, checkout, 404, privacy, and terms.
3. No heavy animation library expansion or scroll driven effects.
4. No new artificial dashboard metrics. The interface only visualizes available, trustworthy data.
5. No full replacement of shadcn/ui primitives.

---

## 10. Completion Definition

The refactor is complete when all authenticated screens operate as one coherent Signal Desk workspace, core watch and agent flows still function, the implementation uses the unified semantic token system, obsolete visual language is removed, and the verification criteria in this specification pass.
