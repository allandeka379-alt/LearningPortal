import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { createAiGateway, type AiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG } from "@/server/ai/config";
import { DbUsageMeter } from "@/server/ai/meter-db";
import { FakeTransport } from "@/server/ai/testing/fake-transport";
import { loadActor } from "@/server/auth/actor";
import { getEntitlements } from "@/server/billing/entitlements";
import { aiMessagesToday } from "@/server/billing/usage";
import { RATE_LIMIT_PRESETS, rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { createEnrollment, createLearner, createLearningSetup, UNLIMITED_LEARNING_FEATURES, type LearningSetup } from "../../../tests/factories/index";
import { classifyWhatsAppIntent, explainTopic } from "./explain";

/**
 * AI-08 regression: the FAST-tier WhatsApp intent classifier reserves no plan allowance, so it must stop once the
 * student's daily AI allowance is used up, and its own calls are capped per day (no unbounded model spend).
 */

let setup: LearningSetup;

beforeAll(async () => {
  setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, gradeScheme: false });
});

function gatewayWith(transport: FakeTransport): AiGateway {
  const config = structuredClone(DEFAULT_AI_CONFIG);
  config.budget.dailyCostCeilingMicros = null;
  return createAiGateway({ transport, config, meter: new DbUsageMeter() });
}

async function whatsappActor(features: Record<string, unknown>) {
  const learner = await createLearner({ features: { ...UNLIMITED_LEARNING_FEATURES, aiTutor: true, aiMaxModelTier: "STANDARD", ...features } });
  await createEnrollment(learner.userId, setup);
  const actor = await loadActor(learner.userId, { channel: "whatsapp" });
  if (!actor) throw new Error("actor missing");
  return actor;
}

describe("classifyWhatsAppIntent (AI-08)", () => {
  it("makes no model call once the student's daily AI allowance is used up", async () => {
    const actor = await whatsappActor({ aiMessagesPerDay: 1 });
    const transport = new FakeTransport().enqueue({ text: '{"intent":"STREAK","topic":null}' });
    transport.defaultReply = { text: "Osmosis is the movement of water through a membrane. What moves?" };
    const gateway = gatewayWith(transport);

    // With allowance left the ambiguous message is classified on the FAST tier.
    expect(await classifyWhatsAppIntent(actor, "how have I been doing lately", { gateway })).toEqual({ intent: "STREAK", topic: null });
    expect(transport.calls).toHaveLength(1);

    // Explanations use the day's allowance up...
    const limit = (await getEntitlements(actor.userId)).entitlements.aiMessagesPerDay;
    if (limit === null || limit > 5) throw new Error(`fixture expects a small daily allowance, got ${String(limit)}`);
    for (let i = 0; i < limit; i += 1) {
      const explained = await explainTopic(actor, `osmosis ${i}`, { gateway, clientMessageId: `wa-${randomUUID()}`, links: { pricing: "http://localhost:3000/pricing" } });
      expect(explained).toMatchObject({ kind: "ai" });
    }
    expect(await aiMessagesToday(actor.userId, actor.timeZone)).toBe(limit);
    const calls = transport.calls.length;
    expect(calls).toBe(1 + limit);

    // ...after which free text falls back to the HELP menu without calling the model.
    for (let i = 0; i < 3; i += 1) {
      expect(await classifyWhatsAppIntent(actor, "tell me something interesting please", { gateway })).toEqual({ intent: "HELP", topic: null });
    }
    expect(transport.calls).toHaveLength(calls);
  });

  it("caps classifier calls per student per day even while the allowance lasts", async () => {
    const actor = await whatsappActor({ aiMessagesPerDay: 50 });
    const transport = new FakeTransport();
    transport.defaultReply = { text: '{"intent":"QUESTION","topic":null}' };
    const gateway = gatewayWith(transport);
    // Use up today's classifier budget (the per-minute limit would stop a real burst first).
    for (let i = 0; i < RATE_LIMIT_PRESETS.whatsappIntentDaily.limit; i += 1) await rateLimit(rateLimits.whatsappIntentDaily(actor.userId));
    expect(await classifyWhatsAppIntent(actor, "give me something to practise", { gateway })).toEqual({ intent: "HELP", topic: null });
    expect(transport.calls).toHaveLength(0);
  });
});
