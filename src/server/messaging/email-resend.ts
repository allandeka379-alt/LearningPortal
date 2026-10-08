import "server-only";
import { APP_NAME } from "@/lib/config";
import { AppError } from "@/server/lib/errors";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { maskRecipient } from "./console-driver";
import { renderEmailHtml } from "./email-content";
import {
  field,
  type HttpDriverOptions,
  MessagingProviderError,
  parseRetryAfter,
  postToProvider,
  PROVIDER_TIMEOUT_MS,
  reasonForStatus,
  safeProviderText,
  type ProviderFailureReason,
  type ProviderResponse,
} from "./http";
import type { MessagingChannel, OutboundMessage, SendResult } from "./types";

/**
 * Resend email adapter (`EMAIL_PROVIDER=resend`).
 *
 *   POST https://api.resend.com/emails
 *   Authorization: Bearer {RESEND_API_KEY}
 *   Idempotency-Key: {message.idempotencyKey}            (when the caller supplies one)
 *   { from, to: [to], subject, text, html, reply_to?, tags: [{ name: "category", value }] }
 *   → 200 { id }      errors → { statusCode, name, message }
 *
 * VERIFY AGAINST THE CURRENT RESEND DOCS BEFORE GO-LIVE (never exercised against the live API from this repository):
 * the payload field names, the Idempotency-Key header and its 24 h window, the tag character rules, and the error
 * `name` values classified below (401 missing/restricted key, 403 invalid key or unverified domain, 409 idempotency,
 * 422 validation / invalid_from_address, 429 rate limit or daily / monthly quota, 5xx).
 *
 * One request per send (no internal retries; see ./http.ts for the retry policy). Logs one line per send with the
 * masked recipient, tag, provider id and timing: never the body, subject or API key.
 */

export const RESEND_API_BASE_URL = "https://api.resend.com";

export interface ResendConfig {
  apiKey: string;
  /** `addr@domain` or `Name <addr@domain>` on a domain verified in Resend. */
  from: string;
  replyTo?: string | undefined;
  baseUrl?: string;
}

/** Resend tag values: ASCII letters, digits, `_` and `-` only. */
export function resendTagValue(tag: string): string {
  const value = tag.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 256);
  return value.length > 0 ? value : "message";
}

/** The JSON body of one Resend send (pure). */
export function buildResendEmail(config: Pick<ResendConfig, "from" | "replyTo">, message: OutboundMessage): Record<string, unknown> {
  const subject = (message.subject ?? "").replace(/[\r\n]+/g, " ").trim() || APP_NAME;
  return {
    from: config.from,
    to: [message.to],
    subject,
    text: message.text,
    html: renderEmailHtml(message.text, { subject }),
    ...(config.replyTo ? { reply_to: config.replyTo } : {}),
    tags: [{ name: "category", value: resendTagValue(message.tag) }],
  };
}

/** Error `name`s that point at account configuration rather than this message (operator fix → retryable). */
const CONFIG_ERROR_NAMES: ReadonlySet<string> = new Set(["invalid_from_address", "invalid_access", "invalid_region", "not_found", "method_not_allowed"]);
const AUTH_ERROR_NAMES: ReadonlySet<string> = new Set(["missing_api_key", "invalid_api_key", "restricted_api_key"]);

/** Pure classification of a non-2xx Resend response. */
export function classifyResendError(status: number, name: string | null, message: string | null): ProviderFailureReason {
  if (name && AUTH_ERROR_NAMES.has(name)) return "auth";
  if (name && CONFIG_ERROR_NAMES.has(name)) return "config";
  if (name === "concurrent_idempotent_requests") return "rate_limited";
  if (status === 429) return "rate_limited";
  if (status >= 500 || status === 408) return "unavailable";
  if (status === 401) return "auth";
  // 403 without a key error: unverified domain / testing-mode restrictions (account configuration).
  if (status === 403 || status === 404) return "config";
  if ((status === 400 || status === 422) && message !== null && /`to`|\bto\b field|recipient/i.test(message)) return "recipient";
  return reasonForStatus(status);
}

