import type { ComponentPropsWithoutRef } from "react";
import { Mermaid } from "./mermaid";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => {
    const id = typeof props.children === "string" ? slugify(props.children) : undefined;
    return (
      <h1
        id={id}
        className="text-3xl font-bold text-brand-text-primary mt-8 mb-4"
        {...props}
      />
    );
  },
  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    const id = typeof props.children === "string" ? slugify(props.children) : undefined;
    return (
      <h2
        id={id}
        className="text-2xl font-bold text-brand-text-primary mt-8 mb-3"
        {...props}
      />
    );
  },
  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    const id = typeof props.children === "string" ? slugify(props.children) : undefined;
    return (
      <h3
        id={id}
        className="text-xl font-semibold text-brand-text-primary mt-6 mb-2"
        {...props}
      />
    );
  },
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-brand-text-secondary leading-relaxed mb-4" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-brand-accent-primary hover:underline" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="bg-brand-bg-tertiary px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-brand-bg-secondary border border-brand-bg-tertiary rounded-xl p-4 overflow-x-auto mb-4"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc list-inside space-y-1 text-brand-text-secondary mb-4"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal list-inside space-y-1 text-brand-text-secondary mb-4"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-2 border-brand-accent-primary bg-brand-bg-secondary/50 p-4 rounded-r-lg mb-4"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm text-brand-text-secondary" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="border-b border-brand-bg-tertiary text-brand-text-primary" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="px-4 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-2 border-b border-brand-bg-tertiary/50" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="hover:bg-brand-bg-secondary/50" {...props} />
  ),
  Mermaid,
};
