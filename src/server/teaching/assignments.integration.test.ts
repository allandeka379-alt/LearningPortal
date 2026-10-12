import { beforeAll, describe, expect, it } from "vitest";
import { answerAndMark, saveResponse, startAttempt, submitAttempt } from "@/server/attempts";
import { db } from "@/server/db";
import { createCurriculumChain } from "../../../tests/factories/index";
import { correctResponse, createAssessment, createEnrollment, wrongResponse } from "../../../tests/factories/learning";
import {
  archiveAssignment,
  assignTopicPractice,
  closeAssignment,
  closeDueAssignments,
  createAssignment,
  excuseStudent,
  getAssignmentDetail,
  getAssignmentFormOptions,
  listClassAssignments,
  listTeacherAssignments,
  publishAssignment,
  runAssignmentPublished,
  setStudentFeedback,
  updateAssignmentSchedule,
} from "./assignments";
import { joinClassByCode, listMyAssignments, getMyClass, startAssignmentWork } from "./student";
import { expectCode, harareLocal, makeClass, makeStudent, teachingWorld, type TeachingWorld } from "./testing";

let world: TeachingWorld;
const DAY = 86_400_000;
const inDays = (days: number, from = Date.now()) => harareLocal(new Date(from + days * DAY));

beforeAll(async () => {
  world = await teachingWorld();
});

function definitionOf(questionId: string) {
  const question = world.setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error("question not in setup");
  return question.definition;
}

async function classWith(memberCount: number, options: { subjectId?: string | null } = {}) {
  const members = [];
  for (let i = 0; i < memberCount; i += 1) members.push(await makeStudent({ schoolId: world.schoolId, firstName: `S${i}` }));
  const cls = await makeClass({
    teacher: world.teacher,
    schoolId: world.schoolId,
    subjectId: options.subjectId === undefined ? world.setup.subjectId : options.subjectId,
    members: members.map((m) => m.userId),
  });
  return { cls, members };
}

