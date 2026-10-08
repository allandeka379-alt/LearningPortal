import { randomUUID } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { AppError, isAppError } from "@/server/lib/errors";
import { createLogger } from "@/server/lib/logger";
import { DEFAULT_AI_CONFIG, type AiConfig } from "./config";
import {
  AI_NOT_CONFIGURED_MESSAGE,
  AI_SWITCHED_OFF_MESSAGE,
  capTier,
  createAiGateway,
  isAiNotConfigured,
  isAiOff,
  isAiSwitchedOff,
  meterMessage,
  type AiCallInput,
} from "./gateway";
import { InMemoryUsageMeter } from "./meter";
import { SERVER_SIDE_FALLBACK_BETA } from "./models";
import { InMemoryResponseCache } from "./response-cache";
import { fakeMessage, FakeTransport } from "./testing/fake-transport";

const NOW = new Date("2026-10-05T10:00:00Z");
const TODAY = "2026-10-05";

function testConfig(patch: (config: AiConfig) => void = () => undefined): AiConfig {
  const config = structuredClone(DEFAULT_AI_CONFIG);
  patch(config);
  return config;
}

function setup(options: { config?: AiConfig; transport?: FakeTransport | null; logLines?: string[] } = {}) {
  const transport = options.transport === undefined ? new FakeTransport() : options.transport;
  const meter = new InMemoryUsageMeter();
  const cache = new InMemoryResponseCache();
  const lines = options.logLines;
  const gateway = createAiGateway({
    transport,
    config: options.config ?? testConfig(),
    meter,
    responseCache: cache,
    clock: () => NOW,
    ...(lines ? { logger: createLogger({ level: "debug", format: "json", write: (line) => lines.push(line) }) } : {}),
  });
  return { gateway, transport: transport as FakeTransport, meter, cache };
}

function input(patch: Partial<AiCallInput> = {}): AiCallInput {
  return {
    route: "tutor",
    feature: "TUTOR",
    userId: randomUUID(),
    maxTier: "DEEP",
    system: { stable: ["POLICY"] },
    messages: [{ role: "user", content: "How do I factorise x^2 - 5x + 6?" }],
    ...patch,
  };
}

async function expectAppError(promise: Promise<unknown>, code: string): Promise<AppError> {
  const error = await promise.then(
    () => undefined,
    (caught: unknown) => caught,
  );
  expect(isAppError(error)).toBe(true);
  expect((error as AppError).code).toBe(code);
  return error as AppError;
}

describe("AI not configured", () => {
  it("fails with AI_UNAVAILABLE 'AI is not configured' and never answers", async () => {
    const { gateway } = setup({ transport: null });
    const error = await expectAppError(gateway.complete(input()), "AI_UNAVAILABLE");
    expect(error.message).toBe(AI_NOT_CONFIGURED_MESSAGE);
    expect(isAiNotConfigured(error)).toBe(true);
  });

  it("checks the key at call time through a transport provider", async () => {
    const meter = new InMemoryUsageMeter();
    const gateway = createAiGateway({ transport: () => null, config: testConfig(), meter, clock: () => NOW });
    const call = input({ quota: { dailyLimit: 5 } });
    await expectAppError(gateway.structured({ ...call, outputSchema: z.object({ a: z.string() }) }), "AI_UNAVAILABLE");
    // Nothing reserved for a call that could never run.
    expect(meter.rows.size).toBe(0);
  });
});

