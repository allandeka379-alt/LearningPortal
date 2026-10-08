import { CalendarClock, Clock, ListChecks } from "lucide-react";
import { formatLocalDate } from "@/components/student/format";
import { StatTile } from "@/components/ui/StatTile";
import { formatDuration } from "@/lib/format";
import type { PlanSummary, WeekPlan } from "@/server/studyplan/service";
import { examDateText } from "./plan-copy";

export interface PlanOverviewProps {
  plan: PlanSummary;
  week: WeekPlan;
}

function examValue(daysUntilExam: number | null): { value: string | number; unit?: string } {
  if (daysUntilExam === null) return { value: "None" };
  if (daysUntilExam > 0) return { value: daysUntilExam, unit: daysUntilExam === 1 ? "day to go" : "days to go" };
  if (daysUntilExam === 0) return { value: "Today" };
  return { value: "Passed" };
}

/**
 * Three plan facts (§16, §17): time to the exam, weekly study time, and the shown week's progress. Real values only:
 * "None" with "Rolling four-week plan" instead of a made-up countdown.
 */
export function PlanOverview({ plan, week }: PlanOverviewProps) {
  const exam = examDateText(plan);
  const { value, unit } = examValue(plan.daysUntilExam);
  const planned = week.days.reduce((sum, d) => sum + d.plannedMinutes, 0);
  const done = week.days.reduce((sum, d) => sum + d.doneMinutes, 0);
  const isCurrentWeek = week.days.some((d) => d.isToday);
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatTile label="Exam" icon={<CalendarClock aria-hidden="true" />} value={value} unit={unit} hint={exam ?? "Rolling four-week plan"} />
      <StatTile label="Study time" icon={<Clock aria-hidden="true" />} value={formatDuration(plan.weeklyTargetMinutes)} unit="a week" hint="From your availability" />
      <StatTile
        label={isCurrentWeek ? "This week" : `Week of ${formatLocalDate(week.weekStart, "short")}`}
        icon={<ListChecks aria-hidden="true" />}
        value={formatDuration(done)}
        unit={`done of ${formatDuration(planned)}`}
        hint={plan.subjects.map((s) => s.name).join(", ") || undefined}
      />
    </div>
  );
}
