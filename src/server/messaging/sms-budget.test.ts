import { randomInt } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { getJobHandler } from "@/server/lib/jobs";
import { SETTING_DEFINITIONS } from "@/server/lib/settings";
import { createUser } from "../../../tests/factories/index";
import { ConsoleDriver } from "./console-driver";
import { latestDevMessage, sendMessage, setMessagingChannel } from "./index";
import {
  assertSmsBudget,
  composeSmsBudgetAlert,
  registerSmsBudgetJobs,
  sendSmsBudgetAlert,
  SMS_BUDGET_ALERT_JOB,
  smsBudgetDay,
  smsPrefixAllowed,
  smsSentOn,
} from "./sms-budget";
import { DEFAULT_SMS_BUDGET, smsBudgetSchema } from "./sms-budget-setting";
import type { MessagingChannel, OutboundMessage, SendResult } from "./types";

// The budget only applies while SMS is switched on (`features.sms`, off by default), and the alert email is optional
// email (`features.email`): both are on for this file; one case switches optional email off.
const flags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: true, sms: true, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

/**
 * AUTH-05 residual: a global SMS budget against toll fraud (SMS pumping). Country-prefix policy and a daily platform cap
 * on every paid SMS send, with one SUPER_ADMIN alert per day when the cap is reached. Runs against the test database;
 * cap tests use their own (past) platform day so the shared database's real daily counter is never touched.
 */

/** A platform day nobody else uses: a random date in the past (keys are per day). */
function isolatedNow(): Date {
  return new Date(Date.UTC(1990 + randomInt(30), randomInt(12), 1 + randomInt(28), 10, randomInt(60)));
}

async function refusalOf(promise: Promise<unknown>): Promise<{ code: string; reason: unknown; retryAfterSeconds: number | undefined } | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    if (!isAppError(error)) throw error;
    return { code: error.code, reason: (error.details as { reason?: unknown } | undefined)?.reason, retryAfterSeconds: error.retryAfterSeconds };
  }
}

/** A paid SMS adapter (not the console driver) that records what reached the "provider". */
function paidSms(): MessagingChannel & { sent: OutboundMessage[] } {
  return {
    channel: "sms",
    driver: "fake-paid",
    sent: [],
    async send(message): Promise<SendResult> {
      this.sent.push(message);
      return { providerRef: `fake-${this.sent.length}`, driver: "fake-paid" };
    },
  };
}

afterEach(() => {
  setMessagingChannel("sms", null);
  setMessagingChannel("email", null);
});

describe("SMS budget rules (pure)", () => {
  it("allows only the configured country prefixes", () => {
    expect(smsPrefixAllowed("+263771234567", ["+263"])).toBe(true);
    expect(smsPrefixAllowed("+447700900123", ["+263"])).toBe(false);
    expect(smsPrefixAllowed("+27821234567", ["+263", "+27"])).toBe(true);
    expect(smsPrefixAllowed("+263711234567", ["+26377"])).toBe(false);
    expect(smsPrefixAllowed("+263771234567", [])).toBe(false);
  });

  it("counts platform days in Africa/Harare and says how long until the next one", () => {
    expect(smsBudgetDay(new Date("2026-10-07T21:59:59.000Z"))).toEqual({ day: "2026-10-07", secondsLeft: 1 });
    expect(smsBudgetDay(new Date("2026-10-07T22:00:00.000Z"))).toEqual({ day: "2026-10-08", secondsLeft: 86_400 });
  });

  it("registers the setting with a +263-only, capped default", () => {
    expect(SETTING_DEFINITIONS["messaging.smsBudget"].default).toEqual(DEFAULT_SMS_BUDGET);
    expect(DEFAULT_SMS_BUDGET).toEqual({ dailyMax: 2_000, allowedCountryPrefixes: ["+263"] });
    expect(smsBudgetSchema.safeParse({ dailyMax: null, allowedCountryPrefixes: ["+263", "+27"] }).success).toBe(true);
    expect(smsBudgetSchema.safeParse({ dailyMax: 0, allowedCountryPrefixes: ["+263"] }).success).toBe(false);
    expect(smsBudgetSchema.safeParse({ dailyMax: 10, allowedCountryPrefixes: ["263"] }).success).toBe(false);
  });
});

