import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { AssignmentForm } from "@/components/teacher/AssignmentForm";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { instantToLocalDateTime } from "@/server/cms/announcements/schemas";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { defaultDueDate } from "@/server/teaching/core";
import { getAssignmentFormOptions } from "@/server/teaching/assignments";
import { orNotFound } from "../../../../_lib/page";
import { createAssignmentAction } from "../../../actions";

export const metadata: Metadata = { title: "Set work" };

/** Set work for a class (§22): practice, a test or a lesson. Subject-less classes choose the subject first. */
export default async function NewAssignmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ classId: string }>;
  searchParams: Promise<{ subjectId?: string }>;
}) {
  const { classId } = await params;
  const { subjectId } = await searchParams;
  if (!isUuid(classId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}/assignments/new` });
  const options = await orNotFound(getAssignmentFormOptions(actor, classId, { subjectId: subjectId ?? null }));
  const cls = options.class;
  const weekAhead = defaultDueDate();

  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader cls={cls} section="assignments" title="Set work" trail={[{ label: "Assignments", href: `/teacher/classes/${cls.id}/assignments` }, { label: "Set work" }]} />
      <Card>
        <CardBody>
          <AssignmentForm
            basePath={`/teacher/classes/${cls.id}/assignments/new`}
            defaults={{ dueAt: instantToLocalDateTime(weekAhead, actor.timeZone) }}
            action={createAssignmentAction}
            options={{
              classId: cls.id,
              classSubject: cls.subjectId ? { id: cls.subjectId, name: cls.subjectName ?? "Class subject" } : null,
              subjects: options.subjects.map((s) => ({ id: s.id, label: s.qualificationLabel ? `${s.name} (${s.qualificationLabel})` : s.name })),
              subjectId: cls.subjectId ? null : options.subjectId,
              lessons: options.lessons,
              assessments: options.assessments,
              topics: options.topics,
              students: options.students,
            }}
          />
        </CardBody>
      </Card>
    </Container>
  );
}
