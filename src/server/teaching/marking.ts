import "server-only";
import { Prisma, type AttemptMode, type AttemptStatus, type MarkingSource, type MarkingStatus } from "@/generated/prisma/client";
import type { PresentedQuestion, PresentedReveal, QuestionResponse } from "@/components/questions/types";
import { toAnswerReveal, toStudentView } from "@/lib/questions";
import { attemptResultsHref, getAttemptQuestionScope, recordMarkingDecision, type MarkingDecisionResult } from "@/server/attempts";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { createNotification } from "@/server/notifications";
import type { AttemptFeedbackJson } from "@/server/marking";
import { loadQuestionAssets, loadRevealAssets, normalizeResponse, partResultsFrom, presentQuestion, presentReveal } from "@/server/practice";
import { getQuestionsForAttempt } from "@/server/questions";
import { assertActiveMember, auditClassStudentView, isUuid, loadClassForTeacher, type TeachingActor } from "./access";
import { refreshAssignmentCounters } from "./assignment-progress";
import { rosterName } from "./core";
import { markAnswerSchema } from "./schemas";
import { parseWith } from "./validation";

/**
 * The teacher's marking queue (§22, §9 "manually / AI-assisted marked"; ARCHITECTURE §6.5): answers of ASSIGNMENT
 * work that wait for a person — NEEDS_REVIEW (low-confidence AI, MANUAL questions, ambiguous numbers) and answers
 * still queued for AI marking — for students who are ACTIVE in a class the teacher teaches. The teacher sees the
 * question, the mark scheme / model answer, the student's answer and the AI's suggestion (if any), then awards marks
 * with feedback: a TEACHER decision recorded through the attempt engine (`recordMarkingDecision`), which re-scores the
 * attempt, updates assignment progress and mastery and tells the student once everything is marked.
 *
 * Teachers may also change any other mark of such an attempt (an auto- or AI-marked answer); changing a final mark
 * needs a reason, which the student sees. Opening a student's answers is audited (`student.view`).
 */

const QUEUE_STATUSES: readonly AttemptStatus[] = ["SUBMITTED", "AWAITING_MARKING", "MARKED"];
const FINAL_STATUSES: readonly MarkingStatus[] = ["AUTO_MARKED", "AI_MARKED", "TEACHER_MARKED", "SELF_ASSESSED"];

export interface MarkingQueueItem {
  attemptId: string;
  assignmentId: string;
  assignmentTitle: string;
  classId: string;
  className: string;
  studentUserId: string;
  studentName: string;
  submittedAt: Date | null;
  /** Answers waiting for marking in this attempt. */
  pendingAnswers: number;
  attemptStatus: AttemptStatus;
}

function encodeCursor(row: { submittedAt: Date | null; attemptId: string }): string {
  return Buffer.from(JSON.stringify({ t: row.submittedAt?.getTime() ?? 0, id: row.attemptId })).toString("base64url");
}

function decodeCursor(cursor: string | null | undefined): { t: Date; id: string } | null {
  if (!cursor) return null;
  try {
    const value = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as { t?: unknown; id?: unknown };
    if (typeof value.t !== "number" || !isUuid(value.id)) return null;
    return { t: new Date(value.t), id: value.id };
  } catch {
    return null;
  }
}

/**
 * Attempts with answers to mark in the actor's classes (oldest submission first, cursor-paginated). Optional class
 * filter. Uses the partial index on AssessmentAttempt(pendingReviewCount > 0).
 */
