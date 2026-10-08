import { randomBytes } from "node:crypto";
import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { candidatePool, getQuestionsForAttempt } from "@/server/questions/repository";
import { SEARCH_JOB_HANDLERS, searchIndexDedupeKey } from "@/server/search/indexer";
import { search } from "@/server/search/query";
import {
  approveQuestion,
  createQuestion,
  editPublishedQuestion,
  getQuestionEditor,
  publishQuestion,
  submitQuestion,
  updateQuestion,
} from "./questions/service";
import { auditTrail, chain, mcqDocument, staffActor, withFourEyes } from "./questions/testing";

/**
 * End-to-end editorial workflow through the CMS services against the test database (CLAUDE.md rule 7, "Database
 * rules enforced by Postgres"): an editor drafts and submits a question; with four-eyes ON the author can approve
 * neither through the service nor by writing the row directly; an admin approves and publishes; students see it;
 * an edit goes through a draft copy that students never see; the publish merge bumps the revision; both immutable
 * snapshots exist; and the search index follows each publish (the worker's `search.reindexEntity` handler is run
 * here in place of the worker).
 */

/** A word no other fixture uses, so search and stem checks are unambiguous. */
function marker(): string {
  return `zq${randomBytes(5).toString("hex").replace(/[0-9]/g, (d) => "abcdefghij"[Number(d)] ?? "x")}`;
}

/** Runs the pending `search.reindexEntity` job of a question the way the worker would. */
async function runSearchJob(questionId: string): Promise<void> {
  const job = await db.job.findFirst({
    where: { type: "search.reindexEntity", dedupeKey: searchIndexDedupeKey("QUESTION", questionId), status: "PENDING" },
    select: { id: true, payload: true },
  });
  expect(job, "publish must enqueue a search.reindexEntity job").not.toBeNull();
  await SEARCH_JOB_HANDLERS["search.reindexEntity"](job?.payload);
  await db.job.update({ where: { id: job!.id }, data: { status: "SUCCEEDED", completedAt: new Date() } });
}

