import type { ContentAccessTier, LessonKind, LessonProgressStatus, TopicKind } from "@/generated/prisma/enums";
import { buildTopicTree, flattenTopicTree } from "@/server/curriculum/core";
import { lessonState, type LessonState } from "./core";

/**
 * Pure rules of the COURSE view (a subject's published lessons in syllabus order, design brief "Learn"): how the
 * syllabus tree becomes a list of course topics ("units"), where each lesson sits, which lesson is "next", which course
 * the dashboard's "Continue learning" card opens, and whether the dashboard leads with exam preparation. No I/O: unit
 * tested in course-core.test.ts; ./course loads the rows and calls these.
 */

// =====================================================================================================================
// Course outline
// =====================================================================================================================

/** The Topic columns the outline needs (one syllabus version). */
export interface CourseTopicRow {
  id: string;
  parentId: string | null;
  kind: TopicKind;
  depth: number;
  path: string;
  sortOrder: number;
  code: string | null;
  name: string;
  isOptional: boolean;
}

/** A PUBLISHED lesson's tag on a topic node of the version (LessonTopic + the lesson's card fields). */
export interface CourseLessonTag {
  lessonId: string;
  topicId: string;
  isPrimary: boolean;
  sortOrder: number;
  title: string;
  kind: LessonKind;
  estimatedMinutes: number;
  accessTier: ContentAccessTier;
}

/** The student's LessonProgress row (no row = not started). */
export interface CourseProgressRow {
  lessonId: string;
  status: LessonProgressStatus;
  lastViewedAt: Date;
  completedAt: Date | null;
}

export interface CourseLesson {
  id: string;
  title: string;
  kind: LessonKind;
  estimatedMinutes: number;
  /** The topic node the lesson is read in (its `?topic=` context): the tag that placed it in the course. */
  topicId: string;
  /** The course topic (unit) the lesson belongs to. */
  unitId: string;
  /** Not covered by the student's access: the lesson page shows the upgrade prompt instead of the content. */
  locked: boolean;
  state: LessonState;
  lastViewedAt: Date | null;
  completedAt: Date | null;
}

/** A course topic: a TOPIC-level node of the syllabus (or a root node when the board has no TOPIC level there). */
export interface CourseUnit {
  id: string;
  name: string;
  code: string | null;
  kind: TopicKind;
  isOptional: boolean;
  /** The SECTION the topic sits in (a heading on the course page), when the board groups topics. */
  section: { id: string; name: string; code: string | null } | null;
  lessons: CourseLesson[];
  completed: number;
  total: number;
}

export interface CourseOutline {
  units: CourseUnit[];
  /** Every lesson once, in course order. */
  lessons: CourseLesson[];
  completed: number;
  total: number;
  /** Most recent lesson activity in the course (null = never opened a lesson of it). */
  lastActivityAt: Date | null;
}

const compareTitles = (a: string, b: string): number => a.localeCompare(b, "en");

/**
 * Builds the course outline of ONE syllabus version (module doc).
 *
 * - Units: every node that is not a SECTION and whose ancestors are all SECTIONs (i.e. the shallowest non-SECTION node
 *   on each path), in syllabus order. A lesson tagged to a SECTION itself gets that section as its unit.
 * - Placement: a lesson tagged to several nodes of the version appears once, at its primary tag when that tag is in
 *   the version, else at its earliest tag in syllabus order.
 * - Order inside a unit: syllabus order of the tagged node, then `LessonTopic.sortOrder`, then title.
 *
 * `isOpen` decides the lock state from the lesson's access tier (the caller binds the student's entitlements).
 */