export async function listMarkingQueue(
  actor: TeachingActor,
  options: { classId?: string | null; cursor?: string | null; limit?: number } = {},
): Promise<{ items: MarkingQueueItem[]; nextCursor: string | null; totalPendingAnswers: number }> {
  const limit = Math.min(50, Math.max(1, options.limit ?? 25));
  const classId = options.classId && isUuid(options.classId) ? options.classId : null;
  if (options.classId && !classId) throw AppError.notFound("Class not found.");
  const after = decodeCursor(options.cursor);
  const scope = Prisma.sql`
    FROM "AssessmentAttempt" aa
    JOIN "Assignment" a ON a."id" = aa."assignmentId"
    JOIN "Class" c ON c."id" = a."classId"
    LEFT JOIN "School" s ON s."id" = c."schoolId"
    JOIN "ClassTeacher" ct ON ct."classId" = c."id" AND ct."userId" = ${actor.userId}::uuid AND ct."removedAt" IS NULL
    JOIN "ClassMember" cm ON cm."classId" = c."id" AND cm."userId" = aa."userId" AND cm."status" = 'ACTIVE'
    WHERE aa."pendingReviewCount" > 0 AND aa."status"::text = ANY(${[...QUEUE_STATUSES]}::text[])
      AND (c."schoolId" IS NULL OR s."status" IN ('ACTIVE', 'PENDING_VERIFICATION'))
      AND (${classId}::uuid IS NULL OR c."id" = ${classId}::uuid)`;
  const [rows, totals] = await Promise.all([
    db.$queryRaw<
      { attemptId: string; assignmentId: string; title: string; classId: string; className: string; userId: string; submittedAt: Date | null; pending: number; status: AttemptStatus }[]
    >`
      SELECT aa."id"::text AS "attemptId", a."id"::text AS "assignmentId", a."title", c."id"::text AS "classId", c."name" AS "className",
        aa."userId"::text AS "userId", aa."submittedAt", aa."pendingReviewCount"::int AS pending, aa."status"::text AS status
      ${scope}
        AND (${after?.t ?? null}::timestamptz IS NULL OR (coalesce(aa."submittedAt", 'epoch'::timestamptz), aa."id") > (${after?.t ?? null}::timestamptz, ${after?.id ?? null}::uuid))
      ORDER BY coalesce(aa."submittedAt", 'epoch'::timestamptz) ASC, aa."id" ASC
      LIMIT ${limit + 1}`,
    db.$queryRaw<{ total: number }[]>`SELECT coalesce(sum(aa."pendingReviewCount"), 0)::int AS total ${scope}`,
  ]);
  const page = rows.slice(0, limit);
  const profiles = page.length
    ? await db.profile.findMany({ where: { userId: { in: [...new Set(page.map((r) => r.userId))] } }, select: { userId: true, displayName: true, firstName: true, lastName: true } })
    : [];
  const names = new Map(profiles.map((p) => [p.userId, rosterName(p)]));
  const items = page.map((row) => ({
    attemptId: row.attemptId,
    assignmentId: row.assignmentId,
    assignmentTitle: row.title,
    classId: row.classId,
    className: row.className,
    studentUserId: row.userId,
    studentName: names.get(row.userId) ?? "Student",
    submittedAt: row.submittedAt,
    pendingAnswers: row.pending,
    attemptStatus: row.status,
  }));
  const last = items[items.length - 1];
  return { items, nextCursor: rows.length > limit && last ? encodeCursor(last) : null, totalPendingAnswers: totals[0]?.total ?? 0 };
}

/** Answers waiting for the actor's marking across their classes (the navigation badge). One aggregate query. */
export async function countAwaitingMarking(actor: TeachingActor): Promise<number> {
  const rows = await db.$queryRaw<{ total: number }[]>`
    SELECT coalesce(sum(aa."pendingReviewCount"), 0)::int AS total
    FROM "AssessmentAttempt" aa
    JOIN "Assignment" a ON a."id" = aa."assignmentId"
    JOIN "Class" c ON c."id" = a."classId"
    LEFT JOIN "School" s ON s."id" = c."schoolId"
    JOIN "ClassTeacher" ct ON ct."classId" = c."id" AND ct."userId" = ${actor.userId}::uuid AND ct."removedAt" IS NULL
    JOIN "ClassMember" cm ON cm."classId" = c."id" AND cm."userId" = aa."userId" AND cm."status" = 'ACTIVE'
    WHERE aa."pendingReviewCount" > 0 AND aa."status"::text = ANY(${[...QUEUE_STATUSES]}::text[])
      AND (c."schoolId" IS NULL OR s."status" IN ('ACTIVE', 'PENDING_VERIFICATION'))`;
  return rows[0]?.total ?? 0;
}

export interface MarkingHistoryEntry {
  source: MarkingSource;
  marksAwarded: number;
  previousMarksAwarded: number | null;
  by: string | null;
  reason: string | null;
  createdAt: Date;
}

export interface AiSuggestion {
  marksAwarded: number;
  confidence: number | null;
  comment: string | null;
  points: { pointId: string; awarded: number; evidence?: string }[];
  createdAt: Date;
}

export interface MarkingAnswer {
  position: number;
  marksAvailable: number;
  marksAwarded: number | null;
  markingStatus: MarkingStatus;
  answered: boolean;
  /** Waiting for a person (NEEDS_REVIEW) or still queued for AI marking. */
  needsMarking: boolean;
  /** Changing this mark needs a reason (it is already final). */
  isFinal: boolean;
  question: PresentedQuestion | null;
  response: QuestionResponse | null;
  /** Mark scheme, model answer, method marks, correct answer (teacher only). */
  reveal: PresentedReveal | null;
  comment: string | null;
  aiSuggestion: AiSuggestion | null;
  history: MarkingHistoryEntry[];
}

