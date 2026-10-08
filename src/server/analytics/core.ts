/**
 * Analytics pure core (CLAUDE.md rule 2): the formulas behind §35 platform metrics, §23 school analytics, §22 class
 * drill-down and §21 parent overview. No database, no I/O, no `next/*`. Everything here is unit-tested in
 * `core.test.ts`.
 *
 * Honesty rules (§50, CLAUDE.md rule 6) encoded here:
 * - A rate/average with an empty denominator is `null` ("not enough evidence"), never 0.
 * - Pass rates are ESTIMATES: they compare stored percentages with configured grade bands or a school pass mark, never
 *   official results. Callers must label them as estimates.
 */
import { z } from "zod";
import { addDays, daysBetween, eachLocalDate, isLocalDate, startOfLocalDay, type LocalDate } from "@/lib/dates";
import { roundHalfUp } from "@/lib/math";

// ---------------------------------------------------------------------------------------------------------------
// Ratios and averages
// ---------------------------------------------------------------------------------------------------------------

/** numerator / denominator, or null when the denominator is not positive. */
export function ratio(numerator: number, denominator: number): number | null {
  if (!(denominator > 0) || !Number.isFinite(numerator)) return null;
  return numerator / denominator;
}

/** ratio × 100 rounded half up to `decimals` (default 1), or null. */
export function percent(numerator: number, denominator: number, decimals = 1): number | null {
  const value = ratio(numerator, denominator);
  return value === null ? null : roundHalfUp(value * 100, decimals);
}

/** Rounds a nullable number half up (null stays null). */
export function roundOrNull(value: number | null | undefined, decimals = 1): number | null {
  return value === null || value === undefined || !Number.isFinite(value) ? null : roundHalfUp(value, decimals);
}

export interface WeightedPart {
  /** Mean of the part, or null when the part has no evidence. */
  mean: number | null;
  /** Number of observations behind the mean. */
  weight: number;
}

/**
 * Exact mean of several pre-aggregated means: Σ(mean × weight) / Σ weight over parts with evidence.
 * Used to combine daily averages (stored with their weights) over a date range.
 */
export function weightedMean(parts: readonly WeightedPart[]): number | null {
  let sum = 0;
  let weight = 0;
  for (const part of parts) {
    if (part.mean === null || !Number.isFinite(part.mean) || !(part.weight > 0)) continue;
    sum += part.mean * part.weight;
    weight += part.weight;
  }
  return weight > 0 ? sum / weight : null;
}

/** Arithmetic mean of the non-null values, or null when there are none. */
export function meanOf(values: readonly (number | null | undefined)[]): number | null {
  let sum = 0;
  let count = 0;
  for (const value of values) {
    if (value === null || value === undefined || !Number.isFinite(value)) continue;
    sum += value;
    count += 1;
  }
  return count > 0 ? sum / count : null;
}

// ---------------------------------------------------------------------------------------------------------------
// Retention (§35)
// ---------------------------------------------------------------------------------------------------------------

export interface RetentionCounts {
  /** Users in the signup cohort (signed up on day D − N). */
  cohort: number;
  /** Of those, users with learning activity on day D. */
  retained: number;
}

/**
 * Day-N retention: retained / cohort (0..1), or null for an empty cohort. Throws on impossible counts (negative,
 * fractional, or more retained users than the cohort holds) so a broken query cannot publish a > 100% retention.
 */
export function retentionRate(counts: RetentionCounts): number | null {
  const { cohort, retained } = counts;
  if (!Number.isInteger(cohort) || !Number.isInteger(retained) || cohort < 0 || retained < 0) {
    throw new RangeError(`Retention counts must be non-negative integers (cohort ${cohort}, retained ${retained})`);
  }
  if (retained > cohort) throw new RangeError(`Retained users (${retained}) exceed the cohort (${cohort})`);
  return cohort > 0 ? retained / cohort : null;
}

/** Combines several daily retention samples (e.g. a date range) into one exact rate. */
export function combineRetention(samples: readonly RetentionCounts[]): RetentionCounts & { rate: number | null } {
  const cohort = samples.reduce((sum, s) => sum + s.cohort, 0);
  const retained = samples.reduce((sum, s) => sum + s.retained, 0);
  return { cohort, retained, rate: retentionRate({ cohort, retained }) };
}

