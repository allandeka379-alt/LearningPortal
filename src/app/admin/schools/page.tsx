import { Plus, School } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { DemoBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { SchoolStatus } from "@/generated/prisma/enums";
import { formatNumber } from "@/lib/format";
import { listCountryOptions, listSchools } from "@/server/cms/schools/service";

export const metadata = { title: "Schools" };

/** /admin/schools — §36 Schools: search, status / country / region filters, member counts per role. */
export default async function AdminSchoolsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("school.manage", { next: "/admin/schools" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    status: enumParam(params, "status", Object.values(SchoolStatus)),
    countryId: uuidParam(params, "countryId"),
    region: firstParam(params, "region"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, countries] = await Promise.all([loadFirstPageOnStaleCursor(filters, (f) => listSchools(actor, f)), listCountryOptions(actor)]);
  const filtered = Boolean(filters.q || filters.status || filters.countryId || filters.region);

  return (
    <Container size="wide">
      <PageHeader
        title="Schools"
        description="Schools on the platform, their verification status and active members."
        actions={
          <ButtonLink href="/admin/schools/new" iconStart={<Plus aria-hidden="true" />}>
            New school
          </ButtonLink>
        }
      />
      <FilterBar
        action="/admin/schools"
        search={{ label: "Search", placeholder: "Name, town, slug or official code", value: filters.q }}
        filters={[
          { kind: "select", name: "status", label: "Status", options: Object.values(SchoolStatus).map((value) => ({ value, label: humanizeEnum(value) })), value: filters.status },
          { kind: "select", name: "countryId", label: "Country", options: countries.map((country) => ({ value: country.id, label: country.name })), value: filters.countryId },
          { kind: "text", name: "region", label: "Province / region", value: filters.region },
        ]}
      />
      <DataTable
        caption="Schools"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<School aria-hidden="true" />}
            title={filtered ? "No schools match these filters" : "No schools yet"}
            action={filtered ? undefined : <ButtonLink href="/admin/schools/new">Add the first school</ButtonLink>}
          />
        }
        columns={[
          {
            key: "name",
            header: "School",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/schools/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.name}
                </Link>
                {row.isDemo && (
                  <span className="ml-2 align-middle">
                    <DemoBadge />
                  </span>
                )}
                <span className="block truncate text-xs font-normal text-muted">{[row.town, row.district, row.region].filter(Boolean).join(", ") || row.slug}</span>
              </span>
            ),
          },
          { key: "type", header: "Type", hideOnMobile: true, cell: (row) => humanizeEnum(row.type) },
          { key: "country", header: "Country", hideOnMobile: true, cell: (row) => row.country },
          { key: "status", header: "Status", cell: (row) => <StatusBadge kind="school" status={row.status} /> },
          { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.activeStudents) },
          { key: "teachers", header: "Teachers", align: "end", cell: (row) => formatNumber(row.activeTeachers) },
          { key: "admins", header: "Admins", align: "end", hideOnMobile: true, cell: (row) => formatNumber(row.activeAdmins) },
          { key: "created", header: "Added", hideOnMobile: true, cell: (row) => formatDate(row.createdAt) },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/schools" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="School pages" />
    </Container>
  );
}
