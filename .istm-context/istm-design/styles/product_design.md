# Product Design and Design Token Principles

Product design is the practice of shaping how a product works, feels, and fits into people's lives, sitting at the intersection of user needs and business goals.

---

## Core Product Design Principles

### 1. User-Centered Design
* **Mental Models**: Build around how people actually think and work, including their goals, mental models, and the constraints they navigate daily.
* **Identify Problems, Not Solutions**: Users describe solutions, not problems, because that's how they express friction. The designer's job is to trace requests back to the root need and understand what is actually broken before deciding what to build.
* **Continuous Connection**: User needs evolve and context shifts, requiring ongoing feedback loops.

### 2. Functionality Over Polish
* **Interaction Quality First**: A product can be visually stunning and still fail if the interactions are broken. Get the interaction pathways right first.
* **Role of Aesthetics**: Aesthetics build trust and affect how accessible something feels, but pretty design on top of broken interactions is just an attractive problem.

### 3. Consistency and Coherence
* **Predictable Patterns**: Consistency means users can carry what they learn from one part of the product to another. Predictable patterns and clear language reduce cognitive load and build trust.
* **Coherence**: Coherence is whether the pieces feel connected and reflect the same underlying values, avoiding the feeling that the product was built by isolated teams.
* **Scale**: Prevent teams from reinventing patterns using shared components and shared design decisions (a design system).

### 4. Collaboration & Iteration
* **Cross-functional context**: Bring developers into user conversations early and involve PMs in design exploration.
* **Iteration**: Ship to learn, not ship to move on. Gather user feedback, behavior logs, and support metrics to continuously refine designs.

---

## Design Token Hierarchy
Design tokens are named, reusable logic-based values that store design decisions. They connect static design files directly to production code.

```text
[ Raw Value: #0D99FF ]
        ↓
[ Primitive Tokens: blue-500 ] (Raw values, constants)
        ↓
[ Semantic Tokens: action-color ] (Intent-based, describing the role)
        ↓
[ Component Tokens: button-primary-bg ] (Component-specific execution)
```

### 1. Primitive Tokens
* **What they do**: Store raw values (colors, spacing scales, font sizes) without any context of where they get used.
* **Example**: `blue-500`, `spacing-16`, `font-size-lg`.
* **Purpose**: Act as system constants that rarely change.

### 2. Semantic (Alias) Tokens
* **What they do**: Map raw values to names describing their role in the interface.
* **Example**: `action-color`, `surface-background-primary`, `border-hairline`.
* **Purpose**: Prevent having to update every individual component when a primitive changes. The naming describes intent.

### 3. Component Tokens
* **What they do**: Map directly to individual UI elements.
* **Example**: `button-primary-bg`, `card-border-radius`, `input-padding-y`.
* **Purpose**: Describe execution, giving precise control when a specific component needs to deviate from system defaults.
