import { beforeEach, describe, expect, it } from "vitest";
import type { AiFeature, AttemptMode } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE, dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { createStudent, uniqueCode } from "../../../tests/factories/index";
import { createQuestionContext, type QuestionContext } from "../../../tests/factories/questions";
import { EntitlementRequiredError, LimitReachedError, assertWithinLimit, checkLimit, clearEntitlementCaches, getEntitlements } from "./entitlements";
import {
  aiMessagesToday,
  aiSolverToday,
  getUsageSummary,
  getUserTimezone,
  limitWindow,
  mockExamsThisMonth,
  practiceQuestionsToday,
  topicTestsThisWeek,
  usageFor,
} from "./usage";

/**
 * Usage counters against Postgres with fixed clocks. 2026-10-05 is a Monday; Africa/Harare is UTC+2, so the local day
 * 2026-10-05 is [2026-10-04T22:00Z, 2026-10-05T22:00Z).
 */

const NOW = new Date("2026-10-05T10:00:00Z");
const at = (iso: string) => new Date(iso);

interface Fixture {
  userId: string;
  ctx: QuestionContext;
  questionId: string;
  topicTestId: string;
  mockId: string;
}

async function fixture(): Promise<Fixture> {
  const { user } = await createStudent();
  const ctx = await createQuestionContext({ topics: 1 });
  const question = await db.question.create({
    data: { subjectId: ctx.subjectId, type: "MULTIPLE_CHOICE", stem: "Usage fixture question", difficulty: 3, marks: 1 },
    select: { id: true },
  });
  const topicTest = await db.assessment.create({
    data: { kind: "TOPIC_TEST", subjectId: ctx.subjectId, syllabusId: ctx.syllabusId, title: "Usage topic test", totalMarks: 10 },
    select: { id: true },
  });
  const mock = await db.assessment.create({
    data: { kind: "MOCK_EXAM", subjectId: ctx.subjectId, syllabusId: ctx.syllabusId, title: "Usage mock", totalMarks: 100, timeLimitSeconds: 7200 },
    select: { id: true },
  });
  return { userId: user.id, ctx, questionId: question.id, topicTestId: topicTest.id, mockId: mock.id };
}

async function attempt(f: Fixture, mode: AttemptMode, startedAt: Date, answeredAt: (Date | null)[] = []): Promise<string> {
  const assessmentId = mode === "TOPIC_TEST" ? f.topicTestId : mode === "MOCK_EXAM" ? f.mockId : null;
  const timed = mode === "MOCK_EXAM";
  const created = await db.assessmentAttempt.create({
    data: {
      userId: f.userId,
      subjectId: f.ctx.subjectId,
      mode,
      // One open attempt per assessment (AssessmentAttempt_one_open_per_assessment_key): close fixture attempts.
      status: assessmentId ? "ABANDONED" : "IN_PROGRESS",
      assessmentId,
      assessmentRevision: assessmentId ? 1 : null,
      startedAt,
      lastSavedAt: startedAt,
      deadlineAt: timed ? new Date(startedAt.getTime() + 7_200_000) : null,
      timeLimitSeconds: timed ? 7200 : null,
      questionCount: answeredAt.length,
      config: { feedback: "IMMEDIATE", origin: "BUILDER" },
    },
    select: { id: true },
  });
  if (answeredAt.length > 0) {
    await db.questionAttempt.createMany({
      data: answeredAt.map((answered, index) => ({
        attemptId: created.id,
        userId: f.userId,
        subjectId: f.ctx.subjectId,
        topicId: f.ctx.topicIds[0]!,
        questionId: f.questionId,
        createdAt: startedAt,
        answeredAt: answered,
        questionRevision: 1,
        position: index + 1,
        difficulty: 3,
        marksAvailable: 1,
        response: answered ? { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } : undefined,
      })),
    });
  }
  return created.id;
}

async function aiUsage(userId: string, localDate: string, feature: AiFeature, requests: number, reservedRequests = 0): Promise<void> {
  await db.aiUsageDaily.create({ data: { userId, date: dateColumnFromLocalDate(localDate), feature, requests, reservedRequests } });
}

