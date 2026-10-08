import "server-only";
import { notFound } from "next/navigation";
import { z } from "zod";
import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, runAdminAction, type AdminActionSuccess } from "@/components/admin/server-action";
import type { Actor } from "@/server/auth/actor";
import { formDataToObject, type ServiceContext } from "@/server/cms/curriculum";
import { isAppError } from "@/server/lib/errors";

/**
 * Route-layer plumbing for the curriculum admin pages and Server Actions (thin routes, CLAUDE.md rule 1). Business
 * logic stays in src/server/cms/curriculum; this only resolves the actor, request metadata and 404s.
 */

/** `curriculum.manage` scope an action needs: "draft" (CONTENT_EDITOR and up) or "admin" (ADMIN and up). */
export type CurriculumScope = "draft" | "admin";

/**
 * Runs a curriculum Server Action: (1) re-checks `curriculum.manage` at the given scope, (2-4) hands the parsed form
 * (FormData → object; the service validates with Zod and audits) and the request metadata to `fn`, (5) returns the
 * admin ActionResult state (messages, field errors, re-fill values, revalidation).
 */
export function curriculumAction<T>(
  operation: string,
  formData: FormData | null,
  scope: CurriculumScope,
  fn: (actor: Actor, input: Record<string, unknown>, context: ServiceContext) => Promise<AdminActionSuccess<T>>,
): Promise<AdminActionState<T>> {
  return runAdminAction(operation, formData, async () => {
    const actor = await requireAdminAction("curriculum.manage", scope === "admin" ? "all" : "restricted");
    const meta = await adminRequestMeta();
    const context: ServiceContext = { request: { requestId: meta.requestId ?? null, ip: meta.ip, userAgent: meta.userAgent } };
    return fn(actor, formData ? formDataToObject(formData) : {}, context);
  });
}

/** A route `[id]` param that must be a UUID; anything else is a 404 (never a database error). */
export function uuidParamOrNotFound(value: string): string {
  if (!z.uuid().safeParse(value).success) notFound();
  return value;
}

/** Awaits a service read and turns its NOT_FOUND AppError into the admin 404 page. */
export async function orNotFound<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}
