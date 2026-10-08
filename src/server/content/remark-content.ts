import "server-only";
import type {
  BlockContent,
  Definition,
  Heading,
  Html,
  Image,
  ImageReference,
  Paragraph,
  Parents,
  PhrasingContent,
  Root,
  RootContent,
  Text,
} from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import type { InlineMath, Math as DisplayMath } from "mdast-util-math";
import type { Plugin } from "unified";
import {
  CONTENT_BLOCK_LABELS,
  CONTENT_BLOCK_TITLE_ATTRIBUTE,
  CONTENT_BLOCK_TYPES,
  isContentBlockType,
  type ContentBlockType,
} from "@/lib/content/blocks";
import { getRenderContext, type RenderContext, type ResolvedAsset } from "./context";
import { classifyImageUrl, directiveSource, isDirectiveLabel, lineOf, normalizeUrlScheme } from "./mdast-utils";
import { mdastToPlainText } from "./plain-text";
import { truncate } from "./strings";

type Depth = Heading["depth"];

/**
 * Element used for each block. Asides hold content that supports the main explanation (pitfalls, tips, notes);
 * sections hold core lesson content. Both get a real heading so screen-reader users can jump between blocks.
 */
const BLOCK_ELEMENT: Readonly<Record<ContentBlockType, "section" | "aside">> = {
  definition: "section",
  keyfact: "section",
  example: "section",
  "worked-solution": "section",
  mistake: "aside",
  "exam-tip": "aside",
  note: "aside",
  formula: "section",
  summary: "section",
};

const PHRASING_TYPES: ReadonlySet<string> = new Set([
  "text",
  "emphasis",
  "strong",
  "delete",
  "inlineCode",
  "inlineMath",
  "break",
  "link",
  "linkReference",
  "image",
  "imageReference",
  "footnoteReference",
  "html",
  "textDirective",
]);

const BR_TAG = /^<br\s*\/?>$/i;

/** Resolved asset URLs must be http(s) or same-origin paths (the sanitiser enforces this again). */
const SAFE_ASSET_SRC = /^(?:https?:\/\/|\/(?!\/))/i;

interface TransformState {
  readonly ctx: RenderContext;
  readonly definitions: ReadonlyMap<string, Definition>;
  readonly inline: boolean;
  /** Rendered depth of the most recent author heading, in document order. */
  lastHeadingDepth: number | null;
}

/** Captures plain text from the untransformed tree (identical to what `toPlainText` produces for the same source). */
export const remarkCapturePlainText: Plugin<[], Root> = function () {
  return function (tree, file) {
    const ctx = getRenderContext(file);
    ctx.plainText = mdastToPlainText(tree, ctx.source);
  };
};

/**
 * The content-model transform, run on mdast BEFORE conversion to HTML and sanitising:
 * - pedagogical container directives → `<section|aside class="cb cb-<type>" data-block>` with an accessible heading;
 *   unknown directives are unwrapped / restored to their source text (and reported);
 * - `asset:` images resolved through the pre-resolved asset map; external, unresolved and alt-less images replaced
 *   by a link-less note or omitted (alt text is required, §43);
 * - raw HTML dropped (except `<br>`), heading depths shifted so content never emits an `<h1>`;
 * - in inline mode, everything is flattened to phrasing content (no block-level output).
 *
 * It only ever produces markdown nodes and `data.hName`/`data.hProperties` hints; every element and attribute it
 * creates still has to pass the sanitiser schema.
 */
export const remarkContent: Plugin<[], Root> = function () {
  return function (tree, file) {
    const ctx = getRenderContext(file);
    const state: TransformState = {
      ctx,
      definitions: collectDefinitions(tree),
      inline: ctx.settings.mode === "inline",
      lastHeadingDepth: null,
    };
    tree.children = transformList(tree.children, state, null);
    // Inline output is kept inside ONE paragraph here: remark-rehype separates root children with newlines, which
    // would render as stray spaces ("A :"). rehype-finalize unwraps the paragraph after sanitising.
    if (state.inline) tree.children = [{ type: "paragraph", children: flattenToPhrasing(tree.children, ctx) }];
  };
};

/**
 * mdast types each parent's children precisely, which a generic walker cannot express. Every transformation here
 * keeps the content category of the node it replaces (phrasing → phrasing, flow → flow), so this cast is sound.
 */
function sameCategory<T extends RootContent>(nodes: RootContent[]): T[] {
  return nodes as T[];
}

function transformList(nodes: readonly RootContent[], state: TransformState, blockLevel: number | null): RootContent[] {
  const result: RootContent[] = [];
  for (const node of nodes) result.push(...transformNode(node, state, blockLevel));
  return result;
}

function transformChildren(parent: Parents, state: TransformState, blockLevel: number | null): void {
  (parent as { children: RootContent[] }).children = transformList(parent.children, state, blockLevel);
}

