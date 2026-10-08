import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { attemptModeLabel } from "@/components/dashboard/links";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPercent } from "@/lib/format";

export interface RecentTestRow {
  attemptId: string;
  mode: string;
  title: string | null;
  percentage: number | null;
  gradeEstimate: string | null;
  status: string;
  submittedAt: Date | null;
}

export interface RecentTestsProps {
  tests: readonly RecentTestRow[];
  subjectId: string;
  timeZone: string;
}

/** §7 "recent tests": the latest marked tests, mocks and diagnostics of the subject, each linking to its analysis. */
export function RecentTests({ tests, subjectId, timeZone }: RecentTestsProps) {
  if (tests.length === 0) {
    return (
      <EmptyState
        appearance="plain"
        titleAs="h3"
        icon={<ClipboardList aria-hidden="true" />}
        title="No tests yet"
        description="Topic tests and mock exams show your score and what to study next."
        action={
          <ButtonLink href={`/app/exams?subjectId=${encodeURIComponent(subjectId)}`} variant="outline">
            Find a test
          </ButtonLink>
        }
      />
    );
  }
  return (
    <ul className="divide-y divide-border">
      {tests.map((test) => {
        const marking = test.status === "AWAITING_MARKING" || test.status === "SUBMITTED";
        return (
          <li key={test.attemptId} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <Link
                href={`/app/exams/attempt/${test.attemptId}/results`}
                className="-my-2 inline-flex min-h-11 items-center py-2 text-sm font-semibold text-text underline-offset-4 hover:underline"
              >
                <span className="break-words">{test.title ?? attemptModeLabel(test.mode)}</span>
              </Link>
              <p className="text-xs text-muted">
                {attemptModeLabel(test.mode)}
                {test.submittedAt ? ` · ${formatInstantDate(test.submittedAt, timeZone)}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-base font-semibold text-text tabular-nums">{formatPercent(test.percentage)}</span>
              {marking ? (
                <Badge tone="warning" size="sm">
                  Marking in progress
                </Badge>
              ) : (
                test.gradeEstimate && (
                  <Badge tone="neutral" size="sm">
                    Est. grade {test.gradeEstimate}
                  </Badge>
                )
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
