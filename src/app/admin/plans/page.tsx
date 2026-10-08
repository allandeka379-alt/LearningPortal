import { Tags } from "lucide-react";
import Link from "next/link";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { listPlansForAdmin } from "@/server/cms/commerce/plans";
import { CommerceNav } from "./_shared/CommerceNav";
import { priceLabel } from "./_shared/labels";

export const metadata = { title: "Plans & prices" };

/**
 * /admin/plans — §31 plans and their prices (never hard-coded). Lists every plan with its current prices per currency,
 * scheduled price changes and live subscriptions; editing happens on the plan page.
 */
export default async function AdminPlansPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("billing.manage", { next: "/admin/plans" });
  const q = firstParam(await searchParams, "q");
  const plans = await listPlansForAdmin(actor, undefined, { q });

  return (
    <Container size="wide">
      <PageHeader
        title="Plans & prices"
        description="What each plan unlocks and what it costs, per currency. Prices are never edited in place: a change adds a new price and retires the old one, so every receipt keeps its exact price."
      />
      <CommerceNav current="/admin/plans" />
      <FilterBar action="/admin/plans" search={{ label: "Search", placeholder: "Plan name or code", value: q }} />
      <DataTable
        caption="Plans"
        rows={plans}
        rowKey={(row) => row.id}
        empty={
          q ? (
            <EmptyState icon={<Tags aria-hidden="true" />} title="No plans match this search" />
          ) : (
            <EmptyState icon={<Tags aria-hidden="true" />} title="No plans yet" description="Plans are created by the platform seed (FREE, STUDENT, PREMIUM, SCHOOL)." />
          )
        }
        columns={[
          {
            key: "plan",
            header: "Plan",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/plans/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.name}
                </Link>
                {row.isDemo && (
                  <span className="ml-2 align-middle">
                    <DemoBadge />
                  </span>
                )}
                <span className="block font-mono text-xs text-muted">{row.code}</span>
              </span>
            ),
          },
          { key: "audience", header: "For", cell: (row) => (row.audience === "SCHOOL" ? "Schools" : "Individuals") },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="flex flex-wrap gap-1">
                <Badge size="sm" tone={row.isActive ? "success" : "neutral"} appearance={row.isActive ? "soft" : "outline"}>
                  {row.isActive ? "On sale" : "Retired"}
                </Badge>
                <Badge size="sm" tone="neutral" appearance="outline">
                  {row.isPublic ? "Public" : "Hidden"}
                </Badge>
                {row.isDefault && (
                  <Badge size="sm" tone="info">
                    Default
                  </Badge>
                )}
              </span>
            ),
          },
          {
            key: "prices",
            header: "Current prices",
            cell: (row) =>
              row.currentPrices.length === 0 ? (
                <span className="text-muted">{row.isDefault ? "Free" : "Price not set"}</span>
              ) : (
                <ul className="space-y-0.5">
                  {row.currentPrices.map((price) => (
                    <li key={price.id} className="whitespace-nowrap tabular-nums">
                      {priceLabel(price)}
                      {price.countryId && <span className="text-muted"> · country price</span>}
                    </li>
                  ))}
                  {row.scheduledPrices > 0 && <li className="text-muted">{row.scheduledPrices} scheduled change{row.scheduledPrices === 1 ? "" : "s"}</li>}
                </ul>
              ),
          },
          { key: "live", header: "Live subscriptions", align: "end", cell: (row) => formatNumber(row.liveSubscriptions) },
          { key: "bought", header: "Bought access", align: "end", cell: (row) => formatNumber(row.livePurchases) },
          { key: "trial", header: "Trial", align: "end", hideOnMobile: true, cell: (row) => (row.trialDays > 0 ? `${row.trialDays} days` : "None") },
          { key: "order", header: "Order", align: "end", hideOnMobile: true, cell: (row) => formatNumber(row.sortOrder) },
        ]}
      />
    </Container>
  );
}
