import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatDate, formatMoneyMinor, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { formatNumber } from "@/lib/format";
import { MAX_EXTENSION_DAYS } from "@/server/cms/commerce/schemas";
import { getSubscriptionDetail, type SubscriptionDetail, type SubscriptionHolder } from "@/server/cms/commerce/subscriptions";
import { isAppError } from "@/server/lib/errors";
import { AuditTrail } from "../../plans/_shared/AuditTrail";
import { CommerceNav } from "../../plans/_shared/CommerceNav";
import { priceLabel } from "../../plans/_shared/labels";
import { cancelSubscriptionAction, extendSubscriptionAction, resumeSubscriptionAction, revokeGrantAction } from "../actions";

export const metadata = { title: "Subscription" };

const GRANT_STATE = {
  active: { label: "Active", tone: "success", outline: false },
  upcoming: { label: "Upcoming", tone: "info", outline: false },
  ended: { label: "Ended", tone: "neutral", outline: true },
  revoked: { label: "Revoked", tone: "neutral", outline: true },
} as const;

function holderHref(holder: SubscriptionHolder): string {
  return holder.kind === "school" ? `/admin/schools/${holder.id}` : `/admin/users/${holder.id}`;
}

/**
 * /admin/subscriptions/[id] — one subscription: period and access, price, parties, payments, staff grants, audit trail,
 * and the staff actions (cancel at period end / now, resume, extend with an attributed grant, revoke a grant).
 */
