import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { LearnerActor } from "@/server/attempts";
import {
  correctResponse,
  createAssessment,
  createEnrollment,
  createLearner,
  createLearningSetup,
  wrongResponse,
  type LearningSetup,
} from "../../../../tests/factories/learning";

/**
 * Integration: exam mode through the Server Actions and the exams service against the test database (catalogue →
 * instructions → start → autosave + flag → submit → results; late saves rejected; per-paper clocks of a multi-paper
 * mock; TIME_UP submission checked against the server clock). The auth guard is mocked to "sign in" a fixture
 * learner; everything below it (exams service, attempt engine, marking, scoring, analysis) is real.
 */

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

const auth = vi.hoisted(() => ({ actor: null as LearnerActor | null }));

vi.mock("@/server/auth/guards", () => ({
  requireOnboardedStudentForAction: async () => {
    if (!auth.actor) throw new (await import("@/server/lib/errors")).AppError("UNAUTHENTICATED");
    return auth.actor;
  },
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const actions = await import("./actions");
const service = await import("@/server/exams/service");
const { db } = await import("@/server/db");
const { isAppError } = await import("@/server/lib/errors");

const MINUTE = 60_000;

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

async function expectAppError(promise: Promise<unknown>, code: string): Promise<string> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error)).toBe(true);
    expect((error as { code: string }).code).toBe(code);
    return (error as Error).message;
  }
  throw new Error(`expected AppError ${code}`);
}

