# Autonomous Research Analyst Design System, Tokens, Layout Rules, and Component Registry

This document is the single source of truth for every interface, interaction, and component. Design decisions here enforce clarity, information density, and professional trust.

NOTE: Color and typography tokens are TBD. Run the /istm-design skill before beginning implementation to hydrate the color palette, font choices, and motion spec. All {token} placeholders below must be resolved before any component is coded.

---

# Part 1: Core Principles and Golden Rules

## Clarity
The dashboard is a signal-to-noise filter. The UI must reflect that. Show only what the user needs in the current moment. Every element must earn its place.

## Data Density
This tool serves analysts who read Bloomberg, not consumers who browse Instagram. Information density is a feature. Use it deliberately. Tables, timelines, and compact cards are preferred over large hero sections.

## Fluidity
Interactions must feel connected. Findings should animate in. Status changes should pulse, not flash. Users should always know the agent's current state without hunting for it.

## Consistency
Watch cards look the same. Finding cards look the same. Digest cards look the same. Users learn the UI once.

## Accessibility
Accessibility is a design requirement. Every interactive element must have a visible focus ring, sufficient contrast, and a semantic ARIA label.

---

## Golden Rules
Every design decision should:
- Focus on one primary action per screen.
- Reveal complexity progressively (watch list → watch detail → finding detail).
- Reuse existing shadcn/ui components before creating new ones.
- Preserve user context: no full-page reloads for status updates.
- Explain state changes through motion (agent running = pulse animation, new finding = slide-in).
- Prioritize readability at all times. Data-dense does not mean illegible.

---

# Part 2: Design Tokens (TBD — hydrate with /istm-design)

Never hardcode colors, spacing, typography, radius values, or shadows. Always use these tokens once they are filled:

## Design Personality

The application should feel:
- Like a Bloomberg terminal meets a modern SaaS workstation
- Authoritative and data-driven, not friendly and casual
- Dark, focused, and purposeful
- Premium without being flashy

The UI should feel like an analyst's second brain, not a generic software dashboard.

## Colors (TBD)

All color tokens below must be resolved by /istm-design before implementation.

- Primary Accent (colors.primary): {primary_color_hex}
- Secondary Accent (colors.secondary): {secondary_color_hex}
- Background Canvas (colors.canvas): {canvas_color_hex}
- Surface Card (colors.surface): {surface_color_hex}
- Elevated Surface (colors.surface-elevated): {elevated_color_hex}
- Text Primary (colors.ink): {text_primary_hex}
- Text Secondary (colors.ink-muted): {text_secondary_hex}
- Border (colors.border): {border_color_hex}
- Semantic Danger (colors.danger): {danger_color_hex}
- Semantic Success (colors.success): {success_color_hex}
- Semantic Warning (colors.warning): {warning_color_hex}
- Agent Running Pulse (colors.pulse): {pulse_color_hex}

## Typography (TBD)

All font tokens below must be resolved by /istm-design before implementation.

- Primary Font (font.sans): {primary_font_family} — used for all body copy, headings, buttons, forms
- Monospace Font (font.mono): {monospace_font_family} — used for URLs, significance scores, timestamps, IDs
- Display Font (font.display): optional, used only for deliberate hero typography

## Spacing Scale (8px Grid — locked)
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px

## Shadows and Elevation (TBD)
- Level 1 (Card): {shadow_level_1}
- Level 2 (Floating Panel): {shadow_level_2}
- Level 3 (Modal): {shadow_level_3}

## Border Radius (TBD)
- Sharp (inputs, badges): {radius_small}
- Standard (cards, buttons): {radius_medium}
- Pills (tags, status chips): {radius_full}

---

# Part 3: Visual Styling and Layout Rules

These rules define how every screen should be designed. If a UI decision conflicts with this section, these rules win.

## Design Principles
- Visual Language: Dark mode first. Dense information surfaces with clear visual hierarchy. Data beats decoration.
- Layout Structure: Left sidebar for navigation, main content area for lists and timelines, right panel for contextual details (slide-in drawer, not a new page).
- Typography Hierarchy: Use font weight and size to carry hierarchy. Never rely on color alone.
- Empty State Rules: Every empty state must display a Lucide icon, a headline (no more than 6 words), a supporting sentence, and one primary CTA button. Never use emojis.
- Prohibited Styles: No gradients on data surfaces. No background images. No decorative illustrations. No emojis anywhere in the UI.

## Asset Rule (locked)
Do NOT use image files. All UI and empty states must be built using purely CSS-driven color blocks, typography, and Lucide icons from the shadcn/ui package.

