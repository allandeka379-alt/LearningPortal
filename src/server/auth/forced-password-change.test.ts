import { describe, expect, it, vi, beforeEach } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createSchoolMember, uniqueId } from "../../../tests/factories/index";

/**
 * Forced password change for school-provisioned accounts (§23; User.passwordMustChange), end to end: a school admin
 * resets a student's password → the student signs in with the slip → the sign-in goes to /change-password and every
 * guard (page, action, API) holds them there → the change clears the flag, signs out every other session and is
 * audited → the guards let them through.
 */

const jar = new Map<string, string>();

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
  headers: async () => new Headers(),
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const guards = await import("./guards");
const { changePassword, loginWithPassword, TERMS_VERSION } = await import("./flows");
const { actorFromSession } = await import("./actor");
const { validateSessionToken } = await import("./sessions");
const { hashPassword } = await import("./passwords");
const { testMeta } = await import("./testing");
const { resetStudentPassword } = await import("@/server/schools/students");
const { schoolWithAdmin } = await import("@/server/schools/testing");

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

async function appErrorOf(promise: Promise<unknown>): Promise<{ code: string; reason: unknown; fieldErrors: unknown }> {
  try {
    await promise;
  } catch (error) {
    if (isAppError(error)) return { code: error.code, reason: (error.details as { reason?: unknown } | undefined)?.reason, fieldErrors: error.fieldErrors };
    throw error;
  }
  throw new Error("expected an AppError");
}

/** A roster-provisioned username student of a fresh school, plus the school's admin. */
async function provisionedStudent() {
  const { school, adminActor } = await schoolWithAdmin();
  if (!adminActor) throw new Error("expected an admin actor");
  const username = `t.${uniqueId("p").replace(/-/g, "")}`.slice(0, 30);
  const user = await db.user.create({
    data: {
      loginUsername: username,
      passwordHash: await hashPassword("old-school-password-1"),
      roles: ["STUDENT"],
      provisionedBySchoolId: school.id,
      contactPhoneE164: "+263771234567",
      profile: { create: { firstName: "Rudo", lastName: "Ncube", displayName: "Rudo" } },
      student: { create: { isMinor: true, guardianConsentStatus: "PENDING" } },
    },
  });
  await createSchoolMember({ schoolId: school.id, userId: user.id, role: "STUDENT" });
  return { school, adminActor, user, username };
}

beforeEach(() => {
  jar.clear();
});

