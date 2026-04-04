import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "@/components/docs/sidebar";

// Mock next/navigation
const mockPathname = vi.fn().mockReturnValue("/docs/getting-started");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: any;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const sampleDocs = [
  { slug: "getting-started", title: "Getting Started" },
  { slug: "plan-format", title: "Plan Format" },
  { slug: "cli-reference", title: "CLI Reference" },
  { slug: "agents", title: "Agents" },
];

describe("Sidebar", () => {
  it("renders without crashing", () => {
    render(<Sidebar docs={sampleDocs} />);
    // Should have navigation elements (desktop sidebar)
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThan(0);
  });

  it("is a named export, not a default export", async () => {
    const mod = await import("@/components/docs/sidebar");
    expect(mod.Sidebar).toBeDefined();
    expect(mod).not.toHaveProperty("default");
  });

  it("renders all doc links", () => {
    render(<Sidebar docs={sampleDocs} />);
    for (const doc of sampleDocs) {
      // Each title appears in both mobile and desktop sidebars
      const links = screen.getAllByText(doc.title);
      expect(links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("links point to correct /docs/<slug> paths", () => {
    render(<Sidebar docs={sampleDocs} />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    for (const doc of sampleDocs) {
      expect(hrefs).toContain(`/docs/${doc.slug}`);
    }
  });

  it("highlights the active link based on current pathname", () => {
    mockPathname.mockReturnValue("/docs/getting-started");
    render(<Sidebar docs={sampleDocs} />);
    const activeLinks = screen.getAllByText("Getting Started");
    // At least one link should have active styling
    const hasActive = activeLinks.some(
      (link) =>
        link.className.includes("bg-brand-accent-primary/10") &&
        link.className.includes("text-brand-accent-primary")
    );
    expect(hasActive).toBe(true);
  });

  it("active link has left border styling", () => {
    mockPathname.mockReturnValue("/docs/getting-started");
    render(<Sidebar docs={sampleDocs} />);
    const activeLinks = screen.getAllByText("Getting Started");
    const hasActiveBorder = activeLinks.some((link) =>
      link.className.includes("border-brand-accent-primary")
    );
    expect(hasActiveBorder).toBe(true);
  });

  it("inactive links have secondary text styling", () => {
    mockPathname.mockReturnValue("/docs/getting-started");
    render(<Sidebar docs={sampleDocs} />);
    const inactiveLinks = screen.getAllByText("Plan Format");
    const hasInactiveStyle = inactiveLinks.some(
      (link) =>
        link.className.includes("text-brand-text-secondary") &&
        link.className.includes("hover:text-brand-text-primary")
    );
    expect(hasInactiveStyle).toBe(true);
  });

  it("shows Menu button for mobile toggle", () => {
    render(<Sidebar docs={sampleDocs} />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("mobile menu button toggles to Close when clicked", async () => {
    const user = userEvent.setup();
    render(<Sidebar docs={sampleDocs} />);

    const menuBtn = screen.getByText("Menu");
    await user.click(menuBtn);

    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("mobile overlay appears when menu is open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Sidebar docs={sampleDocs} />);

    // Initially no overlay
    expect(container.querySelector(".bg-black\\/50")).toBeNull();

    await user.click(screen.getByText("Menu"));

    // Overlay should appear
    expect(container.querySelector(".bg-black\\/50")).not.toBeNull();
  });

  it("clicking overlay closes mobile menu", async () => {
    const user = userEvent.setup();
    const { container } = render(<Sidebar docs={sampleDocs} />);

    await user.click(screen.getByText("Menu"));
    expect(screen.getByText("Close")).toBeInTheDocument();

    const overlay = container.querySelector(".bg-black\\/50");
    expect(overlay).not.toBeNull();
    await user.click(overlay!);

    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("clicking a link closes mobile menu", async () => {
    const user = userEvent.setup();
    render(<Sidebar docs={sampleDocs} />);

    await user.click(screen.getByText("Menu"));
    expect(screen.getByText("Close")).toBeInTheDocument();

    // Click a doc link
    const links = screen.getAllByText("Agents");
    await user.click(links[0]);

    // Menu should close
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("desktop sidebar is hidden on small screens, visible on lg", () => {
    const { container } = render(<Sidebar docs={sampleDocs} />);
    const desktopSidebar = container.querySelector(
      "aside.hidden.lg\\:block"
    );
    expect(desktopSidebar).not.toBeNull();
  });

  it("desktop sidebar has correct layout classes (w-64, sticky, top-16)", () => {
    const { container } = render(<Sidebar docs={sampleDocs} />);
    const desktopSidebar = container.querySelector(
      "aside.hidden.lg\\:block"
    );
    expect(desktopSidebar).not.toBeNull();
    expect(desktopSidebar!.className).toContain("w-64");
    expect(desktopSidebar!.className).toContain("sticky");
    expect(desktopSidebar!.className).toContain("top-16");
  });

  it("mobile sidebar has transition-transform for animation", () => {
    const { container } = render(<Sidebar docs={sampleDocs} />);
    const mobileSidebar = container.querySelector("aside.lg\\:hidden");
    expect(mobileSidebar).not.toBeNull();
    expect(mobileSidebar!.className).toContain("transition-transform");
  });

  it("mobile sidebar is translated off-screen when closed", () => {
    const { container } = render(<Sidebar docs={sampleDocs} />);
    const mobileSidebar = container.querySelector("aside.lg\\:hidden");
    expect(mobileSidebar!.className).toContain("-translate-x-full");
  });

  it("mobile sidebar slides in when open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Sidebar docs={sampleDocs} />);

    await user.click(screen.getByText("Menu"));

    const mobileSidebar = container.querySelector("aside.lg\\:hidden");
    expect(mobileSidebar!.className).toContain("translate-x-0");
    expect(mobileSidebar!.className).not.toContain("-translate-x-full");
  });

  it("handles empty docs array", () => {
    render(<Sidebar docs={[]} />);
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);
  });

  it("correctly changes active link when pathname changes", () => {
    mockPathname.mockReturnValue("/docs/cli-reference");
    render(<Sidebar docs={sampleDocs} />);
    const cliLinks = screen.getAllByText("CLI Reference");
    const hasActive = cliLinks.some((link) =>
      link.className.includes("bg-brand-accent-primary/10")
    );
    expect(hasActive).toBe(true);

    // Getting Started should NOT be active
    const gsLinks = screen.getAllByText("Getting Started");
    const gsActive = gsLinks.some((link) =>
      link.className.includes("bg-brand-accent-primary/10")
    );
    expect(gsActive).toBe(false);
  });
});
