import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStudent } from "../../../../tests/factories/identity";
import { UNLIMITED_LEARNING_FEATURES, createEnrollment, createLearningSetup, grantLearnerFeatures } from "../../../../tests/factories/learning";

/**
 * Wiring tests for the study plan Server Actions (§16): form → guard → study plan service → ActionResult.
 * `next/headers` and `next/cache` are mocked; services and the database are real.
 */

const jar = new Map<string, string>();
let incomingHeaders = new Headers();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => incomingHeaders,
}));
vi.mock("next/cache", () => ({ revalidatePath: () => undefined }));

const { adaptPlanAction, createPlanAction, updatePlanItemAction } = await import("./actions");
const { db } = await import("@/server/db");
const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { randomIp, testMeta } = await import("@/server/auth/testing");

function form(fields: Record<string, string | string[]>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    for (const v of Array.isArray(value) ? value : [value]) data.append(key, v);
  }
  return data;
}

const WEEK = { "availability.mon": "45", "availability.tue": "45", "availability.wed": "45", "availability.thu": "45", "availability.fri": "45", "availability.sat": "60", "availability.sun": "30" };

async function signedInStudent() {
  const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 1, questionsPerLeaf: 3 });
  const { user } = await createStudent({
    student: { isMinor: false, countryId: setup.chain.country.id, examBoardId: setup.chain.examBoard.id, qualificationId: setup.qualificationId, onboardingCompleted: true },
  });
  await grantLearnerFeatures(user.id, { ...UNLIMITED_LEARNING_FEATURES });
  await createEnrollment(user.id, setup);
  const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
  jar.set(currentSessionCookieName(), token);
  return { userId: user.id, setup };
}

beforeEach(() => {
  jar.clear();
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

describe("study plan Server Actions", () => {
  it("creates a plan from the form, ticks an item, adapts and rebuilds it", async () => {
    const { userId, setup } = await signedInStudent();

    const invalid = await createPlanAction(null, form({ subjectId: setup.subjectId, examDate: "", ...WEEK, "availability.mon": "abc" }));
    expect(invalid).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { "availability.mon": ["Enter the minutes as a number."] } } });
    const empty = await createPlanAction(null, form({ examDate: "", ...WEEK }));
    expect(empty).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { subjectIds: ["Choose at least one subject."] } } });
    expect(await db.studyPlan.count({ where: { userId } })).toBe(0);

    const created = await createPlanAction(null, form({ mode: "create", subjectId: setup.subjectId, examDate: "", ...WEEK }));
    expect(created).toEqual({ ok: true, data: { message: "Your study plan is ready." } });
    const plan = await db.studyPlan.findFirstOrThrow({ where: { userId, status: "ACTIVE" } });
    expect(plan.weeklyTargetMinutes).toBe(315);
    expect(plan.inputs).toMatchObject({ examDateSource: "NONE" });

    const item = await db.studyPlanItem.findFirstOrThrow({ where: { planId: plan.id }, orderBy: [{ date: "asc" }, { sortOrder: "asc" }] });
    expect(await updatePlanItemAction(null, form({ itemId: item.id, status: "DONE" }))).toEqual({ ok: true, data: { message: "Marked as done." } });
    expect(await db.studyPlanItem.findUniqueOrThrow({ where: { id: item.id }, select: { status: true } })).toEqual({ status: "DONE" });
    expect(await updatePlanItemAction(null, form({ itemId: item.id, status: "LATER" }))).toMatchObject({ ok: false, error: { code: "VALIDATION" } });
    expect(await updatePlanItemAction(null, form({ itemId: "not-an-id", status: "SKIPPED" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });

    const adapted = await adaptPlanAction();
    expect(adapted?.ok).toBe(true);
    expect(await db.studyPlanItem.findUniqueOrThrow({ where: { id: item.id }, select: { status: true } })).toEqual({ status: "DONE" });

    const rebuilt = await createPlanAction(null, form({ mode: "edit", subjectId: setup.subjectId, examDate: "", ...WEEK, "availability.sun": "0" }));
    expect(rebuilt).toEqual({ ok: true, data: { message: "Your plan was rebuilt with your new settings." } });
    expect(await db.studyPlan.count({ where: { userId, status: "ACTIVE" } })).toBe(1);
    expect(await db.studyPlan.findUniqueOrThrow({ where: { id: plan.id }, select: { status: true } })).toEqual({ status: "SUPERSEDED" });
  });

  it("asks a signed-out visitor to sign in", async () => {
    expect(await createPlanAction(null, form({ examDate: "", ...WEEK }))).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
    expect(await adaptPlanAction()).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
  });
});
