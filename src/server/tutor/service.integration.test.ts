import { beforeAll, describe, expect, it } from "vitest";
import { createAiGateway, type AiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG, type AiConfig } from "@/server/ai/config";
import { DbUsageMeter } from "@/server/ai/meter-db";
import { fakeMessage, FakeTransport } from "@/server/ai/testing/fake-transport";
import { getEntitlements } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { withUserContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import { rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { localDateString } from "@/lib/dates";
import {
  createAttemptWithAnswers,
  createEnrollment,
  createLearner,
  createLearningSetup,
  uniqueSuffix,
  type Learner,
  type LearningSetup,
} from "../../../tests/factories/index";
import type { TutorDoneEvent, TutorErrorEvent, TutorStreamEvent } from "./protocol";
import {
  archiveConversation,
  createConversation,
  getConversation,
  getTutorStatus,
  listConversations,
  rateTutorMessage,
  sendTutorMessage,
  type SendTutorMessageInput,
  type SendTutorMessageOptions,
} from "./service";

/**
 * The tutor service against the test database (app_rw, NOBYPASSRLS: AiConversation / AiMessage row-level security is
 * real) with the real gateway pipeline (routing, quota reservation in AiUsageDaily, metering) over a FAKE transport.
 */

const AI_FEATURES = { aiTutor: true, aiMessagesPerDay: 200, aiMaxModelTier: "STANDARD" } as const;
const ANSWER = "Let's start with the factors of $6$. Which two numbers multiply to $6$ and add to $-5$?";

function testConfig(patch: (config: AiConfig) => void = () => undefined): AiConfig {
  const config = structuredClone(DEFAULT_AI_CONFIG);
  // The shared test database accumulates spend from parallel files; the budget guard is tested in src/server/ai.
  config.budget.dailyCostCeilingMicros = null;
  patch(config);
  return config;
}

function setupGateway(options: { transport?: FakeTransport | null; config?: AiConfig } = {}): { gateway: AiGateway; transport: FakeTransport } {
  const transport = options.transport === undefined ? new FakeTransport() : options.transport;
  if (transport) transport.defaultReply = { text: ANSWER, chunks: ["Let's start with the factors of $6$. ", "Which two numbers multiply to $6$ and add to $-5$?"] };
  const gateway = createAiGateway({ transport, config: options.config ?? testConfig(), meter: new DbUsageMeter() });
  return { gateway, transport: transport as FakeTransport };
}

async function collect(generator: AsyncGenerator<TutorStreamEvent>): Promise<TutorStreamEvent[]> {
  const events: TutorStreamEvent[] = [];
  for await (const event of generator) events.push(event);
  return events;
}

function doneOf(events: readonly TutorStreamEvent[]): TutorDoneEvent {
  const done = events.find((event): event is TutorDoneEvent => event.type === "done");
  if (!done) throw new Error(`no done event: ${JSON.stringify(events)}`);
  return done;
}

function errorOf(events: readonly TutorStreamEvent[]): TutorErrorEvent {
  const error = events.find((event): event is TutorErrorEvent => event.type === "error");
  if (!error) throw new Error(`no error event: ${JSON.stringify(events)}`);
  return error;
}

const noRateLimit = async (): Promise<void> => undefined;

function send(learner: Learner, conversationId: string, input: SendTutorMessageInput, options: SendTutorMessageOptions): Promise<TutorStreamEvent[]> {
  return collect(sendTutorMessage(learner.actor, conversationId, input, options));
}

async function messagesOf(userId: string, conversationId: string) {
  return withUserContext(userId, (tx) =>
    tx.aiMessage.findMany({ where: { conversationId }, orderBy: [{ createdAt: "asc" }, { id: "asc" }] }),
  );
}

async function conversationRow(userId: string, conversationId: string) {
  return withUserContext(userId, (tx) => tx.aiConversation.findUnique({ where: { id: conversationId } }));
}

let setup: LearningSetup;
let otherSetup: LearningSetup;

beforeAll(async () => {
  [setup, otherSetup] = await Promise.all([
    createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 1, gradeScheme: false }),
    createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, gradeScheme: false }),
  ]);
});

