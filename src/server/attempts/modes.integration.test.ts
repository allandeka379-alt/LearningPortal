import { describe, expect, it } from "vitest";
import { dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { enrolInSubjects } from "@/server/enrollment";
import { getSubjectDashboard } from "@/server/progress/service";
import { isAppError } from "@/server/lib/errors";
import { correctResponse, createAssessment, createLearner, createLearningSetup, sponsorAssignments, wrongResponse, type LearningSetup } from "../../../tests/factories/learning";
import { createQuestion } from "../../../tests/factories/questions";
import { answerAndMark, saveResponse, startAttempt, submitAttempt } from "./index";

function definitionOf(setup: LearningSetup, questionId: string) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

describe("diagnostic (§52)", () => {
  it("covers every topic, then seeds TopicMastery and sets the completion markers", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 2, questionsPerLeaf: 2 });
    const { userId, actor } = await createLearner();
    await enrolInSubjects(actor, { subjectIds: [setup.subjectId], abilityLevel: "INTERMEDIATE" });

    const { attempt } = await startAttempt(actor, { mode: "DIAGNOSTIC", subjectId: setup.subjectId, count: 4 });
    expect(attempt.feedback).toBe("ON_SUBMIT");
    expect(attempt.deadlineAt).toBeNull();
    const slots = await db.questionAttempt.findMany({ where: { attemptId: attempt.id }, orderBy: { position: "asc" } });
    expect(new Set(slots.map((s) => s.topicId)).size).toBe(4);

    const correctTopics = new Set<string>();
    for (const [index, slot] of attempt.questions.entries()) {
      const def = definitionOf(setup, slot.question?.id as string);
      const correct = index % 2 === 0;
      if (correct) correctTopics.add(slots[index]?.topicId as string);
      await saveResponse(actor, attempt.id, slot.position, correct ? correctResponse(def) : wrongResponse(def));
    }
    const result = await submitAttempt(actor, attempt.id);
    expect(result.status).toBe("MARKED");
    expect(result.score.percentage).toBe(50);
    expect(result.grade?.grade).toBe("C");
    expect(result.recommendations.length).toBeGreaterThan(0);

    const rows = await db.topicMastery.findMany({ where: { userId, isLeaf: true } });
    expect(rows).toHaveLength(4);
    expect(rows.every((r) => r.seededByDiagnostic && r.questionsAttempted === 1)).toBe(true);
    for (const row of rows) {
      if (correctTopics.has(row.topicId)) expect(row.score).toBeGreaterThan(40);
      else expect(row.score).toBeLessThan(40);
    }
    const enrollment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId: setup.subjectId } } });
    expect(enrollment.diagnosticAttemptId).toBe(attempt.id);
    expect(enrollment.diagnosticCompletedAt).not.toBeNull();
    const student = await db.student.findUniqueOrThrow({ where: { userId } });
    expect(student.diagnosticCompletedAt).not.toBeNull();
    expect(await db.xpEvent.count({ where: { userId, reason: "DIAGNOSTIC_COMPLETED", sourceId: attempt.id } })).toBe(1);

    const dashboard = await getSubjectDashboard(actor, setup.subjectId);
    expect(dashboard.enrollment.diagnosticCompletedAt).not.toBeNull();
    expect(dashboard.topics.every((t) => t.score !== null)).toBe(true);
    expect(dashboard.progress?.topicsStarted).toBe(4);
  });

  it("places the student: a third each below, at and above their ability, every top-level topic before any repeats", async () => {
    const setup = await createLearningSetup({ topics: 3, subtopicsPerTopic: 2, questionsPerLeaf: 0 });
    const context = { subjectId: setup.subjectId, syllabusId: setup.syllabusId, topicIds: setup.leafTopicIds };
    for (const leaf of setup.leafTopicIds) {
      for (let difficulty = 1; difficulty <= 5; difficulty += 1) await createQuestion("MULTIPLE_CHOICE", { context, topicId: leaf, difficulty, accessTier: "FREE" });
    }
    const leaves = await db.topic.findMany({ where: { id: { in: setup.leafTopicIds } }, select: { id: true, path: true } });
    const rootOf = new Map(leaves.map((t) => [t.id, t.path.split("/")[0]]));

    const { actor } = await createLearner();
    await enrolInSubjects(actor, { subjectIds: [setup.subjectId], abilityLevel: "ADVANCED" });
    const { attempt } = await startAttempt(actor, { mode: "DIAGNOSTIC", subjectId: setup.subjectId, count: 6 });
    const slots = await db.questionAttempt.findMany({ where: { attemptId: attempt.id }, orderBy: { position: "asc" }, select: { topicId: true, difficulty: true } });
    expect(slots).toHaveLength(6);
    // ADVANCED (level 4): two questions each at 3, 4 and 5.
    expect(slots.map((s) => s.difficulty).sort()).toEqual([3, 3, 4, 4, 5, 5]);
    // Two per top-level topic, from different subtopics (all six leaves once).
    const perRoot = new Map<string, number>();
    for (const s of slots) perRoot.set(rootOf.get(s.topicId) as string, (perRoot.get(rootOf.get(s.topicId) as string) ?? 0) + 1);
    expect([...perRoot.values()]).toEqual([2, 2, 2]);
    expect(new Set(slots.map((s) => s.topicId)).size).toBe(6);

    // Three questions only: one per top-level topic.
    const other = await createLearner();
    await enrolInSubjects(other.actor, { subjectIds: [setup.subjectId], abilityLevel: "BEGINNER" });
    const short = await startAttempt(other.actor, { mode: "DIAGNOSTIC", subjectId: setup.subjectId, count: 3 });
    const shortSlots = await db.questionAttempt.findMany({ where: { attemptId: short.attempt.id }, select: { topicId: true, difficulty: true } });
    expect(new Set(shortSlots.map((s) => rootOf.get(s.topicId))).size).toBe(3);
    expect(shortSlots.map((s) => s.difficulty).sort()).toEqual([1, 2, 3]);
  });

  it("runs an assessment-backed diagnostic too", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 1 });
    const diagnostic = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "DIAGNOSTIC",
      sections: [{ questionIds: setup.questions.map((q) => q.id) }],
    });
    const { userId, actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "DIAGNOSTIC", subjectId: setup.subjectId, assessmentId: diagnostic.id });
    expect(attempt.assessment?.id).toBe(diagnostic.id);
    for (const slot of attempt.questions) {
      await saveResponse(actor, attempt.id, slot.position, correctResponse(definitionOf(setup, slot.question?.id as string)));
    }
    const result = await submitAttempt(actor, attempt.id);
    expect(result.score.percentage).toBe(100);
    const enrollment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId: setup.subjectId } } });
    expect(enrollment.diagnosticAttemptId).toBe(attempt.id);
  });
});

