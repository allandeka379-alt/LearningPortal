import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount, formatNumber, formatPercent } from "@/lib/format";

export interface SubjectProgressRow {
  subjectId: string;
  name: string;
  qualificationName: string;
  progressPercent: number | null;
  topicsTotal: number;
  topicsCompleted: number;
  topicsRemaining: number;
  questionsAttempted: number;
  accuracyPercent: number | null;
  predictedGrade: string | null;
}

export interface SubjectProgressListProps {
  subjects: readonly SubjectProgressRow[];
  className?: string;
}

/**
 * §6 "subject progress": one bar per enrolled subject (mastery-weighted progress over the pinned syllabus), topics
 * completed / remaining, accuracy and the grade ESTIMATE when there is mock evidence. Links to each subject
 * dashboard. Server component.
 */
export function SubjectProgressList({ subjects, className }: SubjectProgressListProps) {
  return (
    <Card as="section" aria-labelledby="subject-progress-title" className={className}>
      <CardHeader
        titleAs="h2"
        title={<span id="subject-progress-title">Subject progress</span>}
        action={
          subjects.length > 0 ? (
            <Link href="/app/subjects" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
              All subjects
            </Link>
          ) : undefined
        }
      />
      <CardBody>
        {subjects.length === 0 ? (
          <EmptyState
            appearance="plain"
            titleAs="h3"
            icon={<BookOpen aria-hidden="true" />}
            title="No subjects yet"
            description="Add the subjects you are taking to get lessons, practice and progress tracking."
            action={<ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>}
          />
        ) : (
          <ul className="divide-y divide-border">
            {subjects.map((subject) => (
              <li key={subject.subjectId} className="py-4 first:pt-0 last:pb-0">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/app/subjects/${subject.subjectId}`}
                      className="-my-2 inline-flex min-h-11 items-center gap-1 py-2 text-base font-semibold text-text underline-offset-4 hover:underline"
                    >
                      <span className="break-words">{subject.name}</span>
                      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                    </Link>
                    <p className="text-xs text-muted">{subject.qualificationName}</p>
                  </div>
                  {subject.predictedGrade && (
                    <Badge tone="primary" size="sm" title="Estimated from your mock exams and topic mastery">
                      Est. grade {subject.predictedGrade}
                    </Badge>
                  )}
                </div>
                <ProgressBar
                  label={`${subject.name} progress`}
                  labelHidden
                  value={subject.progressPercent}
                  valueText={subject.progressPercent === null ? undefined : formatPercent(subject.progressPercent)}
                />
                <p className="mt-2 text-sm text-muted">
                  {subject.topicsTotal > 0
                    ? `${formatNumber(subject.topicsCompleted)} of ${formatCount(subject.topicsTotal, "topic")} completed · ${formatNumber(subject.topicsRemaining)} remaining`
                    : "No topics published for your syllabus yet"}
                  {subject.questionsAttempted > 0 && subject.accuracyPercent !== null
                    ? ` · ${formatPercent(subject.accuracyPercent)} accuracy`
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
