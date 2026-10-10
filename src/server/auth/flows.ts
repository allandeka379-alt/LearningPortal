import "server-only";
import { Prisma, type AuthMethod, type Role, type SessionKind, type UserStatus } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { db, type DbClient } from "@/server/db";
import { audit } from "@/server/lib/audit";
import { keepAliveAfterResponse } from "@/server/lib/background";
import { hmacSha256, randomToken, timingSafeEqualStr } from "@/server/lib/crypto";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, peekRateLimit, rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { sendMessage } from "@/server/messaging";
import { recordReferralSignup } from "@/server/referrals/service";
import { loadActor, type Actor } from "./actor";
import { AUTH_AUDIT } from "./audit-events";
import { countTrustedDeviceFailure, trustedDeviceFor } from "./device-trust";
import { normalizeEmail, parseLoginIdentifier, type LoginIdentifier } from "./identifiers";
import { clearPasswordFailures, countPasswordFailure, lockSubject, storedLockUntil, storeLock } from "./login-lock";
import { isLocked, lockRemainingSeconds, LOCKOUT_POLICY } from "./lockout";
import { sendSecurityNotice, verifiedEmailOf } from "./notices";
import { assertOtpSendAllowed, issueDecoyOtp, issueOtp, verifyOtp } from "./otp";
import { passwordPolicyErrors } from "./password-policy";
import { hashPassword, verifyDummyPassword, verifyPassword } from "./passwords";
import { postLoginPath, safeNextPath } from "./redirects";
import {
  changePasswordSchema,
  reauthenticateSchema,
  otpRequestSchema,
  passwordLoginSchema,
  registerSchema,
  resetPasswordSchema,
  SELF_SERVICE_ROLES,
  verifyCodeSchema,
  type AuthFlow,
  type AuthFlowPurpose,
  type SelfServiceRole,
} from "./schemas";
import { SESSION_USER_STATUSES } from "./session-policy";
import {
  createSession,
  markSessionReauthenticated,
  revokeAllSessions,
  revokeSession,
  type RequestMeta,
  type SessionInfo,
} from "./sessions";
import { generatePublicUsername } from "./usernames";

/**
 * Authentication flows (§33, §39; ARCHITECTURE §5.1): registration, email verification, password and one-time-code
 * login, password reset and change, logout. Channel-agnostic: Server Actions, `/api/v1/auth/*` and tests call these
 * with plain data and a {@link RequestMeta}; the caller stores the returned session token (cookie or API response)
 * and the pending {@link AuthFlow} (sealed cookie on the web).
 *
 * Privacy and anti-enumeration rules applied throughout:
 * - Responses never reveal whether an email / username has an account: unknown identifiers get the same
 *   outcome, the same rate limits, the same lock behaviour (./login-lock), the same database work and (for passwords)
 *   the same Argon2 work as real ones. Codes are delivered in the background, so provider latency or errors never
 *   show in a response.
 * - Every endpoint is rate limited per IP and per identifier; password login locks after 5 failures in 15 minutes
 *   (15-minute lock). Browsers that already signed in to the account (./device-trust) are not refused by the lock or
 *   the shared per-IP budget, so a lock cannot be used to keep the owner out.
 * - Every auth event is audited (`AuditLog`, IP hashed); logs never contain identifiers, codes or passwords.
 * - Pre-verification takeover is closed: a password set before ANY identifier was verified is kept only when the
 *   identifier is verified through the flow of the person who chose (or proved) that password (`AuthFlow.binding`);
 *   proving ownership any other way (one-time-code login, another registration's flow, Google) discards it. An
 *   unverified, never-used registration is replaced by a new registration of the same identifier only once it is
 *   abandoned (no live code, untouched for {@link ABANDONED_REGISTRATION_MS}).
 *
 * Email-based accounts (owner decision 2026-10-07): people register with an email address + password, prove the
 * address with a code sent BY EMAIL, sign in with email (or a school-issued username) + password or an emailed code,
 * and reset passwords with an emailed code. Every code and notice here is account email, sent whatever
 * `features.email` says. SMS plays no part: a phone number is never a sign-in identifier, never verified and never
 * sent anything (field error on `identifier`, which says nothing about any account). School-provisioned username
 * accounts reset through their school or staff (no address to send to). Google sign-in is unaffected.
 */

/** Terms of Use / Privacy Notice versions recorded at sign-up (the legal text is versioned in the repo). */
export const TERMS_VERSION = "2026-10";
export const PRIVACY_NOTICE_VERSION = "2026-10";

export const AUTH_MESSAGES = {
  invalidCredentials: "That email address, username or password is incorrect.",
  locked: "Too many unsuccessful sign-in attempts. Try again in 15 minutes, or reset your password.",
  tooManyAttempts: "Too many attempts. Please wait a few minutes and try again.",
  invalidCode: "That code is incorrect or has expired. Check it, or ask for a new code.",
  accountUnavailable: "This account can't be used right now. Please contact support.",
  invalidEmail: "Enter a valid email address, for example name@example.com.",
  emailNotPhone: "Enter your email address. We send codes by email, not by SMS.",
  phoneNotForSignIn: "Phone numbers can't be used to sign in. Use your email address, or the username your school gave you.",
  flowExpired: "Your code request has expired. Please start again.",
  signedOutAfterFailures: "For your security you have been signed out after several incorrect passwords. Please sign in again.",
} as const;

/** Looks like a phone number (digits and phone punctuation only). */
const PHONE_SHAPED = /^\+?[\d\s().-]+$/;

/**
 * Parses the email address that must receive a one-time code (registration, code sign-in, password reset). A phone
 * number or anything else gets a field error about the identifier's KIND only, so it reveals nothing about any account.
 *
 * @throws AppError VALIDATION (`identifier`)
 */
