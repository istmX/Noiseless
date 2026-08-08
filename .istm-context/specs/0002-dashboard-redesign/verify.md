# Verify: Dashboard Redesign · spec 0002 · updated 2026-08-08
_Steps derived from spec 0002 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] Render the dashboard list view and grid view → all watch cards and list container rows use rounded-xl or rounded-md styling → AC-1, AC-3, AC-4
- [ ] Open the calendar box → dates hover indicator and outer box outline show rounded-md and rounded-xl shapes → AC-3, AC-4
- [ ] Double check the active stats bars and progress panels → indicators use rounded-xl and progress bars are rounded-full → AC-3, AC-4
- [ ] View status filters and search bar → inputs and filters show rounded-full shapes → AC-1, AC-2, AC-5
- [ ] Click Create Watch to open the dialog → trigger button is rounded-full, dialog container box has rounded-xl, and inputs show rounded-xl → AC-1, AC-2, AC-3
- [ ] View active toggle inside the watch form → toggle matches capsule rounded-full styles → AC-5
- [ ] Submit form or cancel out → Cancel and Save action buttons show rounded-full styling → AC-1

## Acceptance-criteria coverage
- AC-1 covered by button validation steps
- AC-2 covered by text inputs validation steps
- AC-3 covered by cards and panels validation steps
- AC-4 covered by badges and chips validation steps
- AC-5 covered by view switch validation steps
