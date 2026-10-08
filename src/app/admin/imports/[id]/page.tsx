import { AlertTriangle, Download, FileWarning } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ActionForm } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { formatDateTime, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { ADMIN_HOME } from "@/components/admin/nav";
import { buildHref, enumParam, type PageSearchParams } from "@/components/admin/search-params";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { IMPORT_ENTITY_LABELS, IMPORT_FORMAT_LABELS, IMPORT_STATUS_META, isImportActive } from "@/server/cms/imports/constants";
import { getImportDetail, importAccess, type ImportDetail } from "@/server/cms/imports/service";
import { editorHref } from "@/server/cms/review/labels";
import { isAppError } from "@/server/lib/errors";
import { cancelImportAction, commitImportAction, revalidateImportAction } from "../actions";
import { AutoRefresh } from "../_components/AutoRefresh";
import { ImportCounts, ImportProgress, ImportStatusBadge, IssueLocation, issueSeverityBadge } from "../_components/ImportBits";

export const metadata = { title: "Import" };

const SHOWN_ISSUES = 200;

function fileSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${formatNumber(Math.max(1, Math.round(bytes / 1024)))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function createdListHref(detail: ImportDetail): string | null {
  const filters = { subjectId: detail.subjectId, ...(detail.syllabusId ? { syllabusId: detail.syllabusId } : {}), status: "DRAFT" };
  switch (detail.entityType) {
    case "QUESTION":
      return buildHref("/admin/questions", filters);
    case "FLASHCARD":
      return buildHref("/admin/flashcards", filters);
    case "LESSON":
      return buildHref("/admin/lessons", filters);
    case "TOPIC":
      return detail.syllabusId ? `/admin/syllabuses/${detail.syllabusId}/topics` : null;
  }
}

/**
 * /admin/imports/[id] — one import: status and live progress, the dry-run report (row, field, problem), duplicate
 * warnings, the columns that were read, the import-level licensing, and the drafts created. Import / check again /
 * cancel are confirmed actions.
 */
export default async function ImportDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("imports.run", { minScope: "restricted", next: "/admin/imports" });
  if (!importAccess(actor).content) redirect(ADMIN_HOME);
  const { id } = await params;
  const query = await searchParams;
  let detail: ImportDetail;
  try {
    detail = await getImportDetail(actor, id);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  const show = enumParam(query, "show", ["errors", "warnings"] as const);
  const issues = detail.issues.filter((issue) => !show || (show === "errors" ? issue.severity === "error" : issue.severity === "warning"));
  const errorCount = detail.issues.filter((i) => i.severity === "error").length;
  const warningCount = detail.issues.length - errorCount;
  const label = IMPORT_ENTITY_LABELS[detail.entityType];
  const active = isImportActive(detail.status);
  const completedTwin = detail.duplicates.find((d) => d.status === "COMPLETED");
  const listHref = createdListHref(detail);
  const fields: Record<string, string> = { id: detail.id };
  if (detail.failedRows > 0) fields.skipInvalid = "true";
  if (completedTwin) fields.confirmDuplicate = "true";

  return (
    <Container size="wide">
      <PageHeader
        title={detail.fileName ?? "Uploaded file"}
        eyebrow={`${label.plural} import · ${IMPORT_FORMAT_LABELS[detail.format]}`}
        breadcrumbs={[{ label: "Imports", href: "/admin/imports" }, { label: detail.fileName ?? "Import" }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <ImportStatusBadge status={detail.status} />
            <ImportCounts {...detail} />
          </span>
        }
      />
      <div className="space-y-6 pb-12">
        {active && (
          <div className="space-y-2 rounded-card border border-border bg-surface p-4">
            <ImportProgress status={detail.status} progress={detail.progress} validRows={detail.validRows} importedRows={detail.importedRows} />
            {detail.job && detail.job.attempts > 1 && <p className="text-sm text-muted">The background job is on attempt {detail.job.attempts}.</p>}
            {detail.status === "VALIDATING" && !detail.job && <p className="text-sm text-muted">Waiting for the background worker to pick this up.</p>}
            <AutoRefresh />
          </div>
        )}

        {detail.duplicates.length > 0 && (
          <Alert tone="warning" icon={<AlertTriangle aria-hidden="true" />} title="This exact file was uploaded before">
            <ul className="mt-1 space-y-0.5">
              {detail.duplicates.map((dup) => (
                <li key={dup.id}>
                  <Link href={`/admin/imports/${dup.id}`} className="font-medium underline underline-offset-2">
                    {formatDateTime(dup.createdAt)}
                  </Link>{" "}
                  by {dup.createdBy ?? "someone"}: {IMPORT_STATUS_META[dup.status].label.toLowerCase()}
                  {dup.importedRows > 0 && `, ${formatNumber(dup.importedRows)} rows imported`}.
                </li>
              ))}
            </ul>
            {completedTwin && <p className="mt-2">Importing it again creates duplicates of rows without an external reference. Rows with one are never imported twice.</p>}
          </Alert>
        )}

        {detail.status === "VALIDATED" && (
          <AdminSection title="Next step" description="Nothing has been created yet. Import the valid rows as drafts, fix the file and upload it again, or check it again after changing the curriculum.">
            <div className="flex flex-wrap items-start gap-3">
              {detail.actions.includes("commit") && (
                <ConfirmAction
                  action={commitImportAction}
                  fields={fields}
                  triggerLabel={`Import ${formatNumber(detail.validRows)} ${detail.validRows === 1 ? "row" : "rows"} as drafts`}
                  triggerVariant="primary"
                  triggerSize="md"
                  title={`Import ${formatNumber(detail.validRows)} ${label.plural.toLowerCase()} as drafts?`}
                  confirmLabel="Import as drafts"
                  pendingLabel="Importing…"
                >
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                    <li>
                      {formatNumber(detail.validRows)} {detail.entityType === "TOPIC" ? "topics are added to the draft syllabus version" : "items are created as DRAFT, copyright unverified, with this import's source and licence"}.
                    </li>
                    {detail.failedRows > 0 && <li className="text-danger-text">{formatNumber(detail.failedRows)} rows with errors are skipped.</li>}
                    {completedTwin && <li>This exact file was imported before; rows without an external reference will be created again.</li>}
                    {detail.totalRows > 200 && <li>Large files are imported in the background; progress shows on this page.</li>}
                    <li>Nothing reaches students until each item is reviewed, approved and published.</li>
                  </ul>
                </ConfirmAction>
              )}
              {detail.actions.includes("validate") && (
                <ActionForm action={revalidateImportAction} hiddenFields={{ id: detail.id }} submitLabel="Check again" submitVariant="outline" pendingLabel="Checking…" successAs="toast">
                  {null}
                </ActionForm>
              )}
            </div>
          </AdminSection>
        )}

        {detail.created.total > 0 && (
          <AdminSection
            title={detail.entityType === "TOPIC" ? "Topics created" : "Drafts created"}
            description={
              detail.entityType === "TOPIC"
                ? `${formatNumber(detail.created.total)} topics in the draft syllabus version.`
                : Object.entries(detail.created.byStatus)
                    .map(([status, count]) => `${formatNumber(count)} ${humanizeEnum(status).toLowerCase()}`)
                    .join(" · ")
            }
            action={
              listHref ? (
                <Link href={listHref} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                  {detail.entityType === "TOPIC" ? "Open the topic tree" : `Open ${label.plural.toLowerCase()}`}
                </Link>
              ) : undefined
            }
          >
            <ul className="divide-y divide-border">
              {detail.created.items.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                  {detail.entityType === "TOPIC" ? (
                    <span>{item.label}</span>
                  ) : (
                    <Link href={editorHref(detail.entityType, item.id)} className="min-w-0 break-words text-text underline-offset-4 hover:underline">
                      {item.label || "(no text)"}
                    </Link>
                  )}
                  {item.status && <StatusBadge kind="content" status={item.status} />}
                </li>
              ))}
            </ul>
            {detail.created.total > detail.created.items.length && <p className="mt-2 text-sm text-muted">Showing the first {detail.created.items.length}.</p>}
          </AdminSection>
        )}

        <AdminSection
          title="Check report"
          description={
            detail.issues.length === 0
              ? undefined
              : `${formatNumber(errorCount)} ${errorCount === 1 ? "error" : "errors"} and ${formatNumber(warningCount)} ${warningCount === 1 ? "warning" : "warnings"}. Rows with an error are not imported; warnings are advice.`
          }
          action={
            detail.issues.length > 0 ? (
              <a href={`/admin/imports/${detail.id}/report`} download className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline">
                <Download aria-hidden="true" className="size-4" />
                Download report (CSV)
              </a>
            ) : undefined
          }
          flush={detail.issues.length > 0}
        >
          {detail.status === "UPLOADED" || detail.status === "VALIDATING" ? (
            <p className="text-sm text-muted">The report appears here when the check has finished.</p>
          ) : detail.issues.length === 0 ? (
            <p className="text-sm text-muted">No problems found in {formatNumber(detail.totalRows)} rows.</p>
          ) : (
            <>
              <nav aria-label="Filter the report" className="flex flex-wrap gap-2 px-4 pb-3 text-sm sm:px-6">
                {[
                  { key: undefined, text: `All (${formatNumber(detail.issues.length)})` },
                  { key: "errors" as const, text: `Errors (${formatNumber(errorCount)})` },
                  { key: "warnings" as const, text: `Warnings (${formatNumber(warningCount)})` },
                ].map((tab) => (
                  <Link
                    key={tab.text}
                    href={buildHref(`/admin/imports/${detail.id}`, { show: tab.key })}
                    aria-current={show === tab.key ? "page" : undefined}
                    className="inline-flex min-h-11 items-center rounded-control px-3 font-medium text-muted hover:bg-subtle aria-[current=page]:bg-primary-soft aria-[current=page]:text-primary lg:min-h-9"
                  >
                    {tab.text}
                  </Link>
                ))}
              </nav>
              <DataTable
                caption="Problems found in the file, by row"
                className="rounded-none border-x-0 border-b-0"
                rows={issues.slice(0, SHOWN_ISSUES).map((issue, index) => ({ ...issue, key: `${index}` }))}
                rowKey={(row) => row.key}
                empty={<EmptyState title="Nothing to show for this filter" titleAs="p" appearance="plain" />}
                columns={[
                  { key: "where", header: "Where", primary: true, cell: (row) => <IssueLocation format={detail.format} row={row.row} /> },
                  { key: "field", header: "Field", cell: (row) => (row.field ? <code className="text-xs break-all">{row.field}</code> : <span className="text-muted">—</span>) },
                  {
                    key: "problem",
                    header: "Problem",
                    cell: (row) => (
                      <span className="flex min-w-0 items-start gap-2">
                        {issueSeverityBadge(row)}
                        <span className="min-w-0 break-words">{row.message}</span>
                      </span>
                    ),
                  },
                ]}
              />
              {(issues.length > SHOWN_ISSUES || detail.issuesTruncated) && (
                <p className="px-4 py-3 text-sm text-muted sm:px-6">
                  Showing {formatNumber(Math.min(SHOWN_ISSUES, issues.length))} problems.{" "}
                  {detail.issuesTruncated ? "The report keeps the first 1,000; the counts above are exact." : "Download the report for the full list."}
                </p>
              )}
            </>
          )}
        </AdminSection>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminSection title="Details">
            <KeyValueList
              items={[
                { label: "Content", value: label.plural },
                { label: "File", value: `${detail.fileName ?? "Uploaded file"} (${fileSize(detail.fileBytes)})` },
                { label: "Subject", value: detail.subject },
                { label: "Syllabus version", value: detail.syllabus ? `${detail.syllabus}${detail.syllabusStatus === "DRAFT" ? " (draft)" : ""}` : null },
                { label: "Uploaded", value: `${formatDateTime(detail.createdAt)} by ${detail.createdByMe ? "you" : (detail.createdBy ?? "someone")}` },
                { label: "Import started", value: detail.startedAt ? formatDateTime(detail.startedAt) : null, hideWhenEmpty: true },
                { label: "Finished", value: detail.completedAt ? formatDateTime(detail.completedAt) : null, hideWhenEmpty: true },
                { label: "Default difficulty", value: detail.entityType === "QUESTION" ? String(detail.options?.defaults.difficulty ?? "") : null, hideWhenEmpty: true },
                { label: "Default access", value: detail.entityType === "TOPIC" ? null : humanizeEnum(detail.options?.defaults.accessTier), hideWhenEmpty: true },
              ]}
            />
          </AdminSection>
          <AdminSection title="Source and licence" description="Recorded on every imported item; copyright is cleared per item at review.">
            <KeyValueList
              items={[
                { label: "Content source", value: detail.source?.name ?? null },
                { label: "Licence code", value: detail.options?.provenance.licenceCode ?? null },
                { label: "Author", value: detail.options?.provenance.author ?? null },
                { label: "Attribution", value: detail.options?.provenance.attribution ?? null },
                { label: "Source link", value: detail.options?.provenance.sourceUrl ?? null, hideWhenEmpty: true },
                { label: "Copyright on items", value: <Badge size="sm" tone="warning">Unverified until reviewed</Badge> },
              ]}
            />
          </AdminSection>
        </div>

        {detail.options && Object.keys(detail.options.columnMap).length > 0 && (
          <AdminSection title="Columns read" description="How the file's header row was understood. Ignored columns are not imported.">
            <ul className="flex flex-wrap gap-2">
              {Object.entries(detail.options.columnMap).map(([header, column]) => (
                <li key={header}>
                  <Badge size="sm" tone={column ? "neutral" : "warning"} appearance={column ? "soft" : "outline"} icon={column ? undefined : <FileWarning aria-hidden="true" />}>
                    {header}
                    {column ? (column === header ? "" : ` → ${column}`) : " (ignored)"}
                  </Badge>
                </li>
              ))}
            </ul>
          </AdminSection>
        )}

        {detail.actions.includes("cancel") && (
          <div className="flex justify-end">
            <ConfirmAction
              action={cancelImportAction}
              fields={{ id: detail.id }}
              triggerLabel="Cancel import"
              triggerVariant="ghost"
              tone="danger"
              title="Cancel this import?"
              description={detail.status === "IMPORTING" ? "The import stops after the rows it is writing now. Rows already imported stay as drafts." : "The file is kept for the record, but nothing more happens with it."}
              confirmLabel="Cancel import"
              pendingLabel="Cancelling…"
            />
          </div>
        )}
      </div>
    </Container>
  );
}