describe("platform feature flag features.ai (owner decision 2026-10-07)", () => {
  /** A meter that fails the test if the gateway touches it at all. */
  class UntouchableMeter extends InMemoryUsageMeter {
    touched = 0;
    override async getDailySpendMicros(...args: Parameters<InMemoryUsageMeter["getDailySpendMicros"]>) {
      this.touched += 1;
      return super.getDailySpendMicros(...args);
    }
    override async reserve(...args: Parameters<InMemoryUsageMeter["reserve"]>) {
      this.touched += 1;
      return super.reserve(...args);
    }
    override async record(...args: Parameters<InMemoryUsageMeter["record"]>) {
      this.touched += 1;
      return super.record(...args);
    }
  }

  function flagged(featureEnabled: () => boolean | Promise<boolean>) {
    const transport = new FakeTransport();
    const meter = new UntouchableMeter();
    let configReads = 0;
    const gateway = createAiGateway({
      featureEnabled,
      transport,
      config: async () => {
        configReads += 1;
        return testConfig();
      },
      meter,
      clock: () => NOW,
    });
    return { gateway, transport, meter, configReads: () => configReads };
  }

  it("refuses every call while the flag is off: before the transport, config, budget, quota or metering", async () => {
    const { gateway, transport, meter, configReads } = flagged(() => false);
    const call = input({ quota: { dailyLimit: 5 } });
    for (const attempt of [
      gateway.complete(call),
      gateway.stream({ ...call, onText: () => undefined }),
      gateway.structured({ ...call, outputSchema: z.object({ a: z.string() }) }),
      gateway.complete(input({ route: "marking", feature: "MARKING" })),
      gateway.complete(input({ route: "contentGeneration", feature: "CONTENT_GEN", priority: "admin" })),
    ]) {
      const error = await expectAppError(attempt, "AI_UNAVAILABLE");
      expect(error.message).toBe(AI_SWITCHED_OFF_MESSAGE);
      expect(error.details).toMatchObject({ reason: "feature_off" });
      expect(isAiSwitchedOff(error)).toBe(true);
      expect(isAiOff(error)).toBe(true);
      expect(isAiNotConfigured(error)).toBe(false);
    }
    expect(transport.calls).toHaveLength(0);
    expect(meter.touched).toBe(0);
    expect(meter.rows.size).toBe(0);
    expect(configReads()).toBe(0);
  });

  it("fails closed when the flag cannot be read", async () => {
    const { gateway, transport, meter } = flagged(() => Promise.reject(new Error("settings table unavailable")));
    const error = await expectAppError(gateway.complete(input({ quota: { dailyLimit: 5 } })), "AI_UNAVAILABLE");
    expect(isAiSwitchedOff(error)).toBe(true);
    expect(transport.calls).toHaveLength(0);
    expect(meter.touched).toBe(0);
  });

  it("checks the flag on every call (switching it on needs no restart) and then runs the normal pipeline", async () => {
    let on = false;
    const { gateway, transport } = flagged(() => on);
    await expectAppError(gateway.complete(input()), "AI_UNAVAILABLE");
    on = true;
    const result = await gateway.complete(input());
    expect(result.status).toBe("COMPLETE");
    expect(transport.calls).toHaveLength(1);
    on = false;
    await expectAppError(gateway.complete(input()), "AI_UNAVAILABLE");
    expect(transport.calls).toHaveLength(1);
  });

  it("comes before the API-key check (no key and switched off reads as switched off)", async () => {
    const gateway = createAiGateway({ featureEnabled: () => false, transport: null, config: testConfig(), meter: new InMemoryUsageMeter(), clock: () => NOW });
    const error = await expectAppError(gateway.complete(input()), "AI_UNAVAILABLE");
    expect(isAiSwitchedOff(error)).toBe(true);
  });
});

