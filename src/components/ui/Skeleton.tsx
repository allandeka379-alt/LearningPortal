import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Loading placeholder block. Decorative (`aria-hidden`): mark the loading region itself with `aria-busy="true"`
 * and give it an accessible loading message (e.g. a `Spinner` with a label) where appropriate.
 */
export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-subtle", className)} {...props} />;
}

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

/** A paragraph-shaped skeleton; the last line is shorter so it reads as text. */
export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div aria-hidden="true" className={cn("space-y-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className={cn("h-3.5 animate-pulse rounded bg-subtle", i === lines - 1 && lines > 1 ? "w-3/5" : "w-full")} />
      ))}
    </div>
  );
}
