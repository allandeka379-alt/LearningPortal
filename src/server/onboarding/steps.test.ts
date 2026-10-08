import { describe, expect, it } from "vitest";
import {
  WIZARD_STEPS,
  canVisit,
  furthestStep,
  isWizardStep,
  nextStep,
  onboardingEntryRedirect,
  onboardingNext,
  planStepSave,
  previousStep,
  stepHref,
  stepProgress,
  storedStepFor,
  withOnboardingNext,
} from "./steps";

describe("wizard step order", () => {
  it("runs country → board → level → year → subjects → exam → ability → grade → goal → finish (§5)", () => {
    expect(WIZARD_STEPS).toEqual(["country", "board", "level", "year", "subjects", "exam", "ability", "grade", "goal", "finish"]);
    expect(previousStep("country")).toBeNull();
    expect(nextStep("finish")).toBeNull();
    expect(nextStep("grade")).toBe("goal");
    expect(previousStep("finish")).toBe("goal");
    expect(stepHref("subjects")).toBe("/onboarding/subjects");
    expect(stepProgress("level")).toEqual({ current: 3, total: 10 });
  });

  it("recognises step keys only", () => {
    expect(isWizardStep("exam")).toBe(true);
    expect(isWizardStep("EXAM")).toBe(false);
    expect(isWizardStep("age-check")).toBe(false);
    expect(isWizardStep(undefined)).toBe(false);
  });
});

describe("persisted position", () => {
  it("maps the stored enum to the furthest screen; the goal and finish screens share DIAGNOSTIC_OFFER", () => {
    expect(furthestStep("COUNTRY", {})).toBe("country");
    expect(furthestStep("AGE_CHECK", {})).toBe("country");
    expect(furthestStep("TARGET_EXAM", {})).toBe("exam");
    expect(furthestStep("DIAGNOSTIC_OFFER", {})).toBe("goal");
    expect(furthestStep("DIAGNOSTIC_OFFER", { dailyGoalConfirmed: true })).toBe("finish");
    expect(furthestStep("COMPLETED", {})).toBe("done");
    expect(storedStepFor("goal")).toBe("DIAGNOSTIC_OFFER");
    expect(storedStepFor("finish")).toBe("DIAGNOSTIC_OFFER");
  });

  it("allows earlier screens and the furthest one, never later ones or any once completed", () => {
    expect(canVisit("country", "exam")).toBe(true);
    expect(canVisit("exam", "exam")).toBe(true);
    expect(canVisit("ability", "exam")).toBe(false);
    expect(canVisit("finish", "goal")).toBe(false);
    expect(canVisit("country", "done")).toBe(false);
  });
});

describe("planStepSave", () => {
  it("moves forward and never backward when nothing that later answers depend on changed", () => {
    expect(planStepSave("country", "COUNTRY", { changed: true })).toMatchObject({ stored: "EXAM_BOARD", clear: expect.any(Array), next: "board" });
    // Re-saving an earlier, unchanged answer keeps the furthest position.
    expect(planStepSave("year", "ABILITY", { changed: false })).toEqual({ stored: "ABILITY", clear: [], resetGoal: false, next: "subjects" });
    expect(planStepSave("subjects", "ABILITY", { changed: true })).toEqual({ stored: "ABILITY", clear: [], resetGoal: false, next: "exam" });
    expect(planStepSave("grade", "TARGET_GRADE", { changed: true })).toEqual({ stored: "DIAGNOSTIC_OFFER", clear: [], resetGoal: false, next: "goal" });
    expect(planStepSave("goal", "DIAGNOSTIC_OFFER", { changed: false })).toEqual({ stored: "DIAGNOSTIC_OFFER", clear: [], resetGoal: false, next: "finish" });
  });

  it("clears the answers that depend on a changed country, board or qualification and resumes at the next screen", () => {
    expect(planStepSave("country", "DIAGNOSTIC_OFFER", { changed: true })).toEqual({
      stored: "EXAM_BOARD",
      clear: ["examBoardId", "qualificationId", "yearGroupId", "targetExamSessionId", "targetGrade", "subjectIds"],
      resetGoal: true,
      next: "board",
    });
    expect(planStepSave("board", "ABILITY", { changed: true })).toEqual({
      stored: "LEVEL",
      clear: ["qualificationId", "targetExamSessionId", "targetGrade", "subjectIds"],
      resetGoal: true,
      next: "level",
    });
    expect(planStepSave("level", "ABILITY", { changed: true, levelChanged: false })).toEqual({
      stored: "YEAR_GROUP",
      clear: ["targetExamSessionId", "targetGrade", "subjectIds"],
      resetGoal: true,
      next: "year",
    });
    // O-Level → A-Level: the form is no longer right either.
    expect(planStepSave("level", "ABILITY", { changed: true, levelChanged: true }).clear).toContain("yearGroupId");
  });

  it("keeps later answers when an unchanged track screen is saved again", () => {
    expect(planStepSave("board", "ABILITY", { changed: false })).toEqual({ stored: "ABILITY", clear: [], resetGoal: false, next: "level" });
  });
});

