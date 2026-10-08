import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import { CONTENT_BLOCK_LABELS, CONTENT_BLOCK_TYPES } from "@/lib/content/blocks";
import { logger, redact, type Logger } from "@/server/lib/logger";
import {
  MAX_SOURCE_LENGTH,
  clearContentCache,
  collectAssetIds,
  contentHash,
  renderContent,
  renderInline,
  toExcerpt,
  toPlainText,
  type AssetResolver,
  type ResolvedAsset,
} from "./render";

let warnSpy: MockInstance<Logger["warn"]>;

beforeEach(() => {
  clearContentCache();
  warnSpy = vi.spyOn(logger, "warn").mockImplementation(() => undefined);
});

afterEach(() => {
  warnSpy.mockRestore();
});

const html = (source: string, options?: Parameters<typeof renderContent>[1]) => renderContent(source, options).html;
const codes = (source: string, options?: Parameters<typeof renderContent>[1]) =>
  renderContent(source, options).warnings.map((warning) => warning.code);

const ASSETS: Record<string, ResolvedAsset> = {
  "cell-1": { src: "https://cdn.example.test/media/cell-1.webp", width: 640, height: 480, alt: "Stored alt text" },
  "noalt-1": { src: "https://cdn.example.test/media/noalt-1.webp", width: 10, height: 10 },
  "evil-1": { src: "javascript:alert(1)", width: 10, height: 10, alt: "x" },
  "svg-1": { src: "data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9YWxlcnQoMSk+", alt: "x" },
};
const resolveAsset: AssetResolver = (id) => ASSETS[id] ?? null;

describe("markdown basics", () => {
  it("renders paragraphs, emphasis, strikethrough, lists, quotes, code and rules", () => {
    const out = html(
      [
        "Plain *em* **strong** ~~gone~~ `code`.",
        "",
        "- one",
        "- two",
        "  1. nested",
        "",
        "> quoted",
        "",
        "```ts",
        "const x = 1;",
        "```",
        "",
        "---",
      ].join("\n"),
    );
    expect(out).toContain("<p>Plain <em>em</em> <strong>strong</strong> <del>gone</del> <code>code</code>.</p>");
    expect(out).toMatch(/<ul>\s*<li>one<\/li>\s*<li>two\s*<ol>\s*<li>nested<\/li>\s*<\/ol>\s*<\/li>\s*<\/ul>/);
    expect(out).toMatch(/<blockquote>\s*<p>quoted<\/p>\s*<\/blockquote>/);
    expect(out).toContain('<pre><code class="language-ts">const x = 1;\n</code></pre>');
    expect(out).toContain("<hr>");
  });

  it("does not treat a single tilde (approximately) as strikethrough", () => {
    expect(html("The rod is ~5 cm, the pipe ~6 cm.")).not.toContain("<del>");
  });

  it("renders GFM task lists as disabled checkboxes", () => {
    const out = html("- [x] done\n- [ ] todo");
    expect(out).toContain('<input type="checkbox" checked disabled>');
    expect(out).toContain('<input type="checkbox" disabled>');
  });

  it("returns an empty document for empty input", () => {
    const result = renderContent("");
    expect(result.html).toBe("");
    expect(result.plainText).toBe("");
    expect(result.headings).toEqual([]);
  });
});

describe("GFM tables", () => {
  it("wraps tables in a focusable, labelled horizontal scroller and keeps column alignment", () => {
    const out = html("| x | y |\n|:-:|--:|\n| 1 | 2 |");
    expect(out).toMatch(/^<div class="cx-table-wrap" role="region" aria-label="Table" tabindex="0"><table>/);
    expect(out).toContain('<th align="center">x</th>');
    expect(out).toContain('<td align="right">2</td>');
    expect(out).toMatch(/<\/table><\/div>$/);
  });
});

