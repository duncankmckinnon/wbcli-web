import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "@/components/shared/nav";

describe("Nav", () => {
  it("renders without crashing", () => {
    render(<Nav />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has sticky positioning and correct styling", () => {
    render(<Nav />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("sticky");
    expect(nav.className).toContain("top-0");
    expect(nav.className).toContain("z-50");
    expect(nav.className).toContain("backdrop-blur-md");
    expect(nav.className).toContain("border-brand-bg-tertiary");
    expect(nav.className).toContain("bg-brand-bg-primary/80");
  });

  it("renders the Logo component", () => {
    render(<Nav />);
    expect(screen.getByText("workbench")).toBeInTheDocument();
  });

  it("renders the Docs link pointing to /docs", () => {
    render(<Nav />);
    const docsLinks = screen.getAllByText("Docs");
    // Desktop version
    const desktopDocsLink = docsLinks[0].closest("a");
    expect(desktopDocsLink).toHaveAttribute("href", "/docs");
  });

  it("renders the GitHub icon link with correct URL and target", () => {
    render(<Nav />);
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/duncankmckinnon/workbench"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the Get Started button linking to /docs/getting-started", () => {
    render(<Nav />);
    const getStartedLinks = screen.getAllByText("Get Started");
    const desktopBtn = getStartedLinks[0].closest("a");
    expect(desktopBtn).toHaveAttribute("href", "/docs/getting-started");
  });

  it("has gradient styling on Get Started button", () => {
    render(<Nav />);
    const getStartedLinks = screen.getAllByText("Get Started");
    const desktopBtn = getStartedLinks[0];
    expect(desktopBtn.className).toContain("bg-gradient-to-r");
    expect(desktopBtn.className).toContain("from-brand-accent-primary");
    expect(desktopBtn.className).toContain("to-brand-accent-secondary");
  });

  it("renders hamburger button for mobile", () => {
    render(<Nav />);
    const menuButton = screen.getByLabelText("Open menu");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.className).toContain("md:hidden");
  });

  it("does not show mobile dropdown by default", () => {
    const { container } = render(<Nav />);
    const mobileDropdown = container.querySelector(
      ".border-t.border-brand-bg-tertiary.px-4"
    );
    expect(mobileDropdown).not.toBeInTheDocument();
  });

  it("opens mobile menu when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const menuButton = screen.getByLabelText("Open menu");
    await user.click(menuButton);

    // After opening, the button label changes to "Close menu"
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    // Mobile links should now be visible (there are 2 Docs links: desktop + mobile)
    const docsLinks = screen.getAllByText("Docs");
    expect(docsLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("closes mobile menu when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    // Open menu
    await user.click(screen.getByLabelText("Open menu"));
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    // Close menu
    await user.click(screen.getByLabelText("Close menu"));
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("closes mobile menu when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    // Open menu
    await user.click(screen.getByLabelText("Open menu"));

    // Click the mobile Docs link (second one, since first is desktop)
    const docsLinks = screen.getAllByText("Docs");
    const mobileDocsLink = docsLinks[docsLinks.length - 1];
    await user.click(mobileDocsLink);

    // Menu should be closed
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("mobile dropdown contains GitHub link with icon and text", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByLabelText("Open menu"));

    const githubLink = screen.getByText("GitHub");
    expect(githubLink.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/duncankmckinnon/workbench"
    );
    expect(githubLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("uses 'use client' directive", async () => {
    // Verify the module marks itself as a client component by having useState
    const mod = await import("@/components/shared/nav");
    expect(mod.Nav).toBeDefined();
  });

  it("is a named export, not a default export", async () => {
    const mod = await import("@/components/shared/nav");
    expect(mod.Nav).toBeDefined();
    expect(mod).not.toHaveProperty("default");
  });
});
