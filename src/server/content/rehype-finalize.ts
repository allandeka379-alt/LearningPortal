import "server-only";
import type { Element, ElementContent, Root } from "hast";
import type { Plugin } from "unified";
import { isContentBlockType } from "@/lib/content/blocks";
import { getRenderContext, type RenderContext } from "./context";
import { addClass, hasClass, textContent } from "./hast-utils";
import { blockIcon } from "./icons";
import { createSlugger } from "./slug";

interface FinalizeState {
  readonly ctx: RenderContext;
  readonly prefix: string;
  readonly slug: (text: string) => string;
}

const HEADING_TAG = /^h([1-6])$/;
/** `http:`/`https:` URLs (with or without slashes — browsers accept `http:host`) and protocol-relative `//host`. */
const EXTERNAL_HREF = /^(?:https?:|\/\/)/i;

/**
 * Trusted transforms that run AFTER sanitising, on markup that is already safe. Everything added here is generated
 * by us, never copied from the source:
 * - author headings get unique slug ids and are collected for the table of contents;
 * - all ids and in-page links (`#...`, footnotes, `aria-describedby`) get the render's `idPrefix`, so several
 *   rendered documents on one page cannot collide with each other or with app ids such as `#main-content`;
 * - external links open in a new tab with `rel="noopener noreferrer nofollow"` and a screen-reader hint;
 * - anchors whose `href` the sanitiser removed are unwrapped to plain text; images without `src` are dropped;
 * - tables are wrapped in a focusable, labelled scroll container (no horizontal page scroll on phones, §29);
 * - block labels get their decorative icon; worked-solution ordered lists are marked as steps;
 * - in inline mode, the wrapper paragraph is removed so the output is phrasing content only.
 */
export const rehypeFinalize: Plugin<[], Root> = function () {
  return function (tree, file) {
    const ctx = getRenderContext(file);
    const state: FinalizeState = { ctx, prefix: ctx.settings.idPrefix, slug: createSlugger() };
    let children = tree.children.filter((node): node is ElementContent => node.type !== "doctype");
    if (ctx.settings.mode === "inline") children = unwrapParagraphs(children);
    tree.children = finalizeList(children, state);
  };
};

/** Inline mode: the single wrapper paragraph from `remarkContent` is removed so only phrasing content remains. */
function unwrapParagraphs(nodes: readonly ElementContent[]): ElementContent[] {
  return nodes.flatMap((node) => {
    if (node.type === "element" && node.tagName === "p") return node.children;
    if (node.type === "text" && node.value.trim() === "") return [];
    return [node];
  });
}

function finalizeList(nodes: readonly ElementContent[], state: FinalizeState): ElementContent[] {
  const result: ElementContent[] = [];
  for (const node of nodes) {
    if (node.type === "element") result.push(...finalizeElement(node, state));
    else result.push(node);
  }
  return result;
}

function finalizeElement(el: Element, state: FinalizeState): ElementContent[] {
  const { properties } = el;

  if (el.tagName === "img" && (typeof properties.src !== "string" || properties.src === "")) return [];
  if (el.tagName === "a") {
    const href = properties.href;
    if (typeof href !== "string" || href === "") return finalizeList(el.children, state);
    finalizeLink(el, href, state);
  }

  const hadId = typeof properties.id === "string";
  prefixReferences(el, state.prefix);

  const heading = HEADING_TAG.exec(el.tagName);
  if (heading?.[1] && !hadId && !hasClass(el, "cb-heading")) {
    // Text is taken before children are finalised so link hints never leak into ids or the table of contents.
    const text = textContent(el).replace(/\s+/g, " ").trim();
    const id = `${state.prefix}${state.slug(text)}`;
    properties.id = id;
    state.ctx.headings.push({ id, text, depth: Number(heading[1]) });
  }

  if (el.tagName === "section" || el.tagName === "aside") decorateBlock(el);

  el.children = finalizeList(el.children, state);
  return el.tagName === "table" ? [tableScroller(el)] : [el];
}

function finalizeLink(el: Element, href: string, state: FinalizeState): void {
  if (href.startsWith("#")) {
    if (href.length > 1) el.properties.href = `#${state.prefix}${href.slice(1)}`;
    return;
  }
  if (EXTERNAL_HREF.test(href)) {
    el.properties.target = "_blank";
    el.properties.rel = ["noopener", "noreferrer", "nofollow"];
    el.children.push({
      type: "element",
      tagName: "span",
      properties: { className: ["cx-sr-only"] },
      children: [{ type: "text", value: " (opens in a new tab)" }],
    });
  }
}

function prefixReferences(el: Element, prefix: string): void {
  if (!prefix) return;
  const { properties } = el;
  if (typeof properties.id === "string") properties.id = `${prefix}${properties.id}`;
  if (properties.ariaDescribedBy) properties.ariaDescribedBy = properties.ariaDescribedBy.map((id) => `${prefix}${id}`);
}

function decorateBlock(el: Element): void {
  const type = el.properties.dataBlock;
  if (typeof type !== "string" || !isContentBlockType(type)) return;

  for (const child of el.children) {
    if (child.type !== "element") continue;
    if (hasClass(child, "cb-heading")) {
      const label = child.children.find((node) => node.type === "element" && hasClass(node, "cb-label"));
      if (label?.type === "element") label.children.unshift(blockIcon(type));
    } else if (type === "worked-solution" && hasClass(child, "cb-body")) {
      for (const node of child.children) {
        if (node.type === "element" && node.tagName === "ol") addClass(node, "cb-steps");
      }
    }
  }
}

function tableScroller(table: Element): Element {
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["cx-table-wrap"], role: "region", ariaLabel: "Table", tabIndex: 0 },
    children: [table],
  };
}
