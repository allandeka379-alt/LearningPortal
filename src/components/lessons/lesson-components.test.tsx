/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ActionResult } from "@/server/lib/errors";
import { HEARTBEAT_INTERVAL_MS, TICK_INTERVAL_MS } from "./activity";
import { LessonActivityTracker, type LessonActivityInput } from "./LessonActivityTracker";
import { LessonToc } from "./LessonToc";
import { MarkCompleteForm, type CompleteLessonAction, type CompleteLessonState } from "./MarkCompleteForm";
import { StartLessonCheckForm, type StartLessonCheckAction } from "./StartLessonCheckForm";
import type { TocItem } from "./toc";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

let visibility: DocumentVisibilityState = "visible";
beforeEach(() => {
  visibility = "visible";
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => visibility });
});

const ITEMS: TocItem[] = [
  { id: "c-intro", label: "Introduction", level: 0 },
  { id: "c-method", label: "Method", level: 1 },
  { id: "c-summary", label: "Summary", level: 0 },
];

function mountHeadings(tops: Record<string, number>) {
  for (const [id, top] of Object.entries(tops)) {
    const heading = document.createElement("h2");
    heading.id = id;
    heading.getBoundingClientRect = () => ({ top, bottom: top + 20, left: 0, right: 0, width: 0, height: 20, x: 0, y: top, toJSON: () => ({}) });
    document.body.appendChild(heading);
  }
  return () => {
    for (const id of Object.keys(tops)) document.getElementById(id)?.remove();
  };
}

describe("LessonToc", () => {
  it("lists the sections as anchor links and marks the one being read", () => {
    const unmount = mountHeadings({ "c-intro": -300, "c-method": 40, "c-summary": 900 });
    render(<LessonToc variant="sidebar" items={ITEMS} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    const links = Array.from(nav.querySelectorAll("a"));
    expect(links.map((a) => a.getAttribute("href"))).toEqual(["#c-intro", "#c-method", "#c-summary"]);
    expect(screen.getByRole("link", { name: "Method" }).getAttribute("aria-current")).toBe("location");
    expect(screen.getByRole("link", { name: "Introduction" }).getAttribute("aria-current")).toBeNull();
    unmount();
  });

  it("follows the reader while scrolling", async () => {
    const tops: Record<string, number> = { "c-intro": 10, "c-method": 400, "c-summary": 900 };
    const unmount = mountHeadings(tops);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    render(<LessonToc variant="sidebar" items={ITEMS} />);
    expect(screen.getByRole("link", { name: "Introduction" }).getAttribute("aria-current")).toBe("location");
    // Scrolled down: every heading moved up by the same amount.
    for (const [id, top] of Object.entries({ "c-intro": -830, "c-method": -440, "c-summary": 60 })) {
      (document.getElementById(id) as HTMLElement).getBoundingClientRect = () => ({ top, bottom: top + 20, left: 0, right: 0, width: 0, height: 20, x: 0, y: top, toJSON: () => ({}) });
    }
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    await waitFor(() => expect(screen.getByRole("link", { name: "Summary" }).getAttribute("aria-current")).toBe("location"));
    unmount();
  });

  it("compact variant: a collapsible bar that closes after a jump", () => {
    const unmount = mountHeadings({ "c-intro": 0 });
    const { container } = render(<LessonToc variant="compact" items={ITEMS} />);
    const details = container.querySelector("details") as HTMLDetailsElement;
    expect(screen.getByText("On this page")).toBeTruthy();
    act(() => {
      details.open = true;
      details.dispatchEvent(new Event("toggle"));
    });
    expect(details.open).toBe(true);
    fireEvent.click(screen.getByRole("link", { name: "Summary" }));
    expect(details.open).toBe(false);
    unmount();
  });

  it("renders nothing without entries", () => {
    const { container } = render(<LessonToc variant="sidebar" items={[]} />);
    expect(container.innerHTML).toBe("");
  });
});

describe("LessonActivityTracker", () => {
  function recorder(results: (input: LessonActivityInput) => ActionResult<unknown> = () => ({ ok: true, data: {} })) {
    const calls: LessonActivityInput[] = [];
    const record = vi.fn(async (input: LessonActivityInput) => {
      calls.push(input);
      return results(input);
    });
    return { record, calls };
  }

  async function advance(ms: number) {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(ms);
    });
  }

  it("reports a view on open, then active reading time every heartbeat", async () => {
    vi.useFakeTimers();
    const { record, calls } = recorder();
    render(<LessonActivityTracker lessonId="lesson-1" record={record} />);
    await advance(0);
    expect(calls[0]).toEqual({ lessonId: "lesson-1", secondsSpent: 0, view: true });
    await advance(HEARTBEAT_INTERVAL_MS);
    expect(calls[1]).toEqual({ lessonId: "lesson-1", secondsSpent: HEARTBEAT_INTERVAL_MS / 1000 });
  });

  it("does not count time while the page is hidden, and reports when it becomes hidden", async () => {
    vi.useFakeTimers();
    const { record, calls } = recorder();
    render(<LessonActivityTracker lessonId="lesson-1" record={record} />);
    await advance(2 * TICK_INTERVAL_MS);
    visibility = "hidden";
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(calls.at(-1)).toEqual({ lessonId: "lesson-1", secondsSpent: (2 * TICK_INTERVAL_MS) / 1000 });
    const before = calls.length;
    await advance(5 * HEARTBEAT_INTERVAL_MS);
    expect(calls).toHaveLength(before);
  });

  it("stops for good after a final refusal such as a locked lesson", async () => {
    vi.useFakeTimers();
    const { record, calls } = recorder(() => ({ ok: false, error: { code: "ENTITLEMENT_REQUIRED", message: "Upgrade" } }));
    render(<LessonActivityTracker lessonId="lesson-1" record={record} />);
    await advance(3 * HEARTBEAT_INTERVAL_MS);
    expect(calls).toHaveLength(1);
  });

  it("keeps the time after a temporary failure and sends it with the next heartbeat", async () => {
    vi.useFakeTimers();
    let failNext = false;
    const { record, calls } = recorder((input) => {
      if (input.view) {
        failNext = true;
        return { ok: true, data: {} };
      }
      if (failNext) {
        failNext = false;
        return { ok: false, error: { code: "RATE_LIMITED", message: "Slow down" } };
      }
      return { ok: true, data: {} };
    });
    render(<LessonActivityTracker lessonId="lesson-1" record={record} />);
    await advance(HEARTBEAT_INTERVAL_MS);
    expect(calls[1]?.secondsSpent).toBe(30);
    await advance(HEARTBEAT_INTERVAL_MS);
    expect(calls[2]?.secondsSpent).toBe(60);
  });

  it("reports the remaining time when the reader leaves", async () => {
    vi.useFakeTimers();
    const { record, calls } = recorder();
    const { unmount } = render(<LessonActivityTracker lessonId="lesson-1" record={record} />);
    await advance(3 * TICK_INTERVAL_MS);
    await act(async () => {
      unmount();
    });
    expect(calls.at(-1)).toEqual({ lessonId: "lesson-1", secondsSpent: 15 });
  });
});

