import { describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import type { AppliedEntitlementSource } from "@/server/billing/entitlements";
import type { PlanPriceView, PlanView } from "@/server/billing/plans";
import { describeAccessSources, planOffers, purchasablePrices } from "./overview";

const STUDENT = "11111111-1111-4111-8111-111111111111";
const PARENT = "22222222-2222-4222-8222-222222222222";
const SUB = "33333333-3333-4333-8333-333333333333";
const END = new Date("2026-11-06T00:00:00Z");

function source(overrides: Partial<AppliedEntitlementSource>): AppliedEntitlementSource {
  return { kind: "FREE_PLAN", id: null, planCode: null, grantSource: null, endsAt: null, scoped: false, ...overrides };
}

function price(overrides: Partial<PlanPriceView> = {}): PlanPriceView {
  return {
    id: "price",
    currency: "USD",
    amountMinor: 500,
    interval: "MONTH",
    intervalCount: 1,
    periodDays: null,
    perSeat: false,
    minSeats: null,
    label: null,
    countryId: null,
    validTo: null,
    ...overrides,
  };
}

function plan(overrides: Partial<PlanView> = {}): PlanView {
  return {
    id: "plan",
    code: "STUDENT",
    name: "Student",
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
    prices: [price()],
    ...overrides,
  };
}

const NAMES = new Map([
  ["STUDENT", "Student"],
  ["SCHOOL", "School"],
  ["FREE", "Free"],
]);

describe("describeAccessSources", () => {
  it("labels own, parent-paid, school, grant and free sources, own first, and leaves out scoped (study pack) grants", () => {
    const views = describeAccessSources({
      userId: STUDENT,
      ownSubscription: { id: SUB, payerUserId: null },
      planNames: NAMES,
      sources: [
        source({ kind: "FREE_PLAN", planCode: "FREE" }),
        source({ kind: "GRANT", id: "g1", grantSource: "REFERRAL", endsAt: END }),
        source({ kind: "GRANT", id: "g2", grantSource: "STUDY_PACK", scoped: true }),
        source({ kind: "SCHOOL_SUBSCRIPTION", id: "s2", planCode: "SCHOOL" }),
        source({ kind: "SUBSCRIPTION", id: SUB, planCode: "STUDENT", endsAt: END }),
      ],
    });
    expect(views.map((view) => [view.kind, view.label, view.planName])).toEqual([
      ["OWN", "Your subscription", "Student"],
      ["SCHOOL", "Through your school", "School"],
      ["GRANT", "Referral reward", null],
      ["FREE", "Default plan", "Free"],
    ]);
    expect(views[0]?.endsAt).toEqual(END);
  });

  it("says when a parent or guardian pays for the student's plan", () => {
    const [view] = describeAccessSources({
      userId: STUDENT,
      ownSubscription: { id: SUB, payerUserId: PARENT },
      planNames: NAMES,
      sources: [source({ kind: "SUBSCRIPTION", id: SUB, planCode: "STUDENT" })],
    });
    expect(view).toMatchObject({ kind: "PARENT", label: "Paid by your parent or guardian" });
  });

  it("a subscription the student paid for themselves is theirs", () => {
    const [view] = describeAccessSources({
      userId: STUDENT,
      ownSubscription: { id: SUB, payerUserId: STUDENT },
      planNames: NAMES,
      sources: [source({ kind: "SUBSCRIPTION", id: SUB, planCode: "UNKNOWN" })],
    });
    expect(view).toMatchObject({ kind: "OWN", planName: null });
  });

  it("shows the paid period end, not the grace-extended access end, until the period is over", () => {
    const paidUntil = new Date("2026-11-06T06:00:00Z");
    const accessEnd = new Date("2026-11-09T06:00:00Z");
    const endsAtOn = (now: Date) =>
      describeAccessSources({
        userId: STUDENT,
        ownSubscription: { id: SUB, payerUserId: STUDENT, currentPeriodEnd: paidUntil },
        planNames: NAMES,
        now,
        sources: [source({ kind: "SUBSCRIPTION", id: SUB, planCode: "STUDENT", endsAt: accessEnd })],
      })[0]?.endsAt;
    expect(endsAtOn(new Date("2026-10-06T00:00:00Z"))).toEqual(paidUntil);
    // In the grace window the access end is the date that still applies.
    expect(endsAtOn(new Date("2026-11-07T00:00:00Z"))).toEqual(accessEnd);
  });
});

describe("purchasablePrices", () => {
  it("keeps paid individual prices in an offered currency (USD), with only ids and display fields", () => {
    const options = purchasablePrices([
      price({ id: "monthly" }),
      price({ id: "free", amountMinor: 0 }),
      price({ id: "seat", perSeat: true }),
      price({ id: "pass-90", interval: "ONE_OFF", periodDays: 90, label: "Exam season" }),
      price({ id: "zwg", interval: "ONE_OFF", periodDays: 90, currency: "ZWG", amountMinor: 13_000 }),
    ]);
    expect(options).toEqual([
      { planPriceId: "monthly", currency: "USD", amountMinor: 500, interval: "MONTH", intervalCount: 1, periodDays: null, label: null },
      { planPriceId: "pass-90", currency: "USD", amountMinor: 500, interval: "ONE_OFF", intervalCount: 1, periodDays: 90, label: "Exam season" },
    ]);
  });

  it("a one-off price without an end date (lifetime Full access, or a pack kept for good) can be bought", () => {
    const options = purchasablePrices([price({ id: "lifetime", interval: "ONE_OFF", periodDays: null, amountMinor: 100 })]);
    expect(options.map((option) => option.planPriceId)).toEqual(["lifetime"]);
  });
});

describe("planOffers", () => {
  it("lists active individual plans, marks the current and free ones, and never invents a price", () => {
    const offers = planOffers(
      [
        plan({ id: "free", code: "FREE", name: "Free", isDefault: true, prices: [] }),
        plan({ id: "student", code: "STUDENT" }),
        plan({ id: "unpriced", code: "PLUS", name: "Plus", prices: [] }),
        plan({ id: "school", code: "SCHOOL", audience: "SCHOOL" }),
        plan({ id: "old", code: "OLD", isActive: false }),
      ],
      "STUDENT",
    );
    expect(offers.map((offer) => [offer.id, offer.current, offer.isFree, offer.prices.length])).toEqual([
      ["free", false, true, 0],
      ["student", true, false, 1],
      ["unpriced", false, false, 0],
    ]);
  });

  it("a plan whose only prices are zero is free", () => {
    const [offer] = planOffers([plan({ prices: [price({ amountMinor: 0 })] })], null);
    expect(offer?.isFree).toBe(true);
  });
});
