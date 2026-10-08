import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { formatLocalDate } from "@/components/admin/format";
import { DemoBadge, SyllabusStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav } from "@/components/admin/curriculum/CurriculumSubnav";
import { SYLLABUS_STATUS_FILTER } from "@/components/admin/curriculum/labels";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, getCatalogueOptions, listSyllabusVersions, type SyllabusVersionRow } from "@/server/cms/curriculum";

export const metadata = { title: "Syllabus versions" };

/** /admin/syllabuses — every syllabus version (§26): drafts, upcoming, current, superseded and archived. */
export default async function SyllabusesPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/syllabuses" });
  const params = await searchParams;
  const filter = {
    q: firstParam(params, "q"),
    subjectId: firstParam(params, "subjectId"),
    qualificationId: firstParam(params, "qualificationId"),
    status: firstParam(params, "status"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, options] = await Promise.all([loadFirstPageOnStaleCursor(filter, (f) => listSyllabusVersions(actor, f)), getCatalogueOptions(actor)]);
  const { canDraft } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Syllabus versions"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Syllabus versions" }]}
        description="One record per version. Published versions are frozen; changes start a new draft version, and students stay on the version they enrolled in."
        actions={canDraft ? <ButtonLink href={filter.subjectId ? `/admin/syllabuses/new?subjectId=${filter.subjectId}` : "/admin/syllabuses/new"}>New version</ButtonLink> : undefined}
      />
      <CurriculumSubnav active="syllabuses" />
      <FilterBar
        action="/admin/syllabuses"
        keep={{ subjectId: filter.subjectId }}
        search={{ label: "Search versions", placeholder: "Subject, title, label or code", value: filter.q }}
        filters={[
          {
            kind: "select",
            name: "qualificationId",
            label: "Qualification",
            options: options.qualifications.map((q) => ({ value: q.id, label: `${q.boardShortName} ${q.shortName}` })),
            value: filter.qualificationId,
          },
          { kind: "select", name: "status", label: "Status", options: SYLLABUS_STATUS_FILTER, value: filter.status },
        ]}
      />
      {filter.subjectId && (
        <p className="mb-3 text-sm text-muted">
          Showing one subject&apos;s versions.{" "}
          <Link href="/admin/syllabuses" className="text-primary underline underline-offset-4">
            Show all subjects
          </Link>
        </p>
      )}
      <DataTable<SyllabusVersionRow>
        caption="Syllabus versions"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            title="No syllabus versions match"
            description="Versions are created from a subject: open the subject and choose New syllabus version."
            titleAs="p"
            action={<ButtonLink href="/admin/subjects" variant="outline">Go to subjects</ButtonLink>}
          />
        }
        columns={[
          {
            key: "version",
            header: "Version",
            primary: true,
            cell: (row) => (
              <Link href={`/admin/syllabuses/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                {row.subject.name} · {row.versionLabel}
                <span className="block text-sm font-normal text-muted">{row.title}</span>
              </Link>
            ),
          },
          { key: "qualification", header: "Qualification", cell: (row) => `${row.subject.qualification.examBoard.shortName} ${row.subject.qualification.shortName}` },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="inline-flex flex-wrap gap-1.5">
                <SyllabusStatusBadge status={row.status} />
                {row.isDemo && <DemoBadge />}
              </span>
            ),
          },
          { key: "effective", header: "Effective", cell: (row) => `${formatLocalDate(row.effectiveFrom)} – ${row.effectiveTo ? formatLocalDate(row.effectiveTo) : "open"}`, hideOnMobile: true },
          { key: "topics", header: "Topics", align: "end", cell: (row) => row._count.topics },
          { key: "students", header: "Students pinned", align: "end", cell: (row) => row._count.enrollments, hideOnMobile: true },
          { key: "updated", header: "Updated", cell: (row) => <Timestamp value={row.updatedAt} />, hideOnMobile: true },
        ]}
      />
      <CursorPagination path="/admin/syllabuses" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
    </Container>
  );
}
