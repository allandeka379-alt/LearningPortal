import { BookOpen, Settings2 } from "lucide-react";
import type { Metadata } from "next";
import { CourseCard } from "@/components/learn/CourseCard";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { listCourses } from "@/server/lessons/course";

export const metadata: Metadata = { title: "Learn" };

/**
 * Learn: the course library (design brief IA). Each enrolled subject is a course of published lessons in the order of
 * the student's pinned syllabus version (§26), with real lesson progress and the lesson "Continue" opens. A subject
 * without published lessons says so instead of showing an empty course.
 */
export default async function LearnPage() {
  const actor = await requireOnboardedStudent({ next: "/app/subjects" });
  const courses = await listCourses(actor);

  return (
    <Container className="pb-10">
      <PageHeader
        title="Learn"
        description="Your courses follow the syllabus topic by topic. Read a lesson, check your understanding, then practise."
        actions={
          courses.length > 0 ? (
            <ButtonLink href="/app/subjects/manage" variant="outline" iconStart={<Settings2 aria-hidden="true" />}>
              Manage subjects
            </ButtonLink>
          ) : undefined
        }
      />
      {courses.length === 0 ? (
        <EmptyState
          motif
          icon={<BookOpen aria-hidden="true" />}
          title="You haven't added any subjects yet"
          description="Choose the subjects you are taking and each one becomes a course: lessons in syllabus order, practice and tests."
          action={<ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Your courses">
          {courses.map((course) => (
            <li key={course.subjectId}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