describe("onboardingEntryRedirect", () => {
  it("lets a student mid-onboarding in and sends everyone else to their own area", () => {
    expect(onboardingEntryRedirect({ roles: ["STUDENT"], studentOnboardingCompleted: false })).toBeNull();
    expect(onboardingEntryRedirect({ roles: ["STUDENT"], studentOnboardingCompleted: true })).toBe("/app");
    expect(onboardingEntryRedirect({ roles: ["PARENT"], studentOnboardingCompleted: null })).toBe("/parent");
    expect(onboardingEntryRedirect({ roles: ["TEACHER"], studentOnboardingCompleted: null })).toBe("/teacher");
    expect(onboardingEntryRedirect({ roles: ["ADMIN"], studentOnboardingCompleted: null })).toBe("/admin");
    // A STUDENT role without a Student row would loop between /onboarding and the guard.
    expect(onboardingEntryRedirect({ roles: ["STUDENT"], studentOnboardingCompleted: null })).toBe("/");
    // A parent who is also a student mid-onboarding completes the student wizard.
    expect(onboardingEntryRedirect({ roles: ["STUDENT", "PARENT"], studentOnboardingCompleted: false })).toBeNull();
  });
});

describe("onboardingNext / withOnboardingNext", () => {
  it("keeps a safe destination outside the wizard and appends it to wizard links", () => {
    expect(onboardingNext("/app/classes/invite/t1")).toBe("/app/classes/invite/t1");
    expect(onboardingNext("/invite/abc?x=1")).toBe("/invite/abc?x=1");
    expect(withOnboardingNext("/onboarding/board", "/invite/abc")).toBe("/onboarding/board?next=%2Finvite%2Fabc");
    expect(withOnboardingNext("/onboarding?step=1", "/app/practice")).toBe("/onboarding?step=1&next=%2Fapp%2Fpractice");
  });

  it("never carries the bare dashboard, so the finish choice (diagnostic or dashboard) applies", () => {
    expect(onboardingNext("/app")).toBeNull();
    expect(onboardingNext("/app/")).toBeNull();
    expect(withOnboardingNext("/onboarding/board", "/app")).toBe("/onboarding/board");
    // A real page inside the app (or the app with a query) is still a destination.
    expect(onboardingNext("/app/practice")).toBe("/app/practice");
    expect(onboardingNext("/app?tab=today")).toBe("/app?tab=today");
  });

  it("drops hostile, auth and wizard destinations", () => {
    for (const bad of ["https://evil.example", "//evil.example", "/onboarding", "/onboarding/finish?x", "/login", "/change-password", "", null, 42]) {
      expect(onboardingNext(bad)).toBeNull();
    }
    expect(withOnboardingNext("/onboarding/board", "//evil.example")).toBe("/onboarding/board");
  });
});
