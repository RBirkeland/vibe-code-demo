# Module 7: QA and Pull Requests

## What You'll Learn
- Understand the full PR workflow agents enable
- Learn why AI-assisted code review catches different errors than human review
- Set up automated code review on PRs

---

## The Problem: Manual QA Doesn't Scale

You've been implementing features with agents. They work well. But when they open PRs, what happens?

You manually review every line of code. You check for:
- Does it work?
- Is it following patterns?
- Does it have edge case bugs?
- Is it performant?
- Does it follow security best practices?

When you're doing this manually for every agent PR, it's a bottleneck. It's also subjective—you might miss something one time and catch it the next.

Plus, here's the key insight: **AI-generated code has different failure modes than human code**. An LLM might generate code that works but isn't idiomatic. It might create a pattern that contradicts your existing code. It might miss security edge cases that humans would catch.

> [!WARNING]
> Manual review of agent PRs becomes a bottleneck. Different review approaches catch different errors—one person's blind spot is another's strength.

---

## The Solution: Automated Workflow + AI-Assisted Review

### Agents Handle the Workflow

Agents create PRs automatically, following the complete workflow:

```
create branch → make changes → commit → push → open PR
```

You don't do these steps manually. Agents handle them. Your job is to review and approve.

### AI-Assisted Review Catches Different Errors

Here's the powerful part: **use a different AI model for code review than for implementation.**

The original model (Claude) generated the code. A second AI model (Greptile or CodeRabbit) reviews it independently. Different models have different strengths:
- Different architectural preferences
- Different ways of analyzing code
- Different sensitivity to edge cases
- Different understanding of security patterns

This complementary review catches issues that a single model would miss.

### Recommended Setup

| Tool | Strengths | Use When |
|------|-----------|----------|
| **[Greptile](https://greptile.com)** | Deep codebase understanding, architectural analysis | You want thorough reviews that understand your whole system |
| **CodeRabbit** | Fast, focuses on code quality and potential bugs | You want quick feedback on specific issues |

Both tools integrate with GitHub and comment automatically on PRs when they're created.

---

## Setting Up Automated Review

### Step 1: Connect Your Repository

Choose your review tool:

**Option A: Greptile**
- Visit [greptile.com](https://greptile.com)
- Click "Connect Repository"
- Select your GitHub account
- Choose `vibe-code-demo` repository

**Option B: CodeRabbit**
- Visit [coderabbit.ai](https://coderabbit.ai)
- Add the repository
- Follow their authentication flow

### Step 2: Configure Settings

Most tools let you customize what they check:
- Security issues: always on
- Performance: on/off
- Documentation: on/off
- Code style: on/off

Configure based on your project's needs.

### Step 3: PR Review Happens Automatically

From now on:
1. Agent opens a PR
2. GitHub notifies your review tool
3. Review tool analyzes the code
4. Automated comments appear on the PR
5. You review the automated comments + the code itself

---

## Workflow: Review → Approve → Merge

When an agent opens a PR:

1. **Read automated review comments** - What issues did the tool catch?
2. **Review the code changes** - Do they make sense? Do they follow your patterns?
3. **Approve or request changes** - Either merge or ask for specific fixes
4. **Merge when ready** - PR goes into main

The bot comments guide your review. Your judgment makes the final call.

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **Automated Workflow** | Agents handle branch → commit → push → PR automatically |
| **Complementary Review** | Different AI models catch different errors; use multiple reviewers |
| **Tool Setup** | Greptile or CodeRabbit integrates with GitHub once and works automatically |
| **Your Role** | Read automated feedback, review code, make final approval decision |

---

## Exercise: Set Up and Observe Automated Review

| | |
|---|---|
| **Goal** | Experience how automated code review catches different errors than manual review |
| **Concepts** | Automated PR workflow, complementary AI review, scalable QA |

### Steps

1. **Set up a review tool** (choose one):

   **Greptile** (recommended for deep analysis):
   - Visit [greptile.com](https://greptile.com)
   - Click "Connect Repository"
   - Authenticate with GitHub
   - Select your `vibe-code-demo` repository

   **CodeRabbit** (for fast, focused feedback):
   - Visit [coderabbit.ai](https://coderabbit.ai)
   - Add your repository
   - Configure settings (security: on, performance: on, code style: your preference)

2. **Create a PR from an agent-implemented feature**:

   Ask an agent to implement a feature and open a PR:
   ```
   Add a "favorite" star toggle to each todo. When clicked,
   toggle a star icon and save to localStorage.
   ```

   Let the agent handle: branch creation → changes → commit → push → open PR

3. **Observe the automated review**:

   Within minutes of PR creation:
   - Automated comments appear on the PR
   - Review tool has analyzed the code
   - Specific issues and suggestions are highlighted

4. **Analyze the feedback**:
   - What issues did the automated review find?
   - Are they issues you would have caught?
   - Are there issues the review missed that you spot?
   - Does the feedback align with your code standards?

5. **Fix issues if necessary**:

   If the review flagged real problems, ask the agent to fix them:
   ```
   The review mentioned [specific issue]. Fix this and push an update.
   ```

   Watch how the PR updates with new commits.

6. **Approve and merge**:

   Once you're satisfied:
   - Approve the PR on GitHub
   - Merge to main
   - Observe how the feature is now live

### Acceptance Criteria
- [ ] Review tool is set up and connected to your repository
- [ ] Agent successfully creates a PR
- [ ] Automated review comments appear on the PR
- [ ] You can articulate what issues the review found
- [ ] You understand the difference between human review and automated review
- [ ] PR is approved and merged successfully
- [ ] Feature is working correctly in main

> [!TIP]
> **What to notice**: The review tool caught issues you might have missed, and missed issues you caught. That's exactly why complementary review works—different perspectives catch different problems.

> [!NOTE]
> **Why this matters**: As you scale to multiple agents working in parallel, manual review becomes impossible. Automated review handles the scale, and your judgment handles the final call. That's how you maintain quality while multiplying productivity.

---

← [Previous: Advanced Planning with Speckit](6-advanced-planning-speckit.md) | [Next: Language Server Protocol →](8-language-server-protocol.md)
