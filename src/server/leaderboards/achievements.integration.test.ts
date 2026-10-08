import { describe, expect, it } from "vitest";
import { dateColumnFromLocalDate, localDateString, startOfWeek } from "@/lib/dates";
import { db } from "@/server/db";
import { createEnrollment, createLearner, createLearningSetup, uniqueCode } from "../../../tests/factories/index";
import { getAchievementsView, updateWeeklyGoal } from "./achievements";

describe("getAchievementsView (§19)", () => {
  it("shows earned badges with dates, locked badges with criteria and real progress, level and the weekly goal", async () => {
    // Badges scoped to this test's own subject, so no other test's students can meet them.
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, lessonsPerTopic: 0, gradeScheme: false });
    const { userId, actor } = await createLearner();
    const now = new Date();
    const today = localDateString(now, "Africa/Harare");
    const monday = startOfWeek(today);
    const lockedBadge = await db.achievement.create({
      data: {
        code: uniqueCode("LOCKED"),
        name: "Five topics deep",
        description: "Reach Mastered on five topics.",
        category: "MASTERY",
        iconKey: "award",
        criteria: { type: "TOPICS_MASTERED", count: 5, subjectId: setup.subjectId },
      },
    });
    const secretBadge = await db.achievement.create({
      data: {
        code: uniqueCode("SECRET"),
        name: "Hidden",
        description: "A surprise.",
        category: "MILESTONE",
        iconKey: "medal",
        isSecret: true,
        criteria: { type: "TOPICS_MASTERED", count: 50, subjectId: setup.subjectId },
      },
    });
    const earnedBadge = await db.achievement.create({
      data: { code: uniqueCode("EARNED"), name: "Three in a row", description: "Met your daily goal three days running.", category: "STREAK", iconKey: "flame", isActive: false, criteria: { type: "streak_days", threshold: 3 } },
    });
    try {
      const unlockedAt = new Date(now.getTime() - 86_400_000);
      await db.userAchievement.create({ data: { userId, achievementId: earnedBadge.id, unlockedAt } });
      await createEnrollment(userId, setup);
      await db.topicMastery.create({
        data: {
          userId,
          topicId: setup.leafTopicIds[0]!,
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
      await db.learnerStats.create({
        data: { userId, totalXp: 260, currentStreak: 3, longestStreak: 5, lastStreakDate: dateColumnFromLocalDate(today), streakFreezesAvailable: 1, weeklyGoalXp: 200, dailyGoalMinutes: 30 },
      });
      await db.dailyActivity.create({
        data: { userId, date: dateColumnFromLocalDate(monday), studySeconds: 45 * 60, xpEarned: 60, streakCredited: true, dailyGoalMet: true, firstActivityAt: now },
      });
      if (today !== monday) {
        await db.dailyActivity.create({
          data: { userId, date: dateColumnFromLocalDate(today), studySeconds: 15 * 60, xpEarned: 40, streakCredited: true, dailyGoalMet: true, firstActivityAt: now },
        });
      }

      const view = await getAchievementsView(actor, now);
      // Level 2 at 100 XP, level 3 at 250 XP (levelForXp): 260 XP = level 3, 10 XP in, 200 XP span.
      expect(view.xp.level).toMatchObject({ level: 3, xpIntoLevel: 10, xpForNextLevel: 200 });
      expect(view.xp.thisWeek).toBe(today === monday ? 60 : 100);
      expect(view.streak).toMatchObject({ current: 3, longest: 5, status: "DONE_TODAY", freezesAvailable: 1 });

      expect(view.earned).toEqual([
        expect.objectContaining({ achievementId: earnedBadge.id, earned: true, unlockedAt, criteria: "Meet your daily goal 3 days in a row." }),
      ]);
      expect(view.locked).toContainEqual(
        expect.objectContaining({
          achievementId: lockedBadge.id,
          earned: false,
          unlockedAt: null,
          criteria: `Reach Mastered on 5 topics in ${setup.chain.subject.name}.`,
          progress: { current: 1, target: 5, unit: "topics" },
        }),
      );
      expect(view.locked.some((a) => a.achievementId === secretBadge.id)).toBe(false);
      expect(view.hiddenCount).toBeGreaterThanOrEqual(1);

      const goal = view.weeklyGoal;
      expect(goal.weekStart).toBe(monday);
      expect(goal.daysMet).toBe(today === monday ? 1 : 2);
      expect(goal.goalDays).toBe(5);
      expect(goal.minutes).toMatchObject({ target: 150, source: "DAILY_GOAL", done: today === monday ? 45 : 60 });
      expect(goal.xp).toMatchObject({ target: 200, done: today === monday ? 60 : 100 });
    } finally {
      await db.achievement.updateMany({ where: { id: { in: [lockedBadge.id, secretBadge.id] } }, data: { isActive: false } });
    }
  });

  it("is honest for a brand-new student", async () => {
    const { actor } = await createLearner();
    const view = await getAchievementsView(actor);
    expect(view.xp).toMatchObject({ total: 0, thisWeek: 0, level: { level: 1, xpIntoLevel: 0 } });
    expect(view.streak).toMatchObject({ current: 0, longest: 0, status: "INACTIVE" });
    expect(view.earned).toEqual([]);
    expect(view.weeklyGoal.minutes.source).toBe("DEFAULT");
    expect(view.weeklyGoal.xp).toEqual({ target: null, done: 0, percent: null });
    await expect(getAchievementsView({ userId: actor.userId, roles: ["PARENT"] })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("updateWeeklyGoal", () => {
  it("saves and clears the student's weekly targets without touching counters", async () => {
    const { userId, actor } = await createLearner();
    await db.learnerStats.create({ data: { userId, totalXp: 50, currentStreak: 2, longestStreak: 2 } });
    expect(await updateWeeklyGoal(actor, { weeklyGoalMinutes: "300", weeklyGoalXp: 500 })).toEqual({ weeklyGoalMinutes: 300, weeklyGoalXp: 500 });
    expect(await updateWeeklyGoal(actor, { weeklyGoalMinutes: "", weeklyGoalXp: null })).toEqual({ weeklyGoalMinutes: null, weeklyGoalXp: null });
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats).toMatchObject({ totalXp: 50, currentStreak: 2, weeklyGoalMinutes: null, weeklyGoalXp: null });

    const fresh = await createLearner();
    expect(await updateWeeklyGoal(fresh.actor, { weeklyGoalMinutes: 120, weeklyGoalXp: "" })).toEqual({ weeklyGoalMinutes: 120, weeklyGoalXp: null });

    await expect(updateWeeklyGoal(actor, { weeklyGoalMinutes: 5, weeklyGoalXp: null })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { weeklyGoalMinutes: [expect.stringContaining("at least 30")] },
    });
    await expect(updateWeeklyGoal(actor, { weeklyGoalMinutes: 60.5, weeklyGoalXp: null })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(updateWeeklyGoal(actor, { weeklyGoalMinutes: 60, weeklyGoalXp: null, totalXp: 99999 })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
