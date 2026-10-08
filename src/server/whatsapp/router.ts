import "server-only";
import { z } from "zod";
import { Prisma, type AttemptMode } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { QUESTION_LIMITS, type StudentQuestionView } from "@/lib/questions";
import type { AiGateway } from "@/server/ai";
import { heuristicIntent } from "@/server/ai/intent";
import { answerAndMark, getAttemptForStudent } from "@/server/attempts";
import type { Actor } from "@/server/auth/actor";
import { db } from "@/server/db";
import { absoluteUrl } from "@/server/lib/env";
import { isAppError } from "@/server/lib/errors";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { getDailyOverview, startDailyQuestion } from "@/server/practice/daily";
import { getStudentDashboard } from "@/server/progress/service";
import { loadHelplines } from "@/server/tutor/service";
import { indexOfLetter, letterFor, parseCommand, type AwaitingAnswer, type ParsedAnswer, type WhatsAppCommand } from "./commands";
import { classifyWhatsAppIntent, explainTopic } from "./explain";
import { resolveIdentityActor, setIdentityOptOut } from "./identity";
import { queueOutbound, type OutboundDraft } from "./outbound";
import {
  consentRequiredMessage,
  helpMessage,
  linkInstructions,
  relinkMessage,
  renderFeedback,
  renderQuestion,
  renderStreak,
  textMessage,
} from "./render";
import { loadConversationState, PENDING_ANSWER_TTL_MS, saveConversationState, type ConversationState, type StateUpdate } from "./state";

/**
 * The `whatsapp.process` job (ARCHITECTURE §8 steps 5-9): one inbound message -> identity -> state -> command -> the
 * SAME services as the web app, acting as the linked student (actor channel "whatsapp") -> replies queued as OUTBOUND
 * ChannelMessages with `whatsapp.send` jobs, inbound marked PROCESSED, state saved, all in one final transaction.
 *
 * | Command                         | Service                                                                    |
 * |---------------------------------|----------------------------------------------------------------------------|
 * | QUESTION ("today's question")   | practice.getDailyOverview + startDailyQuestion (DAILY_QUESTION attempt)    |
 * | A / B / true / text / button    | attempts.answerAndMark (marking, mastery, streak, XP exactly as on the web) |
 * | EXPLAIN <topic>                 | AI gateway `whatsapp` route (./explain)                                     |
 * | STREAK                          | progress.getStudentDashboard (streak + today's target)                      |
 * | anything ambiguous              | FAST-tier intent classifier (plan + rate limited), else the help menu       |
 *
 * Idempotent: an inbound row is processed only while RECEIVED (the final transaction flips it under a status guard);
 * the services replay (answerAndMark returns the stored mark, startDailyQuestion resumes, explanations are found by
 * their clientMessageId), so a retried job never double-marks or double-charges.
 */

export interface ProcessDeps {
  gateway?: AiGateway;
  now?: () => Date;
  logger?: Logger;
  attempt?: number;
  maxAttempts?: number;
}

export interface ProcessOutcome {
  status: "processed" | "ignored" | "noop" | "failed";
  command: string | null;
  replies: number;
}

interface Plan {
  command: string;
  replies: OutboundDraft[];
  /** `undefined` leaves the conversation state as it is. */
  state?: StateUpdate;
  inbound: { status: "PROCESSED" | "IGNORED"; aiMessageId?: string; scrub?: boolean };
  /** STOP (true) / START (false). */
  optOut?: boolean;
}

const LINK_HELP_THROTTLE_MS = 10 * 60_000;
const inboundPayloadSchema = z.looseObject({ type: z.string().optional(), reply: z.looseObject({ id: z.string() }).optional() });
const READABLE_TYPES = new Set(["text", "interactive", "button"]);

interface Links {
  settings: string;
  daily: string;
  app: string;
  pricing: string;
  family: string;
}

function linksFor(): Links {
  return {
    settings: absoluteUrl("/app/settings/whatsapp"),
    daily: absoluteUrl("/app/daily"),
    app: absoluteUrl("/app"),
    pricing: absoluteUrl("/pricing"),
    family: absoluteUrl("/app/family"),
  };
}

const reply = (text: string): OutboundDraft => ({ spec: textMessage(text) });
const processed = (command: string, replies: OutboundDraft[], extra: Partial<Plan> = {}): Plan => ({
  command,
  replies,
  inbound: { status: "PROCESSED" },
  ...extra,
});

