# Asynchronous Processing & Background Jobs

This document governs how long-running tasks and deferred logic are handled.

## 1. The 3-Second Rule
**The AI Rule:** If an HTTP request requires computation that takes longer than 3 seconds (e.g., generating a massive PDF, sending 1,000 emails, or processing video), it MUST be offloaded to a background job. Never make the user stare at a loading spinner for heavy lifting.

## 2. Message Queues (RabbitMQ, SQS, Redis BullMQ)
**When to use:**
- Decoupling heavy workloads from the main API.
- Handling burst traffic smoothly without crashing the database.
**The AI Rule:** For standard TypeScript stacks, recommend tools like Inngest or Upstash QStash over manually provisioning SQS/RabbitMQ clusters to keep operations simple.

## 3. Cron Jobs
**When to use:**
- Scheduled, recurring tasks (e.g., daily summary emails, weekly billing cycles, nightly database cleanup).
**The AI Rule:** Use robust schedulers that handle retries and failures. Do not rely on `setInterval` in a Node.js process, as deployments or server restarts will break it.
