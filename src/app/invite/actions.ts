"use server";

import { formText, runAdminAction } from "@/components/admin/server-action";
import type { AdminActionState } from "@/components/admin/form-state";
import { requireUserForAction } from "@/server/auth/guards";
import { AppError } from "@/server/lib/errors";
import { getRequestContext } from "@/server/lib/request";
import { acceptInvitation, acceptMyInvitation, declineInvitation } from "@/server/schools/invitations";

async function meta() {
  const context = await getRequestContext();
  return { requestId: context.requestId, ip: context.ip, userAgent: context.userAgent };
}

/** Accept the invitation behind a link (`token`) or one addressed to the signed-in user (`invitationId`). */
export async function acceptInvitationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("invitations.accept", formData, async () => {
    const actor = await requireUserForAction();
    const token = formText(formData, "token");
    const invitationId = formText(formData, "invitationId");
    if (!token && !invitationId) throw AppError.notFound("This invitation link is not valid.");
    const result = token ? await acceptInvitation(actor, token, await meta()) : await acceptMyInvitation(actor, invitationId ?? "", await meta());
    return { data: { kind: result.kind }, message: "Invitation accepted.", redirectTo: result.redirectTo };
  });
}

/** Decline an invitation (it closes; the school can invite again). */
export async function declineInvitationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("invitations.decline", formData, async () => {
    const actor = await requireUserForAction();
    const token = formText(formData, "token");
    const invitationId = formText(formData, "invitationId");
    await declineInvitation(actor, token ? { token } : { invitationId: invitationId ?? "" });
    return { data: null, message: "Invitation declined.", revalidate: ["/invite"] };
  });
}
