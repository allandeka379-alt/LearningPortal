import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createSchool, createSchoolMember, createTeacher } from "../../../tests/factories/index";
import { loadClassForTeacher } from "./access";
import {
  addCoTeacher,
  approveJoinRequest,
  archiveClass,
  createClass,
  declineJoinRequest,
  getClassCreationOptions,
  getClassRoster,
  listTeacherClasses,
  removeCoTeacher,
  removeStudent,
  rotateJoinCode,
  updateClass,
} from "./classes";
import { expectCode, makeClass, makeStudent, makeTeacher, teacherActor, teachingWorld, type TeachingWorld } from "./testing";

let world: TeachingWorld;

beforeAll(async () => {
  world = await teachingWorld();
});

describe("creating classes (§22)", () => {
  it("creates a school class with the teacher as LEAD and a join code", async () => {
    const created = await createClass(world.teacher, {
      name: "Form 4 Maths",
      schoolId: world.schoolId,
      subjectId: world.setup.subjectId,
      academicYear: "2026",
    });
    expect(created.joinCode).toMatch(/^[A-Z2-9]{7}$/);
    const cls = await db.class.findUniqueOrThrow({ where: { id: created.id }, include: { teachers: true } });
    expect(cls).toMatchObject({ schoolId: world.schoolId, subjectId: world.setup.subjectId, qualificationId: world.setup.qualificationId });
    expect(cls.teachers).toEqual([expect.objectContaining({ userId: world.teacher.userId, role: "LEAD", removedAt: null })]);
    const list = await listTeacherClasses(world.teacher);
    expect(list.find((c) => c.id === created.id)).toMatchObject({ role: "LEAD", activeStudents: 0, pendingRequests: 0 });
  });

  it("lets independent tutors create classes without a school and without a subject", async () => {
    const tutor = await makeTeacher();
    const created = await createClass(tutor, { name: "Evening tutoring", schoolId: "", subjectId: "", academicYear: "2026/27" });
    const cls = await db.class.findUniqueOrThrow({ where: { id: created.id } });
    expect(cls.schoolId).toBeNull();
    expect(cls.subjectId).toBeNull();
  });

  it("refuses classes in a school the teacher does not teach at, and non-teachers", async () => {
    const outsider = await makeTeacher();
    await expectCode(createClass(outsider, { name: "X", schoolId: world.schoolId, academicYear: "2026" }), "FORBIDDEN");
    const student = await makeStudent();
    await expectCode(createClass(student.actor as never, { name: "X", academicYear: "2026" }), "FORBIDDEN");
  });

  it("only allows subjects the school offers once it lists them", async () => {
    const { school } = await createSchool();
    const teacher = await makeTeacher({ schoolId: school.id });
    const other = await teachingWorld();
    await db.schoolSubject.create({ data: { schoolId: school.id, subjectId: world.setup.subjectId } });
    await expectCode(createClass(teacher, { name: "X", schoolId: school.id, subjectId: other.setup.subjectId, academicYear: "2026" }), "VALIDATION");
    await expect(createClass(teacher, { name: "Y", schoolId: school.id, subjectId: world.setup.subjectId, academicYear: "2026" })).resolves.toHaveProperty("id");
    const options = await getClassCreationOptions(teacher);
    expect(options.schools).toEqual([{ id: school.id, name: school.name, subjectIds: [world.setup.subjectId] }]);
  });

  it("validates the academic year", async () => {
    await expectCode(createClass(world.teacher, { name: "X", schoolId: world.schoolId, academicYear: "twenty" }), "VALIDATION");
  });
});

describe("class settings and join codes", () => {
  it("rotates the join code, updates settings and archives (read-only afterwards)", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const { joinCode } = await rotateJoinCode(world.teacher, { classId: cls.id });
    expect(joinCode).not.toBe(cls.joinCode);
    await updateClass(world.teacher, { classId: cls.id, name: "Renamed", joinRequiresApproval: "on" });
    expect(await db.class.findUniqueOrThrow({ where: { id: cls.id } })).toMatchObject({ name: "Renamed", joinRequiresApproval: true, joinCode });
    await archiveClass(world.teacher, { classId: cls.id });
    const archived = await db.class.findUniqueOrThrow({ where: { id: cls.id } });
    expect(archived.archivedAt).not.toBeNull();
    expect(archived.joinCode).toBeNull();
    await expectCode(rotateJoinCode(world.teacher, { classId: cls.id }), "CONFLICT");
    // Reading an archived class still works.
    await expect(getClassRoster(world.teacher, cls.id)).resolves.toHaveProperty("students");
  });
});

