# Low-Level Design (LLD) & Code Structure

This document enforces the tactical, code-level architectural rules.

## 1. Data Integrity & Validation (The Golden Rule)
**The AI Rule:** No raw user input shall ever reach the database or business logic unvalidated.
- Use a validation library (like **Zod** or **Yup**).
- Validate at the absolute edge of the API route.

## 2. ORMs vs Query Builders vs Raw SQL
- **ORMs (Prisma, TypeORM):** The default recommendation for high developer velocity and strict type safety.
- **Query Builders (Drizzle, Kysely):** Recommended when the user wants more control over the SQL execution while retaining type safety.
- **Raw SQL:** Forbidden unless the user explicitly requests it for a highly complex, performant query.

## 3. Folder Structure & Feature Isolation
**The AI Rule:** Enforce Feature-Based Architecture.
Do not dump all components into a massive `components/` folder and all hooks into a `hooks/` folder.
Structure code by business domain:
\`\`\`
src/
  features/
    auth/
      components/
      api/
      hooks/
    dashboard/
      components/
\`\`\`
This prevents the codebase from turning into an unmaintainable "Big Ball of Mud".

## 4. Error Handling
**The AI Rule:** Never silently swallow errors.
- Always use structured try/catch blocks.
- Return standardized HTTP error codes (400 for bad input, 401 for unauthorized, 403 for forbidden, 404 for not found, 500 for internal errors).
- Do not leak stack traces or raw database errors to the frontend.
