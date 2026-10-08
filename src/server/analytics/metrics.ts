/**
 * DailyMetric key registry (§35, ARCHITECTURE §4.7). Pure: no I/O, safe to import anywhere.
 *
 * Conventions (see the `DailyMetric` model docs):
 * - `metric` is a dotted lower-case key matching the CHECK `^[a-z0-9_]+(\.[a-zA-Z0-9_]+)*$`.
 * - `dimension` is "" for platform totals, otherwise "kind:value" pairs joined by "|" in a fixed order, e.g.
 *   "subject:<uuid>", "topic:<uuid>", "currency:USD", "channel:WEB", "feature:TUTOR", "plan:STUDENT".
 * - `date` is the Africa/Harare calendar day for platform metrics (student-local date for DailyActivity-based ones,
 *   which is Africa/Harare for the default profile time zone).
 * - Values are real counts, sums or ratios computed from domain rows (§50). A ratio or average whose denominator is
 *   zero is NOT written (no row = "no evidence"), so readers never see a fabricated 0%.
 *
 * Averages and rates are stored together with their weights (e.g. `attempts.avgScorePct` with `attempts.scored`,
 * `retention.d7` with `retention.d7.cohort` / `retention.d7.retained`) so a date range can be aggregated exactly.
 */

export const METRIC = {
  /** Registered, non-demo accounts that existed at the end of the day (all roles; deleted accounts excluded). */
  USERS_TOTAL: "users.total",
  /** Accounts created that day. Dimensions: "" and "channel:<ActivityChannel>". */
  USERS_SIGNUPS: "users.signups",
  /** Distinct users with learning activity (DailyActivity with activity) that day. */
  USERS_DAU: "users.dau",
  /** Distinct users with learning activity in the 7 days ending that day. */
  USERS_WAU: "users.wau",
  /** Distinct users with learning activity in the 30 days ending that day. */
  USERS_MAU: "users.mau",
  /** §35 funnel "active students": students (Student profile) with learning activity in the 30 days ending that day. */
  STUDENTS_ACTIVE: "students.active",
  /**
   * Students holding paid access that day: a non-default (paid) plan subscription whose access window overlaps the day
   * (TRIALING/ACTIVE now, or historically live) or a SCHOOL_SEAT grant funded by a live school subscription.
   * Dimensions: "" and "plan:<Plan.code>" (subscription holders only).
   */
  STUDENTS_PAID: "students.paid",
  /** Gross collected revenue (SUCCESSFUL/REFUNDED payments by paidAt) in minor units. Dimension "currency:<ISO>". */
  REVENUE_MINOR: "revenue.minor",
  /** Number of payments collected that day. Dimension "currency:<ISO>". */
  REVENUE_PAYMENTS: "revenue.payments",
  /** Refunded amounts recorded that day (Payment.refundedAt = latest refund time). Dimension "currency:<ISO>". */
  REVENUE_REFUNDS_MINOR: "revenue.refundsMinor",
  /** Students whose FIRST successful payment (as beneficiary) happened that day (§35 conversion to paid). */
  CONVERSION_PAID: "conversion.paid",
  /** Answered and marked questions (final or provisional mark) presented that day. Also "subject:<id>". */
  QUESTIONS_ATTEMPTED: "attempts.questions",
  /** Of those, answered with full marks. */
  QUESTIONS_CORRECT: "attempts.correct",
  /** Marked quizzes/tests/timed exams/mocks with a percentage, submitted that day (weight of avgScorePct). */
  ASSESSMENTS_SCORED: "attempts.scored",
  /** Mean percentage of those attempts. Dimensions: "" and "subject:<id>". */
  AVG_SCORE_PCT: "attempts.avgScorePct",
  /** Active study minutes (DailyActivity.studySeconds / 60). */
  STUDY_MINUTES: "study.minutes",
  /** Mock exams submitted that day (SUBMITTED / AWAITING_MARKING / MARKED). */
  MOCK_COMPLETED: "mock.completed",
  /** Marked mock exams with a percentage submitted that day (weight of mock.avgScorePct). */
  MOCK_SCORED: "mock.scored",
  /** Mean mock exam percentage. */
  MOCK_AVG_PCT: "mock.avgScorePct",
  /** AI requests: "" from the global spend counter (AiSpendDaily), "feature:<AiFeature>" from AiUsageDaily. */
  AI_REQUESTS: "ai.requests",
  /** AI cost in micro-dollars, same sources as ai.requests. */
  AI_COST_MICROS: "ai.costMicros",
  /** Distinct students active in the subject (answered questions or studied it) that day. "subject:<id>". */
  SUBJECT_ACTIVE_STUDENTS: "subject.activeStudents",
  /** Answered and marked questions in the subject that day. "subject:<id>". */
  SUBJECT_ATTEMPTS: "subject.attempts",
  /** Answered and marked questions in the topic that day (§35 most attempted topics). "topic:<id>". */
  TOPIC_ATTEMPTS: "topic.attempts",
  /** Of those, answered with full marks. "topic:<id>". */
  TOPIC_CORRECT: "topic.correct",
  /**
   * Correct rate (0..1) for topics with at least the minimum attempts that day (§35 most difficult topics; lowest
   * first). "topic:<id>".
   */
  TOPIC_CORRECT_RATE: "topic.correctRate",
} as const;

