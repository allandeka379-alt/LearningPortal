import { randomInt } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { LeaderboardDisplay } from "@/generated/prisma/client";
import { addDays, dateColumnFromLocalDate, isoWeekKey, startOfWeek, type LocalDate } from "@/lib/dates";
import { db } from "@/server/db";
import {
  UNLIMITED_LEARNING_FEATURES,
  createAssessment,
  createClass,
  createEnrollment,
  createLearner,
  createLearningSetup,
} from "../../../tests/factories/index";
import { getLeaderboard, pseudonymFor } from "./service";
import { computeLeaderboards } from "./snapshot";

/**
 * Integration tests run against the shared test database: every scenario uses its own random past week (mid-month, so
 * the week stays inside one month), its own students and classes, and assertions only look at those rows.
 */

function isolatedWeek(): { date: LocalDate; nextDay: LocalDate; now: Date; weekKey: string; monthKey: string } {
  const year = 1990 + randomInt(28);
  const month = 1 + randomInt(12);
  // The week of the 10th runs from the 4th-10th to the 10th-16th, always inside one month. Use its Wednesday.
  const date = addDays(startOfWeek(`${year}-${String(month).padStart(2, "0")}-10`), 2);
  return { date, nextDay: addDays(date, 1), now: new Date(`${date}T10:00:00.000Z`), weekKey: isoWeekKey(date), monthKey: date.slice(0, 7) };
}

const FEATURES = { ...UNLIMITED_LEARNING_FEATURES, leaderboards: true };

async function student(options: { optIn: boolean; display?: LeaderboardDisplay; firstName?: string; lastName?: string }) {
  const learner = await createLearner({ features: FEATURES, ...(options.firstName ? { firstName: options.firstName } : {}) });
  await db.profile.update({
    where: { userId: learner.userId },
    data: { leaderboardOptIn: options.optIn, leaderboardDisplay: options.display ?? "USERNAME", ...(options.lastName ? { lastName: options.lastName } : {}) },
  });
  return learner;
}

async function activity(userId: string, date: LocalDate, values: { xp?: number; questions?: number }) {
  await db.dailyActivity.upsert({
    where: { userId_date: { userId, date: dateColumnFromLocalDate(date) } },
    create: { userId, date: dateColumnFromLocalDate(date), xpEarned: values.xp ?? 0, questionsAttempted: values.questions ?? 0, firstActivityAt: new Date(`${date}T08:00:00Z`) },
    update: { xpEarned: values.xp ?? 0, questionsAttempted: values.questions ?? 0 },
  });
}

async function entries(userIds: readonly string[], periodKeys: readonly string[]) {
  return db.leaderboardEntry.findMany({
    where: { userId: { in: [...userIds] }, periodKey: { in: [...periodKeys] } },
    select: { userId: true, metric: true, periodKey: true, scopeType: true, scopeId: true, value: true, rank: true },
  });
}

