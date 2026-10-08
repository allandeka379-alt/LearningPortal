import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createCurriculumChain, createStudent, type CurriculumChain } from "../../../tests/factories/index";
import {
  addStudentsToSchoolClass,
  assignClassTeacher,
  createSchoolClass,
  getSchoolClass,
  listSchoolClasses,
  removeClassTeacher,
  removeStudentFromSchoolClass,
  setSchoolClassArchived,
  updateSchoolClass,
} from "./classes";
import { enrolStudentsInSubject, listSchoolSubjects, listSubjectCatalogue, setSchoolSubjects } from "./subjects";
import { deactivateTeacher } from "./teachers";
import { errorCodeOf, schoolWithAdmin, studentOf, teacherOf } from "./testing";

/**
 * Classes and offered subjects (§23 create classes, assign teachers, set subjects): the school's catalogue, class
 * teachers (one LEAD, database membership guard), student placement with subject enrolment (source SCHOOL), and
 * scoping. Negative cases: subject not offered / not in the catalogue, teacher of another school or removed, another
 * school's admin, archived class.
 */

let chain: CurriculumChain;
beforeAll(async () => {
  chain = await createCurriculumChain({ lessonsPerTopic: 0, topicCount: 1, subtopicsPerTopic: 0 });
});

describe("offered subjects", () => {
  it("offers catalogue subjects, refuses others, and reports usage", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const catalogue = (await listSubjectCatalogue(adminActor!, { schoolId: school.id, q: chain.subject.officialCode! })).items;
    expect(catalogue.find((s) => s.id === chain.subject.id)).toMatchObject({ offered: false, name: chain.subject.name });
    expect(await setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [chain.subject.id] })).toEqual({ added: 1, removed: 0 });
    expect((await listSubjectCatalogue(adminActor!, { schoolId: school.id, q: chain.subject.officialCode! })).items.find((s) => s.id === chain.subject.id)?.offered).toBe(true);

    const hidden = await db.subject.create({
      data: { qualificationId: chain.qualification.id, categoryId: chain.category.id, slug: `hidden-${Date.now()}`, name: "Hidden subject", catalogueStatus: "HIDDEN" },
    });
    expect(await errorCodeOf(setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [chain.subject.id, hidden.id] }))).toBe("VALIDATION");

    const offered = await listSchoolSubjects(adminActor!, school.id);
    expect(offered).toEqual([expect.objectContaining({ id: chain.subject.id, classes: 0, studentsEnrolled: 0 })]);
    expect(await setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [] })).toEqual({ added: 0, removed: 1 });
    expect(await listSchoolSubjects(adminActor!, school.id)).toEqual([]);
    const other = await schoolWithAdmin();
    expect(await errorCodeOf(setSchoolSubjects(other.adminActor!, { schoolId: school.id, subjectIds: [] }))).toBe("FORBIDDEN");
  });
});