function parseEmailContact(raw: string): LoginIdentifier {
  const email = normalizeEmail(raw);
  if (email !== null) return { kind: "email", value: email };
  throw validationError("identifier", PHONE_SHAPED.test(raw.trim()) ? AUTH_MESSAGES.emailNotPhone : AUTH_MESSAGES.invalidEmail);
}

/**
 * IP-wide credential budget (`rateLimits.loginIp`), whichever identifier a request names, so rotating identifiers
 * cannot get around the per-(IP, identifier) limits (password spraying, code guessing across destinations). Checked
 * AFTER those, so a client hammering one identifier is stopped there without touching the shared IP budget.
 *
 * Only FAILURES count (wrong passwords, wrong codes), and a correct code is never refused by it, so a class signing in
 * together behind one school NAT does not use it up, and someone failing on purpose behind that NAT cannot block a
 * classmate's code sign-in or reset. Password sign-in is refused while the budget is used up (spraying needs it),
 * except from a browser that already signed in to the account (./device-trust). Code REQUESTS count every request, in
 * the same all-or-nothing reservation as the send limits. Messages are generic: they say nothing about any account.
 */
const credentialIpReservation = (meta: RequestMeta) => ({ input: rateLimits.loginIp(meta.ip), message: AUTH_MESSAGES.tooManyAttempts });

/** Refuses a password attempt when the IP's credential-failure budget is used up. Counts nothing. */
async function assertCredentialIpBudget(meta: RequestMeta): Promise<void> {
  const budget = await peekRateLimit(rateLimits.loginIp(meta.ip));
  if (!budget.allowed) throw AppError.rateLimited(budget.retryAfterSeconds, AUTH_MESSAGES.tooManyAttempts);
}

/** Counts a credential failure (wrong password, code or reset code) against the IP. True when over the budget. */
async function countCredentialIpFailure(meta: RequestMeta): Promise<{ overBudget: boolean; retryAfterSeconds: number }> {
  const result = await rateLimit(rateLimits.loginIp(meta.ip));
  return { overBudget: !result.allowed, retryAfterSeconds: result.retryAfterSeconds };
}

/** Wrong one-time code: counts the failure against the IP, then the generic error (or RATE_LIMITED once over budget). */
async function failCode(meta: RequestMeta): Promise<never> {
  const ip = await countCredentialIpFailure(meta);
  if (ip.overBudget) throw AppError.rateLimited(ip.retryAfterSeconds, AUTH_MESSAGES.tooManyAttempts);
  throw invalidCodeError();
}

/** A never-verified registration may be replaced by another registration only after this long untouched. */
export const ABANDONED_REGISTRATION_MS = 24 * 3600 * 1000;

/** Wrong current passwords (change password, step-up) per user in 15 minutes before the session is signed out. */
const CURRENT_PASSWORD_FAILURE_RULE = { limit: LOCKOUT_POLICY.maxFailures - 1, windowSeconds: LOCKOUT_POLICY.lockMs / 1000 };

/** Outcome of a step that signs the user in. `token` is the raw session token: set it as a cookie or return it once. */
export interface SessionOutcome {
  kind: "session";
  token: string;
  session: SessionInfo;
  userId: string;
  /** Post-login destination (validated `next`, onboarding or the user's home area). */
  redirectTo: string;
}

/** Outcome of a step that needs a one-time code next. */
export interface VerifyOutcome {
  kind: "verify";
  flow: AuthFlow;
}

export type AuthOutcome = SessionOutcome | VerifyOutcome;

