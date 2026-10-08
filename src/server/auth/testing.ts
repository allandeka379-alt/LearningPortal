import { randomInt } from "node:crypto";
import type { VerificationPurpose } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { rateLimitSubject } from "@/server/lib/rate-limit";
import { latestDevMessage } from "@/server/messaging";
import { hashPassword } from "./passwords";
import type { RequestMeta } from "./sessions";

/**
 * Helpers for the auth integration tests (not used by application code). Test files run in parallel against one
 * database, and IP-keyed rate limits are shared, so every test gets its own random IP.
 */

/** A random private IPv4 address (unique enough to keep IP rate-limit buckets separate between tests). */
export function randomIp(): string {
  return `10.${randomInt(0, 256)}.${randomInt(0, 256)}.${randomInt(1, 255)}`;
}

/** Request metadata with a fresh random IP. */
export function testMeta(overrides: Partial<RequestMeta> = {}): RequestMeta {
  return {
    ip: randomIp(),
    userAgent: "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
    requestId: `test-${randomInt(1e9, 1e10)}`,
    ...overrides,
  };
}

/** The 6-digit code in the latest message captured by the console messaging driver for `target`. */
export function latestCodeFor(target: string): string {
  const message = latestDevMessage(target);
  const code = message?.text.match(/\b(\d{6})\b/)?.[1];
  if (!code) throw new Error(`no one-time code captured for ${target}`);
  return code;
}

let cachedHash: Promise<string> | undefined;

/** The password every password fixture uses, and its Argon2id hash (computed once per test file). */
export const TEST_PASSWORD = "kudu river maths";
export function testPasswordHash(): Promise<string> {
  cachedHash ??= hashPassword(TEST_PASSWORD);
  return cachedHash;
}

/**
 * Removes the resend-cooldown bucket of one (purpose, target) so a test can send again immediately. Only touches the
 * bucket of the test's own unique target.
 */
export async function clearOtpCooldown(purpose: VerificationPurpose, target: string): Promise<void> {
  await db.rateLimitBucket.deleteMany({ where: { key: `otpCooldown:${rateLimitSubject(`${purpose}:${target}`)}` } });
}
