import { Flag } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDateTime } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { ContentStatusBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { FLAG_REASON_LABELS, FLAG_REASONS, FLAG_SOURCE_LABELS, FLAG_SOURCES, FLAG_STATUSES, FLAGGABLE_TYPES } from "@/server/cms/flags/schemas";
import { listFlags } from "@/server/cms/flags/service";
import { CONTENT_TYPE_LABELS } from "@/server/cms/review/labels";

export const metadata = { title: "Content flags" };

const STATUS_FILTERS = ["open", ...FLAG_STATUSES, "all"] as const;
const STATUS_LABELS: Record<(typeof STATUS_FILTERS)[number], string> = {
  open: "Open and in progress",
  OPEN: "Open (not picked up)",
  IN_PROGRESS: "In progress",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
  all: "All",
};

/**
 * /admin/flags — §42 quality flags: reports of incorrect answers, ambiguous questions, incorrect marking, wrong topic
 * or difficulty, typos and copyright concerns. Open flags oldest first; reporters shown by role only.
 */
export default async function FlagsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/flags" });
  const params = await searchParams;
  const filters = {
    status: enumParam(params, "status", STATUS_FILTERS) ?? "open",
    reason: enumParam(params, "reason", FLAG_REASONS),
    entityType: enumParam(params, "entityType", FLAGGABLE_TYPES),
    entityId: uuidParam(params, "entityId"),
    source: enumParam(params, "source", FLAG_SOURCES),
    assigned: enumParam(params, "assigned", ["me", "unassigned"] as const),
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listFlags(actor, f));
  const filtered = filters.status !== "open" || Boolean(filters.reason || filters.entityType || filters.entityId || filters.source || filters.assigned);

  return (
    <Container size="wide">
      <PageHeader
        title="Content flags"
        description="Problems reported by students, teachers, editors and automatic checks. Pick one up, fix the item through the normal workflow, then resolve the flag with a note."
      />
      <FilterBar
        action="/admin/flags"
        keep={{ entityId: filters.entityId }}
        filters={[
          { kind: "select", name: "status", label: "Status", options: STATUS_FILTERS.filter((value) => value !== "open").map((value) => ({ value, label: STATUS_LABELS[value] })), value: filters.status === "open" ? undefined : filters.status, placeholder: "Open and in progress" },
          { kind: "select", name: "reason", label: "Reason", options: FLAG_REASONS.map((value) => ({ value, label: FLAG_REASON_LABELS[value] })), value: filters.reason },
          { kind: "select", name: "entityType", label: "Content type", options: FLAGGABLE_TYPES.map((value) => ({ value, label: CONTENT_TYPE_LABELS[value].plural })), value: filters.entityType },
          { kind: "select", name: "source", label: "Reported by", options: FLAG_SOURCES.map((value) => ({ value, label: FLAG_SOURCE_LABELS[value] })), value: filters.source },
          { kind: "select", name: "assigned", label: "Assigned", options: [{ value: "me", label: "Assigned to me" }, { value: "unassigned", label: "Unassigned" }], value: filters.assigned },
        ]}
      />
      {filters.entityId && (
        <p className="-mt-2 mb-4 text-sm text-muted">
          Showing flags of one item. <Link href="/admin/flags" className="font-medium text-primary underline underline-offset-2">Show all flags</Link>
        </p>
      )}
      <DataTable
        caption="Content flags"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState icon={<Flag aria-hidden="true" />} title={filtered ? "No flags match these filters" : "No open flags"} description={filtered ? undefined : "Reports from students, teachers and editors appear here."} />}
        columns={[
          {
            key: "flag",
            header: "Report",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/flags/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {FLAG_REASON_LABELS[row.reason]}
                </Link>
                {row.details && <span className="line-clamp-2 block text-xs font-normal text-muted">“{row.details}”</span>}
              </span>
            ),
          },
          {
            key: "item",
            header: "Item",
            cell: (row) => (
              <span className="block min-w-0 text-sm">
                <Badge size="sm" tone="neutral">
                  {CONTENT_TYPE_LABELS[row.entityType].singular}
                </Badge>{" "}
                {row.target.editorHref ? (
                  <Link href={row.target.editorHref} className="underline-offset-4 hover:underline">
                    {row.target.title}
                  </Link>
                ) : (
                  <span className="text-muted">{row.target.title}</span>
                )}
                {row.target.status && (
                  <span className="mt-1 block">
                    <ContentStatusBadge status={row.target.status} />
                    {row.revision !== null && row.target.revision !== null && row.target.revision > row.revision && (
                      <span className="ml-2 text-xs text-muted">reported on rev. {row.revision}, now rev. {row.target.revision}</span>
                    )}
                  </span>
                )}
              </span>
            ),
          },
          { key: "source", header: "Reported by", hideOnMobile: true, cell: (row) => FLAG_SOURCE_LABELS[row.source] },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="block">
                <StatusBadge kind="flag" status={row.status} />
                {row.assignedTo && <span className="block text-xs text-muted">{row.assignedToMe ? "You" : row.assignedTo}</span>}
              </span>
            ),
          },
          { key: "reported", header: "Reported", hideOnMobile: true, cell: (row) => formatDateTime(row.createdAt) },
        ]}
      />
      <CursorPagination className="mt-4 mb-12" path="/admin/flags" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Flag pages" />
    </Container>
  );
}
