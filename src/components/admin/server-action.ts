import "server-only";
import { revalidatePath } from "next/cache";
import { REAUTH_REQUIRED_MESSAGE } from "@/server/auth/guards";
import type { RequestMeta } from "@/server/auth/sessions";
import { fail, isAppError, normalizeError } from "@/server/lib/errors";
import { getRequestContext } from "@/server/lib/request";
import { MULTI_VALUE_SEPARATOR, REAUTH_REQUIRED_CODE, type AdminActionState, type AdminFormValues } from "./form-state";

/**
 * Route-layer plumbing for admin Server Actions (thin routes, CLAUDE.md rule 1). Every admin action:
 *   1. re-checks its permission with a `require*ForAction` guard (inside `fn`),
 *   2. validates input with Zod (in the service),
 *   3. calls a service in `src/server/cms/<area>/`,
 *   4. the service audits,
 *   5. returns an `ActionResult` (+ message / re-fill values) through {@link runAdminAction}.
 *
 * Errors never leak internals: `normalizeError` maps AppErrors to their safe message and logs anything else with a
 * reference id. A step-up failure becomes the {@link REAUTH_REQUIRED_CODE} code so the form can ask for the password.
 */

export interface AdminActionSuccess<T> {
  data: T;
  /** Confirmation announced to the user (status live region / toast). */
  message?: string;
  /** Client-side navigation after success (e.g. the created record). */
  redirectTo?: string;
  /** Paths to revalidate so Server Components show the change. */
  revalidate?: readonly string[];
}

/** Keys never echoed back to the client (secrets and framework internals). */
const NEVER_ECHO = /password|secret|token$|apikey|^\$ACTION/i;

/**
 * Non-secret string fields of a submitted form, to re-fill it after a failed submit. A field submitted several times
 * (checkbox group) is joined with {@link MULTI_VALUE_SEPARATOR}.
 */
export function formValues(formData: FormData | null): AdminFormValues {
  const values: AdminFormValues = {};
  if (formData === null) return values;
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || NEVER_ECHO.test(key)) continue;
    const text = value.slice(0, 10_000);
    values[key] = key in values ? `${values[key]}${MULTI_VALUE_SEPARATOR}${text}` : text;
  }
  return values;
}

/** A trimmed string field, or `undefined` when absent / blank. */
export function formText(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

/** Every value of a multi-value field (checkbox groups, multi-selects). */
export function formList(formData: FormData, key: string): string[] {
  return formData.getAll(key).filter((value): value is string => typeof value === "string" && value.trim() !== "");
}

/** A checkbox field: true when present with any value other than "false" / "off". */
export function formFlag(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return typeof value === "string" && value !== "" && value !== "false" && value !== "off";
}

/** Request id, IP and user agent of the current request (audit entries, sessions, rate limits). */
export async function adminRequestMeta(): Promise<RequestMeta> {
  const context = await getRequestContext();
  return { ip: context.ip, userAgent: context.userAgent, requestId: context.requestId };
}

function isReauthError(error: unknown): boolean {
  return (
    isAppError(error) &&
    error.code === "FORBIDDEN" &&
    (error.details?.reason === "reauth_required" || error.message === REAUTH_REQUIRED_MESSAGE)
  );
}

/**
 * Runs an admin action body and converts the outcome into {@link AdminActionState}. Next.js control flow
 * (`redirect()`, `notFound()`) is rethrown by `normalizeError`.
 */
export async function runAdminAction<T>(
  operation: string,
  formData: FormData | null,
  fn: () => Promise<AdminActionSuccess<T>>,
): Promise<AdminActionState<T>> {
  try {
    const result = await fn();
    for (const path of result.revalidate ?? []) revalidatePath(path);
    return {
      ok: true,
      data: result.data,
      ...(result.message === undefined ? {} : { message: result.message }),
      ...(result.redirectTo === undefined ? {} : { redirectTo: result.redirectTo }),
    };
  } catch (error) {
    if (isReauthError(error)) {
      return { ok: false, error: { code: REAUTH_REQUIRED_CODE, message: REAUTH_REQUIRED_MESSAGE }, values: formValues(formData) };
    }
    const normalized = normalizeError(error, { operation });
    return { ...fail(normalized.code, normalized.message, normalized.fieldErrors), values: formValues(formData) };
  }
}
