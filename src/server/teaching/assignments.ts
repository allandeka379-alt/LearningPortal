import "server-only";
import { z } from "zod";
import type {
  AssessmentKind,
  AssignmentAiHelp,
  AssignmentProgressStatus,
  AssignmentScorePolicy,
  AssignmentStatus,
  AssignmentType,
  Prisma,
} from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import type { SanitizedHtml } from "@/lib/content/types";
import { closeAttemptForAssignment } from "@/server/attempts";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { localDateTimeToInstant } from "@/server/cms/announcements/schemas";
import { renderContent, trustPersistedHtml } from "@/server/content/render";
import { buildTopicTree, flattenTopicTree, PUBLISHED_SYLLABUS_STATUSES } from "@/server/curriculum/core";
import { resolveCurrentSyllabus } from "@/server/curriculum/syllabus";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, audit, auditInTx } from "@/server/lib/audit";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { enqueue, registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { notifyMany } from "@/server/notifications";
import { loadClassForTeacher, type ClassContext, type TeachingActor } from "./access";
import { refreshAssignmentCounters } from "./assignment-progress";
import { listSubjectOptions, type SubjectOption } from "./classes";
import {
  assignmentDateProblems,
  assignmentWindow,
  buildPracticeConfig,
  completionPercent,
  rosterName,
  studentAssignmentView,
  summariseProgress,
  WEAK_BANDS,
  type AssignmentWindow,
  type PracticeConfig,
  type ProgressSummary,
  type StudentAssignmentView,
} from "./core";
import {
  assignmentFeedbackSchema,
  assignmentRefSchema,
  assignTopicPracticeSchema,
  createAssignmentSchema,
  studentProgressRefSchema,
  type CreateAssignmentData,
} from "./schemas";
import { parseWith } from "./validation";

/** Interactive transaction limits for this module's multi-row writes. */
const TX_OPTIONS = { maxWait: 10_000, timeout: 30_000 } as const;

/**
 * Assignments (§22 "assign lessons, assign quizzes, create tests"): LESSON (a published lesson), ASSESSMENT (a
 * published platform test or the school's / tutor's own test) and PRACTICE (topics + count + difficulty, optionally
 * timed and optionally for chosen students only). Draft → published (now or scheduled) → closed → archived.
 *
 * Publishing creates one AssignmentProgress row per targeted ACTIVE member (what the attempt engine and the lesson
 * reader require before accepting the work), notifies the students (scheduled work: the `teaching.assignmentPublished`
 * job at publication time) and keeps the Assignment's cached counters current. Students who join later get class-wide
 * work that is still live. Closing finishes open attempts (reason ASSIGNMENT_CLOSED, through the attempt engine) and
 * records MISSED for students who handed nothing in; the `teaching.closeDueAssignments` sweep does the same when the
 * close time passes.
 *
 * Teacher views only ever list ACTIVE members (a removed student's history stays, but is no longer shown).
 */

export const ASSIGNMENT_PUBLISHED_JOB = "teaching.assignmentPublished";
export const CLOSE_DUE_ASSIGNMENTS_JOB = "teaching.closeDueAssignments";

const ASSESSMENT_KINDS_FOR_ASSIGNMENT: readonly AssessmentKind[] = ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM", "MOCK_EXAM"];

function renderInstructions(markdown: string | null): string | null {
  if (markdown === null) return null;
  if (/!\[[^\]]*\]\(/.test(markdown)) throw AppError.validation({ instructions: ["Instructions can't include images. Describe the task in words."] });
  try {
    return renderContent(markdown, { idPrefix: "asg-", baseHeadingLevel: 3 }).html;
  } catch {
    throw AppError.validation({ instructions: ["These instructions couldn't be formatted. Check for unusual characters."] });
  }
}

function toInstant(value: string | null, timeZone: string, field: string): Date | null {
  if (value === null) return null;
  const instant = localDateTimeToInstant(value, timeZone);
  if (!instant) throw AppError.validation({ [field]: ["Enter a valid date and time."] });
  return instant;
}

// =====================================================================================================================
// Form options
// =====================================================================================================================

export interface AssignmentFormOptions {
  class: ClassContext;
  /** Subject choices (subject-less classes); the class subject otherwise. */
  subjects: SubjectOption[];
  subjectId: string | null;
  lessons: { id: string; title: string; estimatedMinutes: number }[];
  assessments: { id: string; title: string; kind: AssessmentKind; totalMarks: number; timeLimitMinutes: number | null; owner: "platform" | "school" | "tutor" }[];
  topics: { id: string; name: string; code: string | null; depth: number }[];
  students: { userId: string; name: string }[];
}

/** Lessons, tests, topics and students the assignment form offers for a class and subject. */
export async function getAssignmentFormOptions(actor: TeachingActor, classId: string, options: { subjectId?: string | null } = {}): Promise<AssignmentFormOptions> {
  const cls = await loadClassForTeacher(actor, classId, { write: true });
  const subjects = cls.subjectId
    ? [{ id: cls.subjectId, name: cls.subjectName ?? "Class subject", qualificationId: cls.qualificationId ?? "", qualificationLabel: "" }]
    : await listSubjectOptions();
  const requested = options.subjectId && z.uuid().safeParse(options.subjectId).success ? options.subjectId : null;
  const subjectId = cls.subjectId ?? (requested && subjects.some((s) => s.id === requested) ? requested : null);
  const members = await db.classMember.findMany({
    where: { classId: cls.id, status: "ACTIVE" },
    select: { userId: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
    take: 500,
  });
  const students = members.map((m) => ({ userId: m.userId, name: rosterName(m.user.profile) })).sort((a, b) => a.name.localeCompare(b.name));
  if (!subjectId) return { class: cls, subjects, subjectId: null, lessons: [], assessments: [], topics: [], students };

  const tenantFilter: Prisma.AssessmentWhereInput[] = [{ schoolId: null, ownerUserId: null }];
  if (cls.schoolId) tenantFilter.push({ schoolId: cls.schoolId });
  else tenantFilter.push({ ownerUserId: actor.userId });
  const [lessons, assessments, syllabus] = await Promise.all([
    db.lesson.findMany({
      where: {
        status: "PUBLISHED",
        draftOfId: null,
        kind: "LESSON",
        OR: [{ subjectId }, { topics: { some: { topic: { syllabus: { subjectId } } } } }],
      },
      select: { id: true, title: true, estimatedMinutes: true },
      orderBy: { title: "asc" },
      take: 300,
    }),
    db.assessment.findMany({
      where: { status: "PUBLISHED", draftOfId: null, subjectId, kind: { in: [...ASSESSMENT_KINDS_FOR_ASSIGNMENT] }, OR: tenantFilter },
      select: { id: true, title: true, kind: true, totalMarks: true, timeLimitSeconds: true, schoolId: true, ownerUserId: true },
      orderBy: [{ kind: "asc" }, { title: "asc" }],
      take: 200,
    }),
    resolveCurrentSyllabus(subjectId),
  ]);
  const topicRows = syllabus
    ? await db.topic.findMany({
        where: { syllabusId: syllabus.id },
        select: { id: true, parentId: true, kind: true, name: true, code: true, depth: true, path: true, sortOrder: true },
        take: 1_000,
      })
    : [];
  return {
    class: cls,
    subjects,
    subjectId,
    lessons,
    assessments: assessments.map((a) => ({
      id: a.id,
      title: a.title,
      kind: a.kind,
      totalMarks: a.totalMarks,
      timeLimitMinutes: a.timeLimitSeconds === null ? null : Math.round(a.timeLimitSeconds / 60),
      owner: a.schoolId ? "school" : a.ownerUserId ? "tutor" : "platform",
    })),
    topics: flattenTopicTree(buildTopicTree(topicRows))
      .filter((t) => t.kind !== "SECTION")
      .map((t) => ({ id: t.id, name: t.name, code: t.code, depth: t.depth })),
    students,
  };
}

// =====================================================================================================================
// Create / publish
// =====================================================================================================================

interface AssignmentDraft {
  type: AssignmentType;
  subjectId: string;
  title: string;
  instructions: string | null;
  lessonId: string | null;
  assessmentId: string | null;
  topicId: string | null;
  practiceConfig: PracticeConfig | null;
  publishedAt: Date | null;
  dueAt: Date | null;
  closesAt: Date | null;
  allowLateSubmission: boolean;
  maxAttempts: number | null;
  scorePolicy: AssignmentScorePolicy;
  aiHelp: AssignmentAiHelp;
  /** Targeted students (PRACTICE); null = every ACTIVE member. */
  studentIds: string[] | null;
}

async function resolveSubject(cls: ClassContext, requested: string | null): Promise<string> {
  if (cls.subjectId) {
    if (requested && requested !== cls.subjectId) throw AppError.validation({ subjectId: ["Work for this class must be in the class subject."] });
    return cls.subjectId;
  }
  if (!requested) throw AppError.validation({ subjectId: ["Choose the subject of this work."] });
  const subject = await db.subject.findUnique({ where: { id: requested }, select: { catalogueStatus: true } });
  if (!subject || subject.catalogueStatus !== "AVAILABLE") throw AppError.validation({ subjectId: ["Choose a subject from the list."] });
  if (cls.schoolId) {
    const offered = await db.schoolSubject.findMany({ where: { schoolId: cls.schoolId, isActive: true }, select: { subjectId: true } });
    if (offered.length > 0 && !offered.some((o) => o.subjectId === requested)) {
      throw AppError.validation({ subjectId: ["Your school doesn't offer this subject yet."] });
    }
  }
  return requested;
}

async function validateTarget(actor: TeachingActor, cls: ClassContext, subjectId: string, data: CreateAssignmentData): Promise<Pick<AssignmentDraft, "lessonId" | "assessmentId" | "topicId" | "practiceConfig" | "studentIds">> {
  if (data.type === "LESSON") {
    const lesson = await db.lesson.findFirst({
      where: {
        id: data.lessonId as string,
        status: "PUBLISHED",
        draftOfId: null,
        OR: [{ subjectId }, { topics: { some: { topic: { syllabus: { subjectId } } } } }],
      },
      select: { id: true },
    });
    if (!lesson) throw AppError.validation({ lessonId: ["Choose a published lesson of this subject."] });
    return { lessonId: lesson.id, assessmentId: null, topicId: null, practiceConfig: null, studentIds: null };
  }
  if (data.type === "ASSESSMENT") {
    const assessment = await db.assessment.findFirst({
      where: { id: data.assessmentId as string, status: "PUBLISHED", draftOfId: null, subjectId, kind: { in: [...ASSESSMENT_KINDS_FOR_ASSIGNMENT] } },
      select: { id: true, schoolId: true, ownerUserId: true },
    });
    const tenantOk =
      assessment !== null &&
      ((assessment.schoolId === null && assessment.ownerUserId === null) ||
        (assessment.schoolId !== null && assessment.schoolId === cls.schoolId) ||
        (cls.schoolId === null && assessment.ownerUserId === actor.userId));
    if (!assessment || !tenantOk) throw AppError.validation({ assessmentId: ["Choose a published test of this subject from the list."] });
    return { lessonId: null, assessmentId: assessment.id, topicId: null, practiceConfig: null, studentIds: null };
  }
  // PRACTICE
  const topics = await db.topic.findMany({
    where: { id: { in: data.topicIds }, syllabus: { subjectId, status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } } },
    select: { id: true },
  });
  if (topics.length !== new Set(data.topicIds).size) throw AppError.validation({ topicIds: ["Choose topics of this subject."] });
  const available = await db.questionTopic.count({
    where: {
      isPlatform: true,
      subjectId,
      topic: { OR: data.topicIds.map((id) => ({ path: { contains: id } })) },
      question: { status: "PUBLISHED", parentId: null, draftOfId: null },
    },
  });
  if (available === 0) throw AppError.validation({ topicIds: ["There are no published practice questions for these topics yet."] });
  let studentIds: string[] | null = null;
  if (data.studentIds.length > 0) {
    const members = await db.classMember.count({ where: { classId: cls.id, status: "ACTIVE", userId: { in: data.studentIds } } });
    if (members !== new Set(data.studentIds).size) throw AppError.validation({ studentIds: ["Choose students of this class."] });
    studentIds = [...new Set(data.studentIds)];
  }
  return {
    lessonId: null,
    assessmentId: null,
    topicId: data.topicIds.length === 1 ? (data.topicIds[0] as string) : null,
    practiceConfig: buildPracticeConfig({
      questionCount: data.questionCount as number,
      difficulty: data.difficulty,
      topicIds: data.topicIds,
      timeLimitMinutes: data.timeLimitMinutes,
      audience: studentIds ? "SELECTED" : "CLASS",
    }),
    studentIds,
  };
}

/** Writes the assignment and, when published, its progress rows + notifications (one transaction). */
async function persistAssignment(actor: TeachingActor, cls: ClassContext, draft: AssignmentDraft, now: Date): Promise<{ id: string; status: AssignmentStatus }> {
  const status: AssignmentStatus = draft.publishedAt === null ? "DRAFT" : "PUBLISHED";
  return db.$transaction(async (tx) => {
    const created = await tx.assignment.create({
      data: {
        classId: cls.id,
        createdById: actor.userId,
        subjectId: draft.subjectId,
        type: draft.type,
        status,
        title: draft.title,
        instructions: draft.instructions,
        instructionsHtml: renderInstructions(draft.instructions),
        lessonId: draft.lessonId,
        assessmentId: draft.assessmentId,
        topicId: draft.topicId,
        practiceConfig: draft.practiceConfig === null ? undefined : (draft.practiceConfig as unknown as Prisma.InputJsonObject),
        publishedAt: draft.publishedAt,
        dueAt: draft.dueAt,
        closesAt: draft.closesAt,
        allowLateSubmission: draft.allowLateSubmission,
        maxAttempts: draft.maxAttempts,
        scorePolicy: draft.scorePolicy,
        aiHelp: draft.aiHelp,
      },
      select: { id: true },
    });
    if (status === "PUBLISHED") {
      await releaseAssignment(tx, { id: created.id, classId: cls.id, title: draft.title, publishedAt: draft.publishedAt as Date }, draft.studentIds, now);
      await auditPublish(tx, actor, cls, created.id, draft.publishedAt as Date, now);
    }
    return { id: created.id, status };
  }, TX_OPTIONS);
}

/** Audit entry for work going live now or at a scheduled time (in the publishing transaction). */
async function auditPublish(tx: DbClient, actor: TeachingActor, cls: Pick<ClassContext, "id" | "schoolId">, assignmentId: string, publishedAt: Date, now: Date): Promise<void> {
  await auditInTx(tx, {
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUDIT_ACTIONS.ASSIGNMENT_PUBLISH,
    entityType: "Assignment",
    entityId: assignmentId,
    schoolId: cls.schoolId,
    metadata: { classId: cls.id, scheduled: publishedAt.getTime() > now.getTime() },
  });
}

/** Progress rows for the targeted students, counters, then notify now or at the scheduled publication time. */
async function releaseAssignment(
  tx: DbClient,
  assignment: { id: string; classId: string; title: string; publishedAt: Date },
  studentIds: string[] | null,
  now: Date,
): Promise<void> {
  const targets =
    studentIds ?? (await tx.classMember.findMany({ where: { classId: assignment.classId, status: "ACTIVE" }, select: { userId: true } })).map((m) => m.userId);
  if (targets.length > 0) {
    await tx.assignmentProgress.createMany({ data: targets.map((userId) => ({ assignmentId: assignment.id, userId, createdAt: now })), skipDuplicates: true });
  }
  await refreshAssignmentCounters(tx, [assignment.id]);
  if (assignment.publishedAt.getTime() <= now.getTime()) {
    await notifyAssignmentStudents(tx, assignment, targets);
  } else {
    await enqueue(
      ASSIGNMENT_PUBLISHED_JOB,
      { assignmentId: assignment.id, publishedAt: assignment.publishedAt.toISOString() },
      { client: tx, runAt: assignment.publishedAt, queue: "notifications", dedupeKey: `assignment-published:${assignment.id}:${assignment.publishedAt.getTime()}` },
    );
  }
}

async function notifyAssignmentStudents(client: DbClient, assignment: { id: string; classId: string; title: string }, userIds: readonly string[]): Promise<void> {
  if (userIds.length === 0) return;
  await notifyMany(
    userIds,
    {
      type: "assignment.published",
      category: "ASSIGNMENT",
      title: `New work: ${assignment.title}`.slice(0, 200),
      body: "Your teacher set new work. Open Classes to see the instructions and due date.",
      data: { href: `/app/classes/${assignment.classId}`, entityType: "Assignment", entityId: assignment.id },
      dedupeKey: `assignment:${assignment.id}`,
    },
    { client },
  );
}

/**
 * Creates an assignment (§22) as a draft, published now or scheduled. Validates the target against the class's
 * subject and tenant (platform tests, the class's school's tests, or — for a tutor class — the tutor's own tests;
 * the database tenant guard re-checks it) and the dates (`datetime-local` values on the teacher's wall clock).
 */
export async function createAssignment(
  actor: TeachingActor,
  input: unknown,
  options: { now?: Date; timeZone?: string } = {},
): Promise<{ id: string; status: AssignmentStatus }> {
  const data = parseWith(createAssignmentSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  const now = options.now ?? new Date();
  const timeZone = options.timeZone ?? DEFAULT_TIMEZONE;
  const subjectId = await resolveSubject(cls, data.subjectId);
  const target = await validateTarget(actor, cls, subjectId, data);

  const publishedAt = data.publish === "draft" ? null : data.publish === "now" ? now : toInstant(data.publishAt, timeZone, "publishAt");
  if (data.publish === "schedule" && publishedAt !== null && publishedAt.getTime() <= now.getTime()) {
    throw AppError.validation({ publishAt: ["Choose a time in the future, or publish now."] });
  }
  const dueAt = toInstant(data.dueAt, timeZone, "dueAt");
  const closesAt = toInstant(data.closesAt, timeZone, "closesAt");
  const problems: FieldErrors = assignmentDateProblems({ publishedAt, dueAt, closesAt }, now);
  if (Object.keys(problems).length > 0) throw AppError.validation(problems);

  return persistAssignment(actor, cls, {
    type: data.type,
    subjectId,
    title: data.title,
    instructions: data.instructions,
    ...target,
    publishedAt,
    dueAt,
    closesAt,
    allowLateSubmission: data.allowLateSubmission,
    maxAttempts: data.maxAttempts,
    scorePolicy: data.scorePolicy,
    aiHelp: data.aiHelp,
  }, now);
}

interface LoadedAssignment {
  id: string;
  classId: string;
  title: string;
  type: AssignmentType;
  status: AssignmentStatus;
  subjectId: string;
  publishedAt: Date | null;
  dueAt: Date | null;
  closesAt: Date | null;
  allowLateSubmission: boolean;
  practiceConfig: Prisma.JsonValue;
  cls: ClassContext;
}

async function loadAssignmentForTeacher(actor: TeachingActor, assignmentId: string, options: { write?: boolean } = {}): Promise<LoadedAssignment> {
  const row = await db.assignment.findUnique({
    where: { id: assignmentId },
    select: { id: true, classId: true, title: true, type: true, status: true, subjectId: true, publishedAt: true, dueAt: true, closesAt: true, allowLateSubmission: true, practiceConfig: true },
  });
  if (!row) throw AppError.notFound("Assignment not found.");
  const cls = await loadClassForTeacher(actor, row.classId, options.write ? { write: true } : {});
  return { ...row, cls };
}

/** Publishes a draft now (its dates must still be in the future). */
export async function publishAssignment(actor: TeachingActor, input: unknown, options: { now?: Date } = {}): Promise<void> {
  const { assignmentId } = parseWith(assignmentRefSchema, input);
  const a = await loadAssignmentForTeacher(actor, assignmentId, { write: true });
  if (a.status !== "DRAFT") throw AppError.conflict("Only drafts can be published.");
  const now = options.now ?? new Date();
  const problems = assignmentDateProblems({ publishedAt: now, dueAt: a.dueAt, closesAt: a.closesAt }, now);
  if (Object.keys(problems).length > 0) throw AppError.validation(problems, "Move the due date into the future first.");
  const config = a.practiceConfig as { audience?: string } | null;
  if (a.type === "PRACTICE" && config?.audience === "SELECTED") throw AppError.conflict("Targeted practice is published when it is created.");
  await db.$transaction(async (tx) => {
    const updated = await tx.assignment.updateMany({ where: { id: a.id, status: "DRAFT" }, data: { status: "PUBLISHED", publishedAt: now } });
    if (updated.count === 0) throw AppError.conflict("Only drafts can be published.");
    await releaseAssignment(tx, { id: a.id, classId: a.classId, title: a.title, publishedAt: now }, null, now);
    await auditPublish(tx, actor, a.cls, a.id, now, now);
  }, TX_OPTIONS);
}

const scheduleSchema = z.object({
  assignmentId: z.uuid(),
  dueAt: z.preprocess((v) => (v === "" ? null : v), z.string().nullable()),
  closesAt: z.preprocess((v) => (v === "" ? null : v), z.string().nullable()),
  allowLateSubmission: z.preprocess((v) => v === true || v === "true" || v === "on" || v === "1", z.boolean()),
});

/** Changes the due date / close time (e.g. an extension for the whole class). Not for closed or archived work. */
export async function updateAssignmentSchedule(actor: TeachingActor, input: unknown, options: { now?: Date; timeZone?: string } = {}): Promise<void> {
  const data = parseWith(scheduleSchema, input);
  const a = await loadAssignmentForTeacher(actor, data.assignmentId, { write: true });
  if (a.status !== "DRAFT" && a.status !== "PUBLISHED") throw AppError.conflict("Closed work can't be rescheduled.");
  const now = options.now ?? new Date();
  const timeZone = options.timeZone ?? DEFAULT_TIMEZONE;
  const dueAt = toInstant(data.dueAt, timeZone, "dueAt");
  const closesAt = toInstant(data.closesAt, timeZone, "closesAt");
  const problems = assignmentDateProblems({ publishedAt: a.publishedAt && a.publishedAt > now ? a.publishedAt : null, dueAt, closesAt }, now);
  if (Object.keys(problems).length > 0) throw AppError.validation(problems);
  await db.assignment.update({ where: { id: a.id }, data: { dueAt, closesAt, allowLateSubmission: data.allowLateSubmission }, select: { id: true } });
}

// =====================================================================================================================
// Close / archive
// =====================================================================================================================

/**
 * Closes an assignment for good (no more submissions): finishes students' open attempts through the attempt engine
 * (reason ASSIGNMENT_CLOSED: answered questions are marked and counted), marks students who handed nothing in as
 * MISSED and refreshes the counters. Idempotent. System use (job) and {@link closeAssignment}.
 */
export async function closeAssignmentNow(assignmentId: string, now: Date = new Date()): Promise<{ closedAttempts: number; missed: number }> {
  const open = await db.assessmentAttempt.findMany({ where: { assignmentId, status: "IN_PROGRESS" }, select: { id: true } });
  let closedAttempts = 0;
  for (const { id } of open) {
    try {
      if (await closeAttemptForAssignment(id, now)) closedAttempts += 1;
    } catch (error) {
      logger.error("teaching: closing an assignment attempt failed", { attemptId: id, assignmentId, err: error });
    }
  }
  const missed = await db.$transaction(async (tx) => {
    await tx.assignment.updateMany({ where: { id: assignmentId, status: "PUBLISHED" }, data: { status: "CLOSED" } });
    const result = await tx.assignmentProgress.updateMany({ where: { assignmentId, status: { in: ["NOT_STARTED", "IN_PROGRESS"] } }, data: { status: "MISSED" } });
    await refreshAssignmentCounters(tx, [assignmentId]);
    return result.count;
  });
  return { closedAttempts, missed };
}

/** Teacher action: close the work now (see {@link closeAssignmentNow}). */
export async function closeAssignment(actor: TeachingActor, input: unknown, options: { now?: Date } = {}): Promise<{ closedAttempts: number; missed: number }> {
  const { assignmentId } = parseWith(assignmentRefSchema, input);
  const a = await loadAssignmentForTeacher(actor, assignmentId, { write: true });
  if (a.status !== "PUBLISHED") throw AppError.conflict("Only published work can be closed.");
  const result = await closeAssignmentNow(a.id, options.now ?? new Date());
  await audit({
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUDIT_ACTIONS.ASSIGNMENT_CLOSE,
    entityType: "Assignment",
    entityId: a.id,
    schoolId: a.cls.schoolId,
    metadata: { classId: a.classId, closedAttempts: result.closedAttempts, missed: result.missed },
  });
  return result;
}

/** Archives the work (hidden from students; results kept). Open work is closed first. Drafts are deleted instead. */
export async function archiveAssignment(actor: TeachingActor, input: unknown, options: { now?: Date } = {}): Promise<{ deleted: boolean }> {
  const { assignmentId } = parseWith(assignmentRefSchema, input);
  const a = await loadAssignmentForTeacher(actor, assignmentId);
  const now = options.now ?? new Date();
  if (a.status === "DRAFT") {
    await db.assignment.delete({ where: { id: a.id } });
    return { deleted: true };
  }
  if (a.status === "PUBLISHED") await closeAssignmentNow(a.id, now);
  await db.assignment.update({ where: { id: a.id }, data: { status: "ARCHIVED" }, select: { id: true } });
  return { deleted: false };
}

// =====================================================================================================================
// Lists and detail
// =====================================================================================================================

export interface AssignmentListItem {
  id: string;
  classId: string;
  className: string;
  title: string;
  type: AssignmentType;
  status: AssignmentStatus;
  window: AssignmentWindow;
  publishedAt: Date | null;
  dueAt: Date | null;
  closesAt: Date | null;
  summary: ProgressSummary;
  completionPercent: number | null;
  /** Answers waiting for the teacher's marking. */
  awaitingMarking: number;
}

/** Live progress rows of CURRENT (ACTIVE) members for the given assignments. */
async function memberProgress(assignmentIds: readonly string[]): Promise<Map<string, { status: AssignmentProgressStatus; scorePercent: number | null }[]>> {
  const map = new Map<string, { status: AssignmentProgressStatus; scorePercent: number | null }[]>();
  if (assignmentIds.length === 0) return map;
  const rows = await db.$queryRaw<{ assignmentId: string; status: AssignmentProgressStatus; scorePercent: number | null }[]>`
    SELECT p."assignmentId"::text AS "assignmentId", p."status"::text AS status, p."scorePercent" AS "scorePercent"
    FROM "AssignmentProgress" p
    JOIN "Assignment" a ON a."id" = p."assignmentId"
    JOIN "ClassMember" cm ON cm."classId" = a."classId" AND cm."userId" = p."userId" AND cm."status" = 'ACTIVE'
    WHERE p."assignmentId" = ANY(${[...assignmentIds]}::uuid[])`;
  for (const row of rows) map.set(row.assignmentId, [...(map.get(row.assignmentId) ?? []), { status: row.status, scorePercent: row.scorePercent }]);
  return map;
}

/** Answers awaiting marking per assignment (closed attempts of current members with provisional marks). */
async function awaitingMarkingCounts(assignmentIds: readonly string[]): Promise<Map<string, number>> {
  if (assignmentIds.length === 0) return new Map();
  const rows = await db.$queryRaw<{ assignmentId: string; pending: number }[]>`
    SELECT aa."assignmentId"::text AS "assignmentId", sum(aa."pendingReviewCount")::int AS pending
    FROM "AssessmentAttempt" aa
    JOIN "Assignment" a ON a."id" = aa."assignmentId"
    JOIN "ClassMember" cm ON cm."classId" = a."classId" AND cm."userId" = aa."userId" AND cm."status" = 'ACTIVE'
    WHERE aa."assignmentId" = ANY(${[...assignmentIds]}::uuid[]) AND aa."pendingReviewCount" > 0
      AND aa."status" IN ('SUBMITTED', 'AWAITING_MARKING', 'MARKED')
    GROUP BY aa."assignmentId"`;
  return new Map(rows.map((row) => [row.assignmentId, row.pending]));
}

const LIST_SELECT = {
  id: true,
  classId: true,
  title: true,
  type: true,
  status: true,
  publishedAt: true,
  dueAt: true,
  closesAt: true,
  allowLateSubmission: true,
  createdAt: true,
  class: { select: { name: true } },
} as const;

async function toListItems(rows: Prisma.AssignmentGetPayload<{ select: typeof LIST_SELECT }>[], now: Date): Promise<AssignmentListItem[]> {
  const ids = rows.map((r) => r.id);
  const [progress, marking] = await Promise.all([memberProgress(ids), awaitingMarkingCounts(ids)]);
  return rows.map((row) => {
    const summary = summariseProgress(progress.get(row.id) ?? []);
    return {
      id: row.id,
      classId: row.classId,
      className: row.class.name,
      title: row.title,
      type: row.type,
      status: row.status,
      window: assignmentWindow(row, now),
      publishedAt: row.publishedAt,
      dueAt: row.dueAt,
      closesAt: row.closesAt,
      summary,
      completionPercent: completionPercent(summary),
      awaitingMarking: marking.get(row.id) ?? 0,
    };
  });
}

/** A class's assignments (not archived unless asked), live first, then by due date. */
export async function listClassAssignments(actor: TeachingActor, classId: string, options: { now?: Date; includeArchived?: boolean } = {}): Promise<AssignmentListItem[]> {
  const cls = await loadClassForTeacher(actor, classId);
  const rows = await db.assignment.findMany({
    where: { classId: cls.id, ...(options.includeArchived ? {} : { status: { not: "ARCHIVED" } }) },
    select: LIST_SELECT,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 200,
  });
  return toListItems(rows, options.now ?? new Date());
}

const cursorSchema = z.object({ t: z.number().int(), id: z.uuid() });

function encodeCursor(row: { createdAt: Date; id: string }): string {
  return Buffer.from(JSON.stringify({ t: row.createdAt.getTime(), id: row.id })).toString("base64url");
}

function decodeCursor(cursor: string | null | undefined): { createdAt: Date; id: string } | null {
  if (!cursor) return null;
  try {
    const parsed = cursorSchema.safeParse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")));
    return parsed.success ? { createdAt: new Date(parsed.data.t), id: parsed.data.id } : null;
  } catch {
    return null;
  }
}

/** Every assignment in the classes the actor teaches (cursor-paginated, newest first): /teacher/assignments. */
export async function listTeacherAssignments(
  actor: TeachingActor,
  options: { cursor?: string | null; limit?: number; now?: Date } = {},
): Promise<{ items: AssignmentListItem[]; nextCursor: string | null }> {
  const limit = Math.min(50, Math.max(1, options.limit ?? 20));
  const after = decodeCursor(options.cursor);
  const rows = await db.assignment.findMany({
    where: {
      status: { not: "ARCHIVED" },
      class: {
        teachers: { some: { userId: actor.userId, removedAt: null } },
        OR: [{ schoolId: null }, { school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } }],
      },
      ...(after ? { OR: [{ createdAt: { lt: after.createdAt } }, { createdAt: after.createdAt, id: { lt: after.id } }] } : {}),
    },
    select: LIST_SELECT,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
  });
  const page = rows.slice(0, limit);
  const last = page[page.length - 1];
  return { items: await toListItems(page, options.now ?? new Date()), nextCursor: rows.length > limit && last ? encodeCursor(last) : null };
}

/**
 * Published work in the actor's classes due within `days` (and work past its due date that is still open), soonest
 * first: the teacher dashboard's "due soon" list. Uses Assignment_published_due_idx.
 */
export async function listUpcomingAssignments(actor: TeachingActor, options: { now?: Date; days?: number; limit?: number } = {}): Promise<AssignmentListItem[]> {
  const now = options.now ?? new Date();
  const horizon = new Date(now.getTime() + (options.days ?? 14) * 86_400_000);
  const rows = await db.assignment.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: now },
      dueAt: { not: null, lte: horizon },
      OR: [{ closesAt: null }, { closesAt: { gt: now } }],
      class: {
        archivedAt: null,
        teachers: { some: { userId: actor.userId, removedAt: null } },
        AND: [{ OR: [{ schoolId: null }, { school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } }] }],
      },
    },
    select: LIST_SELECT,
    orderBy: [{ dueAt: "asc" }, { id: "asc" }],
    take: Math.min(50, Math.max(1, options.limit ?? 8)),
  });
  return (await toListItems(rows, now)).filter((a) => a.window === "OPEN" || a.window === "PAST_DUE");
}

