import { createHash, randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import type { z } from "zod";
import { POST as reviewBatch } from "@/app/api/v1/flashcards/reviews/route";
import { POST as endSession } from "@/app/api/v1/practice/sessions/[id]/end/route";
import { POST as revealHint } from "@/app/api/v1/practice/sessions/[id]/hints/route";
import { GET as getSession } from "@/app/api/v1/practice/sessions/[id]/route";
import { POST as answerPractice } from "@/app/api/v1/practice/sessions/[id]/answers/route";
import { POST as selfAssess } from "@/app/api/v1/practice/sessions/[id]/self-assessment/route";
import { POST as startPractice } from "@/app/api/v1/practice/sessions/route";
import { GET as getProgress } from "@/app/api/v1/progress/route";
import { GET as getStudyPlanToday } from "@/app/api/v1/study-plan/today/route";
import { startAttempt } from "@/server/attempts";
import { aiMarkingConfigured } from "@/server/attempts/self-assess";
import { createSession } from "@/server/auth/sessions";
import { randomIp, testMeta } from "@/server/auth/testing";
import { db } from "@/server/db";
import { getEnv } from "@/server/lib/env";
import { createPlan } from "@/server/studyplan/service";
import {
  correctResponse,
  createAssessment,
  createEnrollment,
  createLearner,
  createLearningSetup,
  learnerActor,
  type LearningSetup,
} from "../../../tests/factories/index";
import {
  attemptResultSchema,
  flashcardSyncResultSchema,
  practiceSessionSchema,
  practiceStartedSchema,
  presentedFeedbackSchema,
  presentedHintSchema,
  progressOverviewSchema,
  studyPlanTodaySchema,
} from "./schemas";

/**
 * The REST v1 endpoints over the remaining student services, end to end against the test database as a mobile client
 * uses them: practice hints, self-assessment and ending early; the batch flashcard sync; today's study plan; the
 * progress overview. Responses are parsed with the documented schemas (the OpenAPI document's source).
 */

const ORIGIN = new URL(getEnv().APP_URL).origin;
type Handler = (request: Request, context?: { params?: Promise<Record<string, string>> }) => Promise<Response>;

function call(handler: Handler, path: string, options: { token: string; body?: unknown; params?: Record<string, string>; method?: string }): Promise<Response> {
  const hasBody = options.body !== undefined;
  return handler(
    new Request(`${ORIGIN}/api/v1${path}`, {
      method: options.method ?? (hasBody ? "POST" : "GET"),
      headers: {
        "x-forwarded-for": randomIp(),
        authorization: `Bearer ${options.token}`,
        ...(hasBody ? { "content-type": "application/json" } : {}),
      },
      ...(hasBody ? { body: JSON.stringify(options.body) } : {}),
    }),
    { params: Promise.resolve(options.params ?? {}) },
  );
}

async function ok<S extends z.ZodType>(response: Response, schema: S, status = 200): Promise<z.output<S>> {
  const body = (await response.json()) as { data?: unknown };
  if (response.status !== status) throw new Error(`expected ${status}, got ${response.status}: ${JSON.stringify(body)}`);
  return schema.parse(body.data);
}

async function errorOf(response: Response): Promise<{ status: number; code: string }> {
  const body = (await response.json()) as { error?: { code: string } };
  return { status: response.status, code: body.error?.code ?? "" };
}

async function tokenFor(userId: string): Promise<string> {
  return (await createSession(userId, "API", testMeta(), { authMethod: "PASSWORD" })).token;
}

let setup: LearningSetup;

beforeAll(async () => {
  setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 2, gradeScheme: false });
});

async function enrolledLearner(learningSetup: LearningSetup = setup): Promise<{ userId: string; token: string }> {
  const learner = await createLearner();
  await createEnrollment(learner.userId, learningSetup);
  return { userId: learner.userId, token: await tokenFor(learner.userId) };
}

async function startSession(token: string, subjectId: string, count: number) {
  return ok(await call(startPractice, "/practice/sessions", { token, body: { subjectId, count } }), practiceStartedSchema, 201);
}