/** A user-facing text for an expected service failure, or null (unexpected: the job retries). */
function friendlyError(error: unknown, links: Links): string | null {
  if (!isAppError(error)) return null;
  switch (error.code) {
    case "INTERNAL":
      return null;
    case "ENTITLEMENT_REQUIRED":
    case "QUOTA_EXCEEDED":
      return `${error.message} See the plans: ${links.pricing}`;
    case "RATE_LIMITED":
      return "You're sending messages very quickly. Please wait a minute and try again.";
    case "AI_UNAVAILABLE":
      return `${error.message} You can still send QUESTION for today's study question.`;
    default:
      return error.message;
  }
}

function sameText(a: string, b: string): boolean {
  return a.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() === b.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function subjectMatches(subjectName: string, hint: string): boolean {
  const name = subjectName.toLowerCase();
  const wanted = hint.toLowerCase().replace(/\bmaths?\b/, "math");
  return name.includes(wanted) || wanted.includes(name) || sameText(name, hint);
}

// ---------------------------------------------------------------------------------------------------------------------
// Handlers (linked students)
// ---------------------------------------------------------------------------------------------------------------------

async function handleDailyQuestion(actor: Actor, hint: string | null, links: Links, now: Date): Promise<Plan> {
  const overview = await getDailyOverview(actor, now);
  if (overview.items.length === 0) return processed("question", [reply(`Add your subjects in the app first, then send QUESTION: ${links.app}`)]);
  const items = hint ? overview.items.filter((item) => subjectMatches(item.subject.name, hint)) : overview.items;
  if (items.length === 0) {
    return processed("question", [reply(`You're not studying a subject called "${hint}". Send QUESTION for today's question in your subjects.`)]);
  }
  const open = items.find((item) => item.dailyQuestionId && item.entitled && (!item.attempt || item.attempt.status === "IN_PROGRESS"));
  if (!open) {
    const locked = items.find((item) => item.dailyQuestionId && !item.entitled);
    if (locked) return processed("question", [reply(`The daily question for ${locked.subject.name} isn't included in your plan. See the plans: ${links.pricing}`)]);
    if (items.some((item) => item.dailyQuestionId && item.attempt)) {
      const streak = overview.streak > 0 ? ` Your streak: ${overview.streak} day${overview.streak === 1 ? "" : "s"}.` : "";
      return processed("question", [reply(`You've answered today's question${items.length === 1 ? "" : "s"}. Well done!${streak} Come back tomorrow for a new one.`)]);
    }
    return processed("question", [reply(`There's no daily question for your subjects yet today. You can practise in the app: ${links.app}`)]);
  }
  const started = await startDailyQuestion(actor, open.subject.id);
  const view = await getAttemptForStudent(actor, started.attemptId, { now });
  const slot = view.questions[0];
  if (!slot?.question) return processed("question", [reply(`Today's ${open.subject.name} question can't be shown here. Open it in the app: ${links.daily}`)]);
  if (slot.result) {
    const outcome = slot.result.isCorrect === true ? " You got it right." : "";
    return processed("question", [reply(`You've already answered today's ${open.subject.name} question.${outcome} See it in the app: ${links.daily}`)], { state: { kind: "idle" } });
  }
  const rendered = renderQuestion({ question: slot.question, attemptId: view.id, position: slot.position, subjectName: open.subject.name, appLink: links.daily });
  const state: StateUpdate = rendered.awaiting
    ? {
        kind: "awaiting",
        attemptId: view.id,
        position: slot.position,
        awaiting: rendered.awaiting,
        optionKeys: rendered.optionKeys,
        expiresAt: new Date(now.getTime() + PENDING_ANSWER_TTL_MS),
        lastCommand: "question",
      }
    : { kind: "idle" };
  return processed("question", [{ spec: rendered.message }], { state });
}

/** The engine response for a parsed answer, or null when it does not fit the question. */
export function toEngineResponse(question: StudentQuestionView, answer: ParsedAnswer): unknown {
  const interaction = question.interaction;
  switch (interaction.type) {
    case "MULTIPLE_CHOICE": {
      if (answer.kind !== "choice") return null;
      if (interaction.selectMode === "single" && answer.letters.length !== 1) return null;
      const keys = answer.letters.map((letter) => interaction.options[indexOfLetter(letter)]?.key);
      if (keys.some((key) => key === undefined)) return null;
      return { type: "MULTIPLE_CHOICE", optionKeys: keys as string[] };
    }
    case "TRUE_FALSE":
      return answer.kind === "boolean" ? { type: "TRUE_FALSE", value: answer.value } : null;
    case "SHORT_ANSWER":
      return answer.kind === "text" ? { type: "SHORT_ANSWER", text: answer.text.trim().slice(0, QUESTION_LIMITS.shortTextResponse) } : null;
    case "NUMERICAL": {
      if (answer.kind !== "text") return null;
      // "x = 5" when the question asks for x: the marker reads numbers, so drop a leading "<symbol> =".
      const value = answer.text.trim().replace(/^[a-zA-Zθ]\s*=\s*/, "").slice(0, QUESTION_LIMITS.numberInput);
      return { type: "NUMERICAL", value };
    }
    case "FILL_IN_THE_BLANK": {
      const blank = interaction.blanks[0];
      if (answer.kind !== "text" || !blank || interaction.blanks.length !== 1) return null;
      return { type: "FILL_IN_THE_BLANK", blanks: [{ blankId: blank.id, text: answer.text.trim().slice(0, 500) }] };
    }
    default:
      return null;
  }
}

function nudgeFor(awaiting: AwaitingAnswer | null): string {
  if (awaiting?.kind === "choice") {
    const letters = Array.from({ length: awaiting.optionCount }, (_, i) => letterFor(i));
    const list = letters.length > 1 ? `${letters.slice(0, -1).join(", ")} or ${letters.at(-1) ?? ""}` : (letters[0] ?? "A");
    return awaiting.multiple ? `Reply with the letters of every correct option (${list}), or SKIP.` : `Reply with ${list}, or SKIP to leave it for now.`;
  }
  if (awaiting?.kind === "boolean") return "Reply TRUE or FALSE (YES or NO also work), or SKIP to leave it for now.";
  return "Reply with your answer, or SKIP to leave it for now.";
}

/**
 * Attempt modes this channel accepts answers for. The channel only ever SENDS daily questions (`handleDailyQuestion`),
 * so answer buttons (`a:<attemptId>:<position>:<choice>`, whose ids come back from the client) and the typed-answer
 * state can only legitimately point at a DAILY_QUESTION attempt. Anything else — a web practice session, a lesson
 * check, an assignment, an exam — is refused even though it belongs to the same student and gives immediate
 * feedback: a forged or replayed button id must not mark work the channel never showed.
 */
export const WHATSAPP_ANSWERABLE_MODES: ReadonlySet<AttemptMode> = new Set<AttemptMode>(["DAILY_QUESTION"]);

const UNAVAILABLE_QUESTION = "That question isn't available any more. Send QUESTION for today's question.";

async function handleAnswer(
  actor: Actor,
  target: { attemptId: string; position: number },
  answer: ParsedAnswer,
  state: ConversationState,
  links: Links,
  now: Date,
): Promise<Plan> {
  const view = await getAttemptForStudent(actor, target.attemptId, { now });
  // Refused without touching the conversation state: a pending daily question stays answerable.
  if (!WHATSAPP_ANSWERABLE_MODES.has(view.mode)) return processed("answer", [reply(UNAVAILABLE_QUESTION)]);
  const slot = view.questions.find((question) => question.position === target.position);
  if (!slot?.question) return processed("answer", [reply(UNAVAILABLE_QUESTION)], { state: { kind: "idle" } });
  const response = toEngineResponse(slot.question, answer);
  if (response === null) return processed("answer", [reply(nudgeFor(state.awaiting))]);
  const feedback = await answerAndMark(actor, target.attemptId, target.position, response, { now });
  const lessonLink = feedback.studyLesson ? absoluteUrl(feedback.studyLesson.href) : null;
  const pendingHere = state.pending?.attemptId === target.attemptId && state.pending.position === target.position;
  return processed("answer", [{ spec: renderFeedback({ feedback, question: slot.question, appLink: links.daily, lessonLink }) }], {
    ...(pendingHere || state.pending === null ? { state: { kind: "idle" } } : {}),
  });
}

async function handleStreak(actor: Actor, links: Links, now: Date): Promise<Plan> {
  const dashboard = await getStudentDashboard(actor, now);
  return processed("streak", [
    {
      spec: renderStreak({
        current: dashboard.streak.current,
        longest: dashboard.streak.longest,
        status: dashboard.streak.status,
        targetMinutes: dashboard.dailyTarget.minutes,
        minutesToday: dashboard.dailyTarget.minutesStudiedToday,
        goalMet: dashboard.dailyTarget.goalMet,
        appLink: links.app,
      }),
    },
  ]);
}

async function handleExplain(actor: Actor, topic: string, inboundId: string, links: Links, deps: ProcessDeps, now: Date): Promise<Plan> {
  const result = await explainTopic(actor, topic, {
    ...(deps.gateway ? { gateway: deps.gateway } : {}),
    now,
    clientMessageId: `wa-${inboundId}`,
    links: { pricing: links.pricing },
    helplines: loadHelplines,
  });
  if (result.kind === "text") {
    return { command: "explain", replies: [reply(result.text)], inbound: { status: "PROCESSED", ...(result.safeguarding ? { scrub: true } : {}) } };
  }
  const inbound = { status: "PROCESSED" as const, aiMessageId: result.userAiMessageId };
  if (result.refused) {
    return { command: "explain", replies: [reply("I can't help with that one here. Try a school topic, for example: EXPLAIN photosynthesis")], inbound };
  }
  return { command: "explain", replies: [{ spec: null, aiMessageId: result.assistantAiMessageId }], inbound };
}

async function handleLinked(
  actor: Actor,
  command: WhatsAppCommand,
  state: ConversationState,
  inboundId: string,
  links: Links,
  deps: ProcessDeps,
  now: Date,
): Promise<Plan> {
  switch (command.kind) {
    case "help":
    case "empty":
      return processed("help", [{ spec: helpMessage(APP_NAME) }]);
    case "link":
      return processed("link", [reply(`This number is linked to your ${APP_NAME} account. To unlink it, open Settings → WhatsApp: ${links.settings}`)]);
    case "dailyQuestion":
      return handleDailyQuestion(actor, command.subjectHint, links, now);
    case "buttonAnswer":
      return handleAnswer(
        actor,
        { attemptId: command.attemptId, position: command.position },
        command.choice === "T" || command.choice === "F" ? { kind: "boolean", value: command.choice === "T" } : { kind: "choice", letters: [command.choice] },
        state,
        links,
        now,
      );
    case "answer":
      if (!state.pending) return processed("answer", [reply("There's no question waiting for an answer. Send QUESTION for today's study question.")]);
      return handleAnswer(actor, state.pending, command.answer, state, links, now);
    case "skip":
      return processed("skip", [reply("Okay, skipped. Send QUESTION when you're ready.")], { state: { kind: "idle" } });
    case "strayAnswer":
      return processed("answer", [reply("There's no question waiting for an answer. Send QUESTION for today's study question.")]);
    case "unparsedAnswer":
      return processed("answer", [reply(nudgeFor(state.awaiting))]);
    case "streak":
      return handleStreak(actor, links, now);
    case "explain":
      return handleExplain(actor, command.topic, inboundId, links, deps, now);
    case "unknown": {
      // Safeguarding phrases get the supportive reply (no model call, text scrubbed), never the menu.
      if (heuristicIntent(command.text)?.intent === "UNSAFE") return handleExplain(actor, command.text, inboundId, links, deps, now);
      const intent = await classifyWhatsAppIntent(actor, command.text, deps.gateway ? { gateway: deps.gateway } : {});
      if (intent.intent === "EXPLAIN") return handleExplain(actor, intent.topic ?? command.text, inboundId, links, deps, now);
      if (intent.intent === "QUESTION") return handleDailyQuestion(actor, null, links, now);
      if (intent.intent === "STREAK") return handleStreak(actor, links, now);
      return processed("help", [{ spec: helpMessage(APP_NAME) }]);
    }
    case "stop":
    case "start":
      // Handled before identity resolution.
      return processed(command.kind, []);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------------------------------------------------

async function plan(
  row: { id: string; body: string | null; payload: unknown; messageType: string },
  identity: { id: string; userId: string | null; verifiedAt: Date | null; externalId: string },
  deps: ProcessDeps,
  now: Date,
): Promise<Plan> {
  const links = linksFor();
  const payload = inboundPayloadSchema.safeParse(row.payload ?? {});
  const type = (payload.success ? payload.data.type : undefined) ?? row.messageType;
  const replyId = payload.success ? (payload.data.reply?.id ?? null) : null;
  const state = await loadConversationState(identity.id, now);
  const command = parseCommand({ text: row.body, replyId }, state.awaiting);

  if (command.kind === "stop") {
    return processed("stop", [reply(`You won't get reminders from ${APP_NAME} on WhatsApp any more. You can still message us any time. Send START to turn reminders back on.`)], { optOut: true });
  }
  if (command.kind === "start") {
    const text = identity.userId && identity.verifiedAt
      ? "Reminders are on. Send STOP any time to stop them."
      : `Thanks. Link this number to your ${APP_NAME} account to get study reminders: ${links.settings}`;
    return processed("start", [reply(text)], { optOut: false });
  }

  const resolved = await resolveIdentityActor(identity, now);
  if (resolved.status === "unlinked") {
    const last = state.context.linkHelpAt ? Date.parse(state.context.linkHelpAt) : Number.NaN;
    const throttled = Number.isFinite(last) && now.getTime() - last < LINK_HELP_THROTTLE_MS && command.kind !== "help" && command.kind !== "link";
    if (throttled) return { command: "link_help", replies: [], inbound: { status: "IGNORED" } };
    return processed("link_help", [{ spec: linkInstructions(APP_NAME, links.settings) }], {
      state: { kind: "idle", context: { linkHelpAt: now.toISOString() } },
    });
  }
  if (resolved.status === "lapsed") return processed("relink", [{ spec: relinkMessage(APP_NAME, links.settings) }], { state: { kind: "idle" } });
  if (resolved.status === "consent_required") return processed("consent", [{ spec: consentRequiredMessage(APP_NAME, links.family) }]);
  if (!READABLE_TYPES.has(type)) {
    return processed("unsupported", [reply("I can only read text messages for now. Send HELP to see what I can do.")]);
  }
  try {
    return await handleLinked(resolved.actor, command, state, row.id, links, deps, now);
  } catch (error) {
    const text = friendlyError(error, links);
    if (text === null) throw error;
    return processed(command.kind, [reply(text)]);
  }
}

/**
 * Handler of `whatsapp.process` (payload `{ messageId }`). Throws for unexpected failures (the job retries); on the last
 * attempt the inbound row is marked FAILED instead.
 */
export async function processInboundMessage(messageId: string, deps: ProcessDeps = {}): Promise<ProcessOutcome> {
  const now = deps.now?.() ?? new Date();
  const log = (deps.logger ?? rootLogger).child({ module: "whatsapp.process", channelMessageId: messageId });
  const row = await db.channelMessage.findUnique({
    where: { id: messageId },
    select: {
      id: true,
      direction: true,
      status: true,
      body: true,
      payload: true,
      messageType: true,
      identity: { select: { id: true, userId: true, verifiedAt: true, externalId: true } },
    },
  });
  if (!row || row.direction !== "INBOUND") return { status: "noop", command: null, replies: 0 };
  if (row.status !== "RECEIVED") return { status: "noop", command: null, replies: 0 };
  if (!row.identity) {
    await db.channelMessage.updateMany({ where: { id: row.id, status: "RECEIVED" }, data: { status: "IGNORED" } });
    return { status: "ignored", command: null, replies: 0 };
  }
  const identity = row.identity;

  let result: Plan;
  try {
    result = await plan(row, identity, deps, now);
  } catch (error) {
    if ((deps.attempt ?? 1) >= (deps.maxAttempts ?? 3)) {
      await db.channelMessage.updateMany({ where: { id: row.id, status: "RECEIVED" }, data: { status: "FAILED" } });
      log.error("whatsapp: message processing failed for good", { err: error });
      return { status: "failed", command: null, replies: 0 };
    }
    throw error;
  }

  const committed = await db.$transaction(
    async (tx) => {
      const inbound = result.inbound;
      const scrub = inbound.aiMessageId !== undefined || inbound.scrub === true;
      const marked = await tx.channelMessage.updateMany({
        where: { id: row.id, status: "RECEIVED" },
        data: {
          status: inbound.status,
          ...(inbound.aiMessageId ? { contentClass: "AI_PRIVATE" as const, aiMessageId: inbound.aiMessageId } : {}),
          ...(scrub ? { body: null, payload: Prisma.DbNull, ...(inbound.aiMessageId ? {} : { bodyPurgedAt: now }) } : {}),
        },
      });
      if (marked.count === 0) return false;
      if (result.optOut !== undefined) await setIdentityOptOut(tx, identity.id, result.optOut, now);
      if (result.replies.length > 0) await queueOutbound(tx, { identityId: identity.id, drafts: result.replies, inReplyToId: row.id, purpose: "reply" });
      if (result.state) await saveConversationState(tx, identity.id, result.state);
      return true;
    },
    { maxWait: 10_000, timeout: 20_000 },
  );
  if (!committed) return { status: "noop", command: result.command, replies: 0 };
  log.info("whatsapp message processed", { command: result.command, replies: result.replies.length });
  return { status: result.inbound.status === "IGNORED" ? "ignored" : "processed", command: result.command, replies: result.replies.length };
}
