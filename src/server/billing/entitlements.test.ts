import { describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import { normalizeError } from "@/server/lib/errors";
import {
  EntitlementRequiredError,
  LimitReachedError,
  entitlementsForSubject,
  evaluateLimit,
  featureLabel,
  grantEntitlements,
  hasFeature,
  hasFullAppAccess,
  isSubscriptionLive,
  normalizeEntitlementDocument,
  parseGrantScope,
  resolveEntitlements,
  scopeCoversSubject,
  seatClaimCandidates,
  subscriptionAccessEndsAt,
  type EntitlementInputs,
  type GrantSource,
  type SchoolSubscriptionSource,
  type SubscriptionSource,
} from "./entitlements";

const now = new Date("2026-10-05T10:00:00Z");
const DAY = 86_400_000;
const ids = {
  maths: "0199a000-0000-7000-8000-000000000001",
  biology: "0199a000-0000-7000-8000-000000000002",
  olevel: "0199a000-0000-7000-8000-000000000003",
  syllabusA: "0199a000-0000-7000-8000-000000000004",
  syllabusB: "0199a000-0000-7000-8000-000000000005",
  school: "0199a000-0000-7000-8000-000000000006",
};

const FREE: Entitlements = {
  ...NO_ENTITLEMENTS,
  practiceQuestionsPerDay: 15,
  dailyQuestion: true,
  topicTestsPerWeek: 2,
  aiTutor: true,
  aiMessagesPerDay: 3,
  aiSolverPerDay: 1,
};
const STUDENT: Entitlements = {
  ...FREE,
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  mockExams: true,
  mockExamsPerMonth: null,
  flashcards: true,
  aiMessagesPerDay: 30,
  aiMaxModelTier: "STANDARD",
};
const SCHOOL: Entitlements = { ...STUDENT, teacherDashboard: true, assignments: true, schoolAnalytics: true };

function inputs(overrides: Partial<EntitlementInputs> = {}): EntitlementInputs {
  return {
    now,
    graceDays: 3,
    freePlan: { code: "FREE", entitlements: FREE },
    subscriptions: [],
    memberships: [],
    schoolSubscriptions: [],
    grants: [],
    schoolGrants: [],
    ...overrides,
  };
}

function sub(overrides: Partial<SubscriptionSource> = {}): SubscriptionSource {
  return {
    id: "sub-1",
    status: "ACTIVE",
    currentPeriodEnd: new Date(now.getTime() + 10 * DAY),
    trialEndsAt: null,
    cancelAtPeriodEnd: false,
    plan: { code: "STUDENT", entitlements: STUDENT },
    ...overrides,
  };
}

function schoolSub(overrides: Partial<SchoolSubscriptionSource> = {}): SchoolSubscriptionSource {
  return { ...sub({ id: "school-sub-1", plan: { code: "SCHOOL", entitlements: SCHOOL } }), schoolId: ids.school, seats: 30, ...overrides };
}

function grant(overrides: Partial<GrantSource> = {}): GrantSource {
  return {
    id: "grant-1",
    source: "ADMIN",
    subscriptionId: null,
    startsAt: new Date(now.getTime() - DAY),
    endsAt: null,
    revokedAt: null,
    plan: null,
    studyPack: null,
    features: null,
    ...overrides,
  };
}

describe("normalizeEntitlementDocument", () => {
  it("accepts the flat contract shape (dev seed)", () => {
    expect(normalizeEntitlementDocument(STUDENT)).toEqual({ entitlements: STUDENT, issues: [] });
  });

  it("maps the nested registry shape onto the contract", () => {
    const { entitlements, issues } = normalizeEntitlementDocument({
      version: 1,
      lessonAccess: "ALL",
      aiModelTier: "STANDARD",
      features: { mock_exams: true, flashcards: true, "analytics.advanced": true, ai_deep: true, whatsapp: true },
      limits: { "practice.questionsPerDay": null, "ai.messagesPerDay": 40, "ai.solverImagesPerDay": 5, "seats.included": 10 },
    });
    expect(issues).toEqual([]);
    expect(entitlements).toMatchObject({
      lessonAccess: "ALL",
      mockExams: true,
      flashcards: true,
      advancedAnalytics: true,
      aiMaxModelTier: "DEEP", // ai_deep beats the top-level tier
      practiceQuestionsPerDay: null,
      aiMessagesPerDay: 40,
      aiSolverPerDay: 5,
    });
    // Unlisted keys fail closed.
    expect(entitlements.studyPlan).toBe(false);
    expect(entitlements.mockExamsPerMonth).toBe(0);
  });

  it("lets practice.unlimited win over a numeric practice limit", () => {
    const { entitlements } = normalizeEntitlementDocument({
      features: { "practice.unlimited": true, "lessons.full": true },
      limits: { "practice.questionsPerDay": 10 },
    });
    expect(entitlements.practiceQuestionsPerDay).toBeNull();
    expect(entitlements.lessonAccess).toBe("ALL");
  });

  it("fails closed per key on invalid values instead of throwing", () => {
    const { entitlements, issues } = normalizeEntitlementDocument({
      ...STUDENT,
      aiMessagesPerDay: -5,
      aiMaxModelTier: "ULTRA",
      features: { mock_exams: "yes" },
    });
    expect(entitlements.aiMessagesPerDay).toBe(0);
    expect(entitlements.aiMaxModelTier).toBe("FAST");
    expect(entitlements.mockExams).toBe(true); // flat key still valid; the bad alias is ignored
    expect(issues).toEqual(expect.arrayContaining(["aiMessagesPerDay: invalid value", "aiMaxModelTier: invalid value"]));
    expect(issues.some((i) => i.includes("features.mock_exams"))).toBe(true);
  });

  it("treats non-objects and the analytics-style empty doc as no entitlements", () => {
    expect(normalizeEntitlementDocument(null).entitlements).toEqual(NO_ENTITLEMENTS);
    expect(normalizeEntitlementDocument("ALL").issues).toEqual(["document is not an object"]);
    expect(normalizeEntitlementDocument({ version: 1, features: {}, limits: {} }).entitlements).toEqual(NO_ENTITLEMENTS);
  });

  it("ignores prototype keys", () => {
    const { entitlements } = normalizeEntitlementDocument(JSON.parse('{"features":{"constructor":true,"__proto__":true}}'));
    expect(entitlements).toEqual(NO_ENTITLEMENTS);
  });
});

describe("scopes", () => {
  it("parses a grant scope; empty means unscoped and malformed means nothing", () => {
    expect(parseGrantScope({ scope: { subjectIds: [ids.maths] } }).scope).toEqual({
      subjectIds: [ids.maths],
      qualificationIds: [],
      syllabi: [],
    });
    expect(parseGrantScope({ scope: {} }).scope).toBeNull();
    expect(parseGrantScope({ features: { mock_exams: true } }).scope).toBeNull();
    const bad = parseGrantScope({ scope: { subjectIds: ["not-a-uuid"] } });
    expect(bad.scope).toEqual({ subjectIds: [], qualificationIds: [], syllabi: [] });
    expect(bad.issues).toHaveLength(1);
  });

  it("matches by subject, qualification or syllabus version", () => {
    const scope = { subjectIds: [ids.maths], qualificationIds: [ids.olevel], syllabi: [{ syllabusId: ids.syllabusA, subjectId: ids.biology }] };
    expect(scopeCoversSubject(scope, { subjectId: ids.maths, qualificationId: null })).toBe(true);
    expect(scopeCoversSubject({ ...scope, subjectIds: [] }, { subjectId: "x", qualificationId: ids.olevel })).toBe(true);
    const versionOnly = { subjectIds: [], qualificationIds: [], syllabi: scope.syllabi };
    expect(scopeCoversSubject(versionOnly, { subjectId: ids.biology, qualificationId: null })).toBe(true);
    expect(scopeCoversSubject(versionOnly, { subjectId: ids.biology, qualificationId: null, syllabusId: ids.syllabusA })).toBe(true);
    expect(scopeCoversSubject(versionOnly, { subjectId: ids.biology, qualificationId: null, syllabusId: ids.syllabusB })).toBe(false);
    expect(scopeCoversSubject(versionOnly, { subjectId: ids.maths, qualificationId: null })).toBe(false);
  });
});

describe("subscription liveness", () => {
  const end = new Date(now.getTime() + DAY);

  it("ACTIVE and PAST_DUE last until period end + grace (no grace when cancelling)", () => {
    expect(subscriptionAccessEndsAt(sub({ currentPeriodEnd: end }), 3)).toEqual(new Date(end.getTime() + 3 * DAY));
    expect(subscriptionAccessEndsAt(sub({ status: "PAST_DUE", currentPeriodEnd: end }), 2)).toEqual(new Date(end.getTime() + 2 * DAY));
    expect(subscriptionAccessEndsAt(sub({ currentPeriodEnd: end, cancelAtPeriodEnd: true }), 3)).toEqual(end);
  });

  it("TRIALING lasts until the trial end; other statuses never grant access", () => {
    expect(subscriptionAccessEndsAt(sub({ status: "TRIALING", trialEndsAt: end }), 3)).toEqual(end);
    for (const status of ["PENDING", "CANCELLED", "EXPIRED"] as const) {
      expect(subscriptionAccessEndsAt(sub({ status }), 3)).toBeNull();
    }
  });

  it("checks time, not just status", () => {
    const lapsed = sub({ currentPeriodEnd: new Date(now.getTime() - 4 * DAY) });
    expect(isSubscriptionLive(lapsed, now, 3)).toBe(false);
    expect(isSubscriptionLive(lapsed, now, 5)).toBe(true);
  });
});

describe("resolveEntitlements", () => {
  it("FREE only", () => {
    const result = resolveEntitlements(inputs());
    expect(result.entitlements).toEqual(FREE);
    expect(result.planCode).toBe("FREE");
    expect(result.sources).toEqual([expect.objectContaining({ kind: "FREE_PLAN", planCode: "FREE" })]);
    expect(result.validUntil).toBeNull();
  });

  it("no plans at all means NO_ENTITLEMENTS", () => {
    expect(resolveEntitlements(inputs({ freePlan: null })).entitlements).toEqual(NO_ENTITLEMENTS);
  });

  it("a lifetime one-off purchase (PURCHASE grant of a plan, no end) unlocks the plan for good", () => {
    const full: Entitlements = { ...FREE, lessonAccess: "ALL", practiceQuestionsPerDay: null, mockExams: true, flashcards: true, studyPlan: true };
    const lifetime = grant({ id: "purchase-1", source: "PURCHASE", plan: { code: "FULL_ACCESS", entitlements: full }, startsAt: new Date(now.getTime() - 400 * DAY) });
    const result = resolveEntitlements(inputs({ grants: [lifetime] }));
    expect(result.entitlements).toEqual(full);
    expect(result.planCode).toBe("FULL_ACCESS");
    expect(result.validUntil).toBeNull(); // nothing expires, so the cache is not bounded by an end date
    expect(result.sources).toContainEqual({ kind: "GRANT", id: "purchase-1", planCode: "FULL_ACCESS", grantSource: "PURCHASE", endsAt: null, scoped: false });
    // Years later it still applies; a refund (revoked grant) ends it at once.
    expect(resolveEntitlements(inputs({ now: new Date(now.getTime() + 3650 * DAY), grants: [lifetime] })).planCode).toBe("FULL_ACCESS");
    const revoked = resolveEntitlements(inputs({ grants: [{ ...lifetime, revokedAt: new Date(now.getTime() - DAY) }] }));
    expect(revoked.entitlements).toEqual(FREE);
    expect(revoked.planCode).toBe("FREE");
  });

  it("own live subscription merges over FREE and bounds the cache", () => {
    const s = sub();
    const result = resolveEntitlements(inputs({ subscriptions: [s] }));
    expect(result.entitlements).toMatchObject({ lessonAccess: "ALL", mockExams: true, aiMessagesPerDay: 30, practiceQuestionsPerDay: null });
    expect(result.entitlements.topicTestsPerWeek).toBe(2); // from FREE (STUDENT fixture inherits it)
    expect(result.planCode).toBe("STUDENT");
    expect(result.validUntil).toEqual(subscriptionAccessEndsAt(s, 3));
  });

  it("an expired or lapsed subscription falls back to FREE", () => {
    const expired = sub({ status: "EXPIRED" });
    const lapsed = sub({ currentPeriodEnd: new Date(now.getTime() - 30 * DAY) });
    const result = resolveEntitlements(inputs({ subscriptions: [expired, lapsed] }));
    expect(result.entitlements).toEqual(FREE);
    expect(result.planCode).toBe("FREE");
  });

  it("school staff get the school plan without a seat; students need a live seat", () => {
    const school = schoolSub();
    const teacher = resolveEntitlements(inputs({ memberships: [{ schoolId: ids.school, role: "TEACHER" }], schoolSubscriptions: [school] }));
    expect(teacher.entitlements.teacherDashboard).toBe(true);
    expect(teacher.planCode).toBe("SCHOOL");

    const unseated = resolveEntitlements(inputs({ memberships: [{ schoolId: ids.school, role: "STUDENT" }], schoolSubscriptions: [school] }));
    expect(unseated.entitlements).toEqual(FREE);

    const seat = grant({ id: "seat-1", source: "SCHOOL_SEAT", subscriptionId: school.id });
    const seated = resolveEntitlements(
      inputs({ memberships: [{ schoolId: ids.school, role: "STUDENT" }], schoolSubscriptions: [school], grants: [seat] }),
    );
    expect(seated.entitlements.lessonAccess).toBe("ALL");
    expect(seated.sources.map((s) => s.kind)).toEqual(["FREE_PLAN", "SCHOOL_SUBSCRIPTION"]);
  });

  it("a seat on a lapsed school subscription grants nothing", () => {
    const school = schoolSub({ currentPeriodEnd: new Date(now.getTime() - 10 * DAY) });
    const seat = grant({ source: "SCHOOL_SEAT", subscriptionId: school.id });
    const result = resolveEntitlements(
      inputs({ memberships: [{ schoolId: ids.school, role: "STUDENT" }], schoolSubscriptions: [school], grants: [seat] }),
    );
    expect(result.entitlements).toEqual(FREE);
  });

  it("unscoped grants merge globally; expired, future and revoked grants are ignored", () => {
    const live = grant({ id: "g-live", source: "PROMO", features: { features: { flashcards: true }, limits: { "ai.messagesPerDay": 50 } } });
    const expired = grant({ id: "g-old", endsAt: new Date(now.getTime() - DAY), features: { features: { mock_exams: true } } });
    const future = grant({ id: "g-future", startsAt: new Date(now.getTime() + DAY), features: { features: { studyPlan: true } } });
    const revoked = grant({ id: "g-revoked", revokedAt: now, features: { features: { pdf_export: true } } });
    const result = resolveEntitlements(inputs({ grants: [live, expired, future, revoked] }));
    expect(result.entitlements).toMatchObject({ flashcards: true, aiMessagesPerDay: 50, mockExams: false, studyPlan: false, pdfExport: false });
    expect(result.sources.filter((s) => s.kind === "GRANT").map((s) => s.id)).toEqual(["g-live"]);
  });

  it("a plan grant (referral reward) applies the plan and bounds validity", () => {
    const endsAt = new Date(now.getTime() + 2 * DAY);
    const reward = grant({ source: "REFERRAL", plan: { code: "STUDENT", entitlements: STUDENT }, endsAt });
    const result = resolveEntitlements(inputs({ grants: [reward] }));
    expect(result.entitlements.mockExams).toBe(true);
    expect(result.planCode).toBe("STUDENT");
    expect(result.validUntil).toEqual(endsAt);
  });

  it("study packs are scoped to their subjects and always unlock full content there", () => {
    const pack = grant({
      id: "pack-grant",
      source: "STUDY_PACK",
      studyPack: {
        id: "pack-1",
        entitlements: { version: 1, features: { mock_exams: true, flashcards: true }, limits: { "mock_exams.perMonth": 4 } },
        scopes: [{ subjectId: ids.maths, qualificationId: null, syllabusId: null, syllabusSubjectId: null }],
      },
    });
    const result = resolveEntitlements(inputs({ grants: [pack] }));
    expect(result.entitlements).toEqual(FREE); // nothing leaks globally
    expect(result.scoped).toHaveLength(1);
    expect(result.sources.find((s) => s.kind === "GRANT")).toMatchObject({ scoped: true, grantSource: "STUDY_PACK" });

    const maths = entitlementsForSubject(result, { subjectId: ids.maths, qualificationId: ids.olevel });
    expect(maths).toMatchObject({ lessonAccess: "ALL", mockExams: true, mockExamsPerMonth: 4, flashcards: true, aiMessagesPerDay: 3 });
    const biology = entitlementsForSubject(result, { subjectId: ids.biology, qualificationId: ids.olevel });
    expect(biology).toEqual(FREE);
  });

  it("hasFullAppAccess: the default plan alone never opens the student area (no free tier, 2026-10-12)", () => {
    expect(hasFullAppAccess(resolveEntitlements(inputs()))).toBe(false);
    expect(hasFullAppAccess(resolveEntitlements(inputs({ freePlan: { code: "FREE", entitlements: NO_ENTITLEMENTS } })))).toBe(false);
    expect(hasFullAppAccess(resolveEntitlements(inputs({ freePlan: null })))).toBe(false);
    // A default plan an admin re-opened with every lesson would open it again (data, not code).
    expect(hasFullAppAccess(resolveEntitlements(inputs({ freePlan: { code: "FREE", entitlements: STUDENT } })))).toBe(true);

    const purchase = grant({ source: "PURCHASE", plan: { code: "FULL_ACCESS", entitlements: STUDENT } });
    expect(hasFullAppAccess(resolveEntitlements(inputs({ grants: [purchase] })))).toBe(true);
    const school = schoolSub();
    const seat = grant({ source: "SCHOOL_SEAT", subscriptionId: school.id });
    expect(
      hasFullAppAccess(resolveEntitlements(inputs({ memberships: [{ schoolId: ids.school, role: "STUDENT" }], schoolSubscriptions: [school], grants: [seat] }))),
    ).toBe(true);
    // Students who got access another way keep it: a study pack (scoped) or any other live grant.
    const pack = grant({
      source: "STUDY_PACK",
      studyPack: { id: "pack-1", entitlements: {}, scopes: [{ subjectId: ids.maths, qualificationId: null, syllabusId: null, syllabusSubjectId: null }] },
    });
    expect(hasFullAppAccess(resolveEntitlements(inputs({ grants: [pack] })))).toBe(true);
    const promo = grant({ source: "PROMO", features: { features: { flashcards: true } } });
    expect(hasFullAppAccess(resolveEntitlements(inputs({ grants: [promo] })))).toBe(true);
    // Ended or revoked access does not count.
    expect(hasFullAppAccess(resolveEntitlements(inputs({ grants: [{ ...purchase, revokedAt: now }] })))).toBe(false);
  });

  it("a study pack without any scope unlocks nothing", () => {
    const pack = grant({ source: "STUDY_PACK", studyPack: { id: "pack-x", entitlements: STUDENT, scopes: [] } });
    const resolved = grantEntitlements(pack);
    expect(resolved.scope).toEqual({ subjectIds: [], qualificationIds: [], syllabi: [] });
    expect(resolved.issues.some((i) => i.includes("no scope"))).toBe(true);
    const result = resolveEntitlements(inputs({ grants: [pack] }));
    expect(entitlementsForSubject(result, { subjectId: ids.maths, qualificationId: null })).toEqual(FREE);
  });

  it("school-held grants apply to staff only", () => {
    const schoolGrant = grant({ id: "school-grant", features: { features: { pdf_export: true } } });
    const staff = resolveEntitlements(inputs({ memberships: [{ schoolId: ids.school, role: "SCHOOL_ADMIN" }], schoolGrants: [schoolGrant] }));
    expect(staff.entitlements.pdfExport).toBe(true);
    const student = resolveEntitlements(inputs({ memberships: [{ schoolId: ids.school, role: "STUDENT" }], schoolGrants: [schoolGrant] }));
    expect(student.entitlements.pdfExport).toBe(false);
  });

  it("collects document issues instead of throwing", () => {
    const result = resolveEntitlements(inputs({ subscriptions: [sub({ plan: { code: "BROKEN", entitlements: { aiMessagesPerDay: "lots" } } })] }));
    expect(result.issues).toEqual(["plan BROKEN: aiMessagesPerDay: invalid value"]);
  });
});

describe("seatClaimCandidates", () => {
  it("lists live school subscriptions where an active student has no seat yet", () => {
    const school = schoolSub();
    const base = inputs({ memberships: [{ schoolId: ids.school, role: "STUDENT" }], schoolSubscriptions: [school] });
    expect(seatClaimCandidates(base).map((s) => s.id)).toEqual([school.id]);
    const seated = { ...base, grants: [grant({ source: "SCHOOL_SEAT", subscriptionId: school.id })] };
    expect(seatClaimCandidates(seated)).toEqual([]);
    const teacher = { ...base, memberships: [{ schoolId: ids.school, role: "TEACHER" as const }] };
    expect(seatClaimCandidates(teacher)).toEqual([]);
    const lapsed = { ...base, schoolSubscriptions: [schoolSub({ status: "EXPIRED" })] };
    expect(seatClaimCandidates(lapsed)).toEqual([]);
  });
});

describe("feature and limit checks", () => {
  it("hasFeature understands contract keys and registry aliases", () => {
    expect(hasFeature(STUDENT, "mockExams")).toBe(true);
    expect(hasFeature(STUDENT, "mock_exams")).toBe(true);
    expect(hasFeature(FREE, "mock_exams")).toBe(false);
    expect(hasFeature(STUDENT, "lessons.full")).toBe(true);
    expect(hasFeature(FREE, "lessons.full")).toBe(false);
    expect(hasFeature(STUDENT, "practice.unlimited")).toBe(true);
    expect(hasFeature(FREE, "practice.unlimited")).toBe(false);
    expect(hasFeature(FREE, "ai_solver")).toBe(true);
    expect(hasFeature({ ...FREE, aiSolverPerDay: 0 }, "ai_solver")).toBe(false);
    expect(hasFeature(STUDENT, "ai_deep")).toBe(false);
    expect(hasFeature({ ...STUDENT, aiMaxModelTier: "DEEP" }, "ai_deep")).toBe(true);
  });

  it("evaluateLimit", () => {
    expect(evaluateLimit("practiceQuestionsPerDay", 15, 14)).toEqual({
      feature: "practiceQuestionsPerDay",
      limit: 15,
      used: 14,
      remaining: 1,
      allowed: true,
    });
    expect(evaluateLimit("practiceQuestionsPerDay", 15, 15).allowed).toBe(false);
    expect(evaluateLimit("aiMessagesPerDay", 3, 2, 2).allowed).toBe(false); // "Think harder" counts 2
    expect(evaluateLimit("aiMessagesPerDay", null, 10_000)).toMatchObject({ allowed: true, remaining: null });
    expect(evaluateLimit("mockExamsPerMonth", 0, 0).allowed).toBe(false);
  });

  it("EntitlementRequiredError is a client-safe ENTITLEMENT_REQUIRED with an upgrade path", () => {
    const error = new EntitlementRequiredError("mock_exams");
    expect(error).toMatchObject({ code: "ENTITLEMENT_REQUIRED", httpStatus: 403, feature: "mock_exams", upgradePath: "/app/unlock" });
    expect(error.message).toBe("You need Full access for mock exams. Pay once to unlock everything.");
    expect(normalizeError(error)).toMatchObject({ code: "ENTITLEMENT_REQUIRED", message: error.message });
    const school = new EntitlementRequiredError("teacher_dashboard");
    expect(school.upgradePath).toBe("/schools");
    expect(school.message).toContain("school subscription");
  });

  it("LimitReachedError explains the limit and sets Retry-After", () => {
    const resetsAt = new Date(now.getTime() + 3_600_000);
    const error = new LimitReachedError({ ...evaluateLimit("practiceQuestionsPerDay", 15, 15), limit: 15 }, resetsAt, now);
    expect(error).toMatchObject({ code: "QUOTA_EXCEEDED", retryAfterSeconds: 3600, limit: 15, used: 15 });
    expect(error.message).toBe(
      "You've reached your plan's limit of 15 practice questions today. Come back tomorrow.",
    );
    const single = new LimitReachedError({ ...evaluateLimit("mockExamsPerMonth", 1, 1), limit: 1 });
    expect(single.message).toContain("limit of 1 mock exam this month");
    expect(single.retryAfterSeconds).toBeUndefined();
  });

  it("featureLabel", () => {
    expect(featureLabel("aiTutor")).toBe("the AI tutor");
    expect(featureLabel("ai_tutor")).toBe("the AI tutor");
    expect(featureLabel("ai_deep")).toBe("advanced AI");
    expect(featureLabel("aiMessagesPerDay")).toBe("AI tutor messages");
  });
});