async function enrolledLearner(features: Record<string, unknown> = AI_FEATURES, firstName?: string): Promise<Learner> {
  const learner = await createLearner({ features: { ...features }, ...(firstName ? { firstName } : {}) });
  await createEnrollment(learner.userId, setup);
  return learner;
}

describe("createConversation", () => {
  it("checks the enrolment and the pinned syllabus, and freezes a PII-free learning context", async () => {
    const name = `Tatenda${uniqueSuffix()}`;
    const learner = await enrolledLearner(AI_FEATURES, name);
    const leaf = setup.leafTopicIds[0] as string;
    const question = setup.questionsByTopic.get(leaf)?.[0];
    if (!question) throw new Error("fixture question missing");
    await createAttemptWithAnswers({ userId: learner.userId, subjectId: setup.subjectId, questionId: question.id, topicId: leaf, answered: 1, correct: 0 });

    const created = await createConversation(learner.actor, { topicId: leaf });
    const leafName = setup.chain.subtopics.find((topic) => topic.id === leaf)?.name;
    expect(created.title).toBe(leafName);
    const row = await conversationRow(learner.userId, created.id);
    expect(row).toMatchObject({ subjectId: setup.subjectId, topicId: leaf, mode: "TUTOR", status: "ACTIVE" });
    const snapshot = row?.contextSnapshot as Record<string, unknown>;
    expect(snapshot).toMatchObject({ version: 1, subject: setup.chain.subject.name, topic: leafName });
    expect(snapshot.recentMistakes).toEqual([{ topic: leafName, summary: "Answered a question incorrectly (difficulty 3 of 5)" }]);
    const serialized = JSON.stringify(snapshot);
    expect(serialized).not.toContain(name);
    expect(serialized).not.toContain("@");

    // Not enrolled in the other subject; a topic of another syllabus version is refused.
    const notEnrolled = await createConversation(learner.actor, { subjectId: otherSetup.subjectId }).catch((error: unknown) => error);
    expect(isAppError(notEnrolled) && notEnrolled.code).toBe("NOT_FOUND");
    const wrongTopic = await createConversation(learner.actor, { subjectId: setup.subjectId, topicId: otherSetup.leafTopicIds[0] }).catch((error: unknown) => error);
    expect(isAppError(wrongTopic) && wrongTopic.code).toBe("VALIDATION");
    // A question the student never answered cannot be opened through the tutor.
    const unseen = setup.questions.find((item) => item.id !== question.id);
    const unseenError = await createConversation(learner.actor, { questionId: unseen?.id }).catch((error: unknown) => error);
    expect(isAppError(unseenError) && unseenError.code).toBe("NOT_FOUND");
  });

  it("lists the owner's conversations newest first, paginates and hides archived ones", async () => {
    const learner = await enrolledLearner();
    const first = await createConversation(learner.actor, { subjectId: setup.subjectId });
    const second = await createConversation(learner.actor, {});
    const third = await createConversation(learner.actor, { topicId: setup.topicIds[0] });

    const page1 = await listConversations(learner.actor, { limit: 2 });
    expect(page1.items.map((item) => item.id)).toEqual([third.id, second.id]);
    expect(page1.nextCursor).not.toBeNull();
    const page2 = await listConversations(learner.actor, { limit: 2, cursor: page1.nextCursor });
    expect(page2.items.map((item) => item.id)).toEqual([first.id]);
    expect(page2.nextCursor).toBeNull();
    expect(page2.items[0]).toMatchObject({ subjectName: setup.chain.subject.name, topicName: null });

    await archiveConversation(learner.actor, second.id);
    await archiveConversation(learner.actor, second.id); // idempotent
    expect((await listConversations(learner.actor)).items.map((item) => item.id)).toEqual([third.id, first.id]);
    const archived = await getConversation(learner.actor, second.id);
    expect(archived.status).toBe("ARCHIVED");
  });
});

