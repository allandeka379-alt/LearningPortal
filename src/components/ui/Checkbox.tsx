import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label: ReactNode;
  description?: ReactNode;
  invalid?: boolean;
}

/**
 * Native checkbox (tinted with `accent-color`) with its label. The whole row is the click/touch target (≥44px).
 * Server-compatible: `useId` is available in Server Components.
 */
export function Checkbox({
  label,
  description,
  invalid,
  className,
  id,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(" ") || undefined;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex min-h-11 items-start gap-3 py-2.5",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      )}
    >
      <input
        type="checkbox"
        id={inputId}
        disabled={disabled}
        className="mt-0.5 size-5 shrink-0 cursor-[inherit] accent-primary"
        {...props}
        aria-invalid={invalid || ariaInvalid || undefined}
        aria-describedby={describedBy}
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-text">{label}</span>
        {description && (
          <span id={descriptionId} className="mt-0.5 block text-sm text-muted">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
