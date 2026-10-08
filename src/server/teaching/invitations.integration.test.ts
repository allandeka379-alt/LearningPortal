import { beforeAll, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { getDevOutbox, latestDevMessage } from "@/server/messaging";
import { uniqueEmail, uniquePhone, uniqueUsername } from "../../../tests/factories/index";
import { addStudentsToClass, acceptClassInvitation, declineClassInvitation, getClassInvitation, listMyClassInvitations, revokeClassInvitation } from "./invitations";
import { createAssignment } from "./assignments";
import { getClassRoster } from "./classes";
import { expectCode, harareLocal, makeClass, makeStudent, teachingWorld, type TeachingWorld } from "./testing";

// Every optional channel is OFF here, as by default (owner decision 2026-10-07): invitations, reset instructions and
// reminders are account email and go out anyway; nothing is ever texted while SMS is off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

let world: TeachingWorld;

beforeAll(async () => {
  world = await teachingWorld();
});

function tokenFrom(text: string | undefined): string {
  const token = text?.match(/\/app\/classes\/invite\/([A-Za-z0-9_-]{43})/)?.[1];
  if (!token) throw new Error("no invitation link in the message");
  return token;
}

describe("adding students (§22)", () => {
  it("adds a student of the same school at once (by username) and hands them the live work", async () => {
    const student = await makeStudent({ schoolId: world.schoolId, firstName: "Nyasha" });
    const username = uniqueUsername("hhs").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 30);
    await db.user.update({ where: { id: student.userId }, data: { loginUsername: username, passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$dGVzdA$dGVzdA" } });
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const live = await createAssignment(world.teacher, {
      classId: cls.id,
      type: "PRACTICE",
      title: "Topic practice",
      topicIds: [world.setup.topicIds[0]],
      questionCount: "3",
      dueAt: harareLocal(new Date(Date.now() + 3 * 86_400_000)),
    });

    const { results } = await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: `${username.toUpperCase()}\n` });
    expect(results).toEqual([{ identifier: username.toUpperCase(), outcome: "added", name: "Nyasha" }]);
    expect(await db.classMember.findUnique({ where: { classId_userId: { classId: cls.id, userId: student.userId } } })).toMatchObject({ status: "ACTIVE", source: "ADDED_BY_STAFF" });
    expect(await db.assignmentProgress.findUnique({ where: { assignmentId_userId: { assignmentId: live.id, userId: student.userId } } })).toMatchObject({ status: "NOT_STARTED" });
    expect(await db.assignment.findUniqueOrThrow({ where: { id: live.id } })).toMatchObject({ assignedCount: 1 });

    const again = await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: username });
    expect(again.results[0]).toMatchObject({ outcome: "already_member" });
  });

  it("never resolves usernames outside the class's school", async () => {
    const other = await teachingWorld();
    const foreign = await makeStudent({ schoolId: other.schoolId });
    const username = `u${Date.now().toString(36)}${Math.floor(Math.random() * 1e6)}`;
    await db.user.update({ where: { id: foreign.userId }, data: { loginUsername: username, passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$dGVzdA$dGVzdA" } });
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const { results } = await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: `${username}, nobody-at-all-xyz` });
    expect(results.map((r) => r.outcome)).toEqual(["rejected", "rejected"]);
    expect(results[0]).toEqual(results[0] && { identifier: username, outcome: "rejected", message: "No student with this username at your school." });
    expect(await db.classMember.count({ where: { classId: cls.id } })).toBe(0);
  });

  it("invites anyone else by email / phone with the same outcome whether or not an account exists", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, name: "Form 4 Green" });
    const outsider = await makeStudent(); // a student of no school: invited, never added directly
    const outsiderEmail = (await db.user.findUniqueOrThrow({ where: { id: outsider.userId } })).emailNormalized as string;
    const stranger = uniqueEmail("new-student");
    const { results } = await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: `${outsiderEmail}\n${stranger}\nnot an email@` });
    expect(results.map((r) => r.outcome)).toEqual(["invited", "invited", "rejected"]);
    expect(results[0]).toMatchObject({ sentTo: expect.stringContaining("***"), delivered: true });
    expect(await db.classMember.count({ where: { classId: cls.id } })).toBe(0);
    expect(await db.notification.count({ where: { userId: outsider.userId, type: "class.invitation" } })).toBe(1);
    const invitations = await db.invitation.findMany({ where: { classId: cls.id } });
    expect(invitations).toHaveLength(2);
    expect(invitations.every((i) => i.kind === "CLASS_MEMBER" && /^[0-9a-f]{64}$/.test(i.tokenHash))).toBe(true);
    const roster = await getClassRoster(world.teacher, cls.id);
    expect(roster.invitations).toHaveLength(2);
    expect(roster.invitations.every((i) => i.sentTo.includes("***"))).toBe(true);
    expect(await db.auditLog.count({ where: { action: "invitation.create", entityId: { in: invitations.map((i) => i.id) } } })).toBe(2);

    // Re-inviting refreshes the same invitation.
    await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: stranger });
    expect(await db.invitation.findFirstOrThrow({ where: { classId: cls.id, target: stranger } })).toMatchObject({ sendCount: 2 });
  });

  it("emails invitations while optional email is off; a phone number is not texted and the teacher gets the link to share", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, name: "Form 4 Gold" });
    const email = uniqueEmail("emailed-student");
    const phone = uniquePhone();
    const { results } = await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: `${email}\n${phone}` });
    expect(results[0]).toMatchObject({ outcome: "invited", delivered: true, notSentReason: null });
    expect(latestDevMessage(email, "email")?.tag).toBe("teaching.class_invitation");
    expect(results[1]).toMatchObject({ outcome: "invited", delivered: false, notSentReason: "sms_switched_off" });
    expect(results[1]?.outcome === "invited" && results[1].inviteLink).toMatch(/\/app\/classes\/invite\//);
    expect(getDevOutbox({ to: phone })).toEqual([]);
  });
});

