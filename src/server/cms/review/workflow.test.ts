import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { saveLesson } from "../lessons/service";
import {
  approveContent,
  archiveContent,
  discardContentDraftCopy,
  publishContent,
  requestContentChanges,
  startEditingPublished,
  submitContent,
} from "./workflow";
import {
  auditRowsFor,
  auditTrail,
  clearedProvenance,
  contentChain,
  parentActor,
  readyLesson,
  staffActor,
  studentActor,
  teacherActor,
  withFourEyes,
} from "./testing";

/**
 * Integration tests (test database, app role) for the editorial workflow services: permissions, validation, the
 * publish helper's transitions, four-eyes, AI drafts, search re-index jobs and audit rows.
 */

async function expectCode(promise: Promise<unknown>, code: string, field?: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error)).toBe(true);
    if (!isAppError(error)) return;
    expect(error.code).toBe(code);
    if (field) expect(error.fieldErrors?.[field]?.length ?? 0).toBeGreaterThan(0);
    return;
  }
  throw new Error(`expected AppError ${code}`);
}

function lessonRef(id: string) {
  return { entityType: "LESSON", id };
}

describe("review workflow: lessons", () => {
  it("submits, enforces four-eyes on approval, publishes with a snapshot, a search job and audit entries", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor("CONTENT_EDITOR"), staffActor("CONTENT_EDITOR")]);
    const { id } = await readyLesson(editor, chain);

    await expect(submitContent(editor, lessonRef(id))).resolves.toMatchObject({ status: "IN_REVIEW" });
    // The author cannot approve their own work when four-eyes is on (production default).
    await expectCode(withFourEyes((ctx) => approveContent(editor, { ...lessonRef(id), notes: "" }, ctx)), "FORBIDDEN");
    await expect(withFourEyes((ctx) => approveContent(reviewer, { ...lessonRef(id), notes: "Checked." }, ctx))).resolves.toMatchObject({
      status: "APPROVED",
    });

    const published = await publishContent(reviewer, { ...lessonRef(id), changeNote: "First publication" });
    expect(published).toMatchObject({ id, revision: 1, changed: true });

    const lesson = await db.lesson.findUniqueOrThrow({ where: { id } });
    expect(lesson).toMatchObject({ status: "PUBLISHED", approvedById: reviewer.userId, createdById: editor.userId });
    expect(lesson.bodyHtml).toContain("katex");
    const revision = await db.contentRevision.findUniqueOrThrow({ where: { entityType_entityId_revision: { entityType: "LESSON", entityId: id, revision: 1 } } });
    expect(revision.changeNote).toBe("First publication");

    const job = await db.job.findFirst({ where: { type: "search.reindexEntity", dedupeKey: `search:LESSON:${id}` }, select: { queue: true, payload: true } });
    expect(job).toMatchObject({ queue: "search", payload: { entityType: "LESSON", entityId: id } });

    const trail = await auditTrail(id);
    expect(trail).toEqual(expect.arrayContaining(["content.create", "content.update", "content.submit", "content.approve", "content.publish"]));
    const submitRow = (await auditRowsFor(id)).find((row) => (row.metadata as { operation?: string } | null)?.operation === "content.submit");
    expect(submitRow?.actorUserId).toBe(editor.userId);
  });

  it("refuses submission until licensing, topic and body are complete (field errors)", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const { id } = await readyLesson(editor, chain, {
      sourceId: "",
      author: "",
      copyrightStatus: "UNVERIFIED",
      licenceCode: "",
      publicationDate: "",
      topicIds: [],
      primaryTopicId: "",
    });
    try {
      await submitContent(editor, lessonRef(id));
      throw new Error("expected VALIDATION");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("VALIDATION");
      if (!isAppError(error)) return;
      expect(Object.keys(error.fieldErrors ?? {})).toEqual(
        expect.arrayContaining(["copyrightStatus", "sourceId", "author", "licenceCode", "publicationDate", "topicIds"]),
      );
    }
    expect((await db.lesson.findUniqueOrThrow({ where: { id } })).status).toBe("DRAFT");
  });

  it("blocks review when an image has no alt text or the asset does not exist", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const { id } = await readyLesson(editor, chain, { body: "## Diagram\n\n![](asset:3f2a9c1e-5b7d-4e8a-9c0f-1a2b3c4d5e6f)" });
    await expectCode(submitContent(editor, lessonRef(id)), "VALIDATION", "body");
  });

  it("forbids non-staff and validates the reference", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const { id } = await readyLesson(editor, chain);
    const [teacher, student, parent] = await Promise.all([teacherActor(), studentActor(), parentActor()]);
    await expectCode(submitContent(teacher, lessonRef(id)), "FORBIDDEN");
    await expectCode(approveContent(student, { ...lessonRef(id), notes: "x" }), "FORBIDDEN");
    await expectCode(publishContent(parent, lessonRef(id)), "FORBIDDEN");
    await expectCode(archiveContent(teacher, lessonRef(id)), "FORBIDDEN");
    await expectCode(submitContent(editor, { entityType: "LESSON", id: "not-a-uuid" }), "VALIDATION", "id");
    await expectCode(submitContent(editor, { entityType: "SYLLABUS", id }), "VALIDATION", "entityType");
  });

  it("request changes sends the item back to draft with the reviewer's notes (required) and audits it", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor("ADMIN")]);
    const { id } = await readyLesson(editor, chain);
    await submitContent(editor, lessonRef(id));
    await expectCode(requestContentChanges(reviewer, { ...lessonRef(id), notes: " " }), "VALIDATION", "notes");
    await expect(requestContentChanges(reviewer, { ...lessonRef(id), notes: "Add a worked example for negatives." })).resolves.toMatchObject({ status: "DRAFT" });
    const lesson = await db.lesson.findUniqueOrThrow({ where: { id } });
    expect(lesson).toMatchObject({ status: "DRAFT", reviewNotes: "Add a worked example for negatives.", reviewedById: reviewer.userId });
    const row = (await auditRowsFor(id)).find((r) => (r.metadata as { operation?: string } | null)?.operation === "content.request_changes");
    expect(row).toMatchObject({ actorUserId: reviewer.userId, reason: "Add a worked example for negatives." });
  });

  it("AI-generated drafts need an explicit human review note before approval", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const { id } = await readyLesson(editor, chain);
    await db.lesson.update({ where: { id }, data: { aiGenerated: true } });
    await submitContent(editor, lessonRef(id));
    await expectCode(approveContent(reviewer, { ...lessonRef(id), notes: "ok" }), "VALIDATION", "notes");
    await expect(
      approveContent(reviewer, { ...lessonRef(id), notes: "Re-derived every step; notation and originality checked." }),
    ).resolves.toMatchObject({ status: "APPROVED" });
    await publishContent(reviewer, lessonRef(id));
    const revision = await db.contentRevision.findUniqueOrThrow({ where: { entityType_entityId_revision: { entityType: "LESSON", entityId: id, revision: 1 } } });
    expect(revision).toMatchObject({ aiGenerated: true, approvedById: reviewer.userId });
  });

  it("edits a published lesson through a draft copy and publishes the merge as revision 2", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const { id } = await readyLesson(editor, chain);
    await submitContent(editor, lessonRef(id));
    await approveContent(reviewer, { ...lessonRef(id), notes: "" });
    await publishContent(reviewer, lessonRef(id));

    // Published content cannot be saved in place.
    await expectCode(
      saveLesson(editor, { id, title: "Changed", kind: "LESSON", subjectId: chain.subject.id, body: "x", estimatedMinutes: 5, ...clearedProvenance(chain) }),
      "CONFLICT",
    );

    const copy = await startEditingPublished(editor, lessonRef(id));
    expect(copy).toMatchObject({ draftOfId: id, revision: 2, created: true });
    expect(await startEditingPublished(editor, lessonRef(id))).toMatchObject({ id: copy.id, created: false });
    const topic = chain.topics[0];
    await saveLesson(editor, {
      id: copy.id,
      title: "Solving linear equations (revised)",
      kind: "LESSON",
      subjectId: chain.subject.id,
      body: "## Method\n\nRevised: $3x = 12$ so $x = 4$.",
      estimatedMinutes: 15,
      topicIds: [topic?.id],
      primaryTopicId: topic?.id,
      ...clearedProvenance(chain),
    });
    expect((await db.lesson.findUniqueOrThrow({ where: { id } })).title).toBe("Solving linear equations");

    await submitContent(editor, lessonRef(copy.id));
    await approveContent(reviewer, { ...lessonRef(copy.id), notes: "" });
    const merged = await publishContent(reviewer, { ...lessonRef(copy.id), changeNote: "Clearer example" });
    expect(merged).toMatchObject({ id, revision: 2, changed: true, mergedDraftId: copy.id });
    const live = await db.lesson.findUniqueOrThrow({ where: { id } });
    expect(live).toMatchObject({ revision: 2, title: "Solving linear equations (revised)", estimatedMinutes: 15 });
    expect(await db.lesson.findUnique({ where: { id: copy.id } })).toBeNull();
    expect(await auditTrail(id)).toEqual(expect.arrayContaining(["content.draft_copy", "content.publish"]));
  });

  it("archives published content and discards draft copies", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const { id } = await readyLesson(editor, chain);
    await submitContent(editor, lessonRef(id));
    await approveContent(reviewer, { ...lessonRef(id), notes: "" });
    await publishContent(reviewer, lessonRef(id));

    const copy = await startEditingPublished(editor, lessonRef(id));
    // A pending draft copy blocks archiving; discard it first.
    await expectCode(archiveContent(reviewer, lessonRef(id)), "CONFLICT");
    await expectCode(discardContentDraftCopy(editor, lessonRef(id)), "BAD_REQUEST");
    await expect(discardContentDraftCopy(editor, lessonRef(copy.id))).resolves.toEqual({ liveId: id });
    expect(await db.lesson.findUnique({ where: { id: copy.id } })).toBeNull();

    await expect(archiveContent(reviewer, lessonRef(id))).resolves.toMatchObject({ status: "ARCHIVED" });
    expect((await db.lesson.findUniqueOrThrow({ where: { id } })).archivedAt).not.toBeNull();
    expect(await auditTrail(id)).toEqual(expect.arrayContaining(["content.discard", "content.archive"]));
  });
});

describe("review workflow: last author", () => {
  it("makes whoever last edited a draft its author, so they cannot approve it under four-eyes", async () => {
    const chain = await contentChain();
    const [writer, editor] = await Promise.all([staffActor(), staffActor()]);
    const { id } = await readyLesson(writer, chain);
    const topic = chain.topics[0];
    await saveLesson(editor, {
      id,
      title: "Solving linear equations (edited)",
      kind: "LESSON",
      subjectId: chain.subject.id,
      body: "## Method\n\nEdited by a second editor: $x + 1 = 2$ so $x = 1$.",
      estimatedMinutes: 12,
      topicIds: [topic?.id],
      primaryTopicId: topic?.id,
      ...clearedProvenance(chain),
    });
    expect((await db.lesson.findUniqueOrThrow({ where: { id } })).createdById).toBe(editor.userId);
    await submitContent(editor, lessonRef(id));
    await expectCode(withFourEyes((ctx) => approveContent(editor, { ...lessonRef(id), notes: "" }, ctx)), "FORBIDDEN");
    await expect(withFourEyes((ctx) => approveContent(writer, { ...lessonRef(id), notes: "" }, ctx))).resolves.toMatchObject({ status: "APPROVED" });
  });
});