export default async function AdminSubscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("billing.manage", { next: `/admin/subscriptions/${id}` });
  let sub: SubscriptionDetail;
  try {
    sub = await getSubscriptionDetail(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }

  return (
    <Container size="wide">
      <PageHeader
        title={`${sub.plan.name} · ${sub.holder.name}`}
        breadcrumbs={[{ label: "Subscriptions", href: "/admin/subscriptions" }, { label: sub.holder.name }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge kind="subscription" status={sub.status} size="md" />
            {sub.cancelAtPeriodEnd && sub.actions.cancelNow && <Badge size="sm" tone="warning">Stops at period end</Badge>}
            <Badge size="sm" tone={sub.access.live ? "success" : "neutral"} appearance={sub.access.live ? "soft" : "outline"}>
              {sub.access.live ? `Access until ${formatDate(sub.access.endsAt)}` : "No access from this subscription"}
            </Badge>
          </span>
        }
      />
      <CommerceNav current="/admin/subscriptions" />
      {sub.cancelledAt && (
        <Alert tone="neutral" className="mb-6" title={sub.status === "CANCELLED" ? "Cancelled" : "Cancellation recorded"}>
          On {formatDate(sub.cancelledAt)}. {sub.cancelReason ? `Reason: ${sub.cancelReason}` : "No reason recorded."}
        </Alert>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <AdminSection title="Subscription">
            <KeyValueList
              items={[
                {
                  label: "Holder",
                  value: (
                    <Link href={holderHref(sub.holder)} className="font-medium underline-offset-4 hover:underline">
                      {sub.holder.name}
                    </Link>
                  ),
                },
                { label: "Paid by", value: sub.payer ? <Link href={`/admin/users/${sub.payer.id}`} className="underline-offset-4 hover:underline">{sub.payer.name}</Link> : null, hideWhenEmpty: true },
                {
                  label: "Plan",
                  value: (
                    <Link href={`/admin/plans/${sub.plan.id}`} className="underline-offset-4 hover:underline">
                      {sub.plan.name} ({sub.plan.code})
                    </Link>
                  ),
                },
                { label: "Price", value: sub.price ? `${priceLabel(sub.price)}${sub.price.label ? ` · ${sub.price.label}` : ""}` : null },
                { label: "Source", value: humanizeEnum(sub.source) },
                { label: "Started", value: <Timestamp value={sub.startedAt} /> },
                {
                  label: "Current period",
                  value: sub.currentPeriodStart ? (
                    <>
                      <Timestamp value={sub.currentPeriodStart} /> to <Timestamp value={sub.currentPeriodEnd} />
                    </>
                  ) : null,
                },
                { label: "Trial ends", value: sub.trialEndsAt ? <Timestamp value={sub.trialEndsAt} /> : null, hideWhenEmpty: true },
                { label: "Grace after period end", value: `${sub.access.graceDays} days` },
                { label: "Ended", value: sub.endedAt ? <Timestamp value={sub.endedAt} /> : null, hideWhenEmpty: true },
                { label: "Seats", value: sub.seats === null ? null : `${formatNumber(sub.seatsInUse ?? 0)} of ${formatNumber(sub.seats)} in use`, hideWhenEmpty: true },
                { label: "Renewal", value: sub.autoRenew ? `Automatic (${sub.provider ?? "provider"})` : "Prepaid periods (renewed by payment)" },
                { label: "Provider reference", value: sub.providerSubscriptionRef ? <span className="font-mono text-xs">{sub.providerSubscriptionRef}</span> : null, hideWhenEmpty: true },
                { label: "Created by", value: sub.createdBy?.name ?? null, hideWhenEmpty: true },
                { label: "Notes", value: sub.notes, hideWhenEmpty: true },
                { label: "Created", value: <Timestamp value={sub.createdAt} /> },
              ]}
            />
          </AdminSection>

          <AdminSection title="Payments" description="Most recent first." flush>
            <DataTable
              caption="Payments for this subscription"
              rows={sub.payments}
              rowKey={(row) => row.id}
              className="rounded-none border-x-0 border-b-0"
              empty={<p className="px-4 pb-4 text-sm text-muted">No payments for this subscription.</p>}
              columns={[
                {
                  key: "amount",
                  header: "Amount",
                  primary: true,
                  cell: (row) => (
                    <Link href={`/admin/payments/${row.id}`} className="font-semibold tabular-nums underline-offset-4 hover:underline">
                      {formatMoneyMinor(row.amountMinor, row.currency)}
                    </Link>
                  ),
                },
                { key: "status", header: "Status", cell: (row) => <StatusBadge kind="payment" status={row.status} /> },
                { key: "receipt", header: "Receipt", hideOnMobile: true, cell: (row) => (row.receiptNumber ? <span className="font-mono text-xs">{row.receiptNumber}</span> : "—") },
                {
                  key: "period",
                  header: "Period bought",
                  hideOnMobile: true,
                  cell: (row) => (row.servicePeriodStart ? `${formatDate(row.servicePeriodStart)} to ${formatDate(row.servicePeriodEnd)}` : "—"),
                },
                {
                  key: "refunded",
                  header: "Refunded",
                  align: "end",
                  hideOnMobile: true,
                  cell: (row) => (row.refundedAmountMinor > 0 ? formatMoneyMinor(row.refundedAmountMinor, row.currency) : "—"),
                },
                { key: "date", header: "Date", cell: (row) => formatDate(row.paidAt ?? row.createdAt) },
              ]}
            />
          </AdminSection>

          {sub.holder.kind === "user" && (
            <AdminSection title="Grants for this holder" description="Time-boxed access outside the subscription: staff extensions, compensation, promo free days, referral rewards." flush>
              <DataTable
                caption="Entitlement grants"
                rows={sub.grants}
                rowKey={(row) => row.id}
                className="rounded-none border-x-0 border-b-0"
                empty={<p className="px-4 pb-4 text-sm text-muted">No grants.</p>}
                columns={[
                  {
                    key: "source",
                    header: "Grant",
                    primary: true,
                    cell: (row) => (
                      <span className="block">
                        <span className="font-semibold">{humanizeEnum(row.source)}</span>
                        {row.planCode && <span className="text-muted"> · {row.planCode}</span>}
                        {row.reason && <span className="block text-xs text-muted">{row.reason}</span>}
                      </span>
                    ),
                  },
                  {
                    key: "window",
                    header: "Window",
                    cell: (row) => (
                      <span className="text-sm">
                        {formatDate(row.startsAt)} to {row.endsAt ? formatDate(row.endsAt) : "no end"}
                      </span>
                    ),
                  },
                  {
                    key: "state",
                    header: "State",
                    cell: (row) => {
                      const meta = GRANT_STATE[row.state];
                      return (
                        <Badge size="sm" tone={meta.tone} appearance={meta.outline ? "outline" : "soft"}>
                          {meta.label}
                        </Badge>
                      );
                    },
                  },
                  { key: "by", header: "Granted by", hideOnMobile: true, cell: (row) => row.grantedBy?.name ?? "—" },
                  {
                    key: "actions",
                    header: "Actions",
                    align: "end",
                    cell: (row) =>
                      row.revocable ? (
                        <ConfirmAction
                          action={revokeGrantAction}
                          fields={{ grantId: row.id, subscriptionId: sub.id }}
                          triggerLabel="Revoke"
                          title="Revoke this grant?"
                          description="Access from this grant ends now. The grant stays on record."
                          confirmLabel="Revoke grant"
                          tone="danger"
                          reason={{ label: "Reason", required: true, hint: "Recorded in the audit log.", maxLength: 500 }}
                        />
                      ) : (
                        <span className="text-sm text-muted">—</span>
                      ),
                  },
                ]}
              />
            </AdminSection>
          )}
        </div>

        <div className="min-w-0 space-y-6">
          <AdminSection title="Actions">
            <div className="flex flex-col items-start gap-3">
              {sub.actions.resume && (
                <ConfirmAction
                  action={resumeSubscriptionAction}
                  fields={{ subscriptionId: sub.id }}
                  triggerLabel="Undo cancellation"
                  title="Keep this subscription renewing?"
                  description="The pending cancel-at-period-end is removed."
                  confirmLabel="Undo cancellation"
                />
              )}
              {sub.actions.cancelAtPeriodEnd && (
                <ConfirmAction
                  action={cancelSubscriptionAction}
                  fields={{ subscriptionId: sub.id, mode: "period_end" }}
                  triggerLabel="Cancel at period end"
                  title="Stop renewal at the end of the paid period?"
                  description={
                    sub.status === "PAST_DUE"
                      ? "This subscription is past due: its paid period is over, so access ends now."
                      : `Access continues until ${formatDate(sub.currentPeriodEnd)}, then the subscription ends.`
                  }
                  confirmLabel="Cancel at period end"
                  reason={{ label: "Reason", required: true, hint: "Recorded in the audit log and on the subscription.", maxLength: 500 }}
                />
              )}
              {sub.actions.cancelNow && (
                <ConfirmAction
                  action={cancelSubscriptionAction}
                  fields={{ subscriptionId: sub.id, mode: "now" }}
                  triggerLabel="Cancel now"
                  triggerVariant="danger"
                  title="End this subscription now?"
                  description="Access from this subscription ends immediately. This cannot be undone; refunds are made from the payment."
                  confirmLabel="End subscription now"
                  tone="danger"
                  reason={{ label: "Reason", required: true, hint: "Recorded in the audit log and on the subscription.", maxLength: 500 }}
                />
              )}
              {!sub.actions.cancelNow && <p className="text-sm text-muted">This subscription has ended; nothing to change.</p>}
            </div>
          </AdminSection>

          <AdminSection title="Extend access" description="Gives the holder this plan for extra days as an attributed grant, starting when the paid period (or the last extension) ends.">
            {sub.actions.extend ? (
              <ActionForm action={extendSubscriptionAction} hiddenFields={{ subscriptionId: sub.id }} submitLabel="Grant extension" pendingLabel="Granting…" successAs="toast">
                <AdminField name="days" label="Days" type="number" min={1} max={MAX_EXTENSION_DAYS} required />
                <AdminField
                  name="source"
                  label="Type"
                  type="select"
                  options={[
                    { value: "ADMIN", label: "Staff grant" },
                    { value: "COMPENSATION", label: "Compensation (outage, billing error)" },
                  ]}
                  defaultValue="ADMIN"
                />
                <AdminField name="reason" label="Reason" type="textarea" rows={3} maxLength={500} required hint="For example the support ticket. Recorded with your name." />
              </ActionForm>
            ) : (
              <p className="flex items-start gap-2 text-sm text-muted">
                <CalendarPlus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                School subscriptions are extended through the school&rsquo;s contract (period and seats), not with a grant.
              </p>
            )}
          </AdminSection>

          <AdminSection title="History">
            <AuditTrail entries={sub.audit} entityType="Subscription" entityId={sub.id} />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
