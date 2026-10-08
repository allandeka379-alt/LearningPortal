import "server-only";
import type { MediaPurpose, MediaVisibility, Prisma } from "@/generated/prisma/client";
import type { ContentHeading, ContentWarning, SanitizedHtml } from "@/lib/content/types";
import { db, type DbClient } from "@/server/db";
import { logger } from "@/server/lib/logger";
import {
  collectAssetIds,
  contentHash,
  PIPELINE_VERSION,
  renderContent,
  renderInline,
  trustPersistedHtml,
  type AssetResolver,
  type RenderOptions,
  type ResolvedAsset,
} from "./render";

/**
 * Content rendering with WRITE-TIME caches (ARCHITECTURE §3.8 "Write-time rendering", §3.10). Lessons store
 * `bodyHtml` + `renderVersion` + `contentHash` next to the Markdown source; reads serve the stored HTML and re-render
 * only when it is missing or stale (source changed, or the pipeline / KaTeX version changed, which `contentHash`
 * covers). Render caches are deliberately editable on PUBLISHED rows (content_published_immutable ignores them), so
 * refreshing them never needs a new revision.
 *
 * Images in content are `![alt](asset:<MediaAsset.id>)`; ids are resolved in ONE query to `/api/media/<storageKey>`
 * URLs of READY content media.
 */

/** Path that serves a stored media object (src/app/api/media/[...key]/route.ts). */
export function mediaSrc(storageKey: string): string {
  return `/api/media/${storageKey}`;
}

const RENDERABLE_PURPOSES: readonly MediaPurpose[] = ["CONTENT_IMAGE", "DIAGRAM", "MARKETING_IMAGE"];
/** Content media is PUBLIC (CDN) or AUTHENTICATED (signed-in users); private uploads never appear in content. */
const RENDERABLE_VISIBILITY: readonly MediaVisibility[] = ["PUBLIC", "AUTHENTICATED"];

/** Loads every asset referenced by the sources in one query and returns a synchronous resolver for the renderer. */
export async function loadAssetResolver(sources: readonly (string | null | undefined)[], client: DbClient = db): Promise<AssetResolver> {
  const ids = [...new Set(sources.flatMap((source) => (source ? collectAssetIds(source) : [])))].filter((id) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id),
  );
  if (ids.length === 0) return () => null;
  const rows = await client.mediaAsset.findMany({
    where: { id: { in: ids }, status: "READY", deletedAt: null, purpose: { in: [...RENDERABLE_PURPOSES] }, visibility: { in: [...RENDERABLE_VISIBILITY] } },
    select: { id: true, storageKey: true, width: true, height: true, altText: true },
  });
  const assets = new Map<string, ResolvedAsset>(
    rows.map((row) => [row.id, { src: mediaSrc(row.storageKey), width: row.width, height: row.height, alt: row.altText }]),
  );
  return (id) => assets.get(id) ?? null;
}

// =====================================================================================================================
// Lessons
// =====================================================================================================================

/** Render options used for lesson bodies (part of the stored hash, so changing them re-renders every lesson). */
export const LESSON_RENDER_OPTIONS = { mode: "block", baseHeadingLevel: 2 } as const satisfies Omit<RenderOptions, "resolveAsset">;

/** The lesson columns {@link getRenderedLesson} needs. */
export interface RenderableLesson {
  id: string;
  body: string;
  bodyHtml: string | null;
  renderVersion: number | null;
  contentHash: string | null;
}

export interface RenderedLesson {
  html: SanitizedHtml;
  /** "On this page" navigation. */
  headings: readonly ContentHeading[];
  hasMath: boolean;
  /** Authoring warnings (CMS preview); empty when served from the stored cache. */
  warnings: readonly ContentWarning[];
  renderVersion: number;
  /** Hex SHA-256 of source + options + renderer version (also the offline-cache ETag, §29). */
  contentHash: string;
  /** True when the stored HTML was served without rendering. */
  fromCache: boolean;
}

/** True when the stored render cache of a lesson matches its source and the current pipeline. */
export function isLessonRenderFresh(lesson: RenderableLesson): boolean {
  return (
    lesson.bodyHtml !== null &&
    lesson.renderVersion === PIPELINE_VERSION &&
    lesson.contentHash !== null &&
    lesson.contentHash === contentHash(lesson.body, LESSON_RENDER_OPTIONS)
  );
}

const HEADING_PATTERN = /<h([2-6])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
const NAMED_ENTITIES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: String.fromCharCode(0xa0) };

