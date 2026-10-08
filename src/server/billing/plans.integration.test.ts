import { beforeEach, describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { uniqueCode } from "../../../tests/factories/index";
import { getCheckoutPrice, getPlanByCode, invalidatePlanCache, listPublicPlans } from "./plans";

const DAY = 86_400_000;

async function plan(options: { isPublic?: boolean; isActive?: boolean; audience?: "INDIVIDUAL" | "SCHOOL"; sortOrder?: number } = {}) {
  const code = uniqueCode("T");
  return db.plan.create({
    data: {
      code,
      name: `Plan ${code}`,
      audience: options.audience ?? "INDIVIDUAL",
      isPublic: options.isPublic ?? true,
      isActive: options.isActive ?? true,
      sortOrder: options.sortOrder ?? 0,
      highlights: ["Unlimited practice"],
      entitlements: { ...NO_ENTITLEMENTS, mockExams: true },
    },
    select: { id: true, code: true },
  });
}

beforeEach(() => {
  invalidatePlanCache();
});

describe("listPublicPlans", () => {
  it("lists public active plans with current prices; a plan without a price has prices: []", async () => {
    const priced = await plan({ sortOrder: 1 });
    const unpriced = await plan({ sortOrder: 2 });
    const hidden = await plan({ isPublic: false });
    const retired = await plan({ isActive: false });
    const now = Date.now();
    await db.planPrice.createMany({
      data: [
        { planId: priced.id, currency: "USD", amountMinor: 500, interval: "MONTH" },
        { planId: priced.id, currency: "USD", amountMinor: 4800, interval: "YEAR" },
        { planId: priced.id, currency: "ZWG", amountMinor: 13_000, interval: "MONTH" },
        { planId: priced.id, currency: "USD", amountMinor: 450, interval: "MONTH", isActive: false },
        { planId: priced.id, currency: "USD", amountMinor: 400, interval: "WEEK", validFrom: new Date(now + 10 * DAY) },
        { planId: priced.id, currency: "USD", amountMinor: 350, interval: "WEEK", validFrom: new Date(now - 10 * DAY), validTo: new Date(now - DAY) },
        { planId: hidden.id, currency: "USD", amountMinor: 100, interval: "MONTH" },
      ],
    });

    const plans = await listPublicPlans("usd");
    const codes = plans.map((p) => p.code);
    expect(codes).toEqual(expect.arrayContaining([priced.code, unpriced.code]));
    expect(codes).not.toContain(hidden.code);
    expect(codes).not.toContain(retired.code);

    const pricedView = plans.find((p) => p.code === priced.code)!;
    expect(pricedView.prices.map((p) => [p.interval, p.amountMinor, p.currency])).toEqual([
      ["MONTH", 500, "USD"],
      ["YEAR", 4800, "USD"],
    ]);
    expect(pricedView.entitlements.mockExams).toBe(true);
    expect(pricedView.highlights).toEqual(["Unlimited practice"]);
    expect(plans.find((p) => p.code === unpriced.code)!.prices).toEqual([]);

    const zwg = (await listPublicPlans("ZWG")).find((p) => p.code === priced.code)!;
    expect(zwg.prices.map((p) => p.amountMinor)).toEqual([13_000]);
    const all = (await listPublicPlans()).find((p) => p.code === priced.code)!;
    expect(all.prices).toHaveLength(3);
  });

  it("filters by audience and validates the currency", async () => {
    const schoolPlan = await plan({ audience: "SCHOOL" });
    const schools = await listPublicPlans(undefined, { audience: "SCHOOL" });
    expect(schools.map((p) => p.code)).toContain(schoolPlan.code);
    expect(schools.every((p) => p.audience === "SCHOOL")).toBe(true);
    const error = await listPublicPlans("dollars").catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("VALIDATION");
  });
});

describe("getPlanByCode", () => {
  it("finds non-public plans case-insensitively and hides retired ones unless asked", async () => {
    const hidden = await plan({ isPublic: false });
    const retired = await plan({ isActive: false });
    await expect(getPlanByCode(hidden.code.toLowerCase())).resolves.toMatchObject({ code: hidden.code, isPublic: false, prices: [] });
    await expect(getPlanByCode(retired.code)).resolves.toBeNull();
    await expect(getPlanByCode(retired.code, { includeInactive: true })).resolves.toMatchObject({ code: retired.code });
    await expect(getPlanByCode("no such plan!")).resolves.toBeNull();
  });
});

describe("getCheckoutPrice", () => {
  it("returns a purchasable price with its plan and refuses stale ones", async () => {
    const p = await plan();
    const current = await db.planPrice.create({ data: { planId: p.id, currency: "USD", amountMinor: 500, interval: "MONTH" }, select: { id: true } });
    const stale = await db.planPrice.create({
      data: { planId: p.id, currency: "USD", amountMinor: 450, interval: "MONTH", isActive: false },
      select: { id: true },
    });
    await expect(getCheckoutPrice(current.id)).resolves.toMatchObject({
      price: { id: current.id, amountMinor: 500, currency: "USD", interval: "MONTH" },
      plan: { id: p.id, code: p.code, audience: "INDIVIDUAL" },
      studyPackId: null,
    });
    const error = await getCheckoutPrice(stale.id).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("NOT_FOUND");
  });
});
