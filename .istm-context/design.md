# Autonomous Research Analyst Design System, Tokens, Layout Rules, and Component Registry

This document is the single source of truth for every interface, interaction, and component.
Every design decision reinforces clarity, information density, and professional trust.
All color tokens, typography, spacing, radius, and motion values defined here are final.
No component may introduce a raw hex code, a raw font name not in this document, or a raw pixel value not on the spacing scale.

---

# Part 1: Core Principles and Golden Rules

## Clarity
The dashboard is a signal-to-noise filter. The UI must reflect that.
Show only what the user needs in the current moment. Every element must earn its place.

## Data Density
This tool serves analysts who read Bloomberg, not consumers who browse social media.
Information density is a feature. Tables, timelines, and compact cards are preferred over large hero sections.

## Fluidity
Interactions must feel connected. Findings animate in. Status changes pulse, not flash.
Users should always know the agent state without hunting for it.

## Consistency
Watch cards look the same. Finding cards look the same. Digest cards look the same.
Users learn the UI once and carry that knowledge everywhere.

## Accessibility
Every interactive element has a visible focus ring, sufficient contrast, and a semantic ARIA label.
Minimum touch target: 44px. WCAG AA contrast on all text.

---

## Golden Rules

Every design decision should:
- Focus on one primary action per screen.
- Reveal complexity progressively (watch list then watch detail then finding detail).
- Reuse existing shadcn/ui components before creating new ones.
- Preserve user context: no full-page reloads for status updates.
- Explain state changes through motion (agent running = pulse, new finding = slide-in).
- Prioritize readability at all times.

---

# Part 2: Design Tokens (LOCKED)

Never hardcode colors, spacing, typography, radius values, or shadows in components.
Always use the CSS custom properties defined here.

---

## Design Personality

The application should feel like a Bloomberg terminal redesigned by Vercel.
Authoritative and data-driven. Dark, focused, and purposeful.
Premium without being flashy. Like an analyst's second brain, not a generic SaaS dashboard.

The design language mirrors Vercel's Geist system but runs on a near-black canvas instead of near-white,
uses a curated trio of fonts instead of Geist, and adapts the structural tokens for dark-first rendering.

---

## Color Tokens

### Exclusive Light Warm Zinc Theme (Warm Slate Editorial)

```css
:root {
/* Canvas and surfaces */
--color-canvas:           #FAFAFA;   /* Warm near-white page background */
--color-surface:          #FFFFFF;   /* Pure white cards */
--color-surface-elevated: #FFFFFF;
--color-surface-inset:    #F4F4F5;   /* Zinc-100 inset areas */
--color-sidebar:          #F4F4F5;   /* Icon rail background */
--color-sidebar-active:   #E4E4E7;   /* Active nav item background */

/* Borders */
--color-hairline:         #E4E4E7;   /* Zinc-200 border */
--color-hairline-strong:  #D4D4D8;   /* Zinc-300 border */

/* Text */
--color-ink:              #09090B;   /* Zinc-950 near black */
--color-ink-body:         #3F3F46;   /* Zinc-700 body */
--color-ink-muted:        #71717A;   /* Zinc-500 secondary */
--color-ink-faint:        #A1A1AA;   /* Zinc-400 timestamps/placeholders */

/* Primary actions — slate charcoal */
--color-primary:          #18181B;
--color-primary-hover:    #27272A;
--color-primary-press:    #09090B;
--color-primary-soft:     #F4F4F5;
--color-on-primary:       #FAFAFA;

/* Accent — electric violet */
--color-accent:           #7C3AED;
--color-accent-hover:     #6D28D9;
--color-accent-soft:      #EDE9FE;
--color-on-accent:        #FFFFFF;

/* Semantic */
--color-success:          #059669;   /* Emerald-600 */
--color-success-soft:     #D1FAE5;
--color-warning:          #D97706;
--color-warning-soft:     #FEF3C7;
--color-danger:           #DC2626;
--color-danger-soft:      #FEE2E2;

/* Agent pulse */
--color-pulse:            #059669;
}
```

---

## Typography Tokens

Three fonts work together as a system. Each has one job.

