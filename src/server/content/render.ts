import "server-only";
import { createHash } from "node:crypto";
import katex from "katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { ContentWarning, RenderedContent, RenderMode, SanitizedHtml } from "@/lib/content/types";
import { logger } from "@/server/lib/logger";
import { CONTEXT_KEY, RenderContext, type ResolvedAsset } from "./context";
import { LruCache } from "./lru";
import { ASSET_SCAN_PATTERN } from "./mdast-utils";
import { mdastToPlainText } from "./plain-text";
import { rehypeFinalize } from "./rehype-finalize";
import { rehypeMath } from "./rehype-math";
import { remarkCapturePlainText, remarkContent } from "./remark-content";
import { contentSanitizeSchema } from "./schema";

export type { ResolvedAsset } from "./context";

/**
 * Bump whenever a change to this pipeline changes its HTML output. It is part of {@link contentHash}, so HTML that
 * the DB layer persisted under an older version is recognised as stale and re-rendered.
 */
export const PIPELINE_VERSION = 1;

/** Guards against pathological input (a long lesson is ~60k characters). */
export const MAX_SOURCE_LENGTH = 500_000;

const DEFAULT_ID_PREFIX = "c-";
const ID_PREFIX_PATTERN = /^(?:[a-z][a-z0-9-]*)?$/i;
const RENDERER_FINGERPRINT = `content@${PIPELINE_VERSION}+katex@${katex.version}`;

/** Looks up a pre-fetched asset by id. Return null/undefined when the asset does not exist. Must be synchronous. */
export type AssetResolver = (assetId: string) => ResolvedAsset | null | undefined;

export interface RenderOptions {
  /** `block` (default) for lessons/explanations; `inline` for MCQ options, labels, short answers. */
  mode?: RenderMode;
  /**
   * Resolves `![alt](asset:<id>)` references. Fetch all ids from {@link collectAssetIds} in ONE query first, then
   * pass a map lookup — the renderer stays synchronous and DB-free, and there is no N+1.
   */
  resolveAsset?: AssetResolver;
  /**
   * Prefix for every generated id and in-page link (default `"c-"`). Use a distinct prefix per document when
   * several are rendered on one page, e.g. `"q-<questionId>-"` for question explanations below a lesson.
   */
  idPrefix?: string;
  /** Heading level that `#`/`##` render at (2–6, default 2). Use 3 when the content sits under an `<h2>` on the page. */
  baseHeadingLevel?: number;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm, { singleTilde: false })
  .use(remarkMath)
  .use(remarkDirective)
  .use(remarkCapturePlainText)
  .use(remarkContent)
  .use(remarkRehype, {
    // Explicitly off: raw HTML in markdown is dropped, never passed through.
    allowDangerousHtml: false,
    // Footnote ids are prefixed later together with every other id (see rehype-finalize).
    clobberPrefix: "",
    footnoteLabelProperties: { className: ["cx-sr-only"] },
  })
  .use(rehypeSanitize, contentSanitizeSchema)
  .use(rehypeFinalize)
  .use(rehypeMath)
  // Required ONLY to emit the KaTeX `raw` nodes created after sanitising (see rehype-math.ts for why that is safe).
  .use(rehypeStringify, { allowDangerousHtml: true })
  .freeze();

const cache = new LruCache<string, RenderedContent>({
  maxEntries: 1_000,
  // ~32 MB of UTF-16 strings per process.
  maxSize: 16_000_000,
  sizeOf: (result) => result.html.length + result.plainText.length,
});

/**
 * Renders authored content (Markdown + GFM + LaTeX math + pedagogical blocks) to sanitised HTML, plus the metadata
 * pages need: plain text, headings for in-lesson navigation, whether KaTeX CSS is needed, the block types used and
 * authoring warnings (for the CMS preview; also logged).
 *
 * Synchronous and memoised: results are cached per process in an LRU keyed by a SHA-256 of the source, the options,
 * the resolved assets and the pipeline version. Returned objects are frozen because they are shared between callers.
 *
 * @throws RangeError for invalid options or sources longer than {@link MAX_SOURCE_LENGTH}.
 */
export function renderContent(source: string, options: RenderOptions = {}): RenderedContent {
  const settings = normalizeOptions(source, options);
  const assets = resolveAssets(source, options.resolveAsset);
  const key = digest(cacheKeyParts(source, settings, assets));

  const cached = cache.get(key);
  if (cached) return cached;

  const ctx = new RenderContext(source, { ...settings, assets });
  const file = processor.processSync({ value: source, data: { [CONTEXT_KEY]: ctx } });

  const result: RenderedContent = Object.freeze({
    html: String(file.value) as SanitizedHtml,
    plainText: ctx.plainText,
    headings: Object.freeze(ctx.headings.map((heading) => Object.freeze(heading))),
    hasMath: ctx.hasMath,
    blocks: Object.freeze([...ctx.blocks]),
    warnings: Object.freeze(ctx.warnings.map((warning) => Object.freeze(warning))),
  });

  if (result.warnings.length > 0) reportWarnings(result.warnings);
  cache.set(key, result);
  return result;
}

/**
 * Renders a short string (MCQ option, answer, label) to phrasing-only HTML — no paragraphs, lists, tables or
 * blocks — so it can sit inside `<label>`, `<button>` or `<span>`. Use `<RichContent inline>` to display it.
 * Question STEMS can contain tables and diagrams: render those with {@link renderContent}.
 */
export function renderInline(source: string, options: Omit<RenderOptions, "mode" | "baseHeadingLevel"> = {}): RenderedContent {
  return renderContent(source, { ...options, mode: "inline" });
}

