/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import type { CodeFormAction, CodeFormState, FamilyFormAction, FamilyFormState } from "./action-state";
import { AiConsentForm } from "./AiConsentForm";
import { ConfirmActionButton } from "./ConfirmActionButton";
import { EnterCodeForm } from "./EnterCodeForm";
import { RELATIONSHIP_OPTIONS } from "./labels";
import { LinkCodeCard, spellOut } from "./LinkCodeCard";
import { PendingRequestCard } from "./PendingRequestCard";
import { PermissionFields } from "./PermissionFields";
import { PermissionsForm } from "./PermissionsForm";

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
  vi.unstubAllGlobals();
});

function withToasts(node: ReactNode) {
  return <ToastProvider>{node}</ToastProvider>;
}

function recording<S>(responses: S[]) {
  const calls: FormData[] = [];
  const action = async (_state: S | null, formData: FormData): Promise<S | null> => {
    calls.push(formData);
    return responses.shift() ?? null;
  };
  return { action, calls };
}

describe("labels", () => {
  it("lists every relationship and spells codes out for screen readers", () => {
    expect(RELATIONSHIP_OPTIONS.map((o) => o.value)).toEqual(["PARENT", "GUARDIAN", "GRANDPARENT", "SIBLING", "OTHER_RELATIVE", "SPONSOR", "OTHER"]);
    expect(spellOut("ABCD-EFGH")).toBe("A B C D, E F G H");
  });
});

describe("LinkCodeCard", () => {
  it("creates a code, shows it once with a copy button and an expiry, and announces it", async () => {
    const writeText = vi.fn(async () => undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    const { action } = recording<CodeFormState>([
      { ok: true, data: { message: "Your code is ready.", displayCode: "ABCD-EFGH", expiresAt: "2026-10-06T10:00:00.000Z" } },
    ]);
    const cancel = recording<FamilyFormState>([]);
    render(
      withToasts(
        <LinkCodeCard action={action as CodeFormAction} cancelAction={cancel.action as FamilyFormAction} outstanding={null} audience="student" timeZone="Africa/Harare" />,
      ),
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Create a link code" }));
    });
    expect(await screen.findByText("ABCD-EFGH")).toBeTruthy();
    expect(screen.getByText("A B C D, E F G H")).toBeTruthy();
    expect(screen.getByText(/Expires .*It works once/)).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("Your code is ready.");
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    });
    expect(writeText).toHaveBeenCalledWith("ABCD-EFGH");
    expect(await screen.findByRole("button", { name: "Copied" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Create a new code" })).toBeTruthy();
  });

  it("explains an unused code it can't show again, and cancels it after confirmation", async () => {
    const user = userEvent.setup();
    const create = recording<CodeFormState>([]);
    const cancel = recording<FamilyFormState>([{ ok: true, data: { message: "Cancelled." } }]);
    render(
      withToasts(
        <LinkCodeCard
          action={create.action as CodeFormAction}
          cancelAction={cancel.action as FamilyFormAction}
          outstanding={{ linkId: "link-1", expiresAt: "2026-10-06T10:00:00.000Z" }}
          audience="parent"
          timeZone="Africa/Harare"
          extraFields={<input name="relationship" defaultValue="GUARDIAN" aria-label="Relationship" />}
        />,
      ),
    );
    expect(screen.getByText("You have an unused code")).toBeTruthy();
    expect(screen.getByText(/can.t show it again/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Cancel this code" }));
    const dialog = await screen.findByRole("dialog", { name: "Cancel your link code?" });
    await user.click(within(dialog).getByRole("button", { name: "Cancel code" }));
    await waitFor(() => expect(cancel.calls).toHaveLength(1));
    expect(cancel.calls[0]?.get("linkId")).toBe("link-1");
    expect(await screen.findByText("Cancelled.")).toBeTruthy(); // toast

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Create a new code" }));
    });
    await waitFor(() => expect(create.calls).toHaveLength(1));
    expect(create.calls[0]?.get("relationship")).toBe("GUARDIAN");
  });

  it("shows a failure (e.g. rate limit) next to the button", async () => {
    const { action } = recording<CodeFormState>([{ ok: false, error: { code: "RATE_LIMITED", message: "You've created a lot of codes." } }]);
    render(withToasts(<LinkCodeCard action={action as CodeFormAction} cancelAction={vi.fn()} outstanding={null} audience="student" timeZone="Africa/Harare" />));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Create a link code" }));
    });
    expect(await screen.findByText("You've created a lot of codes.")).toBeTruthy();
  });
});