describe("practice assignments, end to end (§22)", () => {
  it("publishes to every member, runs in assignment mode and records the counted result", async () => {
    const { cls, members } = await classWith(2);
    const [ann, ben] = members as [(typeof members)[number], (typeof members)[number]];
    const created = await createAssignment(world.teacher, {
      classId: cls.id,
      type: "PRACTICE",
      title: "Topic 1 practice",
      instructions: "Do **all** questions.",
      topicIds: [world.setup.topicIds[0]],
      questionCount: "2",
      difficulty: "ADAPTIVE",
      dueAt: inDays(3),
    });
    expect(created.status).toBe("PUBLISHED");
    const row = await db.assignment.findUniqueOrThrow({ where: { id: created.id } });
    expect(row).toMatchObject({ assignedCount: 2, startedCount: 0, submittedCount: 0, topicId: world.setup.topicIds[0] });
    expect(row.instructionsHtml).toContain("<strong>all</strong>");
    expect(await db.notification.count({ where: { userId: { in: [ann.userId, ben.userId] }, type: "assignment.published" } })).toBe(2);

    const [mine] = await listMyAssignments(ann.actor);
    expect(mine).toMatchObject({ id: created.id, view: { state: "TO_DO", canWork: true }, practice: { questionCount: 2, timeLimitMinutes: null } });
    const { href } = await startAssignmentWork(ann.actor, { assignmentId: created.id });
    const attemptId = href.split("/").pop() as string;
    expect(href).toBe(`/app/practice/${attemptId}`);
    // Starting again resumes the same attempt.
    await expect(startAssignmentWork(ann.actor, { assignmentId: created.id })).resolves.toEqual({ href });
    const slots = await db.questionAttempt.findMany({ where: { attemptId }, orderBy: { position: "asc" } });
    for (const slot of slots) await answerAndMark(ann.actor, attemptId, slot.position, correctResponse(definitionOf(slot.questionId)));
    await submitAttempt(ann.actor, attemptId);

    const detail = await getAssignmentDetail(world.teacher, created.id);
    const annRow = detail.students.find((s) => s.userId === ann.userId);
    expect(annRow).toMatchObject({ scorePercent: 100, countedAttemptId: attemptId, view: { state: "SUBMITTED", late: false } });
    expect(detail.students.find((s) => s.userId === ben.userId)?.view.state).toBe("TO_DO");
    expect(detail.summary).toMatchObject({ assigned: 2, submitted: 1, averageScorePercent: 100 });
    expect(detail.completionPercent).toBe(50);
    expect(detail.assignment.practice).toMatchObject({ questionCount: 2, targeted: false });

    const list = await listClassAssignments(world.teacher, cls.id);
    expect(list.find((a) => a.id === created.id)).toMatchObject({ summary: { assigned: 2, submitted: 1 }, window: "OPEN" });
    const all = await listTeacherAssignments(world.teacher, { limit: 50 });
    expect(all.items.some((a) => a.id === created.id)).toBe(true);
  });

  it("flags late submissions", async () => {
    const { cls, members } = await classWith(1);
    const student = members[0]!;
    const past = Date.now() - 2 * DAY;
    const created = await createAssignment(
      world.teacher,
      { classId: cls.id, type: "PRACTICE", title: "Late one", topicIds: [world.setup.topicIds[1]], questionCount: "1", dueAt: inDays(1, past), allowLateSubmission: "on" },
      { now: new Date(past) },
    );
    expect((await listMyAssignments(student.actor)).find((a) => a.id === created.id)?.view).toMatchObject({ state: "OVERDUE", overdue: true, canWork: true });
    const { href } = await startAssignmentWork(student.actor, { assignmentId: created.id });
    const attemptId = href.split("/").pop() as string;
    const [slot] = await db.questionAttempt.findMany({ where: { attemptId } });
    await answerAndMark(student.actor, attemptId, slot!.position, wrongResponse(definitionOf(slot!.questionId)));
    await submitAttempt(student.actor, attemptId);
    const detail = await getAssignmentDetail(world.teacher, created.id);
    expect(detail.students[0]).toMatchObject({ scorePercent: 0, view: { state: "LATE", late: true } });
    expect(detail.summary.late).toBe(1);
  });
});