describe("math", () => {
  it("renders inline math with KaTeX HTML and MathML for screen readers", () => {
    const result = renderContent(String.raw`Area is $\pi r^2$ here.`);
    expect(result.hasMath).toBe(true);
    expect(result.html).toContain('<span class="katex">');
    expect(result.html).toContain('<math xmlns="http://www.w3.org/1998/Math/MathML">');
    expect(result.html).toContain('<annotation encoding="application/x-tex">\\pi r^2</annotation>');
    expect(result.html).toContain('<span class="katex-html" aria-hidden="true">');
    expect(result.html).not.toContain("katex-display");
    expect(result.html.startsWith("<p>Area is ")).toBe(true);
  });

  it("renders display math as a block with display MathML", () => {
    const out = html(String.raw`$$
\frac{a}{b}
$$`);
    expect(out).toContain('<span class="katex-display">');
    expect(out).toContain('display="block"');
    expect(out).toContain("<mfrac>");
    expect(out).not.toContain("<pre>");
  });

  it("promotes a paragraph that is only $$...$$ on one line to display math, but not $$ inside text", () => {
    expect(html(String.raw`$$\frac{1}{2}$$`)).toContain("katex-display");
    expect(html(String.raw`Half is $$\frac{1}{2}$$ exactly.`)).not.toContain("katex-display");
  });

  it("renders ```math fences as display math", () => {
    const out = html("```math\n\\int_0^1 x\\,dx\n```");
    expect(out).toContain("katex-display");
    expect(out).toContain("<msubsup>");
  });

  it("supports chemistry notation via mhchem", () => {
    const result = renderContent(String.raw`Water: $\ce{2H2 + O2 -> 2H2O}$`);
    expect(result.warnings).toEqual([]);
    expect(result.html).toContain('<span class="katex">');
    expect(result.html).not.toContain("katex-error");
  });

  it("reports invalid LaTeX without throwing and renders it as a KaTeX error", () => {
    const result = renderContent(String.raw`Broken $\frac{1}{$ maths`);
    expect(result.html).toContain('class="katex-error"');
    expect(result.warnings.map((w) => w.code)).toEqual(["math-error"]);
    expect(result.warnings[0]?.line).toBe(1);
  });

  it("warns about likely currency parsed as math and leaves escaped dollars alone", () => {
    expect(codes("It costs $5 and $10 in total.")).toContain("math-currency");
    const escaped = renderContent(String.raw`It costs \$5 and \$10 in total.`);
    expect(escaped.hasMath).toBe(false);
    expect(escaped.html).toBe("<p>It costs $5 and $10 in total.</p>");
  });

  it("does not leak \\gdef macros between documents", () => {
    renderContent(String.raw`$\gdef\leak{LEAKED}\leak$`);
    const second = renderContent(String.raw`$\leak$`);
    expect(second.html).not.toContain("LEAKED");
    // Undefined in the second document: KaTeX shows the command as red text and we report it.
    expect(second.warnings.map((w) => w.code)).toEqual(["math-error"]);
  });

  it("bounds macro expansion (no runaway output)", () => {
    const result = renderContent(String.raw`$\def\a{\a\a}\a$`);
    expect(result.warnings.map((w) => w.code)).toContain("math-error");
    expect(result.html.length).toBeLessThan(5_000);
  });

  it("reports hasMath false for content without maths", () => {
    expect(renderContent("Just words.").hasMath).toBe(false);
  });
});

