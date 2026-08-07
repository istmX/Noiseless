---
name: istm-design
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion, GenerateImage
description: "The core visual context engine and executor for the @istmx/skills framework. Extends design tokens (colors, typography, spacing, standard motion) and strictly enforces premium UI aesthetics via a 3-Phase dual-mode execution (Structure, Analyze, Generate). Excludes heavy GSAP animation unless explicitly mandated."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->
Write everything this skill produces, files and messages alike, in plain simple language. Keep technical terms that carry real meaning; explain each in plain words. Never use a dash or a hyphen as punctuation: no em dash, no en dash, and no hyphenated compounds. Write `read only`, not `read-only`. Say it in simple words, or reword the sentence. Code, file paths, command flags, and values other skills match on keep their hyphens. Use short sentences, commas, or parentheses. Clear beats clever.
<!-- OUTPUT-STYLE:END -->

## What this skill does

The master visual token engine and dual-mode executor. It compiles the design system, enforces typography scaling, reverse-engineers screenshots/URLs into JSON profiles, and physically writes implementation code.

- **Dual-Mode Execution**:
  - **Context Phase (Day Zero)**: Operates as an architect. Uses the extraction engine to generate blueprints (`design.md`, `ui-tokens.md`) in `.istm-context/`. Pauses for the **Discovery Gate** (asks the user to confirm/adjust tokens before saving).
  - **Execution Phase (Day-to-Day)**: Operates as an executor. If asked to "create a landing page", it bypasses blueprint generation, reads `.istm-context/`, asks for preview preferences, and writes the final React/Next.js code directly without needing `/istm-develop`.
- **The 3-Phase Design Engine**:
  - 1. **Structure**: Surfacing the full schema (System, Style, Effects).
  - 2. **Analyze**: Pulling tokens from reference images or URLs to generate a JSON profile.
  - 3. **Generate**: Applying the profile to write faithful UI implementation code.
- **Anti-Slop Enforcement**: Explicitly forbids generic AI UI slop (e.g., plain blue buttons, unstyled default fonts, emoji placeholders). Forces the use of curated semantic tokens and professional iconography.

Does not build system architecture (/istm-architecture owns that) or wire complex databases (/istm-system-design owns that).

## Blueprint file convention

Durable design context lives in the `.istm-context/` directory. This skill specifically owns the hydration and enforcement of:

- `design.md`: The UX strategy, standard motion logic, and strict UI token dictionary.

**GOLD STANDARD REFERENCE:** When creating a new `design.md`, you MUST read and use the workspace root `/workspaces/laughing-giggle/DESIGN.md` as your structural template. Your output must match its level of detail: including comprehensive YAML frontmatter followed by deep philosophical markdown explaining the rules.

## Scope

The `--force-gsap` flag overrides the standard motion rule and allows basic GSAP imports. With no argument, the `Pre-flight` signals below route to Phase 0 (ambiguous), Phase 1 (greenfield token generation), or Phase 3 (code execution).

## Acts vs asks

In the **Context Phase**, ask aesthetic questions (brand vibe, dark/light mode preference) or ask for a URL/screenshot to reverse-engineer. Always pass the **Discovery Gate** by asking the user to confirm the extracted tokens before saving `design.md`. 
In the **Execution Phase**, act immediately to write the code based on `.istm-context/`.

## Execution

The main thread compiles the design system or writes code. 

### `Pre-flight` (main thread does this before anything else)

Gather signals to determine the execution path:

1. Flag check: Was `--force-gsap` provided?
2. Intent check: Did the user ask to "extract", "analyze", "setup design", or did they ask to "build", "create", "design this page"?
3. Context files: Is `design.md` already hydrated in `.istm-context/`? 

### The 3-Phase Engine

- **Step 0 (Mandatory Reading)**: Before suggesting any design or generating files, you MUST recursively read all rule files inside `istm-design/colors/`, `istm-design/styles/`, `istm-design/typography/`, `istm-design/ux/`, and `istm-design/references/`. 

- **Phase 1: Structure (Schema Definition)**: Read `references/schema.md`. Present the 3-dimension structure (Design System, Design Style, Visual Effects) if the user asks for the design structure.
- **Phase 2: Analyze (Reverse Engineering)**: If the user provides a URL or image, analyze it visually. Map color palettes, typography classes, spacing density, layout grids, and visual effects into a JSON profile. **Discovery Gate:** Ask "Want to adjust any values before I lock this into `design.md`?"
- **Phase 3: Generate (Implementation)**: If the user asks to build UI components, read `.istm-context/design.md` and `references/generation-guide.md`. Convert tokens to CSS variables/Tailwind classes, fetch assets, and implement the design faithfully.

### Absolute Aesthetic Enforcement Rules

1. **Typography Supremacy**: Never use browser default fonts. Explicitly define a sans-serif and optionally a display font. Enforce a strict typographic scale.
2. **Semantic Colors Over Hex Codes**: Forbid direct use of raw hex codes in UI. Force the use of semantic tokens.
3. **Micro-Interactions**: Enforce standard hover states on all interactive elements.
4. **No Emojis**: Strictly forbid emojis in UI. Mandate professional SVG icons (Lucide, Phosphor).
5. **No GSAP Default**: Standard motion relies on CSS/Framer Motion. Heavy scroll-jacking is forbidden unless `/istm-animate` or `/istm-awwward-designer` is explicitly invoked.
