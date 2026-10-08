import { beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { db } from "@/server/db";
import { createContentSource, createCurriculumChain, createLessonForTopic } from "../../../../tests/factories/index";
import type { CurriculumActor } from "./access";
import { createSyllabusVersion } from "./syllabuses";
import {
  addObjective,
  addTopic,
  correctTopicText,
  deleteObjective,
  deleteTopic,
  getTopicEditor,
  importOutline,
  moveObjective,
  moveTopic,
  previewOutline,
  reparentTopic,
  searchTopics,
  shiftTopic,
  updateObjective,
  updateTopic,
} from "./topics";
import { auditOperations, auditRowsFor, staffActor, studentActor } from "./testing";

let admin: CurriculumActor;
let editor: CurriculumActor;
let student: CurriculumActor;

beforeAll(async () => {
  [admin, editor, student] = await Promise.all([staffActor("ADMIN"), staffActor("CONTENT_EDITOR"), studentActor()]);
});

async function emptyDraft(): Promise<{ syllabusId: string; subjectId: string; sourceId: string }> {
  const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
  const { id } = await createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: `d-${randomUUID().slice(0, 6)}`, title: "Draft", effectiveFrom: "2027-01-01" });
  return { syllabusId: id, subjectId: chain.subject.id, sourceId: chain.source.id };
}

type Row = { id: string; parentId: string | null; kind: string; depth: number; path: string; sortOrder: number; name: string };

async function tree(syllabusId: string): Promise<Map<string, Row>> {
  const rows = await db.topic.findMany({ where: { syllabusId }, select: { id: true, parentId: true, kind: true, depth: true, path: true, sortOrder: true, name: true } });
  return new Map(rows.map((row) => [row.name, row]));
}

