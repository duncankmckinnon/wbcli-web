# wbcli.com Website Scaffolding

## Context

We are building a marketing and documentation website for the workbench CLI (`wbcli` on PyPI) — a multi-agent orchestrator that dispatches AI coding agents in parallel across isolated git worktrees. The tool supports Claude Code, Gemini CLI, and Codex.

We need to scaffold a complete Next.js website from scratch.

**Design spec:** `docs/superpowers/specs/2026-04-04-wbcli-website-design.md`

**Visual style:** Modern dev tool aesthetic (dark, polished). Dark slate backgrounds (#0f172a → #1e293b), indigo/violet gradient accents (#6366f1 → #8b5cf6), Inter for body text, JetBrains Mono for code. Think Vercel/Raycast.

**Domains:** wbcli.com (canonical), workbench-cli.com (redirects to wbcli.com).

**Launch scope:** Landing page + documentation section.

## Conventions

- Next.js 15 with App Router, TypeScript strict mode
- Tailwind CSS v3 for styling — use `tailwind.config.ts` for theme configuration, `@tailwind base/components/utilities` directives in globals.css
- All components are React Server Components by default; only add `"use client"` when state/interactivity is needed
- File naming: kebab-case for files, PascalCase for component exports
- Imports: use `@/` path alias for project root (e.g., `@/components/shared/nav`)
- No default exports except for page.tsx and layout.tsx files (Next.js convention)
- MDX content lives in `content/docs/` with frontmatter: `title`, `description`, `order`
- Test command: `npm run build` (type checking + build validation)
- Use `next/font` for loading Inter and JetBrains Mono (no external font CDN)
- Use `next/image` for any images
- Use `next/link` for internal navigation
- MDX rendering uses `next-mdx-remote/rsc` (the RSC-compatible version for App Router, not `next-mdx-remote/serialize`)

## Task: Project scaffold
Files: package.json, tsconfig.json, next.config.ts, tailwind.config.ts, app/globals.css, postcss.config.mjs, app/layout.tsx, public/favicon.ico

Initialize the Next.js project with all configuration files.

### Implementation

1. **package.json** — Initialize with these dependencies:
   - `next`, `react`, `react-dom` (latest stable Next.js 15)
   - `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
   - `tailwindcss` (v3), `@tailwindcss/typography`, `postcss`, `autoprefixer`
   - `next-mdx-remote` (v5) for MDX rendering in Server Components
   - `gray-matter` for frontmatter parsing
   - `shiki` for syntax highlighting
   - `rehype-pretty-code` for integrating shiki with MDX
   - Scripts: `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint` (`next lint`)

2. **tsconfig.json** — Strict mode, `@/` path alias pointing to `.`, JSX preserve, Next.js plugin

3. **next.config.ts** — Minimal config, enable `mdx` page extensions

4. **tailwind.config.ts** — Extend theme with:
   - Colors: `brand` palette with slate backgrounds and indigo/violet accents
     - `brand.bg.primary`: `#0f172a`, `brand.bg.secondary`: `#1e293b`, `brand.bg.tertiary`: `#334155`
     - `brand.accent.primary`: `#6366f1`, `brand.accent.secondary`: `#8b5cf6`, `brand.accent.tertiary`: `#a78bfa`
     - `brand.text.primary`: `#f1f5f9`, `brand.text.secondary`: `#94a3b8`, `brand.text.muted`: `#64748b`
   - Font families: `sans` → Inter, `mono` → JetBrains Mono

5. **postcss.config.mjs** — Standard Tailwind + autoprefixer setup

6. **app/globals.css** — Import Tailwind v3 directives (`@tailwind base; @tailwind components; @tailwind utilities;`), set dark background on `html`/`body` in a `@layer base` block, base typography styles, custom scrollbar styling for dark theme (`::-webkit-scrollbar` with brand colors)

7. **app/layout.tsx** — Root layout:
   - Load Inter and JetBrains Mono via `next/font/google`
   - Set `<html lang="en" className="dark">` with font variables as CSS custom properties
   - Metadata: title "workbench — Multi-agent orchestrator", description about the tool
   - Open Graph metadata with site name "wbcli"
   - Body with `bg-brand-bg-primary text-brand-text-primary` base classes

### Test plan
- Run `npm install` then `npm run build` — should complete with no errors
- Dev server `npm run dev` should show the default layout with dark background

## Task: Shared components
Files: components/shared/nav.tsx, components/shared/footer.tsx, components/shared/logo.tsx, components/shared/copy-button.tsx
Depends: project-scaffold

Build the shared UI components used across marketing and docs layouts.

### Implementation

1. **components/shared/logo.tsx** — Named export `Logo`
   - SVG or styled text logo: "workbench" in bold with a small indigo square icon before it (pure CSS/SVG, no image file)
   - Accept `className` prop for sizing
   - The icon should be a simple geometric shape (rounded square with gradient from #6366f1 to #8b5cf6)

2. **components/shared/nav.tsx** — Named export `Nav`
   - `"use client"` (needs mobile menu state)
   - Sticky top nav with `bg-brand-bg-primary/80 backdrop-blur-md` and bottom border `border-brand-bg-tertiary`
   - Left: `<Logo />` linking to `/`
   - Right: "Docs" link (`/docs`), GitHub icon link (`https://github.com/duncankmckinnon/workbench`), "Get Started" button (links to `/docs/getting-started`, styled with indigo gradient background)
   - Mobile: hamburger menu that toggles a dropdown with the same links
   - Use `next/link` for internal links, regular `<a>` with `target="_blank"` for GitHub

3. **components/shared/footer.tsx** — Named export `Footer`
   - Simple dark footer with `border-t border-brand-bg-tertiary`
   - Three columns: Product (Docs, GitHub), Resources (Getting Started, CLI Reference), Community (GitHub Issues)
   - Bottom row: "Built by Duncan McKinnon" + MIT license note
   - All internal links use `next/link`

4. **components/shared/copy-button.tsx** — Named export `CopyButton`
   - `"use client"` (needs clipboard API + state)
   - Props: `text: string` (the text to copy), `className?: string`
   - Renders a button with a copy icon; on click, copies `text` to clipboard
   - Shows a checkmark icon for 2 seconds after copying, then reverts
   - Use inline SVG for the copy and check icons (no icon library dependency)

### Test plan
- `npm run build` passes with no type errors
- Components render without hydration errors

## Task: MDX infrastructure
Files: lib/mdx.ts, lib/docs.ts, content/docs/getting-started.mdx, content/docs/plan-format.mdx, content/docs/cli-reference.mdx, content/docs/agents.mdx, content/docs/profiles.mdx, content/docs/tdd-mode.mdx
Depends: project-scaffold

Set up MDX parsing utilities and create all initial doc content files.

### Implementation

1. **lib/docs.ts** — Doc metadata and navigation utilities:
   ```typescript
   interface DocMeta {
     slug: string;
     title: string;
     description: string;
     order: number;
   }
   ```
   - `getAllDocs(): DocMeta[]` — reads all `.mdx` files from `content/docs/`, parses frontmatter with `gray-matter`, returns sorted by `order`
   - `getDocBySlug(slug: string): { meta: DocMeta; content: string }` — reads a single doc file, returns parsed frontmatter + raw MDX content
   - `getDocSlugs(): string[]` — returns all available slugs for `generateStaticParams`
   - Use `fs` and `path` to read from `content/docs/` directory
   - File path: `path.join(process.cwd(), 'content', 'docs', `${slug}.mdx`)`

2. **lib/mdx.ts** — MDX rendering utilities:
   - This file provides a React Server Component wrapper and heading extraction.
   - `MDXContent` — a named async RSC export that renders MDX using `next-mdx-remote/rsc`:
     ```typescript
     import { MDXRemote } from 'next-mdx-remote/rsc';
     import rehypePrettyCode from 'rehype-pretty-code';

     interface MDXContentProps {
       source: string;
       components?: Record<string, React.ComponentType<any>>;
     }

     export function MDXContent({ source, components }: MDXContentProps) {
       return (
         <MDXRemote
           source={source}
           components={components}
           options={{
             mdxOptions: {
               rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
             },
           }}
         />
       );
     }
     ```
   - Note: `next-mdx-remote/rsc` does NOT use `serialize` — it takes raw MDX source directly as a prop. There is no `MDXRemoteSerializeResult` type. The `MDXRemote` component from `next-mdx-remote/rsc` is an async Server Component.
   - `extractHeadings(content: string): { id: string; text: string; level: number }[]` — parses markdown headings (## and ###) from raw MDX content using regex `/^(#{2,3})\s+(.+)$/gm`, converts heading text to slug id (lowercase, replace spaces with hyphens, strip non-alphanumeric)

3. **content/docs/*.mdx** — Create 6 MDX files with frontmatter and real content (not placeholder). Content should be based on the workbench tool's actual features. Each file needs:
   - Frontmatter: `title`, `description`, `order`
   - Real documentation content with code examples, formatted in markdown

   **getting-started.mdx** (order: 1) — Title: "Getting Started"
   Write a complete getting-started guide with these sections:
   - **Prerequisites**: Python 3.11+ (`python3 --version`), Git, and at least one supported agent CLI: Claude Code (`claude` command), Gemini CLI (`gemini` command), or OpenAI Codex (`codex` command). Note that the agent CLI must be installed and authenticated separately.
   - **Installation**: `pip install wbcli` — show the command in a code block. Mention it installs the `wb` command.
   - **Project Setup**: Run `wb setup` in any git repo. Explain it creates a `.workbench/` directory with default configuration and installs agent skill files. Show example output.
   - **Your First Plan**: Write a complete example plan in a markdown code block. The plan should be simple (2 tasks, no dependencies) — something like adding a utility function and its tests. Include `## Context`, `## Conventions`, and two `## Task:` sections with file ownership.
   - **Running the Plan**: `wb run plan.md` — explain what happens: workbench parses tasks, creates isolated git worktrees, dispatches agents in parallel. Show example terminal output with wave progress, checkmarks, and timing. Mention `wb preview plan.md` for dry-run.
   - **What's Next**: Link to other doc pages (plan-format for advanced plans, cli-reference for all commands, agents for multi-provider setup).

   **plan-format.mdx** (order: 2) — Title: "Plan Format"
   Write a comprehensive plan format reference with these sections:
   - **Overview**: Plans are markdown files with a specific structure. Workbench parses them into a dependency graph of tasks.
   - **Plan Structure**: Three top-level sections: `## Context` (project description, injected into every agent prompt), `## Conventions` (coding standards, also injected into every prompt), `## Task: <title>` (individual work items).
   - **Task Metadata**: Explain `Files:` (comma-separated list of files the task creates/modifies, prevents merge conflicts), `Depends:` (comma-separated task slugs this depends on). Mention aliases: `Scope:` = `Files:`, `After:`/`Dependencies:` = `Depends:`.
   - **Dependency Slugs**: Title is converted to slug: lowercase, non-alphanumeric → hyphens. Example: "User Model" → `user-model`. Show a table of title → slug examples.
   - **Waves**: Tasks without dependencies run in Wave 1 (parallel). Tasks depending on Wave 1 tasks run in Wave 2, etc. Include a diagram-like text example showing how 4 tasks get sorted into 2 waves.
   - **Writing Good Tasks**: Each task runs in isolation — the agent only sees its own description. Checklist: what to build, where (file paths), how (function signatures), how it fits (imports/interfaces), test command. Show a "bad" (vague) vs "good" (detailed) task example.
   - **Avoiding Merge Conflicts**: Parallel tasks must not touch the same files. If two tasks need the same file, add a dependency between them or extract shared work into an earlier wave.

   **cli-reference.mdx** (order: 3) — Title: "CLI Reference"
   Write a complete CLI reference with these sections:
   - **wb run**: Primary command. `wb run <plan.md> [options]`. Flags table:
     - `--tdd` — enable test-driven development mode
     - `--skip-test` — skip the test stage
     - `--skip-review` — skip the review stage
     - `--base <branch>` — branch from a specific branch instead of main
     - `--local` — use local branch ref instead of fetching from origin
     - `-b <branch>` / `--session-branch <branch>` — resume a previous session branch
     - `-w <N>` / `--start-wave <N>` — start from a specific wave (for resuming)
     - `--max-retries <N>` — max fix attempts per task (default: 2)
     - `--reviewer-directive "<text>"` — custom instructions for the reviewer agent
     - `--tester-directive "<text>"` — custom instructions for the tester agent
   - **wb preview**: `wb preview <plan.md>` — dry-run showing parsed tasks, dependency graph, and wave assignments. No code is executed.
   - **wb status**: Shows active workbench sessions, running agents, worktree status.
   - **wb stop**: Kill all active agent sessions. `--cleanup` flag also removes worktrees and branches.
   - **wb clean**: Remove all workbench-created git worktrees.
   - **wb setup**: Initialize a repo for workbench — creates `.workbench/` directory.
   - **wb init**: Install workbench skill files for your agent platform.
   - **wb profile**: Subcommands for managing agent profiles:
     - `wb profile init` — create default profile
     - `wb profile set <role> <agent>` — assign an agent to a role
     - `wb profile show` — display current profile
     - `wb profile diff` — show differences from default

   **agents.mdx** (order: 4) — Title: "Agents"
   Write an agents guide with these sections:
   - **Supported Agents**: Claude Code (default, `claude` command), Gemini CLI (`gemini` command), OpenAI Codex (`codex` command). Each agent goes through the same pipeline: implement → test → review → fix.
   - **Default Agent**: Claude Code is the default for all roles. No configuration needed if using Claude Code.
   - **Multi-Provider Setup**: Use `.workbench/agents.yaml` to configure which agent handles which role. Show example YAML:
     ```yaml
     implementor: claude
     tester: gemini
     reviewer: claude
     ```
   - **Custom Agents**: You can add any CLI tool as an agent. Show the agents.yaml format for custom agents with command, args, and environment variables.
   - **Directive Overrides**: Override agent instructions from the CLI without modifying the plan: `wb run plan.md --reviewer-directive "Focus on security"`, `wb run plan.md --tester-directive "Use pytest -x"`. Explain these are appended to the default role prompts.
   - **Agent Roles**: Explain the four pipeline roles: Implementor (writes code), Tester (runs/writes tests), Reviewer (reviews the diff), Fixer (addresses failures). Plus the Merger role that handles merge conflicts between parallel branches.

   **profiles.mdx** (order: 5) — Title: "Profiles"
   Write a profiles guide with these sections:
   - **What Are Profiles**: Profiles let you save per-project agent configurations — which agent handles which role, and custom directives for each.
   - **Creating a Profile**: `wb profile init` creates a default profile in `.workbench/profile.yaml`. Show the default profile contents.
   - **Assigning Agents to Roles**: `wb profile set implementor gemini` — changes the implementor to Gemini CLI. `wb profile set reviewer claude` — etc. Show a few examples.
   - **Viewing Your Profile**: `wb profile show` displays the current configuration. Show example output.
   - **Comparing to Defaults**: `wb profile diff` shows what you've changed from the default profile.
   - **When to Use Profiles**: Different projects may benefit from different agent assignments. Example: use Gemini for fast implementation, Claude for thorough reviews. Profiles save this per-repo.

   **tdd-mode.mdx** (order: 6) — Title: "TDD Mode"
   Write a TDD mode guide with these sections:
   - **Overview**: TDD mode inverts the normal pipeline. Instead of implement → test, it runs test → implement → test → review → fix. The tester writes comprehensive failing tests first, then the implementor writes code to make them pass.
   - **Usage**: `wb run plan.md --tdd`. Can be combined with other flags like `--base` or `--skip-review`.
   - **How It Works**: Step-by-step: (1) Tester agent reads the task description and writes failing tests that specify the expected behavior. (2) Implementor agent receives the failing tests and writes code to make all tests pass. (3) Tester runs again to verify all tests pass. (4) Reviewer checks the implementation. (5) Fixer addresses any issues.
   - **Writing Plans for TDD**: Task descriptions should focus on behavior specifications rather than implementation details. The tester needs to know WHAT the code should do, not HOW. Show an example task description optimized for TDD.
   - **When to Use TDD**: Good for: well-specified behaviors, critical paths, code that needs comprehensive test coverage. Less useful for: exploratory work, UI components, configuration changes.

### Test plan
- `npm run build` passes — lib files have no type errors
- Importing `getAllDocs()` returns 6 docs sorted by order

## Task: Landing components
Files: components/landing/hero.tsx, components/landing/features.tsx, components/landing/how-it-works.tsx, components/landing/code-example.tsx, components/landing/cta-footer.tsx
Depends: project-scaffold

Build all landing page section components. These are Server Components unless noted.

### Dependencies from other tasks

This task imports `CopyButton` from `@/components/shared/copy-button` (built in the shared-components task, Wave 2). Its interface:
- Named export: `CopyButton`
- `"use client"` component
- Props: `{ text: string; className?: string }`
- Renders a button that copies `text` to clipboard on click. Shows a copy icon, then a checkmark for 2 seconds after copying.
- Usage: `<CopyButton text="pip install wbcli" />`

### Implementation

1. **components/landing/hero.tsx** — Named export `Hero`
   - Large headline: "Ultra-lightweight multi-agent orchestrator for any setup"
   - Subheadline: "Write a plan. Run one command. AI agents build your code in parallel — across isolated git worktrees."
   - Install command with `<CopyButton text="pip install wbcli" />` (import from `@/components/shared/copy-button`)
   - "Get Started" button (indigo gradient, links to `/docs/getting-started`) and "View on GitHub" button (outline style, links to repo)
   - Terminal mockup below the CTA: a styled dark box showing `$ wb run plan.md` with simulated output lines showing parallel task execution with status indicators (✓, ⟳, ○)
   - The terminal mockup is static HTML/CSS — no animation needed for initial scaffold

2. **components/landing/features.tsx** — Named export `Features`
   - Section heading: "Everything you need to orchestrate AI agents"
   - 2x3 grid of feature cards, each with:
     - An icon (use simple inline SVG or emoji-based icons)
     - Title and short description
   - Features:
     - **Multi-Agent Support** — "Claude Code, Gemini CLI, Codex, or your own custom agent"
     - **Parallel Execution** — "Independent tasks run simultaneously in isolated git worktrees"
     - **Dependency Waves** — "Automatic task ordering respects dependencies between work"
     - **TDD Mode** — "Tests first, implementation second — built into the pipeline"
     - **Smart Profiles** — "Configure agent roles, directives, and assignments per project"
     - **Auto-Merge** — "Parallel branches merged automatically with conflict resolution"
   - Cards styled with `bg-brand-bg-secondary border border-brand-bg-tertiary rounded-xl p-6`

3. **components/landing/how-it-works.tsx** — Named export `HowItWorks`
   - Section heading: "How it works"
   - 3 horizontal steps connected by lines/arrows:
     - Step 1: "Write a plan" — icon + "Describe tasks in a markdown file with dependencies and file ownership"
     - Step 2: "Run one command" — icon + "`wb run plan.md` dispatches agents in parallel"
     - Step 3: "Ship the result" — icon + "Agents implement, test, review, and merge — you review the PR"
   - Steps in a horizontal row on desktop, vertical on mobile
   - Connecting lines/arrows between steps using CSS borders or SVG

4. **components/landing/code-example.tsx** — Named export `CodeExample`
   - Section heading: "From plan to code in minutes"
   - Side-by-side layout (stacks on mobile):
     - **Left panel:** "plan.md" tab header, then a styled code block showing a sample workbench plan. The plan content should be hardcoded as JSX spans with color classes (not a real code block). Show a plan title "Add user authentication", two task headings ("User model" and "Auth endpoints"), file ownership lines, a depends line, and brief task descriptions. Use green for headings, white for metadata keywords, gray for descriptions.
     - **Right panel:** "terminal" tab header, then styled terminal output showing `wb run plan.md` with wave progress: Wave 1 running 2 tasks in parallel (user-model and product-model with completion times), Wave 2 running 1 task (auth-endpoints), and a final "All tasks complete" message. Use green for checkmarks, yellow for spinners, gray for timing.
   - Both panels use `bg-brand-bg-secondary rounded-xl` with monospace font
   - All text content is hardcoded as styled JSX — no markdown parsing or highlighting library needed

5. **components/landing/cta-footer.tsx** — Named export `CTAFooter`
   - Dark section with subtle gradient background
   - Heading: "Get started in 60 seconds"
   - Install command: `pip install wbcli` with `<CopyButton>`
   - Two buttons: "Read the docs" (primary, links to `/docs`) and "View on GitHub" (secondary, links to repo)

### Test plan
- `npm run build` passes
- All components export correctly with no type errors

## Task: Marketing layout
Files: app/(marketing)/layout.tsx, app/(marketing)/page.tsx
Depends: shared-components, landing-components

Assemble the landing page from the section components.

### Dependencies from other tasks

**From shared-components (Wave 2):**
- `Nav` from `@/components/shared/nav` — `"use client"`, no props. Renders sticky top nav with logo, Docs link, GitHub link, and "Get Started" button. Has mobile hamburger menu.
- `Footer` from `@/components/shared/footer` — Server Component, no props. Renders footer with three link columns and attribution.

**From landing-components (Wave 2):**
All are Server Components with no props, imported as named exports:
- `Hero` from `@/components/landing/hero` — Hero section with headline, subheadline, install command, CTA buttons, terminal mockup
- `Features` from `@/components/landing/features` — 2x3 feature card grid
- `HowItWorks` from `@/components/landing/how-it-works` — 3-step horizontal flow
- `CodeExample` from `@/components/landing/code-example` — Side-by-side plan + terminal output
- `CTAFooter` from `@/components/landing/cta-footer` — Bottom CTA with install command and buttons

### Implementation

1. **app/(marketing)/layout.tsx** — Marketing layout wrapper:
   - Import `Nav` from `@/components/shared/nav` and `Footer` from `@/components/shared/footer`
   - Render: `<Nav />`, then `{children}`, then `<Footer />`
   - Full-width layout, no sidebar
   - `<main>` wrapper with no max-width constraint (sections handle their own max-width)

2. **app/(marketing)/page.tsx** — Landing page:
   - Import all landing components: `Hero`, `Features`, `HowItWorks`, `CodeExample`, `CTAFooter`
   - Render in order: `<Hero />`, `<HowItWorks />`, `<Features />`, `<CodeExample />`, `<CTAFooter />`
   - Each section wrapped in `<section>` with consistent vertical padding (`py-20` or `py-24`)
   - Sections alternate subtle background variations for visual separation
   - Page metadata: title "workbench — Ultra-lightweight multi-agent orchestrator", description matching the hero subheadline

### Test plan
- `npm run build` passes
- `npm run dev` — visiting `http://localhost:3000` shows the full landing page with all sections
- Nav links work, CopyButton copies text

## Task: Docs layout
Files: app/(docs)/docs/layout.tsx, app/(docs)/docs/[[...slug]]/page.tsx, components/docs/sidebar.tsx, components/docs/toc.tsx, components/docs/mdx-components.tsx
Depends: shared-components, mdx-infrastructure

Build the docs layout with sidebar navigation, table of contents, and MDX rendering.

### Dependencies from other tasks

**From shared-components (Wave 2):**
- `Nav` from `@/components/shared/nav` — `"use client"`, no props. Sticky top nav with logo, links, mobile menu.
- `Footer` from `@/components/shared/footer` — Server Component, no props. Footer with link columns.

**From mdx-infrastructure (Wave 2) — `@/lib/docs`:**
```typescript
interface DocMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
}

// Returns all docs sorted by `order`, reads from content/docs/*.mdx
function getAllDocs(): DocMeta[]

// Returns a single doc's metadata + raw MDX content string
function getDocBySlug(slug: string): { meta: DocMeta; content: string }

// Returns all slugs for generateStaticParams
function getDocSlugs(): string[]
```

**From mdx-infrastructure (Wave 2) — `@/lib/mdx`:**
```typescript
// RSC component that renders raw MDX source with rehype-pretty-code syntax highlighting.
// Uses next-mdx-remote/rsc — pass raw MDX string as `source` prop, NOT serialized.
// Pass custom component overrides via `components` prop.
function MDXContent(props: { source: string; components?: Record<string, React.ComponentType<any>> }): JSX.Element

// Extracts h2 and h3 headings from raw MDX content string using regex.
// Returns array of { id: string (slugified), text: string, level: number (2 or 3) }
function extractHeadings(content: string): { id: string; text: string; level: number }[]
```

### Implementation

1. **components/docs/sidebar.tsx** — Named export `Sidebar`
   - `"use client"` (needs active state based on current path)
   - Props: `docs: { slug: string; title: string }[]`
   - Renders a vertical nav list of doc links
   - Each link: `next/link` to `/docs/${slug}`
   - Active link highlighted with `bg-brand-accent-primary/10 text-brand-accent-primary` and left border
   - Inactive links: `text-brand-text-secondary hover:text-brand-text-primary`
   - Use `usePathname()` from `next/navigation` to determine active link
   - On mobile: hidden by default, toggled via a "Menu" button (manage open/close state internally)

2. **components/docs/toc.tsx** — Named export `TableOfContents`
   - `"use client"` (needs scroll spy for active heading)
   - Props: `headings: { id: string; text: string; level: number }[]`
   - Renders a list of heading links with indentation based on level (h2 = no indent, h3 = indent)
   - Uses `IntersectionObserver` to highlight the currently visible heading
   - Styled: `text-sm text-brand-text-muted`, active heading gets `text-brand-accent-primary`
   - Fixed position on right side of docs layout, hidden on screens smaller than `xl`

3. **components/docs/mdx-components.tsx** — Named export `mdxComponents`
   - Custom component overrides for MDX rendering via `next-mdx-remote`
   - Override standard HTML elements with Tailwind-styled versions:
     - `h1`: `text-3xl font-bold text-brand-text-primary mt-8 mb-4` with auto-generated `id` for linking
     - `h2`: `text-2xl font-bold text-brand-text-primary mt-8 mb-3` with `id`
     - `h3`: `text-xl font-semibold text-brand-text-primary mt-6 mb-2` with `id`
     - `p`: `text-brand-text-secondary leading-relaxed mb-4`
     - `a`: `text-brand-accent-primary hover:underline`
     - `code` (inline): `bg-brand-bg-tertiary px-1.5 py-0.5 rounded text-sm font-mono`
     - `pre`: `bg-brand-bg-secondary border border-brand-bg-tertiary rounded-xl p-4 overflow-x-auto mb-4` (shiki handles the inner code styling)
     - `ul`/`ol`: proper spacing and list styling with `text-brand-text-secondary`
     - `blockquote`: left border with `border-brand-accent-primary bg-brand-bg-secondary/50 p-4 rounded-r-lg`
   - Export as an object mapping tag names to components

4. **app/(docs)/docs/layout.tsx** — Docs layout:
   - Import `Nav` from `@/components/shared/nav`, `Footer` from `@/components/shared/footer`, `Sidebar` from `@/components/docs/sidebar`
   - Call `getAllDocs()` from `@/lib/docs` to get doc list for sidebar
   - Layout structure:
     ```
     <Nav />
     <div className="max-w-7xl mx-auto flex">
       <Sidebar docs={docs} />    <!-- 64px wide, sticky -->
       <main>{children}</main>     <!-- flex-1 -->
       <!-- TOC rendered by individual pages -->
     </div>
     <Footer />
     ```
   - Sidebar is `w-64 sticky top-16` (below nav), `hidden lg:block` on smaller screens

5. **app/(docs)/docs/[[...slug]]/page.tsx** — Dynamic docs page:
   - `generateStaticParams()` — calls `getDocSlugs()` from `@/lib/docs`, returns `{ slug: [slugValue] }` for each doc
   - `generateMetadata()` — calls `getDocBySlug(slug)`, returns `{ title: meta.title, description: meta.description }`
   - Page component:
     - Extract slug from params: `const slug = params.slug?.[0]`
     - If no slug (visiting `/docs`), redirect to `/docs/getting-started` using `redirect()` from `next/navigation`
     - Call `getDocBySlug(slug)` from `@/lib/docs` to get `{ meta, content }` (content is raw MDX string)
     - Call `extractHeadings(content)` from `@/lib/mdx` to get headings array for TOC
     - Render `<MDXContent source={content} components={mdxComponents} />` from `@/lib/mdx` — this is a Server Component, NOT a client component. Pass `mdxComponents` from `@/components/docs/mdx-components` as the `components` prop.
     - Render `<TableOfContents headings={headings} />` alongside the content
   - Layout: flex row with main content on left, TOC on right
   - Main content area: wrap `MDXContent` in `<article className="prose prose-invert max-w-3xl px-8 py-12">` — the `prose-invert` class from `@tailwindcss/typography` handles dark mode text colors
   - TOC positioned on the right: `hidden xl:block w-56 sticky top-16`

### Test plan
- `npm run build` passes — all 6 doc pages are statically generated
- `npm run dev` — visiting `/docs` redirects to `/docs/getting-started`
- Sidebar navigation works between doc pages
- MDX renders with syntax highlighting
- Table of contents links scroll to headings
