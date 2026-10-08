/**
 * Isomorphic types for rendered educational content. Safe to import from Client Components (e.g. a lesson table of
 * contents or the CMS preview) — the renderer itself lives in `src/server/content/render.ts`.
 */

import type { ContentBlockType } from "./blocks";

declare const sanitizedHtmlBrand: unique symbol;

/**
 * HTML produced by the content pipeline (sanitised, then KaTeX-rendered). The brand makes it a type error to pass an
 * arbitrary string to `<RichContent html>`: the only ways to obtain one are `renderContent` / `renderInline`, or
 * `trustPersistedHtml` for HTML that the pipeline produced earlier and the DB layer cached. Every other source of
 * HTML must go through the renderer.
 */
export type SanitizedHtml = string & { readonly [sanitizedHtmlBrand]: true };

/** `block` = full lesson/explanation markup; `inline` = phrasing-only markup for MCQ options, labels, short answers. */
export type RenderMode = "block" | "inline";

/** A markdown heading, for in-lesson navigation ("On this page"). `text` keeps inline math as LaTeX source. */
export interface ContentHeading {
  /** Unique, slugified, prefixed element id (e.g. `c-factorising-quadratics`). */
  id: string;
  text: string;
  /** Rendered heading level (2–6); `#`/`##` are both rendered at the base level, which is 2 by default. */
  depth: number;
}

export type ContentWarningCode =
  | "image-missing-alt"
  | "image-external"
  | "image-unresolved"
  | "raw-html"
  | "unknown-directive"
  | "directive-attribute"
  | "math-error"
  | "math-currency"
  | "inline-flattened";

/**
 * A problem in authored content that the renderer worked around. Shown in the CMS preview so editors can fix the
 * source; never shown to students. Messages contain no learner data.
 */
export interface ContentWarning {
  code: ContentWarningCode;
  message: string;
  /** 1-based source line, when known. */
  line?: number;
}

export interface RenderedContent {
  html: SanitizedHtml;
  /** Markdown stripped to text (math kept as LaTeX source) for search indexing, SEO descriptions and AI context. */
  plainText: string;
  headings: readonly ContentHeading[];
  hasMath: boolean;
  /** Distinct pedagogical block types used, in order of first appearance. */
  blocks: readonly ContentBlockType[];
  warnings: readonly ContentWarning[];
}
