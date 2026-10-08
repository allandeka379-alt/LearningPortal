import { ChartColumn, Megaphone, RotateCcw, ShieldCheck, ShieldOff, UserMinus, XCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { ActionResultCopyField } from "@/components/admin/CopyValueField";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { SchoolForm } from "@/components/admin/schools/SchoolForm";
import { inviteContactHint } from "@/components/school/invitation-copy";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { DemoBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { SchoolMemberRole, SchoolMemberStatus } from "@/generated/prisma/enums";
import { formatNumber } from "@/lib/format";
import { getSchool, listCountryOptions, listSchoolMembers, type SchoolDetail } from "@/server/cms/schools/service";
import { isFeatureEnabled } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import {
  changeSchoolStatusAction,
  inviteMemberAction,
  removeMemberAction,
  resendInvitationAction,
  revokeInvitationAction,
  updateSchoolAction,
} from "../actions";

export const metadata = { title: "School" };

/**
 * /admin/schools/[id] — one school (§23 admin side): details and verification, members (invite school admins and
 * teachers, remove), pending invitations, seats and subscription, links to its analytics and announcements.
 */
export default async function AdminSchoolPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PageSearchParams> }) {
  const { id } = await params;
  const actor = await requireAdminPage("school.manage", { next: `/admin/schools/${id}` });
  const query = await searchParams;
  let school: SchoolDetail;
  try {
    school = await getSchool(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const memberFilters = {
    schoolId: school.id,
    role: enumParam(query, "role", Object.values(SchoolMemberRole)),
    status: enumParam(query, "status", Object.values(SchoolMemberStatus)),
    q: firstParam(query, "q"),
    cursor: firstParam(query, "cursor"),
  };
  const [members, countries, smsEnabled] = await Promise.all([
    loadFirstPageOnStaleCursor(memberFilters, (f) => listSchoolMembers(actor, f)),
    listCountryOptions(actor),
    isFeatureEnabled("sms"),
  ]);
  const path = `/admin/schools/${school.id}`;

  return (
    <Container size="wide">
      <PageHeader
        title={
          <span className="inline-flex flex-wrap items-center gap-2">
            {school.name}
            {school.isDemo && <DemoBadge size="md" />}
          </span>
        }
        breadcrumbs={[{ label: "Schools", href: "/admin/schools" }, { label: school.name }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge kind="school" status={school.status} size="md" />
            <span>
              {humanizeEnum(school.type)} · {[school.town, school.district, school.region, school.country].filter(Boolean).join(", ")}
            </span>
          </span>
        }
        actions={
          <>
            <ButtonLink href={`${path}/analytics`} variant="outline" iconStart={<ChartColumn aria-hidden="true" />}>
              School analytics
            </ButtonLink>
            <ButtonLink href={`/admin/notifications/new?scope=SCHOOL&school=${encodeURIComponent(school.slug)}`} variant="outline" iconStart={<Megaphone aria-hidden="true" />}>
              Announce
            </ButtonLink>
          </>
        }
      />

      {school.status === "PENDING_VERIFICATION" && (
        <Alert tone="warning" className="mb-6" title="Not verified yet">
          Check the school against an official register before verifying it. Members can be added now; school billing starts after verification.
        </Alert>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Active students" value={school.members.STUDENT.active} hint={school.members.STUDENT.requested > 0 ? `${formatNumber(school.members.STUDENT.requested)} waiting for approval` : undefined} />
            <StatTile label="Active teachers" value={school.members.TEACHER.active} />
            <StatTile label="School admins" value={school.members.SCHOOL_ADMIN.active} />
            <StatTile label="Classes" value={school.classes} hint={`${formatNumber(school.subjects)} subjects offered`} />
          </div>

          <AdminSection title="Members" description="Students join through the school's rosters, class codes or requests; admins and teachers are invited here." flush>
            <div className="px-4 sm:px-5">
              <FilterBar
                action={path}
                label="Member filters"
                search={{ label: "Search members", placeholder: "Name, email or student number", value: memberFilters.q }}
                filters={[
                  { kind: "select", name: "role", label: "Role", options: Object.values(SchoolMemberRole).map((value) => ({ value, label: humanizeEnum(value) })), value: memberFilters.role },
                  { kind: "select", name: "status", label: "Status", options: Object.values(SchoolMemberStatus).map((value) => ({ value, label: humanizeEnum(value) })), value: memberFilters.status },
                ]}
              />
            </div>
            <DataTable
              caption="School members"
              rows={members.items}
              rowKey={(row) => row.id}
              empty={<p className="px-5 pb-5 text-sm text-muted">No members match.</p>}
              columns={[
                {
                  key: "name",
                  header: "Member",
                  primary: true,
                  cell: (row) => (
                    <span className="block min-w-0">
                      <Link href={`/admin/users/${row.userId}`} className="font-semibold text-text underline-offset-4 hover:underline">
                        {row.name}
                      </Link>
                      <span className="block truncate text-xs font-normal text-muted">{row.email ?? row.phoneMasked ?? "—"}</span>
                    </span>
                  ),
                },
                { key: "role", header: "Role", cell: (row) => humanizeEnum(row.role) },
                { key: "number", header: "Student no.", hideOnMobile: true, cell: (row) => row.studentNumber ?? "—" },
                { key: "status", header: "Status", cell: (row) => <StatusBadge kind="member" status={row.status} /> },
                { key: "joined", header: "Joined", hideOnMobile: true, cell: (row) => (row.joinedAt ? formatDate(row.joinedAt) : "—") },
                {
                  key: "actions",
                  header: <span className="sr-only">Actions</span>,
                  align: "end",
                  cell: (row) =>
                    row.status === "REMOVED" ? null : (
                      <ConfirmAction
                        action={removeMemberAction}
                        fields={{ schoolId: school.id, memberId: row.id }}
                        tone="danger"
                        triggerLabel="Remove"
                        triggerIcon={<UserMinus aria-hidden="true" />}
                        title={`Remove ${row.name} from ${school.name}?`}
                        description={
                          row.role === "STUDENT"
                            ? "They leave the school's classes. Their own learning history is kept."
                            : "They lose access to the school and stop teaching its classes."
                        }
                        confirmLabel="Remove member"
                        reason={{ label: "Reason" }}
                      />
                    ),
                },
              ]}
            />
            <div className="px-4 pb-4 sm:px-5">
              <CursorPagination path={path} params={query} nextCursor={members.nextCursor} shownCount={members.items.length} label="Member pages" />
            </div>
          </AdminSection>

          <AdminSection title="Invitations" description="Invitations to people without an account. Links expire after 14 days.">
            {school.invitations.length === 0 ? (
              <p className="text-sm text-muted">No invitations sent yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {school.invitations.map((invitation) => (
                  <li key={invitation.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="min-w-0">
                      <span className="block font-medium text-text">
                        {invitation.targetMasked} <span className="font-normal text-muted">· {humanizeEnum(invitation.role)}</span>
                      </span>
                      <span className="block text-xs text-muted">
                        Sent {invitation.sendCount} {invitation.sendCount === 1 ? "time" : "times"}, last <Timestamp value={invitation.lastSentAt ?? invitation.createdAt} /> · expires{" "}
                        <Timestamp value={invitation.expiresAt} />
                      </span>
                    </span>
                    <span className="flex flex-wrap items-center gap-2">
                      <StatusBadge kind="invitation" status={invitation.state} />
                      {(invitation.state === "PENDING" || invitation.state === "EXPIRED") && (
                        <ActionForm
                          action={resendInvitationAction}
                          hiddenFields={{ schoolId: school.id, invitationId: invitation.id }}
                          submitLabel={
                            <>
                              <RotateCcw aria-hidden="true" className="size-4" /> Resend
                            </>
                          }
                          pendingLabel="Sending…"
                          submitVariant="outline"
                          className="w-full max-w-md text-left"
                        >
                          <ActionResultCopyField field="inviteLink" label="New invitation link" hint="The old link no longer works." />
                        </ActionForm>
                      )}
                      {invitation.state === "PENDING" && (
                        <ConfirmAction
                          action={revokeInvitationAction}
                          fields={{ schoolId: school.id, invitationId: invitation.id }}
                          tone="danger"
                          triggerLabel="Revoke"
                          triggerIcon={<XCircle aria-hidden="true" />}
                          title="Revoke this invitation?"
                          description="The link stops working immediately."
                          confirmLabel="Revoke"
                        />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </AdminSection>

          <AdminSection title="Edit details">
            <SchoolForm
              action={updateSchoolAction}
              countries={countries}
              schoolId={school.id}
              submitLabel="Save details"
              values={{
                name: school.name,
                slug: school.slug,
                countryId: school.countryId,
                type: school.type,
                region: school.region,
                district: school.district,
                town: school.town,
                officialCode: school.officialCode,
                contactEmail: school.contactEmail,
                contactPhone: school.contactPhone,
                website: school.website,
                timezone: school.timezone,
              }}
            />
          </AdminSection>
        </div>

        <div className="min-w-0 space-y-6">
          <AdminSection title="Status">
            <KeyValueList
              columns={1}
              items={[
                { label: "Status", value: <StatusBadge kind="school" status={school.status} /> },
                { label: "Verified", value: school.verifiedAt ? `${formatDate(school.verifiedAt)} by ${school.verifiedBy ?? "a former staff member"}` : "Not yet" },
                { label: "Added", value: `${formatDate(school.createdAt)}${school.createdBy ? ` by ${school.createdBy}` : ""}` },
              ]}
            />
            <StatusActions school={school} />
          </AdminSection>

          <AdminSection
            title="Invite an admin or teacher"
            description="Existing accounts are added at once and notified; anyone else gets an invitation link by email, shown here to share as well. Invite a school admin by email address: the invitation only works for the account that has confirmed that address."
          >
            {school.status === "CLOSED" ? (
              <p className="text-sm text-muted">This school is closed.</p>
            ) : (
              <ActionForm action={inviteMemberAction} hiddenFields={{ schoolId: school.id }} submitLabel="Send invitation" pendingLabel="Sending…">
                <AdminField name="contact" label="Email address (or a teacher's mobile number)" required maxLength={254} autoComplete="off" hint={inviteContactHint(smsEnabled)} />
                <AdminField
                  name="role"
                  label="Role"
                  type="select"
                  required
                  defaultValue="TEACHER"
                  options={[
                    { value: "TEACHER", label: "Teacher" },
                    { value: "SCHOOL_ADMIN", label: "School admin" },
                  ]}
                />
                <ActionResultCopyField field="inviteLink" label="Invitation link" hint="Works for 14 days. Share it only with the person you invited." />
              </ActionForm>
            )}
          </AdminSection>

          <AdminSection title="Subscription and seats">
            {school.seats ? (
              <KeyValueList
                columns={1}
                items={[
                  { label: "Seats purchased", value: school.seats.purchased === null ? "Not set" : formatNumber(school.seats.purchased) },
                  { label: "Seats allocated to students", value: formatNumber(school.seats.allocated) },
                ]}
              />
            ) : (
              <p className="text-sm text-muted">No live school subscription.</p>
            )}
            {school.subscriptions.length > 0 && (
              <ul className="mt-4 divide-y divide-border">
                {school.subscriptions.map((sub) => (
                  <li key={sub.id} className="py-2 text-sm">
                    <span className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-text">{sub.plan}</span>
                      <StatusBadge kind="subscription" status={sub.status} />
                    </span>
                    <span className="block text-xs text-muted">
                      {humanizeEnum(sub.source)}
                      {sub.seats !== null ? ` · ${formatNumber(sub.seats)} seats` : ""}
                      {sub.currentPeriodEnd ? ` · until ${formatDate(sub.currentPeriodEnd)}` : ""}
                      {sub.cancelAtPeriodEnd ? " · stops at period end" : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <h3 className="mt-5 text-sm font-semibold text-text">Plan requests</h3>
            {school.planRequests.length === 0 ? (
              <p className="mt-1 text-sm text-muted">The school hasn&rsquo;t asked for a plan from its billing page.</p>
            ) : (
              <ul className="mt-1 divide-y divide-border" aria-label="Plan requests">
                {school.planRequests.map((request) => (
                  <li key={request.id} className="py-2 text-sm">
                    <span className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-text">
                        {request.seats !== null ? `${formatNumber(request.seats)} students` : "Seats not given"}
                        {request.plan ? ` · ${request.plan}` : ""}
                      </span>
                      <span className="text-xs text-muted">{formatDate(request.createdAt)}</span>
                    </span>
                    <span className="block text-xs text-muted">
                      {request.requestedBy ? `By ${request.requestedBy}` : "By a school admin"}
                      {request.hasMessage ? " · with a message (see your notifications)" : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </AdminSection>

          <AdminSection title="Contact">
            <KeyValueList
              columns={1}
              items={[
                { label: "Email", value: school.contactEmail },
                { label: "Phone", value: school.contactPhone },
                { label: "Website", value: school.website },
                { label: "Official code", value: school.officialCode },
                { label: "Time zone", value: school.timezone },
                { label: "URL slug", value: <code className="font-mono text-xs">{school.slug}</code> },
              ]}
            />
            <p className="mt-4 text-sm">
              <Link href={`/admin/audit?entityType=School&entityId=${school.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
                Audit history for this school
              </Link>
            </p>
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}

const TRANSITION_COPY: Record<string, { label: string; title: string; description: string; tone: "danger" | "primary"; reason: boolean }> = {
  ACTIVE: { label: "Verify / activate", title: "Activate this school?", description: "Its admins and teachers can use the school area.", tone: "primary", reason: false },
  SUSPENDED: { label: "Suspend", title: "Suspend this school?", description: "Its admins and teachers lose school access until it is reactivated. Students keep their own accounts.", tone: "danger", reason: true },
  CLOSED: { label: "Close", title: "Close this school?", description: "Closing is permanent: the school stops operating on the platform. Its history is kept.", tone: "danger", reason: true },
};

function StatusActions({ school }: { school: SchoolDetail }) {
  if (school.allowedTransitions.length === 0) return <p className="mt-4 text-sm text-muted">Closed schools can&apos;t change status.</p>;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {school.allowedTransitions.map((to) => {
        const copy = TRANSITION_COPY[to]!;
        const label = to === "ACTIVE" && school.status === "SUSPENDED" ? "Reactivate" : to === "ACTIVE" ? "Verify" : copy.label;
        return (
          <ConfirmAction
            key={to}
            action={changeSchoolStatusAction}
            fields={{ schoolId: school.id, to }}
            tone={copy.tone}
            triggerLabel={label}
            triggerVariant={copy.tone === "primary" ? "secondary" : "outline"}
            triggerIcon={to === "ACTIVE" ? <ShieldCheck aria-hidden="true" /> : <ShieldOff aria-hidden="true" />}
            title={to === "ACTIVE" && school.status === "PENDING_VERIFICATION" ? "Verify this school?" : copy.title}
            description={
              to === "ACTIVE" && school.status === "PENDING_VERIFICATION"
                ? "Confirm you have checked the school's name and details against an official register. Your name is recorded as the verifier."
                : copy.description
            }
            confirmLabel={label}
            reason={copy.reason ? { label: "Reason", required: true } : undefined}
          />
        );
      })}
    </div>
  );
}
