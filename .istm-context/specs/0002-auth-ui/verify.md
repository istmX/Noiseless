# Verify: Auth UI & Credentials Provider · spec 0002 · updated 2026-08-07
_Steps derived from spec 0002 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] Visit `/register` → submit valid email and password (>= 8 chars) → expect redirect to `/login` with success state → AC-1
- [ ] Visit `/login` → submit invalid credentials → expect error message "Invalid email or password" → AC-2
- [ ] Visit `/login` → submit `test@example.com` / `password123` → expect successful redirect to `/watches` (Dashboard) → AC-3

## Commands
- [ ] `npm run build` or `npx tsc --noEmit` → expect 0 type errors across all newly created auth files → AC-4

## Acceptance-criteria coverage
- AC-1 (Registration flow) covered by UI step 1
- AC-2 (Login error handling) covered by UI step 2
- AC-3 (Login success flow) covered by UI step 3
- AC-4 (Strict typing / no any) covered by Commands step 1
