import { Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatDate, formatMoneyMinor, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { formatNumber } from "@/lib/format";
import { instantToLocalDateTime } from "@/server/cms/announcements/schemas";
import { minorToMajorString } from "@/server/cms/commerce/money";
import { listPlanOptions } from "@/server/cms/commerce/plans";
import { getPromoCode, type PromoCodeDetail } from "@/server/cms/commerce/promo-codes";
import { PRICE_CURRENCIES } from "@/server/cms/commerce/schemas";
import { isAppError } from "@/server/lib/errors";
import { AuditTrail } from "../../plans/_shared/AuditTrail";
import { CommerceNav } from "../../plans/_shared/CommerceNav";
import { discountLabel } from "../../plans/_shared/labels";
import { PromoCodeForm } from "../_components/PromoCodeForm";
import { PROMO_STATE_META } from "../_components/promo-state";
import { deletePromoCodeAction, updatePromoCodeAction } from "../actions";

export const metadata = { title: "Promo code" };

/**
 * /admin/promo-codes/[id] — one code: usage (redemptions by status, payments, recent redemptions by user id), edit
 * form (the discount is frozen once used) and delete (unused codes only), with the audit trail.
 */
export default async function AdminPromoCodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("billing.manage", { next: `/admin/promo-codes/${id}` });
  let code: PromoCodeDetail;
  try {
    code = await getPromoCode(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const plans = await listPlanOptions(actor);
  const meta = PROMO_STATE_META[code.state];
  const local = (value: Date | null) => (value ? instantToLocalDateTime(value, DEFAULT_TIMEZONE) : "");

  return (
    <Container size="wide">
      <PageHeader
        title={<span className="font-mono">{code.code}</span>}
        breadcrumbs={[{ label: "Promo codes", href: "/admin/promo-codes" }, { label: code.code }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <Badge tone={meta.tone} appearance={meta.outline ? "outline" : "soft"}>
              {meta.label}
            </Badge>
            {code.usedUp && <Badge tone="warning">Used up</Badge>}
            {code.isDemo && <DemoBadge size="md" />}
            <span className="text-sm text-muted">{discountLabel(code)}</span>
          </span>
        }
      />
      <CommerceNav current="/admin/promo-codes" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <AdminSection title="Edit">
            <PromoCodeForm
              action={updatePromoCodeAction}
              submitLabel="Save promo code"
              hiddenFields={{ promoCodeId: code.id, expectedUpdatedAt: code.updatedAt.toISOString() }}
              plans={plans.map((plan) => ({ id: plan.id, label: `${plan.name} (${plan.code})${plan.isActive ? "" : " · retired"}`, audience: plan.audience }))}
              currencies={PRICE_CURRENCIES}
              locked={
                code.used ? (
                  <p className="flex items-start gap-2 rounded-control bg-subtle p-3 text-sm text-text">
                    <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <span>
                      <span className="font-semibold">{discountLabel(code)}</span>. This code has been used, so the code and its discount are frozen;
                      create a new code for a different discount. Its rules below can still change.
                    </span>
                  </p>
                ) : undefined
              }
              initial={{
                code: code.code,
                discountType: code.discountType,
                percentOff: code.percentOff,
                amountOff: minorToMajorString(code.amountOffMinor),
                currency: code.currency,
                freeDays: code.freeDays,
                grantPlanId: code.grantPlanId,
                description: code.description,
                audience: code.audience,
                appliesToStudyPacks: code.appliesToStudyPacks,
                newCustomersOnly: code.newCustomersOnly,
                maxRedemptions: code.maxRedemptions,
                validFrom: local(code.validFrom),
                validTo: local(code.validTo),
                isActive: code.isActive,
                planIds: code.plans.map((plan) => plan.id),
              }}
            />
          </AdminSection>

          <AdminSection title="Recent redemptions" description="By user id; open the user for details." flush>
            <DataTable
              caption="Recent redemptions"
              rows={code.recentRedemptions}
              rowKey={(row) => row.id}
              className="rounded-none border-x-0 border-b-0"
              empty={<p className="px-4 pb-4 text-sm text-muted">Nobody has used this code yet.</p>}
              columns={[
                {
                  key: "user",
                  header: "User",
                  primary: true,
                  cell: (row) => (
                    <Link href={`/admin/users/${row.userId}`} className="font-mono text-xs underline-offset-4 hover:underline">
                      {row.userId}
                    </Link>
                  ),
                },
                { key: "status", header: "Status", cell: (row) => humanizeEnum(row.status) },
                { key: "discount", header: "Discount", align: "end", cell: (row) => (row.discountMinor === null ? "—" : formatMoneyMinor(row.discountMinor, row.currency)) },
                {
                  key: "payment",
                  header: "Payment",
                  hideOnMobile: true,
                  cell: (row) =>
                    row.paymentId ? (
                      <Link href={`/admin/payments/${row.paymentId}`} className="underline-offset-4 hover:underline">
                        Open
                      </Link>
                    ) : row.grantId ? (
                      "Free days granted"
                    ) : (
                      "—"
                    ),
                },
                { key: "date", header: "Date", cell: (row) => formatDate(row.appliedAt ?? row.createdAt) },
              ]}
            />
          </AdminSection>
        </div>

        <div className="min-w-0 space-y-6">
          <AdminSection title="Usage">
            <KeyValueList
              columns={1}
              items={[
                { label: "Redeemed (counted)", value: `${formatNumber(code.redeemedCount)}${code.maxRedemptions === null ? " (no cap)" : ` of ${formatNumber(code.maxRedemptions)}`}` },
                { label: "Reserved at checkout", value: formatNumber(code.redemptionCounts.RESERVED) },
                { label: "Released (checkout failed)", value: formatNumber(code.redemptionCounts.RELEASED) },
                { label: "Payments using it", value: formatNumber(code.paymentCount) },
                { label: "Valid", value: <><Timestamp value={code.validFrom} /> to {code.validTo ? <Timestamp value={code.validTo} /> : "no end date"}</> },
                { label: "Created by", value: code.createdBy, hideWhenEmpty: true },
                { label: "Created", value: <Timestamp value={code.createdAt} /> },
              ]}
            />
          </AdminSection>
          <AdminSection title="Delete">
            {code.used ? (
              <p className="text-sm text-muted">Used codes are kept for the payment history. Untick &ldquo;Active&rdquo; to stop new use.</p>
            ) : (
              <ConfirmAction
                action={deletePromoCodeAction}
                fields={{ promoCodeId: code.id }}
                triggerLabel="Delete promo code"
                triggerVariant="danger"
                title={`Delete ${code.code}?`}
                description="It has never been used, so nothing refers to it. This cannot be undone."
                confirmLabel="Delete"
                tone="danger"
                reason={{ label: "Reason", hint: "Recorded in the audit log.", maxLength: 500 }}
              />
            )}
          </AdminSection>
          <AdminSection title="History">
            <AuditTrail entries={code.audit} entityType="PromoCode" entityId={code.id} />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
