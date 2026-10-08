import { Archive, RefreshCw, UserMinus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { formatDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { AddStudentsForm } from "@/components/teacher/AddStudentsForm";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { InlineActionButton } from "@/components/teacher/InlineActionButton";
import { JoinCodePanel } from "@/components/teacher/JoinCodePanel";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { getClassRoster } from "@/server/teaching/classes";
import { orNotFound } from "../../../_lib/page";
import {
  addCoTeacherAction,
  addStudentsAction,
  approveRequestAction,
  archiveClassAction,
  declineRequestAction,
  disableJoinCodeAction,
  removeCoTeacherAction,
  removeStudentAction,
  restoreClassAction,
  revokeInvitationAction,
  rotateJoinCodeAction,
  updateClassAction,
} from "../../actions";

export const metadata: Metadata = { title: "Class students" };

const SOURCE_LABELS: Record<string, string> = {
  JOIN_CODE: "Joined with the code",
  INVITE: "Accepted an invitation",
  ADDED_BY_STAFF: "Added by a teacher",
  ROSTER_IMPORT: "School roster",
  REQUEST: "Request approved",
};

/**
 * Class people (§22 "add students"): join code, join requests, students (names only, never contact details),
 * invitations, co-teachers and the class settings.
 */
export default async function ClassStudentsPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  if (!isUuid(classId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}/students` });
  const roster = await orNotFound(getClassRoster(actor, classId));
  const cls = roster.class;
  const archived = cls.archivedAt !== null;
  const ids = { classId: cls.id };

  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader cls={cls} section="students" />

      {!archived && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card as="section" aria-labelledby="code-title">
            <CardHeader titleAs="h2" title={<span id="code-title">Join code</span>} />
            <CardBody className="space-y-4">
              <JoinCodePanel code={cls.joinCode} />
              <div className="flex flex-wrap gap-2">
                <ConfirmAction
                  action={rotateJoinCodeAction}
                  fields={ids}
                  triggerLabel={cls.joinCode ? "New code" : "Switch on with a new code"}
                  triggerIcon={<RefreshCw aria-hidden="true" />}
                  title="Create a new join code?"
                  description="The current code stops working at once. Students already in the class are not affected."
                  confirmLabel="Create new code"
                />
                {cls.joinCode && (
                  <ConfirmAction
                    action={disableJoinCodeAction}
                    fields={ids}
                    triggerLabel="Switch off"
                    title="Switch off joining with a code?"
                    description="Nobody can join with a code until you create a new one. You can still add or invite students."
                    confirmLabel="Switch off"
                  />
                )}
              </div>
            </CardBody>
          </Card>

          <Card as="section" aria-labelledby="add-title">
            <CardHeader titleAs="h2" title={<span id="add-title">Add students</span>} />
            <CardBody>
              <AddStudentsForm classId={cls.id} schoolClass={cls.schoolId !== null} action={addStudentsAction} />
            </CardBody>
          </Card>
        </div>
      )}

      {roster.requests.length > 0 && (
        <Card as="section" aria-labelledby="requests-title">
          <CardHeader titleAs="h2" title={<span id="requests-title">Join requests</span>} description="Students who entered the code and are waiting for you." />
          <CardBody>
            <ul className="divide-y divide-border">
              {roster.requests.map((request) => (
                <li key={request.userId} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span>
                    <span className="font-semibold text-text">{request.name}</span>
                    <span className="block text-sm text-muted">Asked on {formatDate(request.requestedAt, actor.timeZone)}</span>
                  </span>
                  {!archived && (
                    <span className="flex gap-2">
                      <InlineActionButton action={approveRequestAction} fields={{ ...ids, userId: request.userId }} variant="primary" ariaLabel={`Approve ${request.name}`}>
                        Approve
                      </InlineActionButton>
                      <InlineActionButton action={declineRequestAction} fields={{ ...ids, userId: request.userId }} ariaLabel={`Decline ${request.name}`}>
                        Decline
                      </InlineActionButton>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <Card as="section" aria-labelledby="students-title">
        <CardHeader titleAs="h2" title={<span id="students-title">Students ({formatNumber(roster.students.length)})</span>} />
        <CardBody>
          {roster.students.length === 0 ? (
            <EmptyState appearance="plain" titleAs="p" title="No students yet" description="Share the join code or add students above." />
          ) : (
            <ul className="divide-y divide-border">
              {roster.students.map((student) => (
                <li key={student.userId} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span className="min-w-0">
                    <Link href={`/teacher/classes/${cls.id}/students/${student.userId}`} className="font-semibold text-text hover:underline">
                      {student.name}
                    </Link>
                    <span className="block text-sm text-muted">
                      {SOURCE_LABELS[student.source] ?? "Member"} · since {formatDate(student.joinedAt, actor.timeZone)}
                    </span>
                  </span>
                  {!archived && (
                    <ConfirmAction
                      action={removeStudentAction}
                      fields={{ ...ids, userId: student.userId }}
                      triggerLabel="Remove"
                      triggerIcon={<UserMinus aria-hidden="true" />}
                      tone="danger"
                      title={`Remove ${student.name} from the class?`}
                      description="Their work stays on record, but you will no longer see their progress. They can ask to join again with the code."
                      confirmLabel="Remove student"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      {roster.invitations.length > 0 && (
        <Card as="section" aria-labelledby="invites-title">
          <CardHeader titleAs="h2" title={<span id="invites-title">Invitations waiting</span>} />
          <CardBody>
            <ul className="divide-y divide-border">
              {roster.invitations.map((invitation) => (
                <li key={invitation.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span>
                    <span className="font-medium text-text">{invitation.sentTo}</span>
                    <span className="block text-sm text-muted">
                      Sent {invitation.sendCount} {invitation.sendCount === 1 ? "time" : "times"} · expires {formatDate(invitation.expiresAt, actor.timeZone)}
                    </span>
                  </span>
                  {!archived && (
                    <InlineActionButton action={revokeInvitationAction} fields={{ ...ids, invitationId: invitation.id }} ariaLabel={`Withdraw the invitation to ${invitation.sentTo}`}>
                      Withdraw
                    </InlineActionButton>
                  )}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <Card as="section" aria-labelledby="teachers-title">
        <CardHeader titleAs="h2" title={<span id="teachers-title">Teachers</span>} />
        <CardBody className="space-y-4">
          <ul className="divide-y divide-border">
            {roster.teachers.map((teacher) => (
              <li key={teacher.userId} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <span className="inline-flex items-center gap-2">
                  <span className="font-semibold text-text">{teacher.name}</span>
                  <Badge tone={teacher.role === "LEAD" ? "primary" : "neutral"}>{teacher.role === "LEAD" ? "Lead teacher" : "Co-teacher"}</Badge>
                  {teacher.isYou && <span className="text-sm text-muted">(you)</span>}
                </span>
                {!archived && teacher.role === "ASSISTANT" && (roster.canManageTeachers || teacher.isYou) && (
                  <ConfirmAction
                    action={removeCoTeacherAction}
                    fields={{ ...ids, userId: teacher.userId }}
                    triggerLabel={teacher.isYou ? "Leave class" : "Remove"}
                    tone="danger"
                    title={teacher.isYou ? "Stop teaching this class?" : `Remove ${teacher.name} as co-teacher?`}
                    description="They lose access to the class and its students' progress at once."
                    confirmLabel={teacher.isYou ? "Leave class" : "Remove co-teacher"}
                    successMessage="Done."
                  />
                )}
              </li>
            ))}
          </ul>
          {!archived && roster.canManageTeachers && (
            <ActionForm action={addCoTeacherAction} hiddenFields={ids} submitLabel="Add co-teacher" pendingLabel="Adding…" submitVariant="secondary" successAs="toast">
              <AdminField
                name="identifier"
                label="Co-teacher's email, phone number or username"
                hint={cls.schoolId ? "They must teach at this school." : "They need a teacher account."}
                required
                maxLength={254}
              />
            </ActionForm>
          )}
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-title">
        <CardHeader titleAs="h2" title={<span id="settings-title">Class settings</span>} />
        <CardBody className="space-y-4">
          {!archived ? (
            <>
              <ActionForm action={updateClassAction} hiddenFields={ids} submitLabel="Save settings" successAs="toast">
                <AdminField name="name" label="Class name" required defaultValue={cls.name} maxLength={120} />
                <AdminField name="description" label="Description" type="textarea" optional defaultValue={cls.description} rows={3} maxLength={1000} />
                <AdminField
                  name="joinRequiresApproval"
                  label="Approve students who join with the code"
                  type="checkbox"
                  defaultChecked={cls.joinRequiresApproval}
                />
              </ActionForm>
              {roster.canManageTeachers && (
                <ConfirmAction
                  action={archiveClassAction}
                  fields={ids}
                  triggerLabel="Archive class"
                  triggerIcon={<Archive aria-hidden="true" />}
                  tone="danger"
                  title="Archive this class?"
                  description="The class becomes read-only and nobody can join it. Results stay available, and you can restore it later."
                  confirmLabel="Archive class"
                />
              )}
            </>
          ) : (
            roster.canManageTeachers && (
              <InlineActionButton action={restoreClassAction} fields={ids} variant="primary">
                Restore class
              </InlineActionButton>
            )
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
