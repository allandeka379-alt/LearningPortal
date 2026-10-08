/** @vitest-environment jsdom */
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const router = vi.hoisted(() => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import type { SanitizedHtml } from "@/lib/content/types";
import type { ActionResult } from "@/server/lib/errors";
import { ReviewSession, initialSessionState, sessionReducer, type ReviewAction } from "./ReviewSession";
import type { ReviewCardView, ReviewInput, ReviewOutcome } from "./types";

const html = (value: string) => value as SanitizedHtml;

function card(id: string, overrides: Partial<ReviewCardView> = {}): ReviewCardView {
  return {
    flashcardId: id,
    subjectId: "subject-1",
    subjectName: "Mathematics",
    topicName: "Algebra",
    cardType: "DEFINITION",
    frontHtml: html(`<p>Front ${id}</p>`),
    backHtml: html(`<p>Back ${id}</p>`),
    notesHtml: null,
    languageCode: "en",
    isPersonal: false,
    isNew: true,
    phase: "NEW",
    intervals: { AGAIN: "<1m", HARD: "<6m", GOOD: "<10m", EASY: "4d" },
    ...overrides,
  };
}

function outcome(input: ReviewInput, overrides: Partial<ReviewOutcome> = {}): ReviewOutcome {
  return {
    flashcardId: input.flashcardId,
    replayed: false,
    phase: "REVIEW",
    dueAt: "2026-10-09T22:00:00.000Z",
    intervalDays: 4,
    isLearningStep: false,
    isLeech: false,
    nextIntervals: null,
    xpAwarded: 0,
    ...overrides,
  };
}

function setup(cards: ReviewCardView[], reviewAction?: ReviewAction, extra: Partial<Parameters<typeof ReviewSession>[0]> = {}) {
  const action = reviewAction ?? vi.fn<ReviewAction>(async (input) => ({ ok: true, data: outcome(input) }));
  const user = userEvent.setup();
  render(<ReviewSession cards={cards} reviewAction={action} backHref="/app/flashcards" upgradeHref="/pricing" {...extra} />);
  return { user, reviewAction: action as ReturnType<typeof vi.fn<ReviewAction>> };
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ReviewSession", () => {
  it("shows the front, reveals the answer and labels each rating with when the card comes back", async () => {
    const { user } = setup([card("a"), card("b")]);
    expect(screen.getByText("Front a")).toBeTruthy();
    expect(screen.queryByText("Back a")).toBeNull();
    expect(screen.getByText("2 left")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /^Good/ })).toBeNull();

    // The card's sides are named groups (a name on a role-less div is not exposed to screen readers).
    expect(screen.getByRole("group", { name: "Card front" }).textContent).toContain("Front a");
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    expect(screen.getByText("Back a")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole("group", { name: "Answer" }));
    expect(screen.getByRole("group", { name: "How well did you remember it?" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Again, next review in under 1 minute" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Hard, next review in under 6 minutes" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Good, next review in under 10 minutes" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Easy, next review in 4 days" })).toBeTruthy();
    expect(screen.getByText("<10m")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Show answer" })).toBeNull();
  });

  it("reveals with Space and rates with the 1-4 keys, then moves to the next card", async () => {
    const { user, reviewAction } = setup([card("a"), card("b")]);
    await user.keyboard("3"); // ratings are ignored until the answer is shown
    expect(reviewAction).not.toHaveBeenCalled();
    await user.keyboard(" ");
    expect(screen.getByText("Back a")).toBeTruthy();
    await user.keyboard("3");

    await waitFor(() => expect(reviewAction).toHaveBeenCalledTimes(1));
    const input = reviewAction.mock.calls[0]?.[0];
    expect(input).toMatchObject({ flashcardId: "a", rating: "GOOD", subjectId: "subject-1" });
    expect(input?.clientReviewId).toMatch(/^[A-Za-z0-9_.:-]{8,64}$/);
    expect(typeof input?.durationMs).toBe("number");
    expect(Number.isNaN(Date.parse(input?.reviewedAt ?? ""))).toBe(false);

    expect(screen.getByText("Front b")).toBeTruthy();
    expect(screen.queryByText("Back b")).toBeNull();
    expect(screen.getByText("1 left")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole("group", { name: "Card front" }));
    await user.keyboard("{Enter}");
    await user.keyboard("1");
    await waitFor(() => expect(reviewAction).toHaveBeenCalledTimes(2));
    expect(reviewAction.mock.calls[1]?.[0]).toMatchObject({ flashcardId: "b", rating: "AGAIN" });
  });

  it("ignores shortcut keys typed into a form (the report form)", async () => {
    const report = vi.fn(async (): Promise<ActionResult<{ received: true }>> => ({ ok: true, data: { received: true } }));
    const { user, reviewAction } = setup([card("a")], undefined, { reportAction: report });
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Report a problem" }));
    await user.type(screen.getByRole("textbox", { name: /Details/ }), "1 2 3 4");
    expect(reviewAction).not.toHaveBeenCalled();
    expect(screen.getByText("Back a")).toBeTruthy();
  });

  it("keeps the student's place when saving fails, and retries the same review id when back online", async () => {
    let online = false;
    const reviewAction = vi.fn<ReviewAction>(async (input) => {
      if (!online) throw new TypeError("Failed to fetch");
      return { ok: true, data: outcome(input) };
    });
    const { user } = setup([card("a"), card("b")], reviewAction);
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: /^Good/ }));

    expect(screen.getByText("Front b")).toBeTruthy();
    expect(await screen.findByText(/1 answer\s*waiting to be saved/)).toBeTruthy();
    expect(screen.getByText(/You seem to be offline/)).toBeTruthy();
    expect(reviewAction).toHaveBeenCalledTimes(1);

    online = true;
    act(() => {
      window.dispatchEvent(new Event("online"));
    });
    await waitFor(() => expect(reviewAction).toHaveBeenCalledTimes(2));
    expect(reviewAction.mock.calls[1]?.[0].clientReviewId).toBe(reviewAction.mock.calls[0]?.[0].clientReviewId);
    expect(await screen.findByText("All answers saved")).toBeTruthy();
    expect(screen.getByText("Front b")).toBeTruthy();
  });

  it("drops an answer the server refuses for good and says so", async () => {
    const reviewAction = vi.fn<ReviewAction>(async () => ({ ok: false, error: { code: "NOT_FOUND", message: "That flashcard isn't available." } }));
    const { user } = setup([card("a"), card("b")], reviewAction);
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: /^Easy/ }));
    expect(await screen.findByText("One answer couldn't be saved: That flashcard isn't available.")).toBeTruthy();
    expect(reviewAction).toHaveBeenCalledTimes(1);
  });

  it("brings a learning card back in the same session with the server's new labels", async () => {
    const reviewAction = vi.fn<ReviewAction>(async (input) => ({
      ok: true,
      data: outcome(input, { phase: "LEARNING", isLearningStep: true, nextIntervals: { AGAIN: "<1m", HARD: "<6m", GOOD: "<10m", EASY: "4d" } }),
    }));
    const { user } = setup([card("a", { intervals: { AGAIN: "<1m", HARD: "<6m", GOOD: "<10m", EASY: "4d" } })], reviewAction);
    await user.keyboard(" ");
    await user.keyboard("1");
    // The only card comes straight back (learning step), now as a studied card.
    expect(await screen.findByText("Front a")).toBeTruthy();
    expect(screen.queryByText("New")).toBeNull();
    expect(screen.getByText("1 left")).toBeTruthy();
  });

  it("ends with a summary of the session", async () => {
    const reviewAction = vi.fn<ReviewAction>(async (input) => ({ ok: true, data: outcome(input, { xpAwarded: 5 }) }));
    const { user } = setup([card("a")], reviewAction);
    await user.keyboard(" ");
    await user.keyboard("4");
    const heading = await screen.findByRole("heading", { name: "Session complete" });
    expect(document.activeElement).toBe(heading);
    expect(screen.getByText("Cards reviewed").nextElementSibling?.textContent).toBe("1");
    expect(screen.getByText("XP earned").nextElementSibling?.textContent).toBe("5");
    expect(screen.getByText("Easy:").textContent).toContain("Easy");
    expect(screen.getByRole("link", { name: "Back to flashcards" }).getAttribute("href")).toBe("/app/flashcards");
    await user.click(screen.getByRole("button", { name: "Check for more cards" }));
    expect(router.refresh).toHaveBeenCalledTimes(1);
  });

  it("stops with an upgrade prompt when the plan no longer includes flashcards", async () => {
    const reviewAction = vi.fn<ReviewAction>(async () => ({ ok: false, error: { code: "ENTITLEMENT_REQUIRED", message: "Your current plan doesn't include flashcards." } }));
    const { user } = setup([card("a"), card("b")], reviewAction);
    await user.keyboard(" ");
    await user.keyboard("3");
    expect(await screen.findByText("Your current plan doesn't include flashcards.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
    expect(screen.queryByText("Front b")).toBeNull();
  });

  it("hides a card from reviews without rating it", async () => {
    const suspendAction = vi.fn(async (input: { flashcardId: string; suspended: boolean }) => ({ ok: true as const, data: { flashcardId: input.flashcardId, suspended: true } }));
    const { user, reviewAction } = setup([card("a"), card("b")], undefined, { suspendAction });
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Hide this card" }));
    expect(suspendAction).toHaveBeenCalledWith({ flashcardId: "a", suspended: true, subjectId: "subject-1" });
    expect(await screen.findByText("Front b")).toBeTruthy();
    expect(screen.getByText(/Card hidden/)).toBeTruthy();
    expect(reviewAction).not.toHaveBeenCalled();
  });
});

