import "server-only";
import { z } from "zod";
import type { AttemptStatus, MarkingStatus, Prisma } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { createNotification } from "@/server/notifications/service";
import { refreshSubjectProgress } from "@/server/progress/service";
import { loadAttemptContext, loadSlots, lockAttempt, parseInput, positionSchema, TX_OPTIONS, uuidSchema } from "./context";
import { foldMasteryChanges, withAnalysisMastery } from "./analysis";
import { applySlotEffects, isMasteryEvidence } from "./effects";
import { scoreAttempt, updateAssignmentProgress } from "./finalize";
import { attemptNoun, attemptResultsHref } from "./policy";

/**
 * Recording a non-deterministic marking decision (§9 "manually / AI-assisted marked"; ARCHITECTURE §6.5): an AI mark
 * from the `ai.mark` job, a teacher's or content reviewer's mark or override, or a self-assessment. One transaction:
 *
 * 1. append the decision to QuestionAttemptMarking (model, prompt version and confidence for AI; marker for
 *    TEACHER / REVIEWER — the table's CHECKs) and update the answer (marks clamped to 0..marksAvailable, `isCorrect`,
 *    per-point awards merged into `feedback`);
 * 2. the first FINAL mark of an answer applies its per-answer side effects (TopicMastery, QuestionStats `answered`); a
 *    provisional NEEDS_REVIEW counts in QuestionStats `needs_review`; overrides of a final mark never double count;
 * 3. a closed attempt is re-scored (./finalize `scoreAttempt`: totals, percentage, grade estimate, analysis); it
 *    becomes MARKED once nothing waits for AI, the student is notified (linking to the mode's results page,
 *    `attemptResultsHref`), and assignment progress and SubjectProgress are refreshed. XP is never re-awarded (one
 *    ledger entry per attempt).
 *
 * AUTHORIZATION IS THE CALLER'S: the `ai.mark` worker runs as the system; teacher / reviewer flows must check class
 * access (src/server/auth/rbac) or `content.review` before calling this.
 */

const FINAL_OR_REVIEW = ["AUTO_MARKED", "AI_MARKED", "TEACHER_MARKED", "SELF_ASSESSED", "NEEDS_REVIEW"] as const;

export const markingDecisionSchema = z
  .strictObject({
    attemptId: uuidSchema,
    position: positionSchema,
    source: z.enum(["AUTO", "AI", "TEACHER", "REVIEWER", "SELF"]),
    resultingStatus: z.enum(FINAL_OR_REVIEW),
    marksAwarded: z.number().min(0).max(10_000),
    markedById: uuidSchema.nullable().optional(),
    confidence: z.number().min(0).max(1).nullable().optional(),
    aiModel: z.string().min(1).max(64).nullable().optional(),
    promptVersion: z.string().min(1).max(32).nullable().optional(),
    reason: z.string().trim().min(1).max(500).nullable().optional(),
    points: z.array(z.strictObject({ pointId: z.string().min(1).max(64), awarded: z.number().min(0), evidence: z.string().max(300).optional() })).max(50).optional(),
    comment: z.string().trim().min(1).max(2_000).nullable().optional(),
    misconceptions: z.array(z.string().trim().min(1).max(160)).max(5).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.source === "AI" && (!value.aiModel || !value.promptVersion || value.confidence === undefined || value.confidence === null)) {
      ctx.addIssue({ code: "custom", path: ["source"], message: "AI decisions need the model, prompt version and confidence." });
    }
    if (value.markedById && value.source !== "TEACHER" && value.source !== "REVIEWER") {
      ctx.addIssue({ code: "custom", path: ["markedById"], message: "Only teacher or reviewer decisions name a marker." });
    }
  });

/** A marking decision (validated with {@link markingDecisionSchema}). */
export type MarkingDecisionInput = z.input<typeof markingDecisionSchema>;

export interface MarkingDecisionResult {
  attemptId: string;
  position: number;
  markingStatus: MarkingStatus;
  marksAwarded: number;
  attemptStatus: AttemptStatus;
  /** The attempt's percentage after re-scoring (null while still in progress or nothing marked). */
  percentage: number | null;
  pendingReviewCount: number;
}

function mergeFeedback(existing: unknown, input: z.output<typeof markingDecisionSchema>): Prisma.InputJsonObject {
  const base = typeof existing === "object" && existing !== null && !Array.isArray(existing) ? { ...(existing as Record<string, unknown>) } : {};
  if (input.points) base.points = input.points;
  if (input.comment) base.comment = input.comment;
  if (input.misconceptions?.length) base.misconceptions = input.misconceptions;
  if (input.source === "AI") base.aiMarked = true;
  return base as Prisma.InputJsonObject;
}

/**
 * Records one marking decision and re-scores the attempt (module header).
 *
 * @throws AppError VALIDATION (bad input) | NOT_FOUND (attempt / question) | BAD_REQUEST (the question was not answered)
 */
