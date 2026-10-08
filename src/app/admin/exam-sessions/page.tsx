import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { formatLocalDate } from "@/components/admin/format";
import { DemoBadge, ExamSessionStatusBadge, ProvisionalBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav } from "@/components/admin/curriculum/CurriculumSubnav";
import { EXAM_SESSION_STATUS_FILTER } from "@/components/admin/curriculum/labels";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, getCatalogueOptions, listExamSessions, type ExamSessionRow } from "@/server/cms/curriculum";

export const metadata = { title: "Exam sessions" };

/** /admin/exam-sessions — examination series per qualification (§17). Only PUBLISHED sessions feed countdowns. */
export default async function ExamSessionsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/exam-sessions" });
  const params = await searchParams;
  const filter = {
    q: firstParam(params, "q"),
    qualificationId: firstParam(params, "qualificationId"),
    status: firstParam(params, "status"),
    year: firstParam(params, "year"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, options] = await Promise.all([listExamSessions(actor, filter), getCatalogueOptions(actor)]);
  const { canDraft } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Exam sessions"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Exam sessions" }]}
        description="Students pick a session as their target exam. Only published sessions appear in onboarding and countdowns; dates stay provisional until confirmed against the official timetable."
        actions={
          canDraft ? (
            <ButtonLink href={filter.qualificationId ? `/admin/exam-sessions/new?qualificationId=${filter.qualificationId}` : "/admin/exam-sessions/new"}>New session</ButtonLink>
          ) : undefined
        }
      />
      <CurriculumSubnav active="exam-sessions" />
      <FilterBar
        action="/admin/exam-sessions"
        search={{ label: "Search sessions", placeholder: "Name or series code", value: filter.q }}
        filters={[
          {
            kind: "select",
            name: "qualificationId",
            label: "Qualification",
            options: options.qualifications.map((q) => ({ value: q.id, label: `${q.boardShortName} ${q.shortName}` })),
            value: filter.qualificationId,
          },
          { kind: "select", name: "status", label: "Status", options: EXAM_SESSION_STATUS_FILTER, value: filter.status },
          { kind: "text", name: "year", label: "Year", placeholder: "e.g. 2027", value: filter.year },
        ]}
      />
      <DataTable<ExamSessionRow>
        caption="Exam sessions"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState title="No exam sessions match" description="Create sessions from the board's published exam calendar." titleAs="p" />}
        columns={[
          {
            key: "name",
            header: "Session",
            primary: true,
            cell: (row) => (
              <Link href={`/admin/exam-sessions/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                {row.name}
                <span className="block font-mono text-sm font-normal text-muted">{row.seriesCode}</span>
              </Link>
            ),
          },
          { key: "qualification", header: "Qualification", cell: (row) => `${row.qualification.examBoard.shortName} ${row.qualification.shortName}` },
          { key: "dates", header: "Dates", cell: (row) => `${formatLocalDate(row.startsOn)} – ${formatLocalDate(row.endsOn)}` },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="inline-flex flex-wrap gap-1.5">
                <ExamSessionStatusBadge status={row.status} />
                <ProvisionalBadge provisional={row.isProvisional} />
                {row.isDemo && <DemoBadge />}
              </span>
            ),
          },
          { key: "students", header: "Students targeting", align: "end", cell: (row) => row._count.targetingStudents + row._count.targetingEnrollments, hideOnMobile: true },
        ]}
      />
      <CursorPagination path="/admin/exam-sessions" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
    </Container>
  );
}
