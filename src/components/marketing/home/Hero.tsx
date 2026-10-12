import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { APP_TAGLINE } from "@/lib/config";
import { hasStats, roundedCount, type ContentStats, type MarketingForm } from "@/server/marketing/learning-core";
import { heroSupportingLine, joinLabel, PAYMENT_METHODS_LINE } from "../copy";
import { HOW_IT_WORKS_HREF, SIGN_UP_HREF } from "../site-nav";
import { ProductPreview } from "./ProductPreview";

export interface HeroProps {
  /** Context line from the catalogue, e.g. "ZIMSEC and Cambridge · O-Level and A-Level". */
  eyebrow: string | null;
  /** The one-off Full access price from the database ("US$1"), or null when nothing is on sale. */
  priceLabel: string | null;
  /** School years from the database (Form 3 ... Upper Sixth) for the "I am in" shortcuts. */
  forms: readonly MarketingForm[];
  /** Real published-content counts; the strip is hidden until there is content. */
  stats: ContentStats | null;
  /** AI features are switched on (`features.ai`): the supporting line may mention AI tutoring. Default false. */
  aiEnabled?: boolean;
}

/** Short label for a year chip: "Lower Sixth (Form 5)" -> "Form 5", "Form 3" stays. */
export function formChipLabel(name: string): string {
  const inBrackets = /\((Form \d+)\)/.exec(name)?.[1];
  return inBrackets ?? name;
}

/**
 * Home hero (§45, owner brief 2026-10-12): learning-first headline, the supporting line, the one paid call to action
 * with its DATABASE price, shortcuts per school year, a product preview and real content counts.
 */
export function Hero({ eyebrow, priceLabel, forms, stats, aiEnabled = false }: HeroProps) {
  const showStats = stats !== null && hasStats(stats);
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-border">
      <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full" opacity={0.05} />
      <Container className="relative grid items-center gap-12 pt-10 pb-12 sm:pt-14 sm:pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-20 lg:pb-20">
        <div>
          {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
          <h1 id="hero-heading" className="mt-3 text-4xl font-bold tracking-tight text-balance text-text sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            {APP_TAGLINE}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{heroSupportingLine(aiEnabled)}</p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <ButtonLink href={SIGN_UP_HREF} size="lg" iconEnd={<ArrowRight aria-hidden="true" />}>
              {joinLabel(priceLabel)}
            </ButtonLink>
            <ButtonLink href={HOW_IT_WORKS_HREF} size="lg" variant="outline">
              See how it works
            </ButtonLink>
          </div>
          {priceLabel && <p className="mt-4 text-sm text-muted">{PAYMENT_METHODS_LINE}</p>}

          {forms.length > 0 && (
            <nav aria-label="Courses by school year" className="mt-8">
              <p className="text-sm font-semibold text-text">I am in</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {forms.map((form) => (
                  <li key={form.code}>
                    <Link
                      href={`/#form-${form.code.toLowerCase()}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                    >
                      {formChipLabel(form.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        <ProductPreview />
      </Container>

      {showStats && stats && (
        <div className="relative border-t border-border bg-surface">
          <Container>
            <dl className="grid grid-cols-2 divide-border py-6 sm:grid-cols-4 sm:divide-x sm:py-7">
              <Stat value={roundedCount(stats.subjects)} label="subject courses" />
              <Stat value={roundedCount(stats.lessons)} label="lessons" />
              <Stat value={roundedCount(stats.questions)} label="practice questions" />
              <Stat value={roundedCount(stats.tests)} label="topic tests and mocks" />
            </dl>
          </Container>
        </div>
      )}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col-reverse px-2 py-2 text-center sm:px-6">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-2xl font-bold tracking-tight text-text tabular-nums sm:text-3xl">{value}</dd>
    </div>
  );
}
