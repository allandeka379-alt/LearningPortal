import { Bell, CheckCheck, Settings } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { NotificationList } from "@/components/notifications/NotificationList";
import { RefreshOnBellChanges } from "@/components/notifications/NotificationReadTracking";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { getInboxPage } from "@/server/notifications/digest";
import { markAllNotificationsReadAction, markNotificationReadAction } from "./actions";

export const metadata: Metadata = { title: "Notifications" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pageHref(filter: "all" | "unread", cursor?: string | null): string {
  const params = new URLSearchParams();
  if (filter === "unread") params.set("filter", "unread");
  if (cursor) params.set("cursor", cursor);
  const query = params.toString();
  return query ? `/app/notifications?${query}` : "/app/notifications";
}

/**
 * Notification inbox (§19 reminders, §21 / §22 announcements, §6 study reminders): newest first, cursor-paginated,
 * All / Unread filter, mark one or all read. Each item links to its target (or its detail page) and is marked read
 * when opened.
 */
export default async function NotificationsPage({ searchParams }: { searchParams: SearchParams }) {
  const actor = await requireOnboardedStudent({ next: "/app/notifications" });
  const params = await searchParams;
  const filter = params.filter === "unread" ? "unread" : "all";
  const cursor = typeof params.cursor === "string" && params.cursor.length > 0 ? params.cursor : null;
  const unreadOnly = filter === "unread";
  const page = await getInboxPage(actor.userId, { cursor, unreadOnly }).catch((error: unknown) => {
    // A tampered or stale cursor shows the first page instead of an error.
    if (isAppError(error) && (error.code === "BAD_REQUEST" || error.code === "VALIDATION")) return getInboxPage(actor.userId, { unreadOnly });
    throw error;
  });
  const now = new Date();
  const firstPage = cursor === null;

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        title="Notifications"
        description="Study reminders, announcements and updates."
        actions={
          <>
            {page.unread > 0 && (
              <form action={markAllNotificationsReadAction}>
                <Button type="submit" variant="outline" iconStart={<CheckCheck aria-hidden="true" />}>
                  Mark all as read
                </Button>
              </form>
            )}
            <ButtonLink href="/app/notifications/settings" variant="ghost" iconStart={<Settings aria-hidden="true" />}>
              Settings
            </ButtonLink>
          </>
        }
      />
      <div className="space-y-4">
        <nav aria-label="Filter notifications" className="flex gap-2">
          {(["all", "unread"] as const).map((value) => {
            const current = value === filter;
            return (
              <Link
                key={value}
                href={pageHref(value)}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                  current ? "border-primary bg-primary-soft text-on-primary-soft" : "border-border text-text hover:bg-subtle",
                )}
              >
                {value === "all" ? "All" : page.unread > 0 ? `Unread (${formatNumber(page.unread)})` : "Unread"}
              </Link>
            );
          })}
        </nav>
        <NotificationList
          items={page.items}
          now={now}
          timeZone={actor.timeZone}
          markReadAction={markNotificationReadAction}
          empty={
            !firstPage ? (
              <p className="text-sm text-muted">No older notifications.</p>
            ) : unreadOnly ? (
              <EmptyState
                icon={<CheckCheck aria-hidden="true" />}
                title="You're all caught up"
                description="No unread notifications."
                action={
                  <ButtonLink href={pageHref("all")} variant="outline">
                    Show all notifications
                  </ButtonLink>
                }
              />
            ) : (
              <EmptyState
                icon={<Bell aria-hidden="true" />}
                title="No notifications yet"
                description="Study reminders, announcements from your school and teachers, and other updates will appear here."
                action={
                  <ButtonLink href="/app/notifications/settings" variant="outline">
                    Choose your reminders
                  </ButtonLink>
                }
              />
            )
          }
        />
        {(page.nextCursor || !firstPage) && (
          <div className="flex flex-wrap justify-center gap-3">
            {!firstPage && (
              <ButtonLink href={pageHref(filter)} variant="ghost">
                Newest notifications
              </ButtonLink>
            )}
            {page.nextCursor && (
              <ButtonLink href={pageHref(filter, page.nextCursor)} variant="outline">
                Older notifications
              </ButtonLink>
            )}
          </div>
        )}
      </div>
      <RefreshOnBellChanges />
    </Container>
  );
}
