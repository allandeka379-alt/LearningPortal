import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatNumber } from "@/lib/format";
import { IMPORT_STATUS_META, issueLocation, type ImportFormat, type ImportIssue, type ImportStatus } from "@/server/cms/imports/constants";
import type { ImportOptions } from "@/server/cms/imports/service";

/** Small presentational pieces of the import pages (server components). The text always carries the meaning. */

export function ImportStatusBadge({ status }: { status: ImportStatus }) {
  const meta = IMPORT_STATUS_META[status];
  return (
    <Badge size="sm" tone={meta.tone} appearance={meta.outline ? "outline" : "soft"}>
      {meta.label}
    </Badge>
  );
}

/** Real progress of the background job (rows checked or written so far); nothing is shown when there is none. */
export function ImportProgress({ status, progress, validRows, importedRows }: { status: ImportStatus; progress: ImportOptions["progress"]; validRows: number; importedRows: number }) {
  if (status === "VALIDATING") {
    const total = progress?.total ?? 0;
    const processed = progress?.phase === "validate" ? progress.processed : 0;
    return (
      <ProgressBar
        label="Checking rows"
        value={total > 0 ? processed : null}
        max={Math.max(1, total)}
        valueText={total > 0 ? `${formatNumber(processed)} of ${formatNumber(total)} rows checked` : undefined}
      />
    );
  }
  if (status === "IMPORTING") {
    const total = progress?.phase === "commit" ? progress.total : validRows;
    return (
      <ProgressBar
        label="Importing as drafts"
        value={importedRows}
        max={Math.max(1, total)}
        tone="primary"
        valueText={`${formatNumber(importedRows)} of ${formatNumber(total)} rows imported`}
      />
    );
  }
  return null;
}

/** Counts line, e.g. "120 rows · 118 valid · 2 with errors · 118 imported". */
export function ImportCounts({ totalRows, validRows, failedRows, importedRows, status }: { totalRows: number; validRows: number; failedRows: number; importedRows: number; status: ImportStatus }) {
  if (status === "UPLOADED" || status === "VALIDATING") return <span className="text-muted">Not checked yet</span>;
  return (
    <span className="tabular-nums">
      {formatNumber(totalRows)} rows · {formatNumber(validRows)} valid
      {failedRows > 0 && <span className="text-danger-text"> · {formatNumber(failedRows)} with errors</span>}
      {importedRows > 0 && <> · {formatNumber(importedRows)} imported</>}
    </span>
  );
}

export function issueSeverityBadge(issue: ImportIssue) {
  return (
    <Badge size="sm" tone={issue.severity === "error" ? "danger" : "warning"}>
      {issue.severity === "error" ? "Error" : "Warning"}
    </Badge>
  );
}

export function IssueLocation({ format, row }: { format: ImportFormat; row: number }) {
  return <span className="whitespace-nowrap tabular-nums">{issueLocation(format, row)}</span>;
}
