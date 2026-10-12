"use client";

import { CreditCard, FlaskConical, Smartphone } from "lucide-react";
import { startTransition, useActionState, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Radio } from "@/components/ui/RadioGroup";
import { isLifetimePrice, LIFETIME_PRICE_NOTE } from "@/lib/billing/offer";
import {
  fieldErrorsOf,
  isSafeNavigation,
  type CheckoutFormAction,
  type CheckoutItemGroup,
  type CheckoutMethodView,
  type PaymentStatusCheck,
} from "./checkout-state";
import { describeBillingPeriod, formatMoney } from "./format";
import { MobileMoneyPending } from "./MobileMoneyPending";
import { isZimbabweMobile, PHONE_FORMAT_ERROR, PHONE_FORMAT_HINT } from "./phone";

export interface CheckoutFormProps {
  /** A plan price (SUBSCRIPTION / PLAN_PURCHASE: the server decides by the price) or a study pack. */
  purpose: "SUBSCRIPTION" | "PLAN_PURCHASE" | "STUDY_PACK";
  /** Plans (or the one study pack) with their purchasable prices. */
  items: readonly CheckoutItemGroup[];
  methods: readonly CheckoutMethodView[];
  /** Study pack being bought (purpose STUDY_PACK). */
  studyPackId?: string;
  /** Price chosen on the previous page, if any. */
  defaultPriceId?: string | null;
  action: CheckoutFormAction;
  checkStatus: PaymentStatusCheck;
  /** Fresh Idempotency-Key from the server render: a double tap returns the same payment. */
  idempotencyKey: string;
  /** Navigation hook for browser checkouts (tests); default `window.location.assign` (a GET navigation, CSP). */
  navigate?: (url: string) => void;
}

const METHOD_ICONS = {
  mobile: <Smartphone aria-hidden="true" className="size-4" />,
  card: <CreditCard aria-hidden="true" className="size-4" />,
  test: <FlaskConical aria-hidden="true" className="size-4" />,
};

/**
 * Student checkout (§31, §32): 1. choose a price (admin-set; USD for now), 2. choose how to pay (EcoCash / OneMoney
 * via Paynow with the wallet number, a card on the Paynow page, a test method in development), 3. pay. One-off
 * "Full access" reads "US$1.00 · pay once, keep it" (owner decision 2026-10-07).
 *
 * - Only ids are sent; the server takes the amount from the price (never from the client).
 * - Each attempt carries an idempotency key: a double tap or a retried request returns the same payment, and a new
 *   attempt (after an error or a declined prompt) gets a new key.
 * - Browser checkouts open with a GET navigation (CSP `form-action 'self'`); mobile money switches to the
 *   "check your phone" screen, which polls the payment status.
 * - Methods that cannot take the chosen currency are disabled with the reason; the wallet number is checked here
 *   for a quick hint and again on the server.
 */