/**
 * Plain text of authored content, for search indexing, SEO descriptions and AI context: markdown stripped, math
 * kept as LaTeX source, block labels kept ("Exam tip: ..."), images as `[Image: alt]`. Parse-only (no HTML or
 * KaTeX work), so it is cheap enough for bulk re-indexing.
 */
export function toPlainText(source: string): string {
  assertSourceLength(source);
  return mdastToPlainText(processor.parse(source), source);
}

/** Single-line plain-text excerpt cut at a word boundary, e.g. for `<meta name="description">` (default 160 chars). */
export function toExcerpt(source: string, maxLength = 160): string {
  if (!Number.isInteger(maxLength) || maxLength < 2) throw new RangeError("toExcerpt: maxLength must be an integer >= 2");
  const text = toPlainText(source).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?-]+$/, "")}…`;
}

/**
 * Stable SHA-256 (hex) of a source together with the render options and the renderer fingerprint (pipeline +
 * KaTeX version). Persist it next to cached HTML: when `contentHash(source, options)` no longer matches the stored
 * hash — because the source changed OR the renderer was upgraded — re-render. Asset URLs are not included; if an
 * asset's `src` can change in place, invalidate HTML that references it (see {@link collectAssetIds}).
 */
export function contentHash(source: string, options: Omit<RenderOptions, "resolveAsset"> = {}): string {
  return digest(cacheKeyParts(source, normalizeOptions(source, options), null));
}

/**
 * Distinct asset ids referenced as `asset:<id>` anywhere in the source, in order of first appearance. Use it to
 * batch-load MediaAssets before rendering, and to track which content must be re-rendered when an asset changes.
 * May over-report (e.g. an id mentioned inside a code block), never under-reports.
 */
export function collectAssetIds(source: string): string[] {
  const ids = new Set<string>();
  for (const match of source.matchAll(ASSET_SCAN_PATTERN)) {
    if (match[1]) ids.add(match[1]);
  }
  return [...ids];
}

/**
 * Re-brands HTML that THIS pipeline produced earlier and the DB layer persisted (e.g. a `renderedHtml` column
 * stored with its {@link contentHash}). Never call it on HTML from any other source — that is what
 * {@link renderContent} is for.
 */
export function trustPersistedHtml(html: string): SanitizedHtml {
  return html as SanitizedHtml;
}

/** Empties the in-process render cache (tests, or after a bulk content migration). */
export function clearContentCache(): void {
  cache.clear();
}

interface NormalizedSettings {
  mode: RenderMode;
  idPrefix: string;
  baseHeadingLevel: number;
}

function normalizeOptions(source: string, options: RenderOptions): NormalizedSettings {
  assertSourceLength(source);
  const mode = options.mode ?? "block";
  if (mode !== "block" && mode !== "inline") throw new RangeError(`renderContent: unknown mode "${String(mode)}"`);
  const idPrefix = options.idPrefix ?? DEFAULT_ID_PREFIX;
  if (!ID_PREFIX_PATTERN.test(idPrefix)) {
    throw new RangeError("renderContent: idPrefix must start with a letter and contain only letters, digits and hyphens");
  }
  const baseHeadingLevel = options.baseHeadingLevel ?? 2;
  if (!Number.isInteger(baseHeadingLevel) || baseHeadingLevel < 2 || baseHeadingLevel > 6) {
    throw new RangeError("renderContent: baseHeadingLevel must be an integer from 2 to 6");
  }
  return { mode, idPrefix, baseHeadingLevel };
}

function assertSourceLength(source: string): void {
  if (source.length > MAX_SOURCE_LENGTH) {
    throw new RangeError(`content source is ${source.length} characters; the maximum is ${MAX_SOURCE_LENGTH}`);
  }
}

/**
 * Resolves every id found by the source scan. The map (not the resolver function) is what the plugins see and what
 * goes into the cache key, so a cached render can never be served for different asset data.
 */
function resolveAssets(source: string, resolver: AssetResolver | undefined): Map<string, ResolvedAsset | null> {
  const assets = new Map<string, ResolvedAsset | null>();
  if (!resolver) return assets;
  for (const id of collectAssetIds(source)) assets.set(id, resolver(id) ?? null);
  return assets;
}

function cacheKeyParts(
  source: string,
  settings: NormalizedSettings,
  assets: ReadonlyMap<string, ResolvedAsset | null> | null,
): string {
  const resolved = assets
    ? [...assets].map(([id, asset]) => [id, asset ? [asset.src, asset.width ?? null, asset.height ?? null, asset.alt ?? null] : null])
    : null;
  return JSON.stringify([RENDERER_FINGERPRINT, settings.mode, settings.idPrefix, settings.baseHeadingLevel, resolved, source]);
}

function digest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/**
 * Logs authoring warnings once per render (cache misses only) through the shared logger. Messages describe the
 * markup problem and line; they never contain learner data. This is the only logging call in the content pipeline.
 *
 * Each warning's `code` is logged as `warningCode`: the logger redacts any field named exactly `code` (it treats
 * it as an OTP), which would otherwise hide the most useful part of the entry.
 */
function reportWarnings(warnings: readonly ContentWarning[]): void {
  logger.warn("content.render.warnings", {
    count: warnings.length,
    warnings: warnings.slice(0, 20).map((warning) => ({
      warningCode: warning.code,
      message: warning.message,
      ...(warning.line === undefined ? {} : { line: warning.line }),
    })),
  });
}
