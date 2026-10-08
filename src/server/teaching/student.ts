import "server-only";
import type { AssessmentKind, AssignmentStatus, AssignmentType, AttemptMode, ClassMemberStatus } from "@/generated/prisma/client";
import type { SanitizedHtml } from "@/lib/content/types";
import { attemptResultsHref, startAttempt, type LearnerActor } from "@/server/attempts";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { trustPersistedHtml } from "@/server/content/render";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { createNotification } from "@/server/notifications";
import { isOperatingSchool, isUuid } from "./access";
import { attemptWorkHref, isVisibleToStudents, normalizeJoinCode, rosterName, studentAssignmentView, type StudentAssignmentView } from "./core";
import { assertConsentAllowsClass, currentMembership, requireStudentAccount, upsertMembership } from "./membership";
import { assignmentRefSchema, classRefSchema, joinCodeInputSchema } from "./schemas";
import { parseWith } from "./validation";

/**
 * The student's side of classes (/app/classes, §22): join with a code, the classes they belong to, the work set to
 * them with due dates and late flags, class announcements, starting assigned work, and leaving a class.
 *
 * A student only ever sees classes where they are a member and work assigned to them (an AssignmentProgress row) in
 * classes they are still ACTIVE in. Leaving a class is the student's way to stop sharing their learning data with
 * its teachers (the teacher views require an ACTIVE membership).
 */

const NAME = { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } as const;

function classIsReachable(cls: { archivedAt: Date | null; schoolId: string | null; school: { status: Parameters<typeof isOperatingSchool>[0] } | null }): boolean {
  return cls.archivedAt === null && (cls.schoolId === null || isOperatingSchool(cls.school?.status));
}

// =====================================================================================================================
// Joining and leaving
// =====================================================================================================================

export interface JoinResult {
  classId: string;
  className: string;
  status: Extract<ClassMemberStatus, "ACTIVE" | "PENDING">;
  alreadyMember: boolean;
}

/**
 * Joins a class with its code. Classes that require approval (or a student a teacher removed before) wait as a
 * PENDING request the teachers approve; otherwise the student is in at once and receives the live work. Rate limited
 * per student (code guessing). Unknown, switched-off or archived codes all give the same answer.
 */
export async function joinClassByCode(actor: LearnerActor, input: unknown, options: { now?: Date } = {}): Promise<JoinResult> {
  const { code: raw } = parseWith(joinCodeInputSchema, input);
  const student = await requireStudentAccount(db, actor.userId);
  const limit = await rateLimit(rateLimits.classJoin(actor.userId));
  if (!limit.allowed) throw AppError.rateLimited(limit.retryAfterSeconds, "Too many tries. Wait a few minutes and check the code with your teacher.");
  const code = normalizeJoinCode(raw);
  const notFound = AppError.validation({ code: ["No class uses this code. Check it with your teacher."] });
  if (code === null) throw notFound;
  const cls = await db.class.findUnique({
    where: { joinCode: code },
    select: { id: true, name: true, schoolId: true, archivedAt: true, joinRequiresApproval: true, school: { select: { status: true } } },
  });
  if (!cls || !classIsReachable(cls)) throw notFound;
  assertConsentAllowsClass(student, cls);
  const now = options.now ?? new Date();

  const current = await currentMembership(db, cls.id, actor.userId);
  if (current?.status === "ACTIVE") return { classId: cls.id, className: cls.name, status: "ACTIVE", alreadyMember: true };
  if (current?.status === "PENDING") return { classId: cls.id, className: cls.name, status: "PENDING", alreadyMember: true };
  const status = cls.joinRequiresApproval || current?.removedByOther ? "PENDING" : "ACTIVE";

  await db.$transaction(async (tx) => {
    await upsertMembership(tx, { classId: cls.id, userId: actor.userId, status, source: "JOIN_CODE", now });
    if (status === "PENDING") {
      const teachers = await tx.classTeacher.findMany({ where: { classId: cls.id, removedAt: null }, select: { userId: true } });
      for (const teacher of teachers) {
        await createNotification(
          teacher.userId,
          {
            type: "class.join_request",
            category: "ACCOUNT",
            title: `New request to join ${cls.name}`.slice(0, 200),
            body: "A student asked to join your class. Approve or decline it on the class's Students page.",
            data: { href: `/teacher/classes/${cls.id}/students`, entityType: "Class", entityId: cls.id },
            dedupeKey: `class-request:${cls.id}:${actor.userId}:${now.getTime()}`,
          },
          { client: tx },
        );
      }
    }
  });
  return { classId: cls.id, className: cls.name, status, alreadyMember: false };
}

