import { redirect } from "next/navigation";
import { getDocBySlug, getDocSlugs } from "@/lib/docs";
import { MDXContent, extractHeadings } from "@/lib/mdx";
import { mdxComponents } from "@/components/docs/mdx-components";
import { TableOfContents } from "@/components/docs/toc";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const docSlug = slug?.[0];

  if (!docSlug) {
    return { title: "Documentation" };
  }

  const { meta } = getDocBySlug(docSlug);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const docSlug = slug?.[0];

  if (!docSlug) {
    redirect("/docs/getting-started");
  }

  const { meta, content } = getDocBySlug(docSlug);
  const headings = extractHeadings(content);

  return (
    <div className="flex">
      <article className="flex-1 max-w-3xl px-8 py-12">
        <h1 className="text-3xl font-bold text-brand-text-primary mb-2">
          {meta.title}
        </h1>
        <p className="text-brand-text-muted mb-8">{meta.description}</p>
        <MDXContent source={content} components={mdxComponents} />
      </article>
      <aside className="hidden xl:block w-56 shrink-0 sticky top-16 h-[calc(100vh-4rem)] py-12 pr-4">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
}
