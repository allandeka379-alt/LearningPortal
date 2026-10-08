import { requireUserForApi } from "@/server/auth/guards";
import { importReportCsv } from "@/server/cms/imports/service";
import { toHttpResponse } from "@/server/lib/errors";

/**
 * GET /admin/imports/[id]/report — the dry-run report of one import as CSV (row, field, severity, code, message), so
 * editors can fix a large file side by side with the problems. Authorisation is the import service's (`imports.run` +
 * `content.draft`).
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { actor } = await requireUserForApi(request);
    const { id } = await params;
    const report = await importReportCsv(actor, id);
    return new Response(report.csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${report.fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return toHttpResponse(error, { operation: "admin.imports.report" });
  }
}