describe("forced password change after a school-set password", () => {
  it("holds the student at /change-password until they choose their own, then lets them through", async () => {
    const { school, adminActor, user, username } = await provisionedStudent();
    const slip = await resetStudentPassword(adminActor, { schoolId: school.id, userId: user.id });
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).passwordMustChange).toBe(true);

    // Sign-in with the slip: the session is created, but the destination is the change-password page (next kept).
    const login = await loginWithPassword({ identifier: username, password: slip.temporaryPassword, next: "/app/practice" }, testMeta());
    if (login.kind !== "session") throw new Error("expected a session");
    expect(login.redirectTo).toBe("/change-password?next=%2Fapp%2Fpractice");
    const other = await loginWithPassword({ identifier: username, password: slip.temporaryPassword }, testMeta());
    if (other.kind !== "session") throw new Error("expected a session");
    expect(other.redirectTo).toBe("/change-password");

    // Every guard flavour holds the user there; the flag comes with the session user (no extra query).
    jar.set("dz_session", login.token);
    const validated = (await validateSessionToken(login.token))!;
    expect(validated.user.passwordMustChange).toBe(true);
    const actor = actorFromSession(validated);
    expect(actor.passwordMustChange).toBe(true);
    expect(await redirectOf(guards.requireUser({ next: "/app/practice" }))).toBe("/change-password?next=%2Fapp%2Fpractice");
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/change-password");
    expect(await redirectOf(guards.requireRole("STUDENT"))).toBe("/change-password");
    expect(await appErrorOf(guards.requireUserForAction())).toMatchObject({ code: "FORBIDDEN", reason: "password_change_required" });
    expect(await appErrorOf(guards.requireRoleForAction("STUDENT"))).toMatchObject({ code: "FORBIDDEN", reason: "password_change_required" });
    const apiRequest = new Request("http://localhost:3000/api/v1/tutor/conversations", { headers: { authorization: `Bearer ${login.token}` } });
    // A WEB session token is not an API token; the cookie path is what the web uses.
    const cookieRequest = new Request("http://localhost:3000/api/v1/tutor/conversations", { headers: { cookie: `dz_session=${login.token}` } });
    expect((await appErrorOf(guards.requireUserForApi(apiRequest))).code).toBe("UNAUTHENTICATED");
    expect(await appErrorOf(guards.requireUserForApi(cookieRequest))).toMatchObject({ code: "FORBIDDEN", reason: "password_change_required" });

    // The new password must differ from the school's and pass the policy.
    expect(
      await appErrorOf(changePassword(actor, { currentPassword: slip.temporaryPassword, password: slip.temporaryPassword, confirmPassword: slip.temporaryPassword }, testMeta())),
    ).toMatchObject({ code: "VALIDATION", fieldErrors: { password: [expect.stringContaining("different from the one your school gave you")] } });
    expect((await appErrorOf(changePassword(actor, { currentPassword: "wrong", password: "my own river song", confirmPassword: "my own river song" }, testMeta()))).code).toBe(
      "VALIDATION",
    );

    // A provisioned account never accepted the terms: the forced change records them (and insists).
    expect(
      await appErrorOf(changePassword(actor, { currentPassword: slip.temporaryPassword, password: "my own river song", confirmPassword: "my own river song" }, testMeta())),
    ).toMatchObject({ code: "VALIDATION", fieldErrors: { acceptTerms: [expect.any(String)] } });
    const changed = await changePassword(
      actor,
      { currentPassword: slip.temporaryPassword, password: "my own river song", confirmPassword: "my own river song" },
      testMeta(),
      { next: "/app/practice", acceptTerms: true },
    );
    expect(await db.profile.findUniqueOrThrow({ where: { userId: user.id }, select: { termsVersion: true } })).toEqual({ termsVersion: TERMS_VERSION });
    // The student has not finished onboarding, so onboarding still comes first (then the original next).
    expect(changed.redirectTo).toBe("/onboarding?next=%2Fapp%2Fpractice");
    const stored = await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { passwordMustChange: true } });
    expect(stored.passwordMustChange).toBe(false);
    // Every other session (including the one used to change it) is signed out; the fresh one works.
    expect(await validateSessionToken(login.token)).toBeNull();
    expect(await validateSessionToken(other.token)).toBeNull();
    const fresh = await validateSessionToken(changed.token);
    expect(fresh?.user.passwordMustChange).toBe(false);
    const audit = await db.auditLog.findFirstOrThrow({ where: { action: "auth.password.change", targetUserId: user.id } });
    expect(audit.metadata).toMatchObject({ forced: true, sessionsRevoked: 2 });
    expect(JSON.stringify(audit)).not.toContain("my own river song");

    // Guards now let the student through to their area.
    jar.set("dz_session", changed.token);
    expect((await guards.requireUserForAction()).userId).toBe(user.id);
    expect((await guards.requireUser()).passwordMustChange).toBe(false);
    expect(await redirectOf(guards.requireOnboardedStudent())).toBe("/onboarding");

    // A later sign-in with the new password goes straight on.
    const again = await loginWithPassword({ identifier: username, password: "my own river song", next: "/onboarding" }, testMeta());
    expect(again.kind === "session" && again.redirectTo).toBe("/onboarding");
  });

  it("is not required for ordinary accounts and a voluntary change keeps next", async () => {
    const { user, username } = await provisionedStudent();
    await db.user.update({ where: { id: user.id }, data: { passwordMustChange: false } });
    const login = await loginWithPassword({ identifier: username, password: "old-school-password-1" }, testMeta());
    if (login.kind !== "session") throw new Error("expected a session");
    expect(login.redirectTo).toBe("/onboarding");
    const actor = actorFromSession((await validateSessionToken(login.token))!);
    expect(actor.passwordMustChange).toBe(false);
    const changed = await changePassword(actor, { currentPassword: "old-school-password-1", password: "another long phrase", confirmPassword: "another long phrase" }, testMeta());
    const audit = await db.auditLog.findFirstOrThrow({ where: { action: "auth.password.change", targetUserId: user.id } });
    expect(audit.metadata).toMatchObject({ forced: false });
    expect(await validateSessionToken(changed.token)).not.toBeNull();
  });
});
