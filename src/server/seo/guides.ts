import "server-only";
import { cache } from "react";
import type { LessonKind, Prisma } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import type { SanitizedHtml } from "@/lib/content/types";
import { resolveCurriculumPath, type CurriculumPath } from "@/server/curriculum/seo";
import { renderContent } from "@/server/content/render";
import { LESSON_RENDER_OPTIONS } from "@/server/content/service";
import { db } from "@/server/db";
import { buildAttribution, type LessonAttribution } from "@/server/lessons/core";
import { excerptOf, loadPublicAssetResolver } from "./content";
import { guidePath, isGuideSlug, isPublicBoardSlug, isPublicSegmentSlug, type GuideScope } from "./routing";

/**
 * Public guides and articles (§44, ARCHITECTURE §3.3 "Public study guides and articles"): lessons whose access tier is
 * explicitly PUBLIC. A guide lives under its HOME scope (subject, else qualification, else board, else the general
 * `/guides/[slug]`), which is also the path the search index links to (`src/server/search/documents.ts`). Nothing but
 * PUBLIC, PUBLISHED, live rows is ever read here.
 */

/** Every guide query starts from this filter. */
export const PUBLIC_GUIDE_WHERE = { accessTier: "PUBLIC", status: "PUBLISHED", draftOfId: null } as const satisfies Prisma.LessonWhereInput;

/** Guides listed per scope on board / qualification / subject pages. */
export const GUIDE_LIST_LIMIT = 12;

export interface GuideLink {
  id: string;
  title: string;
  kind: LessonKind;
  summary: string | null;
  estimatedMinutes: number;
  href: string;
}

const GUIDE_LINK_SELECT = { id: true, title: true, slug: true, kind: true, summary: true, body: true, estimatedMinutes: true } as const;

function toGuideLink(row: Prisma.LessonGetPayload<{ select: typeof GUIDE_LINK_SELECT }>, scope: GuideScope): GuideLink {
  return {
    id: row.id,
    title: row.title,
    kind: row.kind,
    summary: excerptOf(row.summary, 180) ?? excerptOf(row.body.slice(0, 4_000), 180),
    estimatedMinutes: row.estimatedMinutes,
    href: guidePath(scope, row.slug),
  };
}

/** Guides scoped to a board (no qualification or subject). */
export async function listBoardGuides(board: { id: string; slug: string }): Promise<GuideLink[]> {
  const rows = await db.lesson.findMany({
    where: { ...PUBLIC_GUIDE_WHERE, subjectId: null, qualificationId: null, examBoardId: board.id },
    select: GUIDE_LINK_SELECT,
    orderBy: [{ title: "asc" }, { id: "asc" }],
    take: GUIDE_LIST_LIMIT,
  });
  return rows.map((row) => toGuideLink(row, { kind: "board", board: board.slug }));
}

/** Guides scoped to a qualification (no subject). */
export async function listQualificationGuides(board: { slug: string }, qualification: { id: string; slug: string }): Promise<GuideLink[]> {
  const rows = await db.lesson.findMany({
    where: { ...PUBLIC_GUIDE_WHERE, subjectId: null, qualificationId: qualification.id },
    select: GUIDE_LINK_SELECT,
    orderBy: [{ title: "asc" }, { id: "asc" }],
    take: GUIDE_LIST_LIMIT,
  });
  return rows.map((row) => toGuideLink(row, { kind: "qualification", board: board.slug, qualification: qualification.slug }));
}