describe("pedagogical blocks", () => {
  it.each(CONTENT_BLOCK_TYPES)("renders :::%s as an accessible, labelled block", (type) => {
    const result = renderContent(`:::${type}\nBody text for the block.\n:::`);
    const element = ["mistake", "exam-tip", "note"].includes(type) ? "aside" : "section";
    expect(result.html).toContain(`<${element} class="cb cb-${type}" data-block="${type}">`);
    expect(result.html).toContain('<h2 class="cb-heading"><span class="cb-label"><svg class="cb-icon"');
    expect(result.html).toContain(`</svg>${CONTENT_BLOCK_LABELS[type]}</span></h2>`);
    expect(result.html).toMatch(/aria-hidden="true" focusable="false"/);
    expect(result.html).toContain('<div class="cb-body">\n<p>Body text for the block.</p>\n</div>');
    expect(result.blocks).toEqual([type]);
    expect(result.warnings).toEqual([]);
    expect(result.headings).toEqual([]);
  });

  it("renders the definition term as <dfn> with an accessible separator", () => {
    const out = html(':::definition{term="Photosynthesis"}\nPlants make glucose.\n:::');
    expect(out).toContain(
      '<span class="cx-sr-only">: </span><span class="cb-title"><dfn>Photosynthesis</dfn></span></h2>',
    );
  });

  it("uses title/name attributes, and a directive label (with math) takes precedence", () => {
    expect(html(':::example{title="Simultaneous equations"}\nx\n:::')).toContain(
      '<span class="cb-title">Simultaneous equations</span>',
    );
    expect(html(':::formula{name="Quadratic formula"}\nx\n:::')).toContain('<span class="cb-title">Quadratic formula</span>');
    const labelled = renderContent(':::example[Solve $x^2 = 4$]{title="ignored"}\nx\n:::');
    expect(labelled.html).toMatch(/<span class="cb-title">Solve <span class="katex">/);
    expect(labelled.html).not.toContain("ignored");
    expect(labelled.hasMath).toBe(true);
  });

  it("marks ordered lists in worked solutions as numbered steps", () => {
    const out = html(":::worked-solution\n1. Expand the brackets.\n2. Collect like terms.\n:::");
    expect(out).toMatch(/<ol class="cb-steps">\s*<li>Expand the brackets.<\/li>/);
  });

  it("continues the document outline: block headings sit one level below the preceding heading", () => {
    const out = html(["## Factorising", "", "::::example", "Outer", "", ":::note", "Inner", ":::", "::::"].join("\n"));
    expect(out).toContain('<section class="cb cb-example" data-block="example"><h3 class="cb-heading">');
    expect(out).toContain('<aside class="cb cb-note" data-block="note"><h4 class="cb-heading">');
  });

  it("uses baseHeadingLevel for blocks and headings when content sits under a page heading", () => {
    const out = html("# Topic\n\n:::note\nx\n:::", { baseHeadingLevel: 3 });
    expect(out).toContain('<h3 id="c-topic">Topic</h3>');
    expect(out).toContain('<h4 class="cb-heading">');
  });

  it("lists distinct block types in order of first appearance", () => {
    const result = renderContent(":::exam-tip\na\n:::\n\n:::note\nb\n:::\n\n:::exam-tip\nc\n:::");
    expect(result.blocks).toEqual(["exam-tip", "note"]);
  });

  it("unwraps unknown container directives, keeping their content, and warns", () => {
    const result = renderContent(":::spoiler\nHidden *text*\n:::");
    expect(result.html).toBe("<p>Hidden <em>text</em></p>");
    expect(result.warnings.map((w) => w.code)).toEqual(["unknown-directive"]);
  });

  it("restores prose that looks like text directives verbatim", () => {
    const result = renderContent("Ratio a:b, Note:this and 10:30am.");
    expect(result.html).toBe("<p>Ratio a:b, Note:this and 10:30am.</p>");
    expect(result.warnings).toEqual([]);
  });

  it("shows leaf directives as text and warns", () => {
    const result = renderContent("::note[Single line]");
    expect(result.html).toBe("<p>::note[Single line]</p>");
    expect(result.warnings.map((w) => w.code)).toEqual(["unknown-directive"]);
  });

  it("includes block labels in plain text", () => {
    const result = renderContent(':::definition{term="Osmosis"}\nWater moves.\n:::');
    expect(result.plainText).toBe("Definition: Osmosis\nWater moves.");
  });
});

