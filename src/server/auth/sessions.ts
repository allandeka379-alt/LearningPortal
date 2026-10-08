import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import type { AuthMethod, Prisma, Role, SchoolMemberRole, SessionKind, UserStatus } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { hashIp, randomToken, sha256Hex } from "@/server/lib/crypto";
import { getEnv } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { authCookieOptions, isSecureOrigin, sessionCookieName, sessionCookieOptions } from "./cookies";
import { loadPreferenceCookies, preferenceCookieOptions } from "./display-preferences";
import {
  evaluateSession,
  hasRecentAuthentication,
  initialSessionExpiry,
  OPERATING_SCHOOL_STATUSES,
  planSessionTouch,
  REAUTH_WINDOW_MS,
  sessionLifetime,
  shouldRecordUserActivity,
} from "./session-policy";

/**
 * Database-backed sessions (§33, §39, ARCHITECTURE §5.1). One `Session` table serves web cookies (kind WEB), bearer
 * tokens for `/api/v1` (kind API, prefixed `dz_` so secret scanners catch leaks) and WhatsApp (kind WHATSAPP).
 *
 * - Tokens are 32 random bytes (base64url). Only `SHA-256(token)` is stored, so a database leak yields no usable
 *   tokens.
 * - Sliding idle expiry + absolute cap (./session-policy); `lastSeenAt` is written at most every 5 minutes.
 * - Sessions created before the user's last password change, or whose user is suspended / deleted, are refused.
 * - Rotated on login (always a fresh token) and on privilege change ({@link rotateSession}).
 *
 * Cookie helpers ({@link setSessionCookie}, {@link clearSessionCookie}) only work in Server Actions and Route
 * Handlers; Server Components may only read ({@link getCurrentSession}).
 */

export const API_TOKEN_PREFIX = "dz_";
const TOKEN_BYTES = 32;
/** base64url of 32 bytes is 43 characters; API tokens carry the `dz_` prefix. */
const TOKEN_PATTERN = /^(?:dz_)?[A-Za-z0-9_-]{43}$/;

/** Client metadata recorded on sessions and audit entries. Raw IPs are hashed before storage. */
export interface RequestMeta {
  ip: string | null;
  userAgent: string | null;
  requestId?: string | null;
  /** Sealed remembered-device token from the browser (./device-trust), when the channel has one. */
  deviceToken?: string | null;
}

/** Session columns exposed to callers (never the token hash). */
export interface SessionInfo {
  id: string;
  userId: string;
  kind: SessionKind;
  authMethod: AuthMethod;
  label: string | null;
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
  absoluteExpiresAt: Date | null;
  reauthenticatedAt: Date | null;
}

/** The user facts loaded with every session validation (enough to build an `Actor` without another query). */
export interface SessionUser {
  id: string;
  status: UserStatus;
  roles: Role[];
  passwordUpdatedAt: Date | null;
  /** The password was set by a school (roster import / reset): the user must choose their own first. */
  passwordMustChange?: boolean;
  lastActiveAt: Date | null;
  profile: { displayName: string | null; firstName: string | null; username: string | null; timezone: string } | null;
  student: { onboardingCompletedAt: Date | null } | null;
  /** ACTIVE school memberships only. */
  schoolMemberships: { schoolId: string; role: SchoolMemberRole }[];
}

export interface ValidatedSession {
  session: SessionInfo;
  user: SessionUser;
}

const SESSION_INFO_SELECT = {
  id: true,
  userId: true,
  kind: true,
  authMethod: true,
  label: true,
  createdAt: true,
  lastSeenAt: true,
  expiresAt: true,
  absoluteExpiresAt: true,
  reauthenticatedAt: true,
} satisfies Prisma.SessionSelect;

const SESSION_USER_SELECT = {
  id: true,
  status: true,
  roles: true,
  passwordUpdatedAt: true,
  passwordMustChange: true,
  lastActiveAt: true,
  profile: { select: { displayName: true, firstName: true, username: true, timezone: true } },
  student: { select: { onboardingCompletedAt: true } },
  schoolMemberships: {
    where: { status: "ACTIVE", school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } },
    select: { schoolId: true, role: true },
  },
} satisfies Prisma.UserSelect;

