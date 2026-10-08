import { Activity, CircleCheck, Flag, Inbox, NotebookPen, Send } from "lucide-react";
import Link from "next/link";
import { CoverageNotice } from "@/components/admin/analytics/CoverageNotice";
import { UsdEquivalentNote } from "@/components/admin/analytics/UsdEquivalentNote";
import { BarList, ChartEmpty, FunnelBars } from "@/components/admin/charts/BarList";
import { DateRangeFilter, rangeFromParams } from "@/components/admin/DateRangeFilter";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatDateTime, formatLocalDate, formatMoneyMinor } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber, formatPercent } from "@/lib/format";
import type { Actor } from "@/server/auth/actor";
import { getAdminAnalytics } from "@/server/analytics/admin";
import { hasPermission } from "@/server/auth/permissions";
import { getContentWorkload } from "@/server/cms/users/dashboard";
import { enqueueBackfillAction } from "./analytics/actions";

export const metadata = { title: "Dashboard" };

/**
 * /admin — the §36 dashboard. ADMIN / SUPER_ADMIN: the §35 funnel (users → active students → paid students →
 * revenue per currency, with a USD equivalent when exchange rates are configured → most popular subjects → most attempted topics → retention) from the nightly rollups, with a
 * live "today so far" and an honest coverage notice. CONTENT_EDITOR: their content workload instead.
 */
export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage();
  if (!hasPermission(actor, "analytics.platform", "all")) return <EditorDashboard actor={actor} />;

  const params = await searchParams;
  const range = rangeFromParams(firstParam(params, "from"), firstParam(params, "to"));
  const analytics = await getAdminAnalytics({ from: range.from, to: range.to });
  const { funnel, totals, today, coverage } = analytics;
  const accuracyToday = today.questionsAttempted > 0 ? (today.questionsCorrect / today.questionsAttempted) * 100 : null;

  return (
    <Container size="wide">
      <PageHeader
        title="Dashboard"
        description={`Platform funnel for ${formatLocalDate(range.from)} to ${formatLocalDate(range.to)}, from nightly figures. Demo accounts are excluded.`}
        actions={
          <ButtonLink href={`/admin/analytics?from=${range.from}&to=${range.to}`} variant="outline">
            Detailed analytics
          </ButtonLink>
        }
      />
      <div className="space-y-6">
        <DateRangeFilter path="/admin" range={range} />
        <CoverageNotice
          missingDates={coverage.missingDates}
          today={today.date}
          daysInRange={analytics.range.days}
          daysWithData={coverage.daysWithData}
          lastComputedAt={coverage.lastComputedAt}
          backfillAction={enqueueBackfillAction}
          canBackfill
        />

        <section aria-labelledby="today-heading">
          <h2 id="today-heading" className="mb-3 text-lg font-semibold text-text">
            Today so far <span className="text-sm font-normal text-muted">(live, as of {formatDateTime(today.computedAt)})</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatTile label="Active learners today" value={today.dau} icon={<Activity aria-hidden="true" />} />
            <StatTile label="Questions answered today" value={today.questionsAttempted} icon={<Send aria-hidden="true" />} />
            <StatTile
              label="Answered correctly today"
              value={accuracyToday === null ? null : formatPercent(accuracyToday, { maximumFractionDigits: 1 })}
              hint={today.questionsAttempted > 0 ? `${formatNumber(today.questionsCorrect)} of ${formatNumber(today.questionsAttempted)}` : "No answers yet today"}
              icon={<CircleCheck aria-hidden="true" />}
            />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection
            title="Funnel"
            description={funnel.asOf ? `Users and students as of ${formatLocalDate(funnel.asOf)}; active = studied in the 30 days before.` : "No computed day in this range yet."}
          >
            {funnel.asOf ? (
              <FunnelBars
                steps={[
                  { key: "users", label: "Registered users", value: funnel.users },
                  { key: "active", label: "Active students (30 days)", value: funnel.activeStudents },
                  { key: "paid", label: "Paid students", value: funnel.paidStudents },
                ]}
              />
            ) : (
              <ChartEmpty>No figures have been computed for this range yet.</ChartEmpty>
            )}
          </AdminSection>

          <AdminSection
            title="Revenue"
            description="Payments collected in the range, per currency. Other currencies are added up in US dollars only at the exchange rates set in Settings, labelled with their date."
          >
            {totals.revenue.length === 0 ? (
              <ChartEmpty>No payments recorded in this range.</ChartEmpty>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {totals.revenue.map((row) => (
                    <StatTile
                      key={row.currency}
                      label={`Net revenue (${row.currency})`}
                      value={formatMoneyMinor(row.netMinor, row.currency)}
                      hint={`${formatMoneyMinor(row.amountMinor, row.currency)} gross · ${formatMoneyMinor(row.refundsMinor, row.currency)} refunded · ${formatNumber(row.payments)} payments`}
                    />
                  ))}
                </div>
                <UsdEquivalentNote equivalent={totals.revenueUsd} />
              </div>
            )}
          </AdminSection>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection title="Most popular subjects" description="By active student-days: each day a student studied the subject counts once.">
            {funnel.popularSubjects.length === 0 ? (
              <ChartEmpty>No subject activity in this range.</ChartEmpty>
            ) : (
              <BarList
                measureLabel="Active student-days"
                categoryLabel="Subject"
                items={funnel.popularSubjects.map((subject) => ({
                  key: subject.subjectId,
                  label: subject.name ?? "Unknown subject",
                  labelText: subject.name ?? "Unknown subject",
                  sublabel: [subject.qualification, `${formatNumber(subject.questionsAttempted)} questions answered`].filter(Boolean).join(" · "),
                  value: subject.activeStudentDays,
                }))}
              />
            )}
          </AdminSection>
          <AdminSection title="Most attempted topics" description="Questions answered per topic in the range.">
            {funnel.mostAttemptedTopics.length === 0 ? (
              <ChartEmpty>No answered questions in this range.</ChartEmpty>
            ) : (
              <BarList
                measureLabel="Questions answered"
                categoryLabel="Topic"
                items={funnel.mostAttemptedTopics.map((topic) => ({
                  key: topic.topicId,
                  label: topic.name ?? "Unknown topic",
                  labelText: topic.name ?? "Unknown topic",
                  sublabel: topic.subjectName ?? undefined,
                  value: topic.attempts,
                }))}
              />
            )}
          </AdminSection>
        </div>

        <AdminSection title="Retention" description="Share of students who signed up N days before a day in the range and studied on that day.">
          <div className="grid gap-4 sm:grid-cols-3">
            {funnel.retention.map((row) => (
              <StatTile
                key={row.days}
                label={`Day ${row.days} retention`}
                value={row.rate === null ? null : formatPercent(row.rate, { input: "ratio", maximumFractionDigits: 1 })}
                hint={row.cohort > 0 ? `${formatNumber(row.retained)} of ${formatNumber(row.cohort)} students` : "No sign-up cohort in this range"}
              />
            ))}
          </div>
        </AdminSection>
      </div>
    </Container>
  );
}

