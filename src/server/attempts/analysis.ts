/**
 * Attempt scoring and results analysis (§12 "score, percentage, grade estimate, detailed analysis", §52 performance
 * report). PURE: no DB, no I/O; unit tested in analysis.test.ts. Builds on the exam scoring core
 * (src/server/exams/scoring.ts) and maps its output onto the stored AssessmentAttempt columns and `analysis` JSON.
 *
 * Rules (beyond those of the scoring core):
 * - "Answer any N" sections (§12, AssessmentAttemptSection.answerCount): only N answers count (`isCounted`). Policy
 *   BEST (default) keeps the N highest marks, FIRST the N lowest positions. Answers still waiting for AI marking are
 *   always counted (the database allows excluding only marked or unanswered rows) and the section's counted marks are
 *   capped at its `maxMarks`, which is also what the section contributes to the attempt total.
 * - Practice-style modes score only ANSWERED questions (unanswered questions are UNANSWERED with 0 marks but are left
 *   out of the percentage); tests and exams count unanswered questions as 0 (schema doc of `percentage`).
 * - Totals are whole marks (QuestionAttempt.marksAwarded is SMALLINT); percentages are one decimal, rounded half up.
 */
import type { MarkingStatus } from "@/generated/prisma/enums";
import type { MasteryBand } from "@/lib/mastery-band";
import type { Recommendation } from "@/server/adaptive/core";
import {
  analyseByTopic,
  computeScore,
  percentageOf,
  type GradeBand,
  type ScoringItem,
} from "@/server/exams/scoring";
import type { AttemptAnalysisJson } from "./policy";

export type ScoringStatus = ScoringItem["markingStatus"];

/** Maps a stored MarkingStatus onto the scoring core's status. */
export function scoringStatusOf(status: MarkingStatus): ScoringStatus {
  switch (status) {
    case "AUTO_MARKED":
    case "AI_MARKED":
    case "TEACHER_MARKED":
      return "MARKED";
    case "SELF_ASSESSED":
      return "SELF_ASSESSED";
    case "UNANSWERED":
      return "UNANSWERED";
    case "NEEDS_REVIEW":
      return "NEEDS_REVIEW";
    case "PENDING":
      return "PENDING";
  }
}

/** True for statuses whose mark is final (mastery, QuestionStats `answered`, analytics). */
export function isFinalMark(status: MarkingStatus): boolean {
  return status === "AUTO_MARKED" || status === "AI_MARKED" || status === "TEACHER_MARKED" || status === "SELF_ASSESSED";
}

/** One QuestionAttempt row as scoring needs it. */
export interface ScoringSlot {
  position: number;
  questionId: string;
  topicId: string;
  sectionNumber: number | null;
  marksAvailable: number;
  /** Null while PENDING. */
  marksAwarded: number | null;
  isCorrect: boolean | null;
  markingStatus: MarkingStatus;
  /** A response is stored (QuestionAttempt.response IS NOT NULL). */
  answered: boolean;
  timeSpentSeconds: number;
}

/** An attempt section as scoring needs it (AssessmentAttemptSection snapshot). */
export interface ScoringSection {
  sectionNumber: number;
  answerCount: number | null;
  maxMarks: number | null;
}

export type AnswerAnyPolicy = "BEST" | "FIRST";

const byPosition = (a: ScoringSlot, b: ScoringSlot) => a.position - b.position;

/**
 * Positions that count toward the score (see module header). Slots outside "answer any N" sections always count.
 */
