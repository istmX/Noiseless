---
name: istm-craft
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "Run /istm-craft to design and architect a new feature. It strictly reads the global .istm-context/ blueprints and generates a detailed build spec in .istm-context/specs/, perfectly adhering to the established UI tokens, motion logic, and system constraints."
---


## Documentation & URL Handling
- **Bleeding-Edge Frameworks**: If the user provides a URL to official documentation in their prompt (e.g., Next.js 16 updates, Langchain docs), you MUST use your web reading tools to fetch and read that URL before writing any code.
- **Override Training Data**: The syntax and patterns found in the provided URLs absolutely override your internal training data.
- **Cache for the Future**: If you learn a critical breaking change from a URL, document it in a markdown file inside `.istm-context/docs/` (create the folder if it doesn't exist) so you and other agents can reference it in future sessions without re-fetching.
- **When in Doubt**: If you are building with a framework and are unsure about the latest syntax, ask the user to provide the official documentation link.

## What this skill does

This is the Day-to-Day Feature Architect. When the engineer requests a new feature, `/istm-craft` interviews them, weighs the options, and writes a detailed feature specification into `.istm-context/specs/`. 

Unlike standard AI generation, `/istm-craft` is strictly bound to the project's global blueprints. It enforces the pre-existing design tokens, motion logic, and architecture.

## Execution Flow

### Step 1: The Context Lock
Before asking any questions, you MUST silently read the global blueprints to understand the constraints you are working under:
- Read `.istm-context/.istm-context/architecture.md` (for the database, backend, and API constraints).
- Read `.istm-context/.istm-context/design.md` (for typography, color tokens, and the Dual Motion standard).
- Read `.istm-context/project-overview.md` (for business logic context).

### Step 2: The Hyper-Focused Interview
Ask the engineer targeted questions to design ONE specific feature. 
- **CRITICAL RULE (One Spec At A Time)**: You must refuse to design multiple features simultaneously. If the user asks for a dashboard, auth, and billing, you must say: *"I am writing the Auth spec first. We will write the Dashboard spec after Auth is built."*
- INFER what you can from the global blueprints. 
- ASK for business requirements and edge cases.

### Step 3: Spec Generation
Write the feature design into a new file: `.istm-context/specs/NNNN-feature-name.md`.
The spec must include:
- **Summary & Requirements**: What the feature does and acceptance criteria.
- **Step 1: Global Setup (CSS & Layouts)**: The very first step of the Build Plan must dictate setting up the global CSS (`globals.css` or `index.css`) with the design tokens, fonts, and configuring the root layout wrapper (`layout.tsx`).
- **UI & Architecture**: 
  - How it implements `.istm-context/design.md`. 
  - **Component Rule**: It is perfectly acceptable to use `shadcn/ui` components (do not hardcode everything from scratch), but they MUST be styled using the `design.md` tokens.
- **Strict Typing & Constants**: Explicitly mandate that all types go in a dedicated `types/` folder, and constants go in a `constants/` folder. Absolutely forbid the use of `any` types.
- **Build Plan**: The step-by-step implementation guide.

### Step 4: Completion
Do not write application code. Once the spec is written, instruct the user to run `/istm-develop` (or equivalent) to begin the implementation phase based on your spec.
