import "server-only";
import { z } from "zod";
import type {
  AbilityLevel,
  ActivityChannel,
  AssessmentFeedbackTiming,
  AssessmentKind,
  AssignmentScorePolicy,
  AttemptMode,
  AttemptStatus,
  Prisma,
  QuestionAttempt,
} from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE, isValidTimeZone } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import type { QuestionTenancy } from "@/server/questions";
import { readAttemptAnalysis, readAttemptConfig, type AttemptAnalysisJson, type AttemptConfig, type FeedbackMode } from "./policy";
import type { LearnerActor } from "./types";

/**
 * Shared plumbing of the attempt engine: actor checks, the attempt "context" every operation loads (attempt row +
 * assessment + assignment window + pinned enrolment + time zone), and the per-attempt row lock.
 *
 * Authorization (CLAUDE.md rule 3): every operation requires `learn.study` at scope "all" (students) and acts only on
 * the actor's OWN attempts; another student's attempt is reported as NOT_FOUND (its existence is not disclosed).
 */

export const uuidSchema = z.uuid();
export const positionSchema = z.int().min(1).max(32_767);

/** Throws FORBIDDEN unless the actor may study (STUDENT). */
export function assertLearner(actor: LearnerActor): void {
  if (!uuidSchema.safeParse(actor.userId).success) throw AppError.unauthenticated();
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) {
    throw AppError.forbidden("Only students can take practice sessions and exams.");
  }
}

/** AssessmentAttempt.channel for the actor's transport (§30). */
export function activityChannel(actor: Pick<LearnerActor, "channel">): ActivityChannel {
  switch (actor.channel) {
    case "whatsapp":
      return "WHATSAPP";
    case "api":
      return "API";
    default:
      return "WEB";
  }
}

/** Parses with Zod and maps failures to AppError VALIDATION (field errors). */
export function parseInput<T>(schema: z.ZodType<T>, input: unknown, message?: string): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error, message);
  return result.data;
}

export function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

/**
 * Locks the attempt row for the rest of the transaction (serialises concurrent answers / submits of ONE attempt:
 * double taps, two tabs, the auto-submit job). Returns false when the attempt does not exist.
 */
export async function lockAttempt(tx: DbClient, attemptId: string): Promise<boolean> {
  const rows = await tx.$queryRaw<{ id: string }[]>`SELECT "id"::text AS "id" FROM "AssessmentAttempt" WHERE "id" = ${attemptId}::uuid FOR UPDATE`;
  return rows.length > 0;
}

const CONTEXT_SELECT = {
  id: true,
  userId: true,
  subjectId: true,
  mode: true,
  status: true,
  assessmentId: true,
  assignmentId: true,
  topicId: true,
  lessonId: true,
  dailyQuestionId: true,
  startedAt: true,
  deadlineAt: true,
  submittedAt: true,
  lastSavedAt: true,
  timeLimitSeconds: true,
  timeSpentSeconds: true,
  lateSync: true,
  questionCount: true,
  lastPosition: true,
  config: true,
  analysis: true,
  user: { select: { profile: { select: { timezone: true } } } },
  subject: { select: { name: true, qualificationId: true } },
  assessment: {
    select: {
      id: true,
      title: true,
      kind: true,
      instructions: true,
      feedbackTiming: true,
      allowNavigation: true,
      gradeSchemeId: true,
      schoolId: true,
      ownerUserId: true,
    },
  },
  assignment: { select: { closesAt: true, dueAt: true, scorePolicy: true, allowLateSubmission: true } },
} as const satisfies Prisma.AssessmentAttemptSelect;

/** Everything an attempt operation needs about the attempt (one row + its definition + the pinned enrolment). */
export interface AttemptContext {
  id: string;
  userId: string;
  subjectId: string;
  subjectName: string;
  qualificationId: string;
  mode: AttemptMode;
  status: AttemptStatus;
  assessmentId: string | null;
  assignmentId: string | null;
  topicId: string | null;
  lessonId: string | null;
  dailyQuestionId: string | null;
  startedAt: Date;
  deadlineAt: Date | null;
  submittedAt: Date | null;
  lastSavedAt: Date;
  timeLimitSeconds: number | null;
  timeSpentSeconds: number;
  lateSync: boolean;
  questionCount: number;
  lastPosition: number | null;
  config: AttemptConfig;
  feedback: FeedbackMode;
  /** The stored analysis document (null when absent or unreadable); carries `mastery` while a session is open. */
  storedAnalysis: AttemptAnalysisJson | null;
  assessment: {
    id: string;
    title: string;
    kind: AssessmentKind;
    instructions: string | null;
    feedbackTiming: AssessmentFeedbackTiming;
    allowNavigation: boolean;
    gradeSchemeId: string | null;
    schoolId: string | null;
    ownerUserId: string | null;
  } | null;
  assignment: { closesAt: Date | null; dueAt: Date | null; scorePolicy: AssignmentScorePolicy; allowLateSubmission: boolean } | null;
  /** The pinned enrolment (null only if the enrolment row vanished, which the schema never does). */
  enrollment: {
    syllabusId: string;
    routeId: string | null;
    abilityLevel: AbilityLevel | null;
    routeGradeSchemeId: string | null;
    syllabusGradeSchemeId: string | null;
  } | null;
  timeZone: string;
  /** Private question pools the attempt may read (the assessment's own tenant); undefined = platform only. */
  tenancy: QuestionTenancy | undefined;
}

