import { describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { getDevOutbox, latestDevMessage } from "@/server/messaging";
import { createStudent, uniqueEmail, uniquePhone } from "../../../tests/factories/index";
import { assertOtpSendAllowed, channelForTarget, issueOtp, OTP_POLICY, otpCodeHash, verifyOtp } from "./otp";
import { latestCodeFor, randomIp } from "./testing";

// Every optional channel is OFF (the defaults): codes are account email and go out anyway; SMS codes do not.
const flags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

/** A code different from `code` (same length). */
function wrongCode(code: string): string {
  return code === "000000" ? "000001" : "000000";
}

async function expectRateLimited(promise: Promise<unknown>): Promise<number> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error) && error.code === "RATE_LIMITED").toBe(true);
    return isAppError(error) ? (error.retryAfterSeconds ?? 0) : 0;
  }
  throw new Error("expected RATE_LIMITED");
}

describe("issueOtp / verifyOtp", () => {
  it("sends a 6-digit code, stores only its keyed hash, and verifies it once", async () => {
    const { user } = await createStudent();
    const target = user.emailNormalized!;
    const { codeId, expiresAt } = await issueOtp({ purpose: "EMAIL_VERIFY", target, userId: user.id, ip: randomIp() });
    const code = latestCodeFor(target);
    expect(latestDevMessage(target)?.tag).toBe("otp.EMAIL_VERIFY");

    const row = await db.verificationCode.findUniqueOrThrow({ where: { id: codeId } });
    expect(row.codeHash).toBe(otpCodeHash("EMAIL_VERIFY", target, code));
    expect(row.codeHash).not.toContain(code);
    expect(row.channel).toBe("EMAIL");
    expect(row.maxAttempts).toBe(OTP_POLICY.maxAttempts);
    expect(expiresAt.getTime() - row.createdAt.getTime()).toBe(OTP_POLICY.ttlMs);

    // Bound to purpose: the same code does not verify another purpose.
    expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code })).toEqual({ ok: false });
    expect(await verifyOtp({ purpose: "EMAIL_VERIFY", target, code })).toEqual({
      ok: true,
      codeId,
      userId: user.id,
      context: null,
    });
    expect(await verifyOtp({ purpose: "EMAIL_VERIFY", target, code })).toEqual({ ok: false });
  });

  it("allows 5 attempts per code, then refuses even the right code", async () => {
    const target = uniqueEmail("otp-attempts");
    await issueOtp({ purpose: "LOGIN_OTP", target, userId: null, ip: randomIp() });
    const code = latestCodeFor(target);
    for (let i = 0; i < OTP_POLICY.maxAttempts; i += 1) {
      expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code: wrongCode(code) })).toEqual({ ok: false });
    }
    expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code })).toEqual({ ok: false });
    const row = await db.verificationCode.findFirstOrThrow({ where: { target, purpose: "LOGIN_OTP" } });
    expect(row.attempts).toBe(OTP_POLICY.maxAttempts);
  });

  it("refuses expired codes", async () => {
    const target = uniqueEmail("otp-expiry");
    const { codeId } = await issueOtp({ purpose: "PASSWORD_RESET", target, userId: null, ip: randomIp() });
    const code = latestCodeFor(target);
    await db.verificationCode.update({
      where: { id: codeId },
      data: { createdAt: new Date(Date.now() - 20 * 60_000), expiresAt: new Date(Date.now() - 1000) },
    });
    expect(await verifyOtp({ purpose: "PASSWORD_RESET", target, code })).toEqual({ ok: false });
  });

  it("ignores malformed codes without spending an attempt", async () => {
    const target = uniqueEmail("otp-format");
    const { codeId } = await issueOtp({ purpose: "LOGIN_OTP", target, userId: null, ip: randomIp() });
    expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code: "12ab56" })).toEqual({ ok: false });
    expect((await db.verificationCode.findUniqueOrThrow({ where: { id: codeId } })).attempts).toBe(0);
    expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code: ` ${latestCodeFor(target)} ` })).toMatchObject({ ok: true });
  });

  it("a new code invalidates the previous one", async () => {
    const target = uniqueEmail("otp-reissue");
    const ip = randomIp();
    const first = await issueOtp({ purpose: "LOGIN_OTP", target, userId: null, ip });
    const firstCode = latestCodeFor(target);
    // Skip the resend cooldown (tested separately) to reissue immediately.
    await issueOtp({ purpose: "LOGIN_OTP", target, userId: null, ip, checkLimits: false });
    const secondCode = latestCodeFor(target);
    const old = await db.verificationCode.findUniqueOrThrow({ where: { id: first.codeId } });
    expect(old.consumedAt).not.toBeNull();
    if (firstCode !== secondCode) {
      expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code: firstCode })).toEqual({ ok: false });
    }
    expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code: secondCode })).toMatchObject({ ok: true });
  });

  it("emails codes while optional email is off, and never texts while SMS is off", async () => {
    expect(channelForTarget("a@b.test")).toBe("EMAIL");
    expect(channelForTarget("+263771234567")).toBe("SMS");
    const email = uniqueEmail("otp-email-off");
    await issueOtp({ purpose: "LOGIN_OTP", target: email, userId: null, ip: randomIp() });
    expect(latestDevMessage(email, "email")?.text).toMatch(/\b\d{6}\b/);

    const { user } = await createStudent({ email: null, phone: uniquePhone() });
    await issueOtp({ purpose: "PHONE_VERIFY", target: user.phoneE164!, userId: user.id, ip: randomIp() });
    expect(getDevOutbox({ to: user.phoneE164! })).toEqual([]);
  });

  it("texts a phone code only while SMS is switched on", async () => {
    flags.sms = true;
    try {
      const { user } = await createStudent({ email: null, phone: uniquePhone() });
      await issueOtp({ purpose: "PHONE_VERIFY", target: user.phoneE164!, userId: user.id, ip: randomIp() });
      expect(latestDevMessage(user.phoneE164!, "sms")?.text).toMatch(/\b\d{6}\b/);
    } finally {
      flags.sms = false;
    }
  });
});

describe("send and verify limits", () => {
  it("enforces a 60-second resend cooldown per (purpose, target), for known and unknown targets alike", async () => {
    const target = uniqueEmail("otp-cooldown");
    const ip = randomIp();
    await assertOtpSendAllowed("LOGIN_OTP", target, ip);
    const retryAfter = await expectRateLimited(assertOtpSendAllowed("LOGIN_OTP", target, ip));
    expect(retryAfter).toBeGreaterThan(0);
    expect(retryAfter).toBeLessThanOrEqual(2 * OTP_POLICY.resendCooldownSeconds);
    // Another purpose has its own cooldown.
    await assertOtpSendAllowed("PASSWORD_RESET", target, ip);
  });

  it("limits verification tries per target across codes", async () => {
    const target = uniqueEmail("otp-verify-limit");
    for (let i = 0; i < 10; i += 1) {
      expect(await verifyOtp({ purpose: "LOGIN_OTP", target, code: "123456" })).toEqual({ ok: false });
    }
    await expectRateLimited(verifyOtp({ purpose: "LOGIN_OTP", target, code: "123456" }));
  });
});
