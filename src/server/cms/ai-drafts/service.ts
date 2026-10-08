import "server-only";
import { z } from "zod";
import type { AiGenerationKind, AiGenerationStatus, Prisma } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { localDateString, startOfLocalDay } from "@/lib/dates";
import { AI_NOT_CONFIGURED_MESSAGE, getAiGateway, type AiGateway } from "@/server/ai";
import { resolveRoute } from "@/server/ai/config";
import { resolveModelPrice } from "@/server/ai/pricing";
import { personName, PERSON_SELECT } from "@/server/cms/questions/context";
import { CONTENT_TYPE_LABELS, editorHref, reviewHref, type ReviewableType } from "@/server/cms/review/labels";
import { assertCmsPermission, infraActor, type CmsActor } from "@/server/cms/users/access";
import { afterCursorWhere, decodeCursor, pageOf } from "@/server/cms/users/cursor";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditAction, type AuditRequestInfo } from "@/server/lib/audit";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { cancelJob, enqueue } from "@/server/lib/jobs";
import { getKnownSetting } from "@/server/lib/settings";
import type { ContentGenerationLimits } from "./limits";
import { estimateGenerationCost, type CostEstimate } from "./estimate";
import { CONTENT_GENERATION_PROMPT_VERSION, CONTENT_GENERATION_ROUTE } from "./prompts";
import {
  AI_DRAFT_KINDS,
  AI_KIND_META,
  GENERATABLE_QUESTION_TYPES,
  generationFilterSchema,
  generationParamsSchema,
  generationRequestSchema,
  outputSummarySchema,
  type AiDraftKind,
  type AiJobStatus,
  type GenerationParams,
  type OutputSummary,
} from "./schemas";

/**
 * AI content generation for editors (§41; ARCHITECTURE §6.6). An editor (`ai.generate` + platform `content.draft`)
 * picks a scope (subject → syllabus version → topic → learning objectives), a kind, a count and a level; the request
 * becomes an AiGenerationJob (QUEUED) and the `ai.generate` worker job (./jobs.ts) calls the gateway (DEEP tier,
 * route `contentGeneration`, structured output) and stores every VALID item as DRAFT with `aiGenerated = true` and its
 * `generationJobId`. Nothing is ever published by this module: a different person reviews and approves.
 *
 * Without ANTHROPIC_API_KEY no job is accepted ("AI is not configured", never placeholder output). Spend is metered by
 * the gateway (per-editor daily quota on the CONTENT_GEN bucket); a per-editor daily cap on jobs and spend from
 * Setting `ai.contentGeneration` is checked before a job is queued.
 */

export const AI_GENERATE_JOB = "ai.generate";
export const AI_GENERATE_QUEUE = "ai";

export interface AiDraftContext {
  request?: AuditRequestInfo | null;
}

export interface AiDraftDeps {
  gateway?: AiGateway;
  /** Whether an API key is configured (tests inject `() => true`). */
  isConfigured?: () => boolean;
  now?: () => Date;
  /** Per-editor caps (default: Setting `ai.contentGeneration`). */
  limits?: ContentGenerationLimits;
}

/** True when the server has an Anthropic API key (the key itself never leaves the server). */
export function isAiConfigured(): boolean {
  return Boolean(getEnv().ANTHROPIC_API_KEY?.trim());
}

export function canGenerate(actor: CmsActor): boolean {
  try {
    assertCanGenerate(actor);
    return true;
  } catch {
    return false;
  }
}

/** `ai.generate` (CONTENT_EDITOR, ADMIN, SUPER_ADMIN) and platform-wide drafting rights. */
export function assertCanGenerate(actor: CmsActor): void {
  assertCmsPermission(actor, "ai.generate", "all");
  assertCmsPermission(actor, "content.draft", "all");
}

// =====================================================================================================================
// Limits and audit
// =====================================================================================================================

// Setting `ai.contentGeneration` (registered in SETTING_DEFINITIONS): per-editor daily caps for generation jobs.
export {
  CONTENT_GENERATION_SETTING,
  contentGenerationLimitsSchema,
  DEFAULT_CONTENT_GENERATION_LIMITS,
  type ContentGenerationLimits,
} from "./limits";

