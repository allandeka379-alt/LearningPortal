import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { revenueUsdEquivalent, type RevenueUsdEquivalent } from "@/lib/billing/fx";
import { dateColumnFromLocalDate, localDateFromDateColumn, localDateString, startOfLocalDay, type LocalDate } from "@/lib/dates";
import { getKnownSetting } from "@/server/lib/settings";
import {
  combineRetention,
  dailySeries,
  dateRangeSchema,
  percent,
  rangeDays,
  ratio,
  roundOrNull,
  weightedMean,
  type DateRange,
} from "./core";
import { dimensionValue, METRIC, RETENTION_DAYS, retentionMetrics, type RetentionDay } from "./metrics";
import { answeredQuestionTotals, countActiveLearnersOn, fetchDemoUserIds } from "./queries";
import { DEFAULT_MIN_TOPIC_ATTEMPTS, PLATFORM_TIMEZONE } from "./rollups";
import { getMarketingGrowthAnalytics, type MarketingGrowthAnalytics } from "./growth";

/**
 * Admin analytics dashboard (§35 funnel, §36 "Analytics" section). Reads the nightly DailyMetric rollups (fast,
 * index `DailyMetric(metric, dimension, date)` / unique `(date, metric, dimension)`), first-party public growth events
 * and a live "today so far" for DAU and questions computed directly from DailyActivity / QuestionAttempt (today is
 * never rolled up until it ends).
 *
 * AUTHORIZATION: platform staff only. Routes must call `requireRole(["ADMIN", "SUPER_ADMIN"])` (or the analytics
 * permission from `src/server/auth/guards.ts`) before calling; this service takes no actor because it exposes no
 * per-user data (aggregates only, no names of students).
 *
 * Honesty (§50): a day that has not been rolled up yet is a gap (null), never a zero; totals report how many days
 * actually have data; rates with empty denominators are null.
 */

export interface AdminAnalyticsOptions {
  /** Clock (tests). */
  now?: Date;
  /** Length of the top lists (default 10, max 50). */
  topN?: number;
  /** Minimum answered questions over the range before a topic is ranked "most difficult" (default 20). */
  minTopicAttempts?: number;
}

export interface NamedSubject {
  subjectId: string;
  name: string | null;
  qualification: string | null;
}

export interface NamedTopic {
  topicId: string;
  name: string | null;
  subjectId: string | null;
  subjectName: string | null;
}

export interface CurrencyAmount {
  currency: string;
  amountMinor: number;
}

export interface RetentionSummary {
  days: RetentionDay;
  cohort: number;
  retained: number;
  /** retained / cohort (0..1), null when no cohort in range. */
  rate: number | null;
}

export interface AdminSeriesPoint {
  date: LocalDate;
  dau: number | null;
  wau: number | null;
  mau: number | null;
  signups: number | null;
  activeStudents: number | null;
  paidStudents: number | null;
  questionsAttempted: number | null;
  questionsCorrect: number | null;
  avgScorePct: number | null;
  studyMinutes: number | null;
  mockCompleted: number | null;
  mockAvgPct: number | null;
  aiRequests: number | null;
  aiCostMicros: number | null;
  conversions: number | null;
  retentionD1: number | null;
  retentionD7: number | null;
  retentionD30: number | null;
}

