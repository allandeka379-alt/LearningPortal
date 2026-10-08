import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { sha256Hex } from "@/server/lib/crypto";
import { createSchool, createSchoolMember, createStudent, createUser } from "../../../tests/factories/index";
import { actorFromSession, loadActor } from "./actor";
import {
  API_TOKEN_PREFIX,
  createSession,
  deviceLabel,
  isRecentlyAuthenticated,
  isWellFormedSessionToken,
  listActiveSessions,
  markSessionReauthenticated,
  revokeAllSessions,
  revokeSession,
  revokeSessionByToken,
  rotateSession,
  validateSessionToken,
} from "./sessions";
import { testMeta } from "./testing";

const DAY = 24 * 60 * 60_000;

describe("createSession", () => {
  it("returns a random token and stores only its SHA-256", async () => {
    const { user } = await createStudent();
    const { token, session } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(isWellFormedSessionToken(token)).toBe(true);
    const row = await db.session.findUniqueOrThrow({ where: { id: session.id } });
    expect(row.tokenHash).toBe(sha256Hex(token));
    expect(row.label).toBe("Chrome on Android");
    expect(row.ipHash).toMatch(/^[0-9a-f]{64}$/);
    expect(row.reauthenticatedAt).not.toBeNull();
    expect(row.expiresAt.getTime() - row.createdAt.getTime()).toBe(30 * DAY);
    expect(row.absoluteExpiresAt!.getTime() - row.createdAt.getTime()).toBe(90 * DAY);
  });

  it("gives staff short sessions and API tokens a dz_ prefix", async () => {
    const { user } = await createUser({ roles: ["ADMIN"] });
    const web = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    expect(web.session.expiresAt.getTime() - web.session.createdAt.getTime()).toBe(12 * 60 * 60_000);
    expect(web.session.absoluteExpiresAt!.getTime() - web.session.createdAt.getTime()).toBe(7 * DAY);
    const api = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD", label: "Tablet app" });
    expect(api.token.startsWith(API_TOKEN_PREFIX)).toBe(true);
    expect(api.session.label).toBe("Tablet app");
  });
});

describe("validateSessionToken", () => {
  it("returns the session with the user facts needed for an Actor", async () => {
    const { user } = await createStudent({ firstName: "Rudo" });
    const { token, session } = await createSession(user.id, "WEB", testMeta(), { authMethod: "OTP" });
    const validated = await validateSessionToken(token, { kind: "WEB" });
    expect(validated?.session.id).toBe(session.id);
    expect(validated?.user.roles).toEqual(["STUDENT"]);
    const actor = actorFromSession(validated!);
    expect(actor).toMatchObject({
      kind: "user",
      userId: user.id,
      roles: ["STUDENT"],
      displayName: "Rudo",
      studentId: user.id,
      studentOnboardingCompleted: false,
      timeZone: "Africa/Harare",
      sessionId: session.id,
      channel: "web",
    });
  });

  it("rejects unknown, malformed and wrong-kind tokens", async () => {
    const { user } = await createStudent();
    const api = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    expect(await validateSessionToken(api.token, { kind: "WEB" })).toBeNull();
    expect(await validateSessionToken(api.token, { kind: "API" })).not.toBeNull();
    expect(await validateSessionToken("x".repeat(43))).toBeNull();
    expect(await validateSessionToken("not a token")).toBeNull();
    expect(await validateSessionToken(null)).toBeNull();
  });

  it("refuses revoked sessions", async () => {
    const { user } = await createStudent();
    const { token, session } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    expect(await revokeSession(session.id)).toBe(true);
    expect(await revokeSession(session.id)).toBe(false);
    expect(await validateSessionToken(token)).toBeNull();
    const row = await db.session.findUniqueOrThrow({ where: { id: session.id } });
    expect(row.revokedReason).toBe("logout");
  });

  it("refuses idle-expired and absolutely expired sessions", async () => {
    const { user } = await createStudent();
    // Created 31 days ago and never used since: the 30-day idle expiry has passed.
    const idle = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", now: new Date(Date.now() - 31 * DAY) });
    expect(idle.session.expiresAt.getTime()).toBeLessThan(Date.now());
    expect(await validateSessionToken(idle.token)).toBeNull();

    const old = new Date(Date.now() - 91 * DAY);
    const absolute = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", now: old });
    await db.session.update({ where: { id: absolute.session.id }, data: { lastSeenAt: new Date(), expiresAt: new Date(Date.now() + DAY) } });
    expect(await validateSessionToken(absolute.token)).toBeNull();
  });

  it("slides the expiry forward at most every 5 minutes and records activity hourly", async () => {
    const { user } = await createStudent();
    const tenMinutesAgo = new Date(Date.now() - 10 * 60_000);
    const { token, session } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", now: tenMinutesAgo });
    await validateSessionToken(token);
    const touched = await db.session.findUniqueOrThrow({ where: { id: session.id } });
    expect(touched.lastSeenAt.getTime()).toBeGreaterThan(tenMinutesAgo.getTime());
    expect(touched.expiresAt.getTime()).toBeGreaterThan(session.expiresAt.getTime());
    const userRow = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(userRow.lastActiveAt).not.toBeNull();

    // A second validation right away does not write again.
    await validateSessionToken(token);
    const again = await db.session.findUniqueOrThrow({ where: { id: session.id } });
    expect(again.lastSeenAt.getTime()).toBe(touched.lastSeenAt.getTime());
  });

  it("refuses sessions of suspended users and sessions older than a password change", async () => {
    const { user } = await createStudent();
    const first = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    await db.user.update({ where: { id: user.id }, data: { passwordUpdatedAt: new Date(Date.now() + 5) } });
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(await validateSessionToken(first.token)).toBeNull();
    const second = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    expect(await validateSessionToken(second.token)).not.toBeNull();

    await db.user.update({ where: { id: user.id }, data: { status: "SUSPENDED", statusChangedAt: new Date() } });
    expect(await validateSessionToken(second.token)).toBeNull();
  });
});

