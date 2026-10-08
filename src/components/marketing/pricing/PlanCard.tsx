import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { RichContent } from "@/components/content/RichContent";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";
import type { PricingPlan } from "@/server/marketing/pricing";
import { headlinePrice, planPriceStatus, type PriceOption } from "@/server/marketing/pricing-core";

export const PRICING_COMING_SOON = "Pricing coming soon";

/** The price block of a plan in one currency: headline price, other billing periods, or an honest placeholder. */
export function PlanPrice({ plan, currency, showAllPrices = true }: { plan: PricingPlan; currency: string | null; showAllPrices?: boolean }) {
  const status = currency ? planPriceStatus(plan, currency) : plan.isDefault ? "free" : "coming_soon";
  if (status === "free") {
    return (
      <p className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-text">Free</span>
      </p>
    );
  }
  if (status === "coming_soon" || !currency) {
    return <p className="text-lg font-semibold text-muted">{PRICING_COMING_SOON}</p>;
  }
  const prices = plan.prices[currency] ?? [];
  const headline = headlinePrice(prices);
  if (!headline) return <p className="text-lg font-semibold text-muted">{PRICING_COMING_SOON}</p>;
  const others = prices.filter((price) => price.id !== headline.id && price.amountMinor > 0);
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-3xl font-bold tracking-tight text-text tabular-nums">{headline.amountLabel}</span>
        <span className="text-sm text-muted">{headline.periodLabel}</span>
      </p>
      {headline.label && <p className="mt-1 text-sm font-medium text-accent-text">{headline.label}</p>}
      {headline.minSeats !== null && headline.perSeat && <p className="mt-1 text-sm text-muted">Minimum {formatCount(headline.minSeats, "learner")}</p>}
      {showAllPrices && others.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {others.map((price) => (
            <OtherPrice key={price.id} price={price} />
          ))}
        </ul>
      )}
    </div>
  );
}

function OtherPrice({ price }: { price: PriceOption }) {
  return (
    <li>
      or <span className="font-semibold text-text tabular-nums">{price.amountLabel}</span> {price.periodLabel}
      {price.label && <span className="text-accent-text"> · {price.label}</span>}
    </li>
  );
}

export interface PlanCardProps {
  plan: PricingPlan;
  currency: string | null;
  /** Heading level of the plan name in the page outline. */
  headingLevel?: "h2" | "h3";
  /** Highlight this plan (e.g. the most complete individual plan): a stronger border, no claims attached. */
  emphasis?: boolean;
  /** Max bullet points (default 6). */
  maxFeatures?: number;
  /** Show the CMS description. */
  showDescription?: boolean;
  /** Calls to action at the foot of the card. */
  actions?: ReactNode;
  className?: string;
}

/** One plan: name, tagline, price in the chosen currency, admin highlights (or entitlement-derived features), CTA. */
export function PlanCard({ plan, currency, headingLevel = "h3", emphasis = false, maxFeatures = 6, showDescription = false, actions, className }: PlanCardProps) {
  const Heading = headingLevel;
  const bullets = (plan.highlights.length > 0 ? plan.highlights : plan.features).slice(0, maxFeatures);
  return (
    <article className={cn("flex h-full flex-col rounded-card border bg-surface p-5 sm:p-6", emphasis ? "border-primary shadow-md" : "border-border", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Heading className="text-lg font-bold tracking-tight text-text">{plan.name}</Heading>
        {plan.trialDays > 0 && (
          <Badge tone="accent" size="sm">
            {formatCount(plan.trialDays, "day")} free trial
          </Badge>
        )}
      </div>
      {plan.tagline && <p className="mt-1 text-sm text-muted">{plan.tagline}</p>}
      <div className="mt-5">
        <PlanPrice plan={plan} currency={currency} />
      </div>
      {showDescription && plan.descriptionHtml && <RichContent html={plan.descriptionHtml} className="mt-4 text-sm" />}
      {bullets.length > 0 && (
        <ul className="mt-5 space-y-2.5 text-sm">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-text">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {actions && <div className="mt-auto flex flex-col gap-2 pt-6">{actions}</div>}
    </article>
  );
}
