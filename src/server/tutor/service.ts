import "server-only";
import { z } from "zod";
import type { AiConversationStatus, Prisma, Role } from "@/generated/prisma/client";
import type { AiIntentLabel } from "@/lib/ai/types";
import { DEFAULT_TIMEZONE } from "@/lib/dates";
import { getAiGateway, type AiGateway, type AiTextResult } from "@/server/ai";
import { isFeatureEnabled } from "@/server/ai/config";
import { buildStudentContext, contextInputFromSnapshot } from "@/server/ai/context";
import { recordExchange } from "@/server/ai/conversations";
import { classifyIntent, toDbIntent } from "@/server/ai/intent";
import { buildTutorSystem, decideTurnPolicy, POLICY_PROMPT_VERSION } from "@/server/ai/policy";
import { hasPermission } from "@/server/auth/permissions";
import {
  assertEntitlement,
  EntitlementRequiredError,
  evaluateLimit,
  getEntitlements,
  hasFeature,
  LimitReachedError,
  UPGRADE_PATH,
} from "@/server/billing/entitlements";
import { aiMessagesToday, limitWindow } from "@/server/billing/usage";
import { renderContent } from "@/server/content/render";
import { getTopicTree, type TopicNode } from "@/server/curriculum/topics";
import { db } from "@/server/db";
import { assertGuardianConsent } from "@/server/family/consent-gate";
import { decodeCursor, encodeCursor, pageOf } from "@/server/lib/api";
import { withUserContext, type Tx } from "@/server/lib/db-context";
import { getEnv } from "@/server/lib/env";
import { AppError, isAppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, rateLimits } from "@/server/lib/rate-limit";
import { HELPLINES_SETTING_KEY, helplinesSettingSchema } from "./helplines-setting";
import { getSetting } from "@/server/lib/settings";
import {
  aiLockedError,
  answersWithheldError,
  buildContextSnapshot,
  getAiHelpGate,
  loadQuestionContext,
  resolveTutorScope,
  TUTOR_ENROLLMENT_STATUSES,
} from "./context";
import {
  assistantIntentFor,
  conversationTitle,
  hasSharedWorking,
  previousHintLevel,
  quotaView,
  resolveLocalIntent,
  selectHistoryWindow,
  strictestAiHelp,
  toErrorEvent,
  TUTOR_CODE_DETAIL,
  turnModeFromIntent,
  turnsRemaining,
  type HistoryMessage,
} from "./core";
import {
  TUTOR_REQUEST_MODES,
  type TutorDoneEvent,
  type TutorHelpline,
  type TutorMessageStatus,
  type TutorMessageView,
  type TutorQuota,
  type TutorStreamEvent,
} from "./protocol";

/**
 * The AI tutor (§14 teach-first tutor, §15 "Teach me" vs "Give me the answer", §40 cost control; ARCHITECTURE §6.3,
 * §6.4). One service for every channel: the web chat, the REST streaming route and future clients.
 *
 * Privacy: AiConversation / AiMessage are read and written ONLY inside `withUserContext(actor.userId, ...)` (Postgres
 * row-level security). Another student's conversation simply does not exist for the caller (NOT_FOUND); parents and
 * teachers have no path to these rows.
 *
 * A turn (`sendTutorMessage`):
 *   validate -> conversation (RLS) + retry replay -> archived / turn limit -> entitlement aiTutor -> rateLimits.aiMessage
 *   -> daily quota (aiMessagesPerDay, before any model call) -> exam integrity and teacher AI-help setting
 *   (`getAiHelpGate`: any open attempt under exam conditions or no-AI assignment work, and a question whose answers are
 *   not released yet, are refused without a model call) -> intent (chip, heuristics, FAST classifier only when
 *   ambiguous) -> policy (hint ladder, reveal rules, the stricter of the conversation's and open work's AI-help setting)
 *   + frozen system blocks (policy, student context) + the question as untrusted reference data in the first user turn
 *   + a bounded history window ->
 *   gateway.stream on the "tutor" route (tier capped by aiMaxModelTier, quota reserved) -> persist USER + ASSISTANT
 *   with metering -> render the final answer server-side.
 * A client disconnect aborts the upstream stream; the partial answer is stored with status ABORTED (tokens metered).
 */

export const TUTOR_ROUTE = "tutor";
/** Messages loaded to build the history window and the hint-ladder state (2 per turn, plus slack). */
const HISTORY_FETCH = 24;
const MESSAGE_PAGE_SIZE = 100;
const SAFEGUARDING_CATEGORY = "safeguarding_disclosure";

