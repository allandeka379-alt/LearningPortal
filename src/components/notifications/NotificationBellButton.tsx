"use client";

import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { buttonStyles } from "@/components/ui/button-styles";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/lib/cn";
import {
  announceNotificationsChanged,
  fetchNotificationFeed,
  markNotificationsRead,
  NOTIFICATIONS_CHANGED_EVENT,
  NOTIFICATIONS_FEED_URL,
  type BellItemView,
  type NotificationsChangedDetail,
} from "./client-api";
import { bellAccessibleName, categoryLabel, formatNotificationTime, unreadBadgeLabel } from "./format";

/** Background refresh of the unread count while the tab is visible (§29: light polling, no websockets). */
export const BELL_POLL_INTERVAL_MS = 3 * 60_000;
/** Returning to the tab refreshes the count when it is older than this. */
export const BELL_VISIBLE_REFRESH_MS = 60_000;
/** Navigating refreshes the count when it is older than this (layouts are not re-rendered on client navigation). */
export const BELL_NAVIGATION_REFRESH_MS = 15_000;

export interface NotificationBellButtonProps {
  /** Unread count rendered on the server; `null` when unknown (it is then fetched when the panel opens). */
  initialUnread: number | null;
  pollIntervalMs?: number;
  feedUrl?: string;
  allHref?: string;
}

type PanelStatus = "idle" | "loading" | "error";

/** The bell once the server's unread-count promise (streamed from `NotificationBell`) resolves. Suspends until then. */
export function NotificationBellWithCount({ unread, ...props }: Omit<NotificationBellButtonProps, "initialUnread"> & { unread: Promise<number | null> }) {
  return <NotificationBellButton initialUnread={use(unread)} {...props} />;
}

/**
 * Header bell (§19 reminders, §21 / §22 announcements): unread badge, and a sheet with the latest notifications
 * (bottom sheet on phones, side panel on desktop). The count starts from the server render, is refreshed every few
 * minutes ONLY while the tab is visible, when the student comes back to the tab, after client-side navigation and when
 * another widget marks notifications read. Opening a notification marks it read.
 */
export function NotificationBellButton({
  initialUnread,
  pollIntervalMs = BELL_POLL_INTERVAL_MS,
  feedUrl = NOTIFICATIONS_FEED_URL,
  allHref = "/app/notifications",
}: NotificationBellButtonProps) {
  const [unread, setUnread] = useState<number | null>(initialUnread);
  // A fresh server render (e.g. after a Server Action revalidated the layout) wins over the local count.
  const [serverUnread, setServerUnread] = useState(initialUnread);
  if (serverUnread !== initialUnread) {
    setServerUnread(initialUnread);
    setUnread(initialUnread);
  }
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<BellItemView[] | null>(null);
  const [status, setStatus] = useState<PanelStatus>("idle");
  const lastFetchAt = useRef(0);
  const pathname = usePathname();
  const lastPathname = useRef(pathname);

  const refresh = useCallback(
    async (withItems: boolean): Promise<boolean> => {
      lastFetchAt.current = Date.now();
      const feed = await fetchNotificationFeed({ withItems, url: feedUrl });
      if (!feed) return false;
      setUnread(feed.unread);
      if (withItems && feed.items) setItems(feed.items);
      return true;
    },
    [feedUrl],
  );

  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") void refresh(false);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible" && Date.now() - lastFetchAt.current >= BELL_VISIBLE_REFRESH_MS) void refresh(false);
    };
    const onChanged = (event: Event) => {
      if ((event as CustomEvent<NotificationsChangedDetail>).detail?.source !== "bell") void refresh(false);
    };
    const timer = window.setInterval(tick, pollIntervalMs);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, onChanged);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, onChanged);
    };
  }, [pollIntervalMs, refresh]);

  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    if (Date.now() - lastFetchAt.current >= BELL_NAVIGATION_REFRESH_MS) void refresh(false);
  }, [pathname, refresh]);

  const load = () => {
    setStatus("loading");
    void refresh(true).then((ok) => setStatus(ok ? "idle" : "error"));
  };

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) load();
  };

  const openItem = (item: BellItemView) => {
    if (!item.unread) return;
    setItems((current) => current?.map((entry) => (entry.id === item.id ? { ...entry, unread: false } : entry)) ?? current);
    setUnread((current) => (current === null ? current : Math.max(0, current - 1)));
    void markNotificationsRead({ ids: [item.id] }, { url: feedUrl, keepalive: true }).then((result) => {
      if (result) announceNotificationsChanged("bell");
    });
  };

  const markAll = async () => {
    setItems((current) => current?.map((entry) => ({ ...entry, unread: false })) ?? current);
    setUnread(0);
    const result = await markNotificationsRead({ all: true }, { url: feedUrl });
    if (result) {
      setUnread(result.unread);
      announceNotificationsChanged("bell");
    }
  };

  const count = unread ?? 0;
  const badge = unreadBadgeLabel(count);
  const now = new Date();

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      closeOnLinkClick
      title="Notifications"
      description={count > 0 ? `${count} unread` : undefined}
      trigger={
        <button
          type="button"
          aria-label={bellAccessibleName(unread)}
          className={cn(buttonStyles({ variant: "ghost", iconOnly: true }), "relative -mx-1 rounded-full")}
        >
          <Bell aria-hidden="true" />
          {badge && (
            <span
              aria-hidden="true"
              className="absolute top-1 right-0.5 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[0.6875rem] leading-none font-bold text-on-accent tabular-nums"
            >
              {badge}
            </span>
          )}
        </button>
      }
      footer={
        <>
          <Button variant="ghost" onClick={() => void markAll()} disabled={count === 0} iconStart={<CheckCheck aria-hidden="true" />}>
            Mark all as read
          </Button>
          <Link href={allHref} className={buttonStyles({ variant: "outline" })}>
            See all notifications
          </Link>
        </>
      }
    >
      {status === "error" ? (
        <div role="alert" className="space-y-3 py-2 text-sm text-muted">
          <p>We couldn&apos;t load your notifications. Check your connection and try again.</p>
          <Button variant="outline" size="sm" onClick={load}>
            Try again
          </Button>
        </div>
      ) : items === null ? (
        <p role="status" className="py-2 text-sm text-muted">
          Loading notifications…
        </p>
      ) : items.length === 0 ? (
        <div className="py-6 text-center">
          <p className="font-semibold text-text">You&apos;re all caught up</p>
          <p className="mt-1 text-sm text-muted">Reminders, announcements and updates will appear here.</p>
        </div>
      ) : (
        <ul className="-mx-2 divide-y divide-border" aria-label="Recent notifications">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => openItem(item)}
                className="flex min-h-11 gap-3 rounded-control px-2 py-3 transition-colors hover:bg-subtle"
              >
                <span
                  aria-hidden="true"
                  className={cn("mt-1.5 size-2 shrink-0 rounded-full", item.unread ? "bg-primary" : "bg-transparent")}
                />
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-sm break-words text-text", item.unread ? "font-semibold" : "font-medium")}>{item.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm break-words text-muted">{item.body}</span>
                  <span className="mt-1 block text-xs text-muted">
                    {categoryLabel(item.category)} · <time dateTime={item.createdAt.toISOString()}>{formatNotificationTime(item.createdAt, now)}</time>
                    {item.unread && <span className="sr-only">, unread</span>}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  );
}