/** Decodes the character references hast-util-to-html emits (numeric, hex and the few named ones). */
function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, body: string) => {
    if (body.startsWith("#x") || body.startsWith("#X")) return String.fromCodePoint(Number.parseInt(body.slice(2), 16));
    if (body.startsWith("#")) return String.fromCodePoint(Number.parseInt(body.slice(1), 10));
    return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
  });
}

/**
 * Headings of HTML that THIS pipeline produced (ids are only set on author headings; block titles carry no id).
 * Returns null when a heading contains maths, whose text the table of contents shows as LaTeX source: the caller then
 * re-renders to get exact heading texts.
 */
export function headingsFromRenderedHtml(html: string): ContentHeading[] | null {
  const headings: ContentHeading[] = [];
  for (const match of html.matchAll(HEADING_PATTERN)) {
    const inner = match[3] ?? "";
    if (inner.includes("katex")) return null;
    const text = decodeEntities(inner.replace(/<span class="cx-sr-only">[\s\S]*?<\/span>/g, "").replace(/<[^>]+>/g, ""))
      .replace(/\s+/g, " ")
      .trim();
    headings.push({ id: match[2] ?? "", text, depth: Number(match[1]) });
  }
  return headings;
}

/**
 * Renders a lesson body, serving and maintaining the write-time cache:
 * - fresh cache (same `contentHash` and `PIPELINE_VERSION`) → the stored HTML, no rendering;
 * - otherwise → render with `renderContent` (assets resolved from MediaAsset rows) and persist `bodyHtml`,
 *   `renderVersion` and `contentHash` on the row (guarded, so a concurrent edit of the body is never overwritten with
 *   HTML of the old body).
 *
 * Works for any lesson row (published or draft); authorisation and `accessTier` gating are the caller's job.
 */
export async function getRenderedLesson(lesson: RenderableLesson, options: { client?: DbClient; persist?: boolean } = {}): Promise<RenderedLesson> {
  const client = options.client ?? db;
  const hash = contentHash(lesson.body, LESSON_RENDER_OPTIONS);
  if (isLessonRenderFresh(lesson) && lesson.bodyHtml !== null) {
    const headings = headingsFromRenderedHtml(lesson.bodyHtml);
    if (headings) {
      return {
        html: trustPersistedHtml(lesson.bodyHtml),
        headings,
        hasMath: lesson.bodyHtml.includes('class="katex'),
        warnings: [],
        renderVersion: PIPELINE_VERSION,
        contentHash: hash,
        fromCache: true,
      };
    }
  }

  const resolveAsset = await loadAssetResolver([lesson.body], client);
  const rendered = renderContent(lesson.body, { ...LESSON_RENDER_OPTIONS, resolveAsset });
  const stale = lesson.bodyHtml !== rendered.html || lesson.renderVersion !== PIPELINE_VERSION || lesson.contentHash !== hash;
  if (stale && options.persist !== false) {
    try {
      // Only if the body is still the one we rendered (another editor may have saved meanwhile).
      await client.lesson.updateMany({
        where: { id: lesson.id, body: lesson.body },
        data: { bodyHtml: rendered.html, renderVersion: PIPELINE_VERSION, contentHash: hash },
      });
    } catch (error) {
      // A failed cache write must never fail the page: the next request renders again.
      logger.warn("content.render.persist_failed", { lessonId: lesson.id, err: error });
    }
  }
  return {
    html: rendered.html,
    headings: rendered.headings,
    hasMath: rendered.hasMath,
    warnings: rendered.warnings,
    renderVersion: PIPELINE_VERSION,
    contentHash: hash,
    fromCache: false,
  };
}

/** Loads a lesson's render columns by id and returns {@link getRenderedLesson}; null when the lesson does not exist. */
export async function getRenderedLessonById(lessonId: string, client: DbClient = db): Promise<RenderedLesson | null> {
  const lesson = await client.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true, body: true, bodyHtml: true, renderVersion: true, contentHash: true },
  });
  return lesson ? getRenderedLesson(lesson, { client }) : null;
}

// =====================================================================================================================
// Questions and flashcards (write-time `renderedHtml` documents)
// =====================================================================================================================

/** The question fields rendered into `Question.renderedHtml`. */
export interface RenderableQuestion {
  id: string;
  type: string;
  stem: string;
  explanation?: string | null;
  workedSolution?: string | null;
  conceptSummary?: string | null;
  hints?: readonly string[];
  payload?: unknown;
  options?: readonly { key: string; content: string }[];
}

