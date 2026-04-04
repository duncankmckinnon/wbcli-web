// This file re-exports from mdx.ts for consumers that import with .tsx extension.
// The canonical implementation lives in lib/mdx.ts.
// TypeScript resolves bare 'mdx' imports to mdx.ts (preferred over .tsx).
export { MDXContent, extractHeadings } from './mdx';
