import type { BillingInterval, PaymentStatus } from "@/generated/prisma/client";
import type { ActionResult } from "@/server/lib/errors";

/**
 * Contract between the student checkout UI and its Server Actions (§31, §32). Pure and isomorphic. Amounts never
 * travel from the client: the form sends a price id (or study pack id), a method id and an idempotency key only.
 */

/** Payment methods a student can pick (mapped to provider + Paynow mobile method on the server). */
export const CHECKOUT_METHOD_IDS = [
  "paynow_ecocash",
  "paynow_onemoney",
  "paynow_innbucks",
  "paynow_web",
  "stripe_card",
  "sandbox_web",
  "sandbox_ecocash",
] as const;
export type CheckoutMethodId = (typeof CHECKOUT_METHOD_IDS)[number];

export interface CheckoutMethodView {
  id: CheckoutMethodId;
  label: string;
  description: string;
  /** Mobile money: the wallet number is needed and approval happens on the phone. */
  needsPhone: boolean;
  /** Development-only test method (never offered in production). */
  test: boolean;
  /** Currencies (among the offered prices) this method can take. */
  currencies: string[];
}

export interface CheckoutPriceOption {
  planPriceId: string;
  currency: string;
  amountMinor: number;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  /** Admin label, e.g. "Term 1 2027". */
  label: string | null;
}

/** A plan (or study pack) with the prices that can be bought now. */
export interface CheckoutItemGroup {
  id: string;
  name: string;
  tagline: string | null;
  highlights: string[];
  prices: CheckoutPriceOption[];
  /** The student's current plan (paying again renews it). */
  current: boolean;
}

export type CheckoutOutcome =
  | { kind: "redirect"; url: string; paymentId: string }
  | {
      kind: "mobile";
      paymentId: string;
      /** Provider instructions. EcoCash / OneMoney are phone prompts; InnBucks is an authorization-code flow. */
      instructions: string;
      mobilePromptKind: "phone_prompt" | "innbucks_code";
      innbucksAuthorizationCode: string | null;
      innbucksAuthorizationExpires: string | null;
      innbucksDeepLinkUrl: string | null;
      methodLabel: string;
      /** "+263 77* *** 567" (never the full number). */
      maskedMsisdn: string | null;
      resultHref: string;
      /** Development only: the sandbox page that approves or declines the simulated prompt. */
      sandboxHref: string | null;
    };

export type CheckoutFormState = ActionResult<CheckoutOutcome> | null;
export type CheckoutFormAction = (state: CheckoutFormState, formData: FormData) => Promise<CheckoutFormState>;

/** A payment's current state as the waiting screens poll it. */
export interface PaymentStatusView {
  paymentId: string;
  status: PaymentStatus;
  /** Payer-facing explanation for FAILED / CANCELLED; `null` otherwise. */
  message: string | null;
  resultHref: string;
}

export type PaymentStatusCheck = (paymentId: string, options: { refresh: boolean }) => Promise<ActionResult<PaymentStatusView>>;

/** Result page for a payment. */
export function paymentResultHref(paymentId: string): string {
  return `/app/billing/result?paymentId=${encodeURIComponent(paymentId)}`;
}

/**
 * Only http(s) URLs or app-relative paths are followed (never `javascript:` or protocol-relative URLs), even though
 * the server already checked: defence in depth.
 */
export function isSafeNavigation(url: string): boolean {
  if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** Field errors of `field` from the last result, if any. */
export function fieldErrorsOf(state: ActionResult<unknown> | null, field: string): string[] | undefined {
  if (state === null || state.ok) return undefined;
  return state.error.fieldErrors?.[field];
}
