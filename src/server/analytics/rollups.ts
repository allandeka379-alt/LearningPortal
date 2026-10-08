import "server-only";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { addDays, DEFAULT_TIMEZONE, daysBetween, eachLocalDate, localDateString, type LocalDate } from "@/lib/dates";
import {
  dateRangeSchema,
  instantWindow,
  localDateSchema,
  rankDifficultTopics,
  retentionRate,
  SCORED_ASSESSMENT_MODES,
  summariseAssessments,
  type AssessmentGroup,
} from "./core";
import {
  dimension,
  isValidMetricKey,
  METRIC,
  NO_DIMENSION,
  OWNED_METRICS,
  RETENTION_DAYS,
  retentionMetrics,
  type MetricRow,
} from "./metrics";
import {
  activeDayPredicate,
  answeredQuestionGroups,
  fetchDemoUserIds,
  learnerActivityCounts,
  MARKED_ANSWER_STATUSES,
} from "./queries";

/**
 * Nightly DailyMetric rollup (§35; ARCHITECTURE §3.7 job `analytics.dailyMetrics`, queue `rollups`, daily 01:00 CAT,
 * dedupe key `metrics:{date}`).
 *
 * `computeDailyMetrics(date)` reads the domain tables with ~12 aggregate queries for the Africa/Harare day `date` and
 * replaces that day's DailyMetric rows in one transaction (upsert + delete of rows that no longer apply), so a re-run
 * or a backfill is idempotent and yields exactly the same rows. Values are real counts/sums/ratios (§50): ratios and
 * averages with an empty denominator are not written.
 *
 * Index use per source (all verified against prisma/schema.prisma and the init migration):
 * - DailyActivity: `DailyActivity_date_idx` (30-day window, DAU/WAU/MAU, study time; retention probes use the PK).
 * - QuestionAttempt: BRIN `(createdAt)` (questions, popular subjects, topic attempts/difficulty).
 * - StudySession: `(subjectId, startedAt)` per subject via LATERAL over Subject.
 * - AssessmentAttempt: `(subjectId, mode, submittedAt)` per subject via LATERAL over Subject.
 * - User: `(signupChannel, createdAt)` with an explicit channel list (signups, cohorts, users.total).
 * - Payment: partial `Payment_paid_at_idx (paidAt)`; first-payment probe via `(beneficiaryUserId, createdAt)`.
 * - AiSpendDaily: PK `(date, shard)`; AiUsageDaily: `(date, feature)`.
 * - User.total: a count of every account created before the day ends — inherently O(users), once a night.
 * - Subscription / EntitlementGrant (paid students): no time-window index exists, so this reads the Subscription table
 *   once a night (O(subscriptions)); seats join through `EntitlementGrant(subscriptionId, revokedAt)`. Payment.refundedAt
 *   (refunds) is unindexed as well. Both are reported as index candidates for when those tables grow.
 */

/** Platform day boundaries (DailyMetric docs: Africa/Harare for platform metrics). */
export const PLATFORM_TIMEZONE = DEFAULT_TIMEZONE;

/** ActivityChannel values; listing them lets Postgres use the (signupChannel, createdAt) index for date ranges. */
const SIGNUP_CHANNELS = ["WEB", "WHATSAPP", "API"] as const;

/** Subscription states that may have granted access at some point (PENDING never did). */
const ACCESS_SUBSCRIPTION_STATUSES = ["TRIALING", "ACTIVE", "PAST_DUE", "CANCELLED", "EXPIRED"] as const;

/** Payment states that collected money (a refunded payment was collected first; refunds are reported separately). */
const COLLECTED_PAYMENT_STATUSES = ["SUCCESSFUL", "REFUNDED"] as const;

/** Submitted assessment states counted as "completed". */
const SUBMITTED_ATTEMPT_STATUSES = ["SUBMITTED", "AWAITING_MARKING", "MARKED"] as const;

export interface ComputeDailyMetricsOptions {
  /** Minimum answered questions before a topic is ranked by difficulty (default 20). */
  minTopicAttempts?: number;
  /** Clock for the "not before the day is over" guard (tests). */
  now?: Date;
}

