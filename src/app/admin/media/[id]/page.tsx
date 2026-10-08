import { Trash2 } from "lucide-react";
import Link from "next/link";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { formatDateTime, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { ContentStatusBadge } from "@/components/admin/StatusBadge";
import { CopySnippetButton } from "@/components/admin/editor/CopySnippetButton";
import { MediaMetadataForm } from "@/components/admin/editor/MediaForms";
import { MediaThumb } from "@/components/admin/editor/MediaThumb";
import { optionLabel, PURPOSE_OPTIONS } from "@/components/admin/editor/options";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { getMediaDetail } from "@/server/cms/media/service";
import { contentSourceOptions } from "@/server/cms/review/taxonomy";
import { orNotFound } from "../../review/_lib/load";
import { deleteMediaAction, updateMediaAction } from "../actions";

export const metadata = { title: "Media file" };

/** /admin/media/[id] — one image: preview, snippet, metadata and licensing edit, where it is used, delete when unused. */
export default async function MediaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/media/${id}` });
  const media = await orNotFound(getMediaDetail(actor, id));
  const sources = await contentSourceOptions(actor, [media.sourceId]);
  const title = media.altText ?? media.originalFilename ?? "Image";

  return (
    <Container size="wide">
      <PageHeader
        title={title.length > 90 ? `${title.slice(0, 89)}…` : title}
        eyebrow={optionLabel(PURPOSE_OPTIONS, media.purpose)}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Media library", href: "/admin/media" },
          { label: "File" },
        ]}
        actions={
          <ConfirmAction
            action={deleteMediaAction}
            fields={{ id: media.id }}
            triggerLabel="Delete"
            triggerIcon={<Trash2 aria-hidden="true" />}
            tone="danger"
            disabled={!media.deletable}
            disabledReason="Files in use can't be deleted. Remove them from the content listed below first."
            title="Delete this file?"
            description="It disappears from the library and can no longer be inserted. Content never references a deleted file."
            confirmLabel="Delete file"
            successMessage="File deleted."
          />
        }
      />
      <div className="grid gap-6 pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <AdminSection title="Preview">
            <div className="space-y-4">
              <div className="flex max-h-96 items-center justify-center overflow-hidden rounded-control border border-border bg-subtle p-2">
                <MediaThumb src={media.src} alt={media.altText ?? ""} width={media.width} height={media.height} className="max-h-92" />
              </div>
              <CopySnippetButton snippet={media.snippet} label="Paste this into the editor" />
              <KeyValueList
                items={[
                  { label: "Type", value: media.mimeType },
                  { label: "Size", value: `${Math.max(1, Math.round(media.byteSize / 1024))} KB` },
                  { label: "Dimensions", value: media.width && media.height ? `${media.width} × ${media.height} px` : null },
                  { label: "Original file name", value: media.originalFilename },
                  { label: "Uploaded", value: `${formatDateTime(media.createdAt)}${media.uploadedBy ? ` by ${media.uploadedBy}` : ""}` },
                  { label: "Checksum (SHA-256)", value: <code className="font-mono text-xs break-all">{media.checksumSha256}</code> },
                ]}
              />
            </div>
          </AdminSection>
          <AdminSection
            title="Where it is used"
            description={media.usages.length === 0 && media.otherReferences === 0 ? "Not used yet." : undefined}
            flush={media.usages.length > 0}
          >
            {media.usages.length > 0 ? (
              <ul className="divide-y divide-border">
                {media.usages.map((usage) => (
                  <li key={`${usage.entityType}-${usage.entityId}-${usage.field}`} className="flex flex-wrap items-center gap-2 px-4 py-3 text-sm sm:px-6">
                    <Badge size="sm" tone="neutral">
                      {humanizeEnum(usage.entityType)}
                    </Badge>
                    {usage.href ? (
                      <Link href={usage.href} className="min-w-0 flex-1 font-medium text-text underline-offset-4 hover:underline">
                        {usage.title}
                      </Link>
                    ) : (
                      <span className="min-w-0 flex-1 text-muted">{usage.title}</span>
                    )}
                    <span className="text-xs text-muted">field: {usage.field || "—"}</span>
                    {usage.status && <ContentStatusBadge status={usage.status} />}
                    {usage.isDraftCopy && (
                      <Badge size="sm" tone="info" appearance="outline">
                        Draft copy
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              media.otherReferences === 0 && <p className="text-sm text-muted">No lesson, question, flashcard or test references this file.</p>
            )}
            {media.otherReferences > 0 && (
              <p className="px-4 pt-2 pb-4 text-sm text-muted sm:px-6">
                Also used {media.otherReferences} time{media.otherReferences === 1 ? "" : "s"} as an answer-option image, study-pack cover, board logo or testimonial photo.
              </p>
            )}
          </AdminSection>
        </div>
        <AdminSection title="Description and licensing" description="Alt text is required (§43). Public files must have cleared copyright (§27).">
          <MediaMetadataForm
            action={updateMediaAction}
            id={media.id}
            sources={sources}
            values={{
              altText: media.altText,
              caption: media.caption,
              longDescription: media.longDescription,
              visibility: media.visibility,
              copyrightStatus: media.copyrightStatus,
              sourceId: media.sourceId,
              licenceCode: media.licenceCode,
              attribution: media.attribution,
              author: media.author,
              sourceUrl: media.sourceUrl,
            }}
          />
        </AdminSection>
      </div>
    </Container>
  );
}