export function getGenerationLimits(): Promise<ContentGenerationLimits> {
  return getKnownSetting("ai.contentGeneration");
}

/** AI generation steps (also written to `metadata.operation`). */
export const AI_DRAFT_OPERATIONS = {
  request: "ai_generation.request",
  cancel: "ai_generation.cancel",
  complete: "ai_generation.complete",
  fail: "ai_generation.fail",
} as const;
export type AiDraftOperation = (typeof AI_DRAFT_OPERATIONS)[keyof typeof AI_DRAFT_OPERATIONS];

/** Audit action per AI generation step (precise keys of the shared registry). */
export const AI_DRAFT_AUDIT = {
  "ai_generation.request": AUDIT_ACTIONS.AI_GENERATION_REQUEST,
  "ai_generation.cancel": AUDIT_ACTIONS.AI_GENERATION_CANCEL,
  "ai_generation.complete": AUDIT_ACTIONS.AI_GENERATION_COMPLETE,
  "ai_generation.fail": AUDIT_ACTIONS.AI_GENERATION_FAIL,
} as const satisfies Record<AiDraftOperation, AuditAction>;

export async function auditGeneration(
  client: DbClient,
  actor: CmsActor | null,
  context: AiDraftContext,
  entry: { operation: AiDraftOperation; jobId: string; metadata?: Record<string, unknown>; after?: unknown },
): Promise<void> {
  const fields = actor ? infraActor(actor) : null;
  await auditInTx(client, {
    actorUserId: fields?.kind === "user" ? fields.userId : null,
    actorRoles: fields?.kind === "user" ? fields.roles : [],
    action: AI_DRAFT_AUDIT[entry.operation],
    entityType: "AiGenerationJob",
    entityId: entry.jobId,
    after: entry.after,
    metadata: { operation: entry.operation, ...entry.metadata },
    request: context.request ?? null,
  });
}

// =====================================================================================================================
// Usage and estimates
// =====================================================================================================================

export interface EditorUsageToday {
  jobs: number;
  costMicros: number;
  limits: ContentGenerationLimits;
}

/** The editor's generation jobs and metered spend today (Africa/Harare day), with the caps. Real counts only. */
export async function getEditorUsageToday(actor: CmsActor, deps: AiDraftDeps = {}): Promise<EditorUsageToday> {
  const now = deps.now?.() ?? new Date();
  const since = startOfLocalDay(localDateString(now, DEFAULT_TIMEZONE), DEFAULT_TIMEZONE);
  const where = { requestedById: actor.userId, createdAt: { gte: since }, status: { not: "CANCELLED" as AiGenerationStatus } };
  const [jobs, cost, limits] = await Promise.all([
    db.aiGenerationJob.count({ where }),
    db.aiGenerationJob.aggregate({ where, _sum: { costMicros: true } }),
    deps.limits ?? getGenerationLimits(),
  ]);
  return { jobs, costMicros: cost._sum.costMicros ?? 0, limits };
}

export interface GenerationEstimate extends CostEstimate {
  model: string;
  tier: string;
}

/** Cost estimate of one job of `kind` × `count` on the configured route, model and prices. */
export async function getGenerationEstimate(kind: AiDraftKind, count: number, deps: AiDraftDeps = {}): Promise<GenerationEstimate> {
  const config = await (deps.gateway ?? getAiGateway()).getConfig();
  const route = resolveRoute(config, CONTENT_GENERATION_ROUTE);
  const model = config.routing.tiers[route.tier].model;
  const { price } = resolveModelPrice(model, config.routing.pricing);
  return { ...estimateGenerationCost(kind, count, price, route.maxTokens), model, tier: route.tier };
}

// =====================================================================================================================
// Create / cancel / run again
// =====================================================================================================================