describe("daily question (§46)", () => {
  it("answers today's question once and resumes the same attempt", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const question = setup.questions[0];
    if (!question) throw new Error("no question");
    const today = localDateString(new Date(), "Africa/Harare");
    await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(today), qualificationId: setup.qualificationId, subjectId: setup.subjectId, questionId: question.id },
    });
    const { userId, actor } = await createLearner();
    const started = await startAttempt(actor, { mode: "DAILY_QUESTION", subjectId: setup.subjectId });
    expect(started.attempt.questions).toHaveLength(1);
    const feedback = await answerAndMark(actor, started.attempt.id, 1, correctResponse(question.definition));
    expect(feedback.attemptCompleted).toBe(true);
    expect(await db.xpEvent.count({ where: { userId, reason: "DAILY_QUESTION_ANSWERED", sourceId: started.attempt.id } })).toBe(1);
    const again = await startAttempt(actor, { mode: "DAILY_QUESTION", subjectId: setup.subjectId });
    expect(again.resumed).toBe(true);
    expect(again.attempt.id).toBe(started.attempt.id);
    expect(again.attempt.status).toBe("MARKED");
  });

  it("is honest when there is no daily question yet", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const { actor } = await createLearner();
    await expect(startAttempt(actor, { mode: "DAILY_QUESTION", subjectId: setup.subjectId })).rejects.toSatisfy(
      (error: unknown) => isAppError(error) && error.code === "NOT_FOUND",
    );
  });
});

describe("re-test (§11 re-test later)", () => {
  it("refuses when nothing is due and practises due topics otherwise", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 3 });
    const { userId, actor } = await createLearner();
    await expect(startAttempt(actor, { mode: "RETEST", subjectId: setup.subjectId })).rejects.toSatisfy(
      (error: unknown) => isAppError(error) && error.code === "VALIDATION",
    );
    const practice = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 });
    for (const slot of practice.attempt.questions) {
      await answerAndMark(actor, practice.attempt.id, slot.position, wrongResponse(definitionOf(setup, slot.question?.id as string)));
    }
    // Make the re-tests due now.
    await db.topicMastery.updateMany({ where: { userId, isLeaf: true }, data: { nextReviewAt: new Date(Date.now() - 60_000) } });
    const retest = await startAttempt(actor, { mode: "RETEST", subjectId: setup.subjectId, count: 2 });
    expect(retest.attempt.mode).toBe("RETEST");
    expect(retest.attempt.questions.length).toBeGreaterThan(0);
  });
});

