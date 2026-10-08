import "server-only";
import type { Prisma, VerificationChannel, VerificationPurpose } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { generateNumericCode, hashIp, hmacSha256, randomToken, timingSafeEqualStr } from "@/server/lib/crypto";
import { logger } from "@/server/lib/logger";
import {
  assertRateLimit,
  rateLimits,
  rateLimitSubject,
  reserveRateLimits,
  type RateLimitInput,
  type RateLimitReservation,
} from "@/server/lib/rate-limit";
import { isMessageSwitchedOn, sendOtpMessage, type ChannelName } from "@/server/messaging";

/**
 * One-time codes (§33, ARCHITECTURE §5.1) on `VerificationCode`.
 *
 * - 6 digits, 10-minute TTL, 5 verification attempts per code (`attempts <= maxAttempts` is a CHECK).
 * - Only `HMAC-SHA256(SESSION_SECRET, "otp:" + purpose + ":" + target + ":" + code)` is stored, so a code is bound
 *   to its purpose and destination and is useless if the table leaks.
 * - Issuing a code consumes every older live code for the same (target, purpose).
 * - Sending is the most abusable endpoint (every code is a message to someone's inbox): a 60-second resend cooldown
 *   per (target, purpose), 3 per 15 minutes and 10 per day per target, 20 per hour per IP. Cooldown and limits live in `RateLimitBucket` keyed by
 *   HMACs, so they apply identically whether or not an account exists (no enumeration through "please wait"). They are
 *   reserved all-or-nothing: a refused request counts in no bucket, so nobody can keep someone else's cooldown or code
 *   budget exhausted with requests that are refused anyway.
 * - Verification is additionally limited to 10 tries per (target, purpose) per 15 minutes across codes.
 * - Accounts are email-based (owner decision 2026-10-07): sign-in, verification and reset codes go by EMAIL, which is
 *   account email and always sent. A code on SMS or WhatsApp (the WhatsApp channel's own linking flow) goes only while
 *   that channel is switched on (`features.sms` / `features.whatsapp`); the messaging layer never contacts a
 *   switched-off provider.
 */

export const OTP_POLICY = Object.freeze({
  length: 6,
  ttlMs: 10 * 60_000,
  maxAttempts: 5,
  resendCooldownSeconds: 60,
});

/** Verification attempts per (purpose, target) per 15 minutes, across codes. */
const VERIFY_TARGET_LIMIT = { limit: 10, windowSeconds: 15 * 60 } as const;

const CODE_PATTERN = /^\d{6}$/;

/** Channels a code can be sent on from the web flows (WhatsApp is used by the WhatsApp channel's own linking flow). */
export type OtpChannel = Extract<VerificationChannel, "EMAIL" | "SMS" | "WHATSAPP">;

/** EMAIL for email addresses, SMS for phone numbers. */
export function channelForTarget(target: string): Extract<VerificationChannel, "EMAIL" | "SMS"> {
  return target.includes("@") ? "EMAIL" : "SMS";
}

function messagingChannel(channel: OtpChannel): ChannelName {
  return channel === "EMAIL" ? "email" : channel === "SMS" ? "sms" : "whatsapp";
}

/** Keyed hash stored in `VerificationCode.codeHash` (64 hex chars). */
export function otpCodeHash(purpose: VerificationPurpose, target: string, code: string, secret?: string): string {
  const message = `otp:${purpose}:${target}:${code}`;
  return secret === undefined ? hmacSha256(message) : hmacSha256(message, secret);
}

function cooldownLimit(purpose: VerificationPurpose, target: string): RateLimitInput {
  return {
    key: `otpCooldown:${rateLimitSubject(`${purpose}:${target}`)}`,
    limit: 1,
    windowSeconds: OTP_POLICY.resendCooldownSeconds,
  };
}

