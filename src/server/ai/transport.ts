import Anthropic from "@anthropic-ai/sdk";
import { AppError, isAppError } from "@/server/lib/errors";
import type { Logger } from "@/server/lib/logger";
import type { WireRequest } from "./request";

/**
 * The only seam between the AI gateway and the network (ARCHITECTURE §6.1 rule 1). The gateway depends on this
 * interface; production uses {@link createSdkTransport} (Anthropic TypeScript SDK), tests inject a fake (no network,
 * no API key).
 */

/**
 * The slice of an SDK `Message` / `BetaMessage` the gateway reads. Both SDK response types are assignable to it, so
 * the real transport returns SDK objects unchanged and fakes can build minimal literals.
 */
export interface TransportMessage {
  /** Model that produced the returned message (the fallback model when a server-side fallback served it). */
  model: string;
  content: ReadonlyArray<{ type: string; text?: string }>;
  stop_reason: string | null;
  stop_details?: { category?: string | null } | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_read_input_tokens?: number | null;
    cache_creation_input_tokens?: number | null;
    /** Per-attempt usage (beta): the billing source of truth when server-side fallbacks ran. */
    iterations?: ReadonlyArray<{
      type: string;
      model?: string | null;
      input_tokens?: number;
      output_tokens?: number;
      cache_read_input_tokens?: number | null;
      cache_creation_input_tokens?: number | null;
    }> | null;
  };
}

export interface TransportCallOptions {
  signal?: AbortSignal | undefined;
  timeoutMs?: number | undefined;
}

export interface TransportStreamOptions extends TransportCallOptions {
  /** Each text delta, in order. */
  onText: (delta: string) => void;
  /**
   * A server-side refusal fallback took over mid-stream: text streamed so far came from the declining model and must
   * be discarded by the consumer (the fallback model starts over).
   */
  onRestart?: (() => void) | undefined;
}

export interface TransportStreamResult {
  message: TransportMessage;
  /** The caller aborted (client disconnect); `message` is the partial snapshot (usage may be incomplete). */
  aborted: boolean;
}

export interface TransportParseResult {
  message: TransportMessage;
  /** The structured output parsed with the request's output format, or null when absent/unparseable. */
  parsed: unknown;
  /** Why `parsed` is null (never contains model output). */
  parseError: string | null;
}

export interface AnthropicTransport {
  create(request: WireRequest, options?: TransportCallOptions): Promise<TransportMessage>;
  stream(request: WireRequest, options: TransportStreamOptions): Promise<TransportStreamResult>;
  /**
   * Structured output call: `request.params.output_config.format` comes from the SDK zod helper. Unlike the SDK's
   * `messages.parse()` (which throws on invalid JSON and discards the message), this never throws for a bad output,
   * so the call is still metered and the caller decides (e.g. AI marking -> NEEDS_REVIEW).
   */
  parse(request: WireRequest, options?: TransportCallOptions): Promise<TransportParseResult>;
}

// ---------------------------------------------------------------------------------------------------------------
// Response helpers (pure)
// ---------------------------------------------------------------------------------------------------------------

/**
 * Text of the final answer: text blocks AFTER the last `fallback` block (text before a fallback boundary came from a
 * model that declined mid-stream and is discarded), concatenated.
 */
export function finalText(message: TransportMessage): string {
  let start = 0;
  message.content.forEach((block, index) => {
    if (block.type === "fallback") start = index + 1;
  });
  return message.content
    .slice(start)
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text)
    .join("");
}

/** True when a server-side refusal fallback served (part of) this message. */
export function servedByFallback(message: TransportMessage): boolean {
  return (
    message.content.some((block) => block.type === "fallback") ||
    (message.usage.iterations ?? []).some((entry) => entry.type === "fallback_message")
  );
}

type FormatWithParse = { parse: (content: string) => unknown };

function hasParse(format: unknown): format is FormatWithParse {
  return typeof format === "object" && format !== null && typeof (format as { parse?: unknown }).parse === "function";
}

/**
 * Applies the request's auto-parseable output format (SDK zod helper) to the response text without throwing.
 * A refusal or truncated response is reported as unparsed; the caller checks `stop_reason` first anyway.
 */
