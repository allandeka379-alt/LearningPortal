"use server";

import { redirect } from "next/navigation";
import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { acceptClassInvitation, declineClassInvitation } from "@/server/teaching/invitations";
import { joinClassByCode, leaveClass, startAssignmentWork } from "@/server/teaching/student";

/**
 * Student class actions (§22 student side). Thin: re-check the onboarded student, pass raw input to the teaching
 * services (validation, membership rules, consent) and return a `FormActionState`; successful joins and starts
 * navigate on.
 */

function invitationRef(formData: FormData): { token?: string; invitationId?: string } {
  const token = formString(formData, "token");
  const invitationId = formString(formData, "invitationId");
  return token ? { token } : invitationId ? { invitationId } : {};
}

export async function joinClassAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  const next: { href: string | null } = { href: null };
  const result = await runStudentAction("classes.join", async () => {
    const actor = await requireOnboardedStudentForAction();
    const joined = await joinClassByCode(actor, { code: formString(formData, "code") ?? "" });
    if (joined.status === "ACTIVE") next.href = `/app/classes/${joined.classId}`;
    return {
      message:
        joined.status === "PENDING"
          ? `Request sent to ${joined.className}. You'll be told when a teacher approves it.`
          : joined.alreadyMember
            ? `You're already in ${joined.className}.`
            : `You joined ${joined.className}.`,
      revalidateLayout: true,
    };
  });
  if (result?.ok && next.href) redirect(next.href);
  return result;
}

export async function leaveClassAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  const result = await runStudentAction("classes.leave", async () => {
    const actor = await requireOnboardedStudentForAction();
    await leaveClass(actor, { classId: formString(formData, "classId") ?? "" });
    return { message: "You left the class. Its teachers no longer see your progress.", revalidateLayout: true };
  });
  if (result?.ok) redirect("/app/classes");
  return result;
}

export async function acceptInvitationAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  const next: { href: string | null } = { href: null };
  const result = await runStudentAction("classes.accept_invitation", async () => {
    const actor = await requireOnboardedStudentForAction();
    const { classId } = await acceptClassInvitation(actor, invitationRef(formData));
    next.href = `/app/classes/${classId}`;
    return { message: "You joined the class.", revalidateLayout: true };
  });
  if (result?.ok && next.href) redirect(next.href);
  return result;
}

export async function declineInvitationAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("classes.decline_invitation", async () => {
    const actor = await requireOnboardedStudentForAction();
    await declineClassInvitation(actor, invitationRef(formData));
    return { message: "Invitation declined.", revalidateLayout: true };
  });
}

export async function startAssignmentAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  const next: { href: string | null } = { href: null };
  const result = await runStudentAction("classes.start_assignment", async () => {
    const actor = await requireOnboardedStudentForAction();
    const { href } = await startAssignmentWork(actor, { assignmentId: formString(formData, "assignmentId") ?? "" });
    next.href = href;
    return { message: "Opening your work…" };
  });
  if (result?.ok && next.href) redirect(next.href);
  return result;
}
