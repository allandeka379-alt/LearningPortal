import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionProps {
  /** Stable id: the heading gets `${id}-heading` (in-page links and `aria-labelledby`). */
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned link or button next to the heading (wraps under it on phones). */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A titled page section (`<section aria-labelledby>` + `<h2>`). Server component. */
export function Section({ id, title, description, action, className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-24", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="min-w-0 space-y-1">
          <h2 id={headingId} className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
            {title}
          </h2>
          {description && <p className="max-w-2xl text-sm text-muted sm:text-base">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-4 sm:mt-5">{children}</div>
    </section>
  );
}
