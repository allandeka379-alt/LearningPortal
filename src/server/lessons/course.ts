import "server-only";
import type { EnrollmentStatus, StudyActivityType, StudyPlanItemReason, StudyPlanItemStatus } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE, addDays, dateColumnFromLocalDate, isValidTimeZone, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { getSubjectEntitlements } from "@/server/billing/entitlements";
import { PUBLISHED_SYLLABUS_STATUSES } from "@/server/curriculum/core";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { assertStudent, lessonIdSchema, type LessonActor } from "./access";
import { isLessonOpen } from "./core";
import {
  buildCourseOutline,
  isExamYear,
  nextInCourse,
  pickContinueCourse,
  pickNextLesson,
  type CourseLesson,
  type CourseOutline,
  type CourseUnit,
  type NextLessonReason,
} from "./course-core";

/**
 * Courses (design brief "Learn"): each enrolled subject is a course made of its PUBLISHED lessons in the order of the
 * student's PINNED syllabus version (§26), grouped by syllabus topic, with the student's completion state and the
 * lesson a "Continue" button opens. Read models only; the rules live in ./course-core (pure, unit tested).
 *
 * - {@link listCourses}: the course library (/app/subjects): every ACTIVE / PAUSED enrolment.
 * - {@link getCourse}: one course page (/app/subjects/[subjectId]): topics in syllabus order with their lessons.
 * - {@link getLessonCourseContext}: the lesson page's "Next steps" (progress in the course topic, next lesson).
 * - {@link getLearningHome}: the dashboard's greeting facts (form, qualification), "Continue learning" and the week's
 *   study-plan items.
 *
 * Query budget: a fixed number of batched queries per call whatever the number of subjects (enrolments, topics of all
 * pinned versions, lesson tags, the student's progress rows, plus per-request cached entitlements). Lessons are
 * PUBLISHED live rows only (never draft copies, CLAUDE.md rule 7).
 */

export interface NextLessonView {
  id: string;
  title: string;
  /** `?topic=` context for the lesson link. */
  topicId: string;
  unitName: string;
  estimatedMinutes: number;
  locked: boolean;
  reason: NextLessonReason;
}

export interface CourseSummary {
  subjectId: string;
  name: string;
  /** "ZIMSEC Ordinary Level" */
  qualificationName: string;
  /** "ZIMSEC" */
  boardName: string;
  status: EnrollmentStatus;
  syllabus: { id: string; title: string; versionLabel: string };
  /** Published lessons in the pinned version. */
  totalLessons: number;
  completedLessons: number;
  /** Course topics (syllabus topics) and how many of them have published lessons. */
  unitsTotal: number;
  unitsWithLessons: number;
  lastActivityAt: Date | null;
  /** Null when there is nothing to offer: no published lessons yet, or every lesson completed. */
  next: NextLessonView | null;
}

export interface CourseView extends CourseSummary {
  units: CourseUnit[];
  /** Published platform topic tests / mock exams for this course (exams catalogue counts). */
  assessments: { topicTests: number; mockExams: number };
}

export interface LessonCourseContext {
  /** The course topic the lesson belongs to, with progress over its lessons. */
  unit: { id: string; name: string; completed: number; total: number; position: number } | null;
  /** The lesson after this one in the course (it may start the next course topic). */
  next: { id: string; title: string; topicId: string; unitName: string; locked: boolean; newUnit: boolean } | null;
  course: { completed: number; total: number };
}

interface EnrollmentRow {
  subjectId: string;
  syllabusId: string;
  routeId: string | null;
  status: EnrollmentStatus;
  subject: { name: string; qualification: { name: string; examBoard: { shortName: string } } };
  syllabus: { id: string; title: string; versionLabel: string };
}

const ENROLLMENT_SELECT = {
  subjectId: true,
  syllabusId: true,
  routeId: true,
  status: true,
  subject: { select: { name: true, qualification: { select: { name: true, examBoard: { select: { shortName: true } } } } } },
  syllabus: { select: { id: true, title: true, versionLabel: true } },
} as const;

/**
 * Course outlines for a set of enrolments: 3 batched queries (topics, published lesson tags, the student's lesson
 * progress) + the student's per-subject entitlements (cached per request).
 */
