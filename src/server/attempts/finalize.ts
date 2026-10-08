import "server-only";
import type { AttemptStatus, AttemptSubmitReason, Prisma, QuestionAttempt } from "@/generated/prisma/client";
import { recommendationsFor } from "@/server/adaptive/core";
import { getGradeScheme, getGradeSchemeById, resolveGradeSchemeId, type GradeSchemeView } from "@/server/curriculum/grades";
import type { DbClient } from "@/server/db";
import { estimateGrade } from "@/server/exams/scoring";
import {
  attemptXp,
  awardXp,
  evaluateAchievements,
  getXpRules,
  recordActivity,
  type AnsweredForXp,
  type UnlockedAchievement,
} from "@/server/gamification/service";
import { lessonRefsForTopics, loadMasteryStates, refreshSubjectProgress } from "@/server/progress/service";
import { getQuestionsForAttempt } from "@/server/questions";
import { recordPlanActivity, requestPlanAdaptation } from "@/server/studyplan/service";
import { refreshAssignmentCounters } from "@/server/teaching/assignment-progress";
import {
  buildAttemptAnalysis,
  computeAttemptTotals,
  countedPositions,
  foldMasteryChanges,
  toAnalysisRecommendations,
  topicIdsInOrder,
  type AttemptTotals,
  type ScoringSection,
  type ScoringSlot,
  type TopicMasteryDelta,
} from "./analysis";
import { loadSlots, type AttemptContext } from "./context";
import { applySlotEffects, isMasteryEvidence, markSlot, resolveAiMarking, writeSlotMarking, xpResultOf, type ChangedSlot } from "./effects";
import { isGradedMode, isPracticeLike, xpReasonFor } from "./policy";

/**
 * Closing an attempt (§12 submit, §13 auto-submit, §52 diagnostic). One transaction, run by `submitAttempt`, the
 * last answer of a practice session, and the `exams.autoSubmit` sweep:
 *
 * 1. mark every saved-but-unmarked answer (deterministic marking; AI-assisted answers are queued as `ai.mark` jobs and
 *    keep the attempt AWAITING_MARKING), and mark empty slots UNANSWERED;
 * 2. {@link scoreAttempt}: "answer any N" counting, totals, percentage, grade ESTIMATE (resolution order on
 *    GradeScheme), analysis with per-topic results, strong / weak areas and recommendations (adaptive core, lesson
 *    ids) — the same step re-scores a closed attempt when a late AI / teacher mark arrives (./remark);
 * 3. side effects: TopicMastery + QuestionStats (per newly marked answer), DailyActivity + LearnerStats totals,
 *    XP once per attempt (idempotent ledger key), diagnostic markers (§52), assignment progress (§22), SubjectProgress
 *    refresh, achievements, and the study plan (§16: matching items credited; diagnostics and mocks request a
 *    `studyplan.adapt` job).
 *
 * An attempt closed by the system with no answer at all is EXPIRED (timed) or ABANDONED (idle): nothing is marked and
 * no side effect runs (AttemptStatus doc).
 */

export interface FinalizeOutcome {
  status: AttemptStatus;
  totals: AttemptTotals | null;
  xpAwarded: number;
  achievements: UnlockedAchievement[];
}

function toScoringSlot(slot: QuestionAttempt): ScoringSlot {
  return {
    position: slot.position,
    questionId: slot.questionId,
    topicId: slot.topicId,
    sectionNumber: slot.sectionNumber,
    marksAvailable: slot.marksAvailable,
    marksAwarded: slot.marksAwarded,
    isCorrect: slot.isCorrect,
    markingStatus: slot.markingStatus,
    answered: slot.response !== null,
    timeSpentSeconds: slot.timeSpentSeconds,
  };
}

/** The grade scheme for an attempt: Assessment → route → syllabus → qualification default (GradeScheme doc). */
export async function gradeSchemeForAttempt(context: AttemptContext): Promise<GradeSchemeView | null> {
  const fallback = await getGradeScheme(context.qualificationId);
  const id = resolveGradeSchemeId({
    assessmentGradeSchemeId: context.assessment?.gradeSchemeId ?? null,
    routeGradeSchemeId: context.enrollment?.routeGradeSchemeId ?? null,
    syllabusGradeSchemeId: context.enrollment?.syllabusGradeSchemeId ?? null,
    qualificationDefaultId: fallback?.id ?? null,
  });
  if (!id) return null;
  return id === fallback?.id ? fallback : getGradeSchemeById(id);
}

