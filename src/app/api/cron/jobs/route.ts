/**
 * GET /api/cron/jobs — serverless job runner for hosts without a worker process (Vercel Cron; docs/DEPLOYMENT.md
 * "Vercel"). Runs one scheduler tick and drains due jobs within the function's time limit. Only callable with
 * `Authorization: Bearer <CRON_SECRET>`; without the secret configured every request is refused.
 */
import { getEnv } from "@/server/lib/env";
import { drainJobsOnce, isAuthorizedCronRequest } from "@/server/ops/cron-drain";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Seconds; keep in step with vercel.json. The drain stops 30 s before this so in-flight jobs can finish. */
export const maxDuration = 300;

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorizedCronRequest(request.headers.get("authorization"), getEnv().CRON_SECRET)) {
    return Response.json({ error: "unauthorized" }, { status: 401, headers: { "cache-control": "no-store" } });
  }
  const result = await drainJobsOnce((maxDuration - 30) * 1000);
  return Response.json(result, { headers: { "cache-control": "no-store" } });
}
