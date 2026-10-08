"use client";

import { Check } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/cn";
import type { TutorRequestMode } from "@/server/tutor/protocol";
import { ANSWER_MODE_NOTE, MODE_CHIPS } from "./labels";

export interface ModeChipsProps {
  value: TutorRequestMode;
  onChange: (mode: TutorRequestMode) => void;
  disabled?: boolean;
}

/**
 * "Teach me / Hint / Check my working / Give me the answer" (§15). Native radio inputs (arrow-key navigation and
 * screen-reader semantics for free) styled as chips; each chip is a 44px touch target. The chosen chip shows a tick as
 * well as its colour (state is never carried by colour alone, §43). Each chip's name is its label; what the mode does
 * is its description. The answer mode carries a short note that understanding the steps matters.
 */
export function ModeChips({ value, onChange, disabled = false }: ModeChipsProps) {
  const id = useId();
  const noteId = `${id}-answer-note`;
  return (
    <fieldset disabled={disabled} className="min-w-0">
      <legend className="sr-only">How should the tutor help with this message?</legend>
      <div className="flex flex-wrap gap-2">
        {MODE_CHIPS.map((chip) => {
          const selected = value === chip.mode;
          const descriptionId = `${id}-${chip.mode}`;
          return (
            <label
              key={chip.mode}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-55",
                selected ? "border-primary bg-primary-soft text-on-primary-soft" : "border-border bg-surface text-text hover:border-border-strong",
              )}
            >
              <input
                type="radio"
                name={`${id}-mode`}
                value={chip.mode}
                checked={selected}
                onChange={() => onChange(chip.mode)}
                aria-describedby={chip.mode === "ANSWER" && selected ? `${descriptionId} ${noteId}` : descriptionId}
                className="sr-only"
              />
              {selected && <Check aria-hidden="true" data-testid="mode-chip-tick" className="-ml-0.5 size-4 shrink-0" />}
              {chip.label}
              {/* aria-hidden keeps it out of the radio's name (it sits inside the label); aria-describedby still reads it. */}
              <span id={descriptionId} className="sr-only" aria-hidden="true">
                {chip.description}
              </span>
            </label>
          );
        })}
      </div>
      {value === "ANSWER" && (
        <p id={noteId} className="mt-2 text-sm text-muted">
          {ANSWER_MODE_NOTE}
        </p>
      )}
    </fieldset>
  );
}