describe("computeLeaderboards (§20 snapshot)", () => {
  it("writes scores for opted-in students only, idempotently, and drops rows that no longer apply", async () => {
    const { date, nextDay, now, weekKey } = isolatedWeek();
    const a = await student({ optIn: true, display: "FIRST_NAME", firstName: "Tendai", lastName: "Moyo" });
    const b = await student({ optIn: true, display: "ANONYMOUS" });
    const c = await student({ optIn: false });
    const cls = await createClass({ studentUserIds: [a.userId, b.userId, c.userId] });
    await activity(a.userId, date, { xp: 70, questions: 20 });
    await activity(a.userId, nextDay, { xp: 50, questions: 10 });
    await activity(b.userId, date, { xp: 80, questions: 50 });
    await activity(c.userId, date, { xp: 500, questions: 90 });
    await db.learnerStats.create({ data: { userId: a.userId, currentStreak: 4, longestStreak: 6, lastStreakDate: dateColumnFromLocalDate(date) } });
    const users = [a.userId, b.userId, c.userId];

    const first = await computeLeaderboards(weekKey, { now, userIds: users });
    expect(first.students).toBe(2);
    const rows = await entries(users, [weekKey, "LIVE"]);
    expect(rows.some((r) => r.userId === c.userId)).toBe(false);
    const aXp = rows.filter((r) => r.userId === a.userId && r.metric === "WEEKLY_XP");
    expect(aXp.map((r) => [r.scopeType, r.scopeId, r.value]).sort()).toEqual(
      [
        ["CLASS", cls.class.id, 120],
        ["GLOBAL", null, 120],
        ["SCHOOL", cls.school!.id, 120],
      ].sort(),
    );
    expect(rows.find((r) => r.userId === b.userId && r.metric === "WEEKLY_QUESTIONS" && r.scopeType === "GLOBAL")?.value).toBe(50);
    expect(rows.find((r) => r.userId === a.userId && r.metric === "STREAK" && r.scopeType === "GLOBAL")).toMatchObject({ periodKey: "LIVE", value: 4 });
    expect(rows.some((r) => r.userId === b.userId && r.metric === "STREAK")).toBe(false);

    // Same facts: nothing to write, nothing to remove.
    const again = await computeLeaderboards(weekKey, { now, userIds: users });
    expect(again).toMatchObject({ written: 0, removed: 0 });

    // A's XP goes to zero: their weekly XP rows disappear; B's stay.
    await activity(a.userId, date, { xp: 0, questions: 20 });
    await activity(a.userId, nextDay, { xp: 0, questions: 10 });
    const dropped = await computeLeaderboards(weekKey, { now, userIds: users });
    expect(dropped.removed).toBeGreaterThanOrEqual(3);
    const after = await entries(users, [weekKey]);
    expect(after.some((r) => r.userId === a.userId && r.metric === "WEEKLY_XP")).toBe(false);
    expect(after.some((r) => r.userId === b.userId && r.metric === "WEEKLY_XP")).toBe(true);

    // Opting out (without the settings service) is enforced by the next run for that student.
    await db.profile.update({ where: { userId: b.userId }, data: { leaderboardOptIn: false } });
    await computeLeaderboards(weekKey, { now, userIds: [b.userId] });
    expect((await entries([b.userId], [weekKey, "LIVE"])).length).toBe(0);
  });

  it("averages at least two mocks per month and publishes subject mastery, then writes final dense ranks", async () => {
    const { date, now, weekKey, monthKey } = isolatedWeek();
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, lessonsPerTopic: 0, gradeScheme: false });
    const assessment = await createAssessment({ subjectId: setup.subjectId, syllabusId: setup.syllabusId, kind: "MOCK_EXAM", sections: [{ questionIds: [setup.questions[0]!.id] }] });
    const a = await student({ optIn: true });
    const b = await student({ optIn: true });
    const cls = await createClass({ studentUserIds: [a.userId, b.userId], subjectId: setup.subjectId });
    for (const learner of [a, b]) await createEnrollment(learner.userId, setup);
    const mock = async (userId: string, percentage: number, hour: number) => {
      const startedAt = new Date(`${date}T0${hour}:00:00.000Z`);
      const submittedAt = new Date(startedAt.getTime() + 3_600_000);
      await db.assessmentAttempt.create({
        data: {
          userId,
          subjectId: setup.subjectId,
          assessmentId: assessment.id,
          assessmentRevision: 1,
          mode: "MOCK_EXAM",
          status: "MARKED",
          startedAt,
          lastSavedAt: startedAt,
          deadlineAt: new Date(startedAt.getTime() + 7_200_000),
          timeLimitSeconds: 7200,
          submittedAt,
          submitReason: "STUDENT",
          markedAt: submittedAt,
          totalMarks: 100,
          marksAwarded: percentage,
          percentage,
          config: { feedback: "ON_SUBMIT", origin: "BUILDER" },
        },
      });
    };
    await mock(a.userId, 80, 6);
    await mock(a.userId, 71, 7);
    await mock(b.userId, 90, 6);
    await db.subjectProgress.create({ data: { userId: a.userId, subjectId: setup.subjectId, progressPercent: 62.44 } });
    await activity(a.userId, date, { xp: 40, questions: 12 });
    await activity(b.userId, date, { xp: 90, questions: 12 });
    const users = [a.userId, b.userId];

    const result = await computeLeaderboards(weekKey, { now, userIds: users });
    expect(result.monthKeys).toEqual([monthKey]);
    const rows = await entries(users, [monthKey, "LIVE", weekKey]);
    const mocks = rows.filter((r) => r.metric === "MOCK_AVERAGE");
    expect(mocks.every((r) => r.userId === a.userId && r.value === 75.5 && r.periodKey === monthKey)).toBe(true);
    expect(mocks.map((r) => r.scopeType).sort()).toEqual(["CLASS", "GLOBAL", "SCHOOL", "SUBJECT"]);
    const mastery = rows.filter((r) => r.metric === "SUBJECT_MASTERY");
    expect(mastery.map((r) => [r.scopeType, r.scopeId, r.value]).sort()).toEqual(
      [
        ["CLASS", cls.class.id, 62.4],
        ["SUBJECT", setup.subjectId, 62.4],
      ].sort(),
    );

    const closed = await computeLeaderboards(weekKey, { now: new Date(now.getTime() + 7 * 86_400_000), final: true, userIds: users });
    expect(closed.final).toBe(true);
    const ranked = await db.leaderboardEntry.findMany({
      where: { metric: "WEEKLY_XP", periodKey: weekKey, scopeType: "CLASS", scopeId: cls.class.id },
      select: { userId: true, rank: true },
    });
    expect(Object.fromEntries(ranked.map((r) => [r.userId, r.rank]))).toEqual({ [b.userId]: 1, [a.userId]: 2 });
  });

  it("rejects malformed week keys", async () => {
    await expect(computeLeaderboards("2026-41")).rejects.toThrow(RangeError);
  });
});

