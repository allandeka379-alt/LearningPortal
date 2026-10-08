import Link from "next/link";
import type { PaymentPurpose, PaymentStatus } from "@/generated/prisma/client";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { paymentResultHref } from "./checkout-state";
import { formatMoney, PAYMENT_STATUS_LABELS, PAYMENT_STATUS_TONES } from "./format";

export interface PaymentHistoryRow {
  id: string;
  status: PaymentStatus;
  purpose: PaymentPurpose;
  itemName: string | null;
  amountMinor: number;
  currency: string;
  refundedAmountMinor: number;
  methodLabel: string;
  receiptNumber: string | null;
  createdAt: Date;
  paidByYou: boolean;
}

/**
 * Payment history (§32 "proper transaction records"): date, what it was for, amount, method, status and receipt number,
 * one row per Payment. Each row links to its status page. Paginate upstream (cursor). Server component.
 */
export function PaymentHistory({ rows, timeZone }: { rows: readonly PaymentHistoryRow[]; timeZone: string }) {
  const columns: DataTableColumn<PaymentHistoryRow>[] = [
    {
      key: "item",
      header: "Payment",
      primary: true,
      cell: (row) => (
        <span className="block">
          <Link href={paymentResultHref(row.id)} className="font-medium text-text underline-offset-2 hover:underline">
            {row.itemName ?? (row.purpose === "STUDY_PACK" ? "Study pack" : "Plan")}
          </Link>
          <span className="block text-xs text-muted">
            {formatInstantDate(row.createdAt, timeZone)}
            {row.paidByYou ? "" : " · paid by your parent or guardian"}
          </span>
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      align: "end",
      cell: (row) => (
        <span className="tabular-nums">
          {formatMoney(row.amountMinor, row.currency)}
          {row.refundedAmountMinor > 0 && row.status !== "REFUNDED" && (
            <span className="block text-xs text-muted">{formatMoney(row.refundedAmountMinor, row.currency)} refunded</span>
          )}
        </span>
      ),
    },
    { key: "method", header: "Method", hideOnMobile: true, cell: (row) => row.methodLabel },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Badge tone={PAYMENT_STATUS_TONES[row.status]} size="sm">
          {PAYMENT_STATUS_LABELS[row.status]}
        </Badge>
      ),
    },
    { key: "receipt", header: "Receipt", cell: (row) => <span className="tabular-nums">{row.receiptNumber ?? "—"}</span> },
  ];

  return (
    <DataTable
      caption="Your payments, newest first"
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      empty={<EmptyState title="No payments yet" description="When you pay for a plan or a study pack, the receipt appears here." titleAs="p" />}
    />
  );
}
