# wbcli.com Website Design Spec

## Overview

Marketing and documentation website for the workbench CLI (`wbcli`) — a multi-agent orchestrator that dispatches AI coding agents in parallel across isolated git worktrees.

- **Canonical domain:** wbcli.com
- **Redirect:** workbench-cli.com → wbcli.com (301)
- **Goal:** Documentation, use-cases, demos, promotion
- **Launch scope:** Landing page + Docs (lean launch)

## Visual Style

Modern dev tool aesthetic (dark, polished):
- Dark slate backgrounds (`#0f172a` → `#1e293b`)
- Indigo/violet gradient accents (`#6366f1` → `#8b5cf6`)
- Inter for body, JetBrains Mono for code
- Blend of monospace and sans-serif
- Premium feel — think Vercel/Raycast

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + `@tailwindcss/typography`
- `next-mdx-remote` for MDX rendering
- `gray-matter` for frontmatter parsing
- `shiki` for syntax highlighting
- Deploy to Vercel

## Site Architecture

```
wbcli.com
├── / ........................ Landing page
├── /docs ................... Docs index / quickstart
│   ├── /docs/getting-started
│   ├── /docs/plan-format
│   ├── /docs/cli-reference
│   ├── /docs/agents
│   ├── /docs/profiles
│   └── /docs/tdd-mode
└── (future: /use-cases, /blog)
```

### Routing

- App Router with layout groups: `(marketing)` for landing, `(docs)` for documentation
- Docs layout: persistent sidebar nav + table of contents
- Landing page: full-width layout, no sidebar
- Shared root layout: metadata, fonts, theme

## Landing Page

Sections top to bottom:

1. **Nav** — Logo, Docs link, GitHub link, "Get Started" CTA
2. **Hero** — Headline: "Ultra-lightweight multi-agent orchestrator for any setup", subheadline, `pip install wbcli` copy button, animated terminal mockup
3. **How It Works** — 3 steps: Write a plan → Run `wb run` → Agents execute in parallel
4. **Features grid** — 4-6 cards: Multi-agent support, parallel execution, dependency waves, TDD mode, profiles, auto-merge
5. **Code example** — Side-by-side: markdown plan (left) + terminal output (right)
6. **CTA footer** — "Get started in 60 seconds" with install command + docs link

No pricing, no sign-up — open-source tool.

## Docs

### Content Strategy

- **Hybrid approach:** docs authored directly as MDX in `content/docs/`
- README is not the source of truth — too unstructured
- Updates are agent-based, reading changelogs from the workbench repo
- Frontmatter: title, description, order

### Docs Layout

- Left sidebar: persistent nav generated from MDX frontmatter
- Main content: rendered MDX with syntax highlighting (shiki)
- Right sidebar: table of contents from headings
- Mobile: sidebar collapses to hamburger

### Initial Pages

1. Getting Started — install, prerequisites, `wb setup`, first plan
2. Plan Format — markdown structure, task sections, files, depends
3. CLI Reference — all commands and flags
4. Agents — supported agents, custom config via `agents.yaml`
5. Profiles — agent roles, directives, per-role assignments
6. TDD Mode — `--tdd` flag, test-first pipeline

## Project Structure

```
wbcli-web/
├── app/
│   ├── layout.tsx .............. Root layout (fonts, metadata, theme)
│   ├── (marketing)/
│   │   ├── layout.tsx .......... Full-width layout
│   │   └── page.tsx ............ Landing page
│   └── (docs)/
│       └── docs/
│           ├── layout.tsx ...... Sidebar + TOC layout
│           └── [[...slug]]/
│               └── page.tsx .... Dynamic MDX renderer
├── components/
│   ├── landing/ ................ Hero, Features, HowItWorks, CodeExample
│   ├── docs/ ................... Sidebar, TOC, MDXComponents
│   └── shared/ ................. Nav, Footer, CopyButton, Logo
├── content/
│   └── docs/ ................... MDX files
├── lib/
│   ├── mdx.ts .................. MDX parsing/loading
│   └── docs.ts ................. Doc metadata, nav tree generation
├── public/
│   └── og/ ..................... Open Graph images
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```
