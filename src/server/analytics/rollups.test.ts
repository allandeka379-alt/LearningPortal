import { randomInt, randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { addDays, dateColumnFromLocalDate, type LocalDate } from "@/lib/dates";
import { dimension, METRIC, OWNED_METRICS, retentionMetrics } from "./metrics";
import { backfill, computeDailyMetrics, computeYesterdayMetrics, dailyMetricsDedupeKey } from "./rollups";
import {
  addAiSpend,
  addAiUsage,
  addDailyActivity,
  addSchoolMember,
  addStudySession,
  createAttempt,
  createCurriculum,
  createPayment,
  createPlan,
  createSchool,
  createSchoolSeat,
  createUser,
  createUserSubscription,
  enrol,
  harareTime,
  isolatedDate,
  suffix,
  type CurriculumFixture,
} from "./testing/fixtures";

/**
 * Integration test for the nightly DailyMetric rollup against a small, realistic dataset on a random, isolated day
 * (years 2001–2019, where no other test writes). Platform totals are asserted as DELTAS against a run before the
 * dataset existed (the database is shared and never truncated); dimension rows for this test's own subject, topics,
 * plan and currency are asserted exactly.
 */

const D: LocalDate = isolatedDate();
const NOW = harareTime(addDays(D, 2), 9); // the day is over
const MIN_TOPIC_ATTEMPTS = 3;
/** A random fictional ISO-4217-shaped code so the currency dimension rows belong to this run only. */
const CURRENCY = `Q${String.fromCharCode(65 + randomInt(26))}${String.fromCharCode(65 + randomInt(26))}`;

type Snapshot = Map<string, number>;

async function snapshot(date: LocalDate): Promise<Snapshot> {
  const rows = await db.dailyMetric.findMany({
    where: { date: dateColumnFromLocalDate(date) },
    select: { metric: true, dimension: true, value: true },
  });
  return new Map(rows.map((row) => [`${row.metric}|${row.dimension}`, row.value]));
}

function value(snap: Snapshot, metric: string, dim = ""): number | undefined {
  return snap.get(`${metric}|${dim}`);
}

function delta(after: Snapshot, before: Snapshot, metric: string, dim = ""): number {
  return (value(after, metric, dim) ?? 0) - (value(before, metric, dim) ?? 0);
}

describe("computeDailyMetrics", () => {
  let before: Snapshot;
  let after: Snapshot;
  let curriculum: CurriculumFixture;
  let planCode: string;
  const ids: Record<string, string> = {};

  beforeAll(async () => {
    await computeDailyMetrics(D, { now: NOW, minTopicAttempts: MIN_TOPIC_ATTEMPTS });
    before = await snapshot(D);

    curriculum = await createCurriculum({ topicCount: 3 });

    // --- Users: signups on D, cohorts for retention, a parent, a demo account -----------------------------------
    ids.s1 = await createUser({ createdAt: harareTime(addDays(D, -1), 10), signupChannel: "WEB" }); // d1 cohort, active D
    ids.s2 = await createUser({ createdAt: harareTime(addDays(D, -1), 11), signupChannel: "WHATSAPP" }); // d1 cohort, freeze only
    ids.s3 = await createUser({ createdAt: harareTime(addDays(D, -7), 12) }); // d7 cohort, active D
    ids.s4 = await createUser({ createdAt: harareTime(D, 8), signupChannel: "WEB" }); // signup D
    ids.s5 = await createUser({ createdAt: harareTime(D, 23, 30), signupChannel: "API" }); // signup D (late evening)
    ids.s6 = await createUser({ createdAt: harareTime(addDays(D, 1), 0, 0) }); // next day: not a D signup
    ids.s7 = await createUser({ createdAt: harareTime(addDays(D, -40), 9) }); // active D-20 (MAU only)
    ids.s8 = await createUser({ createdAt: harareTime(addDays(D, -30), 9) }); // d30 cohort, inactive on D
    ids.p1 = await createUser({ createdAt: harareTime(addDays(D, -50), 9), student: false, roles: ["PARENT"] });
    ids.p2 = await createUser({ createdAt: harareTime(addDays(D, -1), 9), student: false, roles: ["PARENT"] });
    ids.demo = await createUser({ createdAt: harareTime(D, 9), isDemo: true });

    for (const key of ["s1", "s3", "s4", "s7", "s8", "demo"]) await enrol(ids[key]!, curriculum);

    // --- Daily activity ---------------------------------------------------------------------------------------------
    await addDailyActivity(ids.s1!, D, { studySeconds: 1200, questionsAttempted: 5 });
    await addDailyActivity(ids.s1!, addDays(D, -1), { studySeconds: 300 });
    await addDailyActivity(ids.s3!, D, { studySeconds: 600 });
    await addDailyActivity(ids.s4!, addDays(D, -3), { studySeconds: 60 });
    await addDailyActivity(ids.s7!, addDays(D, -20), { questionsAttempted: 2 });
    await addDailyActivity(ids.p1!, addDays(D, -2), { flashcardsReviewed: 3, studySeconds: 0 });
    await addDailyActivity(ids.s2!, D, { freezeOnly: true });
    await addDailyActivity(ids.demo!, D, { studySeconds: 600 });

    // --- Questions and assessments ----------------------------------------------------------------------------------
    const at = (h: number) => harareTime(D, h);
    await createAttempt({
      userId: ids.s1!, curriculum, mode: "PRACTICE", startedAt: at(9), submittedAt: at(10),
      answers: [
        { correct: true, topicIndex: 0 }, { correct: true, topicIndex: 0 }, { correct: false, topicIndex: 0 },
        { correct: false, topicIndex: 1 }, { correct: false, topicIndex: 1 },
      ],
    });
    const s3Practice = await createAttempt({
      userId: ids.s3!, curriculum, mode: "PRACTICE", startedAt: at(11), submittedAt: at(12),
      answers: [
        { correct: true, topicIndex: 0 },
        { correct: true, topicIndex: 2 }, { correct: true, topicIndex: 2 }, { correct: true, topicIndex: 2 },
      ],
    });
    // A pending (not yet marked) answer on D is not "attempted".
    await db.questionAttempt.create({
      data: {
        attemptId: s3Practice, userId: ids.s3!, subjectId: curriculum.subjectId, topicId: curriculum.topicIds[1]!,
        questionId: curriculum.questionIds[1]!, createdAt: at(12), questionRevision: 1, markingStatus: "PENDING",
        position: 5, difficulty: 3, marksAvailable: 1, response: { type: "SHORT_ANSWER", text: "x" },
      },
    });
    // Outside the day / demo: excluded.
    await createAttempt({
      userId: ids.s4!, curriculum, mode: "PRACTICE", startedAt: harareTime(addDays(D, -1), 23), submittedAt: harareTime(addDays(D, -1), 23, 30),
      answers: [{ correct: true, topicIndex: 0 }],
    });
    await createAttempt({
      userId: ids.demo!, curriculum, mode: "PRACTICE", startedAt: at(9), submittedAt: at(9),
      answers: [{ correct: false, topicIndex: 0 }, { correct: false, topicIndex: 0 }],
    });
    // Studied the subject without answering questions (still an active student of the subject); zero-time session not.
    await addStudySession(ids.s4!, curriculum.subjectId, at(13), D, 900);
    await addStudySession(ids.s1!, curriculum.subjectId, at(15), D, 300);
    await addStudySession(ids.s7!, curriculum.subjectId, at(16), D, 0);

    await createAttempt({ userId: ids.s1!, curriculum, mode: "MOCK_EXAM", startedAt: at(12), submittedAt: at(14), percentage: 80 });
    await createAttempt({ userId: ids.s3!, curriculum, mode: "MOCK_EXAM", startedAt: at(13), submittedAt: at(15), percentage: 60 });
    await createAttempt({ userId: ids.s4!, curriculum, mode: "MOCK_EXAM", startedAt: at(14), submittedAt: at(16), status: "AWAITING_MARKING" });
    await createAttempt({ userId: ids.s3!, curriculum, mode: "SUBJECT_TEST", startedAt: at(9), submittedAt: at(10), percentage: 50 });
    await createAttempt({ userId: ids.s4!, curriculum, mode: "QUIZ", startedAt: harareTime(addDays(D, 1), 9), submittedAt: harareTime(addDays(D, 1), 10), percentage: 90 });
    await createAttempt({ userId: ids.demo!, curriculum, mode: "SUBJECT_TEST", startedAt: at(9), submittedAt: at(10), percentage: 10 });

    // --- Billing ------------------------------------------------------------------------------------------------------
    const plan = await createPlan("INDIVIDUAL");
    planCode = plan.code;
    const subS1 = await createUserSubscription(ids.s1!, plan.id, { status: "ACTIVE", startedAt: at(9), periodEnd: harareTime(addDays(D, 30), 9) });
    await createPayment({ payerUserId: ids.p2!, beneficiaryUserId: ids.s1!, subscriptionId: subS1, amountMinor: 500, currency: CURRENCY, paidAt: at(9) });
    const oldS3 = await createUserSubscription(ids.s3!, plan.id, {
      status: "EXPIRED", startedAt: harareTime(addDays(D, -60), 9), periodEnd: harareTime(addDays(D, -30), 9),
    });
    await createPayment({
      payerUserId: ids.s3!, beneficiaryUserId: ids.s3!, subscriptionId: oldS3, amountMinor: 300, currency: CURRENCY,
      paidAt: harareTime(addDays(D, -60), 9), refundedAt: at(13),
    });
    const newS3 = await createUserSubscription(ids.s3!, plan.id, { status: "ACTIVE", startedAt: at(12), periodEnd: harareTime(addDays(D, 30), 12) });
    await createPayment({ payerUserId: ids.s3!, beneficiaryUserId: ids.s3!, subscriptionId: newS3, amountMinor: 300, currency: CURRENCY, paidAt: at(12) });
    await createUserSubscription(ids.s4!, plan.id, { status: "TRIALING", startedAt: harareTime(addDays(D, -2), 9), periodEnd: harareTime(addDays(D, 5), 9) });
    await createUserSubscription(ids.s7!, plan.id, {
      status: "EXPIRED", startedAt: harareTime(addDays(D, -40), 9), periodEnd: harareTime(addDays(D, -5), 9),
    });
    await createUserSubscription(ids.demo!, plan.id, { status: "ACTIVE", startedAt: at(9), periodEnd: harareTime(addDays(D, 30), 9) });
    const school = await createSchool();
    await addSchoolMember(school.schoolId, ids.s8!, "STUDENT");
    const schoolPlan = await createPlan("SCHOOL");
    await createSchoolSeat({
      schoolId: school.schoolId, studentUserId: ids.s8!, schoolPlanId: schoolPlan.id,
      startedAt: harareTime(addDays(D, -10), 9), periodEnd: harareTime(addDays(D, 100), 9),
    });

    // --- AI ----------------------------------------------------------------------------------------------------------
    await addAiSpend(D, 0, 5, 1000);
    await addAiSpend(D, 3, 2, 500);
    await addAiUsage(ids.s1!, D, "TUTOR", 4, 900);
    await addAiUsage(ids.s3!, D, "SOLVER", 3, 600);
    await addAiUsage(ids.demo!, D, "TUTOR", 10, 5000);

    await computeDailyMetrics(D, { now: NOW, minTopicAttempts: MIN_TOPIC_ATTEMPTS });
    after = await snapshot(D);
  });

  it("counts signups by channel and registered users at the end of the day", () => {
    expect(delta(after, before, METRIC.USERS_SIGNUPS)).toBe(2);
    expect(delta(after, before, METRIC.USERS_SIGNUPS, "channel:WEB")).toBe(1);
    expect(delta(after, before, METRIC.USERS_SIGNUPS, "channel:API")).toBe(1);
    // s1 s2 s3 s4 s5 s7 s8 p1 p2 + the school admin? (created now, i.e. after D: excluded) — demo and s6 excluded.
    expect(delta(after, before, METRIC.USERS_TOTAL)).toBe(9);
  });

  it("computes DAU / WAU / MAU, active students and study minutes from DailyActivity", () => {
    expect(delta(after, before, METRIC.USERS_DAU)).toBe(2); // s1, s3 (freeze-only s2 and demo excluded)
    expect(delta(after, before, METRIC.USERS_WAU)).toBe(4); // + s4 (D-3), p1 (D-2)
    expect(delta(after, before, METRIC.USERS_MAU)).toBe(5); // + s7 (D-20)
    expect(delta(after, before, METRIC.STUDENTS_ACTIVE)).toBe(4); // MAU without the parent
    expect(delta(after, before, METRIC.STUDY_MINUTES)).toBeCloseTo(30, 10); // (1200 + 600) s
  });

  it("counts paid students from live subscriptions and school seats", () => {
    expect(delta(after, before, METRIC.STUDENTS_PAID)).toBe(4); // s1, s3 (new sub), s4 (trial), s8 (seat)
    expect(value(after, METRIC.STUDENTS_PAID, dimension("plan", planCode))).toBe(3);
  });

  it("computes revenue, refunds and first-payment conversions", () => {
    expect(value(after, METRIC.REVENUE_MINOR, dimension("currency", CURRENCY))).toBe(800);
    expect(value(after, METRIC.REVENUE_PAYMENTS, dimension("currency", CURRENCY))).toBe(2);
    expect(value(after, METRIC.REVENUE_REFUNDS_MINOR, dimension("currency", CURRENCY))).toBe(300);
    expect(delta(after, before, METRIC.CONVERSION_PAID)).toBe(1); // s1 only: s3 had paid before
  });

  it("counts answered questions, popular subjects and topic attempts", () => {
    expect(delta(after, before, METRIC.QUESTIONS_ATTEMPTED)).toBe(9);
    expect(delta(after, before, METRIC.QUESTIONS_CORRECT)).toBe(6);
    const subject = dimension("subject", curriculum.subjectId);
    expect(value(after, METRIC.SUBJECT_ATTEMPTS, subject)).toBe(9);
    expect(value(after, METRIC.SUBJECT_ACTIVE_STUDENTS, subject)).toBe(3); // s1, s3 (answers) + s4 (session)
    const [t0, t1, t2] = curriculum.topicIds.map((id) => dimension("topic", id));
    expect(value(after, METRIC.TOPIC_ATTEMPTS, t0)).toBe(4);
    expect(value(after, METRIC.TOPIC_CORRECT, t0)).toBe(3);
    expect(value(after, METRIC.TOPIC_ATTEMPTS, t1)).toBe(2);
    expect(value(after, METRIC.TOPIC_CORRECT, t1)).toBe(0);
    expect(value(after, METRIC.TOPIC_ATTEMPTS, t2)).toBe(3);
    expect(value(after, METRIC.TOPIC_CORRECT, t2)).toBe(3);
  });

  it("ranks topic difficulty only above the minimum-attempts threshold", () => {
    const [t0, t1, t2] = curriculum.topicIds.map((id) => dimension("topic", id));
    expect(value(after, METRIC.TOPIC_CORRECT_RATE, t0)).toBeCloseTo(0.75, 10);
    expect(value(after, METRIC.TOPIC_CORRECT_RATE, t2)).toBeCloseTo(1, 10);
    expect(value(after, METRIC.TOPIC_CORRECT_RATE, t1)).toBeUndefined(); // 2 < 3 attempts: never ranked
  });

  it("computes test averages and mock exam performance", () => {
    const subject = dimension("subject", curriculum.subjectId);
    expect(value(after, METRIC.ASSESSMENTS_SCORED, subject)).toBe(3);
    expect(value(after, METRIC.AVG_SCORE_PCT, subject)).toBeCloseTo((80 + 60 + 50) / 3, 10);
    expect(delta(after, before, METRIC.ASSESSMENTS_SCORED)).toBe(3);
    expect(delta(after, before, METRIC.MOCK_COMPLETED)).toBe(3);
    expect(delta(after, before, METRIC.MOCK_SCORED)).toBe(2);
    const mockScored = value(after, METRIC.MOCK_SCORED) ?? 0;
    const baseScored = value(before, METRIC.MOCK_SCORED) ?? 0;
    const baseSum = (value(before, METRIC.MOCK_AVG_PCT) ?? 0) * baseScored;
    expect(value(after, METRIC.MOCK_AVG_PCT)).toBeCloseTo((baseSum + 80 + 60) / mockScored, 10);
  });

  it("reads AI usage from the spend counter and the per-feature ledger (demo excluded)", () => {
    expect(delta(after, before, METRIC.AI_REQUESTS)).toBe(7);
    expect(delta(after, before, METRIC.AI_COST_MICROS)).toBe(1500);
    expect(delta(after, before, METRIC.AI_REQUESTS, "feature:TUTOR")).toBe(4);
    expect(delta(after, before, METRIC.AI_COST_MICROS, "feature:TUTOR")).toBe(900);
    expect(delta(after, before, METRIC.AI_REQUESTS, "feature:SOLVER")).toBe(3);
  });

  it("computes day-N retention for student signup cohorts", () => {
    const d1 = retentionMetrics(1);
    const d7 = retentionMetrics(7);
    const d30 = retentionMetrics(30);
    expect(delta(after, before, d1.cohort)).toBe(2); // s1, s2 (the parent p2 is not a student)
    expect(delta(after, before, d1.retained)).toBe(1); // s1
    expect(delta(after, before, d7.cohort)).toBe(1);
    expect(delta(after, before, d7.retained)).toBe(1);
    expect(delta(after, before, d30.cohort)).toBe(1);
    expect(delta(after, before, d30.retained)).toBe(0);
    for (const keys of [d1, d7, d30]) {
      const cohort = value(after, keys.cohort) ?? 0;
      const retained = value(after, keys.retained) ?? 0;
      expect(cohort).toBeGreaterThan(0);
      expect(value(after, keys.rate)).toBeCloseTo(retained / cohort, 10);
    }
  });

  it("is idempotent and removes stale rows of owned metrics only", async () => {
    const strayTopic = dimension("topic", randomUUID());
    await db.dailyMetric.create({ data: { date: dateColumnFromLocalDate(D), metric: METRIC.TOPIC_ATTEMPTS, dimension: strayTopic, value: 42 } });
    const foreign = `test.custom${suffix()}`;
    await db.dailyMetric.create({ data: { date: dateColumnFromLocalDate(D), metric: foreign, dimension: "", value: 1 } });
    expect(OWNED_METRICS).not.toContain(foreign);

    const rerun = await computeDailyMetrics(D, { now: NOW, minTopicAttempts: MIN_TOPIC_ATTEMPTS });
    expect(rerun.rowsDeleted).toBeGreaterThanOrEqual(1);
    const again = await snapshot(D);
    expect(value(again, METRIC.TOPIC_ATTEMPTS, strayTopic)).toBeUndefined();
    expect(value(again, foreign)).toBe(1);
    for (const [key, v] of after) expect(again.get(key), key).toBe(v);
  });

  it("refuses days that have not ended and malformed dates", async () => {
    await expect(computeDailyMetrics(addDays(D, 2), { now: NOW })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(computeDailyMetrics("2019-02-30", { now: NOW })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(backfill(D, addDays(D, -1), { now: NOW })).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("computes yesterday for the nightly job and backfills ranges", async () => {
    const nightly = await computeYesterdayMetrics({ now: harareTime(addDays(D, 1), 1), minTopicAttempts: MIN_TOPIC_ATTEMPTS });
    expect(nightly.date).toBe(D);
    expect(dailyMetricsDedupeKey(D)).toBe(`metrics:${D}`);
    const result = await backfill(addDays(D, -1), D, { now: NOW, minTopicAttempts: MIN_TOPIC_ATTEMPTS });
    expect(result.days.map((day) => day.date)).toEqual([addDays(D, -1), D]);
    const final = await snapshot(D);
    expect(value(final, METRIC.SUBJECT_ATTEMPTS, dimension("subject", curriculum.subjectId))).toBe(9);
  });
});
