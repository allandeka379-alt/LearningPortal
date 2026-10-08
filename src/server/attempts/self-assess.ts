import "server-only";
import { z } from "zod";
import { safeParseAnswerSpec, type MarkScheme } from "@/lib/questions";
import { db } from "@/server/db";
import { aiProcessingRefusedFor } from "@/server/family/consent-gate";
import { isFeatureEnabled } from "@/server/features";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { getQuestionsForAttempt } from "@/server/questions";
import { scaleAwarded } from "./analysis";
import { assertLearner, assignmentWindowEnd, parseInput, positionSchema, requireOwnAttempt, uuidSchema } from "./context";
import { revealAllowed, selfAssessmentAllowed } from "./policy";
import { recordMarkingDecision, type MarkingDecisionResult } from "./remark";
import type { LearnerActor } from "./types";
import { withAttemptThrottle } from "./throttle";

/**
 * Self-assessment fallback (ARCHITECTURE §6.5 / §6.8): when AI marking is not configured, open answers (essays,
 * extended and short written answers) would wait for marking forever. The student marks their OWN answer against the
 * mark scheme instead: they tick the points their answer makes (the server sums the scheme's marks for the ticked
 * points; a claimed total is never trusted) or, for a question without points, pick a mark (clamped to the
 * allocation). The decision is recorded like any other (`recordMarkingDecision`, source SELF, status SELF_ASSESSED),
 * so the attempt is re-scored and becomes MARKED once nothing else waits.
 *
 * How a self-assessed mark counts differently from an official one: weighted lower in topic mastery (progress core
 * `selfAssessedWeight`), effort XP only (never the correctness bonus, so XP totals and leaderboards are unaffected by
 * self-awarded marks), and labelled "self-marked" wherever it is shown (scoring core `selfAssessedMarks`).
 *
 * Allowed only by {@link selfAssessmentAllowed}: own, non-assignment work, an answer queued for AI marking, feedback
 * already visible (exam modes after submission), and no AI marking for this student: not configured on this server, or
 * the student is a minor whose guardian consent refuses AI processing of their text (MIN-01, {@link aiMarkingAvailableFor}).
 */

export const selfAssessmentSchema = z.strictObject({
  /** Mark-scheme point ids the student says their answer makes (unknown ids are ignored). */
  pointIds: z.array(z.string().min(1).max(64)).max(100).default([]),
  /** The mark claimed for a question without mark-scheme points (clamped to the slot's allocation). */
  marks: z.int().min(0).max(1_000).default(0),
});
export type SelfAssessmentInput = z.input<typeof selfAssessmentSchema>;

/** True when open answers can be marked by AI on this server (otherwise students self-assess). */
export function aiMarkingConfigured(): boolean {
  return Boolean(getEnv().ANTHROPIC_API_KEY?.trim());
}

/**
 * Whether THIS student's open answers are marked by AI: configured on the server, switched on by the platform flag
 * (`features.ai`, ARCHITECTURE §3.14) AND their guardian consent allows AI processing of their text (MIN-01;
 * src/server/family/consent-gate.ts). When false, their answers are self-assessed where allowed, otherwise marked by a
 * person (the `ai.mark` job withholds them from the model; with the flag off no job is queued at all).
 */
export async function aiMarkingAvailableFor(userId: string): Promise<boolean> {
  if (!aiMarkingConfigured()) return false;
  if (!(await isFeatureEnabled("ai"))) return false;
  return !(await aiProcessingRefusedFor([userId])).has(userId);
}

/** Marks earned from the ticked mark-scheme points, in the slot's allocation, and the per-point awards to store. */
export function selfAssessedMarks(
  scheme: MarkScheme | null,
  input: { pointIds: readonly string[]; marks: number },
  marks: { question: number; slot: number },
): { marksAwarded: number; points: { pointId: string; awarded: number }[] | null } {
  if (scheme && scheme.points.length > 0) {
    const chosen = new Set(input.pointIds);
    const made = scheme.points.filter((point) => chosen.has(point.id));
    const raw = Math.min(marks.question, made.reduce((sum, point) => sum + point.marks, 0));
    return { marksAwarded: scaleAwarded(raw, marks.question, marks.slot), points: made.map((point) => ({ pointId: point.id, awarded: point.marks })) };
  }
  return { marksAwarded: Math.min(marks.slot, Math.max(0, Math.floor(input.marks))), points: null };
}

