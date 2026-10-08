import { describe, expect, it, vi } from "vitest";
import { DELETE as revokeToken, POST as createToken } from "@/app/api/v1/auth/token/route";
import { POST as requestOtp } from "@/app/api/v1/auth/otp/request/route";
import { POST as verifyOtp } from "@/app/api/v1/auth/otp/verify/route";
import { GET as getMe } from "@/app/api/v1/me/route";
import { GET as listNotifications } from "@/app/api/v1/notifications/route";
import { GET as searchSuggest } from "@/app/api/v1/search/suggest/route";
import { GET as listConversations } from "@/app/api/v1/tutor/conversations/route";
import { POST as upload } from "@/app/api/v1/uploads/route";
import { sealAuthFlow } from "@/server/auth/flow-cookie";
import { createSession } from "@/server/auth/sessions";
import { latestCodeFor, randomIp, TEST_PASSWORD, testMeta, testPasswordHash } from "@/server/auth/testing";
import { db } from "@/server/db";
import { sha256Hex } from "@/server/lib/crypto";
import { getEnv } from "@/server/lib/env";
import { RATE_LIMIT_PRESETS } from "@/server/lib/rate-limit";
import { createStudent, createUser, uniqueEmail } from "../../../tests/factories/index";
import { codeFlowSchema, meSchema, tokenIssuedSchema } from "./schemas";

// Auth and RBAC are checked on the AI routes too, so they are tested with AI switched on: `features.ai` is on for this file (never written to the shared DB).
// Optional email and SMS stay off: the API's codes are account email, sent whatever `features.email` says.
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Bearer-token lifecycle of the REST API (§33, §39): password grant, one-time-code grant, /me, revocation, generic
 * failures, lockout, the unverified-account path, and the "school-set password" gate.
 */

const ORIGIN = new URL(getEnv().APP_URL).origin;
type Handler = (request: Request, context?: { params?: Promise<Record<string, string>> }) => Promise<Response>;

interface CallOptions {
  method?: string;
  body?: unknown;
  token?: string;
  cookie?: string;
  ip?: string;
  headers?: Record<string, string>;
}

function call(handler: Handler, path: string, options: CallOptions = {}): Promise<Response> {
  const headers: Record<string, string> = {
    "x-forwarded-for": options.ip ?? randomIp(),
    "user-agent": "DzidzaMobile/1.0 (Android 14)",
    ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
    ...(options.cookie ? { cookie: options.cookie, origin: ORIGIN } : {}),
    ...(options.body !== undefined ? { "content-type": "application/json" } : {}),
    ...options.headers,
  };
  return handler(
    new Request(`${ORIGIN}/api/v1${path}`, {
      method: options.method ?? (options.body !== undefined ? "POST" : "GET"),
      headers,
      ...(options.body !== undefined ? { body: typeof options.body === "string" ? options.body : JSON.stringify(options.body) } : {}),
    }),
  );
}

async function json<T = Record<string, unknown>>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

interface ErrorJson {
  error: { code: string; message: string; fieldErrors?: Record<string, string[]> };
}

async function verifiedStudent(): Promise<{ userId: string; email: string }> {
  const email = uniqueEmail("api");
  const { user } = await createStudent({ email, passwordHash: await testPasswordHash(), emailVerified: true, student: { isMinor: false } });
  return { userId: user.id, email };
}

