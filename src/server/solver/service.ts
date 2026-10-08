import "server-only";
import { z } from "zod";
import type { AiConversationStatus, AiMessageStatus, Prisma, Role } from "@/generated/prisma/client";
import type { AiModelTier, Entitlements } from "@/lib/billing/entitlements";
import { DEFAULT_TIMEZONE } from "@/lib/dates";
import { toStudentView } from "@/lib/questions";
import { AI_NOT_CONFIGURED_MESSAGE, getAiGateway, type AiCallMeta, type AiGateway } from "@/server/ai";
import { isFeatureEnabled, type AiConfig } from "@/server/ai/config";
import { buildStudentContext, contextInputFromSnapshot, type ContextSnapshotV1 } from "@/server/ai/context";
import { heuristicIntent } from "@/server/ai/intent";
import { hasPermission } from "@/server/auth/permissions";
import {
  assertEntitlement,
  canAccessSubjectContent,
  EntitlementRequiredError,
  evaluateLimit,
  getEntitlements,
  hasFeature,
  LimitReachedError,
  UPGRADE_PATH,
} from "@/server/billing/entitlements";
import { aiSolverToday, limitWindow } from "@/server/billing/usage";
import { renderContent, trustPersistedHtml } from "@/server/content/render";
import { buildTopicTree, flattenTopicTree, PUBLISHED_SYLLABUS_STATUSES } from "@/server/curriculum/core";
import { getTopicSubtreeIds } from "@/server/curriculum/topics";
import { db } from "@/server/db";
import { assertGuardianConsent } from "@/server/family/consent-gate";
import { decodeCursor, encodeCursor, pageOf } from "@/server/lib/api";
import { withUserContext } from "@/server/lib/db-context";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, rateLimits } from "@/server/lib/rate-limit";
import { getStorage, type StorageDriver } from "@/server/lib/storage";
import { createMediaAsset, UPLOAD_POLICIES } from "@/server/lib/uploads";
import { candidatePool, getQuestionsForAttempt } from "@/server/questions";
import { aiLockMessage, getAiHelpGate, listTutorSubjects, loadHelplines, type AiHelpGate } from "@/server/tutor";
import { buildContextSnapshot, resolveTutorScope } from "@/server/tutor/context";
import {
  buildSolverSystem,
  buildTopicCatalogue,
  emptySolution,
  finalizeSolution,
  matchTopicByName,
  MAX_BANK_SIMILAR,
  parseStoredSolution,
  PHOTO_ONLY_PROMPT,
  practiceHrefFor,
  serializeSolution,
  shouldEscalate,
  SOLVE_MODES,
  solveTitle,
  SOLVER_CODE_DETAIL,
  SOLVER_HARD_ROUTE,
  SOLVER_PROMPT_VERSION,
  SOLVER_ROUTE,
  SOLVER_TRIAGE_PROMPT,
  SOLVER_TRIAGE_ROUTE,
  solverOutputSchema,
  solverQuota,
  topicIdForKey,
  TRIAGE_MAX_INPUT_CHARS,
  triageOutputSchema,
  tutorHrefFor,
  type CatalogueTopic,
  type SolveMode,
  type SolverTriage,
  type StoredSolution,
  type TopicCatalogue,
} from "./core";
import { renderSolution } from "./render";
import type {
  SimilarBankQuestionView,
  SolutionView,
  SolveOutcome,
  SolveResult,
  SolverStatus,
  SolverSubjectOption,
  SolveSummary,
} from "./types";

/**
 * The AI question solver (§15; §14 teach-first pedagogy; §40 cost control; ARCHITECTURE §6.2-§6.4, §3.11 uploads, §4.9
 * privacy). One service for every channel: the web page (Server Actions) and future REST / app clients.
 *
 * A solve (`solveQuestion`):
 *   validate (text and/or photo, mode, subject) -> safeguarding phrases (supportive reply + helplines; no model call,
 *   nothing stored) -> AI configured + SOLVER switch -> plan: aiSolverPerDay (non-zero allowance, then today's count
 *   BEFORE any model call), aiImageUploads for photos -> exam integrity and the teacher's AI-help setting
 *   (`getAiHelpGate`: an open attempt under exam conditions or no-AI assignment work pauses all AI help; open
 *   hints-only assignment work pauses the solver; refused without a model call) -> retry replay (clientRequestId) ->
 *   rateLimits.aiMessage -> photo stored as an
 *   OWNER_ONLY SOLVER_UPLOAD MediaAsset (sniffed, re-encoded without EXIF, size from Setting ai.limits.maxImageBytes)
 *   -> scope: the chosen subject's enrolment (or the only one) with its PINNED syllabus topics as a catalogue and the
 *   PII-free student context -> tier: STANDARD ("solver"); DEEP ("solverHard") only when the plan allows DEEP and a
 *   FAST triage calls it hard multi-step maths / science -> gateway.structured (quota reserved, tier capped by
 *   aiMaxModelTier) -> cleaned solution (`finalizeSolution`) -> topic matched to the pinned tree (catalogue key, else
 *   name) -> up to 3 PUBLISHED bank questions on that topic (student's access tier) -> stored as AiConversation (mode
 *   SOLVER) + USER / ASSISTANT AiMessage with full metering, all inside `withUserContext` (row-level security: private
 *   to the student; parents and teachers never see it).
 * Without an API key every entry point reports "AI is not configured" (AppError AI_UNAVAILABLE), never a fabricated
 * answer.
 */

