/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { ANSWER_MODE_NOTE } from "./labels";
import { SolverForm, type SolveFormAction, type SolveFormState, type SolverFormProps } from "./SolverForm";

const SUBJECT_ID = "0199a1b2-0000-7000-8000-aaaaaaaaaaaa";

function setup(overrides: Partial<SolverFormProps> = {}, result: SolveFormState = null) {
  const calls: FormData[] = [];
  const action = vi.fn<SolveFormAction>(async (_state, formData) => {
    calls.push(formData);
    return result;
  });
  const user = userEvent.setup();
  render(
    <SolverForm
      action={action}
      subjects={[{ subjectId: SUBJECT_ID, name: "Mathematics", qualification: "O-Level" }]}
      maxInputChars={4000}
      maxImageBytes={5 * 1024 * 1024}
      imageUploads
      requestId="solve_first-request"
      upgradeHref="/pricing"
      {...overrides}
    />,
  );
  return { action, calls, user };
}

beforeEach(() => {
  // jsdom has no object URLs: the preview uses a stub.
  URL.createObjectURL = vi.fn(() => "blob:preview");
  URL.revokeObjectURL = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("SolverForm", () => {
  it("defaults to 'Teach me' and offers camera capture and gallery upload", () => {
    setup();
    expect((screen.getByRole("radio", { name: /Teach me/ }) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByRole("radio", { name: /Give me the answer/ }) as HTMLInputElement).checked).toBe(false);
    const camera = screen.getByLabelText("Take a photo");
    expect(camera.getAttribute("type")).toBe("file");
    expect(camera.getAttribute("accept")).toBe("image/*");
    expect(camera.getAttribute("capture")).toBe("environment");
    const gallery = screen.getByLabelText("Upload a photo");
    expect(gallery.getAttribute("accept")).toBe("image/*");
    expect(gallery.hasAttribute("capture")).toBe(false);
    expect(screen.getByRole("textbox", { name: "Your question" }).getAttribute("maxlength")).toBe("4000");
    expect((screen.getByRole("button", { name: "Help me solve it" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("explains the answer mode when it is chosen", async () => {
    const { user } = setup();
    expect(screen.queryByText(ANSWER_MODE_NOTE)).toBeNull();
    await user.click(screen.getByRole("radio", { name: /Give me the answer/ }));
    expect(screen.getByText(ANSWER_MODE_NOTE)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Show the worked answer" })).toBeTruthy();
  });

  it("asks for a question or a photo before sending anything", async () => {
    const { user, action } = setup();
    await user.click(screen.getByRole("button", { name: "Help me solve it" }));
    expect(await screen.findByText("Type your question or add a photo of it.")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Your question" }));
    expect(action).not.toHaveBeenCalled();
  });

  it("sends the question, mode, subject and request id; a different question gets a new request id", async () => {
    const { user, calls } = setup();
    await user.type(screen.getByRole("textbox", { name: "Your question" }), "Solve 2x + 3 = 11");
    await user.selectOptions(screen.getByRole("combobox", { name: /Subject/ }), SUBJECT_ID);
    await user.click(screen.getByRole("radio", { name: /Give me the answer/ }));
    await user.click(screen.getByRole("button", { name: "Show the worked answer" }));
    await waitFor(() => expect(calls).toHaveLength(1));
    const first = calls[0] as FormData;
    expect(first.get("text")).toBe("Solve 2x + 3 = 11");
    expect(first.get("mode")).toBe("ANSWER");
    expect(first.get("subjectId")).toBe(SUBJECT_ID);
    expect(first.get("clientRequestId")).toBe("solve_first-request");
    expect(first.getAll("photo")).toHaveLength(0);

    // The same question again (a retry): the same id, so the server opens the stored answer. The button reads
    // "Working it out…" until the action settles, so wait for its label to come back before clicking again.
    await user.click(await screen.findByRole("button", { name: "Show the worked answer" }));
    await waitFor(() => expect(calls).toHaveLength(2));
    expect(calls[1]?.get("clientRequestId")).toBe("solve_first-request");

    // A different question: a fresh id.
    await user.type(screen.getByRole("textbox", { name: "Your question" }), " please");
    await user.click(await screen.findByRole("button", { name: "Show the worked answer" }));
    await waitFor(() => expect(calls).toHaveLength(3));
    const third = calls[2]?.get("clientRequestId");
    expect(third).toMatch(/^solve_[A-Za-z0-9_-]{8,}$/);
    expect(third).not.toBe("solve_first-request");
  });

  it("previews a photo, sends it, and can remove it", async () => {
    const { user, calls } = setup();
    const file = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 1, 2, 3])], "question.png", { type: "image/png" });
    await user.upload(screen.getByLabelText("Take a photo"), file);
    expect(screen.getByRole("img", { name: "Preview of your question photo" }).getAttribute("src")).toBe("blob:preview");
    expect(screen.getByText("question.png")).toBeTruthy();
    // One photo per question: the pickers are replaced by the preview.
    expect(screen.queryByLabelText("Upload a photo")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Help me solve it" }));
    await waitFor(() => expect(calls).toHaveLength(1));
    const sent = calls[0]?.getAll("photo") ?? [];
    expect(sent).toHaveLength(1);
    expect((sent[0] as File).name).toBe("question.png");

    await user.click(screen.getByRole("button", { name: "Remove photo" }));
    expect(screen.queryByRole("img", { name: "Preview of your question photo" })).toBeNull();
    expect(screen.getByLabelText("Upload a photo")).toBeTruthy();
  });

  it("refuses a photo over the size limit without sending it", async () => {
    const { user, action } = setup({ maxImageBytes: 10 });
    await user.upload(screen.getByLabelText("Upload a photo"), new File([new Uint8Array(64)], "big.jpg", { type: "image/jpeg" }));
    await user.click(screen.getByRole("button", { name: "Help me solve it" }));
    expect((await screen.findByRole("alert")).textContent).toMatch(/too large/);
    expect(action).not.toHaveBeenCalled();
  });

  it("shows server field errors and an upgrade prompt for plan limits", async () => {
    const { user } = setup({}, { ok: false, error: { code: "QUOTA_EXCEEDED", message: "You've reached your plan's limit of 3 AI solver requests today." } });
    await user.type(screen.getByRole("textbox", { name: "Your question" }), "Solve 2x = 6");
    await user.click(screen.getByRole("button", { name: "Help me solve it" }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("You've reached your plan's limit");
    expect(screen.getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
  });

  it("links a field error to the question box", async () => {
    const { user } = setup({}, { ok: false, error: { code: "VALIDATION", message: "Your question is too long.", fieldErrors: { text: ["Please keep your question under 4000 characters."] } } });
    await user.type(screen.getByRole("textbox", { name: "Your question" }), "x");
    await user.click(screen.getByRole("button", { name: "Help me solve it" }));
    const box = screen.getByRole("textbox", { name: "Your question" });
    await waitFor(() => expect(box.getAttribute("aria-invalid")).toBe("true"));
    const description = (box.getAttribute("aria-describedby") ?? "")
      .split(" ")
      .map((id) => document.getElementById(id)?.textContent ?? "")
      .join(" ");
    expect(description).toContain("Please keep your question under 4000 characters.");
  });

  it("answers a safeguarding message with help contacts", async () => {
    const { user } = setup({}, { ok: true, data: { kind: "SAFEGUARD", helplines: [{ name: "Childline", phone: "116", description: "Free, 24 hours" }] } });
    await user.type(screen.getByRole("textbox", { name: "Your question" }), "I feel hopeless");
    await user.click(screen.getByRole("button", { name: "Help me solve it" }));
    expect(await screen.findByText("You don't have to deal with this alone")).toBeTruthy();
    expect(screen.getByRole("link", { name: "116" }).getAttribute("href")).toBe("tel:116");
    expect(screen.getByText("Free, 24 hours")).toBeTruthy();
  });

  it("without photo uploads in the plan: no photo pickers, an upgrade link instead", () => {
    setup({ imageUploads: false });
    expect(screen.queryByLabelText("Take a photo")).toBeNull();
    expect(screen.getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
  });

  it("cannot be sent once today's allowance is used up", () => {
    setup({ blocked: true });
    expect((screen.getByRole("button", { name: "Help me solve it" }) as HTMLButtonElement).disabled).toBe(true);
  });
});
