import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { db } from "@/server/db";
import { AppError, fromZodError, isAppError, type ErrorCode } from "@/server/lib/errors";
import { RATE_LIMIT_PRESETS, rateLimitSubject } from "@/server/lib/rate-limit";
import { getDevOutbox, latestDevMessage, setMessagingChannel, type MessagingChannel } from "@/server/messaging";
import { UnconfiguredProvider } from "@/server/messaging/providers";
import { createStudent, createUser, uniqueEmail, uniquePhone, uniqueSuffix } from "../../../tests/factories/index";
import { actorFromSession } from "./actor";
import { rememberDevice } from "./device-trust";
import { sealAuthFlow } from "./flow-cookie";
import { LOCKOUT_POLICY } from "./lockout";
import {
  AUTH_MESSAGES,
  changePassword,
  isMinorFromBirthYear,
  loginWithPassword,
  logout,
  logoutEverywhere,
  reauthenticateWithPassword,
  register,
  requestLoginCode,
  requestPasswordReset,
  resendCode,
  resetPassword,
  TERMS_VERSION,
  verifyCode,
  type AuthOutcome,
  type SessionOutcome,
  type VerifyOutcome,
} from "./flows";
import { verifyPassword } from "./passwords";
import { validateSessionToken } from "./sessions";
import { clearOtpCooldown, latestCodeFor, randomIp, TEST_PASSWORD, testMeta, testPasswordHash } from "./testing";

// Every optional channel is switched OFF (the defaults): accounts are email-based and codes are account email, sent
// whatever `features.email` says (owner decision 2026-10-07; see also ./email-auth.integration.test.ts).
const flags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

async function expectAppError(promise: Promise<unknown>, code: ErrorCode): Promise<AppError> {
  try {
    await promise;
  } catch (error) {
    if (!isAppError(error)) throw error;
    expect(error.code).toBe(code);
    return error;
  }
  throw new Error(`expected AppError ${code}`);
}

function asSession(outcome: AuthOutcome): SessionOutcome {
  if (outcome.kind !== "session") throw new Error(`expected a session, got ${outcome.kind}`);
  return outcome;
}

function asVerify(outcome: AuthOutcome): VerifyOutcome {
  if (outcome.kind !== "verify") throw new Error(`expected a verification step, got ${outcome.kind}`);
  return outcome;
}

async function auditActions(userId: string): Promise<string[]> {
  const rows = await db.auditLog.findMany({ where: { targetUserId: userId }, orderBy: { createdAt: "asc" }, select: { action: true } });
  return rows.map((row) => row.action);
}

/** A verified email account with the test password. */
async function verifiedAccount(roles: ("STUDENT" | "PARENT" | "TEACHER" | "ADMIN")[] = ["STUDENT"]) {
  return createUser({ roles, passwordHash: await testPasswordHash(), emailVerified: true });
}

