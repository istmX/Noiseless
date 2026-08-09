# Verify: Dashboard and Watches Navigation Restructuring · spec 0013 · updated 2026-08-09
_Steps derived from spec 0013 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] Log in to application → verify automated redirect to new dynamic route `/dashboard` → AC-1
- [ ] On Dashboard: check the calendar header → verify month and year dynamically resolve to current year/month → AC-2
- [ ] Select today's date in calendar → verify newly created watches are visible → AC-3
- [ ] On Sidebar: click "Watches" link → verify navigation to `/watches` → AC-4
- [ ] On Watches page: observe workstation layout → verify all watches in the database are listed in grid/list without calendar date filtering → AC-5
- [ ] On Sidebar: click "Dashboard" link → verify navigation back to `/dashboard` → AC-6

## Acceptance-criteria coverage
- AC-1 covered by step 1 · AC-2 covered by step 2 · AC-3 covered by step 3 · AC-4 covered by step 4 · AC-5 covered by step 5 · AC-6 covered by step 6
