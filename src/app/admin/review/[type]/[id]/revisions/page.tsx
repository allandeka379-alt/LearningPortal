import { History } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDateTime } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { AiDraftBadge, ContentStatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { CONTENT_TYPE_LABELS, editorHref, reviewHref, revisionsHref, typeFromSegment } from "@/server/cms/review/labels";
import { listRevisions } from "@/server/cms/review/service";
import { orNotFound } from "../../../_lib/load";

export const metadata = { title: "Revision history" };

/** /admin/review/[type]/[id]/revisions — every published revision of an item (immutable snapshots, §26), newest first. */
export default async function RevisionHistoryPage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type: segment, id } = await params;
  const type = typeFromSegment(segment);
  if (!type) notFound();
  const actor = await requireAdminPage("content.draft", { next: revisionsHref(type, id) });
  const history = await orNotFound(listRevisions(actor, type, id));
  const labels = CONTENT_TYPE_LABELS[type];

  return (
    <Container size="wide">
      <PageHeader
        title="Revision history"
        eyebrow={`${labels.singular}: ${history.title}`}
        description="Each published revision is an immutable snapshot of what students saw. Attempts and flags keep pointing at the revision they were made on."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: labels.plural, href: type === "LESSON" ? "/admin/lessons" : type === "FLASHCARD" ? "/admin/flashcards" : "/admin/review" },
          { label: history.title.length > 40 ? `${history.title.slice(0, 39)}…` : history.title, href: type === "LESSON" || type === "FLASHCARD" ? editorHref(type, history.liveId) : reviewHref(type, history.liveId) },
          { label: "Revisions" },
        ]}
      />
      <p className="mb-4 flex items-center gap-2 text-sm text-muted">
        Current state: <ContentStatusBadge status={history.status} /> revision {history.currentRevision}
      </p>
      <DataTable
        caption="Published revisions"
        rows={history.revisions}
        rowKey={(row) => String(row.revision)}
        empty={<EmptyState icon={<History aria-hidden="true" />} title="Never published" description="Revisions appear here once the item is published." />}
        columns={[
          {
            key: "revision",
            header: "Revision",
            primary: true,
            cell: (row) => (
              <Link href={revisionsHref(type, history.liveId, row.revision)} className="font-semibold text-text underline-offset-4 hover:underline">
                Revision {row.revision}
              </Link>
            ),
          },
          { key: "published", header: "Published", cell: (row) => formatDateTime(row.createdAt) },
          { key: "note", header: "Change note", cell: (row) => row.changeNote ?? <span className="text-muted">—</span> },
          { key: "author", header: "Author", hideOnMobile: true, cell: (row) => row.author ?? "—" },
          { key: "approver", header: "Approved by", hideOnMobile: true, cell: (row) => row.approvedBy ?? "—" },
          { key: "ai", header: "Origin", hideOnMobile: true, cell: (row) => (row.aiGenerated ? <AiDraftBadge /> : "Human-written") },
        ]}
      />
      {history.truncated && <p className="mt-2 text-sm text-muted">Showing the latest 100 revisions.</p>}
      <div className="h-12" />
    </Container>
  );
}
