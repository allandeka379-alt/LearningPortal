import { describe, expect, it } from "vitest";
import { includedLines } from "@/components/billing/entitlement-summary";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import {
  cheapestPerCurrency,
  describeScopes,
  packOwnership,
  packUnlockLines,
  purchasablePackPrices,
  qualificationLabel,
  scopesCoverSubjects,
  scopesMatchQualifications,
  type PackPriceRow,
  type ScopeQualificationRef,
  type ScopeSubjectRef,
} from "./core";

const zimsecOLevel: ScopeQualificationRef = { id: "q-o", shortName: "O-Level", catalogueStatus: "AVAILABLE", examBoard: { shortName: "ZIMSEC", catalogueStatus: "AVAILABLE" } };
const igcse: ScopeQualificationRef = { id: "q-igcse", shortName: "Cambridge IGCSE", catalogueStatus: "COMING_SOON", examBoard: { shortName: "Cambridge", catalogueStatus: "AVAILABLE" } };
const maths: ScopeSubjectRef = { id: "s-maths", name: "Mathematics", catalogueStatus: "AVAILABLE", qualification: zimsecOLevel };
const hiddenSubject: ScopeSubjectRef = { ...maths, id: "s-hidden", name: "Hidden", catalogueStatus: "HIDDEN" };

const NOW = new Date("2026-10-07T10:00:00Z");

function price(over: Partial<PackPriceRow>): PackPriceRow {
  return {
    id: "p",
    currency: "USD",
    amountMinor: 900,
    interval: "ONE_OFF",
    intervalCount: 1,
    periodDays: null,
    perSeat: false,
    label: null,
    countryId: null,
    isActive: true,
    validFrom: new Date("2026-01-01T00:00:00Z"),
    validTo: null,
    sortOrder: 0,
    ...over,
  };
}

describe("scopes", () => {
  it("names qualifications, subjects and syllabus versions for students, dropping hidden targets", () => {
    expect(qualificationLabel(zimsecOLevel)).toBe("ZIMSEC O-Level");
    expect(qualificationLabel(igcse)).toBe("Cambridge IGCSE");
    const scopes = describeScopes([
      { qualification: null, subject: maths, syllabus: null },
      { qualification: igcse, subject: null, syllabus: null },
      { qualification: null, subject: null, syllabus: { id: "sy", versionLabel: "2025-2027", subject: maths } },
      { qualification: null, subject: hiddenSubject, syllabus: null },
      { qualification: { ...zimsecOLevel, examBoard: { shortName: "ZIMSEC", catalogueStatus: "HIDDEN" } }, subject: null, syllabus: null },
    ]);
    expect(scopes).toEqual([
      { kind: "SUBJECT", label: "ZIMSEC O-Level Mathematics", qualificationId: "q-o", subjectId: "s-maths" },
      { kind: "QUALIFICATION", label: "Every Cambridge IGCSE subject", qualificationId: "q-igcse", subjectId: null },
      { kind: "SYLLABUS", label: "ZIMSEC O-Level Mathematics (2025-2027 syllabus)", qualificationId: "q-o", subjectId: "s-maths" },
    ]);
  });

  it("matches a student's qualifications and subjects", () => {
    const subjectScope = describeScopes([{ qualification: null, subject: maths, syllabus: null }]);
    const qualificationScope = describeScopes([{ qualification: igcse, subject: null, syllabus: null }]);
    expect(scopesMatchQualifications(subjectScope, new Set(["q-o"]))).toBe(true);
    expect(scopesMatchQualifications(subjectScope, new Set(["q-igcse"]))).toBe(false);
    expect(scopesCoverSubjects(subjectScope, [{ subjectId: "s-maths", qualificationId: "q-o" }])).toBe(true);
    expect(scopesCoverSubjects(subjectScope, [{ subjectId: "s-physics", qualificationId: "q-o" }])).toBe(false);
    expect(scopesCoverSubjects(qualificationScope, [{ subjectId: "s-chem", qualificationId: "q-igcse" }])).toBe(true);
    expect(scopesMatchQualifications([], new Set(["q-o"]))).toBe(false);
  });
});

