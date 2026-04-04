import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock dependencies used by DocsLayout
vi.mock("@/components/shared/nav", () => ({
  Nav: () => <nav data-testid="nav">Nav</nav>,
}));

vi.mock("@/components/shared/footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/components/docs/sidebar", () => ({
  Sidebar: ({ docs }: { docs: { slug: string; title: string }[] }) => (
    <aside data-testid="sidebar">
      {docs.map((d) => (
        <span key={d.slug}>{d.title}</span>
      ))}
    </aside>
  ),
}));

vi.mock("@/lib/docs", () => ({
  getAllDocs: () => [
    {
      slug: "getting-started",
      title: "Getting Started",
      description: "Get started with workbench",
      order: 1,
    },
    {
      slug: "plan-format",
      title: "Plan Format",
      description: "Learn the plan format",
      order: 2,
    },
  ],
}));

// Import after mocks are set up
import DocsLayout from "@/app/(docs)/docs/layout";

describe("DocsLayout", () => {
  it("renders Nav, Sidebar, main content area, and Footer", () => {
    render(
      <DocsLayout>
        <div data-testid="child">Page content</div>
      </DocsLayout>
    );

    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("passes doc titles to Sidebar", () => {
    render(
      <DocsLayout>
        <div>Content</div>
      </DocsLayout>
    );

    expect(screen.getByText("Getting Started")).toBeInTheDocument();
    expect(screen.getByText("Plan Format")).toBeInTheDocument();
  });

  it("renders main element with flex-1 and min-w-0", () => {
    render(
      <DocsLayout>
        <div data-testid="child">Content</div>
      </DocsLayout>
    );

    const main = screen.getByRole("main");
    expect(main.className).toContain("flex-1");
    expect(main.className).toContain("min-w-0");
  });

  it("wraps content in max-w-7xl container with flex layout", () => {
    const { container } = render(
      <DocsLayout>
        <div>Content</div>
      </DocsLayout>
    );

    const wrapper = container.querySelector(".max-w-7xl");
    expect(wrapper).not.toBeNull();
    expect(wrapper!.className).toContain("flex");
    expect(wrapper!.className).toContain("mx-auto");
    expect(wrapper!.className).toContain("min-h-screen");
  });

  it("renders Nav before content and Footer after", () => {
    const { container } = render(
      <DocsLayout>
        <div>Content</div>
      </DocsLayout>
    );

    const nav = container.querySelector('[data-testid="nav"]');
    const footer = container.querySelector('[data-testid="footer"]');
    const main = container.querySelector("main");

    // Nav should come before main in DOM order
    expect(
      nav!.compareDocumentPosition(main!) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    // Footer should come after main
    expect(
      footer!.compareDocumentPosition(main!) & Node.DOCUMENT_POSITION_PRECEDING
    ).toBeTruthy();
  });

  it("is a default export (Next.js layout convention)", async () => {
    const mod = await import("@/app/(docs)/docs/layout");
    expect(mod.default).toBeDefined();
  });
});
