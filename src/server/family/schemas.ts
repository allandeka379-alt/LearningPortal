import { z } from "zod";
import type { GuardianRelationship, ParentLinkConsentBasis } from "@/generated/prisma/client";

/**
 * Input schemas and small shared types of the family module (§21 parent links). Isomorphic: no server imports, so
 * client forms may import the constants.
 */

export const GUARDIAN_RELATIONSHIPS = [
  "PARENT",
  "GUARDIAN",
  "GRANDPARENT",
  "SIBLING",
  "OTHER_RELATIVE",
  "SPONSOR",
  "OTHER",
] as const satisfies readonly GuardianRelationship[];

/** Relationships that may give guardian consent for a minor (a sponsor or sibling cannot). */
export const CONSENT_GIVING_RELATIONSHIPS: readonly GuardianRelationship[] = ["PARENT", "GUARDIAN"];

/** Consent bases that come from the student themself: only these may ever unlock AI conversations (DB CHECK). */
export const STUDENT_CONSENT_BASES: readonly ParentLinkConsentBasis[] = ["STUDENT_CODE", "STUDENT_APPROVAL"];

/** A student may have at most this many parents / guardians linked at once. */
export const MAX_ACTIVE_LINKS_PER_STUDENT = 6;
/** A parent account may follow at most this many children (the dashboard shows them all). */
export const MAX_CHILDREN_PER_PARENT = 12;

export const relationshipSchema = z.enum(GUARDIAN_RELATIONSHIPS, { error: "Choose how you are related." });

/** What a linked parent may see beyond subjects and the exam countdown (the per-link flags, §21). */
export interface LinkPermissions {
  /** Progress, mastery, weak areas. */
  progress: boolean;
  /** Study time, streaks, activity calendar. */
  activity: boolean;
  /** Test, quiz and mock exam results. */
  results: boolean;
}

/** Defaults offered when a student approves a link (schema defaults: all on; AI conversations always off). */
export const DEFAULT_LINK_PERMISSIONS: LinkPermissions = { progress: true, activity: true, results: true };

export const permissionsSchema = z.object({
  progress: z.boolean(),
  activity: z.boolean(),
  results: z.boolean(),
});

export const linkIdSchema = z.uuid({ error: "Invalid link." });
export const studentIdSchema = z.uuid({ error: "Invalid student." });

/** Free-text reason a person may give when ending a link (stored on the link, max 255 by the column). */
export const revokeReasonSchema = z
  .string()
  .trim()
  .max(255, { error: "Keep the reason under 255 characters." })
  .optional()
  .transform((value) => (value === undefined || value === "" ? null : value));

/** Weekly / monthly summary preference stored in `Profile.notificationPrefs.parentDigest`. */
export const PARENT_DIGEST_VALUES = ["OFF", "WEEKLY", "MONTHLY"] as const;
export type ParentDigestPreference = (typeof PARENT_DIGEST_VALUES)[number];
export const parentDigestSchema = z.enum(PARENT_DIGEST_VALUES, { error: "Choose how often to get a summary." });