/**
 * Records the attempt's result on the student's AssignmentProgress (§22): submission time and on-time / LATE status,
 * and the counted score per the assignment's policy (FIRST / BEST / LATEST; a re-scored counted attempt always
 * refreshes its own figures).
 */
export async function updateAssignmentProgress(
  tx: DbClient,
  context: AttemptContext,
  totals: AttemptTotals,
  submittedAt: Date,
): Promise<void> {
  if (!context.assignmentId || !context.assignment) return;
  const key = { assignmentId_userId: { assignmentId: context.assignmentId, userId: context.userId } };
  const progress = await tx.assignmentProgress.findUnique({ where: key, select: { attemptId: true, scorePercent: true, submittedAt: true } });
  if (!progress) return;
  const late = context.assignment.dueAt !== null && submittedAt.getTime() > context.assignment.dueAt.getTime();
  const policy = context.assignment.scorePolicy;
  const counts =
    progress.attemptId === null ||
    progress.attemptId === context.id ||
    policy === "LATEST" ||
    (policy === "BEST" && totals.percentage !== null && (progress.scorePercent === null || totals.percentage > progress.scorePercent));
  const data: Prisma.AssignmentProgressUncheckedUpdateInput = {
    submittedAt: progress.submittedAt ?? submittedAt,
    status: late ? "LATE" : "SUBMITTED",
    progressPercent: 100,
  };
  if (counts) {
    Object.assign(data, {
      attemptId: context.id,
      scorePercent: totals.percentage,
      marksAwarded: totals.marksAwarded,
      totalMarks: totals.totalMarks,
      completedAt: submittedAt,
    });
  }
  await tx.assignmentProgress.update({ where: key, data });
  // Cached counters on the Assignment ("18/25 submitted, average 64%"), current on submit and on re-mark.
  await refreshAssignmentCounters(tx, [context.assignmentId]);
}

export interface ScoredAttempt {
  totals: AttemptTotals;
  /** Score columns for AssessmentAttempt (merge into the caller's single UPDATE). */
  data: Prisma.AssessmentAttemptUpdateInput;
}

/**
 * Scores an attempt from its slots (module header step 2): writes `isCounted` and the per-section counted marks, and
 * returns the AssessmentAttempt score columns (totals, percentage, counters, grade estimate, analysis). `closeSections`
 * stamps `submittedAt` on started sections (attempt close). `masteryChanges`: mastery changes of answers marked in this
 * transaction, folded into the per-topic before / after already stored on the attempt (`context.storedAnalysis`).
 */
