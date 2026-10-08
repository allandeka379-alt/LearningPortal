import { requireUserForApi } from "@/server/auth/guards";
import { IMPORT_ENTITY_TYPES, TEMPLATE_FILES, type ImportEntityType, type TemplateFile } from "@/server/cms/imports/constants";
import { importAccess } from "@/server/cms/imports/service";
import { templateFile, templateFileName } from "@/server/cms/imports/templates";
import { AppError, toHttpResponse } from "@/server/lib/errors";

/**
 * GET /admin/imports/templates/[entity]/[file] — downloads a generated import template (`template.csv`,
 * `example.json`, `schema.json`) for questions / flashcards / lessons / topics. Staff with import rights only; the
 * files contain no data, only the contract and original example rows.
 */
export async function GET(request: Request, { params }: { params: Promise<{ entity: string; file: string }> }): Promise<Response> {
  try {
    const { actor } = await requireUserForApi(request);
    const { entity, file } = await params;
    const entityType = entity.toUpperCase() as ImportEntityType;
    if (!(IMPORT_ENTITY_TYPES as readonly string[]).includes(entityType) || !Object.hasOwn(TEMPLATE_FILES, file)) throw AppError.notFound();
    const access = importAccess(actor);
    if (!access.content || (entityType === "TOPIC" && !access.topics)) throw AppError.forbidden();
    const name = file as TemplateFile;
    return new Response(templateFile(entityType, name), {
      headers: {
        "Content-Type": TEMPLATE_FILES[name],
        "Content-Disposition": `attachment; filename="${templateFileName(entityType, name)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return toHttpResponse(error, { operation: "admin.imports.template" });
  }
}
