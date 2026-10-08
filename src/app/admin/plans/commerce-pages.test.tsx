import { randomUUID } from "node:crypto";
import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { ToastProvider } from "@/components/ui/Toast";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { createPaidPlan, createPendingPayment } from "@/server/billing/testing";
import { processProviderEvent } from "@/server/billing/webhooks";
import { createPlanPrice } from "@/server/cms/commerce/plans";
import { createPromoCode } from "@/server/cms/commerce/promo-codes";
import { db } from "@/server/db";
import { createStudent, createUser, uniqueCode } from "../../../../tests/factories/index";

// The AI usage and AI settings pages render only with AI switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Smoke tests of every page of this area (plans, subscriptions, payments, promo codes, platform settings, AI usage and
 * AI settings): each Server Component loads real data from the test database and renders to HTML. The session guard,
 * `next/link`, `notFound()` and the step-up action are mocked; nothing else is.
 */

type TestActor = { kind: "user"; userId: string; roles: Role[]; displayName: string };
let currentActor: TestActor | null = null;

class NotFoundSignal extends Error {}

vi.mock("@/components/admin/guards", () => ({
  requireAdminPage: async () => {
    if (!currentActor) throw new Error("no actor");
    return currentActor;
  },
  requireAdminAction: async () => currentActor,
  requireAdminStepUpAction: async () => currentActor,
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/admin",
  notFound: () => {
    throw new NotFoundSignal("not found");
  },
  redirect: (to: string) => {
    throw new Error(`redirect ${to}`);
  },
}));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

type PageProps = { params: Promise<Record<string, string>>; searchParams: Promise<Record<string, string>> };
type PageComponent = (props: PageProps) => Promise<ReactElement> | ReactElement;
type PageModule = { default: unknown };

async function render(module: Promise<PageModule>, props: { params?: Record<string, string>; searchParams?: Record<string, string> } = {}): Promise<string> {
  const page = (await module).default as PageComponent;
  const element = await page({ params: Promise.resolve(props.params ?? {}), searchParams: Promise.resolve(props.searchParams ?? {}) });
  return renderToStaticMarkup(<ToastProvider>{element}</ToastProvider>);
}

let admin: TestActor;
let superAdmin: TestActor;
let schoolPlanId: string;
let individualPlanId: string;
let subscriptionId: string;
let paymentId: string;
let promoId: string;
let promoCode: string;

beforeAll(async () => {
  const [a, s] = await Promise.all([createUser({ roles: ["ADMIN"] }), createUser({ roles: ["SUPER_ADMIN"] })]);
  admin = { kind: "user", userId: a.user.id, roles: ["ADMIN"], displayName: "Admin" };
  superAdmin = { kind: "user", userId: s.user.id, roles: ["SUPER_ADMIN"], displayName: "Super" };

  const { plan, price } = await createPaidPlan({ amountMinor: 700 });
  individualPlanId = plan.id;
  const schoolCode = `S${randomUUID().replace(/-/g, "").slice(0, 14).toUpperCase()}`;
  schoolPlanId = (await db.plan.create({ data: { code: schoolCode, name: `Schools ${schoolCode}`, audience: "SCHOOL", isPublic: false, entitlements: NO_ENTITLEMENTS }, select: { id: true } })).id;
  await createPlanPrice(admin, { planId: schoolPlanId, currency: "USD", amount: "2", interval: "TERM", periodDays: "120", perSeat: true, minSeats: "10", label: "Term price" });

  const { user: student } = await createStudent();
  const { payment, subscription } = await createPendingPayment({
    provider: "paynow",
    payerUserId: student.id,
    beneficiaryUserId: student.id,
    planId: plan.id,
    planPriceId: price.id,
    amountMinor: 700,
    providerReference: randomUUID(),
  });
  await processProviderEvent({
    provider: "paynow",
    source: "POLL",
    providerEventId: randomUUID(),
    eventType: "test.poll",
    paymentId: payment.id,
    providerRef: null,
    status: "PAID",
    providerStatus: "paid",
    amountMinor: 700,
    currency: "USD",
    failureCode: null,
    occurredAt: null,
    payload: { test: true, phone: "+263771234567" },
  });
  paymentId = payment.id;
  subscriptionId = subscription.id;
  promoCode = uniqueCode("PAGE");
  promoId = (await createPromoCode(admin, { code: promoCode, discountType: "FREE_DAYS", freeDays: 7, grantPlanId: plan.id, planIds: [plan.id] })).id;
});

