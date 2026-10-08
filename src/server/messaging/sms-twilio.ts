import "server-only";
import { AppError } from "@/server/lib/errors";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { maskRecipient } from "./console-driver";
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
import { prepareSmsText, toSmsRecipient } from "./sms";
import type { MessagingChannel, OutboundMessage, SendResult } from "./types";

/**
 * Twilio Programmable Messaging adapter (`SMS_PROVIDER=twilio`).
 *
 *   POST https://api.twilio.com/2010-04-01/Accounts/{TWILIO_ACCOUNT_SID}/Messages.json
 *   Authorization: Basic base64({TWILIO_ACCOUNT_SID}:{TWILIO_AUTH_TOKEN})
 *   application/x-www-form-urlencoded: To={E.164}&Body={text}&From={TWILIO_FROM} | MessagingServiceSid={MG…}
 *   → 201 { sid: "SM…", status: "queued" | "accepted", … }     errors → { code, message, more_info, status }
 *
 * VERIFY AGAINST THE CURRENT TWILIO DOCS BEFORE GO-LIVE (never exercised against the live API from this repository):
 * the error codes classified below, and for Zimbabwe (+263): SMS Geo Permissions must allow Zimbabwe (error 21408
 * otherwise), the sender type Twilio supports there (alphanumeric sender ID vs. international long code, any
 * pre-registration) and delivery to Econet, NetOne and Telecel numbers (test one number per network on staging).
 *
 * A 201 means "accepted for delivery", not "delivered": handset delivery (30xxx errors) arrives on a status callback,
 * which is not wired yet. One request per send (retry policy: ./http.ts). Logs never contain the body, the auth token
 * or the full number.
 */

export const TWILIO_API_BASE_URL = "https://api.twilio.com";

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  /** E.164 number or alphanumeric sender ID. One of `from` / `messagingServiceSid` is required. */
  from?: string | undefined;
  messagingServiceSid?: string | undefined;
  baseUrl?: string;
}

/** Recipient problems (permanent): invalid / non-mobile / unreachable / unsubscribed ("STOP") numbers. */
const RECIPIENT_CODES: ReadonlySet<number> = new Set([21211, 21217, 21407, 21610, 21612, 21614]);
/** Account / sender configuration (operator fix → retryable): auth, Geo Permissions, invalid From / service. */
const CONFIG_CODES: ReadonlySet<number> = new Set([20003, 20404, 21212, 21408, 21606, 21608, 21659, 21660, 21703, 21704, 21705]);
/** Throttling. */
const RATE_CODES: ReadonlySet<number> = new Set([20429, 14107]);

/** Pure classification of a non-2xx Twilio response. */
export function classifyTwilioError(status: number, code: number | null): ProviderFailureReason {
  if (code !== null) {
    if (RECIPIENT_CODES.has(code)) return "recipient";
    if (code === 20003) return "auth";
    if (CONFIG_CODES.has(code)) return "config";
    if (RATE_CODES.has(code)) return "rate_limited";
  }
  return reasonForStatus(status);
}

export class TwilioSmsDriver implements MessagingChannel {
  readonly channel = "sms" as const;
  readonly driver = "twilio";
  readonly #config: TwilioConfig & { baseUrl: string };
  readonly #fetch: typeof fetch;
  readonly #logger: Logger;
  readonly #timeoutMs: number;

  constructor(config: TwilioConfig, options: HttpDriverOptions = {}) {
    if (!/^AC[0-9a-fA-F]{32}$/.test(config.accountSid) || !config.authToken.trim()) {
      throw new Error("TwilioSmsDriver: an account SID (AC…) and an auth token are required");
    }
    if (!config.from && !config.messagingServiceSid) throw new Error("TwilioSmsDriver: a From sender or a Messaging Service SID is required");
    this.#config = { ...config, authToken: config.authToken.trim(), baseUrl: (config.baseUrl ?? TWILIO_API_BASE_URL).replace(/\/+$/, "") };
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#logger = (options.logger ?? rootLogger).child({ module: "messaging.sms", driver: this.driver });
    this.#timeoutMs = options.timeoutMs ?? PROVIDER_TIMEOUT_MS;
  }

  get endpoint(): string {
    return `${this.#config.baseUrl}/2010-04-01/Accounts/${this.#config.accountSid}/Messages.json`;
  }

  async send(message: OutboundMessage): Promise<SendResult> {
    if (message.channel !== "sms") throw new AppError("INTERNAL", `TwilioSmsDriver cannot send ${message.channel} messages.`);
    const recipient = toSmsRecipient(message.to);
    const sms = prepareSmsText(message.text);
    if (sms.text.length === 0) throw new AppError("BAD_REQUEST", "Message text is empty.");
    const form = new URLSearchParams({ To: recipient.e164, Body: sms.text });
    if (this.#config.messagingServiceSid) form.set("MessagingServiceSid", this.#config.messagingServiceSid);
    else if (this.#config.from) form.set("From", this.#config.from);

    const started = Date.now();
    const logFields = {
      tag: message.tag,
      recipient: maskRecipient(recipient.e164),
      network: recipient.network,
      encoding: sms.encoding,
      segments: sms.segments,
      ...(sms.clipped ? { clipped: true } : {}),
    };
    let response: ProviderResponse;
    try {
      response = await postToProvider({
        channel: "sms",
        provider: this.driver,
        url: this.endpoint,
        headers: {
          authorization: `Basic ${Buffer.from(`${this.#config.accountSid}:${this.#config.authToken}`).toString("base64")}`,
          "content-type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: form.toString(),
        fetch: this.#fetch,
        timeoutMs: this.#timeoutMs,
      });
    } catch (error) {
      if (error instanceof MessagingProviderError) {
        this.#logger.warn("sms send failed", { ...logFields, reason: error.reason, retryable: error.retryable, ms: Date.now() - started });
      }
      throw error;
    }

    if (!response.ok) {
      const rawCode = field(response.json, "code");
      const code = typeof rawCode === "number" && Number.isInteger(rawCode) ? rawCode : null;
      const reason = classifyTwilioError(response.status, code);
      const retryAfter = parseRetryAfter(response.headers.get("retry-after"));
      const error = new MessagingProviderError({
        channel: "sms",
        provider: this.driver,
        reason,
        providerStatus: response.status,
        providerCode: code,
        providerMessage: safeProviderText(field(response.json, "message") ?? response.text),
        ...(retryAfter === undefined ? {} : { retryAfterSeconds: retryAfter }),
      });
      this.#logger.warn("sms send rejected", {
        ...logFields,
        providerStatus: response.status,
        providerCode: code,
        reason,
        retryable: error.retryable,
        ms: Date.now() - started,
      });
      throw error;
    }

    const sid = field(response.json, "sid");
    if (typeof sid !== "string" || !/^[A-Za-z0-9]{2,64}$/.test(sid)) {
      this.#logger.error("sms accepted without a message sid", { ...logFields, providerStatus: response.status });
      throw new MessagingProviderError({ channel: "sms", provider: this.driver, reason: "invalid_response", providerStatus: response.status });
    }
    const status = field(response.json, "status");
    this.#logger.info("sms accepted", {
      ...logFields,
      providerRef: sid,
      providerState: typeof status === "string" ? status.slice(0, 32) : null,
      ms: Date.now() - started,
    });
    return { providerRef: sid, driver: this.driver };
  }
}
