"use server";

import { redirect } from "next/navigation";
import type { OnboardingFormState } from "@/components/onboarding/form-state";
import { getActor, type Actor } from "@/server/auth/actor";
import { changePasswordPathWithNext, loginPathWithNext } from "@/server/auth/redirects";
import { fail, normalizeError } from "@/server/lib/errors";
import { completeOnboarding, resolveDailyGoal, saveOnboardingStep } from "@/server/onboarding/service";
import { isWizardStep, ONBOARDING_BASE_PATH, onboardingEntryRedirect, onboardingNext, withOnboardingNext, type WizardStep } from "@/server/onboarding/steps";

/**
 * Onboarding wizard Server Actions (§5). Thin: resolve the student (others are sent to their own area, finished
 * students to /app), read the form, call the onboarding service (which validates with Zod and the catalogue) and
 * redirect to the next screen. Failures come back as an `ActionResult` with field errors for the screen to show.
 * Plain form posts: the wizard works without JavaScript.
 */

function text(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

/** The service input of one screen, from its form fields. */
function inputFor(step: Exclude<WizardStep, "finish">, formData: FormData): Record<string, unknown> {
  switch (step) {
    case "country":
      return { countryId: text(formData, "countryId") };
    case "board":
      return { examBoardId: text(formData, "examBoardId") };
    case "level":
      return { qualificationId: text(formData, "qualificationId") };
    case "year":
      return { yearGroupId: text(formData, "yearGroupId"), schoolId: text(formData, "schoolId") };
    case "subjects":
      return { subjectIds: formData.getAll("subjectIds").filter((value): value is string => typeof value === "string") };
    case "exam":
      return { targetExamSessionId: text(formData, "targetExamSessionId") };
    case "ability":
      return { abilityLevel: text(formData, "abilityLevel") };
    case "grade":
      // A missing choice means "no target" (the screen pre-selects it).
      return { targetGrade: text(formData, "targetGrade") ?? "" };
    case "goal":
      return { dailyGoalMinutes: resolveDailyGoal(text(formData, "dailyGoalMinutes"), text(formData, "customDailyGoalMinutes")) };
  }
}

/** The signed-in student mid-onboarding; anyone else is redirected (login, their own area, or /app). */
async function onboardingActor(): Promise<Actor> {
  const actor = await getActor();
  if (actor === null) redirect(loginPathWithNext(ONBOARDING_BASE_PATH));
  if (actor.passwordMustChange === true) redirect(changePasswordPathWithNext(ONBOARDING_BASE_PATH));
  const elsewhere = onboardingEntryRedirect(actor);
  if (elsewhere) redirect(elsewhere);
  return actor;
}

function failure(error: unknown, operation: string): OnboardingFormState {
  const normalized = normalizeError(error, { operation });
  return fail(normalized.code, normalized.message, normalized.fieldErrors);
}

/** Saves one screen (hidden `step` field) and opens the next one. */
export async function saveOnboardingStepAction(_state: OnboardingFormState, formData: FormData): Promise<OnboardingFormState> {
  const actor = await onboardingActor();
  const step = formData.get("step");
  if (!isWizardStep(step) || step === "finish") return fail("BAD_REQUEST", "This page is out of date. Reload it and try again.");
  let href: string;
  try {
    href = (await saveOnboardingStep(actor, step, inputFor(step, formData))).href;
  } catch (error) {
    const result = failure(error, `onboarding.save.${step}`);
    // The screen is ahead of the answers (another tab changed an earlier answer): resume where the student is.
    if (result && !result.ok && result.error.code === "CONFLICT") redirect(withOnboardingNext(ONBOARDING_BASE_PATH, formData.get("next")?.toString()));
    return result;
  }
  // The hidden `next` field (validated again here) travels to the next screen.
  redirect(withOnboardingNext(href, formData.get("next")?.toString()));
}

/**
 * Last screen: `choice=diagnostic` (recommended) or `choice=dashboard`. Enrols the chosen subjects (pinning their
 * syllabus versions), completes onboarding and opens the diagnostic or the dashboard; a pending `next` (the page the
 * student was going to before onboarding, e.g. a class invitation) wins over the dashboard. The diagnostic stays one
 * tap away on /app/diagnostic.
 */
export async function finishOnboardingAction(_state: OnboardingFormState, formData: FormData): Promise<OnboardingFormState> {
  const actor = await onboardingActor();
  let href: string;
  try {
    href = (await completeOnboarding(actor, { choice: text(formData, "choice") })).href;
  } catch (error) {
    const result = failure(error, "onboarding.finish");
    if (result && !result.ok && result.error.code === "CONFLICT") redirect(withOnboardingNext(ONBOARDING_BASE_PATH, formData.get("next")?.toString()));
    return result;
  }
  redirect(onboardingNext(formData.get("next")?.toString()) ?? href);
}
