import { z } from "zod";
import { apiRoute } from "@/server/lib/api";
import { getInboxDigest, markInboxRead } from "@/server/notifications/digest";

/**
 * Header bell feed (session cookie, STUDENT role). JSON envelopes from `apiRoute`, `Cache-Control: private, no-store`.
 *
 * GET  /app/notifications/feed?items=0|1   → `{ data: { unread, items? } }` (items: the 8 most recent, bodies shortened)
 * POST /app/notifications/feed             `{ ids: uuid[] }` or `{ all: true }` → `{ data: { updated, unread } }`
 *
 * POST is same-origin only (cookie CSRF check in `apiRoute`); only the caller's own notifications are ever touched.
 */

export const runtime = "nodejs";

const querySchema = z.object({ items: z.enum(["0", "1"]).optional() });
const markSchema = z.union([z.object({ ids: z.array(z.uuid()).min(1).max(50) }), z.object({ all: z.literal(true) })]);

export const GET = apiRoute(
  { auth: "required", roles: ["STUDENT"], operation: "app.notifications.feed", input: { query: querySchema } },
  async ({ actor, query }) => getInboxDigest(actor.userId, { includeItems: query.items === "1" }),
);

export const POST = apiRoute(
  { auth: "required", roles: ["STUDENT"], operation: "app.notifications.markRead", maxBodyBytes: 4 * 1024, input: { body: markSchema } },
  async ({ actor, body }) => markInboxRead(actor.userId, "all" in body ? "all" : body.ids),
);
