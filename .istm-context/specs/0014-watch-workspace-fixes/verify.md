# Verify: Watch Workspace Fixes · spec 0014 · updated 2026-08-09
_Steps derived from spec 0014 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] Open Create Watch drawer → leave notification email blank → submit watch → check database record → verify email field is populated with your account email → AC-1
- [ ] Open Watch Detail settings collapsible panel → leave email blank → click save → verify email field defaults to your account email → AC-2
- [ ] Click "Run Now" button → verify button disables, shows spinner, and says "Triggering..." during backend communication → AC-3
- [ ] Click "Run Now" button again immediately after a successful run → verify toast error banner displays: "This watch was executed recently. Please try again in an hour or wait for the automatic daily update." → AC-4

## Acceptance-criteria coverage
- AC-1 covered by step 1 · AC-2 covered by step 2 · AC-3 covered by step 3 · AC-4 covered by step 4
