"use client";

import { MessageCircleQuestion } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { SanitizedHtml } from "@/lib/content/types";
import type { ActionResult } from "@/server/lib/errors";
import type { TutorMessageView, TutorQuota, TutorRequestMode } from "@/server/tutor/protocol";
import { ChatComposer } from "./ChatComposer";
import { ChatMessage, type ChatItem } from "./ChatMessage";
import { AI_DISCLAIMER, NETWORK_ERROR_COPY } from "./labels";
import { ModeChips } from "./ModeChips";
import { newClientMessageId, streamTutorMessage, type ClientErrorEvent, type ClientStreamEvent } from "./stream-client";
import { QuotaIndicator, TutorAvailabilityNotice, type TutorAvailability } from "./TutorNotices";

export type RateMessageAction = (input: { messageId: string; rating: 1 | -1 | null }) => Promise<ActionResult<null>>;

export interface TutorChatProps {
  conversationId: string;
  initialMessages: readonly TutorMessageView[];
  quota: TutorQuota | null;
  availability: TutorAvailability;
  /** The conversation is archived / locked or has no turns left. */
  locked: boolean;
  turnsRemaining: number;
  maxInputChars: number;
  /** Generic starters for an empty conversation (see `startersFor`). */
  starters: readonly string[];
  upgradeHref: string;
  newConversationHref: string;
  rateAction: RateMessageAction;
  /** Streaming endpoint; defaults to the REST route for this conversation. */
  endpoint?: string;
  fetchImpl?: typeof fetch;
}

interface ChatError {
  code: string;
  message: string;
  upgradeHref?: string | undefined;
}

/** HTML in TutorMessageView / done events is produced by the server's content pipeline (renderContent) only. */
function asSanitized(html: string | null): SanitizedHtml | null {
  return html ? (html as SanitizedHtml) : null;
}

function fromView(message: TutorMessageView): ChatItem {
  return {
    key: message.id,
    id: message.id,
    role: message.role,
    text: message.content,
    html: asSanitized(message.html),
    status: message.status,
    turnMode: null,
    hintLevel: message.hintLevel,
    rating: message.rating,
    helplines: null,
  };
}

const LOCKING_CODES: ReadonlySet<string> = new Set(["TURN_LIMIT", "CONVERSATION_CLOSED"]);

/**
 * The AI tutor chat (§14, §15). Mobile-first: the thread scrolls with the page and the composer sticks above the tab
 * bar and the safe area. Streams answers over `fetch` + SSE, shows them as plain text while they arrive, then swaps in
 * the server-rendered HTML (typeset math). One polite live region announces completion and errors, never tokens.
 */
