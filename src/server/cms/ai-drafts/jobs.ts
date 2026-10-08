import "server-only";
import { z } from "zod";
import { Prisma, type AiGenerationStatus, type QuestionType } from "@/generated/prisma/client";
import { formatCorrectAnswer, parseAnswerSpec, parseQuestionPayload, type QuestionOptionRecord } from "@/lib/questions";
import { getAiGateway, isAiNotConfigured, type AiCallMeta, type AiGateway } from "@/server/ai";
import { insertFlashcardDrafts, insertLessonDraft, insertQuestionDraft, markdownChecker, topicSyllabusMap, type DraftOrigin, type DraftProvenance } from "@/server/cms/imports/drafts";
import type { ImportLookups, TopicTarget } from "@/server/cms/imports/rows";
import { nextFreeSlug, slugify } from "@/server/cms/lessons/core";
import { refreshQuestionDerived } from "@/server/cms/questions/service";
import { createDraftCopyForEdit } from "@/server/content/publish";
import { toPlainText } from "@/server/content/render";
import { buildTopicTree, flattenTopicTree } from "@/server/curriculum/core";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError, isAppError } from "@/server/lib/errors";
import { registerJobHandler, type JobContext } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { convertExplanation, convertFlashcards, convertHints, convertLesson, convertQuestions, convertStudyPlan, type Rejection, type StudyPlanDraft } from "./convert";
import {
  buildGenerationPrompt,
  CONTENT_GENERATION_PROMPT_VERSION,
  CONTENT_GENERATION_ROUTE,
  CONTENT_GENERATION_SYSTEM_PROMPT,
  OUTPUT_SCHEMAS,
  type GenerationPromptContext,
  type PromptObjective,
  type PromptTopic,
} from "./prompts";
import { AI_KIND_META, generationParamsSchema, type AiDraftKind, type GeneratableQuestionType, type GenerationParams, type OutputSummary } from "./schemas";
import { AI_DRAFT_OPERATIONS, AI_GENERATE_JOB, AI_GENERATE_QUEUE, auditGeneration, getGenerationLimits } from "./service";

/**
 * The `ai.generate` worker job (queue `ai`; ARCHITECTURE §3.7, §6.6). For one AiGenerationJob:
 *
 *   QUEUED → RUNNING → call the gateway (route `contentGeneration`, DEEP tier, feature CONTENT_GEN, structured output,
 *   quota on the requester's daily generation runs, metered) → validate every item with the platform's own contracts
 *   → write the valid ones as DRAFT (`aiGenerated = true`, `generationJobId`, author = the requester, copyright
 *   UNVERIFIED, source = the platform's AI-drafts source) with a near-duplicate check against the bank → COMPLETED.
 *
 * FAILED (with the reason, and the tokens already spent) when AI is not configured, switched off, over quota, refused,
 * truncated, invalid, or when no item survives validation. Transient provider errors are retried with backoff
 * (3 attempts). The handler is idempotent: a job that is no longer QUEUED / RUNNING is skipped, and the drafts and the
 * COMPLETED status are written in one transaction. There is no path from here to APPROVED or PUBLISHED.
 */

export const generateJobPayloadSchema = z.object({ generationJobId: z.uuid() });

const AI_SOURCE_SLUG = "platform-ai-drafts";
const LONG_TX = { timeout: 120_000, maxWait: 10_000 } as const;
/** pg_trgm similarity above which a new draft is flagged as a near-duplicate of an existing item (§6.6). */
export const NEAR_DUPLICATE_SIMILARITY = 0.8;
const MAX_PROMPT_TOPICS = 80;
const MAX_PROMPT_OBJECTIVES = 40;

export interface GenerationJobDeps {
  gateway?: AiGateway;
}

// =====================================================================================================================
// Scope → prompt context and lookups
// =====================================================================================================================