export function countedPositions(slots: readonly ScoringSlot[], sections: readonly ScoringSection[], policy: AnswerAnyPolicy = "BEST"): Set<number> {
  const counted = new Set<number>();
  const answerAny = new Map(sections.filter((s) => s.answerCount !== null && s.answerCount > 0).map((s) => [s.sectionNumber, s.answerCount as number]));
  const grouped = new Map<number, ScoringSlot[]>();
  for (const slot of slots) {
    const n = slot.sectionNumber === null ? undefined : answerAny.get(slot.sectionNumber);
    if (n === undefined) {
      counted.add(slot.position);
      continue;
    }
    const list = grouped.get(slot.sectionNumber as number) ?? [];
    list.push(slot);
    grouped.set(slot.sectionNumber as number, list);
  }
  for (const [sectionNumber, list] of grouped) {
    const n = answerAny.get(sectionNumber) ?? list.length;
    const pending = list.filter((s) => s.markingStatus === "PENDING" && s.answered);
    for (const s of pending) counted.add(s.position);
    const rest = list.filter((s) => !(s.markingStatus === "PENDING" && s.answered));
    const ordered =
      policy === "FIRST"
        ? [...rest].sort((a, b) => Number(b.answered) - Number(a.answered) || byPosition(a, b))
        : [...rest].sort((a, b) => (b.marksAwarded ?? 0) - (a.marksAwarded ?? 0) || Number(b.answered) - Number(a.answered) || byPosition(a, b));
    for (const s of ordered.slice(0, Math.max(0, n - pending.length))) counted.add(s.position);
  }
  return counted;
}

/** Stored totals of an attempt (AssessmentAttempt columns + per-section counted marks). */
export interface AttemptTotals {
  totalMarks: number;
  marksAwarded: number;
  /** Denominator of `percentage`: marks of counted items that carry a mark. */
  markedMarks: number;
  percentage: number | null;
  answeredCount: number;
  correctCount: number;
  unansweredCount: number;
  /** PENDING (AI queue) answers + NEEDS_REVIEW answers. */
  pendingReviewCount: number;
  /** Some answers wait for AI marking (status AWAITING_MARKING). */
  awaitingMarking: boolean;
  isProvisional: boolean;
  /** Counted marks per "answer any N" / regular section (capped at the section maximum). */
  sectionMarks: Map<number, number>;
}

function toScoringItem(slot: ScoringSlot): ScoringItem {
  return {
    questionId: `${slot.position}:${slot.questionId}`,
    topicId: slot.topicId,
    marksAvailable: slot.marksAvailable,
    marksAwarded: slot.marksAwarded,
    markingStatus: scoringStatusOf(slot.markingStatus),
  };
}

/** Slots that enter the score: counted ones, and for practice-style modes only answered ones. */
export function scoredSlots(slots: readonly ScoringSlot[], counted: ReadonlySet<number>, practiceLike: boolean): ScoringSlot[] {
  return slots.filter((s) => counted.has(s.position) && (!practiceLike || (s.answered && s.markingStatus !== "UNANSWERED")));
}

/**
 * Totals, percentage and counters of an attempt. `practiceLike` selects the practice rules (module header).
 */
export function computeAttemptTotals(
  slots: readonly ScoringSlot[],
  sections: readonly ScoringSection[],
  counted: ReadonlySet<number>,
  options: { practiceLike: boolean },
): AttemptTotals {
  const scored = scoredSlots(slots, counted, options.practiceLike);
  const summary = computeScore(scored.map(toScoringItem));

  let totalMarks = summary.totalMarks;
  let marksAwarded = summary.marksAwarded;
  let markedMarks = summary.markedMarks;
  const sectionMarks = new Map<number, number>();

  if (options.practiceLike) {
    // Practice: the total is every presented question; the percentage stays over answered ones.
    totalMarks = slots.reduce((sum, s) => sum + s.marksAvailable, 0);
  } else {
    for (const section of sections) {
      const inSection = scored.filter((s) => s.sectionNumber === section.sectionNumber);
      const available = inSection.reduce((sum, s) => sum + s.marksAvailable, 0);
      const awarded = inSection.reduce((sum, s) => sum + Math.min(s.marksAvailable, Math.max(0, s.marksAwarded ?? 0)), 0);
      if (section.answerCount !== null && section.maxMarks !== null) {
        const capped = Math.min(awarded, section.maxMarks);
        const hasPending = inSection.some((s) => s.markingStatus === "PENDING" || s.markingStatus === "NEEDS_REVIEW");
        totalMarks += section.maxMarks - available;
        marksAwarded += capped - awarded;
        if (!hasPending) markedMarks += section.maxMarks - available;
        sectionMarks.set(section.sectionNumber, capped);
      } else {
        sectionMarks.set(section.sectionNumber, awarded);
      }
    }
  }
  totalMarks = Math.max(0, Math.round(totalMarks));
  marksAwarded = Math.min(totalMarks, Math.max(0, Math.round(marksAwarded)));
  markedMarks = Math.max(0, Math.round(markedMarks));

  const answered = slots.filter((s) => s.answered);
  const pendingAi = slots.filter((s) => s.markingStatus === "PENDING" && s.answered).length;
  const needsReview = slots.filter((s) => s.markingStatus === "NEEDS_REVIEW").length;
  return {
    totalMarks,
    marksAwarded,
    markedMarks,
    percentage: percentageOf(marksAwarded, markedMarks),
    answeredCount: answered.length,
    correctCount: answered.filter((s) => s.isCorrect === true).length,
    unansweredCount: slots.length - answered.length,
    pendingReviewCount: pendingAi + needsReview,
    awaitingMarking: pendingAi > 0,
    isProvisional: pendingAi + needsReview > 0,
    sectionMarks,
  };
}

