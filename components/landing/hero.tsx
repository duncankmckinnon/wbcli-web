import Link from "next/link";
import { CopyButton } from "@/components/shared/copy-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-bg-primary via-brand-bg-primary to-brand-bg-secondary" />

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary bg-clip-text text-transparent">
            Ultra-lightweight
          </span>{" "}
          multi-agent orchestrator for any setup
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-text-secondary sm:text-xl">
          Write a plan. Run one command. AI agents build your code in parallel
          — across isolated git worktrees.
        </p>

        {/* Install command */}
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-lg border border-brand-bg-tertiary bg-brand-bg-secondary px-5 py-3 font-mono text-sm">
            <span className="text-brand-text-muted">$</span>
            <span className="text-brand-text-primary">pip install wbcli</span>
            <CopyButton
              text="pip install wbcli"
              className="ml-2 text-brand-text-muted hover:text-brand-text-primary transition-colors"
            />
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/docs/getting-started"
            className="rounded-lg bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent-primary/25 transition-all hover:shadow-brand-accent-primary/40 hover:brightness-110"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/duncanmckinnon/wbcli"
            className="rounded-lg border border-brand-bg-tertiary px-6 py-3 text-sm font-semibold text-brand-text-primary transition-colors hover:bg-brand-bg-secondary"
          >
            View on GitHub
          </Link>
        </div>
      </div>

      {/* Terminal mockup */}
      <div className="mx-auto mt-16 max-w-3xl">
        <div className="overflow-hidden rounded-xl border border-brand-bg-tertiary bg-brand-bg-secondary shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-brand-bg-tertiary px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-brand-text-muted">terminal</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm leading-relaxed">
            <div className="text-brand-text-primary">
              <span className="text-brand-text-muted">$</span> wb run plan.md
            </div>
            <div className="mt-4 text-brand-text-secondary">
              <span className="text-brand-accent-primary">workbench</span> v0.9.2
            </div>
            <div className="mt-3 text-brand-text-muted">
              Planning execution for 5 tasks across 3 waves...
            </div>
            <div className="mt-4">
              <div className="text-brand-text-secondary">Wave 1 — 3 tasks in parallel</div>
              <div className="mt-1 flex flex-col gap-1">
                <span>
                  <span className="text-green-400">{"  "}✓</span>{" "}
                  <span className="text-brand-text-primary">task-1</span>{" "}
                  <span className="text-brand-text-muted">user-model</span>{" "}
                  <span className="text-brand-text-muted">(claude)</span>{" "}
                  <span className="text-green-400">done 42s</span>
                </span>
                <span>
                  <span className="text-green-400">{"  "}✓</span>{" "}
                  <span className="text-brand-text-primary">task-2</span>{" "}
                  <span className="text-brand-text-muted">product-model</span>{" "}
                  <span className="text-brand-text-muted">(gemini)</span>{" "}
                  <span className="text-green-400">done 38s</span>
                </span>
                <span>
                  <span className="text-green-400">{"  "}✓</span>{" "}
                  <span className="text-brand-text-primary">task-3</span>{" "}
                  <span className="text-brand-text-muted">shared-types</span>{" "}
                  <span className="text-brand-text-muted">(codex)</span>{" "}
                  <span className="text-green-400">done 25s</span>
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-brand-text-secondary">Wave 2 — 1 task</div>
              <div className="mt-1">
                <span className="text-yellow-400">{"  "}⟳</span>{" "}
                <span className="text-brand-text-primary">task-4</span>{" "}
                <span className="text-brand-text-muted">auth-endpoints</span>{" "}
                <span className="text-brand-text-muted">(claude)</span>{" "}
                <span className="text-yellow-400">running...</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-brand-text-secondary">Wave 3 — 1 task</div>
              <div className="mt-1">
                <span className="text-brand-text-muted">{"  "}○</span>{" "}
                <span className="text-brand-text-primary">task-5</span>{" "}
                <span className="text-brand-text-muted">integration-tests</span>{" "}
                <span className="text-brand-text-muted">(claude)</span>{" "}
                <span className="text-brand-text-muted">waiting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
