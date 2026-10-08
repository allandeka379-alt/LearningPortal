import { beforeAll, describe, expect, it } from "vitest";
import { recordMarkingDecision, saveResponse, startAttempt, submitAttempt } from "@/server/attempts";
import { db } from "@/server/db";
import { createAssignment } from "./assignments";
import { removeStudent } from "./classes";
import { getAttemptForMarking, listMarkingQueue, markAnswer } from "./marking";
import { startAssignmentWork } from "./student";
import { createTeacherQuestion, createTeacherTest, publishTeacherTest } from "./test-builder";
import { expectCode, harareLocal, makeClass, makeStudent, teachingWorld, type TeachingWorld } from "./testing";

let world: TeachingWorld;
let testId: string;

beforeAll(async () => {
  world = await teachingWorld();
  const owner = { kind: "school", schoolId: world.schoolId };
  const essay = await createTeacherQuestion(world.teacher, {
    owner,
    subjectId: world.setup.subjectId,
    topicId: world.setup.topicIds[0],
    type: "ESSAY",
    markingMode: "MANUAL",
    stem: "Explain why the sky looks blue.",
    payload: null,
    answerSpec: {
      markScheme: {
        points: [
          { id: "P1", description: "Mentions scattering of light", marks: 2 },
          { id: "P2", description: "Links shorter wavelengths to blue", marks: 2 },
        ],
      },
      modelAnswer: "Air molecules scatter short (blue) wavelengths more.",
    },
    marks: 4,
    difficulty: 3,
    rightsConfirmed: true,
  });
  const mcq = await createTeacherQuestion(world.teacher, {
    owner,
    subjectId: world.setup.subjectId,
    topicId: world.setup.topicIds[0],
    type: "MULTIPLE_CHOICE",
    markingMode: "AUTO",
    stem: "Which colour has the shortest wavelength?",
    payload: { selectMode: "single", shuffleOptions: false },
    answerSpec: { scoring: "all_or_nothing" },
    marks: 1,
    options: [
      { key: "A", content: "Blue", isCorrect: true },
      { key: "B", content: "Red", isCorrect: false },
    ],
    difficulty: 1,
    rightsConfirmed: true,
  });
  const test = await createTeacherTest(world.teacher, {
    owner,
    subjectId: world.setup.subjectId,
    title: "Light quiz",
    kind: "QUIZ",
    feedbackTiming: "AFTER_SUBMIT",
    items: [
      { questionId: essay.id, marks: null },
      { questionId: mcq.id, marks: null },
    ],
  });
  await publishTeacherTest(world.teacher, { assessmentId: test.id });
  testId = test.id;
});

/** A class with one student who sat the quiz: the essay waits for the teacher, the MCQ is auto-marked. */
async function submittedQuiz() {
  const student = await makeStudent({ schoolId: world.schoolId, firstName: "Rudo" });
  const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [student.userId] });
  const assignment = await createAssignment(world.teacher, {
    classId: cls.id,
    type: "ASSESSMENT",
    title: "Light quiz",
    assessmentId: testId,
    dueAt: harareLocal(new Date(Date.now() + 86_400_000)),
  });
  const { href } = await startAssignmentWork(student.actor, { assignmentId: assignment.id });
  const attemptId = href.split("/").pop() as string;
  const slots = await db.questionAttempt.findMany({ where: { attemptId }, orderBy: { position: "asc" }, include: { question: { select: { type: true } } } });
  for (const slot of slots) {
    const response = slot.question.type === "ESSAY" ? { type: "ESSAY", text: "Light is scattered by air; blue scatters most." } : { type: "MULTIPLE_CHOICE", optionKeys: ["A"] };
    await saveResponse(student.actor, attemptId, slot.position, response);
  }
  await submitAttempt(student.actor, attemptId);
  const essaySlot = slots.find((s) => s.question.type === "ESSAY")!;
  const mcqSlot = slots.find((s) => s.question.type === "MULTIPLE_CHOICE")!;
  return { student, cls, assignmentId: assignment.id, attemptId, essayPosition: essaySlot.position, mcqPosition: mcqSlot.position };
}

