# Workbench Docs Refresh — Design

**Date:** 2026-05-20
**Status:** Approved

## Goal

Update the wbcli-web site to reflect comprehensive updates to the workbench CLI. Add new docs sections/sub-pages and refresh landing-page highlights. Priorities: Homebrew install, plan frontmatter/naming, and the review→PR flow get the most attention; shared conventions get a solid page.

## Site context

- Next.js 15 App Router. Docs content authored as MDX in `content/docs/*.mdx`, auto-registered in the sidebar via frontmatter `order` (sort) and `parent` (nesting). Loader: `lib/docs.ts`; renderer: `lib/mdx.ts`.
- Landing components in `components/landing/` (hero, features, code-example, etc.).
- Frontmatter fields: `title`, `description`, `order`, optional `parent`.

## Docs sidebar — target structure

```
Getting Started (1)
  ├─ CLI Reference (2)          ← updated: new commands + step-control flags
  └─ Architecture (3)
Plans (plan-format) (2)         ← updated: plan-by-name + folder layout
  ├─ Plan Frontmatter (NEW)     ← frontmatter fields, precedence
  ├─ Running Plans (3)          ← updated: wave/task selection, resume
  │   └─ TDD Mode (4)
Conventions (NEW, order 4)      ← shared .workbench/conventions.md
Review & Pull Requests (NEW, order 5)  ← requirements→review→PR agents + step control
Agents (6)
Profiles (7)
Skills (8)                      ← updated: add generate-conventions, refreshed list
```

New files: `plan-frontmatter.mdx`, `conventions.mdx`, `review-pr-flow.mdx`. The rest are edits.

> Note: orders for new root sections (Conventions=4, Review & PR=5) slot between Plans (2) and Agents (6). `plan-frontmatter.mdx` uses `parent: plan-format` and an order placing it before Running Plans.

## Page-by-page content plan

### Getting Started (`getting-started.mdx`) — edit
Lead install with Homebrew (recommended):
```bash
brew install duncankmckinnon/tap/workbench
```
Tap `duncankmckinnon/tap`; pulls Python 3.12, git, tmux. Then list alternatives: `pip install wbcli`, `uv tool install wbcli`, `pipx install wbcli`, and from source. Requirements: Python 3.11+, git on PATH; tmux optional (`--no-tmux`).

### Plans (`plan-format.mdx`) — edit
- Plans referenced **by name**: `wb run myfeature` → `.workbench/myfeature/plan.md`. Full path also works. Auto-numbered (`workbench-1`, ...) when unnamed.
- Per-plan folder layout diagram:
```
.workbench/
├── <plan_slug>/
│   ├── plan.md
│   ├── status.yaml
│   ├── profile.yaml        (optional override)
│   ├── agents.yaml         (optional override)
│   ├── conventions.md      (optional override)
│   ├── <task-id>/          (isolated worktree per task)
│   └── wrap-up/<session>/  (requirements.md, review.md, pr-body.md)
├── conventions.md          (project-level shared)
├── profile.yaml            (project-level)
└── agents.yaml             (project-level)
```

### Plan Frontmatter (`plan-frontmatter.mdx`) — NEW
- YAML frontmatter before `# Title`. Fields table mapping each key to its CLI equivalent: `session_branch`/`name` (`-b`), `base`, `local`, `agent`, `profile`, `profile_name`, `max_concurrent` (`-j`), `max_retries`, `tdd`, `skip_test`, `skip_review`, `retry_failed`, `fail_fast`, `cleanup`, `keep_branches`, `push`, `final_review`.
- Precedence: **CLI flags > frontmatter > built-in defaults.**
- Example plan with frontmatter + `## Context` / `## Conventions` / `## Task:` sections.

### Conventions (`conventions.mdx`) — NEW
- `.workbench/conventions.md`: shared, project-level conventions.
- Injected as fallback at runtime when a plan has no `## Conventions` section (idempotent). Plan-level `## Conventions` wins.
- Seen by all agent roles (implementor, tester, reviewer, fixer, summarizer, branch reviewer, PR writer).
- Planner-aware: when the file exists, `wb plan generate` skips writing its own `## Conventions`.
- Commands: `wb conventions init` / `init --generate` / `edit` / `show` / `delete`.
- Template structure: Code style, Testing, Git, Naming, Other.

### Review & Pull Requests (`review-pr-flow.mdx`) — NEW
- Three-agent sequence: **RequirementsSummarizer** (role `summarizer`) → **BranchReviewer** (role `branch_reviewer`) → **PrWriter** (role `pr_writer`, only if verdict PASS).
- Outputs land in `.workbench/<plan>/wrap-up/<session>/`: `requirements.md`, `review.md`, `pr-body.md`. Verdict `PASS`/`FAIL`. PR opened via `gh pr create` (fallback: copy-pasteable command).
- Entry points: `wb run plan --final-review`; `wb final-review <session>` (alias `wb review`); `wb merge -b <session> --review`; `wb pull-request <plan>`.
- Step control: `--skip-pr`, `--pr-title`, `--pr-body-file`, `--pr-base`, per-role directives (`--summarizer-directive`, `--branch-reviewer-directive`, `--pr-writer-directive`).
- Status tracking: `final_reviews` entries in `status.yaml`.

### CLI Reference (`cli-reference.mdx`) — edit
Add commands: `wb conventions`, `wb final-review`/`wb review`, `wb pull-request`, `wb resume`. Add granular control flags: wave selection (`-w`, `--start-wave`, `--end-wave`), `--task`, `--only-incomplete`, `--retry-failed`, `--fail-fast`, `--keep-branches`, `--skip-test`, `--skip-review`, merge flags (`wb merge -b ... --push/--review/--keep-branches`).

### Running Plans (`running-plans.mdx`) — edit
Add wave/task subset execution examples and `wb resume <session>`.

### Skills (`skills.mdx`) — edit
Add `generate-conventions` to the bundled list. Refresh `wb setup` options (`--global`, `--symlink`, `--update`, `--agent`). Update skills download/list as needed.

## Landing page highlights

- **Code example** (`code-example.tsx`): feature Homebrew install and/or a plan with frontmatter / `wb run myfeature --final-review` flow.
- **Features** (`features.tsx`): add/refresh cards — shared conventions, automated review→PR flow, granular step control, plan-by-name.
- **Hero/CTA**: ensure install path reflects Homebrew. Match existing component patterns and tone; no layout redesign.

## Out of scope
- No redesign of layout, theme, or navigation mechanics.
- No changes to the underlying docs loader/MDX pipeline.
- Unrelated refactoring.

## Verification
- `npm run build` (and `npm run dev` spot-check) succeeds.
- New pages appear in sidebar at correct positions; links resolve; code blocks/diagrams render.
- All commands/flags/file paths match the workbench source as captured above.
