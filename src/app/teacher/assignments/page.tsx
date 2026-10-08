import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssignmentTable } from "@/components/teacher/AssignmentTable";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireRole } from "@/server/auth/guards";
import { listTeacherAssignments } from "@/server/teaching/assignments";

export const metadata: Metadata = { title: "Assignments" };

/** Every assignment in the teacher's classes, newest first (cursor pagination). To set work, open a class. */
export default async function TeacherAssignmentsPage({ searchParams }: { searchParams: Promise<{ cursor?: string }> }) {
  const actor = await requireRole("TEACHER", { next: "/teacher/assignments" });
  const { cursor } = await searchParams;
  const page = await listTeacherAssignments(actor, { cursor: cursor ?? null, limit: 25 });
  return (
    <Container className="space-y-4 pb-10">
      <PageHeader title="Assignments" description="Work you and your co-teachers set. To set new work, open a class." className="pb-0" />
      <AssignmentTable
        items={page.items}
        timeZone={actor.timeZone}
        showClass
        empty={<EmptyState title="No work set yet" description="Open a class and choose Set work." action={<ButtonLink href="/teacher/classes">Your classes</ButtonLink>} />}
      />
      <nav aria-label="Pages" className="flex justify-end gap-2">
        {cursor && (
          <ButtonLink href="/teacher/assignments" variant="outline">
            Newest
          </ButtonLink>
        )}
        {page.nextCursor && (
          <ButtonLink href={`/teacher/assignments?cursor=${encodeURIComponent(page.nextCursor)}`} variant="outline">
            Older
          </ButtonLink>
        )}
      </nav>
    </Container>
  );
}
