import { Megaphone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDateTime } from "@/components/admin/format";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { isUuid } from "@/server/teaching/access";
import { getMyClass, type MyClassDetail } from "@/server/teaching/student";
import { leaveClassAction } from "../actions";
import { AssignmentCard } from "../_components/AssignmentCard";
import { StudentActionButton } from "../_components/StudentActionButton";

export const metadata: Metadata = { title: "Class" };

async function load(actor: Awaited<ReturnType<typeof requireOnboardedStudent>>, classId: string): Promise<MyClassDetail> {
  try {
    return await getMyClass(actor, classId);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

/** One of the student's classes: announcements, work to do and handed-in work with scores and feedback. */
export default async function StudentClassPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  if (!isUuid(classId)) notFound();
  const actor = await requireOnboardedStudent({ next: `/app/classes/${classId}` });
  const { class: cls, assignments, announcements } = await load(actor, classId);
  const open = assignments.filter((a) => a.view.canWork && (a.view.state === "TO_DO" || a.view.state === "IN_PROGRESS" || a.view.state === "OVERDUE"));
  const rest = assignments.filter((a) => !open.includes(a));

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        breadcrumbs={[{ label: "Classes", href: "/app/classes" }, { label: cls.name }]}
        eyebrow={[cls.subjectName, cls.schoolName ?? "Independent tutor"].filter(Boolean).join(" · ")}
        title={cls.name}
        description={cls.teachers.length > 0 ? `Taught by ${cls.teachers.map((t) => t.name).join(", ")}.` : undefined}
        className="pb-0"
      />
      {cls.description && <p className="max-w-2xl text-sm text-muted">{cls.description}</p>}

      {announcements.length > 0 && (
        <Card as="section" aria-labelledby="ann-title">
          <CardHeader titleAs="h2" title={<span id="ann-title">Announcements</span>} />
          <CardBody>
            <ul className="space-y-4">
              {announcements.map((a) => (
                <li key={a.id} className="rounded-card border border-border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-semibold text-text">{a.title}</h3>
                    {a.pinned && <Badge tone="accent">Pinned</Badge>}
                  </div>
                  <p className="text-xs text-muted">{formatDateTime(a.publishedAt, actor.timeZone)}</p>
                  <RichContent html={a.bodyHtml} className="mt-2" />
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <section aria-labelledby="open-title" className="space-y-3">
        <h2 id="open-title" className="text-lg font-semibold text-text">
          To do
        </h2>
        {open.length === 0 ? (
          <EmptyState appearance="plain" titleAs="p" icon={<Megaphone aria-hidden="true" />} title="Nothing to do in this class right now" />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {open.map((a) => (
              <li key={a.id}>
                <AssignmentCard assignment={a} timeZone={actor.timeZone} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {rest.length > 0 && (
        <section aria-labelledby="done-title" className="space-y-3">
          <h2 id="done-title" className="text-lg font-semibold text-text">
            Handed in and closed
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {rest.map((a) => (
              <li key={a.id}>
                <AssignmentCard assignment={a} timeZone={actor.timeZone} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Card as="section" aria-labelledby="leave-title">
        <CardHeader titleAs="h2" title={<span id="leave-title">Leave this class</span>} description="Its teachers will no longer see your progress. You can join again with the code." />
        <CardBody>
          <StudentActionButton action={leaveClassAction} fields={{ classId: cls.id }} variant="outline" confirmText={`Leave ${cls.name}?`}>
            Leave class
          </StudentActionButton>
        </CardBody>
      </Card>
    </Container>
  );
}
