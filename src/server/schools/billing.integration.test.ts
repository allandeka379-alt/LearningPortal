import { describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { createClass, createUser, uniqueCode } from "../../../tests/factories/index";
import { getSchoolSubscription, requestSchoolPlan } from "./billing";
import { getSchoolDashboard } from "./dashboard";
import { actorOf, errorCodeOf, schoolWithAdmin, studentOf, teacherOf } from "./testing";

/**
 * School subscription page (seats vs students, plans from the database, "Request a school plan" notifying platform
 * admins) and the /school dashboard (analytics + setup gaps). Negative cases: another school's admin, a teacher,
 * a school awaiting verification (no billing yet), the request rate limit.
 */

/**
 * A public SCHOOL plan with a seat price. `first: true` places it ahead of every existing school plan (the page lists the
 * first 10 by sort order, and the plan table keeps every earlier run's plans), so the test can find its OWN plan.
 */
async function schoolPlan(options: { first?: boolean } = {}) {
  let sortOrder = 0;
  if (options.first) {
    const lowest = await db.plan.aggregate({ where: { audience: "SCHOOL" }, _min: { sortOrder: true } });
    sortOrder = Math.min(0, lowest._min.sortOrder ?? 0) - 1 - Math.floor(Math.random() * 1_000);
  }
  const plan = await db.plan.create({
    data: { code: uniqueCode("SCH"), name: "School plan", audience: "SCHOOL", entitlements: { version: 1, features: {}, limits: {} }, isPublic: true, isActive: true, highlights: ["Teacher dashboard"], sortOrder },
  });
  await db.planPrice.create({ data: { planId: plan.id, currency: "USD", amountMinor: 300, interval: "TERM", periodDays: 90, perSeat: true, minSeats: 20 } });
  return plan;
}

describe("school subscription", () => {
  it("shows the live subscription with seats used vs purchased", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const plan = await schoolPlan({ first: true });
    const a = await studentOf(school.id);
    await studentOf(school.id);
    const sub = await db.subscription.create({
      data: { planId: plan.id, schoolId: school.id, seats: 25, status: "ACTIVE", source: "SCHOOL_CONTRACT", startedAt: new Date(), currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 60 * 86_400_000) },
    });
    await db.entitlementGrant.create({ data: { userId: a.user.id, source: "SCHOOL_SEAT", subscriptionId: sub.id, planId: plan.id } });
    const summary = await getSchoolSubscription(adminActor!, school.id);
    expect(summary.billingAvailable).toBe(true);
    expect(summary.live).toMatchObject({ id: sub.id, planName: "School plan", status: "ACTIVE", seats: { purchased: 25, allocated: 1, available: 24, studentsWithoutSeat: 1 } });
    expect(summary.activeStudents).toBe(2);
    expect(summary.plans.find((p) => p.id === plan.id)?.prices[0]).toMatchObject({ amountMinor: 300, perSeat: true, interval: "TERM" });
  });

  it("without a subscription, a plan request notifies platform admins (rate limited, audited)", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const staff = (await createUser({ roles: ["ADMIN"] })).user;
    const plan = await schoolPlan();
    const before = await getSchoolSubscription(adminActor!, school.id);
    expect(before.live).toBeNull();
    expect(before.lastRequest).toBeNull();

    const result = await requestSchoolPlan(adminActor!, { schoolId: school.id, planId: plan.id, seats: 120, message: "Please call the bursar." });
    expect(result.notified).toBeGreaterThanOrEqual(1);
    // Every platform admin is notified of every school's request: look for THIS school's notice only.
    const notice = await db.notification.findFirst({
      where: { userId: staff.id, type: "billing.school_plan_request", data: { path: ["entityId"], equals: school.id } },
    });
    expect(notice).toMatchObject({ category: "BILLING" });
    expect(notice?.body).toContain("120 students");
    expect(notice?.data).toMatchObject({ href: `/admin/schools/${school.id}` });
    const after = await getSchoolSubscription(adminActor!, school.id);
    expect(after.lastRequest).toMatchObject({ seats: 120 });

    await requestSchoolPlan(adminActor!, { schoolId: school.id, seats: 10 });
    await requestSchoolPlan(adminActor!, { schoolId: school.id, seats: 10 });
    expect(await errorCodeOf(requestSchoolPlan(adminActor!, { schoolId: school.id, seats: 10 }))).toBe("RATE_LIMITED");
    expect(await errorCodeOf(requestSchoolPlan(adminActor!, { schoolId: school.id, seats: 0 }))).toBe("VALIDATION");
  });

  it("is refused to other schools and teachers; a school awaiting verification has no billing yet", async () => {
    const { school } = await schoolWithAdmin();
    const other = await schoolWithAdmin();
    expect(await errorCodeOf(getSchoolSubscription(other.adminActor!, school.id))).toBe("FORBIDDEN");
    expect(await errorCodeOf(requestSchoolPlan(other.adminActor!, { schoolId: school.id, seats: 5 }))).toBe("FORBIDDEN");
    const teacher = await teacherOf(school.id);
    expect(await errorCodeOf(getSchoolSubscription(await actorOf(teacher.user.id), school.id))).toBe("FORBIDDEN");
    const pending = await schoolWithAdmin({ status: "PENDING_VERIFICATION" });
    expect((await getSchoolSubscription(pending.adminActor!, pending.school.id)).billingAvailable).toBe(false);
  });
});

describe("school dashboard", () => {
  it("combines analytics, seats and setup gaps for the admin's own school", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const teacher = await teacherOf(school.id);
    const placed = await studentOf(school.id);
    await studentOf(school.id);
    await createClass({ schoolId: school.id, createdById: teacher.user.id, studentUserIds: [placed.user.id] });
    await createClass({ schoolId: school.id, createdById: teacher.user.id, teacherUserIds: [] });
    const today = localDateString(new Date(), school.timezone);
    const dashboard = await getSchoolDashboard(adminActor!, { schoolId: school.id, from: addDays(today, -29), to: today });
    expect(dashboard.school.schoolId).toBe(school.id);
    expect(dashboard.analytics.roster).toEqual({ students: 2, teachers: 1, classes: 2 });
    expect(dashboard.setup).toMatchObject({ classes: 2, classesWithoutTeacher: 1, studentsWithoutClass: 1, teachers: 1, subjects: 0 });
    expect(dashboard.seats).toBeNull();
    expect(dashboard.analytics.engagement.daily).toHaveLength(30);

    const other = await schoolWithAdmin();
    expect(await errorCodeOf(getSchoolDashboard(other.adminActor!, { schoolId: school.id, from: addDays(today, -6), to: today }))).toBe("FORBIDDEN");
  });
});
