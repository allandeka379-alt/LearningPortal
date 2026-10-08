import type { AiIntent, AssessmentFeedbackTiming, AttemptMode } from "@/generated/prisma/client";
import type { AiIntentLabel, HintLevel, TutorTurnMode } from "@/lib/ai/types";
import { isAiNotConfigured } from "@/server/ai/gateway";
import { heuristicIntent } from "@/server/ai/intent";
import type { AssignmentAiHelpSetting } from "@/server/ai/policy";
import { revealAllowed, type FeedbackMode } from "@/server/attempts/policy";
import { isAppError } from "@/server/lib/errors";
import { scrubString } from "@/server/lib/logger";
import type { TutorErrorCode, TutorErrorEvent, TutorMessageStatus, TutorQuota, TutorRequestMode, TutorTurnModeWire } from "./protocol";

/**
 * Pure core of the AI tutor (§14, §15, §40; ARCHITECTURE §6.3, §6.4): history window, intent resolution, hint-ladder
 * bookkeeping, titles, the question context block and error mapping. No database, no network (CLAUDE.md rule 2).
 */

// ---------------------------------------------------------------------------------------------------------------------
// History window (§40 "don't send unnecessary context"; ARCHITECTURE §6.3 step 5 "last 8 turns")
// ---------------------------------------------------------------------------------------------------------------------

/** Student/assistant exchanges re-sent with a new turn (never the whole conversation). */
export const MAX_HISTORY_TURNS = 8;
/** Character budget of the re-sent history (~4k tokens); older turns are dropped first. */
export const MAX_HISTORY_CHARS = 16_000;

/** A stored message as the history window needs it (chronological order). */
export interface HistoryMessage {
  role: "USER" | "ASSISTANT";
  content: string;
  status: string;
  intent: AiIntent | null;
  hintLevel: number | null;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/** Assistant statuses whose text is worth re-sending as context (a refusal or error has none). */
const REUSABLE_STATUSES: ReadonlySet<string> = new Set<TutorMessageStatus>(["COMPLETE", "TRUNCATED", "ABORTED"]);

/**
 * The newest complete exchanges (student message + the assistant reply to it) that fit in `maxTurns` and `maxChars`,
 * flattened in chronological order, always starting with a student message and alternating. Student messages without
 * a usable reply (refused, failed, purged) are left out with their reply, so the model never sees a dangling turn.
 */
export function selectHistoryWindow(
  messages: readonly HistoryMessage[],
  options: { maxTurns?: number; maxChars?: number } = {},
): ChatTurn[] {
  const maxTurns = options.maxTurns ?? MAX_HISTORY_TURNS;
  const maxChars = options.maxChars ?? MAX_HISTORY_CHARS;
  const pairs: [string, string][] = [];
  for (let index = 0; index < messages.length - 1; index += 1) {
    const user = messages[index];
    const reply = messages[index + 1];
    if (user?.role !== "USER" || reply?.role !== "ASSISTANT") continue;
    if (user.content.trim().length === 0 || reply.content.trim().length === 0) continue;
    if (!REUSABLE_STATUSES.has(reply.status)) continue;
    pairs.push([user.content, reply.content]);
    index += 1;
  }
  const chosen: [string, string][] = [];
  let used = 0;
  for (let index = pairs.length - 1; index >= 0 && chosen.length < maxTurns; index -= 1) {
    const pair = pairs[index];
    if (!pair) continue;
    const size = pair[0].length + pair[1].length;
    if (used + size > maxChars) break;
    used += size;
    chosen.unshift(pair);
  }
  return chosen.flatMap(([user, assistant]) => [
    { role: "user" as const, content: user },
    { role: "assistant" as const, content: assistant },
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// Hint ladder state (ARCHITECTURE §6.4)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Highest hint level already given for the CURRENT question: the level of the latest ladder reply, or null when the
 * last ladder reply was the full solution (level 4: that question is finished, the next one starts at level 0) or
 * there is none yet.
 */
export function previousHintLevel(messages: readonly HistoryMessage[]): HintLevel | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role !== "ASSISTANT" || message.hintLevel === null) continue;
    const level = Math.trunc(message.hintLevel);
    if (level < 0 || level >= 4) return null;
    return level as HintLevel;
  }
  return null;
}

/** The student has shared working ("Check my working") since the last full solution. */
export function hasSharedWorking(messages: readonly HistoryMessage[]): boolean {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (!message) continue;
    if (message.role === "ASSISTANT" && message.hintLevel === 4) return false;
    if (message.role === "USER" && message.intent === "CHECK_WORK") return true;
  }
  return false;
}

