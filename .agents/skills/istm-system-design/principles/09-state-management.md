# State Management (Frontend)

This document dictates how state is managed in the frontend application.

## 1. Server State vs Client State
**The AI Rule:** Clearly separate Server State (data fetched from the database/API) from Client State (UI toggles, dark mode, form inputs).
- **Server State:** Use tools like React Query, SWR, or tRPC (which wraps React Query). Never use Redux or Zustand to store API responses manually.
- **Client State:** Use React Context for simple global state (e.g., Auth User, Theme). Use Zustand for complex, rapidly changing global state (e.g., a drag-and-drop canvas).

## 2. The Local State Default
**The AI Rule:** Default to local state (`useState`, `useReducer`). Only elevate state to global contexts when it is genuinely required by multiple, deeply nested components. Do not prematurely optimize with global stores.

## 3. Form State
**The AI Rule:** Always use a dedicated form library (like React Hook Form) coupled with a validation schema (like Zod). Never manage complex form state manually with dozens of `useState` hooks, as it causes massive re-rendering performance issues.
