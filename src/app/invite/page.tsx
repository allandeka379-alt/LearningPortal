import type { Metadata } from "next";
import { ActionForm } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { formatDate } from "@/components/admin/format";
import { AuthCard } from "@/components/auth/AuthCard";
import { SCHOOL_ROLE_LABELS } from "@/components/school/labels";
import { ButtonLink } from "@/components/ui/Button";
import { requireUser } from "@/server/auth/guards";
import { homePathFor } from "@/server/auth/redirects";
import { listMyPendingInvitations } from "@/server/schools/invitations";
import { acceptInvitationAction, declineInvitationAction } from "./actions";

export const metadata: Metadata = { title: "Your invitations" };

/**
 * /invite — school invitations addressed to the signed-in user's VERIFIED email or phone (linked from the in-app
 * notification), so they can accept without the message link.
 */
export default async function MyInvitationsPage() {
  const actor = await requireUser({ next: "/invite" });
  const invitations = await listMyPendingInvitations(actor);
  return (
    <AuthCard
      title="Your invitations"
      description={invitations.length ? "Schools that have invited you. Accept to join." : "You have no open invitations right now."}
      footer={
        <p>
          Invitations are matched to your verified email address. A link from an email (or from your school) works too.
        </p>
      }
    >
      {invitations.length === 0 ? (
        <ButtonLink href={homePathFor(actor)} fullWidth>
          Continue
        </ButtonLink>
      ) : (
        <ul className="space-y-4">
          {invitations.map((invitation) => (
            <li key={invitation.id} className="space-y-3 rounded-card border border-border p-4">
              <div>
                <p className="font-semibold text-text">{invitation.schoolName}</p>
                <p className="text-sm text-muted">
                  As a {(SCHOOL_ROLE_LABELS[invitation.role] ?? invitation.role).toLowerCase()} · valid until {formatDate(invitation.expiresAt)}
                </p>
              </div>
              <ActionForm action={acceptInvitationAction} hiddenFields={{ invitationId: invitation.id }} submitLabel="Accept" pendingLabel="Accepting…">
                {null}
              </ActionForm>
              <ConfirmAction
                action={declineInvitationAction}
                fields={{ invitationId: invitation.id }}
                triggerLabel="Decline"
                triggerVariant="ghost"
                triggerSize="sm"
                title={`Decline the invitation from ${invitation.schoolName}?`}
                confirmLabel="Decline"
                tone="danger"
              />
            </li>
          ))}
        </ul>
      )}
    </AuthCard>
  );
}
