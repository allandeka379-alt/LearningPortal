import type { WireRequest } from "../request";
import {
  parseStructured,
  type AnthropicTransport,
  type TransportCallOptions,
  type TransportMessage,
  type TransportParseResult,
  type TransportStreamOptions,
  type TransportStreamResult,
} from "../transport";

/**
 * In-memory {@link AnthropicTransport} for tests: records every request and answers from a queue of scripted replies
 * (or a default). No network, no API key. Shared by this module's tests and later phases (tutor, solver, marking).
 */

export interface FakeReply {
  /** Response text (ignored when `message` is given). */
  text?: string;
  /** Full message override (usage, stop_reason, fallback blocks, iterations...). */
  message?: TransportMessage;
  /** Throw this instead of answering (e.g. `new Anthropic.RateLimitError(...)`). */
  error?: unknown;
  /** Streaming only: deliver the text in these chunks (default: one chunk). */
  chunks?: string[];
  /** Streaming only: stop after N chunks and report an abort (client disconnect). */
  abortAfterChunks?: number;
}

export interface RecordedCall {
  kind: "create" | "stream" | "parse";
  request: WireRequest;
  options: TransportCallOptions | undefined;
}

export function fakeMessage(overrides: Partial<TransportMessage> & { text?: string } = {}): TransportMessage {
  const { text = "OK", ...rest } = overrides;
  return {
    model: "claude-sonnet-5-5",
    content: [{ type: "text", text }],
    stop_reason: "end_turn",
    stop_details: null,
    usage: { input_tokens: 100, output_tokens: 50, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 },
    ...rest,
  };
}

export class FakeTransport implements AnthropicTransport {
  readonly calls: RecordedCall[] = [];
  private readonly replies: FakeReply[] = [];
  /** Used when the queue is empty. */
  defaultReply: FakeReply = { text: "OK" };

  /** Queue replies, answered in order. */
  enqueue(...replies: FakeReply[]): this {
    this.replies.push(...replies);
    return this;
  }

  get lastRequest(): WireRequest | undefined {
    return this.calls.at(-1)?.request;
  }

  private next(request: WireRequest): { reply: FakeReply; message: TransportMessage } {
    const reply = this.replies.shift() ?? this.defaultReply;
    if (reply.error !== undefined) throw reply.error;
    const message = reply.message ?? fakeMessage({ model: request.params.model, text: reply.text ?? "OK" });
    return { reply, message };
  }

  async create(request: WireRequest, options?: TransportCallOptions): Promise<TransportMessage> {
    this.calls.push({ kind: "create", request, options });
    return this.next(request).message;
  }

  async parse(request: WireRequest, options?: TransportCallOptions): Promise<TransportParseResult> {
    this.calls.push({ kind: "parse", request, options });
    return parseStructured(request, this.next(request).message);
  }

  async stream(request: WireRequest, options: TransportStreamOptions): Promise<TransportStreamResult> {
    this.calls.push({ kind: "stream", request, options });
    const { reply, message } = this.next(request);
    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("");
    const chunks = reply.chunks ?? [text];
    let delivered = 0;
    for (const chunk of chunks) {
      if (reply.abortAfterChunks !== undefined && delivered >= reply.abortAfterChunks) {
        return {
          message: { ...message, content: [], stop_reason: null, usage: { input_tokens: message.usage.input_tokens, output_tokens: 1 } },
          aborted: true,
        };
      }
      if (options.signal?.aborted) {
        return { message: { ...message, content: [], stop_reason: null, usage: { input_tokens: message.usage.input_tokens, output_tokens: 1 } }, aborted: true };
      }
      options.onText(chunk);
      delivered += 1;
    }
    if (options.signal?.aborted) {
      return { message: { ...message, stop_reason: null }, aborted: true };
    }
    return { message, aborted: false };
  }
}
