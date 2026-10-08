import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { controlStyles } from "./control-styles";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  /** Sets `aria-invalid`. Usually supplied automatically by `Field`. */
  invalid?: boolean;
  /** Convenience alternative to `<option>` children. */
  options?: readonly SelectOption[];
  /**
   * Adds an empty first option (value `""`). Combined with `required`, native validation rejects it, so the
   * placeholder can never be submitted as a real choice.
   */
  placeholder?: string;
}

/**
 * Native `<select>` with the design-system look. Native on purpose: best keyboard/screen-reader support and the
 * OS picker on phones, at zero JS cost.
 */
export function Select({
  invalid,
  options,
  placeholder,
  className,
  children,
  "aria-invalid": ariaInvalid,
  ...props
}: SelectProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        className={cn(controlStyles, "min-h-11 appearance-none py-2 pr-10 pl-3.5")}
        {...props}
        aria-invalid={invalid || ariaInvalid || undefined}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4.5 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
