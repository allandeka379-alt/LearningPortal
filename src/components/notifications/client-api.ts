import { safeAppHref, type NotificationCategoryKey } from "./format";

/**
 * Browser-side calls to the notification feed (`/app/notifications/feed`): the bell's unread count and recent items,
 * and marking notifications read. Plain `fetch` (no data library, §29 low bandwidth); every response is validated by
 * hand and any failure resolves to `null`, so a flaky connection only leaves the last known state on screen.
 */

export const NOTIFICATIONS_FEED_URL = "/app/notifications/feed";

/** Window event fired after notifications were marked read, so other widgets (bell, inbox) can refresh. */
export const NOTIFICATIONS_CHANGED_EVENT = "dz:notifications-changed";

export interface NotificationsChangedDetail {
  /** Who changed them: the bell ignores its own events; the inbox page refreshes on the bell's. */
  source: "bell" | "page";
}

export interface BellItemView {
  id: string;
  title: string;
  body: string;
  category: NotificationCategoryKey;
  href: string;
  unread: boolean;
  createdAt: Date;
}

export interface FeedSnapshot {
  unread: number;
  items: BellItemView[] | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseItem(raw: unknown): BellItemView | null {
  if (!isRecord(raw)) return null;
  const { id, title, body, category, href, unread, createdAt } = raw;
  if (typeof id !== "string" || typeof title !== "string" || typeof body !== "string" || typeof category !== "string") return null;
  const created = typeof createdAt === "string" ? new Date(createdAt) : null;
  if (!created || Number.isNaN(created.getTime())) return null;
  return {
    id,
    title,
    body,
    category: category as NotificationCategoryKey,
    href: safeAppHref(href) ?? `/app/notifications/${encodeURIComponent(id)}`,
    unread: unread === true,
    createdAt: created,
  };
}

/** Parses `{ data: { unread, items? } }`; `null` for anything else (e.g. a login page after the session expired). */
export function parseFeedResponse(json: unknown): FeedSnapshot | null {
  if (!isRecord(json) || !isRecord(json.data)) return null;
  const { unread, items } = json.data;
  if (typeof unread !== "number" || !Number.isFinite(unread) || unread < 0) return null;
  return {
    unread: Math.floor(unread),
    items: Array.isArray(items) ? items.map(parseItem).filter((item): item is BellItemView => item !== null) : null,
  };
}

async function readJson(response: Response): Promise<unknown> {
  if (!response.ok || !(response.headers.get("content-type") ?? "").includes("application/json")) return null;
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

/** The unread count (and the recent items when `withItems`), or `null` when the request failed. */
export async function fetchNotificationFeed(
  options: { withItems?: boolean; url?: string; signal?: AbortSignal } = {},
): Promise<FeedSnapshot | null> {
  const url = `${options.url ?? NOTIFICATIONS_FEED_URL}?items=${options.withItems ? "1" : "0"}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
      headers: { accept: "application/json" },
      ...(options.signal ? { signal: options.signal } : {}),
    });
    return parseFeedResponse(await readJson(response));
  } catch {
    return null;
  }
}

/**
 * Marks notifications read (`ids`, or every one with `all`). `keepalive` lets the request finish while the page
 * navigates away (clicking a notification). Resolves to the new unread count, or `null` on failure.
 */
export async function markNotificationsRead(
  target: { ids: readonly string[] } | { all: true },
  options: { url?: string; keepalive?: boolean } = {},
): Promise<{ unread: number } | null> {
  try {
    const response = await fetch(options.url ?? NOTIFICATIONS_FEED_URL, {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify("all" in target ? { all: true } : { ids: [...target.ids] }),
      ...(options.keepalive ? { keepalive: true } : {}),
    });
    const json = await readJson(response);
    if (!isRecord(json) || !isRecord(json.data) || typeof json.data.unread !== "number") return null;
    return { unread: Math.max(0, Math.floor(json.data.unread)) };
  } catch {
    return null;
  }
}

/** Tells other notification widgets on the page that the read state changed. */
export function announceNotificationsChanged(source: NotificationsChangedDetail["source"]): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<NotificationsChangedDetail>(NOTIFICATIONS_CHANGED_EVENT, { detail: { source } }));
}
