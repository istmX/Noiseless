# Autonomous Research Analyst Project Overview

## Product Name

Noiseless

---

# Vision

Turn continuous professional monitoring from a manual, exhausting task into an automated, signal-only intelligence stream.

Professionals today spend hours every week manually checking news, competitor pages, earnings releases, GitHub repos, and industry feeds. Most of what they read is noise. The Autonomous Research Analyst watches topics on their behalf, silently discards duplicates and low-importance updates, and only surfaces something when it genuinely matters.

The product is a multiplier for analysts, founders, investors, and researchers who need to stay informed without becoming information addicts.

---

# Problem Statement

Information overload is a professional hazard. The signal-to-noise ratio in news and web content is terrible.

Examples:
- A venture investor needs to track 20 portfolio companies across news, LinkedIn, and tech blogs, but gets drowned in press releases.
- A product manager wants to monitor three competitors but has no time to read their blogs daily.
- A trader tracks five stocks and wants to know the moment a material event (earnings surprise, leadership change, regulatory news) happens.
- A researcher monitors a fast-moving technology area and keeps missing important papers because feeds are too noisy.

Current tools (Google Alerts, RSS readers, social feeds) send everything with no intelligence layer. They solve the fetching problem but not the filtering problem.

---

# Solution

The Autonomous Research Analyst adds an AI-powered significance filter between raw web content and the user's attention.

A Watch contains:
- A human-readable topic label
- One or more Tavily search queries that define the search surface
- A frequency setting (how often the agent runs)
- A significance threshold (the minimum score for a finding to trigger a notification)
- Notification preferences (email via Brevo, Slack via webhook, or both)

The agent's pipeline:
- Searches the web using Tavily (clean content extraction, AI-native)
- Embeds each result using sentence-transformers (local, free, no API)
- Deduplicates against past findings using Qdrant vector similarity
- Scores significance from 1-10 using a LangChain chain (ChatGroq with llama-3.3-70b-versatile, JSON mode)
- Only stores and notifies when something is genuinely new and important
- Generates a grounded digest via a LangChain RAG chain (Qdrant retrieval + ChatGroq) that cites specific source URLs

The result is that users are only interrupted when it matters.

---

# Target Audience

Primary Users:
- Investment analysts and venture capitalists tracking portfolio companies and market events
- Product managers monitoring competitor product announcements and pricing changes
- Founders tracking their competitive landscape and industry news
- Researchers following fast-moving technology fields (AI, biotech, climate)

Secondary Users:
- Journalists maintaining a beat and tracking sources
- Sales teams monitoring prospect company news for timely outreach
- Policy professionals tracking regulatory changes in their domain

---

# Core User Journey

User signs in with email via NextAuth
↓
User creates a Watch: enters topic, search queries, frequency, and notification preferences
↓
Agent runs in the background on the configured schedule
↓
Agent finds a novel, significant result and generates a cited digest
↓
User receives an email or Slack message with the digest and opens the dashboard to explore the full findings timeline

---

# Secondary User Journey

User opens dashboard
↓
Sees the Watch list with current status (active, paused, running)
↓
Clicks a Watch to open its detail page
↓
Reviews the findings timeline and digest history
↓
Adjusts the significance threshold or search queries, then saves

---

# Primary Screens

1. Login and Register (auth screens)
2. Dashboard: Watch List
3. Watch Detail: Findings Timeline
4. Watch Detail: Digest History
5. Create or Edit Watch (modal dialog)
6. Settings (notification preferences, account)

---

# Login and Register Screen Details

Purpose:
Authenticate the user using NextAuth.js. Supports email and password (credentials provider) in MVP. OAuth providers (Google, GitHub) can be added later.

Contains:
- Email input
- Password input
- Sign in button
- Link to register screen
- Error state for invalid credentials

---

# Dashboard: Watch List Screen Details

Purpose:
Give the user an at-a-glance overview of all their watches and their current agent status.

Contains:
- Page header: "Your Watches" with a "Create Watch" button
- Grid of watch-card components
- Each card: topic, frequency badge, status dot (active / paused / running), last-run timestamp, finding count, significance threshold
- Empty state when no watches exist: Eye icon, "No watches yet", "Create Watch" CTA

---

# Watch Detail: Findings Timeline Screen Details

Purpose:
Show a chronological feed of all novel, significant findings the agent has stored for this watch.

Contains:
- Watch topic as H1, frequency and status badges
- AgentStatusBadge (pulsing when run_in_progress is true)
- "Run Now" button to manually trigger the agent pipeline
- Paginated list of finding-card components
- Clicking a finding-card opens the finding-detail-drawer

This is the most critical interaction view. It must always feel alive when the agent is running.

---

# Watch Detail: Digest History Screen Details

Purpose:
Show all digests generated and sent for this watch, in reverse chronological order.

Contains:
- List of digest-card components
- Each digest: sent timestamp, summary text (first 200 characters), number of findings included, "View findings" link
- Empty state: Inbox icon, "No digests sent yet"

The layout should feel like an email inbox for intelligence reports, not a generic database table.

---

# Create or Edit Watch Screen Details

Contains:
- Modal dialog (shadcn/ui Dialog)
- Topic field (text input)
- Search queries field (textarea, comma-separated or newline-separated)
- Frequency select (Hourly, Daily, Weekly)
- Significance threshold select (1-10, with descriptions: 1 = anything, 10 = major events only)
- Notification email input (optional)
- Slack webhook URL input (optional)
- Active toggle switch
- Save and Cancel buttons

---

# Empty State Philosophy

Empty states in this tool are informational, not emotional. They should feel:
- Clear and professional
- Informative about what will happen next
- Focused on a single action

Every empty state uses a Lucide icon, a short headline, a single supporting sentence, and one primary CTA. No emojis. No illustrations. No image files.

---

# Future Features

Not MVP:
- OAuth login providers (Google, GitHub)
- Watch templates library (pre-built watches for common topics like "AI news" or "Competitor pricing")
- Webhook output destination (send findings to Zapier, Make, or custom endpoints)
- Browser extension to add a URL directly as a finding to a watch
- Digest scheduling (choose time of day for the notification, not just frequency)

These features are intentionally excluded from the initial build.

---

# Success Metric

The app succeeds when users can answer:
"Did anything important happen with [topic] this week?"
without guessing.

---

# Progress Tracker Log

## 2026-08-07

### Completed

- Read the project instructions and context documents before implementation.
- Bootstrapped .istm-context/ blueprints via /istm-architecture.
- Locked in tech stack: Next.js 16, FastAPI, Neon, Qdrant, Groq, APScheduler, Brevo, Slack webhooks.
- Decided folder layout: /workspaces/Noiseless/app/ for Next.js, /workspaces/Noiseless/services/api/ for FastAPI.

### Verification

- (AI will log verifications here as features are built.)

### Notes

- Design tokens (colors, typography, motion) are TBD. Run /istm-design before implementation begins.
- GROQ_API_KEY must be set in the environment before the FastAPI backend can score significance or generate digests.
- Qdrant Cloud free-tier cluster must be provisioned before the agent pipeline can run.
