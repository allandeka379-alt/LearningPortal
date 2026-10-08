import { z } from "zod";
import { AnnouncementScope, Role } from "@/generated/prisma/enums";
import { timeZoneOffsetMinutes } from "@/lib/dates";
import { pageSizeSchema } from "../users/cursor";

/** Input schemas and pure rules for admin announcements (§22, §25 "announcements", §36 Notifications). Isomorphic. */

export const ANNOUNCEMENT_STATES = ["DRAFT", "SCHEDULED", "LIVE", "EXPIRED", "ARCHIVED"] as const;
export type AnnouncementState = (typeof ANNOUNCEMENT_STATES)[number];

/** How a save publishes: keep as a draft, publish now, or schedule for `publishAt`. */
export const PUBLISH_MODES = ["draft", "now", "schedule"] as const;
export type PublishMode = (typeof PUBLISH_MODES)[number];

/**
 * Audience roles allowed per scope (empty audience = everyone in scope: every ACTIVE user for GLOBAL, every ACTIVE
 * member for SCHOOL, the class's students and teachers for CLASS). Parents are reached through ACTIVE parent links of
 * the scope's students and only when PARENT is chosen. SCHOOL_ADMIN never on CLASS scope (database CHECK).
 */
export const AUDIENCE_ROLES_BY_SCOPE: Readonly<Record<AnnouncementScope, readonly Role[]>> = {
  GLOBAL: ["STUDENT", "PARENT", "TEACHER", "SCHOOL_ADMIN", "CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"],
  SCHOOL: ["STUDENT", "TEACHER", "SCHOOL_ADMIN", "PARENT"],
  CLASS: ["STUDENT", "TEACHER", "PARENT"],
};

export const MAX_BODY_LENGTH = 10_000;

/** State of an announcement at `now` (pure). */
export function announcementState(
  row: { publishedAt: Date | null; expiresAt: Date | null; archivedAt: Date | null },
  now: Date,
): AnnouncementState {
  if (row.archivedAt) return "ARCHIVED";
  if (!row.publishedAt) return "DRAFT";
  if (row.publishedAt > now) return "SCHEDULED";
  if (row.expiresAt && row.expiresAt <= now) return "EXPIRED";
  return "LIVE";
}

const LOCAL_DATE_TIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/;

/** `YYYY-MM-DDTHH:mm` (a `datetime-local` input) on the wall clock of `timeZone` → instant; `null` when malformed. */
export function localDateTimeToInstant(value: string, timeZone: string): Date | null {
  const match = LOCAL_DATE_TIME.exec(value.trim());
  if (!match) return null;
  const [, y, mo, d, h, mi, s] = match;
  const asUtc = Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s ?? 0));
  const check = new Date(asUtc);
  if (check.getUTCMonth() !== Number(mo) - 1 || check.getUTCDate() !== Number(d) || Number(h) > 23 || Number(mi) > 59) return null;
  let candidate = asUtc - timeZoneOffsetMinutes(asUtc, timeZone) * 60_000;
  candidate = asUtc - timeZoneOffsetMinutes(candidate, timeZone) * 60_000;
  return new Date(candidate);
}

/** Instant → `YYYY-MM-DDTHH:mm` on the wall clock of `timeZone` (form defaults). */
export function instantToLocalDateTime(instant: Date, timeZone: string): string {
  const shifted = new Date(instant.getTime() + timeZoneOffsetMinutes(instant, timeZone) * 60_000);
  return shifted.toISOString().slice(0, 16);
}

const uuid = z.uuid({ error: "Invalid id." });
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value === "" ? undefined : value));

const announcementFields = {
  scope: z.enum(AnnouncementScope, { error: "Choose who the announcement is for." }),
  /** SCHOOL scope: the school's id or slug. */
  schoolRef: optionalText(120),
  /** CLASS scope: the class's id or join code. */
  classRef: optionalText(64),
  /** GLOBAL scope only: narrow to one country. */
  countryId: uuid.optional(),
  title: z.string({ error: "Enter a title." }).trim().min(3, { error: "Enter a title of at least 3 characters." }).max(200),
  body: z
    .string({ error: "Write the announcement." })
    .trim()
    .min(1, { error: "Write the announcement." })
    .max(MAX_BODY_LENGTH, { error: `Keep it under ${MAX_BODY_LENGTH.toLocaleString("en")} characters.` }),
  audienceRoles: z.array(z.enum(Role)).max(7).default([]),
  pinned: z.boolean().default(false),
  notify: z.boolean().default(true),
  publish: z.enum(PUBLISH_MODES).default("draft"),
  /** `datetime-local` value in the platform time zone; required for "schedule". */
  publishAt: optionalText(32),
  /** `datetime-local` value; optional end of visibility. */
  expiresAt: optionalText(32),
};

function refineAnnouncement(value: { scope: AnnouncementScope; schoolRef?: string | undefined; classRef?: string | undefined; countryId?: string | undefined; audienceRoles: Role[]; publish: PublishMode; publishAt?: string | undefined }, ctx: z.RefinementCtx): void {
  if (value.scope === "SCHOOL" && !value.schoolRef) ctx.addIssue({ code: "custom", path: ["schoolRef"], message: "Enter the school's slug or id." });
  if (value.scope === "CLASS" && !value.classRef) ctx.addIssue({ code: "custom", path: ["classRef"], message: "Enter the class join code or id." });
  if (value.scope !== "GLOBAL" && value.countryId) ctx.addIssue({ code: "custom", path: ["countryId"], message: "Only platform-wide announcements can be narrowed to a country." });
  const allowed = AUDIENCE_ROLES_BY_SCOPE[value.scope];
  const invalid = value.audienceRoles.filter((role) => !allowed.includes(role));
  if (invalid.length > 0) ctx.addIssue({ code: "custom", path: ["audienceRoles"], message: `Not available for this audience: ${invalid.join(", ")}.` });
  if (value.publish === "schedule" && !value.publishAt) ctx.addIssue({ code: "custom", path: ["publishAt"], message: "Choose when to publish." });
}

export const createAnnouncementSchema = z.object(announcementFields).superRefine(refineAnnouncement);
export type CreateAnnouncementInput = z.input<typeof createAnnouncementSchema>;

export const updateAnnouncementSchema = z.object({ announcementId: uuid, ...announcementFields }).superRefine(refineAnnouncement);
export type UpdateAnnouncementInput = z.input<typeof updateAnnouncementSchema>;

export const announcementIdSchema = z.object({ announcementId: uuid });

export const listAnnouncementsSchema = z.object({
  scope: z.enum(AnnouncementScope).optional(),
  state: z.enum(ANNOUNCEMENT_STATES).optional(),
  q: optionalText(200),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema.optional(),
});
export type ListAnnouncementsInput = z.input<typeof listAnnouncementsSchema>;
