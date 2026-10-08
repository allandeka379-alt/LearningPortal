import { describe, expect, it, vi } from "vitest";
import type { PrismaClient } from "@/generated/prisma/client";
import { parseEntitlements } from "@/lib/billing/entitlements";
import { FREE, FULL_ACCESS, FULL_ACCESS_PLAN_CODE, PLANS, RETIRED_PLAN_CODES } from "../prisma/seed/data/platform";
import { applyOneOffPricingModel } from "../prisma/seed/platform";

/**
 * Seed data for the one-off pricing model (owner decision 2026-10-07) and the one-time move of an existing database.
 * The move is exercised against a stub client: it rewrites shared rows (FREE, retired plans, referral rules), which a
 * test must never do on the shared test database.
 */

describe("seeded plans", () => {
  it("FREE is a real preview and FULL_ACCESS unlocks every built, non-AI feature at USD 1.00, once, for good", () => {
    const free = parseEntitlements(FREE);
    expect(free).toMatchObject({ lessonAccess: "FREE_ONLY", dailyQuestion: true, diagnosticTest: true, examCountdown: true, practiceQuestionsPerDay: 15, topicTestsPerWeek: 2 });
    expect(free).toMatchObject({ mockExams: false, flashcards: false, studyPlan: false, aiTutor: false, aiMessagesPerDay: 0, aiSolverPerDay: 0 });

    const full = parseEntitlements(FULL_ACCESS);
    expect(full).toMatchObject({
      lessonAccess: "ALL",
      practiceQuestionsPerDay: null,
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
    expect(PLANS.filter((p) => p.isPublic).map((p) => p.code)).toEqual(["FREE", FULL_ACCESS_PLAN_CODE]);
  });
});

describe("applyOneOffPricingModel", () => {
  it("retires the old plans, makes FREE the free preview and points referral rewards at Full access", async () => {
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
    expect(planUpdates[1]).toMatchObject({ where: { code: "FREE" }, data: { name: "Free preview", entitlements: parseEntitlements(FREE) } });
    expect(settingUpdates).toEqual([
      {
        where: { key: "referrals.rules" },
        data: { value: { enabled: true, reward: { planCode: FULL_ACCESS_PLAN_CODE, days: 7 }, refereeReward: { planCode: FULL_ACCESS_PLAN_CODE, days: 3 } } },
      },
    ]);
  });
});
