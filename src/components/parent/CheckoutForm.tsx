"use client";

import { Smartphone } from "lucide-react";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { fieldErrorsOf } from "@/components/family/action-state";
import { keepValuesSubmit } from "@/components/family/keep-values-submit";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Radio } from "@/components/ui/RadioGroup";
import { isLifetimePrice, LIFETIME_PRICE_NOTE } from "@/lib/billing/offer";
import type { CheckoutMethodOption, CheckoutPlanOption } from "@/server/family/billing";
import { isSafeNavigation, type CheckoutFormAction } from "./checkout-state";
import { describeBillingPeriod, formatMoney } from "./format";

export interface CheckoutFormProps {
  studentUserId: string;
  childName: string;
  plans: readonly CheckoutPlanOption[];
  methods: readonly CheckoutMethodOption[];
  action: CheckoutFormAction;
  /** Fresh Idempotency-Key from the server render (a double tap returns the same payment). */
  idempotencyKey: string;
  /** Navigation hook (tests); default `window.location.assign`. */
  navigate?: (url: string) => void;
}

/**
 * "Subscribe for this child" checkout (§21, §31, §32): choose a plan price, then how to pay (EcoCash / OneMoney via
 * Paynow, other Paynow options, card), with the wallet number when mobile money is chosen. The amount is never sent:
 * the server takes it from the price. A browser checkout opens with a GET navigation (CSP `form-action 'self'`), a
 * mobile-money checkout shows the approval instructions and a link to the payment status page. Methods that cannot
 * take the chosen price's currency are disabled with the reason.
 */
export function CheckoutForm({ studentUserId, childName, plans, methods, action, idempotencyKey, navigate }: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const firstPrice = plans[0]?.prices[0];
  const [priceId, setPriceId] = useState<string | undefined>(firstPrice?.planPriceId);
  const [methodId, setMethodId] = useState<string | undefined>(undefined);
  // Each finished attempt (error or mobile prompt) gets a new key, so a changed choice is a new checkout, while a
  // double tap during one attempt reuses the key (state only changes when an attempt completes).
  const [attempt, setAttempt] = useState(0);
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    setAttempt((value) => value + 1);
  }
  const key = `${idempotencyKey}-${attempt}`;
  const handled = useRef<unknown>(null);

  const selectedPrice = useMemo(() => plans.flatMap((plan) => plan.prices).find((price) => price.planPriceId === priceId), [plans, priceId]);
  const usable = (method: CheckoutMethodOption) => (selectedPrice ? method.currencies.includes(selectedPrice.currency) : true);
  const selectedMethod = methods.find((method) => method.id === methodId && usable(method));

  useEffect(() => {
    if (state === null || handled.current === state) return;
    handled.current = state;
    if (state.ok && state.data.kind === "redirect" && isSafeNavigation(state.data.url)) {
      (navigate ?? ((url: string) => window.location.assign(url)))(state.data.url);
    }
  }, [state, navigate]);

  if (state?.ok && state.data.kind === "mobile") {
    return (
      <div className="space-y-4" role="status">
        <Alert tone="info" icon={<Smartphone aria-hidden="true" />} title="Approve the payment on your phone">
          {state.data.instructions}
        </Alert>
        <p className="text-sm text-muted">
          Once you approve it, {childName}&rsquo;s plan starts as soon as the payment is confirmed. This can take a minute.
        </p>
        <ButtonLink href={state.data.resultHref}>Check payment status</ButtonLink>
      </div>
    );
  }

  const redirecting = state?.ok === true && state.data.kind === "redirect";

  const priceErrors = fieldErrorsOf(state, "planPriceId");
  const methodErrors = fieldErrorsOf(state, "methodId") ?? fieldErrorsOf(state, "provider");
  const phoneErrors = fieldErrorsOf(state, "phone");

  return (
    // Submitted through onSubmit (not `action=`): React would otherwise reset the form after every attempt, clearing the
    // wallet number and the visible radio selection while a failed attempt is corrected.
    <form method="post" onSubmit={keepValuesSubmit(formAction)} className="space-y-6">
      <input type="hidden" name="studentUserId" value={studentUserId} />
      <input type="hidden" name="idempotencyKey" value={key} />

      <fieldset className="min-w-0 space-y-3" aria-describedby={priceErrors ? "checkout-price-error" : undefined}>
        <legend className="text-base font-semibold text-text">1. What you are buying for {childName}</legend>
        {plans.map((plan) => (
          <div key={plan.planId} className="space-y-2">
            <p className="text-sm font-semibold text-text">
              {plan.name}
              {plan.tagline && <span className="font-normal text-muted"> · {plan.tagline}</span>}
            </p>
            {plan.highlights.length > 0 && (
              <ul className="list-disc space-y-0.5 pl-5 text-sm text-muted">
                {plan.highlights.slice(0, 4).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              {plan.prices.map((price) => (
                <Radio
                  key={price.planPriceId}
                  appearance="card"
                  name="planPriceId"
                  value={price.planPriceId}
                  checked={priceId === price.planPriceId}
                  onChange={() => setPriceId(price.planPriceId)}
                  label={`${formatMoney(price.amountMinor, price.currency)} ${isLifetimePrice(price) ? `· ${LIFETIME_PRICE_NOTE}` : describeBillingPeriod(price)}`}
                  description={price.label ?? undefined}
                />
              ))}
            </div>
          </div>
        ))}
        {priceErrors && (
          <p id="checkout-price-error" className="text-sm text-danger-text">
            {priceErrors[0]}
          </p>
        )}
      </fieldset>

      <fieldset className="min-w-0 space-y-3" aria-describedby={methodErrors ? "checkout-method-error" : undefined}>
        <legend className="text-base font-semibold text-text">2. How would you like to pay?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {methods.map((method) => {
            const disabled = !usable(method);
            return (
              <Radio
                key={method.id}
                appearance="card"
                name="methodId"
                value={method.id}
                checked={methodId === method.id && !disabled}
                disabled={disabled}
                onChange={() => setMethodId(method.id)}
                label={method.label}
                description={disabled && selectedPrice ? `Can't take ${selectedPrice.currency} payments.` : method.description}
              />
            );
          })}
        </div>
        {methodErrors && (
          <p id="checkout-method-error" className="text-sm text-danger-text">
            {methodErrors[0]}
          </p>
        )}
      </fieldset>

      {selectedMethod?.needsPhone && (
        <Field label="Mobile number to charge" hint="The number on the wallet, e.g. 0771234567. We only store it masked." error={phoneErrors} required>
          <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} className="sm:max-w-xs" />
        </Field>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={!selectedPrice || !selectedMethod || redirecting} loading={pending || redirecting} loadingText={redirecting ? "Opening payment page…" : "Starting payment…"}>
          {selectedPrice ? `Pay ${formatMoney(selectedPrice.amountMinor, selectedPrice.currency)}` : "Pay"}
        </Button>
        <FormFeedback state={state && !state.ok && !priceErrors && !methodErrors && !phoneErrors ? state : null} />
      </div>
      <p className="text-xs text-muted">You pay; {childName}&rsquo;s account gets the plan. You&rsquo;ll see the payment under Payments.</p>
    </form>
  );
}
