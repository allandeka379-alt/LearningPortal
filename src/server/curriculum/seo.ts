import "server-only";
import type { CatalogueStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { memoizeAsync } from "@/server/lib/cache";
import { CATALOGUE_CACHE_TTL_MS } from "./catalogue";
import { isAllowedBoardSlug, isEnrollableCatalogueStatus, isValidCurriculumSlug, LISTED_CATALOGUE_STATUSES } from "./core";
import { SYLLABUS_SUMMARY_SELECT, toSyllabusSummary, type SyllabusSummary } from "./syllabus";
import { getTopicBySlug, type TopicDetail } from "./topics";

/**
 * Public curriculum URL resolution (§44, ARCHITECTURE §3.3 "Public SEO curriculum pages"):
 *
 *   /[board]                                   → board (qualifications offered)
 *   /[board]/[qualification]                   → qualification (subjects)
 *   /[board]/[qualification]/[subject]         → subject + its CURRENT syllabus version
 *   /[board]/[qualification]/[subject]/[topic] → topic of the CURRENT version (slugs are stable across versions)
 *
 * Only listed catalogue rows (AVAILABLE / COMING_SOON), public subjects and public topics resolve; anything else is a
 * 404 for the route. These pages never expose premium content: callers list lessons with `accessTiers: ["PUBLIC"]`.
 */

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };

export interface PublicBoard {
  id: string;
  slug: string;
  code: string;
  name: string;
  shortName: string;
  description: string | null;
  publicSummary: string | null;
  websiteUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface PublicQualification {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string | null;
  publicSummary: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  catalogueStatus: CatalogueStatus;
  level: { id: string; slug: string; name: string };
}

export interface PublicSubject {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  officialCode: string | null;
  description: string | null;
  publicSummary: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  languageCode: string;
  catalogueStatus: CatalogueStatus;
  isEnrollable: boolean;
  category: { id: string; slug: string; name: string };
}

/** Everything a public curriculum route resolved to. Deeper levels are null when the URL stops above them. */
export interface CurriculumPath {
  board: PublicBoard;
  qualification: PublicQualification | null;
  subject: PublicSubject | null;
  /** The subject's CURRENT version (null when the subject has no published version yet: honest "coming soon"). */
  syllabus: SyllabusSummary | null;
  topic: TopicDetail | null;
}

export interface CurriculumPathInput {
  board: string;
  qualification?: string | null;
  subject?: string | null;
  topic?: string | null;
}

const getPublicBoard = memoizeAsync(
  async (slug: string): Promise<PublicBoard | null> =>
    db.examBoard.findFirst({
      where: { slug, catalogueStatus: LISTED },
      select: {
        id: true,
        slug: true,
        code: true,
        name: true,
        shortName: true,
        description: true,
        publicSummary: true,
        websiteUrl: true,
        metaTitle: true,
        metaDescription: true,
      },
    }),
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 64 },
);

const getPublicQualification = memoizeAsync(
  async (boardId: string, slug: string): Promise<PublicQualification | null> =>
    db.qualification.findFirst({
      where: { examBoardId: boardId, slug, catalogueStatus: LISTED },
      select: {
        id: true,
        slug: true,
        name: true,
        shortName: true,
        description: true,
        publicSummary: true,
        metaTitle: true,
        metaDescription: true,
        catalogueStatus: true,
        level: { select: { id: true, slug: true, name: true } },
      },
    }),
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 256 },
);

const getPublicSubject = memoizeAsync(
  async (qualificationId: string, slug: string): Promise<PublicSubject | null> => {
    const row = await db.subject.findFirst({
      where: { qualificationId, slug, catalogueStatus: LISTED, isPublic: true },
      select: {
        id: true,
        slug: true,
        name: true,
        shortName: true,
        officialCode: true,
        description: true,
        publicSummary: true,
        metaTitle: true,
        metaDescription: true,
        languageCode: true,
        catalogueStatus: true,
        category: { select: { id: true, slug: true, name: true } },
      },
    });
    return row ? { ...row, isEnrollable: isEnrollableCatalogueStatus(row.catalogueStatus) } : null;
  },
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 1_024 },
);

async function currentSyllabus(subjectId: string): Promise<SyllabusSummary | null> {
  const row = await db.syllabus.findFirst({ where: { subjectId, status: "CURRENT" }, select: SYLLABUS_SUMMARY_SELECT });
  return row ? toSyllabusSummary(row) : null;
}

/**
 * Resolves a public curriculum URL by slugs. Returns null when any given segment does not resolve (malformed slug,
 * reserved board slug, hidden/retired catalogue row, non-public subject or topic, or a topic URL for a subject without
 * a CURRENT version).
 */
export async function resolveCurriculumPath(input: CurriculumPathInput): Promise<CurriculumPath | null> {
  if (!isAllowedBoardSlug(input.board)) return null;
  for (const segment of [input.qualification, input.subject, input.topic]) {
    if (segment !== undefined && segment !== null && !isValidCurriculumSlug(segment)) return null;
  }
  const board = await getPublicBoard(input.board);
  if (!board) return null;
  const result: CurriculumPath = { board, qualification: null, subject: null, syllabus: null, topic: null };
  if (!input.qualification) return result;

  const qualification = await getPublicQualification(board.id, input.qualification);
  if (!qualification) return null;
  result.qualification = qualification;
  if (!input.subject) return result;

  const subject = await getPublicSubject(qualification.id, input.subject);
  if (!subject) return null;
  result.subject = subject;
  result.syllabus = await currentSyllabus(subject.id);
  if (!input.topic) return result;

  if (!result.syllabus) return null;
  const topic = await getTopicBySlug(result.syllabus.id, input.topic, { publicOnly: true });
  if (!topic) return null;
  result.topic = topic;
  return result;
}

/** One public subject page path (for the sitemap). */
export interface PublicSubjectPath {
  board: string;
  qualification: string;
  subject: string;
  /** Last change to the subject row, for `<lastmod>`. */
  updatedAt: Date;
}

/** Every public subject page `/[board]/[qualification]/[subject]` (listed catalogue rows only), for the sitemap. */
export async function listPublicSubjectPaths(): Promise<PublicSubjectPath[]> {
  const rows = await db.subject.findMany({
    where: {
      catalogueStatus: LISTED,
      isPublic: true,
      qualification: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } },
    },
    select: {
      slug: true,
      updatedAt: true,
      qualification: { select: { slug: true, examBoard: { select: { slug: true } } } },
    },
    orderBy: [{ qualificationId: "asc" }, { sortOrder: "asc" }, { slug: "asc" }],
  });
  return rows
    .filter((row) => isAllowedBoardSlug(row.qualification.examBoard.slug))
    .map((row) => ({
      board: row.qualification.examBoard.slug,
      qualification: row.qualification.slug,
      subject: row.slug,
      updatedAt: row.updatedAt,
    }));
}

/** Drops cached slug lookups on this instance (call after admin catalogue edits). */
export function invalidateCurriculumPathCache(): void {
  getPublicBoard.clear();
  getPublicQualification.clear();
  getPublicSubject.clear();
}
