import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { addDays, dateColumnFromLocalDate, localDateString, type LocalDate } from "@/lib/dates";
import { getAdminAnalytics } from "./admin";
import { dimension, METRIC, retentionMetrics } from "./metrics";
import {
  addDailyActivity,
  createAttempt,
  createCurriculum,
  createUser,
  enrol,
  harareTime,
  isolatedDate,
  type CurriculumFixture,
} from "./testing/fixtures";

/**
 * getAdminAnalytics reads DailyMetric rollups for a range plus a live "today". The rollup rows are inserted directly
 * for a range that is verified empty first (and deleted afterwards), so every aggregate is asserted exactly.
 */

let A: LocalDate;
const range = () => ({ from: A, to: addDays(A, 2) });
let s1: CurriculumFixture;
let s2: CurriculumFixture;
const CURRENCY = "QAA";

async function rangeIsEmpty(from: LocalDate): Promise<boolean> {
  const [metrics, growth] = await Promise.all([
    db.dailyMetric.count({
      where: { date: { gte: dateColumnFromLocalDate(addDays(from, -1)), lte: dateColumnFromLocalDate(addDays(from, 3)) } },
    }),
    db.marketingEvent.count({ where: { createdAt: { gte: harareTime(from, 0), lt: harareTime(addDays(from, 3), 0) } } }),
  ]);
  return metrics === 0 && growth === 0;
}

function rows(date: LocalDate, entries: [string, string, number][]) {
  return entries.map(([metric, dim, value]) => ({ date: dateColumnFromLocalDate(date), metric, dimension: dim, value }));
}

beforeAll(async () => {
  for (let i = 0; i < 10; i += 1) {
    const candidate = isolatedDate(1900, 1990); // never used by the rollup test (2001–2018)
    if (await rangeIsEmpty(candidate)) {
      A = candidate;
      break;
    }
  }
  if (!A) throw new Error("Could not find an empty DailyMetric date range for the test");
  s1 = await createCurriculum({ topicCount: 3 });
  s2 = await createCurriculum({ topicCount: 1 });
  const subj1 = dimension("subject", s1.subjectId);
  const subj2 = dimension("subject", s2.subjectId);
  const [t1, t2, t3] = s1.topicIds.map((id) => dimension("topic", id)) as [string, string, string];
  const cur = dimension("currency", CURRENCY);
  const d1 = retentionMetrics(1);
  await db.dailyMetric.createMany({
    data: [
      ...rows(A, [
        [METRIC.USERS_TOTAL, "", 100], [METRIC.USERS_DAU, "", 10], [METRIC.USERS_WAU, "", 20], [METRIC.USERS_MAU, "", 30],
        [METRIC.USERS_SIGNUPS, "", 5], [METRIC.USERS_SIGNUPS, "channel:WEB", 3], [METRIC.USERS_SIGNUPS, "channel:API", 2],
        [METRIC.STUDENTS_ACTIVE, "", 25], [METRIC.STUDENTS_PAID, "", 4], [METRIC.STUDENTS_PAID, "plan:XPLAN", 3],
        [METRIC.QUESTIONS_ATTEMPTED, "", 50], [METRIC.QUESTIONS_CORRECT, "", 30],
        [METRIC.ASSESSMENTS_SCORED, "", 2], [METRIC.AVG_SCORE_PCT, "", 70], [METRIC.STUDY_MINUTES, "", 120.5],
        [METRIC.MOCK_COMPLETED, "", 1], [METRIC.MOCK_SCORED, "", 1], [METRIC.MOCK_AVG_PCT, "", 60],
        [METRIC.AI_REQUESTS, "", 7], [METRIC.AI_COST_MICROS, "", 1500],
        [METRIC.AI_REQUESTS, "feature:TUTOR", 5], [METRIC.AI_COST_MICROS, "feature:TUTOR", 1000],
        [METRIC.CONVERSION_PAID, "", 1],
        [d1.cohort, "", 4], [d1.retained, "", 1], [d1.rate, "", 0.25],
        [METRIC.REVENUE_MINOR, cur, 800], [METRIC.REVENUE_PAYMENTS, cur, 2], [METRIC.REVENUE_REFUNDS_MINOR, cur, 100],
        [METRIC.SUBJECT_ACTIVE_STUDENTS, subj1, 3], [METRIC.SUBJECT_ACTIVE_STUDENTS, subj2, 1],
        [METRIC.SUBJECT_ATTEMPTS, subj1, 40], [METRIC.SUBJECT_ATTEMPTS, subj2, 10],
        [METRIC.TOPIC_ATTEMPTS, t1, 30], [METRIC.TOPIC_CORRECT, t1, 10],
        [METRIC.TOPIC_ATTEMPTS, t2, 20], [METRIC.TOPIC_CORRECT, t2, 20],
        [METRIC.TOPIC_ATTEMPTS, t3, 2], [METRIC.TOPIC_CORRECT, t3, 0],
      ]),
      // A + 1 was never rolled up: a gap, not zeros.
      ...rows(addDays(A, 2), [
        [METRIC.USERS_TOTAL, "", 110], [METRIC.USERS_DAU, "", 12], [METRIC.USERS_WAU, "", 22], [METRIC.USERS_MAU, "", 33],
        [METRIC.USERS_SIGNUPS, "", 4], [METRIC.USERS_SIGNUPS, "channel:WEB", 4],
        [METRIC.STUDENTS_ACTIVE, "", 27], [METRIC.STUDENTS_PAID, "", 6], [METRIC.STUDENTS_PAID, "plan:XPLAN", 5],
        [METRIC.QUESTIONS_ATTEMPTED, "", 50], [METRIC.QUESTIONS_CORRECT, "", 20],
        [METRIC.ASSESSMENTS_SCORED, "", 3], [METRIC.AVG_SCORE_PCT, "", 50], [METRIC.STUDY_MINUTES, "", 60],
        [METRIC.MOCK_COMPLETED, "", 2], [METRIC.MOCK_SCORED, "", 2], [METRIC.MOCK_AVG_PCT, "", 80],
        [METRIC.AI_REQUESTS, "", 3], [METRIC.AI_COST_MICROS, "", 500],
        [METRIC.AI_REQUESTS, "feature:TUTOR", 3], [METRIC.AI_COST_MICROS, "feature:TUTOR", 500],
        [METRIC.CONVERSION_PAID, "", 2],
        [d1.cohort, "", 6], [d1.retained, "", 3], [d1.rate, "", 0.5],
        [METRIC.REVENUE_MINOR, cur, 200], [METRIC.REVENUE_PAYMENTS, cur, 1],
        [METRIC.SUBJECT_ACTIVE_STUDENTS, subj1, 3], [METRIC.SUBJECT_ACTIVE_STUDENTS, subj2, 4],
        [METRIC.TOPIC_ATTEMPTS, t1, 10], [METRIC.TOPIC_CORRECT, t1, 0],
      ]),
    ],
  });
  await db.marketingEvent.createMany({
    data: [
      { type: "PAGE_VIEW", path: "/exam-candidates", utmSource: "google", createdAt: harareTime(A, 9) },
      { type: "PAGE_VIEW", path: "/exam-candidates", referrerHost: "facebook.com", createdAt: harareTime(A, 10) },
      { type: "PAGE_VIEW", path: "/pricing", createdAt: harareTime(addDays(A, 2), 10) },
      { type: "SIGNUP_CLICK", path: "/exam-candidates", target: "/register", createdAt: harareTime(A, 11) },
      { type: "CHECKOUT_CLICK", path: "/pricing", target: "/app/unlock", createdAt: harareTime(addDays(A, 2), 11) },
      { type: "CLICK", path: "/exam-candidates", target: "/exam-countdown", createdAt: harareTime(addDays(A, 2), 12) },
    ],
  });
});