/** The acting student. Structurally satisfied by the auth `Actor`. */
export interface SolverActor {
  userId: string;
  roles: readonly Role[];
  /** IANA time zone for the quota day (Profile.timezone); default Africa/Harare. */
  timeZone?: string | undefined;
  channel?: "web" | "api" | "whatsapp" | undefined;
}

export interface SolverDeps {
  /** Defaults to the production gateway; tests inject `createAiGateway({ transport: fake, ... })`. */
  gateway?: AiGateway;
  now?: () => Date;
  /** Per-minute limiter (default `rateLimits.aiMessage`). */
  assertRateLimit?: (userId: string) => Promise<void>;
  /** Whether the server has an AI key (default: ANTHROPIC_API_KEY is set). */
  isConfigured?: () => boolean;
  /** Storage driver for photos (tests use a temporary local driver). */
  storage?: StorageDriver;
}

/** Image types the model accepts that the SOLVER_UPLOAD policy stores (PNG, JPEG, WebP; HEIC is refused upstream). */
const MODEL_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
type ModelImageType = (typeof MODEL_IMAGE_TYPES)[number];

const ENROLLMENT_STATUSES = ["ACTIVE", "PAUSED"] as const;
const LIST_STATUSES = ["ACTIVE", "LOCKED"] as const satisfies readonly AiConversationStatus[];
const MAX_TOPICS_LOADED = 3_000;

const uuid = z.uuid();

