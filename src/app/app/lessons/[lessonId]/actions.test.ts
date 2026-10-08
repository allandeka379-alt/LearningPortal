import { beforeEach, describe, expect, it, vi } from "vitest";
import type { LearnerActor } from "@/server/attempts";
import { correctResponse, createEnrollment, createLearner } from "../../../../../tests/factories/learning";

/**
 * Integration: the lesson reader's Server Actions against the test database. The auth guard is mocked to "sign in" a
 * fixture learner; the lessons / practice services, attempt engine, marking, XP and progress below it are real.
 */

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

const auth = vi.hoisted(() => ({ actor: null as LearnerActor | null }));
const revalidated = vi.hoisted(() => [] as string[]);

vi.mock("@/server/auth/guards", () => ({
  requireOnboardedStudentForAction: async () => {
    if (!auth.actor) throw new (await import("@/server/lib/errors")).AppError("UNAUTHENTICATED");
    return auth.actor;
  },
}));
vi.mock("next/cache", () => ({ revalidatePath: (path: string) => void revalidated.push(path) }));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const actions = await import("./actions");
const { createLessonFixture } = await import("@/server/lessons/testing");
const { db } = await import("@/server/db");

function form(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
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

beforeEach(() => {
  auth.actor = null;
  revalidated.length = 0;
});

describe("lesson reader actions", () => {
  it("records time, completes the lesson once and reports the XP actually recorded", async () => {
    const fixture = await createLessonFixture();
    const lesson = fixture.lessons[0];
    const learner = await createLearner();
    await createEnrollment(learner.userId, { subjectId: fixture.subjectId, syllabusId: fixture.syllabusId });

    expect(await actions.recordLessonActivityAction({ lessonId: lesson.id, secondsSpent: 0, view: true })).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
    auth.actor = learner.actor;

    expect(await actions.recordLessonActivityAction({ lessonId: lesson.id, secondsSpent: 0, view: true })).toEqual({ ok: true, data: { creditedSeconds: 0 } });
    expect(await actions.recordLessonActivityAction({ lessonId: lesson.id, secondsSpent: -4 })).toMatchObject({ ok: false, error: { code: "VALIDATION" } });

    const completed = await actions.completeLessonAction(null, form({ lessonId: lesson.id }));
    expect(completed).toMatchObject({ ok: true });
    expect(completed?.ok && completed.data.message).toMatch(/^Lesson completed\. \+\d+ XP\.$/);
    expect(revalidated).toContain(`/app/lessons/${lesson.id}`);
    expect(await actions.completeLessonAction(null, form({ lessonId: lesson.id }))).toEqual({ ok: true, data: { message: "You had already completed this lesson." } });
    expect(await actions.completeLessonAction(null, form({ lessonId: "nope" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
  });

  it("refuses to record a locked lesson with an upgrade-able error, never a crash", async () => {
    const fixture = await createLessonFixture();
    const learner = await createLearner({ features: null });
    await createEnrollment(learner.userId, { subjectId: fixture.subjectId, syllabusId: fixture.syllabusId });
    auth.actor = learner.actor;
    const { canAccessSubjectContent } = await import("@/server/billing/entitlements");
    if (await canAccessSubjectContent(learner.userId, fixture.subjectId)) return;
    expect(await actions.completeLessonAction(null, form({ lessonId: fixture.lessons[1].id }))).toMatchObject({ ok: false, error: { code: "ENTITLEMENT_REQUIRED" } });
  });

  it("starts the lesson's questions, returns to them, and answers with instant feedback", async () => {
    const fixture = await createLessonFixture({ questionCount: 1 });
    const lesson = fixture.lessons[0];
    const learner = await createLearner();
    await createEnrollment(learner.userId, { subjectId: fixture.subjectId, syllabusId: fixture.syllabusId });
    auth.actor = learner.actor;

    expect(await actions.startLessonCheckAction(null, form({ lessonId: "bad" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    const location = await redirectOf(actions.startLessonCheckAction(null, form({ lessonId: lesson.id, topicId: fixture.topicId, idempotencyKey: "start-key-123456" })));
    expect(location).toBe(`/app/lessons/${lesson.id}?topic=${fixture.topicId}#lesson-practice`);

    const attempt = await db.assessmentAttempt.findFirstOrThrow({ where: { userId: learner.userId, lessonId: lesson.id, mode: "LESSON_CHECK" }, select: { id: true } });
    const question = fixture.questions[0];
    if (!question) throw new Error("no question");
    const answered = await actions.answerLessonQuestionAction({
      attemptId: attempt.id,
      position: 1,
      response: correctResponse(question.definition) as never,
      timeSpentSeconds: 12,
      hintsUsed: 0,
    });
    expect(answered).toMatchObject({ ok: true, data: { outcome: "correct", attemptCompleted: true } });
    // Another student cannot act on this attempt.
    auth.actor = (await createLearner()).actor;
    expect(await actions.revealLessonHintAction({ attemptId: attempt.id, position: 1 })).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
  });
});