/** The ContentSource that marks AI drafts (type AI_GENERATED), created on first use. */
export async function ensureAiContentSource(): Promise<string> {
  const existing = await db.contentSource.findUnique({ where: { slug: AI_SOURCE_SLUG }, select: { id: true } });
  if (existing) return existing.id;
  try {
    const created = await db.contentSource.create({
      data: {
        slug: AI_SOURCE_SLUG,
        name: "Platform AI drafts",
        type: "AI_GENERATED",
        permitsCommercialUse: true,
        permitsDerivatives: true,
        notes: "Drafts produced by the platform's AI generation pipeline (§41). Model, prompt version and job are recorded on each AiGenerationJob. Every item is reviewed, its copyright cleared and approved by a person before publication.",
      },
      select: { id: true },
    });
    return created.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return (await db.contentSource.findUniqueOrThrow({ where: { slug: AI_SOURCE_SLUG }, select: { id: true } })).id;
    }
    throw error;
  }
}

interface TargetQuestion {
  id: string;
  status: string;
  type: QuestionType;
  stem: string;
  marks: number;
  hints: string[];
  explanation: string | null;
}

interface GenerationScope {
  prompt: GenerationPromptContext;
  lookups: ImportLookups;
  defaultTopicRef: string | null;
  /** Prompt ref → topic (study plans). */
  topicRefs: Map<string, { id: string }>;
  subjectId: string;
  syllabusId: string | null;
  languageCode: string;
  target: TargetQuestion | null;
}

type JobRow = Prisma.AiGenerationJobGetPayload<{ select: typeof JOB_SELECT }>;
const JOB_SELECT = {
  id: true,
  kind: true,
  status: true,
  requestedById: true,
  subjectId: true,
  syllabusId: true,
  topicId: true,
  params: true,
  startedAt: true,
} as const satisfies Prisma.AiGenerationJobSelect;

/** Plain-text answer of the target question for the prompt (the prompt is staff-only, never shown to students). */
function describeAnswer(question: { type: QuestionType; payload: unknown; answerSpec: unknown; options: QuestionOptionRecord[] }): string {
  try {
    if (question.type === "MULTIPLE_CHOICE") {
      return question.options.filter((o) => o.isCorrect).map((o) => `${o.key}: ${toPlainText(o.content)}`).join("; ") || "(no correct option set)";
    }
    if (question.type === "ESSAY" || question.type === "EXTENDED_RESPONSE") {
      const spec = parseAnswerSpec(question.type, question.answerSpec);
      return `Mark scheme: ${spec.markScheme.points.map((p) => `${toPlainText(p.description)} [${p.marks}]`).join("; ")}`;
    }
    if (question.type === "STRUCTURED") return "(see the parts)";
    const formatted = formatCorrectAnswer(question.type, parseQuestionPayload(question.type, question.payload), parseAnswerSpec(question.type, question.answerSpec), question.options);
    return formatted ?? "(marked by mark scheme)";
  } catch {
    return "(the answer could not be read)";
  }
}

