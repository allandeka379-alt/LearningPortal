import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { PlanView } from "@/server/billing/plans";
import { simulateSandboxCheckout } from "@/server/billing/checkout";
import { createPaidPlan, paymentsTestEnv, TEST_APP_URL } from "@/server/billing/testing";
import { db } from "@/server/db";
import { createParent, createStudent, linkParent } from "../../../tests/factories/index";
import {
  childrenWithLifetimeAccess,
  getChildCheckoutOptions,
  getParentPayment,
  listParentPayments,
  refreshParentPayment,
  safeCheckoutRedirect,
  startChildCheckout,
} from "./billing";
import { revokeLink } from "./links";
import { actorOf, errorCodeOf } from "./testing";

/**
 * "Subscribe for this child" (§21, §31, §32): a linked parent pays for a child through the shared checkout. The
 * sandbox provider needs no network. Plans are injected (the public catalogue is shared and cached).
 */

const env = paymentsTestEnv();

async function family() {
  const student = (await createStudent({ firstName: "Tariro" })).user;
  const parent = (await createParent()).user;
  const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
  return { student, parent, link, parentActor: await actorOf(parent.id) };
}

function planView(prices: PlanView["prices"], patch: Partial<PlanView> = {}): PlanView {
  return {
    id: randomUUID(),
    code: "TESTPLAN",
    name: "Premium",
    tagline: "Everything",
    description: null,
    highlights: ["Mock exams"],
    audience: "INDIVIDUAL",
    trialDays: 0,
    isDefault: false,
    isPublic: true,
    isActive: true,
    sortOrder: 1,
    entitlements: {} as PlanView["entitlements"],
    prices,
    ...patch,
  };
}

function price(patch: Partial<PlanView["prices"][number]> = {}): PlanView["prices"][number] {
  return {
    id: randomUUID(),
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
    ...patch,
  };
}

describe("getChildCheckoutOptions", () => {
  it("offers paid individual prices in USD and the enabled methods for that currency", async () => {
    const { student, parentActor } = await family();
    const monthly = price();
    const lifetime = price({ interval: "ONE_OFF", periodDays: null, amountMinor: 100 });
    const plans = [
      // Free, per-seat and (for now) non-USD prices are not offered; a lifetime one-off price is (owner decision 2026-10-07).
      planView([monthly, price({ amountMinor: 0 }), price({ perSeat: true }), lifetime, price({ currency: "ZWG", amountMinor: 13_000 })]),
      planView([price()], { audience: "SCHOOL" }),
      planView([price({ amountMinor: 0 })], { name: "Free" }),
    ];
    let askedCountry: string | null | undefined;
    const options = await getChildCheckoutOptions(parentActor, student.id, {
      env,
      listPlans: async (countryId) => {
        askedCountry = countryId;
        return plans;
      },
    });
    expect(askedCountry).toBeNull(); // the child's country (none set) decides country prices
    expect(options.child).toEqual({ studentUserId: student.id, name: "Tariro" });
    expect(options.plans).toHaveLength(1);
    expect(options.plans[0]?.prices.map((p) => p.planPriceId)).toEqual([monthly.id, lifetime.id]);
    const methodIds = options.methods.map((m) => m.id);
    expect(methodIds).toEqual(expect.arrayContaining(["paynow_ecocash", "paynow_onemoney", "paynow_web", "sandbox_web", "sandbox_ecocash"]));
    expect(options.methods.find((m) => m.id === "paynow_ecocash")).toMatchObject({ needsPhone: true, currencies: ["USD"] });
    expect(options.currentSubscription).toBeNull();
    expect(options.purchase).toBeNull();
  });

  it("one-off Full access: Paynow-only methods, and nothing to buy once the child owns it for good", async () => {
    const { student, parent, parentActor } = await family();
    const { plan, price: lifetime } = await createPaidPlan({ interval: "ONE_OFF", periodDays: null, amountMinor: 100 });
    const view = planView([{ ...price({ interval: "ONE_OFF", periodDays: null, amountMinor: 100 }), id: lifetime.id }], { id: plan.id, name: "Full access" });
    const before = await getChildCheckoutOptions(parentActor, student.id, { env, listPlans: async () => [view] });
    expect(before.plans.map((p) => p.planId)).toEqual([plan.id]);
    expect(await childrenWithLifetimeAccess(parentActor, [student.id])).toEqual(new Set());
    // Paynow (+ the sandbox outside production) only: no card provider outside Paynow for a one-off purchase.
    expect(before.methods.map((m) => m.id).sort()).toEqual(["paynow_ecocash", "paynow_onemoney", "paynow_web", "sandbox_ecocash", "sandbox_web"]);

    const started = await startChildCheckout(parentActor, { studentUserId: student.id, planPriceId: lifetime.id, methodId: "sandbox_web" }, { env });
    await simulateSandboxCheckout(parent.id, started.paymentId, "PAID", { env });

    const after = await getChildCheckoutOptions(parentActor, student.id, { env, listPlans: async () => [view] });
    expect(after.plans).toEqual([]);
    expect(after.purchase).toMatchObject({ planName: plan.name, endsAt: null, paidByYou: true });
    // The parent pages swap the pay button for "Has full access"; another parent never learns it (link-scoped).
    expect(await childrenWithLifetimeAccess(parentActor, [student.id])).toEqual(new Set([student.id]));
    const stranger = await actorOf((await createParent()).user.id);
    expect(await childrenWithLifetimeAccess(stranger, [student.id])).toEqual(new Set());
    expect(await errorCodeOf(startChildCheckout(parentActor, { studentUserId: student.id, planPriceId: lifetime.id, methodId: "sandbox_web" }, { env }))).toBe(
      "CONFLICT",
    );
  });

  it("is NOT_FOUND for an unlinked or revoked parent", async () => {
    const { student, link, parentActor } = await family();
    const stranger = await actorOf((await createParent()).user.id);
    expect(await errorCodeOf(getChildCheckoutOptions(stranger, student.id, { env, listPlans: async () => [] }))).toBe("NOT_FOUND");
    await revokeLink(parentActor, { linkId: link.id });
    expect(await errorCodeOf(getChildCheckoutOptions(parentActor, student.id, { env, listPlans: async () => [] }))).toBe("NOT_FOUND");
  });
});

