import Anthropic from "@anthropic-ai/sdk";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { isAppError } from "@/server/lib/errors";
import { getAnthropicTransport, resetAnthropicTransport } from "./client";
import { buildWireRequest } from "./request";
import { fakeMessage } from "./testing/fake-transport";
import {
  finalText,
  isFallbackStart,
  mapProviderError,
  parseStructured,
  servedByFallback,
  textDeltaOf,
  type TransportMessage,
} from "./transport";

describe("response helpers", () => {
  it("joins text blocks and ignores thinking blocks", () => {
    const message = fakeMessage({
      content: [
        { type: "thinking" },
        { type: "text", text: "Hello " },
        { type: "text", text: "world" },
      ],
    });
    expect(finalText(message)).toBe("Hello world");
    expect(servedByFallback(message)).toBe(false);
  });

  it("discards text produced before a server-side fallback boundary", () => {
    const message = fakeMessage({
      content: [
        { type: "text", text: "partial from the declining model" },
        { type: "fallback" },
        { type: "text", text: "answer from the fallback model" },
      ],
    });
    expect(finalText(message)).toBe("answer from the fallback model");
    expect(servedByFallback(message)).toBe(true);
  });

  it("detects a fallback-served turn from usage.iterations (sticky turns carry no block)", () => {
    const message: TransportMessage = fakeMessage({
      usage: {
        input_tokens: 1,
        output_tokens: 1,
        iterations: [{ type: "fallback_message", model: "claude-sonnet-5", input_tokens: 1, output_tokens: 1 }],
      },
    });
    expect(servedByFallback(message)).toBe(true);
  });

  it("recognises text deltas and fallback starts in raw stream events", () => {
    expect(textDeltaOf({ type: "content_block_delta", delta: { type: "text_delta", text: "Hi" } })).toBe("Hi");
    expect(textDeltaOf({ type: "content_block_delta", delta: { type: "thinking_delta", thinking: "x" } })).toBeNull();
    expect(textDeltaOf({ type: "message_delta", delta: { stop_reason: "end_turn" } })).toBeNull();
    expect(isFallbackStart({ type: "content_block_start", content_block: { type: "fallback" } })).toBe(true);
    expect(isFallbackStart({ type: "content_block_start", content_block: { type: "text" } })).toBe(false);
  });
});

describe("parseStructured", () => {
  const schema = z.object({ answer: z.number() });
  const request = buildWireRequest({
    model: "claude-haiku-4-5",
    maxTokens: 100,
    effort: null,
    system: { stable: ["S"] },
    messages: [{ role: "user", content: "2+2" }],
    outputSchema: schema,
  });

  it("parses valid JSON through the SDK zod format", () => {
    const result = parseStructured(request, fakeMessage({ text: '{"answer":4}' }));
    expect(result.parsed).toEqual({ answer: 4 });
    expect(result.parseError).toBeNull();
  });

  it("never throws for invalid output and never echoes it", () => {
    const result = parseStructured(request, fakeMessage({ text: '{"answer":"four SECRET"}' }));
    expect(result.parsed).toBeNull();
    expect(result.parseError).not.toContain("SECRET");
    expect(parseStructured(request, fakeMessage({ text: "not json" })).parsed).toBeNull();
  });

  it("reports refusals and truncation as unparsed", () => {
    expect(parseStructured(request, fakeMessage({ stop_reason: "refusal", text: "{" })).parseError).toBe("refusal");
    expect(parseStructured(request, fakeMessage({ stop_reason: "max_tokens", text: "{" })).parseError).toBe("truncated");
  });
});

describe("mapProviderError", () => {
  it("maps rate limits to AI_UNAVAILABLE with Retry-After", () => {
    const error = new Anthropic.RateLimitError(429, undefined, "rate limited", new Headers({ "retry-after": "12" }));
    const mapped = mapProviderError(error);
    expect(isAppError(mapped) && mapped.code).toBe("AI_UNAVAILABLE");
    expect(isAppError(mapped) && mapped.retryAfterSeconds).toBe(12);
    expect(isAppError(mapped) && mapped.message).not.toContain("rate limited");
  });

  it("maps connection errors and timeouts to AI_UNAVAILABLE", () => {
    const timeout = mapProviderError(new Anthropic.APIConnectionTimeoutError());
    expect(isAppError(timeout) && timeout.code).toBe("AI_UNAVAILABLE");
    const connection = mapProviderError(new Anthropic.APIConnectionError({ message: "ECONNRESET" }));
    expect(isAppError(connection) && connection.code).toBe("AI_UNAVAILABLE");
  });

  it("maps a 400 to BAD_REQUEST with a safe message", () => {
    const error = new Anthropic.BadRequestError(400, undefined, "messages.0: prompt text here", new Headers());
    const mapped = mapProviderError(error);
    expect(isAppError(mapped) && mapped.code).toBe("BAD_REQUEST");
    expect(isAppError(mapped) && mapped.message).not.toContain("prompt text");
  });

  it("maps auth failures and other API errors to AI_UNAVAILABLE", () => {
    const auth = mapProviderError(new Anthropic.AuthenticationError(401, undefined, "bad key", new Headers()));
    expect(isAppError(auth) && auth.code).toBe("AI_UNAVAILABLE");
    const server = mapProviderError(new Anthropic.InternalServerError(529, undefined, "overloaded", new Headers()));
    expect(isAppError(server) && server.code).toBe("AI_UNAVAILABLE");
  });

  it("maps a user abort to BAD_REQUEST and passes unknown errors through", () => {
    const aborted = mapProviderError(new Anthropic.APIUserAbortError());
    expect(isAppError(aborted) && aborted.code).toBe("BAD_REQUEST");
    const plain = new Error("boom");
    expect(mapProviderError(plain)).toBe(plain);
  });
});

describe("getAnthropicTransport", () => {
  it("returns null without an API key (AI not configured) and constructs lazily with one", () => {
    resetAnthropicTransport();
    expect(getAnthropicTransport({ ANTHROPIC_API_KEY: undefined })).toBeNull();
    expect(getAnthropicTransport({ ANTHROPIC_API_KEY: "   " })).toBeNull();
    const transport = getAnthropicTransport({ ANTHROPIC_API_KEY: "sk-ant-test-not-real" });
    expect(transport).not.toBeNull();
    expect(getAnthropicTransport({ ANTHROPIC_API_KEY: "sk-ant-test-not-real" })).toBe(transport);
    resetAnthropicTransport();
  });
});
