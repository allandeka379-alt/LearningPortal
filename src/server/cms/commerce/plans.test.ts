import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { PlanAudience, Role } from "@/generated/prisma/client";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import {
  createPlanPrice,
  getPlanForAdmin,
  listPlanOptions,
  listPlansForAdmin,
  priceState,
  sameTerms,
  setPlanPriceActive,
  updatePlanDetails,
  updatePlanEntitlements,
  windowsOverlap,
} from "./plans";

/**
 * Plans & prices admin against Postgres (shared test DB; unique non-public plans per test, never the default plan).
 * The PlanPrice_immutable trigger is exercised directly to show why prices are never edited in place.
 */

async function actorWith(roles: Role[]): Promise<CmsActor> {
  const { user } = await createUser({ roles: roles as Exclude<Role, "SCHOOL_ADMIN">[] });
  return { kind: "user", userId: user.id, roles };
}

async function createPlan(audience: PlanAudience = "INDIVIDUAL") {
  const code = `P${randomUUID().replace(/-/g, "").slice(0, 14).toUpperCase()}`;
  return db.plan.create({
    data: { code, name: `Plan ${code}`, audience, isPublic: false, entitlements: { ...NO_ENTITLEMENTS, dailyQuestion: true } },
    select: { id: true, code: true, updatedAt: true },
  });
}

const HOUR = 3_600_000;

describe("pure price helpers", () => {
  const now = new Date("2026-10-05T10:00:00Z");
  it("derives the price state", () => {
    expect(priceState({ isActive: false, validFrom: now, validTo: null }, now)).toBe("inactive");
    expect(priceState({ isActive: true, validFrom: new Date(now.getTime() + HOUR), validTo: null }, now)).toBe("scheduled");
    expect(priceState({ isActive: true, validFrom: new Date(now.getTime() - 2 * HOUR), validTo: new Date(now.getTime() - HOUR) }, now)).toBe("ended");
    expect(priceState({ isActive: true, validFrom: new Date(now.getTime() - HOUR), validTo: null }, now)).toBe("current");
  });

  it("compares terms and windows", () => {
    const base = { currency: "USD", interval: "MONTH" as const, intervalCount: 1, periodDays: null, perSeat: false, countryId: null };
    expect(sameTerms(base, { ...base })).toBe(true);
    expect(sameTerms(base, { ...base, currency: "ZWG" })).toBe(false);
    expect(sameTerms(base, { ...base, intervalCount: 3 })).toBe(false);
    const t = (h: number) => new Date(now.getTime() + h * HOUR);
    expect(windowsOverlap(t(0), null, t(5), null)).toBe(true);
    expect(windowsOverlap(t(0), t(5), t(5), null)).toBe(false);
    expect(windowsOverlap(t(0), t(6), t(5), t(7))).toBe(true);
  });
});

describe("permissions", () => {
  it("is ADMIN / SUPER_ADMIN only: editors, school staff and students are refused", async () => {
    const plan = await createPlan();
    for (const roles of [["CONTENT_EDITOR"], ["STUDENT"], ["TEACHER"]] as Role[][]) {
      const actor = await actorWith(roles);
      await expect(listPlansForAdmin(actor)).rejects.toMatchObject({ code: "FORBIDDEN" });
      await expect(
        createPlanPrice(actor, { planId: plan.id, currency: "USD", amount: "5", interval: "MONTH" }),
      ).rejects.toMatchObject({ code: "FORBIDDEN" });
    }
    const schoolAdmin: CmsActor = { kind: "user", userId: (await createUser()).user.id, roles: ["SCHOOL_ADMIN"] };
    await expect(listPlanOptions(schoolAdmin)).rejects.toMatchObject({ code: "FORBIDDEN" });
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    // Filter by this test's own plan (the table keeps every run's plans).
    const listed = await listPlansForAdmin(superAdmin, undefined, { q: plan.code });
    expect(listed.map((item) => item.id)).toEqual([plan.id]);
  });
});

