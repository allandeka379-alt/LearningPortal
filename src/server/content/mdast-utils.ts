import "server-only";
import type { Nodes, Paragraph } from "mdast";
import type { Directives } from "mdast-util-directive";

/**
 * Asset ids are opaque database ids (UUID / cuid style). The SAME grammar is used to pre-scan the raw source for
 * ids to resolve (see `collectAssetIds`) and to validate parsed image URLs, so a URL the plugin accepts can always
 * have been resolved — which keeps cache keys (that include resolved assets) correct.
 */
const ASSET_ID = "[A-Za-z0-9][A-Za-z0-9_-]{0,127}";
export const ASSET_URL_PATTERN = new RegExp(`^asset:(${ASSET_ID})$`);
export const ASSET_SCAN_PATTERN = new RegExp(`asset:(${ASSET_ID})`, "g");

export type ImageUrlKind = { kind: "asset"; id: string } | { kind: "invalid-asset" } | { kind: "external" };

/** Classifies an image URL. Only `asset:<id>` references are ever rendered as images. */
export function classifyImageUrl(url: string): ImageUrlKind {
  const match = ASSET_URL_PATTERN.exec(url);
  if (match?.[1]) return { kind: "asset", id: match[1] };
  return url.startsWith("asset:") ? { kind: "invalid-asset" } : { kind: "external" };
}

/** Lower-cases a URL scheme (`HTTPS://x` → `https://x`) so the sanitiser's case-sensitive protocol allow-list applies. */
export function normalizeUrlScheme(url: string): string {
  return url.replace(/^[a-z][a-z0-9+.-]*:/i, (scheme) => scheme.toLowerCase());
}

/** True for the synthetic paragraph remark-directive creates from a container label (`:::example[Label]`). */
export function isDirectiveLabel(node: Nodes | undefined): node is Paragraph {
  return node?.type === "paragraph" && node.data?.directiveLabel === true;
}

/**
 * The exact source text of a directive. Used to restore text the author did not mean as a directive: remark-directive
 * treats any `:word` as a text directive, so prose like "ratio a:b" or "Note:this" must come back verbatim.
 */
export function directiveSource(node: Directives, source: string): string {
  const start = node.position?.start.offset;
  const end = node.position?.end.offset;
  if (start !== undefined && end !== undefined && end >= start) return source.slice(start, end);
  const prefix = node.type === "containerDirective" ? ":::" : node.type === "leafDirective" ? "::" : ":";
  return `${prefix}${node.name}`;
}

/** 1-based line of a node, for authoring warnings. */
export function lineOf(node: { position?: { start: { line: number } } | undefined }): number | undefined {
  return node.position?.start.line;
}