async function loadScope(job: JobRow, params: GenerationParams, kind: AiDraftKind): Promise<GenerationScope> {
  if (!job.subjectId) throw AppError.validation({ subjectId: ["The subject of this job no longer exists."] });
  const subject = await db.subject.findUniqueOrThrow({
    where: { id: job.subjectId },
    select: { id: true, name: true, languageCode: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } },
  });
  const syllabus = job.syllabusId ? await db.syllabus.findUnique({ where: { id: job.syllabusId }, select: { id: true, title: true, versionLabel: true } }) : null;
  const topic = job.topicId ? await db.topic.findUnique({ where: { id: job.topicId }, select: { id: true, kind: true, depth: true, path: true, name: true, code: true } }) : null;

  let topicPath: string | null = null;
  if (topic) {
    const ancestorIds = topic.path.split("/").filter(Boolean);
    const ancestors = await db.topic.findMany({ where: { id: { in: ancestorIds } }, select: { id: true, name: true } });
    const names = new Map(ancestors.map((a) => [a.id, a.name]));
    topicPath = ancestorIds.map((id) => names.get(id) ?? "").filter(Boolean).join(" > ");
  }

  // Topics the model may reference: the version's tree for study plans and for a version scope without one topic.
  const promptTopics: PromptTopic[] = [];
  const topicRefs = new Map<string, TopicTarget | null>();
  const planRefs = new Map<string, { id: string }>();
  let defaultTopicRef: string | null = null;
  if (topic) {
    defaultTopicRef = "t1";
    topicRefs.set("t1", { id: topic.id, kind: topic.kind, depth: topic.depth, path: topic.path, name: topic.name });
  }
  if (syllabus && (kind === "STUDY_PLAN" || !topic)) {
    const rows = await db.topic.findMany({
      where: { syllabusId: syllabus.id },
      select: { id: true, parentId: true, kind: true, depth: true, path: true, sortOrder: true, code: true, name: true },
      take: 5_000,
    });
    // The whole tree is ordered (sections included, so their topics keep their place), then narrowed to the chosen
    // topic's subtree for a study plan, and sections are left out of the references.
    const inScope = (node: { path: string }) => !(topic && kind === "STUDY_PLAN") || node.path === topic.path || node.path.startsWith(`${topic.path}/`);
    const ordered = flattenTopicTree(buildTopicTree(rows))
      .filter((node) => node.kind !== "SECTION" && inScope(node))
      .slice(0, MAX_PROMPT_TOPICS);
    defaultTopicRef = kind === "STUDY_PLAN" ? null : defaultTopicRef;
    ordered.forEach((node, index) => {
      const ref = `T${index + 1}`;
      promptTopics.push({ ref, code: node.code, name: node.name, depth: node.depth - (ordered[0]?.depth ?? 0) });
      topicRefs.set(ref.toLowerCase(), { id: node.id, kind: node.kind, depth: node.depth, path: node.path, name: node.name });
      planRefs.set(ref.toLowerCase(), { id: node.id });
    });
  }

  // Objectives: the chosen ones, else those under the chosen topic.
  const objectiveRows = params.learningObjectiveIds.length
    ? await db.learningObjective.findMany({ where: { id: { in: params.learningObjectiveIds } }, select: { id: true, code: true, statement: true }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] })
    : topic
      ? await db.learningObjective.findMany({
          where: { topic: { syllabusId: topic ? (syllabus?.id ?? undefined) : undefined, OR: [{ id: topic.id }, { path: { startsWith: `${topic.path}/` } }] } },
          select: { id: true, code: true, statement: true },
          orderBy: [{ topicId: "asc" }, { sortOrder: "asc" }],
          take: MAX_PROMPT_OBJECTIVES,
        })
      : [];
  const objectives: PromptObjective[] = objectiveRows.map((o, index) => ({ ref: `O${index + 1}`, code: o.code, statement: o.statement }));
  const objectiveRefs = new Map<string, string[]>(objectiveRows.map((o, index) => [`o${index + 1}`, [o.id]]));

  let target: TargetQuestion | null = null;
  let targetPrompt: GenerationPromptContext["targetQuestion"] = null;
  if (params.targetQuestionId) {
    const row = await db.question.findUnique({
      where: { id: params.targetQuestionId },
      select: { id: true, status: true, type: true, stem: true, marks: true, hints: true, explanation: true, payload: true, answerSpec: true, options: { orderBy: { sortOrder: "asc" } } },
    });
    if (!row) throw AppError.validation({ targetQuestionId: ["The question no longer exists."] });
    target = { id: row.id, status: row.status, type: row.type, stem: row.stem, marks: row.marks, hints: row.hints, explanation: row.explanation };
    targetPrompt = { type: row.type, stem: row.stem, marks: row.marks, answer: describeAnswer({ ...row, options: row.options }) };
  }

  const prompt: GenerationPromptContext = {
    kind,
    subject: subject.name,
    level: `${subject.qualification.examBoard.shortName} ${subject.qualification.shortName}`,
    languageCode: subject.languageCode,
    syllabus: syllabus ? `${syllabus.title} (${syllabus.versionLabel})` : null,
    topicPath,
    topics: promptTopics,
    objectives,
    count: params.count,
    difficulty: params.difficulty,
    languageLevel: params.languageLevel,
    questionTypes: params.questionTypes as GeneratableQuestionType[],
    marksPerQuestion: params.marksPerQuestion,
    weeklyMinutes: params.weeklyMinutes,
    instructions: params.instructions,
    targetQuestion: targetPrompt,
  };
  const lookups: ImportLookups = {
    subject: { id: subject.id, languageCode: subject.languageCode },
    syllabus: syllabus ? { id: syllabus.id, label: `${syllabus.title} (${syllabus.versionLabel})` } : null,
    topicRefs,
    objectiveRefs,
    existingRefs: new Set(),
    defaults: { difficulty: 3, accessTier: params.accessTier },
    provenance: { sourceId: await ensureAiContentSource(), author: null, licenceCode: null, attribution: null, sourceUrl: null },
    // AI drafts never reference images: any `asset:` reference is reported as unresolved.
    checkMarkdown: await markdownChecker([], db),
  };
  return { prompt, lookups, defaultTopicRef, topicRefs: planRefs, subjectId: subject.id, syllabusId: syllabus?.id ?? null, languageCode: subject.languageCode, target };
}

