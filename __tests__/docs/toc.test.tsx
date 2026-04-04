import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableOfContents } from "@/components/docs/toc";

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let observerCallback: IntersectionObserverCallback;

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn((callback: IntersectionObserverCallback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: vi.fn(),
      };
    })
  );
});

const sampleHeadings = [
  { id: "installation", text: "Installation", level: 2 },
  { id: "prerequisites", text: "Prerequisites", level: 3 },
  { id: "configuration", text: "Configuration", level: 2 },
  { id: "advanced-setup", text: "Advanced Setup", level: 3 },
];

describe("TableOfContents", () => {
  it("renders without crashing", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    expect(screen.getByText("On this page")).toBeInTheDocument();
  });

  it("is a named export, not a default export", async () => {
    const mod = await import("@/components/docs/toc");
    expect(mod.TableOfContents).toBeDefined();
    expect(mod).not.toHaveProperty("default");
  });

  it("renders all heading links", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    for (const heading of sampleHeadings) {
      expect(screen.getByText(heading.text)).toBeInTheDocument();
    }
  });

  it("links have correct href with hash", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    for (const heading of sampleHeadings) {
      const link = screen.getByText(heading.text);
      expect(link.getAttribute("href")).toBe(`#${heading.id}`);
    }
  });

  it("h3 headings are indented (pl-4)", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    const prereqs = screen.getByText("Prerequisites");
    expect(prereqs.className).toContain("pl-4");

    const advSetup = screen.getByText("Advanced Setup");
    expect(advSetup.className).toContain("pl-4");
  });

  it("h2 headings are not indented", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    const install = screen.getByText("Installation");
    expect(install.className).not.toContain("pl-4");

    const config = screen.getByText("Configuration");
    expect(config.className).not.toContain("pl-4");
  });

  it("returns null for empty headings array", () => {
    const { container } = render(<TableOfContents headings={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("heading links have text-sm styling", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    const link = screen.getByText("Installation");
    expect(link.className).toContain("text-sm");
  });

  it("inactive headings have muted text color", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    const link = screen.getByText("Installation");
    expect(link.className).toContain("text-brand-text-muted");
  });

  it("sets up IntersectionObserver on mount", () => {
    // Add DOM elements for headings
    for (const heading of sampleHeadings) {
      const el = document.createElement("h2");
      el.id = heading.id;
      document.body.appendChild(el);
    }

    render(<TableOfContents headings={sampleHeadings} />);
    expect(mockObserve).toHaveBeenCalledTimes(sampleHeadings.length);

    // Cleanup
    for (const heading of sampleHeadings) {
      const el = document.getElementById(heading.id);
      if (el) el.remove();
    }
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(
      <TableOfContents headings={sampleHeadings} />
    );
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("highlights active heading when IntersectionObserver fires", () => {
    // Add DOM elements
    for (const heading of sampleHeadings) {
      const el = document.createElement("h2");
      el.id = heading.id;
      document.body.appendChild(el);
    }

    render(<TableOfContents headings={sampleHeadings} />);

    // Simulate intersection
    observerCallback(
      [
        {
          isIntersecting: true,
          target: document.getElementById("configuration")!,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    );

    const configLink = screen.getByText("Configuration");
    expect(configLink.className).toContain("text-brand-accent-primary");

    // Other headings should not be active
    const installLink = screen.getByText("Installation");
    expect(installLink.className).not.toContain("text-brand-accent-primary");

    // Cleanup
    for (const heading of sampleHeadings) {
      const el = document.getElementById(heading.id);
      if (el) el.remove();
    }
  });

  it("renders a nav element", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has 'On this page' label with correct styling", () => {
    render(<TableOfContents headings={sampleHeadings} />);
    const label = screen.getByText("On this page");
    expect(label.className).toContain("text-xs");
    expect(label.className).toContain("uppercase");
    expect(label.className).toContain("text-brand-text-muted");
  });
});
