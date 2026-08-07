# Authentication & Security

This document dictates how user identity and system security must be handled.

## 1. Session-based Auth (Cookies)
**When to use:**
- Standard web applications and dashboards accessed via a browser.
**The AI Rule:** Always default to `HTTP-only`, `Secure` cookies. This is the safest way to store credentials as it completely mitigates Cross-Site Scripting (XSS) attacks.

## 2. JWT (JSON Web Tokens)
**When to use:**
- Stateless architectures, microservices, or mobile applications (where cookies are difficult to manage).
**The AI Rule:** If using JWTs, enforce strict expiration times (e.g., 15 minutes) and implement a robust Refresh Token rotation strategy. Never store raw JWTs in `localStorage`.

## 3. OAuth & Third-Party Providers
**When to use:**
- To reduce friction in user onboarding (Google, GitHub, Apple login).
**The AI Rule:** Highly recommended for MVPs (using tools like NextAuth/Auth.js, Clerk, or Supabase Auth) to avoid rolling custom password reset logic and hashing.

## 4. Security Enforcement Rules
- **Passwords:** Never store plain text passwords. Always use strong hashing algorithms (bcrypt or Argon2).
- **Rate Limiting:** Enforce rate limiting on all public endpoints, especially `/login` and `/reset-password`, to prevent brute-force attacks.
- **RBAC (Role-Based Access Control):** Always define clear roles (e.g., `USER`, `ADMIN`). Verify the user's role on the server before mutating any data. Never trust the client's role state.
