import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from "@/lib/config";
import { isValidTimeZone } from "@/lib/dates";

/**
 * Display helpers for the notification centre (bell, inbox, detail). Pure and isomorphic: safe in Server and Client
 * Components. No Prisma imports here (client bundles); the category keys mirror the `NotificationCategory` enum.
 */

export type NotificationCategoryKey =
  | "ACCOUNT"
  | "SECURITY"
  | "LEARNING"
  | "REMINDER"
  | "ASSIGNMENT"
  | "ANNOUNCEMENT"
  | "PARENT"
  | "BILLING"
  | "ACHIEVEMENT"
  | "SYSTEM";

export const CATEGORY_LABEL: Readonly<Record<NotificationCategoryKey, string>> = {
  ACCOUNT: "Account",
  SECURITY: "Security",
  LEARNING: "Learning",
  REMINDER: "Reminder",
  ASSIGNMENT: "Assignment",
  ANNOUNCEMENT: "Announcement",
  PARENT: "Family",
  BILLING: "Billing",
  ACHIEVEMENT: "Achievement",
  SYSTEM: "Update",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABEL[category as NotificationCategoryKey] ?? CATEGORY_LABEL.SYSTEM;
}

/** Badge text on the bell: the count up to 9, then "9+" (keeps the badge one small pill wide). */
export function unreadBadgeLabel(count: number): string {
  if (!Number.isFinite(count) || count <= 0) return "";
  return count > 9 ? "9+" : String(Math.floor(count));
}

/** Accessible name of the bell button, e.g. "Notifications, 3 unread". */
export function bellAccessibleName(count: number | null): string {
  if (count === null || !Number.isFinite(count) || count <= 0) return "Notifications";
  return `Notifications, ${Math.floor(count)} unread`;
}

const APP_PATH = /^\/(?![/\\])[^\s]*$/;

/** `href` when it is an app-relative path (never another origin, never protocol-relative), else `null`. */
export function safeAppHref(href: unknown): string | null {
  return typeof href === "string" && href.length <= 2_000 && APP_PATH.test(href) ? href : null;
}

const dateFormats = new Map<string, Intl.DateTimeFormat>();

function dateFormat(timeZone: string, withYear: boolean): Intl.DateTimeFormat {
  const key = `${timeZone}|${withYear}`;
  let format = dateFormats.get(key);
  if (!format) {
    format = new Intl.DateTimeFormat(DEFAULT_LOCALE, { day: "numeric", month: "short", ...(withYear ? { year: "numeric" } : {}), timeZone });
    dateFormats.set(key, format);
  }
  return format;
}

/**
 * Short relative time for a notification: "Just now", "5 min ago", "3 h ago", "Yesterday", "4 days ago", then a date
 * ("5 Oct", with the year when it differs). `now` is passed in so server renders are deterministic.
 */
export function formatNotificationTime(instant: Date, now: Date, timeZone?: string): string {
  const diffMs = now.getTime() - instant.getTime();
  if (!Number.isFinite(diffMs)) return "";
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.floor(hours / 24);
  if (days < 2) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  // No zone given (client-side panel): the viewer's own clock. An unknown zone falls back to Harare.
  const zone =
    timeZone === undefined ? Intl.DateTimeFormat().resolvedOptions().timeZone : isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
  const yearOf = (date: Date) => dateFormat(zone, true).formatToParts(date).find((part) => part.type === "year")?.value;
  return dateFormat(zone, yearOf(instant) !== yearOf(now)).format(instant);
}
