import { beforeEach, describe, expect, it } from "vitest";
import type { Prisma, SubscriptionStatus } from "@/generated/prisma/client";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import {
  createParent,
  createSchool,
  createSchoolMember,
  createStudent,
  createTeacher,
  createUser,
  uniqueCode,
  uniqueSlug,
} from "../../../tests/factories/index";
import { createQuestionContext } from "../../../tests/factories/questions";
import {
  EntitlementRequiredError,
  allocateSchoolSeat,
  assertEntitlement,
  canAccessSubjectContent,
  clearEntitlementCaches,
  getEntitlements,
  getSubjectEntitlements,
  hasEntitlement,
  invalidateEntitlements,
  normalizeEntitlementDocument,
  releaseStaleSchoolSeats,
  hasStudentAppAccess,
} from "./entitlements";

/**
 * Entitlement resolution against Postgres (shared, never-truncated test DB): every fixture is unique and assertions
 * only look at rows created here. The default (FREE) plan is shared: whatever it contains, results are compared with
 * its parsed entitlements rather than with hard-coded values.
 */

const DAY = 86_400_000;

const FREE_FALLBACK: Entitlements = { ...NO_ENTITLEMENTS, practiceQuestionsPerDay: 15, dailyQuestion: true, aiTutor: true, aiMessagesPerDay: 3 };

/** Nested registry shape on purpose: exercises document normalisation from a real Json column. */
const STUDENT_DOC = {
  version: 1,
  lessonAccess: "ALL",
  aiModelTier: "STANDARD",
  features: { mock_exams: true, flashcards: true, study_plan: true, ai_tutor: true },
  limits: { "practice.questionsPerDay": null, "ai.messagesPerDay": 30, "mock_exams.perMonth": null },
};

const SCHOOL_DOC: Entitlements = {
  ...NO_ENTITLEMENTS,
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  teacherDashboard: true,
  studentManagement: true,
  assignments: true,
  schoolAnalytics: true,
};

async function ensureDefaultPlan(): Promise<{ code: string; entitlements: Entitlements }> {
  const select = { code: true, entitlements: true } as const;
  const find = async () =>
    (await db.plan.findFirst({ where: { isDefault: true, isActive: true }, select })) ??
    (await db.plan.findFirst({ where: { code: "FREE", isActive: true }, select }));
  let plan = await find();
  if (!plan) {
    try {
      plan = await db.plan.create({
        data: { code: "FREE", name: "Free", audience: "INDIVIDUAL", isDefault: true, entitlements: FREE_FALLBACK },
        select,
      });
    } catch (error) {
      plan = await find(); // another test file created it concurrently
      if (!plan) throw error;
    }
  }
  return { code: plan.code, entitlements: normalizeEntitlementDocument(plan.entitlements).entitlements };
}

async function createPlan(entitlements: Prisma.InputJsonValue, audience: "INDIVIDUAL" | "SCHOOL" = "INDIVIDUAL") {
  const code = uniqueCode("T");
  return db.plan.create({ data: { code, name: `Test ${code}`, audience, isPublic: false, entitlements }, select: { id: true, code: true } });
}

async function createSubscription(options: {
  planId: string;
  status: SubscriptionStatus;
  periodEnd: Date;
  holderUserId?: string;
  payerUserId?: string;
  schoolId?: string;
  seats?: number;
}) {
  const start = new Date(options.periodEnd.getTime() - 30 * DAY);
  const ended = options.status === "EXPIRED" || options.status === "CANCELLED";
  return db.subscription.create({
    data: {
      planId: options.planId,
      holderUserId: options.holderUserId ?? null,
      payerUserId: options.payerUserId ?? null,
      schoolId: options.schoolId ?? null,
      seats: options.schoolId ? (options.seats ?? 10) : null,
      status: options.status,
      startedAt: start,
      currentPeriodStart: start,
      currentPeriodEnd: options.periodEnd,
      cancelledAt: options.status === "CANCELLED" ? options.periodEnd : null,
      endedAt: ended ? options.periodEnd : null,
    },
    select: { id: true },
  });
}

async function activeSeats(subscriptionId: string): Promise<number> {
  return db.entitlementGrant.count({ where: { subscriptionId, source: "SCHOOL_SEAT", revokedAt: null } });
}

beforeEach(() => {
  clearEntitlementCaches();
});

