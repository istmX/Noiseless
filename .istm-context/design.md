# Noiseless Signal Desk Design System

## Product character

Noiseless is a calm research workstation. It helps analysts identify material change without adding visual noise. Evidence and the next meaningful action have priority. Navigation and decoration recede.

## Foundations

The canvas is warm near white. Content surfaces are opaque. Borders are quiet. Shadows appear only when a panel is raised above its normal page context. Gradients, glass blur, large rounded cards, and decorative metric cards are not part of the authenticated product.

Typography uses the root sans family for interfaces and the root mono family for timestamps, scores, filters, shortcuts, and system data. Headings are concise and high contrast. Body copy uses a comfortable line height and restricted measure.

## Semantic tokens

Tokens are defined in `app/app/globals.css` and exposed through Tailwind.

| Purpose | Tokens |
|---|---|
| Workspace backgrounds | `canvas`, `canvas-subtle`, `sidebar` |
| Content surfaces | `surface`, `surface-raised`, `surface-inset` |
| Text hierarchy | `ink`, `ink-body`, `ink-muted`, `ink-faint` |
| Structure | `hairline`, `hairline-strong` |
| Interactive focus | `primary`, `accent`, `accent-soft` |
| System meaning | `success`, `warning`, `danger`, `info` and their soft variants |

Components must consume semantic token classes. Raw color values are allowed only in the global token declaration.

## Shape and elevation

Use `radius-sm` or `radius-md` for controls and rows. Use `radius-lg` for panels and drawers. Full rounding is limited to compact chips, avatars, and intentionally circular controls.

Standard panels use the shared `workspace-panel` class. Raised menus, inspectors, and short lived overlays use `workspace-panel-raised`.

## Application shell

Desktop navigation is a labeled sidebar. It contains workspace identity, primary destinations, and account actions. Mobile uses a compact header and reachable navigation controls. The global header carries page context, command search, and at most one contextual primary action.

## Content patterns

Dashboard is a triage view, with priority evidence first. Watches is the operational inventory, with a dense table on desktop and legible cards on smaller screens. Watch Detail is an evidence workstation. Settings and Billing are conventional grouped forms and clear plan comparisons. System Health is an operations display, not a decorative dashboard.

## Interaction and motion

Interactive elements show hover, focus visible, disabled, and pending states. Use quick color and opacity transitions. Movement is limited to short entry and exit transitions. A pulse is reserved for a real active agent run. Honor `prefers-reduced-motion`.

## Accessibility

Use semantic landmarks, labels for every form input, real buttons for actions, and accessible names for icon controls. State must have text or an accessible name in addition to color. Every layout must prevent horizontal overflow at narrow viewports.