| Font | Role | Google Fonts import |
|---|---|---|
| **Newsreader** | Display: page H1 titles only. Gives editorial, premium gravitas to major headings. | `family=Newsreader:wght@400;500;600` |
| **Inter** | UI and Data Sans: navigation, card topic names, badges, chips, buttons, form labels, body copy. | `family=Inter:wght@400;500;600` |
| **JetBrains Mono** | Monospace: significance scores, timestamps, IDs, URLs, any numeric readout that needs alignment. | `family=JetBrains+Mono:wght@400` |

```css
:root {
--font-display:  "DM Sans", system-ui, sans-serif;
--font-sans:     "DM Sans", system-ui, sans-serif;
--font-data:     "DM Mono", "Courier New", monospace;
--font-mono:     "DM Mono", "Courier New", monospace;
}
```

### Type Scale

| Token | Size | Weight | Line Height | Tracking | Font | Use |
|---|---|---|---|---|---|---|
| `--text-display` | 32px | 700 | 1.15 | -0.03em | Playfair Display | Page H1 titles (Watches, Findings) |
| `--text-h2` | 20px | 600 | 1.3 | -0.01em | Space Grotesk | Section headings, card headlines |
| `--text-h3` | 15px | 600 | 1.4 | 0 | Space Grotesk | Sub-section labels |
| `--text-body` | 14px | 400 | 1.6 | 0 | Inter | Standard body copy |
| `--text-body-sm` | 13px | 400 | 1.55 | 0 | Inter | Secondary copy, supporting text |
| `--text-label` | 12px | 500 | 1.4 | 0.02em | Space Grotesk | Badge labels, chip text, form labels |
| `--text-overline` | 11px | 500 | 1.2 | 0.08em | Space Grotesk | ALL CAPS section eyebrows only |
| `--text-mono` | 12px | 400 | 1.4 | 0.01em | JetBrains Mono | Scores, timestamps, IDs, URLs |
| `--text-mono-sm` | 11px | 400 | 1.3 | 0.01em | JetBrains Mono | Compact data rows |

Rules:
- Playfair Display is used for H1 page titles only. Never for body copy, buttons, or labels.
- Space Grotesk owns all UI chrome: nav, buttons, chips, card headings.
- Inter owns all reading-weight prose and dense data.
- JetBrains Mono owns every numeric, identifier, or URL value.
- Maximum three font weights per font face in any given screen.
- Never use ALL CAPS except --text-overline eyebrows and badge labels under 3 characters.

---

## Spacing Scale (4px base, locked)

```css
:root {
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
--space-32: 128px;
}
```

Card interior padding: `--space-4` to `--space-6`.
Section gaps: `--space-24` to `--space-32`.
Button padding: horizontal `--space-3` or `--space-4`, height set by line-height.

---

## Border Radius Tokens

Vercel bimodal shape language: tight sharp for functional chrome, full pill for marketing CTAs.

```css
:root {
--radius-none: 0px;
--radius-sm:   4px;    /* badges, status chips, inputs */
--radius-md:   6px;    /* watch cards, buttons, nav items */
--radius-lg:   10px;   /* modals, drawers, large panels */
--radius-pill: 9999px; /* pill badges, theme toggle */
--radius-full: 9999px; /* avatar, circular icon buttons */
}
```

---

## Elevation and Shadow Tokens

Depth is minimal. Prefer hairline borders before shadows. Shadows only for floating surfaces.

```css
:root {
--shadow-none:   none;
--shadow-low:    0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-medium: 0 2px 8px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-high:   0 8px 24px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.4);
}
```

Light mode shadow values use lower alpha (0.08, 0.12, 0.18) because the canvas is near-white.

---

## Motion Tokens

```css
:root {
--ease:           cubic-bezier(0.4, 0, 0.2, 1);
--ease-out:       cubic-bezier(0, 0, 0.2, 1);
--duration-micro: 100ms;   /* hover color/border changes */
--duration-fast:  150ms;   /* button press, badge swap */
--duration-normal:200ms;   /* card reveals, sidebar transitions */
--duration-slow:  350ms;   /* modal open, drawer slide-in */
}
```

### Agent Running Pulse (CSS only, no JS)

```css
@keyframes agent-pulse {
0%, 100% { opacity: 1; transform: scale(1); }
50%       { opacity: 0.4; transform: scale(1.35); }
}

.status-dot--running {
animation: agent-pulse 1.8s var(--ease) infinite;
background-color: var(--color-pulse);
}
```