describe("getEntitlements: sources", () => {
  it("a student with no paid source gets exactly the default (FREE) plan, looked up from the database", async () => {
    const free = await ensureDefaultPlan();
    const { user } = await createStudent();
    const resolved = await getEntitlements(user.id);
    expect(resolved.entitlements).toEqual(free.entitlements);
    expect(resolved.planCode).toBe(free.code);
    expect(resolved.sources.map((s) => s.kind)).toEqual(["FREE_PLAN"]);
    expect(resolved.scoped).toEqual([]);
    // No free tier (2026-10-12): the default plan alone opens the student area only if an admin gave it every lesson.
    await expect(hasStudentAppAccess(user.id)).resolves.toBe(free.entitlements.lessonAccess === "ALL");
    if (!free.entitlements.teacherDashboard) {
      await expect(assertEntitlement({ userId: user.id }, "teacher_dashboard")).rejects.toBeInstanceOf(EntitlementRequiredError);
    }
  });

  it("an ACTIVE STUDENT subscription paid by a parent unlocks the plan for the student only", async () => {
    const free = await ensureDefaultPlan();
    const plan = await createPlan(STUDENT_DOC);
    const { user: student } = await createStudent();
    const { user: parent } = await createParent();
    const sub = await createSubscription({
      planId: plan.id,
      holderUserId: student.id,
      payerUserId: parent.id,
      status: "ACTIVE",
      periodEnd: new Date(Date.now() + 20 * DAY),
    });

    const resolved = await getEntitlements(student.id);
    expect(resolved.planCode).toBe(plan.code);
    expect(resolved.entitlements).toMatchObject({
      lessonAccess: "ALL",
      mockExams: true,
      flashcards: true,
      studyPlan: true,
      practiceQuestionsPerDay: null,
    });
    expect(resolved.entitlements.aiMessagesPerDay === null || resolved.entitlements.aiMessagesPerDay >= 30).toBe(true);
    expect(resolved.sources).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: "SUBSCRIPTION", id: sub.id, planCode: plan.code })]),
    );
    expect(resolved.validUntil).not.toBeNull();
    await expect(assertEntitlement({ userId: student.id }, "mock_exams")).resolves.toMatchObject({ mockExams: true });

    const { subjectId } = await createQuestionContext({ topics: 1 });
    await expect(canAccessSubjectContent(student.id, subjectId)).resolves.toBe(true);

    const parentResolved = await getEntitlements(parent.id);
    expect(parentResolved.planCode).toBe(free.code);
    expect(parentResolved.entitlements).toEqual(free.entitlements);
  });

  it("expired subscriptions fall back to FREE, including an ACTIVE row whose period and grace have passed", async () => {
    const free = await ensureDefaultPlan();
    const plan = await createPlan(STUDENT_DOC);
    const { user: expired } = await createStudent();
    const { user: lapsed } = await createStudent();
    const { user: inGrace } = await createStudent();
    await createSubscription({ planId: plan.id, holderUserId: expired.id, status: "EXPIRED", periodEnd: new Date(Date.now() - 5 * DAY) });
    // The lifecycle job has not run yet: status still says ACTIVE, but time says otherwise.
    await createSubscription({ planId: plan.id, holderUserId: lapsed.id, status: "ACTIVE", periodEnd: new Date(Date.now() - 30 * DAY) });
    await createSubscription({ planId: plan.id, holderUserId: inGrace.id, status: "PAST_DUE", periodEnd: new Date(Date.now() - 3_600_000) });

    for (const user of [expired, lapsed]) {
      const resolved = await getEntitlements(user.id);
      expect(resolved.entitlements).toEqual(free.entitlements);
      expect(resolved.planCode).toBe(free.code);
    }
    const grace = await getEntitlements(inGrace.id);
    expect(grace.entitlements.mockExams).toBe(true);
    expect(grace.planCode).toBe(plan.code);
  });

  it("grants merge with subscriptions (most generous wins); expired and revoked grants are ignored", async () => {
    await ensureDefaultPlan();
    const plan = await createPlan(STUDENT_DOC);
    const { user: staff } = await createUser({ roles: ["ADMIN"] });
    const { user: student } = await createStudent();
    await createSubscription({ planId: plan.id, holderUserId: student.id, status: "ACTIVE", periodEnd: new Date(Date.now() + 20 * DAY) });
    const grantEnds = new Date(Date.now() + 5 * DAY);
    await db.entitlementGrant.createMany({
      data: [
        {
          userId: student.id,
          source: "ADMIN",
          grantedById: staff.id,
          reason: "Pilot programme",
          features: { features: { pdf_export: true, "analytics.advanced": true }, limits: { "ai.messagesPerDay": 99 } },
          endsAt: grantEnds,
        },
        {
          userId: student.id,
          source: "COMPENSATION",
          grantedById: staff.id,
          reason: "Outage credit",
          features: { features: { personalised_learning: true } },
          startsAt: new Date(Date.now() - 10 * DAY),
          endsAt: new Date(Date.now() - 5 * DAY),
        },
        {
          userId: student.id,
          source: "PROMO",
          features: { features: { leaderboards: true, parent_reports: true } },
          revokedAt: new Date(),
          revokedById: staff.id,
        },
      ],
    });

    const resolved = await getEntitlements(student.id);
    expect(resolved.entitlements).toMatchObject({ pdfExport: true, advancedAnalytics: true, mockExams: true, lessonAccess: "ALL" });
    expect(resolved.entitlements.aiMessagesPerDay === null || resolved.entitlements.aiMessagesPerDay >= 99).toBe(true);
    expect(resolved.entitlements.personalisedLearning).toBe((await ensureDefaultPlan()).entitlements.personalisedLearning);
    expect(resolved.sources.filter((s) => s.kind === "GRANT")).toHaveLength(1);
    expect(resolved.validUntil!.getTime()).toBeLessThanOrEqual(grantEnds.getTime());
    await expect(hasEntitlement({ userId: student.id }, "pdf_export")).resolves.toBe(true);
  });

  it("caches per instance until invalidated", async () => {
    await ensureDefaultPlan();
    const plan = await createPlan(STUDENT_DOC);
    const { user: student } = await createStudent();
    const before = await getEntitlements(student.id);
    await createSubscription({ planId: plan.id, holderUserId: student.id, status: "ACTIVE", periodEnd: new Date(Date.now() + 20 * DAY) });
    expect((await getEntitlements(student.id)).computedAt).toEqual(before.computedAt); // cached
    invalidateEntitlements(student.id);
    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);
  });

  it("rejects malformed ids", async () => {
    const error = await getEntitlements("not-a-uuid").catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("VALIDATION");
  });
});

