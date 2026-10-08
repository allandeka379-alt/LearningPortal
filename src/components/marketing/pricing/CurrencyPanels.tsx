import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { currencyName } from "@/server/marketing/pricing-format";

/** At most this many currencies get a switch (USD and ZWG today); more would stack below. */
export const MAX_SWITCHABLE_CURRENCIES = 4;

/*
 * Zero-JavaScript currency switch: native radio buttons + CSS `:has()`. Panel i is hidden while any OTHER radio is
 * checked. The class names are written out in full (not built at runtime) so Tailwind generates them. Browsers without
 * `:has()` simply show every currency's panel, each with its own heading: still correct, just longer.
 */
const HIDE_WHEN_CHECKED = [
  "group-has-[[data-ci='0']:checked]/currency:hidden",
  "group-has-[[data-ci='1']:checked]/currency:hidden",
  "group-has-[[data-ci='2']:checked]/currency:hidden",
  "group-has-[[data-ci='3']:checked]/currency:hidden",
] as const;

function panelClasses(index: number, count: number): string {
  return cn(HIDE_WHEN_CHECKED.filter((_, other) => other !== index && other < count));
}

export interface CurrencyPanelsProps {
  /** Currencies with prices, in display order (the first is selected by default). */
  currencies: readonly string[];
  /** Renders the plans for one currency. */
  renderPanel: (currency: string) => ReactNode;
  /** Unique per page, for radio names and ids. */
  idPrefix?: string;
}

/** Currency selector (USD / ZWG) and one server-rendered panel per currency; the page stays static. */
export function CurrencyPanels({ currencies, renderPanel, idPrefix = "pricing" }: CurrencyPanelsProps) {
  const list = currencies.slice(0, MAX_SWITCHABLE_CURRENCIES);
  if (list.length === 0) return null;
  return (
    <div className="group/currency">
      {list.length > 1 && (
        <fieldset className="mb-8 flex flex-wrap items-center gap-3">
          <legend className="sr-only">Show prices in</legend>
          <span aria-hidden="true" className="text-sm font-medium text-muted">
            Show prices in
          </span>
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {list.map((currency, index) => {
              const id = `${idPrefix}-currency-${currency.toLowerCase()}`;
              return (
                <div key={currency}>
                  <input
                    type="radio"
                    id={id}
                    name={`${idPrefix}-currency`}
                    value={currency}
                    data-ci={index}
                    defaultChecked={index === 0}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={id}
                    className="inline-flex min-h-11 min-w-16 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold text-muted transition-colors peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus hover:text-text peer-checked:hover:text-on-primary"
                  >
                    <span aria-hidden="true">{currency}</span>
                    <span className="sr-only">
                      {currencyName(currency)} ({currency})
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      )}
      {list.map((currency, index) => (
        <section key={currency} data-currency={currency} aria-label={`Prices in ${currencyName(currency)}`} className={panelClasses(index, list.length)}>
          {renderPanel(currency)}
        </section>
      ))}
    </div>
  );
}
