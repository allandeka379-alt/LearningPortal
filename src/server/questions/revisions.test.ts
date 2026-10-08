import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { setContentPublishContext } from "@/server/lib/db-context";
import { sha256Hex } from "@/server/lib/crypto";
import { QUESTION_TYPES } from "@/lib/questions";
import { createQuestion, createQuestionContext } from "../../../tests/factories/questions";
import { recordRevisionSnapshot } from "./revisions";
import { canonicalJson, type JsonValue } from "./snapshot";

async function snapshotOf(questionId: string, revision: number) {
  return db.contentRevision.findUniqueOrThrow({
    where: { entityType_entityId_revision: { entityType: "QUESTION", entityId: questionId, revision } },
  });
}

describe("createQuestion factory + recordRevisionSnapshot (integration)", () => {
  it.each(QUESTION_TYPES.map((t) => [t]))("publishes a valid %s with its revision snapshot", async (type) => {
    const q = await createQuestion(type);
    const row = await db.question.findUniqueOrThrow({ where: { id: q.id }, select: { status: true, revision: true, type: true } });
    expect(row).toEqual({ status: "PUBLISHED", revision: 1, type });
    const revision = await snapshotOf(q.id, 1);
    expect(revision.contentHash).toBe(sha256Hex(canonicalJson(revision.snapshot as JsonValue)));
    const snapshot = revision.snapshot as { question: { id: string; stem: string }; options: unknown[]; parts: unknown[]; topics: unknown[] };
    expect(snapshot.question.id).toBe(q.id);
    expect(snapshot.topics).toEqual([{ topicId: q.topicId, syllabusId: q.context.syllabusId, isPrimary: true }]);
    expect(snapshot.options).toHaveLength(q.definition.options.length);
    expect(snapshot.parts).toHaveLength(q.definition.parts.length);
    expect(snapshot.question).not.toHaveProperty("renderedHtml");
  });

  it("is idempotent for an identical snapshot and refuses a different one for the same revision", async () => {
    const q = await createQuestion("MULTIPLE_CHOICE");
    const again = await db.$transaction((tx) => recordRevisionSnapshot(tx, q.id, null, "retry"));
    expect(again).toMatchObject({ revision: 1, created: false });

    // isExamStyle is metadata (editable on a published row) but part of the snapshot: same revision, different content.
    await db.question.update({ where: { id: q.id }, data: { isExamStyle: true } });
    await expect(db.$transaction((tx) => recordRevisionSnapshot(tx, q.id, null, "conflict"))).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("records the next revision inside a publish merge", async () => {
    const q = await createQuestion("NUMERICAL");
    const recorded = await db.$transaction(async (tx) => {
      await setContentPublishContext(tx, q.id);
      await tx.question.update({ where: { id: q.id }, data: { stem: "Solve $2x + 5 = 15$.", revision: 2 } });
      return recordRevisionSnapshot(tx, q.id, null, "Reworded stem");
    });
    expect(recorded).toMatchObject({ revision: 2, created: true });
    const revision = await snapshotOf(q.id, 2);
    expect((revision.snapshot as { question: { stem: string } }).question.stem).toBe("Solve $2x + 5 = 15$.");
    expect(revision.changeNote).toBe("Reworded stem");
    // Revision 1 is untouched (append-only history).
    expect(((await snapshotOf(q.id, 1)).snapshot as { question: { stem: string } }).question.stem).toBe("Solve $2x + 3 = 13$.");
  });

  it("cannot commit a new published revision without its snapshot (deferred database check)", async () => {
    const q = await createQuestion("TRUE_FALSE");
    await expect(
      db.$transaction(async (tx) => {
        await setContentPublishContext(tx, q.id);
        await tx.question.update({ where: { id: q.id }, data: { stem: "Every rhombus is a square.", revision: 2 } });
      }),
    ).rejects.toThrow(/without its ContentRevision snapshot/);
  });

  it("refuses parts, drafts, unpublished and unknown questions", async () => {
    const structured = await createQuestion("STRUCTURED");
    const draft = await createQuestion("SHORT_ANSWER", { status: "DRAFT", context: structured.context });
    await expect(db.$transaction((tx) => recordRevisionSnapshot(tx, structured.partIds[0]!, null))).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(db.$transaction((tx) => recordRevisionSnapshot(tx, draft.id, null))).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(db.$transaction((tx) => recordRevisionSnapshot(tx, "01990000-0000-7000-8000-00000000dead", null))).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("snapshots structured parts with their options and nested order", async () => {
    const context = await createQuestionContext();
    const q = await createQuestion("STRUCTURED", { context });
    const snapshot = (await snapshotOf(q.id, 1)).snapshot as { parts: { id: string; partLabel: string; answerSpec: unknown }[] };
    expect(snapshot.parts.map((p) => p.partLabel)).toEqual(["(a)", "(b)"]);
    expect(snapshot.parts.map((p) => p.id)).toEqual(q.partIds);
  });
});
