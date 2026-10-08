import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { uniqueCode } from "../../../tests/factories/util";
import { createEnrollment, createLearner, createLearningSetup } from "../../../tests/factories/learning";
import { awardXp, evaluateAchievements, recordActivity } from "./service";

/** 12:00 Harare (10:00 UTC) on a calendar day. */
const noon = (date: string) => new Date(`${date}T10:00:00.000Z`);
const day = (date: string) => new Date(`${date}T00:00:00.000Z`);

describe("awardXp (§19 XP ledger)", () => {
  it("awards once per (user, reason, source) and moves the totals with it", async () => {
    const { userId } = await createLearner();
    const at = noon("2026-09-02");
    const first = await db.$transaction((tx) => awardXp(tx, userId, "LESSON_COMPLETED", "lesson-1", 15, { sourceType: "LESSON", at }));
    const replay = await db.$transaction((tx) => awardXp(tx, userId, "LESSON_COMPLETED", "lesson-1", 15, { sourceType: "LESSON", at }));
    expect(first).toEqual({ awarded: true, amount: 15 });
    expect(replay).toEqual({ awarded: false, amount: 15 });
    expect(await db.xpEvent.count({ where: { userId } })).toBe(1);
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats.totalXp).toBe(15);
    expect(stats.weekXp).toBe(15);
    expect(stats.weekStartDate).toEqual(day("2026-08-31"));
    const activity = await db.dailyActivity.findUniqueOrThrow({ where: { userId_date: { userId, date: day("2026-09-02") } } });
    expect(activity.xpEarned).toBe(15);
  });

  it("rejects programming errors", async () => {
    const { userId } = await createLearner();
    await expect(db.$transaction((tx) => awardXp(tx, userId, "PRACTICE_COMPLETED", "x"))).rejects.toThrow(RangeError);
    await expect(db.$transaction((tx) => awardXp(tx, userId, "PRACTICE_COMPLETED", "x", -5))).rejects.toThrow(RangeError);
    expect(await db.$transaction((tx) => awardXp(tx, userId, "PRACTICE_COMPLETED", "x", 0))).toEqual({ awarded: false, amount: 0 });
  });
});

describe("recordActivity (§19 streaks, §6 daily target)", () => {
  it("credits the streak once per day, extends it on consecutive days and breaks it after a gap", async () => {
    const { userId } = await createLearner();
    const record = (date: string, questions = 1) =>
      db.$transaction((tx) => recordActivity(tx, userId, { questions, correct: questions }, { at: noon(date), timeZone: "Africa/Harare" }));

    const d1 = await record("2026-09-07");
    expect(d1).toMatchObject({ dailyGoalMet: true, goalNewlyMet: true, streak: { current: 1, longest: 1 } });
    expect(d1.xpAwarded).toBeGreaterThan(0);
    const again = await record("2026-09-07");
    expect(again).toMatchObject({ goalNewlyMet: false, streak: null, xpAwarded: 0 });
    const d2 = await record("2026-09-08");
    expect(d2.streak).toEqual({ current: 2, longest: 2 });
    const d3 = await record("2026-09-11");
    expect(d3.streakEvents.map((e) => e.type)).toEqual(["STREAK_BROKEN", "STREAK_STARTED"]);
    expect(d3.streak).toEqual({ current: 1, longest: 2 });

    const first = await db.dailyActivity.findUniqueOrThrow({ where: { userId_date: { userId, date: day("2026-09-07") } } });
    expect(first).toMatchObject({ questionsAttempted: 2, questionsCorrect: 2, dailyGoalMet: true, streakCredited: true });
    expect(await db.xpEvent.count({ where: { userId, reason: "DAILY_GOAL_MET" } })).toBe(3);
    // LearnerStats is not touched per answer: no lifetime totals were recorded.
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats.totalQuestionsAttempted).toBe(0);
    expect(stats.lastStreakDate).toEqual(day("2026-09-11"));
  });

  it("bridges one missed day with a freeze and records the bridged day", async () => {
    const { userId } = await createLearner();
    const record = (date: string) => db.$transaction((tx) => recordActivity(tx, userId, { questions: 1 }, { at: noon(date) }));
    await record("2026-09-14");
    await record("2026-09-15");
    await db.learnerStats.update({ where: { userId }, data: { streakFreezesAvailable: 1 } });
    const after = await record("2026-09-17");
    expect(after.streakEvents.map((e) => e.type)).toContain("FREEZE_USED");
    expect(after.streak).toEqual({ current: 3, longest: 3 });
    const bridged = await db.dailyActivity.findUniqueOrThrow({ where: { userId_date: { userId, date: day("2026-09-16") } } });
    expect(bridged).toMatchObject({ streakFreezeUsed: true, streakCredited: true, questionsAttempted: 0 });
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats.streakFreezesAvailable).toBe(0);
    expect(stats.streakFreezesUsedTotal).toBe(1);
  });

  it("adds lifetime and weekly totals at attempt close", async () => {
    const { userId } = await createLearner();
    await db.$transaction((tx) =>
      recordActivity(tx, userId, { assessmentsCompleted: 1 }, { at: noon("2026-09-21"), lifetime: { questions: 10, correct: 7, assessmentsCompleted: 1, mockExamsCompleted: 1, studySeconds: 1800 } }),
    );
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats).toMatchObject({
      totalQuestionsAttempted: 10,
      totalQuestionsCorrect: 7,
      assessmentsCompleted: 1,
      mockExamsCompleted: 1,
      totalStudySeconds: 1800,
      weekQuestions: 10,
      weekStudySeconds: 1800,
      currentStreak: 1,
    });
  });
});