/** The acting student. Structurally satisfied by the auth `Actor`. */
export interface TutorActor {
  userId: string;
  roles: readonly Role[];
  /** IANA time zone for the quota day (Profile.timezone); default Africa/Harare. */
  timeZone?: string | undefined;
}

export interface TutorDeps {
  /** Defaults to the production gateway; tests inject `createAiGateway({ transport: fake, ... })`. */
  gateway?: AiGateway;
  now?: () => Date;
  /** Per-minute limiter (default `rateLimits.aiMessage`, 10/min). */
  assertRateLimit?: (userId: string) => Promise<void>;
  /** Whether the server has an AI key (default: ANTHROPIC_API_KEY is set). Status display only. */
  isConfigured?: () => boolean;
}

const uuid = z.uuid();

function parseInput<S extends z.ZodType>(schema: S, value: unknown): z.output<S> {
  const result = schema.safeParse(value);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

function parseId(value: string, field = "conversationId"): string {
  if (!uuid.safeParse(value).success) throw AppError.notFound("This conversation was not found.", { [field]: "invalid" });
  return value;
}

function assertTutorUser(actor: TutorActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "ai.use", "all")) {
    throw AppError.forbidden("The AI tutor is for students.");
  }
}

function zoneOf(actor: TutorActor): string {
  return actor.timeZone || DEFAULT_TIMEZONE;
}

async function defaultRateLimit(userId: string): Promise<void> {
  await assertRateLimit(rateLimits.aiMessage(userId), "You're sending messages very quickly. Please wait a moment and try again.");
}

function isConfiguredDefault(): boolean {
  return Boolean(getEnv().ANTHROPIC_API_KEY?.trim());
}

// =====================================================================================================================
// Status (page header: configured / switched on / plan / allowance)
// =====================================================================================================================

export interface TutorStatus {
  /** The server has an AI key. Without it every AI surface shows "not configured yet". */
  configured: boolean;
  /** Kill switch (Setting ai.enabled + per-feature TUTOR switch). */
  enabled: boolean;
  /** The plan includes the AI tutor. */
  entitled: boolean;
  /** Today's allowance; null = unlimited. */
  quota: TutorQuota | null;
  maxTurnsPerConversation: number;
  maxInputChars: number;
  upgradeHref: string;
}

export async function getTutorStatus(actor: TutorActor, deps: TutorDeps = {}): Promise<TutorStatus> {
  assertTutorUser(actor);
  const gateway = deps.gateway ?? getAiGateway();
  const now = deps.now?.() ?? new Date();
  const [config, resolved] = await Promise.all([gateway.getConfig(), getEntitlements(actor.userId)]);
  const entitled = hasFeature(resolved.entitlements, "aiTutor");
  const limit = resolved.entitlements.aiMessagesPerDay;
  const used = entitled && limit !== null ? await aiMessagesToday(actor.userId, zoneOf(actor), now) : 0;
  return {
    configured: (deps.isConfigured ?? isConfiguredDefault)(),
    enabled: isFeatureEnabled(config, "TUTOR"),
    entitled,
    quota: entitled ? quotaView(limit, used) : { limit: 0, remaining: 0 },
    maxTurnsPerConversation: config.limits.maxTurnsPerConversation,
    maxInputChars: config.limits.maxInputCharsPerMessage,
    upgradeHref: UPGRADE_PATH,
  };
}

// =====================================================================================================================
// Pickers for a new conversation (enrolments and the topics of their PINNED syllabus versions)
// =====================================================================================================================

export interface TutorSubjectOption {
  subjectId: string;
  name: string;
  qualification: string;
}

export async function listTutorSubjects(actor: TutorActor): Promise<TutorSubjectOption[]> {
  assertTutorUser(actor);
  const rows = await db.subjectEnrollment.findMany({
    where: { userId: actor.userId, status: { in: [...TUTOR_ENROLLMENT_STATUSES] } },
    select: { subjectId: true, subject: { select: { name: true, qualification: { select: { shortName: true } } } } },
    orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
    take: 50,
  });
  return rows.map((row) => ({ subjectId: row.subjectId, name: row.subject.name, qualification: row.subject.qualification.shortName }));
}

export interface TutorTopicOption {
  id: string;
  name: string;
  code: string | null;
  /** SECTION nodes are group labels; TOPIC and SUBTOPIC nodes are selectable. */
  kind: "SECTION" | "TOPIC" | "SUBTOPIC";
  depth: number;
}

/** The subject a topic belongs to (prefilling the picker from a topic-only link); null when unknown. */
export async function subjectIdForTopic(actor: TutorActor, topicId: string): Promise<string | null> {
  assertTutorUser(actor);
  if (!uuid.safeParse(topicId).success) return null;
  const topic = await db.topic.findUnique({ where: { id: topicId }, select: { syllabus: { select: { subjectId: true } } } });
  return topic?.syllabus.subjectId ?? null;
}

