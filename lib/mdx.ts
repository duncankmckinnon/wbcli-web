import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';

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
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    headings.push({
      id,
      text,
      level: match[1].length,
    });
  }

  
  return headings;
}
