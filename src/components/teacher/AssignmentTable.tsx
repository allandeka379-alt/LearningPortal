import { ClipboardList } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatDateTime } from "@/components/admin/format";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import type { AssignmentListItem } from "@/server/teaching/assignments";
import { ASSIGNMENT_TYPE_LABELS, percentText, WINDOW_LABELS } from "./labels";

export interface AssignmentTableProps {
  items: readonly AssignmentListItem[];
  timeZone: string;
  /** Show the class column (lists across classes). */
  showClass?: boolean;
  empty?: ReactNode;
}

/** Assignments with their window, due date, hand-in count, average score and answers to mark. Server component. */
export function AssignmentTable({ items, timeZone, showClass = false, empty }: AssignmentTableProps) {
  return (
    <DataTable
      caption="Assignments"
      rows={items}
      rowKey={(row) => row.id}
      empty={empty ?? <EmptyState icon={<ClipboardList aria-hidden="true" />} title="No work set yet" titleAs="p" />}
      columns={[
        {
          key: "title",
          header: "Assignment",
          primary: true,
          cell: (row) => (
            <span className="min-w-0">
              <Link href={`/teacher/classes/${row.classId}/assignments/${row.id}`} className="font-semibold text-text hover:underline">
                {row.title}
              </Link>
              <span className="block text-xs text-muted">
                {ASSIGNMENT_TYPE_LABELS[row.type]}
                {showClass ? ` · ${row.className}` : ""}
              </span>
            </span>
          ),
        },
        { key: "status", header: "Status", cell: (row) => <Badge tone={WINDOW_LABELS[row.window].tone}>{WINDOW_LABELS[row.window].label}</Badge> },
        { key: "due", header: "Due", cell: (row) => (row.dueAt ? formatDateTime(row.dueAt, timeZone) : "No due date") },
        {
          key: "handedIn",
          header: "Handed in",
          align: "end",
          cell: (row) => (row.status === "DRAFT" ? "—" : `${row.summary.submitted}/${row.summary.assigned}${row.summary.late > 0 ? ` (${row.summary.late} late)` : ""}`),
        },
        { key: "average", header: "Average", align: "end", cell: (row) => percentText(row.summary.averageScorePercent), hideOnMobile: true },
        {
          key: "marking",
          header: "To mark",
          align: "end",
          cell: (row) => (row.awaitingMarking > 0 ? <Badge tone="accent">{row.awaitingMarking}</Badge> : "—"),
        },
      ]}
    />
  );
}
