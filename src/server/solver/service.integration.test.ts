import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAiGateway, type AiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG, type AiConfig } from "@/server/ai/config";
import { DbUsageMeter } from "@/server/ai/meter-db";
import { fakeMessage, FakeTransport } from "@/server/ai/testing/fake-transport";
import { startAttempt } from "@/server/attempts";
import { db } from "@/server/db";
import { withUserContext } from "@/server/lib/db-context";
import { AppError, isAppError } from "@/server/lib/errors";
import { LocalDriver } from "@/server/lib/storage";
import {
  createAssessment,
  createEnrollment,
  createLearner,
  createLearningSetup,
  uniqueSuffix,
  UNLIMITED_LEARNING_FEATURES,
  type Learner,
  type LearningSetup,
} from "../../../tests/factories/index";
import { SOLVER_CODE_DETAIL, SOLVER_PROMPT_VERSION, type SolverModelOutput } from "./core";
import {
  archiveSolve,
  getSolve,
  getSolverStatus,
  listSolverSubjects,
  listSolves,
  rateSolution,
  solveQuestion,
  type SolveQuestionInput,
  type SolverDeps,
  type SolverPhotoUpload,
} from "./service";

/**
 * The question solver against the test database (app_rw, NOBYPASSRLS: AiConversation / AiMessage row-level security
 * is real) with the real gateway pipeline (routing, tier caps, quota reservation in AiUsageDaily, metering) over a FAKE
 * transport. No network.
 */

const SOLVER_FEATURES = { ...UNLIMITED_LEARNING_FEATURES, aiSolverPerDay: 20, aiImageUploads: true, aiMaxModelTier: "STANDARD" } as const;

function testConfig(patch: (config: AiConfig) => void = () => undefined): AiConfig {
  const config = structuredClone(DEFAULT_AI_CONFIG);
  // The shared test database accumulates spend from parallel files; the budget guard is tested in src/server/ai.
  config.budget.dailyCostCeilingMicros = null;
  patch(config);
  return config;
}

function gatewayWith(transport: FakeTransport | null, config: AiConfig = testConfig()): AiGateway {
  return createAiGateway({ transport, config, meter: new DbUsageMeter() });
}

const noRateLimit = async (): Promise<void> => undefined;

let storageRoot: string;
let storage: LocalDriver;
let setup: LearningSetup;

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(tmpdir(), "dz-solver-"));
  storage = new LocalDriver(storageRoot);
  setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 2, gradeScheme: false });
});

afterAll(async () => {
  await rm(storageRoot, { recursive: true, force: true });
});

function deps(transport: FakeTransport | null, overrides: Partial<SolverDeps> = {}): SolverDeps {
  return { gateway: gatewayWith(transport), isConfigured: () => transport !== null, assertRateLimit: noRateLimit, storage, ...overrides };
}

async function enrolledLearner(features: Record<string, unknown> = SOLVER_FEATURES, firstName?: string): Promise<Learner> {
  const learner = await createLearner({ features: { ...features }, ...(firstName ? { firstName } : {}) });
  await createEnrollment(learner.userId, setup);
  return learner;
}

const leafName = (index: number): string => setup.chain.subtopics[index]?.name ?? "";

type ParseArgs = Parameters<FakeTransport["parse"]>;

/** The catalogue key ("T3") the solver gave a topic, read from the system prompt of a request. */
function keyFor(request: ParseArgs[0], topicName: string): string | null {
  const system = JSON.stringify(request.params.system ?? "");
  const escaped = topicName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return system.match(new RegExp(`(T\\d+): (?:[^\\\\]*? > )?${escaped}\\\\n`))?.[1] ?? null;
}

/** Answers like a model that picks `topicName` from the catalogue it was given (the key is only known per request). */
class CataloguePickingTransport extends FakeTransport {
  pickedKey: string | null = null;

  constructor(private readonly topicName: string) {
    super();
  }

