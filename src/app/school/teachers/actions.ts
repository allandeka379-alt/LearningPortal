"use server";

import { formText, runAdminAction } from "@/components/admin/server-action";
import type { AdminActionState } from "@/components/admin/form-state";
import { invitationDeliveryMessage } from "@/components/school/invitation-copy";
import { inviteSchoolMember, resendSchoolInvitation, revokeSchoolInvitation } from "@/server/schools/invitations";
import { deactivateTeacher } from "@/server/schools/teachers";
import { auditRequest, requireSchoolAction } from "../_lib/context";

/**
 * Invite a teacher by email (or phone) — always an invitation link the teacher accepts in their own account. The link
 * is emailed (a phone number gets an SMS only while SMS is switched on) and comes back in `data.inviteLink` to share.
 */
export async function inviteTeacherAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.teachers.invite", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await inviteSchoolMember(actor, { schoolId, contact: formText(formData, "contact") ?? "", role: "TEACHER" }, await auditRequest());
    return {
      data: result,
      message: invitationDeliveryMessage(result, "They join your school when they accept it."),
      revalidate: ["/school/teachers"],
    };
  });
}

/** Re-send a waiting invitation (a fresh link; the old one stops working). */
export async function resendInvitationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.invitations.resend", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await resendSchoolInvitation(actor, { schoolId, invitationId: formText(formData, "invitationId") }, await auditRequest());
    return {
      data: result,
      message: `${invitationDeliveryMessage(result, "The previous link no longer works.")}`,
      revalidate: ["/school/teachers", "/school/students"],
    };
  });
}

/** Withdraw an invitation. */
export async function revokeInvitationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.invitations.revoke", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    await revokeSchoolInvitation(actor, { schoolId, invitationId: formText(formData, "invitationId") }, await auditRequest());
    return { data: null, message: "Invitation withdrawn.", revalidate: ["/school/teachers", "/school/students"] };
  });
}

/** Deactivate a teacher (their classes at this school end). */
export async function deactivateTeacherAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.teachers.deactivate", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await deactivateTeacher(actor, { schoolId, userId: formText(formData, "userId"), reason: formText(formData, "reason") }, await auditRequest());
    return {
      data: result,
      message: result.classesEnded > 0 ? `Teacher deactivated and removed from ${result.classesEnded} class${result.classesEnded === 1 ? "" : "es"}.` : "Teacher deactivated.",
      revalidate: ["/school/teachers", "/school/classes", "/school"],
    };
  });
}