export async function recordMarkingDecision(
  input: MarkingDecisionInput,
  options: {
    now?: Date;
    /** Refuse (CONFLICT) unless the answer is still in this state when locked (e.g. a self-assessment of a PENDING answer). */
    expectStatus?: MarkingStatus;
  } = {},
): Promise<MarkingDecisionResult> {
  const decision = parseInput(markingDecisionSchema, input);
  const now = options.now ?? new Date();
  return db.$transaction(async (tx) => {
    if (!(await lockAttempt(tx, decision.attemptId))) throw AppError.notFound("Attempt not found.");
    const context = await loadAttemptContext(tx, decision.attemptId);
    if (!context) throw AppError.notFound("Attempt not found.");
    const key = { attemptId_position: { attemptId: decision.attemptId, position: decision.position } };
    const slot = await tx.questionAttempt.findUnique({ where: key });
    if (!slot) throw AppError.notFound("Question not found in this attempt.");
    if (slot.response === null) throw new AppError("BAD_REQUEST", "This question was not answered, so there is nothing to mark.");
    if (options.expectStatus !== undefined && slot.markingStatus !== options.expectStatus) throw AppError.conflict("This answer has already been marked.");

    const marks = Math.min(slot.marksAvailable, Math.max(0, Math.round(decision.marksAwarded)));
    const markedAt = slot.markedAt && slot.markedAt.getTime() > now.getTime() ? slot.markedAt : now;
    await tx.questionAttemptMarking.create({
      data: {
        attemptId: decision.attemptId,
        position: decision.position,
        markedById: decision.markedById ?? null,
        createdAt: markedAt,
        source: decision.source,
        resultingStatus: decision.resultingStatus,
        confidence: decision.confidence ?? null,
        marksAwarded: marks,
        previousMarksAwarded: slot.marksAwarded,
        aiModel: decision.aiModel ?? null,
        promptVersion: decision.promptVersion ?? null,
        reason: decision.reason ?? null,
        ...(decision.points ? { points: decision.points as Prisma.InputJsonArray } : {}),
        ...(decision.comment || decision.misconceptions?.length
          ? { feedback: { ...(decision.comment ? { comment: decision.comment } : {}), ...(decision.misconceptions?.length ? { misconceptions: decision.misconceptions } : {}) } }
          : {}),
      },
    });
    const updated = await tx.questionAttempt.update({
      where: key,
      data: {
        markingStatus: decision.resultingStatus,
        marksAwarded: marks,
        isCorrect: marks === slot.marksAvailable,
        markedAt,
        feedback: mergeFeedback(slot.feedback, decision),
      },
    });

    const wasFinal = isMasteryEvidence(slot.markingStatus);
    const wasReview = slot.markingStatus === "NEEDS_REVIEW";
    const becomesFinal = isMasteryEvidence(decision.resultingStatus);
    const effects =
      !wasFinal && (becomesFinal || (!wasReview && decision.resultingStatus === "NEEDS_REVIEW"))
        ? await applySlotEffects(tx, context, [{ slot: updated, question: null }], { now: markedAt, diagnostic: context.mode === "DIAGNOSTIC", aiMarking: false })
        : null;
    const masteryChanges = [...(effects?.mastery.values() ?? [])];

    if (context.status === "IN_PROGRESS") {
      if (masteryChanges.length > 0) {
        const mastery = foldMasteryChanges(context.storedAnalysis?.mastery, masteryChanges);
        await tx.assessmentAttempt.update({
          where: { id: context.id },
          data: { analysis: withAnalysisMastery(context.storedAnalysis, mastery) as unknown as Prisma.InputJsonObject },
        });
      }
      return { attemptId: context.id, position: decision.position, markingStatus: updated.markingStatus, marksAwarded: marks, attemptStatus: context.status, percentage: null, pendingReviewCount: 0 };
    }
    const slots = await loadSlots(tx, context.id);
    const { totals, data } = await scoreAttempt(tx, context, slots, markedAt, { closeSections: false, masteryChanges });
    const closedStatus = context.status === "EXPIRED" || context.status === "ABANDONED" ? context.status : null;
    const status: AttemptStatus = closedStatus ?? (totals.awaitingMarking ? "AWAITING_MARKING" : "MARKED");
    const becameMarked = status === "MARKED" && context.status !== "MARKED";
    await tx.assessmentAttempt.update({
      where: { id: context.id },
      data: { ...data, status, ...(becameMarked ? { markedAt } : {}) },
    });
    await updateAssignmentProgress(tx, context, totals, context.submittedAt ?? markedAt);
    await refreshSubjectProgress(tx, context.userId, context.subjectId, { now: markedAt });
    if (becameMarked) {
      await createNotification(
        context.userId,
        {
          type: "exam.marked",
          category: "LEARNING",
          title: "Your answers have been marked",
          body: `Your ${context.assessment?.title ?? attemptNoun(context.mode)} results are ready.`,
          data: { href: attemptResultsHref(context.mode, context.id), entityType: "AssessmentAttempt", entityId: context.id },
          dedupeKey: `attempt-marked:${context.id}`,
        },
        { client: tx },
      );
    }
    return {
      attemptId: context.id,
      position: decision.position,
      markingStatus: updated.markingStatus,
      marksAwarded: marks,
      attemptStatus: status,
      percentage: totals.percentage,
      pendingReviewCount: totals.pendingReviewCount,
    };
  }, TX_OPTIONS);
}