  override async parse(...args: ParseArgs): ReturnType<FakeTransport["parse"]> {
    this.pickedKey = keyFor(args[0], this.topicName);
    this.enqueue(solveReply({ topicKey: this.pickedKey, topicGuess: "a guess the key overrides" }));
    return super.parse(...args);
  }
}

function modelOutput(overrides: Partial<SolverModelOutput> = {}): SolverModelOutput {
  return {
    readable: true,
    unreadableReason: null,
    questionText: "Solve $x^2 - 5x + 6 = 0$.",
    subjectGuess: "Mathematics",
    topicGuess: null,
    topicKey: null,
    concept: "A quadratic equation can be solved by **factorising** it into two brackets.",
    steps: [
      { title: "Factorise", explanation: "Find two numbers that multiply to $6$ and add to $-5$.", formula: "(x-2)(x-3)=0", tryThis: "Which two numbers work?" },
      { title: "Solve each bracket", explanation: "Set each bracket equal to zero.", formula: "x = 2 \\text{ or } x = 3", tryThis: null },
    ],
    finalAnswer: "$x = 2$ or $x = 3$",
    commonMistakes: ["Getting the signs of the roots the wrong way round."],
    practiceQuestions: ["Solve $x^2 - 7x + 12 = 0$.", "Solve $x^2 + x - 6 = 0$."],
    ...overrides,
  };
}

/** A reply whose topicKey is filled in lazily: the solver numbers topics itself, so the test reads the key back. */
function solveReply(overrides: Partial<SolverModelOutput> = {}) {
  return { text: JSON.stringify(modelOutput(overrides)) };
}

async function errorOf(promise: Promise<unknown>): Promise<AppError> {
  const error = await promise.then(
    () => null,
    (caught: unknown) => caught,
  );
  if (!isAppError(error)) throw new Error(`expected an AppError, got ${String(error)}`);
  return error;
}

async function png(width = 64, height = 48): Promise<Uint8Array> {
  return new Uint8Array(await sharp({ create: { width, height, channels: 3, background: "#ffffff" } }).png().toBuffer());
}

async function solverRows(userId: string) {
  return withUserContext(userId, (tx) =>
    tx.aiConversation.findMany({ where: { userId, mode: "SOLVER" }, include: { messages: { orderBy: [{ createdAt: "asc" }, { id: "asc" }] } } }),
  );
}

function solve(learner: Learner, input: SolveQuestionInput, options: SolverDeps & { photo?: SolverPhotoUpload | null } = {}) {
  return solveQuestion(learner.actor, input, options);
}