/** True when `token` has the shape of one of our session tokens (cheap pre-check before hashing / querying). */
export function isWellFormedSessionToken(token: string | null | undefined): token is string {
  return typeof token === "string" && TOKEN_PATTERN.test(token);
}

/** Short device label for the device list, e.g. "Chrome on Android". Never contains version numbers or ids. */
export function deviceLabel(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null;
  const ua = userAgent;
  const os = /Android/i.test(ua)
    ? "Android"
    : /iPhone|iPad|iPod/i.test(ua)
      ? "iOS"
      : /Windows/i.test(ua)
        ? "Windows"
        : /Mac OS X|Macintosh/i.test(ua)
          ? "macOS"
          : /CrOS/i.test(ua)
            ? "ChromeOS"
            : /Linux/i.test(ua)
              ? "Linux"
              : null;
  const browser = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\/|Opera/i.test(ua)
      ? "Opera"
      : /SamsungBrowser/i.test(ua)
        ? "Samsung Internet"
        : /Firefox\//i.test(ua)
          ? "Firefox"
          : /Chrome\//i.test(ua)
            ? "Chrome"
            : /Safari\//i.test(ua)
              ? "Safari"
              : null;
  if (browser && os) return `${browser} on ${os}`;
  return browser ?? os ?? null;
}

function truncate(value: string | null | undefined, max: number): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export interface CreateSessionOptions {
  authMethod: AuthMethod;
  /** Device / token name; defaults to a label derived from the user agent. */
  label?: string | null;
  /** The user's platform roles, when already loaded (otherwise read from the database). */
  roles?: readonly Role[];
  client?: DbClient;
  now?: Date;
}

/**
 * Creates a session and returns the RAW token (shown once: put it in the cookie or the API response) and the row.
 * The session counts as freshly authenticated for step-up purposes.
 */
export async function createSession(
  userId: string,
  kind: SessionKind,
  request: RequestMeta,
  options: CreateSessionOptions,
): Promise<{ token: string; session: SessionInfo }> {
  const client = options.client ?? db;
  const now = options.now ?? new Date();
  const roles =
    options.roles ?? (await client.user.findUnique({ where: { id: userId }, select: { roles: true } }))?.roles ?? [];
  const { expiresAt, absoluteExpiresAt } = initialSessionExpiry(sessionLifetime(kind, roles), now);
  const token = `${kind === "API" ? API_TOKEN_PREFIX : ""}${randomToken(TOKEN_BYTES)}`;
  const ip = request.ip?.trim();
  const session = await client.session.create({
    data: {
      tokenHash: sha256Hex(token),
      userId,
      kind,
      authMethod: options.authMethod,
      label: truncate(options.label ?? deviceLabel(request.userAgent), 100),
      createdAt: now,
      lastSeenAt: now,
      expiresAt,
      absoluteExpiresAt,
      reauthenticatedAt: now,
      userAgent: truncate(request.userAgent, 512),
      ipHash: ip ? hashIp(ip) : null,
    },
    select: SESSION_INFO_SELECT,
  });
  return { token, session };
}

export interface ValidateSessionOptions {
  /** Accept only these session kinds (e.g. WEB for cookies, API for bearer tokens). */
  kind?: SessionKind | readonly SessionKind[];
  now?: Date;
}

/**
 * Looks up a session by raw token and returns it with its user when valid; `null` otherwise (unknown, revoked,
 * expired, wrong kind, user not active, created before a password change). Extends the sliding expiry (throttled).
 */
