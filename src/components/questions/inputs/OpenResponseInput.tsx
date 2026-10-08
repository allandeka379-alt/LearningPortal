"use client";

import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import { QUESTION_LIMITS } from "@/lib/questions/constants";
import type { ResponseFor } from "@/lib/questions/response";
import { wordCount } from "@/lib/questions/text";
import { textResponse } from "../response-model";
import type { InteractionOf } from "../types";

type OpenType = "ESSAY" | "EXTENDED_RESPONSE";

export interface OpenResponseInputProps {
  interaction: InteractionOf<OpenType>;
  value: ResponseFor<OpenType> | null;
  onChange: (value: ResponseFor<OpenType> | null) => void;
  disabled: boolean;
  idPrefix: string;
  describedBy?: string;
}

/** "120 words", "120 of 400 words", "120 words (at least 150)". */
export function wordCountText(count: number, limit: { min: number | null; max: number | null } | null): string {
  const words = `${count} ${count === 1 ? "word" : "words"}`;
  if (limit?.max) return `${count} of ${limit.max} words`;
  if (limit?.min) return `${words} (at least ${limit.min})`;
  return words;
}

/**
 * ESSAY / EXTENDED_RESPONSE: a large textarea with a live word count against the word limit. Controlled and
 * emitting on every keystroke, so the owner can debounce autosaves (exam mode) without extra wiring. The word count
 * is NOT a live region (it would chatter on every keystroke); crossing the limit is announced once.
 */
export function OpenResponseInput({ interaction, value, onChange, disabled, idPrefix, describedBy }: OpenResponseInputProps) {
  const text = value?.text ?? "";
  const count = wordCount(text);
  const limit = interaction.wordLimit;
  const over = limit?.max !== null && limit?.max !== undefined && count > limit.max;
  const id = `${idPrefix}-text`;
  const countId = `${idPrefix}-count`;
  const limitId = `${idPrefix}-limit`;
  const limitText =
    limit && (limit.min || limit.max)
      ? limit.min && limit.max
        ? `Write between ${limit.min} and ${limit.max} words.`
        : limit.max
          ? `Write up to ${limit.max} words.`
          : `Write at least ${limit.min} words.`
      : null;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        Your answer
      </label>
      {limitText && (
        <p id={limitId} className="text-sm text-muted">
          {limitText}
        </p>
      )}
      <Textarea
        id={id}
        value={text}
        onChange={(event) => onChange(textResponse(interaction.type, event.target.value))}
        rows={interaction.type === "ESSAY" ? 12 : 8}
        maxLength={QUESTION_LIMITS.longTextResponse}
        disabled={disabled}
        readOnly={disabled}
        aria-describedby={[describedBy, limitText ? limitId : null, countId].filter(Boolean).join(" ")}
      />
      <p id={countId} className={cn("text-sm tabular-nums", over ? "font-medium text-warning-text" : "text-muted")}>
        {wordCountText(count, limit)}
      </p>
      <p aria-live="polite" className="sr-only">
        {over ? "You are over the word limit." : ""}
      </p>
    </div>
  );
}