async function assertReferences(input: z.output<typeof generationRequestSchema>): Promise<{ topicCount: number }> {
  const errors: Record<string, string[]> = {};
  const [subject, syllabus, topic, objectives, target] = await Promise.all([
    db.subject.findUnique({ where: { id: input.subjectId }, select: { id: true } }),
    input.syllabusId ? db.syllabus.findUnique({ where: { id: input.syllabusId }, select: { id: true, subjectId: true, _count: { select: { topics: true } } } }) : null,
    input.topicId ? db.topic.findUnique({ where: { id: input.topicId }, select: { id: true, syllabusId: true, path: true } }) : null,
    input.objectiveIds.length > 0 ? db.learningObjective.findMany({ where: { id: { in: input.objectiveIds } }, select: { id: true, topic: { select: { syllabusId: true, path: true } } } }) : [],
    input.targetQuestionId
      ? db.question.findUnique({
          where: { id: input.targetQuestionId },
          select: { id: true, subjectId: true, status: true, parentId: true, draftOfId: true, schoolId: true, ownerUserId: true, pendingDraft: { select: { id: true } } },
        })
      : null,
  ]);
  if (!subject) errors.subjectId = ["Choose an existing subject."];
  if (input.syllabusId && (!syllabus || syllabus.subjectId !== input.subjectId)) errors.syllabusId = ["Choose a syllabus version of this subject."];
  if (input.topicId && (!topic || topic.syllabusId !== input.syllabusId)) errors.topicId = ["Choose a topic of this syllabus version."];
  if (objectives.length !== new Set(input.objectiveIds).size || objectives.some((o) => o.topic.syllabusId !== input.syllabusId)) {
    errors.objectiveIds = ["Choose learning objectives of this syllabus version."];
  } else if (topic && objectives.some((o) => o.topic.path !== topic.path && !o.topic.path.startsWith(`${topic.path}/`))) {
    errors.objectiveIds = ["Choose learning objectives of the chosen topic."];
  }
  if (input.kind === "STUDY_PLAN" && syllabus && syllabus._count.topics === 0) errors.syllabusId = ["This syllabus version has no topics to plan."];
  if (AI_KIND_META[input.kind].needsTargetQuestion) {
    if (!target || target.parentId !== null || target.draftOfId !== null || target.schoolId !== null || target.ownerUserId !== null || target.subjectId !== input.subjectId) {
      errors.targetQuestionId = ["Choose a question of this subject's bank."];
    } else if (target.status !== "DRAFT" && target.status !== "PUBLISHED") {
      errors.targetQuestionId = ["This question is in review. Generate for drafts or published questions only."];
    } else if (target.status === "PUBLISHED" && target.pendingDraft) {
      errors.targetQuestionId = ["This question already has an edit in progress. Finish or discard it first."];
    }
  }
  if (Object.keys(errors).length > 0) throw AppError.validation(errors, "Some choices are not valid.");
  return { topicCount: syllabus?._count.topics ?? 0 };
}

export interface CreatedGenerationJob {
  id: string;
  estimate: GenerationEstimate;
}

/**
 * Queues a generation job. Refused (with a clear message, never a placeholder result) when AI is not configured, and
 * when the editor has reached today's job or spend cap.
 */
