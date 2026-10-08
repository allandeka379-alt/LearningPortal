import { z } from "zod";

/**
 * FAQ entry input (§45 CMS). Pure Zod schemas shared by the service and its tests. Categories are stored normalised
 * (trimmed, lower-case, spaces → "-") so the public grouping (`normalizeFaqCategory` in src/server/marketing/faq.ts)
 * and the admin's ordering agree on what a category is.
 */

export const FAQ_LIMITS = {
  question: 300,
  answer: 10_000,
  category: 64,
  locale: 16,
  reason: 500,
} as const;

/** Suggested group keys; the public site has friendly headings for these (any other key is allowed). */
export const FAQ_SUGGESTED_CATEGORIES = ["general", "pricing", "schools", "exams", "ai", "privacy", "account"] as const;

/** `"Study Tips "` → `"study-tips"`. */
export function normalizeCategoryInput(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

const blankToUndefined = (value: unknown) => (typeof value === "string" && value.trim() === "" ? undefined : value);

const questionField = z
  .string({ error: "Write the question." })
  .trim()
  .min(3, { error: "Write the question." })
  .max(FAQ_LIMITS.question, { error: `Keep the question under ${FAQ_LIMITS.question} characters.` });

const answerField = z
  .string({ error: "Write the answer." })
  .trim()
  .min(1, { error: "Write the answer." })
  .max(FAQ_LIMITS.answer, { error: `Keep the answer under ${FAQ_LIMITS.answer.toLocaleString("en")} characters.` });

const categoryField = z
  .string({ error: "Choose a category." })
  .transform(normalizeCategoryInput)
  .pipe(
    z
      .string()
      .min(1, { error: "Choose a category." })
      .max(FAQ_LIMITS.category, { error: `Keep the category under ${FAQ_LIMITS.category} characters.` })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { error: "Use letters, digits and hyphens, e.g. pricing or study-tips." }),
  );

const localeField = z.preprocess(
  blankToUndefined,
  z
    .string()
    .trim()
    .max(FAQ_LIMITS.locale)
    .regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, { error: "Use a language code such as en, sn or nd." })
    .default("en"),
);

const sortOrderField = z.preprocess(
  blankToUndefined,
  z.coerce
    .number({ error: "Enter a whole number." })
    .int({ error: "Enter a whole number." })
    .min(0, { error: "Use 0 or more." })
    .max(1_000_000, { error: "Use a smaller number." })
    .optional(),
);

export const createFaqSchema = z.object({
  question: questionField,
  answer: answerField,
  category: categoryField,
  locale: localeField,
  /** Blank = after the last entry of the category. */
  sortOrder: sortOrderField,
});

export const updateFaqSchema = createFaqSchema.extend({
  faqItemId: z.uuid({ error: "Invalid id." }),
  expectedUpdatedAt: z.iso.datetime({ error: "This form is out of date. Reload the page and try again." }),
});

export const faqIdSchema = z.object({
  faqItemId: z.uuid({ error: "Invalid id." }),
  reason: z.preprocess(blankToUndefined, z.string().trim().max(FAQ_LIMITS.reason).optional()),
});

export const moveFaqSchema = z.object({
  faqItemId: z.uuid({ error: "Invalid id." }),
  direction: z.enum(["up", "down"], { error: "Choose up or down." }),
});

export const FAQ_STATES = ["published", "unpublished"] as const;
export type FaqState = (typeof FAQ_STATES)[number];

export const listFaqSchema = z.object({
  category: z.preprocess(blankToUndefined, z.string().transform(normalizeCategoryInput).optional()),
  locale: z.preprocess(blankToUndefined, z.string().trim().max(FAQ_LIMITS.locale).optional()),
  state: z.preprocess(blankToUndefined, z.enum(FAQ_STATES).optional()),
});

export type CreateFaqInput = z.input<typeof createFaqSchema>;
export type UpdateFaqInput = z.input<typeof updateFaqSchema>;
export type ListFaqInput = z.input<typeof listFaqSchema>;