/**
 * Converts marks out of the question's own total into marks out of the slot's allocation (an AssessmentItem may
 * override a question's marks). Full marks stay full marks; partial credit is floored (never over-awards).
 */
export function scaleAwarded(awarded: number, questionMarks: number, slotMarks: number): number {
  if (questionMarks <= 0 || slotMarks <= 0) return 0;
  if (questionMarks === slotMarks) return Math.min(slotMarks, Math.max(0, awarded));
  if (awarded >= questionMarks) return slotMarks;
  return Math.min(slotMarks, Math.max(0, Math.floor((awarded * slotMarks) / questionMarks)));
}

/** Next grade above the estimate and the whole marks still needed for it (§12 "grade estimate"). */
export function nextGradeInfo(
  marksAwarded: number,
  totalMarks: number,
  percentage: number | null,
  bands: readonly GradeBand[],
): { nextGrade?: string; marksToNextGrade?: number } {
  if (percentage === null || totalMarks <= 0 || bands.length === 0) return {};
  const ascending = [...bands].sort((a, b) => a.minPercent - b.minPercent);
  const next = ascending.find((band) => band.minPercent > percentage);
  if (!next) return {};
  const needed = Math.max(1, Math.ceil((next.minPercent * totalMarks) / 100 - marksAwarded - 1e-9));
  return { nextGrade: next.grade, marksToNextGrade: needed };
}

export type AnalysisRecommendation = AttemptAnalysisJson["recommendations"][number];

/** Default question count for a re-test recommendation (matches the adaptive core's practice count). */
const RETEST_QUESTION_COUNT = 10;

/**
 * Maps adaptive recommendations (src/server/adaptive/core.ts) onto the stored `analysis.recommendations` shape:
 * STUDY_LESSON → LESSON, PRACTICE / RETEST → PRACTICE, EXAM_PRACTICE → TOPIC_TEST (strongest topic).
 */
export function toAnalysisRecommendations(recommendations: readonly Recommendation[], limit = 5): AnalysisRecommendation[] {
  const out: AnalysisRecommendation[] = [];
  for (const rec of recommendations) {
    if (out.length >= limit) break;
    switch (rec.kind) {
      case "STUDY_LESSON":
        out.push({ kind: "LESSON", topicId: rec.topicId, lessonId: rec.lessonId, reason: rec.reason });
        break;
      case "PRACTICE":
        out.push({ kind: "PRACTICE", topicId: rec.topicId, questionCount: rec.count, reason: rec.reason });
        break;
      case "RETEST":
        out.push({ kind: "PRACTICE", topicId: rec.topicId, questionCount: RETEST_QUESTION_COUNT, reason: rec.reason });
        break;
      case "EXAM_PRACTICE": {
        const topicId = rec.topicIds[0];
        if (topicId) out.push({ kind: "TOPIC_TEST", topicId, reason: rec.reason });
        break;
      }
    }
  }
  return out;
}

export type AnalysisMasteryChange = NonNullable<AttemptAnalysisJson["mastery"]>[number];

/** One topic's mastery change from one marking batch (the progress service's `MasteryChange`, structurally). */
export interface TopicMasteryDelta {
  topicId: string;
  before: { band: MasteryBand } | null;
  band: MasteryBand;
}

