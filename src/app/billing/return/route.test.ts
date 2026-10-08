import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createSession } from "@/server/auth/sessions";
import { testMeta } from "@/server/auth/testing";
import { db } from "@/server/db";
import { getEnv } from "@/server/lib/env";
import { createPaidPlan, createPendingPayment, randomIp } from "@/server/billing/testing";
import { createParent, createStudent, linkParent } from "../../../../tests/factories/index";
import { GET } from "./route";

function get(query: string, cookie?: string): Request {
  return new Request(`http://localhost:3000/billing/return${query}`, { headers: { "x-forwarded-for": randomIp(), ...(cookie ? { cookie } : {}) } });
}

function pathOf(response: Response): string {
  const location = new URL(response.headers.get("location") ?? "");
  return `${location.origin}${location.pathname}`;
}

describe("GET /billing/return", () => {
  it("sends malformed links to the billing page without touching anything", async () => {
    const response = await GET(get("?paymentId=../../etc"));
    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe(`${getEnv().APP_URL}/app/billing`);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("redirects to the result page (keeping the cancel flag); a finished payment is not polled or changed", async () => {
    const { plan, price } = await createPaidPlan();
    const { user: student } = await createStudent();
    const { payment } = await createPendingPayment({
      provider: "paynow",
      payerUserId: student.id,
      beneficiaryUserId: student.id,
      planId: plan.id,
      planPriceId: price.id,
    });
    await db.payment.update({ where: { id: payment.id }, data: { status: "CANCELLED", cancelledAt: new Date(), failureCode: "user_cancelled" } });
    const response = await GET(get(`?paymentId=${payment.id}&provider=stripe&cancelled=1`));
    expect(response.status).toBe(303);
    const location = new URL(response.headers.get("location") ?? "");
    expect(`${location.origin}${location.pathname}`).toBe(`${getEnv().APP_URL}/app/billing/result`);
    expect(location.searchParams.get("paymentId")).toBe(payment.id);
    expect(location.searchParams.get("cancelled")).toBe("1");
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("CANCELLED");
  });

  it("sends a parent who paid for a child to the parent result page (parties from the Payment row, not the URL)", async () => {
    const { plan, price } = await createPaidPlan();
    const { user: student } = await createStudent();
    const { user: parent } = await createParent();
    await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const { payment } = await createPendingPayment({
      provider: "paynow",
      payerUserId: parent.id,
      beneficiaryUserId: student.id,
      planId: plan.id,
      planPriceId: price.id,
    });
    await db.payment.update({ where: { id: payment.id }, data: { status: "CANCELLED", cancelledAt: new Date(), failureCode: "user_cancelled" } });
    const response = await GET(get(`?paymentId=${payment.id}&provider=paynow`));
    expect(response.status).toBe(303);
    const location = new URL(response.headers.get("location") ?? "");
    expect(`${location.origin}${location.pathname}`).toBe(`${getEnv().APP_URL}/parent/billing/result`);
    expect(location.searchParams.get("paymentId")).toBe(payment.id);

    // The signed-in payer (session cookie) also lands on the parent page...
    const parentSession = await createSession(parent.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const asParent = await GET(get(`?paymentId=${payment.id}`, `dz_session=${parentSession.token}`));
    expect(pathOf(asParent)).toBe(`${getEnv().APP_URL}/parent/billing/result`);
    // ...while another signed-in user (here the child who benefits) is sent to the student page.
    const studentSession = await createSession(student.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const asStudent = await GET(get(`?paymentId=${payment.id}`, `dz_session=${studentSession.token}`));
    expect(pathOf(asStudent)).toBe(`${getEnv().APP_URL}/app/billing/result`);
    // A stale / forged cookie counts as anonymous.
    expect(pathOf(await GET(get(`?paymentId=${payment.id}`, "dz_session=not-a-real-token")))).toBe(`${getEnv().APP_URL}/parent/billing/result`);
  });

  it("an unknown payment id still lands on the result page (which shows nothing to strangers)", async () => {
    const id = randomUUID();
    const response = await GET(get(`?paymentId=${id}`));
    expect(response.status).toBe(303);
    expect(new URL(response.headers.get("location") ?? "").searchParams.get("paymentId")).toBe(id);
  });
});
