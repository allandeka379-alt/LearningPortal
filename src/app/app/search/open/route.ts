import { z } from "zod";
import { isOpenableType, SEARCH_PATH } from "@/components/search/links";
import { homePathFor, loginPathWithNext } from "@/server/auth/redirects";
import { authenticateRequest } from "@/server/auth/request-auth";
import { absoluteUrl } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { requestIdFromHeaders } from "@/server/lib/request";
import { resolveOpenTarget } from "../_lib/open";

/**
 * GET /app/search/open?type=SUBJECT|TOPIC|LESSON&id=…[&fallback=/public/path] — opens a search result inside the app
 * (see ../_lib/open.ts). Read-only: it only redirects (303). `fallback` is accepted only as an app-relative path, so
 * the route cannot be used as an open redirect.
 */

export const runtime = "nodejs";

const uuid = z.uuid();

function seeOther(path: string, requestId: string): Response {
  return new Response(null, {
    status: 303,
    headers: { location: absoluteUrl(path), "cache-control": "private, no-store", "x-request-id": requestId },
  });
}

export async function GET(request: Request): Promise<Response> {
  const requestId = requestIdFromHeaders(request.headers);
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id") ?? "";
  const fallback = url.searchParams.get("fallback");
  if (!isOpenableType(type) || !uuid.safeParse(id).success) return seeOther(SEARCH_PATH, requestId);

  let auth;
  try {
    auth = await authenticateRequest(request);
  } catch {
    auth = null;
  }
  if (auth === null) return seeOther(loginPathWithNext(`${url.pathname}${url.search}`), requestId);
  const { actor } = auth;
  if (!actor.roles.includes("STUDENT") || actor.studentOnboardingCompleted !== true) return seeOther(homePathFor(actor), requestId);

  try {
    return seeOther(await resolveOpenTarget(actor, { type, id, fallback }), requestId);
  } catch (error) {
    logger.error("search: could not open a result", { requestId, type, err: error });
    return seeOther(SEARCH_PATH, requestId);
  }
}
