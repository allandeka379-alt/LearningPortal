import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { timingSafeEqualStr } from "@/server/lib/crypto";
import { scrubString } from "@/server/lib/logger";
import {
  MOBILE_MONEY_METHODS,
  isCurrencyCode,
  syntheticEventId,
  type CheckoutRequest,
  type CheckoutResult,
  type PaymentMethod,
  type PaymentProvider,
  type ProviderPaymentStatus,
  type ProviderPollResult,
  type RefundRequest,
  type RefundResult,
  type VerifiedProviderEvent,
  type WebhookRequest,
} from "./types";

/**
 * Paynow adapter (Zimbabwe: EcoCash, OneMoney, InnBucks, ZimSwitch, Visa/Mastercard; ARCHITECTURE §7.1).
 * Plain `fetch`, no SDK.
 *
 * VERIFY AGAINST CURRENT PAYNOW DEVELOPER DOCS BEFORE GO-LIVE: every protocol fact below (endpoints, field names and
 * order, hash rule, status strings, test-mode behaviour) was implemented from the integration notes we were given and
 * the public SDKs' behaviour, not from a signed contract. The hash rule reproduces the worked example in Paynow's docs
 * (see paynow.test.ts), which is a good sign but not a substitute for a sandbox run with real integration keys.
 *
 * Protocol:
 * - Web checkout: POST `initiatetransaction` (application/x-www-form-urlencoded) with id (integration id), reference
 *   (our Payment id), amount ("5.00", 2 dp), additionalinfo, returnurl, resulturl, authemail (optional), status
 *   "Message", hash. Response (urlencoded): `status=Ok&browserurl=…&pollurl=…&hash=…` (hash verified like any other
 *   message) or `status=Error&error=…` (not hashed). The payer chooses the method on Paynow's page.
 * - Mobile express checkout (EcoCash / OneMoney / InnBucks): POST `remotetransaction` with the same fields plus phone
 *   (local format "07XXXXXXXX") and method ("ecocash" | "onemoney" | "innbucks") before status. Response: pollurl +
 *   instructions. EcoCash / OneMoney are phone approval prompts. InnBucks is an authorization-code flow: Paynow returns
 *   `authorizationcode` and `authorizationexpires`; show the code and optionally deep-link the app with
 *   `com.innbucks.customer://purchase?paymentToken=<code>`. There is no browser redirect. Paynow requires `authemail`.
 * - HASH = upper-case hex SHA-512 of the concatenation of every field VALUE in the order sent (excluding `hash`), then
 *   the integration key. Values are the decoded (not URL-encoded) strings.
 * - Status updates are POSTed by Paynow to resulturl (reference, paynowreference, amount, status, pollurl, hash): the
 *   hash is verified and a mismatch is rejected. Polling = POST to the pollurl, which answers with the same fields.
 * - Paynow sends no event id: {@link syntheticEventId} over (reference, status, paynowreference, amount) makes a replay
 *   idempotent while each new status (or corrected amount) is a new event; the webhook and a poll reporting the same
 *   facts collide, which is what we want.
 * - Status mapping: Paid / Awaiting Delivery / Delivered -> PAID; Cancelled -> CANCELLED; Failed -> FAILED; Refunded ->
 *   REFUNDED; Created / Sent -> still PENDING; Disputed -> informational with `disputed: true` (payment state kept,
 *   flagged for staff). Unknown strings are informational (stored, never applied).
 * - Amounts are in the integration's currency (Paynow integrations are per currency: USD or ZWG). The amount in a
 *   status update is never trusted: the payment state machine compares it with our Payment row.
 * - No refund API: refunds are done by staff in the Paynow dashboard (`MANUAL_REQUIRED`).
 *
 * Test mode (VERIFY): while an integration is in test mode, `authemail` must be the merchant account's email, and only
 * Paynow's documented test wallet numbers work for mobile checkout. They simulate, in order: success, delayed success,
 * user cancelled and insufficient funds (published as 0771111111, 0772222222, 0773333333, 0774444444 at the time of
 * writing). Set `testMode` + `merchantEmail` for such integrations.
 *
 * Security: poll URLs come from hash-verified messages AND are restricted to Paynow's own hosts over https (no SSRF via
 * a crafted pollurl); HTTP redirects are refused; payloads returned to callers carry no hash, phone or email.
 */

