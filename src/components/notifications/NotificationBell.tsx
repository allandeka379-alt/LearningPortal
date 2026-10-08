import { Suspense } from "react";
import { NotificationBellButton, NotificationBellWithCount } from "./NotificationBellButton";

/**
 * The header bell with a SERVER-COMPUTED unread count (§19, §21, §22). Drop it into a server-rendered header.
 *
 * The count query starts during the server render and its promise is streamed to the client leaf, which unwraps it
 * with `use()` behind a Suspense boundary: a slow count never delays the page, and the fallback is the same bell
 * without a badge (it still works and loads the count when opened). The query never rejects: any failure degrades to
 * "count unknown" instead of taking the header down.
 *
 * Server Components never run where `window` exists, so outside a server render (component tests rendering the
 * header with React DOM) the bell renders without the server count and no server module is loaded.
 */
export function NotificationBell() {
  if (typeof window !== "undefined") return <NotificationBellButton initialUnread={null} />;
  const unread = loadUnreadCount();
  return (
    <Suspense fallback={<NotificationBellButton initialUnread={null} />}>
      <NotificationBellWithCount unread={unread} />
    </Suspense>
  );
}

async function loadUnreadCount(): Promise<number | null> {
  try {
    const [{ getActor }, { countUnread }] = await Promise.all([import("@/server/auth/actor"), import("@/server/notifications/service")]);
    const actor = await getActor();
    return actor ? await countUnread(actor.userId) : null;
  } catch (error) {
    await import("@/server/lib/logger")
      .then(({ logger }) => logger.warn("notification bell: unread count unavailable", { err: error }))
      .catch(() => undefined);
    return null;
  }
}
