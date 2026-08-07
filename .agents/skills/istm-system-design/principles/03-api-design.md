# API Paradigms & Routing

This document defines how to expose data from the backend to the frontend.

## 1. REST (Representational State Transfer)
**When to use:**
- Building public APIs intended for third-party developers.
- Decoupled frontends (e.g., a React Native mobile app talking to an Express server).
**The AI Rule:** Use standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`). Always version public APIs (e.g., `/api/v1/users`).

## 2. tRPC / Server Actions (Next.js)
**When to use:**
- Full-stack TypeScript applications where the frontend and backend live in the same repository (Monorepo/Monolith).
**The AI Rule:** This is the preferred default for Next.js applications. It provides end-to-end type safety without the overhead of manually syncing OpenAPI specs.

## 3. GraphQL
**When to use:**
- Applications with highly complex, deeply nested, or variable data requirements.
- When clients need to avoid over-fetching or under-fetching data (e.g., mobile apps on slow networks).
**The AI Rule:** Do NOT use GraphQL for a simple CRUD MVP. It introduces massive overhead (resolvers, schema stitching, N+1 query risks). Only use if requested or if the domain data is intensely graph-like.

## 4. WebSockets & Server-Sent Events (SSE)
**When to use:**
- Real-time features (chat apps, live sports scores, collaborative editing like Google Docs).
**The AI Rule:** Use SSE for one-way streams (server to client). Use WebSockets (Socket.io) for bi-directional communication. Avoid for standard CRUD operations due to the complexity of managing persistent connections.
