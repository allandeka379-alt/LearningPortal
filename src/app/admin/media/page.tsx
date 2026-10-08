import { ImageOff, Upload } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { CopySnippetButton } from "@/components/admin/editor/CopySnippetButton";
import { MediaUploadForm } from "@/components/admin/editor/MediaForms";
import { MediaThumb } from "@/components/admin/editor/MediaThumb";
import { COPYRIGHT_OPTIONS, optionLabel, PURPOSE_OPTIONS } from "@/components/admin/editor/options";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LIBRARY_PURPOSES } from "@/server/cms/media/schemas";
import { listMedia } from "@/server/cms/media/service";
import { contentSourceOptions } from "@/server/cms/review/taxonomy";

export const metadata = { title: "Media library" };

function size(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** /admin/media — content images and diagrams: upload (alt text + licensing), search, usage counts, copy snippet. */
export default async function MediaLibraryPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/media" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    purpose: enumParam(params, "purpose", LIBRARY_PURPOSES),
    usage: enumParam(params, "usage", ["used", "unused"] as const),
    cursor: firstParam(params, "cursor"),
  };
  const [page, sources] = await Promise.all([loadFirstPageOnStaleCursor(filters, (f) => listMedia(actor, f)), contentSourceOptions(actor)]);
  const filtered = Boolean(filters.q || filters.purpose || filters.usage);

  return (
    <Container size="wide">
      <PageHeader
        title="Media library"
        description={
          <>
            Images and diagrams for lessons, questions and flashcards. Copy an image&apos;s snippet and paste it into the editor, e.g.{" "}
            <code className="rounded-sm bg-subtle px-1 font-mono text-sm">![description](asset:…)</code>.
          </>
        }
      />
      <details className="group mb-6 rounded-card border border-border bg-surface" open={page.items.length === 0 && !filtered}>
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
          <Upload aria-hidden="true" className="size-4.5" />
          Upload an image
          <span className="ml-auto text-sm font-normal text-muted group-open:hidden">Show form</span>
        </summary>
        <div className="border-t border-border p-4 sm:p-5">
          <MediaUploadForm sources={sources} />
        </div>
      </details>

      <FilterBar
        action="/admin/media"
        search={{ label: "Search", placeholder: "Description, caption or file name", value: filters.q }}
        filters={[
          { kind: "select", name: "purpose", label: "Kind", options: PURPOSE_OPTIONS, value: filters.purpose },
          { kind: "select", name: "usage", label: "Usage", options: [{ value: "used", label: "Used in content" }, { value: "unused", label: "Not used yet" }], value: filters.usage },
        ]}
      />

      {page.items.length === 0 ? (
        <EmptyState icon={<ImageOff aria-hidden="true" />} title={filtered ? "No images match these filters" : "No images uploaded yet"} description={filtered ? undefined : "Upload original or licensed images with a description for screen-reader users."} />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {page.items.map((item) => (
            <li key={item.id} className="flex flex-col overflow-hidden rounded-card border border-border bg-surface">
              <Link href={`/admin/media/${item.id}`} className="flex h-40 items-center justify-center bg-subtle p-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus" aria-label={`Open details: ${item.altText ?? "image"}`}>
                <MediaThumb src={item.src} alt="" width={item.width} height={item.height} />
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <p className="line-clamp-2 text-sm font-medium text-text">
                  <Link href={`/admin/media/${item.id}`} className="underline-offset-4 hover:underline">
                    {item.altText ?? "No description"}
                  </Link>
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge size="sm" tone="neutral">
                    {optionLabel(PURPOSE_OPTIONS, item.purpose).split(" (")[0]}
                  </Badge>
                  {item.visibility === "PUBLIC" && (
                    <Badge size="sm" tone="info" appearance="outline">
                      Public
                    </Badge>
                  )}
                  {item.copyrightStatus === "UNVERIFIED" ? (
                    <Badge size="sm" tone="warning">
                      Copyright not cleared
                    </Badge>
                  ) : (
                    <Badge size="sm" tone="neutral" appearance="outline">
                      {optionLabel(COPYRIGHT_OPTIONS, item.copyrightStatus).split(" (")[0]}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted">
                  {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
                  {size(item.byteSize)} · {item.usageCount === 0 ? "not used" : `used in ${item.usageCount} place${item.usageCount === 1 ? "" : "s"}`} · {formatDate(item.createdAt)}
                </p>
                <div className="mt-auto">
                  <CopySnippetButton snippet={item.snippet} compact label={`Snippet for ${item.altText ?? "image"}`} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <CursorPagination className="mt-4 mb-12" path="/admin/media" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Media pages" />
    </Container>
  );
}
