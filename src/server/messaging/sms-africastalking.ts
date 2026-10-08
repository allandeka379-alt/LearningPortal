import "server-only";
import { AppError } from "@/server/lib/errors";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { maskRecipient } from "./console-driver";
import {
  field,
  type HttpDriverOptions,
  MessagingProviderError,
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
 * Africa's Talking SMS adapter (`SMS_PROVIDER=africastalking`).
 *
 *   POST https://api.africastalking.com/version1/messaging          (username "sandbox": api.sandbox.africastalking.com)
 *   apiKey: {AFRICASTALKING_API_KEY}     Accept: application/json
 *   application/x-www-form-urlencoded: username={AFRICASTALKING_USERNAME}&to={E.164}&message={text}[&from={sender}]
 *   → 201 { SMSMessageData: { Message, Recipients: [{ statusCode, status, number, cost, messageId }] } }
 *
 * The HTTP status only says the request was understood: each recipient carries its own `statusCode` (100 Processed,
 * 101 Sent, 102 Queued = accepted; 401-409 and 500-502 = failures, classified below).
 *
 * VERIFY AGAINST THE CURRENT AFRICA'S TALKING DOCS BEFORE GO-LIVE (never exercised against the live API from this
 * repository). In particular **confirm Zimbabwe coverage** with Africa's Talking (their SMS coverage list is
 * country-by-country, and routes to Econet, NetOne and Telecel must each be confirmed), the sender ID registration
 * rules for Zimbabwe, the per-recipient status codes and whether plain-text (non-JSON) error bodies are still returned.
 *
 * One request per send (retry policy: ./http.ts). Logs never contain the body, the API key or the full number.
 */

export const AFRICASTALKING_API_BASE_URL = "https://api.africastalking.com";
export const AFRICASTALKING_SANDBOX_BASE_URL = "https://api.sandbox.africastalking.com";

export interface AfricasTalkingConfig {
  username: string;
  apiKey: string;
  /** Registered alphanumeric sender ID or short code; unset = the provider's default sender. */
  senderId?: string | undefined;
  /** Override (tests); default live, or sandbox for the `sandbox` username. */
  baseUrl?: string;
}

/** Per-recipient status codes that mean "accepted". */
const ACCEPTED_STATUS_CODES: ReadonlySet<number> = new Set([100, 101, 102]);

/** Pure classification of a per-recipient failure `statusCode`. */
export function classifyAfricasTalkingRecipient(statusCode: number | null, status: string | null): ProviderFailureReason {
  switch (statusCode) {
    case 401: // RiskHold
    case 402: // InvalidSenderId
    case 405: // InsufficientBalance
      return "config";
    case 403: // InvalidPhoneNumber
    case 404: // UnsupportedNumberType
    case 406: // UserInBlacklist (opted out)
    case 407: // CouldNotRoute (also what an uncovered network looks like: check the `network` log field)
    case 409: // DoNotDisturbRejection
      return "recipient";
    case 500: // InternalServerError
    case 501: // GatewayError
      return "unavailable";
    case 502: // RejectedByGateway
      return "rejected";
    default:
      return classifyAfricasTalkingText(status) ?? "rejected";
  }
}

/** Classification from the textual status / message ("InvalidPhoneNumber", "Insufficient balance", …). */
function classifyAfricasTalkingText(text: string | null): ProviderFailureReason | null {
  if (!text) return null;
  const normalized = text.toLowerCase().replace(/[^a-z]/g, "");
  if (/invalidphonenumber|unsupportednumbertype|userinblacklist|couldnotroute|donotdisturb/.test(normalized)) return "recipient";
  if (/invalidsenderid|insufficientbalance|riskhold/.test(normalized)) return "config";
  if (/authentication|apikey|unauthori[sz]ed/.test(normalized)) return "auth";
  return null;
}

/** Pure classification of a non-2xx Africa's Talking response (bodies are often plain text). */
export function classifyAfricasTalkingHttpError(status: number, text: string | null): ProviderFailureReason {
  if (status === 401 || status === 403) return "auth";
  if (status === 429 || status >= 500 || status === 408) return reasonForStatus(status);
  return classifyAfricasTalkingText(text) ?? reasonForStatus(status);
}

interface AtRecipient {
  statusCode: number | null;
  status: string | null;
  messageId: string | null;
}

function firstRecipient(body: unknown): { recipient: AtRecipient | null; message: string | null } {
  const data = field(body, "SMSMessageData");
  const message = typeof field(data, "Message") === "string" ? (field(data, "Message") as string) : null;
  const recipients = field(data, "Recipients");
  const first = Array.isArray(recipients) ? (recipients[0] as unknown) : undefined;
  if (first === undefined) return { recipient: null, message };
  const statusCode = field(first, "statusCode");
  const status = field(first, "status");
  const messageId = field(first, "messageId");
  return {
    recipient: {
      statusCode: typeof statusCode === "number" ? statusCode : typeof statusCode === "string" && /^\d+$/.test(statusCode) ? Number(statusCode) : null,
      status: typeof status === "string" ? status.slice(0, 64) : null,
      messageId: typeof messageId === "string" ? messageId : null,
    },
    message,
  };
}

