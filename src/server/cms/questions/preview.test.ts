import { describe, expect, it } from "vitest";
import { getQuestionPreview, tryQuestion } from "./preview";
import { createQuestion } from "./service";
import { chain, mcqDocument, staffActor, structuredDocument, studentActor } from "./testing";

describe("question “Try it” preview", () => {
  it("renders the student view of a draft without any answer data", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const { id } = await createQuestion(editor, mcqDocument(c));
    const preview = await getQuestionPreview(editor, id);
    expect(preview.problem).toBeNull();
    expect(preview.question?.interaction.type).toBe("MULTIPLE_CHOICE");
    const json = JSON.stringify(preview.question);
    expect(json).not.toContain("isCorrect");
    expect(json).not.toContain("rationale");
    expect(json).not.toContain("Divide both sides");
  });

  it("marks sample answers with the real marking engine", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const { id } = await createQuestion(editor, mcqDocument(c));

    const right = await tryQuestion(editor, { questionId: id, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } });
    expect(right.detail).toMatchObject({ outcome: "MARKED", marksAwarded: 1, maxMarks: 1, isCorrect: true });
    expect(right.feedback).toMatchObject({ outcome: "correct", status: "AUTO_MARKED", marksAwarded: 1 });
    expect(right.feedback.reveal?.options.find((o) => o.key === "A")?.isCorrect).toBe(true);

    const wrong = await tryQuestion(editor, { questionId: id, response: { type: "MULTIPLE_CHOICE", optionKeys: ["B"] } });
    expect(wrong.feedback.outcome).toBe("incorrect");
    expect(wrong.feedback.reveal?.explanationHtml).toContain("Divide both sides");

    const mismatched = await tryQuestion(editor, { questionId: id, response: { type: "TRUE_FALSE", value: true } });
    expect(mismatched.detail.flags).toContain("RESPONSE_TYPE_MISMATCH");
    expect((await tryQuestion(editor, { questionId: id, response: null })).detail.outcome).toBe("UNANSWERED");
  });

  it("marks structured questions part by part", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const { id } = await createQuestion(editor, structuredDocument(c));
    const preview = await getQuestionPreview(editor, id);
    const [partA, partB] = preview.question?.parts ?? [];
    const result = await tryQuestion(editor, {
      questionId: id,
      response: { type: "STRUCTURED", parts: [{ partId: partA?.id, text: "x(x + 3)" }, { partId: partB?.id, value: "4" }] },
    });
    expect(result.detail).toMatchObject({ marksAwarded: 1, maxMarks: 3 });
    expect(result.detail.parts.map((p) => [p.label, p.awarded, p.max])).toEqual([
      ["(a)", 1, 1],
      ["(b)", 0, 2],
    ]);
    expect(result.feedback.outcome).toBe("partial");
  });

  it("shows open responses as pending AI marking and incomplete drafts as not previewable", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const essay = await createQuestion(
      editor,
      mcqDocument(c, {
        type: "ESSAY",
        markingMode: "AI_ASSISTED",
        marks: 4,
        options: [],
        payload: { wordLimit: { max: 200 } },
        answerSpec: { markScheme: { points: [{ id: "P1", description: "States the idea", marks: 4 }] } },
      }),
    );
    const pending = await tryQuestion(editor, { questionId: essay.id, response: { type: "ESSAY", text: "An original answer." } });
    expect(pending.detail).toMatchObject({ outcome: "PENDING_AI", pendingMarks: 4 });
    expect(pending.feedback.outcome).toBe("pending");

    const broken = await createQuestion(editor, mcqDocument(c, { type: "MATCHING", options: [], payload: { left: [] }, answerSpec: null }));
    expect((await getQuestionPreview(editor, broken.id)).problem).toMatch(/complete question/);
  });

  it("is staff-only", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const { id } = await createQuestion(editor, mcqDocument(c));
    await expect(tryQuestion(await studentActor(), { questionId: id, response: null })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
