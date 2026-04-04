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

  it("renders an SVG icon with gradient", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");

    const gradient = container.querySelector("linearGradient");
    expect(gradient).toBeInTheDocument();

    const stops = container.querySelectorAll("stop");
    expect(stops).toHaveLength(2);
    expect(stops[0]).toHaveAttribute("stop-color", "#6366f1");
    expect(stops[1]).toHaveAttribute("stop-color", "#8b5cf6");
  });

  it("renders a rounded rect with the gradient fill", () => {
    const { container } = render(<Logo />);
    const rect = container.querySelector("rect");
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute("rx", "6");
    expect(rect).toHaveAttribute("fill", "url(#logo-gradient)");
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