describe("request shaping per model family (through the gateway)", () => {
  it("routes FAST to Haiku with no effort, no thinking and no fallbacks", async () => {
    const { gateway, transport } = setup();
    await gateway.complete(input({ route: "intent" }));
    const request = transport.lastRequest;
    expect(request?.surface).toBe("messages");
    expect(request?.params.model).toBe("claude-haiku-4-5");
    expect(request?.params).not.toHaveProperty("thinking");
    expect(request?.params).not.toHaveProperty("output_config");
    expect(request?.params).not.toHaveProperty("fallbacks");
    expect(request?.params.max_tokens).toBe(256);
  });

  it("routes STANDARD to Sonnet 5.5 via the beta surface with fallbacks and effort low", async () => {
    const { gateway, transport } = setup();
    await gateway.complete(input({ route: "tutor" }));
    const request = transport.lastRequest;
    expect(request?.surface).toBe("beta");
    if (request?.surface !== "beta") return;
    expect(request.params.model).toBe("claude-sonnet-5-5");
    expect(request.params.betas).toEqual([SERVER_SIDE_FALLBACK_BETA]);
    expect(request.params.fallbacks).toBe("default");
    expect(request.params.output_config).toEqual({ effort: "low" });
    expect(request.params).not.toHaveProperty("thinking");
  });

  it("routes DEEP to Opus 5.5 with effort medium and never a thinking budget", async () => {
    const { gateway, transport } = setup();
    await gateway.complete(input({ route: "solverHard" }));
    const request = transport.lastRequest;
    expect(request?.params.model).toBe("claude-opus-5-5");
    expect(request?.params.output_config).toEqual({ effort: "medium" });
    expect(request?.params).not.toHaveProperty("thinking");
    expect(JSON.stringify(request?.params)).not.toContain("budget_tokens");
  });

  it("caps the route tier at the caller's entitlement (aiMaxModelTier)", async () => {
    const { gateway, transport } = setup();
    const result = await gateway.complete(input({ route: "solverHard", maxTier: "STANDARD" }));
    expect(transport.lastRequest?.params.model).toBe("claude-sonnet-5-5");
    expect(result.tier).toBe("STANDARD");
    expect(capTier("DEEP", "FAST")).toBe("FAST");
    expect(capTier("FAST", "DEEP")).toBe("FAST");
  });

  it("applies a per-route effort override (marking at medium on STANDARD)", async () => {
    const config = testConfig((c) => {
      c.routing.routes.marking = { tier: "STANDARD", maxTokens: 1024, effort: "medium", cacheable: false };
    });
    const { gateway, transport } = setup({ config });
    await gateway.complete(input({ route: "marking", feature: "MARKING" }));
    expect(transport.lastRequest?.params.output_config).toEqual({ effort: "medium" });
  });

  it("caches the stable system blocks and delivers volatile guidance after the breakpoints", async () => {
    const { gateway, transport } = setup();
    await gateway.complete(
      input({ system: { stable: ["POLICY", "<student_context>x</student_context>"], volatile: "Mode: HINT." } }),
    );
    const params = transport.lastRequest?.params;
    expect(params?.system).toEqual([
      { type: "text", text: "POLICY", cache_control: { type: "ephemeral" } },
      { type: "text", text: "<student_context>x</student_context>", cache_control: { type: "ephemeral" } },
    ]);
    expect(JSON.stringify(params?.messages.at(-1))).toContain("<platform_guidance>");
  });
});

describe("kill switch and budget", () => {
  it("refuses every call when ai.enabled is false (no reservation, no transport call)", async () => {
    const { gateway, transport, meter } = setup({ config: testConfig((c) => (c.enabled = false)) });
    await expectAppError(gateway.complete(input({ quota: { dailyLimit: 5 } })), "AI_UNAVAILABLE");
    expect(transport.calls).toHaveLength(0);
    expect(meter.rows.size).toBe(0);
  });

  it("honours per-feature switches", async () => {
    const { gateway, transport } = setup({ config: testConfig((c) => (c.features = { TUTOR: false })) });
    await expectAppError(gateway.complete(input({ feature: "TUTOR" })), "AI_UNAVAILABLE");
    await gateway.complete(input({ feature: "SOLVER", route: "solver" }));
    expect(transport.calls).toHaveLength(1);
  });

  it("pauses AI once today's platform spend reaches the ceiling, except admin work", async () => {
    const config = testConfig((c) => (c.budget.dailyCostCeilingMicros = 1_000_000));
    const { gateway, transport, meter } = setup({ config });
    meter.setSpend(TODAY, 999_999);
    await gateway.complete(input());
    meter.setSpend(TODAY, 1_000_000);
    const error = await expectAppError(gateway.complete(input({ quota: { dailyLimit: 5 } })), "AI_UNAVAILABLE");
    expect(error.details?.reason).toBe("budget");
    await gateway.complete(input({ route: "contentGeneration", feature: "CONTENT_GEN", priority: "admin" }));
    expect(transport.calls).toHaveLength(2);
  });
});

