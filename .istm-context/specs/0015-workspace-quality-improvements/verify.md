# Verify: Workspace Quality and Monitoring Improvements · spec 0015 · updated 2026-08-09
_Steps derived from spec 0015 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] Access an invalid route like `/invalid-page` → verify custom 404 page renders the static asset `image-copy-3.png` beautifully with Outfit styles → AC-1
- [ ] On Sidebar: click "System Health" link → verify dynamic status grids, metrics graphs, and logs update on mount at `/agent` → AC-2
- [ ] Trigger manual run on watch details page → observe button disables and shows a fifteen minute countdown timer (Cooldown MM:SS) → AC-3
- [ ] Verify that a completed run with no new findings yields no token deduction in user profile Settings metrics → AC-4

## Acceptance-criteria coverage
- AC-1 covered by step 1 · AC-2 covered by step 2 · AC-3 covered by step 3 · AC-4 covered by step 4
