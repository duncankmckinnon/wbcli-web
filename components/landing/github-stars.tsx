const REPO = "duncankmckinnon/workbench";
const STAR_THRESHOLD = 25;

async function getStarCount(): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

export async function GitHubStars() {
  const stars = await getStarCount();

  if (stars < STAR_THRESHOLD) return null;

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hero-fade inline-flex items-center gap-2 rounded-full border border-brand-bg-tertiary bg-brand-bg-secondary/80 px-4 py-1.5 text-sm text-brand-text-secondary transition-colors hover:border-brand-accent-primary/50 hover:text-brand-text-primary"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4 fill-yellow-400"
        aria-hidden="true"
      >
        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
      </svg>
      <span className="font-medium tabular-nums">{stars.toLocaleString()}</span>
      <span className="text-brand-text-muted">stars on GitHub</span>
    </a>
  );
}