export async function validateSessionToken(
  token: string | null | undefined,
  options: ValidateSessionOptions = {},
): Promise<ValidatedSession | null> {
  if (!isWellFormedSessionToken(token)) return null;
  const now = options.now ?? new Date();
  const row = await db.session.findUnique({
    where: { tokenHash: sha256Hex(token) },
    select: { ...SESSION_INFO_SELECT, revokedAt: true, user: { select: SESSION_USER_SELECT } },
  });
  if (!row) return null;
  const kinds = options.kind === undefined ? null : Array.isArray(options.kind) ? options.kind : [options.kind];
  if (kinds !== null && !kinds.includes(row.kind)) return null;

  const verdict = evaluateSession(
    {
      kind: row.kind,
      createdAt: row.createdAt,
      lastSeenAt: row.lastSeenAt,
      expiresAt: row.expiresAt,
      absoluteExpiresAt: row.absoluteExpiresAt,
      revokedAt: row.revokedAt,
      user: row.user,
    },
    now,
  );
  if (!verdict.valid) return null;

  const { user } = row;
  const session: SessionInfo = {
    id: row.id,
    userId: row.userId,
    kind: row.kind,
    authMethod: row.authMethod,
    label: row.label,
    createdAt: row.createdAt,
    lastSeenAt: row.lastSeenAt,
    expiresAt: row.expiresAt,
    absoluteExpiresAt: row.absoluteExpiresAt,
    reauthenticatedAt: row.reauthenticatedAt,
  };
  const touch = planSessionTouch(row, verdict.lifetime, now);
  try {
    if (touch) {
      await db.session.updateMany({ where: { id: row.id, revokedAt: null }, data: touch });
      session.lastSeenAt = touch.lastSeenAt;
      session.expiresAt = touch.expiresAt;
    }
    if (shouldRecordUserActivity(user.lastActiveAt, now)) {
      await db.user.update({ where: { id: user.id }, data: { lastActiveAt: now }, select: { id: true } });
      user.lastActiveAt = now;
    }
  } catch (error) {
    // Bookkeeping only: never fail a request because the touch could not be written.
    logger.warn("session touch failed", { sessionId: row.id, err: error });
  }
  return { session, user };
}

/** Revokes one session. Returns `true` when it was active. */
export async function revokeSession(sessionId: string, reason = "logout", client: DbClient = db): Promise<boolean> {
  const result = await client.session.updateMany({
    where: { id: sessionId, revokedAt: null },
    data: { revokedAt: new Date(), revokedReason: reason.slice(0, 64) },
  });
  return result.count > 0;
}

/** Revokes the session a raw token belongs to (logout of a bearer token). Returns the session id when revoked. */
export async function revokeSessionByToken(token: string, reason = "logout"): Promise<string | null> {
  if (!isWellFormedSessionToken(token)) return null;
  const row = await db.session.findUnique({ where: { tokenHash: sha256Hex(token) }, select: { id: true } });
  if (!row) return null;
  return (await revokeSession(row.id, reason)) ? row.id : null;
}

/**
 * Revokes every active session of a user ("log out everywhere", password reset, suspension, role change), optionally
 * keeping the current one. Returns the number revoked.
 */
export async function revokeAllSessions(
  userId: string,
  options: { exceptSessionId?: string | null; reason?: string; client?: DbClient } = {},
): Promise<number> {
  const client = options.client ?? db;
  const result = await client.session.updateMany({
    where: {
      userId,
      revokedAt: null,
      ...(options.exceptSessionId ? { id: { not: options.exceptSessionId } } : {}),
    },
    data: { revokedAt: new Date(), revokedReason: (options.reason ?? "logout_all").slice(0, 64) },
  });
  return result.count;
}

/**
 * Replaces a session with a fresh token (same user, kind, auth method and label) and revokes the old one, atomically.
 * Call after a privilege change of the CURRENT user (then set the new cookie); for other users whose roles changed,
 * use {@link revokeAllSessions} with reason "role_changed". Returns `null` when the old session is not active.
 */
