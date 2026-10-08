import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { z } from "zod";
import { timingSafeEqualStr } from "@/server/lib/crypto";
import { getEnv, isProd } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import {
  KNOWN_PAYMENT_METHODS,
  MOBILE_MONEY_METHODS,
  PROVIDER_PAYMENT_STATUSES,
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
 * Sandbox payment provider (ARCHITECTURE §7.1): a fake gateway for development and tests. NEVER available in
 * production: the env contract rejects `PAYMENTS_ENABLED_PROVIDERS=sandbox` when NODE_ENV=production, and this module
 * refuses to construct or simulate there as well (defence in depth).
 *
 * Flow:
 * 1. `createCheckout` records the payment in an in-process "provider ledger" and returns a redirect to the local
 *    confirmation page `/dev/sandbox-checkout/[paymentId]` (built in a later phase), or a mobile prompt for
 *    EcoCash / OneMoney so both checkout UIs can be exercised.
 * 2. That page (or a test) calls {@link simulateSandboxPayment} with an outcome (PAID / FAILED / CANCELLED / PENDING):
 *    it updates the ledger and returns a SIGNED webhook (`x-sandbox-signature` = HMAC-SHA256 over
 *    `"<timestamp>.<rawBody>"`, key derived from SESSION_SECRET) to POST to `/api/webhooks/payments/sandbox`.
 * 3. `verifyWebhook` checks the signature and a 5-minute timestamp window, so forged or replayed-late callbacks are
 *    rejected exactly like a real provider's. `poll` reads the ledger.
 *
 * The ledger is per process (dev runs one web process); a poll from another process sees PENDING, which is harmless
 * because the signed webhook carries the outcome.
 */

export const SANDBOX_CHECKOUT_PATH_PREFIX = "/dev/sandbox-checkout";
export const SANDBOX_SIGNATURE_HEADER = "x-sandbox-signature";
export const SANDBOX_TIMESTAMP_HEADER = "x-sandbox-timestamp";
export const SANDBOX_WEBHOOK_TOLERANCE_SECONDS = 300;
export const SANDBOX_EVENT_TYPE = "payment.status";
/** Outcomes the confirmation page can simulate. */
export const SANDBOX_OUTCOMES = ["PAID", "FAILED", "CANCELLED", "PENDING"] as const;
export type SandboxOutcome = (typeof SANDBOX_OUTCOMES)[number];

const MAX_LEDGER_ENTRIES = 10_000;
const uuidSchema = z.uuid();

/** App-relative URL of the local confirmation page for a payment. */
export function sandboxCheckoutPath(paymentId: string): string {
  if (!uuidSchema.safeParse(paymentId).success) throw new RangeError("sandboxCheckoutPath: paymentId must be a uuid");
  return `${SANDBOX_CHECKOUT_PATH_PREFIX}/${paymentId}`;
}

/** Provider reference the sandbox assigns to a payment (deterministic: createCheckout is idempotent). */
export function sandboxProviderRef(paymentId: string): string {
  return `sbx_${paymentId}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// In-process "provider side" ledger
// ---------------------------------------------------------------------------------------------------------------------

/** What the fake provider knows about a payment. */
export interface SandboxLedgerEntry {
  paymentId: string;
  providerRef: string;
  amountMinor: number;
  currency: string;
  status: ProviderPaymentStatus;
  failureCode: string | null;
  refundedMinor: number;
  returnUrl: string | null;
  method: PaymentMethod | null;
  updatedAt: Date;
}

const ledger = new Map<string, SandboxLedgerEntry>();

function remember(entry: SandboxLedgerEntry): void {
  ledger.delete(entry.providerRef);
  ledger.set(entry.providerRef, entry);
  while (ledger.size > MAX_LEDGER_ENTRIES) {
    const oldest = ledger.keys().next();
    if (oldest.done) break;
    ledger.delete(oldest.value);
  }
}

/** The fake provider's view of a payment (for the dev confirmation page), or `null` when this process never saw it. */
export function getSandboxCheckout(paymentId: string): SandboxLedgerEntry | null {
  const entry = ledger.get(sandboxProviderRef(paymentId));
  return entry ? { ...entry } : null;
}

/** Forgets every simulated payment. Tests only. */
export function resetSandboxLedger(): void {
  ledger.clear();
}

// ---------------------------------------------------------------------------------------------------------------------
// Signing
// ---------------------------------------------------------------------------------------------------------------------

function assertNotProduction(production: boolean): void {
  if (production) throw new Error("The sandbox payment provider is disabled in production.");
}

/** Webhook signing key, derived from the session secret so no extra secret has to be configured for development. */
function signingKey(secret: string): string {
  return createHmac("sha256", secret).update("payments:sandbox:webhook-signing-key").digest("hex");
}

function sign(secret: string, timestamp: string, rawBody: string): string {
  return createHmac("sha256", signingKey(secret)).update(`${timestamp}.${rawBody}`).digest("hex");
}

const webhookBodySchema = z.object({
  id: z.string().min(8).max(255),
  type: z.literal(SANDBOX_EVENT_TYPE),
  paymentId: z.uuid(),
  providerRef: z.string().min(1).max(255),
  status: z.enum(PROVIDER_PAYMENT_STATUSES),
  amountMinor: z.number().int().positive(),
  currency: z.string().regex(/^[A-Z]{3}$/),
  failureCode: z.string().max(64).nullable(),
  occurredAt: z.iso.datetime(),
});
/** JSON body of a sandbox webhook. */
export type SandboxWebhookBody = z.infer<typeof webhookBodySchema>;

interface SandboxConfig {
  appUrl: string;
  signingSecret: string;
  production: boolean;
  now: () => Date;
}

function resolveConfig(options: Partial<SandboxConfig>): SandboxConfig {
  const production = options.production ?? isProd();
  assertNotProduction(production);
  const needEnv = options.appUrl === undefined || options.signingSecret === undefined;
  const env = needEnv ? getEnv() : null;
  return {
    appUrl: (options.appUrl ?? env?.APP_URL ?? "").replace(/\/+$/, ""),
    signingSecret: options.signingSecret ?? env?.SESSION_SECRET ?? "",
    production,
    now: options.now ?? (() => new Date()),
  };
}

export interface SimulateSandboxPaymentInput {
  paymentId: string;
  outcome: SandboxOutcome;
  /** For FAILED / CANCELLED, e.g. "insufficient_funds". */
  failureCode?: string;
  /** Override what the "provider" reports (tests of amount-mismatch handling); defaults to the ledger entry. */
  amountMinor?: number;
  currency?: string;
}

/**
 * Simulates the payer's action on the fake gateway and returns the signed webhook it "sends". Deliver it to the
 * sandbox webhook route (or straight to the webhook processor in tests).
 *
 * @throws Error in production; AppError NOT_FOUND when the amount is unknown (payment not created in this process
 *         and no amount given)
 */
export function simulateSandboxPayment(
  input: SimulateSandboxPaymentInput,
  options: Partial<SandboxConfig> = {},
): { body: SandboxWebhookBody; request: WebhookRequest } {
  const config = resolveConfig(options);
  const providerRef = sandboxProviderRef(input.paymentId);
  const existing = ledger.get(providerRef);
  const amountMinor = input.amountMinor ?? existing?.amountMinor;
  const currency = input.currency ?? existing?.currency;
  if (amountMinor === undefined || currency === undefined) {
    throw AppError.notFound("Unknown sandbox payment: start the checkout again.");
  }
  const at = config.now();
  const failureCode = input.outcome === "FAILED" || input.outcome === "CANCELLED" ? (input.failureCode ?? null) : null;
  remember({
    paymentId: input.paymentId,
    providerRef,
    amountMinor: existing?.amountMinor ?? amountMinor,
    currency: existing?.currency ?? currency,
    status: input.outcome,
    failureCode,
    refundedMinor: existing?.refundedMinor ?? 0,
    returnUrl: existing?.returnUrl ?? null,
    method: existing?.method ?? null,
    updatedAt: at,
  });
  const body: SandboxWebhookBody = {
    id: `evt_${randomUUID()}`,
    type: SANDBOX_EVENT_TYPE,
    paymentId: input.paymentId,
    providerRef,
    status: input.outcome,
    amountMinor,
    currency,
    failureCode,
    occurredAt: at.toISOString(),
  };
  return { body, request: signSandboxWebhook(body, options) };
}

/** Signs an arbitrary sandbox webhook body (tests use it to craft replays and tampered payloads). */
export function signSandboxWebhook(body: unknown, options: Partial<SandboxConfig> = {}): WebhookRequest {
  const config = resolveConfig(options);
  const rawBody = JSON.stringify(body);
  const timestamp = String(Math.floor(config.now().getTime() / 1000));
  const headers = new Headers({
    "content-type": "application/json",
    [SANDBOX_TIMESTAMP_HEADER]: timestamp,
    [SANDBOX_SIGNATURE_HEADER]: sign(config.signingSecret, timestamp, rawBody),
  });
  return { headers, rawBody };
}

// ---------------------------------------------------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------------------------------------------------

class SandboxProvider implements PaymentProvider {
  readonly id = "sandbox" as const;
  readonly displayName = "Sandbox (test payments)";
  readonly #config: SandboxConfig;

  constructor(config: SandboxConfig) {
    this.#config = config;
  }

  supports(currency: string, method?: PaymentMethod): boolean {
    return isCurrencyCode(currency) && (method === undefined || (KNOWN_PAYMENT_METHODS as readonly string[]).includes(method));
  }

  async createCheckout(input: CheckoutRequest): Promise<CheckoutResult> {
    if (!uuidSchema.safeParse(input.paymentId).success) throw new RangeError("createCheckout: paymentId must be a uuid");
    if (!Number.isInteger(input.amountMinor) || input.amountMinor <= 0) throw new RangeError("createCheckout: amountMinor must be > 0");
    if (!isCurrencyCode(input.currency)) throw new RangeError("createCheckout: currency must be an ISO 4217 code");
    const providerRef = sandboxProviderRef(input.paymentId);
    if (!ledger.has(providerRef)) {
      remember({
        paymentId: input.paymentId,
        providerRef,
        amountMinor: input.amountMinor,
        currency: input.currency,
        status: "PENDING",
        failureCode: null,
        refundedMinor: 0,
        returnUrl: input.returnUrl,
        method: input.method ?? null,
        updatedAt: this.#config.now(),
      });
    }
    if (input.method !== undefined && MOBILE_MONEY_METHODS.has(input.method)) {
      return {
        kind: "mobile_prompt",
        providerRef,
        instructions: "Sandbox: no phone prompt is sent. Approve or decline this test payment on the sandbox checkout page.",
      };
    }
    return { kind: "redirect", url: `${this.#config.appUrl}${sandboxCheckoutPath(input.paymentId)}`, providerRef };
  }

  async verifyWebhook(request: WebhookRequest): Promise<VerifiedProviderEvent | null> {
    try {
      const timestamp = request.headers.get(SANDBOX_TIMESTAMP_HEADER);
      const signature = request.headers.get(SANDBOX_SIGNATURE_HEADER);
      if (!timestamp || !signature || !/^\d{1,12}$/.test(timestamp)) return null;
      const ageSeconds = Math.abs(this.#config.now().getTime() / 1000 - Number(timestamp));
      if (ageSeconds > SANDBOX_WEBHOOK_TOLERANCE_SECONDS) return null;
      if (!timingSafeEqualStr(sign(this.#config.signingSecret, timestamp, request.rawBody), signature)) return null;
      const parsed = webhookBodySchema.safeParse(JSON.parse(request.rawBody));
      if (!parsed.success) return null;
      const body = parsed.data;
      return {
        providerEventId: body.id,
        eventType: body.type,
        paymentId: body.paymentId,
        providerRef: body.providerRef,
        status: body.status,
        providerStatus: body.status,
        amountMinor: body.amountMinor,
        currency: body.currency,
        failureCode: body.failureCode,
        occurredAt: new Date(body.occurredAt),
        payload: { ...body },
      };
    } catch {
      return null; // malformed JSON or headers: reject, never throw
    }
  }

  async poll(payment: { providerRef: string; pollUrl?: string | null }): Promise<ProviderPollResult> {
    const entry = ledger.get(payment.providerRef);
    const status: ProviderPaymentStatus = entry?.status ?? "PENDING";
    return {
      providerEventId: syntheticEventId("sandbox", ["poll", payment.providerRef, status]),
      status,
      providerStatus: entry ? status : "UNKNOWN",
      amountMinor: entry?.amountMinor ?? null,
      currency: entry?.currency ?? null,
      failureCode: entry?.failureCode ?? null,
      payload: { providerRef: payment.providerRef, status, known: entry !== undefined },
    };
  }

  async refund(input: RefundRequest): Promise<RefundResult> {
    const entry = ledger.get(input.providerRef);
    if (!entry) return { status: "MANUAL_REQUIRED" };
    if (entry.status !== "PAID") throw AppError.conflict("Only a paid sandbox payment can be refunded.");
    const remaining = entry.amountMinor - entry.refundedMinor;
    if (input.currency !== entry.currency || !Number.isInteger(input.amountMinor) || input.amountMinor <= 0 || input.amountMinor > remaining) {
      throw AppError.validation({ amountMinor: [`Refund between 1 and ${remaining} ${entry.currency} minor units.`] });
    }
    const refundedMinor = entry.refundedMinor + input.amountMinor;
    remember({
      ...entry,
      refundedMinor,
      status: refundedMinor === entry.amountMinor ? "REFUNDED" : entry.status,
      updatedAt: this.#config.now(),
    });
    return { status: "REFUNDED", providerRef: `sbx_rf_${randomUUID()}` };
  }
}

/**
 * Creates the sandbox adapter. Defaults come from the environment (APP_URL, SESSION_SECRET).
 *
 * @throws Error when running in production
 */
export function createSandboxProvider(options: Partial<SandboxConfig> = {}): PaymentProvider {
  return new SandboxProvider(resolveConfig(options));
}