describe("evaluateAchievements (§19 badges)", () => {
  it("unlocks a met badge once, with a notification and its XP reward", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, gradeScheme: false });
    const { userId } = await createLearner();
    await createEnrollment(userId, setup);
    const leaf = setup.leafTopicIds[0] as string;
    const code = uniqueCode("BADGE");
    // Scoped to this test's subject so no other test's students can ever meet it.
    const achievement = await db.achievement.create({
      data: {
        code,
        name: "Test mastery badge",
        description: "Reached Mastered on a topic of the test subject.",
        category: "MASTERY",
        iconKey: "award",
        xpReward: 60,
        criteria: { type: "TOPICS_MASTERED", count: 1, subjectId: setup.subjectId },
      },
    });
    try {
      expect(await db.$transaction((tx) => evaluateAchievements(tx, userId))).not.toContainEqual(expect.objectContaining({ code }));
      await db.topicMastery.create({
        data: {
          userId,
          topicId: leaf,
          subjectId: setup.subjectId,
          syllabusId: setup.syllabusId,
          topicKind: "SUBTOPIC",
          topicDepth: 1,
          isLeaf: true,
          score: 95,
          band: "MASTERED",
          questionsAttempted: 10,
          questionsCorrect: 10,
          marksAwarded: 10,
          marksAvailable: 10,
        },
      });
      const unlocked = await db.$transaction((tx) => evaluateAchievements(tx, userId, { context: { subjectId: setup.subjectId } }));
      expect(unlocked).toContainEqual(expect.objectContaining({ code, xpReward: 60 }));
      expect(await db.$transaction((tx) => evaluateAchievements(tx, userId))).not.toContainEqual(expect.objectContaining({ code }));

      expect(await db.userAchievement.count({ where: { userId, achievementId: achievement.id } })).toBe(1);
      const notification = await db.notification.findFirst({ where: { userId, dedupeKey: `achievement:${achievement.id}` } });
      expect(notification?.category).toBe("ACHIEVEMENT");
      expect(await db.xpEvent.count({ where: { userId, reason: "ACHIEVEMENT_UNLOCKED", sourceId: achievement.id } })).toBe(1);
      expect((await db.learnerStats.findUniqueOrThrow({ where: { userId } })).topicsMastered).toBe(1);
    } finally {
      await db.achievement.update({ where: { id: achievement.id }, data: { isActive: false } });
    }
  });
});