describe("lesson and test assignments", () => {
  it("assigns a published lesson (opened in the reader) and a platform test (exam room)", async () => {
    const { cls, members } = await classWith(1);
    const student = members[0]!;
    const lesson = world.setup.chain.lessons[0]!;
    const lessonWork = await createAssignment(world.teacher, { classId: cls.id, type: "LESSON", title: "Read this", lessonId: lesson.id, dueAt: inDays(2) });
    await expect(startAssignmentWork(student.actor, { assignmentId: lessonWork.id })).resolves.toEqual({ href: `/app/lessons/${lesson.id}` });

    const test = await createAssessment({
      subjectId: world.setup.subjectId,
      syllabusId: world.setup.syllabusId,
      kind: "TOPIC_TEST",
      accessTier: "PREMIUM",
      sections: [{ questionIds: world.setup.questions.slice(0, 2).map((q) => q.id) }],
    });
    const testWork = await createAssignment(world.teacher, { classId: cls.id, type: "ASSESSMENT", title: "Topic test", assessmentId: test.id, dueAt: inDays(2) });
    const { href } = await startAssignmentWork(student.actor, { assignmentId: testWork.id });
    expect(href).toMatch(/^\/app\/exams\/attempt\/[0-9a-f-]{36}$/);
    const options = await getAssignmentFormOptions(world.teacher, cls.id);
    expect(options.lessons.map((l) => l.id)).toContain(lesson.id);
    expect(options.assessments.find((a) => a.id === test.id)).toMatchObject({ owner: "platform", kind: "TOPIC_TEST" });
    expect(options.topics.map((t) => t.id)).toEqual(expect.arrayContaining(world.setup.topicIds));
    expect(options.students).toHaveLength(1);
  });

  it("validates subject, tenant, topics and dates", async () => {
    const { cls } = await classWith(0);
    const other = await teachingWorld();
    await expectCode(
      createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "x", subjectId: other.setup.subjectId, topicIds: [other.setup.topicIds[0]], questionCount: "2", dueAt: inDays(1) }),
      "VALIDATION",
    );
    await expectCode(
      createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "x", topicIds: [other.setup.topicIds[0]], questionCount: "2", dueAt: inDays(1) }),
      "VALIDATION",
    );
    await expectCode(
      createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "x", topicIds: [world.setup.topicIds[0]], questionCount: "2", dueAt: inDays(-1) }),
      "VALIDATION",
    );
    await expectCode(createAssignment(world.teacher, { classId: cls.id, type: "LESSON", title: "x", dueAt: inDays(1) }), "VALIDATION");
    // Another school's private test can never be set to this class.
    const foreignTest = await db.assessment.create({
      data: {
        kind: "QUIZ",
        subjectId: world.setup.subjectId,
        title: "Their quiz",
        totalMarks: 1,
        schoolId: other.schoolId,
        status: "DRAFT",
        copyrightStatus: "OWNED",
        accessTier: "FREE",
      },
    });
    await expectCode(
      createAssignment(world.teacher, { classId: cls.id, type: "ASSESSMENT", title: "x", assessmentId: foreignTest.id, dueAt: inDays(1) }),
      "VALIDATION",
    );
    // Topics without published practice questions.
    const empty = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const emptyClass = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: empty.subject.id });
    await expectCode(
      createAssignment(world.teacher, { classId: emptyClass.id, type: "PRACTICE", title: "x", topicIds: [empty.topics[0]!.id], questionCount: "2", dueAt: inDays(1) }),
      "VALIDATION",
    );
    // Teachers of other classes.
    await expectCode(
      createAssignment(other.teacher, { classId: cls.id, type: "PRACTICE", title: "x", topicIds: [world.setup.topicIds[0]], questionCount: "2", dueAt: inDays(1) }),
      "FORBIDDEN",
    );
  });

  it("requires a subject for subject-less classes", async () => {
    const { cls } = await classWith(0, { subjectId: null });
    await expectCode(createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "x", topicIds: [world.setup.topicIds[0]], questionCount: "1", dueAt: inDays(1) }), "VALIDATION");
    await expect(
      createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "x", subjectId: world.setup.subjectId, topicIds: [world.setup.topicIds[0]], questionCount: "1", dueAt: inDays(1) }),
    ).resolves.toMatchObject({ status: "PUBLISHED" });
  });
});