export async function createGenerationJob(actor: CmsActor, raw: unknown, context: AiDraftContext = {}, deps: AiDraftDeps = {}): Promise<CreatedGenerationJob> {
  assertCanGenerate(actor);
  if (!(deps.isConfigured ?? isAiConfigured)()) {
    throw new AppError("AI_UNAVAILABLE", `${AI_NOT_CONFIGURED_MESSAGE} on this server, so drafts cannot be generated.`, { details: { reason: "not_configured" } });
  }
  const parsed = generationRequestSchema.safeParse(raw);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const input = parsed.data;
  const meta = AI_KIND_META[input.kind];
  const count = input.count ?? meta.defaultCount;
  await assertReferences(input);

  const usage = await getEditorUsageToday(actor, deps);
  if (usage.jobs >= usage.limits.editorDailyJobs) {
    throw new AppError("QUOTA_EXCEEDED", `You have used today's ${usage.limits.editorDailyJobs} generation runs. The limit resets tomorrow.`);
  }
  if (usage.limits.editorDailyCostMicros !== null && usage.costMicros >= usage.limits.editorDailyCostMicros) {
    throw new AppError("QUOTA_EXCEEDED", "You have reached today's AI generation budget. It resets tomorrow.");
  }

  const subject = await db.subject.findUniqueOrThrow({ where: { id: input.subjectId }, select: { languageCode: true } });
  const estimate = await getGenerationEstimate(input.kind, count, deps);
  const params: GenerationParams = {
    version: 1,
    count,
    difficulty: input.difficulty,
    languageLevel: input.languageLevel,
    language: subject.languageCode,
    questionTypes: input.kind === "QUESTIONS" ? (input.questionTypes.length > 0 ? input.questionTypes : [...GENERATABLE_QUESTION_TYPES]) : input.kind === "MCQ" ? ["MULTIPLE_CHOICE"] : [],
    learningObjectiveIds: [...new Set(input.objectiveIds)],
    marksPerQuestion: input.kind === "QUESTIONS" || input.kind === "MCQ" ? input.marksPerQuestion : null,
    targetQuestionId: meta.needsTargetQuestion ? input.targetQuestionId : null,
    accessTier: input.accessTier,
    weeklyMinutes: input.kind === "STUDY_PLAN" ? input.weeklyMinutes : null,
    instructions: input.instructions,
  };
  const id = await db.$transaction(async (tx) => {
    const job = await tx.aiGenerationJob.create({
      data: {
        requestedById: actor.userId,
        kind: input.kind as AiGenerationKind,
        status: "QUEUED",
        subjectId: input.subjectId,
        syllabusId: input.syllabusId,
        topicId: input.topicId,
        params: params as unknown as Prisma.InputJsonValue,
        itemsRequested: count,
        estimatedCostMicros: estimate.costMicros,
        model: estimate.model,
        tier: estimate.tier as "FAST" | "STANDARD" | "DEEP",
        promptVersion: CONTENT_GENERATION_PROMPT_VERSION,
      },
      select: { id: true },
    });
    const queued = await enqueue(AI_GENERATE_JOB, { generationJobId: job.id }, { client: tx, queue: AI_GENERATE_QUEUE, dedupeKey: `gen:${job.id}`, maxAttempts: 3 });
    if (queued.id) await tx.aiGenerationJob.update({ where: { id: job.id }, data: { jobId: queued.id } });
    await auditGeneration(tx, actor, context, {
      operation: AI_DRAFT_OPERATIONS.request,
      jobId: job.id,
      after: { kind: input.kind, subjectId: input.subjectId, syllabusId: input.syllabusId, topicId: input.topicId, count, targetQuestionId: params.targetQuestionId },
      metadata: { estimatedCostMicros: estimate.costMicros, model: estimate.model },
    });
    return job.id;
  });
  return { id, estimate };
}

/** Cancels a QUEUED job (the requester, or an admin). A running job cannot be stopped mid-call. */
export async function cancelGenerationJob(actor: CmsActor, raw: unknown, context: AiDraftContext = {}): Promise<{ id: string }> {
  assertCanGenerate(actor);
  const { id } = z.object({ id: z.uuid("Choose a valid job.") }).parse(raw);
  const job = await db.aiGenerationJob.findUnique({ where: { id }, select: { id: true, status: true, requestedById: true, jobId: true } });
  if (!job) throw AppError.notFound("Generation job not found.");
  const isAdmin = actor.roles.includes("ADMIN") || actor.roles.includes("SUPER_ADMIN");
  if (job.requestedById !== actor.userId && !isAdmin) throw AppError.forbidden("Only the editor who asked for this job (or an admin) can cancel it.");
  if (job.status !== "QUEUED") throw AppError.conflict(job.status === "RUNNING" ? "The job is already running and will finish on its own." : "This job has already finished.");
  const cancelled = await db.$transaction(async (tx) => {
    const updated = await tx.aiGenerationJob.updateMany({ where: { id, status: "QUEUED" }, data: { status: "CANCELLED", cancelledAt: new Date(), cancelledById: actor.userId } });
    if (updated.count !== 1) return false;
    await auditGeneration(tx, actor, context, { operation: AI_DRAFT_OPERATIONS.cancel, jobId: id });
    return true;
  });
  if (!cancelled) throw AppError.conflict("The job has just started and can no longer be cancelled.");
  if (job.jobId) await cancelJob(job.jobId);
  return { id };
}