/** Leaves a class (or withdraws a join request). The class's teachers stop seeing the student's data at once. */
export async function leaveClass(actor: LearnerActor, input: unknown, options: { now?: Date } = {}): Promise<void> {
  const { classId } = parseWith(classRefSchema, input);
  const now = options.now ?? new Date();
  const updated = await db.classMember.updateMany({
    where: { classId, userId: actor.userId, status: { in: ["ACTIVE", "PENDING"] } },
    data: { status: "REMOVED", removedAt: now, removedById: actor.userId },
  });
  if (updated.count === 0) throw AppError.notFound("You're not in this class.");
}

// =====================================================================================================================
// My classes
// =====================================================================================================================

export interface MyClassSummary {
  id: string;
  name: string;
  subjectName: string | null;
  schoolName: string | null;
  teachers: string[];
  status: Extract<ClassMemberStatus, "ACTIVE" | "PENDING">;
  /** Work still to hand in (open, not submitted). */
  toDo: number;
  overdue: number;
}

/** The student's classes (ACTIVE and pending requests), with what is still to do. */
export async function listMyClasses(actor: LearnerActor, options: { now?: Date } = {}): Promise<MyClassSummary[]> {
  const now = options.now ?? new Date();
  const rows = await db.classMember.findMany({
    where: {
      userId: actor.userId,
      status: { in: ["ACTIVE", "PENDING"] },
      class: { archivedAt: null, OR: [{ schoolId: null }, { school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } }] },
    },
    select: {
      status: true,
      class: {
        select: {
          id: true,
          name: true,
          subject: { select: { name: true } },
          school: { select: { name: true } },
          teachers: { where: { removedAt: null }, select: { role: true, user: NAME }, orderBy: { role: "asc" }, take: 4 },
        },
      },
    },
    orderBy: { joinedAt: "desc" },
    take: 100,
  });
  const activeIds = rows.filter((r) => r.status === "ACTIVE").map((r) => r.class.id);
  const work = activeIds.length ? await assignedWork(actor.userId, { classIds: activeIds, now }) : [];
  return rows.map((row) => {
    const mine = work.filter((w) => w.classId === row.class.id);
    return {
      id: row.class.id,
      name: row.class.name,
      subjectName: row.class.subject?.name ?? null,
      schoolName: row.class.school?.name ?? null,
      teachers: row.class.teachers.map((t) => rosterName(t.user.profile)),
      status: row.status as "ACTIVE" | "PENDING",
      toDo: mine.filter((w) => w.view.canWork && (w.view.state === "TO_DO" || w.view.state === "IN_PROGRESS" || w.view.state === "OVERDUE")).length,
      overdue: mine.filter((w) => w.view.state === "OVERDUE").length,
    };
  });
}

export interface MyAssignment {
  id: string;
  classId: string;
  className: string;
  title: string;
  type: AssignmentType;
  status: AssignmentStatus;
  subjectName: string;
  publishedAt: Date | null;
  dueAt: Date | null;
  closesAt: Date | null;
  view: StudentAssignmentView;
  scorePercent: number | null;
  /** Provisional while answers wait for marking. */
  provisional: boolean;
  attemptsCount: number;
  maxAttempts: number | null;
  teacherFeedback: string | null;
  instructionsHtml: SanitizedHtml | null;
  lesson: { id: string; title: string } | null;
  assessment: { title: string; kind: AssessmentKind; totalMarks: number; timeLimitMinutes: number | null } | null;
  practice: { questionCount: number; timeLimitMinutes: number | null } | null;
  /** Results of the counted attempt, when there is one. */
  resultsHref: string | null;
}

function readPractice(config: unknown): MyAssignment["practice"] {
  if (typeof config !== "object" || config === null) return null;
  const value = config as { questionCount?: unknown; timeLimitSeconds?: unknown };
  if (typeof value.questionCount !== "number") return null;
  return { questionCount: value.questionCount, timeLimitMinutes: typeof value.timeLimitSeconds === "number" ? Math.round(value.timeLimitSeconds / 60) : null };
}