function parseInput<S extends z.ZodType>(schema: S, value: unknown): z.output<S> {
  const result = schema.safeParse(value);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

function notFound(): AppError {
  return AppError.notFound("We couldn't find that question.");
}

function assertSolverUser(actor: SolverActor): void {
  if (!uuid.safeParse(actor.userId).success) throw AppError.unauthenticated();
  if (!hasPermission({ roles: [...actor.roles] }, "ai.use", "all")) throw AppError.forbidden("The question solver is for students.");
}

function zoneOf(actor: SolverActor): string {
  return actor.timeZone || DEFAULT_TIMEZONE;
}

function isConfiguredDefault(): boolean {
  return Boolean(getEnv().ANTHROPIC_API_KEY?.trim());
}

async function defaultRateLimit(userId: string): Promise<void> {
  await assertRateLimit(rateLimits.aiMessage(userId), "You're asking questions very quickly. Please wait a moment and try again.");
}

function maxImageBytes(config: AiConfig): number {
  return Math.min(config.limits.maxImageBytes, UPLOAD_POLICIES.SOLVER_UPLOAD.maxBytes);
}

function formatMb(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return Number.isInteger(mb) ? `${mb} MB` : `${mb.toFixed(1)} MB`;
}

const HINTS_ONLY_MESSAGE =
  "Your teacher allows only hints for the assignment you're working on, so the solver is paused until you submit it. You can still ask the AI tutor for hints.";

/**
 * Whether the solver may run now (ARCHITECTURE §6.4): never while AI help is paused (an attempt under exam conditions,
 * or assignment work whose teacher allows no AI help), and never during assignment work limited to hints (the solver
 * always produces a full worked solution).
 */
function solverBlockedBy(gate: AiHelpGate): AppError | null {
  if (gate.lock) return new AppError("FORBIDDEN", aiLockMessage(gate.lock, "solver"), { details: { [SOLVER_CODE_DETAIL]: "EXAM_IN_PROGRESS", lock: gate.lock } });
  if (gate.aiHelp === "HINTS_ONLY") return new AppError("FORBIDDEN", HINTS_ONLY_MESSAGE, { details: { [SOLVER_CODE_DETAIL]: "EXAM_IN_PROGRESS", aiHelp: gate.aiHelp } });
  return null;
}

// =====================================================================================================================
// Status and pickers
// =====================================================================================================================

/** What the solver page shows: configured / switched on / plan / allowance / exam lock. */
export async function getSolverStatus(actor: SolverActor, deps: SolverDeps = {}): Promise<SolverStatus> {
  assertSolverUser(actor);
  const gateway = deps.gateway ?? getAiGateway();
  const now = deps.now?.() ?? new Date();
  const [config, resolved, gate] = await Promise.all([gateway.getConfig(), getEntitlements(actor.userId), getAiHelpGate(actor.userId, now)]);
  const examLocked = solverBlockedBy(gate) !== null;
  const entitlements = resolved.entitlements;
  const entitled = hasFeature(entitlements, "ai_solver");
  const limit = entitlements.aiSolverPerDay;
  const used = entitled && limit !== null ? await aiSolverToday(actor.userId, zoneOf(actor), now) : 0;
  return {
    configured: (deps.isConfigured ?? isConfiguredDefault)(),
    enabled: isFeatureEnabled(config, "SOLVER"),
    entitled,
    imageUploads: entitled && hasFeature(entitlements, "ai_images"),
    quota: entitled ? solverQuota(limit, used) : { limit: 0, remaining: 0 },
    examLocked,
    maxInputChars: config.limits.maxInputCharsPerMessage,
    maxImageBytes: maxImageBytes(config),
    upgradeHref: UPGRADE_PATH,
  };
}

/** The student's subjects (enrolments) for the optional subject picker. */
export async function listSolverSubjects(actor: SolverActor): Promise<SolverSubjectOption[]> {
  assertSolverUser(actor);
  return listTutorSubjects(actor);
}

// =====================================================================================================================
// Solving
// =====================================================================================================================

export const solveQuestionSchema = z.strictObject({
  /** The typed question (length capped by Setting ai.limits.maxInputCharsPerMessage below). */
  text: z.string().max(200_000).optional(),
  /** A photo already uploaded through `POST /api/v1/uploads?purpose=solver` (API clients). */
  imageAssetId: z.uuid().optional(),
  mode: z.enum(SOLVE_MODES).default("TEACH"),
  subjectId: z.uuid().optional(),
  /** Client-generated id: a retry after a dropped connection opens the stored solve instead of charging again. */
  clientRequestId: z
    .string()
    .regex(/^[A-Za-z0-9_-]{8,64}$/, { message: "Invalid request id." })
    .optional(),
});
export type SolveQuestionInput = z.input<typeof solveQuestionSchema>;

/** A photo sent with the request (web form): stored through the upload pipeline first. */
export interface SolverPhotoUpload {
  bytes: Uint8Array;
  filename?: string | null;
}

interface SolverAccess {
  entitlements: Entitlements;
  config: AiConfig;
  limit: number | null;
  used: number;
}

/**
 * Everything that must hold before any model call or upload: AI configured and switched on, the plan's allowance
 * (and photos), today's count, and no exam in progress.
 *
 * @throws AppError AI_UNAVAILABLE | ENTITLEMENT_REQUIRED | QUOTA_EXCEEDED | FORBIDDEN (exam in progress)
 */
async function assertSolverAccess(
  actor: SolverActor,
  input: { image: boolean; subjectId: string | null },
  deps: SolverDeps,
  now: Date,
): Promise<SolverAccess> {
  const gateway = deps.gateway ?? getAiGateway();
  if (!(deps.isConfigured ?? isConfiguredDefault)()) {
    throw new AppError("AI_UNAVAILABLE", AI_NOT_CONFIGURED_MESSAGE, { details: { reason: "not_configured" } });
  }
  const config = await gateway.getConfig();
  if (!isFeatureEnabled(config, "SOLVER")) {
    throw new AppError("AI_UNAVAILABLE", "AI help is switched off right now. Please try again later.", { details: { reason: "kill_switch" } });
  }
  const context = input.subjectId ? { subjectId: input.subjectId } : undefined;
  const entitlements = await assertEntitlement(actor, "ai_solver", context);
  if (input.image) await assertEntitlement(actor, "ai_images", context);
  // A minor whose guardian withdrew consent (or has not given it, where required): no upload, no model call.
  await assertGuardianConsent(actor, "ai_processing");
  const limit = entitlements.aiSolverPerDay;
  const used = limit === null ? 0 : await aiSolverToday(actor.userId, zoneOf(actor), now);
  if (limit !== null && used >= limit) {
    if (limit === 0) throw new EntitlementRequiredError("aiSolverPerDay");
    throw new LimitReachedError({ ...evaluateLimit("aiSolverPerDay", limit, used), limit }, limitWindow("aiSolverPerDay", now, zoneOf(actor)).end, now);
  }
  const blocked = solverBlockedBy(await getAiHelpGate(actor.userId, now));
  if (blocked) throw blocked;
  return { entitlements, config, limit, used };
}

/** A recent solve of this student carrying `clientRequestId` (retry after a dropped connection). */
async function findReplay(userId: string, clientRequestId: string): Promise<string | null> {
  return withUserContext(userId, async (tx) => {
    // Retries are always recent: look in the newest solves only (index userId, status, lastMessageAt), then use the
    // (conversationId, clientMessageId) unique index. Never a scan of AiMessage.
    const recent = await tx.aiConversation.findMany({
      where: { userId, mode: "SOLVER" },
      orderBy: [{ lastMessageAt: { sort: "desc", nulls: "last" } }, { id: "desc" }],
      take: 5,
      select: { id: true },
    });
    if (recent.length === 0) return null;
    const message = await tx.aiMessage.findFirst({
      where: { conversationId: { in: recent.map((row) => row.id) }, clientMessageId: clientRequestId, role: "USER" },
      select: { conversationId: true },
    });
    return message?.conversationId ?? null;
  });
}

interface LoadedImage {
  assetId: string;
  mediaType: ModelImageType;
  data: string;
}

/** Stores an uploaded photo (OWNER_ONLY SOLVER_UPLOAD) and returns its id. */
async function storePhoto(actor: SolverActor, photo: SolverPhotoUpload, config: AiConfig, deps: SolverDeps): Promise<string> {
  const cap = maxImageBytes(config);
  if (photo.bytes.byteLength === 0) throw AppError.validation({ photo: ["The photo is empty. Please choose it again."] }, "The photo is empty.");
  if (photo.bytes.byteLength > cap) {
    throw AppError.validation({ photo: [`This photo is too large (maximum ${formatMb(cap)}).`] }, "This photo is too large.");
  }
  try {
    const asset = await createMediaAsset(
      { kind: "user", userId: actor.userId, roles: actor.roles },
      { bytes: photo.bytes, filename: photo.filename ?? null },
      { purpose: "SOLVER_UPLOAD", visibility: "OWNER_ONLY" },
      deps.storage ? { storage: deps.storage } : {},
    );
    return asset.id;
  } catch (error) {
    // The upload pipeline reports problems on `file`; the solver form calls the field `photo`.
    if (error instanceof AppError && error.code === "VALIDATION" && error.fieldErrors?.file) {
      throw AppError.validation({ photo: error.fieldErrors.file }, error.message);
    }
    throw error;
  }
}

/** The student's own READY solver photo as base64 for the model. */
async function loadPhoto(userId: string, assetId: string, deps: SolverDeps): Promise<LoadedImage> {
  const missing = () => AppError.validation({ photo: ["We couldn't find that photo. Please add it again."] }, "Photo not found.");
  const asset = await db.mediaAsset.findFirst({
    where: { id: assetId, uploadedById: userId, purpose: "SOLVER_UPLOAD", status: "READY", deletedAt: null },
    select: { id: true, storageKey: true, mimeType: true },
  });
  if (!asset || !(MODEL_IMAGE_TYPES as readonly string[]).includes(asset.mimeType)) throw missing();
  const bytes = await (deps.storage ?? getStorage()).get(asset.storageKey);
  if (!bytes) throw missing();
  return { assetId: asset.id, mediaType: asset.mimeType as ModelImageType, data: Buffer.from(bytes).toString("base64") };
}

interface SolveScope {
  subjectId: string | null;
  syllabusId: string | null;
  snapshot: ContextSnapshotV1 | null;
  catalogue: TopicCatalogue | null;
  catalogueTopics: readonly (CatalogueTopic & { syllabusId: string })[];
}

/** Topics of published syllabus versions in syllabus order (sortOrder, official code), parents before children. */
async function topicsOf(syllabusIds: readonly string[]): Promise<(CatalogueTopic & { syllabusId: string })[]> {
  if (syllabusIds.length === 0) return [];
  const rows = await db.topic.findMany({
    where: { syllabusId: { in: [...syllabusIds] }, syllabus: { status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } } },
    select: { id: true, name: true, parentId: true, kind: true, syllabusId: true, depth: true, path: true, sortOrder: true, code: true },
    orderBy: [{ syllabusId: "asc" }, { path: "asc" }],
    take: MAX_TOPICS_LOADED,
  });
  const bySyllabus = new Map<string, (typeof rows)[number][]>();
  for (const row of rows) {
    const group = bySyllabus.get(row.syllabusId);
    if (group) group.push(row);
    else bySyllabus.set(row.syllabusId, [row]);
  }
  return [...bySyllabus.values()].flatMap((group) =>
    flattenTopicTree(buildTopicTree(group)).map((node) => ({
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      kind: node.kind,
      syllabusId: node.syllabusId,
    })),
  );
}