/** Topics of the syllabus version the student's enrolment pins (sections, topics, subtopics in tree order). */
export async function listTutorTopics(actor: TutorActor, subjectId: string): Promise<TutorTopicOption[]> {
  assertTutorUser(actor);
  if (!uuid.safeParse(subjectId).success) throw AppError.validation({ subjectId: ["Choose a subject."] });
  const enrollment = await db.subjectEnrollment.findFirst({
    where: { userId: actor.userId, subjectId, status: { in: [...TUTOR_ENROLLMENT_STATUSES] } },
    select: { syllabusId: true },
  });
  if (!enrollment) throw AppError.notFound("You're not studying this subject. Add it to your subjects first.");
  const tree = (await getTopicTree(enrollment.syllabusId)) ?? [];
  const out: TutorTopicOption[] = [];
  const visit = (nodes: readonly TopicNode[]): void => {
    for (const node of nodes) {
      out.push({ id: node.id, name: node.name, code: node.code, kind: node.kind, depth: node.depth });
      if (node.kind !== "SUBTOPIC") visit(node.children);
    }
  };
  visit(tree);
  return out;
}

// =====================================================================================================================
// Conversations: create, list, read, archive
// =====================================================================================================================

export const createConversationSchema = z.strictObject({
  subjectId: z.uuid().optional(),
  topicId: z.uuid().optional(),
  questionId: z.uuid().optional(),
});
export type CreateConversationInput = z.input<typeof createConversationSchema>;

/**
 * Starts a tutor conversation, optionally about a subject (one of the student's enrolments), a topic (inside the
 * pinned syllabus version) or a question the student has answered. Freezes the PII-free learning context on it.
 *
 * @throws AppError FORBIDDEN | ENTITLEMENT_REQUIRED | NOT_FOUND | VALIDATION
 */
export async function createConversation(actor: TutorActor, raw: CreateConversationInput, deps: TutorDeps = {}): Promise<{ id: string; title: string | null }> {
  assertTutorUser(actor);
  const input = parseInput(createConversationSchema, raw ?? {});
  const now = deps.now?.() ?? new Date();
  const scope = await resolveTutorScope(actor.userId, input, now);
  await assertEntitlement(actor, "aiTutor", scope.enrollment ? { subjectId: scope.enrollment.subjectId } : undefined);
  await assertGuardianConsent(actor, "ai_processing");
  await assertRateLimit(rateLimits.aiConversationCreate(actor.userId), "You've started a lot of conversations. Please continue an existing one or try again later.");
  const snapshot = await buildContextSnapshot(actor.userId, scope, { now, timeZone: zoneOf(actor) });
  const title = conversationTitle({ topicName: scope.topic?.name, subjectName: scope.enrollment?.subject.name });
  const created = await withUserContext(actor.userId, (tx) =>
    tx.aiConversation.create({
      data: {
        userId: actor.userId,
        mode: "TUTOR",
        channel: "WEB",
        subjectId: scope.enrollment?.subjectId ?? null,
        topicId: scope.topic?.id ?? null,
        questionId: scope.questionId,
        // Assignment work: the teacher's AI-help setting is snapshotted and enforced on every turn (ARCHITECTURE §6.4).
        assignmentId: scope.assignment?.assignmentId ?? null,
        aiHelp: scope.assignment?.aiHelp ?? null,
        title,
        promptVersion: POLICY_PROMPT_VERSION,
        // Set at creation so the history list (userId, status, lastMessageAt) orders new conversations too.
        lastMessageAt: now,
        ...(snapshot ? { contextSnapshot: snapshot as unknown as Prisma.InputJsonObject } : {}),
      },
      select: { id: true, title: true },
    }),
  );
  return created;
}

export interface TutorConversationSummary {
  id: string;
  title: string | null;
  status: AiConversationStatus;
  subjectName: string | null;
  topicName: string | null;
  userMessageCount: number;
  lastMessageAt: Date | null;
  createdAt: Date;
}

const cursorSchema = z.object({ t: z.iso.datetime().nullable(), id: z.uuid() });
const LIST_STATUSES = ["ACTIVE", "LOCKED"] as const satisfies readonly AiConversationStatus[];

