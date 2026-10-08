import { openDataExport } from "@/server/accounts/privacy";
import { getActor } from "@/server/auth/actor";
import { isAppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";

/**
 * GET /app/settings/data/[requestId] — streams the signed-in user's own ready data export (privacy notice "a download of
 * your data"). Anyone else, an expired file or an unknown id gets the same 404, so ids cannot be probed. Private, never
 * cached; served as an attachment with `nosniff`.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ requestId: string }> }): Promise<Response> {
  const { requestId } = await params;
  const notFound = new Response("Not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });
  const actor = await getActor();
  if (!actor) return notFound;
  try {
    const file = await openDataExport(actor, requestId);
    return new Response(file.stream, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": String(file.size),
        "Content-Disposition": `attachment; filename="${file.filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") return notFound;
    logger.error("data export download failed", { privacyRequestId: requestId, err: error });
    return new Response("Something went wrong", { status: 500, headers: { "Cache-Control": "private, no-store" } });
  }
}
