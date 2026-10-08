/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import type { FamilyFormAction, FamilyFormState } from "@/components/family/action-state";
import { ToastProvider } from "@/components/ui/Toast";
import type { ChildPrivacyOverview } from "@/server/accounts/guardian-privacy";
import { ChildDataCard } from "./ChildDataCard";

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

afterEach(() => cleanup());

const CHILD = "0190a1b2-c3d4-7e5f-8a6b-7c8d9e0f1a2b";

function recording() {
  const calls: FormData[] = [];
  const action: FamilyFormAction = async (_state: FamilyFormState, formData: FormData) => {
    calls.push(formData);
    return { ok: true, data: { message: "Done." } };
  };
  return { action, calls };
}

function card(overview: ChildPrivacyOverview, actions = { exp: recording(), del: recording(), cancel: recording() }): { node: ReactNode; actions: typeof actions } {
  return {
    actions,
    node: (
      <ToastProvider>
        <ChildDataCard
          studentUserId={CHILD}
          name="Rudo"
          overview={overview}
          graceDays={14}
          timeZone="Africa/Harare"
          requestExport={actions.exp.action}
          requestDeletion={actions.del.action}
          cancelDeletion={actions.cancel.action}
        />
      </ToastProvider>
    ),
  };
}

const EMPTY: ChildPrivacyOverview = { canAct: true, blockedReason: null, deletion: null, export: null };

describe("ChildDataCard (PRIV-02 guardian path)", () => {
  it("explains why a guardian cannot act instead of offering the buttons", () => {
    render(card({ ...EMPTY, canAct: false, blockedReason: "Only a parent or legal guardian can ask for a child's data." }).node);
    expect(screen.getByText("Only a parent or legal guardian can ask for a child's data.")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("says AI conversations are not included, and asks for deletion only after confirmation", async () => {
    const user = userEvent.setup();
    const { node, actions } = card(EMPTY);
    render(node);
    expect(screen.getByText(/AI tutor conversations are private and are not included/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Delete Rudo's account" }));
    const dialog = await screen.findByRole("alertdialog", { name: "Delete Rudo's account?" });
    await user.click(within(dialog).getByRole("button", { name: "Delete the account" }));
    expect(actions.del.calls[0]?.get("studentUserId")).toBe(CHILD);
    expect(actions.del.calls[0]?.get("confirmed")).toBe("on");
  });

  it("offers the download of a ready copy and the cancellation of the guardian's own deletion", () => {
    render(
      card({
        canAct: true,
        blockedReason: null,
        export: { id: "req-1", status: "COMPLETED", requestedAt: new Date("2026-10-07T08:00:00Z"), availableUntil: new Date("2026-10-14T08:00:00Z"), downloadable: true },
        deletion: { id: "del-1", scheduledFor: new Date("2026-10-21T08:00:00Z"), status: "REQUESTED", requestedByYou: true },
      }).node,
    );
    const download = screen.getByRole("link", { name: "Download the copy" });
    expect(download.getAttribute("href")).toBe(`/parent/children/${CHILD}/data/req-1`);
    expect(screen.getByText(/will be deleted on 21 October 2026 because you asked for it/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Cancel the deletion" })).toBeTruthy();
  });

  it("shows a deletion the child asked for without a cancel button", () => {
    render(card({ ...EMPTY, deletion: { id: "del-2", scheduledFor: new Date("2026-10-21T08:00:00Z"), status: "REQUESTED", requestedByYou: false } }).node);
    expect(screen.getByText(/because Rudo asked for it/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Cancel the deletion" })).toBeNull();
  });
});
