import { describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { verifyPassword } from "@/server/auth/passwords";
import { createSession } from "@/server/auth/sessions";
import { testMeta } from "@/server/auth/testing";
import { db } from "@/server/db";
import { audit } from "@/server/lib/audit";
import { getDevOutbox, latestDevMessage } from "@/server/messaging";
import { createSchool, createSchoolMember, createStudent, createTeacher, createUser, uniqueEmail, uniquePhone, uniqueSuffix } from "../../../../tests/factories/index";
import type { CmsActor } from "./access";
import {
  forceSignOut,
  getUserDetail,
  grantStaffRole,
  issueTemporaryPasswordForUser,
  listStudents,
  listTeachers,
  listUsers,
  reactivateUser,
  recordStudentView,
  revokeStaffRole,
  revokeUserSession,
  sendPasswordResetInstructions,
  sendVerificationReminder,
  suspendUser,
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

async function staff(role: "ADMIN" | "SUPER_ADMIN" | "CONTENT_EDITOR") {
  const { user } = await createUser({ roles: [role], emailVerified: true });
  return actorFor(user.id, [role]);
}

async function activeSessions(userId: string) {
  return db.session.count({ where: { userId, revokedAt: null } });
}

async function auditRows(targetUserId: string, action: string) {
  return db.auditLog.findMany({ where: { targetUserId, action }, orderBy: { createdAt: "desc" } });
}

describe("listUsers", () => {
  it("refuses non-admins (content editors and students)", async () => {
    const editor = await staff("CONTENT_EDITOR");
    const { user: student } = await createStudent();
    await expect(listUsers(editor)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(listUsers(actorFor(student.id, ["STUDENT"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("finds users by exact email and by name, masking phone numbers", async () => {
    const admin = await staff("ADMIN");
    const token = `Zq${uniqueSuffix()}`;
    const email = uniqueEmail("findme");
    const { user } = await createUser({ email, phone: uniquePhone(), firstName: token, roles: ["PARENT"] });

    const byEmail = await listUsers(admin, { q: email.toUpperCase() });
    expect(byEmail.items.map((item) => item.id)).toEqual([user.id]);
    expect(byEmail.items[0]?.phoneMasked).toMatch(/\*\*\*/);

    const byName = await listUsers(admin, { q: token.toLowerCase() });
    expect(byName.items.map((item) => item.id)).toEqual([user.id]);
    expect(byName.items[0]?.name).toBe(token);
  });

  it("paginates newest first with an opaque cursor", async () => {
    const admin = await staff("ADMIN");
    const token = `Pg${uniqueSuffix()}`;
    const created = [];
    for (let i = 0; i < 3; i += 1) created.push((await createUser({ firstName: token })).user.id);

    const first = await listUsers(admin, { q: token, limit: 2 });
    expect(first.items).toHaveLength(2);
    expect(first.nextCursor).not.toBeNull();
    const second = await listUsers(admin, { q: token, limit: 2, cursor: first.nextCursor! });
    expect(second.items).toHaveLength(1);
    expect(second.nextCursor).toBeNull();
    expect([...first.items, ...second.items].map((item) => item.id).sort()).toEqual([...created].sort());
    await expect(listUsers(admin, { q: token, cursor: "not-a-cursor" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("filters school admins through their memberships", async () => {
    const admin = await staff("ADMIN");
    const token = `Sa${uniqueSuffix()}`;
    const { user: schoolAdmin } = await createUser({ firstName: token });
    const { user: other } = await createUser({ firstName: token });
    const { school } = await createSchool();
    await createSchoolMember({ schoolId: school.id, userId: schoolAdmin.id, role: "SCHOOL_ADMIN" });

    const result = await listUsers(admin, { q: token, role: "SCHOOL_ADMIN" });
    expect(result.items.map((item) => item.id)).toEqual([schoolAdmin.id]);
    expect(result.items[0]?.roles).toContain("SCHOOL_ADMIN");
    expect(result.items.map((item) => item.id)).not.toContain(other.id);
  });

  it("validates filters", async () => {
    const admin = await staff("ADMIN");
    await expect(listUsers(admin, { role: "NOT_A_ROLE" as Role })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("listStudents / listTeachers", () => {
  it("lists students with onboarding filter and teachers with verification filter", async () => {
    const admin = await staff("ADMIN");
    const token = `St${uniqueSuffix()}`;
    const { user: student } = await createStudent({ firstName: token });
    const { user: teacher } = await createTeacher({ firstName: token });

    const students = await listStudents(admin, { q: token, onboarding: "in_progress" });
    expect(students.items.map((item) => item.id)).toEqual([student.id]);
    expect(students.items[0]).toMatchObject({ onboardingCompleted: false, isMinor: true, guardianConsentStatus: "PENDING" });
    expect((await listStudents(admin, { q: token, onboarding: "completed" })).items).toHaveLength(0);

    const teachers = await listTeachers(admin, { q: token, verification: "unverified" });
    expect(teachers.items.map((item) => item.id)).toEqual([teacher.id]);
    expect(teachers.items[0]).toMatchObject({ schools: 0, classes: 0, verifiedAt: null });
  });
});

describe("getUserDetail and student-record access", () => {
  it("requires a recorded reason before showing a student's record, then grants it", async () => {
    const admin = await staff("ADMIN");
    const { user: student } = await createStudent();

    const gated = await getUserDetail(admin, student.id);
    expect(gated.access).toBe("reason_required");

    await expect(recordStudentView(admin, { userId: student.id, reason: "x" })).rejects.toMatchObject({ code: "VALIDATION" });
    await recordStudentView(admin, { userId: student.id, reason: "Support ticket 4411: login problem" }, { requestId: "req-1", ip: "10.1.2.3" });

    const rows = await auditRows(student.id, "student.view");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ actorUserId: admin.userId, reason: "Support ticket 4411: login problem", requestId: "req-1" });
    expect(rows[0]?.ipHash).toMatch(/^[0-9a-f]{64}$/);

    const detail = await getUserDetail(admin, student.id);
    expect(detail.access).toBe("granted");
    if (detail.access !== "granted") return;
    expect(detail.user.student).toMatchObject({ isMinor: true, guardianConsentStatus: "PENDING" });
    expect(detail.user.audit.some((entry) => entry.action === "student.view")).toBe(true);

    // The grant is per admin: another admin still has to give a reason.
    const otherAdmin = await staff("ADMIN");
    expect((await getUserDetail(otherAdmin, student.id)).access).toBe("reason_required");
  });

  it("shows a non-student's record directly, with sessions and what the viewer may do", async () => {
    const admin = await staff("ADMIN");
    const { user: parent } = await createUser({ roles: ["PARENT"], emailVerified: true });
    await createSession(parent.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    await audit({ actorUserId: parent.id, actorRoles: ["PARENT"], action: "privacy.export", entityType: "PrivacyRequest", entityId: "export-1" });

    const detail = await getUserDetail(admin, parent.id);
    expect(detail.access).toBe("granted");
    if (detail.access !== "granted") return;
    expect(detail.user.isParent).toBe(true);
    expect(detail.user.sessions).toHaveLength(1);
    expect(detail.user.can).toMatchObject({ suspend: true, signOut: true, grant: ["CONTENT_EDITOR"], revoke: [] });
    // Actions by the user with no affected person are part of their trail.
    expect(detail.user.audit).toContainEqual(expect.objectContaining({ action: "privacy.export", direction: "actor" }));
  });

  it("returns NOT_FOUND for unknown or malformed ids", async () => {
    const admin = await staff("ADMIN");
    await expect(getUserDetail(admin, "nope")).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(getUserDetail(admin, "0192f1a0-0000-7000-8000-000000000000")).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});

describe("suspend / reactivate / sign out", () => {
  it("suspends with a reason, revokes every session and audits; reactivates", async () => {
    const admin = await staff("ADMIN");
    const { user } = await createUser({ roles: ["PARENT"] });
    await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });

    await expect(suspendUser(admin, { userId: user.id, reason: "no" })).rejects.toMatchObject({ code: "VALIDATION" });
    const result = await suspendUser(admin, { userId: user.id, reason: "Chargeback investigation" });
    expect(result.sessionsRevoked).toBe(2);
    expect(await activeSessions(user.id)).toBe(0);
    const row = await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { status: true, statusReason: true } });
    expect(row).toEqual({ status: "SUSPENDED", statusReason: "Chargeback investigation" });
    const [entry] = await auditRows(user.id, "user.suspend");
    expect(entry).toMatchObject({ actorUserId: admin.userId, reason: "Chargeback investigation", entityType: "User" });

    await expect(suspendUser(admin, { userId: user.id, reason: "Again, twice" })).rejects.toMatchObject({ code: "CONFLICT" });
    await reactivateUser(admin, { userId: user.id });
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { status: true } })).status).toBe("ACTIVE");
    expect(await auditRows(user.id, "user.reactivate")).toHaveLength(1);
  });

  it("forbids acting on yourself and lets only a super admin act on administrators", async () => {
    const admin = await staff("ADMIN");
    const superAdmin = await staff("SUPER_ADMIN");
    const otherAdmin = await staff("ADMIN");

    await expect(suspendUser(admin, { userId: admin.userId, reason: "Testing self" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(suspendUser(admin, { userId: otherAdmin.userId, reason: "Not allowed" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(forceSignOut(admin, { userId: otherAdmin.userId })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(suspendUser(superAdmin, { userId: otherAdmin.userId, reason: "Offboarding staff member" })).resolves.toMatchObject({
      sessionsRevoked: 0,
    });
  });

  it("signs a user out everywhere and revokes single sessions, audited", async () => {
    const admin = await staff("ADMIN");
    const { user } = await createUser({ roles: ["TEACHER"] });
    const one = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    await createSession(user.id, "WEB", testMeta(), { authMethod: "OTP" });

    await revokeUserSession(admin, { userId: user.id, sessionId: one.session.id });
    expect(await activeSessions(user.id)).toBe(1);
    await expect(revokeUserSession(admin, { userId: user.id, sessionId: one.session.id })).rejects.toMatchObject({ code: "CONFLICT" });

    const result = await forceSignOut(admin, { userId: user.id });
    expect(result.sessionsRevoked).toBe(1);
    expect(await activeSessions(user.id)).toBe(0);
    const entries = await auditRows(user.id, "auth.sessions.revoke");
    expect(entries.map((entry) => (entry.metadata as { operation?: string }).operation).sort()).toEqual([
      "user.force_sign_out",
      "user.session_revoke",
    ]);
  });
});

describe("staff role grants", () => {
  it("lets ADMIN grant CONTENT_EDITOR only; SUPER_ADMIN grants ADMIN; both audited with sessions revoked", async () => {
    const admin = await staff("ADMIN");
    const superAdmin = await staff("SUPER_ADMIN");
    const { user } = await createUser({ roles: ["TEACHER"] });
    await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });

    await expect(grantStaffRole(admin, { userId: user.id, role: "ADMIN" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(grantStaffRole(actorFor(user.id, ["TEACHER"]), { userId: user.id, role: "CONTENT_EDITOR" })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });

    const granted = await grantStaffRole(admin, { userId: user.id, role: "CONTENT_EDITOR", reason: "Joined content team" });
    expect(granted.roles).toEqual(["TEACHER", "CONTENT_EDITOR"]);
    expect(await activeSessions(user.id)).toBe(0);
    await expect(grantStaffRole(admin, { userId: user.id, role: "CONTENT_EDITOR" })).rejects.toMatchObject({ code: "CONFLICT" });

    await grantStaffRole(superAdmin, { userId: user.id, role: "ADMIN" });
    const [grant] = await auditRows(user.id, "role.grant");
    expect(grant).toMatchObject({ actorUserId: superAdmin.userId });
    expect(grant?.after).toEqual({ roles: ["TEACHER", "CONTENT_EDITOR", "ADMIN"] });

    // The user is now an administrator: a plain ADMIN can no longer change their roles.
    await expect(revokeStaffRole(admin, { userId: user.id, role: "CONTENT_EDITOR" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    const revoked = await revokeStaffRole(superAdmin, { userId: user.id, role: "ADMIN" });
    expect(revoked.roles).toEqual(["TEACHER", "CONTENT_EDITOR"]);
    expect(await auditRows(user.id, "role.revoke")).toHaveLength(1);
    await expect(revokeStaffRole(superAdmin, { userId: user.id, role: "SUPER_ADMIN" })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("rejects roles that are not staff roles", async () => {
    const superAdmin = await staff("SUPER_ADMIN");
    const { user } = await createUser();
    await expect(grantStaffRole(superAdmin, { userId: user.id, role: "SCHOOL_ADMIN" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(grantStaffRole(superAdmin, { userId: user.id, role: "STUDENT" })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("contact actions", () => {
  it("sends password reset instructions only to a verified contact, audited", async () => {
    const admin = await staff("ADMIN");
    const email = uniqueEmail("reset");
    const { user: unverified } = await createUser({ email: uniqueEmail("unverified") });
    const { user } = await createUser({ email, emailVerified: true });

    await expect(sendPasswordResetInstructions(admin, { userId: unverified.id })).rejects.toMatchObject({ code: "VALIDATION" });

    const result = await sendPasswordResetInstructions(admin, { userId: user.id });
    expect(result.channel).toBe("email");
    expect(result.sentTo).not.toContain(email);
    const message = latestDevMessage(email, "email");
    expect(message?.text).toContain("/forgot-password");
    expect(message?.tag).toBe("admin.password_reset_instructions");
    const [entry] = await auditRows(user.id, "user.password_reset_sent");
    expect(entry?.metadata).toMatchObject({ operation: "user.password_reset_sent", channel: "email" });
  });

  it("reminds a user to verify an unverified email; refuses when everything is verified", async () => {
    const admin = await staff("ADMIN");
    const email = uniqueEmail("verify");
    const { user } = await createUser({ email });
    const { user: verified } = await createUser({ emailVerified: true });

    await sendVerificationReminder(admin, { userId: user.id });
    expect(latestDevMessage(email, "email")?.text).toContain("/login");
    expect(await auditRows(user.id, "user.verification_reminder_sent")).toHaveLength(1);
    await expect(sendVerificationReminder(admin, { userId: verified.id })).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("never texts: a phone-only account gets no reset or reminder, and asking for the phone channel is refused", async () => {
    const admin = await staff("ADMIN");
    const phone = uniquePhone();
    const { user } = await createUser({ email: null, phone });
    await db.user.update({ where: { id: user.id }, data: { phoneVerifiedAt: new Date() } });
    await expect(sendPasswordResetInstructions(admin, { userId: user.id })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(sendVerificationReminder(admin, { userId: user.id })).rejects.toMatchObject({ code: "VALIDATION" });
    const { user: withEmail } = await createUser({ emailVerified: true });
    await expect(sendPasswordResetInstructions(admin, { userId: withEmail.id, channel: "phone" })).rejects.toMatchObject({ code: "VALIDATION" });
    expect(getDevOutbox({ to: phone })).toEqual([]);
  });

  it("issues a one-time password once: must be changed at sign-in, signs out everywhere, audited, notice emailed", async () => {
    const admin = await staff("ADMIN");
    const email = uniqueEmail("temp-password");
    const { user } = await createUser({ email, emailVerified: true, roles: ["PARENT"] });
    await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    await expect(issueTemporaryPasswordForUser(admin, { userId: user.id, reason: "" })).rejects.toMatchObject({ code: "VALIDATION" });

    const result = await issueTemporaryPasswordForUser(admin, { userId: user.id, reason: "Lost access to their inbox; called support." });
    expect(result.signInWith).toEqual([expect.stringContaining("***@")]);
    expect(result.sessionsRevoked).toBe(1);
    expect(await activeSessions(user.id)).toBe(0);
    const stored = await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { passwordHash: true, passwordMustChange: true } });
    expect(stored.passwordMustChange).toBe(true);
    expect((await verifyPassword(stored.passwordHash!, result.temporaryPassword)).valid).toBe(true);
    const [entry] = await auditRows(user.id, "user.temporary_password_issued");
    expect(entry?.reason).toBe("Lost access to their inbox; called support.");
    expect(JSON.stringify(entry)).not.toContain(result.temporaryPassword);
    const notice = latestDevMessage(email, "email");
    expect(notice?.tag).toBe("auth.security.temporary_password");
    expect(notice?.text).not.toContain(result.temporaryPassword);

    // A phone number is not a sign-in identifier, so a phone-only account cannot use a password at all.
    const { user: phoneOnly } = await createUser({ email: null, phone: uniquePhone() });
    await expect(issueTemporaryPasswordForUser(admin, { userId: phoneOnly.id, reason: "Asked by phone." })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(issueTemporaryPasswordForUser(admin, { userId: admin.userId, reason: "Mine." })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
