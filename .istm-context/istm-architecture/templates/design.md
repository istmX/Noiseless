# {project_name} Design System, Tokens, Layout Rules, and Component Registry

This document is the single source of truth for every interface, interaction, and component. Every design decision should reinforce clarity, consistency, and trust.

---

# Part 1: Core Principles & Golden Rules

## Simplicity
Design should reveal only what the user needs in the current moment. Hide unnecessary complexity, reduce cognitive load, and guide users one decision at a time without sacrificing power.

## Fluidity
Every interaction should feel connected. Elements should transform naturally instead of appearing or disappearing abruptly, helping users always understand where they came from and where they're going.

## Consistency
Users should never have to relearn the interface. Similar actions, layouts, and components should always behave in predictable ways.

## Accessibility
Accessibility is a design requirement, not a feature. Every interface should be usable by as many people as possible regardless of ability or device.

---

## Golden Rules
Every design should:
- Focus on one primary action.
- Reveal complexity progressively.
- Reuse existing components.
- Preserve user context.
- Explain changes through motion.
- Prioritize readability.

---

# Part 2: Design Tokens

Never hardcode colors, spacing, typography, radius values, or shadows. Always use these design tokens:

## Design Personality

The application should feel:
{design_personality_adjectives}

The UI should feel like {design_metaphor} rather than a generic software dashboard.

## Colors

### Brand & Accent Colors
* **Primary Accent** (`{colors.primary}`): {primary_color_hex}
* **Secondary Accent** (`{colors.secondary}`): {secondary_color_hex}
* **Background Surface** (`{colors.surface-main}`): {surface_color_hex}
* **Elevated Surface** (`{colors.surface-elevated}`): {elevated_color_hex}
* **Text Primary** (`{colors.text-primary}`): {text_primary_hex}
* **Text Secondary** (`{colors.text-secondary}`): {text_secondary_hex}
* **Border Color** (`{colors.border-line}`): {border_color_hex}
* **Semantic Danger** (`{colors.semantic-danger}`): {danger_color_hex}
* **Semantic Success** (`{colors.semantic-success}`): {success_color_hex}

## Typography

### Font Family
* **Primary Font**: {primary_font_family}
* **Fallback Font**: {fallback_font_family}
* **Monospace Font**: {monospace_font_family}

## Spacing Scale (8px Grid)
* XS: `4px`
* SM: `8px`
* MD: `16px`
* LG: `24px`
* XL: `32px`
* 2XL: `48px`
* 3XL: `64px`

## Shadows & Elevation
* **Level 1 (Card)**: {shadow_level_1}
* **Level 2 (Floating)**: {shadow_level_2}
* **Level 3 (Modal)**: {shadow_level_3}

## Border Radius
* **Sharp/Strict**: {radius_small}
* **Standard Cards**: {radius_medium}
* **Pills/Circles**: {radius_full}

---

# Part 3: Visual Styling & Layout Rules

These rules define how every screen should be designed. If a UI decision conflicts with this section, these rules win:

## Design Principles
* **Visual Language**: The interface should feel {visual_language_description}. Visual design should support content instead of competing with it.
* **Layout Structure**: Screens must follow a predictable hierarchy: {layout_hierarchy_rules}.
* **Typography Hierarchy**: Use weight and strict token usage to carry hierarchy on body copy. Tighten line-heights on display sizes and keep it generous on body copy.
* **Empty State Rules**: Every empty state must display {empty_state_requirements}.
* **Prohibited Layout Styles**: {prohibited_design_styles}.

## Layout & Grid
* **Whitespace Philosophy**: {whitespace_philosophy}

---

# Part 4: UI Component Registry

Always use these component structures. Duplicate component declarations are not allowed:

## Buttons
* **`button-primary`**: Background `{colors.primary}`, text on-primary, rounded to match radius tokens.
* **`button-secondary`**: Background transparent/surface, bordered, text `{colors.primary}`.
* **`button-danger`**: Used exclusively for destructive actions.
{additional_button_components}

## Cards
* **`primary-card`**: Background `{colors.surface-elevated}`, padded with `{spacing.lg}`.
{additional_card_components}

## Inputs
* **`text-input`**: Standard input field with consistent border radius and clear focus rings.
{additional_input_components}

## Layout Containers
* **`screen-container`**: Root layout wrapper providing maximum constraints and margin padding.
{additional_layout_containers}

---

# Part 5: Responsive Behavior & Breakpoints

## Breakpoints Matrix
* **Desktop-XL (1440px)**: Default desktop layout.
* **Tablet (960px)**: Columns collapse, navigation transitions to overlay menus.
* **Mobile (768px)**: Full bleed containers, touch targets strictly 44px minimum.

## Do's and Don'ts
* **DO**: {design_do_1}
* **DO**: {design_do_2}
* **DON'T**: {design_dont_1}
* **DON'T**: {design_dont_2}
* **DON'T**: {design_dont_3}