## Layout and Grid
- Whitespace Philosophy: whitespace is not wasted space. It is the visual separator that makes dense data readable. Use the 8px spacing scale strictly.
- The dashboard uses a two-column layout on desktop: a fixed-width left sidebar (240px) and a fluid main content area.
- On tablet, the sidebar collapses to an icon-only rail.
- On mobile (under 768px), the sidebar becomes a bottom sheet or a hamburger overlay.

## Agent Status Communication
- When run_in_progress is true for a watch, show a pulsing status indicator (colors.pulse) on the watch card and detail page.
- The indicator uses a CSS keyframe animation (pulse), not a spinner, to avoid feeling like a loading blocker.
- Polling interval: TanStack Query polls /watches/{id} every 5 seconds when the user is on the detail page.

---

# Part 4: UI Component Registry

Always use these component structures. Duplicate component declarations are not allowed.

## Navigation
- sidebar-nav: Fixed-width (240px) left sidebar with icon + label rows. Active state uses colors.primary background. Lucide icons only.
- breadcrumb: Horizontal breadcrumb above page headings for deep pages (watch detail, finding detail).

## Buttons
- button-primary: Background colors.primary, text on-primary, radius token standard. Used for "Create Watch", "Run Now".
- button-secondary: Transparent background, bordered with colors.border, text colors.ink. Used for "Edit", "Pause".
- button-danger: Background colors.danger. Used exclusively for "Delete Watch" and "Delete Finding".
- button-ghost: No border, no background. Text colors.ink-muted. Used for icon buttons in card headers.

## Cards
- watch-card: Surface background colors.surface, padded LG, rounded standard. Shows topic, frequency badge, status dot, last-run timestamp, and significance threshold. Clicking navigates to the watch detail page.
- finding-card: Compact card. Shows title, source domain, significance score badge (colored by score range), category chip, key fact excerpt, and timestamp.
- digest-card: Shows digest summary text, number of findings included, and a "View findings" link. Full-width in the digest history list.

## Badges and Chips
- significance-badge: Displays the 1-10 score. Colors change by range: 1-3 colors.ink-muted, 4-6 colors.warning, 7-10 colors.success.
- frequency-badge: Displays "Hourly", "Daily", or "Weekly". Small chip with border.
- status-dot: Small circle. Green = active, gray = paused, pulsing colors.pulse = running.
- category-chip: Small bordered chip showing the Groq-classified category (e.g. "Earnings", "Product Launch").

## Inputs
- text-input: Standard shadcn/ui Input. Consistent border radius and focus ring using colors.primary.
- textarea-input: For multi-line search_queries entry.
- select-input: shadcn/ui Select. Used for frequency and significance_threshold fields.
- toggle-switch: shadcn/ui Switch. Used for the watch active/paused toggle.

## Layout Containers
- screen-container: Root layout wrapper. Max width 1280px, centered, horizontal padding XL.
- page-header: Full-width row with page title (H1), optional subtitle, and right-aligned CTA button.
- content-grid: Two-column grid (main content + sidebar details) on desktop, single column on mobile.

## Dialogs and Drawers
- watch-form-dialog: Modal dialog for creating and editing watches. Uses shadcn/ui Dialog. Fields: topic, search_queries (comma-separated textarea), frequency (select), significance_threshold (select 1-10), notification_email (input), notification_slack_webhook (input).
- finding-detail-drawer: Right-side slide-in sheet (shadcn/ui Sheet) showing the full finding: title, URL, content_snippet, key_fact, significance_score, category, created_at.
- delete-confirm-dialog: Small confirmation dialog before deleting a watch.

## Empty States
- empty-watches: Icon Eye (Lucide), headline "No watches yet", body "Create your first watch to start monitoring a topic.", CTA "Create Watch" button-primary.
- empty-findings: Icon FileSearch (Lucide), headline "No findings yet", body "The agent will populate findings after the first run.", no CTA (user cannot force findings).
- empty-digests: Icon Inbox (Lucide), headline "No digests sent yet", body "A digest is generated when a significant finding is detected.", no CTA.

---

# Part 5: Responsive Behavior and Breakpoints

## Breakpoints Matrix
- Desktop XL (1440px): Two-column layout, full sidebar, dense card grids.
- Desktop (1280px): Default desktop layout.
- Tablet (960px): Sidebar collapses to icon rail. Cards remain in grid.
- Mobile (768px): Single column. Sidebar becomes bottom sheet. Cards are full-bleed. Touch targets minimum 44px.

## Do's and Don'ts
- DO: Use the significance-badge component consistently for all finding score displays.
- DO: Show the agent run status on the watch card as well as the detail page.
- DO: Use Lucide icons from the existing shadcn/ui set. Do not add a second icon library.
- DON'T: Use emojis anywhere in the UI or empty states.
- DON'T: Hardcode any color, spacing, or radius value. Use design tokens.
- DON'T: Add background images or illustration files. Code-only visuals.
