import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Role } from "@/generated/prisma/client";
import { AppError } from "@/server/lib/errors";
import { REQUEST_PATH_HEADER } from "@/server/lib/request-path";
import { actorFromSession, assertPasswordSettled, getActor, type Actor } from "./actor";
import { hasPermission, type Permission } from "./permissions";
import { changePasswordPathWithNext, homePathFor, loginPathWithNext, onboardingPathWithNext } from "./redirects";
import { authenticateRequest, type RequestAuth } from "./request-auth";
import { getCurrentSession, isRecentlyAuthenticated } from "./sessions";

/**
 * Route guards (CLAUDE.md rule 3, ARCHITECTURE §3.1 step 2-3). Three flavours with the same checks:
 *
 * | Flavour            | Use in                         | On failure                                              |
 * |--------------------|--------------------------------|---------------------------------------------------------|
 * | `require*`         | Server Components, layouts     | redirect: `/login?next=…`, the user's home, `/onboarding` |
 * | `require*ForAction`| Server Actions (inside safeAction) | throw AppError UNAUTHENTICATED / FORBIDDEN          |
 * | `require*ForApi`   | Route Handlers (`Request` in)  | throw AppError (bearer token or same-origin cookie)     |
 *
 * Guards are coarse (role / permission). Services still apply the resource checks in ./rbac.
 *
 * Every flavour also enforces `Actor.passwordMustChange` (a school-set password, read with the session user, so the
 * check costs nothing): pages redirect to `/change-password?next=…`, actions and API calls get FORBIDDEN with
 * `details.reason = "password_change_required"`. Only the change-password page and its action skip it.
 */

export { assertPasswordSettled, PASSWORD_CHANGE_REQUIRED_MESSAGE } from "./actor";

