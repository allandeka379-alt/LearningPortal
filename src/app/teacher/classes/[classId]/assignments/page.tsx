import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { AssignmentTable } from "@/components/teacher/AssignmentTable";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { ButtonLink } from "@/components/ui/Button";
import { requireRole } from "@/server/auth/guards";
import { isUuid, loadClassForTeacher } from "@/server/teaching/access";
import { listClassAssignments } from "@/server/teaching/assignments";
import { orNotFound } from "../../../_lib/page";

export const metadata: Metadata = { title: "Class assignments" };

/** A class's work (§22): drafts, scheduled, open and closed assignments with hand-in counts. */
export default async function ClassAssignmentsPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  if (!isUuid(classId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}/assignments` });
  const [cls, items] = await orNotFound(Promise.all([loadClassForTeacher(actor, classId), listClassAssignments(actor, classId)]));
  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader
        cls={cls}
        section="assignments"
        actions={
          cls.archivedAt === null ? (
            <ButtonLink href={`/teacher/classes/${cls.id}/assignments/new`} iconStart={<Plus aria-hidden="true" />}>
              Set work
            </ButtonLink>
          ) : undefined
        }
      />
      <AssignmentTable items={items} timeZone={actor.timeZone} />
    </Container>
  );
}