/**
 * Folds mastery changes into an attempt's per-topic record: the band BEFORE the attempt's first change in a topic is
 * kept, the band AFTER is the latest. Existing topics keep their order; new ones are appended. Pure.
 */
export function foldMasteryChanges(existing: readonly AnalysisMasteryChange[] | undefined, changes: Iterable<TopicMasteryDelta>): AnalysisMasteryChange[] {
  const out = new Map<string, AnalysisMasteryChange>((existing ?? []).map((m) => [m.topicId, { ...m }]));
  for (const change of changes) {
    const current = out.get(change.topicId);
    out.set(change.topicId, { topicId: change.topicId, before: current ? current.before : (change.before?.band ?? null), after: change.band });
  }
  return [...out.values()];
}

/**
 * The analysis document with `mastery` replaced: a stored (version 1) document keeps everything else; otherwise (an open
 * practice session) a document with empty results is started. Pure.
 */
export function withAnalysisMastery(stored: AttemptAnalysisJson | null, mastery: readonly AnalysisMasteryChange[]): AttemptAnalysisJson {
  const base: AttemptAnalysisJson = stored ?? { version: 1, byTopic: [], strongTopicIds: [], weakTopicIds: [], recommendations: [] };
  return { ...base, mastery: [...mastery] };
}

export interface BuildAnalysisInput {
  slots: readonly ScoringSlot[];
  counted: ReadonlySet<number>;
  practiceLike: boolean;
  totals: AttemptTotals;
  recommendations: readonly AnalysisRecommendation[];
  /** Grade bands of the scheme used for the estimate (null = no estimate). */
  gradeBands: readonly GradeBand[] | null;
  /** Per-topic mastery before / after the attempt (see {@link foldMasteryChanges}); omitted when empty. */
  mastery?: readonly AnalysisMasteryChange[];
}

/** Per-topic breakdown of the scored slots (counted, answered for practice). */
export function topicBreakdown(slots: readonly ScoringSlot[], counted: ReadonlySet<number>, practiceLike: boolean) {
  return analyseByTopic(scoredSlots(slots, counted, practiceLike).map(toScoringItem), new Map());
}

/** The `AssessmentAttempt.analysis` document (version 1, schema doc shape). */
export function buildAttemptAnalysis(input: BuildAnalysisInput): AttemptAnalysisJson {
  const breakdown = topicBreakdown(input.slots, input.counted, input.practiceLike);
  const answered = input.slots.filter((s) => s.answered);
  const answeredMarks = answered.reduce((sum, s) => sum + s.marksAvailable, 0);
  const seconds = answered.reduce((sum, s) => sum + Math.max(0, s.timeSpentSeconds), 0);
  const analysis: AttemptAnalysisJson = {
    version: 1,
    byTopic: breakdown.topics
      .filter((t): t is typeof t & { percentage: number } => t.percentage !== null)
      .map((t) => ({ topicId: t.topicId, marksAwarded: t.marksAwarded, marksAvailable: t.marksAvailable, percent: t.percentage })),
    strongTopicIds: breakdown.strongAreas.map((t) => t.topicId),
    weakTopicIds: breakdown.weakAreas.map((t) => t.topicId),
    recommendations: [...input.recommendations],
    time: {
      avgSecondsPerMark: answeredMarks > 0 ? Math.round((seconds / answeredMarks) * 10) / 10 : 0,
      unansweredCount: input.totals.unansweredCount,
    },
  };
  if (input.gradeBands && input.gradeBands.length > 0) {
    const grade = nextGradeInfo(input.totals.marksAwarded, input.totals.totalMarks, input.totals.percentage, input.gradeBands);
    if (grade.nextGrade !== undefined) analysis.grade = grade;
  }
  if (input.mastery && input.mastery.length > 0) analysis.mastery = [...input.mastery];
  return analysis;
}

/** Topic ids in the order they first appear in the attempt. */
export function topicIdsInOrder(slots: readonly ScoringSlot[]): string[] {
  return [...new Set([...slots].sort(byPosition).map((s) => s.topicId))];
}