describe("password grant: POST /auth/token -> GET /me -> DELETE /auth/token", () => {
  it("issues an API token once, stores only its hash, and revokes it", async () => {
    const { userId, email } = await verifiedStudent();
    const created = await call(createToken, "/auth/token", { body: { identifier: email.toUpperCase(), password: TEST_PASSWORD, label: "Rufaro's phone" } });
    expect(created.status).toBe(201);
    expect(created.headers.get("cache-control")).toBe("private, no-store");
    const token = tokenIssuedSchema.parse((await json<{ data: unknown }>(created)).data);
    expect(token.token).toMatch(/^dz_[A-Za-z0-9_-]{43}$/);
    expect(token.userId).toBe(userId);
    expect(new Date(token.expiresAt).getTime()).toBeGreaterThan(Date.now());

    const row = await db.session.findUniqueOrThrow({ where: { id: token.sessionId } });
    expect(row).toMatchObject({ kind: "API", authMethod: "PASSWORD", label: "Rufaro's phone", revokedAt: null });
    expect(row.tokenHash).toBe(sha256Hex(token.token));
    expect(JSON.stringify(row)).not.toContain(token.token);

    const me = await call(getMe, "/me", { token: token.token });
    expect(me.status).toBe(200);
    const profile = meSchema.parse((await json<{ data: unknown }>(me)).data);
    expect(profile).toMatchObject({ id: userId, email, emailVerified: true, roles: ["STUDENT"], passwordMustChange: false });
    expect(profile.session).toMatchObject({ id: token.sessionId, kind: "API", via: "bearer", authMethod: "PASSWORD" });

    const revoked = await call(revokeToken, "/auth/token", { method: "DELETE", token: token.token });
    expect(revoked.status).toBe(204);
    expect((await db.session.findUniqueOrThrow({ where: { id: token.sessionId } })).revokedAt).not.toBeNull();
    expect((await call(getMe, "/me", { token: token.token })).status).toBe(401);
    expect((await call(revokeToken, "/auth/token", { method: "DELETE", token: token.token })).status).toBe(401);

    const actions = (await db.auditLog.findMany({ where: { targetUserId: userId }, select: { action: true } })).map((r) => r.action);
    expect(actions).toEqual(expect.arrayContaining(["auth.login.success", "auth.logout"]));
  });

  it("gives one generic 401 for a wrong password and an unknown identifier", async () => {
    const { email } = await verifiedStudent();
    const ip = randomIp();
    const wrong = await call(createToken, "/auth/token", { ip, body: { identifier: email, password: "not the password" } });
    const unknown = await call(createToken, "/auth/token", { ip, body: { identifier: uniqueEmail("nobody"), password: "not the password" } });
    expect(wrong.status).toBe(401);
    expect(unknown.status).toBe(401);
    expect(await json(wrong)).toEqual(await json(unknown));
  });

  it("validates the body: unknown fields, missing fields, non-JSON", async () => {
    const extra = await call(createToken, "/auth/token", { body: { identifier: "a@b.test", password: "x", grant: "admin" } });
    expect(extra.status).toBe(422);
    const missing = await json<ErrorJson>(await call(createToken, "/auth/token", { body: { identifier: "a@b.test" } }));
    expect(missing.error.fieldErrors).toHaveProperty("password");
    expect((await call(createToken, "/auth/token", { body: "identifier=a", headers: { "content-type": "text/plain" } })).status).toBe(400);
  });

  it("locks the account after repeated wrong passwords (429, generic message)", async () => {
    const { email } = await verifiedStudent();
    const statuses: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      statuses.push((await call(createToken, "/auth/token", { body: { identifier: email, password: `wrong ${i}` } })).status);
    }
    expect(statuses).toEqual([401, 401, 401, 401, 429]);
    const locked = await call(createToken, "/auth/token", { body: { identifier: email, password: TEST_PASSWORD } });
    expect(locked.status).toBe(429);
    expect(locked.headers.get("retry-after")).toBeTruthy();
  });

  it("does not accept a web cookie token as a bearer token, nor revoke cookie sessions here", async () => {
    const { userId } = await verifiedStudent();
    const web = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD" });
    expect((await call(getMe, "/me", { token: web.token })).status).toBe(401);
    const viaCookie = await call(revokeToken, "/auth/token", { method: "DELETE", cookie: `dz_session=${web.token}` });
    expect(viaCookie.status).toBe(400);
    expect((await db.session.findUniqueOrThrow({ where: { id: web.session.id } })).revokedAt).toBeNull();
  });

  it("keeps tokens idle for up to 90 days, then refuses them", async () => {
    const { userId } = await verifiedStudent();
    const DAY = 24 * 3600 * 1000;
    // Unused for 31 days: still valid (API tokens slide for 90 idle days; a web cookie would have expired).
    const month = await createSession(userId, "API", testMeta(), { authMethod: "PASSWORD", now: new Date(Date.now() - 31 * DAY) });
    expect(month.session.expiresAt.getTime()).toBeGreaterThan(Date.now());
    expect((await call(getMe, "/me", { token: month.token })).status).toBe(200);
    // Created 91 days ago and never used since: past the 90-day idle expiry.
    const api = await createSession(userId, "API", testMeta(), { authMethod: "PASSWORD", now: new Date(Date.now() - 91 * DAY) });
    expect(api.session.expiresAt.getTime()).toBeLessThan(Date.now());
    expect((await call(getMe, "/me", { token: api.token })).status).toBe(401);
  });
});

