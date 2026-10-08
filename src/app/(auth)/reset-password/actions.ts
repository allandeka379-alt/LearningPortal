"use server";

import { redirect } from "next/navigation";
import type { AuthFormState } from "@/components/auth/form-state";
import { readAuthFlowCookie } from "@/server/auth/flow-cookie";
import { resetPassword, type AuthOutcome } from "@/server/auth/flows";
import { failureState, finishOutcome, requestMeta, textField } from "../_lib/action-helpers";

/** Forgot password, step 2: code + new password. Signs the user in on a fresh session (all others revoked). */
export async function resetPasswordAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const flow = await readAuthFlowCookie();
  if (flow === null || flow.purpose !== "PASSWORD_RESET") redirect("/forgot-password");
  let outcome: AuthOutcome;
  try {
    outcome = await resetPassword(
      flow,
      {
        code: textField(formData, "code"),
        password: textField(formData, "password"),
        confirmPassword: textField(formData, "confirmPassword"),
      },
      await requestMeta(),
    );
  } catch (error) {
    return failureState(error, {}, "auth.passwordReset.complete");
  }
  return finishOutcome(outcome);
}
