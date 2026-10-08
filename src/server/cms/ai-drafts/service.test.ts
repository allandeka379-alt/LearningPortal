import { describe, expect, it } from "vitest";
import { createAiGateway, type AiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG } from "@/server/ai/config";
import { InMemoryUsageMeter } from "@/server/ai/meter";
import { FakeTransport, fakeMessage } from "@/server/ai/testing/fake-transport";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createCurriculumChain, uniqueSuffix } from "../../../../tests/factories/index";
import { approveQuestion, createQuestion, publishQuestion, submitQuestion } from "../questions/service";
import { auditTrail, staffActor, studentActor, teacherActor, withFourEyes } from "../review/testing";
import type { AiMcq } from "./prompts";
import { runGenerationJob } from "./jobs";
import { AI_GENERATE_JOB, cancelGenerationJob, createGenerationJob, getGenerationJob, listGenerationJobs, rerunGenerationJob, searchTargetQuestions } from "./service";

/**
 * Integration tests for AI drafts (§41) with a scripted transport: no network, no API key. Covers the job lifecycle,
 * per-item validation, metering, the DRAFT-only / human-approval guarantees, failures and permissions.
 */

type Chain = Awaited<ReturnType<typeof createCurriculumChain>>;

function setup(transport: FakeTransport | null = new FakeTransport()): { gateway: AiGateway; transport: FakeTransport | null } {
  return { gateway: createAiGateway({ transport, config: DEFAULT_AI_CONFIG, meter: new InMemoryUsageMeter() }), transport };
}

const configured = { isConfigured: () => true };

async function chainWithObjectives(): Promise<Chain> {
  return createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 2, objectivesPerSubtopic: 2, lessonsPerTopic: 0 });
}

function mcq(stem: string, correct = 1): AiMcq {
  return {
    stem,
    marks: 1,
    difficulty: 2,
    explanation: "Multiply the numbers.",
    workedSolution: null,
    hints: ["Think of equal groups."],
    conceptSummary: "Multiplication is repeated addition.",
    cognitiveSkill: "APPLICATION",
    objectiveRefs: ["O1"],
    topicRef: null,
    estimatedSeconds: 40,
    options: [
      { text: "7", isCorrect: correct === 0, rationale: "Added instead of multiplying." },
      { text: "12", isCorrect: correct === 1, rationale: "" },
      { text: "34", isCorrect: correct === 2, rationale: "Placed the digits side by side." },
    ],
  };
}

function reply(output: unknown) {
  return { text: JSON.stringify(output) };
}

async function expectCode(promise: Promise<unknown>, code: string, field?: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error) && error.code).toBe(code);
    if (field && isAppError(error)) expect(Object.keys(error.fieldErrors ?? {})).toContain(field);
    return;
  }
  throw new Error(`expected ${code}`);
}

function request(chain: Chain, overrides: Record<string, unknown> = {}) {
  return {
    kind: "MCQ",
    subjectId: chain.subject.id,
    syllabusId: chain.syllabus.id,
    topicId: chain.subtopics[0]?.id,
    objectiveIds: [chain.objectiveIds[0]],
    count: "3",
    difficulty: "EASY",
    languageLevel: "SIMPLE",
    ...overrides,
  };
}

