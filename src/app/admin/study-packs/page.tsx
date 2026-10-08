import { Package, Plus } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { CONTENT_STATUS_META, ContentStatusBadge, DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { ContentStatus } from "@/generated/prisma/enums";
import { listStudyPacks } from "@/server/cms/study-packs/service";

export const metadata = { title: "Study packs" };

/** /admin/study-packs — premium packs that unlock platform content by scope (§24). */
export default async function AdminStudyPacksPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/study-packs" });
  const params = await searchParams;
  const filters = { q: firstParam(params, "q"), status: enumParam(params, "status", Object.values(ContentStatus)), cursor: firstParam(params, "cursor") };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listStudyPacks(actor, f));
  const filtered = Boolean(filters.q || filters.status);

  return (
    <Container size="wide">
      <PageHeader
        title="Study packs"
        description="Packs unlock live platform content for a qualification, subject or syllabus version, not downloadable files. Prices are set per pack."
        actions={
          <ButtonLink href="/admin/study-packs/new" iconStart={<Plus aria-hidden="true" />}>
            New study pack
          </ButtonLink>
        }
      />
      <FilterBar
        action="/admin/study-packs"
        search={{ label: "Search packs", placeholder: "Title, web address or id", value: filters.q }}
        filters={[{ kind: "select", name: "status", label: "Status", options: Object.values(ContentStatus).map((s) => ({ value: s, label: CONTENT_STATUS_META[s]?.label ?? s })), value: filters.status }]}
      />
      <DataTable
        caption="Study packs"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<Package aria-hidden="true" />}
            title={filtered ? "No study packs match these filters" : "No study packs yet"}
            action={filtered ? undefined : <ButtonLink href="/admin/study-packs/new">Create the first pack</ButtonLink>}
          />
        }
        columns={[
          {
            key: "title",
            header: "Pack",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/study-packs/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.title}
                </Link>
                <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                  <span className="font-mono">{row.slug}</span>
                  {row.isFeatured && <Badge size="sm" tone="accent">Featured</Badge>}
                  {row.draftOfId && <Badge size="sm" tone="info">Edit (revision {row.revision})</Badge>}
                  {row.isDemo && <DemoBadge />}
                </span>
              </span>
            ),
          },
          { key: "scope", header: "Scope rules", align: "end", hideOnMobile: true, cell: (row) => (row.scopeCount === 0 ? <span className="text-warning-text">None</span> : row.scopeCount) },
          { key: "prices", header: "Active prices", align: "end", hideOnMobile: true, cell: (row) => (row.activePriceCount === 0 ? <span className="text-muted">None</span> : row.activePriceCount) },
          { key: "pdf", header: "PDF export", hideOnMobile: true, cell: (row) => (row.allowPdfExport ? "Offered" : <span className="text-muted">Off</span>) },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="flex flex-col items-start gap-1">
                <ContentStatusBadge status={row.status} />
                {row.pendingDraft && (
                  <Link href={`/admin/study-packs/${row.pendingDraft.id}`} className="text-xs text-muted underline underline-offset-2">
                    Edit {CONTENT_STATUS_META[row.pendingDraft.status]?.label.toLowerCase() ?? ""}
                  </Link>
                )}
              </span>
            ),
          },
          { key: "updated", header: "Updated", hideOnMobile: true, cell: (row) => <Timestamp value={row.updatedAt} className="text-sm" /> },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/study-packs" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Study pack pages" />
    </Container>
  );
}
