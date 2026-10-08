import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { attemptXp, getXpRules } from "@/server/gamification/service";
import { isAppError } from "@/server/lib/errors";
import { correctResponse, createAssessment, createLearner, createLearningSetup, wrongResponse, type LearningSetup } from "../../../tests/factories/learning";
import { createQuestion } from "../../../tests/factories/questions";
import {
  aiMarkingConfigured,
  answerAndMark,
  getAttemptForStudent,
  readAttemptAnalysis,
  recordMarkingDecision,
  recordSelfAssessment,
  revealHint,
  saveResponse,
  startAttempt,
  submitAttempt,
} from "./index";

/**
 * Integration: the attempt engine's student-facing read model (hints across reloads, save versions, finished papers),
 * the band change stored on the attempt (§11 summary), results routing of the "marked" notification, and the
 * self-assessment fallback when AI marking is not configured (ARCHITECTURE §6.5).
 */

function definitionOf(setup: LearningSetup, questionId: string | undefined) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${String(questionId)} not in setup`);
  return question.definition;
}

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : "UNEXPECTED";
  }
}

async function essayFor(setup: LearningSetup, topicId: string) {
  return createQuestion("ESSAY", {
    context: { subjectId: setup.subjectId, syllabusId: setup.syllabusId, topicIds: setup.leafTopicIds },
    topicId,
    accessTier: "FREE",
  });
}

describe("attempt read model (§10, §13)", () => {
  it("keeps revealed hints across reloads, and reports save versions and finished papers", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const { actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 });
    const [first, second] = attempt.questions;
    if (!first || !second) throw new Error("expected two questions");
    expect(first).toMatchObject({ hintsUsed: 0, revealedHints: [], responseVersion: 0 });

    const hint = await revealHint(actor, attempt.id, first.position);
    const reloaded = await getAttemptForStudent(actor, attempt.id);
    const slot = reloaded.questions.find((q) => q.position === first.position);
    expect(slot?.hintsUsed).toBe(1);
    expect(slot?.revealedHints).toEqual([hint.html]);
    expect(slot?.revealedHints[0]).toContain("Original hint");
    // Hints of other questions stay hidden.
    expect(reloaded.questions.find((q) => q.position === second.position)?.revealedHints).toEqual([]);

    // Exam: the save counter and when each paper was finished.
    const [q1, q2] = setup.questions;
    if (!q1 || !q2) throw new Error("expected two questions");
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      timeLimitSeconds: 3600,
      sections: [
        { title: "Paper 1", questionIds: [q1.id], timeLimitSeconds: 1800 },
        { title: "Paper 2", questionIds: [q2.id], timeLimitSeconds: 1800 },
      ],
    });
    const exam = (await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id })).attempt;
    expect(exam.extraTimePercent).toBeNull();
    const paper1 = exam.questions.find((q) => q.sectionNumber === 1);
    if (!paper1) throw new Error("no paper 1 question");
    await saveResponse(actor, exam.id, paper1.position, wrongResponse(q1.definition));
    await saveResponse(actor, exam.id, paper1.position, correctResponse(q1.definition));
    let view = await getAttemptForStudent(actor, exam.id);
    expect(view.questions.find((q) => q.position === paper1.position)?.responseVersion).toBe(2);
    expect(view.sections.find((s) => s.sectionNumber === 1)).toMatchObject({ submittedAt: null });
    expect(view.sections.find((s) => s.sectionNumber === 1)?.startedAt).toBeInstanceOf(Date);

    await submitAttempt(actor, exam.id);
    view = await getAttemptForStudent(actor, exam.id);
    expect(view.sections.find((s) => s.sectionNumber === 1)?.submittedAt).toBeInstanceOf(Date);
    // Paper 2 never started.
    expect(view.sections.find((s) => s.sectionNumber === 2)?.submittedAt).toBeNull();
  });

  it("gives each answer the topic band before it, and stores the session's band change per topic on the attempt", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const { userId, actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 4 });
    const previous = new Map<string, { score: number; band: string }>();
    let last = null as Awaited<ReturnType<typeof answerAndMark>> | null;
    for (const [index, slot] of attempt.questions.entries()) {
      const feedback = await answerAndMark(actor, attempt.id, slot.position, correctResponse(definitionOf(setup, slot.question?.id)));
      const topicId = feedback.topic?.id as string;
      expect(feedback.mastery?.before ?? null).toEqual(previous.get(topicId) ?? null);
      previous.set(topicId, { score: feedback.mastery?.score as number, band: feedback.mastery?.band as string });
      if (index === 0) {
        // Recorded while the session is open, so the summary does not depend on the browser.
        const open = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attempt.id }, select: { status: true, analysis: true } });
        expect(open.status).toBe("IN_PROGRESS");
        expect(readAttemptAnalysis(open.analysis)?.mastery).toEqual([{ topicId, before: null, after: feedback.mastery?.band }]);
      }
      last = feedback;
    }
    expect(last?.attemptCompleted).toBe(true);
    const mastery = last?.result?.analysis?.mastery ?? [];
    expect(mastery).toHaveLength(previous.size);
    const rows = await db.topicMastery.findMany({ where: { userId, topicId: { in: [...previous.keys()] } }, select: { topicId: true, band: true } });
    for (const row of rows) expect(mastery.find((m) => m.topicId === row.topicId)).toEqual({ topicId: row.topicId, before: null, after: row.band });
    // The scored results are complete around it.
    expect(last?.result?.analysis?.byTopic.length).toBeGreaterThan(0);
  });
});

describe("results routing of the 'marked' notification", () => {
  it("links a practice session to its summary and a mock exam to its results", async () => {
    const setup = await createLearningSetup({ type: "ESSAY", topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const { userId, actor } = await createLearner();
    const practice = (await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 1 })).attempt;
    const feedback = await answerAndMark(actor, practice.id, 1, { type: "ESSAY", text: "Renewable energy suits rural clinics because…" });
    expect(feedback.status).toBe("PENDING");
    expect(feedback.attemptCompleted).toBe(true);
    await recordMarkingDecision({ attemptId: practice.id, position: 1, source: "AI", resultingStatus: "AI_MARKED", marksAwarded: 5, aiModel: "test-model", promptVersion: "t1", confidence: 0.9 });
    const practiceNote = await db.notification.findFirstOrThrow({ where: { userId, dedupeKey: `attempt-marked:${practice.id}` } });
    expect(practiceNote.data).toMatchObject({ href: `/app/practice/${practice.id}/summary` });
    expect(practiceNote.body).toBe("Your practice session results are ready.");

    const essay = setup.questions[0];
    if (!essay) throw new Error("no essay");
    const mock = await createAssessment({ subjectId: setup.subjectId, syllabusId: setup.syllabusId, kind: "MOCK_EXAM", title: "Essay mock", timeLimitSeconds: 3600, sections: [{ questionIds: [essay.id] }] });
    const exam = (await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id })).attempt;
    await saveResponse(actor, exam.id, 1, { type: "ESSAY", text: "A balanced answer." });
    await submitAttempt(actor, exam.id);
    await recordMarkingDecision({ attemptId: exam.id, position: 1, source: "AI", resultingStatus: "AI_MARKED", marksAwarded: 6, aiModel: "test-model", promptVersion: "t1", confidence: 0.9 });
    const examNote = await db.notification.findFirstOrThrow({ where: { userId, dedupeKey: `attempt-marked:${exam.id}` } });
    expect(examNote.data).toMatchObject({ href: `/app/exams/attempt/${exam.id}/results` });
    expect(examNote.body).toBe("Your Essay mock results are ready.");
  });

  it("links a diagnostic to its report (§52), not the exam results page", async () => {
    const setup = await createLearningSetup({ type: "ESSAY", topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const { userId, actor } = await createLearner();
    const diagnostic = (await startAttempt(actor, { mode: "DIAGNOSTIC", subjectId: setup.subjectId, count: 1 })).attempt;
    const slot = diagnostic.questions[0];
    if (!slot) throw new Error("expected a diagnostic question");
    await saveResponse(actor, diagnostic.id, slot.position, { type: "ESSAY", text: "Wind and solar both suit the region." });
    expect((await submitAttempt(actor, diagnostic.id)).status).toBe("AWAITING_MARKING");
    // Nothing is announced until the attempt is fully marked.
    expect(await db.notification.count({ where: { userId, dedupeKey: `attempt-marked:${diagnostic.id}` } })).toBe(0);

    await recordMarkingDecision({ attemptId: diagnostic.id, position: slot.position, source: "AI", resultingStatus: "AI_MARKED", marksAwarded: 4, aiModel: "test-model", promptVersion: "t1", confidence: 0.9 });
    const note = await db.notification.findFirstOrThrow({ where: { userId, dedupeKey: `attempt-marked:${diagnostic.id}` } });
    expect(note.data).toMatchObject({ href: `/app/diagnostic/${diagnostic.id}/report`, entityType: "AssessmentAttempt", entityId: diagnostic.id });
    expect(note.body).toBe("Your diagnostic results are ready.");
  });
});

describe("self-assessment when AI marking is not configured (ARCHITECTURE §6.5)", () => {
  it("lets the student mark their own essay on a closed mock against the mark scheme", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const mcq = setup.questions[0];
    if (!mcq) throw new Error("no question");
    const essay = await essayFor(setup, mcq.topicId);
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      timeLimitSeconds: 3600,
      sections: [{ questionIds: [mcq.id, essay.id] }],
    });
    const { userId, actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
    const positions = new Map(attempt.questions.map((q) => [q.question?.id, q.position]));
    const essayPosition = positions.get(essay.id) as number;
    await saveResponse(actor, attempt.id, positions.get(mcq.id) as number, correctResponse(mcq.definition));
    await saveResponse(actor, attempt.id, essayPosition, { type: "ESSAY", text: "Solar power is clean, but batteries are expensive." });

    // A closed-book exam that is still open reveals nothing and cannot be self-marked.
    expect(await codeOf(recordSelfAssessment(actor, attempt.id, essayPosition, { pointIds: ["P1"] }))).toBe("BAD_REQUEST");
    expect((await submitAttempt(actor, attempt.id)).status).toBe("AWAITING_MARKING");

    const view = await getAttemptForStudent(actor, attempt.id);
    const essaySlot = view.questions.find((q) => q.position === essayPosition);
    if (aiMarkingConfigured()) {
      // With an API key the worker marks it: no self-marking.
      expect(essaySlot?.result?.selfAssessable).toBe(false);
      expect(await codeOf(recordSelfAssessment(actor, attempt.id, essayPosition, { pointIds: ["P1"] }))).toBe("BAD_REQUEST");
      return;
    }
    expect(essaySlot?.result).toMatchObject({ status: "PENDING", selfAssessable: true });
    expect(essaySlot?.result?.reveal?.markScheme?.points).toHaveLength(3);
    expect(view.questions.find((q) => q.position !== essayPosition)?.result?.selfAssessable).toBe(false);

    // Never someone else's answer.
    const other = await createLearner();
    expect(await codeOf(recordSelfAssessment(other.actor, attempt.id, essayPosition, { pointIds: ["P1"] }))).toBe("NOT_FOUND");

    const xpBefore = await db.xpEvent.findMany({ where: { userId, sourceId: attempt.id }, select: { amount: true } });
    // The server sums the ticked points itself (unknown ids ignored; a claimed total is never trusted).
    const decision = await recordSelfAssessment(actor, attempt.id, essayPosition, { pointIds: ["P1", "P2", "NOPE"], marks: 10 });
    expect(decision).toMatchObject({ markingStatus: "SELF_ASSESSED", marksAwarded: 6, attemptStatus: "MARKED", pendingReviewCount: 0 });
    const log = await db.questionAttemptMarking.findMany({ where: { attemptId: attempt.id, position: essayPosition } });
    expect(log.map((l) => [l.source, l.resultingStatus, l.marksAwarded])).toEqual([["SELF", "SELF_ASSESSED", 6]]);
    const marked = await getAttemptForStudent(actor, attempt.id);
    expect(marked.result?.score).toMatchObject({ marksAwarded: 7, totalMarks: 11, isProvisional: false });
    expect(marked.questions.find((q) => q.position === essayPosition)?.result).toMatchObject({ status: "SELF_ASSESSED", selfAssessable: false });
    // The notification opens the results; XP is never re-awarded.
    const note = await db.notification.findFirstOrThrow({ where: { userId, dedupeKey: `attempt-marked:${attempt.id}` } });
    expect(note.data).toMatchObject({ href: `/app/exams/attempt/${attempt.id}/results` });
    expect(await db.xpEvent.findMany({ where: { userId, sourceId: attempt.id }, select: { amount: true } })).toEqual(xpBefore);

    expect(await codeOf(recordSelfAssessment(actor, attempt.id, essayPosition, { pointIds: ["P3"] }))).toBe("CONFLICT");
    // Auto-marked answers are not self-marked.
    expect(await codeOf(recordSelfAssessment(actor, attempt.id, positions.get(mcq.id) as number, { marks: 1 }))).toBe("CONFLICT");
  });

  it("earns the effort XP of a self-marked answer, never the correctness bonus", async () => {
    if (aiMarkingConfigured()) return;
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const mcq = setup.questions[0];
    if (!mcq) throw new Error("no question");
    const essay = await essayFor(setup, mcq.topicId);
    const { userId, actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 });
    const essaySlot = attempt.questions.find((q) => q.question?.id === essay.id);
    const mcqSlot = attempt.questions.find((q) => q.question?.id === mcq.id);
    if (!essaySlot || !mcqSlot) throw new Error("expected both questions in the session");

    const pending = await answerAndMark(actor, attempt.id, essaySlot.position, { type: "ESSAY", text: "My essay." });
    expect(pending).toMatchObject({ status: "PENDING", selfAssessable: true, attemptCompleted: false });
    // Full marks, self-awarded, while the session is still open.
    expect(await recordSelfAssessment(actor, attempt.id, essaySlot.position, { pointIds: ["P1", "P2", "P3"] })).toMatchObject({ marksAwarded: 10, attemptStatus: "IN_PROGRESS" });
    const done = await answerAndMark(actor, attempt.id, mcqSlot.position, correctResponse(mcq.definition));
    expect(done.attemptCompleted).toBe(true);

    const rules = await getXpRules();
    const expected = attemptXp(
      "OTHER",
      [
        { result: "CORRECT", difficulty: 3 },
        { result: "INCORRECT", difficulty: 3 },
      ],
      rules,
    );
    const events = await db.xpEvent.findMany({ where: { userId, sourceId: attempt.id }, select: { amount: true } });
    expect(events).toEqual([{ amount: expected }]);
    // Full marks would have been worth more had they been official.
    expect(attemptXp("OTHER", [{ result: "CORRECT", difficulty: 3 }, { result: "CORRECT", difficulty: 3 }], rules)).toBeGreaterThan(expected);
  });
});
