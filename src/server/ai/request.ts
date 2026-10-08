import type Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { z } from "zod";
import { modelFamily, SERVER_SIDE_FALLBACK_BETA, type Effort, type ModelFamily } from "./models";

/**
 * Request builder (ARCHITECTURE §6.3 step 8 "assemble", step 9 "call"). Pure: turns a routed call into the exact
 * Messages API parameters for the model family. All family rules live in `models.ts`; this file applies them:
 *
 * - `thinking` is never sent (Haiku: off by default; Sonnet 5.5: adaptive by default; Opus 5.5: cannot be disabled
 *   and `budget_tokens` is rejected). Depth is controlled with `output_config.effort` where supported.
 * - Sonnet 5.5 / Opus 5.5 go through the beta namespace with `fallbacks: "default"` (server-side refusal fallback).
 * - No assistant prefill: the last message is always the student's turn.
 * - JSON output uses structured outputs (`output_config.format` from the SDK's zod helpers), never forced tool use.
 *
 * Prompt-cache layout (prefix match: tools -> system -> messages):
 *   system[0..]  stable blocks (policy prompt, then the per-conversation student context), each `cache_control`
 *   messages     history; on multi-turn calls the newest student text block carries a rolling `cache_control`
 *                so the next turn reads system + history from cache
 *   first turn   [reference?] [...]: untrusted reference material (a teacher-written question) as its own text block
 *                at the start of the first user turn, never in the system prompt (AI-03)
 *   last turn    [image?] [student text] [<platform_guidance> volatile block, never cached]
 * The volatile per-turn guidance sits after every breakpoint, so changing it never invalidates the cached prefix.
 */

export type MessagesParams = Anthropic.MessageCreateParamsNonStreaming;
export type BetaMessagesParams = Anthropic.Beta.Messages.MessageCreateParamsNonStreaming;

/** Parameters for exactly one SDK surface. Streaming reuses the same params (`stream()` sets `stream: true`). */
export type WireRequest =
  | { surface: "messages"; params: MessagesParams }
  | { surface: "beta"; params: BetaMessagesParams };

export const IMAGE_MEDIA_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;
export type ImageMediaType = (typeof IMAGE_MEDIA_TYPES)[number];

export interface ChatMessageInput {
  role: "user" | "assistant";
  content: string;
}

export interface ImageInput {
  mediaType: ImageMediaType;
  /** Base64 without a `data:` prefix or line breaks. */
  data: string;
}

export interface SystemPromptInput {
  /** Byte-stable blocks, most stable first (policy prompt, then student context). Each gets a cache breakpoint. */
  stable: readonly string[];
  /** Per-turn guidance (mode, hint level, reveal rules); placed after every breakpoint. */
  volatile?: string | undefined;
}

export interface BuildRequestInput {
  model: string;
  maxTokens: number;
  /** Configured effort (route or tier); `null` uses the family default. Ignored where unsupported. */
  effort: Effort | null;
  system: SystemPromptInput;
  messages: readonly ChatMessageInput[];
  /** Attached to the final user message, before its text. */
  images?: readonly ImageInput[] | undefined;
  /**
   * Untrusted reference material written by someone other than the student or the platform (the `<question_context>`
   * of a teacher's question): its own text block at the start of the FIRST user message. Never part of the system
   * prompt, so it carries no system authority.
   */
  reference?: string | undefined;
  /** Structured-output schema (top-level object). */
  outputSchema?: z.ZodType | undefined;
}

/** Tag that wraps platform-written per-turn guidance inside the final user turn (see policy.ts). */
export const PLATFORM_GUIDANCE_TAG = "platform_guidance";

/** At most this many system blocks get their own breakpoint (the API allows 4 per request; 1 is kept for history). */
const MAX_SYSTEM_BREAKPOINTS = 2;

const EPHEMERAL = { type: "ephemeral" } as const;

type TextPart = { type: "text"; text: string; cache_control?: typeof EPHEMERAL };
type ImagePart = { type: "image"; source: { type: "base64"; media_type: ImageMediaType; data: string } };
type MessagePart = TextPart | ImagePart;
type BuiltMessage = { role: "user" | "assistant"; content: string | MessagePart[] };

/**
 * Neutralises anything in student-authored text that imitates the platform guidance wrapper, so a student cannot
 * smuggle "platform" instructions into their own message (prompt injection).
 */
