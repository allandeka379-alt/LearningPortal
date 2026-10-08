"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, formValues, runAdminAction } from "@/components/admin/server-action";
import type { MediaPick } from "@/components/admin/editor/types";
import { deleteMedia, searchMediaForEditor, updateMedia, uploadMedia } from "@/server/cms/media/service";
import { auditRequestFrom } from "@/server/cms/users/service";
import { AppError } from "@/server/lib/errors";

/**
 * Media library Server Actions (thin): `content.draft` (scope all) re-checked on every call; the media service
 * validates (alt text, licensing), uploads through `createMediaAsset` (sniffing, re-encoding, rate limit) and audits.
 */

async function context() {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

function metadata(formData: FormData) {
  return {
    altText: formText(formData, "altText") ?? "",
    caption: formText(formData, "caption"),
    longDescription: formText(formData, "longDescription"),
    visibility: formText(formData, "visibility"),
    copyrightStatus: formText(formData, "copyrightStatus"),
    sourceId: formText(formData, "sourceId"),
    licenceCode: formText(formData, "licenceCode"),
    attribution: formText(formData, "attribution"),
    author: formText(formData, "author"),
    sourceUrl: formText(formData, "sourceUrl"),
  };
}

export async function uploadMediaAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.media.upload", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) throw AppError.validation({ file: ["Choose an image to upload."] });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const result = await uploadMedia(actor, { bytes, filename: file.name }, { purpose: formText(formData, "purpose"), ...metadata(formData) }, await context());
    return {
      data: result,
      message: result.duplicateOf ? "Uploaded. The same image was already in the library: consider reusing it." : "Uploaded.",
      redirectTo: `/admin/media/${result.id}`,
      revalidate: ["/admin/media"],
    };
  });
}

export async function updateMediaAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const result = await runAdminAction("admin.media.update", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const id = formText(formData, "id");
    const updated = await updateMedia(actor, { id, ...metadata(formData) }, await context());
    return {
      data: updated,
      message: updated.changed.length === 0 ? "Nothing changed." : "Details saved.",
      revalidate: ["/admin/media", `/admin/media/${id ?? ""}`],
    };
  });
  // React resets uncontrolled fields after a successful form action: echo the saved values so they stay filled.
  return result?.ok ? { ...result, values: formValues(formData) } : result;
}

export async function deleteMediaAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.media.delete", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await deleteMedia(actor, { id: formText(formData, "id") }, await context());
    return { data: result, message: "File deleted.", redirectTo: "/admin/media", revalidate: ["/admin/media"] };
  });
}

/** Media search for the editor's "Insert image" dialog. */
export async function searchMediaAction(query: string): Promise<AdminActionState<MediaPick[]>> {
  return runAdminAction("admin.media.search", null, async () => {
    const actor = await requireAdminAction("content.draft");
    const items = await searchMediaForEditor(actor, typeof query === "string" ? query.slice(0, 200) : "");
    return {
      data: items.map((item) => ({ id: item.id, src: item.src, altText: item.altText, caption: item.caption, width: item.width, height: item.height, snippet: item.snippet })),
    };
  });
}
