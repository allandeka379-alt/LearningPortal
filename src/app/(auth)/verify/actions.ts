"use server";

import { redirect } from "next/navigation";
import type { AuthFormState } from "@/components/auth/form-state";
import { readAuthFlowCookie, setAuthFlowCookie } from "@/server/auth/flow-cookie";
import { resendCode, verifyCode, type AuthOutcome } from "@/server/auth/flows";
import { ok } from "@/server/lib/errors";
import { failureState, finishOutcome, requestMeta, textField } from "../_lib/action-helpers";

/** Checks the 6-digit code of the pending flow (verification or code sign-in) and signs the user in. */
export async function verifyCodeAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const flow = await readAuthFlowCookie();
  if (flow === null) redirect("/login?error=flow_expired");
  let outcome: AuthOutcome;
  try {
    outcome = await verifyCode(flow, { code: textField(formData, "code") }, await requestMeta());
  } catch (error) {
    return failureState(error, {}, "auth.code.verify");
  }
  return finishOutcome(outcome);
}

/** Sends a new code for the pending flow (verify page and reset-password page). */
export async function resendCodeAction(): Promise<AuthFormState> {
  const flow = await readAuthFlowCookie();
  if (flow === null) redirect("/login?error=flow_expired");
  try {
    const outcome = await resendCode(flow, await requestMeta());
    await setAuthFlowCookie(outcome.flow);
    return ok({ message: "A new code is on its way.", sentAt: outcome.flow.sentAt });
  } catch (error) {
    return failureState(error, {}, "auth.code.resend");
  }
}
