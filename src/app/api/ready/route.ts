import { getReadiness } from "@/server/ops/readiness";

/**
 * GET /api/ready — READINESS probe (docs/DEPLOYMENT.md "Health checks"; ARCHITECTURE §10.6).
 *
 * 200 `{ status: "ready", ... }` when this instance can serve traffic: the database answers through the app role, every
 * migration shipped in this release is applied, and (production) the section D safety checks hold. 503
 * `{ status: "not_ready", ... }` otherwise, so load balancers stop routing here and a rolling deploy waits. Checks and
 * caching: src/server/ops/readiness.ts. The body carries booleans and counts only (details go to the server log).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const report = await getReadiness();
  return Response.json(report, {
    status: report.status === "ready" ? 200 : 503,
    headers: { "cache-control": "no-store" },
  });
}
