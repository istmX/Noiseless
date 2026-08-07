# Progress Tracker

## 2026-08-07

### Completed
- Bootstrapped .istm-context/ blueprints via /istm-architecture.
- Locked tech stack and folder layout.
- Wrote 4 pillar files: agents.md, architecture.md, design.md, project-overview.md.
- Wrote GEMINI.md root harness.
- Ran /istm-design to hydrate color palette and typography tokens.
- Add shadcn/ui to the Next.js app.
- Implemented global UI tokens in globals.css and layout.tsx (Spec 0001).
- Installed Prisma with `@prisma/adapter-neon` and synchronized schema to database.
- Implemented secure JWT-based Auth (Login/Signup) with `bcryptjs`.
- Added global Theme Toggle logic to Root Layout.
- Integrated `image.png` global logo into authentication flows.
- Fixed Next.js Server Actions CSRF issue for Codespaces proxies.

### Pending
- Scaffold FastAPI service at /workspaces/Noiseless/services/api/.
- Install LangChain dependencies: langchain langchain-groq langchain-community langchain-qdrant.
- [x] Implement NextAuth.js auth routes.
- Implement Watch CRUD (FastAPI + Next.js).
- Implement Agent Pipeline (pipeline.py).
- Implement APScheduler jobs.
- Implement Notifications (Brevo + Slack).
- Implement Findings Timeline and Digest History screens.

### Notes
- Design tokens must be resolved before any component is coded.
- GROQ_API_KEY must be set in the FastAPI .env. LangChain (ChatGroq) reads this key automatically.
- Qdrant Cloud cluster must be provisioned.
- shadcn initialized with Tailwind v4 in app/. Alias paths set to @/shared/components and @/shared/lib.
