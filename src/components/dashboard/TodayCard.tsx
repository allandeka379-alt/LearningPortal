import { ArrowRight, CalendarDays, CircleCheck } from "lucide-react";
import Link from "next/link";
import { formatLocalDate } from "@/components/student/format";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { formatCount, formatDuration } from "@/lib/format";
import { activityLabel, planItemHref, reasonLabel } from "./links";

export interface TodayPlanItem {
  id: string;
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

export interface TodayCardProps {
  today: string;
  dailyTarget: { minutes: number; source: "PLAN" | "GOAL" | "DEFAULT"; minutesStudiedToday: number; goalMet: boolean };
  /** `null` = no study plan yet. */
  plan: { items: readonly TodayPlanItem[] } | null;
  className?: string;
}

const TARGET_SOURCE: Record<TodayCardProps["dailyTarget"]["source"], string> = {
  PLAN: "From your study plan",
  GOAL: "Your daily goal",
  DEFAULT: "Suggested daily goal. You can change it in Settings.",
};

const STATUS: Record<string, { label: string; tone: BadgeTone }> = {
  DONE: { label: "Done", tone: "success" },
  PARTIAL: { label: "Partly done", tone: "info" },
  SKIPPED: { label: "Skipped", tone: "neutral" },
  MISSED: { label: "Missed", tone: "neutral" },
};

function itemTitle(item: TodayPlanItem): string {
  return item.lessonTitle ?? item.assessmentTitle ?? item.topicName ?? item.subjectName;
}

/**
 * §6 "Today's target" and "current study plan": minutes studied against the day's target, then today's plan items
 * (or a calm invitation to create a plan). Server component.
 */
export function TodayCard({ today, dailyTarget, plan, className }: TodayCardProps) {
  const studied = Math.max(0, dailyTarget.minutesStudiedToday);
  // `goalMet` is the streak day (one qualifying activity, gamification); the bar is about minutes, so it only turns
  // green once the minutes target itself is reached.
  const targetReached = dailyTarget.minutes > 0 && studied >= dailyTarget.minutes;
  return (
    <Card as="section" aria-labelledby="today-title" className={className}>
      <CardHeader titleAs="h2" title={<span id="today-title">Today</span>} description={formatLocalDate(today, "weekday")} />
      <CardBody className="space-y-5">
        <div className="space-y-2">
          <p className="text-base text-text">
            Today&rsquo;s target: <span className="font-semibold">{formatDuration(dailyTarget.minutes, { style: "long" })}</span>
          </p>
          <ProgressBar
            label="Studied today"
            value={Math.min(studied, dailyTarget.minutes)}
            max={Math.max(1, dailyTarget.minutes)}
            valueText={`${formatDuration(studied)} of ${formatDuration(dailyTarget.minutes)}`}
            tone={targetReached ? "success" : "primary"}
          />
          <p className="text-sm text-muted">{TARGET_SOURCE[dailyTarget.source]}</p>
          {(targetReached || dailyTarget.goalMet) && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-success-text">
              <CircleCheck aria-hidden="true" className="size-4" />
              {targetReached ? "Today’s target reached" : "Today counts towards your streak"}
            </p>
          )}
        </div>

        {plan === null ? (
          <div className="rounded-control border border-dashed border-border p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-text">
              <CalendarDays aria-hidden="true" className="size-4 text-muted" />
              No study plan yet
            </p>
            <p className="mt-1 text-sm text-muted">
              Get a weekly schedule built from your subjects, your exam date and the topics that need the most work.
            </p>
            <ButtonLink href="/app/plan" variant="secondary" className="mt-3">
              Create my study plan
            </ButtonLink>
          </div>
        ) : plan.items.length === 0 ? (
          <div className="rounded-control bg-subtle p-4">
            <p className="text-sm text-text">Nothing is scheduled for today in your study plan.</p>
            <Link href="/app/plan" className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
              Open your study plan
            </Link>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-text">Today&rsquo;s plan</h3>
            <ol className="divide-y divide-border rounded-control border border-border">
              {plan.items.map((item) => {
                const status = STATUS[item.status];
                const done = item.status === "DONE";
                return (
                  <li key={item.id} className="flex items-center gap-3 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted">
                        {activityLabel(item.activityType)} · {item.subjectName}
                      </p>
                      <p className={cn("truncate text-sm font-semibold", done ? "text-muted" : "text-text")}>{itemTitle(item)}</p>
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
                        size="md"
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
        )}
      </CardBody>
    </Card>
  );
}