/**
 * `Question.renderedHtml` document, the shape `toStudentView` / `toAnswerReveal` (`@/lib/questions`) read:
 * `{ stem, explanation?, workedSolution?, conceptSummary?, hints, options?: { [key]: html },
 *    payload?: { "left:<id>" | "right:<id>" | "label:<id>": html } }`.
 * Option and payload fragments are rendered INLINE (they sit inside labels/buttons). The FILL_IN_THE_BLANK template is
 * not pre-rendered (its `{{blank:id}}` placeholders are replaced by inputs in the UI).
 */
export interface QuestionRenderedHtml {
  stem: string;
  explanation?: string;
  workedSolution?: string;
  conceptSummary?: string;
  hints: string[];
  options?: Record<string, string>;
  payload?: Record<string, string>;
}

function fragmentItems(payload: unknown, key: "left" | "right" | "labels"): { id: string; text: string }[] {
  if (typeof payload !== "object" || payload === null) return [];
  const list = (payload as Record<string, unknown>)[key];
  if (!Array.isArray(list)) return [];
  return list.flatMap((item: unknown) => {
    if (typeof item !== "object" || item === null) return [];
    const record = item as Record<string, unknown>;
    const text = typeof record.content === "string" ? record.content : typeof record.text === "string" ? record.text : null;
    return typeof record.id === "string" && text !== null ? [{ id: record.id, text }] : [];
  });
}

/**
 * Renders every Markdown field of a question (not its parts: each part row has its own document) into the
 * `renderedHtml` shape. Pure apart from the in-process render cache; resolve images with {@link loadAssetResolver}.
 * Store it with `renderVersion: PIPELINE_VERSION` (both columns are editable on published rows).
 */
export function renderQuestionHtml(question: RenderableQuestion, resolveAsset?: AssetResolver): QuestionRenderedHtml {
  const idPrefix = `q-${question.id.slice(0, 8)}-`;
  const block = (source: string) => renderContent(source, { idPrefix, baseHeadingLevel: 3, ...(resolveAsset ? { resolveAsset } : {}) }).html as string;
  const inline = (source: string) => renderInline(source, { idPrefix, ...(resolveAsset ? { resolveAsset } : {}) }).html as string;
  const out: QuestionRenderedHtml = { stem: block(question.stem), hints: (question.hints ?? []).map(block) };
  if (question.explanation) out.explanation = block(question.explanation);
  if (question.workedSolution) out.workedSolution = block(question.workedSolution);
  if (question.conceptSummary) out.conceptSummary = block(question.conceptSummary);
  if (question.options && question.options.length > 0) {
    out.options = Object.fromEntries(question.options.map((option) => [option.key, inline(option.content)]));
  }
  const payload: Record<string, string> = {};
  if (question.type === "MATCHING") {
    for (const item of fragmentItems(question.payload, "left")) payload[`left:${item.id}`] = inline(item.text);
    for (const item of fragmentItems(question.payload, "right")) payload[`right:${item.id}`] = inline(item.text);
  }
  if (question.type === "DIAGRAM_LABELLING") {
    for (const item of fragmentItems(question.payload, "labels")) payload[`label:${item.id}`] = inline(item.text);
  }
  if (Object.keys(payload).length > 0) out.payload = payload;
  return out;
}

/** `Flashcard.renderedHtml` document: `{ front, back, notes? }`. */
export interface FlashcardRenderedHtml {
  front: string;
  back: string;
  notes?: string;
}

/** Renders a flashcard's sides into the `renderedHtml` shape (store with `renderVersion: PIPELINE_VERSION`). */
export function renderFlashcardHtml(card: { id: string; front: string; back: string; notes?: string | null }, resolveAsset?: AssetResolver): FlashcardRenderedHtml {
  const options = { idPrefix: `f-${card.id.slice(0, 8)}-`, baseHeadingLevel: 3, ...(resolveAsset ? { resolveAsset } : {}) };
  const out: FlashcardRenderedHtml = { front: renderContent(card.front, options).html, back: renderContent(card.back, options).html };
  if (card.notes) out.notes = renderContent(card.notes, options).html;
  return out;
}

/** Converts a rendered document to the JSON input Prisma expects for `renderedHtml`. */
export function toRenderedJson(document: QuestionRenderedHtml | FlashcardRenderedHtml): Prisma.InputJsonObject {
  return document as unknown as Prisma.InputJsonObject;
}

export { PIPELINE_VERSION };
