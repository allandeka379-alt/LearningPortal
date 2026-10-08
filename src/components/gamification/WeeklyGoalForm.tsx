"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

export interface WeeklyGoalFormProps {
  /** The student's own weekly minutes target (null = default). */
  weeklyGoalMinutes: number | null;
  /** The default shown as a placeholder (from the daily goal). */
  defaultMinutes: number;
  weeklyGoalXp: number | null;
  limits: { minutes: { min: number; max: number }; xp: { min: number; max: number } };
  action: FormAction;
}

/**
 * Edit the weekly targets (§19 weekly goals): study minutes (empty = the default from the daily goal) and an optional XP
 * target. Saved with a Server Action; the result is announced politely.
 */
export function WeeklyGoalForm({ weeklyGoalMinutes, defaultMinutes, weeklyGoalXp, limits, action }: WeeklyGoalFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Weekly study time (minutes)"
          optional
          hint={`Leave empty to use the suggested ${defaultMinutes} minutes, from your daily goal.`}
          error={fieldErrorsOf(state, "weeklyGoalMinutes")}
        >
          <Input
            name="weeklyGoalMinutes"
            type="number"
            inputMode="numeric"
            min={limits.minutes.min}
            max={limits.minutes.max}
            step={1}
            defaultValue={weeklyGoalMinutes ?? ""}
            placeholder={String(defaultMinutes)}
          />
        </Field>
        <Field label="Weekly XP target" optional hint="Leave empty for no XP target." error={fieldErrorsOf(state, "weeklyGoalXp")}>
          <Input name="weeklyGoalXp" type="number" inputMode="numeric" min={limits.xp.min} max={limits.xp.max} step={10} defaultValue={weeklyGoalXp ?? ""} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="secondary" loading={pending} loadingText="Saving…">
          Save weekly goal
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
