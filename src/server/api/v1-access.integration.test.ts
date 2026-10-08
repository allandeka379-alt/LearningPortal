import { randomUUID } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { createSession } from "@/server/auth/sessions";
import { randomIp, testMeta } from "@/server/auth/testing";
import { db } from "@/server/db";
import { getEnv } from "@/server/lib/env";
import { createNotification } from "@/server/notifications";
import { createEnrollment, createLearner, createLearningSetup, createParent, createTeacher } from "../../../tests/factories/index";
import type { ApiOperation, HttpMethod } from "./contract";
import { allOperations } from "./openapi";

// Auth and RBAC are checked on the AI routes too, so they are tested with AI switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Access rules of every `/api/v1` operation, driven by the contract so a new route cannot skip them:
 *
 * - each documented operation is implemented by a route module exporting its method;
 * - every authenticated operation answers 401 without credentials and with a bad / revoked token;
 * - student-only operations answer 403 to other roles;
 * - another user's resources are never served: NOT_FOUND (404) for ids (so ids cannot be probed), silently scoped for
 *   lists and bulk updates;
 * - cookie-authenticated unsafe requests must be same-origin (CSRF).
 */

const ORIGIN = new URL(getEnv().APP_URL).origin;
type RouteModule = Partial<Record<"GET" | "POST" | "DELETE", (request: Request, context?: { params?: Promise<Record<string, string>> }) => Promise<Response>>>;

/** Route module of each documented path (App Router folder layout). */
const ROUTES: Record<string, () => Promise<RouteModule>> = {
  "/auth/token": () => import("@/app/api/v1/auth/token/route"),
  "/auth/otp/request": () => import("@/app/api/v1/auth/otp/request/route"),
  "/auth/otp/verify": () => import("@/app/api/v1/auth/otp/verify/route"),
  "/me": () => import("@/app/api/v1/me/route"),
  "/catalogue/boards": () => import("@/app/api/v1/catalogue/boards/route"),
  "/catalogue/qualifications": () => import("@/app/api/v1/catalogue/qualifications/route"),
  "/catalogue/subjects": () => import("@/app/api/v1/catalogue/subjects/route"),
  "/enrollments": () => import("@/app/api/v1/enrollments/route"),
  "/dashboard": () => import("@/app/api/v1/dashboard/route"),
  "/subjects/{id}/topics": () => import("@/app/api/v1/subjects/[id]/topics/route"),
  "/lessons/{id}": () => import("@/app/api/v1/lessons/[id]/route"),
  "/practice/sessions": () => import("@/app/api/v1/practice/sessions/route"),
  "/practice/sessions/{id}": () => import("@/app/api/v1/practice/sessions/[id]/route"),
  "/practice/sessions/{id}/answers": () => import("@/app/api/v1/practice/sessions/[id]/answers/route"),
  "/practice/sessions/{id}/summary": () => import("@/app/api/v1/practice/sessions/[id]/summary/route"),
  "/practice/sessions/{id}/hints": () => import("@/app/api/v1/practice/sessions/[id]/hints/route"),
  "/practice/sessions/{id}/self-assessment": () => import("@/app/api/v1/practice/sessions/[id]/self-assessment/route"),
  "/practice/sessions/{id}/end": () => import("@/app/api/v1/practice/sessions/[id]/end/route"),
  "/progress": () => import("@/app/api/v1/progress/route"),
  "/study-plan/today": () => import("@/app/api/v1/study-plan/today/route"),
  "/flashcards/reviews": () => import("@/app/api/v1/flashcards/reviews/route"),
  "/daily-question": () => import("@/app/api/v1/daily-question/route"),
  "/daily-question/start": () => import("@/app/api/v1/daily-question/start/route"),
  "/daily-question/answer": () => import("@/app/api/v1/daily-question/answer/route"),
  "/flashcards/due": () => import("@/app/api/v1/flashcards/due/route"),
  "/flashcards/{id}/review": () => import("@/app/api/v1/flashcards/[id]/review/route"),
  "/notifications": () => import("@/app/api/v1/notifications/route"),
  "/notifications/read": () => import("@/app/api/v1/notifications/read/route"),
  "/openapi.json": () => import("@/app/api/v1/openapi.json/route"),
  "/tutor/conversations": () => import("@/app/api/v1/tutor/conversations/route"),
  "/tutor/conversations/{conversationId}/messages": () => import("@/app/api/v1/tutor/conversations/[conversationId]/messages/route"),
  "/search/suggest": () => import("@/app/api/v1/search/suggest/route"),
  "/uploads": () => import("@/app/api/v1/uploads/route"),
};

