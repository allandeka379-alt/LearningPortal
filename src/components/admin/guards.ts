import "server-only";
import { redirect } from "next/navigation";
import type { Actor } from "@/server/auth/actor";
import { requirePermissionForAction, requireRecentAuthForAction, requireRole } from "@/server/auth/guards";
import { hasPermission, type Permission, type PermissionScope } from "@/server/auth/permissions";
import { AppError } from "@/server/lib/errors";
import { ADMIN_HOME } from "./nav";

/**
 * Admin-console guards (CLAUDE.md rule 3). The admin layout admits staff only (`ADMIN_STAFF_ROLES` in ./nav); every page and Server Action then
 * re-checks ITS permission with these, including the scope ("all" by default, so an `own` / `restricted` grant —
 * a school admin's or an editor's — never unlocks a platform-wide page).
 */

/** Page guard: a signed-in staff member holding `permission` at `minScope`; others go to the admin dashboard. */
export async function requireAdminPage(permission?: Permission, options: { minScope?: PermissionScope; next?: string } = {}): Promise<Actor> {
  const actor = await requireRole("CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN", { next: options.next ?? ADMIN_HOME });
  if (permission && !hasPermission(actor, permission, options.minScope ?? "all")) redirect(ADMIN_HOME);
  return actor;
}

/** Server Action guard: throws UNAUTHENTICATED / FORBIDDEN (mapped to an ActionResult by `runAdminAction`). */
export async function requireAdminAction(permission: Permission, minScope: PermissionScope = "all"): Promise<Actor> {
  const actor = await requirePermissionForAction(permission);
  if (!hasPermission(actor, permission, minScope)) throw AppError.forbidden();
  return actor;
}

/**
 * Server Action guard for sensitive steps (role grants, kill switches…): as {@link requireAdminAction} plus a password
 * confirmation within the last 15 minutes (ARCHITECTURE §5.1 step-up). The REAUTH failure becomes the inline prompt.
 */
export async function requireAdminStepUpAction(permission: Permission, minScope: PermissionScope = "all"): Promise<Actor> {
  await requireAdminAction(permission, minScope);
  const actor = await requireRecentAuthForAction();
  if (!hasPermission(actor, permission, minScope)) throw AppError.forbidden();
  return actor;
}
