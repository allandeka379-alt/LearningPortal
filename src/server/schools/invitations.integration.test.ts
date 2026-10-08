import { describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { sha256Hex } from "@/server/lib/crypto";
import { getDevOutbox, latestDevMessage } from "@/server/messaging";
import { createParent, createStudent, createTeacher, createUser, uniqueEmail, uniquePhone } from "../../../tests/factories/index";
import {
  acceptInvitation,
  acceptMyInvitation,
  declineInvitation,
  getInvitationPreview,
  inviteSchoolMember,
  listMyPendingInvitations,
  listSchoolInvitations,
  resendSchoolInvitation,
  revokeSchoolInvitation,
} from "./invitations";
import { actorOf, errorCodeOf, rawActor, schoolWithAdmin, teacherOf } from "./testing";

// Every optional channel is OFF here, as by default (owner decision 2026-10-07): invitations, reset instructions and
// reminders are account email and go out anyway; nothing is ever texted while SMS is off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * School invitations: admin side (always an invitation, no account discovery; teachers and students only) and the
 * /invite/[token] acceptance rules. Negative cases: wrong account type, other school, expired / revoked / reused
 * links, suspended school, staff-issued admin invitation for someone else.
 */

function tokenFor(target: string): string {
  const message = latestDevMessage(target);
  const match = message?.text.match(/\/invite\/([A-Za-z0-9_-]+)/);
  if (!match?.[1]) throw new Error("no invitation link captured");
  return match[1];
}

describe("inviting and accepting", () => {
  it("invites a teacher who then accepts with a new account (TEACHER role granted, membership ACTIVE, audited)", async () => {
    const { school, admin, adminActor } = await schoolWithAdmin();
    const email = uniqueEmail("new.teacher");
    const result = await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "TEACHER" });
    expect(result).toMatchObject({ outcome: "invited", delivered: true });
    expect(result.sentTo).not.toBe(email);
    const token = tokenFor(email);

    const preview = await getInvitationPreview(token);
    expect(preview).toMatchObject({ state: "PENDING", kind: "SCHOOL_MEMBER", schoolName: school.name, schoolRole: "TEACHER", requiresMatchingContact: false });

    // A fresh account (e.g. registered as a parent) accepts: the teacher role and extension row are granted.
    const person = (await createParent({ email: uniqueEmail("someone") })).user;
    const accepted = await acceptInvitation(await actorOf(person.id), token);
    expect(accepted).toMatchObject({ redirectTo: "/teacher", schoolId: school.id });
    const user = await db.user.findUniqueOrThrow({ where: { id: person.id }, select: { roles: true, teacher: { select: { userId: true } } } });
    expect(user.roles).toEqual(expect.arrayContaining(["PARENT", "TEACHER"]));
    expect(user.teacher).not.toBeNull();
    const member = await db.schoolMember.findUniqueOrThrow({ where: { schoolId_userId_role: { schoolId: school.id, userId: person.id, role: "TEACHER" } } });
    expect(member).toMatchObject({ status: "ACTIVE", source: "INVITE", invitedById: admin.id });
    const invitation = await db.invitation.findUniqueOrThrow({ where: { tokenHash: sha256Hex(token) } });
    expect(invitation).toMatchObject({ acceptedByUserId: person.id, target: null });
    const audits = await db.auditLog.findMany({ where: { schoolId: school.id, targetUserId: person.id }, select: { action: true } });
    expect(audits.map((a) => a.action)).toEqual(expect.arrayContaining(["role.grant", "school_member.add"]));
    const inviterNotice = await db.notification.findFirst({ where: { userId: admin.id, type: "account.school_invitation_accepted" } });
    expect(inviterNotice).not.toBeNull();

    // The link is single-use.
    expect(await errorCodeOf(acceptInvitation(await actorOf(person.id), token))).toBe("CONFLICT");
    expect((await getInvitationPreview(token)).state).toBe("ACCEPTED");
  });

  it("emails the link while optional email is off, and never texts a phone number: the admin shares the link", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const email = uniqueEmail("emailed.teacher");
    const emailed = await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "TEACHER" });
    expect(emailed).toMatchObject({ delivered: true, channel: "email", notSentReason: null });
    expect(latestDevMessage(email, "email")?.tag).toBe("school.invitation");

    const phone = uniquePhone();
    const texted = await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: `0${phone.slice(4)}`, role: "STUDENT" });
    expect(texted).toMatchObject({ outcome: "invited", delivered: false, channel: "sms", notSentReason: "sms_switched_off" });
    expect(texted.inviteLink).toMatch(/\/invite\/[A-Za-z0-9_-]{32,}$/);
    expect(getDevOutbox({ to: phone })).toEqual([]);
    // The shared link works like an emailed one.
    expect((await getInvitationPreview(texted.inviteLink.split("/invite/")[1]!)).state).toBe("PENDING");
  });

  it("lets a student with that verified email accept from their invitations list", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const email = uniqueEmail("student");
    const student = (await createStudent({ email, emailVerified: true })).user;
    await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "STUDENT" });
    const notice = await db.notification.findFirst({ where: { userId: student.id, type: "account.school_invitation" } });
    expect(notice?.data).toMatchObject({ href: "/invite" });

    const mine = await listMyPendingInvitations(await actorOf(student.id));
    expect(mine).toEqual([expect.objectContaining({ schoolName: school.name, role: "STUDENT" })]);
    const result = await acceptMyInvitation(await actorOf(student.id), mine[0]!.id);
    expect(result.redirectTo).toBe("/app");
    const member = await db.schoolMember.findUniqueOrThrow({ where: { schoolId_userId_role: { schoolId: school.id, userId: student.id, role: "STUDENT" } } });
    expect(member.status).toBe("ACTIVE");
    expect((await db.student.findUniqueOrThrow({ where: { userId: student.id } })).schoolId).toBe(school.id);
    // Someone else cannot use the id (it is not addressed to them).
    const stranger = (await createStudent()).user;
    expect(await errorCodeOf(acceptMyInvitation(await actorOf(stranger.id), mine[0]!.id))).toBe("NOT_FOUND");
  });

  it("refuses the wrong kind of account", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const studentEmail = uniqueEmail("s");
    await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: studentEmail, role: "STUDENT" });
    const parent = (await createParent()).user;
    expect(await errorCodeOf(acceptInvitation(await actorOf(parent.id), tokenFor(studentEmail)))).toBe("FORBIDDEN");

    const teacherEmail = uniqueEmail("t");
    await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: teacherEmail, role: "TEACHER" });
    const student = (await createStudent()).user;
    expect(await errorCodeOf(acceptInvitation(await actorOf(student.id), tokenFor(teacherEmail)))).toBe("FORBIDDEN");
    // Nothing was granted.
    expect((await db.user.findUniqueOrThrow({ where: { id: student.id } })).roles).toEqual(["STUDENT"]);
  });

  it("re-sending refreshes the link (the old one stops working) and withdrawing closes it", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const email = uniqueEmail("r");
    const first = await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "TEACHER" });
    const oldToken = tokenFor(email);
    const again = await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "TEACHER" });
    expect(again).toMatchObject({ outcome: "reinvited", invitationId: first.invitationId });
    expect((await getInvitationPreview(oldToken)).state).toBe("INVALID");
    await resendSchoolInvitation(adminActor!, { schoolId: school.id, invitationId: first.invitationId }).catch((error: unknown) => {
      // The per-recipient send limit (3 per 15 minutes) may already be used up by this test; that is the limiter working.
      if ((error as { code?: string }).code !== "RATE_LIMITED") throw error;
    });
    const list = await listSchoolInvitations(adminActor!, { schoolId: school.id });
    expect(list).toEqual([expect.objectContaining({ id: first.invitationId, state: "PENDING", manageable: true, role: "TEACHER" })]);
    expect(list[0]!.targetMasked).not.toContain(email.split("@")[0]!.slice(3));

    await revokeSchoolInvitation(adminActor!, { schoolId: school.id, invitationId: first.invitationId });
    const latest = tokenFor(email);
    expect((await getInvitationPreview(latest)).state).toBe("REVOKED");
    const teacher = (await createTeacher()).user;
    expect(await errorCodeOf(acceptInvitation(await actorOf(teacher.id), latest))).toBe("NOT_FOUND");
    expect(await errorCodeOf(revokeSchoolInvitation(adminActor!, { schoolId: school.id, invitationId: first.invitationId }))).toBe("CONFLICT");
  });

  it("refuses expired links and declines cleanly", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const email = uniqueEmail("e");
    const { invitationId } = await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "TEACHER" });
    const token = tokenFor(email);
    await db.invitation.update({ where: { id: invitationId }, data: { expiresAt: new Date(Date.now() - 1000) } });
    expect((await getInvitationPreview(token)).state).toBe("EXPIRED");
    const teacher = (await createTeacher()).user;
    expect(await errorCodeOf(acceptInvitation(await actorOf(teacher.id), token))).toBe("NOT_FOUND");

    const email2 = uniqueEmail("d");
    await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email2, role: "TEACHER" });
    const token2 = tokenFor(email2);
    await declineInvitation(await actorOf(teacher.id), { token: token2 });
    expect((await getInvitationPreview(token2)).state).toBe("REVOKED");
    expect((await getInvitationPreview("not a token")).state).toBe("INVALID");
  });
});