describe("images", () => {
  it("resolves asset references with dimensions and lazy loading, as a figure with caption", () => {
    const out = html('![A plant cell](asset:cell-1 "Figure 1: a plant cell")', { resolveAsset });
    expect(out).toBe(
      '<figure class="cx-figure"><img src="https://cdn.example.test/media/cell-1.webp" alt="A plant cell" width="640" height="480" loading="lazy" decoding="async"><figcaption>Figure 1: a plant cell</figcaption></figure>',
    );
  });

  it("keeps images inside running text inline (no figure)", () => {
    const out = html("See ![a cell](asset:cell-1) here.", { resolveAsset });
    expect(out).toMatch(/^<p>See <img src="https:\/\/cdn\.example\.test\/media\/cell-1\.webp" alt="a cell"/);
    expect(out).not.toContain("<figure");
  });

  it("falls back to the asset's stored alt text", () => {
    expect(html("![](asset:cell-1)", { resolveAsset })).toContain('alt="Stored alt text"');
  });

  it("omits images without any alt text and logs a warning", () => {
    const result = renderContent("Before\n\n![](asset:noalt-1)\n\nAfter", { resolveAsset });
    expect(result.html).not.toContain("<img");
    expect(result.html).toBe("<p>Before</p>\n<p>After</p>");
    expect(result.warnings.map((w) => w.code)).toEqual(["image-missing-alt"]);
    expect(result.warnings[0]?.line).toBe(3);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toBe("content.render.warnings");
    // The warning code must survive the logger's redaction (which hides fields named exactly `code`).
    expect(JSON.stringify(redact(warnSpy.mock.calls[0]?.[1]))).toContain('"warningCode":"image-missing-alt"');
  });

  it("rejects external image URLs, rendering a link-less note without the URL", () => {
    const result = renderContent("![Graph of y = x](https://tracker.example.test/pixel.png)");
    expect(result.html).toBe('<p><span class="cx-media-note">Image not shown: Graph of y = x</span></p>');
    expect(result.html).not.toContain("tracker.example.test");
    expect(result.warnings.map((w) => w.code)).toEqual(["image-external"]);
  });

  it("renders a note for unknown assets, invalid asset ids, and when no resolver is given", () => {
    expect(html("![Map](asset:missing-1)", { resolveAsset })).toContain('<span class="cx-media-note">Image unavailable: Map</span>');
    expect(codes("![Map](asset:bad/id)", { resolveAsset })).toEqual(["image-unresolved"]);
    expect(codes("![Map](asset:cell-1)")).toEqual(["image-unresolved"]);
  });

  it("resolves reference-style asset images", () => {
    const out = html("![A cell][fig]\n\n[fig]: asset:cell-1", { resolveAsset });
    expect(out).toContain('<img src="https://cdn.example.test/media/cell-1.webp" alt="A cell"');
  });

  it("refuses resolved assets whose src is not http(s) or same-origin", () => {
    for (const source of ["![x](asset:evil-1)", "![x](asset:svg-1)"]) {
      const result = renderContent(source, { resolveAsset });
      expect(result.html).toBe('<p><span class="cx-media-note">Image unavailable: x</span></p>');
      expect(result.warnings.map((w) => w.code)).toEqual(["image-unresolved"]);
    }
  });

  it("collects referenced asset ids for batch loading", () => {
    expect(collectAssetIds("![a](asset:one) ![b](asset:two-2)\n![c](asset:one)")).toEqual(["one", "two-2"]);
    expect(collectAssetIds("no images")).toEqual([]);
  });
});

describe("links", () => {
  it("opens external links in a new tab with safe rel and a screen-reader hint", () => {
    expect(html("[Syllabus](https://example.test/syllabus)")).toBe(
      '<p><a href="https://example.test/syllabus" target="_blank" rel="noopener noreferrer nofollow">Syllabus<span class="cx-sr-only"> (opens in a new tab)</span></a></p>',
    );
  });

  it("treats protocol-relative and upper-case scheme links as external", () => {
    expect(html("[x](//evil.example.test)")).toContain('rel="noopener noreferrer nofollow"');
    expect(html("[x](HTTPS://example.test)")).toContain('<a href="https://example.test" target="_blank"');
  });

  it("keeps internal and mailto links in the same tab", () => {
    expect(html("[Next](/zimsec/o-level/mathematics)")).toBe('<p><a href="/zimsec/o-level/mathematics">Next</a></p>');
    expect(html("[Email](mailto:help@example.test)")).toBe('<p><a href="mailto:help@example.test">Email</a></p>');
  });

  it("autolinks bare URLs", () => {
    expect(html("Visit www.example.test today")).toContain('<a href="http://www.example.test" target="_blank"');
  });
});

