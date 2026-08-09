# Verify: Interactive Billing Checkout Page · spec 0012 · updated 2026-08-09
_Steps derived from spec 0012 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] Go to /settings → click "Upgrade to Pro" or "Upgrade to Enterprise" → observe redirection to dynamic route `/checkout/pro` or `/checkout/enterprise` → AC-1
- [ ] On Step 1: toggle billing intervals (Monthly/Yearly) → verify that price totals calculate correctly → AC-2
- [ ] On Step 2: fill billing address fields → click continue → observe transition slide to card inputs step → AC-3
- [ ] On Step 3: input card parameters (invalid inputs show error block) → click continue → observe slide to final step → AC-4
- [ ] On Step 4: review plan totals and address details → click "Process Subscription" → observe simulated security message overlays cycle in sequence → AC-5
- [ ] Observe success overlay with green checkmark animation → click return button → verify redirection back to settings, showing upgraded tier and reset token metrics → AC-6

## Acceptance-criteria coverage
- AC-1 covered by step 1 · AC-2 covered by step 2 · AC-3 covered by step 3 · AC-4 covered by step 4 · AC-5 covered by step 5 · AC-6 covered by step 6
