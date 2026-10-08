/**
 * GET /api/health — LIVENESS probe (docs/DEPLOYMENT.md "Health checks"; ARCHITECTURE §10.6).
 *
 * Answers 200 whenever this Node process can serve a request. It deliberately touches nothing else (no database, no
 * environment validation, no imports of server modules): an orchestrator restarts a container whose liveness fails, and
 * a database outage must never restart every web container at once. Readiness, which does check the database, lives
 * at `/api/ready`.
 *
 * Public and unauthenticated (the proxy's auth redirect only covers the signed-in areas). The body carries no secrets:
 * the process uptime and the release id baked into the image (`APP_RELEASE`, the git SHA; `null` outside images).
 */

export const runtime = "nodejs";
// Never prerendered or cached: the answer must come from the running process.
export const dynamic = "force-dynamic";

const RELEASE_PATTERN = /^[A-Za-z0-9._-]{1,64}$/;

export function GET(): Response {
  const release = process.env.APP_RELEASE;
  return Response.json(
    {
      status: "ok",
      uptimeSeconds: Math.floor(process.uptime()),
      release: release !== undefined && RELEASE_PATTERN.test(release) ? release : null,
    },
    { headers: { "cache-control": "no-store" } },
  );
}