describe("packUnlockLines", () => {
  it("lists only what a subject-scoped grant honours, never account-wide features", () => {
    const everything: Entitlements = {
      ...NO_ENTITLEMENTS,
      lessonAccess: "ALL",
      practiceQuestionsPerDay: null,
      dailyQuestion: true,
      diagnosticTest: true,
      topicTestsPerWeek: null,
      mockExams: true,
      mockExamsPerMonth: 4,
      flashcards: true,
      studyPlan: true,
      examCountdown: true,
      aiTutor: true,
      aiMessagesPerDay: 20,
      aiSolverPerDay: 5,
      aiImageUploads: true,
      aiMaxModelTier: "DEEP",
      leaderboards: true,
      advancedAnalytics: true,
      parentReports: true,
      pdfExport: true,
      personalisedLearning: true,
    };
    expect(packUnlockLines(includedLines(everything)).map((line) => line.key)).toEqual(["lessons", "practice", "daily", "topicTests", "mocks", "flashcards", "diagnostic"]);
    expect(packUnlockLines([{ key: "flashcards", label: "Flashcards", included: false }])).toEqual([]);
  });
});

describe("prices", () => {
  it("offers exactly what the checkout would: current, global or the student's country, non-zero, not per seat", () => {
    const options = purchasablePackPrices(
      [
        price({ id: "later", amountMinor: 700, sortOrder: 1 }),
        price({ id: "usd", amountMinor: 900 }),
        price({ id: "zwg", currency: "ZWG", amountMinor: 23_000 }),
        price({ id: "zw-only", amountMinor: 500, countryId: "zw" }),
        price({ id: "za-only", amountMinor: 400, countryId: "za" }),
        price({ id: "inactive", amountMinor: 100, isActive: false }),
        price({ id: "future", amountMinor: 100, validFrom: new Date("2027-01-01T00:00:00Z") }),
        price({ id: "expired", amountMinor: 100, validTo: new Date("2026-10-01T00:00:00Z") }),
        price({ id: "zero", amountMinor: 0 }),
        price({ id: "seat", amountMinor: 100, perSeat: true }),
        price({ id: "90-days", amountMinor: 450, periodDays: 90 }),
      ],
      { now: NOW, countryId: "zw" },
    );
    expect(options.map((o) => o.planPriceId)).toEqual(["90-days", "zw-only", "usd", "zwg", "later"]);
    expect(cheapestPerCurrency(options).map((o) => [o.currency, o.amountMinor])).toEqual([
      ["USD", 450],
      ["ZWG", 23_000],
    ]);
    expect(purchasablePackPrices([price({ id: "zw-only", countryId: "zw" })], { now: NOW, countryId: null })).toEqual([]);
  });
});

describe("packOwnership", () => {
  const day = 86_400_000;
  it("is none without live grants, active (open-ended wins, else the latest end) or upcoming", () => {
    expect(packOwnership([], NOW)).toEqual({ state: "none" });
    expect(packOwnership([{ startsAt: new Date(NOW.getTime() - 9 * day), endsAt: new Date(NOW.getTime() - day) }], NOW)).toEqual({ state: "none" });
    expect(
      packOwnership(
        [
          { startsAt: new Date(NOW.getTime() - day), endsAt: new Date(NOW.getTime() + day) },
          { startsAt: new Date(NOW.getTime() - day), endsAt: null },
        ],
        NOW,
      ),
    ).toEqual({ state: "active", endsAt: null });
    expect(
      packOwnership(
        [
          { startsAt: new Date(NOW.getTime() - day), endsAt: new Date(NOW.getTime() + day) },
          { startsAt: new Date(NOW.getTime() - day), endsAt: new Date(NOW.getTime() + 5 * day) },
        ],
        NOW,
      ),
    ).toEqual({ state: "active", endsAt: new Date(NOW.getTime() + 5 * day) });
    const later = new Date(NOW.getTime() + 2 * day);
    expect(packOwnership([{ startsAt: later, endsAt: null }], NOW)).toEqual({ state: "upcoming", startsAt: later, endsAt: null });
  });
});
