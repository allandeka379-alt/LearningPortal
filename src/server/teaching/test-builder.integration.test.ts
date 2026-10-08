import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createSchoolMember, createTeacher } from "../../../tests/factories/index";
import { createAssignment } from "./assignments";
import {
  archiveTeacherTest,
  createTeacherQuestion,
  createTeacherTest,
  getTeacherTest,
  getTestBuilderOptions,
  listSubjectTopics,
  listTeacherTests,
  publishTeacherTest,
  searchBuilderQuestions,
  updateTeacherTest,
} from "./test-builder";
import { expectCode, harareLocal, makeClass, makeTeacher, teacherActor, teachingWorld, type TeachingWorld } from "./testing";

let world: TeachingWorld;

beforeAll(async () => {
  world = await teachingWorld();
});

function mcq(overrides: Record<string, unknown> = {}) {
  return {
    owner: { kind: "school", schoolId: world.schoolId },
    subjectId: world.setup.subjectId,
    topicId: world.setup.topicIds[0],
    type: "MULTIPLE_CHOICE",
    markingMode: "AUTO",
    stem: "Which number is prime?",
    payload: { selectMode: "single", shuffleOptions: true },
    answerSpec: { scoring: "all_or_nothing" },
    marks: 2,
    options: [
      { key: "A", content: "7", isCorrect: true },
      { key: "B", content: "8", isCorrect: false },
    ],
    difficulty: 2,
    rightsConfirmed: true,
    ...overrides,
  };
}

describe("teacher questions (school / tutor private banks)", () => {
  it("writes and publishes a school question, tagged and revisioned", async () => {
    const { id, marks } = await createTeacherQuestion(world.teacher, mcq());
    expect(marks).toBe(2);
    const row = await db.question.findUniqueOrThrow({ where: { id }, include: { options: true, topics: true } });
    expect(row).toMatchObject({ status: "PUBLISHED", schoolId: world.schoolId, ownerUserId: null, createdById: world.teacher.userId, copyrightStatus: "OWNED", accessTier: "FREE" });
    expect(row.approvedAt).toBeNull();
    expect(row.renderedHtml).not.toBeNull();
    expect(row.options.map((o) => o.key)).toEqual(["A", "B"]);
    expect(row.topics).toEqual([expect.objectContaining({ topicId: world.setup.topicIds[0], isPrimary: true, isPlatform: false })]);
    expect(await db.contentRevision.count({ where: { entityType: "QUESTION", entityId: id } })).toBe(1);
    expect(await db.auditLog.count({ where: { action: "content.publish", entityId: id } })).toBe(1);
  });

  it("writes structured questions with parts", async () => {
    const { id, marks } = await createTeacherQuestion(world.teacher, {
      ...mcq(),
      type: "STRUCTURED",
      stem: "A shop sells pens.",
      payload: null,
      answerSpec: null,
      options: [],
      marks: 1,
      parts: [
        { partLabel: "(a)", type: "NUMERICAL", markingMode: "AUTO", stem: "Price of 2 pens at $3?", payload: null, answerSpec: { value: 6 }, marks: 1 },
        { partLabel: "(b)", type: "SHORT_ANSWER", markingMode: "AUTO", stem: "Name the currency.", payload: null, answerSpec: { accepted: [{ value: "dollar" }] }, marks: 2 },
      ],
    });
    expect(marks).toBe(3);
    const parts = await db.question.findMany({ where: { parentId: id }, orderBy: { partOrder: "asc" } });
    expect(parts.map((p) => [p.partLabel, p.status, p.schoolId])).toEqual([
      ["(a)", "PUBLISHED", world.schoolId],
      ["(b)", "PUBLISHED", world.schoolId],
    ]);
  });

  it("saves nothing when the definition is broken, the topic is foreign or rights are not confirmed", async () => {
    const before = await db.question.count({ where: { schoolId: world.schoolId } });
    await expectCode(createTeacherQuestion(world.teacher, mcq({ options: [{ key: "A", content: "1", isCorrect: false }] })), "VALIDATION");
    const other = await teachingWorld();
    await expectCode(createTeacherQuestion(world.teacher, mcq({ topicId: other.setup.topicIds[0] })), "VALIDATION");
    await expectCode(createTeacherQuestion(world.teacher, mcq({ rightsConfirmed: false })), "VALIDATION");
    await expectCode(createTeacherQuestion(world.teacher, mcq({ type: "DIAGRAM_LABELLING" })), "VALIDATION");
    expect(await db.question.count({ where: { schoolId: world.schoolId } })).toBe(before);
  });

  it("refuses schools the teacher does not teach at; tutors write into their own bank", async () => {
    const outsider = await makeTeacher();
    await expectCode(createTeacherQuestion(outsider, mcq()), "FORBIDDEN");
    const { id } = await createTeacherQuestion(outsider, mcq({ owner: { kind: "tutor" } }));
    expect(await db.question.findUniqueOrThrow({ where: { id } })).toMatchObject({ schoolId: null, ownerUserId: outsider.userId });
  });
});

