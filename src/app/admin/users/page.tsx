import { Users } from "lucide-react";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ActionResultCopyField } from "@/components/admin/CopyValueField";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection, Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ROLE_LABELS, ROLE_OPTIONS, RoleBadges, UserNameCell } from "@/components/admin/users/UserBits";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Role, UserStatus } from "@/generated/prisma/enums";
import { listUsers, staffRolesManageableBy } from "@/server/cms/users/service";
import { createStaffUserAction } from "./actions";

export const metadata = { title: "Users" };

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "PENDING_DELETION", label: "Deletion pending" },
  { value: "DELETED", label: "Deleted" },
];

/** /admin/users — §36 Users: search by email, phone, name or id; filter by role and status; cursor pages. */
export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("users.manage", { next: "/admin/users" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    role: enumParam(params, "role", Object.values(Role)),
    status: enumParam(params, "status", Object.values(UserStatus)),
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listUsers(actor, f));
  const staffRoleOptions = staffRolesManageableBy(actor).map((role) => ({ value: role, label: ROLE_LABELS[role] }));

  return (
    <Container size="wide">
      <PageHeader title="Users" description="Every account on the platform. Phone numbers are masked in lists; open a user to see their record." />
      {staffRoleOptions.length > 0 && (
        <AdminSection
          title="Create staff account"
          description="Use this for back-office users only. The one-time password is shown once and must be changed on first sign-in."
          className="mb-6"
        >
          <ActionForm action={createStaffUserAction} submitLabel="Create staff account" pendingLabel="Creating…" columns="two">
            <AdminField name="firstName" label="First name" required autoComplete="given-name" />
            <AdminField name="lastName" label="Last name" optional autoComplete="family-name" />
            <AdminField name="email" label="Email address" type="email" required autoComplete="email" wide />
            <AdminField name="role" label="Staff role" type="select" options={staffRoleOptions} placeholder="Choose a role" required />
            <AdminField
              name="reason"
              label="Reason"
              type="textarea"
              rows={3}
              maxLength={500}
              required
              wide
              hint="For example: onboarding finance lead or granting owner access. No contact details."
            />
            <div className="md:col-span-2">
              <ActionResultCopyField field="temporaryPassword" label="One-time password" hint="Shown once. Give it privately; do not send it by email." />
            </div>
          </ActionForm>
        </AdminSection>
      )}
      <FilterBar
        action="/admin/users"
        search={{ label: "Search", placeholder: "Email, phone, name or user id", value: filters.q }}
        filters={[
          { kind: "select", name: "role", label: "Role", options: ROLE_OPTIONS, value: filters.role },
          { kind: "select", name: "status", label: "Status", options: STATUS_OPTIONS, value: filters.status, placeholder: "All except deleted" },
        ]}
      />
      <DataTable
        caption="Users"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<Users aria-hidden="true" />}
            title={filters.q || filters.role || filters.status ? "No users match these filters" : "No users yet"}
            description={filters.q ? "Check the spelling, or search by the full email address or phone number." : undefined}
          />
        }
        columns={[
          {
            key: "name",
            header: "User",
            primary: true,
            cell: (row) => <UserNameCell id={row.id} name={row.name} email={row.email} loginUsername={row.loginUsername} phoneMasked={row.phoneMasked} isDemo={row.isDemo} />,
          },
          { key: "phone", header: "Phone", hideOnMobile: true, cell: (row) => <span className="tabular-nums">{row.phoneMasked ?? "—"}</span> },
          { key: "roles", header: "Roles", cell: (row) => <RoleBadges roles={row.roles} /> },
          { key: "status", header: "Status", cell: (row) => <StatusBadge kind="user" status={row.status} /> },
          { key: "verified", header: "Verified", hideOnMobile: true, cell: (row) => (row.verified ? "Yes" : "Not yet") },
          { key: "joined", header: "Joined", hideOnMobile: true, cell: (row) => <Timestamp value={row.createdAt} /> },
          { key: "active", header: "Last active", cell: (row) => <Timestamp value={row.lastActiveAt} /> },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/users" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="User pages" />
    </Container>
  );
}
