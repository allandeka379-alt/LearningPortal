import { KeyRound, LogOut, Mail, ShieldAlert, ShieldCheck, ShieldOff, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { ActionResultCopyField } from "@/components/admin/CopyValueField";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatDate, formatLocalDate, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { DemoBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { ROLE_LABELS, RoleBadges } from "@/components/admin/users/UserBits";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { formatNumber } from "@/lib/format";
import { getUserDetail, STUDENT_VIEW_WINDOW_MS, type UserDetail } from "@/server/cms/users/service";
import { isAppError } from "@/server/lib/errors";
import {
  forceSignOutAction,
  grantRoleAction,
  issueTemporaryPasswordAction,
  openStudentRecordAction,
  reactivateUserAction,
  revokeRoleAction,
  revokeSessionAction,
  sendPasswordResetAction,
  sendVerificationReminderAction,
  suspendUserAction,
} from "../actions";

export const metadata = { title: "User" };

/**
 * /admin/users/[id] — one account (§36 Users): account, profile, track, enrolments, subscription, recent activity,
 * memberships, sessions (revoke), audit trail and the account actions. Opening a STUDENT's record first asks for a
 * reason, recorded as a `student.view` audit entry (ARCHITECTURE §5.3). AI tutor conversations are never shown.
 */
export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("users.manage", { next: `/admin/users/${id}` });
  let result;
  try {
    result = await getUserDetail(actor, id);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }

  if (result.access === "reason_required") {
    const { summary } = result;
    return (
      <Container size="wide">
        <PageHeader
          title={summary.name}
          breadcrumbs={[{ label: "Users", href: "/admin/users" }, { label: summary.name }]}
          description={<RoleBadges roles={summary.roles} />}
        />
        <div className="max-w-2xl space-y-4">
          <Alert tone="info" icon={<ShieldAlert aria-hidden="true" />} title="This is a student's record">
            Student data is sensitive and most students are minors. Say why you need to open this record; the reason is
            kept in the audit log with your name. Access lasts {Math.round(STUDENT_VIEW_WINDOW_MS / 60_000)} minutes.
          </Alert>
          <ActionForm action={openStudentRecordAction} hiddenFields={{ userId: summary.id }} submitLabel="Open record" pendingLabel="Recording…">
            <AdminField
              name="reason"
              label="Reason for access"
              type="textarea"
              rows={3}
              maxLength={500}
              required
              hint="For example: support ticket number and what the student asked for. Don't include contact details."
            />
          </ActionForm>
        </div>
      </Container>
    );
  }

  const user = result.user;
  return (
    <Container size="wide">
      <PageHeader
        title={
          <span className="inline-flex flex-wrap items-center gap-2">
            {user.name}
            {user.isDemo && <DemoBadge size="md" />}
          </span>
        }
        breadcrumbs={[{ label: "Users", href: "/admin/users" }, { label: user.name }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge kind="user" status={user.status} size="md" />
            <RoleBadges roles={user.isSchoolAdmin ? [...user.platformRoles, "SCHOOL_ADMIN"] : user.platformRoles} />
          </span>
        }
      />
      {result.studentViewRecordedAt && (
        <p className="-mt-3 mb-4 text-sm text-muted">
          Your access to this student record was recorded at <Timestamp value={result.studentViewRecordedAt} /> (audited).
        </p>
      )}
      {user.status === "SUSPENDED" && (
        <Alert tone="danger" className="mb-6" title="Suspended">
          {user.statusReason ?? "No reason recorded."} {user.statusChangedAt && <>Since {formatDate(user.statusChangedAt)}.</>}
        </Alert>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <AccountSection user={user} />
          {user.student && <StudentSection user={user} />}
          {user.enrollments.length > 0 && <EnrollmentsSection user={user} />}
          <SubscriptionSection user={user} />
          {(user.schoolMemberships.length > 0 || user.parentLinks.length > 0) && <RelationshipsSection user={user} />}
          <AuditSection user={user} />
        </div>
        <div className="min-w-0 space-y-6">
          <ActionsSection user={user} />
          <RolesSection user={user} />
          <SessionsSection user={user} />
          <p className="text-sm text-muted">AI tutor and solver conversations are private to the student and are never shown in the admin console.</p>
        </div>
      </div>
    </Container>
  );
}

function AccountSection({ user }: { user: UserDetail }) {
  return (
    <AdminSection title="Account">
      <KeyValueList
        items={[
          {
            label: "Email",
            value: user.email ? (
              <>
                {user.email} <Badge size="sm" tone={user.emailVerifiedAt ? "success" : "warning"}>{user.emailVerifiedAt ? "Verified" : "Not verified"}</Badge>
              </>
            ) : null,
          },
          {
            label: "Phone",
            value: user.phone ? (
              <>
                <span className="tabular-nums">{user.phone}</span>{" "}
                {user.phoneVerifiedAt ? (
                  <Badge size="sm" tone="success">
                    Verified
                  </Badge>
                ) : (
                  <span className="text-muted">(profile only, not used to sign in)</span>
                )}
              </>
            ) : null,
          },
          { label: "Login username", value: user.loginUsername, hideWhenEmpty: true },
          { label: "Contact phone (shared)", value: user.contactPhoneMasked, hideWhenEmpty: true },
          { label: "Created by school", value: user.provisionedBySchool ? <Link className="underline underline-offset-4" href={`/admin/schools/${user.provisionedBySchool.id}`}>{user.provisionedBySchool.name}</Link> : null, hideWhenEmpty: true },
          { label: "Signed up", value: <Timestamp value={user.createdAt} /> },
          { label: "Sign-up channel", value: humanizeEnum(user.signupChannel) },
          { label: "Last sign-in", value: <Timestamp value={user.lastLoginAt} /> },
          { label: "Last active", value: <Timestamp value={user.lastActiveAt} /> },
          { label: "Password", value: user.hasPassword ? "Set" : "None (code or Google sign-in)" },
          { label: "Locked until", value: user.lockedUntil ? <Timestamp value={user.lockedUntil} /> : null, hideWhenEmpty: true },
          { label: "Display name", value: user.profile?.displayName },
          { label: "Name", value: [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || null },
          { label: "Public handle", value: user.profile?.username ? `@${user.profile.username}` : null },
          { label: "Country", value: user.profile?.country },
          { label: "Time zone", value: user.profile?.timezone },
        ]}
      />
    </AdminSection>
  );
}

function StudentSection({ user }: { user: UserDetail }) {
  const student = user.student!;
  return (
    <AdminSection title="Student">
      <KeyValueList
        items={[
          { label: "Board", value: student.examBoard },
          { label: "Level", value: student.qualification },
          { label: "Form / year", value: student.yearGroup },
          { label: "School", value: student.school ?? (student.declaredSchoolName ? `${student.declaredSchoolName} (self-declared, unverified)` : null) },
          { label: "Onboarding", value: student.onboardingCompletedAt ? `Completed ${formatDate(student.onboardingCompletedAt)}` : `In progress (${humanizeEnum(student.onboardingStep)})` },
          { label: "Diagnostic", value: student.diagnosticCompletedAt ? `Completed ${formatDate(student.diagnosticCompletedAt)}` : "Not taken" },
          { label: "Under 18", value: student.isMinor ? "Yes" : "No" },
          { label: "Guardian consent", value: humanizeEnum(student.guardianConsentStatus) },
          { label: "Exam extra time", value: student.examExtraTimePercent ? `${student.examExtraTimePercent}%` : null, hideWhenEmpty: true },
        ]}
      />
      <h3 className="mt-6 mb-2 text-sm font-semibold text-text">Activity in the last 14 days</h3>
      {user.activity.length === 0 ? (
        <p className="text-sm text-muted">No study activity recorded in the last 14 days.</p>
      ) : (
        <DataTable
          caption="Daily activity, last 14 days"
          rows={user.activity}
          rowKey={(row) => row.date}
          columns={[
            { key: "date", header: "Day", primary: true, cell: (row) => formatLocalDate(row.date) },
            { key: "minutes", header: "Study minutes", align: "end", cell: (row) => formatNumber(row.studyMinutes) },
            { key: "questions", header: "Questions", align: "end", cell: (row) => `${formatNumber(row.questionsCorrect)} / ${formatNumber(row.questionsAttempted)} correct` },
            { key: "lessons", header: "Lessons done", align: "end", cell: (row) => formatNumber(row.lessonsCompleted) },
          ]}
        />
      )}
    </AdminSection>
  );
}

function EnrollmentsSection({ user }: { user: UserDetail }) {
  return (
    <AdminSection title="Subject enrolments" description="Each enrolment pins one syllabus version." flush>
      <DataTable
        caption="Subject enrolments"
        rows={user.enrollments}
        rowKey={(row) => row.id}
        columns={[
          { key: "subject", header: "Subject", primary: true, cell: (row) => `${row.subject}${row.qualification ? ` (${row.qualification})` : ""}` },
          { key: "syllabus", header: "Syllabus version", cell: (row) => (<>{row.syllabusVersion} <StatusBadge kind="syllabus" status={row.syllabusStatus} /></>) },
          { key: "status", header: "Status", cell: (row) => humanizeEnum(row.status) },
          { key: "via", header: "Enrolled via", hideOnMobile: true, cell: (row) => humanizeEnum(row.enrolledVia) },
          { key: "target", header: "Target grade", hideOnMobile: true, cell: (row) => row.targetGrade ?? "—" },
          { key: "since", header: "Since", cell: (row) => formatDate(row.createdAt) },
        ]}
      />
    </AdminSection>
  );
}

function SubscriptionSection({ user }: { user: UserDetail }) {
  const sub = user.subscription;
  return (
    <AdminSection title="Subscription" description="The user's own plan (school seats and study-pack grants are managed under Subscriptions).">
      {sub ? (
        <KeyValueList
          items={[
            { label: "Plan", value: `${sub.plan.name} (${sub.plan.code})` },
            { label: "Status", value: <StatusBadge kind="subscription" status={sub.status} /> },
            { label: "Current period ends", value: <Timestamp value={sub.currentPeriodEnd} /> },
            { label: "Access ends", value: <Timestamp value={sub.accessEndsAt} /> },
            { label: "Renewal", value: sub.cancelAtPeriodEnd ? "Stops at period end" : "Continues" },
            { label: "Paid by someone else", value: sub.payerUserId && sub.payerUserId !== user.id ? "Yes" : "No" },
          ]}
        />
      ) : (
        <p className="text-sm text-muted">No subscription. The user is on the free plan.</p>
      )}
    </AdminSection>
  );
}

function RelationshipsSection({ user }: { user: UserDetail }) {
  return (
    <AdminSection title="Schools and family links">
      {user.schoolMemberships.length > 0 && (
        <ul className="divide-y divide-border">
          {user.schoolMemberships.map((membership) => (
            <li key={membership.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
              <span>
                <Link href={`/admin/schools/${membership.schoolId}`} className="font-medium text-text underline-offset-4 hover:underline">
                  {membership.schoolName}
                </Link>{" "}
                <span className="text-muted">· {humanizeEnum(membership.role)}</span>
                {membership.studentNumber && <span className="text-muted"> · No. {membership.studentNumber}</span>}
              </span>
              <StatusBadge kind="member" status={membership.status} />
            </li>
          ))}
        </ul>
      )}
      {user.parentLinks.length > 0 && (
        <ul className="mt-2 divide-y divide-border">
          {user.parentLinks.map((link) => (
            <li key={link.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
              <span>
                {link.as === "parent" ? "Child: " : "Parent / guardian: "}
                {link.otherUserId ? (
                  <Link href={`/admin/users/${link.otherUserId}`} className="font-medium text-text underline-offset-4 hover:underline">
                    {link.otherName}
                  </Link>
                ) : (
                  <span className="text-muted">{link.otherName}</span>
                )}{" "}
                <span className="text-muted">· {humanizeEnum(link.relationship)}</span>
              </span>
              <Badge size="sm" tone={link.status === "ACTIVE" ? "success" : "neutral"} appearance={link.status === "ACTIVE" ? "soft" : "outline"}>
                {humanizeEnum(link.status)}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </AdminSection>
  );
}

function AuditSection({ user }: { user: UserDetail }) {
  return (
    <AdminSection
      title="Audit trail"
      description="Recent privileged actions on this account and by this account."
      action={
        <Link href={`/admin/audit?target=${user.id}`} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Full log
        </Link>
      }
    >
      {user.audit.length === 0 ? (
        <p className="text-sm text-muted">No audited actions yet.</p>
      ) : (
        <ol className="space-y-3">
          {user.audit.map((entry) => (
            <li key={entry.id} className="text-sm">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <code className="rounded bg-subtle px-1.5 py-0.5 font-mono text-xs">{entry.action}</code>
                <span className="text-muted">
                  {entry.direction === "actor" ? `by this user on ${entry.entityType}` : `by ${entry.actorName ?? "the system"}`}
                </span>
                <Timestamp value={entry.createdAt} className="text-xs text-muted" />
              </p>
              {entry.reason && <p className="mt-0.5 text-muted">Reason: {entry.reason}</p>}
            </li>
          ))}
        </ol>
      )}
    </AdminSection>
  );
}

function ActionsSection({ user }: { user: UserDetail }) {
  const fields = { userId: user.id };
  // Accounts are email-based (owner decision 2026-10-07): staff messages go to the person's email only, never by SMS.
  const verifiedEmail = Boolean(user.email && user.emailVerifiedAt);
  const unverifiedEmail = Boolean(user.email && !user.emailVerifiedAt);
  const canSignInWithPassword = verifiedEmail || Boolean(user.loginUsername);
  const any = user.can.suspend || user.can.reactivate || user.can.signOut || user.can.contact;
  return (
    <AdminSection title="Account actions">
      {!any ? (
        <p className="text-sm text-muted">
          No actions available. You can&apos;t act on your own account here, and only a super admin can act on another administrator.
        </p>
      ) : (
        <div className="flex flex-col items-start gap-2">
          {user.can.suspend && (
            <ConfirmAction
              action={suspendUserAction}
              fields={fields}
              tone="danger"
              triggerLabel="Suspend account"
              triggerIcon={<UserX aria-hidden="true" />}
              title="Suspend this account?"
              description="The user is signed out everywhere and can't sign in until reactivated. Their data is kept."
              confirmLabel="Suspend"
              reason={{ label: "Reason (shown to admins only)", required: true, hint: "No contact details or personal information." }}
            />
          )}
          {user.can.reactivate && (
            <ConfirmAction
              action={reactivateUserAction}
              fields={fields}
              triggerLabel="Reactivate account"
              triggerIcon={<UserCheck aria-hidden="true" />}
              title="Reactivate this account?"
              description="The user can sign in again."
              confirmLabel="Reactivate"
              reason={{ label: "Note" }}
            />
          )}
          {user.can.signOut && (
            <ConfirmAction
              action={forceSignOutAction}
              fields={fields}
              tone="danger"
              triggerLabel="Sign out everywhere"
              triggerIcon={<LogOut aria-hidden="true" />}
              title="Sign this user out on every device?"
              description="All of their sessions and app tokens stop working immediately."
              confirmLabel="Sign out everywhere"
            />
          )}
          {user.can.contact && (
            <ConfirmAction
              action={sendPasswordResetAction}
              fields={fields}
              disabled={!verifiedEmail}
              disabledReason="No verified email address. Issue a one-time password instead, or (school accounts) ask the school admin."
              triggerLabel="Send password reset instructions"
              triggerIcon={<KeyRound aria-hidden="true" />}
              title="Send password reset instructions?"
              description="The user gets an email at their own verified address with a link to choose a new password. Staff never see a reset code."
              confirmLabel="Send instructions"
            />
          )}
          {user.can.contact && canSignInWithPassword && (
            <details className="w-full rounded-card border border-border p-3">
              <summary className="cursor-pointer text-sm font-semibold text-text">Issue a one-time password</summary>
              <div className="mt-3 space-y-3">
                <p className="text-sm text-muted">
                  For someone who can&apos;t get a reset code by email themselves (a school username, or no access to their
                  inbox). You see the password once and give it to them privately (in person or on a call); they must choose a
                  new one when they sign in. They are signed out everywhere, their verified email gets a notice, and the reason
                  is recorded. Needs your password.
                </p>
                <ActionForm action={issueTemporaryPasswordAction} hiddenFields={fields} submitLabel="Set one-time password" pendingLabel="Setting…">
                  <AdminField name="reason" label="Reason (recorded in the audit log)" required maxLength={500} hint="For example: lost access to their email, called support on 7 Oct. No contact details." />
                  <ActionResultCopyField field="temporaryPassword" label="One-time password" hint="Shown once. Don't send it by email or leave it in a chat." />
                </ActionForm>
              </div>
            </details>
          )}
          {user.can.contact && unverifiedEmail && (
            <ConfirmAction
              action={sendVerificationReminderAction}
              fields={fields}
              triggerLabel="Send verification reminder"
              triggerIcon={<Mail aria-hidden="true" />}
              title="Remind the user to verify?"
              description="They get an email asking them to sign in, where a fresh 6-digit code is emailed to confirm the address."
              confirmLabel="Send reminder"
            />
          )}
        </div>
      )}
    </AdminSection>
  );
}

function RolesSection({ user }: { user: UserDetail }) {
  const fields = { userId: user.id };
  return (
    <AdminSection title="Staff roles" description="Granting or removing a role signs the user out and needs your password (step-up).">
      <div className="space-y-3">
        <RoleBadges roles={user.platformRoles} />
        {user.can.grant.length === 0 && user.can.revoke.length === 0 ? (
          <p className="text-sm text-muted">You can&apos;t change this account&apos;s staff roles. School roles are managed from the school&apos;s page.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {user.can.grant.map((role) => (
              <ConfirmAction
                key={`grant-${role}`}
                action={grantRoleAction}
                fields={{ ...fields, role }}
                triggerLabel={`Grant ${ROLE_LABELS[role]}`}
                triggerIcon={<ShieldCheck aria-hidden="true" />}
                title={`Grant ${ROLE_LABELS[role]}?`}
                description={role === "CONTENT_EDITOR" ? "They will be able to draft, review and publish content." : "Administrators manage users, schools, payments and settings. Only grant this to trusted staff."}
                confirmLabel="Grant role"
                reason={{ label: "Reason" }}
              />
            ))}
            {user.can.revoke.map((role) => (
              <ConfirmAction
                key={`revoke-${role}`}
                action={revokeRoleAction}
                fields={{ ...fields, role }}
                tone="danger"
                triggerLabel={`Remove ${ROLE_LABELS[role]}`}
                triggerIcon={<ShieldOff aria-hidden="true" />}
                title={`Remove ${ROLE_LABELS[role]}?`}
                description="They lose this role's access immediately and are signed out."
                confirmLabel="Remove role"
                reason={{ label: "Reason" }}
              />
            ))}
          </div>
        )}
      </div>
    </AdminSection>
  );
}

function SessionsSection({ user }: { user: UserDetail }) {
  return (
    <AdminSection title="Signed-in devices" description="Active sessions and app tokens.">
      {user.sessions.length === 0 ? (
        <p className="text-sm text-muted">No active sessions.</p>
      ) : (
        <ul className="divide-y divide-border">
          {user.sessions.map((session) => (
            <li key={session.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
              <span className="min-w-0">
                <span className="block font-medium text-text">{session.label ?? (session.kind === "API" ? "App token" : "Browser")}</span>
                <span className="block text-xs text-muted">
                  {humanizeEnum(session.kind)} · {humanizeEnum(session.authMethod)} · last seen <Timestamp value={session.lastSeenAt} />
                </span>
              </span>
              {user.can.signOut && (
                <ConfirmAction
                  action={revokeSessionAction}
                  fields={{ userId: user.id, sessionId: session.id }}
                  triggerLabel="Sign out"
                  title="Sign out this device?"
                  description="This session stops working immediately."
                  confirmLabel="Sign out"
                  tone="danger"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminSection>
  );
}