export interface MarkingView {
  attempt: {
    id: string;
    mode: AttemptMode;
    status: AttemptStatus;
    submittedAt: Date | null;
    percentage: number | null;
    marksAwarded: number | null;
    totalMarks: number | null;
    pendingReviewCount: number;
  };
  assignment: { id: string; title: string };
  class: { id: string; name: string };
  student: { userId: string; name: string };
  answers: MarkingAnswer[];
}

async function loadMarkableAttempt(actor: TeachingActor, attemptId: string) {
  if (!isUuid(attemptId)) throw AppError.notFound("Attempt not found.");
  const attempt = await db.assessmentAttempt.findUnique({
    where: { id: attemptId },
    select: {
      id: true,
      userId: true,
      mode: true,
      status: true,
      submittedAt: true,
      percentage: true,
      marksAwarded: true,
      totalMarks: true,
      pendingReviewCount: true,
      assignment: { select: { id: true, title: true, classId: true } },
    },
  });
  // Only assignment work is reachable here: a student's own practice is never shown to a teacher.
  if (!attempt || !attempt.assignment) throw AppError.notFound("Attempt not found.");
  const cls = await loadClassForTeacher(actor, attempt.assignment.classId);
  await assertActiveMember(cls.id, attempt.userId);
  return { attempt, assignment: attempt.assignment, cls };
}

function readPoints(value: Prisma.JsonValue | null): AiSuggestion["points"] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) return [];
    const point = item as { pointId?: unknown; awarded?: unknown; evidence?: unknown };
    if (typeof point.pointId !== "string" || typeof point.awarded !== "number") return [];
    return [{ pointId: point.pointId, awarded: point.awarded, ...(typeof point.evidence === "string" ? { evidence: point.evidence } : {}) }];
  });
}

function readComment(value: Prisma.JsonValue | null): string | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const comment = (value as { comment?: unknown }).comment;
  return typeof comment === "string" ? comment : null;
}

/**
 * Everything needed to mark one student's attempt at assignment work (module header). NOT_FOUND for non-assignment
 * attempts and students who are not ACTIVE in the class; FORBIDDEN when the actor does not teach the class.
 */
export async function getAttemptForMarking(actor: TeachingActor, attemptId: string): Promise<MarkingView> {
  const { attempt, assignment, cls } = await loadMarkableAttempt(actor, attemptId);
  await auditClassStudentView(actor, { classId: cls.id, schoolId: cls.schoolId, studentUserId: attempt.userId, via: cls.via, surface: "teacher.marking" });
  const scope = await getAttemptQuestionScope(attempt.id);
  if (!scope) throw AppError.notFound("Attempt not found.");
  const [slots, markings, profile] = await Promise.all([
    db.questionAttempt.findMany({
      where: { attemptId: attempt.id },
      orderBy: { position: "asc" },
      select: { position: true, questionId: true, marksAvailable: true, marksAwarded: true, markingStatus: true, response: true, feedback: true },
    }),
    db.questionAttemptMarking.findMany({
      where: { attemptId: attempt.id },
      orderBy: { createdAt: "asc" },
      select: {
        position: true,
        source: true,
        marksAwarded: true,
        previousMarksAwarded: true,
        confidence: true,
        reason: true,
        points: true,
        feedback: true,
        createdAt: true,
        markedBy: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
      },
    }),
    db.profile.findUnique({ where: { userId: attempt.userId }, select: { displayName: true, firstName: true, lastName: true } }),
  ]);
  const questions = await getQuestionsForAttempt([...new Set(slots.map((s) => s.questionId))], {
    ...(scope.syllabusId ? { syllabusId: scope.syllabusId } : {}),
    ...(scope.tenancy ? { tenancy: scope.tenancy } : {}),
  });
  const byId = new Map(questions.map((q) => [q.id, q]));
  const views = slots.map((slot) => {
    const question = byId.get(slot.questionId);
    if (!question) return { view: null, reveal: null };
    try {
      return { view: toStudentView(question, { shuffleSeed: `${attempt.id}:${slot.position}` }), reveal: toAnswerReveal(question) };
    } catch (error) {
      logger.error("teaching: question failed validation in the marking view", { questionId: question.id, err: error });
      return { view: null, reveal: null };
    }
  });
  const [questionAssets, revealAssets] = await Promise.all([
    loadQuestionAssets(views.flatMap((v) => (v.view ? [v.view] : []))),
    loadRevealAssets(views.map((v) => v.reveal)),
  ]);

  const answers: MarkingAnswer[] = slots.map((slot, index) => {
    const { view, reveal } = views[index] ?? { view: null, reveal: null };
    const forSlot = markings.filter((m) => m.position === slot.position);
    const ai = [...forSlot].reverse().find((m) => m.source === "AI") ?? null;
    const answered = slot.response !== null;
    return {
      position: slot.position,
      marksAvailable: slot.marksAvailable,
      marksAwarded: slot.marksAwarded,
      markingStatus: slot.markingStatus,
      answered,
      needsMarking: answered && (slot.markingStatus === "NEEDS_REVIEW" || slot.markingStatus === "PENDING"),
      isFinal: FINAL_STATUSES.includes(slot.markingStatus),
      question: view ? presentQuestion(view, questionAssets) : null,
      response: view ? normalizeResponse(view.type, slot.response) : null,
      reveal: reveal ? presentReveal(reveal, partResultsFrom(slot.feedback as AttemptFeedbackJson | null), revealAssets) : null,
      comment: readComment(slot.feedback),
      aiSuggestion: ai
        ? { marksAwarded: ai.marksAwarded, confidence: ai.confidence, comment: readComment(ai.feedback), points: readPoints(ai.points), createdAt: ai.createdAt }
        : null,
      history: forSlot.map((m) => ({
        source: m.source,
        marksAwarded: m.marksAwarded,
        previousMarksAwarded: m.previousMarksAwarded,
        by: m.markedBy ? rosterName(m.markedBy.profile) : null,
        reason: m.reason,
        createdAt: m.createdAt,
      })),
    };
  });

  return {
    attempt: {
      id: attempt.id,
      mode: attempt.mode,
      status: attempt.status,
      submittedAt: attempt.submittedAt,
      percentage: attempt.percentage,
      marksAwarded: attempt.marksAwarded,
      totalMarks: attempt.totalMarks,
      pendingReviewCount: attempt.pendingReviewCount,
    },
    assignment: { id: assignment.id, title: assignment.title },
    class: { id: cls.id, name: cls.name },
    student: { userId: attempt.userId, name: rosterName(profile) },
    answers,
  };
}