function transformNode(node: RootContent, state: TransformState, blockLevel: number | null): RootContent[] {
  const { ctx } = state;
  switch (node.type) {
    case "html":
      return transformHtml(node, ctx);
    case "heading": {
      if (!state.inline) {
        const base = ctx.settings.baseHeadingLevel;
        node.depth = toDepth(Math.max(base, node.depth + base - 2));
        state.lastHeadingDepth = node.depth;
      }
      transformChildren(node, state, blockLevel);
      return [node];
    }
    case "inlineMath":
      ctx.hasMath = true;
      if (/^\s|\s$/.test(node.value)) {
        ctx.warn(
          "math-currency",
          "Inline math starts or ends with a space. If you meant an amount of money, escape the dollar sign: \\$5.",
          lineOf(node),
        );
      }
      return [node];
    case "math":
      ctx.hasMath = true;
      return [node];
    case "code":
      if (node.lang === "math") ctx.hasMath = true;
      return [node];
    case "image":
      return transformImage(node, ctx);
    case "imageReference":
      return transformImageReference(node, state);
    case "link":
      node.url = normalizeUrlScheme(node.url);
      transformChildren(node, state, blockLevel);
      return [node];
    case "definition":
      node.url = normalizeUrlScheme(node.url);
      return [node];
    case "containerDirective":
      return transformContainer(node, state, blockLevel);
    case "leafDirective":
      ctx.warn(
        "unknown-directive",
        `"::${node.name}" is not a supported block and is shown as text. Blocks use ":::name" on their own line and close with ":::".`,
        lineOf(node),
      );
      return [{ type: "paragraph", children: [{ type: "text", value: directiveSource(node, ctx.source) }], position: node.position }];
    case "textDirective":
      // Not an authoring error: prose such as "ratio a:b" parses as a text directive. Restore it verbatim.
      return [{ type: "text", value: directiveSource(node, ctx.source), position: node.position }];
    case "footnoteReference":
      return state.inline ? [] : [node];
    case "footnoteDefinition":
      if (state.inline) return [];
      transformChildren(node, state, blockLevel);
      return [node];
    case "paragraph":
      transformChildren(node, state, blockLevel);
      // e.g. a paragraph that only held an omitted image.
      if (node.children.every((child) => child.type === "text" && child.value.trim() === "")) return [];
      if (state.inline) return [node];
      return [standaloneDisplayMath(node, ctx.source) ?? toFigureIfStandaloneImage(node)];
    default:
      if ("children" in node) transformChildren(node, state, blockLevel);
      return [node];
  }
}

function transformHtml(node: Html, ctx: RenderContext): RootContent[] {
  const value = node.value.trim();
  if (BR_TAG.test(value)) return [{ type: "break", position: node.position }];
  // HTML comments are a legitimate way for editors to leave notes in the source; drop them silently.
  if (!value.startsWith("<!--")) {
    ctx.warn("raw-html", "Raw HTML is not supported and was removed. Use markdown or a content block instead.", lineOf(node));
  }
  return [];
}

function transformImageReference(node: ImageReference, state: TransformState): RootContent[] {
  const definition = state.definitions.get(node.identifier);
  // Without a definition remark-rehype renders the reference as literal text, which is safe.
  if (!definition) return [node];
  return transformImage(
    { type: "image", url: definition.url, title: definition.title, alt: node.alt, position: node.position },
    state.ctx,
  );
}

function transformImage(node: Image, ctx: RenderContext): PhrasingContent[] {
  const line = lineOf(node);
  const alt = (node.alt ?? "").trim();
  const url = classifyImageUrl(node.url);

  if (url.kind === "external") {
    ctx.warn(
      "image-external",
      "External images are not allowed. Upload the image to the media library and reference it as asset:<id>.",
      line,
    );
    return [mediaNote(alt ? `Image not shown: ${alt}` : "Image not shown", node)];
  }
  if (url.kind === "invalid-asset") {
    ctx.warn("image-unresolved", `"${truncate(node.url, 80)}" is not a valid asset reference.`, line);
    return [mediaNote(alt ? `Image unavailable: ${alt}` : "Image unavailable", node)];
  }

  const asset = ctx.settings.assets.get(url.id);
  if (!asset || !SAFE_ASSET_SRC.test(asset.src)) {
    ctx.warn(
      "image-unresolved",
      asset ? `Image asset "${url.id}" has an unsupported URL.` : `Image asset "${url.id}" could not be found.`,
      line,
    );
    return [mediaNote(alt ? `Image unavailable: ${alt}` : "Image unavailable", node)];
  }

  const finalAlt = alt || (asset.alt ?? "").trim();
  if (!finalAlt) {
    ctx.warn(
      "image-missing-alt",
      `Image "${url.id}" has no alt text and was omitted. Describe it: ![what the image shows](asset:${url.id}).`,
      line,
    );
    return [];
  }

  node.url = asset.src;
  node.alt = finalAlt;
  node.data = { ...node.data, hProperties: { ...imageDimensions(asset), loading: "lazy", decoding: "async" } };
  return [node];
}

