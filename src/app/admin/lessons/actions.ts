"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formList, formText, formValues, runAdminAction } from "@/components/admin/server-action";
import type { PreviewMode, PreviewPayload, QuestionChoice, SyllabusTopicsPayload } from "@/components/admin/editor/types";
import { createLesson, previewMarkdown, saveLesson } from "@/server/cms/lessons/service";
import { searchPracticeQuestions, topicOptionsForSyllabus } from "@/server/cms/review/taxonomy";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Lesson authoring Server Actions (thin): `content.draft` (scope all) re-checked on every call; the lesson service
 * validates, renders, keeps media usage and audits. The preview / search / topic actions also serve the flashcard
 * editor.
 */

async function context() {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

function raw(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

export async function createLessonAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.lessons.create", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const lesson = await createLesson(
      actor,
      {
        title: formText(formData, "title"),
        kind: formText(formData, "kind"),
        subjectId: formText(formData, "subjectId") ?? "",
        primaryTopicId: formText(formData, "primaryTopicId") ?? "",
      },
      await context(),
    );
    return { data: lesson, message: "Draft created.", redirectTo: `/admin/lessons/${lesson.id}`, revalidate: ["/admin/lessons"] };
  });
}

export async function saveLessonAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const result = await runAdminAction("admin.lessons.save", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const id = formText(formData, "id");
    const saved = await saveLesson(
      actor,
      {
        id,
        expectedUpdatedAt: formText(formData, "expectedUpdatedAt"),
        title: formText(formData, "title"),
        slug: formText(formData, "slug"),
        kind: formText(formData, "kind"),
        subjectId: formText(formData, "subjectId") ?? "",
        summary: formText(formData, "summary"),
        body: raw(formData, "body") ?? "",
        estimatedMinutes: formText(formData, "estimatedMinutes"),
        accessTier: formText(formData, "accessTier"),
        languageCode: formText(formData, "languageCode"),
        metaTitle: formText(formData, "metaTitle"),
        metaDescription: formText(formData, "metaDescription"),
        topicIds: formList(formData, "topicIds"),
        primaryTopicId: formText(formData, "primaryTopicId") ?? "",
        objectiveIds: formList(formData, "objectiveIds"),
        questionIds: formList(formData, "questionIds"),
        sourceId: formText(formData, "sourceId") ?? "",
        author: formText(formData, "author"),
        copyrightStatus: formText(formData, "copyrightStatus"),
        licenceCode: formText(formData, "licenceCode"),
        attribution: formText(formData, "attribution"),
        sourceUrl: formText(formData, "sourceUrl"),
        publicationDate: formText(formData, "publicationDate") ?? "",
      },
      await context(),
    );
    return {
      data: saved,
      message: saved.changed.length === 0 ? "No changes to save." : "Draft saved.",
      revalidate: ["/admin/lessons", `/admin/lessons/${id ?? ""}`],
    };
  });
  // React resets uncontrolled fields after a successful form action: echo the saved values so they stay filled.
  return result?.ok ? { ...result, values: formValues(formData) } : result;
}

/** Live preview of markdown (lesson bodies, flashcard sides) rendered by the server pipeline. */
export async function previewMarkdownAction(source: string, mode: PreviewMode): Promise<AdminActionState<PreviewPayload>> {
  return runAdminAction("admin.content.preview", null, async () => {
    const actor = await requireAdminAction("content.draft");
    const preview = await previewMarkdown(actor, { body: typeof source === "string" ? source : "", mode });
    return { data: { html: preview.html, warnings: [...preview.warnings], headings: [...preview.headings], hasMath: preview.hasMath } };
  });
}

/** Published platform questions for the lesson's practice-question picker. */
export async function searchQuestionsAction(query: string, subjectId: string | null): Promise<AdminActionState<QuestionChoice[]>> {
  return runAdminAction("admin.lessons.searchQuestions", null, async () => {
    const actor = await requireAdminAction("content.draft");
    return { data: await searchPracticeQuestions(actor, { q: query, subjectId: subjectId ?? undefined }) };
  });
}

/** Topic tree and learning objectives of one syllabus version (topic tag picker). */
export async function loadTopicsAction(syllabusId: string): Promise<AdminActionState<SyllabusTopicsPayload>> {
  return runAdminAction("admin.content.loadTopics", null, async () => {
    const actor = await requireAdminAction("content.draft");
    return { data: await topicOptionsForSyllabus(actor, syllabusId) };
  });
}