export interface ComputeDailyMetricsResult {
  date: LocalDate;
  /** Rows upserted for the day. */
  rowsWritten: number;
  /** Stale rows of owned metrics removed (e.g. a topic that no longer qualifies after re-marking). */
  rowsDeleted: number;
  /** Platform totals (dimension "") written, keyed by metric. */
  totals: Record<string, number>;
}

export const DEFAULT_MIN_TOPIC_ATTEMPTS = 20;

function assertComputableDate(date: unknown, now: Date): LocalDate {
  const parsed = localDateSchema.safeParse(date);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid metrics date.");
  const today = localDateString(now, PLATFORM_TIMEZONE);
  if (daysBetween(parsed.data, today) < 1) {
    // A day that is not over yet would be stored as if final; the admin dashboard computes "today so far" live.
    throw AppError.validation({ date: ["Metrics can only be computed for days that have ended (Africa/Harare)."] });
  }
  return parsed.data;
}

/**
 * Computes and stores every DailyMetric of the Africa/Harare day `date` (YYYY-MM-DD). Idempotent: re-running for the
 * same day replaces the day's rows with freshly computed ones (late AI marks, refunds and re-marks are picked up).
 */
export async function computeDailyMetrics(
  date: LocalDate,
  options: ComputeDailyMetricsOptions = {},
): Promise<ComputeDailyMetricsResult> {
  const day = assertComputableDate(date, options.now ?? new Date());
  const minTopicAttempts = Math.max(1, Math.floor(options.minTopicAttempts ?? DEFAULT_MIN_TOPIC_ATTEMPTS));
  const { start, end } = instantWindow({ from: day, to: day }, PLATFORM_TIMEZONE);
  const demo = await fetchDemoUserIds(db);

  const rows: MetricRow[] = [];
  const push = (metric: string, dim: string, value: number) => {
    if (!Number.isFinite(value)) throw new RangeError(`Metric ${metric} (${dim}) is not finite`);
    rows.push({ metric, dimension: dim, value });
  };

  // --- Users and learners ---------------------------------------------------------------------------------------
  const [usersTotal, signups, activity, paid] = await Promise.all([
    db.$queryRaw<{ n: number }[]>`
      SELECT count(*)::int AS n
      FROM "User" u
      WHERE u."signupChannel" = ANY(${[...SIGNUP_CHANNELS]}::"ActivityChannel"[])
        AND u."createdAt" < ${end} AND NOT u."isDemo"
        AND (u."deletedAt" IS NULL OR u."deletedAt" >= ${end})`,
    db.$queryRaw<{ channel: string; n: number }[]>`
      SELECT u."signupChannel"::text AS channel, count(*)::int AS n
      FROM "User" u
      WHERE u."signupChannel" = ANY(${[...SIGNUP_CHANNELS]}::"ActivityChannel"[])
        AND u."createdAt" >= ${start} AND u."createdAt" < ${end} AND NOT u."isDemo"
      GROUP BY u."signupChannel"`,
    learnerActivityCounts(db, { date: day, demoUserIds: demo }),
    db.$queryRaw<{ plan: string | null; n: number }[]>`
      WITH subs AS (
        SELECT s."holderUserId" AS "userId", p."code" AS plan
        FROM "Subscription" s
        JOIN "Plan" p ON p."id" = s."planId"
        WHERE s."holderUserId" IS NOT NULL AND NOT p."isDefault"
          AND s."status" = ANY(${[...ACCESS_SUBSCRIPTION_STATUSES]}::"SubscriptionStatus"[])
          AND s."startedAt" < ${end}
          AND COALESCE(s."endedAt", s."currentPeriodEnd", s."trialEndsAt") > ${start}
          AND s."holderUserId" <> ALL(${demo}::uuid[])
        UNION ALL
        -- One-off plan purchases (owner decision 2026-10-07: "Full access", pay once, keep it) are grants, not subscriptions.
        SELECT g."userId", p."code" AS plan
        FROM "EntitlementGrant" g
        JOIN "Plan" p ON p."id" = g."planId"
        WHERE g."source" = 'PURCHASE' AND g."userId" IS NOT NULL
          AND g."startsAt" < ${end}
          AND (g."endsAt" IS NULL OR g."endsAt" > ${start})
          AND (g."revokedAt" IS NULL OR g."revokedAt" > ${start})
          AND g."userId" <> ALL(${demo}::uuid[])
      ), seats AS (
        SELECT g."userId"
        FROM "Subscription" ss
        JOIN "EntitlementGrant" g ON g."subscriptionId" = ss."id" AND g."source" = 'SCHOOL_SEAT'
        WHERE ss."schoolId" IS NOT NULL
          AND ss."status" = ANY(${[...ACCESS_SUBSCRIPTION_STATUSES]}::"SubscriptionStatus"[])
          AND ss."startedAt" < ${end}
          AND COALESCE(ss."endedAt", ss."currentPeriodEnd", ss."trialEndsAt") > ${start}
          AND g."startsAt" < ${end}
          AND (g."endsAt" IS NULL OR g."endsAt" > ${start})
          AND (g."revokedAt" IS NULL OR g."revokedAt" > ${start})
          AND g."userId" <> ALL(${demo}::uuid[])
      )
      SELECT NULL::text AS plan, count(*)::int AS n
      FROM (SELECT "userId" FROM subs UNION SELECT "userId" FROM seats) everyone
      UNION ALL
      SELECT plan, count(DISTINCT "userId")::int AS n FROM subs GROUP BY plan`,
  ]);

  push(METRIC.USERS_TOTAL, NO_DIMENSION, usersTotal[0]?.n ?? 0);
  push(METRIC.USERS_SIGNUPS, NO_DIMENSION, signups.reduce((sum, row) => sum + row.n, 0));
  for (const row of signups) push(METRIC.USERS_SIGNUPS, dimension("channel", row.channel), row.n);
  push(METRIC.USERS_DAU, NO_DIMENSION, activity.dau);
  push(METRIC.USERS_WAU, NO_DIMENSION, activity.wau);
  push(METRIC.USERS_MAU, NO_DIMENSION, activity.mau);
  push(METRIC.STUDENTS_ACTIVE, NO_DIMENSION, activity.studentsActive);
  push(METRIC.STUDY_MINUTES, NO_DIMENSION, activity.studySeconds / 60);
  for (const row of paid) {
    if (row.plan === null) push(METRIC.STUDENTS_PAID, NO_DIMENSION, row.n);
    else push(METRIC.STUDENTS_PAID, dimension("plan", row.plan), row.n);
  }

  // --- Money ------------------------------------------------------------------------------------------------------
  const [revenue, refunds, conversions] = await Promise.all([
    db.$queryRaw<{ currency: string; payments: number; gross: number }[]>`
      SELECT p."currency"::text AS currency, count(*)::int AS payments, sum(p."amountMinor")::float8 AS gross
      FROM "Payment" p
      WHERE p."paidAt" >= ${start} AND p."paidAt" < ${end}
        AND p."status" = ANY(${[...COLLECTED_PAYMENT_STATUSES]}::"PaymentStatus"[])
        AND (p."beneficiaryUserId" IS NULL OR p."beneficiaryUserId" <> ALL(${demo}::uuid[]))
        AND NOT EXISTS (SELECT 1 FROM "School" sc WHERE sc."id" = p."schoolId" AND sc."isDemo")
      GROUP BY p."currency"`,
    db.$queryRaw<{ currency: string; refunded: number }[]>`
      SELECT p."currency"::text AS currency, sum(p."refundedAmountMinor")::float8 AS refunded
      FROM "Payment" p
      WHERE p."refundedAt" >= ${start} AND p."refundedAt" < ${end} AND p."refundedAmountMinor" > 0
        AND (p."beneficiaryUserId" IS NULL OR p."beneficiaryUserId" <> ALL(${demo}::uuid[]))
        AND NOT EXISTS (SELECT 1 FROM "School" sc WHERE sc."id" = p."schoolId" AND sc."isDemo")
      GROUP BY p."currency"`,
    db.$queryRaw<{ n: number }[]>`
      SELECT count(DISTINCT p."beneficiaryUserId")::int AS n
      FROM "Payment" p
      WHERE p."paidAt" >= ${start} AND p."paidAt" < ${end}
        AND p."status" = ANY(${[...COLLECTED_PAYMENT_STATUSES]}::"PaymentStatus"[])
        AND p."beneficiaryUserId" IS NOT NULL
        AND p."beneficiaryUserId" <> ALL(${demo}::uuid[])
        AND NOT EXISTS (
          SELECT 1 FROM "Payment" q
          WHERE q."beneficiaryUserId" = p."beneficiaryUserId"
            AND q."status" = ANY(${[...COLLECTED_PAYMENT_STATUSES]}::"PaymentStatus"[])
            AND q."paidAt" < ${start})`,
  ]);
  for (const row of revenue) {
    push(METRIC.REVENUE_MINOR, dimension("currency", row.currency), row.gross);
    push(METRIC.REVENUE_PAYMENTS, dimension("currency", row.currency), row.payments);
  }
  for (const row of refunds) push(METRIC.REVENUE_REFUNDS_MINOR, dimension("currency", row.currency), row.refunded);
  push(METRIC.CONVERSION_PAID, NO_DIMENSION, conversions[0]?.n ?? 0);

  // --- Learning -----------------------------------------------------------------------------------------------------
  const [questionGroups, subjectStudents, assessmentGroups] = await Promise.all([
    answeredQuestionGroups(db, { start, end, demoUserIds: demo }),
    db.$queryRaw<{ subjectId: string; students: number }[]>`
      WITH pairs AS (
        SELECT qa."subjectId", qa."userId"
        FROM "QuestionAttempt" qa
        WHERE qa."createdAt" >= ${start} AND qa."createdAt" < ${end}
          AND qa."markingStatus" = ANY(${[...MARKED_ANSWER_STATUSES]}::"MarkingStatus"[])
        UNION
        SELECT ss."subjectId", ss."userId"
        FROM "Subject" sub
        CROSS JOIN LATERAL (
          SELECT s."subjectId", s."userId"
          FROM "StudySession" s
          WHERE s."subjectId" = sub."id" AND s."startedAt" >= ${start} AND s."startedAt" < ${end}
            AND s."durationSeconds" > 0
        ) ss
      )
      SELECT pairs."subjectId"::text AS "subjectId", count(DISTINCT pairs."userId")::int AS students
      FROM pairs
      WHERE pairs."userId" <> ALL(${demo}::uuid[])
      GROUP BY pairs."subjectId"`,
    db.$queryRaw<AssessmentGroup[]>`
      SELECT x."subjectId"::text AS "subjectId", x."mode"::text AS mode,
        count(*)::int AS completed,
        count(*) FILTER (WHERE x."status" = 'MARKED' AND x."percentage" IS NOT NULL)::int AS scored,
        coalesce(sum(x."percentage") FILTER (WHERE x."status" = 'MARKED' AND x."percentage" IS NOT NULL), 0)::float8
          AS "percentSum"
      FROM "Subject" sub
      CROSS JOIN LATERAL (
        SELECT a."subjectId", a."mode", a."status", a."percentage"
        FROM "AssessmentAttempt" a
        WHERE a."subjectId" = sub."id"
          AND a."mode" = ANY(${[...SCORED_ASSESSMENT_MODES]}::"AttemptMode"[])
          AND a."submittedAt" >= ${start} AND a."submittedAt" < ${end}
          AND a."status" = ANY(${[...SUBMITTED_ATTEMPT_STATUSES]}::"AttemptStatus"[])
          AND a."userId" <> ALL(${demo}::uuid[])
      ) x
      GROUP BY x."subjectId", x."mode"`,
  ]);

  const topicCounts: { topicId: string; attempted: number; correct: number }[] = [];
  for (const group of questionGroups) {
    if (group.level === "total") {
      push(METRIC.QUESTIONS_ATTEMPTED, NO_DIMENSION, group.attempted);
      push(METRIC.QUESTIONS_CORRECT, NO_DIMENSION, group.correct);
    } else if (group.level === "subject" && group.subjectId) {
      push(METRIC.SUBJECT_ATTEMPTS, dimension("subject", group.subjectId), group.attempted);
    } else if (group.level === "topic" && group.topicId) {
      push(METRIC.TOPIC_ATTEMPTS, dimension("topic", group.topicId), group.attempted);
      push(METRIC.TOPIC_CORRECT, dimension("topic", group.topicId), group.correct);
      topicCounts.push({ topicId: group.topicId, attempted: group.attempted, correct: group.correct });
    }
  }
  for (const topic of rankDifficultTopics(topicCounts, { minAttempts: minTopicAttempts })) {
    push(METRIC.TOPIC_CORRECT_RATE, dimension("topic", topic.topicId), topic.correctRate);
  }
  for (const row of subjectStudents) {
    push(METRIC.SUBJECT_ACTIVE_STUDENTS, dimension("subject", row.subjectId), row.students);
  }

  const assessments = summariseAssessments(assessmentGroups);
  push(METRIC.ASSESSMENTS_SCORED, NO_DIMENSION, assessments.overall.scored);
  if (assessments.overall.avgPct !== null) push(METRIC.AVG_SCORE_PCT, NO_DIMENSION, assessments.overall.avgPct);
  for (const subject of assessments.bySubject) {
    push(METRIC.ASSESSMENTS_SCORED, dimension("subject", subject.subjectId), subject.scored);
    push(METRIC.AVG_SCORE_PCT, dimension("subject", subject.subjectId), subject.avgPct);
  }
  push(METRIC.MOCK_COMPLETED, NO_DIMENSION, assessments.mock.completed);
  push(METRIC.MOCK_SCORED, NO_DIMENSION, assessments.mock.scored);
  if (assessments.mock.avgPct !== null) push(METRIC.MOCK_AVG_PCT, NO_DIMENSION, assessments.mock.avgPct);

  // --- AI (read models only; AiConversation / AiMessage are never touched) ------------------------------------------
  const [aiSpend, aiByFeature] = await Promise.all([
    db.$queryRaw<{ cost: number; requests: number }[]>`
      SELECT coalesce(sum(a."costMicros"), 0)::float8 AS cost, coalesce(sum(a."requests"), 0)::float8 AS requests
      FROM "AiSpendDaily" a
      WHERE a."date" = ${day}::date`,
    db.$queryRaw<{ feature: string; requests: number; cost: number }[]>`
      SELECT a."feature"::text AS feature, sum(a."requests")::float8 AS requests, sum(a."costMicros")::float8 AS cost
      FROM "AiUsageDaily" a
      WHERE a."date" = ${day}::date AND a."userId" <> ALL(${demo}::uuid[])
      GROUP BY a."feature"`,
  ]);
  push(METRIC.AI_REQUESTS, NO_DIMENSION, aiSpend[0]?.requests ?? 0);
  push(METRIC.AI_COST_MICROS, NO_DIMENSION, aiSpend[0]?.cost ?? 0);
  for (const row of aiByFeature) {
    push(METRIC.AI_REQUESTS, dimension("feature", row.feature), row.requests);
    push(METRIC.AI_COST_MICROS, dimension("feature", row.feature), row.cost);
  }

  // --- Retention: signup cohort of D − N, active on D ---------------------------------------------------------------
  const retention = await Promise.all(
    RETENTION_DAYS.map(async (days) => {
      const cohortDay = addDays(day, -days);
      const cohortWindow = instantWindow({ from: cohortDay, to: cohortDay }, PLATFORM_TIMEZONE);
      const result = await db.$queryRaw<{ cohort: number; retained: number }[]>`
        SELECT count(*)::int AS cohort,
          count(*) FILTER (WHERE EXISTS (
            SELECT 1 FROM "DailyActivity" d
            WHERE d."userId" = u."id" AND d."date" = ${day}::date AND ${activeDayPredicate()}
          ))::int AS retained
        FROM "User" u
        WHERE u."signupChannel" = ANY(${[...SIGNUP_CHANNELS]}::"ActivityChannel"[])
          AND u."createdAt" >= ${cohortWindow.start} AND u."createdAt" < ${cohortWindow.end}
          AND NOT u."isDemo"
          AND EXISTS (SELECT 1 FROM "Student" st WHERE st."userId" = u."id")`;
      return { days, cohort: result[0]?.cohort ?? 0, retained: result[0]?.retained ?? 0 };
    }),
  );
  for (const sample of retention) {
    const keys = retentionMetrics(sample.days);
    push(keys.cohort, NO_DIMENSION, sample.cohort);
    push(keys.retained, NO_DIMENSION, sample.retained);
    const rate = retentionRate(sample);
    if (rate !== null) push(keys.rate, NO_DIMENSION, rate);
  }

  const { rowsWritten, rowsDeleted } = await replaceDayMetrics(day, rows);
  const totals: Record<string, number> = {};
  for (const row of rows) if (row.dimension === NO_DIMENSION) totals[row.metric] = row.value;
  logger.info("analytics.dailyMetrics computed", { date: day, rowsWritten, rowsDeleted });
  return { date: day, rowsWritten, rowsDeleted, totals };
}

