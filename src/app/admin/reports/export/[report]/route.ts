import { requireUserForApi } from "@/server/auth/guards";
import { toHttpResponse } from "@/server/lib/errors";
import { buildAdminReportCsv, parseAdminReportRange } from "@/server/reports/admin";

/**
 * GET /admin/reports/export/[report] — CSV export for the management reporting centre. The report service enforces
 * platform analytics permission, and the response is private/no-store because exports may expose operational data.
 */
export async function GET(request: Request, { params }: { params: Promise<{ report: string }> }): Promise<Response> {
  try {
    const { actor } = await requireUserForApi(request);
    const { report } = await params;
    const url = new URL(request.url);
    const range = parseAdminReportRange(url.searchParams.get("from"), url.searchParams.get("to"));
    const exportFile = await buildAdminReportCsv(actor, report, range);
    return new Response(exportFile.csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${exportFile.fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return toHttpResponse(error, { operation: "admin.reports.export" });
  }
}
