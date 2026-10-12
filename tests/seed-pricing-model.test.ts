import { describe, expect, it, vi } from "vitest";
import type { PrismaClient } from "@/generated/prisma/client";
import { NO_ENTITLEMENTS, parseEntitlements } from "@/lib/billing/entitlements";
import { FREE, FULL_ACCESS, FULL_ACCESS_PLAN_CODE, PLANS, RETIRED_PLAN_CODES } from "../prisma/seed/data/platform";
import { applyNoFreeTier, applyOneOffPricingModel } from "../prisma/seed/platform";

/**
 * Seed data for the one-off pricing model (owner decision 2026-10-07) and the one-time move of an existing database.
 * The move is exercised against a stub client: it rewrites shared rows (FREE, retired plans, referral rules), which a
 * test must never do on the shared test database.
 */

describe("seeded plans", () => {
  it("FREE grants nothing (no free tier, 2026-10-12) and FULL_ACCESS unlocks every built, non-AI feature at USD 1.00, once, for good", () => {
    expect(parseEntitlements(FREE)).toEqual(NO_ENTITLEMENTS);
    const freePlan = PLANS.find((p) => p.code === "FREE");
    expect(freePlan).toMatchObject({ isPublic: false, devSamplePrices: [] });
    expect(freePlan?.oneOffPrice).toBeUndefined();

    const full = parseEntitlements(FULL_ACCESS);
    expect(full).toMatchObject({
      lessonAccess: "ALL",
      practiceQuestionsPerDay: null,
      dailyQuestion: true,
      diagnosticTest: true,
      examCountdown: true,
      leaderboards: true,
      topicTestsPerWeek: null,
      mockExams: true,
      mockExamsPerMonth: null,
      flashcards: true,
      studyPlan: true,
      advancedAnalytics: true,
      parentReports: true,
    });
    expect(full).toMatchObject({ aiTutor: false, aiMessagesPerDay: 0, aiSolverPerDay: 0, aiImageUploads: false });

    const plan = PLANS.find((p) => p.code === FULL_ACCESS_PLAN_CODE);
    expect(plan).toMatchObject({ audience: "INDIVIDUAL", isPublic: true, oneOffPrice: { currency: "USD", amountMinor: 100 } });
    expect(plan?.isActive ?? true).toBe(true);
  });

  it("the subscription plans are kept but retired (inactive, not public) and get no sample prices", () => {
    for (const code of RETIRED_PLAN_CODES) {
      expect(PLANS.find((p) => p.code === code)).toMatchObject({ isActive: false, isPublic: false, devSamplePrices: [] });
    }
    expect(PLANS.filter((p) => p.isPublic).map((p) => p.code)).toEqual([FULL_ACCESS_PLAN_CODE]);
  });
});

describe("applyOneOffPricingModel", () => {
  it("retires the old plans, resets FREE to its seeded copy and points referral rewards at Full access", async () => {
    const planUpdates: unknown[] = [];
    const settingUpdates: unknown[] = [];
    const client = {
      plan: {
        updateMany: vi.fn(async (args: unknown) => {
          planUpdates.push(args);
          return { count: 3 };
        }),
      },
      setting: {
        findUnique: vi.fn(async () => ({ value: { enabled: true, reward: { planCode: "STUDENT", days: 7 }, refereeReward: { planCode: "PREMIUM", days: 3 } } })),
        update: vi.fn(async (args: unknown) => {
          settingUpdates.push(args);
          return {};
        }),
      },
    } as unknown as PrismaClient;
    const log = { info: vi.fn(), warn: vi.fn() };

    await applyOneOffPricingModel(client, log);

    expect(planUpdates[0]).toEqual({
      where: { code: { in: [...RETIRED_PLAN_CODES] }, isDefault: false, OR: [{ isActive: true }, { isPublic: true }] },
      data: { isActive: false, isPublic: false },
    });
    expect(planUpdates[1]).toMatchObject({ where: { code: "FREE" }, data: { name: "No access", entitlements: NO_ENTITLEMENTS } });
    expect(settingUpdates).toEqual([
      {
        where: { key: "referrals.rules" },
        data: { value: { enabled: true, reward: { planCode: FULL_ACCESS_PLAN_CODE, days: 7 }, refereeReward: { planCode: FULL_ACCESS_PLAN_CODE, days: 3 } } },
      },
    ]);
  });
});

describe("applyNoFreeTier", () => {
  const seeded = PLANS.find((p) => p.code === "FREE");
  const oldFreePreview = {
    id: "plan-free",
    name: "Free preview",
    tagline: "Try it before you pay",
    description: "The free lessons of every topic, a daily question, the diagnostic test, the exam countdown and some practice every day.",
    isPublic: true,
    entitlements: { ...NO_ENTITLEMENTS, practiceQuestionsPerDay: 15, dailyQuestion: true, diagnosticTest: true, topicTestsPerWeek: 2, examCountdown: true, leaderboards: true },
  };

  function stub(row: unknown) {
    const updates: unknown[] = [];
    const client = {
      plan: {
        findUnique: vi.fn(async () => row),
        update: vi.fn(async (args: unknown) => {
          updates.push(args);
          return {};
        }),
      },
    } as unknown as PrismaClient;
    return { client, updates };
  }

  it("turns an existing (production) free preview into the hidden, empty default plan", async () => {
    const { client, updates } = stub(oldFreePreview);
    const log = { info: vi.fn(), warn: vi.fn() };
    expect(await applyNoFreeTier(client, log)).toBe(true);
    expect(updates).toEqual([
      {
        where: { id: "plan-free" },
        data: { name: seeded?.name, tagline: seeded?.tagline ?? null, description: seeded?.description, highlights: [], isPublic: false, entitlements: NO_ENTITLEMENTS },
      },
    ]);
  });

  it("is idempotent: an already-applied database is not written again", async () => {
    const { client, updates } = stub({
      id: "plan-free",
      name: seeded?.name,
      tagline: seeded?.tagline ?? null,
      description: seeded?.description,
      isPublic: false,
      entitlements: { ...NO_ENTITLEMENTS },
    });
    expect(await applyNoFreeTier(client, { info: vi.fn(), warn: vi.fn() })).toBe(false);
    expect(updates).toEqual([]);
  });

  it("does nothing on a database without a FREE plan", async () => {
    const { client, updates } = stub(null);
    expect(await applyNoFreeTier(client, { info: vi.fn(), warn: vi.fn() })).toBe(false);
    expect(updates).toEqual([]);
  });
});
