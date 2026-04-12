"use client";

import { Children, useEffect, useState, type ReactNode } from "react";

interface MermaidProps {
  children: ReactNode;
}

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

let mermaidInitialized = false;

export function Mermaid({ children }: MermaidProps) {
  const chart = Children.toArray(children).map(extractText).join("").trim();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!chart) {
        setError("No chart content provided");
        return;
      }
      const mermaid = (await import("mermaid")).default;

      if (!mermaidInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            background: "#0f172a",
            primaryColor: "#1e293b",
            primaryTextColor: "#f1f5f9",
            primaryBorderColor: "#6366f1",
            lineColor: "#94a3b8",
            secondaryColor: "#334155",
            tertiaryColor: "#0f172a",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          },
          securityLevel: "loose",
        });
        mermaidInitialized = true;
      }

      try {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Render failed");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 text-sm text-red-400 my-6">
        Mermaid render error: {error}
      </pre>
    );
  }

  return (
    <div
      className="my-8 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
