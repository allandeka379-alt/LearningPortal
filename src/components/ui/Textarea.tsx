import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { controlStyles } from "./control-styles";

export interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  /** Sets `aria-invalid`. Usually supplied automatically by `Field`. */
  invalid?: boolean;
}

/** Multi-line text input; vertically resizable. Wrap it in `Field`. */
export function Textarea({ invalid, className, rows = 4, "aria-invalid": ariaInvalid, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(controlStyles, "min-h-24 resize-y px-3.5 py-2.5 leading-relaxed", className)}
      {...props}
      aria-invalid={invalid || ariaInvalid || undefined}
    />
  );
}
