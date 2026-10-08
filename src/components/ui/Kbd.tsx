import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Keyboard key hint, e.g. `<Kbd>Esc</Kbd>` in exam-mode shortcut help. */
export function Kbd({ className, ...props }: ComponentPropsWithoutRef<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-6 items-center justify-center rounded-md border border-border border-b-2 bg-subtle px-1.5 py-px font-mono text-xs font-medium text-text",
        className,
      )}
      {...props}
    />
  );
}
