/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import type { ActionResult } from "@/server/lib/errors";
import { SchoolEnquiryForm, type EnquiryAction } from "./SchoolEnquiryForm";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

/**
 * Queries are narrowed to the form and to cheap lookups (labels within the form, the submit button by type, results
 * by their text) instead of whole-document role queries, and typing runs without per-keystroke timers, so the file
 * stays fast when the full suite loads the machine.
 */
function setup(results: ActionResult<{ reference: string }>[]) {
  const queue = [...results];
  const action = vi.fn<EnquiryAction>(async () => queue.shift() ?? { ok: true, data: { reference: "SE-00000000" } });
  const user = userEvent.setup({ delay: null });
  const { container } = render(<SchoolEnquiryForm action={action} boards={["ZIMSEC", "Cambridge"]} privacyHref="/legal/privacy" />);
  const form = container.querySelector("form");
  if (!form) throw new Error("form missing");
  const field = (label: string | RegExp) => within(form).getByLabelText(label, { selector: "input, textarea" }) as HTMLInputElement;
  const submit = () => {
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!button) throw new Error("submit button missing");
    return user.click(button);
  };
  return { user, action, container, form, field, submit };
}

describe("SchoolEnquiryForm", () => {
  it("submits the form fields and shows the reference on success", async () => {
    const { user, action, container, field, submit } = setup([{ ok: true, data: { reference: "SE-1A2B3C4D" } }]);
    await user.type(field("School name"), "Example High");
    await user.type(field("Your name"), "T. Moyo");
    await user.type(field("Work email"), "head@example.test");
    await user.click(field("ZIMSEC"));
    await user.click(field(/You may contact me/));
    await submit();

    expect(action).toHaveBeenCalledTimes(1);
    const data = action.mock.calls[0]?.[1];
    expect(data?.get("schoolName")).toBe("Example High");
    expect(data?.getAll("boards")).toEqual(["ZIMSEC"]);
    expect(data?.get("consent")).toBe("on");
    expect(data?.get("website")).toBe("");
    const reference = await within(container).findByText("SE-1A2B3C4D");
    expect(reference.closest('[role="status"]')).not.toBeNull();
  });

  it("shows field errors and keeps what was typed", async () => {
    const { user, form, field, submit } = setup([
      { ok: false, error: { code: "VALIDATION", message: "Please check the highlighted fields.", fieldErrors: { email: ["Enter a valid email address."], consent: ["Please confirm we may contact you about this enquiry."] } } },
    ]);
    await user.type(field("School name"), "Example High");
    await user.type(field("Work email"), "nope");
    await submit();

    const title = await within(form).findByText("Please check the form");
    expect(title.closest('[role="alert"]')).not.toBeNull();
    const email = field("Work email");
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(within(form).getAllByText("Enter a valid email address.").length).toBeGreaterThan(0);
    expect(within(form).getByText("Please confirm we may contact you about this enquiry.")).toBeTruthy();
    expect(field("School name").value).toBe("Example High");
    expect(email.value).toBe("nope");
  });

  it("links the privacy notice outside the consent label", () => {
    const { form } = setup([]);
    const link = within(form).getByText("privacy notice").closest("a");
    expect(link?.getAttribute("href")).toBe("/legal/privacy");
    expect(link?.closest("label")).toBeNull();
    expect(screen.queryAllByText("privacy notice")).toHaveLength(1);
  });
});