// ---------------------------------------------------------------------------------------------------------------------
// Intent (§15; ARCHITECTURE §6.3 step 4: cheap heuristics first, FAST tier only when ambiguous)
// ---------------------------------------------------------------------------------------------------------------------

export interface LocalIntent {
  intent: AiIntentLabel;
  /** `button`: the chip the student chose; `heuristic`: an unambiguous phrasing; `default`: teach. */
  source: "button" | "heuristic" | "default";
  /** No chip was chosen and no phrasing matched: ask the FAST-tier classifier. */
  needsModel: boolean;
}

/**
 * Resolves the turn's intent without a model call where possible:
 * - a safeguarding phrase always wins (chips can never bypass a supportive reply);
 * - an explicit HINT / CHECK_WORK / ANSWER chip is used as chosen;
 * - the default "Teach me" chip honours an unambiguous typed request ("just give me the answer", "check my working");
 * - without any chip (API clients) an ambiguous message needs the classifier, except while an exam is in progress
 *   (no model call is spent on a turn that will be refused anyway).
 */
export function resolveLocalIntent(mode: TutorRequestMode | undefined, text: string, options: { activeExam: boolean }): LocalIntent {
  const heuristic = heuristicIntent(text);
  if (heuristic?.intent === "UNSAFE") return { intent: "UNSAFE", source: "heuristic", needsModel: false };
  if (mode !== undefined && mode !== "TEACH") return { intent: mode, source: "button", needsModel: false };
  if (heuristic) return { intent: heuristic.intent, source: "heuristic", needsModel: false };
  if (mode === "TEACH") return { intent: "TEACH", source: "button", needsModel: false };
  return { intent: "TEACH", source: "default", needsModel: !options.activeExam };
}

/** Persisted `AiIntent` of the assistant reply for the policy's turn mode. */
export function assistantIntentFor(mode: TutorTurnMode): AiIntent {
  switch (mode) {
    case "TEACH":
    case "HINT":
    case "ANSWER":
    case "CHECK_WORK":
      return mode;
    case "REDIRECT":
      return "OFF_TOPIC";
    case "SAFEGUARD":
    case "EXAM_LOCKED":
    case "NO_HELP":
      return "OTHER";
  }
}