/** Work assigned to the student in classes they are ACTIVE in, visible now (published, not archived). */
async function assignedWork(userId: string, options: { classIds?: string[]; now: Date }): Promise<MyAssignment[]> {
  const rows = await db.assignmentProgress.findMany({
    where: {
      userId,
      assignment: {
        status: { in: ["PUBLISHED", "CLOSED"] },
        publishedAt: { lte: options.now },
        ...(options.classIds ? { classId: { in: options.classIds } } : {}),
        class: {
          archivedAt: null,
          members: { some: { userId, status: "ACTIVE" } },
          OR: [{ schoolId: null }, { school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } }],
        },
      },
    },
    select: {
      status: true,
      scorePercent: true,
      attemptsCount: true,
      teacherFeedback: true,
      attempt: { select: { id: true, mode: true, pendingReviewCount: true, status: true } },
      assignment: {
        select: {
          id: true,
          classId: true,
          title: true,
          type: true,
          status: true,
          publishedAt: true,
          dueAt: true,
          closesAt: true,
          allowLateSubmission: true,
          maxAttempts: true,
          instructionsHtml: true,
          practiceConfig: true,
          class: { select: { name: true } },
          subject: { select: { name: true } },
          lesson: { select: { id: true, title: true } },
          assessment: { select: { title: true, kind: true, totalMarks: true, timeLimitSeconds: true } },
        },
      },
    },
    take: 300,
  });
  return rows
    .filter((row) => isVisibleToStudents(row.assignment, options.now))
    .map((row) => {
      const a = row.assignment;
      return {
        id: a.id,
        classId: a.classId,
        className: a.class.name,
        title: a.title,
        type: a.type,
        status: a.status,
        subjectName: a.subject.name,
        publishedAt: a.publishedAt,
        dueAt: a.dueAt,
        closesAt: a.closesAt,
        view: studentAssignmentView(row, a, options.now),
        scorePercent: row.scorePercent,
        provisional: row.attempt !== null && (row.attempt.pendingReviewCount > 0 || row.attempt.status === "AWAITING_MARKING"),
        attemptsCount: row.attemptsCount,
        maxAttempts: a.maxAttempts,
        teacherFeedback: row.teacherFeedback,
        instructionsHtml: a.instructionsHtml ? trustPersistedHtml(a.instructionsHtml) : null,
        lesson: a.lesson,
        assessment: a.assessment
          ? {
              title: a.assessment.title,
              kind: a.assessment.kind,
              totalMarks: a.assessment.totalMarks,
              timeLimitMinutes: a.assessment.timeLimitSeconds === null ? null : Math.round(a.assessment.timeLimitSeconds / 60),
            }
          : null,
        practice: a.type === "PRACTICE" ? readPractice(a.practiceConfig) : null,
        resultsHref: row.attempt && row.attempt.status !== "IN_PROGRESS" ? attemptResultsHref(row.attempt.mode, row.attempt.id) : null,
      };
    });
}

const STATE_ORDER: Record<StudentAssignmentView["state"], number> = { OVERDUE: 0, IN_PROGRESS: 1, TO_DO: 2, LATE: 3, SUBMITTED: 4, MISSED: 5, EXCUSED: 6 };

function byUrgency(a: MyAssignment, b: MyAssignment): number {
  const due = (x: MyAssignment) => x.dueAt?.getTime() ?? Number.MAX_SAFE_INTEGER;
  return STATE_ORDER[a.view.state] - STATE_ORDER[b.view.state] || due(a) - due(b) || a.title.localeCompare(b.title);
}

/** The student's assigned work across classes: what to do first, then handed-in work (§22 "my assignments"). */
export async function listMyAssignments(actor: LearnerActor, options: { now?: Date } = {}): Promise<MyAssignment[]> {
  const now = options.now ?? new Date();
  return (await assignedWork(actor.userId, { now })).sort(byUrgency);
}

export interface MyClassDetail {
  class: { id: string; name: string; description: string | null; subjectName: string | null; schoolName: string | null; teachers: { name: string; role: string }[] };
  assignments: MyAssignment[];
  announcements: { id: string; title: string; bodyHtml: SanitizedHtml; publishedAt: Date; pinned: boolean }[];
}

