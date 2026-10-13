import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { Role } from "@/generated/prisma/client";
import { normalizeEmail } from "@/server/auth/identifiers";
import { sendSecurityNotice } from "@/server/auth/notices";
import { revokeAllSessions } from "@/server/auth/sessions";
import { createStaffUser, grantStaffRole } from "@/server/cms/users/service";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { allocatePublicHandle, issueTemporaryPassword } from "@/server/schools/credentials";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TOKEN_SHA256 = "bffc54c9c10e933718a90319c8210de6b43344c32425b1181727b27164388e07";
const OWNER_EMAIL = "vhurudzaicomfort@gmail.com";
const ADMIN_EMAIL = "comfort.vhurudzai@monodigital.net";
const REASON = "Owner requested first back-office access";

function tokenMatches(token: string | null): boolean {
  if (!token) return false;
  const actual = createHash("sha256").update(token).digest();
  const expected = Buffer.from(TOKEN_SHA256, "hex");
  return actual.byteLength === expected.byteLength && timingSafeEqual(actual, expected);
}

function roleSet(roles: readonly Role[], role: Role): Role[] {
  return [...new Set([...roles, role])];
}

async function ensureFirstSuperAdmin(): Promise<{ userId: string; roles: Role[]; temporaryPassword: string | null; created: boolean }> {
  const emailNormalized = normalizeEmail(OWNER_EMAIL);
  if (!emailNormalized) throw new Error("Invalid owner email.");

  const existing = await db.user.findUnique({
    where: { emailNormalized },
    select: { id: true, roles: true, status: true, emailVerifiedAt: true, profile: { select: { userId: true } } },
  });
  if (existing?.status === "ACTIVE" && existing.roles.includes("SUPER_ADMIN")) {
    return { userId: existing.id, roles: existing.roles, temporaryPassword: null, created: false };
  }

  const activeSuperAdmins = await db.user.count({ where: { status: "ACTIVE", roles: { has: "SUPER_ADMIN" } } });
  if (activeSuperAdmins > 0) {
    throw AppError.conflict("A super admin already exists. Use /admin/users to create more admin accounts.");
  }

  const now = new Date();
  if (existing) {
    const roles = roleSet(existing.roles, "SUPER_ADMIN");
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: existing.id },
        data: { roles, status: "ACTIVE", emailVerifiedAt: existing.emailVerifiedAt ?? now },
        select: { id: true },
      });
      await tx.profile.upsert({
        where: { userId: existing.id },
        update: {},
        create: {
          userId: existing.id,
          username: await allocatePublicHandle(tx),
          firstName: "Comfort",
          lastName: "Vhurudzai",
          displayName: "Comfort",
        },
      });
      const sessionsRevoked = await revokeAllSessions(existing.id, { reason: "role_changed", client: tx });
      await auditInTx(tx, {
        actorUserId: null,
        actorRoles: [],
        action: AUDIT_ACTIONS.ROLE_GRANT,
        entityType: "User",
        entityId: existing.id,
        targetUserId: existing.id,
        before: { roles: existing.roles },
        after: { roles },
        metadata: { role: "SUPER_ADMIN", sessionsRevoked, bootstrap: true, operation: "owner_bootstrap" },
        reason: REASON,
      });
    });
    return { userId: existing.id, roles, temporaryPassword: null, created: false };
  }

  const { password, passwordHash } = await issueTemporaryPassword();
  const created = await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        emailNormalized,
        emailVerifiedAt: now,
        passwordHash,
        passwordUpdatedAt: now,
        passwordMustChange: true,
        roles: ["SUPER_ADMIN"],
        status: "ACTIVE",
        signupChannel: "WEB",
      },
      select: { id: true, roles: true },
    });
    await tx.profile.create({
      data: {
        userId: user.id,
        username: await allocatePublicHandle(tx),
        firstName: "Comfort",
        lastName: "Vhurudzai",
        displayName: "Comfort",
      },
    });
    await auditInTx(tx, {
      actorUserId: null,
      actorRoles: [],
      action: AUDIT_ACTIONS.USER_CREATE,
      entityType: "User",
      entityId: user.id,
      targetUserId: user.id,
      after: { email: emailNormalized, roles: user.roles, passwordMustChange: true },
      metadata: { operation: "owner_bootstrap" },
      reason: REASON,
    });
    await auditInTx(tx, {
      actorUserId: null,
      actorRoles: [],
      action: AUDIT_ACTIONS.ROLE_GRANT,
      entityType: "User",
      entityId: user.id,
      targetUserId: user.id,
      before: { roles: [] },
      after: { roles: user.roles },
      metadata: { role: "SUPER_ADMIN", bootstrap: true, operation: "owner_bootstrap" },
      reason: REASON,
    });
    return user;
  });
  sendSecurityNotice({ kind: "temporary_password", to: emailNormalized });
  return { userId: created.id, roles: created.roles, temporaryPassword: password, created: true };
}

async function ensureAdminAccount(actor: { kind: "user"; userId: string; roles: readonly Role[] }) {
  const emailNormalized = normalizeEmail(ADMIN_EMAIL);
  if (!emailNormalized) throw new Error("Invalid admin email.");

  const existing = await db.user.findUnique({ where: { emailNormalized }, select: { id: true, roles: true } });
  if (existing) {
    if (existing.roles.includes("ADMIN") || existing.roles.includes("SUPER_ADMIN")) {
      return { email: emailNormalized, roles: existing.roles, temporaryPassword: null, created: false, changed: false };
    }
    const result = await grantStaffRole(actor, { userId: existing.id, role: "ADMIN", reason: REASON });
    return { email: emailNormalized, roles: result.roles, temporaryPassword: null, created: false, changed: true };
  }

  const result = await createStaffUser(actor, {
    firstName: "Comfort",
    lastName: "Vhurudzai",
    email: emailNormalized,
    role: "ADMIN",
    reason: REASON,
  });
  return { email: result.signInWith, roles: result.roles, temporaryPassword: result.temporaryPassword, created: true, changed: true };
}

export async function POST(request: Request): Promise<Response> {
  if (!tokenMatches(request.headers.get("x-owner-bootstrap-token"))) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const owner = await ensureFirstSuperAdmin();
  const admin = await ensureAdminAccount({ kind: "user", userId: owner.userId, roles: owner.roles });
  return NextResponse.json({ ok: true, owner: { email: OWNER_EMAIL, ...owner }, admin });
}
