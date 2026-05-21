export function CodeExample() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            From plan to code in minutes
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6">
          {/* Top panel — plan with frontmatter */}
          <div className="overflow-hidden rounded-xl border border-brand-bg-tertiary bg-brand-bg-secondary">
            <div className="flex items-center border-b border-brand-bg-tertiary px-4 py-3">
              <span className="rounded bg-brand-bg-tertiary px-2 py-1 text-xs text-brand-text-secondary">
                .workbench/myfeature/plan.md
              </span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-brand-text-muted">---</div>
              <div>
                <span className="text-brand-text-primary">name:</span>{" "}
                <span className="text-brand-text-secondary">myfeature</span>
              </div>
              <div>
                <span className="text-brand-text-primary">max_concurrent:</span>{" "}
                <span className="text-brand-text-secondary">4</span>
              </div>
              <div>
                <span className="text-brand-text-primary">tdd:</span>{" "}
                <span className="text-brand-text-secondary">true</span>
              </div>
              <div>
                <span className="text-brand-text-primary">final_review:</span>{" "}
                <span className="text-brand-text-secondary">true</span>
              </div>
              <div className="text-brand-text-muted">---</div>

              <div className="mt-4">
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

          {/* Bottom panel — terminal */}
          <div className="overflow-hidden rounded-xl border border-brand-bg-tertiary bg-brand-bg-secondary">
            <div className="flex items-center border-b border-brand-bg-tertiary px-4 py-3">
              <span className="rounded bg-brand-bg-tertiary px-2 py-1 text-xs text-brand-text-secondary">
                terminal
              </span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <div>
                <span className="text-brand-text-muted">$</span>{" "}
                <span className="text-brand-text-primary">wb run myfeature --final-review</span>
              </div>

              <div className="mt-4 text-brand-text-secondary">
                Parsed <span className="text-brand-text-primary">2</span> task(s) from .workbench/myfeature/plan.md
              </div>
              <div className="mt-2 space-y-0.5 text-brand-text-muted">
                <div>{"  "}1. User model <span className="text-brand-text-secondary">(src/models/user.ts, src/db/schema.ts)</span></div>
                <div>{"  "}2. Auth endpoints <span className="text-brand-text-secondary">(src/routes/auth.ts)</span></div>
              </div>

              <div className="mt-4 space-y-0.5 text-brand-text-secondary">
                <div>Plan: <span className="text-brand-text-primary">My Feature</span></div>
                <div>Tasks: <span className="text-brand-text-primary">2</span> across <span className="text-brand-text-primary">2</span> wave(s)</div>
                <div>Concurrency: <span className="text-brand-text-primary">4</span></div>
                <div>Max retries: <span className="text-brand-text-primary">2</span></div>
                <div>Repo: <span className="text-brand-text-primary">~/code/myfeature</span></div>
                <div>Session branch: <span className="text-brand-text-primary">myfeature</span></div>
                <div>tmux: <span className="text-brand-text-primary">enabled</span></div>
              </div>

              <div className="mt-5">
                <div className="text-brand-accent-primary text-center mb-1">Workbench</div>
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-brand-bg-tertiary text-brand-text-secondary">
                      <th className="py-1 pr-3 font-normal">Task</th>
                      <th className="py-1 pr-3 font-normal text-center">Wave</th>
                      <th className="py-1 pr-3 font-normal">Status</th>
                      <th className="py-1 pr-3 font-normal">Branch</th>
                      <th className="py-1 pr-3 font-normal">Time</th>
                      <th className="py-1 pr-3 font-normal">Pipeline</th>
                      <th className="py-1 font-normal text-center">Merged</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-brand-bg-tertiary/50">
                      <td className="py-1 pr-3 text-brand-text-primary">User model</td>
                      <td className="py-1 pr-3 text-brand-text-muted text-center">1</td>
                      <td className="py-1 pr-3 text-green-400">done</td>
                      <td className="py-1 pr-3 text-brand-text-muted">wb/user-model</td>
                      <td className="py-1 pr-3 text-brand-text-muted">2m05s</td>
                      <td className="py-1 pr-3 text-brand-text-muted">test:fail → impl:ok → test:pass → review:pass</td>
                      <td className="py-1 text-green-400 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3 text-brand-text-primary">Auth endpoints</td>
                      <td className="py-1 pr-3 text-brand-text-muted text-center">2</td>
                      <td className="py-1 pr-3 text-green-400">done</td>
                      <td className="py-1 pr-3 text-brand-text-muted">wb/auth-endpoints</td>
                      <td className="py-1 pr-3 text-brand-text-muted">4m18s</td>
                      <td className="py-1 pr-3 text-brand-text-muted">test:fail → impl:ok → test:fail → fix → test:pass → review:pass</td>
                      <td className="py-1 text-green-400 text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5">
                <div className="text-cyan-400 font-bold">━━━ Summary ━━━</div>
                <div className="mt-1 text-green-400">{"  "}✓ 2 completed</div>
                <div className="mt-1 text-brand-text-muted">
                  All changes merged into: <span className="text-brand-text-primary">myfeature</span>
                </div>
                <div className="text-brand-text-muted">{"  "}git checkout myfeature</div>
                <div className="text-brand-text-muted">{"  "}git diff main...myfeature</div>
              </div>

              <div className="mt-5">
                <div className="text-brand-accent-primary text-center mb-1">Post-task agents</div>
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-brand-bg-tertiary text-brand-text-secondary">
                      <th className="py-1 pr-3 font-normal">Agent</th>
                      <th className="py-1 pr-3 font-normal">Status</th>
                      <th className="py-1 pr-3 font-normal">Time</th>
                      <th className="py-1 font-normal">Output / Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-brand-bg-tertiary/50">
                      <td className="py-1 pr-3 text-brand-text-primary">Summarizer</td>
                      <td className="py-1 pr-3 text-green-400">done</td>
                      <td className="py-1 pr-3 text-brand-text-muted">1m40s</td>
                      <td className="py-1 text-brand-text-muted">.workbench/myfeature/wrap-up/myfeature/requirements.md</td>
                    </tr>
                    <tr className="border-b border-brand-bg-tertiary/50">
                      <td className="py-1 pr-3 text-brand-text-primary">Branch reviewer</td>
                      <td className="py-1 pr-3 text-green-400">done</td>
                      <td className="py-1 pr-3 text-brand-text-muted">3m20s</td>
                      <td className="py-1 text-brand-text-muted">.workbench/myfeature/wrap-up/myfeature/review.md</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3 text-brand-text-primary">PR writer</td>
                      <td className="py-1 pr-3 text-green-400">done</td>
                      <td className="py-1 pr-3 text-brand-text-muted">0m52s</td>
                      <td className="py-1 text-brand-text-muted">https://github.com/you/myfeature/pull/42</td>
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
