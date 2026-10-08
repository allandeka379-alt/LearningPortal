import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import { CategoryIcon } from "./CategoryIcon";
import { categoryLabel, formatNotificationTime } from "./format";
import { NotificationOpenLink } from "./NotificationReadTracking";

/** What the inbox list shows for one notification (computed on the server). */
export interface NotificationListEntry {
  id: string;
  category: string;
  title: string;
  body: string;
  /** Deep link (the notification's own app path) or its detail page. */
  href: string;
  unread: boolean;
  createdAt: Date;
}

export interface NotificationListProps {
  items: readonly NotificationListEntry[];
  /** "Now" of the request, so relative times are rendered deterministically on the server. */
  now: Date;
  timeZone: string;
  /** Server Action marking `notificationId` (form field) read. */
  markReadAction: (formData: FormData) => Promise<void>;
  /** Rendered instead of the list when there are no items. */
  empty?: ReactNode;
}

/**
 * The inbox list (/app/notifications): category, time, unread marker (in words, not colour alone), title linking to
 * the notification's target (marks it read), plain-text body, and a "mark as read" button that works without
 * JavaScript. Server component.
 */
export function NotificationList({ items, now, timeZone, markReadAction, empty = null }: NotificationListProps) {
  if (items.length === 0) return <>{empty}</>;
  return (
    <ul className="space-y-3" aria-label="Notifications">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "relative rounded-card border bg-surface p-4 transition-colors hover:bg-subtle/60 sm:p-5",
            item.unread ? "border-primary/40" : "border-border",
          )}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-4.5",
                item.unread ? "bg-primary-soft text-on-primary-soft" : "bg-subtle text-muted",
              )}
            >
              <CategoryIcon category={item.category} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted">
                <span>{categoryLabel(item.category)}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={item.createdAt.toISOString()}>{formatNotificationTime(item.createdAt, now, timeZone)}</time>
                {item.unread && (
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
                    Unread
                  </span>
                )}
              </p>
              <h2 className={cn("mt-1 text-base break-words text-text", item.unread ? "font-semibold" : "font-medium")}>
                <NotificationOpenLink
                  id={item.id}
                  href={item.href}
                  unread={item.unread}
                  className="rounded-sm after:absolute after:inset-0 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {item.title}
                </NotificationOpenLink>
              </h2>
              <p className="mt-1 line-clamp-3 text-sm break-words whitespace-pre-line text-muted">{item.body}</p>
            </div>
            {item.unread && (
              <form action={markReadAction} className="relative z-10 -my-1 -mr-1 shrink-0">
                <input type="hidden" name="notificationId" value={item.id} />
                <button type="submit" aria-label={`Mark "${item.title}" as read`} className={buttonStyles({ variant: "ghost", iconOnly: true })}>
                  <Check aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
