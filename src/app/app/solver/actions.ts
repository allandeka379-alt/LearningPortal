"use server";

import { redirect } from "next/navigation";
import type { SolveFormState } from "@/components/solver/SolverForm";
import { NOT_CONFIGURED_TITLE } from "@/components/solver/labels";
import { isAiNotConfigured } from "@/server/ai";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { notFoundUnlessFeature, requireFeature } from "@/server/features";
import { fail, normalizeError, ok, safeAction, type ActionResult } from "@/server/lib/errors";
import { archiveSolve, rateSolution, solveQuestion, type SolverPhotoUpload } from "@/server/solver";

/**
 * AI question solver Server Actions (thin: guard, read the form, call `src/server/solver`). The solve action accepts
 * the multipart form (text, photo, subject, mode, request id) with or without JavaScript and opens the stored
 * solution on success. While `features.ai` is off every action answers NOT_FOUND, like the pages (owner decision
 * 2026-10-07); no model is ever called.
 */

function optionalField(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

/** The first non-empty photo of the form (the camera and gallery inputs share the `photo` name). */
async function photoFrom(formData: FormData): Promise<SolverPhotoUpload | null> {
  for (const entry of formData.getAll("photo")) {
    if (typeof entry !== "string" && entry.size > 0) {
      return { bytes: new Uint8Array(await entry.arrayBuffer()), filename: entry.name || null };
    }
  }
  return null;
}

/** Solves the question from the form and opens the result, or returns an error / a safeguarding reply. */
export async function solveQuestionAction(_state: SolveFormState, formData: FormData): Promise<SolveFormState> {
  let solveId: string;
  try {
    await requireFeature("ai");
    const actor = await requireOnboardedStudentForAction();
    const text = formData.get("text");
    const subjectId = optionalField(formData, "subjectId");
    const clientRequestId = optionalField(formData, "clientRequestId");
    const result = await solveQuestion(
      actor,
      {
        text: typeof text === "string" ? text : "",
        mode: formData.get("mode") === "ANSWER" ? "ANSWER" : "TEACH",
        ...(subjectId ? { subjectId } : {}),
        ...(clientRequestId ? { clientRequestId } : {}),
      },
      { photo: await photoFrom(formData) },
    );
    if (result.kind === "SAFEGUARD") return ok({ kind: "SAFEGUARD" as const, helplines: result.helplines });
    solveId = result.conversationId;
  } catch (error) {
    if (isAiNotConfigured(error)) return fail("AI_UNAVAILABLE", `${NOT_CONFIGURED_TITLE}.`);
    const normalized = normalizeError(error, { operation: "solver.solve" });
    return fail(normalized.code, normalized.message, normalized.fieldErrors);
  }
  redirect(`/app/solver/${solveId}`);
}

/** Removes a solve from the history, then returns to the solver. */
export async function archiveSolveAction(formData: FormData): Promise<void> {
  await notFoundUnlessFeature("ai");
  const actor = await requireOnboardedStudentForAction();
  const solveId = formData.get("solveId");
  if (typeof solveId === "string") {
    try {
      await archiveSolve(actor, solveId);
    } catch (error) {
      // An unknown / foreign id is simply not archived; anything unexpected is logged by normalizeError.
      normalizeError(error, { operation: "solver.archive" });
    }
  }
  redirect("/app/solver");
}

const rate = safeAction(
  async (input: { messageId: string; rating: 1 | -1 | null }) => {
    await requireFeature("ai");
    await rateSolution(await requireOnboardedStudentForAction(), input);
    return null;
  },
  { operation: "solver.rate" },
);

/** "Was this helpful?" on a solution. */
export async function rateSolutionAction(input: { messageId: string; rating: 1 | -1 | null }): Promise<ActionResult<null>> {
  return rate(input);
}
