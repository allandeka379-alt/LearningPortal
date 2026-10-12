import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import type { PlanView } from "@/server/billing/plans";

/**
 * Owner decision 2026-10-07 (docs/ARCHITECTURE.md §3.14): while AI features are switched off, the public site makes no
 * AI claim. `/` and `/pricing` are rendered to HTML with plans whose entitlements DO include the AI tutor and solver
 * (the keys stay in the plans), and the HTML and page metadata are searched for any AI wording. Data loaders are
 * stubbed so the result never depends on what other test files put in the shared database.
 */

const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const AI_ENTITLEMENTS: Entitlements = {
  ...NO_ENTITLEMENTS,
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  dailyQuestion: true,
  mockExams: true,
  mockExamsPerMonth: null,
  diagnosticTest: true,
  aiTutor: true,
  aiMessagesPerDay: 50,
  aiSolverPerDay: null,
  aiImageUploads: true,
  aiMaxModelTier: "DEEP",
};

function plan(patch: Partial<PlanView>): PlanView {
  return {
    id: crypto.randomUUID(),
    code: "PLAN",
    name: "Plan",
    tagline: null,
    description: null,
    highlights: [],
    audience: "INDIVIDUAL",
    trialDays: 0,
    isDefault: false,
    isPublic: true,
    isActive: true,
    sortOrder: 0,
    entitlements: NO_ENTITLEMENTS,
    prices: [],
    ...patch,
  };
}

const PLANS: PlanView[] = [
  plan({ code: "FREE", name: "Free", isDefault: true, entitlements: { ...NO_ENTITLEMENTS, dailyQuestion: true, practiceQuestionsPerDay: 10, diagnosticTest: true, aiTutor: true, aiMessagesPerDay: 3 } }),
  plan({
    code: "FULL",
    name: "Full Access",
    sortOrder: 1,
    entitlements: AI_ENTITLEMENTS,
    prices: [
      { id: crypto.randomUUID(), currency: "USD", amountMinor: 100, interval: "ONE_OFF", intervalCount: 1, periodDays: null, perSeat: false, minSeats: null, label: null, countryId: null, validTo: null },
    ],
  }),
];

vi.mock("@/server/billing/plans", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/billing/plans")>()),
  listPublicPlans: async () => PLANS,
}));
vi.mock("@/server/marketing/catalogue", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/marketing/catalogue")>()),
  getMarketingCatalogue: async () => ({ boards: [], levels: [], subjectsByCategory: [], subjectsByQualification: [] }),
}));
vi.mock("@/server/marketing/learning", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/marketing/learning")>()),
  getMarketingForms: async () => [],
  getContentStats: async () => ({ subjects: 0, lessons: 0, questions: 0, flashcards: 0, tests: 0 }),
}));
vi.mock("@/server/marketing/testimonials", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/marketing/testimonials")>()),
  listPublishedTestimonials: async () => [],
}));
vi.mock("@/server/marketing/faq", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/marketing/faq")>()),
  listPublishedFaqs: async () => [],
}));

const { default: HomePage, generateMetadata: homeMetadata } = await import("./page");
const { default: PricingPage, generateMetadata: pricingMetadata } = await import("./pricing/page");

async function html(page: ReactElement | Promise<ReactElement>): Promise<string> {
  return renderToStaticMarkup(await page);
}

/** Every AI claim the site has ever made: "AI", "AI-powered", the tutor, the solver, photographing a question. */
const AI_CLAIM = /\bAI\b|AI-powered|tutor|solver|photograph a question/i;

function claims(text: string): string[] {
  return [...text.matchAll(new RegExp(AI_CLAIM.source, "gi"))].map((match) => text.slice(Math.max(0, (match.index ?? 0) - 40), (match.index ?? 0) + 40));
}

beforeEach(() => {
  featureFlags.ai = false;
});

describe("no AI claims while AI is switched off", () => {
  it("home page: no AI tutor section, hero and steps without AI, plan features without AI", async () => {
    const out = await html(HomePage());
    expect(out).toContain("Learn every topic. Be ready for every paper.");
    expect(out).toContain("Complete courses for Form 3 to Form 6, ZIMSEC and Cambridge, O-Level and A-Level: clear lessons in syllabus order, instantly marked practice, flashcards and timed mock exams.");
    expect(out).toContain("Full Access");
    expect(claims(out)).toEqual([]);
    const metadata = await homeMetadata();
    expect(claims(JSON.stringify(metadata))).toEqual([]);
  }, 60_000);

  it("pricing page: comparison and plan cards leave out the AI entitlements the plans still hold", async () => {
    const out = await html(PricingPage());
    expect(out).toContain("Full Access");
    expect(out).toContain("Mock exams");
    expect(claims(out)).toEqual([]);
    expect(claims(JSON.stringify(await pricingMetadata()))).toEqual([]);
  }, 60_000);

  it("switching AI back on restores the AI copy (the switch is reversible)", async () => {
    featureFlags.ai = true;
    const home = await html(HomePage());
    expect(home).toContain('id="ai-tutor"');
    expect(home).toContain("AI-powered tutoring");
    expect(await html(PricingPage())).toMatch(/AI tutor/);
  }, 60_000);
});