describe("register → verify → login → validate → logout", () => {
  it("runs the whole email journey for a student", async () => {
    const email = uniqueEmail("journey");
    const meta = testMeta();
    const registered = await register(
      {
        role: "STUDENT",
        firstName: "Rudo",
        lastName: "",
        identifier: `  ${email.toUpperCase()} `,
        password: TEST_PASSWORD,
        birthYear: "2011",
        acceptTerms: true,
        next: "/app/practice",
      },
      meta,
    );
    expect(registered.flow).toMatchObject({ purpose: "EMAIL_VERIFY", channel: "EMAIL", target: email, next: "/app/practice" });

    const user = await db.user.findUniqueOrThrow({
      where: { emailNormalized: email },
      include: { profile: true, student: true, parent: true },
    });
    expect(user.roles).toEqual(["STUDENT"]);
    expect(user.emailVerifiedAt).toBeNull();
    expect(user.passwordHash?.startsWith("$argon2id$")).toBe(true);
    expect(user.profile).toMatchObject({ firstName: "Rudo", lastName: null, birthYear: 2011, termsVersion: TERMS_VERSION });
    expect(user.profile?.username).toMatch(/^[a-z0-9_]{3,30}$/);
    expect(user.student).toMatchObject({ isMinor: true, guardianConsentStatus: "PENDING" });
    expect(user.parent).toBeNull();

    // Wrong code first: generic error on the code field.
    const code = latestCodeFor(email);
    const wrong = await expectAppError(verifyCode(registered.flow, { code: code === "111111" ? "222222" : "111111" }, meta), "VALIDATION");
    expect(wrong.fieldErrors?.code).toEqual([AUTH_MESSAGES.invalidCode]);

    const verified = await verifyCode(registered.flow, { code }, meta);
    // Students who have not finished onboarding always go there first; the wizard continues to `next` afterwards.
    expect(verified.redirectTo).toBe("/onboarding?next=%2Fapp%2Fpractice");
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).emailVerifiedAt).not.toBeNull();
    const fromVerify = await validateSessionToken(verified.token, { kind: "WEB" });
    expect(fromVerify?.session.authMethod).toBe("OTP");

    const login = asSession(await loginWithPassword({ identifier: email, password: TEST_PASSWORD }, meta));
    const validated = await validateSessionToken(login.token, { kind: "WEB" });
    expect(validated?.user.id).toBe(user.id);
    expect(validated?.session.authMethod).toBe("PASSWORD");
    const actor = actorFromSession(validated!);
    expect(actor.roles).toEqual(["STUDENT"]);

    await logout(login.session, meta, actor.roles);
    expect(await validateSessionToken(login.token)).toBeNull();
    expect(await validateSessionToken(verified.token)).not.toBeNull();

    expect(await auditActions(user.id)).toEqual([
      "auth.register",
      "auth.contact.verify",
      "auth.login.success",
      "auth.login.success",
      "auth.logout",
    ]);
  });

  it("registers a parent by email and routes to /parent", async () => {
    const email = uniqueEmail("parent-reg");
    const meta = testMeta();
    const registered = await register({ role: "PARENT", firstName: "Chipo", identifier: email, password: TEST_PASSWORD, acceptTerms: true }, meta);
    expect(registered.flow).toMatchObject({ purpose: "EMAIL_VERIFY", channel: "EMAIL", target: email, next: null });
    expect(latestDevMessage(email, "email")?.tag).toBe("otp.EMAIL_VERIFY");
    const user = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, include: { parent: true, student: true } });
    expect(user.roles).toEqual(["PARENT"]);
    expect(user.phoneE164).toBeNull();
    expect(user.parent).not.toBeNull();
    expect(user.student).toBeNull();

    const verified = await verifyCode(registered.flow, { code: latestCodeFor(email) }, meta);
    expect(verified.redirectTo).toBe("/parent");
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).emailVerifiedAt).not.toBeNull();
  });

  it("refuses a phone number at registration (field error about the kind only) and creates nothing", async () => {
    const phone = uniquePhone();
    const national = `0${phone.slice(4, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`;
    const error = await expectAppError(
      register({ role: "PARENT", firstName: "Chipo", identifier: national, password: TEST_PASSWORD, acceptTerms: true }, testMeta()),
      "VALIDATION",
    );
    expect(error.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.emailNotPhone]);
    expect(await db.user.count({ where: { phoneE164: phone } })).toBe(0);
    expect(getDevOutbox({ to: phone })).toEqual([]);
    const garbage = await expectAppError(register({ role: "PARENT", firstName: "Chipo", identifier: "not an address", password: TEST_PASSWORD, acceptTerms: true }, testMeta()), "VALIDATION");
    expect(garbage.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.invalidEmail]);
  });

  it("validates input with field errors", async () => {
    const meta = testMeta();
    // Schema errors surface as ZodError (mapped to VALIDATION with field errors by the action / API layer).
    const missing = await register({ role: "STUDENT", firstName: "", identifier: "", password: "", acceptTerms: false }, meta).catch(
      (error: unknown) => error,
    );
    expect(missing).toBeInstanceOf(z.ZodError);
    expect(Object.keys(fromZodError(missing as z.ZodError)).sort()).toEqual(["acceptTerms", "firstName", "identifier", "password"]);

    const badContact = await expectAppError(
      register({ firstName: "A", identifier: "hhs.someone", password: TEST_PASSWORD, acceptTerms: true }, meta),
      "VALIDATION",
    );
    expect(badContact.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.invalidEmail]);

    const email = uniqueEmail("policy");
    const weak = await expectAppError(
      register({ firstName: "A", identifier: email, password: email, acceptTerms: true }, meta),
      "VALIDATION",
    );
    expect(weak.fieldErrors?.password?.length).toBeGreaterThan(0);
    expect(await db.user.findUnique({ where: { emailNormalized: email } })).toBeNull();
  });

  it("treats a student with an adult birth year as an adult", async () => {
    expect(isMinorFromBirthYear(undefined)).toBe(true);
    expect(isMinorFromBirthYear(2008, new Date("2026-10-05"))).toBe(true);
    expect(isMinorFromBirthYear(2007, new Date("2026-10-05"))).toBe(false);
    const email = uniqueEmail("adult");
    await register({ firstName: "Tatenda", identifier: email, password: TEST_PASSWORD, birthYear: 1990, acceptTerms: true }, testMeta());
    const user = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, include: { student: true } });
    expect(user.student).toMatchObject({ isMinor: false, guardianConsentStatus: "NOT_REQUIRED" });
  });
});

describe("registration never reveals existing accounts", () => {
  it("existing verified account: same outcome, no change, owner notified", async () => {
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const outcome = await register(
      { role: "TEACHER", firstName: "Mallory", identifier: email, password: "another strong phrase", acceptTerms: true },
      testMeta(),
    );
    expect(outcome.flow).toMatchObject({ purpose: "EMAIL_VERIFY", target: email });
    const after = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(after.roles).toEqual(["STUDENT"]);
    expect(after.passwordHash).toBe(user.passwordHash);
    expect(latestDevMessage(email)?.tag).toBe("auth.account_exists");
    // No code was issued, so any code fails with the generic message.
    await expectAppError(verifyCode(outcome.flow, { code: "123456" }, testMeta()), "VALIDATION");
  });

  it("an abandoned (never verified, never used) registration is replaced by a new one", async () => {
    const email = uniqueEmail("abandoned");
    await register({ role: "TEACHER", firstName: "Squatter", identifier: email, password: "squatter pass phrase", acceptTerms: true }, testMeta());
    const first = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, include: { teacher: true } });
    expect(first.teacher).not.toBeNull();
    await abandon(first.id);

    const meta = testMeta();
    await clearOtpCooldown("EMAIL_VERIFY", email);
    const second = await register({ role: "STUDENT", firstName: "Owner", identifier: email, password: TEST_PASSWORD, acceptTerms: true }, meta);
    const replaced = await db.user.findUniqueOrThrow({
      where: { emailNormalized: email },
      include: { teacher: true, student: true, profile: true },
    });
    expect(replaced.id).toBe(first.id);
    expect(replaced.roles).toEqual(["STUDENT"]);
    expect(replaced.teacher).toBeNull();
    expect(replaced.student).not.toBeNull();
    expect(replaced.profile?.firstName).toBe("Owner");
    expect((await verifyPassword(replaced.passwordHash!, "squatter pass phrase")).valid).toBe(false);

    await verifyCode(second.flow, { code: latestCodeFor(email) }, meta);
    asSession(await loginWithPassword({ identifier: email, password: TEST_PASSWORD }, meta));
    await expectAppError(loginWithPassword({ identifier: email, password: "squatter pass phrase" }, meta), "UNAUTHENTICATED");
  });

  it("flows look alike whether or not a code was sent (same binding shape, same sealed size)", async () => {
    const fresh = await register({ firstName: "Rudo", identifier: uniqueEmail("shape-new"), password: TEST_PASSWORD, acceptTerms: true }, testMeta());
    const { user } = await verifiedAccount();
    const existing = await register({ firstName: "Rudo", identifier: user.emailNormalized!, password: TEST_PASSWORD, acceptTerms: true }, testMeta());
    expect(fresh.flow.binding).toMatch(/^[0-9a-f]{64}$/);
    expect(existing.flow.binding).toMatch(/^[0-9a-f]{64}$/);
    const sameTarget = (flow: VerifyOutcome["flow"]) => sealAuthFlow({ ...flow, target: "same@example.test", sentAt: 1 });
    expect(sameTarget(fresh.flow).length).toBe(sameTarget(existing.flow).length);
  });
});