export const PAYNOW_INITIATE_URL = "https://www.paynow.co.zw/interface/initiatetransaction";
export const PAYNOW_REMOTE_URL = "https://www.paynow.co.zw/interface/remotetransaction";
export const PAYNOW_EVENT_TYPE = "paynow.status_update";
export const PAYNOW_POLL_EVENT_TYPE = "paynow.poll";
/** Methods Paynow mobile express checkout accepts. */
export const PAYNOW_MOBILE_METHODS = ["ecocash", "onemoney", "innbucks"] as const;
export type PaynowMobileMethod = (typeof PAYNOW_MOBILE_METHODS)[number];

const PAYNOW_HOSTS: ReadonlySet<string> = new Set(["www.paynow.co.zw", "paynow.co.zw"]);
const SUPPORTED_METHODS: ReadonlySet<string> = new Set(["ecocash", "onemoney", "innbucks", "zimswitch", "card"]);
const DEFAULT_TIMEOUT_MS = 20_000;
const MAX_MESSAGE_BYTES = 16_384;
const DEFAULT_MOBILE_INSTRUCTIONS = "Check your phone and approve the payment prompt to finish.";
const DEFAULT_INNBUCKS_INSTRUCTIONS =
  "Paynow generated an InnBucks authorization code. Open the InnBucks app and enter the code to authorize this payment, then return here to check for payment.";
const INNBUCKS_DEEP_LINK_PREFIX = "com.innbucks.customer://purchase?paymentToken=";
const uuidSchema = z.uuid();

/** A Paynow protocol or transport failure. The message is safe for logs (no keys, no contact details). */
export class PaynowError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaynowError";
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Pure helpers (exported for tests)
// ---------------------------------------------------------------------------------------------------------------------

/** Paynow message hash: upper-case hex SHA-512 of `values.join("") + integrationKey`. */
export function paynowHash(values: readonly string[], integrationKey: string): string {
  return createHash("sha512").update(`${values.join("")}${integrationKey}`, "utf8").digest("hex").toUpperCase();
}

type Fields = readonly (readonly [string, string])[];

/** Hash of a message's fields in order, skipping the `hash` field itself. */
export function paynowFieldsHash(fields: Fields, integrationKey: string): string {
  return paynowHash(
    fields.filter(([key]) => key.toLowerCase() !== "hash").map(([, value]) => value),
    integrationKey,
  );
}

/** True when the message carries a `hash` equal (constant time, case-insensitive) to the hash of its other fields. */
export function verifyPaynowFields(fields: Fields, integrationKey: string): boolean {
  const provided = fields.find(([key]) => key.toLowerCase() === "hash")?.[1]?.trim();
  if (!provided || !/^[0-9a-fA-F]{128}$/.test(provided)) return false;
  return timingSafeEqualStr(paynowFieldsHash(fields, integrationKey), provided.toUpperCase());
}

/** Parses an urlencoded Paynow message, keeping field order (the hash depends on it). */
export function parsePaynowMessage(text: string): [string, string][] {
  return [...new URLSearchParams(text).entries()];
}

function fieldMap(fields: Fields): Map<string, string> {
  const map = new Map<string, string>();
  for (const [key, value] of fields) {
    const lower = key.toLowerCase();
    if (!map.has(lower)) map.set(lower, value);
  }
  return map;
}

/** Integer minor units -> Paynow decimal string with 2 dp (500 -> "5.00"). Integer arithmetic, no float rounding. */
export function formatPaynowAmount(amountMinor: number): string {
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw new RangeError("amountMinor must be a positive integer");
  return `${Math.floor(amountMinor / 100)}.${String(amountMinor % 100).padStart(2, "0")}`;
}

