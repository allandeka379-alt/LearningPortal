import { describe, expect, it, vi } from "vitest";
import { newClientMessageId, parseSseBuffer, streamTutorMessage, type ClientStreamEvent } from "./stream-client";

function sseResponse(chunks: string[], init: ResponseInit = {}): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream; charset=utf-8" }, ...init });
}

describe("parseSseBuffer", () => {
  it("returns complete events and keeps the unfinished remainder", () => {
    const buffer = `: stream open\n\ndata: {"type":"delta","text":"Hi"}\n\ndata: {"type":"del`;
    expect(parseSseBuffer(buffer)).toEqual({ events: [{ type: "delta", text: "Hi" }], rest: 'data: {"type":"del' });
  });

  it("handles CRLF framing and skips malformed or typeless frames", () => {
    const buffer = `data: {"type":"restart"}\r\n\r\ndata: not json\n\ndata: {"no":"type"}\n\n`;
    expect(parseSseBuffer(buffer)).toEqual({ events: [{ type: "restart" }], rest: "" });
  });
});

describe("streamTutorMessage", () => {
  it("posts JSON and forwards events, even when frames are split across chunks", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      sseResponse([': stream open\n\ndata: {"type":"start","turnMode":"TEACH","hintLevel":0}\n\ndata: {"type":"del', 'ta","text":"x²"}\n\n', 'data: {"type":"done","messageId":"m1"}\n\n']),
    );
    const events: ClientStreamEvent[] = [];
    const outcome = await streamTutorMessage({
      url: "/api/v1/tutor/conversations/c1/messages",
      body: { text: "Hello", mode: "HINT", clientMessageId: "client-0001" },
      signal: new AbortController().signal,
      onEvent: (event) => events.push(event),
      fetchImpl,
    });
    expect(outcome).toBe("done");
    expect(events.map((event) => event.type)).toEqual(["start", "delta", "done"]);
    expect(events[1]).toEqual({ type: "delta", text: "x²" });
    const [url, init] = fetchImpl.mock.calls[0] ?? [];
    expect(url).toBe("/api/v1/tutor/conversations/c1/messages");
    expect(init).toMatchObject({ method: "POST", credentials: "same-origin" });
    expect(JSON.parse(String(init?.body))).toEqual({ text: "Hello", mode: "HINT", clientMessageId: "client-0001" });
  });

  it("turns a JSON error envelope (auth, CSRF, validation) into an error event", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({ error: { code: "VALIDATION", message: "Please check the highlighted fields and try again." } }, { status: 422 }),
    );
    const events: ClientStreamEvent[] = [];
    const outcome = await streamTutorMessage({ url: "/x", body: { text: "a", mode: "TEACH", clientMessageId: "client-0002" }, signal: new AbortController().signal, onEvent: (event) => events.push(event), fetchImpl });
    expect(outcome).toBe("error");
    expect(events).toEqual([{ type: "error", code: "VALIDATION", message: "Please check the highlighted fields and try again." }]);

    const expired = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ error: { code: "UNAUTHENTICATED", message: "Please sign in." } }, { status: 401 }));
    const authEvents: ClientStreamEvent[] = [];
    await streamTutorMessage({ url: "/x", body: { text: "a", mode: "TEACH", clientMessageId: "client-0003" }, signal: new AbortController().signal, onEvent: (event) => authEvents.push(event), fetchImpl: expired });
    expect(authEvents[0]).toMatchObject({ type: "error", code: "FORBIDDEN" });
  });

  it("reports a stream that ends without done or error as incomplete", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(sseResponse(['data: {"type":"delta","text":"half"}\n\n']));
    const outcome = await streamTutorMessage({ url: "/x", body: { text: "a", mode: "TEACH", clientMessageId: "client-0004" }, signal: new AbortController().signal, onEvent: () => undefined, fetchImpl });
    expect(outcome).toBe("incomplete");
  });
});

describe("newClientMessageId", () => {
  it("matches the server's idempotency key format", () => {
    expect(newClientMessageId()).toMatch(/^[A-Za-z0-9_-]{8,64}$/);
  });
});
