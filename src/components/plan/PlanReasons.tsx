import { Lightbulb } from "lucide-react";
import { formatInstantDate, formatLocalDate } from "@/components/student/format";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatDuration } from "@/lib/format";
import type { PlanItemView, PlanSummary } from "@/server/studyplan/service";
import { examDateText, planReasonGroups } from "./plan-copy";

export interface PlanReasonsProps {
  plan: PlanSummary;
  /** Items from today for the next two weeks. */
  upcoming: readonly PlanItemView[];
  timeZone: string;
}

/**
 * "Why this plan" (§16 adapts to performance, remaining syllabus, time available, exam date, weak topics): the reasons
 * behind the coming fortnight, taken from the items' own reasons, plus the plan's time and exam-date rules.
 */
export function PlanReasons({ plan, upcoming, timeZone }: PlanReasonsProps) {
  const groups = planReasonGroups(upcoming);
  const exam = examDateText(plan);
  const updated = plan.lastAdaptedAt ?? plan.generatedAt;
  return (
    <Card as="section" aria-labelledby="plan-why-title">
      <CardHeader
        titleAs="h2"
        title={
          <span id="plan-why-title" className="inline-flex items-center gap-2">
            <Lightbulb aria-hidden="true" className="size-4.5 text-accent-text" />
            Why this plan
          </span>
        }
        description={`Last updated ${formatInstantDate(updated, timeZone)}`}
      />
      <CardBody>
        <ul className="space-y-3">
          <li className="text-sm">
            <p className="font-semibold text-text">Your time</p>
            <p className="text-muted">
              {formatDuration(plan.weeklyTargetMinutes, { style: "long" })} a week. No day gets more than the time you said you have.
            </p>
          </li>
          <li className="text-sm">
            <p className="font-semibold text-text">Your exam</p>
            <p className="text-muted">
              {exam
                ? plan.daysUntilExam !== null && plan.daysUntilExam > 0
                  ? `Planned towards ${exam}, up to ${formatLocalDate(plan.endsOn)}.`
                  : `Your exam date (${exam}) has passed. Rebuild your plan with your next examination.`
                : `No exam date: a rolling plan up to ${formatLocalDate(plan.endsOn)} that keeps every topic moving.`}
            </p>
          </li>
          {groups.map((group) => (
            <li key={group.key} className="text-sm">
              <p className="font-semibold text-text">{group.title}</p>
              <p className="text-muted">{group.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          After practice or a test, use Update my plan to re-plan the coming days from your latest results. What you have done stays
          in the plan.
        </p>
      </CardBody>
    </Card>
  );
}
