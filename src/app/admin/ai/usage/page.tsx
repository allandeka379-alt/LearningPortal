import { KeyRound, PowerOff } from "lucide-react";
import Link from "next/link";
import { CoverageNotice } from "@/components/admin/analytics/CoverageNotice";
import { ChartEmpty } from "@/components/admin/charts/BarList";
import { TimeSeriesChart } from "@/components/admin/charts/TimeSeriesChart";
import { DateRangeFilter, rangeFromParams } from "@/components/admin/DateRangeFilter";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatLocalDate, formatMicrosUsd, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { DataTable } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber, formatPercent } from "@/lib/format";
import { hasPermission } from "@/server/auth/permissions";
import { getAiUsage } from "@/server/cms/settings/ai-usage";
import { AiNav } from "./_components/AiNav";
import { enqueueAiUsageBackfillAction } from "./actions";

export const metadata = { title: "AI usage" };

const FEATURE_LABELS: Readonly<Record<string, string>> = {
  TUTOR: "AI tutor",
  SOLVER: "Question solver",
  MARKING: "AI marking",
  CONTENT_GEN: "Content generation",
  WHATSAPP: "WhatsApp",
};

/**
 * /admin/ai/usage — §40 AI cost control: spend and requests per day, usage per feature, per model and tier, the
 * response cache and the heaviest users by cost (ids only). Every figure comes from metering tables (`AiSpendDaily`,
 * `AiUsageDaily`, the per-model rollup); nothing is estimated. ADMIN and SUPER_ADMIN (`ai.admin`).
 */
