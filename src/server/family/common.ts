import "server-only";
import { Prisma, type Role } from "@/generated/prisma/client";
import type { Actor } from "@/server/auth/actor";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertRateLimit, RATE_LIMIT_PRESETS, rateLimits, rateLimitSubject, type RateLimitInput } from "@/server/lib/rate-limit";

/** The actor fields the family services need (a full `Actor` satisfies it). */
export type FamilyActor = Pick<Actor, "userId" | "roles">;

/** Optional request metadata for audit entries and IP rate limits (never stored raw). */
export type FamilyRequestMeta = AuditRequestInfo;

export function assertStudent(actor: FamilyActor): void {
  if (!actor.roles.includes("STUDENT")) throw AppError.forbidden("Only a student account can do this.");
}

export function assertParent(actor: FamilyActor): void {
  if (!actor.roles.includes("PARENT")) throw AppError.forbidden("Only a parent or guardian account can do this.");
}

/** True for a unique-constraint violation (e.g. the one-open-link-per-pair partial unique). */
export function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/** The later of two instants (consent timestamps must never precede the link row's `createdAt`, DB CHECK). */
export function notBefore(at: Date, floor: Date): Date {
  return at.getTime() >= floor.getTime() ? at : floor;
}

/** Name shown for a person in the family screens (display name, else first + last name). Never logged. */
export function personName(
  profile: { displayName: string | null; firstName: string | null; lastName?: string | null } | null | undefined,
  fallback: string,
): string {
  const display = profile?.displayName?.trim();
  if (display) return display;
  const full = [profile?.firstName?.trim(), profile?.lastName?.trim()].filter(Boolean).join(" ");
  return full || fallback;
}

/** True when the user row can take part in a link (exists, active, holds the role). */
export function isActiveWithRole(user: { status: string; roles: readonly Role[] } | null, role: Role): boolean {
  return user !== null && user.status === "ACTIVE" && user.roles.includes(role);
}

// ---------------------------------------------------------------------------------------------------------------------
// Rate limits (ARCHITECTURE §5.5): the shared `family*` presets of src/server/lib/rate-limit.ts (tunable through the
// `rateLimits` setting) under the keys `family.<name>:<subject>`.
// ---------------------------------------------------------------------------------------------------------------------

const FAMILY_LIMITERS = {
  /** Link codes created per user. */
  codeIssue: rateLimits.familyCodeIssue,
  /** Code redemption attempts per user (brute-force guard on 31^8 codes). */
  codeRedeem: rateLimits.familyCodeRedeem,
  codeRedeemDaily: rateLimits.familyCodeRedeemDaily,
  /** Code redemption attempts per client IP (subject already hashed with `rateLimitSubject`). */
  codeRedeemIp: rateLimits.familyCodeRedeemIp,
  /** Parent link requests by contact (enumeration / spam guard). */
  linkRequest: rateLimits.familyLinkRequest,
  linkRequestDaily: rateLimits.familyLinkRequestDaily,
  /** "Check payment status" polls per parent. */
  paymentPoll: rateLimits.familyPaymentPoll,
} as const satisfies Record<string, (subject: string) => RateLimitInput>;

type FamilyLimiter = keyof typeof FAMILY_LIMITERS;

/** Built-in limits (before any `rateLimits` override), by family limiter name. */
export const FAMILY_RATE_LIMITS = {
  codeIssue: RATE_LIMIT_PRESETS.familyCodeIssue,
  codeRedeem: RATE_LIMIT_PRESETS.familyCodeRedeem,
  codeRedeemDaily: RATE_LIMIT_PRESETS.familyCodeRedeemDaily,
  codeRedeemIp: RATE_LIMIT_PRESETS.familyCodeRedeemIp,
  linkRequest: RATE_LIMIT_PRESETS.familyLinkRequest,
  linkRequestDaily: RATE_LIMIT_PRESETS.familyLinkRequestDaily,
  paymentPoll: RATE_LIMIT_PRESETS.familyPaymentPoll,
} as const satisfies Record<FamilyLimiter, { limit: number; windowSeconds: number }>;

function limiter(name: FamilyLimiter, subject: string): RateLimitInput {
  return FAMILY_LIMITERS[name](subject);
}

/** Counts a hit on each limiter and throws RATE_LIMITED (with a friendly message) when any is over its limit. */
export async function assertFamilyRateLimits(
  checks: readonly { name: FamilyLimiter; subject: string }[],
  message: string,
): Promise<void> {
  for (const check of checks) await assertRateLimit(limiter(check.name, check.subject), message);
}

/** Rate-limit subject for an IP (keyed hash, never the raw address). */
export function ipSubject(ip: string | null | undefined): string | null {
  return ip ? rateLimitSubject(ip) : null;
}
