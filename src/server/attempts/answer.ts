import "server-only";
import { z } from "zod";
import { Prisma, type QuestionAttempt } from "@/generated/prisma/client";
import { parseResponse, toAnswerReveal, type QuestionType } from "@/lib/questions";
import { assertWithinLimit } from "@/server/billing/entitlements";
import { assertWithinLimitInTx, limitWindow, practiceQuestionsToday } from "@/server/billing/usage";
import { renderContent } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { canAcceptAnswer, timerSnapshot, type AnswerDecision } from "@/server/exams/timer";
import { recordActivity } from "@/server/gamification/service";
import { AppError } from "@/server/lib/errors";
import type { AttemptFeedbackJson, MarkingResult } from "@/server/marking";
import { firstLessonForTopic, refreshSubjectProgress, type MasteryChange } from "@/server/progress/service";
import { getQuestionsForAttempt, type AttemptQuestion } from "@/server/questions";
import {
  assertLearner,
  lockAttempt,
  parseInput,
  positionSchema,
  requireOwnAttempt,
  TX_OPTIONS,
  uuidSchema,
  type AttemptContext,
} from "./context";
import { foldMasteryChanges, withAnalysisMastery } from "./analysis";
import { applySlotEffects, markSlot, resolveAiMarking, writeSlotMarking } from "./effects";
import { finalizeAttempt } from "./finalize";
import { countsTowardPracticeLimit, isPlanExemptAttempt, isPracticeLike, selfAssessmentAllowed } from "./policy";
import { loadAttemptResult } from "./result";
import { aiMarkingAvailableFor } from "./self-assess";
import type { AnswerFeedback, LearnerActor, SaveResponseResult, StudyLessonLink } from "./types";
import { withAttemptThrottle } from "./throttle";

/**
 * Answering (§10 instant feedback, §12 "save progress", §13 flag question). Two entry points:
 *
 * - {@link saveResponse}: autosave of an answer and/or the "flag for review" toggle, for every mode. Accepted while
 *   the attempt is open and the server receives it by `deadline + submit grace`, or (offline outbox) by
 *   `deadline + late-sync grace` when the client saved it before the deadline (`lateSync`); per-paper section
 *   deadlines apply the same way. Out-of-order replays are ignored (`responseVersion`). Nothing is marked.
 * - {@link answerAndMark}: practice-style answering with IMMEDIATE feedback: marks the answer at once (marking engine)
 *   and applies every per-answer side effect in one transaction (QuestionAttempt, TopicMastery, QuestionStats,
 *   DailyActivity + streak, SubjectProgress; `ai.mark` job for AI-assisted answers). The topic's band before / after
 *   is folded into the attempt's `analysis.mastery` (the session summary's "Up from Developing"). Replaying an answered
 *   slot returns the stored result and changes nothing. The last answer of a practice session closes the attempt (XP
 *   once, idempotent ledger key).
 *
 * The daily practice allowance (§31 FREE "limited questions") is checked when a slot is answered for the first time in
 * PRACTICE / RETEST / QUIZ (not assignment work).
 */

const idsSchema = z.object({ attemptId: uuidSchema, position: positionSchema });
const optionsSchema = z.object({
  flagged: z.boolean().optional(),
  responseVersion: z.int().min(0).max(2_000_000_000).optional(),
  clientSavedAt: z.date().optional(),
  timeSpentSeconds: z.number().min(0).max(86_400).optional(),
  hintsUsed: z.int().min(0).max(50).optional(),
});

export interface SaveResponseOptions {
  /** Set / clear the exam-mode "flag question" marker (§13). */
  flagged?: boolean;
  /** Client save counter; a save not newer than the stored one is ignored (offline replays). Default: stored + 1. */
  responseVersion?: number;
  /** When the client recorded the answer locally (offline outbox; only used for late syncs). */
  clientSavedAt?: Date;
  /** Active seconds on this question so far (client heartbeat; clamped). */
  timeSpentSeconds?: number;
  /** Hints revealed so far. */
  hintsUsed?: number;
  now?: Date;
}

