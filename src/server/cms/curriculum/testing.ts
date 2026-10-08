/**
 * Helpers for the curriculum CMS integration tests (not used by application code). Every helper creates its own
 * uniquely named rows (tests run in parallel against one shared, never-truncated database).
 */
import type { AuditLog, Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { createStudent, createUser, type PlatformRole } from "../../../../tests/factories/index";
import type { CurriculumActor } from "./access";
import type { ServiceContext } from "./shared";

/** Actor shape the services take, for an existing user id. */
export function actorFor(userId: string, roles: readonly Role[]): CurriculumActor {
  return { kind: "user", userId, roles };
}

/** A staff user (CONTENT_EDITOR, ADMIN or SUPER_ADMIN) and their actor. */
export async function staffActor(role: Extract<PlatformRole, "CONTENT_EDITOR" | "ADMIN" | "SUPER_ADMIN">): Promise<CurriculumActor> {
  const { user } = await createUser({ roles: [role] });
  return actorFor(user.id, [role]);
}

/** A student (no curriculum permission at all). */
export async function studentActor(): Promise<CurriculumActor> {
  const { user } = await createStudent({ student: { isMinor: false } });
  return actorFor(user.id, ["STUDENT"]);
}

/** Audit rows written for one entity, oldest first. */
export function auditRowsFor(entityId: string): Promise<AuditLog[]> {
  return db.auditLog.findMany({ where: { entityId }, orderBy: { createdAt: "asc" } });
}

/** `metadata.operation` values of the audit rows of one entity. */
export async function auditOperations(entityId: string): Promise<string[]> {
  const rows = await auditRowsFor(entityId);
  return rows.map((row) => String((row.metadata as { operation?: unknown } | null)?.operation ?? ""));
}

/**
 * Runs `fn` inside a transaction with `app.four_eyes = 'on'` (the production default the test database does not set).
 * Services receive the transaction through `context.client`; a throw rolls everything back.
 */
export function withFourEyes<T>(fn: (context: ServiceContext) => Promise<T>): Promise<T> {
  return db.$transaction(async (tx: Tx) => {
    await tx.$queryRaw`SELECT set_config('app.four_eyes', 'on', true)`;
    return fn({ client: tx });
  });
}
