import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Content for assistive technology only (screen-reader text next to icons, dashes, colour cues). */
export function VisuallyHidden({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={cn("sr-only", className)} {...props} />;
}
