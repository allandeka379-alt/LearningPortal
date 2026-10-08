import { createHash, randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import type { z } from "zod";
import { GET as listBoards } from "@/app/api/v1/catalogue/boards/route";
import { GET as listQualifications } from "@/app/api/v1/catalogue/qualifications/route";
import { GET as listSubjects } from "@/app/api/v1/catalogue/subjects/route";
import { POST as answerDaily } from "@/app/api/v1/daily-question/answer/route";
import { GET as getDaily } from "@/app/api/v1/daily-question/route";
import { POST as startDaily } from "@/app/api/v1/daily-question/start/route";
import { GET as getDashboard } from "@/app/api/v1/dashboard/route";
import { GET as listEnrollments, POST as enrol } from "@/app/api/v1/enrollments/route";
import { POST as reviewFlashcard } from "@/app/api/v1/flashcards/[id]/review/route";
import { GET as dueFlashcards } from "@/app/api/v1/flashcards/due/route";
import { GET as getLesson } from "@/app/api/v1/lessons/[id]/route";
import { POST as markRead } from "@/app/api/v1/notifications/read/route";
import { GET as listNotifications } from "@/app/api/v1/notifications/route";
import { POST as answerPractice } from "@/app/api/v1/practice/sessions/[id]/answers/route";
import { GET as getSession } from "@/app/api/v1/practice/sessions/[id]/route";
import { GET as getSummary } from "@/app/api/v1/practice/sessions/[id]/summary/route";
import { POST as startPractice } from "@/app/api/v1/practice/sessions/route";
import { GET as listTopics } from "@/app/api/v1/subjects/[id]/topics/route";
import { dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { createSession } from "@/server/auth/sessions";
import { randomIp, testMeta } from "@/server/auth/testing";
import { db } from "@/server/db";
import { getEnv } from "@/server/lib/env";
import { createNotification } from "@/server/notifications";
import { correctResponse, createLearner, createLearningSetup, uniqueCode, uniqueSlug, wrongResponse, type LearningSetup } from "../../../tests/factories/index";
import {
  boardSchema,
  dailyAnswerResultSchema,
  dailyCurrentSchema,
  dailyOverviewSchema,
  dashboardSchema,
  enrollmentSchema,
  flashcardQueueMetaSchema,
  flashcardReviewOutcomeSchema,
  flashcardSchema,
  lessonSchema,
  notificationSchema,
  notificationsReadResultSchema,
  practiceSessionSchema,
  practiceStartedSchema,
  practiceSummarySchema,
  presentedFeedbackSchema,
  qualificationSchema,
  subjectSchema,
  topicNodeSchema,
} from "./schemas";

/**
 * The learning endpoints of the REST API end to end against the test database, as a mobile client uses them. Every
 * response is parsed with the documented response schema (the OpenAPI document's source), and practice / daily
 * responses are checked for answer keys before marking.
 */

const ORIGIN = new URL(getEnv().APP_URL).origin;
type Handler = (request: Request, context?: { params?: Promise<Record<string, string>> }) => Promise<Response>;

/** Keys that only ever appear AFTER marking (reveals) or never (authoring data). */
const ANSWER_KEYS = ["isCorrect", "answerSpec", "correctAnswer", "explanation", "workedSolution", "rationale", "markScheme", "modelAnswer", "conceptHtml", "accepted"];

function call(handler: Handler, path: string, options: { token: string; body?: unknown; params?: Record<string, string>; headers?: Record<string, string> }): Promise<Response> {
  return handler(
    new Request(`${ORIGIN}/api/v1${path}`, {
      method: options.body !== undefined ? "POST" : "GET",
      headers: {
        "x-forwarded-for": randomIp(),
        authorization: `Bearer ${options.token}`,
        ...(options.body !== undefined ? { "content-type": "application/json" } : {}),
        ...options.headers,
      },
      ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
    }),
    { params: Promise.resolve(options.params ?? {}) },
  );
}

async function ok<S extends z.ZodType>(response: Response, schema: S, status = 200): Promise<z.output<S>> {
  const body = (await response.json()) as { data?: unknown; error?: unknown };
  if (response.status !== status) throw new Error(`expected ${status}, got ${response.status}: ${JSON.stringify(body)}`);
  return schema.parse(body.data);
}

async function page<S extends z.ZodType>(response: Response, schema: S): Promise<{ data: z.output<S>[]; nextCursor: string | null; raw: Record<string, unknown> }> {
  const raw = (await response.json()) as { data: unknown[]; nextCursor: string | null };
  if (response.status !== 200) throw new Error(`expected 200, got ${response.status}: ${JSON.stringify(raw)}`);
  expect(Object.keys(raw)).toEqual(expect.arrayContaining(["data", "nextCursor"]));
  return { data: raw.data.map((item) => schema.parse(item)), nextCursor: raw.nextCursor, raw };
}

/** Walks every page of a list endpoint. */
async function walk<S extends z.ZodType>(handler: Handler, path: string, token: string, schema: S, limit: number, maxPages = 50): Promise<z.output<S>[]> {
  const items: z.output<S>[] = [];
  let cursor: string | null = null;
  for (let i = 0; i < maxPages; i += 1) {
    const separator = path.includes("?") ? "&" : "?";
    const result: { data: z.output<S>[]; nextCursor: string | null } = await page(
      await call(handler, `${path}${separator}limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`, { token }),
      schema,
    );
    items.push(...result.data);
    cursor = result.nextCursor;
    if (cursor === null) return items;
  }
  throw new Error("pagination did not terminate");
}

function answerKeysIn(value: unknown): string[] {
  const text = JSON.stringify(value);
  return ANSWER_KEYS.filter((key) => text.includes(`"${key}"`));
}

let setup: LearningSetup;
let userId: string;
let token: string;

beforeAll(async () => {
  setup = await createLearningSetup({ topics: 3, subtopicsPerTopic: 1, questionsPerLeaf: 2, gradeScheme: false });
  const learner = await createLearner();
  userId = learner.userId;
  token = (await createSession(userId, "API", testMeta(), { authMethod: "PASSWORD" })).token;
  const enrolled = await ok(await call(enrol, "/enrollments", { token, body: { subjectIds: [setup.subjectId] } }), enrollmentSchema.array(), 201);
  expect(enrolled).toHaveLength(1);
});

describe("catalogue", () => {
  it("pages qualifications and subjects stably: every item once, in the same order as one big page", async () => {
    const { chain } = setup;
    for (let i = 0; i < 2; i += 1) {
      await db.qualification.create({
        data: { examBoardId: chain.examBoard.id, levelId: chain.level.id, slug: uniqueSlug("qualification"), code: uniqueCode("Q"), name: `Extra ${i}`, shortName: `X${i}`, catalogueStatus: "AVAILABLE", sortOrder: i + 1 },
      });
      await db.subject.create({
        data: { qualificationId: chain.qualification.id, categoryId: chain.category.id, slug: uniqueSlug("subject"), name: `Extra subject ${i}`, officialCode: uniqueCode("S").slice(0, 16), catalogueStatus: i === 0 ? "COMING_SOON" : "AVAILABLE", sourceId: chain.source.id, sortOrder: i + 1 },
      });
    }
    const quals = await walk(listQualifications, `/catalogue/qualifications?boardId=${chain.examBoard.id}`, token, qualificationSchema, 1);
    const qualsAtOnce = (await page(await call(listQualifications, `/catalogue/qualifications?boardId=${chain.examBoard.id}&limit=100`, { token }), qualificationSchema)).data;
    expect(quals).toHaveLength(3);
    expect(new Set(quals.map((q) => q.id)).size).toBe(3);
    expect(quals.map((q) => q.id)).toEqual(qualsAtOnce.map((q) => q.id));
    expect(quals[0]).toMatchObject({ id: chain.qualification.id, board: { id: chain.examBoard.id }, level: { id: chain.level.id } });

    const subjects = await walk(listSubjects, `/catalogue/subjects?qualificationId=${chain.qualification.id}`, token, subjectSchema, 2);
    expect(subjects.map((s) => s.id)).toContain(setup.subjectId);
    expect(new Set(subjects.map((s) => s.id)).size).toBe(3);
    expect(subjects.find((s) => s.name === "Extra subject 0")?.isEnrollable).toBe(false);

    // The shared test country collects boards from every test run (never truncated): bound the walk by its size.
    const boardCount = await db.examBoardCountry.count({ where: { countryId: chain.country.id } });
    const boards = await walk(listBoards, `/catalogue/boards?countryId=${chain.country.id}`, token, boardSchema, 100, Math.ceil(boardCount / 100) + 2);
    expect(boards.map((b) => b.id)).toContain(chain.examBoard.id);
    expect(new Set(boards.map((b) => b.id)).size).toBe(boards.length);
  });

  it("is client-cacheable and validates its query", async () => {
    const response = await call(listQualifications, `/catalogue/qualifications?boardId=${setup.chain.examBoard.id}`, { token });
    expect(response.headers.get("cache-control")).toBe("private, max-age=300");
    expect((await call(listSubjects, "/catalogue/subjects", { token })).status).toBe(422);
    expect((await call(listSubjects, `/catalogue/subjects?qualificationId=${setup.qualificationId}&limit=0`, { token })).status).toBe(422);
    expect((await call(listSubjects, `/catalogue/subjects?qualificationId=${setup.qualificationId}&cursor=bad*cursor`, { token })).status).toBe(422);
  });
});

describe("enrolments, dashboard, topics and lessons", () => {
  it("lists enrolments with the pinned syllabus version; enrolling again is idempotent", async () => {
    const list = await page(await call(listEnrollments, "/enrollments", { token }), enrollmentSchema);
    expect(list.data).toHaveLength(1);
    expect(list.data[0]).toMatchObject({ status: "ACTIVE", subject: { id: setup.subjectId }, syllabus: { id: setup.syllabusId } });
    const again = await ok(await call(enrol, "/enrollments", { token, body: { subjectIds: [setup.subjectId] } }), enrollmentSchema.array(), 201);
    expect(again[0]?.id).toBe(list.data[0]?.id);
    const bad = await call(enrol, "/enrollments", { token, body: { subjectIds: [randomUUID()] } });
    expect(bad.status).toBe(422);
  });

  it("returns the dashboard as JSON matching the documented schema", async () => {
    const dashboard = await ok(await call(getDashboard, "/dashboard", { token }), dashboardSchema);
    expect(dashboard.subjects.map((s) => s.subjectId)).toContain(setup.subjectId);
    expect(dashboard.today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("pages the pinned topic tree by top-level topic, with mastery on every node", async () => {
    const first = await page(await call(listTopics, `/subjects/${setup.subjectId}/topics?limit=2`, { token, params: { id: setup.subjectId } }), topicNodeSchema);
    expect(first.data.map((t) => t.topicId)).toEqual(setup.topicIds.slice(0, 2));
    expect(first.nextCursor).not.toBeNull();
    const second = await page(
      await call(listTopics, `/subjects/${setup.subjectId}/topics?limit=2&cursor=${first.nextCursor}`, { token, params: { id: setup.subjectId } }),
      topicNodeSchema,
    );
    expect(second.data.map((t) => t.topicId)).toEqual(setup.topicIds.slice(2));
    expect(second.nextCursor).toBeNull();
    expect(first.data[0]?.children).toHaveLength(1);
    expect(first.data[0]).toMatchObject({ band: null, score: null, questionsAttempted: 0 });
  });

  it("returns a lesson rendered server-side plus plain text", async () => {
    const lesson = setup.chain.lessons[0];
    if (!lesson) throw new Error("no lesson");
    const view = await ok(await call(getLesson, `/lessons/${lesson.id}`, { token, params: { id: lesson.id } }), lessonSchema);
    expect(view).toMatchObject({ id: lesson.id, locked: false, subject: { id: setup.subjectId } });
    expect(view.content?.html.length).toBeGreaterThan(0);
    expect(view.content?.plainText.length).toBeGreaterThan(0);
    expect(view.content?.plainText).not.toContain("<");
    expect((await call(getLesson, `/lessons/${randomUUID()}`, { token, params: { id: randomUUID() } })).status).toBe(404);
  });
});

describe("practice sessions", () => {
  it("never sends answer keys before marking; marks immediately; resumes by idempotency key; summarises", async () => {
    const key = `api-${randomUUID().slice(0, 12)}`;
    const started = await ok(
      await call(startPractice, "/practice/sessions", { token, body: { subjectId: setup.subjectId, count: 3 }, headers: { "idempotency-key": key } }),
      practiceStartedSchema,
      201,
    );
    const session = started.session;
    expect(session).toMatchObject({ mode: "PRACTICE", status: "IN_PROGRESS", isOpen: true, immediateFeedback: true, markedCount: 0, nextPosition: 1 });
    expect(session.slots).toHaveLength(3);
    for (const slot of session.slots) {
      expect(slot.question?.stemHtml.length).toBeGreaterThan(0);
      expect(slot.feedback).toBeNull();
      expect(slot.question?.interaction.type).toBe("MULTIPLE_CHOICE");
    }
    expect(answerKeysIn(session)).toEqual([]);

    // Same key again: the same session, 200.
    const resumed = await call(startPractice, "/practice/sessions", { token, body: { subjectId: setup.subjectId, count: 3, idempotencyKey: key } });
    expect(resumed.status).toBe(200);
    expect((await ok(resumed, practiceStartedSchema)).session.id).toBe(session.id);

    const params = { id: session.id };
    const fetched = await ok(await call(getSession, `/practice/sessions/${session.id}`, { token, params }), practiceSessionSchema);
    expect(answerKeysIn(fetched)).toEqual([]);

    // Answer slot 1 correctly: the reveal arrives now, for that slot only.
    const definitionFor = (questionId: string | undefined) => {
      const question = setup.questions.find((q) => q.id === questionId);
      if (!question) throw new Error("unknown question in session");
      return question.definition;
    };
    const firstQuestion = fetched.slots[0]?.question?.id;
    const feedback = await ok(
      await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position: 1, response: correctResponse(definitionFor(firstQuestion)), timeSpentSeconds: 12 } }),
      presentedFeedbackSchema,
    );
    expect(feedback).toMatchObject({ position: 1, outcome: "correct", status: "AUTO_MARKED", attemptCompleted: false, nextPosition: 2 });
    expect(feedback.reveal).not.toBeNull();

    const afterOne = await ok(await call(getSession, `/practice/sessions/${session.id}`, { token, params }), practiceSessionSchema);
    expect(afterOne).toMatchObject({ markedCount: 1, nextPosition: 2 });
    expect(afterOne.slots[0]?.feedback?.outcome).toBe("correct");
    expect(answerKeysIn(afterOne.slots.slice(1))).toEqual([]);

    // Replaying the same answer changes nothing.
    const replay = await ok(
      await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position: 1, response: wrongResponse(definitionFor(firstQuestion)) } }),
      presentedFeedbackSchema,
    );
    expect(replay.outcome).toBe("correct");

    // Malformed answers are refused before marking.
    const malformed = await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position: 2, response: { type: "MULTIPLE_CHOICE" } } });
    expect(malformed.status).toBe(422);

    for (const position of [2, 3]) {
      const questionId = afterOne.slots[position - 1]?.question?.id;
      await ok(
        await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position, response: wrongResponse(definitionFor(questionId)) } }),
        presentedFeedbackSchema,
      );
    }
    const closed = await ok(await call(getSession, `/practice/sessions/${session.id}`, { token, params }), practiceSessionSchema);
    expect(closed).toMatchObject({ isOpen: false, nextPosition: null, markedCount: 3 });
    expect(closed.submittedAt).not.toBeNull();

    const summary = await ok(await call(getSummary, `/practice/sessions/${session.id}/summary`, { token, params }), practiceSummarySchema);
    expect(summary.result?.score).toMatchObject({ answeredCount: 3, correctCount: 1 });
    expect(summary.review).toHaveLength(3);

    const late = await call(answerPractice, `/practice/sessions/${session.id}/answers`, { token, params, body: { position: 9, response: { type: "TRUE_FALSE", value: true } } });
    expect(late.status).toBe(404);
  });

  it("refuses a practice session in a subject the student does not take", async () => {
    const response = await call(startPractice, "/practice/sessions", { token, body: { subjectId: randomUUID() } });
    expect(response.status).toBe(422);
    const conflicting = await call(startPractice, "/practice/sessions", {
      token,
      body: { subjectId: setup.subjectId, idempotencyKey: "body-key-1234" },
      headers: { "idempotency-key": "header-key-1234" },
    });
    expect(conflicting.status).toBe(422);
  });
});

