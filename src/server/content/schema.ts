import "server-only";
import { defaultSchema, type Options as SanitizeSchema } from "rehype-sanitize";
import { CONTENT_BLOCK_TYPES } from "@/lib/content/blocks";

type PropertyDefinition = NonNullable<SanitizeSchema["attributes"]>[string] extends Array<infer T> | undefined ? T : never;

const BLOCK_CLASSES = ["cb", ...CONTENT_BLOCK_TYPES.map((type) => `cb-${type}`)];
const BLOCK_ATTRIBUTES: PropertyDefinition[] = [["className", ...BLOCK_CLASSES], ["dataBlock", ...CONTENT_BLOCK_TYPES]];
const HEADING_ATTRIBUTES: PropertyDefinition[] = [["className", "cb-heading"]];
const CELL_ATTRIBUTES: PropertyDefinition[] = [["align", "left", "center", "right"]];

/**
 * Sanitiser schema for content HTML (§39 XSS prevention).
 *
 * Based on the default (GitHub) schema but NARROWED to exactly what our markdown + `remarkContent` produce, rather
 * than widened: an allow-list of tags, and per-tag allow-lists of attributes with allow-listed values for classes and
 * data attributes. Markdown cannot express raw HTML here (remark-rehype drops it), so this is defence in depth
 * against bugs in the plugins and against URL-based attacks (`javascript:`, `data:`, `vbscript:` ...).
 *
 * Notes:
 * - `id` is only allowed with the exact shapes GFM footnotes generate. The `clobber` prefixing of the default schema
 *   is disabled because the trusted post-sanitise step prefixes ALL ids and in-page links consistently (see
 *   `rehype-finalize.ts`); the default behaviour would break footnote links.
 * - KaTeX is rendered AFTER sanitising, so math markup never needs to be allowed here — only the
 *   `language-math` / `math-inline` / `math-display` marker classes that tell the math step what to render.
 */
export const contentSanitizeSchema: SanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    "a",
    "aside",
    "blockquote",
    "br",
    "code",
    "del",
    "dfn",
    "div",
    "em",
    "figcaption",
    "figure",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "img",
    "input",
    "li",
    "ol",
    "p",
    "pre",
    "section",
    "span",
    "strong",
    "sup",
    "table",
    "tbody",
    "td",
    "th",
    "thead",
    "tr",
    "ul",
  ],
  attributes: {
    a: [
      "href",
      "title",
      "ariaLabel",
      "ariaDescribedBy",
      "dataFootnoteRef",
      "dataFootnoteBackref",
      ["className", "data-footnote-backref"],
      ["id", /^fnref-[\w%.-]+$/],
    ],
    aside: [...BLOCK_ATTRIBUTES],
    code: [["className", /^language-./, "math-inline", "math-display"]],
    div: [["className", "cb-body"]],
    figure: [["className", "cx-figure"]],
    h2: [["className", "cb-heading", "cx-sr-only"], ["id", "footnote-label"]],
    h3: [...HEADING_ATTRIBUTES],
    h4: [...HEADING_ATTRIBUTES],
    h5: [...HEADING_ATTRIBUTES],
    h6: [...HEADING_ATTRIBUTES],
    img: ["src", "alt", "title", "width", "height", ["loading", "lazy"], ["decoding", "async"]],
    input: [["type", "checkbox"], ["disabled", true], "checked"],
    li: [["className", "task-list-item"], ["id", /^fn-[\w%.-]+$/]],
    ol: ["start", ["className", "contains-task-list"]],
    section: [["className", "footnotes", ...BLOCK_CLASSES], ["dataBlock", ...CONTENT_BLOCK_TYPES], "dataFootnotes"],
    span: [["className", "cb-label", "cb-title", "cx-sr-only", "cx-media-note"]],
    td: [...CELL_ATTRIBUTES],
    th: [...CELL_ATTRIBUTES],
    ul: [["className", "contains-task-list"]],
  },
  clobber: [],
  protocols: {
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
  required: { input: { disabled: true, type: "checkbox" } },
  strip: ["script", "style"],
};