describe("one-time-code grant: POST /auth/otp/request -> POST /auth/otp/verify", () => {
  it("answers the same for unknown accounts, then exchanges the code for a token (single use)", async () => {
    const { userId, email } = await verifiedStudent();
    const sent = await call(requestOtp, "/auth/otp/request", { body: { identifier: email } });
    expect(sent.status).toBe(202);
    const flow = codeFlowSchema.parse((await json<{ data: unknown }>(sent)).data);
    expect(flow).toMatchObject({ status: "code_sent", channel: "EMAIL", expiresInSeconds: 900, resendAfterSeconds: 60 });
    expect(flow.destination).not.toBe(email);
    expect(flow.flowToken).not.toContain(email.split("@")[0]);

    const nobody = await call(requestOtp, "/auth/otp/request", { body: { identifier: uniqueEmail("ghost") } });
    expect(nobody.status).toBe(202);
    const ghost = codeFlowSchema.parse((await json<{ data: unknown }>(nobody)).data);
    expect(Object.keys(ghost).sort()).toEqual(Object.keys(flow).sort());
    expect(ghost.status).toBe("code_sent");

    // Asking again inside the 60-second cooldown is limited.
    expect((await call(requestOtp, "/auth/otp/request", { body: { identifier: email } })).status).toBe(429);

    const code = latestCodeFor(email);
    const wrongCode = code === "000000" ? "111111" : "000000";
    const wrong = await call(verifyOtp, "/auth/otp/verify", { body: { flowToken: flow.flowToken, code: wrongCode } });
    expect(wrong.status).toBe(422);
    expect((await json<ErrorJson>(wrong)).error.fieldErrors).toHaveProperty("code");

    const verified = await call(verifyOtp, "/auth/otp/verify", { body: { flowToken: flow.flowToken, code, label: "Tablet" } });
    expect(verified.status).toBe(201);
    const token = tokenIssuedSchema.parse((await json<{ data: unknown }>(verified)).data);
    expect(token.userId).toBe(userId);
    const me = meSchema.parse((await json<{ data: unknown }>(await call(getMe, "/me", { token: token.token }))).data);
    expect(me.session).toMatchObject({ authMethod: "OTP", label: "Tablet", kind: "API" });

    const replay = await call(verifyOtp, "/auth/otp/verify", { body: { flowToken: flow.flowToken, code } });
    expect(replay.status).toBe(422);
  });

  it("treats a tampered or foreign flow token like an expired request", async () => {
    const { email } = await verifiedStudent();
    const flow = codeFlowSchema.parse((await json<{ data: unknown }>(await call(requestOtp, "/auth/otp/request", { body: { identifier: email } }))).data);
    const tampered = `${flow.flowToken.slice(0, -4)}${flow.flowToken.endsWith("AAAA") ? "BBBB" : "AAAA"}`;
    const response = await call(verifyOtp, "/auth/otp/verify", { body: { flowToken: tampered, code: latestCodeFor(email) } });
    expect(response.status).toBe(422);
    expect((await json<ErrorJson>(response)).error.fieldErrors).toHaveProperty("flowToken");
  });

  it("finishes the password grant of a never-verified account with a code (202 -> 201)", async () => {
    const email = uniqueEmail("unverified");
    const { user } = await createUser({ roles: ["STUDENT"], email, passwordHash: await testPasswordHash(), emailVerified: false });
    const pending = await call(createToken, "/auth/token", { body: { identifier: email, password: TEST_PASSWORD } });
    expect(pending.status).toBe(202);
    const flow = codeFlowSchema.parse((await json<{ data: unknown }>(pending)).data);
    expect(flow.status).toBe("verification_required");
    expect(await db.session.count({ where: { userId: user.id } })).toBe(0);

    const done = await call(verifyOtp, "/auth/otp/verify", { body: { flowToken: flow.flowToken, code: latestCodeFor(email) } });
    expect(done.status).toBe(201);
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).emailVerifiedAt).not.toBeNull();
  });
});

