# Error Memory

AI agents MUST inspect this file before making code changes or diagnosing errors.

## 2026-08-07 CSRF Proxy Issue
- Symptom: `Invalid Server Actions request. x-forwarded-host header ... does not match origin`
- Root cause: Next.js CSRF protection rejecting proxied requests from Codespaces.
- Fix: Add `serverActions: { allowedOrigins: ["*.github.dev", "*.app.github.dev"] }` to `next.config.ts`.
- Verified: yes
