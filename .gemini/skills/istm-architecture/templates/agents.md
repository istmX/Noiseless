# {project_name} — AI Agent Working Instructions

This document defines how AI coding agents should understand, architect, and implement {project_name}.

Everything written here is considered project context.

Never ignore these rules.

---

# Project Overview

{project_vision_and_core_concept}

Instead of repeatedly explaining a project to different AI tools, users describe their idea once. The generated context becomes a single source of truth that can be used with any AI coding tool.

The goal is consistency. Every AI coding assistant should understand the project exactly the same way.

---

# Core Product Principles

The product should always feel:
- Professional
- Developer-first
- Minimal
- Premium
- Fast
- Predictable
- Structured

Never make the application feel like a generic AI chatbot. Everything should feel like a professional development workspace.

---

# Primary User Flow

User inputs intent
↓
{user_flow_step_1}
↓
{user_flow_step_2}
↓
{user_flow_step_3}
↓
Context becomes usable

---

# Supported AI Tools

Generated context should work with any AI coding environment.
Examples include:
- OpenAI Codex
- Claude Code
- Gemini CLI
- Cursor
- Windsurf
- GitHub Copilot
- Roo Code
- Cline

Never optimize for only one AI provider.

---

# Development Principles

Always prefer:
- Maintainability
- Scalability
- Readability
- Reusability
- Type safety where applicable
- Predictable architecture

Never write code only because it works. Write code that another engineer can immediately understand.

---

# Frontend Layout and Text-Wrapping Safety

Before adding or changing frontend UI, verify the rendered parent width and alignment at desktop and mobile sizes.

- Do not make a flex or grid text wrapper shrink-to-fit accidentally. A content row that owns a full-width child should explicitly use `w-full min-w-0` when appropriate.
- Do not use `overflow-wrap: anywhere` for normal prose. It can reduce intrinsic width and cause a parent to collapse, producing one-word or one-character lines.
- Do not use display/tall fonts or very small `max-w-*` values for body copy. Paragraphs should use the body font and a readable measure, generally around 45–75 characters per line.
- Do not hardcode UI surface, text, border, or semantic-state colors in components. Use the semantic tokens (`bg-canvas`, `bg-surface-elevated`, `text-ink`) so light and dark themes stay coherent.
- Use the product sans token for body copy, headings, buttons, forms, and navigation. Use the tall/display face only for deliberate editorial hero typography.
- Shared buttons must use the button component vocabulary and typography tokens. New button-like links should reuse existing buttons before introducing a one-off font, radius, or height.

---

# Planning Before Coding

Never immediately start implementing. Before writing code:

1. Understand the feature.
2. Understand dependencies.
3. Break the feature into small tasks.
4. Explain the implementation plan.
5. Ask questions if information is missing.
6. Only then begin implementation.

Never guess requirements. If anything is unclear, ask.

---

# Feature Development Process

Every feature should follow this workflow:

Understand
↓
Plan
↓
Break into tasks
↓
Implement task-by-task
↓
Verify
↓
Refactor
↓
Update progress.md

Never implement multiple unrelated features together.

---

# Mandatory Legacy Code Purge & Model Dispatch Rules

1. **Mandatory Legacy Code Clean-Up Rule**:
   Whenever an AI agent modifies, refactors, or replaces a feature, prompt, or function, it MUST scan the full codebase and permanently remove all dead/legacy code, unused variables, outdated prompt templates, and old fallback logic associated with that feature across all files.

2. **Sequential Dedicated Model Dispatch for Blueprint Files**:
   The context blueprint files (`agents.md`, `design.md`, `architecture.md`, `project-overview.md`) MUST be generated sequentially using dedicated high-speed provider models per file (`get_interactive_llm()`). Parallel bursting of concurrent LLM calls is strictly prohibited to prevent API rate-limits and timeouts.

---

# Folder Structure

Use Feature-Based Architecture. Never place business logic inside pages.

Recommended structure:
```
src/
  pages/
  features/
    {feature_name}/
      api/
      hooks/
      store/
      ui/
      utils/
      constants/
      types/
      index.js
  shared/
    components/
    hooks/
    layouts/
    utils/
```

Every feature owns its own API, Hooks, Store, UI, etc. Only truly reusable components belong inside `shared/components`.

---

# Pages

Pages should remain extremely small. Pages only render feature components. No business logic inside pages. No API calls inside pages. No state management inside pages. Pages are routing layers only.

---

# Component Rules

Keep components focused. One responsibility. If a component grows too much, split it. Avoid giant files. Prefer composition over complexity.

---

# File Length

No source file should exceed approximately 250 lines whenever reasonably possible. If a file becomes too large, split it and extract logic.

---

# State Management

Keep state local whenever possible. Lift state only when required. Global state should only exist when multiple features genuinely require it.

---

# Constants & Styling Rules

Never hardcode values. Create constants for routes, labels, limits, validation, and animations.
Never hardcode colors, spacing, typography, border radius, or shadows. Always use values defined in the project's design system (`.istm-context/design/`).

---

# Progress & Error Memory Tracking

Two critical memory tracking files exist in the project:

1. `progress.md`: Tracks completed tasks, feature statuses, and pending deliverables.
2. `error-memory.md`: Tracks system architecture bugs, root causes, gateway timeouts, and verified fix patterns.

**Mandate for AI Agents**:
- Before making code changes or diagnosing an error, AI agents MUST inspect `error-memory.md` to avoid repeating past architectural bugs.
- After fixing any meaningful bug or error, update both `progress.md` and `error-memory.md` immediately with the symptom, root cause, and verified resolution.

---

# When Stuck

Never invent requirements. Never guess. Stop. Ask questions. Wait for clarification. Then continue.

---

# Definition of Done

A task is complete only when:
- Feature works correctly
- Code follows project architecture
- No hardcoded values
- Components are reusable
- Folder structure is respected
- Pages remain thin
- progress.md is updated