describe("school subscriptions (B2B / B2B2C)", () => {
  it("staff always; students while seats last (claimed automatically); stale seats return to the pool", async () => {
    const free = await ensureDefaultPlan();
    const { school } = await createSchool();
    const schoolPlan = await createPlan(SCHOOL_DOC, "SCHOOL");
    const sub = await createSubscription({
      planId: schoolPlan.id,
      schoolId: school.id,
      seats: 1,
      status: "ACTIVE",
      periodEnd: new Date(Date.now() + 60 * DAY),
    });
    const { user: teacher } = await createTeacher();
    const { user: first } = await createStudent();
    const { user: second } = await createStudent();
    const { user: outsider } = await createStudent();
    await createSchoolMember({ schoolId: school.id, userId: teacher.id, role: "TEACHER" });
    const { member: firstMember } = await createSchoolMember({ schoolId: school.id, userId: first.id, role: "STUDENT" });
    await createSchoolMember({ schoolId: school.id, userId: second.id, role: "STUDENT" });

    const seated = await getEntitlements(first.id);
    expect(seated.entitlements).toMatchObject({ lessonAccess: "ALL", teacherDashboard: true });
    expect(seated.planCode).toBe(schoolPlan.code);
    expect(seated.sources).toEqual(expect.arrayContaining([expect.objectContaining({ kind: "SCHOOL_SUBSCRIPTION", id: sub.id })]));
    expect(await activeSeats(sub.id)).toBe(1);

    const unseated = await getEntitlements(second.id);
    expect(unseated.entitlements).toEqual(free.entitlements);
    await expect(allocateSchoolSeat(sub.id, second.id)).resolves.toEqual({ status: "FULL", seats: 1, used: 1 });

    const staff = await getEntitlements(teacher.id);
    expect(staff.entitlements.teacherDashboard).toBe(true);
    expect(await activeSeats(sub.id)).toBe(1); // staff never consume seats

    await expect(allocateSchoolSeat(sub.id, outsider.id)).resolves.toEqual({ status: "NOT_ELIGIBLE", reason: "NOT_AN_ACTIVE_STUDENT" });
    await expect(allocateSchoolSeat(sub.id, first.id)).resolves.toMatchObject({ status: "EXISTING" });

    // The first student leaves: the lifecycle sweep frees the seat and the next student claims it.
    await db.schoolMember.update({ where: { id: firstMember.id }, data: { status: "REMOVED", removedAt: new Date() } });
    await expect(releaseStaleSchoolSeats({ subscriptionIds: [sub.id] })).resolves.toBe(1);
    invalidateEntitlements();
    expect((await getEntitlements(first.id)).entitlements).toEqual(free.entitlements);
    expect((await getEntitlements(second.id)).entitlements.lessonAccess).toBe("ALL");
    expect(await activeSeats(sub.id)).toBe(1);
  });

  it("a lapsed school subscription grants nothing, even with a seat", async () => {
    const free = await ensureDefaultPlan();
    const { school } = await createSchool();
    const schoolPlan = await createPlan(SCHOOL_DOC, "SCHOOL");
    const { user: student } = await createStudent();
    await createSchoolMember({ schoolId: school.id, userId: student.id, role: "STUDENT" });
    const sub = await createSubscription({ planId: schoolPlan.id, schoolId: school.id, seats: 5, status: "ACTIVE", periodEnd: new Date(Date.now() + DAY) });
    expect((await allocateSchoolSeat(sub.id, student.id)).status).toBe("ALLOCATED");
    await db.subscription.update({
      where: { id: sub.id },
      data: { currentPeriodStart: new Date(Date.now() - 60 * DAY), currentPeriodEnd: new Date(Date.now() - 30 * DAY) },
    });
    invalidateEntitlements(student.id);
    expect((await getEntitlements(student.id)).entitlements).toEqual(free.entitlements);
    await expect(allocateSchoolSeat(sub.id, student.id)).resolves.toEqual({ status: "NOT_ELIGIBLE", reason: "SUBSCRIPTION_NOT_LIVE" });
  });
});