describe("roster (§22 add / remove students, join requests)", () => {
  it("lists ACTIVE students and PENDING requests by name only, then approves, declines and removes", async () => {
    const a = await makeStudent({ schoolId: world.schoolId, firstName: "Ann" });
    const b = await makeStudent({ schoolId: world.schoolId, firstName: "Ben" });
    const c = await makeStudent({ schoolId: world.schoolId, firstName: "Cid" });
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [a.userId] });
    await db.classMember.createMany({ data: [b.userId, c.userId].map((userId) => ({ classId: cls.id, userId, status: "PENDING" as const, source: "JOIN_CODE" as const })) });

    const roster = await getClassRoster(world.teacher, cls.id);
    expect(roster.students.map((s) => s.name)).toEqual(["Ann"]);
    expect(roster.requests.map((r) => r.name).sort()).toEqual(["Ben", "Cid"]);
    expect(roster.teachers).toEqual([expect.objectContaining({ userId: world.teacher.userId, role: "LEAD", isYou: true })]);
    expect(JSON.stringify(roster)).not.toMatch(/@example\.test/);

    await approveJoinRequest(world.teacher, { classId: cls.id, userId: b.userId });
    await declineJoinRequest(world.teacher, { classId: cls.id, userId: c.userId });
    await removeStudent(world.teacher, { classId: cls.id, userId: a.userId });
    const statuses = await db.classMember.findMany({ where: { classId: cls.id }, select: { userId: true, status: true, removedById: true } });
    expect(Object.fromEntries(statuses.map((s) => [s.userId, s.status]))).toEqual({ [a.userId]: "REMOVED", [b.userId]: "ACTIVE", [c.userId]: "REMOVED" });
    expect(await db.notification.count({ where: { userId: b.userId, type: "class.membership" } })).toBe(1);
    expect(await db.auditLog.count({ where: { targetUserId: a.userId, action: "class_member.remove" } })).toBe(1);
    expect(await db.auditLog.count({ where: { targetUserId: b.userId, action: "class_member.add" } })).toBe(1);
    await expectCode(approveJoinRequest(world.teacher, { classId: cls.id, userId: c.userId }), "NOT_FOUND");
  });
});

describe("co-teachers (ClassTeacher ASSISTANT)", () => {
  it("adds a teacher of the same school as assistant; refuses others; assistants cannot manage co-teachers", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const colleague = await createTeacher({ firstName: "Col" });
    await createSchoolMember({ schoolId: world.schoolId, userId: colleague.user.id, role: "TEACHER" });
    const stranger = await createTeacher();

    await expectCode(addCoTeacher(world.teacher, { classId: cls.id, identifier: stranger.user.emailNormalized as string }), "VALIDATION");
    await expectCode(addCoTeacher(world.teacher, { classId: cls.id, identifier: "nobody@example.test" }), "VALIDATION");
    await addCoTeacher(world.teacher, { classId: cls.id, identifier: colleague.user.emailNormalized as string });
    const assistant = teacherActor(colleague.user.id);
    await expect(loadClassForTeacher(assistant, cls.id)).resolves.toMatchObject({ via: "teacher", isLead: false });
    await expectCode(addCoTeacher(assistant, { classId: cls.id, identifier: stranger.user.emailNormalized as string }), "FORBIDDEN");
    await expectCode(addCoTeacher(world.teacher, { classId: cls.id, identifier: colleague.user.emailNormalized as string }), "CONFLICT");

    // An assistant can step down; afterwards they lose access.
    await removeCoTeacher(assistant, { classId: cls.id, userId: colleague.user.id });
    await expectCode(getClassRoster(assistant, cls.id), "FORBIDDEN");
    await expectCode(removeCoTeacher(world.teacher, { classId: cls.id, userId: world.teacher.userId }), "NOT_FOUND");
  });
});

describe("authorization (ARCHITECTURE §5.3)", () => {
  it("refuses other schools' teachers, removed teachers and suspended schools", async () => {
    const student = await makeStudent({ schoolId: world.schoolId });
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [student.userId] });

    const otherSchool = await teachingWorld();
    await expectCode(getClassRoster(otherSchool.teacher, cls.id), "FORBIDDEN");
    await expectCode(removeStudent(otherSchool.teacher, { classId: cls.id, userId: student.userId }), "FORBIDDEN");
    await expectCode(getClassRoster(world.teacher, "00000000-0000-7000-8000-000000000000"), "NOT_FOUND");

    // A removed co-teacher.
    const former = await makeTeacher({ schoolId: world.schoolId });
    await db.classTeacher.create({ data: { classId: cls.id, userId: former.userId, role: "ASSISTANT", removedAt: new Date() } });
    await expectCode(getClassRoster(former, cls.id), "FORBIDDEN");

    // Removing the teacher's school membership ends their class role (database cascade).
    const leaver = await makeTeacher({ schoolId: world.schoolId });
    await db.classTeacher.create({ data: { classId: cls.id, userId: leaver.userId, role: "ASSISTANT" } });
    await expect(getClassRoster(leaver, cls.id)).resolves.toHaveProperty("students");
    await db.schoolMember.updateMany({ where: { schoolId: world.schoolId, userId: leaver.userId }, data: { status: "REMOVED", removedAt: new Date() } });
    await expectCode(getClassRoster(leaver, cls.id), "FORBIDDEN");

    // A suspended school's classes are out of reach for its teachers.
    const suspended = await teachingWorld();
    const sc = await makeClass({ teacher: suspended.teacher, schoolId: suspended.schoolId, subjectId: suspended.setup.subjectId });
    await db.school.update({ where: { id: suspended.schoolId }, data: { status: "SUSPENDED" } });
    await expectCode(getClassRoster(suspended.teacher, sc.id), "FORBIDDEN");
    expect((await listTeacherClasses(suspended.teacher)).map((c) => c.id)).not.toContain(sc.id);
  });

  it("lets a school admin of the class's school manage it, but not another school's admin", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const admin = await createTeacher();
    await createSchoolMember({ schoolId: world.schoolId, userId: admin.user.id, role: "SCHOOL_ADMIN" });
    await expect(loadClassForTeacher(teacherActor(admin.user.id, ["TEACHER", "SCHOOL_ADMIN"]), cls.id)).resolves.toMatchObject({ via: "school_admin" });
    const foreign = await teachingWorld();
    const foreignAdmin = await createTeacher();
    await createSchoolMember({ schoolId: foreign.schoolId, userId: foreignAdmin.user.id, role: "SCHOOL_ADMIN" });
    await expectCode(loadClassForTeacher(teacherActor(foreignAdmin.user.id, ["SCHOOL_ADMIN"]), cls.id), "FORBIDDEN");
  });
});
