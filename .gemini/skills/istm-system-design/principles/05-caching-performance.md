# Caching & Performance

This document outlines when and how to implement performance optimizations.

## 1. The MVP Rule (No Premature Optimization)
**The AI Rule:** Do NOT introduce Redis, Memcached, or complex caching layers into an MVP or prototype unless strictly required by the domain (e.g., a high-frequency trading dashboard). A properly indexed PostgreSQL database can handle massive throughput without a caching layer.

## 2. In-Memory Caching (Redis)
**When to use:**
- When read volume severely outweighs write volume.
- Computing expensive aggregations (e.g., a viral leaderboard).
- Storing ephemeral state (e.g., rate-limiting counters, active WebSockets).
**The AI Rule:** If caching is justified, always implement a strict Cache Invalidation strategy (TTL, or event-driven purges). 

## 3. Content Delivery Networks (CDNs)
**When to use:**
- Serving static assets (images, fonts, CSS/JS bundles).
**The AI Rule:** Always put a CDN (Cloudflare, Vercel Edge, AWS CloudFront) in front of static assets. This is a zero-cost optimization that should be default.

## 4. Browser & HTTP Caching
**The AI Rule:** Utilize `Cache-Control` headers for API responses that do not change frequently. Use `stale-while-revalidate` patterns for non-critical dashboard data to make the UI feel instantaneous.
