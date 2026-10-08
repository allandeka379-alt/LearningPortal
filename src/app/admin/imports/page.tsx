import { Download, FileUp, Upload } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDateTime } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { ADMIN_HOME } from "@/components/admin/nav";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { IMPORT_ENTITY_LABELS, IMPORT_ENTITY_TYPES, IMPORT_FORMAT_LABELS, IMPORT_STATUS_META, IMPORT_STATUSES } from "@/server/cms/imports/constants";
import { importAccess, listImports } from "@/server/cms/imports/service";
import { ImportCounts, ImportStatusBadge } from "./_components/ImportBits";
import { TEMPLATE_LINKS, templateHref } from "./_components/links";

export const metadata = { title: "Imports" };

/**
 * /admin/imports — §25 bulk import: upload CSV / Excel / JSON files of questions, flashcards, lessons or topic
 * outlines, check them (dry run) and import the valid rows as DRAFT content. Templates are generated from the
 * importer's own schemas. Content editors and admins (`imports.run` + `content.draft`).
 */
export default async function ImportsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("imports.run", { minScope: "restricted", next: "/admin/imports" });
  const access = importAccess(actor);
  if (!access.content) redirect(ADMIN_HOME);
  const params = await searchParams;
  const filters = {
    status: enumParam(params, "status", IMPORT_STATUSES),
    entityType: enumParam(params, "type", IMPORT_ENTITY_TYPES),
    mine: firstParam(params, "mine") === "1",
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listImports(actor, f));
  const filtered = Boolean(filters.status || filters.entityType || filters.mine);

  return (
    <Container size="wide">
      <PageHeader
        title="Imports"
        description="Bring questions, flashcards, lessons and topic outlines in bulk from CSV, Excel or JSON. Every file is checked first; imported items arrive as drafts with copyright unverified, and go through review like everything else."
        actions={
          <ButtonLink href="/admin/imports/new" iconStart={<Upload aria-hidden="true" className="size-4" />}>
            New import
          </ButtonLink>
        }
      />

      <AdminSection title="Templates" description="Start from a template: the columns and example rows always match what the importer accepts. Examples are original sample content." className="mb-6">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {IMPORT_ENTITY_TYPES.filter((type) => type !== "TOPIC" || access.topics).map((type) => (
            <li key={type} className="rounded-card border border-border p-4">
              <p className="font-semibold text-text">{IMPORT_ENTITY_LABELS[type].plural}</p>
              <p className="mt-1 text-sm text-muted">{IMPORT_ENTITY_LABELS[type].hint}</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {TEMPLATE_LINKS.map((link) => (
                  <li key={link.file}>
                    <a href={templateHref(type, link.file)} download className="inline-flex min-h-11 items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline lg:min-h-0">
                      <Download aria-hidden="true" className="size-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </AdminSection>

      <FilterBar
        action="/admin/imports"
        filters={[
          { kind: "select", name: "status", label: "Status", options: IMPORT_STATUSES.map((value) => ({ value, label: IMPORT_STATUS_META[value].label })), value: filters.status },
          { kind: "select", name: "type", label: "Content", options: IMPORT_ENTITY_TYPES.map((value) => ({ value, label: IMPORT_ENTITY_LABELS[value].plural })), value: filters.entityType },
          { kind: "select", name: "mine", label: "Uploaded by", options: [{ value: "1", label: "Me" }], value: filters.mine ? "1" : undefined, placeholder: "Anyone" },
        ]}
      />
      <DataTable
        caption="Imports, newest first"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<FileUp aria-hidden="true" />}
            title={filtered ? "No imports match these filters" : "No imports yet"}
            description={filtered ? undefined : "Download a template, fill it in and upload it. Nothing is created until you have checked the report."}
            action={filtered ? undefined : <ButtonLink href="/admin/imports/new">New import</ButtonLink>}
          />
        }
        columns={[
          {
            key: "file",
            header: "File",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/imports/${row.id}`} className="font-semibold break-all text-text underline-offset-4 hover:underline">
                  {row.fileName ?? "Uploaded file"}
                </Link>
                <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                  <Badge size="sm" tone="neutral">
                    {IMPORT_ENTITY_LABELS[row.entityType].plural}
                  </Badge>
                  {IMPORT_FORMAT_LABELS[row.format]}
                </span>
              </span>
            ),
          },
          { key: "status", header: "Status", cell: (row) => <ImportStatusBadge status={row.status} /> },
          { key: "rows", header: "Rows", cell: (row) => <ImportCounts {...row} /> },
          {
            key: "scope",
            header: "Subject",
            hideOnMobile: true,
            cell: (row) => (
              <span className="block text-sm">
                {row.subject ?? "—"}
                {row.syllabus && <span className="block text-xs text-muted">{row.syllabus}</span>}
              </span>
            ),
          },
          {
            key: "by",
            header: "Uploaded",
            hideOnMobile: true,
            cell: (row) => (
              <span className="block text-sm">
                {formatDateTime(row.createdAt)}
                <span className="block text-xs text-muted">{row.createdByMe ? "You" : (row.createdBy ?? "Unknown")}</span>
              </span>
            ),
          },
        ]}
      />
      <CursorPagination className="mt-4 mb-12" path="/admin/imports" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Import pages" />
    </Container>
  );
}
