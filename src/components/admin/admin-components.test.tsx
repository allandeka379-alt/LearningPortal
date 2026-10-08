/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import { AnnouncementForm } from "./announcements/AnnouncementForm";
import { LineChart } from "./charts/LineChart";
import { ConfirmAction } from "./ConfirmAction";
import type { AdminActionState, AdminFormAction } from "./form-state";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };

vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/admin" }));
vi.mock("./step-up-actions", () => ({
  confirmPasswordAction: vi.fn(async () => ({ ok: true, data: null, message: "Password confirmed." })),
}));

beforeAll(() => {
  // jsdom has no modal dialog implementation; emulate the bits the shared modal hook uses.
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

function withProviders(node: ReactNode) {
  return <ToastProvider>{node}</ToastProvider>;
}

describe("ConfirmAction", () => {
  it("asks for confirmation, shows field errors, then succeeds with a toast and a refresh", async () => {
    const user = userEvent.setup();
    const calls: FormData[] = [];
    const responses: AdminActionState[] = [
      { ok: false, error: { code: "VALIDATION", message: "Please fix it.", fieldErrors: { reason: ["Give a reason of at least 5 characters."] } } },
      { ok: true, data: null, message: "Account suspended." },
    ];
    const action: AdminFormAction<unknown> = async (_state, formData) => {
      calls.push(formData);
      return responses.shift() ?? null;
    };
    render(
      withProviders(
        <ConfirmAction
          action={action}
          fields={{ userId: "u-1" }}
          triggerLabel="Suspend account"
          title="Suspend this account?"
          confirmLabel="Suspend"
          tone="danger"
          reason={{ label: "Reason", required: true }}
        />,
      ),
    );

    await user.click(screen.getByRole("button", { name: "Suspend account" }));
    const dialog = await screen.findByRole("alertdialog", { name: "Suspend this account?" });
    await user.type(within(dialog).getByLabelText(/Reason/), "no");
    await user.click(within(dialog).getByRole("button", { name: "Suspend" }));
    await waitFor(() => expect(within(dialog).getByText("Give a reason of at least 5 characters.")).toBeTruthy());
    expect(calls[0]?.get("userId")).toBe("u-1");
    expect(calls[0]?.get("reason")).toBe("no");

    await user.clear(within(dialog).getByLabelText(/Reason/));
    await user.type(within(dialog).getByLabelText(/Reason/), "Chargeback investigation");
    await user.click(within(dialog).getByRole("button", { name: "Suspend" }));
    await waitFor(() => expect(screen.getByText("Account suspended.")).toBeTruthy());
    expect(calls[1]?.get("reason")).toBe("Chargeback investigation");
    expect(router.refresh).toHaveBeenCalled();
  });

  it("shows the password prompt when the action needs a step-up", async () => {
    const user = userEvent.setup();
    const action: AdminFormAction<unknown> = async () => ({ ok: false, error: { code: "REAUTH_REQUIRED", message: "Confirm your password." } });
    render(withProviders(<ConfirmAction action={action} triggerLabel="Grant Admin" title="Grant Admin?" confirmLabel="Grant role" />));
    await user.click(screen.getByRole("button", { name: "Grant Admin" }));
    const dialog = await screen.findByRole("dialog", { name: "Grant Admin?" });
    await user.click(within(dialog).getByRole("button", { name: "Grant role" }));
    await waitFor(() => expect(within(dialog).getByLabelText("Your password")).toBeTruthy());
  });

  it("explains why a disabled action is unavailable", () => {
    render(withProviders(<ConfirmAction action={async () => null} triggerLabel="Approve" title="Approve?" confirmLabel="Approve" disabled disabledReason="You authored this item." />));
    const button = screen.getByRole("button", { name: "Approve" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(screen.getByText("You authored this item.")).toBeTruthy();
  });
});

describe("AnnouncementForm", () => {
  it("shows the fields that match the chosen audience and publish mode", async () => {
    const user = userEvent.setup();
    render(withProviders(<AnnouncementForm action={async () => null} countries={[{ id: "c1", name: "Zimbabwe" }]} submitLabel="Save draft" />));

    expect(screen.getByLabelText(/Country/)).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: "School" })).toBeNull();
    expect(screen.getByLabelText("Super admins")).toBeTruthy();

    await user.click(screen.getByLabelText(/One school/));
    expect(screen.getByRole("textbox", { name: "School" })).toBeTruthy();
    expect(screen.queryByLabelText(/Country/)).toBeNull();
    expect(screen.queryByLabelText("Super admins")).toBeNull();
    expect(screen.getByLabelText("Parents of its students")).toBeTruthy();

    await user.click(screen.getByLabelText(/One class/));
    expect(screen.getByRole("textbox", { name: "Class" })).toBeTruthy();
    expect(screen.queryByLabelText("School admins")).toBeNull();

    expect(screen.queryByLabelText(/Publish at/)).toBeNull();
    await user.click(screen.getByLabelText("Schedule"));
    expect(screen.getByLabelText(/Publish at/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Schedule" })).toBeTruthy();
  });
});

describe("LineChart", () => {
  const labels = ["1 Oct 2026", "2 Oct 2026", "3 Oct 2026"];

  it("announces values by keyboard, keeps gaps as missing data and ships a table twin and legend", () => {
    render(
      <LineChart
        title="Active users"
        labels={labels}
        series={[
          { key: "dau", label: "Daily", values: [10, null, 30] },
          { key: "wau", label: "Weekly", values: [40, 50, 60] },
        ]}
      />,
    );
    const chart = screen.getByRole("group", { name: /Active users/ });
    expect(screen.getByRole("list", { name: "Legend" })).toBeTruthy();
    act(() => {
      fireEvent.keyDown(chart, { key: "ArrowRight" });
    });
    act(() => {
      fireEvent.keyDown(chart, { key: "ArrowRight" });
    });
    expect(screen.getByText(/2 Oct 2026: Daily No data, Weekly 50/)).toBeTruthy();
    const table = screen.getByRole("table", { name: "Active users" });
    expect(within(table).getAllByRole("row")).toHaveLength(4);
    expect(within(table).getByText("No data")).toBeTruthy();
  });

  it("omits the legend for a single series", () => {
    render(<LineChart title="Sign-ups" labels={labels} series={[{ key: "s", label: "Sign-ups", values: [1, 2, 3] }]} />);
    expect(screen.queryByRole("list", { name: "Legend" })).toBeNull();
  });
});
