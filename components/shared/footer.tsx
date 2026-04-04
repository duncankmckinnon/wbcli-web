import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Docs", href: "/docs" },
      {
        label: "GitHub",
        href: "https://github.com/duncankmckinnon/workbench",
        external: true,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "CLI Reference", href: "/docs/cli-reference" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "GitHub Issues",
        href: "https://github.com/duncankmckinnon/workbench/issues",
        external: true,
      },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-brand-bg-tertiary bg-brand-bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-brand-text-primary">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-brand-bg-tertiary pt-6 text-center text-sm text-brand-text-muted">
          Built by Duncan McKinnon &middot; MIT License
        </div>
      </div>
    </footer>
  );
}
