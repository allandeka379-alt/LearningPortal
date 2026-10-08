import { Receipt } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate, formatMoneyMinor, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { dateParam, enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { PaymentPurpose, PaymentStatus } from "@/generated/prisma/enums";
import { listPaymentFilterOptions, listPayments, type PartyRef } from "@/server/cms/commerce/payments";
import { CommerceNav } from "../plans/_shared/CommerceNav";

export const metadata = { title: "Payments" };

function partyHref(party: PartyRef): string {
  return party.kind === "school" ? `/admin/schools/${party.id}` : `/admin/users/${party.id}`;
}

/**
 * /admin/payments — §32 transaction records: search by receipt, provider reference, payment / user id or email;
 * filter by status, provider, purpose, currency and date. Newest first, cursor pages.
 */
export default async function AdminPaymentsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("payments.view", { next: "/admin/payments" });
  const params = await searchParams;
  const options = await listPaymentFilterOptions(actor);
  const filters = {
    q: firstParam(params, "q"),
    status: enumParam(params, "status", Object.values(PaymentStatus)),
    provider: enumParam(params, "provider", options.providers),
    purpose: enumParam(params, "purpose", Object.values(PaymentPurpose)),
    currency: enumParam(params, "currency", options.currencies),
    from: dateParam(params, "from"),
    to: dateParam(params, "to"),
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listPayments(actor, f));
  const filtered = Boolean(filters.q || filters.status || filters.provider || filters.purpose || filters.currency || filters.from || filters.to);

  return (
    <Container size="wide">
      <PageHeader title="Payments" description="Every payment attempt with its provider events. Amounts are shown in the currency charged; nothing is converted." />
      <CommerceNav current="/admin/payments" />
      <FilterBar
        action="/admin/payments"
        search={{ label: "Search", placeholder: "Receipt (R-…), provider reference, payment or user id, email", value: filters.q }}
        filters={[
          { kind: "select", name: "status", label: "Status", options: Object.values(PaymentStatus).map((value) => ({ value, label: humanizeEnum(value) })), value: filters.status },
          { kind: "select", name: "provider", label: "Provider", options: options.providers.map((value) => ({ value, label: humanizeEnum(value) })), value: filters.provider },
          { kind: "select", name: "purpose", label: "For", options: Object.values(PaymentPurpose).map((value) => ({ value, label: humanizeEnum(value) })), value: filters.purpose },
          { kind: "select", name: "currency", label: "Currency", options: options.currencies.map((value) => ({ value, label: value })), value: filters.currency },
          { kind: "date", name: "from", label: "From", value: filters.from },
          { kind: "date", name: "to", label: "To", value: filters.to },
        ]}
      />
      <DataTable
        caption="Payments"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState icon={<Receipt aria-hidden="true" />} title={filtered ? "No payments match these filters" : "No payments yet"} />}
        columns={[
          {
            key: "amount",
            header: "Amount",
            primary: true,
            cell: (row) => (
              <span className="block">
                <Link href={`/admin/payments/${row.id}`} className="font-semibold tabular-nums underline-offset-4 hover:underline">
                  {formatMoneyMinor(row.amountMinor, row.currency)}
                </Link>
                {row.refundedAmountMinor > 0 && row.status !== "REFUNDED" && (
                  <span className="block text-xs text-muted">{formatMoneyMinor(row.refundedAmountMinor, row.currency)} refunded</span>
                )}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="flex flex-wrap gap-1">
                <StatusBadge kind="payment" status={row.status} />
                {row.disputed && (
                  <Badge size="sm" tone="danger" appearance="outline">
                    Disputed
                  </Badge>
                )}
              </span>
            ),
          },
          { key: "purpose", header: "For", hideOnMobile: true, cell: (row) => humanizeEnum(row.purpose) },
          {
            key: "payer",
            header: "Payer",
            cell: (row) =>
              row.payer ? (
                <Link href={`/admin/users/${row.payer.id}`} className="underline-offset-4 hover:underline">
                  {row.payer.name}
                </Link>
              ) : (
                "—"
              ),
          },
          {
            key: "beneficiary",
            header: "Beneficiary",
            hideOnMobile: true,
            cell: (row) =>
              row.beneficiary && row.beneficiary.id !== row.payer?.id ? (
                <Link href={partyHref(row.beneficiary)} className="underline-offset-4 hover:underline">
                  {row.beneficiary.name}
                </Link>
              ) : (
                <span className="text-muted">Same as payer</span>
              ),
          },
          { key: "provider", header: "Provider", hideOnMobile: true, cell: (row) => `${humanizeEnum(row.provider)}${row.method ? ` · ${humanizeEnum(row.method)}` : ""}` },
          { key: "receipt", header: "Receipt", hideOnMobile: true, cell: (row) => (row.receiptNumber ? <span className="font-mono text-xs">{row.receiptNumber}</span> : "—") },
          { key: "date", header: "Created", cell: (row) => formatDate(row.createdAt) },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/payments" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Payment pages" />
    </Container>
  );
}
