import { AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, Timestamp } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { formatNumber } from "@/lib/format";
import { describeEntitlementFields } from "@/server/cms/commerce/entitlement-fields";
import { getPlanForAdmin, type AdminPriceRow, type PriceState } from "@/server/cms/commerce/plans";
import { PRICE_CURRENCIES } from "@/server/cms/commerce/schemas";
import { isAppError } from "@/server/lib/errors";
import { EntitlementsEditor } from "../_components/EntitlementsEditor";
import type { EntitlementValue } from "../_lib/entitlements-diff";
import { AuditTrail } from "../_shared/AuditTrail";
import { CommerceNav } from "../_shared/CommerceNav";
import { INTERVAL_OPTIONS, periodLabel, priceLabel } from "../_shared/labels";
import { createPlanPriceAction, setPlanPriceActiveAction, updatePlanDetailsAction, updatePlanEntitlementsAction } from "../actions";

export const metadata = { title: "Plan" };

const PRICE_STATE: Readonly<Record<PriceState, { label: string; tone: BadgeTone; outline?: boolean }>> = {
  current: { label: "On sale", tone: "success" },
  scheduled: { label: "Scheduled", tone: "info" },
  ended: { label: "Ended", tone: "neutral", outline: true },
  inactive: { label: "Off sale", tone: "neutral", outline: true },
};

/**
 * /admin/plans/[id] — one plan (§31): structured entitlements editor with a diff preview, the full price history
 * (prices are rows: add a new one, take old ones off sale), buyer-facing details and the audit trail.
 */
