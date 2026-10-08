import "server-only";
import { Prisma, type MarkingStatus, type QuestionAttempt } from "@/generated/prisma/client";
import { classifyOutcome } from "@/server/progress/core";
import type { AnsweredForXp } from "@/server/gamification/service";
import { enqueue } from "@/server/lib/jobs";
import { markQuestion, toAttemptColumns, type AttemptMarkingColumns, type MarkingResult } from "@/server/marking";
import { applyMasteryOutcomes, type MasteryChange, type MasteryOutcome } from "@/server/progress/service";
import { updateQuestionStats, type AttemptQuestion } from "@/server/questions";
import type { DbClient } from "@/server/db";
import { isFeatureEnabled } from "@/server/features";
import { scaleAwarded } from "./analysis";
import type { AttemptContext } from "./context";
import { initialDifficultyFor, routeWithoutAiMarking } from "./policy";

/**
 * Marking of one slot and the per-answer side effects (ARCHITECTURE §4.6 "per answer, one transaction"):
 * QuestionAttempt marking columns, TopicMastery (final marks only), QuestionStats counters and the `ai.mark` job for
 * answers that need AI-assisted marking. DailyActivity / XP / SubjectProgress are applied by the callers (answer.ts per
 * answer, finalize.ts at close) so they can be batched.
 */

/**
 * AI marking job (handler built by the AI module; enqueued in the answer's transaction). Payload is the AI module's
 * batch contract `{ items: [{ attemptId, position }] }` (markPendingAiResponsesPayloadSchema in src/server/ai/marking.ts),
 * one answer per job so the per-answer dedupe key holds.
 */
export const AI_MARK_JOB = "ai.mark";

/** `ai.mark` payload for one answer (see {@link AI_MARK_JOB}). */
export function aiMarkPayload(attemptId: string, position: number): { items: { attemptId: string; position: number }[] } {
  return { items: [{ attemptId, position }] };
}

export interface MarkedSlot {
  columns: AttemptMarkingColumns;
  /** Null when the question could not be loaded (archived after the attempt started): held for review. */
  result: MarkingResult | null;
}

/**
 * How open answers are routed while marking (resolve once per request / transaction with {@link resolveAiMarking}).
 * `aiMarking: false` (platform flag `features.ai` off, ARCHITECTURE §3.14) never leaves an answer waiting for AI:
 * {@link routeWithoutAiMarking} keeps the student's own written work pending for self-assessment and sends the rest
 * to the teacher / reviewer queue, so no `ai.mark` job is queued.
 */
export interface SlotMarkingOptions {
  aiMarking: boolean;
  /** The attempt is assignment work (teachers mark its open answers). */
  isAssignment: boolean;
}

/** Whether open answers may be queued for AI marking right now (`features.ai`; cached setting read). */
export async function resolveAiMarking(): Promise<boolean> {
  return isFeatureEnabled("ai");
}

/**
 * Marks a response against the loaded question and maps it onto the slot's columns, scaling to the slot's allocated
 * marks (an AssessmentItem may override a question's marks). A question that can no longer be loaded is never
 * guessed: NEEDS_REVIEW with a provisional 0.
 */
export function markSlot(question: AttemptQuestion | null, marksAvailable: number, response: unknown, options: SlotMarkingOptions): MarkedSlot {
  if (response === null || response === undefined) {
    return { columns: { markingStatus: "UNANSWERED", marksAwarded: 0, isCorrect: marksAvailable === 0, feedback: null, response: null }, result: null };
  }
  if (!question) {
    return {
      columns: { markingStatus: "NEEDS_REVIEW", marksAwarded: 0, isCorrect: marksAvailable === 0, feedback: null, response },
      result: null,
    };
  }
  const marked = markQuestion(question, response);
  const result = options.aiMarking ? marked : routeWithoutAiMarking(marked, question.type, options.isAssignment);
  const scaled = scaleAwarded(result.marksAwarded, question.marks, marksAvailable);
  return { columns: toAttemptColumns({ ...result, marksAwarded: scaled, maxMarks: marksAvailable }, response), result };
}

const asJson = (value: unknown) =>
  value === null || value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue);

/**
 * Writes a marking decision onto a slot. PENDING (queued for AI) also stamps `markedAt`: it marks the slot as
 * deterministically processed, so a replay never re-marks it (QuestionAttempt_marking_state_chk allows it).
 */
export async function writeSlotMarking(
  tx: DbClient,
  slot: Pick<QuestionAttempt, "attemptId" | "position">,
  columns: AttemptMarkingColumns,
  now: Date,
  extra: Prisma.QuestionAttemptUpdateInput = {},
): Promise<QuestionAttempt> {
  return tx.questionAttempt.update({
    where: { attemptId_position: { attemptId: slot.attemptId, position: slot.position } },
    data: {
      ...extra,
      markingStatus: columns.markingStatus,
      marksAwarded: columns.marksAwarded,
      isCorrect: columns.isCorrect,
      feedback: asJson(columns.feedback),
      response: asJson(columns.response),
      markedAt: now,
    },
  });
}

/**
 * The XP class of a final mark. A SELF_ASSESSED mark is the student's own judgement: it earns the effort XP of an
 * answer but never the correctness bonus, so self-awarded marks cannot lift XP totals or leaderboards.
 */
