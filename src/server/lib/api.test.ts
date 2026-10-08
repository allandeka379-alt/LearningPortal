import { describe, expect, it } from "vitest";
import { z } from "zod";
import { createSession } from "@/server/auth/sessions";
import { db } from "@/server/db";
import { testMeta } from "@/server/auth/testing";
import { createStudent, createUser } from "../../../tests/factories/index";
import {
  apiRoute,
  decodeCursor,
  encodeCursor,
  pageOf,
  paginated,
  parseCursorParams,
  readJsonBody,
  searchParamsToObject,
} from "./api";
import { AppError, isAppError } from "./errors";

const ORIGIN = "http://localhost:3000";

function catchAppError(fn: () => unknown): AppError {
  try {
    fn();
  } catch (error) {
    if (isAppError(error)) return error;
    throw error;
  }
  throw new Error("expected an AppError");
}

async function body(response: Response): Promise<unknown> {
  return response.status === 204 ? null : response.json();
}

describe("cursor pagination helpers", () => {
  it("parses cursor and limit with defaults and bounds", () => {
    expect(parseCursorParams(`${ORIGIN}/api/v1/x`)).toEqual({ cursor: null, limit: 20 });
    expect(parseCursorParams(new URL(`${ORIGIN}/x?limit=100&cursor=abc_-1`))).toEqual({ cursor: "abc_-1", limit: 100 });
    expect(parseCursorParams("?limit=5")).toEqual({ cursor: null, limit: 5 });
    expect(parseCursorParams(new Request(`${ORIGIN}/x?limit=`))).toEqual({ cursor: null, limit: 20 });
    expect(parseCursorParams(new URLSearchParams("limit=3"), { maxLimit: 10, defaultLimit: 50 })).toEqual({ cursor: null, limit: 3 });
    expect(catchAppError(() => parseCursorParams("?limit=101")).fieldErrors?.limit).toBeDefined();
    expect(catchAppError(() => parseCursorParams("?limit=0")).code).toBe("VALIDATION");
    expect(catchAppError(() => parseCursorParams("?limit=2.5")).code).toBe("VALIDATION");
    expect(catchAppError(() => parseCursorParams("?cursor=has%20space")).fieldErrors?.cursor).toEqual(["Invalid cursor."]);
  });

  it("encodes and decodes opaque cursors with shape validation", () => {
    const schema = z.object({ createdAt: z.iso.datetime(), id: z.uuid() });
    const value = { createdAt: "2026-10-05T08:00:00.000Z", id: "0199a1b2-c3d4-7e5f-8a9b-0c1d2e3f4a5b" };
    const cursor = encodeCursor(value);
    expect(cursor).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeCursor(cursor, schema)).toEqual(value);
    expect(catchAppError(() => decodeCursor("bm90LWpzb24", schema)).code).toBe("VALIDATION");
    expect(catchAppError(() => decodeCursor(encodeCursor({ id: 1 }), schema)).code).toBe("VALIDATION");
  });

  it("splits limit+1 rows into a page and a next cursor", () => {
    expect(pageOf([1, 2, 3], 2, (last) => `c${last}`)).toEqual({ items: [1, 2], nextCursor: "c2" });
    expect(pageOf([1, 2], 2, (last) => `c${last}`)).toEqual({ items: [1, 2], nextCursor: null });
  });

  it("builds paginated envelopes", async () => {
    expect(await paginated([{ id: 1 }], "next").json()).toEqual({ data: [{ id: 1 }], nextCursor: "next" });
  });

  it("turns repeated query keys into arrays", () => {
    expect(searchParamsToObject(new URLSearchParams("a=1&b=2&b=3"))).toEqual({ a: "1", b: ["2", "3"] });
  });
});

describe("readJsonBody", () => {
  const post = (payload: string, headers: Record<string, string> = { "content-type": "application/json" }) =>
    new Request(`${ORIGIN}/x`, { method: "POST", body: payload, headers });

  it("parses JSON within the size limit", async () => {
    expect(await readJsonBody(post('{"a":1}'))).toEqual({ a: 1 });
    expect(await readJsonBody(post('{"a":1}', { "content-type": "application/merge-patch+json" }))).toEqual({ a: 1 });
  });

  it("rejects wrong content types, oversized and invalid bodies", async () => {
    await expect(readJsonBody(post("a=1", { "content-type": "application/x-www-form-urlencoded" }))).rejects.toThrow(/JSON/);
    await expect(readJsonBody(post(JSON.stringify({ text: "x".repeat(200) })), 100)).rejects.toThrow(/too large/);
    await expect(readJsonBody(post("{oops"))).rejects.toThrow(/not valid JSON/);
  });
});

