import { CircleCheck, RotateCcw, XCircle } from "lucide-react";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection, JsonPreview, Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import {
  DEAD_LETTER_STATUSES,
  getDeadLetterSummary,
  listDeadLetterJobs,
  type DeadLetterJob,
} from "@/server/ops/dead-letters";
import { cancelJobAction, retryJobAction } from "./actions";

export const metadata = { title: "Background jobs" };

/**
 * /admin/jobs — dead-letter queue (ARCHITECTURE §3.7; ADMIN and SUPER_ADMIN): background jobs that stopped retrying.
 * DEAD = every attempt failed; FAILED = a permanent failure (bad payload, a refusal) that retrying the same way will
 * not fix unless the cause was corrected. Each row shows the last error and the payload (ids only) and offers Retry
 * (fresh attempts, runs now) and Cancel (never runs again). Both are audited. Most recent failures first.
 */
export default async function AdminJobsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireRole("ADMIN", "SUPER_ADMIN", { next: "/admin/jobs" });
  const params = await searchParams;
  const filters = {
    status: enumParam(params, "status", DEAD_LETTER_STATUSES),
    type: firstParam(params, "type"),
    cursor: firstParam(params, "cursor"),
  };

  let page: { items: DeadLetterJob[]; nextCursor: string | null } = { items: [], nextCursor: null };
  let filterError: string | null = null;
  try {
    page = await loadFirstPageOnStaleCursor(filters, (f) => listDeadLetterJobs(actor, f));
  } catch (error) {
    if (!isAppError(error) || error.code !== "VALIDATION") throw error;
    filterError = error.fieldErrors ? Object.values(error.fieldErrors).flat().join(" ") : error.message;
  }
  const summary = await getDeadLetterSummary(actor);
  const filtered = Boolean(filters.status || filters.type);

  return (
    <Container size="wide" className="space-y-6">
      <PageHeader
        title="Background jobs"
        description="Jobs that stopped retrying. Fix the cause first (a provider outage, a configuration value, a bad record), then retry. Cancel jobs that no longer need to run."
        className="pb-0"
      />

      <section aria-labelledby="jobs-summary-title" className="space-y-3">
        <h2 id="jobs-summary-title" className="sr-only">
          Summary
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Dead letters" value={formatNumber(summary.dead)} hint="Every attempt failed" />
          <StatTile label="Failed" value={formatNumber(summary.failed)} hint="Permanent failure, not retried" />
        </div>
        {summary.byType.length > 0 && (
          <p className="text-sm text-muted">
            By type:{" "}
            {summary.byType.map((row, index) => (
              <span key={row.type}>
                {index > 0 ? " · " : ""}
                <code className="font-mono text-xs">{row.type}</code> {formatNumber(row.dead + row.failed)}
              </span>
            ))}
          </p>
        )}
      </section>

      <AdminSection title="Dead and failed jobs" description="Failed and dead jobs are deleted 30 days after they stopped (maintenance.purgeJobs)." flush>
        <div className="px-4 pt-4">
          <FilterBar
            action="/admin/jobs"
            filters={[
              {
                kind: "select",
                name: "status",
                label: "Status",
                value: filters.status,
                options: [
                  { value: "DEAD", label: "Dead letter" },
                  { value: "FAILED", label: "Failed" },
                ],
              },
              { kind: "text", name: "type", label: "Job type", value: filters.type, placeholder: "notifications.send or notifications." },
            ]}
          />
          {filterError && (
            <Alert tone="danger" className="mb-4" role="alert" title="Check the filters">
              {filterError}
            </Alert>
          )}
        </div>
        <DataTable
          caption="Dead and failed background jobs"
          rows={page.items}
          rowKey={(row) => row.id}
          empty={
            filterError ? null : (
              <EmptyState
                icon={<CircleCheck aria-hidden="true" />}
                title={filtered ? "No jobs match these filters" : "No dead or failed jobs"}
                description={filtered ? undefined : "Every background job either succeeded or is still retrying."}
              />
            )
          }
          columns={[
            {
              key: "type",
              header: "Job",
              primary: true,
              cell: (row) => (
                <span className="block min-w-0">
                  <code className="font-mono text-xs">{row.type}</code>
                  <span className="block text-xs text-muted">queue {row.queue}</span>
                </span>
              ),
            },
            { key: "status", header: "Status", cell: (row) => <StatusBadge kind="job" status={row.status} /> },
            { key: "attempts", header: "Attempts", align: "end", cell: (row) => `${row.attempts}/${row.maxAttempts}`, hideOnMobile: true },
            { key: "failed", header: "Stopped", cell: (row) => <Timestamp value={row.failedAt} /> },
            { key: "details", header: "Error and payload", cell: (row) => <JobDetails job={row} /> },
            {
              key: "actions",
              header: "Actions",
              cell: (row) => (
                <span className="flex flex-wrap gap-2">
                  <ConfirmAction
                    action={retryJobAction}
                    fields={{ jobId: row.id }}
                    triggerLabel="Retry"
                    triggerIcon={<RotateCcw aria-hidden="true" />}
                    title="Retry this job?"
                    description={`${row.type} runs again now with a fresh set of ${row.maxAttempts} attempts. Its work may repeat side effects (messages, payments checks), so fix the cause first.`}
                    confirmLabel="Retry now"
                  />
                  <ConfirmAction
                    action={cancelJobAction}
                    fields={{ jobId: row.id }}
                    triggerLabel="Cancel"
                    triggerIcon={<XCircle aria-hidden="true" />}
                    title="Cancel this job?"
                    description={`${row.type} will never run again and leaves this list. This is recorded in the audit log.`}
                    confirmLabel="Cancel job"
                    tone="danger"
                  />
                </span>
              ),
            },
          ]}
        />
      </AdminSection>
      <CursorPagination path="/admin/jobs" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Job pages" />
    </Container>
  );
}

function JobDetails({ job }: { job: DeadLetterJob }) {
  return (
    <details className="text-left">
      <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-primary underline-offset-4 hover:underline md:min-h-0">
        {job.lastError ? job.lastError.slice(0, 80) + (job.lastError.length > 80 ? "…" : "") : "Details"}
      </summary>
      <div className="mt-2 max-w-xl space-y-3 text-sm">
        {job.lastError && (
          <figure className="min-w-0">
            <figcaption className="mb-1 text-xs font-semibold tracking-wide text-muted uppercase">Last error</figcaption>
            <pre tabIndex={0} className="max-h-48 overflow-auto rounded-control bg-subtle p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-text">
              {job.lastError}
            </pre>
          </figure>
        )}
        <JsonPreview value={job.payload} label="Payload" />
        <p className="text-xs text-muted">
          Job id {job.id}
          {job.dedupeKey ? ` · dedupe key ${job.dedupeKey}` : ""} · created <Timestamp value={job.createdAt} />
        </p>
      </div>
    </details>
  );
}
