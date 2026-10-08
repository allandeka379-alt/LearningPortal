import { beforeEach, describe, expect, it, vi } from "vitest";
import { isAppError, type ErrorCode } from "@/server/lib/errors";
import { createCurriculumChain, createStudent, createUser } from "../../../tests/factories/index";

/** Cookie jar behind the mocked `next/headers` `cookies()`. */
const jar = new Map<string, string>();
/** Request headers behind the mocked `headers()` (the proxy's `x-dz-request-path`). */
const requestHeaders = new Map<string, string>();

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => new Headers([...requestHeaders.entries()]),
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const guards = await import("./guards");
const { createSession } = await import("./sessions");
const { testMeta } = await import("./testing");
const { db } = await import("@/server/db");

async function signInAs(userId: string): Promise<string> {
  const { token } = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD" });
  jar.set("dz_session", token);
  return token;
}

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

async function errorCodeOf(promise: Promise<unknown>): Promise<ErrorCode> {
  try {
    await promise;
  } catch (error) {
    if (isAppError(error)) return error.code;
    throw error;
  }
  throw new Error("expected an AppError");
}

beforeEach(() => {
  jar.clear();
  requestHeaders.clear();
});

describe("page guards (redirect)", () => {
  it("requireUser sends signed-out visitors to /login with a validated next", async () => {
    expect(await redirectOf(guards.requireUser({ next: "/app/practice" }))).toBe("/login?next=%2Fapp%2Fpractice");
    expect(await redirectOf(guards.requireRole("TEACHER", { next: "/teacher" }))).toBe("/login?next=%2Fteacher");
    expect(await redirectOf(guards.requireUser({ next: "//evil.example" }))).toBe("/login");
    jar.set("dz_session", "x".repeat(43));
    expect(await redirectOf(guards.requireUser())).toBe("/login");
  });

  it("requireUser returns the actor for a valid cookie", async () => {
    const { user } = await createUser({ roles: ["PARENT"] });
    await signInAs(user.id);
    const actor = await guards.requireUser();
    expect(actor.userId).toBe(user.id);
    expect(actor.channel).toBe("web");
  });

  it("requireRole / requirePermission send the wrong role to its own home area", async () => {
    const { user } = await createUser({ roles: ["PARENT"] });
    await signInAs(user.id);
    expect(await redirectOf(guards.requireRole("TEACHER"))).toBe("/parent");
    expect((await guards.requireRole("TEACHER", "PARENT")).userId).toBe(user.id);
    expect((await guards.requireRole("PARENT", { next: "/parent" })).userId).toBe(user.id);
    expect(await redirectOf(guards.requirePermission("content.publish"))).toBe("/parent");
    expect((await guards.requirePermission("child.view")).userId).toBe(user.id);
  });

  it("requireOnboardedStudent sends unfinished students to /onboarding", async () => {
    const { user } = await createStudent();
    await signInAs(user.id);
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/onboarding");
    // The page they were opening is kept for after the wizard (e.g. a class invitation link).
    expect(await redirectOf(guards.requireOnboardedStudent({ next: "/app/classes/invite/t1" }))).toBe("/onboarding?next=%2Fapp%2Fclasses%2Finvite%2Ft1");

    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, objectivesPerSubtopic: 0, lessonsPerTopic: 0 });
    const done = await createStudent({
      student: {
        onboardingCompleted: true,
        countryId: chain.country.id,
        examBoardId: chain.examBoard.id,
        qualificationId: chain.qualification.id,
      },
    });
    await signInAs(done.user.id);
    expect((await guards.requireOnboardedStudent()).studentOnboardingCompleted).toBe(true);

    const { user: parent } = await createUser({ roles: ["PARENT"] });
    await signInAs(parent.id);
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/parent");
  });

  // Layouts call the guards without `next` and usually redirect before the page's own guard: the requested page comes
  // from the proxy's x-dz-request-path header, so it is not lost.
  it("without an explicit next, layouts use the requested page forwarded by the proxy", async () => {
    requestHeaders.set("x-dz-request-path", "/app/classes/invite/t1");
    expect(await redirectOf(guards.requireUser())).toBe("/login?next=%2Fapp%2Fclasses%2Finvite%2Ft1");

    const { user } = await createStudent();
    await signInAs(user.id);
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/onboarding?next=%2Fapp%2Fclasses%2Finvite%2Ft1");
    // An explicit next wins; null means none.
    expect(await redirectOf(guards.requireOnboardedStudent({ next: "/app/practice" }))).toBe("/onboarding?next=%2Fapp%2Fpractice");
    expect(await redirectOf(guards.requireOnboardedStudent({ next: null }))).toBe("/onboarding");
    // The bare dashboard is not carried into the wizard; a hostile value is dropped.
    requestHeaders.set("x-dz-request-path", "/app");
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/onboarding");
    requestHeaders.set("x-dz-request-path", "//evil.example/x");
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/onboarding");

    // A school-set password: the layout's redirect keeps the page too.
    await db.user.update({ where: { id: user.id }, data: { passwordMustChange: true } });
    requestHeaders.set("x-dz-request-path", "/app/subjects?tab=all");
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/change-password?next=%2Fapp%2Fsubjects%3Ftab%3Dall");
  });
});