export interface SessionOptions {
  /** WEB (cookie, default) or API (bearer token for `/api/v1`). */
  sessionKind?: Extract<SessionKind, "WEB" | "API">;
  /** Device / token label (API tokens). */
  label?: string | null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------

function contactWhere(contact: LoginIdentifier): Prisma.UserWhereUniqueInput {
  switch (contact.kind) {
    case "email":
      return { emailNormalized: contact.value };
    case "phone":
      return { phoneE164: contact.value };
    case "username":
      return { loginUsername: contact.value };
  }
}

/** The email address of a pending flow (flows only ever target email addresses; anything else is stale). */
function contactFromTarget(target: string): LoginIdentifier | null {
  const email = normalizeEmail(target);
  return email === null ? null : { kind: "email", value: email };
}

function canSignIn(status: UserStatus): boolean {
  return SESSION_USER_STATUSES.includes(status);
}

function makeFlow(purpose: AuthFlowPurpose, target: string, next: string | null | undefined): AuthFlow {
  return { purpose, channel: "EMAIL", target, next: safeNextPath(next), sentAt: Date.now() };
}

/**
 * `AuthFlow.binding` for whoever chose or entered the account's CURRENT password: a keyed hash of the user id and the
 * password hash (salted, so every password change gives a new value). Never readable by the client (the flow is
 * sealed) and useless without `SESSION_SECRET`.
 */
function passwordBinding(userId: string, passwordHash: string): string {
  return hmacSha256(`auth-flow-binding:${userId}:${passwordHash}`);
}

/** A binding that matches nothing, same shape as a real one (flows look alike whether or not an account exists). */
function unmatchedBinding(): string {
  return hmacSha256(`auth-flow-binding:none:${randomToken(32)}`);
}

/** True when `flow` was started by whoever chose or entered the account's current password. */
function flowHoldsPassword(flow: AuthFlow, user: { id: string; passwordHash: string | null }): boolean {
  if (flow.binding === undefined || user.passwordHash === null) return false;
  return timingSafeEqualStr(flow.binding, passwordBinding(user.id, user.passwordHash));
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function auditRequest(meta: RequestMeta) {
  return { requestId: meta.requestId ?? null, ip: meta.ip, userAgent: meta.userAgent };
}

function validationError(field: string, messages: string | string[]): AppError {
  return AppError.validation({ [field]: Array.isArray(messages) ? messages : [messages] });
}

function invalidCodeError(): AppError {
  return AppError.validation({ code: [AUTH_MESSAGES.invalidCode] }, AUTH_MESSAGES.invalidCode);
}

/** True when the student is (or may be) under 18 given an optional birth year. Unknown → minor (safe default). */
export function isMinorFromBirthYear(birthYear: number | null | undefined, now: Date = new Date()): boolean {
  if (birthYear === null || birthYear === undefined) return true;
  // Someone turning 18 this year may still be 17: only a 19th birthday this year proves adulthood.
  return now.getUTCFullYear() - birthYear <= 18;
}

/** Picks an unused public handle (Profile.username). */
async function pickPublicUsername(client: DbClient): Promise<string> {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const candidate = generatePublicUsername(undefined, attempt);
    const taken = await client.profile.findUnique({ where: { username: candidate }, select: { userId: true } });
    if (!taken) return candidate;
  }
  throw new Error("could not allocate a public username");
}

/** Creates the Student / Parent / Teacher extension row for `role` (role extension rows exist iff the role is held). */
async function createRoleExtension(
  client: DbClient,
  userId: string,
  role: SelfServiceRole,
  student: { isMinor: boolean },
): Promise<void> {
  if (role === "STUDENT") {
    await client.student.create({
      data: {
        userId,
        isMinor: student.isMinor,
        guardianConsentStatus: student.isMinor ? "PENDING" : "NOT_REQUIRED",
      },
    });
  } else if (role === "PARENT") {
    await client.parent.create({ data: { userId } });
  } else {
    await client.teacher.create({ data: { userId } });
  }
}

/**
 * Starts a session for a verified sign-in: resets the lockout counter, records `lastLoginAt`, audits, and resolves
 * the post-login destination.
 */
async function startSession(
  user: { id: string; roles: Role[] },
  meta: RequestMeta,
  options: SessionOptions & { authMethod: AuthMethod; next?: string | null },
): Promise<SessionOutcome> {
  const kind = options.sessionKind ?? "WEB";
  const { token, session } = await createSession(user.id, kind, meta, {
    authMethod: options.authMethod,
    roles: user.roles,
    label: options.label ?? null,
  });
  const now = session.createdAt;
  await db.user.update({
    where: { id: user.id },
    data: { lastLoginAt: now, lastActiveAt: now, failedLoginCount: 0, lockedUntil: null },
    select: { id: true },
  });
  await clearPasswordFailures(user.id);
  await audit({
    actorUserId: user.id,
    actorRoles: user.roles,
    action: AUTH_AUDIT.LOGIN_SUCCESS,
    entityType: "Session",
    entityId: session.id,
    targetUserId: user.id,
    metadata: { method: options.authMethod, kind },
    request: auditRequest(meta),
  });
  const actor = await loadActor(user.id, { sessionId: session.id });
  return {
    kind: "session",
    token,
    session,
    userId: user.id,
    redirectTo: actor ? postLoginPath(actor, options.next) : "/",
  };
}

const ACCOUNT_LOOKUP_SELECT = {
  id: true,
  status: true,
  roles: true,
  passwordHash: true,
  emailNormalized: true,
  phoneE164: true,
  loginUsername: true,
  emailVerifiedAt: true,
  phoneVerifiedAt: true,
  lastLoginAt: true,
  provisionedBySchoolId: true,
  failedLoginCount: true,
  lockedUntil: true,
  createdAt: true,
  passwordUpdatedAt: true,
  _count: { select: { oauthAccounts: true } },
} as const;

type AccountLookup = Prisma.UserGetPayload<{ select: typeof ACCOUNT_LOOKUP_SELECT }>;

async function findAccount(contact: LoginIdentifier): Promise<AccountLookup | null> {
  return db.user.findUnique({ where: contactWhere(contact), select: ACCOUNT_LOOKUP_SELECT });
}

/** True when no identifier of the account has ever been verified. */
function hasNoVerifiedIdentifier(user: Pick<AccountLookup, "emailVerifiedAt" | "phoneVerifiedAt">): boolean {
  return user.emailVerifiedAt === null && user.phoneVerifiedAt === null;
}

/**
 * An account created by self-registration that was never verified nor used: a new registration of the same
 * identifier may replace it (otherwise whoever typed someone else's address first would block them forever).
 */
function isReclaimableRegistration(user: AccountLookup): boolean {
  return (
    user.status === "ACTIVE" &&
    hasNoVerifiedIdentifier(user) &&
    user.lastLoginAt === null &&
    user.loginUsername === null &&
    user.provisionedBySchoolId === null &&
    user._count.oauthAccounts === 0 &&
    (user.emailNormalized === null || user.phoneE164 === null) &&
    user.roles.every((role) => (SELF_SERVICE_ROLES as readonly Role[]).includes(role))
  );
}

/**
 * A reclaimable registration that is also ABANDONED: untouched for {@link ABANDONED_REGISTRATION_MS} and with no live
 * code. Only these may be replaced by a new self-registration, so a registration that is still waiting for its code
 * (someone else typed the same address minutes later) keeps its password, and its owner's code keeps working.
 */
async function isAbandonedRegistration(user: AccountLookup, now: Date): Promise<boolean> {
  if (!isReclaimableRegistration(user)) return false;
  const lastTouched = Math.max(user.createdAt.getTime(), user.passwordUpdatedAt?.getTime() ?? 0);
  if (now.getTime() - lastTouched < ABANDONED_REGISTRATION_MS) return false;
  const liveCode = await db.verificationCode.findFirst({
    where: { userId: user.id, consumedAt: null, expiresAt: { gt: now } },
    select: { id: true },
  });
  return liveCode === null;
}

/** Field update that marks `contact` verified: email addresses only (phone numbers are never verified). */
function verifiedFieldFor(contact: LoginIdentifier, now: Date): Prisma.UserUpdateInput {
  return contact.kind === "email" ? { emailVerifiedAt: now } : {};
}

/**
 * Background delivery like the verification code it replaces (the response must not show which one was sent). Account
 * email: sent whatever `features.email` says, with no flag read (the code path does none either).
 */
function sendAccountExistsNotice(contact: LoginIdentifier): void {
  keepAliveAfterResponse(sendMessage({
    channel: "email",
    to: contact.value,
    subject: `Your ${APP_NAME} account`,
    text:
      `Someone tried to create a new ${APP_NAME} account with this email address, but it already has an account. ` +
      "Sign in instead, or reset your password if you have forgotten it. If this wasn't you, you can ignore this message.",
    tag: "auth.account_exists",
    transactional: true,
  }).catch((error: unknown) => logger.error("account-exists notice delivery failed", { err: error })));
}

// ---------------------------------------------------------------------------------------------------------------------
// Registration and verification
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Self-registration (email + password; Student, Parent or Teacher; terms accepted). The code goes by email. Always
 * answers with "enter the code we sent", whether or not the address already has an account:
 *
 * - new identifier → account created (unverified), verification code sent;
 * - abandoned registration (unverified, never used, no live code, untouched for a day) → replaced with this one, new
 *   code sent;
 * - existing account (including a registration still in progress) → no account change; the owner gets an "you
 *   already have an account" notice.
 *
 * The returned flow carries the binding of the password chosen here (`AuthFlow.binding`), so only this flow can verify
 * the identifier while keeping that password.
 *
 * Minors: only an optional birth year is collected; without it the student is treated as a minor (guardian consent
 * PENDING, handled in onboarding).
 *
 * @throws AppError VALIDATION (field errors), RATE_LIMITED.
 */
export async function register(input: unknown, meta: RequestMeta): Promise<VerifyOutcome> {
  const data = registerSchema.parse(input);
  await assertRateLimit(rateLimits.register(meta.ip), "Too many sign-ups from this network. Please try again later.");

  const contact = parseEmailContact(data.identifier);
  const policy = passwordPolicyErrors(data.password, { email: contact.value });
  if (policy.length > 0) throw validationError("password", policy);

  const role = data.role;
  const flow = makeFlow("EMAIL_VERIFY", contact.value, data.next);
  // Send limits first (identical for new, reclaimed and existing identifiers), before any expensive work.
  await assertOtpSendAllowed(flow.purpose, contact.value, meta.ip);
  const passwordHash = await hashPassword(data.password);
  const now = new Date();
  const isMinor = role === "STUDENT" ? isMinorFromBirthYear(data.birthYear, now) : false;
  const profileData = {
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: data.firstName,
    birthYear: role === "STUDENT" ? (data.birthYear ?? null) : null,
    termsAcceptedAt: now,
    termsVersion: TERMS_VERSION,
    privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
  };


  let existing = await findAccount(contact);
  let userId: string | null = null;
  let reclaimed = false;

  if (existing === null) {
    try {
      userId = await db.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            emailNormalized: contact.value,
            passwordHash,
            passwordUpdatedAt: now,
            roles: [role],
            signupChannel: "WEB",
          },
          select: { id: true },
        });
        await tx.profile.create({ data: { userId: user.id, username: await pickPublicUsername(tx), ...profileData } });
        await createRoleExtension(tx, user.id, role, { isMinor });
        return user.id;
      });
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      existing = await findAccount(contact); // lost a race with a parallel registration of the same identifier
    }
  } else if (await isAbandonedRegistration(existing, now)) {
    const shell = existing;
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: shell.id },
        data: { passwordHash, passwordUpdatedAt: now, roles: [role], failedLoginCount: 0, lockedUntil: null },
        select: { id: true },
      });
      await tx.profile.upsert({
        where: { userId: shell.id },
        create: { userId: shell.id, username: await pickPublicUsername(tx), ...profileData },
        update: profileData,
      });
      if (role !== "STUDENT") await tx.student.deleteMany({ where: { userId: shell.id } });
      if (role !== "PARENT") await tx.parent.deleteMany({ where: { userId: shell.id } });
      if (role !== "TEACHER") await tx.teacher.deleteMany({ where: { userId: shell.id } });
      const hasExtension =
        role === "STUDENT"
          ? await tx.student.findUnique({ where: { userId: shell.id }, select: { userId: true } })
          : role === "PARENT"
            ? await tx.parent.findUnique({ where: { userId: shell.id }, select: { userId: true } })
            : await tx.teacher.findUnique({ where: { userId: shell.id }, select: { userId: true } });
      if (role === "STUDENT" && hasExtension) {
        await tx.student.update({
          where: { userId: shell.id },
          data: { isMinor, guardianConsentStatus: isMinor ? "PENDING" : "NOT_REQUIRED" },
        });
      } else if (!hasExtension) {
        await createRoleExtension(tx, shell.id, role, { isMinor });
      }
    });
    userId = shell.id;
    reclaimed = true;
  }

  if (userId !== null) {
    await audit({
      actorUserId: userId,
      actorRoles: [role],
      action: AUTH_AUDIT.REGISTER,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      metadata: { role, channel: flow.channel, reclaimed },
      request: auditRequest(meta),
    });
    await issueOtp({ purpose: flow.purpose, target: contact.value, userId, ip: meta.ip, checkLimits: false, delivery: "background" });
    // Referral attribution (§46): ignores self-referrals and old accounts, and never throws.
    if (data.referralCode) await recordReferralSignup({ referredUserId: userId, code: data.referralCode, ip: meta.ip });
    return { kind: "verify", flow: { ...flow, binding: passwordBinding(userId, passwordHash) } };
  }
  sendAccountExistsNotice(contact);
  logger.info("registration for an existing identifier: owner notified", { channel: flow.channel });
  return { kind: "verify", flow: { ...flow, binding: unmatchedBinding() } };
}

