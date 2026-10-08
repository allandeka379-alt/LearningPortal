import { afterEach, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { isAppError, type ErrorCode } from "@/server/lib/errors";
import { getDevOutbox, latestDevMessage, setMessagingChannel, type MessagingChannel, type OutboundMessage } from "@/server/messaging";
import { createUser, uniqueEmail, uniquePhone, uniqueSuffix } from "../../../tests/factories/index";
import { actorFromSession } from "./actor";
import { confirmEmailChange, requestEmailChange } from "./email-change";
import {
  AUTH_MESSAGES,
  changePassword,
  loginWithPassword,
  register,
  requestLoginCode,
  requestPasswordReset,
  resendCode,
  resetPassword,
  verifyCode,
  type AuthOutcome,
  type SessionOutcome,
} from "./flows";
import { validateSessionToken } from "./sessions";
import { clearOtpCooldown, latestCodeFor, TEST_PASSWORD, testMeta, testPasswordHash } from "./testing";

/**
 * Email-based accounts with every optional channel switched OFF (owner decision 2026-10-07: "email auth and not sms").
 * Registration with an email address + password verified by an emailed code, sign-in by email (or school username) +
 * password or an emailed code, password reset by an emailed code, change of email re-verified by email, and security
 * notices by email. `features.email` (optional email) and `features.sms` are off: account email still goes out, and NO
 * message ever reaches the SMS adapter.
 */

const flags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

/** Fails the test if anything is handed to the SMS adapter. */
const smsSpy: MessagingChannel & { sent: OutboundMessage[] } = {
  channel: "sms",
  driver: "spy",
  sent: [],
  send: async (message) => {
    smsSpy.sent.push(message);
    return { providerRef: "spy", driver: "spy" };
  },
};
setMessagingChannel("sms", smsSpy);

afterEach(() => {
  expect(smsSpy.sent).toEqual([]);
});

async function expectAppError(promise: Promise<unknown>, code: ErrorCode) {
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

/** Tags of every email captured for `to`, oldest first. */
function emailTags(to: string): string[] {
  return getDevOutbox({ to, channel: "email" })
    .map((message) => message.tag)
    .reverse();
}

async function signedIn(roles: ("STUDENT" | "PARENT")[] = ["STUDENT"]) {
  const { user } = await createUser({ roles, passwordHash: await testPasswordHash(), emailVerified: true });
  const session = asSession(await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta()));
  const actor = actorFromSession((await validateSessionToken(session.token))!);
  return { user, email: user.emailNormalized!, actor };
}

describe("registration with an email address (optional email and SMS switched off)", () => {
  it("emails a verification code, verifies the address and signs in; the chosen password keeps working", async () => {
    const email = uniqueEmail("email-auth-reg");
    const meta = testMeta();
    const pending = await register({ role: "STUDENT", firstName: "Tendai", identifier: email, password: TEST_PASSWORD, acceptTerms: true }, meta);
    expect(pending.flow).toMatchObject({ purpose: "EMAIL_VERIFY", channel: "EMAIL", target: email });
    expect(emailTags(email)).toEqual(["otp.EMAIL_VERIFY"]);

    const user = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, select: { id: true, phoneE164: true, emailVerifiedAt: true } });
    expect(user).toMatchObject({ phoneE164: null, emailVerifiedAt: null });

    const session = await verifyCode(pending.flow, { code: latestCodeFor(email) }, meta);
    expect(session.userId).toBe(user.id);
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).emailVerifiedAt).not.toBeNull();
    expect(asSession(await loginWithPassword({ identifier: email, password: TEST_PASSWORD }, testMeta())).userId).toBe(user.id);
  });

  it("tells the owner of an existing address by email, with the same outcome as a new registration", async () => {
    const { user } = await createUser({ roles: ["STUDENT"], passwordHash: await testPasswordHash(), emailVerified: true });
    const outcome = await register({ role: "STUDENT", firstName: "X", identifier: user.emailNormalized!, password: "another long phrase", acceptTerms: true }, testMeta());
    expect(outcome.flow).toMatchObject({ purpose: "EMAIL_VERIFY", channel: "EMAIL" });
    expect(emailTags(user.emailNormalized!)).toEqual(["auth.account_exists"]);
  });

  it("refuses a mobile number (codes go by email, not SMS) and creates nothing", async () => {
    const phone = uniquePhone();
    const error = await expectAppError(
      register({ role: "PARENT", firstName: "Rudo", identifier: `0${phone.slice(4)}`, password: TEST_PASSWORD, acceptTerms: true }, testMeta()),
      "VALIDATION",
    );
    expect(error.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.emailNotPhone]);
    expect(await db.user.count({ where: { phoneE164: phone } })).toBe(0);
    expect(getDevOutbox({ to: phone })).toEqual([]);
  });
});

