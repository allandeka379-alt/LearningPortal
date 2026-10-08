import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { createClass, createParent, createSchool, createSchoolMember, createStudent, createUser, ensureTestCountry, linkParent, uniqueSuffix } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import { fanoutDedupeKey, notificationBody, resolveAudienceBatch, runAnnouncementFanout } from "./fanout";
import { announcementState, instantToLocalDateTime, localDateTimeToInstant } from "./schemas";
import {
  archiveAnnouncement,
  createAnnouncement,
  expireAnnouncement,
  getAnnouncement,
  listAnnouncements,
  publishAnnouncementNow,
  unscheduleAnnouncement,
  updateAnnouncement,
} from "./service";

function actorFor(userId: string, roles: Role[]): CmsActor {
  return { kind: "user", userId, roles };
}

async function admin(): Promise<CmsActor> {
  const { user } = await createUser({ roles: ["ADMIN"] });
  return actorFor(user.id, ["ADMIN"]);
}

async function fanoutJobs(announcementId: string) {
  return db.job.findMany({ where: { type: "announcements.fanout", dedupeKey: { startsWith: `fanout:${announcementId}:` } }, orderBy: { createdAt: "asc" } });
}

describe("pure rules", () => {
  it("derives states and converts Harare wall-clock times", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    expect(announcementState({ publishedAt: null, expiresAt: null, archivedAt: null }, now)).toBe("DRAFT");
    expect(announcementState({ publishedAt: new Date("2026-10-06T00:00:00Z"), expiresAt: null, archivedAt: null }, now)).toBe("SCHEDULED");
    expect(announcementState({ publishedAt: new Date("2026-10-01T00:00:00Z"), expiresAt: null, archivedAt: null }, now)).toBe("LIVE");
    expect(announcementState({ publishedAt: new Date("2026-10-01T00:00:00Z"), expiresAt: new Date("2026-10-02T00:00:00Z"), archivedAt: null }, now)).toBe("EXPIRED");
    expect(announcementState({ publishedAt: null, expiresAt: null, archivedAt: now }, now)).toBe("ARCHIVED");

    expect(localDateTimeToInstant("2026-10-05T14:30", "Africa/Harare")?.toISOString()).toBe("2026-10-05T12:30:00.000Z");
    expect(localDateTimeToInstant("2026-02-30T10:00", "Africa/Harare")).toBeNull();
    expect(localDateTimeToInstant("tomorrow", "Africa/Harare")).toBeNull();
    expect(instantToLocalDateTime(new Date("2026-10-05T12:30:00Z"), "Africa/Harare")).toBe("2026-10-05T14:30");
    expect(notificationBody("**Exams** start on _Monday_.\n\n- Bring a pen", "Fallback")).toContain("Exams start on Monday");
    expect(notificationBody("", "Fallback")).toBe("Fallback");
    expect(fanoutDedupeKey("a", new Date(5), "b")).toBe("fanout:a:5:b");
  });
});

