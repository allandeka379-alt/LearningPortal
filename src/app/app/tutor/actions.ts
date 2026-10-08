"use server";

import { redirect } from "next/navigation";
import type { FormActionState } from "@/components/student/action-state";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { notFoundUnlessFeature, requireFeature } from "@/server/features";
import { fail, normalizeError, safeAction, type ActionResult } from "@/server/lib/errors";
import { archiveConversation, createConversation, rateTutorMessage } from "@/server/tutor";

/**
 * AI tutor Server Actions (thin: guard, parse form values, call `src/server/tutor`). Streaming turns go through the
 * REST route `/api/v1/tutor/conversations/[id]/messages` (Server Actions cannot stream tokens). While `features.ai` is
 * off every action answers NOT_FOUND, like the pages (owner decision 2026-10-07).
 */

function optionalField(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

/** Starts a conversation (subject / topic / question from the form) and opens it. */
export async function createConversationAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  let conversationId: string;
  try {
    await requireFeature("ai");
    const actor = await requireOnboardedStudentForAction();
    const subjectId = optionalField(formData, "subjectId");
    const topicId = optionalField(formData, "topicId");
    const questionId = optionalField(formData, "questionId");
    const created = await createConversation(actor, {
      ...(subjectId ? { subjectId } : {}),
      ...(topicId ? { topicId } : {}),
      ...(questionId ? { questionId } : {}),
    });
    conversationId = created.id;
  } catch (error) {
    const normalized = normalizeError(error, { operation: "tutor.create" });
    return fail(normalized.code, normalized.message, normalized.fieldErrors);
  }
  redirect(`/app/tutor/${conversationId}`);
}

/** Archives a conversation from the list or the conversation page, then returns to the list. */
export async function archiveConversationAction(formData: FormData): Promise<void> {
  await notFoundUnlessFeature("ai");
  const actor = await requireOnboardedStudentForAction();
  const conversationId = formData.get("conversationId");
  if (typeof conversationId === "string") {
    try {
      await archiveConversation(actor, conversationId);
    } catch (error) {
      // An unknown / foreign id is simply not archived; anything unexpected is logged by normalizeError.
      normalizeError(error, { operation: "tutor.archive" });
    }
  }
  redirect("/app/tutor");
}

const rate = safeAction(
  async (input: { messageId: string; rating: 1 | -1 | null }) => {
    await requireFeature("ai");
    await rateTutorMessage(await requireOnboardedStudentForAction(), input);
    return null;
  },
  { operation: "tutor.rate" },
);

/** "Was this helpful?" on a tutor answer. */
export async function rateTutorMessageAction(input: { messageId: string; rating: 1 | -1 | null }): Promise<ActionResult<null>> {
  return rate(input);
}
