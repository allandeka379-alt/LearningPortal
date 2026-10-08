import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/server/auth/passwords";
import { db } from "@/server/db";
import { sha256Hex } from "@/server/lib/crypto";
import { createClass, createSchoolMember, createStudent, uniqueCode, uniqueId } from "../../../tests/factories/index";
import {
  approveStudentRequest,
  deactivateStudent,
  declineStudentRequest,
  getSchoolStudent,
  listSchoolStudents,
  listStudentOptions,
  resetStudentPassword,
  resetStudentPasswords,
  setStudentNumber,
} from "./students";
import { deactivateTeacher, listSchoolTeachers, listTeacherOptions } from "./teachers";
import { actorOf, errorCodeOf, schoolWithAdmin, studentOf, teacherOf } from "./testing";

/**
 * Teachers and students of a school (§23 manage teachers / students): scoping to the admin's own school, the audited
 * student record view, removal cascades (database trigger), seats, and password resets for school-provisioned
 * username accounts. Negative cases: other school, removed student, non-provisioned account, teacher actor.
 */

async function provisionedStudent(schoolId: string, firstName = "Rudo") {
  const username = `t.${uniqueId("p").replace(/-/g, "")}`.slice(0, 30);
  const user = await db.user.create({
    data: {
      loginUsername: username,
      passwordHash: await hashPassword("old-password-123"),
      roles: ["STUDENT"],
      provisionedBySchoolId: schoolId,
      contactPhoneE164: "+263771234567",
      profile: { create: { firstName, lastName: "Ncube", displayName: firstName } },
      student: { create: { isMinor: true, guardianConsentStatus: "PENDING" } },
    },
  });
  const { member } = await createSchoolMember({ schoolId, userId: user.id, role: "STUDENT" });
  return { user, member, username };
}

describe("teachers", () => {
  it("lists only this school's teachers with their classes, and deactivation ends their classes (trigger)", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const teacher = await teacherOf(school.id, { firstName: "Farai" });
    const cls = await createClass({ schoolId: school.id, createdById: teacher.user.id, name: "4A Maths" });
    const other = await schoolWithAdmin();
    await teacherOf(other.school.id, { firstName: "Elsewhere" });

    const page = await listSchoolTeachers(adminActor!, { schoolId: school.id });
    expect(page.items).toHaveLength(1);
    expect(page.items[0]).toMatchObject({ userId: teacher.user.id, status: "ACTIVE", classes: [{ classId: cls.class.id, name: "4A Maths", role: "LEAD" }] });
    expect((await listTeacherOptions(adminActor!, school.id)).map((t) => t.userId)).toContain(teacher.user.id);

    expect(await errorCodeOf(deactivateTeacher(other.adminActor!, { schoolId: school.id, userId: teacher.user.id }))).toBe("FORBIDDEN");
    const result = await deactivateTeacher(adminActor!, { schoolId: school.id, userId: teacher.user.id, reason: "Left the school" });
    expect(result.classesEnded).toBe(1);
    const row = await db.classTeacher.findUniqueOrThrow({ where: { classId_userId: { classId: cls.class.id, userId: teacher.user.id } } });
    expect(row.removedAt).not.toBeNull();
    const audit = await db.auditLog.findFirst({ where: { schoolId: school.id, action: "school_member.remove", targetUserId: teacher.user.id } });
    expect(audit?.reason).toBe("Left the school");
    expect(await errorCodeOf(deactivateTeacher(adminActor!, { schoolId: school.id, userId: teacher.user.id }))).toBe("CONFLICT");
    expect((await listSchoolTeachers(adminActor!, { schoolId: school.id, status: "REMOVED" })).items.map((t) => t.userId)).toEqual([teacher.user.id]);
  });

  it("is refused to a teacher of the school", async () => {
    const { school } = await schoolWithAdmin();
    const teacher = await teacherOf(school.id);
    expect(await errorCodeOf(listSchoolTeachers(await actorOf(teacher.user.id), { schoolId: school.id }))).toBe("FORBIDDEN");
  });
});