export class ResendEmailDriver implements MessagingChannel {
  readonly channel = "email" as const;
  readonly driver = "resend";
  readonly #config: Required<Omit<ResendConfig, "replyTo">> & { replyTo?: string };
  readonly #fetch: typeof fetch;
  readonly #logger: Logger;
  readonly #timeoutMs: number;

  constructor(config: ResendConfig, options: HttpDriverOptions = {}) {
    if (!config.apiKey.trim() || !config.from.trim()) throw new Error("ResendEmailDriver: an API key and a from address are required");
    this.#config = {
      apiKey: config.apiKey.trim(),
      from: config.from.trim(),
      baseUrl: (config.baseUrl ?? RESEND_API_BASE_URL).replace(/\/+$/, ""),
      ...(config.replyTo ? { replyTo: config.replyTo } : {}),
    };
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#logger = (options.logger ?? rootLogger).child({ module: "messaging.email", driver: this.driver });
    this.#timeoutMs = options.timeoutMs ?? PROVIDER_TIMEOUT_MS;
  }

  get endpoint(): string {
    return `${this.#config.baseUrl}/emails`;
  }

  async send(message: OutboundMessage): Promise<SendResult> {
    if (message.channel !== "email") throw new AppError("INTERNAL", `ResendEmailDriver cannot send ${message.channel} messages.`);
    const started = Date.now();
    const headers: Record<string, string> = {
      authorization: `Bearer ${this.#config.apiKey}`,
      "content-type": "application/json",
      accept: "application/json",
      "user-agent": "learning-platform-messaging/1.0",
    };
    if (message.idempotencyKey) headers["idempotency-key"] = message.idempotencyKey.slice(0, 256);
    const logFields = { tag: message.tag, recipient: maskRecipient(message.to) };

    let response: ProviderResponse;
    try {
      response = await postToProvider({
        channel: "email",
        provider: this.driver,
        url: this.endpoint,
        headers,
        body: JSON.stringify(buildResendEmail(this.#config, message)),
        fetch: this.#fetch,
        timeoutMs: this.#timeoutMs,
      });
    } catch (error) {
      if (error instanceof MessagingProviderError) {
        this.#logger.warn("email send failed", { ...logFields, reason: error.reason, retryable: error.retryable, ms: Date.now() - started });
      }
      throw error;
    }

    if (!response.ok) {
      const name = typeof field(response.json, "name") === "string" ? (field(response.json, "name") as string).slice(0, 64) : null;
      const providerMessage = safeProviderText(field(response.json, "message") ?? response.text);
      const reason = classifyResendError(response.status, name, providerMessage);
      const retryAfter = parseRetryAfter(response.headers.get("retry-after"));
      const error = new MessagingProviderError({
        channel: "email",
        provider: this.driver,
        reason,
        providerStatus: response.status,
        providerCode: name,
        providerMessage,
        ...(retryAfter === undefined ? {} : { retryAfterSeconds: retryAfter }),
      });
      this.#logger.warn("email send rejected", {
        ...logFields,
        providerStatus: response.status,
        providerCode: name,
        reason,
        retryable: error.retryable,
        ms: Date.now() - started,
      });
      throw error;
    }

    const id = field(response.json, "id");
    if (typeof id !== "string" || id.length === 0 || id.length > 128) {
      this.#logger.error("email accepted without a message id", { ...logFields, providerStatus: response.status });
      throw new MessagingProviderError({ channel: "email", provider: this.driver, reason: "invalid_response", providerStatus: response.status });
    }
    this.#logger.info("email accepted", { ...logFields, providerRef: id, ms: Date.now() - started });
    return { providerRef: id, driver: this.driver };
  }
}
