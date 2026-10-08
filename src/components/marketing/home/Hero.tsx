import { ArrowRight } from "lucide-react";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { APP_TAGLINE } from "@/lib/config";
import { heroSupportingLine } from "../copy";
import { Illustration } from "../Illustration";
import { DIAGNOSTIC_SIGN_UP_HREF, SIGN_UP_HREF } from "../site-nav";

export interface HeroProps {
  /** Context line from the catalogue, e.g. "ZIMSEC and Cambridge · O-Level and A-Level". */
  eyebrow: string | null;
  /** A default (free) plan exists, so "start free" is literally true. */
  hasFreePlan: boolean;
  /** AI features are switched on (`features.ai`): the supporting line may mention AI tutoring. Default false. */
  aiEnabled?: boolean;
}

/** Home hero (§45): "Master Your Exams.", the supporting line, Start free and the free diagnostic. */
export function Hero({ eyebrow, hasFreePlan, aiEnabled = false }: HeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-border">
      <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full" opacity={0.05} />
      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
        <div>
          {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
          <h1 id="hero-heading" className="mt-3 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            {APP_TAGLINE}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{heroSupportingLine(aiEnabled)}</p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <ButtonLink href={SIGN_UP_HREF} size="lg" iconEnd={<ArrowRight aria-hidden="true" />}>
              Start free
            </ButtonLink>
            <ButtonLink href={DIAGNOSTIC_SIGN_UP_HREF} size="lg" variant="outline">
              Take the free diagnostic
            </ButtonLink>
          </div>
          {hasFreePlan && <p className="mt-4 text-sm text-muted">Start on the free plan and upgrade only if you need more.</p>}
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <Illustration
            name="hero"
            alt="A practice question being checked, next to a progress ring and an exam timer"
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
