import type { Role } from "@/generated/prisma/client";
import { permissionScope } from "@/server/auth/permissions";
import { AppError } from "@/server/lib/errors";

/**
 * Who may do what in curriculum management (ARCHITECTURE §5.2 `curriculum.manage`, §3.3 admin route map):
 *
 * | Capability | Who | Covers |
 * |---|---|---|
 * | read  | CONTENT_EDITOR (restricted), ADMIN, SUPER_ADMIN | every list and detail page |
 * | draft | same | DRAFT syllabus versions (create/clone, topic tree, objectives, papers, routes, outline paste, re-tagging), DRAFT exam sessions, inactive grade schemes |
 * | admin | ADMIN, SUPER_ADMIN (`curriculum.manage` = all) | catalogue writes (countries, boards, levels, qualifications, year groups, categories, subjects), publishing / switching / archiving versions, publishing / confirming exam sessions, live grade schemes |
 *
 * Everyone else (students, parents, teachers, school admins) is FORBIDDEN. Pure: no I/O.
 */

/** The part of an `Actor` these services need (`Actor` from src/server/auth/actor is assignable). */
export interface CurriculumActor {
  kind: "user";
  userId: string;
  roles: readonly Role[];
}

export interface CurriculumAccess {
  canRead: boolean;
  canDraft: boolean;
  canAdmin: boolean;
}

export function curriculumAccess(actor: Pick<CurriculumActor, "roles">): CurriculumAccess {
  const scope = permissionScope(actor, "curriculum.manage");
  return { canRead: scope !== null, canDraft: scope !== null, canAdmin: scope === "all" };
}

export function assertCurriculumRead(actor: Pick<CurriculumActor, "roles">): void {
  if (!curriculumAccess(actor).canRead) throw AppError.forbidden();
}

export function assertCurriculumDraft(actor: Pick<CurriculumActor, "roles">): void {
  if (!curriculumAccess(actor).canDraft) throw AppError.forbidden();
}

export function assertCurriculumAdmin(actor: Pick<CurriculumActor, "roles">, message = "Only an admin can do this."): void {
  if (!curriculumAccess(actor).canAdmin) throw AppError.forbidden(message);
}
