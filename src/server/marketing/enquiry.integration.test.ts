import { randomInt } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { createUser, uniqueEmail } from "../../../tests/factories/index";
import { submitSchoolEnquiry, type EnquiryDeps } from "./enquiry";

function testIp(): string {
  return `10.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
}

function input(overrides: Record<string, unknown> = {}) {
  return {
    schoolName: `Test High School ${randomInt(0, 1_000_000)}`,
    contactName: "T. Moyo",
    email: uniqueEmail("head"),
    phone: "+263 77 123 4567",
    learners: "420",
    boards: ["ZIMSEC"],
    message: "We would like to pilot this with Form 4.",
    consent: true,
    ...overrides,
  };
}

/** Deliveries go only to this test's own admin (never to admins created by other test files). */
function depsFor(recipients: string[], email: EnquiryDeps["sendSupportEmail"] = vi.fn(async () => false)): EnquiryDeps {
  return { findRecipients: async () => recipients, sendSupportEmail: email };
}

describe("submitSchoolEnquiry (integration)", () => {
  it("notifies platform admins in-app with a plain-text summary and returns a reference", async () => {
    const { user: admin } = await createUser({ roles: ["ADMIN"] });
    const enquiry = input();
    const { reference } = await submitSchoolEnquiry(enquiry, { ip: testIp() }, depsFor([admin.id]));
    expect(reference).toMatch(/^SE-[0-9A-F]{8}$/);
    const notifications = await db.notification.findMany({ where: { userId: admin.id, type: "system.school_enquiry" } });
    expect(notifications).toHaveLength(1);
    expect(notifications[0]).toMatchObject({ category: "SYSTEM", title: `School enquiry: ${enquiry.schoolName}` });
    expect(notifications[0]?.body).toContain(`Reference: ${reference}`);
    expect(notifications[0]?.body).toContain(enquiry.email);
    expect(notifications[0]?.data).toMatchObject({ href: "/admin/schools", reference });
  });

  it("does not notify twice for a double submit on the same day", async () => {
    const { user: admin } = await createUser({ roles: ["SUPER_ADMIN"] });
    const enquiry = input();
    await submitSchoolEnquiry(enquiry, { ip: testIp() }, depsFor([admin.id]));
    await submitSchoolEnquiry(enquiry, { ip: testIp() }, depsFor([admin.id]));
    expect(await db.notification.count({ where: { userId: admin.id, type: "system.school_enquiry" } })).toBe(1);
  });

  it("emails the support inbox when configured, even without admin recipients", async () => {
    const send = vi.fn<EnquiryDeps["sendSupportEmail"]>(async () => true);
    const enquiry = input();
    await submitSchoolEnquiry(enquiry, { ip: testIp() }, depsFor([], send));
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0]).toBe(`School enquiry: ${enquiry.schoolName}`);
    expect(send.mock.calls[0]?.[1]).toContain("Approximate learners: 420");
  });

  it("fails loudly when there is nowhere to deliver the enquiry", async () => {
    await expect(submitSchoolEnquiry(input(), { ip: testIp() }, depsFor([]))).rejects.toMatchObject({ code: "INTERNAL" });
  });

  it("returns field errors for invalid input", async () => {
    await expect(submitSchoolEnquiry(input({ email: "nope", consent: false }), { ip: testIp() }, depsFor([]))).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { email: expect.any(Array), consent: expect.any(Array) },
    });
  });

  it("silently drops honeypot submissions", async () => {
    const { user: admin } = await createUser({ roles: ["ADMIN"] });
    const send = vi.fn<EnquiryDeps["sendSupportEmail"]>(async () => true);
    const { reference } = await submitSchoolEnquiry(input({ website: "http://spam.test" }), { ip: testIp() }, depsFor([admin.id], send));
    expect(reference).toMatch(/^SE-/);
    expect(send).not.toHaveBeenCalled();
    expect(await db.notification.count({ where: { userId: admin.id } })).toBe(0);
  });

  it("rate-limits repeated enquiries from one email address", async () => {
    const { user: admin } = await createUser({ roles: ["ADMIN"] });
    const email = uniqueEmail("busy");
    for (let i = 0; i < 3; i += 1) {
      await submitSchoolEnquiry(input({ email, schoolName: `School ${i} ${randomInt(0, 1_000_000)}` }), { ip: testIp() }, depsFor([admin.id]));
    }
    await expect(submitSchoolEnquiry(input({ email }), { ip: testIp() }, depsFor([admin.id]))).rejects.toMatchObject({ code: "RATE_LIMITED" });
  });
});
