import type { ActionResult } from "@/server/lib/errors";

/**
 * State of the auth forms (`useActionState`). Server Actions return an `ActionResult` (CLAUDE.md rule 4) plus the
 * non-secret values to re-fill after a failed submit (never passwords or codes). `null` before the first submit.
 */
export interface AuthFormSuccess {
  /** Confirmation to announce (e.g. "We sent a new code."). */
  message?: string;
  /** Epoch ms of the latest code send (restarts the resend countdown). */
  sentAt?: number;
}

export type AuthFormValues = Record<string, string>;

export type AuthFormState = (ActionResult<AuthFormSuccess> & { values?: AuthFormValues }) | null;

/** Signature of the Server Actions the auth forms take. */
export type AuthFormAction = (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;

/** First error message for `field`, if any. */
export function fieldError(state: AuthFormState, field: string): string[] | undefined {
  if (state === null || state.ok) return undefined;
  return state.error.fieldErrors?.[field];
}

/** Previously submitted value of `field` (for `defaultValue`). */
export function previousValue(state: AuthFormState, field: string, fallback = ""): string {
  return state?.values?.[field] ?? fallback;
}

/** Messages for `/login?error=…` codes set by the Google OAuth routes and guards. */
export const AUTH_PAGE_ERRORS: Readonly<Record<string, string>> = {
  google_unavailable: "Google sign-in isn't available right now. Please sign in with your email address instead.",
  google_cancelled: "Google sign-in was cancelled.",
  google_failed: "We couldn't sign you in with Google. Please try again.",
  google_email_unverified:
    "Your Google account's email address isn't verified. Verify it with Google, or sign in another way.",
  google_link_required:
    "An account with this email already exists. Sign in with your password or a code, then connect Google from your account settings.",
  google_account_unavailable: "This account can't be used right now. Please contact support.",
  rate_limited: "Too many attempts. Please wait a few minutes and try again.",
  flow_expired: "Your code request has expired. Please start again.",
};
