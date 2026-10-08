import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { createCurriculumChain, createUser, uniqueSlug, type CurriculumChain } from "../../../tests/factories/index";
import { createQuestion, createQuestionContext } from "../../../tests/factories/questions";
import {
  approve,
  archive,
  buildSnapshot,
  collectContentIssues,
  contentProjection,
  createDraftCopyForEdit,
  discardDraftCopy,
  loadContentAggregate,
  publish,
  reopenArchived,
  requestChanges,
  submitForReview,
  type ContentActor,
} from "./publish";

/**
 * Integration tests for the shared publish helper against the real C1.5 triggers and CHECKs (test database, app role).
 * Every test creates its own curriculum, users and content with unique values.
 */

async function staff(): Promise<{ editor: ContentActor & { kind: "user" }; reviewer: ContentActor & { kind: "user" } }> {
  const [editor, reviewer] = await Promise.all([createUser({ roles: ["CONTENT_EDITOR"] }), createUser({ roles: ["ADMIN"] })]);
  return {
    editor: { kind: "user", userId: editor.user.id, roles: ["CONTENT_EDITOR"] },
    reviewer: { kind: "user", userId: reviewer.user.id, roles: ["ADMIN"] },
  };
}

const SYSTEM: ContentActor = { kind: "system", job: "test" };

async function chain(): Promise<CurriculumChain> {
  return createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
}

async function draftLesson(c: CurriculumChain, createdById: string, extra: { aiGenerated?: boolean; body?: string } = {}): Promise<string> {
  const topic = c.topics[0];
  if (!topic) throw new Error("no topic");
  const lesson = await db.lesson.create({
    data: {
      subjectId: c.subject.id,
      title: "Solving linear equations",
      slug: uniqueSlug("lesson"),
      summary: "Original test summary.",
      body: extra.body ?? "## Method\n\nSolve $2x + 3 = 7$: subtract 3, then divide by 2, so $x = 2$.",
      accessTier: "FREE",
      copyrightStatus: "OWNED",
      sourceId: c.source.id,
      createdById,
      aiGenerated: extra.aiGenerated ?? false,
      topics: { create: { topicId: topic.id, isPrimary: true } },
    },
    select: { id: true },
  });
  return lesson.id;
}

async function publishFlow(entityType: "LESSON" | "QUESTION" | "ASSESSMENT", id: string, editor: ContentActor, reviewer: ContentActor) {
  return db.$transaction(async (tx) => {
    await submitForReview(tx, entityType, id, editor);
    await approve(tx, entityType, id, reviewer);
    return publish(tx, entityType, id, reviewer, { changeNote: "Test publication" });
  });
}

