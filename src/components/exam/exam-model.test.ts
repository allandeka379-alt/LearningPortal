import { describe, expect, it } from "vitest";
import {
  activeDeadline,
  answerSummary,
  clampPosition,
  formatClock,
  formatTimeLimit,
  nextPosition,
  positionLock,
  previousPosition,
  sectionFinishDecision,
  sectionStartDecision,
  sectionStatus,
  sectionStatusLabel,
  spokenDuration,
  timeUpDue,
} from "./exam-model";
import type { ExamSectionClock } from "./types";

const MIN = 60_000;
const T0 = Date.UTC(2026, 9, 5, 8, 0, 0);

function paper(sectionNumber: number, overrides: Partial<ExamSectionClock> = {}): ExamSectionClock {
  return { sectionNumber, timeLimitSeconds: 3600, startedAtMs: null, deadlineMs: null, finishedAtMs: null, ...overrides };
}

const running = (n: number, deadlineMs: number) => paper(n, { startedAtMs: deadlineMs - 60 * MIN, deadlineMs });

describe("section status", () => {
  it("classifies untimed, not started, running, finished and time-up papers", () => {
    expect(sectionStatus(paper(1, { timeLimitSeconds: null }), T0)).toBe("UNTIMED");
    expect(sectionStatus(paper(1), T0)).toBe("NOT_STARTED");
    expect(sectionStatus(running(1, T0 + MIN), T0)).toBe("RUNNING");
    expect(sectionStatus(running(1, T0), T0)).toBe("TIME_UP");
    expect(sectionStatus(paper(1, { startedAtMs: T0 - MIN, deadlineMs: T0 + MIN, finishedAtMs: T0 }), T0)).toBe("FINISHED");
  });

  it("labels papers in plain language", () => {
    expect(sectionStatusLabel("NOT_STARTED", null)).toBe("Not started");
    expect(sectionStatusLabel("RUNNING", 125)).toBe("02:05 left");
    expect(sectionStatusLabel("FINISHED", null)).toBe("Finished");
    expect(sectionStatusLabel("TIME_UP", 0)).toBe("Time is up");
    expect(sectionStatusLabel("UNTIMED", null)).toBe("");
  });
});

describe("starting and finishing papers (one at a time)", () => {
  it("starts a paper only when no other paper is running", () => {
    const sections = [running(1, T0 + 10 * MIN), paper(2)];
    expect(sectionStartDecision(sections, 2, T0)).toEqual({ kind: "BLOCKED", runningSectionNumber: 1 });
    expect(sectionStartDecision(sections, 1, T0)).toEqual({ kind: "ALREADY_RUNNING" });
    expect(sectionStartDecision(sections, 2, T0 + 10 * MIN)).toEqual({ kind: "START" });
    expect(sectionStartDecision(sections, 1, T0 + 10 * MIN)).toEqual({ kind: "CLOSED" });
    expect(sectionStartDecision([paper(1, { timeLimitSeconds: null })], 1, T0)).toEqual({ kind: "UNTIMED" });
    expect(sectionStartDecision(sections, 9, T0)).toEqual({ kind: "UNKNOWN" });
  });

  it("finishes only a running timed paper", () => {
    const sections = [running(1, T0 + MIN), paper(2), paper(3, { timeLimitSeconds: null })];
    expect(sectionFinishDecision(sections, 1, T0)).toEqual({ kind: "FINISH" });
    expect(sectionFinishDecision(sections, 2, T0)).toEqual({ kind: "NOT_STARTED" });
    expect(sectionFinishDecision(sections, 3, T0)).toEqual({ kind: "UNTIMED" });
    expect(sectionFinishDecision(sections, 1, T0 + 2 * MIN)).toEqual({ kind: "CLOSED" });
    expect(sectionFinishDecision(sections, 7, T0)).toEqual({ kind: "UNKNOWN" });
  });
});

