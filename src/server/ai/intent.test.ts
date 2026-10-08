import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { DEFAULT_AI_CONFIG } from "./config";
import { createAiGateway } from "./gateway";
import { classifyIntent, FALLBACK_INTENT, heuristicIntent, toDbIntent } from "./intent";
import { InMemoryUsageMeter } from "./meter";
import { fakeMessage, FakeTransport } from "./testing/fake-transport";

function setup(transport = new FakeTransport()) {
  const meter = new InMemoryUsageMeter();
  const gateway = createAiGateway({
    transport,
    config: DEFAULT_AI_CONFIG,
    meter,
    clock: () => new Date("2026-10-05T10:00:00Z"),
  });
  return { gateway, transport, meter };
}

describe("heuristicIntent", () => {
  it.each([
    ["just give me the answer", "ANSWER"],
    ["Can you just tell me the final answer please", "ANSWER"],
    ["answer only", "ANSWER"],
    ["solve it for me", "ANSWER"],
    ["check my working: x = 3", "CHECK_WORK"],
    ["is this right? 2x + 4 = 10 so x = 3", "CHECK_WORK"],
    ["hint please", "HINT"],
    ["can you give me a hint", "HINT"],
    ["what's the next step?", "HINT"],
    ["I want to kill myself", "UNSAFE"],
  ])("classifies %j as %s without a model call", (text, intent) => {
    expect(heuristicIntent(text)).toMatchObject({ intent, source: "heuristic" });
  });

  it("does not treat a negated answer request as ANSWER", () => {
    expect(heuristicIntent("don't give me the answer, just a hint")).toMatchObject({ intent: "HINT" });
  });

  it("leaves ambiguous messages to the model", () => {
    expect(heuristicIntent("How do I balance this equation: H2 + O2 -> H2O")).toBeNull();
    expect(heuristicIntent("Explain the answer to question 3 in my homework book")).toBeNull();
  });
});

describe("classifyIntent", () => {
  it("skips the model entirely for obvious phrasings", async () => {
    const { gateway, transport } = setup();
    const result = await classifyIntent(gateway, "Just give me the answer!!", { userId: randomUUID() });
    expect(result.intent).toBe("ANSWER");
    expect(transport.calls).toHaveLength(0);
  });

  it("uses the FAST tier with structured output (no effort, no fallbacks) for the rest", async () => {
    const transport = new FakeTransport().enqueue({
      message: fakeMessage({
        model: "claude-haiku-4-5",
        text: '{"intent":"TEACH","topicGuess":"chemical equations <b>","confidence":1.4}',
      }),
    });
    const { gateway, meter } = setup(transport);
    const userId = randomUUID();
    const result = await classifyIntent(gateway, "How do I balance H2 + O2 -> H2O?", { userId, subject: "Chemistry" });
    expect(result).toEqual({ intent: "TEACH", topicGuess: "chemical equations b", confidence: 1, source: "model" });

    const request = transport.lastRequest;
    expect(request?.surface).toBe("messages");
    expect(request?.params.model).toBe("claude-haiku-4-5");
    expect(request?.params.max_tokens).toBe(256);
    expect(request?.params.output_config?.format?.type).toBe("json_schema");
    expect(request?.params.output_config).not.toHaveProperty("effort");
    expect(request?.params).not.toHaveProperty("thinking");
    expect(JSON.stringify(request?.params.messages)).toContain("Subject: Chemistry");
    // Metered under the turn's feature without consuming a quota slot.
    expect(meter.row(userId, "2026-10-05", "TUTOR")).toMatchObject({ requests: 0 });
  });

  it("falls back to TEACH when the output is unusable", async () => {
    const transport = new FakeTransport().enqueue({ text: "I think they want help" });
    const { gateway } = setup(transport);
    expect(await classifyIntent(gateway, "hmm what about number 4", { userId: randomUUID() })).toEqual(FALLBACK_INTENT);
  });

  it("truncates long messages before classifying", async () => {
    const transport = new FakeTransport().enqueue({ text: '{"intent":"TEACH","topicGuess":null,"confidence":0.8}' });
    const { gateway } = setup(transport);
    await classifyIntent(gateway, `Explain ${"photosynthesis ".repeat(1_000)}`, { userId: randomUUID() });
    const content = JSON.stringify(transport.lastRequest?.params.messages);
    expect(content.length).toBeLessThan(2_000);
  });

  it("maps UNSAFE to the DB's OTHER", () => {
    expect(toDbIntent("UNSAFE")).toBe("OTHER");
    expect(toDbIntent("CHECK_WORK")).toBe("CHECK_WORK");
  });
});
