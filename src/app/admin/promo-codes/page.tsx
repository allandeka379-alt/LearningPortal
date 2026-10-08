import { Plus, TicketPercent } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { PromoDiscountType } from "@/generated/prisma/enums";
import { formatNumber } from "@/lib/format";
import { listPromoCodes } from "@/server/cms/commerce/promo-codes";
import { PROMO_STATES } from "@/server/cms/commerce/schemas";
import { CommerceNav } from "../plans/_shared/CommerceNav";
import { DISCOUNT_TYPE_LABELS, discountLabel } from "../plans/_shared/labels";
import { PROMO_STATE_META } from "./_components/promo-state";

export const metadata = { title: "Promo codes" };

/** /admin/promo-codes — discounts and free-day codes (§31, ARCHITECTURE §7.6): search, state and type filters. */
export default async function AdminPromoCodesPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("billing.manage", { next: "/admin/promo-codes" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    state: enumParam(params, "state", PROMO_STATES),
    type: enumParam(params, "type", Object.values(PromoDiscountType)),
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listPromoCodes(actor, f));
  const filtered = Boolean(filters.q || filters.state || filters.type);

  return (
    <Container size="wide">
      <PageHeader
        title="Promo codes"
        description="Percentage or fixed discounts at checkout, or free days of a plan. A used code keeps its discount; deactivate it to stop new use."
        actions={
          <ButtonLink href="/admin/promo-codes/new" iconStart={<Plus aria-hidden="true" />}>
            New promo code
          </ButtonLink>
        }
      />
      <CommerceNav current="/admin/promo-codes" />
      <FilterBar
        action="/admin/promo-codes"
        search={{ label: "Search", placeholder: "Code or description", value: filters.q }}
        filters={[
          { kind: "select", name: "state", label: "State", options: PROMO_STATES.map((value) => ({ value, label: PROMO_STATE_META[value].label })), value: filters.state },
          { kind: "select", name: "type", label: "Discount", options: Object.values(PromoDiscountType).map((value) => ({ value, label: DISCOUNT_TYPE_LABELS[value] })), value: filters.type },
        ]}
      />
      <DataTable
        caption="Promo codes"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<TicketPercent aria-hidden="true" />}
            title={filtered ? "No promo codes match these filters" : "No promo codes yet"}
            action={filtered ? undefined : <ButtonLink href="/admin/promo-codes/new">Create the first code</ButtonLink>}
          />
        }
        columns={[
          {
            key: "code",
            header: "Code",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/promo-codes/${row.id}`} className="font-mono font-semibold text-text underline-offset-4 hover:underline">
                  {row.code}
                </Link>
                {row.isDemo && (
                  <span className="ml-2 align-middle">
                    <DemoBadge />
                  </span>
                )}
                {row.description && <span className="block truncate text-xs text-muted">{row.description}</span>}
              </span>
            ),
          },
          { key: "discount", header: "Discount", cell: (row) => discountLabel(row) },
          {
            key: "state",
            header: "State",
            cell: (row) => {
              const meta = PROMO_STATE_META[row.state];
              return (
                <span className="flex flex-wrap gap-1">
                  <Badge size="sm" tone={meta.tone} appearance={meta.outline ? "outline" : "soft"}>
                    {meta.label}
                  </Badge>
                  {row.usedUp && (
                    <Badge size="sm" tone="warning">
                      Used up
                    </Badge>
                  )}
                </span>
              );
            },
          },
          {
            key: "used",
            header: "Redeemed",
            align: "end",
            cell: (row) => `${formatNumber(row.redeemedCount)}${row.maxRedemptions === null ? "" : ` of ${formatNumber(row.maxRedemptions)}`}`,
          },
          { key: "audience", header: "For", hideOnMobile: true, cell: (row) => (row.audience ? humanizeEnum(row.audience) : "Anyone") },
          { key: "window", header: "Valid", hideOnMobile: true, cell: (row) => `${formatDate(row.validFrom)} to ${row.validTo ? formatDate(row.validTo) : "no end"}` },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/promo-codes" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Promo code pages" />
    </Container>
  );
}
