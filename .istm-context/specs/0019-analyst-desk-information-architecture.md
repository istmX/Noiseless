# Spec 0019: Analyst Desk Information Architecture

**Status**: Ready for `/istm-develop`  
**Scope**: Authenticated product navigation, Dashboard, Watches, Watch Detail, watch configuration placement, and system status placement  
**Excluded**: Public routes, authentication implementation, backend API contracts, database schema, scheduler behavior, billing mechanics, and visual token replacement

## Summary and Requirements

Noiseless must stop presenting every capability as a peer destination. The authenticated product becomes a three level analyst desk:

1. **Now**, the current intelligence briefing.
2. **Watches**, the monitored topic inventory.
3. **Watch Case File**, the evidence record for one monitored topic.

Settings remains the account and notification destination. System Health is removed from primary navigation because it is not a normal analyst task. Its status appears only where a user is affected.

### Acceptance criteria

1. Primary navigation contains only Now, Watches, and Settings.
2. Dashboard uses the page label `Now` and is a ranked evidence briefing. It does not show a full Watch list, configuration controls, or decorative system metrics.
3. Watches is an operational inventory with search, filters, states, last meaningful change, last run, frequency, and finding count.
4. A Watch Case File prioritizes the evidence timeline. Digests are secondary. Watch configuration is not visible by default.
5. One Configure watch action opens a dedicated drawer or dialog with Scope, Cadence, Significance, Delivery, Status, and Danger zone sections.
6. System state is shown in context: a failed run on its watch, a delivery failure on the related digest or settings surface, and a global banner only for a true global outage.
7. Existing CRUD, manual run cooldown, notification, plan lock, and live run behavior continue unchanged.
8. Logout reliably clears the server session, clears client state, and redirects to `/login`. This is an explicit regression acceptance criterion.

## Information Architecture

| Place | Primary question | Primary object | Primary action |
|---|---|---|---|
| Now | What matters since my last review? | Material finding | Open evidence |
| Watches | What am I monitoring? | Watch row | Open watch or create watch |
| Watch Case File | What has happened for this topic? | Evidence timeline | Run now |
| Configure Watch | How should this watch behave? | Watch rules | Save changes |
| Settings | Who am I and where do notifications go? | Account and delivery preferences | Save changes |

## UI Design

All work consumes `.istm-context/design.md` semantic tokens and shared shadcn/ui primitives. Use the existing warm paper canvas, opaque surfaces, quiet hairlines, compact radius, and restrained motion.

The application follows progressive disclosure. Each screen has one dominant object and one visually primary action. Supporting controls appear after the user selects the relevant object or explicit configuration entry point.

### Now

Header: `Now`, a brief time cue, and `New watch` as the sole global action.

Main content: a ranked evidence feed. A finding row contains the change, watch, one sentence explaining importance, source, time, and significance label. Selecting it reveals the evidence inspector without taking the user away from the briefing.

The empty state says that monitoring is active and explains when meaningful evidence will appear. It does not show generic metrics.

### Watches

Use an accessible desktop table and a compact mobile row layout. The Watch name is the strongest visual element. Keep state, last material change, last run, cadence, and finding count in quiet columns.

Search and filters remain in the table toolbar. The toolbar has one clear create action. No configuration form appears in this surface.

### Watch Case File

Header includes back navigation, Watch name, readable state, last check, query summary, and `Run now`.

The evidence timeline is first and receives the majority of the screen. Each finding is a concise analyst note with key fact, importance, source, time, score, and original link.

Digests are a secondary tab or contained section. They summarize evidence rather than compete with it.

### Configure Watch

Use a dedicated right drawer on desktop and full height sheet on mobile. It contains sections in this exact order:

1. Scope, topic name and search queries.
2. Cadence, frequency.
3. Significance, threshold and explanation.
4. Delivery, email and Slack destination.
5. Status, pause or resume.
6. Danger zone, delete Watch behind a confirmation dialog.

The drawer preserves existing field validation, save pending state, tier gated hourly control, notification email fallback, and delete confirmation behavior.

### System state

Remove System Health from the labeled sidebar and command navigation. Do not remove backend monitoring data.

Show an unobtrusive all clear state only in the sidebar footer or Settings. Surface a problem in the affected context first. A global warning banner is reserved for a confirmed application wide outage.

## Architecture and Data Rules

No FastAPI endpoint, database migration, provider, or new data model is required. Existing Watch, Finding, Digest, notification, and run state fields are the sources for all displayed values.

All new types live in dedicated feature `types/` folders. All navigation labels, section definitions, status labels, table columns, and configuration section identifiers live in dedicated `constants/` folders. Do not use `any`.

Keep pages thin. Initial data stays in Server Components. Client components own drawer state, keyboard interactions, and live refresh behavior only.

## Build Plan

### Step 1: Global setup, layout, and navigation

Review `globals.css` and the authenticated layout before changing route components. Preserve the locked Signal Desk token system and root font configuration. Reconfigure the primary navigation and command definitions to include Now, Watches, and Settings only. Remove the System Health primary entry and route level presentation from the shared shell.

### Step 2: Now briefing

Refactor Dashboard into the evidence first briefing. Reuse existing findings and Watch reads. Remove any full inventory, configuration, and nonactionable system metric content. Implement populated, empty, loading, and error states.

### Step 3: Watches inventory

Refactor the all Watches route around the strict table columns. Keep existing search, status filters, Watch creation drawer, and responsive behavior. Ensure mobile has a clear single column alternative.

### Step 4: Watch Case File and configuration separation

Refactor Watch Detail so the timeline is the dominant content. Keep digest history secondary. Move existing configuration controls into the dedicated Configure Watch drawer or sheet. Preserve all existing server actions and guards.

### Step 5: Contextual system state and logout regression

Move global service state out of the main navigation. Add contextual state presentation only where an existing data source identifies a problem. Trace and correct logout behavior so it clears the server and client sessions and redirects to `/login`.

### Step 6: Cleanup and verification

Remove obsolete navigation, components, constants, and visual controls after confirming they have no references. Verify all acceptance criteria, keyboard behavior, responsive layouts, logout redirect, and `npx tsc --noEmit`.

## Non Goals

1. No new backend monitoring feature.
2. No new analytics charts or artificial metrics.
3. No public route work.
4. No visual design system replacement.
5. No billing flow changes.