export default async function AdminPlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("billing.manage", { next: `/admin/plans/${id}` });
  let detail;
  try {
    detail = await getPlanForAdmin(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const { plan } = detail;
  const token = plan.updatedAt.toISOString();
  const replaceable = detail.prices.filter((price) => price.state === "current" || price.state === "scheduled");

  return (
    <Container size="wide">
      <PageHeader
        title={
          <span className="inline-flex flex-wrap items-center gap-2">
            {plan.name}
            {plan.isDemo && <DemoBadge size="md" />}
          </span>
        }
        breadcrumbs={[{ label: "Plans & prices", href: "/admin/plans" }, { label: plan.name }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm">{plan.code}</span>
            <Badge size="sm" tone="neutral" appearance="outline">
              {plan.audience === "SCHOOL" ? "For schools" : "For individuals"}
            </Badge>
            <Badge size="sm" tone={plan.isActive ? "success" : "neutral"} appearance={plan.isActive ? "soft" : "outline"}>
              {plan.isActive ? "On sale" : "Retired"}
            </Badge>
            <Badge size="sm" tone="neutral" appearance="outline">
              {plan.isPublic ? "Public" : "Hidden from /pricing"}
            </Badge>
            {plan.isDefault && <Badge size="sm" tone="info">Default plan</Badge>}
            <span className="text-sm text-muted">
              {formatNumber(detail.liveSubscriptions)} live subscriptions · {formatNumber(detail.livePurchases)} with bought access
            </span>
          </span>
        }
      />
      <CommerceNav current="/admin/plans" />
      {detail.entitlementIssues.length > 0 && (
        <Alert tone="warning" className="mb-6" icon={<AlertTriangle aria-hidden="true" />} title="The stored entitlements have problems">
          Invalid values are treated as &ldquo;off / none&rdquo; until fixed: {detail.entitlementIssues.slice(0, 5).join("; ")}. Saving the editor below
          rewrites a clean document.
        </Alert>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="min-w-0 space-y-6">
          <AdminSection
            title="Entitlements"
            description="What subscribers of this plan can use. Limits: a whole number per period, 0 for none, or unlimited. Users with several sources (school seats, grants) get the most generous value."
          >
            <EntitlementsEditor
              key={token}
              planId={plan.id}
              expectedUpdatedAt={token}
              fields={describeEntitlementFields()}
              initial={detail.entitlements as unknown as Record<string, EntitlementValue>}
              action={updatePlanEntitlementsAction}
              liveSubscriptions={detail.liveSubscriptions}
              livePurchases={detail.livePurchases}
            />
          </AdminSection>

          <AdminSection title="Prices" description="Every price this plan has had. Payments and subscriptions point at the exact price they used." flush>
            <PriceTable planId={plan.id} prices={detail.prices} />
          </AdminSection>

          <AdminSection
            title="Add a price"
            description="A new row in one currency and period. To change a price, add the new one and choose the old one under “Replaces”: it stops when the new one starts."
          >
            <ActionForm action={createPlanPriceAction} hiddenFields={{ planId: plan.id }} submitLabel="Add price" pendingLabel="Adding…" columns="two" successAs="toast">
              <AdminField name="currency" label="Currency" type="select" options={PRICE_CURRENCIES.map((value) => ({ value, label: value }))} defaultValue="USD" required />
              <AdminField name="amount" label="Amount" hint="In major units, e.g. 5.00. Per seat for seat prices." required placeholder="0.00" maxLength={14} />
              <AdminField name="interval" label="Billing period" type="select" options={INTERVAL_OPTIONS} defaultValue="MONTH" required />
              <AdminField name="intervalCount" label="Periods per payment" type="number" min={1} max={24} defaultValue={1} hint="3 with Month = quarterly." />
              <AdminField name="periodDays" label="Period length in days" type="number" min={1} max={3660} optional hint="Required for school terms. One-off prices: leave blank for lifetime access, or set the days of access." />
              <AdminField name="label" label="Label" optional maxLength={100} hint="Shown to staff and on receipts, e.g. “Term 1 2027”." />
              {plan.audience === "SCHOOL" && (
                <>
                  <AdminField name="perSeat" label="Price per seat" type="checkbox" description="The amount is charged for each seat." />
                  <AdminField name="minSeats" label="Minimum seats" type="number" min={1} optional />
                </>
              )}
              <AdminField
                name="countryId"
                label="Country"
                type="select"
                options={detail.countries.map((country) => ({ value: country.id, label: country.name }))}
                placeholder="Every country"
                optional
              />
              <AdminField
                name="replacesPriceId"
                label="Replaces"
                type="select"
                options={replaceable.map((price) => ({ value: price.id, label: `${priceLabel(price)}${price.label ? ` · ${price.label}` : ""}` }))}
                placeholder="Nothing (an additional price)"
                optional
              />
              <AdminField name="validFrom" label="On sale from" type="datetime-local" optional hint="Platform time (Africa/Harare). Empty = now." />
              <AdminField name="validTo" label="On sale until" type="datetime-local" optional hint="Empty = until replaced or taken off sale." />
              <AdminField name="sortOrder" label="Display order" type="number" min={-1000} max={1000} defaultValue={0} optional />
            </ActionForm>
          </AdminSection>
        </div>

        <div className="min-w-0 space-y-6">
          <AdminSection title="Details" description="Shown on the pricing page. Hidden plans can still be given by staff.">
            <ActionForm action={updatePlanDetailsAction} hiddenFields={{ planId: plan.id, expectedUpdatedAt: token }} submitLabel="Save details" successAs="toast">
              <AdminField name="name" label="Name" defaultValue={plan.name} required maxLength={100} />
              <AdminField name="tagline" label="Tagline" defaultValue={plan.tagline} optional maxLength={200} />
              <AdminField name="description" label="Description" type="textarea" rows={4} defaultValue={plan.description} optional maxLength={5000} hint="Markdown." />
              <AdminField name="highlights" label="Highlights" type="textarea" rows={4} defaultValue={plan.highlights.join("\n")} optional hint="One per line, up to 8." />
              <AdminField name="isPublic" label="Listed on the pricing page" type="checkbox" defaultChecked={plan.isPublic} />
              <AdminField
                name="isActive"
                label="On sale"
                type="checkbox"
                defaultChecked={plan.isActive}
                description={plan.isDefault ? "The default plan must stay active." : "Retired plans cannot be bought; existing subscriptions run to their end."}
              />
              <AdminField name="sortOrder" label="Display order" type="number" min={-1000} max={1000} defaultValue={plan.sortOrder} required />
              <AdminField name="trialDays" label="Free trial (days)" type="number" min={0} max={365} defaultValue={plan.trialDays} required />
            </ActionForm>
          </AdminSection>
          <AdminSection title="History">
            <AuditTrail entries={detail.audit} entityType="Plan" entityId={plan.id} />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}

function PriceTable({ planId, prices }: { planId: string; prices: readonly AdminPriceRow[] }) {
  return (
    <DataTable
      caption="Price history"
      rows={prices}
      rowKey={(row) => row.id}
      className="rounded-none border-x-0 border-b-0"
      empty={<p className="px-4 pb-4 text-sm text-muted">No prices yet: this plan cannot be bought until a price is added.</p>}
      columns={[
        {
          key: "price",
          header: "Price",
          primary: true,
          cell: (row) => (
            <span className="block">
              <span className="font-semibold tabular-nums">{priceLabel(row)}</span>
              {row.label && <span className="block text-xs text-muted">{row.label}</span>}
              {row.isDemo && <DemoBadge />}
            </span>
          ),
        },
        {
          key: "state",
          header: "Status",
          cell: (row) => {
            const meta = PRICE_STATE[row.state];
            return (
              <Badge size="sm" tone={meta.tone} appearance={meta.outline ? "outline" : "soft"}>
                {meta.label}
              </Badge>
            );
          },
        },
        {
          key: "window",
          header: "On sale",
          hideOnMobile: true,
          cell: (row) => (
            <span className="text-sm">
              <Timestamp value={row.validFrom} />
              <span className="block text-muted">{row.validTo ? <>until <Timestamp value={row.validTo} /></> : "no end date"}</span>
            </span>
          ),
        },
        { key: "country", header: "Country", hideOnMobile: true, cell: (row) => row.countryName ?? "All" },
        {
          key: "usage",
          header: "Used by",
          align: "end",
          cell: (row) => (
            <span className="text-sm tabular-nums">
              {formatNumber(row.paymentCount)} payments
              <span className="block text-muted">{formatNumber(row.subscriptionCount)} subscriptions</span>
            </span>
          ),
        },
        {
          key: "actions",
          header: "Actions",
          align: "end",
          cell: (row) =>
            row.isActive ? (
              <ConfirmAction
                action={setPlanPriceActiveAction}
                fields={{ planId, priceId: row.id, active: "false" }}
                triggerLabel="Take off sale"
                title="Take this price off sale?"
                description={`${priceLabel(row)}. New buyers can no longer choose it; existing subscriptions and receipts keep it.`}
                confirmLabel="Take off sale"
                tone="danger"
                reason={{ label: "Reason", hint: "Recorded in the audit log.", maxLength: 500 }}
              />
            ) : row.canReactivate ? (
              <ConfirmAction
                action={setPlanPriceActiveAction}
                fields={{ planId, priceId: row.id, active: "true" }}
                triggerLabel="Put on sale"
                title="Put this price back on sale?"
                description={`${priceLabel(row)} (${periodLabel(row)}).`}
                confirmLabel="Put on sale"
                reason={{ label: "Reason", hint: "Recorded in the audit log.", maxLength: 500 }}
              />
            ) : (
              <span className="text-sm text-muted">—</span>
            ),
        },
      ]}
    />
  );
}