describe("announcement lifecycle", () => {
  it("creates a draft, schedules it, unschedules, publishes now (enqueueing fan-out), expires and archives — all audited", async () => {
    const actor = await admin();
    const { school } = await createSchool();
    const title = `Prize giving ${uniqueSuffix()}`;
    const now = new Date();

    const draft = await createAnnouncement(actor, { scope: "SCHOOL", schoolRef: school.slug, title, body: "Prize giving is on **Friday** at 10:00.", audienceRoles: ["STUDENT", "PARENT"] });
    expect(draft.state).toBe("DRAFT");
    const stored = await db.announcement.findUniqueOrThrow({ where: { id: draft.id } });
    expect(stored).toMatchObject({ scope: "SCHOOL", schoolId: school.id, authorId: actor.userId, publishedAt: null });
    expect(stored.bodyHtml).toContain("<strong>Friday</strong>");
    expect(await fanoutJobs(draft.id)).toHaveLength(0);

    const later = instantToLocalDateTime(new Date(now.getTime() + 3 * 86_400_000), "Africa/Harare");
    const scheduled = await updateAnnouncement(actor, {
      announcementId: draft.id,
      scope: "SCHOOL",
      schoolRef: school.id,
      title,
      body: "Prize giving is on **Friday** at 10:00.",
      audienceRoles: ["STUDENT", "PARENT"],
      publish: "schedule",
      publishAt: later,
    });
    expect(scheduled.state).toBe("SCHEDULED");
    const [scheduledJob] = await fanoutJobs(draft.id);
    expect(scheduledJob?.status).toBe("PENDING");
    expect(scheduledJob!.runAt.getTime()).toBeGreaterThan(now.getTime() + 2 * 86_400_000);

    await unscheduleAnnouncement(actor, { announcementId: draft.id });
    expect((await getAnnouncement(actor, draft.id)).state).toBe("DRAFT");

    await publishAnnouncementNow(actor, { announcementId: draft.id });
    const live = await getAnnouncement(actor, draft.id);
    expect(live.state).toBe("LIVE");
    expect(live.editable).toBe(false);
    expect(await fanoutJobs(draft.id)).toHaveLength(2);
    await expect(
      updateAnnouncement(actor, { announcementId: draft.id, scope: "SCHOOL", schoolRef: school.id, title: "Changed title", body: "x" }),
    ).rejects.toMatchObject({ code: "CONFLICT" });

    await expireAnnouncement(actor, { announcementId: draft.id });
    expect((await getAnnouncement(actor, draft.id)).state).toBe("EXPIRED");
    await archiveAnnouncement(actor, { announcementId: draft.id });
    expect((await getAnnouncement(actor, draft.id)).state).toBe("ARCHIVED");
    await expect(archiveAnnouncement(actor, { announcementId: draft.id })).rejects.toMatchObject({ code: "CONFLICT" });

    const entries = await db.auditLog.findMany({ where: { entityType: "Announcement", entityId: draft.id }, orderBy: { createdAt: "asc" } });
    const operations = entries.map((entry) => (entry.metadata as { operation: string }).operation);
    // Each step is recorded under its own registry key.
    expect(entries.map((entry) => entry.action)).toEqual(operations);
    expect(operations).toEqual([
      "announcement.create",
      "announcement.update",
      "announcement.unschedule",
      "announcement.publish",
      "announcement.expire",
      "announcement.archive",
    ]);

    const listed = await listAnnouncements(actor, { q: title, state: "ARCHIVED" });
    expect(listed.items.map((item) => item.id)).toEqual([draft.id]);
    expect(listed.items[0]?.target).toBe(school.name);
  });

  it("validates scope, audience, schedule and body; refuses non-admins", async () => {
    const actor = await admin();
    const { user: editor } = await createUser({ roles: ["CONTENT_EDITOR"] });
    const { school } = await createSchool();
    const base = { title: "Valid title", body: "Hello everyone" };
    await expect(createAnnouncement(actorFor(editor.id, ["CONTENT_EDITOR"]), { ...base, scope: "GLOBAL" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createAnnouncement(actor, { ...base, scope: "SCHOOL" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { schoolRef: expect.any(Array) } });
    await expect(createAnnouncement(actor, { ...base, scope: "SCHOOL", schoolRef: "no-such-school-slug-x" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createAnnouncement(actor, { ...base, scope: "CLASS", classRef: "ZZZZZZZZZZ", audienceRoles: ["SCHOOL_ADMIN"] })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { audienceRoles: expect.any(Array) },
    });
    await expect(createAnnouncement(actor, { ...base, scope: "SCHOOL", schoolRef: school.slug, countryId: (await ensureTestCountry()).id })).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await expect(createAnnouncement(actor, { ...base, scope: "GLOBAL", publish: "schedule", publishAt: "2020-01-01T10:00" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { publishAt: expect.any(Array) },
    });
    await expect(createAnnouncement(actor, { ...base, scope: "GLOBAL", body: "See ![chart](https://example.com/x.png)" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { body: expect.any(Array) },
    });
  });
});

describe("fan-out", () => {
  it("notifies a school's chosen audience once (students + parents of its students), and is idempotent", async () => {
    const actor = await admin();
    const { school } = await createSchool();
    const { user: student } = await createStudent();
    const { user: otherStudent } = await createStudent();
    const { user: teacher } = await createUser({ roles: ["TEACHER"] });
    const { user: parent } = await createParent();
    const { user: unrelatedParent } = await createParent();
    await createSchoolMember({ schoolId: school.id, userId: student.id, role: "STUDENT" });
    await createSchoolMember({ schoolId: school.id, userId: teacher.id, role: "TEACHER" });
    await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    await linkParent({ parentUserId: unrelatedParent.id, studentUserId: otherStudent.id });

    const { id } = await createAnnouncement(actor, {
      scope: "SCHOOL",
      schoolRef: school.slug,
      title: "Term dates",
      body: "Term 3 starts on **8 September**.",
      audienceRoles: ["STUDENT", "PARENT"],
      publish: "now",
    });
    const announcement = await db.announcement.findUniqueOrThrow({ where: { id } });
    const payload = { announcementId: id, publishedAt: announcement.publishedAt!.toISOString() };

    const result = await runAnnouncementFanout(payload, { now: new Date(Date.now() + 1000), batchSize: 1, maxBatches: 1 });
    expect(result).toMatchObject({ status: "continued", recipients: 1 });
    // Small batches + a low cap exercise the keyset continuation: run until done.
    let next = result;
    let guard = 0;
    while (next.status === "continued" && guard < 10) {
      next = await runAnnouncementFanout({ ...payload, afterUserId: next.afterUserId }, { now: new Date(Date.now() + 1000), batchSize: 1, maxBatches: 1 });
      guard += 1;
    }
    expect(next.status).toBe("done");

    const recipients = (await db.notification.findMany({ where: { announcementId: id }, select: { userId: true, type: true, category: true, body: true } })).map((n) => n.userId);
    expect(recipients.sort()).toEqual([student.id, parent.id].sort());
    const one = await db.notification.findFirstOrThrow({ where: { announcementId: id, userId: student.id } });
    expect(one).toMatchObject({ type: "announcement.published", category: "ANNOUNCEMENT", title: "Term dates" });
    expect(one.body).toContain("8 September");
    expect((await db.announcement.findUniqueOrThrow({ where: { id } })).fannedOutAt).not.toBeNull();
    // External delivery is queued as soon as the fan-out is complete.
    expect(await db.job.count({ where: { type: "notifications.announcementDelivery", dedupeKey: `announce-deliver:${id}` } })).toBe(1);

    // A retried job never duplicates notifications.
    const again = await runAnnouncementFanout(payload, { now: new Date(Date.now() + 1000) });
    expect(again).toMatchObject({ status: "done", notified: 0, recipients: 2 });
    expect(await db.notification.count({ where: { announcementId: id } })).toBe(2);
    expect((await getAnnouncement(actor, id)).recipients).toBe(2);

    // Expiring hides the delivered notifications.
    const expired = await expireAnnouncement(actor, { announcementId: id });
    expect(expired.notificationsHidden).toBe(2);
  });

  it("targets a class (students + teachers by default) and skips stale, archived or future jobs", async () => {
    const actor = await admin();
    const { user: student } = await createStudent();
    const fixture = await createClass({ studentUserIds: [student.id] });
    const teacherId = fixture.teachers[0]!.userId;

    const { id } = await createAnnouncement(actor, { scope: "CLASS", classRef: fixture.class.joinCode!, title: "Homework", body: "Read chapter 4.", publish: "now" });
    const publishedAt = (await db.announcement.findUniqueOrThrow({ where: { id } })).publishedAt!;
    const spec = await db.announcement.findUniqueOrThrow({ where: { id }, select: { scope: true, schoolId: true, classId: true, countryId: true, audienceRoles: true } });
    expect((await resolveAudienceBatch(spec, null, 100)).sort()).toEqual([student.id, teacherId].sort());

    const stale = await runAnnouncementFanout({ announcementId: id, publishedAt: new Date(publishedAt.getTime() - 60_000).toISOString() });
    expect(stale).toEqual({ status: "skipped", reason: "superseded" });

    const done = await runAnnouncementFanout({ announcementId: id, publishedAt: publishedAt.toISOString() }, { now: new Date(Date.now() + 1000) });
    expect(done).toMatchObject({ status: "done", notified: 2 });

    await archiveAnnouncement(actor, { announcementId: id });
    expect(await runAnnouncementFanout({ announcementId: id, publishedAt: publishedAt.toISOString() })).toEqual({ status: "skipped", reason: "archived" });
    expect(await db.notification.count({ where: { announcementId: id, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] } })).toBe(0);
  });

  it("resolves GLOBAL audiences by role and country without writing anything", async () => {
    const country = await ensureTestCountry();
    const { user: teacher } = await createUser({ roles: ["TEACHER"] });
    const { user: student } = await createStudent();
    const { user: suspended } = await createUser({ roles: ["TEACHER"], status: "SUSPENDED" });
    await db.profile.updateMany({ where: { userId: { in: [teacher.id, student.id, suspended.id] } }, data: { countryId: country.id } });
    const spec = { scope: "GLOBAL" as const, schoolId: null, classId: null, countryId: country.id, audienceRoles: ["TEACHER" as const] };
    const batch = await resolveAudienceBatch(spec, null, 100_000);
    expect(batch).toContain(teacher.id);
    expect(batch).not.toContain(student.id);
    expect(batch).not.toContain(suspended.id);
  });
});
