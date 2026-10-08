import "server-only";
import type { Element, ElementContent, Root } from "hast";
import katex, { type KatexOptions, type TrustContext } from "katex";
// Registers \ce and \pu (chemical equations and units) on the same KaTeX instance — O/A-Level chemistry needs them.
import "katex/contrib/mhchem";
import type { Plugin } from "unified";
import { getRenderContext, type RenderContext } from "./context";
import { hasClass, textContent } from "./hast-utils";
import { escapeHtml, truncate } from "./strings";

/**
 * KaTeX settings (§8 proper notation, §39 XSS, §43 accessibility):
 * - `trust` (see {@link denyAndRecord}) is never granted, which disables every command that can emit links,
 *   classes, ids, styles, data attributes or images (`\href`, `\url`, `\htmlClass`, `\htmlId`, `\htmlStyle`,
 *   `\htmlData`, `\includegraphics`); KaTeX shows them as inert red text;
 * - `output: "htmlAndMathml"` keeps MathML alongside the visual HTML so screen readers can read the maths;
 * - `strict: "ignore"` renders LaTeX-isms (e.g. unicode text in math) instead of erroring on them;
 * - `maxSize`/`maxExpand` bound sizes and macro expansion so malformed or hostile input cannot produce giant page
 *   overlays or exponential output;
 * - `macros` is deliberately NOT shared: a shared object would let `\gdef` in one document leak into the next.
 */
const KATEX_OPTIONS = {
  output: "htmlAndMathml",
  strict: "ignore",
  maxSize: 10,
  maxExpand: 500,
} as const satisfies KatexOptions;

/**
 * Renders math marked by remark-math (`code.math-inline`, `pre > code.math-display`) and ```` ```math ```` fences
 * with KaTeX. Runs AFTER the sanitiser: KaTeX output is trusted (it escapes all text and, with `trust: false`, emits
 * no URLs or arbitrary attributes), and is inserted as a `raw` node that `rehype-stringify` writes verbatim. No other
 * step creates `raw` nodes: remark-rehype runs without `allowDangerousHtml` and the sanitiser drops unknown node
 * types — so author-written HTML can never take this path.
 *
 * Why not `rehype-katex`: v7 depends on its own nested copy of katex@0.16 while the app (and the stylesheet that
 * `RichContent` loads) uses katex@0.19; markup and CSS from different KaTeX versions drift, and the mhchem
 * extension registers itself on only one copy. Rendering here keeps one KaTeX version end to end.
 */
export const rehypeMath: Plugin<[], Root> = function () {
  return function (tree, file) {
    const ctx = getRenderContext(file);
    renderMathIn(tree, ctx);
  };
};

function renderMathIn(parent: Root | Element, ctx: RenderContext): void {
  parent.children.forEach((child, index) => {
    if (child.type !== "element") return;
    const math = mathSource(child);
    if (!math) {
      renderMathIn(child, ctx);
      return;
    }
    const replacement: ElementContent = { type: "raw", value: renderTex(math.tex, math.display, ctx, child) };
    parent.children[index] = replacement;
  });
}

function mathSource(el: Element): { tex: string; display: boolean } | null {
  if (el.tagName === "pre") {
    const [code, ...others] = el.children.filter((node) => node.type === "element");
    if (code && others.length === 0 && code.tagName === "code" && hasClass(code, "language-math")) {
      return { tex: textContent(code), display: true };
    }
    return null;
  }
  if (el.tagName === "code") {
    if (hasClass(el, "math-display")) return { tex: textContent(el), display: true };
    if (hasClass(el, "math-inline") || hasClass(el, "language-math")) return { tex: textContent(el), display: false };
  }
  return null;
}

function renderTex(tex: string, displayMode: boolean, ctx: RenderContext, el: Element): string {
  const line = el.position?.start.line;
  const denied = new Set<string>();
  const trust = denyAndRecord(denied);
  try {
    const html = katex.renderToString(tex, { ...KATEX_OPTIONS, trust, displayMode, throwOnError: true });
    for (const command of denied) {
      ctx.warn("math-error", `${command} is not allowed in maths (links, images and HTML are disabled) and is shown as text.`, line);
    }
    return html;
  } catch (error) {
    const reason = error instanceof Error ? error.message.replace(/^KaTeX parse error: /, "") : "unknown error";
    ctx.warn("math-error", `Could not render math "${truncate(tex, 60)}": ${truncate(reason, 160)}`, line);
    try {
      // KaTeX's own error rendering: shows the source in the error colour with the message as a tooltip.
      return katex.renderToString(tex, { ...KATEX_OPTIONS, trust: false, displayMode, throwOnError: false });
    } catch {
      return `<span class="katex-error">${escapeHtml(tex)}</span>`;
    }
  }
}

/**
 * KaTeX `trust` callback that ALWAYS denies. It is a function rather than `false` only so that the denied commands
 * can be reported to authors; otherwise they would silently appear as red text in the preview.
 */
function denyAndRecord(denied: Set<string>): (context: TrustContext) => boolean {
  return (context) => {
    denied.add(context.command);
    return false;
  };
}