/**
 * Replaces the owned metrics of `date` with `rows` in one transaction: upsert every row, then delete owned rows of the
 * day that were not produced this time. A transaction-scoped advisory lock serialises concurrent runs for the same day.
 */
async function replaceDayMetrics(date: LocalDate, rows: readonly MetricRow[]): Promise<{ rowsWritten: number; rowsDeleted: number }> {
  const seen = new Set<string>();
  for (const row of rows) {
    if (!isValidMetricKey(row.metric)) throw new RangeError(`Invalid metric key ${row.metric}`);
    if (row.dimension.length > 128) throw new RangeError(`Dimension too long for ${row.metric}`);
    const key = `${row.metric}\u0000${row.dimension}`;
    if (seen.has(key)) throw new RangeError(`Duplicate metric row ${row.metric} (${row.dimension})`);
    seen.add(key);
  }
  const metrics = rows.map((row) => row.metric);
  const dimensions = rows.map((row) => row.dimension);
  const values = rows.map((row) => row.value);
  return db.$transaction(
    async (tx) => {
      await tx.$queryRaw`SELECT 1 AS locked FROM (SELECT pg_advisory_xact_lock(hashtextextended(${`analytics.dailyMetrics:${date}`}, 0))) l`;
      const rowsWritten = await tx.$executeRaw`
        INSERT INTO "DailyMetric" ("id", "date", "metric", "dimension", "value", "createdAt", "updatedAt")
        SELECT uuidv7(), ${date}::date, m."metric", m."dimension", m."value", now(), now()
        FROM unnest(${metrics}::text[], ${dimensions}::text[], ${values}::float8[]) AS m("metric", "dimension", "value")
        ON CONFLICT ("date", "metric", "dimension")
        DO UPDATE SET "value" = EXCLUDED."value", "updatedAt" = EXCLUDED."updatedAt"`;
      const rowsDeleted = await tx.$executeRaw`
        DELETE FROM "DailyMetric" dm
        WHERE dm."date" = ${date}::date
          AND dm."metric" = ANY(${[...OWNED_METRICS]}::text[])
          AND NOT EXISTS (
            SELECT 1 FROM unnest(${metrics}::text[], ${dimensions}::text[]) AS k("metric", "dimension")
            WHERE k."metric" = dm."metric" AND k."dimension" = dm."dimension")`;
      return { rowsWritten, rowsDeleted };
    },
    { timeout: 60_000, maxWait: 10_000 },
  );
}

