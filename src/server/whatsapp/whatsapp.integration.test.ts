import { randomUUID } from "node:crypto";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { localDateString, dateColumnFromLocalDate } from "@/lib/dates";
import { createAiGateway, type AiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG, type AiConfig } from "@/server/ai/config";
import { DbUsageMeter } from "@/server/ai/meter-db";
import { InMemoryResponseCache } from "@/server/ai/response-cache";
import { FakeTransport } from "@/server/ai/testing/fake-transport";
import { clearOtpCooldown, latestCodeFor, testMeta } from "@/server/auth/testing";
import { loadActor } from "@/server/auth/actor";
import { revokeAllSessions } from "@/server/auth/sessions";
import { db } from "@/server/db";
import { withUserContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import { createLogger } from "@/server/lib/logger";
import { RATE_LIMIT_PRESETS, rateLimitSubject } from "@/server/lib/rate-limit";
import { WhatsAppCloudDriver } from "@/server/messaging/whatsapp-driver";
import { startPracticeSession } from "@/server/practice";
import {
  createEnrollment,
  createLearner,
  createLearningSetup,
  createStudent,
  uniquePhone,
  UNLIMITED_LEARNING_FEATURES,
  type LearningSetup,
} from "../../../tests/factories/index";
import type { WhatsAppConfig } from "./config";
import { explainTopic } from "./explain";
import { confirmWhatsAppLink, getWhatsAppLinkStatus, requestWhatsAppLinkCode, setWhatsAppReminders, unlinkWhatsApp } from "./identity";
import { handleVerification, handleWebhookPost } from "./inbound";
import { purgeWhatsAppData, runWhatsAppProcessJob } from "./jobs";
import { queueProactiveWhatsApp, sendQueuedMessage } from "./outbound";
import { processInboundMessage } from "./router";
import { computeSignature } from "./signature";
import type { WhatsAppTransport } from "./transport";

/**
 * The WhatsApp channel end to end against the test database (app_rw: row-level security on AI tables is real):
 * webhook (signature, dedupe, receipts) -> whatsapp.process (identity, state, commands, the real attempt engine,
 * progress and AI services) -> whatsapp.send through the Cloud API driver over a MOCKED fetch (no network).
 */

const CONFIG: WhatsAppConfig = {
  verifyToken: "verify-token-for-tests",
  appSecret: "app-secret-for-tests",
  accessToken: "EAAG-test-token",
  phoneNumberId: "100200300",
  graphVersion: "v23.0",
};
const silent = createLogger({ level: "silent" });

// The channel is switched on for this file (`features.whatsapp`); the "switched off" block flips it.
const flags = vi.hoisted(() => ({ ai: false, whatsapp: true, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);
afterEach(() => {
  flags.whatsapp = true;
});

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------

interface GraphCall {
  url: string;
  body: Record<string, unknown> & { type?: string; text?: { body: string }; interactive?: Record<string, unknown>; template?: { name: string } };
}

function fakeGraph(): { transport: WhatsAppTransport; calls: GraphCall[] } {
  const calls: GraphCall[] = [];
  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), body: JSON.parse(String(init?.body)) as GraphCall["body"] });
    return Response.json({ messaging_product: "whatsapp", messages: [{ id: `wamid.${randomUUID()}` }] });
  }) as typeof fetch;
  const driver = new WhatsAppCloudDriver({ accessToken: CONFIG.accessToken, phoneNumberId: CONFIG.phoneNumberId, graphVersion: CONFIG.graphVersion }, { fetch: fetchImpl, logger: silent });
  return { transport: { driver: driver.driver, send: (to, request, tag) => driver.sendRequest(to, request, tag) }, calls };
}

function webhookBody(messages: unknown[] = [], statuses: unknown[] = []): string {
  return JSON.stringify({
    object: "whatsapp_business_account",
    entry: [
      {
        id: "waba-test",
        changes: [
          {
            field: "messages",
            value: {
              messaging_product: "whatsapp",
              metadata: { display_phone_number: "263770000000", phone_number_id: CONFIG.phoneNumberId },
              contacts: [{ profile: { name: "Do Not Store" }, wa_id: "263770000001" }],
              ...(messages.length > 0 ? { messages } : {}),
              ...(statuses.length > 0 ? { statuses } : {}),
            },
          },
        ],
      },
    ],
  });
}

