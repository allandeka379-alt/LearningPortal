"use client";

import { cn } from "@/lib/cn";
import type { ResponseFor } from "@/lib/questions/response";
import { trueFalse } from "../response-model";
import type { InteractionOf } from "../types";

export interface TrueFalseInputProps {
  interaction: InteractionOf<"TRUE_FALSE">;
  value: ResponseFor<"TRUE_FALSE"> | null;
  onChange: (value: ResponseFor<"TRUE_FALSE">) => void;
  disabled: boolean;
  idPrefix: string;
  describedBy?: string;
}

/** TRUE_FALSE: two large native radio tiles ("True" / "False", or "Yes" / "No"). */
export function TrueFalseInput({ interaction, value, onChange, disabled, idPrefix, describedBy }: TrueFalseInputProps) {
  const labels = interaction.statementStyle === "yes_no" ? (["Yes", "No"] as const) : (["True", "False"] as const);
  const choices = [
    { label: labels[0], value: true },
    { label: labels[1], value: false },
  ];
  return (
    <fieldset className="min-w-0" aria-describedby={describedBy}>
      <legend className="mb-2 text-sm font-medium text-muted">
        {interaction.statementStyle === "yes_no" ? "Choose yes or no" : "Is the statement true or false?"}
      </legend>
      <div className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const inputId = `${idPrefix}-${choice.value ? "true" : "false"}`;
          const checked = value?.value === choice.value;
          return (
            <label
              key={choice.label}
              htmlFor={inputId}
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-card border bg-surface px-4 py-3 text-base font-semibold text-text transition-colors",
                disabled ? "cursor-default" : "cursor-pointer hover:border-border-strong",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus",
                checked ? "border-primary bg-primary-soft" : "border-border",
              )}
            >
              <input
                id={inputId}
                type="radio"
                name={`${idPrefix}-tf`}
                value={String(choice.value)}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(trueFalse(choice.value))}
                className="size-5 shrink-0 cursor-[inherit] accent-primary focus-visible:outline-none"
              />
              {choice.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
