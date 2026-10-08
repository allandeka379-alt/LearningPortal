"use server";

import type { AuthFormState } from "@/components/auth/form-state";
import { register, type AuthOutcome } from "@/server/auth/flows";
import { clearReferralCookie, readReferralCookie } from "@/server/referrals/cookie";
import { failureState, finishOutcome, pickValues, requestMeta, textField } from "../_lib/action-helpers";

/**
 * Self-registration: creates the account (or not, without saying so) and goes to /verify. An invite code left by the
 * referral landing (/r/[code]) is passed along for attribution and the cookie is cleared (§46).
 */
export async function registerAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const values = pickValues(formData, ["role", "firstName", "lastName", "identifier", "birthYear", "next"]);
  if (formData.get("acceptTerms") === "on") values.acceptTerms = "on";
  let outcome: AuthOutcome;
  try {
    outcome = await register(
      {
        role: textField(formData, "role") || undefined,
        firstName: textField(formData, "firstName"),
        lastName: textField(formData, "lastName"),
        identifier: textField(formData, "identifier"),
        password: textField(formData, "password"),
        birthYear: textField(formData, "birthYear"),
        acceptTerms: formData.get("acceptTerms") === "on",
        next: textField(formData, "next"),
        referralCode: (await readReferralCookie()) ?? undefined,
      },
      await requestMeta(),
    );
  } catch (error) {
    return failureState(error, values, "auth.register");
  }
  await clearReferralCookie();
  return finishOutcome(outcome);
}