/** The student's tutor conversations, most recently active first (cursor-paginated, archived ones hidden). */
export async function listConversations(
  actor: TutorActor,
  options: { cursor?: string | null; limit?: number } = {},
): Promise<{ items: TutorConversationSummary[]; nextCursor: string | null }> {
  assertTutorUser(actor);
  const limit = Math.min(Math.max(Math.trunc(options.limit ?? 20), 1), 100);
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
      where: { userId: actor.userId, mode: "TUTOR", status: { in: [...LIST_STATUSES] }, ...after },
      orderBy: [{ lastMessageAt: { sort: "desc", nulls: "last" } }, { id: "desc" }],
      take: limit + 1,
      select: {
        id: true,
        title: true,
        status: true,
        userMessageCount: true,
        lastMessageAt: true,
        createdAt: true,
        subject: { select: { name: true } },
        topic: { select: { name: true } },
      },
    }),
  );
  const page = pageOf(rows, limit, (last) => encodeCursor({ t: last.lastMessageAt?.toISOString() ?? null, id: last.id }));
  return {
    items: page.items.map((row) => ({
      id: row.id,
      title: row.title,
      status: row.status,
      subjectName: row.subject?.name ?? null,
      topicName: row.topic?.name ?? null,
      userMessageCount: row.userMessageCount,
      lastMessageAt: row.lastMessageAt,
      createdAt: row.createdAt,
    })),
    nextCursor: page.nextCursor,
  };
}

export interface TutorConversationView {
  id: string;
  title: string | null;
  status: AiConversationStatus;
  subject: { id: string; name: string } | null;
  topic: { id: string; name: string } | null;
  questionId: string | null;
  userMessageCount: number;
  maxTurns: number;
  turnsRemaining: number;
  messages: TutorMessageView[];
  /** Older messages exist before the first one returned (pass `before` = the first message's createdAt). */
  hasEarlier: boolean;
  createdAt: Date;
}

const MESSAGE_SELECT = {
  id: true,
  role: true,
  content: true,
  status: true,
  hintLevel: true,
  intent: true,
  userRating: true,
  createdAt: true,
} as const satisfies Prisma.AiMessageSelect;

type MessageRow = Prisma.AiMessageGetPayload<{ select: typeof MESSAGE_SELECT }>;

/** Sanitised HTML of an assistant answer (KaTeX math, strict pipeline; ids prefixed per message). */
export function renderAnswer(messageId: string, markdown: string): string {
  if (markdown.trim().length === 0) return "";
  return renderContent(markdown, { idPrefix: `m${messageId.replace(/[^a-z0-9]/gi, "").slice(-10)}-`, baseHeadingLevel: 3 }).html;
}

function toMessageView(row: MessageRow): TutorMessageView {
  return {
    id: row.id,
    role: row.role,
    content: row.content,
    html: row.role === "ASSISTANT" ? renderAnswer(row.id, row.content) : null,
    status: row.status,
    hintLevel: row.hintLevel,
    intent: row.intent,
    rating: row.userRating,
    createdAt: row.createdAt.toISOString(),
  };
}

/**
 * One conversation with its newest messages (RLS: only the owner sees it).
 *
 * @throws AppError NOT_FOUND (missing, or someone else's)
 */
export async function getConversation(
  actor: TutorActor,
  conversationId: string,
  options: { before?: string | null } & Pick<TutorDeps, "gateway"> = {},
): Promise<TutorConversationView> {
  assertTutorUser(actor);
  const id = parseId(conversationId);
  const before = options.before ? new Date(options.before) : null;
  if (before && Number.isNaN(before.getTime())) throw AppError.validation({ before: ["Invalid position."] });
  const config = await (options.gateway ?? getAiGateway()).getConfig();
  const found = await withUserContext(actor.userId, async (tx) => {
    const conversation = await tx.aiConversation.findFirst({
      where: { id, mode: "TUTOR" },
      select: {
        id: true,
        title: true,
        status: true,
        questionId: true,
        userMessageCount: true,
        createdAt: true,
        subject: { select: { id: true, name: true } },
        topic: { select: { id: true, name: true } },
      },
    });
    if (!conversation) return null;
    const rows = await tx.aiMessage.findMany({
      where: { conversationId: id, ...(before ? { createdAt: { lt: before } } : {}) },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: MESSAGE_PAGE_SIZE + 1,
      select: MESSAGE_SELECT,
    });
    return { conversation, rows };
  });
  if (!found) throw AppError.notFound("This conversation was not found.");
  const { conversation, rows } = found;
  const page = rows.slice(0, MESSAGE_PAGE_SIZE).reverse();
  const maxTurns = config.limits.maxTurnsPerConversation;
  return {
    id: conversation.id,
    title: conversation.title,
    status: conversation.status,
    subject: conversation.subject,
    topic: conversation.topic,
    questionId: conversation.questionId,
    userMessageCount: conversation.userMessageCount,
    maxTurns,
    turnsRemaining: turnsRemaining(maxTurns, conversation.userMessageCount),
    messages: page.map(toMessageView),
    hasEarlier: rows.length > MESSAGE_PAGE_SIZE,
    createdAt: conversation.createdAt,
  };
}

