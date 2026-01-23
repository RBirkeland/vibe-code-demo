# Module 6: Advanced Planning with Speckit

## What You'll Learn
- Understand when simple planning isn't enough
- Learn Spec-Driven Development and how SpecKit enables it
- Apply SpecKit's systematic workflow to complex features

---

## The Problem: Simple Planning Breaks Down

`/plan` works great for straightforward features. But what happens when you need to:

- Implement a complex, multi-file feature (authentication, state management, complex UI)
- Ensure the new code respects existing patterns and conventions
- Generate clear, task-driven work that scales to multiple agents
- Catch design problems *before* implementation starts
- Systematically verify consistency across the entire feature

Simple planning gives you steps. But it doesn't analyze your codebase, it doesn't enforce consistency, and it doesn't break work into discrete, assigned tasks.

When you try to implement complex features without this structure:
- Agents end up creating new patterns instead of following existing ones
- Different parts of the feature contradict each other
- Tasks are vague and agents argue about scope
- Implementation discovers design flaws halfway through

> [!WARNING]
> For complex features, vague specifications lead to wasted tokens, rework, and architectural conflicts. You need systematic specs that enforce consistency.

---

## The Solution: Spec-Driven Development with SpecKit

**SpecKit is a systematic planning and implementation framework that turns specifications into working code.**

Instead of just listing steps, SpecKit:
1. **Documents principles** so everyone knows your standards
2. **Specifies requirements** clearly (what you're building and why)
3. **Analyzes your codebase** to understand existing patterns
4. **Plans systematically** (how to build it while respecting those patterns)
5. **Generates discrete tasks** so multiple agents can work independently
6. **Implements systematically** (executing the plan and validating consistency)

The key insight: **specs become executable artifacts**. You write a clear spec once, and it becomes the source of truth for planning, tasks, and implementation.

### When to Use SpecKit vs `/plan`

| Situation | Use |
|-----------|-----|
| "Add a button" or "fix this bug" | `/plan` (simple, quick) |
| Complex features across multiple files | SpecKit |
| New projects—need to establish patterns | SpecKit full workflow |
| Existing codebase—new complex feature | SpecKit with codebase analysis |
| Multi-agent implementation | SpecKit (generates clean task breakdown) |

---

## The SpecKit Workflow

SpecKit breaks complex work into manageable stages:

### Stage 1: Constitution (Optional, but Recommended)

```bash
/speckit.constitution Create principles for code quality and testing
```

Defines project-wide principles. Should I prefer classes or functions? How should errors be handled? What's our testing strategy? This prevents agents from debating philosophy later.

### Stage 2: Specify (Define What & Why)

```bash
/speckit.specify Add dark mode toggle with persistent user preference
```

You describe what you want and why it matters. SpecKit asks clarifying questions, and you answer them. The result: a complete specification that's unambiguous.

### Stage 3: Plan (Analyze & Design How)

```bash
/speckit.plan
```

SpecKit analyzes your codebase, understands your patterns, and designs a technical plan. It respects existing architecture instead of creating new patterns.

### Stage 4: Tasks (Break Into Discrete Work)

```bash
/speckit.tasks
```

SpecKit generates a task breakdown. Each task is clear, sized appropriately, and can be assigned to an agent.

### Stage 5: Implement (Execute Systematically)

```bash
/speckit.implement
```

Agents execute the tasks. Because they're clear and independent, agents work efficiently without stepping on each other.

### Optional: Quality Checks

**`/speckit.clarify`** — If specs are vague, SpecKit asks targeted questions to fill gaps.

**`/speckit.analyze`** — Before implementing, cross-check that the spec, plan, and tasks are consistent.

---

## Real Examples

### Example 1: New Project (Full Workflow)

```bash
/speckit.constitution Create principles for code quality, testing, and error handling
/speckit.specify Build an auth system with OAuth2 and password reset
/speckit.plan
/speckit.clarify
/speckit.analyze
/speckit.tasks
/speckit.implement
```

You're building from scratch, so you establish principles first. Then you specify what you want, and SpecKit designs the entire system.

### Example 2: Existing Codebase (Focused Workflow)

```bash
/speckit.specify Add dark mode toggle with user preference persistence
/speckit.plan
/speckit.tasks
/speckit.implement
```

You already have patterns. SpecKit analyzes them, plans around them, and generates tasks. You skip constitution because your codebase already has principles.

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **Simple Planning** | Works for straightforward features; breaks down on complex work |
| **Spec-Driven Development** | Specifications become executable artifacts that guide implementation |
| **Codebase Awareness** | SpecKit respects existing patterns instead of creating new ones |
| **Systematic Workflow** | Constitution → Specify → Plan → Tasks → Implement |
| **Quality Assurance** | Built-in checks (clarify, analyze) prevent design flaws before implementation |

---

## Exercise: Use SpecKit to Add a Priority System

| | |
|---|---|
| **Goal** | Experience the full SpecKit workflow on a complex feature |
| **Concepts** | Spec-Driven Development, systematic planning, architecture-aware implementation |

### Feature: Priority System

Add priorities (High/Medium/Low) to todos with visual indicators, filtering, and sorting.

### Steps

1. **Specify the feature** using SpecKit:
   ```bash
   /speckit.specify Add a priority system (High/Medium/Low) to todos with visual indicators and sorting
   ```

   Answer SpecKit's clarifying questions. Be specific about:
   - How should priorities be displayed? (colors, icons, labels)
   - Should there be a default priority?
   - Should users be able to change priority after creation?

2. **Plan the implementation**:
   ```bash
   /speckit.plan
   ```

   SpecKit analyzes your codebase and designs a plan that respects existing patterns. Review it:
   - Which files will be modified?
   - What's the architecture?
   - Are there edge cases?

3. **Optional: Verify consistency**:
   ```bash
   /speckit.analyze
   ```

   This cross-checks the spec and plan for conflicts. Good practice before implementing.

4. **Generate tasks**:
   ```bash
   /speckit.tasks
   ```

   SpecKit breaks the feature into discrete tasks. Each task is clear and independent.

5. **Implement**:
   ```bash
   /speckit.implement
   ```

   Agents execute the tasks. Because they're systematic, implementation is smooth.

6. **Test**:
   - Add todos with different priorities
   - Verify visual indicators display correctly
   - Filter by priority
   - Sort by priority (High → Medium → Low)
   - Ensure existing functionality still works

### Acceptance Criteria
- [ ] Feature is specified clearly (no ambiguity)
- [ ] Plan respects existing code patterns
- [ ] All tasks are clear and appropriately sized
- [ ] Implementation follows the systematic plan
- [ ] Priorities display with visual indicators
- [ ] Filtering and sorting work correctly
- [ ] No existing functionality is broken
- [ ] You notice how SpecKit's structure prevented ad-hoc decisions

> [!NOTE]
> **Compare approaches**: Notice the difference between `/plan` (directional) and `/speckit` (systematic). For complex features, SpecKit's analysis catches architectural issues earlier.

> [!TIP]
> **Alternative exercises**: Implement recurring todos with recurrence patterns, or add collaborative features with shared todo lists.

---

← [Previous: Task Orchestration with VibeKanban](5-task-orchestration-vibekanban.md) | [Next: QA and Pull Requests →](7-qa-and-pull-requests.md)