export interface AdminAnalytics {
  range: DateRange & { days: number };
  coverage: {
    /** Days of the range that have been rolled up. */
    daysWithData: number;
    /** Days of the range not rolled up yet (shown as gaps). */
    missingDates: LocalDate[];
    /** Latest rolled-up day in the range. */
    computedThrough: LocalDate | null;
    /** When the most recent of those rows was written. */
    lastComputedAt: Date | null;
  };
  /** §35 / §36 funnel: users → active students → paid students → revenue → popular subjects → topics → retention. */
  funnel: {
    /** Registered users at the end of `asOf` (latest rolled-up day). */
    users: number | null;
    /** Students active in the 30 days ending `asOf`. */
    activeStudents: number | null;
    paidStudents: number | null;
    asOf: LocalDate | null;
    /** Gross revenue collected over the range, per currency (never converted here; see `totals.revenueUsd`). */
    revenue: CurrencyAmount[];
    /** By active student-days (Σ of daily distinct active students) over the range. */
    popularSubjects: (NamedSubject & { activeStudentDays: number; questionsAttempted: number })[];
    mostAttemptedTopics: (NamedTopic & { attempts: number })[];
    retention: RetentionSummary[];
  };
  totals: {
    signups: number | null;
    questionsAttempted: number | null;
    questionsCorrect: number | null;
    /** questionsCorrect / questionsAttempted × 100. */
    correctRatePct: number | null;
    /** Mean test percentage over the range (weighted by scored attempts). */
    avgScorePct: number | null;
    studyMinutes: number | null;
    mockCompleted: number | null;
    mockAvgPct: number | null;
    conversions: number | null;
    aiRequests: number | null;
    aiCostMicros: number | null;
    revenue: (CurrencyAmount & { refundsMinor: number; netMinor: number; payments: number })[];
    /**
     * USD equivalent of `revenue` at the rates in the `fx.rates` setting (src/lib/billing/fx.ts): null when the range
     * has no non-USD revenue; `complete: false` (no totals) when a currency has no configured rate. Never invented.
     */
    revenueUsd: RevenueUsdEquivalent | null;
  };
  topLists: {
    mostDifficultTopics: (NamedTopic & { attempts: number; correct: number; correctRatePct: number })[];
    aiByFeature: { feature: string; requests: number; costMicros: number }[];
    signupsByChannel: { channel: string; signups: number }[];
    /** Paid students per plan on `funnel.asOf`. */
    paidByPlan: { planCode: string; students: number }[];
  };
  /** Live public-site growth data for the range: visits, clicks, signup/checkout intent and top pages/sources. */
  growth: MarketingGrowthAnalytics;
  series: AdminSeriesPoint[];
  /** Live figures for today (Africa/Harare), computed directly from the source tables. */
  today: { date: LocalDate; dau: number; questionsAttempted: number; questionsCorrect: number; computedAt: Date };
}

const SERIES_METRICS = [
  METRIC.USERS_TOTAL,
  METRIC.USERS_DAU,
  METRIC.USERS_WAU,
  METRIC.USERS_MAU,
  METRIC.USERS_SIGNUPS,
  METRIC.STUDENTS_ACTIVE,
  METRIC.STUDENTS_PAID,
  METRIC.QUESTIONS_ATTEMPTED,
  METRIC.QUESTIONS_CORRECT,
  METRIC.ASSESSMENTS_SCORED,
  METRIC.AVG_SCORE_PCT,
  METRIC.STUDY_MINUTES,
  METRIC.MOCK_COMPLETED,
  METRIC.MOCK_SCORED,
  METRIC.MOCK_AVG_PCT,
  METRIC.AI_REQUESTS,
  METRIC.AI_COST_MICROS,
  METRIC.CONVERSION_PAID,
  ...RETENTION_DAYS.flatMap((days) => Object.values(retentionMetrics(days))),
];

/** Metric always written by a rollup run; its presence marks a day as computed. */
const COVERAGE_METRIC = METRIC.USERS_DAU;

type DayValues = Map<string, number>;

function sumOver(days: readonly DayValues[], metric: string): number | null {
  if (days.length === 0) return null;
  return days.reduce((sum, day) => sum + (day.get(metric) ?? 0), 0);
}

/** Σ of a dimensioned metric per dimension over the range (aggregated in Postgres), largest first; zero sums dropped. */
async function sumByDimension(
  metric: string,
  range: DateRange,
  prefix: string,
  limit: number | null,
): Promise<{ dimension: string; total: number }[]> {
  return db.$queryRaw<{ dimension: string; total: number }[]>`
    SELECT dm."dimension", sum(dm."value")::float8 AS total
    FROM "DailyMetric" dm
    WHERE dm."metric" = ${metric} AND dm."dimension" LIKE ${`${prefix}%`}
      AND dm."date" >= ${range.from}::date AND dm."date" <= ${range.to}::date
    GROUP BY dm."dimension"
    HAVING sum(dm."value") > 0
    ORDER BY total DESC, dm."dimension"
    ${limit === null ? Prisma.empty : Prisma.sql`LIMIT ${limit}`}`;
}

async function subjectNames(ids: readonly string[]): Promise<Map<string, NamedSubject>> {
  if (ids.length === 0) return new Map();
  const rows = await db.subject.findMany({
    where: { id: { in: [...ids] } },
    select: { id: true, name: true, qualification: { select: { shortName: true } } },
  });
  return new Map(rows.map((row) => [row.id, { subjectId: row.id, name: row.name, qualification: row.qualification.shortName }]));
}