/** Queues a new job with the same scope and settings (e.g. after a failure). */
export async function rerunGenerationJob(actor: CmsActor, raw: unknown, context: AiDraftContext = {}, deps: AiDraftDeps = {}): Promise<CreatedGenerationJob> {
  assertCanGenerate(actor);
  const { id } = z.object({ id: z.uuid("Choose a valid job.") }).parse(raw);
  const job = await db.aiGenerationJob.findUnique({ where: { id }, select: { kind: true, subjectId: true, syllabusId: true, topicId: true, params: true } });
  if (!job || !job.subjectId) throw AppError.notFound("Generation job not found.");
  const params = generationParamsSchema.safeParse(job.params);
  if (!params.success) throw AppError.conflict("This job's settings can no longer be read. Start a new one.");
  return createGenerationJob(
    actor,
    {
      kind: job.kind,
      subjectId: job.subjectId,
      syllabusId: job.syllabusId,
      topicId: job.topicId,
      objectiveIds: params.data.learningObjectiveIds,
      count: params.data.count,
      difficulty: params.data.difficulty,
      languageLevel: params.data.languageLevel,
      questionTypes: job.kind === "QUESTIONS" ? params.data.questionTypes : [],
      marksPerQuestion: params.data.marksPerQuestion,
      targetQuestionId: params.data.targetQuestionId,
      accessTier: params.data.accessTier,
      weeklyMinutes: params.data.weeklyMinutes,
      instructions: params.data.instructions,
    },
    context,
    deps,
  );
}

// =====================================================================================================================
// Read models
// =====================================================================================================================

export interface GenerationListRow {
  id: string;
  kind: AiDraftKind;
  status: AiJobStatus;
  subject: string | null;
  scope: string | null;
  itemsRequested: number | null;
  itemsCreated: number;
  costMicros: number;
  estimatedCostMicros: number | null;
  requestedBy: string | null;
  requestedByMe: boolean;
  createdAt: Date;
  completedAt: Date | null;
}

const LIST_SELECT = {
  id: true,
  kind: true,
  status: true,
  itemsRequested: true,
  itemsCreated: true,
  costMicros: true,
  estimatedCostMicros: true,
  createdAt: true,
  completedAt: true,
  requestedById: true,
  subject: { select: { name: true } },
  syllabus: { select: { versionLabel: true } },
  topic: { select: { code: true, name: true } },
  requestedBy: PERSON_SELECT,
} as const satisfies Prisma.AiGenerationJobSelect;
type ListData = Prisma.AiGenerationJobGetPayload<{ select: typeof LIST_SELECT }>;

function isKind(value: string): value is AiDraftKind {
  return (AI_DRAFT_KINDS as readonly string[]).includes(value);
}

function toRow(row: ListData, actor: CmsActor): GenerationListRow {
  const scope = row.topic ? `${row.topic.code ? `${row.topic.code} ` : ""}${row.topic.name}` : row.syllabus ? row.syllabus.versionLabel : null;
  return {
    id: row.id,
    kind: isKind(row.kind) ? row.kind : "QUESTIONS",
    status: row.status as AiJobStatus,
    subject: row.subject?.name ?? null,
    scope,
    itemsRequested: row.itemsRequested,
    itemsCreated: row.itemsCreated,
    costMicros: row.costMicros,
    estimatedCostMicros: row.estimatedCostMicros,
    requestedBy: personName(row.requestedBy),
    requestedByMe: row.requestedById === actor.userId,
    createdAt: row.createdAt,
    completedAt: row.completedAt,
  };
}