describe("MarkCompleteForm", () => {
  function recording(result: CompleteLessonState) {
    const calls: FormData[] = [];
    const action: CompleteLessonAction = async (_state, formData) => {
      calls.push(formData);
      return result;
    };
    return { action, calls };
  }

  it("submits the lesson and announces the result, including real XP", async () => {
    const { action, calls } = recording({ ok: true, data: { message: "Lesson completed. +10 XP." } });
    render(<MarkCompleteForm lessonId="lesson-1" action={action} completed={false} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Mark as complete" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("lessonId")).toBe("lesson-1");
    expect(await screen.findByText("Lesson completed. +10 XP.")).toBeTruthy();
    expect(screen.getByText("Lesson completed")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Mark as complete" })).toBeNull();
    expect(screen.getByRole("status").textContent).toContain("+10 XP");
  });

  it("keeps the button and shows the error when saving fails", async () => {
    const { action } = recording({ ok: false, error: { code: "RATE_LIMITED", message: "Please wait a moment." } });
    render(<MarkCompleteForm lessonId="lesson-1" action={action} completed={false} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Mark as complete" }));
    });
    expect(await screen.findByText("Please wait a moment.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Mark as complete" })).toBeTruthy();
  });

  it("shows the completed state for a lesson completed earlier", () => {
    const { action } = recording(null);
    render(<MarkCompleteForm lessonId="lesson-1" action={action} completed completedLabel="Completed on 5 Oct 2026" />);
    expect(screen.getByText("Lesson completed")).toBeTruthy();
    expect(screen.getByText("Completed on 5 Oct 2026")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });
});

describe("StartLessonCheckForm", () => {
  it("posts the lesson, topic and idempotency key", async () => {
    const calls: FormData[] = [];
    const action: StartLessonCheckAction = async (_state, formData) => {
      calls.push(formData);
      return null;
    };
    render(<StartLessonCheckForm lessonId="lesson-1" topicId="topic-1" idempotencyKey="key-12345678" action={action} upgradeHref="/pricing" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Start the questions" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(Object.fromEntries(calls[0]?.entries() ?? [])).toEqual({ lessonId: "lesson-1", topicId: "topic-1", idempotencyKey: "key-12345678" });
  });

  it("offers the plans page when the plan does not cover the lesson", async () => {
    const action: StartLessonCheckAction = async () => ({ ok: false, error: { code: "ENTITLEMENT_REQUIRED", message: "Your current plan doesn't include full lessons." } });
    render(<StartLessonCheckForm lessonId="lesson-1" topicId="topic-1" idempotencyKey="key-12345678" action={action} mode="retry" upgradeHref="/pricing" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    });
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByText("Your current plan doesn't include full lessons.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
  });

  it("shows the first field error of a validation failure", async () => {
    const action: StartLessonCheckAction = async () => ({
      ok: false,
      error: { code: "VALIDATION", message: "Please check", fieldErrors: { subjectId: ["Add this subject to your subjects to answer its practice questions."] } },
    });
    render(<StartLessonCheckForm lessonId="lesson-1" topicId="topic-1" idempotencyKey="key-12345678" action={action} upgradeHref="/pricing" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Start the questions" }));
    });
    expect(await screen.findByText("Add this subject to your subjects to answer its practice questions.")).toBeTruthy();
  });
});