/**
 * The learning scope of a solve: the chosen subject (must be an enrolment), else the student's only enrolment, with
 * its pinned syllabus topics (catalogue) and the frozen PII-free context. Several subjects and none chosen: no
 * catalogue (the topic is matched by name across enrolments afterwards).
 */
async function resolveScope(actor: SolverActor, subjectId: string | null, now: Date): Promise<SolveScope> {
  let chosen = subjectId;
  if (!chosen) {
    const enrolments = await db.subjectEnrollment.findMany({
      where: { userId: actor.userId, status: { in: [...ENROLLMENT_STATUSES] } },
      select: { subjectId: true },
      take: 2,
    });
    if (enrolments.length === 1) chosen = enrolments[0]?.subjectId ?? null;
  }
  const scope = await resolveTutorScope(actor.userId, chosen ? { subjectId: chosen } : {});
  const snapshot = await buildContextSnapshot(actor.userId, scope, { now, timeZone: zoneOf(actor) });
  if (!scope.enrollment) return { subjectId: null, syllabusId: null, snapshot, catalogue: null, catalogueTopics: [] };
  const topics = await topicsOf([scope.enrollment.syllabusId]);
  return {
    subjectId: scope.enrollment.subjectId,
    syllabusId: scope.enrollment.syllabusId,
    snapshot,
    catalogue: buildTopicCatalogue(topics),
    catalogueTopics: topics,
  };
}

interface MatchedTopic {
  topicId: string;
  name: string;
  subjectId: string;
  syllabusId: string;
}

