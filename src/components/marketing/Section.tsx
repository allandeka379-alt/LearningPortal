import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

export interface SectionProps {
  /** Anchor id (also used to label the section). */
  id: string;
  title: ReactNode;
  /** Small context line above the title. */
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** `plain` (page background), `surface` (white band), `subtle` (sunken band). */
  tone?: "plain" | "surface" | "subtle";
  /** Right-aligned action next to the heading on wide screens (e.g. "See all subjects"). */
  action?: ReactNode;
  /** Centre the heading block (CTA-style sections). */
  centered?: boolean;
  className?: string;
  children?: ReactNode;
}

const TONES = {
  plain: "bg-bg",
  surface: "border-y border-border bg-surface",
  subtle: "bg-subtle",
} as const;

/**
 * One marketing section: a labelled `<section>` with an h2 heading block and generous, mobile-first spacing.
 * Server component.
 */
export function Section({ id, title, eyebrow, description, tone = "plain", action, centered = false, className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-14 sm:py-20", TONES[tone], className)}>
      <Container>
        <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", centered && "items-center text-center sm:flex-col sm:items-center")}>
          <div className={cn("max-w-2xl space-y-3", centered && "mx-auto")}>
            {eyebrow && <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>}
            <h2 id={headingId} className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              {title}
            </h2>
            {description && <div className="text-base leading-relaxed text-muted sm:text-lg">{description}</div>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children && <div className="mt-8 sm:mt-10">{children}</div>}
      </Container>
    </section>
  );
}

/** Numbered or ticked feature list item used inside marketing sections. */
export function FeatureItem({ icon, title, children }: { icon: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-4.5">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-text">{title}</p>
        {children && <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>}
      </div>
    </li>
  );
}
