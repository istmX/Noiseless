# Autonomous Research Analyst Master UI and UX Plan

This document defines the complete product design, user experience architecture, visual system, and motion choreography for the entire application. It integrates best practices from top design engineers, modern developer tools, and cutting edge AI research platforms like Perplexity, Linear, Vercel, and Palantir.

---

## Part 1. Core Product Principles

### 1. Zero Noise Intelligence
Every pixel must deliver signal. We eliminate decorative cards, floating shadows, and unneeded whitespace padding. Information is presented in high density data tables and split pane streams.

### 2. Progressive Revelation
We show high level summaries first. Selecting any row smoothly reveals a deep inspection panel with direct citations, entity extraction, and source text.

### 3. Tactile Dark Workspace
The interface uses a true obsidian dark palette with one pixel hairlines. Interactive elements react immediately with background color shifts and subtle focus rings.

### 4. Fluid Spring Motion (Benji Taylor Principles)
Linear and fixed duration transitions feel artificial. All layout shifts, active indicators, and drawers use spring physics for natural tactile responsiveness.

---

## Part 2. Brand New Features to Elevate the Application

### 1. Global Command Menu (Shortcut Cmd K)
An instant command bar accessible everywhere. Users can search findings, filter watches, jump to settings, or run an ad hoc web research query on demand.

### 2. Signal Noise and Deduplication Matrix
A visual vector inspection tool. Shows how raw Tavily search results are embedded via Groq, compared in Qdrant vector space, and filtered out if cosine similarity exceeds 0.88.

### 3. Live Agent Execution Trace
A real time telemetry panel. Displays step by step execution status of background jobs, including Tavily search latency, vector embedding times, Groq LLM scoring duration, and notification dispatch.

### 4. Interactive Citation Inspector
Side by side source web page verification window. When viewing a finding, users can inspect highlighted source sentences, extracted key metrics, and confidence scores.

### 5. Watch Significance Tuner
A visual matrix plotting findings by score versus recency. Allows analysts to adjust significance thresholds dynamically with visual preview feedback.

---

## Part 3. Complete Page by Page UI and UX Specification

### 1. Global Shell and Monolithic Navigation
* Navigation Rail: 64px left rail in pure obsidian. Contains brand logo, core section icons with instant tooltips, and user profile avatar.
* Top Bar: Breadcrumb trail, live agent status pulse dot, global command search trigger, and primary action button.
* Motion: Active rail background morphs smoothly using Motion layoutId with Snappy Spring (stiffness 380, damping 32). Tooltips fade with 120ms delay.

### 2. Dashboard Workstation (Intelligence Overview)
* Left Split Pane: Full height Intelligence Stream. High density rows showing score badge, category tag, watch topic, key fact, and date.
* Right Split Pane: Telemetry and Quick Watch column. Features a tight four square metrics grid and a compact watch list.
* Citation Inspector Drawer: Slides out from the right on row selection using Responsive Spring (stiffness 280, damping 28).
* Motion: Row tap scales down slightly to 0.99. Row entrance uses translate Y 8px to 0px fade with Responsive Spring.

### 3. Watches Workstation
* Interactive Data Table: Replaces generic cards with a dense, interactive data grid.
* Columns: Status, Topic Name, Search Queries count, Frequency, Significance Threshold slider, Findings count, Last Run timestamp, Actions menu.
* Inline Editing: Allows updating active status and notification channels directly in the table.
* Motion: Table filter shifts and search results update smoothly without layout flicker.

### 4. Watch Detail Workspace
* Left Column: Chronological finding stream with score filter toggles.
* Right Column: Generated RAG intelligence digests with direct citation links.
* Header Actions: Run Watch Now button with live progress indicator, edit watch drawer trigger, delete confirmation.

### 5. System Health and Agent Telemetry (/agent)
* Execution Timeline: Visual trace log of recent background runs.
* Metric Counters: Total API tokens used, vector DB memory status, Tavily credit budget remaining.

### 6. Consolidated Settings, Profile, and Billing (/settings)
* Unified Tab Bar: General Profile, Notification Webhooks, API Credentials, and Subscription Billing.
* Usage Gauge: Visual token meter showing current tier usage against monthly limits.
* Motion: Tab switching uses Motion layoutId for smooth underline slider animations.

---

## Part 4. Benji Taylor Motion Engineering System

### 1. Physics Engine Standards
* Responsive Spring (Drawers and Sheets): Stiffness 280, Damping 28, Mass 0.8.
* Snappy Spring (Indicators and Tabs): Stiffness 380, Damping 32, Mass 0.5.
* Micro Transition (Buttons and Rows): 150ms duration, cubic bezier (0.2, 0, 0, 1).
* Agent Pulse: 1.5 second loop, opacity keyframes between 1.0 and 0.35.

### 2. Hardware Acceleration Mandate
All components MUST strictly animate transform (translate, scale) and opacity. Direct animation of width, height, padding, top, or margin properties is forbidden.

### 3. Reduced Motion Support
If prefers reduced motion is detected, spring physics and translation shifts are automatically disabled, falling back to instant opacity fades.

---

## Part 5. Step by Step Implementation Sequence

1. Step 1: Enforce obsidian dark theme tokens in globals.css, design.md, and animate.md.
2. Step 2: Build Global Shell with navigation rail, active indicator morph, and Cmd K command palette overlay.
3. Step 3: Build Dashboard Intelligence Stream with split pane layout, row hover micro feedback, and slide out citation drawer.
4. Step 4: Build Watches Workstation as a high density interactive data table with inline editing capabilities.
5. Step 5: Build Watch Detail view with dual column finding stream and interactive digest inspector.
6. Step 6: Build Agent System Health telemetry view with step by step live execution traces.
7. Step 7: Build Consolidated Settings and Billing workstation with spring animated tab bar.