/**
 * Job handler for `analytics.dailyMetrics` (queue `rollups`, daily 01:00 CAT, dedupe key `metrics:{date}`): computes
 * the Africa/Harare day before `now`.
 */
export async function computeYesterdayMetrics(options: ComputeDailyMetricsOptions = {}): Promise<ComputeDailyMetricsResult> {
  const now = options.now ?? new Date();
  const yesterday = addDays(localDateString(now, PLATFORM_TIMEZONE), -1);
  return computeDailyMetrics(yesterday, { ...options, now });
}

/** Dedupe key for the nightly job (ARCHITECTURE §3.7). */
export function dailyMetricsDedupeKey(date: LocalDate): string {
  return `metrics:${date}`;
}

export interface BackfillResult {
  from: LocalDate;
  to: LocalDate;
  days: ComputeDailyMetricsResult[];
}

/**
 * Recomputes every day in [from, to] (inclusive, oldest first, at most 366 days per call; days that have not ended are
 * refused). Sequential on purpose: one day's aggregate queries at a time keeps the load on the primary predictable.
 */
export async function backfill(from: LocalDate, to: LocalDate, options: ComputeDailyMetricsOptions = {}): Promise<BackfillResult> {
  const parsed = dateRangeSchema.safeParse({ from, to });
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid backfill range.");
  const now = options.now ?? new Date();
  const range = parsed.data;
  // Validate the whole range up front so a bad `to` does not leave a half-done backfill.
  assertComputableDate(range.to, now);
  const results: ComputeDailyMetricsResult[] = [];
  for (const date of eachLocalDate(range.from, daysBetween(range.from, range.to) + 1)) {
    results.push(await computeDailyMetrics(date, { ...options, now }));
  }
  return { from: range.from, to: range.to, days: results };
}
