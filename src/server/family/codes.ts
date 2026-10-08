import "server-only";
import { randomInt } from "node:crypto";
import { hmacSha256 } from "@/server/lib/crypto";

/**
 * Parent-link invite codes (§21, schema `ParentStudentLink.inviteCodeHash`). Pure apart from the keyed hash.
 *
 * - 8 characters from an alphabet without look-alikes (no 0/O, 1/I/L), so a code read aloud over the phone or copied
 *   from an SMS survives: 31^8 ≈ 8.5 × 10^11 combinations. Shown grouped as `ABCD-EFGH`.
 * - Only `HMAC-SHA256(SESSION_SECRET, code)` is stored (schema contract), never the code. The code is shown once.
 * - Input is forgiving: case, spaces and dashes are ignored ("abcd efgh", "ABCD-EFGH").
 * - Short-lived ({@link LINK_CODE_TTL_HOURS}); redemption attempts are rate-limited by the services.
 */

export const LINK_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const LINK_CODE_LENGTH = 8;
/** Codes expire after one day: long enough to pass on, short enough that a leaked code soon becomes useless. */
export const LINK_CODE_TTL_HOURS = 24;
/** A parent's request (by the student's email / phone / username) waits this long for the student's answer. */
export const LINK_REQUEST_TTL_DAYS = 14;

const CODE_PATTERN = new RegExp(`^[${LINK_CODE_ALPHABET}]{${LINK_CODE_LENGTH}}$`);

/** A fresh random code (crypto RNG, rejection-sampled: no modulo bias). */
export function generateLinkCode(random: (max: number) => number = (max) => randomInt(0, max)): string {
  let code = "";
  for (let i = 0; i < LINK_CODE_LENGTH; i += 1) code += LINK_CODE_ALPHABET[random(LINK_CODE_ALPHABET.length)];
  return code;
}

/** `ABCDEFGH` → `ABCD-EFGH` (display only). */
export function formatLinkCode(code: string): string {
  return code.length === LINK_CODE_LENGTH ? `${code.slice(0, 4)}-${code.slice(4)}` : code;
}

/** What a person typed → the canonical code, or `null` when it cannot be one of our codes. */
export function normalizeLinkCode(input: unknown): string | null {
  if (typeof input !== "string" || input.length > 32) return null;
  const compact = input.replace(/[\s\-–—_.]/g, "").toUpperCase();
  return CODE_PATTERN.test(compact) ? compact : null;
}

/** The stored form of a code (schema: `HMAC-SHA256(SESSION_SECRET, code)` hex). */
export function hashLinkCode(code: string, secret?: string): string {
  return secret === undefined ? hmacSha256(code) : hmacSha256(code, secret);
}

/** Expiry instant of a code issued at `now`. */
export function linkCodeExpiry(now: Date): Date {
  return new Date(now.getTime() + LINK_CODE_TTL_HOURS * 3_600_000);
}

/** Expiry instant of a parent's link request made at `now`. */
export function linkRequestExpiry(now: Date): Date {
  return new Date(now.getTime() + LINK_REQUEST_TTL_DAYS * 86_400_000);
}