describe("Server Action guards (throw)", () => {
  it("throw UNAUTHENTICATED / FORBIDDEN instead of redirecting", async () => {
    expect(await errorCodeOf(guards.requireUserForAction())).toBe("UNAUTHENTICATED");
    const { user } = await createStudent();
    await signInAs(user.id);
    expect((await guards.requireUserForAction()).userId).toBe(user.id);
    expect(await errorCodeOf(guards.requireRoleForAction("ADMIN", "SUPER_ADMIN"))).toBe("FORBIDDEN");
    expect((await guards.requireRoleForAction("ADMIN", "STUDENT")).userId).toBe(user.id);
    expect(await errorCodeOf(guards.requirePermissionForAction("users.manage"))).toBe("FORBIDDEN");
    expect((await guards.requirePermissionForAction("ai.use")).userId).toBe(user.id);
    expect(await errorCodeOf(guards.requireOnboardedStudentForAction())).toBe("FORBIDDEN");
  });
});

describe("step-up guard", () => {
  it("requires authentication within the last 15 minutes", async () => {
    const { db } = await import("@/server/db");
    expect(await errorCodeOf(guards.requireRecentAuthForAction())).toBe("UNAUTHENTICATED");
    const { user } = await createUser({ roles: ["SUPER_ADMIN"] });
    const token = await signInAs(user.id);
    expect((await guards.requireRecentAuthForAction()).userId).toBe(user.id);
    const { sha256Hex } = await import("@/server/lib/crypto");
    await db.session.update({
      where: { tokenHash: sha256Hex(token) },
      data: { reauthenticatedAt: new Date(Date.now() - 20 * 60_000), createdAt: new Date(Date.now() - 20 * 60_000) },
    });
    expect(await errorCodeOf(guards.requireRecentAuthForAction())).toBe("FORBIDDEN");
  });
});

describe("Route Handler guards (bearer or same-origin cookie)", () => {
  it("authenticate bearer tokens and check roles / permissions", async () => {
    const request = (headers: Record<string, string> = {}) => new Request("http://localhost:3000/api/v1/x", { headers });
    expect(await errorCodeOf(guards.requireUserForApi(request()))).toBe("UNAUTHENTICATED");

    const { user } = await createUser({ roles: ["SUPER_ADMIN"] });
    const { token } = await createSession(user.id, "API", testMeta(), { authMethod: "PASSWORD" });
    const authed = request({ authorization: `Bearer ${token}` });
    const auth = await guards.requirePermissionForApi(authed, "settings.manage");
    expect(auth).toMatchObject({ via: "bearer", actor: { userId: user.id, channel: "api" } });
    expect((await guards.requireRoleForApi(authed, "SUPER_ADMIN")).actor.userId).toBe(user.id);
    expect(await errorCodeOf(guards.requireRoleForApi(authed, "STUDENT"))).toBe("FORBIDDEN");
    expect(await errorCodeOf(guards.requireOnboardedStudentForApi(authed))).toBe("FORBIDDEN");
  });
});