describe("quota reservation", () => {
  it("reserves against the plan limit, settles after the call and refuses beyond the limit", async () => {
    const { gateway, transport, meter } = setup();
    const userId = randomUUID();
    await gateway.complete(input({ userId, quota: { dailyLimit: 2 } }));
    await gateway.complete(input({ userId, quota: { dailyLimit: 2 } }));
    await expectAppError(gateway.complete(input({ userId, quota: { dailyLimit: 2 } })), "QUOTA_EXCEEDED");
    expect(transport.calls).toHaveLength(2);
    expect(meter.row(userId, TODAY, "TUTOR")).toMatchObject({ requests: 2, reservedRequests: 0 });
  });

  it("counts 'Think harder' as 2 and DEEP units separately", async () => {
    const { gateway, meter } = setup();
    const userId = randomUUID();
    await gateway.complete(input({ userId, route: "solverHard", quota: { dailyLimit: 3, cost: 2 } }));
    expect(meter.row(userId, TODAY, "TUTOR")).toMatchObject({ requests: 2, deepRequests: 2 });
    await expectAppError(gateway.complete(input({ userId, quota: { dailyLimit: 3, cost: 2 } })), "QUOTA_EXCEEDED");
  });

  it("releases the reservation when the provider call fails (nothing billed)", async () => {
    const transport = new FakeTransport().enqueue({
      error: new Anthropic.RateLimitError(429, undefined, "slow down", new Headers({ "retry-after": "30" })),
    });
    const { gateway, meter } = setup({ transport });
    const userId = randomUUID();
    const error = await expectAppError(gateway.complete(input({ userId, quota: { dailyLimit: 1 } })), "AI_UNAVAILABLE");
    expect(error.retryAfterSeconds).toBe(30);
    expect(meter.row(userId, TODAY, "TUTOR")).toMatchObject({ requests: 0, reservedRequests: 0, costMicros: 0 });
    // The slot is free again.
    await gateway.complete(input({ userId, quota: { dailyLimit: 1 } }));
    expect(meter.row(userId, TODAY, "TUTOR")).toMatchObject({ requests: 1, reservedRequests: 0 });
  });

  it("meters un-reserved sub-calls (tokens and cost) without counting a request", async () => {
    const { gateway, meter } = setup();
    const userId = randomUUID();
    const result = await gateway.complete(input({ userId, route: "intent" }));
    const row = meter.row(userId, TODAY, "TUTOR");
    expect(row).toMatchObject({ requests: 0, reservedRequests: 0, costMicros: result.costMicros });
    expect(result.costMicros).toBeGreaterThan(0);
  });
});