function closedMessage(decision: Extract<AnswerDecision, { accepted: false }>): string {
  switch (decision.reason) {
    case "ATTEMPT_CLOSED":
      return "This attempt has been submitted.";
    case "DEADLINE_PASSED":
      return "Time is up: answers can no longer be changed.";
    case "INVALID_CLIENT_TIMESTAMP":
      return "This answer was saved after the time ran out.";
  }
}

function validateResponse(type: QuestionType, response: unknown): unknown {
  try {
    return parseResponse(type, response);
  } catch (error) {
    if (error instanceof z.ZodError) throw AppError.fromZod(error, "That answer is not in the expected format.");
    throw error;
  }
}

/** The daily practice allowance resolved by the pre-check: `limit` null = unlimited. */
interface PracticeAllowance {
  limit: number | null;
}

/**
 * Checks the daily practice allowance before a slot is answered for the first time (fast path, outside the
 * transaction). Returns the resolved allowance when this answer consumes it (`null` when it does not count), for
 * {@link consumePracticeAllowance} inside the transaction.
 */
async function assertPracticeAllowance(
  actor: LearnerActor,
  context: AttemptContext,
  slot: Pick<QuestionAttempt, "answeredAt">,
  now: Date,
): Promise<PracticeAllowance | null> {
  if (slot.answeredAt !== null || !countsTowardPracticeLimit(context.mode, isPlanExemptAttempt(context.assignmentId, context.config))) return null;
  const used = await practiceQuestionsToday(context.userId, context.timeZone, now);
  const check = await assertWithinLimit(actor, "practiceQuestionsPerDay", used, {
    subjectId: context.subjectId,
    resetsAt: limitWindow("practiceQuestionsPerDay", now, context.timeZone).end,
  });
  return { limit: check.limit };
}

/**
 * Atomic re-check inside the answering transaction (PAY-3): parallel answers in DIFFERENT sessions (each locks only its
 * own attempt) all passed the pre-check before any of them committed. Serialised per student, recounted, then the
 * caller writes the answer in the same transaction. A slot answered meanwhile consumes nothing.
 */
async function consumePracticeAllowance(
  tx: DbClient,
  context: AttemptContext,
  slot: Pick<QuestionAttempt, "answeredAt">,
  allowance: PracticeAllowance | null,
  now: Date,
): Promise<void> {
  if (allowance === null || slot.answeredAt !== null) return;
  await assertWithinLimitInTx(tx, context.userId, "practiceQuestionsPerDay", allowance.limit, { timeZone: context.timeZone, now });
}

/** Timer + assignment-window checks shared by both entry points; starts a timed paper (section) lazily. */
async function assertCanAnswer(
  tx: DbClient,
  context: AttemptContext,
  slot: QuestionAttempt,
  now: Date,
  clientSavedAt: Date | undefined,
): Promise<{ lateSync: boolean }> {
  const decision = canAcceptAnswer(
    { status: context.status === "IN_PROGRESS" ? "IN_PROGRESS" : "SUBMITTED", startedAt: context.startedAt, deadline: context.deadlineAt },
    now,
    clientSavedAt ? { clientSavedAt } : {},
  );
  if (!decision.accepted) throw AppError.conflict(closedMessage(decision));
  let lateSync = decision.lateSync;
  if (context.assignment?.closesAt && context.assignment.closesAt.getTime() < now.getTime()) {
    throw AppError.conflict("This assignment is closed.");
  }
  if (slot.sectionNumber !== null) {
    const section = await tx.assessmentAttemptSection.findUnique({
      where: { attemptId_sectionNumber: { attemptId: context.id, sectionNumber: slot.sectionNumber } },
      select: { timeLimitSeconds: true, startedAt: true, deadlineAt: true, submittedAt: true },
    });
    if (section?.submittedAt) throw AppError.conflict("This paper has been submitted.");
    if (section?.timeLimitSeconds) {
      if (!section.startedAt) {
        await tx.assessmentAttemptSection.update({
          where: { attemptId_sectionNumber: { attemptId: context.id, sectionNumber: slot.sectionNumber } },
          data: { startedAt: now, deadlineAt: new Date(now.getTime() + section.timeLimitSeconds * 1000) },
        });
      } else if (section.deadlineAt) {
        const paper = canAcceptAnswer({ status: "IN_PROGRESS", startedAt: section.startedAt, deadline: section.deadlineAt }, now, clientSavedAt ? { clientSavedAt } : {});
        if (!paper.accepted) throw AppError.conflict(closedMessage(paper));
        lateSync ||= paper.lateSync;
      }
    }
  }
  return { lateSync };
}

