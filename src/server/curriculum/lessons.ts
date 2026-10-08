import "server-only";
import type { ContentAccessTier, ContentStatus, LessonKind, Prisma } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";

/**
 * Lesson lookups for curriculum pages (§8, §44). Lessons are tagged to topic nodes through `LessonTopic`, so one lesson
 * can serve several boards and syllabus versions. Student-facing reads return PUBLISHED live rows only (never draft
 * copies, CLAUDE.md rule 7); entitlement gating on `accessTier` is the caller's job (billing entitlements), and public
 * SEO pages must pass `accessTiers: ["PUBLIC"]` (§44: premium content is never exposed for SEO).
 */

/** Card fields of a lesson (no body): what lesson lists render. */
export const LESSON_CARD_SELECT = {
  id: true,
  subjectId: true,
  kind: true,
  title: true,
  slug: true,
  summary: true,
  estimatedMinutes: true,
  accessTier: true,
  languageCode: true,
  status: true,
  revision: true,
  isDemo: true,
} as const satisfies Prisma.LessonSelect;

export type LessonCard = Prisma.LessonGetPayload<{ select: typeof LESSON_CARD_SELECT }>;

export interface LessonListOptions {
  /** Default true. `false` (CMS) also returns DRAFT/IN_REVIEW/APPROVED/ARCHIVED live rows, still never draft copies. */
  publishedOnly?: boolean;
  /** Restrict to these access tiers (public pages: `["PUBLIC"]`). */
  accessTiers?: readonly ContentAccessTier[];
  /** Restrict to these lesson kinds. */
  kinds?: readonly LessonKind[];
  client?: DbClient;
}

function lessonFilter(options: LessonListOptions): Prisma.LessonWhereInput {
  return {
    draftOfId: null,
    ...(options.publishedOnly === false ? {} : { status: "PUBLISHED" as ContentStatus }),
    ...(options.accessTiers ? { accessTier: { in: [...options.accessTiers] } } : {}),
    ...(options.kinds ? { kind: { in: [...options.kinds] } } : {}),
  };
}

/** A lesson in a topic's list, with its position and whether this topic is the lesson's home topic. */
export interface TopicLesson extends LessonCard {
  sortOrder: number;
  isPrimary: boolean;
}

/**
 * Lessons tagged to a topic node, in the topic's order (`LessonTopic.sortOrder`, then title). PUBLISHED only by
 * default.
 */
export async function listLessonsForTopic(topicId: string, options: LessonListOptions = {}): Promise<TopicLesson[]> {
  const client = options.client ?? db;
  const links = await client.lessonTopic.findMany({
    where: { topicId, lesson: lessonFilter(options) },
    select: { sortOrder: true, isPrimary: true, lesson: { select: LESSON_CARD_SELECT } },
  });
  return links
    .map(({ lesson, sortOrder, isPrimary }) => ({ ...lesson, sortOrder, isPrimary }))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title, "en") || (a.id < b.id ? -1 : 1));
}

/** Everything a lesson page needs, including the Markdown source and the persisted render cache. */
export const LESSON_PAGE_SELECT = {
  ...LESSON_CARD_SELECT,
  qualificationId: true,
  examBoardId: true,
  body: true,
  bodyHtml: true,
  renderVersion: true,
  contentHash: true,
  metaTitle: true,
  metaDescription: true,
  author: true,
  attribution: true,
  licenceCode: true,
  sourceUrl: true,
  copyrightStatus: true,
  publishedAt: true,
  updatedAt: true,
  topics: {
    select: { topicId: true, isPrimary: true, sortOrder: true, topic: { select: { syllabusId: true, slug: true, name: true } } },
  },
} as const satisfies Prisma.LessonSelect;

export type LessonPage = Prisma.LessonGetPayload<{ select: typeof LESSON_PAGE_SELECT }>;

/**
 * A lesson by slug. Slugs are unique per HOME subject among live rows; subject-less articles and study guides
 * (`subjectId: null`) share one global slug space. PUBLISHED only by default.
 */
export async function getLessonBySlug(
  where: { subjectId: string | null; slug: string },
  options: Omit<LessonListOptions, "kinds"> = {},
): Promise<LessonPage | null> {
  const client = options.client ?? db;
  return client.lesson.findFirst({
    where: { subjectId: where.subjectId, slug: where.slug, ...lessonFilter(options) },
    select: LESSON_PAGE_SELECT,
  });
}

/** A lesson by id (PUBLISHED live rows only by default). */
export async function getLessonById(lessonId: string, options: Omit<LessonListOptions, "kinds"> = {}): Promise<LessonPage | null> {
  const client = options.client ?? db;
  return client.lesson.findFirst({ where: { id: lessonId, ...lessonFilter(options) }, select: LESSON_PAGE_SELECT });
}

/**
 * Number of PUBLISHED lessons per topic for a set of topics (one grouped query), e.g. "4 lessons" badges on a topic
 * list. Topics without lessons are absent from the map.
 */
export async function countLessonsByTopic(topicIds: readonly string[], options: LessonListOptions = {}): Promise<Map<string, number>> {
  if (topicIds.length === 0) return new Map();
  const client = options.client ?? db;
  const rows = await client.lessonTopic.groupBy({
    by: ["topicId"],
    where: { topicId: { in: [...topicIds] }, lesson: lessonFilter(options) },
    _count: { _all: true },
  });
  return new Map(rows.map((row) => [row.topicId, row._count._all]));
}