export function xpResultOf(slot: Pick<QuestionAttempt, "markingStatus" | "marksAwarded" | "marksAvailable" | "hintsUsed">): AnsweredForXp["result"] {
  if (slot.markingStatus === "SELF_ASSESSED") return "INCORRECT";
  return classifyOutcome({ marksAwarded: slot.marksAwarded ?? 0, marksAvailable: slot.marksAvailable, hintsUsed: slot.hintsUsed });
}

/** True for statuses with a final mark that counts as mastery evidence. */
export function isMasteryEvidence(status: MarkingStatus): boolean {
  return status === "AUTO_MARKED" || status === "AI_MARKED" || status === "TEACHER_MARKED" || status === "SELF_ASSESSED";
}

/** One slot whose marking changed in this transaction. */
export interface ChangedSlot {
  slot: QuestionAttempt;
  question: AttemptQuestion | null;
}

export interface SlotEffectsResult {
  mastery: Map<string, MasteryChange>;
  /** Answered slots in this batch (for DailyActivity). */
  answered: number;
  /** Of which fully correct with a final mark. */
  correct: number;
  /** Final marks in this batch, for XP. */
  xpAnswers: AnsweredForXp[];
}

function optionKeysOf(response: unknown): string[] | undefined {
  if (typeof response !== "object" || response === null) return undefined;
  const value = response as { type?: unknown; optionKeys?: unknown };
  if (value.type !== "MULTIPLE_CHOICE" || !Array.isArray(value.optionKeys)) return undefined;
  return value.optionKeys.filter((k): k is string => typeof k === "string" && /^[A-Za-z0-9]{1,8}$/.test(k)).slice(0, 26);
}

/**
 * Applies the per-answer side effects of changed slots: QuestionStats (answered / needs_review / unanswered),
 * the `ai.mark` job for answers queued for AI, and TopicMastery for final marks (in answer order, in the enrolment's
 * pinned syllabus version). `diagnostic` flags mastery rows as seeded by the diagnostic (§52).
 */
export async function applySlotEffects(
  tx: DbClient,
  context: AttemptContext,
  changed: readonly ChangedSlot[],
  options: {
    now: Date;
    diagnostic?: boolean;
    /** False while `features.ai` is off: a PENDING answer waits for self-assessment and NO `ai.mark` job is queued. */
    aiMarking: boolean;
  },
): Promise<SlotEffectsResult> {
  const outcomes: MasteryOutcome[] = [];
  const xpAnswers: AnsweredForXp[] = [];
  let answered = 0;
  let correct = 0;
  for (const { slot, question } of changed) {
    const status = slot.markingStatus;
    if (status === "UNANSWERED") {
      await updateQuestionStats(tx, slot.questionId, { kind: "unanswered" });
      continue;
    }
    if (slot.response !== null) answered += 1;
    if (status === "PENDING") {
      // AI switched off: the answer waits for the student's self-assessment (results / practice pages offer the form).
      if (!options.aiMarking) continue;
      await enqueue(
        AI_MARK_JOB,
        aiMarkPayload(slot.attemptId, slot.position),
        { client: tx, queue: "ai", dedupeKey: `mark:${slot.attemptId}:${slot.position}` },
      );
      continue;
    }
    if (status === "NEEDS_REVIEW") {
      await updateQuestionStats(tx, slot.questionId, { kind: "needs_review" });
      continue;
    }
    if (!isMasteryEvidence(status) || slot.marksAwarded === null) continue;
    if (slot.isCorrect === true) correct += 1;
    const answeredAt = slot.answeredAt ?? options.now;
    await updateQuestionStats(tx, slot.questionId, {
      kind: "answered",
      marksAwarded: slot.marksAwarded,
      marksAvailable: slot.marksAvailable,
      isRepeat: slot.isRepeat,
      hintsUsed: slot.hintsUsed,
      timeSpentSeconds: Math.min(86_400, slot.timeSpentSeconds),
      answeredAt,
      ...(optionKeysOf(slot.response) ? { optionKeys: optionKeysOf(slot.response) } : {}),
    });
    if (slot.marksAvailable > 0) {
      outcomes.push({
        topicId: slot.topicId,
        marksAwarded: slot.marksAwarded,
        marksAvailable: slot.marksAvailable,
        difficulty: slot.difficulty,
        answeredAt,
        hintsUsed: slot.hintsUsed,
        timeSpentSeconds: slot.timeSpentSeconds > 0 ? slot.timeSpentSeconds : null,
        expectedSeconds: question?.estimatedSeconds ?? null,
        selfAssessed: status === "SELF_ASSESSED",
      });
      xpAnswers.push({ result: xpResultOf(slot), difficulty: slot.difficulty });
    }
  }
  const mastery =
    context.enrollment && outcomes.length > 0
      ? await applyMasteryOutcomes(tx, {
          userId: context.userId,
          subjectId: context.subjectId,
          syllabusId: context.enrollment.syllabusId,
          outcomes,
          timeZone: context.timeZone,
          initialDifficulty: initialDifficultyFor(context.enrollment.abilityLevel),
          diagnostic: options.diagnostic ?? false,
          now: options.now,
        })
      : new Map<string, MasteryChange>();
  return { mastery, answered, correct, xpAnswers };
}