describe("availability", () => {
  it("without an API key: the status says so and a solve is refused before any model call or write", async () => {
    const learner = await enrolledLearner();
    const status = await getSolverStatus(learner.actor, deps(null));
    expect(status).toMatchObject({ configured: false, entitled: true, imageUploads: true, examLocked: false, quota: { limit: 20, remaining: 20 } });
    const error = await errorOf(solve(learner, { text: "Solve 2x = 6" }, deps(null)));
    expect(error.code).toBe("AI_UNAVAILABLE");
    expect(error.details?.reason).toBe("not_configured");
    expect(await solverRows(learner.userId)).toHaveLength(0);
  });

  it("a plan without the solver is refused (ENTITLEMENT_REQUIRED); photos need aiImageUploads", async () => {
    const transport = new FakeTransport();
    const noSolver = await enrolledLearner({ ...UNLIMITED_LEARNING_FEATURES });
    expect(await getSolverStatus(noSolver.actor, deps(transport))).toMatchObject({ entitled: false, imageUploads: false, quota: { limit: 0, remaining: 0 } });
    expect((await errorOf(solve(noSolver, { text: "Solve 2x = 6" }, deps(transport)))).code).toBe("ENTITLEMENT_REQUIRED");

    const noPhotos = await enrolledLearner({ ...SOLVER_FEATURES, aiImageUploads: false });
    expect((await getSolverStatus(noPhotos.actor, deps(transport))).imageUploads).toBe(false);
    const photoError = await errorOf(solve(noPhotos, {}, { ...deps(transport), photo: { bytes: await png() } }));
    expect(photoError.code).toBe("ENTITLEMENT_REQUIRED");
    expect(transport.calls).toHaveLength(0);
    expect(await db.mediaAsset.count({ where: { uploadedById: noPhotos.userId } })).toBe(0);
  });

  it("the kill switch pauses the solver", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport();
    const config = testConfig((c) => {
      c.features.SOLVER = false;
    });
    const options = { ...deps(transport), gateway: gatewayWith(transport, config) };
    expect((await getSolverStatus(learner.actor, options)).enabled).toBe(false);
    const error = await errorOf(solve(learner, { text: "Solve 2x = 6" }, options));
    expect(error).toMatchObject({ code: "AI_UNAVAILABLE", details: { reason: "kill_switch" } });
  });

  it("students only: other roles are refused", async () => {
    const learner = await enrolledLearner();
    const error = await errorOf(solveQuestion({ ...learner.actor, roles: ["PARENT"] }, { text: "x" }, deps(new FakeTransport())));
    expect(error.code).toBe("FORBIDDEN");
  });

  it("lists the student's own subjects for the picker", async () => {
    const learner = await enrolledLearner();
    expect(await listSolverSubjects(learner.actor)).toEqual([{ subjectId: setup.subjectId, name: setup.chain.subject.name, qualification: expect.any(String) }]);
  });
});

