import "server-only";
import { AppError } from "@/server/lib/errors";
import { getEnv, type ServerEnv } from "@/server/lib/env";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { maskRecipient } from "./console-driver";
import type { MessagingChannel, OutboundMessage, SendResult } from "./types";

/**
 * WhatsApp Cloud API adapter (§30, ARCHITECTURE §8). Sends free-form text, interactive reply buttons / lists and
 * approved TEMPLATE messages through the Graph API:
 *
 *   POST https://graph.facebook.com/{version}/{WHATSAPP_PHONE_NUMBER_ID}/messages
 *   Authorization: Bearer {WHATSAPP_ACCESS_TOKEN}
 *   { messaging_product: "whatsapp", recipient_type: "individual", to, type: "text" | "interactive" | "template", ... }
 *
 * VERIFY AGAINST CURRENT META DOCS BEFORE GO-LIVE: the payload shapes, size limits (body 4096 / interactive body 1024 /
 * button title 20 / list row title 24, description 72 / max 3 buttons, 10 rows), the error codes classified below and
 * the Graph API version (`WHATSAPP_GRAPH_VERSION`, default {@link DEFAULT_GRAPH_VERSION}) follow Meta's documentation as
 * of 2026 and change over time.
 *
 * Rules this adapter does NOT decide (the WhatsApp channel's outbound job does): the 24-hour customer-service window
 * (free-form messages only within 24 h of the user's last message; outside it only approved templates), opt-out, and
 * rate limits. `send()` (the generic {@link MessagingChannel} entry used by `sendMessage()` / `sendOtpMessage()`) maps
 * one-time codes onto the approved AUTHENTICATION template and sends everything else as plain text.
 *
 * Logging: one line per send with the masked recipient, kind and provider id. Never the body, never the token.
 */

/** Graph API version used when `WHATSAPP_GRAPH_VERSION` is not set (verify the current version before go-live). */
export const DEFAULT_GRAPH_VERSION = "v23.0";
export const GRAPH_BASE_URL = "https://graph.facebook.com";
const GRAPH_VERSION_PATTERN = /^v\d{1,3}\.\d{1,2}$/;

/** Documented Cloud API limits (characters). */
export const WHATSAPP_LIMITS = Object.freeze({
  textBody: 4096,
  interactiveBody: 1024,
  header: 60,
  footer: 60,
  buttonTitle: 20,
  maxButtons: 3,
  buttonId: 256,
  listButtonText: 20,
  maxListRows: 10,
  listRowTitle: 24,
  listRowDescription: 72,
  listRowId: 200,
  sectionTitle: 24,
  templateParam: 1024,
});

/** Approved authentication template used for one-time codes (must exist in Meta Business Manager). */
export const DEFAULT_OTP_TEMPLATE = Object.freeze({ name: "account_link_code", language: "en" });

export type WhatsAppSendRequest =
  | { kind: "text"; text: string; previewUrl?: boolean }
  | {
      kind: "buttons";
      text: string;
      buttons: readonly { id: string; title: string }[];
      header?: string;
      footer?: string;
    }
  | {
      kind: "list";
      text: string;
      buttonText: string;
      rows: readonly { id: string; title: string; description?: string }[];
      sectionTitle?: string;
      header?: string;
      footer?: string;
    }
  | {
      kind: "template";
      name: string;
      language: string;
      bodyParams?: readonly string[];
      /** Dynamic suffix of the template's first URL button (authentication templates: the code). */
      urlButtonParam?: string;
    };

export interface WhatsAppCloudConfig {
  accessToken: string;
  phoneNumberId: string;
  graphVersion?: string;
  baseUrl?: string;
  otpTemplate?: { name: string; language: string };
}

export interface WhatsAppDriverOptions {
  fetch?: typeof fetch;
  logger?: Logger;
  /** Per-request timeout (default 15 s). */
  timeoutMs?: number;
}

/** A Graph API failure. `retryable` tells the outbound job whether backing off can help. */
export class WhatsAppApiError extends Error {
  readonly httpStatus: number | null;
  readonly code: number | null;
  readonly subcode: number | null;
  readonly retryable: boolean;

