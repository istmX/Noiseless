---
name: istm-architecture
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "Master orchestrator for the @istmx/skills framework. Intercepts raw prompts, executes a dynamic Discovery Gate based on the project domain, applies Smart Defaults, and compiles the 4 foundational blueprint files into the `.istm-context/` directory without generating generic AI slop."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->
Write everything this skill produces, files and messages alike, in plain simple language. Keep technical terms that carry real meaning; explain each in plain words. Never use a dash or a hyphen as punctuation: no em dash, no en dash, and no hyphenated compounds. Write `read only`, not `read-only`. Say it in simple words, or reword the sentence. Code, file paths, command flags, and values other skills match on keep their hyphens. Use short sentences, commas, or parentheses. Clear beats clever.
<!-- OUTPUT-STYLE:END -->

## What this skill does

The master context orchestrator: evaluates user prompts, resolves structural ambiguity, and writes the 4 Pillars of Truth that every later skill and AI tool reads.

- Greenfield (no code yet, raw prompt): executes the Discovery Gate. Analyzes the domain of the idea (e.g., transactional, real-time, content-heavy), interviews the user to fill critical gaps, applies Smart Defaults, and generates the 4 foundation templates.
- Brownfield (with `--codebase` flag): bypasses the interview entirely. Scans high-leverage structural files (`package.json`, routers, schemas), reverse-engineers the existing architecture, and writes the 4 foundation templates to document the current state accurately.
- UI & Motion Enforcement: explicitly forces the AI to extract typography, colors, and layouts from the `.istm-context/design/` and `.istm-context/animate/` tokens, absolutely forbidding hallucinated styles.

Does not create production application code (the implementation agent owns that), audit for accessibility (/audit owns that), or write the feature scope (/scope owns that).


## Folder Structure & Component Architecture

1. **Just-In-Time Scaffolding**: Never create massive folder trees upfront. Folders should only be created when a specific feature is being built.
2. **Respect Stack Conventions**: Do not blindly force a `src/app/` structure if a framework (like Next.js) already uses a root `app/` structure. Analyze the existing structure first.
3. **Private vs Public Components**: Strictly enforce Feature-Based Architecture:
   - **Public Components**: Reusable, generic UI components (buttons, inputs) belong in `shared/components/` (or `components/ui/` for shadcn).
   - **Private Components**: Components specific to a single feature (e.g., `LoginForm`) MUST stay inside that feature's directory (`features/auth/components/`).

## Blueprint file convention (The 4 Pillars)

Durable context lives in the `.istm-context/` directory. These files govern all future logic:

- `agents.md` (or `.cursorrules` / `GEMINI.md` chameleon): The operational brain holding memory loops and rules.
- `architecture.md`: The system design, database models, and API flows.
- `design.md`: The UX strategy, motion logic, and UI principles.
- `project-overview.md`: The business logic and core user journeys.

Write knowledge into these 4 files by replacing their `{variables}` with concrete decisions. Never overwrite an existing pillar without permission; gap-fill conservatively.

## Scope

The `--codebase` flag argument routes directly to Phase 2 (reverse engineering). With no argument, the `Pre-flight` signals below route to Phase 0 (ambiguous), or Phase 1 (greenfield: analyze prompt, ask questions, generate templates).

## Acts vs asks

Phase 1 asks architectural questions via MCQ before generating the templates. Phase 2 acts immediately, no questions; it scans the repo and reverse-engineers the blueprints. Phase 1 scales the questions to the project's timeline (do not ask about enterprise caching for a 2-week MVP).

## Artifact ownership

The 4 Pillar files hold the content. Create them if missing. When replacing `{variables}` in the templates, inject the precise tech stack and domain logic. If design tokens are needed, read the `design/` subfolders; you own the enforcement of these tokens, but not the tokens themselves.

## Portability (any OS, any agent)

- Commands: `git` is the only required CLI, same on every OS. Use your agent's cross-platform file tools (search, read, write) to populate templates.
- If interactive question support (`AskUserQuestion`) is missing, ask any multiple choice question as plain text with the same options.

## Execution

The main thread does the writing itself in every phase; it never hands the context writing to a subagent. Before writing, the main thread reads the foundation templates in `istm-architecture/templates/`. Its `{variables}` are the inputs you gathered in pre-flight and the question rounds; apply each as you read.