/**
 * Archives a conversation (hidden from the list, read-only). Idempotent.
 *
 * @throws AppError NOT_FOUND
 */
export async function archiveConversation(actor: TutorActor, conversationId: string, deps: Pick<TutorDeps, "now"> = {}): Promise<void> {
  assertTutorUser(actor);
  const id = parseId(conversationId);
  const now = deps.now?.() ?? new Date();
  const exists = await withUserContext(actor.userId, async (tx) => {
    const updated = await tx.aiConversation.updateMany({
      where: { id, mode: "TUTOR", status: { in: [...LIST_STATUSES] } },
      data: { status: "ARCHIVED", archivedAt: now },
    });
    if (updated.count === 1) return true;
    return (await tx.aiConversation.count({ where: { id, mode: "TUTOR" } })) === 1;
  });
  if (!exists) throw AppError.notFound("This conversation was not found.");
}

export const rateMessageSchema = z.strictObject({
  messageId: z.uuid(),
  /** 1 helpful, -1 not helpful, null clears the rating. */
  rating: z.union([z.literal(1), z.literal(-1), z.null()]),
});

/**
 * "Was this helpful?" on an assistant answer (AiMessage.userRating; evaluation sets, ARCHITECTURE §6.9).
 *
 * @throws AppError VALIDATION | NOT_FOUND (not the caller's message)
 */
export async function rateTutorMessage(actor: TutorActor, raw: z.input<typeof rateMessageSchema>, deps: Pick<TutorDeps, "now"> = {}): Promise<void> {
  assertTutorUser(actor);
  const input = parseInput(rateMessageSchema, raw);
  const now = deps.now?.() ?? new Date();
  const updated = await withUserContext(actor.userId, (tx) =>
    tx.aiMessage.updateMany({
      where: { id: input.messageId, role: "ASSISTANT", conversation: { mode: "TUTOR" } },
      data: { userRating: input.rating, ratedAt: input.rating === null ? null : now },
    }),
  );
  if (updated.count !== 1) throw AppError.notFound("We couldn't find that answer.");
}

// =====================================================================================================================
// Sending a message (streaming turn)
// =====================================================================================================================

export const sendTutorMessageSchema = z.strictObject({
  /** The student's message (length is capped by Setting ai.limits.maxInputCharsPerMessage below). */
  text: z.string().max(200_000),
  /** Mode chip; omitted = classify (heuristics, then the FAST tier when ambiguous). */
  mode: z.enum(TUTOR_REQUEST_MODES).optional(),
  /** Client-generated id: a retry after a dropped connection replays the stored reply instead of charging again. */
  clientMessageId: z
    .string()
    .regex(/^[A-Za-z0-9_-]{8,64}$/, { message: "Invalid message id." })
    .optional(),
});
export type SendTutorMessageInput = z.input<typeof sendTutorMessageSchema>;

export interface SendTutorMessageOptions extends TutorDeps {
  /** Client disconnect: stops the upstream model stream; the partial answer is stored as ABORTED. */
  signal?: AbortSignal | undefined;
}

/** Unbounded single-consumer async queue bridging the gateway's callbacks to an async generator. */
class EventQueue<T> {
  private readonly items: T[] = [];
  private readonly waiters: ((result: IteratorResult<T, undefined>) => void)[] = [];
  private closed = false;

  push(item: T): void {
    if (this.closed) return;
    const waiter = this.waiters.shift();
    if (waiter) waiter({ value: item, done: false });
    else this.items.push(item);
  }

  close(): void {
    this.closed = true;
    for (const waiter of this.waiters.splice(0)) waiter({ value: undefined, done: true });
  }

  next(): Promise<IteratorResult<T, undefined>> {
    if (this.items.length > 0) return Promise.resolve({ value: this.items.shift() as T, done: false });
    if (this.closed) return Promise.resolve({ value: undefined, done: true });
    return new Promise((resolve) => this.waiters.push(resolve));
  }
}

/**
 * Sends one student message and streams the reply as {@link TutorStreamEvent}s (`start`, `delta`..., `done` | `error`).
 * Never throws: every failure is a typed `error` event with a friendly message. The turn keeps running to completion
 * (and is persisted) even if the consumer stops reading; abort it through `options.signal`.
 */