/** Generation jobs newest first (filters: status, kind, mine), cursor pages. */
export async function listGenerationJobs(actor: CmsActor, raw: unknown = {}): Promise<{ items: GenerationListRow[]; nextCursor: string | null }> {
  assertCanGenerate(actor);
  const parsed = generationFilterSchema.safeParse(raw);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const filter = parsed.data;
  const cursor = filter.cursor ? decodeCursor(filter.cursor) : null;
  const rows = await db.aiGenerationJob.findMany({
    where: {
      ...(filter.status ? { status: filter.status } : {}),
      ...(filter.kind ? { kind: filter.kind } : {}),
      ...(filter.mine ? { requestedById: actor.userId } : {}),
      ...afterCursorWhere(cursor),
    },
    select: LIST_SELECT,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: filter.limit + 1,
  });
  const page = pageOf(rows, filter.limit);
  return { items: page.items.map((row) => toRow(row, actor)), nextCursor: page.nextCursor };
}

export interface GeneratedItemView {
  entityType: ReviewableType;
  typeLabel: string;
  id: string;
  label: string;
  status: string | null;
  editorHref: string;
  reviewHref: string;
  /** The item no longer exists (discarded draft). */
  missing: boolean;
}

export interface GenerationDetail extends GenerationListRow {
  syllabus: string | null;
  topic: string | null;
  params: GenerationParams | null;
  objectives: { id: string; label: string }[];
  targetQuestion: { id: string; label: string } | null;
  model: string | null;
  tier: string | null;
  promptVersion: string | null;
  tokens: { input: number; output: number; cacheRead: number; cacheWrite: number };
  summary: OutputSummary | null;
  created: GeneratedItemView[];
  error: string | null;
  startedAt: Date | null;
  cancelledAt: Date | null;
  cancelledBy: string | null;
  canCancel: boolean;
  queue: { status: string; attempts: number } | null;
}

