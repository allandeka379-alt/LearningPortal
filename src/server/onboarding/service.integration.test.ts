import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createParent, createStudent } from "../../../tests/factories/identity";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { completeOnboarding, getOnboardingState, loadOnboardingStep, saveOnboardingStep, type OnboardingActor } from "./service";
import { createOnboardingCatalogue, type OnboardingCatalogue } from "./testing";

/**
 * Integration: the onboarding wizard service against the test database (§5, §52 steps 2-4): screen views from the
 * catalogue, validation, resumability (the furthest screen is stored), invalidation of dependent answers, and
 * completion enrolling the chosen subjects with their syllabus version pinned by the target exam date (§26).
 */

async function expectAppError(promise: Promise<unknown>, code: string): Promise<{ message: string; fieldErrors: Record<string, string[]> }> {
  try {
    await promise;
  } catch (error) {
    if (!isAppError(error)) throw error;
    expect(error.code).toBe(code);
    return { message: error.message, fieldErrors: error.fieldErrors ?? {} };
  }
  throw new Error(`expected AppError ${code}`);
}

async function newStudent(): Promise<OnboardingActor> {
  const { user } = await createStudent({ student: { isMinor: false } });
  return { userId: user.id, roles: ["STUDENT"], timeZone: "Africa/Harare" };
}

/** Answers every screen up to (not including) `finish` with the catalogue's main choices. */
async function answerAll(actor: OnboardingActor, catalogue: OnboardingCatalogue) {
  const { chain } = catalogue;
  await saveOnboardingStep(actor, "country", { countryId: chain.country.id });
  await saveOnboardingStep(actor, "board", { examBoardId: chain.examBoard.id });
  await saveOnboardingStep(actor, "level", { qualificationId: chain.qualification.id });
  await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId });
  await saveOnboardingStep(actor, "subjects", { subjectIds: [chain.subject.id, catalogue.subjectB.id] });
  await saveOnboardingStep(actor, "exam", { targetExamSessionId: catalogue.session2028Id });
  await saveOnboardingStep(actor, "ability", { abilityLevel: "INTERMEDIATE" });
  await saveOnboardingStep(actor, "grade", { targetGrade: "B" });
  await saveOnboardingStep(actor, "goal", { dailyGoalMinutes: 30 });
}

