# Testing Strategy

This document outlines the testing pyramid and expectations for code quality.

## 1. End-to-End (E2E) Testing (Playwright / Cypress)
**When to use:**
- Testing critical user journeys (e.g., Sign Up, Checkout, Password Reset).
**The AI Rule:** E2E tests provide the highest ROI for MVPs and startups. Recommend writing E2E tests for the "happy paths" of the core business logic before investing heavily in unit tests.

## 2. Integration Testing
**When to use:**
- Testing API endpoints, database mutations, and external webhooks.
**The AI Rule:** Ensure integration tests hit a real database (e.g., a test PostgreSQL container) rather than relying exclusively on mocking, as mocked DB tests often miss constraint failures.

## 3. Unit Testing (Vitest / Jest)
**When to use:**
- Testing pure functions, complex algorithms, and isolated UI components (using React Testing Library).
**The AI Rule:** Do not mandate 100% test coverage. Focus unit tests on highly complex business logic (e.g., pricing calculators, date/time logic) rather than testing simple React component renders.
