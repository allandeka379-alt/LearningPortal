"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formFlag, formText, runAdminAction } from "@/components/admin/server-action";
import { MAX_IMPORT_FILE_BYTES } from "@/server/cms/imports/constants";
import { cancelImport, commitImport, revalidateImport, uploadImport } from "@/server/cms/imports/service";
import { auditRequestFrom } from "@/server/cms/users/service";
import { AppError } from "@/server/lib/errors";

/**
 * Bulk import Server Actions (thin, §25): each re-checks `imports.run` (content imports are an editor's "restricted"
 * scope), passes the form to the import service (which validates with Zod, checks `content.draft` / curriculum rights,
 * audits and decides inline vs background work) and returns an ActionResult.
 */

async function context() {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

function importPaths(id: string): string[] {
  return ["/admin/imports", `/admin/imports/${id}`];
}

export async function uploadImportAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.imports.upload", formData, async () => {
    const actor = await requireAdminAction("imports.run", "restricted");
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) throw AppError.validation({ file: ["Choose a CSV, Excel (.xlsx) or JSON file."] });
    if (file.size > MAX_IMPORT_FILE_BYTES) throw AppError.validation({ file: [`The file is too large (maximum ${MAX_IMPORT_FILE_BYTES / 1024 / 1024} MB). Split it into smaller files.`] });
    const result = await uploadImport(
      actor,
      { bytes: new Uint8Array(await file.arrayBuffer()), filename: file.name },
      {
        entityType: formText(formData, "entityType"),
        subjectId: formText(formData, "subjectId"),
        syllabusId: formText(formData, "syllabusId") ?? "",
        sourceId: formText(formData, "sourceId"),
        licenceCode: formText(formData, "licenceCode"),
        attribution: formText(formData, "attribution"),
        author: formText(formData, "author"),
        sourceUrl: formText(formData, "sourceUrl"),
        defaultDifficulty: formText(formData, "defaultDifficulty"),
        defaultAccessTier: formText(formData, "defaultAccessTier"),
        rightsConfirmed: formFlag(formData, "rightsConfirmed"),
      },
      await context(),
    );
    const message =
      result.status === "VALIDATING"
        ? "Uploaded. The file is being checked in the background."
        : result.duplicates.length > 0
          ? "Uploaded and checked. This exact file was uploaded before: see the warning."
          : "Uploaded and checked. Review the report before importing.";
    return { data: { id: result.id }, message, redirectTo: `/admin/imports/${result.id}`, revalidate: ["/admin/imports"] };
  });
}

export async function revalidateImportAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.imports.revalidate", formData, async () => {
    const actor = await requireAdminAction("imports.run", "restricted");
    const id = formText(formData, "id") ?? "";
    const result = await revalidateImport(actor, { id }, await context());
    return { data: result, message: result.status === "VALIDATING" ? "Checking again in the background." : "Checked again. The report is up to date.", revalidate: importPaths(id) };
  });
}

export async function commitImportAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.imports.commit", formData, async () => {
    const actor = await requireAdminAction("imports.run", "restricted");
    const id = formText(formData, "id") ?? "";
    const result = await commitImport(actor, { id, skipInvalid: formFlag(formData, "skipInvalid"), confirmDuplicate: formFlag(formData, "confirmDuplicate") }, await context());
    const message =
      result.status === "IMPORTING"
        ? "Importing in the background. Progress is shown on this page."
        : `Imported ${result.importedRows} item${result.importedRows === 1 ? "" : "s"} as drafts.`;
    return { data: result, message, revalidate: importPaths(id) };
  });
}

export async function cancelImportAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.imports.cancel", formData, async () => {
    const actor = await requireAdminAction("imports.run", "restricted");
    const id = formText(formData, "id") ?? "";
    const result = await cancelImport(actor, { id }, await context());
    return { data: result, message: "Import cancelled.", revalidate: importPaths(id) };
  });
}
