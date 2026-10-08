"use server";

import type { AuthFormState } from "@/components/auth/form-state";
import { loginWithPassword, requestLoginCode, type AuthOutcome } from "@/server/auth/flows";
import { failureState, finishOutcome, pickValues, requestMeta, textField } from "../_lib/action-helpers";

/** Password sign-in (email or school username). Redirects on success or to /verify for unverified accounts. */
export async function loginAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const values = pickValues(formData, ["identifier", "next"]);
  let outcome: AuthOutcome;
  try {
    outcome = await loginWithPassword(
      {
        identifier: textField(formData, "identifier"),
        password: textField(formData, "password"),
        next: textField(formData, "next"),
      },
      await requestMeta(),
    );
  } catch (error) {
    return failureState(error, values, "auth.login");
  }
  return finishOutcome(outcome);
}

/** Passwordless sign-in, step 1: sends a code (when the account exists) and goes to /verify. */
export async function requestLoginCodeAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const values = pickValues(formData, ["identifier", "next"]);
  let outcome: AuthOutcome;
  try {
    outcome = await requestLoginCode(
      { identifier: textField(formData, "identifier"), next: textField(formData, "next") },
      await requestMeta(),
    );
  } catch (error) {
    return failureState(error, values, "auth.loginCode.request");
  }
  return finishOutcome(outcome);
}
