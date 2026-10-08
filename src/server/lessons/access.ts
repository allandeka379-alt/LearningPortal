import "server-only";
import { z } from "zod";
import type { ContentAccessTier, EnrollmentStatus, Prisma, Role, TopicKind } from "@/generated/prisma/client";
import type { Entitlements } from "@/lib/billing/entitlements";
import { DEFAULT_TIMEZONE, isValidTimeZone } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { assignmentWorkSponsored, getSubjectEntitlements } from "@/server/billing/entitlements";
import { PUBLISHED_SYLLABUS_STATUSES } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { isLessonOpen, pickContextTag } from "./core";

/**
 * Who may read a lesson, and in which topic (§8, §26, §31). Shared by the reader, progress tracking and the lesson's
 * practice questions so all three apply the same rules:
 *
 * 1. the lesson is a PUBLISHED live row (never a draft copy, CLAUDE.md rule 7);
 * 2. it is tagged to a topic of a syllabus version the student is PINNED to (§26: a student on an older version reads
 *    the lessons of that version), or a teacher assigned it to the student (§22);
 * 3. PREMIUM lessons need full lesson access in that subject (plan, school seat or a study pack covering it), unless
 *    assigned by a class whose tenant sponsors assignment work (`assignmentWorkSponsored`: a school with a live school
 *    plan or a paying tutor; a free tutor's assignment never unlocks paid content). A locked lesson is still "found":
 *    the caller shows an upgrade prompt and never the content.
 */

/** The acting learner (structurally satisfied by the auth Actor and the attempt engine's LearnerActor). */
export interface LessonActor {
  userId: string;
  roles: readonly Role[];
  timeZone?: string;
  channel?: "web" | "api" | "whatsapp";
}

export const lessonIdSchema = z.uuid();

const PUBLISHED_STATUSES: ReadonlySet<string> = new Set(PUBLISHED_SYLLABUS_STATUSES);

/** Throws unless the actor is a student (the `learn.study` permission at scope "all"). */
export function assertStudent(actor: LessonActor): void {
  if (!z.uuid().safeParse(actor.userId).success) throw AppError.unauthenticated();
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) throw AppError.forbidden("Only students can open lessons here.");
}

/** The student's IANA time zone (actor first, then Profile, then the platform default). */
export async function timeZoneOf(actor: LessonActor, client: DbClient = db): Promise<string> {
  if (actor.timeZone && isValidTimeZone(actor.timeZone)) return actor.timeZone;
  const profile = await client.profile.findUnique({ where: { userId: actor.userId }, select: { timezone: true } });
  return profile?.timezone && isValidTimeZone(profile.timezone) ? profile.timezone : DEFAULT_TIMEZONE;
}

/** Lesson columns every lesson service needs (no body: the reader loads it separately, only when open). */
export const LESSON_ACCESS_SELECT = {
  id: true,
  subjectId: true,
  kind: true,
  title: true,
  summary: true,
  estimatedMinutes: true,
  accessTier: true,
  languageCode: true,
  revision: true,
  isDemo: true,
  topics: {
    select: {
      topicId: true,
      isPrimary: true,
      sortOrder: true,
      topic: { select: { syllabusId: true, name: true, code: true, kind: true, syllabus: { select: { subjectId: true, status: true } } } },
    },
  },
} as const satisfies Prisma.LessonSelect;

type LessonAccessRow = Prisma.LessonGetPayload<{ select: typeof LESSON_ACCESS_SELECT }>;

export interface LessonContextTopic {
  id: string;
  name: string;
  code: string | null;
  kind: TopicKind;
  syllabusId: string;
}

export interface LessonAccess {
  lesson: Omit<LessonAccessRow, "topics">;
  /** Subject the lesson is read in (the enrolment's, or the assignment's). */
  subjectId: string;
  /** Syllabus version of the context topic (the pinned one when enrolled). */
  syllabusId: string;
  topic: LessonContextTopic;
  /** Null when the lesson is reachable only through an assignment in a subject the student is not enrolled in. */
  enrollmentStatus: EnrollmentStatus | null;
  /** A live teacher assignment of this lesson to the student (sponsored or not). */
  assigned: boolean;
  /** False: show the upgrade prompt, never the content. */
  open: boolean;
  accessTier: ContentAccessTier;
  /** The student's lesson access in this subject (decides the lock state of the topic's other lessons). */
  lessonAccess: Entitlements["lessonAccess"];
}

/** A live lesson assignment: the assignment's subject, and whether the class's tenant sponsors it (opens PREMIUM). */
export interface LiveLessonAssignment {
  subjectId: string;
  sponsored: boolean;
}

/**
 * Live LESSON assignments of `lessonIds` to the student (published, not closed): lesson id -> its assignment. A lesson
 * assigned more than once is sponsored when any of its assignments is.
 */
