# Module 4: Safety and Guardrails

## What You'll Learn
- Understand why autonomous agents need guardrails
- Learn how SafetyNet prevents destructive operations
- Configure custom safety rules for your project

---

## The Problem: Autonomous Agents Can Be Dangerous

You've learned to use agents in autonomous mode—they read code, make changes, run commands, all without asking for approval. But here's the catch: without guardrails, an agent could:

- `git reset --hard` and wipe out work
- `git push --force` to main and break everyone's branch
- `rm -rf` the wrong directory and delete data
- Run a destructive database command

In autonomous mode, the agent just executes. No safety net. No confirmation. The damage happens before you notice.

> [!WARNING]
> Autonomous agents execute commands immediately. Without guardrails, a single bad decision can destroy your codebase or data. Guardrails aren't optional in production—they're essential.

---

## The Solution: Two Layers of Protection

There are two approaches to safety:

### Layer 1: Sandboxing (Minimal Protection)

```bash
/sandbox
```

Sandboxing is the basic layer. It limits file access and restricts commands to a safe subset. Better than nothing, but incomplete—it doesn't prevent dangerous remote operations or catch context-specific mistakes.

To learn more:
- [Sandbox Documentation](https://docs.anthropic.com/en/docs/claude-code/sandbox) - Official sandbox mode guide

### Layer 2: SafetyNet (Semantic Protection)

SafetyNet is the recommended approach because it **understands command intent**, not just patterns.

**The difference matters**: A pattern-based system looks for `git reset --hard`. But an attacker (or buggy agent) could bypass it with `git reset --hard main` or `git reset --hard $(git rev-parse --abbrev-ref HEAD)`. Pattern matching fails.

SafetyNet understands what the command *does*—it's doing a hard reset, so block it. No bypass possible because it's analyzing the command semantically, not just matching strings.

### What SafetyNet Actually Blocks

| Command Type | Examples | Why It Matters |
|--------------|----------|---|
| **Destructive git** | `git reset --hard`, `git push --force`, `git checkout --` | Prevents losing work permanently |
| **File deletion** | `rm -rf` outside temp/cwd | Prevents data loss |
| **Hidden commands** | Destructive commands in `bash -c`, `python -c`, etc. | Blocks obfuscated attacks |

### Installation

```bash
/plugin marketplace add kenryu42/cc-marketplace # First add the Marketplace
/plugin install safety-net@cc-marketplace # Then install safety net
```

Then restart Claude Code.

### Verify Installation

```bash
npx cc-safety-net doctor
```

### When SafetyNet Blocks

```
BLOCKED by Safety Net

Reason: git checkout -- discards uncommitted changes permanently.
        Use 'git stash' first.

Command: git checkout -- src/main.py
```

Notice it doesn't just block—it explains *why* and suggests the safer alternative. This is important because the agent learns the right way to do things.

To learn more:
- [SafetyNet Repository](https://github.com/kenryu42/claude-code-safety-net) - Full documentation and advanced modes

---

## Custom Rules: Project-Specific Safety

Different projects need different rules. A junior developer team might want strict `git add .` blocking. A senior team working alone might trust that. SafetyNet lets you define custom rules:

```json
{
  "version": 1,
  "rules": [
    {
      "name": "block-git-add-all",
      "command": "git",
      "subcommand": "add",
      "block_args": ["-A", "--all", "."],
      "reason": "Use 'git add <specific-files>' instead. Be explicit about what gets committed."
    }
  ]
}
```

Use `/set-custom-rules` to configure these rules interactively:

```bash
/set-custom-rules
```

> [!TIP]
> Custom rules make safety part of your development culture—they codify best practices and prevent common mistakes before they happen.

> [!NOTE]
> For complex validation logic beyond blocking commands, use [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/hooks).

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **The Risk** | Autonomous agents execute immediately without confirmation—one mistake can be catastrophic |
| **Layered Safety** | Sandboxing (basic) + SafetyNet (semantic analysis) + Custom rules (project-specific) |
| **Why Semantic Matters** | Pattern matching can be bypassed; semantic analysis understands intent |
| **Custom Rules** | Enforce project standards and codify best practices for agent behavior |

---

## Exercise: Experience SafetyNet Protection

| | |
|---|---|
| **Goal** | See SafetyNet in action and understand why semantic safety matters |
| **Concepts** | Autonomous agent safety, semantic analysis vs pattern matching, custom rules |

### Steps

1. Install SafetyNet:
   ```bash
   /plugin marketplace add kenryu42/cc-marketplace
   /plugin install safety-net@cc-marketplace
   ```

2. Restart Claude Code and verify:
   ```bash
   npx cc-safety-net doctor
   ```

3. Intentionally ask Claude to do something dangerous:
   ```
   Create a backup branch, then hard reset the main branch to 3 commits ago
   ```

   **What happens**: SafetyNet blocks the dangerous `git reset --hard` before it executes.

4. Observe the SafetyNet response:
   - What command was blocked?
   - What reason did it give?
   - What safer alternative did it suggest?

5. Ask Claude to implement the safer approach:
   ```
   Use the safer approach to revert those 3 commits instead of hard resetting
   ```

6. Create a custom rule to enforce best practices:
   ```bash
   /set-custom-rules
   ```

7. Add a rule that blocks `git add .` and `git add -A`:
   - Reason: "Be explicit about what gets committed"
   - This forces agents (and you) to add specific files

8. Test the custom rule:
   ```
   Add all files to git with git add .
   ```

   **Notice**: Your custom rule blocks it. SafetyNet enforces your project's standards.

### Acceptance Criteria
- [ ] SafetyNet is installed and verified
- [ ] SafetyNet successfully blocks dangerous git operations
- [ ] SafetyNet suggests a safer alternative when blocking
- [ ] (Optional) Custom rule is created and active
- [ ] (Optional) Custom rule blocks `git add .` as configured

> [!NOTE]
> **Why this matters**: Without SafetyNet, that `git reset --hard` would have executed immediately. With SafetyNet, it was caught, explained, and you learned the safer approach. That's the difference between a dangerous agent and a safe one.

---

← [Previous: Model Context Protocol](3-model-context-protocol.md) | [Next: Task Orchestration with VibeKanban →](5-task-orchestration-vibekanban.md)