describe("sign-in", () => {
  it("signs in with email + password, or with a code sent by email", async () => {
    const { user, email } = await signedIn();
    const meta = testMeta();
    const code = await requestLoginCode({ identifier: email.toUpperCase() }, meta);
    expect(code.flow).toMatchObject({ purpose: "LOGIN_OTP", channel: "EMAIL", target: email });
    expect(latestDevMessage(email, "email")?.tag).toBe("otp.LOGIN_OTP");
    expect((await verifyCode(code.flow, { code: latestCodeFor(email) }, meta)).userId).toBe(user.id);
  });

  it("emails a verification code when the password is right but the address was never confirmed", async () => {
    const { user } = await createUser({ roles: ["STUDENT"], passwordHash: await testPasswordHash(), emailVerified: false });
    const outcome = await loginWithPassword({ identifier: user.emailNormalized!, password: TEST_PASSWORD }, testMeta());
    expect(outcome.kind).toBe("verify");
    expect(latestDevMessage(user.emailNormalized!, "email")?.tag).toBe("otp.EMAIL_VERIFY");
  });

  it("never accepts a phone number as a sign-in identifier", async () => {
    const phone = uniquePhone();
    const { user } = await createUser({ roles: ["STUDENT"], email: null, phone, passwordHash: await testPasswordHash() });
    await db.user.update({ where: { id: user.id }, data: { phoneVerifiedAt: new Date() } });
    const error = await expectAppError(loginWithPassword({ identifier: phone, password: TEST_PASSWORD }, testMeta()), "VALIDATION");
    expect(error.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.phoneNotForSignIn]);
    const code = await expectAppError(requestLoginCode({ identifier: phone }, testMeta()), "VALIDATION");
    expect(code.fieldErrors?.identifier).toEqual([AUTH_MESSAGES.emailNotPhone]);
  });

  it("signs in a school-provisioned username + password as before", async () => {
    const username = `ea.${uniqueSuffix()}`.slice(0, 30);
    const user = await db.user.create({
      data: {
        loginUsername: username,
        passwordHash: await testPasswordHash(),
        roles: ["STUDENT"],
        profile: { create: { firstName: "Farai", displayName: "Farai" } },
        student: { create: { isMinor: true } },
      },
    });
    expect(asSession(await loginWithPassword({ identifier: username, password: TEST_PASSWORD }, testMeta())).userId).toBe(user.id);
  });

  it("treats a pending SMS flow from before the switch to email as expired", async () => {
    const phone = uniquePhone();
    const smsFlow = { purpose: "PHONE_VERIFY" as const, channel: "SMS" as const, target: phone, next: null, sentAt: Date.now() - 120_000 };
    const refused = await expectAppError(resendCode(smsFlow, testMeta()), "BAD_REQUEST");
    expect(refused.message).toBe(AUTH_MESSAGES.flowExpired);
    await expectAppError(verifyCode(smsFlow, { code: "123456" }, testMeta()), "VALIDATION");
  });
});

