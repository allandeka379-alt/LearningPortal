import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Owner decision 2026-10-07 (docs/ARCHITECTURE.md §3.14): while `features.ai` is off every AI route looks absent: the
 * student tutor and solver pages, the tutor REST API and the admin AI pages are 404s and their Server Actions answer
 * NOT_FOUND. The flag is checked FIRST, so authentication and services are never reached (they throw here if they are).
 */

const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  redirect: (href: string) => {
    throw new Error(`NEXT_REDIRECT ${href}`);
  },
}));

const reached = vi.hoisted(() => ({ calls: [] as string[] }));
function unreachable(name: string) {
  return async () => {
    reached.calls.push(name);
    throw new Error(`${name} must not run while AI is switched off`);
  };
}
vi.mock("@/server/auth/guards", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/guards")>()),
  requireOnboardedStudent: unreachable("requireOnboardedStudent"),
  requireOnboardedStudentForAction: unreachable("requireOnboardedStudentForAction"),
}));
vi.mock("@/components/admin/guards", () => ({
  requireAdminPage: unreachable("requireAdminPage"),
  requireAdminAction: unreachable("requireAdminAction"),
  requireAdminStepUpAction: unreachable("requireAdminStepUpAction"),
}));
vi.mock("@/server/auth/request-auth", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/request-auth")>()),
  authenticateRequest: unreachable("authenticateRequest"),
}));

const search = () => Promise.resolve({});

beforeEach(() => {
  featureFlags.ai = false;
  reached.calls = [];
});

async function rejection(run: () => unknown): Promise<string> {
  try {
    await run();
    return "resolved";
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

function form(fields: Record<string, string> = {}): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("student AI pages", () => {
  it("/app/tutor, /app/tutor/new, /app/tutor/[id], /app/solver and /app/solver/[id] are 404s", async () => {
    const id = randomUUID();
    const pages = [
      async () => (await import("./app/tutor/page")).default({ searchParams: search() }),
      async () => (await import("./app/tutor/new/page")).default({ searchParams: search() }),
      async () => (await import("./app/tutor/[conversationId]/page")).default({ params: Promise.resolve({ conversationId: id }), searchParams: search() }),
      async () => (await import("./app/solver/page")).default({ searchParams: search() }),
      async () => (await import("./app/solver/[solveId]/page")).default({ params: Promise.resolve({ solveId: id }), searchParams: search() }),
    ];
    for (const page of pages) expect(await rejection(page)).toBe("NEXT_NOT_FOUND");
    expect(reached.calls).toEqual([]);
  });

  it("the tutor and solver Server Actions answer NOT_FOUND", async () => {
    const tutor = await import("./app/tutor/actions");
    const solver = await import("./app/solver/actions");
    expect(await tutor.createConversationAction(null, form({ subjectId: randomUUID() }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await tutor.rateTutorMessageAction({ messageId: randomUUID(), rating: 1 })).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await rejection(() => tutor.archiveConversationAction(form({ conversationId: randomUUID() })))).toBe("NEXT_NOT_FOUND");
    expect(await solver.solveQuestionAction(null, form({ text: "Solve 2x + 3 = 7" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await solver.rateSolutionAction({ messageId: randomUUID(), rating: -1 })).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await rejection(() => solver.archiveSolveAction(form({ solveId: randomUUID() })))).toBe("NEXT_NOT_FOUND");
    expect(reached.calls).toEqual([]);
  });
});

describe("tutor REST API", () => {
  it("GET/POST /api/v1/tutor/conversations and POST .../messages are 404s before authentication", async () => {
    const conversations = await import("./api/v1/tutor/conversations/route");
    const messages = await import("./api/v1/tutor/conversations/[conversationId]/messages/route");
    const id = randomUUID();
    const responses = [
      await conversations.GET(new Request("http://localhost/api/v1/tutor/conversations"), undefined),
      await conversations.POST(new Request("http://localhost/api/v1/tutor/conversations", { method: "POST", body: "{}" }), undefined),
      await messages.POST(new Request(`http://localhost/api/v1/tutor/conversations/${id}/messages`, { method: "POST", body: JSON.stringify({ text: "hi" }) }), {
        params: Promise.resolve({ conversationId: id }),
      }),
    ];
    for (const response of responses) {
      expect(response.status).toBe(404);
      expect(await response.json()).toMatchObject({ error: { code: "NOT_FOUND" } });
    }
    expect(reached.calls).toEqual([]);
  });

  it("reach authentication again once AI is switched on (the flag is the only gate added)", async () => {
    featureFlags.ai = true;
    const conversations = await import("./api/v1/tutor/conversations/route");
    const response = await conversations.GET(new Request("http://localhost/api/v1/tutor/conversations"), undefined);
    expect(reached.calls).toEqual(["authenticateRequest"]);
    expect(response.status).toBe(500);
  });
});

describe("admin AI pages", () => {
  it("/admin/ai, /admin/ai/generate, /admin/ai/jobs/[id], /admin/ai/settings and /admin/ai/usage are 404s", async () => {
    const pages = [
      async () => (await import("./admin/ai/page")).default({ searchParams: search() }),
      async () => (await import("./admin/ai/generate/page")).default({ searchParams: search() }),
      async () => (await import("./admin/ai/jobs/[id]/page")).default({ params: Promise.resolve({ id: randomUUID() }) }),
      async () => (await import("./admin/ai/settings/page")).default(),
      async () => (await import("./admin/ai/usage/page")).default({ searchParams: search() }),
    ];
    for (const page of pages) expect(await rejection(page)).toBe("NEXT_NOT_FOUND");
    expect(reached.calls).toEqual([]);
  });

  it("the AI draft actions answer NOT_FOUND", async () => {
    const actions = await import("./admin/ai/actions");
    for (const action of [actions.createGenerationJobAction, actions.cancelGenerationJobAction, actions.rerunGenerationJobAction]) {
      expect(await action(null, form({ id: randomUUID() }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    }
    expect(reached.calls).toEqual([]);
  });
});