/** Makes a pending registration look abandoned: untouched for two days and with no live code. */
async function abandon(userId: string): Promise<void> {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 3600 * 1000);
  await db.user.update({ where: { id: userId }, data: { createdAt: twoDaysAgo, passwordUpdatedAt: twoDaysAgo } });
  await db.verificationCode.updateMany({ where: { userId, consumedAt: null }, data: { consumedAt: new Date() } });
}

describe("pre-verification takeover (AUTH-01)", () => {
  const VICTIM_PASSWORD = "victim river maths 7";
  const ATTACKER_PASSWORD = "attacker owns this 9";

  it("re-registering an address whose registration is still pending changes nothing: the owner's code and password keep working", async () => {
    const email = uniqueEmail("pending");
    const victimMeta = testMeta();
    const victim = await register({ role: "STUDENT", firstName: "Tari", identifier: email, password: VICTIM_PASSWORD, acceptTerms: true }, victimMeta);
    const c1 = latestCodeFor(email);
    const original = await db.user.findUniqueOrThrow({ where: { emailNormalized: email } });

    // More than a minute later (cooldown over) a classmate registers the same address with their own password.
    await clearOtpCooldown("EMAIL_VERIFY", email);
    await register({ role: "STUDENT", firstName: "Tari", identifier: email, password: ATTACKER_PASSWORD, acceptTerms: true }, testMeta());
    const after = await db.user.findUniqueOrThrow({ where: { emailNormalized: email } });
    expect(after.passwordHash).toBe(original.passwordHash);
    expect(latestDevMessage(email)?.tag).toBe("auth.account_exists");

    // The victim's own code still works and keeps the victim's password.
    expect(asSession(await verifyCode(victim.flow, { code: c1 }, victimMeta)).userId).toBe(original.id);
    await expectAppError(loginWithPassword({ identifier: email, password: ATTACKER_PASSWORD }, testMeta()), "UNAUTHENTICATED");
    expect(asSession(await loginWithPassword({ identifier: email, password: VICTIM_PASSWORD }, testMeta())).userId).toBe(original.id);
  });

  it("verifying through a flow that did not choose the current password discards that password", async () => {
    const email = uniqueEmail("rebound");
    const victimMeta = testMeta();
    const victim = await register({ role: "STUDENT", firstName: "Tari", identifier: email, password: VICTIM_PASSWORD, acceptTerms: true }, victimMeta);
    const { id } = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, select: { id: true } });

    // Even when another registration does replace the password (here: the shell was abandoned), the code it sends to
    // the owner's inbox cannot activate it through the owner's flow.
    await abandon(id);
    await clearOtpCooldown("EMAIL_VERIFY", email);
    await register({ role: "STUDENT", firstName: "Tari", identifier: email, password: ATTACKER_PASSWORD, acceptTerms: true }, testMeta());
    const c2 = latestCodeFor(email);
    expect(asSession(await verifyCode(victim.flow, { code: c2 }, victimMeta)).userId).toBe(id);

    const user = await db.user.findUniqueOrThrow({ where: { id } });
    expect(user.emailVerifiedAt).not.toBeNull();
    expect(user.passwordHash).toBeNull();
    await expectAppError(loginWithPassword({ identifier: email, password: ATTACKER_PASSWORD }, testMeta()), "UNAUTHENTICATED");
  });

  it("an owner verifying a squatter's registration through their own flow (resend) discards the squatter's password", async () => {
    const email = uniqueEmail("squatted");
    await register({ firstName: "Squatter", identifier: email, password: ATTACKER_PASSWORD, acceptTerms: true }, testMeta());
    const ownerMeta = testMeta();
    await clearOtpCooldown("EMAIL_VERIFY", email);
    const owner = await register({ firstName: "Owner", identifier: email, password: VICTIM_PASSWORD, acceptTerms: true }, ownerMeta);
    await clearOtpCooldown("EMAIL_VERIFY", email);
    await resendCode(owner.flow, ownerMeta);
    await verifyCode(owner.flow, { code: latestCodeFor(email) }, ownerMeta);
    expect((await db.user.findUniqueOrThrow({ where: { emailNormalized: email } })).passwordHash).toBeNull();
    await expectAppError(loginWithPassword({ identifier: email, password: ATTACKER_PASSWORD }, testMeta()), "UNAUTHENTICATED");
  });
});

