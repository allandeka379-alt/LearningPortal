import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { DEFAULT_TIMEZONE, SUPPORT_EMAIL, SUPPORT_EMAIL_CONFIGURED } from "@/lib/config";
import { localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, rateLimitSubject } from "@/server/lib/rate-limit";
import { sendMessage } from "@/server/messaging";
import { notifyMany } from "@/server/notifications";
import { formatEnquiryText, isLikelyBot, schoolEnquirySchema, type SchoolEnquiry } from "./enquiry-schema";

/**
 * School enquiries from the /schools "Talk to us" form (§53 B2B / B2B2C lead capture).
 *
 * There is no lead/contact table in the schema yet, so an enquiry is delivered, not stored as its own row:
 *  1. an in-app Notification (category SYSTEM, type `system.school_enquiry`) to every active platform ADMIN and
 *     SUPER_ADMIN (they own school onboarding in /admin/schools), and
 *  2. an email to the configured support address (`NEXT_PUBLIC_SUPPORT_EMAIL`) through the messaging adapters.
 * At least one must succeed, otherwise the visitor is told to try again (nothing is silently dropped).
 *
 * Abuse control: a honeypot field, per-IP and per-email rate limits (keyed HMACs, never raw values), and a per-day dedupe
 * key so a double submit does not notify twice. Logs carry the reference only, never the contact details.
 */

/** Per IP: 5 enquiries an hour. Per email address: 3 a day. (Proposed presets for `rate-limit.ts`.) */
export const ENQUIRY_RATE_LIMITS = {
  ip: { limit: 5, windowSeconds: 3600 },
  email: { limit: 3, windowSeconds: 24 * 3600 },
} as const;

const NOTIFICATION_BODY_MAX = 2_000;
const MAX_RECIPIENTS = 50;

export interface EnquiryContext {
  ip: string | null;
  now?: Date;
}

export interface EnquiryDeps {
  /** Staff user ids to notify (default: active ADMIN / SUPER_ADMIN accounts). */
  findRecipients: () => Promise<string[]>;
  /** Delivers the support email; resolves false when no support address is configured or email is switched off. */
  sendSupportEmail: (subject: string, text: string) => Promise<boolean>;
}

async function findPlatformAdmins(): Promise<string[]> {
  const rows = await db.user.findMany({
    where: { roles: { hasSome: ["ADMIN", "SUPER_ADMIN"] }, status: "ACTIVE", deletedAt: null },
    select: { id: true },
    orderBy: { createdAt: "asc" },
    take: MAX_RECIPIENTS,
  });
  return rows.map((row) => row.id);
}

async function sendSupportEmail(subject: string, text: string): Promise<boolean> {
  if (!SUPPORT_EMAIL_CONFIGURED) return false;
  // While email is switched off (features.email) nothing is sent: the in-app staff notification is the record.
  const sent = await sendMessage({ channel: "email", to: SUPPORT_EMAIL, subject, text, tag: "marketing.school_enquiry" });
  return sent.switchedOff !== true;
}

export const defaultEnquiryDeps: EnquiryDeps = { findRecipients: findPlatformAdmins, sendSupportEmail };

/** Short reference the visitor can quote, e.g. "SE-3F9A1C2B". */
export function newEnquiryReference(): string {
  return `SE-${randomBytes(4).toString("hex").toUpperCase()}`;
}

/** Same school + email on the same day → same key (a double submit notifies once). ≤ 128 chars. */
export function enquiryDedupeKey(enquiry: Pick<SchoolEnquiry, "email" | "schoolName">, day: string): string {
  const digest = createHash("sha256").update(`${enquiry.email}|${enquiry.schoolName.toLowerCase()}|${day}`).digest("hex");
  return `school_enquiry:${digest.slice(0, 40)}`;
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Validates and delivers a school enquiry. Returns the reference shown to the visitor.
 *
 * @throws AppError VALIDATION (field errors) | RATE_LIMITED | INTERNAL (no delivery channel available)
 */
export async function submitSchoolEnquiry(input: unknown, context: EnquiryContext, deps: EnquiryDeps = defaultEnquiryDeps): Promise<{ reference: string }> {
  const parsed = schoolEnquirySchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Please check the highlighted fields.");
  const enquiry = parsed.data;
  const reference = newEnquiryReference();

  if (isLikelyBot(enquiry)) {
    // Looks like success to the bot; nothing is delivered.
    logger.info("school enquiry discarded (honeypot)", { reference });
    return { reference };
  }

  const message = "Too many enquiries were sent. Please try again later, or email us.";
  await assertRateLimit({ key: `schoolEnquiry:${rateLimitSubject(context.ip)}`, ...ENQUIRY_RATE_LIMITS.ip }, message);
  await assertRateLimit({ key: `schoolEnquiryEmail:${rateLimitSubject(enquiry.email)}`, ...ENQUIRY_RATE_LIMITS.email }, message);

  const text = formatEnquiryText(enquiry, reference);
  const subject = truncate(`School enquiry: ${enquiry.schoolName}`, 200);
  const day = localDateString(context.now ?? new Date(), DEFAULT_TIMEZONE);

  let notified = 0;
  const recipients = await deps.findRecipients();
  if (recipients.length > 0) {
    const result = await notifyMany(recipients, {
      type: "system.school_enquiry",
      category: "SYSTEM",
      title: subject,
      body: truncate(text, NOTIFICATION_BODY_MAX),
      data: { href: "/admin/schools", reference },
      dedupeKey: enquiryDedupeKey(enquiry, day),
    });
    // 0 created with recipients present = the same enquiry was already delivered today (dedupe): still a success.
    notified = result.created > 0 ? result.created : recipients.length;
  }

  let emailed = false;
  try {
    emailed = await deps.sendSupportEmail(subject, text);
  } catch (error) {
    logger.error("school enquiry email failed", { reference, err: error });
  }

  if (notified === 0 && !emailed) {
    logger.error("school enquiry could not be delivered: no admin recipients and no support email configured", { reference });
    throw new AppError("INTERNAL", "We couldn't send your enquiry right now.");
  }
  logger.info("school enquiry received", { reference, notified, emailed });
  return { reference };
}
