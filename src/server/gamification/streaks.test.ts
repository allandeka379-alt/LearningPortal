import { describe, expect, it } from "vitest";
import { addDays, localDateString, type LocalDate } from "@/lib/dates";
import {
  applyActivityDay,
  currentStreakAsOf,
  dailyGoalMet,
  initialStreakState,
  qualifyingActivities,
  settleStreak,
  streakStatus,
  weeklyGoalProgress,
  type StreakEvent,
  type StreakState,
} from "./streaks";

const MON = "2026-10-05"; // ISO week 2026-W41

/** Applies goal-met days in order and returns the final state plus all events. */
function run(dates: readonly LocalDate[], start: StreakState = initialStreakState()) {
  let state = start;
  const events: StreakEvent[] = [];
  for (const date of dates) {
    const update = applyActivityDay(state, date, true);
    state = update.state;
    events.push(...update.events);
  }
  return { state, events };
}

const days = (start: LocalDate, n: number) => Array.from({ length: n }, (_, i) => addDays(start, i));

describe("daily goal definition", () => {
  const none = { questionsAnswered: 0, lessonsCompleted: 0, flashcardsReviewed: 0, mockExamsCompleted: 0 };

  it("is met by any single qualifying activity", () => {
    expect(dailyGoalMet(none)).toBe(false);
    expect(dailyGoalMet({ ...none, questionsAnswered: 1 })).toBe(true);
    expect(dailyGoalMet({ ...none, lessonsCompleted: 1 })).toBe(true);
    expect(dailyGoalMet({ ...none, mockExamsCompleted: 1 })).toBe(true);
    expect(dailyGoalMet({ ...none, flashcardsReviewed: 4 })).toBe(false);
    expect(dailyGoalMet({ ...none, flashcardsReviewed: 5 })).toBe(true);
  });

  it("supports stricter configured goals", () => {
    expect(qualifyingActivities({ ...none, questionsAnswered: 3, flashcardsReviewed: 12 })).toBe(5);
    expect(dailyGoalMet({ ...none, questionsAnswered: 3 }, { minQualifyingActivities: 5 })).toBe(false);
    expect(dailyGoalMet({ ...none, questionsAnswered: 3, studyMinutes: 10 }, { minStudyMinutes: 15 })).toBe(false);
    expect(dailyGoalMet({ ...none, questionsAnswered: 3, studyMinutes: 20 }, { minStudyMinutes: 15 })).toBe(true);
    expect(dailyGoalMet({ ...none, questionsAnswered: Number.NaN })).toBe(false);
  });
});

describe("applyActivityDay", () => {
  it("starts, extends and remembers the longest streak", () => {
    const { state, events } = run(days(MON, 3));
    expect(state).toMatchObject({ currentStreak: 3, longestStreak: 3, lastActiveDate: "2026-10-07" });
    expect(events.filter((e) => e.type === "STREAK_STARTED")).toHaveLength(1);
    expect(events).toContainEqual({ type: "STREAK_EXTENDED", date: "2026-10-07", length: 3 });
    expect(events).toContainEqual({ type: "MILESTONE", days: 3 });
  });

  it("is idempotent within a day", () => {
    const once = run([MON]);
    const twice = applyActivityDay(once.state, MON, true);
    expect(twice.state).toEqual(once.state);
    expect(twice.events).toEqual([]);
  });

  it("does nothing for a day without the goal except settle missed days", () => {
    const { state } = run([MON]);
    expect(applyActivityDay(state, "2026-10-06", false)).toEqual({ state, events: [] });
    const broken = applyActivityDay(state, "2026-10-09", false);
    expect(broken.state.currentStreak).toBe(0);
    expect(broken.events).toEqual([{ type: "STREAK_BROKEN", previousLength: 1 }]);
  });

  it("restarts at 1 after a missed day without a freeze", () => {
    const { state } = run(["2026-10-05", "2026-10-06", "2026-10-08"]);
    expect(state).toMatchObject({ currentStreak: 1, longestStreak: 2, lastActiveDate: "2026-10-08" });
  });

  it("ignores out-of-order (older) days", () => {
    const { state } = run(["2026-10-05", "2026-10-06"]);
    expect(applyActivityDay(state, "2026-10-04", true)).toEqual({ state, events: [] });
  });

  it("rejects malformed dates", () => {
    expect(() => applyActivityDay(initialStreakState(), "2026-13-01", true)).toThrow(RangeError);
    expect(() => settleStreak(initialStreakState(), "05/10/2026")).toThrow(RangeError);
  });
});

