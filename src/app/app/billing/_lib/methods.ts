import "server-only";
import { CHECKOUT_METHOD_IDS, type CheckoutMethodId, type CheckoutMethodView } from "@/components/billing/checkout-state";
import type { FeatureFlags } from "@/lib/features";
import { listAvailableProviders } from "@/server/billing/providers/registry";
import type { PaymentMethod, PaymentProviderId } from "@/server/billing/providers/types";
import { getEnv, type ServerEnv } from "@/server/lib/env";

/**
 * Payment methods a student can choose (§32, ARCHITECTURE §7.1), mapped onto the provider registry: EcoCash and
 * OneMoney through Paynow mobile express checkout, other Paynow options (Visa / Mastercard / ZimSwitch) on the Paynow
 * page, and two sandbox methods that exist only outside production. A method is offered only when its provider is
 * enabled and can take at least one of the offered currencies. The dormant Stripe card method is offered only while
 * `features.stripe` is on (pass `options.features`; without flags it never is).
 *
 * TODO(shared): the parent checkout (src/server/family/billing.ts) keeps an equivalent list; one shared catalogue in
 * `src/server/billing/methods.ts` would serve both.
 */

export interface MethodDefinition {
  id: CheckoutMethodId;
  provider: PaymentProviderId;
  /** Paynow mobile express checkout method (also simulated by the sandbox). */
  paynowMethod: "ecocash" | "onemoney" | null;
  /** Method key for `provider.supports()`. */
  method: PaymentMethod | undefined;
  label: string;
  description: string;
  needsPhone: boolean;
  test: boolean;
}

export const METHOD_DEFINITIONS: readonly MethodDefinition[] = [
  {
    id: "paynow_ecocash",
    provider: "paynow",
    paynowMethod: "ecocash",
    method: "ecocash",
    label: "EcoCash",
    description: "Approve the payment on your phone with your EcoCash PIN.",
    needsPhone: true,
    test: false,
  },
  {
    id: "paynow_onemoney",
    provider: "paynow",
    paynowMethod: "onemoney",
    method: "onemoney",
    label: "OneMoney",
    description: "Approve the payment on your phone with your OneMoney PIN.",
    needsPhone: true,
    test: false,
  },
  {
    id: "paynow_web",
    provider: "paynow",
    paynowMethod: null,
    method: undefined,
    label: "Card or ZimSwitch",
    description: "Visa, Mastercard or ZimSwitch on the secure Paynow page.",
    needsPhone: false,
    test: false,
  },
  {
    id: "stripe_card",
    provider: "stripe",
    paynowMethod: null,
    method: "card",
    label: "International card",
    description: "Visa or Mastercard on a secure payment page.",
    needsPhone: false,
    test: false,
  },
  {
    id: "sandbox_web",
    provider: "sandbox",
    paynowMethod: null,
    method: undefined,
    label: "Test payment page",
    description: "Development only. No real money moves.",
    needsPhone: false,
    test: true,
  },
  {
    id: "sandbox_ecocash",
    provider: "sandbox",
    paynowMethod: "ecocash",
    method: "ecocash",
    label: "Test mobile-money prompt",
    description: "Development only. Simulates an EcoCash approval.",
    needsPhone: true,
    test: true,
  },
];

export function methodDefinition(id: string): MethodDefinition | undefined {
  return (CHECKOUT_METHOD_IDS as readonly string[]).includes(id) ? METHOD_DEFINITIONS.find((method) => method.id === id) : undefined;
}

/** Test (sandbox) methods are never offered in production, whatever the provider configuration says. */
export function testMethodsAllowed(env: Pick<ServerEnv, "NODE_ENV">): boolean {
  return env.NODE_ENV !== "production";
}

/**
 * Methods usable for at least one of `currencies`, in display order. `onlyProviders` narrows them further (one-off
 * "Full access" purchases are paid through Paynow only: `PLAN_PURCHASE_PROVIDERS`).
 */
export function availableCheckoutMethods(
  currencies: readonly string[],
  options: { env?: ServerEnv; onlyProviders?: ReadonlySet<string>; features?: FeatureFlags } = {},
): CheckoutMethodView[] {
  const env = options.env ?? getEnv();
  const providers = listAvailableProviders({ ...(options.env ? { env } : {}), ...(options.features ? { features: options.features } : {}) });
  const out: CheckoutMethodView[] = [];
  for (const definition of METHOD_DEFINITIONS) {
    if (definition.test && !testMethodsAllowed(env)) continue;
    if (options.onlyProviders && !options.onlyProviders.has(definition.provider)) continue;
    const provider = providers.find((candidate) => candidate.id === definition.provider);
    if (!provider) continue;
    const supported = currencies.filter((currency) => provider.supports(currency, definition.method));
    if (supported.length === 0) continue;
    out.push({
      id: definition.id,
      label: definition.label,
      description: definition.description,
      needsPhone: definition.needsPhone,
      test: definition.test,
      currencies: supported,
    });
  }
  return out;
}