describe("commerce pages render with real data", () => {
  it("plans list and plan detail (entitlements editor, price history, add-price form)", async () => {
    currentActor = admin;
    // The plan list is global (every run adds plans): search for this file's own plan instead of hoping it is listed.
    const ownCode = (await db.plan.findUniqueOrThrow({ where: { id: schoolPlanId }, select: { code: true } })).code;
    const list = await render(import("./page"), { searchParams: { q: ownCode.toLowerCase() } });
    expect(list).toContain("Plans &amp; prices");
    expect(list).toContain(`/admin/plans/${schoolPlanId}`);
    expect(list).not.toContain(`/admin/plans/${individualPlanId}`);

    const school = await render(import("./[id]/page"), { params: { id: schoolPlanId } });
    expect(school).toContain("Entitlements");
    expect(school).toContain("Review and save");
    expect(school).toContain("Term price");
    expect(school).toContain("Price per seat");
    expect(school).toContain("per term (120 days)");

    const individual = await render(import("./[id]/page"), { params: { id: individualPlanId } });
    expect(individual).not.toContain("Price per seat");
    await expect(render(import("./[id]/page"), { params: { id: randomUUID() } })).rejects.toBeInstanceOf(NotFoundSignal);
    await expect(render(import("./[id]/page"), { params: { id: "nope" } })).rejects.toBeInstanceOf(NotFoundSignal);
  });

  it("subscriptions list and detail", async () => {
    currentActor = admin;
    const list = await render(import("../subscriptions/page"), { searchParams: { q: subscriptionId } });
    expect(list).toContain(`/admin/subscriptions/${subscriptionId}`);
    const detail = await render(import("../subscriptions/[id]/page"), { params: { id: subscriptionId } });
    expect(detail).toContain("Cancel at period end");
    expect(detail).toContain("Grant extension");
    expect(detail).toContain(`/admin/payments/${paymentId}`);
  });

  it("payments list and detail (timeline, refund panel, dispute)", async () => {
    currentActor = admin;
    const list = await render(import("../payments/page"), { searchParams: { q: paymentId } });
    expect(list).toContain(`/admin/payments/${paymentId}`);
    expect(list).toMatch(/USD\s7\.00/);
    const detail = await render(import("../payments/[id]/page"), { params: { id: paymentId } });
    expect(detail).toContain("Timeline");
    expect(detail).toContain("test.poll");
    expect(detail).toContain("Refund…");
    expect(detail).toContain("Mark as disputed");
    expect(detail).not.toContain("+263771234567");
  });

  it("promo code list, new and detail", async () => {
    currentActor = admin;
    const list = await render(import("../promo-codes/page"), { searchParams: { q: promoCode } });
    expect(list).toContain(promoCode);
    expect(list).toContain("7 free days");
    const created = await render(import("../promo-codes/new/page"));
    expect(created).toContain("Create promo code");
    const detail = await render(import("../promo-codes/[id]/page"), { params: { id: promoId } });
    expect(detail).toContain("Delete promo code");
    expect(detail).toContain("Nobody has used this code yet.");
  });
});

describe("settings and AI pages render", () => {
  it("platform settings for a super admin", async () => {
    currentActor = superAdmin;
    const html = await render(import("../settings/page"));
    for (const text of ["Study defaults", "XP rules", "Parent access to AI conversations", "Rate limits", "Grace period after a missed renewal"]) {
      expect(html).toContain(text);
    }
  });

  it("AI usage and AI settings (read-only for ADMIN, editable for SUPER_ADMIN, never the API key)", async () => {
    currentActor = admin;
    const usage = await render(import("../ai/usage/page"), { searchParams: { from: "2003-01-01", to: "2003-01-31" } });
    expect(usage).toContain("AI usage &amp; spend");
    expect(usage).toContain("By model and tier");
    const readOnly = await render(import("../ai/settings/page"));
    expect(readOnly).toContain("Read-only");
    expect(readOnly).not.toContain("Save routing");

    currentActor = superAdmin;
    const editable = await render(import("../ai/settings/page"));
    expect(editable).toContain("Save routing");
    expect(editable).toContain("Save limits");
    const key = process.env.ANTHROPIC_API_KEY?.trim();
    if (key) expect(editable).not.toContain(key);
  });
});
