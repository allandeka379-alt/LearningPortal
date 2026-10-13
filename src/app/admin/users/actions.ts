"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction, requireAdminStepUpAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import {
  auditRequestFrom,
  createStaffUser,
  forceSignOut,
  grantStaffRole,
  reactivateUser,
  recordStudentView,
  revokeStaffRole,
  revokeUserSession,
  issueTemporaryPasswordForUser,
  sendPasswordResetInstructions,
  sendVerificationReminder,
  suspendUser,
} from "@/server/cms/users/service";

/**
 * Users Server Actions (thin: guard → service → result). Each re-checks `users.manage` (ADMIN / SUPER_ADMIN, scope
 * "all"); staff role changes additionally need `roles.grant` and a password confirmation within 15 minutes. The
 * services validate input, enforce the resource rules (no self-actions, administrators only by SUPER_ADMIN) and audit.
 */

async function audit() {
  return auditRequestFrom(await adminRequestMeta());
}

function userPaths(userId: string | undefined): string[] {
  return userId ? [`/admin/users/${userId}`, "/admin/users", "/admin/students", "/admin/teachers"] : ["/admin/users"];
}

export async function createStaffUserAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.createStaffUser", formData, async () => {
    await requireAdminAction("users.manage");
    const actor = await requireAdminStepUpAction("roles.grant", "restricted");
    const result = await createStaffUser(
      actor,
      {
        firstName: formText(formData, "firstName") ?? "",
        lastName: formText(formData, "lastName"),
        email: formText(formData, "email") ?? "",
        role: formText(formData, "role") ?? "",
        reason: formText(formData, "reason") ?? "",
      },
      await audit(),
    );
    return {
      data: result,
      message: "Staff account created. Copy the one-time password now; it is shown once.",
      revalidate: userPaths(result.userId),
    };
  });
}

/** Records the reason for opening a student's record (`student.view`), then shows it. */
export async function openStudentRecordAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.studentView", formData, async () => {
    const actor = await requireAdminAction("users.manage");
    const userId = formText(formData, "userId");
    await recordStudentView(actor, { userId, reason: formText(formData, "reason") }, await audit());
    return { data: null, message: "Access recorded.", revalidate: userPaths(userId) };
  });
}

export async function suspendUserAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.suspend", formData, async () => {
    const actor = await requireAdminAction("users.manage");
    const userId = formText(formData, "userId");
    const result = await suspendUser(actor, { userId, reason: formText(formData, "reason") }, await audit());
    return {
      data: result,
      message: `Account suspended. ${result.sessionsRevoked} active ${result.sessionsRevoked === 1 ? "session was" : "sessions were"} signed out.`,
      revalidate: userPaths(userId),
    };
  });
}

export async function reactivateUserAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.reactivate", formData, async () => {
    const actor = await requireAdminAction("users.manage");
    const userId = formText(formData, "userId");
    await reactivateUser(actor, { userId, reason: formText(formData, "reason") }, await audit());
    return { data: null, message: "Account reactivated. The user can sign in again.", revalidate: userPaths(userId) };
  });
}

export async function forceSignOutAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.signOut", formData, async () => {
    const actor = await requireAdminAction("users.manage");
    const userId = formText(formData, "userId");
    const result = await forceSignOut(actor, { userId }, await audit());
    return { data: result, message: `Signed out of ${result.sessionsRevoked} ${result.sessionsRevoked === 1 ? "session" : "sessions"}.`, revalidate: userPaths(userId) };
  });
}

export async function revokeSessionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.revokeSession", formData, async () => {
    const actor = await requireAdminAction("users.manage");
    const userId = formText(formData, "userId");
    await revokeUserSession(actor, { userId, sessionId: formText(formData, "sessionId") }, await audit());
    return { data: null, message: "Session signed out.", revalidate: userPaths(userId) };
  });
}

export async function grantRoleAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.grantRole", formData, async () => {
    await requireAdminAction("users.manage");
    const actor = await requireAdminStepUpAction("roles.grant", "restricted");
    const userId = formText(formData, "userId");
    await grantStaffRole(actor, { userId, role: formText(formData, "role"), reason: formText(formData, "reason") }, await audit());
    return { data: null, message: "Role granted. The user must sign in again.", revalidate: userPaths(userId) };
  });
}

export async function revokeRoleAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.revokeRole", formData, async () => {
    await requireAdminAction("users.manage");
    const actor = await requireAdminStepUpAction("roles.grant", "restricted");
    const userId = formText(formData, "userId");
    await revokeStaffRole(actor, { userId, role: formText(formData, "role"), reason: formText(formData, "reason") }, await audit());
    return { data: null, message: "Role removed. The user must sign in again.", revalidate: userPaths(userId) };
  });
}

export async function sendPasswordResetAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.passwordReset", formData, async () => {
    const actor = await requireAdminAction("users.manage");
    const userId = formText(formData, "userId");
    const result = await sendPasswordResetInstructions(actor, { userId, channel: formText(formData, "channel") }, await audit());
    return { data: result, message: `Reset instructions sent to ${result.sentTo}.`, revalidate: userPaths(userId) };
  });
}

/**
 * "Issue a one-time password" (account recovery without email): needs a recent password confirmation (step-up)
 * because the admin is handed a working credential. The password comes back ONCE in `data.temporaryPassword`.
 */
export async function issueTemporaryPasswordAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.temporaryPassword", formData, async () => {
    const actor = await requireAdminStepUpAction("users.manage");
    const userId = formText(formData, "userId");
    const result = await issueTemporaryPasswordForUser(actor, { userId, reason: formText(formData, "reason") }, await audit());
    return {
      data: result,
      message: `One-time password set. Give it to the person privately; they sign in with ${result.signInWith.join(" or ")} and must choose a new password straight away.`,
      revalidate: userPaths(userId),
    };
  });
}

export async function sendVerificationReminderAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.users.verificationReminder", formData, async () => {
    const actor = await requireAdminAction("users.manage");
    const userId = formText(formData, "userId");
    const result = await sendVerificationReminder(actor, { userId, channel: formText(formData, "channel") }, await audit());
    return { data: result, message: `Verification reminder sent to ${result.sentTo}.`, revalidate: userPaths(userId) };
  });
}
