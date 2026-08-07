---
name: istm-animate
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "The dedicated motion orchestrator and executor for @istmx/skills. Merges Emil Kowalski's design-engineering standards with the 'cast' pipeline. Operates in Dual-Mode: acts as a planner (writing specs) or an executor (physically injecting motion code like GSAP/Framer Motion/Compose into components)."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->
Write everything this skill produces, files and messages alike, in plain simple language. Keep technical terms that carry real meaning; explain each in plain words. Never use a dash or a hyphen as punctuation: no em dash, no en dash, and no hyphenated compounds. Write `read only`,not `read-only`. Say it in simple words, or reword the sentence. Code, file paths, command flags, and values other skills match on keep their hyphens. Use short sentences, commas, or parentheses. Clear beats clever.
<!-- OUTPUT-STYLE:END -->

## What this skill does

The master motion orchestrator and executor. It bridges human creativity and elite design-engineering math.

- **Dual-Mode Execution**: 
  - **Context Phase (Day Zero)**: Operates as an architect. Uses the Discovery Gate (Interview) to lock in the exact easing curves, durations, and triggers. Writes the blueprint (`.istm-context/animate.md`).
  - **Execution Phase (Day-to-Day)**: Operates as an executor. If asked to "animate this button" or "add a scroll reveal", it bypasses blueprint generation, asks how you want to preview it, and writes the actual animation code instantly (GSAP, Framer Motion, SwiftUI, or Compose) without needing `/istm-develop`.
- **The Cast Pipeline**: Scan stack -> Evaluate scope -> Propose interaction thesis -> Implement -> Mini-audit.
- **Auditing**: Can scan the codebase to find animation opportunities and point out what *should not* be animated based on premium design-engineering standards.

Does not build system architecture (/istm-architecture owns that) or generate full UI design systems (/istm-design owns that).

## Blueprint file convention

You READ the foundational blueprints:
- `.istm-context/design.md`
- `references/vocabulary.md`, `references/review.md`, `references/opportunities.md`, `references/animate.md`, `references/recipes.md`, `references/design-engineering.md`

You WRITE the motion feature specs (if in Context Phase):
- `.istm-context/animate.md`

## Scope and Stack Detection

Automatically detects the stack across Web (GSAP, Framer Motion, CSS), Android (Compose), and Apple (SwiftUI). Loads the appropriate framework intel from `frameworks/` and `mobile/`.

## Execution

### `Pre-flight` (main thread does this before anything else)
1. Read the user's prompt and scan the stack.
2. If the request is a vague setup ("setup animation rules"), execute the Context Phase.
3. If the request is an implementation command ("animate this hero section"), execute the Execution Phase (Cast Pipeline).

### The Cast Pipeline (Execution Phase)
1. **Scan Stack**: Determine if Web, Android, or Apple.
2. **Evaluate Scope**: Analyze the component to animate.
3. **Propose Interaction Thesis**: Use `references/vocabulary.md` to propose exact easing, physics, and intent. **Discovery Gate:** Ask the user if they want to preview it as an Artifact, Live Preview, or Inline text.
4. **Implement**: Write the physical code into the project files.
5. **Mini-Audit**: Run a quick audit (reduced-motion check, exit animations, memory leak prevention).

## Absolute Motion Enforcement Rules

1. **Hardware Acceleration**: Only animate `transform` (translate, scale, rotate) and `opacity`.
2. **Custom Easing**: Explicitly define custom curves (e.g., `power3.out`). Never use generic `ease-in-out`.
3. **Scroll-Jacking Restraint**: Scroll-jacking MUST be attached to a defined start and end point. Infinite scrolling traps are forbidden.
4. **Cleanup**: Every component that mounts a timeline/listener MUST explicitly kill it on unmount.