describe("solveQuestion", () => {
  it("TEACH: one STANDARD call with the pinned topic catalogue and a PII-free context; stored privately with the matched topic and bank questions", async () => {
    const firstName = `Rufaro${uniqueSuffix()}`;
    const learner = await enrolledLearner(SOLVER_FEATURES, firstName);
    // The model picks the second leaf topic by its catalogue key.
    const transport = new CataloguePickingTransport(leafName(1));
    const run = deps(transport);
    const result = await solve(learner, { text: "Solve x^2 - 5x + 6 = 0", mode: "TEACH", clientRequestId: `req-${uniqueSuffix()}` }, run);
    expect(result).toMatchObject({ kind: "SOLVED", replayed: false });
    if (result.kind !== "SOLVED") throw new Error("expected a solve");
    expect(transport.pickedKey).toMatch(/^T\d+$/);
    expect(transport.calls).toHaveLength(1);

    const request = transport.lastRequest;
    expect(request?.params.model).toBe(DEFAULT_AI_CONFIG.routing.tiers.STANDARD.model);
    const system = JSON.stringify(request?.params.system);
    expect(system).toContain("<topic_catalogue>");
    expect(system).toContain("<student_context>");
    expect(system).toContain(setup.chain.subject.name);
    // Never names, emails or phones (buildStudentContext minimises).
    expect(JSON.stringify(request?.params)).not.toContain(firstName);
    expect(JSON.stringify(request?.params.messages)).toContain("TEACH ME");

    const view = await getSolve(learner.actor, result.conversationId);
    expect(view).toMatchObject({
      mode: "TEACH",
      outcome: "COMPLETE",
      subject: { id: setup.subjectId },
      topic: { id: setup.leafTopicIds[1], name: leafName(1) },
      title: leafName(1),
      question: { text: "Solve x^2 - 5x + 6 = 0", imageUrl: null, readHtml: null },
      practiceHref: `/app/practice?subjectId=${setup.subjectId}&topicId=${setup.leafTopicIds[1]}&count=5&origin=RECOMMENDATION`,
      rating: null,
    });
    // Formulas and inline maths typeset on the server (KaTeX), Markdown rendered.
    expect(view.steps).toHaveLength(2);
    expect(view.steps[0]?.formulaHtml).toContain("katex");
    expect(view.steps[0]?.explanationHtml).toContain("katex");
    expect(view.steps[0]?.tryThisHtml).toContain("Which two numbers work?");
    expect(view.steps[1]?.tryThisHtml).toBeNull();
    expect(view.conceptHtml).toContain("<strong>factorising</strong>");
    expect(view.finalAnswerHtml).toContain("katex");
    expect(view.commonMistakesHtml).toHaveLength(1);
    expect(view.similar.generatedHtml).toHaveLength(2);
    // Up to 3 PUBLISHED bank questions on the matched topic, stems only.
    const onTopic = new Set((setup.questionsByTopic.get(setup.leafTopicIds[1] as string) ?? []).map((q) => q.id));
    expect(view.similar.bank.length).toBeGreaterThan(0);
    expect(view.similar.bank.length).toBeLessThanOrEqual(3);
    for (const question of view.similar.bank) {
      expect(onTopic.has(question.id)).toBe(true);
      expect(question.stemHtml.length).toBeGreaterThan(0);
    }

    // Stored: SOLVER conversation with the student's turn and the structured answer, fully metered.
    const rows = await solverRows(learner.userId);
    const row = rows.find((conversation) => conversation.id === result.conversationId);
    expect(row).toMatchObject({ mode: "SOLVER", channel: "WEB", modelTier: "STANDARD", promptVersion: SOLVER_PROMPT_VERSION, messageCount: 2 });
    expect(row?.messages.map((message) => [message.role, message.intent])).toEqual([
      ["USER", "TEACH"],
      ["ASSISTANT", "TEACH"],
    ]);
    expect(row?.messages[1]).toMatchObject({ status: "COMPLETE", promptVersion: SOLVER_PROMPT_VERSION, hintLevel: null });
    expect(row?.messages[1]?.outputTokens).toBeGreaterThan(0);
    expect(JSON.stringify(row?.contextSnapshot)).not.toContain(firstName);

    // Each request counts against today's allowance (gateway reservation).
    const status = await getSolverStatus(learner.actor, run);
    expect(status.quota).toEqual({ limit: 20, remaining: 19 });
  });

  it("ANSWER: the full worked solution, still with every step; a retry with the same request id is not charged again", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport().enqueue(solveReply({ topicGuess: leafName(0) }));
    const requestId = `req-${uniqueSuffix()}`;
    const first = await solve(learner, { text: "Solve x^2 - 5x + 6 = 0", mode: "ANSWER", clientRequestId: requestId }, deps(transport));
    if (first.kind !== "SOLVED") throw new Error("expected a solve");
    expect(JSON.stringify(transport.lastRequest?.params.messages)).toContain("GIVE ME THE ANSWER");

    const view = await getSolve(learner.actor, first.conversationId);
    expect(view.mode).toBe("ANSWER");
    expect(view.steps.every((step) => step.tryThisHtml === null)).toBe(true);
    expect(view.finalAnswerHtml).not.toBeNull();
    // Topic matched by name when the model gives no key.
    expect(view.topic?.id).toBe(setup.leafTopicIds[0]);
    const stored = await solverRows(learner.userId);
    expect(stored[0]?.messages[1]?.hintLevel).toBe(4);

    const again = await solve(learner, { text: "Solve x^2 - 5x + 6 = 0", mode: "ANSWER", clientRequestId: requestId }, deps(transport));
    expect(again).toEqual({ kind: "SOLVED", conversationId: first.conversationId, replayed: true });
    expect(transport.calls).toHaveLength(1);
  });

  it("a photo is stored OWNER_ONLY as SOLVER_UPLOAD, sent to the model, and shown back to its owner only", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport().enqueue(solveReply({ questionText: "Find the area of a circle of radius $3$ cm." }));
    const result = await solve(learner, { mode: "TEACH" }, { ...deps(transport), photo: { bytes: await png(), filename: "IMG_2041.png" } });
    if (result.kind !== "SOLVED") throw new Error("expected a solve");

    const asset = await db.mediaAsset.findFirstOrThrow({ where: { uploadedById: learner.userId } });
    expect(asset).toMatchObject({ purpose: "SOLVER_UPLOAD", visibility: "OWNER_ONLY", status: "READY", mimeType: "image/png" });
    const messages = transport.lastRequest?.params.messages as { content: { type: string }[] }[];
    expect(messages.at(-1)?.content.some((part) => part.type === "image")).toBe(true);

    const view = await getSolve(learner.actor, result.conversationId);
    expect(view.question.imageUrl).toBe(`/api/media/${asset.storageKey}`);
    expect(view.question.text).toBe("");
    // The model's reading of the photo is shown so the student can check it.
    expect(view.question.readHtml).toContain("katex");
    // No topic matched: the history title is the model's reading of the photo (the student's own question).
    expect(view.title).toBe("Find the area of a circle of radius $3$ cm.");

    // Too large (Setting ai.limits.maxImageBytes) and not an image: refused before any model call.
    const small = testConfig((c) => {
      c.limits.maxImageBytes = 1_000;
    });
    const before = transport.calls.length;
    const tooLarge = await errorOf(solve(learner, {}, { ...deps(transport), gateway: gatewayWith(transport, small), photo: { bytes: await png(400, 400) } }));
    expect(tooLarge).toMatchObject({ code: "VALIDATION", fieldErrors: { photo: [expect.stringContaining("too large")] } });
    const notImage = await errorOf(solve(learner, {}, { ...deps(transport), photo: { bytes: new TextEncoder().encode("%PDF-1.4 not an image") } }));
    expect(notImage.code).toBe("VALIDATION");
    expect(notImage.fieldErrors?.photo).toBeDefined();
    expect(transport.calls).toHaveLength(before);
  });

  it("reuses an uploaded photo by id only when it is the student's own", async () => {
    const owner = await enrolledLearner();
    const other = await enrolledLearner();
    const transport = new FakeTransport().enqueue(solveReply());
    const first = await solve(owner, {}, { ...deps(transport), photo: { bytes: await png() } });
    if (first.kind !== "SOLVED") throw new Error("expected a solve");
    const asset = await db.mediaAsset.findFirstOrThrow({ where: { uploadedById: owner.userId }, select: { id: true } });
    const error = await errorOf(solve(other, { imageAssetId: asset.id }, deps(transport)));
    expect(error).toMatchObject({ code: "VALIDATION", fieldErrors: { photo: [expect.any(String)] } });
  });

  it("an unreadable photo is stored with the reason, and no steps are shown", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport().enqueue(
      solveReply({ readable: false, unreadableReason: "The bottom of the question is cut off.", steps: [], finalAnswer: null }),
    );
    const result = await solve(learner, {}, { ...deps(transport), photo: { bytes: await png() } });
    if (result.kind !== "SOLVED") throw new Error("expected a solve");
    const view = await getSolve(learner.actor, result.conversationId);
    expect(view).toMatchObject({ outcome: "UNREADABLE", unreadableReason: "The bottom of the question is cut off.", steps: [], finalAnswerHtml: null, practiceHref: null });
  });

  it("a refusal is stored as REFUSED and shows no solution", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport().enqueue({ message: fakeMessage({ text: "", stop_reason: "refusal" }) });
    const result = await solve(learner, { text: "Something the model declines" }, deps(transport));
    if (result.kind !== "SOLVED") throw new Error("expected a solve");
    const view = await getSolve(learner.actor, result.conversationId);
    expect(view).toMatchObject({ outcome: "REFUSED", steps: [], conceptHtml: null, finalAnswerHtml: null });
    expect(view.question.text).toBe("Something the model declines");
  });

  it("escalates a hard multi-step maths question to DEEP only on a DEEP plan", async () => {
    const deepLearner = await enrolledLearner({ ...SOLVER_FEATURES, aiMaxModelTier: "DEEP" });
    const transport = new FakeTransport().enqueue(
      { text: JSON.stringify({ area: "MATHS", multiStep: true, difficulty: "HARD" }) },
      solveReply(),
    );
    await solve(deepLearner, { text: "Prove by induction that 1 + 2 + ... + n = n(n+1)/2" }, deps(transport));
    expect(transport.calls.map((call) => call.request.params.model)).toEqual([
      DEFAULT_AI_CONFIG.routing.tiers.FAST.model,
      DEFAULT_AI_CONFIG.routing.tiers.DEEP.model,
    ]);
    const rows = await solverRows(deepLearner.userId);
    expect(rows[0]?.modelTier).toBe("DEEP");

    // A basic question stays on STANDARD even on a DEEP plan.
    const basic = new FakeTransport().enqueue({ text: JSON.stringify({ area: "MATHS", multiStep: false, difficulty: "BASIC" }) }, solveReply());
    await solve(deepLearner, { text: "What is 7 x 8?" }, deps(basic));
    expect(basic.calls.at(-1)?.request.params.model).toBe(DEFAULT_AI_CONFIG.routing.tiers.STANDARD.model);

    // A STANDARD plan never triages or escalates: one call.
    const standardLearner = await enrolledLearner();
    const standard = new FakeTransport().enqueue(solveReply());
    await solve(standardLearner, { text: "Prove by induction that 1 + 2 + ... + n = n(n+1)/2" }, deps(standard));
    expect(standard.calls.map((call) => call.request.params.model)).toEqual([DEFAULT_AI_CONFIG.routing.tiers.STANDARD.model]);
  });

  it("refuses while a timed mock exam is in progress (exam integrity), with no model call", async () => {
    const learner = await enrolledLearner();
    const mcq = setup.questions[0];
    if (!mcq) throw new Error("fixture question missing");
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      title: "Solver lock mock",
      timeLimitSeconds: 3600,
      sections: [{ questionIds: [mcq.id] }],
    });
    await startAttempt(learner.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
    const transport = new FakeTransport();
    expect((await getSolverStatus(learner.actor, deps(transport))).examLocked).toBe(true);
    const error = await errorOf(solve(learner, { text: "Solve 2x = 6" }, deps(transport)));
    expect(error).toMatchObject({ code: "FORBIDDEN", details: { [SOLVER_CODE_DETAIL]: "EXAM_IN_PROGRESS" } });
    expect(transport.calls).toHaveLength(0);
  });

  it("enforces the daily allowance and the per-minute rate limit before any model call", async () => {
    const learner = await enrolledLearner({ ...SOLVER_FEATURES, aiSolverPerDay: 1 });
    const transport = new FakeTransport().enqueue(solveReply());
    await solve(learner, { text: "Solve 2x = 6" }, deps(transport));
    const quota = await errorOf(solve(learner, { text: "Solve 3x = 9" }, deps(transport)));
    expect(quota.code).toBe("QUOTA_EXCEEDED");
    expect(transport.calls).toHaveLength(1);

    const limited = await enrolledLearner();
    const limiter = async (): Promise<void> => {
      throw new AppError("RATE_LIMITED", "Slow down.");
    };
    const rate = await errorOf(solve(limited, { text: "Solve 2x = 6" }, { ...deps(transport), assertRateLimit: limiter }));
    expect(rate.code).toBe("RATE_LIMITED");
    expect(transport.calls).toHaveLength(1);
  });

  it("answers a safeguarding disclosure with help contacts: no model call, nothing stored, whatever the plan", async () => {
    const learner = await enrolledLearner({ ...UNLIMITED_LEARNING_FEATURES });
    const transport = new FakeTransport();
    const result = await solve(learner, { text: "I want to hurt myself" }, deps(transport));
    expect(result.kind).toBe("SAFEGUARD");
    expect(transport.calls).toHaveLength(0);
    expect(await solverRows(learner.userId)).toHaveLength(0);
  });

  it("validates input: a question or a photo is required, and the length is capped", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport();
    expect(await errorOf(solve(learner, { text: "   " }, deps(transport)))).toMatchObject({ code: "VALIDATION", fieldErrors: { text: [expect.any(String)] } });
    const tooLong = await errorOf(solve(learner, { text: "x".repeat(DEFAULT_AI_CONFIG.limits.maxInputCharsPerMessage + 1) }, deps(transport)));
    expect(tooLong.fieldErrors?.text).toBeDefined();
    expect((await errorOf(solve(learner, { text: "x", mode: "CHEAT" as never }, deps(transport)))).code).toBe("VALIDATION");
    // Subjects the student does not study are refused.
    const other = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, gradeScheme: false });
    const notStudied = await errorOf(solve(learner, { text: "x", subjectId: other.subjectId }, deps(transport.enqueue(solveReply()))));
    expect(["NOT_FOUND", "VALIDATION", "ENTITLEMENT_REQUIRED"]).toContain(notStudied.code);
  });
});

