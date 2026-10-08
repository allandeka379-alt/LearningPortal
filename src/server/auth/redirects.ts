import type { Role } from "@/generated/prisma/client";

/**
 * Where to send people around authentication. Pure: no I/O.
 *
 * `?next=` values come from the URL and are attacker-controlled: {@link safeNextPath} only accepts app-relative paths
 * (a single leading "/", never "//" or "/\", no whitespace or control characters that browsers strip and re-read as
 * "//evil.example"), so a login link can never redirect off-site (open redirect).
 */

export const LOGIN_PATH = "/login";
export const ONBOARDING_PATH = "/onboarding";
/** Where users with a school-set password choose their own (`User.passwordMustChange`). */
export const CHANGE_PASSWORD_PATH = "/change-password";

/** Auth pages: never a post-login destination (it would loop or make no sense). */
export const AUTH_PAGE_PATHS: readonly string[] = ["/login", "/register", "/verify", "/forgot-password", "/reset-password", CHANGE_PASSWORD_PATH];

const MAX_NEXT_LENGTH = 2048;
const PROBE_ORIGIN = "http://next.invalid";

/** Returns `next` when it is a safe app-relative path (path + query + hash), otherwise `null`. */
export function safeNextPath(next: unknown): string | null {
  if (typeof next !== "string" || next.length === 0 || next.length > MAX_NEXT_LENGTH) return null;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return null;
  // Whitespace / control characters are stripped by browsers ("/\t/evil" becomes "//evil"); backslashes are read as
  // slashes. Neither belongs in our own paths.
  if (/[\u0000-\u001F\u007F\s\\]/.test(next)) return null;
  let url: URL;
  try {
    url = new URL(next, PROBE_ORIGIN);
  } catch {
    return null;
  }
  if (url.origin !== PROBE_ORIGIN) return null;
  if (AUTH_PAGE_PATHS.some((path) => url.pathname === path || url.pathname.startsWith(`${path}/`))) return null;
  if (url.pathname === "/api/auth" || url.pathname.startsWith("/api/auth/")) return null;
  return `${url.pathname}${url.search}${url.hash}`;
}

/** `/login`, with a validated `next` when given. */
export function loginPathWithNext(next?: string | null): string {
  const safe = safeNextPath(next);
  return safe === null ? LOGIN_PATH : `${LOGIN_PATH}?next=${encodeURIComponent(safe)}`;
}

/** `/change-password`, with a validated `next` (where to continue once the new password is saved). */
export function changePasswordPathWithNext(next?: string | null): string {
  const safe = safeNextPath(next);
  return safe === null ? CHANGE_PASSWORD_PATH : `${CHANGE_PASSWORD_PATH}?next=${encodeURIComponent(safe)}`;
}

function isOnboardingPath(path: string): boolean {
  return path === ONBOARDING_PATH || path.startsWith(`${ONBOARDING_PATH}/`) || path.startsWith(`${ONBOARDING_PATH}?`);
}

/** The student home itself (`/app`, no query): where the wizard goes anyway, so never a pending `next`. */
export const STUDENT_HOME_PATH = "/app";

/**
 * True for the bare student home. A `next` of `/app` only means "the app" (a bookmark, the proxy's sign-in redirect),
 * so it must not override the wizard's own finish choice (the diagnostic offer, §52 step 5).
 */
export function isStudentHomePath(path: string): boolean {
  return path === STUDENT_HOME_PATH || path === `${STUDENT_HOME_PATH}/`;
}

/**
 * `/onboarding`, carrying a validated `next` the wizard continues to once it is complete (e.g. an invitation link the
 * student opened before they had an account). A `next` inside the wizard itself, or the bare student home, is dropped.
 */
export function onboardingPathWithNext(next?: string | null): string {
  const safe = safeNextPath(next);
  return safe === null || isOnboardingPath(safe) || isStudentHomePath(safe) ? ONBOARDING_PATH : `${ONBOARDING_PATH}?next=${encodeURIComponent(safe)}`;
}

/** Minimal shape needed for routing (an `Actor` satisfies it). */
export interface RoutingSubject {
  roles: readonly Role[];
  /** `null` when the user has no Student row. */
  studentOnboardingCompleted: boolean | null;
  /** The user must replace a school-set password before anything else (see {@link postLoginPath}). */
  passwordMustChange?: boolean;
}

/**
 * Home area for a user. With several roles the most privileged working area wins:
 * staff → `/admin`, school admin → `/school`, teacher → `/teacher`, parent → `/parent`, student → `/app`
 * (or `/onboarding` while the student wizard is incomplete). A user with no role lands on `/`.
 */
export function homePathFor(subject: RoutingSubject): string {
  const roles = subject.roles;
  if (roles.includes("SUPER_ADMIN") || roles.includes("ADMIN") || roles.includes("CONTENT_EDITOR")) return "/admin";
  if (roles.includes("SCHOOL_ADMIN")) return "/school";
  if (roles.includes("TEACHER")) return "/teacher";
  if (roles.includes("PARENT")) return "/parent";
  if (roles.includes("STUDENT")) return subject.studentOnboardingCompleted === true ? "/app" : ONBOARDING_PATH;
  return "/";
}

/**
 * Destination after a successful sign-in: a user with a school-set password first goes to `/change-password` (keeping
 * a safe `next` for afterwards); a student who still has to finish onboarding always goes to `/onboarding` (a `next`
 * into the wizard is honoured, any other safe `next` is carried through it as `?next=`); everyone else goes to a safe
 * `next`, or their home area.
 */
export function postLoginPath(subject: RoutingSubject, next?: string | null): string {
  const safe = safeNextPath(next);
  if (subject.passwordMustChange === true) return changePasswordPathWithNext(safe);
  const home = homePathFor(subject);
  if (home === ONBOARDING_PATH) {
    return safe !== null && isOnboardingPath(safe) ? safe : onboardingPathWithNext(safe);
  }
  return safe ?? home;
}
