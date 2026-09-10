import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "@/components/shared/logo";

describe("Logo", () => {
  it("renders the workbench text", () => {
    render(<Logo />);
    expect(screen.getByText("workbench")).toBeInTheDocument();
  });

  it("renders the workbench text in bold", () => {
    render(<Logo />);
    const text = screen.getByText("workbench");
    expect(text.className).toContain("font-bold");
  });

  it("links to the homepage", () => {
    render(<Logo />);
    const link = screen.getByText("workbench").closest("a");
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the logo image with alt text", () => {
    render(<Logo />);
    const img = screen.getByAltText("workbench logo");
    expect(img).toBeInTheDocument();
  });

  it("renders the logo image with rounded corners", () => {
    render(<Logo />);
    const img = screen.getByAltText("workbench logo");
    expect(img.className).toContain("rounded-md");
  });

  it("accepts a className prop", () => {
    const { container } = render(<Logo className="custom-class" />);
    const link = container.querySelector("a");
    expect(link?.className).toContain("custom-class");
  });

  it("applies default flex styling without className", () => {
    const { container } = render(<Logo />);
    const link = container.querySelector("a");
    expect(link?.className).toContain("flex");
    expect(link?.className).toContain("items-center");
    expect(link?.className).toContain("gap-2");
  });

  it("is a named export, not a default export", async () => {
    const mod = await import("@/components/shared/logo");
    expect(mod.Logo).toBeDefined();
    expect(mod).not.toHaveProperty("default");
  });
});