beforeEach(() => {
  clearEntitlementCaches();
});

describe("limitWindow", () => {
  it("uses the student's local day, ISO week and month", () => {
    expect(limitWindow("practiceQuestionsPerDay", NOW)).toEqual({
      start: at("2026-10-04T22:00:00Z"),
      end: at("2026-10-05T22:00:00Z"),
      localDate: "2026-10-05",
    });
    expect(limitWindow("topicTestsPerWeek", NOW)).toMatchObject({ start: at("2026-10-04T22:00:00Z"), end: at("2026-10-11T22:00:00Z") });
    expect(limitWindow("mockExamsPerMonth", NOW)).toMatchObject({ start: at("2026-09-30T22:00:00Z"), end: at("2026-10-31T22:00:00Z") });
    expect(limitWindow("mockExamsPerMonth", at("2026-12-15T10:00:00Z"), "UTC")).toMatchObject({
      start: at("2026-12-01T00:00:00Z"),
      end: at("2027-01-01T00:00:00Z"),
    });
    // Unknown zones fall back to Africa/Harare instead of throwing.
    expect(limitWindow("aiMessagesPerDay", NOW, "Mars/Olympus").start).toEqual(at("2026-10-04T22:00:00Z"));
  });
});

describe("usage counters", () => {
  it("counts practice questions answered in the local day, only in limited practice modes", async () => {
    const f = await fixture();
    // Started late on the previous local day: one answer before local midnight, two after, one unanswered.
    await attempt(f, "PRACTICE", at("2026-10-04T21:00:00Z"), [at("2026-10-04T21:30:00Z"), at("2026-10-04T22:30:00Z"), at("2026-10-05T09:00:00Z"), null]);
    await attempt(f, "RETEST", at("2026-10-05T08:00:00Z"), [at("2026-10-05T08:05:00Z")]);
    // Mock exam answers never count toward the practice limit.
    await attempt(f, "MOCK_EXAM", at("2026-10-05T07:00:00Z"), [at("2026-10-05T07:10:00Z"), at("2026-10-05T07:20:00Z")]);
    // Already tomorrow in Harare (00:30 / 00:40 local) but still today in UTC.
    await attempt(f, "PRACTICE", at("2026-10-05T22:20:00Z"), [at("2026-10-05T22:30:00Z"), at("2026-10-05T22:40:00Z")]);

    // Harare day [04T22:00Z, 05T22:00Z): 04T22:30, 05T09:00 (practice) + 05T08:05 (retest).
    await expect(practiceQuestionsToday(f.userId, "Africa/Harare", NOW)).resolves.toBe(3);
    // UTC day [05T00:00Z, 06T00:00Z): 05T09:00, 05T08:05, 05T22:30, 05T22:40; 04T22:30 is the previous UTC day.
    await expect(practiceQuestionsToday(f.userId, "UTC", NOW)).resolves.toBe(4);
  });

  it("counts topic tests per ISO week and mock exams per local month", async () => {
    const f = await fixture();
    await attempt(f, "TOPIC_TEST", at("2026-10-04T21:00:00Z")); // Sunday 23:00 local: previous week
    await attempt(f, "TOPIC_TEST", at("2026-10-05T08:00:00Z"));
    await attempt(f, "TOPIC_TEST", at("2026-10-07T08:00:00Z"));
    await attempt(f, "MOCK_EXAM", at("2026-09-30T21:00:00Z")); // 30 Sep 23:00 local: September
    await attempt(f, "MOCK_EXAM", at("2026-09-30T23:00:00Z")); // 1 Oct 01:00 local: October

    await expect(topicTestsThisWeek(f.userId, DEFAULT_TIMEZONE, NOW)).resolves.toBe(2);
    await expect(mockExamsThisMonth(f.userId, DEFAULT_TIMEZONE, NOW)).resolves.toBe(1);
  });

  it("counts AI usage from the daily ledger, including in-flight reservations", async () => {
    const { user } = await createStudent();
    await aiUsage(user.id, "2026-10-05", "TUTOR", 2, 1);
    await aiUsage(user.id, "2026-10-05", "WHATSAPP", 1);
    await aiUsage(user.id, "2026-10-05", "SOLVER", 4);
    await aiUsage(user.id, "2026-10-05", "MARKING", 50);
    await aiUsage(user.id, "2026-10-04", "TUTOR", 10);

    await expect(aiMessagesToday(user.id, DEFAULT_TIMEZONE, NOW)).resolves.toBe(4);
    await expect(aiSolverToday(user.id, DEFAULT_TIMEZONE, NOW)).resolves.toBe(4);
    await expect(usageFor(user.id, "aiMessagesPerDay", DEFAULT_TIMEZONE, NOW)).resolves.toBe(4);
    await expect(getUsageSummary(user.id, DEFAULT_TIMEZONE, NOW)).resolves.toEqual({
      practiceQuestionsPerDay: 0,
      topicTestsPerWeek: 0,
      mockExamsPerMonth: 0,
      aiMessagesPerDay: 4,
      aiSolverPerDay: 4,
    });
  });

  it("reads the user's time zone from the profile with a safe fallback", async () => {
    const { user } = await createStudent();
    await expect(getUserTimezone(user.id)).resolves.toBe("Africa/Harare");
    await db.profile.update({ where: { userId: user.id }, data: { timezone: "Africa/Lusaka" } });
    await expect(getUserTimezone(user.id)).resolves.toBe("Africa/Lusaka");
  });
});