describe("password reset and security notices by email", () => {
  it("resets the password with an emailed code (also after a resend) and emails a security notice", async () => {
    const { user, email } = await signedIn(["PARENT"]);
    const meta = testMeta();
    const flow = (await requestPasswordReset({ identifier: email }, meta)).flow;
    expect(flow).toMatchObject({ purpose: "PASSWORD_RESET", channel: "EMAIL" });
    await clearOtpCooldown("PASSWORD_RESET", email);
    const resent = await resendCode(flow, meta);
    const session = await resetPassword(resent.flow, { code: latestCodeFor(email), password: "a brand new phrase", confirmPassword: "a brand new phrase" }, meta);
    expect(session.userId).toBe(user.id);
    expect(emailTags(email)).toEqual(["otp.PASSWORD_RESET", "otp.PASSWORD_RESET", "auth.security.password_reset"]);
    expect(latestDevMessage(email, "email")?.text).not.toMatch(/\b\d{6}\b/); // the notice carries no code
    expect(asSession(await loginWithPassword({ identifier: email, password: "a brand new phrase" }, testMeta())).userId).toBe(user.id);
  });

  it("emails a notice when a signed-in user changes their password", async () => {
    const { email, actor } = await signedIn();
    await changePassword(actor, { currentPassword: TEST_PASSWORD, password: "my changed long phrase", confirmPassword: "my changed long phrase" }, testMeta());
    expect(latestDevMessage(email, "email")?.tag).toBe("auth.security.password_changed");
  });
});

describe("change of email address (re-verified by email)", () => {
  it("needs the current password, emails a code to the NEW address, then switches and notifies the old one", async () => {
    const { user, email: oldEmail, actor } = await signedIn();
    const newEmail = uniqueEmail("email-auth-new");
    const wrong = await expectAppError(requestEmailChange(actor, { email: newEmail, currentPassword: "not my password" }, testMeta()), "VALIDATION");
    expect(wrong.fieldErrors?.currentPassword).toBeDefined();
    expect(getDevOutbox({ to: newEmail })).toEqual([]);

    const pending = await requestEmailChange(actor, { email: ` ${newEmail.toUpperCase()} `, currentPassword: TEST_PASSWORD }, testMeta());
    expect(pending.email).toBe(newEmail);
    expect(emailTags(newEmail)).toEqual(["otp.EMAIL_VERIFY"]);
    // Nothing changes until the code is entered.
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).emailNormalized).toBe(oldEmail);

    await expectAppError(confirmEmailChange(actor, { email: newEmail, code: latestCodeFor(newEmail) === "000000" ? "000001" : "000000" }, testMeta()), "VALIDATION");
    await confirmEmailChange(actor, { email: newEmail, code: latestCodeFor(newEmail) }, testMeta());
    const after = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(after.emailNormalized).toBe(newEmail);
    expect(after.emailVerifiedAt).not.toBeNull();
    expect(latestDevMessage(oldEmail, "email")?.tag).toBe("auth.security.email_changed");
    expect(latestDevMessage(oldEmail, "email")?.text).not.toContain(newEmail);
    expect(await db.auditLog.count({ where: { targetUserId: user.id, action: "auth.email.change" } })).toBe(1);
    // The new address now signs in; the old one no longer does.
    expect(asSession(await loginWithPassword({ identifier: newEmail, password: TEST_PASSWORD }, testMeta())).userId).toBe(user.id);
    await expectAppError(loginWithPassword({ identifier: oldEmail, password: TEST_PASSWORD }, testMeta()), "UNAUTHENTICATED");
  });

  it("sends nothing to an address that belongs to another account, and the change cannot complete", async () => {
    const { actor } = await signedIn();
    const { user: other } = await createUser({ roles: ["STUDENT"], emailVerified: true });
    const pending = await requestEmailChange(actor, { email: other.emailNormalized!, currentPassword: TEST_PASSWORD }, testMeta());
    expect(pending.email).toBe(other.emailNormalized);
    expect(getDevOutbox({ to: other.emailNormalized! })).toEqual([]);
    await expectAppError(confirmEmailChange(actor, { email: other.emailNormalized!, code: "123456" }, testMeta()), "VALIDATION");
  });

  it("does not accept a code issued for something else (a sign-in code for the same address)", async () => {
    const { actor } = await signedIn();
    const { user: target } = await createUser({ roles: ["STUDENT"], emailVerified: true });
    // A registration-style code for another account's address is not this user's email change.
    await requestLoginCode({ identifier: target.emailNormalized! }, testMeta());
    await expectAppError(confirmEmailChange(actor, { email: target.emailNormalized!, code: latestCodeFor(target.emailNormalized!) }, testMeta()), "VALIDATION");
  });
});