export async function liveLessonAssignments(
  userId: string,
  lessonIds: readonly string[],
  now: Date = new Date(),
  client: DbClient = db,
): Promise<Map<string, LiveLessonAssignment>> {
  if (lessonIds.length === 0) return new Map();
  const rows = await client.assignmentProgress.findMany({
    where: {
      userId,
      assignment: {
        type: "LESSON",
        lessonId: { in: [...lessonIds] },
        status: "PUBLISHED",
        publishedAt: { lte: now },
        OR: [{ closesAt: null }, { closesAt: { gt: now } }],
      },
    },
    select: { assignment: { select: { lessonId: true, subjectId: true, class: { select: { schoolId: true, createdById: true } } } } },
  });
  // One sponsorship check per distinct class tenant (cached per instance).
  const sponsoredByTenant = new Map<string, Promise<boolean>>();
  const sponsoredFor = (tenant: { schoolId: string | null; createdById: string }): Promise<boolean> => {
    const key = tenant.schoolId ?? `tutor:${tenant.createdById}`;
    let pending = sponsoredByTenant.get(key);
    if (!pending) {
      pending = assignmentWorkSponsored(tenant);
      sponsoredByTenant.set(key, pending);
    }
    return pending;
  };
  const out = new Map<string, LiveLessonAssignment>();
  for (const row of rows) {
    const lessonId = row.assignment.lessonId;
    if (!lessonId) continue;
    const sponsored = await sponsoredFor(row.assignment.class);
    const seen = out.get(lessonId);
    if (!seen) out.set(lessonId, { subjectId: row.assignment.subjectId, sponsored });
    else if (sponsored && !seen.sponsored) seen.sponsored = true;
  }
  return out;
}

export interface ResolveLessonOptions {
  /** Read the lesson in this topic when it is tagged there (topic page links pass it). */
  topicId?: string | null;
  now?: Date;
  client?: DbClient;
}

/**
 * Resolves a lesson for a student (module doc). Locked lessons resolve with `open: false`.
 *
 * @throws AppError NOT_FOUND (unknown, unpublished, or not in the student's pinned syllabus) | FORBIDDEN | UNAUTHENTICATED
 */
export async function resolveLessonAccess(actor: LessonActor, lessonId: string, options: ResolveLessonOptions = {}): Promise<LessonAccess> {
  assertStudent(actor);
  if (!lessonIdSchema.safeParse(lessonId).success) throw AppError.notFound("Lesson not found.");
  const client = options.client ?? db;
  const now = options.now ?? new Date();
  const preferredTopicId = options.topicId && lessonIdSchema.safeParse(options.topicId).success ? options.topicId : null;

  const row = await client.lesson.findFirst({
    where: { id: lessonId, status: "PUBLISHED", draftOfId: null },
    select: LESSON_ACCESS_SELECT,
  });
  if (!row) throw AppError.notFound("Lesson not found.");
  const { topics: tags, ...lesson } = row;

  const syllabusIds = [...new Set(tags.map((tag) => tag.topic.syllabusId))];
  const enrollments =
    syllabusIds.length > 0
      ? await client.subjectEnrollment.findMany({
          where: { userId: actor.userId, syllabusId: { in: syllabusIds } },
          select: { subjectId: true, syllabusId: true, status: true },
        })
      : [];
  const pinned = new Map(enrollments.map((e) => [e.syllabusId, e]));
  const candidates = tags.filter((tag) => pinned.has(tag.topic.syllabusId));

  let chosen = pickContextTag(candidates, preferredTopicId);
  const assignment = (await liveLessonAssignments(actor.userId, [lesson.id], now, client)).get(lesson.id) ?? null;
  if (!chosen) {
    // Not in a pinned version: readable only as assigned work, in a published version of the assignment's subject
    // when the lesson is tagged there (§22). Draft versions are never shown to students.
    if (assignment === null) throw AppError.notFound("This lesson isn't part of your syllabus.");
    const published = tags.filter((tag) => PUBLISHED_STATUSES.has(tag.topic.syllabus.status));
    const inSubject = published.filter((tag) => tag.topic.syllabus.subjectId === assignment.subjectId);
    chosen = pickContextTag(inSubject.length > 0 ? inSubject : published, preferredTopicId);
    if (!chosen) throw AppError.notFound("This lesson isn't part of your syllabus.");
  }

  const enrollment = pinned.get(chosen.topic.syllabusId) ?? null;
  const subjectId = enrollment?.subjectId ?? chosen.topic.syllabus.subjectId;
  const syllabusId = chosen.topic.syllabusId;
  const { lessonAccess } = await getSubjectEntitlements(actor.userId, subjectId, { syllabusId });

  return {
    lesson,
    subjectId,
    syllabusId,
    topic: { id: chosen.topicId, name: chosen.topic.name, code: chosen.topic.code, kind: chosen.topic.kind, syllabusId },
    enrollmentStatus: enrollment?.status ?? null,
    assigned: assignment !== null,
    open: isLessonOpen(lesson.accessTier, lessonAccess, assignment?.sponsored === true),
    accessTier: lesson.accessTier,
    lessonAccess,
  };
}