// =====================================================================================================================
// Writers
// =====================================================================================================================

interface WriteOutcome {
  created: { entityType: string; id: string }[];
  rejected: Rejection[];
  warnings: string[];
}

/** Writes generated explanation / hints into the target question: in place for a DRAFT, else into a new draft copy. */
async function writeQuestionPatch(tx: Tx, job: JobRow, target: TargetQuestion, patch: { explanation?: string; workedSolution?: string | null; conceptSummary?: string | null; hints?: string[] }): Promise<string> {
  const rows = await tx.$queryRaw<{ status: string; draftOfId: string | null }[]>`SELECT "status", "draftOfId" FROM "Question" WHERE "id" = ${target.id}::uuid FOR UPDATE`;
  const current = rows[0];
  let id: string;
  if (current?.status === "PUBLISHED") {
    const copy = await createDraftCopyForEdit(tx, "QUESTION", target.id, { kind: "user", userId: job.requestedById, roles: [] });
    if (!copy.created) throw AppError.conflict("The question has an edit in progress. Finish or discard it, then generate again.");
    id = copy.id;
  } else if (current?.status === "DRAFT" && current.draftOfId === null) {
    id = target.id;
  } else {
    throw AppError.conflict("The question is no longer a draft or published question.");
  }
  await tx.question.update({
    where: { id },
    // The requester becomes the last author (four-eyes: they cannot approve the AI text themselves).
    data: { ...patch, aiGenerated: true, generationJobId: job.id, createdById: job.requestedById },
  });
  await refreshQuestionDerived(tx, id);
  return id;
}

async function insertStudyPlanDraft(tx: Tx, job: JobRow, scope: GenerationScope, plan: StudyPlanDraft, accessTier: GenerationParams["accessTier"]): Promise<string> {
  if (!scope.syllabusId) throw AppError.validation({ syllabusId: ["Study plans need a syllabus version."] });
  const base = slugify(plan.title, "study-plan");
  const taken = await tx.studyPlanTemplate.findMany({ where: { subjectId: scope.subjectId, draftOfId: null, slug: { startsWith: base } }, select: { slug: true }, take: 2_000 });
  const created = await tx.studyPlanTemplate.create({
    data: {
      subjectId: scope.subjectId,
      syllabusId: scope.syllabusId,
      title: plan.title,
      slug: nextFreeSlug(base, new Set(taken.map((row) => row.slug))),
      description: plan.description,
      durationWeeks: plan.durationWeeks,
      weeklyMinutes: plan.weeklyMinutes,
      accessTier,
      status: "DRAFT",
      createdById: job.requestedById,
      aiGenerated: true,
      generationJobId: job.id,
      items: {
        createMany: {
          data: plan.items.map((item) => ({
            weekNumber: item.weekNumber,
            dayOfWeek: item.dayOfWeek,
            sortOrder: item.sortOrder,
            activityType: item.activityType,
            topicId: item.topicId,
            targetMinutes: item.targetMinutes,
            targetQuestions: item.targetQuestions,
            note: item.note,
          })),
        },
      },
    },
    select: { id: true },
  });
  return created.id;
}

