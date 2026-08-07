# SEO & Web Vitals

This document enforces rules for search engine optimization and perceived performance.

## 1. Rendering Strategies (SSR vs SSG vs CSR)
**The AI Rule:** 
- **Static Site Generation (SSG):** Use for marketing pages, blogs, and content that changes infrequently. This provides the best SEO and performance.
- **Server-Side Rendering (SSR):** Use for highly dynamic public pages where SEO is critical (e.g., a real-estate listing page).
- **Client-Side Rendering (CSR):** Use for gated, authenticated dashboards where SEO does not matter.

## 2. Core Web Vitals (LCP, FID, CLS)
**The AI Rule:** 
- Always define explicit `width` and `height` attributes on images to prevent Cumulative Layout Shift (CLS).
- Use modern image formats (`WebP`, `AVIF`) and lazy-load images below the fold to improve Largest Contentful Paint (LCP).
- Defer non-critical third-party scripts (e.g., analytics) to prevent main-thread blocking.

## 3. Meta Data & Open Graph
**The AI Rule:** Any public-facing route MUST have dynamic `<title>`, `<meta name="description">`, and Open Graph (`og:image`) tags to ensure social sharing links unfurl correctly.