describe("getLeaderboard (§20 read model)", () => {
  it("shows names in each student's mode, dense ranks, and the student's own rank outside the top N", async () => {
    const { date, now } = isolatedWeek();
    const a = await student({ optIn: true, display: "FIRST_NAME", firstName: "Tendai", lastName: "Moyo" });
    const b = await student({ optIn: true, display: "ANONYMOUS" });
    const c = await student({ optIn: true, display: "USERNAME" });
    const d = await student({ optIn: false });
    const cls = await createClass({ studentUserIds: [a.userId, b.userId, c.userId, d.userId] });
    const other = await createClass({ studentUserIds: [] });
    await activity(a.userId, date, { xp: 100 });
    await activity(b.userId, date, { xp: 100 });
    await activity(c.userId, date, { xp: 30 });
    await activity(d.userId, date, { xp: 999 });
    await computeLeaderboards(isoWeekKey(date), { now, userIds: [a.userId, b.userId, c.userId, d.userId] });

    const query = { metric: "WEEKLY_XP", scope: "CLASS", scopeId: cls.class.id };
    const view = await getLeaderboard(a.actor, query, now);
    expect(view.entitled).toBe(true);
    expect(view.optedIn).toBe(true);
    expect(view.scope).toMatchObject({ scope: "CLASS", scopeId: cls.class.id, label: cls.class.name });
    expect(view.period).toMatchObject({ kind: "WEEK", key: isoWeekKey(date) });
    expect(view.total).toBe(3);
    expect(view.rows.map((r) => [r.rank, r.value])).toEqual([
      [1, 100],
      [1, 100],
      [2, 30],
    ]);
    const names = view.rows.map((r) => r.name);
    expect(names).toContain("Tendai M.");
    expect(names).toContain(pseudonymFor(b.userId));
    expect(names.some((name) => name.includes("@"))).toBe(false);
    expect(view.rows.find((r) => r.isMe)?.name).toBe("Tendai M.");
    expect(view.me).toMatchObject({ rank: 1, value: 100, inTop: true });
    expect(view.myName).toBe("Tendai M.");

    // C is outside a top-1 list but still sees their own dense rank.
    const narrow = await getLeaderboard(c.actor, query, now, { topN: 1 });
    expect(narrow.rows).toHaveLength(1);
    expect(narrow.rows.some((r) => r.isMe)).toBe(false);
    expect(narrow.me).toMatchObject({ rank: 2, value: 30, inTop: false });

    // A board the student doesn't belong to falls back to one they do.
    const elsewhere = await getLeaderboard(a.actor, { metric: "WEEKLY_XP", scope: "CLASS", scopeId: other.class.id }, now);
    expect(elsewhere.scope.scopeId).not.toBe(other.class.id);
    expect(elsewhere.scopes.every((s) => s.scopeId !== other.class.id)).toBe(true);

    // Not opted in: sees the board (with their call to action) but is not on it.
    const outsider = await getLeaderboard(d.actor, query, now);
    expect(outsider.optedIn).toBe(false);
    expect(outsider.me).toBeNull();
    expect(outsider.rows.some((r) => r.isMe)).toBe(false);

    // Subject mastery is only offered per subject / subject class.
    const masteryView = await getLeaderboard(a.actor, { metric: "SUBJECT_MASTERY" }, now);
    expect(masteryView.scopes.every((s) => s.scope === "SUBJECT" || s.scope === "CLASS")).toBe(true);

    // A student suspended since the last snapshot disappears from the board at once (not an hour later).
    await db.user.update({ where: { id: b.userId }, data: { status: "SUSPENDED", statusChangedAt: new Date() } });
    const afterSuspension = await getLeaderboard(c.actor, query, now);
    expect(afterSuspension.total).toBe(2);
    expect(afterSuspension.rows.map((r) => r.name)).not.toContain(pseudonymFor(b.userId));
    expect(afterSuspension.me).toMatchObject({ rank: 2, value: 30 });
  });

  it("MIN-01: a minor without GRANTED guardian consent never appears under their full name", async () => {
    const { date, now } = isolatedWeek();
    const minor = await student({ optIn: true, display: "REAL_NAME", firstName: "Rudo", lastName: "Chikwanha" });
    const adult = await student({ optIn: true, display: "REAL_NAME", firstName: "Farai", lastName: "Ndlovu" });
    await db.student.update({ where: { userId: minor.userId }, data: { isMinor: true, guardianConsentStatus: "PENDING" } });
    const cls = await createClass({ studentUserIds: [minor.userId, adult.userId] });
    await activity(minor.userId, date, { xp: 60 });
    await activity(adult.userId, date, { xp: 40 });
    await computeLeaderboards(isoWeekKey(date), { now, userIds: [minor.userId, adult.userId] });
    const query = { metric: "WEEKLY_XP", scope: "CLASS", scopeId: cls.class.id };

    const seenByAdult = await getLeaderboard(adult.actor, query, now);
    expect(seenByAdult.rows.map((r) => r.name)).toEqual(["Rudo C.", "Farai Ndlovu"]);
    expect(seenByAdult.realNameNeedsConsent).toBe(false);
    const own = await getLeaderboard(minor.actor, query, now);
    expect(own).toMatchObject({ display: "FIRST_NAME", myName: "Rudo C.", realNameNeedsConsent: true });
    expect(own.previews.REAL_NAME).toBeNull();
    expect(JSON.stringify(own)).not.toContain("Chikwanha");

    // With consent the full name the student chose is shown; a withdrawal applies at the next read.
    await db.student.update({ where: { userId: minor.userId }, data: { guardianConsentStatus: "GRANTED", guardianConsentMethod: "SCHOOL", guardianConsentAt: new Date() } });
    expect((await getLeaderboard(adult.actor, query, now)).rows.map((r) => r.name)).toContain("Rudo Chikwanha");
    await db.student.update({ where: { userId: minor.userId }, data: { guardianConsentStatus: "WITHDRAWN" } });
    expect((await getLeaderboard(adult.actor, query, now)).rows.map((r) => r.name)).toContain("Rudo C.");
  });

  it("is for students only", async () => {
    await expect(getLeaderboard({ userId: "00000000-0000-7000-8000-000000000000", roles: ["TEACHER"] })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
