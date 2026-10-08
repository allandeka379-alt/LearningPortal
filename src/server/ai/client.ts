import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { getEnv, type ServerEnv } from "@/server/lib/env";
import { createSdkTransport, type AnthropicTransport } from "./transport";

/**
 * The single place that constructs the Anthropic SDK client (ARCHITECTURE §6.1, §6.8). Routes never import the SDK.
 *
 * The key is checked at CALL time: without `ANTHROPIC_API_KEY` this returns null and the gateway answers every call
 * with AppError AI_UNAVAILABLE "AI is not configured" (never canned or fabricated output). The client is created
 * lazily on first use and re-created if the key changes (key rotation in tests / long-lived workers).
 */

let cached: { apiKey: string; transport: AnthropicTransport } | null = null;

export function getAnthropicTransport(env: Pick<ServerEnv, "ANTHROPIC_API_KEY"> = getEnv()): AnthropicTransport | null {
  const apiKey = env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) return null;
  if (cached?.apiKey !== apiKey) {
    // The key is passed explicitly so ambient credentials (auth tokens, CLI profiles) are never picked up on servers.
    cached = { apiKey, transport: createSdkTransport(new Anthropic({ apiKey, maxRetries: 2 })) };
  }
  return cached.transport;
}

/** Drops the cached client (tests). */
export function resetAnthropicTransport(): void {
  cached = null;
}
