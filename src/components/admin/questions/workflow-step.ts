import "server-only";
import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction, type AdminActionSuccess } from "@/components/admin/server-action";
import type { Actor } from "@/server/auth/actor";
import type { Permission } from "@/server/auth/permissions";
import type { CmsContext } from "@/server/cms/questions/context";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Route-layer plumbing shared by the question, assessment and study-pack Server Actions (thin routes, rule 1): every
 * action re-checks its permission with the `*ForAction` guard, hands the raw form values to a service (which validates
 * with Zod, calls the publish helper and audits) and returns an `ActionResult` through `runAdminAction`.
 */

export interface StepInput {
  id: string | undefined;
  notes: string | undefined;
  changeNote: string | undefined;
}

/** Audit request metadata of the current request. */
export async function cmsContext(): Promise<CmsContext> {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

/** Runs a workflow step (`submit`, `approve`, `publish`…) from a confirm dialog's form. */
export function workflowStep<T>(
  operation: string,
  formData: FormData,
  permission: Permission,
  run: (actor: Actor, input: StepInput, context: CmsContext) => Promise<T>,
  done: (result: T, id: string) => Omit<AdminActionSuccess<T>, "data">,
): Promise<AdminActionState<T>> {
  return runAdminAction(operation, formData, async () => {
    const actor = await requireAdminAction(permission);
    const input = { id: formText(formData, "id"), notes: formText(formData, "notes"), changeNote: formText(formData, "changeNote") };
    const result = await run(actor, input, await cmsContext());
    return { data: result, ...done(result, input.id ?? "") };
  });
}

/** Parses a JSON document posted in a hidden field (malformed JSON → undefined, which the service reports). */
export function jsonField(formData: FormData, name: string): unknown {
  const raw = formData.get(name);
  if (typeof raw !== "string" || raw.length > 2_000_000) return undefined;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
}
