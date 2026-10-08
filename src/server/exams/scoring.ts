/**
 * Exam scoring, grade estimates and per-topic analysis. Pure core: no DB, no I/O.
 * Satisfies §12 ("score, percentage, grade estimate, detailed analysis"; "You scored 68%. Strong areas … Weak
 * areas … Recommended study") and §51 ("score calculation" tests).
 *
 * Scoring rules:
 * - Each item's awarded marks are clamped to [0, marksAvailable] (the AI marking pipeline also clamps; this is the
 *   last line of defence, ARCHITECTURE §6.5). Totals are summed and rounded to 2 decimals (half marks exist).
 * - Marking status:
 *     MARKED        final (auto-marked, confident AI mark, or teacher/reviewer)
 *     SELF_ASSESSED final but student-awarded (no AI configured); counted, and reported separately for labelling
 *     UNANSWERED    final, 0 marks
 *     NEEDS_REVIEW  provisional: an AI mark below the confidence threshold may be present and is counted, but the
 *                   item's marks are also reported as pending
 *     PENDING       awaiting marking; any mark present is treated as provisional
 * - `percentage` = marksAwarded / markedMarks × 100, where markedMarks are the available marks of items that carry
 *   a (final or provisional) mark. Pending essays therefore do not drag the provisional score down, and the result
 *   is flagged `isProvisional` until nothing is pending. `percentageOfTotal` (pending counted as 0) is the floor.
 * - Percentages are rounded half up to 1 decimal (68.25 → 68.3) after a 15-significant-digit normalisation so binary
 *   floating point cannot flip a true half.
 * - Grade estimates compare that displayed percentage with DB-configured grade bands. They are ESTIMATES: boards
 *   set grade thresholds per paper and session, so callers must label the result "estimated grade", never as an
 *   official grade (CLAUDE.md rule 6).
 * - Topic analysis reuses the §11 mastery bands; strong (≥ 75) and weak (< 60) areas require minimum evidence
 *   (default ≥ 4 marked marks across ≥ 2 questions) so one lucky or unlucky question does not label a topic.
 */
import { masteryBand, roundHalfUp, type MasteryBand } from "@/server/progress/core";
import { MASTERY_BAND_MIN_SCORE } from "@/lib/mastery-band";

export const MARKING_STATUSES = ["MARKED", "SELF_ASSESSED", "UNANSWERED", "NEEDS_REVIEW", "PENDING"] as const;
export type MarkingStatus = (typeof MARKING_STATUSES)[number];

export interface ScoringItem {
  questionId: string;
  topicId: string;
  marksAvailable: number;
  marksAwarded: number | null;
  markingStatus: MarkingStatus;
}

export interface ScoreSummary {
  /** Σ marksAvailable over every item. */
  totalMarks: number;
  /** Σ awarded marks (final + provisional). */
  marksAwarded: number;
  /** Σ marksAvailable over items that carry a mark (the percentage denominator). */
  markedMarks: number;
  /** marksAwarded / markedMarks × 100, 1 decimal; null when nothing has been marked yet. */
  percentage: number | null;
  /** marksAwarded / totalMarks × 100 (pending counted as zero), 1 decimal; null when totalMarks is 0. */
  percentageOfTotal: number | null;
  /** Σ marksAvailable over items whose marking is not final (PENDING, NEEDS_REVIEW). */
  pendingMarks: number;
  isProvisional: boolean;
  unansweredMarks: number;
  /** Σ marksAvailable over SELF_ASSESSED items (label these "self-marked"). */
  selfAssessedMarks: number;
  counts: Record<MarkingStatus, number>;
}

const roundMarks = (value: number) => roundHalfUp(value, 2);

/** Percentage rounded half up to one decimal; null when the denominator is zero. */
export function percentageOf(awarded: number, available: number): number | null {
  if (!(available > 0)) return null;
  return roundHalfUp((awarded * 100) / available, 1);
}

interface NormalisedItem {
  item: ScoringItem;
  awarded: number;
  /** Item carries a mark (final or provisional) and counts towards the percentage denominator. */
  marked: boolean;
  pending: boolean;
}

