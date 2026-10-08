"use server";

import { formText, runAdminAction } from "@/components/admin/server-action";
import type { AdminActionState } from "@/components/admin/form-state";
import { invitationDeliveryMessage } from "@/components/school/invitation-copy";
import type { PasswordResetActionResult } from "@/components/school/PasswordResetPanel";
import { fail, normalizeError } from "@/server/lib/errors";
import { addStudentsToSchoolClass } from "@/server/schools/classes";
import { inviteSchoolMember } from "@/server/schools/invitations";
import { approveStudentRequest, deactivateStudent, declineStudentRequest, resetStudentPasswords, setStudentNumber } from "@/server/schools/students";
import { auditRequest, requireSchoolAction } from "../_lib/context";

/** Invite a student by phone (or email); they accept in their own student account. The link comes back to share. */
export async function inviteStudentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.students.invite", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await inviteSchoolMember(actor, { schoolId, contact: formText(formData, "contact") ?? "", role: "STUDENT" }, await auditRequest());
    return {
      data: result,
      message: invitationDeliveryMessage(result, "The student joins your school when they accept it."),
      revalidate: ["/school/students"],
    };
  });
}

export async function approveRequestAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.students.approve", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    await approveStudentRequest(actor, { schoolId, userId: formText(formData, "userId") }, await auditRequest());
    return { data: null, message: "Request approved. The student is now on your roster.", revalidate: ["/school/students", "/school"] };
  });
}

export async function declineRequestAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.students.decline", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    await declineStudentRequest(actor, { schoolId, userId: formText(formData, "userId") }, await auditRequest());
    return { data: null, message: "Request declined.", revalidate: ["/school/students"] };
  });
}

export async function deactivateStudentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.students.deactivate", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    await deactivateStudent(actor, { schoolId, userId: formText(formData, "userId"), reason: formText(formData, "reason") }, await auditRequest());
    return { data: null, message: "Student removed from your school.", redirectTo: "/school/students", revalidate: ["/school/students", "/school"] };
  });
}

export async function setStudentNumberAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.students.number", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const userId = formText(formData, "userId");
    await setStudentNumber(actor, { schoolId, userId, studentNumber: formText(formData, "studentNumber") ?? "" }, await auditRequest());
    return { data: null, message: "Student number saved.", revalidate: [`/school/students/${userId ?? ""}`] };
  });
}

export async function addStudentToClassAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.students.add_to_class", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const userId = formText(formData, "userId") ?? "";
    const result = await addStudentsToSchoolClass(actor, { schoolId, classId: formText(formData, "classId"), userIds: [userId] }, await auditRequest());
    return {
      data: result,
      message: result.added > 0 ? "Added to the class." : "This student is already in the class.",
      revalidate: [`/school/students/${userId}`, "/school/classes"],
    };
  });
}

/** Resets up to 50 provisioned students' passwords; returns the one-time slips (never stored). */
export async function resetPasswordsAction(input: { userIds: string[] }): Promise<PasswordResetActionResult> {
  try {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await resetStudentPasswords(actor, { schoolId, userIds: Array.isArray(input?.userIds) ? input.userIds : [] }, await auditRequest());
    return { ok: true, data: result };
  } catch (error) {
    const normalized = normalizeError(error, { operation: "school.students.reset_passwords" });
    return fail(normalized.code, normalized.message, normalized.fieldErrors);
  }
}
