import "server-only";
import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "node:crypto";
import type { z } from "zod";
import { getEnv } from "@/server/lib/env";

/**
 * Sealed (encrypted + authenticated) short-lived values for auth cookies: the pending OTP flow (which email/phone is
 * being verified) and the Google OAuth state / PKCE verifier / nonce.
 *
 * AES-256-GCM with a key derived from `SESSION_SECRET` by HKDF and a per-purpose `info`, so a value sealed for one
 * purpose can never be opened as another. The payload carries its own expiry (`exp`, epoch ms) checked on open,
 * independently of the cookie's Max-Age. Contents stay opaque to the browser (the email/phone is never readable from
 * the cookie jar on a shared device) and are never placed in URLs.
 */

const IV_BYTES = 12;
const TAG_BYTES = 16;

export type SealPurpose = "auth-flow" | "oauth" | "device-trust";

function key(purpose: SealPurpose, secret: string): Buffer {
  return Buffer.from(hkdfSync("sha256", secret, "dz-sealed-v1", `dz:${purpose}`, 32));
}

/**
 * Seals `payload` (JSON) with an expiry. Returns a base64url string safe for cookie values.
 *
 * @param ttlMs - lifetime from `now`.
 */
export function seal(
  purpose: SealPurpose,
  payload: Record<string, unknown>,
  ttlMs: number,
  options: { now?: Date; secret?: string } = {},
): string {
  const now = options.now ?? new Date();
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", key(purpose, options.secret ?? getEnv().SESSION_SECRET), iv);
  const plaintext = Buffer.from(JSON.stringify({ ...payload, exp: now.getTime() + ttlMs }), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString("base64url");
}

/**
 * Opens a value produced by {@link seal} and validates it with `schema`. Returns `null` for anything tampered,
 * expired, sealed for another purpose or not matching the schema. Never throws.
 */
export function unseal<S extends z.ZodType>(
  purpose: SealPurpose,
  value: string | null | undefined,
  schema: S,
  options: { now?: Date; secret?: string } = {},
): z.output<S> | null {
  if (!value || value.length > 4096 || !/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const bytes = Buffer.from(value, "base64url");
    if (bytes.length <= IV_BYTES + TAG_BYTES) return null;
    const decipher = createDecipheriv(
      "aes-256-gcm",
      key(purpose, options.secret ?? getEnv().SESSION_SECRET),
      bytes.subarray(0, IV_BYTES),
    );
    decipher.setAuthTag(bytes.subarray(IV_BYTES, IV_BYTES + TAG_BYTES));
    const plaintext = Buffer.concat([decipher.update(bytes.subarray(IV_BYTES + TAG_BYTES)), decipher.final()]);
    const parsed = JSON.parse(plaintext.toString("utf8")) as unknown;
    if (typeof parsed !== "object" || parsed === null) return null;
    const exp = (parsed as { exp?: unknown }).exp;
    if (typeof exp !== "number" || exp <= (options.now ?? new Date()).getTime()) return null;
    const result = schema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