describe("daily question", () => {
  it("shows, opens (idempotently) and answers today's question; GET never opens it", async () => {
    const question = setup.questions[0];
    if (!question) throw new Error("no question");
    await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(localDateString(new Date(), "Africa/Harare")), qualificationId: setup.qualificationId, subjectId: setup.subjectId, questionId: question.id, isAutoSelected: false },
    });

    const before = await ok(await call(getDaily, "/daily-question", { token }), dailyOverviewSchema);
    const item = before.items.find((i) => i.subject.id === setup.subjectId);
    expect(item).toMatchObject({ entitled: true, attempt: null });
    expect(item?.dailyQuestionId).toBeTruthy();
    expect(before.current).toBeNull();
    expect(await db.assessmentAttempt.count({ where: { userId, mode: "DAILY_QUESTION" } })).toBe(0);

    const opened = await ok(await call(startDaily, "/daily-question/start", { token, body: { subjectId: setup.subjectId } }), dailyCurrentSchema, 201);
    expect(opened.slot?.question?.id).toBe(question.id);
    expect(answerKeysIn(opened)).toEqual([]);
    const again = await ok(await call(startDaily, "/daily-question/start", { token, body: { subjectId: setup.subjectId } }), dailyCurrentSchema, 200);
    expect(again.attemptId).toBe(opened.attemptId);

    const shown = await ok(await call(getDaily, `/daily-question?subjectId=${setup.subjectId}`, { token }), dailyOverviewSchema);
    expect(shown.current).toMatchObject({ subjectId: setup.subjectId, attemptId: opened.attemptId, status: "IN_PROGRESS" });
    expect(answerKeysIn(shown)).toEqual([]);

    const answered = await ok(
      await call(answerDaily, "/daily-question/answer", { token, body: { subjectId: setup.subjectId, response: correctResponse(question.definition) } }),
      dailyAnswerResultSchema,
    );
    expect(answered).toMatchObject({ attemptId: opened.attemptId, feedback: { outcome: "correct", attemptCompleted: true } });
    const replay = await ok(
      await call(answerDaily, "/daily-question/answer", { token, body: { subjectId: setup.subjectId, response: wrongResponse(question.definition) } }),
      dailyAnswerResultSchema,
    );
    expect(replay.feedback.outcome).toBe("correct");
    expect(await db.assessmentAttempt.count({ where: { userId, mode: "DAILY_QUESTION" } })).toBe(1);

    const notEnrolled = await call(startDaily, "/daily-question/start", { token, body: { subjectId: randomUUID() } });
    expect(notEnrolled.status).toBe(422);
  });
});

