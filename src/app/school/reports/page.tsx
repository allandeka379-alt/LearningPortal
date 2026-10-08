import { Download, RefreshCw } from "lucide-react";
import type { Metadata } from "next";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatDateTime, formatLocalDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { REPORT_STATUS_META } from "@/components/school/labels";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { listSchoolClasses } from "@/server/schools/classes";
import { REPORT_RETENTION_DAYS, SCHOOL_REPORT_KINDS, SCHOOL_REPORT_LABELS } from "@/server/schools/core";
import { defaultReportPeriod, listSchoolReports } from "@/server/schools/reports";
import { requireSchoolPage } from "../_lib/context";
import { requestReportAction } from "./actions";

export const metadata: Metadata = { title: "Reports" };

/**
 * /school/reports — generate school reports (§23): class results, engagement and examination readiness as CSV files
 * (open in Excel or Google Sheets). Prepared in the background, private to the school's admins, deleted after
 * {@link REPORT_RETENTION_DAYS} days.
 */
export default async function SchoolReportsPage() {
  const { actor, school } = await requireSchoolPage("/school/reports");
  const [reports, classes] = await Promise.all([listSchoolReports(actor, school.schoolId), listSchoolClasses(actor, { schoolId: school.schoolId })]);
  const period = defaultReportPeriod(new Date(), school.timezone);
  const waiting = reports.some((report) => report.status === "QUEUED" || report.status === "GENERATING");

  return (
    <Container size="wide">
      <PageHeader title="Reports" description="Download your school's results and engagement as spreadsheets (CSV). Reports cover the students on your roster today." />
      <div className="space-y-6 pb-8">
        <AdminSection title="Generate a report">
          <ul className="mb-4 space-y-1 text-sm text-muted">
            {SCHOOL_REPORT_KINDS.map((kind) => (
              <li key={kind}>
                <span className="font-semibold text-text">{SCHOOL_REPORT_LABELS[kind].title}:</span> {SCHOOL_REPORT_LABELS[kind].description}
              </li>
            ))}
          </ul>
          <ActionForm action={requestReportAction} submitLabel="Generate report" pendingLabel="Requesting…" columns="two">
            <AdminField name="kind" label="Report" type="select" required defaultValue="class_results" options={SCHOOL_REPORT_KINDS.map((kind) => ({ value: kind, label: SCHOOL_REPORT_LABELS[kind].title }))} wide />
            <AdminField name="periodStart" label="From" type="date" required defaultValue={period.periodStart} />
            <AdminField name="periodEnd" label="To" type="date" required defaultValue={period.periodEnd} />
            {classes.length > 0 && (
              <fieldset className="md:col-span-2">
                <legend className="text-sm font-medium text-text">Classes (optional: leave empty for the whole school)</legend>
                <div className="mt-2 grid max-h-56 gap-1 overflow-y-auto rounded-card border border-border p-2 sm:grid-cols-2">
                  {classes.map((cls) => (
                    <label key={cls.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 text-sm hover:bg-subtle">
                      <input type="checkbox" name="classIds" value={cls.id} className="size-5 shrink-0 accent-primary" />
                      <span className="text-text">{cls.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </ActionForm>
        </AdminSection>

        <AdminSection
          title="Your reports"
          description={`Files are kept for ${REPORT_RETENTION_DAYS} days. Only your school's admins can download them; each download is recorded.`}
          action={
            waiting ? (
              <ButtonLink href="/school/reports" size="sm" variant="outline" iconStart={<RefreshCw aria-hidden="true" />}>
                Refresh
              </ButtonLink>
            ) : undefined
          }
          flush
        >
          <DataTable
            caption="Generated reports"
            rows={reports}
            rowKey={(row) => row.id}
            empty={<EmptyState title="No reports yet" description="Generate your first report above." titleAs="p" />}
            columns={[
              { key: "title", header: "Report", primary: true, cell: (row) => row.title },
              { key: "period", header: "Period", cell: (row) => `${formatLocalDate(row.periodStart)} – ${formatLocalDate(row.periodEnd)}` },
              {
                key: "status",
                header: "Status",
                cell: (row) => (
                  <span className="flex flex-col gap-1">
                    <Badge tone={REPORT_STATUS_META[row.status]?.tone ?? "neutral"}>{REPORT_STATUS_META[row.status]?.label ?? row.status}</Badge>
                    {row.status === "FAILED" && row.error && <span className="text-xs text-danger-text">{row.error}</span>}
                  </span>
                ),
              },
              { key: "requested", header: "Requested", hideOnMobile: true, cell: (row) => `${formatDateTime(row.createdAt, school.timezone)}${row.requestedBy ? ` by ${row.requestedBy}` : ""}` },
              {
                key: "download",
                header: "File",
                align: "end",
                cell: (row) =>
                  row.status === "READY" ? (
                    <a
                      href={`/school/reports/${row.id}/download`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-control px-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      download
                    >
                      <Download aria-hidden="true" className="size-4" />
                      Download{row.byteSize ? ` (${formatNumber(Math.max(1, Math.round(row.byteSize / 1024)))} KB)` : ""}
                    </a>
                  ) : null,
              },
            ]}
          />
        </AdminSection>
      </div>
    </Container>
  );
}