/** One of the student's classes: its work and live announcements. NOT_FOUND unless the student is an ACTIVE member. */
export async function getMyClass(actor: LearnerActor, classId: string, options: { now?: Date } = {}): Promise<MyClassDetail> {
  if (!isUuid(classId)) throw AppError.notFound("Class not found.");
  const now = options.now ?? new Date();
  const membership = await db.classMember.findUnique({
    where: { classId_userId: { classId, userId: actor.userId } },
    select: {
      status: true,
      class: {
        select: {
          id: true,
          name: true,
          description: true,
          schoolId: true,
          archivedAt: true,
          subject: { select: { name: true } },
          school: { select: { name: true, status: true } },
          teachers: { where: { removedAt: null }, select: { role: true, user: NAME }, orderBy: { role: "asc" } },
        },
      },
    },
  });
  if (!membership || membership.status !== "ACTIVE" || !classIsReachable(membership.class)) throw AppError.notFound("Class not found.");
  const cls = membership.class;
  const [assignments, announcements] = await Promise.all([
    assignedWork(actor.userId, { classIds: [cls.id], now }),
    db.announcement.findMany({
      where: {
        classId: cls.id,
        scope: "CLASS",
        archivedAt: null,
        publishedAt: { lte: now },
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        // CLASS audiences: empty = everyone in the class; otherwise students must be named.
        AND: [{ OR: [{ audienceRoles: { isEmpty: true } }, { audienceRoles: { has: "STUDENT" } }] }],
      },
      select: { id: true, title: true, bodyHtml: true, publishedAt: true, pinned: true },
      orderBy: [{ pinned: "desc" }, { publishedAt: "desc" }],
      take: 20,
    }),
  ]);
  return {
    class: {
      id: cls.id,
      name: cls.name,
      description: cls.description,
      subjectName: cls.subject?.name ?? null,
      schoolName: cls.school?.name ?? null,
      teachers: cls.teachers.map((t) => ({ name: rosterName(t.user.profile), role: t.role })),
    },
    assignments: assignments.sort(byUrgency),
    announcements: announcements.map((a) => ({ id: a.id, title: a.title, bodyHtml: trustPersistedHtml(a.bodyHtml), publishedAt: a.publishedAt as Date, pinned: a.pinned })),
  };
}

// =====================================================================================================================
// Starting work
// =====================================================================================================================

/**
 * Opens assigned work: a lesson goes to the reader; a test or practice starts (or resumes) an attempt in
 * assignment mode through the attempt engine (no personal plan gates or limits apply when the class's tenant sponsors
 * assignment work; otherwise the student's own plan applies, see `gatesFor`). Returns where to go.
 *
 * @throws NOT_FOUND (not assigned / not visible) | CONFLICT (closed, attempts used up — from the engine)
 */
export async function startAssignmentWork(actor: LearnerActor, input: unknown, options: { now?: Date } = {}): Promise<{ href: string }> {
  const { assignmentId } = parseWith(assignmentRefSchema, input);
  const now = options.now ?? new Date();
  const [work] = (await assignedWork(actor.userId, { now })).filter((w) => w.id === assignmentId);
  if (!work) throw AppError.notFound("This work isn't assigned to you.");
  if (!work.view.canWork) throw AppError.conflict(work.view.state === "EXCUSED" ? "Your teacher excused you from this work." : "This work is closed.");
  const assignment = await db.assignment.findUniqueOrThrow({
    where: { id: assignmentId },
    select: { type: true, subjectId: true, lessonId: true, assessment: { select: { kind: true } } },
  });
  if (assignment.type === "LESSON") return { href: `/app/lessons/${assignment.lessonId as string}` };
  const open = await db.assessmentAttempt.findFirst({
    where: { userId: actor.userId, assignmentId, status: "IN_PROGRESS" },
    select: { id: true, mode: true },
    orderBy: { startedAt: "desc" },
  });
  if (open) return { href: attemptWorkHref(open.mode, open.id) };
  const mode: AttemptMode = assignment.type === "ASSESSMENT" && assignment.assessment ? assignment.assessment.kind : "PRACTICE";
  const { attempt } = await startAttempt(actor, { mode, subjectId: assignment.subjectId, assignmentId, origin: "ASSIGNMENT" }, { now });
  return { href: attemptWorkHref(attempt.mode, attempt.id) };
}