/** Matches the solved question to a topic of the student's pinned syllabus (catalogue key, else the topic's name). */
async function matchSolutionTopic(userId: string, scope: SolveScope, solution: StoredSolution, topicKey: string | null): Promise<MatchedTopic | null> {
  if (scope.subjectId && scope.syllabusId) {
    const keyed = scope.catalogue ? topicIdForKey(scope.catalogue, topicKey) : null;
    const selectable = scope.catalogueTopics.filter((topic) => topic.kind !== "SECTION");
    const found = keyed ? selectable.find((topic) => topic.id === keyed) : matchTopicByName(solution.topicGuess, selectable);
    return found ? { topicId: found.id, name: found.name, subjectId: scope.subjectId, syllabusId: scope.syllabusId } : null;
  }
  if (!solution.topicGuess) return null;
  const enrolments = await db.subjectEnrollment.findMany({
    where: { userId, status: { in: [...ENROLLMENT_STATUSES] } },
    select: { subjectId: true, syllabusId: true, subject: { select: { name: true } } },
    take: 50,
  });
  if (enrolments.length === 0) return null;
  // Prefer the subject the model named; otherwise search every enrolment.
  const named = matchTopicByName(solution.subjectGuess, enrolments.map((row) => ({ id: row.subjectId, name: row.subject.name })));
  const candidates = named ? enrolments.filter((row) => row.subjectId === named.id) : enrolments;
  const topics = (await topicsOf(candidates.map((row) => row.syllabusId))).filter((topic) => topic.kind !== "SECTION");
  const found = matchTopicByName(solution.topicGuess, topics);
  if (!found) return null;
  const enrolment = candidates.find((row) => row.syllabusId === found.syllabusId);
  return enrolment ? { topicId: found.id, name: found.name, subjectId: enrolment.subjectId, syllabusId: enrolment.syllabusId } : null;
}

/** Up to 3 PUBLISHED platform questions on the topic (and its subtopics), unseen ones first, within the plan's tier. */
async function similarBankQuestions(userId: string, topic: MatchedTopic, seed: string): Promise<string[]> {
  const topicIds = await getTopicSubtreeIds(topic.topicId);
  if (topicIds.length === 0) return [];
  const fullAccess = await canAccessSubjectContent(userId, topic.subjectId, { syllabusId: topic.syllabusId });
  const pool = await candidatePool({
    subjectId: topic.subjectId,
    syllabusId: topic.syllabusId,
    topicIds,
    limit: 12,
    userId,
    seed,
    ...(fullAccess ? {} : { accessTier: "FREE" as const }),
  });
  return [...pool]
    .sort((a, b) => a.timesSeen - b.timesSeen)
    .slice(0, MAX_BANK_SIMILAR)
    .map((candidate) => candidate.id);
}

async function triage(
  gateway: AiGateway,
  input: { userId: string; text: string; image: LoadedImage | null; timeZone: string },
): Promise<{ triage: SolverTriage | null; meta: AiCallMeta | null }> {
  const sample = input.text.slice(0, TRIAGE_MAX_INPUT_CHARS).trim();
  const result = await gateway.structured({
    route: SOLVER_TRIAGE_ROUTE,
    feature: "SOLVER",
    userId: input.userId,
    maxTier: "FAST",
    timeZone: input.timeZone,
    promptVersion: SOLVER_PROMPT_VERSION,
    system: { stable: SOLVER_TRIAGE_PROMPT },
    messages: [{ role: "user", content: sample || PHOTO_ONLY_PROMPT }],
    // The photo only when there is no text to classify (image tokens cost).
    ...(sample.length === 0 && input.image ? { images: [{ mediaType: input.image.mediaType, data: input.image.data }] } : {}),
    outputSchema: triageOutputSchema,
  });
  return { triage: result.ok ? result.data : null, meta: result.meta };
}

function statusOf(result: { ok: boolean; reason?: string }, solution: StoredSolution | null): AiMessageStatus {
  if (result.ok) return solution ? "COMPLETE" : "ERROR";
  return result.reason === "REFUSED" ? "REFUSED" : result.reason === "TRUNCATED" ? "TRUNCATED" : "ERROR";
}

/**
 * Solves one typed or photographed question (module header). Returns the stored solve to open, or a safeguarding
 * response (helplines; nothing stored).
 *
 * @throws AppError VALIDATION | AI_UNAVAILABLE | ENTITLEMENT_REQUIRED | QUOTA_EXCEEDED | RATE_LIMITED | FORBIDDEN
 *         (exam in progress) | NOT_FOUND (subject not studied)
 */
