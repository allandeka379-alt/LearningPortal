import "server-only";
import { revalidatePath } from "next/cache";
import { fail, normalizeError, type ActionResult } from "@/server/lib/errors";

/**
 * Route-layer plumbing for the billing Server Actions (thin routes, CLAUDE.md rule 1): the action re-checks the actor
 * inside `fn`, passes raw values to ./service.ts (Zod + AppError), and returns an `ActionResult`. Unexpected errors
 * are logged with a reference and surface only as a generic message; Next.js control flow is rethrown.
 */
export async function runBillingAction<T>(
  operation: string,
  fn: () => Promise<T>,
  options: { revalidate?: readonly string[] } = {},
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    for (const path of options.revalidate ?? []) revalidatePath(path);
    return { ok: true, data };
  } catch (error) {
    const normalized = normalizeError(error, { operation });
    return fail(normalized.code, normalized.message, normalized.fieldErrors);
  }
}

/** A string form field, `undefined` when absent or not text (services trim and validate). */
export function formString(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}
