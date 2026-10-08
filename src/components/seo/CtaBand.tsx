import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export interface CtaBandProps {
  title: ReactNode;
  description?: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}

/**
 * Closing call to action of a public page: calm, one primary action on the brand colour. The secondary action is an
 * outline link drawn for the dark surface (button primitives don't accept colour overrides). Server component.
 */
export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <Container className="mt-14 sm:mt-16">
      <section aria-labelledby="cta-heading" className="rounded-card bg-primary px-5 py-8 text-on-primary sm:px-10 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 id="cta-heading" className="text-2xl font-bold tracking-tight text-balance">
              {title}
            </h2>
            {description && <p className="text-pretty opacity-90">{description}</p>}
          </div>
          <div className="flex shrink-0 flex-col gap-3 min-[420px]:flex-row">
            <ButtonLink href={primary.href} variant="accent" size="lg">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex min-h-12 items-center justify-center rounded-control border border-on-primary/60 px-6 text-base font-semibold text-on-primary transition-colors duration-150 hover:bg-on-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
