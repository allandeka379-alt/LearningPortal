import { ArrowRight, CalendarDays, CircleCheck } from "lucide-react";
import Link from "next/link";
import { activityLabel, planItemHref, reasonLabel } from "@/components/dashboard/links";
import { formatLocalDate } from "@/components/student/format";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { addDays } from "@/lib/dates";
import { formatCount, formatDuration } from "@/lib/format";

export interface WeekPlanItemView {
  id: string;
  date: string;
  subjectId: string;
  subjectName: string;
  topicId: string | null;
  topicName: string | null;
  lessonId: string | null;
  lessonTitle: string | null;
  assessmentId: string | null;
  assessmentTitle: string | null;
  activityType: string;
  reason: string;
  targetMinutes: number;
  targetQuestions: number | null;
  status: string;
}

export interface WeekPlanCardProps {
  today: string;
  dailyTarget: { minutes: number; minutesStudiedToday: number; goalMet: boolean };
  /** Null without an active study plan. */
  week: { items: readonly WeekPlanItemView[] } | null;
  className?: string;
}

const STATUS: Record<string, { label: string; tone: BadgeTone }> = {
  DONE: { label: "Done", tone: "success" },
  PARTIAL: { label: "Partly done", tone: "info" },
  SKIPPED: { label: "Skipped", tone: "neutral" },
  MISSED: { label: "Missed", tone: "neutral" },
};

function itemTitle(item: WeekPlanItemView): string {
  return item.lessonTitle ?? item.assessmentTitle ?? item.topicName ?? item.subjectName;
}

/** "Today", "Tomorrow", else the weekday ("Thursday 15 October"). */
export function dayHeading(date: string, today: string): string {
  if (date === today) return "Today";
  if (date === addDays(today, 1)) return "Tomorrow";
  return formatLocalDate(date, "weekday");
}

/** Plan items grouped by day, in date order (pure). */
export function groupByDay<T extends { date: string }>(items: readonly T[]): { date: string; items: T[] }[] {
  const days: { date: string; items: T[] }[] = [];
  for (const item of [...items].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))) {
    const last = days.at(-1);
    if (last && last.date === item.date) last.items.push(item);
    else days.push({ date: item.date, items: [item] });
  }
  return days;
}

/**
 * "This week" on the dashboard (§6, §16): today's study target, then the study plan's items for the next seven days
 * grouped by day (or a calm invitation to create a plan). Server component.
 */
export function WeekPlanCard({ today, dailyTarget, week, className }: WeekPlanCardProps) {
  const studied = Math.max(0, dailyTarget.minutesStudiedToday);
  const reached = dailyTarget.minutes > 0 && studied >= dailyTarget.minutes;
  const days = week ? groupByDay(week.items) : [];
  return (
    <Card as="section" aria-labelledby="this-week-title" className={className}>
      <CardHeader
        titleAs="h2"
        title={<span id="this-week-title">This week</span>}
        action={
          week ? (
            <Link href="/app/plan" className="-my-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
              Full plan
            </Link>
          ) : undefined
        }
      />
      <CardBody className="space-y-5">
        <div className="space-y-1.5">
          <ProgressBar
            label="Studied today"
            value={Math.min(studied, dailyTarget.minutes)}
            max={Math.max(1, dailyTarget.minutes)}
            valueText={`${formatDuration(studied)} of ${formatDuration(dailyTarget.minutes)}`}
            tone={reached ? "success" : "primary"}
            size="sm"
          />
          {(reached || dailyTarget.goalMet) && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-success-text">
              <CircleCheck aria-hidden="true" className="size-4" />
              {reached ? "Today’s target reached" : "Today counts towards your streak"}
            </p>
          )}
        </div>

        {week === null ? (
          <div className="rounded-control border border-dashed border-border p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-text">
              <CalendarDays aria-hidden="true" className="size-4 text-muted" />
              No study plan yet
            </p>
            <p className="mt-1 text-sm text-muted">Get a weekly schedule built from your subjects, your exam date and the topics that need the most work.</p>
            <ButtonLink href="/app/plan" variant="secondary" className="mt-3">
              Create my study plan
            </ButtonLink>
          </div>
        ) : days.length === 0 ? (
          <p className="rounded-control bg-subtle p-4 text-sm text-text">Nothing is scheduled in your study plan for the next seven days.</p>
        ) : (
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day.date}>
                <h3 className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">{dayHeading(day.date, today)}</h3>
                <ol className="divide-y divide-border rounded-control border border-border">
                  {day.items.map((item) => {
                    const status = STATUS[item.status];
                    const done = item.status === "DONE";
                    return (
                      <li key={item.id} className="flex items-center gap-3 p-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-muted">
                            {activityLabel(item.activityType)} · {item.subjectName}
                          </p>
                          <p className={cn("text-sm font-semibold break-words", done ? "text-muted" : "text-text")}>{itemTitle(item)}</p>
                          <p className="mt-0.5 text-xs text-muted">
                            {formatDuration(item.targetMinutes)}
                            {item.targetQuestions ? ` · ${formatCount(item.targetQuestions, "question")}` : ""} · {reasonLabel(item.reason)}
                          </p>
                        </div>
                        {status ? (
                          <Badge tone={status.tone} size="sm">
                            {status.label}
                          </Badge>
                        ) : (
                          <ButtonLink
                            href={planItemHref(item)}
                            size="sm"
                            variant="outline"
                            iconEnd={<ArrowRight aria-hidden="true" />}
                            aria-label={`Start: ${activityLabel(item.activityType)}, ${itemTitle(item)}`}
                          >
                            Start
                          </ButtonLink>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
