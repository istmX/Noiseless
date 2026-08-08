# 🕵️‍♀️ Autonomous Research Analyst

Welcome to the **Autonomous Research Analyst** project! Since you're new here, here is a comprehensive rundown of what we are building, how it works, and our technology stack.

## 🎯 What is this app?
The Autonomous Research Analyst is a full-stack AI agent application designed for professionals. It allows users to create **"Watches"** on any specific topic—like competitors, industries, stocks, people, or technology trends.

Instead of a user manually Googling the same topics every day, a **background AI agent** does the heavy lifting:
1. It periodically searches the web for the topic.
2. It deduplicates results so users don't see the same news twice.
3. It scores the significance of the findings using a Large Language Model (LLM).
4. If a finding is highly significant (based on a user's chosen threshold), it generates a neat digest and alerts the user via Email or Slack.

The goal is to turn continuous internet monitoring into a high-signal, low-noise intelligence stream that feels like a professional Bloomberg terminal, not a generic chatbot.

---

## 🔄 The Primary User Flow
1. **Dashboard**: The user logs in and opens their professional dashboard.
2. **Create a Watch**: They define a topic (e.g., "OpenAI Product Releases"), set search queries, choose how often the agent should run (hourly, daily, weekly), and set a "Significance Threshold" (1-10).
3. **The Agent Runs (Background)**:
   - **Search**: Uses the Tavily API to scour the web.
   - **Embed & Deduplicate**: Converts findings into vector embeddings and checks against a Qdrant vector database to ensure the news is actually new.
   - **Score**: Sends the finding to the Groq LLM to grade its importance from 1-10.
4. **Notification**: If the score crosses the threshold, a RAG (Retrieval-Augmented Generation) digest is created and sent to the user's Email or Slack.
5. **Review**: The user can visit the Watch detail page at any time to review a timeline of findings and past digests.

---

## 🏗️ The Technology Stack
The application is split into two main parts: a beautiful, responsive frontend and a heavy-lifting agentic backend.

### Frontend (Next.js)
Located in `/workspaces/Noiseless/app/`
- **Framework**: Next.js 16 (App Router, Server Components, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with a highly customized, premium design system (dark-mode first, glassmorphism, semantic tokens).
- **Components**: shadcn/ui & Lucide icons.
- **Database Access**: Prisma ORM connecting to a Serverless Neon Postgres DB.

### Backend (Python FastAPI)
Located in `/workspaces/Noiseless/services/api/` (currently being scaffolded)
- **Framework**: Python FastAPI
- **Search Engine**: Tavily API (optimized for AI agents and news retrieval).
- **Vector Database**: Qdrant Cloud (for cosine similarity deduplication).
- **Embeddings**: `sentence-transformers` running locally on the CPU (free, no API cost).
- **LLM Engine**: Groq API (`llama-3.3-70b-versatile`) chosen for blazing fast JSON-mode inference.
- **Agent Orchestration**: LangChain (Python) & APScheduler for running the background cron jobs.

---

## 🎨 Design Principles
We are strictly adhering to a **premium, data-dense aesthetic**. 
- No generic SaaS colors; we use specific semantic tokens (`bg-surface`, `text-ink-muted`, etc.).
- The UI must always feel structured, predictable, and fast.
- We rely heavily on typography (Playfair Display, Space Grotesk, Inter, JetBrains Mono) and subtle micro-animations to make the interface feel alive.

You're jumping in right as we've finished building the **Dashboard UI** (where watches are listed and created). Next up is connecting it to the Python backend!
