import { getActor } from "@/server/auth/actor";
import { isAppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { getRequestContext } from "@/server/lib/request";
import { isUuid } from "@/server/schools/access";
import { openSchoolReport } from "@/server/schools/reports";

/**
 * GET /school/reports/[reportId]/download — streams a READY report file to an ACTIVE school admin of the report's own
 * school (checked by the service, audited). Everyone else gets the same 404, so report ids cannot be probed. Private,
 * never cached; served as an attachment with `nosniff`.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ reportId: string }> }): Promise<Response> {
  const { reportId } = await params;
  const notFound = new Response("Not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });
  const actor = await getActor();
  if (!actor || !actor.roles.includes("SCHOOL_ADMIN") || !isUuid(reportId)) return notFound;
  try {
    const context = await getRequestContext();
    const file = await openSchoolReport(actor, { reportId }, { requestId: context.requestId, ip: context.ip, userAgent: context.userAgent });
    return new Response(file.stream, {
      status: 200,
      headers: {
        "Content-Type": file.mimeType,
        "Content-Length": String(file.size),
        "Content-Disposition": `attachment; filename="${file.filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") return notFound;
    logger.error("school report download failed", { reportId, err: error });
    return new Response("Something went wrong", { status: 500, headers: { "Cache-Control": "private, no-store" } });
  }
}
