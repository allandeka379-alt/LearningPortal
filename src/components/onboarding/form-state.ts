import type { ActionResult } from "@/server/lib/errors";

/**
 * State of the onboarding and diagnostic forms (`useActionState`): `null` before the first submit, then a failed
 * `ActionResult` (successful submits redirect to the next screen, so they never come back as state).
 */
export type OnboardingFormState = ActionResult<null> | null;

/** Signature of the Server Actions these forms post to (works as a plain form post without JavaScript). */
export type OnboardingFormAction = (state: OnboardingFormState, formData: FormData) => Promise<OnboardingFormState>;

/**
 * The messages to show for a failed submit: the field messages when there are any (they say exactly what to fix),
 * otherwise the general message. De-duplicated, in order.
 */
export function formMessages(state: OnboardingFormState): string[] {
  if (state === null || state.ok) return [];
  const fieldMessages = Object.values(state.error.fieldErrors ?? {}).flat();
  return [...new Set(fieldMessages.length > 0 ? fieldMessages : [state.error.message])];
}

/** Error codes that mean "your plan does not include this" (shown with a link to the plans). */
export const UPGRADE_ERROR_CODES: ReadonlySet<string> = new Set(["ENTITLEMENT_REQUIRED", "QUOTA_EXCEEDED"]);
