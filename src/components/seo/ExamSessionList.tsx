import { CalendarDays, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { ExamSessionView } from "@/server/seo/pages";

export interface ExamSessionListProps {
  sessions: readonly ExamSessionView[];
  /** e.g. "ZIMSEC O-Level", for the empty state. */
  label: string;
}

/**
 * Upcoming examination sessions of a qualification (§5, §17). Provisional dates are labelled as such until an admin
 * confirms them against the board's timetable; demo sessions (dev seed only) say so. Server component.
 */
export function ExamSessionList({ sessions, label }: ExamSessionListProps) {
  if (sessions.length === 0) {
    return <p className="text-sm text-muted">No upcoming {label} exam sessions have been published yet.</p>;
  }
  const anyProvisional = sessions.some((session) => session.isProvisional);
  return (
    <div>
      <ul role="list" className="space-y-3">
        {sessions.map((session) => (
          <li key={session.id} className="flex items-start gap-3 rounded-control bg-bg p-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft">
              <CalendarDays aria-hidden="true" className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-text">{session.name}</p>
              <p className="text-sm text-muted tabular-nums">
                <time dateTime={session.startsOn}>{session.dateLabel}</time>
              </p>
              {(session.isProvisional || session.isDemo) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {session.isProvisional && (
                    <Badge tone="neutral" appearance="outline" size="sm">
                      Provisional dates
                    </Badge>
                  )}
                  {session.isDemo && (
                    <Badge tone="info" size="sm">
                      Demo data
                    </Badge>
                  )}
                </div>
              )}
              {session.sourceUrl && (
                <a
                  href={session.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Official timetable
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
      {anyProvisional && (
        <p className="mt-3 text-xs text-muted">
          Provisional dates are estimates until they are confirmed against the examination board&apos;s official timetable.
        </p>
      )}
    </div>
  );
}