async function handlerFor(operation: Pick<ApiOperation, "method" | "path">) {
  const load = ROUTES[operation.path];
  if (!load) throw new Error(`no route module mapped for ${operation.path}`);
  const handler = (await load())[operation.method.toUpperCase() as Uppercase<HttpMethod>];
  if (!handler) throw new Error(`${operation.path} does not export ${operation.method.toUpperCase()}`);
  return handler;
}

interface Credentials {
  token?: string;
  cookie?: string;
  origin?: string;
}

/** Calls an operation with random ids in the path and an empty JSON body for writes. */
async function invoke(operation: ApiOperation, credentials: Credentials = {}, options: { params?: Record<string, string>; body?: unknown; query?: string } = {}): Promise<Response> {
  const handler = await handlerFor(operation);
  const params: Record<string, string> = {};
  let path = operation.path;
  for (const match of operation.path.matchAll(/\{([^}]+)\}/g)) {
    const name = match[1] as string;
    params[name] = options.params?.[name] ?? randomUUID();
    path = path.replace(`{${name}}`, params[name]);
  }
  const isWrite = operation.method !== "get";
  const body = options.body ?? (isWrite ? {} : undefined);
  const request = new Request(`${ORIGIN}/api/v1${path}${options.query ?? ""}`, {
    method: operation.method.toUpperCase(),
    headers: {
      "x-forwarded-for": randomIp(),
      ...(credentials.token ? { authorization: `Bearer ${credentials.token}` } : {}),
      ...(credentials.cookie ? { cookie: credentials.cookie } : {}),
      ...(credentials.origin ? { origin: credentials.origin } : {}),
      ...(body !== undefined ? { "content-type": "application/json" } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  return handler(request, { params: Promise.resolve(params) });
}

function operation(method: HttpMethod, path: string): ApiOperation {
  const found = allOperations().find((op) => op.method === method && op.path === path);
  if (!found) throw new Error(`unknown operation ${method} ${path}`);
  return found;
}

async function apiToken(userId: string): Promise<string> {
  return (await createSession(userId, "API", testMeta(), { authMethod: "PASSWORD" })).token;
}

async function errorCode(response: Response): Promise<string> {
  return ((await response.json()) as { error: { code: string } }).error.code;
}

describe("route modules", () => {
  it("implement every documented operation", async () => {
    expect(Object.keys(ROUTES).sort()).toEqual([...new Set(allOperations().map((op) => op.path))].sort());
    for (const op of allOperations()) await expect(handlerFor(op), `${op.method} ${op.path}`).resolves.toBeTypeOf("function");
  });
});

describe("authentication is required wherever the contract says so", () => {
  const authenticated = allOperations().filter((op) => op.auth === "bearer");

  it("answers 401 without credentials", async () => {
    expect(authenticated.length).toBeGreaterThan(20);
    for (const op of authenticated) {
      const response = await invoke(op);
      expect(response.status, `${op.method.toUpperCase()} ${op.path}`).toBe(401);
      expect(await errorCode(response)).toBe("UNAUTHENTICATED");
      expect(response.headers.get("x-request-id")).toBeTruthy();
    }
  });

  it("answers 401 to malformed, unknown and revoked bearer tokens", async () => {
    const learner = await createLearner();
    const revoked = await createSession(learner.userId, "API", testMeta(), { authMethod: "PASSWORD" });
    await db.session.update({ where: { id: revoked.session.id }, data: { revokedAt: new Date(), revokedReason: "test" } });
    const bad = ["not-a-token", `dz_${"A".repeat(43)}`, revoked.token];
    for (const op of authenticated) {
      for (const token of bad) expect((await invoke(op, { token })).status, `${op.method} ${op.path} with ${token.slice(0, 6)}`).toBe(401);
    }
  });

  it("serves the public operations without credentials", async () => {
    expect((await invoke(operation("get", "/openapi.json"))).status).toBe(200);
    // Auth routes are anonymous by design: a body error, not a 401.
    expect((await invoke(operation("post", "/auth/token"))).status).toBe(422);
    expect((await invoke(operation("post", "/auth/otp/request"))).status).toBe(422);
    expect((await invoke(operation("post", "/auth/otp/verify"))).status).toBe(422);
  });
});

describe("roles", () => {
  it("refuses student-only operations to parents and teachers (403)", async () => {
    const { user: parent } = await createParent();
    const { user: teacher } = await createTeacher();
    const tokens = [await apiToken(parent.id), await apiToken(teacher.id)];
    const studentOnly = allOperations().filter((op) => op.roles?.includes("STUDENT"));
    expect(studentOnly.length).toBeGreaterThan(12);
    for (const op of studentOnly) {
      for (const token of tokens) {
        const response = await invoke(op, { token });
        expect(response.status, `${op.method.toUpperCase()} ${op.path}`).toBe(403);
        expect(await errorCode(response)).toBe("FORBIDDEN");
      }
    }
  });

  it("serves role-neutral operations to any signed-in user", async () => {
    const { user: parent } = await createParent();
    const token = await apiToken(parent.id);
    expect((await invoke(operation("get", "/me"), { token })).status).toBe(200);
    expect((await invoke(operation("get", "/notifications"), { token })).status).toBe(200);
    expect((await invoke(operation("get", "/catalogue/boards"), { token })).status).toBe(200);
  });
});

describe("other users' resources", () => {
  it("are never served: sessions, summaries, answers, topics and reviews of another student are 404", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 2, gradeScheme: false });
    const owner = await createLearner();
    const other = await createLearner();
    await createEnrollment(owner.userId, setup);
    const ownerToken = await apiToken(owner.userId);
    const otherToken = await apiToken(other.userId);

    const started = await invoke(operation("post", "/practice/sessions"), { token: ownerToken }, { body: { subjectId: setup.subjectId, count: 2 } });
    expect(started.status).toBe(201);
    const sessionId = ((await started.json()) as { data: { session: { id: string } } }).data.session.id;

    const asOther = { token: otherToken };
    const params = { id: sessionId };
    for (const [method, path, body] of [
      ["get", "/practice/sessions/{id}", undefined],
      ["get", "/practice/sessions/{id}/summary", undefined],
      ["post", "/practice/sessions/{id}/hints", { position: 1 }],
      ["post", "/practice/sessions/{id}/self-assessment", { position: 1, pointIds: ["P1"] }],
      ["post", "/practice/sessions/{id}/end", {}],
    ] as const) {
      const response = await invoke(operation(method, path), asOther, { params, ...(body ? { body } : {}) });
      expect(response.status, path).toBe(404);
      expect(await errorCode(response)).toBe("NOT_FOUND");
    }
    expect((await db.assessmentAttempt.findUniqueOrThrow({ where: { id: sessionId } })).status).toBe("IN_PROGRESS");
    const answer = await invoke(operation("post", "/practice/sessions/{id}/answers"), asOther, {
      params,
      body: { position: 1, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } },
    });
    expect(answer.status).toBe(404);
    expect(await db.questionAttempt.count({ where: { attemptId: sessionId, markedAt: { not: null } } })).toBe(0);

    // A subject the other student does not take.
    expect((await invoke(operation("get", "/subjects/{id}/topics"), asOther, { params: { id: setup.subjectId } })).status).toBe(404);
    // The owner can read all of it.
    expect((await invoke(operation("get", "/practice/sessions/{id}"), { token: ownerToken }, { params })).status).toBe(200);
    expect((await invoke(operation("get", "/subjects/{id}/topics"), { token: ownerToken }, { params: { id: setup.subjectId } })).status).toBe(200);
  });

  it("scope notifications to their owner: lists never include, and bulk reads never touch, someone else's", async () => {
    const owner = await createLearner();
    const other = await createLearner();
    const mine = await createNotification(owner.userId, { type: "system.test", title: "For the owner", body: "Private." });
    const otherToken = await apiToken(other.userId);

    const list = (await (await invoke(operation("get", "/notifications"), { token: otherToken })).json()) as { data: { id: string }[] };
    expect(list.data.map((item) => item.id)).not.toContain(mine.id);

    const read = await invoke(operation("post", "/notifications/read"), { token: otherToken }, { body: { ids: [mine.id] } });
    expect(read.status).toBe(200);
    expect(await read.json()).toEqual({ data: { updated: 0 } });
    expect((await db.notification.findUniqueOrThrow({ where: { id: mine.id } })).readAt).toBeNull();
  });
});

describe("CSRF", () => {
  it("refuses cookie-authenticated writes from another site, accepts same-origin ones", async () => {
    const learner = await createLearner();
    const web = await createSession(learner.userId, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const cookie = `dz_session=${web.token}`;
    const markAll = operation("post", "/notifications/read");
    const crossSite = await invoke(markAll, { cookie, origin: "https://evil.example" }, { body: { all: true } });
    expect(crossSite.status).toBe(403);
    const sameOrigin = await invoke(markAll, { cookie, origin: ORIGIN }, { body: { all: true } });
    expect(sameOrigin.status).toBe(200);
    // Reads with a cookie need no Origin.
    expect((await invoke(operation("get", "/me"), { cookie })).status).toBe(200);
  });
});