export default async function AdminAiUsagePage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the AI admin pages are a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireAdminPage("ai.admin", { minScope: "restricted", next: "/admin/ai/usage" });
  const params = await searchParams;
  const range = rangeFromParams(firstParam(params, "from"), firstParam(params, "to"));
  const report = await getAiUsage(actor, range);
  const { totals } = report;
  const dates = report.daily.map((point) => point.date);
  const hasTraffic = report.daily.some((point) => point.requests > 0);
  const ceiling = report.dailyCeilingMicros;

  return (
    <Container size="wide">
      <PageHeader
        title="AI usage & spend"
        description={`${formatLocalDate(report.range.from)} to ${formatLocalDate(report.range.to)} (${report.range.days} days). Spend is metered in USD from token counts at the configured model prices.`}
      />
      <AiNav current="/admin/ai/usage" showGeneration={hasPermission(actor, "ai.generate")} />
      <div className="space-y-6">
        {!report.apiKeyConfigured && (
          <Alert tone="info" icon={<KeyRound aria-hidden="true" />} title="AI is not configured on this server">
            No API key is set, so no AI requests are made and students see &ldquo;AI is not configured&rdquo;. Usage below is what was recorded earlier.
          </Alert>
        )}
        {report.apiKeyConfigured && !report.aiEnabled && (
          <Alert tone="warning" icon={<PowerOff aria-hidden="true" />} title="AI is switched off">
            The kill switch is off: AI features answer &ldquo;temporarily unavailable&rdquo;. Change it in{" "}
            <Link href="/admin/ai/settings" className="font-medium underline">
              AI settings
            </Link>
            .
          </Alert>
        )}
        <DateRangeFilter path="/admin/ai/usage" range={range} />

        <section aria-labelledby="ai-totals-heading">
          <h2 id="ai-totals-heading" className="mb-3 text-lg font-semibold text-text">
            Totals
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            <StatTile
              label="Spent today so far"
              value={formatMicrosUsd(report.todaySpendMicros)}
              hint={ceiling === null ? "No daily ceiling" : `Daily ceiling ${formatMicrosUsd(ceiling)} (${formatPercent(ceiling > 0 ? report.todaySpendMicros / ceiling : 0, { input: "ratio", maximumFractionDigits: 0 })} used)`}
            />
            <StatTile label="Spend in range" value={formatMicrosUsd(report.daily.reduce((sum, point) => sum + point.costMicros, 0))} />
            <StatTile label="Requests in range" value={report.daily.reduce((sum, point) => sum + point.requests, 0)} />
            <StatTile
              label="Response cache hit rate"
              value={totals.cacheHitRate === null ? null : formatPercent(totals.cacheHitRate, { input: "ratio", maximumFractionDigits: 1 })}
              hint={`${formatNumber(totals.cacheHits)} answers served from the cache`}
            />
            <StatTile
              label="Prompt cache reads"
              value={totals.cacheReadRatio === null ? null : formatPercent(totals.cacheReadRatio, { input: "ratio", maximumFractionDigits: 1 })}
              hint="Share of prompt tokens read from the prompt cache"
            />
            <StatTile label="Deep-tier requests" value={totals.deepRequests} hint={`${formatNumber(totals.images)} images uploaded`} />
          </div>
          <p className="mt-2 text-sm text-muted">
            Requests and spend per day use the platform day (Africa/Harare); per-feature figures use each student&rsquo;s own day, so the two can differ
            slightly at the range edges.
          </p>
        </section>

        {hasTraffic ? (
          <div className="grid gap-6 xl:grid-cols-2">
            <AdminSection title="Requests per day">
              <TimeSeriesChart title="AI requests per day" dates={dates} series={[{ key: "requests", label: "Requests", values: report.daily.map((point) => point.requests) }]} />
            </AdminSection>
            <AdminSection title="Spend per day (USD)">
              <TimeSeriesChart title="AI spend per day in USD" dates={dates} series={[{ key: "spend", label: "USD", values: report.daily.map((point) => point.costMicros / 1_000_000) }]} />
            </AdminSection>
          </div>
        ) : (
          <ChartEmpty>No AI requests were metered in this range.</ChartEmpty>
        )}

        <AdminSection title="By feature" description="Requests, cache hits, tokens and spend per AI feature." flush>
          <DataTable
            caption="AI usage by feature"
            rows={report.byFeature}
            rowKey={(row) => row.feature}
            className="rounded-none border-x-0 border-b-0"
            empty={<ChartEmpty className="mx-4 mb-4">No AI usage in this range.</ChartEmpty>}
            columns={[
              { key: "feature", header: "Feature", primary: true, cell: (row) => FEATURE_LABELS[row.feature] ?? humanizeEnum(row.feature) },
              { key: "requests", header: "Requests", align: "end", cell: (row) => formatNumber(row.requests) },
              { key: "cache", header: "Cache hits", align: "end", cell: (row) => formatNumber(row.cacheHits) },
              { key: "deep", header: "Deep tier", align: "end", hideOnMobile: true, cell: (row) => formatNumber(row.deepRequests) },
              { key: "input", header: "Input tokens", align: "end", hideOnMobile: true, cell: (row) => formatNumber(row.inputTokens + row.cacheReadTokens + row.cacheWriteTokens, { compact: true }) },
              { key: "output", header: "Output tokens", align: "end", hideOnMobile: true, cell: (row) => formatNumber(row.outputTokens, { compact: true }) },
              { key: "cost", header: "Spend", align: "end", cell: (row) => formatMicrosUsd(row.costMicros) },
            ]}
          />
        </AdminSection>

        <AdminSection title="By model and tier" description="Tutor, solver and WhatsApp turns plus content-generation runs, computed nightly per platform day.">
          <div className="space-y-4">
            <CoverageNotice
              missingDates={report.modelDaysMissing}
              today={report.platformToday}
              daysInRange={report.range.days}
              daysWithData={report.modelDaysComputed}
              lastComputedAt={report.modelLastComputedAt}
              backfillAction={enqueueAiUsageBackfillAction}
              canBackfill
            />
            <DataTable
              caption="AI usage by model and tier"
              rows={report.byModel}
              rowKey={(row) => `${row.model}|${row.tier}`}
              empty={<ChartEmpty>No per-model figures for this range yet.</ChartEmpty>}
              columns={[
                { key: "model", header: "Model", primary: true, cell: (row) => <span className="font-mono text-xs">{row.model}</span> },
                { key: "tier", header: "Tier", cell: (row) => humanizeEnum(row.tier) },
                { key: "requests", header: "Requests", align: "end", cell: (row) => formatNumber(row.requests) },
                { key: "cache", header: "Cached answers", align: "end", hideOnMobile: true, cell: (row) => formatNumber(row.cacheHits) },
                { key: "tokens", header: "Tokens in / out", align: "end", hideOnMobile: true, cell: (row) => `${formatNumber(row.inputTokens + row.cacheReadTokens + row.cacheWriteTokens, { compact: true })} / ${formatNumber(row.outputTokens, { compact: true })}` },
                { key: "avg", header: "Per request", align: "end", hideOnMobile: true, cell: (row) => formatMicrosUsd(row.avgCostMicros) },
                { key: "cost", header: "Spend", align: "end", cell: (row) => formatMicrosUsd(row.costMicros) },
              ]}
            />
          </div>
        </AdminSection>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection title="Highest spend by user" description="User ids only. Opening a student's record asks for a reason and is audited; conversations are never shown." flush>
            <DataTable
              caption="Users with the highest AI spend"
              rows={report.topUsers}
              rowKey={(row) => row.userId}
              className="rounded-none border-x-0 border-b-0"
              empty={<ChartEmpty className="mx-4 mb-4">No AI usage in this range.</ChartEmpty>}
              columns={[
                {
                  key: "user",
                  header: "User id",
                  primary: true,
                  cell: (row) => (
                    <Link href={`/admin/users/${row.userId}`} className="font-mono text-xs underline-offset-4 hover:underline">
                      {row.userId}
                    </Link>
                  ),
                },
                { key: "requests", header: "Requests", align: "end", cell: (row) => formatNumber(row.requests) },
                { key: "cost", header: "Spend", align: "end", cell: (row) => formatMicrosUsd(row.costMicros) },
              ]}
            />
          </AdminSection>
          <AdminSection title="Response cache" description="Generic explanations reused across students (never a student's own words).">
            <div className="grid gap-4 sm:grid-cols-2">
              <StatTile label="Live entries" value={report.responseCache.liveEntries} hint={`${formatNumber(report.responseCache.totalEntries)} stored in total`} />
              <StatTile label="Times reused" value={report.responseCache.hits} />
              <StatTile label="Spend avoided" value={formatMicrosUsd(report.responseCache.savedMicros)} hint="Reuses × the cost of producing each answer (all time)" className="sm:col-span-2" />
            </div>
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
