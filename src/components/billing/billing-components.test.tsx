/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { FormActionState } from "@/components/student/action-state";
import type { ActionResult } from "@/server/lib/errors";
import type { CheckoutFormState, CheckoutItemGroup, CheckoutMethodView, PaymentStatusCheck, PaymentStatusView } from "./checkout-state";
import { CheckoutForm } from "./CheckoutForm";
import { EntitlementList } from "./EntitlementList";
import { PaymentStatusWatcher } from "./PaymentStatusWatcher";
import { PlanCards } from "./PlanCards";
import { SubscriptionActions } from "./SubscriptionActions";

const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh }) }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const PAYMENT_ID = "0f8fad5b-d9cb-469f-a165-70867728950e";

const PLANS: CheckoutItemGroup[] = [
  {
    id: "plan-student",
    name: "Student",
    tagline: "Everything for one learner",
    highlights: ["Mock exams", "Unlimited practice"],
    current: true,
    prices: [
      { planPriceId: "price-usd", currency: "USD", amountMinor: 500, interval: "MONTH", intervalCount: 1, periodDays: null, label: null },
      { planPriceId: "price-zwg", currency: "ZWG", amountMinor: 13000, interval: "TERM", intervalCount: 1, periodDays: null, label: "Term 1 2027" },
    ],
  },
];

const METHODS: CheckoutMethodView[] = [
  { id: "paynow_ecocash", label: "EcoCash", description: "Approve on your phone.", needsPhone: true, test: false, currencies: ["USD"] },
  { id: "stripe_card", label: "International card", description: "Visa or Mastercard.", needsPhone: false, test: false, currencies: ["USD", "ZWG"] },
];

function recording(responses: CheckoutFormState[]) {
  const calls: FormData[] = [];
  const action = vi.fn(async (_state: CheckoutFormState, formData: FormData) => {
    calls.push(formData);
    return responses.shift() ?? null;
  });
  return { action, calls };
}

const pendingCheck = vi.fn(async (): Promise<ActionResult<PaymentStatusView>> => ({
  ok: true,
  data: { paymentId: PAYMENT_ID, status: "PENDING", message: null, resultHref: `/app/billing/result?paymentId=${PAYMENT_ID}` },
}));

function renderForm(action: ReturnType<typeof recording>["action"], navigate = vi.fn()) {
  render(
    <CheckoutForm
      purpose="SUBSCRIPTION"
      items={PLANS}
      methods={METHODS}
      defaultPriceId="price-usd"
      action={action}
      checkStatus={pendingCheck}
      idempotencyKey="0f8fad5b-d9cb-469f-a165-70867728950e"
      navigate={navigate}
    />,
  );
  return { navigate };
}

async function submit() {
  await act(async () => {
    fireEvent.submit(screen.getByRole("button", { name: /^Pay/ }).closest("form") as HTMLFormElement);
  });
}

