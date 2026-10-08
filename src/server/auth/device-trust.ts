import "server-only";
import { z } from "zod";
import { randomToken } from "@/server/lib/crypto";
import { peekRateLimit, rateLimit, type RateLimitInput } from "@/server/lib/rate-limit";
import { LOCKOUT_POLICY } from "./lockout";
import { seal, unseal } from "./sealed";

/**
 * Remembered devices (§39; the OWASP "device cookie" pattern). After a successful sign-in the browser keeps a sealed,
 * HttpOnly token (./device-cookie) naming the accounts it has signed in to. A password from such a device skips the
 * account lock and the shared per-IP credential budget (./flows), so someone who fails passwords on purpose (a
 * classmate behind the same school NAT, a script) cannot lock the owner out on the devices the owner already uses.
 *
 * - Wrong passwords from a remembered device still count as account failures. After
 *   {@link DEVICE_FAILURE_RULE}`.limit` of them in 15 minutes the device loses its exemption (a stolen token gives no
 *   extra guesses).
 * - The token is opaque to the browser (AES-256-GCM, purpose-bound key); it never grants access by itself.
 * - Nobody can obtain a token for an account they never signed in to, so for an attacker every response stays exactly
 *   as before (no account enumeration).
 */

export const DEVICE_TRUST_TTL_MS = 180 * 24 * 3600 * 1000;
/** Accounts remembered per device (e.g. a shared family computer); the oldest drops out first. */
export const MAX_DEVICE_ACCOUNTS = 10;

/** Wrong passwords a remembered device may make per account in 15 minutes before it is treated like any other. */
const DEVICE_FAILURE_RULE = { limit: LOCKOUT_POLICY.maxFailures - 1, windowSeconds: LOCKOUT_POLICY.lockMs / 1000 };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const payloadSchema = z.object({
  d: z.string().regex(/^[A-Za-z0-9_-]{16,64}$/),
  u: z.array(z.string().regex(UUID)).max(MAX_DEVICE_ACCOUNTS),
});

function openToken(token: string | null | undefined, now?: Date): z.output<typeof payloadSchema> | null {
  return unseal("device-trust", token, payloadSchema, now ? { now } : {});
}

/** Token remembering `userId` on this device (keeps the device id and up to {@link MAX_DEVICE_ACCOUNTS} accounts). */
export function rememberDevice(token: string | null | undefined, userId: string, now: Date = new Date()): string {
  const current = openToken(token, now);
  const deviceId = current?.d ?? randomToken(16);
  const users = [userId, ...(current?.u ?? []).filter((id) => id !== userId)].slice(0, MAX_DEVICE_ACCOUNTS);
  return seal("device-trust", { d: deviceId, u: users }, DEVICE_TRUST_TTL_MS, { now });
}

function deviceFailureLimit(deviceId: string, userId: string): RateLimitInput {
  return { key: `deviceFail:${deviceId}:${userId}`, ...DEVICE_FAILURE_RULE };
}

/**
 * The device id when `token` remembers `userId` and the device still has failure allowance for that account;
 * otherwise `null` (treat the request like any other). Never throws for a bad token.
 */
export async function trustedDeviceFor(token: string | null | undefined, userId: string): Promise<string | null> {
  const payload = openToken(token);
  if (payload === null || !payload.u.includes(userId)) return null;
  const allowance = await peekRateLimit(deviceFailureLimit(payload.d, userId));
  return allowance.allowed ? payload.d : null;
}

/** Records a wrong password made from a remembered device. */
export async function countTrustedDeviceFailure(deviceId: string, userId: string): Promise<void> {
  await rateLimit(deviceFailureLimit(deviceId, userId));
}
