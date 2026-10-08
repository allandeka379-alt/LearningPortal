import type { TutorRequestMode, TutorStreamEvent } from "@/server/tutor/protocol";
import { NETWORK_ERROR_COPY } from "./labels";

/**
 * Browser side of the tutor stream: POSTs a message and reads the `text/event-stream` response with `fetch` (EventSource
 * cannot POST). No client data-fetching library; ~1 KB. Framing: `data: <json>\n\n` per event, `:` comment frames.
 */

/** A client-side failure the chat shows like a server `error` event (codes include the server's TutorErrorCode). */
export interface ClientErrorEvent {
  type: "error";
  code: string;
  message: string;
  upgradeHref?: string | undefined;
  retryAfterSeconds?: number | undefined;
}

export type ClientStreamEvent = Exclude<TutorStreamEvent, { type: "error" }> | ClientErrorEvent;

/** Splits buffered SSE text into complete events and the unfinished remainder. Malformed frames are skipped. */
export function parseSseBuffer(buffer: string): { events: ClientStreamEvent[]; rest: string } {
  const normalized = buffer.replace(/\r\n?/g, "\n");
  const frames = normalized.split("\n\n");
  const rest = frames.pop() ?? "";
  const events: ClientStreamEvent[] = [];
  for (const frame of frames) {
    const data = frame
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).replace(/^ /, ""))
      .join("\n");
    if (!data) continue;
    try {
      const parsed = JSON.parse(data) as { type?: unknown };
      if (typeof parsed === "object" && parsed !== null && typeof parsed.type === "string") events.push(parsed as ClientStreamEvent);
    } catch {
      // A malformed frame is ignored; the stream continues.
    }
  }
  return { events, rest };
}

export interface StreamRequest {
  url: string;
  body: { text: string; mode: TutorRequestMode; clientMessageId: string };
  signal: AbortSignal;
  onEvent: (event: ClientStreamEvent) => void;
  fetchImpl?: typeof fetch;
}

/** How the stream ended: a `done` / `error` event arrived, or it stopped without one (connection lost). */
export type StreamOutcome = "done" | "error" | "incomplete";

async function errorFromResponse(response: Response): Promise<ClientErrorEvent> {
  try {
    const payload = (await response.json()) as { error?: { code?: unknown; message?: unknown } };
    const code = typeof payload.error?.code === "string" ? payload.error.code : "INTERNAL";
    const message = typeof payload.error?.message === "string" ? payload.error.message : NETWORK_ERROR_COPY;
    if (code === "UNAUTHENTICATED") return { type: "error", code: "FORBIDDEN", message: "Your session has ended. Please sign in again." };
    return { type: "error", code, message };
  } catch {
    return { type: "error", code: "INTERNAL", message: NETWORK_ERROR_COPY };
  }
}

/**
 * Sends one message and forwards each event to `onEvent` as it arrives. Resolves with how the stream ended; rejects
 * only when the request itself fails (network down, or `signal` aborted by the "Stop" button).
 */
export async function streamTutorMessage(request: StreamRequest): Promise<StreamOutcome> {
  const response = await (request.fetchImpl ?? fetch)(request.url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "text/event-stream" },
    body: JSON.stringify(request.body),
    credentials: "same-origin",
    signal: request.signal,
  });
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !response.body || !contentType.includes("text/event-stream")) {
    request.onEvent(await errorFromResponse(response));
    return "error";
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let outcome: StreamOutcome = "incomplete";
  for (;;) {
    const { done, value } = await reader.read();
    buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
    const parsed = parseSseBuffer(done ? `${buffer}\n\n` : buffer);
    buffer = parsed.rest;
    for (const event of parsed.events) {
      if (event.type === "done") outcome = "done";
      else if (event.type === "error") outcome = "error";
      request.onEvent(event);
    }
    if (done) return outcome;
  }
}

/** Client-generated message id for retry idempotency (matches the server's `^[A-Za-z0-9_-]{8,64}$`). */
export function newClientMessageId(): string {
  const random = globalThis.crypto?.randomUUID?.();
  if (random) return random;
  return `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}