export interface AssignmentStudentRow {
  userId: string;
  name: string;
  view: StudentAssignmentView;
  scorePercent: number | null;
  submittedAt: Date | null;
  attemptsCount: number;
  progressPercent: number;
  countedAttemptId: string | null;
  /** Answers of this student's attempts that wait for marking. */
  awaitingMarking: number;
  teacherFeedback: string | null;
}

export interface AssignmentDetail {
  class: ClassContext;
  assignment: {
    id: string;
    title: string;
    type: AssignmentType;
    status: AssignmentStatus;
    window: AssignmentWindow;
    subjectName: string;
    instructionsHtml: SanitizedHtml | null;
    publishedAt: Date | null;
    dueAt: Date | null;
    closesAt: Date | null;
    allowLateSubmission: boolean;
    maxAttempts: number | null;
    scorePolicy: AssignmentScorePolicy;
    lesson: { id: string; title: string } | null;
    assessment: { id: string; title: string; kind: AssessmentKind; totalMarks: number } | null;
    practice: { questionCount: number; difficulty: string; timeLimitMinutes: number | null; topics: string[]; targeted: boolean } | null;
  };
  summary: ProgressSummary;
  completionPercent: number | null;
  students: AssignmentStudentRow[];
}

const practiceConfigSchema = z.looseObject({
  questionCount: z.number(),
  difficulty: z.string(),
  topicIds: z.array(z.string()),
  timeLimitSeconds: z.number().optional(),
  audience: z.string().optional(),
});

