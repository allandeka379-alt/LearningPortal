import { describe, expect, it } from "vitest";
import { approve, createDraftCopyForEdit, publish, submitForReview } from "@/server/content/publish";
import { db } from "@/server/db";
import { createAttemptWithAnswers, createUser } from "../../../../tests/factories/index";
import { createQuestion } from "../../../../tests/factories/questions";
import { contentChain, readyLesson, staffActor, studentActor } from "../review/testing";
import { approveContent, publishContent, submitContent } from "../review/workflow";
import { reportContentProblem } from "./report";

/** "Report a problem" from the learning UI (§42): the revision the learner saw, own attempts only, calm merging. */

/** A published MCQ at revision 2, answered by `userId` at revision 1 (position 1 of a practice attempt). */
async function questionAnsweredAtRevisionOne(userId: string) {
  const question = await createQuestion("MULTIPLE_CHOICE");
  const { attemptId } = await createAttemptWithAnswers({ userId, subjectId: question.context.subjectId, questionId: question.id, topicId: question.topicId, answered: 1 });
  const [editor, reviewer] = await Promise.all([createUser({ roles: ["CONTENT_EDITOR"] }), createUser({ roles: ["ADMIN"] })]);
  const editorActor = { kind: "user" as const, userId: editor.user.id, roles: ["CONTENT_EDITOR" as const] };
  const reviewerActor = { kind: "user" as const, userId: reviewer.user.id, roles: ["ADMIN" as const] };
  await db.$transaction(async (tx) => {
    const copy = await createDraftCopyForEdit(tx, "QUESTION", question.id, editorActor);
    await tx.question.update({ where: { id: copy.id }, data: { explanation: "A clearer explanation for revision 2." } });
    await submitForReview(tx, "QUESTION", copy.id, editorActor);
    await approve(tx, "QUESTION", copy.id, reviewerActor);
    await publish(tx, "QUESTION", copy.id, reviewerActor);
  });
  return { question, attemptId };
}

async function latestFlag(entityId: string, flaggedById: string) {
  return db.contentFlag.findFirstOrThrow({ where: { entityId, flaggedById }, orderBy: { createdAt: "desc" } });
}

describe("reportContentProblem", () => {
  it("records the revision the student answered (from their own attempt) with the attempt in the context", async () => {
    const student = await studentActor();
    const { question, attemptId } = await questionAnsweredAtRevisionOne(student.userId);
    expect((await db.question.findUniqueOrThrow({ where: { id: question.id } })).revision).toBe(2);

    await expect(
      reportContentProblem(student, { entityType: "QUESTION", entityId: question.id, reason: "INCORRECT_ANSWER", details: " Option C also works. ", attemptId, position: 1 }),
    ).resolves.toEqual({ received: true });
    const flag = await latestFlag(question.id, student.userId);
    expect(flag).toMatchObject({ source: "STUDENT", reason: "INCORRECT_ANSWER", revision: 1, details: "Option C also works.", context: { assessmentAttemptId: attemptId, position: 1, channel: "web" } });

    // A repeat while the first report is open merges into it and still gets the same calm answer.
    await expect(reportContentProblem(student, { entityType: "QUESTION", entityId: question.id, reason: "INCORRECT_ANSWER" })).resolves.toEqual({ received: true });
    expect(await db.contentFlag.count({ where: { entityId: question.id, flaggedById: student.userId } })).toBe(1);
  });

  it("ignores another learner's attempt (current revision, no attempt context)", async () => {
    const owner = await studentActor();
    const { question, attemptId } = await questionAnsweredAtRevisionOne(owner.userId);
    const other = await studentActor();
    await reportContentProblem(other, { entityType: "QUESTION", entityId: question.id, reason: "AMBIGUOUS", attemptId, position: 1 });
    const flag = await latestFlag(question.id, other.userId);
    expect(flag.revision).toBe(2);
    expect(flag.context).toEqual({ channel: "web" });
  });

  it("reports a published lesson and validates the input", async () => {
    const chain = await contentChain();
    const [editor, reviewer, student] = await Promise.all([staffActor(), staffActor(), studentActor()]);
    const lesson = await readyLesson(editor, chain);
    await submitContent(editor, { entityType: "LESSON", id: lesson.id });
    await approveContent(reviewer, { entityType: "LESSON", id: lesson.id });
    await publishContent(reviewer, { entityType: "LESSON", id: lesson.id });

    await reportContentProblem(student, { entityType: "LESSON", entityId: lesson.id, reason: "TYPO_OR_FORMATTING", details: "" });
    expect(await latestFlag(lesson.id, student.userId)).toMatchObject({ entityType: "LESSON", revision: 1, details: null, source: "STUDENT" });

    await expect(reportContentProblem(student, { entityType: "LESSON", entityId: lesson.id, reason: "BORING" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(reportContentProblem(student, { entityType: "SYLLABUS", entityId: lesson.id, reason: "OTHER" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(reportContentProblem(student, { entityType: "LESSON", entityId: lesson.id, reason: "OTHER", details: "x".repeat(2_001) })).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });
});
