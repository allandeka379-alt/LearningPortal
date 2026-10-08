/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import { PromoCodeForm } from "./PromoCodeForm";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/admin/promo-codes/new" }));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn(async () => ({ ok: true, data: null })) }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const PLANS = [
  { id: "11111111-1111-4111-8111-111111111111", label: "Student (STUDENT)", audience: "INDIVIDUAL" },
  { id: "22222222-2222-4222-8222-222222222222", label: "School (SCHOOL)", audience: "SCHOOL" },
];

describe("PromoCodeForm", () => {
  it("shows only the value fields of the chosen discount type and submits them", async () => {
    const user = userEvent.setup();
    const calls: FormData[] = [];
    const action: AdminFormAction<unknown> = async (_state: AdminActionState, formData: FormData) => {
      calls.push(formData);
      return { ok: false, error: { code: "VALIDATION", message: "Please fix it.", fieldErrors: { freeDays: ["Enter the number of free days."] } }, values: {} };
    };
    render(
      <ToastProvider>
        <PromoCodeForm action={action} submitLabel="Create promo code" plans={PLANS} currencies={["USD", "ZWG"]} />
      </ToastProvider>,
    );

    expect(screen.getByLabelText(/Percentage off/)).toBeTruthy();
    expect(screen.queryByLabelText(/Free days/)).toBeNull();

    await user.selectOptions(screen.getByLabelText(/^Discount/), "FREE_DAYS");
    expect(screen.queryByLabelText(/Percentage off/)).toBeNull();
    const planSelect = screen.getByLabelText(/Plan unlocked/) as HTMLSelectElement;
    // Free days only unlock individual plans.
    expect([...planSelect.options].map((option) => option.textContent)).toEqual(["Choose a plan", "Student (STUDENT)"]);

    await user.selectOptions(screen.getByLabelText(/^Discount/), "FIXED_AMOUNT");
    expect(screen.getByLabelText(/Amount off/)).toBeTruthy();
    expect((screen.getByLabelText(/^Currency/) as HTMLSelectElement).value).toBe("USD");

    await user.type(screen.getByLabelText(/^Code/), "radio-2026");
    await user.type(screen.getByLabelText(/Amount off/), "1.50");
    await user.click(screen.getByRole("button", { name: "Create promo code" }));
    await waitFor(() => expect(calls).toHaveLength(1));
    const submitted = calls[0] as FormData;
    expect(submitted.get("discountType")).toBe("FIXED_AMOUNT");
    expect(submitted.get("amountOff")).toBe("1.50");
    expect(submitted.get("currency")).toBe("USD");
    expect(submitted.has("percentOff")).toBe(false);
    expect(submitted.has("freeDays")).toBe(false);
    expect(submitted.get("isActive")).toBe("on");
  });

  it("hides the frozen discount of a used code", () => {
    const action: AdminFormAction<unknown> = vi.fn(async () => null);
    render(
      <ToastProvider>
        <PromoCodeForm action={action} submitLabel="Save" plans={PLANS} currencies={["USD"]} locked={<p>25% off. This code has been used.</p>} initial={{ code: "USED25", discountType: "PERCENT", percentOff: 25 }} />
      </ToastProvider>,
    );
    expect(screen.getByText(/This code has been used/)).toBeTruthy();
    expect(screen.queryByLabelText(/^Code/)).toBeNull();
    expect(screen.queryByLabelText(/^Discount/)).toBeNull();
    expect(screen.getByLabelText(/Redemption cap/)).toBeTruthy();
  });
});