describe("history, privacy, archive and rating", () => {
  it("lists the owner's solves newest first with cursor pagination; others (and raw queries) never see them", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport();
    transport.defaultReply = solveReply();
    const ids: string[] = [];
    for (let i = 0; i < 3; i += 1) {
      const result = await solve(learner, { text: `Solve ${i + 2}x = ${(i + 2) * 3}` }, deps(transport));
      if (result.kind === "SOLVED") ids.push(result.conversationId);
    }
    const first = await listSolves(learner.actor, { limit: 2 });
    expect(first.items.map((item) => item.id)).toEqual([ids[2], ids[1]]);
    expect(first.items[0]).toMatchObject({ mode: "TEACH", outcome: "COMPLETE", hasPhoto: false });
    expect(first.nextCursor).not.toBeNull();
    const second = await listSolves(learner.actor, { limit: 2, cursor: first.nextCursor });
    expect(second.items.map((item) => item.id)).toEqual([ids[0]]);
    expect(second.nextCursor).toBeNull();
    expect((await errorOf(listSolves(learner.actor, { cursor: "garbage" }))).code).toBe("VALIDATION");

    // Row-level security: another student, and the app role without a user context, see nothing.
    const stranger = await enrolledLearner();
    expect((await errorOf(getSolve(stranger.actor, ids[0] as string))).code).toBe("NOT_FOUND");
    expect((await listSolves(stranger.actor)).items).toHaveLength(0);
    expect(await db.aiConversation.count({ where: { id: { in: ids } } })).toBe(0);
    expect((await errorOf(archiveSolve(stranger.actor, ids[0] as string))).code).toBe("NOT_FOUND");
  });

  it("archives a solve (hidden from history, idempotent) and records a rating on the owner's answer only", async () => {
    const learner = await enrolledLearner();
    const transport = new FakeTransport().enqueue(solveReply());
    const result = await solve(learner, { text: "Solve 2x = 6" }, deps(transport));
    if (result.kind !== "SOLVED") throw new Error("expected a solve");
    const view = await getSolve(learner.actor, result.conversationId);
    const messageId = view.messageId as string;

    await rateSolution(learner.actor, { messageId, rating: 1 });
    expect((await getSolve(learner.actor, result.conversationId)).rating).toBe(1);
    await rateSolution(learner.actor, { messageId, rating: null });
    expect((await getSolve(learner.actor, result.conversationId)).rating).toBeNull();
    const stranger = await enrolledLearner();
    expect((await errorOf(rateSolution(stranger.actor, { messageId, rating: -1 }))).code).toBe("NOT_FOUND");
    expect((await errorOf(rateSolution(learner.actor, { messageId, rating: 5 as never }))).code).toBe("VALIDATION");

    await archiveSolve(learner.actor, result.conversationId);
    await archiveSolve(learner.actor, result.conversationId);
    expect((await listSolves(learner.actor)).items.map((item) => item.id)).not.toContain(result.conversationId);
    expect((await errorOf(getSolve(learner.actor, result.conversationId))).code).toBe("NOT_FOUND");
    expect((await errorOf(getSolve(learner.actor, "not-a-uuid"))).code).toBe("NOT_FOUND");
  });
});