describe("flashcards", () => {
  async function platformCard(topicId: string): Promise<string> {
    const front = `API term ${randomUUID().slice(0, 8)} with $x^2$`;
    const back = "API definition";
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

  it("serves the due queue with meta and applies a review once per client id", async () => {
    const leaf = setup.leafTopicIds[0];
    if (!leaf) throw new Error("no leaf");
    const cardId = await platformCard(leaf);
    const response = await call(dueFlashcards, `/flashcards/due?subjectId=${setup.subjectId}`, { token });
    expect(response.status).toBe(200);
    const body = (await response.json()) as { data: unknown[]; nextCursor: null; meta: unknown };
    expect(body.nextCursor).toBeNull();
    const meta = flashcardQueueMetaSchema.parse(body.meta);
    expect(meta.entitled).toBe(true);
    const cards = body.data.map((card) => flashcardSchema.parse(card));
    const card = cards.find((c) => c.flashcardId === cardId);
    expect(card).toMatchObject({ isNew: true, phase: "NEW" });
    expect(card?.frontHtml).toContain("katex");

    const reviewKey = `rev-${randomUUID().slice(0, 12)}`;
    const params = { id: cardId };
    const first = await ok(await call(reviewFlashcard, `/flashcards/${cardId}/review`, { token, params, body: { rating: "GOOD", durationMs: 4000 }, headers: { "idempotency-key": reviewKey } }), flashcardReviewOutcomeSchema);
    expect(first).toMatchObject({ flashcardId: cardId, replayed: false });
    const second = await ok(await call(reviewFlashcard, `/flashcards/${cardId}/review`, { token, params, body: { rating: "AGAIN", clientReviewId: reviewKey } }), flashcardReviewOutcomeSchema);
    expect(second).toMatchObject({ replayed: true, dueAt: first.dueAt });
    expect(await db.flashcardReview.count({ where: { userId, flashcardId: cardId } })).toBe(1);

    expect((await call(reviewFlashcard, `/flashcards/${cardId}/review`, { token, params, body: { rating: "MAYBE" } })).status).toBe(422);
    const unknown = randomUUID();
    expect((await call(reviewFlashcard, `/flashcards/${unknown}/review`, { token, params: { id: unknown }, body: { rating: "GOOD" } })).status).toBe(404);
  });
});

describe("notifications", () => {
  it("pages the inbox newest first without duplicates, filters unread and marks read", async () => {
    const created: string[] = [];
    for (let i = 0; i < 5; i += 1) {
      created.push((await createNotification(userId, { type: "learning.api_test", title: `Note ${i}`, body: "Hello", data: { href: "/app" } })).id);
    }
    const seen = await walk(listNotifications, "/notifications", token, notificationSchema, 2);
    const mine = seen.filter((n) => created.includes(n.id));
    expect(mine).toHaveLength(5);
    expect(new Set(seen.map((n) => n.id)).size).toBe(seen.length);
    const times = seen.map((n) => n.createdAt);
    expect([...times].sort().reverse()).toEqual(times);

    const firstId = created[0] as string;
    expect(await ok(await call(markRead, "/notifications/read", { token, body: { ids: [firstId] } }), notificationsReadResultSchema)).toEqual({ updated: 1 });
    const unread = await walk(listNotifications, "/notifications?unreadOnly=true", token, notificationSchema, 50);
    expect(unread.map((n) => n.id)).not.toContain(firstId);
    const all = (await (await call(markRead, "/notifications/read", { token, body: { all: true } })).json()) as { data: { updated: number } };
    expect(all.data.updated).toBeGreaterThanOrEqual(4);
    expect((await call(markRead, "/notifications/read", { token, body: { ids: [] } })).status).toBe(422);
    expect((await call(listNotifications, "/notifications?limit=51", { token })).status).toBe(422);
  });
});
