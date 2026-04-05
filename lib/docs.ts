import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  parent?: string;
}

const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

export function getAllDocs(): DocMeta[] {
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.mdx'));

  const docs = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(DOCS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      order: data.order as number,
      parent: (data.parent as string) || undefined,
    };
  });

  return docs.sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string): { meta: DocMeta; content: string } {
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title as string,
      description: data.description as string,
      order: data.order as number,
      parent: (data.parent as string) || undefined,
    },
    content,
  };
}

export function getDocSlugs(): string[] {
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.mdx'));
  return files.map((f) => f.replace(/\.mdx$/, ''));
}
