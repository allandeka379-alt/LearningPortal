import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { createUser, uniqueEmail, uniqueId, uniquePhone } from "../../../tests/factories/index";

/**
 * Wiring tests for the auth Server Actions: form fields → service → cookies → redirect. `next/headers` and
 * `redirect()` are mocked; the services and the database are real. Accounts are email-based (owner decision
 * 2026-10-07): codes go by email, which is account email and is sent whatever the `features` flags say.
 */

const jar = new Map<string, string>();
let incomingHeaders = new Headers();

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string, options?: { maxAge?: number }) => {
      if (options?.maxAge === 0) jar.delete(name);
      else jar.set(name, value);
    },
  }),
  headers: async () => incomingHeaders,
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const { loginAction, requestLoginCodeAction } = await import("./login/actions");
const { registerAction } = await import("./register/actions");
const { verifyCodeAction, resendCodeAction } = await import("./verify/actions");
const { requestPasswordResetAction } = await import("./forgot-password/actions");
const { resetPasswordAction } = await import("./reset-password/actions");
const { changePasswordAction } = await import("./change-password/actions");
const { changeEmailAction } = await import("./change-email/actions");
const { logoutAction } = await import("./actions");
const { validateSessionToken } = await import("@/server/auth/sessions");
const { latestCodeFor, randomIp, TEST_PASSWORD, testPasswordHash } = await import("@/server/auth/testing");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    const result = await promise;
    throw new Error(`expected a redirect, got ${JSON.stringify(result)}`);
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
}

