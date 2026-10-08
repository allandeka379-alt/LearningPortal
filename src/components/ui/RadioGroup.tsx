import { CircleAlert } from "lucide-react";
import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type RadioAppearance = "default" | "card";

export interface RadioProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label: ReactNode;
  description?: ReactNode;
  /**
   * `"card"` renders a bordered, selectable tile (onboarding choices such as board/level). The checked state is
   * styled with `:has(:checked)`, so it needs no JavaScript.
   */
  appearance?: RadioAppearance;
}

/** A single native radio with its label. Give every radio in a group the same `name`. */
export function Radio({ label, description, appearance = "default", className, id, disabled, ...props }: RadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isCard = appearance === "card";
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex items-start gap-3",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        isCard
          ? "min-h-11 rounded-card border border-border bg-surface p-4 transition-colors hover:border-border-strong has-checked:border-primary has-checked:bg-primary-soft has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
          : "min-h-11 min-w-11 py-2.5",
        className,
      )}
    >
      <input
        type="radio"
        id={inputId}
        disabled={disabled}
        aria-describedby={descriptionId}
        className={cn("mt-0.5 size-5 shrink-0 cursor-[inherit] accent-primary", isCard && "focus-visible:outline-none")}
        {...props}
      />
      <span className="min-w-0">
        <span className={cn("block text-text", isCard ? "text-base font-semibold" : "text-sm font-medium")}>{label}</span>
        {description && (
          <span id={descriptionId} className="mt-0.5 block text-sm text-muted">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Visible group label (rendered as the fieldset `<legend>`). */
  legend: ReactNode;
  legendHidden?: boolean;
  name: string;
  /** Renders one `Radio` per option. Alternatively pass `Radio` children (with the same `name`). */
  options?: readonly RadioOption[];
  /** Uncontrolled initial selection (works in Server Components and plain HTML forms). */
  defaultValue?: string;
  /** Controlled selection; requires `onValueChange` and a client parent. */
  value?: string;
  onValueChange?: (value: string) => void;
  hint?: ReactNode;
  /** Error message(s), e.g. `fieldErrors.board` from an `ActionResult`. */
  error?: string | readonly string[] | null;
  /**
   * Id(s) of a description rendered elsewhere, e.g. a form-level error region, added to the group's
   * `aria-describedby` after the hint and the group's own error.
   */
  describedBy?: string;
  required?: boolean;
  appearance?: RadioAppearance;
  /** Layout of the options. Card groups default to a responsive grid. */
  orientation?: "vertical" | "horizontal";
  className?: string;
  children?: ReactNode;
}

/**
 * Accessible radio group: `<fieldset>` + `<legend>`, with hint and error linked via `aria-describedby`.
 * Server-compatible when uncontrolled.
 */
export function RadioGroup({
  legend,
  legendHidden = false,
  name,
  options,
  defaultValue,
  value,
  onValueChange,
  hint,
  error,
  describedBy: externalDescribedBy,
  required,
  appearance = "default",
  orientation = "vertical",
  className,
  children,
}: RadioGroupProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errors = normaliseErrors(error);
  const errorId = errors.length > 0 ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId, externalDescribedBy].filter(Boolean).join(" ") || undefined;
  const controlled = value !== undefined;

  return (
    <fieldset className={cn("min-w-0", className)} aria-describedby={describedBy}>
      <legend className={cn("text-sm font-medium text-text", legendHidden ? "sr-only" : "mb-1")}>
        {legend}
        {required && <span className="sr-only"> (required)</span>}
      </legend>
      {hint && (
        <p id={hintId} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      <div
        className={cn(
          appearance === "card" && orientation === "vertical" && "grid grid-cols-1 gap-3 sm:grid-cols-2",
          appearance === "card" && orientation === "horizontal" && "flex flex-wrap gap-3",
          appearance === "default" && (orientation === "horizontal" ? "flex flex-wrap gap-x-6" : "flex flex-col"),
        )}
      >
        {options?.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            required={required}
            appearance={appearance}
            {...(controlled
              ? { checked: value === option.value, onChange: () => onValueChange?.(option.value) }
              : { defaultChecked: defaultValue === option.value })}
          />
        ))}
        {children}
      </div>
      {errorId && (
        <div id={errorId} className="mt-2 flex gap-1.5 text-sm text-danger-text">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{errors.join(" ")}</span>
        </div>
      )}
    </fieldset>
  );
}

function normaliseErrors(error: string | readonly string[] | null | undefined): string[] {
  if (!error) return [];
  return typeof error === "string" ? [error] : error.filter(Boolean);
}
