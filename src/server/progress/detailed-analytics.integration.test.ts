import { describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { addDailyActivity } from "@/server/analytics/testing/fixtures";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createParent } from "../../../tests/factories/identity";
import {
  createAttemptWithAnswers,
  createLearner,
  createLearningSetup,
  learnerActor,
  UNLIMITED_LEARNING_FEATURES,
} from "../../../tests/factories/learning";
import { detailedAnalyticsIncluded, getDetailedAnalytics } from "./detailed-analytics";

const DAY = 86_400_000;

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${(error as Error).message}`;
  }
}

describe("getDetailedAnalytics (advancedAnalytics, §31)", () => {
  it("aggregates the student's own marked answers per topic, week and difficulty", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 1 });
    const [leafA, leafB] = setup.leafTopicIds as [string, string];
    const questionA = setup.questionsByTopic.get(leafA)?.[0]?.id as string;
    const questionB = setup.questionsByTopic.get(leafB)?.[0]?.id as string;
    const { userId } = await createLearner({ features: { ...UNLIMITED_LEARNING_FEATURES, advancedAnalytics: true } });
    const actor = { ...learnerActor(userId), timeZone: "Africa/Harare" };
    const now = new Date();
    const today = localDateString(now, "Africa/Harare");

    // Topic A: earlier half 3/6, recent half 6/6 (answered at difficulty 4 with 30 s each).
    await createAttemptWithAnswers({ userId, subjectId: setup.subjectId, questionId: questionA, topicId: leafA, answered: 6, correct: 3, at: new Date(now.getTime() - 40 * DAY) });
    const recent = await createAttemptWithAnswers({ userId, subjectId: setup.subjectId, questionId: questionA, topicId: leafA, answered: 6, correct: 6, at: new Date(now.getTime() - 2 * DAY) });
    await db.questionAttempt.updateMany({ where: { attemptId: recent.attemptId }, data: { difficulty: 4, timeSpentSeconds: 30 } });
    // Topic B: two answers yesterday. Outside the window (80 days ago): ignored.
    await createAttemptWithAnswers({ userId, subjectId: setup.subjectId, questionId: questionB, topicId: leafB, answered: 2, correct: 1, at: new Date(now.getTime() - DAY) });
    await createAttemptWithAnswers({ userId, subjectId: setup.subjectId, questionId: questionB, topicId: leafB, answered: 9, correct: 0, at: new Date(now.getTime() - 80 * DAY) });
    await addDailyActivity(userId, addDays(today, -2), { studySeconds: 1200, questionsAttempted: 6, questionsCorrect: 6 });
    // Another student's answers are never read.
    const other = await createLearner({ features: { advancedAnalytics: true } });
    await createAttemptWithAnswers({ userId: other.userId, subjectId: setup.subjectId, questionId: questionA, topicId: leafA, answered: 5, correct: 0 });

    expect(await detailedAnalyticsIncluded(actor)).toBe(true);
    const result = await getDetailedAnalytics(actor, now);
    expect(result.hasAnswers).toBe(true);
    expect(result.window.to).toBe(today);
    expect(result.topics.map((t) => t.topicId)).toEqual([leafA, leafB]);
    expect(result.topics[0]).toMatchObject({
      subjectName: setup.chain.subject.name,
      answered: 12,
      accuracyPercent: 75,
      recent: { answered: 6, accuracyPercent: 100 },
      earlier: { answered: 6, accuracyPercent: 50 },
      change: 50,
      direction: "up",
    });
    expect(result.topics[0]?.topicName).not.toBe("Topic");
    expect(result.topics[1]).toMatchObject({ answered: 2, accuracyPercent: 50, change: null });
    const byLevel = Object.fromEntries(result.difficulty.map((d) => [d.difficulty, d]));
    expect(byLevel[3]).toMatchObject({ answered: 8, correct: 4, accuracyPercent: 50, secondsPerQuestion: null });
    expect(byLevel[4]).toMatchObject({ answered: 6, correct: 6, accuracyPercent: 100, secondsPerQuestion: 30 });
    expect(result.time).toMatchObject({ secondsPerQuestion: 30, timedAnswers: 6 });
    expect(result.weeks.at(-1)).toMatchObject({ index: 0, studyMinutes: 20, questionsAnswered: 6, accuracyPercent: 100 });
  });

  it("is refused at the service boundary without the entitlement, and for non-students", async () => {
    const { userId } = await createLearner({ features: null });
    const actor = learnerActor(userId);
    // The shared default (FREE) plan may hold any values (tests/README.md); this case needs it without the feature.
    if (!(await detailedAnalyticsIncluded(actor))) {
      expect(await codeOf(getDetailedAnalytics(actor))).toBe("ENTITLEMENT_REQUIRED");
    }
    const parent = (await createParent()).user;
    expect(await codeOf(getDetailedAnalytics({ userId: parent.id, roles: ["PARENT"] }))).toBe("FORBIDDEN");
  });
});