describe("password login", () => {
  it("accepts email in any case and school usernames, never a phone number", async () => {
    const { user } = await verifiedAccount();
    const meta = testMeta();
    expect(asSession(await loginWithPassword({ identifier: ` ${user.emailNormalized!.toUpperCase()} `, password: TEST_PASSWORD }, meta)).userId).toBe(user.id);

    // A phone number is not a sign-in identifier, even for an account that has one (a field error about its kind).
    const phone = uniquePhone();
    const { user: withPhone } = await createUser({ roles: ["STUDENT"], email: null, phone, passwordHash: await testPasswordHash() });
    await db.user.update({ where: { id: withPhone.id }, data: { phoneVerifiedAt: new Date() } });
    const refused = await expectAppError(loginWithPassword({ identifier: `0${phone.slice(4)}`, password: TEST_PASSWORD }, meta), "VALIDATION");
    expect(refused.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.phoneNotForSignIn]);

    const username = `hhs.${uniqueSuffix()}`;
    const provisioned = await db.user.create({
      data: { loginUsername: username, passwordHash: await testPasswordHash(), roles: ["STUDENT"] },
    });
    await db.student.create({ data: { userId: provisioned.id } });
    const outcome = asSession(await loginWithPassword({ identifier: username.toUpperCase(), password: TEST_PASSWORD }, meta));
    expect(outcome.userId).toBe(provisioned.id);
  });

  it("returns a verification step (and sends a code) for a correct password on an unverified account", async () => {
    const { user } = await createUser({ roles: ["PARENT"], passwordHash: await testPasswordHash() });
    const meta = testMeta();
    const outcome = asVerify(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, meta));
    expect(outcome.flow).toMatchObject({ purpose: "EMAIL_VERIFY", target: user.emailNormalized });
    const session = await verifyCode(outcome.flow, { code: latestCodeFor(user.emailNormalized!) }, meta);
    expect(session.redirectTo).toBe("/parent");
    // The client proved the password, so its verification keeps it.
    asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
  });

  it("locks the account after 5 wrong passwords for 15 minutes (audited), then recovers", async () => {
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const meta = testMeta();
    for (let i = 0; i < 4; i += 1) {
      const error = await expectAppError(loginWithPassword({ identifier: email, password: `wrong ${i}` }, meta), "UNAUTHENTICATED");
      expect(error.message).toBe(AUTH_MESSAGES.invalidCredentials);
    }
    const locked = await expectAppError(loginWithPassword({ identifier: email, password: "wrong 5" }, meta), "RATE_LIMITED");
    expect(locked.message).toBe(AUTH_MESSAGES.locked);
    expect(locked.retryAfterSeconds).toBeGreaterThan(14 * 60);

    // Even the right password is refused while locked.
    await expectAppError(loginWithPassword({ identifier: email, password: TEST_PASSWORD }, meta), "RATE_LIMITED");
    const row = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(row.lockedUntil).not.toBeNull();
    const actions = await auditActions(user.id);
    expect(actions.filter((action) => action === "auth.login.failure")).toHaveLength(5);
    expect(actions.filter((action) => action === "auth.account.locked")).toHaveLength(1);

    // Lock over: the right password works again and clears the counters.
    await db.user.update({ where: { id: user.id }, data: { lockedUntil: new Date(Date.now() - 1000) } });
    asSession(await loginWithPassword({ identifier: email, password: TEST_PASSWORD }, testMeta()));
    const cleared = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(cleared).toMatchObject({ failedLoginCount: 0, lockedUntil: null });
  });

  it("answers unknown identifiers exactly like real accounts, including the 'lock' on the 5th failure", async () => {
    const email = uniqueEmail("ghost");
    const meta = testMeta();
    for (let i = 0; i < 4; i += 1) {
      const error = await expectAppError(loginWithPassword({ identifier: email, password: `guess ${i}` }, meta), "UNAUTHENTICATED");
      expect(error.message).toBe(AUTH_MESSAGES.invalidCredentials);
    }
    const locked = await expectAppError(loginWithPassword({ identifier: email, password: "guess 5" }, meta), "RATE_LIMITED");
    expect(locked.message).toBe(AUTH_MESSAGES.locked);
    expect(await db.user.findUnique({ where: { emailNormalized: email } })).toBeNull();
  });

  it("locks real accounts and unknown identifiers identically: same answer and Retry-After on the 5th failure and after (AUTH-03)", async () => {
    const { user } = await verifiedAccount();
    const probes = { real: user.emailNormalized!, ghost: uniqueEmail("ghost-lock") };
    const seen: Record<string, { code: string; message: string; retryAfter: number | undefined }[]> = {};
    for (const [label, identifier] of Object.entries(probes)) {
      const meta = testMeta();
      for (let i = 0; i < 4; i += 1) await expectAppError(loginWithPassword({ identifier, password: `bad ${i}` }, meta), "UNAUTHENTICATED");
      const fifth = await expectAppError(loginWithPassword({ identifier, password: "bad 5" }, meta), "RATE_LIMITED");
      const sixth = await expectAppError(loginWithPassword({ identifier, password: "bad 6" }, testMeta()), "RATE_LIMITED");
      seen[label] = [fifth, sixth].map((error) => ({ code: error.code, message: error.message, retryAfter: error.retryAfterSeconds }));
    }
    expect(seen.real![0]).toEqual({ code: "RATE_LIMITED", message: AUTH_MESSAGES.locked, retryAfter: LOCKOUT_POLICY.lockMs / 1000 });
    expect(seen.ghost![0]).toEqual(seen.real![0]);
    expect(seen.ghost![1]!.message).toBe(AUTH_MESSAGES.locked);
    expect(Math.abs(seen.ghost![1]!.retryAfter! - seen.real![1]!.retryAfter!)).toBeLessThanOrEqual(2);
  });

  it("old failures decay the same way for real accounts and unknown identifiers (AUTH-03)", async () => {
    const { user } = await verifiedAccount();
    const ghost = uniqueEmail("ghost-decay");
    const outcomes: Record<string, string> = {};
    for (const [label, identifier, subject] of [
      ["real", user.emailNormalized!, `u:${user.id}`],
      ["ghost", ghost, rateLimitSubject(ghost)],
    ] as const) {
      const meta = testMeta();
      for (let i = 0; i < 4; i += 1) await expectAppError(loginWithPassword({ identifier, password: `bad ${i}` }, meta), "UNAUTHENTICATED");
      // Half an hour passes (two 15-minute windows) for this probe's failure counter only.
      await db.$executeRaw`UPDATE "RateLimitBucket" SET "windowStart" = "windowStart" - interval '30 minutes' WHERE "key" = ${`loginFail:${subject}`}`;
      try {
        await loginWithPassword({ identifier, password: "bad 5" }, meta);
        outcomes[label] = "OK";
      } catch (error) {
        outcomes[label] = isAppError(error) ? error.code : "OTHER";
      }
    }
    expect(outcomes).toEqual({ real: "UNAUTHENTICATED", ghost: "UNAUTHENTICATED" });
  });

  it("a lock never refuses the owner's correct password on a browser that signed in before (AUTH-02)", async () => {
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const ownerDevice = rememberDevice(null, user.id);
    const attacker = testMeta();
    for (let i = 0; i < 5; i += 1) await expectAppError(loginWithPassword({ identifier: email, password: `nope ${i}` }, attacker), i < 4 ? "UNAUTHENTICATED" : "RATE_LIMITED");

    // A new browser is refused while the lock lasts…
    await expectAppError(loginWithPassword({ identifier: email, password: TEST_PASSWORD }, testMeta()), "RATE_LIMITED");
    // …but the owner's own device signs in, from any network.
    expect(asSession(await loginWithPassword({ identifier: email, password: TEST_PASSWORD }, testMeta({ deviceToken: ownerDevice }))).userId).toBe(user.id);
    // A remembered device for ANOTHER account changes nothing.
    const { user: other } = await verifiedAccount();
    for (let i = 0; i < 5; i += 1) await expectAppError(loginWithPassword({ identifier: other.emailNormalized!, password: `nope ${i}` }, attacker), i < 4 ? "UNAUTHENTICATED" : "RATE_LIMITED");
    await expectAppError(loginWithPassword({ identifier: other.emailNormalized!, password: TEST_PASSWORD }, testMeta({ deviceToken: ownerDevice })), "RATE_LIMITED");
  });

  it("a remembered device loses its exemption after 4 wrong passwords (a stolen token gives no extra guesses)", async () => {
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const device = testMeta({ deviceToken: rememberDevice(null, user.id) });
    for (let i = 0; i < 4; i += 1) await expectAppError(loginWithPassword({ identifier: email, password: `typo ${i}` }, device), "UNAUTHENTICATED");
    // The 5th failure is treated like any other client's: it locks the account…
    await expectAppError(loginWithPassword({ identifier: email, password: "typo 5" }, device), "RATE_LIMITED");
    // …and the lock now applies to this device too.
    await expectAppError(loginWithPassword({ identifier: email, password: TEST_PASSWORD }, device), "RATE_LIMITED");
  });

  it("rate limits per IP and identifier (10 per 15 minutes)", async () => {
    const email = uniqueEmail("rl");
    const meta = testMeta();
    const codes: string[] = [];
    for (let i = 0; i < 11; i += 1) {
      try {
        await loginWithPassword({ identifier: email, password: "x" }, meta);
      } catch (error) {
        codes.push(isAppError(error) ? error.code : "OTHER");
      }
    }
    expect(codes[10]).toBe("RATE_LIMITED");
  });

  it("refuses suspended accounts only after a correct password", async () => {
    const { user } = await verifiedAccount();
    await db.user.update({ where: { id: user.id }, data: { status: "SUSPENDED", statusChangedAt: new Date() } });
    const meta = testMeta();
    await expectAppError(loginWithPassword({ identifier: user.emailNormalized!, password: "wrong" }, meta), "UNAUTHENTICATED");
    const forbidden = await expectAppError(loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, meta), "FORBIDDEN");
    expect(forbidden.message).toBe(AUTH_MESSAGES.accountUnavailable);
  });

  it("issues dz_ bearer tokens for API sign-in", async () => {
    const { user } = await verifiedAccount(["TEACHER"]);
    const outcome = asSession(
      await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta(), { sessionKind: "API", label: "Android app" }),
    );
    expect(outcome.token.startsWith("dz_")).toBe(true);
    expect(outcome.redirectTo).toBe("/teacher");
    expect(await validateSessionToken(outcome.token, { kind: "API" })).not.toBeNull();
    expect(await validateSessionToken(outcome.token, { kind: "WEB" })).toBeNull();
  });

  it("validates the next path", async () => {
    const { user } = await verifiedAccount(["PARENT"]);
    const meta = testMeta();
    const safe = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD, next: "/parent/progress" }, meta));
    expect(safe.redirectTo).toBe("/parent/progress");
    const evil = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD, next: "//evil.example" }, meta));
    expect(evil.redirectTo).toBe("/parent");
  });
});

