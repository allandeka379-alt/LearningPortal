"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import {
  announceNotificationsChanged,
  markNotificationsRead,
  NOTIFICATIONS_CHANGED_EVENT,
  type NotificationsChangedDetail,
} from "./client-api";

/**
 * Small client leaves of the inbox pages that keep the read state in sync without client-side data fetching for the
 * initial render: opening a notification marks it read, the detail page marks itself read once viewed, and the inbox
 * re-renders when the header bell changed the read state.
 */

export interface NotificationOpenLinkProps {
  id: string;
  href: string;
  unread: boolean;
  className?: string;
  children: ReactNode;
}

/** Link to a notification's target that marks it read on the way (the request survives the navigation). */
export function NotificationOpenLink({ id, href, unread, className, children }: NotificationOpenLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (!unread) return;
        void markNotificationsRead({ ids: [id] }, { keepalive: true }).then((result) => {
          if (result) announceNotificationsChanged("page");
        });
      }}
    >
      {children}
    </Link>
  );
}

/** Marks the viewed notification read once (client-side, so link prefetching never marks anything read). */
export function MarkReadOnView({ id, unread }: { id: string; unread: boolean }) {
  const sent = useRef(false);
  useEffect(() => {
    if (!unread || sent.current) return;
    sent.current = true;
    void markNotificationsRead({ ids: [id] }).then((result) => {
      if (result) announceNotificationsChanged("page");
    });
  }, [id, unread]);
  return null;
}

/** Re-renders the current page (server data) when the header bell marks notifications read. */
export function RefreshOnBellChanges() {
  const router = useRouter();
  useEffect(() => {
    const onChanged = (event: Event) => {
      if ((event as CustomEvent<NotificationsChangedDetail>).detail?.source === "bell") router.refresh();
    };
    window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, onChanged);
  }, [router]);
  return null;
}