export async function* sendTutorMessage(
  actor: TutorActor,
  conversationId: string,
  input: SendTutorMessageInput,
  options: SendTutorMessageOptions = {},
): AsyncGenerator<TutorStreamEvent, void, undefined> {
  const queue = new EventQueue<TutorStreamEvent>();
  const internal = new AbortController();
  const signal = options.signal ? AbortSignal.any([options.signal, internal.signal]) : internal.signal;
  const turn = runTurn(actor, conversationId, input, { ...options, signal }, (event) => queue.push(event)).finally(() => queue.close());
  let finished = false;
  try {
    for (;;) {
      const next = await queue.next();
      if (next.done) break;
      yield next.value;
    }
    finished = true;
  } finally {
    // The consumer stopped early (closed connection): stop the model and let the turn store what it has.
    if (!finished) internal.abort();
    await turn;
  }
}

interface ConversationState {
  id: string;
  status: AiConversationStatus;
  subjectId: string | null;
  questionId: string | null;
  aiHelp: "NONE" | "HINTS_ONLY" | "FULL" | null;
  title: string | null;
  modelTier: string | null;
  userMessageCount: number;
  contextSnapshot: Prisma.JsonValue | null;
  subjectName: string | null;
}

interface LoadedTurnState {
  conversation: ConversationState;
  history: HistoryMessage[];
  /** The stored student message with this clientMessageId (a retry). */
  duplicateOf: { id: string; createdAt: Date } | null;
}

