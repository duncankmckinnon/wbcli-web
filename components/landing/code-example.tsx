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
                <span className="text-green-400"># Add user authentication</span>
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
                <span className="text-brand-text-primary">Depends:</span>{" "}
                <span className="text-brand-text-secondary">user-model</span>
              </div>
              <div>
                <span className="text-brand-text-primary">Files:</span>{" "}
                <span className="text-brand-text-secondary">src/routes/auth.ts</span>
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
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div>
                <span className="text-brand-text-muted">$</span>{" "}
                <span className="text-brand-text-primary">wb run plan.md</span>
              </div>

              <div className="mt-4">
                <span className="text-brand-text-secondary">Wave 1</span>
                <span className="text-brand-text-muted"> — 2 tasks in parallel</span>
              </div>
              <div className="mt-1">
                <span className="text-green-400">{"  "}✓</span>{" "}
                <span className="text-brand-text-primary">user-model</span>{" "}
                <span className="text-green-400">done 42s</span>
              </div>
              <div>
                <span className="text-green-400">{"  "}✓</span>{" "}
                <span className="text-brand-text-primary">product-model</span>{" "}
                <span className="text-green-400">done 38s</span>
              </div>

              <div className="mt-4">
                <span className="text-brand-text-secondary">Wave 2</span>
                <span className="text-brand-text-muted"> — 1 task</span>
              </div>
              <div className="mt-1">
                <span className="text-green-400">{"  "}✓</span>{" "}
                <span className="text-brand-text-primary">auth-endpoints</span>{" "}
                <span className="text-green-400">done 1m 15s</span>
              </div>

              <div className="mt-4 text-green-400">
                ✓ All tasks complete
              </div>
              <div className="mt-1 text-brand-text-muted">
                3 branches merged into main
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