describe("apiRoute", () => {
  const echo = apiRoute(
    {
      auth: "optional",
      input: {
        query: z.object({ q: z.string().max(10).optional() }),
        body: z.object({ name: z.string().min(1) }),
        params: z.object({ id: z.uuid() }),
      },
    },
    ({ actor, query, body, params }) => ({ userId: actor?.userId ?? null, q: query.q ?? null, name: body.name, id: params.id }),
  );
  const params = (id: string) => ({ params: Promise.resolve({ id }) });
  const id = "0199a1b2-c3d4-7e5f-8a9b-0c1d2e3f4a5b";

  it("validates params, query and body and wraps results in { data }", async () => {
    const response = await echo(
      new Request(`${ORIGIN}/api/v1/things/${id}?q=hi`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-request-id": "req-abcdef123" },
        body: JSON.stringify({ name: "Rudo" }),
      }),
      params(id),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("x-request-id")).toBe("req-abcdef123");
    expect(await response.json()).toEqual({ data: { userId: null, q: "hi", name: "Rudo", id } });

    const invalid = await echo(
      new Request(`${ORIGIN}/api/v1/things/${id}?q=${"x".repeat(20)}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "" }),
      }),
      params(id),
    );
    expect(invalid.status).toBe(422);
    expect(await invalid.json()).toMatchObject({ error: { code: "VALIDATION", fieldErrors: { q: expect.any(Array) } } });

    const badParam = await echo(new Request(`${ORIGIN}/x`, { method: "POST" }), params("nope"));
    expect(badParam.status).toBe(422);
  });

  it("requires authentication when asked, with bearer tokens or cookies", async () => {
    const me = apiRoute({ auth: "required" }, ({ actor, auth }) => ({ userId: actor.userId, via: auth.via }));
    const anonymous = await me(new Request(`${ORIGIN}/api/v1/me`));
    expect(anonymous.status).toBe(401);
    expect(await anonymous.json()).toMatchObject({ error: { code: "UNAUTHENTICATED" } });

    const { user } = await createStudent();
    const api = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    const withBearer = await me(new Request(`${ORIGIN}/api/v1/me`, { headers: { authorization: `Bearer ${api.token}` } }));
    expect(await body(withBearer)).toEqual({ data: { userId: user.id, via: "bearer" } });

    const badBearer = await me(new Request(`${ORIGIN}/api/v1/me`, { headers: { authorization: "Bearer dz_nope" } }));
    expect(badBearer.status).toBe(401);
    const malformed = await me(new Request(`${ORIGIN}/api/v1/me`, { headers: { authorization: "Basic abc" } }));
    expect(malformed.status).toBe(401);

    // A web cookie token is not accepted as a bearer token, and bearer requests ignore cookies.
    const web = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const cookieAsBearer = await me(new Request(`${ORIGIN}/api/v1/me`, { headers: { authorization: `Bearer ${web.token}` } }));
    expect(cookieAsBearer.status).toBe(401);
    const withCookie = await me(new Request(`${ORIGIN}/api/v1/me`, { headers: { cookie: `dz_session=${web.token}` } }));
    expect(await body(withCookie)).toEqual({ data: { userId: user.id, via: "cookie" } });
  });

  it("refuses cross-site unsafe requests authenticated by cookie (CSRF), allows same-origin ones", async () => {
    const mutate = apiRoute({ auth: "required" }, () => undefined);
    const { user } = await createStudent();
    const web = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const cookie = `dz_session=${web.token}`;

    const crossSite = await mutate(new Request(`${ORIGIN}/api/v1/x`, { method: "POST", headers: { cookie, origin: "https://evil.example" } }));
    expect(crossSite.status).toBe(403);
    const noOrigin = await mutate(new Request(`${ORIGIN}/api/v1/x`, { method: "DELETE", headers: { cookie } }));
    expect(noOrigin.status).toBe(403);
    const nullOrigin = await mutate(new Request(`${ORIGIN}/api/v1/x`, { method: "POST", headers: { cookie, origin: "null" } }));
    expect(nullOrigin.status).toBe(403);

    const sameOrigin = await mutate(new Request(`${ORIGIN}/api/v1/x`, { method: "POST", headers: { cookie, origin: ORIGIN } }));
    expect(sameOrigin.status).toBe(204);
    const fetchMetadata = await mutate(
      new Request(`${ORIGIN}/api/v1/x`, { method: "PATCH", headers: { cookie, "sec-fetch-site": "same-origin" } }),
    );
    expect(fetchMetadata.status).toBe(204);
    // Safe methods need no origin check.
    const get = await mutate(new Request(`${ORIGIN}/api/v1/x`, { headers: { cookie } }));
    expect(get.status).toBe(204);

    // Bearer requests are not CSRF-prone.
    const api = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    const bearer = await mutate(
      new Request(`${ORIGIN}/api/v1/x`, { method: "POST", headers: { authorization: `Bearer ${api.token}`, origin: "https://app.example" } }),
    );
    expect(bearer.status).toBe(204);
  });

  it("refuses callers who must replace a school-set password (bearer and cookie) unless the route opts in", async () => {
    const strict = apiRoute({ auth: "required" }, ({ actor }) => actor.userId);
    const optional = apiRoute({ auth: "optional" }, ({ actor }) => actor?.userId ?? null);
    const lenient = apiRoute({ auth: "required", allowPendingPasswordChange: true }, ({ actor }) => actor.userId);
    const { user } = await createStudent();
    await db.user.update({ where: { id: user.id }, data: { passwordMustChange: true } });
    const api = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    const web = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const credentials: Record<string, string>[] = [{ authorization: `Bearer ${api.token}` }, { cookie: `dz_session=${web.token}` }];
    for (const headers of credentials) {
      for (const route of [strict, optional]) {
        const refused = await route(new Request(`${ORIGIN}/api/v1/x`, { headers }));
        expect(refused.status).toBe(403);
        expect(await refused.json()).toMatchObject({ error: { code: "FORBIDDEN" } });
      }
      expect(await body(await lenient(new Request(`${ORIGIN}/api/v1/x`, { headers })))).toEqual({ data: user.id });
    }
    // Anonymous callers of optional routes are unaffected.
    expect(await body(await optional(new Request(`${ORIGIN}/api/v1/x`)))).toEqual({ data: null });
  });

  it("limits signed-in callers per user: cookie sessions and every bearer token share one publicApi bucket", async () => {
    const route = apiRoute({ auth: "required" }, () => "ok");
    const unlimited = apiRoute({ auth: "required", rateLimit: false }, () => "ok");
    const { user } = await createStudent();
    const web = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const first = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    const second = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    // Hits in the current + previous fixed window (robust to a minute boundary between calls).
    const hits = async () => {
      const row = await db.rateLimitBucket.findUnique({ where: { key: `publicApi:${user.id}` }, select: { count: true, prevCount: true } });
      return row ? row.count + row.prevCount : 0;
    };

    expect((await route(new Request(`${ORIGIN}/x`, { headers: { cookie: `dz_session=${web.token}` } }))).status).toBe(200);
    expect(await hits()).toBe(1);
    expect((await route(new Request(`${ORIGIN}/x`, { headers: { authorization: `Bearer ${first.token}` } }))).status).toBe(200);
    expect((await route(new Request(`${ORIGIN}/x`, { headers: { authorization: `Bearer ${second.token}` } }))).status).toBe(200);
    expect(await hits()).toBe(3);
    // `rateLimit: false` (e.g. sign-out) never counts.
    expect((await unlimited(new Request(`${ORIGIN}/x`, { headers: { cookie: `dz_session=${web.token}` } }))).status).toBe(200);
    expect(await hits()).toBe(3);
  });

  it("checks permissions and roles", async () => {
    const publish = apiRoute({ auth: "required", permission: "content.publish" }, () => "ok");
    const schoolOnly = apiRoute({ auth: "optional", roles: ["SCHOOL_ADMIN"] }, () => "ok");
    const student = await createSession((await createStudent()).user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    const editor = await createSession((await createUser({ roles: ["CONTENT_EDITOR"] })).user.id, "API", testMeta(), {
      authMethod: "PASSWORD",
    });
    const asStudent = { headers: { authorization: `Bearer ${student.token}` } };
    const asEditor = { headers: { authorization: `Bearer ${editor.token}` } };
    expect((await publish(new Request(`${ORIGIN}/x`, asStudent))).status).toBe(403);
    expect(await body(await publish(new Request(`${ORIGIN}/x`, asEditor)))).toEqual({ data: "ok" });
    expect((await schoolOnly(new Request(`${ORIGIN}/x`))).status).toBe(401);
    expect((await schoolOnly(new Request(`${ORIGIN}/x`, asEditor))).status).toBe(403);
  });

  it("applies custom rate limits and maps AppErrors to HTTP responses", async () => {
    const key = `test-api:${crypto.randomUUID()}`;
    const limited = apiRoute(
      { auth: "none", rateLimit: () => ({ key, limit: 1, windowSeconds: 60 }) },
      () => {
        throw AppError.notFound("Nothing here.");
      },
    );
    const first = await limited(new Request(`${ORIGIN}/x`));
    expect(first.status).toBe(404);
    expect(await first.json()).toEqual({ error: { code: "NOT_FOUND", message: "Nothing here." } });
    const second = await limited(new Request(`${ORIGIN}/x`));
    expect(second.status).toBe(429);
    expect(Number(second.headers.get("retry-after"))).toBeGreaterThan(0);
  });

  it("passes Responses through with default headers and hides unexpected errors", async () => {
    const custom = apiRoute({ auth: "none", cacheControl: "public, max-age=300" }, () => Response.redirect(`${ORIGIN}/elsewhere`, 302));
    const redirected = await custom(new Request(`${ORIGIN}/x`));
    expect(redirected.status).toBe(302);
    expect(redirected.headers.get("cache-control")).toBe("public, max-age=300");
    expect(redirected.headers.get("x-request-id")).toBeTruthy();

    const broken = apiRoute({ auth: "none" }, () => {
      throw new Error("database password is hunter2");
    });
    const response = await broken(new Request(`${ORIGIN}/x`));
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).not.toContain("hunter2");
    expect(text).toContain("INTERNAL");
  });
});
