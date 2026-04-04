import type { ReactNode } from "react";

const steps: { number: string; title: string; description: ReactNode; icon: ReactNode }[] = [
  {
    number: "1",
    title: "Write a plan",
    description:
      "Describe tasks in a markdown file with dependencies and file ownership",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Run one command",
    description: (
      <>
        <code className="rounded bg-brand-bg-tertiary px-1.5 py-0.5 text-xs font-mono text-brand-accent-tertiary">
          wb run plan.md
        </code>{" "}
        dispatches agents in parallel
      </>
    ),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Ship the result",
    description:
      "Agents implement, test, review, and merge — you review the PR",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
        </div>

        <div className="relative mt-16">
          {/* Connecting line — desktop only */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-brand-bg-tertiary to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Step number badge */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-accent-primary to-brand-accent-secondary text-white shadow-lg shadow-brand-accent-primary/25">
                  {step.icon}
                </div>

                {/* Arrow — mobile only, between steps */}
                {index < steps.length - 1 && (
                  <div className="my-4 text-brand-bg-tertiary lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  </div>
                )}

                <h3 className="mt-6 text-xl font-semibold text-brand-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
