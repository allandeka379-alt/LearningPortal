import { describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { answerAndMark, saveResponse, startAttempt, submitAttempt } from "@/server/attempts";
import { db } from "@/server/db";
import { enrolInSubjects } from "@/server/enrollment";
import { isAppError } from "@/server/lib/errors";
import {
  correctResponse,
  createExamSession,
  createLearner,
  createLearningSetup,
  learnerActor,
  wrongResponse,
  type LearningSetup,
} from "../../../tests/factories/learning";
import { createParent } from "../../../tests/factories/identity";
import {
  getProgressOverview,
  getRecentDiagnostics,
  getStudentHeaderSummary,
  getSubjectTopicTree,
  listStudentSubjects,
} from "./student-overview";

function definitionOf(setup: LearningSetup, questionId: string) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

describe("student overview read models", () => {
  it("shows honest empty values for a new student, then real numbers after practice", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 2, questionsPerLeaf: 3 });
    const now = new Date();
    const today = localDateString(now, "Africa/Harare");
    const session = await createExamSession(setup.qualificationId, { startsOn: addDays(today, 90), isProvisional: true });
    const { userId, actor } = await createLearner();
    const fullActor = { ...actor, timeZone: "Africa/Harare" };
    await enrolInSubjects(actor, { subjectIds: [setup.subjectId], targetExamSessionId: session.id });

    // Empty (§50): no streak, zero activity, nothing earned, every topic not started.
    const header = await getStudentHeaderSummary(fullActor, now);
    expect(header.streak).toEqual({ current: 0, status: "INACTIVE" });
    expect(header.countdown).toMatchObject({ examSessionId: session.id, daysUntil: 90, isProvisional: true, subjectIds: [setup.subjectId] });

    const emptyOverview = await getProgressOverview(fullActor, now);
    expect(emptyOverview.activity.days).toHaveLength(30);
    expect(emptyOverview.activity).toMatchObject({ activeDays: 0, studyMinutes: 0, questionsAttempted: 0, accuracyPercent: null });
    expect(emptyOverview.xp.total).toBe(0);
    expect(emptyOverview.xp.level.level).toBe(1);
    expect(emptyOverview.achievements.earned).toEqual([]);
    expect(emptyOverview.subjects).toEqual([
      expect.objectContaining({ subjectId: setup.subjectId, topicsTotal: 2, assessed: 0, counts: expect.objectContaining({ NOT_STARTED: 2, WEAK: 0 }) }),
    ]);

    const cards = await listStudentSubjects(fullActor, now);
    expect(cards).toHaveLength(1);
    expect(cards[0]).toMatchObject({
      subjectId: setup.subjectId,
      status: "ACTIVE",
      syllabus: { id: setup.syllabusId },
      countdown: { daysUntil: 90 },
      progress: { questionsAttempted: 0, accuracyPercent: null, topicsTotal: 4 },
    });

    const emptyTree = await getSubjectTopicTree(fullActor, setup.subjectId);
    expect(emptyTree.map((n) => n.topicId)).toEqual(setup.topicIds);
    expect(emptyTree.every((n) => n.score === null && n.children.length === 2 && n.children.every((c) => c.band === null))).toBe(true);

    // Practice: correct answers in the first TOPIC's leaves, wrong in the second's.
    const firstLeaves = new Set(setup.chain.subtopics.filter((s) => s.parentId === setup.topicIds[0]).map((s) => s.id));
    const practice = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 8 });
    for (const slot of practice.attempt.questions) {
      const question = setup.questions.find((q) => q.id === slot.question?.id);
      if (!question) throw new Error("unknown question");
      await answerAndMark(actor, practice.attempt.id, slot.position, firstLeaves.has(question.topicId) ? correctResponse(question.definition) : wrongResponse(question.definition));
    }
    await submitAttempt(actor, practice.attempt.id);

    const overview = await getProgressOverview(fullActor);
    const marked = await db.questionAttempt.findMany({ where: { userId, markingStatus: "AUTO_MARKED" }, select: { isCorrect: true } });
    expect(overview.activity.questionsAttempted).toBe(marked.length);
    expect(overview.activity.questionsCorrect).toBe(marked.filter((m) => m.isCorrect).length);
    expect(overview.activity.activeDays).toBe(1);
    expect(overview.activity.days[29]).toMatchObject({ date: localDateString(new Date(), "Africa/Harare"), questionsAttempted: marked.length });
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(overview.xp.total).toBe(stats.totalXp);
    const subject = overview.subjects[0];
    expect(subject?.assessed).toBeGreaterThan(0);
    const counted = Object.values(subject?.counts ?? {}).reduce((sum, n) => sum + n, 0);
    expect(counted).toBe(subject?.topicsTotal);

    const tree = await getSubjectTopicTree(fullActor, setup.subjectId);
    const first = tree.find((n) => n.topicId === setup.topicIds[0]);
    const second = tree.find((n) => n.topicId === setup.topicIds[1]);
    expect(first?.score).not.toBeNull();
    expect(second?.score).not.toBeNull();
    expect(first?.score ?? 0).toBeGreaterThan(second?.score ?? 100);

    const afterHeader = await getStudentHeaderSummary(fullActor);
    const subjects = await listStudentSubjects(fullActor);
    expect(subjects[0]?.progress?.questionsAttempted).toBe(marked.length);
    expect(afterHeader.countdown?.examSessionId).toBe(session.id);
  });

  it("summarises the latest diagnostic with named strong and weak topics (§52)", async () => {
    const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const { actor } = await createLearner();
    await enrolInSubjects(actor, { subjectIds: [setup.subjectId], abilityLevel: "INTERMEDIATE" });
    expect(await getRecentDiagnostics(actor)).toEqual([]);

    const { attempt } = await startAttempt(actor, { mode: "DIAGNOSTIC", subjectId: setup.subjectId, count: 2 });
    const slots = await db.questionAttempt.findMany({ where: { attemptId: attempt.id }, orderBy: { position: "asc" }, select: { position: true, topicId: true } });
    const strongTopic = slots[0]?.topicId;
    for (const [index, slot] of attempt.questions.entries()) {
      const def = definitionOf(setup, slot.question?.id as string);
      await saveResponse(actor, attempt.id, slot.position, index === 0 ? correctResponse(def) : wrongResponse(def));
    }
    await submitAttempt(actor, attempt.id);

    const [summary] = await getRecentDiagnostics(actor);
    expect(summary).toMatchObject({ subjectId: setup.subjectId, attemptId: attempt.id, percentage: 50, isProvisional: false });
    const named = [...(summary?.strongTopics ?? []), ...(summary?.weakTopics ?? [])];
    expect(named.every((t) => t.name.length > 0)).toBe(true);
    if (summary && summary.strongTopics.length > 0) expect(summary.strongTopics.map((t) => t.topicId)).toContain(strongTopic);

    // Older than the window: hidden.
    expect(await getRecentDiagnostics(actor, { now: new Date(Date.now() + 30 * 24 * 3600 * 1000) })).toEqual([]);
  });

  it("refuses non-students and subjects the student is not enrolled in", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const { user: parent } = await createParent();
    const parentActor = { userId: parent.id, roles: ["PARENT" as const] };
    await expect(getProgressOverview(parentActor)).rejects.toSatisfy((e) => isAppError(e) && e.code === "FORBIDDEN");
    await expect(getStudentHeaderSummary(parentActor)).rejects.toSatisfy((e) => isAppError(e) && e.code === "FORBIDDEN");

    const { userId } = await createLearner();
    await expect(getSubjectTopicTree(learnerActor(userId), setup.subjectId)).rejects.toSatisfy((e) => isAppError(e) && e.code === "NOT_FOUND");
  });
});
