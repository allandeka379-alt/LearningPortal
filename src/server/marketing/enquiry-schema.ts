/**
 * Validation of the /schools "Talk to us" form (§53 B2B / B2B2C). Pure (unit tested). The person filling it in is a
 * school's staff member acting for the school, so the details are organisational contact data, collected with an
 * explicit consent to be contacted about this enquiry (Cyber and Data Protection Act: lawful basis + purpose).
 */
import { z } from "zod";

export const ENQUIRY_LIMITS = {
  schoolName: 200,
  contactName: 120,
  role: 120,
  email: 254,
  phone: 24,
  message: 2_000,
  boards: 10,
  boardName: 80,
  maxLearners: 100_000,
} as const;

/** Spaces, brackets, dots and dashes are allowed for readability; 7–15 digits with an optional leading "+". */
const PHONE = /^\+?[0-9][0-9 ().-]{5,22}$/;

function trimmed(max: number, message: string) {
  return z.string().trim().max(max, { error: `Keep this under ${max} characters.` }).min(1, { error: message });
}

function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max, { error: `Keep this under ${max} characters.` })
    .optional()
    .transform((value) => (value ? value : undefined));
}

export const schoolEnquirySchema = z.object({
  schoolName: trimmed(ENQUIRY_LIMITS.schoolName, "Enter the school's name."),
  contactName: trimmed(ENQUIRY_LIMITS.contactName, "Enter your name."),
  role: optionalText(ENQUIRY_LIMITS.role),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(ENQUIRY_LIMITS.email)
    .pipe(z.email({ error: "Enter a valid email address." })),
  phone: z
    .string()
    .trim()
    .max(ENQUIRY_LIMITS.phone, { error: "Enter a valid phone number." })
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => value === undefined || (PHONE.test(value) && digitCount(value) >= 7 && digitCount(value) <= 15), {
      error: "Enter a valid phone number, e.g. +263 77 123 4567.",
    }),
  learners: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => value === undefined || /^\d{1,6}$/.test(value), { error: "Enter a whole number." })
    .transform((value) => (value === undefined ? undefined : Number(value)))
    .refine((value) => value === undefined || (value >= 1 && value <= ENQUIRY_LIMITS.maxLearners), {
      error: `Enter a number from 1 to ${ENQUIRY_LIMITS.maxLearners.toLocaleString("en-ZW")}.`,
    }),
  boards: z
    .array(z.string().trim().min(1).max(ENQUIRY_LIMITS.boardName))
    .max(ENQUIRY_LIMITS.boards)
    .default([])
    .transform((list) => [...new Set(list)]),
  message: optionalText(ENQUIRY_LIMITS.message),
  consent: z.literal(true, { error: "Please confirm we may contact you about this enquiry." }),
  /** Honeypot: hidden from people, filled in by naive bots. */
  website: z.string().max(500).optional(),
});

export type SchoolEnquiryInput = z.input<typeof schoolEnquirySchema>;
export type SchoolEnquiry = z.output<typeof schoolEnquirySchema>;

function digitCount(value: string): number {
  return value.replace(/\D/g, "").length;
}

/** Reads the enquiry form's fields from FormData into the schema's input shape. */
export function enquiryFromFormData(formData: FormData): Record<string, unknown> {
  const text = (name: string): string | undefined => {
    const value = formData.get(name);
    return typeof value === "string" ? value : undefined;
  };
  return {
    schoolName: text("schoolName") ?? "",
    contactName: text("contactName") ?? "",
    role: text("role"),
    email: text("email") ?? "",
    phone: text("phone"),
    learners: text("learners"),
    boards: formData.getAll("boards").filter((value): value is string => typeof value === "string"),
    message: text("message"),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    website: text("website"),
  };
}

/** True when the honeypot was filled in (treat as a bot: accept silently, deliver nothing). */
export function isLikelyBot(input: { website?: string | undefined }): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}

/** Plain-text summary of an enquiry for the staff notification and support email (no HTML). */
export function formatEnquiryText(enquiry: SchoolEnquiry, reference: string): string {
  const lines = [
    `Reference: ${reference}`,
    `School: ${enquiry.schoolName}`,
    `Contact: ${enquiry.contactName}${enquiry.role ? ` (${enquiry.role})` : ""}`,
    `Email: ${enquiry.email}`,
    ...(enquiry.phone ? [`Phone: ${enquiry.phone}`] : []),
    ...(enquiry.learners !== undefined ? [`Approximate learners: ${enquiry.learners}`] : []),
    ...(enquiry.boards.length > 0 ? [`Examination boards: ${enquiry.boards.join(", ")}`] : []),
    ...(enquiry.message ? ["", "Message:", enquiry.message] : []),
  ];
  return lines.join("\n");
}
