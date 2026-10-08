"use server";

import { redirect } from "next/navigation";
import type { ExamClock, ExamSectionInput, SaveExamInput, SaveExamResult, SubmitExamInput, SubmitExamResult } from "@/components/exam/types";
import type { OnboardingFormState } from "@/components/onboarding/form-state";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { finishExamSection, getExamClock, saveExamResponse, startExamSection } from "@/server/exams/service";
import { safeAction, type ActionResult } from "@/server/lib/errors";
import { startDiagnostics, submitDiagnostic, type StartDiagnosticsInput } from "@/server/onboarding/diagnostic";

/**
 * Diagnostic Server Actions (§46, §52). Thin: authenticate the onboarded student, hand the raw input to the services
 * (which validate with Zod and check ownership) and return an `ActionResult`. The room reuses the exam services for
 * autosave and the clock; submission goes through the diagnostic service so it opens the diagnostic report.
 */

const start = safeAction(async (input: StartDiagnosticsInput) => startDiagnostics(await requireOnboardedStudentForAction(), input), {
  operation: "diagnostic.start",
});
const save = safeAction(async (input: SaveExamInput) => saveExamResponse(await requireOnboardedStudentForAction(), input), {
  operation: "diagnostic.save",
});
const clock = safeAction(async (attemptId: string) => getExamClock(await requireOnboardedStudentForAction(), attemptId), {
  operation: "diagnostic.clock",
});
const startSection = safeAction(async (input: ExamSectionInput) => startExamSection(await requireOnboardedStudentForAction(), input), {
  operation: "diagnostic.startSection",
});
const finishSection = safeAction(async (input: ExamSectionInput) => finishExamSection(await requireOnboardedStudentForAction(), input), {
  operation: "diagnostic.finishSection",
});
const submit = safeAction(async (input: SubmitExamInput) => submitDiagnostic(await requireOnboardedStudentForAction(), input), {
  operation: "diagnostic.submit",
});

function field(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" && value !== "" ? value : undefined;
}

/**
 * "Start the diagnostic": prepares one diagnostic per chosen subject (`subjectIds`, resuming open ones) and opens the
 * first. A plain form post that works without JavaScript; `idempotencyKey` guards against double taps.
 */
export async function startDiagnosticsAction(_state: OnboardingFormState, formData: FormData): Promise<OnboardingFormState> {
  const idempotencyKey = field(formData, "idempotencyKey");
  const result = await start({
    subjectIds: formData.getAll("subjectIds").filter((value): value is string => typeof value === "string"),
    ...(idempotencyKey ? { idempotencyKey } : {}),
    fromOnboarding: field(formData, "from") === "onboarding",
  });
  if (result.ok) redirect(result.data.href);
  return { ok: false, error: result.error };
}

/** Autosave of one answer and/or its flag. */
export async function saveDiagnosticResponseAction(input: SaveExamInput): Promise<ActionResult<SaveExamResult>> {
  return save(input);
}

/** The server clock (re-sync when the page regains focus or becomes visible). */
export async function syncDiagnosticClockAction(attemptId: string): Promise<ActionResult<ExamClock>> {
  return clock(attemptId);
}

/** Starts a separately timed paper (only published diagnostics with papers have them). */
export async function startDiagnosticSectionAction(input: ExamSectionInput): Promise<ActionResult<ExamClock>> {
  return startSection(input);
}

/** Finishes a running paper early. */
export async function finishDiagnosticSectionAction(input: ExamSectionInput): Promise<ActionResult<ExamClock>> {
  return finishSection(input);
}

/** Submits the diagnostic; the result links to the diagnostic report. */
export async function submitDiagnosticAction(input: SubmitExamInput): Promise<ActionResult<SubmitExamResult>> {
  return submit(input);
}
