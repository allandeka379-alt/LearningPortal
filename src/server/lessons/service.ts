import "server-only";
import type { ContentAccessTier, LessonKind, LessonProgressStatus } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import type { ContentHeading, SanitizedHtml } from "@/lib/content/types";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { getRenderedLesson } from "@/server/content/service";
import { listLessonsForTopic } from "@/server/curriculum";
import { db } from "@/server/db";
import { liveLessonAssignments, resolveLessonAccess, type LessonAccess, type LessonActor } from "./access";
import { buildAttribution, isLessonOpen, lessonNeighbours, lessonState, type LessonAttribution, type LessonState } from "./core";

/**
 * The lesson reader's read model (§8 lesson system, §26 pinned versions, §27 licensing, §31 free vs paid lessons):
 * the server-rendered body (KaTeX maths, pedagogical blocks, sanitised at write time), the headings for the in-lesson
 * table of contents, the learning objectives, the licensing footer, the student's progress, previous / next lessons in
 * the topic and whether the lesson has practice questions. A locked lesson comes back WITHOUT its body.
 */

/** A neighbouring lesson in the topic (previous / next). */
export interface LessonNavItem {
  id: string;
  title: string;
  locked: boolean;
  state: LessonState;
}

export interface LessonProgressView {
  status: LessonProgressStatus;
  completedAt: Date | null;
  timeSpentSeconds: number;
  /** The student completed an earlier revision; the lesson was revised since. */
  revisedSinceCompletion: boolean;
}

export interface LessonForStudent {
  id: string;
  title: string;
  summary: string | null;
  kind: LessonKind;
  estimatedMinutes: number;
  languageCode: string;
  accessTier: ContentAccessTier;
  isDemo: boolean;
  subject: { id: string; name: string };
  /** The topic the lesson is read in (breadcrumbs, previous / next, "Practise this topic"). */
  topic: { id: string; name: string; code: string | null };
  /** Upgrade prompt instead of content. */
  locked: boolean;
  /** Opened through a teacher assignment (§22). */
  assigned: boolean;
  /** Null when locked. */
  content: { html: SanitizedHtml; headings: readonly ContentHeading[]; hasMath: boolean } | null;
  objectives: { id: string; code: string | null; statement: string }[];
  /** Null when locked (nothing of the content is shown). */
  attribution: LessonAttribution | null;
  progress: LessonProgressView | null;
  /** 1-based position in the topic's lesson list ("Lesson 2 of 5"). */
  position: number | null;
  totalInTopic: number;
  previous: LessonNavItem | null;
  next: LessonNavItem | null;
  /** Published practice questions attached to the lesson (shown only when the lesson is open). */
  practiceQuestionCount: number;
  upgradePath: string;
}

const READER_SELECT = {
  body: true,
  bodyHtml: true,
  renderVersion: true,
  contentHash: true,
  copyrightStatus: true,
  author: true,
  attribution: true,
  licenceCode: true,
  sourceUrl: true,
  publicationDate: true,
  source: {
    select: {
      name: true,
      type: true,
      publisher: true,
      url: true,
      licenceCode: true,
      licenceUrl: true,
      attributionText: true,
      requiresAttribution: true,
    },
  },
} as const;

/** Published root questions linked to a lesson (what a LESSON_CHECK attempt would contain). */
export async function countLessonQuestions(lessonId: string): Promise<number> {
  return db.lessonQuestion.count({
    where: { lessonId, question: { status: "PUBLISHED", draftOfId: null, parentId: null } },
  });
}