describe("POST /practice/sessions/{id}/hints", () => {
  it("reveals the next hint of an unanswered question once, lists it on the session, then refuses (409)", async () => {
    const { token } = await enrolledLearner();
    const { session } = await startSession(token, setup.subjectId, 2);
    const params = { id: session.id };
    expect(session.slots[0]?.question?.hintCount).toBe(1);

    const hint = await ok(await call(revealHint, `/practice/sessions/${session.id}/hints`, { token, params, body: { position: 1 } }), presentedHintSchema);
    expect(hint).toMatchObject({ hintNumber: 1, totalHints: 1 });
    expect(hint.html).toContain("hint");
    const fetched = await ok(await call(getSession, `/practice/sessions/${session.id}`, { token, params }), practiceSessionSchema);
    expect(fetched.slots[0]?.hints).toEqual([hint]);
    expect(fetched.slots[1]?.hints).toEqual([]);

    expect(await errorOf(await call(revealHint, `/practice/sessions/${session.id}/hints`, { token, params, body: { position: 1 } }))).toEqual({ status: 409, code: "CONFLICT" });
    expect((await call(revealHint, `/practice/sessions/${session.id}/hints`, { token, params, body: { position: 0 } })).status).toBe(422);
    expect((await call(revealHint, `/practice/sessions/${session.id}/hints`, { token, params, body: { position: 1, extra: true } })).status).toBe(422);
    expect((await call(revealHint, `/practice/sessions/${session.id}/hints`, { token, params, body: { position: 9 } })).status).toBe(404);
  });
});

describe("POST /practice/sessions/{id}/end", () => {
  it("ends early: answered questions scored, the rest left out; idempotent; later answers change nothing", async () => {
    const { token } = await enrolledLearner();
    const { session } = await startSession(token, setup.subjectId, 3);
    const params = { id: session.id };
    const first = setup.questions.find((q) => q.id === session.slots[0]?.question?.id);
    if (!first) throw new Error("unknown question");
    await ok(await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position: 1, response: correctResponse(first.definition) } }), presentedFeedbackSchema);

    const result = await ok(await call(endSession, `/practice/sessions/${session.id}/end`, { token, params, method: "POST" }), attemptResultSchema);
    expect(result).toMatchObject({ attemptId: session.id, mode: "PRACTICE", submitReason: "STUDENT", grade: null });
    expect(result.score).toMatchObject({ answeredCount: 1, correctCount: 1, isProvisional: false });
    expect(result.submittedAt).not.toBeNull();

    const again = await ok(await call(endSession, `/practice/sessions/${session.id}/end`, { token, params, method: "POST" }), attemptResultSchema);
    expect(again).toEqual(result);
    const closed = await ok(await call(getSession, `/practice/sessions/${session.id}`, { token, params }), practiceSessionSchema);
    expect(closed).toMatchObject({ isOpen: false, nextPosition: null });
    const late = await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position: 2, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } } });
    // Answering after the end changes nothing: the closed session reports the slot as unanswered (with its reveal).
    expect((await ok(late, presentedFeedbackSchema)).outcome).toBe("unanswered");
    expect(await db.questionAttempt.count({ where: { attemptId: session.id, markedAt: { not: null }, answeredAt: { not: null } } })).toBe(1);
  });

  it("never touches attempts that are not the caller's practice sessions: exams and other students' sessions are 404", async () => {
    const owner = await enrolledLearner();
    const other = await enrolledLearner();
    const { session } = await startSession(owner.token, setup.subjectId, 2);
    const params = { id: session.id };
    for (const [handler, path, body] of [
      [endSession, "end", undefined],
      [revealHint, "hints", { position: 1 }],
      [selfAssess, "self-assessment", { position: 1, pointIds: ["P1"] }],
    ] as const) {
      const response = await call(handler, `/practice/sessions/${session.id}/${path}`, { token: other.token, params, ...(body ? { body } : { method: "POST" }) });
      expect(await errorOf(response), path).toEqual({ status: 404, code: "NOT_FOUND" });
    }
    expect((await db.assessmentAttempt.findUniqueOrThrow({ where: { id: session.id } })).status).toBe("IN_PROGRESS");

    // A mock exam of the same student is not a practice session: it is not ended (submitted) through this endpoint.
    const question = setup.questions[0];
    if (!question) throw new Error("no question");
    const mock = await createAssessment({ subjectId: setup.subjectId, syllabusId: setup.syllabusId, kind: "MOCK_EXAM", timeLimitSeconds: 3600, sections: [{ questionIds: [question.id] }] });
    const { attempt } = await startAttempt(learnerActor(owner.userId), { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
    const exam = { id: attempt.id };
    expect(await errorOf(await call(endSession, `/practice/sessions/${attempt.id}/end`, { token: owner.token, params: exam, method: "POST" }))).toEqual({ status: 404, code: "NOT_FOUND" });
    expect(await errorOf(await call(revealHint, `/practice/sessions/${attempt.id}/hints`, { token: owner.token, params: exam, body: { position: 1 } }))).toEqual({ status: 404, code: "NOT_FOUND" });
    expect((await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attempt.id } })).status).toBe("IN_PROGRESS");
  });
});