export function TutorChat(props: TutorChatProps) {
  const { conversationId, maxInputChars, starters, upgradeHref, newConversationHref, rateAction } = props;
  const endpoint = props.endpoint ?? `/api/v1/tutor/conversations/${conversationId}/messages`;
  const [items, setItems] = useState<ChatItem[]>(() => props.initialMessages.map(fromView));
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState<TutorRequestMode>("TEACH");
  const [busy, setBusy] = useState(false);
  const [quota, setQuota] = useState<TutorQuota | null>(props.quota);
  const [availability, setAvailability] = useState<TutorAvailability>(props.availability);
  const [locked, setLocked] = useState(props.locked || props.turnsRemaining <= 0);
  const [error, setError] = useState<ChatError | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [rateError, setRateError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const exhausted = quota !== null && quota.remaining <= 0;
  const blocked = availability !== "ready" || locked || exhausted;

  const patch = useCallback((key: string, change: Partial<ChatItem> | ((item: ChatItem) => Partial<ChatItem>)) => {
    setItems((current) => current.map((item) => (item.key === key ? { ...item, ...(typeof change === "function" ? change(item) : change) } : item)));
  }, []);

  useEffect(() => {
    // Keep the newest text in view while it streams (instant scroll: no motion).
    endRef.current?.scrollIntoView?.({ block: "end" });
  }, [items]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function fail(event: ClientErrorEvent | ChatError, userKey: string, botKey: string, text: string): void {
    // Nothing was stored: take the optimistic bubbles back and give the student their text again.
    setItems((current) => current.filter((item) => item.key !== userKey && item.key !== botKey));
    setDraft((current) => (current.trim().length === 0 ? text : current));
    setError({ code: event.code, message: event.message, upgradeHref: event.upgradeHref });
    setAnnouncement(event.message);
    if (event.code === "AI_NOT_CONFIGURED") setAvailability("not_configured");
    else if (event.code === "ENTITLEMENT_REQUIRED") setAvailability("not_entitled");
    else if (event.code === "QUOTA_EXCEEDED") setQuota((current) => (current ? { ...current, remaining: 0 } : current));
    else if (LOCKING_CODES.has(event.code)) setLocked(true);
  }

  async function send(rawText: string, chosenMode: TutorRequestMode): Promise<void> {
    const text = rawText.trim();
    if (busy || blocked || text.length === 0 || text.length > maxInputChars) return;
    const clientMessageId = newClientMessageId();
    const userKey = `u-${clientMessageId}`;
    const botKey = `a-${clientMessageId}`;
    const base = { id: null, html: null, turnMode: null, hintLevel: null, rating: null, helplines: null };
    setItems((current) => [
      ...current,
      { ...base, key: userKey, role: "USER", text, status: "SENT" },
      { ...base, key: botKey, role: "ASSISTANT", text: "", status: "STREAMING" },
    ]);
    setDraft("");
    setMode("TEACH");
    setError(null);
    setAnnouncement("");
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;

    const onEvent = (event: ClientStreamEvent): void => {
      switch (event.type) {
        case "start":
          patch(botKey, { turnMode: event.turnMode, hintLevel: event.hintLevel });
          break;
        case "delta":
          patch(botKey, (item) => ({ text: item.text + event.text }));
          break;
        case "restart":
          patch(botKey, { text: "" });
          break;
        case "done":
          patch(userKey, { id: event.userMessageId, status: "COMPLETE" });
          patch(botKey, {
            id: event.messageId,
            html: asSanitized(event.html),
            status: event.status,
            turnMode: event.turnMode,
            hintLevel: event.hintLevel,
            helplines: event.helplines,
          });
          setQuota(event.quota);
          if (event.turnsRemaining <= 0) setLocked(true);
          setAnnouncement(event.status === "REFUSED" ? "The tutor couldn't help with that message." : "The tutor's answer is ready.");
          break;
        case "error":
          fail(event, userKey, botKey, text);
          break;
      }
    };

    try {
      const outcome = await streamTutorMessage({ url: endpoint, body: { text, mode: chosenMode, clientMessageId }, signal: controller.signal, onEvent, fetchImpl: props.fetchImpl });
      if (outcome === "incomplete") fail({ code: "NETWORK", message: NETWORK_ERROR_COPY }, userKey, botKey, text);
    } catch {
      if (controller.signal.aborted) {
        // Stopped by the student: keep what arrived (the server stores it as a stopped answer too).
        patch(botKey, { status: "ABORTED" });
        setAnnouncement("Stopped.");
      } else {
        fail({ code: "NETWORK", message: NETWORK_ERROR_COPY }, userKey, botKey, text);
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setBusy(false);
    }
  }

  async function rate(messageId: string, rating: 1 | -1 | null): Promise<void> {
    const previous = items.find((item) => item.id === messageId)?.rating ?? null;
    setRateError(null);
    setItems((current) => current.map((item) => (item.id === messageId ? { ...item, rating } : item)));
    const result = await rateAction({ messageId, rating }).catch(() => null);
    if (!result?.ok) {
      setItems((current) => current.map((item) => (item.id === messageId ? { ...item, rating: previous } : item)));
      setRateError(result && !result.ok ? result.error.message : "We couldn't save your feedback. Please try again.");
    } else if (rating !== null) {
      setAnnouncement("Thanks for the feedback.");
    }
  }

  const lastAssistant = [...items].reverse().find((item) => item.role === "ASSISTANT");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted">{AI_DISCLAIMER}</p>
        {quota && quota.remaining > 0 && <QuotaIndicator quota={quota} upgradeHref={upgradeHref} />}
      </div>

      <TutorAvailabilityNotice availability={availability} upgradeHref={upgradeHref} />
      {availability === "ready" && exhausted && <QuotaIndicator quota={quota} upgradeHref={upgradeHref} />}

      {items.length === 0 && !blocked && starters.length > 0 && (
        <section aria-labelledby="tutor-starters" className="rounded-card border border-dashed border-border bg-surface p-4">
          <h2 id="tutor-starters" className="flex items-center gap-2 text-sm font-semibold text-text">
            <MessageCircleQuestion aria-hidden="true" className="size-4.5 text-primary" />
            Not sure where to start?
          </h2>
          <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {starters.map((starter) => (
              <li key={starter}>
                <button
                  type="button"
                  onClick={() => void send(starter, "TEACH")}
                  disabled={busy}
                  className="min-h-11 w-full rounded-full border border-border bg-bg px-4 text-left text-sm text-text transition-colors hover:border-primary sm:w-auto"
                >
                  {starter}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ol aria-label="Conversation" className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.key}>
            <ChatMessage
              item={item}
              onRate={(messageId, rating) => void rate(messageId, rating)}
              onCopied={() => setAnnouncement("Copied to the clipboard.")}
              onContinue={item === lastAssistant && item.status === "TRUNCATED" ? () => void send("Please continue from where you stopped.", "TEACH") : undefined}
              continueDisabled={busy || blocked}
            />
          </li>
        ))}
      </ol>
      <div ref={endRef} />

      <p aria-live="polite" role="status" className="sr-only">
        {announcement}
      </p>
      {rateError && (
        <p role="alert" className="text-sm text-danger-text">
          {rateError}
        </p>
      )}

      {error && (
        <Alert
          tone={error.code === "QUOTA_EXCEEDED" || error.code === "ENTITLEMENT_REQUIRED" ? "accent" : error.code === "EXAM_IN_PROGRESS" ? "info" : "warning"}
          role="alert"
          title={error.message}
          action={
            error.upgradeHref ? (
              <ButtonLink href={error.upgradeHref} variant="accent">
                See plans
              </ButtonLink>
            ) : LOCKING_CODES.has(error.code) ? (
              <ButtonLink href={newConversationHref} variant="outline">
                New conversation
              </ButtonLink>
            ) : undefined
          }
        />
      )}

      {locked && !error && (
        <Alert
          tone="neutral"
          title="This conversation is closed"
          action={
            <ButtonLink href={newConversationHref} variant="outline">
              New conversation
            </ButtonLink>
          }
        >
          Start a new conversation to keep going.
        </Alert>
      )}

      <div
        className={cn(
          "sticky bottom-[calc(3.5rem+1px+env(safe-area-inset-bottom))] z-10 -mx-4 space-y-3 border-t border-border bg-bg px-4 pt-3 pb-3",
          "sm:-mx-6 sm:px-6 lg:bottom-0 lg:mx-0 lg:rounded-t-card lg:border-x lg:px-4",
        )}
      >
        <ModeChips value={mode} onChange={setMode} disabled={blocked} />
        <ChatComposer
          value={draft}
          onChange={setDraft}
          onSend={() => void send(draft, mode)}
          onStop={() => abortRef.current?.abort()}
          busy={busy}
          disabled={blocked}
          maxLength={maxInputChars}
          placeholder={mode === "CHECK_WORK" ? "Paste your working here…" : "Ask the tutor…"}
        />
      </div>
    </div>
  );
}
