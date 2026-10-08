import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createCurriculumChain, createParent, createStudent, linkParent, type CurriculumChain } from "../../../../tests/factories/index";

/**
 * Wiring tests for the student billing Server Actions (§31, §32): form → guard → billing services → ActionResult.
 * `next/headers` (session cookie) and `next/cache` are mocked; the checkout, subscription and payment services and the
 * database are real, with only the sandbox provider enabled (no network).
 *
 * Covers who may do what (the student pays only for themselves; only the payer or the beneficiary can read a payment;
 * only the holder can cancel / resume), that amounts never come from the client, and idempotency (a double submit
 * returns the same payment).
 */

const jar = new Map<string, string>();
let incomingHeaders = new Headers();
const revalidated = vi.hoisted(() => [] as string[]);

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => incomingHeaders,
}));
vi.mock("next/cache", () => ({ revalidatePath: (path: string) => void revalidated.push(path) }));

const { cancelPlanAction, checkPaymentStatusAction, resumePlanAction, startCheckoutAction } = await import("./actions");
const { db } = await import("@/server/db");
const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { randomIp, testMeta } = await import("@/server/auth/testing");
const { resetEnvCache } = await import("@/server/lib/env");
const { resetProviderInstances } = await import("@/server/billing/providers/registry");
const { createPaidPlan, createPendingPayment } = await import("@/server/billing/testing");

let chain: CurriculumChain;

beforeAll(async () => {
  // Hermetic: only the sandbox provider, whatever the local .env enables.
  vi.stubEnv("PAYMENTS_ENABLED_PROVIDERS", "sandbox");
  resetEnvCache();
  resetProviderInstances();
  chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
});

afterAll(() => {
  vi.unstubAllEnvs();
  resetEnvCache();
  resetProviderInstances();
});

beforeEach(() => {
  jar.clear();
  revalidated.length = 0;
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

async function signIn(userId: string, roles: ("STUDENT" | "PARENT")[]) {
  const { token } = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD", roles });
  jar.set(currentSessionCookieName(), token);
}

async function onboardedStudent(): Promise<string> {
  const { user } = await createStudent({
    student: { isMinor: false, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  return user.id;
}

async function signedInStudent(): Promise<string> {
  const userId = await onboardedStudent();
  await signIn(userId, ["STUDENT"]);
  return userId;
}

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

function key(): string {
  return `${randomUUID()}-0`;
}

describe("startCheckoutAction", () => {
  it("starts the student's own checkout from ids only (the amount comes from the price row), and a double submit returns the same payment", async () => {
    const studentId = await signedInStudent();
    const { price } = await createPaidPlan({ amountMinor: 700 });
    const idempotencyKey = key();
    // A tampered form: an amount and another beneficiary are simply not fields the action reads.
    const fields = {
      purpose: "SUBSCRIPTION",
      planPriceId: price.id,
      methodId: "sandbox_web",
      idempotencyKey,
      amountMinor: "1",
      beneficiaryUserId: randomUUID(),
    };

    const first = await startCheckoutAction(null, form(fields));
    if (!first?.ok) throw new Error(`checkout failed: ${JSON.stringify(first)}`);
    expect(first.data.kind).toBe("redirect");
    const paymentId = first.data.paymentId;
    if (first.data.kind === "redirect") expect(first.data.url).toContain(paymentId);

    const payment = await db.payment.findUniqueOrThrow({
      where: { id: paymentId },
      select: { payerUserId: true, beneficiaryUserId: true, amountMinor: true, currency: true, status: true, provider: true, idempotencyKey: true },
    });
    expect(payment).toEqual({
      payerUserId: studentId,
      beneficiaryUserId: studentId,
      amountMinor: 700,
      currency: "USD",
      status: "PENDING",
      provider: "sandbox",
      idempotencyKey,
    });

    const again = await startCheckoutAction(null, form(fields));
    expect(again).toMatchObject({ ok: true, data: { kind: "redirect", paymentId } });
    expect(await db.payment.count({ where: { payerUserId: studentId } })).toBe(1);
  });

  it("validates the choice and the Zimbabwe wallet number, then returns the 'check your phone' outcome with a masked number", async () => {
    const studentId = await signedInStudent();
    const { price } = await createPaidPlan();
    const base = { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_ecocash" };

    expect(await startCheckoutAction(null, form({ purpose: "SUBSCRIPTION", methodId: "sandbox_web", idempotencyKey: key() }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { planPriceId: expect.any(Array) } },
    });
    expect(await startCheckoutAction(null, form({ ...base, methodId: "bitcoin", idempotencyKey: key() }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { methodId: expect.any(Array) } },
    });
    expect(await startCheckoutAction(null, form({ ...base, phone: "", idempotencyKey: key() }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { phone: expect.any(Array) } },
    });
    expect(await startCheckoutAction(null, form({ ...base, phone: "+27 82 123 4567", idempotencyKey: key() }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { phone: expect.any(Array) } },
    });
    expect(await db.payment.count({ where: { payerUserId: studentId } })).toBe(0);

    const started = await startCheckoutAction(null, form({ ...base, phone: "0771 234 567", idempotencyKey: key() }));
    if (!started?.ok || started.data.kind !== "mobile") throw new Error(`expected a mobile checkout: ${JSON.stringify(started)}`);
    expect(started.data).toMatchObject({
      methodLabel: "Test mobile-money prompt",
      maskedMsisdn: "+263 77* *** 567",
      resultHref: `/app/billing/result?paymentId=${started.data.paymentId}`,
    });
    expect(started.data.instructions.length).toBeGreaterThan(0);
    expect(started.data.sandboxHref).toContain(started.data.paymentId);
    // The full number is never stored.
    const stored = await db.payment.findUniqueOrThrow({ where: { id: started.data.paymentId }, select: { metadata: true, method: true } });
    expect(JSON.stringify(stored.metadata)).not.toContain("771234567");
    expect(stored.method).toBe("ecocash");

    expect(await checkPaymentStatusAction(started.data.paymentId)).toEqual({
      ok: true,
      data: { paymentId: started.data.paymentId, status: "PENDING", message: null, resultHref: started.data.resultHref },
    });
    const refreshed = await checkPaymentStatusAction(started.data.paymentId, { refresh: true });
    expect(refreshed).toMatchObject({ ok: true, data: { status: "PENDING" } });
  });

  it("refuses signed-out visitors, parents and students who have not finished onboarding", async () => {
    const { price } = await createPaidPlan();
    const fields = { purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey: key() };

    expect(await startCheckoutAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });

    const { user: parent } = await createParent();
    await signIn(parent.id, ["PARENT"]);
    expect(await startCheckoutAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });

    const { user: newcomer } = await createStudent({ student: { isMinor: false } });
    await signIn(newcomer.id, ["STUDENT"]);
    expect(await startCheckoutAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });
    expect(await db.payment.count({ where: { payerUserId: { in: [parent.id, newcomer.id] } } })).toBe(0);
  });
});

describe("checkPaymentStatusAction", () => {
  it("shows a payment to its payer and its beneficiary only (same 'not found' for everyone else)", async () => {
    const { plan, price } = await createPaidPlan();
    const owner = await signedInStudent();
    const started = await startCheckoutAction(null, form({ purpose: "SUBSCRIPTION", planPriceId: price.id, methodId: "sandbox_web", idempotencyKey: key() }));
    if (!started?.ok) throw new Error("checkout failed");
    const ownPaymentId = started.data.paymentId;

    // A parent pays for a second student.
    const child = await onboardedStudent();
    const { user: parent } = await createParent();
    await linkParent({ parentUserId: parent.id, studentUserId: child });
    const { payment: parentPaid } = await createPendingPayment({
      provider: "sandbox",
      payerUserId: parent.id,
      beneficiaryUserId: child,
      planId: plan.id,
      planPriceId: price.id,
    });

    // The owner sees their own payment, not the other family's.
    expect(await checkPaymentStatusAction(ownPaymentId)).toMatchObject({ ok: true, data: { status: "PENDING" } });
    expect(await checkPaymentStatusAction(parentPaid.id)).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });

    // The child (beneficiary) sees the payment their parent made, not the first student's.
    await signIn(child, ["STUDENT"]);
    expect(await checkPaymentStatusAction(parentPaid.id)).toMatchObject({ ok: true, data: { paymentId: parentPaid.id, status: "PENDING" } });
    expect(await checkPaymentStatusAction(ownPaymentId)).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await checkPaymentStatusAction("not-a-payment")).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });

    // Signed out: nothing.
    jar.clear();
    expect(await checkPaymentStatusAction(ownPaymentId)).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
    expect(owner).not.toBe(child);
  });
});

