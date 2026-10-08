import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createQuestion as createFixtureQuestion, createSchool } from "../../../../tests/factories/index";
import {
  approveQuestion,
  archiveQuestion,
  createQuestion,
  discardQuestionDraft,
  editPublishedQuestion,
  getQuestionEditor,
  publishQuestion,
  requestQuestionChanges,
  submitQuestion,
  updateQuestion,
} from "./service";
import { auditTrail, chain, mcqDocument, staffActor, structuredDocument, teacherActor, withFourEyes } from "./testing";

async function searchJobs(entityId: string): Promise<number> {
  return db.job.count({ where: { type: "search.reindexEntity", dedupeKey: `search:QUESTION:${entityId}` } });
}

describe("question workflow through the publish helper", () => {
  it("submit → four-eyes approval → publish writes revision 1, audit entries and a search job", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const reviewer = await staffActor("ADMIN");
    const { id } = await createQuestion(editor, mcqDocument(c));

    await submitQuestion(editor, { id });
    expect((await db.question.findUniqueOrThrow({ where: { id } })).status).toBe("IN_REVIEW");

    // The author cannot approve their own work when four-eyes is on…
    await expect(withFourEyes((ctx) => approveQuestion(editor, { id }, ctx))).rejects.toMatchObject({ code: "FORBIDDEN" });
    // …another reviewer can.
    await withFourEyes((ctx) => approveQuestion(reviewer, { id, notes: "Checked the key and notation." }, ctx));
    const approved = await db.question.findUniqueOrThrow({ where: { id } });
    expect(approved).toMatchObject({ status: "APPROVED", approvedById: reviewer.userId, reviewNotes: "Checked the key and notation." });

    // Publishing APPROVED content is allowed to any publisher (the editor here).
    const result = await publishQuestion(editor, { id, changeNote: "First version" });
    expect(result).toMatchObject({ id, revision: 1, changed: true });
    const revision = await db.contentRevision.findUniqueOrThrow({ where: { entityType_entityId_revision: { entityType: "QUESTION", entityId: id, revision: 1 } } });
    expect(revision).toMatchObject({ authorId: editor.userId, approvedById: reviewer.userId, changeNote: "First version" });
    expect(await searchJobs(id)).toBe(1);
    expect(await auditTrail(id)).toEqual(["content.create:content.create", "content.submit:content.submit", "content.approve:", "content.publish:"]);
  });

  it("refuses publishing before approval and lets reviewers send items back with notes", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const reviewer = await staffActor("CONTENT_EDITOR");
    const { id } = await createQuestion(editor, mcqDocument(c));
    await submitQuestion(editor, { id });
    await expect(publishQuestion(reviewer, { id })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(requestQuestionChanges(reviewer, { id, notes: "" })).rejects.toMatchObject({ code: "VALIDATION" });
    await requestQuestionChanges(reviewer, { id, notes: "Option C needs a better rationale." });
    const row = await db.question.findUniqueOrThrow({ where: { id } });
    expect(row).toMatchObject({ status: "DRAFT", reviewNotes: "Option C needs a better rationale.", reviewedById: reviewer.userId });
    expect((await auditTrail(id)).at(-1)).toBe("content.request_changes:content.request_changes");
  });

  it("AI drafts need a written human review before approval and a human approver before publication", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const reviewer = await staffActor("ADMIN");
    const { id } = await createQuestion(editor, mcqDocument(c));
    await db.question.update({ where: { id }, data: { aiGenerated: true } });
    await submitQuestion(editor, { id });
    await expect(approveQuestion(reviewer, { id, notes: "ok" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { notes: expect.any(Array) } });
    await approveQuestion(reviewer, { id, notes: "Solved it independently; key and rationales are right." });
    await publishQuestion(reviewer, { id });
    const row = await db.question.findUniqueOrThrow({ where: { id } });
    expect(row).toMatchObject({ status: "PUBLISHED", aiGenerated: true, approvedById: reviewer.userId });
  });

  it("edits published questions through a draft copy: revision 2, stable part ids, the old snapshot kept", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const reviewer = await staffActor("ADMIN");
    const { id } = await createQuestion(editor, structuredDocument(c));
    await submitQuestion(editor, { id });
    await approveQuestion(reviewer, { id });
    await publishQuestion(reviewer, { id });
    const liveParts = await db.question.findMany({ where: { parentId: id }, orderBy: { partOrder: "asc" }, select: { id: true } });

    const copy = await editPublishedQuestion(editor, { id });
    expect(copy).toMatchObject({ draftOfId: id, revision: 2, created: true });
    expect((await editPublishedQuestion(editor, { id })).created).toBe(false);
    const view = await getQuestionEditor(editor, copy.id);
    expect(view.editable).toBe(true);
    expect(view.draftOf?.id).toBe(id);
    const [partA, partB] = view.document.parts ?? [];
    await updateQuestion(editor, {
      id: copy.id,
      version: view.version,
      question: { ...view.document, parts: [partA, { ...partB, answerSpec: { value: 5, tolerance: { kind: "absolute", amount: 0.1 } } }] },
    });
    await submitQuestion(editor, { id: copy.id });
    await approveQuestion(reviewer, { id: copy.id });
    const merged = await publishQuestion(reviewer, { id: copy.id, changeNote: "Accept rounding" });
    expect(merged).toMatchObject({ id, revision: 2, changed: true, mergedDraftId: copy.id });

    expect(await db.question.findUnique({ where: { id: copy.id } })).toBeNull();
    const live = await db.question.findUniqueOrThrow({ where: { id }, include: { parts: { where: { status: "PUBLISHED" }, orderBy: { partOrder: "asc" } } } });
    expect(live.revision).toBe(2);
    expect(live.parts.map((p) => p.id)).toEqual(liveParts.map((p) => p.id));
    expect(live.parts[1]?.answerSpec).toMatchObject({ tolerance: { amount: 0.1 } });
    const revisions = await db.contentRevision.findMany({ where: { entityType: "QUESTION", entityId: id }, orderBy: { revision: "asc" } });
    expect(revisions.map((r) => r.revision)).toEqual([1, 2]);
    expect(await auditTrail(id)).toContain("content.draft_copy:content.draft_copy");
  });

  it("archives published questions and discards draft copies", async () => {
    const editor = await staffActor("CONTENT_EDITOR");
    const published = await createFixtureQuestion("MULTIPLE_CHOICE");
    const copy = await editPublishedQuestion(editor, { id: published.id });
    await expect(archiveQuestion(editor, { id: published.id })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(discardQuestionDraft(editor, { id: published.id })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(await discardQuestionDraft(editor, { id: copy.id })).toEqual({ liveId: published.id });
    await archiveQuestion(editor, { id: published.id });
    expect((await db.question.findUniqueOrThrow({ where: { id: published.id } })).status).toBe("ARCHIVED");
    expect(await auditTrail(published.id)).toEqual(["content.draft_copy:content.draft_copy", "content.discard:content.discard", "content.archive:"]);
  });

  it("refuses teachers and private (school) questions", async () => {
    const teacher = await teacherActor();
    const editor = await staffActor("CONTENT_EDITOR");
    const published = await createFixtureQuestion("TRUE_FALSE");
    await expect(archiveQuestion(teacher, { id: published.id })).rejects.toMatchObject({ code: "FORBIDDEN" });
    const { school } = await createSchool();
    const privateQuestion = await createFixtureQuestion("TRUE_FALSE", { schoolId: school.id });
    await expect(archiveQuestion(editor, { id: privateQuestion.id })).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(getQuestionEditor(editor, privateQuestion.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
