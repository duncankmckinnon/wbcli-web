export function CodeExample() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            From plan to code in minutes
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left panel — plan.md */}
          <div className="overflow-hidden rounded-xl border border-brand-bg-tertiary bg-brand-bg-secondary">
            <div className="flex items-center border-b border-brand-bg-tertiary px-4 py-3">
              <span className="rounded bg-brand-bg-tertiary px-2 py-1 text-xs text-brand-text-secondary">
                plan.md
              </span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div>
                <span className="text-green-400">## Context</span>
              </div>
              <div className="mt-1 text-brand-text-muted">
                Building a REST API with Express and TypeScript...
              </div>

              <div className="mt-4">
                <span className="text-green-400">## Task: User model</span>
              </div>
              <div className="mt-1">
                <span className="text-brand-text-primary">Files:</span>{" "}
                <span className="text-brand-text-secondary">src/models/user.ts, src/db/schema.ts</span>
              </div>
              <div className="mt-1 text-brand-text-muted">
                Create the User model with email, password hash,
              </div>
              <div className="text-brand-text-muted">
                and session fields. Add migration.
              </div>

              <div className="mt-5">
                <span className="text-green-400">## Task: Auth endpoints</span>
              </div>
              <div className="mt-1">
                <span className="text-brand-text-primary">Files:</span>{" "}
                <span className="text-brand-text-secondary">src/routes/auth.ts</span>
              </div>
              <div>
                <span className="text-brand-text-primary">Depends:</span>{" "}
                <span className="text-brand-text-secondary">user-model</span>
              </div>
              <div className="mt-1 text-brand-text-muted">
                Implement login, register, and logout
              </div>
              <div className="text-brand-text-muted">
                endpoints using the User model.
              </div>
            </div>
          </div>

          {/* Right panel — terminal */}
          <div className="overflow-hidden rounded-xl border border-brand-bg-tertiary bg-brand-bg-secondary">
            <div className="flex items-center border-b border-brand-bg-tertiary px-4 py-3">
              <span className="rounded bg-brand-bg-tertiary px-2 py-1 text-xs text-brand-text-secondary">
                terminal
              </span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <div>
                <span className="text-brand-text-muted">$</span>{" "}
                <span className="text-brand-text-primary">wb run plan.md</span>
              </div>

              <div className="mt-4 space-y-0.5 text-brand-text-secondary">
                <div>Tasks: <span className="text-brand-text-primary">2</span> across <span className="text-brand-text-primary">2</span> wave(s)</div>
              </div>

              <div className="mt-4">
                <div className="text-cyan-400 font-bold">—— Wave 1/2 (1 task) ——</div>
                <table className="w-full mt-2 text-left">
                  <thead>
                    <tr className="border-b border-brand-bg-tertiary">
                      <th className="py-1 pr-3 text-brand-text-secondary font-normal">Task</th>
                      <th className="py-1 pr-3 text-brand-text-secondary font-normal">Status</th>
                      <th className="py-1 text-brand-text-secondary font-normal">Pipeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-3 text-brand-text-primary">User model</td>
                      <td className="py-1 pr-3 text-green-400">done</td>
                      <td className="py-1 text-brand-text-muted">impl:ok → test:pass → review:pass</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 text-brand-text-muted">
                  {"  "}✓ Merged 1 branch cleanly.
                </div>
              </div>

              <div className="mt-4">
                <div className="text-cyan-400 font-bold">—— Wave 2/2 (1 task) ——</div>
                <table className="w-full mt-2 text-left">
                  <thead>
                    <tr className="border-b border-brand-bg-tertiary">
                      <th className="py-1 pr-3 text-brand-text-secondary font-normal">Task</th>
                      <th className="py-1 pr-3 text-brand-text-secondary font-normal">Status</th>
                      <th className="py-1 text-brand-text-secondary font-normal">Pipeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-3 text-brand-text-primary">Auth endpoints</td>
                      <td className="py-1 pr-3 text-green-400">done</td>
                      <td className="py-1 text-brand-text-muted">impl:ok → test:fail → fix → test:pass → review:pass</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 text-brand-text-muted">
                  {"  "}✓ Merged 1 branch cleanly.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
