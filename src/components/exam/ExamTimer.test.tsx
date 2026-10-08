/** @vitest-environment jsdom */
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExamClockStore } from "./exam-clock";
import { ExamTimer } from "./ExamTimer";
import type { ExamClock } from "./types";

const SERVER_T0 = Date.UTC(2026, 9, 5, 8, 0, 0);

function clock(overrides: Partial<ExamClock> = {}): ExamClock {
  return { attemptId: "attempt", open: true, serverNowMs: SERVER_T0, deadlineMs: SERVER_T0 + (11 * 60 + 3) * 1000, sections: [], ...overrides };
}

const visibleTime = () => screen.getByRole("timer").querySelector("[aria-hidden='true']:not(svg)")?.textContent;
const liveRegion = () => document.querySelector("p[aria-live='polite']")?.textContent ?? "";

async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  // This device's clock is 45 seconds behind the server's.
  vi.setSystemTime(SERVER_T0 - 45_000);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("ExamTimer", () => {
  it("shows the server's remaining time, counts down against the server deadline and re-syncs", async () => {
    const store = new ExamClockStore(clock());
    render(<ExamTimer store={store} />);
    expect(visibleTime()).toBe("11:03");
    expect(screen.getByRole("timer").getAttribute("aria-label")).toBe("Time left");
    await advance(3_000);
    expect(visibleTime()).toBe("11:00");
    // The server says 2 minutes are left (e.g. after the device slept): the countdown follows the server.
    await act(async () => {
      store.sync(clock({ serverNowMs: SERVER_T0 + 3_000, deadlineMs: SERVER_T0 + 123_000 }), { sentAtMs: Date.now() - 200, receivedAtMs: Date.now() });
    });
    expect(visibleTime()).toBe("02:00");
  });

  it("announces 10, 5 and 1 minute once each and fires the auto-submit callback once at zero", async () => {
    const onTimeUp = vi.fn();
    const store = new ExamClockStore(clock());
    store.setHandlers({ onTimeUp });
    render(<ExamTimer store={store} />);
    expect(liveRegion()).toBe("");
    await advance(63_000);
    expect(liveRegion()).toBe("10 minutes left.");
    expect(screen.getByRole("timer").dataset.level).toBe("normal");
    await advance(30_000);
    expect(liveRegion()).toBe("10 minutes left.");
    await advance(270_000);
    expect(liveRegion()).toBe("5 minutes left.");
    expect(screen.getByRole("timer").dataset.level).toBe("low");
    await advance(240_000);
    expect(liveRegion()).toBe("1 minute left.");
    expect(screen.getByRole("timer").dataset.level).toBe("critical");
    expect(onTimeUp).not.toHaveBeenCalled();
    await advance(60_000);
    expect(visibleTime()).toBe("Time is up");
    expect(liveRegion()).toBe("Time is up. Your answers are being submitted.");
    expect(onTimeUp).toHaveBeenCalledTimes(1);
    await advance(15_000);
    expect(onTimeUp).toHaveBeenCalledTimes(1);
  });

  it("names a paper's own countdown and says when an attempt has no time limit", async () => {
    const paperClock = clock({
      deadlineMs: null,
      sections: [{ sectionNumber: 2, timeLimitSeconds: 600, startedAtMs: SERVER_T0 - 60_000, deadlineMs: SERVER_T0 + 540_000, finishedAtMs: null }],
    });
    const { unmount } = render(<ExamTimer store={new ExamClockStore(paperClock)} sectionTitles={{ 2: "Paper 2" }} />);
    expect(screen.getByRole("timer").getAttribute("aria-label")).toBe("Paper 2: time left");
    expect(visibleTime()).toBe("09:00");
    unmount();
    render(<ExamTimer store={new ExamClockStore(clock({ deadlineMs: null }))} />);
    expect(screen.queryByRole("timer")).toBeNull();
    expect(screen.getByText("No time limit")).toBeTruthy();
  });
});
