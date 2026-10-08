import "server-only";
import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { getEnv } from "./env";

/**
 * Small, opinionated crypto helpers (§39, ARCHITECTURE §5.1). Passwords are NOT hashed here: use Argon2id in
 * `src/server/auth`. These helpers cover tokens, digests and keyed hashes.
 */

const MAX_TOKEN_BYTES = 1024;
const MAX_CODE_LENGTH = 32;

/**
 * Cryptographically random token, base64url-encoded (URL- and cookie-safe, no padding).
 *
 * @param bytes - entropy in bytes. Use the default 32 (256 bits) for session tokens and other secrets.
 */
export function randomToken(bytes = 32): string {
  if (!Number.isInteger(bytes) || bytes < 1 || bytes > MAX_TOKEN_BYTES) {
    throw new RangeError(`randomToken: bytes must be an integer between 1 and ${MAX_TOKEN_BYTES}`);
  }
  return randomBytes(bytes).toString("base64url");
}

/** SHA-256 digest as lower-case hex. Use for storing high-entropy tokens (sessions, share links), not passwords. */
export function sha256Hex(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

/**
 * HMAC-SHA256 as lower-case hex, keyed with `SESSION_SECRET` by default.
 *
 * Use for low-entropy secrets that must be verifiable but not reversible (OTP codes) and for pseudonymising
 * identifiers (IP addresses). Callers should prefix the input with a purpose (e.g. `otp:login:+2637...:123456`) so
 * hashes for different purposes can never be swapped for each other.
 *
 * @param key - override for tests or for a dedicated secret; defaults to `getEnv().SESSION_SECRET`.
 */
export function hmacSha256(value: string, key: string = getEnv().SESSION_SECRET): string {
  return createHmac("sha256", key).update(value).digest("hex");
}

/**
 * Constant-time string comparison. Both sides are hashed first so neither the content nor the LENGTH of the
 * expected value leaks through timing (plain `timingSafeEqual` throws on length mismatch, which is itself a leak).
 */
export function timingSafeEqualStr(a: string, b: string): boolean {
  const left = createHash("sha256").update(a, "utf8").digest();
  const right = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(left, right);
}

/**
 * Random numeric code such as an OTP (`"042917"`). Leading zeros are kept, so the result is always `length` digits.
 * Each digit comes from `crypto.randomInt`, which uses rejection sampling, so there is no modulo bias.
 */
export function generateNumericCode(length = 6): string {
  if (!Number.isInteger(length) || length < 1 || length > MAX_CODE_LENGTH) {
    throw new RangeError(`generateNumericCode: length must be an integer between 1 and ${MAX_CODE_LENGTH}`);
  }
  let code = "";
  for (let i = 0; i < length; i += 1) code += String(randomInt(0, 10));
  return code;
}

/**
 * Keyed, non-reversible pseudonym for an IP address (rate-limit keys, audit context) so raw IPs are not stored.
 * IPv4-mapped IPv6 (`::ffff:1.2.3.4`) and letter case are normalised first so one client maps to one hash.
 */
export function hashIp(ip: string, key?: string): string {
  const normalized = ip.trim().toLowerCase().replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/, "");
  return key === undefined ? hmacSha256(`ip:${normalized}`) : hmacSha256(`ip:${normalized}`, key);
}