describe("IP-wide credential limit (identifier rotation)", () => {
  const LIMIT = RATE_LIMIT_PRESETS.loginIp.limit;

  async function codeOf(promise: Promise<unknown>): Promise<string> {
    try {
      await promise;
      return "OK";
    } catch (error) {
      if (!isAppError(error)) throw error;
      return error.code;
    }
  }

  it("stops password spraying: one IP rotating identifiers is refused after the IP budget, with the generic message", async () => {
    const meta = testMeta();
    for (let i = 0; i < LIMIT; i += 1) {
      expect(await codeOf(loginWithPassword({ identifier: uniqueEmail(`spray${i}`), password: "Winter2026!" }, meta)), `attempt ${i + 1}`).toBe("UNAUTHENTICATED");
    }
    const refused = await expectAppError(loginWithPassword({ identifier: uniqueEmail("spray-next"), password: "Winter2026!" }, meta), "RATE_LIMITED");
    expect(refused.message).toBe(AUTH_MESSAGES.tooManyAttempts);

    // A real account with the right password is refused from that IP too (same generic answer: nothing about accounts)…
    const { user } = await verifiedAccount();
    const blocked = await expectAppError(loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, meta), "RATE_LIMITED");
    expect(blocked.message).toBe(AUTH_MESSAGES.tooManyAttempts);
    // …while other IPs are unaffected.
    asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
  });

  it("stops code guessing across destinations, sharing one budget with password sign-in and code requests", async () => {
    const meta = testMeta();
    const half = Math.floor(LIMIT / 2);
    for (let i = 0; i < half; i += 1) {
      expect(await codeOf(loginWithPassword({ identifier: uniqueEmail(`mix${i}`), password: "guess" }, meta))).toBe("UNAUTHENTICATED");
    }
    for (let i = half; i < LIMIT; i += 1) {
      const flow = { purpose: "LOGIN_OTP" as const, channel: "EMAIL" as const, target: uniqueEmail(`guess${i}`), next: null, sentAt: Date.now() };
      expect(await codeOf(verifyCode(flow, { code: "123456" }, meta)), `code check ${i + 1}`).toBe("VALIDATION");
    }
    const flow = { purpose: "LOGIN_OTP" as const, channel: "EMAIL" as const, target: uniqueEmail("guess-next"), next: null, sentAt: Date.now() };
    expect((await expectAppError(verifyCode(flow, { code: "123456" }, meta), "RATE_LIMITED")).message).toBe(AUTH_MESSAGES.tooManyAttempts);
    await expectAppError(requestLoginCode({ identifier: uniqueEmail("request-next") }, meta), "RATE_LIMITED");
    const reset = { purpose: "PASSWORD_RESET" as const, channel: "EMAIL" as const, target: uniqueEmail("reset-next"), next: null, sentAt: Date.now() };
    await expectAppError(resetPassword(reset, { code: "123456", password: "a brand new phrase", confirmPassword: "a brand new phrase" }, meta), "RATE_LIMITED");
  });

  it("someone failing on purpose behind a shared school NAT cannot block a classmate's correct code, reset or remembered-device password (AUTH-06)", async () => {
    const nat = randomIp();
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const loginFlow = (await requestLoginCode({ identifier: email }, testMeta({ ip: nat }))).flow;
    const loginCode = latestCodeFor(email);
    const resetFlow = (await requestPasswordReset({ identifier: email }, testMeta({ ip: nat }))).flow;
    const resetCode = latestCodeFor(email);

    // A script on the same NAT fails passwords with rotating usernames until the IP budget is gone.
    for (let i = 0; i <= LIMIT; i += 1) await codeOf(loginWithPassword({ identifier: `nosuch${i}.${uniqueSuffix()}`, password: "x" }, testMeta({ ip: nat })));
    expect(await codeOf(loginWithPassword({ identifier: `nosuch.${uniqueSuffix()}`, password: "x" }, testMeta({ ip: nat })))).toBe("RATE_LIMITED");

    // The classmate's correct code still signs in, and a correct reset code still resets…
    expect(asSession(await verifyCode(loginFlow, { code: loginCode }, testMeta({ ip: nat }))).userId).toBe(user.id);
    const newPassword = "msasa trees in october";
    expect((await resetPassword(resetFlow, { code: resetCode, password: newPassword, confirmPassword: newPassword }, testMeta({ ip: nat }))).userId).toBe(user.id);
    // …a correct password from a browser that signed in before still works…
    const device = rememberDevice(null, user.id);
    asSession(await loginWithPassword({ identifier: email, password: newPassword }, testMeta({ ip: nat, deviceToken: device })));
    // …while a new browser on that NAT is still refused (password spraying needs the IP budget).
    await expectAppError(loginWithPassword({ identifier: email, password: newPassword }, testMeta({ ip: nat })), "RATE_LIMITED");
  });

  it("a client hammering ONE identifier is stopped per identifier without using up the IP budget", async () => {
    const meta = testMeta();
    const email = uniqueEmail("hammer");
    const codes: string[] = [];
    for (let i = 0; i < RATE_LIMIT_PRESETS.login.limit + 5; i += 1) codes.push(await codeOf(loginWithPassword({ identifier: email, password: `x${i}` }, meta)));
    expect(codes.at(-1)).toBe("RATE_LIMITED");
    // The IP counted only the attempts that passed the per-identifier limit, so classmates on the same IP still get in.
    const { user } = await verifiedAccount();
    asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, meta));
  });
});

