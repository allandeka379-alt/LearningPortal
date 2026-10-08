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

import type { SanitizedHtml } from "@/lib/content/types";
import type { ActionResult } from "@/server/lib/errors";
import { PersonalCardForm, type CardFormSubject, type CardPreviewHtml, type PersonalCardFormProps, type PersonalCardValues } from "./PersonalCardForm";

const SUBJECTS: CardFormSubject[] = [
  {
    subjectId: "maths",
    name: "Mathematics",
    topics: [
      { id: "algebra", name: "Algebra", code: "1", depth: 0 },
      { id: "indices", name: "Indices", code: "1.1", depth: 1 },
    ],
  },
  { subjectId: "biology", name: "Biology", topics: [{ id: "cells", name: "Cells", code: null, depth: 0 }] },
];

type SaveAction = PersonalCardFormProps["saveAction"];

function setup(props: Partial<PersonalCardFormProps> = {}) {
  const saveAction = vi.fn<SaveAction>(async () => ({ ok: true, data: { id: "new-card" } }));
  const previewAction = vi.fn(async (): Promise<ActionResult<CardPreviewHtml>> => ({
    ok: true,
    data: { frontHtml: "<p>Rendered front</p>" as SanitizedHtml, backHtml: "<p>Rendered back</p>" as SanitizedHtml, notesHtml: null },
  }));
  const user = userEvent.setup();
  render(<PersonalCardForm mode="create" subjects={SUBJECTS} saveAction={saveAction} previewAction={previewAction} doneHref="/app/flashcards" {...props} />);
  return { user, saveAction: (props.saveAction as typeof saveAction | undefined) ?? saveAction, previewAction };
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("PersonalCardForm", () => {
  it("saves a new card, then clears the text for the next one and keeps the subject and topic", async () => {
    const { user, saveAction } = setup({ initial: { subjectId: "maths", topicId: "indices" } });
    expect((screen.getByRole("combobox", { name: "Subject" }) as HTMLSelectElement).value).toBe("maths");
    expect((screen.getByRole("combobox", { name: /Topic/ }) as HTMLSelectElement).value).toBe("indices");
    await user.selectOptions(screen.getByRole("combobox", { name: "Kind of card" }), "FORMULA");
    await user.type(screen.getByRole("textbox", { name: /Front/ }), "Product of powers");
    await user.type(screen.getByRole("textbox", { name: /Back/ }), "a^m × a^n = a^(m+n)");
    await user.click(screen.getByRole("button", { name: "Save card" }));

    expect(saveAction).toHaveBeenCalledWith({
      subjectId: "maths",
      topicId: "indices",
      cardType: "FORMULA",
      front: "Product of powers",
      back: "a^m × a^n = a^(m+n)",
      notes: null,
    } satisfies PersonalCardValues);
    expect(await screen.findByText(/Card saved/)).toBeTruthy();
    expect((screen.getByRole("textbox", { name: /Front/ }) as HTMLTextAreaElement).value).toBe("");
    expect((screen.getByRole("combobox", { name: /Topic/ }) as HTMLSelectElement).value).toBe("indices");
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: /Front/ }));
  });

  it("offers only the chosen subject's topics", async () => {
    const { user } = setup();
    const topic = screen.getByRole("combobox", { name: /Topic/ });
    expect(within(topic).getAllByRole("option").map((o) => o.textContent?.trim())).toEqual(["No particular topic", "1 Algebra", "1.1 Indices"]);
    await user.selectOptions(screen.getByRole("combobox", { name: "Subject" }), "biology");
    expect(within(screen.getByRole("combobox", { name: /Topic/ })).getAllByRole("option").map((o) => o.textContent?.trim())).toEqual(["No particular topic", "Cells"]);
  });

  it("shows the server's field errors and keeps what was typed", async () => {
    const saveAction = vi.fn<SaveAction>(async () => ({
      ok: false,
      error: { code: "VALIDATION", message: "Please check the highlighted fields and try again.", fieldErrors: { back: ["Write the back of the card."] } },
    }));
    const { user } = setup({ saveAction });
    await user.type(screen.getByRole("textbox", { name: /Front/ }), "Osmosis");
    await user.click(screen.getByRole("button", { name: "Save card" }));
    expect(await screen.findByText("Write the back of the card.")).toBeTruthy();
    expect(screen.getByText("Please check the highlighted fields and try again.")).toBeTruthy();
    expect((screen.getByRole("textbox", { name: /Front/ }) as HTMLTextAreaElement).value).toBe("Osmosis");
    expect(screen.getByRole("textbox", { name: /Back/ }).getAttribute("aria-invalid")).toBe("true");
  });

  it("previews the card rendered by the server", async () => {
    const { user, previewAction } = setup();
    await user.type(screen.getByRole("textbox", { name: /Front/ }), "Speed");
    await user.type(screen.getByRole("textbox", { name: /Back/ }), "$v = d/t$");
    await user.click(screen.getByRole("button", { name: "Preview" }));
    expect(previewAction).toHaveBeenCalledWith({ front: "Speed", back: "$v = d/t$", notes: null });
    const preview = await screen.findByRole("region", { name: "Preview" });
    expect(within(preview).getByText("Rendered back")).toBeTruthy();
  });

  it("edits an existing card with its id", async () => {
    const saveAction = vi.fn<SaveAction>(async () => ({ ok: true, data: { id: "c1" } }));
    const { user } = setup({
      mode: "edit",
      saveAction,
      initial: { id: "c1", subjectId: "biology", topicId: "cells", cardType: "FACT", front: "Cell", back: "Unit of life", notes: "Basic" },
    });
    await user.clear(screen.getByRole("textbox", { name: /Back/ }));
    await user.type(screen.getByRole("textbox", { name: /Back/ }), "Smallest unit of life");
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    expect(saveAction).toHaveBeenCalledWith(expect.objectContaining({ id: "c1", subjectId: "biology", topicId: "cells", back: "Smallest unit of life", notes: "Basic" }));
    expect(await screen.findByText("Changes saved.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Cancel" }).getAttribute("href")).toBe("/app/flashcards");
  });
});
