import { describe, it, expect, vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  usePathname: () => "/docs/getting-started",
}));

// Mock dependencies
vi.mock("@/lib/docs", () => ({
  getDocBySlug: vi.fn((slug: string) => ({
    meta: {
      slug,
      title: `Title for ${slug}`,
      description: `Description for ${slug}`,
      order: 1,
    },
    content: `## Heading One\n\nSome content\n\n### Sub Heading\n\nMore content`,
  })),
  getDocSlugs: vi.fn(() => [
    "getting-started",
    "plan-format",
    "cli-reference",
    "agents",
    "profiles",
    "tdd-mode",
  ]),
}));

vi.mock("@/lib/mdx", () => ({
  MDXContent: ({ source, components }: { source: string; components: any }) => (
    <div data-testid="mdx-content">{source.substring(0, 50)}</div>
  ),
  extractHeadings: vi.fn((content: string) => [
    { id: "heading-one", text: "Heading One", level: 2 },
    { id: "sub-heading", text: "Sub Heading", level: 3 },
  ]),
}));

vi.mock("@/components/docs/toc", () => ({
  TableOfContents: ({
    headings,
  }: {
    headings: { id: string; text: string; level: number }[];
  }) => (
    <nav data-testid="toc">
      {headings.map((h) => (
        <span key={h.id}>{h.text}</span>
      ))}
    </nav>
  ),
}));

vi.mock("@/components/docs/mdx-components", () => ({
  mdxComponents: {},
}));

import { redirect } from "next/navigation";
import { getDocBySlug, getDocSlugs } from "@/lib/docs";
import { extractHeadings } from "@/lib/mdx";

describe("DocsPage", () => {
  describe("generateStaticParams", () => {
    it("returns params for all doc slugs", async () => {
      const { generateStaticParams } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );
      const params = generateStaticParams();
      expect(params).toEqual([
        { slug: ["getting-started"] },
        { slug: ["plan-format"] },
        { slug: ["cli-reference"] },
        { slug: ["agents"] },
        { slug: ["profiles"] },
        { slug: ["tdd-mode"] },
      ]);
      expect(getDocSlugs).toHaveBeenCalled();
    });
  });

  describe("generateMetadata", () => {
    it("returns doc title and description for valid slug", async () => {
      const { generateMetadata } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: ["getting-started"] }),
      });
      expect(metadata).toEqual({
        title: "Title for getting-started",
        description: "Description for getting-started",
      });
    });

    it("returns generic title when no slug provided", async () => {
      const { generateMetadata } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: undefined }),
      });
      expect(metadata).toEqual({ title: "Documentation" });
    });
  });

  describe("DocsPage component", () => {
    it("redirects to /docs/getting-started when no slug", async () => {
      const { default: DocsPage } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );

      try {
        await DocsPage({ params: Promise.resolve({ slug: undefined }) });
      } catch {
        // redirect may throw in test env
      }

      expect(redirect).toHaveBeenCalledWith("/docs/getting-started");
    });

    it("calls getDocBySlug with the correct slug", async () => {
      const { default: DocsPage } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );

      // Reset mock to track this specific call
      vi.mocked(getDocBySlug).mockClear();

      await DocsPage({
        params: Promise.resolve({ slug: ["cli-reference"] }),
      });

      expect(getDocBySlug).toHaveBeenCalledWith("cli-reference");
    });

    it("calls extractHeadings with doc content", async () => {
      const { default: DocsPage } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );

      vi.mocked(extractHeadings).mockClear();

      await DocsPage({
        params: Promise.resolve({ slug: ["getting-started"] }),
      });

      expect(extractHeadings).toHaveBeenCalledWith(
        expect.stringContaining("## Heading One")
      );
    });

    it("renders page with article and aside structure", async () => {
      const { default: DocsPage } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );
      const { render, screen } = await import("@testing-library/react");

      const element = await DocsPage({
        params: Promise.resolve({ slug: ["getting-started"] }),
      });

      render(element as React.ReactElement);

      // Check MDX content is rendered
      expect(screen.getByTestId("mdx-content")).toBeInTheDocument();

      // Check TOC is rendered
      expect(screen.getByTestId("toc")).toBeInTheDocument();

      // Check article structure
      const article = screen.getByRole("article");
      expect(article.className).toContain("max-w-3xl");
      expect(article.className).toContain("px-8");
      expect(article.className).toContain("py-12");
    });

    it("renders doc title and description", async () => {
      const { default: DocsPage } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );
      const { render, screen } = await import("@testing-library/react");

      const element = await DocsPage({
        params: Promise.resolve({ slug: ["getting-started"] }),
      });

      render(element as React.ReactElement);

      expect(
        screen.getByText("Title for getting-started")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Description for getting-started")
      ).toBeInTheDocument();
    });

    it("TOC aside is hidden below xl and has correct width", async () => {
      const { default: DocsPage } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );
      const { render } = await import("@testing-library/react");

      const element = await DocsPage({
        params: Promise.resolve({ slug: ["getting-started"] }),
      });

      const { container } = render(element as React.ReactElement);

      const aside = container.querySelector("aside");
      expect(aside).not.toBeNull();
      expect(aside!.className).toContain("hidden");
      expect(aside!.className).toContain("xl:block");
      expect(aside!.className).toContain("w-56");
      expect(aside!.className).toContain("sticky");
      expect(aside!.className).toContain("top-16");
    });

    it("wraps content in a flex container", async () => {
      const { default: DocsPage } = await import(
        "@/app/(docs)/docs/[[...slug]]/page"
      );
      const { render } = await import("@testing-library/react");

      const element = await DocsPage({
        params: Promise.resolve({ slug: ["getting-started"] }),
      });

      const { container } = render(element as React.ReactElement);

      const wrapper = container.firstElementChild;
      expect(wrapper!.className).toContain("flex");
    });

    it("is a default export (Next.js page convention)", async () => {
      const mod = await import("@/app/(docs)/docs/[[...slug]]/page");
      expect(mod.default).toBeDefined();
    });
  });
});
