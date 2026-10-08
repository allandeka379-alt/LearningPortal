/** @vitest-environment jsdom */
import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/app/plan" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { ActiveNavList } from "@/components/layout/ActiveNavList";
import { Button } from "./Button";
import { buttonStyles } from "./button-styles";
import { Dialog, DialogClose } from "./Dialog";
import { IconButton } from "./IconButton";
import { RadioGroup } from "./RadioGroup";
import { ToastProvider, useToast } from "./Toast";

/**
 * Accessibility contracts of the shared primitives (§43, §29): touch targets on touch screens, labels that wrap
 * instead of being cut at the largest text size, descriptions wired with aria-describedby, and Escape handled through
 * React state. jsdom has no layout, so sizes are asserted through the utilities that produce them.
 */

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

afterEach(cleanup);

const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);

describe("touch targets", () => {
  it("every button size is 44px on touch screens; small sizes shrink only with a precise pointer", () => {
    for (const size of ["sm", "md", "lg"] as const) {
      const classes = buttonStyles({ size }).split(/\s+/);
      expect(classes.some((c) => c === "min-h-11" || c === "min-h-12")).toBe(true);
      expect(classes.filter((c) => /^min-h-(9|10)$/.test(c))).toEqual([]);
    }
    expect(buttonStyles({ size: "sm" }).split(/\s+/)).toContain("pointer-fine:min-h-9");
    const iconSm = buttonStyles({ size: "sm", iconOnly: true }).split(/\s+/);
    expect(iconSm).toContain("size-11");
    expect(iconSm).toContain("pointer-fine:size-9");
  });

  it("small Button and IconButton keep their names and the touch size", () => {
    render(
      <>
        <Button size="sm">Hide this card</Button>
        <IconButton size="sm" aria-label="Remove filter" icon={<svg aria-hidden="true" />} />
      </>,
    );
    expect(classesOf(screen.getByRole("button", { name: "Hide this card" }))).toContain("min-h-11");
    expect(classesOf(screen.getByRole("button", { name: "Remove filter" }))).toContain("size-11");
  });

  it("the toast's dismiss button is named and extends its 32px icon to a 44px hit area", async () => {
    function Trigger() {
      const { toast } = useToast();
      return (
        <button type="button" onClick={() => toast({ title: "Saved", duration: null })}>
          Save
        </button>
      );
    }
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    const dismiss = await screen.findByRole("button", { name: "Dismiss notification" });
    const classes = classesOf(dismiss);
    expect(classes).toContain("relative");
    expect(classes).toContain("after:absolute");
    expect(classes).toContain("after:-inset-1.5");
    await user.click(dismiss);
    expect(screen.queryByText("Saved")).toBeNull();
  });
});

describe("mobile tab bar at large text sizes", () => {
  const items = [
    { href: "/app", label: "Home", icon: null },
    { href: "/app/plan", label: "Study plan", icon: null },
    { href: "/teacher/announcements", label: "Announcements", icon: null },
  ];

  it("wraps long labels onto a second line instead of truncating them, and marks the current page", () => {
    render(<ActiveNavList items={items} variant="tabbar" />);
    const current = screen.getByRole("link", { name: "Study plan" });
    expect(current.getAttribute("aria-current")).toBe("page");
    for (const item of items) {
      const label = within(screen.getByRole("link", { name: item.label })).getByText(item.label);
      const classes = classesOf(label);
      expect(classes).not.toContain("truncate");
      expect(classes).toContain("line-clamp-2");
    }
  });

  it("the sidebar (which scales with the text) keeps single-line labels", () => {
    render(<ActiveNavList items={items} variant="sidebar" />);
    expect(classesOf(within(screen.getByRole("link", { name: "Home" })).getByText("Home"))).toContain("truncate");
  });
});

describe("RadioGroup descriptions", () => {
  it("describes the group with its hint, its own error and an outside error region, in that order", () => {
    render(
      <>
        <RadioGroup legend="Target grade" name="grade" options={[{ value: "A", label: "A" }]} hint="Estimates only." error="Choose a grade." describedBy="form-error" />
        <div id="form-error">Please check your answer.</div>
      </>,
    );
    const group = screen.getByRole("group", { name: "Target grade" });
    const ids = (group.getAttribute("aria-describedby") ?? "").split(" ");
    expect(ids).toHaveLength(3);
    expect(ids.map((id) => document.getElementById(id)?.textContent)).toEqual(["Estimates only.", "Choose a grade.", "Please check your answer."]);
  });
});

describe("Dialog and Escape", () => {
  it("Escape closes an uncontrolled dialog through its state and focus returns to the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Dialog title="Leave the exam?" trigger={<Button variant="outline">Leave</Button>} footer={<DialogClose data-autofocus>Keep going</DialogClose>}>
        Your answers so far are saved.
      </Dialog>,
    );
    const trigger = screen.getByRole("button", { name: "Leave" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Leave the exam?" });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: "Keep going" }));

    const cancel = new Event("cancel", { cancelable: true });
    act(() => {
      dialog.dispatchEvent(cancel);
    });
    expect(cancel.defaultPrevented).toBe(true);
    expect(dialog.hasAttribute("open")).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });
});
