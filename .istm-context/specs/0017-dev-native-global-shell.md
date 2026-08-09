# Spec 0017: Dev Native Global Shell and Navigation

**Status**: In Progress

This specification defines the complete overhaul of the global shell, monolithic sidebar rail, command palette overlay, and root layout architecture for Noiseless.

---

## Summary and Requirements

### Intent
Replace the existing legacy sidebar and top bar with an obsidian dark theme global shell inspired by Linear and Vercel. Provide a high density left navigation rail with spring physics layout morphing, a top breadcrumb bar with live agent status pulse, and a global Cmd K command menu overlay.

### Acceptance Criteria (Done When)
1. Root layout is wrapped in dark theme obsidian background using Inter and JetBrains Mono fonts.
2. Left navigation rail is a fixed 64px width monolith with active tab background morphing powered by Motion layoutId and Snappy Spring.
3. Top header bar renders real time breadcrumbs, live agent status pulse indicator, global search trigger, and primary CTA.
4. Cmd K triggers a modal command palette overlay supporting instant search across watches and findings with keyboard arrow navigation.
5. All UI elements strictly consume CSS variables from globals.css with zero raw hex codes or inline style slop.

---

## Architecture and UI Design

### Design Tokens Consumption
* Surface: `--color-canvas` (#000000) for base canvas, `--color-surface` (#09090B) for panels.
* Borders: `--color-hairline` (#27272A) for 1px hairline dividers.
* Text: `--color-ink` (#FFFFFF) for headings, `--color-ink-muted` (#71717A) for secondary chrome.
* Motion: Snappy Spring (stiffness 380, damping 32) for layoutId rail highlight.

### Strict Directory Layout Rules
* Shared Navigation Components: `app/shared/components/shell/`
* Navigation Types: `app/shared/types/shell.ts`
* Navigation Constants: `app/shared/constants/shell.ts`
* Command Menu Components: `app/shared/components/command/`

---

## Build Plan

### Milestone 1: Global Setup and CSS Design Tokens
Configure globals.css and RootLayout in layout.tsx to import Inter and JetBrains Mono fonts, locking in obsidian dark mode variables and root body background styling.

### Milestone 2: Navigation Rail with Spring Layout Morph
Build the monolithic 64px left navigation rail in `app/shared/components/shell/SidebarRail.tsx`. Implement active route detection with Motion layoutId spring highlight morphing and instant hover tooltips.

### Milestone 3: Header Breadcrumbs and Live Pulse Indicator
Build `app/shared/components/shell/HeaderBar.tsx` featuring route breadcrumbs, agent status pulse dot, and search bar trigger button.

### Milestone 4: Global Command Palette Overlay (Cmd K)
Build `app/shared/components/command/CommandMenu.tsx` with hotkey listener (Cmd K or Ctrl K), backdrop blur, item filtering, and keyboard navigation.

### Milestone 5: Layout Integration and Verification
Wrap the app dashboard routes in the new shell components and verify seamless navigation without layout reflows or hydration mismatches.