describe("authorization and limits", () => {
  it("never lets a school admin invite another school admin, and refuses existing members", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    expect(await errorCodeOf(inviteSchoolMember(adminActor!, { schoolId: school.id, contact: uniqueEmail("a"), role: "SCHOOL_ADMIN" }))).toBe("VALIDATION");
    expect(await errorCodeOf(inviteSchoolMember(adminActor!, { schoolId: school.id, contact: "not a contact", role: "TEACHER" }))).toBe("VALIDATION");
    const email = uniqueEmail("member");
    const teacher = (await createTeacher({ email })).user;
    await db.schoolMember.create({ data: { schoolId: school.id, userId: teacher.id, role: "TEACHER", status: "ACTIVE", joinedAt: new Date() } });
    expect(await errorCodeOf(inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "TEACHER" }))).toBe("CONFLICT");
  });

  it("refuses other schools' admins, teachers and suspended schools", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const other = await schoolWithAdmin();
    const { invitationId } = await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: uniqueEmail("x"), role: "STUDENT" });
    expect(await errorCodeOf(inviteSchoolMember(other.adminActor!, { schoolId: school.id, contact: uniqueEmail("y"), role: "STUDENT" }))).toBe("FORBIDDEN");
    expect(await errorCodeOf(revokeSchoolInvitation(other.adminActor!, { schoolId: other.school.id, invitationId }))).toBe("NOT_FOUND");
    expect(await errorCodeOf(listSchoolInvitations(other.adminActor!, { schoolId: school.id }))).toBe("FORBIDDEN");
    const teacher = await teacherOf(school.id);
    expect(await errorCodeOf(inviteSchoolMember(await actorOf(teacher.user.id), { schoolId: school.id, contact: uniqueEmail("z"), role: "STUDENT" }))).toBe("FORBIDDEN");

    // Suspending the school stops invitations and acceptance.
    const email = uniqueEmail("late");
    await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "TEACHER" });
    const token = tokenFor(email);
    await db.school.update({ where: { id: school.id }, data: { status: "SUSPENDED" } });
    expect(await errorCodeOf(inviteSchoolMember(rawActor(adminActor!.userId), { schoolId: school.id, contact: uniqueEmail("w"), role: "TEACHER" }))).toBe("FORBIDDEN");
    const person = (await createTeacher()).user;
    expect(await errorCodeOf(acceptInvitation(await actorOf(person.id), token))).toBe("FORBIDDEN");
    expect(await db.schoolMember.count({ where: { schoolId: school.id, userId: person.id } })).toBe(0);
  });

  it("requires the invited, verified contact for a staff-issued school admin invitation", async () => {
    const { school, admin } = await schoolWithAdmin();
    const email = uniqueEmail("deputy");
    const token = "a".repeat(10) + Date.now().toString(36) + "b".repeat(30);
    await db.invitation.create({
      data: {
        kind: "SCHOOL_MEMBER",
        schoolId: school.id,
        schoolRole: "SCHOOL_ADMIN",
        channel: "EMAIL",
        target: email,
        tokenHash: sha256Hex(token),
        invitedById: admin.id,
        expiresAt: new Date(Date.now() + 86_400_000),
      },
    });
    expect(await getInvitationPreview(token)).toMatchObject({ state: "PENDING", requiresMatchingContact: true, schoolRole: "SCHOOL_ADMIN" });
    const someoneElse = (await createUser({ email: uniqueEmail("other"), emailVerified: true })).user;
    expect(await errorCodeOf(acceptInvitation(await actorOf(someoneElse.id), token))).toBe("FORBIDDEN");
    const unverified = (await createUser({ email, emailVerified: false })).user;
    expect(await errorCodeOf(acceptInvitation(await actorOf(unverified.id), token))).toBe("FORBIDDEN");
    await db.user.update({ where: { id: unverified.id }, data: { emailVerifiedAt: new Date() } });
    const result = await acceptInvitation(await actorOf(unverified.id), token);
    expect(result.redirectTo).toBe("/school");
    expect((await actorOf(unverified.id)).roles).toContain("SCHOOL_ADMIN");
  });
});
