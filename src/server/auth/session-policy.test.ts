import { describe, expect, it } from "vitest";
import {
  evaluateSession,
  hasRecentAuthentication,
  initialSessionExpiry,
  isStaff,
  planSessionTouch,
  SESSION_LIFETIMES,
  SESSION_TOUCH_INTERVAL_MS,
  sessionLifetime,
  shouldRecordUserActivity,
  type SessionState,
} from "./session-policy";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const t0 = new Date("2026-10-05T08:00:00Z");
const at = (ms: number) => new Date(t0.getTime() + ms);

function state(overrides: Partial<SessionState> = {}, user: Partial<SessionState["user"]> = {}): SessionState {
  const lifetime = SESSION_LIFETIMES.web;
  return {
    kind: "WEB",
    createdAt: t0,
    lastSeenAt: t0,
    expiresAt: at(lifetime.idleMs),
    absoluteExpiresAt: at(lifetime.absoluteMs),
    revokedAt: null,
    ...overrides,
    user: { status: "ACTIVE", roles: ["STUDENT"], passwordUpdatedAt: null, ...user },
  };
}

describe("session lifetimes", () => {
  it("staff get 12h idle / 7d absolute; web and WhatsApp 30d idle; API tokens 90d idle", () => {
    expect(isStaff(["TEACHER", "PARENT"])).toBe(false);
    expect(isStaff(["TEACHER", "CONTENT_EDITOR"])).toBe(true);
    expect(sessionLifetime("WEB", ["ADMIN"])).toEqual({ idleMs: 12 * HOUR, absoluteMs: 7 * DAY });
    expect(sessionLifetime("API", ["SUPER_ADMIN"])).toEqual({ idleMs: 12 * HOUR, absoluteMs: 7 * DAY });
    expect(sessionLifetime("WEB", ["STUDENT"])).toEqual({ idleMs: 30 * DAY, absoluteMs: 90 * DAY });
    expect(sessionLifetime("API", ["PARENT"])).toEqual({ idleMs: 90 * DAY, absoluteMs: 180 * DAY });
    expect(sessionLifetime("API", ["STUDENT"])).toEqual(SESSION_LIFETIMES.api);
    expect(sessionLifetime("WHATSAPP", ["STUDENT"])).toEqual({ idleMs: 30 * DAY, absoluteMs: 180 * DAY });
    expect(sessionLifetime("WHATSAPP", ["ADMIN"])).toEqual(SESSION_LIFETIMES.staff);
  });

  it("API tokens slide for 90 idle days, never past the 180-day absolute cap", () => {
    const api = SESSION_LIFETIMES.api;
    const apiState = (overrides: Partial<SessionState> = {}): SessionState => ({
      kind: "API",
      createdAt: t0,
      lastSeenAt: t0,
      expiresAt: at(api.idleMs),
      absoluteExpiresAt: at(api.absoluteMs),
      revokedAt: null,
      ...overrides,
      user: { status: "ACTIVE", roles: ["STUDENT"], passwordUpdatedAt: null },
    });
    expect(initialSessionExpiry(api, t0)).toEqual({ expiresAt: at(90 * DAY), absoluteExpiresAt: at(180 * DAY) });
    // 60 idle days: still valid (a web session would have expired); 90 idle days: expired.
    expect(evaluateSession(apiState(), at(60 * DAY))).toEqual({ valid: true, lifetime: api });
    expect(evaluateSession(apiState(), at(90 * DAY))).toEqual({ valid: false, reason: "expired" });
    // Used on day 120: the touch slides to day 210 but is capped at the absolute expiry (day 180).
    expect(planSessionTouch(apiState({ lastSeenAt: at(119 * DAY) }), api, at(120 * DAY))).toEqual({ lastSeenAt: at(120 * DAY), expiresAt: at(180 * DAY) });
    expect(evaluateSession(apiState({ lastSeenAt: at(170 * DAY), expiresAt: at(180 * DAY) }), at(180 * DAY))).toEqual({ valid: false, reason: "absolute_expired" });
  });

  it("initial expiry is now + idle, capped by the absolute expiry", () => {
    expect(initialSessionExpiry(SESSION_LIFETIMES.web, t0)).toEqual({ expiresAt: at(30 * DAY), absoluteExpiresAt: at(90 * DAY) });
    expect(initialSessionExpiry({ idleMs: 10 * DAY, absoluteMs: DAY }, t0)).toEqual({ expiresAt: at(DAY), absoluteExpiresAt: at(DAY) });
  });
});

