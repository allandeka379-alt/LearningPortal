"use server";

import { formList, formText, runAdminAction } from "@/components/admin/server-action";
import type { AdminActionState } from "@/components/admin/form-state";
import {
  addStudentsToSchoolClass,
  assignClassTeacher,
  createSchoolClass,
  removeClassTeacher,
  removeStudentFromSchoolClass,
  setSchoolClassArchived,
  updateSchoolClass,
} from "@/server/schools/classes";
import { enrolStudentsInSubject } from "@/server/schools/subjects";
import { auditRequest, requireSchoolAction } from "../_lib/context";

export async function createClassAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.create", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await createSchoolClass(
      actor,
      {
        schoolId,
        name: formText(formData, "name"),
        subjectId: formText(formData, "subjectId"),
        yearGroupId: formText(formData, "yearGroupId"),
        academicYear: formText(formData, "academicYear"),
        teacherUserId: formText(formData, "teacherUserId"),
      },
      await auditRequest(),
    );
    return { data: result, message: "Class created.", redirectTo: `/school/classes/${result.id}`, revalidate: ["/school/classes", "/school"] };
  });
}

export async function updateClassAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.update", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classId = formText(formData, "classId");
    await updateSchoolClass(
      actor,
      { schoolId, classId, name: formText(formData, "name"), subjectId: formText(formData, "subjectId"), yearGroupId: formText(formData, "yearGroupId") },
      await auditRequest(),
    );
    return { data: null, message: "Class saved.", revalidate: [`/school/classes/${classId ?? ""}`, "/school/classes"] };
  });
}

export async function archiveClassAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.archive", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classId = formText(formData, "classId");
    const archive = formText(formData, "archive") !== "false";
    await setSchoolClassArchived(actor, { schoolId, classId }, archive, await auditRequest());
    return { data: null, message: archive ? "Class archived." : "Class restored.", revalidate: [`/school/classes/${classId ?? ""}`, "/school/classes", "/school"] };
  });
}

export async function assignTeacherAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.assign_teacher", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classId = formText(formData, "classId");
    await assignClassTeacher(actor, { schoolId, classId, teacherUserId: formText(formData, "teacherUserId"), role: formText(formData, "role") ?? "LEAD" }, await auditRequest());
    return { data: null, message: "Teacher assigned.", revalidate: [`/school/classes/${classId ?? ""}`, "/school/classes", "/school/teachers", "/school"] };
  });
}

export async function removeTeacherAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.remove_teacher", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classId = formText(formData, "classId");
    await removeClassTeacher(actor, { schoolId, classId, teacherUserId: formText(formData, "teacherUserId") }, await auditRequest());
    return { data: null, message: "Teacher taken off the class.", revalidate: [`/school/classes/${classId ?? ""}`, "/school/classes", "/school/teachers"] };
  });
}

export async function addStudentsAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.add_students", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classId = formText(formData, "classId");
    const result = await addStudentsToSchoolClass(actor, { schoolId, classId, userIds: formList(formData, "userIds") }, await auditRequest());
    const parts = [`${result.added} student${result.added === 1 ? "" : "s"} added`];
    if (result.enrolled > 0) parts.push(`${result.enrolled} enrolled in the class subject`);
    if (result.skipped > 0) parts.push(`${result.skipped} skipped (not on your roster)`);
    return { data: result, message: `${parts.join(", ")}.`, revalidate: [`/school/classes/${classId ?? ""}`, "/school/classes", "/school"] };
  });
}

export async function removeStudentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.remove_student", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classId = formText(formData, "classId");
    await removeStudentFromSchoolClass(actor, { schoolId, classId, userId: formText(formData, "userId") }, await auditRequest());
    return { data: null, message: "Student taken out of the class.", revalidate: [`/school/classes/${classId ?? ""}`, "/school/classes"] };
  });
}

export async function enrolClassInSubjectAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.classes.enrol_subject", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classId = formText(formData, "classId");
    const result = await enrolStudentsInSubject(actor, { schoolId, classId, subjectId: formText(formData, "subjectId") }, await auditRequest());
    return {
      data: result,
      message: `${result.enrolled} student${result.enrolled === 1 ? "" : "s"} enrolled${result.alreadyEnrolled ? ` (${result.alreadyEnrolled} already were)` : ""}.`,
      revalidate: [`/school/classes/${classId ?? ""}`, "/school/subjects"],
    };
  });
}