describe("classes", () => {
  it("creates a class with an offered subject and a lead teacher; refuses other subjects and teachers", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const teacher = await teacherOf(school.id);
    expect(await errorCodeOf(createSchoolClass(adminActor!, { schoolId: school.id, name: "4A", subjectId: chain.subject.id, academicYear: "2026" }))).toBe("VALIDATION");
    await setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [chain.subject.id] });
    const otherSchool = await schoolWithAdmin();
    const outsider = await teacherOf(otherSchool.school.id);
    expect(
      await errorCodeOf(createSchoolClass(adminActor!, { schoolId: school.id, name: "4A", subjectId: chain.subject.id, academicYear: "2026", teacherUserId: outsider.user.id })),
    ).toBe("VALIDATION");

    const { id } = await createSchoolClass(adminActor!, { schoolId: school.id, name: "4A Maths", subjectId: chain.subject.id, academicYear: "2026", teacherUserId: teacher.user.id });
    const created = await db.class.findUniqueOrThrow({ where: { id } });
    expect(created).toMatchObject({ schoolId: school.id, subjectId: chain.subject.id, qualificationId: chain.qualification.id, createdById: adminActor!.userId });
    expect(created.joinCode).toMatch(/^[A-Z0-9]{6,10}$/);
    const list = await listSchoolClasses(adminActor!, { schoolId: school.id });
    expect(list).toEqual([expect.objectContaining({ id, name: "4A Maths", subject: { id: chain.subject.id, name: chain.subject.name }, students: 0, teachers: [expect.objectContaining({ userId: teacher.user.id, role: "LEAD" })] })]);
    expect(await db.notification.count({ where: { userId: teacher.user.id, type: "class.teacher_assigned" } })).toBe(1);
    expect(await errorCodeOf(getSchoolClass(otherSchool.adminActor!, { schoolId: otherSchool.school.id, classId: id }))).toBe("NOT_FOUND");
  });

  it("swaps the lead teacher, removes teachers and refuses a deactivated teacher", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const lead = await teacherOf(school.id, { firstName: "Lead" });
    const second = await teacherOf(school.id, { firstName: "Second" });
    const { id: classId } = await createSchoolClass(adminActor!, { schoolId: school.id, name: "2C", academicYear: "2026", teacherUserId: lead.user.id });
    await assignClassTeacher(adminActor!, { schoolId: school.id, classId, teacherUserId: second.user.id, role: "LEAD" });
    const teachers = await db.classTeacher.findMany({ where: { classId, removedAt: null }, select: { userId: true, role: true } });
    expect(teachers).toEqual(expect.arrayContaining([{ userId: second.user.id, role: "LEAD" }, { userId: lead.user.id, role: "ASSISTANT" }]));
    expect(await errorCodeOf(assignClassTeacher(adminActor!, { schoolId: school.id, classId, teacherUserId: second.user.id, role: "LEAD" }))).toBe("CONFLICT");
    await removeClassTeacher(adminActor!, { schoolId: school.id, classId, teacherUserId: lead.user.id });
    expect(await errorCodeOf(removeClassTeacher(adminActor!, { schoolId: school.id, classId, teacherUserId: lead.user.id }))).toBe("NOT_FOUND");

    await deactivateTeacher(adminActor!, { schoolId: school.id, userId: lead.user.id });
    expect(await errorCodeOf(assignClassTeacher(adminActor!, { schoolId: school.id, classId, teacherUserId: lead.user.id, role: "ASSISTANT" }))).toBe("VALIDATION");
  });

  it("places the school's students, enrols them in the class subject, and skips outsiders", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    await setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [chain.subject.id] });
    const { id: classId } = await createSchoolClass(adminActor!, { schoolId: school.id, name: "Form 4 Maths", subjectId: chain.subject.id, academicYear: "2026" });
    const a = await studentOf(school.id, { firstName: "Anesu" });
    const b = await studentOf(school.id, { firstName: "Bongani" });
    const outsider = (await createStudent()).user;
    const result = await addStudentsToSchoolClass(adminActor!, { schoolId: school.id, classId, userIds: [a.user.id, b.user.id, outsider.id] });
    expect(result).toEqual({ added: 2, alreadyMembers: 0, skipped: 1, enrolled: 2 });
    const enrolments = await db.subjectEnrollment.findMany({ where: { subjectId: chain.subject.id, userId: { in: [a.user.id, b.user.id] } } });
    expect(enrolments.map((e) => e.enrolledVia)).toEqual(["SCHOOL", "SCHOOL"]);
    expect(await db.classMember.count({ where: { classId, userId: outsider.id } })).toBe(0);
    expect((await addStudentsToSchoolClass(adminActor!, { schoolId: school.id, classId, userIds: [a.user.id] })).alreadyMembers).toBe(1);

    const detail = await getSchoolClass(adminActor!, { schoolId: school.id, classId });
    expect(detail.roster.map((r) => r.userId).sort()).toEqual([a.user.id, b.user.id].sort());
    await removeStudentFromSchoolClass(adminActor!, { schoolId: school.id, classId, userId: b.user.id });
    expect((await getSchoolClass(adminActor!, { schoolId: school.id, classId })).students).toBe(1);
    expect((await listSchoolSubjects(adminActor!, school.id))[0]).toMatchObject({ classes: 1, studentsEnrolled: 2 });
  });

  it("renames, changes subject while empty, archives and restores", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    await setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [chain.subject.id] });
    const { id: classId } = await createSchoolClass(adminActor!, { schoolId: school.id, name: "Old name", academicYear: "2026" });
    await updateSchoolClass(adminActor!, { schoolId: school.id, classId, name: "New name", subjectId: chain.subject.id });
    expect(await db.class.findUniqueOrThrow({ where: { id: classId } })).toMatchObject({ name: "New name", subjectId: chain.subject.id });
    await setSchoolClassArchived(adminActor!, { schoolId: school.id, classId }, true);
    const archived = await db.class.findUniqueOrThrow({ where: { id: classId } });
    expect(archived.archivedAt).not.toBeNull();
    expect(archived.joinCode).toBeNull();
    const student = await studentOf(school.id);
    expect(await errorCodeOf(addStudentsToSchoolClass(adminActor!, { schoolId: school.id, classId, userIds: [student.user.id] }))).toBe("CONFLICT");
    expect((await listSchoolClasses(adminActor!, { schoolId: school.id })).map((c) => c.id)).not.toContain(classId);
    expect((await listSchoolClasses(adminActor!, { schoolId: school.id, includeArchived: true })).map((c) => c.id)).toContain(classId);
    await setSchoolClassArchived(adminActor!, { schoolId: school.id, classId }, false);
    expect((await db.class.findUniqueOrThrow({ where: { id: classId } })).archivedAt).toBeNull();
  });

  it("bulk-enrols a class in an offered subject", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const { id: classId } = await createSchoolClass(adminActor!, { schoolId: school.id, name: "Form 2 group", academicYear: "2026" });
    const s = await studentOf(school.id);
    await addStudentsToSchoolClass(adminActor!, { schoolId: school.id, classId, userIds: [s.user.id] });
    expect(await errorCodeOf(enrolStudentsInSubject(adminActor!, { schoolId: school.id, subjectId: chain.subject.id, classId }))).toBe("VALIDATION");
    await setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [chain.subject.id] });
    expect(await enrolStudentsInSubject(adminActor!, { schoolId: school.id, subjectId: chain.subject.id, classId })).toEqual({ enrolled: 1, alreadyEnrolled: 0, skipped: 0 });
    expect(await enrolStudentsInSubject(adminActor!, { schoolId: school.id, subjectId: chain.subject.id, classId })).toEqual({ enrolled: 0, alreadyEnrolled: 1, skipped: 0 });
  });
});
