"use server";

import { z } from "zod";
import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { formText, runAdminAction } from "@/components/admin/server-action";
import { cmsContext, jsonField, workflowStep } from "@/components/admin/questions/workflow-step";
import type { MarkdownPreview } from "@/components/admin/questions/editor/MarkdownField";
import { renderContent, renderInline } from "@/server/content/render";
import { loadAssetResolver } from "@/server/content/service";
import { safeAction, type ActionResult } from "@/server/lib/errors";
import { getSubjectContentOptions, type SubjectContentOptions } from "@/server/cms/questions/lookups";
import { tryQuestion, type TryQuestionResult } from "@/server/cms/questions/preview";
import {
  approveQuestion,
  archiveQuestion,
  createQuestion,
  deleteDraftQuestion,
  discardQuestionDraft,
  editPublishedQuestion,
  publishQuestion,
  reopenQuestion,
  requestQuestionChanges,
  submitQuestion,
  updateQuestion,
  type SaveQuestionResult,
} from "@/server/cms/questions/service";

/**
 * Question bank Server Actions (thin): each re-checks its permission (`content.draft` / `.review` / `.publish` /
 * `.archive`, platform-wide scope), passes the raw input to the service in src/server/cms/questions (which validates,
 * calls the shared publish helper and audits) and returns an ActionResult.
 */

const LIST = "/admin/questions";
const detail = (id: string) => `${LIST}/${id}`;

export async function createQuestionAction(_state: AdminActionState<SaveQuestionResult>, formData: FormData): Promise<AdminActionState<SaveQuestionResult>> {
  return runAdminAction("admin.questions.create", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const result = await createQuestion(actor, jsonField(formData, "document"), await cmsContext());
    return { data: result, redirectTo: detail(result.id), revalidate: [LIST] };
  });
}

export async function updateQuestionAction(_state: AdminActionState<SaveQuestionResult>, formData: FormData): Promise<AdminActionState<SaveQuestionResult>> {
  return runAdminAction("admin.questions.update", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const id = formText(formData, "id");
    const result = await updateQuestion(actor, { id, version: formText(formData, "version"), question: jsonField(formData, "document") }, await cmsContext());
    return { data: result, revalidate: [LIST, detail(result.id)] };
  });
}

export async function deleteQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.delete", formData, "content.draft", (actor, input, context) => deleteDraftQuestion(actor, input, context), () => ({
    message: "Draft deleted.",
    redirectTo: LIST,
    revalidate: [LIST],
  }));
}

export async function submitQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.submit", formData, "content.draft", submitQuestion, (_r, id) => ({ message: "Submitted for review.", revalidate: [LIST, detail(id)] }));
}

export async function requestQuestionChangesAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.request_changes", formData, "content.review", requestQuestionChanges, (_r, id) => ({ message: "Sent back to draft.", revalidate: [LIST, detail(id)] }));
}

export async function approveQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.approve", formData, "content.review", approveQuestion, (_r, id) => ({ message: "Approved.", revalidate: [LIST, detail(id)] }));
}

export async function publishQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.publish", formData, "content.publish", publishQuestion, (result) => ({
    message: result.changed ? `Published revision ${result.revision}.` : "Nothing had changed: the draft copy was discarded.",
    // A merged draft copy no longer exists: continue on the live question.
    redirectTo: result.mergedDraftId ? detail(result.id) : undefined,
    revalidate: [LIST, detail(result.id)],
  }));
}

export async function archiveQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.archive", formData, "content.archive", archiveQuestion, (_r, id) => ({ message: "Archived.", revalidate: [LIST, detail(id)] }));
}

export async function reopenQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.reopen", formData, "content.archive", reopenQuestion, (result, id) => ({
    message: `Restored to draft (revision ${result.revision}).`,
    revalidate: [LIST, detail(id)],
  }));
}

export async function editPublishedQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.draft_copy", formData, "content.draft", editPublishedQuestion, (copy) => ({
    message: copy.created ? `Draft copy for revision ${copy.revision} created.` : "Opening the existing draft copy.",
    redirectTo: detail(copy.id),
    revalidate: [LIST],
  }));
}

export async function discardQuestionDraftAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return workflowStep("admin.questions.discard", formData, "content.draft", discardQuestionDraft, (result) => ({
    message: "Draft copy discarded.",
    redirectTo: detail(result.liveId),
    revalidate: [LIST],
  }));
}

// ---------------------------------------------------------------------------------------------------------------------
// Interactive editor calls (no mutation)
// ---------------------------------------------------------------------------------------------------------------------

const previewSchema = z.object({ source: z.string().max(100_000), inline: z.boolean() });

/** Live preview of authored markdown with the student pipeline (sanitised, KaTeX) and its authoring warnings. */
export async function previewMarkdownAction(input: { source: string; inline: boolean }): Promise<ActionResult<MarkdownPreview>> {
  return safeAction(
    async () => {
      await requireAdminAction("content.draft");
      const { source, inline } = previewSchema.parse(input);
      const resolveAsset = await loadAssetResolver([source]);
      const rendered = inline ? renderInline(source, { idPrefix: "pv-", resolveAsset }) : renderContent(source, { idPrefix: "pv-", baseHeadingLevel: 3, resolveAsset });
      return { html: rendered.html, warnings: [...rendered.warnings] };
    },
    { operation: "admin.questions.preview_markdown" },
  )();
}

/** Marks a sample answer with the real marking engine ("Try it"). */
export async function tryQuestionAction(input: { questionId: string; response: unknown }): Promise<ActionResult<TryQuestionResult>> {
  return safeAction(
    async () => {
      const actor = await requireAdminAction("content.draft");
      return tryQuestion(actor, input);
    },
    { operation: "admin.questions.try" },
  )();
}

/** The syllabus versions, topics, objectives and lessons of a subject (editor's subject switch). */
export async function loadSubjectOptionsAction(input: { subjectId: string; extraSyllabusIds: string[] }): Promise<ActionResult<SubjectContentOptions>> {
  return safeAction(
    async () => {
      const actor = await requireAdminAction("content.draft");
      return getSubjectContentOptions(actor, input);
    },
    { operation: "admin.questions.subject_options" },
  )();
}