async function loadOutlines(userId: string, enrollments: readonly EnrollmentRow[]): Promise<Map<string, CourseOutline>> {
  if (enrollments.length === 0) return new Map();
  const syllabusIds = [...new Set(enrollments.map((e) => e.syllabusId))];
  const [topics, tags, progress, entitlements] = await Promise.all([
    db.topic.findMany({
      where: { syllabusId: { in: syllabusIds }, syllabus: { status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } } },
      select: { id: true, syllabusId: true, parentId: true, kind: true, depth: true, path: true, sortOrder: true, code: true, name: true, isOptional: true },
    }),
    db.lessonTopic.findMany({
      where: { topic: { syllabusId: { in: syllabusIds } }, lesson: { status: "PUBLISHED", draftOfId: null } },
      select: {
        lessonId: true,
        topicId: true,
        isPrimary: true,
        sortOrder: true,
        topic: { select: { syllabusId: true } },
        lesson: { select: { title: true, kind: true, estimatedMinutes: true, accessTier: true } },
      },
    }),
    // A student's progress rows are the lessons they opened: few, and keyed by (userId, lessonId).
    db.lessonProgress.findMany({ where: { userId }, select: { lessonId: true, status: true, lastViewedAt: true, completedAt: true } }),
    Promise.all(enrollments.map((e) => getSubjectEntitlements(userId, e.subjectId, { syllabusId: e.syllabusId }).then((ent) => [e.subjectId, ent.lessonAccess] as const))),
  ]);
  const access = new Map(entitlements);

  const topicsBySyllabus = new Map<string, typeof topics>();
  for (const row of topics) topicsBySyllabus.set(row.syllabusId, [...(topicsBySyllabus.get(row.syllabusId) ?? []), row]);
  const tagsBySyllabus = new Map<string, typeof tags>();
  for (const row of tags) tagsBySyllabus.set(row.topic.syllabusId, [...(tagsBySyllabus.get(row.topic.syllabusId) ?? []), row]);

  const out = new Map<string, CourseOutline>();
  for (const enrollment of enrollments) {
    const lessonAccess = access.get(enrollment.subjectId) ?? "FREE_ONLY";
    out.set(
      enrollment.subjectId,
      buildCourseOutline(
        topicsBySyllabus.get(enrollment.syllabusId) ?? [],
        (tagsBySyllabus.get(enrollment.syllabusId) ?? []).map((row) => ({
          lessonId: row.lessonId,
          topicId: row.topicId,
          isPrimary: row.isPrimary,
          sortOrder: row.sortOrder,
          title: row.lesson.title,
          kind: row.lesson.kind,
          estimatedMinutes: row.lesson.estimatedMinutes,
          accessTier: row.lesson.accessTier,
        })),
        progress,
        (tier) => isLessonOpen(tier, lessonAccess),
      ),
    );
  }
  return out;
}

function nextView(outline: CourseOutline): NextLessonView | null {
  const pick = pickNextLesson(outline.lessons);
  if (!pick) return null;
  const unit = outline.units.find((u) => u.id === pick.lesson.unitId);
  return {
    id: pick.lesson.id,
    title: pick.lesson.title,
    topicId: pick.lesson.topicId,
    unitName: unit?.name ?? "",
    estimatedMinutes: pick.lesson.estimatedMinutes,
    locked: pick.lesson.locked,
    reason: pick.reason,
  };
}

function summarise(enrollment: EnrollmentRow, outline: CourseOutline): CourseSummary {
  return {
    subjectId: enrollment.subjectId,
    name: enrollment.subject.name,
    qualificationName: enrollment.subject.qualification.name,
    boardName: enrollment.subject.qualification.examBoard.shortName,
    status: enrollment.status,
    syllabus: enrollment.syllabus,
    totalLessons: outline.total,
    completedLessons: outline.completed,
    unitsTotal: outline.units.length,
    unitsWithLessons: outline.units.filter((unit) => unit.total > 0).length,
    lastActivityAt: outline.lastActivityAt,
    next: nextView(outline),
  };
}

/** The course library: every ACTIVE / PAUSED enrolment in subject order. @throws AppError FORBIDDEN | UNAUTHENTICATED */
export async function listCourses(actor: LessonActor): Promise<CourseSummary[]> {
  assertStudent(actor);
  const enrollments = await db.subjectEnrollment.findMany({
    where: { userId: actor.userId, status: { in: ["ACTIVE", "PAUSED"] } },
    orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
    select: ENROLLMENT_SELECT,
  });
  const outlines = await loadOutlines(actor.userId, enrollments);
  return enrollments.map((e) => summarise(e, outlines.get(e.subjectId) ?? emptyOutline()));
}

