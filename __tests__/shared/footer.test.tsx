import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/shared/footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("has correct border and background styling", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer?.className).toContain("border-t");
    expect(footer?.className).toContain("border-brand-bg-tertiary");
    expect(footer?.className).toContain("bg-brand-bg-primary");
  });

  // Column: Product
  it("renders Product column with Docs link", () => {
    render(<Footer />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    const docsLink = screen.getByText("Docs").closest("a");
    expect(docsLink).toHaveAttribute("href", "/docs");
  });

  it("renders Product column with GitHub external link", () => {
    render(<Footer />);
    const githubLink = screen.getByText("GitHub").closest("a");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/duncankmckinnon/workbench"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  // Column: Resources
  it("renders Resources column with Getting Started link", () => {
    render(<Footer />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
    const link = screen.getByText("Getting Started").closest("a");
    expect(link).toHaveAttribute("href", "/docs/getting-started");
  });

  it("renders Resources column with CLI Reference link", () => {
    render(<Footer />);
    const link = screen.getByText("CLI Reference").closest("a");
    expect(link).toHaveAttribute("href", "/docs/cli-reference");
  });

  // Column: Community
  it("renders Community column with GitHub Issues link", () => {
    render(<Footer />);
    expect(screen.getByText("Community")).toBeInTheDocument();
    const link = screen.getByText("GitHub Issues").closest("a");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/duncankmckinnon/workbench/issues"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  // Bottom row
  it("renders the attribution and license text", () => {
    render(<Footer />);
    const bottomRow = screen.getByText(/Built by Duncan McKinnon/);
    expect(bottomRow).toBeInTheDocument();
    expect(bottomRow.textContent).toContain("MIT License");
  });

  it("has three column headings", () => {
    render(<Footer />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(3);
    expect(headings[0]).toHaveTextContent("Product");
    expect(headings[1]).toHaveTextContent("Resources");
    expect(headings[2]).toHaveTextContent("Community");
  });

  it("uses grid layout for columns", () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain("grid-cols-2");
    expect(grid?.className).toContain("md:grid-cols-3");
  });

  it("internal links use next/link (no target attribute)", () => {
    render(<Footer />);
    const docsLink = screen.getByText("Docs").closest("a");
    expect(docsLink).not.toHaveAttribute("target");

    const gettingStartedLink = screen
      .getByText("Getting Started")
      .closest("a");
    expect(gettingStartedLink).not.toHaveAttribute("target");

    const cliRefLink = screen.getByText("CLI Reference").closest("a");
    expect(cliRefLink).not.toHaveAttribute("target");
  });

  it("is a named export, not a default export", async () => {
    const mod = await import("@/components/shared/footer");
    expect(mod.Footer).toBeDefined();
    expect(mod).not.toHaveProperty("default");
  });
});
