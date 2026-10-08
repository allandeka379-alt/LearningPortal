/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import { RefundPanel } from "./RefundPanel";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/admin/payments/p-1" }));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn(async () => ({ ok: true, data: null })) }));

beforeAll(() => {
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & { showModal: () => void; close: () => void };
  proto.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  proto.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("RefundPanel", () => {
  it("checks the amount, confirms the exact refund and submits the request with a reason", async () => {
    const user = userEvent.setup();
    const calls: FormData[] = [];
    const action: AdminFormAction<unknown> = async (_state: AdminActionState, formData: FormData) => {
      calls.push(formData);
      return { ok: true, data: null, message: "Partial refund recorded." };
    };
    render(
      <ToastProvider>
        <RefundPanel paymentId="p-1" currency="USD" refundableMinor={500} support="manual_only" purpose="SUBSCRIPTION" action={action} />
      </ToastProvider>,
    );

    // Paynow-style providers offer only a recorded manual refund.
    const method = screen.getByRole("combobox") as HTMLSelectElement;
    expect([...method.options].map((option) => option.value)).toEqual(["MANUAL"]);

    const trigger = screen.getByRole("button", { name: "Refund…" });
    const amount = screen.getByLabelText(/Amount \(USD\)/);
    await user.type(amount, "9");
    expect(trigger).toHaveProperty("disabled", true);
    expect(screen.getAllByText(/At most USD\s5\.00 can be refunded/).length).toBeGreaterThan(0);
    await user.clear(amount);
    await user.type(amount, "2.5");
    expect(trigger).toHaveProperty("disabled", false);
    await user.type(screen.getByLabelText(/Refund reference/), "EC-778");

    await user.click(trigger);
    const dialog = await screen.findByRole("alertdialog", { name: /Refund USD\s2\.50\?/ });
    expect(within(dialog).getByText("The payment stays Successful with a partial refund.")).toBeTruthy();
    await user.type(within(dialog).getByLabelText(/Reason/), "Charged twice for the same week");
    await user.click(within(dialog).getByRole("button", { name: /Refund USD\s2\.50/ }));
    await waitFor(() => expect(calls).toHaveLength(1));
    const submitted = calls[0] as FormData;
    expect(Object.fromEntries(submitted.entries())).toMatchObject({
      paymentId: "p-1",
      currency: "USD",
      method: "MANUAL",
      amount: "2.5",
      externalReference: "EC-778",
      reason: "Charged twice for the same week",
    });
  });

  it("warns that a full subscription refund is flagged for review", async () => {
    const user = userEvent.setup();
    const action: AdminFormAction<unknown> = vi.fn(async () => null);
    render(
      <ToastProvider>
        <RefundPanel paymentId="p-2" currency="ZWG" refundableMinor={15000} support="api" purpose="SUBSCRIPTION" action={action} />
      </ToastProvider>,
    );
    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("PROVIDER");
    await user.click(screen.getByRole("button", { name: "Refund…" }));
    const dialog = await screen.findByRole("alertdialog", { name: /Refund ZWG\s150\.00\?/ });
    expect(within(dialog).getByText(/flagged for review/)).toBeTruthy();
    expect(within(dialog).getByText("The payment becomes Refunded.")).toBeTruthy();
  });
});
