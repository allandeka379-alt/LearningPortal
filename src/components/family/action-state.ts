import type { ActionResult } from "@/server/lib/errors";

/**
 * States of the family forms (`useActionState`). `null` before the first submit, then the Server Action's
 * `ActionResult` (CLAUDE.md rule 4). Shared by /app/family (student) and /parent (parent).
 */

export type FamilyFormState = ActionResult<{ message: string }> | null;
export type FamilyFormAction = (state: FamilyFormState, formData: FormData) => Promise<FamilyFormState>;

/** A freshly created link code: shown once (only its hash is stored). */
export interface IssuedCodeView {
  message: string;
  displayCode: string;
  /** ISO instant. */
  expiresAt: string;
}

export type CodeFormState = ActionResult<IssuedCodeView> | null;
export type CodeFormAction = (state: CodeFormState, formData: FormData) => Promise<CodeFormState>;

/** Field errors of `field` from the last result, if any. */
export function fieldErrorsOf(state: ActionResult<unknown> | null, field: string): string[] | undefined {
  if (state === null || state.ok) return undefined;
  return state.error.fieldErrors?.[field];
}
