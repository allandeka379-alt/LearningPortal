"use server";

import { redirect } from "next/navigation";
import type {
  ExamClock,
  ExamSectionInput,
  SaveExamInput,
  SaveExamResult,
  SubmitExamInput,
  SubmitExamResult,
} from "@/components/exam/types";
import type { SlotRef } from "@/components/questions/AnswerRunner";
import type { SelfAssessmentInput } from "@/components/questions/SelfAssessmentForm";
import type { PresentedFeedback } from "@/components/questions/types";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import {
  finishExamSection,
  getExamClock,
  saveExamResponse,
  selfAssessExamAnswer,
  startExam,
  startExamSection,
  submitExam,
  type StartedExam,
  type StartExamInput,
} from "@/server/exams/service";
import { fail, safeAction, type ActionResult } from "@/server/lib/errors";

/**
 * Exam-mode Server Actions (§12, §13). Thin: authenticate the onboarded student, hand the raw input to the exams
 * service (which validates it with Zod) and return an `ActionResult`. Expected failures carry friendly messages
 * (plan does not include it, allowance used up, time is up, attempt submitted); anything else becomes a generic error
 * with a reference id.
 */

const start = safeAction(async (input: StartExamInput) => startExam(await requireOnboardedStudentForAction(), input), {
  operation: "exams.start",
});
const save = safeAction(async (input: SaveExamInput) => saveExamResponse(await requireOnboardedStudentForAction(), input), {
  operation: "exams.save",
});
const clock = safeAction(async (attemptId: string) => getExamClock(await requireOnboardedStudentForAction(), attemptId), {
  operation: "exams.clock",
});
const startSection = safeAction(async (input: ExamSectionInput) => startExamSection(await requireOnboardedStudentForAction(), input), {
  operation: "exams.startSection",
});
const finishSection = safeAction(async (input: ExamSectionInput) => finishExamSection(await requireOnboardedStudentForAction(), input), {
  operation: "exams.finishSection",
});
const submit = safeAction(async (input: SubmitExamInput) => submitExam(await requireOnboardedStudentForAction(), input), {
  operation: "exams.submit",
});
const selfAssess = safeAction(
  async (input: SlotRef & SelfAssessmentInput) => selfAssessExamAnswer(await requireOnboardedStudentForAction(), input),
  { operation: "exams.selfAssess" },
);

function field(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" && value !== "" ? value : undefined;
}

/**
 * "Start test" on the instructions page: starts (or resumes) the attempt and opens the exam room. Works as a plain
 * form post without JavaScript (`assessmentId` + a per-page `idempotencyKey` against double taps).
 */
export async function startExamAction(_state: ActionResult<StartedExam> | null, formData: FormData): Promise<ActionResult<StartedExam> | null> {
  const assessmentId = field(formData, "assessmentId");
  if (!assessmentId) return fail("VALIDATION", "Choose a test to start.");
  const idempotencyKey = field(formData, "idempotencyKey");
  const origin = field(formData, "origin");
  // The service validates every field with Zod (an unknown origin is a VALIDATION error).
  const result = await start({
    assessmentId,
    ...(idempotencyKey ? { idempotencyKey } : {}),
    ...(origin ? { origin: origin as StartExamInput["origin"] } : {}),
  });
  if (result.ok) redirect(result.data.href);
  return result;
}

/** Autosave of one answer and/or its flag. */
export async function saveExamResponseAction(input: SaveExamInput): Promise<ActionResult<SaveExamResult>> {
  return save(input);
}

/** The server clock (re-sync when the page regains focus or becomes visible). */
export async function syncExamClockAction(attemptId: string): Promise<ActionResult<ExamClock>> {
  return clock(attemptId);
}

/** Starts a separately timed paper. */
export async function startExamSectionAction(input: ExamSectionInput): Promise<ActionResult<ExamClock>> {
  return startSection(input);
}

/** Finishes a running paper early (its answers are locked). */
export async function finishExamSectionAction(input: ExamSectionInput): Promise<ActionResult<ExamClock>> {
  return finishSection(input);
}

/** Submits the exam (the student's confirmation, or the countdown reaching zero). */
export async function submitExamAction(input: SubmitExamInput): Promise<ActionResult<SubmitExamResult>> {
  return submit(input);
}

/** Self-marks a written answer on the results page when AI marking is not configured. */
export async function selfAssessExamAnswerAction(input: SlotRef & SelfAssessmentInput): Promise<ActionResult<PresentedFeedback>> {
  return selfAssess(input);
}