export type MetricKey = (typeof METRIC)[keyof typeof METRIC];

/** Day-N retention windows (§35 retention). */
export const RETENTION_DAYS = [1, 7, 30] as const;
export type RetentionDay = (typeof RETENTION_DAYS)[number];

/** Retention metric keys for a window: ratio (0..1), cohort size and retained count. */
export function retentionMetrics(days: RetentionDay): { rate: string; cohort: string; retained: string } {
  return { rate: `retention.d${days}`, cohort: `retention.d${days}.cohort`, retained: `retention.d${days}.retained` };
}

/** Every metric key that `computeDailyMetrics` owns (used to remove stale rows on recomputation). */
export const OWNED_METRICS: readonly string[] = Object.freeze([
  ...Object.values(METRIC),
  ...RETENTION_DAYS.flatMap((days) => Object.values(retentionMetrics(days))),
]);

const METRIC_KEY_PATTERN = /^[a-z0-9_]+(\.[a-zA-Z0-9_]+)*$/;

/** True when `key` satisfies the DailyMetric_metric_chk constraint (and the 64-character column limit). */
export function isValidMetricKey(key: string): boolean {
  return key.length <= 64 && METRIC_KEY_PATTERN.test(key);
}

export type DimensionKind = "subject" | "topic" | "currency" | "channel" | "feature" | "plan" | "school" | "teacher";

const DIMENSION_VALUE_PATTERN = /^[A-Za-z0-9_-]+$/;

/** Builds a single-pair dimension, e.g. `dimension("subject", id)` → "subject:<id>". */
export function dimension(kind: DimensionKind, value: string): string {
  if (!DIMENSION_VALUE_PATTERN.test(value)) {
    throw new RangeError(`Invalid ${kind} dimension value ${JSON.stringify(value)}`);
  }
  return `${kind}:${value}`;
}

/** Platform-total dimension. */
export const NO_DIMENSION = "";

/**
 * Parses a dimension string into its pairs ("" → {}). Throws on malformed input so a corrupt row is never silently
 * attributed to the wrong entity.
 */
export function parseDimension(value: string): Record<string, string> {
  if (value === "") return {};
  const pairs: Record<string, string> = {};
  for (const part of value.split("|")) {
    const separator = part.indexOf(":");
    if (separator <= 0 || separator === part.length - 1) throw new RangeError(`Malformed dimension ${JSON.stringify(value)}`);
    pairs[part.slice(0, separator)] = part.slice(separator + 1);
  }
  return pairs;
}

/** The value of a single-kind dimension ("subject:<id>" → id), or null when the dimension is of another kind. */
export function dimensionValue(value: string, kind: DimensionKind): string | null {
  const prefix = `${kind}:`;
  if (!value.startsWith(prefix) || value.includes("|")) return null;
  const rest = value.slice(prefix.length);
  return rest === "" ? null : rest;
}

/** One DailyMetric row to upsert. */
export interface MetricRow {
  metric: string;
  dimension: string;
  value: number;
}
