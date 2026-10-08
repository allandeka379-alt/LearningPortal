import { describe, expect, it } from "vitest";
import { getEnv } from "@/server/lib/env";
import { isAppError } from "@/server/lib/errors";
import { createLogger } from "@/server/lib/logger";
import { renderOtpMessage } from "./otp";
import {
  buildGraphMessage,
  DEFAULT_GRAPH_VERSION,
  extractOtpCode,
  isRetryableGraphError,
  resolveGraphVersion,
  WhatsAppApiError,
  WhatsAppCloudDriver,
  whatsappDriverFromEnv,
} from "./whatsapp-driver";

const TOKEN = "EAAG-test-access-token-not-real";
const PHONE_NUMBER_ID = "109876543210";

interface Captured {
  url: string;
  init: RequestInit;
  body: Record<string, unknown>;
}

/** A fetch double that records requests and answers from a queue (no network). */
function fakeFetch(...responses: (Response | Error)[]): { fetch: typeof fetch; calls: Captured[] } {
  const calls: Captured[] = [];
  const impl = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    calls.push({ url: String(input), init: init ?? {}, body: JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown> });
    const next = responses.shift() ?? Response.json({ messaging_product: "whatsapp", messages: [{ id: "wamid.default" }] });
    if (next instanceof Error) throw next;
    return next;
  };
  return { fetch: impl as typeof fetch, calls };
}

function driver(fetchImpl: typeof fetch, lines?: string[]) {
  return new WhatsAppCloudDriver(
    { accessToken: TOKEN, phoneNumberId: PHONE_NUMBER_ID, graphVersion: "v23.0" },
    { fetch: fetchImpl, logger: createLogger({ level: lines ? "debug" : "silent", format: "json", ...(lines ? { write: (line) => lines.push(line) } : {}) }) },
  );
}

describe("buildGraphMessage", () => {
  it("builds text, reply-button, list and template bodies with documented limits", () => {
    expect(buildGraphMessage("+263771234567", { kind: "text", text: "Hello" })).toEqual({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "263771234567",
      type: "text",
      text: { preview_url: false, body: "Hello" },
    });

    const buttons = buildGraphMessage("+263771234567", {
      kind: "buttons",
      text: "Pick one",
      buttons: [
        { id: "a", title: "A" },
        { id: "b", title: "A very long button title indeed" },
        { id: "c", title: "C" },
        { id: "d", title: "dropped (max 3)" },
      ],
    }) as { interactive: { type: string; action: { buttons: { reply: { id: string; title: string } }[] } } };
    expect(buttons.interactive.type).toBe("button");
    expect(buttons.interactive.action.buttons).toHaveLength(3);
    expect([...(buttons.interactive.action.buttons[1]?.reply.title ?? "")].length).toBeLessThanOrEqual(20);

    const list = buildGraphMessage("+263771234567", {
      kind: "list",
      text: "Choose",
      buttonText: "Choose answer",
      rows: [{ id: "r1", title: "A", description: "x".repeat(100) }],
    }) as { interactive: { type: string; action: { button: string; sections: { rows: { description: string }[] }[] } } };
    expect(list.interactive.type).toBe("list");
    expect(list.interactive.action.button).toBe("Choose answer");
    expect([...(list.interactive.action.sections[0]?.rows[0]?.description ?? "")].length).toBeLessThanOrEqual(72);

    expect(buildGraphMessage("+263771234567", { kind: "template", name: "account_link_code", language: "en", bodyParams: ["123456"], urlButtonParam: "123456" })).toMatchObject({
      type: "template",
      template: {
        name: "account_link_code",
        language: { code: "en" },
        components: [
          { type: "body", parameters: [{ type: "text", text: "123456" }] },
          { type: "button", sub_type: "url", index: "0", parameters: [{ type: "text", text: "123456" }] },
        ],
      },
    });
  });

  it("refuses an invalid recipient and empty messages", () => {
    const error = (() => {
      try {
        buildGraphMessage("0771234567", { kind: "text", text: "x" });
      } catch (caught) {
        return caught;
      }
      return null;
    })();
    expect(isAppError(error) && error.code).toBe("BAD_REQUEST");
    expect(() => buildGraphMessage("+263771234567", { kind: "text", text: "  " })).toThrow();
    expect(() => buildGraphMessage("+263771234567", { kind: "buttons", text: "x", buttons: [] })).toThrow();
  });
});