describe("question workflow end to end (services + Postgres rules)", () => {
  it("draft → review → four-eyes → approve + publish → students see it → edit via draft copy → merge (revision 2) → snapshots → search", async () => {
    const c = await chain();
    const topic = c.topics[0]!;
    const editor = await staffActor("CONTENT_EDITOR");
    const admin = await staffActor("ADMIN");
    const v1 = marker();
    const v2 = marker();
    const studentPool = async () =>
      (await candidatePool({ subjectId: c.subject.id, syllabusId: c.syllabus.id, topicIds: [topic.id], limit: 100, accessTier: "FREE" })).map((q) => q.id);
    const findInSearch = async (word: string) =>
      (await search({ q: word, detect: false, filters: { subjectId: c.subject.id, types: ["QUESTION"] } })).items.map((item) => item.entityId);

    // 1. The editor creates a DRAFT. Students cannot see drafts.
    const { id } = await createQuestion(editor, mcqDocument(c, { stem: `Solve $2x = 6$ (${v1}).` }));
    expect(await db.question.findUniqueOrThrow({ where: { id }, select: { status: true, createdById: true, revision: true } })).toEqual({
      status: "DRAFT",
      createdById: editor.userId,
      revision: 1,
    });
    expect(await studentPool()).not.toContain(id);
    expect(await getQuestionsForAttempt([id])).toEqual([]);

    // 2. Submit for review.
    await submitQuestion(editor, { id });
    expect((await db.question.findUniqueOrThrow({ where: { id } })).status).toBe("IN_REVIEW");

    // 3. Four-eyes ON: the author can approve neither through the service…
    await expect(withFourEyes((ctx) => approveQuestion(editor, { id, notes: "Looks right to me." }, ctx))).rejects.toMatchObject({ code: "FORBIDDEN" });
    // …nor by bypassing it: the Postgres workflow trigger refuses the write.
    await expect(
      withFourEyes(({ client }) => client!.question.update({ where: { id }, data: { status: "APPROVED", approvedById: editor.userId, approvedAt: new Date() } })),
    ).rejects.toThrow(/four-eyes/);
    // Skipping a step is refused too (IN_REVIEW → PUBLISHED).
    await expect(db.question.update({ where: { id }, data: { status: "PUBLISHED", publishedAt: new Date() } })).rejects.toThrow(/illegal workflow transition/);
    await expect(publishQuestion(admin, { id })).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await db.question.findUniqueOrThrow({ where: { id } })).status).toBe("IN_REVIEW");

    // 4. Another person (ADMIN) approves under four-eyes and publishes.
    await withFourEyes((ctx) => approveQuestion(admin, { id, notes: "Key and rationales checked." }, ctx));
    const published = await publishQuestion(admin, { id, changeNote: "First version" });
    expect(published).toMatchObject({ id, revision: 1, changed: true });
    expect(await db.question.findUniqueOrThrow({ where: { id }, select: { status: true, approvedById: true, revision: true } })).toEqual({
      status: "PUBLISHED",
      approvedById: admin.userId,
      revision: 1,
    });

    // 5. Students see it (practice pool + attempt loader) at revision 1.
    expect(await studentPool()).toContain(id);
    const [seen] = await getQuestionsForAttempt([id], { syllabusId: c.syllabus.id });
    expect(seen).toMatchObject({ id, revision: 1, primaryTopicId: topic.id });
    expect(seen?.stem).toContain(v1);

    // 6. The search index picks it up once the worker runs the queued job.
    expect(await findInSearch(v1)).not.toContain(id);
    await runSearchJob(id);
    expect(await findInSearch(v1)).toContain(id);

    // 7. Published content is immutable: a direct content change without a revision bump is refused…
    await expect(db.question.update({ where: { id }, data: { stem: `Tampered ${v2}` } })).rejects.toThrow(/changed without a new revision/);
    // …so the editor opens a draft copy. Students keep seeing the live row; the copy is never served.
    const copy = await editPublishedQuestion(editor, { id });
    expect(copy).toMatchObject({ draftOfId: id, revision: 2, created: true });
    const view = await getQuestionEditor(editor, copy.id);
    await updateQuestion(editor, { id: copy.id, version: view.version, question: { ...view.document, stem: `Solve $2x = 8$ (${v2}).` } });
    expect(await studentPool()).not.toContain(copy.id);
    expect(await getQuestionsForAttempt([copy.id])).toEqual([]);
    expect((await getQuestionsForAttempt([id]))[0]?.stem).toContain(v1);

    // 8. Same rules for the copy: its author (the editor) cannot approve it under four-eyes; the admin can.
    await submitQuestion(editor, { id: copy.id });
    await expect(withFourEyes((ctx) => approveQuestion(editor, { id: copy.id, notes: "Fixed the value." }, ctx))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await withFourEyes((ctx) => approveQuestion(admin, { id: copy.id, notes: "New value checked." }, ctx));
    const merged = await publishQuestion(admin, { id: copy.id, changeNote: "Changed the equation" });
    expect(merged).toMatchObject({ id, revision: 2, changed: true, mergedDraftId: copy.id });

    // 9. The publish merge: same live id, revision 2, new content, draft copy gone.
    expect(await db.question.findUnique({ where: { id: copy.id } })).toBeNull();
    const live = await db.question.findUniqueOrThrow({ where: { id }, select: { status: true, revision: true, stem: true, approvedById: true } });
    expect(live).toMatchObject({ status: "PUBLISHED", revision: 2, approvedById: admin.userId });
    expect(live.stem).toContain(v2);
    const [seenAgain] = await getQuestionsForAttempt([id], { syllabusId: c.syllabus.id });
    expect(seenAgain).toMatchObject({ id, revision: 2 });
    expect(seenAgain?.stem).toContain(v2);

    // 10. ContentRevision holds both immutable snapshots: revision 1 still shows what students saw then.
    const revisions = await db.contentRevision.findMany({
      where: { entityType: "QUESTION", entityId: id },
      orderBy: { revision: "asc" },
      select: { id: true, revision: true, snapshot: true, authorId: true, approvedById: true, changeNote: true },
    });
    expect(revisions.map((r) => [r.revision, r.approvedById, r.changeNote])).toEqual([
      [1, admin.userId, "First version"],
      [2, admin.userId, "Changed the equation"],
    ]);
    expect(JSON.stringify(revisions[0]?.snapshot)).toContain(v1);
    expect(JSON.stringify(revisions[0]?.snapshot)).not.toContain(v2);
    expect(JSON.stringify(revisions[1]?.snapshot)).toContain(v2);
    // Append-only: a snapshot can be neither rewritten nor deleted.
    // (Raw SQL so the database's own message is visible; Prisma's client maps restrict_violation to a generic FK error.)
    const firstRevisionId = revisions[0]!.id;
    await expect(db.$executeRaw`UPDATE "ContentRevision" SET "changeNote" = 'rewritten' WHERE "id" = ${firstRevisionId}::uuid`).rejects.toThrow(
      /ContentRevision rows are immutable|permission denied/,
    );
    await expect(db.$executeRaw`DELETE FROM "ContentRevision" WHERE "id" = ${firstRevisionId}::uuid`).rejects.toThrow(
      /ContentRevision rows are immutable|permission denied/,
    );
    expect(await db.contentRevision.count({ where: { id: firstRevisionId, changeNote: "First version" } })).toBe(1);

    // 11. The merge re-queued indexing: after the job the index has the new text and not the old.
    await runSearchJob(id);
    expect(await findInSearch(v2)).toContain(id);
    expect(await findInSearch(v1)).not.toContain(id);

    // 12. Every step is audited, with the operation recorded.
    const trail = await auditTrail(id);
    expect(trail).toEqual(expect.arrayContaining(["content.create:content.create", "content.submit:content.submit", "content.draft_copy:content.draft_copy"]));
    expect(trail.filter((entry) => entry.startsWith("content.approve:")).length).toBeGreaterThanOrEqual(1);
    expect(trail.filter((entry) => entry === "content.publish:").length).toBeGreaterThanOrEqual(1);
    const auditActors = await db.auditLog.findMany({ where: { entityId: { in: [id, copy.id] } }, select: { actorUserId: true } });
    expect(new Set(auditActors.map((row) => row.actorUserId))).toEqual(new Set([editor.userId, admin.userId]));
  });
});
