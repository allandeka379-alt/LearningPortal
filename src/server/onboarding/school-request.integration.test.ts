import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createSchool, createSchoolMember, createStudent, createUser, uniqueId } from "../../../tests/factories/index";
import { searchSchoolDirectory, requestSchoolMembership } from "@/server/schools/join-requests";
import { approveStudentRequest, listSchoolStudents } from "@/server/schools/students";
import { actorOf } from "@/server/schools/testing";
import { completeOnboarding, getOnboardingState, loadOnboardingStep, saveOnboardingStep, type OnboardingActor } from "./service";
import { createOnboardingCatalogue, type OnboardingCatalogue } from "./testing";

/**
 * Onboarding school picker (§5, §23 join requests): a student picks a directory school on the year screen; completing
 * the wizard creates SchoolMember(STUDENT, REQUESTED, source REQUEST), which the school's admins see and approve.
 * Countries are shared between test files (tiny ISO space), so each test searches only for its own uniquely named
 * schools.
 */

async function newStudent(): Promise<OnboardingActor> {
  const { user } = await createStudent({ student: { isMinor: false } });
  return { userId: user.id, roles: ["STUDENT"], timeZone: "Africa/Harare" };
}

async function upToYear(actor: OnboardingActor, catalogue: OnboardingCatalogue) {
  const { chain } = catalogue;
  await saveOnboardingStep(actor, "country", { countryId: chain.country.id });
  await saveOnboardingStep(actor, "board", { examBoardId: chain.examBoard.id });
  await saveOnboardingStep(actor, "level", { qualificationId: chain.qualification.id });
}

async function afterYear(actor: OnboardingActor, catalogue: OnboardingCatalogue) {
  await saveOnboardingStep(actor, "subjects", { subjectIds: [catalogue.chain.subject.id] });
  await saveOnboardingStep(actor, "exam", { targetExamSessionId: "" });
  await saveOnboardingStep(actor, "ability", { abilityLevel: "INTERMEDIATE" });
  await saveOnboardingStep(actor, "grade", { targetGrade: "" });
  await saveOnboardingStep(actor, "goal", { dailyGoalMinutes: 30 });
}

/** A school in the catalogue's country with an ACTIVE admin. */
async function directorySchool(countryId: string, name: string, options: { status?: "ACTIVE" | "PENDING_VERIFICATION"; settings?: object } = {}) {
  const { school } = await createSchool({ countryId, name, status: options.status ?? "ACTIVE" });
  if (options.settings) await db.school.update({ where: { id: school.id }, data: { settings: options.settings } });
  await db.school.update({ where: { id: school.id }, data: { town: "Gweru" } });
  const admin = (await createUser({ firstName: "Head" })).user;
  await createSchoolMember({ schoolId: school.id, userId: admin.id, role: "SCHOOL_ADMIN" });
  return { school, adminActor: await actorOf(admin.id) };
}

describe("school directory", () => {
  it("lists verified schools of the country that accept join requests, by name or town", async () => {
    const catalogue = await createOnboardingCatalogue();
    const countryId = catalogue.chain.country.id;
    const tag = uniqueId("dir").replace(/-/g, "").slice(0, 10);
    const open = await directorySchool(countryId, `Mkoba ${tag} High`);
    await directorySchool(countryId, `Mkoba ${tag} Unverified`, { status: "PENDING_VERIFICATION" });
    await directorySchool(countryId, `Mkoba ${tag} Closed Doors`, { settings: { version: 1, allowStudentJoinRequests: false } });

    expect(await searchSchoolDirectory({ countryId, query: tag })).toEqual([{ id: open.school.id, name: `Mkoba ${tag} High`, place: "Gweru" }]);
    expect(await searchSchoolDirectory({ countryId, query: tag.toUpperCase() })).toHaveLength(1);
    expect(await searchSchoolDirectory({ countryId, query: "M" })).toEqual([]);
    expect(await searchSchoolDirectory({ countryId: "not-a-uuid", query: tag })).toEqual([]);
    expect(await searchSchoolDirectory({ countryId: randomUUID(), query: tag })).toEqual([]);
  });
});

