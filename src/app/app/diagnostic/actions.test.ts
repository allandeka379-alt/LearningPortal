import { beforeEach, describe, expect, it, vi } from "vitest";
import type { QuestionResponse } from "@/components/questions/types";
import type { LearnerActor } from "@/server/attempts";
import { correctResponse, createEnrollment, createLearner, createLearningSetup } from "../../../../tests/factories/learning";

/**
 * Integration: the diagnostic Server Actions (§46, §52) — start (form post → first diagnostic's room), autosave,
 * clock and submit (→ the diagnostic report). The auth guard is mocked to "sign in" a fixture learner; the services,
 * attempt engine and database are real.
 */

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

const auth = vi.hoisted(() => ({ actor: null as LearnerActor | null }));

vi.mock("@/server/auth/guards", () => ({
  requireOnboardedStudentForAction: async () => {
    if (!auth.actor) throw new (await import("@/server/lib/errors")).AppError("UNAUTHENTICATED");
    return auth.actor;
  },
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const actions = await import("./actions");
const { db } = await import("@/server/db");

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

function form(fields: Record<string, string | string[]>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) for (const item of Array.isArray(value) ? value : [value]) data.append(key, item);
  return data;
}

beforeEach(() => {
  auth.actor = null;
});

describe("diagnostic Server Actions", () => {
  it("starts from a form post, autosaves, submits and links to the report", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 2 });
    const learner = await createLearner();
    await createEnrollment(learner.userId, setup);

    expect(await actions.startDiagnosticsAction(null, form({ subjectIds: setup.subjectId }))).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
    auth.actor = learner.actor;
    expect(await actions.startDiagnosticsAction(null, form({}))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { subjectIds: ["Choose at least one subject."] } },
    });

    const href = await redirectOf(actions.startDiagnosticsAction(null, form({ subjectIds: [setup.subjectId], idempotencyKey: "formkey123", from: "onboarding" })));
    const attemptId = href.split("/").pop() as string;
    expect(href).toBe(`/app/diagnostic/${attemptId}`);
    // The same form posted twice (double tap) opens the same diagnostic.
    expect(await redirectOf(actions.startDiagnosticsAction(null, form({ subjectIds: [setup.subjectId], idempotencyKey: "formkey123" })))).toBe(href);
    const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId }, select: { config: true, userId: true } });
    expect(attempt.userId).toBe(learner.userId);
    expect(attempt.config).toMatchObject({ origin: "ONBOARDING" });

    const slot = await db.questionAttempt.findFirstOrThrow({ where: { attemptId, position: 1 }, select: { questionId: true } });
    const definition = setup.questions.find((q) => q.id === slot.questionId)?.definition;
    if (!definition) throw new Error("question not in setup");
    const saved = await actions.saveDiagnosticResponseAction({ attemptId, position: 1, response: correctResponse(definition) as QuestionResponse, responseVersion: 1 });
    expect(saved).toMatchObject({ ok: true, data: { saved: true, answered: true } });
    expect(await actions.syncDiagnosticClockAction(attemptId)).toMatchObject({ ok: true, data: { attemptId, open: true, deadlineMs: null } });

    expect(await actions.submitDiagnosticAction({ attemptId, reason: "STUDENT" })).toEqual({
      ok: true,
      data: { submitted: true, resultsHref: `/app/diagnostic/${attemptId}/report` },
    });
    expect(await actions.saveDiagnosticResponseAction({ attemptId, position: 2, response: null, responseVersion: 1 })).toMatchObject({
      ok: false,
      error: { code: "CONFLICT" },
    });
  });
});
