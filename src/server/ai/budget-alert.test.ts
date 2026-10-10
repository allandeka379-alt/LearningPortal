import { randomInt, randomUUID } from "node:crypto";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { setMessagingChannel, type MessagingChannel, type OutboundMessage } from "@/server/messaging";
import { createUser } from "../../../tests/factories/identity";
import {
  AI_BUDGET_ALERT_JOB,
  AI_BUDGET_ALERT_TYPE,
  budgetAlertDedupeKey,
  composeBudgetAlert,
  enqueueBudgetAlert,
  formatUsdMicros,
  resetBudgetAlertMemo,
  sendBudgetAlert,
} from "./budget-alert";
import { DEFAULT_AI_CONFIG } from "./config";
import { createAiGateway, type AiBudgetExceededEvent } from "./gateway";
import { InMemoryUsageMeter } from "./meter";
import { FakeTransport } from "./testing/fake-transport";

/**
 * §40 budget trip alert: the gateway hook, the once-per-day queueing and the SUPER_ADMIN notification + email. Dates
 * are random days in the 2000s so parallel or repeated runs never share a dedupe key; our job rows are removed after.
 */

// The alert email is tested with email sending switched on (`features.email`); one case switches it off.
const flags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: true, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

const randomDay = () => `20${String(randomInt(0, 100)).padStart(2, "0")}-${String(randomInt(1, 13)).padStart(2, "0")}-${String(randomInt(1, 29)).padStart(2, "0")}`;
const usedKeys: string[] = [];

class CapturingEmail implements MessagingChannel {
  readonly channel = "email" as const;
  readonly driver = "test";
  sent: OutboundMessage[] = [];
  failFor = new Set<string>();
  async send(message: OutboundMessage) {
    if (this.failFor.has(message.to)) throw new Error("provider down");
    this.sent.push(message);
    return { providerRef: `test-${randomUUID()}`, driver: this.driver };
  }
}

let email: CapturingEmail;

beforeAll(() => {
  email = new CapturingEmail();
  setMessagingChannel("email", email);
});

afterEach(() => {
  email.sent = [];
  email.failFor.clear();
  flags.email = true;
});

afterAll(async () => {
  setMessagingChannel("email", null);
  await db.job.deleteMany({ where: { dedupeKey: { in: usedKeys } } });
});

describe("gateway hook", () => {
  it("reports every budget refusal to onBudgetExceeded, and a failing hook never breaks the refusal", async () => {
    const meter = new InMemoryUsageMeter();
    const events: AiBudgetExceededEvent[] = [];
    const config = structuredClone(DEFAULT_AI_CONFIG);
    config.budget.dailyCostCeilingMicros = 1_000_000;
    const now = new Date("2026-10-05T10:00:00Z");
    const make = (hook: (event: AiBudgetExceededEvent) => void) =>
      createAiGateway({ transport: new FakeTransport(), config, meter, clock: () => now, onBudgetExceeded: hook });
    meter.setSpend("2026-10-05", 1_250_000);
    const call = {
      route: "tutor",
      feature: "TUTOR" as const,
      userId: randomUUID(),
      maxTier: "DEEP" as const,
      system: { stable: ["POLICY"] },
      messages: [{ role: "user" as const, content: "Explain osmosis." }],
    };
    await expect(make((event) => void events.push(event)).complete(call)).rejects.toMatchObject({ code: "AI_UNAVAILABLE", details: { reason: "budget" } });
    expect(events).toEqual([{ platformDate: "2026-10-05", spentMicros: 1_250_000, ceilingMicros: 1_000_000 }]);

    const throwing = vi.fn(() => {
      throw new Error("hook exploded");
    });
    await expect(make(throwing).complete(call)).rejects.toMatchObject({ code: "AI_UNAVAILABLE" });
    expect(throwing).toHaveBeenCalledTimes(1);
  });
});

describe("composeBudgetAlert", () => {
  it("states the day, the spend and the ceiling in dollars, with no personal data", () => {
    expect(formatUsdMicros(50_000_000)).toBe("US$50.00");
    const text = composeBudgetAlert({ platformDate: "2026-10-05", spentMicros: 50_123_456, ceilingMicros: 50_000_000 }, "BvunzoHub");
    expect(text.title).toBe("AI daily budget reached");
    expect(text.body).toContain("2026-10-05");
    expect(text.body).toContain("US$50.12");
    expect(text.body).toContain("US$50.00");
  });
});

