import Link from "next/link";
import Image from "next/image";
import { InstallCommand } from "@/components/landing/install-command";
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
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="hero-line-1 block pb-2 bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary bg-clip-text text-transparent">
            Ultra-lightweight
          </span>
          <span className="hero-line-2 block py-2">
            Multi-agent Orchestrator
          </span>
          <span className="hero-line-3 block pt-2 pb-4 bg-gradient-to-r from-brand-accent-secondary to-brand-accent-tertiary bg-clip-text text-transparent">
            Anywhere you work
          </span>
        </h1>

        <div className="hero-fade mt-10">
          <Image
            src="/workbench-banner-2.png"
            alt="workbench logo"
            width={2436}
            height={1011}
            className="mx-auto max-w-2xl w-full h-auto"
            priority
          />
        </div>

        <p className="hero-fade mx-auto mt-8 max-w-2xl text-lg leading-8 text-brand-text-secondary sm:text-xl">
          Write plan. Run plan. Workbench does the rest.
        </p>

        {/* Install command */}
        <div className="mt-10 flex items-center justify-center">
          <InstallCommand size="lg" />
        </div>

        {/* CTA buttons */}
        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-4">
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
          <a
            href="/downloads/workbench-skills.zip"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-brand-accent-secondary/40 px-6 py-3 text-sm font-semibold text-brand-accent-tertiary transition-colors hover:bg-brand-accent-secondary/10 hover:border-brand-accent-secondary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Skills
          </a>
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
              <span className="text-brand-text-muted">$</span> wb run my-feature
            </div>

            {/* Plan info */}
            <div className="mt-4 space-y-0.5 text-brand-text-secondary">
              <div>Plan: <span className="text-brand-text-primary">My Feature</span></div>
              <div>Tasks: <span className="text-brand-text-primary">4</span> across <span className="text-brand-text-primary">2</span> wave(s)</div>
              <div>Concurrency: <span className="text-brand-text-primary">4</span> · Max retries: <span className="text-brand-text-primary">2</span></div>
              <div>Session branch: <span className="text-brand-text-primary">workbench-1</span></div>
            </div>

            {/* Run table */}
            <div className="mt-5">
              <div className="text-brand-accent-primary text-center mb-1">Workbench</div>
              <table className="w-full border-collapse text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-brand-bg-tertiary text-brand-text-secondary">
                    <th className="py-1 pr-4 font-normal">Task</th>
                    <th className="py-1 pr-4 font-normal text-center">Wave</th>
                    <th className="py-1 pr-4 font-normal">Status</th>
                    <th className="py-1 pr-4 font-normal">Branch</th>
                    <th className="py-1 pr-4 font-normal">Time</th>
                    <th className="py-1 pr-4 font-normal">Pipeline</th>
                    <th className="py-1 font-normal text-center">Merged</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-brand-bg-tertiary/50">
                    <td className="py-1 pr-4 text-brand-text-primary">User model</td>
                    <td className="py-1 pr-4 text-brand-text-muted text-center">1</td>
                    <td className="py-1 pr-4 text-green-400">done</td>
                    <td className="py-1 pr-4 text-brand-text-muted">wb/user-model</td>
                    <td className="py-1 pr-4 text-brand-text-muted">3m42s</td>
                    <td className="py-1 pr-4 text-brand-text-muted">impl:ok → test:pass → review:pass</td>
                    <td className="py-1 text-green-400 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-brand-bg-tertiary/50">
                    <td className="py-1 pr-4 text-brand-text-primary">Auth utils</td>
                    <td className="py-1 pr-4 text-brand-text-muted text-center">1</td>
                    <td className="py-1 pr-4 text-green-400">done</td>
                    <td className="py-1 pr-4 text-brand-text-muted">wb/auth-utils</td>
                    <td className="py-1 pr-4 text-brand-text-muted">2m05s</td>
                    <td className="py-1 pr-4 text-brand-text-muted">impl:ok → test:pass → review:pass</td>
                    <td className="py-1 text-green-400 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-brand-bg-tertiary/50">
                    <td className="py-1 pr-4 text-brand-text-primary">API routes</td>
                    <td className="py-1 pr-4 text-brand-text-muted text-center">2</td>
                    <td className="py-1 pr-4 text-green-400">done</td>
                    <td className="py-1 pr-4 text-brand-text-muted">wb/api-routes</td>
                    <td className="py-1 pr-4 text-brand-text-muted">4m18s</td>
                    <td className="py-1 pr-4 text-brand-text-muted">impl:ok → test:fail → fix → test:pass → review:pass</td>
                    <td className="py-1 text-green-400 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 text-brand-text-primary">Web UI</td>
                    <td className="py-1 pr-4 text-brand-text-muted text-center">2</td>
                    <td className="py-1 pr-4 text-green-400">done</td>
                    <td className="py-1 pr-4 text-brand-text-muted">wb/web-ui</td>
                    <td className="py-1 pr-4 text-brand-text-muted">5m10s</td>
                    <td className="py-1 pr-4 text-brand-text-muted">impl:ok → test:pass → review:pass</td>
                    <td className="py-1 text-green-400 text-center">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-5">
              <div className="text-cyan-400 font-bold">━━━ Summary ━━━</div>
              <div className="mt-1 text-green-400">{"  "}✓ 4 completed</div>
              <div className="mt-1 text-brand-text-muted">
                All changes merged into: <span className="text-brand-text-primary">workbench-1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