function emptyOutline(): CourseOutline {
  return { units: [], lessons: [], completed: 0, total: 0, lastActivityAt: null };
}

/**
 * One course (any enrolment status, so a dropped subject's page still shows what was done).
 *
 * @throws AppError NOT_FOUND (not enrolled) | FORBIDDEN | UNAUTHENTICATED
 */
export async function getCourse(actor: LessonActor, subjectId: string): Promise<CourseView> {
  assertStudent(actor);
  if (!lessonIdSchema.safeParse(subjectId).success) throw AppError.notFound("Course not found.");
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: actor.userId, subjectId } },
    select: ENROLLMENT_SELECT,
  });
  if (!enrollment) throw AppError.notFound("You're not enrolled in this subject.");

  const [outlines, assessmentCounts] = await Promise.all([
    loadOutlines(actor.userId, [enrollment]),
    db.assessment.groupBy({
      by: ["kind"],
      where: {
        subjectId,
        kind: { in: ["TOPIC_TEST", "MOCK_EXAM"] },
        status: "PUBLISHED",
        draftOfId: null,
        schoolId: null,
        ownerUserId: null,
        AND: [
          { OR: [{ syllabusId: null }, { syllabusId: enrollment.syllabusId }] },
          { OR: [{ routeId: null }, ...(enrollment.routeId ? [{ routeId: enrollment.routeId }] : [])] },
        ],
      },
      _count: { _all: true },
    }),
  ]);
  const outline = outlines.get(subjectId) ?? emptyOutline();
  const count = (kind: string) => assessmentCounts.find((row) => row.kind === kind)?._count._all ?? 0;
  return {
    ...summarise(enrollment, outline),
    units: outline.units,
    assessments: { topicTests: count("TOPIC_TEST"), mockExams: count("MOCK_EXAM") },
  };
}

/**
 * Where a lesson sits in the student's course: its course topic with progress, and the next lesson in course order.
 * Null when the student is not enrolled in the subject (e.g. a lesson opened through a teacher assignment) or the lesson
 * is not part of the pinned version.
 */
export async function getLessonCourseContext(actor: LessonActor, subjectId: string, lessonId: string): Promise<LessonCourseContext | null> {
  assertStudent(actor);
  if (!lessonIdSchema.safeParse(subjectId).success || !lessonIdSchema.safeParse(lessonId).success) return null;
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: actor.userId, subjectId } },
    select: ENROLLMENT_SELECT,
  });
  if (!enrollment) return null;
  const outline = (await loadOutlines(actor.userId, [enrollment])).get(subjectId);
  const current = outline?.lessons.find((lesson) => lesson.id === lessonId);
  if (!outline || !current) return null;
  const unit = outline.units.find((u) => u.id === current.unitId) ?? null;
  const following: CourseLesson | null = nextInCourse(outline.lessons, lessonId);
  const followingUnit = following ? outline.units.find((u) => u.id === following.unitId) : undefined;
  return {
    unit: unit
      ? { id: unit.id, name: unit.name, completed: unit.completed, total: unit.total, position: unit.lessons.findIndex((l) => l.id === lessonId) + 1 }
      : null,
    next: following
      ? {
          id: following.id,
          title: following.title,
          topicId: following.topicId,
          unitName: followingUnit?.name ?? "",
          locked: following.locked,
          newUnit: following.unitId !== current.unitId,
        }
      : null,
    course: { completed: outline.completed, total: outline.total },
  };
}

// =====================================================================================================================
// Dashboard
// =====================================================================================================================

export interface WeekPlanItem {
  id: string;
  date: LocalDate;
  subjectId: string;
  subjectName: string;
  topicId: string | null;
  topicName: string | null;
  lessonId: string | null;
  lessonTitle: string | null;
  assessmentId: string | null;
  assessmentTitle: string | null;
  activityType: StudyActivityType;
  reason: StudyPlanItemReason;
  targetMinutes: number;
  targetQuestions: number | null;
  status: StudyPlanItemStatus;
}