  constructor(message: string, details: { httpStatus: number | null; code: number | null; subcode?: number | null; retryable: boolean }) {
    super(message);
    this.name = "WhatsAppApiError";
    this.httpStatus = details.httpStatus;
    this.code = details.code;
    this.subcode = details.subcode ?? null;
    this.retryable = details.retryable;
  }
}

/**
 * Cloud API error codes worth retrying with backoff (rate limits, temporary unavailability). Verify against Meta docs:
 * 4 / 80007 / 130429 throughput, 131048 spam rate limit, 131056 pair rate limit, 131000 / 131016 / 1 / 2 service errors.
 */
const RETRYABLE_CODES: ReadonlySet<number> = new Set([1, 2, 4, 80007, 130429, 131000, 131016, 131048, 131056]);
/** Authentication / permission failures: an operator can rotate the token, so a few retries are worthwhile. */
const AUTH_CODES: ReadonlySet<number> = new Set([190, 10, 200]);

/** Pure classification of a Graph API failure. */
export function isRetryableGraphError(httpStatus: number | null, code: number | null): boolean {
  if (httpStatus === null) return true; // network error / timeout
  if (code !== null && (RETRYABLE_CODES.has(code) || AUTH_CODES.has(code))) return true;
  return httpStatus === 429 || httpStatus === 401 || httpStatus >= 500;
}

function clip(value: string, max: number): string {
  const chars = [...value];
  if (chars.length <= max) return value;
  return `${chars.slice(0, Math.max(1, max - 1)).join("").trimEnd()}…`;
}

/** E.164 (`+263771234567`) to the digits-only `to` value the Cloud API documents (`263771234567`). */
export function toGraphRecipient(e164: string): string {
  const digits = e164.replace(/^\+/, "");
  if (!/^[1-9]\d{6,14}$/.test(digits)) {
    throw new AppError("BAD_REQUEST", "That number can't receive WhatsApp messages.");
  }
  return digits;
}

/**
 * The Graph API JSON body for one message (pure). Texts are clipped to the documented limits instead of being rejected
 * by Meta after the fact; empty inputs are programming errors.
 */
export function buildGraphMessage(to: string, request: WhatsAppSendRequest): Record<string, unknown> {
  const base = { messaging_product: "whatsapp", recipient_type: "individual", to: toGraphRecipient(to) };
  const L = WHATSAPP_LIMITS;
  switch (request.kind) {
    case "text": {
      if (request.text.trim() === "") throw new AppError("BAD_REQUEST", "Message text is empty.");
      return { ...base, type: "text", text: { preview_url: request.previewUrl ?? false, body: clip(request.text, L.textBody) } };
    }
    case "buttons": {
      const buttons = request.buttons.slice(0, L.maxButtons);
      if (buttons.length === 0) throw new AppError("BAD_REQUEST", "Interactive messages need at least one button.");
      return {
        ...base,
        type: "interactive",
        interactive: {
          type: "button",
          ...(request.header ? { header: { type: "text", text: clip(request.header, L.header) } } : {}),
          body: { text: clip(request.text, L.interactiveBody) },
          ...(request.footer ? { footer: { text: clip(request.footer, L.footer) } } : {}),
          action: {
            buttons: buttons.map((button) => ({
              type: "reply",
              reply: { id: button.id.slice(0, L.buttonId), title: clip(button.title, L.buttonTitle) },
            })),
          },
        },
      };
    }
    case "list": {
      const rows = request.rows.slice(0, L.maxListRows);
      if (rows.length === 0) throw new AppError("BAD_REQUEST", "List messages need at least one row.");
      return {
        ...base,
        type: "interactive",
        interactive: {
          type: "list",
          ...(request.header ? { header: { type: "text", text: clip(request.header, L.header) } } : {}),
          body: { text: clip(request.text, L.interactiveBody) },
          ...(request.footer ? { footer: { text: clip(request.footer, L.footer) } } : {}),
          action: {
            button: clip(request.buttonText, L.listButtonText),
            sections: [
              {
                ...(request.sectionTitle ? { title: clip(request.sectionTitle, L.sectionTitle) } : {}),
                rows: rows.map((row) => ({
                  id: row.id.slice(0, L.listRowId),
                  title: clip(row.title, L.listRowTitle),
                  ...(row.description ? { description: clip(row.description, L.listRowDescription) } : {}),
                })),
              },
            ],
          },
        },
      };
    }
    case "template": {
      const components: Record<string, unknown>[] = [];
      if (request.bodyParams && request.bodyParams.length > 0) {
        components.push({
          type: "body",
          parameters: request.bodyParams.map((text) => ({ type: "text", text: clip(text, L.templateParam) })),
        });
      }
      if (request.urlButtonParam !== undefined) {
        components.push({ type: "button", sub_type: "url", index: "0", parameters: [{ type: "text", text: request.urlButtonParam }] });
      }
      return {
        ...base,
        type: "template",
        template: { name: request.name, language: { code: request.language }, ...(components.length > 0 ? { components } : {}) },
      };
    }
  }
}

