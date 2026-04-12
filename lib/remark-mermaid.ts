import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Transforms ```mermaid code blocks into <Mermaid> JSX elements with the source
 * as a text child. Runs before rehype-pretty-code so mermaid blocks bypass
 * syntax highlighting entirely.
 */
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || typeof index !== "number") return;
      if (node.lang !== "mermaid") return;

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [],
        children: [{ type: "text", value: node.value }],
      } as unknown as typeof parent.children[number];
    });
  };
}
