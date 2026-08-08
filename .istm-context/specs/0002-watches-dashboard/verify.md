# Verify: Watches Dashboard (List & Create) · spec 0002 · updated 2026-08-07
_Steps derived from spec 0002 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] View Watches Dashboard with no watches → Expect to see "No watches yet" empty state → AC-1
- [ ] Click "Create Watch" → Fill form (Topic, Query, Daily, Threshold 5) → Submit → Expect toast success and see new watch card in list → AC-2
- [ ] View Watch Card for active watch → Expect pulsing blue "Running" or green "Active" badge, correct threshold and frequency → AC-1

## Commands
- [ ] `npx prisma studio` → Check database for new Watch record → AC-2

## Acceptance-criteria coverage
- AC-1 (Watch List Page) covered by step 1 & 3
- AC-2 (Watch Creation/Editing) covered by step 2 & 4
- AC-3 (Data Fetching) covered by step 3
