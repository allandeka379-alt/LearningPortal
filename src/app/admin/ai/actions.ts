"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formList, formText, runAdminAction } from "@/components/admin/server-action";
import { requireFeature } from "@/server/features";
import { cancelGenerationJob, createGenerationJob, rerunGenerationJob } from "@/server/cms/ai-drafts/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * AI content generation Server Actions (thin, §41): `ai.generate` re-checked on every call; the service validates the
 * request (Zod + curriculum references), refuses when AI is not configured or the editor's daily cap is reached,
 * queues the `ai.generate` job and audits. Nothing here creates or publishes content directly.
 */

async function context() {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

export async function createGenerationJobAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.ai.generate", formData, async () => {
    await requireFeature("ai"); // 404 while AI is switched off (features.ai)
    const actor = await requireAdminAction("ai.generate");
    const created = await createGenerationJob(
      actor,
      {
        kind: formText(formData, "kind"),
        subjectId: formText(formData, "subjectId"),
        syllabusId: formText(formData, "syllabusId") ?? "",
        topicId: formText(formData, "topicId") ?? "",
        objectiveIds: formList(formData, "objectiveIds"),
        count: formText(formData, "count") ?? "",
        difficulty: formText(formData, "difficulty") ?? "",
        languageLevel: formText(formData, "languageLevel") ?? "",
        questionTypes: formList(formData, "questionTypes"),
        marksPerQuestion: formText(formData, "marksPerQuestion") ?? "",
        targetQuestionId: formText(formData, "targetQuestionId") ?? "",
        accessTier: formText(formData, "accessTier") ?? "",
        weeklyMinutes: formText(formData, "weeklyMinutes") ?? "",
        instructions: formText(formData, "instructions") ?? "",
      },
      await context(),
    );
    return { data: { id: created.id }, message: "Queued. The drafts appear on the job page when they are ready.", redirectTo: `/admin/ai/jobs/${created.id}`, revalidate: ["/admin/ai"] };
  });
}

export async function cancelGenerationJobAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.ai.cancel", formData, async () => {
    await requireFeature("ai"); // 404 while AI is switched off (features.ai)
    const actor = await requireAdminAction("ai.generate");
    const id = formText(formData, "id") ?? "";
    const result = await cancelGenerationJob(actor, { id }, await context());
    return { data: result, message: "Job cancelled.", revalidate: ["/admin/ai", `/admin/ai/jobs/${id}`] };
  });
}

export async function rerunGenerationJobAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.ai.rerun", formData, async () => {
    await requireFeature("ai"); // 404 while AI is switched off (features.ai)
    const actor = await requireAdminAction("ai.generate");
    const created = await rerunGenerationJob(actor, { id: formText(formData, "id") ?? "" }, await context());
    return { data: { id: created.id }, message: "A new job with the same settings is queued.", redirectTo: `/admin/ai/jobs/${created.id}`, revalidate: ["/admin/ai"] };
  });
}
