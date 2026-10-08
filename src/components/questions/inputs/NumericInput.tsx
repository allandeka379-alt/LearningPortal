"use client";

import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { controlStyles } from "@/components/ui/control-styles";
import { cn } from "@/lib/cn";
import { QUESTION_LIMITS } from "@/lib/questions/constants";
import type { ResponseFor } from "@/lib/questions/response";
import { numericFields, numericResponse, type NumericFields } from "../response-model";
import type { InteractionOf } from "../types";

type NumericType = "NUMERICAL" | "CALCULATION";

export interface NumericInputProps {
  interaction: InteractionOf<NumericType>;
  value: ResponseFor<NumericType> | null;
  onChange: (value: ResponseFor<NumericType> | null) => void;
  disabled: boolean;
  idPrefix: string;
  describedBy?: string;
}

/**
 * NUMERICAL and CALCULATION answers. The number box opens the decimal keypad (`inputmode="decimal"`); since some
 * phone keypads have no minus sign, "×10" or fraction slash, the student can switch to the full keyboard. The unit
 * shown next to the box (`unitHint`) is the unit of the answer; without one, an optional unit box is offered.
 * CALCULATION adds a working box first (method marks).
 */
export function NumericInput({ interaction, value, onChange, disabled, idPrefix, describedBy }: NumericInputProps) {
  const [fullKeyboard, setFullKeyboard] = useState(false);
  // Drafts: a unit typed before the number must not vanish while the response is still "no answer" (null).
  const [fields, setFields] = useState<Required<NumericFields>>(() => numericFields(value));
  const valueId = `${idPrefix}-value`;
  const hintId = `${idPrefix}-value-hint`;
  const isCalculation = interaction.type === "CALCULATION";

  const update = (patch: Partial<NumericFields>) => {
    const next = { ...fields, ...patch };
    setFields(next);
    onChange(numericResponse(interaction.type, next, interaction.unitHint));
  };

  const hintParts = [
    interaction.answerPrefix ? `Complete: ${interaction.answerPrefix} …` : null,
    interaction.unitHint ? `Answer in ${interaction.unitHint}.` : null,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      {interaction.expectsWorking && (
        <Field label="Working" id={`${idPrefix}-working`} hint="Show each step. Marks are given for correct method." optional>
          <Textarea
            value={fields.working}
            onChange={(event) => update({ working: event.target.value })}
            rows={5}
            maxLength={QUESTION_LIMITS.workingResponse}
            disabled={disabled}
            readOnly={disabled}
            spellCheck={false}
            className="font-mono text-sm"
          />
        </Field>
      )}

      <div className="space-y-1.5">
        <label htmlFor={valueId} className="block text-sm font-medium text-text">
          {isCalculation ? "Final answer" : "Your answer"}
        </label>
        {hintParts.length > 0 && (
          <p id={hintId} className="text-sm text-muted">
            {hintParts.join(" ")}
          </p>
        )}
        <div className="flex max-w-md items-center gap-2">
          {interaction.answerPrefix && (
            <span aria-hidden="true" className="shrink-0 text-base font-medium text-text">
              {interaction.answerPrefix}
            </span>
          )}
          <input
            id={valueId}
            type="text"
            inputMode={fullKeyboard ? "text" : "decimal"}
            value={fields.value}
            onChange={(event) => update({ value: event.target.value })}
            maxLength={QUESTION_LIMITS.numberInput}
            disabled={disabled}
            readOnly={disabled}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-describedby={[describedBy, hintParts.length > 0 ? hintId : null].filter(Boolean).join(" ") || undefined}
            className={cn(controlStyles, "min-h-11 min-w-0 flex-1 px-3.5 py-2 tabular-nums")}
          />
          {interaction.unitHint && (
            <span aria-hidden="true" className="shrink-0 text-base font-medium text-text">
              {interaction.unitHint}
            </span>
          )}
        </div>
        {!disabled && (
          // An action button whose label names what it does next. Not `aria-pressed`: a toggle's label must stay the
          // same, and "Use the number keypad, pressed" would announce the opposite of the keyboard in use.
          <button
            type="button"
            onClick={() => setFullKeyboard((current) => !current)}
            aria-controls={valueId}
            className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {fullKeyboard ? "Use the number keypad" : "Need a minus sign or ×10? Use the full keyboard"}
          </button>
        )}
      </div>

      {!interaction.unitHint && (
        <Field label="Unit" id={`${idPrefix}-unit`} hint="Only if the answer has a unit, e.g. cm or km/h." optional className="max-w-xs">
          <Input
            value={fields.unit}
            onChange={(event) => update({ unit: event.target.value })}
            maxLength={QUESTION_LIMITS.unitInput}
            disabled={disabled}
            readOnly={disabled}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </Field>
      )}
    </div>
  );
}
