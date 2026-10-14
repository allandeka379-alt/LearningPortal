/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PaymentStatus } from "@/generated/prisma/client";
import type { ActionResult } from "@/server/lib/errors";
import type { PaymentStatusCheck, PaymentStatusView } from "./checkout-state";
import { MobileMoneyPending, PROVIDER_POLL_EVERY, STATUS_POLL_INTERVAL_MS, STATUS_POLL_TIMEOUT_MS } from "./MobileMoneyPending";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const PAYMENT_ID = "0f8fad5b-d9cb-469f-a165-70867728950e";
const RESULT = `/app/billing/result?paymentId=${PAYMENT_ID}`;

function view(status: PaymentStatus, message: string | null = null): ActionResult<PaymentStatusView> {
  return { ok: true, data: { paymentId: PAYMENT_ID, status, message, resultHref: RESULT } };
}

async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

function setup(answers: Array<ActionResult<PaymentStatusView> | Error>, fallback: ActionResult<PaymentStatusView> = view("PENDING")) {
  const check = vi.fn<PaymentStatusCheck>(async () => {
    const next = answers.shift() ?? fallback;
    if (next instanceof Error) throw next;
    return next;
  });
  const navigate = vi.fn();
  const onRetry = vi.fn();
  render(
    <MobileMoneyPending
      paymentId={PAYMENT_ID}
      instructions="Check your phone and enter your EcoCash PIN to approve."
      methodLabel="EcoCash"
      maskedMsisdn="+263 77* *** 567"
      resultHref={RESULT}
      check={check}
      onRetry={onRetry}
      navigate={navigate}
    />,
  );
  return { check, navigate, onRetry };
}

function setupInnbucks() {
  const check = vi.fn<PaymentStatusCheck>(async () => view("PENDING"));
  const navigate = vi.fn();
  render(
    <MobileMoneyPending
      paymentId={PAYMENT_ID}
      instructions="Paynow generated an InnBucks authorization code."
      mobilePromptKind="innbucks_code"
      innbucksAuthorizationCode="111161527"
      innbucksAuthorizationExpires="09:50"
      innbucksDeepLinkUrl="com.innbucks.customer://purchase?paymentToken=111161527"
      methodLabel="InnBucks"
      maskedMsisdn="+263 77* *** 567"
      resultHref={RESULT}
      check={check}
      onRetry={vi.fn()}
      navigate={navigate}
    />,
  );
  return { check, navigate };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("MobileMoneyPending", () => {
  it("asks the student to approve on their phone, shows the masked number and focuses the heading", () => {
    setup([]);
    const heading = screen.getByRole("heading", { name: "Check your phone to approve" });
    expect(document.activeElement).toBe(heading);
    expect(screen.getByText(/enter your EcoCash PIN/)).toBeTruthy();
    expect(screen.getByText(/\+263 77\* \*\*\* 567/)).toBeTruthy();
    expect(screen.getByRole("status").textContent).toMatch(/Waiting for you to approve/);
    expect(screen.getByRole("link", { name: "View payment status" }).getAttribute("href")).toBe(RESULT);
  });

  it("shows InnBucks as an authorization-code flow, not a phone-push prompt", () => {
    setupInnbucks();
    expect(screen.getByRole("heading", { name: "Authorize in InnBucks" })).toBeTruthy();
    expect(screen.getByText("Authorization code")).toBeTruthy();
    expect(screen.getByText("111161527")).toBeTruthy();
    expect(screen.getByText(/dial \*569#/i)).toBeTruthy();
    expect(screen.getByRole("status").textContent).toMatch(/authorize the InnBucks payment/);
    expect(screen.getByRole("link", { name: /Open InnBucks app/ }).getAttribute("href")).toBe("com.innbucks.customer://purchase?paymentToken=111161527");
  });

  it("polls every few seconds, asks the provider every Nth check, and opens the result page once paid", async () => {
    const { check, navigate } = setup([view("PENDING"), view("PENDING"), view("PENDING"), view("SUCCESSFUL")]);
    await advance(STATUS_POLL_INTERVAL_MS - 1);
    expect(check).not.toHaveBeenCalled();
    await advance(1);
    expect(check).toHaveBeenCalledTimes(1);
    expect(check.mock.calls[0]).toEqual([PAYMENT_ID, { refresh: false }]);
    await advance(STATUS_POLL_INTERVAL_MS * 3);
    expect(check).toHaveBeenCalledTimes(PROVIDER_POLL_EVERY);
    expect(check.mock.calls[PROVIDER_POLL_EVERY - 1]?.[1]).toEqual({ refresh: true });
    expect(navigate).toHaveBeenCalledWith(RESULT);
    expect(screen.getByRole("status").textContent).toMatch(/Payment confirmed/);
    // Polling stops once the payment is settled.
    await advance(STATUS_POLL_INTERVAL_MS * 5);
    expect(check).toHaveBeenCalledTimes(PROVIDER_POLL_EVERY);
  });

  it("shows why a payment failed and offers to try again", async () => {
    const { onRetry, check } = setup([view("FAILED", "There wasn't enough money in the wallet or account.")]);
    await advance(STATUS_POLL_INTERVAL_MS);
    expect(screen.getByRole("heading", { name: "Payment not completed" })).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toMatch(/enough money/);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    await advance(STATUS_POLL_INTERVAL_MS * 3);
    expect(check).toHaveBeenCalledTimes(1);
  });

  it("keeps waiting through network errors and stops after the timeout with guidance", async () => {
    const { check, navigate } = setup([new Error("offline"), { ok: false, error: { code: "RATE_LIMITED", message: "Slow down" } }]);
    await advance(STATUS_POLL_TIMEOUT_MS + STATUS_POLL_INTERVAL_MS);
    const calls = check.mock.calls.length;
    expect(calls).toBeGreaterThanOrEqual(STATUS_POLL_TIMEOUT_MS / STATUS_POLL_INTERVAL_MS - 1);
    expect(screen.getByText("What to do now")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toMatch(/haven't had confirmation/);
    await advance(STATUS_POLL_INTERVAL_MS * 5);
    expect(check.mock.calls.length).toBe(calls);
    expect(navigate).not.toHaveBeenCalled();
  });

  it("'Check again' after the timeout asks the provider and follows a late success", async () => {
    const { check, navigate } = setup([]);
    await advance(STATUS_POLL_TIMEOUT_MS + STATUS_POLL_INTERVAL_MS);
    check.mockResolvedValueOnce(view("SUCCESSFUL"));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Check again" }));
    });
    expect(check.mock.calls.at(-1)?.[1]).toEqual({ refresh: true });
    expect(navigate).toHaveBeenCalledWith(RESULT);
  });
});
