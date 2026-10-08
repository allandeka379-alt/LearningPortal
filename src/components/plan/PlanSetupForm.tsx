"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import type { WeekdayKey } from "@/server/studyplan/generator";
import { AvailabilityEditor, type AvailabilityDraft } from "./AvailabilityEditor";
import { WEEKDAYS } from "./plan-copy";

export interface PlanSetupSubject {
  subjectId: string;
  name: string;
  /** e.g. "O-Level · target November 2026". */
  detail?: string;
}

export interface PlanSetupFormProps {
  mode: "create" | "edit";
  subjects: readonly PlanSetupSubject[];
  /** Subjects ticked initially. */
  selectedSubjectIds: readonly string[];
  /** Exam date prefilled (`YYYY-MM-DD`), or null. */
  examDate: string | null;
  /** Where the prefilled date comes from, e.g. "From your target examination: November 2026 (provisional date)". */
  examHint: string | null;
  minExamDate: string;
  maxExamDate: string;
  availability: Readonly<Record<WeekdayKey, number>>;
  maxDailyMinutes: number;
  action: FormAction;
}

function toDraft(availability: Readonly<Record<WeekdayKey, number>>): AvailabilityDraft {
  return Object.fromEntries(WEEKDAYS.map((day) => [day.key, String(availability[day.key] ?? 0)])) as AvailabilityDraft;
}

/**
 * Plan settings (§16 "student enters exam date, subjects, target"): which subjects, the exam date (prefilled from the
 * target examination; empty = no exam date) and the minutes available on each weekday. Used to create the plan and to
 * rebuild it with new settings. Controlled fields keep the student's input after a failed submit.
 */
export function PlanSetupForm({
  mode,
  subjects,
  selectedSubjectIds,
  examDate,
  examHint,
  minExamDate,
  maxExamDate,
  availability,
  maxDailyMinutes,
  action,
}: PlanSetupFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const subjectErrorId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [chosen, setChosen] = useState<ReadonlySet<string>>(() => new Set(selectedSubjectIds));
  const [exam, setExam] = useState(examDate ?? "");
  const [draft, setDraft] = useState<AvailabilityDraft>(() => toDraft(availability));

  const toggle = (subjectId: string, on: boolean) =>
    setChosen((current) => {
      const next = new Set(current);
      if (on) next.add(subjectId);
      else next.delete(subjectId);
      return next;
    });

  // React resets a form after its action runs; keep the checkboxes' reset value equal to the current choice so a
  // failed submit does not visually re-tick (and then re-send) subjects the student unticked.
  useEffect(() => {
    formRef.current?.querySelectorAll<HTMLInputElement>('input[name="subjectId"]').forEach((input) => {
      input.defaultChecked = chosen.has(input.value);
    });
  }, [chosen]);

  const subjectErrors = fieldErrorsOf(state, "subjectIds");
  const dayErrors = Object.fromEntries(WEEKDAYS.map((day) => [day.key, fieldErrorsOf(state, `availability.${day.key}`)]));

  return (
    <form ref={formRef} action={formAction} className="space-y-6" noValidate>
      <input type="hidden" name="mode" value={mode} />
      <fieldset className="space-y-1" aria-describedby={subjectErrors ? subjectErrorId : undefined}>
        <legend className="text-sm font-medium text-text">Subjects</legend>
        <p className="text-sm text-muted">Your plan shares the time between the subjects you choose.</p>
        <div className="divide-y divide-border">
          {subjects.map((subject) => (
            <Checkbox
              key={subject.subjectId}
              name="subjectId"
              value={subject.subjectId}
              checked={chosen.has(subject.subjectId)}
              onChange={(event) => toggle(subject.subjectId, event.target.checked)}
              label={subject.name}
              description={subject.detail}
            />
          ))}
        </div>
        {subjectErrors && (
          <p id={subjectErrorId} className="text-sm text-danger-text">
            {subjectErrors.join(" ")}
          </p>
        )}
      </fieldset>

      <Field
        label="Exam date"
        optional
        hint={examHint ?? "Leave it empty if you don't have an exam date yet: you'll get a rolling four-week plan."}
        error={fieldErrorsOf(state, "examDate")}
      >
        <Input name="examDate" type="date" min={minExamDate} max={maxExamDate} value={exam} onChange={(event) => setExam(event.target.value)} className="max-w-52" />
      </Field>

      <AvailabilityEditor value={draft} onChange={setDraft} max={maxDailyMinutes} dayErrors={dayErrors} weekErrors={fieldErrorsOf(state, "availability")} />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText={mode === "edit" ? "Rebuilding…" : "Building your plan…"}>
          {mode === "edit" ? "Rebuild my plan" : "Create my study plan"}
        </Button>
        <FormFeedback state={state} />
      </div>
      {mode === "edit" && (
        <p className="text-sm text-muted">Rebuilding keeps what you have already done today and plans the next four weeks again.</p>
      )}
    </form>
  );
}
