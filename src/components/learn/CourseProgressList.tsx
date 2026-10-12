import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { courseHref } from "./CourseCard";
import { lessonsProgressText } from "./format";

export interface CourseProgressRow {
  subjectId: string;
  name: string;
  completedLessons: number;
  totalLessons: number;
}

/**
 * Compact lesson progress per course for the dashboard ("Your courses"), linking to each course and to the library.
 * Courses without published lessons say so. Server component.
 */
export function CourseProgressList({ courses, className }: { courses: readonly CourseProgressRow[]; className?: string }) {
  return (
    <Card as="section" aria-labelledby="your-courses-title" className={className}>
      <CardHeader
        titleAs="h2"
        title={<span id="your-courses-title">Your courses</span>}
        action={
          <Link href="/app/subjects" className="-my-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
            All courses
          </Link>
        }
      />
      <CardBody>
        {courses.length === 0 ? (
          <p className="text-sm text-muted">Add your subjects to start your courses.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course.subjectId}>
                <Link href={courseHref(course.subjectId)} className="mb-1 inline-flex min-h-11 items-center font-semibold text-text underline-offset-4 hover:underline">
                  {course.name}
                </Link>
                {course.totalLessons > 0 ? (
                  <ProgressBar
                    label={`${course.name} lessons`}
                    labelHidden
                    value={course.completedLessons}
                    max={course.totalLessons}
                    valueText={lessonsProgressText(course.completedLessons, course.totalLessons)}
                    size="sm"
                  />
                ) : (
                  <p className="text-sm text-muted">Lessons for this subject are being added.</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