describe("drafts, scheduling, closing", () => {
  it("keeps drafts and scheduled work away from students until published", async () => {
    const { cls, members } = await classWith(1);
    const student = members[0]!;
    const draft = await createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "Draft", topicIds: [world.setup.topicIds[0]], questionCount: "1", dueAt: inDays(3), publish: "draft" });
    expect(draft.status).toBe("DRAFT");
    const scheduledAt = new Date(Date.now() + DAY);
    const scheduled = await createAssignment(world.teacher, {
      classId: cls.id,
      type: "PRACTICE",
      title: "Scheduled",
      topicIds: [world.setup.topicIds[0]],
      questionCount: "1",
      dueAt: inDays(3),
      publish: "schedule",
      publishAt: harareLocal(scheduledAt),
    });
    const ids = (await listMyAssignments(student.actor)).map((a) => a.id);
    expect(ids).not.toContain(draft.id);
    expect(ids).not.toContain(scheduled.id);
    expect(await db.job.count({ where: { type: "teaching.assignmentPublished", dedupeKey: { startsWith: `assignment-published:${scheduled.id}` } } })).toBe(1);
    await expectCode(startAssignmentWork(student.actor, { assignmentId: scheduled.id }), "NOT_FOUND");

    await publishAssignment(world.teacher, { assignmentId: draft.id });
    expect((await listMyAssignments(student.actor)).map((a) => a.id)).toContain(draft.id);
    await expectCode(publishAssignment(world.teacher, { assignmentId: draft.id }), "CONFLICT");

    // The job notifies when the scheduled time comes (a superseded payload does nothing).
    const row = await db.assignment.findUniqueOrThrow({ where: { id: scheduled.id } });
    await expect(runAssignmentPublished({ assignmentId: scheduled.id, publishedAt: new Date(0).toISOString() })).resolves.toEqual({ skipped: "superseded" });
    await db.assignment.update({ where: { id: scheduled.id }, data: { publishedAt: new Date(Date.now() - 1000), dueAt: row.dueAt } });
    const moved = await db.assignment.findUniqueOrThrow({ where: { id: scheduled.id } });
    await expect(runAssignmentPublished({ assignmentId: scheduled.id, publishedAt: (moved.publishedAt as Date).toISOString() })).resolves.toEqual({ notified: 1 });
  });

  it("closes work: open attempts are finished, students who did nothing are MISSED", async () => {
    const { cls, members } = await classWith(2);
    const [worker, idle] = members as [(typeof members)[number], (typeof members)[number]];
    const created = await createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "To close", topicIds: [world.setup.topicIds[0]], questionCount: "2", dueAt: inDays(2) });
    const { href } = await startAssignmentWork(worker.actor, { assignmentId: created.id });
    const attemptId = href.split("/").pop() as string;
    const [slot] = await db.questionAttempt.findMany({ where: { attemptId }, orderBy: { position: "asc" } });
    await answerAndMark(worker.actor, attemptId, slot!.position, correctResponse(definitionOf(slot!.questionId)));

    await expect(closeAssignment(world.teacher, { assignmentId: created.id })).resolves.toEqual({ closedAttempts: 1, missed: 1 });
    expect(await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } })).toMatchObject({ submitReason: "ASSIGNMENT_CLOSED" });
    const progress = await db.assignmentProgress.findMany({ where: { assignmentId: created.id } });
    expect(Object.fromEntries(progress.map((p) => [p.userId, p.status]))).toEqual({ [worker.userId]: "SUBMITTED", [idle.userId]: "MISSED" });
    expect((await db.assignment.findUniqueOrThrow({ where: { id: created.id } })).status).toBe("CLOSED");
    await expectCode(startAssignmentWork(idle.actor, { assignmentId: created.id }), "CONFLICT");
    expect((await listMyAssignments(idle.actor)).find((a) => a.id === created.id)?.view.state).toBe("MISSED");
    await expectCode(closeAssignment(world.teacher, { assignmentId: created.id }), "CONFLICT");

    await expect(archiveAssignment(world.teacher, { assignmentId: created.id })).resolves.toEqual({ deleted: false });
    expect((await listMyAssignments(worker.actor)).map((a) => a.id)).not.toContain(created.id);
  });

  it("closes due work in the sweep and lets teachers extend deadlines", async () => {
    const { cls } = await classWith(1);
    const past = Date.now() - 3 * DAY;
    const strict = await createAssignment(
      world.teacher,
      { classId: cls.id, type: "PRACTICE", title: "No late work", topicIds: [world.setup.topicIds[0]], questionCount: "1", dueAt: inDays(1, past), allowLateSubmission: "false" },
      { now: new Date(past) },
    );
    const open = await createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "Open", topicIds: [world.setup.topicIds[0]], questionCount: "1", dueAt: inDays(1) });
    await updateAssignmentSchedule(world.teacher, { assignmentId: open.id, dueAt: inDays(5), closesAt: inDays(6), allowLateSubmission: "on" });
    expect(await db.assignment.findUniqueOrThrow({ where: { id: open.id } })).toMatchObject({ closesAt: expect.any(Date) });
    // The sweep works in batches of the oldest due work across the whole (shared, parallel) test database: run it until
    // nothing is left to close, so other files' overdue rows cannot crowd this one out of a batch.
    for (let round = 0; round < 50 && (await closeDueAssignments({ limit: 500 })).closed > 0; round += 1);
    expect((await db.assignment.findUniqueOrThrow({ where: { id: strict.id } })).status).toBe("CLOSED");
    expect((await db.assignment.findUniqueOrThrow({ where: { id: open.id } })).status).toBe("PUBLISHED");
    await expectCode(updateAssignmentSchedule(world.teacher, { assignmentId: strict.id, dueAt: inDays(2), closesAt: "", allowLateSubmission: "on" }), "CONFLICT");
  });
});

