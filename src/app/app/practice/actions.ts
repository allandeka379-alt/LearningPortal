"use server";

import { redirect } from "next/navigation";
import type { AnswerInput, SlotRef } from "@/components/questions/AnswerRunner";
import type { SelfAssessmentInput } from "@/components/questions/SelfAssessmentForm";
import type { PresentedFeedback, PresentedHint } from "@/components/questions/types";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { fail, safeAction, type ActionResult } from "@/server/lib/errors";
import {
  answerPracticeQuestion,
  endPracticeSession,
  revealPracticeHint,
  selfAssessPracticeAnswer,
  startPracticeSession,
  type StartedPractice,
  type StartPracticeInput,
} from "@/server/practice";

/**
 * Practice Server Actions (§10). Thin: authenticate (onboarded student), hand the raw input to the practice service
 * (which validates it with Zod) and return an `ActionResult`. Expected failures carry friendly messages (allowance
 * used up, plan does not include it, session closed); anything else becomes a generic error with a reference id.
 */

const start = safeAction(
  async (input: StartPracticeInput) => startPracticeSession(await requireOnboardedStudentForAction(), input),
  { operation: "practice.start" },
);
const answer = safeAction(
  async (input: AnswerInput) => answerPracticeQuestion(await requireOnboardedStudentForAction(), input),
  { operation: "practice.answer" },
);
const hint = safeAction(async (input: SlotRef) => revealPracticeHint(await requireOnboardedStudentForAction(), input), {
  operation: "practice.hint",
});
const selfAssess = safeAction(
  async (input: SlotRef & SelfAssessmentInput) => selfAssessPracticeAnswer(await requireOnboardedStudentForAction(), input),
  { operation: "practice.selfAssess" },
);
const end = safeAction(
  async (attemptId: string) => {
    await endPracticeSession(await requireOnboardedStudentForAction(), attemptId);
    return attemptId;
  },
  { operation: "practice.end" },
);

/** Builder → new (or resumed, same idempotency key) session. */
export async function startPracticeAction(input: StartPracticeInput): Promise<ActionResult<StartedPractice>> {
  return start(input);
}

/** Marks one answer and returns the feedback (§10 instant feedback). */
export async function answerQuestionAction(input: AnswerInput): Promise<ActionResult<PresentedFeedback>> {
  return answer(input);
}

/** Reveals the next hint of the current question. */
export async function revealHintAction(input: SlotRef): Promise<ActionResult<PresentedHint>> {
  return hint(input);
}

/** Self-assessment of an open answer when automatic marking is unavailable. */
export async function selfAssessAction(input: SlotRef & SelfAssessmentInput): Promise<ActionResult<PresentedFeedback>> {
  return selfAssess(input);
}

/**
 * "End session": scores the answered questions and opens the summary. Works as a plain form post (no JavaScript):
 * `<form action={formAction}>` with a hidden `attemptId`.
 */
export async function endPracticeSessionAction(_state: ActionResult<string> | null, formData: FormData): Promise<ActionResult<string> | null> {
  const attemptId = formData.get("attemptId");
  if (typeof attemptId !== "string") return fail("VALIDATION", "Session not found.");
  const result = await end(attemptId);
  if (result.ok) redirect(`/app/practice/${result.data}/summary`);
  return result;
}
