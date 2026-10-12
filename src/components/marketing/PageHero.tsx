import type { ReactNode } from "react";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

export interface PageHeroProps {
  /** Unique id for the h1 (the section is labelled by it). */
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Calls to action under the text. */
  actions?: ReactNode;
  /** Optional visual on the right from `lg`. */
  aside?: ReactNode;
  className?: string;
}

/**
 * Hero band for the marketing pages below the home page (/how-it-works, /exam-candidates, /about): eyebrow, h1,
 * supporting text and actions on the chevron field, with an optional visual. One pattern so the pages read as one site.
 */
export function PageHero({ id, eyebrow, title, description, actions, aside, className }: PageHeroProps) {
  return (
    <section aria-labelledby={id} className={cn("relative overflow-hidden border-b border-border", className)}>
      <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full" opacity={0.05} />
      <Container className={cn("relative grid items-center gap-10 py-12 sm:py-16 lg:py-20", aside && "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16")}>
        <div className="max-w-2xl">
          {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
          <h1 id={id} className="mt-3 text-3xl font-bold tracking-tight text-balance text-text sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">{description}</div>}
          {actions && <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">{actions}</div>}
        </div>
        {aside}
      </Container>
    </section>
  );
}
