import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createCurriculumChain, createQuestion as createFixtureQuestion, type CurriculumChain } from "../../../../tests/factories/index";
import { createQuestion } from "@/server/cms/questions/service";
import { auditTrail, mcqDocument, staffActor, studentActor, withFourEyes } from "@/server/cms/questions/testing";
import {
  approveAssessment,
  checkBlueprint,
  createAssessment,
  deleteDraftAssessment,
  editPublishedAssessment,
  getAssessmentEditor,
  getAssessmentPreview,
  listAssessments,
  publishAssessment,
  saveAssessmentStructure,
  submitAssessment,
  updateAssessmentMeta,
} from "./service";
import type { AssessmentMetaInput } from "./schemas";

function chain(): Promise<CurriculumChain> {
  return createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
}

function meta(c: CurriculumChain, overrides: Partial<AssessmentMetaInput> = {}): AssessmentMetaInput {
  return {
    kind: "TOPIC_TEST",
    assembly: "FIXED",
    subjectId: c.subject.id,
    syllabusId: c.syllabus.id,
    routeId: null,
    title: "Linear equations check",
    instructions: "Answer **every** question. Show your working.",
    timeLimitMinutes: 30,
    maxAttempts: null,
    gradeSchemeId: null,
    feedbackTiming: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: false,
    allowNavigation: true,
    accessTier: "FREE",
    topicIds: [],
    copyrightStatus: "OWNED",
    sourceId: c.source.id,
    author: "Editorial team",
    ...overrides,
  };
}

async function createFixtureAssessmentForDelete(c: CurriculumChain): Promise<string> {
  const question = await createFixtureQuestion("TRUE_FALSE", { context: bank(c) });
  const { createAssessment: createPublished } = await import("../../../../tests/factories/index");
  return (await createPublished({ subjectId: c.subject.id, syllabusId: c.syllabus.id, kind: "TOPIC_TEST", sections: [{ questionIds: [question.id] }] })).id;
}

function bank(c: CurriculumChain) {
  return { subjectId: c.subject.id, syllabusId: c.syllabus.id, topicIds: c.topics.map((t) => t.id) };
}

