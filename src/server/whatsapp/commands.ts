/**
 * Deterministic command parser for WhatsApp messages (ARCHITECTURE §8 step 7: keywords first, the FAST-tier classifier
 * only for what remains ambiguous). Pure: no I/O, unit-tested.
 *
 * | Says                                                         | Command                 |
 * |--------------------------------------------------------------|-------------------------|
 * | "Give me today's study question", QUESTION, DAILY, QUIZ      | dailyQuestion           |
 * | "question biology", "give me a maths question"               | dailyQuestion + subject |
 * | A / B / C / D, 1-10, true / false, yes / no, free text       | answer (when awaiting)  |
 * | "Explain photosynthesis", "define osmosis", "what is pH?"    | explain                 |
 * | STREAK, PROGRESS, TARGET                                     | streak                  |
 * | HELP, MENU, HI                                               | help                    |
 * | STOP / START (WhatsApp opt-out keywords)                     | stop / start            |
 * | SKIP, CANCEL                                                 | skip                    |
 * | LINK                                                         | link                    |
 * | anything else                                                | unknown (ambiguous)     |
 */

/** What the channel is waiting for, if anything (from ChannelConversationState). */
export interface AwaitingAnswer {
  kind: "choice" | "boolean" | "text";
  /** Number of options for "choice" questions. */
  optionCount: number;
  /** Several options may be chosen ("A C"). */
  multiple: boolean;
}

export type ParsedAnswer =
  | { kind: "choice"; letters: string[] }
  | { kind: "boolean"; value: boolean }
  | { kind: "text"; text: string };

export type WhatsAppCommand =
  | { kind: "help" }
  | { kind: "link" }
  | { kind: "stop" }
  | { kind: "start" }
  | { kind: "skip" }
  | { kind: "streak" }
  | { kind: "dailyQuestion"; subjectHint: string | null }
  /** `topic` is empty for a bare "explain" (the router asks what to explain). */
  | { kind: "explain"; topic: string }
  | { kind: "answer"; answer: ParsedAnswer }
  /** A tapped answer button / list row: `a:<attemptId>:<position>:<choice>`. */
  | { kind: "buttonAnswer"; attemptId: string; position: number; choice: string }
  /** A letter / boolean while no question is waiting. */
  | { kind: "strayAnswer" }
  /** A choice / boolean question is waiting but the reply is not a valid option. */
  | { kind: "unparsedAnswer" }
  | { kind: "unknown"; text: string }
  | { kind: "empty" };

export const MENU_BUTTON_IDS = { question: "cmd:question", streak: "cmd:streak", help: "cmd:help" } as const;

const ANSWER_BUTTON = /^a:([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}):(\d{1,4}):([A-JTF])$/i;
const LETTERS = "ABCDEFGHIJ";

/** Button / list-row id for an answer choice ("A".."J" or "T" / "F"). */
export function answerButtonId(attemptId: string, position: number, choice: string): string {
  return `a:${attemptId}:${position}:${choice}`;
}