describe("sessionReducer", () => {
  it("re-inserts a learning card after a few other cards", () => {
    const now = Date.now();
    let state = initialSessionState(["a", "b", "c", "d", "e", "f"].map((id) => card(id)), now);
    state = sessionReducer(state, { type: "reveal" });
    const input: ReviewInput = { flashcardId: "a", rating: "AGAIN", durationMs: 1000, clientReviewId: "session-1:1", reviewedAt: new Date(now).toISOString() };
    state = sessionReducer(state, { type: "rate", input, now });
    state = sessionReducer(state, { type: "sendStart" });
    state = sessionReducer(state, {
      type: "sendOk",
      now,
      outcome: outcome(input, { phase: "LEARNING", isLearningStep: true, nextIntervals: { AGAIN: "<1m", HARD: "<6m", GOOD: "<10m", EASY: "4d" } }),
    });
    expect(state.queue.map((c) => c.flashcardId)).toEqual(["b", "c", "d", "e", "a", "f"]);
    expect(state.outbox).toEqual([]);
    expect(state.tally.AGAIN).toBe(1);
  });

  it("does not rate a card whose answer is hidden", () => {
    const state = initialSessionState([card("a")], 0);
    const input: ReviewInput = { flashcardId: "a", rating: "GOOD", durationMs: 0, clientReviewId: "session-1:1", reviewedAt: new Date(0).toISOString() };
    expect(sessionReducer(state, { type: "rate", input, now: 0 })).toBe(state);
  });
});