/**
 * Re-sends the code of a pending flow (60-second cooldown, rate limited). Sends nothing when there is nothing to send
 * (unknown account, already verified identifier), with the same outcome. Returns the refreshed flow.
 */
export async function resendCode(flow: AuthFlow, meta: RequestMeta): Promise<VerifyOutcome> {
  const contact = contactFromTarget(flow.target);
  // A flow for anything but an email address (e.g. an SMS flow from before accounts became email-based) is stale.
  if (contact === null || flow.purpose === "PHONE_VERIFY") throw new AppError("BAD_REQUEST", AUTH_MESSAGES.flowExpired);
  await assertOtpSendAllowed(flow.purpose, contact.value, meta.ip);
  const user = await findAccount(contact);
  const refreshed: AuthFlow = { ...flow, sentAt: Date.now() };

  let eligible = user !== null && canSignIn(user.status);
  if (user && flow.purpose === "EMAIL_VERIFY") eligible = eligible && user.emailVerifiedAt === null;
  if (user && eligible) {
    await issueOtp({ purpose: flow.purpose, target: contact.value, userId: user.id, ip: meta.ip, checkLimits: false, delivery: "background" });
  } else {
    await issueDecoyOtp({ purpose: flow.purpose, target: contact.value, ip: meta.ip });
  }
  return { kind: "verify", flow: refreshed };
}