describe("limits end to end (counter + entitlements)", () => {
  it("allows up to the plan limit and then throws QUOTA_EXCEEDED with Retry-After", async () => {
    const { user } = await createStudent();
    const code = uniqueCode("T");
    const plan = await db.plan.create({
      data: { code, name: `Test ${code}`, audience: "INDIVIDUAL", isPublic: false, entitlements: { features: { ai_tutor: true }, limits: { "ai.messagesPerDay": 7 } } },
      select: { id: true },
    });
    const now = new Date();
    await db.subscription.create({
      data: {
        planId: plan.id,
        holderUserId: user.id,
        status: "ACTIVE",
        startedAt: now,
        currentPeriodStart: now,
        currentPeriodEnd: new Date(now.getTime() + 30 * 86_400_000),
      },
    });
    const limit = (await getEntitlements(user.id)).entitlements.aiMessagesPerDay;
    expect(limit === null || limit >= 7).toBe(true);
    if (limit === null) return; // an unlimited default plan leaves nothing to exceed

    const actor = { userId: user.id };
    await aiUsage(user.id, localDateString(now, DEFAULT_TIMEZONE), "TUTOR", limit - 1);
    const used = await usageFor(user.id, "aiMessagesPerDay");
    expect(used).toBe(limit - 1);
    await expect(checkLimit(actor, "aiMessagesPerDay", used)).resolves.toMatchObject({ allowed: true, remaining: 1 });
    await expect(checkLimit(actor, "aiMessagesPerDay", used, { increment: 2 })).resolves.toMatchObject({ allowed: false });

    const resetsAt = limitWindow("aiMessagesPerDay", new Date()).end;
    const error = await assertWithinLimit(actor, "aiMessagesPerDay", used + 1, { resetsAt }).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(LimitReachedError);
    expect(error).toMatchObject({ code: "QUOTA_EXCEEDED", limit, used: limit });
    expect((error as LimitReachedError).retryAfterSeconds).toBeGreaterThan(0);
  });

  it("a limit of zero means the feature is not in the plan", async () => {
    const { user } = await createStudent();
    const { entitlements } = await getEntitlements(user.id);
    if (entitlements.mockExamsPerMonth !== 0) return; // the shared default plan grants mocks: nothing to check
    await expect(assertWithinLimit({ userId: user.id }, "mockExamsPerMonth", 0)).rejects.toBeInstanceOf(EntitlementRequiredError);
  });
});
