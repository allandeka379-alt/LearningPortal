import "server-only";
import type { PaymentEventSource, PaymentStatus, Prisma } from "@/generated/prisma/client";
import { DEFAULT_FEATURE_FLAGS, type FeatureFlags, type FeatureName } from "@/lib/features";
import { db, type DbClient } from "@/server/db";
import { PAYMENT_PROVIDERS, getEnv, type ServerEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { logger, redact } from "@/server/lib/logger";
import { createPaynowProvider } from "./paynow";
import { createSandboxProvider } from "./sandbox";
import { createStripeProvider } from "./stripe";
import { syntheticEventId, type PaymentMethod, type PaymentProvider, type PaymentProviderId } from "./types";

/**
 * Payment provider registry (ARCHITECTURE §7.1) and the single write path for provider events (§7.3 idempotency).
 *
 * A provider is usable when it is listed in `PAYMENTS_ENABLED_PROVIDERS` AND has an adapter here (sandbox, Paynow,
 * Stripe) AND, for a dormant provider, its feature flag is on ({@link FEATURE_GATED_PROVIDERS}: Stripe needs
 * `features.stripe`, owner decision 2026-10-07: payments go through Paynow only). A new provider = implement the
 * interface in `./<id>.ts` and add its factory to {@link FACTORIES}; nothing else changes. The env contract already
 * refuses `sandbox` in production and requires each enabled provider's keys; {@link enabledProviderIds} drops the
 * sandbox again there as defence in depth.
 *
 * The flags are read asynchronously (Setting `features`), so callers pass them in (`options.features`, from
 * `getFeatures()`); without them the registry FAILS CLOSED: every feature-gated provider counts as switched off, even
 * when its keys are configured. A switched-off provider is never offered, never called (checkout, polls, refunds) and
 * its webhook answers 404.
 */

/** Providers that stay dormant until their feature flag is on. */
export const FEATURE_GATED_PROVIDERS: Readonly<Partial<Record<PaymentProviderId, FeatureName>>> = { stripe: "stripe" };

/** Registry options: an injected environment (tests) and the current feature flags (default: all off). */
export interface ProviderRegistryOptions {
  env?: ServerEnv;
  features?: FeatureFlags;
}

/** True when `id` is not held back by a switched-off feature flag. */
export function providerSwitchedOn(id: PaymentProviderId, features: FeatureFlags = DEFAULT_FEATURE_FLAGS): boolean {
  const feature = FEATURE_GATED_PROVIDERS[id];
  return feature === undefined || features[feature];
}

type ProviderFactory = (env: ServerEnv) => PaymentProvider;

const FACTORIES: Readonly<Partial<Record<PaymentProviderId, ProviderFactory>>> = {
  sandbox: (env) =>
    createSandboxProvider({ appUrl: env.APP_URL, signingSecret: env.SESSION_SECRET, production: env.NODE_ENV === "production" }),
  // One Paynow integration per currency (ARCHITECTURE §7.1). A second (e.g. ZWG) integration needs its own provider
  // instance and id: tracked as remaining work.
  paynow: (env) =>
    createPaynowProvider({
      integrationId: requiredKey(env.PAYNOW_INTEGRATION_ID, "PAYNOW_INTEGRATION_ID"),
      integrationKey: requiredKey(env.PAYNOW_INTEGRATION_KEY, "PAYNOW_INTEGRATION_KEY"),
      currency: env.PAYNOW_CURRENCY,
      merchantEmail: env.PAYNOW_MERCHANT_EMAIL,
      testMode: env.PAYNOW_TEST_MODE,
    }),
  stripe: (env) =>
    createStripeProvider({
      secretKey: requiredKey(env.STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY"),
      webhookSecret: requiredKey(env.STRIPE_WEBHOOK_SECRET, "STRIPE_WEBHOOK_SECRET"),
      apiVersion: env.STRIPE_API_VERSION,
    }),
};

/** The env contract requires these keys when the provider is enabled; this guards injected environments. */
function requiredKey(value: string | undefined, key: string): string {
  if (value === undefined || value.trim() === "") throw new Error(`${key} is required for this payment provider`);
  return value;
}

const UNAVAILABLE_MESSAGE = "That payment method is not available. Please choose another one.";

/** True for a provider key the platform knows (`sandbox`, `paynow`, `stripe`). */
export function isPaymentProviderId(value: string): value is PaymentProviderId {
  return (PAYMENT_PROVIDERS as readonly string[]).includes(value);
}

/**
 * Providers switched on by configuration (`sandbox` never in production) and not held back by a feature flag
 * (`features` default: all off, so Stripe is excluded unless the caller passes flags with `stripe: true`).
 */
export function enabledProviderIds(env: ServerEnv = getEnv(), features: FeatureFlags = DEFAULT_FEATURE_FLAGS): PaymentProviderId[] {
  return env.PAYMENTS_ENABLED_PROVIDERS.filter((id) => !(id === "sandbox" && env.NODE_ENV === "production") && providerSwitchedOn(id, features));
}

/** Providers that are both enabled and implemented. */
export function availableProviderIds(env: ServerEnv = getEnv(), features: FeatureFlags = DEFAULT_FEATURE_FLAGS): PaymentProviderId[] {
  return enabledProviderIds(env, features).filter((id) => FACTORIES[id] !== undefined);
}

const instances = new Map<PaymentProviderId, PaymentProvider>();

/**
 * The adapter for `name` (e.g. from the webhook route segment or a checkout form).
 *
 * @param options.env - inject an environment (tests); default instances are cached per process.
 * @param options.features - the current feature flags (`getFeatures()`); default all off (feature-gated providers refused)
 * @throws AppError BAD_REQUEST when the provider is unknown, disabled, switched off, or enabled but not implemented yet
 */
export function getProvider(name: string, options: ProviderRegistryOptions = {}): PaymentProvider {
  const id = name.trim().toLowerCase();
  if (!isPaymentProviderId(id)) throw new AppError("BAD_REQUEST", UNAVAILABLE_MESSAGE, { details: { provider: id.slice(0, 32) } });
  const env = options.env ?? getEnv();
  if (!enabledProviderIds(env, options.features).includes(id)) throw new AppError("BAD_REQUEST", UNAVAILABLE_MESSAGE, { details: { provider: id } });
  const factory = FACTORIES[id];
  if (!factory) {
    logger.error("billing: payment provider is enabled but has no adapter in this release", { provider: id });
    throw new AppError("BAD_REQUEST", UNAVAILABLE_MESSAGE, { details: { provider: id } });
  }
  if (options.env !== undefined) return factory(env);
  let instance = instances.get(id);
  if (!instance) {
    instance = factory(env);
    instances.set(id, instance);
  }
  return instance;
}

/** Every usable provider (checkout method picker). */
export function listAvailableProviders(options: ProviderRegistryOptions = {}): PaymentProvider[] {
  return availableProviderIds(options.env ?? getEnv(), options.features).map((id) => getProvider(id, options));
}

/** Usable providers that accept `currency` (and `method`, when given). */
export function providersFor(currency: string, method?: PaymentMethod, options: ProviderRegistryOptions = {}): PaymentProvider[] {
  const upper = currency.trim().toUpperCase();
  return listAvailableProviders(options).filter((provider) => provider.supports(upper, method));
}

/** Drops cached provider instances (tests that change the environment). */
export function resetProviderInstances(): void {
  instances.clear();
}

// ---------------------------------------------------------------------------------------------------------------------
// Provider event intake (PaymentEvent, append-only, idempotent among signature-verified rows)
// ---------------------------------------------------------------------------------------------------------------------

export interface RecordPaymentEventInput {
  provider: PaymentProviderId;
  /** Provider event id, or a synthetic one (`syntheticEventId`) when the provider sends none. */
  providerEventId: string;
  source: PaymentEventSource;
  /** Provider event type, e.g. "payment.status" (truncated to 64). */
  eventType: string;
  providerStatus?: string | null;
  /** State-machine target derived from the event (`mapProviderStatus`); `null` = informational. */
  mappedStatus?: PaymentStatus | null;
  amountMinor?: number | null;
  currency?: string | null;
  /** Signature/hash verified, our own server-side poll, a reconciliation file or a staff action. RETURN_URL: false. */
  signatureValid: boolean;
  /** Raw provider payload; redacted (secrets, contact details) before storage. */
  payload: unknown;
  /** Our payment, when the reference matched one. */
  paymentId?: string | null;
  /** Staff member for MANUAL events. */
  recordedById?: string | null;
  receivedAt?: Date;
}

export interface RecordedPaymentEvent {
  id: string;
  /** True when a signature-valid event with the same (provider, providerEventId) already existed: do not re-apply
   *  unless `processedAt` is still null (a crash between insert and processing). */
  duplicate: boolean;
  processedAt: Date | null;
  paymentId: string | null;
}

function truncate(value: string | null | undefined, max: number): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed.slice(0, max);
}

function toJson(value: unknown): Prisma.InputJsonValue {
  const text = JSON.stringify(redact(value) ?? {});
  return JSON.parse(text ?? "{}") as Prisma.InputJsonValue;
}

/**
 * Appends a `PaymentEvent` (every webhook, poll result, return-URL hit, manual action). Idempotent for authentic
 * events: the partial unique index on (provider, providerEventId) WHERE signatureValid makes a replay a no-op that
 * returns the existing row (`duplicate: true`). Unsigned rows are always stored (for investigation) and can never claim
 * the key, so a forgery cannot suppress the genuine event. Safe inside the caller's transaction (no error is raised on
 * a duplicate).
 */
export async function recordPaymentEvent(input: RecordPaymentEventInput, client: DbClient = db): Promise<RecordedPaymentEvent> {
  const providerEventId =
    input.providerEventId.length > 255 ? syntheticEventId(input.provider, [input.providerEventId]) : input.providerEventId;
  if (providerEventId.trim() === "") throw new RangeError("recordPaymentEvent: providerEventId is required");
  const currency = input.currency?.trim().toUpperCase();
  const amountMinor = input.amountMinor ?? null;
  const data: Prisma.PaymentEventCreateManyInput = {
    provider: input.provider,
    providerEventId,
    source: input.source,
    eventType: truncate(input.eventType, 64) ?? "unknown",
    providerStatus: truncate(input.providerStatus, 64),
    mappedStatus: input.mappedStatus ?? null,
    amountMinor: amountMinor !== null && Number.isInteger(amountMinor) ? amountMinor : null,
    currency: currency && /^[A-Z]{3}$/.test(currency) ? currency : null,
    signatureValid: input.source === "RETURN_URL" ? false : input.signatureValid,
    payload: toJson(input.payload),
    paymentId: input.paymentId ?? null,
    recordedById: input.recordedById ?? null,
    createdAt: input.receivedAt ?? new Date(),
  };
  const select = { id: true, processedAt: true, paymentId: true } as const;
  // ON CONFLICT DO NOTHING (no target) also covers the partial unique index PaymentEvent_provider_event_valid_key.
  const [created] = await client.paymentEvent.createManyAndReturn({ data: [data], skipDuplicates: true, select });
  if (created) return { ...created, duplicate: false };
  const existing = await client.paymentEvent.findFirst({
    where: { provider: input.provider, providerEventId, signatureValid: true },
    select,
  });
  if (!existing) throw new Error("recordPaymentEvent: insert was skipped but no authentic event exists");
  return { ...existing, duplicate: true };
}
