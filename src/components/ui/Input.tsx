import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { controlStyles } from "./control-styles";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  /** Sets `aria-invalid`. Usually supplied automatically by `Field`. */
  invalid?: boolean;
  /** Decorative icon inside the start of the input (e.g. a search glass). */
  startIcon?: ReactNode;
}

/**
 * Single-line text input (44px tall). Wrap it in `Field` for label/hint/error wiring.
 * `ref` is a regular prop in React 19, so it is forwarded through `...props`.
 */
export function Input({ invalid, startIcon, className, type = "text", "aria-invalid": ariaInvalid, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      className={cn(controlStyles, "min-h-11 px-3.5 py-2", startIcon ? "pl-10" : undefined, !startIcon && className)}
      {...props}
      aria-invalid={invalid || ariaInvalid || undefined}
    />
  );
  if (!startIcon) return input;
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted [&_svg]:size-4.5"
      >
        {startIcon}
      </span>
      {input}
    </div>
  );
}
