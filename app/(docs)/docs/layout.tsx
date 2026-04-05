import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/shared/footer";
import { Sidebar } from "@/components/docs/sidebar";
import { getAllDocs } from "@/lib/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs().map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    parent: doc.parent,
  }));

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto flex min-h-screen">
        <Sidebar docs={docs} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  );
}
