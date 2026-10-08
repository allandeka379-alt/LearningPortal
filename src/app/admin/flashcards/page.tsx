import { Flag, Layers, Plus } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDateTime, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { AiDraftBadge, ContentStatusBadge } from "@/components/admin/StatusBadge";
import { CARD_TYPE_OPTIONS, optionLabel } from "@/components/admin/editor/options";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { FLASHCARD_TYPES } from "@/server/cms/flashcards/schemas";
import { listFlashcards } from "@/server/cms/flashcards/service";
import { CONTENT_STATUSES } from "@/server/cms/lessons/schemas";
import { staffAuthorOptions, subjectOptions, syllabusOptions, topicOptionsForSyllabus } from "@/server/cms/review/taxonomy";

export const metadata = { title: "Flashcards" };

const STATUS_OPTIONS = CONTENT_STATUSES.map((value) => ({ value, label: humanizeEnum(value) }));

/** /admin/flashcards — §18 / §25 platform flashcards: filters (subject, syllabus, topic, status, type, AI, author). */
export default async function AdminFlashcardsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/flashcards" });
  const params = await searchParams;
  const subjectId = uuidParam(params, "subjectId");
  const syllabusId = uuidParam(params, "syllabusId");
  const filters = {
    q: firstParam(params, "q"),
    subjectId,
    syllabusId,
    topicId: uuidParam(params, "topicId"),
    status: enumParam(params, "status", CONTENT_STATUSES),
    cardType: enumParam(params, "cardType", FLASHCARD_TYPES),
    ai: enumParam(params, "ai", ["yes", "no"] as const),
    authorId: uuidParam(params, "authorId"),
    cursor: firstParam(params, "cursor"),
  };
  const [page, subjects, syllabi, topics, authors] = await Promise.all([
    loadFirstPageOnStaleCursor(filters, (f) => listFlashcards(actor, f)),
    subjectOptions(actor),
    subjectId ? syllabusOptions(actor, subjectId) : Promise.resolve([]),
    syllabusId ? topicOptionsForSyllabus(actor, syllabusId).then((t) => t.topics) : Promise.resolve([]),
    staffAuthorOptions(actor),
  ]);
  const filtered = Object.entries(filters).some(([key, value]) => key !== "cursor" && Boolean(value));

  return (
    <Container size="wide">
      <PageHeader
        title="Flashcards"
        description="Platform flashcards: definitions, formulas, vocabulary, key concepts, dates and facts. Students' personal cards are private and never listed here."
        actions={
          <>
            <ButtonLink href="/admin/flashcards/bulk" variant="outline" iconStart={<Layers aria-hidden="true" />}>
              Bulk add
            </ButtonLink>
            <ButtonLink href="/admin/flashcards/new" iconStart={<Plus aria-hidden="true" />}>
              New card
            </ButtonLink>
          </>
        }
      />
      <FilterBar
        action="/admin/flashcards"
        search={{ label: "Search", placeholder: "Words on the front or back", value: filters.q }}
        filters={[
          { kind: "select", name: "subjectId", label: "Subject", options: subjects, value: subjectId },
          ...(subjectId ? [{ kind: "select" as const, name: "syllabusId", label: "Syllabus version", options: syllabi, value: syllabusId }] : []),
          ...(syllabusId
            ? [{ kind: "select" as const, name: "topicId", label: "Topic", options: topics.map((t) => ({ value: t.id, label: `${"  ".repeat(t.depth)}${t.label}` })), value: filters.topicId }]
            : []),
          { kind: "select", name: "status", label: "Status", options: STATUS_OPTIONS, value: filters.status },
          { kind: "select", name: "cardType", label: "Card type", options: CARD_TYPE_OPTIONS, value: filters.cardType },
          { kind: "select", name: "ai", label: "AI-generated", options: [{ value: "yes", label: "AI-generated only" }, { value: "no", label: "Human-written only" }], value: filters.ai },
          { kind: "select", name: "authorId", label: "Author", options: authors, value: filters.authorId },
        ]}
      />
      <DataTable
        caption="Flashcards"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<Layers aria-hidden="true" />}
            title={filtered ? "No flashcards match these filters" : "No flashcards yet"}
            action={filtered ? undefined : <ButtonLink href="/admin/flashcards/new">Create the first card</ButtonLink>}
          />
        }
        columns={[
          {
            key: "card",
            header: "Card",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/flashcards/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.front}
                </Link>
                <span className="block truncate text-xs font-normal text-muted">{row.back}</span>
              </span>
            ),
          },
          { key: "type", header: "Type", hideOnMobile: true, cell: (row) => optionLabel(CARD_TYPE_OPTIONS, row.cardType) },
          {
            key: "where",
            header: "Subject · deck",
            hideOnMobile: true,
            cell: (row) => (
              <span className="block text-sm">
                {row.subject}
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
                  <Link href={`/admin/flashcards/${row.pendingDraft.id}`}>
                    <Badge tone="info" appearance="outline" size="sm">
                      Edit {humanizeEnum(row.pendingDraft.status).toLowerCase()}
                    </Badge>
                  </Link>
                )}
              </span>
            ),
          },
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
      <CursorPagination className="mt-4" path="/admin/flashcards" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Flashcard pages" />
    </Container>
  );
}
