import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPercent } from "@/lib/format";

export interface RecentMockRow {
  attemptId: string;
  subjectName: string;
  title: string | null;
  percentage: number | null;
  gradeEstimate: string | null;
  isProvisional: boolean;
  submittedAt: Date | null;
}

export interface RecentMocksProps {
  mocks: readonly RecentMockRow[];
  timeZone: string;
  className?: string;
}

/** §6 "mock exam scores": the latest mock exam results, each linking to its full analysis. Server component. */
export function RecentMocks({ mocks, timeZone, className }: RecentMocksProps) {
  return (
    <Card as="section" aria-labelledby="recent-mocks-title" className={className}>
      <CardHeader titleAs="h2" title={<span id="recent-mocks-title">Mock exam scores</span>} />
      <CardBody>
        {mocks.length === 0 ? (
          <EmptyState
            appearance="plain"
            titleAs="h3"
            icon={<ClipboardList aria-hidden="true" />}
            title="No mock exams yet"
            description="A timed mock exam shows your score, an estimated grade and what to study next."
            action={
              <ButtonLink href="/app/exams" variant="outline">
                Browse exams
              </ButtonLink>
            }
          />
        ) : (
          <ul className="divide-y divide-border">
            {mocks.map((mock) => (
              <li key={mock.attemptId} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <Link
                    href={`/app/exams/attempt/${mock.attemptId}/results`}
                    className="-my-2 inline-flex min-h-11 items-center py-2 text-sm font-semibold text-text underline-offset-4 hover:underline"
                  >
                    <span className="break-words">{mock.title ?? "Mock exam"}</span>
                  </Link>
                  <p className="text-xs text-muted">
                    {mock.subjectName}
                    {mock.submittedAt ? ` · ${formatInstantDate(mock.submittedAt, timeZone)}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-lg font-semibold text-text tabular-nums">{formatPercent(mock.percentage)}</span>
                  {mock.isProvisional ? (
                    <Badge tone="warning" size="sm">
                      Marking in progress
                    </Badge>
                  ) : (
                    mock.gradeEstimate && (
                      <Badge tone="neutral" size="sm">
                        Est. grade {mock.gradeEstimate}
                      </Badge>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
