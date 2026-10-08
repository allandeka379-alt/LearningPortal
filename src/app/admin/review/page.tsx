import { ClipboardCheck, FolderTree } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDateTime } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { buildHref, enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { AiDraftBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { CONTENT_TYPE_LABELS, REVIEWABLE_TYPES, reviewHref } from "@/server/cms/review/labels";
import { listReviewQueue, QUEUE_STATUSES, reviewQueueCounts } from "@/server/cms/review/service";

export const metadata = { title: "Review queue" };

const TYPE_OPTIONS = REVIEWABLE_TYPES.map((value) => ({ value, label: CONTENT_TYPE_LABELS[value].plural }));

/**
 * /admin/review — §41 / §42 review queue: every content type waiting for a reviewer (oldest first) and approved items
 * waiting to be published. Four-eyes: the viewer's own work is marked (they cannot approve it when enforced).
 */
export default async function ReviewQueuePage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.review", { next: "/admin/review" });
  const params = await searchParams;
  const status = enumParam(params, "status", QUEUE_STATUSES) ?? "IN_REVIEW";
  const filters = {
    status,
    type: enumParam(params, "type", REVIEWABLE_TYPES),
    ai: enumParam(params, "ai", ["only", "exclude"] as const),
    authored: enumParam(params, "authored", ["mine", "others"] as const),
    cursor: firstParam(params, "cursor"),
  };
  const [page, counts] = await Promise.all([loadFirstPageOnStaleCursor(filters, (f) => listReviewQueue(actor, f)), reviewQueueCounts(actor)]);
  const total = (s: (typeof QUEUE_STATUSES)[number]) => Object.values(counts[s]).reduce((sum, n) => sum + n, 0);
  const filtered = Boolean(filters.type || filters.ai || filters.authored);

  return (
    <Container size="wide">
      <PageHeader
        title="Review queue"
        description="Content waiting for review, oldest first. Check accuracy, notation, curriculum alignment, copyright and source; AI drafts need a written review note."
        actions={
          <ButtonLink href="/admin/review/topics" variant="outline" iconStart={<FolderTree aria-hidden="true" />}>
            Review by topic
          </ButtonLink>
        }
      />
      <nav aria-label="Queue" className="mb-4 flex flex-wrap gap-2">
        {QUEUE_STATUSES.map((value) => (
          <Link
            key={value}
            href={buildHref("/admin/review", { status: value, type: filters.type, ai: filters.ai, authored: filters.authored })}
            aria-current={status === value ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-control border px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              status === value ? "border-primary bg-primary-soft text-on-primary-soft" : "border-border text-text hover:bg-subtle",
            )}
          >
            {value === "IN_REVIEW" ? "Waiting for review" : "Approved, not yet published"}
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs tabular-nums text-text">{formatNumber(total(value))}</span>
          </Link>
        ))}
      </nav>
      <FilterBar
        action="/admin/review"
        keep={{ status }}
        filters={[
          { kind: "select", name: "type", label: "Content type", options: TYPE_OPTIONS.map((o) => ({ ...o, label: `${o.label} (${formatNumber(counts[status][o.value])})` })), value: filters.type },
          { kind: "select", name: "ai", label: "AI-generated", options: [{ value: "only", label: "AI drafts only" }, { value: "exclude", label: "Human-written only" }], value: filters.ai },
          { kind: "select", name: "authored", label: "Author", options: [{ value: "others", label: "Others' work (I can approve)" }, { value: "mine", label: "My own work" }], value: filters.authored },
        ]}
      />
      <DataTable
        caption={status === "IN_REVIEW" ? "Items waiting for review" : "Approved items waiting to be published"}
        rows={page.items}
        rowKey={(row) => `${row.entityType}:${row.id}`}
        empty={
          <EmptyState
            icon={<ClipboardCheck aria-hidden="true" />}
            title={filtered ? "Nothing matches these filters" : status === "IN_REVIEW" ? "Nothing is waiting for review" : "Nothing is waiting to be published"}
          />
        }
        columns={[
          {
            key: "item",
            header: "Item",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={reviewHref(row.entityType, row.id)} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.title}
                </Link>
                <span className="mt-1 flex flex-wrap items-center gap-1">
                  <Badge size="sm" tone="neutral">
                    {CONTENT_TYPE_LABELS[row.entityType].singular}
                  </Badge>
                  {row.draftOfId && (
                    <Badge size="sm" tone="info" appearance="outline">
                      Edit of published (rev. {row.revision})
                    </Badge>
                  )}
                  {row.aiGenerated && <AiDraftBadge />}
                  {row.isOwnWork && (
                    <Badge size="sm" tone="warning" appearance="outline">
                      Your work
                    </Badge>
                  )}
                </span>
              </span>
            ),
          },
          { key: "subject", header: "Subject", hideOnMobile: true, cell: (row) => row.subject ?? "General" },
          { key: "author", header: "Author", hideOnMobile: true, cell: (row) => row.author ?? "—" },
          ...(status === "APPROVED"
            ? [{ key: "approved", header: "Approved by", hideOnMobile: true, cell: (row: (typeof page.items)[number]) => (row.approvedBy ? `${row.approvedBy}, ${formatDateTime(row.approvedAt)}` : "—") }]
            : []),
          { key: "since", header: status === "IN_REVIEW" ? "Waiting since" : "Last change", cell: (row) => formatDateTime(row.updatedAt) },
        ]}
      />
      <CursorPagination className="mt-4 mb-12" path="/admin/review" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Queue pages" />
    </Container>
  );
}