describe("one-time-code login", () => {
  it("signs in an existing account with a code", async () => {
    const { user } = await verifiedAccount(["TEACHER"]);
    const meta = testMeta();
    const outcome = await requestLoginCode({ identifier: user.emailNormalized!, next: "/teacher/classes" }, meta);
    expect(outcome.flow).toMatchObject({ purpose: "LOGIN_OTP", next: "/teacher/classes" });
    const session = await verifyCode(outcome.flow, { code: latestCodeFor(user.emailNormalized!) }, meta);
    expect(session.redirectTo).toBe("/teacher/classes");
    expect((await validateSessionToken(session.token))?.session.authMethod).toBe("OTP");
  });

  it("unknown identifiers get the same outcome but no message", async () => {
    const email = uniqueEmail("nobody");
    const outcome = await requestLoginCode({ identifier: email }, testMeta());
    expect(outcome.flow).toMatchObject({ purpose: "LOGIN_OTP", target: email });
    expect(getDevOutbox({ to: email })).toHaveLength(0);
    await expectAppError(verifyCode(outcome.flow, { code: "123456" }, testMeta()), "VALIDATION");
    // The cooldown applies to unknown identifiers too.
    await expectAppError(resendCode(outcome.flow, testMeta()), "RATE_LIMITED");
  });

  it("discards a password chosen before any identifier was verified (pre-registration takeover)", async () => {
    const email = uniqueEmail("takeover");
    await register({ firstName: "Squatter", identifier: email, password: "squatter pass phrase", acceptTerms: true }, testMeta());
    const meta = testMeta();
    const outcome = await requestLoginCode({ identifier: email }, meta);
    // The registration code is replaced by the login code (cooldown is per purpose).
    await verifyCode(outcome.flow, { code: latestCodeFor(email) }, meta);
    const user = await db.user.findUniqueOrThrow({ where: { emailNormalized: email } });
    expect(user.passwordHash).toBeNull();
    expect(user.emailVerifiedAt).not.toBeNull();
  });
});