describe("enqueueBudgetAlert", () => {
  it("queues one alert job per platform day, whatever happens to it afterwards", async () => {
    resetBudgetAlertMemo();
    const day = randomDay();
    usedKeys.push(budgetAlertDedupeKey(day));
    const event = { platformDate: day, spentMicros: 2_000_000, ceilingMicros: 1_000_000 };
    expect(await enqueueBudgetAlert(event)).toBe(true);
    expect(await enqueueBudgetAlert(event)).toBe(false); // in-process memo
    resetBudgetAlertMemo();
    expect(await enqueueBudgetAlert(event)).toBe(false); // the database already has the day's job

    const jobs = await db.job.findMany({ where: { dedupeKey: budgetAlertDedupeKey(day) } });
    expect(jobs).toHaveLength(1);
    expect(jobs[0]).toMatchObject({ type: AI_BUDGET_ALERT_JOB, queue: "notifications", status: "PENDING", payload: event });

    // Finished (or dead) jobs still count: the day is never alerted twice.
    await db.job.update({ where: { id: jobs[0]!.id }, data: { status: "SUCCEEDED", completedAt: new Date() } });
    resetBudgetAlertMemo();
    expect(await enqueueBudgetAlert(event)).toBe(false);
    expect(await db.job.count({ where: { dedupeKey: budgetAlertDedupeKey(day) } })).toBe(1);
  });

  it("swallows invalid events instead of throwing into the AI request", async () => {
    expect(await enqueueBudgetAlert({ platformDate: "not-a-date", spentMicros: 1, ceilingMicros: 1 })).toBe(false);
  });
});

describe("sendBudgetAlert", () => {
  it("notifies each active SUPER_ADMIN in-app and by email once, retrying only failed emails", async () => {
    const [a, b, noEmail, suspended, plainAdmin] = await Promise.all([
      createUser({ roles: ["SUPER_ADMIN"], emailVerified: true }),
      createUser({ roles: ["SUPER_ADMIN"], emailVerified: true }),
      createUser({ roles: ["SUPER_ADMIN"], emailVerified: false }),
      createUser({ roles: ["SUPER_ADMIN"], emailVerified: true, status: "SUSPENDED" }),
      createUser({ roles: ["ADMIN"], emailVerified: true }),
    ]);
    const ids = [a, b, noEmail, suspended, plainAdmin].map((fixture) => fixture.user.id);
    const payload = { platformDate: randomDay(), spentMicros: 75_500_000, ceilingMicros: 50_000_000 };

    email.failFor.add(b.user.emailNormalized!);
    await expect(sendBudgetAlert(payload, { onlyUserIds: ids })).rejects.toThrow("provider down");
    expect(email.sent.map((message) => message.to)).toEqual([a.user.emailNormalized]);
    expect(email.sent[0]).toMatchObject({ channel: "email", tag: `notification.${AI_BUDGET_ALERT_TYPE}` });
    expect(email.sent[0]!.subject).toContain(payload.platformDate);
    expect(email.sent[0]!.text).toContain("US$75.50");

    // The job retries: only the failed email goes out; nobody gets a second notification.
    email.failFor.clear();
    email.sent = [];
    const result = await sendBudgetAlert(payload, { onlyUserIds: ids });
    expect(result).toEqual({ recipients: 3, emailed: 1, alreadyEmailed: 1, withoutEmail: 1, emailFailed: 0 });
    expect(email.sent.map((message) => message.to)).toEqual([b.user.emailNormalized]);

    const notifications = await db.notification.findMany({ where: { userId: { in: ids }, type: AI_BUDGET_ALERT_TYPE } });
    expect(notifications.map((n) => n.userId).sort()).toEqual([a.user.id, b.user.id, noEmail.user.id].sort());
    for (const notification of notifications) {
      expect(notification).toMatchObject({ category: "SYSTEM", title: "AI daily budget reached", dedupeKey: `ai.budget:${payload.platformDate}` });
      expect(notification.data).toMatchObject({ href: "/admin/ai/usage", platformDate: payload.platformDate });
    }
    const byUser = new Map(notifications.map((n) => [n.userId, n]));
    expect(byUser.get(a.user.id)!.channels).toEqual(["IN_APP", "EMAIL"]);
    expect(byUser.get(noEmail.user.id)!.channels).toEqual(["IN_APP"]);
    expect(byUser.get(b.user.id)!.deliveries).toMatchObject({ EMAIL: { status: "SENT" } });

    // A third run (e.g. a duplicate job) sends nothing.
    email.sent = [];
    expect(await sendBudgetAlert(payload, { onlyUserIds: ids })).toMatchObject({ emailed: 0, alreadyEmailed: 2 });
    expect(email.sent).toEqual([]);
  });

  it("is in-app only while email is switched off", async () => {
    flags.email = false;
    const admin = await createUser({ roles: ["SUPER_ADMIN"], emailVerified: true });
    const payload = { platformDate: randomDay(), spentMicros: 60_000_000, ceilingMicros: 50_000_000 };
    expect(await sendBudgetAlert(payload, { onlyUserIds: [admin.user.id] })).toMatchObject({ recipients: 1, emailed: 0, withoutEmail: 1 });
    expect(email.sent).toEqual([]);
    const notification = await db.notification.findFirstOrThrow({ where: { userId: admin.user.id, type: AI_BUDGET_ALERT_TYPE } });
    expect(notification.channels).toEqual(["IN_APP"]);
  });
});
