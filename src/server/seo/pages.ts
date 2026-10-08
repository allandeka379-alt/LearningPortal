import "server-only";
import { cache } from "react";
import type { CatalogueStatus, ContentAccessTier, LessonKind, TopicKind } from "@/generated/prisma/client";
import type { SanitizedHtml } from "@/lib/content/types";
import { isEnrollableCatalogueStatus, LISTED_CATALOGUE_STATUSES } from "@/server/curriculum/core";
import { getExamSessions, type ExamSessionSummary } from "@/server/curriculum/exam-sessions";
import { resolveCurriculumPath, type CurriculumPath, type PublicBoard } from "@/server/curriculum/seo";
import { getTopicSubtreeIds, getTopicTree, type TopicNode } from "@/server/curriculum/topics";
import { db } from "@/server/db";
import { excerptOf, renderPublicMarkdown } from "./content";
import { countSyllabusContent, countTopicContent, type SyllabusContentCounts, type TopicContentCounts } from "./counts";
import { listBoardGuides, listQualificationGuides, listSubjectGuides, type GuideLink } from "./guides";
import {
  boardPath,
  guidePath,
  isPublicBoardSlug,
  isPublicSegmentSlug,
  qualificationPath,
  subjectPath,
  topicPath,
  type GuideScope,
} from "./routing";
import { loadPracticeSamples, loadSampleQuestions, type PracticeSample, type SampleQuestion } from "./samples";
import { formatDateRange, qualificationLabel } from "./text";

/**
 * Data loaders of the public SEO curriculum pages (§44). Each returns null for anything that must 404 (malformed or
 * reserved slugs, hidden / retired catalogue rows, non-public subjects or topics), so routes stay thin:
 * `const data = await getSubjectPage(params); if (!data) notFound();`.
 *
 * Premium safety: these loaders never select a lesson body or question text except for PUBLIC content, plus the
 * answer-free text of one PUBLIC-or-FREE practice sample per topic page (see `samples.ts` and the PUBLIC-only preview
 * query below). PREMIUM text never. Locked items carry title + tier only.
 *
 * Wrapped in React `cache()` so `generateMetadata` and the page share one load per render.
 */

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };

export const SUBJECT_SAMPLE_LIMIT = 2;
export const TOPIC_SAMPLE_LIMIT = 1;
/** PUBLIC lessons shown with an excerpt on a topic page ("1–2 free previews"). */
export const TOPIC_PREVIEW_LIMIT = 2;
/** Lesson titles listed on a topic page (the rest is summarised as a count). */
export const TOPIC_LESSON_LIST_LIMIT = 20;

// ---------------------------------------------------------------------------------------------------------------------
// Shared views
// ---------------------------------------------------------------------------------------------------------------------

export interface ExamSessionView {
  id: string;
  name: string;
  /** "20 Oct – 30 Nov 2027". */
  dateLabel: string;
  startsOn: string;
  endsOn: string;
  /** Dates not yet confirmed against the board's timetable: the UI must say so (§17). */
  isProvisional: boolean;
  /** Dev-seed session (never in production): labelled as demo data (rule 6). */
  isDemo: boolean;
  /** Official timetable link (http/https only). */
  sourceUrl: string | null;
}

function toExamSessionView(session: ExamSessionSummary): ExamSessionView {
  const url = session.sourceUrl?.trim() ?? "";
  return {
    id: session.id,
    name: session.name,
    dateLabel: formatDateRange(session.startsOn, session.endsOn),
    startsOn: session.startsOn,
    endsOn: session.endsOn,
    isProvisional: session.isProvisional,
    isDemo: session.isDemo,
    sourceUrl: /^https?:\/\//i.test(url) ? url : null,
  };
}

async function examSessionViews(qualificationId: string): Promise<ExamSessionView[]> {
  return (await getExamSessions(qualificationId)).map(toExamSessionView);
}

// ---------------------------------------------------------------------------------------------------------------------
// Navigation and static params
// ---------------------------------------------------------------------------------------------------------------------

