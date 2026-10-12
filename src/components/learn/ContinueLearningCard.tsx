import { ArrowRight, BookOpen, CircleCheck, Lock } from "lucide-react";
import { lessonHref } from "@/components/lessons/labels";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import { courseHref, type CourseNextLesson } from "./CourseCard";
import { continueVerb, lessonsProgressText, nextLessonCaption } from "./format";

export interface ContinueLearningCardProps {
  /** The course and lesson to continue (dashboard read model); null when no course has a lesson to offer. */
  item: {
    course: { subjectId: string; name: string; completedLessons: number; totalLessons: number };
    lesson: CourseNextLesson;
  } | null;
  /** What the student's courses look like, for an honest state when there is nothing to continue. */
  library: { courses: number; lessons: number };
  className?: string;
}

/**
 * The dashboard's lead card (design brief: "Continue learning"): the next lesson of the course the student studied
 * most recently, with the course's lesson progress. Without one it says why: no subjects yet, lessons still being
 * added, or every published lesson completed. Server component.
 */
export function ContinueLearningCard({ item, library, className }: ContinueLearningCardProps) {
  if (!item) {
    const state =
      library.courses === 0
        ? { title: "Choose your subjects", body: "Each subject you take becomes a course: lessons in syllabus order, then practice and tests.", href: "/app/subjects/manage", cta: "Add subjects" }
        : library.lessons === 0
          ? { title: "Lessons are on their way", body: "Lessons for your subjects are being added. You can practise and take tests in the meantime.", href: "/app/practice", cta: "Practise instead" }
          : { title: "Every lesson completed", body: "You have finished all the lessons published for your subjects so far. Keep practising to stay sharp.", href: "/app/practice", cta: "Practise" };
    return (
      <Card as="section" aria-labelledby="continue-learning-title" className={className}>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="min-w-0 space-y-1">
            <h2 id="continue-learning-title" className="flex items-center gap-2 text-base font-semibold text-text">
              {library.lessons > 0 && library.courses > 0 ? (
                <CircleCheck aria-hidden="true" className="size-5 text-success-text" />
              ) : (
                <BookOpen aria-hidden="true" className="size-5 text-muted" />
              )}
              {state.title}
            </h2>
            <p className="text-sm text-muted">{state.body}</p>
          </div>
          <ButtonLink href={state.href} variant="outline" className="shrink-0">
            {state.cta}
          </ButtonLink>
        </div>
      </Card>
    );
  }

  const { course, lesson } = item;
  const verb = continueVerb(lesson.reason);
  return (
    <Card as="section" aria-labelledby="continue-learning-title" className={cn("overflow-hidden", className)}>
      <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0 space-y-3">
          <div className="space-y-1">
            <h2 id="continue-learning-title" className="text-sm font-semibold text-primary">
              Continue learning
            </h2>
            <p className="text-sm text-muted">
              {course.name} · {nextLessonCaption(lesson.reason).toLowerCase()}
            </p>
          </div>
          <p className="flex items-start gap-2 text-xl leading-snug font-bold tracking-tight break-words text-text sm:text-2xl">
            {lesson.locked && <Lock aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-muted" />}
            <span className="min-w-0">{lesson.title}</span>
            {lesson.locked && <span className="sr-only"> (locked)</span>}
          </p>
          <p className="text-sm text-muted">
            {lesson.unitName ? `${lesson.unitName} · ` : ""}
            {formatDuration(lesson.estimatedMinutes)} read
          </p>
          <ProgressBar
            label="Course progress"
            value={course.completedLessons}
            max={course.totalLessons}
            valueText={lessonsProgressText(course.completedLessons, course.totalLessons)}
            size="sm"
            className="max-w-md"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <ButtonLink
            href={lessonHref(lesson.id, { topicId: lesson.topicId })}
            size="lg"
            iconEnd={<ArrowRight aria-hidden="true" />}
            aria-label={`${verb}: ${lesson.title}`}
          >
            {verb} lesson
          </ButtonLink>
          <ButtonLink href={courseHref(course.subjectId)} variant="ghost">
            Open course
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