export function buildCourseOutline(
  topics: readonly CourseTopicRow[],
  tags: readonly CourseLessonTag[],
  progress: readonly CourseProgressRow[],
  isOpen: (tier: ContentAccessTier) => boolean = () => true,
): CourseOutline {
  const ordered = flattenTopicTree(buildTopicTree(topics));
  const position = new Map<string, number>();
  ordered.forEach((node, index) => position.set(node.id, index));
  const byId = new Map(ordered.map((node) => [node.id, node]));

  // The unit and section of every node (parents come before children in pre-order).
  const unitOf = new Map<string, string>();
  const sectionOf = new Map<string, string | null>();
  for (const node of ordered) {
    const parentUnit = node.parentId ? unitOf.get(node.parentId) : undefined;
    const parentSection = node.parentId ? (sectionOf.get(node.parentId) ?? null) : null;
    if (parentUnit !== undefined) {
      unitOf.set(node.id, parentUnit);
      sectionOf.set(node.id, parentSection);
    } else if (node.kind === "SECTION") {
      // A section is its own unit only for lessons tagged to it directly (see below); its children start new units.
      sectionOf.set(node.id, node.id);
    } else {
      unitOf.set(node.id, node.id);
      sectionOf.set(node.id, parentSection);
    }
  }
  const unitFor = (topicId: string): string | undefined => unitOf.get(topicId) ?? (byId.get(topicId)?.kind === "SECTION" ? topicId : undefined);

  // One placement per lesson.
  const placed = new Map<string, CourseLessonTag>();
  for (const tag of tags) {
    if (!position.has(tag.topicId)) continue; // a tag on another version's node
    const current = placed.get(tag.lessonId);
    if (!current) {
      placed.set(tag.lessonId, tag);
      continue;
    }
    const better =
      (tag.isPrimary && !current.isPrimary) ||
      (tag.isPrimary === current.isPrimary && (position.get(tag.topicId) ?? 0) < (position.get(current.topicId) ?? 0));
    if (better) placed.set(tag.lessonId, tag);
  }

  const progressByLesson = new Map(progress.map((row) => [row.lessonId, row]));
  const lessons = [...placed.values()]
    .sort(
      (a, b) =>
        (position.get(a.topicId) ?? 0) - (position.get(b.topicId) ?? 0) ||
        a.sortOrder - b.sortOrder ||
        compareTitles(a.title, b.title) ||
        (a.lessonId < b.lessonId ? -1 : a.lessonId > b.lessonId ? 1 : 0),
    )
    .flatMap((tag): CourseLesson[] => {
      const unitId = unitFor(tag.topicId);
      if (unitId === undefined) return [];
      const row = progressByLesson.get(tag.lessonId);
      return [
        {
          id: tag.lessonId,
          title: tag.title,
          kind: tag.kind,
          estimatedMinutes: tag.estimatedMinutes,
          topicId: tag.topicId,
          unitId,
          locked: !isOpen(tag.accessTier),
          state: lessonState(row),
          lastViewedAt: row?.lastViewedAt ?? null,
          completedAt: row?.completedAt ?? null,
        },
      ];
    });

  const lessonsByUnit = new Map<string, CourseLesson[]>();
  for (const lesson of lessons) lessonsByUnit.set(lesson.unitId, [...(lessonsByUnit.get(lesson.unitId) ?? []), lesson]);

  const units: CourseUnit[] = [];
  for (const node of ordered) {
    const isUnit = unitOf.get(node.id) === node.id || (node.kind === "SECTION" && lessonsByUnit.has(node.id));
    if (!isUnit) continue;
    const unitLessons = lessonsByUnit.get(node.id) ?? [];
    const sectionId = node.kind === "SECTION" ? null : (sectionOf.get(node.id) ?? null);
    const section = sectionId ? byId.get(sectionId) : undefined;
    units.push({
      id: node.id,
      name: node.name,
      code: node.code,
      kind: node.kind,
      isOptional: node.isOptional,
      section: section ? { id: section.id, name: section.name, code: section.code } : null,
      lessons: unitLessons,
      completed: unitLessons.filter((lesson) => lesson.state === "COMPLETED").length,
      total: unitLessons.length,
    });
  }

  let lastActivityAt: Date | null = null;
  for (const lesson of lessons) {
    if (lesson.lastViewedAt && (!lastActivityAt || lesson.lastViewedAt > lastActivityAt)) lastActivityAt = lesson.lastViewedAt;
  }

  return {
    units,
    lessons,
    completed: lessons.filter((lesson) => lesson.state === "COMPLETED").length,
    total: lessons.length,
    lastActivityAt,
  };
}

// =====================================================================================================================
// Next lesson
// =====================================================================================================================

/** Why a lesson is offered: pick up a lesson already started, move on after the last one finished, or begin. */
export type NextLessonReason = "RESUME" | "NEXT" | "START";

export interface NextLessonPick<T> {
  lesson: T;
  reason: NextLessonReason;
}

/** The lesson fields {@link pickNextLesson} reads. */
export interface NextLessonCandidate {
  id: string;
  state: LessonState;
  locked: boolean;
  lastViewedAt: Date | null;
  completedAt: Date | null;
}

const time = (date: Date | null): number => (date ? date.getTime() : Number.NEGATIVE_INFINITY);

/**
 * The lesson a "Continue" button opens, from the course's lessons in course order (pure):
 *
 * 1. nothing opened yet: the first lesson (START);
 * 2. everything completed: null (the course is finished);
 * 3. the most recent activity was on an unfinished lesson: that lesson (RESUME);
 * 4. otherwise the first unfinished lesson after the most recently completed one, wrapping to the first unfinished
 *    lesson of the course (NEXT).
 *
 * Open lessons are preferred over locked ones at every step; a locked lesson is offered only when no open lesson
 * qualifies (its page then explains how to unlock it).
 */