describe("AI drafts", () => {
  it("never queues work (or fabricates output) when AI is not configured", async () => {
    const chain = await chainWithObjectives();
    const editor = await staffActor();
    try {
      await createGenerationJob(editor, request(chain), {}, { isConfigured: () => false });
      throw new Error("expected AI_UNAVAILABLE");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("AI_UNAVAILABLE");
      if (isAppError(error)) expect(error.message).toContain("AI is not configured");
    }
    expect(await db.aiGenerationJob.count({ where: { requestedById: editor.userId } })).toBe(0);
  });

  it("generates MCQs as AI DRAFTs: valid items stored, invalid ones rejected, cost metered, nothing published", async () => {
    const chain = await chainWithObjectives();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const { gateway, transport } = setup();
    const tag = uniqueSuffix();
    const created = await createGenerationJob(editor, request(chain), {}, { ...configured, gateway });
    expect(created.estimate).toMatchObject({ model: "claude-opus-5-5", tier: "DEEP" });
    expect(created.estimate.costMicros).toBeGreaterThan(0);

    const job = await db.aiGenerationJob.findUniqueOrThrow({ where: { id: created.id }, include: { job: true } });
    expect(job).toMatchObject({ status: "QUEUED", kind: "MCQ", itemsRequested: 3, requestedById: editor.userId, promptVersion: "content-gen-2026-10-06" });
    expect(job.job).toMatchObject({ type: AI_GENERATE_JOB, queue: "ai", dedupeKey: `gen:${created.id}`, status: "PENDING" });

    transport?.enqueue(reply({ questions: [mcq(`What is 3 x 4? ${tag}`), mcq(`What is 6 x 2? ${tag}`), mcq(`No correct option ${tag}`, -1)] }));
    await expect(runGenerationJob({ generationJobId: created.id }, undefined, { gateway })).resolves.toEqual({ status: "COMPLETED", created: 2, rejected: 1 });

    // What was sent: the versioned originality rules, the scope and a structured-output schema.
    const sent = transport?.lastRequest?.params as unknown as { system: { text: string }[]; messages: { content: unknown }[]; output_config?: { format?: unknown }; model: string };
    expect(sent.model).toBe("claude-opus-5-5");
    expect(sent.system[0]?.text).toContain("Never reproduce, closely paraphrase or reconstruct");
    expect(JSON.stringify(sent.messages)).toContain(chain.subtopics[0]?.name ?? "missing");
    expect(sent.output_config?.format).toBeDefined();

    const questions = await db.question.findMany({ where: { generationJobId: created.id }, include: { topics: true, objectives: true, options: true } });
    expect(questions).toHaveLength(2);
    const aiSource = await db.contentSource.findUniqueOrThrow({ where: { slug: "platform-ai-drafts" } });
    expect(aiSource.type).toBe("AI_GENERATED");
    for (const q of questions) {
      expect(q).toMatchObject({ status: "DRAFT", aiGenerated: true, createdById: editor.userId, copyrightStatus: "UNVERIFIED", sourceId: aiSource.id, type: "MULTIPLE_CHOICE", difficulty: 2 });
      expect(q.topics).toEqual([expect.objectContaining({ topicId: chain.subtopics[0]?.id, isPrimary: true })]);
      expect(q.objectives.map((o) => o.objectiveId)).toEqual([chain.objectiveIds[0]]);
      expect(q.renderedHtml).not.toBeNull();
    }

    const done = await getGenerationJob(editor, created.id);
    expect(done).toMatchObject({ status: "COMPLETED", itemsCreated: 2, tokens: { input: 100, output: 50 }, model: "claude-opus-5-5", tier: "DEEP", canCancel: false });
    expect(done.costMicros).toBe(100 * 4 + 50 * 20);
    expect(done.summary?.rejected).toEqual([{ index: 3, reason: expect.stringContaining("correct") }]);
    expect(done.created.map((c) => [c.entityType, c.status, c.reviewHref.startsWith("/admin/review/question/")])).toEqual([
      ["QUESTION", "DRAFT", true],
      ["QUESTION", "DRAFT", true],
    ]);
    expect(await auditTrail(created.id)).toEqual(["ai_generation.request", "ai_generation.complete"]);

    // AI never publishes: the drafts need a cleared copyright, a written review note and a DIFFERENT approver.
    const id = questions[0]?.id ?? "";
    await expect(publishQuestion(reviewer, { id })).rejects.toThrow();
    expect((await db.question.findUniqueOrThrow({ where: { id } })).status).toBe("DRAFT");
    await db.question.update({ where: { id }, data: { copyrightStatus: "OWNED" } });
    await submitQuestion(editor, { id });
    // The requester is the author of the AI draft: under four-eyes they cannot approve it.
    await withFourEyes((context) => expectCode(approveQuestion(editor, { id, notes: "Checked every answer and the wording." }, context), "FORBIDDEN"));
    await expectCode(approveQuestion(reviewer, { id, notes: "" }), "VALIDATION", "notes");
    await approveQuestion(reviewer, { id, notes: "Answers verified independently; original wording." });
    await expect(publishQuestion(reviewer, { id })).resolves.toMatchObject({ id });
    expect(await db.question.findUniqueOrThrow({ where: { id } })).toMatchObject({ status: "PUBLISHED", aiGenerated: true, approvedById: reviewer.userId });

    // The same stems again are flagged as near-duplicates of the bank.
    const again = await createGenerationJob(editor, request(chain, { count: "2" }), {}, { ...configured, gateway });
    transport?.enqueue(reply({ questions: [mcq(`What is 3 x 4? ${tag}`), mcq(`What is 6 x 2? ${tag}`)] }));
    await runGenerationJob({ generationJobId: again.id }, undefined, { gateway });
    const summary = (await getGenerationJob(editor, again.id)).summary;
    expect(summary?.nearDuplicatesFlagged).toBe(2);
    expect(summary?.nearDuplicates.map((d) => d.similarToId).sort()).toEqual(questions.map((q) => q.id).sort());
  });

  it("records failures honestly: refusals, unusable output, AI switched off, transient errors", async () => {
    const chain = await chainWithObjectives();
    const editor = await staffActor();
    const { gateway, transport } = setup();

    const refused = await createGenerationJob(editor, request(chain), {}, { ...configured, gateway });
    transport?.enqueue({ message: fakeMessage({ model: "claude-opus-5-5", text: "", stop_reason: "refusal" }) });
    await expect(runGenerationJob({ generationJobId: refused.id }, undefined, { gateway })).resolves.toMatchObject({ status: "FAILED", reason: "REFUSED" });
    expect(await db.aiGenerationJob.findUniqueOrThrow({ where: { id: refused.id } })).toMatchObject({ status: "FAILED", itemsCreated: 0, inputTokens: 100, error: expect.stringContaining("declined") });

    const unusable = await createGenerationJob(editor, request(chain), {}, { ...configured, gateway });
    transport?.enqueue(reply({ questions: [mcq("No answer", -1)] }));
    await expect(runGenerationJob({ generationJobId: unusable.id }, undefined, { gateway })).resolves.toMatchObject({ status: "FAILED", rejected: 1 });
    const failed = await getGenerationJob(editor, unusable.id);
    expect(failed).toMatchObject({ status: "FAILED", error: expect.stringContaining("None of the generated items") });
    expect(failed.summary?.rejected).toHaveLength(1);
    expect(await db.question.count({ where: { generationJobId: unusable.id } })).toBe(0);

    // Configured at queue time, key removed before the worker ran: an explicit failure, never placeholder content.
    const noKey = await createGenerationJob(editor, request(chain), {}, { ...configured, gateway });
    await expect(runGenerationJob({ generationJobId: noKey.id }, undefined, { gateway: setup(null).gateway })).resolves.toMatchObject({ status: "FAILED" });
    expect((await db.aiGenerationJob.findUniqueOrThrow({ where: { id: noKey.id } })).error).toBe("AI is not configured on this server.");

    const switchedOff = await createGenerationJob(editor, request(chain), {}, { ...configured, gateway });
    const off = createAiGateway({ transport: new FakeTransport(), config: { ...DEFAULT_AI_CONFIG, features: { CONTENT_GEN: false } }, meter: new InMemoryUsageMeter() });
    await runGenerationJob({ generationJobId: switchedOff.id }, undefined, { gateway: off });
    expect((await db.aiGenerationJob.findUniqueOrThrow({ where: { id: switchedOff.id } })).status).toBe("FAILED");

    const flaky = await createGenerationJob(editor, request(chain), {}, { ...configured, gateway });
    transport?.enqueue({ error: new Error("socket hang up") });
    const signal = new AbortController().signal;
    await expect(runGenerationJob({ generationJobId: flaky.id }, { attempt: 1, maxAttempts: 2, signal }, { gateway })).rejects.toThrow();
    expect(await db.aiGenerationJob.findUniqueOrThrow({ where: { id: flaky.id } })).toMatchObject({ status: "QUEUED", error: expect.stringContaining("retried") });
    await expect(runGenerationJob({ generationJobId: flaky.id }, { attempt: 2, maxAttempts: 2, signal }, { gateway })).resolves.toMatchObject({ status: "FAILED" });
    // A finished job is never run again.
    await expect(runGenerationJob({ generationJobId: flaky.id }, undefined, { gateway })).resolves.toEqual({ skipped: "FAILED" });
    expect(await auditTrail(refused.id)).toEqual(["ai_generation.request", "ai_generation.fail"]);
  });

  it("writes explanations into a draft copy of a published question and hints into a draft in place", async () => {
    const chain = await chainWithObjectives();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const { gateway, transport } = setup();
    const topicId = chain.subtopics[0]?.id ?? "";
    const base = {
      subjectId: chain.subject.id,
      type: "NUMERICAL",
      markingMode: "AUTO",
      stem: `A bus travels 120 km in 1.5 hours. Find its speed in km/h. ${uniqueSuffix()}`,
      payload: null,
      answerSpec: { value: 80 },
      marks: 2,
      difficulty: 2,
      accessTier: "FREE",
      topics: [{ topicId, isPrimary: true }],
      sourceId: chain.source.id,
      author: "Content team",
      copyrightStatus: "OWNED",
    };
    const published = await createQuestion(editor, base);
    await submitQuestion(editor, { id: published.id });
    await approveQuestion(reviewer, { id: published.id, notes: "" });
    await publishQuestion(reviewer, { id: published.id });
    const draft = await createQuestion(editor, { ...base, stem: `${base.stem} (draft)` });

    expect((await searchTargetQuestions(editor, { subjectId: chain.subject.id, q: base.stem.slice(-12) })).map((q) => q.id).sort()).toEqual([published.id, draft.id].sort());

    const explain = await createGenerationJob(editor, request(chain, { kind: "EXPLANATION", targetQuestionId: published.id, count: "" }), {}, { ...configured, gateway });
    transport?.enqueue(reply({ explanation: "Speed is distance divided by time.", workedSolution: "1. $120 \\div 1.5 = 80$", conceptSummary: "Average speed." }));
    await expect(runGenerationJob({ generationJobId: explain.id }, undefined, { gateway })).resolves.toMatchObject({ status: "COMPLETED", created: 1 });
    expect(JSON.stringify(transport?.lastRequest?.params.messages)).toContain("Correct answer: 80");
    const copy = await db.question.findFirstOrThrow({ where: { draftOfId: published.id } });
    expect(copy).toMatchObject({ status: "DRAFT", aiGenerated: true, generationJobId: explain.id, createdById: editor.userId, explanation: "Speed is distance divided by time." });
    expect(await db.question.findUniqueOrThrow({ where: { id: published.id } })).toMatchObject({ status: "PUBLISHED", explanation: null });

    // A question with an edit in progress is refused up front.
    await expectCode(createGenerationJob(editor, request(chain, { kind: "HINTS", targetQuestionId: published.id }), {}, { ...configured, gateway }), "VALIDATION", "targetQuestionId");

    const hints = await createGenerationJob(editor, request(chain, { kind: "HINTS", targetQuestionId: draft.id, count: "2" }), {}, { ...configured, gateway });
    transport?.enqueue(reply({ hints: ["What does km/h mean?", "Divide the distance by the time.", "Extra hint"] }));
    await runGenerationJob({ generationJobId: hints.id }, undefined, { gateway });
    expect(await db.question.findUniqueOrThrow({ where: { id: draft.id } })).toMatchObject({ hints: ["What does km/h mean?", "Divide the distance by the time."], aiGenerated: true, generationJobId: hints.id });
  });

  it("generates flashcards, a lesson and a study-plan template", async () => {
    const chain = await chainWithObjectives();
    const editor = await staffActor();
    const { gateway, transport } = setup();
    const tag = uniqueSuffix();

    const cards = await createGenerationJob(editor, request(chain, { kind: "FLASHCARDS", count: "2" }), {}, { ...configured, gateway });
    transport?.enqueue(reply({ flashcards: [{ cardType: "DEFINITION", front: `Integer ${tag}`, back: "A whole number.", notes: null, topicRef: null }, { cardType: "FACT", front: `Zero ${tag}`, back: "Zero is even.", notes: "", topicRef: null }] }));
    await runGenerationJob({ generationJobId: cards.id }, undefined, { gateway });
    expect(await db.flashcard.count({ where: { generationJobId: cards.id, status: "DRAFT", aiGenerated: true, ownerUserId: null } })).toBe(2);

    const lesson = await createGenerationJob(editor, request(chain, { kind: "LESSON", count: "" }), {}, { ...configured, gateway });
    transport?.enqueue(reply({ lesson: { title: `Integers ${tag}`, summary: "Whole numbers.", body: "## Integers\n\n:::definition{term=\"Integer\"}\nA whole number.\n:::\n\n:::exam-tip\nShow your working.\n:::", estimatedMinutes: 12, objectiveRefs: ["O1"] } }));
    await runGenerationJob({ generationJobId: lesson.id }, undefined, { gateway });
    const lessonRow = await db.lesson.findFirstOrThrow({ where: { generationJobId: lesson.id }, include: { topics: true, objectives: true } });
    expect(lessonRow).toMatchObject({ status: "DRAFT", aiGenerated: true, estimatedMinutes: 12 });
    expect(lessonRow.bodyHtml).toContain("Integer");
    expect(lessonRow.topics[0]).toMatchObject({ topicId: chain.subtopics[0]?.id, isPrimary: true });

    const plan = await createGenerationJob(editor, request(chain, { kind: "STUDY_PLAN", topicId: "", objectiveIds: [], count: "2", weeklyMinutes: "120" }), {}, { ...configured, gateway });
    transport?.enqueue(
      reply({
        title: `Two weeks of Topic 1 ${tag}`,
        description: "A short plan.",
        durationWeeks: 2,
        weeklyMinutes: 120,
        items: [
          { weekNumber: 1, dayOfWeek: 1, activityType: "LESSON", topicRef: "T1", targetMinutes: 40, targetQuestions: null, note: "Start here." },
          { weekNumber: 2, dayOfWeek: null, activityType: "PRACTICE", topicRef: "T2", targetMinutes: 30, targetQuestions: 10, note: "Practise." },
          { weekNumber: 3, dayOfWeek: null, activityType: "TEST", topicRef: "T2", targetMinutes: 30, targetQuestions: 10, note: "Outside the plan." },
        ],
      }),
    );
    await expect(runGenerationJob({ generationJobId: plan.id }, undefined, { gateway })).resolves.toMatchObject({ status: "COMPLETED", created: 1, rejected: 1 });
    const template = await db.studyPlanTemplate.findFirstOrThrow({ where: { generationJobId: plan.id }, include: { items: { orderBy: [{ weekNumber: "asc" }, { sortOrder: "asc" }] } } });
    expect(template).toMatchObject({ status: "DRAFT", aiGenerated: true, syllabusId: chain.syllabus.id, durationWeeks: 2, createdById: editor.userId });
    expect(template.items.map((i) => [i.weekNumber, i.activityType, i.topicId])).toEqual([
      [1, "LESSON", chain.topics[0]?.id],
      [2, "PRACTICE", chain.subtopics[0]?.id],
    ]);
  });

  it("is limited to editors with AI rights, per-editor caps and the requester's own queued jobs", async () => {
    const chain = await chainWithObjectives();
    const [editor, other, admin] = await Promise.all([staffActor(), staffActor(), staffActor("ADMIN")]);
    const [student, teacher] = await Promise.all([studentActor(), teacherActor()]);
    const { gateway } = setup();
    await expectCode(createGenerationJob(student, request(chain), {}, { ...configured, gateway }), "FORBIDDEN");
    await expectCode(createGenerationJob(teacher, request(chain), {}, { ...configured, gateway }), "FORBIDDEN");
    await expectCode(listGenerationJobs(teacher, {}), "FORBIDDEN");
    await expectCode(createGenerationJob(editor, request(chain, { topicId: chain.topics[0]?.id, syllabusId: "" }), {}, { ...configured, gateway }), "VALIDATION", "syllabusId");
    await expectCode(createGenerationJob(editor, request(chain, { count: "50" }), {}, { ...configured, gateway }), "VALIDATION", "count");

    const queued = await createGenerationJob(editor, request(chain), {}, { ...configured, gateway, limits: { editorDailyJobs: 1, editorDailyCostMicros: null } });
    await expectCode(createGenerationJob(editor, request(chain), {}, { ...configured, gateway, limits: { editorDailyJobs: 1, editorDailyCostMicros: null } }), "QUOTA_EXCEEDED");
    expect((await listGenerationJobs(editor, { mine: true })).items.map((j) => j.id)).toEqual([queued.id]);
    expect((await listGenerationJobs(other, { mine: true })).items).toEqual([]);

    await expectCode(cancelGenerationJob(other, { id: queued.id }), "FORBIDDEN");
    await expect(cancelGenerationJob(editor, { id: queued.id })).resolves.toEqual({ id: queued.id });
    const cancelled = await db.aiGenerationJob.findUniqueOrThrow({ where: { id: queued.id }, include: { job: true } });
    expect(cancelled).toMatchObject({ status: "CANCELLED", cancelledById: editor.userId });
    expect(cancelled.job?.status).toBe("CANCELLED");
    await expect(runGenerationJob({ generationJobId: queued.id }, undefined, { gateway })).resolves.toEqual({ skipped: "CANCELLED" });
    expect(await auditTrail(queued.id)).toEqual(["ai_generation.request", "ai_generation.cancel"]);

    // "Run again" queues a new job with the same settings; an admin may cancel someone else's queued job.
    const rerun = await rerunGenerationJob(editor, { id: queued.id }, {}, { ...configured, gateway });
    expect(await db.aiGenerationJob.findUniqueOrThrow({ where: { id: rerun.id } })).toMatchObject({ status: "QUEUED", kind: "MCQ", topicId: chain.subtopics[0]?.id });
    await expect(cancelGenerationJob(admin, { id: rerun.id })).resolves.toEqual({ id: rerun.id });
  });
});
