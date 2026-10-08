import type { Role, SchoolStatus, SessionKind, UserStatus } from "@/generated/prisma/client";

/**
 * Session lifetime rules (§39, ARCHITECTURE §5.1). Pure: no I/O.
 *
 * | Who / kind                                   | Idle (sliding) | Absolute |
 * |----------------------------------------------|----------------|----------|
 * | Staff (CONTENT_EDITOR, ADMIN, SUPER_ADMIN)   | 12 hours       | 7 days   |
 * | Everyone else, web cookie                    | 30 days        | 90 days  |
 * | Everyone else, API bearer token              | 90 days        | 180 days |
 * | Everyone else, WhatsApp channel link         | 30 days        | 180 days |
 *
 * API tokens (the native app, docs/API.md) slide for 90 days of inactivity so a student who studies once a term is not
 * signed out; the 180-day absolute cap still forces a fresh sign-in twice a year. A WhatsApp link stays at 30 days idle
 * (docs/WHATSAPP.md: a number unused for about a month must be linked again).
 *
 * Lifetimes are evaluated against the user's CURRENT roles on every validation, so a student who is promoted to
 * staff immediately gets the staff limits on the sessions they already hold.
 *
 * `lastSeenAt` (and with it the sliding `expiresAt`) is written at most every {@link SESSION_TOUCH_INTERVAL_MS}, and
 * `User.lastActiveAt` at most every {@link USER_ACTIVITY_INTERVAL_MS}, so the per-request cost is a read, with an
 * occasional HOT update.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Minimum time between `Session.lastSeenAt` writes (ARCHITECTURE §5.1 / schema doc: 5 minutes). */
export const SESSION_TOUCH_INTERVAL_MS = 5 * MINUTE;
/** Minimum time between `User.lastActiveAt` writes (schema doc: hourly). */
export const USER_ACTIVITY_INTERVAL_MS = HOUR;
/** Step-up window: sensitive actions need a login / re-authentication within this time (ARCHITECTURE §5.1). */
export const REAUTH_WINDOW_MS = 15 * MINUTE;

/** Platform roles that get the short staff session lifetime. */
export const STAFF_ROLES: readonly Role[] = ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"];

export interface SessionLifetime {
  idleMs: number;
  absoluteMs: number;
}

export const SESSION_LIFETIMES = {
  staff: { idleMs: 12 * HOUR, absoluteMs: 7 * DAY },
  web: { idleMs: 30 * DAY, absoluteMs: 90 * DAY },
  api: { idleMs: 90 * DAY, absoluteMs: 180 * DAY },
  whatsapp: { idleMs: 30 * DAY, absoluteMs: 180 * DAY },
} as const satisfies Record<string, SessionLifetime>;

/** True when any of `roles` is a staff role. */
export function isStaff(roles: readonly Role[]): boolean {
  return roles.some((role) => STAFF_ROLES.includes(role));
}

/** Lifetime for a session of `kind` held by a user with platform `roles`. */
export function sessionLifetime(kind: SessionKind, roles: readonly Role[]): SessionLifetime {
  if (isStaff(roles)) return SESSION_LIFETIMES.staff;
  switch (kind) {
    case "WEB":
      return SESSION_LIFETIMES.web;
    case "API":
      return SESSION_LIFETIMES.api;
    case "WHATSAPP":
      return SESSION_LIFETIMES.whatsapp;
  }
}

/** Expiry columns for a session created at `now`. */
export function initialSessionExpiry(lifetime: SessionLifetime, now: Date): { expiresAt: Date; absoluteExpiresAt: Date } {
  const absoluteExpiresAt = new Date(now.getTime() + lifetime.absoluteMs);
  const expiresAt = new Date(Math.min(now.getTime() + lifetime.idleMs, absoluteExpiresAt.getTime()));
  return { expiresAt, absoluteExpiresAt };
}

/** User statuses that may hold a working session (PENDING_DELETION may still sign in to cancel the deletion). */
export const SESSION_USER_STATUSES: readonly UserStatus[] = ["ACTIVE", "PENDING_DELETION"];

