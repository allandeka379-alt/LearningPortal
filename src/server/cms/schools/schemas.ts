import { z } from "zod";
import { SchoolMemberRole, SchoolMemberStatus, SchoolStatus, SchoolType } from "@/generated/prisma/enums";
import { isValidTimeZone } from "@/lib/dates";
import { normalizeEmail, normalizePhone } from "@/server/auth/identifiers";
import { pageSizeSchema } from "../users/cursor";

/** Input schemas for admin school management (§23 admin side, §36 Schools). Isomorphic. */

const uuid = z.uuid({ error: "Invalid id." });

const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, { error: `${label} must be at most ${max} characters.` })
    .optional()
    .transform((value) => (value === "" ? undefined : value));

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const schoolFields = {
  name: z.string({ error: "Enter the school's name." }).trim().min(2, { error: "Enter the school's name." }).max(200),
  slug: optionalText(120, "Slug").refine((value) => value === undefined || SLUG_PATTERN.test(value), {
    message: "Use lower-case letters, numbers and single hyphens, e.g. harare-high-school.",
  }),
  countryId: uuid,
  type: z.enum(SchoolType, { error: "Choose the type of school." }),
  region: optionalText(100, "Region"),
  district: optionalText(100, "District"),
  town: optionalText(100, "Town"),
  officialCode: optionalText(32, "Official code").transform((value) => value?.toUpperCase()),
  contactEmail: optionalText(254, "Email").transform((value, ctx) => {
    if (value === undefined) return undefined;
    const email = normalizeEmail(value);
    if (email === null) {
      ctx.addIssue({ code: "custom", message: "Enter a valid email address." });
      return z.NEVER;
    }
    return email;
  }),
  contactPhone: optionalText(32, "Phone").transform((value, ctx) => {
    if (value === undefined) return undefined;
    const phone = normalizePhone(value);
    if (phone === null) {
      ctx.addIssue({ code: "custom", message: "Enter a valid phone number, e.g. 0242 123456 or +263 77 123 4567." });
      return z.NEVER;
    }
    return phone;
  }),
  website: optionalText(255, "Website").refine((value) => value === undefined || /^https?:\/\/[^\s]+$/i.test(value), {
    message: "Enter a full web address starting with https://",
  }),
  timezone: optionalText(64, "Time zone").refine((value) => value === undefined || isValidTimeZone(value), {
    message: "Use an IANA time zone such as Africa/Harare.",
  }),
};

export const createSchoolSchema = z.object({ ...schoolFields, verifyNow: z.boolean().default(false) });
export type CreateSchoolInput = z.input<typeof createSchoolSchema>;

export const updateSchoolSchema = z.object({ schoolId: uuid, ...schoolFields });
export type UpdateSchoolInput = z.input<typeof updateSchoolSchema>;

/** Statuses a school may move to from each status (CLOSED is terminal: history is kept, the school stops operating). */
export const SCHOOL_STATUS_TRANSITIONS: Readonly<Record<SchoolStatus, readonly SchoolStatus[]>> = {
  PENDING_VERIFICATION: ["ACTIVE", "CLOSED"],
  ACTIVE: ["SUSPENDED", "CLOSED"],
  SUSPENDED: ["ACTIVE", "CLOSED"],
  CLOSED: [],
};

/** Transitions that must state a reason (they cut off the school's access). */
export const SCHOOL_STATUSES_NEEDING_REASON: readonly SchoolStatus[] = ["SUSPENDED", "CLOSED"];

export const changeSchoolStatusSchema = z
  .object({
    schoolId: uuid,
    to: z.enum(SchoolStatus),
    reason: optionalText(500, "Reason"),
  })
  .refine((value) => !SCHOOL_STATUSES_NEEDING_REASON.includes(value.to) || (value.reason !== undefined && value.reason.length >= 5), {
    message: "Give a reason of at least 5 characters.",
    path: ["reason"],
  });

export const listSchoolsSchema = z.object({
  q: optionalText(200, "Search"),
  status: z.enum(SchoolStatus).optional(),
  countryId: uuid.optional(),
  region: optionalText(100, "Region"),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema.optional(),
});
export type ListSchoolsInput = z.input<typeof listSchoolsSchema>;

export const listMembersSchema = z.object({
  schoolId: uuid,
  role: z.enum(SchoolMemberRole).optional(),
  status: z.enum(SchoolMemberStatus).optional(),
  q: optionalText(200, "Search"),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema.optional(),
});
export type ListMembersInput = z.input<typeof listMembersSchema>;

/** School roles staff invite from the admin console (students join through rosters, codes or requests). */
export const INVITABLE_SCHOOL_ROLES = ["SCHOOL_ADMIN", "TEACHER"] as const;

export const inviteMemberSchema = z.object({
  schoolId: uuid,
  contact: z.string({ error: "Enter an email address or phone number." }).trim().min(3, { error: "Enter an email address or phone number." }).max(254),
  role: z.enum(INVITABLE_SCHOOL_ROLES, { error: "Choose School admin or Teacher." }),
});
export type InviteMemberInput = z.input<typeof inviteMemberSchema>;

export const removeMemberSchema = z.object({ schoolId: uuid, memberId: uuid, reason: optionalText(500, "Reason") });
export const invitationActionSchema = z.object({ schoolId: uuid, invitationId: uuid });
