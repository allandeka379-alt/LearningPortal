import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createParent, createStudent } from "../../../tests/factories/identity";
import {
  getStudentSettings,
  getStudentTrack,
  updateDisplayName,
  updateDisplayPreferences,
  updateLeaderboardPrivacy,
  updateStudyPreferences,
} from "./student-settings";

async function student(options: { firstName?: string; lastName?: string | null } = {}) {
  const { user } = await createStudent({ student: { isMinor: false }, ...options });
  return { userId: user.id, actor: { userId: user.id, roles: ["STUDENT" as const] } };
}

const code = (error: unknown) => (isAppError(error) ? error.code : null);

describe("student settings service", () => {
  it("reads defaults honestly: leaderboards off, platform goal, profile values", async () => {
    const { actor } = await student({ firstName: "Tariro", lastName: "Moyo" });
    const settings = await getStudentSettings(actor);
    expect(settings.leaderboard.optIn).toBe(false);
    expect(settings.leaderboard.display).toBe("USERNAME");
    // ANONYMOUS previews the same stable pseudonym the leaderboards show.
    const { pseudonymFor } = await import("@/server/leaderboards/pseudonym");
    expect(settings.leaderboard.previews).toMatchObject({ REAL_NAME: "Tariro Moyo", FIRST_NAME: "Tariro M.", ANONYMOUS: pseudonymFor(actor.userId) });
    expect(settings.leaderboard.previews.ANONYMOUS).toMatch(/^Student #[0-9]{4}$/);
    expect(settings.study.dailyGoalMinutes).toBeNull();
    expect(settings.study.defaultDailyGoalMinutes).toBeGreaterThan(0);
    expect(settings.study.hasActivePlan).toBe(false);
    expect(settings.profile.timezone).toBe("Africa/Harare");
    const track = await getStudentTrack(actor);
    expect(track).toEqual({ qualificationId: null, qualificationName: null, examBoardName: null, yearGroupName: null });
  });

  it("updates the display name with validation", async () => {
    const { userId, actor } = await student();
    expect(await updateDisplayName(actor, { displayName: "  Tari  " })).toEqual({ displayName: "Tari" });
    expect((await db.profile.findUniqueOrThrow({ where: { userId } })).displayName).toBe("Tari");
    const error = await updateDisplayName(actor, { displayName: "" }).catch((e: unknown) => e);
    expect(code(error)).toBe("VALIDATION");
    expect(isAppError(error) && error.fieldErrors?.displayName?.length).toBeTruthy();
  });

  it("stores display preferences, time zone and daily goal", async () => {
    const { userId, actor } = await student();
    await updateDisplayPreferences(actor, { theme: "DARK" });
    await updateDisplayPreferences(actor, { fontScale: "LARGE" });
    const profile = await db.profile.findUniqueOrThrow({ where: { userId } });
    expect([profile.theme, profile.fontScale]).toEqual(["DARK", "LARGE"]);
    expect(code(await updateDisplayPreferences(actor, {}).catch((e: unknown) => e))).toBe("VALIDATION");

    await updateStudyPreferences(actor, { timezone: "Africa/Lusaka", dailyGoalMinutes: 50 });
    expect((await db.profile.findUniqueOrThrow({ where: { userId } })).timezone).toBe("Africa/Lusaka");
    expect((await db.learnerStats.findUniqueOrThrow({ where: { userId } })).dailyGoalMinutes).toBe(50);
    await updateStudyPreferences(actor, { timezone: "Africa/Lusaka", dailyGoalMinutes: null });
    expect((await db.learnerStats.findUniqueOrThrow({ where: { userId } })).dailyGoalMinutes).toBeNull();
    expect(code(await updateStudyPreferences(actor, { timezone: "Nowhere/City", dailyGoalMinutes: 30 }).catch((e: unknown) => e))).toBe("VALIDATION");
  });

  it("opts in and out of leaderboards; opting out removes leaderboard rows at once (§20)", async () => {
    const { userId, actor } = await student({ firstName: "Rudo", lastName: null });
    const result = await updateLeaderboardPrivacy(actor, { optIn: true, display: "FIRST_NAME" });
    expect(result).toMatchObject({ optIn: true, display: "FIRST_NAME", removedEntries: 0 });
    await db.leaderboardEntry.create({ data: { userId, value: 120, metric: "WEEKLY_XP", scopeType: "GLOBAL", periodKey: "2026-W41" } });

    const off = await updateLeaderboardPrivacy(actor, { optIn: false, display: "ANONYMOUS" });
    expect(off.removedEntries).toBe(1);
    expect(await db.leaderboardEntry.count({ where: { userId } })).toBe(0);
    const profile = await db.profile.findUniqueOrThrow({ where: { userId } });
    expect([profile.leaderboardOptIn, profile.leaderboardDisplay]).toEqual([false, "ANONYMOUS"]);

    // Both changes are audit-logged with the flags only (no names).
    const entries = await db.auditLog.findMany({
      where: { actorUserId: userId, action: "privacy.leaderboard.update" },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: { entityType: true, entityId: true, targetUserId: true, before: true, after: true, metadata: true },
    });
    expect(entries).toHaveLength(2);
    expect(entries[0]).toMatchObject({ entityType: "Profile", entityId: userId, targetUserId: userId, after: { optIn: true, display: "FIRST_NAME" } });
    expect(entries[1]).toMatchObject({
      before: { optIn: true, display: "FIRST_NAME" },
      after: { optIn: false, display: "ANONYMOUS" },
      metadata: { removedEntries: 1 },
    });
  });

  it("refuses a name mode the profile cannot show", async () => {
    const { userId, actor } = await student({ firstName: "Rudo" });
    await db.profile.update({ where: { userId }, data: { username: null, firstName: null } });
    for (const display of ["USERNAME", "FIRST_NAME", "REAL_NAME"] as const) {
      const error = await updateLeaderboardPrivacy(actor, { optIn: true, display }).catch((e: unknown) => e);
      expect(code(error)).toBe("VALIDATION");
    }
    expect((await updateLeaderboardPrivacy(actor, { optIn: true, display: "ANONYMOUS" })).optIn).toBe(true);
  });

  it("MIN-01: a minor needs GRANTED guardian consent for the full-name leaderboard mode", async () => {
    const { user } = await createStudent({ firstName: "Rudo", lastName: "Chikwanha" });
    const actor = { userId: user.id, roles: ["STUDENT" as const] };
    // Self-registered minors start with PENDING consent.
    const error = await updateLeaderboardPrivacy(actor, { optIn: true, display: "REAL_NAME" }).catch((e: unknown) => e);
    expect(code(error)).toBe("VALIDATION");
    expect(isAppError(error) && error.fieldErrors?.display?.[0]).toMatch(/parent or guardian's consent/);
    const settings = await getStudentSettings(actor);
    expect(settings.leaderboard).toMatchObject({ realNameNeedsConsent: true, previews: { REAL_NAME: null, FIRST_NAME: "Rudo C." } });
    expect((await updateLeaderboardPrivacy(actor, { optIn: true, display: "FIRST_NAME" })).display).toBe("FIRST_NAME");

    // A stored REAL_NAME (chosen while consent stood) is shown as first name + initial once consent is gone.
    await db.student.update({ where: { userId: user.id }, data: { guardianConsentStatus: "GRANTED", guardianConsentMethod: "SCHOOL", guardianConsentAt: new Date() } });
    expect((await updateLeaderboardPrivacy(actor, { optIn: true, display: "REAL_NAME" })).display).toBe("REAL_NAME");
    expect((await getStudentSettings(actor)).leaderboard).toMatchObject({ display: "REAL_NAME", realNameNeedsConsent: false, previews: { REAL_NAME: "Rudo Chikwanha" } });
    await db.student.update({ where: { userId: user.id }, data: { guardianConsentStatus: "WITHDRAWN" } });
    expect((await getStudentSettings(actor)).leaderboard).toMatchObject({ display: "FIRST_NAME", realNameNeedsConsent: true });
  });

  it("is for students only", async () => {
    const { user } = await createParent();
    const parent = { userId: user.id, roles: ["PARENT" as const] };
    expect(code(await getStudentSettings(parent).catch((e: unknown) => e))).toBe("FORBIDDEN");
    expect(code(await updateLeaderboardPrivacy(parent, { optIn: true, display: "ANONYMOUS" }).catch((e: unknown) => e))).toBe("FORBIDDEN");
  });
});