describe("weekly goal and freezes", () => {
  it("earns one freeze per week on reaching 5 streak days, capped at 2", () => {
    const week1 = run(days(MON, 5));
    expect(week1.events).toContainEqual({ type: "WEEKLY_GOAL_MET", weekKey: "2026-W41" });
    expect(week1.events).toContainEqual({ type: "FREEZE_EARNED", weekKey: "2026-W41" });
    expect(week1.state.freezesAvailable).toBe(1);

    const rest = run(days("2026-10-10", 2), week1.state); // Sat, Sun: 7 days, still one freeze this week
    expect(rest.state.freezesAvailable).toBe(1);
    expect(rest.state.weekDaysMet).toBe(7);

    const threeWeeks = run(days("2026-10-12", 14), rest.state);
    expect(threeWeeks.state.freezesAvailable).toBe(2);
    expect(threeWeeks.events.filter((e) => e.type === "FREEZE_EARNED")).toHaveLength(1); // W42 earned, W43 at cap
    expect(threeWeeks.events.filter((e) => e.type === "WEEKLY_GOAL_MET")).toHaveLength(2);
    expect(threeWeeks.state.currentStreak).toBe(21);
  });

  it("a freeze bridges a single missed day without adding to the streak", () => {
    const earned = run(days(MON, 5)).state; // Mon–Fri, 1 freeze
    const update = applyActivityDay(earned, "2026-10-11", true); // Saturday the 10th was missed
    expect(update.events).toEqual([
      { type: "FREEZE_USED", date: "2026-10-10" },
      { type: "STREAK_EXTENDED", date: "2026-10-11", length: 6 },
    ]);
    expect(update.state).toMatchObject({ currentStreak: 6, freezesAvailable: 0, freezeUsedOn: "2026-10-10" });
  });

  it("two missed days break the streak even with two freezes", () => {
    const withTwo: StreakState = { ...run(days(MON, 3)).state, freezesAvailable: 2 };
    const update = applyActivityDay(withTwo, "2026-10-10", true); // missed 8th and 9th
    expect(update.events[0]).toEqual({ type: "STREAK_BROKEN", previousLength: 3 });
    expect(update.state).toMatchObject({ currentStreak: 1, freezesAvailable: 2 });
  });

  it("can be configured to bridge longer gaps", () => {
    const withTwo: StreakState = { ...run(days(MON, 3)).state, freezesAvailable: 2 };
    const update = applyActivityDay(withTwo, "2026-10-10", true, { maxBridgeDays: 2 });
    expect(update.state).toMatchObject({ currentStreak: 4, freezesAvailable: 0, freezeUsedOn: "2026-10-09" });
  });

  it("refunds the freeze when the bridged day's activity syncs late", () => {
    const earned = run(days(MON, 5)).state;
    const settled = settleStreak(earned, "2026-10-11"); // nightly job: Saturday the 10th missed
    expect(settled.state).toMatchObject({ freezesAvailable: 0, freezeUsedOn: "2026-10-10", currentStreak: 5 });
    const late = applyActivityDay(settled.state, "2026-10-10", true);
    expect(late.events[0]).toEqual({ type: "FREEZE_REFUNDED", date: "2026-10-10" });
    expect(late.state).toMatchObject({ currentStreak: 6, freezesAvailable: 1, freezeUsedOn: null, lastActiveDate: "2026-10-10" });
    const today = applyActivityDay(late.state, "2026-10-11", true);
    expect(today.state.currentStreak).toBe(7);
  });
});

describe("settleStreak (nightly maintenance)", () => {
  it("keeps the streak while yesterday or today is a streak day", () => {
    const { state } = run([MON]);
    expect(settleStreak(state, MON)).toEqual({ state, events: [] });
    expect(settleStreak(state, "2026-10-06")).toEqual({ state, events: [] });
  });

  it("is idempotent", () => {
    const earned = run(days(MON, 5)).state;
    const once = settleStreak(earned, "2026-10-11");
    expect(settleStreak(once.state, "2026-10-11")).toEqual({ state: once.state, events: [] });
  });

  it("leaves broken or empty streaks alone", () => {
    expect(settleStreak(initialStreakState(), MON).events).toEqual([]);
    const broken = settleStreak(run([MON]).state, "2026-10-09").state;
    expect(settleStreak(broken, "2026-10-20").events).toEqual([]);
  });
});

describe("display helpers", () => {
  const live = run(days(MON, 4)).state; // through Thursday the 8th

  it("currentStreakAsOf reflects lazily broken streaks", () => {
    expect(currentStreakAsOf(live, "2026-10-08")).toBe(4);
    expect(currentStreakAsOf(live, "2026-10-09")).toBe(4);
    expect(currentStreakAsOf(live, "2026-10-10")).toBe(0);
    expect(currentStreakAsOf({ ...live, freezesAvailable: 1 }, "2026-10-10")).toBe(4);
    expect(currentStreakAsOf(initialStreakState(), MON)).toBe(0);
  });

  it("streakStatus distinguishes done, at risk and inactive", () => {
    expect(streakStatus(live, "2026-10-08")).toBe("DONE_TODAY");
    expect(streakStatus(live, "2026-10-09")).toBe("AT_RISK");
    expect(streakStatus(live, "2026-10-11")).toBe("INACTIVE");
  });

  it("weeklyGoalProgress counts the current ISO week only", () => {
    expect(weeklyGoalProgress(live, "2026-10-08")).toEqual({
      weekKey: "2026-W41",
      weekStart: MON,
      daysMet: 4,
      goalDays: 5,
      achieved: false,
      daysLeft: 4,
      stillPossible: true,
    });
    expect(weeklyGoalProgress(live, "2026-10-12")).toMatchObject({ weekKey: "2026-W42", daysMet: 0, daysLeft: 7 });
    expect(weeklyGoalProgress(run(["2026-10-10"]).state, "2026-10-11")).toMatchObject({ daysMet: 1, stillPossible: false });
  });
});

describe("time-zone safety (midnight CAT)", () => {
  it("activity at 23:59 and 00:01 Harare time counts as two consecutive days", () => {
    const beforeMidnight = localDateString(new Date("2026-10-05T21:59:00Z")); // 23:59 CAT on the 5th
    const afterMidnight = localDateString(new Date("2026-10-05T22:01:00Z")); // 00:01 CAT on the 6th
    expect([beforeMidnight, afterMidnight]).toEqual(["2026-10-05", "2026-10-06"]);
    expect(run([beforeMidnight, afterMidnight]).state.currentStreak).toBe(2);
  });

  it("crosses month and year boundaries", () => {
    expect(run(days("2026-12-30", 4)).state).toMatchObject({ currentStreak: 4, lastActiveDate: "2027-01-02" });
  });
});