describe("the student's side of invitations", () => {
  it("accepts by link, joining as an ACTIVE member; the link then stops working", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, name: "Form 2 Red" });
    const email = uniqueEmail("invitee");
    await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: email });
    const token = tokenFrom(latestDevMessage(email)?.text);
    const student = await makeStudent();
    await expect(getClassInvitation(student.actor, token)).resolves.toMatchObject({ classId: cls.id, className: "Form 2 Red", invitedBy: "Tess" });
    await expect(acceptClassInvitation(student.actor, { token })).resolves.toEqual({ classId: cls.id });
    expect(await db.classMember.findUnique({ where: { classId_userId: { classId: cls.id, userId: student.userId } } })).toMatchObject({ status: "ACTIVE", source: "INVITE" });
    const invitation = await db.invitation.findFirstOrThrow({ where: { classId: cls.id } });
    expect(invitation).toMatchObject({ acceptedByUserId: student.userId, target: null });
    await expectCode(acceptClassInvitation(student.actor, { token }), "NOT_FOUND");
  });

  it("lists invitations to the student's VERIFIED email only, and lets them decline", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const student = await makeStudent();
    const user = await db.user.findUniqueOrThrow({ where: { id: student.userId } });
    await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: user.emailNormalized as string });
    expect(await listMyClassInvitations(student.actor)).toEqual([]); // email not verified yet
    await db.user.update({ where: { id: student.userId }, data: { emailVerifiedAt: new Date() } });
    const listed = await listMyClassInvitations(student.actor);
    expect(listed).toEqual([expect.objectContaining({ classId: cls.id })]);
    const other = await makeStudent();
    await expectCode(declineClassInvitation(other.actor, { invitationId: listed[0]!.id }), "NOT_FOUND");
    await declineClassInvitation(student.actor, { invitationId: listed[0]!.id });
    expect(await listMyClassInvitations(student.actor)).toEqual([]);
    expect(await db.classMember.count({ where: { classId: cls.id } })).toBe(0);
  });

  it("refuses revoked and expired invitations, and non-students", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const a = uniqueEmail("revoked");
    const b = uniqueEmail("expired");
    await addStudentsToClass(world.teacher, { classId: cls.id, identifiers: `${a}\n${b}` });
    const tokenA = tokenFrom(latestDevMessage(a)?.text);
    const tokenB = tokenFrom(latestDevMessage(b)?.text);
    const revoked = await db.invitation.findFirstOrThrow({ where: { classId: cls.id, target: a } });
    await revokeClassInvitation(world.teacher, { classId: cls.id, invitationId: revoked.id });
    await db.invitation.updateMany({ where: { classId: cls.id, target: b }, data: { expiresAt: new Date(Date.now() - 1000) } });
    const student = await makeStudent();
    await expectCode(acceptClassInvitation(student.actor, { token: tokenA }), "NOT_FOUND");
    await expectCode(acceptClassInvitation(student.actor, { token: tokenB }), "NOT_FOUND");
    await expectCode(acceptClassInvitation(world.teacher, { token: tokenB }), "FORBIDDEN");
    await expectCode(getClassInvitation(student.actor, "not-a-token"), "NOT_FOUND");
  });

  it("does not let other teachers add or invite students to a class they don't teach", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const other = await teachingWorld();
    await expectCode(addStudentsToClass(other.teacher, { classId: cls.id, identifiers: uniqueEmail() }), "FORBIDDEN");
  });
});