describe("publish: lessons", () => {
  it("publishes an approved lesson with its revision-1 snapshot and audit entry", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);

    const result = await publishFlow("LESSON", id, editor, reviewer);
    expect(result).toMatchObject({ id, revision: 1, changed: true, mergedDraftId: null });

    const lesson = await db.lesson.findUniqueOrThrow({ where: { id } });
    expect(lesson.status).toBe("PUBLISHED");
    expect(lesson.approvedById).toBe(reviewer.userId);
    expect(lesson.publishedAt).not.toBeNull();

    const revision = await db.contentRevision.findUniqueOrThrow({
      where: { entityType_entityId_revision: { entityType: "LESSON", entityId: id, revision: 1 } },
    });
    expect(revision.authorId).toBe(editor.userId);
    expect(revision.approvedById).toBe(reviewer.userId);
    expect(revision.contentHash).toMatch(/^[0-9a-f]{64}$/);
    const aggregate = await db.$transaction((tx) => loadContentAggregate(tx, "LESSON", id));
    expect(aggregate && buildSnapshot("LESSON", aggregate).contentHash).toBe(revision.contentHash);

    const audits = await db.auditLog.findMany({ where: { entityId: id }, select: { action: true } });
    expect(audits.map((a) => a.action).sort()).toEqual(["content.approve", "content.publish"]);
  });

  it("lets the database refuse in-place edits of PUBLISHED content and illegal transitions", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);
    await publishFlow("LESSON", id, editor, reviewer);

    await expect(db.lesson.update({ where: { id }, data: { title: "Edited in place" } })).rejects.toThrow(/without a new revision/);
    await expect(db.lesson.update({ where: { id }, data: { status: "DRAFT", revision: 2 } })).rejects.toThrow(/illegal workflow transition/);
    // Render caches stay editable on published rows.
    await expect(db.lesson.update({ where: { id }, data: { bodyHtml: "<p>cache</p>", renderVersion: 1 } })).resolves.toBeTruthy();

    const question = await createQuestion("TRUE_FALSE", { context: { subjectId: c.subject.id, syllabusId: c.syllabus.id, topicIds: c.topics.map((t) => t.id) } });
    // Children of a published root change only inside its publish transaction.
    await expect(db.lessonQuestion.create({ data: { lessonId: id, questionId: question.id } })).rejects.toThrow(/publish transaction/);
  });

  it("publish merge: a draft copy becomes revision 2 of the live row, with a new snapshot", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);
    await publishFlow("LESSON", id, editor, reviewer);
    const rev1 = await db.contentRevision.findUniqueOrThrow({ where: { entityType_entityId_revision: { entityType: "LESSON", entityId: id, revision: 1 } } });

    const copy = await db.$transaction((tx) => createDraftCopyForEdit(tx, "LESSON", id, editor));
    expect(copy).toMatchObject({ draftOfId: id, revision: 2, created: true });
    const again = await db.$transaction((tx) => createDraftCopyForEdit(tx, "LESSON", id, editor));
    expect(again).toMatchObject({ id: copy.id, created: false });

    const secondTopic = c.topics[1];
    if (!secondTopic) throw new Error("no topic");
    await db.lesson.update({ where: { id: copy.id }, data: { title: "Solving linear equations (revised)", body: "## Method\n\nRevised: $3x = 12$ so $x = 4$." } });
    await db.lessonTopic.create({ data: { lessonId: copy.id, topicId: secondTopic.id } });

    // Students still see revision 1 while the copy is in review.
    expect((await db.lesson.findUniqueOrThrow({ where: { id } })).title).toBe("Solving linear equations");

    const result = await publishFlow("LESSON", copy.id, editor, reviewer);
    expect(result).toMatchObject({ id, revision: 2, changed: true, mergedDraftId: copy.id });

    const live = await db.lesson.findUniqueOrThrow({ where: { id }, include: { topics: true } });
    expect(live).toMatchObject({ revision: 2, status: "PUBLISHED", title: "Solving linear equations (revised)", approvedById: reviewer.userId });
    expect(live.topics.map((t) => t.topicId).sort()).toEqual([c.topics[0]?.id, secondTopic.id].sort());
    expect(await db.lesson.findUnique({ where: { id: copy.id } })).toBeNull();

    const rev2 = await db.contentRevision.findUniqueOrThrow({ where: { entityType_entityId_revision: { entityType: "LESSON", entityId: id, revision: 2 } } });
    expect(rev2.contentHash).not.toBe(rev1.contentHash);
    expect((rev2.snapshot as { lesson: { title: string } }).lesson.title).toBe("Solving linear equations (revised)");
    // Revision 1 is immutable.
    expect((await db.contentRevision.findUniqueOrThrow({ where: { id: rev1.id } })).contentHash).toBe(rev1.contentHash);
  });

  it("discards an unchanged draft copy without a new revision", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);
    await publishFlow("LESSON", id, editor, reviewer);
    const copy = await db.$transaction((tx) => createDraftCopyForEdit(tx, "LESSON", id, editor));

    const result = await publishFlow("LESSON", copy.id, editor, reviewer);
    expect(result).toMatchObject({ id, revision: 1, changed: false, revisionId: null });
    expect(await db.lesson.findUnique({ where: { id: copy.id } })).toBeNull();
    expect(await db.contentRevision.count({ where: { entityType: "LESSON", entityId: id } })).toBe(1);
  });

  it("archives published content and refuses archiving while a draft copy is pending", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);
    await publishFlow("LESSON", id, editor, reviewer);
    const copy = await db.$transaction((tx) => createDraftCopyForEdit(tx, "LESSON", id, editor));
    await expect(db.$transaction((tx) => archive(tx, "LESSON", id, reviewer))).rejects.toMatchObject({ code: "CONFLICT" });
    await db.$transaction((tx) => discardDraftCopy(tx, "LESSON", copy.id, reviewer));
    await expect(db.$transaction((tx) => archive(tx, "LESSON", id, reviewer))).resolves.toMatchObject({ status: "ARCHIVED", revision: 1 });
  });

  it("restores archived content to draft at revision + 1, then it goes through review and publication again", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);
    await publishFlow("LESSON", id, editor, reviewer);
    await expect(db.$transaction((tx) => reopenArchived(tx, "LESSON", id, editor))).rejects.toMatchObject({ code: "CONFLICT" });
    await db.$transaction((tx) => archive(tx, "LESSON", id, reviewer));

    await expect(db.$transaction((tx) => reopenArchived(tx, "LESSON", id, editor))).resolves.toEqual({ id, status: "DRAFT", revision: 2 });
    const reopened = await db.lesson.findUniqueOrThrow({ where: { id } });
    expect(reopened).toMatchObject({ status: "DRAFT", revision: 2, archivedAt: null, createdById: editor.userId, approvedById: null, approvedAt: null });
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityId: id, action: "content.reopen" } });
    expect(audit).toMatchObject({ actorUserId: editor.userId, metadata: { fromRevision: 1, revision: 2 } });

    await db.lesson.update({ where: { id }, data: { summary: "Restored and revised summary." } });
    await expect(publishFlow("LESSON", id, editor, reviewer)).resolves.toMatchObject({ id, revision: 2, changed: true });
    expect(await db.contentRevision.count({ where: { entityType: "LESSON", entityId: id } })).toBe(2);
  });

  it("blocks review of lessons with invalid LaTeX or unknown blocks", async () => {
    const c = await chain();
    const { editor } = await staff();
    const id = await draftLesson(c, editor.userId, { body: "Broken maths $\\frac{1}{$ here.\n\n:::warning\nNot a block.\n:::" });
    const error = await db.$transaction((tx) => submitForReview(tx, "LESSON", id, editor)).catch((e: unknown) => e);
    expect(error).toMatchObject({ code: "VALIDATION" });
    expect(Object.keys((error as { fieldErrors: Record<string, string[]> }).fieldErrors)).toContain("body");
  });

  it("sends content back to draft with reviewer notes", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);
    await db.$transaction(async (tx) => {
      await submitForReview(tx, "LESSON", id, editor);
      await requestChanges(tx, "LESSON", id, reviewer, "Add a second worked example.");
    });
    const lesson = await db.lesson.findUniqueOrThrow({ where: { id } });
    expect(lesson).toMatchObject({ status: "DRAFT", reviewNotes: "Add a second worked example.", approvedById: null });
  });
});

