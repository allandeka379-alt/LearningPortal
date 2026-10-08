import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  correctResponse,
  createAssessment,
  createEnrollment,
  createLearner,
  createLearningSetup,
  wrongResponse,
  type LearningSetup,
} from "../../../tests/factories/learning";
import type { QuestionResponse } from "@/components/questions/types";
import { startAttempt, type LearnerActor } from "@/server/attempts";
import { db } from "@/server/db";
import { saveExamResponse } from "@/server/exams/service";
import { isAppError } from "@/server/lib/errors";
import { getDiagnosticHub, getDiagnosticReport, getDiagnosticRoom, startDiagnostics, submitDiagnostic } from "./diagnostic";

/**
 * Integration: the free diagnostic (§46, §52 steps 5-7) against the test database: hub → start (generated, spread over
 * topics; or the subject's published diagnostic) → exam room without feedback → autosaved answers → submit → report
 * by topic with seeded mastery, strengths, gaps, starting topics and the study-plan link. Everything below the service
 * (attempt engine, marking, scoring, mastery) is real.
 */

async function expectAppError(promise: Promise<unknown>, code: string): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (!isAppError(error)) throw error;
    expect(error.code).toBe(code);
    return error.message;
  }
  throw new Error(`expected AppError ${code}`);
}

async function enrolledLearner(...setups: LearningSetup[]): Promise<LearnerActor> {
  const learner = await createLearner();
  for (const setup of setups) await createEnrollment(learner.userId, setup);
  return { ...learner.actor, timeZone: "Africa/Harare" };
}

