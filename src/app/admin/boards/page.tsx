import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { CatalogueStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav, ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { CATALOGUE_STATUS_FILTER } from "@/components/admin/curriculum/labels";
import { Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, listBoards, type BoardRow } from "@/server/cms/curriculum";

export const metadata = { title: "Exam boards" };

/** /admin/boards — examination boards (§3). Editors read; admins create and edit. */
export default async function BoardsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/boards" });
  const params = await searchParams;
  const filter = { q: firstParam(params, "q"), status: firstParam(params, "status"), cursor: firstParam(params, "cursor") };
  const page = await loadFirstPageOnStaleCursor(filter, (f) => listBoards(actor, f));
  const { canAdmin } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Exam boards"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Exam boards" }]}
        description="Boards are the first segment of public curriculum URLs. Adding a board is data entry: no code change."
        actions={canAdmin ? <ButtonLink href="/admin/boards/new">New board</ButtonLink> : undefined}
      />
      <CurriculumSubnav active="boards" />
      {!canAdmin && <ReadOnlyNotice />}
      <FilterBar
        action="/admin/boards"
        search={{ label: "Search boards", placeholder: "Name, code or slug", value: filter.q }}
        filters={[{ kind: "select", name: "status", label: "Catalogue status", options: CATALOGUE_STATUS_FILTER, value: filter.status }]}
      />
      <DataTable<BoardRow>
        caption="Exam boards"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState title="No exam boards match" description="Clear the filters, or create the first board." titleAs="p" />}
        columns={[
          {
            key: "name",
            header: "Board",
            primary: true,
            cell: (row) => (
              <Link href={`/admin/boards/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                {row.shortName}
                <span className="block text-sm font-normal text-muted">{row.name}</span>
              </Link>
            ),
          },
          { key: "code", header: "Code", cell: (row) => <span className="font-mono text-sm">{row.code}</span> },
          { key: "slug", header: "URL", cell: (row) => <span className="font-mono text-sm">/{row.slug}</span>, hideOnMobile: true },
          { key: "status", header: "Status", cell: (row) => <CatalogueStatusBadge status={row.catalogueStatus} /> },
          { key: "home", header: "Home country", cell: (row) => row.homeCountry?.name ?? "International", hideOnMobile: true },
          { key: "countries", header: "Offered in", align: "end", cell: (row) => `${row._count.countryLinks} ${row._count.countryLinks === 1 ? "country" : "countries"}` },
          { key: "qualifications", header: "Qualifications", align: "end", cell: (row) => row._count.qualifications },
          { key: "updated", header: "Updated", cell: (row) => <Timestamp value={row.updatedAt} />, hideOnMobile: true },
        ]}
      />
      <CursorPagination path="/admin/boards" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
    </Container>
  );
}