export async function solveQuestion(
  actor: SolverActor,
  raw: SolveQuestionInput,
  options: SolverDeps & { photo?: SolverPhotoUpload | null; signal?: AbortSignal } = {},
): Promise<SolveResult> {
  assertSolverUser(actor);
  const input = parseInput(solveQuestionSchema, raw ?? {});
  const text = (input.text ?? "").trim();
  const photo = options.photo && options.photo.bytes.byteLength > 0 ? options.photo : null;
  if (photo && input.imageAssetId) throw AppError.validation({ photo: ["Add one photo per question."] });
  const hasImage = Boolean(photo || input.imageAssetId);
  if (text.length === 0 && !hasImage) {
    throw AppError.validation({ text: ["Type your question or add a photo of it."] }, "Type your question or add a photo of it.");
  }

  // Safeguarding comes first: a supportive answer with help contacts whatever the plan, and no model call.
  if (text.length > 0 && heuristicIntent(text)?.intent === "UNSAFE") {
    return { kind: "SAFEGUARD", helplines: await loadHelplines() };
  }

  const startedAt = options.now?.() ?? new Date();
  const timeZone = zoneOf(actor);
  const gateway = options.gateway ?? getAiGateway();
  const access = await assertSolverAccess(actor, { image: hasImage, subjectId: input.subjectId ?? null }, options, startedAt);
  if (text.length > access.config.limits.maxInputCharsPerMessage) {
    const max = access.config.limits.maxInputCharsPerMessage;
    throw AppError.validation({ text: [`Please keep your question under ${max} characters.`] }, "Your question is too long.");
  }

  if (input.clientRequestId) {
    const replay = await findReplay(actor.userId, input.clientRequestId);
    if (replay) return { kind: "SOLVED", conversationId: replay, replayed: true };
  }
  await (options.assertRateLimit ?? defaultRateLimit)(actor.userId);

  const imageAssetId = photo ? await storePhoto(actor, photo, access.config, options) : (input.imageAssetId ?? null);
  const image = imageAssetId ? await loadPhoto(actor.userId, imageAssetId, options) : null;

  const scope = await resolveScope(actor, input.subjectId ?? null, startedAt);
  const contextInput = scope.snapshot ? contextInputFromSnapshot(scope.snapshot) : null;
  const studentContext = contextInput ? buildStudentContext(contextInput) : "";

  // DEEP only when the plan allows it and the triage calls it hard multi-step maths / science.
  const planTier: AiModelTier = access.entitlements.aiMaxModelTier;
  const triaged = planTier === "DEEP" ? await triage(gateway, { userId: actor.userId, text, image, timeZone }) : { triage: null, meta: null };
  const route = shouldEscalate(triaged.triage, planTier) ? SOLVER_HARD_ROUTE : SOLVER_ROUTE;

  const result = await gateway.structured({
    route,
    feature: "SOLVER",
    userId: actor.userId,
    maxTier: planTier,
    quota: { dailyLimit: access.limit },
    timeZone,
    promptVersion: SOLVER_PROMPT_VERSION,
    system: buildSolverSystem({ mode: input.mode, topicCatalogue: scope.catalogue?.block ?? null, studentContext }),
    messages: [{ role: "user", content: text || PHOTO_ONLY_PROMPT }],
    ...(image ? { images: [{ mediaType: image.mediaType, data: image.data }] } : {}),
    outputSchema: solverOutputSchema,
    signal: options.signal,
  });

  let solution = result.ok ? finalizeSolution(result.data, input.mode, text) : null;
  const status = statusOf(result, solution);
  if (!result.ok || !solution) {
    logger.warn("solver: no usable solution", { userId: actor.userId, status, route });
  }
  let topic: MatchedTopic | null = null;
  if (solution?.readable) {
    topic = await matchSolutionTopic(actor.userId, scope, solution, result.ok ? result.data.topicKey : null);
    const bank = topic ? await similarBankQuestions(actor.userId, topic, `${actor.userId}:${startedAt.toISOString()}`) : [];
    solution = { ...solution, bankQuestionIds: bank };
  }
  const stored = solution ?? emptySolution(input.mode, text);

  const finishedAt = new Date(Math.max(Date.now(), startedAt.getTime() + 1));
  const meta = result.meta;
  const triageUsage = triaged.meta?.usage;
  const safetyCategory = meta.refusalCategory ? meta.refusalCategory.slice(0, 64) : null;
  const subjectId = topic?.subjectId ?? scope.subjectId;
  const conversationId = await withUserContext(actor.userId, async (tx) => {
    const conversation = await tx.aiConversation.create({
      data: {
        userId: actor.userId,
        mode: "SOLVER",
        channel: actor.channel === "api" ? "API" : actor.channel === "whatsapp" ? "WHATSAPP" : "WEB",
        subjectId,
        topicId: topic?.topicId ?? null,
        title: solveTitle({ topicName: topic?.name, questionText: text || stored.questionText, hasPhoto: image !== null }),
        modelTier: meta.tier,
        model: meta.servedByModel.slice(0, 64),
        promptVersion: SOLVER_PROMPT_VERSION,
        messageCount: 2,
        userMessageCount: 1,
        inputTokens: meta.usage.inputTokens + (triageUsage?.inputTokens ?? 0),
        outputTokens: meta.usage.outputTokens + (triageUsage?.outputTokens ?? 0),
        cacheReadTokens: meta.usage.cacheReadTokens + (triageUsage?.cacheReadTokens ?? 0),
        cacheWriteTokens: meta.usage.cacheWriteTokens + (triageUsage?.cacheWriteTokens ?? 0),
        costMicros: meta.costMicros + (triaged.meta?.costMicros ?? 0),
        lastMessageAt: finishedAt,
        ...(scope.snapshot && scope.subjectId === subjectId ? { contextSnapshot: scope.snapshot as unknown as Prisma.InputJsonObject } : {}),
        ...(safetyCategory ? { safetyFlaggedAt: finishedAt, safetyCategory } : {}),
      },
      select: { id: true },
    });
    await tx.aiMessage.create({
      data: {
        conversationId: conversation.id,
        role: "USER",
        content: text,
        intent: input.mode,
        clientMessageId: input.clientRequestId ?? null,
        attachmentAssetId: image?.assetId ?? null,
        createdAt: startedAt,
      },
    });
    await tx.aiMessage.create({
      data: {
        conversationId: conversation.id,
        role: "ASSISTANT",
        status,
        intent: input.mode,
        hintLevel: input.mode === "ANSWER" && status === "COMPLETE" ? 4 : null,
        content: serializeSolution(stored),
        model: meta.servedByModel.slice(0, 64),
        tier: meta.tier,
        promptVersion: SOLVER_PROMPT_VERSION,
        servedByFallback: meta.servedByFallback,
        inputTokens: meta.usage.inputTokens,
        outputTokens: meta.usage.outputTokens,
        cacheReadTokens: meta.usage.cacheReadTokens,
        cacheWriteTokens: meta.usage.cacheWriteTokens,
        costMicros: meta.costMicros,
        latencyMs: meta.latencyMs,
        stopReason: meta.stopReason?.slice(0, 32) ?? null,
        cached: meta.cached,
        cacheEntryId: meta.cacheEntryId,
        createdAt: finishedAt,
      },
    });
    return conversation.id;
  });
  return { kind: "SOLVED", conversationId, replayed: false };
}