export function parseStructured(request: WireRequest, message: TransportMessage): TransportParseResult {
  if (message.stop_reason === "refusal") return { message, parsed: null, parseError: "refusal" };
  if (message.stop_reason === "max_tokens" || message.stop_reason === "model_context_window_exceeded") {
    return { message, parsed: null, parseError: "truncated" };
  }
  const format = request.params.output_config?.format;
  const text = finalText(message);
  if (text.trim().length === 0) return { message, parsed: null, parseError: "empty output" };
  try {
    return { message, parsed: hasParse(format) ? format.parse(text) : JSON.parse(text), parseError: null };
  } catch {
    // The SDK error message can quote the model output; keep it out of logs and results.
    return { message, parsed: null, parseError: "output did not match the schema" };
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Error mapping
// ---------------------------------------------------------------------------------------------------------------

function retryAfterSeconds(headers: Headers | undefined): number | undefined {
  const raw = headers?.get("retry-after");
  if (!raw) return undefined;
  const seconds = Number(raw);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : undefined;
}

/**
 * Maps provider errors to client-safe {@link AppError}s, most specific class first. Provider messages never reach
 * users; diagnostics (status, error type, request id) go to `details`, which only the logger sees.
 */
export function mapProviderError(error: unknown, log?: Logger): unknown {
  if (isAppError(error)) return error;
  if (error instanceof Anthropic.APIUserAbortError) {
    return new AppError("BAD_REQUEST", "The AI request was cancelled.", { cause: error });
  }
  if (error instanceof Anthropic.RateLimitError) {
    const retry = retryAfterSeconds(error.headers);
    return new AppError("AI_UNAVAILABLE", "The AI tutor is busy right now. Please try again in a minute.", {
      ...(retry === undefined ? {} : { retryAfterSeconds: retry }),
      details: { status: 429, requestId: error.requestID ?? null },
      cause: error,
    });
  }
  if (error instanceof Anthropic.APIConnectionError) {
    return new AppError("AI_UNAVAILABLE", "We couldn't reach the AI service. Please try again.", {
      details: { timeout: error instanceof Anthropic.APIConnectionTimeoutError },
      cause: error,
    });
  }
  if (error instanceof Anthropic.BadRequestError) {
    log?.error("AI provider rejected the request", { status: 400, errorType: error.type, requestId: error.requestID });
    return new AppError("BAD_REQUEST", "The AI couldn't process this request. Try rephrasing or shortening it.", {
      details: { status: 400, errorType: error.type, requestId: error.requestID ?? null },
      cause: error,
    });
  }
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
    log?.error("AI provider rejected the credentials; check ANTHROPIC_API_KEY", { status: error.status });
    return new AppError("AI_UNAVAILABLE", undefined, { details: { status: error.status }, cause: error });
  }
  if (error instanceof Anthropic.APIError) {
    return new AppError("AI_UNAVAILABLE", undefined, {
      details: { status: error.status ?? null, errorType: error.type, requestId: error.requestID ?? null },
      cause: error,
    });
  }
  return error;
}

// ---------------------------------------------------------------------------------------------------------------
// SDK-backed transport
// ---------------------------------------------------------------------------------------------------------------

function requestOptions(options: TransportCallOptions | undefined): { signal?: AbortSignal; timeout?: number } {
  return {
    ...(options?.signal ? { signal: options.signal } : {}),
    ...(options?.timeoutMs ? { timeout: options.timeoutMs } : {}),
  };
}

/** Minimal message for an abort that happened before `message_start` arrived. */
function emptyMessage(model: string): TransportMessage {
  return { model, content: [], stop_reason: null, usage: { input_tokens: 0, output_tokens: 0 } };
}

/** Structural view of the SDK `MessageStream` / `BetaMessageStream` (both satisfy it). */
interface SdkStreamLike extends AsyncIterable<unknown> {
  finalMessage(): Promise<TransportMessage>;
  readonly currentMessage: TransportMessage | undefined;
  readonly aborted: boolean;
}

type EventView = { type?: unknown; delta?: { type?: unknown; text?: unknown }; content_block?: { type?: unknown } };

/** Text of a `content_block_delta` / `text_delta` event, else null. */
export function textDeltaOf(event: unknown): string | null {
  if (typeof event !== "object" || event === null) return null;
  const view = event as EventView;
  if (view.type !== "content_block_delta" || view.delta?.type !== "text_delta") return null;
  return typeof view.delta.text === "string" ? view.delta.text : null;
}

/** True for the `content_block_start` of a server-side `fallback` block (a fallback model takes over). */
export function isFallbackStart(event: unknown): boolean {
  if (typeof event !== "object" || event === null) return false;
  const view = event as EventView;
  return view.type === "content_block_start" && view.content_block?.type === "fallback";
}

async function consumeStream(
  stream: SdkStreamLike,
  model: string,
  options: TransportStreamOptions,
): Promise<TransportStreamResult> {
  try {
    for await (const event of stream) {
      const text = textDeltaOf(event);
      if (text) options.onText(text);
      else if (isFallbackStart(event)) options.onRestart?.();
    }
    return { message: await stream.finalMessage(), aborted: false };
  } catch (error) {
    if (error instanceof Anthropic.APIUserAbortError || stream.aborted || options.signal?.aborted) {
      return { message: stream.currentMessage ?? emptyMessage(model), aborted: true };
    }
    throw error;
  }
}

/**
 * Production transport over the Anthropic SDK. Haiku-family requests use `client.messages`; Sonnet 5.5 / Opus 5.5
 * use `client.beta.messages` (server-side refusal fallback). The SDK retries 429/5xx/connection errors twice.
 */
export function createSdkTransport(client: Anthropic): AnthropicTransport {
  const create = async (request: WireRequest, options?: TransportCallOptions): Promise<TransportMessage> => {
    const opts = requestOptions(options);
    if (request.surface === "beta") return client.beta.messages.create(request.params, opts);
    return client.messages.create(request.params, opts);
  };

  return {
    create,
    async stream(request, options) {
      const opts = requestOptions(options);
      const stream: SdkStreamLike =
        request.surface === "beta"
          ? client.beta.messages.stream(request.params, opts)
          : client.messages.stream(request.params, opts);
      return consumeStream(stream, request.params.model, options);
    },
    async parse(request, options) {
      const message = await create(request, options);
      return parseStructured(request, message);
    },
  };
}
