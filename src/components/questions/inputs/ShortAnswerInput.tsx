"use client";

import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { QUESTION_LIMITS } from "@/lib/questions/constants";
import type { ResponseFor } from "@/lib/questions/response";
import { textResponse } from "../response-model";
import type { InteractionOf } from "../types";

export interface ShortAnswerInputProps {
  interaction: InteractionOf<"SHORT_ANSWER">;
  value: ResponseFor<"SHORT_ANSWER"> | null;
  onChange: (value: ResponseFor<"SHORT_ANSWER"> | null) => void;
  disabled: boolean;
  idPrefix: string;
  describedBy?: string;
}

/** SHORT_ANSWER: one labelled text box. Spell-check is off so the browser never suggests a (right or wrong) word. */
export function ShortAnswerInput({ interaction, value, onChange, disabled, idPrefix, describedBy }: ShortAnswerInputProps) {
  const maxLength = interaction.maxLength ?? QUESTION_LIMITS.shortTextResponse;
  return (
    <Field label="Your answer" id={`${idPrefix}-answer`}>
      <Input
        value={value?.text ?? ""}
        onChange={(event) => onChange(textResponse("SHORT_ANSWER", event.target.value))}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={disabled}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-describedby={describedBy}
      />
    </Field>
  );
}
