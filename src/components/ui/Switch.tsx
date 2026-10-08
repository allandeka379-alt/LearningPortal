"use client";

import { useId, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onChange" | "value" | "defaultValue" | "children" | "type"> {
  label: ReactNode;
  description?: ReactNode;
  /** Controlled state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Form field name. Like a checkbox, the value is only submitted when ON, so server actions can use
   * `formData.has(name)`.
   */
  name?: string;
  value?: string;
}

/**
 * On/off toggle for settings that apply immediately (`<button role="switch">`). The visible label is a real
 * `<label>` for the button, so clicking the text toggles it and it doubles as the accessible name.
 */
export function Switch({
  label,
  description,
  checked,
  defaultChecked = false,
  onCheckedChange,
  name,
  value = "on",
  disabled,
  id,
  className,
  onClick,
  ...props
}: SwitchProps) {
  const autoId = useId();
  const buttonId = id ?? autoId;
  const descriptionId = description ? `${buttonId}-description` : undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const isOn = checked ?? internal;

  return (
    <div className={cn("flex min-h-11 items-start justify-between gap-4 py-2", className)}>
      <span className="min-w-0">
        <label
          htmlFor={buttonId}
          className={cn("block text-sm font-medium text-text", disabled ? "cursor-not-allowed" : "cursor-pointer")}
        >
          {label}
        </label>
        {description && (
          <span id={descriptionId} className="mt-0.5 block text-sm text-muted">
            {description}
          </span>
        )}
      </span>
      <button
        {...props}
        type="button"
        role="switch"
        id={buttonId}
        aria-checked={isOn}
        aria-describedby={descriptionId}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          const next = !isOn;
          if (checked === undefined) setInternal(next);
          onCheckedChange?.(next);
        }}
        className="group relative mt-0.5 inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-transparent bg-border-strong transition-colors duration-150 after:absolute after:-inset-2.5 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-primary"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none size-5 translate-x-0.5 rounded-full bg-surface shadow-sm transition-transform duration-150 group-aria-checked:translate-x-[1.375rem]"
        />
      </button>
      {name && isOn && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
