import { openChildDataExport } from "@/server/accounts/guardian-privacy";
import { getActor } from "@/server/auth/actor";
import { isAppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { getRequestContext } from "@/server/lib/request";

/**
 * GET /parent/children/[studentId]/data/[requestId] — streams a copy of a minor's data to the guardian who asked for it
 * (PRIV-02; src/server/accounts/guardian-privacy.ts). Anyone else, a guardian who no longer has authority,
 * an expired file or an unknown id gets the same 404, so ids cannot be probed. Every download is audited. Private,
 * never cached; served as an attachment with `nosniff`.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ studentId: string; requestId: string }> }): Promise<Response> {
  const { studentId, requestId } = await params;
  const notFound = new Response("Not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });
  const actor = await getActor();
  if (!actor) return notFound;
  try {
    const context = await getRequestContext();
    const file = await openChildDataExport(actor, studentId, requestId, {
      meta: { ip: context.ip, userAgent: context.userAgent, requestId: context.requestId },
    });
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
    logger.error("guardian data export download failed", { privacyRequestId: requestId, err: error });
    return new Response("Something went wrong", { status: 500, headers: { "Cache-Control": "private, no-store" } });
  }
}
