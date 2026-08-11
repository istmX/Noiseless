# Spec: Landing Page Responsive Overhaul

## Summary & Requirements
The landing page must gracefully adapt to mobile and tablet viewports without sacrificing the premium aesthetic. 
- **Hero Pin**: The GSAP Magazine Pin effect will be disabled on viewports smaller than `md` (`768px`) to prevent vertical constraint issues. Content will stack naturally.
- **Navigation**: The desktop inline links will be replaced with a slide-out hamburger menu on mobile.
- **Typography**: The massive hero headline (`text-7xl`) will aggressively scale down to `text-5xl` to fit 2-3 lines comfortably on narrow screens.
- **Grid Stacking**: Features, Pipeline Steps, Testimonials, and Pricing cards will shift from multi-column grids to single columns on mobile, ensuring readability.

## Step 1: Global Setup (CSS & Layouts)
The `globals.css` file must contain the core responsive typography variables. No custom arbitrary viewport units should be scattered in the code. We rely on Tailwind's native `md:` and `lg:` breakpoints. 
- Ensure `layout.tsx` enforces `overflow-x-hidden` to prevent horizontal scrolling breaks during mobile animations.

## UI & Architecture
- **Design Tokens**: Mobile padding will use standard token spacing (`px-4` or `px-6`). The hamburger menu will utilize the `bg-canvas/95` and `backdrop-blur-sm` tokens for a native glass feel.
- **Motion**: `matchMedia("(min-width: 768px)")` will be used within `useGSAP` to conditionally apply the `ScrollTrigger.create({ pin: true })` logic.

## Strict Typing & Constants
- **Types**: Any state interfaces (e.g., mobile menu toggles) must be strictly typed inline or in a `types/` module. `any` is strictly forbidden.
- **Constants**: Navigation link arrays (`NAV_LINKS`) must remain centralized at the top of the file or in a dedicated `constants/` file.

## Build Plan

1. **Refactor Navigation (Mobile Menu)**:
   - Add a `useState` hook for `mobileMenuOpen` in `LandingPage.tsx`.
   - Add a Lucide `Menu` icon button visible only on `flex md:hidden`.
   - Build a full-screen or slide-down absolute positioned overlay containing the `NAV_LINKS` that toggles via the state.

2. **Conditional GSAP Pinning**:
   - Update the `useGSAP` hook in `LandingPage.tsx` to read `window.matchMedia("(min-width: 768px)").matches`.
   - Only initialize the `.hero-panel` ScrollTrigger pin if the viewport is `md` or larger. Otherwise, let it scroll naturally.

3. **Typography & Layout Scaling**:
   - Update the Hero headline to `text-5xl md:text-7xl`.
   - Ensure Feature cards and Pricing cards use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` where appropriate to stack cleanly on mobile.
   - Adjust horizontal paddings on the footer and testimonial sections to `px-6` for tight mobile screens.

4. **Audit Mobile Scroll**:
   - Verify `overflow-x-hidden` is strictly maintained so the GSAP parallax and magnetic buttons do not cause horizontal layout shifts on touch devices.
