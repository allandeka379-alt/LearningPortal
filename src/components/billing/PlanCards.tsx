import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/button-styles";
import { Card, CardBody } from "@/components/ui/Card";
import type { CheckoutPriceOption } from "./checkout-state";
import { formatPrice } from "./format";

export interface PlanCardView {
  id: string;
  name: string;
  tagline: string | null;
  highlights: string[];
  prices: CheckoutPriceOption[];
  current: boolean;
  isFree: boolean;
}

/** Checkout link for one price. */
export function checkoutHref(planPriceId: string): string {
  return `/app/billing/checkout?price=${encodeURIComponent(planPriceId)}`;
}

/**
 * Plans a student can move to (§31). Names, taglines, highlights and every price (USD, ZWG…) come from the admin-managed
 * catalogue; a plan without a price says so instead of inventing one (rule 6). Each price links to checkout.
 * Server component.
 */
export function PlanCards({ plans }: { plans: readonly PlanCardView[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <li key={plan.id} className="min-w-0">
          <Card as="article" className={plan.current ? "h-full border-primary" : "h-full"} aria-labelledby={`plan-${plan.id}`}>
            <CardBody className="flex h-full flex-col gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 id={`plan-${plan.id}`} className="text-lg font-semibold text-text">
                    {plan.name}
                  </h3>
                  {plan.current && (
                    <Badge tone="primary" size="sm">
                      Your plan
                    </Badge>
                  )}
                </div>
                {plan.tagline && <p className="text-sm text-muted">{plan.tagline}</p>}
              </div>
              {plan.highlights.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-sm text-text">
                  {plan.highlights.slice(0, 6).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              <div className="mt-auto space-y-2">
                {plan.isFree ? (
                  <p className="text-sm font-medium text-text">Free{plan.current ? "" : " for every student"}</p>
                ) : plan.prices.length === 0 ? (
                  <p className="text-sm text-muted">Price not set yet. Please check back soon.</p>
                ) : (
                  <ul className="space-y-2">
                    {plan.prices.map((price) => (
                      <li key={price.planPriceId}>
                        <Link
                          href={checkoutHref(price.planPriceId)}
                          className={buttonStyles({ variant: plan.current ? "outline" : "primary", fullWidth: true, className: "justify-between" })}
                        >
                          <span className="text-left">
                            {plan.current ? "Renew · " : ""}
                            {formatPrice(price)}
                            {price.label && <span className="block text-xs font-normal opacity-90">{price.label}</span>}
                          </span>
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
}