/** One assignment with every current student's status, score and late flags (§22 "view performance"). */
export async function getAssignmentDetail(actor: TeachingActor, assignmentId: string, options: { now?: Date } = {}): Promise<AssignmentDetail> {
  if (!z.uuid().safeParse(assignmentId).success) throw AppError.notFound("Assignment not found.");
  const loaded = await loadAssignmentForTeacher(actor, assignmentId);
  const now = options.now ?? new Date();
  const row = await db.assignment.findUniqueOrThrow({
    where: { id: loaded.id },
    select: {
      instructionsHtml: true,
      maxAttempts: true,
      scorePolicy: true,
      subject: { select: { name: true } },
      lesson: { select: { id: true, title: true } },
      assessment: { select: { id: true, title: true, kind: true, totalMarks: true } },
    },
  });
  const [members, progress, pending] = await Promise.all([
    db.classMember.findMany({
      where: { classId: loaded.classId, status: "ACTIVE" },
      select: { userId: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
      take: 500,
    }),
    db.assignmentProgress.findMany({
      where: { assignmentId: loaded.id },
      select: {
        userId: true,
        status: true,
        scorePercent: true,
        submittedAt: true,
        attemptsCount: true,
        progressPercent: true,
        attemptId: true,
        teacherFeedback: true,
      },
    }),
    db.assessmentAttempt.groupBy({
      by: ["userId"],
      where: { assignmentId: loaded.id, pendingReviewCount: { gt: 0 }, status: { in: ["SUBMITTED", "AWAITING_MARKING", "MARKED"] } },
      _sum: { pendingReviewCount: true },
    }),
  ]);
  const byUser = new Map(progress.map((p) => [p.userId, p]));
  const pendingByUser = new Map(pending.map((p) => [p.userId, p._sum.pendingReviewCount ?? 0]));
  const students: AssignmentStudentRow[] = members
    .filter((m) => byUser.has(m.userId))
    .map((m) => {
      const p = byUser.get(m.userId)!;
      return {
        userId: m.userId,
        name: rosterName(m.user.profile),
        view: studentAssignmentView(p, loaded, now),
        scorePercent: p.scorePercent,
        submittedAt: p.submittedAt,
        attemptsCount: p.attemptsCount,
        progressPercent: p.progressPercent,
        countedAttemptId: p.attemptId,
        awaitingMarking: pendingByUser.get(m.userId) ?? 0,
        teacherFeedback: p.teacherFeedback,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name) || a.userId.localeCompare(b.userId));
  const summary = summariseProgress(students.map((s) => ({ status: byUser.get(s.userId)!.status, scorePercent: s.scorePercent })));

  let practice: AssignmentDetail["assignment"]["practice"] = null;
  if (loaded.type === "PRACTICE") {
    const config = practiceConfigSchema.safeParse(loaded.practiceConfig);
    if (config.success) {
      const topics = await db.topic.findMany({ where: { id: { in: config.data.topicIds } }, select: { name: true } });
      practice = {
        questionCount: config.data.questionCount,
        difficulty: config.data.difficulty,
        timeLimitMinutes: config.data.timeLimitSeconds ? Math.round(config.data.timeLimitSeconds / 60) : null,
        topics: topics.map((t) => t.name),
        targeted: config.data.audience === "SELECTED",
      };
    }
  }
  return {
    class: loaded.cls,
    assignment: {
      id: loaded.id,
      title: loaded.title,
      type: loaded.type,
      status: loaded.status,
      window: assignmentWindow(loaded, now),
      subjectName: row.subject.name,
      instructionsHtml: row.instructionsHtml ? trustPersistedHtml(row.instructionsHtml) : null,
      publishedAt: loaded.publishedAt,
      dueAt: loaded.dueAt,
      closesAt: loaded.closesAt,
      allowLateSubmission: loaded.allowLateSubmission,
      maxAttempts: row.maxAttempts,
      scorePolicy: row.scorePolicy,
      lesson: row.lesson,
      assessment: row.assessment,
      practice,
    },
    summary,
    completionPercent: completionPercent(summary),
    students,
  };
}

// =====================================================================================================================
// Per-student actions
// =====================================================================================================================

async function requireStudentProgress(actor: TeachingActor, assignmentId: string, userId: string, write: boolean) {
  const a = await loadAssignmentForTeacher(actor, assignmentId, { write });
  const member = await db.classMember.findUnique({ where: { classId_userId: { classId: a.classId, userId } }, select: { status: true } });
  if (!member || member.status !== "ACTIVE") throw AppError.notFound("This student is not in the class.");
  const progress = await db.assignmentProgress.findUnique({ where: { assignmentId_userId: { assignmentId, userId } }, select: { status: true } });
  if (!progress) throw AppError.notFound("This work is not assigned to the student.");
  return { a, progress };
}

/** Excuses a student from the work (not counted as assigned). Handed-in work cannot be excused. */
export async function excuseStudent(actor: TeachingActor, input: unknown): Promise<void> {
  const data = parseWith(studentProgressRefSchema, input);
  const { progress } = await requireStudentProgress(actor, data.assignmentId, data.userId, true);
  if (progress.status === "SUBMITTED" || progress.status === "LATE") throw AppError.conflict("This student already handed the work in.");
  await db.$transaction(async (tx) => {
    await tx.assignmentProgress.update({ where: { assignmentId_userId: { assignmentId: data.assignmentId, userId: data.userId } }, data: { status: "EXCUSED" } });
    await refreshAssignmentCounters(tx, [data.assignmentId]);
  });
}

/** Saves the teacher's comment to one student (plain text) and tells them. Empty text clears it. */
export async function setStudentFeedback(actor: TeachingActor, input: unknown, options: { now?: Date } = {}): Promise<void> {
  const data = parseWith(assignmentFeedbackSchema, input);
  const { a } = await requireStudentProgress(actor, data.assignmentId, data.userId, false);
  const now = options.now ?? new Date();
  const feedback = data.feedback === "" ? null : data.feedback;
  await db.$transaction(async (tx) => {
    await tx.assignmentProgress.update({
      where: { assignmentId_userId: { assignmentId: data.assignmentId, userId: data.userId } },
      data: { teacherFeedback: feedback, feedbackAt: feedback ? now : null },
    });
    if (feedback) {
      await notifyMany(
        [data.userId],
        {
          type: "assignment.feedback",
          category: "ASSIGNMENT",
          title: `Feedback on ${a.title}`.slice(0, 200),
          body: "Your teacher left a comment on your work.",
          data: { href: `/app/classes/${a.classId}`, entityType: "Assignment", entityId: a.id },
          dedupeKey: `assignment-feedback:${a.id}:${now.getTime()}`,
        },
        { client: tx },
      );
    }
  });
}

// =====================================================================================================================
// One-click practice on a weak topic (§22)
// =====================================================================================================================

/**
 * "Assign practice on this topic": a published PRACTICE assignment (adaptive difficulty) on one topic of the class's
 * subject scope, due in `dueInDays`, for the whole class or only the students currently WEAK / DEVELOPING on it.
 */
export async function assignTopicPractice(actor: TeachingActor, input: unknown, options: { now?: Date } = {}): Promise<{ id: string; students: number }> {
  const data = parseWith(assignTopicPracticeSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  const now = options.now ?? new Date();
  const topic = await db.topic.findUnique({
    where: { id: data.topicId },
    select: { id: true, name: true, syllabus: { select: { subjectId: true, status: true } } },
  });
  if (!topic || !(PUBLISHED_SYLLABUS_STATUSES as readonly string[]).includes(topic.syllabus.status)) throw AppError.notFound("Topic not found.");
  const subjectId = topic.syllabus.subjectId;
  if (cls.subjectId !== null && cls.subjectId !== subjectId) throw AppError.validation({ topicId: ["Choose a topic of the class subject."] });

  let studentIds: string[] | null = null;
  if (data.audience === "WEAK_STUDENTS") {
    const weak = await db.$queryRaw<{ userId: string }[]>`
      SELECT DISTINCT tm."userId"::text AS "userId"
      FROM "TopicMastery" tm
      JOIN "ClassMember" cm ON cm."userId" = tm."userId" AND cm."classId" = ${cls.id}::uuid AND cm."status" = 'ACTIVE'
      JOIN "SubjectEnrollment" e ON e."userId" = tm."userId" AND e."subjectId" = tm."subjectId" AND e."syllabusId" = tm."syllabusId"
      WHERE tm."topicId" = ${topic.id}::uuid AND tm."band"::text = ANY(${[...WEAK_BANDS]}::text[]) AND e."status" IN ('ACTIVE', 'PAUSED')`;
    if (weak.length === 0) throw AppError.validation({ audience: ["No student is weak on this topic right now. Assign it to the whole class instead."] });
    studentIds = weak.map((w) => w.userId);
  }
  const target = await validateTarget(actor, cls, subjectId, {
    classId: cls.id,
    type: "PRACTICE",
    title: "",
    instructions: null,
    subjectId,
    lessonId: null,
    assessmentId: null,
    topicIds: [topic.id],
    questionCount: data.questionCount,
    difficulty: "ADAPTIVE",
    timeLimitMinutes: null,
    dueAt: null,
    closesAt: null,
    allowLateSubmission: true,
    maxAttempts: null,
    scorePolicy: "BEST",
    aiHelp: "HINTS_ONLY",
    publish: "now",
    publishAt: null,
    studentIds: studentIds ?? [],
  });
  const created = await persistAssignment(actor, cls, {
    type: "PRACTICE",
    subjectId,
    title: `Practice: ${topic.name}`.slice(0, 200),
    instructions: null,
    ...target,
    publishedAt: now,
    dueAt: new Date(now.getTime() + data.dueInDays * 86_400_000),
    closesAt: null,
    allowLateSubmission: true,
    maxAttempts: null,
    scorePolicy: "BEST",
    aiHelp: "HINTS_ONLY",
  }, now);
  const students = await db.assignmentProgress.count({ where: { assignmentId: created.id } });
  return { id: created.id, students };
}

// =====================================================================================================================
// Jobs
// =====================================================================================================================

const publishedPayloadSchema = z.object({ assignmentId: z.uuid(), publishedAt: z.iso.datetime() });

/** Handler of {@link ASSIGNMENT_PUBLISHED_JOB}: notifies the targeted students when scheduled work goes live. */
export async function runAssignmentPublished(payload: z.infer<typeof publishedPayloadSchema>): Promise<{ notified: number } | { skipped: string }> {
  const a = await db.assignment.findUnique({ where: { id: payload.assignmentId }, select: { id: true, classId: true, title: true, status: true, publishedAt: true } });
  if (!a || a.status !== "PUBLISHED" || !a.publishedAt) return { skipped: "not_published" };
  if (a.publishedAt.toISOString() !== new Date(payload.publishedAt).toISOString()) return { skipped: "superseded" };
  const targets = await db.$queryRaw<{ userId: string }[]>`
    SELECT p."userId"::text AS "userId" FROM "AssignmentProgress" p
    JOIN "ClassMember" cm ON cm."classId" = ${a.classId}::uuid AND cm."userId" = p."userId" AND cm."status" = 'ACTIVE'
    WHERE p."assignmentId" = ${a.id}::uuid`;
  await notifyAssignmentStudents(db, a, targets.map((t) => t.userId));
  return { notified: targets.length };
}

/**
 * Handler of {@link CLOSE_DUE_ASSIGNMENTS_JOB}: closes published work whose close time has passed (or whose due date
 * passed when late work is not allowed), through {@link closeAssignmentNow}. Uses Assignment_published_due_idx.
 */
export async function closeDueAssignments(options: { now?: Date; limit?: number } = {}): Promise<{ closed: number }> {
  const now = options.now ?? new Date();
  const rows = await db.assignment.findMany({
    where: {
      status: "PUBLISHED",
      OR: [{ closesAt: { lte: now } }, { allowLateSubmission: false, dueAt: { lte: now } }],
    },
    select: { id: true },
    orderBy: { dueAt: "asc" },
    take: Math.min(500, Math.max(1, options.limit ?? 100)),
  });
  let closed = 0;
  for (const { id } of rows) {
    try {
      await closeAssignmentNow(id, now);
      closed += 1;
    } catch (error) {
      logger.error("teaching: closing a due assignment failed", { assignmentId: id, err: error });
    }
  }
  return { closed };
}

/**
 * Registers the teaching jobs with the worker. Call from `src/worker/handlers.ts` `registerAllJobs()` (shared file):
 * `registerTeachingJobs(); // teaching.assignmentPublished (notifications) + teaching.closeDueAssignments (15 min)`.
 */
export function registerTeachingJobs(): void {
  registerJobHandler(ASSIGNMENT_PUBLISHED_JOB, publishedPayloadSchema, (payload) => runAssignmentPublished(payload), { queue: "notifications", maxAttempts: 5 });
  registerJobHandler(CLOSE_DUE_ASSIGNMENTS_JOB, z.looseObject({}), () => closeDueAssignments(), { queue: "default", maxAttempts: 3 });
  registerRecurringJob(CLOSE_DUE_ASSIGNMENTS_JOB, 15, CLOSE_DUE_ASSIGNMENTS_JOB, { offsetMinutes: 4 });
}
