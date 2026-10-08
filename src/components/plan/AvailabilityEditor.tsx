"use client";

import { CircleAlert, Minus, Plus } from "lucide-react";
import { useId } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { formatDuration } from "@/lib/format";
import type { WeekdayKey } from "@/server/studyplan/generator";
import { WEEKDAYS } from "./plan-copy";

/** Minutes per weekday as typed (strings, so a field can be empty while editing). */
export type AvailabilityDraft = Record<WeekdayKey, string>;

export interface AvailabilityEditorProps {
  value: AvailabilityDraft;
  onChange: (next: AvailabilityDraft) => void;
  /** Upper bound per day (minutes). */
  max: number;
  /** Stepper increment (minutes). */
  step?: number;
  /** Field errors per weekday (`availability.mon`, …) and for the week as a whole (`availability`). */
  dayErrors?: Partial<Record<WeekdayKey, readonly string[] | undefined>>;
  weekErrors?: readonly string[] | undefined;
  /** Form field name prefix (default `availability`). */
  name?: string;
}

/** Parsed minutes of a draft field: empty or invalid counts as 0. */
export function draftMinutes(value: string | undefined): number {
  const n = Number((value ?? "").trim());
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/**
 * Study time per weekday (§16 "time available"): seven labelled number fields with −/+ steppers and the weekly total.
 * Controlled, so values survive a failed submit. Touch targets are 44px; the total is announced politely.
 */
export function AvailabilityEditor({ value, onChange, max, step = 15, dayErrors, weekErrors, name = "availability" }: AvailabilityEditorProps) {
  const baseId = useId();
  const total = WEEKDAYS.reduce((sum, day) => sum + Math.min(max, draftMinutes(value[day.key])), 0);
  const set = (key: WeekdayKey, next: string) => onChange({ ...value, [key]: next });
  const nudge = (key: WeekdayKey, delta: number) => {
    const current = draftMinutes(value[key]);
    const stepped = delta > 0 ? Math.floor(current / step) * step + step : Math.ceil(current / step) * step - step;
    set(key, String(Math.min(max, Math.max(0, stepped))));
  };
  const weekErrorId = weekErrors && weekErrors.length > 0 ? `${baseId}-week-error` : undefined;

  return (
    <fieldset className="space-y-3" aria-describedby={weekErrorId}>
      <legend className="text-sm font-medium text-text">Study time each day</legend>
      <p className="text-sm text-muted">Minutes you can study. Your plan never schedules more than this on a day; 0 means a rest day.</p>
      <ul className="divide-y divide-border rounded-control border border-border">
        {WEEKDAYS.map((day) => {
          const inputId = `${baseId}-${day.key}`;
          const errors = dayErrors?.[day.key];
          const errorId = errors && errors.length > 0 ? `${inputId}-error` : undefined;
          const minutes = draftMinutes(value[day.key]);
          return (
            <li key={day.key} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-3 py-2">
              <label htmlFor={inputId} className="min-w-24 text-sm font-medium text-text">
                {day.long}
                <span className="sr-only"> (minutes)</span>
              </label>
              <div className="flex items-center gap-1">
                <IconButton
                  icon={<Minus aria-hidden="true" />}
                  aria-label={`Less time on ${day.long}`}
                  variant="outline"
                  disabled={minutes <= 0}
                  onClick={() => nudge(day.key, -1)}
                />
                <Input
                  id={inputId}
                  name={`${name}.${day.key}`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={max}
                  step={5}
                  value={value[day.key]}
                  onChange={(event) => set(day.key, event.target.value)}
                  invalid={errorId !== undefined}
                  aria-describedby={errorId}
                  className="w-20 text-center"
                />
                <IconButton
                  icon={<Plus aria-hidden="true" />}
                  aria-label={`More time on ${day.long}`}
                  variant="outline"
                  disabled={minutes >= max}
                  onClick={() => nudge(day.key, 1)}
                />
                <span className="w-8 text-sm text-muted" aria-hidden="true">
                  min
                </span>
              </div>
              {errorId && (
                <p id={errorId} className="flex w-full gap-1.5 text-sm text-danger-text">
                  <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span>{errors?.join(" ")}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="text-sm text-text">
        Total: <span className="font-semibold">{formatDuration(total, { style: "long" })}</span> a week
      </p>
      {weekErrorId && (
        <p id={weekErrorId} className="flex gap-1.5 text-sm text-danger-text">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{weekErrors?.join(" ")}</span>
        </p>
      )}
    </fieldset>
  );
}
