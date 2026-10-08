import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { ActionResultCopyField } from "@/components/admin/CopyValueField";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatDate } from "@/components/admin/format";
import { buildHref, enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { inviteContactHint } from "@/components/school/invitation-copy";
import { InvitationList } from "@/components/school/InvitationList";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { isFeatureEnabled } from "@/server/features";
import { listSchoolInvitations } from "@/server/schools/invitations";
import { listSchoolTeachers } from "@/server/schools/teachers";
import { orNotFound, requireSchoolPage } from "../_lib/context";
import { deactivateTeacherAction, inviteTeacherAction, resendInvitationAction, revokeInvitationAction } from "./actions";

export const metadata: Metadata = { title: "Teachers" };

const STATUSES = ["ACTIVE", "REMOVED"] as const;

/** /school/teachers — invite, list and deactivate teachers (§23 "manage teachers"). */
export default async function SchoolTeachersPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const { actor, school } = await requireSchoolPage("/school/teachers");
  const query = await searchParams;
  const status = enumParam(query, "status", STATUSES) ?? "ACTIVE";
  const q = firstParam(query, "q");
  const cursor = firstParam(query, "cursor");
  const [page, invitations, smsEnabled] = await Promise.all([
    orNotFound(listSchoolTeachers(actor, { schoolId: school.schoolId, status, q, cursor, limit: 25 })),
    listSchoolInvitations(actor, { schoolId: school.schoolId, role: "TEACHER" }),
    isFeatureEnabled("sms"),
  ]);

  return (
    <Container size="wide">
      <PageHeader title="Teachers" description="Invite your teachers, see which classes they teach, and deactivate those who have left." />
      <div className="space-y-6 pb-8">
        <AdminSection
          title="Invite a teacher"
          description="We email an invitation link to them, and show you the link to share too. They join your school when they accept it, with a new or existing account."
        >
          <ActionForm action={inviteTeacherAction} submitLabel="Send invitation" pendingLabel="Sending…" className="max-w-xl">
            <AdminField name="contact" label="Email address (or mobile number)" type="text" autoComplete="off" required maxLength={254} hint={inviteContactHint(smsEnabled)} />
            <ActionResultCopyField field="inviteLink" label="Invitation link" hint="Works for 14 days. Share it only with the teacher: they open it, sign in or create an account, and accept." />
          </ActionForm>
        </AdminSection>

        <section aria-labelledby="teacher-list" className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="teacher-list" className="text-lg font-semibold text-text">
              {status === "ACTIVE" ? "Current teachers" : "Deactivated teachers"}
            </h2>
            <nav aria-label="Teacher status" className="flex gap-1 rounded-control bg-subtle p-1">
              {STATUSES.map((value) => (
                <Link
                  key={value}
                  href={buildHref("/school/teachers", { status: value === "ACTIVE" ? undefined : value })}
                  aria-current={value === status ? "page" : undefined}
                  className={cn("inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:text-text lg:pointer-fine:min-h-9", value === status && "bg-surface text-text shadow-xs")}
                >
                  {value === "ACTIVE" ? "Current" : "Deactivated"}
                </Link>
              ))}
            </nav>
          </div>
          <form method="get" action="/school/teachers" role="search" className="flex max-w-md gap-2">
            {status !== "ACTIVE" && <input type="hidden" name="status" value={status} />}
            <label htmlFor="teacher-search" className="sr-only">
              Search teachers
            </label>
            <Input id="teacher-search" type="search" name="q" defaultValue={q} placeholder="Name or email" />
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
          <DataTable
            caption="Teachers"
            rows={page.items}
            rowKey={(row) => row.memberId}
            empty={
              <EmptyState
                title={q ? "No teachers match your search" : status === "ACTIVE" ? "No teachers yet" : "No deactivated teachers"}
                description={status === "ACTIVE" && !q ? "Invite your teachers above. They appear here once they accept." : undefined}
                titleAs="p"
              />
            }
            columns={[
              {
                key: "name",
                header: "Teacher",
                primary: true,
                cell: (row) => (
                  <span>
                    {row.name}
                    {row.isSchoolAdmin && (
                      <Badge tone="primary" size="sm" className="ml-2">
                        Admin
                      </Badge>
                    )}
                  </span>
                ),
              },
              { key: "contact", header: "Contact", cell: (row) => row.email ?? row.phoneMasked ?? "—" },
              {
                key: "classes",
                header: "Classes",
                cell: (row) =>
                  row.classes.length === 0 ? (
                    <span className="text-muted">None</span>
                  ) : (
                    <span className="flex flex-wrap gap-x-2 gap-y-1">
                      {row.classes.map((cls) => (
                        <Link key={cls.classId} href={`/school/classes/${cls.classId}`} className="text-primary underline-offset-4 hover:underline">
                          {cls.name}
                          {cls.role === "ASSISTANT" ? " (assistant)" : ""}
                        </Link>
                      ))}
                    </span>
                  ),
              },
              {
                key: "since",
                header: status === "ACTIVE" ? "Joined" : "Deactivated",
                hideOnMobile: true,
                cell: (row) => formatDate(status === "ACTIVE" ? row.joinedAt : row.removedAt, school.timezone),
              },
              {
                key: "actions",
                header: "Actions",
                align: "end",
                cell: (row) =>
                  row.status === "ACTIVE" ? (
                    <ConfirmAction
                      action={deactivateTeacherAction}
                      fields={{ userId: row.userId }}
                      triggerLabel="Deactivate"
                      triggerSize="sm"
                      tone="danger"
                      title={`Deactivate ${row.name}?`}
                      description="They stop teaching your school's classes at once and lose access to those students' work. Class history is kept."
                      confirmLabel="Deactivate"
                      reason={{ label: "Reason (optional, kept in the audit log)", maxLength: 500 }}
                    />
                  ) : null,
              },
            ]}
          />
          {page.nextCursor && (
            <div className="flex justify-end">
              <ButtonLink href={buildHref("/school/teachers", { status: status === "ACTIVE" ? undefined : status, q, cursor: page.nextCursor })} variant="outline">
                Next page
              </ButtonLink>
            </div>
          )}
        </section>

        <AdminSection title="Teacher invitations" description="Recent invitations. Contact details are partly hidden." flush>
          <InvitationList
            invitations={invitations}
            resendAction={resendInvitationAction}
            revokeAction={revokeInvitationAction}
            timeZone={school.timezone}
            emptyMessage="No teacher invitations yet."
          />
        </AdminSection>
      </div>
    </Container>
  );
}