/** `generateStaticParams` of `/[board]`. */
export async function listBoardParams(): Promise<{ board: string }[]> {
  const rows = await db.examBoard.findMany({ where: { catalogueStatus: LISTED }, select: { slug: true }, orderBy: { slug: "asc" } });
  return rows.filter((row) => isPublicBoardSlug(row.slug)).map((row) => ({ board: row.slug }));
}

/** `generateStaticParams` of `/[board]/[qualification]`. */
export async function listQualificationParams(): Promise<{ board: string; qualification: string }[]> {
  const rows = await db.qualification.findMany({
    where: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } },
    select: { slug: true, examBoard: { select: { slug: true } } },
    orderBy: [{ examBoardId: "asc" }, { slug: "asc" }],
  });
  return rows
    .filter((row) => isPublicBoardSlug(row.examBoard.slug) && isPublicSegmentSlug(row.slug))
    .map((row) => ({ board: row.examBoard.slug, qualification: row.slug }));
}

/** `generateStaticParams` of `/[board]/[qualification]/[subject]`: every listed public subject. */
export async function listSubjectParams(): Promise<{ board: string; qualification: string; subject: string }[]> {
  const rows = await db.subject.findMany({
    where: { catalogueStatus: LISTED, isPublic: true, qualification: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } } },
    select: { slug: true, qualification: { select: { slug: true, examBoard: { select: { slug: true } } } } },
    orderBy: [{ qualificationId: "asc" }, { slug: "asc" }],
  });
  return rows
    .filter((row) => isPublicBoardSlug(row.qualification.examBoard.slug) && isPublicSegmentSlug(row.qualification.slug) && isPublicSegmentSlug(row.slug))
    .map((row) => ({ board: row.qualification.examBoard.slug, qualification: row.qualification.slug, subject: row.slug }));
}

// ---------------------------------------------------------------------------------------------------------------------
// /[board]
// ---------------------------------------------------------------------------------------------------------------------

export interface QualificationCard {
  id: string;
  slug: string;
  name: string;
  /** "ZIMSEC O-Level". */
  label: string;
  summary: string | null;
  catalogueStatus: CatalogueStatus;
  isEnrollable: boolean;
  /** Listed public subjects (a real count). */
  subjectCount: number;
  href: string;
}

export interface BoardPageData {
  board: PublicBoard;
  summaryHtml: SanitizedHtml | null;
  /** Plain-text summary (meta description fallback). */
  summaryText: string | null;
  levels: { level: { id: string; name: string }; qualifications: QualificationCard[] }[];
  guides: GuideLink[];
  canonicalPath: string;
}

