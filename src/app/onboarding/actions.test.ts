import { beforeEach, describe, expect, it, vi } from "vitest";
import { createParent, createStudent } from "../../../tests/factories/identity";

/**
 * Integration: the onboarding Server Actions (§5) through a real cookie session: form → actor → onboarding service →
 * redirect to the next screen, or an ActionResult with field errors. `next/headers` (cookies) and `redirect` are
 * mocked; the session, service, catalogue, enrollment service and database are real.
 */

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

const jar = new Map<string, string>();
let incomingHeaders = new Headers();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => incomingHeaders,
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const { finishOnboardingAction, saveOnboardingStepAction } = await import("./actions");
const { db } = await import("@/server/db");
const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { randomIp, testMeta } = await import("@/server/auth/testing");
const { createOnboardingCatalogue } = await import("@/server/onboarding/testing");

function form(fields: Record<string, string | string[]>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    for (const item of Array.isArray(value) ? value : [value]) data.append(key, item);
  }
  return data;
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

async function signIn(userId: string, roles: ("STUDENT" | "PARENT")[]) {
  const { token } = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD", roles });
  jar.set(currentSessionCookieName(), token);
}

async function signedInStudent() {
  const { user } = await createStudent({ student: { isMinor: false } });
  await signIn(user.id, ["STUDENT"]);
  return user.id;
}

const save = (fields: Record<string, string | string[]>) => saveOnboardingStepAction(null, form(fields));

