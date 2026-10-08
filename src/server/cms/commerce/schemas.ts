import { z } from "zod";
import {
  BillingInterval,
  PaymentPurpose,
  PaymentStatus,
  PlanAudience,
  PromoDiscountType,
  SubscriptionSource,
  SubscriptionStatus,
} from "@/generated/prisma/enums";
import { entitlementsSchema } from "@/lib/billing/entitlements";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { localDateTimeToInstant } from "../announcements/schemas";
import { pageSizeSchema } from "../users/cursor";
import { reasonSchema } from "../users/schemas";
import { parseMajorAmount } from "./money";

/**
 * Input schemas of the commerce admin services (§31 plans and prices, §32 payments, promo codes, subscriptions and
 * grants). Isomorphic; every service parses its input with these at the boundary (rule 4). Field names match the
 * admin form fields so validation errors land next to the right control.
 */

export { reasonSchema };

const uuid = z.uuid({ error: "Invalid id." });

const blankToUndefined = (value: unknown) => (value === "" || value === null ? undefined : value);

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Keep it under ${max} characters.` })
    .optional()
    .transform((value) => (value === "" ? undefined : value));

const optionalUuid = z.preprocess(blankToUndefined, uuid.optional());

/** Whole number in [min, max]; blank / absent = undefined (never silently 0). */
const optionalInt = (min: number, max: number, label = "Enter a whole number") =>
  z.preprocess(
    blankToUndefined,
    z.coerce
      .number({ error: `${label}.` })
      .int({ error: `${label}.` })
      .min(min, { error: `Use ${min} or more.` })
      .max(max, { error: `Use ${max} or less.` })
      .optional(),
  );

const requiredInt = (min: number, max: number, label = "Enter a whole number") =>
  z.preprocess(
    blankToUndefined,
    z.coerce
      .number({ error: `${label}.` })
      .int({ error: `${label}.` })
      .min(min, { error: `Use ${min} or more.` })
      .max(max, { error: `Use ${max} or less.` }),
  );

/** "12.50" (major units) → 1250 minor units, > 0. */
const amountField = z.union([z.string(), z.number()]).transform((value, ctx) => {
  const minor = typeof value === "number" ? (Number.isInteger(value) ? value : null) : parseMajorAmount(value);
  if (minor === null || minor <= 0) {
    ctx.addIssue({ code: "custom", message: "Enter an amount greater than 0, like 12.50." });
    return z.NEVER;
  }
  return minor;
});

const optionalAmountField = z.preprocess(blankToUndefined, amountField.optional());

const currencyField = z
  .string({ error: "Choose a currency." })
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{3}$/, { error: "Use a 3-letter currency code, e.g. USD." });

/** A `datetime-local` value on the platform clock (Africa/Harare), or a Date. */
const localDateTimeField = z.preprocess(
  blankToUndefined,
  z
    .union([z.date(), z.string()])
    .transform((value, ctx) => {
      if (value instanceof Date) return value;
      const instant = localDateTimeToInstant(value, DEFAULT_TIMEZONE);
      if (!instant) {
        ctx.addIssue({ code: "custom", message: "Enter a valid date and time." });
        return z.NEVER;
      }
      return instant;
    })
    .optional(),
);

const expectedUpdatedAt = z.iso.datetime({ error: "This form is out of date. Reload the page and try again." });

// ---------------------------------------------------------------------------------------------------------------------
// Plans and prices (§31)
// ---------------------------------------------------------------------------------------------------------------------

export const PLAN_HIGHLIGHTS_MAX = 8;
export const PLAN_HIGHLIGHT_MAX_LENGTH = 160;

const highlightsField = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value, ctx) => {
    const list = (Array.isArray(value) ? value : (value ?? "").split(/\r?\n/)).map((line) => line.trim()).filter(Boolean);
    if (list.length > PLAN_HIGHLIGHTS_MAX) ctx.addIssue({ code: "custom", message: `List at most ${PLAN_HIGHLIGHTS_MAX} highlights.` });
    if (list.some((line) => line.length > PLAN_HIGHLIGHT_MAX_LENGTH)) {
      ctx.addIssue({ code: "custom", message: `Keep each highlight under ${PLAN_HIGHLIGHT_MAX_LENGTH} characters.` });
    }
    return list;
  });

export const updatePlanDetailsSchema = z.object({
  planId: uuid,
  expectedUpdatedAt,
  name: z
    .string({ error: "Enter a name." })
    .trim()
    .min(2, { error: "Enter a name of at least 2 characters." })
    .max(100, { error: "Keep the name under 100 characters." }),
  tagline: optionalText(200),
  description: optionalText(5000),
  highlights: highlightsField,
  isPublic: z.boolean().default(false),
  isActive: z.boolean().default(false),
  sortOrder: requiredInt(-1000, 1000),
  trialDays: requiredInt(0, 365, "Enter the trial length in whole days"),
});
export type UpdatePlanDetailsInput = z.input<typeof updatePlanDetailsSchema>;

export const updatePlanEntitlementsSchema = z.object({
  planId: uuid,
  expectedUpdatedAt,
  entitlements: entitlementsSchema.strict(),
});
export type UpdatePlanEntitlementsInput = z.input<typeof updatePlanEntitlementsSchema>;

/** Currencies offered in the price form (§31: USD and ZiG prices are set separately, never converted). */
export const PRICE_CURRENCIES = ["USD", "ZWG"] as const;

/**
 * Intervals that need an explicit `periodDays` (TERM by CHECK). A ONE_OFF price without days is lifetime access ("Full
 * access", pay once, keep it: owner decision 2026-10-07); with days it is an access window.
 */
export const INTERVALS_NEEDING_PERIOD_DAYS: readonly BillingInterval[] = ["TERM"];

export const createPlanPriceSchema = z
  .object({
    planId: uuid,
    currency: currencyField,
    amount: amountField,
    interval: z.enum(BillingInterval, { error: "Choose a billing interval." }),
    intervalCount: z.preprocess(blankToUndefined, z.coerce.number({ error: "Enter a whole number." }).int().min(1, { error: "Use 1 or more." }).max(24, { error: "Use 24 or less." }).default(1)),
    periodDays: optionalInt(1, 3660, "Enter the period in whole days"),
    perSeat: z.boolean().default(false),
    minSeats: optionalInt(1, 100_000, "Enter a whole number of seats"),
    label: optionalText(100),
    countryId: optionalUuid,
    validFrom: localDateTimeField,
    validTo: localDateTimeField,
    sortOrder: z.preprocess(blankToUndefined, z.coerce.number({ error: "Enter a whole number." }).int().min(-1000).max(1000).default(0)),
    replacesPriceId: optionalUuid,
  })
  .superRefine((data, ctx) => {
    if (INTERVALS_NEEDING_PERIOD_DAYS.includes(data.interval) && data.periodDays === undefined) {
      ctx.addIssue({ code: "custom", path: ["periodDays"], message: "Enter the term length in days (required for school-term prices)." });
    }
    if (!data.perSeat && data.minSeats !== undefined) {
      ctx.addIssue({ code: "custom", path: ["minSeats"], message: "A seat minimum only applies to per-seat prices." });
    }
    if (data.validFrom && data.validTo && data.validTo.getTime() <= data.validFrom.getTime()) {
      ctx.addIssue({ code: "custom", path: ["validTo"], message: "The end must be after the start." });
    }
  });
export type CreatePlanPriceInput = z.input<typeof createPlanPriceSchema>;

export const setPlanPriceActiveSchema = z.object({
  priceId: uuid,
  active: z.boolean(),
  reason: optionalText(500),
});
export type SetPlanPriceActiveInput = z.input<typeof setPlanPriceActiveSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Subscriptions and grants
// ---------------------------------------------------------------------------------------------------------------------

export const SUBSCRIPTION_HOLDER_KINDS = ["user", "school"] as const;
export type SubscriptionHolderKind = (typeof SUBSCRIPTION_HOLDER_KINDS)[number];

export const listSubscriptionsSchema = z.object({
  q: optionalText(200),
  status: z.enum(SubscriptionStatus).optional(),
  planId: uuid.optional(),
  holder: z.enum(SUBSCRIPTION_HOLDER_KINDS).optional(),
  source: z.enum(SubscriptionSource).optional(),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema.optional(),
});
export type ListSubscriptionsInput = z.input<typeof listSubscriptionsSchema>;

export const CANCEL_MODES = ["period_end", "now"] as const;
export type CancelMode = (typeof CANCEL_MODES)[number];

export const cancelSubscriptionSchema = z.object({
  subscriptionId: uuid,
  mode: z.enum(CANCEL_MODES, { error: "Choose when the subscription ends." }),
  reason: reasonSchema,
});
export type CancelSubscriptionAdminInput = z.input<typeof cancelSubscriptionSchema>;

export const resumeSubscriptionSchema = z.object({ subscriptionId: uuid, reason: optionalText(500) });

/** Staff-issued free access is attributed and justified (EntitlementGrant_staff_chk). */
export const EXTENSION_SOURCES = ["ADMIN", "COMPENSATION"] as const;
export type ExtensionSource = (typeof EXTENSION_SOURCES)[number];
export const MAX_EXTENSION_DAYS = 366;

export const extendSubscriptionSchema = z.object({
  subscriptionId: uuid,
  days: requiredInt(1, MAX_EXTENSION_DAYS, "Enter a number of days"),
  source: z.preprocess(blankToUndefined, z.enum(EXTENSION_SOURCES).default("ADMIN")),
  reason: reasonSchema,
});
export type ExtendSubscriptionInput = z.input<typeof extendSubscriptionSchema>;

export const revokeGrantSchema = z.object({ grantId: uuid, reason: reasonSchema });

// ---------------------------------------------------------------------------------------------------------------------
// Payments (§32)
// ---------------------------------------------------------------------------------------------------------------------

const localDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Use a date like 2026-10-05." });

export const listPaymentsSchema = z.object({
  q: optionalText(200),
  status: z.enum(PaymentStatus).optional(),
  provider: z.string().regex(/^[a-z0-9_]{1,32}$/).optional(),
  purpose: z.enum(PaymentPurpose).optional(),
  currency: z.string().regex(/^[A-Z]{3}$/).optional(),
  from: localDate.optional(),
  to: localDate.optional(),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema.optional(),
});
export type ListPaymentsInput = z.input<typeof listPaymentsSchema>;

/** PROVIDER: refund through the provider API (Stripe, sandbox). MANUAL: record a refund made out of band (Paynow). */
export const REFUND_METHODS = ["PROVIDER", "MANUAL"] as const;
export type RefundMethod = (typeof REFUND_METHODS)[number];

export const refundPaymentSchema = z.object({
  paymentId: uuid,
  method: z.enum(REFUND_METHODS, { error: "Choose how the refund is made." }),
  /** Blank = everything still refundable. */
  amount: optionalAmountField,
  reason: reasonSchema,
  /** Bank / mobile-money / provider dashboard reference of a manual refund. */
  externalReference: optionalText(120),
});
export type RefundPaymentInput = z.input<typeof refundPaymentSchema>;

export const markDisputedSchema = z.object({ paymentId: uuid, reason: reasonSchema });

// ---------------------------------------------------------------------------------------------------------------------
// Promo codes
// ---------------------------------------------------------------------------------------------------------------------

/** Mirrors PromoCode_code_chk. Codes are stored upper-case. */
export const PROMO_CODE_PATTERN = /^[A-Z0-9][A-Z0-9_-]{2,31}$/;
export const PROMO_STATES = ["active", "scheduled", "expired", "inactive"] as const;
export type PromoState = (typeof PROMO_STATES)[number];

export const listPromoCodesSchema = z.object({
  q: optionalText(100),
  state: z.enum(PROMO_STATES).optional(),
  type: z.enum(PromoDiscountType).optional(),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema.optional(),
});
export type ListPromoCodesInput = z.input<typeof listPromoCodesSchema>;

const promoCodeField = z
  .string({ error: "Enter a code." })
  .trim()
  .toUpperCase()
  .regex(PROMO_CODE_PATTERN, { error: "Use 3-32 letters, digits, hyphens or underscores, starting with a letter or digit." });

/** The discount itself (frozen once the code has been used). */
const promoValueShape = {
  code: promoCodeField,
  discountType: z.enum(PromoDiscountType, { error: "Choose a discount type." }),
  percentOff: optionalInt(1, 99, "Enter a whole percentage"),
  amountOff: optionalAmountField,
  currency: z.preprocess(blankToUndefined, currencyField.optional()),
  freeDays: optionalInt(1, 366, "Enter a whole number of days"),
  grantPlanId: optionalUuid,
};

/** Who may use it and when (editable at any time). */
const promoRuleShape = {
  description: optionalText(500),
  audience: z.preprocess(blankToUndefined, z.enum(PlanAudience).optional()),
  appliesToStudyPacks: z.boolean().default(false),
  newCustomersOnly: z.boolean().default(false),
  maxRedemptions: optionalInt(1, 10_000_000, "Enter a whole number"),
  validFrom: localDateTimeField,
  validTo: localDateTimeField,
  isActive: z.boolean().default(true),
  planIds: z.array(uuid).max(50, { error: "Choose at most 50 plans." }).default([]),
};

export interface PromoValueFields {
  discountType: PromoDiscountType;
  percentOff?: number | undefined;
  amountOff?: number | undefined;
  currency?: string | undefined;
  freeDays?: number | undefined;
  grantPlanId?: string | undefined;
  audience?: PlanAudience | undefined;
  validFrom?: Date | undefined;
  validTo?: Date | undefined;
}

/**
 * Cross-field rules mirroring PromoCode_discount_chk: PERCENT 1-99; FIXED_AMOUNT needs an amount and a currency;
 * FREE_DAYS needs days and the plan it grants (an individual plan, since the grant goes to one user). A 100% discount
 * is always FREE_DAYS (a Payment is never zero).
 */
export function checkPromoValue(data: PromoValueFields, ctx: z.RefinementCtx): void {
  switch (data.discountType) {
    case "PERCENT":
      if (data.percentOff === undefined) ctx.addIssue({ code: "custom", path: ["percentOff"], message: "Enter a percentage between 1 and 99. For 100% use free days." });
      break;
    case "FIXED_AMOUNT":
      if (data.amountOff === undefined) ctx.addIssue({ code: "custom", path: ["amountOff"], message: "Enter the amount taken off." });
      if (data.currency === undefined) ctx.addIssue({ code: "custom", path: ["currency"], message: "Choose the currency of the amount." });
      break;
    case "FREE_DAYS":
      if (data.freeDays === undefined) ctx.addIssue({ code: "custom", path: ["freeDays"], message: "Enter the number of free days." });
      if (data.grantPlanId === undefined) ctx.addIssue({ code: "custom", path: ["grantPlanId"], message: "Choose the plan the free days unlock." });
      if (data.audience === "SCHOOL") ctx.addIssue({ code: "custom", path: ["audience"], message: "Free days are granted to individual users, not schools." });
      break;
  }
  if (data.validFrom && data.validTo && data.validTo.getTime() <= data.validFrom.getTime()) {
    ctx.addIssue({ code: "custom", path: ["validTo"], message: "The end must be after the start." });
  }
}

export const createPromoCodeSchema = z.object({ ...promoValueShape, ...promoRuleShape }).superRefine(checkPromoValue);
export type CreatePromoCodeInput = z.input<typeof createPromoCodeSchema>;

export const updatePromoCodeSchema = z.object({
  promoCodeId: uuid,
  expectedUpdatedAt,
  code: promoCodeField.optional(),
  discountType: z.enum(PromoDiscountType).optional(),
  percentOff: promoValueShape.percentOff,
  amountOff: promoValueShape.amountOff,
  currency: promoValueShape.currency,
  freeDays: promoValueShape.freeDays,
  grantPlanId: promoValueShape.grantPlanId,
  ...promoRuleShape,
});
export type UpdatePromoCodeInput = z.input<typeof updatePromoCodeSchema>;

export const deletePromoCodeSchema = z.object({ promoCodeId: uuid, reason: optionalText(500) });