describe("identifier rotation from one IP", () => {
  const LIMIT = RATE_LIMIT_PRESETS.loginIp.limit;
  const flowFor = (target: string) => sealAuthFlow({ purpose: "LOGIN_OTP", channel: "EMAIL", target, next: null, sentAt: Date.now() });

  it("POST /auth/token: one IP spraying many identifiers gets 429 after the IP budget, with a generic body", async () => {
    const ip = randomIp();
    for (let i = 0; i < LIMIT; i += 1) {
      const response = await call(createToken, "/auth/token", { ip, body: { identifier: uniqueEmail(`spray${i}`), password: "Summer2026!" } });
      expect(response.status, `attempt ${i + 1}`).toBe(401);
    }
    const { email } = await verifiedStudent();
    const refused = await call(createToken, "/auth/token", { ip, body: { identifier: email, password: TEST_PASSWORD } });
    expect(refused.status).toBe(429);
    expect(refused.headers.get("retry-after")).toBeTruthy();
    const body = await json<ErrorJson>(refused);
    expect(body.error.code).toBe("RATE_LIMITED");
    expect(body.error.message).not.toMatch(/account|exist|password/i);
    // Another IP signs in normally.
    expect((await call(createToken, "/auth/token", { body: { identifier: email, password: TEST_PASSWORD } })).status).toBe(201);
  });

  it("POST /auth/otp/verify: guessing codes across destinations shares the IP budget with /auth/token and /auth/otp/request", async () => {
    const ip = randomIp();
    const half = Math.floor(LIMIT / 2);
    for (let i = 0; i < half; i += 1) {
      expect((await call(createToken, "/auth/token", { ip, body: { identifier: uniqueEmail(`pw${i}`), password: "guess" } })).status).toBe(401);
    }
    for (let i = half; i < LIMIT; i += 1) {
      const response = await call(verifyOtp, "/auth/otp/verify", { ip, body: { flowToken: flowFor(uniqueEmail(`otp${i}`)), code: "123456" } });
      expect(response.status, `code check ${i + 1}`).toBe(422);
    }
    expect((await call(verifyOtp, "/auth/otp/verify", { ip, body: { flowToken: flowFor(uniqueEmail("otp-next")), code: "123456" } })).status).toBe(429);
    expect((await call(requestOtp, "/auth/otp/request", { ip, body: { identifier: uniqueEmail("request-next") } })).status).toBe(429);
  });

  it("POST /auth/otp/verify is also limited per (IP, destination) by the apiOtpVerify preset", async () => {
    const ip = randomIp();
    const target = uniqueEmail("one-destination");
    const statuses: number[] = [];
    for (let i = 0; i <= RATE_LIMIT_PRESETS.apiOtpVerify.limit; i += 1) {
      statuses.push((await call(verifyOtp, "/auth/otp/verify", { ip, body: { flowToken: flowFor(target), code: "123456" } })).status);
    }
    expect(statuses.slice(0, -1).every((status) => status === 422)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
    const buckets = await db.rateLimitBucket.count({ where: { key: { startsWith: "apiOtpVerify:" }, count: { gte: RATE_LIMIT_PRESETS.apiOtpVerify.limit } } });
    expect(buckets).toBeGreaterThanOrEqual(1);
  });
});

describe("school-set password", () => {
  it("lets the client read /me but refuses other endpoints until the password is changed", async () => {
    const { userId } = await verifiedStudent();
    await db.user.update({ where: { id: userId }, data: { passwordMustChange: true } });
    const api = await createSession(userId, "API", testMeta(), { authMethod: "PASSWORD" });
    const me = meSchema.parse((await json<{ data: unknown }>(await call(getMe, "/me", { token: api.token }))).data);
    expect(me.passwordMustChange).toBe(true);
    const blocked = await call(listNotifications, "/notifications", { token: api.token });
    expect(blocked.status).toBe(403);
    expect((await json<ErrorJson>(blocked)).error.code).toBe("FORBIDDEN");

    // The pre-existing apiRoute endpoints (tutor, search, uploads) refuse too, by token and by cookie.
    const web = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD" });
    for (const credentials of [{ token: api.token }, { cookie: `dz_session=${web.token}` }]) {
      expect((await call(listConversations, "/tutor/conversations", credentials)).status).toBe(403);
      expect((await call(searchSuggest, "/search/suggest?q=algebra", credentials)).status).toBe(403);
      const uploaded = await call(upload, "/uploads?purpose=solver", { ...credentials, method: "POST", headers: { "content-type": "multipart/form-data; boundary=x" } });
      expect(uploaded.status).toBe(403);
      expect((await json<ErrorJson>(uploaded)).error.code).toBe("FORBIDDEN");
    }
    // Sign-out stays available.
    expect((await call(revokeToken, "/auth/token", { method: "DELETE", token: api.token })).status).toBe(204);
  });
});
