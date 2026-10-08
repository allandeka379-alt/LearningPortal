"use server";

import { redirect } from "next/navigation";
import type { AuthFormState } from "@/components/auth/form-state";
import { getActor } from "@/server/auth/actor";
import { confirmEmailChange, requestEmailChange } from "@/server/auth/email-change";
import { LOGIN_PATH } from "@/server/auth/redirects";
import { ok } from "@/server/lib/errors";
import { failureState, requestMeta, textField } from "../_lib/action-helpers";

/**
 * /change-email (signed in): step `request` (new address + current password: a code is emailed to the new address),
 * then step `confirm` (the code). The step and the new address come back in `values` so the form shows the next step;
 * passwords and codes never do.
 */
export async function changeEmailAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const actor = await getActor();
  if (actor === null) redirect(LOGIN_PATH);
  const email = (textField(formData, "email") ?? "").slice(0, 300);
  const meta = await requestMeta();
  if (textField(formData, "step") === "confirm") {
    try {
      const changed = await confirmEmailChange(actor, { email, code: textField(formData, "code") }, meta);
      return { ...ok({ message: `Your email address is now ${changed.email}. Use it to sign in and to reset your password.` }), values: { step: "done" } };
    } catch (error) {
      return failureState(error, { step: "confirm", email }, "auth.email.change");
    }
  }
  try {
    const pending = await requestEmailChange(actor, { email, currentPassword: textField(formData, "currentPassword") }, meta);
    return {
      ...ok({ message: `We sent a 6-digit code to ${pending.sentTo}. Enter it below to confirm the new address.`, sentAt: Date.now() }),
      values: { step: "confirm", email: pending.email },
    };
  } catch (error) {
    return failureState(error, { step: "request", email }, "auth.email.change");
  }
}
