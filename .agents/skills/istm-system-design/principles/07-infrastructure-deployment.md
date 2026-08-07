# Infrastructure & Deployment

This document dictates how applications should be hosted and deployed.

## 1. Managed Platforms (PaaS - Vercel, Netlify, Render)
**When to use:**
- Startups, MVPs, and modern full-stack frameworks (Next.js, SvelteKit).
**The AI Rule:** Always recommend PaaS as the default deployment strategy. The developer experience and zero-configuration CI/CD pipelines heavily outweigh the fractional cost savings of manual hosting for early-stage projects.

## 2. Containerization (Docker)
**When to use:**
- When the tech stack is complex or requires specific OS-level dependencies (e.g., a Python ML microservice next to a Node API).
- Deploying to generic cloud providers (AWS ECS, Google Cloud Run).
**The AI Rule:** Containerize applications if portability is a strict requirement.

## 3. Kubernetes (K8s)
**When to use:**
- Massive enterprise applications requiring complex orchestration, auto-scaling, and self-healing across hundreds of nodes.
**The AI Rule:** **Strictly forbid Kubernetes for MVPs.** K8s introduces monumental operational overhead. Only recommend it if the user explicitly demands container orchestration at scale.

## 4. CI/CD (Continuous Integration / Continuous Deployment)
**The AI Rule:** Every project must have a CI pipeline that runs linting, type-checking, and tests before merging to the main branch. Warn the user if they attempt to deploy without basic automated checks.
