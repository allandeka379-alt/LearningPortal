import "server-only";

import type { Role } from "@/generated/prisma/client";
import { normalizeEmail } from "@/server/auth/identifiers";
import { revokeAllSessions } from "@/server/auth/sessions";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";

/** Pure: why the bootstrap must be refused, or null when it may proceed. */
export function bootstrapRefusal(input: {
  activeSuperAdmins: number;
  user: { status: string; emailVerifiedAt: Date | null } | null;
}): string | null {
  if (input.activeSuperAdmins > 0) return "A super admin already exists: grant roles from /admin/users instead.";
  if (!input.user) return "No account with this email: register on the site first.";
  if (input.user.status !== "ACTIVE") return "The account is not active.";
  if (!input.user.emailVerifiedAt) return "Verify the account's email address first.";
  return null;
}

/**
 * First-admin bootstrap for a fresh production database (docs/DEPLOYMENT.md "Appendix: Railway"): the owner registers
 * on the site like any user (email verified), then an operator runs `scripts/bootstrap-super-admin.ts` to grant that
 * account SUPER_ADMIN. Every later role change goes through /admin/users (grantStaffRole, step-up, audited).
 *
 * Refused once any ACTIVE super admin exists, so it can never be used to add a second one behind the admins' backs.
 * The grant revokes the user's sessions (staff session policy on next sign-in) and is audited as a system action.
 */
export async function bootstrapSuperAdmin(email: string): Promise<{ userId: string; roles: Role[] }> {
  const emailNormalized = normalizeEmail(email);
  if (!emailNormalized) throw AppError.validation({ email: ["Enter a valid email address."] }, "Enter a valid email address.");
  const [activeSuperAdmins, user] = await Promise.all([
    db.user.count({ where: { status: "ACTIVE", roles: { has: "SUPER_ADMIN" } } }),
    db.user.findUnique({ where: { emailNormalized }, select: { id: true, status: true, roles: true, emailVerifiedAt: true } }),
  ]);
  const refusal = bootstrapRefusal({ activeSuperAdmins, user });
  if (refusal || !user) throw AppError.conflict(refusal ?? "No account with this email.");

  const roles: Role[] = [...user.roles, "SUPER_ADMIN"];
  await db.$transaction(async (tx) => {
    const updated = await tx.user.updateMany({ where: { id: user.id, NOT: { roles: { has: "SUPER_ADMIN" } } }, data: { roles } });
    if (updated.count === 0) throw AppError.conflict("The account is already a super admin.");
    const sessionsRevoked = await revokeAllSessions(user.id, { reason: "role_changed", client: tx });
    await auditInTx(tx, {
      actorUserId: null,
      actorRoles: [],
      action: AUDIT_ACTIONS.ROLE_GRANT,
      entityType: "User",
      entityId: user.id,
      targetUserId: user.id,
      before: { roles: user.roles },
      after: { roles },
      metadata: { role: "SUPER_ADMIN", sessionsRevoked, bootstrap: true },
      reason: "First super admin (bootstrap script)",
    });
  });
  return { userId: user.id, roles };
}
