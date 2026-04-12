import { getAllDocs } from "@/lib/docs";

const BASE_URL = "https://wbcli.com";

export function GET() {
  const docs = getAllDocs();

  const docLinks = docs
    .map((doc) => `- [${doc.title}](${BASE_URL}/docs/${doc.slug}): ${doc.description}`)
    .join("\n");

  const content = `# workbench

> Ultra-lightweight multi-agent orchestrator for any setup. Write a plan. Run one command. AI agents build your code in parallel — across isolated git worktrees.

workbench (\`wbcli\` on PyPI) is a Python CLI that dispatches AI coding agents in parallel across isolated git worktrees. Users write markdown plans with tasks, dependencies, and file ownership; workbench parses the plan into dependency waves, creates isolated worktrees, and runs each task through an implement → test → review → fix pipeline. Supports Claude Code, Gemini CLI, OpenAI Codex, Cursor CLI, and custom agent adapters.

## Documentation

${docLinks}

## Key Resources

- [GitHub Repository](https://github.com/duncankmckinnon/workbench)
- [PyPI Package](https://pypi.org/project/wbcli/)
- [Skills Download](${BASE_URL}/downloads/workbench-skills.zip)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