describe("WhatsAppCloudDriver", () => {
  it("POSTs to the Graph endpoint with the bearer token and returns the wamid", async () => {
    const { fetch, calls } = fakeFetch(Response.json({ messaging_product: "whatsapp", contacts: [{ wa_id: "263771234567" }], messages: [{ id: "wamid.ABC" }] }));
    const result = await driver(fetch).sendRequest("+263771234567", { kind: "text", text: "Hi there" });
    expect(result).toEqual({ providerRef: "wamid.ABC", driver: "whatsapp-cloud" });
    expect(calls[0]?.url).toBe(`https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`);
    expect(calls[0]?.init.method).toBe("POST");
    expect(new Headers(calls[0]?.init.headers).get("authorization")).toBe(`Bearer ${TOKEN}`);
    expect(calls[0]?.body).toMatchObject({ messaging_product: "whatsapp", to: "263771234567", type: "text", text: { body: "Hi there" } });
  });

  it("maps one-time codes onto the authentication template (send) and never logs the code or token", async () => {
    const lines: string[] = [];
    const { fetch, calls } = fakeFetch();
    const { text } = renderOtpMessage({ code: "482913", purpose: "CHANNEL_LINK" });
    await driver(fetch, lines).send({ channel: "whatsapp", to: "+263771234567", text, tag: "otp.CHANNEL_LINK", sensitive: true });
    expect(calls[0]?.body).toMatchObject({
      type: "template",
      template: { name: "account_link_code", components: [{ type: "body", parameters: [{ text: "482913" }] }, { type: "button" }] },
    });
    const all = lines.join("\n");
    expect(all).not.toContain("482913");
    expect(all).not.toContain(TOKEN);
    expect(all).not.toContain("+263771234567");
    expect(extractOtpCode({ text })).toBe("482913");
    expect(extractOtpCode({ text: "no code here" })).toBeNull();
  });

  it("classifies provider errors as retryable or permanent", async () => {
    const rateLimited = fakeFetch(Response.json({ error: { message: "Rate limit hit", code: 130429 } }, { status: 429 }));
    const outsideWindow = fakeFetch(Response.json({ error: { message: "Re-engagement message", code: 131047 } }, { status: 400 }));
    const network = fakeFetch(new TypeError("fetch failed"));

    const first = await driver(rateLimited.fetch).sendRequest("+263771234567", { kind: "text", text: "x" }).catch((e: unknown) => e);
    expect(first).toBeInstanceOf(WhatsAppApiError);
    expect(first).toMatchObject({ retryable: true, code: 130429, httpStatus: 429 });

    const second = await driver(outsideWindow.fetch).sendRequest("+263771234567", { kind: "text", text: "x" }).catch((e: unknown) => e);
    expect(second).toMatchObject({ retryable: false, code: 131047 });

    const third = await driver(network.fetch).sendRequest("+263771234567", { kind: "text", text: "x" }).catch((e: unknown) => e);
    expect(third).toMatchObject({ retryable: true, httpStatus: null });

    expect(isRetryableGraphError(500, null)).toBe(true);
    expect(isRetryableGraphError(400, 100)).toBe(false);
    expect(isRetryableGraphError(401, 190)).toBe(true);
  });

  it("resolves the Graph version and builds from the environment only when configured", () => {
    expect(resolveGraphVersion(undefined)).toBe(DEFAULT_GRAPH_VERSION);
    expect(resolveGraphVersion("v24.0")).toBe("v24.0");
    expect(resolveGraphVersion("latest")).toBe(DEFAULT_GRAPH_VERSION);
    const base = {
      NODE_ENV: "test",
      APP_URL: "http://localhost:3000",
      DATABASE_URL: "postgresql://x@localhost:5433/x_test",
      SESSION_SECRET: "test-only-session-secret-not-for-real-use-0123456789",
    };
    expect(whatsappDriverFromEnv(getEnv(base))).toBeNull();
    const configured = whatsappDriverFromEnv(
      getEnv({ ...base, WHATSAPP_VERIFY_TOKEN: "v", WHATSAPP_ACCESS_TOKEN: "a", WHATSAPP_PHONE_NUMBER_ID: "123456", WHATSAPP_APP_SECRET: "s" }),
    );
    expect(configured?.driver).toBe("whatsapp-cloud");
    expect(configured?.endpoint).toMatch(/\/v\d+\.\d+\/123456\/messages$/);
  });
});
