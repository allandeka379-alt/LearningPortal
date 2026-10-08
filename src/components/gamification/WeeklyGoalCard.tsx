import { CalendarDays, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { formatLocalDate } from "@/components/student/format";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount, formatDuration, formatNumber } from "@/lib/format";

export interface WeeklyGoalCardProps {
  goal: {
    weekStart: string;
    daysMet: number;
    goalDays: number;
    achieved: boolean;
    daysLeft: number;
    stillPossible: boolean;
    minutes: { target: number; source: "CUSTOM" | "DAILY_GOAL" | "DEFAULT"; done: number };
    xp: { target: number | null; done: number };
  };
  /** The edit form (client island). */
  form?: ReactNode;
}

function daysLine(goal: WeeklyGoalCardProps["goal"]): string {
  if (goal.achieved) return "Weekly goal met for this week.";
  if (!goal.stillPossible) return "Not reachable this week any more. A new week starts on Monday.";
  const left = goal.goalDays - goal.daysMet;
  return `${formatCount(left, "more day")} to go, with ${formatCount(goal.daysLeft, "day")} left this week.`;
}

const SOURCE: Record<WeeklyGoalCardProps["goal"]["minutes"]["source"], string> = {
  CUSTOM: "your target",
  DAILY_GOAL: "from your daily goal",
  DEFAULT: "suggested",
};

/**
 * This week's goal (§19 weekly goals): days with the daily goal met (the goal that earns a streak freeze), study time
 * against the weekly target, and XP against the optional XP target. Real values only. Server component.
 */
export function WeeklyGoalCard({ goal, form }: WeeklyGoalCardProps) {
  return (
    <Card as="section" aria-labelledby="weekly-goal-title">
      <CardHeader
        titleAs="h2"
        title={<span id="weekly-goal-title">This week</span>}
        description={`Week starting ${formatLocalDate(goal.weekStart, "weekday")}`}
      />
      <CardBody className="space-y-5">
        <div className="space-y-2">
          <ProgressBar
            label="Days with your daily goal met"
            value={Math.min(goal.daysMet, goal.goalDays)}
            max={goal.goalDays}
            valueText={`${goal.daysMet} of ${goal.goalDays} days`}
            tone={goal.achieved ? "success" : "primary"}
          />
          <p className="flex items-start gap-1.5 text-sm text-muted">
            {goal.achieved ? <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success-text" /> : <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
            <span>{daysLine(goal)}</span>
          </p>
        </div>
        <ProgressBar
          label={`Study time (${SOURCE[goal.minutes.source]})`}
          value={Math.min(goal.minutes.done, goal.minutes.target)}
          max={goal.minutes.target}
          valueText={`${formatDuration(goal.minutes.done)} of ${formatDuration(goal.minutes.target)}`}
          tone="accent"
        />
        {goal.xp.target !== null ? (
          <ProgressBar
            label="XP this week"
            value={Math.min(goal.xp.done, goal.xp.target)}
            max={goal.xp.target}
            valueText={`${formatNumber(goal.xp.done)} of ${formatNumber(goal.xp.target)} XP`}
          />
        ) : (
          <p className="text-sm text-muted">{formatNumber(goal.xp.done)} XP earned this week. Set an XP target below if it helps you plan.</p>
        )}
        {form && (
          <details className="group rounded-control border border-border p-4">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-text">Change weekly targets</summary>
            <div className="pt-3">{form}</div>
          </details>
        )}
      </CardBody>
    </Card>
  );
}
