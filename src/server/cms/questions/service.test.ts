import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createQuestion as createFixtureQuestion } from "../../../../tests/factories/index";
import {
  createQuestion,
  deleteDraftQuestion,
  getQuestionEditor,
  listQuestions,
  questionChecks,
  searchPublishedQuestions,
  submitQuestion,
  updateQuestion,
} from "./service";
import { auditTrail, chain, mcqDocument, staffActor, structuredDocument, studentActor, teacherActor } from "./testing";

describe("question CMS: permissions", () => {
  it("refuses non-staff and teachers (restricted content.draft)", async () => {
    const c = await chain();
    for (const actor of [await studentActor(), await teacherActor()]) {
      await expect(listQuestions(actor, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
      await expect(createQuestion(actor, mcqDocument(c))).rejects.toMatchObject({ code: "FORBIDDEN" });
    }
  });
});

describe("question CMS: create and update drafts", () => {
  it("creates a draft MCQ with options, tags, render caches, media usage and an audit entry", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const objective = c.objectiveIds[0];
    const saved = await createQuestion(editor, mcqDocument(c, { objectiveIds: objective ? [objective] : [], year: 2026, paperLabel: "Paper 1", cognitiveSkill: "APPLICATION" }));
    expect(saved.errors).toEqual([]);

    const row = await db.question.findUniqueOrThrow({ where: { id: saved.id }, include: { options: { orderBy: { sortOrder: "asc" } }, topics: true, objectives: true } });
    expect(row).toMatchObject({ status: "DRAFT", createdById: editor.userId, subjectId: c.subject.id, year: 2026, paperLabel: "Paper 1", cognitiveSkill: "APPLICATION", renderVersion: 1 });
    expect(row.options.map((o) => [o.key, o.isCorrect])).toEqual([["A", true], ["B", false], ["C", false]]);
    expect(row.topics).toHaveLength(1);
    expect(row.topics[0]).toMatchObject({ syllabusId: c.syllabus.id, subjectId: c.subject.id, isPrimary: true });
    expect(row.objectives).toHaveLength(objective ? 1 : 0);
    expect((row.renderedHtml as { stem?: string; options?: Record<string, string> }).options?.A).toContain("katex");
    expect(await auditTrail(saved.id)).toEqual(["content.create:content.create"]);
  });

  it("validates input and references with field errors", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    await expect(createQuestion(editor, mcqDocument(c, { difficulty: 9 }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { difficulty: expect.any(Array) } });
    await expect(createQuestion(editor, mcqDocument(c, { copyrightStatus: "LICENSED", sourceId: null }))).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { sourceId: expect.any(Array) },
    });
    await expect(createQuestion(editor, mcqDocument(c, { relatedLessonId: "0199a2b4-0000-7000-8000-00000000abcd" }))).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { relatedLessonId: expect.any(Array) },
    });
  });

  it("saves an incomplete draft, reports its problems and blocks submission", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const saved = await createQuestion(
      editor,
      mcqDocument(c, { options: [{ key: "A", content: "$1$", isCorrect: false }, { key: "B", content: "$2$", isCorrect: false }], copyrightStatus: "UNVERIFIED", topics: [] }),
    );
    expect(saved.errors.map((e) => e.message)).toContain("Mark at least one option as correct.");
    const checks = await questionChecks(db, saved.id);
    expect(Object.keys(checks.errors).sort()).toEqual(expect.arrayContaining(["options", "copyrightStatus", "topics"]));
    await expect(submitQuestion(editor, { id: saved.id })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: expect.objectContaining({ options: expect.any(Array) }) });
    expect((await db.question.findUniqueOrThrow({ where: { id: saved.id } })).status).toBe("DRAFT");
  });

  it("updates structured parts in place (ids kept), sums marks and removes deleted parts", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const created = await createQuestion(editor, structuredDocument(c));
    const view = await getQuestionEditor(editor, created.id);
    expect(view.document.marks).toBe(3);
    const [partA, partB] = view.document.parts ?? [];
    expect(partA?.id).toBeTruthy();

    const other = await staffActor("ADMIN");
    const updated = await updateQuestion(other, {
      id: created.id,
      version: view.version,
      question: { ...view.document, parts: [{ ...partA, marks: 2, stem: "Write an expression for the area." }, { partLabel: "(c)", type: "TRUE_FALSE", markingMode: "AUTO", stem: "Is $x > 0$?", payload: null, answerSpec: { correct: true }, marks: 1 }] },
    });
    expect(updated.errors).toEqual([]);
    const parts = await db.question.findMany({ where: { parentId: created.id }, orderBy: { partOrder: "asc" } });
    expect(parts.map((p) => p.partLabel)).toEqual(["(a)", "(c)"]);
    expect(parts[0]?.id).toBe(partA?.id);
    expect(parts.some((p) => p.id === partB?.id)).toBe(false);
    expect(parts.every((p) => p.copyrightStatus === "OWNED" && p.status === "DRAFT")).toBe(true);
    const root = await db.question.findUniqueOrThrow({ where: { id: created.id } });
    expect(root.marks).toBe(3);
    expect(root.createdById).toBe(other.userId);

    // A stale version is refused (optimistic concurrency).
    await expect(updateQuestion(editor, { id: created.id, version: view.version, question: view.document })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("refuses in-place edits of published questions", async () => {
    const editor = await staffActor("CONTENT_EDITOR");
    const published = await createFixtureQuestion("TRUE_FALSE");
    const view = await getQuestionEditor(editor, published.id);
    expect(view.editable).toBe(false);
    await expect(updateQuestion(editor, { id: published.id, question: view.document })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("deletes never-published drafts only", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const saved = await createQuestion(editor, mcqDocument(c));
    await deleteDraftQuestion(editor, { id: saved.id });
    expect(await db.question.findUnique({ where: { id: saved.id } })).toBeNull();
    const published = await createFixtureQuestion("TRUE_FALSE");
    await expect(deleteDraftQuestion(editor, { id: published.id })).rejects.toMatchObject({ code: "CONFLICT" });
  });
});

describe("question CMS: list filters and counts", () => {
  it("filters by curriculum, type, status, metadata and flags, with facet counts", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const mcq = await createQuestion(editor, mcqDocument(c, { year: 2025, paperLabel: "Paper 2", difficulty: 4 }));
    const structured = await createQuestion(editor, structuredDocument(c));
    const context = { subjectId: c.subject.id, syllabusId: c.syllabus.id, topicIds: c.topics.map((t) => t.id) };
    const published = await createFixtureQuestion("TRUE_FALSE", { context });
    await db.contentFlag.create({ data: { entityType: "QUESTION", entityId: published.id, reason: "AMBIGUOUS", source: "EDITOR", flaggedById: editor.userId } });

    const all = await listQuestions(editor, { subjectId: c.subject.id });
    expect(all.items.map((r) => r.id).sort()).toEqual([mcq.id, structured.id, published.id].sort());
    expect(all.facets.status).toEqual({ DRAFT: 2, PUBLISHED: 1 });
    expect(all.facets.type).toMatchObject({ MULTIPLE_CHOICE: 1, STRUCTURED: 1, TRUE_FALSE: 1 });

    const drafts = await listQuestions(editor, { subjectId: c.subject.id, status: "DRAFT", type: "MULTIPLE_CHOICE" });
    expect(drafts.items.map((r) => r.id)).toEqual([mcq.id]);
    expect(drafts.facets.status).toEqual({ DRAFT: 1 });

    expect((await listQuestions(editor, { boardId: c.examBoard.id, year: "2025", paper: "paper 2", difficulty: "4" })).items.map((r) => r.id)).toEqual([mcq.id]);
    expect((await listQuestions(editor, { syllabusId: c.syllabus.id, topicId: c.topics[0]?.id, ai: "no" })).items).toHaveLength(3);
    const flagged = await listQuestions(editor, { qualificationId: c.qualification.id, flagged: "yes" });
    expect(flagged.items.map((r) => [r.id, r.openFlags])).toEqual([[published.id, 1]]);
    expect((await listQuestions(editor, { subjectId: c.subject.id, q: "width" })).items.map((r) => r.id)).toEqual([structured.id]);
  });

  it("paginates with an opaque cursor and rejects tampered cursors", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    for (let i = 0; i < 3; i += 1) await createQuestion(editor, mcqDocument(c));
    const first = await listQuestions(editor, { subjectId: c.subject.id });
    expect(first.items).toHaveLength(3);
    expect(first.nextCursor).toBeNull();
    await expect(listQuestions(editor, { subjectId: c.subject.id, cursor: "not-a-cursor" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("question CMS: picker", () => {
  it("offers PUBLISHED platform root questions of the subject only", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const draft = await createQuestion(editor, mcqDocument(c));
    const context = { subjectId: c.subject.id, syllabusId: c.syllabus.id, topicIds: c.topics.map((t) => t.id) };
    const published = await createFixtureQuestion("NUMERICAL", { context });
    const found = await searchPublishedQuestions(editor, { subjectId: c.subject.id });
    expect(found.map((q) => q.id)).toEqual([published.id]);
    expect(found.some((q) => q.id === draft.id)).toBe(false);
    expect(await searchPublishedQuestions(editor, { subjectId: c.subject.id, excludeIds: [published.id] })).toEqual([]);
  });
});