/** Best-effort turn mode of a stored assistant reply (for replays): the inverse of {@link assistantIntentFor}. */
export function turnModeFromIntent(intent: AiIntent | null): TutorTurnModeWire {
  switch (intent) {
    case "TEACH":
    case "HINT":
    case "ANSWER":
    case "CHECK_WORK":
      return intent;
    case "OFF_TOPIC":
      return "REDIRECT";
    default:
      return "TEACH";
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Titles (first-turn title from the topic, never an extra model call)
// ---------------------------------------------------------------------------------------------------------------------

export const TITLE_MAX_CHARS = 80;

/** A one-line excerpt of `text` cut at a word boundary. */
export function excerpt(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max / 2 ? cut.slice(0, space) : cut).replace(/[\s.,;:!?-]+$/, "")}…`;
}

/** Conversation title: the topic, else the subject, else an excerpt of the first message (null when all are empty). */
export function conversationTitle(input: { topicName?: string | null; subjectName?: string | null; firstMessage?: string | null }): string | null {
  for (const candidate of [input.topicName, input.subjectName, input.firstMessage]) {
    const clean = candidate ? excerpt(scrubString(candidate), TITLE_MAX_CHARS) : "";
    if (clean.length > 0) return clean;
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Student context helpers
// ---------------------------------------------------------------------------------------------------------------------

/**
 * System-derived summary of a recent mistake (ARCHITECTURE §5.12: never the student's own words): the misconception
 * label from marking when there is one, else a neutral description.
 */
export function mistakeSummary(input: { misconceptions?: readonly unknown[] | null; difficulty?: number | null }): string {
  const label = (input.misconceptions ?? []).find((item): item is string => typeof item === "string" && item.trim().length > 0);
  if (label) return label.trim();
  const difficulty = input.difficulty && input.difficulty >= 1 && input.difficulty <= 5 ? ` (difficulty ${input.difficulty} of 5)` : "";
  return `Answered a question incorrectly${difficulty}`;
}

/** Misconception labels stored in `QuestionAttempt.feedback` (`{ misconceptions?: string[] }`), if any. */
export function misconceptionsOf(feedback: unknown): string[] {
  if (typeof feedback !== "object" || feedback === null) return [];
  const value = (feedback as { misconceptions?: unknown }).misconceptions;
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

// ---------------------------------------------------------------------------------------------------------------------
// Question context block (conversations opened from a question: "Ask the tutor about this")
// ---------------------------------------------------------------------------------------------------------------------

export const QUESTION_CONTEXT_MAX_CHARS = 3_000;
const STEM_MAX_CHARS = 1_600;
const OPTION_MAX_CHARS = 200;
const ANSWER_MAX_CHARS = 600;
const EXPLANATION_MAX_CHARS = 800;

/** Neutralises anything imitating the prompt's own wrapper tags (prompt injection through content or answers). */
export function neutralizePromptTags(text: string): string {
  return text.replace(/<\s*\/?\s*(?:question[_\s-]*context|student[_\s-]*context|platform[_\s-]*guidance)/gi, (match) =>
    match.replace("<", "(").replace(/[_\s-]+/g, " "),
  );
}

function clip(text: string, max: number): string {
  const clean = neutralizePromptTags(text).replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

/**
 * The student's own answer from `QuestionAttempt.response` as one short line (null for types that do not summarise
 * well). Contact details are masked.
 */
export function describeStudentResponse(response: unknown): string | null {
  if (typeof response !== "object" || response === null) return null;
  const value = response as { type?: unknown; optionKeys?: unknown; value?: unknown; text?: unknown; unit?: unknown; working?: unknown };
  const text = (raw: unknown, max: number): string | null =>
    typeof raw === "string" && raw.trim().length > 0 ? clip(scrubString(raw), max) : null;
  switch (value.type) {
    case "MULTIPLE_CHOICE":
      return Array.isArray(value.optionKeys) && value.optionKeys.length > 0
        ? `chose option ${value.optionKeys.filter((key) => typeof key === "string").join(", ")}`
        : null;
    case "TRUE_FALSE":
      return typeof value.value === "boolean" ? `answered ${value.value ? "true" : "false"}` : null;
    case "NUMERICAL":
    case "CALCULATION": {
      const answer = text(value.value, 80);
      if (!answer) return null;
      const unit = text(value.unit, 20);
      const working = text(value.working, ANSWER_MAX_CHARS);
      return `answered ${answer}${unit ? ` ${unit}` : ""}${working ? `\nWorking: ${working}` : ""}`;
    }
    case "SHORT_ANSWER":
    case "ESSAY":
    case "EXTENDED_RESPONSE": {
      const answer = text(value.text, ANSWER_MAX_CHARS);
      return answer ? `wrote: ${answer}` : null;
    }
    default:
      return null;
  }
}

/**
 * LaTeX commands whose argument renders INVISIBLY (KaTeX reserves the space but draws nothing): the model must not
 * read text the student cannot see (hidden instructions in authored content, AI-03).
 */
const INVISIBLE_TEX_COMMANDS = /\\(?:phantom|hphantom|vphantom)(?![A-Za-z])/g;
/** Colour commands with a fully transparent colour: their text is invisible too. */
const TRANSPARENT_TEXCOLOR = /\\textcolor\s*\{\s*transparent\s*\}/g;
const TRANSPARENT_COLOR_SWITCH = /\\color\s*\{\s*transparent\s*\}/g;
/**
 * Characters that render as nothing but that a model still reads: zero-width and joiner characters, bidi controls,
 * invisible operators, soft hyphens, the BOM and the Unicode "tag" block (U+E0000-U+E007F, used to smuggle ASCII).
 */
const INVISIBLE_CHARS = /[­͏؜ᅟᅠ឴឵᠋-᠏​-‏‪-‮⁠-⁯ㅤ︀-️﻿ﾠ\u{E0000}-\u{E007F}]/gu;

/** Index just past one TeX argument starting at `from` (a balanced `{...}` group, a `\command` or one character). */
function skipTexArgument(text: string, from: number): number {
  let index = from;
  while (index < text.length && /\s/.test(text[index] as string)) index += 1;
  if (index >= text.length) return index;
  const first = text[index];
  if (first === "{") {
    let depth = 0;
    for (let i = index; i < text.length; i += 1) {
      const char = text[i];
      if (char === "\\") {
        i += 1; // an escaped character (\{, \}) never opens or closes a group
        continue;
      }
      if (char === "{") depth += 1;
      else if (char === "}") {
        depth -= 1;
        if (depth === 0) return i + 1;
      }
    }
    return text.length; // unbalanced: everything after the command is hidden
  }
  if (first === "\\") {
    const command = /^\\(?:[A-Za-z]+|.)/.exec(text.slice(index));
    return index + (command?.[0].length ?? 1);
  }
  return index + 1;
}

/** Index of the end of the TeX group that encloses `from` (the unmatched `}`), or the end of the text. */
function endOfEnclosingGroup(text: string, from: number): number {
  let depth = 0;
  for (let i = from; i < text.length; i += 1) {
    const char = text[i];
    if (char === "\\") {
      i += 1;
      continue;
    }
    if (char === "{") depth += 1;
    else if (char === "}") {
      if (depth === 0) return i;
      depth -= 1;
    }
  }
  return text.length;
}

function removeMatches(text: string, pattern: RegExp, end: (text: string, afterMatch: number) => number): string {
  let out = text;
  for (let guard = 0; guard < 200; guard += 1) {
    pattern.lastIndex = 0;
    const match = pattern.exec(out);
    if (!match) break;
    const stop = end(out, match.index + match[0].length);
    out = `${out.slice(0, match.index)} ${out.slice(stop)}`;
  }
  return out;
}

/**
 * The text of authored content as the STUDENT sees it, for AI context (AI-03): drops invisible characters,
 * `\phantom`-family arguments and transparent-coloured text, which KaTeX renders as blank space but which a model would
 * otherwise read as instructions. Pure and deterministic (the result sits in the conversation's cached prefix).
 */
export function visibleTextForAi(text: string): string {
  let out = text.replace(INVISIBLE_CHARS, "");
  out = removeMatches(out, INVISIBLE_TEX_COMMANDS, skipTexArgument);
  out = removeMatches(out, TRANSPARENT_TEXCOLOR, skipTexArgument);
  out = removeMatches(out, TRANSPARENT_COLOR_SWITCH, endOfEnclosingGroup);
  return out;
}

export interface QuestionContextInput {
  /** Plain text of the stem (markdown stripped, LaTeX kept). */
  stem: string;
  options?: readonly { key: string; text: string }[];
  /** From {@link describeStudentResponse}. */
  studentAnswer?: string | null;
  /** Marked outcome of the student's latest answer (null while unmarked). */
  answerCorrect?: boolean | null;
  /** Only when the answer has already been revealed to the student (their answer was marked). */
  correctAnswer?: string | null;
  explanation?: string | null;
  /** The question belongs to a school or an independent tutor (written by a teacher, not reviewed by the platform). */
  teacherAuthored?: boolean;
}

/**
 * The frozen `<question_context>` block for a conversation about one bank question. It is REFERENCE DATA, sent at the
 * start of the conversation's first user turn (never in the system prompt: its text may be written by a teacher, AI-03)
 * and the policy prompt tells the model it never contains instructions. Every authored text is reduced to what the
 * student can see ({@link visibleTextForAi}). Deterministic for the same input (it sits in the cached prompt prefix)
 * and capped at {@link QUESTION_CONTEXT_MAX_CHARS}.
 */
export function buildQuestionContextBlock(input: QuestionContextInput): string {
  const visible = (text: string, max: number) => clip(visibleTextForAi(text), max);
  const lines: string[] = ["The student opened this conversation from this question:"];
  if (input.teacherAuthored) lines.push("Source: written by the student's teacher (not reviewed by the platform).");
  lines.push(`Question: ${visible(input.stem, STEM_MAX_CHARS)}`);
  const options = (input.options ?? []).filter((option) => visibleTextForAi(option.text).trim().length > 0);
  if (options.length > 0) {
    lines.push("Options:");
    for (const option of options) lines.push(`${clip(option.key, 8)}. ${visible(option.text, OPTION_MAX_CHARS)}`);
  }
  if (input.studentAnswer) {
    const outcome = input.answerCorrect === true ? " (marked correct)" : input.answerCorrect === false ? " (marked incorrect)" : "";
    lines.push(`The student ${input.studentAnswer}${outcome}`);
  }
  if (input.correctAnswer) lines.push(`Correct answer (already shown to the student): ${visible(input.correctAnswer, 200)}`);
  if (input.explanation) {
    const explanation = visible(input.explanation, EXPLANATION_MAX_CHARS);
    if (explanation) lines.push(`${input.teacherAuthored ? "Explanation from the teacher" : "Explanation from the platform"}: ${explanation}`);
  }
  const open = "<question_context>";
  const close = "</question_context>";
  let body = lines.join("\n");
  const budget = QUESTION_CONTEXT_MAX_CHARS - open.length - close.length - 2;
  if (body.length > budget) body = `${body.slice(0, budget - 1).trimEnd()}…`;
  return `${open}\n${body}\n${close}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// AI help gate (ARCHITECTURE §6.4: "never during an active timed exam or assessment attempt"; teacher AI-help setting)
