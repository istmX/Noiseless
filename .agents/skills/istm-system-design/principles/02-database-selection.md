# Database Selection & Schema Design

This document outlines the heuristics for choosing the correct database engine and designing schemas.

## 1. Relational Databases (SQL - PostgreSQL, MySQL)
**When to use:** 
- The absolute default for almost all software. 
- When data is structured and has clear relationships (e.g., Users → Posts → Comments).
- Financial transactions where ACID compliance is non-negotiable.
**The AI Rule:** **Default to PostgreSQL.** Use modern serverless options (Supabase, Neon, Vercel Postgres) for rapid MVP development. Always enforce Foreign Keys and cascading deletes.

## 2. Document Databases (NoSQL - MongoDB, Firebase)
**When to use:** 
- Rapid prototyping where the schema changes daily.
- Highly unstructured or nested JSON data (e.g., user-defined dynamic forms, game state saves).
**The AI Rule:** Do not default to MongoDB just because it is "easier to set up." Only use it if the data is genuinely unstructured. 

## 3. Key-Value Stores (Redis, Memcached)
**When to use:** 
- Caching frequent, heavy queries.
- Managing session state or rate limiting.
**The AI Rule:** Do NOT use Redis as a primary data store. 

## 4. Time-Series Databases (TimescaleDB, InfluxDB)
**When to use:**
- High-frequency data ingestion (IoT sensors, stock market ticks, server monitoring logs).
**The AI Rule:** Only recommend if the core feature is charting/analyzing chronological data streams.

## 5. Schema Design Rules (LLD)
- **Primary Keys:** Default to `CUID` or `UUID` over auto-incrementing integers to prevent ID enumeration attacks.
- **Timestamps:** Every table must have `createdAt` and `updatedAt` columns.
- **Soft Deletes:** Prefer an `isDeleted` boolean over hard deleting data for critical entities (like Users or Invoices).
