import { CalendarClock } from "lucide-react";
import Link from "next/link";
import { countdownSentence } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount, formatNumber, formatPercent } from "@/lib/format";

export interface SubjectCardData {
  subjectId: string;
  name: string;
  qualificationName: string;
  status: "ACTIVE" | "PAUSED" | "COMPLETED" | "DROPPED";
  syllabus: { title: string; versionLabel: string; status: string };
  targetGrade: string | null;
  countdown: { daysUntil: number; name: string; isProvisional: boolean } | null;
  progress: {
    progressPercent: number;
    syllabusCoveragePercent: number;
    topicsTotal: number;
    topicsCompleted: number;
    questionsAttempted: number;
    accuracyPercent: number | null;
    predictedGrade: string | null;
  } | null;
}

const VERSION_STATUS: Record<string, string> = {
  UPCOMING: "Upcoming syllabus",
  SUPERSEDED: "Previous syllabus",
  ARCHIVED: "Retired syllabus",
};

/**
 * One enrolled subject (§7 entry point): progress over the PINNED syllabus version (§26, labelled with its version),
 * topics completed, accuracy, target grade and countdown. The whole card is one link to the subject dashboard.
 * Server component.
 */
export function SubjectCard({ subject }: { subject: SubjectCardData }) {
  const p = subject.progress;
  const versionNote = VERSION_STATUS[subject.syllabus.status];
  return (
    <Card as="article" interactive className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">{subject.qualificationName}</p>
          <h2 className="mt-0.5 text-lg font-semibold text-text">
            <Link href={`/app/subjects/${subject.subjectId}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {subject.name}
            </Link>
          </h2>
        </div>
        {subject.status === "PAUSED" && (
          <Badge tone="neutral" size="sm">
            Paused
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted">
        {subject.syllabus.title} · version {subject.syllabus.versionLabel}
        {versionNote ? ` · ${versionNote}` : ""}
      </p>
      <ProgressBar
        label="Syllabus progress"
        value={p ? p.progressPercent : null}
        valueText={p ? formatPercent(p.progressPercent) : undefined}
      />
      <p className="text-sm text-muted">
        {p && p.topicsTotal > 0
          ? `${formatNumber(p.topicsCompleted)} of ${formatCount(p.topicsTotal, "topic")} completed`
          : "Not started yet"}
        {p && p.questionsAttempted > 0 ? ` · ${formatCount(p.questionsAttempted, "question")}` : ""}
        {p && p.accuracyPercent !== null ? ` · ${formatPercent(p.accuracyPercent)} accuracy` : ""}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        {subject.targetGrade && (
          <Badge tone="neutral" size="sm">
            Target grade {subject.targetGrade}
          </Badge>
        )}
        {p?.predictedGrade && (
          <Badge tone="primary" size="sm">
            Est. grade {p.predictedGrade}
          </Badge>
        )}
        {subject.countdown && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
            <CalendarClock aria-hidden="true" className="size-3.5" />
            {countdownSentence(subject.countdown.daysUntil)}
            {subject.countdown.isProvisional ? " (provisional)" : ""}
          </span>
        )}
      </div>
    </Card>
  );
}
