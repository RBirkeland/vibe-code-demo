<!--
  ===================================================================
  SYNC IMPACT REPORT
  ===================================================================

  Version Change: [PLACEHOLDER] → 1.0.0
  Type: INITIAL RATIFICATION (new constitution)

  Core Principles Defined:
  - Principle 1: Simplicity First - Vanilla Stack
  - Principle 2: Native Functionality - No Abstraction Overhead
  - Principle 3: Parallel Development Ready

  New Sections Added:
  - Technology Stack (native HTML/CSS/JS)
  - Development Workflow (minimal coordination)
  - Quality Gates (functional correctness + performance)

  Templates Updated:
  - ✅ plan-template.md (aligned with vanilla web structure)
  - ✅ spec-template.md (no changes needed - generic)
  - ✅ tasks-template.md (no changes needed - generic)

  Follow-up Notes: None deferred

  ===================================================================
-->

# Vibe-Code-Demo Constitution

## Core Principles

### I. Simplicity First – Vanilla Stack

Every feature uses vanilla HTML, CSS, and JavaScript. No frameworks, build tools, or transpilers required for demo delivery. Features must be implementable and testable directly in a browser.

**Rationale**: Demonstrates core functionality without abstraction layers that obscure multi-agent coordination. Easier to review, merge, and validate parallel work.

### II. Native Functionality – No Abstraction Overhead

Prefer native web APIs and plain JavaScript over utility libraries or helper abstractions. Direct DOM manipulation, native event listeners, and browser storage (localStorage) are the standard approach.

**Rationale**: Minimal dependencies mean clear code ownership. Each agent owns their feature files without shared utility code creating merge conflicts.

### III. Parallel Development Ready

Code structure supports two agents working independently on different features without file contention. Shared state (todos array) is isolated; each feature modifies only its own rendering/UI functions.

**Rationale**: Enables genuine parallel work: Feature 1 can be completed and tested in isolation before Feature 2 integrates.

## Technology Stack

- **Language**: JavaScript (ES6+) - vanilla, no transpilation
- **Markup**: HTML5 semantic elements
- **Styling**: Plain CSS (no preprocessor)
- **Storage**: Browser localStorage (no database)
- **Build**: Static files only (runs directly in browser via file:// or HTTP server)
- **Testing**: Manual user acceptance testing (UAT) in browser
- **No tools required**: No npm dependencies for demo delivery (Vite/ESLint/StyleLint are dev-only enhancements)

## Development Workflow

### File Ownership

- `index.html`: Shared (controlled modifications for UI structure)
- `styles.css`: Shared (controlled modifications for styling)
- `app.js`: Shared core logic; features extend via clearly named functions

### Coordination Points

- **Shared state**: `todos` array (defined by Feature 1, read by Feature 2)
- **Render function**: `renderTodos()` (Feature 1 defines; Feature 2 extends with filtering)
- **Merging**: Features coordinate on `renderTodos()` signature only; both are added sequentially

### Integration Testing

Each feature is independently testable in the browser:
- **Feature 1**: Add/toggle/delete todos, verify DOM updates
- **Feature 2**: Verify filters work with todos added by Feature 1

## Quality Gates

### Functional Correctness

- **MUST**: Feature performs as described in tickets
- **MUST**: No JavaScript console errors
- **MUST**: Todos persist to localStorage and reload on page refresh

### Code Standards

- **Plain JavaScript**: No minification or transpilation needed for demo
- **Readable**: Variable/function names match intent; no cryptic abbreviations
- **No complexity creep**: No defensive checks, error handling, or edge case coverage beyond specification

### Browser Compatibility

- **Target**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **No IE11 support required**

## Governance

### Amendment Process

Changes to this constitution require:
1. Justification in terms of demo goals (simplicity, parallelism, clarity)
2. Impact on both Feature 1 and Feature 2 assessed
3. Update to relevant templates if principles shift

### Compliance Review

- **PR Reviewers MUST verify**: Feature follows principles (vanilla stack, no abstractions, isolated feature ownership)
- **Agent coordination**: If merge conflicts arise on shared files, agents revise code to eliminate contention

### Breaking Constitution Violations

- Using npm packages beyond dev dependencies (eslint, stylelint, vite)
- Complex abstractions, utility functions, or shared helper modules
- Hard dependencies between features preventing independent testing

**Version**: 1.0.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13
