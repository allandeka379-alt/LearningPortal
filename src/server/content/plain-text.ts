import "server-only";
import type { Nodes, Root } from "mdast";
import { CONTENT_BLOCK_LABELS, CONTENT_BLOCK_TITLE_ATTRIBUTE, isContentBlockType } from "@/lib/content/blocks";
import { classifyImageUrl, directiveSource, isDirectiveLabel } from "./mdast-utils";

/**
 * Converts a parsed (untransformed) markdown tree to plain text for search indexing, SEO descriptions and AI
 * context:
 * - markdown syntax is stripped; blocks are separated by blank lines, list items/table rows by newlines;
 * - math is kept as LaTeX source without `$` delimiters (`x^2 + 1`), so it stays searchable and model-readable;
 * - pedagogical blocks contribute their label line ("Definition: Photosynthesis");
 * - asset images contribute `[Image: alt]`; external images, raw HTML and footnote markers contribute nothing.
 */
export function mdastToPlainText(tree: Root, source: string): string {
  return normalizeWhitespace(textOf(tree, source));
}

function textOf(node: Nodes, source: string): string {
  switch (node.type) {
    case "text":
    case "inlineCode":
    case "inlineMath":
    case "code":
    case "math":
      return node.value;
    case "break":
      return "\n";
    case "html":
    case "thematicBreak":
    case "definition":
    case "footnoteReference":
    case "yaml":
      return "";
    case "image":
    case "imageReference": {
      const alt = node.alt?.trim();
      if (!alt) return "";
      if (node.type === "image" && classifyImageUrl(node.url).kind !== "asset") return "";
      return `[Image: ${alt}]`;
    }
    case "textDirective":
    case "leafDirective":
      return directiveSource(node, source);
    case "containerDirective": {
      if (!isContentBlockType(node.name)) return joinBlocks(node.children, source);
      const [first, ...rest] = node.children;
      const hasLabel = isDirectiveLabel(first);
      const title = hasLabel
        ? textOf(first, source).trim()
        : (node.attributes?.[CONTENT_BLOCK_TITLE_ATTRIBUTE[node.name]] ?? "").trim();
      const heading = title ? `${CONTENT_BLOCK_LABELS[node.name]}: ${title}` : CONTENT_BLOCK_LABELS[node.name];
      const body = joinBlocks(hasLabel ? rest : node.children, source);
      return body ? `${heading}\n${body}` : heading;
    }
    case "paragraph":
    case "heading":
    case "tableCell":
    case "emphasis":
    case "strong":
    case "delete":
    case "link":
    case "linkReference":
      return node.children.map((child) => textOf(child, source)).join("");
    case "list":
      return node.children.map((item) => textOf(item, source)).join("\n");
    case "table":
      return node.children.map((row) => textOf(row, source)).join("\n");
    case "tableRow":
      return node.children.map((cell) => textOf(cell, source).trim()).join(" | ");
    case "root":
    case "blockquote":
    case "listItem":
    case "footnoteDefinition":
      return joinBlocks(node.children, source);
    default:
      // Every mdast node type (including the math/directive extensions) is handled above.
      return "";
  }
}

function joinBlocks(nodes: readonly Nodes[], source: string): string {
  return nodes
    .map((node) => textOf(node, source))
    .filter((text) => text.trim() !== "")
    .join("\n\n");
}

function normalizeWhitespace(text: string): string {
  return text
    .replace(/[ \t\f\v ]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