describe("diagnostic", () => {
  it("runs from the hub to the report: start, answer without feedback, submit, report by topic with seeded mastery", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 2, questionsPerLeaf: 3 });
    const empty = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0 });
    const actor = await enrolledLearner(setup, empty);

    // Hub: what each diagnostic contains; a subject without questions is not available.
    const hub = await getDiagnosticHub(actor);
    expect(hub.included).toBe(true);
    const main = hub.subjects.find((s) => s.subjectId === setup.subjectId);
    expect(main).toMatchObject({ questionsAvailable: 12, plannedQuestions: 8, status: "NOT_TAKEN", openAttemptId: null, completed: null });
    expect(hub.subjects.find((s) => s.subjectId === empty.subjectId)).toMatchObject({ questionsAvailable: 0, plannedQuestions: 0 });

    // Not one of the student's subjects.
    await expectAppError(startDiagnostics(actor, { subjectIds: [randomUUID()] }), "VALIDATION");
    // Only the empty subject: nothing can start.
    expect(await expectAppError(startDiagnostics(actor, { subjectIds: [empty.subjectId] }), "NOT_FOUND")).toMatch(/aren't enough questions/);

    const started = await startDiagnostics(actor, { subjectIds: [empty.subjectId, setup.subjectId], idempotencyKey: "diagkey0001", fromOnboarding: true });
    expect(started.unavailable).toEqual([{ subjectId: empty.subjectId, name: empty.chain.subject.name }]);
    expect(started.started).toHaveLength(1);
    const attemptId = started.started[0]?.attemptId as string;
    expect(started.href).toBe(`/app/diagnostic/${attemptId}`);
    // Starting again resumes the open diagnostic instead of creating another.
    expect((await startDiagnostics(actor, { subjectIds: [setup.subjectId] })).started).toEqual([{ subjectId: setup.subjectId, attemptId, resumed: true }]);

    const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    expect(attempt).toMatchObject({ mode: "DIAGNOSTIC", status: "IN_PROGRESS", questionCount: 8, assessmentId: null, deadlineAt: null });
    expect(attempt.config).toMatchObject({ feedback: "ON_SUBMIT", origin: "ONBOARDING" });
    const slots = await db.questionAttempt.findMany({ where: { attemptId }, orderBy: { position: "asc" }, select: { position: true, questionId: true, topicId: true } });
    // Spread evenly over the four leaf topics.
    const perLeaf = new Map<string, number>();
    for (const slot of slots) perLeaf.set(slot.topicId, (perLeaf.get(slot.topicId) ?? 0) + 1);
    expect([...perLeaf.values()]).toEqual([2, 2, 2, 2]);

    expect((await getDiagnosticHub(actor)).subjects.find((s) => s.subjectId === setup.subjectId)).toMatchObject({ status: "IN_PROGRESS", openAttemptId: attemptId });
    expect(await getDiagnosticReport(actor, attemptId)).toEqual({ kind: "REDIRECT", href: `/app/diagnostic/${attemptId}` });

    // The room: every question, no answers, a subject title.
    const room = await getDiagnosticRoom(actor, attemptId);
    if (room.kind !== "ROOM") throw new Error("expected the room");
    expect(room.room.title).toBe(`${setup.chain.subject.name} diagnostic`);
    expect(room.room.questions).toHaveLength(8);
    expect(room.room.clock.deadlineMs).toBeNull();
    expect(JSON.stringify(room.room)).not.toMatch(/isCorrect|answerSpec|explanation/);

    // Answers: right on the first TOPIC's subtopics, wrong on the second's, one left blank.
    const firstTopicLeaves = new Set(setup.chain.subtopics.filter((t) => t.parentId === setup.topicIds[0]).map((t) => t.id));
    const blank = slots.find((s) => !firstTopicLeaves.has(s.topicId));
    for (const slot of slots) {
      if (slot === blank) continue;
      const definition = setup.questions.find((q) => q.id === slot.questionId)?.definition;
      if (!definition) throw new Error("question not in setup");
      const response = (firstTopicLeaves.has(slot.topicId) ? correctResponse(definition) : wrongResponse(definition)) as QuestionResponse;
      const saved = await saveExamResponse(actor, { attemptId, position: slot.position, response, responseVersion: 1 });
      expect(saved.saved).toBe(true);
    }

    const submitted = await submitDiagnostic(actor, { attemptId, reason: "STUDENT" });
    expect(submitted).toEqual({ submitted: true, resultsHref: `/app/diagnostic/${attemptId}/report` });
    expect(await getDiagnosticRoom(actor, attemptId)).toEqual({ kind: "REDIRECT", href: `/app/diagnostic/${attemptId}/report` });

    const loaded = await getDiagnosticReport(actor, attemptId);
    if (loaded.kind !== "REPORT") throw new Error("expected the report");
    const report = loaded.report;
    expect(report.score).toMatchObject({ answeredCount: 7, correctCount: 4, questionCount: 8, marksAwarded: 4, totalMarks: 8 });
    const [first, second] = setup.topicIds;
    expect(report.topics.map((t) => [t.topicId, t.questionCount, t.percent, t.finding])).toEqual([
      [first, 4, 100, "STRENGTH"],
      [second, 4, 0, "GAP"],
    ]);
    // Mastery seeded by the diagnostic on the top-level topics (rollups), weak where everything was wrong.
    expect(report.topics.every((t) => t.mastery !== null)).toBe(true);
    expect(report.topics[1]?.mastery?.band).toBe("WEAK");
    expect(report.strengths.map((t) => t.topicId)).toEqual([first]);
    expect(report.gaps.map((t) => t.topicId)).toEqual([second]);
    expect(report.notCovered).toEqual([]);
    expect(report.startingTopics[0]).toMatchObject({ topicId: second, reason: "GAP", percent: 0 });
    expect(report.startingTopics[0]?.lesson?.lessonId).toBe(setup.chain.lessons.find((l) => l.subjectId === setup.subjectId && l.title.startsWith("Topic 2"))?.id);
    expect(report.planHref).toBe(`/app/plan?subjectIds=${setup.subjectId}`);
    expect(report.hasActivePlan).toBe(false);
    expect(report.otherDiagnostics).toEqual([{ subjectId: empty.subjectId, name: empty.chain.subject.name, openAttemptId: null }]);
    expect(report.review).toHaveLength(8);
    expect(report.review.filter((item) => item.feedback?.outcome === "correct")).toHaveLength(4);
    expect(report.title).toBe(`${setup.chain.subject.name} diagnostic`);

    // Markers for the dashboard and the plan (§52).
    const enrolment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId: actor.userId, subjectId: setup.subjectId } } });
    expect(enrolment.diagnosticAttemptId).toBe(attemptId);
    expect(enrolment.diagnosticCompletedAt).not.toBeNull();
    expect((await db.student.findUniqueOrThrow({ where: { userId: actor.userId } })).diagnosticCompletedAt).not.toBeNull();
    const seeded = await db.topicMastery.findMany({ where: { userId: actor.userId, subjectId: setup.subjectId, isLeaf: true }, select: { seededByDiagnostic: true } });
    expect(seeded.length).toBe(4);
    expect(seeded.every((row) => row.seededByDiagnostic)).toBe(true);

    const after = (await getDiagnosticHub(actor)).subjects.find((s) => s.subjectId === setup.subjectId);
    expect(after).toMatchObject({ status: "COMPLETED", openAttemptId: null, completed: { attemptId, percentage: 50 } });
  });

  it("uses the subject's published diagnostic test when there is one", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 2 });
    const assessment = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "DIAGNOSTIC",
      title: "Starting-point check",
      sections: [{ questionIds: setup.questions.slice(0, 3).map((q) => q.id) }],
    });
    const actor = await enrolledLearner(setup);
    expect((await getDiagnosticHub(actor)).subjects).toMatchObject([{ subjectId: setup.subjectId, plannedQuestions: 3 }]);
    const started = await startDiagnostics(actor, { subjectIds: [setup.subjectId] });
    const attemptId = started.started[0]?.attemptId as string;
    expect(await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId }, select: { assessmentId: true, questionCount: true, mode: true } })).toEqual({
      assessmentId: assessment.id,
      questionCount: 3,
      mode: "DIAGNOSTIC",
    });
    const room = await getDiagnosticRoom(actor, attemptId);
    expect(room.kind === "ROOM" && room.room.title).toBe("Starting-point check");

    // Submitting with nothing answered: an honest empty report, no diagnostic marker.
    await submitDiagnostic(actor, { attemptId, reason: "STUDENT" });
    const loaded = await getDiagnosticReport(actor, attemptId);
    expect(loaded.kind === "REPORT" && loaded.report.nothingAnswered).toBe(true);
    expect((await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId: actor.userId, subjectId: setup.subjectId } } })).diagnosticCompletedAt).toBeNull();
  });

  it("keeps diagnostics private to their student and sends other modes to their own pages", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 3 });
    const owner = await enrolledLearner(setup);
    const other = await enrolledLearner(setup);
    const { started } = await startDiagnostics(owner, { subjectIds: [setup.subjectId] });
    const attemptId = started[0]?.attemptId as string;

    await expectAppError(getDiagnosticRoom(other, attemptId), "NOT_FOUND");
    await expectAppError(getDiagnosticReport(other, attemptId), "NOT_FOUND");
    await expectAppError(submitDiagnostic(other, { attemptId, reason: "STUDENT" }), "NOT_FOUND");
    await expectAppError(getDiagnosticReport(owner, "not-a-uuid"), "NOT_FOUND");

    const practice = await startAttempt(owner, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 });
    const practiceId = practice.attempt.id;
    expect(await getDiagnosticRoom(owner, practiceId)).toEqual({ kind: "REDIRECT", href: `/app/exams/attempt/${practiceId}` });
    expect(await getDiagnosticReport(owner, practiceId)).toEqual({ kind: "REDIRECT", href: `/app/exams/attempt/${practiceId}/results` });
    await expectAppError(submitDiagnostic(owner, { attemptId: practiceId, reason: "STUDENT" }), "NOT_FOUND");

    // Parents and teachers cannot take a diagnostic.
    await expectAppError(getDiagnosticHub({ userId: owner.userId, roles: ["PARENT"] }), "FORBIDDEN");
  });
});
