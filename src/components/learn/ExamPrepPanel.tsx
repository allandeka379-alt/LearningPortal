import { CalendarClock, ClipboardList, Target } from "lucide-react";
import Link from "next/link";
import { practiceHref } from "@/components/dashboard/links";
import { formatLocalDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { formatCount, formatNumber, formatPercent, pluralize } from "@/lib/format";
import { examMonthsSentence } from "./format";
import type { MasteryTopicRow } from "./MasteryTabsCard";

export interface ExamCountdownView {
  name: string;
  startsOn: string;
  endsOn?: string;
  daysUntil: number;
  isProvisional: boolean;
  isDemo: boolean;
}

export interface ExamPrepPanelProps {
  /** Null when no target exam is set (or the countdown is not part of the student's access). */
  countdown: ExamCountdownView | null;
  readiness: {
    /** Topic-weighted syllabus progress across subjects; null before any evidence. */
    progressPercent: number | null;
    topicsCompleted: number;
    topicsTotal: number;
    /** Latest marked mock exam. */
    lastMock: { subjectName: string; percentage: number | null; gradeEstimate: string | null } | null;
  };
  /** Weakest topics first (a few). */
  weakTopics: readonly MasteryTopicRow[];
  className?: string;
}

function CountdownBlock({ countdown }: { countdown: ExamCountdownView | null }) {
  if (!countdown) {
    return (
      <div className="space-y-2">
        <p className="text-base font-semibold text-text">No examination date yet</p>
        <p className="text-sm text-muted">Choose the examination you are writing to count down to it and plan your revision.</p>
        <Link href="/app/subjects/manage" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
          Set your target exam
        </Link>
      </div>
    );
  }
  const days = Math.floor(countdown.daysUntil);
  return (
    <div className="space-y-1.5">
      {days < 0 ? (
        <p className="text-2xl font-bold tracking-tight text-text">Under way</p>
      ) : days === 0 ? (
        <p className="text-2xl font-bold tracking-tight text-text">Starts today</p>
      ) : (
        <p className="text-text">
          <span className="block text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">{formatNumber(days)}</span>
          <span className="mt-1 block text-sm font-medium">{pluralize(days, "day")} to go</span>
        </p>
      )}
      <p className="text-sm text-muted">
        {countdown.name} · {days < 0 && countdown.endsOn ? `until ${formatLocalDate(countdown.endsOn)}` : `starts ${formatLocalDate(countdown.startsOn)}`}
      </p>
      {(countdown.isProvisional || countdown.isDemo) && (
        <div className="flex flex-wrap gap-2 pt-0.5">
          {countdown.isProvisional && (
            <Badge tone="accent" size="sm">
              Provisional date
            </Badge>
          )}
          {countdown.isDemo && (
            <Badge tone="neutral" size="sm">
              Demo date (development only)
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

const BLOCK_TITLE = "flex items-center gap-2 text-sm font-semibold text-muted";

/**
 * "Exam preparation" on the dashboard (design brief journey 2): for students whose exam is within about ten months or
 * who are in their exam year. Countdown, readiness (syllabus progress and the latest mock), the weakest topics to fix,
 * and the way into mock exams and a revision plan. `id="exam-countdown"` is the header pill's target. Every value is
 * real; missing evidence is said in words (§50). Server component.
 */
export function ExamPrepPanel({ countdown, readiness, weakTopics, className }: ExamPrepPanelProps) {
  const mock = readiness.lastMock;
  return (
    <Card as="section" id="exam-countdown" aria-labelledby="exam-prep-title" className={cn("scroll-mt-20", className)}>
      <div className="flex flex-col gap-1 px-4 pt-4 sm:px-6 sm:pt-6">
        <h2 id="exam-prep-title" className="text-lg font-semibold text-text">
          Exam preparation
        </h2>
        <p className="text-sm text-muted">Revise every topic, rehearse with mock exams and fix your weakest topics first.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
        <div className="md:pr-6">
          <h3 className={BLOCK_TITLE}>
            <CalendarClock aria-hidden="true" className="size-4" />
            Countdown
          </h3>
          <div className="mt-2">
            <CountdownBlock countdown={countdown} />
          </div>
        </div>

        <div className="space-y-3 md:px-6">
          <h3 className={BLOCK_TITLE}>
            <ClipboardList aria-hidden="true" className="size-4" />
            Readiness
          </h3>
          <ProgressBar
            label="Syllabus progress"
            value={readiness.progressPercent}
            valueText={
              readiness.progressPercent === null
                ? undefined
                : `${formatPercent(readiness.progressPercent)}${readiness.topicsTotal > 0 ? ` · ${formatNumber(readiness.topicsCompleted)} of ${formatCount(readiness.topicsTotal, "topic")}` : ""}`
            }
            size="sm"
          />
          <p className="text-sm text-muted">
            {mock ? (
              <>
                Latest mock ({mock.subjectName}):{" "}
                <span className="font-semibold text-text">{mock.percentage === null ? "being marked" : formatPercent(mock.percentage)}</span>
                {mock.gradeEstimate ? ` · estimated grade ${mock.gradeEstimate}` : ""}
              </>
            ) : (
              "No mock exam yet. A timed mock shows how ready you are."
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/app/exams" variant="primary" size="sm" iconStart={<ClipboardList aria-hidden="true" />}>
              Mock exams
            </ButtonLink>
            <ButtonLink href="/app/plan" variant="outline" size="sm">
              Revision plan
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-3 md:pl-6">
          <h3 className={BLOCK_TITLE}>
            <Target aria-hidden="true" className="size-4" />
            Topics to fix
          </h3>
          {weakTopics.length === 0 ? (
            <p className="text-sm text-muted">Practise your subjects and the topics that need the most work will show here.</p>
          ) : (
            <ul className="space-y-3">
              {weakTopics.map((topic) => (
                <li key={topic.topicId}>
                  <MasteryBar label={topic.name} score={topic.score} href={`/app/subjects/${topic.subjectId}/topics/${topic.topicId}`} />
                  <div className="mt-0.5 flex items-center justify-between gap-3 text-xs text-muted">
                    <span className="min-w-0 truncate">{topic.subjectName}</span>
                    <Link
                      href={practiceHref({ subjectId: topic.subjectId, topicId: topic.topicId, count: 10 })}
                      className="-my-3 inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Practise<span className="sr-only"> {topic.name}</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * The light exam line for students far from their exam (design brief: "Your exam is in N months"), with the
 * countdown's anchor so the header pill still lands somewhere. Server component.
 */
export function ExamDistanceLine({ countdown, months, className }: { countdown: ExamCountdownView; months: number; className?: string }) {
  return (
    <p id="exam-countdown" className={cn("flex scroll-mt-20 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted", className)}>
      <CalendarClock aria-hidden="true" className="size-4 shrink-0" />
      <span>
        <span className="font-semibold text-text">{examMonthsSentence(months)}</span> · {countdown.name}
        {countdown.isProvisional ? " (provisional date)" : ""}. For now, build your understanding topic by topic.
      </span>
    </p>
  );
}