describe("revocation, rotation and device list", () => {
  it("revokes all sessions, optionally keeping the current one", async () => {
    const { user } = await createStudent();
    const a = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const b = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const c = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    expect(await revokeAllSessions(user.id, { exceptSessionId: a.session.id })).toBe(2);
    expect(await validateSessionToken(a.token)).not.toBeNull();
    expect(await validateSessionToken(b.token)).toBeNull();
    expect(await validateSessionToken(c.token)).toBeNull();
    expect(await revokeSessionByToken(a.token)).toBe(a.session.id);
    expect(await validateSessionToken(a.token)).toBeNull();
    expect(await revokeSessionByToken("garbage")).toBeNull();
  });

  it("rotates a session: new token, same kind and method, old one revoked", async () => {
    const { user } = await createStudent();
    const old = await createSession(user.id, "WEB", testMeta(), { authMethod: "GOOGLE" });
    const rotated = await rotateSession(old.session.id, testMeta());
    expect(rotated).not.toBeNull();
    expect(rotated!.token).not.toBe(old.token);
    expect(rotated!.session.authMethod).toBe("GOOGLE");
    expect(await validateSessionToken(old.token)).toBeNull();
    expect(await validateSessionToken(rotated!.token)).not.toBeNull();
    const oldRow = await db.session.findUniqueOrThrow({ where: { id: old.session.id } });
    expect(oldRow.revokedReason).toBe("rotated");
    expect(await rotateSession(old.session.id, testMeta())).toBeNull();
  });

  it("lists active sessions, most recent first", async () => {
    const { user } = await createStudent();
    const a = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", now: new Date(Date.now() - 60_000) });
    const b = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    const revoked = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    await revokeSession(revoked.session.id);
    const list = await listActiveSessions(user.id);
    expect(list.map((item) => item.id)).toEqual([b.session.id, a.session.id]);
  });

  it("tracks recent authentication for step-up", async () => {
    const { user } = await createStudent();
    const old = new Date(Date.now() - 60 * 60_000);
    const { session } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", now: old });
    expect(isRecentlyAuthenticated(session)).toBe(false);
    await markSessionReauthenticated(session.id);
    const row = await db.session.findUniqueOrThrow({ where: { id: session.id } });
    expect(isRecentlyAuthenticated(row)).toBe(true);
  });
});

describe("actors", () => {
  it("adds SCHOOL_ADMIN to the effective roles from an ACTIVE membership of an operating school", async () => {
    const { user } = await createUser({ roles: ["TEACHER"] });
    const { school } = await createSchool();
    await createSchoolMember({ schoolId: school.id, userId: user.id, role: "SCHOOL_ADMIN" });
    const { school: closed } = await createSchool({ status: "CLOSED" });
    await createSchoolMember({ schoolId: closed.id, userId: user.id, role: "SCHOOL_ADMIN" });
    const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const actor = actorFromSession((await validateSessionToken(token))!);
    expect(actor.platformRoles).toEqual(["TEACHER"]);
    expect(actor.roles).toEqual(["TEACHER", "SCHOOL_ADMIN"]);
    expect(actor.schoolRoles).toEqual([{ schoolId: school.id, role: "SCHOOL_ADMIN" }]);
    expect(actor.studentId).toBeUndefined();
    expect(actor.studentOnboardingCompleted).toBeNull();

    const loaded = await loadActor(user.id);
    expect(loaded?.roles).toEqual(["TEACHER", "SCHOOL_ADMIN"]);
    expect(loaded?.sessionId).toBeNull();
  });

  it("loadActor returns null for suspended or unknown users", async () => {
    const { user } = await createStudent({ status: "SUSPENDED" });
    expect(await loadActor(user.id)).toBeNull();
    expect(await loadActor("00000000-0000-7000-8000-000000000000")).toBeNull();
  });

  it("derives a device label from the user agent", () => {
    expect(deviceLabel("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit Version/17.0 Mobile Safari/604.1")).toBe("Safari on iOS");
    expect(deviceLabel("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0 Safari/537.36 Edg/130.0")).toBe("Edge on Windows");
    expect(deviceLabel(null)).toBeNull();
  });
});