### Finding Card Entrance

```css
@keyframes fade-up {
from { opacity: 0; transform: translateY(8px); }
to   { opacity: 1; transform: translateY(0); }
}

.finding-card {
animation: fade-up var(--duration-normal) var(--ease-out) both;
}
```

---

# Part 3: Visual Styling and Layout Rules

## Asset Rule (locked)

Do NOT use image files. All UI and empty states must be built using CSS, typography, and Lucide icons.
No illustrations, no background images, no gradients on data surfaces.

## Mode Support

The app ships with a dark mode default and a light mode toggle.
The theme is stored in `localStorage` as `"dark"` or `"light"` and applied via `data-theme` on `<html>`.
Use the CSS custom properties above: never branch by theme in component JS logic.

## Layout Structure

Desktop: 64px left icon sidebar plus a fluid main content area (max-width 1280px centered).
Sidebar labels appear on hover as tooltips (Space Grotesk 12px).
Tablet (below 960px): sidebar collapses to icon-only rail (40px).
Mobile (below 768px): sidebar becomes a bottom sheet triggered by a hamburger icon.

## Whitespace Philosophy

Whitespace is structural. The hairline border and the canvas background do the separating work.
Cards are grouped by thin hairlines rather than heavy background fills.
Generous section padding. Tight internal rhythm inside cards.

## Grid

Watch list: 4-column grid on desktop, 2-column on tablet, 1-column on mobile.
Findings timeline: single column of compact full-width cards.
Digest history: single column of full-width digest cards.

---

# Part 4: UI Component Registry

Always use these component structures. Duplicate declarations are not allowed.

## Sidebar Navigation

`sidebar-nav`: 64px wide on desktop. Icon-only on tablet. Bottom sheet on mobile.
Each item: Lucide icon 20px centered, active state `--color-primary-soft` background, `--radius-md`.
Tooltip on hover shows Space Grotesk 12px label.

## Buttons

`button-primary`: Background `--color-primary`, text `--color-on-primary`, `--radius-md`, Space Grotesk 14px 500.
Used for "Create Watch", "Run Now".

`button-secondary`: Background transparent, 1px border `--color-hairline`, text `--color-ink`, `--radius-md`.
Used for "Edit", "Pause", "Cancel".

`button-danger`: Background `--color-danger`, text white. Used exclusively for "Delete Watch".

`button-ghost`: No border, no background. Text `--color-ink-muted`, 20px Lucide icon.
Used for icon buttons inside card headers.

`theme-toggle`: Pill toggle button (`--radius-pill`) with sun/moon Lucide icons. Switches `data-theme`.

## Cards

`watch-card`: Background `--color-surface`, 1px `--color-hairline` border, `--radius-md`, padding `--space-4`.
Contains: topic name (Space Grotesk 600 15px), status chip top-right, frequency badge,
significance threshold chip, last-run timestamp (JetBrains Mono 12px `--color-ink-muted`),
finding count, status dot (pulsing when running).

`finding-card`: Compact full-width card. Background `--color-surface`, `--radius-md`, `--shadow-low`.
Contains: title (Space Grotesk 600 14px), source domain (Inter 13px muted), significance badge,
category chip, key-fact excerpt (Inter 13px), timestamp (JetBrains Mono 11px).
Entrance animation: `fade-up`.

`digest-card`: Full-width. Background `--color-surface`, `--radius-md`.
Contains: sent timestamp, summary text (Inter 14px, first 200 chars), finding count badge,
"View findings" link in `--color-primary`.

## Badges and Chips

`significance-badge`: Displays 1-10 score in JetBrains Mono 12px.
Score 7-10: background `--color-success-soft`, text `--color-success`.
Score 4-6: background `--color-warning-soft`, text `--color-warning`.
Score 1-3: background `--color-danger-soft`, text `--color-danger`.
Radius: `--radius-sm`.

`status-chip`: Space Grotesk 12px 500. "Active" in success colors, "Paused" in warning colors,
"Running" in primary colors with `status-dot--running` pulse dot. Radius: `--radius-sm`.

`frequency-badge`: Space Grotesk 12px. "Hourly" / "Daily" / "Weekly".
Border `--color-hairline`, background transparent. Radius: `--radius-sm`.

`category-chip`: Space Grotesk 12px. Groq-classified category label.
Border `--color-hairline`. Radius: `--radius-sm`.

