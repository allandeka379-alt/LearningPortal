import "server-only";
import { revalidatePath } from "next/cache";
import type { RequestMeta } from "@/server/auth/sessions";
import { fail, normalizeError } from "@/server/lib/errors";
import { getRequestContext } from "@/server/lib/request";
import type { FormActionState } from "./action-state";

/**
 * Route-layer plumbing for student-area Server Actions (thin routes, CLAUDE.md rule 1). Each action re-checks the
 * student with `requireOnboardedStudentForAction()` inside `fn`, passes raw form values to a service (which
 * validates with Zod and throws `AppError`s), and returns an `ActionResult` through {@link runStudentAction}.
 * Unexpected errors are logged with a reference and surface only as a generic message.
 */

export interface StudentActionSuccess {
  /** Confirmation announced to the student. */
  message: string;
  /** Pages to refresh, e.g. `["/app"]` with `type: "layout"` for everything under /app. */
  revalidateLayout?: boolean;
}

/** Runs an action body and converts the outcome into a {@link FormActionState}. Next.js control flow is rethrown. */
export async function runStudentAction(operation: string, fn: () => Promise<StudentActionSuccess>): Promise<FormActionState> {
  try {
    const result = await fn();
    if (result.revalidateLayout) revalidatePath("/app", "layout");
    return { ok: true, data: { message: result.message } };
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

/** IP, user agent and request id of the current request (for auth services that audit). */
export async function studentRequestMeta(): Promise<RequestMeta> {
  const context = await getRequestContext();
  return { ip: context.ip, userAgent: context.userAgent, requestId: context.requestId };
}
