/** @vitest-environment jsdom */
import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { AnswerSummary } from "./exam-model";
import { SubmitDialog } from "./SubmitDialog";

/**
 * Focus management of the "Submit your exam?" confirmation (§13, §43): where focus lands, where it returns, and that
 * Escape cannot close the dialog while the submission is in flight (the native `<dialog>` would otherwise close behind
 * React's back, hiding the dialog's error and dropping focus to the page).
 */

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

afterEach(cleanup);

const SUMMARY: AnswerSummary = { total: 3, answered: 1, unanswered: [2, 3], flagged: [3] };

function Harness({ submitting = false, error = null, onConfirm = () => {} }: { submitting?: boolean; error?: string | null; onConfirm?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Submit exam
      </button>
      <SubmitDialog open={open} onOpenChange={setOpen} summary={SUMMARY} unsaved={0} submitting={submitting} error={error} onConfirm={onConfirm} />
    </>
  );
}

/** What the browser does when Escape is pressed in a modal dialog: a cancelable `cancel` event, then closing. */
function pressEscapeIn(dialog: HTMLElement): boolean {
  const cancel = new Event("cancel", { cancelable: true });
  act(() => {
    dialog.dispatchEvent(cancel);
    if (!cancel.defaultPrevented) (dialog as HTMLDialogElement).close();
  });
  return cancel.defaultPrevented;
}

describe("SubmitDialog focus", () => {
  it("is a labelled alert dialog that starts on the safe choice and returns focus to the opener", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Submit exam" });
    await user.click(opener);

    const dialog = screen.getByRole("alertdialog", { name: "Submit your exam?" });
    expect(within(dialog).getByText("2 questions not answered: 2, 3.")).toBeTruthy();
    // Focus starts on "Keep working", never on the irreversible action.
    expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: "Keep working" }));

    await user.click(within(dialog).getByRole("button", { name: "Keep working" }));
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("Escape closes it while idle and focus goes back to the opener", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Submit exam" });
    await user.click(opener);
    const dialog = screen.getByRole("alertdialog", { name: "Submit your exam?" });

    pressEscapeIn(dialog);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("Escape cannot close it while submitting: the dialog, its error and the focus stay put", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const { rerender } = render(<Harness onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: "Submit exam" }));
    rerender(<Harness submitting error="Some answers aren't saved yet." onConfirm={onConfirm} />);

    const dialog = screen.getByRole("alertdialog", { name: "Submit your exam?" });
    expect(pressEscapeIn(dialog)).toBe(true);
    expect(dialog.hasAttribute("open")).toBe(true);
    expect(within(dialog).getByRole("alert").textContent).toBe("Some answers aren't saved yet.");
    // The close button is hidden and "Keep working" is disabled while the submission runs.
    expect(within(dialog).queryByRole("button", { name: "Close" })).toBeNull();
    expect((within(dialog).getByRole("button", { name: "Keep working" }) as HTMLButtonElement).disabled).toBe(true);
  });
});
