import { describe, expect, it } from "vitest";
import { dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { sha256Hex } from "@/server/lib/crypto";
import { createAssessment, createLearner, createLearningSetup, uniqueCode } from "../../../tests/factories/index";
import { isShareTokenFormat } from "./core";
import {
  createShareableResult,
  getPublicShare,
  listMyShares,
  purgeExpiredShares,
  recordShareView,
  renewShareLink,
  revokeShareableResult,
} from "./service";

/** The token is the last path segment of the returned URL. */
const tokenOf = (url: string) => decodeURIComponent(url.slice(url.lastIndexOf("/") + 1));

async function markedAttempt(options: { userId: string; subjectId: string; assessmentId: string; mode: "MOCK_EXAM" | "TOPIC_TEST"; percentage: number; pending?: number }) {
  const startedAt = new Date(Date.now() - 3 * 3_600_000);
  const submittedAt = new Date(Date.now() - 3_600_000);
  const timed = options.mode === "MOCK_EXAM";
  const attempt = await db.assessmentAttempt.create({
    data: {
      userId: options.userId,
      subjectId: options.subjectId,
      assessmentId: options.assessmentId,
      assessmentRevision: 1,
      mode: options.mode,
      status: "MARKED",
      startedAt,
      lastSavedAt: startedAt,
      deadlineAt: timed ? new Date(startedAt.getTime() + 7_200_000) : null,
      timeLimitSeconds: timed ? 7200 : null,
      submittedAt,
      submitReason: "STUDENT",
      markedAt: submittedAt,
      totalMarks: 100,
      marksAwarded: Math.round(options.percentage),
      percentage: options.percentage,
      pendingReviewCount: options.pending ?? 0,
      config: { feedback: "ON_SUBMIT", origin: "BUILDER" },
    },
    select: { id: true },
  });
  return attempt.id;
}

describe("shareable results (§46)", () => {
  it("shares a marked mock score with public-safe facts only, behind a hashed, revocable token", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, lessonsPerTopic: 0, gradeScheme: false });
    const mock = await createAssessment({ subjectId: setup.subjectId, syllabusId: setup.syllabusId, kind: "MOCK_EXAM", sections: [{ questionIds: [setup.questions[0]!.id] }] });
    const { userId, actor } = await createLearner({ firstName: "Tendai" });
    await db.profile.update({ where: { userId }, data: { lastName: "Moyo" } });
    const attemptId = await markedAttempt({ userId, subjectId: setup.subjectId, assessmentId: mock.id, mode: "MOCK_EXAM", percentage: 81.6 });

    const created = await createShareableResult(actor, { kind: "MOCK_SCORE", attemptId, nameMode: "FIRST_NAME" });
    expect(created.headline).toBe(`I scored 82% in ${setup.chain.qualification.shortName} ${setup.chain.subject.name}`);
    expect(created.url).toMatch(/\/s\/[A-Za-z0-9_-]{43}$/);
    expect(created.whatsappHref.startsWith("https://wa.me/?text=")).toBe(true);
    expect(decodeURIComponent(created.whatsappHref)).toContain(created.url);
    const token = tokenOf(created.url);
    expect(isShareTokenFormat(token)).toBe(true);

    const row = await db.shareableResult.findUniqueOrThrow({ where: { id: created.shareId } });
    expect(row.tokenHash).toBe(sha256Hex(token));
    expect(row.tokenHash).not.toContain(token);
    expect(row.attemptId).toBe(attemptId);
    expect(row.expiresAt.getTime()).toBeGreaterThan(Date.now() + 170 * 86_400_000);
    const snapshot = row.snapshot as Record<string, unknown>;
    expect(snapshot).toMatchObject({ displayName: "Tendai", value: 82, unit: "PERCENT", subjectName: setup.chain.subject.name });
    expect(JSON.stringify(snapshot)).not.toContain("Moyo");
    expect(JSON.stringify(snapshot)).not.toContain(userId);
    expect(JSON.stringify(snapshot)).not.toContain("@");

    const shown = await getPublicShare(token);
    expect(shown).toEqual({ kind: "MOCK_SCORE", snapshot: expect.objectContaining({ headline: created.headline }) });
    expect(Object.keys(shown ?? {})).toEqual(["kind", "snapshot"]);
    await recordShareView(token);
    expect((await db.shareableResult.findUniqueOrThrow({ where: { id: created.shareId } })).viewCount).toBe(1);

    // "Copy the link again" rotates the token: the old link stops working.
    const renewed = await renewShareLink(actor, created.shareId);
    expect(tokenOf(renewed.url)).not.toBe(token);
    expect(await getPublicShare(token)).toBeNull();
    expect(await getPublicShare(tokenOf(renewed.url))).not.toBeNull();

    const mine = await listMyShares(actor);
    expect(mine.find((s) => s.shareId === created.shareId)).toMatchObject({ status: "ACTIVE", headline: created.headline });

    expect(await revokeShareableResult(actor, created.shareId)).toEqual({ revoked: true });
    expect(await revokeShareableResult(actor, created.shareId)).toEqual({ revoked: false });
    expect(await getPublicShare(tokenOf(renewed.url))).toBeNull();
    expect((await listMyShares(actor)).find((s) => s.shareId === created.shareId)?.status).toBe("REVOKED");
  });

  it("refuses other students' results, wrong kinds and provisional scores", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, lessonsPerTopic: 0, gradeScheme: false });
    const test = await createAssessment({ subjectId: setup.subjectId, syllabusId: setup.syllabusId, kind: "TOPIC_TEST", sections: [{ questionIds: [setup.questions[0]!.id] }] });
    const owner = await createLearner();
    const stranger = await createLearner();
    const attemptId = await markedAttempt({ userId: owner.userId, subjectId: setup.subjectId, assessmentId: test.id, mode: "TOPIC_TEST", percentage: 70 });
    const provisional = await markedAttempt({ userId: owner.userId, subjectId: setup.subjectId, assessmentId: test.id, mode: "TOPIC_TEST", percentage: 50, pending: 1 });

    await expect(createShareableResult(stranger.actor, { kind: "TEST_SCORE", attemptId })).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(createShareableResult(owner.actor, { kind: "MOCK_SCORE", attemptId })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createShareableResult(owner.actor, { kind: "TEST_SCORE", attemptId: provisional })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(createShareableResult(owner.actor, { kind: "TEST_SCORE", attemptId, extra: "x" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createShareableResult({ userId: owner.userId, roles: ["PARENT"] }, { kind: "STREAK" })).rejects.toMatchObject({ code: "FORBIDDEN" });

    const ok = await createShareableResult(owner.actor, { kind: "TEST_SCORE", attemptId });
    expect(ok.headline).toContain("I scored 70% in");
    // Another student can neither renew nor revoke it.
    await expect(renewShareLink(stranger.actor, ok.shareId)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(revokeShareableResult(stranger.actor, ok.shareId)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("shares a live streak, a badge and topic mastery, and refuses when there is nothing to share", async () => {
    const { userId, actor } = await createLearner();
    await expect(createShareableResult(actor, { kind: "STREAK" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(createShareableResult(actor, { kind: "MASTERY" })).rejects.toMatchObject({ code: "CONFLICT" });

    const today = localDateString(new Date(), "Africa/Harare");
    await db.learnerStats.create({ data: { userId, currentStreak: 9, longestStreak: 9, lastStreakDate: dateColumnFromLocalDate(today) } });
    const streak = await createShareableResult(actor, { kind: "STREAK", nameMode: "USERNAME" });
    expect(streak.headline).toBe("I've studied 9 days in a row");
    const username = (await db.profile.findUniqueOrThrow({ where: { userId } })).username;
    expect((await getPublicShare(tokenOf(streak.url)))?.snapshot.displayName).toBe(username);

    const achievement = await db.achievement.create({
      data: { code: uniqueCode("SHARE"), name: "Habit formed", description: "Test badge.", category: "STREAK", iconKey: "flame", isActive: false, criteria: { type: "STREAK_DAYS", days: 1 } },
    });
    await expect(createShareableResult(actor, { kind: "ACHIEVEMENT", achievementId: achievement.id })).rejects.toMatchObject({ code: "NOT_FOUND" });
    await db.userAchievement.create({ data: { userId, achievementId: achievement.id } });
    const badge = await createShareableResult(actor, { kind: "ACHIEVEMENT", achievementId: achievement.id });
    expect(badge.headline).toBe("I earned the “Habit formed” badge");
  });

  it("MIN-01: a minor needs GRANTED guardian consent to share, and a withdrawal turns live links off at once", async () => {
    const { userId, actor } = await createLearner();
    const today = localDateString(new Date(), "Africa/Harare");
    await db.learnerStats.create({ data: { userId, currentStreak: 4, longestStreak: 4, lastStreakDate: dateColumnFromLocalDate(today) } });
    const consentRefusal = { code: "FORBIDDEN", details: expect.objectContaining({ reason: "GUARDIAN_CONSENT_REQUIRED", feature: "public_sharing" }) };

    for (const status of ["PENDING", "REFUSED", "WITHDRAWN"] as const) {
      await db.student.update({ where: { userId }, data: { isMinor: true, guardianConsentStatus: status } });
      await expect(createShareableResult(actor, { kind: "STREAK" })).rejects.toMatchObject(consentRefusal);
    }
    expect(await db.shareableResult.count({ where: { userId } })).toBe(0);

    await db.student.update({ where: { userId }, data: { guardianConsentStatus: "GRANTED", guardianConsentMethod: "SCHOOL", guardianConsentAt: new Date() } });
    const shared = await createShareableResult(actor, { kind: "STREAK", nameMode: "FIRST_NAME" });
    expect(await getPublicShare(tokenOf(shared.url))).not.toBeNull();

    await db.student.update({ where: { userId }, data: { guardianConsentStatus: "WITHDRAWN" } });
    expect(await getPublicShare(tokenOf(shared.url))).toBeNull();
    await expect(renewShareLink(actor, shared.shareId)).rejects.toMatchObject(consentRefusal);
    // The student can still see and turn off their links.
    expect((await listMyShares(actor)).map((share) => share.shareId)).toContain(shared.shareId);
    await expect(revokeShareableResult(actor, shared.shareId)).resolves.toEqual({ revoked: true });
  });

  it("returns null for malformed, unknown and expired tokens, and purges old shares", async () => {
    const { userId } = await createLearner();
    expect(await getPublicShare("not-a-token")).toBeNull();
    expect(await getPublicShare("A".repeat(43))).toBeNull();
    const createdAt = new Date(Date.now() - 400 * 86_400_000);
    const expired = await db.shareableResult.create({
      data: {
        userId,
        kind: "STREAK",
        tokenHash: sha256Hex(`expired-${userId}`),
        snapshot: { headline: "I've studied 3 days in a row", value: 3, unit: "DAYS", achievedOn: "2025-08-01" },
        createdAt,
        expiresAt: new Date(createdAt.getTime() + 300 * 86_400_000),
      },
    });
    expect(await purgeExpiredShares()).toBeGreaterThanOrEqual(1);
    expect(await db.shareableResult.findUnique({ where: { id: expired.id } })).toBeNull();
  });
});