export class AfricasTalkingSmsDriver implements MessagingChannel {
  readonly channel = "sms" as const;
  readonly driver = "africastalking";
  readonly #config: AfricasTalkingConfig & { baseUrl: string };
  readonly #fetch: typeof fetch;
  readonly #logger: Logger;
  readonly #timeoutMs: number;

  constructor(config: AfricasTalkingConfig, options: HttpDriverOptions = {}) {
    if (!config.username.trim() || !config.apiKey.trim()) throw new Error("AfricasTalkingSmsDriver: a username and an API key are required");
    const defaultBase = config.username === "sandbox" ? AFRICASTALKING_SANDBOX_BASE_URL : AFRICASTALKING_API_BASE_URL;
    this.#config = { ...config, apiKey: config.apiKey.trim(), baseUrl: (config.baseUrl ?? defaultBase).replace(/\/+$/, "") };
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#logger = (options.logger ?? rootLogger).child({ module: "messaging.sms", driver: this.driver });
    this.#timeoutMs = options.timeoutMs ?? PROVIDER_TIMEOUT_MS;
  }

  get endpoint(): string {
    return `${this.#config.baseUrl}/version1/messaging`;
  }

  async send(message: OutboundMessage): Promise<SendResult> {
    if (message.channel !== "sms") throw new AppError("INTERNAL", `AfricasTalkingSmsDriver cannot send ${message.channel} messages.`);
    const recipient = toSmsRecipient(message.to);
    const sms = prepareSmsText(message.text);
    if (sms.text.length === 0) throw new AppError("BAD_REQUEST", "Message text is empty.");
    const form = new URLSearchParams({ username: this.#config.username, to: recipient.e164, message: sms.text });
    if (this.#config.senderId) form.set("from", this.#config.senderId);

    const started = Date.now();
    const logFields = {
      tag: message.tag,
      recipient: maskRecipient(recipient.e164),
      network: recipient.network,
      encoding: sms.encoding,
      segments: sms.segments,
      ...(sms.clipped ? { clipped: true } : {}),
    };
    const fail = (reason: ProviderFailureReason, extra: { providerStatus: number; providerCode?: string | number | null; providerMessage?: string | null }) => {
      const error = new MessagingProviderError({ channel: "sms", provider: this.driver, reason, ...extra });
      this.#logger.warn("sms send rejected", {
        ...logFields,
        providerStatus: extra.providerStatus,
        providerCode: extra.providerCode ?? null,
        reason,
        retryable: error.retryable,
        ms: Date.now() - started,
      });
      return error;
    };

    let response: ProviderResponse;
    try {
      response = await postToProvider({
        channel: "sms",
        provider: this.driver,
        url: this.endpoint,
        headers: {
          apikey: this.#config.apiKey,
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
      const text = safeProviderText(response.json === null ? response.text : (field(field(response.json, "SMSMessageData"), "Message") ?? response.text));
      throw fail(classifyAfricasTalkingHttpError(response.status, text), { providerStatus: response.status, providerMessage: text });
    }

    const { recipient: result, message: summary } = firstRecipient(response.json);
    if (result === null) {
      // No per-recipient entry: the whole request was refused (the summary says why, e.g. "InvalidSenderId").
      const text = safeProviderText(summary);
      if (response.json === null) {
        this.#logger.error("sms response was not understood", { ...logFields, providerStatus: response.status });
        throw new MessagingProviderError({ channel: "sms", provider: this.driver, reason: "invalid_response", providerStatus: response.status });
      }
      throw fail(classifyAfricasTalkingText(summary) ?? "rejected", { providerStatus: response.status, providerMessage: text });
    }
    if (result.statusCode === null || !ACCEPTED_STATUS_CODES.has(result.statusCode)) {
      throw fail(classifyAfricasTalkingRecipient(result.statusCode, result.status), {
        providerStatus: response.status,
        providerCode: result.status ?? result.statusCode,
        providerMessage: safeProviderText(summary),
      });
    }
    const id = result.messageId;
    if (id === null || id.length === 0 || id.length > 128 || id === "None") {
      this.#logger.error("sms accepted without a message id", { ...logFields, providerStatus: response.status });
      throw new MessagingProviderError({ channel: "sms", provider: this.driver, reason: "invalid_response", providerStatus: response.status });
    }
    this.#logger.info("sms accepted", { ...logFields, providerRef: id, providerState: result.status, ms: Date.now() - started });
    return { providerRef: id, driver: this.driver };
  }
}
