# Feature Specification: Watch Detail Layout and Controls

This specification defines how the Watch Detail page UI is enhanced. It adds inline watch editing controls and a structured layout for AI digests and citations.

## Summary and Requirements

- Create an inline collapsible settings panel at the top of the Watch Detail page to modify watch frequency, search queries, significance threshold, and active status.
- Render the settings panel collapsed by default, expanding with a smooth height transition.
- Structure the AI Digest Report layout to parse and highlight inline citations.
- Display a clean citations panel below the digest content rather than plain bullet links.
- Only construct the UI elements and state variables in this step. The backend integration logic will be wired next.

## UI and Architecture Integration

The collapsible settings panel uses the design system spacing and border tokens:
- Border: border-hairline
- Panel background: bg-surface-inset
- Collapsed transition: Framer Motion layout or height animations

The citations section renders inside a custom card component using Space Grotesk labels and JetBrains Mono URLs.

## Build Plan

### Step 1: Collapsible Settings Panel
Add state controls to the main watch details component to manage the edit form inputs.
Build the inline collapsible card container directly below the details header.
Include form inputs for:
- Watch status toggle (Active/Paused)
- Frequency selector (hourly, daily, weekly)
- Significance threshold slider (1 to 10 scale)
- Search queries list builder (add and remove text inputs)

### Step 2: Digest formatting and Citations Panel
Build a formatter function to detect markdown links inside the digest content text.
Replace raw inline links with styled numbers or highlight tags.
Render a structured citations grid at the bottom of the digest report layout. Each grid item should display the domain or link in a compact code style box.

