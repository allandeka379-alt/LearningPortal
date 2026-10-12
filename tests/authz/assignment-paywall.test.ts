import { describe, expect, it } from "vitest";
import { answerAndMark, startAttempt } from "@/server/attempts";
import { assignmentWorkSponsored, getEntitlements } from "@/server/billing/entitlements";
import { practiceQuestionsToday } from "@/server/billing/usage";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { resolveLessonAccess } from "@/server/lessons/access";
import { createAssignment } from "@/server/teaching/assignments";
import { createClass as createTeachingClass } from "@/server/teaching/classes";
import { joinClassByCode, startAssignmentWork } from "@/server/teaching/student";
import { harareLocal, teacherActor } from "@/server/teaching/testing";
import {
  correctResponse,
  createAssessment,
  createClass,
  createEnrollment,
  createLearner,
  createLearningSetup,
  createLessonForTopic,
  createSchool,
  createSchoolMember,
  createTeacher,
  sponsorAssignments,
  type LearningSetup,
} from "../factories/index";

/**
 * AUTHZ-1 regression (§22 assignments, §31 plans, CLAUDE.md rule 9): assignment work skips the student's own plan gates
 * ONLY when the class's tenant sponsors it (holds the `assignments` entitlement). A self-registered TEACHER with no
 * school and no plan ("free tutor") used to unlock PREMIUM lessons, PREMIUM mock exams and the premium practice pool
 * for any free student who joined their class by code.
 */

async function codeOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
    return "OK";
  } catch (error) {
    return isAppError(error) ? error.code : String(error);
  }
}

const due = () => harareLocal(new Date(Date.now() + 7 * 86_400_000));

/** A self-registered teacher with no school, subscription or grant, running a school-less class the student joined. */
async function freeTutorClass(subjectId: string, studentActor: Parameters<typeof joinClassByCode>[0]) {
  const { user } = await createTeacher({ firstName: "Tutor" });
  const tutor = teacherActor(user.id);
  const cls = await createTeachingClass(tutor, { name: "Free premium club", subjectId, academicYear: "2026" });
  expect((await joinClassByCode(studentActor, { code: cls.joinCode })).status).toBe("ACTIVE");
  return { tutor, cls };
}

function definitionOf(setup: LearningSetup, questionId: string) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

