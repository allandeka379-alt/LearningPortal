import "server-only";
import type { ContentAccessTier, EnrollmentStatus, LessonKind, MasteryBand, SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import type { SanitizedHtml } from "@/lib/content/types";
import { getSubjectEntitlements, UPGRADE_PATH } from "@/server/billing/entitlements";
import { renderContent } from "@/server/content/render";
import { countLessonsByTopic, getSyllabusForEnrollment, getTopicById, listLessonsForTopic, type TopicLesson } from "@/server/curriculum";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { assertStudent, lessonIdSchema, liveLessonAssignments, type LessonActor } from "./access";
import { isLessonOpen, lessonListCounts, lessonState, type LessonState } from "./core";

/**
 * The topic page read model (§2 hierarchy, §8 lessons, §11 mastery band, §26 pinned version, §31 free vs paid): the
 * topic in the student's PINNED syllabus version with its breadcrumb, description, learning objectives, subtopics
 * (mastery + lesson counts), the lessons in order with completion and lock state, and the topic's mastery.
 *
 * Lessons: the topic's own tagged lessons; a node without any inherits its nearest ancestor's (the same rule the
 * subject rollup uses for "lessons per leaf"), labelled with where they come from.
 */

export interface TopicLessonItem {
  id: string;
  title: string;
  summary: string | null;
  kind: LessonKind;
  estimatedMinutes: number;
  accessTier: ContentAccessTier;
  /** Not covered by the student's plan: the list shows a lock and the lesson page an upgrade prompt. */
  locked: boolean;
  state: LessonState;
  isDemo: boolean;
}

export interface TopicMasteryView {
  score: number;
  band: MasteryBand;
  questionsAttempted: number;
  questionsCorrect: number;
  lastPracticedAt: Date | null;
  /** §11 "re-test later": a re-test is due now. */
  retestDue: boolean;
  /** §11 repeated wrong answers started remediation (easier questions, a lesson first). */
  inRemediation: boolean;
}

export interface SubtopicItem {
  id: string;
  name: string;
  code: string | null;
  kind: TopicKind;
  isOptional: boolean;
  /** Null until the student has answered questions in it. */
  score: number | null;
  band: MasteryBand | null;
  questionsAttempted: number;
  lessonCount: number;
}

export interface TopicPageView {
  subject: { id: string; name: string; qualificationName: string };
  syllabus: { id: string; title: string; versionLabel: string; status: SyllabusStatus; isDemo: boolean };
  enrollmentStatus: EnrollmentStatus;
  topic: {
    id: string;
    name: string;
    code: string | null;
    kind: TopicKind;
    isOptional: boolean;
    estimatedStudyMinutes: number | null;
    descriptionHtml: SanitizedHtml | null;
  };
  /** Root first, excluding the topic. */
  ancestors: { id: string; name: string; code: string | null; kind: TopicKind }[];
  objectives: { id: string; code: string | null; statement: string }[];
  /** Null when there is no evidence yet (never a made-up score, §50). */
  mastery: TopicMasteryView | null;
  subtopics: SubtopicItem[];
  lessons: TopicLessonItem[];
  /** Set when the lessons are inherited from an ancestor topic. */
  lessonsFrom: { id: string; name: string } | null;
  lessonCounts: { total: number; completed: number; locked: number };
  upgradePath: string;
}

/**
 * The topic page for a student (module doc).
 *
 * @throws AppError NOT_FOUND (not enrolled in the subject, unknown topic, or a topic of another syllabus version) |
 *         FORBIDDEN
 */
export async function getTopicPageForStudent(actor: LessonActor, subjectId: string, topicId: string, now: Date = new Date()): Promise<TopicPageView> {
  assertStudent(actor);
  if (!lessonIdSchema.safeParse(subjectId).success || !lessonIdSchema.safeParse(topicId).success) throw AppError.notFound("Topic not found.");
  const userId = actor.userId;

  const [pinned, detail, subject] = await Promise.all([
    getSyllabusForEnrollment(userId, subjectId),
    getTopicById(topicId),
    db.subject.findUnique({ where: { id: subjectId }, select: { id: true, name: true, qualification: { select: { name: true, shortName: true } } } }),
  ]);
  if (!pinned || !subject) throw AppError.notFound("You're not enrolled in this subject.");
  // §26: only topics of the version the student is pinned to (an older or newer version's node is "not found").
  if (!detail || detail.topic.syllabusId !== pinned.syllabus.id) throw AppError.notFound("This topic is not part of your syllabus version.");
  const { topic, ancestors, children, objectives } = detail;

  let lessonsFrom: TopicPageView["lessonsFrom"] = null;
  let lessons: TopicLesson[] = await listLessonsForTopic(topic.id);
  if (lessons.length === 0 && ancestors.length > 0) {
    // One grouped count finds the nearest ancestor with lessons (no query per level).
    const counts = await countLessonsByTopic(ancestors.map((a) => a.id));
    const nearest = [...ancestors].reverse().find((a) => (counts.get(a.id) ?? 0) > 0);
    if (nearest) {
      lessons = await listLessonsForTopic(nearest.id);
      lessonsFrom = { id: nearest.id, name: nearest.name };
    }
  }

  const lessonIds = lessons.map((lesson) => lesson.id);
  const childIds = children.map((child) => child.id);
  const [entitlements, progressRows, masteryRows, childLessonCounts] = await Promise.all([
    getSubjectEntitlements(userId, subjectId, { syllabusId: pinned.syllabus.id }),
    lessonIds.length > 0
      ? db.lessonProgress.findMany({ where: { userId, lessonId: { in: lessonIds } }, select: { lessonId: true, status: true } })
      : Promise.resolve([]),
    db.topicMastery.findMany({
      where: { userId, topicId: { in: [topic.id, ...childIds] } },
      select: {
        topicId: true,
        score: true,
        band: true,
        questionsAttempted: true,
        questionsCorrect: true,
        lastPracticedAt: true,
        nextReviewAt: true,
        remediationStartedAt: true,
      },
    }),
    countLessonsByTopic(childIds),
  ]);
  const lockedByPlan = lessons.filter((lesson) => !isLessonOpen(lesson.accessTier, entitlements.lessonAccess)).map((lesson) => lesson.id);
  const assigned = await liveLessonAssignments(userId, lockedByPlan, now);
  const progressByLesson = new Map(progressRows.map((row) => [row.lessonId, row]));
  const masteryByTopic = new Map(masteryRows.map((row) => [row.topicId, row]));

  const items: TopicLessonItem[] = lessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    summary: lesson.summary,
    kind: lesson.kind,
    estimatedMinutes: lesson.estimatedMinutes,
    accessTier: lesson.accessTier,
    locked: !isLessonOpen(lesson.accessTier, entitlements.lessonAccess, assigned.get(lesson.id)?.sponsored === true),
    state: lessonState(progressByLesson.get(lesson.id)),
    isDemo: lesson.isDemo,
  }));

  const own = masteryByTopic.get(topic.id);
  const mastery: TopicMasteryView | null =
    own && own.questionsAttempted > 0
      ? {
          score: own.score,
          band: own.band,
          questionsAttempted: own.questionsAttempted,
          questionsCorrect: own.questionsCorrect,
          lastPracticedAt: own.lastPracticedAt,
          retestDue: own.nextReviewAt !== null && own.nextReviewAt.getTime() <= now.getTime(),
          inRemediation: own.remediationStartedAt !== null,
        }
      : null;

  return {
    subject: { id: subject.id, name: subject.name, qualificationName: subject.qualification.shortName ?? subject.qualification.name },
    syllabus: {
      id: pinned.syllabus.id,
      title: pinned.syllabus.title,
      versionLabel: pinned.syllabus.versionLabel,
      status: pinned.syllabus.status,
      isDemo: pinned.syllabus.isDemo,
    },
    enrollmentStatus: pinned.enrollment.status,
    topic: {
      id: topic.id,
      name: topic.name,
      code: topic.code,
      kind: topic.kind,
      isOptional: topic.isOptional,
      estimatedStudyMinutes: topic.estimatedStudyMinutes,
      descriptionHtml: topic.description?.trim()
        ? renderContent(topic.description, { idPrefix: `t-${topic.id.slice(0, 8)}-`, baseHeadingLevel: 3 }).html
        : null,
    },
    ancestors: ancestors.map((a) => ({ id: a.id, name: a.name, code: a.code, kind: a.kind })),
    objectives: objectives.map((o) => ({ id: o.id, code: o.code, statement: o.statement })),
    mastery,
    subtopics: children.map((child) => {
      const row = masteryByTopic.get(child.id);
      const evidence = row !== undefined && row.questionsAttempted > 0;
      return {
        id: child.id,
        name: child.name,
        code: child.code,
        kind: child.kind,
        isOptional: child.isOptional,
        score: evidence ? row.score : null,
        band: evidence ? row.band : null,
        questionsAttempted: row?.questionsAttempted ?? 0,
        lessonCount: childLessonCounts.get(child.id) ?? 0,
      };
    }),
    lessons: items,
    lessonsFrom,
    lessonCounts: lessonListCounts(items),
    upgradePath: UPGRADE_PATH,
  };
}
