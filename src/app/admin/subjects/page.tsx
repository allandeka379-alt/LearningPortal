import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { CatalogueStatusBadge, DemoBadge, VerifiedBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav, ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { CATALOGUE_STATUS_FILTER } from "@/components/admin/curriculum/labels";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, getCatalogueOptions, listSubjects, type SubjectRow } from "@/server/cms/curriculum";

export const metadata = { title: "Subjects" };

/**
 * /admin/subjects — subjects per qualification (§4) with the "verified" state: seeded subjects are hidden and
 * unverified until staff confirm them against the board's official subject list.
 */
export default async function SubjectsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/subjects" });
  const params = await searchParams;
  const filter = {
    q: firstParam(params, "q"),
    status: firstParam(params, "status"),
    boardId: firstParam(params, "boardId"),
    qualificationId: firstParam(params, "qualificationId"),
    categoryId: firstParam(params, "categoryId"),
    verified: firstParam(params, "verified"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, options] = await Promise.all([loadFirstPageOnStaleCursor(filter, (f) => listSubjects(actor, f)), getCatalogueOptions(actor)]);
  const { canAdmin } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Subjects"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Subjects" }]}
        description="A subject is listed to students only after it is verified against the board's official subject list."
        actions={canAdmin ? <ButtonLink href={filter.qualificationId ? `/admin/subjects/new?qualificationId=${filter.qualificationId}` : "/admin/subjects/new"}>New subject</ButtonLink> : undefined}
      />
      <CurriculumSubnav active="subjects" />
      {!canAdmin && <ReadOnlyNotice />}
      <FilterBar
        action="/admin/subjects"
        search={{ label: "Search subjects", placeholder: "Name, code or slug", value: filter.q }}
        filters={[
          { kind: "select", name: "boardId", label: "Board", options: options.boards.map((b) => ({ value: b.id, label: b.shortName })), value: filter.boardId },
          {
            kind: "select",
            name: "qualificationId",
            label: "Qualification",
            options: options.qualifications.map((q) => ({ value: q.id, label: `${q.boardShortName} ${q.shortName}` })),
            value: filter.qualificationId,
          },
          { kind: "select", name: "categoryId", label: "Category", options: options.categories.map((c) => ({ value: c.id, label: c.name })), value: filter.categoryId },
          { kind: "select", name: "status", label: "Catalogue status", options: CATALOGUE_STATUS_FILTER, value: filter.status },
          {
            kind: "select",
            name: "verified",
            label: "Verification",
            options: [
              { value: "no", label: "Unverified" },
              { value: "yes", label: "Verified" },
            ],
            value: filter.verified,
          },
        ]}
      />
      <DataTable<SubjectRow>
        caption="Subjects"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState title="No subjects match" description="Clear the filters to see every subject." titleAs="p" />}
        columns={[
          {
            key: "name",
            header: "Subject",
            primary: true,
            cell: (row) => (
              <Link href={`/admin/subjects/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                {row.name}
              </Link>
            ),
          },
          { key: "qualification", header: "Qualification", cell: (row) => `${row.qualification.examBoard.shortName} ${row.qualification.shortName}` },
          { key: "code", header: "Code", cell: (row) => (row.officialCode ? <span className="font-mono">{row.officialCode}</span> : <span className="text-muted">Not set</span>) },
          { key: "category", header: "Category", cell: (row) => row.category.name, hideOnMobile: true },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="inline-flex flex-wrap gap-1.5">
                <CatalogueStatusBadge status={row.catalogueStatus} />
                <VerifiedBadge verified={row.verified} />
                {row.isDemo && <DemoBadge />}
              </span>
            ),
          },
          { key: "versions", header: "Syllabus versions", align: "end", cell: (row) => <Link className="underline-offset-4 hover:underline" href={`/admin/syllabuses?subjectId=${row.id}`}>{row._count.syllabi}</Link> },
        ]}
      />
      <CursorPagination path="/admin/subjects" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
    </Container>
  );
}
