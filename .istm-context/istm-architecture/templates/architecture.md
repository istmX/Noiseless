# Architecture

## Architecture Goals

The architecture should be:
- maintainable
- understandable
- scalable according to project constraints
- {architecture_primary_goals}

Avoid unnecessary complexity.

---

# System Overview

{system_data_flow_diagram}

---

# Tech Stack

## Frontend
- Framework: {frontend_framework}
- Styling: {styling_engine}
- State Management: {state_management}

## Backend / API
- Framework: {backend_framework}
- Database: {database_type}
- ORM/Query Builder: {orm_tool}

## Infrastructure
- Hosting: {hosting_provider}
- Deployment: {deployment_strategy}

---

# Folder Structure

{directory_structure_tree}

Each feature module must own its own:
- components
- hooks
- services
- types

Avoid giant shared folders. Maintain a strict Feature-Based Architecture.

---

# State Management Rules

Use {state_management}.

Do NOT use legacy or unnecessarily complex patterns unless explicitly required.
Keep stores focused. Avoid monolithic state objects.

---

# Data Fetching & Caching

Use {data_fetching_strategy}.

Responsibilities:
- caching
- invalidation
- async operations

Do not misuse UI state managers for server-state patterns.

---

# Authentication

Provider: {auth_provider}

Methods:
{auth_methods_list}

Authentication state must remain isolated from general application state.

---

# Core Workflows

## Workflow 1: {core_workflow_1_name}
{core_workflow_1_steps}

## Workflow 2: {core_workflow_2_name}
{core_workflow_2_steps}

---

# Performance Rules

Use:
- {performance_best_practice_1}
- {performance_best_practice_2}

Avoid:
- unnecessary re-renders
- unoptimized assets
- {performance_anti_pattern_1}

---

# Future Expansion & Scalability

{future_scalability_considerations}