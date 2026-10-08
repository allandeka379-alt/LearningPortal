import { AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, JsonPreview, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatMoneyMinor, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { hasPermission } from "@/server/auth/permissions";
import { getPaymentDetail, type PartyRef, type PaymentDetail, type PaymentEventView } from "@/server/cms/commerce/payments";
import { isAppError } from "@/server/lib/errors";
import { AuditTrail } from "../../plans/_shared/AuditTrail";
import { CommerceNav } from "../../plans/_shared/CommerceNav";
import { RefundPanel } from "../_components/RefundPanel";
import { markDisputedAction, refundPaymentAction } from "../actions";

export const metadata = { title: "Payment" };

function partyHref(party: PartyRef): string {
  return party.kind === "school" ? `/admin/schools/${party.id}` : `/admin/users/${party.id}`;
}

const REFUND_SUPPORT_TEXT: Readonly<Record<PaymentDetail["refund"]["support"], string>> = {
  api: "This provider can refund through its API: choose “Through the provider”.",
  manual_only: "This provider has no refund API. Refund the payer in the provider's dashboard (or by bank / mobile money), then record it here.",
  provider_unavailable: "This provider is not enabled on this server. Record a refund made elsewhere.",
};

/**
 * /admin/payments/[id] — one payment (§32): amounts, references, parties, the append-only PaymentEvent timeline,
 * refunds (step-up) and disputes, and the audit trail. The provider poll URL and raw contact details are never shown.
 */
export default async function AdminPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("payments.view", { next: `/admin/payments/${id}` });
  let payment: PaymentDetail;
  try {
    payment = await getPaymentDetail(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const canRefund = hasPermission(actor, "payments.refund", "all");
  const money = (minor: number | null) => formatMoneyMinor(minor, payment.currency);

  return (
    <Container size="wide">
      <PageHeader
        title={money(payment.amountMinor)}
        breadcrumbs={[{ label: "Payments", href: "/admin/payments" }, { label: payment.receiptNumber ?? "Payment" }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge kind="payment" status={payment.status} size="md" />
            {payment.details.disputed && <Badge tone="danger" appearance="outline">Disputed</Badge>}
            <span className="text-sm text-muted">
              {humanizeEnum(payment.purpose)} · {humanizeEnum(payment.provider)}
              {payment.method ? ` · ${humanizeEnum(payment.method)}` : ""}
            </span>
          </span>
        }
      />
      <CommerceNav current="/admin/payments" />
      {payment.details.needsReview && (
        <Alert tone="warning" className="mb-6" icon={<AlertTriangle aria-hidden="true" />} title="Flagged for review">
          This subscription payment was fully refunded. Check whether the subscription&rsquo;s access should end
          {payment.subscription ? (
            <>
              {" "}
              on the{" "}
              <Link href={`/admin/subscriptions/${payment.subscription.id}`} className="font-medium underline">
                subscription page
              </Link>
            </>
          ) : null}
          .
        </Alert>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <AdminSection title="Payment">
            <KeyValueList
              items={[
                { label: "Amount charged", value: money(payment.amountMinor) },
                { label: "List price", value: payment.listAmountMinor === null ? null : money(payment.listAmountMinor), hideWhenEmpty: true },
                { label: "Discount", value: payment.discountMinor > 0 ? money(payment.discountMinor) : null, hideWhenEmpty: true },
                { label: "Quantity", value: payment.quantity > 1 ? String(payment.quantity) : null, hideWhenEmpty: true },
                { label: "Refunded", value: payment.refundedAmountMinor > 0 ? money(payment.refundedAmountMinor) : null, hideWhenEmpty: true },
                { label: "Receipt number", value: payment.receiptNumber ? <span className="font-mono">{payment.receiptNumber}</span> : null },
                { label: "Provider reference", value: payment.providerReference ? <span className="font-mono text-xs break-all">{payment.providerReference}</span> : null },
                { label: "Provider status", value: payment.details.providerStatus, hideWhenEmpty: true },
                { label: "Paid with", value: [payment.details.cardBrand, payment.details.cardLast4 ? `•••• ${payment.details.cardLast4}` : null, payment.details.maskedMsisdn].filter(Boolean).join(" ") || null, hideWhenEmpty: true },
                { label: "Created", value: <Timestamp value={payment.createdAt} /> },
                { label: "Paid", value: payment.paidAt ? <Timestamp value={payment.paidAt} /> : null, hideWhenEmpty: true },
                { label: "Fulfilled", value: payment.fulfilledAt ? <Timestamp value={payment.fulfilledAt} /> : null, hideWhenEmpty: true },
                {
                  label: "Service period bought",
                  value: payment.servicePeriodStart ? (
                    <>
                      <Timestamp value={payment.servicePeriodStart} /> to <Timestamp value={payment.servicePeriodEnd} />
                    </>
                  ) : null,
                  hideWhenEmpty: true,
                },
                { label: "Failed", value: payment.failedAt ? <Timestamp value={payment.failedAt} /> : null, hideWhenEmpty: true },
                { label: "Cancelled", value: payment.cancelledAt ? <Timestamp value={payment.cancelledAt} /> : null, hideWhenEmpty: true },
                { label: "Failure", value: payment.failureCode ? `${humanizeEnum(payment.failureCode)}${payment.failureReason ? `: ${payment.failureReason}` : ""}` : null, hideWhenEmpty: true },
                { label: "Expires if unpaid", value: payment.status === "PENDING" && payment.expiresAt ? <Timestamp value={payment.expiresAt} /> : null, hideWhenEmpty: true },
                {
                  label: "Last refund",
                  value: payment.refundedAt ? (
                    <>
                      <Timestamp value={payment.refundedAt} /> by {payment.refundedBy?.name ?? "the provider"}
                      {payment.refundReason ? ` · ${payment.refundReason}` : ""}
                    </>
                  ) : null,
                  hideWhenEmpty: true,
                },
                { label: "Disputed", value: payment.details.disputedAt ? <Timestamp value={payment.details.disputedAt} /> : null, hideWhenEmpty: true },
              ]}
            />
          </AdminSection>

          <AdminSection title="Who and what">
            <KeyValueList
              items={[
                { label: "Payer", value: payment.payer ? <Link href={`/admin/users/${payment.payer.id}`} className="underline-offset-4 hover:underline">{payment.payer.name}</Link> : null },
                {
                  label: "Beneficiary",
                  value: payment.beneficiary ? (
                    <Link href={partyHref(payment.beneficiary)} className="underline-offset-4 hover:underline">
                      {payment.beneficiary.name}
                      {payment.beneficiary.kind === "school" ? " (school)" : ""}
                    </Link>
                  ) : null,
                },
                {
                  label: "Subscription",
                  value: payment.subscription ? (
                    <Link href={`/admin/subscriptions/${payment.subscription.id}`} className="underline-offset-4 hover:underline">
                      {payment.subscription.planCode} · {humanizeEnum(payment.subscription.status)}
                    </Link>
                  ) : null,
                  hideWhenEmpty: true,
                },
                { label: "Study pack", value: payment.studyPack?.title ?? null, hideWhenEmpty: true },
                {
                  label: "Price",
                  value: payment.price ? `${payment.price.planCode ?? "Study pack"}${payment.price.label ? ` · ${payment.price.label}` : ""}` : null,
                  hideWhenEmpty: true,
                },
                {
                  label: "Promo code",
                  value: payment.promoCode ? (
                    <Link href={`/admin/promo-codes/${payment.promoCode.id}`} className="font-mono underline-offset-4 hover:underline">
                      {payment.promoCode.code}
                    </Link>
                  ) : null,
                  hideWhenEmpty: true,
                },
                {
                  label: "Study pack access",
                  value: payment.grant ? (payment.grant.revokedAt ? "Revoked" : payment.grant.endsAt ? <>Until <Timestamp value={payment.grant.endsAt} /></> : "No expiry") : null,
                  hideWhenEmpty: true,
                },
              ]}
            />
          </AdminSection>

          <AdminSection title="Timeline" description="Every provider callback, poll, reconciliation and staff action, oldest first. Append-only.">
            <EventTimeline events={payment.events} currency={payment.currency} />
          </AdminSection>
        </div>

        <div className="min-w-0 space-y-6">
          <AdminSection title="Refund" description={payment.refund.allowed ? `Up to ${money(payment.refund.refundableMinor)} can still be refunded.` : undefined}>
            {!canRefund ? (
              <p className="text-sm text-muted">You can view payments but not refund them.</p>
            ) : !payment.refund.allowed ? (
              <p className="text-sm text-muted">
                {payment.status === "REFUNDED" ? "This payment is fully refunded." : "Only a successful payment can be refunded."}
              </p>
            ) : (
              <div className="space-y-4">
                <p className="flex items-start gap-2 text-sm text-muted">
                  <ShieldAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span>
                    {REFUND_SUPPORT_TEXT[payment.refund.support]}
                    {payment.purpose === "PLAN_PURCHASE" && " A full refund ends the full access this payment bought."}
                    {(payment.purpose === "SUBSCRIPTION" || payment.purpose === "SEATS") &&
                      " A full refund of a subscription payment is flagged for review; it does not end access by itself."}
                  </span>
                </p>
                <RefundPanel
                  paymentId={payment.id}
                  currency={payment.currency}
                  refundableMinor={payment.refund.refundableMinor}
                  support={payment.refund.support}
                  purpose={payment.purpose}
                  action={refundPaymentAction}
                />
              </div>
            )}
          </AdminSection>

          {canRefund && payment.canMarkDisputed && (
            <AdminSection title="Dispute" description="A chargeback or a payer complaint about money received. The payment status does not change.">
              <ConfirmAction
                action={markDisputedAction}
                fields={{ paymentId: payment.id }}
                triggerLabel="Mark as disputed"
                title="Mark this payment as disputed?"
                description="It is flagged on the payment and in the timeline. Refund it separately if the dispute is upheld."
                confirmLabel="Mark as disputed"
                tone="danger"
                reason={{ label: "Reason", required: true, hint: "Who raised it and how (no phone numbers).", maxLength: 500 }}
              />
            </AdminSection>
          )}

          <AdminSection title="History">
            <AuditTrail entries={payment.audit} entityType="Payment" entityId={payment.id} />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}

function EventTimeline({ events, currency }: { events: readonly PaymentEventView[]; currency: string }) {
  if (events.length === 0) return <p className="text-sm text-muted">No events recorded for this payment yet.</p>;
  return (
    <ol className="space-y-4">
      {events.map((event) => (
        <li key={event.id} className="border-l-2 border-border pl-3">
          <p className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-text">{event.eventType}</span>
            <Badge size="sm" tone="neutral" appearance="outline">
              {humanizeEnum(event.source)}
            </Badge>
            {event.mappedStatus && <StatusBadge kind="payment" status={event.mappedStatus} />}
            {!event.signatureValid && (
              <Badge size="sm" tone="danger" appearance="outline">
                Unverified: not applied
              </Badge>
            )}
          </p>
          <p className="text-sm text-muted">
            <Timestamp value={event.createdAt} />
            {event.providerStatus ? ` · provider says “${event.providerStatus}”` : ""}
            {event.amountMinor !== null ? ` · ${formatMoneyMinor(event.amountMinor, event.currency ?? currency)}` : ""}
            {event.recordedBy ? ` · by ${event.recordedBy.name}` : ""}
            {event.processedAt === null && event.signatureValid ? " · not processed yet" : ""}
          </p>
          {event.processingError && <p className="mt-1 text-sm text-warning-text">{event.processingError}</p>}
          <details className="mt-1">
            <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm text-primary lg:min-h-0">Payload (redacted)</summary>
            <JsonPreview value={event.payload} label="Payload" className="mt-2" />
          </details>
        </li>
      ))}
    </ol>
  );
}
