import type { ReactNode } from "react";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";

export interface CurriculumHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  /** Context line above the title, e.g. "ZIMSEC · O-Level" (from data). */
  eyebrow?: ReactNode;
  /** The page's single `<h1>`. */
  title: ReactNode;
  /** One or two sentences under the title. */
  lead?: ReactNode;
  /** Small facts row (badges: syllabus code, version, "Coming soon"). */
  meta?: ReactNode;
  /** Calls to action (stack on phones). */
  actions?: ReactNode;
}

/**
 * Header block of the public curriculum pages: breadcrumbs, eyebrow, h1, lead, facts and actions, closed by one quiet
 * chevron band (the only motif on the page besides the footer's). Server component.
 */
export function CurriculumHero({ breadcrumbs, eyebrow, title, lead, meta, actions }: CurriculumHeroProps) {
  return (
    <header className="relative border-b border-border bg-surface">
      <Container className="pt-5 pb-8 sm:pt-6 sm:pb-10">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 max-w-3xl space-y-3 sm:mt-8">
          {eyebrow && <p className="text-sm font-semibold tracking-wide text-primary">{eyebrow}</p>}
          <h1 className="text-3xl font-bold tracking-tight text-balance break-words text-text sm:text-4xl">{title}</h1>
          {lead && <div className="max-w-2xl text-base text-pretty text-muted sm:text-lg">{lead}</div>}
          {meta && <div className="flex flex-wrap items-center gap-2 pt-1">{meta}</div>}
        </div>
        {actions && <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">{actions}</div>}
      </Container>
      <ChevronPattern variant="band" tone="accent" opacity={0.35} className="absolute inset-x-0 bottom-0" />
    </header>
  );
}
