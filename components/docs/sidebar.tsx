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

function isDescendantActive(docs: DocItem[], slug: string, pathname: string): boolean {
  const children = docs.filter((d) => d.parent === slug);
  return children.some(
    (d) => pathname === `/docs/${d.slug}` || isDescendantActive(docs, d.slug, pathname)
  );
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
      {items.map((doc) => (
        <NavItem
          key={doc.slug}
          doc={doc}
          docs={docs}
          pathname={pathname}
          depth={depth}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
}

function NavItem({ doc, docs, pathname, depth, onNavigate }: {
  doc: DocItem;
  docs: DocItem[];
  pathname: string;
  depth: number;
  onNavigate: () => void;
}) {
  const href = `/docs/${doc.slug}`;
  const isActive = pathname === href;
  const children = docs.filter((d) => d.parent === doc.slug);
  const hasChildren = children.length > 0;
  const childActive = hasChildren && isDescendantActive(docs, doc.slug, pathname);
  const [isExpanded, setIsExpanded] = useState(isActive || childActive);

  return (
    <li>
      <div className="flex items-center">
        <Link
          href={href}
          onClick={() => {
            onNavigate();
            if (hasChildren) setIsExpanded(true);
          }}
          className={`flex-1 block px-3 py-1.5 rounded-lg text-sm transition-colors ${
            isActive
              ? "bg-brand-accent-primary/10 text-brand-accent-primary border-l-2 border-brand-accent-primary"
              : depth > 0
                ? "text-brand-text-muted hover:text-brand-text-primary"
                : "text-brand-text-secondary hover:text-brand-text-primary"
          }`}
        >
          {doc.title}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-brand-text-muted hover:text-brand-text-primary transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
            >
              <path
                d="M5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
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
