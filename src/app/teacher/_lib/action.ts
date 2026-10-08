import "server-only";
import type { Actor } from "@/server/auth/actor";
import { requireRoleForAction } from "@/server/auth/guards";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { getRequestContext } from "@/server/lib/request";

/**
 * Route-layer helpers for the teacher area's Server Actions (thin routes, CLAUDE.md rule 1): every action re-checks
 * the TEACHER role here, hands the raw form values to a service in src/server/teaching (which validates with Zod and
 * applies the resource checks) and returns an `AdminActionState` through `runAdminAction`
 * (src/components/admin/server-action.ts), so the shared form shells (`ActionForm`, `ConfirmAction`) work unchanged.
 */

/** The signed-in teacher (FORBIDDEN otherwise). */
export function requireTeacherForAction(): Promise<Actor> {
  return requireRoleForAction("TEACHER");
}

/** Request id, IP and user agent for audit entries. */
export async function auditRequest(): Promise<AuditRequestInfo> {
  const context = await getRequestContext();
  return { requestId: context.requestId, ip: context.ip, userAgent: context.userAgent };
}

/**
 * The submitted form as a plain object (strings). Fields listed in `multi` are arrays of every submitted value
 * (checkbox groups, multi-selects); framework fields (`$ACTION…`) are dropped.
 */
export function formObject(formData: FormData, multi: readonly string[] = []): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || key.startsWith("$ACTION")) continue;
    if (multi.includes(key)) out[key] = [...((out[key] as string[] | undefined) ?? []), value];
    else out[key] = value;
  }
  for (const key of multi) out[key] ??= [];
  return out;
}
