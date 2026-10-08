import "server-only";
import type { MetadataRoute } from "next";
import type { CatalogueStatus } from "@/generated/prisma/client";
import { LISTED_CATALOGUE_STATUSES } from "@/server/curriculum/core";
import { db } from "@/server/db";
import { logger } from "@/server/lib/logger";
import { PUBLIC_GUIDE_WHERE } from "./guides";
import { guideScopeOf } from "./pages";
import { absoluteUrl, boardPath, guidePath, isPublicBoardSlug, isPublicSegmentSlug, qualificationPath, subjectPath, topicPath } from "./routing";

/**
 * sitemap.xml contents (§44, ARCHITECTURE §3.3 "/sitemap.xml"): marketing pages plus every public curriculum page,
 * with `lastModified` from the database. Split into chunks of {@link SITEMAP_CHUNK_SIZE} URLs (Google's limit is
 * 50,000 per file) served as `/sitemap/<id>.xml` by `src/app/sitemap/[file]/route.ts` and indexed at `/sitemap.xml`
 * (`src/app/sitemap.xml/route.ts`, XML in `./sitemap-xml.ts`); `src/app/robots.ts` lists every chunk too.
 *
 * Only pages that are worth indexing are listed: subjects WITH a published (CURRENT) syllabus version (the others are
 * honest "coming soon" pages marked noindex), public topics whose ancestors are public too, PUBLIC guides whose home
 * scope is listed, and never demo rows (rule 6).
 */

export const SITEMAP_CHUNK_SIZE = 45_000;

export interface SitemapEntry {
  /** App-relative path. */
  path: string;
  lastModified?: Date;
  changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}

/**
 * Public marketing routes (ARCHITECTURE §3.3 "Public marketing site"). Their content is CMS data without a single
 * modification time, so no `lastModified` is claimed.
 */
export const MARKETING_SITEMAP_ENTRIES: readonly SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/subjects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.7 },
  { path: "/schools", changeFrequency: "monthly", priority: 0.6 },
  { path: "/daily", changeFrequency: "daily", priority: 0.6 },
  { path: "/exam-countdown", changeFrequency: "weekly", priority: 0.5 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
  { path: "/about", changeFrequency: "yearly", priority: 0.4 },
  // Not listed: /legal/terms, /legal/privacy and /legal/cookies are DRAFT templates marked noindex until legal review;
  // a sitemap must not submit noindex URLs. Add them back (priority 0.2, yearly) when the pages drop `noIndex`.
];

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };

function latest(...dates: Array<Date | null | undefined>): Date | undefined {
  let out: Date | undefined;
  for (const date of dates) if (date && (!out || date > out)) out = date;
  return out;
}

/** Public topics only: a topic is excluded when it, or any ancestor on its materialised path, is not public. */
export function publicTopicRows<T extends { id: string; path: string; isPublic: boolean }>(rows: readonly T[]): T[] {
  const hidden = new Set(rows.filter((row) => !row.isPublic).map((row) => row.id));
  if (hidden.size === 0) return [...rows];
  return rows.filter((row) => row.isPublic && !row.path.split("/").some((id) => hidden.has(id)));
}