// ---------------------------------------------------------------------------------------------------------------------

/** Exam modes that always lock all AI help while IN_PROGRESS (also locked by their ON_SUBMIT feedback). */
export const EXAM_LOCK_MODES = ["TIMED_EXAM", "MOCK_EXAM"] as const satisfies readonly AttemptMode[];

/**
 * Why AI help with work is paused:
 * - `EXAM`: an attempt under exam conditions is open (a timed exam or mock, or any test whose answers are withheld
 *   until submission: platform quizzes/tests, diagnostics and teacher tests alike, timed or not);
 * - `ASSIGNMENT_NO_AI`: assignment work whose teacher set AI help to "none" is open.
 */
export type AiHelpLock = "EXAM" | "ASSIGNMENT_NO_AI";

/** The facts about one OPEN attempt that decide what it does to AI help. */
export interface OpenAttemptFacts {
  mode: AttemptMode;
  /** `AssessmentAttempt.config.feedback` (ON_SUBMIT = answers withheld until submission, exam conditions). */
  feedback: FeedbackMode;
  /** `Assignment.aiHelp` when the attempt is assignment work; null for the student's own work. */
  assignmentAiHelp: AssignmentAiHelpSetting | null;
}

/** The lock an open attempt puts on AI help, if any (pure). */
export function aiLockOf(attempt: OpenAttemptFacts): AiHelpLock | null {
  if ((EXAM_LOCK_MODES as readonly AttemptMode[]).includes(attempt.mode) || attempt.feedback === "ON_SUBMIT") return "EXAM";
  if (attempt.assignmentAiHelp === "NONE") return "ASSIGNMENT_NO_AI";
  return null;
}