describe("cancelPlanAction / resumePlanAction", () => {
  async function activePlan(holderUserId: string) {
    const { plan, price } = await createPaidPlan();
    const now = Date.now();
    return db.subscription.create({
      data: {
        planId: plan.id,
        planPriceId: price.id,
        holderUserId,
        status: "ACTIVE",
        startedAt: new Date(now - 10 * 86_400_000),
        currentPeriodStart: new Date(now - 10 * 86_400_000),
        currentPeriodEnd: new Date(now + 20 * 86_400_000),
      },
      select: { id: true },
    });
  }

  it("stops the student's own plan at period end and undoes it; another student's plan is not found", async () => {
    const studentId = await signedInStudent();
    const subscription = await activePlan(studentId);

    const cancelled = await cancelPlanAction(null, form({ subscriptionId: subscription.id }));
    expect(cancelled).toMatchObject({ ok: true, data: { message: expect.stringMatching(/keep access/) } });
    expect(await db.subscription.findUniqueOrThrow({ where: { id: subscription.id }, select: { status: true, cancelAtPeriodEnd: true } })).toEqual({
      status: "ACTIVE",
      cancelAtPeriodEnd: true,
    });
    expect(revalidated).toContain("/app/billing");

    const resumed = await resumePlanAction(null, form({ subscriptionId: subscription.id }));
    expect(resumed).toMatchObject({ ok: true });
    expect(await db.subscription.findUniqueOrThrow({ where: { id: subscription.id }, select: { cancelAtPeriodEnd: true } })).toEqual({
      cancelAtPeriodEnd: false,
    });

    await signedInStudent();
    expect(await cancelPlanAction(null, form({ subscriptionId: subscription.id }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await resumePlanAction(null, form({ subscriptionId: subscription.id }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await cancelPlanAction(null, form({ subscriptionId: "nope" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await db.subscription.findUniqueOrThrow({ where: { id: subscription.id }, select: { cancelAtPeriodEnd: true } })).toEqual({
      cancelAtPeriodEnd: false,
    });
  });
});
