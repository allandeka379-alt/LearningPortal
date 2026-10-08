"use server";

import { revalidatePath } from "next/cache";
import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction } from "@/components/student/server-action";
import type { ReviewInput, ReviewOutcome } from "@/components/flashcards/types";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import {
  createPersonalCard,
  deletePersonalCard,
  previewPersonalCard,
  reviewCard,
  setCardSuspended,
  updatePersonalCard,
  type PersonalCardInput,
} from "@/server/flashcards/service";
import { safeAction, type ActionResult } from "@/server/lib/errors";
import type { SanitizedHtml } from "@/lib/content/types";

/**
 * Flashcard Server Actions (§18). Thin: authenticate (onboarded student), hand the raw input to the flashcards service
 * (Zod validation, entitlement, ownership, idempotency) and return an `ActionResult`. Reviews are NOT revalidated per
 * answer (the session runs client-side and the next page load reads fresh queues).
 */

const review = safeAction(async (input: ReviewInput) => reviewCard(await requireOnboardedStudentForAction(), input), {
  operation: "flashcards.review",
});
const suspend = safeAction(
  async (input: { flashcardId: string; suspended: boolean; subjectId?: string }) =>
    setCardSuspended(await requireOnboardedStudentForAction(), input),
  { operation: "flashcards.suspend" },
);
const preview = safeAction(
  async (input: { front: string; back: string; notes?: string | null }) => previewPersonalCard(await requireOnboardedStudentForAction(), input),
  { operation: "flashcards.preview" },
);
const create = safeAction(
  async (input: PersonalCardInput) => {
    const created = await createPersonalCard(await requireOnboardedStudentForAction(), input);
    revalidatePath("/app/flashcards", "layout");
    return created;
  },
  { operation: "flashcards.create" },
);
const update = safeAction(
  async (input: PersonalCardInput & { id?: string }) => {
    const updated = await updatePersonalCard(await requireOnboardedStudentForAction(), input);
    revalidatePath("/app/flashcards", "layout");
    return updated;
  },
  { operation: "flashcards.update" },
);

/** One Again / Hard / Good / Easy answer (idempotent per `clientReviewId`, so the session can retry freely). */
export async function reviewCardAction(input: ReviewInput): Promise<ActionResult<ReviewOutcome>> {
  return review(input);
}

/** Suspends (or restores) a card from the review session. */
export async function suspendCardAction(input: { flashcardId: string; suspended: boolean; subjectId?: string }): Promise<ActionResult<{ flashcardId: string; suspended: boolean }>> {
  return suspend(input);
}

/** Renders a draft personal card (Markdown + LaTeX) without saving it. */
export async function previewCardAction(input: {
  front: string;
  back: string;
  notes?: string | null;
}): Promise<ActionResult<{ frontHtml: SanitizedHtml; backHtml: SanitizedHtml; notesHtml: SanitizedHtml | null }>> {
  return preview(input);
}

/** Creates a personal card. */
export async function createPersonalCardAction(input: PersonalCardInput): Promise<ActionResult<{ id: string }>> {
  return create(input);
}

/** Saves an edited personal card. */
export async function updatePersonalCardAction(input: PersonalCardInput & { id?: string }): Promise<ActionResult<{ id: string }>> {
  return update(input);
}

/** Deletes one of the student's own cards (`cardId`). */
export async function deletePersonalCardAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("flashcards.delete", async () => {
    const actor = await requireOnboardedStudentForAction();
    await deletePersonalCard(actor, formString(formData, "cardId") ?? "");
    revalidatePath("/app/flashcards", "layout");
    return { message: "Card deleted." };
  });
}

/** Restores a suspended card (`cardId`) to the student's reviews. */
export async function restoreCardAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("flashcards.restore", async () => {
    const actor = await requireOnboardedStudentForAction();
    await setCardSuspended(actor, { flashcardId: formString(formData, "cardId") ?? "", suspended: false });
    revalidatePath("/app/flashcards", "layout");
    return { message: "Card restored to your reviews." };
  });
}
