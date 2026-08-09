# Verify: Watch Workstation Toggle View and Date Filters · spec 0020 · updated 2026-08-09

These steps are derived from the acceptance criteria of spec 0020. The verify check runs these, and tests lock the durable ones.

## UI and manual verification

* [ ] Open `/watches/[id]` for an active watch, check that the filter bar is visible at the top. (AC-2)
* [ ] Enter a search query in the search bar, verify that the timeline and the digests history filter in real time. (AC-2)
* [ ] Click the date preset buttons (such as Today, Yesterday, or Last 7 days), check that the findings and the digests are filtered correctly. (AC-2)
* [ ] Select custom start and end dates, verify that the lists update to match the selected range. (AC-2)
* [ ] Click the Links button in the toggle control, verify that the timeline changes to a compact grid of source links. (AC-1)
* [ ] Click any title in the compact links list, check that it opens the source page in a new browser tab. (AC-1)
* [ ] Toggle back to the Timeline view, check that the detailed card layout is restored. (AC-1)
* [ ] Shrink the browser window size to test mobile screens, verify that all filter controls wrap correctly and do not cause horizontal scrolling. (AC-3)

## Commands

* [ ] Run `npx tsc --noEmit` from the `app/` folder, check that the compiler exits with code 0. (AC-4)

## Acceptance criteria coverage

* AC-1 is covered by the toggle control and compact view steps.
* AC-2 is covered by the search and date range input steps.
* AC-3 is covered by the mobile viewport layout check.