// ---------------------------------------------------------------------------------------------------------------
// Assessment aggregation (§35 average score, mock exam performance)
// ---------------------------------------------------------------------------------------------------------------

/** Attempt modes whose percentage counts as a "test score" (quizzes, tests, timed exams, mocks; not practice). */
export const SCORED_ASSESSMENT_MODES = [
  "QUIZ",
  "TOPIC_TEST",
  "CHAPTER_TEST",
  "SUBJECT_TEST",
  "TIMED_EXAM",
  "MOCK_EXAM",
] as const;
export type ScoredAssessmentMode = (typeof SCORED_ASSESSMENT_MODES)[number];

/** Modes used for school pass-rate estimates (§23: latest mock / subject-test result). */
export const PASS_RATE_MODES = ["MOCK_EXAM", "SUBJECT_TEST"] as const;

/** Per-(subject, mode) aggregate of submitted attempts for one day. */
export interface AssessmentGroup {
  subjectId: string;
  mode: string;
  /** Submitted attempts (SUBMITTED / AWAITING_MARKING / MARKED). */
  completed: number;
  /** Marked attempts with a percentage. */
  scored: number;
  /** Σ percentage over the scored attempts. */
  percentSum: number;
}

export interface AssessmentSummary {
  overall: { scored: number; avgPct: number | null };
  bySubject: { subjectId: string; scored: number; avgPct: number }[];
  mock: { completed: number; scored: number; avgPct: number | null };
}