/** Position in the topic and the previous / next lessons, with their lock and completion state. */
async function neighboursOf(userId: string, access: LessonAccess, now: Date) {
  const list = await listLessonsForTopic(access.topic.id);
  const { position, total, previous, next } = lessonNeighbours(list, access.lesson.id);
  const around = [previous, next].filter((lesson): lesson is NonNullable<typeof lesson> => lesson !== null);
  if (around.length === 0) return { position, total, previous: null, next: null };

  const lockedByPlan = around.filter((lesson) => !isLessonOpen(lesson.accessTier, access.lessonAccess)).map((lesson) => lesson.id);
  const [progress, assigned] = await Promise.all([
    db.lessonProgress.findMany({ where: { userId, lessonId: { in: around.map((lesson) => lesson.id) } }, select: { lessonId: true, status: true } }),
    liveLessonAssignments(userId, lockedByPlan, now),
  ]);
  const states = new Map(progress.map((row) => [row.lessonId, lessonState(row)]));
  const toItem = (lesson: (typeof around)[number]): LessonNavItem => ({
    id: lesson.id,
    title: lesson.title,
    locked: !isLessonOpen(lesson.accessTier, access.lessonAccess, assigned.get(lesson.id)?.sponsored === true),
    state: states.get(lesson.id) ?? "NOT_STARTED",
  });
  return { position, total, previous: previous ? toItem(previous) : null, next: next ? toItem(next) : null };
}

/**
 * Everything the lesson page needs (module doc).
 *
 * @throws AppError NOT_FOUND (unknown / unpublished / not in the student's pinned syllabus) | FORBIDDEN
 */
export async function getLessonForStudent(actor: LessonActor, lessonId: string, options: { topicId?: string | null; now?: Date } = {}): Promise<LessonForStudent> {
  const now = options.now ?? new Date();
  const access = await resolveLessonAccess(actor, lessonId, { topicId: options.topicId ?? null, now });
  const { lesson } = access;

  const [subject, objectives, progress, neighbours, practiceQuestionCount, reader] = await Promise.all([
    db.subject.findUniqueOrThrow({ where: { id: access.subjectId }, select: { id: true, name: true } }),
    db.lessonObjective.findMany({
      where: { lessonId: lesson.id },
      select: { objective: { select: { id: true, code: true, statement: true, sortOrder: true } } },
    }),
    db.lessonProgress.findUnique({
      where: { userId_lessonId: { userId: actor.userId, lessonId: lesson.id } },
      select: { status: true, completedAt: true, timeSpentSeconds: true, completedRevision: true },
    }),
    neighboursOf(actor.userId, access, now),
    access.open ? countLessonQuestions(lesson.id) : Promise.resolve(0),
    access.open ? db.lesson.findUniqueOrThrow({ where: { id: lesson.id }, select: READER_SELECT }) : Promise.resolve(null),
  ]);

  let content: LessonForStudent["content"] = null;
  let attribution: LessonAttribution | null = null;
  if (reader) {
    const rendered = await getRenderedLesson({ id: lesson.id, body: reader.body, bodyHtml: reader.bodyHtml, renderVersion: reader.renderVersion, contentHash: reader.contentHash });
    content = { html: rendered.html, headings: rendered.headings, hasMath: rendered.hasMath };
    attribution = buildAttribution(reader, APP_NAME);
  }

  return {
    id: lesson.id,
    title: lesson.title,
    summary: lesson.summary,
    kind: lesson.kind,
    estimatedMinutes: lesson.estimatedMinutes,
    languageCode: lesson.languageCode,
    accessTier: lesson.accessTier,
    isDemo: lesson.isDemo,
    subject,
    topic: { id: access.topic.id, name: access.topic.name, code: access.topic.code },
    locked: !access.open,
    assigned: access.assigned,
    content,
    objectives: objectives
      .map((row) => row.objective)
      .sort((a, b) => a.sortOrder - b.sortOrder || (a.id < b.id ? -1 : 1))
      .map(({ id, code, statement }) => ({ id, code, statement })),
    attribution,
    progress: progress
      ? {
          status: progress.status,
          completedAt: progress.completedAt,
          timeSpentSeconds: progress.timeSpentSeconds,
          revisedSinceCompletion: progress.completedRevision !== null && progress.completedRevision < lesson.revision,
        }
      : null,
    position: neighbours.position,
    totalInTopic: neighbours.total,
    previous: neighbours.previous,
    next: neighbours.next,
    practiceQuestionCount,
    upgradePath: UPGRADE_PATH,
  };
}
