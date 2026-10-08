import { z } from "zod";
import { ContentStatus } from "@/generated/prisma/enums";

/**
 * Zod contracts of the study-pack CMS (§24, §31). Isomorphic (types shared with the forms); validation runs on the
 * server. Prices are never hard-coded: they are PlanPrice rows (one-off, per currency / country) managed here by
 * `billing.manage` holders.
 */

const blankToNull = (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null));
const uuid = z.uuid("Choose a valid item.");
const optionalUuid = z.preprocess(blankToNull, uuid.nullable());
const flag = z.preprocess((value) => value === true || value === "true" || value === "on" || value === "1", z.boolean());

function optionalText(max: number) {
  return z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : (value ?? null)),
    z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`).nullable(),
  );
}

function optionalInt(min: number, max: number, message: string) {
  return z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? null : typeof value === "string" ? Number(value) : value),
    z.int(message).min(min, message).max(max, message).nullable(),
  );
}

export const STUDY_PACK_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const studyPackMetaShape = {
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Use at least 3 characters.")
    .max(80, "Use at most 80 characters.")
    .regex(STUDY_PACK_SLUG_PATTERN, "Use lower-case letters, digits and single hyphens, e.g. o-level-maths-complete."),
  title: z.string().trim().min(3, "Give the pack a title.").max(200, "Use at most 200 characters."),
  subtitle: optionalText(200),
  description: optionalText(20_000),
  coverImageId: optionalUuid,
  isFeatured: flag,
  sortOrder: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? 0 : typeof value === "string" ? Number(value) : value),
    z.int("Enter a whole number.").min(-1_000).max(1_000),
  ),
  metaTitle: optionalText(70),
  metaDescription: optionalText(200),
  allowPdfExport: flag,
};

export const studyPackCreateSchema = z.object(studyPackMetaShape);
/** Pack details as forms send them (validated by {@link studyPackCreateSchema}). */
export interface StudyPackMetaInput {
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  coverImageId?: string | null;
  isFeatured?: boolean | string;
  sortOrder?: number | string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  allowPdfExport?: boolean | string;
}

export const studyPackUpdateSchema = z.object({
  id: uuid,
  version: z.string().max(40).optional(),
  ...studyPackMetaShape,
  /** The entitlements document (validated against `entitlementsSchema` by the service). */
  entitlements: z.unknown(),
});

export const SCOPE_KINDS = ["QUALIFICATION", "SUBJECT", "SYLLABUS"] as const;
export type ScopeKind = (typeof SCOPE_KINDS)[number];

export const scopeInputSchema = z.object({ kind: z.enum(SCOPE_KINDS, { message: "Choose what the rule covers." }), targetId: uuid });
export type ScopeInput = z.input<typeof scopeInputSchema>;

export const scopesSchema = z
  .object({ id: uuid, version: z.string().max(40).optional(), scopes: z.array(scopeInputSchema).max(100, "At most 100 rules.") })
  .superRefine((value, ctx) => {
    const seen = new Set<string>();
    value.scopes.forEach((scope, index) => {
      const key = `${scope.kind}:${scope.targetId}`;
      if (seen.has(key)) ctx.addIssue({ code: "custom", path: ["scopes", index, "targetId"], message: "This rule is already in the list." });
      seen.add(key);
    });
  });

/** A decimal amount as typed ("12.50"), converted to minor units by the service for the currency's precision. */
export const amountSchema = z
  .string()
  .trim()
  .regex(/^\d{1,9}(\.\d{1,3})?$/, "Enter an amount such as 12.50 (no currency symbol).");

const dateTimeLocal = z.preprocess(
  blankToNull,
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/, "Use a date (and time).")
    .nullable(),
);

export const priceCreateSchema = z
  .object({
    studyPackId: uuid,
    currency: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{3}$/, "Use a three-letter currency code such as USD or ZWG."),
    amount: amountSchema,
    countryId: optionalUuid,
    /** Access window in days (ONE_OFF periodDays); blank = no expiry. */
    accessDays: optionalInt(1, 3_650, "Enter an access period from 1 to 3,650 days, or leave it blank for no expiry."),
    label: optionalText(100),
    validFrom: dateTimeLocal,
    validTo: dateTimeLocal,
    sortOrder: z.preprocess(
      (value) => (value === "" || value === null || value === undefined ? 0 : typeof value === "string" ? Number(value) : value),
      z.int("Enter a whole number.").min(-1_000).max(1_000),
    ),
  })
  .superRefine((value, ctx) => {
    if (value.validFrom && value.validTo && value.validTo <= value.validFrom) {
      ctx.addIssue({ code: "custom", path: ["validTo"], message: "The end must be after the start." });
    }
  });
export type PriceCreateInput = z.input<typeof priceCreateSchema>;

/** Only the presentation columns of a price are editable (the trigger freezes the price-defining ones). */
export const priceUpdateSchema = z.object({
  priceId: uuid,
  label: optionalText(100),
  sortOrder: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? 0 : typeof value === "string" ? Number(value) : value),
    z.int("Enter a whole number.").min(-1_000).max(1_000),
  ),
  isActive: flag,
  validTo: dateTimeLocal,
});

export const studyPackFilterSchema = z.object({
  q: z.preprocess(blankToNull, z.string().trim().max(200).nullable().optional()),
  status: z.preprocess(blankToNull, z.enum(Object.values(ContentStatus) as [ContentStatus, ...ContentStatus[]]).nullable().optional()),
  cursor: z.preprocess(blankToNull, z.string().max(200).nullable().optional()),
});
