# shadcn/ui with Tailwind CSS v4 — Critical Notes

Cached from: https://ui.shadcn.com/docs/tailwind-v4
Date: 2026-08-07

## Breaking Changes vs Tailwind v3

1. **No tailwind.config.js** — All theme config lives in globals.css using `@theme inline {}`.
2. **CSS variable syntax changed** — Tailwind v4 reads design tokens directly from CSS variables
   inside an `@theme inline {}` block, not from a JS config object.
3. **shadcn init command** — Run `npx shadcn@latest init` inside the Next.js app directory.
   The CLI detects Tailwind v4 automatically and writes the correct CSS variable format.
4. **Component registry** — Add components with `npx shadcn@latest add <component>`.
5. **Dark mode** — shadcn v4 uses `.dark` class on `<html>` for dark mode by default.
   Our project uses `data-theme="dark"` instead. We bridge via a CSS selector override.

## Token Bridging Pattern (Tailwind v4)

shadcn components reference tokens like `--background`, `--foreground`, `--primary` etc.
In Tailwind v4 these are surfaced in the `@theme inline {}` block.
Our design system defines its own tokens (`--color-canvas`, `--color-ink`, etc.).
The bridge maps our tokens into shadcn's expected variable names.

```css
/* In globals.css */
@theme inline {
  /* Bridge our tokens into Tailwind/shadcn semantic names */
  --color-background:        var(--color-canvas);
  --color-foreground:        var(--color-ink);
  --color-card:              var(--color-surface);
  --color-card-foreground:   var(--color-ink);
  --color-primary:           var(--color-primary);
  --color-primary-foreground: var(--color-on-primary);
  --color-muted:             var(--color-surface-elevated);
  --color-muted-foreground:  var(--color-ink-muted);
  --color-border:            var(--color-hairline);
  --color-input:             var(--color-hairline);
  --color-ring:              var(--color-primary);
  --color-destructive:       var(--color-danger);
  --color-destructive-foreground: #ffffff;
  /* Fonts */
  --font-sans:  var(--font-sans);
  --font-mono:  var(--font-mono);
}
```

## Dark mode class override

shadcn generates `.dark` class selectors. We use `[data-theme="dark"]`.
Override in globals.css:

```css
/* Remap .dark to our data-theme attribute */
[data-theme="dark"] {
  /* same tokens as .dark would set */
}
```

## Font loading in Next.js 16 App Router

Use `next/font/google` in layout.tsx with CSS variable injection.
Pass the variable to `<html>` className. Reference from CSS via `var(--font-display)` etc.
```tsx
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', weight: ['600','700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans', weight: ['400','500','600'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-data', weight: ['400','500'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400'] })
```
