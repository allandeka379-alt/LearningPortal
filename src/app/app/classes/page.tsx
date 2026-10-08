import { UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { listMyClassInvitations } from "@/server/teaching/invitations";
import { listMyAssignments, listMyClasses } from "@/server/teaching/student";
import { acceptInvitationAction, declineInvitationAction, joinClassAction } from "./actions";
import { AssignmentCard } from "./_components/AssignmentCard";
import { JoinClassForm } from "./_components/JoinClassForm";
import { StudentActionButton } from "./_components/StudentActionButton";

export const metadata: Metadata = { title: "Classes" };

/**
 * The student's classes (§22 student side): work to do across classes (due dates, late flags), invitations from
 * teachers, the classes they are in (and requests waiting for approval), and joining with a code.
 */
export default async function StudentClassesPage() {
  const actor = await requireOnboardedStudent({ next: "/app/classes" });
  const [classes, assignments, invitations] = await Promise.all([listMyClasses(actor), listMyAssignments(actor), listMyClassInvitations(actor)]);
  const toDo = assignments.filter((a) => a.view.canWork && (a.view.state === "TO_DO" || a.view.state === "IN_PROGRESS" || a.view.state === "OVERDUE"));

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader title="Classes" description="Work from your teachers, class announcements, and joining a class." className="pb-0" />

      {invitations.length > 0 && (
        <Card as="section" aria-labelledby="inv-title">
          <CardHeader titleAs="h2" title={<span id="inv-title">Invitations</span>} description="Joining lets the class's teachers see your progress in its subject." />
          <CardBody>
            <ul className="divide-y divide-border">
              {invitations.map((inv) => (
                <li key={inv.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-text">{inv.className}</p>
                    <p className="text-sm text-muted">
                      {[inv.subjectName, inv.schoolName ?? "Independent tutor", inv.invitedBy ? `from ${inv.invitedBy}` : null].filter(Boolean).join(" · ")} · until {formatDate(inv.expiresAt, actor.timeZone)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StudentActionButton action={acceptInvitationAction} fields={{ invitationId: inv.id }} ariaLabel={`Accept the invitation to ${inv.className}`}>
                      Accept
                    </StudentActionButton>
                    <StudentActionButton action={declineInvitationAction} fields={{ invitationId: inv.id }} variant="outline" ariaLabel={`Decline the invitation to ${inv.className}`}>
                      Decline
                    </StudentActionButton>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <section aria-labelledby="todo-title" className="space-y-3">
        <h2 id="todo-title" className="text-lg font-semibold text-text">
          To do
        </h2>
        {toDo.length === 0 ? (
          <EmptyState appearance="plain" titleAs="p" title="Nothing to do right now" description={classes.length === 0 ? "Join a class to receive work from your teachers." : "New work from your teachers appears here."} />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {toDo.map((a) => (
              <li key={a.id}>
                <AssignmentCard assignment={a} timeZone={actor.timeZone} showClass />
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section aria-labelledby="classes-title" className="space-y-3">
          <h2 id="classes-title" className="text-lg font-semibold text-text">
            Your classes
          </h2>
          {classes.length === 0 ? (
            <EmptyState icon={<UsersRound aria-hidden="true" />} title="You're not in a class yet" description="Enter the code your teacher gave you to join their class." />
          ) : (
            <ul className="space-y-3">
              {classes.map((cls) => (
                <li key={cls.id} className="rounded-card border border-border bg-surface p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      {cls.status === "ACTIVE" ? (
                        <Link href={`/app/classes/${cls.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                          {cls.name}
                        </Link>
                      ) : (
                        <span className="font-semibold text-text">{cls.name}</span>
                      )}
                      <p className="text-sm text-muted">{[cls.subjectName, cls.schoolName ?? "Independent tutor", cls.teachers.join(", ")].filter(Boolean).join(" · ")}</p>
                    </div>
                    {cls.status === "PENDING" ? (
                      <Badge tone="info">Waiting for approval</Badge>
                    ) : (
                      <span className="flex flex-wrap gap-1">
                        {cls.overdue > 0 && <Badge tone="warning">{`${cls.overdue} overdue`}</Badge>}
                        <Badge tone={cls.toDo > 0 ? "primary" : "neutral"}>{cls.toDo > 0 ? `${cls.toDo} to do` : "All done"}</Badge>
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Card as="section" aria-labelledby="join-title">
          <CardHeader titleAs="h2" title={<span id="join-title">Join a class</span>} />
          <CardBody>
            <JoinClassForm action={joinClassAction} />
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