/** Content editors' dashboard (ARCHITECTURE §3.3): their drafts, the review queue and open quality flags. */
async function EditorDashboard({ actor }: { actor: Actor }) {
  const workload = await getContentWorkload(actor);
  const canReview = hasPermission(actor, "content.review", "all");
  return (
    <Container size="wide">
      <PageHeader title="Content dashboard" description="Your drafts, the review queue and open quality flags." />
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="My drafts" value={workload.totals.myDrafts} icon={<NotebookPen aria-hidden="true" />} />
          <StatTile label="Waiting for review" value={workload.totals.inReview} icon={<Inbox aria-hidden="true" />} hint={canReview ? "Never your own work (four-eyes)" : undefined} />
          <StatTile label="Approved, not published" value={workload.totals.approved} icon={<CircleCheck aria-hidden="true" />} />
          <StatTile label="Open quality flags" value={workload.openFlags} icon={<Flag aria-hidden="true" />} hint={`${formatNumber(workload.flagsAssignedToMe)} assigned to you`} />
        </div>
        <AdminSection title="By content type" flush>
          <DataTable
            caption="Content workload by type"
            rows={workload.rows}
            rowKey={(row) => row.key}
            columns={[
              {
                key: "type",
                header: "Content",
                primary: true,
                cell: (row) => (
                  <Link href={row.href} className="font-semibold text-text underline-offset-4 hover:underline">
                    {row.label}
                  </Link>
                ),
              },
              { key: "mine", header: "My drafts", align: "end", cell: (row) => formatNumber(row.myDrafts) },
              { key: "review", header: "In review", align: "end", cell: (row) => formatNumber(row.inReview) },
              { key: "approved", header: "Approved", align: "end", cell: (row) => formatNumber(row.approved) },
            ]}
          />
        </AdminSection>
        <div className="flex flex-wrap gap-2">
          {canReview && <ButtonLink href="/admin/review">Open the review queue</ButtonLink>}
          <ButtonLink href="/admin/flags" variant="outline" iconStart={<Flag aria-hidden="true" />}>
            Quality flags
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
