"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { invitationDeliveryMessage } from "@/components/school/invitation-copy";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formFlag, formText, runAdminAction } from "@/components/admin/server-action";
import {
  changeSchoolStatus,
  createSchool,
  inviteSchoolMember,
  removeSchoolMember,
  resendInvitation,
  revokeInvitation,
  updateSchool,
} from "@/server/cms/schools/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Schools Server Actions (thin): `school.manage` with scope "all" (ADMIN / SUPER_ADMIN) re-checked on every call;
 * the services validate, enforce the lifecycle rules and audit.
 */

async function audit() {
  return auditRequestFrom(await adminRequestMeta());
}

function schoolFields(formData: FormData) {
  return {
    name: formText(formData, "name"),
    slug: formText(formData, "slug"),
    countryId: formText(formData, "countryId"),
    type: formText(formData, "type"),
    region: formText(formData, "region"),
    district: formText(formData, "district"),
    town: formText(formData, "town"),
    officialCode: formText(formData, "officialCode"),
    contactEmail: formText(formData, "contactEmail"),
    contactPhone: formText(formData, "contactPhone"),
    website: formText(formData, "website"),
    timezone: formText(formData, "timezone"),
  };
}

function schoolPaths(schoolId: string | undefined): string[] {
  return schoolId ? ["/admin/schools", `/admin/schools/${schoolId}`] : ["/admin/schools"];
}

export async function createSchoolAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.schools.create", formData, async () => {
    const actor = await requireAdminAction("school.manage");
    const school = await createSchool(actor, { ...schoolFields(formData), verifyNow: formFlag(formData, "verifyNow") }, await audit());
    return { data: school, message: "School created.", redirectTo: `/admin/schools/${school.id}`, revalidate: schoolPaths(school.id) };
  });
}

export async function updateSchoolAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.schools.update", formData, async () => {
    const actor = await requireAdminAction("school.manage");
    const schoolId = formText(formData, "schoolId");
    const result = await updateSchool(actor, { schoolId, ...schoolFields(formData) }, await audit());
    return {
      data: result,
      message: result.changed.length === 0 ? "Nothing changed." : "School details saved.",
      revalidate: schoolPaths(schoolId),
    };
  });
}

export async function changeSchoolStatusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.schools.status", formData, async () => {
    const actor = await requireAdminAction("school.manage");
    const schoolId = formText(formData, "schoolId");
    const result = await changeSchoolStatus(actor, { schoolId, to: formText(formData, "to"), reason: formText(formData, "reason") }, await audit());
    const messages: Record<string, string> = {
      ACTIVE: "School is active.",
      SUSPENDED: "School suspended. Its admins and teachers lose school access.",
      CLOSED: "School closed. Its history is kept.",
    };
    return { data: result, message: messages[result.status] ?? "Status updated.", revalidate: schoolPaths(schoolId) };
  });
}

export async function inviteMemberAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.schools.invite", formData, async () => {
    const actor = await requireAdminAction("school.manage");
    const schoolId = formText(formData, "schoolId");
    const outcome = await inviteSchoolMember(actor, { schoolId, contact: formText(formData, "contact"), role: formText(formData, "role") }, await audit());
    const message =
      outcome.outcome === "added"
        ? `Added to the school${outcome.teacherRoleGranted ? " and given teacher access" : ""}. They have been notified.`
        : invitationDeliveryMessage(outcome, outcome.outcome === "reinvited" ? "The previous link no longer works." : "It is valid for 14 days.");
    return { data: outcome, message, revalidate: schoolPaths(schoolId) };
  });
}

export async function removeMemberAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.schools.removeMember", formData, async () => {
    const actor = await requireAdminAction("school.manage");
    const schoolId = formText(formData, "schoolId");
    await removeSchoolMember(actor, { schoolId, memberId: formText(formData, "memberId"), reason: formText(formData, "reason") }, await audit());
    return { data: null, message: "Membership ended.", revalidate: schoolPaths(schoolId) };
  });
}

export async function resendInvitationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.schools.resendInvitation", formData, async () => {
    const actor = await requireAdminAction("school.manage");
    const schoolId = formText(formData, "schoolId");
    const result = await resendInvitation(actor, { schoolId, invitationId: formText(formData, "invitationId") }, await audit());
    return { data: result, message: invitationDeliveryMessage(result, "The previous link no longer works."), revalidate: schoolPaths(schoolId) };
  });
}

export async function revokeInvitationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.schools.revokeInvitation", formData, async () => {
    const actor = await requireAdminAction("school.manage");
    const schoolId = formText(formData, "schoolId");
    await revokeInvitation(actor, { schoolId, invitationId: formText(formData, "invitationId") }, await audit());
    return { data: null, message: "Invitation revoked.", revalidate: schoolPaths(schoolId) };
  });
}