describe("code-send budgets cannot be pinned by refused requests (AUTH-02)", () => {
  const bucketKeys = (purpose: string, target: string) => ({
    cooldown: `otpCooldown:${rateLimitSubject(`${purpose}:${target}`)}`,
    target: `otpSendTarget:${rateLimitSubject(target)}`,
    daily: `otpSendTargetDaily:${rateLimitSubject(target)}`,
  });

  async function counts(keys: Record<string, string>): Promise<Record<string, number | null>> {
    const out: Record<string, number | null> = {};
    for (const [name, key] of Object.entries(keys)) out[name] = (await db.rateLimitBucket.findUnique({ where: { key } }))?.count ?? null;
    return out;
  }

  /** Waits (at most ~12 s) until at least 10 s remain in the current 60-second window, so the steps below share it. */
  async function earlyInWindow(): Promise<void> {
    const [row] = await db.$queryRaw<{ ms: number }[]>`SELECT (extract(epoch FROM now()) * 1000)::float8 AS ms`;
    const intoWindow = row!.ms % 60_000;
    if (intoWindow > 50_000) await new Promise((resolve) => setTimeout(resolve, 60_000 - intoWindow + 200));
  }

  it("refused code requests leave no trace in the target's cooldown or budgets", async () => {
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const attacker = testMeta();
    await requestPasswordReset({ identifier: email }, attacker);
    for (let i = 0; i < 3; i += 1) await expectAppError(requestPasswordReset({ identifier: email }, attacker), "RATE_LIMITED");
    expect(await counts(bucketKeys("PASSWORD_RESET", email))).toEqual({ cooldown: 1, target: 1, daily: 1 });
  });

  it("an attacker re-requesting every minute cannot keep the owner's cooldown closed", async () => {
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const { cooldown } = bucketKeys("PASSWORD_RESET", email);
    const minuteLater = () => db.$executeRaw`UPDATE "RateLimitBucket" SET "windowStart" = "windowStart" - interval '60 seconds' WHERE "key" = ${cooldown}`;
    await earlyInWindow();
    const attacker = testMeta();
    await requestPasswordReset({ identifier: email }, attacker); // one real code
    await minuteLater();
    await expectAppError(requestPasswordReset({ identifier: email }, attacker), "RATE_LIMITED"); // still in the cooldown
    await minuteLater();
    // Two minutes after the only real send, the owner can ask for a reset code (the refused ping did not count).
    await requestPasswordReset({ identifier: email }, testMeta());
    expect(latestDevMessage(email)?.tag).toBe("otp.PASSWORD_RESET");
  });
});

describe("code delivery never shows in the response (AUTH-04)", () => {
  class SlowEmail implements MessagingChannel {
    readonly channel = "email" as const;
    readonly driver = "slow-test";
    async send(): Promise<{ providerRef: string; driver: string }> {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return { providerRef: "slow", driver: this.driver };
    }
  }

  afterEach(() => setMessagingChannel("email", null));

  it("a failing email provider answers like an unknown identifier for every anonymous code request", async () => {
    setMessagingChannel("email", new UnconfiguredProvider("email", "ses"));
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    expect((await requestLoginCode({ identifier: email }, testMeta())).flow.purpose).toBe("LOGIN_OTP");
    expect((await requestPasswordReset({ identifier: email }, testMeta())).flow.purpose).toBe("PASSWORD_RESET");
    expect((await requestLoginCode({ identifier: uniqueEmail("ghost-provider") }, testMeta())).flow.purpose).toBe("LOGIN_OTP");
    const fresh = uniqueEmail("provider-register");
    const registered = await register({ firstName: "Rudo", identifier: fresh, password: TEST_PASSWORD, acceptTerms: true }, testMeta());
    expect(registered.flow.purpose).toBe("EMAIL_VERIFY");
    await register({ firstName: "Rudo", identifier: email, password: TEST_PASSWORD, acceptTerms: true }, testMeta());
  });

  it("provider latency is not part of the response time", async () => {
    setMessagingChannel("email", new SlowEmail());
    const { user } = await verifiedAccount();
    const started = performance.now();
    await requestLoginCode({ identifier: user.emailNormalized! }, testMeta());
    expect(performance.now() - started).toBeLessThan(1000);
  });

  it("an unknown identifier gets the same database work (an unusable code row) and no message", async () => {
    const email = uniqueEmail("ghost-decoy");
    const outcome = await requestLoginCode({ identifier: email }, testMeta());
    const rows = await db.verificationCode.findMany({ where: { target: email, purpose: "LOGIN_OTP" }, select: { userId: true, consumedAt: true } });
    expect(rows).toEqual([{ userId: null, consumedAt: null }]);
    expect(getDevOutbox({ to: email })).toHaveLength(0);
    await expectAppError(verifyCode(outcome.flow, { code: "123456" }, testMeta()), "VALIDATION");
  });
});

