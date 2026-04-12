import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { remarkMermaid } from './remark-mermaid';

interface MDXContentProps {
  source: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ source, components }: MDXContentProps) {
  return React.createElement(MDXRemote, {
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMermaid, remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
      },
    },
  });
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  // Strip fenced code blocks (``` or ~~~, with any number of backticks) so that
  // headings inside code examples don't pollute the TOC.
  const withoutCode = content.replace(
    /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm,
    ''
  );

  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const seen = new Set<string>();
  let match;

  while ((match = headingRegex.exec(withoutCode)) !== null) {
    const text = match[2];
    let id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Ensure uniqueness if the same heading appears twice
    let uniqueId = id;
    let counter = 1;
    while (seen.has(uniqueId)) {
      uniqueId = `${id}-${counter++}`;
    }
    seen.add(uniqueId);

    headings.push({
      id: uniqueId,
      text,
      level: match[1].length,
    });
  }

  return headings;
}
