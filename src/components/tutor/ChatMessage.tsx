"use client";

import { Check, Copy, Phone, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRef, useState } from "react";
import { RichContent } from "@/components/content/RichContent";
import { cn } from "@/lib/cn";
import type { SanitizedHtml } from "@/lib/content/types";
import type { TutorHelpline, TutorMessageStatus, TutorTurnModeWire } from "@/server/tutor/protocol";
import { REFUSED_COPY, turnModeCaption } from "./labels";

/** A message in the chat as the client tracks it. */
export interface ChatItem {
  /** Stable React key (client id until the server id is known). */
  key: string;
  /** Persisted AiMessage id (null while streaming / for unsent messages). */
  id: string | null;
  role: "USER" | "ASSISTANT";
  /** Student text, or the assistant's raw Markdown (streamed text; used for Copy). */
  text: string;
  /** Final answer rendered server-side (sanitised, KaTeX). Present once the answer is complete. */
  html: SanitizedHtml | null;
  status: TutorMessageStatus | "ERROR" | "STREAMING" | "SENT";
  turnMode: TutorTurnModeWire | null;
  hintLevel: number | null;
  rating: number | null;
  helplines: TutorHelpline[] | null;
}

export interface ChatMessageProps {
  item: ChatItem;
  onRate?: ((messageId: string, rating: 1 | -1 | null) => void) | undefined;
  /** After a successful copy (the chat announces it: the button's own text change is not read out). */
  onCopied?: (() => void) | undefined;
  /** Offered under a TRUNCATED answer. */
  onContinue?: (() => void) | undefined;
  continueDisabled?: boolean;
}

const iconButton =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-control px-2 text-sm text-muted transition-colors hover:bg-subtle hover:text-text aria-pressed:text-primary [&_svg]:size-4.5";

/**
 * One chat bubble. Student messages are plain text (never parsed as HTML). Tutor answers are plain text while they
 * stream, then the server-rendered HTML (math typeset) replaces them. Not a live region: the chat announces completion
 * once, instead of every token.
 */
export function ChatMessage({ item, onRate, onCopied, onContinue, continueDisabled = false }: ChatMessageProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  if (item.role === "USER") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-card rounded-br-sm bg-primary px-4 py-2.5 text-base text-on-primary">
          <span className="sr-only">You said: </span>
          <p className="break-words whitespace-pre-wrap">{item.text}</p>
        </div>
      </div>
    );
  }

  const caption = turnModeCaption(item.turnMode, item.hintLevel);
  const streaming = item.status === "STREAMING";
  const refused = item.status === "REFUSED";

  async function copy(): Promise<void> {
    const text = item.text.trim() || bodyRef.current?.textContent?.trim() || "";
    if (!text || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 2_000);
    } catch {
      // Clipboard permission denied: nothing to do.
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="w-full rounded-card rounded-bl-sm border border-border bg-surface px-4 py-3 shadow-xs">
        <p className="mb-1 text-xs font-semibold tracking-wide text-primary uppercase">
          Tutor
          {caption && <span className="ml-2 font-medium tracking-normal text-muted normal-case">{caption}</span>}
        </p>
        <div ref={bodyRef} aria-busy={streaming || undefined}>
          {refused ? (
            <p className="text-base text-text">{REFUSED_COPY}</p>
          ) : item.html ? (
            <RichContent html={item.html} />
          ) : item.text ? (
            <p className="text-base leading-relaxed break-words whitespace-pre-wrap text-text">{item.text}</p>
          ) : streaming ? (
            <p className="text-sm text-muted">Thinking…</p>
          ) : null}
        </div>
        {item.status === "ABORTED" && <p className="mt-2 text-sm text-muted">Stopped before the end.</p>}
        {item.status === "TRUNCATED" && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>This answer was cut short.</span>
            {onContinue && (
              <button type="button" onClick={onContinue} disabled={continueDisabled} className={cn(iconButton, "text-primary")}>
                Continue
              </button>
            )}
          </div>
        )}
        {item.helplines && (
          <div className="mt-3 rounded-control border border-border bg-subtle p-3 text-sm">
            <p className="font-semibold text-text">Talk to someone you trust</p>
            <p className="mt-1 text-muted">A parent, guardian, teacher or school counsellor can help you right now.</p>
            {item.helplines.length > 0 && (
              <ul className="mt-2 space-y-1.5">
                {item.helplines.map((line) => (
                  <li key={`${line.name}-${line.phone ?? line.url ?? ""}`} className="text-text">
                    <span className="font-medium">{line.name}</span>
                    {line.phone && (
                      <a href={`tel:${line.phone.replace(/[^\d+]/g, "")}`} className="ml-2 inline-flex min-h-11 items-center gap-1 text-primary underline">
                        <Phone aria-hidden="true" className="size-4" />
                        {line.phone}
                      </a>
                    )}
                    {line.url && (
                      <a href={line.url} rel="noopener noreferrer" target="_blank" className="ml-2 inline-flex min-h-11 items-center text-primary underline">
                        Website<span className="sr-only">: {line.name} (opens in a new tab)</span>
                      </a>
                    )}
                    {line.description && <span className="block text-muted">{line.description}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {!streaming && !refused && item.id && (
        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Answer actions">
          <button type="button" onClick={() => void copy()} className={iconButton}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
          {onRate && (
            <>
              <span className="ml-2 text-sm text-muted">Was this helpful?</span>
              <button
                type="button"
                aria-pressed={item.rating === 1}
                aria-label="Yes, helpful"
                onClick={() => item.id && onRate(item.id, item.rating === 1 ? null : 1)}
                className={iconButton}
              >
                <ThumbsUp aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-pressed={item.rating === -1}
                aria-label="No, not helpful"
                onClick={() => item.id && onRate(item.id, item.rating === -1 ? null : -1)}
                className={iconButton}
              >
                <ThumbsDown aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
