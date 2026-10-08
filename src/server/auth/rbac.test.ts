import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import {
  createClass,
  createCurriculumChain,
  createParent,
  createSchool,
  createSchoolMember,
  createStudent,
  createTeacher,
  createUser,
  linkParent,
} from "../../../tests/factories/index";
import { loadActor, type Actor } from "./actor";
import {
  assertCanManageClass,
  assertCanViewStudent,
  canManageClass,
  canManageSchool,
  canViewClass,
  canViewStudent,
  getClassAccess,
  isActiveSchoolAdmin,
  isCurrentClassTeacher,
} from "./rbac";

const MISSING_ID = "00000000-0000-7000-8000-000000000000";

async function actorOf(userId: string): Promise<Actor> {
  const actor = await loadActor(userId);
  if (!actor) throw new Error("actor not loadable");
  return actor;
}

/** A school with an admin, a teacher teaching one class with one student, plus an unrelated school and teacher. */
async function schoolWorld() {
  const { school } = await createSchool();
  const admin = (await createUser({ roles: [] })).user;
  await createSchoolMember({ schoolId: school.id, userId: admin.id, role: "SCHOOL_ADMIN" });
  const teacher = (await createTeacher()).user;
  const student = (await createStudent()).user;
  const fixture = await createClass({ schoolId: school.id, createdById: teacher.id, studentUserIds: [student.id] });

  const { school: otherSchool } = await createSchool();
  const otherAdmin = (await createUser({ roles: [] })).user;
  await createSchoolMember({ schoolId: otherSchool.id, userId: otherAdmin.id, role: "SCHOOL_ADMIN" });
  const otherTeacher = (await createTeacher()).user;
  await createClass({ schoolId: otherSchool.id, createdById: otherTeacher.id });
  return { school, admin, teacher, student, cls: fixture.class, otherSchool, otherAdmin, otherTeacher };
}

describe("class access (§5.3: teacher own classes, school admin own school, ADMIN all)", () => {
  it("grants the class's teacher, its school's admin and platform admins; nobody else", async () => {
    const w = await schoolWorld();
    const platformAdmin = (await createUser({ roles: ["ADMIN"] })).user;
    const editor = (await createUser({ roles: ["CONTENT_EDITOR"] })).user;

    expect(await canManageClass(await actorOf(w.teacher.id), w.cls.id)).toBe(true);
    expect(await getClassAccess(await actorOf(w.teacher.id), w.cls.id)).toBe("teacher");
    expect(await canManageClass(await actorOf(w.admin.id), w.cls.id)).toBe(true);
    expect(await getClassAccess(await actorOf(w.admin.id), w.cls.id)).toBe("school_admin");
    expect(await canViewClass(await actorOf(platformAdmin.id), w.cls.id)).toBe(true);
    expect(await getClassAccess(await actorOf(platformAdmin.id), w.cls.id)).toBe("staff");

    expect(await canManageClass(await actorOf(w.otherTeacher.id), w.cls.id)).toBe(false);
    expect(await canManageClass(await actorOf(w.otherAdmin.id), w.cls.id)).toBe(false);
    expect(await canManageClass(await actorOf(w.student.id), w.cls.id)).toBe(false);
    expect(await canManageClass(await actorOf(editor.id), w.cls.id)).toBe(false);
    expect(await canManageClass(await actorOf(platformAdmin.id), MISSING_ID)).toBe(false);
    expect(await canManageClass(await actorOf(w.teacher.id), "not-a-uuid")).toBe(false);

    const error = await assertCanManageClass(await actorOf(w.otherTeacher.id), w.cls.id).catch((caught: unknown) => caught);
    expect(isAppError(error) && error.code).toBe("FORBIDDEN");
  });

  it("stops granting a teacher once removed from the class", async () => {
    const w = await schoolWorld();
    expect(await isCurrentClassTeacher(w.teacher.id, w.cls.id)).toBe(true);
    await db.classTeacher.updateMany({ where: { classId: w.cls.id, userId: w.teacher.id }, data: { removedAt: new Date() } });
    expect(await isCurrentClassTeacher(w.teacher.id, w.cls.id)).toBe(false);
    expect(await canManageClass(await actorOf(w.teacher.id), w.cls.id)).toBe(false);
  });

  it("school admins of suspended schools lose school authority", async () => {
    const { school } = await createSchool({ status: "SUSPENDED" });
    const admin = (await createUser({ roles: [] })).user;
    await createSchoolMember({ schoolId: school.id, userId: admin.id, role: "SCHOOL_ADMIN" });
    const fixture = await createClass({ schoolId: school.id });
    const actor = await actorOf(admin.id);
    expect(actor.roles).not.toContain("SCHOOL_ADMIN");
    expect(await canManageClass({ userId: admin.id, roles: ["SCHOOL_ADMIN"] }, fixture.class.id)).toBe(false);
    expect(await isActiveSchoolAdmin(admin.id, school.id)).toBe(false);
  });

  it("independent tutors manage their own school-less classes", async () => {
    const tutor = (await createTeacher()).user;
    const fixture = await createClass({ schoolId: null, createdById: tutor.id });
    expect(await canManageClass(await actorOf(tutor.id), fixture.class.id)).toBe(true);
    expect(await canManageClass(await actorOf((await createTeacher()).user.id), fixture.class.id)).toBe(false);
  });
});

