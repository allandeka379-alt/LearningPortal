"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LESSON_PRACTICE_ANCHOR, lessonHref } from "@/components/lessons/labels";
import type { LessonActivityInput } from "@/components/lessons/LessonActivityTracker";
import type { CompleteLessonState } from "@/components/lessons/MarkCompleteForm";
import type { StartLessonCheckState } from "@/components/lessons/StartLessonCheckForm";
import type { AnswerInput, SlotRef } from "@/components/questions/AnswerRunner";
import type { SelfAssessmentInput } from "@/components/questions/SelfAssessmentForm";
import type { PresentedFeedback, PresentedHint } from "@/components/questions/types";
import { formString } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { fail, safeAction, type ActionResult } from "@/server/lib/errors";
import { markLessonProgress, startLessonCheck } from "@/server/lessons";
import { answerPracticeQuestion, revealPracticeHint, selfAssessPracticeAnswer } from "@/server/practice";

/**
 * Lesson reader Server Actions (§8). Thin: authenticate the onboarded student, pass raw input to the lessons /
 * practice services (which validate with Zod and check access) and return an `ActionResult`. The practice question
 * actions reuse the practice service, which only ever acts on the student's own attempts.
 */

const uuid = z.uuid();

const record = safeAction(
  async (input: LessonActivityInput) => {
    const actor = await requireOnboardedStudentForAction();
    const result = await markLessonProgress(actor, String(input?.lessonId ?? ""), {
      secondsSpent: input?.secondsSpent,
      ...(input?.view === true ? { view: true } : {}),
    });
    return { creditedSeconds: result.creditedSeconds };
  },
  { operation: "lessons.progress" },
);

const complete = safeAction(
  async (lessonId: string) => markLessonProgress(await requireOnboardedStudentForAction(), lessonId, { completed: true }),
  { operation: "lessons.complete" },
);

const start = safeAction(
  async (lessonId: string, idempotencyKey: string | undefined) =>
    startLessonCheck(await requireOnboardedStudentForAction(), lessonId, idempotencyKey ? { idempotencyKey } : {}),
  { operation: "lessons.check.start" },
);

const answer = safeAction(async (input: AnswerInput) => answerPracticeQuestion(await requireOnboardedStudentForAction(), input), {
  operation: "lessons.check.answer",
});
const hint = safeAction(async (input: SlotRef) => revealPracticeHint(await requireOnboardedStudentForAction(), input), {
  operation: "lessons.check.hint",
});
const selfAssess = safeAction(
  async (input: SlotRef & SelfAssessmentInput) => selfAssessPracticeAnswer(await requireOnboardedStudentForAction(), input),
  { operation: "lessons.check.selfAssess" },
);

/** Heartbeat beacon of the reader: a view on open, then active reading seconds (automatic time tracking). */
export async function recordLessonActivityAction(input: LessonActivityInput): Promise<ActionResult<{ creditedSeconds: number }>> {
  return record(input);
}

/** "Mark as complete" (form post). Idempotent; the message reports the XP actually recorded. */
export async function completeLessonAction(_state: CompleteLessonState, formData: FormData): Promise<CompleteLessonState> {
  const lessonId = formString(formData, "lessonId") ?? "";
  const result = await complete(lessonId);
  if (!result.ok) return result;
  if (uuid.safeParse(lessonId).success) revalidatePath(`/app/lessons/${lessonId}`);
  const { xpAwarded, newlyCompleted } = result.data;
  const message = !newlyCompleted ? "You had already completed this lesson." : xpAwarded > 0 ? `Lesson completed. +${xpAwarded} XP.` : "Lesson completed.";
  return { ok: true, data: { message } };
}

/** Starts (or resumes) the lesson's practice questions, then returns to them on the lesson page. */
export async function startLessonCheckAction(_state: StartLessonCheckState, formData: FormData): Promise<StartLessonCheckState> {
  const lessonId = formString(formData, "lessonId") ?? "";
  if (!uuid.safeParse(lessonId).success) return fail("NOT_FOUND", "Lesson not found.");
  const topicId = formString(formData, "topicId");
  const result = await start(lessonId, formString(formData, "idempotencyKey") || undefined);
  if (!result.ok) return result;
  redirect(lessonHref(lessonId, { topicId: topicId && uuid.safeParse(topicId).success ? topicId : null, hash: LESSON_PRACTICE_ANCHOR }));
}

/** Marks one answer and returns the feedback (instant feedback, §10). */
export async function answerLessonQuestionAction(input: AnswerInput): Promise<ActionResult<PresentedFeedback>> {
  return answer(input);
}

/** Reveals the next hint of the current question. */
export async function revealLessonHintAction(input: SlotRef): Promise<ActionResult<PresentedHint>> {
  return hint(input);
}

/** Self-assessment of an open answer when automatic marking is unavailable. */
export async function selfAssessLessonAnswerAction(input: SlotRef & SelfAssessmentInput): Promise<ActionResult<PresentedFeedback>> {
  return selfAssess(input);
}