function excerpt(markdown: string, max = 120): string {
  const text = markdown.replace(/[#*_`>]/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

async function createdItemViews(summary: OutputSummary | null): Promise<GeneratedItemView[]> {
  const refs = summary?.created ?? [];
  const ids = (type: string) => refs.filter((r) => r.entityType === type).map((r) => r.id);
  const [questions, flashcards, lessons, templates] = await Promise.all([
    ids("QUESTION").length ? db.question.findMany({ where: { id: { in: ids("QUESTION") } }, select: { id: true, stem: true, status: true } }) : [],
    ids("FLASHCARD").length ? db.flashcard.findMany({ where: { id: { in: ids("FLASHCARD") } }, select: { id: true, front: true, status: true } }) : [],
    ids("LESSON").length ? db.lesson.findMany({ where: { id: { in: ids("LESSON") } }, select: { id: true, title: true, status: true } }) : [],
    ids("STUDY_PLAN_TEMPLATE").length ? db.studyPlanTemplate.findMany({ where: { id: { in: ids("STUDY_PLAN_TEMPLATE") } }, select: { id: true, title: true, status: true } }) : [],
  ]);
  const found = new Map<string, { label: string; status: string }>([
    ...questions.map((q) => [q.id, { label: excerpt(q.stem), status: q.status }] as const),
    ...flashcards.map((f) => [f.id, { label: excerpt(f.front), status: f.status }] as const),
    ...lessons.map((l) => [l.id, { label: l.title, status: l.status }] as const),
    ...templates.map((t) => [t.id, { label: t.title, status: t.status }] as const),
  ]);
  return refs.flatMap((ref) => {
    const type = ref.entityType as ReviewableType;
    if (!(type in CONTENT_TYPE_LABELS)) return [];
    const item = found.get(ref.id);
    return [
      {
        entityType: type,
        typeLabel: CONTENT_TYPE_LABELS[type].singular,
        id: ref.id,
        label: item?.label ?? "Removed draft",
        status: item?.status ?? null,
        editorHref: editorHref(type, ref.id),
        reviewHref: reviewHref(type, ref.id),
        missing: !item,
      },
    ];
  });
}

/** One generation job with its settings, metering, created drafts (linked into the editors and review) and problems. */
export async function getGenerationJob(actor: CmsActor, id: string): Promise<GenerationDetail> {
  assertCanGenerate(actor);
  if (!z.uuid().safeParse(id).success) throw AppError.notFound("Generation job not found.");
  const row = await db.aiGenerationJob.findUnique({
    where: { id },
    select: {
      ...LIST_SELECT,
      params: true,
      model: true,
      tier: true,
      promptVersion: true,
      inputTokens: true,
      outputTokens: true,
      cacheReadTokens: true,
      cacheWriteTokens: true,
      outputSummary: true,
      error: true,
      startedAt: true,
      cancelledAt: true,
      cancelledBy: PERSON_SELECT,
      syllabus: { select: { title: true, versionLabel: true } },
      job: { select: { status: true, attempts: true } },
    },
  });
  if (!row) throw AppError.notFound("Generation job not found.");
  const params = generationParamsSchema.safeParse(row.params);
  const summary = row.outputSummary ? outputSummarySchema.safeParse(row.outputSummary) : null;
  const objectiveIds = params.success ? params.data.learningObjectiveIds : [];
  const targetId = params.success ? params.data.targetQuestionId : null;
  const [objectives, target, created] = await Promise.all([
    objectiveIds.length ? db.learningObjective.findMany({ where: { id: { in: objectiveIds } }, select: { id: true, code: true, statement: true } }) : [],
    targetId ? db.question.findUnique({ where: { id: targetId }, select: { id: true, stem: true } }) : null,
    createdItemViews(summary?.success ? summary.data : null),
  ]);
  const isAdmin = actor.roles.includes("ADMIN") || actor.roles.includes("SUPER_ADMIN");
  return {
    ...toRow(row, actor),
    syllabus: row.syllabus ? `${row.syllabus.title} (${row.syllabus.versionLabel})` : null,
    topic: row.topic ? `${row.topic.code ? `${row.topic.code} ` : ""}${row.topic.name}` : null,
    params: params.success ? params.data : null,
    objectives: objectives.map((o) => ({ id: o.id, label: `${o.code ? `${o.code} ` : ""}${o.statement}` })),
    targetQuestion: target ? { id: target.id, label: excerpt(target.stem) } : null,
    model: row.model,
    tier: row.tier,
    promptVersion: row.promptVersion,
    tokens: { input: row.inputTokens, output: row.outputTokens, cacheRead: row.cacheReadTokens, cacheWrite: row.cacheWriteTokens },
    summary: summary?.success ? summary.data : null,
    created,
    error: row.error,
    startedAt: row.startedAt,
    cancelledAt: row.cancelledAt,
    cancelledBy: personName(row.cancelledBy),
    canCancel: row.status === "QUEUED" && (row.requestedById === actor.userId || isAdmin),
    queue: row.job ? { status: row.job.status, attempts: row.job.attempts } : null,
  };
}

// =====================================================================================================================
// Form options
// =====================================================================================================================

export interface TargetQuestionOption {
  id: string;
  label: string;
  type: string;
  status: string;
}

/** Live platform root questions of a subject (DRAFT or PUBLISHED, no edit in progress) for EXPLANATION / HINTS. */
export async function searchTargetQuestions(actor: CmsActor, raw: { subjectId: string; q?: string | null }): Promise<TargetQuestionOption[]> {
  assertCanGenerate(actor);
  const input = z.object({ subjectId: z.uuid(), q: z.string().trim().max(200).nullish() }).parse(raw);
  const term = input.q?.trim();
  const rows = await db.question.findMany({
    where: {
      subjectId: input.subjectId,
      parentId: null,
      draftOfId: null,
      schoolId: null,
      ownerUserId: null,
      status: { in: ["DRAFT", "PUBLISHED"] },
      pendingDraft: { is: null },
      ...(term ? (z.uuid().safeParse(term).success ? { id: term } : { stem: { contains: term, mode: "insensitive" as const } }) : {}),
    },
    select: { id: true, stem: true, type: true, status: true },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: 20,
  });
  return rows.map((row) => ({ id: row.id, label: excerpt(row.stem, 140), type: row.type, status: row.status }));
}
