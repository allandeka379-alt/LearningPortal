import { createHash, randomUUID } from "node:crypto";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Actor } from "@/server/auth/actor";
import { simulateSandboxCheckout } from "@/server/billing/checkout";
import { clearEntitlementCaches } from "@/server/billing/entitlements";
import { createPaidPlan, createPendingPayment, paymentsTestEnv } from "@/server/billing/testing";
import { db } from "@/server/db";
import { setContentPublishContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import {
  createCurriculumChain,
  createParent,
  createStudent,
  linkParent,
  uniqueSlug,
  type CurriculumChain,
} from "../../../../../tests/factories/index";
import {
  getBillingOverview,
  getCheckoutChoices,
  getStudentPaymentResult,
  listStudentPayments,
  startStudentCheckout,
} from "./service";

/**
 * The student billing reads and checkout against Postgres (sandbox provider, no network): who can see which payment,
 * what a successful payment unlocked, payment history pagination, the billing overview and study pack choices.
 */

const env = paymentsTestEnv({ PAYMENTS_ENABLED_PROVIDERS: "sandbox" });
let chain: CurriculumChain;

beforeAll(async () => {
  chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
});

beforeEach(() => {
  clearEntitlementCaches();
});

function studentActor(userId: string): Actor {
  return {
    kind: "user",
    userId,
    roles: ["STUDENT"],
    platformRoles: ["STUDENT"],
    schoolRoles: [],
    displayName: "Test",
    studentId: userId,
    studentOnboardingCompleted: true,
    timeZone: "Africa/Harare",
    sessionId: null,
    channel: "web",
  };
}

async function student(): Promise<Actor> {
  const { user } = await createStudent({
    student: { isMinor: false, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  return studentActor(user.id);
}

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${(error as Error).message}`;
  }
}

function key(): string {
  return `${randomUUID()}-0`;
}

describe("a successful plan payment", () => {
  it("shows what it unlocked, a receipt number, and the plan on the billing overview", async () => {
    const actor = await student();
    const { plan, price } = await createPaidPlan({ amountMinor: 650 });
    const started = await startStudentCheckout(actor, { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey: key() }, { env });
    await simulateSandboxCheckout(actor.userId, started.paymentId, "PAID", { env });
    clearEntitlementCaches();

    const result = await getStudentPaymentResult(actor, started.paymentId);
    expect(result).toMatchObject({ status: "SUCCESSFUL", purpose: "SUBSCRIPTION", itemName: plan.name, amountMinor: 650, paidByYou: true, failureMessage: null });
    expect(result.receiptNumber).not.toBeNull();
    expect(result.servicePeriodEnd).not.toBeNull();
    expect(result.instructions).toBeNull();
    expect(result.unlocked?.map((line) => line.label)).toEqual(expect.arrayContaining(["Full lessons for every topic", "Unlimited practice questions"]));
    expect(result.unlocked?.every((line) => line.included)).toBe(true);

    const overview = await getBillingOverview(actor);
    expect(overview.planName).toBe(plan.name);
    expect(overview.subscription).toMatchObject({ status: "ACTIVE", planName: plan.name, live: true, cancelAtPeriodEnd: false, paidByParent: false });
    expect(overview.sources[0]).toMatchObject({ kind: "OWN", label: "Your subscription", planName: plan.name });
    expect(overview.entitlements.lessonAccess).toBe("ALL");
    expect(overview.payments.items).toHaveLength(1);
    expect(overview.payments.items[0]).toMatchObject({ id: started.paymentId, status: "SUCCESSFUL", receiptNumber: result.receiptNumber, paidByYou: true });
  });

  it("one-off Full access: 'since <date>' with the receipt, no subscription to cancel, nothing more to buy", async () => {
    const actor = await student();
    const { plan, price } = await createPaidPlan({ interval: "ONE_OFF", periodDays: null, amountMinor: 100 });
    const started = await startStudentCheckout(actor, { purpose: "PLAN_PURCHASE", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey: key() }, { env });
    await simulateSandboxCheckout(actor.userId, started.paymentId, "PAID", { env });
    clearEntitlementCaches();

    const result = await getStudentPaymentResult(actor, started.paymentId);
    expect(result).toMatchObject({ status: "SUCCESSFUL", purpose: "PLAN_PURCHASE", itemName: plan.name, amountMinor: 100, servicePeriodEnd: null });
    expect(result.unlocked?.every((line) => line.included)).toBe(true);

    const overview = await getBillingOverview(actor);
    expect(overview.planName).toBe(plan.name);
    expect(overview.subscription).toBeNull();
    expect(overview.purchase).toMatchObject({
      planName: plan.name,
      endsAt: null,
      receiptNumber: result.receiptNumber,
      receiptHref: `/app/billing/result?paymentId=${encodeURIComponent(started.paymentId)}`,
      paidByParent: false,
    });
    expect(overview.purchase?.since.getTime()).toBeLessThanOrEqual(Date.now());
    // The purchase is shown on its own, not again as a "grant" source.
    expect(overview.sources.some((source) => source.grantSource === "PURCHASE")).toBe(false);
    // Buying again is refused by the checkout itself.
    expect(
      await codeOf(startStudentCheckout(actor, { purpose: "PLAN_PURCHASE", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey: key() }, { env })),
    ).toBe("CONFLICT");
  });
});

describe("who can see a payment", () => {
  it("the payer and the beneficiary only; a parent-paid payment hides the parent's wallet details from the child", async () => {
    const { plan, price } = await createPaidPlan();
    const child = await student();
    const stranger = await student();
    const { user: parent } = await createParent();
    await linkParent({ parentUserId: parent.id, studentUserId: child.userId });
    const { payment } = await createPendingPayment({
      provider: "sandbox",
      payerUserId: parent.id,
      beneficiaryUserId: child.userId,
      planId: plan.id,
      planPriceId: price.id,
      metadata: { maskedMsisdn: "+263 77* *** 567", checkoutKind: "mobile_prompt", instructions: "Approve on your phone." },
    });

    const seen = await getStudentPaymentResult(child, payment.id);
    expect(seen).toMatchObject({ id: payment.id, status: "PENDING", paidByYou: false, maskedMsisdn: null, instructions: null, unlocked: null });
    const history = await listStudentPayments(child);
    expect(history.items.map((row) => [row.id, row.paidByYou])).toEqual([[payment.id, false]]);

    expect(await codeOf(getStudentPaymentResult(stranger, payment.id))).toBe("NOT_FOUND");
    expect((await listStudentPayments(stranger)).items).toEqual([]);
    expect(await codeOf(getStudentPaymentResult(child, "not-a-uuid"))).toBe("NOT_FOUND");
    expect(await codeOf(getStudentPaymentResult(child, randomUUID()))).toBe("NOT_FOUND");
    // Not a student (or not onboarded): refused before any lookup.
    expect(await codeOf(getStudentPaymentResult({ ...child, studentOnboardingCompleted: false }, payment.id))).toBe("FORBIDDEN");
    expect(await codeOf(getStudentPaymentResult({ ...child, roles: ["PARENT"], platformRoles: ["PARENT"] }, payment.id))).toBe("FORBIDDEN");
  });

  it("the payer sees their own mobile-money instructions and masked number while it is pending", async () => {
    const actor = await student();
    const { price } = await createPaidPlan();
    const started = await startStudentCheckout(
      actor,
      { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_ecocash", phone: "0781 234 567", idempotencyKey: key() },
      { env },
    );
    expect(started).toMatchObject({ kind: "mobile", maskedMsisdn: "+263 78* *** 567" });
    const result = await getStudentPaymentResult(actor, started.paymentId);
    expect(result).toMatchObject({ status: "PENDING", paidByYou: true, maskedMsisdn: "+263 78* *** 567", methodLabel: "Test EcoCash" });
    expect(result.instructions).toEqual(expect.any(String));
  });
});

describe("startStudentCheckout", () => {
  it("is idempotent per key, and refuses a key reused for a different purchase", async () => {
    const actor = await student();
    const { price } = await createPaidPlan();
    const { price: other } = await createPaidPlan();
    const idempotencyKey = key();
    const first = await startStudentCheckout(actor, { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey }, { env });
    const second = await startStudentCheckout(actor, { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey }, { env });
    expect(second.paymentId).toBe(first.paymentId);
    expect(await codeOf(startStudentCheckout(actor, { purpose: "SUBSCRIPTION", planPriceId: other.id, methodId: "sandbox_web", idempotencyKey }, { env }))).toBe("CONFLICT");
    expect(await db.payment.count({ where: { payerUserId: actor.userId } })).toBe(1);
  });

  it("refuses test methods when they are not allowed and methods whose provider is disabled", async () => {
    const actor = await student();
    const { price } = await createPaidPlan();
    const productionLike = { ...env, NODE_ENV: "production" as const };
    expect(
      await codeOf(startStudentCheckout(actor, { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey: key() }, { env: productionLike })),
    ).toBe("VALIDATION");
    // Paynow is not enabled in this environment.
    expect(
      await codeOf(
        startStudentCheckout(actor, { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "paynow_ecocash", phone: "0771234567", idempotencyKey: key() }, { env }),
      ),
    ).toBe("BAD_REQUEST");
    expect(await db.payment.count({ where: { payerUserId: actor.userId } })).toBe(0);
  });
});

describe("listStudentPayments", () => {
  it("pages newest first with an opaque cursor", async () => {
    const actor = await student();
    const { plan, price } = await createPaidPlan();
    const ids: string[] = [];
    for (let index = 0; index < 3; index += 1) {
      const { payment } = await createPendingPayment({
        provider: "sandbox",
        payerUserId: actor.userId,
        beneficiaryUserId: actor.userId,
        planId: plan.id,
        planPriceId: price.id,
        createdAt: new Date(Date.now() - (3 - index) * 60_000),
      });
      ids.push(payment.id);
    }
    const first = await listStudentPayments(actor, { limit: 2 });
    expect(first.items.map((row) => row.id)).toEqual([ids[2], ids[1]]);
    expect(first.nextCursor).not.toBeNull();
    const second = await listStudentPayments(actor, { limit: 2, cursor: first.nextCursor });
    expect(second.items.map((row) => row.id)).toEqual([ids[0]]);
    expect(second.nextCursor).toBeNull();
    expect(await codeOf(listStudentPayments(actor, { cursor: "garbage" }))).toBe("VALIDATION");
  });
});

describe("getCheckoutChoices for a study pack", () => {
  async function publishedPack(subjectId: string) {
    const now = new Date();
    return db.$transaction(async (tx) => {
      const pack = await tx.studyPack.create({
        data: {
          slug: uniqueSlug("pack"),
          title: "Test Biology Study Pack",
          entitlements: { version: 1, features: { flashcards: true }, limits: {} },
          status: "PUBLISHED",
          approvedAt: now,
          publishedAt: now,
        },
        select: { id: true, title: true },
      });
      await setContentPublishContext(tx, pack.id);
      await tx.studyPackScope.create({ data: { studyPackId: pack.id, subjectId } });
      const snapshot = { studyPack: { id: pack.id, title: pack.title }, scopes: [{ subjectId }] };
      await tx.contentRevision.create({
        data: {
          entityType: "STUDY_PACK",
          entityId: pack.id,
          revision: 1,
          snapshot,
          contentHash: createHash("sha256").update(JSON.stringify(snapshot)).digest("hex"),
          changeNote: "Test fixture",
        },
      });
      return pack;
    });
  }

  it("offers the pack's own prices (open-ended one-off included), says when it is already owned, and hides unknown packs", async () => {
    const actor = await student();
    const pack = await publishedPack(chain.subject.id);
    const lifetime = await db.planPrice.create({ data: { studyPackId: pack.id, currency: "USD", amountMinor: 900, interval: "ONE_OFF" }, select: { id: true } });

    const choices = await getCheckoutChoices(actor, { studyPackId: pack.id }, { env });
    if (choices.kind !== "pack") throw new Error(`expected pack choices, got ${choices.kind}`);
    expect(choices.pack).toMatchObject({ id: pack.id, title: pack.title });
    expect(choices.items[0]?.prices.map((option) => [option.planPriceId, option.amountMinor])).toEqual([[lifetime.id, 900]]);
    expect(choices.methods.map((method) => method.id)).toEqual(["sandbox_web", "sandbox_ecocash"]);

    const started = await startStudentCheckout(actor, { purpose: "STUDY_PACK", studyPackId: pack.id, planPriceId: lifetime.id, methodId: "sandbox_web", idempotencyKey: key() }, { env });
    await simulateSandboxCheckout(actor.userId, started.paymentId, "PAID", { env });
    expect(await getCheckoutChoices(actor, { studyPackId: pack.id }, { env })).toEqual({ kind: "pack-owned", pack: { id: pack.id, title: pack.title } });
    const result = await getStudentPaymentResult(actor, started.paymentId);
    expect(result).toMatchObject({ status: "SUCCESSFUL", purpose: "STUDY_PACK", studyPack: { id: pack.id } });
    expect(result.unlocked?.map((line) => line.key)).toEqual(expect.arrayContaining(["lessons", "flashcards"]));
    const overview = await getBillingOverview(actor);
    expect(overview.packs).toEqual([expect.objectContaining({ packId: pack.id, state: "active", endsAt: null })]);

    expect(await getCheckoutChoices(actor, { studyPackId: randomUUID() }, { env })).toEqual({ kind: "unavailable" });
    expect(await getCheckoutChoices(actor, { studyPackId: "not-a-uuid" }, { env })).toEqual({ kind: "unavailable" });
  });
});