/** The slot row without the joined question type. */
function withoutRelation(slot: QuestionAttempt & { question?: unknown }): QuestionAttempt {
  const copy: QuestionAttempt & { question?: unknown } = { ...slot };
  delete copy.question;
  return copy;
}

async function loadSlotWithType(client: DbClient, attemptId: string, position: number) {
  const slot = await client.questionAttempt.findUnique({
    where: { attemptId_position: { attemptId, position } },
    include: { question: { select: { type: true } } },
  });
  if (!slot) throw AppError.notFound("Question not found in this attempt.");
  return slot;
}

/**
 * Autosaves a response and/or the flag of one question (module header). `response`: `undefined` leaves the stored
 * answer unchanged (flag-only save), `null` clears it.
 *
 * @throws AppError VALIDATION (malformed response) | NOT_FOUND | CONFLICT (attempt closed, time up, already marked)
 *         | QUOTA_EXCEEDED / ENTITLEMENT_REQUIRED (daily practice allowance)
 */
export async function saveResponse(
  actor: LearnerActor,
  attemptId: string,
  position: number,
  response: unknown,
  options: SaveResponseOptions = {},
): Promise<SaveResponseResult> {
  assertLearner(actor);
  // Per-student throttles before any query, lock or transaction (./throttle.ts; AI-04, PAY-3). RATE_LIMITED when over.
  return withAttemptThrottle(actor.userId, "answer", () => saveResponseNow(actor, attemptId, position, response, options));
}

async function saveResponseNow(
  actor: LearnerActor,
  attemptId: string,
  position: number,
  response: unknown,
  options: SaveResponseOptions,
): Promise<SaveResponseResult> {
  parseInput(idsSchema, { attemptId, position });
  const opts = parseInput(optionsSchema, { ...options, now: undefined });
  const now = options.now ?? new Date();

  const pre = await requireOwnAttempt(db, actor, attemptId);
  const preSlot = await loadSlotWithType(db, attemptId, position);
  const allowance = response !== undefined && response !== null ? await assertPracticeAllowance(actor, pre, preSlot, now) : null;

  return db.$transaction(async (tx) => {
    await lockAttempt(tx, attemptId);
    const context = await requireOwnAttempt(tx, actor, attemptId);
    if (context.status !== "IN_PROGRESS") throw AppError.conflict("This attempt has been submitted.");
    const slot = await loadSlotWithType(tx, attemptId, position);
    const parsed = response === undefined ? undefined : validateResponse(slot.question.type, response);
    if (parsed !== undefined && (slot.markingStatus !== "PENDING" || slot.markedAt !== null)) {
      throw AppError.conflict("This question has already been marked.");
    }
    const { lateSync } = await assertCanAnswer(tx, context, slot, now, opts.clientSavedAt);
    const timer =
      context.deadlineAt !== null ? timerSnapshot({ status: "IN_PROGRESS", startedAt: context.startedAt, deadline: context.deadlineAt }, now) : null;

    if (opts.responseVersion !== undefined && opts.responseVersion <= slot.responseVersion) {
      return {
        attemptId,
        position,
        saved: false,
        stale: true,
        lateSync: false,
        flagged: slot.flaggedForReview,
        answered: slot.response !== null,
        responseVersion: slot.responseVersion,
        timer,
      };
    }
    if (parsed !== undefined && parsed !== null) await consumePracticeAllowance(tx, context, slot, allowance, now);
    const responseVersion = opts.responseVersion ?? slot.responseVersion + 1;
    const updated = await tx.questionAttempt.update({
      where: { attemptId_position: { attemptId, position } },
      data: {
        ...(parsed !== undefined
          ? { response: parsed === null ? Prisma.DbNull : (parsed as Prisma.InputJsonValue), answeredAt: now, responseVersion }
          : {}),
        ...(opts.flagged !== undefined ? { flaggedForReview: opts.flagged } : {}),
        ...(opts.timeSpentSeconds !== undefined ? { timeSpentSeconds: Math.max(slot.timeSpentSeconds, Math.round(opts.timeSpentSeconds)) } : {}),
        ...(opts.hintsUsed !== undefined ? { hintsUsed: Math.max(slot.hintsUsed, opts.hintsUsed) } : {}),
      },
    });
    await tx.assessmentAttempt.update({
      where: { id: attemptId },
      data: { lastSavedAt: now.getTime() < context.startedAt.getTime() ? context.startedAt : now, lastPosition: position, ...(lateSync ? { lateSync: true } : {}) },
    });
    return {
      attemptId,
      position,
      saved: true,
      stale: false,
      lateSync,
      flagged: updated.flaggedForReview,
      answered: updated.response !== null,
      responseVersion: updated.responseVersion,
      timer,
    };
  }, TX_OPTIONS);
}

