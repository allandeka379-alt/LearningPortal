import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createUser } from "../../../../tests/factories/index";
import { createQuestion } from "../../../../tests/factories/questions";
import { auditRowsFor, contentChain, parentActor, readyLesson, staffActor, studentActor, teacherActor } from "../review/testing";
import { createContentFlag, flagSourceFor, getFlagDetail, listFlags, rejectFlag, resolveFlag, triageFlag } from "./service";

/** Integration tests for content quality flags (§42): raising, de-duplication, triage, resolve / reject, audit. */

async function publishedQuestion() {
  return createQuestion("STRUCTURED");
}

describe("createContentFlag", () => {
  it("lets a student report a published question once per reason (repeats merge), stored against the root", async () => {
    const question = await publishedQuestion();
    const student = await studentActor();
    const first = await createContentFlag(student, { entityType: "QUESTION", entityId: question.id, reason: "INCORRECT_ANSWER", details: "Option B is also right." });
    expect(first).toMatchObject({ created: true, status: "OPEN" });
    const repeat = await createContentFlag(student, { entityType: "QUESTION", entityId: question.id, reason: "INCORRECT_ANSWER" });
    expect(repeat).toEqual({ id: first.id, created: false, status: "OPEN" });
    const other = await createContentFlag(student, { entityType: "QUESTION", entityId: question.id, reason: "AMBIGUOUS" });
    expect(other.created).toBe(true);

    const row = await db.contentFlag.findUniqueOrThrow({ where: { id: first.id } });
    expect(row).toMatchObject({ entityType: "QUESTION", entityId: question.id, source: "STUDENT", revision: 1, flaggedById: student.userId, details: "Option B is also right." });

    // A part is reported against its root question, with the part in the context.
    const partId = question.partIds[0];
    if (partId) {
      const part = await createContentFlag(student, { entityType: "QUESTION", entityId: partId, reason: "TYPO_OR_FORMATTING" });
      const stored = await db.contentFlag.findUniqueOrThrow({ where: { id: part.id } });
      expect(stored).toMatchObject({ entityId: question.id, context: { partId } });
    }
  });

  it("refuses drafts for students, personal cards, unknown items and roles without content.flag", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const draft = await readyLesson(editor, chain);
    const [student, parent, teacher] = await Promise.all([studentActor(), parentActor(), teacherActor()]);
    await expect(createContentFlag(student, { entityType: "LESSON", entityId: draft.id, reason: "OTHER" })).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(createContentFlag(parent, { entityType: "LESSON", entityId: draft.id, reason: "OTHER" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createContentFlag(student, { entityType: "SYLLABUS", entityId: draft.id, reason: "OTHER" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createContentFlag(student, { entityType: "LESSON", entityId: draft.id, reason: "BORING" })).rejects.toMatchObject({ code: "VALIDATION" });

    const owner = await createUser({ roles: ["STUDENT"] });
    const personal = await db.flashcard.create({
      data: { subjectId: chain.subject.id, ownerUserId: owner.user.id, cardType: "FACT", front: "Mine", back: "Only mine", status: "PUBLISHED", publishedAt: new Date() },
      select: { id: true },
    });
    await expect(createContentFlag(teacher, { entityType: "FLASHCARD", entityId: personal.id, reason: "OTHER" })).rejects.toMatchObject({ code: "NOT_FOUND" });

    // Staff may flag a draft; the flag is an EDITOR flag.
    const staffFlag = await createContentFlag(editor, { entityType: "LESSON", entityId: draft.id, reason: "WRONG_TOPIC" });
    expect((await db.contentFlag.findUniqueOrThrow({ where: { id: staffFlag.id } })).source).toBe("EDITOR");
    const teacherFlag = await createContentFlag(teacher, { entityType: "QUESTION", entityId: (await publishedQuestion()).id, reason: "WRONG_DIFFICULTY" });
    expect((await db.contentFlag.findUniqueOrThrow({ where: { id: teacherFlag.id } })).source).toBe("TEACHER");
  });

  it("derives the source from roles", () => {
    expect(flagSourceFor(["STUDENT"])).toBe("STUDENT");
    expect(flagSourceFor(["TEACHER", "PARENT"])).toBe("TEACHER");
    expect(flagSourceFor(["TEACHER", "CONTENT_EDITOR"])).toBe("EDITOR");
  });
});

describe("flag triage", () => {
  it("triages, lists, resolves with a note and audits; closed flags cannot change", async () => {
    const question = await publishedQuestion();
    const student = await studentActor();
    const editor = await staffActor();
    const flag = await createContentFlag(student, { entityType: "QUESTION", entityId: question.id, reason: "INCORRECT_MARKING", details: "Marked wrong." });

    await expect(triageFlag(editor, { flagId: flag.id })).resolves.toEqual({ id: flag.id, status: "IN_PROGRESS" });
    const mine = await listFlags(editor, { assigned: "me" });
    expect(mine.items.map((i) => i.id)).toEqual([flag.id]);
    expect(mine.items[0]).toMatchObject({ source: "STUDENT", assignedToMe: true, target: { exists: true, status: "PUBLISHED", editorHref: `/admin/questions/${question.id}` } });
    expect((await listFlags(editor, { assigned: "me", status: "RESOLVED" })).items).toEqual([]);

    await expect(resolveFlag(editor, { flagId: flag.id, resolution: "" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(resolveFlag(editor, { flagId: flag.id, resolution: "Mark scheme corrected in revision 2." })).resolves.toMatchObject({ status: "RESOLVED", resolutionRevision: null });
    await expect(rejectFlag(editor, { flagId: flag.id, resolution: "Not a problem." })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(triageFlag(editor, { flagId: flag.id })).rejects.toMatchObject({ code: "CONFLICT" });

    const detail = await getFlagDetail(editor, flag.id);
    expect(detail).toMatchObject({ status: "RESOLVED", resolution: "Mark scheme corrected in revision 2.", resolvedBy: expect.any(String), details: "Marked wrong." });
    // Reporters are shown by role only: no reporter name or id in the detail.
    expect(JSON.stringify(detail)).not.toContain(student.userId);

    const audit = await auditRowsFor(flag.id);
    expect(audit.map((r) => (r.metadata as { operation?: string }).operation)).toEqual(["content_flag.triage", "content_flag.resolve"]);
    expect(audit[1]).toMatchObject({ actorUserId: editor.userId, reason: "Mark scheme corrected in revision 2." });
  });

  it("rejects a flag with a reason, lists related reports, and is staff-only", async () => {
    const question = await publishedQuestion();
    const [s1, s2] = await Promise.all([studentActor(), studentActor()]);
    const editor = await staffActor();
    const a = await createContentFlag(s1, { entityType: "QUESTION", entityId: question.id, reason: "AMBIGUOUS" });
    const b = await createContentFlag(s2, { entityType: "QUESTION", entityId: question.id, reason: "AMBIGUOUS" });
    await expect(rejectFlag(editor, { flagId: a.id, resolution: "The wording is precise." })).resolves.toMatchObject({ status: "REJECTED" });
    const detail = await getFlagDetail(editor, b.id);
    expect(detail.related.map((r) => [r.id, r.status])).toEqual([[a.id, "REJECTED"]]);

    const teacher = await teacherActor();
    await expect(listFlags(teacher, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(triageFlag(s1, { flagId: b.id })).rejects.toMatchObject({ code: "FORBIDDEN" });
    try {
      await getFlagDetail(editor, "0199a000-0000-7000-8000-000000000000");
      throw new Error("expected NOT_FOUND");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("NOT_FOUND");
    }
  });
});
