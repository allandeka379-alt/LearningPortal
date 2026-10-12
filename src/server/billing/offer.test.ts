import { describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { FALLBACK_UPGRADE_OFFER, isLifetimePrice, isOfferedCurrency, unlockEverythingLabel } from "@/lib/billing/offer";
import { oneOffOfferPrice, selectFullAccessOffer, studentCheckoutHref, upgradeOfferFor } from "./offer";
import type { PlanPriceView, PlanView } from "./plans";

/** The one-off "Full access" offer is chosen from the catalogue data (owner decision 2026-10-07), never hard-coded. */

function price(patch: Partial<PlanPriceView> = {}): PlanPriceView {
  return {
    id: "price-lifetime",
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

function plan(patch: Partial<PlanView> = {}): PlanView {
  return {
    id: "plan-full",
    code: "FULL_ACCESS",
    name: "Full access",
    tagline: "Pay once, keep it",
    description: null,
    highlights: ["Every lesson"],
    audience: "INDIVIDUAL",
    trialDays: 0,
    isDefault: false,
    isPublic: true,
    isActive: true,
    sortOrder: 2,
    entitlements: { ...NO_ENTITLEMENTS, lessonAccess: "ALL", mockExams: true },
    prices: [price()],
    ...patch,
  };
}

describe("offer helpers (isomorphic)", () => {
  it("offers USD only for now, recognises lifetime prices and words the call to action", () => {
    expect(isOfferedCurrency("USD")).toBe(true);
    expect(isOfferedCurrency(" usd ")).toBe(true);
    expect(isOfferedCurrency("ZWG")).toBe(false);
    expect(isLifetimePrice({ interval: "ONE_OFF", periodDays: null })).toBe(true);
    expect(isLifetimePrice({ interval: "ONE_OFF", periodDays: 30 })).toBe(false);
    expect(isLifetimePrice({ interval: "MONTH", periodDays: null })).toBe(false);
    expect(unlockEverythingLabel("US$1")).toBe("Unlock everything for US$1");
  });
});

describe("selectFullAccessOffer", () => {
  it("picks the first public paid individual plan with a one-off USD price, with the DATABASE amount", () => {
    const offer = selectFullAccessOffer([plan({ id: "free", code: "FREE", isDefault: true, prices: [] }), plan()]);
    expect(offer?.plan).toMatchObject({ id: "plan-full", name: "Full access" });
    expect(offer?.price).toMatchObject({ id: "price-lifetime", amountMinor: 100, currency: "USD", amountLabel: "US$1", lifetime: true });

    const changed = selectFullAccessOffer([plan({ prices: [price({ amountMinor: 250 })] })]);
    expect(changed?.price.amountLabel).toBe("US$2.50");
  });

  it("skips the default plan, school plans, retired plans and prices that are renewable, per seat, free or not in USD", () => {
    expect(
      selectFullAccessOffer([
        plan({ isDefault: true }),
        plan({ audience: "SCHOOL" }),
        plan({ isActive: false }),
        plan({ prices: [price({ interval: "MONTH" }), price({ perSeat: true }), price({ amountMinor: 0 }), price({ currency: "ZWG" })] }),
      ]),
    ).toBeNull();
    expect(oneOffOfferPrice(plan({ prices: [price({ currency: "ZWG", id: "zwg" }), price({ id: "usd" })] }))?.id).toBe("usd");
  });

  it("a one-off pass with days is an offer too, but not a lifetime one", () => {
    expect(selectFullAccessOffer([plan({ prices: [price({ periodDays: 90 })] })])?.price.lifetime).toBe(false);
  });
});

describe("upgradeOfferFor", () => {
  it("goes straight to the one-off checkout with the database price, or falls back to the unlock page", () => {
    const offer = selectFullAccessOffer([plan()]);
    expect(upgradeOfferFor(offer)).toEqual({ href: "/app/billing/checkout?price=price-lifetime", label: "Unlock everything for US$1" });
    expect(upgradeOfferFor(null)).toEqual(FALLBACK_UPGRADE_OFFER);
    expect(studentCheckoutHref("a b")).toBe("/app/billing/checkout?price=a%20b");
  });
});