describe("assessment builder: permissions and validation", () => {
  it("refuses non-staff", async () => {
    const c = await chain();
    const student = await studentActor();
    await expect(listAssessments(student, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createAssessment(student, meta(c))).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("requires a syllabus version for mocks and blueprints, and matching references", async () => {
    const c = await chain();
    const other = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    await expect(createAssessment(editor, meta(c, { kind: "MOCK_EXAM", syllabusId: null }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { syllabusId: expect.any(Array) } });
    await expect(createAssessment(editor, meta(c, { assembly: "BLUEPRINT", syllabusId: null }))).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createAssessment(editor, meta(c, { syllabusId: other.syllabus.id }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { syllabusId: expect.any(Array) } });
    await expect(createAssessment(editor, meta(c, { topicIds: [other.topics[0]?.id ?? ""] }))).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("assessment builder: fixed structure, totals and workflow", () => {
  it("builds sections with fixed questions, maintains totals and publishes through the helper", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const reviewer = await staffActor("ADMIN");
    const q1 = await createFixtureQuestion("MULTIPLE_CHOICE", { context: bank(c) });
    const q2 = await createFixtureQuestion("CALCULATION", { context: bank(c) });
    const { id } = await createAssessment(editor, meta(c));
    const view = await getAssessmentEditor(editor, id);
    expect(view.sections).toHaveLength(1);
    expect(view.editable).toBe(true);

    const saved = await saveAssessmentStructure(editor, {
      id,
      version: view.version,
      sections: [
        { title: "Section A", items: [{ questionId: q1.id }, { questionId: q2.id, marks: 4 }] },
        { title: "Section B", answerCount: 1, marks: 2, items: [{ questionId: (await createFixtureQuestion("TRUE_FALSE", { context: bank(c) })).id }] },
      ],
    });
    expect(saved.totals).toMatchObject({ total: 1 + 4 + 2, exact: true });
    const row = await db.assessment.findUniqueOrThrow({ where: { id }, include: { sections: { include: { items: true }, orderBy: { sortOrder: "asc" } } } });
    expect(row.totalMarks).toBe(7);
    expect(row.sections.map((s) => [s.title, s.items.length, s.marks])).toEqual([
      ["Section A", 2, 5],
      ["Section B", 1, 2],
    ]);

    await submitAssessment(editor, { id });
    await expect(withFourEyes((ctx) => approveAssessment(editor, { id }, ctx))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await withFourEyes((ctx) => approveAssessment(reviewer, { id }, ctx));
    await publishAssessment(reviewer, { id });
    expect(await db.contentRevision.count({ where: { entityType: "ASSESSMENT", entityId: id, revision: 1 } })).toBe(1);
    expect(await auditTrail(id)).toEqual([
      "content.create:content.create",
      "content.update:content.update",
      "content.submit:content.submit",
      "content.approve:",
      "content.publish:",
    ]);

    // Published: settings and structure change only through a draft copy (revision 2 on merge).
    await expect(saveAssessmentStructure(editor, { id, sections: [{ title: "X", items: [] }] })).rejects.toMatchObject({ code: "CONFLICT" });
    const copy = await editPublishedAssessment(editor, { id });
    const copyView = await getAssessmentEditor(editor, copy.id);
    await updateAssessmentMeta(editor, { id: copy.id, version: copyView.version, ...copyView.meta, title: "Linear equations check (revised)" });
    await submitAssessment(editor, { id: copy.id });
    await approveAssessment(reviewer, { id: copy.id });
    expect(await publishAssessment(reviewer, { id: copy.id })).toMatchObject({ id, revision: 2, changed: true });
    expect((await db.assessment.findUniqueOrThrow({ where: { id } })).title).toBe("Linear equations check (revised)");
  });

  it("refuses unusable items and blocks review while a fixed question is unpublished", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const draftQuestion = await createQuestion(editor, mcqDocument(c));
    const { id } = await createAssessment(editor, meta(c));
    const partHolder = await createFixtureQuestion("STRUCTURED", { context: bank(c) });
    await expect(saveAssessmentStructure(editor, { id, sections: [{ title: "A", items: [{ questionId: partHolder.partIds[0] ?? "" }] }] })).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await saveAssessmentStructure(editor, { id, sections: [{ title: "A", items: [{ questionId: draftQuestion.id }] }] });
    const view = await getAssessmentEditor(editor, id);
    expect(Object.values(view.checks.errors).flat().join(" ")).toMatch(/not published/);
    await expect(submitAssessment(editor, { id })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("assessment builder: blueprints", () => {
  it("checks whether the published bank can satisfy the rules for the assessment's audience", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const topic = c.topics[0]?.id ?? "";
    for (let i = 0; i < 3; i += 1) await createFixtureQuestion("TRUE_FALSE", { context: bank(c), topicId: topic, difficulty: 2, accessTier: "FREE" });
    for (let i = 0; i < 2; i += 1) await createFixtureQuestion("TRUE_FALSE", { context: bank(c), topicId: topic, difficulty: 2, accessTier: "PREMIUM" });
    const { id } = await createAssessment(editor, meta(c, { kind: "TIMED_EXAM", assembly: "BLUEPRINT", accessTier: "FREE" }));

    const rule = (count: number) => ({ topicId: topic, difficultyMin: 1, difficultyMax: 3, questionCount: count, questionType: "TRUE_FALSE" });
    const enough = await checkBlueprint(editor, { id, sections: [{ title: "A", rules: [rule(3)] }] });
    expect(enough.blueprint?.forAudience).toMatchObject({ possible: true, guaranteed: true, assignable: 3, required: 3 });
    expect(enough.totals).toMatchObject({ total: 3, exact: false });

    const tooMany = await checkBlueprint(editor, { id, sections: [{ title: "A", rules: [rule(5)] }] });
    expect(tooMany.blueprint?.forAudience).toMatchObject({ possible: false, assignable: 3 });
    expect(tooMany.blueprint?.forPremium).toMatchObject({ possible: true, assignable: 5 });

    const harder = await checkBlueprint(editor, { id, sections: [{ title: "A", rules: [{ ...rule(1), difficultyMin: 4, difficultyMax: 5 }] }] });
    expect(harder.blueprint?.forAudience.possible).toBe(false);

    await saveAssessmentStructure(editor, { id, sections: [{ title: "A", rules: [rule(5)] }] });
    const view = await getAssessmentEditor(editor, id);
    expect(view.checks.errors.rules?.[0]).toMatch(/cannot fill these rules for students on free access/);

    const otherChain = await chain();
    await expect(saveAssessmentStructure(editor, { id, sections: [{ title: "A", rules: [{ ...rule(1), topicId: otherChain.topics[0]?.id }] }] })).rejects.toMatchObject({
      code: "VALIDATION",
    });

    await saveAssessmentStructure(editor, { id, sections: [{ title: "A", rules: [rule(2)] }] });
    const preview = await getAssessmentPreview(editor, id, "1");
    expect(preview.sections[0]?.questions).toHaveLength(2);
    expect(preview.sections[0]?.questions.every((q) => q.drawn && q.question !== null)).toBe(true);
    expect(JSON.stringify(preview)).not.toContain("isCorrect");
  });

  it("deletes never-published drafts only", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const { id } = await createAssessment(editor, meta(c));
    expect(await deleteDraftAssessment(editor, { id })).toEqual({ id });
    expect(await db.assessment.findUnique({ where: { id } })).toBeNull();
    const published = await createFixtureAssessmentForDelete(c);
    await expect(deleteDraftAssessment(editor, { id: published })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("refuses rules on fixed assessments", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const { id } = await createAssessment(editor, meta(c));
    await expect(saveAssessmentStructure(editor, { id, sections: [{ title: "A", rules: [{ difficultyMin: 1, difficultyMax: 5, questionCount: 1 }] }] })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { "sections.0.rules": expect.any(Array) },
    });
  });
});