/** The code inside an OTP message rendered by `renderOtpMessage` ("... is 123456. ..."). */
export function extractOtpCode(message: Pick<OutboundMessage, "text"> & { otpCode?: string }): string | null {
  if (message.otpCode && /^[A-Z0-9]{4,12}$/.test(message.otpCode)) return message.otpCode;
  return / is ([A-Z0-9]{4,12})\./.exec(message.text)?.[1] ?? null;
}

const graphResponseSchema = {
  messageId(body: unknown): string | null {
    if (typeof body !== "object" || body === null) return null;
    const messages = (body as { messages?: unknown }).messages;
    if (!Array.isArray(messages)) return null;
    const first = messages[0] as { id?: unknown } | undefined;
    return typeof first?.id === "string" && first.id.length > 0 && first.id.length <= 128 ? first.id : null;
  },
  error(body: unknown): { message: string; code: number | null; subcode: number | null } {
    const error = typeof body === "object" && body !== null ? (body as { error?: Record<string, unknown> }).error : undefined;
    const code = typeof error?.code === "number" ? error.code : null;
    const subcode = typeof error?.error_subcode === "number" ? error.error_subcode : null;
    const title = typeof error?.message === "string" ? error.message.slice(0, 200) : "WhatsApp API error";
    return { message: title, code, subcode };
  },
};

/** The validated Graph API version for an environment value (falls back to {@link DEFAULT_GRAPH_VERSION}). */
export function resolveGraphVersion(value: string | undefined | null): string {
  const trimmed = value?.trim();
  return trimmed && GRAPH_VERSION_PATTERN.test(trimmed) ? trimmed : DEFAULT_GRAPH_VERSION;
}

export class WhatsAppCloudDriver implements MessagingChannel {
  readonly channel = "whatsapp" as const;
  readonly driver = "whatsapp-cloud";
  readonly #config: Required<Omit<WhatsAppCloudConfig, "baseUrl">> & { baseUrl: string };
  readonly #fetch: typeof fetch;
  readonly #logger: Logger;
  readonly #timeoutMs: number;

