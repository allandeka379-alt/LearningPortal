import "server-only";
import type { TutorStreamEvent } from "./protocol";

/**
 * Server-Sent Events framing for the tutor stream (ARCHITECTURE §6.3 step 9). One event per frame: `data: <json>\n\n`
 * (JSON.stringify escapes newlines, so a frame is always a single `data:` line). Comment frames (`: ...`) open the
 * stream immediately and keep idle proxies from closing it while the model thinks.
 */

export const SSE_CONTENT_TYPE = "text/event-stream; charset=utf-8";
export const SSE_KEEP_ALIVE_MS = 15_000;

export function encodeSseEvent(event: TutorStreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export interface SseResponseOptions {
  /** Aborted when the client goes away (stream cancelled): stops the model and stores the partial answer. */
  abort: AbortController;
  keepAliveMs?: number;
  headers?: Record<string, string>;
}

/**
 * Wraps a tutor event generator in a streaming `Response`. Pull-based (one event per pull, so a slow client applies
 * back-pressure); `cancel` (client disconnect) aborts the turn and waits for it to persist what it has.
 */
export function sseResponse(events: AsyncGenerator<TutorStreamEvent, void, undefined>, options: SseResponseOptions): Response {
  const encoder = new TextEncoder();
  let timer: ReturnType<typeof setInterval> | undefined;
  const stop = (): void => {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
  };

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(": stream open\n\n"));
      timer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keep-alive\n\n"));
        } catch {
          stop();
        }
      }, options.keepAliveMs ?? SSE_KEEP_ALIVE_MS);
    },
    async pull(controller) {
      try {
        const next = await events.next();
        if (next.done) {
          stop();
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(encodeSseEvent(next.value)));
      } catch (error) {
        stop();
        controller.error(error);
      }
    },
    async cancel() {
      stop();
      options.abort.abort();
      await events.return(undefined);
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": SSE_CONTENT_TYPE,
      "cache-control": "no-cache, no-transform",
      // Disable response buffering in nginx-style proxies so tokens reach slow mobile connections as they arrive.
      "x-accel-buffering": "no",
      ...options.headers,
    },
  });
}
