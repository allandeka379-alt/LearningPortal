import { afterEach, describe, expect, it, vi } from "vitest";
import { APP_NAME } from "@/lib/config";
import { getEnv } from "@/server/lib/env";
import { isAppError } from "@/server/lib/errors";
import { createLogger } from "@/server/lib/logger";
import { ConsoleDriver, DEV_OUTBOX_CAPACITY } from "./console-driver";
import {
  clearDevOutbox,
  getDevOutbox,
  isAlwaysOn,
  isChannelSwitchedOn,
  isMessageSwitchedOn,
  latestDevMessage,
  maskRecipient,
  renderOtpMessage,
  resolveMessagingChannel,
  sendMessage,
  sendOtpMessage,
  sendToContact,
  setMessagingChannel,
} from "./index";
import type { MessagingChannel, OutboundMessage } from "./types";
import { WhatsAppCloudDriver } from "./whatsapp-driver";

// Every channel is switched on for this file (its adapters are what it tests); the switched-off cases flip the flags.
const flags = vi.hoisted(() => ({ ai: false, whatsapp: true, email: true, sms: true, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

const baseEnv = {
  NODE_ENV: "test",
  APP_URL: "http://localhost:3000",
  DATABASE_URL: "postgresql://x@localhost:5433/x_test",
  SESSION_SECRET: "test-only-session-secret-not-for-real-use-0123456789",
};

/** Real email + SMS adapters with fake keys (production refuses console and unknown provider names). */
const realProviders = {
  EMAIL_PROVIDER: "resend",
  RESEND_API_KEY: "re_test_key_not_real",
  EMAIL_FROM: "no-reply@mail.dzidza.test",
  SMS_PROVIDER: "twilio",
  TWILIO_ACCOUNT_SID: `AC${"0".repeat(32)}`,
  TWILIO_AUTH_TOKEN: "twilio-token-not-real",
  TWILIO_FROM: "DZIDZA",
};

afterEach(() => {
  setMessagingChannel("email", null);
  setMessagingChannel("sms", null);
  setMessagingChannel("whatsapp", null);
  flags.email = true;
  flags.sms = true;
  flags.whatsapp = true;
});

/** An adapter that records every message it is asked to send. */
function recordingAdapter(channel: MessagingChannel["channel"]): MessagingChannel & { sent: OutboundMessage[] } {
  const sent: OutboundMessage[] = [];
  return { channel, driver: "recording", sent, send: async (message) => (sent.push(message), { providerRef: `ref-${sent.length}`, driver: "recording" }) };
}

/** Every adapter replaced by a recorder, with every optional channel switched OFF (the defaults). */
function allOff() {
  flags.email = false;
  flags.sms = false;
  flags.whatsapp = false;
  const adapters = { email: recordingAdapter("email"), sms: recordingAdapter("sms"), whatsapp: recordingAdapter("whatsapp") };
  setMessagingChannel("email", adapters.email);
  setMessagingChannel("sms", adapters.sms);
  setMessagingChannel("whatsapp", adapters.whatsapp);
  return adapters;
}

describe("channel switches (owner decision 2026-10-07: email-based accounts)", () => {
  it("always sends account email (codes, security notices, invitations) while optional email is off", async () => {
    const { email } = allOff();
    const otp = await sendOtpMessage({ channel: "email", to: "rudo@example.test", code: "123456", purpose: "LOGIN_OTP" });
    const notice = await sendMessage({
      channel: "email",
      to: "rudo@example.test",
      subject: "s",
      text: "Your password was changed.",
      tag: "auth.security",
      transactional: true,
    });
    const invited = await sendToContact("tendai@example.test", { subject: "Invitation", text: "Join here.", tag: "school.invitation", sensitive: true });
    expect(otp.switchedOff).toBeUndefined();
    expect(notice).toEqual({ providerRef: "ref-2", driver: "recording" });
    expect(invited).toEqual({ status: "sent", channel: "email" });
    expect(email.sent.map((message) => [message.tag, message.transactional])).toEqual([
      ["otp.LOGIN_OTP", true],
      ["auth.security", true],
      ["school.invitation", true],
    ]);
    expect(isAlwaysOn({ channel: "email", transactional: true })).toBe(true);
    expect(await isMessageSwitchedOn({ channel: "email", transactional: true })).toBe(true);
  });

  it("never reaches a provider for optional email (digests, announcements, receipts), SMS or WhatsApp while they are off", async () => {
    const { email, sms, whatsapp } = allOff();
    const digest = await sendMessage({ channel: "email", to: "rudo@example.test", subject: "s", text: "Your week", tag: "notification.digest" });
    // `transactional` does not open SMS or WhatsApp: they have no account exception.
    const texted = await sendMessage({ channel: "sms", to: "+263771234567", text: "hello", tag: "test.sms", transactional: true });
    const smsCode = await sendOtpMessage({ channel: "sms", to: "+263771234567", code: "123456", purpose: "LOGIN_OTP" });
    const whatsapped = await sendMessage({ channel: "whatsapp", to: "+263771234567", text: "hello", tag: "test.whatsapp" });
    expect(digest).toEqual({ providerRef: "switched-off", driver: "switched-off", switchedOff: true });
    expect([texted.switchedOff, smsCode.switchedOff, whatsapped.switchedOff]).toEqual([true, true, true]);
    expect(email.sent).toEqual([]);
    expect(sms.sent).toEqual([]);
    expect(whatsapp.sent).toEqual([]);
    expect(await isChannelSwitchedOn("email")).toBe(false);
    expect(await isChannelSwitchedOn("sms")).toBe(false);
    expect(await isMessageSwitchedOn({ channel: "email" })).toBe(false);
  });

  it("does not text a phone contact while SMS is off: the caller shares the link instead", async () => {
    const { sms } = allOff();
    expect(await sendToContact("+263771234567", { subject: "Invitation", text: "Join here.", tag: "school.invitation" })).toEqual({
      status: "not_sent",
      channel: "sms",
      reason: "sms_switched_off",
    });
    expect(sms.sent).toEqual([]);
  });

  it("sends optional email and SMS again once their flags are on", async () => {
    const email = recordingAdapter("email");
    // Named like the free capture driver, so this send does not count against the shared database's SMS budget.
    const sms = { ...recordingAdapter("sms"), driver: "console" };
    setMessagingChannel("email", email);
    setMessagingChannel("sms", sms);
    const result = await sendMessage({ channel: "email", to: "rudo@example.test", subject: "s", text: "hello", tag: "test.email" });
    expect(result.switchedOff).toBeUndefined();
    expect(await sendToContact("+263771234567", { subject: "s", text: "Join here.", tag: "school.invitation" })).toEqual({ status: "sent", channel: "sms" });
    expect(email.sent).toHaveLength(1);
    expect(sms.sent).toHaveLength(1);
    expect(await isChannelSwitchedOn("email")).toBe(true);
  });

  it("reports a failed account email without throwing", async () => {
    setMessagingChannel("email", { channel: "email", driver: "broken", send: async () => Promise.reject(new Error("provider down")) });
    expect(await sendToContact("rudo@example.test", { subject: "s", text: "x", tag: "t" })).toEqual({ status: "not_sent", channel: "email", reason: "failed" });
  });

  it("still validates the recipient first", async () => {
    flags.email = false;
    const error = await sendMessage({ channel: "email", to: "not-an-email", text: "x", tag: "t" }).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("BAD_REQUEST");
  });
});

describe("renderOtpMessage", () => {
  it("renders short, plain templates with the code and expiry", () => {
    const login = renderOtpMessage({ code: "042917", purpose: "LOGIN_OTP" });
    expect(login.text).toBe(`Your ${APP_NAME} sign-in code is 042917. It expires in 10 minutes. Never share this code with anyone.`);
    expect(login.subject).toBe(`Your ${APP_NAME} code`);
    const reset = renderOtpMessage({ code: "123456", purpose: "PASSWORD_RESET", expiresInMinutes: 1 });
    expect(reset.subject).toBe(`Reset your ${APP_NAME} password`);
    expect(reset.text).toContain("It expires in 1 minute.");
    expect(reset.text).toContain("ignore this message");
    expect(renderOtpMessage({ code: "AB12CD34", purpose: "GUARDIAN_CONSENT" }).text).toMatch(/^A student asked you/);
    for (const text of [login.text, reset.text]) expect(text.length).toBeLessThanOrEqual(200);
  });

  it("rejects malformed codes", () => {
    expect(() => renderOtpMessage({ code: "12 34", purpose: "LOGIN_OTP" })).toThrow();
    expect(() => renderOtpMessage({ code: "<b>1</b>", purpose: "LOGIN_OTP" })).toThrow();
  });
});

describe("console driver + dev outbox", () => {
  it("captures messages for tests while logging only a redacted line", async () => {
    const lines: string[] = [];
    const logger = createLogger({ level: "debug", format: "json", write: (line) => lines.push(line) });
    setMessagingChannel("email", new ConsoleDriver("email", { logger }));
    clearDevOutbox();

    await sendOtpMessage({ channel: "email", to: "tendai@example.test", code: "918273", purpose: "LOGIN_OTP" });
    const message = latestDevMessage("tendai@example.test", "email");
    expect(message?.text).toContain("918273");
    expect(message?.tag).toBe("otp.LOGIN_OTP");
    expect(lines).toHaveLength(1);
    expect(lines[0]).not.toContain("918273");
    expect(lines[0]).not.toContain("tendai@example.test");
    expect(lines[0]).toContain("otp.LOGIN_OTP");
  });

  it("keeps only the most recent messages", async () => {
    const driver = new ConsoleDriver("email", { logger: createLogger({ level: "silent" }) });
    setMessagingChannel("email", driver);
    clearDevOutbox();
    for (let i = 0; i < DEV_OUTBOX_CAPACITY + 5; i += 1) {
      await sendMessage({ channel: "email", to: `u${i}@example.test`, subject: "s", text: `m${i}`, tag: "test" });
    }
    const all = getDevOutbox();
    expect(all).toHaveLength(DEV_OUTBOX_CAPACITY);
    expect(all[0]?.text).toBe(`m${DEV_OUTBOX_CAPACITY + 4}`);
    expect(getDevOutbox({ to: "u0@example.test" })).toEqual([]);
  });

  it("masks recipients", () => {
    expect(maskRecipient("tendai@example.test")).toBe("t***@example.test");
    expect(maskRecipient("+263771234567")).toBe("+26377***67");
  });
});

describe("provider resolution", () => {
  it("uses console drivers in dev/test and stubs for unknown providers", async () => {
    expect(resolveMessagingChannel("email", getEnv({ ...baseEnv })).driver).toBe("console");
    expect(resolveMessagingChannel("whatsapp", getEnv({ ...baseEnv })).driver).toBe("console");

    const smtp = resolveMessagingChannel("email", getEnv({ ...baseEnv, EMAIL_PROVIDER: "smtp" }));
    expect(smtp.driver).toBe("smtp");
    const error = await smtp.send({ channel: "email", to: "a@example.test", text: "x", tag: "t" }).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("INTERNAL");

    const whatsapp = resolveMessagingChannel(
      "whatsapp",
      getEnv({
        ...baseEnv,
        WHATSAPP_VERIFY_TOKEN: "v",
        WHATSAPP_ACCESS_TOKEN: "a",
        WHATSAPP_PHONE_NUMBER_ID: "1234567890",
        WHATSAPP_APP_SECRET: "s",
      }),
    );
    expect(whatsapp.driver).toBe("whatsapp-cloud");
  });

  it("never resolves a console driver in production; production without an SMS provider gets a fail-loud stub", () => {
    const prodEnv = {
      ...baseEnv,
      ...realProviders,
      NODE_ENV: "production",
      APP_URL: "https://dzidza.example",
      TRUSTED_PROXY_HOPS: "1",
    };
    expect(resolveMessagingChannel("whatsapp", getEnv(prodEnv)).driver).toBe("none");
    expect(resolveMessagingChannel("sms", getEnv(prodEnv)).driver).toBe("twilio");
    expect(resolveMessagingChannel("email", getEnv(prodEnv)).driver).toBe("resend");
    const noSms = { ...prodEnv, SMS_PROVIDER: undefined, TWILIO_ACCOUNT_SID: undefined, TWILIO_AUTH_TOKEN: undefined, TWILIO_FROM: undefined };
    expect(getEnv(noSms).SMS_PROVIDER).toBe("none");
    expect(resolveMessagingChannel("sms", getEnv(noSms)).driver).toBe("none");
  });

  it("uses the real WhatsApp Cloud API driver whenever the credentials are set (production included)", async () => {
    const credentials = {
      WHATSAPP_VERIFY_TOKEN: "verify-token-for-tests-0123456789abcdef",
      WHATSAPP_ACCESS_TOKEN: "access-token-for-tests-0123456789abcdef",
      WHATSAPP_PHONE_NUMBER_ID: "1234567890",
      WHATSAPP_APP_SECRET: "app-secret-for-tests-0123456789abcdef",
    };
    const prodEnv = {
      ...baseEnv,
      NODE_ENV: "production",
      APP_URL: "https://dzidza.example",
      SESSION_SECRET: "production-like-session-secret-0123456789-abcdefghijklmnopqrstuvwxyz",
      ...realProviders,
      TRUSTED_PROXY_HOPS: "1",
      ...credentials,
    };
    const production = resolveMessagingChannel("whatsapp", getEnv(prodEnv));
    expect(production).toBeInstanceOf(WhatsAppCloudDriver);
    expect(production.driver).toBe("whatsapp-cloud");
    // Dev / test with credentials also talk to the Cloud API (no console capture of real numbers).
    expect(resolveMessagingChannel("whatsapp", getEnv({ ...baseEnv, ...credentials }))).toBeInstanceOf(WhatsAppCloudDriver);
    // Without them, dev / test capture messages in the console outbox.
    expect(resolveMessagingChannel("whatsapp", getEnv({ ...baseEnv }))).toBeInstanceOf(ConsoleDriver);
  });

  it("validates recipients per channel", async () => {
    for (const [channel, to] of [
      ["email", "not-an-email"],
      ["sms", "0771234567"],
      ["whatsapp", "+0"],
    ] as const) {
      const error = await sendMessage({ channel, to, text: "x", tag: "t" }).catch((e: unknown) => e);
      expect(isAppError(error) && error.code, `${channel}:${to}`).toBe("BAD_REQUEST");
    }
  });
});
