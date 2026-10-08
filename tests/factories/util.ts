/**
 * Schema-independent fixture helpers.
 *
 * Test files run IN PARALLEL against one shared, never-truncated test database, so every fixture value that lands in a
 * unique column must be collision-free. Build such values with these helpers and never rely on global table state
 * (no truncation, no "count(*) over the whole table" assertions).
 */
import { randomInt, randomUUID } from "node:crypto";

/** Random, collision-free suffix (12 lower-case hex chars, 48 bits). */
export function uniqueSuffix(): string {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

/** Unique identifier-like string, e.g. `uniqueId("school")` → `school-3f2a9c1e0b7d`. */
export function uniqueId(prefix = "test"): string {
  return `${prefix}-${uniqueSuffix()}`;
}

/**
 * Unique URL slug matching the platform slug format `^[a-z0-9]+(-[a-z0-9]+)*$`, e.g. `uniqueSlug("O-Level Maths")` →
 * `o-level-maths-3f2a9c1e0b7d`. Non-alphanumerics in the prefix collapse to single hyphens.
 */
export function uniqueSlug(prefix = "test"): string {
  const clean = prefix.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${clean || "test"}-${uniqueSuffix()}`;
}

/** Unique email on the reserved `example.test` domain (RFC 2606), lower-case so it is already normalised. */
export function uniqueEmail(prefix = "user"): string {
  const clean = prefix.toLowerCase().replace(/[^a-z0-9._-]+/g, "") || "user";
  return `${clean}.${uniqueSuffix()}@example.test`;
}

const MOBILE_PREFIXES = ["71", "73", "77", "78"] as const;

/**
 * Random Zimbabwean mobile number in E.164 (`+2637Xxxxxxxx`, operator prefixes 71/73/77/78). Tests use console
 * messaging drivers, so nothing is ever sent.
 *
 * The national number space is small (4 × 10^7 values), so this is "very likely" rather than "practically" unique in a
 * database that is never truncated: create phone fixtures only where a test needs one.
 */
export function uniquePhone(): string {
  const prefix = MOBILE_PREFIXES[randomInt(0, MOBILE_PREFIXES.length)] ?? "77";
  return `+263${prefix}${String(randomInt(0, 10_000_000)).padStart(7, "0")}`;
}

/** Alias kept for callers of the old `tests/factories.ts` helper name. */
export const uniquePhoneE164 = uniquePhone;

/** Unique public handle matching `Profile.username` (`^[a-z0-9_]{3,30}$`), e.g. `u_3f2a9c1e0b7d`. */
export function uniqueUsername(prefix = "u"): string {
  const clean = prefix.toLowerCase().replace(/[^a-z0-9_]+/g, "").slice(0, 16) || "u";
  return `${clean}_${uniqueSuffix()}`;
}

/** Unique upper-case code matching `Class.joinCode` (`^[A-Z0-9]{6,10}$`): 10 characters. */
export function uniqueJoinCode(): string {
  return uniqueSuffix().slice(0, 10).toUpperCase();
}

/** Unique short code (upper-case, `prefix` + 8 hex chars), for `code` columns such as `ExamBoard.code` (VarChar 32). */
export function uniqueCode(prefix = "T"): string {
  return `${prefix.toUpperCase().replace(/[^A-Z0-9]+/g, "")}${uniqueSuffix().slice(0, 8).toUpperCase()}`;
}