/** Lower-case, collapsed, curly quotes straightened, trailing punctuation dropped. */
export function normalizeCommandText(text: string): string {
  return text
    .normalize("NFKC")
    .replace(/[’‘`]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\s.!?,;:]+$/u, "");
}

const STOP_WORDS = new Set(["stop", "stop all", "stopall", "unsubscribe", "opt out", "optout", "cancel all", "quit"]);
const START_WORDS = new Set(["start", "unstop", "subscribe", "opt in", "optin", "resume"]);
const HELP_WORDS = new Set(["help", "menu", "hi", "hello", "hey", "hie", "mhoro", "sawubona", "commands", "options", "info", "howzit"]);
const SKIP_WORDS = new Set(["skip", "cancel", "pass", "skip it", "i don't know", "dont know", "don't know", "idk"]);
const STREAK_WORDS = new Set([
  "streak",
  "my streak",
  "progress",
  "my progress",
  "target",
  "today's target",
  "todays target",
  "goal",
  "my goal",
  "stats",
]);
const LINK_WORDS = new Set(["link", "link account", "link my account", "connect"]);
const TRUE_WORDS = new Set(["true", "t", "yes", "y", "yebo", "hongu", "correct", "right"]);
const FALSE_WORDS = new Set(["false", "f", "no", "n", "kwete", "wrong", "incorrect"]);

const DAILY_EXACT =
  /^(?:(?:the |a |my )?(?:daily|today'?s?|todays) ?(?:study )?(?:question|quiz|q)?|questions?|quiz|quiz me|q|daily|practice|practise|next|another(?: one)?|(?:another|next|new|study) question)$/;
const REQUEST_PREFIX =
  /^(?:(?:please|pls|plz) )?(?:(?:give|send|show) (?:me )?|(?:can|could|may) (?:i|you) (?:have|get|give me|send me) |i want |i'd like |i need )?(?:(?:the|a|an|my|today'?s|todays|another|new|next|one more) )*/;
const QUESTION_CORE = /^(?:(?:daily|study|practice|revision) )*(?:question|quiz)(?: (?:for|of) (?:today|the day))?(?: (?:please|pls|plz))?$/;
const SUBJECT_AFTER = /^(?:question|quiz|q|daily(?: question)?)\s+(?:on |for |in |about )?([a-z][a-z &'-]{1,40})$/;
const SUBJECT_BEFORE = /^([a-z][a-z &'-]{1,40}?)\s+(?:daily |study |practice )?(?:question|quiz)(?: (?:please|pls|plz))?$/;
const GENERIC_HINTS = /^(?:please|pls|plz|today|for today|of the day|daily|study|practice|revision|another|new|next|the|a|my|me)$/;
const EXPLAIN = /^(?:please |pls |plz |can you |could you )?(?:explain|define|describe|teach me(?: about)?|tell me about|help me understand)(?:\s+(?:to me|me))?\s*[:-]?\s+(.+)$/;
const EXPLAIN_BARE = /^(?:please |pls )?(?:explain|define|describe|teach me|tell me about)(?: (?:something|a topic|me))?$/;
const MEANING = /^what does (.+) mean$/;
const WHAT_IS = /^(?:what (?:is|are)|what's|whats|who (?:is|was)|why (?:is|are|do|does)|how (?:do|does|is|are))\s+(.+)$/;
const CHOICE_SINGLE = /^(?:option |answer |my answer is |it'?s |its |i think )?\(?([a-j])\)?[).]?$/;
const CHOICE_MULTI = /^\(?([a-j])\)?(?:\s*(?:,|&|and|\s)\s*\(?([a-j])\)?)+$/;
const NUMBER_CHOICE = /^(?:option )?(10|[1-9])$/;
const FILLERS = /\b(?:please|pls|plz|for me|to me|thanks|thank you)\b/g;

function cleanTopic(raw: string): string {
  return raw
    .replace(FILLERS, " ")
    .replace(/[\s?!.]+$/u, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

/** True when the normalized text asks for the daily question. Exported for tests. */
export function isDailyQuestionRequest(normalized: string): boolean {
  if (DAILY_EXACT.test(normalized)) return true;
  const core = normalized.replace(REQUEST_PREFIX, "");
  if (core !== normalized && QUESTION_CORE.test(core)) return true;
  if (QUESTION_CORE.test(normalized)) return true;
  return normalized.length <= 80 && /\b(?:daily|today'?s|todays|study) (?:study )?question\b/.test(normalized);
}

/** The subject named in a question request ("question biology", "give me a maths question"), if any. */
export function subjectHintOf(normalized: string): string | null {
  const stripped = normalized.replace(REQUEST_PREFIX, "");
  for (const pattern of [SUBJECT_AFTER, SUBJECT_BEFORE]) {
    const hint = pattern.exec(stripped)?.[1]?.trim();
    if (hint && !GENERIC_HINTS.test(hint) && !/\b(?:give|send|show|want|need|have)\b/.test(hint)) return hint;
  }
  return null;
}

function parseChoice(normalized: string, awaiting: AwaitingAnswer): ParsedAnswer | null {
  const limit = Math.max(0, Math.min(awaiting.optionCount, LETTERS.length));
  const valid = (letter: string) => {
    const index = LETTERS.indexOf(letter.toUpperCase());
    return index >= 0 && index < limit;
  };
  const single = CHOICE_SINGLE.exec(normalized);
  if (single?.[1]) return valid(single[1]) ? { kind: "choice", letters: [single[1].toUpperCase()] } : null;
  const number = NUMBER_CHOICE.exec(normalized);
  if (number?.[1]) {
    const index = Number(number[1]) - 1;
    return index < limit ? { kind: "choice", letters: [LETTERS[index] as string] } : null;
  }
  if (awaiting.multiple && CHOICE_MULTI.test(normalized)) {
    const letters = [...new Set((normalized.match(/\b[a-j]\b/g) ?? []).map((l) => l.toUpperCase()))];
    return letters.length > 0 && letters.every(valid) ? { kind: "choice", letters: letters.sort() } : null;
  }
  return null;
}

function parseBoolean(normalized: string): ParsedAnswer | null {
  if (TRUE_WORDS.has(normalized)) return { kind: "boolean", value: true };
  if (FALSE_WORDS.has(normalized)) return { kind: "boolean", value: false };
  return null;
}

/**
 * Parses one inbound message. `replyId` is the id of a tapped button / list row (it wins over the text); `awaiting`
 * describes the pending question, if any.
 */
export function parseCommand(input: { text: string | null; replyId?: string | null }, awaiting: AwaitingAnswer | null = null): WhatsAppCommand {
  const replyId = input.replyId?.trim() ?? "";
  if (replyId) {
    if (replyId === MENU_BUTTON_IDS.question) return { kind: "dailyQuestion", subjectHint: null };
    if (replyId === MENU_BUTTON_IDS.streak) return { kind: "streak" };
    if (replyId === MENU_BUTTON_IDS.help) return { kind: "help" };
    const button = ANSWER_BUTTON.exec(replyId);
    if (button?.[1] && button[2] && button[3]) {
      return { kind: "buttonAnswer", attemptId: button[1].toLowerCase(), position: Number(button[2]), choice: button[3].toUpperCase() };
    }
  }

  const raw = input.text?.trim() ?? "";
  if (raw === "") return { kind: "empty" };
  const normalized = normalizeCommandText(raw);
  if (normalized === "") return raw.includes("?") ? { kind: "help" } : { kind: "empty" };

  if (STOP_WORDS.has(normalized)) return { kind: "stop" };
  if (START_WORDS.has(normalized)) return { kind: "start" };
  if (HELP_WORDS.has(normalized)) return { kind: "help" };
  if (LINK_WORDS.has(normalized)) return { kind: "link" };
  if (STREAK_WORDS.has(normalized)) return { kind: "streak" };
  if (awaiting && SKIP_WORDS.has(normalized)) return { kind: "skip" };

  if (EXPLAIN_BARE.test(normalized)) return { kind: "explain", topic: "" };
  const explain = EXPLAIN.exec(normalized) ?? MEANING.exec(normalized);
  if (explain?.[1]) {
    const topic = cleanTopic(explain[1]);
    if (topic.length >= 2) return { kind: "explain", topic };
  }

  if (isDailyQuestionRequest(normalized)) return { kind: "dailyQuestion", subjectHint: null };
  const subjectHint = subjectHintOf(normalized);
  if (subjectHint) return { kind: "dailyQuestion", subjectHint };

  if (awaiting) {
    if (awaiting.kind === "choice") {
      const choice = parseChoice(normalized, awaiting);
      return choice ? { kind: "answer", answer: choice } : { kind: "unparsedAnswer" };
    }
    if (awaiting.kind === "boolean") {
      const value = parseBoolean(normalized);
      return value ? { kind: "answer", answer: value } : { kind: "unparsedAnswer" };
    }
    return { kind: "answer", answer: { kind: "text", text: raw.slice(0, 500) } };
  }

  if (SKIP_WORDS.has(normalized)) return { kind: "strayAnswer" };
  if (CHOICE_SINGLE.test(normalized) || NUMBER_CHOICE.test(normalized) || parseBoolean(normalized)) return { kind: "strayAnswer" };

  const whatIs = WHAT_IS.exec(normalized);
  if (whatIs?.[1]) {
    const topic = normalized.startsWith("what") ? cleanTopic(whatIs[1]) : cleanTopic(normalized);
    if (topic.length >= 2) return { kind: "explain", topic };
  }
  return { kind: "unknown", text: raw.slice(0, 500) };
}

/**
 * Short, non-personal commands an UNLINKED number may send (help / stop / start / link / question / streak). Only
 * these texts are stored for unlinked numbers (data minimisation, ARCHITECTURE §5.12): anything else is processed
 * without its body.
 */
export function isStorableCommandForUnlinked(text: string | null): boolean {
  if (!text || text.length > 40) return false;
  const command = parseCommand({ text });
  return ["help", "stop", "start", "link", "dailyQuestion", "streak"].includes(command.kind);
}

/** "A".."J" for a 0-based option index. */
export function letterFor(index: number): string {
  return LETTERS[index] ?? String(index + 1);
}

/** 0-based option index of a letter, or -1. */
export function indexOfLetter(letter: string): number {
  return LETTERS.indexOf(letter.toUpperCase());
}