## Forms and Inputs

`text-input`: Background `--color-surface-inset`, 1px `--color-hairline` border, `--radius-md`.
Focus: border becomes `--color-primary`, `--color-primary-soft` box-shadow halo.
Font: Inter 14px.

`textarea-input`: Same as text-input, min-height 80px.

`select-input`: shadcn/ui Select. Same visual treatment as text-input.

`toggle-switch`: shadcn/ui Switch. Active track color: `--color-primary`.

## Page Header

Full-width row at page top. Left: Playfair Display 700 32px H1 title.
Right: `button-primary` CTA (e.g., "Create Watch").

## Empty States

`empty-watches`:
- Lucide icon: `Eye`, 40px, `--color-ink-muted`
- Headline: "No watches yet" (Space Grotesk 600 18px)
- Body: "Create your first watch to start monitoring a topic." (Inter 14px muted)
- CTA: `button-primary` "Create Watch"

`empty-findings`:
- Lucide icon: `FileSearch`, 40px, `--color-ink-muted`
- Headline: "No findings yet" (Space Grotesk 600 18px)
- Body: "The agent will populate findings after the first run." (Inter 14px muted)
- No CTA

`empty-digests`:
- Lucide icon: `Inbox`, 40px, `--color-ink-muted`
- Headline: "No digests sent yet" (Space Grotesk 600 18px)
- Body: "A digest is generated when a significant finding is detected." (Inter 14px muted)
- No CTA

## Dialogs and Drawers

`watch-form-dialog`: shadcn/ui Dialog, `--radius-lg`, `--shadow-high`.
Fields: topic (text-input), search queries (textarea-input), frequency (select-input),
significance threshold (select-input 1-10), notification email (text-input),
Slack webhook URL (text-input), active (toggle-switch).
Footer: "Save" `button-primary` + "Cancel" `button-secondary`.

`finding-detail-drawer`: shadcn/ui Sheet (right side), 480px wide, `--shadow-high`.
Contains: title (Space Grotesk 600 18px), URL (JetBrains Mono 12px link),
content snippet (Inter 14px), key fact (Inter 14px, emphasized), significance badge,
category chip, created timestamp (JetBrains Mono 12px).

`delete-confirm-dialog`: Small shadcn/ui AlertDialog. Destructive action requires confirmation.

---

# Part 5: Responsive Behavior and Breakpoints

| Breakpoint | Width | Key Changes |
|---|---|---|
| Desktop XL | 1440px | 4-column watch grid, full sidebar 64px, max-width 1280px centered |
| Desktop | 1280px | Default layout |
| Tablet | 960px | Sidebar collapses to 40px icon rail. Watch grid becomes 2-column |
| Mobile | 768px | Single column. Sidebar bottom sheet. Touch targets 44px minimum |

## Do's and Don'ts

- DO: Use Playfair Display only for H1 page titles. Never for body or labels.
- DO: Use Space Grotesk for all UI chrome: nav, badges, chips, card headings, buttons.
- DO: Use Inter for all body-weight reading: metadata, form copy, secondary text.
- DO: Use JetBrains Mono for every numeric, ID, or timestamp value in cards.
- DO: Apply the `status-dot--running` CSS animation — never a spinner — for agent running state.
- DO: Keep light and dark mode driven by `data-theme` and CSS custom properties only.
- DON'T: Hardcode any hex color, pixel value, or font name outside this document.
- DON'T: Use emojis anywhere in the UI or empty states.
- DON'T: Add a second icon library. Use Lucide only.
- DON'T: Add background images, illustrations, or decorative gradients on data surfaces.
- DON'T: Use Playfair Display for anything other than the H1 page title.

---

# Visual Effects (Lightweight Tier Only)

- Background: plain `--color-canvas` — no animated gradients, no noise, no mesh
- Agent pulse: CSS keyframe only (no JS required)
- Card entrance: `fade-up` CSS animation on mount
- Theme switch: CSS custom property update, 150ms opacity crossfade on body
- Scroll effects: none (data workstation, not a marketing page)
- Glassmorphism: none
- Particles: none
- 3D elements: none
- `prefers-reduced-motion`: disable all animations when true

```css
@media (prefers-reduced-motion: reduce) {
*, *::before, *::after {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
}
```