function post(body: string, signature: string | null = computeSignature(body, CONFIG.appSecret)): Request {
  return new Request("http://localhost:3000/api/webhooks/whatsapp", {
    method: "POST",
    headers: { "content-type": "application/json", ...(signature === null ? {} : { "x-hub-signature-256": signature }) },
    body,
  });
}

function textMessage(from: string, text: string, at: Date = new Date()) {
  return { from: from.slice(1), id: `wamid.${randomUUID()}`, timestamp: String(Math.floor(at.getTime() / 1000)), type: "text", text: { body: text } };
}

function listReply(from: string, id: string, title: string) {
  return {
    from: from.slice(1),
    id: `wamid.${randomUUID()}`,
    timestamp: String(Math.floor(Date.now() / 1000)),
    type: "interactive",
    interactive: { type: "list_reply", list_reply: { id, title } },
  };
}

async function deliver(message: { id: string }) {
  const response = await handleWebhookPost(post(webhookBody([message])), { config: CONFIG, logger: silent });
  expect(response.status).toBe(200);
  return db.channelMessage.findUniqueOrThrow({ where: { channel_externalMessageId: { channel: "WHATSAPP", externalMessageId: message.id } } });
}

async function repliesTo(inboundId: string) {
  return db.channelMessage.findMany({ where: { inReplyToId: inboundId }, orderBy: { createdAt: "asc" } });
}

/** Processes one inbound message and sends its replies through the fake Graph API. */
async function run(inboundId: string, graph: ReturnType<typeof fakeGraph>, options: { gateway?: AiGateway; now?: Date } = {}) {
  const now = options.now ?? new Date();
  const outcome = await processInboundMessage(inboundId, { now: () => now, logger: silent, ...(options.gateway ? { gateway: options.gateway } : {}) });
  const outbound = await repliesTo(inboundId);
  const sent = [];
  for (const row of outbound) sent.push(await sendQueuedMessage(row.id, { transport: graph.transport, now: () => now, logger: silent }));
  return { outcome, outbound, sent };
}

async function linkStudent(userId: string, phone: string, options: { reminders?: boolean } = {}) {
  const actor = { userId, roles: ["STUDENT" as const] };
  await clearOtpCooldown("CHANNEL_LINK", phone);
  await requestWhatsAppLinkCode(actor, { phone }, testMeta());
  const code = latestCodeFor(phone);
  return confirmWhatsAppLink(actor, { phone, code, reminders: options.reminders ?? false }, testMeta());
}

function testConfig(patch: (config: AiConfig) => void = () => undefined): AiConfig {
  const config = structuredClone(DEFAULT_AI_CONFIG);
  config.budget.dailyCostCeilingMicros = null;
  config.routing.routes.whatsapp = { tier: "FAST", maxTokens: 512, cacheable: true };
  patch(config);
  return config;
}

const AI_FEATURES = { ...UNLIMITED_LEARNING_FEATURES, aiTutor: true, aiMessagesPerDay: 50, aiMaxModelTier: "STANDARD" };

let setup: LearningSetup;

beforeAll(async () => {
  setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, gradeScheme: false });
  const question = setup.questions[0];
  if (!question) throw new Error("fixture question missing");
  await db.dailyQuestion.create({
    data: {
      date: dateColumnFromLocalDate(localDateString(new Date(), "Africa/Harare")),
      qualificationId: setup.qualificationId,
      subjectId: setup.subjectId,
      questionId: question.id,
    },
  });
});

/** An adult, enrolled student with a linked WhatsApp number. */
async function linkedLearner(features: Record<string, unknown> = { ...UNLIMITED_LEARNING_FEATURES }, options: { reminders?: boolean; qualification?: boolean } = {}) {
  const learner = await createLearner({ features });
  await createEnrollment(learner.userId, setup);
  if (options.qualification) {
    await db.student.update({
      where: { userId: learner.userId },
      data: { countryId: setup.chain.country.id, examBoardId: setup.chain.examBoard.id, qualificationId: setup.qualificationId },
    });
  }
  const phone = uniquePhone();
  await linkStudent(learner.userId, phone, { reminders: options.reminders ?? false });
  return { ...learner, phone };
}

// ---------------------------------------------------------------------------------------------------------------------
// Webhook
// ---------------------------------------------------------------------------------------------------------------------