// =====================================================================================================================
// History, reading, archiving, rating
// =====================================================================================================================

const cursorSchema = z.object({ t: z.iso.datetime().nullable(), id: z.uuid() });

function outcomeOf(status: AiMessageStatus | null | undefined, solution: StoredSolution | null): SolveOutcome {
  switch (status) {
    case "COMPLETE":
      return solution && !solution.readable ? "UNREADABLE" : "COMPLETE";
    case "REFUSED":
      return "REFUSED";
    case "TRUNCATED":
      return "TRUNCATED";
    default:
      return "ERROR";
  }
}

function modeOf(intent: string | null | undefined): SolveMode {
  return intent === "ANSWER" ? "ANSWER" : "TEACH";
}

/** The student's past solves, newest first (cursor-paginated, archived ones hidden; RLS). */
export async function listSolves(
  actor: SolverActor,
  options: { cursor?: string | null; limit?: number } = {},
): Promise<{ items: SolveSummary[]; nextCursor: string | null }> {
  assertSolverUser(actor);
  const limit = Math.min(Math.max(Math.trunc(options.limit ?? 10), 1), 50);
  const cursor = options.cursor ? decodeCursor(options.cursor, cursorSchema) : null;
  const after: Prisma.AiConversationWhereInput = !cursor
    ? {}
    : cursor.t === null
      ? { lastMessageAt: null, id: { lt: cursor.id } }
      : {
          OR: [
            { lastMessageAt: { lt: new Date(cursor.t) } },
            { lastMessageAt: new Date(cursor.t), id: { lt: cursor.id } },
            { lastMessageAt: null },
          ],
        };
  const rows = await withUserContext(actor.userId, (tx) =>
    tx.aiConversation.findMany({
      where: { userId: actor.userId, mode: "SOLVER", status: { in: [...LIST_STATUSES] }, ...after },
      orderBy: [{ lastMessageAt: { sort: "desc", nulls: "last" } }, { id: "desc" }],
      take: limit + 1,
      select: {
        id: true,
        title: true,
        lastMessageAt: true,
        createdAt: true,
        subject: { select: { name: true } },
        topic: { select: { name: true } },
        // Two small rows per solve (the student's turn and the answer): only the columns the list needs.
        messages: { select: { role: true, intent: true, status: true, attachmentAssetId: true } },
      },
    }),
  );
  const page = pageOf(rows, limit, (last) => encodeCursor({ t: last.lastMessageAt?.toISOString() ?? null, id: last.id }));
  return {
    items: page.items.map((row) => {
      const user = row.messages.find((message) => message.role === "USER");
      const answer = row.messages.find((message) => message.role === "ASSISTANT");
      return {
        id: row.id,
        title: row.title,
        mode: modeOf(user?.intent),
        outcome: outcomeOf(answer?.status, null),
        hasPhoto: Boolean(user?.attachmentAssetId),
        subjectName: row.subject?.name ?? null,
        topicName: row.topic?.name ?? null,
        createdAt: row.lastMessageAt ?? row.createdAt,
      };
    }),
    nextCursor: page.nextCursor,
  };
}

async function bankViews(ids: readonly string[], syllabusId: string | null): Promise<SimilarBankQuestionView[]> {
  if (ids.length === 0) return [];
  const questions = await getQuestionsForAttempt(ids, syllabusId ? { syllabusId } : {});
  return questions.map((question) => {
    const view = toStudentView(question);
    return {
      id: question.id,
      stemHtml: view.stemHtml ? trustPersistedHtml(view.stemHtml) : renderContent(question.stem, { idPrefix: `b${question.id.slice(-8)}-`, baseHeadingLevel: 4 }).html,
      marks: question.marks,
    };
  });
}

/**
 * One past solve with its server-rendered solution (RLS: only the owner sees it).
 *
 * @throws AppError NOT_FOUND (missing, archived, or someone else's)
 */
