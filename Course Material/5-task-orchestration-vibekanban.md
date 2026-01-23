# Module 5: Task Orchestration with VibeKanban

## What You'll Learn
- Understand why task orchestration is needed for complex projects
- Set up VibeKanban to coordinate multiple agents
- Run features in parallel and resolve conflicts

---

## The Problem: Complex Projects Need Coordination

You can use agents to build features individually. But what if you need to build 3 features at the same time?

Without coordination:
- Agents work on the same files and conflict
- You manually merge everything
- One agent's mistake blocks others
- You have no visibility into progress

With multiple features, multiple agents, and tight timelines, you need a system that:
1. **Breaks work into discrete tickets** so agents don't step on each other
2. **Tracks progress** so you know what's done, in progress, and blocked
3. **Manages dependencies** so blocked tasks wait automatically
4. **Coordinates merges** so conflicts get resolved systematically

> [!WARNING]
> Without coordination, parallel agents create chaos: merge conflicts, duplicate work, and invisible blockers. Task orchestration prevents that.

---

## The Solution: VibeKanban

**VibeKanban is a Kanban board that coordinates multiple agents.**

Think of it as a project manager for agents. Each agent picks a ticket, works independently, and reports progress. VibeKanban tracks everything and prevents chaos.

### Setting Up VibeKanban

```bash
npx vibe-kanban                                    # Start board
claude mcp add vibe_kanban --scope user -- npx -y vibe-kanban@latest --mcp  # Add MCP
```

> [!NOTE]
> Restart Claude Code after adding the MCP to load it properly.

To learn more:
- [VibeKanban Documentation](https://www.vibekanban.com/docs/agents/claude-code) - Full setup and usage guide

---

## From Plans to Parallel Execution

### Step 1: Create a Plan

```bash
/plan Implement these 3 features: [your choices]
```

The plan breaks work into logical steps.

### Step 2: Convert Plan to Tickets

```
Write detailed tickets for all tasks and add them to VibeKanban using the MCP. 
```

Consider specifying how you would like the tickets to be structured, such as:
- Clear and specific (one thing to do)
- Sized appropriately (agent can complete in one session)
- Marked with dependencies if they exist
- Marked with `[P]` if parallelizable

### Step 3: Run Agents in Parallel

```
Start working on all parallelizable tasks marked with [P]
```

Multiple agents start simultaneously, each working on their own ticket in their own branch.

### Before Parallel Execution

> [!WARNING]
> Always configure SafetyNet before parallel execution—agents run in autonomous YOLO mode.

| Consideration | What to Know |
|--------------|------|
| **Safety** | Configure SafetyNet with custom rules (agents execute without confirmation) |
| **Dependencies** | Serial tasks wait automatically; only parallel tasks run concurrently |
| **Merge Conflicts** | Expected when agents modify the same files; resolve systematically |

### What to Expect

When agents finish, they open PRs. If they modified different files, merging is automatic. If they modified the same file, you'll have merge conflicts—that's normal and expected. Review the conflicts, pick the correct version, and merge.

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **The Problem** | Complex projects need coordination; parallel agents without structure = chaos |
| **The Solution** | VibeKanban breaks work into tickets and tracks progress |
| **Parallel Execution** | Multiple agents work simultaneously, independently, on separate branches |
| **Safety + Coordination** | SafetyNet + VibeKanban = safe, coordinated parallel development |

---

## Exercise: Scale to 3 Features in Parallel

| | |
|---|---|
| **Goal** | Experience multi-agent coordination with real parallel execution |
| **Concepts** | Ticket-driven development, parallel agents, merge conflict resolution, dependency tracking |

### Choose 3 Features to Implement

Pick any 3 from this list (independent features work best):
1. Search/Filter by Text
2. Dark Mode Toggle
3. Bulk Operations (Select All, Delete Completed, Mark All Complete)
4. Drag-and-Drop Reordering
5. Export/Import JSON
6. Keyboard Shortcuts
7. Todo Details/Notes
8. Undo/Redo

**Tip**: Pick features that modify different parts of the codebase (UI components, storage, etc.) to avoid excessive merge conflicts while still practicing conflict resolution.

### Steps

1. **Create a plan** for all 3 features:
   ```bash
   /plan Implement these 3 features: [your choices]
   ```

   Review the plan. Approve it when it looks good.

2. **Convert plan to VibeKanban tickets**:
   ```
   Write detailed tickets for all tasks and add them to VibeKanban.
   Mark parallelizable tasks with [P].
   ```

3. **View the board**:
   - Open VibeKanban and see your tickets in the "To Do" column
   - Notice which tasks are marked `[P]` (parallelizable)
   - Check for dependencies

4. **Start parallel execution**:
   ```
   Start working on all parallelizable tasks marked with [P]
   ```

   **What happens**: Multiple agents spawn simultaneously. Each picks a ticket and starts working on their own branch.

5. **Watch progress**:
   - Agents update ticket status as they work
   - Blocked tasks wait automatically
   - When agents finish, they open PRs

6. **Handle merge conflicts**:
   - If agents modified the same files, GitHub will mark PRs as "conflicted"
   - Review the conflicts: which version is correct?
   - Resolve manually or ask Claude to help merge
   - This is expected and normal

7. **Test the result**:
   - All 3 features work individually
   - All 3 features work together
   - No console errors

### Acceptance Criteria
- [ ] 3 independent features selected and described
- [ ] VibeKanban tickets created with clear descriptions
- [ ] Parallelizable tasks marked with `[P]`
- [ ] Multiple agents run in parallel without manual intervention
- [ ] At least 1 merge conflict occurs and is resolved
- [ ] All 3 features function correctly individually
- [ ] All 3 features work together without conflicts
- [ ] You understand how VibeKanban prevented chaos

> [!NOTE]
> **What you just learned**: This is how teams scale agent-driven development. Instead of agents trampling each other, VibeKanban coordinates them into a productive system. That coordination is what makes parallel agent development possible.

---

← [Previous: Safety and Guardrails](4-safety-and-guardrails.md) | [Next: Advanced Planning with Speckit →](6-advanced-planning-speckit.md)