/**
 * Applies the send cooldown and limits for (purpose, target, ip). Call it on EVERY send path, including the ones
 * that end up sending nothing (unknown account), so both look the same from outside.
 *
 * All-or-nothing ({@link reserveRateLimits}): a refused request is counted nowhere, so repeated refused requests
 * cannot pin a target's cooldown or use up its budgets. `extra` limits (e.g. the caller's IP-wide credential budget)
 * join the same reservation, checked after the cooldown.
 *
 * @throws AppError RATE_LIMITED with `retryAfterSeconds`.
 */
export async function assertOtpSendAllowed(
  purpose: VerificationPurpose,
  target: string,
  ip: string | null,
  extra: readonly RateLimitReservation[] = [],
): Promise<void> {
  const message = "Too many codes have been requested. Please try again later.";
  await reserveRateLimits([
    {
      input: cooldownLimit(purpose, target),
      message: (retryAfterSeconds) => `Please wait ${retryAfterSeconds} seconds before asking for another code.`,
    },
    ...extra,
    { input: rateLimits.otpSendIp(ip), message },
    { input: rateLimits.otpSendTarget(target), message },
    { input: rateLimits.otpSendTargetDaily(target), message },
  ]);
}

export interface IssueOtpInput {
  purpose: VerificationPurpose;
  /** Normalised email or E.164 phone. */
  target: string;
  /** Defaults to EMAIL for an email address (SMS for a phone number, sent only while SMS is switched on). */
  channel?: OtpChannel;
  /** Account the code belongs to (null only for flows that may precede an account, e.g. guardian consent). */
  userId: string | null;
  ip: string | null;
  /** Purpose-specific context (see the VerificationCode schema doc). */
  context?: Prisma.InputJsonObject;
  /** Set false when the caller already ran {@link assertOtpSendAllowed}. Default true. */
  checkLimits?: boolean;
  /**
   * `"await"` (default): wait for the provider and propagate its errors. `"background"`: the provider call runs after
   * this returns and failures are logged, never thrown. Anonymous flows (sign-in, reset, registration) use background
   * delivery so a response never reveals, by its latency or a provider error, that a code was sent (i.e. that an
   * account exists); the person can always ask for a new code.
   */
  delivery?: "await" | "background";
}

/** Stores a code row and consumes older live ones for the same (target, purpose). */
async function storeOtp(input: {
  purpose: VerificationPurpose;
  channel: OtpChannel;
  target: string;
  userId: string | null;
  codeHash: string;
  context?: Prisma.InputJsonObject;
  ip: string | null;
  now: Date;
}): Promise<{ codeId: string; expiresAt: Date }> {
  const expiresAt = new Date(input.now.getTime() + OTP_POLICY.ttlMs);
  const ip = input.ip?.trim();
  const row = await db.$transaction(async (tx) => {
    await tx.verificationCode.updateMany({
      where: { target: input.target, purpose: input.purpose, consumedAt: null },
      data: { consumedAt: input.now },
    });
    return tx.verificationCode.create({
      data: {
        purpose: input.purpose,
        channel: input.channel,
        target: input.target,
        userId: input.userId,
        codeHash: input.codeHash,
        maxAttempts: OTP_POLICY.maxAttempts,
        ...(input.context === undefined ? {} : { context: input.context }),
        ipHash: ip ? hashIp(ip) : null,
        createdAt: input.now,
        expiresAt,
      },
      select: { id: true },
    });
  });
  return { codeId: row.id, expiresAt };
}

/**
 * Creates a code, invalidates older ones for the same (target, purpose) and sends it. Returns the row id and expiry.
 */
