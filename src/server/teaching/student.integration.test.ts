import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createStudent } from "../../../tests/factories/index";
import { learnerActor } from "../../../tests/factories/learning";
import { assertActiveMember } from "./access";
import { removeStudent } from "./classes";
import { getMyClass, joinClassByCode, leaveClass, listMyClasses } from "./student";
import { expectCode, makeClass, makeStudent, makeTeacher, teachingWorld, type TeachingWorld } from "./testing";

let world: TeachingWorld;

beforeAll(async () => {
  world = await teachingWorld();
});

describe("joining with a code", () => {
  it("joins at once, is idempotent, and accepts codes typed loosely", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, name: "Form 3 Gold" });
    const student = await makeStudent();
    const typed = `${cls.joinCode.slice(0, 3).toLowerCase()} ${cls.joinCode.slice(3)}`;
    await expect(joinClassByCode(student.actor, { code: typed })).resolves.toMatchObject({ classId: cls.id, status: "ACTIVE", alreadyMember: false });
    await expect(joinClassByCode(student.actor, { code: cls.joinCode })).resolves.toMatchObject({ status: "ACTIVE", alreadyMember: true });
    const mine = await listMyClasses(student.actor);
    expect(mine).toEqual([expect.objectContaining({ id: cls.id, name: "Form 3 Gold", status: "ACTIVE", teachers: ["Tess"] })]);
  });

  it("waits for approval when the class requires it, and notifies the teachers", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, joinRequiresApproval: true });
    const student = await makeStudent();
    await expect(joinClassByCode(student.actor, { code: cls.joinCode })).resolves.toMatchObject({ status: "PENDING" });
    expect(await db.notification.count({ where: { userId: world.teacher.userId, type: "class.join_request", data: { path: ["entityId"], equals: cls.id } } })).toBe(1);
    await expectCode(getMyClass(student.actor, cls.id), "NOT_FOUND");
  });

  it("sends a student a teacher removed back through approval", async () => {
    const student = await makeStudent();
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [student.userId] });
    await removeStudent(world.teacher, { classId: cls.id, userId: student.userId });
    await expect(joinClassByCode(student.actor, { code: cls.joinCode })).resolves.toMatchObject({ status: "PENDING" });
  });

  it("lets a student who left rejoin directly", async () => {
    const student = await makeStudent();
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [student.userId] });
    await leaveClass(student.actor, { classId: cls.id });
    await expect(joinClassByCode(student.actor, { code: cls.joinCode })).resolves.toMatchObject({ status: "ACTIVE" });
  });

  it("gives one answer for unknown, malformed, switched-off and archived codes", async () => {
    const student = await makeStudent();
    const archived = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    await db.class.update({ where: { id: archived.id }, data: { archivedAt: new Date() } });
    await expectCode(joinClassByCode(student.actor, { code: "ZZZZZZZZZZ" }), "VALIDATION");
    await expectCode(joinClassByCode(student.actor, { code: "!!" }), "VALIDATION");
    await expectCode(joinClassByCode(student.actor, { code: archived.joinCode }), "VALIDATION");
  });

  it("refuses classes of suspended schools", async () => {
    const other = await teachingWorld();
    const cls = await makeClass({ teacher: other.teacher, schoolId: other.schoolId, subjectId: other.setup.subjectId });
    await db.school.update({ where: { id: other.schoolId }, data: { status: "SUSPENDED" } });
    const student = await makeStudent();
    await expectCode(joinClassByCode(student.actor, { code: cls.joinCode }), "VALIDATION");
  });

  it("respects a guardian's refusal for independent tutors' classes (minors)", async () => {
    const tutor = await makeTeacher();
    const tutorClass = await makeClass({ teacher: tutor, schoolId: null, subjectId: null });
    const schoolClass = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    const { user } = await createStudent({ student: { isMinor: true, guardianConsentStatus: "REFUSED" } });
    const minor = learnerActor(user.id);
    await expectCode(joinClassByCode(minor, { code: tutorClass.joinCode }), "FORBIDDEN");
    await expect(joinClassByCode(minor, { code: schoolClass.joinCode })).resolves.toMatchObject({ status: "ACTIVE" });
  });

  it("only lets students join", async () => {
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId });
    await expectCode(joinClassByCode({ userId: world.teacher.userId, roles: ["TEACHER"] }, { code: cls.joinCode }), "FORBIDDEN");
  });
});

describe("leaving", () => {
  it("ends the teacher's view of the student at once", async () => {
    const student = await makeStudent();
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [student.userId] });
    await expect(assertActiveMember(cls.id, student.userId)).resolves.toHaveProperty("joinedAt");
    await leaveClass(student.actor, { classId: cls.id });
    await expectCode(assertActiveMember(cls.id, student.userId), "NOT_FOUND");
    await expectCode(leaveClass(student.actor, { classId: cls.id }), "NOT_FOUND");
    expect(await listMyClasses(student.actor)).toEqual([]);
  });

  it("never shows another student's class", async () => {
    const member = await makeStudent();
    const outsider = await makeStudent();
    const cls = await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: [member.userId] });
    await expect(getMyClass(member.actor, cls.id)).resolves.toHaveProperty("class.id", cls.id);
    await expectCode(getMyClass(outsider.actor, cls.id), "NOT_FOUND");
  });
});
