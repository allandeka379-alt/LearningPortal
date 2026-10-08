import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { PlanAudience, Role } from "@/generated/prisma/client";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { createStudent, createUser, uniqueCode } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import { createPromoCode, deletePromoCode, getPromoCode, listPromoCodes, promoState, promoValueColumns, updatePromoCode } from "./promo-codes";

/** Promo code admin against Postgres (PromoCode_* CHECKs), with unique codes per test. */

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

async function createPlan(audience: PlanAudience = "INDIVIDUAL") {
  const code = `P${randomUUID().replace(/-/g, "").slice(0, 14).toUpperCase()}`;
  return db.plan.create({ data: { code, name: `Plan ${code}`, audience, isPublic: false, entitlements: NO_ENTITLEMENTS }, select: { id: true } });
}

describe("pure helpers", () => {
  it("derives states and keeps only the value columns of the discount type", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    expect(promoState({ isActive: false, validFrom: now, validTo: null }, now)).toBe("inactive");
    expect(promoState({ isActive: true, validFrom: new Date("2026-10-06T00:00:00Z"), validTo: null }, now)).toBe("scheduled");
    expect(promoState({ isActive: true, validFrom: new Date("2026-01-01T00:00:00Z"), validTo: now }, now)).toBe("expired");
    expect(promoState({ isActive: true, validFrom: new Date("2026-01-01T00:00:00Z"), validTo: null }, now)).toBe("active");
    expect(promoValueColumns({ code: "X1Y", discountType: "PERCENT", percentOff: 20, amountOff: 500, currency: "USD", freeDays: 3 })).toEqual({
      code: "X1Y",
      discountType: "PERCENT",
      percentOff: 20,
      amountOffMinor: null,
      currency: null,
      freeDays: null,
      grantPlanId: null,
    });
  });
});

describe("create and list", () => {
  it("creates codes of each type within the CHECKs and lists them by code and state", async () => {
    const admin = await actorWith(["ADMIN"]);
    const plan = await createPlan();
    const percent = await createPromoCode(admin, { code: ` ${uniqueCode("pct").toLowerCase()} `, discountType: "PERCENT", percentOff: "25", planIds: [plan.id], maxRedemptions: "100" });
    expect(percent.code).toMatch(/^PCT[0-9A-F]{8}$/);
    const fixed = await createPromoCode(admin, { code: uniqueCode("FIX"), discountType: "FIXED_AMOUNT", amountOff: "1.50", currency: "usd", description: "Radio campaign" });
    const free = await createPromoCode(admin, { code: uniqueCode("FREE"), discountType: "FREE_DAYS", freeDays: "14", grantPlanId: plan.id, newCustomersOnly: true, isActive: false });

    const rows = await db.promoCode.findMany({ where: { id: { in: [percent.id, fixed.id, free.id] } } });
    const byId = new Map(rows.map((row) => [row.id, row]));
    expect(byId.get(percent.id)).toMatchObject({ percentOff: 25, amountOffMinor: null, maxRedemptions: 100, createdById: admin.userId });
    expect(byId.get(fixed.id)).toMatchObject({ amountOffMinor: 150, currency: "USD", percentOff: null });
    expect(byId.get(free.id)).toMatchObject({ freeDays: 14, grantPlanId: plan.id, newCustomersOnly: true, isActive: false });
    expect(await db.promoCodePlan.count({ where: { promoCodeId: percent.id, planId: plan.id } })).toBe(1);

    const listed = await listPromoCodes(admin, { q: percent.code });
    expect(listed.items).toHaveLength(1);
    expect(listed.items[0]).toMatchObject({ id: percent.id, state: "active", planCount: 1, usedUp: false });
    expect((await listPromoCodes(admin, { q: free.code, state: "inactive" })).items.map((item) => item.id)).toEqual([free.id]);
    expect((await listPromoCodes(admin, { q: free.code, state: "active" })).items).toEqual([]);

    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "PromoCode", entityId: fixed.id } });
    expect(audit).toMatchObject({ action: "promo_code.create", actorUserId: admin.userId });
  });

  it("validates per discount type, plan audiences and duplicate codes", async () => {
    const admin = await actorWith(["ADMIN"]);
    const schoolPlan = await createPlan("SCHOOL");
    const code = uniqueCode("DUP");
    await expect(createPromoCode(admin, { code, discountType: "PERCENT", percentOff: "100" })).rejects.toMatchObject({ fieldErrors: { percentOff: expect.any(Array) } });
    await expect(createPromoCode(admin, { code, discountType: "PERCENT" })).rejects.toMatchObject({ fieldErrors: { percentOff: expect.any(Array) } });
    await expect(createPromoCode(admin, { code, discountType: "FIXED_AMOUNT", amountOff: "2" })).rejects.toMatchObject({ fieldErrors: { currency: expect.any(Array) } });
    await expect(createPromoCode(admin, { code, discountType: "FREE_DAYS", freeDays: "5" })).rejects.toMatchObject({ fieldErrors: { grantPlanId: expect.any(Array) } });
    await expect(createPromoCode(admin, { code, discountType: "FREE_DAYS", freeDays: "5", grantPlanId: schoolPlan.id })).rejects.toMatchObject({
      fieldErrors: { grantPlanId: expect.any(Array) },
    });
    await expect(createPromoCode(admin, { code: "a!", discountType: "PERCENT", percentOff: 10 })).rejects.toMatchObject({ fieldErrors: { code: expect.any(Array) } });
    await expect(
      createPromoCode(admin, { code, discountType: "PERCENT", percentOff: 10, validFrom: "2027-01-02T10:00", validTo: "2027-01-01T10:00" }),
    ).rejects.toMatchObject({ fieldErrors: { validTo: expect.any(Array) } });
    await expect(createPromoCode(admin, { code, discountType: "PERCENT", percentOff: 10, audience: "INDIVIDUAL", planIds: [schoolPlan.id] })).rejects.toMatchObject({
      fieldErrors: { planIds: expect.any(Array) },
    });
    await createPromoCode(admin, { code, discountType: "PERCENT", percentOff: 10 });
    await expect(createPromoCode(admin, { code: code.toLowerCase(), discountType: "PERCENT", percentOff: 15 })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { code: expect.any(Array) },
    });
    await expect(createPromoCode(await actorWith(["CONTENT_EDITOR"]), { code: uniqueCode("ED"), discountType: "PERCENT", percentOff: 10 })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });
});