/** Guides whose HOME subject is this subject. */
export async function listSubjectGuides(board: { slug: string }, qualification: { slug: string }, subject: { id: string; slug: string }): Promise<GuideLink[]> {
  const rows = await db.lesson.findMany({
    where: { ...PUBLIC_GUIDE_WHERE, subjectId: subject.id },
    select: GUIDE_LINK_SELECT,
    orderBy: [{ title: "asc" }, { id: "asc" }],
    take: GUIDE_LIST_LIMIT,
  });
  return rows.map((row) =>
    toGuideLink(row, { kind: "subject", board: board.slug, qualification: qualification.slug, subject: subject.slug }),
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// One guide page
// ---------------------------------------------------------------------------------------------------------------------

export interface GuideRouteParams {
  board: string;
  qualification?: string;
  subject?: string;
  slug: string;
}

export interface GuidePage {
  /** The guide's curriculum scope; null for a general guide (no board, `/guides/[slug]`). */
  path: CurriculumPath | null;
  scope: GuideScope;
  canonicalPath: string;
  lesson: {
    id: string;
    title: string;
    kind: LessonKind;
    summary: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    languageCode: string;
    estimatedMinutes: number;
    author: string | null;
    publishedAt: Date | null;
    updatedAt: Date;
    isDemo: boolean;
  };
  html: SanitizedHtml;
  /** Plain-text excerpt of the body (meta description fallback). */
  excerpt: string | null;
  attribution: LessonAttribution;
}

const GUIDE_PAGE_SELECT = {
  id: true,
  title: true,
  kind: true,
  summary: true,
  body: true,
  metaTitle: true,
  metaDescription: true,
  languageCode: true,
  estimatedMinutes: true,
  author: true,
  attribution: true,
  copyrightStatus: true,
  licenceCode: true,
  sourceUrl: true,
  publicationDate: true,
  publishedAt: true,
  updatedAt: true,
  isDemo: true,
  subjectId: true,
  qualificationId: true,
  examBoardId: true,
  source: {
    select: { name: true, type: true, publisher: true, url: true, licenceCode: true, licenceUrl: true, attributionText: true, requiresAttribution: true },
  },
} as const satisfies Prisma.LessonSelect;

/**
 * Resolves a guide URL. Null (404) when any segment is malformed or reserved, the scope does not resolve publicly, or
 * no PUBLIC, PUBLISHED guide with that slug lives in exactly that scope.
 */
export function getGuidePage(params: GuideRouteParams): Promise<GuidePage | null> {
  return loadGuidePage(params.board, params.qualification, params.subject, params.slug);
}

async function loadGuide(boardSlug: string, qualificationSlug: string | undefined, subjectSlug: string | undefined, slug: string): Promise<GuidePage | null> {
  const params: GuideRouteParams = {
    board: boardSlug,
    slug,
    ...(qualificationSlug !== undefined ? { qualification: qualificationSlug } : {}),
    ...(subjectSlug !== undefined ? { subject: subjectSlug } : {}),
  };
  if (!isPublicBoardSlug(params.board) || !isGuideSlug(params.slug)) return null;
  for (const segment of [params.qualification, params.subject]) {
    if (segment !== undefined && !isPublicSegmentSlug(segment)) return null;
  }
  const path = await resolveCurriculumPath({ board: params.board, qualification: params.qualification, subject: params.subject });
  if (!path) return null;

  let where: Prisma.LessonWhereInput;
  let scope: GuideScope;
  if (path.subject && path.qualification) {
    where = { subjectId: path.subject.id };
    scope = { kind: "subject", board: path.board.slug, qualification: path.qualification.slug, subject: path.subject.slug };
  } else if (path.qualification) {
    where = { subjectId: null, qualificationId: path.qualification.id };
    scope = { kind: "qualification", board: path.board.slug, qualification: path.qualification.slug };
  } else {
    where = { subjectId: null, qualificationId: null, examBoardId: path.board.id };
    scope = { kind: "board", board: path.board.slug };
  }

  const row = await db.lesson.findFirst({ where: { ...PUBLIC_GUIDE_WHERE, ...where, slug: params.slug }, select: GUIDE_PAGE_SELECT });
  if (!row) return null;
  return toGuidePage(row, path, scope, params.slug);
}

/**
 * A general guide: a PUBLIC article / study guide with no subject, qualification or board (allowed by
 * `Lesson_scope_chk`), served at `/guides/[slug]` so search results and the sitemap have a page to link to. Null (404)
 * for a malformed slug or when no such PUBLISHED guide exists.
 */
export function getGeneralGuidePage(slug: string): Promise<GuidePage | null> {
  return loadGeneralGuidePage(slug);
}

async function loadGeneralGuide(slug: string): Promise<GuidePage | null> {
  if (!isGuideSlug(slug)) return null;
  const row = await db.lesson.findFirst({
    where: { ...PUBLIC_GUIDE_WHERE, subjectId: null, qualificationId: null, examBoardId: null, slug },
    select: GUIDE_PAGE_SELECT,
  });
  if (!row) return null;
  return toGuidePage(row, null, { kind: "general" }, slug);
}

async function toGuidePage(
  row: Prisma.LessonGetPayload<{ select: typeof GUIDE_PAGE_SELECT }>,
  path: CurriculumPath | null,
  scope: GuideScope,
  slug: string,
): Promise<GuidePage> {
  const resolveAsset = await loadPublicAssetResolver([row.body]);
  const html = renderContent(row.body, { ...LESSON_RENDER_OPTIONS, idPrefix: "g-", resolveAsset }).html;
  return {
    path,
    scope,
    canonicalPath: guidePath(scope, slug),
    lesson: {
      id: row.id,
      title: row.title,
      kind: row.kind,
      summary: row.summary,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      languageCode: row.languageCode,
      estimatedMinutes: row.estimatedMinutes,
      author: row.author,
      publishedAt: row.publishedAt,
      updatedAt: row.updatedAt,
      isDemo: row.isDemo,
    },
    html,
    excerpt: excerptOf(row.body.slice(0, 4_000), 160),
    attribution: buildAttribution(
      {
        copyrightStatus: row.copyrightStatus,
        author: row.author,
        attribution: row.attribution,
        licenceCode: row.licenceCode,
        sourceUrl: row.sourceUrl,
        publicationDate: row.publicationDate,
        source: row.source,
      },
      APP_NAME,
    ),
  };
}

// React `cache` keys on argument identity: primitives only, so generateMetadata and the page share one load.
const loadGuidePage = cache(loadGuide);
const loadGeneralGuidePage = cache(loadGeneralGuide);