export async function rotateSession(
  sessionId: string,
  request: RequestMeta,
): Promise<{ token: string; session: SessionInfo } | null> {
  return db.$transaction(async (tx) => {
    const old = await tx.session.findFirst({
      where: { id: sessionId, revokedAt: null },
      select: { userId: true, kind: true, authMethod: true, label: true, reauthenticatedAt: true },
    });
    if (!old) return null;
    if (!(await revokeSession(sessionId, "rotated", tx))) return null;
    const created = await createSession(old.userId, old.kind, request, {
      authMethod: old.authMethod,
      label: old.label,
      client: tx,
    });
    return created;
  });
}

/** Records a successful re-authentication (step-up, ARCHITECTURE §5.1). */
export async function markSessionReauthenticated(sessionId: string, now: Date = new Date()): Promise<void> {
  await db.session.updateMany({ where: { id: sessionId, revokedAt: null }, data: { reauthenticatedAt: now } });
}

/** True when the session was authenticated within the step-up window (default 15 minutes). */
export function isRecentlyAuthenticated(
  session: Pick<SessionInfo, "createdAt" | "reauthenticatedAt">,
  now: Date = new Date(),
  windowMs: number = REAUTH_WINDOW_MS,
): boolean {
  return hasRecentAuthentication(session, now, windowMs);
}

/** A row of the "your devices" list. */
export interface SessionListItem {
  id: string;
  kind: SessionKind;
  authMethod: AuthMethod;
  label: string | null;
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
}

/** Active sessions of a user, most recently used first (device list, §39). */
export async function listActiveSessions(userId: string, now: Date = new Date()): Promise<SessionListItem[]> {
  return db.session.findMany({
    where: { userId, revokedAt: null, expiresAt: { gt: now } },
    select: { id: true, kind: true, authMethod: true, label: true, createdAt: true, lastSeenAt: true, expiresAt: true },
    orderBy: { lastSeenAt: "desc" },
    take: 50,
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Cookies (Server Actions / Route Handlers for writes; Server Components may read)
// ---------------------------------------------------------------------------------------------------------------------

/** True when cookies must be `Secure` / `__Host-` (APP_URL is https). */
export function secureCookiesEnabled(): boolean {
  return isSecureOrigin(getEnv().APP_URL);
}

/** Name of the session cookie for this deployment. */
export function currentSessionCookieName(): string {
  return sessionCookieName(secureCookiesEnabled());
}

/** Raw session token from the request cookie, or `null`. */
export async function readSessionCookie(): Promise<string | null> {
  const value = (await cookies()).get(currentSessionCookieName())?.value;
  return value && value.length > 0 ? value : null;
}

/**
 * Sets the session cookie (lives until the session's absolute expiry). Server Actions / Route Handlers only. With the
 * session's `userId`, the account's saved display preferences (theme, text size) are written to this browser too, so a
 * sign-in on a new device looks right from the first page (./display-preferences).
 */
export async function setSessionCookie(
  token: string,
  session: Pick<SessionInfo, "expiresAt" | "absoluteExpiresAt"> & { userId?: string },
): Promise<void> {
  const secure = secureCookiesEnabled();
  const store = await cookies();
  store.set(sessionCookieName(secure), token, sessionCookieOptions(secure, session.absoluteExpiresAt ?? session.expiresAt));
  if (session.userId) {
    for (const preference of await loadPreferenceCookies(session.userId)) store.set(preference.name, preference.value, preferenceCookieOptions(secure));
  }
}

/**
 * Deletes the session cookie. Re-sends the full attribute set with Max-Age=0 (a bare delete would drop `Secure`, and
 * browsers ignore `__Host-` cookies set without it).
 */
export async function clearSessionCookie(): Promise<void> {
  const secure = secureCookiesEnabled();
  (await cookies()).set(sessionCookieName(secure), "", authCookieOptions(secure, 0));
}

/**
 * The current request's cookie session (kind WEB), validated against the database once per request (React `cache`).
 * `null` when signed out or the session is no longer valid.
 */
export const getCurrentSession = cache(async (): Promise<ValidatedSession | null> => {
  const token = await readSessionCookie();
  if (!token) return null;
  return validateSessionToken(token, { kind: "WEB" });
});
