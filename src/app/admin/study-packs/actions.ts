"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction, requireAdminStepUpAction } from "@/components/admin/guards";
import { formText, runAdminAction } from "@/components/admin/server-action";
import { cmsContext, jsonField, workflowStep } from "@/components/admin/questions/workflow-step";
import {
  approveStudyPack,
  archiveStudyPack,
  createStudyPack,
  createStudyPackPrice,
  deleteDraftStudyPack,
  discardStudyPackDraft,
  editPublishedStudyPack,
  publishStudyPack,
  reopenStudyPack,
  requestStudyPackChanges,
  saveStudyPackScopes,
  submitStudyPack,
  updateStudyPack,
  updateStudyPackPrice,
} from "@/server/cms/study-packs/service";

/**
 * Study-pack Server Actions (thin): `content.*` for the pack and its workflow, `billing.manage` for prices; the
 * services in src/server/cms/study-packs validate, run the licensing check and audit.
 */

const LIST = "/admin/study-packs";
const detail = (id: string) => `${LIST}/${id}`;

function detailsFields(formData: FormData) {
  return {
    slug: formText(formData, "slug"),
    title: formText(formData, "title"),
    subtitle: formText(formData, "subtitle") ?? null,
    description: formText(formData, "description") ?? null,
    coverImageId: formText(formData, "coverImageId") ?? null,
    isFeatured: formData.get("isFeatured") === "on",
    sortOrder: formText(formData, "sortOrder") ?? "0",
    metaTitle: formText(formData, "metaTitle") ?? null,
    metaDescription: formText(formData, "metaDescription") ?? null,
    allowPdfExport: formData.get("allowPdfExport") === "on",
  };
}

export async function createStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.study_packs.create", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await createStudyPack(actor, detailsFields(formData), await cmsContext());
    return { data: result, message: "Study pack created as a draft.", redirectTo: detail(result.id), revalidate: [LIST] };
  });
}

export async function updateStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.study_packs.update", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await updateStudyPack(
      actor,
      { id: formText(formData, "id"), version: formText(formData, "version"), ...detailsFields(formData), entitlements: jsonField(formData, "entitlements") },
      await cmsContext(),
    );
    return { data: result, message: "Study pack saved.", revalidate: [LIST, detail(result.id)] };
  });
}

export async function saveScopesAction(_state: AdminActionState<{ pdfExportTurnedOff: boolean }>, formData: FormData): Promise<AdminActionState<{ pdfExportTurnedOff: boolean }>> {
  return runAdminAction("admin.study_packs.scopes", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await saveStudyPackScopes(actor, { id: formText(formData, "id"), version: formText(formData, "version"), scopes: jsonField(formData, "scopes") }, await cmsContext());
    return { data: result, revalidate: [LIST, detail(result.id)] };
  });
}

export async function createPriceAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.study_packs.price_create", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const studyPackId = formText(formData, "studyPackId");
    const result = await createStudyPackPrice(
      actor,
      {
        studyPackId,
        currency: formText(formData, "currency") ?? "",
        amount: formText(formData, "amount") ?? "",
        countryId: formText(formData, "countryId") ?? null,
        accessDays: formText(formData, "accessDays") ?? null,
        label: formText(formData, "label") ?? null,
        validFrom: formText(formData, "validFrom") ?? null,
        validTo: formText(formData, "validTo") ?? null,
        sortOrder: formText(formData, "sortOrder") ?? "0",
      },
      await cmsContext(),
    );
    return { data: result, message: "Price added.", revalidate: [detail(studyPackId ?? "")] };
  });
}

export async function setPriceActiveAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.study_packs.price_update", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const result = await updateStudyPackPrice(
      actor,
      {
        priceId: formText(formData, "priceId"),
        label: formText(formData, "label") ?? null,
        sortOrder: formText(formData, "sortOrder") ?? "0",
        isActive: formText(formData, "isActive") === "true",
        validTo: formText(formData, "validTo") ?? null,
      },
      await cmsContext(),
    );
    return { data: result, message: formText(formData, "isActive") === "true" ? "Price offered again." : "Price withdrawn.", revalidate: [detail(formText(formData, "studyPackId") ?? "")] };
  });
}

export async function deleteStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.delete", formData, "content.draft", (actor, input, context) => deleteDraftStudyPack(actor, input, context), () => ({
    message: "Draft deleted.",
    redirectTo: LIST,
    revalidate: [LIST],
  }));
}

export async function submitStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.submit", formData, "content.draft", submitStudyPack, (_r, id) => ({ message: "Submitted for review.", revalidate: [LIST, detail(id)] }));
}

export async function requestStudyPackChangesAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.request_changes", formData, "content.review", requestStudyPackChanges, (_r, id) => ({ message: "Sent back to draft.", revalidate: [LIST, detail(id)] }));
}

export async function approveStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.approve", formData, "content.review", approveStudyPack, (_r, id) => ({ message: "Approved.", revalidate: [LIST, detail(id)] }));
}

export async function publishStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.publish", formData, "content.publish", publishStudyPack, (result) => ({
    message: result.changed ? `Published revision ${result.revision}.` : "Nothing had changed: the draft copy was discarded.",
    redirectTo: result.mergedDraftId ? detail(result.id) : undefined,
    revalidate: [LIST, detail(result.id)],
  }));
}

export async function archiveStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.archive", formData, "content.archive", archiveStudyPack, (_r, id) => ({ message: "Archived.", revalidate: [LIST, detail(id)] }));
}

export async function reopenStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.reopen", formData, "content.archive", reopenStudyPack, (result, id) => ({
    message: `Restored to draft (revision ${result.revision}).`,
    revalidate: [LIST, detail(id)],
  }));
}

export async function editPublishedStudyPackAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.draft_copy", formData, "content.draft", editPublishedStudyPack, (copy) => ({
    message: copy.created ? `Draft copy for revision ${copy.revision} created.` : "Opening the existing draft copy.",
    redirectTo: detail(copy.id),
    revalidate: [LIST],
  }));
}

export async function discardStudyPackDraftAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.study_packs.discard", formData, "content.draft", discardStudyPackDraft, (result) => ({
    message: "Draft copy discarded.",
    redirectTo: detail(result.liveId),
    revalidate: [LIST],
  }));
}