describe("onboarding school picker", () => {
  it("asks to join the picked school on completion; the school's admin sees and approves the request", async () => {
    const catalogue = await createOnboardingCatalogue();
    const countryId = catalogue.chain.country.id;
    const tag = uniqueId("pick").replace(/-/g, "").slice(0, 10);
    const { school, adminActor } = await directorySchool(countryId, `Chaplin ${tag} High`);
    const actor = await newStudent();
    await upToYear(actor, catalogue);

    // The year screen offers the picker with search results.
    const view = await loadOnboardingStep(actor, "year", undefined, { schoolQuery: tag });
    if (view.kind !== "STEP" || view.view.step !== "year") throw new Error("expected the year screen");
    expect(view.view.school).toEqual({ selected: null, query: tag, results: [{ id: school.id, name: `Chaplin ${tag} High`, place: "Gweru" }], minQueryLength: 2 });

    // Only directory schools can be picked (verified, of the student's country, taking requests).
    const unverified = await directorySchool(countryId, `Unverified ${tag}`, { status: "PENDING_VERIFICATION" });
    try {
      await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId, schoolId: unverified.school.id });
      throw new Error("expected a validation error");
    } catch (error) {
      expect(isAppError(error) && error.fieldErrors?.schoolId).toEqual(["Choose a school from the list."]);
    }
    await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId, schoolId: school.id });
    expect((await getOnboardingState(actor)).data.schoolId).toBe(school.id);
    const again = await loadOnboardingStep(actor, "year");
    expect(again.kind === "STEP" && again.view.step === "year" && again.view.school?.selected?.id).toBe(school.id);
    // No request until the wizard is complete.
    expect(await db.schoolMember.count({ where: { schoolId: school.id, userId: actor.userId } })).toBe(0);

    await afterYear(actor, catalogue);
    await completeOnboarding(actor, { choice: "dashboard" });
    // Completion also queues the student's referral check (§46: onboarding is part of the activity rule).
    expect(await db.job.count({ where: { type: "referrals.qualify", dedupeKey: `referral:qualify:${actor.userId}` } })).toBe(1);
    expect(await db.schoolMember.findUniqueOrThrow({ where: { schoolId_userId_role: { schoolId: school.id, userId: actor.userId, role: "STUDENT" } } })).toMatchObject({
      status: "REQUESTED",
      source: "REQUEST",
      joinedAt: null,
    });

    const requests = await listSchoolStudents(adminActor, { schoolId: school.id, status: "REQUESTED" });
    expect(requests.items.map((item) => item.userId)).toEqual([actor.userId]);
    await approveStudentRequest(adminActor, { schoolId: school.id, userId: actor.userId });
    expect(await db.schoolMember.findUniqueOrThrow({ where: { schoolId_userId_role: { schoolId: school.id, userId: actor.userId, role: "STUDENT" } } })).toMatchObject({
      status: "ACTIVE",
      source: "REQUEST",
    });
    expect((await db.student.findUniqueOrThrow({ where: { userId: actor.userId } })).schoolId).toBe(school.id);
  });

  it("lets the student clear the choice and never touches an existing membership", async () => {
    const catalogue = await createOnboardingCatalogue();
    const countryId = catalogue.chain.country.id;
    const tag = uniqueId("clr").replace(/-/g, "").slice(0, 10);
    const { school } = await directorySchool(countryId, `Senga ${tag} High`);
    const actor = await newStudent();
    await upToYear(actor, catalogue);
    await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId, schoolId: school.id });
    // Absent field = keep; "" = none.
    await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId });
    expect((await getOnboardingState(actor)).data.schoolId).toBe(school.id);
    await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId, schoolId: "" });
    expect((await getOnboardingState(actor)).data.schoolId).toBeUndefined();

    await saveOnboardingStep(actor, "year", { yearGroupId: catalogue.yearGroupId, schoolId: school.id });
    // Saving the same country again keeps it (a different country would drop it: schools belong to a country).
    await saveOnboardingStep(actor, "country", { countryId });
    expect((await getOnboardingState(actor)).data.schoolId).toBe(school.id);

    // A declined (REMOVED) or existing row is never reopened by a new request.
    const removed = await createStudent();
    await createSchoolMember({ schoolId: school.id, userId: removed.user.id, role: "STUDENT", status: "REMOVED" });
    expect(await requestSchoolMembership(db, { userId: removed.user.id, countryId, schoolId: school.id })).toBe("existing");
    expect((await db.schoolMember.findUniqueOrThrow({ where: { schoolId_userId_role: { schoolId: school.id, userId: removed.user.id, role: "STUDENT" } } })).status).toBe("REMOVED");
    expect(await requestSchoolMembership(db, { userId: removed.user.id, countryId: randomUUID(), schoolId: school.id })).toBe("unavailable");
  });

  it("hides the picker from students who already belong to a school", async () => {
    const catalogue = await createOnboardingCatalogue();
    const { school } = await directorySchool(catalogue.chain.country.id, `Mutare ${uniqueId("m").slice(0, 8)} High`);
    const actor = await newStudent();
    await createSchoolMember({ schoolId: school.id, userId: actor.userId, role: "STUDENT" });
    await upToYear(actor, catalogue);
    const view = await loadOnboardingStep(actor, "year", undefined, { schoolQuery: "Mutare" });
    expect(view.kind === "STEP" && view.view.step === "year" && view.view.school).toBeNull();
  });
});