export interface PageGuardOptions {
  /**
   * Path to come back to after signing in, a forced password change or onboarding (validated again downstream). Pass
   * the current page's path. When omitted (layouts), the requested page's path forwarded by `src/proxy.ts` is used;
   * `null` means "no next".
   */
  next?: string | null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Pages (redirect)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * The `next` for a redirect: the explicit option, else the requested page (header set by the proxy). Layouts and pages
 * render in parallel, so a layout's guard often redirects first and must not drop the page the user was opening.
 * Outside a request (scripts, tests) there is no header: no `next`.
 */
async function nextFor(options: PageGuardOptions): Promise<string | null> {
  if (options.next !== undefined) return options.next;
  try {
    return (await headers()).get(REQUEST_PATH_HEADER);
  } catch {
    return null;
  }
}

/**
 * The signed-in user, or a redirect to `/login?next=…`. A user who must replace a school-set password goes to
 * `/change-password?next=…` first.
 */
export async function requireUser(options: PageGuardOptions = {}): Promise<Actor> {
  const actor = await getActor();
  if (actor === null) redirect(loginPathWithNext(await nextFor(options)));
  if (actor.passwordMustChange === true) redirect(changePasswordPathWithNext(await nextFor(options)));
  return actor;
}

/** Arguments of {@link requireRole}: one or more roles, optionally followed by page options. */
export type RoleGuardArgs = [...roles: Role[]] | [...roles: Role[], options: PageGuardOptions];

function splitRoleArgs(args: RoleGuardArgs): { roles: Role[]; options: PageGuardOptions } {
  const last = args[args.length - 1];
  if (last !== undefined && typeof last === "object") return { roles: args.slice(0, -1) as Role[], options: last };
  return { roles: args as Role[], options: {} };
}

/**
 * A signed-in user holding at least one of `roles` (effective roles, so SCHOOL_ADMIN counts). Users without the role
 * are sent to their own home area (never a 403 page loop).
 *
 * @example await requireRole("TEACHER", "SCHOOL_ADMIN");
 * @example await requireRole("PARENT", { next: "/parent/children" });
 */
export async function requireRole(...args: RoleGuardArgs): Promise<Actor> {
  const { roles, options } = splitRoleArgs(args);
  const actor = await requireUser(options);
  if (!roles.some((role) => actor.roles.includes(role))) redirect(homePathFor(actor));
  return actor;
}

/** A signed-in user with `permission` (any scope); others go to their home area. */
export async function requirePermission(permission: Permission, options: PageGuardOptions = {}): Promise<Actor> {
  const actor = await requireUser(options);
  if (!hasPermission(actor, permission)) redirect(homePathFor(actor));
  return actor;
}

/**
 * A student who has finished onboarding (the `/app` area). Students mid-wizard go to `/onboarding`, which continues
 * to `options.next` (validated) once they finish.
 */
export async function requireOnboardedStudent(options: PageGuardOptions = {}): Promise<Actor> {
  const actor = await requireRole("STUDENT", options);
  if (actor.studentOnboardingCompleted !== true) redirect(onboardingPathWithNext(await nextFor(options)));
  return actor;
}

// ---------------------------------------------------------------------------------------------------------------------
// Pure checks shared by the action / API flavours
// ---------------------------------------------------------------------------------------------------------------------

/** Throws FORBIDDEN unless `actor` holds one of `roles`. */
export function assertRole(actor: Pick<Actor, "roles">, ...roles: Role[]): void {
  if (!roles.some((role) => actor.roles.includes(role))) throw AppError.forbidden();
}

/** Throws FORBIDDEN unless `actor` holds `permission`. */
export function assertActorPermission(actor: Pick<Actor, "roles">, permission: Permission): void {
  if (!hasPermission(actor, permission)) throw AppError.forbidden();
}

/** Throws FORBIDDEN unless `actor` is a student who completed onboarding. */
export function assertOnboardedStudent(actor: Pick<Actor, "roles" | "studentOnboardingCompleted">): void {
  assertRole(actor, "STUDENT");
  if (actor.studentOnboardingCompleted !== true) {
    throw new AppError("FORBIDDEN", "Finish setting up your account first.");
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Server Actions (throw)
// ---------------------------------------------------------------------------------------------------------------------

/** The signed-in user or `AppError("UNAUTHENTICATED")` (FORBIDDEN while a school-set password must be changed). */
export async function requireUserForAction(): Promise<Actor> {
  const actor = await getActor();
  if (actor === null) throw AppError.unauthenticated();
  assertPasswordSettled(actor);
  return actor;
}

/** @example await requireRoleForAction("TEACHER", "SCHOOL_ADMIN"); */
export async function requireRoleForAction(...roles: Role[]): Promise<Actor> {
  const actor = await requireUserForAction();
  assertRole(actor, ...roles);
  return actor;
}

export async function requirePermissionForAction(permission: Permission): Promise<Actor> {
  const actor = await requireUserForAction();
  assertActorPermission(actor, permission);
  return actor;
}

export async function requireOnboardedStudentForAction(): Promise<Actor> {
  const actor = await requireUserForAction();
  assertOnboardedStudent(actor);
  return actor;
}

/** Message of the FORBIDDEN error thrown when a sensitive action needs a fresh password confirmation. */
export const REAUTH_REQUIRED_MESSAGE = "For your security, please confirm your password to continue.";

/**
 * Step-up guard for sensitive Server Actions (role grants, refunds, settings, kill switches, break-glass;
 * ARCHITECTURE §5.1): the current session must have been authenticated or re-authenticated
 * (`reauthenticateWithPassword`) within the last 15 minutes. Otherwise FORBIDDEN with
 * {@link REAUTH_REQUIRED_MESSAGE} and `details.reason = "reauth_required"` (logs only).
 */
export async function requireRecentAuthForAction(): Promise<Actor> {
  const validated = await getCurrentSession();
  if (validated === null) throw AppError.unauthenticated();
  if (!isRecentlyAuthenticated(validated.session)) {
    throw new AppError("FORBIDDEN", REAUTH_REQUIRED_MESSAGE, { details: { reason: "reauth_required" } });
  }
  const actor = actorFromSession(validated, "web");
  assertPasswordSettled(actor);
  return actor;
}

// ---------------------------------------------------------------------------------------------------------------------
// Route Handlers (throw; bearer token or same-origin cookie)
// ---------------------------------------------------------------------------------------------------------------------

/** The caller of a Route Handler (see ./request-auth) or `AppError("UNAUTHENTICATED")`. */
export async function requireUserForApi(request: Request): Promise<RequestAuth> {
  const auth = await authenticateRequest(request);
  if (auth === null) throw AppError.unauthenticated();
  assertPasswordSettled(auth.actor);
  return auth;
}

/** @example const { actor } = await requireRoleForApi(request, "TEACHER", "SCHOOL_ADMIN"); */
export async function requireRoleForApi(request: Request, ...roles: Role[]): Promise<RequestAuth> {
  const auth = await requireUserForApi(request);
  assertRole(auth.actor, ...roles);
  return auth;
}

export async function requirePermissionForApi(request: Request, permission: Permission): Promise<RequestAuth> {
  const auth = await requireUserForApi(request);
  assertActorPermission(auth.actor, permission);
  return auth;
}

export async function requireOnboardedStudentForApi(request: Request): Promise<RequestAuth> {
  const auth = await requireUserForApi(request);
  assertOnboardedStudent(auth.actor);
  return auth;
}
