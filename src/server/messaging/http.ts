import "server-only";
import { AppError } from "@/server/lib/errors";
import { scrubString, type Logger } from "@/server/lib/logger";
import type { ChannelName } from "./types";

/**
 * Shared plumbing for the HTTP messaging adapters (Resend, Twilio, Africa's Talking): one bounded `fetch` with a
 * timeout, and one error type that tells callers whether retrying can help.
 *
 * Retry policy (ARCHITECTURE §5.1 / §3.7): adapters make exactly ONE request per `send()`. Queued messages
 * (`notifications.send`) are retried by the jobs system: a {@link MessagingProviderError} is an `AppError` whose code
 * is `INTERNAL` when retryable (job backs off) and `BAD_REQUEST` when permanent (job FAILED at once, see
 * `isPermanentJobError`). One-time codes cannot be queued (job payloads never carry secrets), so `sendOtpMessage`
 * retries a retryable failure once in-process.
 */

/** Why a provider call failed. */
export type ProviderFailureReason =
  /** Connection failed before a response (DNS, TLS, reset). */
  | "network"
  /** No response within the timeout (the provider MAY have accepted the message). */
  | "timeout"
  /** 429 / provider throttling or quota. */
  | "rate_limited"
  /** 5xx / provider-side outage. */
  | "unavailable"
  /** Credentials missing, wrong or revoked (operator fix; retrying after the fix succeeds). */
  | "auth"
  /** Account configuration: unverified sender/domain, region not enabled, no balance (operator fix). */
  | "config"
  /** The recipient cannot receive this message (invalid, unroutable, opted out). Permanent. */
  | "recipient"
  /** The provider refused the request itself (malformed / too long). Permanent. */
  | "rejected"
  /** 2xx without a usable message id. Not retried: the message may have been sent. */
  | "invalid_response";

const RETRYABLE_REASONS: ReadonlySet<ProviderFailureReason> = new Set(["network", "timeout", "rate_limited", "unavailable", "auth", "config"]);

/** Default per-request timeout for messaging providers. */
export const PROVIDER_TIMEOUT_MS = 10_000;

/** Injection points shared by the HTTP adapters (tests pass a fake `fetch`). */
export interface HttpDriverOptions {
  fetch?: typeof fetch;
  logger?: Logger;
  /** Per-request timeout (default {@link PROVIDER_TIMEOUT_MS}). */
  timeoutMs?: number;
}
/** Cap on a provider-supplied Retry-After (seconds). */
const MAX_RETRY_AFTER_SECONDS = 3_600;
/** Cap on a response body we read (bytes of text). */
const MAX_RESPONSE_CHARS = 64 * 1024;

const USER_MESSAGES: Readonly<Record<"recipient" | "rejected" | "invalid_response", string>> = {
  recipient: "We couldn't deliver a message to that address. Check it and try again.",
  rejected: "The message could not be sent.",
  invalid_response: "The message could not be confirmed as sent.",
};

export interface MessagingProviderErrorInit {
  channel: ChannelName;
  provider: string;
  reason: ProviderFailureReason;
  /** HTTP status from the provider (null for network / timeout). */
  providerStatus?: number | null;
  /** Provider error code (`21211`, `validation_error`, `InvalidPhoneNumber`, …). */
  providerCode?: string | number | null;
  /** Provider's description, already passed through {@link safeProviderText}. */
  providerMessage?: string | null;
  retryAfterSeconds?: number;
  cause?: unknown;
}

/**
 * A failed provider call. Diagnostic fields (`provider*`, `reason`) are for logs and job errors; the AppError `message`
 * is user-safe for permanent failures and diagnostic for retryable ones (INTERNAL messages are never shown to users).
 * Never contains the message body, the API key or the full recipient.
 */
export class MessagingProviderError extends AppError {
  readonly channel: ChannelName;
  readonly provider: string;
  readonly reason: ProviderFailureReason;
  readonly retryable: boolean;
  readonly providerStatus: number | null;
  readonly providerCode: string | null;

