"use client";

import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { CircleCheck, CloudOff, EyeOff, LoaderCircle, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useReducer, useRef, useState } from "react";
import { RichContent } from "@/components/content/RichContent";
import { ReportProblemButton, type ReportProblemAction } from "@/components/questions/ReportProblem";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { buttonStyles } from "@/components/ui/button-styles";
import { Kbd } from "@/components/ui/Kbd";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import type { ActionResult } from "@/server/lib/errors";
import { cardsLeftLabel, sessionTimeText, spokenInterval } from "./copy";
import {
  CARD_TYPE_LABELS,
  FLASHCARD_RATINGS,
  RATING_KEYS,
  RATING_LABELS,
  type FlashcardRating,
  type ReviewCardView,
  type ReviewInput,
  type ReviewOutcome,
} from "./types";

export type ReviewAction = (input: ReviewInput) => Promise<ActionResult<ReviewOutcome>>;
export type SuspendAction = (input: { flashcardId: string; suspended: boolean; subjectId?: string }) => Promise<ActionResult<{ flashcardId: string; suspended: boolean }>>;

export interface ReviewSessionProps {
  /** The queue from the server, in order (due first, then new). */
  cards: readonly ReviewCardView[];
  /** Saves one rating (a Server Action; idempotent per `clientReviewId`). */
  reviewAction: ReviewAction;
  /** "Hide this card" (a Server Action). Omit to hide the control. */
  suspendAction?: SuspendAction;
  /** "Report a problem" for platform cards (a Server Action). Omit to hide. */
  reportAction?: ReportProblemAction;
  /** Where "Back to flashcards" goes. */
  backHref: string;
  /** Plans page for entitlement messages. */
  upgradeHref: string;
}

// ---------------------------------------------------------------------------------------------------------------------
// Session state (pure reducer; exported for tests)
// ---------------------------------------------------------------------------------------------------------------------

interface SessionCard extends ReviewCardView {
  /** Unique per appearance (a learning card can come back in the same session). */
  key: string;
}

interface PendingReview {
  input: ReviewInput;
  card: SessionCard;
}

export interface SessionState {
  queue: SessionCard[];
  revealed: boolean;
  /** When the current card was shown (ms). */
  shownAt: number;
  reviewed: number;
  tally: Record<FlashcardRating, number>;
  timeMs: number;
  xp: number;
  /** Ratings not yet confirmed by the server, in press order (the in-memory outbox). */
  outbox: PendingReview[];
  sending: boolean;
  /** The last send failed in a way worth retrying (no connection, server hiccup): waiting to retry. */
  offline: boolean;
  /** Consecutive failed sends (backoff). */
  failures: number;
  /** Message for the polite live region (leech hint, a dropped answer). */
  notice: string | null;
  /** The server refused for good (plan no longer includes flashcards): the session stops. */
  blocked: string | null;
  appearances: number;
}

type SessionAction =
  | { type: "reveal" }
  | { type: "rate"; input: ReviewInput; now: number }
  | { type: "sendStart" }
  | { type: "sendOk"; outcome: ReviewOutcome; now: number }
  | { type: "sendRetry" }
  | { type: "sendDrop"; message: string; blocked: boolean }
  | { type: "retryNow" }
  | { type: "remove"; key: string; now: number; notice: string }
  | { type: "notice"; message: string | null };

const EMPTY_TALLY: Record<FlashcardRating, number> = { AGAIN: 0, HARD: 0, GOOD: 0, EASY: 0 };
/** Learning cards come back after this many other cards (or at the end of a shorter queue). */
const COME_BACK_AFTER = 3;
const MAX_DURATION_MS = 3_600_000;

