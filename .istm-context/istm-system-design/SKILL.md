---
name: istm-system-design
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "The backend and architectural orchestrator for the @istmx/skills framework. Owns database schema design, API routing, ORM logic, and infrastructure planning. Applies Smart Defaults (e.g. relational DBs for standard apps) and strictly enforces security best practices."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->
Write everything this skill produces, files and messages alike, in plain simple language. Keep technical terms that carry real meaning; explain each in plain words. Never use a dash or a hyphen as punctuation: no em dash, no en dash, and no hyphenated compounds. Write `read only`, not `read-only`. Say it in simple words, or reword the sentence. Code, file paths, command flags, and values other skills match on keep their hyphens. Use short sentences, commas, or parentheses. Clear beats clever.
<!-- OUTPUT-STYLE:END -->

## What this skill does

The master backend orchestrator: compiles database schemas, API routes, and system architecture logic.

- Database & Schema: Selects the appropriate database (SQL vs NoSQL), designs the schema structure, and defines ORM models (Prisma, Drizzle, etc.).
- API Architecture: Defines the API layers (REST, GraphQL, tRPC, Server Actions) and strict data validation rules (Zod).
- Security & Infrastructure: Enforces authentication flows, rate limiting, and caching layers (Redis) only when mathematically justified by the scale.

Does not write UI code (/istm-design owns that), or build animation timelines (/istm-animate owns that).

## Blueprint file convention

Durable backend context lives in the `.istm-context/` directory. This skill specifically owns the hydration and enforcement of:

- `architecture.md`: The system design, database models, and API flows.

Never overwrite an existing `architecture.md` without permission; gap-fill conservatively.

## Scope

The `--stack` flag forces a specific backend technology (e.g., `--stack=supabase`). With no argument, the `Pre-flight` signals below route to Phase 0 (ambiguous), or Phase 1 (greenfield backend generation).

## Acts vs asks

Phase 1 asks architectural questions (scale, read vs write heavy, auth requirements) via MCQ before generating the backend blueprints. Phase 2 acts immediately; it scans the repo for existing `schema.prisma`, `drizzle.config.ts`, or backend folders, and reverse-engineers the system design.

## Artifact ownership

The `architecture.md` file holds the content. Create it if missing. When writing the backend rules, inject precise table names, relationships, and API endpoint definitions. You own the enforcement of this schema; all data fetching and mutations must adhere to these models.

## Execution

The main thread compiles the backend system. 

### `Pre-flight` (main thread does this before anything else)

**CRITICAL STEP:** Before analyzing any prompts, you MUST read the exact architectural constraints defined in the `principles/` directory of this skill. This includes `01-architecture-patterns.md`, `02-database-selection.md`, and all other core rulebooks. You must strictly enforce these heuristics (e.g., forbidding Microservices for MVPs, demanding Zod validation, etc.).

Gather signals to determine the execution path:

1. Flag check: Was a specific stack requested? → `STACK_FLAG`.
2. Context files: Is `architecture.md` already hydrated in `.istm-context/`? → `ARCHITECTURE_EXISTS`.
3. Source count: Are ORM schemas (`prisma/`, `drizzle/`) or backend frameworks present? → `HAS_BACKEND`.

Pick the phase based on these signals:

| Condition | Phase |
|---|---|
| `HAS_BACKEND` is present | Phase 2 (Reverse-engineer the existing backend architecture). |
| `ARCHITECTURE_EXISTS` | Phase 3 (Gap-fill: analyze the prompt against existing schemas and update only what changed). |
| No flag, no architecture logic (or raw prompt) | Phase 1 (Greenfield: execute Architecture Interview and generate schemas). |
| No flag, no architecture logic, but `HAS_BACKEND` | Phase 0 (Ambiguous: ask if they want to override existing schemas or document them). |

### Route to the selected phase

- Phase 1 (Greenfield Setup): Evaluate the domain data needs. Interview the user on scale and auth. Apply Smart Defaults (e.g., PostgreSQL + Prisma/Drizzle for 90% of standard apps). Generate a comprehensive `architecture.md` with explicit schema relationships.
- Phase 2 (Reverse Engineering): Do not interview. Read schema files and API directories. Reverse-engineer the active data models and endpoints. Hydrate `architecture.md`.
- Phase 3 (Gap Fill): Read existing `architecture.md`. Identify missing models or API routes based on new feature requests. Update blueprints carefully.

### Phase 0: Classify (only when `pre-flight` is ambiguous)

Don't guess. Ask once via your agent's interactive option picker (`AskUserQuestion`), or plain text. 
- question: "I see existing backend schemas, but no `architecture.md` blueprint. How should I proceed?"
- header: "Backend state"
- options: 1. `Reverse-Engineer from Code`, "I will read your schemas and generate the architecture blueprint." → Phase 2. 2. `Start Fresh from Prompt`, "I will interview you and overwrite the system design." → Phase 1.

### After all phases

If no schemas were written when they should have been, report the failure. Relay the report: what DB was chosen, what ORM was locked in, and the core authentication strategy.

## Absolute Architectural Enforcement Rules

1. **Smart Defaults**: Unless explicitly overridden by the user, assume a relational database (PostgreSQL). Do not introduce Redis, Kafka, or microservices for an MVP.
2. **Type Safety**: End-to-end type safety is mandatory. All APIs must validate incoming data using a schema validation library (e.g., Zod) before touching the database.
3. **No Direct UI DB Calls**: Never call the database directly inside a UI component. Abstract data fetching into dedicated Server Actions, API routes, or custom hooks.
4. **Relationship Enforcement**: Clearly define 1:1, 1:N, and N:M relationships in the blueprint. Enforce foreign key constraints and cascading deletes where appropriate.