export interface AnswerAndMarkOptions {
  /** Active seconds on this question (client-measured, clamped). */
  timeSpentSeconds?: number;
  /** Hints revealed before answering (lowers mastery credit, §11). */
  hintsUsed?: number;
  now?: Date;
}

function questionHtml(question: AttemptQuestion, field: "explanation" | "workedSolution" | "conceptSummary", cached: string | null): string | null {
  if (cached) return cached;
  const source = question[field];
  if (!source) return null;
  return renderContent(source, { idPrefix: `q-${question.id.slice(0, 8)}-`, baseHeadingLevel: 3 }).html;
}

async function studyLessonFor(question: AttemptQuestion | null, topicId: string): Promise<StudyLessonLink | null> {
  if (question?.relatedLessonId) {
    const related = await db.lesson.findFirst({
      where: { id: question.relatedLessonId, status: "PUBLISHED", draftOfId: null },
      select: { id: true, title: true, accessTier: true },
    });
    if (related) return { lessonId: related.id, title: related.title, accessTier: related.accessTier, href: `/app/lessons/${related.id}` };
  }
  const lesson = await firstLessonForTopic(db, topicId);
  return lesson ? { ...lesson, href: `/app/lessons/${lesson.lessonId}` } : null;
}

function nextOpenPosition(slots: readonly Pick<QuestionAttempt, "position" | "markingStatus" | "markedAt" | "response">[], after: number): number | null {
  const open = slots.filter((s) => s.markingStatus === "PENDING" && s.markedAt === null).map((s) => s.position);
  return open.find((p) => p > after) ?? open[0] ?? null;
}

/**
 * Answers one question with immediate marking and feedback (module header): correct / incorrect, the correct answer,
 * the explanation (rendered), the relevant concept and topic, and a "Study this topic" lesson (§10).
 *
 * @throws AppError VALIDATION (missing / malformed answer) | NOT_FOUND | BAD_REQUEST (exam mode: answers are marked on
 *         submit — use saveResponse) | CONFLICT (attempt closed, time up) | QUOTA_EXCEEDED / ENTITLEMENT_REQUIRED
 */
export async function answerAndMark(
  actor: LearnerActor,
  attemptId: string,
  position: number,
  response: unknown,
  options: AnswerAndMarkOptions = {},
): Promise<AnswerFeedback> {
  assertLearner(actor);
  // Per-student throttles before any query, lock or transaction (./throttle.ts; AI-04, PAY-3). RATE_LIMITED when over.
  return withAttemptThrottle(actor.userId, "answer", () => answerAndMarkNow(actor, attemptId, position, response, options));
}

