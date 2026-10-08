import { operations } from "@/server/api/contract";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";
import { paginated } from "@/server/lib/api";
import { listNotifications } from "@/server/notifications";

/** GET /api/v1/notifications?unreadOnly=&cursor=&limit= — the caller's in-app inbox, newest first (any role). */

export const runtime = "nodejs";

export const GET = v1Route(operations.listNotifications, async ({ actor, query }) => {
  const page = await listNotifications(actor.userId, {
    cursor: query.cursor ?? null,
    ...(query.limit ? { limit: query.limit } : {}),
    unreadOnly: query.unreadOnly === "true",
  });
  return paginated(toJson(page.items), page.nextCursor);
});
