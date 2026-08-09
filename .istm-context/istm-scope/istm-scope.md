# Scope: Noiseless

Noiseless is an automated workspace for intelligence monitoring. It helps professionals track important topics by scanning the web and delivering high value updates.

**Build approach:** Tracer Bullet (each feature is built end to end through all code layers).
**Workflow:** Medium (runs check verify then tests after build).

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack and database foundation | Foundation | existing |
| 2 | User authentication | Foundation | existing |
| 3 | Watches dashboard | Slice 1 | existing |
| 4 | Watch details workstation | Slice 2 | existing |
| 5 | Profile settings | Slice 3 | existing |
| 6 | Backend API and scheduler | Slice 4 | existing |
| 7 | Search and intelligence pipeline | Slice 5 | existing |
| 8 | Token consumption enforcement | Slice 6 | in-progress |
| 9 | Interactive billing checkout | Slice 7 | in-progress |
| 10 | Dashboard and watches navigation | Slice 8 | in-progress |
| 11 | Watch workspace fixes | Slice 9 | in-progress |
| 12 | Workspace quality improvements | Slice 10 | in-progress |
| 13 | Dev Native Design System and Global Shell | Redesign Slice 1 | in-progress |
| 14 | Intelligence Stream Dashboard and Citation Inspector | Redesign Slice 2 | planned |
| 15 | Interactive Data Table Watches Workstation | Redesign Slice 3 | planned |
| 16 | Watch Detail and RAG Digest Inspector | Redesign Slice 4 | in-progress |
| 17 | Live Agent Telemetry and Execution Trace | Redesign Slice 5 | planned |
| 18 | Consolidated Settings Profile and Billing | Redesign Slice 6 | planned |

## Existing features

### 1. Stack and database foundation · existing
Scaffold the Next.js frontend, Python FastAPI backend, and Neon Postgres database.
code in `app/` and `backend/`

### 2. User authentication · existing
Secure credentials registration and session tracking using NextAuth.js.
code in `app/app/(auth)/`

### 3. Watches dashboard · existing
Display user watches, run status, and metrics in a custom list.
code in `app/app/(dashboard)/`

### 4. Watch details workstation · existing
Show findings timeline, digest history, and watch configuration panels.
code in `app/app/(dashboard)/watches/`

### 5. Profile settings · existing
Update user display names and dynamic Dicebear avatar selectors.
code in `app/app/(dashboard)/settings/`

### 6. Backend API and scheduler · existing
Provide watch API endpoints and schedule in process runs using APScheduler.
code in `backend/app/`

### 7. Search and intelligence pipeline · existing
Retrieve Tavily pages, perform vector deduplication, and score significance using Groq.
code in `backend/app/agent/`

## Active features

### 8. Token consumption enforcement · in-progress
Track user token balances and deduct tokens on watch runs. Block runs when balances are low.
**Done when:** the agent pipeline verifies user balances before starting, decrements balances by ten on successful runs, and commits the result to the database.
- [x] Design it (spec): `/architect token consumption enforcement`
- [x] Build it: `/istm-develop token consumption enforcement`
   - [x] Database model migration (cuid and tier)
   - [x] Backend pipeline enforcement logic
   - [x] Depletion notifications (Slack and Brevo)
- [ ] Verify it: `/istm-check verify token consumption enforcement`
- [ ] Test it: `/istm-test token consumption enforcement`
Spec 0011 · code in `backend/app/agent/`

### 9. Interactive billing checkout · in-progress
A workspace pricing page showing active tier status and simulated payment options to purchase premium upgrades.
**Done when:** users see their real token balances, enter payment details in a form, trigger a database tier upgrade, and unlock hourly watches.
- [x] Design it (spec): `/architect interactive billing checkout`
- [x] Build it: `/istm-develop interactive billing checkout`
   - [x] Server actions for plan upgrades
   - [x] Interactive checkout dialog UI with payment tabs
   - [x] Hourly frequency locks in WatchForm and WatchDetailView
