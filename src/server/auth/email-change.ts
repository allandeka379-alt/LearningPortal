import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { audit } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import type { Actor } from "./actor";
import { AUTH_AUDIT } from "./audit-events";
import { AUTH_MESSAGES, internal } from "./flows";
import { maskIdentifier, normalizeEmail } from "./identifiers";
import { sendSecurityNotice, verifiedEmailOf } from "./notices";
import { assertOtpSendAllowed, issueDecoyOtp, issueOtp, verifyOtp } from "./otp";
import { emailChangeConfirmSchema, emailChangeRequestSchema } from "./schemas";
import type { RequestMeta } from "./sessions";

/**
 * Change (or add) the account email address, signed in (§33; owner decision 2026-10-07: accounts are email-based, so
 * the address is how a person signs in with a code and resets their password).
 *
 * 1. {@link requestEmailChange}: the current password (a stolen session alone cannot move the account to another
 *    inbox) and the new address. A code is emailed to the NEW address; its row (`VerificationCode`, purpose
 *    EMAIL_VERIFY) belongs to this user and carries `context.change = "email"`.
 * 2. {@link confirmEmailChange}: the new address and the code. The address replaces the old one and is verified at
 *    once; the OLD verified address gets a security notice.
 *
 * Anti-enumeration: when the new address already belongs to another account, nothing is sent and step 1 answers
 * exactly as usual (same limits, same database work); step 2 then fails like a wrong code. Accounts without a password
 * (Google-only) set one first through "Forgot password". The same send limits and cooldown as every code apply.
 */

const CHANGE_CONTEXT = { change: "email" } as const;
const NO_PASSWORD_MESSAGE = "Your account has no password yet. Use “Forgot your password?” on the sign-in page to set one, then change your email.";

function contextIsEmailChange(context: Prisma.JsonValue | null): boolean {
  return typeof context === "object" && context !== null && !Array.isArray(context) && context.change === CHANGE_CONTEXT.change;
}

/**
 * Step 1: checks the current password and emails a code to the new address.
 *
 * @throws AppError VALIDATION (`email`, `currentPassword`), RATE_LIMITED, UNAUTHENTICATED (session signed out after
 *   repeated wrong passwords).
 */
export async function requestEmailChange(actor: Actor, input: unknown, meta: RequestMeta): Promise<{ email: string; sentTo: string }> {
  const data = emailChangeRequestSchema.parse(input);
  const email = normalizeEmail(data.email);
  if (email === null) throw internal.validationError("email", AUTH_MESSAGES.invalidEmail);
  const user = await db.user.findUnique({
    where: { id: actor.userId },
    select: { id: true, status: true, passwordHash: true, emailNormalized: true, emailVerifiedAt: true },
  });
  if (!user || !internal.canSignIn(user.status)) throw AppError.unauthenticated();
  if (user.passwordHash === null) throw internal.validationError("currentPassword", NO_PASSWORD_MESSAGE);
  await internal.assertCurrentPassword(actor, user.passwordHash, data.currentPassword, meta, "currentPassword", "Your current password is incorrect.");
  if (email === user.emailNormalized && user.emailVerifiedAt !== null) {
    throw internal.validationError("email", "That is already the email address on your account.");
  }

  await assertOtpSendAllowed("EMAIL_VERIFY", email, meta.ip);
  const owner = await db.user.findUnique({ where: { emailNormalized: email }, select: { id: true } });
  if (owner === null || owner.id === user.id) {
    await issueOtp({ purpose: "EMAIL_VERIFY", target: email, userId: user.id, ip: meta.ip, context: CHANGE_CONTEXT, checkLimits: false, delivery: "background" });
  } else {
    await issueDecoyOtp({ purpose: "EMAIL_VERIFY", target: email, ip: meta.ip });
    logger.info("email change to an address of another account: nothing sent");
  }
  return { email, sentTo: maskIdentifier(email) };
}

/**
 * Step 2: the code emailed to the new address. Replaces and verifies the address, audits, and notifies the old one.
 *
 * @throws AppError VALIDATION (`code`: wrong / expired / not this user's change, one generic message), RATE_LIMITED.
 */
export async function confirmEmailChange(actor: Actor, input: unknown, meta: RequestMeta): Promise<{ email: string }> {
  const data = emailChangeConfirmSchema.parse(input);
  const email = normalizeEmail(data.email);
  if (email === null) return internal.failCode(meta);
  const result = await verifyOtp({ purpose: "EMAIL_VERIFY", target: email, code: data.code });
  if (!result.ok || result.userId !== actor.userId || !contextIsEmailChange(result.context)) return internal.failCode(meta);

  const user = await db.user.findUnique({
    where: { id: actor.userId },
    select: { id: true, status: true, roles: true, emailNormalized: true, emailVerifiedAt: true },
  });
  if (!user || !internal.canSignIn(user.status)) throw AppError.unauthenticated();
  const previous = verifiedEmailOf(user);
  try {
    await db.user.update({ where: { id: user.id }, data: { emailNormalized: email, emailVerifiedAt: new Date() }, select: { id: true } });
  } catch (error) {
    // Another account took the address after the code was sent.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return internal.failCode(meta);
    throw error;
  }
  await audit({
    actorUserId: user.id,
    actorRoles: user.roles,
    action: AUTH_AUDIT.EMAIL_CHANGE,
    entityType: "User",
    entityId: user.id,
    targetUserId: user.id,
    metadata: { hadEmail: user.emailNormalized !== null, previousVerified: previous !== null },
    request: internal.auditRequest(meta),
  });
  if (previous !== null && previous !== email) sendSecurityNotice({ kind: "email_changed", to: previous, newEmail: email });
  return { email };
}