const AI_HELP_STRICTNESS: Readonly<Record<AssignmentAiHelpSetting, number>> = { FULL: 0, HINTS_ONLY: 1, NONE: 2 };

/** The most restrictive of several AI-help settings (null = no assignment setting applies). */
export function strictestAiHelp(...settings: readonly (AssignmentAiHelpSetting | null | undefined)[]): AssignmentAiHelpSetting | null {
  let strictest: AssignmentAiHelpSetting | null = null;
  for (const setting of settings) {
    if (!setting) continue;
    if (strictest === null || AI_HELP_STRICTNESS[setting] > AI_HELP_STRICTNESS[strictest]) strictest = setting;
  }
  return strictest;
}

export interface AiHelpGate {
  /** All AI help with work is paused (tutor, solver, WhatsApp explanations); null = not paused. */
  lock: AiHelpLock | null;
  /** The strictest AI-help setting of the student's open assignment work (null = none open). */
  aiHelp: AssignmentAiHelpSetting | null;
}

/** What the student's open attempts allow AI help to do right now (pure). EXAM wins over ASSIGNMENT_NO_AI. */
export function decideAiHelpGate(open: readonly OpenAttemptFacts[]): AiHelpGate {
  let lock: AiHelpLock | null = null;
  let aiHelp: AssignmentAiHelpSetting | null = null;
  for (const attempt of open) {
    const attemptLock = aiLockOf(attempt);
    if (attemptLock === "EXAM" || (attemptLock !== null && lock === null)) lock = attemptLock;
    aiHelp = strictestAiHelp(aiHelp, attempt.assignmentAiHelp);
  }
  return { lock, aiHelp };
}