- [ ] Verify it: `/istm-check verify interactive billing checkout`
- [ ] Test it: `/istm-test interactive billing checkout`
Spec 0012 · code in `app/app/(dashboard)/checkout/`

### 10. Dashboard and watches navigation · in-progress
A landing Dashboard showing metrics and date filtered watches, and a separate Watches Workstation listing all watches without date constraints.
**Done when:** the calendar displays dynamic current date values, the dashboard is separated from the watches workstation route, and the sidebar contains navigation links for both.
- [x] Design it (spec): `/architect dashboard and watches navigation`
- [x] Build it: `/istm-develop dashboard and watches navigation`
   - [x] Dynamic calendar calculations and today date defaulting
   - [x] Separate dashboard and watches workstation pages
   - [x] Sidebar layout and proxy redirect updates
- [ ] Verify it: `/istm-check verify dashboard and watches navigation`
- [ ] Test it: `/istm-test dashboard and watches navigation`
Spec 0013 · code in `app/app/(dashboard)/`

### 11. Watch workspace fixes · in-progress
Fixes for watch execution states (Run Now), Toast feedback on rate limits, and default notification email fallbacks.
**Done when:** empty notification email fields default to the registered user account email, and triggering runs too early raises a toast warning with a spinner loading display on the button.
- [x] Design it (spec): `/architect watch workspace fixes`
- [x] Build it: `/istm-develop watch workspace fixes`
   - [x] Default notification email fallbacks
   - [x] Rate limit check and already running lock validations
   - [x] Run now button spinner and toast feedback alerts
- [ ] Verify it: `/istm-check verify watch workspace fixes`
- [ ] Test it: `/istm-test watch workspace fixes`
Spec 0014 · code in `app/app/(dashboard)/watches/`

### 12. Workspace quality improvements · in-progress
The custom animated 404 page, the system health stats page, and the watch execution cooldown with no change notifications.
**Done when:** the custom 404 page is available, the /agent system health metrics dashboard is populated, and the 15 minute button cooldown timer lock enforces rate limits.
- [x] Design it (spec): `/architect workspace quality improvements`
- [x] Build it: `/istm-develop workspace quality improvements`
   - [x] Animated 404 page with public image-copy-3.png asset
   - [x] System health metrics workstation page at /agent
   - [x] Fifteen minute button cooldown countdown and no changes token skipping
- [ ] Verify it: `/istm-check verify workspace quality improvements`
- [ ] Test it: `/istm-test workspace quality improvements`
Spec 0015 · code in `app/app/`

## Planned features (Redesign Phase)

### 13. Dev Native Design System and Global Shell · in-progress
Rebuild the core layout shell in pure obsidian dark theme with a 64px monolithic left rail, top breadcrumb bar, live agent status pulse dot, and Cmd K command menu overlay.
**Done when:** the left rail morphs active item backgrounds using Motion spring physics, Cmd K triggers the global command overlay, and the top bar displays breadcrumbs and live agent status.
- [x] Design it (spec): `/architect dev native design system and global shell`
- [x] Build it: `/istm-develop dev native global shell`
   - [x] Global setup and CSS design tokens
   - [x] Navigation Rail with spring layout morph
   - [x] Header breadcrumbs and live pulse indicator
   - [x] Global command palette overlay (Cmd K)
   - [x] Layout integration and verification
- [ ] Verify it: `/istm-check verify dev native global shell`
- [ ] Test it: `/istm-test dev native global shell`
Spec 0017 · code in `app/shared/components/shell/`

### 14. Intelligence Stream Dashboard and Citation Inspector · planned · needs a decision
Rebuild the main dashboard into a split pane view pairing a high density intelligence stream with a right side telemetry column and slide out citation inspector drawer.
**Done when:** selecting a finding row smoothly slides out the right citation drawer with spring physics, displaying extracted key facts, confidence ratings, and source web links.
- [ ] Design it (spec): `/architect intelligence stream dashboard and citation inspector`