describe("sendTutorMessage", () => {
  it("streams deltas, persists a metered exchange and returns the answer rendered server-side", async () => {
    const learner = await enrolledLearner();
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(learner.actor, { topicId: setup.topicIds[0] });

    const events = await send(learner, id, { text: "How do I factorise x^2 - 5x + 6?", mode: "TEACH" }, { gateway });
    expect(events.map((event) => event.type)).toEqual(["start", "delta", "delta", "done"]);
    expect(events[0]).toEqual({ type: "start", turnMode: "TEACH", hintLevel: 0 });
    const done = doneOf(events);
    expect(done.status).toBe("COMPLETE");
    expect(done.html).toContain("katex");
    expect(done.html).not.toContain("$6$");
    expect(done.turnsRemaining).toBe(DEFAULT_AI_CONFIG.limits.maxTurnsPerConversation - 1);
    const limit = (await getEntitlements(learner.userId)).entitlements.aiMessagesPerDay;
    expect(done.quota).toEqual(limit === null ? null : { limit, remaining: limit - 1 });

    // One model call: the chip supplied the mode (no classifier), STANDARD tier, policy + frozen context.
    expect(transport.calls.map((call) => call.kind)).toEqual(["stream"]);
    const params = transport.calls[0]?.request.params;
    expect(params?.model).toBe("claude-sonnet-5-5");
    const systemText = JSON.stringify(params?.system);
    expect(systemText).toContain("<student_context>");
    expect(systemText).toContain(setup.chain.subject.name);
    expect(JSON.stringify(params?.messages)).toContain("platform_guidance");

    const stored = await messagesOf(learner.userId, id);
    expect(stored.map((message) => message.role)).toEqual(["USER", "ASSISTANT"]);
    expect(stored[0]).toMatchObject({ content: "How do I factorise x^2 - 5x + 6?", intent: "TEACH" });
    expect(stored[1]).toMatchObject({ content: ANSWER, status: "COMPLETE", hintLevel: 0, intent: "TEACH", tier: "STANDARD", inputTokens: 100, outputTokens: 50 });
    expect(stored[1]?.id).toBe(done.messageId);
    const conversation = await conversationRow(learner.userId, id);
    expect(conversation).toMatchObject({ messageCount: 2, userMessageCount: 1, modelTier: "STANDARD", inputTokens: 100, outputTokens: 50 });

    // The quota ledger counted one TUTOR request (settled, nothing left reserved).
    const usage = await db.aiUsageDaily.findFirst({ where: { userId: learner.userId, feature: "TUTOR" } });
    expect(usage).toMatchObject({ requests: 1, reservedRequests: 0 });

    // The conversation page sees the same answer, rendered.
    const view = await getConversation(learner.actor, id);
    expect(view.messages.map((message) => message.role)).toEqual(["USER", "ASSISTANT"]);
    expect(view.messages[1]?.html).toContain("katex");
  });

  it("re-sends a bounded history window and climbs the hint ladder one level per turn", async () => {
    const learner = await enrolledLearner();
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    const levels: (number | null)[] = [];
    for (let turn = 0; turn < 10; turn += 1) {
      const done = doneOf(await send(learner, id, { text: `Question ${turn}?`, mode: "TEACH" }, { gateway, assertRateLimit: noRateLimit }));
      levels.push(done.hintLevel);
    }
    expect(levels).toEqual([0, 1, 2, 3, 3, 3, 3, 3, 3, 3]);
    const last = transport.calls.at(-1)?.request.params.messages ?? [];
    // 8 previous exchanges (16 messages) + the new student turn, never the whole conversation.
    expect(last).toHaveLength(17);
    expect(JSON.stringify(last[0])).toContain("Question 1?");
  });

  it("reveals the worked answer for 'Give me the answer' and classifies chip-less messages on the FAST tier", async () => {
    const learner = await enrolledLearner();
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });

    const answer = await send(learner, id, { text: "Solve 2x + 4 = 10", mode: "ANSWER" }, { gateway });
    expect(answer[0]).toEqual({ type: "start", turnMode: "ANSWER", hintLevel: 4 });
    expect(JSON.stringify(transport.calls.at(-1)?.request.params.messages)).toContain("FULL ANSWER");

    transport.enqueue({ text: JSON.stringify({ intent: "HINT", topicGuess: "linear equations", confidence: 0.9 }) });
    const classified = await send(learner, id, { text: "I am stuck on the next one: 3x - 1 = 8" }, { gateway });
    expect(classified[0]).toMatchObject({ type: "start", turnMode: "HINT" });
    const calls = transport.calls.slice(-2);
    expect(calls.map((call) => call.kind)).toEqual(["parse", "stream"]);
    expect(calls[0]?.request.params.model).toBe("claude-haiku-4-5");
    const stored = await messagesOf(learner.userId, id);
    expect(stored.filter((message) => message.role === "USER").map((message) => message.intent)).toEqual(["ANSWER", "HINT"]);
  });

  it("stops at the daily allowance before any model call, with an upgrade path", async () => {
    const learner = await enrolledLearner({ aiTutor: true, aiMessagesPerDay: 5 });
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    const limit = (await getEntitlements(learner.userId)).entitlements.aiMessagesPerDay;
    expect(limit).not.toBeNull();
    await db.aiUsageDaily.create({
      data: { userId: learner.userId, date: new Date(`${localDateString(new Date(), "Africa/Harare")}T00:00:00.000Z`), feature: "TUTOR", requests: limit ?? 0 },
    });

    const events = await send(learner, id, { text: "One more question?" }, { gateway });
    expect(events).toHaveLength(1);
    expect(errorOf(events)).toMatchObject({ code: "QUOTA_EXCEEDED", upgradeHref: "/pricing" });
    expect(transport.calls).toHaveLength(0);
    expect(await messagesOf(learner.userId, id)).toHaveLength(0);
    const status = await getTutorStatus(learner.actor, { gateway, isConfigured: () => true });
    expect(status.quota).toEqual({ limit, remaining: 0 });
  });

  it("enforces the per-minute rate limit", async () => {
    const learner = await enrolledLearner();
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    for (let i = 0; i < 1_000; i += 1) {
      if (!(await rateLimit(rateLimits.aiMessage(learner.userId))).allowed) break;
    }
    const events = await send(learner, id, { text: "Hello?", mode: "TEACH" }, { gateway });
    expect(errorOf(events).code).toBe("RATE_LIMITED");
    expect(errorOf(events).retryAfterSeconds).toBeGreaterThan(0);
    expect(transport.calls).toHaveLength(0);
  });

  it("locks a conversation at the turn limit", async () => {
    const learner = await enrolledLearner();
    const { gateway, transport } = setupGateway({ config: testConfig((config) => (config.limits.maxTurnsPerConversation = 2)) });
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    expect(doneOf(await send(learner, id, { text: "First?", mode: "TEACH" }, { gateway })).turnsRemaining).toBe(1);
    expect(doneOf(await send(learner, id, { text: "Second?", mode: "TEACH" }, { gateway })).turnsRemaining).toBe(0);
    expect((await conversationRow(learner.userId, id))?.status).toBe("LOCKED");

    const third = await send(learner, id, { text: "Third?", mode: "TEACH" }, { gateway });
    expect(errorOf(third).code).toBe("TURN_LIMIT");
    expect(transport.calls).toHaveLength(2);
  });

  it("refuses to help during an in-progress timed exam without a model call, but still answers a safeguarding message", async () => {
    const learner = await enrolledLearner();
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    const now = new Date();
    await db.assessmentAttempt.create({
      data: {
        userId: learner.userId,
        subjectId: setup.subjectId,
        mode: "TIMED_EXAM",
        status: "IN_PROGRESS",
        startedAt: now,
        lastSavedAt: now,
        deadlineAt: new Date(now.getTime() + 3_600_000),
        timeLimitSeconds: 3_600,
        config: { feedback: "ON_SUBMIT", origin: "BUILDER" },
      },
    });

    for (const mode of ["ANSWER", "HINT", undefined] as const) {
      const events = await send(learner, id, { text: "What is the answer to question 3?", ...(mode ? { mode } : {}) }, { gateway });
      expect(errorOf(events).code).toBe("EXAM_IN_PROGRESS");
    }
    expect(transport.calls).toHaveLength(0);
    expect(await messagesOf(learner.userId, id)).toHaveLength(0);

    const safeguarding = await send(learner, id, { text: "I want to hurt myself", mode: "ANSWER" }, { gateway });
    expect(safeguarding[0]).toEqual({ type: "start", turnMode: "SAFEGUARD", hintLevel: null });
    expect(doneOf(safeguarding).helplines).toEqual(expect.any(Array));
    expect(JSON.stringify(transport.calls[0]?.request.params.messages)).toContain("SAFEGUARDING");
    const conversation = await conversationRow(learner.userId, id);
    expect(conversation?.safetyCategory).toBe("safeguarding_disclosure");
  });

  it("keeps conversations private: another student can neither read, send, archive nor rate", async () => {
    const owner = await enrolledLearner();
    const intruder = await enrolledLearner();
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(owner.actor, { subjectId: setup.subjectId });
    const done = doneOf(await send(owner, id, { text: "Explain osmosis", mode: "TEACH" }, { gateway }));

    const read = await getConversation(intruder.actor, id, { gateway }).catch((error: unknown) => error);
    expect(isAppError(read) && read.code).toBe("NOT_FOUND");
    const sent = await send(intruder, id, { text: "planted", mode: "TEACH" }, { gateway });
    expect(errorOf(sent).code).toBe("NOT_FOUND");
    const archived = await archiveConversation(intruder.actor, id).catch((error: unknown) => error);
    expect(isAppError(archived) && archived.code).toBe("NOT_FOUND");
    const rated = await rateTutorMessage(intruder.actor, { messageId: done.messageId, rating: -1 }).catch((error: unknown) => error);
    expect(isAppError(rated) && rated.code).toBe("NOT_FOUND");
    expect((await listConversations(intruder.actor)).items).toHaveLength(0);
    expect(transport.calls).toHaveLength(1);

    // The owner rates the answer.
    await rateTutorMessage(owner.actor, { messageId: done.messageId, rating: 1 });
    const stored = await messagesOf(owner.userId, id);
    expect(stored.find((message) => message.id === done.messageId)?.userRating).toBe(1);
    // Outside a user context the rows do not exist at all (RLS).
    expect(await db.aiMessage.count({ where: { conversationId: id } })).toBe(0);
  });

  it("says calmly that AI is not configured, stores nothing and charges nothing", async () => {
    const learner = await enrolledLearner();
    const { gateway } = setupGateway({ transport: null });
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    for (const mode of ["TEACH", undefined] as const) {
      const events = await send(learner, id, { text: "Explain photosynthesis", ...(mode ? { mode } : {}) }, { gateway });
      expect(events).toEqual([expect.objectContaining({ type: "error", code: "AI_NOT_CONFIGURED" })]);
    }
    expect(await messagesOf(learner.userId, id)).toHaveLength(0);
    const usage = await db.aiUsageDaily.findFirst({ where: { userId: learner.userId } });
    expect(usage?.requests ?? 0).toBe(0);
    expect((await getTutorStatus(learner.actor, { gateway, isConfigured: () => false })).configured).toBe(false);
  });

  it("stores the partial answer as ABORTED when the reader disconnects mid-stream", async () => {
    class SlowTransport extends FakeTransport {
      override async stream(...[request, options]: Parameters<FakeTransport["stream"]>): ReturnType<FakeTransport["stream"]> {
        this.calls.push({ kind: "stream", request, options });
        for (const chunk of ["Step one. ", "Step two. ", "Step three."]) {
          await new Promise((resolve) => setTimeout(resolve, 20));
          if (options.signal?.aborted) {
            return { message: { model: request.params.model, content: [], stop_reason: null, usage: { input_tokens: 100, output_tokens: 3 } }, aborted: true };
          }
          options.onText(chunk);
        }
        return { message: fakeMessage({ model: request.params.model, text: "Step one. Step two. Step three." }), aborted: false };
      }
    }
    const learner = await enrolledLearner();
    const { gateway } = setupGateway({ transport: new SlowTransport() });
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });

    const seen: TutorStreamEvent[] = [];
    for await (const event of sendTutorMessage(learner.actor, id, { text: "Explain diffusion", mode: "TEACH" }, { gateway })) {
      seen.push(event);
      if (event.type === "delta") break; // the client went away after the first chunk
    }
    expect(seen.map((event) => event.type)).toEqual(["start", "delta"]);
    const stored = await messagesOf(learner.userId, id);
    expect(stored.map((message) => message.role)).toEqual(["USER", "ASSISTANT"]);
    expect(stored[1]).toMatchObject({ status: "ABORTED", content: "Step one. " });
    expect(stored[1]?.outputTokens).toBeGreaterThan(0);
  });

  it("replays a retried message (same clientMessageId) without calling the model again", async () => {
    const learner = await enrolledLearner();
    const { gateway, transport } = setupGateway();
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    const input = { text: "What is a mole?", mode: "TEACH" as const, clientMessageId: `retry-${uniqueSuffix()}` };
    const first = doneOf(await send(learner, id, input, { gateway }));
    const second = doneOf(await send(learner, id, input, { gateway }));
    expect(second).toMatchObject({ messageId: first.messageId, replayed: true, html: first.html });
    expect(transport.calls).toHaveLength(1);
    expect(await messagesOf(learner.userId, id)).toHaveLength(2);
  });

  it("maps a refusal to a REFUSED message without text, and refuses messages over the input cap", async () => {
    const learner = await enrolledLearner();
    const { gateway } = setupGateway();
    const { id } = await createConversation(learner.actor, { subjectId: setup.subjectId });
    const transport = new FakeTransport();
    transport.enqueue({ message: fakeMessage({ text: "partial", stop_reason: "refusal", stop_details: { category: "general_harms" } }) });
    const refusingGateway = createAiGateway({ transport, config: testConfig(), meter: new DbUsageMeter() });
    const refused = doneOf(await send(learner, id, { text: "Tell me something harmful", mode: "TEACH" }, { gateway: refusingGateway }));
    expect(refused).toMatchObject({ status: "REFUSED", html: "" });
    const stored = await messagesOf(learner.userId, id);
    expect(stored[1]).toMatchObject({ status: "REFUSED", content: "" });

    const tooLong = await send(learner, id, { text: "x".repeat(DEFAULT_AI_CONFIG.limits.maxInputCharsPerMessage + 1), mode: "TEACH" }, { gateway });
    expect(errorOf(tooLong).code).toBe("VALIDATION");
  });

  it("gives a conversation opened from an answered question the question as frozen context", async () => {
    const learner = await enrolledLearner();
    const leaf = setup.leafTopicIds[1] as string;
    const question = setup.questionsByTopic.get(leaf)?.[0];
    if (!question) throw new Error("fixture question missing");
    await createAttemptWithAnswers({ userId: learner.userId, subjectId: setup.subjectId, questionId: question.id, topicId: leaf, answered: 1, correct: 0 });
    const { gateway, transport } = setupGateway();

    const { id } = await createConversation(learner.actor, { questionId: question.id });
    const row = await conversationRow(learner.userId, id);
    expect(row).toMatchObject({ questionId: question.id, topicId: leaf, subjectId: setup.subjectId });

    const events = await send(learner, id, { text: "Why was my answer wrong?", mode: "TEACH" }, { gateway });
    expect(doneOf(events).status).toBe("COMPLETE");
    // Reference data in the first user turn, never the system prompt (AI-03).
    const systemText = JSON.stringify(transport.calls[0]?.request.params.system);
    const messagesText = JSON.stringify(transport.calls[0]?.request.params.messages);
    expect(systemText).not.toContain("chose option A");
    expect(messagesText).toContain("<question_context>");
    expect(messagesText).toContain("chose option A (marked incorrect)");
  });
});