/** The student-facing reason AI help is paused. */
export function aiLockMessage(lock: AiHelpLock, surface: "tutor" | "solver" = "tutor"): string {
  const after = surface === "solver" ? "and then you can use the solver again." : "and then we can go through it together.";
  return lock === "EXAM"
    ? `AI help is paused while you have a test or exam in progress. Submit it first, ${after}`
    : `Your teacher has switched off AI help for the assignment you're working on. Submit it first, ${after}`;
}

/** The facts about the student's latest answer to a question (the attempt it was given in, and its marking). */
export interface AnsweredQuestionFacts extends OpenAttemptFacts {
  attemptOpen: boolean;
  /** The assessment's feedback timing (AFTER_CLOSE teacher tests reveal only after the assignment window). */
  assessmentTiming: AssessmentFeedbackTiming | null;
  /** Assignment window end (closesAt, else dueAt); null when not assignment work. */
  windowClosesAt: Date | null;
  /** The answer has been marked (`QuestionAttempt.markedAt` set). */
  marked: boolean;
}

export type QuestionAccess =
  /** The question is in an open attempt that pauses AI help: no conversation, no context. */
  | { kind: "LOCKED"; lock: AiHelpLock }
  /** Submitted, but the teacher releases the answers later (AFTER_CLOSE, window still open): nothing about it yet. */
  | { kind: "WITHHELD" }
  /** The tutor may discuss it; `revealed`: the outcome, correct answer and explanation were already shown. */
  | { kind: "OPEN"; revealed: boolean };

/**
 * What the tutor may do with a question the student answered (AI-01 / AI-02): the platform's own reveal rule
 * (`revealAllowed`, the same decision as the results page) decides whether the outcome, the correct answer and the
 * explanation may reach the model, so the tutor never discloses more than the student has been shown. Pure.
 */
export function questionAccess(facts: AnsweredQuestionFacts, now: Date): QuestionAccess {
  if (facts.attemptOpen) {
    const lock = aiLockOf(facts);
    if (lock) return { kind: "LOCKED", lock };
  }
  const allowed = revealAllowed({
    feedback: facts.feedback,
    attemptOpen: facts.attemptOpen,
    slotMarked: facts.marked,
    assessmentTiming: facts.assessmentTiming,
    windowClosesAt: facts.windowClosesAt,
    now,
  });
  if (!facts.attemptOpen && facts.feedback === "ON_SUBMIT" && !allowed) return { kind: "WITHHELD" };
  return { kind: "OPEN", revealed: allowed && facts.marked };
}