describe("PermissionsForm and PermissionFields", () => {
  it("submits only the switches that are on, with the link id", async () => {
    const { action, calls } = recording<FamilyFormState>([{ ok: true, data: { message: "Saved." } }]);
    render(<PermissionsForm linkId="link-9" parentName="Grace" permissions={{ progress: true, activity: false, results: true }} action={action as FamilyFormAction} />);
    expect(screen.getByRole("switch", { name: "Study time and activity" }).getAttribute("aria-checked")).toBe("false");
    fireEvent.click(screen.getByRole("switch", { name: "Test and mock exam results" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save what Grace can see" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("linkId")).toBe("link-9");
    expect(calls[0]?.has("progress")).toBe(true);
    expect(calls[0]?.has("activity")).toBe(false);
    expect(calls[0]?.has("results")).toBe(false);
    expect(await screen.findByText("Saved.")).toBeTruthy();
  });

  it("checkboxes default to on and say subjects and the countdown are always shared", () => {
    render(<PermissionFields />);
    for (const name of ["Progress and weak areas", "Study time and activity", "Test and mock exam results"]) {
      expect((screen.getByRole("checkbox", { name: new RegExp(name) }) as HTMLInputElement).checked).toBe(true);
    }
    expect(screen.getByText(/subjects and exam countdown are always shared/)).toBeTruthy();
  });
});

describe("PendingRequestCard", () => {
  it("sends the pressed decision with the chosen permissions", async () => {
    const { action, calls } = recording<FamilyFormState>([{ ok: true, data: { message: "Accepted." } }]);
    render(
      <PendingRequestCard
        linkId="req-1"
        parentName="Rumbi"
        relationshipLabel="Guardian"
        contactHint="ru***@example.test"
        requestedLabel="Asked on 5 Oct 2026"
        action={action as FamilyFormAction}
      />,
    );
    expect(screen.getByRole("form", { name: "Request from Rumbi" })).toBeTruthy();
    expect(screen.getByText(/ru\*\*\*@example\.test/)).toBeTruthy();
    fireEvent.click(screen.getByRole("checkbox", { name: /Test and mock exam results/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("decision")).toBe("accept");
    expect(calls[0]?.get("linkId")).toBe("req-1");
    expect(calls[0]?.has("results")).toBe(false);
    expect(calls[0]?.has("progress")).toBe(true);
    expect(await screen.findByText("Accepted.")).toBeTruthy();
  });
});

describe("AiConsentForm (explicit consent)", () => {
  it("keeps the share button disabled until the student confirms, then submits confirmed=on", async () => {
    const { action, calls } = recording<FamilyFormState>([]);
    render(<AiConsentForm linkId="link-2" parentName="Grace" action={action as FamilyFormAction} backHref="/app/family" />);
    const share = screen.getByRole("button", { name: "Share my AI conversations" }) as HTMLButtonElement;
    expect(share.disabled).toBe(true);
    expect(screen.getByRole("link", { name: "No, keep them private" }).getAttribute("href")).toBe("/app/family");
    fireEvent.click(screen.getByRole("checkbox", { name: /Grace will be able to read my AI tutor/ }));
    expect(share.disabled).toBe(false);
    await act(async () => {
      fireEvent.click(share);
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("confirmed")).toBe("on");
    expect(calls[0]?.get("allow")).toBe("on");
    expect(calls[0]?.get("linkId")).toBe("link-2");
  });
});

describe("EnterCodeForm", () => {
  it("shows the code error on the field and passes extra fields", async () => {
    const { action, calls } = recording<FamilyFormState>([
      { ok: false, error: { code: "VALIDATION", message: "That code is not valid.", fieldErrors: { code: ["That code is not valid or has expired."] } } },
    ]);
    render(
      <EnterCodeForm action={action as FamilyFormAction} label="Link code" submitLabel="Link my child">
        <input name="relationship" defaultValue="PARENT" aria-label="Relationship" />
      </EnterCodeForm>,
    );
    fireEvent.change(screen.getByLabelText(/Link code/), { target: { value: "abcd-efgh" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Link my child" }));
    });
    expect(await screen.findByText("That code is not valid or has expired.")).toBeTruthy();
    expect(screen.getByLabelText(/Link code/).getAttribute("aria-invalid")).toBe("true");
    expect(calls[0]?.get("code")).toBe("abcd-efgh");
    expect(calls[0]?.get("relationship")).toBe("PARENT");
  });
});

describe("ConfirmActionButton", () => {
  it("keeps errors in the dialog and passes the optional reason", async () => {
    const user = userEvent.setup();
    const { action, calls } = recording<FamilyFormState>([
      { ok: false, error: { code: "CONFLICT", message: "This link has already ended." } },
      { ok: true, data: { message: "Removed." } },
    ]);
    render(
      withToasts(
        <ConfirmActionButton
          action={action as FamilyFormAction}
          fields={{ linkId: "l-1" }}
          triggerLabel="Remove Grace"
          title="Remove Grace?"
          confirmLabel="Remove"
          tone="danger"
          reasonLabel="Reason"
        />,
      ),
    );
    await user.click(screen.getByRole("button", { name: "Remove Grace" }));
    const dialog = await screen.findByRole("alertdialog", { name: "Remove Grace?" });
    await user.type(within(dialog).getByLabelText(/Reason/), "Moved schools");
    await user.click(within(dialog).getByRole("button", { name: "Remove" }));
    expect(await within(dialog).findByText("This link has already ended.")).toBeTruthy();
    expect(calls[0]?.get("reason")).toBe("Moved schools");
    expect(calls[0]?.get("linkId")).toBe("l-1");
    await user.click(within(dialog).getByRole("button", { name: "Remove" }));
    expect(await screen.findByText("Removed.")).toBeTruthy();
    await waitFor(() => expect(dialog.hasAttribute("open")).toBe(false));
  });
});
