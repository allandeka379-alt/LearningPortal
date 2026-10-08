import { GraduationCap } from "lucide-react";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { UserNameCell } from "@/components/admin/users/UserBits";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { GuardianConsentStatus, UserStatus } from "@/generated/prisma/enums";
import { ONBOARDING_FILTERS } from "@/server/cms/users/schemas";
import { listStudents } from "@/server/cms/users/service";

export const metadata = { title: "Students" };

const CONSENT_OPTIONS = Object.values(GuardianConsentStatus).map((value) => ({ value, label: humanizeEnum(value) }));

/**
 * /admin/students — §36 Students: track, onboarding and guardian-consent status. No learning data in the list;
 * opening a student's record asks for a reason (audited, ARCHITECTURE §5.3).
 */
export default async function AdminStudentsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("users.manage", { next: "/admin/students" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    status: enumParam(params, "status", Object.values(UserStatus)),
    onboarding: enumParam(params, "onboarding", ONBOARDING_FILTERS),
    consent: enumParam(params, "consent", Object.values(GuardianConsentStatus)),
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listStudents(actor, f));

  return (
    <Container size="wide">
      <PageHeader title="Students" description="Student accounts with their track and onboarding status. Opening a student's record is recorded in the audit log." />
      <FilterBar
        action="/admin/students"
        search={{ label: "Search", placeholder: "Email, phone, name or user id", value: filters.q }}
        filters={[
          {
            kind: "select",
            name: "onboarding",
            label: "Onboarding",
            options: [
              { value: "completed", label: "Completed" },
              { value: "in_progress", label: "In progress" },
            ],
            value: filters.onboarding,
          },
          { kind: "select", name: "consent", label: "Guardian consent", options: CONSENT_OPTIONS, value: filters.consent },
          {
            kind: "select",
            name: "status",
            label: "Status",
            options: Object.values(UserStatus).map((value) => ({ value, label: humanizeEnum(value) })),
            value: filters.status,
            placeholder: "All except deleted",
          },
        ]}
      />
      <DataTable
        caption="Students"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState icon={<GraduationCap aria-hidden="true" />} title={filters.q || filters.onboarding || filters.consent || filters.status ? "No students match these filters" : "No students yet"} />}
        columns={[
          {
            key: "name",
            header: "Student",
            primary: true,
            cell: (row) => <UserNameCell id={row.id} name={row.name} email={row.email} loginUsername={row.loginUsername} phoneMasked={row.phoneMasked} isDemo={row.isDemo} />,
          },
          {
            key: "track",
            header: "Track",
            cell: (row) => [row.examBoard, row.qualification, row.yearGroup].filter(Boolean).join(" · ") || <span className="text-muted">Not chosen yet</span>,
          },
          { key: "school", header: "School", hideOnMobile: true, cell: (row) => row.school ?? "—" },
          { key: "subjects", header: "Subjects", align: "end", hideOnMobile: true, cell: (row) => row.activeEnrollments },
          {
            key: "onboarding",
            header: "Onboarding",
            cell: (row) => (row.onboardingCompleted ? <Badge size="sm" tone="success">Done</Badge> : <Badge size="sm">In progress</Badge>),
          },
          {
            key: "consent",
            header: "Guardian consent",
            hideOnMobile: true,
            cell: (row) => (row.isMinor ? humanizeEnum(row.guardianConsentStatus) : "Adult (not needed)"),
          },
          { key: "status", header: "Status", cell: (row) => <StatusBadge kind="user" status={row.status} /> },
          { key: "active", header: "Last active", hideOnMobile: true, cell: (row) => <Timestamp value={row.lastActiveAt} /> },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/students" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Student pages" />
    </Container>
  );
}
