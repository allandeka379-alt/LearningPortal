"use server";

import { redirect } from "next/navigation";
import type { AuthFormState } from "@/components/auth/form-state";
import { getActor } from "@/server/auth/actor";
import { changePassword, type AuthOutcome } from "@/server/auth/flows";
import { LOGIN_PATH } from "@/server/auth/redirects";
import { failureState, finishOutcome, requestMeta, textField } from "../_lib/action-helpers";

/**
 * /change-password: current password + new password. The one action a user with a school-set password
 * (`passwordMustChange`) may run, so it resolves the actor without the guard that refuses them. On success every
 * other session is signed out, the flag is cleared and the user continues to `next` (validated) or their home area.
 */
export async function changePasswordAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const actor = await getActor();
  if (actor === null) redirect(LOGIN_PATH);
  let outcome: AuthOutcome;
  try {
    outcome = await changePassword(
      actor,
      {
        currentPassword: textField(formData, "currentPassword"),
        password: textField(formData, "password"),
        confirmPassword: textField(formData, "confirmPassword"),
      },
      await requestMeta(),
      { next: textField(formData, "next") ?? null, acceptTerms: textField(formData, "acceptTerms") === "on" },
    );
  } catch (error) {
    return failureState(error, {}, "auth.password.change");
  }
  return finishOutcome(outcome);
}