/**
 * Completes a code flow: email verification after registration, or one-time-code login. Marks the email address
 * verified and signs the user in. (Password reset uses {@link resetPassword}.)
 *
 * @throws AppError VALIDATION (`code` field) for any wrong / expired / unknown code; FORBIDDEN for suspended accounts.
 */
export async function verifyCode(
  flow: AuthFlow,
  input: unknown,
  meta: RequestMeta,
  options: SessionOptions = {},
): Promise<SessionOutcome> {
  if (flow.purpose === "PASSWORD_RESET") throw new AppError("BAD_REQUEST", "Use the password reset form for this code.");
  const { code } = verifyCodeSchema.parse(input);
  const contact = contactFromTarget(flow.target);
  if (contact === null || flow.purpose === "PHONE_VERIFY") return failCode(meta);

  const result = await verifyOtp({ purpose: flow.purpose, target: contact.value, code });
  if (!result.ok) return failCode(meta);
  const user = await findAccount(contact);
  if (user === null || (result.userId !== null && result.userId !== user.id)) return failCode(meta);
  if (!canSignIn(user.status)) throw new AppError("FORBIDDEN", AUTH_MESSAGES.accountUnavailable);

  const now = new Date();
  const neverVerified = hasNoVerifiedIdentifier(user);
  const update: Prisma.UserUpdateInput = { ...verifiedFieldFor(contact, now) };
  // Ownership was just proven without the password. A password chosen before ANY identifier was verified may have
  // been set by someone else (pre-registration takeover, or a second registration of the same address while the
  // owner's was pending), so it is kept only when THIS flow belongs to whoever chose or entered it (registration or
  // password sign-in binding); a code login, or a verification through anybody else's flow, discards it.
  const keepsPassword = flow.purpose !== "LOGIN_OTP" && flowHoldsPassword(flow, user);
  if (neverVerified && user.passwordHash !== null && !keepsPassword) {
    update.passwordHash = null;
    update.passwordUpdatedAt = now;
  }
  const alreadyVerified = user.emailVerifiedAt !== null;
  if (!alreadyVerified || update.passwordHash === null) {
    await db.user.update({ where: { id: user.id }, data: update, select: { id: true } });
  }
  if (!alreadyVerified) {
    await audit({
      actorUserId: user.id,
      actorRoles: user.roles,
      action: AUTH_AUDIT.CONTACT_VERIFIED,
      entityType: "User",
      entityId: user.id,
      targetUserId: user.id,
      metadata: { channel: flow.channel, purpose: flow.purpose },
      request: auditRequest(meta),
    });
  }
  return startSession(user, meta, { ...options, authMethod: "OTP", next: flow.next });
}

// ---------------------------------------------------------------------------------------------------------------------
// Password login and lockout
// ---------------------------------------------------------------------------------------------------------------------

function lockedError(retryAfterSeconds: number): AppError {
  return AppError.rateLimited(retryAfterSeconds, AUTH_MESSAGES.locked);
}

/**
 * Records a wrong password, the same way for a real account (`user`) and for an identifier without one (./login-lock),
 * and locks at the threshold (audited once for a real account). Always throws.
 */