/** Loads an attempt's context, or null when it does not exist. */
export async function loadAttemptContext(client: DbClient, attemptId: string): Promise<AttemptContext | null> {
  if (!uuidSchema.safeParse(attemptId).success) return null;
  const row = await client.assessmentAttempt.findUnique({ where: { id: attemptId }, select: CONTEXT_SELECT });
  if (!row) return null;
  const enrollment = await client.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: row.userId, subjectId: row.subjectId } },
    select: {
      syllabusId: true,
      routeId: true,
      abilityLevel: true,
      route: { select: { gradeSchemeId: true } },
      syllabus: { select: { gradeSchemeId: true } },
    },
  });
  const config = readAttemptConfig(row.config, row.mode);
  const tenancy: QuestionTenancy | undefined = row.assessment?.schoolId
    ? { schoolIds: [row.assessment.schoolId] }
    : row.assessment?.ownerUserId
      ? { ownerUserIds: [row.assessment.ownerUserId] }
      : undefined;
  return {
    id: row.id,
    userId: row.userId,
    subjectId: row.subjectId,
    subjectName: row.subject.name,
    qualificationId: row.subject.qualificationId,
    mode: row.mode,
    status: row.status,
    assessmentId: row.assessmentId,
    assignmentId: row.assignmentId,
    topicId: row.topicId,
    lessonId: row.lessonId,
    dailyQuestionId: row.dailyQuestionId,
    startedAt: row.startedAt,
    deadlineAt: row.deadlineAt,
    submittedAt: row.submittedAt,
    lastSavedAt: row.lastSavedAt,
    timeLimitSeconds: row.timeLimitSeconds,
    timeSpentSeconds: row.timeSpentSeconds,
    lateSync: row.lateSync,
    questionCount: row.questionCount,
    lastPosition: row.lastPosition,
    config,
    feedback: config.feedback,
    storedAnalysis: readAttemptAnalysis(row.analysis),
    assessment: row.assessment,
    assignment: row.assignment,
    enrollment: enrollment
      ? {
          syllabusId: enrollment.syllabusId,
          routeId: enrollment.routeId,
          abilityLevel: enrollment.abilityLevel,
          routeGradeSchemeId: enrollment.route?.gradeSchemeId ?? null,
          syllabusGradeSchemeId: enrollment.syllabus.gradeSchemeId,
        }
      : null,
    timeZone: safeZone(row.user.profile?.timezone),
    tenancy,
  };
}

/**
 * The actor's own attempt context. Another student's attempt (or an unknown id) is NOT_FOUND so existence is never
 * disclosed (§39).
 */
export async function requireOwnAttempt(client: DbClient, actor: LearnerActor, attemptId: string): Promise<AttemptContext> {
  const context = await loadAttemptContext(client, attemptId);
  if (!context || context.userId !== actor.userId) throw AppError.notFound("Attempt not found.");
  return context;
}

/** Where an attempt's questions may be read from: its pinned syllabus and private question pools. */
export interface AttemptQuestionScope {
  /** The student's pinned syllabus for the attempt's subject (null when the enrolment row vanished). */
  syllabusId: string | null;
  /** Private question pools the attempt may read (the assessment's own tenant); undefined = platform only. */
  tenancy: QuestionTenancy | undefined;
}

/**
 * Public read for other domains (e.g. the teacher's marking view) that must load an attempt's questions exactly as the
 * student saw them, without depending on the engine's internal context shape. Authorization is the caller's job.
 * Returns null when the attempt does not exist.
 */
export async function getAttemptQuestionScope(attemptId: string, client: DbClient = db): Promise<AttemptQuestionScope | null> {
  const context = await loadAttemptContext(client, attemptId);
  if (!context) return null;
  return { syllabusId: context.enrollment?.syllabusId ?? null, tenancy: context.tenancy };
}

/** The assignment window end used for AFTER_CLOSE reveals and late-submission rules. */
export function assignmentWindowEnd(context: Pick<AttemptContext, "assignment">): Date | null {
  return context.assignment ? (context.assignment.closesAt ?? context.assignment.dueAt) : null;
}

/** QuestionAttempt rows of an attempt in position order. */
export function loadSlots(client: DbClient, attemptId: string): Promise<QuestionAttempt[]> {
  return client.questionAttempt.findMany({ where: { attemptId }, orderBy: { position: "asc" } });
}

export const TX_OPTIONS = { maxWait: 10_000, timeout: 30_000 } as const;
