import { BookOpen, Settings2 } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SubjectCard } from "@/components/subjects/SubjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { listStudentSubjects } from "@/server/progress/student-overview";

export const metadata: Metadata = { title: "Subjects" };

/** The student's subjects (§7 entry point) with progress over each pinned syllabus version (§26). */
export default async function SubjectsPage() {
  const actor = await requireOnboardedStudent({ next: "/app/subjects" });
  const subjects = await listStudentSubjects(actor);

  return (
    <Container className="pb-10">
      <PageHeader
        title="Subjects"
        description="Your progress in each subject, measured against the syllabus version you are studying."
        actions={
          subjects.length > 0 ? (
            <ButtonLink href="/app/subjects/manage" variant="outline" iconStart={<Settings2 aria-hidden="true" />}>
              Manage subjects
            </ButtonLink>
          ) : undefined
        }
      />
      {subjects.length === 0 ? (
        <EmptyState
          motif
          icon={<BookOpen aria-hidden="true" />}
          title="You haven't added any subjects yet"
          description="Choose the subjects you are taking to unlock lessons, practice questions and progress tracking."
          action={<ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => (
            <li key={subject.subjectId}>
              <SubjectCard subject={subject} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
