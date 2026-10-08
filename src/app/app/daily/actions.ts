"use server";

import { redirect } from "next/navigation";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { fail, safeAction, type ActionResult } from "@/server/lib/errors";
import { startDailyQuestion } from "@/server/practice";

/**
 * Daily question Server Actions (§46). Answering, hints and self-assessment reuse the practice actions (the daily
 * question is a practice-style attempt with instant feedback).
 */

const start = safeAction(
  async (subjectId: string) => {
    await startDailyQuestion(await requireOnboardedStudentForAction(), subjectId);
    return subjectId;
  },
  { operation: "daily.start" },
);

/** Opens today's question for a subject (idempotent: an existing attempt is resumed). Works as a plain form post. */
export async function startDailyQuestionAction(_state: ActionResult<string> | null, formData: FormData): Promise<ActionResult<string> | null> {
  const subjectId = formData.get("subjectId");
  if (typeof subjectId !== "string") return fail("VALIDATION", "Choose a subject.");
  const result = await start(subjectId);
  if (result.ok) redirect(`/app/daily?subjectId=${encodeURIComponent(result.data)}`);
  return result;
}