async function answerAndMarkNow(
  actor: LearnerActor,
  attemptId: string,
  position: number,
  response: unknown,
  options: AnswerAndMarkOptions,
): Promise<AnswerFeedback> {
  parseInput(idsSchema, { attemptId, position });
  const opts = parseInput(optionsSchema, { timeSpentSeconds: options.timeSpentSeconds, hintsUsed: options.hintsUsed });
  if (response === null || response === undefined) throw AppError.validation({ response: ["Choose or enter an answer first."] });
  const now = options.now ?? new Date();

  const pre = await requireOwnAttempt(db, actor, attemptId);
  if (pre.feedback !== "IMMEDIATE") {
    throw new AppError("BAD_REQUEST", "Answers in this test are marked when you submit it. Your answer can be saved instead.");
  }
  const preSlot = await loadSlotWithType(db, attemptId, position);
  const alreadyProcessed = preSlot.markingStatus !== "PENDING" || preSlot.markedAt !== null;
  const allowance = alreadyProcessed ? null : await assertPracticeAllowance(actor, pre, preSlot, now);
  // Resolved before the transaction (cached setting): AI off = open answers are never queued for AI marking.
  const aiMarking = await resolveAiMarking();

  const outcome = await db.$transaction(async (tx) => {
    await lockAttempt(tx, attemptId);
    const context = await requireOwnAttempt(tx, actor, attemptId);
    const slot = await loadSlotWithType(tx, attemptId, position);
    const loadQuestion = async () =>
      (
        await getQuestionsForAttempt([slot.questionId], {
          client: tx,
          ...(context.enrollment ? { syllabusId: context.enrollment.syllabusId } : {}),
          ...(context.tenancy ? { tenancy: context.tenancy } : {}),
        })
      )[0] ?? null;

    const openSlots = () =>
      tx.questionAttempt.findMany({
        where: { attemptId },
        select: { position: true, markingStatus: true, markedAt: true, response: true },
        orderBy: { position: "asc" },
      });
    if (slot.markingStatus !== "PENDING" || slot.markedAt !== null) {
      return {
        context,
        slot: withoutRelation(slot),
        questionType: slot.question.type,
        question: await loadQuestion(),
        result: null,
        mastery: new Map<string, MasteryChange>(),
        replay: true,
        completed: false,
        nextPosition: context.status === "IN_PROGRESS" ? nextOpenPosition(await openSlots(), position) : null,
      };
    }
    if (context.status !== "IN_PROGRESS") throw AppError.conflict("This attempt has been submitted.");
    const parsed = validateResponse(slot.question.type, response);
    const { lateSync } = await assertCanAnswer(tx, context, slot, now, undefined);
    await consumePracticeAllowance(tx, context, slot, allowance, now);
    const question = await loadQuestion();
    const marked = markSlot(question, slot.marksAvailable, parsed, { aiMarking, isAssignment: context.assignmentId !== null });
    const updated = await writeSlotMarking(tx, slot, marked.columns, now, {
      answeredAt: now,
      responseVersion: slot.responseVersion + 1,
      ...(opts.timeSpentSeconds !== undefined ? { timeSpentSeconds: Math.max(slot.timeSpentSeconds, Math.round(opts.timeSpentSeconds)) } : {}),
      ...(opts.hintsUsed !== undefined ? { hintsUsed: Math.max(slot.hintsUsed, opts.hintsUsed) } : {}),
    });
    const effects = await applySlotEffects(tx, context, [{ slot: updated, question }], { now, aiMarking });
    await recordActivity(
      tx,
      context.userId,
      { questions: effects.answered, correct: effects.correct, studySeconds: updated.timeSpentSeconds },
      { at: now, timeZone: context.timeZone },
    );
    // The topic's band before the session's first answer in it and after this one (practice summary, §11).
    const storedAnalysis =
      effects.mastery.size > 0 ? withAnalysisMastery(context.storedAnalysis, foldMasteryChanges(context.storedAnalysis?.mastery, effects.mastery.values())) : context.storedAnalysis;
    await tx.assessmentAttempt.update({
      where: { id: attemptId },
      data: {
        lastSavedAt: now.getTime() < context.startedAt.getTime() ? context.startedAt : now,
        lastPosition: position,
        ...(lateSync ? { lateSync: true } : {}),
        ...(storedAnalysis !== context.storedAnalysis ? { analysis: storedAnalysis as unknown as Prisma.InputJsonObject } : {}),
      },
    });
    const nextPosition = nextOpenPosition(await openSlots(), position);
    let completed = false;
    if (isPracticeLike(context.mode) && nextPosition === null) {
      await finalizeAttempt(tx, { ...context, storedAnalysis }, "STUDENT", now, { aiMarking });
      completed = true;
    } else {
      await refreshSubjectProgress(tx, context.userId, context.subjectId, { now, activityAt: now });
    }
    return {
      context,
      slot: updated,
      questionType: slot.question.type,
      question,
      result: marked.result,
      mastery: effects.mastery,
      replay: false,
      completed,
      nextPosition,
    };
  }, TX_OPTIONS);

  return buildFeedback(outcome);
}

