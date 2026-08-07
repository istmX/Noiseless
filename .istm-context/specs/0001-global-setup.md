# Spec 0001: Global CSS Setup, shadcn/ui Init, and Root Layout

## Summary

This is the foundation spec. Before any feature can be built, the global CSS tokens must
be wired and the root layout must be configured. Every subsequent spec depends on this.

Nothing in this spec involves feature logic, database calls, or components beyond the
bare minimum shell. The output is a working Next.js app that boots with our design tokens
applied, our four fonts loaded, dark mode active by default, and shadcn/ui installed and
wired to our token palette.

---

## Acceptance Criteria

- `globals.css` contains all CSS custom properties from `.istm-context/design.md` (both dark and light mode).
- `globals.css` has an `@theme inline {}` block that bridges our tokens into shadcn expected variable names.
- `layout.tsx` loads four Google Fonts via `next/font/google` with CSS variable names matching `design.md`.
- The `<html>` element defaults to `data-theme="dark"`.
- An inline `<script>` in `<head>` reads `localStorage` on first paint to prevent light mode flash.
- `shadcn/ui` is initialised in `app/` with Tailwind v4 compatibility. No `tailwind.config.js` is created.
- App metadata: title is "Autonomous Research Analyst", description reflects the product.
- Tailwind v4 `@import "tailwindcss"` is the only Tailwind directive. No `@tailwind base/components/utilities`.
- No Geist font references remain anywhere.
- No hardcoded colors remain in `globals.css` outside the token definitions.
- The app compiles without TypeScript errors.

---

## Architecture Constraints (from `.istm-context/architecture.md`)

- Framework: Next.js 16 App Router. `layout.tsx` is a React Server Component (no `"use client"`).
- Styling: Tailwind CSS v4. No `tailwind.config.js`. All theme config lives in `globals.css`.
- Components: shadcn/ui built on Radix UI. Installed into `app/shared/components/ui/`.
- TypeScript strict mode. No `any` types. No type assertions without justification.

---

## Design Constraints (from `.istm-context/design.md`)

### Fonts

Four fonts. Each mapped to a CSS variable.

| CSS Variable    | Font             | Weights   | Role                                     |
|-----------------|------------------|-----------|------------------------------------------|
| `--font-display`| Playfair Display | 600, 700  | H1 page titles only                      |
| `--font-sans`   | Space Grotesk    | 400,500,600| UI chrome: nav, buttons, chips          |
| `--font-data`   | Inter            | 400, 500  | Body copy, metadata, form text           |
| `--font-mono`   | JetBrains Mono   | 400       | Scores, timestamps, IDs, URLs            |

### Color Tokens

Both modes use CSS custom properties on `[data-theme="dark"]` and `[data-theme="light"]`.
A neutral fallback with dark values lives on `:root` to prevent any flash of unstyled content.

### shadcn Semantic Bridge

shadcn components reference their own variable names: `--background`, `--foreground`, `--primary` etc.
These must be mapped inside `@theme inline {}` to point to our design tokens.
See `.istm-context/docs/shadcn-tailwind-v4.md` for the full mapping pattern.

---

## File Changes

### 1. `app/app/globals.css` (full replacement)

Structure (in order):

```
Section 1: @import "tailwindcss";

Section 2: :root {} fallback block
  Contains all dark-mode token values as fallback.
  Prevents white flash before the inline JS script fires.

Section 3: [data-theme="dark"] {}
  All dark mode tokens from design.md Part 2.

Section 4: [data-theme="light"] {}
  All light mode tokens from design.md Part 2.

Section 5: @theme inline {}
  Bridges our tokens into shadcn/Tailwind semantic variable names.
  Full bridge:
    --color-background:         var(--color-canvas)
    --color-foreground:         var(--color-ink)
    --color-card:               var(--color-surface)
    --color-card-foreground:    var(--color-ink)
    --color-popover:            var(--color-surface-elevated)
    --color-popover-foreground: var(--color-ink)
    --color-primary:            var(--color-primary)
    --color-primary-foreground: var(--color-on-primary)
    --color-secondary:          var(--color-surface-elevated)
    --color-secondary-foreground: var(--color-ink)
    --color-muted:              var(--color-surface-elevated)
    --color-muted-foreground:   var(--color-ink-muted)
    --color-accent:             var(--color-primary-soft)
    --color-accent-foreground:  var(--color-ink)
    --color-destructive:        var(--color-danger)
    --color-destructive-foreground: #ffffff
    --color-border:             var(--color-hairline)
    --color-input:              var(--color-hairline)
    --color-ring:               var(--color-primary)
    --radius:                   6px
    --font-sans:                var(--font-sans)
    --font-mono:                var(--font-mono)

Section 6: body {}
  background-color: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-data);

Section 7: Global animations
  @keyframes agent-pulse (from design.md)
  .status-dot--running { animation: agent-pulse 1.8s ... }
  @keyframes fade-up (from design.md)
  .finding-card { animation: fade-up ... }

Section 8: prefers-reduced-motion override
  @media (prefers-reduced-motion: reduce) { disable all animations }
```