/** Folds per-(subject, mode) groups into the platform metrics (pure; groups of other modes are ignored). */
export function summariseAssessments(groups: readonly AssessmentGroup[]): AssessmentSummary {
  const scoredModes = new Set<string>(SCORED_ASSESSMENT_MODES);
  const bySubject = new Map<string, { scored: number; percentSum: number }>();
  let scored = 0;
  let percentSum = 0;
  const mock = { completed: 0, scored: 0, percentSum: 0 };
  for (const group of groups) {
    if (!scoredModes.has(group.mode)) continue;
    scored += group.scored;
    percentSum += group.percentSum;
    if (group.scored > 0) {
      const entry = bySubject.get(group.subjectId) ?? { scored: 0, percentSum: 0 };
      entry.scored += group.scored;
      entry.percentSum += group.percentSum;
      bySubject.set(group.subjectId, entry);
    }
    if (group.mode === "MOCK_EXAM") {
      mock.completed += group.completed;
      mock.scored += group.scored;
      mock.percentSum += group.percentSum;
    }
  }
  return {
    overall: { scored, avgPct: ratio(percentSum, scored) },
    bySubject: [...bySubject.entries()]
      .map(([subjectId, entry]) => ({ subjectId, scored: entry.scored, avgPct: entry.percentSum / entry.scored }))
      .sort((a, b) => a.subjectId.localeCompare(b.subjectId)),
    mock: { completed: mock.completed, scored: mock.scored, avgPct: ratio(mock.percentSum, mock.scored) },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Rankings (§35 most difficult topics)
// ---------------------------------------------------------------------------------------------------------------

export interface TopicAttemptCounts {
  topicId: string;
  attempted: number;
  correct: number;
}

export interface DifficultTopic extends TopicAttemptCounts {
  /** correct / attempted (0..1). */
  correctRate: number;
}

/**
 * §35 "most difficult topics": topics with at least `minAttempts` answered questions, lowest correct rate first (ties:
 * more attempts first, then topic id). A topic below the threshold is never ranked, so two unlucky answers cannot make
 * a topic look "hardest".
 */
export function rankDifficultTopics(
  rows: readonly TopicAttemptCounts[],
  options: { minAttempts: number; limit?: number },
): DifficultTopic[] {
  const minAttempts = Math.max(1, Math.floor(options.minAttempts));
  const ranked = rows
    .filter((row) => row.attempted >= minAttempts)
    .map((row) => ({ ...row, correctRate: row.correct / row.attempted }))
    .sort((a, b) => a.correctRate - b.correctRate || b.attempted - a.attempted || a.topicId.localeCompare(b.topicId));
  return options.limit === undefined ? ranked : ranked.slice(0, Math.max(0, options.limit));
}

// ---------------------------------------------------------------------------------------------------------------
// Pass rate and targets (§23 — always an ESTIMATE)
// ---------------------------------------------------------------------------------------------------------------

export interface GradeBandLike {
  label: string;
  minPercent: number;
  isPass: boolean;
}

/** Lowest percentage that earns a passing band of the scheme, or null when no band passes. */
export function passThresholdPercent(bands: readonly GradeBandLike[]): number | null {
  let threshold: number | null = null;
  for (const band of bands) {
    if (!band.isPass || !Number.isFinite(band.minPercent)) continue;
    threshold = threshold === null ? band.minPercent : Math.min(threshold, band.minPercent);
  }
  return threshold;
}

export interface ResultForPass {
  percentage: number | null;
  /** AssessmentAttempt.gradeIsPass written at marking with the scheme then in force (null = no scheme). */
  gradeIsPass: boolean | null;
  /** Pass threshold of the grade scheme that applies to the student's subject now (fallback), or null. */
  schemeThresholdPercent?: number | null;
}

export interface PassPolicy {
  /** School setting `passMarkPercent` (§23); overrides grade schemes when set. */
  passMarkPercent?: number | null;
}

export type PassBasis = "SCHOOL_PASS_MARK" | "GRADE_AT_MARKING" | "GRADE_SCHEME";

/**
 * Whether one result counts as a pass for the §23 estimate, and on what basis. Precedence:
 * 1. the school's configured pass mark (percentage ≥ passMarkPercent);
 * 2. the pass flag frozen on the attempt at marking (GradeBand.isPass of the scheme used then);
 * 3. the current grade scheme's pass threshold for the subject.
 * Returns `{ pass: null }` when none applies (the result is then excluded from the denominator, never counted as a
 * fail).
 */
export function evaluatePass(result: ResultForPass, policy: PassPolicy = {}): { pass: boolean | null; basis: PassBasis | null } {
  const mark = policy.passMarkPercent;
  if (mark !== null && mark !== undefined && Number.isFinite(mark)) {
    if (result.percentage === null || !Number.isFinite(result.percentage)) return { pass: null, basis: null };
    return { pass: result.percentage >= mark, basis: "SCHOOL_PASS_MARK" };
  }
  if (result.gradeIsPass !== null) return { pass: result.gradeIsPass, basis: "GRADE_AT_MARKING" };
  const threshold = result.schemeThresholdPercent;
  if (threshold !== null && threshold !== undefined && result.percentage !== null && Number.isFinite(result.percentage)) {
    return { pass: result.percentage >= threshold, basis: "GRADE_SCHEME" };
  }
  return { pass: null, basis: null };
}

export interface PassRateSummary {
  /** Results with a known pass/fail outcome (the denominator). */
  assessed: number;
  passed: number;
  /** passed / assessed × 100 (1 decimal), or null when nothing could be assessed. */
  ratePercent: number | null;
  /** Results that could not be judged (no pass mark and no grade scheme). */
  unknown: number;
  /** Always true: pass rates are estimates from configured bands, never official results. */
  isEstimate: true;
}

/** §23 pass-rate estimate over a set of results (one per student-subject: their latest qualifying result). */
export function passRate(results: readonly ResultForPass[], policy: PassPolicy = {}): PassRateSummary {
  let assessed = 0;
  let passed = 0;
  let unknown = 0;
  for (const result of results) {
    const { pass } = evaluatePass(result, policy);
    if (pass === null) {
      unknown += 1;
      continue;
    }
    assessed += 1;
    if (pass) passed += 1;
  }
  return { assessed, passed, ratePercent: percent(passed, assessed), unknown, isEstimate: true };
}

/** Reads `passMarkPercent` from School.settings JSON (§23), ignoring anything malformed. */
export function schoolPassMark(settings: unknown): number | null {
  const parsed = z.object({ passMarkPercent: z.number().min(0).max(100) }).safeParse(settings);
  return parsed.success ? parsed.data.passMarkPercent : null;
}

// ---------------------------------------------------------------------------------------------------------------
// Dates and ranges
// ---------------------------------------------------------------------------------------------------------------

export const localDateSchema = z.string().refine(isLocalDate, { message: "Expected a calendar date (YYYY-MM-DD)." });

/** Longest range a dashboard may request in one call (bounded work per request). */
export const MAX_RANGE_DAYS = 366;

/** Days from `from` to `to`, or null when either is not a valid date (Zod 4 runs object refinements after field issues). */
function spanOrNull(range: { from: unknown; to: unknown }): number | null {
  return isLocalDate(range.from) && isLocalDate(range.to) ? daysBetween(range.from, range.to) : null;
}

/** `{ from, to }` inclusive local dates, from ≤ to, at most MAX_RANGE_DAYS days. */
export const dateRangeSchema = z
  .object({ from: localDateSchema, to: localDateSchema })
  .refine((range) => (spanOrNull(range) ?? 0) >= 0, { message: "`from` must not be after `to`.", path: ["to"] })
  .refine((range) => (spanOrNull(range) ?? 0) < MAX_RANGE_DAYS, {
    message: `A range may span at most ${MAX_RANGE_DAYS} days.`,
    path: ["from"],
  });

export type DateRange = z.infer<typeof dateRangeSchema>;

/** Number of days in an inclusive range. */
export function rangeDays(range: DateRange): number {
  return daysBetween(range.from, range.to) + 1;
}

/** Half-open instant window [start, end) covering the local days `from`..`to` in `timeZone`. */
export function instantWindow(range: DateRange, timeZone: string): { start: Date; end: Date } {
  return { start: startOfLocalDay(range.from, timeZone), end: startOfLocalDay(addDays(range.to, 1), timeZone) };
}

/** The inclusive local-date window of `days` days ending on `date` (`days` = 7 → date − 6 … date). */
export function trailingRange(date: LocalDate, days: number): DateRange {
  if (!Number.isInteger(days) || days < 1) throw new RangeError(`days must be a positive integer, received ${days}`);
  return { from: addDays(date, -(days - 1)), to: date };
}

/** One entry per day of the range, value null where the map has no entry (an honest gap, not a zero). */
export function dailySeries<T>(range: DateRange, values: ReadonlyMap<LocalDate, T>): { date: LocalDate; value: T | null }[] {
  return eachLocalDate(range.from, rangeDays(range)).map((date) => ({ date, value: values.get(date) ?? null }));
}

// ---------------------------------------------------------------------------------------------------------------
// §21 parent overview: which sections a linked parent sees (link flags × the CHILD's `parentReports` entitlement)
// ---------------------------------------------------------------------------------------------------------------

export type ChildOverviewSection =
  | "subjects"
  | "examCountdown"
  | "progress"
  | "weakAreas"
  | "studyTime"
  | "activityCalendar"
  | "testResults";

/**
 * The detailed-report sections (§31 `parentReports`, gated on the CHILD's entitlements): progress per subject, weak
 * topics, the 30-day activity calendar and test results. Without the entitlement a parent gets the basic overview
 * (subjects, exam countdown and, when shared, study-time totals).
 */
export const PARENT_REPORT_SECTIONS = ["progress", "weakAreas", "activityCalendar", "testResults"] as const satisfies readonly ChildOverviewSection[];

/** The §21 visibility flags of one parent link (what the student shares). */
export interface SharedSections {
  canViewProgress: boolean;
  canViewStudyActivity: boolean;
  canViewTestResults: boolean;
}

/**
 * Sections of a child overview, in display order (pure). `visible` are computed and returned; `locked` are shared by
 * the student but need `parentReports` on the child's plan (so the page can say so instead of "not shared"). A
 * section the student does not share is in neither list.
 */
export function childOverviewSections(shared: SharedSections, reportsIncluded: boolean): { visible: ChildOverviewSection[]; locked: ChildOverviewSection[] } {
  const candidates: ChildOverviewSection[] = ["subjects", "examCountdown"];
  if (shared.canViewProgress) candidates.push("progress", "weakAreas");
  if (shared.canViewStudyActivity) candidates.push("studyTime", "activityCalendar");
  if (shared.canViewTestResults) candidates.push("testResults");
  const isReport = (section: ChildOverviewSection) => (PARENT_REPORT_SECTIONS as readonly ChildOverviewSection[]).includes(section);
  return {
    visible: candidates.filter((section) => reportsIncluded || !isReport(section)),
    locked: reportsIncluded ? [] : candidates.filter(isReport),
  };
}
