# Spec 0022: Billing Polish and Legacy Clean Up

## Summary & Requirements
This specification covers the updates for billing token limits, subscription cancellation behavior, preflight token checks, and a clean up of legacy files.

### Core Acceptance Criteria
* **Preserve Token Usage on Plan Changes:** Upgrading or changing plans must preserve the current `tokensUsed` count. The `tokensBalance` limit must be updated based on the target tier (500 for Free, 10000 for Pro, 100000 for Enterprise).
* **Token Balance Preflight Check:** The agent pipeline and manual watch runs must check for sufficient token balances before performing search queries or processing results.
* **End Premium / Downgrade Button:** For users on Pro or Enterprise plans, the billing page must show a button to end premium. Clicking this will instantly downgrade the user back to the Free plan, update database values, and maintain token usage data.
* **Legacy Code and Placeholder Purge:** Scan and delete unused placeholder scripts, old mock files, obsolete tests, and unused packages from `package.json` and `requirements.txt`.

---

## Step 1: Global Setup (CSS & Layouts)
There are no changes to the global styling rules. All changes will preserve the existing Warm Slate styling system.

---

## UI & Architecture

### Downgrade Subscriptions Flow
* The user triggers the cancellation action from the billing page.
* The application invokes `upgradeUserPlan` server action (or a new downgrade action) with the "FREE" tier target.
* The system resets the user tier to "FREE" and adjusts the `tokensBalance` limit to 500 without resetting `tokensUsed`.

### Purge List
* Remove any old local store mock templates or placeholder data.
* Purge old database seed files or test scripts that are no longer referenced in active runs.

---

## Strict Typing & Constants
* Enforce type constraints across billing mutations.
* Hardcoded token limits (500, 10000, 100000) go into constants.

---

## Build Plan

### Phase 1: Billing and Plan Upgrade Logic
1. **Modify plan upgrade server action:**
   * Edit `/app/(dashboard)/settings/actions.ts` or corresponding billing action files.
   * Do not reset `tokensUsed` to 0 when upgrading or downgrading. Adjust only the maximum `tokensBalance` limit based on the selected tier.
2. **Update BillingPlans UI:**
   * Edit `BillingPlans.tsx`.
   * For the Free Tier card, check if the current user is premium (Pro or Enterprise). If they are, replace the disabled "Current Plan" or "Upgrade" button with an active "Cancel Subscription" (or "End Premium") button.
   * Wire the button to downgrade the user back to "FREE" tier using the update plan action.

### Phase 2: Token Verification Preflight Check
1. **FastAPI Run Preflight Check:**
   * Ensure the watch run endpoints check user token balances prior to executing Tavily search calls.
   * If the balance is insufficient, return a clear error envelope before generating API calls.

### Phase 3: Legacy File Cleanup
1. **Delete obsolete files:**
   * Remove unused test files, placeholder scripts, and mock stores.
2. **Prune Dependencies:**
   * Audit `app/package.json` and `backend/requirements.txt` to remove unused packages.