describe("startChildCheckout", () => {
  it("creates a payment the parent pays for the child (redirect), visible in the parent's payments", async () => {
    const { student, parent, parentActor } = await family();
    const { plan, price: planPrice } = await createPaidPlan();
    const result = await startChildCheckout(
      parentActor,
      { studentUserId: student.id, planPriceId: planPrice.id, methodId: "sandbox_web", idempotencyKey: randomUUID() },
      { env },
    );
    expect(result.kind).toBe("redirect");
    if (result.kind !== "redirect") return;
    expect(result.url.startsWith(`${TEST_APP_URL}/dev/sandbox-checkout/`)).toBe(true);

    const payment = await db.payment.findUniqueOrThrow({ where: { id: result.paymentId } });
    expect(payment).toMatchObject({ payerUserId: parent.id, beneficiaryUserId: student.id, status: "PENDING", amountMinor: planPrice.amountMinor });
    const subscription = await db.subscription.findUniqueOrThrow({ where: { id: payment.subscriptionId as string } });
    expect(subscription).toMatchObject({ holderUserId: student.id, payerUserId: parent.id, planId: plan.id });

    const rows = await listParentPayments(parentActor);
    expect(rows.map((row) => row.id)).toEqual([result.paymentId]);
    expect(rows[0]).toMatchObject({ childName: "Tariro", itemName: plan.name, status: "PENDING" });
  });

  it("mobile money needs a number and returns the approval instructions", async () => {
    const { student, parentActor } = await family();
    const { price: planPrice } = await createPaidPlan();
    const base = { studentUserId: student.id, planPriceId: planPrice.id, methodId: "sandbox_ecocash" };
    expect(await errorCodeOf(startChildCheckout(parentActor, base, { env }))).toBe("VALIDATION");
    const result = await startChildCheckout(parentActor, { ...base, phone: "0771234567" }, { env });
    expect(result.kind).toBe("mobile");
    const payment = await getParentPayment(parentActor, result.paymentId);
    expect(payment.instructions).toMatch(/Sandbox/);
    expect(payment.maskedMsisdn).toBe("+263 77* *** 567");
  });

  it("refuses unknown methods and children the parent is not linked to", async () => {
    const { student, parentActor } = await family();
    const { price: planPrice } = await createPaidPlan();
    expect(await errorCodeOf(startChildCheckout(parentActor, { studentUserId: student.id, planPriceId: planPrice.id, methodId: "bitcoin" }, { env }))).toBe("VALIDATION");
    const otherChild = (await createStudent()).user;
    expect(await errorCodeOf(startChildCheckout(parentActor, { studentUserId: otherChild.id, planPriceId: planPrice.id, methodId: "sandbox_web" }, { env }))).toBe("NOT_FOUND");
    expect(await db.payment.count({ where: { payerUserId: parentActor.userId } })).toBe(0);
  });
});

describe("the parent's payments", () => {
  it("are payer-scoped: another parent's payment is NOT_FOUND", async () => {
    const { student, parentActor } = await family();
    const { price: planPrice } = await createPaidPlan();
    const result = await startChildCheckout(parentActor, { studentUserId: student.id, planPriceId: planPrice.id, methodId: "sandbox_web" }, { env });
    const stranger = await actorOf((await createParent()).user.id);
    expect(await errorCodeOf(getParentPayment(stranger, result.paymentId))).toBe("NOT_FOUND");
    expect(await errorCodeOf(getParentPayment(parentActor, "nope"))).toBe("NOT_FOUND");
    expect(await listParentPayments(stranger)).toEqual([]);
    // A settled payment is returned as is (no provider call).
    await db.payment.update({ where: { id: result.paymentId }, data: { status: "CANCELLED", cancelledAt: new Date() } });
    expect((await refreshParentPayment(parentActor, result.paymentId)).status).toBe("CANCELLED");
  });
});

describe("safeCheckoutRedirect", () => {
  it("lets only http(s) leave the app and maps the student result page to the parent's", () => {
    const paymentId = randomUUID();
    expect(safeCheckoutRedirect("https://www.paynow.co.zw/payment/abc", paymentId, TEST_APP_URL)).toBe("https://www.paynow.co.zw/payment/abc");
    expect(safeCheckoutRedirect(`${TEST_APP_URL}/app/billing/result?paymentId=${paymentId}`, paymentId, TEST_APP_URL)).toBe(
      `/parent/billing/result?paymentId=${paymentId}`,
    );
    expect(() => safeCheckoutRedirect("javascript:alert(1)", paymentId, TEST_APP_URL)).toThrow();
    expect(() => safeCheckoutRedirect("not a url", paymentId, TEST_APP_URL)).toThrow();
  });
});
