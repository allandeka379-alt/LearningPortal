import { CalendarDays, ClipboardList, Plus, Scale } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { ASSEMBLY_LABELS, ASSESSMENT_KIND_LABELS, optionsOf } from "@/components/admin/questions/labels";
import { enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { AiDraftBadge, CONTENT_STATUS_META, ContentStatusBadge, DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { AssessmentAssembly, AssessmentKind, ContentStatus } from "@/generated/prisma/enums";
import { listAssessments } from "@/server/cms/assessments/service";
import { getCurriculumOptions } from "@/server/cms/questions/lookups";

export const metadata = { title: "Exams" };

/** /admin/exams — topic / chapter / subject tests, timed exams, mocks and diagnostics (§12, §13, §46). */
export default async function AdminExamsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/exams" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    kind: enumParam(params, "kind", Object.values(AssessmentKind)),
    assembly: enumParam(params, "assembly", Object.values(AssessmentAssembly)),
    status: enumParam(params, "status", Object.values(ContentStatus)),
    subjectId: uuidParam(params, "subjectId"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, curriculum] = await Promise.all([loadFirstPageOnStaleCursor(filters, (f) => listAssessments(actor, f)), getCurriculumOptions(actor)]);
  const filtered = Boolean(filters.q || filters.kind || filters.assembly || filters.status || filters.subjectId);

  return (
    <Container size="wide">
      <PageHeader
        title="Exams"
        description="Tests, timed exams and mock exams built from published questions. Exam dates and grade estimates live in their own sections."
        actions={
          <>
            <ButtonLink href="/admin/exam-sessions" variant="outline" iconStart={<CalendarDays aria-hidden="true" />}>
              Exam sessions
            </ButtonLink>
            <ButtonLink href="/admin/grade-schemes" variant="outline" iconStart={<Scale aria-hidden="true" />}>
              Grade schemes
            </ButtonLink>
            <ButtonLink href="/admin/exams/new" iconStart={<Plus aria-hidden="true" />}>
              New assessment
            </ButtonLink>
          </>
        }
      />
      <FilterBar
        action="/admin/exams"
        label="Assessment filters"
        search={{ label: "Search titles", placeholder: "Title or id", value: filters.q }}
        filters={[
          { kind: "select", name: "kind", label: "Kind", options: optionsOf(ASSESSMENT_KIND_LABELS), value: filters.kind },
          { kind: "select", name: "assembly", label: "Questions", options: optionsOf(ASSEMBLY_LABELS), value: filters.assembly },
          { kind: "select", name: "status", label: "Status", options: Object.values(ContentStatus).map((s) => ({ value: s, label: CONTENT_STATUS_META[s]?.label ?? s })), value: filters.status },
          { kind: "select", name: "subjectId", label: "Subject", options: curriculum.subjects, value: filters.subjectId },
        ]}
      />
      <DataTable
        caption="Assessments"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<ClipboardList aria-hidden="true" />}
            title={filtered ? "No assessments match these filters" : "No assessments yet"}
            action={filtered ? undefined : <ButtonLink href="/admin/exams/new">Build the first assessment</ButtonLink>}
          />
        }
        columns={[
          {
            key: "title",
            header: "Assessment",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/exams/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.title}
                </Link>
                <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                  <Badge size="sm" tone="neutral">
                    {ASSESSMENT_KIND_LABELS[row.kind]}
                  </Badge>
                  {row.assembly !== "FIXED" && (
                    <Badge size="sm" tone="info">
                      {row.assembly === "BLUEPRINT" ? "Blueprint" : "Adaptive"}
                    </Badge>
                  )}
                  {row.draftOfId && (
                    <Badge size="sm" tone="info">
                      Edit (revision {row.revision})
                    </Badge>
                  )}
                  {row.aiGenerated && <AiDraftBadge />}
                  {row.isDemo && <DemoBadge />}
                </span>
              </span>
            ),
          },
          { key: "subject", header: "Subject", hideOnMobile: true, cell: (row) => <span className="text-sm">{row.subject} <span className="text-muted">· {row.board} {row.qualification}</span></span> },
          {
            key: "size",
            header: "Marks · time",
            hideOnMobile: true,
            cell: (row) => (
              <span className="text-sm whitespace-nowrap">
                {row.totalMarks} marks · {row.timeLimitMinutes ? `${row.timeLimitMinutes} min` : "untimed"}
                <span className="block text-xs text-muted">
                  {row.sectionCount} {row.sectionCount === 1 ? "section" : "sections"} · {row.accessTier.toLowerCase()}
                </span>
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="flex flex-col items-start gap-1">
                <ContentStatusBadge status={row.status} />
                {row.pendingDraft && (
                  <Link href={`/admin/exams/${row.pendingDraft.id}`} className="text-xs text-muted underline underline-offset-2">
                    Edit {CONTENT_STATUS_META[row.pendingDraft.status]?.label.toLowerCase() ?? ""}
                  </Link>
                )}
              </span>
            ),
          },
          { key: "updated", header: "Updated", hideOnMobile: true, cell: (row) => <Timestamp value={row.updatedAt} className="text-sm" /> },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/exams" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Assessment pages" />
    </Container>
  );
}
