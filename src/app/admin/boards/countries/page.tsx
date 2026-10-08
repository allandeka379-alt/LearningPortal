import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { CatalogueStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav, ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { CATALOGUE_STATUS_FILTER } from "@/components/admin/curriculum/labels";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, listCountries, type CountryRow } from "@/server/cms/curriculum";

export const metadata = { title: "Countries" };

/** /admin/boards/countries — countries the platform serves (read-mostly; §53 adds countries as data). */
export default async function CountriesPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/boards/countries" });
  const params = await searchParams;
  const filter = { q: firstParam(params, "q"), status: firstParam(params, "status"), cursor: firstParam(params, "cursor") };
  const page = await listCountries(actor, filter);
  const { canAdmin } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Countries"
        breadcrumbs={[{ label: "Exam boards", href: "/admin/boards" }, { label: "Countries" }]}
        description="Country settings drive onboarding, currency display and the local day used for streaks. They rarely change."
        actions={canAdmin ? <ButtonLink href="/admin/boards/countries/new" variant="outline">New country</ButtonLink> : undefined}
      />
      <CurriculumSubnav active="countries" />
      {!canAdmin && <ReadOnlyNotice />}
      <FilterBar
        action="/admin/boards/countries"
        search={{ label: "Search countries", placeholder: "Name or ISO code", value: filter.q }}
        filters={[{ kind: "select", name: "status", label: "Catalogue status", options: CATALOGUE_STATUS_FILTER, value: filter.status }]}
      />
      <DataTable<CountryRow>
        caption="Countries"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState title="No countries match" titleAs="p" />}
        columns={[
          {
            key: "name",
            header: "Country",
            primary: true,
            cell: (row) => (
              <Link href={`/admin/boards/countries/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                {row.name} <span className="font-normal text-muted">({row.isoCode})</span>
              </Link>
            ),
          },
          { key: "status", header: "Status", cell: (row) => <CatalogueStatusBadge status={row.catalogueStatus} /> },
          { key: "currency", header: "Currency", cell: (row) => <span className="font-mono">{row.defaultCurrency}</span> },
          { key: "timezone", header: "Time zone", cell: (row) => row.timezone, hideOnMobile: true },
          { key: "boards", header: "Boards offered", align: "end", cell: (row) => row._count.examBoardLinks },
          { key: "years", header: "Year groups", align: "end", cell: (row) => row._count.yearGroups },
        ]}
      />
      <CursorPagination path="/admin/boards/countries" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
    </Container>
  );
}
