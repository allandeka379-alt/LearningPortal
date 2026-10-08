import { beforeAll, describe, expect, it } from "vitest";
import { runAnnouncementFanout } from "@/server/cms/announcements/fanout";
import { db } from "@/server/db";
import { archiveClassAnnouncement, createClassAnnouncement, listClassAnnouncements, listTeacherAnnouncements } from "./announcements";
import { getMyClass } from "./student";
import { expectCode, harareLocal, makeClass, makeStudent, teachingWorld, type TeachingWorld } from "./testing";

let world: TeachingWorld;

beforeAll(async () => {
  world = await teachingWorld({ topics: 1 });
});

describe("class announcements (§22)", () => {
  it("publishes to the class: fan-out notifies members only, students read it on the class page", async () => {
    const member = await makeStudent({ schoolId: world.schoolId });
    const outsider = await makeStudent({ schoolId: world.schoolId });
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [member.userId] });
    const { id, publishedAt } = await createClassAnnouncement(world.teacher, { classId: cls.id, title: "Test on Friday", body: "Revise **chapter 3**.", pinned: "on" });

    const row = await db.announcement.findUniqueOrThrow({ where: { id } });
    expect(row).toMatchObject({ scope: "CLASS", classId: cls.id, schoolId: null, audienceRoles: ["STUDENT", "TEACHER"], pinned: true });
    expect(row.bodyHtml).toContain("<strong>chapter 3</strong>");
    expect(await db.job.count({ where: { type: "announcements.fanout", dedupeKey: { startsWith: `fanout:${id}:` } } })).toBe(1);
    expect(await db.auditLog.count({ where: { action: "announcement.publish", entityId: id } })).toBe(1);

    await expect(runAnnouncementFanout({ announcementId: id, publishedAt: publishedAt.toISOString() })).resolves.toMatchObject({ status: "done" });
    expect(await db.notification.count({ where: { announcementId: id, userId: member.userId } })).toBe(1);
    expect(await db.notification.count({ where: { announcementId: id, userId: outsider.userId } })).toBe(0);

    const page = await getMyClass(member.actor, cls.id);
    expect(page.announcements).toEqual([expect.objectContaining({ id, title: "Test on Friday", pinned: true })]);
    const teacherList = await listClassAnnouncements(world.teacher, cls.id);
    expect(teacherList[0]).toMatchObject({ id, state: "LIVE", isYours: true, author: "Tess" });
    expect((await listTeacherAnnouncements(world.teacher)).map((a) => a.id)).toContain(id);

    await archiveClassAnnouncement(world.teacher, { announcementId: id });
    expect((await getMyClass(member.actor, cls.id)).announcements).toEqual([]);
    const notification = await db.notification.findFirstOrThrow({ where: { announcementId: id, userId: member.userId } });
    expect(notification.expiresAt).not.toBeNull();
    await expectCode(archiveClassAnnouncement(world.teacher, { announcementId: id }), "NOT_FOUND");
  });

  it("keeps scheduled announcements hidden until their time and validates input", async () => {
    const member = await makeStudent();
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [member.userId] });
    const later = new Date(Date.now() + 3 * 3_600_000);
    const { id } = await createClassAnnouncement(world.teacher, { classId: cls.id, title: "Later", body: "Soon.", publish: "schedule", publishAt: harareLocal(later) });
    expect((await getMyClass(member.actor, cls.id)).announcements).toEqual([]);
    expect((await listClassAnnouncements(world.teacher, cls.id)).find((a) => a.id === id)?.state).toBe("SCHEDULED");
    await expectCode(createClassAnnouncement(world.teacher, { classId: cls.id, title: "x", body: "![img](asset:abc)" }), "VALIDATION");
    await expectCode(createClassAnnouncement(world.teacher, { classId: cls.id, title: "x", body: "y", publish: "schedule", publishAt: harareLocal(new Date(Date.now() - 3_600_000)) }), "VALIDATION");
    await expectCode(createClassAnnouncement(world.teacher, { classId: cls.id, title: "", body: "y" }), "VALIDATION");
  });

  it("refuses teachers of other classes", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const other = await teachingWorld({ topics: 1 });
    await expectCode(createClassAnnouncement(other.teacher, { classId: cls.id, title: "Hi", body: "Hello" }), "FORBIDDEN");
    await expectCode(listClassAnnouncements(other.teacher, cls.id), "FORBIDDEN");
    const { id } = await createClassAnnouncement(world.teacher, { classId: cls.id, title: "Mine", body: "Hello" });
    await expectCode(archiveClassAnnouncement(other.teacher, { announcementId: id }), "FORBIDDEN");
  });
});
