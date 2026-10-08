import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { dueWarning, ExamClockStore, remainingText, TIME_WARNING_SECONDS, warningMessage } from "./exam-clock";
import type { ExamClock } from "./types";

const SERVER_T0 = Date.UTC(2026, 9, 5, 8, 0, 0);

function clock(overrides: Partial<ExamClock> = {}): ExamClock {
  return { attemptId: "a", open: true, serverNowMs: SERVER_T0, deadlineMs: SERVER_T0 + 11 * 60_000, sections: [], ...overrides };
}

describe("warnings", () => {
  it("announces 10, 5 and 1 minute once each, and only the lowest threshold when several are crossed at once", () => {
    expect(TIME_WARNING_SECONDS).toEqual([600, 300, 60]);
    let state = dueWarning(700, new Set());
    expect(state.threshold).toBeNull();
    state = dueWarning(600, state.announced);
    expect(state.threshold).toBe(600);
    expect(dueWarning(590, state.announced).threshold).toBeNull();
    expect(dueWarning(240, new Set()).threshold).toBe(300);
    expect(dueWarning(240, new Set()).announced).toEqual(new Set([600, 300]));
    expect(dueWarning(0, new Set()).threshold).toBeNull();
  });

  it("phrases warnings for the moment they are heard", () => {
    expect(warningMessage(300, 300, null)).toBe("5 minutes left.");
    expect(warningMessage(300, 240, null)).toBe("Less than 5 minutes left.");
    expect(warningMessage(60, 60, "Paper 2")).toBe("Paper 2: 1 minute left.");
    expect(remainingText(605)).toBe("10 minutes remaining");
    expect(remainingText(545)).toBe("9 minutes 5 seconds remaining");
    expect(remainingText(0)).toBe("Time is up");
  });
});

describe("ExamClockStore", () => {
  let deviceNow: number;
  beforeEach(() => {
    vi.useFakeTimers();
    // This device's clock runs 90 seconds behind the server.
    deviceNow = SERVER_T0 - 90_000;
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function advance(ms: number) {
    deviceNow += ms;
    vi.advanceTimersByTime(ms);
  }

  it("renders the server's remaining time before subscribing, then counts down with the clock offset", () => {
    const store = new ExamClockStore(clock(), { deviceNow: () => deviceNow });
    expect(store.getTick().remainingSeconds).toBe(660);
    expect(store.getServerTick()).toBe(store.getTick());
    const unsubscribe = store.subscribe(() => {});
    expect(store.getTick().remainingSeconds).toBe(660);
    advance(30_000);
    expect(store.getTick().remainingSeconds).toBe(630);
    expect(store.serverNow()).toBe(SERVER_T0 + 30_000);
    unsubscribe();
  });

  it("announces each warning once and signals time-up once", () => {
    const onTimeUp = vi.fn();
    const store = new ExamClockStore(clock(), { deviceNow: () => deviceNow });
    store.setHandlers({ onTimeUp });
    store.subscribe(() => {});
    advance(60_000);
    expect(store.getTick().announcement).toBe("10 minutes left.");
    advance(5 * 60_000);
    expect(store.getTick().announcement).toBe("5 minutes left.");
    advance(4 * 60_000);
    expect(store.getTick().announcement).toBe("1 minute left.");
    expect(onTimeUp).not.toHaveBeenCalled();
    advance(60_000);
    expect(store.getTick().remainingSeconds).toBe(0);
    expect(store.getTick().announcement).toBe("Time is up. Your answers are being submitted.");
    expect(store.getPhase().attemptTimeUp).toBe(true);
    expect(onTimeUp).toHaveBeenCalledTimes(1);
    advance(10_000);
    expect(onTimeUp).toHaveBeenCalledTimes(1);
  });

  it("re-syncs to the server clock (focus, visibility) and re-arms time-up when time was added back", () => {
    const onTimeUp = vi.fn();
    const store = new ExamClockStore(clock({ deadlineMs: SERVER_T0 + 5_000 }), { deviceNow: () => deviceNow });
    store.setHandlers({ onTimeUp });
    store.subscribe(() => {});
    advance(6_000);
    expect(onTimeUp).toHaveBeenCalledTimes(1);
    // The server says the deadline is later (e.g. the device slept and its clock drifted): re-armed.
    store.sync(clock({ serverNowMs: SERVER_T0 + 6_000, deadlineMs: SERVER_T0 + 120_000 }), { sentAtMs: deviceNow - 400, receivedAtMs: deviceNow });
    expect(store.getTick().remainingSeconds).toBe(114);
    advance(120_000);
    expect(onTimeUp).toHaveBeenCalledTimes(2);
  });

  it("delivers a time-up observed before handlers were registered (page opened after the deadline)", () => {
    const store = new ExamClockStore(clock({ deadlineMs: SERVER_T0 - 1_000 }), { deviceNow: () => deviceNow });
    store.subscribe(() => {});
    const onTimeUp = vi.fn();
    store.setHandlers({ onTimeUp });
    expect(onTimeUp).toHaveBeenCalledTimes(1);
  });

  it("follows a running paper's clock, announces its end and keeps the phase stable between transitions", () => {
    const onSectionTimeUp = vi.fn();
    const onTimeUp = vi.fn();
    const sections = [
      { sectionNumber: 1, timeLimitSeconds: 3600, startedAtMs: SERVER_T0 - 3_590_000, deadlineMs: SERVER_T0 + 10_000, finishedAtMs: null },
      { sectionNumber: 2, timeLimitSeconds: 5400, startedAtMs: null, deadlineMs: null, finishedAtMs: null },
    ];
    const store = new ExamClockStore(clock({ deadlineMs: null, sections }), { deviceNow: () => deviceNow, sectionTitles: { 1: "Paper 1", 2: "Paper 2" } });
    store.setHandlers({ onSectionTimeUp, onTimeUp });
    store.subscribe(() => {});
    const phase = store.getPhase();
    expect(store.getTick().active).toEqual({ scope: "SECTION", sectionNumber: 1, deadlineMs: SERVER_T0 + 10_000 });
    advance(5_000);
    expect(store.getPhase()).toBe(phase);
    advance(6_000);
    expect(store.getPhase().statuses[1]).toBe("TIME_UP");
    expect(store.getTick().announcement).toBe("Time is up for Paper 1.");
    expect(store.getTick().active).toBeNull();
    expect(onSectionTimeUp).toHaveBeenCalledWith(1);
    // Paper 2 has not been started, so the exam stays open.
    expect(onTimeUp).not.toHaveBeenCalled();
  });
});