describe("input validation", () => {
  it("rejects a conversation that does not end with the student's turn (no prefill)", async () => {
    const { gateway, transport } = setup();
    const messages = [
      { role: "user" as const, content: "Q" },
      { role: "assistant" as const, content: "A" },
    ];
    await expectAppError(gateway.complete(input({ messages })), "BAD_REQUEST");
    expect(transport.calls).toHaveLength(0);
  });

  it("enforces the per-message character limit for student calls", async () => {
    const config = testConfig((c) => (c.limits.maxInputCharsPerMessage = 10));
    const { gateway, meter } = setup({ config });
    const userId = randomUUID();
    const messages = [{ role: "user" as const, content: "x".repeat(11) }];
    await expectAppError(gateway.complete(input({ userId, messages, quota: { dailyLimit: 5 } })), "VALIDATION");
    expect(meter.rows.size).toBe(0);
  });

  it("enforces the image count and size limits", async () => {
    const config = testConfig((c) => (c.limits.maxImageBytes = 4));
    const { gateway } = setup({ config });
    const small = { mediaType: "image/png" as const, data: "aGVs" };
    const large = { mediaType: "image/png" as const, data: "aGVsbG8=" };
    await expectAppError(gateway.complete(input({ images: [large] })), "VALIDATION");
    await expectAppError(gateway.complete(input({ images: [small, small] })), "VALIDATION");
    const ok = await gateway.complete(input({ route: "solver", feature: "SOLVER", images: [small] }));
    expect(ok.status).toBe("COMPLETE");
  });
});

describe("responses, refusals and metering", () => {
  it("computes cost from usage including cache reads/writes and records it", async () => {
    const transport = new FakeTransport().enqueue({
      message: fakeMessage({
        model: "claude-sonnet-5-5",
        text: "Let's start by finding two numbers...",
        usage: { input_tokens: 1000, output_tokens: 500, cache_read_input_tokens: 2000, cache_creation_input_tokens: 400 },
      }),
    });
    const { gateway, meter } = setup({ transport });
    const userId = randomUUID();
    const result = await gateway.complete(input({ userId, quota: { dailyLimit: null } }));
    expect(result).toMatchObject({
      status: "COMPLETE",
      text: "Let's start by finding two numbers...",
      usage: { inputTokens: 1000, outputTokens: 500, cacheReadTokens: 2000, cacheWriteTokens: 400 },
      costMicros: 2000 + 5000 + 400 + 1000,
      servedByFallback: false,
      cached: false,
    });
    expect(meter.row(userId, TODAY, "TUTOR")?.costMicros).toBe(8400);
    expect(await meter.getDailySpendMicros(TODAY)).toBe(8400);
  });

  it("handles a refusal: status REFUSED, partial text discarded, category kept, call metered", async () => {
    const transport = new FakeTransport().enqueue({
      message: fakeMessage({
        text: "partial text",
        stop_reason: "refusal",
        stop_details: { category: "cyber" },
      }),
    });
    const { gateway, meter } = setup({ transport });
    const userId = randomUUID();
    const result = await gateway.complete(input({ userId, quota: { dailyLimit: 3 } }));
    expect(result).toMatchObject({ status: "REFUSED", text: "", refusalCategory: "cyber", stopReason: "refusal" });
    expect(meter.row(userId, TODAY, "TUTOR")).toMatchObject({ requests: 1, reservedRequests: 0 });
    expect(result.costMicros).toBeGreaterThan(0);
  });

  it("marks max_tokens as TRUNCATED and keeps the text", async () => {
    const transport = new FakeTransport().enqueue({ message: fakeMessage({ text: "Step 1...", stop_reason: "max_tokens" }) });
    const { gateway } = setup({ transport });
    expect(await gateway.complete(input())).toMatchObject({ status: "TRUNCATED", text: "Step 1..." });
  });

  it("bills each attempt of a server-side fallback at its own model's price", async () => {
    const transport = new FakeTransport().enqueue({
      message: {
        model: "claude-sonnet-5",
        content: [
          { type: "text", text: "declined partial" },
          { type: "fallback" },
          { type: "text", text: "served by fallback" },
        ],
        stop_reason: "end_turn",
        usage: {
          input_tokens: 100,
          output_tokens: 50,
          iterations: [
            { type: "message", model: "claude-sonnet-5-5", input_tokens: 100, output_tokens: 20 },
            { type: "fallback_message", model: "claude-sonnet-5", input_tokens: 100, output_tokens: 50 },
          ],
        },
      },
    });
    const { gateway } = setup({ transport });
    const result = await gateway.complete(input());
    expect(result).toMatchObject({
      text: "served by fallback",
      servedByFallback: true,
      servedByModel: "claude-sonnet-5",
      model: "claude-sonnet-5-5",
      costMicros: 100 * 2 + 20 * 10 + (100 * 2 + 50 * 10),
      usage: { inputTokens: 200, outputTokens: 70, cacheReadTokens: 0, cacheWriteTokens: 0 },
    });
  });

  it("meterMessage falls back to top-level usage and flags unpriced models", () => {
    const metered = meterMessage(fakeMessage({ model: "claude-unknown-1" }), "claude-unknown-1", {});
    expect(metered.unpricedModels).toEqual(["claude-unknown-1"]);
    expect(metered.usage.inputTokens).toBe(100);
  });

  it("never logs prompt or answer text", async () => {
    const lines: string[] = [];
    const transport = new FakeTransport().enqueue({ text: "SECRET-ANSWER-456" });
    const { gateway } = setup({ transport, logLines: lines });
    await gateway.complete(
      input({
        system: { stable: ["SECRET-POLICY-789"], volatile: "SECRET-GUIDANCE" },
        messages: [{ role: "user", content: "SECRET-PROMPT-123" }],
      }),
    );
    expect(lines.length).toBeGreaterThan(0);
    const all = lines.join("\n");
    for (const secret of ["SECRET-ANSWER-456", "SECRET-POLICY-789", "SECRET-GUIDANCE", "SECRET-PROMPT-123"]) {
      expect(all).not.toContain(secret);
    }
    expect(all).toContain('"costMicros"');
  });
});

