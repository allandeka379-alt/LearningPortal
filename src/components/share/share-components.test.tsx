/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { FormActionState } from "@/components/student/action-state";
import type { ActionResult } from "@/server/lib/errors";
import { InviteCodeForm } from "./InviteCodeForm";
import { MySharesList } from "./MySharesList";
import { PublicShareCard } from "./PublicShareCard";
import { ShareButton } from "./ShareButton";
import { ShareLinkActions } from "./ShareLinkActions";
import type { ShareLinkData, ShareRequest } from "./types";

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

const LINK: ShareLinkData = {
  shareId: "share-1",
  url: `https://example.test/s/${"a".repeat(43)}`,
  headline: "I scored 82% in O-Level Mathematics",
  message: "I scored 82% in O-Level Mathematics on BvunzoHub.",
  whatsappHref: "https://wa.me/?text=I%20scored",
  expiresAt: "2027-04-04T10:00:00.000Z",
};

function stubClipboard() {
  const writeText = vi.fn(async () => undefined);
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
  return writeText;
}

describe("ShareLinkActions", () => {
  it("offers WhatsApp, copy and the link itself, and announces a copy", async () => {
    const writeText = stubClipboard();
    render(<ShareLinkActions url={LINK.url} message={LINK.message} whatsappHref={LINK.whatsappHref} />);
    const whatsapp = screen.getByRole("link", { name: "Share on WhatsApp" });
    expect(whatsapp.getAttribute("href")).toBe(LINK.whatsappHref);
    expect(whatsapp.getAttribute("rel")).toContain("noopener");
    expect((screen.getByLabelText("Share link") as HTMLInputElement).value).toBe(LINK.url);
    // No native share sheet in this environment: the button is not offered.
    expect(screen.queryByRole("button", { name: "More ways to share" })).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    });
    expect(writeText).toHaveBeenCalledWith(LINK.url);
    expect(screen.getByRole("status").textContent).toBe("Link copied.");
  });

  it("explains when copying is not possible", async () => {
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText: vi.fn(async () => Promise.reject(new Error("denied"))) } });
    render(<ShareLinkActions url={LINK.url} message={LINK.message} whatsappHref={LINK.whatsappHref} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    });
    expect(screen.getByRole("status").textContent).toContain("Select the link and copy it");
  });
});

describe("ShareButton", () => {
  it("asks about the name, creates the link once and lets the student turn it off", async () => {
    stubClipboard();
    const requests: ShareRequest[] = [];
    const createAction = vi.fn(async (request: ShareRequest): Promise<ActionResult<ShareLinkData>> => {
      requests.push(request);
      return { ok: true, data: LINK };
    });
    const revokeAction = vi.fn(async (): Promise<ActionResult<{ message: string }>> => ({ ok: true, data: { message: "Link turned off. It no longer opens." } }));
    render(<ShareButton request={{ kind: "MOCK_SCORE", attemptId: "attempt-1" }} createAction={createAction} revokeAction={revokeAction} shows="your score" label="Share result" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Share result" }));
    });
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/never shows your surname, school, contact details or answers/)).toBeTruthy();
    expect((within(dialog).getByRole("radio", { name: /No name/ }) as HTMLInputElement).checked).toBe(true);
    await act(async () => {
      fireEvent.click(within(dialog).getByRole("radio", { name: /First name/ }));
    });
    await act(async () => {
      fireEvent.click(within(dialog).getByRole("button", { name: "Create share link" }));
    });
    expect(requests).toEqual([{ kind: "MOCK_SCORE", attemptId: "attempt-1", nameMode: "FIRST_NAME" }]);
    expect(await within(dialog).findByText(LINK.headline)).toBeTruthy();
    expect(within(dialog).getByText(/stops working on 4 April 2027/)).toBeTruthy();
    expect(within(dialog).getByRole("link", { name: "Share on WhatsApp" }).getAttribute("href")).toBe(LINK.whatsappHref);

    await act(async () => {
      fireEvent.click(within(dialog).getByRole("button", { name: "Turn this link off" }));
    });
    expect(revokeAction).toHaveBeenCalledWith("share-1");
    expect(await within(dialog).findByText("Link turned off. It no longer opens.")).toBeTruthy();
    expect(within(dialog).queryByRole("link", { name: "Share on WhatsApp" })).toBeNull();
  });

  it("shows the service's reason when a result can't be shared", async () => {
    const createAction = vi.fn(async (): Promise<ActionResult<ShareLinkData>> => ({
      ok: false,
      error: { code: "CONFLICT", message: "You can share this result once marking is finished." },
    }));
    render(<ShareButton request={{ kind: "STREAK" }} createAction={createAction} shows="your streak" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Share" }));
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Create share link" }));
    });
    expect(await screen.findByText("You can share this result once marking is finished.")).toBeTruthy();
  });
});