describe("marking queue (§22)", () => {
  it("lists the answer waiting for the teacher and shows question, mark scheme, answer and AI suggestion", async () => {
    const quiz = await submittedQuiz();
    const queue = await listMarkingQueue(world.teacher, { classId: quiz.cls.id });
    expect(queue.items).toEqual([expect.objectContaining({ attemptId: quiz.attemptId, studentName: "Rudo", pendingAnswers: 1, assignmentTitle: "Light quiz" })]);
    expect(queue.totalPendingAnswers).toBe(1);

    // The AI marker was unsure (low confidence): its suggestion is shown to the teacher.
    await recordMarkingDecision({
      attemptId: quiz.attemptId,
      position: quiz.essayPosition,
      source: "AI",
      resultingStatus: "NEEDS_REVIEW",
      marksAwarded: 2,
      confidence: 0.4,
      aiModel: "test-model",
      promptVersion: "v1",
      points: [{ pointId: "P1", awarded: 2 }],
      comment: "Mentions scattering only.",
    });

    const view = await getAttemptForMarking(world.teacher, quiz.attemptId);
    expect(view.student.name).toBe("Rudo");
    const essay = view.answers.find((a) => a.position === quiz.essayPosition)!;
    expect(essay).toMatchObject({ needsMarking: true, isFinal: false, marksAvailable: 4, response: { type: "ESSAY" } });
    expect(essay.question?.stemHtml).toContain("sky looks blue");
    expect(essay.reveal?.markScheme?.points.map((p) => p.id)).toEqual(["P1", "P2"]);
    expect(essay.reveal?.modelAnswerHtml).toContain("scatter");
    expect(essay.aiSuggestion).toMatchObject({ marksAwarded: 2, confidence: 0.4, comment: "Mentions scattering only.", points: [{ pointId: "P1", awarded: 2 }] });
    const mcq = view.answers.find((a) => a.position === quiz.mcqPosition)!;
    expect(mcq).toMatchObject({ needsMarking: false, isFinal: true, markingStatus: "AUTO_MARKED", marksAwarded: 1 });
    expect(await db.auditLog.count({ where: { action: "student.view", targetUserId: quiz.student.userId, actorUserId: world.teacher.userId } })).toBe(1);
  });

  it("records the teacher's mark, re-scores the attempt and assignment progress, and tells the student", async () => {
    const quiz = await submittedQuiz();
    await expectCode(markAnswer(world.teacher, { attemptId: quiz.attemptId, position: quiz.essayPosition, marksAwarded: 9 }), "VALIDATION");
    const result = await markAnswer(world.teacher, { attemptId: quiz.attemptId, position: quiz.essayPosition, marksAwarded: 3, comment: "Good, add wavelengths." });
    expect(result).toMatchObject({ markingStatus: "TEACHER_MARKED", attemptStatus: "MARKED", pendingReviewCount: 0, percentage: 80 });
    const marking = await db.questionAttemptMarking.findFirstOrThrow({ where: { attemptId: quiz.attemptId, position: quiz.essayPosition, source: "TEACHER" } });
    expect(marking).toMatchObject({ markedById: world.teacher.userId, marksAwarded: 3, resultingStatus: "TEACHER_MARKED" });
    expect(await db.assignmentProgress.findUniqueOrThrow({ where: { assignmentId_userId: { assignmentId: quiz.assignmentId, userId: quiz.student.userId } } })).toMatchObject({
      status: "SUBMITTED",
      scorePercent: 80,
    });
    expect(await db.assignment.findUniqueOrThrow({ where: { id: quiz.assignmentId } })).toMatchObject({ submittedCount: 1, averageScorePercent: 80 });
    expect(await db.notification.count({ where: { userId: quiz.student.userId, type: "assignment.marked" } })).toBe(1);
    expect((await listMarkingQueue(world.teacher, { classId: quiz.cls.id })).items).toEqual([]);

    // Changing a final (auto) mark needs a reason the student will see.
    await expectCode(markAnswer(world.teacher, { attemptId: quiz.attemptId, position: quiz.mcqPosition, marksAwarded: 0 }), "VALIDATION");
    await expect(markAnswer(world.teacher, { attemptId: quiz.attemptId, position: quiz.mcqPosition, marksAwarded: 0, reason: "Answer copied." })).resolves.toMatchObject({
      markingStatus: "TEACHER_MARKED",
      percentage: 60,
    });
  });

  it("refuses other teachers, removed students, open attempts and students' own practice", async () => {
    const quiz = await submittedQuiz();
    const other = await teachingWorld({ topics: 1 });
    await expectCode(getAttemptForMarking(other.teacher, quiz.attemptId), "FORBIDDEN");
    await expectCode(markAnswer(other.teacher, { attemptId: quiz.attemptId, position: quiz.essayPosition, marksAwarded: 1 }), "FORBIDDEN");
    expect((await listMarkingQueue(other.teacher)).items.map((i) => i.attemptId)).not.toContain(quiz.attemptId);

    // Practice the student did on their own is never visible to a teacher.
    const own = await startAttempt(quiz.student.actor, { mode: "PRACTICE", subjectId: world.setup.subjectId, count: 1 });
    await expectCode(getAttemptForMarking(world.teacher, own.attempt.id), "NOT_FOUND");

    // A student removed from the class drops out of the queue and the views.
    await removeStudent(world.teacher, { classId: quiz.cls.id, userId: quiz.student.userId });
    expect((await listMarkingQueue(world.teacher, { classId: quiz.cls.id })).items).toEqual([]);
    await expectCode(getAttemptForMarking(world.teacher, quiz.attemptId), "NOT_FOUND");
  });

  it("does not mark work that is still in progress", async () => {
    const student = await makeStudent({ schoolId: world.schoolId });
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [student.userId] });
    const assignment = await createAssignment(world.teacher, { classId: cls.id, type: "ASSESSMENT", title: "Open", assessmentId: testId, dueAt: harareLocal(new Date(Date.now() + 86_400_000)) });
    const { href } = await startAssignmentWork(student.actor, { assignmentId: assignment.id });
    const attemptId = href.split("/").pop() as string;
    const [slot] = await db.questionAttempt.findMany({ where: { attemptId }, include: { question: { select: { type: true } } }, orderBy: { position: "asc" } });
    await saveResponse(student.actor, attemptId, slot!.position, slot!.question.type === "ESSAY" ? { type: "ESSAY", text: "x" } : { type: "MULTIPLE_CHOICE", optionKeys: ["A"] });
    await expectCode(markAnswer(world.teacher, { attemptId, position: slot!.position, marksAwarded: 1 }), "CONFLICT");
  });
});