/** Every catalogue entry (boards → qualifications → subjects → guides → topics), deterministic order. */
export async function listCatalogueSitemapEntries(): Promise<SitemapEntry[]> {
  const [boards, qualifications, subjects, guides] = await Promise.all([
    db.examBoard.findMany({ where: { catalogueStatus: LISTED }, select: { slug: true, updatedAt: true }, orderBy: [{ sortOrder: "asc" }, { slug: "asc" }] }),
    db.qualification.findMany({
      where: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } },
      select: { slug: true, updatedAt: true, examBoard: { select: { slug: true } } },
      orderBy: [{ examBoardId: "asc" }, { sortOrder: "asc" }, { slug: "asc" }],
    }),
    db.subject.findMany({
      where: { catalogueStatus: LISTED, isPublic: true, isDemo: false, qualification: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } } },
      select: {
        slug: true,
        updatedAt: true,
        qualification: { select: { slug: true, examBoard: { select: { slug: true } } } },
        syllabi: { where: { status: "CURRENT", isDemo: false }, select: { id: true, updatedAt: true, publishedAt: true }, take: 1 },
      },
      orderBy: [{ qualificationId: "asc" }, { sortOrder: "asc" }, { slug: "asc" }],
    }),
    db.lesson.findMany({
      where: { ...PUBLIC_GUIDE_WHERE, isDemo: false },
      select: {
        slug: true,
        updatedAt: true,
        subject: {
          select: {
            slug: true,
            isPublic: true,
            catalogueStatus: true,
            qualification: { select: { slug: true, catalogueStatus: true, examBoard: { select: { slug: true, catalogueStatus: true } } } },
          },
        },
        qualification: { select: { slug: true, catalogueStatus: true, examBoard: { select: { slug: true, catalogueStatus: true } } } },
        examBoard: { select: { slug: true, catalogueStatus: true } },
      },
      orderBy: [{ id: "asc" }],
    }),
  ]);

  const entries: SitemapEntry[] = [];
  for (const board of boards) {
    if (isPublicBoardSlug(board.slug)) entries.push({ path: boardPath(board.slug), lastModified: board.updatedAt, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const q of qualifications) {
    if (!isPublicBoardSlug(q.examBoard.slug) || !isPublicSegmentSlug(q.slug)) continue;
    entries.push({ path: qualificationPath(q.examBoard.slug, q.slug), lastModified: q.updatedAt, changeFrequency: "monthly", priority: 0.8 });
  }

  const subjectBySyllabus = new Map<string, { board: string; qualification: string; subject: string }>();
  for (const s of subjects) {
    const syllabus = s.syllabi[0];
    const board = s.qualification.examBoard.slug;
    const qualification = s.qualification.slug;
    if (!syllabus || !isPublicBoardSlug(board) || !isPublicSegmentSlug(qualification) || !isPublicSegmentSlug(s.slug)) continue;
    subjectBySyllabus.set(syllabus.id, { board, qualification, subject: s.slug });
    entries.push({
      path: subjectPath(board, qualification, s.slug),
      lastModified: latest(s.updatedAt, syllabus.updatedAt, syllabus.publishedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const guide of guides) {
    const scope = guideScopeOf(guide);
    if (!scope || !isPublicSegmentSlug(guide.slug)) continue;
    entries.push({ path: guidePath(scope, guide.slug), lastModified: guide.updatedAt, changeFrequency: "monthly", priority: 0.6 });
  }

  if (subjectBySyllabus.size > 0) {
    const topics = await db.topic.findMany({
      where: { syllabusId: { in: [...subjectBySyllabus.keys()] } },
      select: { id: true, path: true, slug: true, isPublic: true, updatedAt: true, syllabusId: true },
      orderBy: [{ syllabusId: "asc" }, { path: "asc" }],
    });
    for (const topic of publicTopicRows(topics)) {
      const subject = subjectBySyllabus.get(topic.syllabusId);
      if (!subject || !isPublicSegmentSlug(topic.slug)) continue;
      entries.push({
        path: topicPath(subject.board, subject.qualification, subject.subject, topic.slug),
        lastModified: topic.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  return entries;
}

/** Marketing + catalogue entries. On a database failure (e.g. a build without DB access) only marketing pages. */
export async function listSitemapEntries(): Promise<SitemapEntry[]> {
  try {
    return [...MARKETING_SITEMAP_ENTRIES, ...(await listCatalogueSitemapEntries())];
  } catch (error) {
    logger.error("seo.sitemap.catalogue_failed", { err: error });
    return [...MARKETING_SITEMAP_ENTRIES];
  }
}

/** Number of sitemap files for `total` URLs (at least one). */
export function sitemapChunkCount(total: number, size: number = SITEMAP_CHUNK_SIZE): number {
  return Math.max(1, Math.ceil(Math.max(0, total) / size));
}

/** Entries of chunk `id` (0-based); empty for an out-of-range or malformed id. */
export function sitemapChunk<T>(entries: readonly T[], id: number, size: number = SITEMAP_CHUNK_SIZE): T[] {
  if (!Number.isInteger(id) || id < 0) return [];
  return entries.slice(id * size, (id + 1) * size);
}

/** Absolute URLs for Next's sitemap route. */
export function toSitemap(entries: readonly SitemapEntry[], appUrl: string): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: absoluteUrl(appUrl, entry.path),
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
    ...(entry.changeFrequency ? { changeFrequency: entry.changeFrequency } : {}),
    ...(entry.priority !== undefined ? { priority: entry.priority } : {}),
  }));
}

/** How many `/sitemap/<id>.xml` files the current catalogue needs. */
export async function countSitemapChunks(): Promise<number> {
  return sitemapChunkCount((await listSitemapEntries()).length);
}

/** Sitemap file `id` as Next's `MetadataRoute.Sitemap` (absolute URLs on `appUrl`). */
export async function getSitemapChunk(id: number, appUrl: string): Promise<MetadataRoute.Sitemap> {
  return toSitemap(sitemapChunk(await listSitemapEntries(), id), appUrl);
}
