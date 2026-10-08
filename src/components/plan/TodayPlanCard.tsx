import { CalendarCheck, Coffee } from "lucide-react";
import { formatLocalDate } from "@/components/student/format";
import type { FormAction } from "@/components/student/action-state";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatDuration } from "@/lib/format";
import type { TodayPlan } from "@/server/studyplan/service";
import { PlanItemRow } from "./PlanItemRow";
import { WEEKDAYS } from "./plan-copy";

export interface TodayPlanCardProps {
  today: TodayPlan;
  itemAction: FormAction;
}

/**
 * "Today" on the plan page (§6 "Today's target", §16): today's sessions first on every screen size, with minutes done
 * against minutes planned. Honest empty states for rest days and days with nothing left to plan. Server component.
 */
export function TodayPlanCard({ today, itemAction }: TodayPlanCardProps) {
  const weekday = WEEKDAYS[(new Date(`${today.date}T12:00:00.000Z`).getUTCDay() + 6) % 7]?.long ?? "today";
  const planned = today.plannedMinutes;
  return (
    <Card as="section" id="today" aria-labelledby="plan-today-title" className="scroll-mt-20">
      <CardHeader
        titleAs="h2"
        title={<span id="plan-today-title">Today</span>}
        description={`${formatLocalDate(today.date, "weekday")} · ${formatDuration(planned)} planned of ${formatDuration(today.availableMinutes)} available`}
      />
      <CardBody className="space-y-4">
        {planned > 0 && (
          <ProgressBar
            label="Done today"
            value={Math.min(today.doneMinutes, planned)}
            max={planned}
            valueText={`${formatDuration(today.doneMinutes)} of ${formatDuration(planned)} done`}
            tone={today.doneMinutes >= planned ? "success" : "primary"}
          />
        )}
        {today.items.length > 0 ? (
          <ol className="divide-y divide-border rounded-control border border-border" aria-label="Today's sessions">
            {today.items.map((item) => (
              <PlanItemRow key={item.id} item={item} interactive itemAction={itemAction} />
            ))}
          </ol>
        ) : today.availableMinutes === 0 ? (
          <p className="flex items-start gap-2 rounded-control bg-subtle p-4 text-sm text-text">
            <Coffee aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>
              No study time on {weekday}s in your plan, so today is a rest day. You can change your study days in the plan settings
              below.
            </span>
          </p>
        ) : (
          <p className="flex items-start gap-2 rounded-control bg-subtle p-4 text-sm text-text">
            <CalendarCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>Nothing is planned for today. Update your plan to plan the coming days from your latest results.</span>
          </p>
        )}
      </CardBody>
    </Card>
  );
}
