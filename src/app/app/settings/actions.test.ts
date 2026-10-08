import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCurriculumChain, createStudent } from "../../../../tests/factories/index";

/**
 * Wiring tests for the settings Server Actions: form fields → guard → accounts / auth services → ActionResult.
 * `next/headers` (session cookie) and `next/cache` are mocked; the services and the database are real.
 */

const jar = new Map<string, string>();
let incomingHeaders = new Headers();
const revalidated = vi.hoisted(() => [] as string[]);

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => incomingHeaders,
}));
vi.mock("next/cache", () => ({ revalidatePath: (path: string) => void revalidated.push(path) }));

const actions = await import("./actions");
const { db } = await import("@/server/db");
const { createSession, currentSessionCookieName, validateSessionToken } = await import("@/server/auth/sessions");
const { randomIp, testMeta } = await import("@/server/auth/testing");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

/** An onboarded student signed in through the cookie jar. */
async function signedInStudent(options: { firstName?: string; lastName?: string | null } = {}) {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
  const { user } = await createStudent({
    ...options,
    student: { isMinor: false, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
  jar.set(currentSessionCookieName(), token);
  return { userId: user.id, token, chain };
}

beforeEach(() => {
  jar.clear();
  revalidated.length = 0;
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

describe("settings Server Actions", () => {
  it("saves the display name and refreshes the student area", async () => {
    const { userId } = await signedInStudent();
    expect(await actions.updateDisplayNameAction(null, form({ displayName: "  Tari " }))).toEqual({ ok: true, data: { message: "Name saved." } });
    expect((await db.profile.findUniqueOrThrow({ where: { userId } })).displayName).toBe("Tari");
    expect(revalidated).toContain("/app");

    const invalid = await actions.updateDisplayNameAction(null, form({ displayName: "" }));
    expect(invalid).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { displayName: expect.any(Array) } } });
  });

  it("saves time zone and daily goal, with empty meaning the default", async () => {
    const { userId } = await signedInStudent();
    expect((await actions.updateStudyPreferencesAction(null, form({ timezone: "Africa/Lusaka", dailyGoalMinutes: "40" })))?.ok).toBe(true);
    expect((await db.profile.findUniqueOrThrow({ where: { userId } })).timezone).toBe("Africa/Lusaka");
    expect((await db.learnerStats.findUniqueOrThrow({ where: { userId } })).dailyGoalMinutes).toBe(40);

    expect((await actions.updateStudyPreferencesAction(null, form({ timezone: "Africa/Lusaka", dailyGoalMinutes: "" })))?.ok).toBe(true);
    expect((await db.learnerStats.findUniqueOrThrow({ where: { userId } })).dailyGoalMinutes).toBeNull();

    const bad = await actions.updateStudyPreferencesAction(null, form({ timezone: "Africa/Lusaka", dailyGoalMinutes: "lots" }));
    expect(bad).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { dailyGoalMinutes: expect.any(Array) } } });
  });

  it("saves display preferences from cookie values", async () => {
    const { userId } = await signedInStudent();
    expect((await actions.saveDisplayPreferenceAction({ theme: "dark" }))?.ok).toBe(true);
    expect((await actions.saveDisplayPreferenceAction({ fontScale: "xl" }))?.ok).toBe(true);
    const profile = await db.profile.findUniqueOrThrow({ where: { userId } });
    expect([profile.theme, profile.fontScale]).toEqual(["DARK", "EXTRA_LARGE"]);
    expect(await actions.saveDisplayPreferenceAction({ theme: "neon" })).toMatchObject({ ok: false, error: { code: "VALIDATION" } });
  });

  it("opts in to leaderboards with a name mode, and out again (§20)", async () => {
    const { userId } = await signedInStudent({ firstName: "Tariro", lastName: "Moyo" });
    const on = await actions.updateLeaderboardPrivacyAction(null, form({ optIn: "on", display: "FIRST_NAME" }));
    expect(on).toMatchObject({ ok: true });
    expect(await db.profile.findUniqueOrThrow({ where: { userId }, select: { leaderboardOptIn: true, leaderboardDisplay: true } })).toEqual({
      leaderboardOptIn: true,
      leaderboardDisplay: "FIRST_NAME",
    });
    const off = await actions.updateLeaderboardPrivacyAction(null, form({ display: "FIRST_NAME" }));
    expect(off).toEqual({ ok: true, data: { message: "You're not on any leaderboard." } });
    expect((await db.profile.findUniqueOrThrow({ where: { userId } })).leaderboardOptIn).toBe(false);
  });

  it("signs out other devices but keeps this one", async () => {
    const { userId, token } = await signedInStudent();
    const other = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
    const result = await actions.signOutOtherDevicesAction();
    expect(result).toEqual({ ok: true, data: { message: "Signed out of 1 other device." } });
    expect(await validateSessionToken(other.token)).toBeNull();
    expect(await validateSessionToken(token)).not.toBeNull();
  });

  it("refuses signed-out visitors and students who have not finished onboarding", async () => {
    expect(await actions.updateDisplayNameAction(null, form({ displayName: "X" }))).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });

    const { user } = await createStudent({ student: { isMinor: false } });
    const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
    jar.set(currentSessionCookieName(), token);
    expect(await actions.updateDisplayNameAction(null, form({ displayName: "X" }))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });
  });
});
