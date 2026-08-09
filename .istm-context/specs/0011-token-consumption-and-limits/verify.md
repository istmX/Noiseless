# Verify: Token Consumption and Limit Enforcement · spec 0011 · updated 2026-08-09
_Steps derived from spec 0011 acceptance criteria. `/istm-check verify` runs these; `/istm-test` locks the durable ones._

## UI / manual
- [ ] Go to /settings → observe initial query token count shows 0 / 500 used → AC-1
- [ ] Click "Upgrade to Pro" → enter checkout details in card form → click process → observe tier upgraded to PRO with 0 / 10000 tokens → AC-2
- [ ] Open Create Watch drawer → observe Hourly frequency is now enabled and unlocked → AC-3

## Commands
- [ ] Run backend pipeline with depleted tokens (balance < 10) → observe run aborted, watch active set to False, and alert sent → AC-4
- [ ] Trigger search pipeline with FREE user and hourly frequency → observe run rejected and deactivated → AC-5
- [ ] Execute successful pipeline run → observe 10 tokens deducted and 10 added to tokensUsed in Postgres → AC-6

## Acceptance-criteria coverage
- AC-1 covered by step 1 · AC-2 covered by step 2 · AC-3 covered by step 3 · AC-4 covered by step 4 · AC-5 covered by step 5 · AC-6 covered by step 6
