import sharp from "sharp";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { LocalDriver } from "@/server/lib/storage";
import { createQuestion } from "../../../../tests/factories/questions";
import { uploadMedia } from "../media/service";
import { auditTrail, clearedProvenance, contentChain, readyLesson, staffActor, studentActor, teacherActor } from "../review/testing";
import { submitContent } from "../review/workflow";
import { createLesson, getLessonEditor, listLessons, previewMarkdown, saveLesson } from "./service";

/** Integration tests for lesson authoring (create, save with tags / objectives / questions, preview, list). */

let storageRoot: string;
let storage: LocalDriver;

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(tmpdir(), "dz-lessons-"));
  storage = new LocalDriver(storageRoot);
});

afterAll(async () => {
  await rm(storageRoot, { recursive: true, force: true });
});

async function expectValidation(promise: Promise<unknown>, field: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error) && error.code).toBe("VALIDATION");
    if (isAppError(error)) expect(error.fieldErrors?.[field]?.length ?? 0).toBeGreaterThan(0);
    return;
  }
  throw new Error(`expected a VALIDATION error on ${field}`);
}

function baseSave(chain: Awaited<ReturnType<typeof contentChain>>, id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    title: "Factorising quadratics",
    kind: "LESSON",
    subjectId: chain.subject.id,
    body: "## Factorising\n\n$x^2 - 5x + 6 = (x - 2)(x - 3)$",
    estimatedMinutes: 10,
    ...clearedProvenance(chain),
    ...overrides,
  };
}

