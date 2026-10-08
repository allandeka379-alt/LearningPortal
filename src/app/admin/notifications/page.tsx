import { Megaphone, Plus } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ROLE_LABELS } from "@/components/admin/users/UserBits";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnnouncementScope } from "@/generated/prisma/enums";
import { formatNumber } from "@/lib/format";
import { ANNOUNCEMENT_STATES } from "@/server/cms/announcements/schemas";
import { listAnnouncements } from "@/server/cms/announcements/service";

export const metadata = { title: "Notifications" };

const SCOPE_LABELS: Record<string, string> = { GLOBAL: "Platform-wide", SCHOOL: "School", CLASS: "Class" };

/** /admin/notifications — announcements of every scope (§36 Notifications) with their delivery counts. */
export default async function AdminNotificationsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("class.manage", { next: "/admin/notifications" });
  const params = await searchParams;
  const filters = {
    q: firstParam(params, "q"),
    scope: enumParam(params, "scope", Object.values(AnnouncementScope)),
    state: enumParam(params, "state", ANNOUNCEMENT_STATES),
    cursor: firstParam(params, "cursor"),
  };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listAnnouncements(actor, f));
  const filtered = Boolean(filters.q || filters.scope || filters.state);

  return (
    <Container size="wide">
      <PageHeader
        title="Notifications"
        description="Announcements to everyone, a school or a class. Publishing delivers them to recipients' in-app inbox."
        actions={
          <ButtonLink href="/admin/notifications/new" iconStart={<Plus aria-hidden="true" />}>
            New announcement
          </ButtonLink>
        }
      />
      <FilterBar
        action="/admin/notifications"
        search={{ label: "Search titles", placeholder: "Title", value: filters.q }}
        filters={[
          { kind: "select", name: "scope", label: "Audience", options: Object.values(AnnouncementScope).map((value) => ({ value, label: SCOPE_LABELS[value] ?? value })), value: filters.scope },
          { kind: "select", name: "state", label: "State", options: ANNOUNCEMENT_STATES.map((value) => ({ value, label: humanizeEnum(value) })), value: filters.state },
        ]}
      />
      <DataTable
        caption="Announcements"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<Megaphone aria-hidden="true" />}
            title={filtered ? "No announcements match these filters" : "No announcements yet"}
            action={filtered ? undefined : <ButtonLink href="/admin/notifications/new">Write the first announcement</ButtonLink>}
          />
        }
        columns={[
          {
            key: "title",
            header: "Announcement",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0">
                <Link href={`/admin/notifications/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                  {row.title}
                </Link>
                {row.pinned && (
                  <Badge size="sm" tone="accent" className="ml-2 align-middle">
                    Pinned
                  </Badge>
                )}
                <span className="block truncate text-xs font-normal text-muted">
                  {row.target ?? SCOPE_LABELS[row.scope]} · by {row.author}
                </span>
              </span>
            ),
          },
          {
            key: "audience",
            header: "Audience",
            hideOnMobile: true,
            cell: (row) => (row.audienceRoles.length === 0 ? "Everyone in scope" : row.audienceRoles.map((role) => ROLE_LABELS[role]).join(", ")),
          },
          { key: "state", header: "State", cell: (row) => <StatusBadge kind="announcement" status={row.state} /> },
          { key: "published", header: "Publishes / published", cell: (row) => <Timestamp value={row.publishedAt} /> },
          { key: "recipients", header: "Delivered", align: "end", cell: (row) => (row.publishedAt ? formatNumber(row.recipients) : "—") },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/notifications" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Announcement pages" />
    </Container>
  );
}
