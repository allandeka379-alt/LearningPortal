import { describe, expect, it } from "vitest";
import { localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { checkLimit, hasEntitlement } from "@/server/billing/entitlements";
import { attemptXp, getXpRules } from "@/server/gamification/service";
import { isAppError } from "@/server/lib/errors";
import {
  correctResponse,
  createAttemptWithAnswers,
  createLearner,
  createLearningSetup,
  learnerActor,
  wrongResponse,
  type LearningSetup,
} from "../../../tests/factories/learning";
import { answerAndMark, getAttemptForStudent, saveResponse, startAttempt, submitAttempt } from "./index";

function definitionOf(setup: LearningSetup, questionId: string) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

async function expectAppError(promise: Promise<unknown>, code: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error)).toBe(true);
    expect((error as { code: string }).code).toBe(code);
    return;
  }
  throw new Error(`expected AppError ${code}`);
}

describe("practice sessions (§10, §11)", () => {
  it("runs a full session: start → answer each → mastery, stats, activity, XP once even if retried", async () => {
    const setup = await createLearningSetup({ questionsPerLeaf: 3 });
    const { userId, actor } = await createLearner();

    const started = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 5, difficulty: "MEDIUM" });
    expect(started.resumed).toBe(false);
    const attempt = started.attempt;
    expect(attempt.mode).toBe("PRACTICE");
    expect(attempt.feedback).toBe("IMMEDIATE");
    expect(attempt.questions).toHaveLength(5);
    expect(attempt.questions.every((q) => q.result === null && q.question !== null)).toBe(true);
    // Auto-enrolled on the CURRENT version.
    const enrollment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId: setup.subjectId } } });
    expect(enrollment.syllabusId).toBe(setup.syllabusId);

    const touched = new Set<string>();
    let last = null as Awaited<ReturnType<typeof answerAndMark>> | null;
    for (const slot of attempt.questions) {
      const questionId = slot.question?.id as string;
      const feedback = await answerAndMark(actor, attempt.id, slot.position, correctResponse(definitionOf(setup, questionId)), { timeSpentSeconds: 20 });
      expect(feedback.isCorrect).toBe(true);
      expect(feedback.status).toBe("AUTO_MARKED");
      expect(feedback.marksAwarded).toBe(feedback.marksAvailable);
      expect(feedback.correctAnswerDisplay).toBeTruthy();
      expect(feedback.explanationHtml).toContain("Original explanation");
      expect(feedback.topic?.id).toBeTruthy();
      expect(feedback.mastery).not.toBeNull();
      expect(feedback.studyLesson?.href).toMatch(/^\/app\/lessons\//);
      touched.add(feedback.topic?.id as string);
      last = feedback;
    }
    expect(last?.attemptCompleted).toBe(true);
    expect(last?.result?.score.percentage).toBe(100);
    expect(last?.result?.status).toBe("MARKED");

    // Mastery: one leaf row per touched topic, evidence = answers in it.
    const rows = await db.topicMastery.findMany({ where: { userId, topicId: { in: [...touched] } } });
    expect(rows).toHaveLength(touched.size);
    expect(rows.reduce((sum, r) => sum + r.questionsAttempted, 0)).toBe(5);
    for (const row of rows) {
      expect(row.isLeaf).toBe(true);
      expect(row.score).toBeGreaterThan(40);
      expect(row.questionsCorrect).toBe(row.questionsAttempted);
    }
    // Ancestor (TOPIC) rollup rows exist for the touched leaves' parents.
    const parents = await db.topicMastery.findMany({ where: { userId, topicKind: "TOPIC" } });
    expect(parents.length).toBeGreaterThan(0);
    expect(parents.every((p) => !p.isLeaf && p.questionsAttempted > 0)).toBe(true);

    // XP: once per attempt, Σ per-answer XP.
    const rules = await getXpRules();
    const expectedXp = attemptXp("OTHER", Array.from({ length: 5 }, () => ({ result: "CORRECT" as const, difficulty: 3 })), rules);
    const xp = await db.xpEvent.findMany({ where: { userId, reason: "PRACTICE_COMPLETED", sourceId: attempt.id } });
    expect(xp).toHaveLength(1);
    expect(xp[0]?.amount).toBe(expectedXp);
    const statsBefore = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(statsBefore.totalQuestionsAttempted).toBe(5);
    expect(statsBefore.currentStreak).toBe(1);

    // Retries change nothing.
    const replay = await answerAndMark(actor, attempt.id, 1, correctResponse(definitionOf(setup, attempt.questions[0]?.question?.id as string)));
    expect(replay.alreadyAnswered).toBe(true);
    const resubmit = await submitAttempt(actor, attempt.id);
    expect(resubmit.score.percentage).toBe(100);
    expect(await db.xpEvent.count({ where: { userId, sourceId: attempt.id } })).toBe(1);
    const statsAfter = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(statsAfter.totalXp).toBe(statsBefore.totalXp);
    expect(statsAfter.totalQuestionsAttempted).toBe(5);
    const rowsAfter = await db.topicMastery.findMany({ where: { userId, topicId: { in: [...touched] } } });
    expect(rowsAfter.reduce((sum, r) => sum + r.questionsAttempted, 0)).toBe(5);

    // Daily activity and question stats.
    const today = localDateString(new Date(), "Africa/Harare");
    const day = await db.dailyActivity.findUniqueOrThrow({ where: { userId_date: { userId, date: new Date(`${today}T00:00:00.000Z`) } } });
    expect(day.questionsAttempted).toBe(5);
    expect(day.questionsCorrect).toBe(5);
    expect(day.dailyGoalMet).toBe(true);
    const questionIds = attempt.questions.map((q) => q.question?.id as string);
    const stats = await db.questionStats.findMany({ where: { questionId: { in: questionIds } } });
    expect(stats.reduce((sum, s) => sum + s.answeredCount, 0)).toBe(5);
    expect(stats.reduce((sum, s) => sum + s.presentedCount, 0)).toBe(5);

    // Subject rollup.
    const progress = await db.subjectProgress.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId: setup.subjectId } } });
    expect(progress.questionsAttempted).toBe(5);
    expect(progress.questionsCorrect).toBe(5);
    expect(progress.topicsTotal).toBe(setup.leafTopicIds.length);
  });

  it("wrong answers lower mastery into WEAK and recommend the lesson (§11)", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 4 });
    const { userId, actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 4 });
    let feedback = null as Awaited<ReturnType<typeof answerAndMark>> | null;
    for (const slot of attempt.questions) {
      feedback = await answerAndMark(actor, attempt.id, slot.position, wrongResponse(definitionOf(setup, slot.question?.id as string)));
      expect(feedback.isCorrect).toBe(false);
      expect(feedback.marksAwarded).toBe(0);
    }
    const leaf = setup.leafTopicIds[0] as string;
    const row = await db.topicMastery.findUniqueOrThrow({ where: { userId_topicId: { userId, topicId: leaf } } });
    expect(row.band).toBe("WEAK");
    expect(row.score).toBeLessThan(40);
    expect(row.consecutiveIncorrect).toBe(4);
    expect(row.remediationStartedAt).not.toBeNull();
    expect(row.currentDifficulty).toBeLessThan(3);
    expect(feedback?.result?.score.percentage).toBe(0);
    expect(feedback?.result?.recommendations.some((r) => r.kind === "LESSON" && r.lessonId !== null)).toBe(true);
  });

  it("saveResponse then submit marks the saved answers; unanswered questions are excluded from the practice score", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 2 });
    const { actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 4 });
    const first = attempt.questions[0];
    const second = attempt.questions[1];
    await saveResponse(actor, attempt.id, first?.position as number, correctResponse(definitionOf(setup, first?.question?.id as string)));
    await saveResponse(actor, attempt.id, second?.position as number, wrongResponse(definitionOf(setup, second?.question?.id as string)));
    const result = await submitAttempt(actor, attempt.id);
    expect(result.status).toBe("MARKED");
    expect(result.score.answeredCount).toBe(2);
    expect(result.score.correctCount).toBe(1);
    expect(result.score.percentage).toBe(50);
    const view = await getAttemptForStudent(actor, attempt.id);
    expect(view.questions.filter((q) => q.result?.status === "UNANSWERED")).toHaveLength(2);
    expect(view.result?.score.percentage).toBe(50);
  });

  it("never shows another student's attempt", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const owner = await createLearner();
    const other = await createLearner();
    const { attempt } = await startAttempt(owner.actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 });
    const slot = attempt.questions[0];
    const response = correctResponse(definitionOf(setup, slot?.question?.id as string));
    await expectAppError(getAttemptForStudent(other.actor, attempt.id), "NOT_FOUND");
    await expectAppError(answerAndMark(other.actor, attempt.id, 1, response), "NOT_FOUND");
    await expectAppError(saveResponse(other.actor, attempt.id, 1, response), "NOT_FOUND");
    await expectAppError(submitAttempt(other.actor, attempt.id), "NOT_FOUND");
    // Non-students cannot use the engine at all.
    await expectAppError(getAttemptForStudent(learnerActor(owner.userId, { roles: ["PARENT"] }), attempt.id), "FORBIDDEN");
    // The owner's attempt is untouched.
    const view = await getAttemptForStudent(owner.actor, attempt.id);
    expect(view.answeredCount).toBe(0);
  });

  it("enforces the plan's daily practice allowance (§31 FREE: limited questions)", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 3 });
    // Default plan only (whatever the shared FREE plan allows): read the effective limit first.
    const { userId, actor } = await createLearner({ features: null });
    const check = await checkLimit(actor, "practiceQuestionsPerDay", 0, { subjectId: setup.subjectId });
    const question = setup.questions[0];
    if (!question) throw new Error("no question");
    if (check.limit === null) {
      // An unlimited default plan cannot be limit-tested; the allowance arithmetic is covered by billing's tests.
      expect(await hasEntitlement(actor, "practice.unlimited")).toBe(true);
      return;
    }
    if (check.limit === 0) {
      await expectAppError(startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId }), "ENTITLEMENT_REQUIRED");
      return;
    }
    // Use all but one question of today's allowance, then a session is capped at the one remaining question.
    await createAttemptWithAnswers({ userId, subjectId: setup.subjectId, questionId: question.id, topicId: question.topicId, answered: check.limit - 1 });
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 3 });
    expect(attempt.questions).toHaveLength(1);
    const slot = attempt.questions[0];
    await answerAndMark(actor, attempt.id, 1, correctResponse(definitionOf(setup, slot?.question?.id as string)));
    // Allowance used up: no new session today.
    await expectAppError(startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId }), "QUOTA_EXCEEDED");
  });

  it("resumes with the same idempotency key instead of starting twice", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 3 });
    const { actor } = await createLearner();
    const key = `tap-${Date.now()}-abc`;
    const first = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2, idempotencyKey: key });
    const second = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2, idempotencyKey: key });
    expect(second.resumed).toBe(true);
    expect(second.attempt.id).toBe(first.attempt.id);
  });
});

describe("hints (§10, §14)", () => {
  it("reveals hints one at a time and records them on the answer", async () => {
    const { revealHint } = await import("./index");
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const { actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 1 });
    const slot = attempt.questions[0];
    expect(slot?.question?.hintCount).toBe(1);
    const hint = await revealHint(actor, attempt.id, 1);
    expect(hint).toMatchObject({ hintNumber: 1, totalHints: 1 });
    expect(hint.html).toContain("Original hint");
    await expectAppError(revealHint(actor, attempt.id, 1), "CONFLICT");
    const feedback = await answerAndMark(actor, attempt.id, 1, correctResponse(definitionOf(setup, slot?.question?.id as string)));
    expect(feedback.isCorrect).toBe(true);
    const row = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId: attempt.id, position: 1 } } });
    expect(row.hintsUsed).toBe(1);
  });
});