export async function scoreAttempt(
  tx: DbClient,
  context: AttemptContext,
  slots: readonly QuestionAttempt[],
  at: Date,
  options: { closeSections: boolean; masteryChanges?: Iterable<TopicMasteryDelta> },
): Promise<ScoredAttempt> {
  const sections = await tx.assessmentAttemptSection.findMany({
    where: { attemptId: context.id },
    select: { sectionNumber: true, answerCount: true, maxMarks: true, startedAt: true, submittedAt: true },
    orderBy: { sectionNumber: "asc" },
  });
  const scoringSlots = slots.map(toScoringSlot);
  const scoringSections: ScoringSection[] = sections.map((s) => ({ sectionNumber: s.sectionNumber, answerCount: s.answerCount, maxMarks: s.maxMarks }));
  const counted = countedPositions(scoringSlots, scoringSections, context.config.answerAnyPolicy ?? "BEST");
  const practiceLike = isPracticeLike(context.mode);
  const totals = computeAttemptTotals(scoringSlots, scoringSections, counted, { practiceLike });
  for (const slot of slots) {
    const shouldCount = counted.has(slot.position);
    if (slot.isCounted !== shouldCount) {
      await tx.questionAttempt.update({ where: { attemptId_position: { attemptId: slot.attemptId, position: slot.position } }, data: { isCounted: shouldCount } });
    }
  }
  for (const section of sections) {
    const close = options.closeSections && section.startedAt !== null && section.submittedAt === null;
    await tx.assessmentAttemptSection.update({
      where: { attemptId_sectionNumber: { attemptId: context.id, sectionNumber: section.sectionNumber } },
      data: {
        marksAwarded: totals.sectionMarks.get(section.sectionNumber) ?? 0,
        ...(close && section.startedAt ? { submittedAt: at.getTime() < section.startedAt.getTime() ? section.startedAt : at } : {}),
      },
    });
  }

  const scheme = isGradedMode(context.mode) && totals.percentage !== null ? await gradeSchemeForAttempt(context) : null;
  const grade = scheme && totals.percentage !== null ? estimateGrade(totals.percentage, scheme.bands) : null;
  const gradeBand = grade && scheme ? (scheme.bands.find((b) => b.grade === grade) ?? null) : null;

  const topicIds = topicIdsInOrder(scoringSlots);
  const syllabusId = context.enrollment?.syllabusId ?? null;
  const states = await loadMasteryStates(tx, context.userId, topicIds, at);
  const lessons = syllabusId ? await lessonRefsForTopics(tx, context.userId, syllabusId, topicIds) : new Map();
  const recommendations = toAnalysisRecommendations(recommendationsFor(states, lessons, at, { limit: 5 }), 5);
  const analysis = buildAttemptAnalysis({
    slots: scoringSlots,
    counted,
    practiceLike,
    totals,
    recommendations,
    gradeBands: scheme ? scheme.bands.map((b) => ({ grade: b.grade, minPercent: b.minPercent })) : null,
    mastery: foldMasteryChanges(context.storedAnalysis?.mastery, options.masteryChanges ?? []),
  });

  return {
    totals,
    data: {
      totalMarks: totals.totalMarks,
      marksAwarded: totals.marksAwarded,
      percentage: totals.percentage === null ? null : Math.min(100, Math.max(0, totals.percentage)),
      answeredCount: totals.answeredCount,
      correctCount: totals.correctCount,
      pendingReviewCount: Math.min(32_767, totals.pendingReviewCount),
      analysis: analysis as unknown as Prisma.InputJsonObject,
      ...(grade && gradeBand && scheme
        ? { gradeEstimate: grade, gradeScheme: { connect: { id: scheme.id } }, gradeIsPass: gradeBand.isPass }
        : { gradeEstimate: null, gradeScheme: { disconnect: true }, gradeIsPass: null }),
    },
  };
}

/**
 * XP answers of the attempt's FINAL marks (effort counts, harder correct answers count more; self-assessed marks earn
 * the effort XP only, `xpResultOf`).
 */
function xpAnswers(slots: readonly QuestionAttempt[]): AnsweredForXp[] {
  return slots
    .filter((s) => isMasteryEvidence(s.markingStatus) && s.marksAwarded !== null && s.marksAvailable > 0)
    .map((s) => ({ result: xpResultOf(s), difficulty: s.difficulty }));
}

/**
 * Closes `context`'s attempt (module header). The caller holds the attempt row lock and has checked that the
 * attempt is IN_PROGRESS. `options.aiMarking` (`features.ai`) is resolved here when the caller has not already done
 * so: while AI is off, open answers are routed to self-assessment or review and no `ai.mark` job is queued.
 */