function form(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

function definitionOf(setup: LearningSetup, questionId: string | undefined) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

async function signedInLearner(setup: LearningSetup) {
  const learner = await createLearner();
  await createEnrollment(learner.userId, setup);
  auth.actor = learner.actor;
  return learner;
}

beforeEach(() => {
  auth.actor = null;
});

describe("exam mode (§12, §13)", () => {
  it("lists, starts, autosaves, flags, submits and analyses a timed topic test", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const firstLeaf = setup.leafTopicIds[0] as string;
    const secondLeaf = setup.leafTopicIds[1] as string;
    const test = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "TOPIC_TEST",
      title: `Topic test ${randomUUID().slice(0, 8)}`,
      timeLimitSeconds: 1800,
      accessTier: "FREE",
      topicIds: [setup.topicIds[0] as string],
      sections: [{ title: "Questions", questionIds: setup.questions.map((q) => q.id) }],
    });
    const { actor } = await signedInLearner(setup);

    // Catalogue: listed with access; the topic deep link finds it from a subtopic of its topic, not from another topic.
    const catalogue = await service.getExamCatalogue(actor);
    const listed = catalogue.groups.find((g) => g.kind === "TOPIC_TEST")?.items.find((i) => i.id === test.id);
    expect(listed).toMatchObject({ questionCount: 4, totalMarks: 4, timeLimitSeconds: 1800, attemptsUsed: 0, access: { status: "AVAILABLE" } });
    const byTopic = await service.getExamCatalogue(actor, { topicId: firstLeaf });
    expect(byTopic.topic?.id).toBe(firstLeaf);
    expect(byTopic.groups.flatMap((g) => g.items).map((i) => i.id)).toContain(test.id);
    const otherTopic = await service.getExamCatalogue(actor, { topicId: secondLeaf });
    expect(otherTopic.groups.flatMap((g) => g.items).map((i) => i.id)).not.toContain(test.id);
    expect((await service.getExamCatalogue(actor, { topicId: randomUUID() })).topicNotFound).toBe(true);

    // Instructions.
    const instructions = await service.getExamInstructions(actor, test.id);
    expect(instructions).toMatchObject({ kind: "TOPIC_TEST", questionCount: 4, totalMarks: 4, timeLimitSeconds: 1800, immediateFeedback: false });
    expect(instructions.instructionsHtml).toContain("Answer every question.");
    expect(instructions.access.status).toBe("AVAILABLE");

    // Start (form post) → the exam room. The same idempotency key never starts a second attempt.
    const key = randomUUID();
    const location = await redirectOf(actions.startExamAction(null, form({ assessmentId: test.id, idempotencyKey: key })));
    expect(location).toMatch(/^\/app\/exams\/attempt\/[0-9a-f-]{36}$/);
    const attemptId = location.split("/").pop() as string;
    expect(await redirectOf(actions.startExamAction(null, form({ assessmentId: test.id, idempotencyKey: key })))).toBe(location);
    expect((await service.getExamCatalogue(actor)).inProgress.map((i) => i.attemptId)).toContain(attemptId);

    const loaded = await service.getExamRoom(actor, attemptId);
    if (loaded.kind !== "ROOM") throw new Error("expected the exam room");
    const room = loaded.room;
    expect(room.questions).toHaveLength(4);
    expect(room.clock.open).toBe(true);
    expect((room.clock.deadlineMs ?? 0) - room.clock.serverNowMs).toBeGreaterThan(1790_000);
    expect(room.sections).toHaveLength(1);
    // Answer-safe: no answer keys or explanations in what the client receives.
    const json = JSON.stringify(room);
    expect(json).not.toContain("isCorrect");
    expect(json).not.toContain("Original explanation written for tests.");

    const [q1, q2, q3] = room.questions;
    if (!q1 || !q2 || !q3) throw new Error("expected questions");
    const def = (position: number) => definitionOf(setup, room.questions.find((q) => q.position === position)?.question?.id);

    const saved1 = await actions.saveExamResponseAction({
      attemptId,
      position: q1.position,
      response: correctResponse(def(q1.position)) as never,
      responseVersion: q1.responseVersion + 1,
      clientSavedAtMs: Date.now(),
      timeSpentSeconds: 40,
    });
    expect(saved1).toMatchObject({ ok: true, data: { saved: true, answered: true, responseVersion: 1 } });
    // Version 2 then a stale replay of version 1: the newer answer is kept.
    await actions.saveExamResponseAction({ attemptId, position: q2.position, response: wrongResponse(def(q2.position)) as never, responseVersion: 2 });
    const stale = await actions.saveExamResponseAction({ attemptId, position: q2.position, response: correctResponse(def(q2.position)) as never, responseVersion: 1 });
    expect(stale).toMatchObject({ ok: true, data: { stale: true, saved: false } });
    // Flag-only save.
    const flagged = await actions.saveExamResponseAction({ attemptId, position: q3.position, flagged: true });
    expect(flagged).toMatchObject({ ok: true, data: { flagged: true, answered: false } });
    // An answer of the wrong shape is refused.
    expect(await actions.saveExamResponseAction({ attemptId, position: q1.position, response: { type: "MULTIPLE_CHOICE" } as never })).toMatchObject({
      ok: false,
      error: { code: "VALIDATION" },
    });

    const resumed = await service.getExamRoom(actor, attemptId);
    if (resumed.kind !== "ROOM") throw new Error("expected the exam room");
    expect(resumed.room.questions.find((q) => q.position === q1.position)).toMatchObject({ responseVersion: 1, response: correctResponse(def(q1.position)) });
    expect(resumed.room.questions.find((q) => q.position === q2.position)?.responseVersion).toBe(2);
    expect(resumed.room.questions.find((q) => q.position === q3.position)).toMatchObject({ flagged: true, response: null });
    expect(resumed.room.startPosition).toBe(q3.position);

    // Late saves: rejected after deadline + 30 s, unless made before the deadline (offline outbox, late sync).
    const deadline = room.clock.deadlineMs as number;
    await expectAppError(
      service.saveExamResponse(actor, { attemptId, position: 4, response: correctResponse(def(4)) as never }, new Date(deadline + 31_000)),
      "CONFLICT",
    );
    // The client's countdown ran ahead of the server: TIME_UP before the deadline does not submit.
    const early = await actions.submitExamAction({ attemptId, reason: "TIME_UP" });
    expect(early).toMatchObject({ ok: true, data: { submitted: false, clock: { open: true, deadlineMs: deadline } } });

    // Submit → results.
    const submitted = await actions.submitExamAction({ attemptId, reason: "STUDENT" });
    expect(submitted).toEqual({ ok: true, data: { submitted: true, resultsHref: `/app/exams/attempt/${attemptId}/results` } });
    // Saving after submission is refused; the room now redirects to the results.
    expect(await actions.saveExamResponseAction({ attemptId, position: 4, response: correctResponse(def(4)) as never })).toMatchObject({
      ok: false,
      error: { code: "CONFLICT" },
    });
    expect(await service.getExamRoom(actor, attemptId)).toEqual({ kind: "REDIRECT", href: `/app/exams/attempt/${attemptId}/results` });
    expect(await actions.syncExamClockAction(attemptId)).toMatchObject({ ok: true, data: { open: false } });

    const loadedResults = await service.getExamResults(actor, attemptId);
    if (loadedResults.kind !== "RESULTS") throw new Error("expected results");
    const results = loadedResults.results;
    expect(results).toMatchObject({ status: "MARKED", submitReason: "STUDENT", nothingAnswered: false, pendingMarks: 0 });
    expect(results.score).toMatchObject({ marksAwarded: 1, totalMarks: 4, percentage: 25, answeredCount: 2, correctCount: 1, questionCount: 4 });
    expect(results.grade).toMatchObject({ grade: "U", isPass: false, isEstimate: true });
    expect(results.grade?.disclaimer).toBeTruthy();
    expect(results.topics).toHaveLength(2);
    expect(results.topics.map((t) => t.marksAvailable)).toEqual([2, 2]);
    // Two marks per topic is not enough evidence to call a topic strong or weak (scoring.ts minimums): no labels.
    expect(results.strongAreas).toEqual([]);
    expect(results.weakAreas).toEqual([]);
    expect(results.recommendations.every((r) => r.href.startsWith("/app/"))).toBe(true);
    expect(results.review.map((r) => r.feedback?.outcome)).toEqual(
      room.questions.map((q) => (q.position === q1.position ? "correct" : q.position === q2.position ? "incorrect" : "unanswered")),
    );
    expect(results.review.find((r) => r.position === q1.position)?.feedback?.reveal?.explanationHtml).toContain("Original explanation written for tests.");
    expect(results.retakeHref).toBe(`/app/exams/${test.id}`);

    const history = await service.listExamHistory(actor, { limit: 1 });
    expect(history.items[0]).toMatchObject({ attemptId, percentage: 25, gradeEstimate: "U", href: `/app/exams/attempt/${attemptId}/results` });
    const instructionsAfter = await service.getExamInstructions(actor, test.id);
    expect(instructionsAfter.attemptsUsed).toBe(1);
    expect(instructionsAfter.previousAttempts.map((a) => a.attemptId)).toEqual([attemptId]);
  });

  it("runs a multi-paper mock with one paper clock at a time and submits when time is up on the server", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const [a, b, c, d] = setup.questions;
    if (!a || !b || !c || !d) throw new Error("expected 4 questions");
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      title: "Two-paper mock (test)",
      sections: [
        { title: "Paper 1", questionIds: [a.id, b.id], timeLimitSeconds: 600 },
        { title: "Paper 2", questionIds: [c.id, d.id], timeLimitSeconds: 900 },
      ],
    });
    const { actor } = await signedInLearner(setup);
    const t0 = new Date(Date.now() - 2 * 60 * MINUTE);
    const at = (minutes: number) => new Date(t0.getTime() + minutes * MINUTE);

    const started = await service.startExam(actor, { assessmentId: mock.id }, t0);
    expect(started.href).toBe(`/app/exams/attempt/${started.attemptId}`);
    const attemptId = started.attemptId;
    const loaded = await service.getExamRoom(actor, attemptId, at(0.5));
    if (loaded.kind !== "ROOM") throw new Error("expected the exam room");
    expect(loaded.room.clock.deadlineMs).toBeNull();
    expect(loaded.room.sections.map((s) => [s.title, s.timeLimitSeconds, s.startedAtMs, s.positions.length])).toEqual([
      ["Paper 1", 600, null, 2],
      ["Paper 2", 900, null, 2],
    ]);
    const position = (questionId: string) => loaded.room.questions.find((q) => q.question?.id === questionId)?.position as number;

    const paper1 = await service.startExamSection(actor, { attemptId, sectionNumber: 1 }, at(1));
    expect(paper1.sections[0]).toMatchObject({ startedAtMs: at(1).getTime(), deadlineMs: at(11).getTime() });
    // One paper at a time.
    expect(await expectAppError(service.startExamSection(actor, { attemptId, sectionNumber: 2 }, at(2)), "CONFLICT")).toBe(
      "Finish Paper 1 before starting another paper.",
    );
    await service.saveExamResponse(actor, { attemptId, position: position(a.id), response: correctResponse(a.definition) as never }, at(3));
    // Finishing Paper 1 early locks its answers.
    const finished = await service.finishExamSection(actor, { attemptId, sectionNumber: 1 }, at(4));
    expect(finished.sections[0]?.finishedAtMs).toBe(at(4).getTime());
    await expectAppError(
      service.saveExamResponse(actor, { attemptId, position: position(b.id), response: correctResponse(b.definition) as never }, at(5)),
      "CONFLICT",
    );
    await service.startExamSection(actor, { attemptId, sectionNumber: 2 }, at(6));
    await service.saveExamResponse(actor, { attemptId, position: position(c.id), response: wrongResponse(c.definition) as never }, at(7));
    // Paper 2 is still running: a TIME_UP submit is not accepted yet.
    expect(await service.submitExam(actor, { attemptId, reason: "TIME_UP" }, at(8))).toMatchObject({ submitted: false });
    // After Paper 2's deadline the server agrees: the exam closes with reason TIME_EXPIRED.
    const timeUp = await service.submitExam(actor, { attemptId, reason: "TIME_UP" }, new Date(at(21).getTime() + 1_000));
    expect(timeUp).toEqual({ submitted: true, resultsHref: `/app/exams/attempt/${attemptId}/results` });
    const row = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    expect(row).toMatchObject({ status: "MARKED", submitReason: "TIME_EXPIRED", marksAwarded: 1, totalMarks: 4 });

    const loadedResults = await service.getExamResults(actor, attemptId);
    if (loadedResults.kind !== "RESULTS") throw new Error("expected results");
    expect(loadedResults.results.sections).toEqual([
      { sectionNumber: 1, title: "Paper 1", marksAwarded: 1, marks: 2 },
      { sectionNumber: 2, title: "Paper 2", marksAwarded: 0, marks: 2 },
    ]);
    expect(loadedResults.results.submitReason).toBe("TIME_EXPIRED");
  });

  it("closes an expired attempt on the clock re-sync and reports it honestly", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const test = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "TOPIC_TEST",
      timeLimitSeconds: 1800,
      accessTier: "FREE",
      sections: [{ questionIds: setup.questions.map((q) => q.id) }],
    });
    const { actor } = await signedInLearner(setup);
    const started = await service.startExam(actor, { assessmentId: test.id }, new Date(Date.now() - 2 * 60 * MINUTE));
    // Deadline + late-sync grace passed long ago: the re-sync closes it (the auto-submit job may not have run yet).
    expect(await actions.syncExamClockAction(started.attemptId)).toMatchObject({ ok: true, data: { open: false } });
    const loaded = await service.getExamResults(actor, started.attemptId);
    if (loaded.kind !== "RESULTS") throw new Error("expected results");
    expect(loaded.results).toMatchObject({ status: "EXPIRED", nothingAnswered: true, pendingMarks: 0 });
    expect(loaded.results.review.map((r) => r.feedback?.outcome)).toEqual(["unanswered", "unanswered"]);
    expect(loaded.results.retakeHref).toBe(`/app/exams/${test.id}`);
  });

  it("refuses students who are not enrolled and other students' attempts", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const test = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "SUBJECT_TEST",
      accessTier: "FREE",
      sections: [{ questionIds: setup.questions.map((q) => q.id) }],
    });
    const outsider = await createLearner();
    auth.actor = outsider.actor;
    expect((await service.getExamInstructions(outsider.actor, test.id)).access.status).toBe("NOT_ENROLLED");
    expect(await actions.startExamAction(null, form({ assessmentId: test.id }))).toMatchObject({ ok: false, error: { code: "VALIDATION" } });

    const owner = await signedInLearner(setup);
    const location = await redirectOf(actions.startExamAction(null, form({ assessmentId: test.id })));
    const attemptId = location.split("/").pop() as string;
    auth.actor = outsider.actor;
    expect(await actions.submitExamAction({ attemptId, reason: "STUDENT" })).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    await expectAppError(service.getExamRoom(outsider.actor, attemptId), "NOT_FOUND");
    expect(owner.userId).not.toBe(outsider.userId);
  });

  it("offers written answers waiting for marking for self-marking on the results page when AI marking is not configured", async () => {
    const { aiMarkingConfigured } = await import("@/server/attempts");
    const setup = await createLearningSetup({ type: "ESSAY", topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const essay = setup.questions[0];
    if (!essay) throw new Error("no essay");
    const test = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "SUBJECT_TEST",
      accessTier: "FREE",
      sections: [{ questionIds: [essay.id] }],
    });
    const learner = await signedInLearner(setup);
    const location = await redirectOf(actions.startExamAction(null, form({ assessmentId: test.id })));
    const attemptId = location.split("/").pop() as string;
    await actions.saveExamResponseAction({ attemptId, position: 1, response: { type: "ESSAY", text: "My answer about renewable energy." } });
    expect(await actions.submitExamAction({ attemptId, reason: "STUDENT" })).toMatchObject({ ok: true });

    const loaded = await service.getExamResults(learner.actor, attemptId);
    if (loaded.kind !== "RESULTS") throw new Error("expected results");
    const item = loaded.results.review[0];
    if (aiMarkingConfigured()) {
      expect(loaded.results.selfAssessableCount).toBe(0);
      expect(item?.feedback?.selfAssessment).toBeNull();
      return;
    }
    expect(loaded.results.selfAssessableCount).toBe(1);
    expect(item?.feedback).toMatchObject({ outcome: "pending", selfAssessment: { maxMarks: 10 } });
    expect(item?.feedback?.selfAssessment?.points.map((p) => p.id)).toEqual(["P1", "P2", "P3"]);
    expect(item?.feedback?.reveal?.markScheme).not.toBeNull();

    const marked = await actions.selfAssessExamAnswerAction({ attemptId, position: 1, pointIds: ["P1", "P3"], marks: 0 });
    expect(marked).toMatchObject({ ok: true, data: { status: "SELF_ASSESSED", outcome: "partial", marksAwarded: 6, selfAssessment: null } });
    const after = await service.getExamResults(learner.actor, attemptId);
    if (after.kind !== "RESULTS") throw new Error("expected results");
    expect(after.results).toMatchObject({ status: "MARKED", selfAssessableCount: 0, pendingMarks: 0 });
    expect(after.results.score?.percentage).toBe(60);
    expect(await actions.selfAssessExamAnswerAction({ attemptId, position: 1, pointIds: ["P2"], marks: 0 })).toMatchObject({ ok: false, error: { code: "CONFLICT" } });
  });
});