describe("CheckoutForm", () => {
  it("preselects the chosen price, disables methods that cannot take its currency, and sends ids only", async () => {
    const { action, calls } = recording([{ ok: true, data: { kind: "redirect", url: "https://www.paynow.co.zw/payment/x", paymentId: PAYMENT_ID } }]);
    const { navigate } = renderForm(action);
    expect((screen.getByRole("radio", { name: /US\$5\.00 per month/ }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByText("Your plan")).toBeTruthy();

    fireEvent.click(screen.getByRole("radio", { name: /ZWG/ }));
    expect((screen.getByRole("radio", { name: /EcoCash/ }) as HTMLInputElement).disabled).toBe(true);
    expect(screen.getByText("Can't take ZWG payments.")).toBeTruthy();

    fireEvent.click(screen.getByRole("radio", { name: /US\$5\.00/ }));
    fireEvent.click(screen.getByRole("radio", { name: /International card/ }));
    expect(screen.queryByLabelText(/Mobile money number/)).toBeNull();
    await submit();
    expect(action).toHaveBeenCalledTimes(1);
    const sent = Object.fromEntries(calls[0]?.entries() ?? []);
    expect(sent).toMatchObject({ purpose: "SUBSCRIPTION", planPriceId: "price-usd", methodId: "stripe_card" });
    expect(String(sent.idempotencyKey)).toMatch(/^0f8fad5b-d9cb-469f-a165-70867728950e-\d+$/);
    expect(Object.keys(sent).some((key) => /amount/i.test(key))).toBe(false);
    // Browser checkouts open with a GET navigation.
    expect(navigate).toHaveBeenCalledWith("https://www.paynow.co.zw/payment/x");
  });

  it("checks the Zimbabwe wallet number before submitting, then shows the 'check your phone' screen", async () => {
    const { action, calls } = recording([
      {
        ok: true,
        data: {
          kind: "mobile",
          paymentId: PAYMENT_ID,
          instructions: "Check your phone and enter your PIN.",
          methodLabel: "EcoCash",
          maskedMsisdn: "+263 77* *** 567",
          resultHref: `/app/billing/result?paymentId=${PAYMENT_ID}`,
          sandboxHref: null,
        },
      },
    ]);
    renderForm(action);
    fireEvent.click(screen.getByRole("radio", { name: /EcoCash/ }));
    const phone = screen.getByLabelText(/Mobile money number/);
    fireEvent.change(phone, { target: { value: "12345" } });
    await submit();
    expect(action).not.toHaveBeenCalled();
    expect(screen.getByText(/Enter a Zimbabwe mobile number/)).toBeTruthy();
    expect(phone.getAttribute("aria-invalid")).toBe("true");

    fireEvent.change(phone, { target: { value: "077 123 4567" } });
    await submit();
    expect(action).toHaveBeenCalledTimes(1);
    expect(calls[0]?.get("phone")).toBe("077 123 4567");
    expect(screen.getByRole("heading", { name: "Check your phone to approve" })).toBeTruthy();
    expect(screen.getByText(/\+263 77\* \*\*\* 567/)).toBeTruthy();
  });

  it("shows server field errors and uses a new idempotency key for the next attempt", async () => {
    const { action, calls } = recording([
      { ok: false, error: { code: "VALIDATION", message: "Check the highlighted fields.", fieldErrors: { phone: ["Enter a valid Zimbabwe mobile number, e.g. 0771234567."] } } },
      { ok: false, error: { code: "BAD_REQUEST", message: "We couldn't start the payment. Please try again." } },
    ]);
    renderForm(action);
    fireEvent.click(screen.getByRole("radio", { name: /EcoCash/ }));
    fireEvent.change(screen.getByLabelText(/Mobile money number/), { target: { value: "0771234567" } });
    await submit();
    expect(screen.getByText(/Enter a valid Zimbabwe mobile number/)).toBeTruthy();
    await submit();
    expect(screen.getByRole("status").textContent).toMatch(/couldn't start the payment/);
    expect(calls[0]?.get("idempotencyKey")).not.toBe(calls[1]?.get("idempotencyKey"));
    // The wallet number survives a failed attempt.
    expect((screen.getByLabelText(/Mobile money number/) as HTMLInputElement).value).toBe("0771234567");
  });

  it("never follows a javascript: URL", async () => {
    const { action } = recording([{ ok: true, data: { kind: "redirect", url: "javascript:alert(1)", paymentId: PAYMENT_ID } }]);
    const { navigate } = renderForm(action);
    fireEvent.click(screen.getByRole("radio", { name: /International card/ }));
    await submit();
    expect(navigate).not.toHaveBeenCalled();
  });
});

describe("PaymentStatusWatcher", () => {
  it("re-renders the page once the status changes, and offers 'Check again' after the timeout", async () => {
    vi.useFakeTimers();
    const statuses: PaymentStatusView["status"][] = ["PENDING", "SUCCESSFUL"];
    const check = vi.fn(async (): Promise<ActionResult<PaymentStatusView>> => ({
      ok: true,
      data: { paymentId: PAYMENT_ID, status: statuses.shift() ?? "PENDING", message: null, resultHref: "/r" },
    }));
    const onChange = vi.fn();
    render(<PaymentStatusWatcher paymentId={PAYMENT_ID} check={check} onChange={onChange} intervalMs={1000} timeoutMs={5000} />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(onChange).toHaveBeenCalledTimes(1);

    cleanup();
    const stillPending = vi.fn<PaymentStatusCheck>(async () => ({
      ok: true,
      data: { paymentId: PAYMENT_ID, status: "PENDING", message: null, resultHref: "/r" },
    }));
    render(<PaymentStatusWatcher paymentId={PAYMENT_ID} check={stillPending} intervalMs={1000} timeoutMs={3000} />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });
    expect(screen.getByRole("status").textContent).toMatch(/Still waiting/);
    const calls = stillPending.mock.calls.length;
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Check again" }));
    });
    expect(stillPending.mock.calls.length).toBe(calls + 1);
    expect(stillPending.mock.calls.at(-1)?.[1]).toEqual({ refresh: true });
    expect(refresh).not.toHaveBeenCalled();
  });
});

describe("SubscriptionActions", () => {
  it("confirms before cancelling at period end, saying what happens", async () => {
    const calls: FormData[] = [];
    const cancel = vi.fn(async (_state: FormActionState, formData: FormData): Promise<FormActionState> => {
      calls.push(formData);
      return { ok: true, data: { message: "Your plan won't continue after the current period." } };
    });
    const resume = vi.fn(async (): Promise<FormActionState> => null);
    render(<SubscriptionActions subscriptionId="sub-1" cancelAtPeriodEnd={false} periodEndLabel="6 Nov 2026" cancelAction={cancel} resumeAction={resume} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel plan" }));
    const explanation = screen.getByText(/Your plan will stop on 6 Nov 2026/);
    expect(document.activeElement).toBe(explanation);
    fireEvent.click(screen.getByRole("button", { name: "Keep my plan" }));
    expect(screen.queryByText(/Your plan will stop/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Cancel plan" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Cancel at period end" }));
    });
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(calls[0]?.get("subscriptionId")).toBe("sub-1");
  });

  it("offers to keep a plan that is set to end", () => {
    const noop = vi.fn(async (): Promise<FormActionState> => null);
    render(<SubscriptionActions subscriptionId="sub-1" cancelAtPeriodEnd periodEndLabel="6 Nov 2026" cancelAction={noop} resumeAction={noop} />);
    expect(screen.getByRole("button", { name: "Keep my plan" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Cancel plan" })).toBeNull();
  });
});

describe("PlanCards and EntitlementList", () => {
  it("links each database price to checkout and is honest about plans without a price", () => {
    render(
      <PlanCards
        plans={[
          { ...PLANS[0]!, isFree: false },
          { id: "plan-free", name: "Free", tagline: null, highlights: [], prices: [], current: false, isFree: true },
          { id: "plan-premium", name: "Premium", tagline: null, highlights: [], prices: [], current: false, isFree: false },
        ]}
      />,
    );
    const student = screen.getByRole("article", { name: "Student" });
    expect(within(student).getByRole("link", { name: /Renew · US\$5\.00 per month/ }).getAttribute("href")).toBe("/app/billing/checkout?price=price-usd");
    expect(within(student).getByRole("link", { name: /ZWG.*per term.*Term 1 2027/ })).toBeTruthy();
    expect(within(screen.getByRole("article", { name: "Premium" })).getByText(/Price not set yet/)).toBeTruthy();
  });

  it("lists included and (optionally) excluded features", () => {
    render(
      <EntitlementList
        showExcluded
        lines={[
          { key: "a", label: "Unlimited practice questions", included: true },
          { key: "b", label: "Mock exams", included: false },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Included" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Not included" })).toBeTruthy();
    expect(screen.getByText("Mock exams")).toBeTruthy();
  });
});
