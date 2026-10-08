import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminSection, JsonPreview, KeyValueList } from "@/components/admin/DetailParts";
import { formatDateTime } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { AiDraftBadge } from "@/components/admin/StatusBadge";
import { DiffView } from "@/components/admin/editor/DiffView";
import { PreviewSections } from "@/components/admin/editor/PreviewSections";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CONTENT_TYPE_LABELS, revisionsHref, typeFromSegment } from "@/server/cms/review/labels";
import { getRevision } from "@/server/cms/review/service";
import { orNotFound } from "../../../../_lib/load";

export const metadata = { title: "Revision" };

/** /admin/review/[type]/[id]/revisions/[revision] — one immutable snapshot rendered as students saw it (read-only). */
export default async function RevisionPage({ params }: { params: Promise<{ type: string; id: string; revision: string }> }) {
  const { type: segment, id, revision: revisionParam } = await params;
  const type = typeFromSegment(segment);
  const revision = Number(revisionParam);
  if (!type || !Number.isInteger(revision) || revision < 1) notFound();
  const actor = await requireAdminPage("content.draft", { next: revisionsHref(type, id, revision) });
  const view = await orNotFound(getRevision(actor, type, id, revision));
  const labels = CONTENT_TYPE_LABELS[type];

  return (
    <Container size="wide">
      <PageHeader
        title={`Revision ${view.revision}`}
        eyebrow={`${labels.singular}: ${view.title}`}
        description="Read-only: published revisions never change."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Revisions", href: revisionsHref(type, view.liveId) },
          { label: `Revision ${view.revision}` },
        ]}
      />
      <div className="space-y-6 pb-12">
        <AdminSection title="About this revision">
          <KeyValueList
            items={[
              { label: "Published", value: formatDateTime(view.createdAt) },
              { label: "Change note", value: view.changeNote },
              { label: "Author", value: view.author },
              { label: "Approved by", value: view.approvedBy },
              { label: "Origin", value: view.aiGenerated ? <AiDraftBadge /> : "Human-written" },
              { label: "Content hash", value: <code className="font-mono text-xs break-all">{view.contentHash}</code> },
            ]}
          />
          {view.previousRevision && (
            <p className="mt-4 text-sm">
              <Link href={revisionsHref(type, view.liveId, view.previousRevision)} className="font-medium text-primary underline underline-offset-2">
                View revision {view.previousRevision}
              </Link>
            </p>
          )}
        </AdminSection>
        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection
            title={view.previousRevision ? `Changes since revision ${view.previousRevision}` : "Changes"}
            description={view.diff === null ? "First published revision." : undefined}
          >
            {view.diff !== null && <DiffView entries={view.diff} />}
          </AdminSection>
          <AdminSection title="As students saw it">
            <PreviewSections sections={view.preview} />
          </AdminSection>
        </div>
        <details className="rounded-card border border-border bg-surface p-4">
          <summary className="cursor-pointer text-sm font-semibold text-text">Raw snapshot (JSON)</summary>
          <JsonPreview value={view.snapshot} label="Snapshot" className="mt-3" />
        </details>
      </div>
    </Container>
  );
}