describe("AUTHZ-1: assignment work is plan-exempt only when the class tenant sponsors it", () => {
  it("a free tutor's assignments do not unlock PREMIUM lessons, mock exams or the premium practice pool", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 3, accessTier: "PREMIUM", lessonsPerTopic: 0 });
    const { lesson } = await createLessonForTopic({ subjectId: setup.subjectId, topicId: setup.topicIds[0]!, accessTier: "PREMIUM", title: "Premium lesson" });
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      accessTier: "PREMIUM",
      timeLimitSeconds: 3600,
      sections: [{ questionIds: setup.questions.slice(0, 2).map((q) => q.id) }],
    });
    const student = await createLearner({ features: null });
    await createEnrollment(student.userId, setup);
    // The shared default plan may hold any values (tests/README.md): nothing to prove if it already opens these.
    const own = (await getEntitlements(student.userId)).entitlements;
    if (own.lessonAccess === "ALL" || own.mockExams || own.assignments) return;

    // Controls: the student's own plan refuses the paid content.
    expect((await resolveLessonAccess(student.actor, lesson.id)).open).toBe(false);
    expect(await codeOf(startAttempt(student.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }))).toBe("ENTITLEMENT_REQUIRED");

    const { tutor, cls } = await freeTutorClass(setup.subjectId, student.actor);
    expect(await assignmentWorkSponsored({ schoolId: null, createdById: tutor.userId })).toBe(false);
    await createAssignment(tutor, { classId: cls.id, type: "LESSON", title: "Read", lessonId: lesson.id, dueAt: due() });
    const mockWork = await createAssignment(tutor, { classId: cls.id, type: "ASSESSMENT", title: "Mock", assessmentId: mock.id, dueAt: due() });
    const practiceWork = await createAssignment(tutor, {
      classId: cls.id,
      type: "PRACTICE",
      title: "Practice",
      topicIds: [setup.topicIds[0]],
      questionCount: "3",
      dueAt: due(),
    });

    // The assigned PREMIUM lesson is reachable but stays locked.
    expect(await resolveLessonAccess(student.actor, lesson.id)).toMatchObject({ assigned: true, open: false, accessTier: "PREMIUM" });
    // The PREMIUM mock needs the student's own mock_exams entitlement.
    expect(await codeOf(startAssignmentWork(student.actor, { assignmentId: mockWork.id }))).toBe("ENTITLEMENT_REQUIRED");
    // Practice runs on the student's own plan: with no free tier (2026-10-12) it needs Full access (before 2026-10-12 the
    // free question pool simply had no PREMIUM questions: NOT_FOUND).
    expect(["ENTITLEMENT_REQUIRED", "NOT_FOUND"]).toContain(await codeOf(startAssignmentWork(student.actor, { assignmentId: practiceWork.id })));
    expect(await db.assessmentAttempt.count({ where: { userId: student.userId, assignmentId: { in: [mockWork.id, practiceWork.id] } } })).toBe(0);

    // Once the tutor pays for assignments (here: a grant of the `assignments` entitlement), the same work is exempt.
    await sponsorAssignments({ schoolId: null, createdById: tutor.userId });
    expect((await resolveLessonAccess(student.actor, lesson.id)).open).toBe(true);
    expect((await startAssignmentWork(student.actor, { assignmentId: mockWork.id })).href).toMatch(/^\/app\/exams\/attempt\//);
    await startAssignmentWork(student.actor, { assignmentId: practiceWork.id });
    const practiceAttempt = await db.assessmentAttempt.findFirstOrThrow({ where: { userId: student.userId, assignmentId: practiceWork.id } });
    const slots = await db.questionAttempt.findMany({ where: { attemptId: practiceAttempt.id }, select: { question: { select: { accessTier: true } } } });
    expect(slots.length).toBeGreaterThan(0);
    expect(slots.every((slot) => slot.question.accessTier === "PREMIUM")).toBe(true);
  });

  it("unsponsored assignment practice counts toward the student's daily allowance; sponsored practice does not", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 4, lessonsPerTopic: 0 });
    const student = await createLearner({ features: null });
    await createEnrollment(student.userId, setup);
    const own = (await getEntitlements(student.userId)).entitlements;
    // No free tier (2026-10-12): the shared default plan allows no practice at all, so there is no allowance to count.
    if (own.practiceQuestionsPerDay === 0 || own.lessonAccess !== "ALL" || own.assignments) return;

    const answerFirst = async (assignmentId: string) => {
      await startAssignmentWork(student.actor, { assignmentId });
      const attempt = await db.assessmentAttempt.findFirstOrThrow({ where: { userId: student.userId, assignmentId }, select: { id: true, config: true } });
      const [slot] = await db.questionAttempt.findMany({ where: { attemptId: attempt.id }, orderBy: { position: "asc" }, take: 1 });
      await answerAndMark(student.actor, attempt.id, slot!.position, correctResponse(definitionOf(setup, slot!.questionId)));
      return attempt;
    };
    expect(await practiceQuestionsToday(student.userId)).toBe(0);

    const { tutor, cls } = await freeTutorClass(setup.subjectId, student.actor);
    const unsponsored = await createAssignment(tutor, { classId: cls.id, type: "PRACTICE", title: "Drill", topicIds: [setup.topicIds[0]], questionCount: "2", dueAt: due() });
    const gated = await answerFirst(unsponsored.id);
    expect(gated.config).toMatchObject({ planGated: true });
    expect(await practiceQuestionsToday(student.userId)).toBe(1);

    // A school that pays for assignments: its work never uses the student's allowance.
    const school = await createClass({ studentUserIds: [student.userId], subjectId: setup.subjectId });
    await sponsorAssignments(school.class);
    const sponsoredWork = await createAssignment(teacherActor(school.class.createdById), {
      classId: school.class.id,
      type: "PRACTICE",
      title: "School drill",
      topicIds: [setup.topicIds[0]],
      questionCount: "2",
      dueAt: due(),
    });
    const exempt = await answerFirst(sponsoredWork.id);
    expect(exempt.config).not.toHaveProperty("planGated");
    expect(await practiceQuestionsToday(student.userId)).toBe(1);
  });

  it("a school's plan sponsors its own classes, never its teachers' private classes", async () => {
    const { school } = await createSchool();
    const { user } = await createTeacher({ firstName: "Moonlighter" });
    if ((await getEntitlements(user.id)).entitlements.assignments) return; // the shared default plan grants assignments
    await createSchoolMember({ schoolId: school.id, userId: user.id, role: "TEACHER" });
    await sponsorAssignments({ schoolId: school.id, createdById: user.id });
    expect(await assignmentWorkSponsored({ schoolId: school.id, createdById: user.id })).toBe(true);
    expect(await assignmentWorkSponsored({ schoolId: null, createdById: user.id })).toBe(false);
    // An unpaid school sponsors nothing.
    const { school: unpaid } = await createSchool();
    expect(await assignmentWorkSponsored({ schoolId: unpaid.id, createdById: user.id })).toBe(false);
  });
});
