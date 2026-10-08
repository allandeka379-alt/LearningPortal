/** @vitest-environment jsdom */
import { act, cleanup, render, screen, waitFor, within } from "@testing-library/react";
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

import type { TutorMessageView, TutorStreamEvent } from "@/server/tutor/protocol";
import { TutorChat, type RateMessageAction, type TutorChatProps } from "./TutorChat";

/** A fetch whose SSE body the test feeds frame by frame. */
function controllableFetch() {
  const encoder = new TextEncoder();
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  const body = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
    },
  });
  const fetchImpl = vi.fn<typeof fetch>((_url, init) => {
    init?.signal?.addEventListener("abort", () => controller.error(new DOMException("Aborted", "AbortError")));
    return Promise.resolve(new Response(body, { status: 200, headers: { "content-type": "text/event-stream; charset=utf-8" } }));
  });
  return {
    fetchImpl,
    push: (event: TutorStreamEvent) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`)),
    close: () => controller.close(),
    body: () => JSON.parse(String(fetchImpl.mock.calls[0]?.[1]?.body)) as { text: string; mode: string; clientMessageId: string },
  };
}

function fetchReturning(events: TutorStreamEvent[]) {
  const frames = events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
  return vi.fn<typeof fetch>(() =>
    Promise.resolve(new Response(frames, { status: 200, headers: { "content-type": "text/event-stream; charset=utf-8" } })),
  );
}

const CONVERSATION_ID = "0199a1b2-0000-7000-8000-aaaaaaaaaaaa";
const ANSWER_ID = "0199a1b2-0000-7000-8000-bbbbbbbbbbbb";

function done(patch: Partial<Extract<TutorStreamEvent, { type: "done" }>> = {}): TutorStreamEvent {
  return {
    type: "done",
    messageId: ANSWER_ID,
    userMessageId: "0199a1b2-0000-7000-8000-cccccccccccc",
    html: '<p>Rendered <span class="katex">x<sup>2</sup></span></p>',
    status: "COMPLETE",
    turnMode: "TEACH",
    hintLevel: 0,
    quota: { limit: 30, remaining: 29 },
    turnsRemaining: 39,
    title: "Quadratics",
    helplines: null,
    replayed: false,
    ...patch,
  };
}

function setup(overrides: Partial<TutorChatProps> = {}) {
  const rateAction = vi.fn<RateMessageAction>().mockResolvedValue({ ok: true, data: null });
  const props: TutorChatProps = {
    conversationId: CONVERSATION_ID,
    initialMessages: [],
    quota: { limit: 30, remaining: 30 },
    availability: "ready",
    locked: false,
    turnsRemaining: 40,
    maxInputChars: 4000,
    starters: ["Explain this topic from the beginning"],
    upgradeHref: "/pricing",
    newConversationHref: "/app/tutor/new",
    rateAction,
    ...overrides,
  };
  const user = userEvent.setup();
  render(<TutorChat {...props} />);
  return { user, rateAction };
}

function setPointer(fine: boolean): void {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (query: string) => ({ matches: fine && query.includes("pointer: fine"), media: query, addEventListener: () => undefined, removeEventListener: () => undefined }),
  });
}

const status = () => screen.getByRole("status");

beforeEach(() => setPointer(true));

afterEach(() => {
  cleanup();
});

describe("TutorChat streaming", () => {
  it("appends streamed text as plain text, then swaps in the server-rendered answer and announces completion once", async () => {
    const stream = controllableFetch();
    const { user } = setup({ fetchImpl: stream.fetchImpl });
    expect(screen.getByText("30 of 30 messages left today")).toBeTruthy();

    await user.type(screen.getByLabelText("Your message"), "How do I factorise x^2 - 5x + 6?");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(stream.body()).toMatchObject({ text: "How do I factorise x^2 - 5x + 6?", mode: "TEACH" });
    expect(stream.body().clientMessageId).toMatch(/^[A-Za-z0-9_-]{8,64}$/);
    expect(screen.getByText("How do I factorise x^2 - 5x + 6?")).toBeTruthy();
    // Busy: the send button becomes Stop.
    expect(screen.getByRole("button", { name: "Stop the answer" })).toBeTruthy();

    await act(async () => {
      stream.push({ type: "start", turnMode: "TEACH", hintLevel: 0 });
      stream.push({ type: "delta", text: "Find two numbers " });
    });
    await waitFor(() => expect(screen.getByText("Find two numbers")).toBeTruthy());
    await act(async () => stream.push({ type: "delta", text: "that multiply to $6$." }));
    await waitFor(() => expect(screen.getByText("Find two numbers that multiply to $6$.")).toBeTruthy());
    // Tokens are never announced.
    expect(status().textContent).toBe("");

    await act(async () => {
      stream.push(done());
      stream.close();
    });
    await waitFor(() => expect(status().textContent).toBe("The tutor's answer is ready."));
    const conversation = screen.getByRole("list", { name: "Conversation" });
    expect(conversation.querySelector(".katex")).not.toBeNull();
    expect(within(conversation).queryByText("Find two numbers that multiply to $6$.")).toBeNull();
    expect(screen.getByText("29 of 30 messages left today")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Send message" })).toBeTruthy();
  });

  it("sends the chosen mode, shows the answer-mode note and returns to Teach me afterwards", async () => {
    const fetchImpl = fetchReturning([{ type: "start", turnMode: "ANSWER", hintLevel: 4 }, { type: "delta", text: "Step 1" }, done({ turnMode: "ANSWER", hintLevel: 4 })]);
    const { user } = setup({ fetchImpl });
    await user.click(screen.getByRole("radio", { name: /Give me the answer/ }));
    expect(screen.getByText(/Understanding each step is what earns marks/)).toBeTruthy();
    await user.type(screen.getByLabelText("Your message"), "Solve 2x + 4 = 10");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(status().textContent).toBe("The tutor's answer is ready."));
    expect(JSON.parse(String(fetchImpl.mock.calls[0]?.[1]?.body))).toMatchObject({ mode: "ANSWER" });
    expect(screen.getByText("Full worked solution")).toBeTruthy();
    expect((screen.getByRole("radio", { name: /Teach me/ }) as HTMLInputElement).checked).toBe(true);
  });

  it("sends with Enter on desktop, keeps Shift+Enter for new lines, and never sends on Enter with a touch keyboard", async () => {
    const fetchImpl = fetchReturning([done()]);
    const { user } = setup({ fetchImpl });
    const box = screen.getByLabelText("Your message");
    await user.type(box, "line one{Shift>}{Enter}{/Shift}line two");
    expect((box as HTMLTextAreaElement).value).toBe("line one\nline two");
    expect(fetchImpl).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(fetchImpl).toHaveBeenCalledTimes(1));

    cleanup();
    setPointer(false);
    const touch = fetchReturning([done()]);
    const second = setup({ fetchImpl: touch });
    await second.user.type(screen.getByLabelText("Your message"), "hello{Enter}");
    expect(touch).not.toHaveBeenCalled();
    expect((screen.getByLabelText("Your message") as HTMLTextAreaElement).value).toBe("hello\n");
  });

  it("starts from a suggested starter in an empty conversation", async () => {
    const fetchImpl = fetchReturning([done()]);
    const { user } = setup({ fetchImpl });
    await user.click(screen.getByRole("button", { name: "Explain this topic from the beginning" }));
    await waitFor(() => expect(fetchImpl).toHaveBeenCalledTimes(1));
    expect(JSON.parse(String(fetchImpl.mock.calls[0]?.[1]?.body))).toMatchObject({ text: "Explain this topic from the beginning", mode: "TEACH" });
    await waitFor(() => expect(screen.queryByRole("button", { name: "Explain this topic from the beginning" })).toBeNull());
  });

  it("keeps the partial answer when the student stops it", async () => {
    const stream = controllableFetch();
    const { user } = setup({ fetchImpl: stream.fetchImpl });
    await user.type(screen.getByLabelText("Your message"), "Explain osmosis");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    await act(async () => stream.push({ type: "delta", text: "Osmosis is the movement" }));
    await waitFor(() => expect(screen.getByText("Osmosis is the movement")).toBeTruthy());
    await user.click(screen.getByRole("button", { name: "Stop the answer" }));
    await waitFor(() => expect(screen.getByText("Stopped before the end.")).toBeTruthy());
    expect(screen.getByText("Osmosis is the movement")).toBeTruthy();
    expect(status().textContent).toBe("Stopped.");
  });
});

describe("TutorChat error and unavailable states", () => {
  it("shows the upgrade prompt when today's allowance is used up and gives the text back", async () => {
    const fetchImpl = fetchReturning([
      { type: "error", code: "QUOTA_EXCEEDED", message: "You've reached your plan's limit of 30 AI tutor messages today.", upgradeHref: "/pricing" },
    ]);
    const { user } = setup({ fetchImpl });
    await user.type(screen.getByLabelText("Your message"), "One more?");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("You've reached your plan's limit");
    expect(within(alert).getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
    expect((screen.getByLabelText("Your message") as HTMLTextAreaElement).value).toBe("One more?");
    expect((screen.getByLabelText("Your message") as HTMLTextAreaElement).disabled).toBe(true);
    expect(screen.queryByText("One more?", { selector: "p" })).toBeNull();
    expect(screen.getByText("You've used today's tutor messages")).toBeTruthy();
  });

  it("switches to the calm not-configured state when the server has no AI key", async () => {
    const fetchImpl = fetchReturning([{ type: "error", code: "AI_NOT_CONFIGURED", message: "The AI tutor is not configured yet." }]);
    const { user } = setup({ fetchImpl });
    await user.type(screen.getByLabelText("Your message"), "Hello");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(screen.getByText("AI tutor is not configured yet")).toBeTruthy());
    expect((screen.getByLabelText("Your message") as HTMLTextAreaElement).disabled).toBe(true);
  });

  it("never calls the server when the tutor is not configured, and offers no starters", () => {
    const fetchImpl = vi.fn<typeof fetch>();
    setup({ fetchImpl, availability: "not_configured" });
    expect(screen.getByText("AI tutor is not configured yet")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Explain this topic from the beginning" })).toBeNull();
    expect((screen.getByLabelText("Your message") as HTMLTextAreaElement).disabled).toBe(true);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("explains an exam in progress and a closed conversation", async () => {
    const fetchImpl = fetchReturning([{ type: "error", code: "EXAM_IN_PROGRESS", message: "AI help is paused while you have a timed exam or mock exam in progress." }]);
    const { user } = setup({ fetchImpl });
    await user.type(screen.getByLabelText("Your message"), "Question 3?");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect((await screen.findByRole("alert")).textContent).toContain("AI help is paused");

    cleanup();
    const limit = fetchReturning([{ type: "error", code: "TURN_LIMIT", message: "This conversation has reached its limit of 40 messages." }]);
    const second = setup({ fetchImpl: limit });
    await second.user.type(screen.getByLabelText("Your message"), "Again");
    await second.user.click(screen.getByRole("button", { name: "Send message" }));
    const alert = await screen.findByRole("alert");
    expect(within(alert).getByRole("link", { name: "New conversation" }).getAttribute("href")).toBe("/app/tutor/new");
    expect((screen.getByLabelText("Your message") as HTMLTextAreaElement).disabled).toBe(true);
  });

  it("reports a dropped connection without losing the message", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    const { user } = setup({ fetchImpl });
    await user.type(screen.getByLabelText("Your message"), "Are you there?");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect((await screen.findByRole("alert")).textContent).toContain("couldn't reach the tutor");
    expect((screen.getByLabelText("Your message") as HTMLTextAreaElement).value).toBe("Are you there?");
  });
});

describe("TutorChat history, rating and copy", () => {
  const history: TutorMessageView[] = [
    { id: "0199a1b2-0000-7000-8000-000000000001", role: "USER", content: "What is a mole?", html: null, status: "COMPLETE", hintLevel: null, intent: "TEACH", rating: null, createdAt: "2026-10-05T08:00:00.000Z" },
    { id: ANSWER_ID, role: "ASSISTANT", content: "A mole is $6.02 \\times 10^{23}$ particles.", html: '<p>A mole is <span class="katex">6.02</span></p>', status: "COMPLETE", hintLevel: 0, intent: "TEACH", rating: null, createdAt: "2026-10-05T08:00:01.000Z" },
  ];

  it("rates an answer optimistically and rolls back when saving fails", async () => {
    const { user, rateAction } = setup({ initialMessages: history });
    const helpful = screen.getByRole("button", { name: "Yes, helpful" });
    await user.click(helpful);
    expect(rateAction).toHaveBeenCalledWith({ messageId: ANSWER_ID, rating: 1 });
    await waitFor(() => expect(helpful.getAttribute("aria-pressed")).toBe("true"));

    rateAction.mockResolvedValueOnce({ ok: false, error: { code: "NOT_FOUND", message: "We couldn't find that answer." } });
    await user.click(screen.getByRole("button", { name: "No, not helpful" }));
    // The failure is announced (the student's focus stays on the rating button).
    await waitFor(() => expect(screen.getByRole("alert").textContent).toBe("We couldn't find that answer."));
    expect(helpful.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "No, not helpful" }).getAttribute("aria-pressed")).toBe("false");
  });

  it("copies the answer's Markdown source", async () => {
    const { user } = setup({ initialMessages: history });
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("A mole is $6.02 \\times 10^{23}$ particles.");
    expect(await screen.findByRole("button", { name: "Copied" })).toBeTruthy();
    // A changed button label is not read out; the chat's live region says it.
    expect(status().textContent).toBe("Copied to the clipboard.");
  });

  it("offers Continue under a truncated answer", async () => {
    const fetchImpl = fetchReturning([done()]);
    const truncated: TutorMessageView[] = [history[0] as TutorMessageView, { ...(history[1] as TutorMessageView), status: "TRUNCATED" }];
    const { user } = setup({ initialMessages: truncated, fetchImpl });
    expect(screen.getByText("This answer was cut short.")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await waitFor(() => expect(fetchImpl).toHaveBeenCalledTimes(1));
    expect(JSON.parse(String(fetchImpl.mock.calls[0]?.[1]?.body))).toMatchObject({ text: "Please continue from where you stopped." });
  });
});

describe("Tutor controls (accessibility)", () => {
  function descriptionOf(element: Element): string {
    return (element.getAttribute("aria-describedby") ?? "")
      .split(" ")
      .filter(Boolean)
      .map((id) => document.getElementById(id)?.textContent ?? "")
      .join(" ");
  }

  it("mode chips: a named radio group, short names, the mode as the description, and a tick (not colour alone) on the choice", async () => {
    const { user } = setup();
    const group = screen.getByRole("group", { name: "How should the tutor help with this message?" });
    const teach = within(group).getByRole("radio", { name: "Teach me" });
    expect((teach as HTMLInputElement).checked).toBe(true);
    expect(descriptionOf(teach)).toBe("Step by step, with questions to try");
    expect(within(group).getAllByTestId("mode-chip-tick")).toHaveLength(1);
    expect(teach.closest("label")?.querySelector("[data-testid='mode-chip-tick']")).not.toBeNull();

    const answer = within(group).getByRole("radio", { name: "Give me the answer" });
    await user.click(answer);
    expect(answer.closest("label")?.querySelector("[data-testid='mode-chip-tick']")).not.toBeNull();
    expect(teach.closest("label")?.querySelector("[data-testid='mode-chip-tick']")).toBeNull();
    // The answer-mode note is tied to the chosen radio, not only shown below the chips.
    expect(descriptionOf(answer)).toContain("Understanding each step is what earns marks");
  });

  it("two chats on one page never share a radio group", () => {
    setup();
    setup();
    const radios = screen.getAllByRole("radio", { name: "Teach me" }) as HTMLInputElement[];
    expect(radios).toHaveLength(2);
    expect(radios[0]?.name).not.toBe(radios[1]?.name);
  });

  it("the composer is a labelled form with a labelled message box and named icon buttons", () => {
    setup();
    const form = screen.getByRole("form", { name: "Message the tutor" });
    expect(within(form).getByRole("textbox", { name: "Your message" })).toBeTruthy();
    expect(within(form).getByRole("button", { name: "Send message" })).toBeTruthy();
  });
});