async function failPassword(
  user: AccountLookup | null,
  subject: string,
  trustedDevice: string | null,
  meta: RequestMeta,
  now: Date,
): Promise<never> {
  await countCredentialIpFailure(meta);
  if (user !== null && trustedDevice !== null) await countTrustedDeviceFailure(trustedDevice, user.id);
  const until = await countPasswordFailure(subject, now);
  if (user !== null) {
    await audit({
      actorUserId: null,
      action: AUTH_AUDIT.LOGIN_FAILURE,
      entityType: "User",
      entityId: user.id,
      targetUserId: user.id,
      metadata: { method: "PASSWORD", locked: until !== null },
      request: auditRequest(meta),
    });
  }
  if (until === null) throw AppError.unauthenticated(AUTH_MESSAGES.invalidCredentials);

  if (user === null) {
    await storeLock(subject, until, now);
  } else {
    // Conditional, so parallel 5th failures audit the lock once.
    const locked = await db.user.updateMany({
      where: { id: user.id, OR: [{ lockedUntil: null }, { lockedUntil: { lte: now } }] },
      data: { lockedUntil: until },
    });
    if (locked.count > 0) {
      await audit({
        actorUserId: null,
        action: AUTH_AUDIT.ACCOUNT_LOCKED,
        entityType: "User",
        entityId: user.id,
        targetUserId: user.id,
        metadata: { lockMinutes: LOCKOUT_POLICY.lockMs / 60_000 },
        request: auditRequest(meta),
      });
    }
  }
  throw lockedError(lockRemainingSeconds(until, now));
}

/** The later of two optional lock ends. */
function laterLock(a: Date | null, b: Date | null): Date | null {
  if (a === null) return b;
  if (b === null) return a;
  return a.getTime() >= b.getTime() ? a : b;
}

/**
 * Password sign-in with an email address or a school username. Returns a session, or — when the password is right
 * but the email address has not been verified yet — a verification flow (the code is emailed to it). A phone number
 * is not a sign-in identifier: it gets a field error about its kind only (before any account lookup).
 *
 * A browser that already signed in to the account (`meta.deviceToken`, ./device-trust) skips the per-IP limits and
 * the account lock, so failures provoked by somebody else never keep the owner out on their own devices.
 *
 * @throws AppError UNAUTHENTICATED (wrong identifier or password, one generic message), RATE_LIMITED (rate limit or
 *   account lock, generic message), FORBIDDEN (suspended account, only after a correct password), VALIDATION (a phone
 *   number as the identifier).
 */
export async function loginWithPassword(input: unknown, meta: RequestMeta, options: SessionOptions = {}): Promise<AuthOutcome> {
  const data = passwordLoginSchema.parse(input);
  const identifier = parseLoginIdentifier(data.identifier);
  if (identifier?.kind === "phone") throw validationError("identifier", AUTH_MESSAGES.phoneNotForSignIn);
  const identifierKey = identifier?.value ?? data.identifier.trim().toLowerCase();
  const user = identifier === null ? null : await findAccount(identifier);
  const trustedDevice = user === null ? null : await trustedDeviceFor(meta.deviceToken, user.id);
  if (trustedDevice === null) {
    await assertRateLimit(rateLimits.login(meta.ip, identifierKey), AUTH_MESSAGES.tooManyAttempts);
    await assertCredentialIpBudget(meta);
  }

  const now = new Date();
  const subject = lockSubject(user?.id ?? null, identifierKey);
  // Read for every identifier (accounts keep their lock on the row, unknown identifiers in the lock store).
  const lockedUntil = laterLock(user?.lockedUntil ?? null, await storedLockUntil(subject));
  if (trustedDevice === null && isLocked(lockedUntil, now)) {
    await verifyDummyPassword(data.password);
    throw lockedError(lockRemainingSeconds(lockedUntil, now));
  }
  let passwordHash = user?.passwordHash ?? null;
  const verification = passwordHash !== null ? await verifyPassword(passwordHash, data.password) : null;
  if (passwordHash === null) await verifyDummyPassword(data.password);
  if (user === null || passwordHash === null || !verification?.valid) return failPassword(user, subject, trustedDevice, meta, now);

  if (!canSignIn(user.status)) throw new AppError("FORBIDDEN", AUTH_MESSAGES.accountUnavailable);
  if (verification.needsRehash) {
    try {
      const rehashed = await hashPassword(data.password);
      await db.user.update({ where: { id: user.id }, data: { passwordHash: rehashed }, select: { id: true } });
      passwordHash = rehashed;
    } catch (error) {
      logger.warn("password rehash failed", { userId: user.id, err: error });
    }
  }

  // Email accounts must have proven their address (or another identifier, e.g. through Google); school-provisioned
  // username accounts are vouched for by the school.
  if (identifier !== null && identifier.kind === "email" && hasNoVerifiedIdentifier(user) && user.loginUsername === null) {
    await db.user.update({ where: { id: user.id }, data: { failedLoginCount: 0, lockedUntil: null }, select: { id: true } });
    await clearPasswordFailures(user.id);
    // This client just proved the password: its verification flow keeps it.
    const flow = { ...makeFlow("EMAIL_VERIFY", identifier.value, data.next), binding: passwordBinding(user.id, passwordHash) };
    await issueOtp({ purpose: flow.purpose, target: identifier.value, userId: user.id, ip: meta.ip, delivery: "background" });
    return { kind: "verify", flow };
  }
  return startSession(user, meta, { ...options, authMethod: "PASSWORD", next: data.next });
}

// ---------------------------------------------------------------------------------------------------------------------
// One-time-code login and password reset
// ---------------------------------------------------------------------------------------------------------------------

async function startCodeFlow(
  purpose: "LOGIN_OTP" | "PASSWORD_RESET",
  rawIdentifier: string,
  next: string | null | undefined,
  meta: RequestMeta,
): Promise<VerifyOutcome> {
  const contact = parseEmailContact(rawIdentifier);
  await assertOtpSendAllowed(purpose, contact.value, meta.ip, [credentialIpReservation(meta)]);
  const flow = makeFlow(purpose, contact.value, purpose === "LOGIN_OTP" ? next : null);
  const user = await findAccount(contact);
  if (user !== null && canSignIn(user.status)) {
    await issueOtp({ purpose, target: contact.value, userId: user.id, ip: meta.ip, checkLimits: false, delivery: "background" });
  } else {
    await issueDecoyOtp({ purpose, target: contact.value, ip: meta.ip });
  }
  return { kind: "verify", flow };
}