describe("webhook verification and signatures", () => {
  it("answers the subscription handshake only with the right verify token", () => {
    const url = (token: string) => new URL(`http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=${token}&hub.challenge=987654`);
    expect(handleVerification(url(CONFIG.verifyToken), { config: CONFIG })).toEqual({ status: 200, body: "987654", contentType: "text/plain" });
    expect(handleVerification(url("wrong"), { config: CONFIG }).status).toBe(403);
    expect(handleVerification(url(CONFIG.verifyToken), { config: null }).status).toBe(404);
  });

  it("accepts a valid signature and rejects invalid or missing ones without storing anything", async () => {
    const phone = uniquePhone();
    const valid = textMessage(phone, "help");
    expect((await handleWebhookPost(post(webhookBody([valid])), { config: CONFIG, logger: silent })).status).toBe(200);

    const forged = textMessage(phone, "help");
    const body = webhookBody([forged]);
    const bad = await handleWebhookPost(post(body, computeSignature(body, "not-the-secret")), { config: CONFIG, logger: silent });
    expect(bad).toEqual({ status: 401, body: { received: false, error: "invalid_signature" }, contentType: "application/json" });
    expect((await handleWebhookPost(post(body, null), { config: CONFIG, logger: silent })).status).toBe(401);
    // A body altered after signing.
    expect((await handleWebhookPost(post(`${body} `, computeSignature(body, CONFIG.appSecret)), { config: CONFIG, logger: silent })).status).toBe(401);
    expect(await db.channelMessage.count({ where: { externalMessageId: forged.id } })).toBe(0);
    expect(await db.channelMessage.count({ where: { externalMessageId: valid.id } })).toBe(1);
  });

  it("deduplicates redelivered messages (one row, one job) and never stores the contact name", async () => {
    const phone = uniquePhone();
    const message = textMessage(phone, "help");
    for (let i = 0; i < 3; i += 1) await handleWebhookPost(post(webhookBody([message])), { config: CONFIG, logger: silent });
    const rows = await db.channelMessage.findMany({ where: { channel: "WHATSAPP", externalMessageId: message.id } });
    expect(rows).toHaveLength(1);
    expect(await db.job.count({ where: { type: "whatsapp.process", dedupeKey: `whatsapp.process:${rows[0]?.id}` } })).toBe(1);
    const identity = await db.channelIdentity.findUniqueOrThrow({ where: { channel_externalId: { channel: "WHATSAPP", externalId: phone } } });
    expect(identity.userId).toBeNull();
    expect(identity.lastInboundAt).not.toBeNull();
    expect(JSON.stringify(rows)).not.toContain("Do Not Store");
  });

  it("counts the per-number limit only for NEW messages: redeliveries of stored messages never use up the allowance", async () => {
    const phone = uniquePhone();
    const limit = RATE_LIMIT_PRESETS.whatsappInbound.limit;
    const hits = async () => {
      const bucket = await db.rateLimitBucket.findUnique({ where: { key: `whatsappInbound:${rateLimitSubject(phone)}` } });
      return bucket ? bucket.count + bucket.prevCount : 0;
    };
    // Meta redelivers the same message more times than the limit allows: one row, one hit.
    const first = textMessage(phone, "help");
    for (let i = 0; i < limit + 5; i += 1) {
      expect((await handleWebhookPost(post(webhookBody([first])), { config: CONFIG, logger: silent })).status).toBe(200);
    }
    expect(await hits()).toBe(1);
    expect((await db.channelMessage.findFirstOrThrow({ where: { externalMessageId: first.id } })).status).toBe("RECEIVED");

    // New messages up to the limit are processed; the next one is stored IGNORED with no job, and its redelivery is
    // still a no-op (no extra hit).
    const more = Array.from({ length: limit - 1 }, () => textMessage(phone, "help"));
    for (const message of more) await handleWebhookPost(post(webhookBody([message])), { config: CONFIG, logger: silent });
    expect(await db.channelMessage.count({ where: { externalMessageId: { in: more.map((m) => m.id) }, status: "RECEIVED" } })).toBe(limit - 1);
    const over = textMessage(phone, "help");
    await handleWebhookPost(post(webhookBody([over])), { config: CONFIG, logger: silent });
    await handleWebhookPost(post(webhookBody([over])), { config: CONFIG, logger: silent });
    const ignored = await db.channelMessage.findFirstOrThrow({ where: { externalMessageId: over.id } });
    expect(ignored.status).toBe("IGNORED");
    expect(await db.job.count({ where: { type: "whatsapp.process", dedupeKey: `whatsapp.process:${ignored.id}` } })).toBe(0);
    expect(await hits()).toBe(limit + 1);
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Unknown numbers and linking
// ---------------------------------------------------------------------------------------------------------------------

describe("unknown numbers", () => {
  it("replies with linking instructions, stores no personal text and throttles repeats", async () => {
    const graph = fakeGraph();
    const phone = uniquePhone();
    const first = await deliver(textMessage(phone, "Hello, my name is Rudo and I go to Mbare High"));
    expect(first.body).toBeNull(); // not a command: the unlinked number's text is not kept
    const { outcome, sent } = await run(first.id, graph);
    expect(outcome).toMatchObject({ status: "processed", command: "link_help", replies: 1 });
    expect(sent[0]).toMatchObject({ status: "sent" });
    expect(graph.calls[0]?.body.text?.body).toContain("Settings → WhatsApp");
    expect(graph.calls[0]?.body.to).toBe(phone.slice(1));

    const second = await deliver(textMessage(phone, "are you there"));
    expect((await run(second.id, graph)).outcome).toMatchObject({ status: "ignored", replies: 0 });
    const help = await deliver(textMessage(phone, "HELP"));
    expect(help.body).toBe("HELP");
    expect((await run(help.id, graph)).outcome).toMatchObject({ status: "processed", replies: 1 });
  });
});

describe("linking from Settings → WhatsApp", () => {
  it("sends a CHANNEL_LINK code over WhatsApp, links on the right code and creates a WHATSAPP session", async () => {
    const { userId } = await createLearner({ features: null });
    const actor = { userId, roles: ["STUDENT" as const] };
    const phone = uniquePhone();
    expect(await getWhatsAppLinkStatus(actor)).toMatchObject({ available: true, consentRequired: false, linked: null });

    const requested = await requestWhatsAppLinkCode(actor, { phone: `0${phone.slice(4)}` }, testMeta());
    expect(requested.phone).toBe(phone);
    const stored = await db.verificationCode.findFirstOrThrow({ where: { target: phone, purpose: "CHANNEL_LINK" }, orderBy: { createdAt: "desc" } });
    expect(stored).toMatchObject({ channel: "WHATSAPP", userId, context: { channel: "WHATSAPP", externalId: phone } });

    const wrong = await confirmWhatsAppLink(actor, { phone, code: "000000" }, testMeta()).catch((e: unknown) => e);
    expect(isAppError(wrong) && wrong.code).toBe("VALIDATION");

    const linked = await confirmWhatsAppLink(actor, { phone, code: latestCodeFor(phone), reminders: true }, testMeta());
    expect(linked.transferred).toBe(false);
    const identity = await db.channelIdentity.findUniqueOrThrow({ where: { userId_channel: { userId, channel: "WHATSAPP" } } });
    expect(identity).toMatchObject({ externalId: phone, verifiedAt: expect.any(Date), linkedAt: expect.any(Date), optedInAt: expect.any(Date) });
    expect(await db.session.count({ where: { userId, kind: "WHATSAPP", authMethod: "CHANNEL_LINK", revokedAt: null } })).toBe(1);
    expect(await db.auditLog.count({ where: { entityType: "ChannelIdentity", entityId: identity.id } })).toBe(1);
    expect(await getWhatsAppLinkStatus(actor)).toMatchObject({ linked: { phoneMasked: expect.stringContaining("***"), remindersOn: true } });

    expect(await setWhatsAppReminders(actor, false)).toEqual({ remindersOn: false });
    expect((await getWhatsAppLinkStatus(actor)).linked?.remindersOn).toBe(false);

    expect(await unlinkWhatsApp(actor, testMeta())).toBe(true);
    expect(await db.channelIdentity.findUnique({ where: { userId_channel: { userId, channel: "WHATSAPP" } } })).toBeNull();
    expect(await db.session.count({ where: { userId, kind: "WHATSAPP", revokedAt: null } })).toBe(0);
  });

  it("moves a number to the account that proves it, ending the previous owner's link", async () => {
    const phone = uniquePhone();
    const a = await createLearner({ features: null });
    const b = await createLearner({ features: null });
    await linkStudent(a.userId, phone);
    const moved = await linkStudent(b.userId, phone);
    expect(moved.transferred).toBe(true);
    const identity = await db.channelIdentity.findUniqueOrThrow({ where: { channel_externalId: { channel: "WHATSAPP", externalId: phone } } });
    expect(identity.userId).toBe(b.userId);
    expect(await db.session.count({ where: { userId: a.userId, kind: "WHATSAPP", revokedAt: null } })).toBe(0);
  });

  it("refuses minors without guardian consent and non-students", async () => {
    const { user } = await createStudent({ student: { isMinor: true } });
    const minor = { userId: user.id, roles: ["STUDENT" as const] };
    expect((await getWhatsAppLinkStatus(minor)).consentRequired).toBe(true);
    const refused = await requestWhatsAppLinkCode(minor, { phone: uniquePhone() }, testMeta()).catch((e: unknown) => e);
    expect(isAppError(refused) && refused.code).toBe("FORBIDDEN");
    const parent = await requestWhatsAppLinkCode({ userId: user.id, roles: ["PARENT"] }, { phone: uniquePhone() }, testMeta()).catch((e: unknown) => e);
    expect(isAppError(parent) && parent.code).toBe("FORBIDDEN");
    const invalid = await requestWhatsAppLinkCode({ userId: user.id, roles: ["STUDENT"] }, { phone: "12" }, testMeta()).catch((e: unknown) => e);
    expect(isAppError(invalid) && invalid.code).toBe("VALIDATION");
  });

  it("asks a number to link again after the student signs out everywhere", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner();
    await revokeAllSessions(learner.userId, { reason: "logout_all" });
    const inbound = await deliver(textMessage(learner.phone, "QUESTION"));
    const { outcome } = await run(inbound.id, graph);
    expect(outcome.command).toBe("relink");
    expect(graph.calls[0]?.body.text?.body).toContain("Link it again");
    const identity = await db.channelIdentity.findUniqueOrThrow({ where: { channel_externalId: { channel: "WHATSAPP", externalId: learner.phone } } });
    expect(identity.userId).toBeNull();
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------------------------------------------------

describe("daily question round trip", () => {
  it("question -> list answer -> marked by the attempt engine, recorded as a WhatsApp attempt", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner();
    const question = setup.questions[0];
    if (!question) throw new Error("fixture question missing");

    const ask = await deliver(textMessage(learner.phone, "Give me today's study question"));
    const asked = await run(ask.id, graph);
    expect(asked.outcome).toMatchObject({ status: "processed", command: "question", replies: 1 });
    const sentQuestion = graph.calls[0]?.body;
    expect(sentQuestion?.type).toBe("interactive");
    expect(JSON.stringify(sentQuestion)).toContain("x² - 5x + 6 = 0");

    const state = await db.channelConversationState.findFirstOrThrow({ where: { identity: { externalId: learner.phone } } });
    expect(state.state).toBe("AWAITING_ANSWER");
    const optionKeys = (state.context as { optionKeys: string[] }).optionKeys;
    const correctKey = question.definition.options.find((o) => o.isCorrect)?.key as string;
    const letter = String.fromCharCode(65 + optionKeys.indexOf(correctKey));
    const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: state.pendingAttemptId as string } });
    expect(attempt).toMatchObject({ mode: "DAILY_QUESTION", channel: "WHATSAPP", userId: learner.userId });

    const answer = await deliver(listReply(learner.phone, `a:${attempt.id}:1:${letter}`, letter));
    const answered = await run(answer.id, graph);
    expect(answered.outcome).toMatchObject({ status: "processed", command: "answer" });
    expect(graph.calls[1]?.body.text?.body).toContain("*Correct!*");
    const slot = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId: attempt.id, position: 1 } } });
    expect(slot.isCorrect).toBe(true);
    expect((await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attempt.id } })).status).toBe("MARKED");
    expect((await db.channelConversationState.findFirstOrThrow({ where: { identityId: state.identityId } })).state).toBe("IDLE");

    // Asking again today: already answered.
    const again = await deliver(textMessage(learner.phone, "question"));
    await run(again.id, graph);
    expect(graph.calls[2]?.body.text?.body).toContain("You've answered today's question");

    // Processing the same inbound twice is a no-op (idempotent job).
    expect((await processInboundMessage(answer.id, { logger: silent })).status).toBe("noop");
  });

  it("refuses answer buttons that point at anything but a daily question (e.g. a web practice session)", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner();
    const actor = await loadActor(learner.userId);
    if (!actor) throw new Error("actor missing");
    const practice = await startPracticeSession(actor, { subjectId: setup.subjectId, count: 1 });
    const practiceAttempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: practice.attemptId }, select: { mode: true, config: true } });
    expect(practiceAttempt.mode).toBe("PRACTICE");
    expect((practiceAttempt.config as { feedback?: string }).feedback).toBe("IMMEDIATE");

    const forged = await deliver(listReply(learner.phone, `a:${practice.attemptId}:1:A`, "A"));
    const result = await run(forged.id, graph);
    expect(result.outcome).toMatchObject({ status: "processed", command: "answer", replies: 1 });
    expect(graph.calls[0]?.body.text?.body).toContain("isn't available");
    const slot = await db.questionAttempt.findUnique({ where: { attemptId_position: { attemptId: practice.attemptId, position: 1 } }, select: { markedAt: true } });
    expect(slot?.markedAt ?? null).toBeNull();
  });

  it("nudges a wrong reply format and shows the streak", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner();
    await run((await deliver(textMessage(learner.phone, "quiz"))).id, graph);
    await run((await deliver(textMessage(learner.phone, "the second one maybe"))).id, graph);
    expect(graph.calls[1]?.body.text?.body).toMatch(/Reply with A, B, C or D/);
    await run((await deliver(textMessage(learner.phone, "STREAK"))).id, graph);
    expect(graph.calls[2]?.body.text?.body).toContain("Today's target");
  });
});