  constructor(config: WhatsAppCloudConfig, options: WhatsAppDriverOptions = {}) {
    if (!config.accessToken.trim() || !/^\d{5,32}$/.test(config.phoneNumberId.trim())) {
      throw new Error("WhatsAppCloudDriver: an access token and a numeric phone number id are required");
    }
    this.#config = {
      accessToken: config.accessToken.trim(),
      phoneNumberId: config.phoneNumberId.trim(),
      graphVersion: resolveGraphVersion(config.graphVersion),
      baseUrl: (config.baseUrl ?? GRAPH_BASE_URL).replace(/\/+$/, ""),
      otpTemplate: config.otpTemplate ?? DEFAULT_OTP_TEMPLATE,
    };
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#logger = (options.logger ?? rootLogger).child({ module: "messaging.whatsapp" });
    this.#timeoutMs = options.timeoutMs ?? 15_000;
  }

  /** Graph endpoint for this phone number. */
  get endpoint(): string {
    return `${this.#config.baseUrl}/${this.#config.graphVersion}/${this.#config.phoneNumberId}/messages`;
  }

  /**
   * Generic channel entry (`sendMessage` / `sendOtpMessage`). One-time codes (`tag` "otp.*", `sensitive`) use the
   * approved authentication template, which may be sent outside the 24-hour window; other messages are plain text and
   * are only delivered inside the window (Meta rejects them otherwise with error 131047).
   */
  async send(message: OutboundMessage & { otpCode?: string }): Promise<SendResult> {
    if (message.tag.startsWith("otp.")) {
      const code = extractOtpCode(message);
      if (!code) throw new AppError("INTERNAL", "The one-time code could not be mapped onto the WhatsApp template.");
      return this.sendRequest(message.to, {
        kind: "template",
        name: this.#config.otpTemplate.name,
        language: this.#config.otpTemplate.language,
        bodyParams: [code],
        urlButtonParam: code,
      }, message.tag);
    }
    return this.sendRequest(message.to, { kind: "text", text: message.text }, message.tag);
  }

  /** Sends one message of any kind. @throws WhatsAppApiError (see `retryable`) | AppError BAD_REQUEST (bad input). */
  async sendRequest(to: string, request: WhatsAppSendRequest, tag = `whatsapp.${request.kind}`): Promise<SendResult> {
    const body = JSON.stringify(buildGraphMessage(to, request));
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#timeoutMs);
    let response: Response;
    try {
      response = await this.#fetch(this.endpoint, {
        method: "POST",
        headers: { authorization: `Bearer ${this.#config.accessToken}`, "content-type": "application/json" },
        body,
        signal: controller.signal,
      });
    } catch (error) {
      this.#logger.warn("whatsapp send failed (network)", { tag, recipient: maskRecipient(to), kind: request.kind, err: error });
      throw new WhatsAppApiError("WhatsApp API unreachable", { httpStatus: null, code: null, retryable: true });
    } finally {
      clearTimeout(timer);
    }
    let parsed: unknown = null;
    try {
      parsed = await response.json();
    } catch {
      parsed = null;
    }
    if (!response.ok) {
      const error = graphResponseSchema.error(parsed);
      const retryable = isRetryableGraphError(response.status, error.code);
      this.#logger.warn("whatsapp send rejected", {
        tag,
        recipient: maskRecipient(to),
        kind: request.kind,
        httpStatus: response.status,
        code: error.code,
        subcode: error.subcode,
        retryable,
      });
      throw new WhatsAppApiError(`WhatsApp API error${error.code === null ? "" : ` ${error.code}`}: ${error.message}`, {
        httpStatus: response.status,
        code: error.code,
        subcode: error.subcode,
        retryable,
      });
    }
    const id = graphResponseSchema.messageId(parsed);
    if (!id) throw new WhatsAppApiError("WhatsApp API returned no message id", { httpStatus: response.status, code: null, retryable: false });
    this.#logger.info("whatsapp message accepted", { tag, recipient: maskRecipient(to), kind: request.kind, providerRef: id });
    return { providerRef: id, driver: this.driver };
  }
}

/** True when every WhatsApp credential is present (env.ts requires all four together). */
export function whatsappCloudConfigured(env: ServerEnv = getEnv()): boolean {
  return Boolean(env.WHATSAPP_ACCESS_TOKEN && env.WHATSAPP_PHONE_NUMBER_ID && env.WHATSAPP_APP_SECRET && env.WHATSAPP_VERIFY_TOKEN);
}

/**
 * The Cloud API driver for an environment, or `null` when WhatsApp is not configured (Graph API version from the optional
 * `WHATSAPP_GRAPH_VERSION`).
 */
export function whatsappDriverFromEnv(env: ServerEnv = getEnv(), options: WhatsAppDriverOptions = {}): WhatsAppCloudDriver | null {
  if (!whatsappCloudConfigured(env)) return null;
  return new WhatsAppCloudDriver(
    {
      accessToken: env.WHATSAPP_ACCESS_TOKEN as string,
      phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID as string,
      graphVersion: resolveGraphVersion(env.WHATSAPP_GRAPH_VERSION),
    },
    options,
  );
}
