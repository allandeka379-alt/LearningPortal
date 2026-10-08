import { z } from "zod";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { localDateTimeToInstant } from "../announcements/schemas";

/**
 * Testimonial input (§45 CMS; rule 6: real, consented testimonials only). Pure Zod schemas shared by the service and
 * its tests. Dates come from `datetime-local` inputs on the platform clock (Africa/Harare) or as Date objects.
 */

export const TESTIMONIAL_LIMITS = {
  displayName: 80,
  descriptor: 120,
  quote: 1_000,
  evidenceRef: 200,
  reason: 500,
} as const;

/** How consent was captured (`Testimonial.consentMethod`). */
export const TESTIMONIAL_CONSENT_METHODS = ["signed_form", "email", "in_app_checkbox", "whatsapp_message", "other_written"] as const;
export type TestimonialConsentMethod = (typeof TESTIMONIAL_CONSENT_METHODS)[number];

export const CONSENT_METHOD_LABELS: Readonly<Record<string, string>> = {
  signed_form: "Signed consent form",
  email: "Email",
  in_app_checkbox: "In-app consent checkbox",
  whatsapp_message: "WhatsApp message",
  other_written: "Other written record",
};

const blankToUndefined = (value: unknown) => (typeof value === "string" && value.trim() === "" ? undefined : value);

const optionalText = (max: number, message: string) => z.preprocess(blankToUndefined, z.string().trim().max(max, { error: message }).optional());

/** A `datetime-local` value on the platform clock, or a Date. */
const instantField = (required: string) =>
  z.union([z.date(), z.string({ error: required })]).transform((value, ctx) => {
    if (value instanceof Date) return value;
    const instant = localDateTimeToInstant(value, DEFAULT_TIMEZONE);
    if (!instant) {
      ctx.addIssue({ code: "custom", message: value.trim() === "" ? required : "Enter a valid date and time." });
      return z.NEVER;
    }
    return instant;
  });

const fields = {
  displayName: z
    .string({ error: "Enter the name to show." })
    .trim()
    .min(2, { error: "Enter the name to show, e.g. Tariro M." })
    .max(TESTIMONIAL_LIMITS.displayName, { error: `Keep the name under ${TESTIMONIAL_LIMITS.displayName} characters.` }),
  descriptor: optionalText(TESTIMONIAL_LIMITS.descriptor, `Keep the description under ${TESTIMONIAL_LIMITS.descriptor} characters.`),
  quote: z
    .string({ error: "Enter the quote." })
    .trim()
    .min(3, { error: "Enter the quote." })
    .max(TESTIMONIAL_LIMITS.quote, { error: `Keep the quote under ${TESTIMONIAL_LIMITS.quote.toLocaleString("en")} characters.` }),
  photoMediaId: z.preprocess(blankToUndefined, z.uuid({ error: "Paste the id of an image from the media library." }).optional()),
  userId: z.preprocess(blankToUndefined, z.uuid({ error: "Paste a valid user id." }).optional()),
  consentRecordedAt: instantField("Enter when consent was given."),
  consentMethod: z.enum(TESTIMONIAL_CONSENT_METHODS, { error: "Choose how consent was given." }),
  consentEvidenceRef: optionalText(TESTIMONIAL_LIMITS.evidenceRef, `Keep the reference under ${TESTIMONIAL_LIMITS.evidenceRef} characters.`),
  authorIsMinor: z.boolean().default(false),
  guardianConsentRecordedAt: z.preprocess(blankToUndefined, instantField("Enter when the guardian consented.").optional()),
  sortOrder: z.preprocess(
    blankToUndefined,
    z.coerce.number({ error: "Enter a whole number." }).int({ error: "Enter a whole number." }).min(0, { error: "Use 0 or more." }).max(1_000_000).optional(),
  ),
};

export const createTestimonialSchema = z.object(fields);

export const updateTestimonialSchema = z.object({
  ...fields,
  testimonialId: z.uuid({ error: "Invalid id." }),
  expectedUpdatedAt: z.iso.datetime({ error: "This form is out of date. Reload the page and try again." }),
});

export const testimonialIdSchema = z.object({
  testimonialId: z.uuid({ error: "Invalid id." }),
  reason: optionalText(TESTIMONIAL_LIMITS.reason, `Keep the reason under ${TESTIMONIAL_LIMITS.reason} characters.`),
});

export const TESTIMONIAL_STATES = ["published", "unpublished", "withdrawn"] as const;
export type TestimonialState = (typeof TESTIMONIAL_STATES)[number];

export const listTestimonialsSchema = z.object({
  state: z.preprocess(blankToUndefined, z.enum(TESTIMONIAL_STATES).optional()),
  cursor: z.preprocess(blankToUndefined, z.uuid().optional()),
  limit: z.number().int().min(1).max(100).default(25),
});

export type CreateTestimonialInput = z.input<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.input<typeof updateTestimonialSchema>;
export type ListTestimonialsInput = z.input<typeof listTestimonialsSchema>;