async function buildFeedback(outcome: {
  context: AttemptContext;
  slot: QuestionAttempt;
  questionType: QuestionType;
  question: AttemptQuestion | null;
  result: MarkingResult | null;
  mastery: Map<string, MasteryChange>;
  replay: boolean;
  completed: boolean;
  nextPosition: number | null;
}): Promise<AnswerFeedback> {
  const { context, slot, question } = outcome;
  const reveal = question ? toAnswerReveal(question) : null;
  const [topic, studyLesson, result, aiMarkingAvailable] = await Promise.all([
    db.topic.findUnique({ where: { id: slot.topicId }, select: { id: true, name: true } }),
    studyLessonFor(question, slot.topicId),
    outcome.completed || context.status !== "IN_PROGRESS" ? loadAttemptResult(db, context.id) : Promise.resolve(null),
    slot.markingStatus === "PENDING" ? aiMarkingAvailableFor(context.userId) : Promise.resolve(true),
  ]);
  const change = outcome.mastery.get(slot.topicId) ?? null;
  return {
    attemptId: context.id,
    position: slot.position,
    status: slot.markingStatus,
    marksAwarded: slot.marksAwarded,
    marksAvailable: slot.marksAvailable,
    isCorrect: slot.isCorrect,
    alreadyAnswered: outcome.replay,
    feedback: (slot.feedback as AttemptFeedbackJson | null) ?? null,
    notes: outcome.result?.feedback.notes ?? [],
    correctAnswerDisplay: reveal?.correctAnswerDisplay ?? outcome.result?.feedback.correctAnswerDisplay ?? null,
    explanationHtml: question && reveal ? questionHtml(question, "explanation", reveal.html.explanation) : null,
    workedSolutionHtml: question && reveal ? questionHtml(question, "workedSolution", reveal.html.workedSolution) : null,
    conceptHtml: question && reveal ? questionHtml(question, "conceptSummary", reveal.html.conceptSummary) : null,
    reveal,
    topic,
    studyLesson,
    mastery: change ? { score: change.score, band: change.band, before: change.before } : null,
    attemptCompleted: outcome.completed || (outcome.replay && context.status !== "IN_PROGRESS"),
    nextPosition: outcome.nextPosition,
    result,
    // Immediate-feedback attempts only reach here, so the answer's feedback is visible once it is processed.
    selfAssessable: selfAssessmentAllowed({
      markingStatus: slot.markingStatus,
      processed: slot.markedAt !== null,
      answered: slot.response !== null,
      questionType: outcome.questionType,
      isAssignment: context.assignmentId !== null,
      feedbackVisible: true,
      aiMarkingAvailable,
    }),
  };
}