beforeEach(() => {
  jar.clear();
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

describe("auth Server Actions", () => {
  it("register with an email address → emailed code → logout through the forms", async () => {
    const email = uniqueEmail("actions-register");
    const location = await redirectOf(
      registerAction(null, form({ role: "PARENT", firstName: "Nyasha", identifier: email, password: TEST_PASSWORD, acceptTerms: "on" })),
    );
    expect(location).toBe("/verify");
    expect(jar.has("dz_auth_flow")).toBe(true);
    expect(jar.get("dz_auth_flow")).not.toContain(email.split("@")[0]);

    const wrong = await verifyCodeAction(null, form({ code: "00000" }));
    expect(wrong).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { code: expect.any(Array) } } });

    expect(await resendCodeAction()).toMatchObject({ ok: false, error: { code: "RATE_LIMITED" } });

    expect(await redirectOf(verifyCodeAction(null, form({ code: latestCodeFor(email) })))).toBe("/parent");
    const token = jar.get("dz_session");
    expect(token).toBeTruthy();
    expect(jar.has("dz_auth_flow")).toBe(false);
    expect(await validateSessionToken(token)).not.toBeNull();

    expect(await redirectOf(logoutAction())).toBe("/");
    expect(jar.has("dz_session")).toBe(false);
    expect(await validateSessionToken(token)).toBeNull();
  });

  it("login returns field errors and re-fill values (never the password) on failure", async () => {
    const state = await loginAction(null, form({ identifier: "nobody@example.test", password: "wrong", next: "/app" }));
    expect(state).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" }, values: { identifier: "nobody@example.test", next: "/app" } });
    expect(JSON.stringify(state)).not.toContain("wrong");

    const empty = await loginAction(null, form({}));
    expect(empty).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { identifier: expect.any(Array), password: expect.any(Array) } } });
  });

  it("login sets the session cookie, rotates any previous session and redirects to a validated next", async () => {
    const { user } = await createUser({ roles: ["TEACHER"], passwordHash: await testPasswordHash(), emailVerified: true });
    const first = await redirectOf(loginAction(null, form({ identifier: user.emailNormalized!, password: TEST_PASSWORD, next: "/teacher/classes" })));
    expect(first).toBe("/teacher/classes");
    const firstToken = jar.get("dz_session")!;

    const second = await redirectOf(loginAction(null, form({ identifier: user.emailNormalized!, password: TEST_PASSWORD, next: "https://evil.example" })));
    expect(second).toBe("/teacher");
    expect(jar.get("dz_session")).not.toBe(firstToken);
    expect(await validateSessionToken(firstToken)).toBeNull();
  });

  it("remembers the browser after a sign-in, so a lock set by someone else does not refuse its correct password", async () => {
    const { user } = await createUser({ roles: ["STUDENT"], passwordHash: await testPasswordHash(), emailVerified: true });
    const email = user.emailNormalized!;
    await redirectOf(loginAction(null, form({ identifier: email, password: TEST_PASSWORD })));
    expect(jar.get("dz_device")).toBeTruthy();
    // Someone else (another IP, no device cookie) locks the account.
    await db.user.update({ where: { id: user.id }, data: { lockedUntil: new Date(Date.now() + 15 * 60_000) } });
    jar.delete("dz_session");
    incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
    expect(await redirectOf(loginAction(null, form({ identifier: email, password: TEST_PASSWORD })))).toBe("/onboarding");
    // A browser without the cookie is still refused (the owner's sign-in cleared the lock, so lock again).
    await db.user.update({ where: { id: user.id }, data: { lockedUntil: new Date(Date.now() + 15 * 60_000) } });
    jar.clear();
    expect(await loginAction(null, form({ identifier: email, password: TEST_PASSWORD }))).toMatchObject({ ok: false, error: { code: "RATE_LIMITED" } });
  });

  it("register refuses a mobile number: sign-up is by email (no SMS)", async () => {
    const state = await registerAction(null, form({ role: "STUDENT", firstName: "Rudo", identifier: `0${uniquePhone().slice(4)}`, password: TEST_PASSWORD, acceptTerms: "on" }));
    expect(state).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { identifier: [expect.stringContaining("email")] } } });
    expect(jar.has("dz_auth_flow")).toBe(false);
  });

  it("code sign-in and password reset go through their pages (by email)", async () => {
    const { user } = await createUser({ roles: ["STUDENT"], passwordHash: await testPasswordHash(), emailVerified: true });
    const email = user.emailNormalized!;
    expect(await redirectOf(requestLoginCodeAction(null, form({ identifier: email })))).toBe("/verify");
    expect(await redirectOf(verifyCodeAction(null, form({ code: latestCodeFor(email) })))).toBe("/onboarding");

    jar.clear();
    expect(await redirectOf(requestPasswordResetAction(null, form({ identifier: email })))).toBe("/reset-password");
    const mismatch = await resetPasswordAction(null, form({ code: latestCodeFor(email), password: "new long phrase", confirmPassword: "different" }));
    expect(mismatch).toMatchObject({ ok: false, error: { fieldErrors: { confirmPassword: expect.any(Array) } } });
    expect(
      await redirectOf(
        resetPasswordAction(null, form({ code: latestCodeFor(email), password: "new long phrase", confirmPassword: "new long phrase" })),
      ),
    ).toBe("/onboarding");
  });

  it("change email: password + new address, then the code emailed to it", async () => {
    const { user } = await createUser({ roles: ["PARENT"], passwordHash: await testPasswordHash(), emailVerified: true, extensions: true });
    await redirectOf(loginAction(null, form({ identifier: user.emailNormalized!, password: TEST_PASSWORD })));
    const next = uniqueEmail("actions-new-email");
    const wrongPassword = await changeEmailAction(null, form({ step: "request", email: next, currentPassword: "not it" }));
    expect(wrongPassword).toMatchObject({ ok: false, error: { fieldErrors: { currentPassword: expect.any(Array) } }, values: { step: "request", email: next } });

    const sent = await changeEmailAction(null, form({ step: "request", email: next.toUpperCase(), currentPassword: TEST_PASSWORD }));
    expect(sent).toMatchObject({ ok: true, values: { step: "confirm", email: next } });
    expect(JSON.stringify(sent)).not.toContain(TEST_PASSWORD);
    const done = await changeEmailAction(null, form({ step: "confirm", email: next, code: latestCodeFor(next) }));
    expect(done).toMatchObject({ ok: true, values: { step: "done" } });
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).emailNormalized).toBe(next);
  });

  it("code pages without a pending flow send the visitor back", async () => {
    expect(await redirectOf(verifyCodeAction(null, form({ code: "123456" })))).toBe("/login?error=flow_expired");
    expect(await redirectOf(resetPasswordAction(null, form({ code: "123456" })))).toBe("/forgot-password");
  });

  it("a school-set password goes to /change-password; saving it clears the flag and continues to next", async () => {
    const username = `t.${uniqueId("cp").replace(/-/g, "")}`.slice(0, 30);
    const user = await db.user.create({
      data: {
        loginUsername: username,
        passwordHash: await testPasswordHash(),
        passwordMustChange: true,
        roles: ["PARENT"],
        profile: { create: { firstName: "Tafadzwa", displayName: "Tafadzwa", termsAcceptedAt: new Date(), termsVersion: "2026-10" } },
        parent: { create: {} },
      },
    });
    expect(await redirectOf(loginAction(null, form({ identifier: username, password: TEST_PASSWORD, next: "/parent/children" })))).toBe(
      "/change-password?next=%2Fparent%2Fchildren",
    );
    const forcedToken = jar.get("dz_session")!;

    const mismatch = await changePasswordAction(null, form({ currentPassword: TEST_PASSWORD, password: "my own long phrase", confirmPassword: "other", next: "/parent/children" }));
    expect(mismatch).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { confirmPassword: expect.any(Array) } } });
    expect(JSON.stringify(mismatch)).not.toContain("my own long phrase");

    const done = await redirectOf(
      changePasswordAction(null, form({ currentPassword: TEST_PASSWORD, password: "my own long phrase", confirmPassword: "my own long phrase", next: "https://evil.example" })),
    );
    expect(done).toBe("/parent");
    expect(jar.get("dz_session")).not.toBe(forcedToken);
    expect(await validateSessionToken(forcedToken)).toBeNull();
    expect((await validateSessionToken(jar.get("dz_session")!))?.user.passwordMustChange).toBe(false);
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).passwordMustChange).toBe(false);

    jar.clear();
    expect(await redirectOf(changePasswordAction(null, form({ currentPassword: "x", password: "y", confirmPassword: "y" })))).toBe("/login");
  });
});
