/**
 * Wire protocol of the AI tutor (§14, §15; ARCHITECTURE §6.3 step 9 "streaming for tutor and solver").
 *
 * Type-only contracts plus the literal lists that define them: no Prisma, no server-only imports, so the chat UI may
 * `import type` from here. The streaming route (`POST /api/v1/tutor/conversations/[conversationId]/messages`) sends
 * one {@link TutorStreamEvent} per Server-Sent Event (`data: <json>\n\n`):
 *
 *   start   once, before any text: the pedagogical mode chosen for this turn (TEACH / HINT / ANSWER ...)
 *   delta   plain-text chunks of the answer, in order (render as plain text while streaming)
 *   restart a refusal fallback model took over: discard the text received so far
 *   done    the persisted assistant message, with `html` = the FINAL text rendered server-side (KaTeX, sanitised):
 *           clients swap the streamed plain text for it
 *   error   a friendly, typed failure (quota, not configured, exam in progress ...); nothing more follows
 */

/** What the student asked for with the mode chips (§15 "Teach me" vs "Give me the answer"). */
export const TUTOR_REQUEST_MODES = ["TEACH", "HINT", "CHECK_WORK", "ANSWER"] as const;
export type TutorRequestMode = (typeof TUTOR_REQUEST_MODES)[number];

/** Mirrors `TutorTurnMode` in `src/lib/ai/types.ts` (the policy's decision for one turn). */
export type TutorTurnModeWire = "TEACH" | "HINT" | "ANSWER" | "CHECK_WORK" | "REDIRECT" | "SAFEGUARD" | "EXAM_LOCKED" | "NO_HELP";

/** Outcome of an assistant message (Prisma `AiMessageStatus` minus ERROR). */
export type TutorMessageStatus = "COMPLETE" | "TRUNCATED" | "REFUSED" | "ABORTED";

/** Daily message allowance (`aiMessagesPerDay`); `null` in events/views means unlimited. */
export interface TutorQuota {
  limit: number;
  remaining: number;
}

/** Help contacts shown with a safeguarding reply (Setting `safety.helplines`; never hard-coded). */
export interface TutorHelpline {
  name: string;
  phone?: string | undefined;
  url?: string | undefined;
  description?: string | undefined;
}

/** Typed failures the chat UI knows how to present. */
export const TUTOR_ERROR_CODES = [
  /** No ANTHROPIC_API_KEY on this server: calm "not configured yet" state, never fabricated output. */
  "AI_NOT_CONFIGURED",
  /** Kill switch, daily budget pause or a provider outage. */
  "AI_UNAVAILABLE",
  /** Today's `aiMessagesPerDay` allowance is used up: upgrade prompt. */
  "QUOTA_EXCEEDED",
  /** Per-minute limit (`rateLimits.aiMessage`). */
  "RATE_LIMITED",
  /** The plan does not include the AI tutor: upgrade prompt. */
  "ENTITLEMENT_REQUIRED",
  /** `ai.limits.maxTurnsPerConversation` reached: start a new conversation. */
  "TURN_LIMIT",
  /** A timed exam / mock exam is in progress: help is paused until it is submitted (exam integrity). */
  "EXAM_IN_PROGRESS",
  /** The conversation is archived or locked. */
  "CONVERSATION_CLOSED",
  "VALIDATION",
  "NOT_FOUND",
  "FORBIDDEN",
  "BAD_REQUEST",
  "INTERNAL",
] as const;
export type TutorErrorCode = (typeof TUTOR_ERROR_CODES)[number];

export interface TutorStartEvent {
  type: "start";
  turnMode: TutorTurnModeWire;
  /** Hint-ladder level of this reply (0..4), null for non-ladder modes. */
  hintLevel: number | null;
}

export interface TutorDeltaEvent {
  type: "delta";
  text: string;
}

export interface TutorRestartEvent {
  type: "restart";
}

export interface TutorDoneEvent {
  type: "done";
  /** Persisted assistant AiMessage id (rating, copy). */
  messageId: string;
  userMessageId: string;
  /** Sanitised, KaTeX-rendered HTML of the final answer (empty for a refusal). */
  html: string;
  status: TutorMessageStatus;
  turnMode: TutorTurnModeWire;
  hintLevel: number | null;
  /** Allowance left after this message; null = unlimited. */
  quota: TutorQuota | null;
  /** Student turns left in this conversation. */
  turnsRemaining: number;
  /** Conversation title (set from the topic, or from the first message). */
  title: string | null;
  /** Help contacts to show next to a safeguarding reply; null otherwise. */
  helplines: TutorHelpline[] | null;
  /** A retry with the same clientMessageId: the stored reply was replayed, nothing was charged. */
  replayed: boolean;
}

export interface TutorErrorEvent {
  type: "error";
  code: TutorErrorCode;
  /** Safe to show to the student. */
  message: string;
  /** Upgrade path for ENTITLEMENT_REQUIRED / QUOTA_EXCEEDED. */
  upgradeHref?: string | undefined;
  retryAfterSeconds?: number | undefined;
}

export type TutorStreamEvent = TutorStartEvent | TutorDeltaEvent | TutorRestartEvent | TutorDoneEvent | TutorErrorEvent;

/** A chat message as the conversation page shows it. */
export interface TutorMessageView {
  id: string;
  role: "USER" | "ASSISTANT";
  /** Student text (USER) or the raw Markdown answer (ASSISTANT, used for "Copy"). */
  content: string;
  /** Rendered HTML (ASSISTANT only; sanitised by the content pipeline). */
  html: string | null;
  status: TutorMessageStatus | "ERROR";
  hintLevel: number | null;
  intent: string | null;
  /** 1 helpful, -1 not helpful, null unrated. */
  rating: number | null;
  createdAt: string;
}