describe("headings", () => {
  it("slugifies unique, prefixed ids and collects headings for navigation", () => {
    const result = renderContent("# Intro\n\n## Café $x^2$\n\n## Intro\n\n### Intro 1\n\n#### Intro");
    expect(result.headings).toEqual([
      { id: "c-intro", text: "Intro", depth: 2 },
      { id: "c-cafe-x-2", text: "Café x^2", depth: 2 },
      { id: "c-intro-1", text: "Intro", depth: 2 },
      { id: "c-intro-1-1", text: "Intro 1", depth: 3 },
      { id: "c-intro-2", text: "Intro", depth: 4 },
    ]);
    expect(result.html).toContain('<h2 id="c-intro">Intro</h2>');
    expect(result.html).not.toContain("<h1");
  });

  it("applies idPrefix to heading ids, in-page links and footnotes", () => {
    const out = html("## Step one\n\nSee [above](#step-one) and a note[^1].\n\n[^1]: Source.", { idPrefix: "q-42-" });
    expect(out).toContain('<h2 id="q-42-step-one">');
    expect(out).toContain('<a href="#q-42-step-one">above</a>');
    expect(out).toContain('href="#q-42-fn-1" id="q-42-fnref-1"');
    expect(out).toContain('aria-describedby="q-42-footnote-label"');
    expect(out).toContain('<h2 class="cx-sr-only" id="q-42-footnote-label">Footnotes</h2>');
    expect(out).toContain('<li id="q-42-fn-1">');
  });

  it("falls back to a generic slug for headings without ASCII letters", () => {
    expect(renderContent("## ???").headings[0]?.id).toBe("c-section");
  });
});

describe("plain text", () => {
  const source = [
    "## Quadratics",
    "",
    "Solve **$x^2 - 4 = 0$** using [factorising](https://example.test).",
    "",
    "- first",
    "- second",
    "",
    "| a | b |",
    "|---|---|",
    "| 1 | 2 |",
    "",
    ":::exam-tip",
    "Show your working.",
    ":::",
    "",
    "![Parabola](asset:cell-1)",
    "",
    "<div>raw</div>",
    "",
    "$$",
    String.raw`x = \pm 2`,
    "$$",
  ].join("\n");

  it("strips markdown, keeps LaTeX source and block labels", () => {
    expect(toPlainText(source)).toBe(
      [
        "Quadratics",
        "",
        "Solve x^2 - 4 = 0 using factorising.",
        "",
        "first",
        "second",
        "",
        "a | b",
        "1 | 2",
        "",
        "Exam tip",
        "Show your working.",
        "",
        "[Image: Parabola]",
        "",
        String.raw`x = \pm 2`,
      ].join("\n"),
    );
  });

  it("matches the plainText returned by renderContent", () => {
    expect(renderContent(source, { resolveAsset }).plainText).toBe(toPlainText(source));
  });

  it("builds single-line excerpts cut at a word boundary", () => {
    expect(toExcerpt("## Title\n\nShort text.")).toBe("Title Short text.");
    const excerpt = toExcerpt("The quick brown fox jumps over the lazy dog again and again.", 30);
    expect(excerpt).toBe("The quick brown fox jumps…");
    expect(excerpt.length).toBeLessThanOrEqual(30);
    expect(() => toExcerpt("x", 1)).toThrow(RangeError);
  });
});