### 15. Interactive Data Table Watches Workstation · planned · needs a decision
Rebuild the watches list as an interactive data table with inline status toggles, threshold sliders, frequency badges, and quick search filters.
**Done when:** users can sort and filter watches in a high density data table, toggle active status inline, and adjust significance thresholds without opening modals.
- [ ] Design it (spec): `/architect interactive data table watches workstation`

### 16. Watch Detail and RAG Digest Inspector · in-progress
Rebuild the watch detail page into a dual column workspace featuring a chronological finding feed on the left and a RAG digest reader with source citations on the right, with a compact links toggle and date range filters.
**Done when:** users can inspect findings chronologically, read generated digests with interactive source tags, toggle a dense links list, filter findings and digests by date, and trigger manual runs.
- [x] Design it (spec): `/architect watch detail and rag digest inspector`
- [ ] Build it: `/istm-develop watch detail and rag digest inspector`
   - [x] Types and Constants Definition
   - [x] Implement the Filter Bar Component
   - [x] Build the Links Index Component
   - [x] Update the Watch Detail View Container
- [ ] Verify it: `/istm-check verify watch detail and rag digest inspector`
- [ ] Test it: `/istm-test watch detail and rag digest inspector`
Spec 0020 · code in `app/app/(dashboard)/watches/`

### 17. Live Agent Telemetry and Execution Trace · planned · needs a decision
Rebuild the system health page (/agent) into a live telemetry inspector showing step by step background run execution traces, token consumption meters, and vector database status.
**Done when:** users can view live trace step durations (Tavily search, Qdrant dedup, Groq scoring) and track monthly token budgets visually.
- [ ] Design it (spec): `/architect live agent telemetry and execution trace`

### 18. Consolidated Settings Profile and Billing · planned · needs a decision
Consolidate user profile, notification webhook targets, API credentials, and subscription billing into a single tabbed workstation with spring animated tab indicators.
**Done when:** users switch smoothly between profile, webhooks, API keys, and billing tabs using spring animations, updating preferences without page reloads.
- [ ] Design it (spec): `/architect consolidated settings profile and billing`

## Legend

**The decision box.** Every feature carries exactly one, the sub-task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/istm-scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /istm-develop <feature>` + **2 to 5 milestones**; the tier's closing boxes (`Verify it` Lean+, `Test it` Medium+, `Review it` + `Document it` Full); any surfaced follow-up enrolled |
| `in-progress` (building) | `/istm-develop` | milestone sub-boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/istm-check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | the tier's last required stage (`Vibe` → `/istm-develop`; `Lean` → `/istm-check verify`; `Medium`/`Full` → `/istm-test`), then `/istm-sync` | required boxes ticked; `Review it`/`Document it` (Full) ticked by `/istm-check review`/`/istm-document`, tracked but not part of the `done` gate (Design/Build/Verify/Test); `/istm-sync` captures conventions |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/istm-develop` (or `/istm-audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre-workflow) and `dropped` (de-scoped, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (e.g. `· Full`, `· Vibe`) overrides the project default `**Workflow:**` tier for that one feature; no tag = inherit. It is the single rigor dial (there is no separate "weight").
- **Workflow** (header line) is the project default tier, the stages each feature runs **after** `/istm-develop`: **Vibe** = nothing after `/istm-develop` (rely on its build time self check); **Lean** = `/istm-check verify`; **Medium** = `/istm-check verify` then `/istm-test`; **Full** = `/istm-check verify`, `/istm-test`, a fresh model `/istm-check review`, then `/istm-document` (and most features need a spec). The tier also sets what closes a feature to `done`, the last required stage marks it: **Vibe** → `/istm-develop` (build + self check); **Lean** → `/istm-check verify` on PASS; **Medium**/**Full** → `/istm-test` (with verify passed). At every tier an `Assumed` spec still blocks `done` until `/architect` ratifies it, and `/architect` still gates any feature that needs a decision (tier does not turn the gate off). A feature's own tier tag overrides this default. `/istm-develop` reads the effective tier to scale the next steps it recommends.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/istm-develop`.
