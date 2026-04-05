import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { CodeExample } from "@/components/landing/code-example";

export const metadata: Metadata = {
  title: "workbench — Ultra-lightweight multi-agent orchestrator",
  description:
    "Dispatch AI coding agents in parallel across isolated git worktrees. Supports Claude Code, Gemini CLI, and Codex.",
};

export default function LandingPage() {
  return (
    <>
      <section className="py-24">
        <Hero />
      </section>
      <section className="py-20 bg-brand-bg-secondary/50">
        <HowItWorks />
      </section>
      <section className="py-20">
        <CodeExample />
      </section>
      <section className="py-24 bg-brand-bg-secondary/50">
        <Features />
      </section>
    </>
  );
}
