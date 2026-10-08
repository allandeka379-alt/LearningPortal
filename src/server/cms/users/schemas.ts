import { z } from "zod";
import { GuardianConsentStatus, Role, UserStatus } from "@/generated/prisma/enums";
import { pageSizeSchema } from "./cursor";

/**
 * Input schemas of the admin people services (§36 Users / Students / Teachers). Isomorphic so forms can share the
 * limits; every service parses its input with these at the boundary (rule 4).
 */

const uuid = z.uuid({ error: "Invalid id." });
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value === "" ? undefined : value));

export const ONBOARDING_FILTERS = ["completed", "in_progress"] as const;
export const VERIFICATION_FILTERS = ["verified", "unverified"] as const;

export const listUsersSchema = z.object({
  q: optionalText(200),
  role: z.enum(Role).optional(),
  status: z.enum(UserStatus).optional(),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema.optional(),
});
export type ListUsersInput = z.input<typeof listUsersSchema>;

export const listStudentsSchema = listUsersSchema.omit({ role: true }).extend({
  onboarding: z.enum(ONBOARDING_FILTERS).optional(),
  consent: z.enum(GuardianConsentStatus).optional(),
});
export type ListStudentsInput = z.input<typeof listStudentsSchema>;

export const listTeachersSchema = listUsersSchema.omit({ role: true }).extend({
  verification: z.enum(VERIFICATION_FILTERS).optional(),
});
export type ListTeachersInput = z.input<typeof listTeachersSchema>;

export const reasonSchema = z
  .string({ error: "Give a reason." })
  .trim()
  .min(5, { error: "Give a reason of at least 5 characters." })
  .max(500, { error: "Keep the reason under 500 characters." });

export const studentViewSchema = z.object({ userId: uuid, reason: reasonSchema });

export const suspendUserSchema = z.object({ userId: uuid, reason: reasonSchema });
export const reactivateUserSchema = z.object({ userId: uuid, reason: optionalText(500) });
export const userIdSchema = z.object({ userId: uuid });
export const revokeSessionSchema = z.object({ userId: uuid, sessionId: uuid });

/** Platform roles managed from the Users page (§5.2 `roles.grant`). SCHOOL_ADMIN is granted through schools. */
export const STAFF_GRANTABLE_ROLES = ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"] as const;
export type StaffGrantableRole = (typeof STAFF_GRANTABLE_ROLES)[number];

export const roleChangeSchema = z.object({
  userId: uuid,
  role: z.enum(STAFF_GRANTABLE_ROLES, { error: "Choose a staff role." }),
  reason: optionalText(500),
});

export const CONTACT_CHANNELS = ["email", "phone"] as const;
export const contactActionSchema = z.object({
  userId: uuid,
  channel: z.enum(CONTACT_CHANNELS).optional(),
});

/** "Issue a one-time password": the reason is recorded in the audit log (staff then hold a working credential). */
export const temporaryPasswordSchema = z.object({ userId: uuid, reason: reasonSchema });