/** Width and height are emitted only as a valid pair, so browsers can reserve the aspect ratio (no layout shift). */
function imageDimensions(asset: ResolvedAsset): { width?: number; height?: number } {
  const { width, height } = asset;
  const valid = (n: number | null | undefined): n is number => typeof n === "number" && Number.isInteger(n) && n > 0;
  return valid(width) && valid(height) ? { width, height } : {};
}

function mediaNote(value: string, node: Image): Text {
  return {
    type: "text",
    value,
    position: node.position,
    data: { hName: "span", hProperties: { className: ["cx-media-note"] } },
  };
}

/**
 * remark-math only treats `$$` as display math when the fences are on their own lines; `$$x^2$$` written on one
 * line parses as inline math. Authors (and other KaTeX/MathJax tools) expect display math for a paragraph that
 * consists solely of `$$...$$`, so promote it.
 */
function standaloneDisplayMath(node: Paragraph, source: string): DisplayMath | null {
  const content = node.children.filter((child) => !(child.type === "text" && child.value.trim() === ""));
  const [only] = content;
  if (content.length !== 1 || only?.type !== "inlineMath") return null;
  const start = only.position?.start.offset;
  if (start === undefined || !source.startsWith("$$", start)) return null;
  return displayMathNode(only.value, node);
}

/** A paragraph holding only one (resolved) image becomes `<figure>`; the markdown title becomes its `<figcaption>`. */
function toFigureIfStandaloneImage(node: Paragraph): Paragraph {
  const content = node.children.filter((child) => !(child.type === "text" && child.value.trim() === ""));
  const [only] = content;
  if (content.length !== 1 || only?.type !== "image") return node;

  const children: PhrasingContent[] = [only];
  const caption = only.title?.trim();
  if (caption) {
    children.push({ type: "text", value: caption, data: { hName: "figcaption" } });
    only.title = null;
  }
  node.children = children;
  node.data = { ...node.data, hName: "figure", hProperties: { className: ["cx-figure"] } };
  return node;
}

function transformContainer(node: ContainerDirective, state: TransformState, blockLevel: number | null): RootContent[] {
  const { ctx } = state;
  const line = lineOf(node);
  const name = node.name;

  if (!isContentBlockType(name)) {
    ctx.warn(
      "unknown-directive",
      `":::${name}" is not a supported block; its content is shown without a box. Supported: ${CONTENT_BLOCK_TYPES.join(", ")}.`,
      line,
    );
    return transformList(node.children, state, blockLevel);
  }

  // Attributes are never copied to the output (no class/id/style/on* injection); only the title is read, as text.
  const titleAttribute = CONTENT_BLOCK_TITLE_ATTRIBUTE[name];
  for (const key of Object.keys(node.attributes ?? {})) {
    if (key !== titleAttribute) {
      ctx.warn("directive-attribute", `Attribute "${truncate(key, 40)}" is not supported on :::${name} and was ignored.`, line);
    }
  }

  const [first, ...rest] = node.children;
  const label = isDirectiveLabel(first) ? first.children : null;
  const body = label ? rest : node.children;

  if (state.inline) {
    ctx.warn("inline-flattened", `Content blocks such as :::${name} are not supported here; only the content was kept.`, line);
    return transformList(body, state, blockLevel);
  }

  ctx.blocks.add(name);
  const depth = blockHeadingDepth(state, blockLevel);

  let title: PhrasingContent[] | null =
    label && label.length > 0 ? sameCategory<PhrasingContent>(transformList(label, state, depth)) : null;
  if (!title) {
    const attributeTitle = node.attributes?.[titleAttribute]?.trim();
    if (attributeTitle) title = [{ type: "text", value: attributeTitle }];
  }

  const bodyWrapper: BlockContent = {
    type: "blockquote",
    children: sameCategory<BlockContent>(transformList(body, state, depth)),
    data: { hName: "div", hProperties: { className: ["cb-body"] } },
  };

  node.attributes = {};
  node.children = [blockHeading(name, depth, title), bodyWrapper];
  node.data = {
    ...node.data,
    hName: BLOCK_ELEMENT[name],
    hProperties: { className: ["cb", `cb-${name}`], dataBlock: name },
  };
  return [node];
}

/**
 * Block headings continue the document outline: one level below the nearest preceding author heading (or the
 * enclosing block), and the base level when nothing precedes them. E.g. after `## Factorising` a worked solution
 * gets an `<h3>`; a block in a heading-less question explanation gets an `<h2>` (or `baseHeadingLevel`).
 */
