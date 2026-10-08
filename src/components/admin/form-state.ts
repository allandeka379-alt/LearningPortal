import type { ActionResult } from "@/server/lib/errors";

/**
 * State shared by every admin form and confirm dialog (`useActionState`). Isomorphic (types + pure helpers only).
 *
 * Admin Server Actions return an {@link ActionResult} (CLAUDE.md rule 4) plus:
 * - `message`: a confirmation to announce on success ("User suspended.");
 * - `values`: the submitted, non-secret field values, so a failed submit re-fills the form (React resets
 *   uncontrolled fields after a form action);
 * - `redirectTo`: where the client should navigate after a success (e.g. the new record's page).
 *
 * A step-up failure (the action needs a password confirmation within the last 15 minutes, ARCHITECTURE §5.1) uses
 * the code {@link REAUTH_REQUIRED_CODE}; admin forms answer it with an inline password prompt.
 */

export const REAUTH_REQUIRED_CODE = "REAUTH_REQUIRED";

export type AdminFormValues = Record<string, string>;

/** Joins the values of a multi-value field (checkbox group) in {@link AdminActionState.values}. */
export const MULTI_VALUE_SEPARATOR = "\u001f";

export type AdminActionState<T = unknown> =
  | (ActionResult<T> & { message?: string; values?: AdminFormValues; redirectTo?: string })
  | null;

/** Signature of every admin Server Action used with `useActionState`. */
export type AdminFormAction<T = unknown> = (state: AdminActionState<T>, formData: FormData) => Promise<AdminActionState<T>>;

/** Field error messages for `name`, if the last submit failed validation. */
export function fieldErrorsFor(state: AdminActionState, name: string): string[] | undefined {
  if (state === null || state.ok) return undefined;
  return state.error.fieldErrors?.[name];
}

/** The previously submitted value of `name` (after a failure), else `fallback`. */
export function submittedValue(state: AdminActionState, name: string, fallback?: string): string | undefined {
  return state?.values?.[name] ?? fallback;
}

/** True when the failure asks for a password confirmation (step-up). */
export function needsReauth(state: AdminActionState): boolean {
  return state !== null && !state.ok && state.error.code === REAUTH_REQUIRED_CODE;
}