describe("students", () => {
  it("lists, searches, filters by class and paginates the school's own students", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const a = await studentOf(school.id, { firstName: "Anesu", lastName: "Dube" });
    const b = await studentOf(school.id, { firstName: "Blessing", lastName: "Phiri" });
    const c = await studentOf(school.id, { firstName: "Chiedza", lastName: "Sithole" });
    const cls = await createClass({ schoolId: school.id, name: "3B", studentUserIds: [a.user.id] });
    const other = await schoolWithAdmin();
    await studentOf(other.school.id, { firstName: "Outsider" });

    const first = await listSchoolStudents(adminActor!, { schoolId: school.id, limit: 2 });
    expect(first.items).toHaveLength(2);
    expect(first.nextCursor).not.toBeNull();
    const second = await listSchoolStudents(adminActor!, { schoolId: school.id, limit: 2, cursor: first.nextCursor! });
    expect([...first.items, ...second.items].map((s) => s.userId).sort()).toEqual([a.user.id, b.user.id, c.user.id].sort());
    expect((await listSchoolStudents(adminActor!, { schoolId: school.id, q: "phiri" })).items.map((s) => s.userId)).toEqual([b.user.id]);
    const inClass = await listSchoolStudents(adminActor!, { schoolId: school.id, classId: cls.class.id });
    expect(inClass.items).toEqual([expect.objectContaining({ userId: a.user.id, classes: [{ classId: cls.class.id, name: "3B" }] })]);
    expect((await listStudentOptions(adminActor!, school.id, { notInClassId: cls.class.id })).map((s) => s.userId).sort()).toEqual([b.user.id, c.user.id].sort());
    expect(await errorCodeOf(listSchoolStudents(adminActor!, { schoolId: school.id, cursor: "garbage" }))).toBe("VALIDATION");
  });

  // PRIV-03 regression: the search used to match `emailNormalized` (and any login username) by PREFIX, so an admin
  // could recover a student's private email one character at a time by watching whether the student stayed in the
  // results (for ACTIVE, REQUESTED and REMOVED members alike), although contact details are never listed.
  it("never matches a student's hidden email or own username by prefix (no enumeration oracle)", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const tag = uniqueId("priv").replace(/[^a-z0-9]/gi, "").toLowerCase().slice(-10);
    const email = `zq${tag}.private@example.test`;
    const ownUsername = `zq${tag}u`.slice(0, 30);
    const own = await createStudent({ firstName: "Tanaka", lastName: "Mutasa", email });
    await db.user.update({ where: { id: own.user.id }, data: { loginUsername: ownUsername } });
    await createSchoolMember({ schoolId: school.id, userId: own.user.id, role: "STUDENT", status: "REMOVED" });
    const issued = await provisionedStudent(school.id, "Rufaro");
    const search = async (q: string, status: "ACTIVE" | "REMOVED") =>
      (await listSchoolStudents(adminActor!, { schoolId: school.id, status, q })).items.map((s) => s.userId);

    // Prefixes of the hidden email / self-chosen username find nothing.
    for (const prefix of ["z", "zq", `zq${tag.slice(0, 3)}`, `zq${tag}`, `zq${tag}.priv`, email.slice(0, -1)]) {
      expect(await search(prefix, "REMOVED")).toEqual([]);
    }
    expect(await search(ownUsername.slice(0, -1), "REMOVED")).toEqual([]);
    // The full value still finds the student (an admin who already knows the address can look them up).
    expect(await search(email.toUpperCase(), "REMOVED")).toEqual([own.user.id]);
    expect(await search(ownUsername, "REMOVED")).toEqual([own.user.id]);
    // Usernames this school issued are listed, so they keep prefix search.
    expect(await search(issued.username.slice(0, 6), "ACTIVE")).toEqual([issued.user.id]);
    // Teachers' emails are listed in full (work contact), so their search is unchanged.
    const teacher = await teacherOf(school.id, { firstName: "Farai" });
    const teacherEmail = (await db.user.findUniqueOrThrow({ where: { id: teacher.user.id }, select: { emailNormalized: true } })).emailNormalized!;
    expect((await listSchoolTeachers(adminActor!, { schoolId: school.id, q: teacherEmail.slice(0, 8) })).items.map((t) => t.userId)).toEqual([teacher.user.id]);
  });

  it("audits the individual record view (once per window) and refuses other schools and removed students", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const student = await studentOf(school.id);
    const detail = await getSchoolStudent(adminActor!, { schoolId: school.id, userId: student.user.id });
    expect(detail).toMatchObject({ userId: student.user.id, account: { provisioned: false, username: null }, hasSeat: false });
    expect(Object.keys(detail.overview)).not.toEqual(expect.arrayContaining(["aiConversations"]));
    await getSchoolStudent(adminActor!, { schoolId: school.id, userId: student.user.id });
    const views = await db.auditLog.findMany({ where: { action: "student.view", targetUserId: student.user.id, actorUserId: adminActor!.userId } });
    expect(views).toHaveLength(1);
    expect(views[0]).toMatchObject({ schoolId: school.id, reason: expect.stringContaining("School admin") });
    expect(views[0]!.actorRoles).toContain("SCHOOL_ADMIN");

    const other = await schoolWithAdmin();
    expect(await errorCodeOf(getSchoolStudent(other.adminActor!, { schoolId: school.id, userId: student.user.id }))).toBe("FORBIDDEN");
    expect(await errorCodeOf(getSchoolStudent(other.adminActor!, { schoolId: other.school.id, userId: student.user.id }))).toBe("NOT_FOUND");
    const outsider = (await createStudent()).user;
    expect(await errorCodeOf(getSchoolStudent(adminActor!, { schoolId: school.id, userId: outsider.id }))).toBe("NOT_FOUND");
  });

  it("removing a student ends their classes (trigger), releases their seat and clears the school link", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const student = await studentOf(school.id);
    await db.student.update({ where: { userId: student.user.id }, data: { schoolId: school.id } });
    const cls = await createClass({ schoolId: school.id, studentUserIds: [student.user.id] });
    const plan = await db.plan.create({ data: { code: uniqueCode("TS"), name: "School plan", audience: "SCHOOL", entitlements: { version: 1, features: {}, limits: {} } } });
    const sub = await db.subscription.create({
      data: { planId: plan.id, schoolId: school.id, seats: 10, status: "ACTIVE", startedAt: new Date(), currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 30 * 86_400_000) },
    });
    await db.entitlementGrant.create({ data: { userId: student.user.id, source: "SCHOOL_SEAT", subscriptionId: sub.id, planId: plan.id } });

    const result = await deactivateStudent(adminActor!, { schoolId: school.id, userId: student.user.id });
    expect(result.seatsReleased).toBe(1);
    const membership = await db.classMember.findUniqueOrThrow({ where: { classId_userId: { classId: cls.class.id, userId: student.user.id } } });
    expect(membership.status).toBe("REMOVED");
    expect((await db.student.findUniqueOrThrow({ where: { userId: student.user.id } })).schoolId).toBeNull();
    expect(await db.entitlementGrant.count({ where: { userId: student.user.id, revokedAt: null } })).toBe(0);
    expect(await db.notification.count({ where: { userId: student.user.id, type: "account.school_membership_ended" } })).toBe(1);
    expect(await errorCodeOf(getSchoolStudent(adminActor!, { schoolId: school.id, userId: student.user.id }))).toBe("NOT_FOUND");
  });

  it("approves and declines join requests, and keeps admission numbers unique", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const asking = (await createStudent()).user;
    await createSchoolMember({ schoolId: school.id, userId: asking.id, role: "STUDENT", status: "REQUESTED" });
    const declined = (await createStudent()).user;
    await createSchoolMember({ schoolId: school.id, userId: declined.id, role: "STUDENT", status: "REQUESTED" });
    expect((await listSchoolStudents(adminActor!, { schoolId: school.id, status: "REQUESTED" })).items).toHaveLength(2);
    await approveStudentRequest(adminActor!, { schoolId: school.id, userId: asking.id });
    await declineStudentRequest(adminActor!, { schoolId: school.id, userId: declined.id });
    expect(await errorCodeOf(approveStudentRequest(adminActor!, { schoolId: school.id, userId: declined.id }))).toBe("NOT_FOUND");
    const statuses = await db.schoolMember.findMany({ where: { schoolId: school.id, role: "STUDENT" }, select: { userId: true, status: true } });
    expect(statuses).toEqual(expect.arrayContaining([{ userId: asking.id, status: "ACTIVE" }, { userId: declined.id, status: "REMOVED" }]));

    const other = await studentOf(school.id);
    await setStudentNumber(adminActor!, { schoolId: school.id, userId: asking.id, studentNumber: "A-100" });
    expect(await errorCodeOf(setStudentNumber(adminActor!, { schoolId: school.id, userId: other.user.id, studentNumber: "A-100" }))).toBe("VALIDATION");
    await setStudentNumber(adminActor!, { schoolId: school.id, userId: asking.id, studentNumber: "" });
    await setStudentNumber(adminActor!, { schoolId: school.id, userId: other.user.id, studentNumber: "A-100" });
  });
});

