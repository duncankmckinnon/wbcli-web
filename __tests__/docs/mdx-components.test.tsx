import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { mdxComponents } from "@/components/docs/mdx-components";

describe("mdxComponents", () => {
  it("is a named export, not a default export", async () => {
    const mod = await import("@/components/docs/mdx-components");
    expect(mod.mdxComponents).toBeDefined();
    expect(mod).not.toHaveProperty("default");
  });

  it("exports all expected component overrides", () => {
    const expectedKeys = [
      "h1",
      "h2",
      "h3",
      "p",
      "a",
      "code",
      "pre",
      "ul",
      "ol",
      "blockquote",
    ];
    for (const key of expectedKeys) {
      expect(mdxComponents).toHaveProperty(key);
      expect(typeof mdxComponents[key]).toBe("function");
    }
  });

  describe("h1", () => {
    it("renders with correct classes", () => {
      const H1 = mdxComponents.h1;
      render(<H1>Test Heading</H1>);
      const el = screen.getByText("Test Heading");
      expect(el.tagName).toBe("H1");
      expect(el.className).toContain("text-3xl");
      expect(el.className).toContain("font-bold");
      expect(el.className).toContain("text-brand-text-primary");
      expect(el.className).toContain("mt-8");
      expect(el.className).toContain("mb-4");
    });

    it("auto-generates id from string children", () => {
      const H1 = mdxComponents.h1;
      render(<H1>Hello World</H1>);
      const el = screen.getByText("Hello World");
      expect(el.id).toBe("hello-world");
    });

    it("does not set id for non-string children", () => {
      const H1 = mdxComponents.h1;
      render(
        <H1>
          <span>Complex</span>
        </H1>
      );
      const el = screen.getByText("Complex").closest("h1");
      expect(el!.id).toBe("");
    });
  });

  describe("h2", () => {
    it("renders with correct classes", () => {
      const H2 = mdxComponents.h2;
      render(<H2>Sub Heading</H2>);
      const el = screen.getByText("Sub Heading");
      expect(el.tagName).toBe("H2");
      expect(el.className).toContain("text-2xl");
      expect(el.className).toContain("font-bold");
      expect(el.className).toContain("text-brand-text-primary");
      expect(el.className).toContain("mt-8");
      expect(el.className).toContain("mb-3");
    });

    it("auto-generates id from string children", () => {
      const H2 = mdxComponents.h2;
      render(<H2>My Section</H2>);
      const el = screen.getByText("My Section");
      expect(el.id).toBe("my-section");
    });
  });

  describe("h3", () => {
    it("renders with correct classes", () => {
      const H3 = mdxComponents.h3;
      render(<H3>Subsection</H3>);
      const el = screen.getByText("Subsection");
      expect(el.tagName).toBe("H3");
      expect(el.className).toContain("text-xl");
      expect(el.className).toContain("font-semibold");
      expect(el.className).toContain("text-brand-text-primary");
      expect(el.className).toContain("mt-6");
      expect(el.className).toContain("mb-2");
    });

    it("auto-generates id", () => {
      const H3 = mdxComponents.h3;
      render(<H3>Verify Installation</H3>);
      const el = screen.getByText("Verify Installation");
      expect(el.id).toBe("verify-installation");
    });
  });

  describe("p", () => {
    it("renders with correct classes", () => {
      const P = mdxComponents.p;
      render(<P>Paragraph text</P>);
      const el = screen.getByText("Paragraph text");
      expect(el.tagName).toBe("P");
      expect(el.className).toContain("text-brand-text-secondary");
      expect(el.className).toContain("leading-relaxed");
      expect(el.className).toContain("mb-4");
    });
  });

  describe("a", () => {
    it("renders with correct classes", () => {
      const A = mdxComponents.a;
      render(<A href="https://example.com">Link</A>);
      const el = screen.getByText("Link");
      expect(el.tagName).toBe("A");
      expect(el.className).toContain("text-brand-accent-primary");
      expect(el.className).toContain("hover:underline");
      expect(el.getAttribute("href")).toBe("https://example.com");
    });
  });

  describe("code (inline)", () => {
    it("renders with correct classes", () => {
      const Code = mdxComponents.code;
      render(<Code>npm install</Code>);
      const el = screen.getByText("npm install");
      expect(el.tagName).toBe("CODE");
      expect(el.className).toContain("bg-brand-bg-tertiary");
      expect(el.className).toContain("px-1.5");
      expect(el.className).toContain("py-0.5");
      expect(el.className).toContain("rounded");
      expect(el.className).toContain("text-sm");
      expect(el.className).toContain("font-mono");
    });
  });

  describe("pre", () => {
    it("renders with correct classes", () => {
      const Pre = mdxComponents.pre;
      render(<Pre>code block</Pre>);
      const el = screen.getByText("code block");
      expect(el.tagName).toBe("PRE");
      expect(el.className).toContain("bg-brand-bg-secondary");
      expect(el.className).toContain("border");
      expect(el.className).toContain("border-brand-bg-tertiary");
      expect(el.className).toContain("rounded-xl");
      expect(el.className).toContain("p-4");
      expect(el.className).toContain("overflow-x-auto");
      expect(el.className).toContain("mb-4");
    });
  });

  describe("ul", () => {
    it("renders with correct classes", () => {
      const UL = mdxComponents.ul;
      render(
        <UL>
          <li>Item</li>
        </UL>
      );
      const el = screen.getByRole("list");
      expect(el.tagName).toBe("UL");
      expect(el.className).toContain("list-disc");
      expect(el.className).toContain("list-inside");
      expect(el.className).toContain("text-brand-text-secondary");
      expect(el.className).toContain("mb-4");
    });
  });

  describe("ol", () => {
    it("renders with correct classes", () => {
      const OL = mdxComponents.ol;
      render(
        <OL>
          <li>Item</li>
        </OL>
      );
      const el = screen.getByRole("list");
      expect(el.tagName).toBe("OL");
      expect(el.className).toContain("list-decimal");
      expect(el.className).toContain("list-inside");
      expect(el.className).toContain("text-brand-text-secondary");
      expect(el.className).toContain("mb-4");
    });
  });

  describe("blockquote", () => {
    it("renders with correct classes", () => {
      const BQ = mdxComponents.blockquote;
      render(<BQ>Quote text</BQ>);
      const el = screen.getByText("Quote text");
      expect(el.tagName).toBe("BLOCKQUOTE");
      expect(el.className).toContain("border-l-2");
      expect(el.className).toContain("border-brand-accent-primary");
      expect(el.className).toContain("bg-brand-bg-secondary/50");
      expect(el.className).toContain("p-4");
      expect(el.className).toContain("rounded-r-lg");
      expect(el.className).toContain("mb-4");
    });
  });

  describe("slugify", () => {
    it("handles special characters in heading text", () => {
      const H2 = mdxComponents.h2;
      render(<H2>What's Next?</H2>);
      const el = screen.getByText("What's Next?");
      expect(el.id).toBe("whats-next");
    });

    it("converts to lowercase and replaces spaces with hyphens", () => {
      const H2 = mdxComponents.h2;
      render(<H2>CLI Reference</H2>);
      const el = screen.getByText("CLI Reference");
      expect(el.id).toBe("cli-reference");
    });
  });
});