/** Paynow decimal string -> integer minor units ("5.00" -> 500, "5" -> 500, "5.5" -> 550); `null` when malformed. */
export function parsePaynowAmount(value: string | undefined | null): number | null {
  const match = /^\s*(\d{1,12})(?:\.(\d{1,2}))?\s*$/.exec(value ?? "");
  if (!match?.[1]) return null;
  const minor = Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0"));
  return Number.isSafeInteger(minor) ? minor : null;
}

/** Normalised Paynow status (see module doc). */
export function mapPaynowStatus(raw: string): { status: ProviderPaymentStatus | null; disputed: boolean } {
  const normalised = raw.trim().toLowerCase().replace(/\s+/g, " ");
  switch (normalised) {
    case "paid":
    case "awaiting delivery":
    case "delivered":
      return { status: "PAID", disputed: false };
    case "cancelled":
    case "canceled":
      return { status: "CANCELLED", disputed: false };
    case "failed":
      return { status: "FAILED", disputed: false };
    case "refunded":
      return { status: "REFUNDED", disputed: false };
    case "created":
    case "sent":
      return { status: "PENDING", disputed: false };
    case "disputed":
      return { status: null, disputed: true };
    default:
      return { status: null, disputed: false };
  }
}

/** Zimbabwe mobile number in Paynow's local format "07XXXXXXXX" (from E.164 "+2637…", "2637…" or local); else `null`. */
export function toPaynowPhone(phone: string | null | undefined): string | null {
  const digits = (phone ?? "").replace(/[\s()-]/g, "");
  let local: string;
  if (digits.startsWith("+263")) local = `0${digits.slice(4)}`;
  else if (digits.startsWith("263")) local = `0${digits.slice(3)}`;
  else local = digits;
  return /^07\d{8}$/.test(local) ? local : null;
}

