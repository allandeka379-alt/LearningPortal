import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createCurriculumChain } from "../../../tests/factories/curriculum";
import { createExamSession, createLearner, createLearningSetup, learnerActor } from "../../../tests/factories/learning";
import { enrolInSubjects, listEnrollments, unenrol, updateEnrollment } from "./service";

async function expectAppError(promise: Promise<unknown>, code: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error)).toBe(true);
    expect((error as { code: string }).code).toBe(code);
    return;
  }
  throw new Error(`expected AppError ${code}`);
}

describe("subject enrolment (§5, §26)", () => {
  it("pins the CURRENT syllabus version, applies the target exam, and computes an empty rollup", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 2, questionsPerLeaf: 0 });
    const session = await createExamSession(setup.qualificationId, { startsOn: "2027-11-01" });
    const { userId, actor } = await createLearner();
    const [view] = await enrolInSubjects(actor, { subjectIds: [setup.subjectId], targetExamSessionId: session.id, targetGrade: "A", abilityLevel: "BEGINNER" });
    expect(view).toMatchObject({
      status: "ACTIVE",
      enrolledVia: "SELF",
      targetGrade: "A",
      abilityLevel: "BEGINNER",
      syllabus: { id: setup.syllabusId, status: "CURRENT" },
      targetExamSession: { id: session.id, startsOn: "2027-11-01", isProvisional: true },
    });
    const progress = await db.subjectProgress.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId: setup.subjectId } } });
    expect(progress).toMatchObject({ topicsTotal: 4, topicsStarted: 0, progressPercent: 0, questionsAttempted: 0, readinessPercent: null });

    // Idempotent.
    const [again] = await enrolInSubjects(actor, { subjectIds: [setup.subjectId] });
    expect(again?.id).toBe(view?.id);
    expect(await db.subjectEnrollment.count({ where: { userId } })).toBe(1);
  });

  it("drops softly and re-activates the same enrolment (history kept)", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0 });
    const { actor } = await createLearner();
    const [view] = await enrolInSubjects(actor, { subjectIds: [setup.subjectId] });
    const dropped = await unenrol(actor, setup.subjectId);
    expect(dropped.status).toBe("DROPPED");
    expect(await listEnrollments(actor)).toEqual([]);
    expect((await listEnrollments(actor, { includeDropped: true }))[0]?.id).toBe(view?.id);
    const [back] = await enrolInSubjects(actor, { subjectIds: [setup.subjectId] });
    expect(back).toMatchObject({ id: view?.id, status: "ACTIVE" });
  });

  it("updates per-subject choices and validates them", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0 });
    const other = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, gradeScheme: false });
    const foreignSession = await createExamSession(other.qualificationId, { startsOn: "2027-06-01" });
    const { actor } = await createLearner();
    await enrolInSubjects(actor, { subjectIds: [setup.subjectId] });
    const paused = await updateEnrollment(actor, setup.subjectId, { status: "PAUSED", abilityLevel: "ADVANCED", targetGrade: "B" });
    expect(paused).toMatchObject({ status: "PAUSED", abilityLevel: "ADVANCED", targetGrade: "B" });
    expect((await listEnrollments(actor))[0]?.status).toBe("PAUSED");
    await expectAppError(updateEnrollment(actor, setup.subjectId, { targetGrade: "Z" }), "VALIDATION");
    await expectAppError(updateEnrollment(actor, setup.subjectId, { targetExamSessionId: foreignSession.id }), "VALIDATION");
    await expectAppError(updateEnrollment(actor, setup.subjectId, { routeId: other.syllabusId }), "VALIDATION");
    await expectAppError(updateEnrollment(actor, other.subjectId, { abilityLevel: "BEGINNER" }), "NOT_FOUND");
    await expectAppError(updateEnrollment(actor, setup.subjectId, {}), "VALIDATION");
  });

  it("refuses subjects that cannot be studied yet and non-students", async () => {
    const draft = await createCurriculumChain({ syllabusStatus: "DRAFT", lessonsPerTopic: 0 });
    const comingSoon = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, gradeScheme: false });
    await db.subject.update({ where: { id: comingSoon.subjectId }, data: { catalogueStatus: "COMING_SOON" } });
    const { userId, actor } = await createLearner();
    await expectAppError(enrolInSubjects(actor, { subjectIds: [draft.subject.id] }), "VALIDATION");
    await expectAppError(enrolInSubjects(actor, { subjectIds: [comingSoon.subjectId] }), "VALIDATION");
    await expectAppError(enrolInSubjects(actor, { subjectIds: ["0199a000-0000-7000-8000-000000000000"] }), "VALIDATION");
    await expectAppError(enrolInSubjects(learnerActor(userId, { roles: ["TEACHER"] }), { subjectIds: [comingSoon.subjectId] }), "FORBIDDEN");
    expect(await db.subjectEnrollment.count({ where: { userId } })).toBe(0);
  });
});