/** Existing bank items whose text is very similar (pg_trgm) to a new draft: flagged for the reviewer, never blocked. */
async function nearDuplicates(tx: Tx, entityType: "QUESTION" | "FLASHCARD", subjectId: string, drafts: { id: string; text: string }[]): Promise<OutputSummary["nearDuplicates"]> {
  const newIds = drafts.map((d) => d.id);
  const found: OutputSummary["nearDuplicates"] = [];
  for (const draft of drafts) {
    const rows =
      entityType === "QUESTION"
        ? await tx.$queryRaw<{ id: string; sim: number }[]>`
            SELECT q."id"::text AS "id", similarity(q."stem", ${draft.text}) AS "sim"
            FROM "Question" q
            WHERE q."subjectId" = ${subjectId}::uuid AND q."parentId" IS NULL AND q."schoolId" IS NULL AND q."ownerUserId" IS NULL
              AND NOT (q."id" = ANY(${newIds}::uuid[])) AND q."stem" % ${draft.text}
            ORDER BY "sim" DESC LIMIT 1`
        : await tx.$queryRaw<{ id: string; sim: number }[]>`
            SELECT f."id"::text AS "id", similarity(f."front", ${draft.text}) AS "sim"
            FROM "Flashcard" f
            WHERE f."subjectId" = ${subjectId}::uuid AND f."ownerUserId" IS NULL
              AND NOT (f."id" = ANY(${newIds}::uuid[])) AND f."front" % ${draft.text}
            ORDER BY "sim" DESC LIMIT 1`;
    const best = rows[0];
    if (best && Number(best.sim) > NEAR_DUPLICATE_SIMILARITY) found.push({ id: draft.id, similarToId: best.id, similarity: Math.round(Number(best.sim) * 100) / 100 });
  }
  return found;
}

