---
name: Noiseless
description: Warm Slate Editorial Workstation Design System
colors:
  canvas: "#FAFAFA"
  surface: "rgba(255, 255, 255, 0.85)"
  surface-elevated: "rgba(255, 255, 255, 0.95)"
  surface-inset: "#F4F4F5"
  sidebar: "#18181B"
  hairline: "rgba(228, 228, 231, 0.80)"
  hairline-strong: "rgba(212, 212, 216, 0.95)"
  ink: "#09090B"
  ink-body: "#27272A"
  ink-muted: "#71717A"
  ink-faint: "#A1A1AA"
  primary: "#18181B"
  primary-hover: "#27272A"
  on-primary: "#FFFFFF"
  accent: "#7C3AED"
  accent-soft: "#F5F3FF"
  success: "#059669"
  success-soft: "#ECFDF5"
  warning: "#D97706"
  warning-soft: "#FEF3C7"
  danger: "#DC2626"
  danger-soft: "#FEE2E2"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "DM Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Mono, monospace"
    fontWeight: 400
rounded:
  full: "9999px"
  xl: "16px"
  lg: "12px"
  md: "8px"
  sm: "6px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Noiseless

## Overview

**Creative North Star: "The Slate Editorial Sanctuary"**

Noiseless is built around a warm, editorial layout inspired by premium research terminals and workstation dashboards. Rather than distracting the user with heavy gradients, colorful panels, or chat interfaces, the aesthetic is hyper-minimal, high-signal, and clean. It uses structured geometry, translucent surfaces, and electric violet highlights to create a premium, calm workplace for analysts and researchers.

The interface values spacing and breathing room over dense grid packing, allowing critical signals to stand out immediately. Dynamic light-themed backdrops blend softly with floating glassmorphic workspaces.

**Key Characteristics:**
- Hyper-minimal slate layout with precise boundaries.
- Transparent glassmorphic containers using backdrop-blur.
- Restrained color application, using color strictly to denote significance and status.
- Strict typography scale using DM Sans for editorial polish and DM Mono for exact data values.

---

## Colors

The color palette is split into primary actions, neutral layouts, and functional accents.

### Primary
- **Slate Charcoal** (#18181B): Used for primary action buttons, floating sidebar backgrounds, and dominant headers.

### Neutral
- **Zinc Canvas** (#FAFAFA): The main page background color, presenting a clean slate under floating workstations.
- **Glass Surface** (rgba(255, 255, 255, 0.85)): Floating cards and workflow panels with backdrop blur.
- **Muted Gray Border** (rgba(228, 228, 231, 0.80)): Discrete border separators and hairline strokes.
- **Ink Black** (#09090B): Used for primary headings and text readability.

### Accent
- **Electric Violet** (#7C3AED): Denotes active states, interactive controls, focused inputs, and key highlights.
- **Success Emerald** (#059669): Denotes active tracking states, high-significance findings, and successful actions.
- **Warning Amber** (#D97706): Denotes moderate-significance findings or waiting states.
- **Danger Crimson** (#DC2626): Denotes critical-significance findings, limits, or destructive actions.

**The 10% Contrast Rule.** The Electric Violet accent must represent no more than 10% of any given screen area. Its power is in its scarcity.

---

## Typography

**Display Font:** DM Sans (sans-serif)
**Body Font:** DM Sans (sans-serif)
**Label/Mono Font:** DM Mono (monospace)

The typography layout matches clean editorial design. Clean geometric sans-serif shapes form clear headings, while monospace typography anchors statistics, timestamps, and search query filters.

### Hierarchy
- **Display** (Bold, 32px, 1.2): Main page headers (e.g., Watch detail topic, settings header).
- **Headline** (Semi-Bold, 20px, 1.3): Section headers and metric totals.
- **Title** (Medium, 16px, 1.4): Card titles, dialog headers.
- **Body** (Regular, 14px, 1.5): Standard lists, timeline content, settings descriptions. Max line length is 70ch.
- **Label** (Regular, 10px, Monospace, Tracking-widest, Uppercase): Badge values, statuses, intervals, shortcut keys.

---

## Layout

Noiseless utilizes a fixed 64px floating sidebar navigation rail containing icon anchors. Page contents are contained within single-column or side-by-side workstation canvases that maintain a responsive flex structure:
- Content wrappers use `w-full min-w-0` to avoid accidental shrink-to-fit text clipping.
- Metric grids use CSS grid layout scaling from 1 column on mobile to 3 columns on desktop.
- Spacing relies on a clean 8px block rhythm (8px sm, 16px md, 24px lg).

---

## Elevation & Depth

Noiseless rejects heavy drop shadows, conveying depth through glassmorphic surfaces, backdrop blurs, and crisp hairlines instead.

**The Flat-By-Default Rule.** Layout surfaces lie flat at rest, separating sections through different surface intensities (`bg-surface-inset` vs `bg-surface`). Soft shadows (`shadow-low`) appear only to elevate floating elements (drawers, modals, hovering cards).

---

## Shapes

- **Main Panels & Drawers:** 16px border-radius (`rounded-xl`).
- **Cards & Primary Modules:** 12px border-radius (`rounded-lg`).
- **Inputs & Fields:** 8px border-radius (`rounded-md`).
- **Buttons & Status Badges:** Fully circular (`rounded-full`).

---

## Components

### Buttons
- **Shape:** Pill-shaped (rounded-full)
- **Primary:** Background color Slate Charcoal (#18181B), text color White (#FFFFFF), padding `8px 16px`.
- **Hover:** Background color Slate Charcoal Hover (#27272A).

### Chips
- **Style:** Compact font-mono uppercase labels, border `1px solid rgba(228, 228, 231, 0.80)`.
- **States:** Active chips feature background fills and corresponding semantic colors (e.g. green fill for active monitoring).

### Cards / Containers
- **Corner Style:** 12px rounded-lg corners.
- **Background:** Semi-transparent Glass Surface (rgba(255, 255, 255, 0.85)) with backdrop-filter `blur(20px)`.
- **Border:** 1px hairline stroke (rgba(228, 228, 231, 0.80)).

---

## Do's and Don'ts

### Do:
- **Do** wrap long text strings with `w-full min-w-0` to prevent layout breaking.
- **Do** restrict icons to the Lucide library.
- **Do** format code elements, stats, and shortcuts using DM Mono.

### Don't:
- **Don't** use graphic emojis in empty states; rely on semantic Lucide icons instead.
- **Don't** use arbitrary colored gradients for cards; maintain the semi-transparent glass aesthetic.
- **Don't** add shadows to static cards at rest.