describe("response cache", () => {
  const cacheable = () =>
    testConfig((c) => {
      c.routing.routes.whatsapp = { tier: "FAST", maxTokens: 512, cacheable: true };
    });

  it("serves a repeated generic question from the cache without calling the model", async () => {
    const { gateway, transport, meter } = setup({ config: cacheable() });
    const userId = randomUUID();
    const ask = (content: string) =>
      gateway.complete(
        input({
          userId,
          route: "whatsapp",
          feature: "WHATSAPP",
          messages: [{ role: "user", content }],
          cacheKey: { level: "zimsec:o-level" },
          quota: { dailyLimit: 10 },
        }),
      );
    const first = await ask("What is photosynthesis?");
    expect(first.cached).toBe(false);
    const second = await ask("  what is   PHOTOSYNTHESIS ");
    expect(transport.calls).toHaveLength(1);
    expect(second).toMatchObject({ cached: true, text: first.text, costMicros: 0, status: "COMPLETE" });
    expect(second.cacheEntryId).toBeTruthy();
    // A cache hit still counts as a message (§6.3 step 6) and is recorded as a hit.
    expect(meter.row(userId, TODAY, "WHATSAPP")).toMatchObject({ requests: 2, cacheHits: 1, reservedRequests: 0 });
  });

  it("is never used with per-turn/student-specific content, other levels, or non-cacheable routes", async () => {
    const { gateway, transport } = setup({ config: cacheable() });
    const base = {
      route: "whatsapp",
      feature: "WHATSAPP" as const,
      messages: [{ role: "user" as const, content: "What is osmosis?" }],
      cacheKey: { level: "zimsec:o-level" },
    };
    await gateway.complete(input(base));
    await gateway.complete(input({ ...base, system: { stable: ["POLICY"], volatile: "Mode: HINT." } }));
    await gateway.complete(input({ ...base, cacheKey: { level: "cambridge:a-level" } }));
    await gateway.complete(input({ ...base, route: "tutor", feature: "TUTOR" }));
    await gateway.complete(input({ ...base, route: "tutor", feature: "TUTOR" }));
    expect(transport.calls).toHaveLength(5);
  });

  it("does not cache refusals or truncated answers", async () => {
    const transport = new FakeTransport().enqueue({ message: fakeMessage({ stop_reason: "max_tokens", text: "cut" }) });
    const { gateway, cache } = setup({ config: cacheable(), transport });
    await gateway.complete(
      input({ route: "whatsapp", feature: "WHATSAPP", cacheKey: { level: "zimsec:o-level" } }),
    );
    expect(cache.entries.size).toBe(0);
  });
});