describe("study packs (subject-scoped grants)", () => {
  it("unlock full content and pack features only inside their scope", async () => {
    const free = await ensureDefaultPlan();
    const maths = await createQuestionContext({ topics: 1 });
    const biology = await createQuestionContext({ topics: 1 });
    const pack = await db.studyPack.create({
      data: {
        slug: uniqueSlug("pack"),
        title: "Test study pack",
        entitlements: { version: 1, features: { mock_exams: true, flashcards: true }, limits: { "mock_exams.perMonth": 2 } },
        scopes: { create: [{ subjectId: maths.subjectId }] },
      },
      select: { id: true },
    });
    const { user: student } = await createStudent();
    await db.entitlementGrant.create({ data: { userId: student.id, source: "STUDY_PACK", studyPackId: pack.id } });

    const resolved = await getEntitlements(student.id);
    expect(resolved.entitlements).toEqual(free.entitlements); // nothing leaks globally
    expect(resolved.scoped).toHaveLength(1);
    await expect(hasStudentAppAccess(student.id)).resolves.toBe(true); // a study pack keeps the student area open

    await expect(canAccessSubjectContent(student.id, maths.subjectId)).resolves.toBe(true);
    const inMaths = await getSubjectEntitlements(student.id, maths.subjectId);
    expect(inMaths).toMatchObject({ lessonAccess: "ALL", mockExams: true, flashcards: true });
    expect(inMaths.mockExamsPerMonth === null || inMaths.mockExamsPerMonth >= 2).toBe(true);
    await expect(assertEntitlement({ userId: student.id }, "mock_exams", { subjectId: maths.subjectId })).resolves.toBeDefined();

    if (free.entitlements.lessonAccess === "FREE_ONLY") {
      await expect(canAccessSubjectContent(student.id, biology.subjectId)).resolves.toBe(false);
    }
    if (!free.entitlements.mockExams) {
      await expect(assertEntitlement({ userId: student.id }, "mock_exams", { subjectId: biology.subjectId })).rejects.toMatchObject({
        code: "ENTITLEMENT_REQUIRED",
        upgradePath: "/app/unlock",
      });
    }
  });

  it("a qualification-wide pack covers every subject of that qualification", async () => {
    await ensureDefaultPlan();
    const ctx = await createQuestionContext({ topics: 1 });
    const subject = await db.subject.findUniqueOrThrow({ where: { id: ctx.subjectId }, select: { qualificationId: true } });
    const pack = await db.studyPack.create({
      data: {
        slug: uniqueSlug("pack"),
        title: "Qualification pack",
        entitlements: { version: 1, features: {}, limits: {} },
        scopes: { create: [{ qualificationId: subject.qualificationId }] },
      },
      select: { id: true },
    });
    const { user: student } = await createStudent();
    await db.entitlementGrant.create({
      data: { userId: student.id, source: "STUDY_PACK", studyPackId: pack.id, endsAt: new Date(Date.now() + 90 * DAY) },
    });
    await expect(canAccessSubjectContent(student.id, ctx.subjectId)).resolves.toBe(true);
  });
});
