import type { ActionResult } from "@/server/lib/errors";

/**
 * State of the student-area forms (`useActionState`): `null` before the first submit, then the Server Action's
 * `ActionResult` (CLAUDE.md rule 4) carrying a confirmation to announce.
 */
export type FormActionState = ActionResult<{ message: string }> | null;

/** Signature of the Server Actions the student-area forms take. */
export type FormAction = (state: FormActionState, formData: FormData) => Promise<FormActionState>;

/** Field errors of `field` from the last result, if any. */
export function fieldErrorsOf(state: FormActionState, field: string): string[] | undefined {
  if (state === null || state.ok) return undefined;
  return state.error.fieldErrors?.[field];
}

/** Form-level error message (failure without field errors for the visible fields). */
export function formErrorOf(state: FormActionState): string | null {
  return state !== null && !state.ok ? state.error.message : null;
}
