import { ClipboardCheck, Plus, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDateTime } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ASSIGNMENT_TYPE_LABELS, percentText, WINDOW_LABELS } from "@/components/teacher/labels";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber, pluralize } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { getTeacherDashboard } from "@/server/teaching/dashboard";

export const metadata: Metadata = { title: "Teaching" };

/**
 * Teacher home (§22): each class with its class average (members' average score in the class's subjects), students
 * active in the last 7 days, work due soon and answers waiting for marking. Real values only; honest empty states.
 */
export default async function TeacherHomePage() {
  const actor = await requireRole("TEACHER", { next: "/teacher" });
  const dashboard = await getTeacherDashboard(actor);
  const { classes, upcoming, marking } = dashboard;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        title="Your classes"
        description={`Hello ${actor.displayName}. Here is how your classes are doing.`}
        actions={
          <ButtonLink href="/teacher/classes/new" iconStart={<Plus aria-hidden="true" />}>
            New class
          </ButtonLink>
        }
        className="pb-0"
      />

      {marking.answers > 0 && (
        <Alert
          tone="accent"
          title={`${formatNumber(marking.answers)} ${pluralize(marking.answers, "answer")} waiting for your marking`}
          action={<ButtonLink href="/teacher/review" size="sm" variant="outline">Open marking</ButtonLink>}
        >
          Written answers that need a teacher&apos;s judgement. Students see a provisional score until you mark them.
        </Alert>
      )}

      {classes.length === 0 ? (
        <EmptyState
          icon={<UsersRound aria-hidden="true" />}
          title="No classes yet"
          description="Create a class, share its join code with your students, then set lessons, tests and practice."
          action={<ButtonLink href="/teacher/classes/new">Create a class</ButtonLink>}
        />
      ) : (
        <section aria-labelledby="classes-title" className="space-y-3">
          <h2 id="classes-title" className="sr-only">
            Classes
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {classes.map((cls) => (
              <li key={cls.id}>
                <Card className="h-full">
                  <CardHeader
                    titleAs="h3"
                    title={
                      <Link href={`/teacher/classes/${cls.id}`} className="hover:underline">
                        {cls.name}
                      </Link>
                    }
                    description={[cls.schoolName ?? "Independent tutor class", cls.subjectName ?? "Any subject"].join(" · ")}
                    action={cls.pendingRequests > 0 ? <Badge tone="warning">{`${cls.pendingRequests} to approve`}</Badge> : undefined}
                  />
                  <CardBody>
                    <dl className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <dt className="text-xs text-muted">Students</dt>
                        <dd className="text-lg font-semibold tabular-nums text-text">{formatNumber(cls.activeStudents)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted">Active this week</dt>
                        <dd className="text-lg font-semibold tabular-nums text-text">{formatNumber(cls.activeLast7Days)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted">Class average</dt>
                        <dd className="text-lg font-semibold tabular-nums text-text">{percentText(cls.classAveragePct)}</dd>
                      </div>
                    </dl>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Card as="section" aria-labelledby="due-title">
        <CardHeader titleAs="h2" title={<span id="due-title">Due in the next two weeks</span>} />
        <CardBody>
          {upcoming.length === 0 ? (
            <EmptyState
              appearance="plain"
              titleAs="p"
              icon={<ClipboardCheck aria-hidden="true" />}
              title="Nothing due soon"
              description="Work you set with a due date in the next 14 days appears here."
            />
          ) : (
            <ul className="divide-y divide-border">
              {upcoming.map((a) => (
                <li key={a.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <Link href={`/teacher/classes/${a.classId}/assignments/${a.id}`} className="font-semibold text-text hover:underline">
                      {a.title}
                    </Link>
                    <p className="text-sm text-muted">
                      {a.className} · {ASSIGNMENT_TYPE_LABELS[a.type]} · due {formatDateTime(a.dueAt, actor.timeZone)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="tabular-nums text-muted">
                      {a.summary.submitted}/{a.summary.assigned} handed in
                    </span>
                    <Badge tone={WINDOW_LABELS[a.window].tone}>{WINDOW_LABELS[a.window].label}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
