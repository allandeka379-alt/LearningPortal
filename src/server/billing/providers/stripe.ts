import "server-only";
import { createHmac } from "node:crypto";
import { z } from "zod";
import { timingSafeEqualStr } from "@/server/lib/crypto";
import {
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
 * Stripe adapter (international cards; ARCHITECTURE §7.1) over the REST API with `fetch` (no SDK): `Authorization:
 * Bearer STRIPE_SECRET_KEY`, form-encoded bodies, JSON answers.
 *
 * One-off Checkout Sessions (`mode=payment`), never Stripe Billing subscriptions: we run our own prepaid subscription
 * periods (ARCHITECTURE §7.5) because Paynow / mobile money has no recurring debit, so BOTH providers share one model:
 * every period (first purchase or renewal) is a new checkout -> one Payment -> `activateSubscriptionFromPayment`
 * extends the period. That keeps entitlements, receipts, refunds and reconciliation provider-agnostic. Card
 * auto-renewal can be added later as "Stripe charges a saved payment method into a new Payment" without changing the
 * subscription model.
 *
 * - Checkout Session: line_items[0][price_data][currency|unit_amount|product_data][name], quantity 1, success_url =
 *   our return route, cancel_url = the same route with `cancelled=1`, client_reference_id = metadata[paymentId] =
 *   our Payment id (also on the PaymentIntent, so charge/refund/dispute events can be linked). Idempotency-Key
 *   `checkout_<paymentId>`: a retry of the same payment never opens a second session.
 * - Webhooks: `Stripe-Signature: t=<unix>,v1=<hex>[,v1=…]`, v1 = HMAC-SHA256(STRIPE_WEBHOOK_SECRET, `${t}.${rawBody}`)
 *   over the RAW body, constant-time comparison against every v1 (secret rotation), 300 s tolerance.
 * - Events: checkout.session.completed (payment_status "paid" -> PAID, "unpaid" = async method still pending),
 *   checkout.session.async_payment_succeeded -> PAID, checkout.session.expired -> CANCELLED,
 *   checkout.session.async_payment_failed -> FAILED, charge.refunded -> REFUNDED (full) or a partial-refund amount,
 *   charge.dispute.created -> disputed flag. Anything else is acknowledged as informational.
 * - Payloads returned to callers are whitelisted: no customer details, emails, addresses or card data.
 *
 * Amounts: Stripe `unit_amount` is in the currency's smallest unit, which equals our minor units for the 2-decimal
 * currencies this adapter accepts ({@link STRIPE_DEFAULT_CURRENCIES}). Zero-decimal currencies are refused.
 *
 * Go-live checks: pin the API version (`apiVersion` / the webhook endpoint's version in the Dashboard), subscribe the
 * endpoint to exactly the events above, and confirm the business entity can use Stripe (Stripe does not onboard
 * Zimbabwe-registered businesses, ARCHITECTURE §7.1).
 */

export const STRIPE_API_BASE = "https://api.stripe.com/v1";
export const STRIPE_SIGNATURE_HEADER = "stripe-signature";
export const STRIPE_WEBHOOK_TOLERANCE_SECONDS = 300;
/** 2-decimal currencies accepted by default (ZWG is not offered by Stripe). */
export const STRIPE_DEFAULT_CURRENCIES = ["USD", "ZAR", "GBP", "EUR", "BWP", "ZMW"] as const;

const DEFAULT_TIMEOUT_MS = 20_000;
const MAX_WEBHOOK_BYTES = 512 * 1024;
const uuidSchema = z.uuid();

/** A Stripe API or transport failure. The message never contains the secret key or customer data. */
export class StripeApiError extends Error {
  readonly httpStatus: number | null;
  readonly stripeCode: string | null;

  constructor(message: string, httpStatus: number | null = null, stripeCode: string | null = null) {
    super(message);
    this.name = "StripeApiError";
    this.httpStatus = httpStatus;
    this.stripeCode = stripeCode;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Signatures (pure, exported for tests)
// ---------------------------------------------------------------------------------------------------------------------

/** v1 signature: hex HMAC-SHA256 of `${timestamp}.${rawBody}` keyed with the endpoint secret. */
export function signStripePayload(secret: string, timestamp: number | string, rawBody: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest("hex");
}

/** A `Stripe-Signature` header value for `rawBody` (tests and local tooling). */
export function stripeSignatureHeader(secret: string, rawBody: string, timestampSeconds: number): string {
  return `t=${timestampSeconds},v1=${signStripePayload(secret, timestampSeconds, rawBody)}`;
}

/**
 * Verifies a `Stripe-Signature` header: a numeric `t` within `toleranceSeconds` of `nowSeconds` and at least one `v1`
 * matching (constant time). Never throws.
 */
export function verifyStripeSignature(
  header: string | null | undefined,
  rawBody: string,
  secret: string,
  nowSeconds: number,
  toleranceSeconds: number = STRIPE_WEBHOOK_TOLERANCE_SECONDS,
): boolean {
  if (!header || header.length > 2048 || !secret) return false;
  let timestamp: string | null = null;
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const index = part.indexOf("=");
    if (index <= 0) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === "t" && timestamp === null) timestamp = value;
    else if (key === "v1" && /^[0-9a-f]{64}$/i.test(value)) signatures.push(value.toLowerCase());
  }
  if (timestamp === null || !/^\d{1,12}$/.test(timestamp) || signatures.length === 0) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > toleranceSeconds) return false;
  const expected = signStripePayload(secret, timestamp, rawBody);
  // Compare against every candidate without short-circuiting.
  let matched = false;
  for (const signature of signatures) if (timingSafeEqualStr(expected, signature)) matched = true;
  return matched;
}

// ---------------------------------------------------------------------------------------------------------------------
// API shapes (only the fields we read)
// ---------------------------------------------------------------------------------------------------------------------

const metadataSchema = z.record(z.string(), z.string()).nullish();
const expandableId = z.union([z.string(), z.looseObject({ id: z.string() })]).nullish();

const sessionSchema = z.looseObject({
  id: z.string().min(1).max(255),
  object: z.literal("checkout.session").optional(),
  url: z.string().nullish(),
  status: z.string().nullish(),
  payment_status: z.string().nullish(),
  amount_total: z.number().int().nullish(),
  currency: z.string().nullish(),
  client_reference_id: z.string().nullish(),
  metadata: metadataSchema,
  payment_intent: expandableId,
});
type StripeSession = z.infer<typeof sessionSchema>;

const chargeSchema = z.looseObject({
  id: z.string(),
  amount: z.number().int(),
  amount_refunded: z.number().int(),
  currency: z.string(),
  refunded: z.boolean(),
  payment_intent: expandableId,
  metadata: metadataSchema,
});

const disputeSchema = z.looseObject({
  id: z.string(),
  amount: z.number().int().nullish(),
  currency: z.string().nullish(),
  status: z.string().nullish(),
  reason: z.string().nullish(),
  payment_intent: expandableId,
  charge: expandableId,
});

const eventSchema = z.looseObject({
  id: z.string().min(1).max(255),
  type: z.string().min(1).max(128),
  created: z.number().int().nonnegative(),
  data: z.looseObject({ object: z.record(z.string(), z.unknown()) }),
});
type StripeEvent = z.infer<typeof eventSchema>;

const sessionListSchema = z.looseObject({ data: z.array(sessionSchema) });
const refundSchema = z.looseObject({ id: z.string(), status: z.string().nullish() });

function idOf(value: z.infer<typeof expandableId>): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

function paymentIdFrom(...candidates: (string | null | undefined)[]): string | null {
  for (const candidate of candidates) {
    if (candidate && uuidSchema.safeParse(candidate).success) return candidate.toLowerCase();
  }
  return null;
}

function upperCurrency(value: string | null | undefined): string | null {
  const upper = value?.trim().toUpperCase();
  return upper && isCurrencyCode(upper) ? upper : null;
}

/** Normalised status of a Checkout Session (poll and session events). */
export function mapStripeSession(session: Pick<StripeSession, "status" | "payment_status">): {
  status: ProviderPaymentStatus;
  failureCode: string | null;
} {
  if (session.status === "expired") return { status: "CANCELLED", failureCode: "expired" };
  if (session.status === "complete" && session.payment_status === "paid") return { status: "PAID", failureCode: null };
  return { status: "PENDING", failureCode: null };
}

function sessionPayload(eventId: string | null, type: string, session: StripeSession): Record<string, unknown> {
  return {
    ...(eventId ? { eventId } : {}),
    type,
    sessionId: session.id,
    status: session.status ?? null,
    paymentStatus: session.payment_status ?? null,
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
    paymentIntent: idOf(session.payment_intent),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------------------------------------------------

export interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
  apiBase?: string;
  /** Pins `Stripe-Version` (recommended before go-live). Default: the account's version. */
  apiVersion?: string;
  /** Accepted ISO currencies (2-decimal only). Default {@link STRIPE_DEFAULT_CURRENCIES}. */
  currencies?: readonly string[];
  /** Injected transport (tests); defaults to the global `fetch` at call time. */
  fetch?: typeof fetch;
  now?: () => Date;
  timeoutMs?: number;
}

interface ResolvedStripeConfig {
  secretKey: string;
  webhookSecret: string;
  apiBase: string;
  apiVersion: string | null;
  currencies: ReadonlySet<string>;
  fetch: typeof fetch;
  now: () => Date;
  timeoutMs: number;
}

class StripeProvider implements PaymentProvider {
  readonly id = "stripe" as const;
  readonly displayName = "Card (Stripe)";
  readonly #config: ResolvedStripeConfig;

  constructor(config: ResolvedStripeConfig) {
    this.#config = config;
  }

  supports(currency: string, method?: PaymentMethod): boolean {
    return this.#config.currencies.has(currency) && (method === undefined || method === "card");
  }

  async #request<S extends z.ZodType>(
    method: "GET" | "POST",
    path: string,
    schema: S,
    options: { body?: URLSearchParams; idempotencyKey?: string } = {},
  ): Promise<z.output<S>> {
    const headers: Record<string, string> = { authorization: `Bearer ${this.#config.secretKey}`, accept: "application/json" };
    if (options.body) headers["content-type"] = "application/x-www-form-urlencoded";
    if (options.idempotencyKey) headers["idempotency-key"] = options.idempotencyKey;
    if (this.#config.apiVersion) headers["stripe-version"] = this.#config.apiVersion;
    let response: Response;
    try {
      response = await this.#config.fetch(`${this.#config.apiBase}${path}`, {
        method,
        headers,
        ...(options.body ? { body: options.body.toString() } : {}),
        redirect: "error",
        signal: AbortSignal.timeout(this.#config.timeoutMs),
      });
    } catch (error) {
      throw new StripeApiError(`Stripe request failed: ${error instanceof Error ? error.name : "network error"}`);
    }
    let json: unknown;
    try {
      json = await response.json();
    } catch {
      throw new StripeApiError(`Stripe answered HTTP ${response.status} with a non-JSON body`, response.status);
    }
    if (!response.ok) {
      const error = z.looseObject({ error: z.looseObject({ type: z.string().nullish(), code: z.string().nullish() }) }).safeParse(json);
      const type = error.success ? (error.data.error.type ?? "unknown") : "unknown";
      const code = error.success ? (error.data.error.code ?? null) : null;
      throw new StripeApiError(`Stripe API error (HTTP ${response.status}, ${type}${code ? `/${code}` : ""})`, response.status, code);
    }
    const parsed = schema.safeParse(json);
    if (!parsed.success) throw new StripeApiError("Stripe answered with an unexpected shape", response.status);
    return parsed.data;
  }

  async createCheckout(input: CheckoutRequest): Promise<CheckoutResult> {
    if (!uuidSchema.safeParse(input.paymentId).success) throw new RangeError("createCheckout: paymentId must be a uuid");
    if (!Number.isSafeInteger(input.amountMinor) || input.amountMinor <= 0) throw new RangeError("createCheckout: amountMinor must be > 0");
    if (!this.supports(input.currency)) throw new RangeError(`createCheckout: Stripe is not configured for ${input.currency}`);
    const cancelUrl = new URL(input.returnUrl);
    cancelUrl.searchParams.set("cancelled", "1");
    const body = new URLSearchParams([
      ["mode", "payment"],
      ["client_reference_id", input.paymentId],
      ["metadata[paymentId]", input.paymentId],
      ["payment_intent_data[metadata][paymentId]", input.paymentId],
      ["line_items[0][quantity]", "1"],
      ["line_items[0][price_data][currency]", input.currency.toLowerCase()],
      ["line_items[0][price_data][unit_amount]", String(input.amountMinor)],
      ["line_items[0][price_data][product_data][name]", input.description.trim().slice(0, 200) || "Payment"],
      ["success_url", input.returnUrl],
      ["cancel_url", cancelUrl.toString()],
    ]);
    if (input.payer.email) body.set("customer_email", input.payer.email);
    const session = await this.#request("POST", "/checkout/sessions", sessionSchema, {
      body,
      idempotencyKey: `checkout_${input.paymentId}`,
    });
    if (!session.url || !session.url.startsWith("https://")) throw new StripeApiError("Stripe session has no https checkout URL");
    return { kind: "redirect", url: session.url, providerRef: session.id };
  }

  /** Our payment id (and session id) for a PaymentIntent: its metadata, else the session that created it. */
  async #linkPaymentIntent(
    paymentIntentId: string | null,
    metadata: Record<string, string> | null | undefined,
  ): Promise<{ paymentId: string | null; sessionId: string | null }> {
    const fromMetadata = paymentIdFrom(metadata?.paymentId);
    if (fromMetadata || !paymentIntentId) return { paymentId: fromMetadata, sessionId: null };
    try {
      const list = await this.#request(
        "GET",
        `/checkout/sessions?payment_intent=${encodeURIComponent(paymentIntentId)}&limit=1`,
        sessionListSchema,
      );
      const session = list.data[0];
      if (!session) return { paymentId: null, sessionId: null };
      return { paymentId: paymentIdFrom(session.client_reference_id, session.metadata?.paymentId), sessionId: session.id };
    } catch {
      return { paymentId: null, sessionId: null }; // stored unmatched; staff can link it
    }
  }

  async #toVerifiedEvent(event: StripeEvent): Promise<VerifiedProviderEvent | null> {
    const base = {
      providerEventId: event.id,
      eventType: event.type.slice(0, 64),
      occurredAt: new Date(event.created * 1000),
    };
    const object = event.data.object;
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
      case "checkout.session.expired":
      case "checkout.session.async_payment_failed": {
        const parsed = sessionSchema.safeParse(object);
        if (!parsed.success) return null;
        const session = parsed.data;
        let status: ProviderPaymentStatus | null;
        let failureCode: string | null = null;
        if (event.type === "checkout.session.expired") {
          status = "CANCELLED";
          failureCode = "expired";
        } else if (event.type === "checkout.session.async_payment_failed") {
          status = "FAILED";
          failureCode = "async_payment_failed";
        } else if (event.type === "checkout.session.async_payment_succeeded" || session.payment_status === "paid") {
          status = "PAID";
        } else {
          status = session.payment_status === "unpaid" ? "PENDING" : null;
        }
        const paymentIntent = idOf(session.payment_intent);
        return {
          ...base,
          paymentId: paymentIdFrom(session.client_reference_id, session.metadata?.paymentId),
          providerRef: session.id,
          status,
          providerStatus: `${session.status ?? "unknown"}/${session.payment_status ?? "unknown"}`.slice(0, 64),
          amountMinor: session.amount_total ?? null,
          currency: upperCurrency(session.currency),
          failureCode,
          payload: sessionPayload(event.id, event.type, session),
          ...(paymentIntent ? { metadata: { stripePaymentIntent: paymentIntent } } : {}),
        };
      }
      case "charge.refunded": {
        const parsed = chargeSchema.safeParse(object);
        if (!parsed.success) return null;
        const charge = parsed.data;
        const paymentIntent = idOf(charge.payment_intent);
        const link = await this.#linkPaymentIntent(paymentIntent, charge.metadata);
        return {
          ...base,
          paymentId: link.paymentId,
          providerRef: link.sessionId,
          status: charge.refunded ? "REFUNDED" : null,
          providerStatus: charge.refunded ? "refunded" : "partially_refunded",
          amountMinor: charge.amount,
          currency: upperCurrency(charge.currency),
          failureCode: null,
          refundedAmountMinor: charge.amount_refunded,
          payload: {
            eventId: event.id,
            type: event.type,
            chargeId: charge.id,
            paymentIntent,
            amount: charge.amount,
            amountRefunded: charge.amount_refunded,
            currency: charge.currency,
            refunded: charge.refunded,
          },
        };
      }
      case "charge.dispute.created": {
        const parsed = disputeSchema.safeParse(object);
        if (!parsed.success) return null;
        const dispute = parsed.data;
        const paymentIntent = idOf(dispute.payment_intent);
        const link = await this.#linkPaymentIntent(paymentIntent, null);
        return {
          ...base,
          paymentId: link.paymentId,
          providerRef: link.sessionId,
          status: null,
          providerStatus: `dispute_${dispute.status ?? "created"}`.slice(0, 64),
          amountMinor: dispute.amount ?? null,
          currency: upperCurrency(dispute.currency),
          failureCode: null,
          disputed: true,
          payload: {
            eventId: event.id,
            type: event.type,
            disputeId: dispute.id,
            paymentIntent,
            chargeId: idOf(dispute.charge),
            amount: dispute.amount ?? null,
            reason: dispute.reason ?? null,
            status: dispute.status ?? null,
          },
          metadata: { disputeId: dispute.id.slice(0, 64) },
        };
      }
      default:
        // Authentic but not something we act on: acknowledged as informational.
        return {
          ...base,
          paymentId: null,
          providerRef: null,
          status: null,
          providerStatus: event.type.slice(0, 64),
          amountMinor: null,
          currency: null,
          failureCode: null,
          payload: { eventId: event.id, type: event.type },
        };
    }
  }

  async verifyWebhook(request: WebhookRequest): Promise<VerifiedProviderEvent | null> {
    try {
      if (request.rawBody.length === 0 || request.rawBody.length > MAX_WEBHOOK_BYTES) return null;
      const nowSeconds = Math.floor(this.#config.now().getTime() / 1000);
      const header = request.headers.get(STRIPE_SIGNATURE_HEADER);
      if (!verifyStripeSignature(header, request.rawBody, this.#config.webhookSecret, nowSeconds)) return null;
      const parsed = eventSchema.safeParse(JSON.parse(request.rawBody));
      if (!parsed.success) return null;
      return await this.#toVerifiedEvent(parsed.data);
    } catch {
      return null; // malformed JSON or headers: reject, never throw
    }
  }

  async poll(payment: { providerRef: string; pollUrl?: string | null }): Promise<ProviderPollResult> {
    if (!/^cs_[A-Za-z0-9_]{1,250}$/.test(payment.providerRef)) {
      return {
        providerEventId: syntheticEventId("stripe", ["poll", payment.providerRef || "-", "unknown"]),
        status: "PENDING",
        providerStatus: "UNKNOWN",
        amountMinor: null,
        currency: null,
        failureCode: null,
        payload: { known: false },
      };
    }
    const session = await this.#request("GET", `/checkout/sessions/${encodeURIComponent(payment.providerRef)}`, sessionSchema);
    const mapped = mapStripeSession(session);
    const paymentIntent = idOf(session.payment_intent);
    return {
      providerEventId: syntheticEventId("stripe", ["poll", session.id, mapped.status]),
      status: mapped.status,
      providerStatus: `${session.status ?? "unknown"}/${session.payment_status ?? "unknown"}`.slice(0, 64),
      amountMinor: session.amount_total ?? null,
      currency: upperCurrency(session.currency),
      failureCode: mapped.failureCode,
      payload: sessionPayload(null, "poll", session),
      ...(paymentIntent ? { metadata: { stripePaymentIntent: paymentIntent } } : {}),
    };
  }

  /**
   * Refunds (part of) the session's payment. The caller (staff refund flow) has already checked the amount with the
   * state machine and records the result as REFUND_RECORDED; the `charge.refunded` webhook then confirms it
   * idempotently (cumulative amounts).
   */
  async refund(input: RefundRequest): Promise<RefundResult> {
    if (!Number.isSafeInteger(input.amountMinor) || input.amountMinor <= 0) throw new RangeError("refund: amountMinor must be > 0");
    const session = await this.#request("GET", `/checkout/sessions/${encodeURIComponent(input.providerRef)}`, sessionSchema);
    const paymentIntent = idOf(session.payment_intent);
    if (!paymentIntent) return { status: "MANUAL_REQUIRED" };
    const body = new URLSearchParams([
      ["payment_intent", paymentIntent],
      ["amount", String(input.amountMinor)],
      ["reason", "requested_by_customer"],
      ["metadata[reason]", input.reason.trim().slice(0, 200)],
    ]);
    const refund = await this.#request("POST", "/refunds", refundSchema, { body });
    return { status: refund.status === "succeeded" ? "REFUNDED" : "PENDING", providerRef: refund.id };
  }
}

/**
 * Creates the Stripe adapter.
 *
 * @throws Error when keys are missing or a configured currency is not an ISO code
 */
export function createStripeProvider(config: StripeConfig): PaymentProvider {
  const secretKey = config.secretKey.trim();
  const webhookSecret = config.webhookSecret.trim();
  if (!secretKey || !webhookSecret) throw new Error("Stripe: secret key and webhook secret are required");
  const currencies = (config.currencies ?? STRIPE_DEFAULT_CURRENCIES).map((c) => c.trim().toUpperCase());
  if (currencies.some((c) => !isCurrencyCode(c))) throw new Error("Stripe: currencies must be ISO 4217 codes");
  return new StripeProvider({
    secretKey,
    webhookSecret,
    apiBase: (config.apiBase ?? STRIPE_API_BASE).replace(/\/+$/, ""),
    apiVersion: config.apiVersion?.trim() || null,
    currencies: new Set(currencies),
    fetch: config.fetch ?? ((input, init) => globalThis.fetch(input, init)),
    now: config.now ?? (() => new Date()),
    timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  });
}
