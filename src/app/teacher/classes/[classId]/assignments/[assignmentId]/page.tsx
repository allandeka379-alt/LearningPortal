import { Archive, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { formatDateTime } from "@/components/admin/format";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { InlineActionButton } from "@/components/teacher/InlineActionButton";
import { ASSIGNMENT_TYPE_LABELS, DIFFICULTY_CHOICE_LABELS, percentText, STUDENT_STATE_LABELS, WINDOW_LABELS } from "@/components/teacher/labels";
import { StudentFeedbackForm } from "@/components/teacher/StudentFeedbackForm";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { instantToLocalDateTime } from "@/server/cms/announcements/schemas";
import { isUuid } from "@/server/teaching/access";
import { getAssignmentDetail } from "@/server/teaching/assignments";
import { orNotFound } from "../../../../_lib/page";
import {
  archiveAssignmentAction,
  closeAssignmentAction,
  excuseStudentAction,
  publishAssignmentAction,
  rescheduleAssignmentAction,
  studentFeedbackAction,
} from "../../../actions";

export const metadata: Metadata = { title: "Assignment" };

const SCORE_POLICY: Record<string, string> = { BEST: "Best attempt counts", LATEST: "Latest attempt counts", FIRST: "First attempt counts" };

/** One assignment (§22 "view performance"): details, dates, and every student's status, score and late flag. */
export default async function AssignmentDetailPage({ params }: { params: Promise<{ classId: string; assignmentId: string }> }) {
  const { classId, assignmentId } = await params;
  if (!isUuid(classId) || !isUuid(assignmentId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}/assignments/${assignmentId}` });
  const detail = await orNotFound(getAssignmentDetail(actor, assignmentId));
  if (detail.class.id !== classId) notFound();
  const { class: cls, assignment: a, summary } = detail;
  const base = `/teacher/classes/${cls.id}`;
  const fields = { classId: cls.id, assignmentId: a.id };
  const editable = cls.archivedAt === null && (a.status === "DRAFT" || a.status === "PUBLISHED");
  const windowLabel = WINDOW_LABELS[a.window];
  const toMark = detail.students.reduce((sum, s) => sum + s.awaitingMarking, 0);

  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader
        cls={cls}
        section="assignments"
        title={a.title}
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            <Badge tone={windowLabel.tone}>{windowLabel.label}</Badge>
            <span>
              {ASSIGNMENT_TYPE_LABELS[a.type]} · {a.subjectName}
            </span>
          </span>
        }
        trail={[{ label: "Assignments", href: `${base}/assignments` }, { label: a.title }]}
        actions={
          cls.archivedAt === null ? (
            <>
              {a.status === "DRAFT" && (
                <InlineActionButton action={publishAssignmentAction} fields={fields} variant="primary" size="md">
                  Publish now
                </InlineActionButton>
              )}
              {a.status === "PUBLISHED" && (
                <ConfirmAction
                  action={closeAssignmentAction}
                  fields={fields}
                  triggerLabel="Close now"
                  triggerSize="md"
                  triggerIcon={<Lock aria-hidden="true" />}
                  tone="danger"
                  title="Close this work now?"
                  description="Nothing more can be handed in. Work in progress is handed in as it is; students who did nothing are marked as missed."
                  confirmLabel="Close"
                />
              )}
              <ConfirmAction
                action={archiveAssignmentAction}
                fields={fields}
                triggerLabel={a.status === "DRAFT" ? "Delete draft" : "Archive"}
                triggerSize="md"
                triggerIcon={<Archive aria-hidden="true" />}
                tone="danger"
                title={a.status === "DRAFT" ? "Delete this draft?" : "Archive this work?"}
                description={a.status === "DRAFT" ? "The draft is deleted." : "Students no longer see it. Results stay in the student and class views."}
                confirmLabel={a.status === "DRAFT" ? "Delete" : "Archive"}
              />
            </>
          ) : undefined
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card as="section" aria-labelledby="details-title">
          <CardHeader titleAs="h2" title={<span id="details-title">Details</span>} />
          <CardBody className="space-y-4">
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              {a.lesson && (
                <div>
                  <dt className="text-muted">Lesson</dt>
                  <dd className="font-medium text-text">{a.lesson.title}</dd>
                </div>
              )}
              {a.assessment && (
                <div>
                  <dt className="text-muted">Test</dt>
                  <dd className="font-medium text-text">
                    {a.assessment.title} ({a.assessment.totalMarks} marks)
                  </dd>
                </div>
              )}
              {a.practice && (
                <>
                  <div>
                    <dt className="text-muted">Practice</dt>
                    <dd className="font-medium text-text">
                      {a.practice.questionCount} questions · {DIFFICULTY_CHOICE_LABELS[a.practice.difficulty as keyof typeof DIFFICULTY_CHOICE_LABELS] ?? a.practice.difficulty}
                      {a.practice.timeLimitMinutes ? ` · ${a.practice.timeLimitMinutes} min` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Topics</dt>
                    <dd className="font-medium text-text">{a.practice.topics.join(", ") || "—"}</dd>
                  </div>
                  {a.practice.targeted && (
                    <div>
                      <dt className="text-muted">Set for</dt>
                      <dd className="font-medium text-text">Chosen students only</dd>
                    </div>
                  )}
                </>
              )}
              <div>
                <dt className="text-muted">Published</dt>
                <dd className="font-medium text-text">{a.publishedAt ? formatDateTime(a.publishedAt, actor.timeZone) : "Not yet"}</dd>
              </div>
              <div>
                <dt className="text-muted">Due</dt>
                <dd className="font-medium text-text">{a.dueAt ? formatDateTime(a.dueAt, actor.timeZone) : "No due date"}</dd>
              </div>
              <div>
                <dt className="text-muted">Closes</dt>
                <dd className="font-medium text-text">{a.closesAt ? formatDateTime(a.closesAt, actor.timeZone) : a.allowLateSubmission ? "Late work accepted" : "At the due date"}</dd>
              </div>
              {a.type !== "LESSON" && (
                <div>
                  <dt className="text-muted">Attempts</dt>
                  <dd className="font-medium text-text">
                    {a.maxAttempts ?? "No limit"} · {SCORE_POLICY[a.scorePolicy]}
                  </dd>
                </div>
              )}
            </dl>
            {a.instructionsHtml && (
              <div className="rounded-card border border-border bg-subtle p-4">
                <h3 className="mb-2 text-sm font-semibold text-text">Instructions</h3>
                <RichContent html={a.instructionsHtml} />
              </div>
            )}
          </CardBody>
        </Card>

        {editable && (
          <Card as="section" aria-labelledby="dates-title">
            <CardHeader titleAs="h2" title={<span id="dates-title">Change dates</span>} description="For example, to give the class an extension." />
            <CardBody>
              <ActionForm action={rescheduleAssignmentAction} hiddenFields={fields} submitLabel="Save dates" successAs="toast">
                <AdminField name="dueAt" label="Due" type="datetime-local" defaultValue={a.dueAt ? instantToLocalDateTime(a.dueAt, actor.timeZone) : null} />
                <AdminField name="closesAt" label="Close submissions at" type="datetime-local" optional defaultValue={a.closesAt ? instantToLocalDateTime(a.closesAt, actor.timeZone) : null} />
                <AdminField name="allowLateSubmission" label="Accept late work" type="checkbox" defaultChecked={a.allowLateSubmission} />
              </ActionForm>
            </CardBody>
          </Card>
        )}
      </div>

      {a.status !== "DRAFT" && (
        <section aria-labelledby="progress-title" className="space-y-3">
          <h2 id="progress-title" className="text-lg font-semibold text-text">
            Progress
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <StatTile label="Handed in" value={`${formatNumber(summary.submitted)}/${formatNumber(summary.assigned)}`} hint={detail.completionPercent === null ? undefined : `${percentText(detail.completionPercent)} of the class`} />
            <StatTile label="Late" value={formatNumber(summary.late)} />
            <StatTile label="Missed" value={formatNumber(summary.missed)} />
            <StatTile label="Average score" value={summary.averageScorePercent === null ? null : percentText(summary.averageScorePercent)} emptyLabel="No scores yet" />
            <StatTile label="Answers to mark" value={formatNumber(toMark)} />
          </div>
          <DataTable
            caption="Students' progress on this assignment"
            rows={detail.students}
            rowKey={(row) => row.userId}
            empty={<EmptyState appearance="plain" titleAs="p" title="Nobody is set this work" description="Students who join the class get open class-wide work automatically." />}
            columns={[
              {
                key: "name",
                header: "Student",
                primary: true,
                cell: (row) => (
                  <Link href={`${base}/students/${row.userId}`} className="font-semibold text-text hover:underline">
                    {row.name}
                  </Link>
                ),
              },
              {
                key: "state",
                header: "Status",
                cell: (row) => (
                  <span className="inline-flex flex-wrap gap-1">
                    <Badge tone={STUDENT_STATE_LABELS[row.view.state].tone}>{STUDENT_STATE_LABELS[row.view.state].label}</Badge>
                    {row.awaitingMarking > 0 && <Badge tone="accent">{`${row.awaitingMarking} to mark`}</Badge>}
                  </span>
                ),
              },
              { key: "score", header: "Score", align: "end", cell: (row) => percentText(row.scorePercent) },
              { key: "submitted", header: "Handed in", cell: (row) => (row.submittedAt ? formatDateTime(row.submittedAt, actor.timeZone) : "—"), hideOnMobile: true },
              {
                key: "actions",
                header: "Actions",
                cell: (row) => (
                  <span className="flex flex-wrap items-center gap-2">
                    {row.countedAttemptId && (
                      <Link href={`/teacher/review/${row.countedAttemptId}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary pointer-fine:min-h-9 underline-offset-4 hover:underline">
                        {row.awaitingMarking > 0 ? "Mark answers" : "View answers"}
                      </Link>
                    )}
                    {editable && row.view.state !== "SUBMITTED" && row.view.state !== "LATE" && row.view.state !== "EXCUSED" && (
                      <InlineActionButton action={excuseStudentAction} fields={{ ...fields, userId: row.userId }} variant="ghost" ariaLabel={`Excuse ${row.name}`}>
                        Excuse
                      </InlineActionButton>
                    )}
                    <StudentFeedbackForm assignmentId={a.id} classId={cls.id} userId={row.userId} studentName={row.name} current={row.teacherFeedback} action={studentFeedbackAction} />
                  </span>
                ),
              },
            ]}
          />
        </section>
      )}
    </Container>
  );
}