export function initialSessionState(cards: readonly ReviewCardView[], now: number): SessionState {
  return {
    queue: cards.map((card, index) => ({ ...card, key: `${card.flashcardId}:${index}` })),
    revealed: false,
    shownAt: now,
    reviewed: 0,
    tally: { ...EMPTY_TALLY },
    timeMs: 0,
    xp: 0,
    outbox: [],
    sending: false,
    offline: false,
    failures: 0,
    notice: null,
    blocked: null,
    appearances: cards.length,
  };
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "reveal":
      return state.queue.length > 0 && !state.revealed ? { ...state, revealed: true } : state;
    case "rate": {
      const [current, ...rest] = state.queue;
      if (!current || !state.revealed) return state;
      return {
        ...state,
        queue: rest,
        revealed: false,
        shownAt: action.now,
        reviewed: state.reviewed + 1,
        tally: { ...state.tally, [action.input.rating]: state.tally[action.input.rating] + 1 },
        timeMs: state.timeMs + action.input.durationMs,
        outbox: [...state.outbox, { input: action.input, card: current }],
        notice: null,
      };
    }
    case "sendStart":
      return { ...state, sending: true };
    case "sendOk": {
      const [done, ...outbox] = state.outbox;
      if (!done) return { ...state, sending: false };
      const next: SessionState = { ...state, outbox, sending: false, offline: false, failures: 0, xp: state.xp + Math.max(0, action.outcome.xpAwarded) };
      if (action.outcome.isLeech && done.input.rating === "AGAIN") {
        next.notice = "You keep forgetting this card. Try the lesson for its topic, or rewrite it in your own words as a new card.";
      }
      if (action.outcome.nextIntervals && !action.outcome.replayed && !state.blocked) {
        const again: SessionCard = {
          ...done.card,
          key: `${done.card.flashcardId}:${state.appearances}`,
          isNew: false,
          phase: action.outcome.phase,
          intervals: action.outcome.nextIntervals,
        };
        const queue = [...next.queue];
        const at = queue.length === 0 ? 0 : Math.min(queue.length, COME_BACK_AFTER + 1);
        queue.splice(at, 0, again);
        next.queue = queue;
        next.appearances = state.appearances + 1;
        if (state.queue.length === 0) {
          next.revealed = false;
          next.shownAt = action.now;
        }
      }
      return next;
    }
    case "sendRetry":
      return { ...state, sending: false, offline: true, failures: state.failures + 1 };
    case "sendDrop": {
      const [, ...outbox] = state.outbox;
      return {
        ...state,
        outbox: action.blocked ? [] : outbox,
        sending: false,
        notice: action.blocked ? null : `One answer couldn't be saved: ${action.message}`,
        blocked: action.blocked ? action.message : state.blocked,
      };
    }
    case "retryNow":
      return state.offline ? { ...state, offline: false } : state;
    case "remove": {
      const index = state.queue.findIndex((c) => c.key === action.key);
      if (index < 0) return state;
      const queue = state.queue.filter((c) => c.key !== action.key);
      return { ...state, queue, revealed: index === 0 ? false : state.revealed, shownAt: index === 0 ? action.now : state.shownAt, notice: action.notice };
    }
    case "notice":
      return { ...state, notice: action.message };
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------

/** Error codes worth retrying (connection drops surface as a rejected action call and are retried too). */
const RETRYABLE_CODES = new Set(["INTERNAL", "RATE_LIMITED", "UNAUTHENTICATED"]);

function newSessionId(): string {
  const cryptoApi = typeof globalThis.crypto !== "undefined" ? globalThis.crypto : undefined;
  if (cryptoApi && typeof cryptoApi.randomUUID === "function") return cryptoApi.randomUUID();
  return `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

/** Keys typed into a form control (or with a modifier) never drive the session. */
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function isActivatable(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && ["BUTTON", "A", "SUMMARY"].includes(target.tagName);
}

function retryDelayMs(failures: number): number {
  return Math.min(30_000, 2_000 * 2 ** Math.max(0, failures - 1));
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A flashcard review session (§18): the card front → "Show answer" (Space / Enter) → the back and four rating buttons
 * (Again / Hard / Good / Easy, keys 1-4, each labelled with when the card would come back) → the next card, until the
 * session summary.
 *
 * Offline-tolerant (ARCHITECTURE §3.13): a rating advances to the next card at once and is queued in an in-memory
 * outbox that is sent in press order with a client review id; failed sends are retried with backoff and when the
 * browser comes back online (the server applies each id once), so a dropped connection never loses the student's
 * place or an answer while the page stays open (leaving with unsaved answers asks for confirmation). Learning cards
 * due within minutes come back later in the same session with fresh interval labels from the server.
 */
export function ReviewSession({ cards, reviewAction, suspendAction, reportAction, backHref, upgradeHref }: ReviewSessionProps) {
  const router = useRouter();
  const headingId = useId();
  const [sessionId] = useState(newSessionId);
  const counter = useRef(0);
  const [state, dispatch] = useReducer(sessionReducer, cards, (initial) => initialSessionState(initial, Date.now()));
  const [suspending, setSuspending] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);

  const current = state.queue[0] ?? null;
  const pending = state.outbox.length;
  const finished = current === null;
  const total = state.reviewed + state.queue.length;

  const reveal = useCallback(() => {
    interacted.current = true;
    dispatch({ type: "reveal" });
  }, []);

  const rate = useCallback(
    (rating: FlashcardRating) => {
      if (!current || !state.revealed || state.blocked) return;
      interacted.current = true;
      counter.current += 1;
      const now = Date.now();
      const input: ReviewInput = {
        flashcardId: current.flashcardId,
        rating,
        durationMs: Math.min(MAX_DURATION_MS, Math.max(0, now - state.shownAt)),
        clientReviewId: `${sessionId}:${counter.current}`,
        reviewedAt: new Date(now).toISOString(),
        subjectId: current.subjectId,
      };
      dispatch({ type: "rate", input, now });
    },
    [current, sessionId, state.blocked, state.revealed, state.shownAt],
  );

  // Outbox: send the oldest pending rating whenever nothing is in flight and we are not waiting to retry.
  const head = state.outbox[0];
  useEffect(() => {
    if (!head || state.sending || state.offline || state.blocked) return;
    dispatch({ type: "sendStart" });
    reviewAction(head.input).then(
      (result) => {
        if (result.ok) dispatch({ type: "sendOk", outcome: result.data, now: Date.now() });
        else if (RETRYABLE_CODES.has(result.error.code)) dispatch({ type: "sendRetry" });
        else dispatch({ type: "sendDrop", message: result.error.message, blocked: result.error.code === "ENTITLEMENT_REQUIRED" });
      },
      () => dispatch({ type: "sendRetry" }),
    );
  }, [head, state.sending, state.offline, state.blocked, reviewAction]);

  // Retry with backoff, and at once when the browser reports the connection is back.
  useEffect(() => {
    if (!state.offline) return;
    const timer = window.setTimeout(() => dispatch({ type: "retryNow" }), retryDelayMs(state.failures));
    const online = () => dispatch({ type: "retryNow" });
    window.addEventListener("online", online);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("online", online);
    };
  }, [state.offline, state.failures]);

  // Leaving with unsaved answers asks first (the outbox lives only in this page).
  useEffect(() => {
    if (pending === 0) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [pending]);

  // Keyboard: Space / Enter shows the answer; 1-4 rate it.
  const keys = useRef({ reveal, rate, revealed: state.revealed, active: !finished && !state.blocked });
  useEffect(() => {
    keys.current = { reveal, rate, revealed: state.revealed, active: !finished && !state.blocked };
  });
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const { reveal: show, rate: answer, revealed, active } = keys.current;
      if (!active || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return;
      if (!revealed && (event.key === " " || event.key === "Enter")) {
        if (isActivatable(event.target)) return; // the focused button handles its own activation
        event.preventDefault();
        show();
        return;
      }
      const rating = RATING_KEYS[event.key];
      if (revealed && rating) {
        event.preventDefault();
        answer(rating);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus: the answer after "Show answer", the next card after a rating, the summary at the end (after interaction).
  const currentKey = current?.key ?? null;
  useEffect(() => {
    if (!interacted.current) return;
    if (state.revealed) answerRef.current?.focus({ preventScroll: false });
  }, [state.revealed]);
  useEffect(() => {
    if (!interacted.current) return;
    if (currentKey) frontRef.current?.focus({ preventScroll: false });
  }, [currentKey]);
  const showSummary = finished && (pending === 0 || state.offline || state.blocked !== null);
  useEffect(() => {
    if (interacted.current && showSummary) summaryRef.current?.focus();
  }, [showSummary]);

  const suspendCurrent = async () => {
    if (!current || !suspendAction) return;
    setSuspending(true);
    try {
      const result = await suspendAction({ flashcardId: current.flashcardId, suspended: true, subjectId: current.subjectId });
      if (result.ok) {
        interacted.current = true;
        dispatch({ type: "remove", key: current.key, now: Date.now(), notice: "Card hidden. You can restore it from Your cards." });
      } else {
        dispatch({ type: "notice", message: result.error.message });
      }
    } catch {
      dispatch({ type: "notice", message: "We couldn't hide the card. Check your connection and try again." });
    } finally {
      setSuspending(false);
    }
  };

  const syncLine =
    pending > 0 ? (
      state.offline ? (
        <span className="inline-flex items-center gap-1.5 text-warning-text">
          <CloudOff aria-hidden="true" className="size-4" />
          {pending === 1 ? "1 answer" : `${pending} answers`} waiting to be saved
          <button type="button" className="font-semibold underline underline-offset-4" onClick={() => dispatch({ type: "retryNow" })}>
            Try again
          </button>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-muted">
          <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
          Saving…
        </span>
      )
    ) : state.reviewed > 0 ? (
      <span className="inline-flex items-center gap-1.5 text-muted">
        <CircleCheck aria-hidden="true" className="size-4" />
        All answers saved
      </span>
    ) : null;

  const liveMessage = state.notice ?? (state.offline && pending > 0 ? "You seem to be offline. Your answers are kept and will be saved when you're back online." : "");

  if (state.blocked) {
    return (
      <div className="space-y-4">
        <Alert tone="info" title="Flashcards come with full access" action={<UpgradeButton fallbackHref={upgradeHref} />}>
          {state.blocked}
        </Alert>
        <ButtonLink href={backHref} variant="outline">
          Back to flashcards
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
          <span className="font-semibold text-text">{finished ? "Session finished" : cardsLeftLabel(state.queue.length)}</span>
          <span>{syncLine}</span>
        </div>
        <ProgressBar
          value={state.reviewed}
          max={Math.max(1, total)}
          label="Cards reviewed in this session"
          labelHidden
          showValue={false}
          valueText={`${state.reviewed} of ${total} cards`}
          size="sm"
        />
      </div>
      <p aria-live="polite" role="status" className="text-sm text-muted">
        {liveMessage}
      </p>

      {current ? (
        <>
          <section aria-labelledby={headingId} className="overflow-hidden rounded-card border border-border bg-surface shadow-xs">
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3 text-sm text-muted">
              <h2 id={headingId} className="font-medium text-text">
                {current.subjectName}
                {current.topicName ? <span className="font-normal text-muted"> · {current.topicName}</span> : null}
              </h2>
              <Badge size="sm">{CARD_TYPE_LABELS[current.cardType]}</Badge>
              {current.isNew && (
                <Badge size="sm" tone="accent">
                  New
                </Badge>
              )}
              {current.isPersonal && (
                <Badge size="sm" tone="primary">
                  Your card
                </Badge>
              )}
            </div>
            {/* role="group": a name on a role-less div is ignored by screen readers (aria-label is prohibited there). */}
            <div
              ref={frontRef}
              tabIndex={-1}
              role="group"
              aria-label="Card front"
              className="min-h-36 px-4 py-6 text-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus sm:px-6 sm:py-8"
              onClick={state.revealed ? undefined : reveal}
            >
              <RichContent key={current.key} html={current.frontHtml} lang={current.languageCode} />
            </div>
            {state.revealed && (
              <div
                ref={answerRef}
                tabIndex={-1}
                role="group"
                aria-label="Answer"
                className="border-t border-dashed border-border-strong/50 bg-subtle/40 px-4 py-6 outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus sm:px-6"
              >
                <RichContent html={current.backHtml} lang={current.languageCode} />
                {current.notesHtml && (
                  <div className="mt-4 rounded-control border border-border bg-surface p-3 text-sm">
                    <RichContent html={current.notesHtml} lang={current.languageCode} />
                  </div>
                )}
              </div>
            )}
          </section>

          {!state.revealed ? (
            <div className="space-y-2">
              <Button size="lg" fullWidth onClick={reveal} className="min-h-14">
                Show answer
              </Button>
              <p className="hidden text-center text-sm text-muted sm:block">
                Press <Kbd>Space</Kbd> or <Kbd>Enter</Kbd>
              </p>
            </div>
          ) : (
            <div role="group" aria-labelledby={`${headingId}-rate`} className="space-y-2">
              <p id={`${headingId}-rate`} className="text-sm font-medium text-text">
                How well did you remember it?
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {FLASHCARD_RATINGS.map((rating, index) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => rate(rating)}
                    aria-keyshortcuts={String(index + 1)}
                    className={cn(
                      buttonStyles({ variant: rating === "GOOD" ? "primary" : "outline", size: "lg" }),
                      "min-h-16 flex-col gap-0.5 py-2",
                    )}
                  >
                    <span>{RATING_LABELS[rating]}</span>
                    <span className="text-xs font-normal opacity-85" aria-hidden="true">
                      {current.intervals[rating]}
                    </span>
                    <span className="sr-only">, next review in {spokenInterval(current.intervals[rating])}</span>
                    <Kbd className="mt-0.5 hidden sm:inline-flex" aria-hidden="true">
                      {index + 1}
                    </Kbd>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-start gap-x-4 gap-y-2 pt-1">
                {suspendAction && (
                  <Button variant="ghost" size="sm" iconStart={<EyeOff aria-hidden="true" />} onClick={suspendCurrent} loading={suspending} loadingText="Hiding…">
                    Hide this card
                  </Button>
                )}
                {reportAction && !current.isPersonal && (
                  <ReportProblemButton key={current.key} action={reportAction} entityType="FLASHCARD" entityId={current.flashcardId} itemLabel="this card" />
                )}
              </div>
            </div>
          )}
        </>
      ) : showSummary ? (
        <section aria-labelledby={`${headingId}-summary`} className="space-y-5 rounded-card border border-border bg-surface p-5 shadow-xs sm:p-6">
          <h2 id={`${headingId}-summary`} ref={summaryRef} tabIndex={-1} className="text-xl font-semibold text-text outline-none">
            {state.reviewed > 0 ? "Session complete" : "Nothing left to review"}
          </h2>
          {state.reviewed > 0 && (
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-control bg-subtle p-3">
                <dt className="text-sm text-muted">Cards reviewed</dt>
                <dd className="text-2xl font-semibold text-text">{state.reviewed}</dd>
              </div>
              <div className="rounded-control bg-subtle p-3">
                <dt className="text-sm text-muted">Time</dt>
                <dd className="text-2xl font-semibold text-text">{sessionTimeText(state.timeMs)}</dd>
              </div>
              <div className="rounded-control bg-subtle p-3">
                <dt className="text-sm text-muted">XP earned</dt>
                <dd className="text-2xl font-semibold text-text">{state.xp}</dd>
              </div>
            </dl>
          )}
          {state.reviewed > 0 && (
            <ul className="flex flex-wrap gap-2 text-sm" aria-label="Your answers">
              {FLASHCARD_RATINGS.map((rating) => (
                <li key={rating} className="rounded-full border border-border px-3 py-1">
                  {RATING_LABELS[rating]}: <span className="font-semibold">{state.tally[rating]}</span>
                </li>
              ))}
            </ul>
          )}
          {pending > 0 ? (
            <Alert
              tone="warning"
              title={`${pending === 1 ? "1 answer is" : `${pending} answers are`} waiting to be saved`}
              action={
                <Button variant="outline" size="sm" iconStart={<RotateCw aria-hidden="true" />} onClick={() => dispatch({ type: "retryNow" })}>
                  Try again now
                </Button>
              }
            >
              Keep this page open. We&rsquo;ll save them as soon as you&rsquo;re back online.
            </Alert>
          ) : state.reviewed > 0 ? (
            <p className="text-sm text-muted">Every answer is saved. Each card comes back just before you&rsquo;re likely to forget it.</p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={backHref}>Back to flashcards</ButtonLink>
            <Button variant="outline" iconStart={<RotateCw aria-hidden="true" />} onClick={() => router.refresh()} disabled={pending > 0}>
              Check for more cards
            </Button>
          </div>
        </section>
      ) : (
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
          Saving your answers…
        </p>
      )}
    </div>
  );
}
