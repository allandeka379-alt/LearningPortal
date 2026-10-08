import { Repeat } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { SubscriptionSource, SubscriptionStatus } from "@/generated/prisma/enums";
import { formatNumber } from "@/lib/format";
import { listPlanOptions } from "@/server/cms/commerce/plans";
import { SUBSCRIPTION_HOLDER_KINDS } from "@/server/cms/commerce/schemas";
import { listSubscriptions } from "@/server/cms/commerce/subscriptions";
import { CommerceNav } from "../plans/_shared/CommerceNav";

export const metadata = { title: "Subscriptions" };

/** /admin/subscriptions — §36 Subscriptions: search by holder, filter by status, plan, holder type and source. */
export default async function AdminSubscriptionsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("billing.manage", { next: "/admin/subscriptions" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    status: enumParam(params, "status", Object.values(SubscriptionStatus)),
    planId: uuidParam(params, "planId"),
    holder: enumParam(params, "holder", SUBSCRIPTION_HOLDER_KINDS),
    source: enumParam(params, "source", Object.values(SubscriptionSource)),
    cursor: firstParam(params, "cursor"),
  };
  const [page, plans] = await Promise.all([loadFirstPageOnStaleCursor(filters, (f) => listSubscriptions(actor, f)), listPlanOptions(actor)]);
  const filtered = Boolean(filters.q || filters.status || filters.planId || filters.holder || filters.source);

  return (
    <Container size="wide">
      <PageHeader title="Subscriptions" description="Who holds which plan, until when. Open one to cancel, extend or see its payments." />
      <CommerceNav current="/admin/subscriptions" />
      <FilterBar
        action="/admin/subscriptions"
        search={{ label: "Search", placeholder: "Holder name, email, phone, school or id", value: filters.q }}
        filters={[
          { kind: "select", name: "status", label: "Status", options: Object.values(SubscriptionStatus).map((value) => ({ value, label: humanizeEnum(value) })), value: filters.status },
          { kind: "select", name: "planId", label: "Plan", options: plans.map((plan) => ({ value: plan.id, label: `${plan.name} (${plan.code})` })), value: filters.planId },
          { kind: "select", name: "holder", label: "Held by", options: [{ value: "user", label: "Individuals" }, { value: "school", label: "Schools" }], value: filters.holder },
          { kind: "select", name: "source", label: "Source", options: Object.values(SubscriptionSource).map((value) => ({ value, label: humanizeEnum(value) })), value: filters.source },
        ]}
      />
      <DataTable
        caption="Subscriptions"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState icon={<Repeat aria-hidden="true" />} title={filtered ? "No subscriptions match these filters" : "No subscriptions yet"} />}
        columns={[
          {
            key: "holder",
            header: "Holder",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/subscriptions/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.holder.name}
                </Link>
                <span className="block text-xs text-muted">{row.holder.kind === "school" ? "School" : "Individual"}</span>
              </span>
            ),
          },
          {
            key: "plan",
            header: "Plan",
            cell: (row) => (
              <Link href={`/admin/plans/${row.plan.id}`} className="underline-offset-4 hover:underline">
                {row.plan.name}
              </Link>
            ),
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="flex flex-wrap items-center gap-1">
                <StatusBadge kind="subscription" status={row.status} />
                {row.cancelAtPeriodEnd && row.status !== "CANCELLED" && row.status !== "EXPIRED" && <span className="text-xs text-muted">ends at period end</span>}
              </span>
            ),
          },
          { key: "end", header: "Period ends", cell: (row) => formatDate(row.currentPeriodEnd) },
          { key: "seats", header: "Seats", align: "end", hideOnMobile: true, cell: (row) => (row.seats === null ? "—" : formatNumber(row.seats)) },
          { key: "source", header: "Source", hideOnMobile: true, cell: (row) => humanizeEnum(row.source) },
          { key: "created", header: "Created", hideOnMobile: true, cell: (row) => formatDate(row.createdAt) },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/subscriptions" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Subscription pages" />
    </Container>
  );
}
