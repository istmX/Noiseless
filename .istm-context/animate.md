# Motion and Choreography Blueprint

This blueprint defines the interaction motion system for the application, built on the design engineering principles of Benji Taylor, Rauno Freiberg, and modern React motion standards.

---

## Core Motion Principles

### 1. Spring Physics Over Fixed Timings
Linear or generic ease in out curves feel artificial. All layout shifts, side drawers, and selection indicators use natural spring dynamics.

### 2. Hardware Acceleration
Animations are restricted strictly to transform and opacity properties. We never animate width, height, margin, or top values directly to prevent layout reflows.

### 3. Tactile Micro Feedback
Every interactive element gives immediate visual feedback. Buttons scale down slightly on press. Hover states shift background color without layout jumps.

### 4. Layout Continuity
Shared elements (like active navigation highlights or selected row indicators) use Motion layoutId for smooth morphing transitions across states.

---

## Motion Token Dictionary

### 1. Responsive Spring (Drawers and Overlays)
* Type: Spring
* Stiffness: 280
* Damping: 28
* Mass: 0.8
* Usage: Slide out inspector drawers, modal reveals.

### 2. Snappy Spring (Active Indicators and Selection)
* Type: Spring
* Stiffness: 380
* Damping: 32
* Mass: 0.5
* Usage: Sidebar active indicator, tab switches, list row selection.

### 3. Subtle Micro Transition (Buttons and Rows)
* Duration: 150ms
* Easing: cubic bezier (0.2, 0, 0, 1)
* Usage: Hover color shifts, icon rotations.

### 4. Continuous Agent Pulse
* Duration: 1.5 seconds
* Keyframes: Opacity shifts between 1.0 and 0.35 smoothly.
* Usage: Live background agent status dot.

---

## Component Motion Rules

### 1. Navigation Rail (Sidebar)
* Active item background uses layoutId sidebar active rail with Snappy Spring.
* Hover tooltips fade in with 120ms delay and 4px translate X shift.

### 2. Intelligence Feed Rows
* Row entrance: Opacity from 0 to 1, translate Y from 8px to 0px using Responsive Spring.
* Row press: Scale to 0.99 on tap, immediate background highlight.

### 3. Citation Inspector Drawer
* Backdrop: Opacity from 0 to 1 with 12px backdrop blur.
* Panel: Translate X from 100 percent to 0 percent using Responsive Spring.

### 4. Command Palette Overlay (Cmd K)
* Backdrop: Opacity from 0 to 1.
* Dialog: Scale from 0.96 to 1.0, opacity from 0 to 1 using Responsive Spring.

---

## Performance and Accessibility Standards

### 1. Prefers Reduced Motion
If the browser or operating system has prefers reduced motion set to true, all spring physics and translate shifts are bypassed, falling back to instant opacity toggles.

### 2. Memory Cleanup
All animation timelines, spring listeners, and scroll triggers are destroyed on component unmount.



1. $impeccable layout: Align the main layouts to render the spec-compliant navigation sidebar rail and clear the
  dead or bypassed sidebar code files.
  2. $impeccable harden: Replace silent try/catch swallowing with user-facing Next.js error.tsx boundaries to prevent
  mock data leaks on database connection errors.
  3. $impeccable colorize: Clean up hardcoded colors in FindingCard.tsx and
  (dashboard/dashboard/components/FindingInspector.tsx#L77) (like text-slate-950 bg-amber-400 and v3 emerald shades),
  switching them to design system semantic tokens (text-ink, bg-success-soft, etc.).
  4. $impeccable polish: Add input formatting masks to Card number and Expiry inputs in checkout forms.
