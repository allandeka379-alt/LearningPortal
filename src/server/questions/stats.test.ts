import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createQuestion } from "../../../tests/factories/questions";
import { updateQuestionStats } from "./stats";

describe("updateQuestionStats (integration)", () => {
  it("creates the row on first use and counts presentations, review and unanswered slots", async () => {
    const q = await createQuestion("TRUE_FALSE");
    expect(await updateQuestionStats(db, q.id, { kind: "presented" })).toMatchObject({ presentedCount: 1, answeredCount: 0, facility: null });
    await updateQuestionStats(db, q.id, { kind: "presented" });
    await updateQuestionStats(db, q.id, { kind: "unanswered" });
    const counters = await updateQuestionStats(db, q.id, { kind: "needs_review" });
    expect(counters).toMatchObject({ presentedCount: 2, unansweredCount: 1, needsReviewCount: 1 });
  });

  it("accumulates answers: correct/partial counts, calibration, sums and derived rates", async () => {
    const q = await createQuestion("NUMERICAL");
    await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 2, marksAvailable: 2, isRepeat: false, hintsUsed: 1, timeSpentSeconds: 30 });
    await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 1, marksAvailable: 2, isRepeat: false, timeSpentSeconds: 50 });
    const last = await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 0, marksAvailable: 2, isRepeat: true, timeSpentSeconds: 20 });
    expect(last).toMatchObject({
      answeredCount: 3,
      correctCount: 1,
      partialCount: 1,
      calibrationCount: 2,
      calibrationCorrectCount: 1,
      marksAwardedSum: 3,
      marksAvailableSum: 6,
    });
    expect(last.facility).toBeCloseTo(0.5);
    expect(last.correctRate).toBeCloseTo(1 / 3);
    expect(last.avgTimeSeconds).toBeCloseTo(100 / 3);
    const row = await db.questionStats.findUniqueOrThrow({ where: { questionId: q.id } });
    expect(row.hintsUsedSum).toBe(1);
    expect(row.lastAnsweredAt).not.toBeNull();
  });

  it("merges MCQ distractor counts by option key", async () => {
    const q = await createQuestion("MULTIPLE_CHOICE");
    await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 1, marksAvailable: 1, isRepeat: false, optionKeys: ["A"] });
    await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 0, marksAvailable: 1, isRepeat: false, optionKeys: ["B", "B"] });
    const last = await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 0, marksAvailable: 1, isRepeat: false, optionKeys: ["B", "C"] });
    expect(last.optionCounts).toEqual({ A: 1, B: 2, C: 1 });
  });

  it("is atomic under concurrent updates", async () => {
    const q = await createQuestion("SHORT_ANSWER");
    await Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        db.$transaction((tx) => updateQuestionStats(tx, q.id, { kind: "answered", marksAwarded: i % 2, marksAvailable: 1, isRepeat: false, optionKeys: [] })),
      ),
    );
    const row = await db.questionStats.findUniqueOrThrow({ where: { questionId: q.id } });
    expect(row).toMatchObject({ answeredCount: 12, correctCount: 6, calibrationCount: 12 });
    expect(Number(row.marksAwardedSum)).toBe(6);
  });

  it("clamps marks so the table's CHECKs always hold", async () => {
    const q = await createQuestion("SHORT_ANSWER");
    const counters = await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 99, marksAvailable: 2, isRepeat: false });
    expect(counters).toMatchObject({ marksAwardedSum: 2, marksAvailableSum: 2, correctCount: 1, facility: 1 });
    const negative = await updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: -5, marksAvailable: 2, isRepeat: false });
    expect(negative).toMatchObject({ marksAwardedSum: 2, marksAvailableSum: 4 });
  });

  it("validates its input", async () => {
    const q = await createQuestion("SHORT_ANSWER");
    await expect(updateQuestionStats(db, "nope", { kind: "presented" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: Number.NaN, marksAvailable: 1, isRepeat: false })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(updateQuestionStats(db, q.id, { kind: "answered", marksAwarded: 1, marksAvailable: 1, isRepeat: false, optionKeys: ["A'; DROP TABLE x;--"] })).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await expect(updateQuestionStats(db, q.id, { kind: "bogus" } as never)).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
