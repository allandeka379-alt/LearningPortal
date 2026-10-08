import { describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { roundHalfUp } from "@/lib/math";
import { answerAndMark, saveResponse, startAttempt, submitAttempt } from "@/server/attempts";
import { db } from "@/server/db";
import { enrolInSubjects } from "@/server/enrollment";
import { isAppError } from "@/server/lib/errors";
import {
  correctResponse,
  createAssessment,
  createExamSession,
  createLearner,
  createLearningSetup,
  learnerActor,
  wrongResponse,
} from "../../../tests/factories/learning";
import { getStudentDashboard, getSubjectDashboard, getTopicProgress } from "./service";

describe("student and subject dashboards (§6, §7, §17)", () => {
  it("shows honest empty states, then numbers equal to the underlying data", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 2, questionsPerLeaf: 3 });
    const now = new Date();
    const today = localDateString(now, "Africa/Harare");
    const session = await createExamSession(setup.qualificationId, { startsOn: addDays(today, 124) });
    const { userId, actor } = await createLearner({ firstName: "Tariro" });
    await enrolInSubjects(actor, { subjectIds: [setup.subjectId], targetExamSessionId: session.id });

    // Empty: zeros and nulls, never invented values (§50).
    const empty = await getStudentDashboard(actor, now);
    expect(empty.greeting.name).toBe("Tariro");
    expect(empty.examCountdown?.daysUntil).toBe(124);
    expect(empty.examCountdown?.isProvisional).toBe(true);
    expect(empty.questionsAttempted).toBe(0);
    expect(empty.accuracyPercent).toBeNull();
    expect(empty.averageScorePercent).toBeNull();
    expect(empty.recentMocks).toEqual([]);
    expect(empty.weakTopics).toEqual([]);
    expect(empty.streak).toMatchObject({ current: 0, status: "INACTIVE" });
    expect(empty.overall).toMatchObject({ progressPercent: 0, topicsTotal: 4, topicsCompleted: 0, topicsRemaining: 4 });
    expect(empty.subjects[0]?.countdown?.daysUntil).toBe(124);
    expect(empty.recommended.length).toBeGreaterThan(0);
    // Recommended practice is adaptive and recorded as a recommendation (re-tests keep their own mode).
    for (const item of empty.recommended.filter((r) => r.href.startsWith("/app/practice?") && !r.href.includes("mode=RETEST"))) {
      expect(new URL(item.href, "http://x").searchParams.get("difficulty")).toBe("ADAPTIVE");
      expect(new URL(item.href, "http://x").searchParams.get("origin")).toBe("RECOMMENDATION");
    }
    expect(empty.dailyTarget.minutes).toBeGreaterThan(0);
    expect(empty.studyPlan).toBeNull();
    // No diagnostic yet: the free diagnostic is offered (§46).
    expect(empty.diagnosticOffer).toBe("OFFER");

    // Practice: correct in the first TOPIC's leaves, wrong in the second's.
    const firstTopicLeaves = new Set(setup.chain.subtopics.filter((s) => s.parentId === setup.topicIds[0]).map((s) => s.id));
    const practice = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 6 });
    for (const slot of practice.attempt.questions) {
      const question = setup.questions.find((q) => q.id === slot.question?.id);
      if (!question) throw new Error("unknown question");
      const response = firstTopicLeaves.has(question.topicId) ? correctResponse(question.definition) : wrongResponse(question.definition);
      await answerAndMark(actor, practice.attempt.id, slot.position, response);
    }
    // Mock: 1 of 2 correct.
    const [m1, m2] = setup.questions;
    if (!m1 || !m2) throw new Error("questions missing");
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      timeLimitSeconds: 1800,
      sections: [{ questionIds: [m1.id, m2.id] }],
    });
    const exam = await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
    const positions = new Map(exam.attempt.questions.map((q) => [q.question?.id, q.position]));
    await saveResponse(actor, exam.attempt.id, positions.get(m1.id) as number, correctResponse(m1.definition));
    await saveResponse(actor, exam.attempt.id, positions.get(m2.id) as number, wrongResponse(m2.definition));
    const mockResult = await submitAttempt(actor, exam.attempt.id);
    expect(mockResult.score.percentage).toBe(50);

    const dashboard = await getStudentDashboard(actor);
    const marked = await db.questionAttempt.findMany({ where: { userId, markingStatus: "AUTO_MARKED" }, select: { isCorrect: true } });
    const correct = marked.filter((m) => m.isCorrect).length;
    expect(dashboard.questionsAttempted).toBe(marked.length);
    expect(dashboard.questionsCorrect).toBe(correct);
    expect(dashboard.accuracyPercent).toBe(roundHalfUp((correct * 100) / marked.length, 1));
    expect(dashboard.averageScorePercent).toBe(50);
    expect(dashboard.recentMocks[0]).toMatchObject({ attemptId: exam.attempt.id, percentage: 50 });
    expect(dashboard.streak).toMatchObject({ current: 1, status: "DONE_TODAY" });
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(dashboard.xp.total).toBe(stats.totalXp);

    const leafRows = await db.topicMastery.findMany({ where: { userId, isLeaf: true, syllabusId: setup.syllabusId } });
    const expectedProgress = roundHalfUp(leafRows.reduce((sum, r) => sum + r.score, 0) / 4, 1);
    expect(dashboard.subjects[0]?.progressPercent).toBe(expectedProgress);
    expect(dashboard.subjects[0]?.questionsAttempted).toBe(marked.length);
    const topicRows = await db.topicMastery.findMany({ where: { userId, topicKind: "TOPIC" } });
    for (const weak of dashboard.weakTopics) {
      const row = topicRows.find((r) => r.topicId === weak.topicId);
      expect(row?.score).toBe(weak.score);
      expect(["WEAK", "DEVELOPING"]).toContain(row?.band);
    }
    for (const strong of dashboard.strongTopics) expect(["STRONG", "MASTERED"]).toContain(strong.band);

    // Subject dashboard (§7).
    const subject = await getSubjectDashboard(actor, setup.subjectId);
    expect(subject.topics).toHaveLength(2);
    for (const topic of subject.topics) {
      const row = topicRows.find((r) => r.topicId === topic.topicId);
      expect(topic.score).toBe(row ? row.score : null);
    }
    expect(subject.progress?.questionsAttempted).toBe(marked.length);
    expect(subject.progress?.mockExamsCompleted).toBe(1);
    expect(subject.recentTests[0]?.attemptId).toBe(exam.attempt.id);
    if (subject.weakest && subject.weakest.score !== null && subject.weakest.score < 75) {
      expect(subject.weakestMessage).toBe(`Your weakest area is ${subject.weakest.name}.`);
    }
    expect(subject.examCountdown?.daysUntil).toBe(124);

    // Topic detail (§11).
    const leaf = leafRows[0];
    if (!leaf) throw new Error("no leaf row");
    const topic = await getTopicProgress(actor, leaf.topicId);
    expect(topic.mastery?.questionsAttempted).toBe(leaf.questionsAttempted);
    const answered = await db.questionAttempt.count({ where: { userId, topicId: leaf.topicId, markingStatus: "AUTO_MARKED" } });
    expect(topic.recentAnswers).toHaveLength(answered);
  });

  it("offers the diagnostic until one is finished, more quietly after the student skipped it", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const { userId, actor } = await createLearner();
    expect((await getStudentDashboard(actor)).diagnosticOffer).toBeNull(); // no subjects to diagnose yet
    await enrolInSubjects(actor, { subjectIds: [setup.subjectId] });
    expect((await getStudentDashboard(actor)).diagnosticOffer).toBe("OFFER");
    await db.student.update({ where: { userId }, data: { diagnosticSkippedAt: new Date() } });
    expect((await getStudentDashboard(actor)).diagnosticOffer).toBe("SKIPPED");
    await db.student.update({ where: { userId }, data: { diagnosticCompletedAt: new Date() } });
    expect((await getStudentDashboard(actor)).diagnosticOffer).toBeNull();
  });

  it("is only for the student's own enrolled subjects", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const { userId, actor } = await createLearner();
    await expect(getSubjectDashboard(actor, setup.subjectId)).rejects.toSatisfy((e: unknown) => isAppError(e) && e.code === "NOT_FOUND");
    await expect(getTopicProgress(actor, setup.leafTopicIds[0] as string)).rejects.toSatisfy((e: unknown) => isAppError(e) && e.code === "NOT_FOUND");
    await expect(getStudentDashboard(learnerActor(userId, { roles: ["PARENT"] }))).rejects.toSatisfy((e: unknown) => isAppError(e) && e.code === "FORBIDDEN");
  });
});
