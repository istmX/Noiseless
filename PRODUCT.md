# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Investment Analysts & VCs**: Tracking portfolio companies, market events, and earnings releases.
- **Product Managers**: Monitoring competitor product announcements, pricing shifts, and industry blogs.
- **Founders & Researchers**: Following fast-moving technology areas (AI, biotech, climate) and competitive landscapes.
- **Sales & Policy Professionals**: Monitoring prospects for timely outreach or tracking regulatory changes.

## Product Purpose

Noiseless transforms continuous web monitoring from a manual, exhausting chore into an automated, signal-only intelligence stream. It watches defined topics, filters out duplicate or low-importance updates, and only alerts users when something genuinely new and significant happens.

## Positioning

- **Filter over Fetch**: Unlike standard RSS readers or Google Alerts that push all raw feeds, Noiseless inserts an AI-powered vector deduplication and LLM significance layer between raw data and the user's attention.
- **Grounded RAG Summaries**: Digests are synthesized using only retrieved, high-significance findings, ensuring zero LLM hallucinations by citing source URLs directly.

## Operating Context

- **Analyst Workstation**: A desktop-first, highly scanables, keyboard-navigable dashboard environment featuring a Raycast-style command menu (`⌘K`) and detail-oriented viewports.
- **Push Notification Channels**: Daily/weekly/hourly briefs sent to professional workspace endpoints (Slack incoming webhooks and Brevo transactional emails).

## Capabilities and Constraints

- **Watch Management**: Define watches with a name, Tavily search queries, frequency, significance threshold, and notification preferences.
- **Intelligent Processing Pipeline**: Uses Tavily for deep web searches, Qdrant for embedding-based cosine similarity deduplication (threshold > 0.88), and Groq (LLaMA-3.3-70b) for JSON-formatted significance scoring (1-10).
- **Manual Runs**: Supports manual trigger execution with a 15-minute cooldown lock to prevent resource abuse.
- **Token Quota Systems**: Tier-based monthly token quotas and execution limits based on user plan tiers (upgrades handled via checkout).

## Brand Commitments

- **Name**: Noiseless
- **Aesthetic**: Warm Slate Editorial palette (Zinc near-white canvas `#FAFAFA`, Slate charcoal primary `#18181B`, Electric violet accent `#7C3AED`, Emerald success `#059669`).
- **Typography**: DM Sans (headings/body) and DM Mono (code/metadata/data values).
- **Iconography**: Strictly Lucide icons. No emojis or illustration files allowed in empty states or dashboards.

## Evidence on Hand

- **Frontend**: Next.js 16 application under `/app` using Server Actions, Zustand for session caching, and Prisma ORM client with `@prisma/adapter-neon`.
- **Backend**: Python FastAPI application under `/backend` with LangChain chains, APScheduler, Qdrant client, and Brevo/Slack integrations.

## Product Principles

1. **Signal-Only Intelligence**: Never interrupt the user with noise. If a search yields zero new findings or scores below the watch's threshold, silence is golden.
2. **Workstation, Not Chatbot**: Render data as structured, dense, interactive dashboards, not conversation streams.
3. **Impeccable Visual Quality**: Keep layouts premium, crisp, responsive, and aligned with semantic v4 design tokens.
4. **Idempotence & Safety**: Lock concurrent runs and enforce strict rate limits to ensure predictable server execution.
