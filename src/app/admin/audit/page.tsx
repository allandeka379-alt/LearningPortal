import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { JsonPreview, Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { dateParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { listAuditLog, type AuditLogItem } from "@/server/cms/users/audit-log";
import { isAppError } from "@/server/lib/errors";

export const metadata = { title: "Audit log" };

/**
 * /admin/audit — read-only audit log (§39, ARCHITECTURE §5.10; ADMIN and SUPER_ADMIN via `audit.view`). Filters by
 * actor, affected person, entity, action and date; newest first with cursor pages. Entries are append-only and their
 * diffs were redacted when written (no contact details, secrets or answer text).
 */
export default async function AdminAuditPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("audit.view", { next: "/admin/audit" });
  const params = await searchParams;
  const filters = {
    actor: firstParam(params, "actor"),
    target: firstParam(params, "target"),
    action: firstParam(params, "action"),
    entityType: firstParam(params, "entityType"),
    entityId: firstParam(params, "entityId"),
    schoolId: uuidParam(params, "schoolId"),
    from: dateParam(params, "from"),
    to: dateParam(params, "to"),
    cursor: firstParam(params, "cursor"),
  };

  let page: { items: AuditLogItem[]; nextCursor: string | null } = { items: [], nextCursor: null };
  let filterError: string | null = null;
  try {
    page = await listAuditLog(actor, filters);
  } catch (error) {
    if (!isAppError(error) || (error.code !== "VALIDATION" && error.code !== "BAD_REQUEST")) throw error;
    filterError = error.fieldErrors ? Object.values(error.fieldErrors).flat().join(" ") : error.message;
  }
  const filtered = Object.entries(filters).some(([key, value]) => key !== "cursor" && Boolean(value));

  return (
    <Container size="wide">
      <PageHeader
        title="Audit log"
        description="Privileged actions across the platform: staff logins, role and status changes, publishing, payments, settings, student-record access. Read-only."
      />
      <FilterBar
        action="/admin/audit"
        keep={{ schoolId: filters.schoolId }}
        filters={[
          { kind: "text", name: "actor", label: "Done by", value: filters.actor, placeholder: "User id, email or system" },
          { kind: "text", name: "target", label: "Affected person", value: filters.target, placeholder: "User id or email" },
          { kind: "text", name: "action", label: "Action", value: filters.action, placeholder: "role.grant or auth." },
          { kind: "text", name: "entityType", label: "Entity type", value: filters.entityType, placeholder: "User, School, Setting" },
          { kind: "text", name: "entityId", label: "Entity id", value: filters.entityId },
          { kind: "date", name: "from", label: "From", value: filters.from },
          { kind: "date", name: "to", label: "To", value: filters.to },
        ]}
      />
      {filterError && (
        <Alert tone="danger" className="mb-4" role="alert" title="Check the filters">
          {filterError}
        </Alert>
      )}
      <DataTable
        caption="Audit log entries"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          filterError ? null : (
            <EmptyState icon={<ShieldCheck aria-hidden="true" />} title={filtered ? "No entries match these filters" : "No audit entries yet"} />
          )
        }
        columns={[
          { key: "time", header: "When", cell: (row) => <Timestamp value={row.createdAt} /> },
          {
            key: "action",
            header: "Action",
            primary: true,
            cell: (row) => <code className="rounded bg-subtle px-1.5 py-0.5 font-mono text-xs">{row.action}</code>,
          },
          {
            key: "actor",
            header: "Done by",
            cell: (row) =>
              row.actor ? (
                <Link href={`/admin/users/${row.actor.id}`} className="underline-offset-4 hover:underline">
                  {row.actor.name}
                </Link>
              ) : (
                <span className="text-muted">System</span>
              ),
          },
          {
            key: "target",
            header: "Affected",
            hideOnMobile: true,
            cell: (row) =>
              row.target ? (
                <Link href={`/admin/users/${row.target.id}`} className="underline-offset-4 hover:underline">
                  {row.target.name}
                </Link>
              ) : (
                "—"
              ),
          },
          {
            key: "entity",
            header: "Entity",
            hideOnMobile: true,
            cell: (row) => (
              <span className="block min-w-0">
                {row.entityType}
                {row.school && <span className="block text-xs text-muted">{row.school.name}</span>}
              </span>
            ),
          },
          { key: "details", header: "Details", cell: (row) => <EntryDetails entry={row} /> },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/audit" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Audit log pages" />
    </Container>
  );
}

function EntryDetails({ entry }: { entry: AuditLogItem }) {
  return (
    <details className="text-left">
      <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-primary underline-offset-4 hover:underline md:min-h-0">
        {entry.reason ? "Reason and details" : "Details"}
      </summary>
      <div className="mt-2 max-w-xl space-y-3 text-sm">
        {entry.reason && (
          <p>
            <span className="font-medium">Reason:</span> {entry.reason}
          </p>
        )}
        <p className="text-xs text-muted">
          Roles: {entry.actorRoles.length > 0 ? entry.actorRoles.join(", ") : "none"}
          {entry.entityId ? ` · Entity id: ${entry.entityId}` : ""}
          {entry.requestId ? ` · Request: ${entry.requestId}` : ""}
          {entry.ipHashPrefix ? ` · IP hash: ${entry.ipHashPrefix}…` : ""}
        </p>
        {entry.userAgent && <p className="text-xs break-words text-muted">{entry.userAgent}</p>}
        <JsonPreview label="Before" value={entry.before} />
        <JsonPreview label="After" value={entry.after} />
        <JsonPreview label="Context" value={entry.metadata} />
      </div>
    </details>
  );
}