/** Passwordless sign-in, step 1: emails a code when the address has an account (same outcome either way). */
export async function requestLoginCode(input: unknown, meta: RequestMeta): Promise<VerifyOutcome> {
  const data = otpRequestSchema.parse(input);
  return startCodeFlow("LOGIN_OTP", data.identifier, data.next, meta);
}

/**
 * Forgot password, step 1: emails a reset code when the address has an account (same outcome either way). School
 * username accounts have no address: their school admin, a teacher or staff (one-time password) resets them.
 */
export async function requestPasswordReset(input: unknown, meta: RequestMeta): Promise<VerifyOutcome> {
  const data = otpRequestSchema.parse(input);
  return startCodeFlow("PASSWORD_RESET", data.identifier, null, meta);
}

/**
 * Forgot password, step 2: code + new password. Sets the password, marks the email address verified, clears the lock,
 * revokes every existing session, signs the user in on a fresh one and emails a security notice.
 *
 * @throws AppError VALIDATION (`code`, `password`, `confirmPassword`), FORBIDDEN (suspended).
 */
export async function resetPassword(
  flow: AuthFlow,
  input: unknown,
  meta: RequestMeta,
  options: SessionOptions = {},
): Promise<SessionOutcome> {
  if (flow.purpose !== "PASSWORD_RESET") throw new AppError("BAD_REQUEST", AUTH_MESSAGES.flowExpired);
  const data = resetPasswordSchema.parse(input);
  const contact = contactFromTarget(flow.target);
  if (contact === null) throw invalidCodeError();
  const policy = passwordPolicyErrors(data.password, { email: contact.value });
  if (policy.length > 0) throw validationError("password", policy);

  const result = await verifyOtp({ purpose: "PASSWORD_RESET", target: contact.value, code: data.code });
  if (!result.ok) return failCode(meta);
  const user = await findAccount(contact);
  if (user === null || result.userId !== user.id) return failCode(meta);
  if (!canSignIn(user.status)) throw new AppError("FORBIDDEN", AUTH_MESSAGES.accountUnavailable);

  const passwordHash = await hashPassword(data.password);
  const now = new Date();
  const revoked = await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordUpdatedAt: now,
        passwordMustChange: false,
        failedLoginCount: 0,
        lockedUntil: null,
        ...(user.emailVerifiedAt === null ? { emailVerifiedAt: now } : {}),
      },
      select: { id: true },
    });
    return revokeAllSessions(user.id, { reason: "password_reset", client: tx });
  });
  await clearPasswordFailures(user.id);
  await audit({
    actorUserId: user.id,
    actorRoles: user.roles,
    action: AUTH_AUDIT.PASSWORD_RESET,
    entityType: "User",
    entityId: user.id,
    targetUserId: user.id,
    metadata: { channel: flow.channel, sessionsRevoked: revoked },
    request: auditRequest(meta),
  });
  sendSecurityNotice({ kind: "password_reset", to: contact.value });
  return startSession(user, meta, { ...options, authMethod: "OTP", next: null });
}

// ---------------------------------------------------------------------------------------------------------------------
// Signed-in account actions
// ---------------------------------------------------------------------------------------------------------------------

function currentPasswordFailures(userId: string) {
  return { key: `currentPasswordFail:${userId}`, ...CURRENT_PASSWORD_FAILURE_RULE };
}

/**
 * Checks the signed-in user's current password (change password, step-up). Limited per USER, never per IP, so a
 * hijacked session cannot multiply its guesses by rotating addresses; after 5 wrong passwords in 15 minutes the
 * session making the attempt is signed out (audited) and must sign in again. A correct password clears the count.
 *
 * @throws AppError RATE_LIMITED, VALIDATION (`field`) when wrong, UNAUTHENTICATED when the session was signed out.
 */
async function assertCurrentPassword(
  actor: Actor,
  passwordHash: string | null,
  password: string,
  meta: RequestMeta,
  field: string,
  wrongMessage: string,
): Promise<void> {
  await assertRateLimit(rateLimits.currentPassword(actor.userId), AUTH_MESSAGES.tooManyAttempts);
  const verification = passwordHash ? await verifyPassword(passwordHash, password) : null;
  if (!passwordHash) await verifyDummyPassword(password);
  if (verification?.valid) {
    await db.rateLimitBucket.deleteMany({ where: { key: currentPasswordFailures(actor.userId).key } });
    return;
  }
  const failures = await rateLimit(currentPasswordFailures(actor.userId));
  if (failures.allowed) throw validationError(field, wrongMessage);
  if (actor.sessionId !== null && (await revokeSession(actor.sessionId, "current_password_failures"))) {
    await audit({
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUTH_AUDIT.SESSIONS_REVOKE,
      entityType: "Session",
      entityId: actor.sessionId,
      targetUserId: actor.userId,
      metadata: { reason: "current_password_failures", count: 1 },
      request: auditRequest(meta),
    });
  }
  throw AppError.unauthenticated(AUTH_MESSAGES.signedOutAfterFailures);
}

/**
 * Changes the signed-in user's password (current password required). Every session is revoked (the password change
 * invalidates them) and a fresh one is returned for the current device: set it as the new cookie. Also the forced
 * change after a school-set password (`User.passwordMustChange`, /change-password): the flag is cleared, the new
 * password must differ from the school's, and `next` (validated) is where the user continues. School-provisioned
 * accounts never saw the Terms of Use at sign-up: when the profile has no acceptance yet, the forced change records it
 * (`options.acceptTerms` must be true).
 *
 * @throws AppError VALIDATION (`currentPassword`, `password`, `confirmPassword`, `acceptTerms`), RATE_LIMITED.
 */