describe("assertSmsBudget", () => {
  it("refuses other countries without using the budget", async () => {
    const now = isolatedNow();
    const budget = { dailyMax: 5, allowedCountryPrefixes: ["+263"] };
    expect(await refusalOf(assertSmsBudget({ to: "+447700900123", tag: "otp.LOGIN_OTP" }, { now, budget }))).toEqual({
      code: "BAD_REQUEST",
      reason: "SMS_COUNTRY_NOT_ALLOWED",
      retryAfterSeconds: undefined,
    });
    expect(await smsSentOn(smsBudgetDay(now).day)).toBe(0);
  });

  it("caps the platform's SMS per day atomically, then refuses until the next day and alerts once", async () => {
    const now = isolatedNow();
    const { day, secondsLeft } = smsBudgetDay(now);
    const budget = { dailyMax: 5, allowedCountryPrefixes: ["+263"] };
    const results = await Promise.all(
      Array.from({ length: 12 }, () => refusalOf(assertSmsBudget({ to: "+263771234567", tag: "otp.LOGIN_OTP" }, { now, budget }))),
    );
    expect(results.filter((result) => result === null)).toHaveLength(5);
    expect(results.filter((result) => result !== null)).toEqual(
      Array.from({ length: 7 }, () => ({ code: "RATE_LIMITED", reason: "SMS_DAILY_BUDGET", retryAfterSeconds: secondsLeft })),
    );
    expect(await smsSentOn(day)).toBe(5);
    // One alert job for the day, however many sends were refused (on every node).
    const jobs = await db.job.findMany({ where: { dedupeKey: `${SMS_BUDGET_ALERT_JOB}:${day}` }, select: { type: true, queue: true, payload: true } });
    expect(jobs).toEqual([{ type: SMS_BUDGET_ALERT_JOB, queue: "notifications", payload: { day, dailyMax: 5 } }]);
    // No cap: everything to an allowed prefix goes through.
    await expect(assertSmsBudget({ to: "+263771234567", tag: "t" }, { now, budget: { dailyMax: null, allowedCountryPrefixes: ["+263"] } })).resolves.toBeUndefined();
  });
});

describe("sendMessage applies the budget to paid SMS", () => {
  it("never calls the provider for a number outside the allowed countries (default +263 only)", async () => {
    const adapter = paidSms();
    setMessagingChannel("sms", adapter);
    expect(await refusalOf(sendMessage({ channel: "sms", to: "+447700900123", text: "Your code is 123456.", tag: "otp.LOGIN_OTP" }))).toMatchObject({
      code: "BAD_REQUEST",
      reason: "SMS_COUNTRY_NOT_ALLOWED",
    });
    expect(adapter.sent).toHaveLength(0);
    await sendMessage({ channel: "sms", to: "+263771234567", text: "Your code is 123456.", tag: "otp.LOGIN_OTP" });
    expect(adapter.sent).toHaveLength(1);
  });

  it("leaves the free console driver (dev and tests) and other channels alone", async () => {
    setMessagingChannel("sms", new ConsoleDriver("sms"));
    await expect(sendMessage({ channel: "sms", to: "+447700900123", text: "Dev only.", tag: "test" })).resolves.toMatchObject({ driver: "console" });
  });
});

describe("messaging.smsBudgetAlert", () => {
  it("notifies each active SUPER_ADMIN in-app and by email, once per day", async () => {
    const { user: admin } = await createUser({ roles: ["SUPER_ADMIN"], emailVerified: true });
    const { user: noEmail } = await createUser({ roles: ["SUPER_ADMIN"], email: null, phone: `+26377${String(randomInt(1_000_000, 9_999_999))}` });
    setMessagingChannel("email", new ConsoleDriver("email"));
    const payload = { day: smsBudgetDay(isolatedNow()).day, dailyMax: 5 };

    const first = await sendSmsBudgetAlert(payload, { onlyUserIds: [admin.id, noEmail.id] });
    expect(first).toEqual({ recipients: 2, emailed: 1, withoutEmail: 1, emailFailed: 0 });
    const email = latestDevMessage(admin.emailNormalized!, "email");
    expect(email?.subject).toContain("Daily SMS budget reached");
    expect(email?.text).toContain("SMS pumping");
    for (const userId of [admin.id, noEmail.id]) {
      expect(await db.notification.count({ where: { userId, type: "ops.sms_budget_reached", dedupeKey: `sms-budget:${payload.day}` } })).toBe(1);
    }

    // A retry of the job sends nothing twice.
    const again = await sendSmsBudgetAlert(payload, { onlyUserIds: [admin.id] });
    expect(again).toMatchObject({ recipients: 1, emailed: 0, emailFailed: 0 });
    expect(await db.notification.count({ where: { userId: admin.id, type: "ops.sms_budget_reached" } })).toBe(1);
    expect(composeSmsBudgetAlert(payload).body).not.toMatch(/\+263\d/);
  });

  it("is in-app only while email is switched off", async () => {
    flags.email = false;
    try {
      const { user: admin } = await createUser({ roles: ["SUPER_ADMIN"], emailVerified: true });
      const recorded: OutboundMessage[] = [];
      setMessagingChannel("email", { channel: "email", driver: "spy", send: async (message) => (recorded.push(message), { providerRef: "x", driver: "spy" }) });
      const payload = { day: smsBudgetDay(isolatedNow()).day, dailyMax: 5 };
      expect(await sendSmsBudgetAlert(payload, { onlyUserIds: [admin.id] })).toEqual({ recipients: 1, emailed: 0, withoutEmail: 1, emailFailed: 0 });
      expect(recorded).toEqual([]);
      const notification = await db.notification.findFirstOrThrow({ where: { userId: admin.id, type: "ops.sms_budget_reached" } });
      expect(notification.channels).toEqual(["IN_APP"]);
    } finally {
      flags.email = true;
      setMessagingChannel("email", null);
    }
  });

  it("registers the handler on the notifications queue", () => {
    registerSmsBudgetJobs();
    expect(getJobHandler(SMS_BUDGET_ALERT_JOB)).toMatchObject({ type: SMS_BUDGET_ALERT_JOB, queue: "notifications", maxAttempts: 5 });
  });
});