async function writeOutput(tx: Tx, job: JobRow, kind: AiDraftKind, data: unknown, scope: GenerationScope, params: GenerationParams): Promise<WriteOutcome & { nearDuplicates: OutputSummary["nearDuplicates"] }> {
  const origin: DraftOrigin = { createdById: job.requestedById, generationJobId: job.id };
  const provenance: DraftProvenance = scope.lookups.provenance;
  const context = {
    lookups: scope.lookups,
    defaultTopicRef: scope.defaultTopicRef,
    count: params.count,
    allowedTypes: new Set<QuestionType>(params.questionTypes as QuestionType[]),
    marksPerQuestion: params.marksPerQuestion,
  };
  switch (kind) {
    case "QUESTIONS":
    case "MCQ": {
      const output = kind === "MCQ" ? OUTPUT_SCHEMAS.MCQ.parse(data) : OUTPUT_SCHEMAS.QUESTIONS.parse(data);
      const converted = convertQuestions(kind, output.questions, kind === "MCQ" ? { ...context, allowedTypes: new Set<QuestionType>(["MULTIPLE_CHOICE"]) } : context);
      const topics = await topicSyllabusMap(tx, converted.drafts.flatMap((d) => d.doc.topics.map((t) => t.topicId)));
      const ids: string[] = [];
      for (const draft of converted.drafts) ids.push(await insertQuestionDraft(tx, draft.doc, origin, { topics }));
      const duplicates = await nearDuplicates(tx, "QUESTION", scope.subjectId, converted.drafts.map((d, i) => ({ id: ids[i] as string, text: d.doc.stem })));
      return { created: ids.map((id) => ({ entityType: "QUESTION", id })), rejected: converted.rejected, warnings: converted.warnings, nearDuplicates: duplicates };
    }
    case "FLASHCARDS": {
      const output = OUTPUT_SCHEMAS.FLASHCARDS.parse(data);
      const converted = convertFlashcards(output.flashcards, context);
      const ids = await insertFlashcardDrafts(
        tx,
        converted.drafts.map((card) => ({ subjectId: scope.subjectId, cardType: card.cardType, front: card.front, back: card.back, notes: card.notes, accessTier: card.accessTier, languageCode: scope.languageCode, topicId: card.topicId })),
        origin,
        provenance,
      );
      const duplicates = await nearDuplicates(tx, "FLASHCARD", scope.subjectId, converted.drafts.map((d, i) => ({ id: ids[i] as string, text: d.front })));
      return { created: ids.map((id) => ({ entityType: "FLASHCARD", id })), rejected: converted.rejected, warnings: [], nearDuplicates: duplicates };
    }
    case "LESSON": {
      const output = OUTPUT_SCHEMAS.LESSON.parse(data);
      const converted = convertLesson(output.lesson, context);
      if (!converted.draft) return { created: [], rejected: converted.rejected, warnings: [], nearDuplicates: [] };
      const lesson = await insertLessonDraft(tx, { ...converted.draft, subjectId: scope.subjectId, languageCode: scope.languageCode }, origin, provenance);
      return { created: [{ entityType: "LESSON", id: lesson.id }], rejected: [], warnings: [], nearDuplicates: [] };
    }
    case "EXPLANATION": {
      if (!scope.target) throw AppError.validation({ targetQuestionId: ["The question no longer exists."] });
      const converted = convertExplanation(OUTPUT_SCHEMAS.EXPLANATION.parse(data), scope.lookups.checkMarkdown);
      if (!converted.patch) return { created: [], rejected: converted.rejected, warnings: [], nearDuplicates: [] };
      const id = await writeQuestionPatch(tx, job, scope.target, converted.patch);
      const warnings = scope.target.explanation ? ["The question's previous explanation was replaced; compare the revisions before approving."] : [];
      return { created: [{ entityType: "QUESTION", id }], rejected: [], warnings, nearDuplicates: [] };
    }
    case "HINTS": {
      if (!scope.target) throw AppError.validation({ targetQuestionId: ["The question no longer exists."] });
      const converted = convertHints(OUTPUT_SCHEMAS.HINTS.parse(data).hints, params.count, scope.lookups.checkMarkdown);
      if (converted.hints.length === 0) return { created: [], rejected: converted.rejected, warnings: [], nearDuplicates: [] };
      const id = await writeQuestionPatch(tx, job, scope.target, { hints: converted.hints });
      const warnings = scope.target.hints.length > 0 ? [`The question's ${scope.target.hints.length} previous hint(s) were replaced.`] : [];
      return { created: [{ entityType: "QUESTION", id }], rejected: converted.rejected, warnings, nearDuplicates: [] };
    }
    case "STUDY_PLAN": {
      const converted = convertStudyPlan(OUTPUT_SCHEMAS.STUDY_PLAN.parse(data), { weeks: params.count, weeklyMinutes: params.weeklyMinutes, topicRefs: scope.topicRefs });
      if (!converted.plan) return { created: [], rejected: converted.rejected, warnings: [], nearDuplicates: [] };
      const id = await insertStudyPlanDraft(tx, job, scope, converted.plan, params.accessTier);
      return { created: [{ entityType: "STUDY_PLAN_TEMPLATE", id }], rejected: converted.rejected, warnings: [], nearDuplicates: [] };
    }
  }
}

// =====================================================================================================================
// Handler
// =====================================================================================================================

