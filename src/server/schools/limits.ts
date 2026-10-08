import "server-only";
import { assertRateLimit, RATE_LIMIT_PRESETS, rateLimits, type RateLimitInput } from "@/server/lib/rate-limit";

/**
 * Rate limits of the school area (ARCHITECTURE §5.5): the shared `school*` presets of src/server/lib/rate-limit.ts
 * (tunable through the `rateLimits` setting) under the keys `school.<name>:<subject>` (subjects are ids, never contact
 * details). Messages to one recipient additionally use the shared `adminContactSend` presets.
 */
const SCHOOL_LIMITERS = {
  /** Invitations sent by one admin. */
  invite: rateLimits.schoolInvite,
  /** Roster dry runs by one admin. */
  rosterValidate: rateLimits.schoolRosterValidate,
  /** Roster commit chunks by one admin (a 1,000-row file is 20 chunks). */
  rosterCommit: rateLimits.schoolRosterCommit,
  /** Single password resets by one admin. */
  passwordReset: rateLimits.schoolPasswordReset,
  /** Bulk password resets (up to 50 students each) by one admin. */
  passwordResetBulk: rateLimits.schoolPasswordResetBulk,
  /** Report requests per school. */
  reportRequest: rateLimits.schoolReportRequest,
  /** School plan requests per school. */
  planRequest: rateLimits.schoolPlanRequest,
} as const satisfies Record<string, (subject: string) => RateLimitInput>;

export type SchoolRateLimitName = keyof typeof SCHOOL_LIMITERS;

/** Built-in limits (before any `rateLimits` override), by school limiter name. */
export const SCHOOL_RATE_LIMITS = {
  invite: RATE_LIMIT_PRESETS.schoolInvite,
  rosterValidate: RATE_LIMIT_PRESETS.schoolRosterValidate,
  rosterCommit: RATE_LIMIT_PRESETS.schoolRosterCommit,
  passwordReset: RATE_LIMIT_PRESETS.schoolPasswordReset,
  passwordResetBulk: RATE_LIMIT_PRESETS.schoolPasswordResetBulk,
  reportRequest: RATE_LIMIT_PRESETS.schoolReportRequest,
  planRequest: RATE_LIMIT_PRESETS.schoolPlanRequest,
} as const satisfies Record<SchoolRateLimitName, { limit: number; windowSeconds: number }>;

export function schoolLimit(name: SchoolRateLimitName, subject: string): RateLimitInput {
  return SCHOOL_LIMITERS[name](subject);
}

export async function assertSchoolLimit(name: SchoolRateLimitName, subject: string, message?: string): Promise<void> {
  await assertRateLimit(schoolLimit(name, subject), message ?? "Too many requests. Please wait a few minutes and try again.");
}