describe("inline mode", () => {
  const BLOCK_TAGS = /<(?:p|div|ul|ol|li|table|section|aside|h[1-6]|pre|blockquote|figure|hr)\b/;

  it("renders phrasing-only HTML without wrapper paragraphs or stray whitespace", () => {
    const result = renderInline("Option **A**: $x^2$");
    expect(result.html).toMatch(/^Option <strong>A<\/strong>: <span class="katex">/);
    expect(result.html).not.toMatch(BLOCK_TAGS);
    expect(result.warnings).toEqual([]);
  });

  it("joins paragraphs with line breaks", () => {
    expect(renderInline("Line one\n\nLine two").html).toBe("Line one<br>\nLine two");
  });

  it("flattens block content (lists, tables, display maths, blocks, footnotes) and warns", () => {
    const result = renderInline(
      "# Head\n\n- item\n\n| a |\n|---|\n| 1 |\n\n$$\nx\n$$\n\n:::note\nboxed\n:::\n\nref[^1]\n\n[^1]: gone",
    );
    expect(result.html).not.toMatch(BLOCK_TAGS);
    expect(result.html).not.toContain("katex-display");
    expect(result.html).not.toContain("gone");
    expect(result.html).toContain("boxed");
    expect(result.headings).toEqual([]);
    expect(result.blocks).toEqual([]);
    expect(result.warnings.map((w) => w.code)).toContain("inline-flattened");
  });

  it("keeps resolved images inline", () => {
    expect(renderInline("![Graph A](asset:cell-1)", { resolveAsset }).html).toMatch(/^<img src="https:\/\/cdn/);
  });
});

describe("caching and hashing", () => {
  it("returns the same frozen result object for identical input", () => {
    const first = renderContent("# Cached $x$");
    const second = renderContent("# Cached $x$");
    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.headings)).toBe(true);
  });

  it("keys the cache on options and on resolved asset data", () => {
    const base = renderContent("## Same");
    expect(renderContent("## Same", { idPrefix: "x-" })).not.toBe(base);
    expect(renderContent("## Same", { mode: "inline" })).not.toBe(base);

    let src = "https://cdn.example.test/v1.webp";
    const resolver: AssetResolver = () => ({ src, width: 1, height: 1, alt: "a" });
    const v1 = renderContent("![a](asset:img-1)", { resolveAsset: resolver });
    src = "https://cdn.example.test/v2.webp";
    const v2 = renderContent("![a](asset:img-1)", { resolveAsset: resolver });
    expect(v2).not.toBe(v1);
    expect(v2.html).toContain("v2.webp");
  });

  it("logs warnings only when rendering, not on cache hits", () => {
    renderContent("![x](https://example.test/x.png)");
    renderContent("![x](https://example.test/x.png)");
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("re-renders after clearContentCache()", () => {
    const first = renderContent("Hello");
    clearContentCache();
    expect(renderContent("Hello")).not.toBe(first);
  });

  it("produces a stable sha256 contentHash that changes with source and options", () => {
    const hash = contentHash("Hello");
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(contentHash("Hello")).toBe(hash);
    expect(contentHash("Hello!")).not.toBe(hash);
    expect(contentHash("Hello", { mode: "inline" })).not.toBe(hash);
    expect(contentHash("Hello", { idPrefix: "x-" })).not.toBe(hash);
  });
});

describe("option validation", () => {
  it("rejects invalid options and oversized sources", () => {
    expect(() => renderContent("x", { idPrefix: '"><script>' })).toThrow(RangeError);
    expect(() => renderContent("x", { idPrefix: "1abc" })).toThrow(RangeError);
    expect(() => renderContent("x", { baseHeadingLevel: 1 })).toThrow(RangeError);
    expect(() => renderContent("x", { baseHeadingLevel: 7 })).toThrow(RangeError);
    expect(() => renderContent("x".repeat(MAX_SOURCE_LENGTH + 1))).toThrow(RangeError);
    expect(renderContent("## x", { idPrefix: "" }).headings[0]?.id).toBe("x");
  });
});

interface ParsedTag {
  name: string;
  attributes: Map<string, string>;
}

/** Minimal tokenizer for the serialiser's output (double-quoted attribute values, `<` escaped in text). */
function parseTags(out: string): ParsedTag[] {
  const tags: ParsedTag[] = [];
  for (const match of out.matchAll(/<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:="[^"]*")?)*)\s*\/?>/g)) {
    const attributes = new Map<string, string>();
    for (const attribute of (match[2] ?? "").matchAll(/([^\s"'>/=]+)(?:="([^"]*)")?/g)) {
      attributes.set((attribute[1] ?? "").toLowerCase(), attribute[2] ?? "");
    }
    tags.push({ name: (match[1] ?? "").toLowerCase(), attributes });
  }
  return tags;
}

const FORBIDDEN_TAGS = new Set([
  "script", "iframe", "object", "embed", "style", "link", "meta", "base", "form", "textarea", "button", "select",
  "frame", "frameset", "template", "noscript", "foreignobject", "animate", "set",
]);
const URL_ATTRIBUTES = new Set(["href", "src", "srcset", "action", "formaction", "xlink:href", "poster", "background", "cite", "data"]);
const DANGEROUS_URL = /^\s*(?:javascript|vbscript|data|file):/i;

/** Assertions that hold for every rendered document, whatever the input. */
function expectNoXss(out: string): void {
  expect(out).not.toMatch(/<\s*\/?\s*(?:script|iframe|style)\b/i);
  for (const { name, attributes } of parseTags(out)) {
    expect(FORBIDDEN_TAGS.has(name), `forbidden <${name}>`).toBe(false);
    for (const [attribute, value] of attributes) {
      expect(attribute.startsWith("on"), `event handler ${attribute} on <${name}>`).toBe(false);
      if (URL_ATTRIBUTES.has(attribute)) expect(value, `${attribute} on <${name}>`).not.toMatch(DANGEROUS_URL);
    }
    // The only SVG allowed is our own decorative block icon; only GFM task-list checkboxes as inputs.
    if (name === "svg") expect(attributes.get("class")).toBe("cb-icon");
    if (name === "input") expect(attributes.get("type")).toBe("checkbox");
  }
}

describe("XSS: every vector is neutralised", () => {
  const vectors: Record<string, string> = {
    "script block": "<script>alert(1)</script>",
    "inline script": "Hello <script>alert(1)</script> world",
    "img onerror": '<img src=x onerror="alert(1)">',
    "svg onload": "<svg onload=alert(1)><circle r=1></circle></svg>",
    "svg script": "<svg><script>alert(1)</script></svg>",
    "svg xlink": '<svg><a xlink:href="javascript:alert(1)"><text>x</text></a></svg>',
    "iframe": '<iframe src="https://evil.example.test"></iframe>',
    "iframe srcdoc": '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
    "style tag": "<style>body{display:none}</style>",
    "style attribute": '<p style="position:fixed;inset:0">overlay</p>',
    "raw anchor": '<a href="javascript:alert(1)">click</a>',
    "form": '<form action="https://evil.example.test"><input name="password"><button>Go</button></form>',
    "meta refresh": '<meta http-equiv="refresh" content="0;url=https://evil.example.test">',
    "base tag": '<base href="https://evil.example.test/">',
    "object/embed": '<object data="x.swf"></object><embed src="x.swf">',
    "mxss math": "<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>",
    "noscript mxss": '<noscript><p title="</noscript><img src=x onerror=alert(1)>">',
    "javascript link": "[click](javascript:alert(1))",
    "upper-case javascript link": "[click](JAVASCRIPT:alert(1))",
    "entity-encoded javascript link": "[click](&#106;avascript&#58;alert(1))",
    "percent-encoded scheme": "[click](java%0ascript:alert(1))",
    "angle-bracket javascript link": "[click](<javascript:alert(1)>)",
    "javascript autolink": "<javascript:alert(1)>",
    "javascript reference link": "[click][r]\n\n[r]: javascript:alert(1)",
    "vbscript link": "[click](vbscript:msgbox(1))",
    "data link": "[click](data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==)",
    "data svg link": "[click](data:image/svg+xml,<svg onload=alert(1)>)",
    "data svg image": "![x](data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9YWxlcnQoMSk+)",
    "javascript image": "![x](javascript:alert(1))",
    "image alt/title quote injection": '![" onerror="alert(1)](asset:cell-1 "\\" onload=\\"alert(1)")',
    "link title quote injection": '[x](https://example.test "\\" onmouseover=\\"alert(1)")',
    "directive attribute injection":
      ':::note{onclick="alert(1)" style="position:fixed" class="evil" id="main-content" data-x="y" #hijack .evil2}\nBody\n:::',
    "directive title html": ':::definition{term="<img src=x onerror=alert(1)>"}\nBody\n:::',
    "directive title quote": ':::example{title="\\" onmouseover=\\"alert(1)"}\nBody\n:::',
    "directive label html": ":::note[<img src=x onerror=alert(1)>]\nBody\n:::",
    "unknown directive": ':::iframe{src="https://evil.example.test"}\nx\n:::',
    "leaf directive": '::script{src="https://evil.example.test/x.js"}',
    "text directive": ':span[x]{onclick="alert(1)"}',
    "heading html": "## <img src=x onerror=alert(1)>Title",
    "footnote label injection": 'Text[^x" onmouseover="alert(1)]\n\n[^x" onmouseover="alert(1)]: note',
    "code block html": "```html\n<script>alert(1)</script>\n```",
    "inline code html": "`<img src=x onerror=alert(1)>`",
    "html entities": "&lt;script&gt;alert(1)&lt;/script&gt;",
    "math with html": "$</annotation><script>alert(1)</script>$",
    "katex href": String.raw`$\href{javascript:alert(1)}{click}$`,
    "katex href https": String.raw`$\href{https://evil.example.test}{click}$`,
    "katex url": String.raw`$\url{javascript:alert(1)}$`,
    "katex includegraphics": String.raw`$\includegraphics{https://evil.example.test/x.png}$`,
    "katex htmlClass": String.raw`$\htmlClass{evil}{x}$`,
    "katex htmlId": String.raw`$\htmlId{main-content}{x}$`,
    "katex htmlStyle": String.raw`$\htmlStyle{position:fixed;inset:0}{x}$`,
    "katex htmlData": String.raw`$\htmlData{foo=bar}{x}$`,
    "katex color injection": String.raw`$\color{red;background:url(javascript:alert(1))}{x}$`,
    "display katex href": String.raw`$$
\href{javascript:alert(1)}{x}
$$`,
  };

  it.each(Object.entries(vectors))("%s (block mode)", (_name, source) => {
    const out = renderContent(source, { resolveAsset }).html;
    expectNoXss(out);
  });

  it.each(Object.entries(vectors))("%s (inline mode)", (_name, source) => {
    const out = renderInline(source, { resolveAsset }).html;
    expectNoXss(out);
  });

  it("drops raw HTML entirely (no style attributes, no injected markup) and reports it", () => {
    const result = renderContent('<p style="position:fixed">overlay</p>\n\n<div class="evil">x</div>');
    expect(result.html).toBe("");
    expect(result.warnings.map((w) => w.code)).toEqual(["raw-html", "raw-html"]);
  });

  it("keeps author text from raw inline HTML as escaped text only", () => {
    expect(html("Hello <b>bold</b> &lt;script&gt;")).toBe("<p>Hello bold &#x3C;script></p>");
  });

  it("allows <br> for line breaks (e.g. inside table cells) and ignores HTML comments silently", () => {
    const result = renderContent("| a |\n|---|\n| one<br>two |\n\n<!-- editor note -->");
    expect(result.html).toMatch(/<td>one<br>\s*two<\/td>/);
    expect(result.warnings).toEqual([]);
  });

  it("never copies directive attributes to the output", () => {
    const out = html(
      ':::note{onclick="alert(1)" style="position:fixed" class="evil" id="main-content" data-x="y" #hijack .evil2}\nBody\n:::',
    );
    expect(out).toMatch(/^<aside class="cb cb-note" data-block="note">/);
    expect(out).not.toMatch(/evil|hijack|main-content|data-x|style=/);
    expect(codes(':::note{onclick="alert(1)" class="evil"}\nx\n:::')).toEqual(["directive-attribute", "directive-attribute"]);
  });

  it("escapes markup in directive titles", () => {
    const out = html(':::definition{term="<img src=x onerror=alert(1)>"}\nBody\n:::');
    expect(out).toContain("<dfn>&#x3C;img src=x onerror=alert(1)></dfn>");
    expect(out).not.toContain("<img");
  });

  it("unwraps links whose URL was removed, leaving their text", () => {
    expect(html("[click](javascript:alert(1))")).toBe("<p>click</p>");
    expect(html("[click](data:text/html,hi)")).toBe("<p>click</p>");
  });

  it("renders untrusted KaTeX commands as inert error text (no links, classes, ids, styles, data or images)", () => {
    const out = [
      String.raw`$\href{https://evil.example.test}{click}$`,
      String.raw`$\url{https://evil.example.test}$`,
      String.raw`$\htmlClass{evil}{x}$`,
      String.raw`$\htmlId{main-content}{x}$`,
      String.raw`$\htmlStyle{position:fixed}{x}$`,
      String.raw`$\htmlData{foo=bar}{x}$`,
      String.raw`$\includegraphics{https://evil.example.test/x.png}$`,
    ]
      .map((source) => html(source))
      .join("\n");
    expect(out).not.toMatch(/<a\b|\shref=|<img\b/);
    expect(out).not.toMatch(/class="[^"]*\bevil\b/);
    expect(out).not.toContain('id="main-content"');
    expect(out).not.toMatch(/style="[^"]*position:\s*fixed/);
    expect(out).not.toContain("data-foo");
  });

  it("tells authors why a disabled KaTeX command shows as red text", () => {
    const result = renderContent(String.raw`$\href{https://example.test}{x}$`);
    expect(result.warnings).toEqual([
      expect.objectContaining({ code: "math-error", line: 1, message: expect.stringContaining("\\href is not allowed") }),
    ]);
  });

  it("caps KaTeX sizes so maths cannot cover the page", () => {
    const out = html(String.raw`$\rule{1000em}{1000em}$`);
    // The TeX source survives only as text in the MathML annotation, never in a style.
    expect(out).not.toMatch(/style="[^"]*1000em/);
    expect(out).toMatch(/border-right-width:10em/);
  });
});
