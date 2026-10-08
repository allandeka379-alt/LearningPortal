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
import { curriculumAccess, getCatalogueOptions, listQualifications, type QualificationRow } from "@/server/cms/curriculum";

export const metadata = { title: "Qualifications" };

/** /admin/qualifications — qualifications per board (ZIMSEC O-Level, Cambridge IGCSE, …). */
export default async function QualificationsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/qualifications" });
  const params = await searchParams;
  const filter = {
    q: firstParam(params, "q"),
    status: firstParam(params, "status"),
    boardId: firstParam(params, "boardId"),
    levelId: firstParam(params, "levelId"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, options] = await Promise.all([listQualifications(actor, filter), getCatalogueOptions(actor)]);
  const { canAdmin } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Qualifications"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Qualifications" }]}
        description="A qualification belongs to one board; levels group them across boards in onboarding."
        actions={canAdmin ? <ButtonLink href={filter.boardId ? `/admin/qualifications/new?boardId=${filter.boardId}` : "/admin/qualifications/new"}>New qualification</ButtonLink> : undefined}
      />
      <CurriculumSubnav active="qualifications" />
      {!canAdmin && <ReadOnlyNotice />}
      <FilterBar
        action="/admin/qualifications"
        search={{ label: "Search qualifications", placeholder: "Name, code or slug", value: filter.q }}
        filters={[
          { kind: "select", name: "boardId", label: "Board", options: options.boards.map((b) => ({ value: b.id, label: b.shortName })), value: filter.boardId },
          { kind: "select", name: "levelId", label: "Level", options: options.levels.map((l) => ({ value: l.id, label: l.name })), value: filter.levelId },
          { kind: "select", name: "status", label: "Catalogue status", options: CATALOGUE_STATUS_FILTER, value: filter.status },
        ]}
      />
      <DataTable<QualificationRow>
        caption="Qualifications"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState title="No qualifications match" titleAs="p" />}
        columns={[
          {
            key: "name",
            header: "Qualification",
            primary: true,
            cell: (row) => (
              <Link href={`/admin/qualifications/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                {row.name}
              </Link>
            ),
          },
          { key: "board", header: "Board", cell: (row) => row.examBoard.shortName },
          { key: "level", header: "Level", cell: (row) => row.level.name },
          { key: "url", header: "URL", cell: (row) => <span className="font-mono text-sm">/{row.examBoard.slug}/{row.slug}</span>, hideOnMobile: true },
          { key: "status", header: "Status", cell: (row) => <CatalogueStatusBadge status={row.catalogueStatus} /> },
          { key: "subjects", header: "Subjects", align: "end", cell: (row) => <Link className="underline-offset-4 hover:underline" href={`/admin/subjects?qualificationId=${row.id}`}>{row._count.subjects}</Link> },
          { key: "sessions", header: "Exam sessions", align: "end", cell: (row) => <Link className="underline-offset-4 hover:underline" href={`/admin/exam-sessions?qualificationId=${row.id}`}>{row._count.examSessions}</Link>, hideOnMobile: true },
          { key: "schemes", header: "Grade schemes", align: "end", cell: (row) => <Link className="underline-offset-4 hover:underline" href={`/admin/grade-schemes?qualificationId=${row.id}`}>{row._count.gradeSchemes}</Link>, hideOnMobile: true },
        ]}
      />
      <CursorPagination path="/admin/qualifications" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
    </Container>
  );
}
