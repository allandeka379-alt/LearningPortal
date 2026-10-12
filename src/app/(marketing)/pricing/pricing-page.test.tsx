import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import type { PlanPriceView, PlanView } from "@/server/billing/plans";

/**
 * /pricing for the one-off model (owner decision 2026-10-07): the free preview next to "Full access" with the price the
 * DATABASE holds (the catalogue read is mocked here so the shared test database's public plans do not matter), USD
 * only, Paynow only, and a sign-up link that continues to the one-off checkout.
 */

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/pricing",
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

const catalogue = vi.hoisted(() => ({ plans: [] as PlanView[] }));
vi.mock("@/server/billing/plans", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/billing/plans")>()),
  listPublicPlans: vi.fn(async () => catalogue.plans),
}));
vi.mock("@/server/marketing/faq", () => ({ listPublishedFaqs: vi.fn(async () => []) }));
// Demo-price flag lookup (no demo prices here).
vi.mock("@/server/db", () => ({ db: { planPrice: { count: vi.fn(async () => 0) } } }));

import PricingPage from "./page";

function price(patch: Partial<PlanPriceView> = {}): PlanPriceView {
  return {
    id: "0190d000-0000-7000-8000-00000000f001",
    currency: "USD",
    amountMinor: 100,
    interval: "ONE_OFF",
    intervalCount: 1,
    periodDays: null,
    perSeat: false,
    minSeats: null,
    label: null,
    countryId: null,
    validTo: null,
    ...patch,
  };
}

function plan(patch: Partial<PlanView>): PlanView {
  return {
    id: "0190d000-0000-7000-8000-00000000a001",
    code: "FREE",
    name: "Free preview",
    tagline: null,
    description: null,
    highlights: [],
    audience: "INDIVIDUAL",
    trialDays: 0,
    isDefault: false,
    isPublic: true,
    isActive: true,
    sortOrder: 1,
    entitlements: { ...NO_ENTITLEMENTS },
    prices: [],
    ...patch,
  };
}

const FREE = plan({
  isDefault: true,
  entitlements: { ...NO_ENTITLEMENTS, practiceQuestionsPerDay: 15, dailyQuestion: true, diagnosticTest: true, topicTestsPerWeek: 2, examCountdown: true },
});

function fullAccess(amountMinor: number): PlanView {
  return plan({
    id: "0190d000-0000-7000-8000-00000000a002",
    code: "FULL_ACCESS",
    name: "Full access",
    tagline: "Pay once, keep it",
    sortOrder: 2,
    entitlements: {
      ...NO_ENTITLEMENTS,
      lessonAccess: "ALL",
      practiceQuestionsPerDay: null,
      dailyQuestion: true,
      diagnosticTest: true,
      topicTestsPerWeek: null,
      mockExams: true,
      mockExamsPerMonth: null,
      flashcards: true,
      studyPlan: true,
      examCountdown: true,
      advancedAnalytics: true,
      parentReports: true,
    },
    // A ZWG row exists in the database but is not offered for now.
    prices: [price({ amountMinor }), price({ id: "0190d000-0000-7000-8000-00000000f002", currency: "ZWG", amountMinor: 2_600 })],
  });
}

async function html(page: ReactElement | Promise<ReactElement>): Promise<string> {
  return renderToStaticMarkup(await page);
}

beforeEach(() => {
  featureFlags.ai = false;
});

describe("/pricing (one-off Full access)", () => {
  it("shows Full access at the database price, no free tier: pay once, keep it, through Paynow", async () => {
    catalogue.plans = [FREE, fullAccess(100)];
    const out = await html(PricingPage());

    expect(out).toContain("Everything for US$1. Pay once, keep it.");
    expect(out).toContain("Get full access for US$1");
    expect(out).toContain("Paynow");
    expect(out).toContain("EcoCash");
    expect(out).not.toMatch(/free preview|start free|free plan/i);
    // Sign-up first; the paywall then takes the new student to the one-off checkout.
    expect(out).toContain('href="/register"');
    // USD only (ZWG rows hidden), no Stripe, no AI claims while AI is off.
    expect(out).not.toMatch(/ZWG|ZiG|Zimbabwe Gold/);
    expect(out).not.toMatch(/Stripe/i);
    expect(out).not.toMatch(/AI tutor/);
  });

  it("follows an admin price change (never a hard-coded amount)", async () => {
    catalogue.plans = [FREE, fullAccess(250)];
    const out = await html(PricingPage());
    expect(out).toContain("Everything for US$2.50. Pay once, keep it.");
    expect(out).not.toContain("US$1.");
  });

  it("says so honestly when nothing is on sale", async () => {
    catalogue.plans = [FREE, { ...fullAccess(100), prices: [] }];
    const out = await html(PricingPage());
    expect(out).toContain("Pricing");
    expect(out).toContain("Pricing coming soon");
    expect(out).not.toContain("Paynow");
  });
});