/**
 * The student's self-assessment of one of their own open answers (module header).
 *
 * @throws AppError VALIDATION | NOT_FOUND (not their attempt / question) | CONFLICT (already marked) | BAD_REQUEST (not
 *         submitted yet, or not self-assessable: assignment work, closed-book exam still open, AI marking available,
 *         answer type)
 */
export async function recordSelfAssessment(
  actor: LearnerActor,
  attemptId: string,
  position: number,
  input: SelfAssessmentInput,
  options: { now?: Date } = {},
): Promise<MarkingDecisionResult> {
  assertLearner(actor);
  // Concurrency throttle before any query or transaction (./throttle.ts; PAY-3).
  return withAttemptThrottle(actor.userId, "other", () => recordSelfAssessmentNow(actor, attemptId, position, input, options));
}

async function recordSelfAssessmentNow(
  actor: LearnerActor,
  attemptId: string,
  position: number,
  input: SelfAssessmentInput,
  options: { now?: Date },
): Promise<MarkingDecisionResult> {
  parseInput(z.object({ attemptId: uuidSchema, position: positionSchema }), { attemptId, position });
  const parsed = parseInput(selfAssessmentSchema, input);
  const now = options.now ?? new Date();
  const context = await requireOwnAttempt(db, actor, attemptId);
  const slot = await db.questionAttempt.findUnique({
    where: { attemptId_position: { attemptId, position } },
    select: { questionId: true, markingStatus: true, markedAt: true, response: true, marksAvailable: true, question: { select: { type: true, marks: true } } },
  });
  if (!slot) throw AppError.notFound("Question not found in this attempt.");
  if (slot.markingStatus !== "PENDING") throw AppError.conflict("This answer has already been marked.");
  if (slot.markedAt === null || slot.response === null) throw new AppError("BAD_REQUEST", "Submit your answer before marking it.");
  if (await aiMarkingAvailableFor(context.userId)) throw new AppError("BAD_REQUEST", "This answer is being marked automatically.");
  const allowed = selfAssessmentAllowed({
    markingStatus: slot.markingStatus,
    processed: slot.markedAt !== null,
    answered: slot.response !== null,
    questionType: slot.question.type,
    isAssignment: context.assignmentId !== null,
    feedbackVisible: revealAllowed({
      feedback: context.feedback,
      attemptOpen: context.status === "IN_PROGRESS",
      slotMarked: true,
      assessmentTiming: context.assessment?.feedbackTiming ?? null,
      windowClosesAt: assignmentWindowEnd(context),
      now,
    }),
    aiMarkingAvailable: false,
  });
  if (!allowed) throw new AppError("BAD_REQUEST", "Self-marking isn't available for this question.");

  const [question] = await getQuestionsForAttempt([slot.questionId], {
    ...(context.enrollment ? { syllabusId: context.enrollment.syllabusId } : {}),
    ...(context.tenancy ? { tenancy: context.tenancy } : {}),
  });
  const spec = question ? safeParseAnswerSpec(slot.question.type, question.answerSpec) : null;
  const scheme = spec?.success ? ((spec.data as { markScheme?: MarkScheme }).markScheme ?? null) : null;
  const { marksAwarded, points } = selfAssessedMarks(scheme, parsed, { question: slot.question.marks, slot: slot.marksAvailable });

  return recordMarkingDecision(
    {
      attemptId,
      position,
      source: "SELF",
      resultingStatus: "SELF_ASSESSED",
      marksAwarded,
      ...(points ? { points } : {}),
    },
    { now, expectStatus: "PENDING" },
  );
}
