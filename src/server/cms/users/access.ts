import "server-only";
import type { Role } from "@/generated/prisma/client";
import { hasPermission, type Permission, type PermissionScope } from "@/server/auth/permissions";
import type { InfraActor } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";

/**
 * The actor shape the CMS services need: a full `Actor` (src/server/auth/actor.ts) satisfies it, and tests can pass a
 * minimal object. Services never read cookies or headers (ARCHITECTURE §3.1).
 */
export interface CmsActor {
  kind: "user";
  userId: string;
  roles: readonly Role[];
  sessionId?: string | null;
}

/** The audit-layer view of a CMS actor. */
export function infraActor(actor: CmsActor): InfraActor {
  return { kind: "user", userId: actor.userId, roles: actor.roles };
}

/**
 * Service-boundary permission check (CLAUDE.md rule 3): throws FORBIDDEN unless `actor` holds `permission` at
 * `minScope` or broader. Admin console services require `"all"` for platform-wide operations so a school admin's
 * `own` grant can never reach another school's data through them.
 */
export function assertCmsPermission(actor: CmsActor, permission: Permission, minScope: PermissionScope = "all"): void {
  if (actor.kind !== "user" || !hasPermission(actor, permission, minScope)) throw AppError.forbidden();
}

/** Staff platform roles that only SUPER_ADMIN may act on (suspend, sign out, grant, revoke). */
export const PRIVILEGED_ROLES: readonly Role[] = ["ADMIN", "SUPER_ADMIN"];

export function isSuperAdmin(actor: Pick<CmsActor, "roles">): boolean {
  return actor.roles.includes("SUPER_ADMIN");
}