beforeEach(() => {
  jar.clear();
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

describe("onboarding Server Actions", () => {
  it("walks the wizard by form posts and completes it, enrolling the subjects with pinned syllabus versions", async () => {
    const catalogue = await createOnboardingCatalogue();
    const { chain } = catalogue;
    const userId = await signedInStudent();

    // Validation comes back as field errors; nothing moves.
    expect(await save({ step: "country" })).toEqual({
      ok: false,
      error: { code: "VALIDATION", message: expect.any(String), fieldErrors: { countryId: ["Choose your country."] } },
    });
    expect(await redirectOf(save({ step: "country", countryId: chain.country.id }))).toBe("/onboarding/board");
    expect(await redirectOf(save({ step: "board", examBoardId: chain.examBoard.id }))).toBe("/onboarding/level");
    expect(await redirectOf(save({ step: "level", qualificationId: chain.qualification.id }))).toBe("/onboarding/year");
    expect(await redirectOf(save({ step: "year", yearGroupId: catalogue.yearGroupId }))).toBe("/onboarding/subjects");
    expect(await save({ step: "subjects" })).toMatchObject({ ok: false, error: { fieldErrors: { subjectIds: ["Choose at least one subject."] } } });
    expect(await redirectOf(save({ step: "subjects", subjectIds: [chain.subject.id, catalogue.subjectB.id] }))).toBe("/onboarding/exam");

    // Resumable: the stored position survives a new "device" (same account, new session).
    jar.clear();
    await signIn(userId, ["STUDENT"]);
    const student = await db.student.findUniqueOrThrow({ where: { userId }, select: { onboardingStep: true, onboardingData: true } });
    expect(student.onboardingStep).toBe("TARGET_EXAM");
    expect(student.onboardingData).toMatchObject({ subjectIds: [chain.subject.id, catalogue.subjectB.id] });
    // A screen ahead of the stored position (stale page / another tab) sends the student back to where they are.
    expect(await redirectOf(save({ step: "ability", abilityLevel: "ADVANCED" }))).toBe("/onboarding");

    expect(await redirectOf(save({ step: "exam", targetExamSessionId: catalogue.session2028Id }))).toBe("/onboarding/ability");
    expect(await redirectOf(save({ step: "ability", abilityLevel: "ADVANCED" }))).toBe("/onboarding/grade");
    // No grade chosen at all = "no target yet".
    expect(await redirectOf(save({ step: "grade" }))).toBe("/onboarding/goal");
    // A typed amount wins over the chosen preset.
    expect(await save({ step: "goal", dailyGoalMinutes: "45", customDailyGoalMinutes: "700" })).toMatchObject({
      ok: false,
      error: { fieldErrors: { dailyGoalMinutes: ["Set at most 600 minutes."] } },
    });
    expect(await redirectOf(save({ step: "goal", dailyGoalMinutes: "45", customDailyGoalMinutes: "75" }))).toBe("/onboarding/finish");
    expect((await db.learnerStats.findUniqueOrThrow({ where: { userId } })).dailyGoalMinutes).toBe(75);

    expect(await saveOnboardingStepAction(null, form({ step: "finish" }))).toMatchObject({ ok: false, error: { code: "BAD_REQUEST" } });
    // No free tier (2026-10-12): a student without full access finishes on the unlock page, whatever they chose.
    expect(await redirectOf(finishOnboardingAction(null, form({ choice: "diagnostic" })))).toBe("/app/unlock");

    const enrolment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId: chain.subject.id } } });
    expect(enrolment).toMatchObject({ syllabusId: catalogue.upcomingSyllabusId, abilityLevel: "ADVANCED", targetGrade: null, targetExamSessionId: catalogue.session2028Id });
    expect((await db.student.findUniqueOrThrow({ where: { userId } })).onboardingCompletedAt).not.toBeNull();

    // Finished: the wizard's actions now send the student to the dashboard.
    jar.clear();
    await signIn(userId, ["STUDENT"]);
    expect(await redirectOf(save({ step: "country", countryId: chain.country.id }))).toBe("/app");
    expect(await redirectOf(finishOnboardingAction(null, form({ choice: "dashboard" })))).toBe("/app");
  });

  it("sends signed-out visitors to sign in and other roles to their own area", async () => {
    expect(await redirectOf(save({ step: "country", countryId: "x" }))).toBe("/login?next=%2Fonboarding");

    const { user: parent } = await createParent();
    await signIn(parent.id, ["PARENT"]);
    expect(await redirectOf(save({ step: "country", countryId: "x" }))).toBe("/parent");
    expect(await redirectOf(finishOnboardingAction(null, form({ choice: "dashboard" })))).toBe("/parent");
  });

  it("carries a validated next (e.g. a class invitation) through the screens and opens it at the end", async () => {
    const catalogue = await createOnboardingCatalogue();
    const { chain } = catalogue;
    await signedInStudent();
    const next = "/app/classes/invite/tok_123";
    const enc = encodeURIComponent(next);
    expect(await redirectOf(save({ step: "country", countryId: chain.country.id, next }))).toBe(`/onboarding/board?next=${enc}`);
    // Hostile or looping values are dropped, never followed.
    expect(await redirectOf(save({ step: "board", examBoardId: chain.examBoard.id, next: "https://evil.example/x" }))).toBe("/onboarding/level");
    expect(await redirectOf(save({ step: "level", qualificationId: chain.qualification.id, next: "/onboarding/finish" }))).toBe("/onboarding/year");
    expect(await redirectOf(save({ step: "year", yearGroupId: catalogue.yearGroupId, next }))).toBe(`/onboarding/subjects?next=${enc}`);
    expect(await redirectOf(save({ step: "subjects", subjectIds: [chain.subject.id], next }))).toBe(`/onboarding/exam?next=${enc}`);
    expect(await redirectOf(save({ step: "exam", targetExamSessionId: catalogue.session2028Id, next }))).toBe(`/onboarding/ability?next=${enc}`);
    expect(await redirectOf(save({ step: "ability", abilityLevel: "BEGINNER", next }))).toBe(`/onboarding/grade?next=${enc}`);
    expect(await redirectOf(save({ step: "grade", next }))).toBe(`/onboarding/goal?next=${enc}`);
    expect(await redirectOf(save({ step: "goal", dailyGoalMinutes: "30", next }))).toBe(`/onboarding/finish?next=${enc}`);
    // The pending destination wins over the dashboard once set up.
    expect(await redirectOf(finishOnboardingAction(null, form({ choice: "dashboard", next })))).toBe(next);
  });

  it("asks for the earlier answers before completing", async () => {
    await signedInStudent();
    expect(await redirectOf(finishOnboardingAction(null, form({ choice: "dashboard" })))).toBe("/onboarding");
    expect(await saveOnboardingStepAction(null, form({ step: "nonsense" }))).toMatchObject({ ok: false, error: { code: "BAD_REQUEST" } });
  });
});