describe("plan details and entitlements", () => {
  it("edits details with an optimistic-concurrency token and audits only the changed fields", async () => {
    const actor = await actorWith(["ADMIN"]);
    const plan = await createPlan();
    const result = await updatePlanDetails(actor, {
      planId: plan.id,
      expectedUpdatedAt: plan.updatedAt.toISOString(),
      name: "Exam season",
      tagline: "Everything before November",
      description: "",
      highlights: "Mock exams\n\nUnlimited practice\n",
      isPublic: false,
      isActive: true,
      sortOrder: "7",
      trialDays: "0",
    });
    expect(result.changed.sort()).toEqual(["highlights", "name", "sortOrder", "tagline"]);
    const row = await db.plan.findUniqueOrThrow({ where: { id: plan.id } });
    expect(row).toMatchObject({ name: "Exam season", tagline: "Everything before November", highlights: ["Mock exams", "Unlimited practice"], sortOrder: 7 });

    // The old token is stale now.
    await expect(
      updatePlanDetails(actor, { planId: plan.id, expectedUpdatedAt: plan.updatedAt.toISOString(), name: "Other", isPublic: false, isActive: true, sortOrder: 0, trialDays: 0 }),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    // Nothing changed → no audit row and no error.
    const same = await updatePlanDetails(actor, {
      planId: plan.id,
      expectedUpdatedAt: result.updatedAt.toISOString(),
      name: "Exam season",
      tagline: "Everything before November",
      highlights: ["Mock exams", "Unlimited practice"],
      isPublic: false,
      isActive: true,
      sortOrder: 7,
      trialDays: 0,
    });
    expect(same.changed).toEqual([]);
    const audits = await db.auditLog.findMany({ where: { entityType: "Plan", entityId: plan.id } });
    expect(audits).toHaveLength(1);
    expect(audits[0]).toMatchObject({ action: "plan.update", actorUserId: actor.userId });
    expect(audits[0]?.metadata).toMatchObject({ operation: "plan.update", planCode: plan.code });

    await expect(
      updatePlanDetails(actor, { planId: plan.id, expectedUpdatedAt: result.updatedAt.toISOString(), name: "X", isPublic: false, isActive: true, sortOrder: 0, trialDays: -1 }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { name: expect.any(Array), trialDays: expect.any(Array) } });
  });

  it("replaces the entitlements document after validation and audits the changed keys", async () => {
    const actor = await actorWith(["ADMIN"]);
    const plan = await createPlan();
    const next = { ...NO_ENTITLEMENTS, dailyQuestion: true, mockExams: true, mockExamsPerMonth: 4, aiTutor: true, aiMessagesPerDay: null, aiMaxModelTier: "STANDARD" as const };
    const result = await updatePlanEntitlements(actor, { planId: plan.id, expectedUpdatedAt: plan.updatedAt.toISOString(), entitlements: next });
    expect(result.changed).toEqual(["mockExams", "mockExamsPerMonth", "aiTutor", "aiMessagesPerDay", "aiMaxModelTier"]);
    const stored = await db.plan.findUniqueOrThrow({ where: { id: plan.id }, select: { entitlements: true } });
    expect(stored.entitlements).toEqual(next);
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Plan", entityId: plan.id } });
    expect(audit.before).toMatchObject({ mockExams: false, aiMessagesPerDay: 0 });
    expect(audit.after).toMatchObject({ mockExams: true, aiMessagesPerDay: null });
    expect(audit.metadata).toMatchObject({ operation: "plan.entitlements.update" });

    // Unknown keys and invalid limits are refused; a stale token conflicts.
    await expect(
      updatePlanEntitlements(actor, { planId: plan.id, expectedUpdatedAt: result.updatedAt.toISOString(), entitlements: { ...next, surprise: true } as never }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(
      updatePlanEntitlements(actor, { planId: plan.id, expectedUpdatedAt: result.updatedAt.toISOString(), entitlements: { ...next, aiSolverPerDay: -2 } }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { "entitlements.aiSolverPerDay": expect.any(Array) } });
    await expect(
      updatePlanEntitlements(actor, { planId: plan.id, expectedUpdatedAt: plan.updatedAt.toISOString(), entitlements: next }),
    ).rejects.toMatchObject({ code: "CONFLICT" });
  });
});

describe("prices are rows, never edited in place", () => {
  it("adds prices, refuses competing terms and replaces an old price now or on a schedule", async () => {
    const actor = await actorWith(["ADMIN"]);
    const plan = await createPlan();
    const now = new Date();

    const first = await createPlanPrice(actor, { planId: plan.id, currency: "usd", amount: "5.00", interval: "MONTH", label: "Launch price" }, null, now);
    // Same terms, overlapping → refused with a pointer to "Replaces".
    await expect(createPlanPrice(actor, { planId: plan.id, currency: "USD", amount: "6", interval: "MONTH" }, null, now)).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { replacesPriceId: expect.any(Array) },
    });
    // Different currency is fine (ZiG prices are set separately, never converted).
    const zig = await createPlanPrice(actor, { planId: plan.id, currency: "ZWG", amount: "150", interval: "MONTH" }, null, now);
    expect(zig.replacedPriceId).toBeNull();

    // Immediate replacement deactivates the old row; the old row keeps its amount (history is exact).
    const second = await createPlanPrice(actor, { planId: plan.id, currency: "USD", amount: "6", interval: "MONTH", replacesPriceId: first.id }, null, now);
    expect(second.replacedPriceId).toBe(first.id);
    const old = await db.planPrice.findUniqueOrThrow({ where: { id: first.id } });
    expect(old).toMatchObject({ isActive: false, amountMinor: 500, label: "Launch price" });

    // Scheduled replacement: the current price ends exactly when the new one starts.
    const startsAt = new Date(now.getTime() + 48 * HOUR);
    const local = new Date(startsAt.getTime() + 2 * HOUR).toISOString().slice(0, 16); // Africa/Harare wall clock (UTC+2)
    const third = await createPlanPrice(actor, { planId: plan.id, currency: "USD", amount: "7", interval: "MONTH", validFrom: local, replacesPriceId: second.id }, null, now);
    const [secondRow, thirdRow] = await Promise.all([
      db.planPrice.findUniqueOrThrow({ where: { id: second.id } }),
      db.planPrice.findUniqueOrThrow({ where: { id: third.id } }),
    ]);
    expect(secondRow.isActive).toBe(true);
    expect(secondRow.validTo?.getTime()).toBe(thirdRow.validFrom.getTime());
    expect(Math.abs(thirdRow.validFrom.getTime() - startsAt.getTime())).toBeLessThan(60_000);

    const detail = await getPlanForAdmin(actor, plan.id, now);
    const states = Object.fromEntries(detail.prices.map((price) => [price.id, price.state]));
    expect(states).toMatchObject({ [first.id]: "inactive", [second.id]: "current", [third.id]: "scheduled", [zig.id]: "current" });

    const audits = await db.auditLog.findMany({ where: { entityType: "PlanPrice", entityId: { in: [first.id, second.id, third.id, zig.id] } } });
    const operations = audits.map((entry) => (entry.metadata as { operation: string }).operation).sort();
    expect(operations).toEqual(["plan_price.create", "plan_price.create", "plan_price.create", "plan_price.create", "plan_price.replace", "plan_price.replace"]);
    expect(audits.every((entry) => entry.actorUserId === actor.userId)).toBe(true);
    expect(audits.map((entry) => `${entry.action}:${(entry.metadata as { operation: string }).operation}`).sort()).toEqual([
      "plan_price.create:plan_price.create",
      "plan_price.create:plan_price.create",
      "plan_price.create:plan_price.create",
      "plan_price.create:plan_price.create",
      "plan_price.update:plan_price.replace",
      "plan_price.update:plan_price.replace",
    ]);

    // The database itself refuses an in-place amount edit.
    await expect(db.planPrice.update({ where: { id: second.id }, data: { amountMinor: 1 } })).rejects.toThrow();
  });

  it("validates interval data, seats, amounts and start times", async () => {
    const actor = await actorWith(["ADMIN"]);
    const individual = await createPlan("INDIVIDUAL");
    const school = await createPlan("SCHOOL");
    await expect(createPlanPrice(actor, { planId: individual.id, currency: "USD", amount: "10", interval: "TERM" })).rejects.toMatchObject({
      fieldErrors: { periodDays: expect.any(Array) },
    });
    await expect(createPlanPrice(actor, { planId: individual.id, currency: "USD", amount: "0", interval: "MONTH" })).rejects.toMatchObject({
      fieldErrors: { amount: expect.any(Array) },
    });
    await expect(createPlanPrice(actor, { planId: individual.id, currency: "USD", amount: "2", interval: "MONTH", perSeat: true })).rejects.toMatchObject({
      fieldErrors: { perSeat: expect.any(Array) },
    });
    await expect(createPlanPrice(actor, { planId: individual.id, currency: "USD", amount: "2", interval: "MONTH", minSeats: "5" })).rejects.toMatchObject({
      fieldErrors: { minSeats: expect.any(Array) },
    });
    await expect(
      createPlanPrice(actor, { planId: individual.id, currency: "USD", amount: "2", interval: "MONTH", validFrom: "2020-01-01T08:00" }),
    ).rejects.toMatchObject({ fieldErrors: { validFrom: expect.any(Array) } });
    await expect(createPlanPrice(actor, { planId: randomUUID(), currency: "USD", amount: "2", interval: "MONTH" })).rejects.toMatchObject({ code: "NOT_FOUND" });

    const seat = await createPlanPrice(actor, { planId: school.id, currency: "USD", amount: "3", interval: "TERM", periodDays: "120", perSeat: true, minSeats: "20" });
    expect(await db.planPrice.findUniqueOrThrow({ where: { id: seat.id } })).toMatchObject({ perSeat: true, minSeats: 20, periodDays: 120, amountMinor: 300 });
  });

  it("toggles a price on and off sale, refusing to re-activate over a competing price", async () => {
    const actor = await actorWith(["SUPER_ADMIN"]);
    const plan = await createPlan();
    const a = await createPlanPrice(actor, { planId: plan.id, currency: "USD", amount: "4", interval: "WEEK" });
    expect(await setPlanPriceActive(actor, { priceId: a.id, active: false, reason: "Ending the weekly offer" })).toEqual({ changed: true, isActive: false });
    expect(await setPlanPriceActive(actor, { priceId: a.id, active: false })).toEqual({ changed: false, isActive: false });
    const b = await createPlanPrice(actor, { planId: plan.id, currency: "USD", amount: "5", interval: "WEEK" });
    await expect(setPlanPriceActive(actor, { priceId: a.id, active: true })).rejects.toMatchObject({ code: "CONFLICT" });
    await setPlanPriceActive(actor, { priceId: b.id, active: false });
    expect(await setPlanPriceActive(actor, { priceId: a.id, active: true })).toEqual({ changed: true, isActive: true });
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "PlanPrice", entityId: a.id, reason: "Ending the weekly offer" } });
    expect(audit.metadata).toMatchObject({ operation: "plan_price.deactivate", planId: plan.id });
  });
});