export const ANSWERS_WITHHELD_MESSAGE =
  "Your teacher will release the answers to this test after it closes. You can ask the tutor about this question then.";

// ---------------------------------------------------------------------------------------------------------------------
// Quota and turns
// ---------------------------------------------------------------------------------------------------------------------

/** Allowance view after `consumed` more messages; null = unlimited. */
export function quotaView(limit: number | null, used: number, consumed = 0): TutorQuota | null {
  if (limit === null) return null;
  return { limit, remaining: Math.max(0, limit - Math.max(0, used) - consumed) };
}

/** Student turns left in a conversation. */
export function turnsRemaining(maxTurns: number, userMessageCount: number): number {
  return Math.max(0, maxTurns - userMessageCount);
}

// ---------------------------------------------------------------------------------------------------------------------
// Errors -> typed stream events
// ---------------------------------------------------------------------------------------------------------------------

export const AI_NOT_CONFIGURED_COPY =
  "The AI tutor is not configured yet. You can keep studying with lessons, practice and flashcards in the meantime.";
export const INTERNAL_ERROR_COPY = "Something went wrong on our side. Please try again.";

/** `AppError.details.tutorCode` carries tutor-specific codes (TURN_LIMIT, EXAM_IN_PROGRESS, CONVERSATION_CLOSED). */
export const TUTOR_CODE_DETAIL = "tutorCode";

const PASSTHROUGH_CODES: ReadonlySet<string> = new Set<TutorErrorCode>([
  "AI_UNAVAILABLE",
  "QUOTA_EXCEEDED",
  "RATE_LIMITED",
  "ENTITLEMENT_REQUIRED",
  "VALIDATION",
  "NOT_FOUND",
  "FORBIDDEN",
  "BAD_REQUEST",
]);

/**
 * Maps a thrown value to a friendly `error` event. Expected failures keep their (user-safe) message; anything else
 * becomes INTERNAL with a generic message (the caller logs it). `upgradeHref` is attached to plan-related failures.
 */
export function toErrorEvent(error: unknown, upgradeHref: string): TutorErrorEvent {
  if (isAiNotConfigured(error)) return { type: "error", code: "AI_NOT_CONFIGURED", message: AI_NOT_CONFIGURED_COPY };
  if (!isAppError(error)) return { type: "error", code: "INTERNAL", message: INTERNAL_ERROR_COPY };
  const tutorCode = error.details?.[TUTOR_CODE_DETAIL];
  if (tutorCode === "TURN_LIMIT" || tutorCode === "EXAM_IN_PROGRESS" || tutorCode === "CONVERSATION_CLOSED") {
    return { type: "error", code: tutorCode, message: error.message };
  }
  if (!PASSTHROUGH_CODES.has(error.code)) {
    return { type: "error", code: error.code === "CONFLICT" ? "CONVERSATION_CLOSED" : "INTERNAL", message: error.code === "CONFLICT" ? error.message : INTERNAL_ERROR_COPY };
  }
  const code = error.code as TutorErrorCode;
  const fieldMessage = code === "VALIDATION" ? Object.values(error.fieldErrors ?? {})[0]?.[0] : undefined;
  const event: TutorErrorEvent = { type: "error", code, message: fieldMessage ?? error.message };
  if (code === "QUOTA_EXCEEDED" || code === "ENTITLEMENT_REQUIRED") {
    const path = error.details?.upgradePath;
    event.upgradeHref = typeof path === "string" && path.startsWith("/") ? path : upgradeHref;
  }
  if (error.retryAfterSeconds !== undefined) event.retryAfterSeconds = error.retryAfterSeconds;
  return event;
}
