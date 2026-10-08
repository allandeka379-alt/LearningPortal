import { Upload } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ActionResultCopyField } from "@/components/admin/CopyValueField";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatDate } from "@/components/admin/format";
import { buildHref, enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { inviteContactHint } from "@/components/school/invitation-copy";
import { InvitationList } from "@/components/school/InvitationList";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { isFeatureEnabled } from "@/server/features";
import { listSchoolClasses } from "@/server/schools/classes";
import { listSchoolInvitations } from "@/server/schools/invitations";
import { MEMBER_LIST_STATUSES } from "@/server/schools/schemas";
import { listSchoolStudents } from "@/server/schools/students";
import { orNotFound, requireSchoolPage } from "../_lib/context";
import { resendInvitationAction, revokeInvitationAction } from "../teachers/actions";
import { approveRequestAction, declineRequestAction, inviteStudentAction } from "./actions";

export const metadata: Metadata = { title: "Students" };

const STATUS_LABELS: Record<(typeof MEMBER_LIST_STATUSES)[number], string> = { ACTIVE: "On roster", REQUESTED: "Join requests", REMOVED: "Removed" };

/**
 * /school/students — the school's roster (§23 "manage students"): search, class filter, join requests, invitations,
 * and the way into the roster import. Names, school usernames and admission numbers only; no contact details.
 */
export default async function SchoolStudentsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const { actor, school } = await requireSchoolPage("/school/students");
  const query = await searchParams;
  const status = enumParam(query, "status", MEMBER_LIST_STATUSES) ?? "ACTIVE";
  const q = firstParam(query, "q");
  const classId = firstParam(query, "classId");
  const cursor = firstParam(query, "cursor");
  const [page, classes, invitations, smsEnabled] = await Promise.all([
    orNotFound(listSchoolStudents(actor, { schoolId: school.schoolId, status, q, classId, cursor, limit: 25 })),
    listSchoolClasses(actor, { schoolId: school.schoolId }),
    listSchoolInvitations(actor, { schoolId: school.schoolId, role: "STUDENT" }),
    isFeatureEnabled("sms"),
  ]);
  const keep = { status: status === "ACTIVE" ? undefined : status, q, classId };

  return (
    <Container size="wide">
      <PageHeader
        title="Students"
        description="Your school's roster. Import a class list to create school accounts, or invite students who already have an account."
        actions={
          <ButtonLink href="/school/students/import" iconStart={<Upload aria-hidden="true" />}>
            Import students
          </ButtonLink>
        }
      />
      <div className="space-y-6 pb-8">
        <section aria-labelledby="student-list" className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="student-list" className="text-lg font-semibold text-text">
              {STATUS_LABELS[status]}
            </h2>
            <nav aria-label="Student status" className="flex flex-wrap gap-1 rounded-control bg-subtle p-1">
              {MEMBER_LIST_STATUSES.map((value) => (
                <Link
                  key={value}
                  href={buildHref("/school/students", { status: value === "ACTIVE" ? undefined : value })}
                  aria-current={value === status ? "page" : undefined}
                  className={cn("inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:text-text lg:pointer-fine:min-h-9", value === status && "bg-surface text-text shadow-xs")}
                >
                  {STATUS_LABELS[value]}
                </Link>
              ))}
            </nav>
          </div>
          <form method="get" action="/school/students" role="search" className="flex flex-col gap-2 sm:flex-row sm:items-end">
            {status !== "ACTIVE" && <input type="hidden" name="status" value={status} />}
            <div className="flex-1 sm:max-w-sm">
              <label htmlFor="student-search" className="sr-only">
                Search students
              </label>
              <Input id="student-search" type="search" name="q" defaultValue={q} placeholder="Name, username or student number" />
            </div>
            {status === "ACTIVE" && classes.length > 0 && (
              <div className="sm:w-56">
                <label htmlFor="student-class" className="sr-only">
                  Class
                </label>
                <Select id="student-class" name="classId" defaultValue={classId ?? ""} placeholder="All classes" options={classes.map((c) => ({ value: c.id, label: c.name }))} />
              </div>
            )}
            <Button type="submit" variant="outline">
              Show
            </Button>
          </form>
          <DataTable
            caption="Students"
            rows={page.items}
            rowKey={(row) => row.memberId}
            empty={
              <EmptyState
                title={q || classId ? "No students match" : status === "ACTIVE" ? "No students yet" : status === "REQUESTED" ? "No join requests" : "No removed students"}
                description={status === "ACTIVE" && !q && !classId ? "Import your class lists to create student accounts with printable sign-in slips." : undefined}
                action={status === "ACTIVE" && !q && !classId ? <ButtonLink href="/school/students/import">Import students</ButtonLink> : undefined}
                titleAs="p"
              />
            }
            columns={[
              {
                key: "name",
                header: "Student",
                primary: true,
                cell: (row) =>
                  row.status === "ACTIVE" ? (
                    <Link href={`/school/students/${row.userId}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                      {row.name}
                    </Link>
                  ) : (
                    row.name
                  ),
              },
              { key: "username", header: "School username", cell: (row) => (row.username ? <span className="font-mono text-sm">{row.username}</span> : <span className="text-muted">Own account</span>) },
              { key: "number", header: "Student no.", hideOnMobile: true, cell: (row) => row.studentNumber ?? "—" },
              { key: "form", header: "Form", hideOnMobile: true, cell: (row) => row.form ?? "—" },
              { key: "classes", header: "Classes", cell: (row) => (row.classes.length ? row.classes.map((c) => c.name).join(", ") : <span className="text-muted">None</span>) },
              { key: "active", header: "Last active", hideOnMobile: true, cell: (row) => formatDate(row.lastActiveAt, school.timezone) },
              {
                key: "actions",
                header: "Actions",
                align: "end",
                cell: (row) =>
                  row.status === "REQUESTED" ? (
                    <div className="flex flex-wrap justify-end gap-2">
                      <ConfirmAction
                        action={approveRequestAction}
                        fields={{ userId: row.userId }}
                        triggerLabel="Approve"
                        triggerSize="sm"
                        triggerVariant="primary"
                        title={`Add ${row.name} to your school?`}
                        description="Approve only students you recognise. Your teachers can then add them to classes and see their work in those classes."
                        confirmLabel="Approve"
                      />
                      <ConfirmAction
                        action={declineRequestAction}
                        fields={{ userId: row.userId }}
                        triggerLabel="Decline"
                        triggerSize="sm"
                        triggerVariant="ghost"
                        tone="danger"
                        title={`Decline ${row.name}'s request?`}
                        confirmLabel="Decline"
                      />
                    </div>
                  ) : null,
              },
            ]}
          />
          {page.nextCursor && (
            <div className="flex justify-end">
              <ButtonLink href={buildHref("/school/students", { ...keep, cursor: page.nextCursor })} variant="outline">
                Next page
              </ButtonLink>
            </div>
          )}
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection title="Invite a student" description="For students who already have their own account (or want one). They accept the invitation in their own account.">
            <ActionForm action={inviteStudentAction} submitLabel="Send invitation" pendingLabel="Sending…">
              <AdminField
                name="contact"
                label="Student's email address (or mobile number)"
                autoComplete="off"
                required
                maxLength={254}
                hint={inviteContactHint(smsEnabled)}
              />
              <ActionResultCopyField field="inviteLink" label="Invitation link" hint="Works for 14 days. Share it only with the student: they open it, sign in or create an account, and accept." />
            </ActionForm>
          </AdminSection>
          <AdminSection title="Student invitations" flush>
            <InvitationList
              invitations={invitations}
              resendAction={resendInvitationAction}
              revokeAction={revokeInvitationAction}
              timeZone={school.timezone}
              emptyMessage="No student invitations yet."
            />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
