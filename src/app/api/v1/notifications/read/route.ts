import { operations } from "@/server/api/contract";
import { v1Route } from "@/server/api/route";
import { markRead } from "@/server/notifications";

/**
 * POST /api/v1/notifications/read — `{ ids: [...] }` or `{ all: true }` -> `{ data: { updated } }`. Only the caller's own
 * notifications change (ownership is part of the update filter); unknown ids are ignored.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.markNotificationsRead, ({ actor, body }) => markRead(actor.userId, "all" in body ? "all" : body.ids));
