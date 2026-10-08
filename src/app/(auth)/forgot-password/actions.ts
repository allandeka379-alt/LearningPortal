"use server";

import type { AuthFormState } from "@/components/auth/form-state";
import { requestPasswordReset, type AuthOutcome } from "@/server/auth/flows";
import { failureState, finishOutcome, pickValues, requestMeta, textField } from "../_lib/action-helpers";

/** Forgot password, step 1: sends a reset code (when the account exists) and goes to /reset-password. */
export async function requestPasswordResetAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const values = pickValues(formData, ["identifier"]);
  let outcome: AuthOutcome;
  try {
    outcome = await requestPasswordReset({ identifier: textField(formData, "identifier") }, await requestMeta());
  } catch (error) {
    return failureState(error, values, "auth.passwordReset.request");
  }
  return finishOutcome(outcome, "/reset-password");
}
