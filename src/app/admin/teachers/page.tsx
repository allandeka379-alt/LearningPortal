import { Presentation } from "lucide-react";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { UserNameCell } from "@/components/admin/users/UserBits";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { UserStatus } from "@/generated/prisma/enums";
import { VERIFICATION_FILTERS } from "@/server/cms/users/schemas";
import { listTeachers } from "@/server/cms/users/service";

export const metadata = { title: "Teachers" };

/** /admin/teachers — §36 Teachers: school memberships, current classes and independent-tutor verification. */
export default async function AdminTeachersPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("users.manage", { next: "/admin/teachers" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    status: enumParam(params, "status", Object.values(UserStatus)),
    verification: enumParam(params, "verification", VERIFICATION_FILTERS),
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listTeachers(actor, f));

  return (
    <Container size="wide">
      <PageHeader
        title="Teachers"
        description="Teacher accounts. School teachers are added from a school's page; independent tutors run classes without a school."
      />
      <FilterBar
        action="/admin/teachers"
        search={{ label: "Search", placeholder: "Email, phone, name or user id", value: filters.q }}
        filters={[
          {
            kind: "select",
            name: "verification",
            label: "Tutor verification",
            options: [
              { value: "verified", label: "Verified" },
              { value: "unverified", label: "Not verified" },
            ],
            value: filters.verification,
          },
          {
            kind: "select",
            name: "status",
            label: "Status",
            options: Object.values(UserStatus).map((value) => ({ value, label: humanizeEnum(value) })),
            value: filters.status,
            placeholder: "All except deleted",
          },
        ]}
      />
      <DataTable
        caption="Teachers"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState icon={<Presentation aria-hidden="true" />} title={filters.q || filters.verification || filters.status ? "No teachers match these filters" : "No teachers yet"} />}
        columns={[
          {
            key: "name",
            header: "Teacher",
            primary: true,
            cell: (row) => (
              <UserNameCell id={row.id} name={row.title ? `${row.title} ${row.name}` : row.name} email={row.email} loginUsername={row.loginUsername} phoneMasked={row.phoneMasked} isDemo={row.isDemo} />
            ),
          },
          { key: "schools", header: "Schools", align: "end", cell: (row) => row.schools },
          { key: "classes", header: "Current classes", align: "end", cell: (row) => row.classes },
          { key: "verified", header: "Tutor verified", cell: (row) => (row.verifiedAt ? formatDate(row.verifiedAt) : <span className="text-muted">No</span>) },
          { key: "status", header: "Status", cell: (row) => <StatusBadge kind="user" status={row.status} /> },
          { key: "active", header: "Last active", hideOnMobile: true, cell: (row) => <Timestamp value={row.lastActiveAt} /> },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/teachers" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Teacher pages" />
    </Container>
  );
}
