import { Download, FileText } from "lucide-react";
import { CoverageNotice } from "@/components/admin/analytics/CoverageNotice";
import { DateRangeFilter } from "@/components/admin/DateRangeFilter";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatLocalDate, formatMoneyMinor } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { buildHref, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { ADMIN_REPORTS, getAdminReportsOverview, parseAdminReportRange, type AdminReportId } from "@/server/reports/admin";
import { enqueueBackfillAction } from "../analytics/actions";

export const metadata = { title: "Reports" };

function reportSummary(id: AdminReportId, overview: Awaited<ReturnType<typeof getAdminReportsOverview>>): string {
  const { analytics } = overview;
  switch (id) {
    case "executive-summary":
      return [
        analytics.funnel.users === null ? "No user rollup yet" : `${formatNumber(analytics.funnel.users)} registered users`,
        analytics.funnel.paidStudents === null ? null : `${formatNumber(analytics.funnel.paidStudents)} paid students`,
      ]
        .filter(Boolean)
        .join(" · ");
    case "registrations":
      return analytics.totals.signups === null ? "No rolled-up sign-ups in this range" : `${formatNumber(analytics.totals.signups)} sign-ups`;
    case "learning-engagement":
      return analytics.totals.questionsAttempted === null
        ? "No rolled-up learning activity in this range"
        : `${formatNumber(analytics.totals.questionsAttempted)} questions answered`;
    case "assessment-performance":
      return analytics.totals.avgScorePct === null
        ? "No scored assessments in this range"
        : `${formatPercent(analytics.totals.avgScorePct, { maximumFractionDigits: 1 })} average test score`;
    case "revenue":
      return analytics.totals.revenue.length === 0
        ? "No payments in this range"
        : analytics.totals.revenue.map((row) => `${formatMoneyMinor(row.netMinor, row.currency)} net`).join(" · ");
    case "retention": {
      const d7 = analytics.funnel.retention.find((row) => row.days === 7);
      return !d7 || d7.rate === null ? "No day-7 cohort in this range" : `Day 7 retention ${formatPercent(d7.rate, { input: "ratio", maximumFractionDigits: 1 })}`;
    }
    case "topic-weakness":
      return analytics.topLists.mostDifficultTopics.length === 0
        ? "Not enough topic answers in this range"
        : `${formatNumber(analytics.topLists.mostDifficultTopics.length)} ranked topics`;
    case "ai-usage":
      return analytics.topLists.aiByFeature.length === 0 ? "No AI requests in this range" : `${formatNumber(analytics.totals.aiRequests)} AI requests`;
  }
}

/**
 * /admin/reports — exportable reporting centre for management reports that reconcile with the analytics dashboard.
 * Every report uses rollups/source tables through getAdminAnalytics; empty data stays empty instead of using samples.
 */
export default async function AdminReportsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("analytics.platform", { next: "/admin/reports" });
  const params = await searchParams;
  const range = parseAdminReportRange(firstParam(params, "from"), firstParam(params, "to"));
  const overview = await getAdminReportsOverview(actor, range);
  const { analytics } = overview;

  const rows = ADMIN_REPORTS.map((report) => ({
    ...report,
    summary: reportSummary(report.id, overview),
    href: buildHref(`/admin/reports/export/${report.id}`, { from: range.from, to: range.to }),
  }));

  return (
    <Container size="wide">
      <PageHeader
        title="Reports"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Reports" }]}
        description={`Management reports for ${formatLocalDate(range.from)} to ${formatLocalDate(range.to)}. Exports use the same verified rollups as the dashboard.`}
      />
      <div className="space-y-6">
        <DateRangeFilter path="/admin/reports" range={range} />
        <CoverageNotice
          missingDates={analytics.coverage.missingDates}
          today={analytics.today.date}
          daysInRange={analytics.range.days}
          daysWithData={analytics.coverage.daysWithData}
          lastComputedAt={analytics.coverage.lastComputedAt}
          backfillAction={enqueueBackfillAction}
          canBackfill
        />

        <section aria-labelledby="report-snapshot-heading">
          <h2 id="report-snapshot-heading" className="mb-3 text-lg font-semibold text-text">
            Snapshot
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Sign-ups" value={analytics.totals.signups} icon={<FileText aria-hidden="true" />} />
            <StatTile label="Questions answered" value={analytics.totals.questionsAttempted} />
            <StatTile label="Average test score" value={analytics.totals.avgScorePct === null ? null : formatPercent(analytics.totals.avgScorePct, { maximumFractionDigits: 1 })} />
            <StatTile label="Study time" value={analytics.totals.studyMinutes === null ? null : formatDuration(analytics.totals.studyMinutes)} />
          </div>
        </section>

        <AdminSection
          title="Available reports"
          description="CSV exports are private, uncached and permission-checked. Blank cells mean the source data has not been collected or rolled up for that row."
          flush
        >
          <DataTable
            caption="Available management reports"
            rows={rows}
            rowKey={(row) => row.id}
            columns={[
              {
                key: "report",
                header: "Report",
                primary: true,
                cell: (row) => (
                  <div>
                    <p>{row.title}</p>
                    <p className="mt-1 text-sm font-normal text-muted">{row.description}</p>
                  </div>
                ),
              },
              { key: "summary", header: "Current range", cell: (row) => row.summary },
              { key: "source", header: "Source", cell: (row) => row.source, hideOnMobile: true },
              {
                key: "export",
                header: "Export",
                align: "end",
                cell: (row) => (
                  <ButtonLink href={row.href} variant="outline" size="sm" iconStart={<Download aria-hidden="true" />}>
                    CSV
                  </ButtonLink>
                ),
              },
            ]}
          />
        </AdminSection>
      </div>
    </Container>
  );
}
