# Feature Specification: Timeline and Digest UI Redesign

This specification defines the redesign of the Findings Timeline and the Digest History sections inside the Watch Detail view to build a structured, high density chronological feed.

## Summary and Requirements

- Redesign Findings Timeline into a chronological feed of card boxes.
- Each finding card must structure details cleanly: category label, significance score, publish date, source domain tag, title, and summary text.
- Redesign Digest History to display dispatches as structured accordion items.
- Highlight key facts and entities within the digest body prose using subtle tag elements (e.g. bg-primary-soft tints).
- Align all rounding, spacing, and border weights with the global design tokens.

## UI and Architecture Integration

We implement the design tokens defined in the system guide:
- Card roundings: rounded-md
- Spacing gaps: gap-4 to gap-6
- Border: border-hairline
- Accent tags: text-success bg-success-soft rounded-sm

## Build Plan

### Step 1: Findings Timeline Card Feed
Update the findings list view container to render cards chronologically.
Design each finding item with:
- Top row: category label on the left, significance score (e.g. 8/10 in mono font) and publish date on the right.
- Middle row: bold title that redirects to the source URL on click, with an external link indicator.
- Bottom row: short summary paragraph in forest grey body text.

### Step 2: Digest History Accordions
Update the digest timeline to group items by dispatch date.
Render each digest dispatch as an expandable card.
Include a header showing the dispatch date and summary headline.
Within the expanded body, render:
- The digest text content.
- A dedicated citations list styled as interactive grid chips.
- Highlights on key names, metrics, or entities mentioned in the text.
