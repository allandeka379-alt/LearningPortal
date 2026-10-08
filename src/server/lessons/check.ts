import "server-only";
import { z } from "zod";
import { startAttempt } from "@/server/attempts";
import { EntitlementRequiredError } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { getSessionState, type SessionSlot } from "@/server/practice";
import { resolveLessonAccess, type LessonAccess, type LessonActor } from "./access";
import { countLessonQuestions } from "./service";

/**
 * A lesson's practice questions (§8 "practice questions", ARCHITECTURE §4.6): a LESSON_CHECK attempt of the attempt
 * engine over the lesson's linked questions (LessonQuestion order), with instant feedback through the practice
 * service (`answerPracticeQuestion` / `revealPracticeHint` / `selfAssessPracticeAnswer`, which act on the student's own
 * attempts only). Answers update topic mastery like any practice; the attempt closes itself after the last question.
 *
 * The engine applies no plan gate to LESSON_CHECK ("lesson access is the lesson's"), so this module checks the lesson
 * first: a locked lesson never starts a check and never shows its questions.
 */

export type LessonCheckState =
  /** Locked lesson, no published questions, or a lesson from another subject (practise it in its own subject). */
  | { status: "UNAVAILABLE"; questionCount: number }
  | { status: "NOT_STARTED"; questionCount: number }
  | {
      status: "IN_PROGRESS";
      attemptId: string;
      questionCount: number;
      answeredCount: number;
      /** The next question to answer, presented (no answers). Null when every question waits for marking. */
      current: SessionSlot | null;
    }
  | {
      status: "COMPLETED";
      attemptId: string;
      questionCount: number;
      answeredCount: number;
      correctCount: number;
      marksAwarded: number | null;
      totalMarks: number | null;
      /** 0-100 of the answered questions' marks; null when nothing was marked. */
      percentage: number | null;
      /** Some answers wait for marking; the score is provisional. */
      provisional: boolean;
      completedAt: Date | null;
      /** The questions can be taken again (still published, subject on the student's list). */
      canRetry: boolean;
    };

/** Enrolment states in which new practice can start (a dropped or completed subject is added back first). */
const PRACTISABLE = new Set(["ACTIVE", "PAUSED"]);

function checkable(access: LessonAccess): boolean {
  if (!access.open) return false;
  // The engine runs a lesson check in the lesson's home subject only.
  if (access.lesson.subjectId !== null && access.lesson.subjectId !== access.subjectId) return false;
  return access.enrollmentStatus !== null && PRACTISABLE.has(access.enrollmentStatus);
}

async function latestAttempt(userId: string, access: LessonAccess) {
  return db.assessmentAttempt.findFirst({
    where: { userId, subjectId: access.subjectId, mode: "LESSON_CHECK", lessonId: access.lesson.id, status: { notIn: ["ABANDONED", "EXPIRED"] } },
    orderBy: { startedAt: "desc" },
    select: {
      id: true,
      status: true,
      questionCount: true,
      answeredCount: true,
      correctCount: true,
      marksAwarded: true,
      totalMarks: true,
      percentage: true,
      pendingReviewCount: true,
      submittedAt: true,
    },
  });
}

/**
 * The state of a lesson's practice questions for the reader: not started, the current question of the open check,
 * or the latest result.
 *
 * @throws AppError NOT_FOUND | FORBIDDEN (as {@link resolveLessonAccess})
 */
export async function getLessonCheck(actor: LessonActor, lessonId: string, options: { topicId?: string | null } = {}): Promise<LessonCheckState> {
  const access = await resolveLessonAccess(actor, lessonId, { topicId: options.topicId ?? null });
  if (!access.open) return { status: "UNAVAILABLE", questionCount: 0 };
  const [questionCount, attempt] = await Promise.all([countLessonQuestions(access.lesson.id), latestAttempt(actor.userId, access)]);
  if (attempt?.status === "IN_PROGRESS") {
    const session = await getSessionState(actor, attempt.id);
    return { status: "IN_PROGRESS", attemptId: attempt.id, questionCount: session.questionCount, answeredCount: session.markedCount, current: session.current };
  }
  if (attempt) {
    return {
      status: "COMPLETED",
      attemptId: attempt.id,
      questionCount: attempt.questionCount,
      answeredCount: attempt.answeredCount,
      correctCount: attempt.correctCount,
      marksAwarded: attempt.marksAwarded,
      totalMarks: attempt.totalMarks,
      percentage: attempt.percentage,
      provisional: attempt.pendingReviewCount > 0 || attempt.status === "AWAITING_MARKING",
      completedAt: attempt.submittedAt,
      canRetry: questionCount > 0 && checkable(access),
    };
  }
  if (questionCount === 0 || !checkable(access)) return { status: "UNAVAILABLE", questionCount };
  return { status: "NOT_STARTED", questionCount };
}

export const startLessonCheckSchema = z.strictObject({
  /** Client idempotency key (double taps start one attempt). */
  idempotencyKey: z
    .string()
    .regex(/^[A-Za-z0-9_-]{8,64}$/)
    .optional(),
});
export type StartLessonCheckInput = z.input<typeof startLessonCheckSchema>;

/**
 * Starts the lesson's practice questions, or resumes the open check. A finished check can be taken again (a new
 * attempt).
 *
 * @throws AppError NOT_FOUND (lesson, or no published questions) | ENTITLEMENT_REQUIRED (locked lesson) | VALIDATION
 *         (subject not on the student's list) | BAD_REQUEST (lesson from another subject) | FORBIDDEN
 */
export async function startLessonCheck(actor: LessonActor, lessonId: string, input: StartLessonCheckInput = {}): Promise<{ attemptId: string; resumed: boolean }> {
  const parsed = startLessonCheckSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const access = await resolveLessonAccess(actor, lessonId);
  if (!access.open) throw new EntitlementRequiredError("lessons.full");
  if (access.enrollmentStatus === null || !PRACTISABLE.has(access.enrollmentStatus)) {
    throw AppError.validation({ subjectId: ["Add this subject to your subjects to answer its practice questions."] });
  }
  if (access.lesson.subjectId !== null && access.lesson.subjectId !== access.subjectId) {
    throw new AppError("BAD_REQUEST", "This lesson's practice questions are available in its own subject.");
  }
  if ((await countLessonQuestions(access.lesson.id)) === 0) throw AppError.notFound("This lesson has no practice questions yet.");

  const open = await latestAttempt(actor.userId, access);
  if (open?.status === "IN_PROGRESS") return { attemptId: open.id, resumed: true };

  const started = await startAttempt(
    { userId: actor.userId, roles: actor.roles, ...(actor.channel ? { channel: actor.channel } : {}), ...(actor.timeZone ? { timeZone: actor.timeZone } : {}) },
    { mode: "LESSON_CHECK", subjectId: access.subjectId, lessonId: access.lesson.id, ...(parsed.data.idempotencyKey ? { idempotencyKey: parsed.data.idempotencyKey } : {}) },
  );
  return { attemptId: started.attempt.id, resumed: started.resumed };
}
