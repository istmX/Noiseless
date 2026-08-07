# High-Level Architecture Patterns

This document defines the strict rules for selecting the high-level architecture of a project.

## 1. The Monolith (The Default Standard)
**Definition:** A single, unified codebase containing both the frontend, backend, and API routing (e.g., Next.js, Nuxt, or a standard Node.js/Express server).
**When to use:** 
- 95% of all new projects, MVPs, and early-stage startups.
- Internal dashboards, SaaS platforms, and standard e-commerce sites.
**The AI Rule:** **Always assume a Monolithic architecture by default.** Do not introduce architectural complexity unless the user explicitly defines a scale that breaks a monolith.

## 2. Microservices
**Definition:** A suite of independently deployable services communicating over a network.
**When to use:** 
- When distinct parts of the application have drastically different scaling needs (e.g., a heavy video rendering engine alongside a lightweight user profile API).
- When multiple autonomous teams are working on the same product.
**The AI Rule:** **Strictly forbid Microservices for MVPs.** Microservices introduce network latency, complex deployments, and distributed tracing overhead. Only recommend if the user explicitly demands "enterprise web scale" or distinct scaling bottlenecks.

## 3. Serverless (Functions as a Service)
**Definition:** Ephemeral backend logic deployed to edge networks or serverless providers (e.g., AWS Lambda, Vercel Edge Functions).
**When to use:**
- Highly variable workloads with unpredictable traffic spikes.
- Applications deployed primarily on platforms like Vercel or Netlify.
**The AI Rule:** Serverless is acceptable for Next.js/Vercel deployments. However, warn the user about "Cold Starts" and database connection pooling limits (recommend connection poolers like PgBouncer or Prisma Accelerate).