function meteringData(meta: AiCallMeta | null) {
  if (!meta) return {};
  return {
    model: meta.servedByModel,
    tier: meta.tier,
    promptVersion: meta.promptVersion ?? CONTENT_GENERATION_PROMPT_VERSION,
    inputTokens: meta.usage.inputTokens,
    outputTokens: meta.usage.outputTokens,
    cacheReadTokens: meta.usage.cacheReadTokens,
    cacheWriteTokens: meta.usage.cacheWriteTokens,
    costMicros: meta.costMicros,
  };
}

const FAILURE_MESSAGES: Readonly<Record<string, string>> = {
  REFUSED: "The AI declined this request. Rephrase the instructions or choose a different scope.",
  TRUNCATED: "The AI ran out of space before finishing. Ask for fewer items in one run.",
  INVALID_OUTPUT: "The AI's answer did not have the expected structure. Run the job again.",
};

/** Whether a failure is worth retrying (provider overload, network) or final (not configured, switched off, quota). */
export function classifyGenerationError(error: unknown): { permanent: boolean; message: string } {
  if (isAiNotConfigured(error)) return { permanent: true, message: "AI is not configured on this server." };
  if (isAppError(error)) {
    if (error.code === "AI_UNAVAILABLE") {
      const reason = error.details?.reason;
      // "feature_off": the platform flag `features.ai` is off (ARCHITECTURE §3.14); retrying cannot help.
      return { permanent: reason === "kill_switch" || reason === "budget" || reason === "feature_off", message: error.message };
    }
    const fieldMessage = Object.values(error.fieldErrors ?? {}).flat()[0];
    return { permanent: error.code !== "INTERNAL", message: fieldMessage ?? error.message };
  }
  return { permanent: false, message: "An unexpected error stopped the job." };
}

async function markFailed(id: string, message: string, meta: AiCallMeta | null, summary: OutputSummary | null, status: AiGenerationStatus[] = ["RUNNING", "QUEUED"]): Promise<void> {
  await db.$transaction(async (tx) => {
    const updated = await tx.aiGenerationJob.updateMany({
      where: { id, status: { in: status } },
      data: { status: "FAILED", error: message.slice(0, 2_000), completedAt: new Date(), ...meteringData(meta), ...(summary ? { outputSummary: summary as unknown as Prisma.InputJsonValue } : {}) },
    });
    if (updated.count === 1) await auditGeneration(tx, null, {}, { operation: AI_DRAFT_OPERATIONS.fail, jobId: id, metadata: { reason: message.slice(0, 300), costMicros: meta?.costMicros ?? 0 } });
  });
}

/**
 * `ai.generate` handler body. Returns a small result for the queue view; throws only for transient failures that
 * should be retried (the AiGenerationJob goes back to QUEUED with the reason).
 */
