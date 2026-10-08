import { ActionForm } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { ActionResultCopyField } from "@/components/admin/CopyValueField";
import { formatDate } from "@/components/admin/format";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import type { SchoolInvitationItem } from "@/server/schools/invitations";
import { INVITATION_STATE_META, SCHOOL_ROLE_LABELS } from "./labels";

export interface InvitationListProps {
  invitations: readonly SchoolInvitationItem[];
  resendAction: AdminFormAction<unknown>;
  revokeAction: AdminFormAction<unknown>;
  timeZone: string;
  emptyMessage: string;
}

/**
 * The school's recent invitations (contacts masked) with "Send again" / "Withdraw". Server component. "Send again"
 * makes a fresh link (the old one stops working): it is emailed to an email address (a phone number is texted only while
 * SMS is switched on) and always shown here to share.
 */
export function InvitationList({ invitations, resendAction, revokeAction, timeZone, emptyMessage }: InvitationListProps) {
  return (
    <DataTable
      caption="Invitations"
      rows={invitations}
      rowKey={(row) => row.id}
      empty={<p className="px-4 pb-4 text-sm text-muted sm:px-5">{emptyMessage}</p>}
      columns={[
        { key: "to", header: "Sent to", primary: true, cell: (row) => <span className="font-mono text-sm">{row.targetMasked}</span> },
        { key: "role", header: "As", cell: (row) => (row.role ? (SCHOOL_ROLE_LABELS[row.role] ?? row.role) : "—") },
        {
          key: "state",
          header: "Status",
          cell: (row) => <Badge tone={INVITATION_STATE_META[row.state]?.tone ?? "neutral"}>{INVITATION_STATE_META[row.state]?.label ?? row.state}</Badge>,
        },
        { key: "expires", header: "Link valid until", hideOnMobile: true, cell: (row) => formatDate(row.expiresAt, timeZone) },
        {
          key: "actions",
          header: "Actions",
          align: "end",
          cell: (row) =>
            row.manageable ? (
              <div className="flex flex-col items-stretch gap-2 sm:items-end">
                <ActionForm
                  action={resendAction}
                  hiddenFields={{ invitationId: row.id }}
                  submitLabel="Send again"
                  pendingLabel="Sending…"
                  submitVariant="outline"
                  className="w-full max-w-md text-left"
                >
                  <ActionResultCopyField field="inviteLink" label="New invitation link" hint="The previous link no longer works." />
                </ActionForm>
                {row.state === "PENDING" && (
                  <ConfirmAction
                    action={revokeAction}
                    fields={{ invitationId: row.id }}
                    triggerLabel="Withdraw"
                    triggerSize="sm"
                    triggerVariant="ghost"
                    tone="danger"
                    title="Withdraw this invitation?"
                    description="The link stops working. You can invite the person again later."
                    confirmLabel="Withdraw"
                  />
                )}
              </div>
            ) : null,
        },
      ]}
    />
  );
}