describe("the countdown's deadline", () => {
  it("is the overall deadline, or a running paper that ends first", () => {
    expect(activeDeadline({ deadlineMs: null, sections: [] }, T0)).toBeNull();
    expect(activeDeadline({ deadlineMs: T0 + 30 * MIN, sections: [] }, T0)).toEqual({ scope: "ATTEMPT", deadlineMs: T0 + 30 * MIN });
    expect(activeDeadline({ deadlineMs: T0 + 30 * MIN, sections: [running(2, T0 + 5 * MIN)] }, T0)).toEqual({
      scope: "SECTION",
      sectionNumber: 2,
      deadlineMs: T0 + 5 * MIN,
    });
    expect(activeDeadline({ deadlineMs: null, sections: [paper(1), running(2, T0 + 5 * MIN)] }, T0)?.scope).toBe("SECTION");
    // A paper whose own time is up is no longer the countdown; nothing else is timed.
    expect(activeDeadline({ deadlineMs: null, sections: [running(2, T0)] }, T0)).toBeNull();
    // The overall deadline stays visible at 00:00 once passed.
    expect(activeDeadline({ deadlineMs: T0 - 1, sections: [] }, T0)?.scope).toBe("ATTEMPT");
  });
});

describe("time-up (auto-submit)", () => {
  it("is due when the overall deadline has passed", () => {
    expect(timeUpDue({ deadlineMs: T0, sections: [] }, T0 - 1)).toBe(false);
    expect(timeUpDue({ deadlineMs: T0, sections: [] }, T0)).toBe(true);
    expect(timeUpDue({ deadlineMs: null, sections: [] }, T0)).toBe(false);
  });

  it("without an overall deadline, is due only when every timed paper is over", () => {
    const finished = paper(1, { startedAtMs: T0 - 60 * MIN, deadlineMs: T0 + MIN, finishedAtMs: T0 - MIN });
    expect(timeUpDue({ deadlineMs: null, sections: [finished, running(2, T0 + MIN)] }, T0)).toBe(false);
    expect(timeUpDue({ deadlineMs: null, sections: [finished, running(2, T0)] }, T0)).toBe(true);
    // A paper never started keeps the attempt open (it may be sat later).
    expect(timeUpDue({ deadlineMs: null, sections: [running(1, T0), paper(2)] }, T0)).toBe(false);
    // An untimed paper is closed only by submitting.
    expect(timeUpDue({ deadlineMs: null, sections: [running(1, T0), paper(2, { timeLimitSeconds: null })] }, T0)).toBe(false);
  });
});

describe("answer locks", () => {
  it("locks answers when time is up, before a paper starts and after it closes", () => {
    const clock = { deadlineMs: null, sections: [running(1, T0 + MIN), paper(2), running(3, T0 - 1)] };
    expect(positionLock(clock, null, T0)).toBe("OPEN");
    expect(positionLock(clock, 1, T0)).toBe("OPEN");
    expect(positionLock(clock, 2, T0)).toBe("NOT_STARTED");
    expect(positionLock(clock, 3, T0)).toBe("SECTION_CLOSED");
    expect(positionLock({ deadlineMs: T0, sections: [] }, null, T0)).toBe("TIME_UP");
  });
});

describe("answers and navigation", () => {
  it("summarises answered, unanswered and flagged questions", () => {
    expect(
      answerSummary([
        { position: 3, answered: false, flagged: true },
        { position: 1, answered: true, flagged: false },
        { position: 2, answered: false, flagged: false },
      ]),
    ).toEqual({ total: 3, answered: 1, unanswered: [2, 3], flagged: [3] });
  });

  it("moves between questions within bounds; linear papers never go back", () => {
    expect(nextPosition(1, 3)).toBe(2);
    expect(nextPosition(3, 3)).toBeNull();
    expect(previousPosition(2, true)).toBe(1);
    expect(previousPosition(1, true)).toBeNull();
    expect(previousPosition(2, false)).toBeNull();
    expect(clampPosition(9, 4)).toBe(4);
    expect(clampPosition(null, 4)).toBe(1);
    expect(clampPosition(0, 4)).toBe(1);
  });
});

describe("time formatting", () => {
  it("formats the countdown and its spoken form", () => {
    expect(formatClock(3909)).toBe("1:05:09");
    expect(formatClock(599)).toBe("09:59");
    expect(formatClock(-4)).toBe("00:00");
    expect(spokenDuration(3909)).toBe("1 hour 5 minutes");
    expect(spokenDuration(599)).toBe("9 minutes 59 seconds");
    expect(spokenDuration(60)).toBe("1 minute");
    expect(spokenDuration(45)).toBe("45 seconds");
    expect(spokenDuration(0)).toBe("0 seconds");
  });

  it("formats time limits in whole minutes", () => {
    expect(formatTimeLimit(1800)).toBe("30 min");
    expect(formatTimeLimit(5400)).toBe("1 h 30 min");
    expect(formatTimeLimit(7200)).toBe("2 h");
    expect(formatTimeLimit(61)).toBe("2 min");
  });
});