export async function issueOtp(input: IssueOtpInput): Promise<{ codeId: string; expiresAt: Date }> {
  if (input.checkLimits !== false) await assertOtpSendAllowed(input.purpose, input.target, input.ip);
  const channel = input.channel ?? channelForTarget(input.target);
  const code = generateNumericCode(OTP_POLICY.length);
  const stored = await storeOtp({
    purpose: input.purpose,
    channel,
    target: input.target,
    userId: input.userId,
    codeHash: otpCodeHash(input.purpose, input.target, code),
    ...(input.context === undefined ? {} : { context: input.context }),
    ip: input.ip,
    now: new Date(),
  });

  // Read the switch BEFORE starting the send, so a background send reaches its adapter without further waiting. Codes
  // are account messages: by email always on; by SMS / WhatsApp only while that channel is switched on.
  const channelSwitchedOn = await isMessageSwitchedOn({ channel: messagingChannel(channel), transactional: true });
  const sending = sendOtpMessage(
    {
      channel: messagingChannel(channel),
      to: input.target,
      code,
      purpose: input.purpose,
      expiresInMinutes: Math.round(OTP_POLICY.ttlMs / 60_000),
    },
    { channelSwitchedOn },
  );
  if (input.delivery === "background") {
    // Never log the destination or the code.
    sending.catch((error: unknown) => logger.error("one-time code delivery failed", { purpose: input.purpose, channel, err: error }));
  } else {
    await sending;
  }
  return stored;
}

/**
 * The database work of {@link issueOtp} without a usable code or a message, for an anonymous request that names no
 * eligible account: the response then costs the same as a real send (no timing difference). The stored hash is of a
 * random value, so no code can ever match it.
 */
export async function issueDecoyOtp(input: { purpose: VerificationPurpose; target: string; ip: string | null }): Promise<void> {
  await storeOtp({
    purpose: input.purpose,
    channel: channelForTarget(input.target),
    target: input.target,
    userId: null,
    codeHash: hmacSha256(`otp-decoy:${randomToken(32)}`),
    ip: input.ip,
    now: new Date(),
  });
}

export type OtpVerification =
  | { ok: true; codeId: string; userId: string | null; context: Prisma.JsonValue | null }
  | { ok: false };

/**
 * Checks a code for (purpose, target). Success consumes the code (single use, race-safe). Every failure looks the
 * same to the caller (`{ ok: false }`): no code, expired, wrong code and exhausted attempts are indistinguishable.
 *
 * @throws AppError RATE_LIMITED after 10 tries per (purpose, target) in 15 minutes.
 */
export async function verifyOtp(input: {
  purpose: VerificationPurpose;
  target: string;
  code: string;
  now?: Date;
}): Promise<OtpVerification> {
  await assertRateLimit(
    { key: `otpVerify:${rateLimitSubject(`${input.purpose}:${input.target}`)}`, ...VERIFY_TARGET_LIMIT },
    "Too many attempts. Request a new code and try again in a few minutes.",
  );
  const code = input.code.trim();
  if (!CODE_PATTERN.test(code)) return { ok: false };
  const now = input.now ?? new Date();

  const row = await db.verificationCode.findFirst({
    where: { target: input.target, purpose: input.purpose, consumedAt: null, expiresAt: { gt: now } },
    orderBy: { createdAt: "desc" },
    select: { id: true, userId: true, codeHash: true, attempts: true, maxAttempts: true, context: true },
  });
  if (!row || row.attempts >= row.maxAttempts) return { ok: false };

  // Count the attempt first (atomically, bounded by maxAttempts) so parallel guesses cannot exceed the budget.
  const counted = await db.verificationCode.updateMany({
    where: { id: row.id, consumedAt: null, attempts: { lt: row.maxAttempts } },
    data: { attempts: { increment: 1 } },
  });
  if (counted.count === 0) return { ok: false };
  if (!timingSafeEqualStr(row.codeHash, otpCodeHash(input.purpose, input.target, code))) return { ok: false };

  const consumed = await db.verificationCode.updateMany({
    where: { id: row.id, consumedAt: null },
    data: { consumedAt: now },
  });
  if (consumed.count === 0) return { ok: false };
  return { ok: true, codeId: row.id, userId: row.userId, context: row.context };
}