async function topicNames(ids: readonly string[]): Promise<Map<string, NamedTopic>> {
  if (ids.length === 0) return new Map();
  const rows = await db.topic.findMany({
    where: { id: { in: [...ids] } },
    select: { id: true, name: true, syllabus: { select: { subjectId: true, subject: { select: { name: true } } } } },
  });
  return new Map(
    rows.map((row) => [
      row.id,
      { topicId: row.id, name: row.name, subjectId: row.syllabus.subjectId, subjectName: row.syllabus.subject.name },
    ]),
  );
}

function namedTopic(names: Map<string, NamedTopic>, topicId: string): NamedTopic {
  return names.get(topicId) ?? { topicId, name: null, subjectId: null, subjectName: null };
}

/** §35 / §36 admin analytics for an inclusive Africa/Harare date range (at most 366 days). */
export async function getAdminAnalytics(input: { from: LocalDate; to: LocalDate }, options: AdminAnalyticsOptions = {}): Promise<AdminAnalytics> {
  const parsed = dateRangeSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid date range.");
  const range = parsed.data;
  const now = options.now ?? new Date();
  const topN = Math.min(50, Math.max(1, Math.floor(options.topN ?? 10)));
  const minTopicAttempts = Math.max(1, Math.floor(options.minTopicAttempts ?? DEFAULT_MIN_TOPIC_ATTEMPTS));

  const fromDate = dateColumnFromLocalDate(range.from);
  const toDate = dateColumnFromLocalDate(range.to);

  const [seriesRows, popularSubjectRows, subjectAttemptRows, topTopicRows, difficultRows, revenueRows, refundRows, paymentRows, featureRequestRows, featureCostRows, channelRows] =
    await Promise.all([
      db.dailyMetric.findMany({
        where: { metric: { in: SERIES_METRICS }, dimension: "", date: { gte: fromDate, lte: toDate } },
        select: { date: true, metric: true, value: true, updatedAt: true },
      }),
      sumByDimension(METRIC.SUBJECT_ACTIVE_STUDENTS, range, "subject:", topN),
      sumByDimension(METRIC.SUBJECT_ATTEMPTS, range, "subject:", null),
      sumByDimension(METRIC.TOPIC_ATTEMPTS, range, "topic:", topN),
      db.$queryRaw<{ dimension: string; attempts: number; correct: number }[]>`
        SELECT a."dimension", sum(a."value")::float8 AS attempts, coalesce(sum(c."value"), 0)::float8 AS correct
        FROM "DailyMetric" a
        LEFT JOIN "DailyMetric" c
          ON c."date" = a."date" AND c."metric" = ${METRIC.TOPIC_CORRECT} AND c."dimension" = a."dimension"
        WHERE a."metric" = ${METRIC.TOPIC_ATTEMPTS} AND a."dimension" LIKE 'topic:%'
          AND a."date" >= ${range.from}::date AND a."date" <= ${range.to}::date
        GROUP BY a."dimension"
        HAVING sum(a."value") >= ${minTopicAttempts}
        ORDER BY coalesce(sum(c."value"), 0) / sum(a."value") ASC, sum(a."value") DESC, a."dimension"
        LIMIT ${topN}`,
      sumByDimension(METRIC.REVENUE_MINOR, range, "currency:", null),
      sumByDimension(METRIC.REVENUE_REFUNDS_MINOR, range, "currency:", null),
      sumByDimension(METRIC.REVENUE_PAYMENTS, range, "currency:", null),
      sumByDimension(METRIC.AI_REQUESTS, range, "feature:", null),
      sumByDimension(METRIC.AI_COST_MICROS, range, "feature:", null),
      sumByDimension(METRIC.USERS_SIGNUPS, range, "channel:", null),
    ]);

  // --- Per-day platform totals --------------------------------------------------------------------------------------
  const byDay = new Map<LocalDate, DayValues>();
  let lastComputedAt: Date | null = null;
  for (const row of seriesRows) {
    const date = localDateFromDateColumn(row.date);
    let day = byDay.get(date);
    if (!day) {
      day = new Map();
      byDay.set(date, day);
    }
    day.set(row.metric, row.value);
    if (lastComputedAt === null || row.updatedAt > lastComputedAt) lastComputedAt = row.updatedAt;
  }
  const computedDates = [...byDay.entries()].filter(([, day]) => day.has(COVERAGE_METRIC)).map(([date]) => date).sort();
  const computedDays = computedDates.map((date) => byDay.get(date)!);
  const computedThrough = computedDates.at(-1) ?? null;
  const latest = computedThrough ? byDay.get(computedThrough)! : null;
  const series = dailySeries(range, byDay).map(({ date, value }): AdminSeriesPoint => {
    const get = (metric: string) => value?.get(metric) ?? null;
    return {
      date,
      dau: get(METRIC.USERS_DAU),
      wau: get(METRIC.USERS_WAU),
      mau: get(METRIC.USERS_MAU),
      signups: get(METRIC.USERS_SIGNUPS),
      activeStudents: get(METRIC.STUDENTS_ACTIVE),
      paidStudents: get(METRIC.STUDENTS_PAID),
      questionsAttempted: get(METRIC.QUESTIONS_ATTEMPTED),
      questionsCorrect: get(METRIC.QUESTIONS_CORRECT),
      avgScorePct: roundOrNull(get(METRIC.AVG_SCORE_PCT)),
      studyMinutes: roundOrNull(get(METRIC.STUDY_MINUTES)),
      mockCompleted: get(METRIC.MOCK_COMPLETED),
      mockAvgPct: roundOrNull(get(METRIC.MOCK_AVG_PCT)),
      aiRequests: get(METRIC.AI_REQUESTS),
      aiCostMicros: get(METRIC.AI_COST_MICROS),
      conversions: get(METRIC.CONVERSION_PAID),
      retentionD1: get(retentionMetrics(1).rate),
      retentionD7: get(retentionMetrics(7).rate),
      retentionD30: get(retentionMetrics(30).rate),
    };
  });

  // --- Names for the top lists ---------------------------------------------------------------------------------------
  const popularSubjectIds = popularSubjectRows.map((row) => dimensionValue(row.dimension, "subject")).filter((id): id is string => id !== null);
  const topicIds = [...topTopicRows, ...difficultRows]
    .map((row) => dimensionValue(row.dimension, "topic"))
    .filter((id): id is string => id !== null);
  const [subjects, topics] = await Promise.all([subjectNames(popularSubjectIds), topicNames([...new Set(topicIds)])]);
  const subjectAttempts = new Map(subjectAttemptRows.map((row) => [row.dimension, row.total]));

  const revenue = revenueRows.map((row) => ({ currency: row.dimension.slice("currency:".length), amountMinor: row.total }));
  const refunds = new Map(refundRows.map((row) => [row.dimension.slice("currency:".length), row.total]));
  const payments = new Map(paymentRows.map((row) => [row.dimension.slice("currency:".length), row.total]));
  const currencies = [...new Set([...revenue.map((r) => r.currency), ...refunds.keys()])].sort();
  const featureCost = new Map(featureCostRows.map((row) => [row.dimension, row.total]));
  const revenueTotals = currencies.map((currency) => {
    const gross = revenue.find((r) => r.currency === currency)?.amountMinor ?? 0;
    const refunded = refunds.get(currency) ?? 0;
    return { currency, amountMinor: gross, refundsMinor: refunded, netMinor: gross - refunded, payments: payments.get(currency) ?? 0 };
  });
  const fxRates = await getKnownSetting("fx.rates");

  const paidByPlan = computedThrough
    ? await db.dailyMetric.findMany({
        where: { date: dateColumnFromLocalDate(computedThrough), metric: METRIC.STUDENTS_PAID, dimension: { startsWith: "plan:" } },
        select: { dimension: true, value: true },
        orderBy: [{ value: "desc" }, { dimension: "asc" }],
      })
    : [];

  const retention = RETENTION_DAYS.map((days): RetentionSummary => {
    const keys = retentionMetrics(days);
    const combined = combineRetention(
      computedDays.map((day) => ({ cohort: day.get(keys.cohort) ?? 0, retained: day.get(keys.retained) ?? 0 })),
    );
    return { days, cohort: combined.cohort, retained: combined.retained, rate: combined.rate };
  });

  const attempted = sumOver(computedDays, METRIC.QUESTIONS_ATTEMPTED);
  const correct = sumOver(computedDays, METRIC.QUESTIONS_CORRECT);
  const avgScore = weightedMean(
    computedDays.map((day) => ({ mean: day.get(METRIC.AVG_SCORE_PCT) ?? null, weight: day.get(METRIC.ASSESSMENTS_SCORED) ?? 0 })),
  );
  const mockAvg = weightedMean(
    computedDays.map((day) => ({ mean: day.get(METRIC.MOCK_AVG_PCT) ?? null, weight: day.get(METRIC.MOCK_SCORED) ?? 0 })),
  );

  // --- Live "today so far" -------------------------------------------------------------------------------------------
  const today = localDateString(now, PLATFORM_TIMEZONE);
  const demoUserIds = await fetchDemoUserIds(db);
  const [dauToday, questionsToday, growth] = await Promise.all([
    countActiveLearnersOn(db, { date: today, demoUserIds }),
    answeredQuestionTotals(db, { start: startOfLocalDay(today, PLATFORM_TIMEZONE), end: now, demoUserIds }),
    getMarketingGrowthAnalytics(range, topN),
  ]);

  const missingDates = series.filter((point) => point.dau === null).map((point) => point.date);

  return {
    range: { ...range, days: rangeDays(range) },
    coverage: { daysWithData: computedDays.length, missingDates, computedThrough, lastComputedAt },
    funnel: {
      users: latest?.get(METRIC.USERS_TOTAL) ?? null,
      activeStudents: latest?.get(METRIC.STUDENTS_ACTIVE) ?? null,
      paidStudents: latest?.get(METRIC.STUDENTS_PAID) ?? null,
      asOf: computedThrough,
      revenue,
      popularSubjects: popularSubjectRows.flatMap((row) => {
        const subjectId = dimensionValue(row.dimension, "subject");
        if (!subjectId) return [];
        const named = subjects.get(subjectId) ?? { subjectId, name: null, qualification: null };
        return [{ ...named, activeStudentDays: row.total, questionsAttempted: subjectAttempts.get(row.dimension) ?? 0 }];
      }),
      mostAttemptedTopics: topTopicRows.flatMap((row) => {
        const topicId = dimensionValue(row.dimension, "topic");
        return topicId ? [{ ...namedTopic(topics, topicId), attempts: row.total }] : [];
      }),
      retention,
    },
    totals: {
      signups: sumOver(computedDays, METRIC.USERS_SIGNUPS),
      questionsAttempted: attempted,
      questionsCorrect: correct,
      correctRatePct: attempted === null || correct === null ? null : percent(correct, attempted),
      avgScorePct: roundOrNull(avgScore),
      studyMinutes: roundOrNull(sumOver(computedDays, METRIC.STUDY_MINUTES)),
      mockCompleted: sumOver(computedDays, METRIC.MOCK_COMPLETED),
      mockAvgPct: roundOrNull(mockAvg),
      conversions: sumOver(computedDays, METRIC.CONVERSION_PAID),
      aiRequests: sumOver(computedDays, METRIC.AI_REQUESTS),
      aiCostMicros: sumOver(computedDays, METRIC.AI_COST_MICROS),
      revenue: revenueTotals,
      revenueUsd: revenueUsdEquivalent(revenueTotals, fxRates),
    },
    topLists: {
      mostDifficultTopics: difficultRows.flatMap((row) => {
        const topicId = dimensionValue(row.dimension, "topic");
        const rate = ratio(row.correct, row.attempts);
        if (!topicId || rate === null) return [];
        return [{ ...namedTopic(topics, topicId), attempts: row.attempts, correct: row.correct, correctRatePct: roundOrNull(rate * 100)! }];
      }),
      aiByFeature: featureRequestRows.map((row) => ({
        feature: row.dimension.slice("feature:".length),
        requests: row.total,
        costMicros: featureCost.get(row.dimension) ?? 0,
      })),
      signupsByChannel: channelRows.map((row) => ({ channel: row.dimension.slice("channel:".length), signups: row.total })),
      paidByPlan: paidByPlan.map((row) => ({ planCode: row.dimension.slice("plan:".length), students: row.value })),
    },
    growth,
    series,
    today: {
      date: today,
      dau: dauToday,
      questionsAttempted: questionsToday.attempted,
      questionsCorrect: questionsToday.correct,
      computedAt: now,
    },
  };
}
