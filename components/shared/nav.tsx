"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-bg-tertiary bg-brand-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/docs"
            className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://github.com/duncankmckinnon/workbench"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://github.com/duncankmckinnon/workbench/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-bg-tertiary px-3 py-1.5 text-sm text-brand-text-secondary hover:text-yellow-400 hover:border-yellow-400/50 transition-colors"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
            </svg>
            Star
          </a>
          <Link
            href="/docs/getting-started"
            className="rounded-lg bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="text-brand-text-secondary hover:text-brand-text-primary md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div data-testid="mobile-menu" className="border-t border-brand-bg-tertiary px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/docs"
              className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <a
              href="https://github.com/duncankmckinnon/workbench"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="https://github.com/duncankmckinnon/workbench/stargazers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-brand-text-secondary hover:text-yellow-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
              </svg>
              Star on GitHub
            </a>
            <Link
              href="/docs/getting-started"
              className="mt-1 rounded-lg bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary px-4 py-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
