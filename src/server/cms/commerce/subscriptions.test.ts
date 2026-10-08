import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { clearEntitlementCaches, getEntitlements } from "@/server/billing/entitlements";
import { createPaidPlan } from "@/server/billing/testing";
import { db } from "@/server/db";
import { createSchool, createStudent, createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import {
  cancelSubscriptionAsStaff,
  extendSubscription,
  getSubscriptionDetail,
  listSubscriptions,
  resumeSubscriptionAsStaff,
  revokeStaffGrant,
} from "./subscriptions";

/** Subscription admin against Postgres: billing state machine, staff grants as extensions, audit trail. */

const DAY = 86_400_000;

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

async function activeSubscription(options: { periodEndsInDays?: number } = {}) {
  const { plan, price } = await createPaidPlan();
  const { user: student } = await createStudent();
  const now = Date.now();
  const subscription = await db.subscription.create({
    data: {
      planId: plan.id,
      planPriceId: price.id,
      holderUserId: student.id,
      status: "ACTIVE",
      startedAt: new Date(now - DAY),
      currentPeriodStart: new Date(now - DAY),
      currentPeriodEnd: new Date(now + (options.periodEndsInDays ?? 29) * DAY),
    },
    select: { id: true, currentPeriodEnd: true },
  });
  return { plan, price, student, subscription };
}

async function schoolSubscription() {
  const code = `S${randomUUID().replace(/-/g, "").slice(0, 14).toUpperCase()}`;
  const plan = await db.plan.create({ data: { code, name: `School ${code}`, audience: "SCHOOL", isPublic: false, entitlements: NO_ENTITLEMENTS }, select: { id: true } });
  const { school } = await createSchool({ status: "ACTIVE" });
  const now = Date.now();
  const subscription = await db.subscription.create({
    data: { planId: plan.id, schoolId: school.id, seats: 30, status: "ACTIVE", source: "SCHOOL_CONTRACT", startedAt: new Date(now), currentPeriodStart: new Date(now), currentPeriodEnd: new Date(now + 90 * DAY) },
    select: { id: true },
  });
  return { school, subscription };
}

describe("subscription lists and details", () => {
  it("searches by holder and filters by status and holder kind; editors are refused", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { student, subscription, plan } = await activeSubscription();
    const { school, subscription: schoolSub } = await schoolSubscription();

    const byHolder = await listSubscriptions(admin, { q: student.id });
    expect(byHolder.items.map((item) => item.id)).toEqual([subscription.id]);
    expect(byHolder.items[0]).toMatchObject({ status: "ACTIVE", plan: { id: plan.id }, holder: { kind: "user", id: student.id, name: "Test" } });

    const bySchool = await listSubscriptions(admin, { q: school.name, holder: "school" });
    expect(bySchool.items.map((item) => item.id)).toEqual([schoolSub.id]);
    expect(bySchool.items[0]?.holder).toMatchObject({ kind: "school", id: school.id });

    expect((await listSubscriptions(admin, { q: student.id, status: "CANCELLED" })).items).toEqual([]);
    expect((await listSubscriptions(admin, { planId: plan.id })).items.map((item) => item.id)).toEqual([subscription.id]);

    await expect(listSubscriptions(await actorWith(["CONTENT_EDITOR"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(listSubscriptions(admin, { cursor: "garbage" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("shows access, payments, grants and allowed actions", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { subscription, student } = await activeSubscription();
    const detail = await getSubscriptionDetail(admin, subscription.id);
    expect(detail.access.live).toBe(true);
    expect(detail.holder).toMatchObject({ kind: "user", id: student.id });
    expect(detail.actions).toEqual({ cancelAtPeriodEnd: true, cancelNow: true, resume: false, extend: true });
    expect(detail.payments).toEqual([]);
    await expect(getSubscriptionDetail(admin, randomUUID())).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});

describe("cancel and resume (billing state machine, audited)", () => {
  it("needs a reason; cancels at period end, resumes, then ends access now", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { subscription } = await activeSubscription();
    await expect(cancelSubscriptionAsStaff(admin, { subscriptionId: subscription.id, mode: "now", reason: "" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { reason: expect.any(Array) },
    });

    const atEnd = await cancelSubscriptionAsStaff(admin, { subscriptionId: subscription.id, mode: "period_end", reason: "Family asked to stop renewal" });
    expect(atEnd).toMatchObject({ changed: true, status: "ACTIVE", cancelAtPeriodEnd: true });
    expect((await getSubscriptionDetail(admin, subscription.id)).actions.resume).toBe(true);

    const resumed = await resumeSubscriptionAsStaff(admin, { subscriptionId: subscription.id });
    expect(resumed).toMatchObject({ changed: true, cancelAtPeriodEnd: false });

    const now = await cancelSubscriptionAsStaff(admin, { subscriptionId: subscription.id, mode: "now", reason: "Chargeback confirmed by the bank" });
    expect(now).toMatchObject({ changed: true, status: "CANCELLED" });
    await expect(cancelSubscriptionAsStaff(admin, { subscriptionId: subscription.id, mode: "now", reason: "Again, by mistake" })).rejects.toMatchObject({ code: "CONFLICT" });

    const audits = await db.auditLog.findMany({ where: { entityType: "Subscription", entityId: subscription.id }, orderBy: { createdAt: "asc" } });
    expect(audits.map((entry) => [entry.action, (entry.metadata as { operation: string }).operation])).toEqual([
      ["subscription.cancel", "subscription.cancel_at_period_end"],
      ["subscription.resume", "subscription.resume"],
      ["subscription.cancel", "subscription.cancel_now"],
    ]);
    expect(audits[2]?.reason).toBe("Chargeback confirmed by the bank");
    expect(audits.every((entry) => entry.actorUserId === admin.userId)).toBe(true);
  });
});

describe("extensions are attributed grants", () => {
  it("chains grants after the paid period, audits them and refuses school subscriptions", async () => {
    clearEntitlementCaches();
    const admin = await actorWith(["ADMIN"]);
    const { subscription, student, plan } = await activeSubscription({ periodEndsInDays: 10 });
    const first = await extendSubscription(admin, { subscriptionId: subscription.id, days: "7", reason: "Outage compensation (ticket 4411)", source: "COMPENSATION" });
    expect(first.startsAt.getTime()).toBe(subscription.currentPeriodEnd?.getTime());
    expect(first.endsAt.getTime() - first.startsAt.getTime()).toBe(7 * DAY);
    const second = await extendSubscription(admin, { subscriptionId: subscription.id, days: 3, reason: "Goodwill after a billing error" });
    expect(second.startsAt.getTime()).toBe(first.endsAt.getTime());

    const grant = await db.entitlementGrant.findUniqueOrThrow({ where: { id: first.grantId } });
    expect(grant).toMatchObject({ userId: student.id, planId: plan.id, source: "COMPENSATION", grantedById: admin.userId, reason: "Outage compensation (ticket 4411)" });
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "EntitlementGrant", entityId: first.grantId } });
    expect(audit).toMatchObject({ action: "subscription.extend", targetUserId: student.id, reason: "Outage compensation (ticket 4411)" });
    expect(audit.metadata).toMatchObject({ operation: "subscription.extend", subscriptionId: subscription.id });

    const detail = await getSubscriptionDetail(admin, subscription.id);
    expect(detail.grants.map((row) => row.id).sort()).toEqual([first.grantId, second.grantId].sort());
    expect(detail.grants.every((row) => row.revocable && !row.live)).toBe(true);

    await expect(extendSubscription(admin, { subscriptionId: subscription.id, days: 0, reason: "Too short a grant" })).rejects.toMatchObject({
      fieldErrors: { days: expect.any(Array) },
    });
    const { subscription: schoolSub } = await schoolSubscription();
    await expect(extendSubscription(admin, { subscriptionId: schoolSub.id, days: 5, reason: "School asked for more" })).rejects.toMatchObject({ code: "VALIDATION" });

    // After the subscription ends, an extension grant starts now and gives the plan's entitlements.
    await cancelSubscriptionAsStaff(admin, { subscriptionId: subscription.id, mode: "now", reason: "Testing access through grants" });
    await revokeStaffGrant(admin, { grantId: first.grantId, reason: "Replaced by a new grant" });
    await revokeStaffGrant(admin, { grantId: second.grantId, reason: "Replaced by a new grant" });
    const third = await extendSubscription(admin, { subscriptionId: subscription.id, days: 2, reason: "Access while the refund settles" });
    expect(Math.abs(third.startsAt.getTime() - Date.now())).toBeLessThan(60_000);
    const resolved = await getEntitlements(student.id);
    expect(resolved.entitlements.mockExams).toBe(true);
  });

  it("PAY-8: staff never extend a subscription they hold or pay for (no self-grants)", async () => {
    const { subscription, student } = await activeSubscription();
    // A staff session acting on the subscription it holds itself.
    const self: CmsActor = { kind: "user", userId: student.id, roles: ["ADMIN"] };
    await expect(extendSubscription(self, { subscriptionId: subscription.id, days: 366, reason: "Free year for myself" })).rejects.toMatchObject({ code: "FORBIDDEN" });

    // A staff member paying for the subscription (e.g. a parent).
    const payerAdmin = await actorWith(["ADMIN"]);
    await db.subscription.update({ where: { id: subscription.id }, data: { payerUserId: payerAdmin.userId } });
    await expect(extendSubscription(payerAdmin, { subscriptionId: subscription.id, days: 30, reason: "Extension for my child" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(await db.entitlementGrant.count({ where: { userId: student.id, source: { in: ["ADMIN", "COMPENSATION"] } } })).toBe(0);

    // Another admin may.
    await expect(extendSubscription(await actorWith(["ADMIN"]), { subscriptionId: subscription.id, days: 3, reason: "Outage compensation" })).resolves.toMatchObject({
      grantId: expect.any(String),
    });
  });

  it("revokes staff grants only, once, with a reason", async () => {
    const admin = await actorWith(["SUPER_ADMIN"]);
    const { subscription, student, plan } = await activeSubscription();
    const { grantId } = await extendSubscription(admin, { subscriptionId: subscription.id, days: 5, reason: "Support goodwill credit" });
    await expect(revokeStaffGrant(admin, { grantId, reason: "" })).rejects.toMatchObject({ code: "VALIDATION" });
    await revokeStaffGrant(admin, { grantId, reason: "Granted to the wrong account" });
    await expect(revokeStaffGrant(admin, { grantId, reason: "Granted to the wrong account" })).rejects.toMatchObject({ code: "CONFLICT" });
    const revoked = await db.entitlementGrant.findUniqueOrThrow({ where: { id: grantId } });
    expect(revoked).toMatchObject({ revokedById: admin.userId, revokeReason: "Granted to the wrong account" });
    expect(await db.auditLog.count({ where: { entityType: "EntitlementGrant", entityId: grantId, action: "entitlement.revoke" } })).toBe(1);

    const referral = await db.entitlementGrant.create({ data: { userId: student.id, source: "REFERRAL", planId: plan.id, endsAt: new Date(Date.now() + 5 * DAY) }, select: { id: true } });
    await expect(revokeStaffGrant(admin, { grantId: referral.id, reason: "Not a staff grant at all" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(revokeStaffGrant(await actorWith(["CONTENT_EDITOR"]), { grantId: referral.id, reason: "Editors cannot do this" })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });
});
