import Link from "next/link";
import { CopyButton } from "@/components/shared/copy-button";

export function CTAFooter() {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-8">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-bg-primary via-brand-bg-secondary to-brand-bg-primary" />

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Get started in 60 seconds
        </h2>

        {/* Install command */}
        <div className="mt-8 flex items-center justify-center">
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
            href="/docs"
            className="rounded-lg bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent-primary/25 transition-all hover:shadow-brand-accent-primary/40 hover:brightness-110"
          >
            Read the docs
          </Link>
          <Link
            href="https://github.com/duncanmckinnon/wbcli"
            className="rounded-lg border border-brand-bg-tertiary px-6 py-3 text-sm font-semibold text-brand-text-primary transition-colors hover:bg-brand-bg-secondary"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
