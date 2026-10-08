"use client";

import { Alert } from "@/components/ui/Alert";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { QUESTION_LIMITS } from "@/lib/questions/constants";
import type { ResponseFor } from "@/lib/questions/response";
import { QuestionImage } from "../QuestionImage";
import { diagramLabelOf, setDiagramLabel } from "../response-model";
import type { InteractionOf } from "../types";

export interface DiagramLabellingInputProps {
  interaction: InteractionOf<"DIAGRAM_LABELLING">;
  value: ResponseFor<"DIAGRAM_LABELLING"> | null;
  onChange: (value: ResponseFor<"DIAGRAM_LABELLING"> | null) => void;
  disabled: boolean;
  idPrefix: string;
  describedBy?: string;
}

/**
 * DIAGRAM_LABELLING: numbered markers sit on the diagram at each target; below it, one labelled control per marker
 * (a word-bank `<select>`, or a text box for free-text labelling). Tapping a marker moves focus to its control, and
 * everything works with the keyboard alone — no drag and drop.
 */
export function DiagramLabellingInput({ interaction, value, onChange, disabled, idPrefix, describedBy }: DiagramLabellingInputProps) {
  const order = interaction.hotspots.map((hotspot) => hotspot.id);
  const controlId = (hotspotId: string) => `${idPrefix}-label-${hotspotId}`;
  const labels = interaction.labels;
  const options = labels?.map((label) => ({ value: label.id, label: label.label })) ?? [];

  return (
    <div className="space-y-4">
      {interaction.image ? (
        <figure className="relative mx-auto w-fit max-w-full">
          <QuestionImage image={interaction.image} className="rounded-md border border-border" eager />
          {interaction.hotspots.map((hotspot) => {
            const position = { left: `${hotspot.x}%`, top: `${hotspot.y}%` };
            const marker = "absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-md ring-2 ring-surface";
            return disabled ? (
              <span key={hotspot.id} aria-hidden="true" className={marker} style={position}>
                {hotspot.number}
              </span>
            ) : (
              <button
                key={hotspot.id}
                type="button"
                style={position}
                className={cn(marker, "after:absolute after:-inset-1 hover:bg-primary-hover focus-visible:outline-offset-2")}
                aria-label={`Label ${hotspot.number}: go to its answer box`}
                onClick={() => document.getElementById(controlId(hotspot.id))?.focus()}
              >
                {hotspot.number}
              </button>
            );
          })}
        </figure>
      ) : (
        <Alert tone="warning" title="The diagram could not be loaded">
          Check your connection and reload the page. You can still answer if you know the labels.
        </Alert>
      )}

      <fieldset className="min-w-0" aria-describedby={describedBy}>
        <legend className="mb-2 text-sm font-medium text-muted">
          {labels ? "Choose the correct label for each numbered part" : "Write the correct label for each numbered part"}
        </legend>
        <ol className="grid gap-3 sm:grid-cols-2">
          {interaction.hotspots.map((hotspot) => {
            const current = diagramLabelOf(value, hotspot.id);
            return (
              <li key={hotspot.id}>
                <Field label={`Label ${hotspot.number}`} id={controlId(hotspot.id)}>
                  {labels ? (
                    <Select
                      value={current.labelId}
                      onChange={(event) => onChange(setDiagramLabel(value, hotspot.id, { labelId: event.target.value }, order))}
                      disabled={disabled}
                      placeholder="Choose a label"
                      options={options}
                    />
                  ) : (
                    <Input
                      value={current.text}
                      onChange={(event) => onChange(setDiagramLabel(value, hotspot.id, { text: event.target.value }, order))}
                      maxLength={QUESTION_LIMITS.blankResponse}
                      disabled={disabled}
                      readOnly={disabled}
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                  )}
                </Field>
              </li>
            );
          })}
        </ol>
      </fieldset>
    </div>
  );
}