describe("update and delete", () => {
  it("edits an unused code freely and freezes the discount once it has been used", async () => {
    const admin = await actorWith(["ADMIN"]);
    const [planA, planB] = await Promise.all([createPlan(), createPlan()]);
    const created = await createPromoCode(admin, { code: uniqueCode("EDIT"), discountType: "PERCENT", percentOff: 10, planIds: [planA.id] });
    let detail = await getPromoCode(admin, created.id);
    expect(detail.used).toBe(false);

    const first = await updatePromoCode(admin, {
      promoCodeId: created.id,
      expectedUpdatedAt: detail.updatedAt.toISOString(),
      code: created.code,
      discountType: "PERCENT",
      percentOff: "20",
      description: "Back to school",
      maxRedemptions: "50",
      planIds: [planB.id],
    });
    expect(first.changed.sort()).toEqual(["description", "maxRedemptions", "percentOff", "planIds"].sort());
    detail = await getPromoCode(admin, created.id);
    expect(detail).toMatchObject({ percentOff: 20, description: "Back to school", maxRedemptions: 50, plans: [{ id: planB.id }] });
    await expect(
      updatePromoCode(admin, { promoCodeId: created.id, expectedUpdatedAt: new Date(0).toISOString(), planIds: [] }),
    ).rejects.toMatchObject({ code: "CONFLICT" });

    // Used once: the discount is frozen, the rules are not.
    const { user: student } = await createStudent();
    await db.promoRedemption.create({ data: { promoCodeId: created.id, userId: student.id, status: "APPLIED", appliedAt: new Date(), discountMinor: 100, currency: "USD" } });
    await db.promoCode.update({ where: { id: created.id }, data: { redeemedCount: 1 } });
    detail = await getPromoCode(admin, created.id);
    expect(detail.used).toBe(true);
    expect(detail.redemptionCounts).toEqual({ RESERVED: 0, APPLIED: 1, RELEASED: 0 });
    expect(detail.recentRedemptions[0]).toMatchObject({ userId: student.id, status: "APPLIED" });

    await expect(
      updatePromoCode(admin, { promoCodeId: created.id, expectedUpdatedAt: detail.updatedAt.toISOString(), percentOff: 30, description: "Back to school", maxRedemptions: 50, planIds: [planB.id] }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { percentOff: expect.any(Array) } });
    await expect(
      updatePromoCode(admin, { promoCodeId: created.id, expectedUpdatedAt: detail.updatedAt.toISOString(), description: "x", maxRedemptions: "0", planIds: [] }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    const rules = await updatePromoCode(admin, {
      promoCodeId: created.id,
      expectedUpdatedAt: detail.updatedAt.toISOString(),
      description: "Back to school (closed)",
      maxRedemptions: "50",
      planIds: [planB.id],
      isActive: false,
    });
    expect(rules.changed.sort()).toEqual(["description", "isActive"]);

    await expect(deletePromoCode(admin, { promoCodeId: created.id })).rejects.toMatchObject({ code: "CONFLICT" });
    const audits = await db.auditLog.findMany({ where: { entityType: "PromoCode", entityId: created.id }, orderBy: { createdAt: "asc" } });
    expect(audits.map((entry) => (entry.metadata as { operation: string }).operation)).toEqual(["promo_code.create", "promo_code.update", "promo_code.update"]);
  });

  it("deletes an unused code with an audit entry", async () => {
    const admin = await actorWith(["SUPER_ADMIN"]);
    const plan = await createPlan();
    const created = await createPromoCode(admin, { code: uniqueCode("DEL"), discountType: "PERCENT", percentOff: 5, planIds: [plan.id] });
    expect(await deletePromoCode(admin, { promoCodeId: created.id, reason: "Typo in the campaign code" })).toEqual({ code: created.code });
    expect(await db.promoCode.findUnique({ where: { id: created.id } })).toBeNull();
    expect(await db.promoCodePlan.count({ where: { promoCodeId: created.id } })).toBe(0);
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "PromoCode", entityId: created.id, action: "promo_code.delete" }, orderBy: { createdAt: "desc" } });
    expect(audit).toMatchObject({ reason: "Typo in the campaign code" });
    expect(audit.metadata).toMatchObject({ operation: "promo_code.delete" });
    await expect(deletePromoCode(admin, { promoCodeId: created.id })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