describe("password resets for provisioned accounts", () => {
  it("issues a new temporary password once, signs the student out and audits the reset", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const { user, username } = await provisionedStudent(school.id);
    await db.session.create({
      data: { userId: user.id, tokenHash: sha256Hex(randomUUID()), kind: "WEB", authMethod: "PASSWORD", expiresAt: new Date(Date.now() + 86_400_000), absoluteExpiresAt: new Date(Date.now() + 86_400_000) },
    });
    const slip = await resetStudentPassword(adminActor!, { schoolId: school.id, userId: user.id });
    expect(slip).toMatchObject({ userId: user.id, username, name: "Rudo Ncube" });
    const stored = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(stored.passwordHash).not.toContain(slip.temporaryPassword);
    expect((await verifyPassword(stored.passwordHash!, slip.temporaryPassword)).valid).toBe(true);
    expect((await verifyPassword(stored.passwordHash!, "old-password-123")).valid).toBe(false);
    expect(await db.session.count({ where: { userId: user.id, revokedAt: null } })).toBe(0);
    // The student must choose their own password at the next sign-in (the school knows this one).
    expect(stored.passwordMustChange).toBe(true);
    const audit = await db.auditLog.findFirst({ where: { action: "school.password_reset", targetUserId: user.id, actorUserId: adminActor!.userId } });
    expect(audit).toMatchObject({ schoolId: school.id });
    expect(JSON.stringify(audit)).not.toContain(slip.temporaryPassword);
  });

  it("refuses accounts the school did not provision and students of other schools", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const ownLogin = await studentOf(school.id);
    expect(await errorCodeOf(resetStudentPassword(adminActor!, { schoolId: school.id, userId: ownLogin.user.id }))).toBe("CONFLICT");
    const other = await schoolWithAdmin();
    const elsewhere = await provisionedStudent(other.school.id);
    expect(await errorCodeOf(resetStudentPassword(adminActor!, { schoolId: school.id, userId: elsewhere.user.id }))).toBe("NOT_FOUND");
    // Provisioned by the other school but also a member here: still not ours to reset.
    await createSchoolMember({ schoolId: school.id, userId: elsewhere.user.id, role: "STUDENT" });
    expect(await errorCodeOf(resetStudentPassword(adminActor!, { schoolId: school.id, userId: elsewhere.user.id }))).toBe("CONFLICT");

    const mine = await provisionedStudent(school.id, "Tsitsi");
    const bulk = await resetStudentPasswords(adminActor!, { schoolId: school.id, userIds: [mine.user.id, ownLogin.user.id, elsewhere.user.id] });
    expect(bulk.slips.map((s) => s.userId)).toEqual([mine.user.id]);
    expect(bulk.skipped.map((s) => s.userId).sort()).toEqual([ownLogin.user.id, elsewhere.user.id].sort());
  });
});