All token values come verbatim from `.istm-context/design.md` Part 2. No raw hex codes outside the
token definition blocks.

### 2. `app/app/layout.tsx` (full replacement)

Key points:

- Import four fonts from `next/font/google`:
  `Playfair_Display`, `Space_Grotesk`, `Inter`, `JetBrains_Mono`
- Each font is initialized with `subsets: ["latin"]` and `variable` set to its CSS variable name.
- The `<html>` element receives:
  - `lang="en"`
  - `data-theme="dark"` as the SSR default attribute
  - `suppressHydrationWarning` to allow the inline JS to mutate `data-theme` without React mismatch
  - `className` joining all four font variable class names plus `"h-full antialiased"`
- An inline `<script>` in `<head>` (dangerouslySetInnerHTML, runs synchronously before paint):
  ```js
  try {
    const t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
  ```
- `<body>` gets `className="min-h-full flex flex-col"`.
- Metadata export:
  - `title`: `"Autonomous Research Analyst"`
  - `description`: `"Monitor topics, industries, and competitors with an autonomous AI research agent."`
- Component signature: `RootLayout({ children }: { children: React.ReactNode })`
- No `"use client"` directive.

---

## Build Plan (for `/istm-develop` to execute in order)

### Step 1: Run shadcn init

```bash
cd /workspaces/Noiseless/app
npx shadcn@latest init --defaults
```

If the CLI is interactive (no `--defaults` flag available), answer:
- Style: Default
- Base color: Neutral
- CSS variable: Yes

After init verify `components.json` exists. Open it and confirm:
- `tailwind.css` points to `app/globals.css`
- `aliases.components` points to `@/shared/components/ui` or update it manually

### Step 2: Write `globals.css`

Overwrite `app/app/globals.css` completely following Section structure above.
Token values come from `.istm-context/design.md` Part 2.
Place `@theme inline {}` after the token blocks so variables are already defined when it resolves them.

### Step 3: Write `layout.tsx`

Overwrite `app/app/layout.tsx` completely following the spec above.
The inline theme script must run before hydration. Use `dangerouslySetInnerHTML` on a `<script>` tag.
All four fonts loaded and injected as CSS variables.
No `"use client"` directive anywhere in this file.

### Step 4: Verify compilation

```bash
cd /workspaces/Noiseless/app
npm run dev
```

Confirm:
- No TypeScript errors in terminal.
- Page background is `#0A0A0A` in browser.
- Browser DevTools shows the four font CSS variables on `:root`.
- shadcn `--background` resolves to `#0A0A0A` in dark mode.

### Step 5: Update progress.md

Mark `Spec 0001: Global Setup` as complete in `/workspaces/Noiseless/progress.md`.

---

## Types

No new TypeScript types in this spec. Layout prop type is inline: `{ children: React.ReactNode }`.
Future specs will define types in `app/shared/types/index.ts`.

## Constants

No new constants in this spec.
Future specs will define route constants in `app/shared/lib/constants.ts`.

---

## Notes

- shadcn `components.json` may default component output to `components/ui`. Update to
  `shared/components/ui` to match the folder structure in `.istm-context/agents.md`.
- The `@theme inline {}` block is a Tailwind v4 only pattern. It does not exist in v3.
  Do not create `tailwind.config.js`.
- shadcn variable `--radius` is set to `6px` matching our `--radius-md`.
  All shadcn components use `rounded-[var(--radius)]` so they inherit our default shape.
- Never add `"use client"` to `layout.tsx`. Font loading and metadata export require a Server Component.
- `suppressHydrationWarning` on `<html>` is required because the inline script mutates `data-theme`
  client-side, which differs from the SSR-rendered `data-theme="dark"` attribute.
