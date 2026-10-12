import { ArrowRight } from "lucide-react";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { joinLabel } from "./copy";
import { HOW_IT_WORKS_HREF, SIGN_UP_HREF } from "./site-nav";

export interface FinalCtaProps {
  title?: string;
  description?: string;
  /** The one-off Full access price from the database ("US$1"), or null when nothing is on sale. */
  priceLabel?: string | null;
}

/** Closing call to action (§45): join for the monthly price, or read how it works first. */
export function FinalCta({
  title = "Start learning today",
  description = "Create your account, tell us your form and subjects, and pick up your first lesson in minutes.",
  priceLabel = null,
}: FinalCtaProps) {
  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-primary-soft">
      <ChevronPattern variant="band" tone="primary" opacity={0.35} />
      <Container className="flex flex-col items-start gap-6 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="final-cta-heading" className="text-2xl font-bold tracking-tight text-on-primary-soft sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-on-primary-soft sm:text-lg">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row">
          <ButtonLink href={SIGN_UP_HREF} size="lg" iconEnd={<ArrowRight aria-hidden="true" />}>
            {joinLabel(priceLabel)}
          </ButtonLink>
          <ButtonLink href={HOW_IT_WORKS_HREF} size="lg" variant="outline" className="bg-surface">
            How it works
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
