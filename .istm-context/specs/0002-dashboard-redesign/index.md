# Build Specification: Dashboard and Workstation Redesign

This document details the plan to update the main dashboard page and components. 
It establishes a unified styling system matching the brand fonts. 
It defines the exact layout changes for buttons, inputs, toggles, and cards.

---

## Summary and Requirements

We are updating the Noiseless workstation interface to harmonize with the Outfit display typography. 
The system will feature fully rounded buttons and subtly rounded cards and inputs. 

### Acceptance Criteria

1. Primary and secondary action buttons must use fully rounded borders (rounded-full).
2. Form fields, text inputs, textareas, and dropdown selectors must use soft rounded corners (rounded-xl).
3. Data list cards, calendar panels, and main container boxes must use soft rounded corners (rounded-xl).
4. Status chips and category badges must use tight rounded corners (rounded-md).
5. The view mode switcher (grid and list toggle) must use a capsule outline wrapper (rounded-full).
6. Typographic rules from the design system must be applied consistently using Outfit, Inter, and JetBrains Mono fonts.
7. TypeScript types must be stored in the types folder.
8. Component files must stay under the length limit of two hundred fifty lines.

---

## Technical Details

### Design Tokens Integration

We will use the CSS variables defined in the design tokens file:
* Canvas background: `bg-canvas`
* Surface panels: `bg-surface`
* Subtle mint insets: `bg-surface-inset`
* Border hairlines: `border-hairline`
* Text ink: `text-ink`, `text-ink-muted`, `text-ink-faint`
* Fonts: `font-display` (Outfit), `font-sans` (Inter), `font-mono` (JetBrains Mono)

---

## Build Plan

### Step 1: Global Variables and Setup

Verify that all brand fonts are imported in the root layout file. 
Confirm that globals.css maps the Tailwind classes correctly.

### Step 2: Update Watch Cards and Rows

Update the cards inside the watches component folder:
* Update [WatchCard.tsx](file:///workspaces/Noiseless/app/app/(dashboard)/watches/components/WatchCard.tsx) container to use `rounded-xl`.
* Update status chips to use `rounded-md`.
* Update findings count badge to use `rounded-md`.

### Step 3: Update Main Watch List and Dashboard

Modify [WatchList.tsx](file:///workspaces/Noiseless/app/app/(dashboard)/watches/components/WatchList.tsx) to align containers:
* Change calendar outer panel to `rounded-xl`.
* Change date hover indicators to `rounded-md`.
* Change analytics panel and progress containers to `rounded-xl`.
* Change the search input bar to `rounded-full`.
* Change the grid and list view toggle to `rounded-full`.

### Step 4: Redesign the Create Watch Dialog and Form

Modify [CreateWatchDialog.tsx](file:///workspaces/Noiseless/app/app/(dashboard)/watches/components/CreateWatchDialog.tsx) and [WatchForm.tsx](file:///workspaces/Noiseless/app/app/(dashboard)/watches/components/WatchForm.tsx):
* Change the "Create Watch" trigger button to `rounded-full`.
* Change the dialog modal backdrop panel to `rounded-xl`.
* Change form input fields (topic name, search queries input, frequency trigger, minimum score selector, and delivery fields) to use `rounded-xl`.
* Change the active toggle switch wrapper to `rounded-full`.
* Change Cancel and Save buttons to use `rounded-full`.

### Step 5: Verification

Confirm that all files compile cleanly by running:
`npx tsc --noEmit`
Verify that the server launches and displays the interface correctly.
