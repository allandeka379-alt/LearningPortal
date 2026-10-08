import "server-only";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { Actor } from "@/server/auth/actor";
import { requireRole, requireRoleForAction } from "@/server/auth/guards";
import { homePathFor } from "@/server/auth/redirects";
import { secureCookiesEnabled } from "@/server/auth/sessions";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { isAppError } from "@/server/lib/errors";
import { getRequestContext } from "@/server/lib/request";
import { isUuid, listAdministeredSchools, resolveSchoolAdmin, type SchoolContext } from "@/server/schools/access";

/**
 * Route-layer helpers of the school area (thin routes, CLAUDE.md rule 1). The CURRENT school of an admin of several
 * schools is a preference cookie (`dz_school`, httpOnly): it is never trusted, every page and action re-resolves it
 * with `resolveSchoolAdmin` (falling back to the first school the user administers), and every service re-checks the
 * membership again for the school id it is given.
 */

export const SCHOOL_COOKIE = "dz_school";

async function preferredSchoolId(): Promise<string | null> {
  const value = (await cookies()).get(SCHOOL_COOKIE)?.value;
  return isUuid(value) ? value : null;
}

async function resolveCurrent(actor: Actor): Promise<SchoolContext> {
  const preferred = await preferredSchoolId();
  if (preferred) {
    try {
      return await resolveSchoolAdmin(actor, preferred);
    } catch (error) {
      if (!isAppError(error) || error.code !== "FORBIDDEN") throw error;
    }
  }
  return resolveSchoolAdmin(actor);
}

export interface SchoolPageContext {
  actor: Actor;
  school: SchoolContext;
}

/** For pages: a signed-in SCHOOL_ADMIN and their current school (others are redirected to their own area). */
export async function requireSchoolPage(next: string): Promise<SchoolPageContext> {
  const actor = await requireRole("SCHOOL_ADMIN", { next });
  try {
    return { actor, school: await resolveCurrent(actor) };
  } catch (error) {
    if (isAppError(error) && error.code === "FORBIDDEN") redirect(homePathFor({ ...actor, roles: actor.roles.filter((role) => role !== "SCHOOL_ADMIN") }));
    throw error;
  }
}

/** For Server Actions: the signed-in SCHOOL_ADMIN and their current school id (FORBIDDEN otherwise). */
export async function requireSchoolAction(): Promise<{ actor: Actor; schoolId: string; school: SchoolContext }> {
  const actor = await requireRoleForAction("SCHOOL_ADMIN");
  const school = await resolveCurrent(actor);
  return { actor, schoolId: school.schoolId, school };
}

/** Schools the user administers (for the switcher). */
export function administeredSchools(actor: Actor): Promise<{ id: string; name: string }[]> {
  return listAdministeredSchools(actor);
}

/** Stores the current-school preference after checking the user administers it. */
export async function setCurrentSchool(actor: Actor, schoolId: string): Promise<void> {
  const school = await resolveSchoolAdmin(actor, schoolId);
  (await cookies()).set(SCHOOL_COOKIE, school.schoolId, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookiesEnabled(),
    path: "/",
    maxAge: 180 * 24 * 3600,
  });
}

/** Request id, IP and user agent for audit entries. */
export async function auditRequest(): Promise<AuditRequestInfo> {
  const context = await getRequestContext();
  return { requestId: context.requestId, ip: context.ip, userAgent: context.userAgent };
}

/** Runs a school-page read; a resource the admin may not see renders the 404 page (existence is never disclosed). */
export async function orNotFound<T>(load: Promise<T>): Promise<T> {
  try {
    return await load;
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "FORBIDDEN" || error.code === "VALIDATION")) notFound();
    throw error;
  }
}

/** The public sign-in URL printed on credential slips. */
export function signInUrl(appUrl: string): string {
  return new URL("/login", appUrl).toString();
}
