import "server-only";
import { redirect } from "next/navigation";
import type { AuthFormState, AuthFormValues } from "@/components/auth/form-state";
import { readDeviceTrustCookie, rememberDeviceCookie } from "@/server/auth/device-cookie";
import { clearAuthFlowCookie, setAuthFlowCookie } from "@/server/auth/flow-cookie";
import type { AuthOutcome } from "@/server/auth/flows";
import { readSessionCookie, revokeSessionByToken, setSessionCookie, type RequestMeta } from "@/server/auth/sessions";
import { fail, normalizeError } from "@/server/lib/errors";
import { getRequestContext } from "@/server/lib/request";

/**
 * Route-layer plumbing shared by the auth Server Actions: request metadata, form state on failure, and finishing an
 * outcome (session cookie + redirect, or pending-code cookie + redirect). Business logic lives in src/server/auth.
 */

/** IP, user agent, request id and remembered-device token of the current request. */
export async function requestMeta(): Promise<RequestMeta> {
  const context = await getRequestContext();
  return { ip: context.ip, userAgent: context.userAgent, requestId: context.requestId, deviceToken: await readDeviceTrustCookie() };
}

/** String values of `keys` from a form (to re-fill after an error). Never pass password or code fields. */
export function pickValues(formData: FormData, keys: readonly string[]): AuthFormValues {
  const values: AuthFormValues = {};
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") values[key] = value.slice(0, 300);
  }
  return values;
}

/** A string form field, `undefined` when absent or not text. */
export function textField(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

/** Converts any thrown error into the form's failure state (client-safe message, field errors, re-fill values). */
export function failureState(error: unknown, values: AuthFormValues, operation: string): AuthFormState {
  const normalized = normalizeError(error, { operation });
  return { ...fail(normalized.code, normalized.message, normalized.fieldErrors), values };
}

/**
 * Completes an auth step. Session → revoke any previous session of this browser (rotation), set the new cookie,
 * remember this device for the account, drop the pending-code cookie and go to the destination. Pending code → store
 * the flow and go to `verifyPath`. Always redirects (never returns).
 */
export async function finishOutcome(outcome: AuthOutcome, verifyPath = "/verify"): Promise<never> {
  if (outcome.kind === "session") {
    const previous = await readSessionCookie();
    if (previous !== null && previous !== outcome.token) await revokeSessionByToken(previous, "rotated");
    await setSessionCookie(outcome.token, outcome.session);
    await rememberDeviceCookie(outcome.userId);
    await clearAuthFlowCookie();
    redirect(outcome.redirectTo);
  }
  await setAuthFlowCookie(outcome.flow);
  redirect(verifyPath);
}
