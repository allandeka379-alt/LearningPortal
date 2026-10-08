import { FileQuestion, Flag, Plus } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { DIFFICULTY_LABELS, QUESTION_TYPE_LABELS, SKILL_LABELS } from "@/components/admin/questions/labels";
import { currentParams, enumParam, firstParam, hrefWith, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { AiDraftBadge, CONTENT_STATUS_META, ContentStatusBadge, DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { CognitiveSkill, ContentStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { QUESTION_TYPES } from "@/lib/questions/constants";
import { getCurriculumOptions, getSyllabusOptions, getTopicOptions } from "@/server/cms/questions/lookups";
import { listQuestions } from "@/server/cms/questions/service";

export const metadata = { title: "Questions" };

const STATUSES = Object.values(ContentStatus);
const FILTER_KEYS = ["q", "boardId", "qualificationId", "subjectId", "syllabusId", "topicId", "type", "difficulty", "marks", "status", "year", "paper", "skill", "ai", "flagged"];

/** /admin/questions — the platform question bank (§9, §42) with curriculum and metadata filters and status counts. */
export default async function AdminQuestionsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/questions" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    boardId: uuidParam(params, "boardId"),
    qualificationId: uuidParam(params, "qualificationId"),
    subjectId: uuidParam(params, "subjectId"),
    syllabusId: uuidParam(params, "syllabusId"),
    topicId: uuidParam(params, "topicId"),
    type: enumParam(params, "type", QUESTION_TYPES),
    difficulty: enumParam(params, "difficulty", ["1", "2", "3", "4", "5"]),
    marks: firstParam(params, "marks")?.match(/^\d{1,4}$/)?.[0],
    status: enumParam(params, "status", STATUSES),
    year: firstParam(params, "year")?.match(/^\d{4}$/)?.[0],
    paper: firstParam(params, "paper"),
    skill: enumParam(params, "skill", Object.values(CognitiveSkill)),
    ai: enumParam(params, "ai", ["yes", "no"] as const),
    flagged: enumParam(params, "flagged", ["yes", "no"] as const),
    cursor: firstParam(params, "cursor"),
  };
  const [page, curriculum, syllabi, topics] = await Promise.all([
    loadFirstPageOnStaleCursor(filters, (f) => listQuestions(actor, f)),
    getCurriculumOptions(actor),
    filters.subjectId ? getSyllabusOptions([filters.subjectId]) : Promise.resolve([]),
    filters.syllabusId ? getTopicOptions([filters.syllabusId]) : Promise.resolve([]),
  ]);
  const filtered = FILTER_KEYS.some((key) => key !== "status" && firstParam(params, key) !== undefined);
  const qualifications = curriculum.qualifications.filter((q) => !filters.boardId || q.boardId === filters.boardId);
  const subjects = curriculum.subjects.filter((s) => (!filters.boardId || s.boardId === filters.boardId) && (!filters.qualificationId || s.qualificationId === filters.qualificationId));
  const statusTotal = Object.values(page.facets.status).reduce((sum, n) => sum + (n ?? 0), 0);
  const keep = currentParams(params, FILTER_KEYS);

  return (
    <Container size="wide">
      <PageHeader
        title="Questions"
        description="The platform question bank. Drafts go through review before students see them; published questions are edited through a draft copy."
        actions={
          <ButtonLink href={hrefWith("/admin/questions/new", undefined, { subject: filters.subjectId })} iconStart={<Plus aria-hidden="true" />}>
            New question
          </ButtonLink>
        }
      />
      <nav aria-label="Filter by status" className="mb-4 flex flex-wrap gap-2">
        <StatusLink href={hrefWith("/admin/questions", params, { status: null, cursor: null }, FILTER_KEYS)} active={!filters.status} label="All" count={statusTotal} />
        {STATUSES.map((status) => (
          <StatusLink
            key={status}
            href={hrefWith("/admin/questions", params, { status, cursor: null }, FILTER_KEYS)}
            active={filters.status === status}
            label={CONTENT_STATUS_META[status]?.label ?? status}
            count={page.facets.status[status] ?? 0}
          />
        ))}
      </nav>
      <FilterBar
        action="/admin/questions"
        label="Question filters"
        keep={{ status: keep.status }}
        search={{ label: "Search question text", placeholder: "Words from the question, or an id", value: filters.q }}
        filters={[
          { kind: "select", name: "boardId", label: "Board", options: curriculum.boards, value: filters.boardId },
          { kind: "select", name: "qualificationId", label: "Qualification", options: qualifications, value: filters.qualificationId },
          { kind: "select", name: "subjectId", label: "Subject", options: subjects, value: filters.subjectId },
          ...(filters.subjectId ? [{ kind: "select" as const, name: "syllabusId", label: "Syllabus version", options: syllabi, value: filters.syllabusId }] : []),
          ...(filters.syllabusId ? [{ kind: "select" as const, name: "topicId", label: "Topic (and subtopics)", options: topics, value: filters.topicId }] : []),
          {
            kind: "select",
            name: "type",
            label: "Type",
            options: QUESTION_TYPES.map((type) => ({ value: type, label: `${QUESTION_TYPE_LABELS[type]} (${formatNumber(page.facets.type[type] ?? 0)})` })),
            value: filters.type,
          },
          { kind: "select", name: "difficulty", label: "Difficulty", options: [1, 2, 3, 4, 5].map((d) => ({ value: String(d), label: DIFFICULTY_LABELS[d] ?? String(d) })), value: filters.difficulty },
          { kind: "text", name: "marks", label: "Marks", placeholder: "e.g. 2", value: filters.marks },
          { kind: "text", name: "year", label: "Year", placeholder: "e.g. 2026", value: filters.year },
          { kind: "text", name: "paper", label: "Paper", placeholder: "e.g. Paper 2", value: filters.paper },
          { kind: "select", name: "skill", label: "Skill tested", options: Object.values(CognitiveSkill).map((s) => ({ value: s, label: SKILL_LABELS[s] })), value: filters.skill },
          { kind: "select", name: "ai", label: "AI-generated", options: [{ value: "yes", label: "AI-generated" }, { value: "no", label: "Written by staff" }], value: filters.ai },
          { kind: "select", name: "flagged", label: "Open flags", options: [{ value: "yes", label: "Flagged" }, { value: "no", label: "Not flagged" }], value: filters.flagged },
        ]}
      />
      <DataTable
        caption="Questions"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<FileQuestion aria-hidden="true" />}
            title={filtered || filters.status ? "No questions match these filters" : "No questions yet"}
            description={filtered || filters.status ? undefined : "Write the first original question for a subject."}
            action={filtered || filters.status ? undefined : <ButtonLink href="/admin/questions/new">New question</ButtonLink>}
          />
        }
        columns={[
          {
            key: "question",
            header: "Question",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/questions/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.excerpt}
                </Link>
                <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-normal text-muted">
                  <Badge size="sm" tone="neutral">
                    {QUESTION_TYPE_LABELS[row.type]}
                  </Badge>
                  {row.draftOfId && (
                    <Badge size="sm" tone="info">
                      Edit (revision {row.revision})
                    </Badge>
                  )}
                  {row.aiGenerated && <AiDraftBadge />}
                  {row.isDemo && <DemoBadge />}
                  {row.author && <span>by {row.author}</span>}
                </span>
              </span>
            ),
          },
          {
            key: "curriculum",
            header: "Curriculum",
            hideOnMobile: true,
            cell: (row) => (
              <span className="block text-sm">
                {row.subject} <span className="text-muted">· {row.board} {row.qualification}</span>
                <span className="block text-xs text-muted">{row.primaryTopic ?? "No topic yet"}</span>
              </span>
            ),
          },
          {
            key: "meta",
            header: "Difficulty · marks",
            hideOnMobile: true,
            cell: (row) => (
              <span className="text-sm whitespace-nowrap">
                {row.difficulty} · {row.marks} {row.marks === 1 ? "mark" : "marks"}
                {(row.year || row.paperLabel) && <span className="block text-xs text-muted">{[row.paperLabel, row.year].filter(Boolean).join(" · ")}</span>}
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
                  <Link href={`/admin/questions/${row.pendingDraft.id}`} className="text-xs text-muted underline underline-offset-2">
                    Edit {CONTENT_STATUS_META[row.pendingDraft.status]?.label.toLowerCase() ?? ""}
                  </Link>
                )}
              </span>
            ),
          },
          {
            key: "flags",
            header: "Flags",
            align: "end",
            cell: (row) =>
              row.openFlags > 0 ? (
                <Badge size="sm" tone="warning" icon={<Flag aria-hidden="true" />}>
                  {row.openFlags}
                </Badge>
              ) : (
                <span className="text-muted">—</span>
              ),
          },
          { key: "updated", header: "Updated", hideOnMobile: true, cell: (row) => <Timestamp value={row.updatedAt} className="text-sm" /> },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/questions" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Question pages" />
    </Container>
  );
}

function StatusLink({ href, active, label, count }: { href: string; active: boolean; label: string; count: number }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-sm",
        active ? "border-primary bg-primary-soft font-semibold text-on-primary-soft" : "border-border text-text hover:bg-subtle",
      )}
    >
      {label}
      <span className="tabular-nums text-muted">{formatNumber(count)}</span>
    </Link>
  );
}
