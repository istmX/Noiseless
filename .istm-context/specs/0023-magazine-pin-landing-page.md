# The Magazine Pin (Awwwards Level Execution)

## Visual Thesis
The landing page becomes a digital editorial. The layout uses high-contrast typography and precise grid alignment. The hero section is dominated by a massive, high-quality photograph that acts as the physical anchor for the page. 

## Interaction Mechanics
1. **Lenis Smooth Scroll**: We hijack native scrolling to introduce physical momentum. The page glides and settles with inertia (duration 1.2s, smoothTouch: false).
2. **The Pin (ScrollTrigger)**: The hero photograph pins to the background. As the user scrolls, the hero text block moves up, and the subsequent page content slides *over* the pinned photograph, like a physical page turning or sliding over another in a magazine.
3. **DOM Strictness**: The parallax and pinning rely purely on `transform` and `position: fixed` or `pin: true` in ScrollTrigger. Layout properties are never animated.
4. **Cleanup Strictness**: Lenis and GSAP instances are strictly destroyed on unmount to prevent memory leaks and React double-invocation bugs.

## Execution Requirements
- Next.js Client Component `useGSAP` boundary.
- GSAP `ScrollTrigger` plugin.
- `@studio-freight/lenis` smooth scroll wrapper.
- Reduced motion check bypasses all pinning and Lenis initialization.
