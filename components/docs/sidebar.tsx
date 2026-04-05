"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DocItem {
  slug: string;
  title: string;
  parent?: string;
}

interface SidebarProps {
  docs: DocItem[];
}

function NavTree({ docs, pathname, parentSlug, depth, onNavigate }: {
  docs: DocItem[];
  pathname: string;
  parentSlug?: string;
  depth: number;
  onNavigate: () => void;
}) {
  const items = docs.filter((d) =>
    parentSlug ? d.parent === parentSlug : !d.parent
  );

  if (items.length === 0) return null;

  return (
    <ul className={depth > 0 ? "ml-4 mt-1 space-y-0.5" : "space-y-1"}>
      {items.map((doc) => {
        const href = `/docs/${doc.slug}`;
        const isActive = pathname === href;
        const children = docs.filter((d) => d.parent === doc.slug);

        return (
          <li key={doc.slug}>
            <Link
              href={href}
              onClick={onNavigate}
              className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-brand-accent-primary/10 text-brand-accent-primary border-l-2 border-brand-accent-primary"
                  : depth > 0
                    ? "text-brand-text-muted hover:text-brand-text-primary"
                    : "text-brand-text-secondary hover:text-brand-text-primary"
              }`}
            >
              {doc.title}
            </Link>
            {children.length > 0 && (
              <NavTree
                docs={docs}
                pathname={pathname}
                parentSlug={doc.slug}
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Sidebar({ docs }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <NavTree
      docs={docs}
      pathname={pathname}
      depth={0}
      onNavigate={() => setIsOpen(false)}
    />
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-brand-accent-primary text-white px-4 py-2 rounded-full shadow-lg"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-brand-bg-primary border-r border-brand-bg-tertiary p-4 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav>{navLinks}</nav>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-brand-bg-tertiary p-4">
        <nav>{navLinks}</nav>
      </aside>
    </>
  );
}