describe("streaming", () => {
  it("forwards text deltas in order and returns the final message", async () => {
    const transport = new FakeTransport().enqueue({ text: "Hello there", chunks: ["Hel", "lo there"] });
    const { gateway } = setup({ transport });
    const deltas: string[] = [];
    const result = await gateway.stream({ ...input(), onText: (delta) => deltas.push(delta) });
    expect(deltas).toEqual(["Hel", "lo there"]);
    expect(result).toMatchObject({ status: "COMPLETE", text: "Hello there" });
  });

  it("meters a client abort as ABORTED with at least the streamed tokens", async () => {
    const transport = new FakeTransport().enqueue({
      text: "x".repeat(400),
      chunks: ["x".repeat(200), "x".repeat(200)],
      abortAfterChunks: 1,
    });
    const { gateway, meter } = setup({ transport });
    const userId = randomUUID();
    const result = await gateway.stream({ ...input({ userId, quota: { dailyLimit: 5 } }), onText: () => undefined });
    expect(result.status).toBe("ABORTED");
    expect(result.usage.outputTokens).toBeGreaterThanOrEqual(50);
    expect(meter.row(userId, TODAY, "TUTOR")).toMatchObject({ requests: 1, reservedRequests: 0 });
  });

  it("stops the stream (and still meters) when the consumer fails", async () => {
    const transport = new FakeTransport().enqueue({ text: "abc", chunks: ["a", "b", "c"] });
    const { gateway } = setup({ transport });
    let received = 0;
    const result = await gateway.stream({
      ...input(),
      onText: () => {
        received += 1;
        throw new Error("socket closed");
      },
    });
    expect(received).toBe(1);
    expect(result.status).toBe("ABORTED");
  });
});

describe("structured output", () => {
  const schema = z.object({ intent: z.enum(["TEACH", "ANSWER"]), confidence: z.number() });

  it("returns typed data for a valid output", async () => {
    const transport = new FakeTransport().enqueue({ text: '{"intent":"ANSWER","confidence":0.9}' });
    const { gateway } = setup({ transport });
    const result = await gateway.structured({ ...input({ route: "intent" }), outputSchema: schema });
    expect(result).toMatchObject({ ok: true, data: { intent: "ANSWER", confidence: 0.9 } });
    expect(transport.calls[0]?.kind).toBe("parse");
    expect(transport.lastRequest?.params.output_config?.format?.type).toBe("json_schema");
  });

  it("reports INVALID_OUTPUT, REFUSED and TRUNCATED without throwing, and meters each", async () => {
    const transport = new FakeTransport().enqueue(
      { text: '{"intent":"MAYBE","confidence":1}' },
      { message: fakeMessage({ stop_reason: "refusal", stop_details: { category: null }, text: "" }) },
      { message: fakeMessage({ stop_reason: "max_tokens", text: '{"intent":' }) },
    );
    const { gateway, meter } = setup({ transport });
    const userId = randomUUID();
    const call = { ...input({ userId, route: "intent" }), outputSchema: schema };
    expect(await gateway.structured(call)).toMatchObject({ ok: false, reason: "INVALID_OUTPUT" });
    expect(await gateway.structured(call)).toMatchObject({ ok: false, reason: "REFUSED" });
    expect(await gateway.structured(call)).toMatchObject({ ok: false, reason: "TRUNCATED" });
    expect(meter.row(userId, TODAY, "TUTOR")?.costMicros).toBeGreaterThan(0);
  });
});
