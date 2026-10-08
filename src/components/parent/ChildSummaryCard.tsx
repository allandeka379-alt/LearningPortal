import { ChevronRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { RELATIONSHIP_LABELS } from "@/components/family/labels";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { formatCount, formatDuration, formatNumber, formatPercent } from "@/lib/format";
import type { ParentChildDetail } from "@/server/family/queries";
import { modeLabel } from "./ChildSections";

/** Shown where a detailed-report value would be when the child's plan does not include parent reports (§31). */
const NOT_IN_PLAN_TEXT = "In detailed reports";

/**
 * One linked child on the parent dashboard (§21): exam countdown, this week's study time, recent results and weak
 * areas, each only when the student shares it ("Not shared" otherwise, never a fake zero). Results and weak areas are
 * detailed reports (§31 `parentReports`, on the child's plan): without them the card says so ("In detailed reports").
 * The whole card heading links to the child's page. Server component.
 */
export function ChildSummaryCard({ detail }: { detail: ParentChildDetail }) {
  const { child, overview } = detail;
  const href = `/parent/children/${child.studentUserId}`;
  const headingId = `child-${child.studentUserId}`;
  const next = overview.examCountdown.next;
  const week = overview.studyTime?.last7Days;
  const results = overview.testResults?.recent;
  const weak = overview.weakAreas;
  const resultsLocked = overview.lockedSections.includes("testResults");
  const weakLocked = overview.lockedSections.includes("weakAreas");

  return (
    <article aria-labelledby={headingId} className="rounded-card border border-border bg-surface shadow-xs">
      <header className="flex items-center gap-3 border-b border-border p-4">
        <Avatar name={child.name} size="md" decorative />
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="text-base font-semibold text-text">
            <Link href={href} className="underline-offset-4 hover:underline">
              {child.name}
            </Link>
          </h2>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>You are their {RELATIONSHIP_LABELS[child.relationship].toLowerCase()}</span>
            {child.guardianConsent.canGrant && (
              <Badge tone="accent" size="sm" icon={<ShieldAlert aria-hidden="true" />}>
                Consent needed
              </Badge>
            )}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-control px-2 text-sm font-semibold text-primary hover:bg-subtle"
        >
          Details <span className="sr-only">for {child.name}</span>
          <ChevronRight aria-hidden="true" className="size-4" />
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
        <div className="bg-surface p-4">
          <dt className="text-sm text-muted">Exam countdown</dt>
          <dd className="mt-1 text-text">
            {next ? (
              <>
                <span className="text-2xl font-semibold tabular-nums">{formatNumber(Math.max(0, next.daysUntil))}</span>{" "}
                <span className="text-sm">{next.daysUntil === 1 ? "day" : "days"}</span>
                <span className="block truncate text-sm text-muted">{next.name}</span>
              </>
            ) : (
              <span className="text-sm text-muted">No exam date set</span>
            )}
          </dd>
        </div>
        <div className="bg-surface p-4">
          <dt className="text-sm text-muted">Study this week</dt>
          <dd className="mt-1 text-text">
            {week ? (
              <>
                <span className="text-2xl font-semibold tabular-nums">{formatDuration(week.minutes)}</span>
                <span className="block text-sm text-muted">Active on {formatCount(week.activeDays, "day")}</span>
              </>
            ) : (
              <span className="text-sm text-muted">Not shared</span>
            )}
          </dd>
        </div>
        <div className="bg-surface p-4">
          <dt className="text-sm text-muted">Latest result</dt>
          <dd className="mt-1 text-text">
            {resultsLocked ? (
              <span className="text-sm text-muted">{NOT_IN_PLAN_TEXT}</span>
            ) : !results ? (
              <span className="text-sm text-muted">Not shared</span>
            ) : results[0] ? (
              <>
                <span className="text-2xl font-semibold tabular-nums">{formatPercent(results[0].percentage)}</span>
                <span className="block truncate text-sm text-muted">
                  {results[0].title ?? modeLabel(results[0].mode)} · {results[0].subjectName}
                </span>
              </>
            ) : (
              <span className="text-sm text-muted">No tests yet</span>
            )}
          </dd>
        </div>
      </dl>

      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <section aria-label={`Recent results of ${child.name}`}>
          <h3 className="text-sm font-semibold text-text">Recent results</h3>
          {resultsLocked ? (
            <p className="mt-1 text-sm text-muted">{NOT_IN_PLAN_TEXT}, not in {child.firstName ?? child.name}&rsquo;s current plan.</p>
          ) : !results ? (
            <p className="mt-1 text-sm text-muted">Not shared.</p>
          ) : results.length === 0 ? (
            <p className="mt-1 text-sm text-muted">No marked tests yet.</p>
          ) : (
            <ul className="mt-1 space-y-1 text-sm">
              {results.map((result) => (
                <li key={result.attemptId} className="flex justify-between gap-3">
                  <span className="min-w-0 truncate text-text">{result.title ?? `${modeLabel(result.mode)}, ${result.subjectName}`}</span>
                  <span className="shrink-0 text-muted tabular-nums">{result.isProvisional ? "Marking" : formatPercent(result.percentage)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section aria-label={`Topics ${child.name} should work on`}>
          <h3 className="text-sm font-semibold text-text">Topics to work on</h3>
          {weakLocked ? (
            <p className="mt-1 text-sm text-muted">{NOT_IN_PLAN_TEXT}, not in {child.firstName ?? child.name}&rsquo;s current plan.</p>
          ) : !weak ? (
            <p className="mt-1 text-sm text-muted">Not shared.</p>
          ) : weak.length === 0 ? (
            <p className="mt-1 text-sm text-muted">None found yet.</p>
          ) : (
            <ul className="mt-1 space-y-1.5 text-sm">
              {weak.map((topic) => (
                <li key={topic.topicId} className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-text">{topic.topicName}</span>
                  <MasteryBadge band={topic.band} size="sm" />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </article>
  );
}
