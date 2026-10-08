"use client";

import { ArrowUp, Square } from "lucide-react";
import { useId, useLayoutEffect, useRef, type FormEvent, type KeyboardEvent } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";

export interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  /** Stops the answer being streamed (the partial answer is kept). */
  onStop: () => void;
  busy: boolean;
  disabled: boolean;
  maxLength: number;
  placeholder?: string;
}

/** Max height of the autosizing textarea before it scrolls (keeps the thread visible on a 360px phone). */
const MAX_HEIGHT_PX = 192;

/** True on devices with a precise pointer and hover (desktop): Enter sends there; on touch keyboards it adds a line. */
function enterSends(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * The message box: autosizing textarea, Enter to send / Shift+Enter for a new line on desktop only (phones keep Enter
 * for new lines and use the button), a remaining-characters hint near the limit, and Send / Stop.
 */
export function ChatComposer({ value, onChange, onSend, onStop, busy, disabled, maxLength, placeholder = "Ask the tutor…" }: ChatComposerProps) {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const remaining = maxLength - value.length;
  const nearLimit = remaining <= Math.max(50, Math.floor(maxLength * 0.1));
  const canSend = !busy && !disabled && value.trim().length > 0 && remaining >= 0;

  useLayoutEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, MAX_HEIGHT_PX)}px`;
  }, [value]);

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (canSend) onSend();
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    if (!enterSends()) return;
    event.preventDefault();
    if (canSend) onSend();
  }

  return (
    <form onSubmit={submit} aria-label="Message the tutor" className="flex items-end gap-2">
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="sr-only">
          Your message
        </label>
        <textarea
          ref={textareaRef}
          id={id}
          name="message"
          rows={1}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          aria-describedby={nearLimit ? `${id}-count` : undefined}
          className={cn(
            "block max-h-48 min-h-11 w-full resize-none rounded-control border border-border-strong bg-surface px-3.5 py-2.5",
            "text-base leading-relaxed text-text shadow-xs focus-visible:border-primary focus-visible:outline-offset-1",
            "disabled:cursor-not-allowed disabled:bg-subtle disabled:text-muted",
          )}
        />
        {nearLimit && (
          <p id={`${id}-count`} className={cn("mt-1 text-xs", remaining < 0 ? "text-danger-text" : "text-muted")}>
            {remaining >= 0 ? `${remaining} characters left` : `${-remaining} characters over the limit`}
          </p>
        )}
      </div>
      {busy ? (
        <button type="button" onClick={onStop} aria-label="Stop the answer" className={buttonStyles({ variant: "outline", iconOnly: true })}>
          <Square aria-hidden="true" />
        </button>
      ) : (
        <button type="submit" disabled={!canSend} aria-label="Send message" className={buttonStyles({ variant: "primary", iconOnly: true })}>
          <ArrowUp aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
