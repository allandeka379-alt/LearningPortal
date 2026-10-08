import { BookOpen, Flag, Plus } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDateTime, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { AiDraftBadge, ContentStatusBadge } from "@/components/admin/StatusBadge";
import { LESSON_KIND_OPTIONS } from "@/components/admin/editor/options";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { LESSON_KINDS } from "@/server/cms/lessons/core";
import { CONTENT_STATUSES } from "@/server/cms/lessons/schemas";
import { listLessons } from "@/server/cms/lessons/service";
import { staffAuthorOptions, subjectOptions, syllabusOptions, topicOptionsForSyllabus } from "@/server/cms/review/taxonomy";

export const metadata = { title: "Lessons" };

const STATUS_OPTIONS = CONTENT_STATUSES.map((value) => ({ value, label: humanizeEnum(value) }));

/** /admin/lessons — §25 lessons: search and filter (subject, syllabus, topic, status, kind, AI, author), cursor pages. */
export default async function AdminLessonsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/lessons" });
  const params = await searchParams;
  const subjectId = uuidParam(params, "subjectId");
  const syllabusId = uuidParam(params, "syllabusId");
  const filters = {
    q: firstParam(params, "q"),
    subjectId,
    syllabusId,
    topicId: uuidParam(params, "topicId"),
    status: enumParam(params, "status", CONTENT_STATUSES),
    kind: enumParam(params, "kind", LESSON_KINDS),
    ai: enumParam(params, "ai", ["yes", "no"] as const),
    authorId: uuidParam(params, "authorId"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, subjects, syllabi, topics, authors] = await Promise.all([
    loadFirstPageOnStaleCursor(filters, (f) => listLessons(actor, f)),
    subjectOptions(actor),
    subjectId ? syllabusOptions(actor, subjectId) : Promise.resolve([]),
    syllabusId ? topicOptionsForSyllabus(actor, syllabusId).then((t) => t.topics) : Promise.resolve([]),
    staffAuthorOptions(actor),
  ]);
  const filtered = Object.entries(filters).some(([key, value]) => key !== "cursor" && Boolean(value));

  return (
    <Container size="wide">
      <PageHeader
        title="Lessons"
        description="Lessons, revision notes, worked examples and public study guides. Published lessons are edited through a draft copy."
        actions={
          <ButtonLink href="/admin/lessons/new" iconStart={<Plus aria-hidden="true" />}>
            New lesson
          </ButtonLink>
        }
      />
      <FilterBar
        action="/admin/lessons"
        search={{ label: "Search", placeholder: "Title or slug", value: filters.q }}
        filters={[
          { kind: "select", name: "subjectId", label: "Subject", options: subjects, value: subjectId },
          ...(subjectId ? [{ kind: "select" as const, name: "syllabusId", label: "Syllabus version", options: syllabi, value: syllabusId }] : []),
          ...(syllabusId
            ? [{ kind: "select" as const, name: "topicId", label: "Topic", options: topics.map((t) => ({ value: t.id, label: `${"  ".repeat(t.depth)}${t.label}` })), value: filters.topicId }]
            : []),
          { kind: "select", name: "status", label: "Status", options: STATUS_OPTIONS, value: filters.status },
          { kind: "select", name: "kind", label: "Kind", options: LESSON_KIND_OPTIONS, value: filters.kind },
          { kind: "select", name: "ai", label: "AI-generated", options: [{ value: "yes", label: "AI-generated only" }, { value: "no", label: "Human-written only" }], value: filters.ai },
          { kind: "select", name: "authorId", label: "Author", options: authors, value: filters.authorId },
        ]}
      />
      {subjectId && !syllabusId && <p className="-mt-2 mb-4 text-sm text-muted">Choose a syllabus version and apply again to filter by topic.</p>}
      <DataTable
        caption="Lessons"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<BookOpen aria-hidden="true" />}
            title={filtered ? "No lessons match these filters" : "No lessons yet"}
            action={filtered ? undefined : <ButtonLink href="/admin/lessons/new">Write the first lesson</ButtonLink>}
          />
        }
        columns={[
          {
            key: "title",
            header: "Lesson",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/lessons/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.title}
                </Link>
                <span className="block truncate text-xs font-normal text-muted">
                  {humanizeEnum(row.kind)} · {row.slug}
                </span>
              </span>
            ),
          },
          {
            key: "where",
            header: "Subject · topic",
            hideOnMobile: true,
            cell: (row) => (
              <span className="block text-sm">
                {row.subject ?? "General"}
                <span className="block text-xs text-muted">{row.primaryTopic ?? "No primary topic"}</span>
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <span className="flex flex-wrap items-center gap-1">
                <ContentStatusBadge status={row.status} />
                {row.aiGenerated && <AiDraftBadge />}
                {row.pendingDraft && (
                  <Link href={`/admin/lessons/${row.pendingDraft.id}`} className="text-xs">
                    <Badge tone="info" appearance="outline" size="sm">
                      Edit {humanizeEnum(row.pendingDraft.status).toLowerCase()}
                    </Badge>
                  </Link>
                )}
              </span>
            ),
          },
          { key: "access", header: "Access", hideOnMobile: true, cell: (row) => humanizeEnum(row.accessTier) },
          { key: "author", header: "Author", hideOnMobile: true, cell: (row) => row.author ?? "—" },
          {
            key: "flags",
            header: "Flags",
            align: "end",
            hideOnMobile: true,
            cell: (row) =>
              row.openFlags > 0 ? (
                <span className="inline-flex items-center gap-1 font-medium text-warning-text">
                  <Flag aria-hidden="true" className="size-3.5" />
                  {row.openFlags}
                </span>
              ) : (
                <span className="text-muted">0</span>
              ),
          },
          { key: "updated", header: "Updated", hideOnMobile: true, cell: (row) => formatDateTime(row.updatedAt) },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/lessons" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Lesson pages" />
    </Container>
  );
}