async function loadTurnState(userId: string, conversationId: string, clientMessageId: string | undefined): Promise<LoadedTurnState | null> {
  return withUserContext(userId, async (tx) => {
    const row = await tx.aiConversation.findFirst({
      where: { id: conversationId, mode: "TUTOR" },
      select: {
        id: true,
        status: true,
        subjectId: true,
        questionId: true,
        aiHelp: true,
        title: true,
        modelTier: true,
        userMessageCount: true,
        contextSnapshot: true,
        subject: { select: { name: true } },
      },
    });
    if (!row) return null;
    const duplicateOf = clientMessageId
      ? await tx.aiMessage.findUnique({
          where: { conversationId_clientMessageId: { conversationId, clientMessageId } },
          select: { id: true, createdAt: true },
        })
      : null;
    const recent = await tx.aiMessage.findMany({
      where: { conversationId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: HISTORY_FETCH,
      select: { role: true, content: true, status: true, intent: true, hintLevel: true },
    });
    const { subject, ...conversation } = row;
    return {
      conversation: { ...conversation, subjectName: subject?.name ?? null },
      history: recent.reverse(),
      duplicateOf,
    };
  });
}

async function replayExchange(
  userId: string,
  conversation: ConversationState,
  userMessage: { id: string; createdAt: Date },
  extras: { quota: TutorQuota | null; maxTurns: number },
): Promise<TutorDoneEvent | null> {
  const reply = await withUserContext(userId, (tx: Tx) =>
    tx.aiMessage.findFirst({
      where: { conversationId: conversation.id, role: "ASSISTANT", createdAt: { gt: userMessage.createdAt } },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: { id: true, content: true, status: true, hintLevel: true, intent: true },
    }),
  );
  if (!reply || reply.status === "ERROR") return null;
  return {
    type: "done",
    messageId: reply.id,
    userMessageId: userMessage.id,
    html: reply.status === "REFUSED" ? "" : renderAnswer(reply.id, reply.content),
    status: reply.status,
    turnMode: turnModeFromIntent(reply.intent),
    hintLevel: reply.hintLevel,
    quota: extras.quota,
    turnsRemaining: turnsRemaining(extras.maxTurns, conversation.userMessageCount),
    title: conversation.title,
    helplines: null,
    replayed: true,
  };
}

/** Help contacts configured by the platform (Setting `safety.helplines`); empty when none are configured. */
export async function loadHelplines(): Promise<TutorHelpline[]> {
  try {
    return await getSetting(HELPLINES_SETTING_KEY, helplinesSettingSchema, []);
  } catch {
    return [];
  }
}

function closedError(message: string, tutorCode: "TURN_LIMIT" | "CONVERSATION_CLOSED"): AppError {
  return new AppError("CONFLICT", message, { details: { [TUTOR_CODE_DETAIL]: tutorCode } });
}

async function runTurn(
  actor: TutorActor,
  conversationId: string,
  raw: SendTutorMessageInput,
  options: SendTutorMessageOptions & { signal: AbortSignal },
  emit: (event: TutorStreamEvent) => void,
): Promise<void> {
  const log = logger.child({ module: "tutor", userId: actor.userId, conversationId });
  try {
    assertTutorUser(actor);
    const input = parseInput(sendTutorMessageSchema, raw);
    const id = parseId(conversationId);
    const text = input.text.trim();
    if (text.length === 0) throw AppError.validation({ text: ["Type a message first."] }, "Type a message first.");
    const gateway = options.gateway ?? getAiGateway();
    const startedAt = options.now?.() ?? new Date();
    const timeZone = zoneOf(actor);
    const config = await gateway.getConfig();
    const maxTurns = config.limits.maxTurnsPerConversation;
    if (text.length > config.limits.maxInputCharsPerMessage) {
      throw AppError.validation(
        { text: [`Please keep your message under ${config.limits.maxInputCharsPerMessage} characters.`] },
        "Your message is too long.",
      );
    }

    const state = await loadTurnState(actor.userId, id, input.clientMessageId);
    if (!state) throw AppError.notFound("This conversation was not found.");
    const { conversation, history } = state;
    const subjectContext = conversation.subjectId ? { subjectId: conversation.subjectId } : undefined;

    if (state.duplicateOf) {
      // A retry of a message that was already answered: replay, never charge twice.
      const entitlements = await assertEntitlement(actor, "aiTutor", subjectContext);
      const limit = entitlements.aiMessagesPerDay;
      const used = limit === null ? 0 : await aiMessagesToday(actor.userId, timeZone, startedAt);
      const replay = await replayExchange(actor.userId, conversation, state.duplicateOf, { quota: quotaView(limit, used), maxTurns });
      if (replay) {
        emit(replay);
        return;
      }
      throw new AppError("CONFLICT", "This message was already sent. Refresh the page to see the reply.", {
        details: { [TUTOR_CODE_DETAIL]: "CONVERSATION_CLOSED" },
      });
    }

    if (conversation.status === "ARCHIVED") {
      throw closedError("This conversation is archived. Start a new conversation to keep going.", "CONVERSATION_CLOSED");
    }
    if (conversation.status === "LOCKED" || conversation.userMessageCount >= maxTurns) {
      if (conversation.status === "ACTIVE") {
        await withUserContext(actor.userId, (tx) => tx.aiConversation.updateMany({ where: { id, status: "ACTIVE" }, data: { status: "LOCKED" } }));
      }
      throw closedError(
        `This conversation has reached its limit of ${maxTurns} messages. Start a new conversation to keep going.`,
        "TURN_LIMIT",
      );
    }

    const entitlements = await assertEntitlement(actor, "aiTutor", subjectContext);
    // A minor whose guardian withdrew consent (or has not given it, where required) sends nothing to the AI provider.
    await assertGuardianConsent(actor, "ai_processing");
    await (options.assertRateLimit ?? defaultRateLimit)(actor.userId);

    // Daily allowance BEFORE any model call (the classifier is a model call too). The gateway re-checks atomically.
    const limit = entitlements.aiMessagesPerDay;
    const used = limit === null ? 0 : await aiMessagesToday(actor.userId, timeZone, startedAt);
    if (limit !== null && used >= limit) {
      if (limit === 0) throw new EntitlementRequiredError("aiMessagesPerDay");
      throw new LimitReachedError(
        { ...evaluateLimit("aiMessagesPerDay", limit, used), limit },
        limitWindow("aiMessagesPerDay", startedAt, timeZone).end,
        startedAt,
      );
    }

    // Exam integrity and the teacher's AI-help setting (ARCHITECTURE §6.4), refused without a model call: any open
    // attempt under exam conditions or no-AI assignment work pauses help; the conversation's own question may be
    // locked or not released yet. A safeguarding message is always answered.
    const gate = await getAiHelpGate(actor.userId, startedAt);
    const activeExam = gate.lock !== null;
    const local = resolveLocalIntent(input.mode, text, { activeExam });
    if (gate.lock && local.intent !== "UNSAFE") throw aiLockedError(gate.lock);
    const question = conversation.questionId ? await loadQuestionContext(actor.userId, conversation.questionId, startedAt) : null;
    if (question && local.intent !== "UNSAFE") {
      if (question.access.kind === "LOCKED") throw aiLockedError(question.access.lock);
      if (question.access.kind === "WITHHELD") throw answersWithheldError();
    }
    let intent: AiIntentLabel = local.intent;
    if (local.needsModel) {
      const classified = await classifyIntent(gateway, text, {
        userId: actor.userId,
        feature: "TUTOR",
        subject: conversation.subjectName ?? undefined,
        timeZone,
        signal: options.signal,
      });
      intent = classified.intent;
    }

    const decision = decideTurnPolicy({
      intent,
      previousHintLevel: previousHintLevel(history),
      attempted: hasSharedWorking(history) || (question?.answered ?? false),
      activeExam,
      // The conversation's snapshot (opened from assignment work) and any open assignment work: the stricter applies.
      aiHelp: strictestAiHelp(conversation.aiHelp, gate.aiHelp),
    });
    const contextInput = contextInputFromSnapshot(conversation.contextSnapshot);
    const system = buildTutorSystem({
      mode: "TUTOR",
      studentContext: contextInput ? buildStudentContext(contextInput) : undefined,
      turn: decision,
    });
    const messages = [...selectHistoryWindow(history), { role: "user" as const, content: text }];

    if (options.signal.aborted) throw new AppError("BAD_REQUEST", "The message was cancelled.");
    // `start` is sent once the model actually answers, so a turn the gateway refuses up front (not configured, kill
    // switch, budget, quota race) is a single `error` event.
    let started = false;
    const ensureStarted = (): void => {
      if (started) return;
      started = true;
      emit({ type: "start", turnMode: decision.mode, hintLevel: decision.hintLevel });
    };

    let partial = "";
    const result: AiTextResult = await gateway.stream({
      route: TUTOR_ROUTE,
      feature: "TUTOR",
      userId: actor.userId,
      maxTier: entitlements.aiMaxModelTier,
      quota: { dailyLimit: limit },
      timeZone,
      promptVersion: POLICY_PROMPT_VERSION,
      system,
      messages,
      // The question may be teacher-written: untrusted reference data in the first user turn, never system (AI-03).
      ...(question ? { reference: question.block } : {}),
      signal: options.signal,
      onText: (delta) => {
        ensureStarted();
        partial += delta;
        emit({ type: "delta", text: delta });
      },
      onRestart: () => {
        ensureStarted();
        partial = "";
        emit({ type: "restart" });
      },
    });
    ensureStarted();

    // An aborted stream keeps what the student already saw; a refusal keeps nothing (the UI shows its own message).
    const finalText = result.status === "ABORTED" ? partial : result.text;
    const stored: AiTextResult = { ...result, text: finalText };
    const finishedAt = new Date(Math.max(Date.now(), startedAt.getTime() + 1));
    const recorded = await recordExchange(
      { kind: "user", userId: actor.userId },
      {
        conversationId: id,
        user: { content: text, intent: toDbIntent(intent), clientMessageId: input.clientMessageId ?? null, createdAt: startedAt },
        assistant: { result: stored, intent: assistantIntentFor(decision.mode), hintLevel: decision.hintLevel, createdAt: finishedAt },
        safetyCategory: decision.mode === "SAFEGUARD" ? SAFEGUARDING_CATEGORY : null,
      },
    );
    if (recorded.duplicate || !recorded.assistantMessageId) {
      // A concurrent retry stored the same message first: show that reply instead.
      const replay = await replayExchange(actor.userId, conversation, { id: recorded.userMessageId, createdAt: startedAt }, {
        quota: quotaView(limit, used, 1),
        maxTurns,
      });
      if (replay) emit(replay);
      return;
    }

    const userTurns = conversation.userMessageCount + 1;
    const title = conversation.title ?? conversationTitle({ firstMessage: text });
    const conversationPatch: Prisma.AiConversationUpdateManyMutationInput = {
      ...(conversation.title === null && title ? { title } : {}),
      // Sticky routing record (prompt-cache prefixes are model-scoped).
      ...(conversation.modelTier === null ? { modelTier: result.tier, model: result.servedByModel.slice(0, 64), promptVersion: POLICY_PROMPT_VERSION } : {}),
      ...(userTurns >= maxTurns ? { status: "LOCKED" as const } : {}),
    };
    if (Object.keys(conversationPatch).length > 0) {
      await withUserContext(actor.userId, (tx) => tx.aiConversation.updateMany({ where: { id }, data: conversationPatch }));
    }

    const status: TutorMessageStatus = stored.status;
    emit({
      type: "done",
      messageId: recorded.assistantMessageId,
      userMessageId: recorded.userMessageId,
      html: status === "REFUSED" ? "" : renderAnswer(recorded.assistantMessageId, finalText),
      status,
      turnMode: decision.mode,
      hintLevel: decision.hintLevel,
      quota: quotaView(limit, used, 1),
      turnsRemaining: turnsRemaining(maxTurns, userTurns),
      title,
      helplines: decision.mode === "SAFEGUARD" ? await loadHelplines() : null,
      replayed: false,
    });
  } catch (error) {
    const event = toErrorEvent(error, UPGRADE_PATH);
    if (event.code === "INTERNAL") log.error("tutor turn failed", { err: error });
    else if (isAppError(error) && error.code === "AI_UNAVAILABLE") log.warn("tutor turn: AI unavailable", { code: event.code });
    emit(event);
  }
}
