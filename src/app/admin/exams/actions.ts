"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { formList, formText, runAdminAction } from "@/components/admin/server-action";
import { cmsContext, jsonField, workflowStep } from "@/components/admin/questions/workflow-step";
import { safeAction, type ActionResult } from "@/server/lib/errors";
import type { Totals } from "@/server/cms/assessments/core";
import type { SectionInput } from "@/server/cms/assessments/schemas";
import {
  approveAssessment,
  archiveAssessment,
  checkBlueprint,
  createAssessment,
  deleteDraftAssessment,
  discardAssessmentDraft,
  editPublishedAssessment,
  publishAssessment,
  reopenAssessment,
  requestAssessmentChanges,
  saveAssessmentStructure,
  submitAssessment,
  updateAssessmentMeta,
  type BlueprintReport,
} from "@/server/cms/assessments/service";
import { searchPublishedQuestions, type PickerQuestion } from "@/server/cms/questions/service";

/**
 * Assessment builder Server Actions (thin): permission re-check, raw input to the service in src/server/cms/assessments
 * (validation, publish helper, audit), ActionResult back.
 */

const LIST = "/admin/exams";
const detail = (id: string) => `${LIST}/${id}`;

/** The settings form's fields, as the service expects them. */
function settingsFields(formData: FormData) {
  return {
    kind: formText(formData, "kind"),
    assembly: formText(formData, "assembly"),
    subjectId: formText(formData, "subjectId"),
    syllabusId: formText(formData, "syllabusId") ?? null,
    routeId: formText(formData, "routeId") ?? null,
    title: formText(formData, "title"),
    description: formText(formData, "description") ?? null,
    instructions: formText(formData, "instructions") ?? null,
    timeLimitMinutes: formText(formData, "timeLimitMinutes") ?? null,
    maxAttempts: formText(formData, "maxAttempts") ?? null,
    gradeSchemeId: formText(formData, "gradeSchemeId") ?? null,
    feedbackTiming: formText(formData, "feedbackTiming"),
    shuffleQuestions: formData.get("shuffleQuestions") === "on",
    shuffleOptions: formData.get("shuffleOptions") === "on",
    allowNavigation: formData.get("allowNavigation") === "on",
    accessTier: formText(formData, "accessTier"),
    topicIds: formList(formData, "topicIds"),
    sourceId: formText(formData, "sourceId") ?? null,
    author: formText(formData, "author") ?? null,
    copyrightStatus: formText(formData, "copyrightStatus"),
    licenceCode: formText(formData, "licenceCode") ?? null,
    attribution: formText(formData, "attribution") ?? null,
    sourceUrl: formText(formData, "sourceUrl") ?? null,
    publicationDate: formText(formData, "publicationDate") ?? null,
  };
}

export async function createAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.exams.create", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await createAssessment(actor, settingsFields(formData), await cmsContext());
    return { data: result, message: "Assessment created as a draft.", redirectTo: detail(result.id), revalidate: [LIST] };
  });
}

export async function updateAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.exams.update", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await updateAssessmentMeta(actor, { id: formText(formData, "id"), version: formText(formData, "version"), ...settingsFields(formData) }, await cmsContext());
    return { data: result, message: "Settings saved.", revalidate: [LIST, detail(result.id)] };
  });
}

export async function saveStructureAction(
  _state: AdminActionState<{ id: string; version: string; totals: Totals }>,
  formData: FormData,
): Promise<AdminActionState<{ id: string; version: string; totals: Totals }>> {
  return runAdminAction("admin.exams.structure", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await saveAssessmentStructure(actor, { id: formText(formData, "id"), version: formText(formData, "version"), sections: jsonField(formData, "structure") }, await cmsContext());
    return { data: result, revalidate: [LIST, detail(result.id)] };
  });
}

export async function deleteAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.delete", formData, "content.draft", (actor, input, context) => deleteDraftAssessment(actor, input, context), () => ({
    message: "Draft deleted.",
    redirectTo: LIST,
    revalidate: [LIST],
  }));
}

export async function submitAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.submit", formData, "content.draft", submitAssessment, (_r, id) => ({ message: "Submitted for review.", revalidate: [LIST, detail(id)] }));
}

export async function requestAssessmentChangesAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.request_changes", formData, "content.review", requestAssessmentChanges, (_r, id) => ({ message: "Sent back to draft.", revalidate: [LIST, detail(id)] }));
}

export async function approveAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.approve", formData, "content.review", approveAssessment, (_r, id) => ({ message: "Approved.", revalidate: [LIST, detail(id)] }));
}

export async function publishAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.publish", formData, "content.publish", publishAssessment, (result) => ({
    message: result.changed ? `Published revision ${result.revision}.` : "Nothing had changed: the draft copy was discarded.",
    redirectTo: result.mergedDraftId ? detail(result.id) : undefined,
    revalidate: [LIST, detail(result.id)],
  }));
}

export async function archiveAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.archive", formData, "content.archive", archiveAssessment, (_r, id) => ({ message: "Archived.", revalidate: [LIST, detail(id)] }));
}

export async function reopenAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.reopen", formData, "content.archive", reopenAssessment, (result, id) => ({
    message: `Restored to draft (revision ${result.revision}).`,
    revalidate: [LIST, detail(id)],
  }));
}

export async function editPublishedAssessmentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.draft_copy", formData, "content.draft", editPublishedAssessment, (copy) => ({
    message: copy.created ? `Draft copy for revision ${copy.revision} created.` : "Opening the existing draft copy.",
    redirectTo: detail(copy.id),
    revalidate: [LIST],
  }));
}

export async function discardAssessmentDraftAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.exams.discard", formData, "content.draft", discardAssessmentDraft, (result) => ({
    message: "Draft copy discarded.",
    redirectTo: detail(result.liveId),
    revalidate: [LIST],
  }));
}

/** Live blueprint check of the rules being edited. */
export async function checkBlueprintAction(input: { id: string; sections: SectionInput[] }): Promise<ActionResult<{ totals: Totals; blueprint: BlueprintReport | null }>> {
  return safeAction(
    async () => {
      const actor = await requireAdminAction("content.draft");
      return checkBlueprint(actor, input);
    },
    { operation: "admin.exams.check_blueprint" },
  )();
}

/** The builder's question picker (PUBLISHED platform questions only). */
export async function searchQuestionsAction(input: Record<string, unknown>): Promise<ActionResult<PickerQuestion[]>> {
  return safeAction(
    async () => {
      const actor = await requireAdminAction("content.draft");
      return searchPublishedQuestions(actor, input);
    },
    { operation: "admin.exams.search_questions" },
  )();
}
