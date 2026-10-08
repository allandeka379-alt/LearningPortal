"use client";

import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { RichContent } from "@/components/content/RichContent";
import { controlStyles } from "@/components/ui/control-styles";
import { cn } from "@/lib/cn";
import { QUESTION_LIMITS } from "@/lib/questions/constants";
import type { ResponseFor } from "@/lib/questions/response";
import { blankText, setBlank } from "../response-model";
import type { FillSegment, InteractionOf } from "../types";

export interface FillInTheBlankInputProps {
  interaction: InteractionOf<"FILL_IN_THE_BLANK">;
  value: ResponseFor<"FILL_IN_THE_BLANK"> | null;
  onChange: (value: ResponseFor<"FILL_IN_THE_BLANK"> | null) => void;
  disabled: boolean;
  idPrefix: string;
  describedBy?: string;
}

type BlankSegment = Extract<FillSegment, { kind: "blank" }>;

/**
 * FILL_IN_THE_BLANK: the sentence is rendered with an inline control in place of each blank (text box, number box
 * with the decimal keypad, or a native select for word-bank blanks). Each control is labelled "Blank n of N".
 */
export function FillInTheBlankInput({ interaction, value, onChange, disabled, idPrefix, describedBy }: FillInTheBlankInputProps) {
  const order = interaction.paragraphs.flat().flatMap((segment) => (segment.kind === "blank" ? [segment.id] : []));
  const total = interaction.blankCount;

  const control = (blank: BlankSegment) => {
    const id = `${idPrefix}-blank-${blank.id}`;
    const label = `Blank ${blank.number} of ${total}`;
    const current = blankText(value, blank.id);
    const change = (text: string) => onChange(setBlank(value, blank.id, text, order));
    if (blank.input === "select") {
      return (
        <span className="relative mx-0.5 inline-block align-middle">
          <select
            id={id}
            aria-label={label}
            value={current}
            onChange={(event) => change(event.target.value)}
            disabled={disabled}
            className={cn(controlStyles, "inline-block min-h-11 w-auto max-w-full appearance-none py-1.5 pr-9 pl-3")}
          >
            <option value="">Choose…</option>
            {(blank.choices ?? []).map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted" />
        </span>
      );
    }
    return (
      <input
        id={id}
        type="text"
        aria-label={label}
        inputMode={blank.input === "number" ? "decimal" : "text"}
        value={current}
        onChange={(event) => change(event.target.value)}
        maxLength={blank.input === "number" ? QUESTION_LIMITS.numberInput : QUESTION_LIMITS.blankResponse}
        disabled={disabled}
        readOnly={disabled}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className={cn(controlStyles, "mx-0.5 inline-block min-h-11 w-36 max-w-full px-2.5 py-1.5 align-middle sm:w-44")}
      />
    );
  };

  return (
    <fieldset className="min-w-0" aria-describedby={describedBy}>
      <legend className="mb-2 text-sm font-medium text-muted">{total === 1 ? "Fill in the blank" : `Fill in the ${total} blanks`}</legend>
      <div className="space-y-3 text-base leading-[2.75rem] text-text">
        {interaction.paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph.map((segment, i) => {
              if (segment.kind === "html") return <RichContent key={i} inline html={segment.html} />;
              if (segment.kind === "space") return <Fragment key={i}> </Fragment>;
              return <Fragment key={i}>{control(segment)}</Fragment>;
            })}
          </p>
        ))}
      </div>
    </fieldset>
  );
}