### `Pre-flight` (main thread does this before anything else)

Gather several signals to determine the execution path:

1. Flag check: Was `--codebase` provided? → `CODEBASE_FLAG`.
2. Context files: Are the 4 pillars already hydrated in `.istm-context/`? → `PILLARS_EXIST`.
3. Source count: Are there existing source files (`.ts`, `.js`, `.py`, `.go`) indicating a populated repo? → `HAS_CODE`.

Pick the phase based on these signals:

| Condition | Phase |
|---|---|
| `CODEBASE_FLAG` is present | Phase 2 (Reverse-engineer the existing codebase). |
| `PILLARS_EXIST` | Phase 3 (Gap-fill: analyze the prompt against existing blueprints and update only what changed). |
| No flag, no pillars, no code (or raw prompt) | Phase 1 (Greenfield: execute Discovery Gate and Interview). |
| No flag, no pillars, but `HAS_CODE` | Phase 0 (Ambiguous: ask if they want to bootstrap from prompt or reverse-engineer from code). |

### Route to the selected phase

- Phase 1 (Greenfield Setup): Evaluate the domain (e-commerce, real-time, etc.). Identify missing context (Auth, DB). Interview the user. Apply Smart Defaults. Hydrate templates. **CRITICAL: When generating `design.md`, analyze the user's prompt to extract their exact aesthetic vision (e.g., massive fonts, vibrant colors). Do NOT force them to pick from generic styles like minimal or brutalist.**
- Phase 2 (Reverse Engineering): Do not interview. Read `package.json`, `tsconfig.json`, and root schemas. Reverse-engineer the tech stack. Hydrate templates.
- Phase 3 (Gap Fill): Read existing blueprints. Identify what the new prompt requires. Update existing blueprints carefully.

### Phase 0: Classify (only when `pre-flight` is ambiguous)

Don't guess. Ask once via your agent's interactive option picker (`AskUserQuestion`), or plain text. 
- question: "I see an existing codebase, but no `.istm-context/` blueprints. How should I proceed?"
- header: "Project state"
- options: 1. `Reverse-Engineer from Codebase`, "I will read your files and generate the blueprints." → Phase 2. 2. `Start Fresh from Prompt`, "I will interview you and overwrite the architecture." → Phase 1.

### After all phases

If no templates were written when they should have been, report the failure. 

**CRITICAL SELF-DESTRUCT RULE**: Once Phase 1 or Phase 2 is complete and you have fully hydrated the 250-line rulebook template (`agents.md`), you MUST write that finished rulebook directly to the root harness file (e.g., `.cursorrules`, `CLAUDE.md`, `GEMINI.md`), overwriting this very orchestrator script. This orchestrator is a one-time bootstrap that consumes itself to leave behind the permanent project context.

Otherwise, relay the report: what was discovered, what templates were written, and what tech stack choices were locked in.

## Asset Strategy & Empty States

During the Phase 1 Interview, you MUST ask the user about their visual asset strategy (illustrations, custom icons, logos):
1. **Yes, they are in `src/assets/`**: Scan the directory and map the file paths into `design.md`. Empty states must use these branded assets.
2. **Yes, but I need to upload them**: Pause execution and instruct the user: *"Please upload your assets to `src/assets/`, then type 'done' so I can index them."*
3. **No, use code only**: Write a strict rule in `design.md`: *"Do NOT use image files. All UI and empty states must be built using purely CSS-driven color blocks, typography, and standard icon libraries."*

**Empty State & Iconography Rule**: 
You are strictly forbidden from using emojis in the UI or empty states. Always use proper SVG icon libraries (e.g., Lucide, Heroicons) instead of emojis. If the project has no custom assets, empty states must be constructed using elegant typography, clean spacing, a semantic icon, and a primary CTA.

## Strict Aesthetic Enforcement

When generating or referencing the blueprints, you must enforce the UI extraction process:
- **Typography & Headings**: You must explicitly read the `design/typography` rules. Extract the exact font families and the strict hierarchical scaling for headings (H1, H2, H3). 
- **Color Palettes**: Read `design/colors`. Extract the exact semantic background, surface, and ink tokens. Never hallucinate raw hex codes.
- **Motion**: Read `animate/`. You must adhere strictly to the Dual Motion Standard.
- Ensure these constraints are permanently written into the final `agents.md` memory file.