/** `url` when it is an https URL on a Paynow host, else `null` (poll URLs are fetched server-side: no SSRF). */
export function validPaynowUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== "https:" || !PAYNOW_HOSTS.has(parsed.hostname.toLowerCase())) return null;
    if (parsed.username || parsed.password || (parsed.port !== "" && parsed.port !== "443")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

/** Paynow transaction GUID from a poll URL (`…?guid=…`), lower-cased; `null` when absent. */
export function paynowGuidFromPollUrl(pollUrl: string | null | undefined): string | null {
  const valid = validPaynowUrl(pollUrl);
  if (!valid) return null;
  const guid = new URL(valid).searchParams.get("guid")?.trim();
  return guid && /^[0-9A-Fa-f-]{8,64}$/.test(guid) ? guid.toLowerCase() : null;
}

/** A parsed, hash-verified status message (result-URL post or poll answer). */
interface PaynowStatusMessage {
  reference: string;
  paynowReference: string | null;
  amountMinor: number | null;
  rawStatus: string;
  status: ProviderPaymentStatus | null;
  disputed: boolean;
  pollUrl: string | null;
}

function readStatusMessage(fields: Fields): PaynowStatusMessage | null {
  const map = fieldMap(fields);
  const reference = map.get("reference")?.trim();
  const rawStatus = map.get("status")?.trim();
  if (!reference || !rawStatus || reference.length > 255 || rawStatus.length > 64) return null;
  const mapped = mapPaynowStatus(rawStatus);
  const paynowReference = map.get("paynowreference")?.trim() || null;
  return {
    reference,
    paynowReference: paynowReference && paynowReference.length <= 64 ? paynowReference : null,
    amountMinor: parsePaynowAmount(map.get("amount")),
    rawStatus,
    status: mapped.status,
    disputed: mapped.disputed,
    pollUrl: validPaynowUrl(map.get("pollurl")),
  };
}

/**
 * Synthetic event id: (reference, status, paynowreference, amount). A replay of the same message collides (deduped);
 * a different fact (new status, or a corrected amount after a mismatch) is a new event.
 */
function statusEventId(message: PaynowStatusMessage): string {
  return syntheticEventId("paynow", [
    message.reference,
    message.rawStatus.toLowerCase(),
    message.paynowReference ?? "-",
    message.amountMinor === null ? "-" : String(message.amountMinor),
  ]);
}

function statusPayload(message: PaynowStatusMessage, source: "result_url" | "poll"): Record<string, unknown> {
  return {
    source,
    reference: message.reference,
    paynowReference: message.paynowReference,
    status: message.rawStatus,
    amountMinor: message.amountMinor,
  };
}

interface InnbucksCheckoutDetails {
  instructions: string;
  metadata: Record<string, string>;
}

function innbucksCheckoutDetails(map: Map<string, string>, base: string): InnbucksCheckoutDetails {
  const authorizationCode = map.get("authorizationcode")?.trim();
  const authorizationExpires = map.get("authorizationexpires")?.trim();
  const returnedDeepLinkUrl = map.get("deeplinkurl")?.trim();
  const deepLinkUrl =
    returnedDeepLinkUrl && returnedDeepLinkUrl.startsWith(INNBUCKS_DEEP_LINK_PREFIX)
      ? returnedDeepLinkUrl
      : authorizationCode
        ? `${INNBUCKS_DEEP_LINK_PREFIX}${encodeURIComponent(authorizationCode)}`
        : null;
  const lines = [base || DEFAULT_INNBUCKS_INSTRUCTIONS];
  if (authorizationCode) lines.push(`InnBucks authorization code: ${authorizationCode}.`);
  lines.push("Authorize it in the InnBucks app, or dial *569# and enter the code.");
  if (authorizationExpires) lines.push(`Code expires: ${authorizationExpires}.`);
  if (deepLinkUrl) lines.push("If you are on your phone, use the Open InnBucks app button.");
  const metadata: Record<string, string> = { mobilePromptKind: "innbucks_code" };
  if (authorizationCode) metadata.innbucksAuthorizationCode = authorizationCode;
  if (authorizationExpires) metadata.innbucksAuthorizationExpires = authorizationExpires;
  if (deepLinkUrl) metadata.innbucksDeepLinkUrl = deepLinkUrl;
  return { instructions: lines.join(" ").slice(0, 500), metadata };
}

// ---------------------------------------------------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------------------------------------------------

export interface PaynowConfig {
  integrationId: string;
  integrationKey: string;
  /** ISO 4217 currency of this integration (Paynow integrations are per currency). Default "USD". */
  currency?: string;
  /** Merchant account email: the required `authemail` in test mode, and the fallback for mobile checkout. */
  merchantEmail?: string;
  /** The integration is in Paynow test mode (forces `authemail` = merchant email). */
  testMode?: boolean;
  initiateUrl?: string;
  remoteUrl?: string;
  /** Injected transport (tests); defaults to the global `fetch` at call time. */
  fetch?: typeof fetch;
  timeoutMs?: number;
}

interface ResolvedPaynowConfig {
  integrationId: string;
  integrationKey: string;
  currency: string;
  merchantEmail: string | null;
  testMode: boolean;
  initiateUrl: string;
  remoteUrl: string;
  fetch: typeof fetch;
  timeoutMs: number;
}

class PaynowProvider implements PaymentProvider {
  readonly id = "paynow" as const;
  readonly displayName = "Paynow (EcoCash, OneMoney, InnBucks, ZimSwitch, cards)";
  readonly #config: ResolvedPaynowConfig;

  constructor(config: ResolvedPaynowConfig) {
    this.#config = config;
  }

  supports(currency: string, method?: PaymentMethod): boolean {
    return currency === this.#config.currency && (method === undefined || SUPPORTED_METHODS.has(method));
  }

  /** `authemail` to send: the merchant email in test mode; for mobile checkout the payer's (or merchant) email. */
  #authEmail(payerEmail: string | undefined, mobile: boolean): string | null {
    if (this.#config.testMode) {
      if (!this.#config.merchantEmail) throw new PaynowError("Paynow test mode needs the merchant email as authemail");
      return this.#config.merchantEmail;
    }
    if (!mobile) return null; // web checkout: the payer types their details on Paynow's page (data minimisation)
    return payerEmail?.trim() || this.#config.merchantEmail;
  }

  async #post(url: string, body: URLSearchParams | null): Promise<[string, string][]> {
    let response: Response;
    try {
      response = await this.#config.fetch(url, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded", accept: "*/*" },
        body: body === null ? "" : body.toString(),
        redirect: "error",
        signal: AbortSignal.timeout(this.#config.timeoutMs),
      });
    } catch (error) {
      throw new PaynowError(`Paynow request failed: ${error instanceof Error ? error.name : "network error"}`);
    }
    const text = await response.text();
    if (!response.ok) throw new PaynowError(`Paynow answered HTTP ${response.status}`);
    if (text.length > MAX_MESSAGE_BYTES) throw new PaynowError("Paynow response too large");
    return parsePaynowMessage(text);
  }

  async createCheckout(input: CheckoutRequest): Promise<CheckoutResult> {
    if (!uuidSchema.safeParse(input.paymentId).success) throw new RangeError("createCheckout: paymentId must be a uuid");
    if (!this.supports(input.currency)) throw new RangeError(`createCheckout: this Paynow integration charges ${this.#config.currency}`);
    const mobile = input.method !== undefined && MOBILE_MONEY_METHODS.has(input.method);

    const fields: [string, string][] = [
      ["id", this.#config.integrationId],
      ["reference", input.paymentId],
      ["amount", formatPaynowAmount(input.amountMinor)],
      ["additionalinfo", input.description.trim().slice(0, 200)],
      ["returnurl", input.returnUrl],
      ["resulturl", input.webhookUrl],
    ];
    const authEmail = this.#authEmail(input.payer.email, mobile);
    if (authEmail) fields.push(["authemail", authEmail]);
    if (mobile) {
      if (!authEmail) throw new PaynowError("Paynow mobile checkout needs an auth email");
      const phone = toPaynowPhone(input.payer.phone);
      if (!phone) throw new RangeError("createCheckout: a Zimbabwe mobile number is required for mobile money");
      fields.push(["phone", phone], ["method", input.method as string]);
    }
    fields.push(["status", "Message"]);
    fields.push(["hash", paynowFieldsHash(fields, this.#config.integrationKey)]);

    const answer = await this.#post(mobile ? this.#config.remoteUrl : this.#config.initiateUrl, new URLSearchParams(fields));
    const map = fieldMap(answer);
    if (map.get("status")?.trim().toLowerCase() !== "ok") {
      const reason = scrubString(map.get("error") ?? "no reason given").slice(0, 200);
      throw new PaynowError(`Paynow refused the transaction: ${reason}`);
    }
    if (!verifyPaynowFields(answer, this.#config.integrationKey)) throw new PaynowError("Paynow response hash mismatch");
    const pollUrl = validPaynowUrl(map.get("pollurl"));
    if (!pollUrl) throw new PaynowError("Paynow response has no valid poll URL");
    const providerRef = paynowGuidFromPollUrl(pollUrl) ?? `paynow_${input.paymentId}`;

    if (mobile) {
      const instructions =
        (map.get("instructions") ?? "").trim().slice(0, 500) || (input.method === "innbucks" ? DEFAULT_INNBUCKS_INSTRUCTIONS : DEFAULT_MOBILE_INSTRUCTIONS);
      if (input.method === "innbucks") {
        const details = innbucksCheckoutDetails(map, instructions);
        return {
          kind: "mobile_prompt",
          instructions: details.instructions,
          providerRef,
          pollUrl,
          metadata: details.metadata,
        };
      }
      return {
        kind: "mobile_prompt",
        instructions,
        providerRef,
        pollUrl,
      };
    }
    const browserUrl = validPaynowUrl(map.get("browserurl"));
    if (!browserUrl) throw new PaynowError("Paynow response has no valid browser URL");
    return { kind: "redirect", url: browserUrl, providerRef, pollUrl };
  }

  async verifyWebhook(request: WebhookRequest): Promise<VerifiedProviderEvent | null> {
    try {
      if (request.rawBody.length === 0 || request.rawBody.length > MAX_MESSAGE_BYTES) return null;
      const fields = parsePaynowMessage(request.rawBody);
      if (!verifyPaynowFields(fields, this.#config.integrationKey)) return null;
      const message = readStatusMessage(fields);
      if (!message) return null;
      return {
        providerEventId: statusEventId(message),
        eventType: PAYNOW_EVENT_TYPE,
        paymentId: uuidSchema.safeParse(message.reference).success ? message.reference.toLowerCase() : null,
        providerRef: message.pollUrl ? paynowGuidFromPollUrl(message.pollUrl) : null,
        status: message.status,
        providerStatus: message.rawStatus,
        amountMinor: message.amountMinor,
        currency: this.#config.currency,
        failureCode: null,
        occurredAt: null,
        payload: statusPayload(message, "result_url"),
        disputed: message.disputed,
        pollUrl: message.pollUrl,
        ...(message.paynowReference ? { metadata: { paynowReference: message.paynowReference } } : {}),
      };
    } catch {
      return null; // malformed body: reject, never throw
    }
  }

  async poll(payment: { providerRef: string; pollUrl?: string | null }): Promise<ProviderPollResult> {
    const pollUrl = validPaynowUrl(payment.pollUrl);
    if (!pollUrl) {
      return {
        providerEventId: syntheticEventId("paynow", ["poll", payment.providerRef || "-", "unknown"]),
        status: "PENDING",
        providerStatus: "UNKNOWN",
        amountMinor: null,
        currency: null,
        failureCode: null,
        payload: { source: "poll", known: false },
      };
    }
    const answer = await this.#post(pollUrl, null);
    const map = fieldMap(answer);
    if (map.get("status")?.trim().toLowerCase() === "error") {
      throw new PaynowError(`Paynow poll failed: ${scrubString(map.get("error") ?? "no reason given").slice(0, 200)}`);
    }
    if (!verifyPaynowFields(answer, this.#config.integrationKey)) throw new PaynowError("Paynow poll response hash mismatch");
    const message = readStatusMessage(answer);
    if (!message) throw new PaynowError("Paynow poll response is incomplete");
    return {
      providerEventId: statusEventId(message),
      // Unknown statuses are informational (PENDING = no state change).
      status: message.status ?? "PENDING",
      providerStatus: message.rawStatus,
      amountMinor: message.amountMinor,
      currency: this.#config.currency,
      failureCode: null,
      payload: statusPayload(message, "poll"),
      disputed: message.disputed,
      ...(message.paynowReference ? { metadata: { paynowReference: message.paynowReference } } : {}),
    };
  }

  async refund(input: RefundRequest): Promise<RefundResult> {
    void input; // Paynow has no refund API: staff refund in the Paynow dashboard and record it (VERIFY before go-live).
    return { status: "MANUAL_REQUIRED" };
  }
}

/**
 * Creates the Paynow adapter.
 *
 * @throws Error when the configuration is incomplete (missing id/key, invalid currency or test mode without email)
 */
export function createPaynowProvider(config: PaynowConfig): PaymentProvider {
  const integrationId = config.integrationId.trim();
  const integrationKey = config.integrationKey.trim();
  if (!integrationId || !integrationKey) throw new Error("Paynow: integration id and key are required");
  const currency = (config.currency ?? "USD").trim().toUpperCase();
  if (!isCurrencyCode(currency)) throw new Error("Paynow: currency must be an ISO 4217 code");
  const merchantEmail = config.merchantEmail?.trim() || null;
  if (config.testMode && !merchantEmail) throw new Error("Paynow: test mode needs the merchant email (authemail)");
  return new PaynowProvider({
    integrationId,
    integrationKey,
    currency,
    merchantEmail,
    testMode: config.testMode ?? false,
    initiateUrl: config.initiateUrl ?? PAYNOW_INITIATE_URL,
    remoteUrl: config.remoteUrl ?? PAYNOW_REMOTE_URL,
    fetch: config.fetch ?? ((input, init) => globalThis.fetch(input, init)),
    timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  });
}

/** True for a Paynow mobile express checkout method. */
export function isPaynowMobileMethod(value: string): value is PaynowMobileMethod {
  return (PAYNOW_MOBILE_METHODS as readonly string[]).includes(value);
}
