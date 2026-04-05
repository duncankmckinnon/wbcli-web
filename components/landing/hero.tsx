import Link from "next/link";
import { CopyButton } from "@/components/shared/copy-button";
import { GitHubStars } from "@/components/landing/github-stars";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <style>{`
        @keyframes heroLineIn {
          from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .hero-line-1 { animation: heroLineIn 0.6s ease-out 0.1s both; }
        .hero-line-2 { animation: heroLineIn 0.6s ease-out 0.5s both; }
        .hero-line-3 { animation: heroLineIn 0.6s ease-out 0.9s both; }
        .hero-fade { animation: heroLineIn 0.6s ease-out 1.3s both; }
      `}</style>
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-bg-primary via-brand-bg-primary to-brand-bg-secondary" />

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
          <span className="hero-line-1 block bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary bg-clip-text text-transparent">
            Ultra-lightweight
          </span>
          <span className="hero-line-2 block">
            Multi-agent Orchestrator
          </span>
          <span className="hero-line-3 block uppercase tracking-wider">
            Anywhere you work
          </span>
        </h1>

        <p className="hero-fade mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-text-secondary sm:text-xl">
          Write plan. Run plan. Workbench does the rest.
        </p>

        {/* Install command */}
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center gap-4 rounded-xl border border-brand-bg-tertiary bg-brand-bg-secondary px-6 py-4 font-mono text-lg sm:text-xl">
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
            href="https://github.com/duncankmckinnon/workbench"
            className="rounded-lg border border-brand-bg-tertiary px-6 py-3 text-sm font-semibold text-brand-text-primary transition-colors hover:bg-brand-bg-secondary"
          >
            View on GitHub
          </Link>
        </div>

        {/* GitHub stars counter — only renders when ≥ 25 stars */}
        <div className="mt-6 flex justify-center">
          <GitHubStars />
        </div>
      </div>

      {/* Terminal mockup */}
      <div className="hero-fade mx-auto mt-16 max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-brand-bg-tertiary bg-brand-bg-secondary shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-brand-bg-tertiary px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-brand-text-muted">terminal</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            {/* Command */}
            <div className="text-brand-text-primary">
              <span className="text-brand-text-muted">$</span> wb run plan.md
            </div>

            {/* Plan info */}
            <div className="mt-4 space-y-0.5 text-brand-text-secondary">
              <div>Plan: <span className="text-brand-text-primary">API Authentication System</span></div>
              <div>Tasks: <span className="text-brand-text-primary">5</span> across <span className="text-brand-text-primary">3</span> wave(s)</div>
              <div>Concurrency: <span className="text-brand-text-primary">4</span></div>
            </div>

            {/* Wave 1 */}
            <div className="mt-5">
              <div className="text-cyan-400 font-bold">—— Wave 1/3 (3 tasks) ——</div>
              <div className="mt-3">
                <div className="text-brand-accent-primary text-center mb-1">Workbench</div>
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-brand-bg-tertiary">
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Task</th>
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Status</th>
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Time</th>
                      <th className="py-1 text-brand-text-secondary font-normal">Pipeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-brand-bg-tertiary/50">
                      <td className="py-1 pr-4 text-brand-text-primary">User model</td>
                      <td className="py-1 pr-4 text-green-400">done</td>
                      <td className="py-1 pr-4 text-brand-text-muted">3m42s</td>
                      <td className="py-1 text-brand-text-muted">impl:ok → test:pass → review:pass</td>
                    </tr>
                    <tr className="border-b border-brand-bg-tertiary/50">
                      <td className="py-1 pr-4 text-brand-text-primary">Auth tokens</td>
                      <td className="py-1 pr-4 text-green-400">done</td>
                      <td className="py-1 pr-4 text-brand-text-muted">4m18s</td>
                      <td className="py-1 text-brand-text-muted">impl:ok → test:fail → fix → test:pass → review:pass</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-brand-text-primary">Shared types</td>
                      <td className="py-1 pr-4 text-green-400">done</td>
                      <td className="py-1 pr-4 text-brand-text-muted">2m05s</td>
                      <td className="py-1 text-brand-text-muted">impl:ok → test:pass → review:pass</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-brand-text-secondary">
                Merging <span className="font-bold">3 branch</span>(es) into scaffold...
              </div>
              <div className="text-brand-text-muted">
                {"  "}✓ wb/user-model — Merged cleanly.
              </div>
              <div className="text-brand-text-muted">
                {"  "}✓ wb/auth-tokens — Merged cleanly.
              </div>
              <div className="text-brand-text-muted">
                {"  "}✓ wb/shared-types — Merged cleanly.
              </div>
            </div>

            {/* Wave 2 */}
            <div className="mt-5">
              <div className="text-cyan-400 font-bold">—— Wave 2/3 (1 task) ——</div>
              <div className="mt-3">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-brand-bg-tertiary">
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Task</th>
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Status</th>
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Time</th>
                      <th className="py-1 text-brand-text-secondary font-normal">Pipeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-brand-text-primary">Auth middleware</td>
                      <td className="py-1 pr-4 text-yellow-400">running</td>
                      <td className="py-1 pr-4 text-brand-text-muted">2m31s</td>
                      <td className="py-1 text-brand-text-muted">impl:ok → test:pass → <span className="text-yellow-400">review...</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wave 3 */}
            <div className="mt-5">
              <div className="text-brand-text-muted font-bold">—— Wave 3/3 (1 task) ——</div>
              <div className="mt-3">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-brand-bg-tertiary">
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Task</th>
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Status</th>
                      <th className="py-1 pr-4 text-brand-text-secondary font-normal">Time</th>
                      <th className="py-1 text-brand-text-secondary font-normal">Pipeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-brand-text-primary">API endpoints</td>
                      <td className="py-1 pr-4 text-brand-text-muted">waiting</td>
                      <td className="py-1 pr-4 text-brand-text-muted">—</td>
                      <td className="py-1 text-brand-text-muted">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
