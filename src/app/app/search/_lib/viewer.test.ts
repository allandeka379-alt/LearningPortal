import { describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import type { ScopedEntitlement } from "@/server/billing/entitlements";
import type { PremiumScope } from "@/server/search/presentation";
import { premiumAccessChecker } from "./viewer";

const MATHS = "11111111-1111-4111-8111-111111111111";
const BIOLOGY = "22222222-2222-4222-8222-222222222222";
const O_LEVEL = "33333333-3333-4333-8333-333333333333";
const FULL: Entitlements = { ...NO_ENTITLEMENTS, lessonAccess: "ALL" };

function scope(overrides: Partial<PremiumScope> = {}): PremiumScope {
  return { entityType: "LESSON", subjectIds: [], qualificationIds: [], examBoardIds: [], ...overrides };
}

function pack(scopeIds: { subjectIds?: string[]; qualificationIds?: string[] }, entitlements: Entitlements = FULL): ScopedEntitlement {
  return {
    grantId: "g",
    source: "STUDY_PACK",
    studyPackId: "p",
    scope: { subjectIds: scopeIds.subjectIds ?? [], qualificationIds: scopeIds.qualificationIds ?? [], syllabi: [] },
    entitlements,
    endsAt: null,
  };
}

describe("premiumAccessChecker", () => {
  it("full content access from a plan opens every premium result", () => {
    const can = premiumAccessChecker({ entitlements: FULL, scoped: [] });
    expect(can(scope({ subjectIds: [BIOLOGY] }))).toBe(true);
  });

  it("free plan without packs opens nothing", () => {
    const can = premiumAccessChecker({ entitlements: NO_ENTITLEMENTS, scoped: [] });
    expect(can(scope({ subjectIds: [MATHS] }))).toBe(false);
  });

  it("a study pack opens results in its subjects or qualifications only", () => {
    const can = premiumAccessChecker({ entitlements: NO_ENTITLEMENTS, scoped: [pack({ subjectIds: [MATHS] }), pack({ qualificationIds: [O_LEVEL] })] });
    expect(can(scope({ subjectIds: [MATHS] }))).toBe(true);
    expect(can(scope({ subjectIds: [BIOLOGY] }))).toBe(false);
    expect(can(scope({ subjectIds: [BIOLOGY], qualificationIds: [O_LEVEL] }))).toBe(true);
  });

  it("a scoped grant without full content (e.g. only extra AI messages) does not open premium text", () => {
    const can = premiumAccessChecker({
      entitlements: NO_ENTITLEMENTS,
      scoped: [pack({ subjectIds: [MATHS] }, { ...NO_ENTITLEMENTS, aiTutor: true })],
    });
    expect(can(scope({ subjectIds: [MATHS] }))).toBe(false);
  });
});
