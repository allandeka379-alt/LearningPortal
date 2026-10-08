"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";
import type { ActionResult } from "@/server/lib/errors";

export type RateSolutionAction = (input: { messageId: string; rating: 1 | -1 | null }) => Promise<ActionResult<null>>;

export interface SolutionRatingProps {
  messageId: string;
  initialRating: 1 | -1 | null;
  rateAction: RateSolutionAction;
  className?: string;
}

const choice =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-control border border-border px-3 text-sm text-text transition-colors " +
  "hover:bg-subtle aria-pressed:border-primary aria-pressed:bg-primary-soft aria-pressed:text-on-primary-soft disabled:opacity-60";

/** "Was this helpful?" (AiMessage.userRating; evaluation sets). Pressing the chosen option again clears it. */
export function SolutionRating({ messageId, initialRating, rateAction, className }: SolutionRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function rate(value: 1 | -1): void {
    const previous = rating;
    const next = previous === value ? null : value;
    setRating(next);
    setMessage("");
    startTransition(async () => {
      const result = await rateAction({ messageId, rating: next });
      if (result.ok) {
        setMessage(next === null ? "Feedback removed." : "Thanks for the feedback.");
      } else {
        setRating(previous);
        setMessage("We couldn't save your feedback. Please try again.");
      }
    });
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <p className="text-sm text-muted" id={`rate-${messageId}`}>
        Was this helpful?
      </p>
      <div role="group" aria-labelledby={`rate-${messageId}`} className="flex gap-2">
        <button type="button" className={choice} aria-pressed={rating === 1} disabled={pending} onClick={() => rate(1)}>
          <ThumbsUp aria-hidden="true" className="size-4" />
          Yes
        </button>
        <button type="button" className={choice} aria-pressed={rating === -1} disabled={pending} onClick={() => rate(-1)}>
          <ThumbsDown aria-hidden="true" className="size-4" />
          No
        </button>
      </div>
      <p aria-live="polite" role="status" className="min-h-5 text-sm text-muted">
        {message}
      </p>
    </div>
  );
}
