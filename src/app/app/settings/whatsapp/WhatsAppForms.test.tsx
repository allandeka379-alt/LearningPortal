/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { WhatsAppFormAction, WhatsAppFormState } from "./form-state";
import { LinkWhatsAppForm, UnlinkWhatsAppForm, WhatsAppRemindersForm } from "./WhatsAppForms";

afterEach(() => cleanup());

/** A Server Action stand-in that records the submitted form and answers with the queued results. */
function recordingAction(...results: WhatsAppFormState[]) {
  const calls: FormData[] = [];
  const action: WhatsAppFormAction = async (_state, formData) => {
    calls.push(formData);
    return results.shift() ?? null;
  };
  return { action, calls };
}

const SENT: WhatsAppFormState = {
  ok: true,
  data: { message: "We sent a 6-digit code to +26377***67 on WhatsApp.", step: "code", phone: "+263771234567", phoneMasked: "+26377***67" },
};

describe("LinkWhatsAppForm", () => {
  it("asks for the number, then for the code with an opt-in (unticked) reminders box", async () => {
    const request = recordingAction(SENT);
    const confirm = recordingAction({ ok: true, data: { message: "+26377***67 is now linked.", step: "linked" } });
    render(<LinkWhatsAppForm requestCode={request.action} confirmLink={confirm.action} />);

    fireEvent.change(screen.getByLabelText(/Your WhatsApp number/), { target: { value: "077 123 4567" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Send me a code on WhatsApp" }));
    });
    await waitFor(() => expect(request.calls).toHaveLength(1));
    expect(request.calls[0]?.get("phone")).toBe("077 123 4567");
    expect(await screen.findByText(/We sent a 6-digit code/)).toBeTruthy();

    const reminders = screen.getByRole("checkbox", { name: /study reminders/ }) as HTMLInputElement;
    expect(reminders.checked).toBe(false);
    fireEvent.click(reminders);
    fireEvent.change(screen.getByLabelText(/6-digit code/), { target: { value: "123456" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Link my number" }));
    });
    await waitFor(() => expect(confirm.calls).toHaveLength(1));
    expect(confirm.calls[0]?.get("phone")).toBe("+263771234567");
    expect(confirm.calls[0]?.get("code")).toBe("123456");
    expect(confirm.calls[0]?.get("reminders")).toBe("on");
    expect(await screen.findByText("+26377***67 is now linked.")).toBeTruthy();
  });

  it("shows the server's field error and lets the student change the number", async () => {
    const request = recordingAction(
      { ok: false, error: { code: "VALIDATION", message: "Check the number.", fieldErrors: { phone: ["Enter a valid WhatsApp number."] } } },
      SENT,
    );
    render(<LinkWhatsAppForm requestCode={request.action} confirmLink={recordingAction().action} />);
    fireEvent.change(screen.getByLabelText(/Your WhatsApp number/), { target: { value: "12" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Send me a code on WhatsApp" }));
    });
    expect(await screen.findByText("Enter a valid WhatsApp number.")).toBeTruthy();
    // React resets an uncontrolled form after its action; type the number again.
    fireEvent.change(screen.getByLabelText(/Your WhatsApp number/), { target: { value: "0771234567" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Send me a code on WhatsApp" }));
    });
    expect(await screen.findByLabelText(/6-digit code/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Use a different number" }));
    expect(screen.getByLabelText(/Your WhatsApp number/)).toBeTruthy();
  });
});

describe("linked number forms", () => {
  it("toggles reminders and confirms before unlinking", async () => {
    const reminders = recordingAction({ ok: true, data: { message: "Reminders on WhatsApp are on.", step: "reminders" } });
    render(<WhatsAppRemindersForm remindersOn={false} action={reminders.action} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Turn reminders on" }));
    });
    await waitFor(() => expect(reminders.calls[0]?.get("reminders")).toBe("on"));
    cleanup();

    const unlink = recordingAction({ ok: true, data: { message: "Your WhatsApp number is no longer linked.", step: "unlinked" } });
    render(<UnlinkWhatsAppForm action={unlink.action} />);
    fireEvent.click(screen.getByRole("button", { name: "Unlink this number" }));
    expect(screen.getByText(/WhatsApp will stop working/)).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Unlink" }));
    });
    await waitFor(() => expect(unlink.calls).toHaveLength(1));
  });
});