describe("MySharesList", () => {
  const shares = [
    { shareId: "s1", headline: "I've studied 9 days in a row", status: "ACTIVE" as const, createdOn: "5 Oct 2026", expiresOn: "3 Apr 2027", viewCount: 3 },
    { shareId: "s2", headline: "I earned the “Century” badge", status: "REVOKED" as const, createdOn: "1 Oct 2026", expiresOn: "30 Mar 2027", viewCount: 1 },
  ];

  it("lists links with status and views, renews a live one into a new link and turns links off", async () => {
    const renewAction = vi.fn(async (): Promise<ActionResult<ShareLinkData>> => ({ ok: true, data: { ...LINK, shareId: "s1" } }));
    const revokeAction = vi.fn(async (): Promise<ActionResult<{ message: string }>> => ({ ok: true, data: { message: "Link turned off. It no longer opens." } }));
    render(<MySharesList shares={shares} renewAction={renewAction} revokeAction={revokeAction} />);
    expect(screen.getByText("Live")).toBeTruthy();
    expect(screen.getByText("Turned off")).toBeTruthy();
    expect(screen.getByText(/3 views/)).toBeTruthy();
    // Only the live link has actions.
    expect(screen.getAllByRole("button", { name: "Get a new link" })).toHaveLength(1);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Get a new link" }));
    });
    expect(renewAction).toHaveBeenCalledWith("s1");
    const dialog = await screen.findByRole("dialog");
    expect((within(dialog).getByLabelText("New share link") as HTMLInputElement).value).toBe(LINK.url);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Turn off" }));
    });
    expect(revokeAction).toHaveBeenCalledWith("s1");
    expect(await screen.findByText("Link turned off. It no longer opens.")).toBeTruthy();
  });
});

describe("InviteCodeForm", () => {
  it("creates the invite code with a form post and announces it", async () => {
    let calls = 0;
    const action = async (): Promise<FormActionState> => {
      calls += 1;
      return { ok: true, data: { message: "Your invite code is ABCD-2345." } };
    };
    render(<InviteCodeForm action={action} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Get my invite link" }));
    });
    expect(calls).toBe(1);
    expect(await screen.findByText("Your invite code is ABCD-2345.")).toBeTruthy();
  });
});

describe("PublicShareCard", () => {
  it("shows the shared facts only", () => {
    render(
      <PublicShareCard
        kind="MOCK_SCORE"
        snapshot={{
          headline: "I scored 82% in O-Level Mathematics",
          displayName: "Tendai",
          value: 82,
          unit: "PERCENT",
          boardName: "ZIMSEC",
          qualificationName: "O-Level",
          subjectName: "Mathematics",
          achievedOn: "2026-10-05",
        }}
      />,
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("I scored 82% in O-Level Mathematics.");
    expect(screen.getByText("82%")).toBeTruthy();
    expect(screen.getByText("Mock exam result")).toBeTruthy();
    expect(screen.getByText("ZIMSEC · O-Level · Mathematics")).toBeTruthy();
    expect(screen.getByText("— Tendai")).toBeTruthy();
    expect(screen.getByText("5 October 2026")).toBeTruthy();
  });
});