/**
 * Records the teacher's mark for one answer (QuestionAttemptMarking source TEACHER, status TEACHER_MARKED) through the
 * attempt engine, which re-scores the attempt. Only for submitted work; changing a final mark needs a reason.
 */
export async function markAnswer(actor: TeachingActor, input: unknown, options: { now?: Date } = {}): Promise<MarkingDecisionResult> {
  const data = parseWith(markAnswerSchema, input);
  const { attempt, assignment } = await loadMarkableAttempt(actor, data.attemptId);
  if (attempt.status === "IN_PROGRESS") throw AppError.conflict("The student is still working on this. Mark it after they hand it in.");
  if (attempt.status === "ABANDONED" || attempt.status === "EXPIRED") throw AppError.conflict("This attempt was closed without answers.");
  const slot = await db.questionAttempt.findUnique({
    where: { attemptId_position: { attemptId: attempt.id, position: data.position } },
    select: { marksAvailable: true, markingStatus: true, response: true },
  });
  if (!slot) throw AppError.notFound("Question not found in this attempt.");
  if (slot.response === null) throw AppError.validation({ marksAwarded: ["This question was not answered, so there is nothing to mark."] });
  if (data.marksAwarded > slot.marksAvailable) throw AppError.validation({ marksAwarded: [`Award at most ${slot.marksAvailable} marks.`] });
  if (FINAL_STATUSES.includes(slot.markingStatus) && !data.reason) {
    throw AppError.validation({ reason: ["Say why you are changing this mark (the student will see it)."] });
  }
  const result = await recordMarkingDecision(
    {
      attemptId: attempt.id,
      position: data.position,
      source: "TEACHER",
      resultingStatus: "TEACHER_MARKED",
      marksAwarded: data.marksAwarded,
      markedById: actor.userId,
      ...(data.comment ? { comment: data.comment } : {}),
      ...(data.reason ? { reason: data.reason } : {}),
    },
    options.now ? { now: options.now } : {},
  );
  await refreshAssignmentCounters(db, [assignment.id]);
  // The engine notifies when an attempt first becomes MARKED; work that was already MARKED with provisional answers
  // gets its own "your teacher finished marking" notice once nothing waits any more.
  if (attempt.pendingReviewCount > 0 && result.pendingReviewCount === 0) {
    await createNotification(attempt.userId, {
      type: "assignment.marked",
      category: "ASSIGNMENT",
      title: `${assignment.title}: marking finished`.slice(0, 200),
      body: "Your teacher finished marking your answers. Your score is now final.",
      data: { href: attemptResultsHref(attempt.mode, attempt.id), entityType: "AssessmentAttempt", entityId: attempt.id },
      dedupeKey: `assignment-marked:${attempt.id}`,
    });
  }
  return result;
}
