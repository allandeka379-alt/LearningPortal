"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { RichContent } from "@/components/content/RichContent";
import { cn } from "@/lib/cn";
import type { ResponseFor } from "@/lib/questions/response";
import { QuestionImage } from "../QuestionImage";
import { chooseOption, toggleOption } from "../response-model";
import type { InteractionOf, PresentedReveal } from "../types";

export interface MultipleChoiceInputProps {
  interaction: InteractionOf<"MULTIPLE_CHOICE">;
  value: ResponseFor<"MULTIPLE_CHOICE"> | null;
  onChange: (value: ResponseFor<"MULTIPLE_CHOICE"> | null) => void;
  disabled: boolean;
  idPrefix: string;
  /** Id of the stem, linked to the group so the question is read with the choices. */
  describedBy?: string;
  /** After marking: which options are correct (review annotations). */
  reveal?: Pick<PresentedReveal, "options"> | null;
}

/**
 * MULTIPLE_CHOICE: a native radio group (single answer) or checkboxes ("Select all that apply"). Native inputs give
 * arrow-key / space operation and screen-reader semantics for free; each whole option row is the touch target.
 */
export function MultipleChoiceInput({ interaction, value, onChange, disabled, idPrefix, describedBy, reveal }: MultipleChoiceInputProps) {
  const multiple = interaction.selectMode === "multiple";
  const selected = new Set(value?.optionKeys ?? []);
  const order = interaction.options.map((option) => option.key);
  const correctKeys = reveal && reveal.options.length > 0 ? new Set(reveal.options.filter((o) => o.isCorrect).map((o) => o.key)) : null;

  return (
    <fieldset className="min-w-0" aria-describedby={describedBy}>
      <legend className="mb-2 text-sm font-medium text-muted">{multiple ? "Select all that apply" : "Choose one answer"}</legend>
      <ul className="space-y-2">
        {interaction.options.map((option) => {
          const inputId = `${idPrefix}-option-${option.key}`;
          const checked = selected.has(option.key);
          const isCorrect = correctKeys?.has(option.key) ?? false;
          const annotation = correctKeys ? (isCorrect ? "correct" : checked ? "wrong" : null) : null;
          return (
            <li key={option.key}>
              <label
                htmlFor={inputId}
                className={cn(
                  "flex min-h-11 items-start gap-3 rounded-card border bg-surface p-3.5 transition-colors sm:p-4",
                  disabled ? "cursor-default" : "cursor-pointer hover:border-border-strong",
                  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus",
                  checked ? "border-primary bg-primary-soft" : "border-border",
                  annotation === "correct" && "border-success bg-success-soft",
                  annotation === "wrong" && "border-danger bg-danger-soft",
                )}
              >
                <input
                  id={inputId}
                  type={multiple ? "checkbox" : "radio"}
                  name={`${idPrefix}-choice`}
                  value={option.key}
                  checked={checked}
                  disabled={disabled}
                  onChange={(event) =>
                    onChange(multiple ? toggleOption(value, option.key, event.target.checked, order) : chooseOption(option.key))
                  }
                  className="mt-0.5 size-5 shrink-0 cursor-[inherit] accent-primary focus-visible:outline-none"
                />
                <span className="w-5 shrink-0 font-semibold text-muted">{option.key}</span>
                <span className="min-w-0 flex-1 space-y-2 text-base text-text">
                  <RichContent inline html={option.html} />
                  {option.image && <QuestionImage image={option.image} className="max-h-48 w-auto rounded-md" sizes="20rem" />}
                  {annotation && (
                    <span
                      className={cn(
                        "flex items-center gap-1 text-xs font-semibold",
                        annotation === "correct" ? "text-success-text" : "text-danger-text",
                      )}
                    >
                      {annotation === "correct" ? <CircleCheck aria-hidden="true" className="size-4" /> : <CircleX aria-hidden="true" className="size-4" />}
                      {annotation === "correct" ? (checked ? "Your answer · Correct" : "Correct answer") : "Your answer"}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