describe("POST /practice/sessions/{id}/self-assessment", () => {
  it("lets the student mark a pending open answer against the mark scheme when AI marking is not available", async () => {
    const essays = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, type: "ESSAY", gradeScheme: false });
    const { token } = await enrolledLearner(essays);
    const { session } = await startSession(token, essays.subjectId, 1);
    const params = { id: session.id };
    const pending = await ok(
      await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position: 1, response: { type: "ESSAY", text: "Solar power is clean but batteries are costly." } } }),
      presentedFeedbackSchema,
    );
    const path = `/practice/sessions/${session.id}/self-assessment`;
    if (aiMarkingConfigured()) {
      expect(pending.selfAssessment).toBeNull();
      expect((await errorOf(await call(selfAssess, path, { token, params, body: { position: 1, pointIds: ["P1"] } }))).status).toBe(400);
      return;
    }
    expect(pending).toMatchObject({ outcome: "pending" });
    expect(pending.selfAssessment).not.toBeNull();

    expect((await call(selfAssess, path, { token, params, body: { position: 1, pointIds: "P1" } })).status).toBe(422);
    // The server totals the ticked points itself (unknown ids ignored; a claimed total is not trusted).
    const marked = await ok(await call(selfAssess, path, { token, params, body: { position: 1, pointIds: ["P1", "P2", "NOPE"], marks: 10 } }), presentedFeedbackSchema);
    expect(marked).toMatchObject({ status: "SELF_ASSESSED", marksAwarded: 6, marksAvailable: 10 });
    expect(await errorOf(await call(selfAssess, path, { token, params, body: { position: 1, pointIds: ["P3"] } }))).toEqual({ status: 409, code: "CONFLICT" });
  });
});

