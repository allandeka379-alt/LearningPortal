import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { EMPTY_VALUE, formatPercent } from "@/lib/format";
import type { ExamHistoryItem } from "@/server/exams/service";
import { attemptStatusLabel } from "./labels";

export interface AttemptHistoryListProps {
  items: readonly ExamHistoryItem[];
  timeZone: string;
  /** Hide the subject name when the list is already filtered to one subject. */
  showSubject?: boolean;
  /** "Continue" rows for attempts in progress (exam room) instead of results. */
  resume?: boolean;
}

/**
 * Past (or unfinished) tests and exams with their score and estimated grade; each row opens the results (or the exam
 * room to continue). Scores are the stored results, never recomputed. Server component.
 */
export function AttemptHistoryList({ items, timeZone, showSubject = true, resume = false }: AttemptHistoryListProps) {
  return (
    <ul className="divide-y divide-border rounded-card border border-border bg-surface">
      {items.map((item) => {
        const status = attemptStatusLabel(item.status, item.submitReason, item.isProvisional);
        const date = formatInstantDate(resume ? item.startedAt : (item.submittedAt ?? item.startedAt), timeZone);
        const details = [item.modeLabel, ...(showSubject ? [item.subjectName] : []), resume ? `Started ${date}` : date];
        return (
          <li key={item.attemptId} className="relative flex items-center gap-3 px-4 py-3 hover:bg-subtle has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-focus">
            <div className="min-w-0 flex-1 space-y-0.5">
              <Link href={item.href} className="font-semibold break-words text-text after:absolute after:inset-0 focus-visible:outline-none">
                {item.title}
              </Link>
              <p className="text-sm text-muted">{details.join(" · ")}</p>
              {status && (
                <Badge tone={status.tone} size="sm">
                  {status.text}
                </Badge>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2 text-right">
              {resume ? (
                <span className="text-sm font-semibold text-primary">Continue</span>
              ) : (
                <div>
                  <p className="text-base font-semibold text-text tabular-nums">
                    {item.percentage === null ? (
                      <>
                        <span aria-hidden="true">{EMPTY_VALUE}</span>
                        <span className="sr-only">No score yet</span>
                      </>
                    ) : (
                      formatPercent(item.percentage)
                    )}
                  </p>
                  {item.gradeEstimate && <p className="text-xs text-muted">Est. grade {item.gradeEstimate}</p>}
                </div>
              )}
              <ChevronRight aria-hidden="true" className="size-4 text-muted" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