function normalise(item: ScoringItem): NormalisedItem {
  if (!(MARKING_STATUSES as readonly string[]).includes(item.markingStatus)) {
    throw new RangeError(`Unknown marking status ${String(item.markingStatus)} on question ${item.questionId}`);
  }
  if (!Number.isFinite(item.marksAvailable) || item.marksAvailable < 0) {
    throw new RangeError(`Question ${item.questionId} has invalid marksAvailable ${String(item.marksAvailable)}`);
  }
  if (item.marksAwarded !== null && !Number.isFinite(item.marksAwarded)) {
    throw new RangeError(`Question ${item.questionId} has non-finite marksAwarded`);
  }
  const clampAwarded = (value: number) => Math.min(item.marksAvailable, Math.max(0, value));
  switch (item.markingStatus) {
    case "MARKED":
    case "SELF_ASSESSED":
      if (item.marksAwarded === null) {
        throw new RangeError(`Question ${item.questionId} is ${item.markingStatus} but has no marksAwarded`);
      }
      return { item, awarded: clampAwarded(item.marksAwarded), marked: true, pending: false };
    case "UNANSWERED":
      return { item, awarded: 0, marked: true, pending: false };
    case "NEEDS_REVIEW":
    case "PENDING": {
      const hasMark = item.marksAwarded !== null;
      return { item, awarded: hasMark ? clampAwarded(item.marksAwarded as number) : 0, marked: hasMark, pending: true };
    }
  }
}

/**
 * Totals and percentage for an attempt (see header for the rules). Throws `RangeError` on structurally invalid
 * items (unknown status, negative or non-finite marks, MARKED without marks).
 */
export function computeScore(items: readonly ScoringItem[]): ScoreSummary {
  const counts = Object.fromEntries(MARKING_STATUSES.map((s) => [s, 0])) as Record<MarkingStatus, number>;
  let totalMarks = 0;
  let marksAwarded = 0;
  let markedMarks = 0;
  let pendingMarks = 0;
  let unansweredMarks = 0;
  let selfAssessedMarks = 0;
  for (const raw of items) {
    const n = normalise(raw);
    counts[raw.markingStatus] += 1;
    totalMarks += raw.marksAvailable;
    marksAwarded += n.awarded;
    if (n.marked) markedMarks += raw.marksAvailable;
    if (n.pending) pendingMarks += raw.marksAvailable;
    if (raw.markingStatus === "UNANSWERED") unansweredMarks += raw.marksAvailable;
    if (raw.markingStatus === "SELF_ASSESSED") selfAssessedMarks += raw.marksAvailable;
  }
  totalMarks = roundMarks(totalMarks);
  marksAwarded = roundMarks(marksAwarded);
  markedMarks = roundMarks(markedMarks);
  pendingMarks = roundMarks(pendingMarks);
  return {
    totalMarks,
    marksAwarded,
    markedMarks,
    percentage: percentageOf(marksAwarded, markedMarks),
    percentageOfTotal: percentageOf(marksAwarded, totalMarks),
    pendingMarks,
    isProvisional: pendingMarks > 0,
    unansweredMarks: roundMarks(unansweredMarks),
    selfAssessedMarks: roundMarks(selfAssessedMarks),
    counts,
  };
}

export interface GradeBand {
  grade: string;
  /** Inclusive lower bound on the 0–100 percentage scale. */
  minPercent: number;
}

/**
 * Estimated grade for a percentage: the first band (highest `minPercent` first) whose threshold the percentage
 * meets. Bands are sorted defensively, so input order does not matter. Returns `null` when the percentage is
 * unknown, there are no bands, or it is below every band (e.g. a scheme without a "U" band).
 *
 * This is an ESTIMATE from configured bands — always present it as "estimated grade".
 */
export function estimateGrade(percentage: number | null, gradeBands: readonly GradeBand[]): string | null {
  if (percentage === null || !Number.isFinite(percentage)) return null;
  const sorted = [...gradeBands].sort((a, b) => b.minPercent - a.minPercent);
  return sorted.find((band) => percentage >= band.minPercent)?.grade ?? null;
}

export interface TopicAnalysis {
  topicId: string;
  /** From `topicNames`; null when the caller did not supply one. */
  topicName: string | null;
  questionCount: number;
  markedQuestionCount: number;
  marksAwarded: number;
  /** Marked marks (the percentage denominator). */
  marksAvailable: number;
  /** All marks in the topic, including pending ones. */
  totalMarks: number;
  pendingMarks: number;
  percentage: number | null;
  band: MasteryBand | null;
  /** Enough marked evidence to call the topic strong or weak. */
  sufficientEvidence: boolean;
}