export async function runGenerationJob(
  payload: unknown,
  context: Pick<JobContext, "attempt" | "maxAttempts" | "signal"> = { attempt: 1, maxAttempts: 1, signal: new AbortController().signal },
  deps: GenerationJobDeps = {},
): Promise<Record<string, unknown>> {
  const { generationJobId: id } = generateJobPayloadSchema.parse(payload);
  const job = await db.aiGenerationJob.findUnique({ where: { id }, select: JOB_SELECT });
  if (!job) return { skipped: "missing" };
  if (job.status !== "QUEUED" && job.status !== "RUNNING") return { skipped: job.status };
  const started = await db.aiGenerationJob.updateMany({
    where: { id, status: { in: ["QUEUED", "RUNNING"] } },
    data: { status: "RUNNING", startedAt: job.startedAt ?? new Date(), error: null },
  });
  if (started.count !== 1) return { skipped: "raced" };

  const kind = job.kind as AiDraftKind;
  const params = generationParamsSchema.safeParse(job.params);
  if (!params.success || !(kind in AI_KIND_META)) {
    await markFailed(id, "The job's settings could not be read.", null, null);
    return { status: "FAILED" };
  }

  let meta: AiCallMeta | null = null;
  try {
    const scope = await loadScope(job, params.data, kind);
    const gateway = deps.gateway ?? getAiGateway();
    const limits = await getGenerationLimits();
    const result = await gateway.structured<unknown>({
      route: CONTENT_GENERATION_ROUTE,
      feature: "CONTENT_GEN",
      userId: job.requestedById,
      maxTier: "DEEP",
      // The requester's daily generation runs (AiUsageDaily CONTENT_GEN); content work is exempt from the platform
      // budget guard but always metered.
      quota: { dailyLimit: limits.editorDailyJobs },
      priority: "admin",
      promptVersion: CONTENT_GENERATION_PROMPT_VERSION,
      system: { stable: CONTENT_GENERATION_SYSTEM_PROMPT },
      messages: [{ role: "user", content: buildGenerationPrompt(scope.prompt) }],
      outputSchema: OUTPUT_SCHEMAS[kind] as z.ZodType<unknown>,
      signal: context.signal,
    });
    meta = result.meta;
    if (!result.ok) {
      await markFailed(id, FAILURE_MESSAGES[result.reason] ?? "The AI did not return usable drafts.", meta, null);
      return { status: "FAILED", reason: result.reason };
    }
    const data = result.data;
    const outcome = await db.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<{ status: string }[]>`SELECT "status"::text AS "status" FROM "AiGenerationJob" WHERE "id" = ${id}::uuid FOR UPDATE`;
      if (locked[0]?.status !== "RUNNING") return null;
      const written = await writeOutput(tx, job, kind, data, scope, params.data);
      const summary: OutputSummary = {
        created: written.created,
        nearDuplicatesFlagged: written.nearDuplicates.length,
        nearDuplicates: written.nearDuplicates,
        rejected: written.rejected,
        warnings: written.warnings,
      };
      if (written.created.length === 0) return { summary, completed: false };
      await tx.aiGenerationJob.update({
        where: { id },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          itemsCreated: written.created.length,
          outputSummary: summary as unknown as Prisma.InputJsonValue,
          error: null,
          ...meteringData(meta),
        },
      });
      await auditGeneration(tx, null, {}, {
        operation: AI_DRAFT_OPERATIONS.complete,
        jobId: id,
        metadata: { kind, created: written.created.length, rejected: written.rejected.length, nearDuplicates: written.nearDuplicates.length, costMicros: meta?.costMicros ?? 0, requestedBy: job.requestedById },
      });
      return { summary, completed: true };
    }, LONG_TX);
    if (!outcome) return { skipped: "no longer running" };
    if (!outcome.completed) {
      await markFailed(id, "None of the generated items passed validation. See the reasons below, adjust the request and run it again.", meta, outcome.summary);
      return { status: "FAILED", rejected: outcome.summary.rejected.length };
    }
    return { status: "COMPLETED", created: outcome.summary.created.length, rejected: outcome.summary.rejected.length };
  } catch (error) {
    const { permanent, message } = classifyGenerationError(error);
    if (permanent || context.attempt >= context.maxAttempts) {
      if (!permanent) logger.error("ai.generate failed on its last attempt", { generationJobId: id, err: error });
      await markFailed(id, message, meta, null);
      return { status: "FAILED", reason: message };
    }
    await db.aiGenerationJob.updateMany({
      where: { id, status: "RUNNING" },
      data: { status: "QUEUED", error: `Attempt ${context.attempt} failed: ${message} It will be retried automatically.`, ...meteringData(meta) },
    });
    throw error;
  }
}

/** Registers `ai.generate` (queue `ai`, 3 attempts). Call from src/worker/handlers.ts `registerAllJobs()`. */
export function registerAiDraftJobs(): void {
  registerJobHandler(AI_GENERATE_JOB, generateJobPayloadSchema, (payload, context) => runGenerationJob(payload, context), { queue: AI_GENERATE_QUEUE, maxAttempts: 3 });
}