export async function getSolve(actor: SolverActor, conversationId: string): Promise<SolutionView> {
  assertSolverUser(actor);
  if (!uuid.safeParse(conversationId).success) throw notFound();
  const found = await withUserContext(actor.userId, async (tx) => {
    const conversation = await tx.aiConversation.findFirst({
      where: { id: conversationId, mode: "SOLVER", status: { in: [...LIST_STATUSES] } },
      select: {
        id: true,
        title: true,
        createdAt: true,
        subject: { select: { id: true, name: true } },
        topic: { select: { id: true, name: true, syllabusId: true } },
      },
    });
    if (!conversation) return null;
    const messages = await tx.aiMessage.findMany({
      where: { conversationId },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      take: 2,
      select: {
        id: true,
        role: true,
        content: true,
        status: true,
        intent: true,
        userRating: true,
        attachmentAsset: { select: { storageKey: true, width: true, height: true, status: true, deletedAt: true } },
      },
    });
    return { conversation, messages };
  });
  if (!found) throw notFound();
  const { conversation, messages } = found;
  const user = messages.find((message) => message.role === "USER");
  const answer = messages.find((message) => message.role === "ASSISTANT");
  const solution = answer ? parseStoredSolution(answer.content) : null;
  const outcome = outcomeOf(answer?.status, solution);
  const showSolution = outcome === "COMPLETE" && solution !== null;
  const rendered = solution && answer ? renderSolution(answer.id, solution) : null;
  const asset = user?.attachmentAsset;
  const photo = asset && asset.status === "READY" && asset.deletedAt === null ? asset : null;
  const subjectId = conversation.subject?.id ?? null;
  const topicId = conversation.topic?.id ?? null;
  const bank = showSolution ? await bankViews(solution.bankQuestionIds, conversation.topic?.syllabusId ?? null) : [];

  return {
    id: conversation.id,
    messageId: answer?.id ?? null,
    createdAt: conversation.createdAt,
    mode: modeOf(user?.intent ?? answer?.intent),
    outcome,
    title: conversation.title,
    question: {
      text: user?.content ?? "",
      readHtml: photo && rendered && solution?.questionText ? rendered.readHtml : null,
      imageUrl: photo ? `/api/media/${photo.storageKey}` : null,
      imageWidth: photo?.width ?? null,
      imageHeight: photo?.height ?? null,
    },
    subject: conversation.subject,
    topic: conversation.topic ? { id: conversation.topic.id, name: conversation.topic.name } : null,
    unreadableReason: outcome === "UNREADABLE" ? (solution?.unreadableReason ?? null) : null,
    conceptHtml: showSolution ? (rendered?.conceptHtml ?? null) : null,
    steps: showSolution ? (rendered?.steps ?? []) : [],
    finalAnswerHtml: showSolution ? (rendered?.finalAnswerHtml ?? null) : null,
    commonMistakesHtml: showSolution ? (rendered?.commonMistakesHtml ?? []) : [],
    similar: { bank, generatedHtml: showSolution ? (rendered?.generatedHtml ?? []) : [] },
    practiceHref: showSolution ? practiceHrefFor(subjectId, topicId) : null,
    tutorHref: tutorHrefFor(subjectId, topicId),
    rating: answer?.userRating === 1 || answer?.userRating === -1 ? answer.userRating : null,
  };
}

/**
 * Removes a solve from the history (archived, read-only). Idempotent.
 *
 * @throws AppError NOT_FOUND
 */
export async function archiveSolve(actor: SolverActor, conversationId: string, deps: Pick<SolverDeps, "now"> = {}): Promise<void> {
  assertSolverUser(actor);
  if (!uuid.safeParse(conversationId).success) throw notFound();
  const now = deps.now?.() ?? new Date();
  const exists = await withUserContext(actor.userId, async (tx) => {
    const updated = await tx.aiConversation.updateMany({
      where: { id: conversationId, mode: "SOLVER", status: { in: [...LIST_STATUSES] } },
      data: { status: "ARCHIVED", archivedAt: now },
    });
    if (updated.count === 1) return true;
    return (await tx.aiConversation.count({ where: { id: conversationId, mode: "SOLVER" } })) === 1;
  });
  if (!exists) throw notFound();
}

export const rateSolutionSchema = z.strictObject({
  messageId: z.uuid(),
  /** 1 helpful, -1 not helpful, null clears the rating. */
  rating: z.union([z.literal(1), z.literal(-1), z.null()]),
});

/**
 * "Was this helpful?" on a solution (AiMessage.userRating; evaluation sets, ARCHITECTURE §6.9).
 *
 * @throws AppError VALIDATION | NOT_FOUND (not the caller's solution)
 */
export async function rateSolution(actor: SolverActor, raw: z.input<typeof rateSolutionSchema>, deps: Pick<SolverDeps, "now"> = {}): Promise<void> {
  assertSolverUser(actor);
  const input = parseInput(rateSolutionSchema, raw);
  const now = deps.now?.() ?? new Date();
  const updated = await withUserContext(actor.userId, (tx) =>
    tx.aiMessage.updateMany({
      where: { id: input.messageId, role: "ASSISTANT", conversation: { mode: "SOLVER" } },
      data: { userRating: input.rating, ratedAt: input.rating === null ? null : now },
    }),
  );
  if (updated.count !== 1) throw AppError.notFound("We couldn't find that solution.");
}
