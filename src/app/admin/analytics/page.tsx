import { CoverageNotice } from "@/components/admin/analytics/CoverageNotice";
import { UsdEquivalentNote } from "@/components/admin/analytics/UsdEquivalentNote";
import { BarList, ChartEmpty } from "@/components/admin/charts/BarList";
import { TimeSeriesChart } from "@/components/admin/charts/TimeSeriesChart";
import { DateRangeFilter, rangeFromParams } from "@/components/admin/DateRangeFilter";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatLocalDate, formatMicrosUsd, formatMoneyMinor, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { getAdminAnalytics } from "@/server/analytics/admin";
import { enqueueBackfillAction } from "./actions";

export const metadata = { title: "Analytics" };

/**
 * /admin/analytics — the deeper §35 view: daily series (active users, sign-ups, students, questions, scores, study
 * time, AI usage), range totals, most difficult topics, AI usage by feature, sign-ups by channel, paid students by
 * plan and revenue per currency (plus a dated USD equivalent when `fx.rates` is set). One measure family per chart (never two y-axes); every chart has a table twin.
 */
export default async function AdminAnalyticsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  await requireAdminPage("analytics.platform", { next: "/admin/analytics" });
  const params = await searchParams;
  const range = rangeFromParams(firstParam(params, "from"), firstParam(params, "to"));
  const analytics = await getAdminAnalytics({ from: range.from, to: range.to }, { topN: 15 });
  const { series, totals, topLists, coverage, growth } = analytics;
  const dates = series.map((point) => point.date);
  const hasData = coverage.daysWithData > 0;
  const accuracy = totals.correctRatePct;

  return (
    <Container size="wide">
      <PageHeader
        title="Analytics"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Analytics" }]}
        description={`${formatLocalDate(range.from)} to ${formatLocalDate(range.to)} (${analytics.range.days} days). Computed nightly from activity records; demo accounts excluded.`}
      />
      <div className="space-y-6">
        <DateRangeFilter path="/admin/analytics" range={range} />
        <CoverageNotice
          missingDates={coverage.missingDates}
          today={analytics.today.date}
          daysInRange={analytics.range.days}
          daysWithData={coverage.daysWithData}
          lastComputedAt={coverage.lastComputedAt}
          backfillAction={enqueueBackfillAction}
          canBackfill
        />

        <section aria-labelledby="totals-heading">
          <h2 id="totals-heading" className="mb-3 text-lg font-semibold text-text">
            Range totals
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Visits" value={growth.totals.visits} hint="Public page views" />
            <StatTile label="Clicks" value={growth.totals.clicks} hint={`${formatNumber(growth.totals.signupClicks)} sign-up · ${formatNumber(growth.totals.checkoutClicks)} checkout`} />
            <StatTile label="Sign-ups" value={totals.signups} />
            <StatTile label="Questions answered" value={totals.questionsAttempted} hint={accuracy === null ? undefined : `${formatPercent(accuracy, { maximumFractionDigits: 1 })} correct`} />
            <StatTile label="Average test score" value={totals.avgScorePct === null ? null : formatPercent(totals.avgScorePct, { maximumFractionDigits: 1 })} />
            <StatTile label="Study time" value={totals.studyMinutes === null ? null : formatDuration(totals.studyMinutes)} />
            <StatTile
              label="Mock exams completed"
              value={totals.mockCompleted}
              hint={totals.mockAvgPct === null ? undefined : `Average ${formatPercent(totals.mockAvgPct, { maximumFractionDigits: 1 })}`}
            />
            <StatTile label="First-time payers (FTP)" value={totals.conversions} />
            <StatTile label="AI requests" value={totals.aiRequests} />
            <StatTile label="AI spend" value={totals.aiCostMicros === null ? null : formatMicrosUsd(totals.aiCostMicros)} />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-3">
          <AdminSection title="Top public pages" description="Visits captured from public pages in this range.">
            {growth.topPages.length === 0 ? (
              <ChartEmpty>No public visits captured in this range.</ChartEmpty>
            ) : (
              <BarList
                measureLabel="Visits"
                categoryLabel="Page"
                items={growth.topPages.map((row) => ({ key: row.path, label: row.path, labelText: row.path, value: row.visits }))}
              />
            )}
          </AdminSection>
          <AdminSection title="Top click targets" description="Links and CTAs clicked from public pages.">
            {growth.topClicks.length === 0 ? (
              <ChartEmpty>No public clicks captured in this range.</ChartEmpty>
            ) : (
              <BarList
                measureLabel="Clicks"
                categoryLabel="Target"
                items={growth.topClicks.map((row) => ({ key: row.target, label: row.target, labelText: row.target, value: row.clicks }))}
              />
            )}
          </AdminSection>
          <AdminSection title="Traffic sources" description="UTM source when present, then external referrer host, then direct.">
            {growth.sources.length === 0 ? (
              <ChartEmpty>No public traffic sources captured in this range.</ChartEmpty>
            ) : (
              <BarList
                measureLabel="Visits"
                categoryLabel="Source"
                items={growth.sources.map((row) => ({ key: row.source, label: humanizeEnum(row.source), labelText: row.source, value: row.visits }))}
              />
            )}
          </AdminSection>
        </div>

        {!hasData ? (
          <ChartEmpty>No figures have been computed for this range yet, so there is nothing to chart.</ChartEmpty>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            <AdminSection title="Active users" description="Distinct users active on the day, in the 7 days and in the 30 days up to it.">
              <TimeSeriesChart
                title="Active users: daily, weekly and monthly"
                dates={dates}
                series={[
                  { key: "dau", label: "Daily", values: series.map((p) => p.dau) },
                  { key: "wau", label: "Weekly", values: series.map((p) => p.wau) },
                  { key: "mau", label: "Monthly", values: series.map((p) => p.mau) },
                ]}
              />
            </AdminSection>
            <AdminSection title="Active and paid students" description="Students active in the last 30 days, and students with a paid plan, per day.">
              <TimeSeriesChart
                title="Active and paid students"
                dates={dates}
                series={[
                  { key: "active", label: "Active students", values: series.map((p) => p.activeStudents) },
                  { key: "paid", label: "Paid students", values: series.map((p) => p.paidStudents) },
                ]}
              />
            </AdminSection>
            <AdminSection title="Sign-ups" description="New accounts per day.">
              <TimeSeriesChart title="Sign-ups per day" dates={dates} series={[{ key: "signups", label: "Sign-ups", values: series.map((p) => p.signups) }]} />
            </AdminSection>
            <AdminSection title="Questions answered" description="Answers marked per day (practice, tests, mocks, daily questions).">
              <TimeSeriesChart
                title="Questions answered per day"
                dates={dates}
                series={[
                  { key: "attempted", label: "Answered", values: series.map((p) => p.questionsAttempted) },
                  { key: "correct", label: "Correct", values: series.map((p) => p.questionsCorrect) },
                ]}
              />
            </AdminSection>
            <AdminSection title="Average test score" description="Mean percentage of marked quizzes, tests and mocks finished that day.">
              <TimeSeriesChart title="Average test score per day" valueKind="percent" dates={dates} series={[{ key: "avg", label: "Average score", values: series.map((p) => p.avgScorePct) }]} />
            </AdminSection>
            <AdminSection title="Study time" description="Minutes of recorded study per day, all students.">
              <TimeSeriesChart title="Study minutes per day" valueKind="minutes" dates={dates} series={[{ key: "minutes", label: "Study time", values: series.map((p) => p.studyMinutes) }]} />
            </AdminSection>
            <AdminSection title="Retention" description="Share of each day's sign-up cohort that studied 1, 7 and 30 days later.">
              <TimeSeriesChart
                title="Retention by day"
                valueKind="ratio"
                dates={dates}
                series={[
                  { key: "d1", label: "Day 1", values: series.map((p) => p.retentionD1) },
                  { key: "d7", label: "Day 7", values: series.map((p) => p.retentionD7) },
                  { key: "d30", label: "Day 30", values: series.map((p) => p.retentionD30) },
                ]}
              />
            </AdminSection>
            <AdminSection title="AI requests" description="Tutor, solver, marking and generation requests per day.">
              <TimeSeriesChart title="AI requests per day" dates={dates} series={[{ key: "ai", label: "AI requests", values: series.map((p) => p.aiRequests) }]} />
            </AdminSection>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection title="Most difficult topics" description="Lowest share of correct answers, among topics with enough answers in the range." flush>
            <DataTable
              caption="Most difficult topics"
              rows={topLists.mostDifficultTopics}
              rowKey={(row) => row.topicId}
              empty={<ChartEmpty className="mx-4 mb-4">Not enough answers per topic in this range yet.</ChartEmpty>}
              columns={[
                { key: "topic", header: "Topic", primary: true, cell: (row) => row.name ?? "Unknown topic" },
                { key: "subject", header: "Subject", cell: (row) => row.subjectName ?? "—" },
                { key: "attempts", header: "Answers", align: "end", cell: (row) => formatNumber(row.attempts) },
                { key: "correct", header: "Correct", align: "end", cell: (row) => formatPercent(row.correctRatePct, { maximumFractionDigits: 1 }) },
              ]}
            />
          </AdminSection>
          <AdminSection title="AI usage by feature" description="Requests and spend in the range (USD, from metered tokens)." flush>
            <DataTable
              caption="AI usage by feature"
              rows={topLists.aiByFeature}
              rowKey={(row) => row.feature}
              empty={<ChartEmpty className="mx-4 mb-4">No AI requests in this range.</ChartEmpty>}
              columns={[
                { key: "feature", header: "Feature", primary: true, cell: (row) => humanizeEnum(row.feature) },
                { key: "requests", header: "Requests", align: "end", cell: (row) => formatNumber(row.requests) },
                { key: "cost", header: "Spend", align: "end", cell: (row) => formatMicrosUsd(row.costMicros) },
              ]}
            />
          </AdminSection>
          <AdminSection title="Sign-ups by channel">
            {topLists.signupsByChannel.length === 0 ? (
              <ChartEmpty>No sign-ups in this range.</ChartEmpty>
            ) : (
              <BarList
                measureLabel="Sign-ups"
                categoryLabel="Channel"
                items={topLists.signupsByChannel.map((row) => ({ key: row.channel, label: humanizeEnum(row.channel), labelText: humanizeEnum(row.channel), value: row.signups }))}
              />
            )}
          </AdminSection>
          <AdminSection title="Paid students by plan" description={analytics.funnel.asOf ? `As of ${formatLocalDate(analytics.funnel.asOf)}.` : undefined}>
            {topLists.paidByPlan.length === 0 ? (
              <ChartEmpty>No paid students on the latest computed day.</ChartEmpty>
            ) : (
              <BarList
                measureLabel="Paid students"
                categoryLabel="Plan"
                items={topLists.paidByPlan.map((row) => ({ key: row.planCode, label: row.planCode, labelText: row.planCode, value: row.students }))}
              />
            )}
          </AdminSection>
        </div>

        <AdminSection
          title="Revenue by currency"
          description="Collected in the range, each currency on its own. A USD equivalent appears below only when every currency has an exchange rate in Settings."
          flush
        >
          <DataTable
            caption="Revenue by currency"
            rows={totals.revenue}
            rowKey={(row) => row.currency}
            empty={<ChartEmpty className="mx-4 mb-4">No payments recorded in this range.</ChartEmpty>}
            columns={[
              { key: "currency", header: "Currency", primary: true, cell: (row) => row.currency },
              { key: "payments", header: "Payments", align: "end", cell: (row) => formatNumber(row.payments) },
              { key: "gross", header: "Gross", align: "end", cell: (row) => formatMoneyMinor(row.amountMinor, row.currency) },
              { key: "refunds", header: "Refunds", align: "end", cell: (row) => formatMoneyMinor(row.refundsMinor, row.currency) },
              { key: "net", header: "Net", align: "end", cell: (row) => formatMoneyMinor(row.netMinor, row.currency) },
            ]}
          />
          <UsdEquivalentNote equivalent={totals.revenueUsd} className="px-4 pb-4 text-sm text-muted" />
        </AdminSection>
      </div>
    </Container>
  );
}