describe("Explain <topic> through the AI gateway", () => {
  function gateway(transport: FakeTransport | null = new FakeTransport()) {
    if (transport) transport.defaultReply = { text: "**Photosynthesis** is how plants make glucose from $CO_2$ and water using light.\n\nWhat gas do plants give out?" };
    return { gateway: createAiGateway({ transport, config: testConfig(), meter: new DbUsageMeter(), responseCache: new InMemoryResponseCache() }), transport };
  }

  it("stores the exchange privately, replies via AiMessage and serves the same level from the cache", async () => {
    const graph = fakeGraph();
    const { gateway: ai, transport } = gateway();
    const learner = await linkedLearner(AI_FEATURES, { qualification: true });
    const inbound = await deliver(textMessage(learner.phone, "Explain photosynthesis"));
    const { outcome, outbound, sent } = await run(inbound.id, graph, { gateway: ai });
    expect(outcome).toMatchObject({ status: "processed", command: "explain", replies: 1 });
    expect(sent[0]).toMatchObject({ status: "sent" });

    const scrubbed = await db.channelMessage.findUniqueOrThrow({ where: { id: inbound.id } });
    expect(scrubbed).toMatchObject({ contentClass: "AI_PRIVATE", body: null, payload: null, aiMessageId: expect.any(String) });
    expect(outbound[0]).toMatchObject({ contentClass: "AI_PRIVATE", body: null, aiMessageId: expect.any(String) });
    const text = graph.calls[0]?.body.text?.body ?? "";
    expect(text).toContain("*Photosynthesis* is how plants make glucose from CO₂");
    expect(text).toContain("What gas do plants give out?");
    expect(text).toContain("/app/tutor");
    expect([...text].length).toBeLessThanOrEqual(1000);
    const request = transport?.calls[0]?.request.params;
    expect(request?.model).toBe("claude-haiku-4-5");
    expect(JSON.stringify(request?.system)).toContain("<level>");

    const conversations = await withUserContext(learner.userId, (tx) => tx.aiConversation.findMany({ where: { userId: learner.userId, channel: "WHATSAPP" } }));
    expect(conversations).toHaveLength(1);
    expect(conversations[0]?.userMessageCount).toBe(1);

    // Same topic, same level, another student: served from the response cache (no second model call).
    const other = await linkedLearner(AI_FEATURES, { qualification: true });
    await run((await deliver(textMessage(other.phone, "explain photosynthesis please"))).id, graph, { gateway: ai });
    expect(transport?.calls).toHaveLength(1);
    expect(graph.calls[1]?.body.text?.body).toContain("Photosynthesis");
  });

  it("is honest when AI is not configured (no fabricated answer, no empty conversation)", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner(AI_FEATURES);
    const inbound = await deliver(textMessage(learner.phone, "Explain osmosis"));
    await run(inbound.id, graph, { gateway: gateway(null).gateway });
    expect(graph.calls[0]?.body.text?.body).toContain("aren't available");
    expect((await db.channelMessage.findUniqueOrThrow({ where: { id: inbound.id } })).contentClass).toBe("STANDARD");
    const conversations = await withUserContext(learner.userId, (tx) => tx.aiConversation.count({ where: { userId: learner.userId, channel: "WHATSAPP" } }));
    expect(conversations).toBe(0);
  });

  it("routes an ambiguous message through the FAST-tier classifier only after the keywords found nothing", async () => {
    const graph = fakeGraph();
    const transport = new FakeTransport().enqueue({ text: '{"intent":"STREAK","topic":null}' });
    const ai = createAiGateway({ transport, config: testConfig(), meter: new DbUsageMeter(), responseCache: new InMemoryResponseCache() });
    const learner = await linkedLearner(AI_FEATURES);
    await run((await deliver(textMessage(learner.phone, "how have I been doing lately"))).id, graph, { gateway: ai });
    expect(transport.calls).toHaveLength(1);
    expect(transport.calls[0]?.kind).toBe("parse");
    expect(transport.calls[0]?.request.params.model).toBe("claude-haiku-4-5");
    expect(graph.calls[0]?.body.text?.body).toContain("Today's target");
    // Keywords never reach the model.
    await run((await deliver(textMessage(learner.phone, "streak"))).id, graph, { gateway: ai });
    expect(transport.calls).toHaveLength(1);
  });

  it("answers safeguarding phrases with care, without a model call, and keeps the text out of the channel table", async () => {
    const graph = fakeGraph();
    const { gateway: ai, transport } = gateway();
    const learner = await linkedLearner(AI_FEATURES);
    const inbound = await deliver(textMessage(learner.phone, "I want to die"));
    await run(inbound.id, graph, { gateway: ai });
    expect(graph.calls[0]?.body.text?.body).toContain("trusted adult");
    expect(transport?.calls).toHaveLength(0);
    expect(await db.channelMessage.findUniqueOrThrow({ where: { id: inbound.id } })).toMatchObject({ body: null, bodyPurgedAt: expect.any(Date) });
  });

  it("replays a retried explanation instead of calling the model twice", async () => {
    const { gateway: ai, transport } = gateway();
    const learner = await linkedLearner(AI_FEATURES);
    const actor = await loadActor(learner.userId, { channel: "whatsapp" });
    if (!actor) throw new Error("actor missing");
    const options = { gateway: ai, clientMessageId: `wa-${randomUUID()}`, links: { pricing: "http://localhost:3000/pricing" } };
    const first = await explainTopic(actor, "osmosis", options);
    const again = await explainTopic(actor, "osmosis", options);
    expect(first).toMatchObject({ kind: "ai", replayed: false });
    expect(again).toMatchObject({ kind: "ai", replayed: true });
    expect(first.kind === "ai" && again.kind === "ai" && first.assistantAiMessageId === again.assistantAiMessageId).toBe(true);
    expect(transport?.calls).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Window, opt-out, receipts, retention
// ---------------------------------------------------------------------------------------------------------------------

describe("24-hour window and opt-out", () => {
  it("skips free-form replies outside the window and uses the template for opted-in proactive messages", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner({ ...UNLIMITED_LEARNING_FEATURES }, { reminders: true });
    const now = new Date();
    // A message from 25 hours ago processed only now (a backlog): the window has closed.
    const late = await deliver(textMessage(learner.phone, "HELP", new Date(now.getTime() - 25 * 3_600_000)));
    const { sent } = await run(late.id, graph, { now });
    expect(sent[0]).toEqual({ status: "skipped", reason: "outside_service_window" });
    expect(graph.calls).toHaveLength(0);
    const row = (await repliesTo(late.id))[0];
    expect(row).toMatchObject({ status: "FAILED", error: "skipped: outside_service_window" });

    const proactive = await queueProactiveWhatsApp(learner.userId, {
      spec: { kind: "text", text: "Your daily question is ready." },
      fallback: { key: "dailyQuestionReady", params: ["Mathematics"] },
    });
    expect(await sendQueuedMessage(proactive as string, { transport: graph.transport, logger: silent })).toMatchObject({ status: "sent" });
    expect(graph.calls[0]?.body).toMatchObject({ type: "template", template: { name: "daily_question_ready" } });
  });

  it("STOP suppresses proactive messages (replies still work) and START turns them back on", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner({ ...UNLIMITED_LEARNING_FEATURES }, { reminders: true });
    const stop = await deliver(textMessage(learner.phone, "STOP"));
    await run(stop.id, graph);
    expect(graph.calls[0]?.body.text?.body).toContain("won't get reminders");
    const identity = await db.channelIdentity.findUniqueOrThrow({ where: { channel_externalId: { channel: "WHATSAPP", externalId: learner.phone } } });
    expect(identity.optedOutAt).not.toBeNull();

    const blocked = await queueProactiveWhatsApp(learner.userId, { spec: { kind: "text", text: "Reminder" } });
    expect(await sendQueuedMessage(blocked as string, { transport: graph.transport, logger: silent })).toEqual({ status: "skipped", reason: "opted_out" });

    await run((await deliver(textMessage(learner.phone, "START"))).id, graph);
    const allowed = await queueProactiveWhatsApp(learner.userId, { spec: { kind: "text", text: "Reminder" } });
    expect(await sendQueuedMessage(allowed as string, { transport: graph.transport, logger: silent })).toMatchObject({ status: "sent" });
  });
});

describe("delivery receipts", () => {
  it("moves outbound rows forward only and records the pricing category", async () => {
    const graph = fakeGraph();
    const phone = uniquePhone();
    const inbound = await deliver(textMessage(phone, "help"));
    await run(inbound.id, graph);
    const row = (await repliesTo(inbound.id))[0];
    if (!row?.externalMessageId) throw new Error("reply not sent");
    const receipt = (status: string, offset: number) => ({
      id: row.externalMessageId,
      status,
      timestamp: String(Math.floor(Date.now() / 1000) + offset),
      recipient_id: phone.slice(1),
      pricing: { billable: false, category: "service" },
    });
    await handleWebhookPost(post(webhookBody([], [receipt("read", 2), receipt("delivered", 1)])), { config: CONFIG, logger: silent });
    expect(await db.channelMessage.findUniqueOrThrow({ where: { id: row.id } })).toMatchObject({ status: "READ", pricingCategory: "service", readAt: expect.any(Date) });
  });
});

describe("retention purge", () => {
  it("nulls old STANDARD bodies and deletes idle unlinked identities", async () => {
    const old = new Date(Date.now() - 100 * 24 * 3_600_000);
    const identity = await db.channelIdentity.create({ data: { channel: "WHATSAPP", externalId: uniquePhone(), lastInboundAt: old, createdAt: old } });
    const message = await db.channelMessage.create({
      data: { channel: "WHATSAPP", direction: "INBOUND", status: "PROCESSED", externalMessageId: `wamid.${randomUUID()}`, body: "help", identityId: identity.id, createdAt: old },
    });
    const result = await purgeWhatsAppData();
    expect(result.bodiesPurged).toBeGreaterThanOrEqual(1);
    expect(await db.channelIdentity.findUnique({ where: { id: identity.id } })).toBeNull();
    expect(await db.channelMessage.findUniqueOrThrow({ where: { id: message.id } })).toMatchObject({ body: null, identityId: null, bodyPurgedAt: expect.any(Date) });
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Switched off (features.whatsapp = false, the default)
// ---------------------------------------------------------------------------------------------------------------------

describe("while the channel is switched off", () => {
  it("processes nothing, sends nothing (no Graph API call) and refuses new links", async () => {
    const graph = fakeGraph();
    const learner = await linkedLearner({ ...UNLIMITED_LEARNING_FEATURES }, { reminders: true });
    const inbound = await deliver(textMessage(learner.phone, "HELP"));
    const queued = await queueProactiveWhatsApp(learner.userId, { spec: { kind: "text", text: "Reminder" } });
    flags.whatsapp = false;

    const processed = await runWhatsAppProcessJob({ messageId: inbound.id }, { attempt: 1, maxAttempts: 3, logger: silent });
    expect(processed).toEqual({ status: "noop", command: null, replies: 0 });
    expect(await repliesTo(inbound.id)).toEqual([]);

    expect(await sendQueuedMessage(queued as string, { transport: graph.transport, logger: silent })).toEqual({ status: "skipped", reason: "switched_off" });
    expect(graph.calls).toHaveLength(0);
    expect(await db.channelMessage.findUniqueOrThrow({ where: { id: queued as string } })).toMatchObject({ status: "FAILED", error: "WhatsApp is switched off" });

    const refused = await requestWhatsAppLinkCode({ userId: learner.userId, roles: ["STUDENT"] }, { phone: uniquePhone() }, testMeta()).catch((error: unknown) => error);
    expect(isAppError(refused) && refused.code).toBe("NOT_FOUND");
  });
});