afterAll(async () => {
  if (A) {
    await Promise.all([
      db.dailyMetric.deleteMany({
        where: { date: { gte: dateColumnFromLocalDate(A), lte: dateColumnFromLocalDate(addDays(A, 2)) } },
      }),
      db.marketingEvent.deleteMany({ where: { createdAt: { gte: harareTime(A, 0), lt: harareTime(addDays(A, 3), 0) } } }),
    ]);
  }
});

describe("getAdminAnalytics", () => {
  it("builds the §35 funnel from the latest rolled-up day and range sums", async () => {
    const result = await getAdminAnalytics(range(), { minTopicAttempts: 5 });
    expect(result.range).toEqual({ from: A, to: addDays(A, 2), days: 3 });
    expect(result.coverage.daysWithData).toBe(2);
    expect(result.coverage.missingDates).toEqual([addDays(A, 1)]);
    expect(result.coverage.computedThrough).toBe(addDays(A, 2));
    expect(result.funnel).toMatchObject({ users: 110, activeStudents: 27, paidStudents: 6, asOf: addDays(A, 2) });
    expect(result.funnel.revenue).toEqual([{ currency: CURRENCY, amountMinor: 1000 }]);
    expect(result.funnel.popularSubjects).toEqual([
      { subjectId: s1.subjectId, name: s1.subjectName, qualification: expect.any(String), activeStudentDays: 6, questionsAttempted: 40 },
      { subjectId: s2.subjectId, name: s2.subjectName, qualification: expect.any(String), activeStudentDays: 5, questionsAttempted: 10 },
    ]);
    expect(result.funnel.mostAttemptedTopics.map((t) => [t.topicId, t.attempts, t.name, t.subjectId])).toEqual([
      [s1.topicIds[0], 40, s1.topicNames[0], s1.subjectId],
      [s1.topicIds[1], 20, s1.topicNames[1], s1.subjectId],
      [s1.topicIds[2], 2, s1.topicNames[2], s1.subjectId],
    ]);
    expect(result.funnel.retention).toEqual([
      { days: 1, cohort: 10, retained: 4, rate: 0.4 },
      { days: 7, cohort: 0, retained: 0, rate: null },
      { days: 30, cohort: 0, retained: 0, rate: null },
    ]);
    expect(result.growth).toMatchObject({
      totals: { visits: 3, clicks: 3, signupClicks: 1, checkoutClicks: 1 },
      topPages: [
        { path: "/exam-candidates", visits: 2 },
        { path: "/pricing", visits: 1 },
      ],
      topClicks: expect.arrayContaining([
        { target: "/app/unlock", clicks: 1 },
        { target: "/exam-countdown", clicks: 1 },
        { target: "/register", clicks: 1 },
      ]),
      sources: expect.arrayContaining([
        { source: "direct", visits: 1 },
        { source: "facebook.com", visits: 1 },
        { source: "google", visits: 1 },
      ]),
    });
  });

  it("aggregates totals exactly (weighted averages, revenue net of refunds)", async () => {
    const { totals } = await getAdminAnalytics(range());
    expect(totals).toEqual({
      signups: 9,
      questionsAttempted: 100,
      questionsCorrect: 50,
      correctRatePct: 50,
      avgScorePct: 58, // (70×2 + 50×3) / 5
      studyMinutes: 180.5,
      mockCompleted: 3,
      mockAvgPct: 73.3, // (60×1 + 80×2) / 3
      conversions: 3,
      aiRequests: 10,
      aiCostMicros: 2000,
      revenue: [{ currency: CURRENCY, amountMinor: 1000, refundsMinor: 100, netMinor: 900, payments: 3 }],
      // No rate configured for the test currency: no USD total is invented (src/lib/billing/fx.ts).
      revenueUsd: { complete: false, grossUsdMinor: 0, refundsUsdMinor: 0, netUsdMinor: 0, rates: [], missingCurrencies: [CURRENCY] },
    });
  });

  it("ranks difficult topics above the attempt threshold and lists breakdowns", async () => {
    const { topLists } = await getAdminAnalytics(range(), { minTopicAttempts: 5 });
    expect(topLists.mostDifficultTopics.map((t) => [t.topicId, t.attempts, t.correct, t.correctRatePct])).toEqual([
      [s1.topicIds[0], 40, 10, 25],
      [s1.topicIds[1], 20, 20, 100],
    ]);
    expect(topLists.aiByFeature).toEqual([{ feature: "TUTOR", requests: 8, costMicros: 1500 }]);
    expect(topLists.signupsByChannel).toEqual([
      { channel: "WEB", signups: 7 },
      { channel: "API", signups: 2 },
    ]);
    expect(topLists.paidByPlan).toEqual([{ planCode: "XPLAN", students: 5 }]);
  });

  it("returns a daily series with honest gaps", async () => {
    const { series } = await getAdminAnalytics(range());
    expect(series.map((p) => p.date)).toEqual([A, addDays(A, 1), addDays(A, 2)]);
    expect(series[0]).toMatchObject({ dau: 10, wau: 20, mau: 30, signups: 5, avgScorePct: 70, retentionD1: 0.25, retentionD7: null });
    expect(Object.entries(series[1]!).filter(([key, v]) => key !== "date" && v !== null)).toEqual([]);
    expect(series[2]).toMatchObject({ dau: 12, paidStudents: 6, mockAvgPct: 80, conversions: 2 });
  });

  it("returns nulls (not zeros) when nothing was rolled up in the range", async () => {
    const empty = { from: addDays(A, -400), to: addDays(A, -398) };
    const result = await getAdminAnalytics(empty);
    expect(result.coverage.daysWithData).toBe(0);
    expect(result.funnel.users).toBeNull();
    expect(result.totals.questionsAttempted).toBeNull();
    expect(result.totals.avgScorePct).toBeNull();
    expect(result.funnel.popularSubjects).toEqual([]);
  });

  it("includes a live 'today so far' from the source tables", async () => {
    const now = new Date();
    const curriculum = await createCurriculum({ topicCount: 1 });
    const userId = await createUser();
    await enrol(userId, curriculum);
    await addDailyActivity(userId, localDateString(now, "Africa/Harare"), { studySeconds: 120, questionsAttempted: 2 });
    const startedAt = new Date(now.getTime() - 60_000);
    await createAttempt({
      userId, curriculum, mode: "PRACTICE", startedAt, submittedAt: startedAt,
      answers: [{ correct: true, createdAt: startedAt }, { correct: false, createdAt: startedAt }],
    });
    const result = await getAdminAnalytics(range(), { now: new Date(now.getTime() + 1000) });
    expect(result.today.date).toBe(localDateString(now, "Africa/Harare"));
    expect(result.today.dau).toBeGreaterThanOrEqual(1);
    expect(result.today.questionsAttempted).toBeGreaterThanOrEqual(2);
    expect(result.today.questionsCorrect).toBeGreaterThanOrEqual(1);
  });

  it("validates the range", async () => {
    await expect(getAdminAnalytics({ from: addDays(A, 1), to: A })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(getAdminAnalytics({ from: A, to: addDays(A, 400) })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(getAdminAnalytics({ from: "yesterday", to: A })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
