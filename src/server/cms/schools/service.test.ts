import { describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { getDevOutbox, latestDevMessage } from "@/server/messaging";
import {
  createClass,
  createSchool as createSchoolFixture,
  createSchoolMember,
  createStudent,
  createUser,
  ensureTestCountry,
  uniqueEmail,
  uniquePhone,
  uniqueSuffix,
} from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import {
  allowedSchoolTransitions,
  changeSchoolStatus,
  createSchool,
  getSchool,
  getSchoolAnalyticsForAdmin,
  inviteSchoolMember,
  invitationState,
  listSchoolMembers,
  listSchools,
  removeSchoolMember,
  resendInvitation,
  revokeInvitation,
  slugifySchoolName,
  updateSchool,
} from "./service";

// Every optional channel is OFF here, as by default (owner decision 2026-10-07): invitations, reset instructions and
// reminders are account email and go out anyway; nothing is ever texted while SMS is off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

function actorFor(userId: string, roles: Role[]): CmsActor {
  return { kind: "user", userId, roles };
}

async function admin(): Promise<CmsActor> {
  const { user } = await createUser({ roles: ["ADMIN"] });
  return actorFor(user.id, ["ADMIN"]);
}

describe("pure helpers", () => {
  it("slugifies names and lists legal status transitions", () => {
    expect(slugifySchoolName("St. Mary's High School")).toBe("st-mary-s-high-school");
    expect(slugifySchoolName("  École Normale  ")).toBe("ecole-normale");
    expect(slugifySchoolName("!!!")).toBe("school");
    expect(allowedSchoolTransitions("PENDING_VERIFICATION")).toEqual(["ACTIVE", "CLOSED"]);
    expect(allowedSchoolTransitions("CLOSED")).toEqual([]);
    const now = new Date("2026-10-05T00:00:00Z");
    expect(invitationState({ acceptedAt: null, revokedAt: null, expiresAt: new Date("2026-10-06T00:00:00Z") }, now)).toBe("PENDING");
    expect(invitationState({ acceptedAt: null, revokedAt: null, expiresAt: new Date("2026-10-04T00:00:00Z") }, now)).toBe("EXPIRED");
    expect(invitationState({ acceptedAt: now, revokedAt: null, expiresAt: now }, now)).toBe("ACCEPTED");
  });
});

describe("school CRUD and verification", () => {
  it("creates a pending school with a unique slug, edits it and verifies it, auditing each step", async () => {
    const actor = await admin();
    const country = await ensureTestCountry();
    const name = `Kudu Ridge High ${uniqueSuffix()}`;

    const created = await createSchool(actor, {
      name,
      countryId: country.id,
      type: "GOVERNMENT",
      region: "Harare Metropolitan",
      contactEmail: " Office@Example.TEST ",
      contactPhone: "0771234567",
    });
    expect(created.slug).toBe(slugifySchoolName(name));
    const row = await db.school.findUniqueOrThrow({ where: { id: created.id } });
    expect(row).toMatchObject({ status: "PENDING_VERIFICATION", contactEmail: "office@example.test", contactPhone: "+263771234567", createdById: actor.userId, verifiedAt: null });

    // Same name again → a different, still-unique slug.
    const second = await createSchool(actor, { name, countryId: country.id, type: "PRIVATE" });
    expect(second.slug).not.toBe(created.slug);

    const updated = await updateSchool(actor, { schoolId: created.id, name: `${name} (Renamed)`, countryId: country.id, type: "TRUST", region: "Harare Metropolitan" });
    expect(updated.changed.sort()).toEqual(["contactEmail", "contactPhone", "name", "type"].sort());

    await changeSchoolStatus(actor, { schoolId: created.id, to: "ACTIVE" });
    const verified = await db.school.findUniqueOrThrow({ where: { id: created.id } });
    expect(verified.status).toBe("ACTIVE");
    expect(verified.verifiedById).toBe(actor.userId);
    expect(verified.verifiedAt).not.toBeNull();

    const entries = await db.auditLog.findMany({ where: { entityType: "School", entityId: created.id }, orderBy: { createdAt: "asc" } });
    expect(entries.map((entry) => (entry.metadata as { operation: string }).operation)).toEqual(["school.create", "school.update", "school.status_change"]);
    expect(entries.every((entry) => entry.schoolId === created.id && entry.actorUserId === actor.userId)).toBe(true);
  });

  it("enforces transitions and reasons; validates input; maps duplicate slugs to a field error", async () => {
    const actor = await admin();
    const country = await ensureTestCountry();
    const { school } = await createSchoolFixture({ status: "ACTIVE" });

    await expect(changeSchoolStatus(actor, { schoolId: school.id, to: "SUSPENDED" })).rejects.toMatchObject({ code: "VALIDATION" });
    await changeSchoolStatus(actor, { schoolId: school.id, to: "SUSPENDED", reason: "Unpaid invoice since July" });
    await expect(changeSchoolStatus(actor, { schoolId: school.id, to: "PENDING_VERIFICATION" })).rejects.toMatchObject({ code: "CONFLICT" });
    await changeSchoolStatus(actor, { schoolId: school.id, to: "CLOSED", reason: "School merged with another" });
    await expect(changeSchoolStatus(actor, { schoolId: school.id, to: "ACTIVE" })).rejects.toMatchObject({ code: "CONFLICT" });

    await expect(createSchool(actor, { name: "X", countryId: country.id, type: "GOVERNMENT" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createSchool(actor, { name: "Valid Name", countryId: country.id, type: "GOVERNMENT", contactPhone: "abc" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { contactPhone: expect.any(Array) },
    });
    await expect(createSchool(actor, { name: "Valid Name", countryId: country.id, type: "GOVERNMENT", slug: school.slug })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { slug: expect.any(Array) },
    });
  });

  it("is ADMIN-only: content editors and school admins are refused", async () => {
    const { user: editor } = await createUser({ roles: ["CONTENT_EDITOR"] });
    const { school } = await createSchoolFixture();
    const { user: schoolAdmin } = await createUser();
    await createSchoolMember({ schoolId: school.id, userId: schoolAdmin.id, role: "SCHOOL_ADMIN" });
    await expect(listSchools(actorFor(editor.id, ["CONTENT_EDITOR"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(getSchool(actorFor(schoolAdmin.id, ["SCHOOL_ADMIN"]), school.id)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(changeSchoolStatus(actorFor(schoolAdmin.id, ["SCHOOL_ADMIN"]), { schoolId: school.id, to: "CLOSED", reason: "Trying it" })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });
});

describe("lists and detail", () => {
  it("searches schools and reports member counts, seats and members without N+1", async () => {
    const actor = await admin();
    const token = `Msasa${uniqueSuffix()}`;
    const { school } = await createSchoolFixture({ name: `${token} Secondary` });
    const { user: student } = await createStudent();
    const fixture = await createClass({ schoolId: school.id, studentUserIds: [student.id] });

    const list = await listSchools(actor, { q: token.toLowerCase() });
    expect(list.items).toHaveLength(1);
    expect(list.items[0]).toMatchObject({ id: school.id, activeStudents: 1, activeTeachers: 1, activeAdmins: 0, status: "ACTIVE" });

    const detail = await getSchool(actor, school.id);
    expect(detail.members.STUDENT.active).toBe(1);
    expect(detail.members.TEACHER.active).toBe(1);
    expect(detail.classes).toBe(1);
    expect(detail.seats).toBeNull();
    expect(detail.allowedTransitions).toEqual(["SUSPENDED", "CLOSED"]);

    const teachers = await listSchoolMembers(actor, { schoolId: school.id, role: "TEACHER" });
    expect(teachers.items.map((item) => item.userId)).toEqual([fixture.teachers[0]!.userId]);
    await expect(getSchool(actor, "not-a-uuid")).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("shows the school's plan requests (dedicated audit key and older school.update entries), newest first", async () => {
    const actor = await admin();
    const { schoolWithAdmin } = await import("@/server/schools/testing");
    const { school, adminActor } = await schoolWithAdmin();
    expect((await getSchool(actor, school.id)).planRequests).toEqual([]);

    // An entry recorded before the dedicated key existed.
    await db.auditLog.create({
      data: {
        actorUserId: adminActor!.userId,
        action: "school.update",
        entityType: "School",
        entityId: school.id,
        schoolId: school.id,
        after: { seats: 40, planId: null },
        metadata: { operation: "school.plan_request", hasMessage: false },
        createdAt: new Date(Date.now() - 60_000),
      },
    });
    // As /school/billing records it (requestSchoolPlan also notifies every platform admin, which this test avoids).
    await db.auditLog.create({
      data: {
        actorUserId: adminActor!.userId,
        action: "school.plan_request",
        entityType: "School",
        entityId: school.id,
        schoolId: school.id,
        after: { seats: 120, planId: null },
        metadata: { operation: "school.plan_request", hasMessage: true },
      },
    });

    const detail = await getSchool(actor, school.id);
    expect(detail.planRequests).toEqual([
      expect.objectContaining({ seats: 120, plan: null, hasMessage: true, requestedBy: "Admin" }),
      expect.objectContaining({ seats: 40, plan: null, hasMessage: false }),
    ]);
  });

  it("serves §23 analytics for a school to admins", async () => {
    const actor = await admin();
    const { school } = await createSchoolFixture();
    const analytics = await getSchoolAnalyticsForAdmin(actor, school.id, { from: "2026-09-01", to: "2026-09-30" });
    expect(analytics.school.schoolId).toBe(school.id);
    expect(analytics.roster.students).toBe(0);
    expect(analytics.averageScoreBySubject.overall.averageScorePct).toBeNull();
  });

  it("audits a staff view of a school's analytics once per viewing window", async () => {
    const actor = await admin();
    const { school } = await createSchoolFixture();
    const now = new Date();
    const range = { from: "2026-09-01", to: "2026-09-30" } as const;
    await getSchoolAnalyticsForAdmin(actor, school.id, range, { requestId: "req-analytics" }, { now });
    await getSchoolAnalyticsForAdmin(actor, school.id, { from: "2026-08-01", to: "2026-08-31" }, undefined, { now });
    const entries = await db.auditLog.findMany({
      where: { action: "school.analytics.view", actorUserId: actor.userId, entityId: school.id },
      select: { schoolId: true, entityType: true, requestId: true, metadata: true },
    });
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ schoolId: school.id, entityType: "School", requestId: "req-analytics", metadata: { from: "2026-09-01", to: "2026-09-30" } });
  });
});

describe("members and invitations", () => {
  it("adds an existing account as a teacher at once: membership, TEACHER role + extension, notification, audit", async () => {
    const actor = await admin();
    const { school } = await createSchoolFixture();
    const email = uniqueEmail("teach");
    const { user } = await createUser({ email, roles: ["PARENT"] });

    const outcome = await inviteSchoolMember(actor, { schoolId: school.id, contact: email.toUpperCase(), role: "TEACHER" });
    expect(outcome).toMatchObject({ outcome: "added", userId: user.id, teacherRoleGranted: true });

    const member = await db.schoolMember.findUniqueOrThrow({ where: { schoolId_userId_role: { schoolId: school.id, userId: user.id, role: "TEACHER" } } });
    expect(member).toMatchObject({ status: "ACTIVE", source: "ADDED_BY_STAFF", invitedById: actor.userId });
    const refreshed = await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { roles: true, teacher: { select: { userId: true } } } });
    expect(refreshed.roles).toEqual(["PARENT", "TEACHER"]);
    expect(refreshed.teacher).not.toBeNull();
    expect(await db.notification.count({ where: { userId: user.id, type: "account.school_membership" } })).toBe(1);
    expect(await db.auditLog.count({ where: { schoolId: school.id, action: "school_member.add", targetUserId: user.id } })).toBe(1);
    expect(await db.auditLog.count({ where: { targetUserId: user.id, action: "role.grant" } })).toBe(1);

    await expect(inviteSchoolMember(actor, { schoolId: school.id, contact: email, role: "TEACHER" })).rejects.toMatchObject({ code: "CONFLICT" });

    await removeSchoolMember(actor, { schoolId: school.id, memberId: member.id, reason: "Left the school" });
    expect((await db.schoolMember.findUniqueOrThrow({ where: { id: member.id } })).status).toBe("REMOVED");
    expect(await db.auditLog.count({ where: { schoolId: school.id, action: "school_member.remove", targetUserId: user.id } })).toBe(1);
    await expect(removeSchoolMember(actor, { schoolId: school.id, memberId: member.id })).rejects.toMatchObject({ code: "CONFLICT" });

    // Re-adding reactivates the same row.
    const again = await inviteSchoolMember(actor, { schoolId: school.id, contact: email, role: "TEACHER" });
    expect(again).toMatchObject({ outcome: "added", memberId: member.id, teacherRoleGranted: false });
  });

  it("invites someone without an account: hashed token, link delivered to them, resend rotates, revoke ends it", async () => {
    const actor = await admin();
    const { school } = await createSchoolFixture();
    const email = uniqueEmail("newadmin");

    const first = await inviteSchoolMember(actor, { schoolId: school.id, contact: email, role: "SCHOOL_ADMIN" });
    expect(first.outcome).toBe("invited");
    if (first.outcome === "added") return;
    const invitation = await db.invitation.findUniqueOrThrow({ where: { id: first.invitationId } });
    expect(invitation).toMatchObject({ kind: "SCHOOL_MEMBER", schoolRole: "SCHOOL_ADMIN", target: email, channel: "EMAIL", sendCount: 1 });
    const message = latestDevMessage(email, "email");
    const token = message?.text.match(/\/invite\/([A-Za-z0-9_-]{43})/)?.[1];
    expect(token).toBeDefined();
    // Only the hash is stored.
    expect(invitation.tokenHash).not.toContain(token!);

    await resendInvitation(actor, { schoolId: school.id, invitationId: invitation.id });
    const rotated = await db.invitation.findUniqueOrThrow({ where: { id: invitation.id } });
    expect(rotated.tokenHash).not.toBe(invitation.tokenHash);
    expect(rotated.sendCount).toBe(2);

    const detail = await getSchool(actor, school.id);
    expect(detail.invitations[0]).toMatchObject({ id: invitation.id, state: "PENDING", role: "SCHOOL_ADMIN" });
    expect(detail.invitations[0]?.targetMasked).not.toBe(email);

    await revokeInvitation(actor, { schoolId: school.id, invitationId: invitation.id });
    await expect(revokeInvitation(actor, { schoolId: school.id, invitationId: invitation.id })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(resendInvitation(actor, { schoolId: school.id, invitationId: invitation.id })).rejects.toMatchObject({ code: "CONFLICT" });
    const actions = await db.auditLog.findMany({ where: { entityType: "Invitation", entityId: invitation.id }, orderBy: { createdAt: "asc" } });
    expect(actions.map((entry) => (entry.metadata as { operation: string }).operation)).toEqual(["invitation.create", "invitation.resend", "invitation.revoke"]);
  });

  it("refuses invalid contacts, student invitations and closed schools", async () => {
    const actor = await admin();
    const { school } = await createSchoolFixture({ status: "CLOSED" });
    const { school: open } = await createSchoolFixture();
    await expect(inviteSchoolMember(actor, { schoolId: open.id, contact: "not a contact", role: "TEACHER" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(inviteSchoolMember(actor, { schoolId: open.id, contact: uniqueEmail(), role: "STUDENT" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(inviteSchoolMember(actor, { schoolId: school.id, contact: uniqueEmail(), role: "TEACHER" })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("invites a school admin by email only (phone numbers are never verified), and never texts a teacher's phone", async () => {
    const actor = await admin();
    const { school } = await createSchoolFixture();
    const phone = uniquePhone();
    await expect(inviteSchoolMember(actor, { schoolId: school.id, contact: phone, role: "SCHOOL_ADMIN" })).rejects.toMatchObject({ code: "VALIDATION" });
    const teacher = await inviteSchoolMember(actor, { schoolId: school.id, contact: phone, role: "TEACHER" });
    expect(teacher).toMatchObject({ outcome: "invited", delivered: false, channel: "sms", notSentReason: "sms_switched_off" });
    expect(teacher.outcome !== "added" && teacher.inviteLink).toContain("/invite/");
    expect(getDevOutbox({ to: phone })).toEqual([]);
  });
});