export interface TopicAnalysisOptions {
  /** Minimum marked marks in a topic before it can be classified (default 4). */
  minMarks?: number;
  /** Minimum marked questions in a topic before it can be classified (default 2). */
  minQuestions?: number;
}

export interface ExamAnalysis {
  /** Topics in order of first appearance in the paper. */
  topics: TopicAnalysis[];
  /** Sufficient evidence and ≥ 75 % (STRONG/MASTERED), best first. */
  strongAreas: TopicAnalysis[];
  /** Sufficient evidence and < 60 % (WEAK/DEVELOPING), weakest first. */
  weakAreas: TopicAnalysis[];
  /** Input for recommendations (§12 "recommended study"): weak areas, weakest first. */
  focusTopics: { topicId: string; topicName: string | null; percentage: number; band: MasteryBand }[];
}

type TopicNames = ReadonlyMap<string, string> | Readonly<Record<string, string>>;

/** Code-unit comparison: deterministic regardless of the runtime's locale (unlike `localeCompare`). */
const compareIds = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

function lookupName(names: TopicNames, topicId: string): string | null {
  if (names instanceof Map) return names.get(topicId) ?? null;
  const record = names as Readonly<Record<string, string>>;
  return Object.prototype.hasOwnProperty.call(record, topicId) ? (record[topicId] ?? null) : null;
}

/**
 * Per-topic breakdown with strong and weak areas (§12 "detailed analysis"). Uses the same marking rules as
 * {@link computeScore}; a topic's percentage is over its marked marks.
 */
export function analyseByTopic(items: readonly ScoringItem[], topicNames: TopicNames, options: TopicAnalysisOptions = {}): ExamAnalysis {
  const minMarks = options.minMarks ?? 4;
  const minQuestions = options.minQuestions ?? 2;
  const byTopic = new Map<string, { questions: number; marked: number; awarded: number; available: number; total: number; pending: number }>();
  for (const raw of items) {
    const n = normalise(raw);
    const acc = byTopic.get(raw.topicId) ?? { questions: 0, marked: 0, awarded: 0, available: 0, total: 0, pending: 0 };
    acc.questions += 1;
    acc.total += raw.marksAvailable;
    acc.awarded += n.awarded;
    if (n.marked) {
      acc.marked += 1;
      acc.available += raw.marksAvailable;
    }
    if (n.pending) acc.pending += raw.marksAvailable;
    byTopic.set(raw.topicId, acc);
  }

  const topics: TopicAnalysis[] = [...byTopic.entries()].map(([topicId, acc]) => {
    const marksAwarded = roundMarks(acc.awarded);
    const marksAvailable = roundMarks(acc.available);
    const percentage = percentageOf(marksAwarded, marksAvailable);
    return {
      topicId,
      topicName: lookupName(topicNames, topicId),
      questionCount: acc.questions,
      markedQuestionCount: acc.marked,
      marksAwarded,
      marksAvailable,
      totalMarks: roundMarks(acc.total),
      pendingMarks: roundMarks(acc.pending),
      percentage,
      band: percentage === null ? null : masteryBand(percentage),
      sufficientEvidence: marksAvailable >= minMarks && acc.marked >= minQuestions,
    };
  });

  const classified = topics.filter((t): t is TopicAnalysis & { percentage: number; band: MasteryBand } => t.sufficientEvidence && t.percentage !== null);
  const strongAreas = classified
    .filter((t) => roundHalfUp(t.percentage) >= MASTERY_BAND_MIN_SCORE.STRONG)
    .sort((a, b) => b.percentage - a.percentage || compareIds(a.topicId, b.topicId));
  const weakAreas = classified
    .filter((t) => roundHalfUp(t.percentage) < MASTERY_BAND_MIN_SCORE.COMPETENT)
    .sort((a, b) => a.percentage - b.percentage || compareIds(a.topicId, b.topicId));

  return {
    topics,
    strongAreas,
    weakAreas,
    focusTopics: weakAreas.map((t) => ({ topicId: t.topicId, topicName: t.topicName, percentage: t.percentage, band: t.band })),
  };
}
