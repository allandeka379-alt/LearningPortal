import { operations } from "@/server/api/contract";
import { getOpenApiDocument, switchedOffTags, withoutSwitchedOffFeatures } from "@/server/api/openapi";
import { v1Route } from "@/server/api/route";
import { getFeatures } from "@/server/features";

/**
 * GET /api/v1/openapi.json — the OpenAPI 3.1 document of the REST API, generated from the route contract and the same
 * Zod schemas the handlers validate with (src/server/api/openapi.ts). Public and cacheable: it contains no data.
 * Operations of switched-off features (the AI tutor while `features.ai` is off) are left out: they return 404.
 */

export const runtime = "nodejs";

/** Serialised documents per set of hidden tags (flags change rarely; at most a handful of variants). */
const bodies = new Map<string, string>();

export const GET = v1Route(operations.getOpenApiDocument, async () => {
  const features = await getFeatures();
  const key = switchedOffTags(features).join("|");
  let body = bodies.get(key);
  if (body === undefined) {
    body = JSON.stringify(withoutSwitchedOffFeatures(getOpenApiDocument(), features));
    bodies.set(key, body);
  }
  return new Response(body, { headers: { "content-type": "application/json; charset=utf-8" } });
});