describe("password reset", () => {
  it("resets with a code: new password works, old one and old sessions do not, lock cleared", async () => {
    const { user } = await verifiedAccount();
    const email = user.emailNormalized!;
    const before = asSession(await loginWithPassword({ identifier: email, password: TEST_PASSWORD }, testMeta()));
    await db.user.update({ where: { id: user.id }, data: { lockedUntil: new Date(Date.now() + 10 * 60_000) } });

    const meta = testMeta();
    const requested = await requestPasswordReset({ identifier: email }, meta);
    expect(requested.flow).toMatchObject({ purpose: "PASSWORD_RESET", target: email, next: null });
    const code = latestCodeFor(email);

    // Policy and confirmation are checked before the code is spent.
    const weak = await expectAppError(resetPassword(requested.flow, { code, password: "password1", confirmPassword: "password1" }, meta), "VALIDATION");
    expect(weak.fieldErrors?.password?.length).toBeGreaterThan(0);

    const newPassword = "baobab under the stars";
    const session = await resetPassword(requested.flow, { code, password: newPassword, confirmPassword: newPassword }, meta);
    expect(await validateSessionToken(session.token)).not.toBeNull();
    expect(await validateSessionToken(before.token)).toBeNull();

    await expectAppError(loginWithPassword({ identifier: email, password: TEST_PASSWORD }, testMeta()), "UNAUTHENTICATED");
    asSession(await loginWithPassword({ identifier: email, password: newPassword }, testMeta()));
    expect(await auditActions(user.id)).toContain("auth.password.reset");
    // Codes are single use.
    await expectAppError(resetPassword(requested.flow, { code, password: newPassword, confirmPassword: newPassword }, meta), "VALIDATION");
  });

  it("unknown identifiers get the same outcome and nothing is sent", async () => {
    const email = uniqueEmail("reset-unknown");
    const outcome = await requestPasswordReset({ identifier: email }, testMeta());
    expect(outcome.flow).toMatchObject({ purpose: "PASSWORD_RESET", channel: "EMAIL", target: email });
    expect(getDevOutbox({ to: email })).toHaveLength(0);
  });

  it("refuses a phone number for a reset or a code sign-in (codes go by email only)", async () => {
    const phone = uniquePhone();
    for (const request of [requestPasswordReset, requestLoginCode]) {
      const error = await expectAppError(request({ identifier: phone }, testMeta()), "VALIDATION");
      expect(error.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.emailNotPhone]);
    }
    expect(getDevOutbox({ to: phone })).toHaveLength(0);
  });
});

describe("signed-in account actions", () => {
  it("changes the password, revoking every session and returning a fresh one", async () => {
    const { user } = await verifiedAccount(["PARENT"]);
    const meta = testMeta();
    const current = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, meta));
    const other = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
    const actor = actorFromSession((await validateSessionToken(current.token))!);

    const wrong = await expectAppError(
      changePassword(actor, { currentPassword: "nope", password: "a new long phrase", confirmPassword: "a new long phrase" }, meta),
      "VALIDATION",
    );
    expect(wrong.fieldErrors?.currentPassword).toBeDefined();

    const fresh = await changePassword(
      actor,
      { currentPassword: TEST_PASSWORD, password: "a new long phrase", confirmPassword: "a new long phrase" },
      meta,
    );
    expect(await validateSessionToken(current.token)).toBeNull();
    expect(await validateSessionToken(other.token)).toBeNull();
    expect(await validateSessionToken(fresh.token)).not.toBeNull();
    expect(await auditActions(user.id)).toContain("auth.password.change");
  });

  it("limits current-password guesses per user, not per IP, and signs the session out after 5 wrong ones (AUTH-08)", async () => {
    const { user } = await verifiedAccount(["PARENT"]);
    const login = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
    const actor = actorFromSession((await validateSessionToken(login.token))!);
    const attempt = (currentPassword: string) =>
      changePassword(actor, { currentPassword, password: "a new long phrase", confirmPassword: "a new long phrase" }, testMeta());

    // Rotating IPs does not help: every guess counts against the account.
    for (let i = 0; i < 4; i += 1) await expectAppError(attempt(`guess ${i}`), "VALIDATION");
    const signedOut = await expectAppError(attempt("guess 5"), "UNAUTHENTICATED");
    expect(signedOut.message).toBe(AUTH_MESSAGES.signedOutAfterFailures);
    expect(await validateSessionToken(login.token)).toBeNull();
    expect(await auditActions(user.id)).toContain("auth.sessions.revoke");
    for (let i = 6; i <= 10; i += 1) await expectAppError(attempt(`guess ${i}`), "UNAUTHENTICATED");
    await expectAppError(attempt(TEST_PASSWORD), "RATE_LIMITED");
    // Step-up shares the same per-user budget.
    await expectAppError(reauthenticateWithPassword(actor, { password: TEST_PASSWORD }, testMeta()), "RATE_LIMITED");
  });

  it("logs out everywhere, optionally keeping the current session", async () => {
    const { user } = await verifiedAccount();
    const a = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
    const b = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
    const actor = actorFromSession((await validateSessionToken(a.token))!);
    expect(await logoutEverywhere(actor, testMeta(), { keepCurrent: true })).toBe(1);
    expect(await validateSessionToken(a.token)).not.toBeNull();
    expect(await validateSessionToken(b.token)).toBeNull();
  });
});

describe("step-up re-authentication", () => {
  it("confirms the password, refreshes the session's authentication time and audits", async () => {
    const { user } = await verifiedAccount(["ADMIN"]);
    const login = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
    await db.session.update({ where: { id: login.session.id }, data: { reauthenticatedAt: new Date(Date.now() - 60 * 60_000) } });
    const actor = actorFromSession((await validateSessionToken(login.token))!);

    const wrong = await expectAppError(reauthenticateWithPassword(actor, { password: "nope" }, testMeta()), "VALIDATION");
    expect(wrong.fieldErrors?.password).toEqual(["That password is incorrect."]);

    await reauthenticateWithPassword(actor, { password: TEST_PASSWORD }, testMeta());
    const row = await db.session.findUniqueOrThrow({ where: { id: login.session.id } });
    expect(Date.now() - row.reauthenticatedAt!.getTime()).toBeLessThan(60_000);
    expect(await auditActions(user.id)).toContain("auth.step_up");
  });
});

describe("resend", () => {
  it("re-sends a registration code after the cooldown window and refreshes the flow", async () => {
    const { user } = await createStudent();
    const email = user.emailNormalized!;
    const flow = { purpose: "EMAIL_VERIFY" as const, channel: "EMAIL" as const, target: email, next: null, sentAt: 0 };
    const outcome = await resendCode(flow, testMeta());
    expect(outcome.flow.sentAt).toBeGreaterThan(0);
    expect(latestDevMessage(email)?.tag).toBe("otp.EMAIL_VERIFY");
    await expectAppError(resendCode(flow, testMeta()), "RATE_LIMITED");
  });
});