  constructor(init: MessagingProviderErrorInit) {
    const retryable = RETRYABLE_REASONS.has(init.reason);
    const providerCode = init.providerCode === undefined || init.providerCode === null ? null : String(init.providerCode).slice(0, 64);
    const providerStatus = init.providerStatus ?? null;
    const reference = [init.provider, providerStatus === null ? null : `HTTP ${providerStatus}`, providerCode].filter(Boolean).join(" ");
    const message = retryable
      ? `${init.channel} provider ${reference} failed (${init.reason})${init.providerMessage ? `: ${init.providerMessage}` : ""}`
      : `${USER_MESSAGES[init.reason as keyof typeof USER_MESSAGES]} [${reference}]`;
    super(retryable ? "INTERNAL" : "BAD_REQUEST", message, {
      details: {
        channel: init.channel,
        provider: init.provider,
        reason: init.reason,
        providerStatus,
        providerCode,
        ...(init.providerMessage ? { providerMessage: init.providerMessage } : {}),
      },
      ...(init.retryAfterSeconds === undefined ? {} : { retryAfterSeconds: init.retryAfterSeconds }),
      ...(init.cause === undefined ? {} : { cause: init.cause }),
    });
    this.name = "MessagingProviderError";
    this.channel = init.channel;
    this.provider = init.provider;
    this.reason = init.reason;
    this.retryable = retryable;
    this.providerStatus = providerStatus;
    this.providerCode = providerCode;
  }
}

export function isMessagingProviderError(error: unknown): error is MessagingProviderError {
  return error instanceof MessagingProviderError;
}

/**
 * Provider free text made safe for logs and job errors: control characters removed, emails / `+` numbers masked by the
 * logger's scrubber, and any other run of 7+ digits (a number written without `+`) masked too. Truncated.
 */
export function safeProviderText(value: unknown, max = 160): string | null {
  if (typeof value !== "string") return null;
  const cleaned = scrubString(value.replace(/[\u0000-\u001f\u007f]+/g, " "))
    .replace(/\d[\d ]{5,}\d/g, "[NUMBER]")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length === 0) return null;
  return cleaned.length > max ? `${cleaned.slice(0, max - 1)}…` : cleaned;
}

/** `Retry-After` (seconds or HTTP date) in whole seconds, capped; `undefined` when absent or unparseable. */
export function parseRetryAfter(value: string | null, now: Date = new Date()): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const trimmed = value.trim();
  let seconds: number;
  if (/^\d+$/.test(trimmed)) seconds = Number(trimmed);
  else {
    const at = Date.parse(trimmed);
    if (Number.isNaN(at)) return undefined;
    seconds = Math.ceil((at - now.getTime()) / 1000);
  }
  return Math.min(MAX_RETRY_AFTER_SECONDS, Math.max(0, seconds));
}

export interface ProviderResponse {
  status: number;
  ok: boolean;
  headers: Headers;
  /** Parsed JSON body, or `null` when the body is empty / not JSON. */
  json: unknown;
  /** Raw text (capped), for providers that answer errors in plain text. */
  text: string;
}

export interface ProviderRequest {
  channel: ChannelName;
  provider: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  fetch: typeof fetch;
  timeoutMs: number;
}

/**
 * POSTs once with a timeout. Resolves for ANY HTTP status (the adapter classifies it); throws
 * {@link MessagingProviderError} `network` / `timeout` when no response arrives.
 */
export async function postToProvider(request: ProviderRequest): Promise<ProviderResponse> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, request.timeoutMs);
  try {
    const response = await request.fetch(request.url, {
      method: "POST",
      headers: request.headers,
      body: request.body,
      signal: controller.signal,
      redirect: "error",
    });
    const text = (await response.text()).slice(0, MAX_RESPONSE_CHARS);
    let json: unknown = null;
    if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }
    }
    return { status: response.status, ok: response.ok, headers: response.headers, json, text };
  } catch (error) {
    const isAbort = timedOut || (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError"));
    // Network errors can embed the URL (which may carry an account id): keep only the error class and the system code.
    const causeCode = error instanceof Error ? field(error.cause, "code") : undefined;
    const describe = error instanceof Error ? [error.name, typeof causeCode === "string" && /^[A-Z0-9_]{2,40}$/.test(causeCode) ? causeCode : null] : [];
    throw new MessagingProviderError({
      channel: request.channel,
      provider: request.provider,
      reason: isAbort ? "timeout" : "network",
      providerMessage: describe.filter(Boolean).join(" ") || null,
    });
  } finally {
    clearTimeout(timer);
  }
}

/** Reason for an HTTP status when the provider gave nothing more specific. */
export function reasonForStatus(status: number): ProviderFailureReason {
  if (status === 429) return "rate_limited";
  if (status === 408 || status >= 500) return "unavailable";
  if (status === 401 || status === 403) return "auth";
  return "rejected";
}

/** Reads a top-level field of a JSON object body. */
export function field(body: unknown, key: string): unknown {
  return typeof body === "object" && body !== null && !Array.isArray(body) ? (body as Record<string, unknown>)[key] : undefined;
}