export interface LearningHome {
  learner: {
    firstName: string | null;
    /** "Form 4", "Lower Sixth (Form 5)": the YearGroup name from onboarding. */
    yearGroupName: string | null;
    /** The final year of the student's level (Form 4, Upper Sixth), from the data. */
    examYear: boolean;
    /** "ZIMSEC Ordinary Level" */
    qualificationName: string | null;
  };
  courses: CourseSummary[];
  /** The course and lesson the "Continue learning" card opens. */
  continueLearning: { course: CourseSummary; lesson: NextLessonView } | null;
  /** Null without an active study plan; otherwise the plan's items from today for 7 days (may be empty). */
  week: { from: LocalDate; to: LocalDate; items: WeekPlanItem[] } | null;
}

/** Plan items listed in "This week" (a busy plan has a few per day). */
const WEEK_ITEM_LIMIT = 28;

/** Dashboard learning facts (module doc). @throws AppError FORBIDDEN | UNAUTHENTICATED */
export async function getLearningHome(actor: LessonActor, now: Date = new Date()): Promise<LearningHome> {
  assertStudent(actor);
  const userId = actor.userId;
  const [student, profile, courses, plan] = await Promise.all([
    db.student.findUnique({
      where: { userId },
      select: {
        qualification: { select: { name: true } },
        yearGroup: { select: { id: true, name: true, ordinal: true, typicalLevelId: true, countryId: true } },
      },
    }),
    db.profile.findUnique({ where: { userId }, select: { firstName: true, displayName: true, timezone: true } }),
    listCourses(actor),
    db.studyPlan.findFirst({ where: { userId, status: "ACTIVE" }, select: { id: true } }),
  ]);
  const zone = actor.timeZone && isValidTimeZone(actor.timeZone) ? actor.timeZone : profile?.timezone && isValidTimeZone(profile.timezone) ? profile.timezone : DEFAULT_TIMEZONE;
  const today = localDateString(now, zone);
  const to = addDays(today, 6);

  const yearGroup = student?.yearGroup ?? null;
  const [siblings, items] = await Promise.all([
    yearGroup?.typicalLevelId
      ? db.yearGroup.findMany({
          where: { countryId: yearGroup.countryId, typicalLevelId: yearGroup.typicalLevelId, isActive: true },
          select: { id: true, ordinal: true, typicalLevelId: true },
        })
      : Promise.resolve([]),
    plan
      ? db.studyPlanItem.findMany({
          where: { planId: plan.id, userId, date: { gte: dateColumnFromLocalDate(today), lte: dateColumnFromLocalDate(to) } },
          orderBy: [{ date: "asc" }, { sortOrder: "asc" }],
          take: WEEK_ITEM_LIMIT,
          select: {
            id: true,
            date: true,
            subjectId: true,
            topicId: true,
            lessonId: true,
            assessmentId: true,
            activityType: true,
            reason: true,
            targetMinutes: true,
            targetQuestions: true,
            status: true,
            subject: { select: { name: true } },
            topic: { select: { name: true } },
            lesson: { select: { title: true } },
            assessment: { select: { title: true } },
          },
        })
      : Promise.resolve([]),
  ]);

  const chosen = pickContinueCourse(courses.map((course) => ({ ...course, hasNext: course.next !== null })));
  const firstName = profile?.firstName?.trim() || profile?.displayName?.trim().split(/\s+/)[0] || null;

  return {
    learner: {
      firstName,
      yearGroupName: yearGroup?.name ?? null,
      examYear: isExamYear(yearGroup, siblings),
      qualificationName: student?.qualification?.name ?? null,
    },
    courses,
    continueLearning: chosen?.next ? { course: courses.find((c) => c.subjectId === chosen.subjectId) ?? chosen, lesson: chosen.next } : null,
    week: plan
      ? {
          from: today,
          to,
          items: items.map((item) => ({
            id: item.id,
            date: localDateFromDateColumn(item.date),
            subjectId: item.subjectId,
            subjectName: item.subject.name,
            topicId: item.topicId,
            topicName: item.topic?.name ?? null,
            lessonId: item.lessonId,
            lessonTitle: item.lesson?.title ?? null,
            assessmentId: item.assessmentId,
            assessmentTitle: item.assessment?.title ?? null,
            activityType: item.activityType,
            reason: item.reason,
            targetMinutes: item.targetMinutes,
            targetQuestions: item.targetQuestions,
            status: item.status,
          })),
        }
      : null,
  };
}

export type { CourseLesson, CourseUnit };
