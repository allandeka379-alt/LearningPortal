import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A top-level showcase section with an anchor id (linked from the table of contents). */
export function ShowcaseSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-border pt-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight text-text">
        {title}
      </h2>
      {description && <p className="mt-1.5 max-w-2xl text-muted">{description}</p>}
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

/** One labelled specimen panel. */
export function Specimen({
  title,
  note,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("rounded-card border border-border bg-surface", className)}>
      <div className="border-b border-border px-4 py-3 sm:px-5">
        <h3 className="text-sm font-semibold text-text">{title}</h3>
        {note && <p className="mt-0.5 text-sm text-muted">{note}</p>}
      </div>
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Small caption under a specimen item. */
export function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 font-mono text-xs text-muted">{children}</p>;
}