describe("publish: AI drafts and four-eyes", () => {
  it("AI-generated content is inserted as DRAFT and is never published without a human approver", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();

    await expect(
      db.lesson.create({
        data: { subjectId: c.subject.id, title: "AI", slug: uniqueSlug("ai"), body: "x", aiGenerated: true, status: "IN_REVIEW", copyrightStatus: "OWNED" },
      }),
    ).rejects.toThrow(/must be inserted as DRAFT/);

    const id = await draftLesson(c, editor.userId, { aiGenerated: true });
    await db.$transaction((tx) => submitForReview(tx, "LESSON", id, editor));
    await expect(db.$transaction((tx) => approve(tx, "LESSON", id, SYSTEM))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(db.$transaction((tx) => publish(tx, "LESSON", id, reviewer))).rejects.toMatchObject({ code: "CONFLICT" });
    // The database itself refuses an AI row approved without a human approver.
    await expect(db.lesson.update({ where: { id }, data: { status: "APPROVED", approvedAt: new Date() } })).rejects.toThrow(/Lesson_ai_approval_chk/);

    const result = await db.$transaction(async (tx) => {
      await approve(tx, "LESSON", id, reviewer);
      return publish(tx, "LESSON", id, reviewer);
    });
    expect(result.changed).toBe(true);
    const lesson = await db.lesson.findUniqueOrThrow({ where: { id } });
    expect(lesson).toMatchObject({ status: "PUBLISHED", aiGenerated: true, approvedById: reviewer.userId });
    const revision = await db.contentRevision.findUniqueOrThrow({ where: { entityType_entityId_revision: { entityType: "LESSON", entityId: id, revision: 1 } } });
    expect(revision.aiGenerated).toBe(true);
    // aiGenerated can never be cleared.
    await expect(db.lesson.update({ where: { id }, data: { aiGenerated: false } })).rejects.toThrow(/cannot be cleared/);
  });

  it("enforces four-eyes when app.four_eyes is on", async () => {
    const c = await chain();
    const { editor, reviewer } = await staff();
    const id = await draftLesson(c, editor.userId);
    await db.$transaction((tx) => submitForReview(tx, "LESSON", id, editor));

    const fourEyes = async <T>(fn: (tx: Tx) => Promise<T>): Promise<T> =>
      db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT set_config('app.four_eyes', 'on', true)`;
        return fn(tx);
      });

    await expect(fourEyes((tx) => approve(tx, "LESSON", id, editor))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(
      fourEyes((tx) => tx.lesson.update({ where: { id }, data: { status: "APPROVED", approvedById: editor.userId, approvedAt: new Date() } })),
    ).rejects.toThrow(/four-eyes/);
    await expect(fourEyes((tx) => approve(tx, "LESSON", id, reviewer))).resolves.toMatchObject({ status: "APPROVED" });
    // Without the setting (development default) the author may approve their own work.
    const own = await draftLesson(c, editor.userId);
    await expect(
      db.$transaction(async (tx) => {
        await submitForReview(tx, "LESSON", own, editor);
        return approve(tx, "LESSON", own, editor);
      }),
    ).resolves.toMatchObject({ status: "APPROVED" });
  });
});

describe("publish: questions", () => {
  it("merges MCQ options by key and keeps option ids stable", async () => {
    const { editor, reviewer } = await staff();
    const created = await createQuestion("MULTIPLE_CHOICE");
    const before = await db.questionOption.findMany({ where: { questionId: created.id }, orderBy: { key: "asc" } });

    const copy = await db.$transaction((tx) => createDraftCopyForEdit(tx, "QUESTION", created.id, editor));
    await db.questionOption.update({ where: { questionId_key: { questionId: copy.id, key: "B" } }, data: { content: "$x = -3$" } });
    await db.questionOption.create({ data: { questionId: copy.id, key: "E", content: "$x = 1$", sortOrder: 4 } });
    await db.question.update({ where: { id: copy.id }, data: { explanation: "Revised explanation." } });

    const result = await publishFlow("QUESTION", copy.id, editor, reviewer);
    expect(result).toMatchObject({ id: created.id, revision: 2, changed: true });

    const after = await db.questionOption.findMany({ where: { questionId: created.id }, orderBy: { key: "asc" } });
    expect(after.map((o) => o.key)).toEqual(["A", "B", "C", "D", "E"]);
    expect(after.find((o) => o.key === "A")?.id).toBe(before.find((o) => o.key === "A")?.id);
    expect(after.find((o) => o.key === "B")?.content).toBe("$x = -3$");
    const live = await db.question.findUniqueOrThrow({ where: { id: created.id } });
    expect(live).toMatchObject({ revision: 2, explanation: "Revised explanation.", status: "PUBLISHED" });
    expect(await db.contentRevision.count({ where: { entityType: "QUESTION", entityId: created.id } })).toBe(2);
  });

  it("merges structured parts: changed parts get a new revision, removed parts are archived", async () => {
    const { editor, reviewer } = await staff();
    const created = await createQuestion("STRUCTURED");
    const [partA, partB] = created.partIds;
    if (!partA || !partB) throw new Error("expected two parts");

    const copy = await db.$transaction((tx) => createDraftCopyForEdit(tx, "QUESTION", created.id, editor));
    const draftParts = await db.question.findMany({ where: { parentId: copy.id }, orderBy: { partOrder: "asc" } });
    expect(draftParts.map((p) => p.draftOfId)).toEqual([partA, partB]);
    const [draftA, draftB] = draftParts;
    if (!draftA || !draftB) throw new Error("expected two draft parts");
    await db.question.update({ where: { id: draftA.id }, data: { stem: "Write an expression, in $x$, for the area." } });
    await db.question.delete({ where: { id: draftB.id } });
    await db.question.update({ where: { id: copy.id }, data: { marks: 1 } });

    const result = await publishFlow("QUESTION", copy.id, editor, reviewer);
    expect(result).toMatchObject({ id: created.id, revision: 2, changed: true });
    const parts = await db.question.findMany({ where: { parentId: created.id }, orderBy: { partOrder: "asc" } });
    expect(parts.find((p) => p.id === partA)).toMatchObject({ status: "PUBLISHED", revision: 2, stem: "Write an expression, in $x$, for the area." });
    expect(parts.find((p) => p.id === partB)).toMatchObject({ status: "ARCHIVED" });
    expect(await db.question.count({ where: { draftOfId: { in: [copy.id, draftA.id] } } })).toBe(0);
  });

  it("reopens an archived structured question with the parts archived with it, not parts an earlier merge removed", async () => {
    const { editor, reviewer } = await staff();
    const created = await createQuestion("STRUCTURED");
    const [partA, partB] = created.partIds;
    if (!partA || !partB) throw new Error("expected two parts");
    // Revision 2 drops part B (archived by the merge), then the whole question is archived.
    const copy = await db.$transaction((tx) => createDraftCopyForEdit(tx, "QUESTION", created.id, editor));
    const draftB = await db.question.findFirstOrThrow({ where: { parentId: copy.id, draftOfId: partB } });
    await db.question.delete({ where: { id: draftB.id } });
    await db.question.update({ where: { id: copy.id }, data: { marks: 1 } }); // the root's marks = the remaining part's
    await publishFlow("QUESTION", copy.id, editor, reviewer);
    await db.$transaction((tx) => archive(tx, "QUESTION", created.id, reviewer));
    const archivedA = await db.question.findUniqueOrThrow({ where: { id: partA } });
    expect(archivedA.status).toBe("ARCHIVED");

    await expect(db.$transaction((tx) => reopenArchived(tx, "QUESTION", partA, editor))).rejects.toMatchObject({ code: "BAD_REQUEST" });
    const result = await db.$transaction((tx) => reopenArchived(tx, "QUESTION", created.id, editor));
    expect(result).toEqual({ id: created.id, status: "DRAFT", revision: 3 });
    const parts = await db.question.findMany({ where: { parentId: created.id } });
    expect(parts.find((p) => p.id === partA)).toMatchObject({ status: "DRAFT", revision: archivedA.revision + 1, archivedAt: null });
    expect(parts.find((p) => p.id === partB)).toMatchObject({ status: "ARCHIVED" });

    await expect(publishFlow("QUESTION", created.id, editor, reviewer)).resolves.toMatchObject({ id: created.id, revision: 3 });
    const republished = await db.question.findMany({ where: { parentId: created.id }, select: { id: true, status: true } });
    expect(Object.fromEntries(republished.map((p) => [p.id, p.status]))).toEqual({ [partA]: "PUBLISHED", [partB]: "ARCHIVED" });
  });

  it("first-publishes a draft structured question and mirrors part statuses", async () => {
    const { editor, reviewer } = await staff();
    const created = await createQuestion("STRUCTURED", { status: "DRAFT" });
    await db.question.updateMany({ where: { id: { in: [created.id, ...created.partIds] } }, data: { createdById: editor.userId } });
    const result = await publishFlow("QUESTION", created.id, editor, reviewer);
    expect(result).toMatchObject({ id: created.id, revision: 1, changed: true });
    const parts = await db.question.findMany({ where: { parentId: created.id } });
    expect(parts.every((p) => p.status === "PUBLISHED" && p.publishedAt !== null)).toBe(true);
  });

  it("refuses to submit a question that cannot be marked", async () => {
    const { editor } = await staff();
    const created = await createQuestion("MULTIPLE_CHOICE", { status: "DRAFT" });
    await db.questionOption.updateMany({ where: { questionId: created.id }, data: { isCorrect: false } });
    await expect(db.$transaction((tx) => submitForReview(tx, "QUESTION", created.id, editor))).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("publish: assessments", () => {
  it("checks fixed totals and publishes sections with items, then merges a revised copy", async () => {
    const { editor, reviewer } = await staff();
    const context = await createQuestionContext();
    const q1 = await createQuestion("TRUE_FALSE", { context });
    const q2 = await createQuestion("NUMERICAL", { context });
    const assessment = await db.assessment.create({
      data: {
        kind: "TOPIC_TEST",
        subjectId: context.subjectId,
        title: "Test topic test",
        totalMarks: 5,
        copyrightStatus: "OWNED",
        createdById: editor.userId,
        sections: { create: { title: "Section A", items: { create: [{ questionId: q1.id, sortOrder: 0 }, { questionId: q2.id, sortOrder: 1 }] } } },
      },
      select: { id: true },
    });
    const error = await db.$transaction((tx) => submitForReview(tx, "ASSESSMENT", assessment.id, editor)).catch((e: unknown) => e);
    expect(error).toMatchObject({ code: "VALIDATION" });
    expect((error as { fieldErrors: Record<string, string[]> }).fieldErrors.totalMarks).toBeDefined();

    await db.assessment.update({ where: { id: assessment.id }, data: { totalMarks: 2 } });
    await publishFlow("ASSESSMENT", assessment.id, editor, reviewer);

    const copy = await db.$transaction((tx) => createDraftCopyForEdit(tx, "ASSESSMENT", assessment.id, editor));
    const section = await db.assessmentSection.findFirstOrThrow({ where: { assessmentId: copy.id } });
    await db.assessmentItem.deleteMany({ where: { sectionId: section.id, questionId: q2.id } });
    await db.assessment.update({ where: { id: copy.id }, data: { totalMarks: 1, title: "Test topic test (short)" } });
    const merged = await publishFlow("ASSESSMENT", copy.id, editor, reviewer);
    expect(merged).toMatchObject({ id: assessment.id, revision: 2, changed: true });
    const items = await db.assessmentItem.findMany({ where: { section: { assessmentId: assessment.id } } });
    expect(items.map((i) => i.questionId)).toEqual([q1.id]);
  });
});

describe("buildSnapshot / contentProjection (pure)", () => {
  const lesson = { id: "l1", title: "T", body: "B", bodyHtml: "<p>B</p>", renderVersion: 1, contentHash: "x", status: "PUBLISHED", revision: 1 };

  it("is deterministic and ignores render caches and property order", () => {
    const a = buildSnapshot("LESSON", { lesson, topics: [{ topicId: "b", isPrimary: false, sortOrder: 0 }, { topicId: "a", isPrimary: true, sortOrder: 0 }], objectives: ["o2", "o1"], questions: [] });
    const b = buildSnapshot("LESSON", {
      lesson: { revision: 1, status: "PUBLISHED", body: "B", title: "T", id: "l1", bodyHtml: "<p>other cache</p>" },
      topics: [{ topicId: "a", isPrimary: true, sortOrder: 0 }, { topicId: "b", isPrimary: false, sortOrder: 0 }],
      objectives: ["o1", "o2"],
      questions: [],
    });
    expect(a.contentHash).toBe(b.contentHash);
    expect(a.snapshot.lesson).not.toHaveProperty("bodyHtml");
  });

  it("projects content without ids or workflow columns", () => {
    const base = { lesson: { ...lesson, subjectId: "s", kind: "LESSON" }, topics: [], objectives: [], questions: [] };
    const otherRow = { lesson: { ...base.lesson, id: "l2", status: "DRAFT", revision: 2 }, topics: [], objectives: [], questions: [] };
    expect(contentProjection("LESSON", base)).toBe(contentProjection("LESSON", otherRow));
    expect(contentProjection("LESSON", base)).not.toBe(contentProjection("LESSON", { ...otherRow, lesson: { ...otherRow.lesson, title: "Changed" } }));
  });

  it("reports unmarkable question definitions", () => {
    const issues = collectContentIssues("QUESTION", {
      question: { id: "q", partOrder: 0, type: "MULTIPLE_CHOICE", markingMode: "AUTO", marks: 1, stem: "Pick", payload: null, answerSpec: null, options: [{ key: "A", content: "a", isCorrect: false, sortOrder: 0 }] },
      topics: [],
      objectives: [],
    });
    expect(Object.keys(issues).length).toBeGreaterThan(0);
  });
});