export function pickNextLesson<T extends NextLessonCandidate>(lessons: readonly T[]): NextLessonPick<T> | null {
  if (lessons.length === 0) return null;
  const unfinished = lessons.filter((lesson) => lesson.state !== "COMPLETED");
  if (unfinished.length === 0) return null;
  const preferOpen = (list: readonly T[]): T | undefined => list.find((lesson) => !lesson.locked) ?? list[0];

  const touched = lessons.some((lesson) => lesson.state !== "NOT_STARTED");
  if (!touched) {
    const first = preferOpen(lessons);
    return first ? { lesson: first, reason: "START" } : null;
  }

  let latestStarted: T | null = null;
  for (const lesson of lessons) {
    if (lesson.state !== "IN_PROGRESS") continue;
    if (!latestStarted || time(lesson.lastViewedAt) > time(latestStarted.lastViewedAt)) latestStarted = lesson;
  }
  let latestCompletedIndex = -1;
  let latestCompletedAt = Number.NEGATIVE_INFINITY;
  lessons.forEach((lesson, index) => {
    if (lesson.state !== "COMPLETED") return;
    const at = Math.max(time(lesson.completedAt), time(lesson.lastViewedAt));
    if (at > latestCompletedAt) {
      latestCompletedAt = at;
      latestCompletedIndex = index;
    }
  });

  if (latestStarted && (latestCompletedIndex < 0 || time(latestStarted.lastViewedAt) >= latestCompletedAt) && !latestStarted.locked) {
    return { lesson: latestStarted, reason: "RESUME" };
  }
  const after = lessons.slice(latestCompletedIndex + 1).filter((lesson) => lesson.state !== "COMPLETED");
  const open = after.find((lesson) => !lesson.locked) ?? unfinished.find((lesson) => !lesson.locked);
  const chosen = open ?? latestStarted ?? after[0] ?? unfinished[0];
  if (!chosen) return null;
  return { lesson: chosen, reason: chosen.state === "IN_PROGRESS" ? "RESUME" : "NEXT" };
}

/** The lesson after `lessonId` in course order (crossing into the next unit), or null at the end / when not found. */
export function nextInCourse<T extends { id: string }>(lessons: readonly T[], lessonId: string): T | null {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  return index < 0 ? null : (lessons[index + 1] ?? null);
}

// =====================================================================================================================
// Continue learning (dashboard)
// =====================================================================================================================

export interface ContinueCandidate {
  subjectId: string;
  lastActivityAt: Date | null;
  hasNext: boolean;
}

/**
 * The course the dashboard's "Continue learning" card opens (pure): among courses that still have a lesson to offer,
 * the one with the most recent lesson activity; without any activity, the first such course in library order. Null
 * when no course has a lesson to offer (no published lessons yet, or everything completed).
 */
export function pickContinueCourse<T extends ContinueCandidate>(courses: readonly T[]): T | null {
  const candidates = courses.filter((course) => course.hasNext);
  let best: T | null = null;
  for (const course of candidates) {
    if (course.lastActivityAt && (!best || !best.lastActivityAt || course.lastActivityAt > best.lastActivityAt)) best = course;
  }
  return best ?? candidates[0] ?? null;
}

// =====================================================================================================================
// Exam focus (dashboard)
// =====================================================================================================================

/** About ten months: inside this window the dashboard leads with exam preparation. */
export const EXAM_PREP_WINDOW_DAYS = 304;

/**
 * Whether a year group is the final (examination) year of its level: the highest ordinal among the active year groups
 * of the country that share its typical qualification level (Form 4 for O-Level, Upper Sixth for A-Level in the
 * Zimbabwe catalogue). Data-driven: no year-group names in code. False without a level.
 */
export function isExamYear(
  yearGroup: { id: string; ordinal: number; typicalLevelId: string | null } | null,
  siblings: readonly { id: string; ordinal: number; typicalLevelId: string | null }[],
): boolean {
  if (!yearGroup || yearGroup.typicalLevelId === null) return false;
  const sameLevel = siblings.filter((group) => group.typicalLevelId === yearGroup.typicalLevelId);
  const highest = Math.max(yearGroup.ordinal, ...sameLevel.map((group) => group.ordinal));
  return yearGroup.ordinal === highest;
}

/**
 * How the dashboard treats the exam (pure): PREPARE (the full exam-preparation panel) when the target session is
 * within {@link EXAM_PREP_WINDOW_DAYS} days or already under way, or when the student is in their exam year; LIGHT (one
 * line, "Your exam is in N months") for a later session; NONE without a session outside the exam year.
 */
export function examFocus(input: { daysUntil: number | null; examYear: boolean }): "PREPARE" | "LIGHT" | "NONE" {
  if (input.examYear) return "PREPARE";
  if (input.daysUntil === null) return "NONE";
  return input.daysUntil <= EXAM_PREP_WINDOW_DAYS ? "PREPARE" : "LIGHT";
}

/** Whole months in a number of days (30.44-day months, never below 1 for a future date): "in 11 months". */
export function monthsUntil(days: number): number {
  if (days <= 0) return 0;
  return Math.max(1, Math.floor(days / 30.44));
}