export type SessionInvalidReason =
  | "revoked"
  | "expired"
  | "absolute_expired"
  | "user_inactive"
  | "password_changed"
  | "wrong_kind";

/** Facts needed to decide whether a stored session is still usable. */
export interface SessionState {
  kind: SessionKind;
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
  absoluteExpiresAt: Date | null;
  revokedAt: Date | null;
  user: { status: UserStatus; roles: readonly Role[]; passwordUpdatedAt: Date | null };
}

/**
 * Decides whether a session is valid at `now`. Besides the stored expiries it re-applies the lifetime for the
 * user's current roles (privilege changes tighten existing sessions) and refuses sessions created before the last
 * password change.
 */
export function evaluateSession(
  state: SessionState,
  now: Date,
): { valid: true; lifetime: SessionLifetime } | { valid: false; reason: SessionInvalidReason } {
  if (state.revokedAt !== null) return { valid: false, reason: "revoked" };
  if (!SESSION_USER_STATUSES.includes(state.user.status)) return { valid: false, reason: "user_inactive" };
  if (state.user.passwordUpdatedAt !== null && state.user.passwordUpdatedAt.getTime() > state.createdAt.getTime()) {
    return { valid: false, reason: "password_changed" };
  }
  const t = now.getTime();
  const lifetime = sessionLifetime(state.kind, state.user.roles);
  if (state.absoluteExpiresAt !== null && state.absoluteExpiresAt.getTime() <= t) {
    return { valid: false, reason: "absolute_expired" };
  }
  if (state.createdAt.getTime() + lifetime.absoluteMs <= t) return { valid: false, reason: "absolute_expired" };
  if (state.expiresAt.getTime() <= t) return { valid: false, reason: "expired" };
  if (state.lastSeenAt.getTime() + lifetime.idleMs <= t) return { valid: false, reason: "expired" };
  return { valid: true, lifetime };
}

/**
 * The sliding-expiry update to write for a valid session, or `null` when the last touch is recent enough
 * (throttled to one write per {@link SESSION_TOUCH_INTERVAL_MS}).
 */
export function planSessionTouch(
  state: Pick<SessionState, "createdAt" | "lastSeenAt" | "absoluteExpiresAt">,
  lifetime: SessionLifetime,
  now: Date,
): { lastSeenAt: Date; expiresAt: Date } | null {
  if (now.getTime() - state.lastSeenAt.getTime() < SESSION_TOUCH_INTERVAL_MS) return null;
  const caps = [now.getTime() + lifetime.idleMs, state.createdAt.getTime() + lifetime.absoluteMs];
  if (state.absoluteExpiresAt !== null) caps.push(state.absoluteExpiresAt.getTime());
  return { lastSeenAt: now, expiresAt: new Date(Math.min(...caps)) };
}

/** True when `User.lastActiveAt` should be written for activity at `now`. */
export function shouldRecordUserActivity(lastActiveAt: Date | null, now: Date): boolean {
  return lastActiveAt === null || now.getTime() - lastActiveAt.getTime() >= USER_ACTIVITY_INTERVAL_MS;
}

/** True when the session was (re-)authenticated within {@link REAUTH_WINDOW_MS} (step-up check). */
export function hasRecentAuthentication(
  session: { createdAt: Date; reauthenticatedAt: Date | null },
  now: Date,
  windowMs: number = REAUTH_WINDOW_MS,
): boolean {
  const last = Math.max(session.createdAt.getTime(), session.reauthenticatedAt?.getTime() ?? 0);
  return now.getTime() - last < windowMs;
}

/**
 * Schools whose memberships still confer authority (SCHOOL_ADMIN, teacher membership). SUSPENDED and CLOSED schools'
 * members keep their accounts but lose school-scoped access.
 */
export const OPERATING_SCHOOL_STATUSES: readonly SchoolStatus[] = ["ACTIVE", "PENDING_VERIFICATION"];
