"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formList, formText, formValues, runAdminAction } from "@/components/admin/server-action";
import { bulkCreateFlashcards, createFlashcard, saveFlashcard, type BulkFlashcardResult } from "@/server/cms/flashcards/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Flashcard authoring Server Actions (thin): `content.draft` (scope all) re-checked on every call; the flashcard
 * service validates, renders, keeps media usage and audits.
 */

async function context() {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

function raw(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

function provenance(formData: FormData) {
  return {
    sourceId: formText(formData, "sourceId") ?? "",
    author: formText(formData, "author"),
    copyrightStatus: formText(formData, "copyrightStatus"),
    licenceCode: formText(formData, "licenceCode"),
    attribution: formText(formData, "attribution"),
    sourceUrl: formText(formData, "sourceUrl"),
    publicationDate: formText(formData, "publicationDate") ?? "",
  };
}

function cardFields(formData: FormData) {
  return {
    subjectId: formText(formData, "subjectId"),
    cardType: formText(formData, "cardType"),
    front: raw(formData, "front") ?? "",
    back: raw(formData, "back") ?? "",
    notes: raw(formData, "notes") ?? "",
    accessTier: formText(formData, "accessTier"),
    languageCode: formText(formData, "languageCode"),
    topicIds: formList(formData, "topicIds"),
    primaryTopicId: formText(formData, "primaryTopicId") ?? "",
    ...provenance(formData),
  };
}

export async function createFlashcardAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.flashcards.create", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const card = await createFlashcard(actor, cardFields(formData), await context());
    return { data: card, message: "Draft card created.", redirectTo: `/admin/flashcards/${card.id}`, revalidate: ["/admin/flashcards"] };
  });
}

export async function saveFlashcardAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const result = await runAdminAction("admin.flashcards.save", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const id = formText(formData, "id");
    const saved = await saveFlashcard(actor, { id, expectedUpdatedAt: formText(formData, "expectedUpdatedAt"), ...cardFields(formData) }, await context());
    return {
      data: saved,
      message: saved.changed.length === 0 ? "No changes to save." : "Draft saved.",
      revalidate: ["/admin/flashcards", `/admin/flashcards/${id ?? ""}`],
    };
  });
  return result?.ok ? { ...result, values: formValues(formData) } : result;
}

export async function bulkFlashcardsAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const intent = formText(formData, "intent") === "create" ? "create" : "preview";
  const result = await runAdminAction<BulkFlashcardResult>("admin.flashcards.bulk", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const subjectId = formText(formData, "subjectId");
    const outcome = await bulkCreateFlashcards(
      actor,
      {
        subjectId,
        cardType: formText(formData, "cardType"),
        accessTier: formText(formData, "accessTier"),
        languageCode: formText(formData, "languageCode"),
        primaryTopicId: formText(formData, "primaryTopicId") ?? "",
        text: raw(formData, "text") ?? "",
        intent,
        ...provenance(formData),
      },
      await context(),
    );
    if (outcome.intent === "create") {
      return {
        data: outcome,
        message: `${outcome.created} draft card${outcome.created === 1 ? "" : "s"} created.`,
        redirectTo: `/admin/flashcards?subjectId=${subjectId ?? ""}&status=DRAFT`,
        revalidate: ["/admin/flashcards"],
      };
    }
    return { data: outcome, message: outcome.problems.length === 0 ? `${outcome.total} cards ready to create.` : "Fix the problems listed below." };
  });
  // Keep the paste and the choices filled after a successful check (React resets uncontrolled fields).
  return result?.ok && intent === "preview" ? { ...result, values: formValues(formData) } : result;
}