describe("onboarding wizard service", () => {
  it("walks every screen with validation and resumes at the furthest one reached", async () => {
    const catalogue = await createOnboardingCatalogue();
    const { chain } = catalogue;
    const actor = await newStudent();

    let state = await getOnboardingState(actor);
    expect(state).toMatchObject({ stored: "COUNTRY", furthest: "country", completed: false });
    expect(await loadOnboardingStep(actor, "board")).toEqual({ kind: "REDIRECT", href: "/onboarding/country" });

    // Country
    const countryStep = await loadOnboardingStep(actor, "country");
    expect(countryStep.kind === "STEP" && countryStep.view.step === "country" && countryStep.view.countries.some((c) => c.id === chain.country.id)).toBe(true);
    expect((await expectAppError(saveOnboardingStep(actor, "country", { countryId: "zimbabwe" }), "VALIDATION")).fieldErrors.countryId).toEqual(["Choose your country."]);
    expect((await expectAppError(saveOnboardingStep(actor, "country", { countryId: randomUUID() }), "VALIDATION")).fieldErrors.countryId).toEqual([
      "Choose a country from the list.",
    ]);
    expect(await saveOnboardingStep(actor, "country", { countryId: chain.country.id })).toEqual({ next: "board", href: "/onboarding/board" });
    expect((await db.profile.findUniqueOrThrow({ where: { userId: actor.userId }, select: { countryId: true } })).countryId).toBe(chain.country.id);

    // Board
    const boardStep = await loadOnboardingStep(actor, "board");
    expect(boardStep.kind === "STEP" && boardStep.view.step === "board" && boardStep.view.boards.some((b) => b.id === chain.examBoard.id && b.available)).toBe(true);
    await expectAppError(saveOnboardingStep(actor, "board", { examBoardId: randomUUID() }), "VALIDATION");
    await saveOnboardingStep(actor, "board", { examBoardId: chain.examBoard.id });

    // Level: grouped by level; coming-soon qualifications are listed but refused.
    const levelStep = await loadOnboardingStep(actor, "level");
    if (levelStep.kind !== "STEP" || levelStep.view.step !== "level") throw new Error("expected the level screen");
    const options = levelStep.view.groups.flatMap((g) => g.options);
    expect(options.find((o) => o.id === catalogue.comingSoonQualificationId)?.available).toBe(false);
    expect(levelStep.view.groups.length).toBe(2);
    expect((await expectAppError(saveOnboardingStep(actor, "level", { qualificationId: catalogue.comingSoonQualificationId }), "VALIDATION")).fieldErrors.qualificationId?.[0]).toMatch(
      /coming soon/,
    );
    await saveOnboardingStep(actor, "level", { qualificationId: chain.qualification.id });

    // Year: the level's typical years first, the rest on request.
    const yearStep = await loadOnboardingStep(actor, "year");
    if (yearStep.kind !== "STEP" || yearStep.view.step !== "year") throw new Error("expected the year screen");
    expect(yearStep.view.primary.map((o) => o.id)).toContain(catalogue.yearGroupId);
    expect(yearStep.view.others.map((o) => o.id)).toContain(catalogue.otherYearGroupId);
    await expectAppError(saveOnboardingStep(actor, "year", { yearGroupId: randomUUID() }), "VALIDATION");
    // "No year" is only accepted where the country has no year groups at all.
    expect((await expectAppError(saveOnboardingStep(actor, "year", { yearGroupId: "" }), "VALIDATION")).fieldErrors.yearGroupId).toEqual(["Choose your year or form."]);
    await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId });

    // Subjects: only AVAILABLE subjects with a published syllabus are selectable.
    const subjectStep = await loadOnboardingStep(actor, "subjects");
    if (subjectStep.kind !== "STEP" || subjectStep.view.step !== "subjects") throw new Error("expected the subjects screen");
    expect(subjectStep.view.groups.flatMap((g) => g.subjects.map((s) => s.id)).sort()).toEqual([chain.subject.id, catalogue.subjectB.id].sort());
    expect(subjectStep.view.comingSoon.map((s) => s.id).sort()).toEqual([catalogue.comingSoonSubject.id, catalogue.noSyllabusSubject.id].sort());
    expect(subjectStep.view.groups[0]?.subjects.find((s) => s.id === chain.subject.id)?.code).toBe(chain.subject.officialCode);
    expect((await expectAppError(saveOnboardingStep(actor, "subjects", { subjectIds: [] }), "VALIDATION")).fieldErrors.subjectIds).toEqual(["Choose at least one subject."]);
    expect((await expectAppError(saveOnboardingStep(actor, "subjects", { subjectIds: [catalogue.comingSoonSubject.id] }), "VALIDATION")).fieldErrors.subjectIds).toEqual([
      `Not available yet: ${catalogue.comingSoonSubject.name}.`,
    ]);
    await saveOnboardingStep(actor, "subjects", { subjectIds: [chain.subject.id, catalogue.subjectB.id, chain.subject.id] });

    // Resumability: the position is stored; earlier screens stay open, later ones redirect.
    state = await getOnboardingState(actor);
    expect(state).toMatchObject({ stored: "TARGET_EXAM", furthest: "exam" });
    expect(state.answers.subjectIds).toEqual([chain.subject.id, catalogue.subjectB.id]);
    expect((await loadOnboardingStep(actor, "country")).kind).toBe("STEP");
    expect(await loadOnboardingStep(actor, "grade")).toEqual({ kind: "REDIRECT", href: "/onboarding/exam" });
    await expectAppError(saveOnboardingStep(actor, "grade", { targetGrade: "B" }), "CONFLICT");

    // Target exam: sessions of the qualification, provisional ones flagged; "not sure yet" is a real answer.
    const examStep = await loadOnboardingStep(actor, "exam");
    if (examStep.kind !== "STEP" || examStep.view.step !== "exam") throw new Error("expected the exam screen");
    expect(examStep.view.sessions.map((s) => [s.id, s.isProvisional])).toEqual([
      [catalogue.session2027Id, false],
      [catalogue.session2028Id, true],
    ]);
    expect(examStep.view.answered).toBe(false);
    await expectAppError(saveOnboardingStep(actor, "exam", {}), "VALIDATION");
    await saveOnboardingStep(actor, "exam", { targetExamSessionId: "" });
    const examAgain = await loadOnboardingStep(actor, "exam");
    expect(examAgain.kind === "STEP" && examAgain.view.step === "exam" && examAgain.view.answered && examAgain.view.selectedId === null).toBe(true);
    await saveOnboardingStep(actor, "exam", { targetExamSessionId: catalogue.session2028Id });
    expect((await getOnboardingState(actor)).furthest).toBe("ability");

    // Ability, grade (from the qualification's grade scheme), daily goal
    await expectAppError(saveOnboardingStep(actor, "ability", { abilityLevel: "EXPERT" }), "VALIDATION");
    await saveOnboardingStep(actor, "ability", { abilityLevel: "INTERMEDIATE" });
    const gradeStep = await loadOnboardingStep(actor, "grade");
    expect(gradeStep.kind === "STEP" && gradeStep.view.step === "grade" ? gradeStep.view.grades : []).toEqual(["A", "B", "C", "U"]);
    expect((await expectAppError(saveOnboardingStep(actor, "grade", { targetGrade: "Z" }), "VALIDATION")).fieldErrors.targetGrade).toEqual(["Choose a grade from the list."]);
    await saveOnboardingStep(actor, "grade", { targetGrade: "B" });
    expect((await getOnboardingState(actor)).furthest).toBe("goal");
    const goalStep = await loadOnboardingStep(actor, "goal");
    expect(goalStep.kind === "STEP" && goalStep.view.step === "goal" && goalStep.view.options.includes(goalStep.view.defaultMinutes)).toBe(true);
    expect((await expectAppError(saveOnboardingStep(actor, "goal", { dailyGoalMinutes: 3 }), "VALIDATION")).fieldErrors.dailyGoalMinutes).toEqual(["Set at least 5 minutes."]);
    expect(await saveOnboardingStep(actor, "goal", { dailyGoalMinutes: 30 })).toEqual({ next: "finish", href: "/onboarding/finish" });
    expect((await db.learnerStats.findUniqueOrThrow({ where: { userId: actor.userId } })).dailyGoalMinutes).toBe(30);

    // Finish screen: the summary of everything chosen.
    const finish = await loadOnboardingStep(actor, "finish");
    if (finish.kind !== "STEP" || finish.view.step !== "finish") throw new Error("expected the finish screen");
    expect(finish.view.summary).toMatchObject({
      country: chain.country.name,
      qualification: chain.qualification.name,
      subjects: [chain.subject.name, catalogue.subjectB.name],
      exam: { name: "November 2028 (test)", startsOn: "2028-11-02", isProvisional: true },
      abilityLevel: "INTERMEDIATE",
      targetGrade: "B",
      dailyGoalMinutes: 30,
    });
    // Re-saving an unchanged earlier answer keeps the student at the finish screen.
    await saveOnboardingStep(actor, "level", { qualificationId: chain.qualification.id });
    expect((await getOnboardingState(actor)).furthest).toBe("finish");
  });

  it("completes onboarding by enrolling the chosen subjects with their syllabus version pinned by the target exam", async () => {
    const catalogue = await createOnboardingCatalogue();
    const { chain } = catalogue;
    const actor = await newStudent();
    await answerAll(actor, catalogue);

    await expectAppError(completeOnboarding(actor, { choice: "later" }), "VALIDATION");
    const done = await completeOnboarding(actor, { choice: "diagnostic" }, new Date());
    expect(done.href).toBe("/app/diagnostic?from=onboarding");
    expect(done.enrolments.map((e) => e.subject.id)).toEqual([chain.subject.id, catalogue.subjectB.id]);

    const enrolments = await db.subjectEnrollment.findMany({
      where: { userId: actor.userId },
      select: { subjectId: true, syllabusId: true, status: true, targetExamSessionId: true, targetGrade: true, abilityLevel: true, enrolledVia: true },
    });
    const bySubject = new Map(enrolments.map((e) => [e.subjectId, e]));
    // November 2028 falls in the UPCOMING version's range (from 2028), not the CURRENT one (to 2027).
    expect(bySubject.get(chain.subject.id)).toEqual({
      subjectId: chain.subject.id,
      syllabusId: catalogue.upcomingSyllabusId,
      status: "ACTIVE",
      targetExamSessionId: catalogue.session2028Id,
      targetGrade: "B",
      abilityLevel: "INTERMEDIATE",
      enrolledVia: "SELF",
    });
    expect(bySubject.get(catalogue.subjectB.id)?.syllabusId).toBe(catalogue.subjectB.syllabusId);

    const student = await db.student.findUniqueOrThrow({ where: { userId: actor.userId } });
    expect(student).toMatchObject({
      onboardingStep: "COMPLETED",
      countryId: chain.country.id,
      examBoardId: chain.examBoard.id,
      qualificationId: chain.qualification.id,
      yearGroupId: catalogue.yearGroupId,
      targetExamSessionId: catalogue.session2028Id,
      diagnosticSkippedAt: null,
    });
    expect(student.onboardingCompletedAt).not.toBeNull();
    expect(student.onboardingData).toMatchObject({ version: 1, wantsDiagnostic: true, dailyGoalConfirmed: true });

    // Idempotent afterwards; the wizard is closed.
    expect(await completeOnboarding(actor, { choice: "dashboard" })).toEqual({ href: "/app", enrolments: [] });
    expect((await db.student.findUniqueOrThrow({ where: { userId: actor.userId } })).diagnosticSkippedAt).toBeNull();
    expect(await loadOnboardingStep(actor, "country")).toEqual({ kind: "REDIRECT", href: "/app" });
    await expectAppError(saveOnboardingStep(actor, "country", { countryId: chain.country.id }), "CONFLICT");
  });

  it("pins the CURRENT version without a target exam and records a skipped diagnostic", async () => {
    const catalogue = await createOnboardingCatalogue();
    const { chain } = catalogue;
    const actor = await newStudent();
    await answerAll(actor, catalogue);
    await saveOnboardingStep(actor, "exam", { targetExamSessionId: "" });
    await saveOnboardingStep(actor, "grade", { targetGrade: "" });
    expect((await getOnboardingState(actor)).furthest).toBe("finish");

    expect((await completeOnboarding(actor, { choice: "dashboard" })).href).toBe("/app");
    const enrolment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId: actor.userId, subjectId: chain.subject.id } } });
    expect(enrolment).toMatchObject({ syllabusId: chain.syllabus.id, targetExamSessionId: null, targetGrade: null });
    const student = await db.student.findUniqueOrThrow({ where: { userId: actor.userId } });
    expect(student.diagnosticSkippedAt).not.toBeNull();
    expect(student.onboardingData).toMatchObject({ wantsDiagnostic: false });
  });

  it("clears answers that no longer fit when the level changes, and sends the student forward again from there", async () => {
    const catalogue = await createOnboardingCatalogue();
    const { chain } = catalogue;
    const actor = await newStudent();
    await answerAll(actor, catalogue);

    // O-Level → A-Level qualification of the same board: sessions, grade, subjects and the form no longer apply.
    expect(await saveOnboardingStep(actor, "level", { qualificationId: catalogue.otherLevelQualificationId })).toEqual({ next: "year", href: "/onboarding/year" });
    const state = await getOnboardingState(actor);
    expect(state).toMatchObject({ stored: "YEAR_GROUP", furthest: "year" });
    expect(state.answers).toMatchObject({
      qualificationId: catalogue.otherLevelQualificationId,
      yearGroupId: null,
      subjectIds: [],
      targetExamSessionId: null,
      targetGrade: null,
      abilityLevel: "INTERMEDIATE",
      dailyGoalMinutes: 30,
    });
    expect(state.data.dailyGoalConfirmed).toBeUndefined();
    expect(await loadOnboardingStep(actor, "finish")).toEqual({ kind: "REDIRECT", href: "/onboarding/year" });

    // Saving an unchanged country again keeps every later answer and the position.
    await saveOnboardingStep(actor, "level", { qualificationId: chain.qualification.id });
    await saveOnboardingStep(actor, "country", { countryId: chain.country.id });
    expect(await getOnboardingState(actor)).toMatchObject({ furthest: "year", answers: { qualificationId: chain.qualification.id } });
  });

  it("refuses to complete with a subject withdrawn after it was chosen, saying which", async () => {
    const catalogue = await createOnboardingCatalogue();
    const actor = await newStudent();
    await answerAll(actor, catalogue);
    await db.subject.update({ where: { id: catalogue.subjectB.id }, data: { catalogueStatus: "COMING_SOON" } });

    const error = await expectAppError(completeOnboarding(actor, { choice: "diagnostic" }), "VALIDATION");
    expect(error.message).toMatch(/Go back to Subjects/);
    expect(error.fieldErrors.subjectIds).toEqual([`${catalogue.subjectB.name} is not available yet.`]);
    expect((await db.student.findUniqueOrThrow({ where: { userId: actor.userId } })).onboardingCompletedAt).toBeNull();
  });

  it("is for students only", async () => {
    const { user: parent } = await createParent();
    await expectAppError(getOnboardingState({ userId: parent.id, roles: ["PARENT"] }), "FORBIDDEN");
    // A STUDENT role without a Student row cannot be onboarded either.
    await expectAppError(saveOnboardingStep({ userId: parent.id, roles: ["STUDENT"] }, "country", { countryId: randomUUID() }), "FORBIDDEN");
  });
});