export async function changePassword(
  actor: Actor,
  input: unknown,
  meta: RequestMeta,
  options: { next?: string | null; acceptTerms?: boolean } = {},
): Promise<SessionOutcome> {
  const data = changePasswordSchema.parse(input);
  const user = await db.user.findUnique({
    where: { id: actor.userId },
    select: {
      id: true,
      roles: true,
      status: true,
      passwordHash: true,
      passwordMustChange: true,
      emailNormalized: true,
      emailVerifiedAt: true,
      phoneE164: true,
      loginUsername: true,
      profile: { select: { termsAcceptedAt: true } },
    },
  });
  if (!user || !canSignIn(user.status)) throw AppError.unauthenticated();
  await assertCurrentPassword(actor, user.passwordHash, data.currentPassword, meta, "currentPassword", "Your current password is incorrect.");
  const policy = passwordPolicyErrors(data.password, {
    email: user.emailNormalized,
    phone: user.phoneE164,
    username: user.loginUsername,
  });
  if (policy.length > 0) throw validationError("password", policy);
  if (data.password === data.currentPassword) {
    throw validationError("password", user.passwordMustChange ? "Choose a password that is different from the one your school gave you." : "Choose a password you haven't used here before.");
  }
  const recordTerms = user.passwordMustChange && user.profile !== null && user.profile.termsAcceptedAt === null;
  if (recordTerms && options.acceptTerms !== true) {
    throw validationError("acceptTerms", "Please accept the Terms of Use and Privacy Notice to continue.");
  }

  const passwordHash = await hashPassword(data.password);
  const revoked = await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: user.id },
      data: { passwordHash, passwordUpdatedAt: new Date(), passwordMustChange: false },
      select: { id: true },
    });
    if (recordTerms) {
      await tx.profile.update({
        where: { userId: user.id },
        data: { termsAcceptedAt: new Date(), termsVersion: TERMS_VERSION, privacyNoticeVersion: PRIVACY_NOTICE_VERSION },
        select: { userId: true },
      });
    }
    return revokeAllSessions(user.id, { reason: "password_changed", client: tx });
  });
  await audit({
    actorUserId: user.id,
    actorRoles: actor.roles,
    action: AUTH_AUDIT.PASSWORD_CHANGE,
    entityType: "User",
    entityId: user.id,
    targetUserId: user.id,
    metadata: { forced: user.passwordMustChange, sessionsRevoked: revoked, ...(recordTerms ? { termsVersion: TERMS_VERSION } : {}) },
    request: auditRequest(meta),
  });
  sendSecurityNotice({ kind: "password_changed", to: verifiedEmailOf(user) });
  const kind = actor.channel === "api" ? "API" : "WEB";
  const { token, session } = await createSession(user.id, kind, meta, { authMethod: "PASSWORD", roles: user.roles });
  return { kind: "session", token, session, userId: user.id, redirectTo: postLoginPath({ ...actor, passwordMustChange: false }, options.next ?? null) };
}

/**
 * Step-up: confirms the signed-in user's password and marks the current session as freshly authenticated, which
 * sensitive actions (role grants, refunds, settings, break-glass) require within 15 minutes
 * (`requireRecentAuthForAction` in ./guards).
 *
 * @throws AppError VALIDATION (`password`) when wrong; UNAUTHENTICATED without a session.
 */
export async function reauthenticateWithPassword(actor: Actor, input: unknown, meta: RequestMeta): Promise<void> {
  const data = reauthenticateSchema.parse(input);
  if (actor.sessionId === null) throw AppError.unauthenticated();
  const user = await db.user.findUnique({ where: { id: actor.userId }, select: { passwordHash: true, status: true } });
  if (!user || !canSignIn(user.status)) throw AppError.unauthenticated();
  await assertCurrentPassword(actor, user.passwordHash, data.password, meta, "password", "That password is incorrect.");
  await markSessionReauthenticated(actor.sessionId);
  await audit({
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUTH_AUDIT.STEP_UP,
    entityType: "Session",
    entityId: actor.sessionId,
    targetUserId: actor.userId,
    metadata: { method: "PASSWORD" },
    request: auditRequest(meta),
  });
}

/** Signs out one session (logout). Idempotent. */
export async function logout(session: { id: string; userId: string }, meta: RequestMeta, roles: readonly Role[] = []): Promise<void> {
  const revoked = await revokeSession(session.id, "logout");
  if (!revoked) return;
  await audit({
    actorUserId: session.userId,
    actorRoles: roles,
    action: AUTH_AUDIT.LOGOUT,
    entityType: "Session",
    entityId: session.id,
    targetUserId: session.userId,
    request: auditRequest(meta),
  });
}

/** "Log out everywhere": revokes all of the actor's sessions, optionally keeping the current one. */
export async function logoutEverywhere(actor: Actor, meta: RequestMeta, options: { keepCurrent?: boolean } = {}): Promise<number> {
  const count = await revokeAllSessions(actor.userId, {
    exceptSessionId: options.keepCurrent ? actor.sessionId : null,
    reason: "logout_all",
  });
  await audit({
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUTH_AUDIT.SESSIONS_REVOKE,
    entityType: "User",
    entityId: actor.userId,
    targetUserId: actor.userId,
    metadata: { count, keptCurrent: options.keepCurrent ?? false },
    request: auditRequest(meta),
  });
  return count;
}

/** Internal pieces shared with the Google flow (./google). Not for routes. */
export const internal = {
  startSession,
  pickPublicUsername,
  createRoleExtension,
  hasNoVerifiedIdentifier,
  isReclaimableRegistration,
  auditRequest,
  findAccount,
  canSignIn,
  assertCurrentPassword,
  failCode,
  validationError,
};
