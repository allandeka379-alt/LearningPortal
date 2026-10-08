import { beforeEach, describe, expect, it, vi } from "vitest";

// The solver actions answer NOT_FOUND unless AI is switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * The solver Server Actions are thin: they read the form, call `src/server/solver` and redirect. The guard and the
 * service are mocked here (the service has its own integration tests against the database).
 */

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

const ACTOR = { kind: "user", userId: "0199a1b2-0000-7000-8000-aaaaaaaaaaaa", roles: ["STUDENT"], timeZone: "Africa/Harare" };

const mocks = vi.hoisted(() => ({
  solveQuestion: vi.fn(),
  archiveSolve: vi.fn(),
  rateSolution: vi.fn(),
  signedIn: true,
}));

vi.mock("@/server/auth/guards", () => ({
  requireOnboardedStudentForAction: async () => {
    if (!mocks.signedIn) throw new (await import("@/server/lib/errors")).AppError("UNAUTHENTICATED");
    return ACTOR;
  },
}));

vi.mock("@/server/solver", () => ({
  solveQuestion: mocks.solveQuestion,
  archiveSolve: mocks.archiveSolve,
  rateSolution: mocks.rateSolution,
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const { archiveSolveAction, rateSolutionAction, solveQuestionAction } = await import("./actions");
const { AppError } = await import("@/server/lib/errors");
const { AI_NOT_CONFIGURED_MESSAGE } = await import("@/server/ai");

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

function form(fields: Record<string, string | File | (string | File)[]>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    for (const item of Array.isArray(value) ? value : [value]) data.append(key, item);
  }
  return data;
}

beforeEach(() => {
  mocks.solveQuestion.mockReset();
  mocks.archiveSolve.mockReset();
  mocks.rateSolution.mockReset();
  mocks.signedIn = true;
});

describe("solveQuestionAction", () => {
  it("passes the form to the service and opens the stored solution", async () => {
    mocks.solveQuestion.mockResolvedValue({ kind: "SOLVED", conversationId: "0199a1b2-0000-7000-8000-cccccccccccc", replayed: false });
    const photo = new File([new Uint8Array([1, 2, 3])], "q.jpg", { type: "image/jpeg" });
    const location = await redirectOf(
      solveQuestionAction(
        null,
        form({
          text: "  Solve 2x = 6 ",
          mode: "ANSWER",
          subjectId: "0199a1b2-0000-7000-8000-dddddddddddd",
          clientRequestId: "solve_abc12345",
          // The unused camera input submits an empty file next to the chosen one.
          photo: [new File([], ""), photo],
        }),
      ),
    );
    expect(location).toBe("/app/solver/0199a1b2-0000-7000-8000-cccccccccccc");
    const [actor, input, options] = mocks.solveQuestion.mock.calls[0] ?? [];
    expect(actor).toBe(ACTOR);
    expect(input).toEqual({ text: "  Solve 2x = 6 ", mode: "ANSWER", subjectId: "0199a1b2-0000-7000-8000-dddddddddddd", clientRequestId: "solve_abc12345" });
    expect(options.photo.filename).toBe("q.jpg");
    expect(Array.from(options.photo.bytes as Uint8Array)).toEqual([1, 2, 3]);
  });

  it("defaults to Teach me and sends no photo or subject when none is given", async () => {
    mocks.solveQuestion.mockResolvedValue({ kind: "SOLVED", conversationId: "0199a1b2-0000-7000-8000-cccccccccccc", replayed: true });
    await redirectOf(solveQuestionAction(null, form({ text: "x", mode: "SOMETHING", subjectId: "" })));
    const [, input, options] = mocks.solveQuestion.mock.calls[0] ?? [];
    expect(input).toEqual({ text: "x", mode: "TEACH" });
    expect(options.photo).toBeNull();
  });

  it("returns the safeguarding reply instead of redirecting", async () => {
    const helplines = [{ name: "Childline", phone: "116" }];
    mocks.solveQuestion.mockResolvedValue({ kind: "SAFEGUARD", helplines });
    expect(await solveQuestionAction(null, form({ text: "..." }))).toEqual({ ok: true, data: { kind: "SAFEGUARD", helplines } });
  });

  it("maps errors to the action result (field errors kept; 'not configured' in calm words)", async () => {
    mocks.solveQuestion.mockRejectedValueOnce(AppError.validation({ photo: ["This photo is too large (maximum 5 MB)."] }, "This photo is too large."));
    expect(await solveQuestionAction(null, form({}))).toEqual({
      ok: false,
      error: { code: "VALIDATION", message: "This photo is too large.", fieldErrors: { photo: ["This photo is too large (maximum 5 MB)."] } },
    });

    mocks.solveQuestion.mockRejectedValueOnce(new AppError("AI_UNAVAILABLE", AI_NOT_CONFIGURED_MESSAGE, { details: { reason: "not_configured" } }));
    expect(await solveQuestionAction(null, form({ text: "x" }))).toEqual({
      ok: false,
      error: { code: "AI_UNAVAILABLE", message: "AI tutor is not configured yet." },
    });

    mocks.signedIn = false;
    const unauthenticated = await solveQuestionAction(null, form({ text: "x" }));
    expect(unauthenticated?.ok === false && unauthenticated.error.code).toBe("UNAUTHENTICATED");
  });
});

describe("archiveSolveAction / rateSolutionAction", () => {
  it("archives and returns to the solver, even for an unknown id", async () => {
    mocks.archiveSolve.mockResolvedValueOnce(undefined);
    expect(await redirectOf(archiveSolveAction(form({ solveId: "0199a1b2-0000-7000-8000-cccccccccccc" })))).toBe("/app/solver");
    expect(mocks.archiveSolve).toHaveBeenCalledWith(ACTOR, "0199a1b2-0000-7000-8000-cccccccccccc");
    mocks.archiveSolve.mockRejectedValueOnce(AppError.notFound());
    expect(await redirectOf(archiveSolveAction(form({ solveId: "nope" })))).toBe("/app/solver");
  });

  it("rates through the service and reports failures as a result", async () => {
    mocks.rateSolution.mockResolvedValueOnce(undefined);
    expect(await rateSolutionAction({ messageId: "0199a1b2-0000-7000-8000-cccccccccccc", rating: 1 })).toEqual({ ok: true, data: null });
    mocks.rateSolution.mockRejectedValueOnce(AppError.notFound("We couldn't find that solution."));
    const failed = await rateSolutionAction({ messageId: "0199a1b2-0000-7000-8000-cccccccccccc", rating: -1 });
    expect(failed).toEqual({ ok: false, error: { code: "NOT_FOUND", message: "We couldn't find that solution." } });
  });
});
