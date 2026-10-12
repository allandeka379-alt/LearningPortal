import { ArrowRight, BookOpen, CircleCheck, Lock } from "lucide-react";
import Link from "next/link";
import { lessonHref } from "@/components/lessons/labels";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardFooter } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import { continueVerb, lessonsProgressText, nextLessonCaption, qualificationLine, type NextLessonReasonLabel } from "./format";

export interface CourseNextLesson {
  id: string;
  title: string;
  topicId: string;
  unitName: string;
  estimatedMinutes: number;
  locked: boolean;
  reason: NextLessonReasonLabel;
}

export interface CourseCardData {
  subjectId: string;
  name: string;
  qualificationName: string;
  boardName: string;
  status: "ACTIVE" | "PAUSED" | "COMPLETED" | "DROPPED";
  totalLessons: number;
  completedLessons: number;
  unitsTotal: number;
  unitsWithLessons: number;
  next: CourseNextLesson | null;
}

export function courseHref(subjectId: string): string {
  return `/app/subjects/${subjectId}`;
}

/**
 * One course in the Learn library: subject, qualification, real lesson progress (completed of the published lessons in
 * the pinned syllabus version), the lesson a "Continue" button opens, and an honest note while a subject has no
 * published lessons yet. Server component.
 */
export function CourseCard({ course, headingLevel = "h2", className }: { course: CourseCardData; headingLevel?: "h2" | "h3"; className?: string }) {
  const Heading = headingLevel;
  const href = courseHref(course.subjectId);
  const hasLessons = course.totalLessons > 0;
  const finished = hasLessons && course.next === null;
  return (
    <Card as="article" className={cn("flex h-full flex-col", className)}>
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted">{qualificationLine(course.qualificationName, course.boardName)}</p>
          <Heading className="text-lg leading-snug font-semibold text-text">
            <Link href={href} className="rounded-sm underline-offset-4 hover:underline">
              {course.name}
            </Link>
          </Heading>
          {course.status === "PAUSED" && (
            <Badge tone="neutral" size="sm">
              Paused
            </Badge>
          )}
        </div>

        {hasLessons ? (
          <ProgressBar
            label="Lessons"
            value={course.completedLessons}
            max={course.totalLessons}
            valueText={lessonsProgressText(course.completedLessons, course.totalLessons)}
            tone={finished ? "success" : "primary"}
            size="sm"
          />
        ) : (
          <p className="flex items-start gap-2 rounded-control bg-subtle p-3 text-sm text-muted">
            <BookOpen aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>Lessons for this subject are being added.</span>
          </p>
        )}

        {course.next && (
          <div className="rounded-control border border-border p-3">
            <p className="text-xs font-medium text-muted">{nextLessonCaption(course.next.reason)}</p>
            <p className="mt-0.5 flex items-start gap-1.5 font-semibold break-words text-text">
              {course.next.locked && <Lock aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted" />}
              <span className="min-w-0">{course.next.title}</span>
              {course.next.locked && <span className="sr-only"> (locked)</span>}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {course.next.unitName ? `${course.next.unitName} · ` : ""}
              {formatDuration(course.next.estimatedMinutes)}
            </p>
          </div>
        )}

        {finished && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-success-text">
            <CircleCheck aria-hidden="true" className="size-4" />
            Every lesson completed
          </p>
        )}
      </div>

      <CardFooter className="gap-2">
        {course.next ? (
          <ButtonLink
            href={lessonHref(course.next.id, { topicId: course.next.topicId })}
            iconEnd={<ArrowRight aria-hidden="true" />}
            aria-label={`${continueVerb(course.next.reason)} ${course.name}: ${course.next.title}`}
            className="flex-1 sm:flex-none"
          >
            {continueVerb(course.next.reason)}
          </ButtonLink>
        ) : null}
        <ButtonLink href={href} variant={course.next ? "ghost" : "outline"} aria-label={`Open the ${course.name} course`} className="flex-1 sm:flex-none">
          {finished ? "Review the course" : "Open course"}
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