describe("school access", () => {
  it("school admins manage their own school only; ADMIN any existing school", async () => {
    const w = await schoolWorld();
    const platformAdmin = (await createUser({ roles: ["SUPER_ADMIN"] })).user;
    expect(await canManageSchool(await actorOf(w.admin.id), w.school.id)).toBe(true);
    expect(await canManageSchool(await actorOf(w.admin.id), w.otherSchool.id)).toBe(false);
    expect(await canManageSchool(await actorOf(w.teacher.id), w.school.id)).toBe(false);
    expect(await canManageSchool(await actorOf(platformAdmin.id), w.otherSchool.id)).toBe(true);
    expect(await canManageSchool(await actorOf(platformAdmin.id), MISSING_ID)).toBe(false);
  });
});

describe("student access (§5.3)", () => {
  it("self", async () => {
    const { user } = await createStudent();
    expect(await canViewStudent(await actorOf(user.id), user.id)).toEqual({ via: "self" });
  });

  it("a parent with an ACTIVE link, limited by the link's flags; never after revocation", async () => {
    const student = (await createStudent()).user;
    const parent = (await createParent()).user;
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const actor = await actorOf(parent.id);
    expect(await canViewStudent(actor, student.id, { aspect: "progress" })).toEqual({
      via: "parent",
      linkId: link.id,
      permissions: { progress: true, activity: true, results: true },
    });

    await db.parentStudentLink.update({ where: { id: link.id }, data: { canViewProgress: false } });
    expect(await canViewStudent(actor, student.id, { aspect: "progress" })).toBeNull();
    expect(await canViewStudent(actor, student.id, { aspect: "results" })).toMatchObject({ via: "parent" });
    expect(await canViewStudent(actor, student.id)).toMatchObject({ via: "parent", permissions: { progress: false } });

    await db.parentStudentLink.update({ where: { id: link.id }, data: { status: "REVOKED", revokedAt: new Date() } });
    expect(await canViewStudent(actor, student.id)).toBeNull();
  });

  it("an unrelated parent sees nothing", async () => {
    const student = (await createStudent()).user;
    const stranger = (await createParent()).user;
    expect(await canViewStudent(await actorOf(stranger.id), student.id)).toBeNull();
  });

  it("a teacher of an active class the student is in, scoped to that class's subjects", async () => {
    const w = await schoolWorld();
    const teacherActor = await actorOf(w.teacher.id);
    // A subject-less class with no work set yet: no subject is visible (never "everything").
    expect(await canViewStudent(teacherActor, w.student.id)).toEqual({ via: "teacher", classIds: [w.cls.id], subjectIds: [] });
    expect(await canViewStudent(await actorOf(w.otherTeacher.id), w.student.id)).toBeNull();

    // The subjects of the work set to the class become visible (drafts do not count).
    const maths = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, objectivesPerSubtopic: 0, lessonsPerTopic: 0 });
    const english = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, objectivesPerSubtopic: 0, lessonsPerTopic: 0 });
    const work = (subjectId: string, status: "DRAFT" | "PUBLISHED") =>
      db.assignment.create({
        data: { classId: w.cls.id, createdById: w.teacher.id, subjectId, type: "PRACTICE", practiceConfig: { audience: "CLASS", topicIds: [], questionCount: 5 }, status, title: "Work", ...(status === "PUBLISHED" ? { publishedAt: new Date() } : {}) },
      });
    await work(english.subject.id, "DRAFT");
    expect(await canViewStudent(teacherActor, w.student.id)).toMatchObject({ subjectIds: [] });
    await work(maths.subject.id, "PUBLISHED");
    expect(await canViewStudent(teacherActor, w.student.id)).toEqual({ via: "teacher", classIds: [w.cls.id], subjectIds: [maths.subject.id] });

    // A second shared class WITH a subject adds that subject.
    const subjectClass = await createClass({ schoolId: w.school.id, createdById: w.teacher.id, studentUserIds: [w.student.id], subjectId: english.subject.id });
    const both = await canViewStudent(teacherActor, w.student.id);
    expect(both).toMatchObject({ via: "teacher", subjectIds: [maths.subject.id, english.subject.id].sort() });
    expect(both?.via === "teacher" ? [...both.classIds].sort() : []).toEqual([w.cls.id, subjectClass.class.id].sort());
    await db.class.update({ where: { id: subjectClass.class.id }, data: { archivedAt: new Date() } });

    await db.classMember.updateMany({
      where: { classId: w.cls.id, userId: w.student.id },
      data: { status: "REMOVED", removedAt: new Date() },
    });
    expect(await canViewStudent(await actorOf(w.teacher.id), w.student.id)).toBeNull();
  });

  it("archived classes no longer grant teacher access", async () => {
    const w = await schoolWorld();
    await db.class.update({ where: { id: w.cls.id }, data: { archivedAt: new Date() } });
    expect(await canViewStudent(await actorOf(w.teacher.id), w.student.id)).toBeNull();
  });

  it("a school admin of the student's school (ACTIVE STUDENT membership), not of another school", async () => {
    const w = await schoolWorld();
    expect(await canViewStudent(await actorOf(w.admin.id), w.student.id)).toEqual({ via: "school_admin", schoolIds: [w.school.id] });
    expect(await canViewStudent(await actorOf(w.otherAdmin.id), w.student.id)).toBeNull();
  });

  it("platform admins may view, but must audit; content editors may not", async () => {
    const student = (await createStudent()).user;
    const admin = (await createUser({ roles: ["ADMIN"] })).user;
    const editor = (await createUser({ roles: ["CONTENT_EDITOR"] })).user;
    expect(await canViewStudent(await actorOf(admin.id), student.id)).toEqual({ via: "staff", auditRequired: true });
    expect(await canViewStudent(await actorOf(admin.id), MISSING_ID)).toBeNull();
    expect(await canViewStudent(await actorOf(editor.id), student.id)).toBeNull();
    const error = await assertCanViewStudent(await actorOf(editor.id), student.id).catch((caught: unknown) => caught);
    expect(isAppError(error) && error.code).toBe("FORBIDDEN");
  });

  it("another student sees nothing", async () => {
    const a = (await createStudent()).user;
    const b = (await createStudent()).user;
    expect(await canViewStudent(await actorOf(a.id), b.id)).toBeNull();
    expect(await canViewStudent(await actorOf(a.id), "not-a-uuid")).toBeNull();
  });
});