describe("lesson authoring", () => {
  it("creates a draft with a unique slug and its primary topic, and audits it", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const topic = chain.topics[0];
    const a = await createLesson(editor, { title: "Solving Quadratics: Part 2!", kind: "LESSON", subjectId: chain.subject.id, primaryTopicId: topic?.id });
    const b = await createLesson(editor, { title: "Solving quadratics part 2", kind: "LESSON", subjectId: chain.subject.id });
    expect(a.slug).toBe("solving-quadratics-part-2");
    expect(b.slug).toBe("solving-quadratics-part-2-2");
    const lesson = await db.lesson.findUniqueOrThrow({ where: { id: a.id }, include: { topics: true } });
    expect(lesson).toMatchObject({ status: "DRAFT", createdById: editor.userId, copyrightStatus: "UNVERIFIED" });
    expect(lesson.topics).toEqual([expect.objectContaining({ topicId: topic?.id, isPrimary: true })]);
    expect(await auditTrail(a.id)).toEqual(["content.create"]);
    await expectValidation(createLesson(editor, { title: "No subject", kind: "LESSON", subjectId: "" }), "subjectId");
    // A public article may be general (no subject).
    await expect(createLesson(editor, { title: `General article ${Date.now()}`, kind: "ARTICLE", subjectId: "" })).resolves.toMatchObject({ id: expect.any(String) });
  });

  it("saves fields, tags, objectives, ordered practice questions and the render cache", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const { id } = await createLesson(editor, { title: "Factorising", kind: "LESSON", subjectId: chain.subject.id });
    const [topic, other] = chain.topics;
    const subtopic = chain.subtopics[0];
    const objectiveId = chain.objectiveIds[0];
    const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((t) => t.id) };
    const [q1, q2] = await Promise.all([createQuestion("TRUE_FALSE", { context }), createQuestion("MULTIPLE_CHOICE", { context })]);
    const before = await db.lesson.findUniqueOrThrow({ where: { id }, select: { updatedAt: true } });

    const result = await saveLesson(
      editor,
      baseSave(chain, id, {
        expectedUpdatedAt: before.updatedAt.toISOString(),
        summary: "Quadratics by factorising.",
        metaTitle: "Factorising quadratics",
        accessTier: "FREE",
        topicIds: [topic?.id, other?.id],
        primaryTopicId: other?.id,
        objectiveIds: [objectiveId],
        questionIds: [q2.id, q1.id],
      }),
    );
    expect(result.changed).toEqual(expect.arrayContaining(["title", "body", "topics", "objectives", "questions", "copyrightStatus"]));
    expect(subtopic?.parentId).toBe(topic?.id);

    const saved = await db.lesson.findUniqueOrThrow({
      where: { id },
      include: { topics: true, objectives: true, practiceLinks: { orderBy: { sortOrder: "asc" } } },
    });
    expect(saved).toMatchObject({ title: "Factorising quadratics", accessTier: "FREE", metaTitle: "Factorising quadratics", copyrightStatus: "OWNED", licenceCode: "PROPRIETARY" });
    expect(saved.bodyHtml).toContain("katex");
    expect(saved.contentHash).toMatch(/^[0-9a-f]{64}$/);
    expect(saved.topics.find((t) => t.isPrimary)?.topicId).toBe(other?.id);
    expect(saved.objectives.map((o) => o.objectiveId)).toEqual([objectiveId]);
    expect(saved.practiceLinks.map((q) => q.questionId)).toEqual([q2.id, q1.id]);

    const editorData = await getLessonEditor(editor, id);
    expect(editorData).toMatchObject({ editable: true, isOwnWork: true, objectiveIds: [objectiveId] });
    expect(editorData.questions.map((q) => q.id)).toEqual([q2.id, q1.id]);
    expect(editorData.objectives.some((o) => o.id === objectiveId)).toBe(true);
    expect(editorData.topics.find((t) => t.isPrimary)?.id).toBe(other?.id);

    // Stale editor: someone saved since it was loaded.
    try {
      await saveLesson(editor, baseSave(chain, id, { expectedUpdatedAt: before.updatedAt.toISOString() }));
      throw new Error("expected CONFLICT");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("CONFLICT");
    }
  });

  it("validates references, licence evidence and slugs as field errors", async () => {
    const chain = await contentChain();
    const other = await contentChain();
    const editor = await staffActor();
    const { id } = await createLesson(editor, { title: "Validation", kind: "LESSON", subjectId: chain.subject.id });
    const topic = chain.topics[0];
    // An objective of another syllabus is not under the tagged topics.
    await expectValidation(saveLesson(editor, baseSave(chain, id, { topicIds: [topic?.id], objectiveIds: [other.objectiveIds[0]] })), "objectiveIds");
    await expectValidation(saveLesson(editor, baseSave(chain, id, { topicIds: [topic?.id], primaryTopicId: chain.topics[1]?.id })), "primaryTopicId");
    await expectValidation(saveLesson(editor, baseSave(chain, id, { copyrightStatus: "LICENSED", sourceId: "" })), "sourceId");
    await expectValidation(saveLesson(editor, baseSave(chain, id, { slug: "Not A Slug" })), "slug");
    await expectValidation(saveLesson(editor, baseSave(chain, id, { estimatedMinutes: 0 })), "estimatedMinutes");
    const draftQuestion = await createQuestion("TRUE_FALSE", {
      context: { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((t) => t.id) },
      status: "DRAFT",
    });
    // A draft (unpublished) question can be attached while drafting but blocks submission.
    await saveLesson(editor, baseSave(chain, id, { topicIds: [topic?.id], primaryTopicId: topic?.id, questionIds: [draftQuestion.id] }));
    await expectValidation(submitContent(editor, { entityType: "LESSON", id }), "questionIds");

    const taken = await readyLesson(editor, chain);
    const takenSlug = (await db.lesson.findUniqueOrThrow({ where: { id: taken.id } })).slug;
    await expectValidation(saveLesson(editor, baseSave(chain, id, { slug: takenSlug })), "slug");
  });

  it("refuses to edit content that is not a draft and is staff-only", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const { id } = await readyLesson(editor, chain);
    await submitContent(editor, { entityType: "LESSON", id });
    try {
      await saveLesson(editor, baseSave(chain, id));
      throw new Error("expected CONFLICT");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("CONFLICT");
    }
    const [teacher, student] = await Promise.all([teacherActor(), studentActor()]);
    await expect(createLesson(teacher, { title: "x", kind: "LESSON", subjectId: chain.subject.id })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(saveLesson(student, baseSave(chain, id))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(listLessons(student, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(previewMarkdown(teacher, { body: "x" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("previews markdown with warnings and resolves uploaded images; media usage follows saves", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const missingAlt = await previewMarkdown(editor, { body: "![](asset:3f2a9c1e-5b7d-4e8a-9c0f-1a2b3c4d5e6f)\n\n$\\frac{1}{2$" });
    expect(missingAlt.warnings.map((w) => w.code)).toEqual(expect.arrayContaining(["math-error"]));
    expect(missingAlt.warnings.some((w) => w.code === "image-missing-alt" || w.code === "image-unresolved")).toBe(true);

    const bytes = new Uint8Array(await sharp({ create: { width: 20, height: 10, channels: 3, background: "#1e6f8a" } }).png().toBuffer());
    const upload = await uploadMedia(editor, { bytes, filename: "cell.png" }, { purpose: "DIAGRAM", altText: "A labelled plant cell" }, {}, { storage });
    const preview = await previewMarkdown(editor, { body: `![A plant cell](asset:${upload.id})` });
    expect(preview.warnings).toEqual([]);
    expect(String(preview.html)).toContain("/api/media/");

    const { id } = await createLesson(editor, { title: "Cells", kind: "LESSON", subjectId: chain.subject.id });
    await saveLesson(editor, baseSave(chain, id, { body: `## Cell\n\n![A plant cell](asset:${upload.id})` }));
    expect(await db.contentMediaUsage.findMany({ where: { entityId: id }, select: { mediaAssetId: true, field: true } })).toEqual([{ mediaAssetId: upload.id, field: "body" }]);
    await saveLesson(editor, baseSave(chain, id, { body: "## Cell\n\nNo image any more." }));
    expect(await db.contentMediaUsage.count({ where: { entityId: id } })).toBe(0);
  });

  it("lists live lessons with filters and pending edits", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const { id } = await readyLesson(editor, chain);
    const ai = await readyLesson(editor, chain);
    await db.lesson.update({ where: { id: ai.id }, data: { aiGenerated: true } });

    const bySubject = await listLessons(editor, { subjectId: chain.subject.id });
    expect(bySubject.items.map((l) => l.id).sort()).toEqual([id, ai.id].sort());
    expect(bySubject.items[0]).toMatchObject({ subject: chain.subject.name, primaryTopic: expect.stringContaining("Topic 1"), status: "DRAFT", openFlags: 0 });
    expect((await listLessons(editor, { subjectId: chain.subject.id, ai: "yes" })).items.map((l) => l.id)).toEqual([ai.id]);
    expect((await listLessons(editor, { syllabusId: chain.syllabus.id, status: "PUBLISHED" })).items).toEqual([]);
    expect((await listLessons(editor, { topicId: chain.topics[0]?.id, authorId: editor.userId })).items).toHaveLength(2);
    const page = await listLessons(editor, { subjectId: chain.subject.id, limit: 1 });
    expect(page.items).toHaveLength(1);
    const next = await listLessons(editor, { subjectId: chain.subject.id, limit: 1, cursor: page.nextCursor ?? undefined });
    expect(next.items).toHaveLength(1);
    expect(next.items[0]?.id).not.toBe(page.items[0]?.id);
  });
});
