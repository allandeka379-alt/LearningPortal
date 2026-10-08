"use client";

import { useState, useTransition, type FormEvent } from "react";
import { RichContent } from "@/components/content/RichContent";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { marksText } from "./response-model";
import type { PresentedFeedback } from "./types";

export interface SelfAssessmentInput {
  /** Mark-scheme points the student says they made (when the question has points). */
  pointIds: string[];
  /** Marks claimed when there are no points (0..max). Ignored when points are given: the server sums them. */
  marks: number;
}

export interface SelfAssessmentFormProps {
  assessment: NonNullable<PresentedFeedback["selfAssessment"]>;
  /** Saves the self-assessment; resolves to an error message or null. */
  onSubmit: (input: SelfAssessmentInput) => Promise<string | null>;
  idPrefix: string;
}

/**
 * Self-assessment fallback (ARCHITECTURE §6.5/§6.8): when automatic (AI) marking is not available, the student ticks
 * the mark-scheme points their answer makes, or picks a mark, and the server records a SELF_ASSESSED mark (which
 * counts for less in mastery).
 */
export function SelfAssessmentForm({ assessment, onSubmit, idPrefix }: SelfAssessmentFormProps) {
  const [chosen, setChosen] = useState<Set<string>>(() => new Set());
  const [marks, setMarks] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const hasPoints = assessment.points.length > 0;
  const total = hasPoints
    ? Math.min(
        assessment.maxMarks,
        assessment.points.filter((point) => chosen.has(point.id)).reduce((sum, point) => sum + point.marks, 0),
      )
    : marks;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const message = await onSubmit({ pointIds: [...chosen], marks });
      if (message) setError(message);
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-card border border-border bg-surface p-3.5 sm:p-4" noValidate>
      <fieldset className="min-w-0 space-y-2">
        <legend className="text-base font-semibold text-text">Mark your own answer</legend>
        <p className="text-sm text-muted">
          Automatic marking isn&apos;t available right now. Compare your answer with the mark scheme and be honest — it
          helps us pick the right questions for you.
        </p>
        {hasPoints ? (
          <ul className="space-y-1">
            {assessment.points.map((point) => {
              const id = `${idPrefix}-point-${point.id}`;
              return (
                <li key={point.id}>
                  <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 py-2">
                    <input
                      id={id}
                      type="checkbox"
                      checked={chosen.has(point.id)}
                      disabled={pending}
                      onChange={(event) => {
                        const next = new Set(chosen);
                        if (event.target.checked) next.add(point.id);
                        else next.delete(point.id);
                        setChosen(next);
                      }}
                      className="mt-0.5 size-5 shrink-0 accent-primary"
                    />
                    <span className="min-w-0 text-sm text-text">
                      <RichContent inline html={point.descriptionHtml} />{" "}
                      <span className="whitespace-nowrap text-muted">({marksText(point.marks)})</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        ) : (
          <Field label="Marks you think you earned" id={`${idPrefix}-self-marks`} className="max-w-xs">
            <Select
              value={String(marks)}
              onChange={(event) => setMarks(Number(event.target.value))}
              disabled={pending}
              options={Array.from({ length: assessment.maxMarks + 1 }, (_, value) => ({ value: String(value), label: String(value) }))}
            />
          </Field>
        )}
      </fieldset>
      <p className="text-sm font-medium text-text tabular-nums">
        Your mark: {total} of {marksText(assessment.maxMarks)}
      </p>
      {error && (
        <p role="alert" className="text-sm text-danger-text">
          {error}
        </p>
      )}
      <Button type="submit" variant="secondary" loading={pending} loadingText="Saving…">
        Save my mark
      </Button>
    </form>
  );
}