describe("per-student actions and targeting", () => {
  it("excuses students, leaves feedback, and gives later joiners only class-wide live work", async () => {
    const { cls, members } = await classWith(2);
    const [weak, strong] = members as [(typeof members)[number], (typeof members)[number]];
    await createEnrollment(weak.userId, world.setup);
    await createEnrollment(strong.userId, world.setup);
    const topicId = world.setup.topicIds[0] as string;
    await db.topicMastery.create({
      data: { userId: weak.userId, topicId, subjectId: world.setup.subjectId, syllabusId: world.setup.syllabusId, topicKind: "TOPIC", score: 20, band: "WEAK", questionsAttempted: 5, questionsCorrect: 1 },
    });
    await db.topicMastery.create({
      data: { userId: strong.userId, topicId, subjectId: world.setup.subjectId, syllabusId: world.setup.syllabusId, topicKind: "TOPIC", score: 92, band: "MASTERED", questionsAttempted: 5, questionsCorrect: 5 },
    });

    const targeted = await assignTopicPractice(world.teacher, { classId: cls.id, topicId, audience: "WEAK_STUDENTS", questionCount: "5", dueInDays: "3" });
    expect(targeted.students).toBe(1);
    expect(await db.assignmentProgress.findMany({ where: { assignmentId: targeted.id }, select: { userId: true } })).toEqual([{ userId: weak.userId }]);
    const everyone = await assignTopicPractice(world.teacher, { classId: cls.id, topicId });
    expect(everyone.students).toBe(2);

    await excuseStudent(world.teacher, { assignmentId: everyone.id, userId: strong.userId });
    await setStudentFeedback(world.teacher, { assignmentId: everyone.id, userId: weak.userId, feedback: "Focus on the worked examples." });
    const detail = await getAssignmentDetail(world.teacher, everyone.id);
    expect(detail.summary).toMatchObject({ assigned: 1, excused: 1 });
    expect(detail.students.find((s) => s.userId === weak.userId)?.teacherFeedback).toBe("Focus on the worked examples.");
    expect(await db.notification.count({ where: { userId: weak.userId, type: "assignment.feedback" } })).toBe(1);
    const myClass = await getMyClass(weak.actor, cls.id);
    expect(myClass.assignments.find((a) => a.id === everyone.id)?.teacherFeedback).toBe("Focus on the worked examples.");

    const joiner = await makeStudent();
    await joinClassByCode(joiner.actor, { code: cls.joinCode });
    const theirs = (await listMyAssignments(joiner.actor)).map((a) => a.id);
    expect(theirs).toContain(everyone.id);
    expect(theirs).not.toContain(targeted.id);

    const outsider = await makeStudent();
    await expectCode(excuseStudent(world.teacher, { assignmentId: everyone.id, userId: outsider.userId }), "NOT_FOUND");
    await expectCode(assignTopicPractice(world.teacher, { classId: cls.id, topicId: world.setup.topicIds[1], audience: "WEAK_STUDENTS" }), "VALIDATION");
  });

  it("does not run assignment work for students outside the class", async () => {
    const { cls } = await classWith(1);
    const created = await createAssignment(world.teacher, { classId: cls.id, type: "PRACTICE", title: "Members only", topicIds: [world.setup.topicIds[0]], questionCount: "1", dueAt: inDays(2) });
    const outsider = await makeStudent();
    await expectCode(startAssignmentWork(outsider.actor, { assignmentId: created.id }), "NOT_FOUND");
    await expectCode(startAttempt(outsider.actor, { mode: "PRACTICE", subjectId: world.setup.subjectId, assignmentId: created.id }), "NOT_FOUND");
    await expectCode(saveResponse(outsider.actor, "00000000-0000-7000-8000-000000000000", 1, null), "NOT_FOUND");
  });
});