function blockHeadingDepth(state: TransformState, parentBlockLevel: number | null): Depth {
  const base = state.ctx.settings.baseHeadingLevel;
  const context = parentBlockLevel ?? state.lastHeadingDepth ?? base - 1;
  return toDepth(Math.max(base, context + 1));
}

const DEPTHS = [1, 2, 3, 4, 5, 6] as const satisfies readonly Depth[];

function toDepth(value: number): Depth {
  return DEPTHS[Math.min(6, Math.max(1, Math.round(value))) - 1] ?? 6;
}

function blockHeading(type: ContentBlockType, depth: Depth, title: PhrasingContent[] | null): Heading {
  const children: PhrasingContent[] = [classedText(CONTENT_BLOCK_LABELS[type], "cb-label")];
  if (title) {
    // Visually the label and title sit on separate lines; the hidden separator keeps the accessible name readable
    // ("Definition: Osmosis" rather than "DefinitionOsmosis").
    children.push(classedText(": ", "cx-sr-only"));
    const titleContent: PhrasingContent[] =
      type === "definition" ? [{ type: "emphasis", children: title, data: { hName: "dfn" } }] : title;
    children.push({ type: "emphasis", children: titleContent, data: { hName: "span", hProperties: { className: ["cb-title"] } } });
  }
  return { type: "heading", depth, children, data: { hProperties: { className: ["cb-heading"] } } };
}

function classedText(value: string, className: string): Text {
  return { type: "text", value, data: { hName: "span", hProperties: { className: [className] } } };
}

function collectDefinitions(tree: Root): Map<string, Definition> {
  const definitions = new Map<string, Definition>();
  const visit = (node: RootContent): void => {
    // CommonMark: the first definition of an identifier wins.
    if (node.type === "definition" && !definitions.has(node.identifier)) definitions.set(node.identifier, node);
    if ("children" in node) for (const child of node.children) visit(child);
  };
  for (const child of tree.children) visit(child);
  return definitions;
}

function inlineMathNode(value: string): InlineMath {
  return {
    type: "inlineMath",
    value,
    data: {
      hName: "code",
      hProperties: { className: ["language-math", "math-inline"] },
      hChildren: [{ type: "text", value }],
    },
  };
}

/** Display math with the same hast hints mdast-util-math attaches when parsing `$$` fences. */
function displayMathNode(value: string, origin: Paragraph): DisplayMath {
  return {
    type: "math",
    value,
    position: origin.position,
    data: {
      hName: "pre",
      hChildren: [
        {
          type: "element",
          tagName: "code",
          properties: { className: ["language-math", "math-display"] },
          children: [{ type: "text", value }],
        },
      ],
    },
  };
}

function isPhrasing(node: RootContent): node is PhrasingContent {
  return PHRASING_TYPES.has(node.type);
}

/**
 * Inline mode: reduce the tree to phrasing content so the HTML can live inside `<label>`, `<button>` or `<span>`.
 * Paragraphs/list items/table rows become line-broken runs, display math becomes inline math, code blocks become
 * inline code. Anything beyond plain paragraphs is reported so authors know the structure was lost.
 */
function flattenToPhrasing(nodes: readonly RootContent[], ctx: RenderContext): PhrasingContent[] {
  const lines: PhrasingContent[][] = [];
  let lostStructure = false;

  const visit = (node: RootContent): void => {
    switch (node.type) {
      case "paragraph":
        lines.push(node.children);
        return;
      case "heading":
        lostStructure = true;
        lines.push(node.children);
        return;
      case "math":
        lostStructure = true;
        lines.push([inlineMathNode(node.value)]);
        return;
      case "code":
        lostStructure = true;
        lines.push([node.lang === "math" ? inlineMathNode(node.value) : { type: "inlineCode", value: node.value }]);
        return;
      case "table":
        lostStructure = true;
        for (const row of node.children) lines.push(joinWith(row.children.map((cell) => cell.children), { type: "text", value: " " }));
        return;
      case "thematicBreak":
      case "definition":
      case "footnoteDefinition":
      case "yaml":
        return;
      default:
        if (isPhrasing(node)) {
          lines.push([node]);
        } else if ("children" in node) {
          lostStructure = true;
          for (const child of node.children) visit(child);
        }
    }
  };

  for (const node of nodes) visit(node);
  if (lostStructure) {
    ctx.warn("inline-flattened", "Only inline content (text, emphasis, math, links, images) is supported here; block structure was flattened.");
  }
  return joinWith(lines, { type: "break" });
}

function joinWith(groups: readonly PhrasingContent[][], separator: PhrasingContent): PhrasingContent[] {
  const result: PhrasingContent[] = [];
  for (const group of groups) {
    if (group.length === 0) continue;
    if (result.length > 0) result.push({ ...separator });
    result.push(...group);
  }
  return result;
}