describe("POST /flashcards/reviews (offline batch sync)", () => {
  async function platformCard(topicId: string): Promise<string> {
    const front = `Batch term ${randomUUID().slice(0, 8)}`;
    const back = "Batch definition";
    const now = new Date();
    return db.$transaction(async (tx) => {
      const card = await tx.flashcard.create({
        data: {
          subjectId: setup.subjectId,
          cardType: "DEFINITION",
          front,
          back,
          accessTier: "FREE",
          status: "PUBLISHED",
          revision: 1,
          approvedAt: now,
          publishedAt: now,
          copyrightStatus: "OWNED",
          author: "Test author",
          topics: { create: { topicId, isPrimary: true, sortOrder: 0 } },
        },
        select: { id: true },
      });
      const snapshot = { flashcard: { id: card.id, front, back, cardType: "DEFINITION", revision: 1 }, topics: [{ topicId, isPrimary: true }] };
      await tx.contentRevision.create({
        data: { entityType: "FLASHCARD", entityId: card.id, revision: 1, snapshot, contentHash: createHash("sha256").update(JSON.stringify(snapshot)).digest("hex"), changeNote: "Test fixture" },
      });
      return card.id;
    });
  }

  it("applies queued reviews in press order, reports bad items in their own slot, and replays idempotently", async () => {
    const { userId, token } = await enrolledLearner();
    const leaf = setup.leafTopicIds[0];
    if (!leaf) throw new Error("no leaf");
    const [cardA, cardB] = [await platformCard(leaf), await platformCard(leaf)];
    const suffix = randomUUID().slice(0, 8);
    const now = Date.now();
    const reviews = [
      { flashcardId: cardB, rating: "EASY", clientReviewId: `b-${suffix}`, reviewedAt: new Date(now - 60_000).toISOString() },
      { flashcardId: cardA, rating: "GOOD", clientReviewId: `a-${suffix}`, reviewedAt: new Date(now - 120_000).toISOString(), durationMs: 3000 },
      { flashcardId: "not-a-card", rating: "GOOD", clientReviewId: `x-${suffix}` },
      { flashcardId: randomUUID(), rating: "GOOD", clientReviewId: `y-${suffix}`, reviewedAt: new Date(now - 30_000).toISOString() },
    ];
    const results = (await ok(await call(reviewBatch, "/flashcards/reviews", { token, body: { reviews } }), flashcardSyncResultSchema.array())).map((r) => r);
    // Press order: a (-120 s), b (-60 s), y (-30 s), then x (no press time).
    expect(results.map((r) => r.clientReviewId)).toEqual([`a-${suffix}`, `b-${suffix}`, `y-${suffix}`, `x-${suffix}`]);
    expect(results.map((r) => r.ok)).toEqual([true, true, false, false]);
    expect(results[2]).toMatchObject({ ok: false, code: "NOT_FOUND" });
    expect(results[3]).toMatchObject({ ok: false, code: "VALIDATION" });
    expect(results[0]).toMatchObject({ ok: true, outcome: { flashcardId: cardA, replayed: false } });
    expect(await db.flashcardReview.count({ where: { userId } })).toBe(2);

    // The same outbox delivered again (e.g. the first response was lost): nothing is applied twice.
    const replay = await ok(await call(reviewBatch, "/flashcards/reviews", { token, body: { reviews } }), flashcardSyncResultSchema.array());
    expect(replay.filter((r) => r.ok).map((r) => (r.ok ? r.outcome.replayed : null))).toEqual([true, true]);
    expect(await db.flashcardReview.count({ where: { userId } })).toBe(2);
  });

  it("validates the batch shape (1-200 items, each with a card and a rating)", async () => {
    const { token } = await enrolledLearner();
    expect((await call(reviewBatch, "/flashcards/reviews", { token, body: { reviews: [] } })).status).toBe(422);
    expect((await call(reviewBatch, "/flashcards/reviews", { token, body: [{ flashcardId: randomUUID(), rating: "GOOD" }] })).status).toBe(422);
    expect((await call(reviewBatch, "/flashcards/reviews", { token, body: { reviews: [{ flashcardId: randomUUID() }] } })).status).toBe(422);
    const tooMany = Array.from({ length: 201 }, () => ({ flashcardId: randomUUID(), rating: "GOOD" }));
    expect((await call(reviewBatch, "/flashcards/reviews", { token, body: { reviews: tooMany } })).status).toBe(422);
  });
});

describe("GET /study-plan/today", () => {
  it("answers 200 with null plan before one exists, then today's items once the student has a plan", async () => {
    const { userId, token } = await enrolledLearner();
    const empty = await ok(await call(getStudyPlanToday, "/study-plan/today", { token }), studyPlanTodaySchema);
    expect(empty).toMatchObject({ entitled: true, plan: null, todayPlan: null });
    expect(empty.today).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const everyDay = { mon: 60, tue: 60, wed: 60, thu: 60, fri: 60, sat: 60, sun: 60 };
    await createPlan(learnerActor(userId), { availability: everyDay });
    const today = await ok(await call(getStudyPlanToday, "/study-plan/today", { token }), studyPlanTodaySchema);
    expect(today.plan?.subjects.map((s) => s.subjectId)).toEqual([setup.subjectId]);
    expect(today.todayPlan?.date).toBe(today.today);
    expect(today.todayPlan?.availableMinutes).toBe(60);
    expect(today.todayPlan?.items.length).toBeGreaterThan(0);
    for (const item of today.todayPlan?.items ?? []) expect(item).toMatchObject({ date: today.today, subjectId: setup.subjectId });
  });
});

describe("GET /progress", () => {
  it("returns the progress overview of the student's own rollups", async () => {
    const { token } = await enrolledLearner();
    const overview = await ok(await call(getProgress, "/progress", { token }), progressOverviewSchema);
    expect(overview.activity.days).toHaveLength(30);
    expect(overview.activity.days.at(-1)?.date).toBe(overview.today);
    const subject = overview.subjects.find((s) => s.subjectId === setup.subjectId);
    expect(subject).toMatchObject({ assessed: 0 });
    expect(subject?.counts.NOT_STARTED).toBe(subject?.topicsTotal);
    expect(overview.xp.level.level).toBeGreaterThanOrEqual(1);
  });
});
