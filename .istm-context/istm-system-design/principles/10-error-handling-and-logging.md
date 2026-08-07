# Error Handling & Observability

This document defines how the system should handle and report failures.

## 1. User-Facing Error Boundaries
**The AI Rule:** Never allow the application to crash to a blank white screen. 
- Implement strict React Error Boundaries.
- Show gracefully degraded UI components with a "Try Again" or "Return Home" CTA.

## 2. API Error Standardization
**The AI Rule:** All API endpoints must return errors in a standardized JSON format.
Example:
\`\`\`json
{
  "error": true,
  "code": "VALIDATION_FAILED",
  "message": "The email provided is invalid.",
  "details": [...]
}
\`\`\`
Never expose raw database errors (e.g., PostgreSQL foreign key constraint failures) to the client, as this is a massive security risk.

## 3. Observability (Logging & APM)
**When to use:**
- Production applications that require tracking (e.g., Sentry for error tracking, Datadog or Axiom for logging).
**The AI Rule:** For MVPs, simple console logging is acceptable. However, any unhandled promise rejections or fatal errors MUST be caught and securely logged.