export function neutralizeGuidanceTags(text: string): string {
  return text.replace(/<\s*\/?\s*platform[_\s-]*guidance/gi, (match) => match.replace("<", "(").replace(/[_\s-]+/g, " "));
}

function guidanceBlock(volatile: string): TextPart {
  return { type: "text", text: `<${PLATFORM_GUIDANCE_TAG}>\n${volatile.trim()}\n</${PLATFORM_GUIDANCE_TAG}>` };
}

function buildSystem(stable: readonly string[]): TextPart[] {
  const blocks = stable.filter((text) => text.trim().length > 0);
  const firstCached = Math.max(0, blocks.length - MAX_SYSTEM_BREAKPOINTS);
  return blocks.map((text, index) =>
    index >= firstCached ? { type: "text", text, cache_control: EPHEMERAL } : { type: "text", text },
  );
}

function buildMessages(input: BuildRequestInput): BuiltMessage[] {
  const { messages } = input;
  const lastIndex = messages.length - 1;
  const multiTurn = messages.length >= 3;
  const reference = input.reference?.trim() ? neutralizeGuidanceTags(input.reference.trim()) : null;
  const referenceIndex = reference ? messages.findIndex((message) => message.role === "user") : -1;
  return messages.map((message, index): BuiltMessage => {
    const text = message.role === "user" ? neutralizeGuidanceTags(message.content) : message.content;
    const parts: MessagePart[] = [];
    if (index === referenceIndex && reference) parts.push({ type: "text", text: reference });
    if (index !== lastIndex) {
      if (parts.length === 0) return { role: message.role, content: text };
      parts.push({ type: "text", text });
      return { role: message.role, content: parts };
    }

    for (const image of input.images ?? []) {
      parts.push({ type: "image", source: { type: "base64", media_type: image.mediaType, data: image.data } });
    }
    parts.push(multiTurn ? { type: "text", text, cache_control: EPHEMERAL } : { type: "text", text });
    const volatile = input.system.volatile?.trim();
    if (volatile) parts.push(guidanceBlock(volatile));
    return { role: message.role, content: parts.length === 1 && !multiTurn ? text : parts };
  });
}

function effortFor(family: ModelFamily, configured: Effort | null): Effort | null {
  if (!family.supportsEffort) return null;
  return configured ?? family.defaultEffort;
}

/**
 * Builds the SDK parameters for one call. Throws on inputs the API would reject (no messages, assistant prefill).
 */
export function buildWireRequest(input: BuildRequestInput): WireRequest {
  if (input.messages.length === 0) throw new Error("buildWireRequest: at least one message is required");
  if (input.messages.at(-1)?.role !== "user") {
    throw new Error("buildWireRequest: the last message must be the user's (assistant prefill is not supported)");
  }
  const family = modelFamily(input.model);
  const effort = effortFor(family, input.effort);
  const system = buildSystem(input.system.stable);
  const messages = buildMessages(input);

  if (family.surface === "beta") {
    const params: BetaMessagesParams = {
      model: input.model,
      max_tokens: input.maxTokens,
      messages,
      ...(system.length > 0 ? { system } : {}),
    };
    if (family.supportsServerFallback) {
      params.betas = [SERVER_SIDE_FALLBACK_BETA];
      params.fallbacks = "default";
    }
    if (effort !== null || input.outputSchema) {
      params.output_config = {
        ...(effort !== null ? { effort } : {}),
        ...(input.outputSchema ? { format: betaZodOutputFormat(input.outputSchema) } : {}),
      };
    }
    return { surface: "beta", params };
  }

  const params: MessagesParams = {
    model: input.model,
    max_tokens: input.maxTokens,
    messages,
    ...(system.length > 0 ? { system } : {}),
  };
  if (effort !== null || input.outputSchema) {
    params.output_config = {
      ...(effort !== null ? { effort } : {}),
      ...(input.outputSchema ? { format: zodOutputFormat(input.outputSchema) } : {}),
    };
  }
  return { surface: "messages", params };
}

/** Decoded size of a base64 payload in bytes (no allocation). */
export function base64DecodedBytes(data: string): number {
  const length = data.length;
  if (length === 0) return 0;
  const padding = data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0;
  return Math.floor((length * 3) / 4) - padding;
}