describe("evaluateSession", () => {
  it("accepts a fresh session", () => {
    expect(evaluateSession(state(), at(MIN))).toEqual({ valid: true, lifetime: SESSION_LIFETIMES.web });
  });

  it("refuses revoked, idle-expired and absolutely expired sessions", () => {
    expect(evaluateSession(state({ revokedAt: at(1) }), at(MIN))).toEqual({ valid: false, reason: "revoked" });
    expect(evaluateSession(state(), at(30 * DAY))).toEqual({ valid: false, reason: "expired" });
    expect(evaluateSession(state({ expiresAt: at(200 * DAY) }), at(90 * DAY))).toEqual({ valid: false, reason: "absolute_expired" });
  });

  it("refuses sessions of inactive users and sessions older than the last password change", () => {
    expect(evaluateSession(state({}, { status: "SUSPENDED" }), at(MIN))).toEqual({ valid: false, reason: "user_inactive" });
    expect(evaluateSession(state({}, { status: "DELETED" }), at(MIN))).toEqual({ valid: false, reason: "user_inactive" });
    expect(evaluateSession(state({}, { status: "PENDING_DELETION" }), at(MIN)).valid).toBe(true);
    expect(evaluateSession(state({}, { passwordUpdatedAt: at(1) }), at(MIN))).toEqual({ valid: false, reason: "password_changed" });
    // A password change at the very instant of creation does not invalidate the new session.
    expect(evaluateSession(state({}, { passwordUpdatedAt: t0 }), at(MIN)).valid).toBe(true);
  });

  it("re-applies the CURRENT roles' lifetime: a promotion to staff shortens existing sessions", () => {
    const promoted = state({}, { roles: ["STUDENT", "ADMIN"] });
    expect(evaluateSession({ ...promoted, lastSeenAt: t0 }, at(13 * HOUR))).toEqual({ valid: false, reason: "expired" });
    expect(evaluateSession({ ...promoted, lastSeenAt: at(7 * DAY - HOUR) }, at(7 * DAY))).toEqual({
      valid: false,
      reason: "absolute_expired",
    });
  });
});

describe("planSessionTouch", () => {
  it("is throttled to one write per interval", () => {
    expect(planSessionTouch(state(), SESSION_LIFETIMES.web, at(SESSION_TOUCH_INTERVAL_MS - 1))).toBeNull();
  });

  it("slides the idle expiry forward, capped by the absolute expiry", () => {
    const now = at(10 * DAY);
    expect(planSessionTouch(state(), SESSION_LIFETIMES.web, now)).toEqual({ lastSeenAt: now, expiresAt: at(40 * DAY) });
    const late = at(80 * DAY);
    expect(planSessionTouch(state({ lastSeenAt: at(79 * DAY) }), SESSION_LIFETIMES.web, late)).toEqual({
      lastSeenAt: late,
      expiresAt: at(90 * DAY),
    });
  });
});

describe("activity and step-up", () => {
  it("records user activity at most hourly", () => {
    expect(shouldRecordUserActivity(null, t0)).toBe(true);
    expect(shouldRecordUserActivity(t0, at(59 * MIN))).toBe(false);
    expect(shouldRecordUserActivity(t0, at(HOUR))).toBe(true);
  });

  it("recent authentication is the later of creation and re-authentication, within 15 minutes", () => {
    expect(hasRecentAuthentication({ createdAt: t0, reauthenticatedAt: null }, at(14 * MIN))).toBe(true);
    expect(hasRecentAuthentication({ createdAt: t0, reauthenticatedAt: null }, at(15 * MIN))).toBe(false);
    expect(hasRecentAuthentication({ createdAt: t0, reauthenticatedAt: at(DAY) }, at(DAY + 5 * MIN))).toBe(true);
  });
});
