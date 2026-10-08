import Link from "next/link";
import type { ReactNode } from "react";
import { formatLocalDate } from "@/components/student/format";
import type { OnboardingSummary as Summary } from "@/server/onboarding/service";
import { stepHref, withOnboardingNext, type WizardStep } from "@/server/onboarding/steps";
import { abilityLabel, dailyGoalLabel, sessionDateStatus } from "./copy";

function Row({ label, step, next, children }: { label: string; step: WizardStep; next: string | null; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:gap-4">
      <dt className="text-sm font-medium text-muted sm:w-44 sm:shrink-0">{label}</dt>
      <dd className="flex min-w-0 flex-1 items-start justify-between gap-3 text-sm text-text">
        <span className="min-w-0 break-words">{children}</span>
        <Link
          href={withOnboardingNext(stepHref(step), next)}
          aria-label={`Change ${label.toLowerCase()}`}
          className="-my-2 inline-flex min-h-11 shrink-0 items-center rounded-control px-2 font-semibold text-primary underline-offset-4 hover:underline"
        >
          Change
        </Link>
      </dd>
    </div>
  );
}

/**
 * Answers so far, each with a "Change" link back to its screen (§5). Every value comes from the database; a missing
 * optional answer is said plainly ("Not sure yet", "No target yet"). Server component.
 */
export function OnboardingSummary({ summary, next = null }: { summary: Summary; next?: string | null }) {
  const examStatus = summary.exam ? sessionDateStatus(summary.exam) : null;
  return (
    <dl className="divide-y divide-border">
      <Row label="Country" step="country" next={next}>
        {summary.country ?? "Not chosen"}
      </Row>
      <Row label="Examination board" step="board" next={next}>
        {summary.board ?? "Not chosen"}
      </Row>
      <Row label="Level" step="level" next={next}>
        {summary.qualification ?? "Not chosen"}
      </Row>
      <Row label="Year or form" step="year" next={next}>
        {summary.yearGroup ?? "Not chosen"}
      </Row>
      <Row label="Subjects" step="subjects" next={next}>
        {summary.subjects.length > 0 ? summary.subjects.join(", ") : "None chosen"}
      </Row>
      <Row label="Target examination" step="exam" next={next}>
        {summary.exam ? (
          <>
            {summary.exam.name}
            <span className="text-muted">
              {" "}
              · starts {formatLocalDate(summary.exam.startsOn, "long")}
              {examStatus ? ` · ${examStatus}` : ""}
            </span>
          </>
        ) : (
          "Not sure yet"
        )}
      </Row>
      <Row label="Current ability" step="ability" next={next}>
        {abilityLabel(summary.abilityLevel) ?? "Not chosen"}
      </Row>
      <Row label="Target grade" step="grade" next={next}>
        {summary.targetGrade ?? "No target yet"}
      </Row>
      <Row label="Daily study goal" step="goal" next={next}>
        {dailyGoalLabel(summary.dailyGoalMinutes)}
      </Row>
    </dl>
  );
}