export async function finalizeAttempt(
  tx: DbClient,
  context: AttemptContext,
  reason: AttemptSubmitReason,
  now: Date,
  options: { aiMarking?: boolean } = {},
): Promise<FinalizeOutcome> {
  const submittedAt = now.getTime() < context.startedAt.getTime() ? context.startedAt : now;
  let slots = await loadSlots(tx, context.id);
  const anyAnswer = slots.some((s) => s.response !== null);

  if (!anyAnswer && reason !== "STUDENT") {
    const status: AttemptStatus = context.deadlineAt !== null && reason === "TIME_EXPIRED" ? "EXPIRED" : "ABANDONED";
    await tx.assessmentAttempt.update({ where: { id: context.id }, data: { status, submitReason: reason } });
    return { status, totals: null, xpAwarded: 0, achievements: [] };
  }

  // 1. Mark what is left.
  const toMark = slots.filter((s) => s.markingStatus === "PENDING" && s.markedAt === null);
  const questionIds = [...new Set(toMark.filter((s) => s.response !== null).map((s) => s.questionId))];
  const questions = questionIds.length
    ? await getQuestionsForAttempt(questionIds, {
        client: tx,
        ...(context.enrollment ? { syllabusId: context.enrollment.syllabusId } : {}),
        ...(context.tenancy ? { tenancy: context.tenancy } : {}),
      })
    : [];
  const byId = new Map(questions.map((q) => [q.id, q]));
  const changed: ChangedSlot[] = [];
  const aiMarking = options.aiMarking ?? (questionIds.length > 0 ? await resolveAiMarking() : false);
  const isAssignment = context.assignmentId !== null;
  for (const slot of toMark) {
    const question = byId.get(slot.questionId) ?? null;
    const marked = markSlot(question, slot.marksAvailable, slot.response, { aiMarking, isAssignment });
    const updated = await writeSlotMarking(tx, slot, marked.columns, submittedAt);
    changed.push({ slot: updated, question });
  }
  const effects = await applySlotEffects(tx, context, changed, { now: submittedAt, diagnostic: context.mode === "DIAGNOSTIC", aiMarking });
  if (changed.length > 0) {
    const updated = new Map(changed.map((c) => [c.slot.position, c.slot]));
    slots = slots.map((s) => updated.get(s.position) ?? s);
  }

  // 2. Score.
  const { totals, data } = await scoreAttempt(tx, context, slots, submittedAt, { closeSections: true, masteryChanges: effects.mastery.values() });
  const status: AttemptStatus = totals.awaitingMarking ? "AWAITING_MARKING" : "MARKED";
  const elapsed = Math.max(0, Math.floor((submittedAt.getTime() - context.startedAt.getTime()) / 1000));
  const slotSeconds = slots.reduce((sum, s) => sum + s.timeSpentSeconds, 0);
  const timeSpentSeconds = context.deadlineAt !== null ? Math.min(slotSeconds, elapsed) : Math.max(context.timeSpentSeconds, slotSeconds);
  await tx.assessmentAttempt.update({
    where: { id: context.id },
    data: {
      ...data,
      status,
      submitReason: reason,
      submittedAt,
      ...(status === "MARKED" ? { markedAt: submittedAt } : {}),
      timeSpentSeconds,
    },
  });

  // 3. Side effects of a completed attempt.
  const graded = isGradedMode(context.mode);
  const newlySeconds = changed.reduce((sum, c) => sum + c.slot.timeSpentSeconds, 0);
  await recordActivity(
    tx,
    context.userId,
    { questions: effects.answered, correct: effects.correct, assessmentsCompleted: graded ? 1 : 0, studySeconds: newlySeconds },
    {
      at: submittedAt,
      timeZone: context.timeZone,
      lifetime: {
        questions: totals.answeredCount,
        correct: totals.correctCount,
        assessmentsCompleted: graded ? 1 : 0,
        mockExamsCompleted: context.mode === "MOCK_EXAM" ? 1 : 0,
        studySeconds: timeSpentSeconds,
      },
    },
  );

  const rules = await getXpRules();
  const amount = attemptXp(context.mode === "MOCK_EXAM" ? "MOCK_EXAM" : "OTHER", xpAnswers(slots), rules);
  let xpAwarded = 0;
  if (amount > 0) {
    const award = await awardXp(tx, context.userId, xpReasonFor(context.mode, context.assignmentId !== null), context.id, amount, {
      sourceType: "ASSESSMENT_ATTEMPT",
      at: submittedAt,
      timeZone: context.timeZone,
      rules,
    });
    if (award.awarded) xpAwarded = award.amount;
  }

  if (context.mode === "DIAGNOSTIC" && totals.answeredCount > 0) {
    await tx.subjectEnrollment.update({
      where: { userId_subjectId: { userId: context.userId, subjectId: context.subjectId } },
      data: { diagnosticAttemptId: context.id, diagnosticCompletedAt: submittedAt },
    });
    await tx.student.updateMany({ where: { userId: context.userId, diagnosticCompletedAt: null }, data: { diagnosticCompletedAt: submittedAt } });
  }

  await updateAssignmentProgress(tx, context, totals, submittedAt);
  await refreshSubjectProgress(tx, context.userId, context.subjectId, { now: submittedAt, activityAt: submittedAt });
  const achievements = await evaluateAchievements(tx, context.userId, {
    at: submittedAt,
    timeZone: context.timeZone,
    context: { attemptId: context.id, subjectId: context.subjectId },
    rules,
  });

  // Study plan (§16): credit the matching plan items now; a diagnostic or mock re-plans from its results (worker job).
  await recordPlanActivity(tx, { userId: context.userId, at: submittedAt, timeZone: context.timeZone });
  if (context.mode === "DIAGNOSTIC" || context.mode === "MOCK_EXAM") {
    await requestPlanAdaptation(tx, context.userId, { now: submittedAt, timeZone: context.timeZone });
  }
  return { status, totals, xpAwarded, achievements };
}