export function CheckoutForm({
  purpose,
  items,
  methods,
  studyPackId,
  defaultPriceId,
  action,
  checkStatus,
  idempotencyKey,
  navigate,
}: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const allPrices = useMemo(() => items.flatMap((item) => item.prices), [items]);
  const initialPrice = allPrices.find((price) => price.planPriceId === defaultPriceId) ?? (allPrices.length === 1 ? allPrices[0] : undefined);
  const [priceId, setPriceId] = useState<string | undefined>(initialPrice?.planPriceId);
  const [methodId, setMethodId] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Each finished attempt gets a new key (a changed choice is a new checkout); a double tap within one attempt reuses
  // it, because `state` only changes when an attempt completes.
  const [attempt, setAttempt] = useState(0);
  const [seenState, setSeenState] = useState(state);
  const [showPending, setShowPending] = useState(false);
  if (state !== seenState) {
    setSeenState(state);
    setAttempt((value) => value + 1);
    setShowPending(state?.ok === true && state.data.kind === "mobile");
  }
  const key = `${idempotencyKey}-${attempt}`;

  const handled = useRef<unknown>(null);
  useEffect(() => {
    if (state === null || handled.current === state) return;
    handled.current = state;
    if (state.ok && state.data.kind === "redirect" && isSafeNavigation(state.data.url)) {
      (navigate ?? ((url: string) => window.location.assign(url)))(state.data.url);
    }
  }, [state, navigate]);

  const selectedPrice = allPrices.find((price) => price.planPriceId === priceId);
  const usable = (method: CheckoutMethodView) => (selectedPrice ? method.currencies.includes(selectedPrice.currency) : true);
  const selectedMethod = methods.find((method) => method.id === methodId && usable(method));

  if (showPending && state?.ok && state.data.kind === "mobile") {
    const outcome = state.data;
    return (
      <MobileMoneyPending
        key={outcome.paymentId}
        paymentId={outcome.paymentId}
        instructions={outcome.instructions}
        methodLabel={outcome.methodLabel}
        maskedMsisdn={outcome.maskedMsisdn}
        resultHref={outcome.resultHref}
        sandboxHref={outcome.sandboxHref}
        check={checkStatus}
        onRetry={() => setShowPending(false)}
        {...(navigate ? { navigate } : {})}
      />
    );
  }

  const redirecting = state?.ok === true && state.data.kind === "redirect";
  const priceErrors = fieldErrorsOf(state, "planPriceId") ?? fieldErrorsOf(state, "studyPackId");
  const methodErrors = fieldErrorsOf(state, "methodId") ?? fieldErrorsOf(state, "provider");
  const serverPhoneErrors = fieldErrorsOf(state, "phone");
  const phoneErrors = phoneError ? [phoneError] : serverPhoneErrors;
  const formLevel = state && !state.ok && !priceErrors && !methodErrors && !serverPhoneErrors ? state : null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedMethod?.needsPhone && !isZimbabweMobile(phone)) {
      setPhoneError(PHONE_FORMAT_ERROR);
      return;
    }
    setPhoneError(null);
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    // `method="post"`: before hydration the browser never puts the wallet number into a URL.
    <form method="post" onSubmit={onSubmit} className="space-y-7" noValidate>
      <input type="hidden" name="purpose" value={purpose} />
      {studyPackId && <input type="hidden" name="studyPackId" value={studyPackId} />}
      <input type="hidden" name="idempotencyKey" value={key} />

      <fieldset className="min-w-0 space-y-3" aria-describedby={priceErrors ? "checkout-price-error" : undefined}>
        <legend className="text-base font-semibold text-text">1. {purpose === "STUDY_PACK" ? "Choose a price" : purpose === "PLAN_PURCHASE" ? "What you are buying" : "Choose a plan"}</legend>
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-text">
              {item.name}
              {item.current && (
                <Badge tone="primary" size="sm">
                  Your plan
                </Badge>
              )}
              {item.tagline && <span className="font-normal text-muted">{item.tagline}</span>}
            </p>
            {item.highlights.length > 0 && (
              <ul className="list-disc space-y-0.5 pl-5 text-sm text-muted">
                {item.highlights.slice(0, 4).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              {item.prices.map((price) => (
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
                label={
                  <span className="inline-flex items-center gap-2">
                    {METHOD_ICONS[method.test ? "test" : method.needsPhone ? "mobile" : "card"]}
                    {method.label}
                  </span>
                }
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
        <Field label="Mobile money number" hint={`${PHONE_FORMAT_HINT} We only keep it masked.`} error={phoneErrors} required>
          <Input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              if (phoneError) setPhoneError(null);
            }}
            className="sm:max-w-xs"
          />
        </Field>
      )}

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            size="lg"
            disabled={!selectedPrice || !selectedMethod || redirecting}
            loading={pending || redirecting}
            loadingText={redirecting ? "Opening the payment page…" : "Starting payment…"}
          >
            {selectedPrice ? `Pay ${formatMoney(selectedPrice.amountMinor, selectedPrice.currency)}` : "Pay"}
          </Button>
          <FormFeedback state={formLevel} />
        </div>
        <p className="text-xs text-muted">
          {selectedMethod?.needsPhone
            ? "You'll get a prompt on your phone to approve the payment with your PIN."
            : "You'll pay on the provider's secure page, then come back here."}{" "}
          Each payment adds its period of access, and nothing is ever charged without you.
        </p>
      </div>
    </form>
  );
}
