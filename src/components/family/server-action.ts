import "server-only";
import { revalidatePath } from "next/cache";
import type { FamilyRequestMeta } from "@/server/family/common";
import { fail, normalizeError, type ActionResult } from "@/server/lib/errors";
import { getRequestContext } from "@/server/lib/request";

/**
 * Route-layer plumbing for the family Server Actions (thin routes, CLAUDE.md rule 1): each action re-checks the actor
 * inside `fn`, passes raw form values to a `src/server/family` service (which validates with Zod and throws
 * `AppError`s) and returns an `ActionResult`. Unexpected errors are logged with a reference and surface only as a
 * generic message; `redirect()` / `notFound()` pass through.
 */
export async function runFamilyAction<T>(
  operation: string,
  fn: () => Promise<T>,
  options: { revalidate?: readonly string[] } = {},
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    for (const path of options.revalidate ?? []) revalidatePath(path, "layout");
    return { ok: true, data };
  } catch (error) {
    const normalized = normalizeError(error, { operation });
    return fail(normalized.code, normalized.message, normalized.fieldErrors);
  }
}

/** A string form field (untrimmed; services trim and validate), `undefined` when absent or not text. */
export function formString(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

/** A non-empty string form field, else `undefined` (lets service defaults apply to blank selects). */
export function formValue(formData: FormData, key: string): string | undefined {
  const value = formString(formData, key);
  return value === undefined || value.trim() === "" ? undefined : value;
}

/** Permission checkboxes (`progress`, `activity`, `results`): checked boxes are present in the form. */
export function formPermissions(formData: FormData): { progress: boolean; activity: boolean; results: boolean } {
  return { progress: formData.has("progress"), activity: formData.has("activity"), results: formData.has("results") };
}

/** IP (hashed downstream), user agent and request id of the current request, for audit entries and rate limits. */
export async function familyRequestMeta(): Promise<FamilyRequestMeta> {
  const context = await getRequestContext();
  return { ip: context.ip, userAgent: context.userAgent, requestId: context.requestId };
}