function childrenNames(rows: Map<string, Row>, parentName: string | null): string[] {
  const parentId = parentName === null ? null : (rows.get(parentName)?.id ?? "missing");
  return [...rows.values()]
    .filter((row) => row.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((row) => row.name);
}

describe("adding and editing topics", () => {
  it("adds nodes with derived slugs, default kinds and valid paths", async () => {
    const { syllabusId } = await emptyDraft();
    const algebra = await addTopic(editor, { syllabusId, name: "Algebra", code: "2" });
    const again = await addTopic(editor, { syllabusId, name: "Algebra" });
    const linear = await addTopic(editor, { syllabusId, parentId: algebra.id, name: "Linear equations" });
    const rows = await db.topic.findMany({ where: { syllabusId }, orderBy: { createdAt: "asc" } });
    expect(rows.map((row) => [row.name, row.slug, row.kind, row.depth, row.sortOrder])).toEqual([
      ["Algebra", "algebra", "TOPIC", 0, 0],
      ["Algebra", "algebra-2", "TOPIC", 0, 1],
      ["Linear equations", "linear-equations", "SUBTOPIC", 1, 0],
    ]);
    expect(rows[2]?.path).toBe(`${algebra.id}/${linear.id}`);
    expect(again.id).not.toBe(algebra.id);
    expect(await auditOperations(algebra.id)).toEqual(["curriculum.topic.create"]);

    await expect(addTopic(editor, { syllabusId, parentId: algebra.id, name: "Wrong", kind: "TOPIC" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { kind: expect.any(Array) } });
    await expect(addTopic(editor, { syllabusId, name: "Dup", slug: "algebra" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: expect.any(Array) } });
    await expect(addTopic(student, { syllabusId, name: "No" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("updates a node, checks kind changes against children and links papers", async () => {
    const { syllabusId } = await emptyDraft();
    const paper = await db.syllabusComponent.create({ data: { syllabusId, code: "2", name: "Paper 2" } });
    const topic = await addTopic(editor, { syllabusId, name: "Number" });
    await addTopic(editor, { syllabusId, parentId: topic.id, name: "Integers" });
    const base = { id: topic.id, kind: "TOPIC", name: "Number and place value", code: "1", isPublic: "on", estimatedStudyMinutes: "120" };
    await updateTopic(editor, { ...base, componentIds: paper.id, slug: "" });
    let row = await db.topic.findUniqueOrThrow({ where: { id: topic.id }, include: { componentLinks: true } });
    expect(row).toMatchObject({ name: "Number and place value", slug: "number-and-place-value", code: "1", estimatedStudyMinutes: 120 });
    expect(row.componentLinks.map((link) => link.componentId)).toEqual([paper.id]);
    await updateTopic(editor, { ...base, slug: "number" });
    row = await db.topic.findUniqueOrThrow({ where: { id: topic.id }, include: { componentLinks: true } });
    expect(row.slug).toBe("number");
    expect(row.componentLinks).toEqual([]);

    await expect(updateTopic(editor, { ...base, kind: "SUBTOPIC" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { kind: expect.any(Array) } });
    await expect(updateTopic(editor, { ...base, kind: "SECTION" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { kind: [expect.stringMatching(/children/)] } });
    await expect(updateTopic(editor, { ...base, isOptional: "", optionGroup: "Choose one" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { optionGroup: expect.any(Array) } });
    await expect(updateTopic(editor, { ...base, examYearFrom: "2028", examYearTo: "2027" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { examYearTo: expect.any(Array) } });
    await expect(updateTopic(editor, { ...base, componentIds: [randomUUID()] })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { componentIds: expect.any(Array) } });
  });

  it("returns the editor tree with tag counts and permissions", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 1 });
    const editorView = await getTopicEditor(editor, chain.syllabus.id);
    expect(editorView).toMatchObject({ editable: false, canCorrect: false, topicCount: 6 });
    expect(editorView.roots.map((node) => node.name)).toEqual(["Topic 1", "Topic 2"]);
    expect(editorView.roots[0]?.children.map((node) => node.name)).toEqual(["Subtopic 1.1", "Subtopic 1.2"]);
    expect(editorView.roots[0]?.tags.lessons).toBe(1);
    expect((await getTopicEditor(admin, chain.syllabus.id)).canCorrect).toBe(true);
    await expect(getTopicEditor(student, chain.syllabus.id)).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("reordering and moving", () => {
  it("moves siblings up and down", async () => {
    const { syllabusId } = await emptyDraft();
    const a = await addTopic(editor, { syllabusId, name: "A" });
    await addTopic(editor, { syllabusId, name: "B" });
    const c = await addTopic(editor, { syllabusId, name: "C" });
    expect(await moveTopic(editor, { id: c.id, direction: "up" })).toEqual({ moved: true });
    expect(await moveTopic(editor, { id: a.id, direction: "up" })).toEqual({ moved: false });
    expect(childrenNames(await tree(syllabusId), null)).toEqual(["A", "C", "B"]);
    expect(await auditOperations(c.id)).toEqual(["curriculum.topic.create", "curriculum.topic.reorder"]);
  });

  it("indents and outdents subtrees, rewriting paths and adjusting kinds", async () => {
    const { syllabusId } = await emptyDraft();
    const algebra = await addTopic(editor, { syllabusId, name: "Algebra" });
    const equations = await addTopic(editor, { syllabusId, name: "Equations" });
    await addTopic(editor, { syllabusId, parentId: equations.id, name: "Linear" });
    const quadratic = await addTopic(editor, { syllabusId, parentId: equations.id, name: "Quadratic" });
    await addTopic(editor, { syllabusId, parentId: quadratic.id, name: "Factorising" });
    const geometry = await addTopic(editor, { syllabusId, name: "Geometry" });

    // Indent "Equations" (TOPIC with a subtree) under "Algebra": it becomes a SUBTOPIC, its subtree follows.
    expect(await shiftTopic(editor, { id: equations.id, operation: "indent" })).toEqual({ moved: true, kindChanges: 1 });
    let rows = await tree(syllabusId);
    expect(childrenNames(rows, null)).toEqual(["Algebra", "Geometry"]);
    expect(childrenNames(rows, "Algebra")).toEqual(["Equations"]);
    expect(rows.get("Equations")).toMatchObject({ kind: "SUBTOPIC", depth: 1, path: `${algebra.id}/${equations.id}` });
    expect(rows.get("Factorising")).toMatchObject({ depth: 3, path: `${algebra.id}/${equations.id}/${quadratic.id}/${rows.get("Factorising")!.id}` });

    // Outdent "Quadratic" next to "Equations" (after its old parent).
    await shiftTopic(editor, { id: quadratic.id, operation: "outdent" });
    rows = await tree(syllabusId);
    expect(childrenNames(rows, "Algebra")).toEqual(["Equations", "Quadratic"]);
    expect(rows.get("Factorising")).toMatchObject({ depth: 2 });

    // Outdent to the top level: a SUBTOPIC becomes a TOPIC, placed after its old parent.
    await shiftTopic(editor, { id: quadratic.id, operation: "outdent" });
    rows = await tree(syllabusId);
    expect(childrenNames(rows, null)).toEqual(["Algebra", "Quadratic", "Geometry"]);
    expect(rows.get("Quadratic")).toMatchObject({ kind: "TOPIC", depth: 0, path: quadratic.id, parentId: null });

    expect(await shiftTopic(editor, { id: algebra.id, operation: "indent" })).toEqual({ moved: false, kindChanges: 0 });
    expect(await shiftTopic(editor, { id: algebra.id, operation: "outdent" })).toEqual({ moved: false, kindChanges: 0 });

    // Move under any node; never into its own subtree.
    await reparentTopic(editor, { id: geometry.id, parentId: quadratic.id });
    expect((await tree(syllabusId)).get("Geometry")).toMatchObject({ parentId: quadratic.id, kind: "SUBTOPIC", depth: 1 });
    await expect(reparentTopic(editor, { id: algebra.id, parentId: equations.id })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { parentId: expect.any(Array) } });
    // Every row still satisfies the materialised-path invariants.
    for (const row of (await tree(syllabusId)).values()) {
      expect(row.path.endsWith(row.id)).toBe(true);
      expect(row.path.split("/")).toHaveLength(row.depth + 1);
    }
  });
});

describe("deleting", () => {
  it("deletes a subtree but refuses while content is tagged to it", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0, syllabusStatus: "DRAFT" });
    const [first, second] = chain.topics;
    await createLessonForTopic({ subjectId: chain.subject.id, topicId: chain.subtopics[0]!.id, status: "DRAFT" });
    await expect(deleteTopic(editor, { id: first!.id })).rejects.toMatchObject({ code: "CONFLICT", message: expect.stringMatching(/tagged/) });
    expect(await deleteTopic(editor, { id: second!.id })).toEqual({ deleted: 3 });
    expect(await db.topic.count({ where: { syllabusId: chain.syllabus.id } })).toBe(3);
    expect((await auditRowsFor(second!.id)).at(-1)).toMatchObject({ metadata: { operation: "curriculum.topic.delete", subtreeSize: 3 } });
  });
});

describe("learning objectives", () => {
  it("adds, reorders, edits and deletes objectives of draft topics", async () => {
    const { syllabusId } = await emptyDraft();
    const topic = await addTopic(editor, { syllabusId, name: "Vectors" });
    const a = await addObjective(editor, { topicId: topic.id, statement: "Add vectors", code: "V1", cognitiveSkill: "APPLICATION" });
    const b = await addObjective(editor, { topicId: topic.id, statement: "Find magnitudes" });
    expect(await moveObjective(editor, { id: b.id, direction: "up" })).toEqual({ moved: true });
    let objectives = await db.learningObjective.findMany({ where: { topicId: topic.id }, orderBy: { sortOrder: "asc" } });
    expect(objectives.map((o) => o.statement)).toEqual(["Find magnitudes", "Add vectors"]);
    await updateObjective(editor, { id: a.id, statement: "Add and subtract vectors", code: "V1", cognitiveSkill: "" });
    await deleteObjective(editor, { id: b.id });
    objectives = await db.learningObjective.findMany({ where: { topicId: topic.id } });
    expect(objectives).toMatchObject([{ statement: "Add and subtract vectors", cognitiveSkill: null, sortOrder: 0 }]);
    await expect(addObjective(editor, { topicId: topic.id, statement: "" })).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("only lets admins correct the wording of published objectives", async () => {
    const chain = await createCurriculumChain({ objectivesPerSubtopic: 1, lessonsPerTopic: 0 });
    const objectiveId = chain.objectiveIds[0]!;
    await expect(addObjective(editor, { topicId: chain.subtopics[0]!.id, statement: "Late" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(updateObjective(editor, { id: objectiveId, statement: "Fixed" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(updateObjective(admin, { id: objectiveId, statement: "Fixed", code: "NEW" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { code: expect.any(Array) } });
    await updateObjective(admin, { id: objectiveId, statement: "Fixed wording", cognitiveSkill: "RECALL" });
    expect(await db.learningObjective.findUniqueOrThrow({ where: { id: objectiveId } })).toMatchObject({ statement: "Fixed wording", cognitiveSkill: "RECALL" });
  });
});

describe("published versions", () => {
  it("refuse structural edits but accept editorial corrections by admins", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const topic = chain.topics[0]!;
    await expect(addTopic(editor, { syllabusId: chain.syllabus.id, name: "Late" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(moveTopic(editor, { id: topic.id, direction: "down" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(updateTopic(editor, { id: topic.id, kind: "TOPIC", name: "x" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(correctTopicText(editor, { id: topic.id, name: "Typo fixed" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await correctTopicText(admin, { id: topic.id, name: "Typo fixed", publicSummary: "An original summary.", isPublic: "on" });
    expect(await db.topic.findUniqueOrThrow({ where: { id: topic.id } })).toMatchObject({ name: "Typo fixed", slug: topic.slug, sortOrder: topic.sortOrder });
    expect(await auditOperations(topic.id)).toEqual(["curriculum.topic.correct"]);
    expect(await db.job.count({ where: { type: "search.reindexAll", status: "PENDING", dedupeKey: "search:reindexAll:TOPIC" } })).toBeGreaterThan(0);
  });
});

describe("pasted outlines", () => {
  const outline = ["1 Number", "  1.1 Integers", "    > Use natural numbers", "  1.2 Fractions", "2 Algebra", "  > E2.1 Use letters for unknowns"].join("\n");

  it("previews without writing, then imports with provenance", async () => {
    const { syllabusId } = await emptyDraft();
    await addTopic(editor, { syllabusId, name: "Existing topic", slug: "number" });
    const preview = await previewOutline(editor, { syllabusId, text: outline, detectCodes: "on" });
    expect(preview).toMatchObject({ ok: true, topicCount: 4, objectiveCount: 2, depth: 2 });
    expect(preview.preview.map((node) => `${node.depth}:${node.code}:${node.name}`)).toEqual(["0:1:Number", "1:1.1:Integers", "1:1.2:Fractions", "0:2:Algebra"]);
    expect(await db.topic.count({ where: { syllabusId } })).toBe(1);

    const source = await createContentSource({ type: "OFFICIAL_SYLLABUS", name: "Board syllabus 2027 (test)" });
    expect(await importOutline(editor, { syllabusId, text: outline, detectCodes: "on", sourceId: source.id, sourceNote: "Section 3, pages 10-12" })).toEqual({ topics: 4, objectives: 2 });
    const rows = await tree(syllabusId);
    expect(childrenNames(rows, null)).toEqual(["Existing topic", "Number", "Algebra"]);
    expect(childrenNames(rows, "Number")).toEqual(["Integers", "Fractions"]);
    expect(rows.get("Integers")).toMatchObject({ kind: "SUBTOPIC", depth: 1 });
    const slugs = (await db.topic.findMany({ where: { syllabusId }, select: { slug: true } })).map((row) => row.slug).sort();
    expect(slugs).toEqual(["algebra", "fractions", "integers", "number", "number-2"]);
    const objectives = await db.learningObjective.findMany({ where: { topic: { syllabusId } }, select: { code: true, statement: true } });
    expect(objectives).toEqual(expect.arrayContaining([{ code: null, statement: "Use natural numbers" }, { code: "E2.1", statement: "Use letters for unknowns" }]));
    const version = await db.syllabus.findUniqueOrThrow({ where: { id: syllabusId } });
    expect(version.sourceId).toBe(source.id);
    expect(version.sourceNotes).toMatch(/Outline pasted \(4 topics, 2 objectives\) from Board syllabus 2027 \(test\): Section 3, pages 10-12\./);
    expect((await auditRowsFor(syllabusId)).at(-1)).toMatchObject({ action: "import.commit", metadata: { operation: "curriculum.topic.outline_import", topics: 4 } });
  });

  it("imports below an existing node using its kind and reports bad lines", async () => {
    const { syllabusId } = await emptyDraft();
    const parent = await addTopic(editor, { syllabusId, name: "Paper 1 topics", kind: "SECTION" });
    await importOutline(editor, { syllabusId, parentId: parent.id, text: "Mechanics\n  Kinematics" });
    const rows = await tree(syllabusId);
    expect(rows.get("Mechanics")).toMatchObject({ kind: "TOPIC", parentId: parent.id, depth: 1 });
    expect(rows.get("Kinematics")).toMatchObject({ kind: "SUBTOPIC", depth: 2 });
    await expect(importOutline(editor, { syllabusId, text: "> stray objective\nTopic" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { text: [expect.stringMatching(/^Line 1:/)] },
    });
    await expect(importOutline(editor, { syllabusId, text: "   " })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { text: expect.any(Array) } });
  });
});

describe("topic search", () => {
  it("finds topics across versions by name or code", async () => {
    const { syllabusId } = await emptyDraft();
    const marker = `Zebra${randomUUID().slice(0, 6)}`;
    await addTopic(editor, { syllabusId, name: `${marker} crossings`, code: "Z9" });
    const page = await searchTopics(editor, { q: marker });
    expect(page.items).toMatchObject([{ name: `${marker} crossings`, code: "Z9", syllabus: { id: syllabusId, status: "DRAFT" } }]);
    expect((await searchTopics(editor, { q: marker, kind: "SUBTOPIC" })).items).toEqual([]);
    await expect(searchTopics(student, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
