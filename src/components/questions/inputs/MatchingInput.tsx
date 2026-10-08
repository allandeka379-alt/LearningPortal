"use client";

import { RichContent } from "@/components/content/RichContent";
import { Select } from "@/components/ui/Select";
import type { ResponseFor } from "@/lib/questions/response";
import { matchedRight, setMatchingPair } from "../response-model";
import type { InteractionOf } from "../types";

export interface MatchingInputProps {
  interaction: InteractionOf<"MATCHING">;
  value: ResponseFor<"MATCHING"> | null;
  onChange: (value: ResponseFor<"MATCHING"> | null) => void;
  disabled: boolean;
  idPrefix: string;
  describedBy?: string;
}

/**
 * MATCHING without drag and drop: the options are listed with letters, and each item gets a native `<select>` of
 * those letters — fully keyboard and screen-reader operable and comfortable on a phone (OS picker).
 */
export function MatchingInput({ interaction, value, onChange, disabled, idPrefix, describedBy }: MatchingInputProps) {
  const leftOrder = interaction.left.map((item) => item.id);
  const optionsId = `${idPrefix}-match-options`;
  const options = interaction.right.map((item) => ({ value: item.id, label: `${item.letter}. ${item.label}` }));

  return (
    <div className="space-y-4">
      <div className="rounded-card border border-border bg-subtle p-3.5 sm:p-4">
        <p id={optionsId} className="text-sm font-semibold text-text">
          Options
        </p>
        <ol className="mt-2 space-y-1.5">
          {interaction.right.map((item) => (
            <li key={item.id} className="flex gap-2 text-base text-text">
              <span className="w-5 shrink-0 font-semibold text-muted">{item.letter}</span>
              <RichContent inline html={item.html} />
            </li>
          ))}
        </ol>
      </div>
      <fieldset className="min-w-0" aria-describedby={[describedBy, optionsId].filter(Boolean).join(" ")}>
        <legend className="mb-2 text-sm font-medium text-muted">Match each item with one option</legend>
        <ol className="space-y-3">
          {interaction.left.map((item, index) => {
            const selectId = `${idPrefix}-match-${item.id}`;
            return (
              <li key={item.id} className="grid gap-2 rounded-card border border-border bg-surface p-3.5 sm:grid-cols-[1fr_minmax(12rem,16rem)] sm:items-center sm:p-4">
                <label htmlFor={selectId} className="flex min-w-0 gap-2 text-base text-text">
                  <span className="shrink-0 font-semibold text-muted">{index + 1}.</span>
                  <RichContent inline html={item.html} />
                </label>
                <Select
                  id={selectId}
                  value={matchedRight(value, item.id)}
                  onChange={(event) => onChange(setMatchingPair(value, item.id, event.target.value, leftOrder))}
                  disabled={disabled}
                  placeholder="Choose a match"
                  options={options}
                />
              </li>
            );
          })}
        </ol>
      </fieldset>
    </div>
  );
}