export const getBoardPage = cache(async (boardSlug: string): Promise<BoardPageData | null> => {
  if (!isPublicBoardSlug(boardSlug)) return null;
  const path = await resolveCurriculumPath({ board: boardSlug });
  if (!path) return null;
  const { board } = path;

  const [rows, guides, html] = await Promise.all([
    db.qualification.findMany({
      where: { examBoardId: board.id, catalogueStatus: LISTED, level: { isActive: true } },
      select: {
        id: true,
        slug: true,
        name: true,
        shortName: true,
        description: true,
        publicSummary: true,
        catalogueStatus: true,
        level: { select: { id: true, name: true, sortOrder: true } },
        _count: { select: { subjects: { where: { catalogueStatus: LISTED, isPublic: true, category: { isActive: true } } } } },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    listBoardGuides(board),
    renderPublicMarkdown({ summary: board.publicSummary }),
  ]);

  const levels = new Map<string, { sortOrder: number; level: { id: string; name: string }; qualifications: QualificationCard[] }>();
  for (const row of rows) {
    if (!isPublicSegmentSlug(row.slug)) continue;
    let group = levels.get(row.level.id);
    if (!group) {
      group = { sortOrder: row.level.sortOrder, level: { id: row.level.id, name: row.level.name }, qualifications: [] };
      levels.set(row.level.id, group);
    }
    group.qualifications.push({
      id: row.id,
      slug: row.slug,
      name: row.name,
      label: qualificationLabel(board.shortName, row.shortName),
      summary: excerptOf(row.publicSummary, 200) ?? excerptOf(row.description, 200),
      catalogueStatus: row.catalogueStatus,
      isEnrollable: isEnrollableCatalogueStatus(row.catalogueStatus),
      subjectCount: row._count.subjects,
      href: qualificationPath(board.slug, row.slug),
    });
  }
  return {
    board,
    summaryHtml: html.summary,
    summaryText: excerptOf(board.publicSummary, 300) ?? excerptOf(board.description, 300),
    levels: [...levels.values()]
      .sort((a, b) => a.sortOrder - b.sortOrder || a.level.name.localeCompare(b.level.name, "en"))
      .map(({ level, qualifications }) => ({ level, qualifications })),
    guides,
    canonicalPath: boardPath(board.slug),
  };
});

// ---------------------------------------------------------------------------------------------------------------------
// /[board]/[qualification]
// ---------------------------------------------------------------------------------------------------------------------

export interface SubjectCard {
  id: string;
  slug: string;
  name: string;
  officialCode: string | null;
  summary: string | null;
  catalogueStatus: CatalogueStatus;
  isEnrollable: boolean;
  href: string;
}

export interface QualificationPageData {
  path: CurriculumPath & { qualification: NonNullable<CurriculumPath["qualification"]> };
  label: string;
  summaryHtml: SanitizedHtml | null;
  summaryText: string | null;
  categories: { category: { id: string; name: string }; subjects: SubjectCard[] }[];
  subjectCount: number;
  examSessions: ExamSessionView[];
  guides: GuideLink[];
  canonicalPath: string;
}

export const getQualificationPage = cache(async (boardSlug: string, qualificationSlug: string): Promise<QualificationPageData | null> => {
  if (!isPublicBoardSlug(boardSlug) || !isPublicSegmentSlug(qualificationSlug)) return null;
  const path = await resolveCurriculumPath({ board: boardSlug, qualification: qualificationSlug });
  if (!path?.qualification) return null;
  const { board, qualification } = path;

  const [rows, examSessions, guides, html] = await Promise.all([
    db.subject.findMany({
      where: { qualificationId: qualification.id, catalogueStatus: LISTED, isPublic: true, category: { isActive: true } },
      select: {
        id: true,
        slug: true,
        name: true,
        officialCode: true,
        description: true,
        publicSummary: true,
        catalogueStatus: true,
        category: { select: { id: true, name: true, sortOrder: true } },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    examSessionViews(qualification.id),
    listQualificationGuides(board, qualification),
    renderPublicMarkdown({ summary: qualification.publicSummary }),
  ]);

  const categories = new Map<string, { sortOrder: number; category: { id: string; name: string }; subjects: SubjectCard[] }>();
  let subjectCount = 0;
  for (const row of rows) {
    if (!isPublicSegmentSlug(row.slug)) continue;
    let group = categories.get(row.category.id);
    if (!group) {
      group = { sortOrder: row.category.sortOrder, category: { id: row.category.id, name: row.category.name }, subjects: [] };
      categories.set(row.category.id, group);
    }
    subjectCount += 1;
    group.subjects.push({
      id: row.id,
      slug: row.slug,
      name: row.name,
      officialCode: row.officialCode,
      summary: excerptOf(row.publicSummary, 140) ?? excerptOf(row.description, 140),
      catalogueStatus: row.catalogueStatus,
      isEnrollable: isEnrollableCatalogueStatus(row.catalogueStatus),
      href: subjectPath(board.slug, qualification.slug, row.slug),
    });
  }
  return {
    path: { ...path, qualification },
    label: qualificationLabel(board.shortName, qualification.shortName),
    summaryHtml: html.summary,
    summaryText: excerptOf(qualification.publicSummary, 300) ?? excerptOf(qualification.description, 300),
    categories: [...categories.values()]
      .sort((a, b) => a.sortOrder - b.sortOrder || a.category.name.localeCompare(b.category.name, "en"))
      .map(({ category, subjects }) => ({ category, subjects })),
    subjectCount,
    examSessions,
    guides,
    canonicalPath: qualificationPath(board.slug, qualification.slug),
  };
});

// ---------------------------------------------------------------------------------------------------------------------
// /[board]/[qualification]/[subject]
// ---------------------------------------------------------------------------------------------------------------------

export interface TopicOutlineNode {
  id: string;
  kind: TopicKind;
  code: string | null;
  name: string;
  href: string;
  /** Plain-text excerpt of the public summary (TOPIC / SECTION nodes only). */
  summary: string | null;
  isOptional: boolean;
  children: TopicOutlineNode[];
}

type SubjectPath = CurriculumPath & {
  qualification: NonNullable<CurriculumPath["qualification"]>;
  subject: NonNullable<CurriculumPath["subject"]>;
};

export interface SubjectPageData {
  path: SubjectPath;
  /** "ZIMSEC O-Level". */
  label: string;
  /** "ZIMSEC O-Level Mathematics". */
  fullName: string;
  html: { summary: SanitizedHtml | null; overview: SanitizedHtml | null; assessment: SanitizedHtml | null };
  /** Plain-text public summary (meta description and hero lead). */
  summaryText: string | null;
  /** Public topic tree of the CURRENT syllabus version (empty when there is none yet). */
  topics: TopicOutlineNode[];
  /** Names of TOPIC-kind nodes in order (structured data `teaches`). */
  topicNames: string[];
  topicCount: number;
  examSessions: ExamSessionView[];
  /** Null when the subject has no published syllabus version yet. */
  counts: SyllabusContentCounts | null;
  samples: SampleQuestion[];
  guides: GuideLink[];
  canonicalPath: string;
}

function outline(nodes: readonly TopicNode[], base: { board: string; qualification: string; subject: string }): TopicOutlineNode[] {
  // A node whose slug cannot be routed (e.g. "guides", shadowed by the guides route) is left out with its subtree.
  return nodes.filter((node) => isPublicSegmentSlug(node.slug)).map((node) => ({
    id: node.id,
    kind: node.kind,
    code: node.code,
    name: node.name,
    href: topicPath(base.board, base.qualification, base.subject, node.slug),
    summary: node.kind === "SUBTOPIC" ? null : (excerptOf(node.publicSummary, 160) ?? excerptOf(node.description, 160)),
    isOptional: node.isOptional,
    children: outline(node.children, base),
  }));
}

function collectTopicNames(nodes: readonly TopicOutlineNode[], into: string[]): string[] {
  for (const node of nodes) {
    if (node.kind === "TOPIC") into.push(node.name);
    collectTopicNames(node.children, into);
  }
  return into;
}

function countNodes(nodes: readonly TopicOutlineNode[]): number {
  return nodes.reduce((sum, node) => sum + 1 + countNodes(node.children), 0);
}

export interface SubjectRouteParams {
  board: string;
  qualification: string;
  subject: string;
}

async function resolveSubjectPath(params: SubjectRouteParams): Promise<SubjectPath | null> {
  if (!isPublicBoardSlug(params.board) || !isPublicSegmentSlug(params.qualification) || !isPublicSegmentSlug(params.subject)) return null;
  const path = await resolveCurriculumPath({ board: params.board, qualification: params.qualification, subject: params.subject });
  if (!path?.qualification || !path.subject) return null;
  return { ...path, qualification: path.qualification, subject: path.subject };
}

/** Subject page data (null = 404). React `cache` keys on primitive arguments, so the object is unpacked first. */
export function getSubjectPage(params: SubjectRouteParams): Promise<SubjectPageData | null> {
  return loadSubjectPage(params.board, params.qualification, params.subject);
}

const loadSubjectPage = cache(async (boardSlug: string, qualificationSlug: string, subjectSlug: string): Promise<SubjectPageData | null> => {
  const path = await resolveSubjectPath({ board: boardSlug, qualification: qualificationSlug, subject: subjectSlug });
  if (!path) return null;
  const { board, qualification, subject, syllabus } = path;
  const base = { board: board.slug, qualification: qualification.slug, subject: subject.slug };
  const label = qualificationLabel(board.shortName, qualification.shortName);

  const [tree, examSessions, counts, samples, guides, html] = await Promise.all([
    syllabus ? getTopicTree(syllabus.id, { publicOnly: true }) : Promise.resolve(null),
    examSessionViews(qualification.id),
    syllabus ? countSyllabusContent(syllabus.id, subject.id) : Promise.resolve(null),
    syllabus ? loadSampleQuestions({ syllabusId: syllabus.id, limit: SUBJECT_SAMPLE_LIMIT }) : Promise.resolve([]),
    listSubjectGuides(board, qualification, subject),
    renderPublicMarkdown({ summary: subject.publicSummary, overview: syllabus?.overview, assessment: syllabus?.assessmentOverview }),
  ]);
  const topics = outline(tree ?? [], base);
  return {
    path,
    label,
    fullName: `${label} ${subject.name}`,
    html: { summary: html.summary, overview: html.overview, assessment: html.assessment },
    summaryText: excerptOf(subject.publicSummary, 300) ?? excerptOf(subject.description, 300),
    topics,
    topicNames: collectTopicNames(topics, []),
    topicCount: countNodes(topics),
    examSessions,
    counts,
    samples,
    guides,
    canonicalPath: subjectPath(base.board, base.qualification, base.subject),
  };
});

// ---------------------------------------------------------------------------------------------------------------------
// /[board]/[qualification]/[subject]/[topic]
// ---------------------------------------------------------------------------------------------------------------------

export type LessonLockReason = "SIGN_IN" | "PREMIUM";

/** A PUBLIC lesson with a short plain-text excerpt ("free preview"). */
export interface LessonPreview {
  id: string;
  title: string;
  kind: LessonKind;
  excerpt: string | null;
  estimatedMinutes: number;
  /** Public guide page of the lesson (null when its home scope has no public page). */
  href: string | null;
}

/** Any lesson in the topic: title only. `lockReason` null = PUBLIC (readable by anyone). */
export interface LessonListItem {
  id: string;
  title: string;
  kind: LessonKind;
  estimatedMinutes: number;
  accessTier: ContentAccessTier;
  lockReason: LessonLockReason | null;
  href: string | null;
}

export interface TopicPageData {
  path: SubjectPath & { topic: NonNullable<CurriculumPath["topic"]>; syllabus: NonNullable<CurriculumPath["syllabus"]> };
  label: string;
  fullName: string;
  subjectHref: string;
  canonicalPath: string;
  ancestors: { id: string; name: string; code: string | null; href: string }[];
  children: { id: string; name: string; code: string | null; kind: TopicKind; isOptional: boolean; href: string }[];
  objectives: { id: string; code: string | null; statement: string }[];
  summaryHtml: SanitizedHtml | null;
  /** Plain-text summary for the meta description. */
  summaryText: string | null;
  previews: LessonPreview[];
  lessons: LessonListItem[];
  /** All published lessons in the topic subtree (the list above may be shorter). */
  lessonTotal: number;
  /** One practice sample (PUBLIC first, else FREE), answered on the page through anonymous marking. */
  sample: PracticeSample | null;
  counts: TopicContentCounts;
}

export interface TopicRouteParams extends SubjectRouteParams {
  topic: string;
}

interface LessonScopeRow {
  slug: string;
  subject: {
    slug: string;
    isPublic: boolean;
    catalogueStatus: CatalogueStatus;
    qualification: { slug: string; catalogueStatus: CatalogueStatus; examBoard: { slug: string; catalogueStatus: CatalogueStatus } };
  } | null;
  qualification: { slug: string; catalogueStatus: CatalogueStatus; examBoard: { slug: string; catalogueStatus: CatalogueStatus } } | null;
  examBoard: { slug: string; catalogueStatus: CatalogueStatus } | null;
}

const isListed = (status: CatalogueStatus): boolean => (LISTED_CATALOGUE_STATUSES as readonly CatalogueStatus[]).includes(status);

/** The public guide scope of a PUBLIC lesson, or null when its home scope has no public page. */
export function guideScopeOf(lesson: Omit<LessonScopeRow, "slug">): GuideScope | null {
  const { subject, qualification, examBoard } = lesson;
  if (subject) {
    const q = subject.qualification;
    const ok = subject.isPublic && isListed(subject.catalogueStatus) && isListed(q.catalogueStatus) && isListed(q.examBoard.catalogueStatus);
    return ok && isPublicBoardSlug(q.examBoard.slug) && isPublicSegmentSlug(q.slug) && isPublicSegmentSlug(subject.slug)
      ? { kind: "subject", board: q.examBoard.slug, qualification: q.slug, subject: subject.slug }
      : null;
  }
  if (qualification) {
    const ok = isListed(qualification.catalogueStatus) && isListed(qualification.examBoard.catalogueStatus);
    return ok && isPublicBoardSlug(qualification.examBoard.slug) && isPublicSegmentSlug(qualification.slug)
      ? { kind: "qualification", board: qualification.examBoard.slug, qualification: qualification.slug }
      : null;
  }
  if (examBoard) {
    return isListed(examBoard.catalogueStatus) && isPublicBoardSlug(examBoard.slug) ? { kind: "board", board: examBoard.slug } : null;
  }
  // No scope at all: a general guide (`/guides/[slug]`).
  return { kind: "general" };
}

const SCOPE_STATUS = { slug: true, catalogueStatus: true } as const;
const LESSON_SCOPE_SELECT = {
  slug: true,
  subject: {
    select: {
      slug: true,
      isPublic: true,
      catalogueStatus: true,
      qualification: { select: { ...SCOPE_STATUS, examBoard: { select: SCOPE_STATUS } } },
    },
  },
  qualification: { select: { ...SCOPE_STATUS, examBoard: { select: SCOPE_STATUS } } },
  examBoard: { select: SCOPE_STATUS },
} as const;

function lockReasonFor(tier: ContentAccessTier): LessonLockReason | null {
  return tier === "PUBLIC" ? null : tier === "FREE" ? "SIGN_IN" : "PREMIUM";
}

/** Lessons tagged anywhere in the topic subtree: the topic's own lessons first, then by subtree order. Titles only. */
async function topicLessons(subtreeIds: readonly string[]): Promise<{ items: (LessonListItem & { scope: LessonScopeRow })[]; total: number }> {
  if (subtreeIds.length === 0) return { items: [], total: 0 };
  const links = await db.lessonTopic.findMany({
    where: { topicId: { in: [...subtreeIds] }, lesson: { status: "PUBLISHED", draftOfId: null } },
    select: {
      topicId: true,
      sortOrder: true,
      // Card fields only: no body, no summary (locked lessons expose their title and tier, nothing else).
      lesson: { select: { id: true, title: true, kind: true, estimatedMinutes: true, accessTier: true, ...LESSON_SCOPE_SELECT } },
    },
  });
  const position = new Map(subtreeIds.map((id, index) => [id, index]));
  links.sort(
    (a, b) =>
      (position.get(a.topicId) ?? 0) - (position.get(b.topicId) ?? 0) ||
      a.sortOrder - b.sortOrder ||
      a.lesson.title.localeCompare(b.lesson.title, "en") ||
      (a.lesson.id < b.lesson.id ? -1 : 1),
  );
  const seen = new Set<string>();
  const items: (LessonListItem & { scope: LessonScopeRow })[] = [];
  for (const { lesson } of links) {
    if (seen.has(lesson.id)) continue;
    seen.add(lesson.id);
    const scope: LessonScopeRow = { slug: lesson.slug, subject: lesson.subject, qualification: lesson.qualification, examBoard: lesson.examBoard };
    const guideScope = lesson.accessTier === "PUBLIC" ? guideScopeOf(scope) : null;
    items.push({
      id: lesson.id,
      title: lesson.title,
      kind: lesson.kind,
      estimatedMinutes: lesson.estimatedMinutes,
      accessTier: lesson.accessTier,
      lockReason: lockReasonFor(lesson.accessTier),
      href: guideScope ? guidePath(guideScope, lesson.slug) : null,
      scope,
    });
  }
  return { items, total: items.length };
}

/** Excerpts for PUBLIC lessons only (the query itself is restricted to the PUBLIC tier). */
async function publicLessonExcerpts(ids: readonly string[]): Promise<Map<string, string | null>> {
  if (ids.length === 0) return new Map();
  const rows = await db.lesson.findMany({
    where: { id: { in: [...ids] }, accessTier: "PUBLIC", status: "PUBLISHED", draftOfId: null },
    select: { id: true, summary: true, body: true },
  });
  return new Map(rows.map((row) => [row.id, excerptOf(row.summary, 240) ?? excerptOf(row.body.slice(0, 4_000), 240)]));
}

/** Topic page data (null = 404). React `cache` keys on primitive arguments, so the object is unpacked first. */
export function getTopicPage(params: TopicRouteParams): Promise<TopicPageData | null> {
  return loadTopicPage(params.board, params.qualification, params.subject, params.topic);
}

const loadTopicPage = cache(async (boardSlug: string, qualificationSlug: string, subjectSlug: string, topicSlug: string): Promise<TopicPageData | null> => {
  const params: TopicRouteParams = { board: boardSlug, qualification: qualificationSlug, subject: subjectSlug, topic: topicSlug };
  if (!isPublicSegmentSlug(params.topic)) return null;
  if (!isPublicBoardSlug(params.board) || !isPublicSegmentSlug(params.qualification) || !isPublicSegmentSlug(params.subject)) return null;
  const path = await resolveCurriculumPath(params);
  if (!path?.qualification || !path.subject || !path.syllabus || !path.topic) return null;
  const { board, qualification, subject, syllabus, topic: detail } = path;
  const base = { board: board.slug, qualification: qualification.slug, subject: subject.slug };
  const label = qualificationLabel(board.shortName, qualification.shortName);

  const subtreeIds = await getTopicSubtreeIds(detail.topic.id);
  const [lessons, counts, samples, html] = await Promise.all([
    topicLessons(subtreeIds),
    countTopicContent(syllabus.id, subtreeIds),
    loadPracticeSamples({ syllabusId: syllabus.id, topicIds: subtreeIds, limit: TOPIC_SAMPLE_LIMIT }),
    renderPublicMarkdown({ summary: detail.topic.publicSummary ?? detail.topic.description }),
  ]);

  const previewIds = lessons.items.filter((item) => item.accessTier === "PUBLIC").slice(0, TOPIC_PREVIEW_LIMIT).map((item) => item.id);
  const excerpts = await publicLessonExcerpts(previewIds);
  const previews: LessonPreview[] = lessons.items
    .filter((item) => excerpts.has(item.id))
    .map((item) => ({
      id: item.id,
      title: item.title,
      kind: item.kind,
      excerpt: excerpts.get(item.id) ?? null,
      estimatedMinutes: item.estimatedMinutes,
      href: item.href,
    }));
  const previewSet = new Set(previews.map((preview) => preview.id));

  return {
    path: { ...path, qualification, subject, syllabus, topic: detail },
    label,
    fullName: `${label} ${subject.name}`,
    subjectHref: subjectPath(base.board, base.qualification, base.subject),
    canonicalPath: topicPath(base.board, base.qualification, base.subject, detail.topic.slug),
    ancestors: detail.ancestors.map((ancestor) => ({
      id: ancestor.id,
      name: ancestor.name,
      code: ancestor.code,
      href: topicPath(base.board, base.qualification, base.subject, ancestor.slug),
    })),
    children: detail.children
      .filter((child) => child.isPublic && isPublicSegmentSlug(child.slug))
      .map((child) => ({
        id: child.id,
        name: child.name,
        code: child.code,
        kind: child.kind,
        isOptional: child.isOptional,
        href: topicPath(base.board, base.qualification, base.subject, child.slug),
      })),
    objectives: detail.objectives.map((objective) => ({ id: objective.id, code: objective.code, statement: objective.statement })),
    summaryHtml: html.summary,
    summaryText: excerptOf(detail.topic.publicSummary, 300) ?? excerptOf(detail.topic.description, 300),
    previews,
    lessons: lessons.items
      .filter((item) => !previewSet.has(item.id))
      .slice(0, TOPIC_LESSON_LIST_LIMIT)
      .map((item) => ({
        id: item.id,
        title: item.title,
        kind: item.kind,
        estimatedMinutes: item.estimatedMinutes,
        accessTier: item.accessTier,
        lockReason: item.lockReason,
        href: item.href,
      })),
    lessonTotal: lessons.total,
    sample: samples[0] ?? null,
    counts,
  };
});
