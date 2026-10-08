"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export interface StudyPreferencesFormProps {
  timezone: string;
  timeZones: readonly string[];
  /** The student's own goal; null = platform default. */
  dailyGoalMinutes: number | null;
  defaultDailyGoalMinutes: number;
  minMinutes: number;
  maxMinutes: number;
  hasActivePlan: boolean;
  action: FormAction;
}

/** "Africa/Harare" → "Africa / Harare" for the option label (the value stays the IANA id). */
function zoneLabel(zone: string): string {
  return zone.replaceAll("_", " ").replaceAll("/", " / ");
}

/**
 * Time zone (day boundaries for streaks and the daily goal) and the daily study goal in minutes (§6 "daily
 * target"). Leaving the goal empty uses the suggested default; an active study plan sets its own daily target.
 */
export function StudyPreferencesForm({
  timezone,
  timeZones,
  dailyGoalMinutes,
  defaultDailyGoalMinutes,
  minMinutes,
  maxMinutes,
  hasActivePlan,
  action,
}: StudyPreferencesFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <Field label="Time zone" hint="Your day starts and ends at midnight in this time zone, for streaks and daily goals." error={fieldErrorsOf(state, "timezone")}>
        <Select name="timezone" defaultValue={timezone}>
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zoneLabel(zone)}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Daily study goal (minutes)"
        optional
        hint={
          hasActivePlan
            ? "Your study plan sets today's target. This goal is used when you have no plan."
            : `Leave empty to use the suggested ${defaultDailyGoalMinutes} minutes.`
        }
        error={fieldErrorsOf(state, "dailyGoalMinutes")}
      >
        <Input
          name="dailyGoalMinutes"
          type="number"
          inputMode="numeric"
          min={minMinutes}
          max={maxMinutes}
          step={1}
          defaultValue={dailyGoalMinutes ?? ""}
          placeholder={String(defaultDailyGoalMinutes)}
          className="max-w-40"
        />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Saving…">
          Save study preferences
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
