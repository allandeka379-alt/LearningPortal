import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { addDailyActivity } from "@/server/analytics/testing/fixtures";
import { db } from "@/server/db";
import { createParent, createStudent, grantLearnerFeatures, linkParent } from "../../../tests/factories/index";
import { hashLinkCode } from "./codes";
import { getParentDigestPreference, runParentDigest, setParentDigestPreference } from "./digest";
import { expireLinkInvites } from "./jobs";
import { childHasParentReports } from "./queries";
import { actorOf, errorCodeOf } from "./testing";

/** Weekly / monthly parent summaries and the invite-expiry sweep. Assertions only look at this file's own rows. */

describe("digest preference", () => {
  it("defaults to OFF, saves WEEKLY without losing other preferences, rejects nonsense", async () => {
    const parent = (await createParent()).user;
    await db.profile.update({ where: { userId: parent.id }, data: { notificationPrefs: { version: 1, dailyReminderTime: "17:00" } } });
    const actor = await actorOf(parent.id);
    expect(await getParentDigestPreference(actor)).toBe("OFF");
    expect(await setParentDigestPreference(actor, "WEEKLY")).toBe("WEEKLY");
    const profile = await db.profile.findUniqueOrThrow({ where: { userId: parent.id } });
    expect(profile.notificationPrefs).toEqual({ version: 1, dailyReminderTime: "17:00", parentDigest: "WEEKLY" });
    expect(await errorCodeOf(setParentDigestPreference(actor, "HOURLY"))).toBe("VALIDATION");
    expect(await errorCodeOf(setParentDigestPreference(await actorOf((await createStudent()).user.id), "WEEKLY"))).toBe("FORBIDDEN");
  });
});

describe("family.parentDigest", () => {
  it("sends one deduplicated summary to opted-in parents, honouring each link's flags", async () => {
    const now = new Date();
    const today = localDateString(now, "Africa/Harare");
    const child = (await createStudent({ firstName: "Nyasha" })).user;
    const privateChild = (await createStudent({ firstName: "Farai" })).user;
    // The summary is a detailed parent report (§31): both children's plans include it.
    await grantLearnerFeatures(child.id, { parentReports: true });
    await grantLearnerFeatures(privateChild.id, { parentReports: true });
    await addDailyActivity(child.id, addDays(today, -1), { studySeconds: 3600 });
    await addDailyActivity(child.id, addDays(today, -3), { studySeconds: 1200 });
    await addDailyActivity(privateChild.id, addDays(today, -1), { studySeconds: 600 });

    const weekly = (await createParent()).user;
    await linkParent({ parentUserId: weekly.id, studentUserId: child.id });
    const { link: privateLink } = await linkParent({ parentUserId: weekly.id, studentUserId: privateChild.id });
    await db.parentStudentLink.update({ where: { id: privateLink.id }, data: { canViewStudyActivity: false, canViewTestResults: false } });
    await setParentDigestPreference(await actorOf(weekly.id), "WEEKLY");

    const off = (await createParent()).user;
    await linkParent({ parentUserId: off.id, studentUserId: child.id });

    const result = await runParentDigest({ periodStart: now, now });
    expect(result.kinds).toContain("WEEKLY");
    await runParentDigest({ periodStart: now, now }); // retried run: no duplicate

    const notes = await db.notification.findMany({ where: { userId: weekly.id, type: "parent.digest" } });
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({ category: "PARENT", title: "Your weekly summary", dedupeKey: `parent.digest:WEEKLY:${today}` });
    expect(notes[0]?.body).toContain("Nyasha studied 1 hour 20 minutes on 2 days this week.");
    expect(notes[0]?.body).toContain("Farai shares subjects and exam dates with you.");
    expect(notes[0]?.body).not.toMatch(/Farai studied/);
    expect(await db.notification.count({ where: { userId: off.id, type: "parent.digest" } })).toBe(0);
  });

  it("summarises only children whose own plan includes parent reports; no message when none does", async () => {
    const now = new Date();
    const today = localDateString(now, "Africa/Harare");
    const reported = (await createStudent({ firstName: "Chiedza" })).user;
    const basic = (await createStudent({ firstName: "Tinashe" })).user;
    await grantLearnerFeatures(reported.id, { parentReports: true });
    // The shared default (FREE) plan may hold any values (tests/README.md); this case needs it without reports.
    if (await childHasParentReports(basic.id)) return;
    await addDailyActivity(reported.id, addDays(today, -1), { studySeconds: 1800 });
    await addDailyActivity(basic.id, addDays(today, -1), { studySeconds: 2400 });

    const both = (await createParent()).user;
    await linkParent({ parentUserId: both.id, studentUserId: reported.id });
    await linkParent({ parentUserId: both.id, studentUserId: basic.id });
    await setParentDigestPreference(await actorOf(both.id), "WEEKLY");
    const basicOnly = (await createParent()).user;
    await linkParent({ parentUserId: basicOnly.id, studentUserId: basic.id });
    await setParentDigestPreference(await actorOf(basicOnly.id), "WEEKLY");

    await runParentDigest({ periodStart: now, now });

    const [note] = await db.notification.findMany({ where: { userId: both.id, type: "parent.digest" } });
    expect(note?.body).toContain("Chiedza studied 30 minutes on 1 day this week.");
    expect(note?.body).not.toContain("Tinashe");
    expect(await db.notification.count({ where: { userId: basicOnly.id, type: "parent.digest" } })).toBe(0);
  });
});

describe("family.expireLinkInvites", () => {
  it("ends expired codes and requests (REVOKED, reason expired, hash cleared) and leaves live ones", async () => {
    const student = (await createStudent()).user;
    const parent = (await createParent()).user;
    // Dates far in the past isolate this test's rows from every other file's (the sweep runs "as of" 2001).
    const created = new Date("2001-01-01T00:00:00Z");
    const expiredCode = await db.parentStudentLink.create({
      data: {
        studentUserId: student.id,
        status: "PENDING",
        initiatedBy: "STUDENT",
        inviteCodeHash: hashLinkCode(randomUUID()),
        inviteExpiresAt: new Date("2001-01-02T00:00:00Z"),
        createdAt: created,
      },
    });
    const expiredRequest = await db.parentStudentLink.create({
      data: { parentUserId: parent.id, studentUserId: student.id, status: "PENDING", initiatedBy: "PARENT", inviteExpiresAt: new Date("2001-01-15T00:00:00Z"), createdAt: created },
    });
    const live = await db.parentStudentLink.create({
      data: { parentUserId: parent.id, status: "PENDING", initiatedBy: "PARENT", inviteCodeHash: hashLinkCode(randomUUID()), inviteExpiresAt: new Date("2001-12-01T00:00:00Z"), createdAt: created },
    });

    expect(await expireLinkInvites(new Date("2001-06-01T00:00:00Z"))).toBeGreaterThanOrEqual(2);
    for (const id of [expiredCode.id, expiredRequest.id]) {
      expect(await db.parentStudentLink.findUniqueOrThrow({ where: { id } })).toMatchObject({ status: "REVOKED", revokeReason: "expired", inviteCodeHash: null });
    }
    expect((await db.parentStudentLink.findUniqueOrThrow({ where: { id: live.id } })).status).toBe("PENDING");
  });
});