describe("teacher tests", () => {
  it("mixes bank and own questions, weights marks, publishes and lists for the school's teachers", async () => {
    const own = await createTeacherQuestion(world.teacher, mcq({ stem: "Own question for a test" }));
    const bank = world.setup.questions[0]!;
    const found = await searchBuilderQuestions(world.teacher, { subjectId: world.setup.subjectId, owner: { kind: "school", schoolId: world.schoolId }, source: "own", q: "Own question" });
    expect(found.map((q) => q.id)).toContain(own.id);
    const bankFound = await searchBuilderQuestions(world.teacher, { subjectId: world.setup.subjectId, owner: { kind: "school", schoolId: world.schoolId }, source: "bank" });
    expect(bankFound.map((q) => q.id)).toContain(bank.id);
    expect(bankFound.every((q) => q.source === "bank")).toBe(true);

    const { id } = await createTeacherTest(world.teacher, {
      owner: { kind: "school", schoolId: world.schoolId },
      subjectId: world.setup.subjectId,
      title: "Week 3 quiz",
      kind: "QUIZ",
      timeLimitMinutes: 20,
      items: [
        { questionId: bank.id, marks: null },
        { questionId: own.id, marks: 5 },
      ],
    });
    const draft = await getTeacherTest(world.teacher, id);
    expect(draft).toMatchObject({ status: "DRAFT", totalMarks: 6, timeLimitMinutes: 20, canEdit: true });
    expect(draft.items.map((i) => [i.id, i.itemMarks])).toEqual([
      [bank.id, null],
      [own.id, 5],
    ]);

    await updateTeacherTest(world.teacher, { assessmentId: id, title: "Week 3 quiz (v2)", kind: "TOPIC_TEST", items: [{ questionId: own.id, marks: null }], feedbackTiming: "AFTER_CLOSE" });
    await publishTeacherTest(world.teacher, { assessmentId: id });
    const published = await db.assessment.findUniqueOrThrow({ where: { id } });
    expect(published).toMatchObject({ status: "PUBLISHED", schoolId: world.schoolId, totalMarks: 2, kind: "TOPIC_TEST", title: "Week 3 quiz (v2)" });
    expect(await db.contentRevision.count({ where: { entityType: "ASSESSMENT", entityId: id } })).toBe(1);
    await expectCode(updateTeacherTest(world.teacher, { assessmentId: id, title: "x", items: [] }), "CONFLICT");

    // A colleague at the same school can see and use it, but not change it.
    const colleague = await makeTeacher({ schoolId: world.schoolId });
    expect((await listTeacherTests(colleague)).map((t) => t.id)).toContain(id);
    await expect(getTeacherTest(colleague, id)).resolves.toMatchObject({ canEdit: false });
    await expectCode(archiveTeacherTest(colleague, { assessmentId: id }), "FORBIDDEN");
    // ...and set it to a class of the school.
    const cls = await makeClass({ teacher: colleague, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    await expect(
      createAssignment(colleague, { classId: cls.id, type: "ASSESSMENT", title: "Quiz", assessmentId: id, dueAt: harareLocal(new Date(Date.now() + 86_400_000)) }),
    ).resolves.toMatchObject({ status: "PUBLISHED" });

    // A school admin can archive it.
    const admin = await createTeacher();
    await createSchoolMember({ schoolId: world.schoolId, userId: admin.user.id, role: "SCHOOL_ADMIN" });
    await expect(archiveTeacherTest(teacherActor(admin.user.id, ["TEACHER", "SCHOOL_ADMIN"]), { assessmentId: id })).resolves.toEqual({ deleted: false });
    expect((await db.assessment.findUniqueOrThrow({ where: { id } })).status).toBe("ARCHIVED");
  });

  it("never lets another school see, use or borrow from a school's tests and questions", async () => {
    const own = await createTeacherQuestion(world.teacher, mcq({ stem: "Private to the school" }));
    const { id } = await createTeacherTest(world.teacher, { owner: { kind: "school", schoolId: world.schoolId }, subjectId: world.setup.subjectId, title: "Private", items: [{ questionId: own.id, marks: null }] });
    const other = await teachingWorld({ topics: 1 });
    await expectCode(getTeacherTest(other.teacher, id), "NOT_FOUND");
    expect((await listTeacherTests(other.teacher)).map((t) => t.id)).not.toContain(id);
    await expectCode(
      createTeacherTest(other.teacher, { owner: { kind: "school", schoolId: other.schoolId }, subjectId: world.setup.subjectId, title: "Borrowed", items: [{ questionId: own.id, marks: null }] }),
      "VALIDATION",
    );
    const theirSearch = await searchBuilderQuestions(other.teacher, { subjectId: world.setup.subjectId, owner: { kind: "school", schoolId: other.schoolId }, source: "own" });
    expect(theirSearch.map((q) => q.id)).not.toContain(own.id);
    await expectCode(searchBuilderQuestions(other.teacher, { subjectId: world.setup.subjectId, owner: { kind: "school", schoolId: world.schoolId }, source: "own" }), "FORBIDDEN");
    // Unpublished drafts can be deleted by their author.
    await expect(archiveTeacherTest(world.teacher, { assessmentId: id })).resolves.toEqual({ deleted: true });
  });

  it("refuses to publish an empty test and lists builder options", async () => {
    const { id } = await createTeacherTest(world.teacher, { owner: { kind: "tutor" }, subjectId: world.setup.subjectId, title: "Empty" });
    await expectCode(publishTeacherTest(world.teacher, { assessmentId: id }), "VALIDATION");
    const options = await getTestBuilderOptions(world.teacher);
    expect(options.owners.map((o) => o.key)).toEqual([`school:${world.schoolId}`, "tutor"]);
    const topics = await listSubjectTopics(world.teacher, world.setup.subjectId);
    expect(topics.map((t) => t.id)).toEqual(expect.arrayContaining([...world.setup.topicIds, ...world.setup.leafTopicIds]));
  });
});