describe("assignment work (§22)", () => {
  it("runs a teacher-assigned test of a sponsoring school without personal plan gates and records the counted result", async () => {
    const { createClass } = await import("../../../tests/factories/identity");
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const test = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "TOPIC_TEST",
      accessTier: "PREMIUM",
      sections: [{ questionIds: setup.questions.map((q) => q.id) }],
    });
    const student = await createLearner({ features: null });
    const outsider = await createLearner();
    const klass = await createClass({ studentUserIds: [student.userId], subjectId: setup.subjectId });
    // The school pays for assignment work (§22 under the SCHOOL plan); see tests/authz/assignment-paywall.test.ts.
    await sponsorAssignments(klass.class);
    const now = new Date();
    const assignment = await db.assignment.create({
      data: {
        classId: klass.class.id,
        createdById: klass.class.createdById,
        subjectId: setup.subjectId,
        type: "ASSESSMENT",
        assessmentId: test.id,
        status: "PUBLISHED",
        publishedAt: new Date(now.getTime() - 60_000),
        dueAt: new Date(now.getTime() + 86_400_000),
        title: "Topic test homework",
      },
    });
    await db.assignmentProgress.create({ data: { assignmentId: assignment.id, userId: student.userId } });

    await expect(startAttempt(outsider.actor, { mode: "TOPIC_TEST", subjectId: setup.subjectId, assignmentId: assignment.id })).rejects.toSatisfy(
      (error: unknown) => isAppError(error) && error.code === "NOT_FOUND",
    );
    const { attempt } = await startAttempt(student.actor, { mode: "TOPIC_TEST", subjectId: setup.subjectId, assignmentId: assignment.id });
    expect(attempt.assignmentId).toBe(assignment.id);
    const enrollment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId: student.userId, subjectId: setup.subjectId } } });
    expect(enrollment.enrolledVia).toBe("CLASS");
    for (const slot of attempt.questions) {
      await saveResponse(student.actor, attempt.id, slot.position, correctResponse(definitionOf(setup, slot.question?.id as string)));
    }
    const result = await submitAttempt(student.actor, attempt.id);
    expect(result.score.percentage).toBe(100);
    const progress = await db.assignmentProgress.findUniqueOrThrow({ where: { assignmentId_userId: { assignmentId: assignment.id, userId: student.userId } } });
    expect(progress).toMatchObject({ status: "SUBMITTED", attemptId: attempt.id, scorePercent: 100, marksAwarded: 2, totalMarks: 2, attemptsCount: 1, progressPercent: 100 });
    expect(await db.xpEvent.count({ where: { userId: student.userId, reason: "ASSIGNMENT_SUBMITTED", sourceId: attempt.id } })).toBe(1);
    // The assignment's cached counters are refreshed on submit (teacher lists read them).
    expect(
      await db.assignment.findUniqueOrThrow({
        where: { id: assignment.id },
        select: { assignedCount: true, startedCount: true, submittedCount: true, averageScorePercent: true },
      }),
    ).toEqual({ assignedCount: 1, startedCount: 1, submittedCount: 1, averageScorePercent: 100 });
  });
});

describe("blueprint assessments (§12 assembly)", () => {
  it("assembles questions once at start from the rule's topic subtree", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 2, questionsPerLeaf: 2 });
    const firstTopic = setup.topicIds[0] as string;
    const subtree = new Set(setup.chain.subtopics.filter((s) => s.parentId === firstTopic).map((s) => s.id));
    const quiz = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "QUIZ",
      assembly: "BLUEPRINT",
      feedbackTiming: "IMMEDIATE",
      sections: [{ questionIds: [], rules: [{ topicId: firstTopic, questionCount: 3 }] }],
    });
    const { actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "QUIZ", subjectId: setup.subjectId, assessmentId: quiz.id });
    expect(attempt.feedback).toBe("IMMEDIATE");
    expect(attempt.questions).toHaveLength(3);
    const slots = await db.questionAttempt.findMany({ where: { attemptId: attempt.id } });
    expect(slots.every((s) => subtree.has(s.topicId))).toBe(true);
    expect(new Set(slots.map((s) => s.questionId)).size).toBe(3);
    // Immediate-feedback quiz: answers are marked one by one, the quiz closes on submit.
    const first = attempt.questions[0];
    const feedback = await answerAndMark(actor, attempt.id, first?.position as number, correctResponse(definitionOf(setup, first?.question?.id as string)));
    expect(feedback.isCorrect).toBe(true);
    expect(feedback.attemptCompleted).toBe(false);
    const result = await submitAttempt(actor, attempt.id);
    expect(result.score).toMatchObject({ answeredCount: 1, marksAwarded: 1, totalMarks: 3 });
  });
});
